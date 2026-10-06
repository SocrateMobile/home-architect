import { LitElement, PropertyValues, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import {
  DirectionalLight, HemisphereLight, PCFShadowMap, PerspectiveCamera, Plane, PointLight, Raycaster, Scene,
  Vector2, Vector3, WebGLRenderer
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import { EntityBinding, HomeArchitectProject, Opening, Point, SelectedElements } from '../core/types';
import { defineElement } from '../core/define';
import { Camera3D, shortestAngleDelta } from '../canvas/projection';
import { ElementRef, emptySelection } from '../canvas/selection';
import { exceedsTapSlop } from '../canvas/gestures';
import { memoizeLast } from '../canvas/memo';
import {
  EntityView, HassDisplayContext, boundEntityIds, describeEntity, formatTemperature, hassChangeAffects
} from '../canvas/entity-display';
import { EntityGesture, TapGestureRecognizer, planEntityAction, runEntityAction } from '../canvas/entity-actions';
import { Rgba, scaleRgb } from './colors';
import { MaterialSet, readPalette, toColor } from './materials';
import { MarkerDisplay, MarkerLayer, RoomLabelLayer } from './labels';
import {
  FloorLook, OpeningState, SceneModel, buildSceneModel, floorColor, floorLooks, lightSources, markerModels, openingState,
  sceneSignature, sceneSummary
} from './scene-builder';
import { BuiltScene, buildSceneObjects, disposeObject, pickRefOf, poseLeaf } from './scene-objects';

/**
 * Vue 3D WebGL du plan (`<home-architect-3d-view>`), chargée à la demande par le canevas (chunk séparé,
 * three n'alourdit ni la carte ni le studio tant que la 3D n'est pas affichée).
 *
 *  - Scène reconstruite seulement quand la géométrie change (signature) ; un changement d'état HA ne
 *    met à jour que les matériaux, lampes, battants et marqueurs.
 *  - Rendu à la demande (interaction, transition, changement d'état), en pause hors écran ou onglet
 *    masqué ; libération complète (GPU, contrôles, observateurs, contexte WebGL) à la déconnexion.
 *  - Clic : sur la carte, même logique d'action que les épingles 2D (entity-actions) ; dans le studio,
 *    l'élément touché est signalé au canevas ('view3d-pick') qui gère la sélection.
 *
 * Événements vers le canevas (non composés) : 'view3d-pick', 'view3d-camera', 'view3d-hover',
 * 'view3d-hint', 'view3d-error'. 'hass-more-info' (bubbles + composed) part d'ici sur la carte.
 */

/** Caméra de départ et, si une transition est souhaitée, angle d'où elle part. */
export interface View3DIntro {
  from: Camera3D | null;
  to: Camera3D;
}

export interface View3DPickDetail {
  /** Élément touché (null : fond, terrain). */
  ref: ElementRef | null;
  /** Maj, Ctrl ou ⌘ : ajout / retrait de la sélection. */
  modifier: boolean;
  /** Double clic (ou Maj + Entrée sur un marqueur). */
  double: boolean;
}

export interface View3DCameraDetail {
  pitchDeg: number;
  yawDeg: number;
  /** Zoom relatif au cadrage du plan (1 = plan cadré). */
  zoom: number;
}

export interface View3DHoverDetail {
  point: Point;
}

export interface View3DMessageDetail {
  message: string;
}

const DEFAULT_CAMERA: Camera3D = { pitchDeg: 45, yawDeg: -35 };
const CAMERA_FOV = 40;
const MIN_POLAR = 0.01;
/** Inclinaison maximale (rad) : la caméra ne descend jamais sous le sol. */
const MAX_POLAR = (82 * Math.PI) / 180;
const MIN_DISTANCE = 0.8;
/** Marge du cadrage automatique (le plan ne touche pas les bords). */
const FIT_MARGIN = 1.1;
const DAMPING = 0.12;
const CAMERA_ANIMATION_MS = 450;
const ZOOM_ANIMATION_MS = 200;
const OPENING_ANIMATION_MS = 600;
/** Lampes réellement éclairantes (au-delà : teinte et lueur du sol seulement, sans recompilation). */
const MAX_POINT_LIGHTS = 4;
/** Intensité (candelas) d'une lampe à pleine luminosité. */
const LAMP_INTENSITY = 14;
const MAX_PIXEL_RATIO = 2;
const SHADOW_MAP_SIZE = 2048;
const WHEEL_HINT = 'Ctrl (⌘ sur Mac) + molette pour zoomer';
const RENDERER_ERROR = 'Vue 3D indisponible sur cet appareil (WebGL).';

function prefersReducedMotion(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

function clampPolar(polar: number): number {
  return Math.min(MAX_POLAR, Math.max(MIN_POLAR, polar));
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Position de caméra : angles (rad) autour de la cible, distance et cible. */
interface CameraPose {
  polar: number;
  azimuth: number;
  distance: number;
  target: Vector3;
}

interface CameraTween {
  start: number;
  duration: number;
  from: CameraPose;
  to: CameraPose;
  deltaAzimuth: number;
}

/** Objets three vivants (null tant que la vue n'est pas initialisée ou après sa libération). */
interface Context3D {
  renderer: WebGLRenderer;
  labelRenderer: CSS2DRenderer;
  scene: Scene;
  camera: PerspectiveCamera;
  controls: OrbitControls;
  sun: DirectionalLight;
  sky: HemisphereLight;
  lamps: PointLight[];
  materials: MaterialSet;
  markers: MarkerLayer;
  labels: RoomLabelLayer;
  raycaster: Raycaster;
  built: BuiltScene | null;
}

export class HomeArchitect3DView extends LitElement {
  static styles = css`
    /* Contexte d'empilement propre : les marqueurs (z-index par distance) restent sous le HUD du canevas */
    :host {
      display: block;
      position: absolute;
      inset: 0;
      overflow: hidden;
      isolation: isolate;
    }

    .stage {
      position: absolute;
      inset: 0;
    }

    .stage > canvas {
      display: block;
      width: 100%;
      height: 100%;
      outline: none;
      cursor: grab;
    }

    .stage > canvas:active {
      cursor: grabbing;
    }

    .labels {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
    }

    /* Marqueurs d'entités : couleur de l'anneau selon l'état (mêmes jetons que les épingles 2D) */
    .marker {
      --marker-ring: var(--arch-pin-border);
      pointer-events: auto;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--arch-pin-bg);
      border: 2px solid var(--marker-ring);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
      cursor: pointer;
      outline: none;
      transition: width 0.15s ease, height 0.15s ease, box-shadow 0.15s ease;
    }

    .marker.status-on { --marker-ring: var(--arch-on); }
    .marker.status-off { --marker-ring: var(--arch-off); }
    .marker.status-alert { --marker-ring: var(--arch-alert); }
    .marker.status-info { --marker-ring: var(--arch-info); }
    .marker.status-missing { --marker-ring: var(--arch-warning); }

    .marker.lit {
      background: var(--arch-pin-light-bg);
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--marker-glow) 45%, transparent), 0 0 22px var(--marker-glow);
    }

    .marker.radar {
      --marker-ring: var(--arch-alert-ring);
    }

    .marker.playing {
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--arch-media) 40%, transparent), 0 2px 10px rgba(0, 0, 0, 0.35);
    }

    .marker.unavailable {
      opacity: 0.6;
      border-style: dashed;
    }

    .marker.orphan {
      border-style: dashed;
    }

    .marker.selected {
      border-color: var(--arch-accent-strong);
      box-shadow: 0 0 0 3px var(--arch-selection-glow), 0 2px 10px rgba(0, 0, 0, 0.35);
    }

    .marker:hover,
    .marker:focus-visible {
      width: 38px;
      height: 38px;
      z-index: 100000 !important;
    }

    .marker:focus-visible {
      border-color: var(--arch-accent);
      box-shadow: 0 0 0 3px var(--arch-accent-soft);
    }

    .marker-icon {
      font-size: 17px;
      line-height: 1;
      user-select: none;
    }

    /* Infobulle : nom courant et état, au survol ou au focus clavier */
    .marker-tip {
      display: none;
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%);
      flex-direction: column;
      align-items: center;
      gap: 1px;
      padding: 4px 9px;
      border-radius: 8px;
      background: var(--arch-surface);
      border: 1px solid var(--arch-surface-border);
      color: var(--arch-surface-text);
      font-size: 11px;
      white-space: nowrap;
      pointer-events: none;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
    }

    .marker:hover .marker-tip,
    .marker:focus-visible .marker-tip {
      display: flex;
    }

    .marker-name {
      font-weight: 700;
    }

    .marker-state {
      color: var(--marker-ring);
      font-weight: 600;
    }

    /* Étiquettes des pièces : compactes et translucides (le mobilier reste visible dessous) */
    .room-label {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2px 7px;
      border-radius: 7px;
      background: color-mix(in srgb, var(--arch-surface) 68%, transparent);
      border: 1px solid var(--arch-accent-soft);
      color: var(--arch-surface-text);
      font-size: 10px;
      line-height: 1.25;
      white-space: nowrap;
      pointer-events: none;
    }

    .room-label-name {
      font-weight: 700;
      font-size: 11px;
    }

    .room-label-area {
      color: var(--arch-accent);
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-weight: 600;
    }

    .room-label-temp {
      color: var(--arch-temperature);
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-weight: 700;
    }

    .room-label-temp[hidden] {
      display: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .marker {
        transition: none;
      }
    }
  `;

  @property({ attribute: false })
  public project!: HomeArchitectProject;

  @property({ attribute: false })
  public hass?: HassDisplayContext & { callService?: (domain: string, service: string, data?: Record<string, unknown>) => unknown };

  /** Niveau affiché en filigrane sous le plan (murs translucides). */
  @property({ attribute: false })
  public ghostProject: HomeArchitectProject | null = null;

  @property({ type: Boolean })
  public showThermalHeatmap = false;

  /** Studio : un clic sélectionne (signalé au canevas). */
  @property({ type: Boolean })
  public interactive = false;

  /** Lecture seule (annoncée aux lecteurs d'écran avec la description du plan). */
  @property({ type: Boolean })
  public readOnly = false;

  /** Carte Lovelace : les marqueurs exécutent l'action de l'entité ; molette et doigt laissent défiler la page. */
  @property({ type: Boolean, reflect: true })
  public dashboard = false;

  @property({ attribute: false })
  public selectedElements: SelectedElements = emptySelection();

  /** Palette du canevas ('light' / 'dark') : les couleurs sont relues quand elle change. */
  @property({ type: String })
  public scheme: 'light' | 'dark' = 'dark';

  /** Transitions de caméra et d'ouvertures (coupées aussi par « Réduire les animations »). */
  @property({ type: Boolean })
  public animations = true;

  /** Ombres douces du soleil (désactivables pour les appareils modestes). */
  @property({ type: Boolean })
  public shadows = true;

  /** Murs coupés à mi-hauteur pour voir l'intérieur des pièces. */
  @property({ type: Boolean })
  public cutWalls = false;

  /**
   * Caméra initiale, lue au premier cadrage (non réactive) ; remplacée par les angles courants quand la
   * vue est retirée du document, pour les retrouver si elle y revient.
   */
  public intro: View3DIntro | null = null;

  private three: Context3D | null = null;
  private frame: number | null = null;
  private hoverFrame: number | null = null;
  private hoverPoint: { x: number; y: number } | null = null;
  /** La scène a changé pendant une pause (hors écran, onglet masqué) : rendue au retour. */
  private dirty = false;
  private onScreen = true;
  private size = { width: 0, height: 0 };
  private fitted = false;
  private signature = '';
  /** Références des données géométriques lors du dernier contrôle (voir rebuildIfNeeded). */
  private geometryRefs: readonly unknown[] = [];
  private projectId: string | null = null;
  private cameraTween: CameraTween | null = null;
  private lastCamera = '';
  /** Distance du dernier cadrage automatique : 100 % du zoom affiché. */
  private zoomReference = 1;
  /** Ouverture de chaque baie (0 fermée, 1 ouverte) et cible de sa transition. */
  private readonly openness = new Map<string, { current: number; target: number }>();
  private readonly openingStatus = new Map<string, OpeningState['status']>();
  private floorState = new Map<string, FloorLook>();
  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  /** Appui sur le canevas WebGL (clic = appui sans glisser) et nombre de pointeurs posés. */
  private press: { id: number; x: number; y: number; type: string; modifier: boolean } | null = null;
  private activePointers = new Set<number>();
  private readonly ndc = new Vector2();
  private readonly groundPlane = new Plane(new Vector3(0, 1, 0), 0);

  /** Tap, double tap et appui long sur les marqueurs de la carte (mêmes règles que les épingles 2D, constat F10). */
  private readonly markerGestures = new TapGestureRecognizer({
    onTap: id => this.runMarkerAction(id, 'tap'),
    onDoubleTap: id => this.runMarkerAction(id, 'double_tap'),
    onHold: id => this.runMarkerAction(id, 'hold'),
    waitsForDoubleTap: id => {
      const binding = this.binding(id);
      return !!binding && planEntityAction(binding, 'tap').kind !== 'more-info';
    }
  });

  /** Entités affichées (épingles et ouvertures liées) : un nouvel objet hass qui n'en touche aucune ne change rien. */
  private readonly watchedEntityIds = memoizeLast((bindings: readonly EntityBinding[], openings: readonly Opening[]) =>
    boundEntityIds(bindings, openings));

  private readonly markerModelsOf = memoizeLast((bindings: readonly EntityBinding[]) => markerModels(bindings));

  // ==========================================
  // API DU CANEVAS (HUD)
  // ==========================================

  /** Préréglage de caméra (inclinaison et orientation, mêmes conventions que la vue 3D simplifiée). */
  public setCamera(camera: Camera3D): void {
    this.tweenTo({ polar: degToRad(camera.pitchDeg), azimuth: degToRad(camera.yawDeg) }, CAMERA_ANIMATION_MS);
  }

  /** ↺ : quart de tour à gauche (depuis l'angle visé si une transition est en cours). */
  public rotateQuarterTurn(): void {
    const base = this.cameraTween?.to.azimuth ?? this.pose()?.azimuth;
    if (base === undefined) return;
    this.tweenTo({ azimuth: base - Math.PI / 2 }, CAMERA_ANIMATION_MS);
  }

  /**
   * Recadre le plan (distance et cible), angles conservés (ceux visés si une transition est en cours).
   * Après la mise à jour en attente : un projet transmis juste avant (plan importé) est cadré une fois
   * sa scène reconstruite, pas l'ancienne.
   */
  public fitToView(): void {
    void this.updateComplete.then(() => {
      const angles = this.cameraTween?.to ?? this.pose();
      const fit = angles && this.fitPose(angles.polar, angles.azimuth);
      if (fit) this.tweenTo(fit, CAMERA_ANIMATION_MS);
    });
  }

  /** Zoom des boutons du HUD (facteur > 1 : rapproche). */
  public zoomBy(factor: number): void {
    const t = this.three;
    const pose = this.pose();
    if (!t || !pose || !(factor > 0)) return;
    const distance = Math.min(t.controls.maxDistance, Math.max(t.controls.minDistance, (this.cameraTween?.to.distance ?? pose.distance) / factor));
    this.tweenTo({ distance }, ZOOM_ANIMATION_MS);
  }

  /** ⌖ : angle par défaut et plan recadré. */
  public resetView(): void {
    const angles = { polar: degToRad(DEFAULT_CAMERA.pitchDeg), azimuth: degToRad(DEFAULT_CAMERA.yawDeg) };
    const fit = this.fitPose(angles.polar, angles.azimuth);
    if (fit) this.tweenTo({ ...fit, ...angles }, CAMERA_ANIMATION_MS);
  }

  // ==========================================
  // CYCLE DE VIE
  // ==========================================

  connectedCallback(): void {
    super.connectedCallback();
    // Élément replacé dans le document après une libération : la vue est recréée.
    if (this.hasUpdated && !this.three) this.initialize();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.teardown();
  }

  protected firstUpdated(): void {
    this.initialize();
  }

  protected updated(changed: PropertyValues<this>): void {
    super.updated(changed);
    const t = this.three;
    if (!t || !this.project) return;
    if (changed.has('scheme')) this.applyPalette();
    const rebuilt = this.rebuildIfNeeded();
    const hassChanged = changed.has('hass') && hassChangeAffects(
      changed.get('hass'), this.hass, this.watchedEntityIds(this.project.bindings, this.project.openings)
    );
    if (rebuilt || changed.has('project')) {
      t.markers.sync(this.markerModelsOf(this.project.bindings));
      t.renderer.domElement.setAttribute('aria-label', sceneSummary(this.project, this.readOnly));
    } else if (changed.has('readOnly')) {
      t.renderer.domElement.setAttribute('aria-label', sceneSummary(this.project, this.readOnly));
    }
    if (rebuilt || hassChanged || changed.has('project') || changed.has('showThermalHeatmap')) {
      this.applyEntityState(rebuilt);
    } else if (changed.has('selectedElements') || changed.has('interactive') || changed.has('dashboard')) {
      this.applyMaterials();
      this.updateMarkers();
    }
    if (changed.has('shadows')) this.applyShadows();
    if (changed.has('dashboard')) this.applyTouchPolicy();
    if (changed.has('animations')) t.controls.enableDamping = this.motionAllowed();
    this.requestRender();
  }

  render() {
    return html`<div class="stage"></div>`;
  }

  /** Crée le moteur de rendu, la caméra, les contrôles et les lumières ; en cas d'échec, le canevas revient à la 3D simplifiée. */
  private initialize(): void {
    const stage = this.renderRoot.querySelector<HTMLElement>('.stage');
    if (!stage || this.three) return;
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, powerPreference: 'default' });
    } catch (err) {
      console.warn('[home-architect] Vue 3D WebGL indisponible :', err);
      this.dispatchEvent(new CustomEvent<View3DMessageDetail>('view3d-error', { detail: { message: RENDERER_ERROR } }));
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
    renderer.shadowMap.type = PCFShadowMap;
    const canvas = renderer.domElement;
    canvas.setAttribute('role', 'img');
    stage.append(canvas);

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.domElement.className = 'labels';
    stage.append(labelRenderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(CAMERA_FOV, 1, 0.1, 500);
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = this.motionAllowed();
    controls.dampingFactor = DAMPING;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = MAX_POLAR;
    controls.minDistance = MIN_DISTANCE;
    // Déplacement parallèle au sol : la cible garde sa hauteur et reste bornée autour du plan.
    controls.screenSpacePanning = false;
    controls.addEventListener('change', this.requestRender);
    controls.addEventListener('start', this.onControlsStart);

    const sky = new HemisphereLight(0xffffff, 0x888888, 1.6);
    const sun = new DirectionalLight(0xffffff, 1.5);
    sun.shadow.mapSize.set(SHADOW_MAP_SIZE, SHADOW_MAP_SIZE);
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.02;
    sun.shadow.radius = 3;
    const lamps = Array.from({ length: MAX_POINT_LIGHTS }, () => new PointLight(0xffffff, 0, 0, 2));
    scene.add(sky, sun, sun.target, ...lamps);

    const materials = new MaterialSet(readPalette(this, this.scheme));
    const markers = new MarkerLayer({
      pointerDown: (id, e) => this.onMarkerPointerDown(id, e),
      pointerMove: e => this.markerGestures.move(e.clientX, e.clientY),
      pointerUp: () => this.markerGestures.up(),
      pointerCancel: () => this.markerGestures.cancel(),
      click: (id, e) => this.onMarkerClick(id, e),
      dblClick: (id, e) => this.onMarkerDblClick(id, e),
      keyDown: (id, e) => this.onMarkerKeyDown(id, e),
      contextMenu: e => {
        if (this.dashboard) e.preventDefault();
      }
    });
    const labels = new RoomLabelLayer();
    scene.add(markers.group, labels.group);

    this.three = { renderer, labelRenderer, scene, camera, controls, sun, sky, lamps, materials, markers, labels, raycaster: new Raycaster(), built: null };
    this.signature = '';
    this.geometryRefs = [];
    this.projectId = null;
    this.fitted = false;
    this.lastCamera = '';
    this.size = { width: 0, height: 0 };
    this.applyPalette();
    this.applyShadows();
    this.applyTouchPolicy();

    canvas.addEventListener('pointerdown', this.onCanvasPointerDown);
    canvas.addEventListener('pointerup', this.onCanvasPointerUp);
    canvas.addEventListener('pointercancel', this.onCanvasPointerCancel);
    canvas.addEventListener('pointermove', this.onCanvasPointerMove);
    canvas.addEventListener('dblclick', this.onCanvasDblClick);
    canvas.addEventListener('webglcontextrestored', this.requestRender);
    // Phase de capture : la molette de la carte n'atteint pas les contrôles (le tableau de bord défile).
    stage.addEventListener('wheel', this.onWheelCapture, { capture: true, passive: true });
    document.addEventListener('visibilitychange', this.onVisibilityChange);
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(entries => {
        const rect = entries[entries.length - 1]?.contentRect;
        if (rect) this.resize(rect.width, rect.height);
      });
      this.resizeObserver.observe(stage);
    }
    if (typeof IntersectionObserver !== 'undefined') {
      this.intersectionObserver = new IntersectionObserver(entries => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        this.onScreen = entry.isIntersecting;
        if (this.onScreen && this.dirty) this.requestRender();
      });
      this.intersectionObserver.observe(this);
    }

    this.rebuildIfNeeded();
    this.three.markers.sync(this.markerModelsOf(this.project.bindings));
    canvas.setAttribute('aria-label', sceneSummary(this.project, this.readOnly));
    this.applyEntityState(true);
    this.resize(stage.clientWidth, stage.clientHeight);
  }

  /** Libération complète : boucle, observateurs, écouteurs, scène, matériaux, contrôles et contexte WebGL. */
  private teardown(): void {
    const t = this.three;
    // Élément replacé plus tard dans le document (vue du tableau de bord réaffichée) : il reprend ses
    // angles (ceux visés par une transition en cours) au lieu de rejouer l'arrivée depuis la vue de dessus.
    const angles = this.fitted ? this.cameraTween?.to ?? this.pose() : null;
    if (angles) this.intro = { from: null, to: { pitchDeg: radToDeg(angles.polar), yawDeg: radToDeg(angles.azimuth) } };
    if (this.frame !== null) cancelAnimationFrame(this.frame);
    if (this.hoverFrame !== null) cancelAnimationFrame(this.hoverFrame);
    this.frame = null;
    this.hoverFrame = null;
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.intersectionObserver?.disconnect();
    this.intersectionObserver = null;
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    this.markerGestures.dispose();
    this.cameraTween = null;
    this.press = null;
    this.activePointers.clear();
    this.openness.clear();
    this.openingStatus.clear();
    if (!t) return;
    this.three = null;
    const canvas = t.renderer.domElement;
    canvas.removeEventListener('pointerdown', this.onCanvasPointerDown);
    canvas.removeEventListener('pointerup', this.onCanvasPointerUp);
    canvas.removeEventListener('pointercancel', this.onCanvasPointerCancel);
    canvas.removeEventListener('pointermove', this.onCanvasPointerMove);
    canvas.removeEventListener('dblclick', this.onCanvasDblClick);
    canvas.removeEventListener('webglcontextrestored', this.requestRender);
    canvas.parentElement?.removeEventListener('wheel', this.onWheelCapture, { capture: true });
    t.controls.removeEventListener('change', this.requestRender);
    t.controls.removeEventListener('start', this.onControlsStart);
    t.controls.dispose();
    if (t.built) disposeObject(t.built.root, t.materials.shared);
    t.markers.dispose();
    t.labels.dispose();
    t.materials.dispose();
    t.sun.shadow.dispose();
    for (const lamp of t.lamps) lamp.dispose();
    t.sun.dispose();
    t.sky.dispose();
    t.renderer.renderLists.dispose();
    t.renderer.dispose();
    // Le navigateur limite le nombre de contextes WebGL : celui-ci est rendu tout de suite.
    t.renderer.forceContextLoss();
    canvas.remove();
    t.labelRenderer.domElement.remove();
  }

  // ==========================================
  // SCÈNE
  // ==========================================

  /**
   * Reconstruit la scène statique si sa signature a changé ; vrai si elle l'a été. Les tableaux du projet
   * sont remplacés à chaque modification (jamais mutés) : mêmes références, aucune signature à calculer
   * (sélection, état HA, liaisons déplacées).
   */
  private rebuildIfNeeded(): boolean {
    const t = this.three;
    const project = this.project;
    if (!t || !project) return false;
    const ghost = this.ghostProject;
    const refs: unknown[] = [
      project.id, project.walls, project.openings, project.rooms, project.furniture, project.defaultCeilingHeight,
      ghost?.walls, ghost?.rooms, ghost?.defaultCeilingHeight, this.cutWalls
    ];
    if (t.built && refs.length === this.geometryRefs.length && refs.every((ref, i) => Object.is(ref, this.geometryRefs[i]))) {
      return false;
    }
    this.geometryRefs = refs;
    const options = { cutWalls: this.cutWalls };
    const signature = sceneSignature(project, ghost, options);
    if (signature === this.signature && t.built && this.projectId === project.id) return false;
    this.signature = signature;
    const model = buildSceneModel(project, ghost, options);
    if (t.built) disposeObject(t.built.root, t.materials.shared);
    t.built = buildSceneObjects(model, t.materials);
    t.scene.add(t.built.root);
    t.labels.sync(model.labels);
    this.openness.clear();
    this.configureBounds(model, t.built);
    // Autre plan : nouveau cadrage (mêmes angles), sans finir une transition visant l'ancien plan.
    if (this.projectId !== project.id) {
      this.projectId = project.id;
      const pose = this.pose();
      const fit = pose && this.fitPose(pose.polar, pose.azimuth);
      if (this.fitted && pose && fit) {
        this.cameraTween = null;
        this.placeAt({ ...pose, ...fit });
      }
    }
    return true;
  }

  /** Limites des contrôles, ombres et plans de coupe de la caméra selon l'emprise de la scène. */
  private configureBounds(model: SceneModel, built: BuiltScene): void {
    const t = this.three!;
    const fit = this.fitDistance(built);
    t.controls.maxDistance = Math.max(fit * 4, MIN_DISTANCE * 2);
    t.controls.cursor.copy(built.center);
    t.controls.maxTargetRadius = built.radius + 2;
    t.camera.far = Math.max(100, fit * 8 + built.radius * 4);
    t.camera.updateProjectionMatrix();
    const reach = built.radius + 1;
    const sunDir = new Vector3(-0.55, 1, 0.7).normalize();
    t.sun.position.copy(built.center).addScaledVector(sunDir, reach * 3);
    t.sun.target.position.copy(built.center);
    const cam = t.sun.shadow.camera;
    cam.left = -reach;
    cam.right = reach;
    cam.top = reach;
    cam.bottom = -reach;
    cam.near = 0.1;
    cam.far = reach * 6 + model.maxHeight;
    cam.updateProjectionMatrix();
  }

  /** Couleurs du thème : fond et, si la palette a changé, matériaux (scène reconstruite avec elle). */
  private applyPalette(): void {
    const t = this.three;
    if (!t) return;
    const palette = readPalette(this, this.scheme);
    t.renderer.setClearColor(toColor(palette.background));
    t.sky.groundColor.copy(toColor(palette.ground));
    if (JSON.stringify(palette) === JSON.stringify(t.materials.palette)) return;
    if (t.built) disposeObject(t.built.root, t.materials.shared);
    t.built = null;
    t.materials.dispose();
    t.materials = new MaterialSet(palette);
    this.signature = '';
  }

  private applyShadows(): void {
    const t = this.three;
    if (!t) return;
    t.renderer.shadowMap.enabled = this.shadows;
    t.sun.castShadow = this.shadows;
  }

  /** Carte : un balayage vertical fait défiler le tableau de bord (les contrôles imposent touch-action: none). */
  private applyTouchPolicy(): void {
    const t = this.three;
    if (t) t.renderer.domElement.style.touchAction = this.dashboard ? 'pan-y' : 'none';
  }

  // ==========================================
  // ÉTAT DE HOME ASSISTANT
  // ==========================================

  private binding(id: string): EntityBinding | undefined {
    return this.project.bindings.find(b => b.id === id);
  }

  /** Lampes, sols, ouvertures, marqueurs et températures selon l'état HA (sans reconstruction). */
  private applyEntityState(immediate: boolean): void {
    const t = this.three;
    if (!t?.built) return;
    const hass = this.hass;

    // Lampes toujours présentes (éteintes : intensité nulle) : leur nombre ne change jamais, aucun shader n'est recompilé.
    const lights = lightSources(this.project, hass);
    t.lamps.forEach((lamp, i) => {
      const source = lights[i];
      if (!source) {
        lamp.intensity = 0;
        return;
      }
      lamp.position.set(source.position.x, source.height, source.position.y);
      toColor(source.color, lamp.color);
      lamp.intensity = LAMP_INTENSITY * Math.max(0.15, source.level);
    });

    this.floorState = floorLooks(this.project, hass, this.showThermalHeatmap);

    const animate = !immediate && this.motionAllowed();
    for (const [id, opening] of t.built.openings) {
      const state = openingState(opening.model.entityId, hass);
      this.openingStatus.set(id, state.status);
      const target = state.open ? 1 : 0;
      const entry = this.openness.get(id);
      if (!entry || !animate) {
        this.openness.set(id, { current: target, target });
        for (const leaf of opening.leaves) poseLeaf(leaf, target);
      } else {
        entry.target = target;
      }
    }

    const temperatures = new Map<string, string>();
    for (const [roomId, look] of this.floorState) {
      if (look.temperature) temperatures.set(roomId, `🌡️ ${formatTemperature(look.temperature, hass)}`);
    }
    t.labels.updateTemperatures(temperatures);
    this.applyMaterials();
    this.updateMarkers(lights.map(l => [l.bindingId, l.color] as const));
  }

  /** Matériaux selon la sélection, les avertissements des ouvertures liées et l'éclairage des sols. */
  private applyMaterials(): void {
    const t = this.three;
    const built = t?.built;
    if (!t || !built) return;
    const { materials } = t;
    const sel = this.selectedElements ?? emptySelection();
    const walls = new Set(sel.wallIds);
    const openings = new Set(sel.openingIds);
    const rooms = new Set(sel.roomIds);
    const furniture = new Set(sel.furnitureIds ?? []);
    for (const [id, mesh] of built.walls) mesh.material = walls.has(id) ? materials.selected : materials.surface;
    for (const [id, mesh] of built.furniture) mesh.material = furniture.has(id) ? materials.selected : materials.surface;
    for (const [id, opening] of built.openings) {
      const status = this.openingStatus.get(id);
      const material = openings.has(id)
        ? materials.selected
        : (status === 'missing' || status === 'unavailable' ? materials.warning : materials.surface);
      for (const mesh of opening.meshes) mesh.material = material;
    }
    const palette = materials.palette;
    for (const [roomId, floor] of built.floors) {
      const look = this.floorState.get(roomId);
      toColor(floorColor(palette.floor, floor.color, look), floor.material.color);
      const glow: Rgba | null = rooms.has(roomId) ? scaleRgb(palette.accent, 0.35) : look?.glow ?? null;
      if (glow) toColor(glow, floor.material.emissive);
      else floor.material.emissive.setRGB(0, 0, 0);
    }
  }

  /** Lampes allumées (couleur du halo des marqueurs) mémorisées entre deux mises à jour de sélection. */
  private markerGlow = new Map<string, Rgba>();

  private updateMarkers(glow?: ReadonlyArray<readonly [string, Rgba]>): void {
    const t = this.three;
    if (!t) return;
    if (glow) this.markerGlow = new Map(glow);
    const selected = new Set(this.selectedElements?.bindingIds ?? []);
    const focusable = this.dashboard || this.interactive;
    const displays = new Map<string, MarkerDisplay>();
    for (const b of this.project.bindings) {
      if (typeof b.entityId !== 'string') continue;
      const view: EntityView = describeEntity(b, this.hass);
      displays.set(b.id, { view, selected: selected.has(b.id), focusable, glow: view.lightOn ? this.markerGlow.get(b.id) ?? null : null });
    }
    t.markers.update(displays);
  }

  // ==========================================
  // CAMÉRA
  // ==========================================

  private motionAllowed(): boolean {
    return this.animations && !prefersReducedMotion();
  }

  private pose(): CameraPose | null {
    const t = this.three;
    if (!t) return null;
    return {
      polar: t.controls.getPolarAngle(),
      azimuth: t.controls.getAzimuthalAngle(),
      distance: t.controls.getDistance(),
      target: t.controls.target.clone()
    };
  }

  /** Distance qui cadre la sphère englobante quelle que soit l'orientation (borne du recul). */
  private fitDistance(built: BuiltScene): number {
    const camera = this.three!.camera;
    const vFov = degToRad(camera.fov);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * Math.max(camera.aspect, 0.1));
    return (built.radius / Math.sin(Math.min(vFov, hFov) / 2)) * 1.05;
  }

  /**
   * Cadrage serré pour une orientation : cible au centre de la boîte englobante, distance minimale à
   * laquelle ses huit coins tiennent dans le champ (avec une marge). Mémorisée comme référence du zoom.
   */
  private fitPose(polar: number, azimuth: number): Pick<CameraPose, 'distance' | 'target'> | null {
    const t = this.three;
    const built = t?.built;
    if (!t || !built) return null;
    const tanV = Math.tan(degToRad(t.camera.fov) / 2);
    const tanH = tanV * Math.max(t.camera.aspect, 0.1);
    const target = built.box.getCenter(new Vector3());
    // Repère de la caméra (même construction que lookAt avec Y vers le haut).
    const back = new Vector3().setFromSphericalCoords(1, clampPolar(polar), azimuth);
    const right = new Vector3(Math.cos(azimuth), 0, -Math.sin(azimuth));
    const up = new Vector3().crossVectors(back, right);
    const { min, max } = built.box;
    let distance = MIN_DISTANCE;
    for (const x of [min.x, max.x]) {
      for (const y of [min.y, max.y]) {
        for (const z of [min.z, max.z]) {
          const c = new Vector3(x, y, z).sub(target);
          const depth = c.dot(back);
          distance = Math.max(distance, depth + Math.abs(c.dot(right)) / tanH, depth + Math.abs(c.dot(up)) / tanV);
        }
      }
    }
    distance *= FIT_MARGIN;
    this.zoomReference = distance;
    return { distance, target };
  }

  private placeAt(pose: CameraPose): void {
    const t = this.three!;
    const offset = new Vector3().setFromSphericalCoords(pose.distance, clampPolar(pose.polar), pose.azimuth);
    t.camera.position.copy(pose.target).add(offset);
    t.controls.target.copy(pose.target);
    t.camera.lookAt(pose.target);
    t.controls.update();
  }

  /** Transition vers une pose (instantanée si les animations sont coupées). */
  private tweenTo(change: Partial<CameraPose>, duration: number): void {
    const from = this.pose();
    if (!from || !this.fitted) return;
    const to: CameraPose = { ...from, ...change, target: (change.target ?? from.target).clone() };
    to.polar = clampPolar(to.polar);
    if (!this.motionAllowed()) {
      this.cameraTween = null;
      this.placeAt(to);
      this.requestRender();
      return;
    }
    const deltaAzimuth = degToRad(shortestAngleDelta(radToDeg(from.azimuth), radToDeg(to.azimuth)));
    this.cameraTween = { start: performance.now(), duration, from, to, deltaAzimuth };
    this.requestRender();
  }

  private stepCameraTween(now: number): boolean {
    const tween = this.cameraTween;
    if (!tween) return false;
    const k = Math.min(1, (now - tween.start) / tween.duration);
    const e = easeOutCubic(k);
    const { from, to } = tween;
    this.placeAt({
      polar: from.polar + (to.polar - from.polar) * e,
      azimuth: from.azimuth + tween.deltaAzimuth * e,
      distance: from.distance + (to.distance - from.distance) * e,
      target: from.target.clone().lerp(to.target, e)
    });
    if (k >= 1) this.cameraTween = null;
    return k < 1;
  }

  private readonly onControlsStart = (): void => {
    // L'utilisateur reprend la main : la transition en cours s'arrête là où elle est.
    this.cameraTween = null;
  };

  /** Premier cadrage (dès que la vue a une taille) : caméra d'arrivée, avec transition depuis `intro.from`. */
  private applyIntro(): void {
    const to = this.intro?.to ?? DEFAULT_CAMERA;
    const fit = this.fitPose(degToRad(to.pitchDeg), degToRad(to.yawDeg));
    if (!fit) return;
    const from = this.intro?.from;
    this.fitted = true;
    const start = from && this.motionAllowed() ? from : to;
    this.placeAt({ polar: degToRad(start.pitchDeg), azimuth: degToRad(start.yawDeg), ...fit });
    if (start !== to) this.setCamera(to);
  }

  private emitCamera(): void {
    const t = this.three;
    const built = t?.built;
    if (!t || !built) return;
    const detail: View3DCameraDetail = {
      pitchDeg: Math.round(radToDeg(t.controls.getPolarAngle())),
      yawDeg: Math.round(radToDeg(t.controls.getAzimuthalAngle())),
      zoom: Math.round((this.zoomReference / t.controls.getDistance()) * 100) / 100
    };
    const key = `${detail.pitchDeg}|${detail.yawDeg}|${detail.zoom}`;
    if (key === this.lastCamera) return;
    this.lastCamera = key;
    this.dispatchEvent(new CustomEvent<View3DCameraDetail>('view3d-camera', { detail }));
  }

  // ==========================================
  // RENDU À LA DEMANDE
  // ==========================================

  private resize(width: number, height: number): void {
    const t = this.three;
    if (!t || width <= 0 || height <= 0) return;
    if (width === this.size.width && height === this.size.height) return;
    this.size = { width, height };
    t.renderer.setSize(width, height, false);
    t.labelRenderer.setSize(width, height);
    t.camera.aspect = width / height;
    t.camera.updateProjectionMatrix();
    if (t.built) {
      t.controls.maxDistance = Math.max(this.fitDistance(t.built) * 4, MIN_DISTANCE * 2);
      if (!this.fitted) this.applyIntro();
    }
    this.requestRender();
  }

  private renderable(): boolean {
    return this.onScreen && !document.hidden && this.size.width > 0;
  }

  /** Demande une image (une seule par trame) ; en pause, l'image est rendue au retour à l'écran. */
  private readonly requestRender = (): void => {
    if (!this.three) return;
    if (!this.renderable()) {
      this.dirty = true;
      return;
    }
    if (this.frame === null) this.frame = requestAnimationFrame(this.renderFrame);
  };

  private readonly renderFrame = (now: number): void => {
    this.frame = null;
    const t = this.three;
    if (!t) return;
    if (!this.renderable()) {
      this.dirty = true;
      return;
    }
    this.dirty = false;
    // Amortissement : tant que la caméra bouge, les contrôles émettent 'change' et redemandent une image.
    t.controls.update();
    let animating = this.stepCameraTween(now);
    animating = this.stepOpenings() || animating;
    t.renderer.render(t.scene, t.camera);
    t.labelRenderer.render(t.scene, t.camera);
    this.emitCamera();
    if (animating) this.requestRender();
  };

  private lastOpeningStep = 0;

  /** Battants des ouvertures liées vers leur position (ouverte / fermée) ; vrai tant qu'une transition dure. */
  private stepOpenings(): boolean {
    const built = this.three?.built;
    const now = performance.now();
    const dt = this.lastOpeningStep ? Math.min(100, now - this.lastOpeningStep) : 16;
    this.lastOpeningStep = now;
    if (!built) return false;
    let moving = false;
    for (const [id, entry] of this.openness) {
      if (entry.current === entry.target) continue;
      const step = dt / OPENING_ANIMATION_MS;
      entry.current = entry.target > entry.current
        ? Math.min(entry.target, entry.current + step)
        : Math.max(entry.target, entry.current - step);
      for (const leaf of built.openings.get(id)?.leaves ?? []) poseLeaf(leaf, easeOutCubic(entry.current));
      moving = moving || entry.current !== entry.target;
    }
    if (!moving) this.lastOpeningStep = 0;
    return moving;
  }

  private readonly onVisibilityChange = (): void => {
    if (!document.hidden && this.dirty) this.requestRender();
  };

  // ==========================================
  // POINTEUR : CLIC, SURVOL, MOLETTE
  // ==========================================

  private readonly onWheelCapture = (e: WheelEvent): void => {
    if (!this.dashboard || e.ctrlKey || e.metaKey) return;
    // Carte : la molette fait défiler le tableau de bord (les contrôles ne la reçoivent pas).
    e.stopPropagation();
    this.emitHint(WHEEL_HINT);
  };

  private readonly onCanvasPointerDown = (e: PointerEvent): void => {
    this.activePointers.add(e.pointerId);
    if (this.activePointers.size > 1 || e.button !== 0 || !e.isPrimary) {
      this.press = null;
      return;
    }
    this.press = { id: e.pointerId, x: e.clientX, y: e.clientY, type: e.pointerType, modifier: e.shiftKey || e.ctrlKey || e.metaKey };
  };

  private readonly onCanvasPointerUp = (e: PointerEvent): void => {
    this.activePointers.delete(e.pointerId);
    const press = this.press;
    if (!press || press.id !== e.pointerId) return;
    this.press = null;
    if (exceedsTapSlop({ x: press.x, y: press.y }, { x: e.clientX, y: e.clientY }, press.type)) return;
    this.pick(e.clientX, e.clientY, press.modifier, false);
  };

  private readonly onCanvasPointerCancel = (e: PointerEvent): void => {
    this.activePointers.delete(e.pointerId);
    this.press = null;
  };

  private readonly onCanvasDblClick = (e: MouseEvent): void => {
    if (this.dashboard) return;
    this.pick(e.clientX, e.clientY, false, true);
  };

  /** Survol (studio) : point du sol sous le pointeur, pour le HUD des coordonnées du canevas. */
  private readonly onCanvasPointerMove = (e: PointerEvent): void => {
    if (this.dashboard || e.buttons !== 0) return;
    this.hoverPoint = { x: e.clientX, y: e.clientY };
    if (this.hoverFrame === null) this.hoverFrame = requestAnimationFrame(this.emitHover);
  };

  private readonly emitHover = (): void => {
    this.hoverFrame = null;
    const t = this.three;
    const p = this.hoverPoint;
    if (!t || !p || !this.setRay(p.x, p.y)) return;
    const hit = t.raycaster.ray.intersectPlane(this.groundPlane, new Vector3());
    if (!hit) return;
    this.dispatchEvent(new CustomEvent<View3DHoverDetail>('view3d-hover', { detail: { point: { x: hit.x, y: hit.z } } }));
  };

  private setRay(clientX: number, clientY: number): boolean {
    const t = this.three;
    if (!t) return false;
    const rect = t.renderer.domElement.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return false;
    this.ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    t.raycaster.setFromCamera(this.ndc, t.camera);
    return true;
  }

  /** Élément du plan sous le pointeur (le plus proche), null sur le fond ou le terrain. */
  private raycast(clientX: number, clientY: number): ElementRef | null {
    const t = this.three;
    if (!t?.built || !this.setRay(clientX, clientY)) return null;
    for (const hit of t.raycaster.intersectObjects(t.built.pickables, true)) {
      const ref = pickRefOf(hit.object);
      if (ref) return ref;
    }
    return null;
  }

  private pick(clientX: number, clientY: number, modifier: boolean, double: boolean): void {
    const ref = this.raycast(clientX, clientY);
    if (this.dashboard) {
      // Carte : une ouverture liée ouvre la fiche de son capteur (jamais d'action sur l'appareil).
      const opening = ref?.kind === 'opening' ? this.project.openings.find(o => o.id === ref.id) : undefined;
      if (opening?.entityId) {
        runEntityAction({ entityId: opening.entityId, tapAction: 'more-info' }, 'tap', this.actionContext());
      }
      return;
    }
    if (!this.interactive) return;
    this.dispatchEvent(new CustomEvent<View3DPickDetail>('view3d-pick', { detail: { ref, modifier, double } }));
  }

  // ==========================================
  // MARQUEURS D'ENTITÉS
  // ==========================================

  private actionContext() {
    return { host: this, hass: this.hass, onError: (message: string) => this.emitHint(message) };
  }

  private runMarkerAction(bindingId: string, gesture: EntityGesture): void {
    const binding = this.binding(bindingId);
    if (binding && this.dashboard) runEntityAction(binding, gesture, this.actionContext());
  }

  private emitPick(bindingId: string, modifier: boolean, double: boolean): void {
    if (!this.interactive) return;
    const ref: ElementRef = { kind: 'binding', id: bindingId };
    this.dispatchEvent(new CustomEvent<View3DPickDetail>('view3d-pick', { detail: { ref, modifier, double } }));
  }

  /** Carte : l'appui est suivi (capture du pointeur) pour reconnaître l'appui long ; il ne fait pas pivoter la vue. */
  private onMarkerPointerDown(bindingId: string, e: PointerEvent): void {
    if (!this.dashboard || e.button !== 0 || !e.isPrimary) return;
    try {
      (e.currentTarget as Element).setPointerCapture(e.pointerId);
    } catch (_) {
      // Pointeur déjà relâché : le click éventuel suffit.
    }
    this.markerGestures.down(bindingId, e.clientX, e.clientY, e.pointerType);
  }

  private onMarkerClick(bindingId: string, e: MouseEvent): void {
    e.stopPropagation();
    if (this.dashboard) this.markerGestures.click(bindingId);
    else this.emitPick(bindingId, e.shiftKey || e.ctrlKey || e.metaKey, false);
  }

  /** Studio : double clic = fiche more-info (gérée par le canevas, un seul événement). */
  private onMarkerDblClick(bindingId: string, e: MouseEvent): void {
    e.stopPropagation();
    if (!this.dashboard) this.emitPick(bindingId, false, true);
  }

  /**
   * Clavier (constat F103) : Entrée / Espace = tap sur la carte, sélection dans le studio ; Maj + Entrée
   * ou touche Menu = appui long sur la carte, fiche more-info dans le studio.
   */
  private onMarkerKeyDown(bindingId: string, e: KeyboardEvent): void {
    const secondary = e.key === 'ContextMenu' || (e.key === 'Enter' && e.shiftKey) || (e.key === 'F10' && e.shiftKey);
    const primary = !secondary && (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar');
    if (!primary && !secondary) return;
    e.preventDefault();
    e.stopPropagation();
    if (e.repeat) return;
    if (this.dashboard) this.runMarkerAction(bindingId, secondary ? 'hold' : 'tap');
    else this.emitPick(bindingId, false, secondary);
  }

  private emitHint(message: string): void {
    this.dispatchEvent(new CustomEvent<View3DMessageDetail>('view3d-hint', { detail: { message } }));
  }
}

defineElement('home-architect-3d-view', HomeArchitect3DView);

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-3d-view': HomeArchitect3DView;
  }
}
