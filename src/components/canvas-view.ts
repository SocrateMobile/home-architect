import { LitElement, html, svg, nothing, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { guard } from 'lit/directives/guard.js';
import { styleMap } from 'lit/directives/style-map.js';
import { canvasStyles } from '../styles/canvas.styles';
import {
  Point, Wall, Opening, OpeningType, Room, ActiveTool, ViewportTransform, HomeArchitectProject,
  WallSnapResult, EntityBinding, SelectedElements, FurnitureItem
} from '../core/types';
import { OpeningFit, SnapResult, SnappingEngine } from '../core/snapping';
import { PolygonUtils } from '../core/polygon';
import { findFurnitureTemplate, furnitureDisplayName, renderFurnitureSymbol } from '../core/furniture-catalog';
import { SvgExporter, computeWallPolygons } from '../core/svg-exporter';
import { defineElement } from '../core/define';
import { hasCommandModifier, shouldHandleShortcut } from '../core/keyboard';
import { generateElementId } from '../core/project-model';
import { blobToDataUrl } from '../core/image-utils';
import type { DrawerItemPayload } from './entity-drawer';
import {
  CanvasSize, ViewGeometry, REFERENCE_PIXELS_PER_METER, canvasCenter, clampZoom, clientToLocal, clientToWorld,
  defaultZoom, displayZoom, fitViewport, localToClient, localToView, panViewport, rotateVector, viewToWorld,
  wheelDeltaPixels, wheelZoomFactor, worldToClient, worldToView, zoomViewportAt
} from '../canvas/coords';
import { PointerTracker, distance, exceedsTapSlop, midpoint, pinchViewport } from '../canvas/gestures';
import {
  ElementRef, addToSelection, emptySelection, isSelected, pruneSelection, removeFromSelection, sameSelection,
  selectOnly, selectionCount
} from '../canvas/selection';
import {
  MIN_WALL_LENGTH, MoveSet, RoomPolygonIssue, buildMoveSet, createBinding, createFurniture, createRoom,
  isMoveSetEmpty, moveRoomVertex, moveWallEndpoint, offsetAlongWall, parseDrawerPayload, reassignRooms,
  rectanglePolygon, roomPolygonIssue, slideOpening, translateSelection
} from '../canvas/editing';
import { snapDrawingPoint, snapMeasurePoint, snapToWall } from '../canvas/tool-snap';
import { memoizeLast } from '../canvas/memo';
import {
  EntityView, HassDisplayContext, RoomAppearance, TemperatureReading, boundEntityIds, describeEntity, formatTemperature,
  hassChangeAffects, roomAppearance
} from '../canvas/entity-display';
import { TapGestureRecognizer, planEntityAction, runEntityAction } from '../canvas/entity-actions';
import { OpeningShape, openingPrimitives } from '../canvas/opening-symbols';
import {
  Camera3D, CameraBasis, cameraBasis, floorMatrix, projectPoint, screenDeltaToFloor, shortestAngleDelta, unprojectFloor
} from '../canvas/projection';
import { WallSceneItem, buildWallScene, computeWallHeights } from '../canvas/scene-3d';
import { isView3DReady, loadView3D, markView3DFailed } from '../view3d/loader';
import type {
  HomeArchitect3DView, View3DCameraDetail, View3DHoverDetail, View3DIntro, View3DMessageDetail, View3DPickDetail
} from '../view3d/view3d-element';

/** Un appui sur le HUD (zoom, cadrage, rotation, 2D/3D, coordonnées, aide) ne trace jamais rien (v1.0.27). */
const HUD_SELECTOR = '.canvas-hud, .coords-hud, .help-hud, button';

/** Éléments du plan : en 3D, un appui sur l'un d'eux ne lance pas d'orbite. */
const PLAN_OBJECT_SELECTOR =
  '.wall-element, .wall-face-3d, .wall-cap-3d, .opening-3d, .room-group, .room-3d-badge-group, .entity-pin, ' +
  '.opening-element, .furniture-group, .dimension-badge, .wall-dim-badge';

/**
 * Hauteur apparente des murs en 3D (fraction de la hauteur réelle) : les pièces restent visibles
 * derrière les murs, comme dans l'ancienne vue isométrique.
 */
const WALL_HEIGHT_SCALE = 0.55;
/** Durée (ms) d'une transition de caméra 3D (préréglage, quart de tour, entrée en 3D). */
const CAMERA_ANIMATION_MS = 400;
/** Sous cette largeur (px), le HUD est compacté : préréglages 3D et coordonnées masqués (constat F126). */
const COMPACT_WIDTH_PX = 600;

/** Préréglages de caméra 3D (inclinaison 0 = vue de dessus) : vues isométriques, de dessus et de face. */
const CAMERA_PRESETS: ReadonlyArray<{ label: string; title: string; camera: Camera3D }> = [
  { label: 'SO', title: 'Vue Sud-Ouest (défaut)', camera: { pitchDeg: 45, yawDeg: -35 } },
  { label: 'SE', title: 'Vue Sud-Est', camera: { pitchDeg: 45, yawDeg: 35 } },
  { label: 'NE', title: 'Vue Nord-Est', camera: { pitchDeg: 45, yawDeg: 125 } },
  { label: 'NO', title: 'Vue Nord-Ouest', camera: { pitchDeg: 45, yawDeg: -125 } },
  { label: 'Top', title: 'Vue de dessus', camera: { pitchDeg: 0, yawDeg: 0 } },
  { label: 'Face', title: 'Vue de face (depuis le sud)', camera: { pitchDeg: 75, yawDeg: 0 } }
];

function prefersReducedMotion(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function pointsAttr(points: readonly Point[]): string {
  return points.map(p => `${p.x},${p.y}`).join(' ');
}

/** Longueur minimale (m) d'un mur tracé. */
const MIN_DRAWN_WALL_LENGTH = 0.15;
/** Côté minimal (m) d'une pièce rectangulaire. */
const MIN_RECT_ROOM_SIDE = 0.2;
/** Longueur minimale à l'écran (px) du segment d'étalonnage. */
const MIN_CALIBRATION_PX = 10;
/** Distance minimale (m) mesurée par l'outil « Mettre à l'échelle ». */
const MIN_RESCALE_METERS = 0.05;
/** Distance (px) au premier sommet sous laquelle un clic ferme le contour d'une pièce. */
const ROOM_CLOSE_TOLERANCE_PX = 12;
/** Deux taps plus proches que cette distance (px) posent le même sommet (second clic d'un double-clic). */
const DUPLICATE_TAP_PX = 6;
/** Pas (m) du déplacement aux flèches ; Maj : pas de la grille. */
const NUDGE_STEP = 0.01;
/** Dimension minimale (m) d'un meuble redimensionné (v1.0.26). */
const MIN_FURNITURE_SIZE = 0.20;
/** Pas (m) du glisser d'une ouverture le long de son mur (Alt : au millimètre). */
const OPENING_SLIDE_STEP = 0.01;

const HINT_DURATION_MS = 1800;
const WHEEL_HINT = 'Ctrl (⌘ sur Mac) + molette pour zoomer';

const ROOM_ISSUE_MESSAGES: Record<RoomPolygonIssue, string> = {
  'too-few': "Une pièce a besoin d'au moins 3 angles.",
  'self-intersecting': 'Contour invalide : deux côtés de la pièce se croisent.',
  'too-small': 'Pièce trop petite.'
};

type SnapInfo = Pick<SnapResult, 'snappedTo' | 'guideAngle' | 'smartGuideX' | 'smartGuideY' | 'wallId'>;
const NO_SNAP: SnapInfo = { snappedTo: 'none' };

// ==========================================
// INTERACTIONS POINTEUR (une seule à la fois)
// ==========================================

interface PointerInteraction {
  pointerId: number;
  /** Élément qui détient la capture du pointeur (relâchée à la fin). */
  captureEl: Element | null;
}

interface PanInteraction extends PointerInteraction {
  kind: 'pan';
  startClient: Point;
  startViewport: Point;
}

interface OrbitInteraction extends PointerInteraction {
  kind: 'orbit';
  startClient: Point;
  startPitch: number;
  startYaw: number;
}

interface MarqueeInteraction extends PointerInteraction {
  kind: 'marquee';
}

/** Appui avec un outil de tracé (ou pour poser l'élément choisi dans le volet) : tap = action, glisser = pan. */
interface TapInteraction extends PointerInteraction {
  kind: 'tool-tap' | 'placement';
  startClient: Point;
  startViewport: Point;
  pointerType: string;
}

interface RectRoomInteraction extends PointerInteraction {
  kind: 'rect-room';
  startClient: Point;
  pointerType: string;
}

/** Appui sur un élément du plan avec l'outil Sélection : tap = sélection, glisser = déplacement. */
interface PressInteraction extends PointerInteraction {
  kind: 'press';
  ref: ElementRef;
  startClient: Point;
  startWorld: Point;
  startViewport: Point;
  pointerType: string;
  modifier: boolean;
  wasSelected: boolean;
  /** pending : pas encore de glisser ; move : sélection déplacée ; slide : ouverture glissée ; idle : glisser sans effet. */
  mode: 'pending' | 'move' | 'slide' | 'idle';
  base: HomeArchitectProject;
  moveSet: MoveSet | null;
  /** Point de référence accroché pendant le déplacement (extrémité de mur, sommet de pièce, position). */
  anchor: Point;
  snap: 'structure' | 'furniture' | 'free';
}

interface FurnitureRotateInteraction extends PointerInteraction {
  kind: 'furniture-rotate';
  itemId: string;
  startAngle: number;
  initialAngle: number;
  base: HomeArchitectProject;
}

interface FurnitureResizeInteraction extends PointerInteraction {
  kind: 'furniture-resize';
  itemId: string;
  startClient: Point;
  initialWidth: number;
  initialLength: number;
  base: HomeArchitectProject;
}

interface WallEndpointInteraction extends PointerInteraction {
  kind: 'wall-endpoint';
  wallId: string;
  which: 'start' | 'end';
  base: HomeArchitectProject;
}

interface RoomVertexInteraction extends PointerInteraction {
  kind: 'room-vertex';
  roomId: string;
  index: number;
  base: HomeArchitectProject;
}

/** Geste à deux doigts : pincement (zoom) et glisser (pan) autour du milieu des doigts. */
interface GestureInteraction {
  kind: 'gesture';
  ids: [number, number];
  startDistance: number;
  startMidLocal: Point;
  startViewport: ViewportTransform;
}

type Interaction =
  | { kind: 'none' }
  | PanInteraction
  | OrbitInteraction
  | MarqueeInteraction
  | TapInteraction
  | RectRoomInteraction
  | PressInteraction
  | FurnitureRotateInteraction
  | FurnitureResizeInteraction
  | WallEndpointInteraction
  | RoomVertexInteraction
  | GestureInteraction;

const NO_INTERACTION: Interaction = { kind: 'none' };

const NO_OPENINGS: readonly Opening[] = [];

/** Vrai si l'événement vient d'un élément du shadow DOM du canevas correspondant à `selector`. */
function eventHits(e: Event, host: Element, selector: string): boolean {
  for (const node of e.composedPath()) {
    if (node === host) return false;
    if (node instanceof Element && node.matches(selector)) return true;
  }
  return false;
}

function hasContent(project: HomeArchitectProject): boolean {
  const bg = project.background;
  return project.walls.length > 0 || project.rooms.length > 0 || project.bindings.length > 0 ||
    (project.furniture?.length ?? 0) > 0 || !!(bg && bg.visible && (bg.imageUrl || bg.assetId));
}

export class HomeArchitectCanvas extends LitElement {
  static styles = canvasStyles;

  @property({ type: Object })
  public hass: any;

  @property({ type: Object })
  public project: HomeArchitectProject = {
    id: 'default',
    name: 'Plan sans titre',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    pixelsPerMeter: 50,
    grid: {
      size: 0.5,
      subdivisions: 2,
      snapToGrid: true,
      snapToAngles: true,
      snapToElements: true
    },
    walls: [],
    openings: [],
    rooms: [],
    bindings: []
  };

  @property({ type: String })
  public activeTool: ActiveTool = 'wall';

  @property({ type: Number })
  public currentWallThickness: number = 0.20;

  @property({ type: Number })
  public currentOpeningWidth: number = 0.90;

  /** Possédé par le parent : le bouton 2D/3D émet 'toggle-3d' sans modifier cette valeur. */
  @property({ type: Boolean })
  public is3DMode: boolean = false;

  @property({ type: Object })
  public selectedElements: SelectedElements = emptySelection();

  /** Carte Lovelace : épingles actionnables, pas de clavier, la molette et le doigt font défiler la page. */
  @property({ type: Boolean, reflect: true, attribute: 'dashboard' })
  public isDashboardMode: boolean = false;

  /** false : aucune sélection, aucun glisser, aucune poignée (carte). */
  @property({ type: Boolean })
  public interactive: boolean = true;

  /** Lecture seule (utilisateur non administrateur, carte) : navigation et sélection, aucune modification. */
  @property({ type: Boolean })
  public readOnly: boolean = false;

  /** Une modale du parent est ouverte : les raccourcis clavier du canevas sont suspendus. */
  @property({ type: Boolean })
  public modalOpen: boolean = false;

  /** URL affichable de l'image de fond (object URL d'un asset, ou URL externe), prioritaire sur background.imageUrl. */
  @property({ attribute: false })
  public backgroundSrc?: string;

  /** Élément choisi dans le volet (« toucher pour placer ») : posé au prochain tap sur le plan. */
  @property({ attribute: false })
  public pendingPlacement?: DrawerItemPayload | null;

  @property({ type: Object })
  public ghostProject?: HomeArchitectProject | null = null;

  @property({ type: Boolean })
  public showDimensions: boolean = true;

  @property({ type: Boolean })
  public showThermalHeatmap: boolean = false;

  /** Possédés par le parent : Espace et F émettent 'opening-config-changed'. */
  @property({ type: Boolean })
  public openingFlipSide: boolean = false;

  @property({ type: Boolean })
  public openingFlipDirection: boolean = false;

  @property({ type: Number })
  public windowSashCount: number = 1;

  /** Contrôles de la vue (2D/3D, rotation, cadrage, zoom) ; la carte peut les masquer (constat F126). */
  @property({ type: Boolean })
  public showControls: boolean = true;

  /** Animations décoratives (radar, ondes, ventilateur) ; « Réduire les animations » du système les coupe aussi (constat F133). */
  @property({ type: Boolean })
  public animations: boolean = true;

  /** Palette du dessin : 'auto' suit le mode sombre de Home Assistant (constat F56). */
  @property({ type: String })
  public theme: 'auto' | 'light' | 'dark' = 'auto';

  /** Ombres douces de la vue 3D WebGL (à couper sur les appareils modestes). */
  @property({ type: Boolean })
  public shadows: boolean = true;

  // État du Viewport (Pan & Zoom)
  @state()
  private viewport: ViewportTransform = { x: 300, y: 300, zoom: 1.0 };

  @state()
  private interaction: Interaction = NO_INTERACTION;

  @state()
  private marqueeStart: Point | null = null;

  @state()
  private marqueeCurrent: Point | null = null;

  // État de dessin de mur en cours
  @state()
  private drawingWallStart: Point | null = null;

  @state()
  private previewPoint: Point | null = null;

  @state()
  private snapInfo: SnapInfo = NO_SNAP;

  /** Coordonnées du pointeur : HUD mis à jour directement, sans nouveau rendu du plan (constat F35). */
  private cursorCoords: Point = { x: 0, y: 0 };

  // Contour de pièce en cours (outil 'room') et rectangle en cours (outil 'rect_room'), en mètres
  @state()
  private roomDraft: Point[] = [];

  @state()
  private rectStart: Point | null = null;

  @state()
  private rectCurrent: Point | null = null;

  // État d'insertion d'ouvrants : mur survolé et placement borné de l'ouverture
  @state()
  private wallSnap: WallSnapResult | null = null;

  @state()
  private openingFit: OpeningFit | null = null;

  // Étalonnage du calque image : points en mètres monde (un pan ou un zoom entre les clics ne fausse rien)
  @state()
  private calibrateStart: Point | null = null;

  @state()
  private calibrateCurrent: Point | null = null;

  // Mise à l'échelle du plan (recalcul des cotes)
  @state()
  private rescaleStart: Point | null = null;

  @state()
  private rescaleCurrent: Point | null = null;

  /** Rotation de la vue 2D en degrés (quarts de tour cumulés, non bornée). */
  @state()
  public viewRotation: number = 0;

  // État Orbite / Rotation 3D
  @state()
  private orbitPitch: number = 45;

  @state()
  private orbitYaw: number = -35;

  /**
   * Vue 3D WebGL (src/view3d, chargée à la demande) : 'loading' pendant le téléchargement de son chunk,
   * 'ready' quand elle remplace la projection SVG, 'fallback' si WebGL ou le chargement fait défaut
   * (la projection SVG simplifiée sert alors de repli).
   */
  @state()
  private view3d: 'idle' | 'loading' | 'ready' | 'fallback' = 'idle';

  /** Zoom de la caméra WebGL relatif au cadrage du plan (libellé du HUD). */
  @state()
  private view3dZoom = 1;

  /** Murs coupés à mi-hauteur dans la vue 3D WebGL. */
  @state()
  private cutWalls = false;

  /** Caméra de départ transmise à la vue WebGL quand elle s'affiche (transition depuis la caméra courante). */
  private view3dIntro: View3DIntro | null = null;

  /** Message bref affiché au-dessus du plan (accrochage refusé, aide à la molette…). */
  @state()
  private hint: string | null = null;

  private hintTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly pointers = new PointerTracker();
  /** Un geste à deux doigts a eu lieu depuis le premier appui : le clic qui suit est ignoré. */
  private gestureOccurred = false;
  /** Taille du canevas mise en cache par le ResizeObserver (centre de la rotation de vue). */
  private canvasSize: CanvasSize = { width: 0, height: 0 };
  private resizeObserver: ResizeObserver | null = null;
  /** L'utilisateur a zoomé ou déplacé la vue depuis le dernier cadrage automatique. */
  private viewTouched = false;
  /** Cadrage demandé avant que le canevas ait une taille (marge à appliquer). */
  private pendingFitPadding: number | null = null;
  /** Dernier projet émis par 'project-changed' (distingue nos modifications d'un rechargement). */
  private lastEmittedProject: HomeArchitectProject | null = null;
  /** Dernier projet affecté par le canevas lui-même (distingue un remplacement par le parent pendant un geste). */
  private localProject: HomeArchitectProject | null = null;
  private selectionPruned = false;
  private keyboardBound = false;
  /** Incrémenté quand l'état d'une entité affichée (ou la langue, l'unité, le thème) change : clé des caches d'affichage. */
  private entityRevision = 0;
  /** Palette effective du dessin (couleurs des faces 3D, calculées en JS). */
  private colorScheme: 'light' | 'dark' = 'dark';
  private intersectionObserver: IntersectionObserver | null = null;
  /** Transition de caméra 3D en cours (requestAnimationFrame) et angle qu'elle vise. */
  private cameraAnimation: number | null = null;
  private cameraTarget: Camera3D | null = null;

  private readonly onKeyDown = (e: KeyboardEvent) => this.handleKeyDown(e);

  /** Tap, double tap et appui long sur les épingles de la carte (constat F10). */
  private readonly pinGestures = new TapGestureRecognizer({
    onTap: id => this.runPinAction(id, 'tap'),
    onDoubleTap: id => this.runPinAction(id, 'double_tap'),
    onHold: id => this.runPinAction(id, 'hold'),
    waitsForDoubleTap: id => {
      const binding = this.project.bindings.find(b => b.id === id);
      return !!binding && planEntityAction(binding, 'tap').kind !== 'more-info';
    }
  });

  constructor() {
    super();
    // Phase de capture sur l'hôte : tous les pointeurs sont suivis, y compris ceux qui visent un élément du
    // plan (dont les gestionnaires arrêtent la propagation), pour reconnaître un geste à deux doigts.
    this.addEventListener('pointerdown', e => this.handlePointerDownCapture(e), { capture: true });
    this.addEventListener('pointermove', e => {
      this.pointers.move(e.pointerId, e.clientX, e.clientY);
      this.pinGestures.move(e.clientX, e.clientY);
    }, { capture: true });
    this.addEventListener('pointerup', e => {
      this.pointers.delete(e.pointerId);
      this.pinGestures.up();
    }, { capture: true });
    this.addEventListener('pointercancel', e => {
      this.pointers.delete(e.pointerId);
      this.pinGestures.cancel();
    }, { capture: true });
  }

  /** Préréglage de caméra 3D, atteint par une courte transition (immédiat si les animations sont réduites). */
  public setCameraPreset(pitch: number, yaw: number): void {
    const view = this.view3dElement;
    if (view) view.setCamera({ pitchDeg: pitch, yawDeg: yaw });
    else this.animateCamera({ pitchDeg: pitch, yawDeg: yaw });
  }

  // ==========================================
  // ÉTATS DÉRIVÉS
  // ==========================================

  /** La vue 3D WebGL est affichée (sinon, en 3D, la projection SVG simplifiée sert de repli). */
  private get webgl3D(): boolean {
    return this.is3DMode && this.view3d === 'ready';
  }

  private get view3dElement(): HomeArchitect3DView | null {
    return this.webgl3D ? this.renderRoot.querySelector('home-architect-3d-view') : null;
  }

  /** Sélection possible (studio) ; la carte n'expose que les épingles. */
  private get canSelect(): boolean {
    return this.interactive && !this.isDashboardMode;
  }

  /** Modification du plan possible. */
  private get canEdit(): boolean {
    return this.canSelect && !this.readOnly;
  }

  /**
   * Tracé, glisser, dépôt et poignées : en 2D seulement. En 3D, un point écran ne désigne que le sol
   * (les murs ont une hauteur) : la vue se parcourt et se sélectionne, sans modification (constat F52).
   */
  private get canEdit2D(): boolean {
    return this.canEdit && !this.is3DMode;
  }

  /**
   * Un appui sur un élément du plan le sélectionne : outil Sélection, ou plan non modifiable (lecture
   * seule : on parcourt et on sélectionne quel que soit l'outil, comme sur le fond).
   */
  private get selectsElements(): boolean {
    return this.canSelect && (this.activeTool === 'select' || !this.canEdit);
  }

  // ==========================================
  // CONVERSIONS DE COORDONNÉES
  // ==========================================

  /** Échelle du projet (px/m au zoom 1). */
  private get ppm(): number {
    const ppm = this.project.pixelsPerMeter;
    return Number.isFinite(ppm) && ppm > 0 ? ppm : REFERENCE_PIXELS_PER_METER;
  }

  /** Pixels écran par mètre à l'affichage. */
  private get screenPpm(): number {
    return this.ppm * this.viewport.zoom;
  }

  /** Taille réelle du canevas, ou null tant qu'il n'est pas mis en page. */
  private measuredSize(): CanvasSize | null {
    if (this.canvasSize.width > 0 && this.canvasSize.height > 0) return this.canvasSize;
    const rect = this.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 ? { width: rect.width, height: rect.height } : null;
  }

  private sizeOrFallback(): CanvasSize {
    return this.measuredSize() ?? { width: this.clientWidth || 800, height: this.clientHeight || 600 };
  }

  /** État de la vue : la rotation 2D n'existe pas en 3D (la caméra 3D a sa propre orientation). */
  private get geometry(): ViewGeometry {
    return {
      viewport: this.viewport,
      pixelsPerMeter: this.ppm,
      rotationDeg: this.is3DMode ? 0 : this.viewRotation,
      size: this.sizeOrFallback()
    };
  }

  /** Caméra 3D courante (projection orthographique calculée en JS, constat F120). */
  private get camera(): CameraBasis {
    return cameraBasis({ pitchDeg: this.orbitPitch, yawDeg: this.orbitYaw });
  }

  /**
   * Point affiché (repère local du canevas) → repère vue du plan : rotation de vue annulée en 2D, sol
   * déprojeté en 3D (le point du sol situé sous le pointeur).
   */
  private localToPlanView(local: Point, geo: ViewGeometry = this.geometry): Point {
    return this.is3DMode ? unprojectFloor(local, this.camera, canvasCenter(geo.size)) : localToView(local, geo);
  }

  /**
   * Conversion unique écran → monde (client → local → rotation de vue annulée → mètres) utilisée par
   * tous les outils, glisser, poignées et dépôts : juste quels que soient la rotation de vue, le zoom,
   * le pan et la position du canevas dans la page. En 3D : point du sol sous le pointeur.
   */
  public clientToWorld(clientX: number, clientY: number): Point {
    const rect = this.getBoundingClientRect();
    if (!this.is3DMode) return clientToWorld(clientX, clientY, rect, this.geometry);
    const geo = this.geometry;
    return viewToWorld(this.localToPlanView(clientToLocal(clientX, clientY, rect), geo), geo);
  }

  /** Nom historique (v1.0.28) de clientToWorld, conservé pour compatibilité de l'API publique. */
  public screenToWorld(screenX: number, screenY: number): Point {
    return this.clientToWorld(screenX, screenY);
  }

  /** Inverse exact de clientToWorld (coordonnées client du point monde affiché ; au sol en 3D). */
  public worldToClient(point: Point): Point {
    const rect = this.getBoundingClientRect();
    if (!this.is3DMode) return worldToClient(point, rect, this.geometry);
    const geo = this.geometry;
    return localToClient(projectPoint(worldToView(point, geo), 0, this.camera, canvasCenter(geo.size)), rect);
  }

  /**
   * Monde → coordonnées de dessin du plan (repère du groupe `viewport-2d-rotator`, AVANT sa rotation) :
   * la rotation de vue est appliquée une seule fois, par ce groupe SVG.
   */
  public worldToScreen(worldPoint: Point): Point {
    const k = this.screenPpm;
    return {
      x: worldPoint.x * k + this.viewport.x,
      y: worldPoint.y * k + this.viewport.y
    };
  }

  /** Point client → repère vue du plan (ancre du zoom à la molette). */
  private clientToView(clientX: number, clientY: number): Point {
    return this.localToPlanView(clientToLocal(clientX, clientY, this.getBoundingClientRect()));
  }

  /**
   * Nouvelle position de la vue pour un déplacement du pointeur `localDelta` depuis `start` : le plan
   * suit le pointeur (delta tourné de −rotation de vue en 2D, v1.0.28 ; ramené sur le sol en 3D).
   */
  private pannedViewport(start: Point, localDelta: Point): Point {
    if (!this.is3DMode) return panViewport(start, localDelta, this.viewRotation);
    const d = screenDeltaToFloor(localDelta, this.camera);
    return { x: start.x + d.x, y: start.y + d.y };
  }

  // ==========================================
  // GESTION DU PAN & ZOOM
  // ==========================================

  private handleWheel(e: WheelEvent): void {
    // Vue WebGL : la molette est traitée par ses contrôles de caméra.
    if (this.webgl3D) return;
    const zoomGesture = e.ctrlKey || e.metaKey;
    // Carte : la molette fait défiler le tableau de bord ; seul Ctrl/⌘ + molette (ou le pincement du
    // pavé tactile, qui émet Ctrl + molette) zoome le plan (constat F54).
    if (this.isDashboardMode && !zoomGesture) {
      this.flashHint(WHEEL_HINT);
      return;
    }
    e.preventDefault();
    const size = this.sizeOrFallback();
    const dy = wheelDeltaPixels(e.deltaY, e.deltaMode, size.height);
    const dx = wheelDeltaPixels(e.deltaX, e.deltaMode, size.width);
    this.viewTouched = true;

    // Défilement à deux doigts d'un pavé tactile (composante horizontale) : déplace la vue (constat F122).
    if (!zoomGesture && dx !== 0) {
      const pos = this.pannedViewport(this.viewport, { x: -dx, y: -dy });
      this.viewport = { ...this.viewport, x: pos.x, y: pos.y };
      return;
    }

    const zoom = clampZoom(this.viewport.zoom * wheelZoomFactor(dy, zoomGesture), this.ppm);
    if (zoom === this.viewport.zoom) return;
    // Le point sous le curseur reste fixe : rotation de vue compensée en 2D, point du sol en 3D (la
    // projection orthographique de la caméra s'inverse exactement).
    this.viewport = zoomViewportAt(this.viewport, this.clientToView(e.clientX, e.clientY), zoom);
  }

  /** Zoom des boutons du HUD, ancré au centre du canevas (constat F122) ; caméra rapprochée en vue WebGL. */
  private zoomBy(factor: number): void {
    const view = this.view3dElement;
    if (view) {
      view.zoomBy(factor);
      return;
    }
    const zoom = clampZoom(this.viewport.zoom * factor, this.ppm);
    this.viewport = zoomViewportAt(this.viewport, canvasCenter(this.sizeOrFallback()), zoom);
    this.viewTouched = true;
  }

  private zoomIn(): void {
    this.zoomBy(1.25);
  }

  private zoomOut(): void {
    this.zoomBy(1 / 1.25);
  }

  // ==========================================
  // POINTEURS : SUIVI, CAPTURE, ANNULATION
  // ==========================================

  private beginInteraction(interaction: Exclude<Interaction, { kind: 'none' } | GestureInteraction>): void {
    this.interaction = interaction;
    try {
      interaction.captureEl?.setPointerCapture(interaction.pointerId);
    } catch (_) {
      // Pointeur déjà relâché : l'interaction se terminera au prochain pointerup / pointercancel.
    }
  }

  /** Termine l'interaction en cours et libère la capture du pointeur. */
  private endInteraction(): void {
    const it = this.interaction;
    this.interaction = NO_INTERACTION;
    if (it.kind === 'none' || it.kind === 'gesture' || !it.captureEl) return;
    try {
      if (it.captureEl.hasPointerCapture(it.pointerId)) it.captureEl.releasePointerCapture(it.pointerId);
    } catch (_) {
      // Pointeur inactif : rien à libérer.
    }
  }

  /**
   * Annule le geste en cours sans rien enregistrer (pointercancel, perte de capture, second doigt,
   * Échap, passage en 3D) : la position de départ est restaurée, aucun 'project-changed' n'est émis
   * (constat F121).
   */
  private cancelInteraction(): void {
    const it = this.interaction;
    if (it.kind === 'none') return;
    if ('base' in it && this.project !== it.base) this.setLocalProject(it.base);
    if (it.kind === 'marquee') {
      this.marqueeStart = null;
      this.marqueeCurrent = null;
    } else if (it.kind === 'rect-room') {
      this.rectStart = null;
      this.rectCurrent = null;
    }
    if ('base' in it) this.clearPreview();
    this.endInteraction();
  }

  /**
   * Phase de capture (hôte) : suivi des pointeurs, geste à deux doigts, « toucher pour placer ». La vue
   * WebGL gère elle-même ses gestes (orbite, pincement) : rien n'est intercepté.
   */
  private handlePointerDownCapture(e: PointerEvent): void {
    if (this.webgl3D || eventHits(e, this, HUD_SELECTOR)) return;
    if (e.isPrimary) {
      // Premier contact d'une nouvelle séquence : un pointeur resté suivi (relâché hors de la page) est oublié.
      this.pointers.clear();
      this.gestureOccurred = false;
    }
    this.pointers.set(e.pointerId, e.clientX, e.clientY, e.pointerType);

    if (this.pointers.size >= 2) {
      // Second doigt : zoom / déplacement de la vue, l'action du premier doigt est annulée (constat F53).
      if (this.interaction.kind === 'gesture' || this.startGesture()) e.stopPropagation();
      return;
    }

    if (this.pendingPlacement && this.canEdit2D && e.isPrimary && e.button === 0 && this.interaction.kind === 'none') {
      e.stopPropagation();
      this.beginInteraction({
        kind: 'placement',
        pointerId: e.pointerId,
        captureEl: this.renderRoot.querySelector('.canvas-container'),
        startClient: { x: e.clientX, y: e.clientY },
        startViewport: { x: this.viewport.x, y: this.viewport.y },
        pointerType: e.pointerType
      });
    }
  }

  private startGesture(): boolean {
    const pair = this.pointers.pair();
    if (!pair || pair.types.includes('mouse')) return false;
    this.cancelInteraction();
    this.pinGestures.cancel();
    this.stopCameraAnimation();
    const rect = this.getBoundingClientRect();
    const a = clientToLocal(pair.points[0].x, pair.points[0].y, rect);
    const b = clientToLocal(pair.points[1].x, pair.points[1].y, rect);
    this.interaction = {
      kind: 'gesture',
      ids: pair.ids,
      startDistance: Math.max(distance(a, b), 1),
      startMidLocal: midpoint(a, b),
      startViewport: { ...this.viewport }
    };
    this.gestureOccurred = true;
    return true;
  }

  private updateGesture(it: GestureInteraction): void {
    const pa = this.pointers.get(it.ids[0]);
    const pb = this.pointers.get(it.ids[1]);
    if (!pa || !pb) return;
    const rect = this.getBoundingClientRect();
    const a = clientToLocal(pa.x, pa.y, rect);
    const b = clientToLocal(pb.x, pb.y, rect);
    const mid = midpoint(a, b);
    const scale = distance(a, b) / it.startDistance;
    const geo = this.geometry;
    // Le point du plan (du sol en 3D) sous le milieu des doigts suit les doigts.
    this.viewport = pinchViewport(
      it.startViewport, this.localToPlanView(it.startMidLocal, geo), this.localToPlanView(mid, geo), scale, this.ppm
    );
    this.viewTouched = true;
  }

  private beginPan(e: PointerEvent, captureEl: Element): void {
    this.beginInteraction({
      kind: 'pan',
      pointerId: e.pointerId,
      captureEl,
      startClient: { x: e.clientX, y: e.clientY },
      startViewport: { x: this.viewport.x, y: this.viewport.y }
    });
  }

  private beginOrbit(e: PointerEvent, captureEl: Element): void {
    this.stopCameraAnimation();
    this.beginInteraction({
      kind: 'orbit',
      pointerId: e.pointerId,
      captureEl,
      startClient: { x: e.clientX, y: e.clientY },
      startPitch: this.orbitPitch,
      startYaw: this.orbitYaw
    });
  }

  /** Pan : le delta du pointeur est tourné de −rotation de vue (le plan suit le pointeur, v1.0.28). */
  private updatePan(it: { startClient: Point; startViewport: Point }, e: PointerEvent): void {
    const pos = this.pannedViewport(it.startViewport, { x: e.clientX - it.startClient.x, y: e.clientY - it.startClient.y });
    this.viewport = { ...this.viewport, x: pos.x, y: pos.y };
    this.viewTouched = true;
  }

  /** Un appui qui glisse au-delà du seuil de tap devient un déplacement de la vue. */
  private convertToPan(it: PointerInteraction & { startClient: Point; startViewport: Point }, e: PointerEvent): void {
    this.interaction = {
      kind: 'pan',
      pointerId: it.pointerId,
      captureEl: it.captureEl,
      startClient: it.startClient,
      startViewport: it.startViewport
    };
    this.updatePan(it, e);
  }

  private convertToMarquee(it: PointerInteraction & { startWorld: Point }, e: PointerEvent): void {
    this.interaction = { kind: 'marquee', pointerId: it.pointerId, captureEl: it.captureEl };
    this.marqueeStart = it.startWorld;
    this.marqueeCurrent = this.clientToWorld(e.clientX, e.clientY);
  }

  private convertToOrbit(it: PointerInteraction & { startClient: Point }, e: PointerEvent): void {
    this.stopCameraAnimation();
    this.interaction = {
      kind: 'orbit',
      pointerId: it.pointerId,
      captureEl: it.captureEl,
      startClient: it.startClient,
      startPitch: this.orbitPitch,
      startYaw: this.orbitYaw
    };
    this.updateOrbit(this.interaction, e);
  }

  private updateOrbit(it: OrbitInteraction, e: PointerEvent): void {
    this.orbitYaw = (it.startYaw + (e.clientX - it.startClient.x) * 0.55) % 360;
    this.orbitPitch = Math.max(15, Math.min(85, it.startPitch - (e.clientY - it.startClient.y) * 0.38));
  }

  // ==========================================
  // APPUI SUR LE FOND (outils, pan, cadre, orbite)
  // ==========================================

  private handlePointerDown(e: PointerEvent): void {
    // Clic sur l'interface HUD (zoom, centrage, rotation, presets 3D, coords...) :
    // ne jamais déclencher le traçage d'un mur ou d'un outil sur le canvas !
    // Vue WebGL : la caméra et les clics sont gérés par la vue elle-même.
    if (this.webgl3D || eventHits(e, this, HUD_SELECTOR)) return;
    if (this.interaction.kind !== 'none' || !e.isPrimary) return;
    const container = e.currentTarget as Element;

    if (this.is3DMode) {
      // 1. Clic molette ou Maj + clic : pan ; 2. clic droit ou Alt + clic : orbite ;
      // 3. clic gauche sur le fond : orbite (et désélection).
      if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
        this.beginPan(e, container);
      } else if (e.button === 2 || (e.button === 0 && e.altKey)) {
        this.beginOrbit(e, container);
      } else if (e.button === 0 && !eventHits(e, this, PLAN_OBJECT_SELECTOR)) {
        if (this.canSelect) this.setSelection(emptySelection());
        this.beginOrbit(e, container);
      }
      return;
    }

    if (e.button === 1) {
      this.beginPan(e, container);
      return;
    }
    if (e.button !== 0) return;

    // Carte : glisser à la souris pour déplacer la vue ; au doigt, le défilement de la page reste
    // possible et la vue se déplace à deux doigts (constat F54).
    if (!this.canSelect) {
      if (e.pointerType === 'mouse') this.beginPan(e, container);
      return;
    }

    if (this.activeTool === 'select' || !this.canEdit) {
      if (e.shiftKey) {
        // Maj + glisser sur le fond : sélection par cadre
        const world = this.clientToWorld(e.clientX, e.clientY);
        this.marqueeStart = world;
        this.marqueeCurrent = world;
        this.beginInteraction({ kind: 'marquee', pointerId: e.pointerId, captureEl: container });
        return;
      }
      // Clic sur le fond : désélection et pan
      this.setSelection(emptySelection());
      this.beginPan(e, container);
      return;
    }

    if (e.shiftKey) {
      this.beginPan(e, container);
      return;
    }

    if (this.activeTool === 'rect_room') {
      this.beginRectRoom(e, container);
      return;
    }

    // Outils de tracé : l'action a lieu au relâchement d'un tap ; un glisser déplace la vue (constat F53).
    this.beginInteraction({
      kind: 'tool-tap',
      pointerId: e.pointerId,
      captureEl: container,
      startClient: { x: e.clientX, y: e.clientY },
      startViewport: { x: this.viewport.x, y: this.viewport.y },
      pointerType: e.pointerType
    });
    this.updateHover(e);
  }

  // ==========================================
  // DÉPLACEMENT ET RELÂCHEMENT
  // ==========================================

  private handlePointerMove(e: PointerEvent): void {
    // Vue WebGL : les coordonnées viennent de la vue ('view3d-hover').
    if (this.webgl3D) return;
    const it = this.interaction;
    if (it.kind === 'gesture') {
      if (it.ids.includes(e.pointerId)) this.updateGesture(it);
      return;
    }
    if (it.kind === 'none') {
      this.updateHover(e);
      return;
    }
    if (it.pointerId !== e.pointerId) return;

    switch (it.kind) {
      case 'pan':
        this.updatePan(it, e);
        return;
      case 'orbit':
        this.updateOrbit(it, e);
        return;
      case 'marquee':
        this.marqueeCurrent = this.clientToWorld(e.clientX, e.clientY);
        return;
      case 'tool-tap':
      case 'placement':
        if (exceedsTapSlop(it.startClient, { x: e.clientX, y: e.clientY }, it.pointerType)) this.convertToPan(it, e);
        else if (it.kind === 'tool-tap') this.updateHover(e);
        return;
      case 'rect-room':
        this.updateRectRoom(e);
        return;
      case 'press':
        this.updatePress(it, e);
        return;
      case 'furniture-rotate':
        this.updateFurnitureRotation(it, e);
        return;
      case 'furniture-resize':
        this.updateFurnitureResize(it, e);
        return;
      case 'wall-endpoint':
        this.updateWallEndpoint(it, e);
        return;
      case 'room-vertex':
        this.updateRoomVertex(it, e);
        return;
    }
  }

  private handlePointerUp(e: PointerEvent): void {
    const it = this.interaction;
    if (it.kind === 'gesture') {
      if (it.ids.includes(e.pointerId)) this.endInteraction();
      return;
    }
    if (it.kind === 'none' || it.pointerId !== e.pointerId) return;

    switch (it.kind) {
      case 'marquee':
        this.finishMarquee();
        break;
      case 'tool-tap':
        this.applyToolTap(e);
        break;
      case 'placement':
        this.placePending(e);
        break;
      case 'rect-room':
        this.finishRectRoom(it, e);
        break;
      case 'press':
        this.finishPress(it);
        break;
      case 'furniture-rotate':
        if (this.furnitureChanged(it.base, it.itemId, ['rotation'])) this.dispatchProjectChanged();
        break;
      case 'furniture-resize':
        if (this.furnitureChanged(it.base, it.itemId, ['width', 'length'])) this.dispatchProjectChanged();
        break;
      case 'wall-endpoint':
      case 'room-vertex':
        this.clearPreview();
        if (this.project !== it.base) this.dispatchProjectChanged();
        break;
      default:
        break;
    }
    this.endInteraction();
  }

  private handlePointerCancel(e: PointerEvent): void {
    const it = this.interaction;
    if (it.kind === 'none') return;
    if (it.kind === 'gesture' ? it.ids.includes(e.pointerId) : it.pointerId === e.pointerId) this.cancelInteraction();
  }

  /** Capture perdue sans relâchement (élément retiré, geste système) : le geste est annulé (constat F121). */
  private handleLostPointerCapture(e: PointerEvent): void {
    const it = this.interaction;
    if (it.kind === 'none' || it.kind === 'gesture') return;
    if (it.pointerId === e.pointerId && it.captureEl === e.target) this.cancelInteraction();
  }

  /** L'aperçu et l'accrochage ne restent pas affichés quand le pointeur quitte le canevas (constat F42). */
  private handlePointerLeave(): void {
    if (this.interaction.kind !== 'none') return;
    this.clearPreview();
    this.wallSnap = null;
    this.openingFit = null;
  }

  private handleDoubleClick(e: MouseEvent): void {
    if (!this.canEdit2D) return;
    if (this.activeTool === 'room' && this.roomDraft.length >= 3) {
      e.preventDefault();
      this.closeRoomDraft();
    } else if (this.activeTool === 'wall' && this.drawingWallStart) {
      // Double-clic (ou double tap) : fin de la chaîne de murs, sans clavier.
      this.drawingWallStart = null;
      this.clearPreview();
    }
  }

  // ==========================================
  // SURVOL : APERÇUS ET ACCROCHAGE DES OUTILS
  // ==========================================

  private setPreview(snap: SnapResult): void {
    this.previewPoint = snap.point;
    this.snapInfo = {
      snappedTo: snap.snappedTo,
      guideAngle: snap.guideAngle,
      smartGuideX: snap.smartGuideX,
      smartGuideY: snap.smartGuideY,
      wallId: snap.wallId
    };
  }

  private clearPreview(): void {
    this.previewPoint = null;
    this.snapInfo = NO_SNAP;
  }

  /** Accrochage d'un point de tracé : grille et bascules de project.grid, tolérances en pixels, Alt = libre. */
  private snapDraw(world: Point, origin: Point | undefined, free: boolean): SnapResult {
    return snapDrawingPoint(world, this.project.grid, this.project.walls, origin, this.screenPpm, free);
  }

  /** Sommet de pièce : retour sur le premier sommet (fermeture), sinon accrochage depuis le sommet précédent. */
  private snapRoomVertex(world: Point, free: boolean): SnapResult {
    const draft = this.roomDraft;
    if (draft.length >= 3 && distance(world, draft[0]) * this.screenPpm <= ROOM_CLOSE_TOLERANCE_PX) {
      return { point: { ...draft[0] }, snappedTo: 'vertex', constraints: ['vertex'] };
    }
    return this.snapDraw(world, draft[draft.length - 1], free);
  }

  private updateHover(e: PointerEvent): void {
    // Carte : pas de HUD de coordonnées.
    if (this.isDashboardMode) return;
    const world = this.clientToWorld(e.clientX, e.clientY);
    this.cursorCoords = {
      x: SnappingEngine.roundMeters(world.x),
      y: SnappingEngine.roundMeters(world.y)
    };
    // Le survol sans outil de tracé ne modifie aucun état réactif : aucun nouveau rendu du plan (constat F35).
    this.paintCoords();
    if (!this.canEdit2D) {
      this.clearPreview();
      return;
    }

    const free = e.altKey;
    switch (this.activeTool) {
      case 'wall':
        this.setPreview(this.snapDraw(world, this.drawingWallStart ?? undefined, free));
        break;
      case 'room':
        this.setPreview(this.snapRoomVertex(world, free));
        break;
      case 'rect_room': {
        const snap = this.snapDraw(world, undefined, free);
        this.setPreview(snap);
        if (this.rectStart) this.rectCurrent = snap.point;
        break;
      }
      case 'door':
      case 'window':
      case 'french_window':
        this.clearPreview();
        this.updateOpeningPreview(world);
        break;
      case 'calibrate':
        this.clearPreview();
        if (this.calibrateStart) this.calibrateCurrent = world;
        break;
      case 'rescale': {
        const snap = snapMeasurePoint(world, this.project.walls, this.screenPpm, free);
        this.setPreview(snap);
        if (this.rescaleStart) this.rescaleCurrent = snap.point;
        break;
      }
      default:
        this.clearPreview();
        break;
    }
  }

  private currentOpeningType(): OpeningType | null {
    switch (this.activeTool) {
      case 'door': return 'door';
      case 'window': return 'window';
      case 'french_window': return 'french_window';
      default: return null;
    }
  }

  /** Largeur demandée pour l'ouverture à poser (largeur choisie, sinon largeur usuelle du type). */
  private requestedOpeningWidth(type: OpeningType): number {
    const defaultW = type === 'door'
      ? 0.90
      : (type === 'french_window' ? 2.00 : (this.windowSashCount === 2 ? 1.40 : 0.90));
    return this.currentOpeningWidth || defaultW;
  }

  /** Mur survolé et placement borné de l'ouverture (largeur réduite au mur, chevauchements signalés, constat F44). */
  private computeOpeningPlacement(world: Point): { snap: WallSnapResult; fit: OpeningFit } | null {
    const type = this.currentOpeningType();
    if (!type) return null;
    const snap = snapToWall(world, this.project.walls, this.screenPpm);
    if (!snap) return null;
    const fit = SnappingEngine.fitOpening(snap.wall, snap.offset, this.requestedOpeningWidth(type), {
      walls: this.project.walls,
      openings: this.project.openings
    });
    return { snap, fit };
  }

  private updateOpeningPreview(world: Point): void {
    const placement = this.computeOpeningPlacement(world);
    this.wallSnap = placement?.snap ?? null;
    this.openingFit = placement?.fit ?? null;
  }

  // ==========================================
  // OUTILS DE TRACÉ (action au tap)
  // ==========================================

  private applyToolTap(e: PointerEvent): void {
    if (!this.canEdit2D) return;
    const world = this.clientToWorld(e.clientX, e.clientY);
    const free = e.altKey;
    switch (this.activeTool) {
      case 'wall':
        this.tapWall(world, free);
        break;
      case 'room':
        this.tapRoomVertex(world, free);
        break;
      case 'door':
      case 'window':
      case 'french_window':
        this.tapOpening(world);
        break;
      case 'calibrate':
        this.tapCalibrate(world);
        break;
      case 'rescale':
        this.tapRescale(world, free);
        break;
      default:
        break;
    }
  }

  private tapWall(world: Point, free: boolean): void {
    const snapped = this.snapDraw(world, this.drawingWallStart ?? undefined, free).point;
    if (!this.drawingWallStart) {
      this.drawingWallStart = snapped;
      return;
    }
    const start = this.drawingWallStart;
    if (SnappingEngine.distance(start, snapped) < MIN_DRAWN_WALL_LENGTH) return;
    const newWall: Wall = {
      id: generateElementId('wall'),
      start: { ...start },
      end: { ...snapped },
      thickness: this.currentWallThickness,
      type: 'standard'
    };
    this.commitProject({ ...this.project, walls: [...this.project.walls, newWall] });
    this.drawingWallStart = snapped;
  }

  private tapRoomVertex(world: Point, free: boolean): void {
    const draft = this.roomDraft;
    if (draft.length >= 3 && distance(world, draft[0]) * this.screenPpm <= ROOM_CLOSE_TOLERANCE_PX) {
      this.closeRoomDraft();
      return;
    }
    const point = this.snapRoomVertex(world, free).point;
    const last = draft[draft.length - 1];
    if (last && distance(point, last) * this.screenPpm <= DUPLICATE_TAP_PX) return;
    this.roomDraft = [...draft, point];
  }

  /** Ferme le contour en cours (double-clic, Entrée, clic sur le premier sommet) et crée la pièce (constat F46). */
  private closeRoomDraft(): void {
    const issue = roomPolygonIssue(this.roomDraft);
    if (issue) {
      this.flashHint(ROOM_ISSUE_MESSAGES[issue]);
      return;
    }
    const room = createRoom(this.roomDraft, this.project.rooms);
    this.roomDraft = [];
    this.clearPreview();
    this.addRoom(room);
  }

  /**
   * Ajoute une pièce tracée : les entités et meubles qu'elle contient lui sont rattachés, elle est
   * sélectionnée et sa fiche s'ouvre pour la nommer ('room-selected').
   */
  private addRoom(room: Room): void {
    this.commitProject(reassignRooms({ ...this.project, rooms: [...this.project.rooms, room] }));
    this.setSelection(selectOnly({ kind: 'room', id: room.id }));
    this.emitRoomSelected(room);
  }

  /** Ouvre la fiche de la pièce dans le parent (nom, couleur, hauteur). */
  private emitRoomSelected(room: Room): void {
    this.dispatchEvent(new CustomEvent('room-selected', {
      detail: { room },
      bubbles: true,
      composed: true
    }));
  }

  private beginRectRoom(e: PointerEvent, container: Element): void {
    const point = this.snapDraw(this.clientToWorld(e.clientX, e.clientY), undefined, e.altKey).point;
    if (!this.rectStart) this.rectStart = point;
    this.rectCurrent = point;
    this.beginInteraction({
      kind: 'rect-room',
      pointerId: e.pointerId,
      captureEl: container,
      startClient: { x: e.clientX, y: e.clientY },
      pointerType: e.pointerType
    });
  }

  private updateRectRoom(e: PointerEvent): void {
    const snap = this.snapDraw(this.clientToWorld(e.clientX, e.clientY), undefined, e.altKey);
    this.setPreview(snap);
    this.rectCurrent = snap.point;
  }

  /**
   * Pièce rectangulaire : glisser d'un angle à l'angle opposé, ou cliquer deux angles (un premier clic
   * sans glisser fixe le premier angle).
   */
  private finishRectRoom(it: RectRoomInteraction, e: PointerEvent): void {
    const start = this.rectStart;
    const end = this.rectCurrent;
    if (!start || !end) return;
    const dragged = exceedsTapSlop(it.startClient, { x: e.clientX, y: e.clientY }, it.pointerType);
    if (Math.abs(end.x - start.x) >= MIN_RECT_ROOM_SIDE && Math.abs(end.y - start.y) >= MIN_RECT_ROOM_SIDE) {
      this.rectStart = null;
      this.rectCurrent = null;
      this.clearPreview();
      this.addRoom(createRoom(rectanglePolygon(start, end), this.project.rooms));
      return;
    }
    if (!dragged && SnappingEngine.distance(start, end) < 1e-9) return; // premier angle posé : attendre le second
    this.rectStart = null;
    this.rectCurrent = null;
    this.flashHint(ROOM_ISSUE_MESSAGES['too-small']);
  }

  private tapOpening(world: Point): void {
    const type = this.currentOpeningType();
    const placement = this.computeOpeningPlacement(world);
    this.wallSnap = placement?.snap ?? null;
    this.openingFit = placement?.fit ?? null;
    if (!type || !placement) return;
    const { snap, fit } = placement;
    if (!fit.fits) {
      this.flashHint('Mur trop court pour cette ouverture.');
      return;
    }
    if (fit.overlaps.length > 0) {
      this.flashHint('Une ouverture occupe déjà cet emplacement.');
      return;
    }
    const newOpening: Opening = {
      id: generateElementId('op'),
      wallId: snap.wall.id,
      type,
      offset: fit.offset,
      width: fit.width,
      flipSide: this.openingFlipSide,
      flipDirection: this.openingFlipDirection,
      sashCount: this.sashCountFor(type)
    };
    this.commitProject({ ...this.project, openings: [...this.project.openings, newOpening] });
    this.updateOpeningPreview(world);
  }

  /** Étalonnage : deux points en mètres monde ; la distance est transmise en mètres (constats F50, F51). */
  private tapCalibrate(world: Point): void {
    if (!this.calibrateStart) {
      this.calibrateStart = world;
      this.calibrateCurrent = world;
      return;
    }
    const worldDistance = SnappingEngine.distance(this.calibrateStart, world);
    if (worldDistance * this.screenPpm < MIN_CALIBRATION_PX) return;
    this.dispatchEvent(new CustomEvent('request-calibration', {
      detail: {
        worldDistance,
        defaultMeters: SnappingEngine.roundMeters(worldDistance)
      },
      bubbles: true,
      composed: true
    }));
    this.calibrateStart = null;
    this.calibrateCurrent = null;
  }

  /** Mise à l'échelle : sommets puis murs uniquement, distance transmise sans arrondi (constat F140). */
  private tapRescale(world: Point, free: boolean): void {
    const point = snapMeasurePoint(world, this.project.walls, this.screenPpm, free).point;
    if (!this.rescaleStart) {
      this.rescaleStart = point;
      this.rescaleCurrent = point;
      return;
    }
    const dist = SnappingEngine.distance(this.rescaleStart, point);
    if (dist < MIN_RESCALE_METERS) return;
    this.dispatchEvent(new CustomEvent('request-rescale', {
      detail: { measuredMeters: dist },
      bubbles: true,
      composed: true
    }));
    this.rescaleStart = null;
    this.rescaleCurrent = null;
    this.clearPreview();
  }

  /** Remet à zéro tout tracé en cours (changement d'outil ou de plan, Échap, passage en 3D ; constat F42). */
  private resetToolState(): void {
    this.drawingWallStart = null;
    this.roomDraft = [];
    this.rectStart = null;
    this.rectCurrent = null;
    this.calibrateStart = null;
    this.calibrateCurrent = null;
    this.rescaleStart = null;
    this.rescaleCurrent = null;
    this.wallSnap = null;
    this.openingFit = null;
    this.clearPreview();
  }

  // ==========================================
  // SÉLECTION ET DÉPLACEMENT DES ÉLÉMENTS
  // ==========================================

  private setSelection(next: SelectedElements): void {
    if (sameSelection(next, this.selectedElements)) return;
    this.selectedElements = next;
    this.dispatchSelectionChanged();
  }

  private dispatchSelectionChanged(): void {
    this.dispatchEvent(new CustomEvent('selection-changed', {
      detail: { selectedElements: this.selectedElements },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Appui sur un élément du plan. Avec un outil de tracé, l'appui traverse l'élément et revient au
   * canevas (constat F43). Avec l'outil Sélection, la sélection est décidée en un seul endroit par geste
   * (constat F41) : un élément non sélectionné est sélectionné (ou ajouté avec Maj/Ctrl/⌘) dès l'appui
   * pour pouvoir le glisser ; au relâchement sans glisser, Maj/Ctrl/⌘ retire un élément déjà sélectionné
   * et un clic simple réduit la sélection à l'élément. Une pièce n'est sélectionnée qu'au relâchement :
   * glisser une pièce non sélectionnée déplace la vue (pan à un doigt possible même zoomé sur le logement).
   */
  private handleElementPointerDown(ref: ElementRef, e: PointerEvent): void {
    if (e.button !== 0 || !e.isPrimary) return;
    if (!this.selectsElements || this.interaction.kind !== 'none') return;
    e.stopPropagation();

    const modifier = e.shiftKey || e.ctrlKey || e.metaKey;
    const wasSelected = isSelected(this.selectedElements, ref);
    if (ref.kind !== 'room' && !wasSelected) {
      this.setSelection(modifier ? addToSelection(this.selectedElements, ref) : selectOnly(ref));
    }
    const world = this.clientToWorld(e.clientX, e.clientY);
    this.beginInteraction({
      kind: 'press',
      ref,
      pointerId: e.pointerId,
      captureEl: e.currentTarget as Element,
      startClient: { x: e.clientX, y: e.clientY },
      startWorld: world,
      startViewport: { x: this.viewport.x, y: this.viewport.y },
      pointerType: e.pointerType,
      modifier,
      wasSelected,
      mode: 'pending',
      base: this.project,
      moveSet: null,
      anchor: world,
      snap: 'free'
    });
  }

  private updatePress(it: PressInteraction, e: PointerEvent): void {
    if (it.mode === 'pending') {
      if (!exceedsTapSlop(it.startClient, { x: e.clientX, y: e.clientY }, it.pointerType)) return;
      if (this.is3DMode) {
        // En 3D rien ne se déplace (constat F52) : glisser sur un élément fait pivoter la vue, comme sur le fond.
        this.convertToOrbit(it, e);
        return;
      }
      if (it.ref.kind === 'room' && it.modifier) {
        // Maj + glisser depuis une pièce (qui couvre presque tout le plan) : sélection par cadre, comme sur le fond.
        this.convertToMarquee(it, e);
        return;
      }
      if ((it.ref.kind === 'room' && !it.wasSelected) || !this.canEdit2D) {
        // Pièce non sélectionnée, ou plan non modifiable : le glisser déplace la vue.
        this.convertToPan(it, e);
        return;
      }
      if (it.ref.kind === 'opening') {
        it.mode = 'slide';
      } else {
        const moveSet = buildMoveSet(it.base, this.selectedElements);
        if (isMoveSetEmpty(moveSet)) {
          it.mode = 'idle';
          return;
        }
        it.moveSet = moveSet;
        Object.assign(it, this.dragAnchor(it.ref, it.startWorld, it.base));
        it.mode = 'move';
      }
    }
    if (it.mode === 'move') this.dragSelection(it, e);
    else if (it.mode === 'slide') this.dragOpening(it, e);
  }

  /**
   * Point de référence d'un déplacement : extrémité du mur ou sommet de la pièce le plus proche du point
   * saisi (accrochés aux sommets, guides et à la grille absolue, constat F45), position du meuble
   * (déplacement libre au millimètre, v1.0.24) ou de l'entité.
   */
  private dragAnchor(ref: ElementRef, grab: Point, base: HomeArchitectProject): { anchor: Point; snap: PressInteraction['snap'] } {
    const nearest = (points: Point[]): Point =>
      points.reduce((best, p) => (SnappingEngine.distance(p, grab) < SnappingEngine.distance(best, grab) ? p : best));
    switch (ref.kind) {
      case 'wall': {
        const wall = base.walls.find(w => w.id === ref.id);
        if (wall) return { anchor: nearest([wall.start, wall.end]), snap: 'structure' };
        break;
      }
      case 'room': {
        const room = base.rooms.find(r => r.id === ref.id);
        if (room && room.polygon.length > 0) return { anchor: nearest(room.polygon), snap: 'structure' };
        break;
      }
      case 'furniture': {
        const item = (base.furniture || []).find(f => f.id === ref.id);
        if (item) return { anchor: item.position, snap: 'furniture' };
        break;
      }
      case 'binding': {
        const binding = base.bindings.find(b => b.id === ref.id);
        if (binding) return { anchor: binding.position, snap: 'free' };
        break;
      }
      default:
        break;
    }
    return { anchor: grab, snap: 'free' };
  }

  /**
   * Déplacement de la sélection en coordonnées monde (juste quelle que soit la rotation de vue) : les
   * murs connectés suivent, les pièces posées sur les jonctions se déforment (surface recalculée), les
   * roomId sont recalculés. Alt coupe l'accrochage des murs et pièces ; pour les meubles, Alt aligne
   * sur la grille si l'accrochage à la grille est actif.
   */
  private dragSelection(it: PressInteraction, e: PointerEvent): void {
    const set = it.moveSet;
    if (!set) return;
    const world = this.clientToWorld(e.clientX, e.clientY);
    const raw = { x: it.anchor.x + world.x - it.startWorld.x, y: it.anchor.y + world.y - it.startWorld.y };
    let target: Point;
    if (it.snap === 'structure') {
      const moving = new Set(set.wallIds);
      const snap = snapDrawingPoint(raw, this.project.grid, it.base.walls, undefined, this.screenPpm, e.altKey, {
        excludeWallIds: set.wallIds,
        excludePoints: it.base.walls.filter(w => moving.has(w.id)).flatMap(w => [w.start, w.end])
      });
      this.setPreview(snap);
      target = snap.point;
    } else if (it.snap === 'furniture' && this.project.grid.snapToGrid && e.altKey) {
      const size = this.project.grid.size || 0.5;
      target = { x: SnappingEngine.quantize(raw.x, size), y: SnappingEngine.quantize(raw.y, size) };
    } else {
      target = SnappingEngine.roundPoint(raw);
    }
    const next = translateSelection(it.base, set, { x: target.x - it.anchor.x, y: target.y - it.anchor.y });
    if (next) this.setLocalProject(next);
  }

  /** Glisser d'une ouverture le long de son mur, bornée au mur et sans chevauchement (constat F131). */
  private dragOpening(it: PressInteraction, e: PointerEvent): void {
    const op = it.base.openings.find(o => o.id === it.ref.id);
    const wall = op ? it.base.walls.find(w => w.id === op.wallId) : undefined;
    if (!op || !wall) return;
    const world = this.clientToWorld(e.clientX, e.clientY);
    const raw = op.offset + offsetAlongWall(wall, world) - offsetAlongWall(wall, it.startWorld);
    const offset = e.altKey ? raw : SnappingEngine.quantize(raw, OPENING_SLIDE_STEP);
    const next = slideOpening(it.base, op.id, offset);
    if (next) this.setLocalProject(next);
  }

  private finishPress(it: PressInteraction): void {
    if (it.mode !== 'pending') {
      this.clearPreview();
      if (this.project !== it.base) this.dispatchProjectChanged();
      return;
    }
    // Tap sans glisser : décision finale de la sélection.
    const sel = this.selectedElements;
    const ref = it.ref;
    let next = sel;
    if (ref.kind === 'room') {
      next = it.modifier
        ? (it.wasSelected ? removeFromSelection(sel, ref) : addToSelection(sel, ref))
        : selectOnly(ref);
    } else if (it.modifier) {
      if (it.wasSelected) next = removeFromSelection(sel, ref);
    } else if (selectionCount(sel) > 1 || !isSelected(sel, ref)) {
      next = selectOnly(ref);
    }
    this.setSelection(next);
  }

  private finishMarquee(): void {
    const start = this.marqueeStart;
    const end = this.marqueeCurrent;
    this.marqueeStart = null;
    this.marqueeCurrent = null;
    if (!start || !end) return;
    const minX = Math.min(start.x, end.x);
    const maxX = Math.max(start.x, end.x);
    const minY = Math.min(start.y, end.y);
    const maxY = Math.max(start.y, end.y);
    if (maxX - minX <= 0.05 && maxY - minY <= 0.05) return;
    const inside = (p: Point) => p.x >= minX && p.x <= maxX && p.y >= minY && p.y <= maxY;

    const foundWalls = this.project.walls
      .filter(w => inside({ x: (w.start.x + w.end.x) / 2, y: (w.start.y + w.end.y) / 2 }))
      .map(w => w.id);

    const foundOpenings = this.project.openings.filter(op => {
      const wall = this.project.walls.find(w => w.id === op.wallId);
      if (!wall) return false;
      const dx = wall.end.x - wall.start.x;
      const dy = wall.end.y - wall.start.y;
      const l = Math.sqrt(dx * dx + dy * dy);
      if (l === 0) return false;
      return inside({ x: wall.start.x + (op.offset / l) * dx, y: wall.start.y + (op.offset / l) * dy });
    }).map(op => op.id);

    // Point d'étiquette : toujours à l'intérieur de la pièce, même concave.
    const foundRooms = this.project.rooms
      .filter(r => r.polygon && r.polygon.length >= 3 && inside(PolygonUtils.labelPoint(r.polygon)))
      .map(r => r.id);

    const foundBindings = this.project.bindings.filter(b => inside(b.position)).map(b => b.id);
    const foundFurniture = (this.project.furniture || []).filter(f => inside(f.position)).map(f => f.id);

    const sel = this.selectedElements;
    this.setSelection({
      wallIds: Array.from(new Set([...sel.wallIds, ...foundWalls])),
      openingIds: Array.from(new Set([...sel.openingIds, ...foundOpenings])),
      roomIds: Array.from(new Set([...sel.roomIds, ...foundRooms])),
      bindingIds: Array.from(new Set([...sel.bindingIds, ...foundBindings])),
      furnitureIds: Array.from(new Set([...(sel.furnitureIds || []), ...foundFurniture]))
    });
  }

  // ==========================================
  // POIGNÉES (meubles, extrémités de murs, sommets de pièces)
  // ==========================================

  private selectFurniture(itemId: string): void {
    if (!this.selectedElements.furnitureIds?.includes(itemId)) {
      this.setSelection(selectOnly({ kind: 'furniture', id: itemId }));
    }
  }

  private furnitureChanged(base: HomeArchitectProject, itemId: string, keys: Array<'rotation' | 'width' | 'length'>): boolean {
    const before = (base.furniture || []).find(f => f.id === itemId);
    const after = (this.project.furniture || []).find(f => f.id === itemId);
    return !!before && !!after && keys.some(k => before[k] !== after[k]);
  }

  private replaceFurniture(base: HomeArchitectProject, itemId: string, patch: Partial<FurnitureItem>): void {
    this.setLocalProject({
      ...base,
      furniture: (base.furniture || []).map(f => (f.id === itemId ? { ...f, ...patch } : f))
    });
  }

  private handleFurnitureRotatePointerDown(item: FurnitureItem, e: PointerEvent): void {
    if (!this.canEdit2D || e.button !== 0 || this.interaction.kind !== 'none') return;
    e.stopPropagation();

    // Angle initial du curseur par rapport au centre du meuble, en coordonnées monde
    const mouseWorld = this.clientToWorld(e.clientX, e.clientY);
    const startAngle = Math.atan2(mouseWorld.y - item.position.y, mouseWorld.x - item.position.x) * (180 / Math.PI);

    // Assurer que le meuble est sélectionné
    this.selectFurniture(item.id);
    this.beginInteraction({
      kind: 'furniture-rotate',
      pointerId: e.pointerId,
      captureEl: e.currentTarget as Element,
      itemId: item.id,
      startAngle,
      initialAngle: item.rotation || 0,
      base: this.project
    });
  }

  private updateFurnitureRotation(it: FurnitureRotateInteraction, e: PointerEvent): void {
    const item = (it.base.furniture || []).find(f => f.id === it.itemId);
    if (!item) return;
    const mouseWorld = this.clientToWorld(e.clientX, e.clientY);
    const currentAngle = Math.atan2(mouseWorld.y - item.position.y, mouseWorld.x - item.position.x) * (180 / Math.PI);
    let newAngle = Math.round(it.initialAngle + currentAngle - it.startAngle);
    // Angle normalisé entre 0 et 359 degrés
    newAngle = ((newAngle % 360) + 360) % 360;
    this.replaceFurniture(it.base, it.itemId, { rotation: newAngle });
  }

  private handleFurnitureResizePointerDown(item: FurnitureItem, e: PointerEvent): void {
    if (!this.canEdit2D || e.button !== 0 || this.interaction.kind !== 'none') return;
    e.stopPropagation();

    const tmpl = findFurnitureTemplate(item.type);
    // Assurer que le meuble est sélectionné
    this.selectFurniture(item.id);
    this.beginInteraction({
      kind: 'furniture-resize',
      pointerId: e.pointerId,
      captureEl: e.currentTarget as Element,
      itemId: item.id,
      startClient: { x: e.clientX, y: e.clientY },
      initialWidth: item.width || tmpl?.width || 1.0,
      initialLength: item.length || tmpl?.length || 1.0,
      base: this.project
    });
  }

  /** Étirement en coordonnées monde dans le repère du meuble (rotation du meuble prise en compte, v1.0.26). */
  private updateFurnitureResize(it: FurnitureResizeInteraction, e: PointerEvent): void {
    const item = (it.base.furniture || []).find(f => f.id === it.itemId);
    if (!item) return;
    const currentWorld = this.clientToWorld(e.clientX, e.clientY);
    const startWorld = this.clientToWorld(it.startClient.x, it.startClient.y);
    const dxWorld = currentWorld.x - startWorld.x;
    const dyWorld = currentWorld.y - startWorld.y;

    // Angle du meuble dans l'espace monde
    const rad = ((item.rotation || 0) * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    // Projection du vecteur de déplacement dans le repère local du meuble (axe X = largeur, axe Y = longueur)
    const dWidthMeters = dxWorld * cos + dyWorld * sin;
    const dLengthMeters = -dxWorld * sin + dyWorld * cos;

    let newWidth = Math.max(MIN_FURNITURE_SIZE, it.initialWidth + dWidthMeters);
    let newLength = Math.max(MIN_FURNITURE_SIZE, it.initialLength + dLengthMeters);

    // Si Shift est maintenu, conserver les proportions d'origine (aspect ratio)
    if (e.shiftKey && it.initialWidth > 0 && it.initialLength > 0) {
      const ratio = it.initialLength / it.initialWidth;
      const scale = Math.max(newWidth / it.initialWidth, newLength / it.initialLength);
      newWidth = Math.max(MIN_FURNITURE_SIZE, it.initialWidth * scale);
      newLength = Math.max(MIN_FURNITURE_SIZE, newWidth * ratio);
    }

    // Arrondi millimétrique (pixel par pixel)
    this.replaceFurniture(it.base, it.itemId, {
      width: Math.round(newWidth * 1000) / 1000,
      length: Math.round(newLength * 1000) / 1000
    });
  }

  private handleWallEndpointPointerDown(wall: Wall, which: 'start' | 'end', e: PointerEvent): void {
    if (!this.canEdit2D || e.button !== 0 || this.interaction.kind !== 'none') return;
    e.stopPropagation();
    this.beginInteraction({
      kind: 'wall-endpoint',
      pointerId: e.pointerId,
      captureEl: e.currentTarget as Element,
      wallId: wall.id,
      which,
      base: this.project
    });
  }

  /**
   * Poignée d'extrémité de mur (constat F131) : accrochage depuis l'extrémité fixe (angles, sommets,
   * guides, grille ; Alt = libre) ; les murs connectés et les sommets de pièces posés sur l'extrémité suivent.
   */
  private updateWallEndpoint(it: WallEndpointInteraction, e: PointerEvent): void {
    const wall = it.base.walls.find(w => w.id === it.wallId);
    if (!wall) return;
    const fixed = it.which === 'start' ? wall.end : wall.start;
    const snap = snapDrawingPoint(
      this.clientToWorld(e.clientX, e.clientY), this.project.grid, it.base.walls, fixed, this.screenPpm, e.altKey,
      { excludeWallIds: [wall.id], excludePoints: [wall[it.which]] }
    );
    this.setPreview(snap);
    if (SnappingEngine.distance(snap.point, fixed) < MIN_WALL_LENGTH) return;
    const next = moveWallEndpoint(it.base, wall.id, it.which, snap.point);
    if (next) this.setLocalProject(next);
  }

  private handleRoomVertexPointerDown(room: Room, index: number, e: PointerEvent): void {
    if (!this.canEdit2D || e.button !== 0 || this.interaction.kind !== 'none') return;
    e.stopPropagation();
    this.beginInteraction({
      kind: 'room-vertex',
      pointerId: e.pointerId,
      captureEl: e.currentTarget as Element,
      roomId: room.id,
      index,
      base: this.project
    });
  }

  /** Poignée de sommet de pièce : surface recalculée, contour qui se recoupe refusé. */
  private updateRoomVertex(it: RoomVertexInteraction, e: PointerEvent): void {
    const snap = snapDrawingPoint(
      this.clientToWorld(e.clientX, e.clientY), this.project.grid, it.base.walls, undefined, this.screenPpm, e.altKey
    );
    this.setPreview(snap);
    const next = moveRoomVertex(it.base, it.roomId, it.index, snap.point);
    if (next) this.setLocalProject(next);
  }

  // ==========================================
  // DRAG & DROP ET « TOUCHER POUR PLACER » DEPUIS LE VOLET
  // ==========================================

  /** Un fichier glissé depuis le bureau : non traité, le navigateur l'ouvrirait à la place de Home Assistant. */
  private static carriesFiles(e: DragEvent): boolean {
    return Array.from(e.dataTransfer?.types ?? []).includes('Files');
  }

  private handleDragOver(e: DragEvent): void {
    // Carte, lecture seule et 3D : dépôt refusé (curseur « interdit », constats F52 et F119). Un fichier est
    // tout de même intercepté (dropEffect 'none' n'a d'effet que si l'événement est annulé).
    if (!this.canEdit2D) {
      if (!HomeArchitectCanvas.carriesFiles(e)) return;
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = 'none';
      return;
    }
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
    }
  }

  private handleDrop(e: DragEvent): void {
    if (!this.canEdit2D) {
      if (HomeArchitectCanvas.carriesFiles(e)) e.preventDefault();
      return;
    }
    e.preventDefault();

    // 1. Dépose d'un fichier image (Glisser-Déposer depuis le bureau ou le Finder)
    const file = e.dataTransfer?.files?.[0];
    if (file && (file.type.startsWith('image/') || file.name.toLowerCase().endsWith('.svg'))) {
      blobToDataUrl(file).then(
        dataUrl => this.dispatchEvent(new CustomEvent('background-image-loaded', {
          detail: { dataUrl },
          bubbles: true,
          composed: true
        })),
        err => {
          console.error('[home-architect] Lecture de l\'image déposée impossible :', err);
          this.flashHint('Image illisible.');
        }
      );
      return;
    }

    // 2. Dépose d'une entité Home Assistant ou d'un meuble depuis le volet (données validées, constat F123)
    const rawData = e.dataTransfer?.getData('application/json');
    if (!rawData) return;
    let payload: DrawerItemPayload | null;
    try {
      payload = parseDrawerPayload(JSON.parse(rawData));
    } catch (_) {
      payload = null; // JSON invalide (glisser venu d'une autre page)
    }
    if (payload && this.placeDrawerItem(payload, this.clientToWorld(e.clientX, e.clientY))) {
      // Le focus suit l'élément déposé (il était resté dans le volet) : R, flèches et Échap s'appliquent au plan.
      this.focus({ preventScroll: true });
    }
  }

  private placePending(e: PointerEvent): void {
    const payload = this.pendingPlacement;
    if (!payload || !this.canEdit2D) return;
    if (this.placeDrawerItem(payload, this.clientToWorld(e.clientX, e.clientY))) this.dispatchPlacementDone(true);
  }

  private dispatchPlacementDone(placed: boolean): void {
    this.dispatchEvent(new CustomEvent('placement-done', {
      detail: { placed },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Crée l'élément du volet au point monde donné (dépôt ou « toucher pour placer ») : meuble du catalogue
   * (sélectionné), ou liaison d'entité sans nom, icône ni action figés (défauts dynamiques).
   */
  private placeDrawerItem(payload: DrawerItemPayload, world: Point): boolean {
    if (payload.kind === 'furniture') {
      const item = createFurniture(payload.furnitureType, world, this.project.rooms);
      if (!item) {
        this.flashHint('Meuble inconnu du catalogue.');
        return false;
      }
      this.commitProject({ ...this.project, furniture: [...(this.project.furniture || []), item] });
      this.setSelection(selectOnly({ kind: 'furniture', id: item.id }));
      return true;
    }
    if (this.hass?.states && !this.hass.states[payload.entityId]) {
      this.flashHint(`Entité introuvable : ${payload.entityId}`);
      return false;
    }
    const binding = createBinding(payload.entityId, world, this.project.rooms);
    this.commitProject({ ...this.project, bindings: [...this.project.bindings, binding] });
    return true;
  }

  // ==========================================
  // ÉPINGLES D'ENTITÉS
  // ==========================================

  /**
   * Action d'une épingle de la carte (constats F10, F102) : table unique defaultTapAction / serviceForTap,
   * binding.tapAction et holdAction respectés, hass-more-info émis une seule fois (constat F101).
   */
  private runPinAction(bindingId: string, gesture: 'tap' | 'double_tap' | 'hold'): void {
    const binding = this.project.bindings.find(b => b.id === bindingId);
    if (!binding || !this.isDashboardMode) return;
    runEntityAction(binding, gesture, { host: this, hass: this.hass, onError: message => this.flashHint(message) });
  }

  /** Fiche more-info de l'entité (éditeur : jamais d'action sur l'appareil, constat F118). */
  private openMoreInfo(entityId: string): void {
    this.dispatchEvent(new CustomEvent('hass-more-info', {
      detail: { entityId },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Carte : l'appui sur une épingle ne déplace pas la vue ; il est suivi (capture du pointeur) pour
   * reconnaître l'appui long. Éditeur : sélection et glisser comme les autres éléments du plan.
   */
  private handlePinPointerDown(binding: EntityBinding, e: PointerEvent): void {
    if (!this.isDashboardMode) {
      this.handleElementPointerDown({ kind: 'binding', id: binding.id }, e);
      return;
    }
    e.stopPropagation();
    if (e.button !== 0 || !e.isPrimary || this.pointers.size > 1) return;
    try {
      (e.currentTarget as Element).setPointerCapture(e.pointerId);
    } catch (_) {
      // Pointeur déjà relâché : le click éventuel suffit.
    }
    this.pinGestures.down(binding.id, e.clientX, e.clientY, e.pointerType);
  }

  /** Carte : tap ou double tap (le click vient aussi du clavier virtuel et des lecteurs d'écran). */
  private handlePinClick(binding: EntityBinding, e: Event): void {
    if (!this.isDashboardMode) return;
    e.stopPropagation();
    if (this.gestureOccurred) return;
    this.pinGestures.click(binding.id);
  }

  /** Éditeur, outil Sélection : double-clic = fiche more-info (un seul événement). */
  private handlePinDblClick(binding: EntityBinding, e: Event): void {
    if (this.isDashboardMode || !this.selectsElements) return;
    e.stopPropagation();
    this.openMoreInfo(binding.entityId);
  }

  /**
   * Clavier (constat F103) : Entrée / Espace = action du tap sur la carte, sélection dans l'éditeur ;
   * Maj + Entrée ou touche Menu = action de l'appui long sur la carte, fiche more-info dans l'éditeur.
   */
  private handlePinKeyDown(binding: EntityBinding, e: KeyboardEvent): void {
    const secondary = e.key === 'ContextMenu' || (e.key === 'Enter' && e.shiftKey) || (e.key === 'F10' && e.shiftKey);
    const primary = !secondary && (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar');
    if (!primary && !secondary) return;
    if (!this.isDashboardMode && !this.canSelect) return;
    e.preventDefault();
    // Espace ne doit pas, en plus, inverser une porte ni faire défiler la page.
    e.stopPropagation();
    if (e.repeat) return;
    if (this.isDashboardMode) {
      runEntityAction(binding, secondary ? 'hold' : 'tap', { host: this, hass: this.hass, onError: message => this.flashHint(message) });
    } else if (secondary) {
      this.openMoreInfo(binding.entityId);
    } else {
      this.setSelection(selectOnly({ kind: 'binding', id: binding.id }));
    }
  }

  /** Carte : pas de menu contextuel du navigateur sur un appui long (l'appui long ouvre more-info). */
  private handlePinContextMenu(e: Event): void {
    if (this.isDashboardMode) e.preventDefault();
  }

  private handleRoomDblClick(e: MouseEvent, room: Room): void {
    if (!this.canSelect || this.activeTool !== 'select') return;
    e.stopPropagation();
    this.emitRoomSelected(room);
  }

  // ==========================================
  // CLAVIER
  // ==========================================

  public rotateSelectedFurniture(): void {
    const furnIds = this.selectedElements.furnitureIds;
    if (!this.canEdit || !furnIds || furnIds.length === 0) return;
    const newFurniture = (this.project.furniture || []).map(f => {
      if (furnIds.includes(f.id)) {
        return {
          ...f,
          rotation: ((f.rotation || 0) + 90) % 360
        };
      }
      return f;
    });
    this.commitProject({ ...this.project, furniture: newFurniture });
  }

  /** Flèches : déplacement de la sélection de 1 cm (Maj : pas de la grille), dans le sens affiché à l'écran. */
  private nudgeSelection(key: string, coarse: boolean): boolean {
    const screenDir: Record<string, Point> = {
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 }
    };
    const dir = screenDir[key];
    if (!dir) return false;
    const set = buildMoveSet(this.project, this.selectedElements);
    if (isMoveSetEmpty(set)) return false;
    const step = coarse ? (this.project.grid.size > 0 ? this.project.grid.size : 0.5) : NUDGE_STEP;
    const world = rotateVector(dir, -this.viewRotation);
    const next = translateSelection(this.project, set, { x: world.x * step, y: world.y * step });
    if (next && next !== this.project) this.commitProject(next);
    return true;
  }

  /**
   * Raccourcis d'édition du canevas (jamais sur la carte) : uniquement quand l'événement vient du canevas
   * ou que rien n'a le focus, hors champ de saisie et hors modale (constat F4). La touche R n'est traitée
   * qu'ici ; les touches simples sont ignorées avec Ctrl/⌘/Alt (Cmd+R recharge la page, constats F40, F129).
   */
  private handleKeyDown(e: KeyboardEvent): void {
    if (this.isDashboardMode || !this.canSelect) return;
    // Touche déjà traitée ailleurs (le panneau, qui écoute avant window, vient par exemple de fermer une modale avec Échap).
    if (e.defaultPrevented) return;
    if (!shouldHandleShortcut(e, { host: this, modalOpen: this.modalOpen })) return;
    const key = e.key;

    if (key === 'Escape') {
      if (this.pendingPlacement) this.dispatchPlacementDone(false);
      this.cancelInteraction();
      this.resetToolState();
      this.setSelection(emptySelection());
      return;
    }
    if (hasCommandModifier(e)) return;

    if (key === 'Enter' && this.activeTool === 'room' && this.roomDraft.length >= 3 && this.canEdit2D) {
      e.preventDefault();
      this.closeRoomDraft();
    } else if ((key === ' ' || key === 'Spacebar' || key.toLowerCase() === 'f') && this.wallSnap && this.currentOpeningType()) {
      // Espace : intérieur / extérieur ; F : gauche / droite. Le parent possède ces valeurs.
      e.preventDefault();
      if (e.repeat) return;
      const flipSide = key.toLowerCase() === 'f' ? this.openingFlipSide : !this.openingFlipSide;
      const flipDirection = key.toLowerCase() === 'f' ? !this.openingFlipDirection : this.openingFlipDirection;
      this.dispatchEvent(new CustomEvent('opening-config-changed', {
        detail: { flipSide, flipDirection },
        bubbles: true,
        composed: true
      }));
    } else if (key.toLowerCase() === 'r') {
      if (this.selectedElements.furnitureIds && this.selectedElements.furnitureIds.length > 0 && this.canEdit) {
        e.preventDefault();
        if (!e.repeat) this.rotateSelectedFurniture();
      }
    } else if (key.startsWith('Arrow') && this.canEdit2D && this.interaction.kind === 'none') {
      if (this.nudgeSelection(key, e.shiftKey)) e.preventDefault();
    }
  }

  /** Clavier et focus : pas d'écouteur ni de focus en mode carte (constat F4). */
  private syncKeyboardSupport(): void {
    const wanted = this.isConnected && !this.isDashboardMode;
    if (wanted && !this.keyboardBound) {
      window.addEventListener('keydown', this.onKeyDown);
      this.keyboardBound = true;
    } else if (!wanted && this.keyboardBound) {
      window.removeEventListener('keydown', this.onKeyDown);
      this.keyboardBound = false;
    }
    // Focusable au clic (pas au clavier) : les raccourcis suivent le canevas, même si un ancêtre de HA est focusable.
    if (this.isDashboardMode) this.removeAttribute('tabindex');
    else if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '-1');
  }

  private flashHint(message: string): void {
    this.hint = message;
    if (this.hintTimer) clearTimeout(this.hintTimer);
    this.hintTimer = setTimeout(() => {
      this.hint = null;
      this.hintTimer = null;
    }, HINT_DURATION_MS);
  }

  // ==========================================
  // CYCLE DE VIE
  // ==========================================

  connectedCallback(): void {
    super.connectedCallback();
    this.syncKeyboardSupport();
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(entries => this.handleResize(entries[entries.length - 1]?.contentRect));
      this.resizeObserver.observe(this);
    }
    // Animations en pause quand le plan sort de l'écran (carte plus bas dans le tableau de bord, constat F133).
    if (typeof IntersectionObserver !== 'undefined') {
      this.intersectionObserver = new IntersectionObserver(entries => {
        const entry = entries[entries.length - 1];
        if (entry) this.toggleAttribute('offscreen', !entry.isIntersecting);
      });
      this.intersectionObserver.observe(this);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.syncKeyboardSupport();
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.intersectionObserver?.disconnect();
    this.intersectionObserver = null;
    if (this.hintTimer) clearTimeout(this.hintTimer);
    this.hintTimer = null;
    this.hint = null;
    this.cancelInteraction();
    this.pointers.clear();
    this.pinGestures.dispose();
    this.finishCameraAnimation();
  }

  /**
   * Nouveau rendu seulement si nécessaire (constat F34) : un nouvel objet `hass` (à chaque state_changed
   * de n'importe quelle entité de l'installation) ne redessine le plan que si une entité affichée, la
   * langue, l'unité de température ou le mode sombre change.
   */
  protected shouldUpdate(changed: PropertyValues<this>): boolean {
    if (changed.size === 1 && changed.has('hass')) {
      return hassChangeAffects(changed.get('hass') as HassDisplayContext | undefined, this.hass, this.watchedEntities());
    }
    return true;
  }

  /**
   * Redimensionnement : la taille est mise en cache (centre de la rotation de vue) et le plan est recadré
   * tant que l'utilisateur n'a ni zoomé ni déplacé la vue (rotation du téléphone, volet replié ; constat F55).
   */
  private handleResize(rect: DOMRectReadOnly | undefined): void {
    if (!rect) return;
    const previous = this.canvasSize;
    const changed = rect.width !== previous.width || rect.height !== previous.height;
    this.canvasSize = { width: rect.width, height: rect.height };
    // HUD compact sur téléphone et carte étroite (constat F126).
    this.toggleAttribute('compact', rect.width > 0 && rect.width < COMPACT_WIDTH_PX);
    if (!changed) return;
    if (rect.width > 0 && rect.height > 0 && (this.pendingFitPadding !== null || !this.viewTouched)) {
      this.fitPlanView(this.pendingFitPadding ?? undefined);
    } else {
      // Nommé : un nouvel objet hass reçu dans la même micro-tâche ne doit pas faire sauter ce rendu (shouldUpdate).
      this.requestUpdate('canvasSize', previous);
    }
  }

  protected willUpdate(changed: PropertyValues<this>): void {
    super.willUpdate(changed);
    if (changed.has('project')) {
      if (this.project !== this.localProject) this.handleExternalProjectDuringGesture(changed.get('project'));
      this.handleProjectReplaced(changed.get('project'));
    }
    if (changed.has('hass') &&
      hassChangeAffects(changed.get('hass') as HassDisplayContext | undefined, this.hass, this.watchedEntities())) {
      this.entityRevision++;
    }
    if (changed.has('hass') || changed.has('theme')) this.applyColorScheme();
    if (changed.has('animations')) this.toggleAttribute('no-animations', !this.animations);
    if (changed.has('is3DMode') && changed.get('is3DMode') !== undefined) {
      if (this.is3DMode) {
        // Entrée en 3D : la caméra part de la vue de dessus (orientation de la vue 2D) jusqu'à son angle.
        const target = { pitchDeg: this.orbitPitch, yawDeg: this.orbitYaw };
        this.orbitPitch = 0;
        this.orbitYaw = this.viewRotation;
        this.animateCamera(target);
      } else {
        // Sortie de la 3D pendant une transition : l'angle visé est conservé (pas un angle intermédiaire,
        // qui deviendrait la cible du prochain passage en 3D).
        this.finishCameraAnimation();
      }
    }
    if (changed.has('is3DMode') && this.is3DMode) this.enterView3D();
    if (changed.has('activeTool')) this.resetToolState();
    if ((changed.has('is3DMode') || changed.has('interactive') || changed.has('readOnly') || changed.has('isDashboardMode')) && !this.canEdit2D) {
      if (this.interaction.kind !== 'gesture' && this.interaction.kind !== 'pan' && this.interaction.kind !== 'orbit') this.cancelInteraction();
      this.resetToolState();
    }
    if (changed.has('project') || changed.has('selectedElements')) {
      const pruned = pruneSelection(this.selectedElements, this.project);
      if (pruned !== this.selectedElements) {
        this.selectedElements = pruned;
        this.selectionPruned = true;
      }
    }
  }

  protected updated(changed: PropertyValues<this>): void {
    super.updated(changed);
    if (this.selectionPruned) {
      this.selectionPruned = false;
      this.dispatchSelectionChanged();
    }
    if (changed.has('isDashboardMode')) this.syncKeyboardSupport();
    this.paintCoords();
  }

  /**
   * Palette du dessin (constat F56) : 'light' / 'dark' imposés, ou 'auto' qui suit hass.themes.darkMode.
   * En 'auto', le fond et les textes reprennent aussi les variables du thème HA.
   */
  private applyColorScheme(): void {
    const darkMode: unknown = this.hass?.themes?.darkMode;
    const follow = this.theme !== 'light' && this.theme !== 'dark' && typeof darkMode === 'boolean';
    this.colorScheme = this.theme === 'light' || (follow && darkMode === false) ? 'light' : 'dark';
    this.setAttribute('scheme', this.colorScheme);
    this.toggleAttribute('follow-theme', follow);
  }

  /** HUD des coordonnées mis à jour directement (aucun nouveau rendu du plan au survol). */
  private paintCoords(): void {
    const root = this.renderRoot as ShadowRoot | undefined;
    if (!root?.querySelector) return;
    const x = root.querySelector('.coords-x');
    const y = root.querySelector('.coords-y');
    if (x) x.textContent = `${this.cursorCoords.x.toFixed(2)} m`;
    if (y) y.textContent = `${this.cursorCoords.y.toFixed(2)} m`;
  }

  /**
   * Transition de la caméra 3D vers `target` (chemin angulaire le plus court), comme l'ancienne
   * transition CSS ; immédiate si les animations sont coupées ou réduites par le système.
   */
  private animateCamera(target: Camera3D): void {
    this.stopCameraAnimation();
    if (!this.animations || prefersReducedMotion() || typeof requestAnimationFrame !== 'function') {
      this.orbitPitch = target.pitchDeg;
      this.orbitYaw = target.yawDeg;
      return;
    }
    const fromPitch = this.orbitPitch;
    const fromYaw = this.orbitYaw;
    const deltaYaw = shortestAngleDelta(fromYaw, target.yawDeg);
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / CAMERA_ANIMATION_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      this.orbitPitch = fromPitch + (target.pitchDeg - fromPitch) * eased;
      this.orbitYaw = t < 1 ? fromYaw + deltaYaw * eased : target.yawDeg;
      if (t < 1) {
        this.cameraAnimation = requestAnimationFrame(step);
      } else {
        this.cameraAnimation = null;
        this.cameraTarget = null;
      }
    };
    this.cameraTarget = target;
    this.cameraAnimation = requestAnimationFrame(step);
  }

  private stopCameraAnimation(): void {
    if (this.cameraAnimation !== null) cancelAnimationFrame(this.cameraAnimation);
    this.cameraAnimation = null;
    this.cameraTarget = null;
  }

  /** Termine immédiatement la transition en cours sur l'angle qu'elle vise. */
  private finishCameraAnimation(): void {
    const target = this.cameraTarget;
    this.stopCameraAnimation();
    if (target) {
      this.orbitPitch = target.pitchDeg;
      this.orbitYaw = target.yawDeg;
    }
  }

  // ==========================================
  // VUE 3D WEBGL (chargée à la demande)
  // ==========================================

  /**
   * Passage en 3D : la vue WebGL est affichée dès que son chunk est chargé (aussitôt s'il l'est déjà) ;
   * pendant le chargement, ou si WebGL fait défaut, la projection SVG simplifiée est affichée.
   */
  private enterView3D(): void {
    if (isView3DReady()) {
      this.activateView3D();
      return;
    }
    if (this.view3d === 'loading') return;
    this.view3d = 'loading';
    loadView3D().then(
      () => {
        if (this.view3d !== 'loading') return;
        if (this.is3DMode) this.activateView3D();
        else this.view3d = 'idle';
      },
      (err: unknown) => {
        this.view3d = 'fallback';
        // Message seulement si la 3D est encore affichée (retour en 2D pendant le chargement : rien à signaler).
        if (err instanceof Error && this.is3DMode) this.flashHint(err.message);
      }
    );
  }

  /** Affiche la vue WebGL : elle reprend la caméra courante (et la transition en cours) de la 3D simplifiée. */
  private activateView3D(): void {
    const to = this.cameraTarget ?? { pitchDeg: this.orbitPitch, yawDeg: this.orbitYaw };
    const from = this.cameraAnimation !== null ? { pitchDeg: this.orbitPitch, yawDeg: this.orbitYaw } : null;
    this.stopCameraAnimation();
    this.orbitPitch = to.pitchDeg;
    this.orbitYaw = to.yawDeg;
    this.view3dIntro = { from, to };
    this.view3d = 'ready';
  }

  /** Échec de la vue WebGL à l'exécution (contexte refusé) : repli définitif sur la 3D simplifiée. */
  private handleView3DError(e: CustomEvent<View3DMessageDetail>): void {
    markView3DFailed(e.detail.message);
    this.view3d = 'fallback';
    this.flashHint(e.detail.message);
  }

  /** Angles et zoom de la caméra WebGL : badge du HUD, et caméra de la 3D simplifiée en cas de repli. */
  private handleView3DCamera(e: CustomEvent<View3DCameraDetail>): void {
    this.orbitPitch = e.detail.pitchDeg;
    this.orbitYaw = e.detail.yawDeg;
    this.view3dZoom = e.detail.zoom;
  }

  /** Point du sol sous le pointeur (HUD des coordonnées, sans nouveau rendu). */
  private handleView3DHover(e: CustomEvent<View3DHoverDetail>): void {
    this.cursorCoords = {
      x: SnappingEngine.roundMeters(e.detail.point.x),
      y: SnappingEngine.roundMeters(e.detail.point.y)
    };
    this.paintCoords();
  }

  private handleView3DHint(e: CustomEvent<View3DMessageDetail>): void {
    this.flashHint(e.detail.message);
  }

  /**
   * Clic dans la vue WebGL (studio) : mêmes règles que les éléments du plan en 3D. Fond : désélection ;
   * élément : sélection (Maj / Ctrl / ⌘ : ajout ou retrait) ; double clic : fiche more-info d'une entité
   * (constat F118) ou fiche d'une pièce.
   */
  private handleView3DPick(e: CustomEvent<View3DPickDetail>): void {
    const { ref, modifier, double } = e.detail;
    if (!ref) {
      if (this.canSelect && !modifier) this.setSelection(emptySelection());
      return;
    }
    if (!this.selectsElements) return;
    if (double) {
      if (ref.kind === 'binding') {
        const binding = this.project.bindings.find(b => b.id === ref.id);
        if (binding) this.openMoreInfo(binding.entityId);
      } else if (ref.kind === 'room' && this.activeTool === 'select') {
        const room = this.project.rooms.find(r => r.id === ref.id);
        if (room) this.emitRoomSelected(room);
      }
      return;
    }
    const sel = this.selectedElements;
    this.setSelection(modifier ? (isSelected(sel, ref) ? removeFromSelection(sel, ref) : addToSelection(sel, ref)) : selectOnly(ref));
  }

  /**
   * Nouveau projet reçu du parent. Autre plan (id) : tracés et gestes abandonnés, plan recadré. Même plan
   * rechargé (nouvelle révision, ou plan vide remplacé par son contenu chargé) sans que l'utilisateur ait
   * touché à la vue : recadré aussi (constat F55). Nos propres modifications ne recadrent jamais.
   */
  private handleProjectReplaced(old: HomeArchitectProject | undefined): void {
    const cur = this.project;
    if (!old || old.id !== cur.id) {
      this.endInteraction();
      this.resetToolState();
      this.viewTouched = false;
      // La vue WebGL recadre elle-même un autre plan (nouvel identifiant).
      this.fitPlanView();
      return;
    }
    if (this.viewTouched || this.isOwnEdit(cur)) return;
    const replaced = cur.walls !== old.walls || cur.rooms !== old.rooms || cur.bindings !== old.bindings ||
      cur.furniture !== old.furniture || cur.background !== old.background;
    if (replaced && (cur.revision !== old.revision || !hasContent(old))) this.fitPlanView();
  }

  /**
   * Le parent remplace le projet pendant un geste qui modifie le plan (sauvegarde terminée, rechargement) :
   * si le geste n'a encore rien modifié, il repart du nouveau projet ; sinon il est abandonné sans rien
   * émettre, pour ne pas réécrire le projet reçu avec un état calculé sur l'ancien.
   */
  private handleExternalProjectDuringGesture(old: HomeArchitectProject | undefined): void {
    const it = this.interaction;
    if (!('base' in it)) return;
    if (old === it.base) {
      it.base = this.project;
      return;
    }
    this.clearPreview();
    this.endInteraction();
  }

  /** Projet issu de notre dernier 'project-changed' (éventuellement recopié par le parent). */
  private isOwnEdit(p: HomeArchitectProject): boolean {
    const own = this.lastEmittedProject;
    if (!own) return false;
    const sameFurniture = p.furniture === own.furniture || ((p.furniture?.length ?? 0) === 0 && (own.furniture?.length ?? 0) === 0);
    return p.walls === own.walls && p.rooms === own.rooms && p.bindings === own.bindings && p.openings === own.openings && sameFurniture;
  }

  private dispatchProjectChanged(): void {
    this.lastEmittedProject = this.project;
    this.dispatchEvent(new CustomEvent('project-changed', {
      detail: { project: this.project },
      bubbles: true,
      composed: true
    }));
  }

  /** Applique une modification du canevas et la signale au parent. */
  private commitProject(next: HomeArchitectProject): void {
    this.setLocalProject(next);
    this.dispatchProjectChanged();
  }

  /** Projet modifié par le canevas lui-même (glisser en cours, modification validée, geste annulé). */
  private setLocalProject(next: HomeArchitectProject): void {
    this.localProject = next;
    this.project = next;
  }

  // ==========================================
  // RENDU : CACHES (constats F34, F35)
  // ==========================================
  // Les tableaux du projet sont remplacés à chaque modification (jamais mutés) : leur référence sert de
  // révision. Les calculs coûteux sont mémorisés et les calques du plan ne sont réévalués (guard) que si
  // leurs données, le zoom ou la sélection changent — jamais à chaque mouvement du pointeur.

  /** Entités affichées par le plan : un nouvel objet hass qui n'en touche aucune ne redessine rien. */
  private readonly watchedEntityIds = memoizeLast((bindings: readonly EntityBinding[], openings: readonly Opening[]) =>
    boundEntityIds(bindings, openings));

  /** Épingles, et en 3D les capteurs liés aux ouvertures (battants ouverts ou fermés dans la vue WebGL). */
  private watchedEntities(): string[] {
    return this.watchedEntityIds(this.project.bindings, this.is3DMode ? this.project.openings : NO_OPENINGS);
  }

  /** Liaisons affichables (une liaison sans entity_id, venue d'un projet non normalisé, ne doit pas bloquer le rendu). */
  private readonly displayableBindings = memoizeLast((bindings: EntityBinding[]) =>
    bindings.filter(b => typeof b.entityId === 'string'));

  /** Contours des murs joints aux angles, en mètres (constat F143), recalculés quand les murs changent. */
  private readonly wallPolygons = memoizeLast((walls: readonly Wall[]) => computeWallPolygons(walls));

  /** Hauteur des murs : calcul O(murs × pièces × arêtes) fait seulement en 3D, une fois par révision. */
  private readonly wallHeights = memoizeLast((walls: readonly Wall[], rooms: readonly Room[], ceiling: number | undefined) =>
    computeWallHeights(walls, rooms, ceiling));

  /** Apparence des pièces (lumières allumées, heatmap), recalculée quand une entité affichée change. */
  private readonly roomLooks = memoizeLast(
    (rooms: readonly Room[], bindings: readonly EntityBinding[], heatmap: boolean, _revision: number) =>
      new Map<string, RoomAppearance>(rooms.map(room => [room.id, roomAppearance(room, bindings, this.hass, heatmap)]))
  );

  /** État affiché de chaque épingle, recalculé quand une entité affichée change. */
  private readonly pinViews = memoizeLast((bindings: readonly EntityBinding[], _revision: number) =>
    new Map<string, EntityView>(bindings.map(b => [b.id, describeEntity(b, this.hass)])));

  /** Enveloppe du contenu (ombre portée de la vue 3D). */
  private readonly planBounds = memoizeLast((project: HomeArchitectProject) => SvgExporter.contentBounds(project));

  /** Scène 3D des murs, reconstruite quand le plan, la vue ou la caméra change. */
  private readonly wallScene = memoizeLast(
    (walls: readonly Wall[], openings: readonly Opening[], rooms: readonly Room[], ceiling: number | undefined,
      viewport: ViewportTransform, ppm: number, pitch: number, yaw: number, width: number, height: number): WallSceneItem[] => {
      const k = ppm * viewport.zoom;
      return buildWallScene({
        walls,
        openings,
        polygons: this.wallPolygons(walls),
        heights: this.wallHeights(walls, rooms, ceiling),
        toView: p => ({ x: p.x * k + viewport.x, y: p.y * k + viewport.y }),
        scale: k,
        heightScale: WALL_HEIGHT_SCALE,
        basis: cameraBasis({ pitchDeg: pitch, yawDeg: yaw }),
        center: { x: width / 2, y: height / 2 }
      });
    }
  );

  // ==========================================
  // RENDU DU PLAN
  // ==========================================
  // Le contenu du plan est dessiné dans des groupes `plan-layer` translatés de (viewport.x, viewport.y) :
  // un déplacement de la vue ne réécrit que cet attribut. Coordonnées « plan » = mètres × ppm × zoom ;
  // les traits, textes et poignées restent en pixels.

  private renderBackgroundLayer() {
    const bg = this.project.background;
    // URL affichable fournie par le parent (asset téléversé) en priorité sur l'URL enregistrée.
    const src = this.backgroundSrc || bg?.imageUrl;
    if (!bg || !src || !bg.visible) return nothing;
    const k = this.screenPpm;
    const offset = bg.offset || { x: 0, y: 0 };
    const scale = bg.scale || 1.0;

    return svg`
      <g
        class="background-image-layer"
        transform="translate(${offset.x * k}, ${offset.y * k}) scale(${this.viewport.zoom * scale})"
        opacity=${bg.opacity}
      >
        <image href=${src} x="0" y="0" width=${bg.widthPx || 1200} height=${bg.heightPx || 900} />
      </g>
    `;
  }

  private renderGhostLayer() {
    const ghost = this.ghostProject;
    if (!ghost?.walls?.length) return nothing;
    const k = this.screenPpm;
    return svg`
      <g class="ghost-layer" opacity="0.45" pointer-events="none">
        ${ghost.walls.map(w => svg`
          <line class="ghost-wall" x1=${w.start.x * k} y1=${w.start.y * k} x2=${w.end.x * k} y2=${w.end.y * k} />
        `)}
      </g>
    `;
  }

  /** Grille 2D sur un rectangle étendu qui couvre tout l'écran tourné (v1.0.29) ; sol pointillé en 3D. */
  private renderGrid() {
    if (this.is3DMode) return this.renderGround3D();

    // Pas de la grille du projet (réglable dans la barre d'outils)
    const gridMeters = this.project.grid.size > 0 ? this.project.grid.size : 0.5;
    const stepPx = gridMeters * this.screenPpm;
    if (stepPx < 12) return nothing;
    const majorStepPx = stepPx * 2;

    return svg`
      <defs>
        <pattern id="grid-sub" width=${stepPx} height=${stepPx} patternUnits="userSpaceOnUse"
          patternTransform="translate(${this.viewport.x % stepPx}, ${this.viewport.y % stepPx})">
          <line class="grid-line" x1="0" y1="0" x2=${stepPx} y2="0" />
          <line class="grid-line" x1="0" y1="0" x2="0" y2=${stepPx} />
        </pattern>
        <pattern id="grid-major" width=${majorStepPx} height=${majorStepPx} patternUnits="userSpaceOnUse"
          patternTransform="translate(${this.viewport.x % majorStepPx}, ${this.viewport.y % majorStepPx})">
          <line class="grid-line-major" x1="0" y1="0" x2=${majorStepPx} y2="0" />
          <line class="grid-line-major" x1="0" y1="0" x2="0" y2=${majorStepPx} />
        </pattern>
      </defs>
      <rect x="-10000" y="-10000" width="20000" height="20000" fill="url(#grid-sub)" />
      <rect x="-10000" y="-10000" width="20000" height="20000" fill="url(#grid-major)" />
    `;
  }

  /** Sol de la vue 3D : repères pointillés et ombre portée sous l'emprise du plan. */
  private renderGround3D() {
    const { x: vx, y: vy } = this.viewport;
    const k = this.screenPpm;
    const b = this.planBounds(this.project);
    const shadow = b
      ? {
        cx: ((b.minX + b.maxX) / 2) * k + vx,
        cy: ((b.minY + b.maxY) / 2) * k + vy,
        rx: ((b.maxX - b.minX) / 2 + 1.5) * k,
        ry: ((b.maxY - b.minY) / 2 + 1.5) * k
      }
      : { cx: vx + 300, cy: vy + 200, rx: 900, ry: 550 };
    return svg`
      <defs>
        <radialGradient id="ground-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" class="ground-shadow-core" />
          <stop offset="65%" class="ground-shadow-mid" />
          <stop offset="100%" class="ground-shadow-edge" />
        </radialGradient>
        <pattern id="grid-dots-3d" width="40" height="40" patternUnits="userSpaceOnUse"
          patternTransform="translate(${vx % 40}, ${vy % 40})">
          <circle class="grid-dot" cx="20" cy="20" r="1.2" />
        </pattern>
      </defs>
      <rect x="-10000" y="-10000" width="20000" height="20000" fill="url(#grid-dots-3d)" />
      <ellipse cx=${shadow.cx} cy=${shadow.cy} rx=${shadow.rx} ry=${shadow.ry} fill="url(#ground-shadow)" />
    `;
  }

  /**
   * Pièces : remplissage par variable CSS (couleur de la pièce, teinte RVB de la lumière allumée ou
   * heatmap), contour et halo pour une pièce éclairée sans écraser cette couleur (constat F59).
   */
  private renderRooms(looks: ReadonlyMap<string, RoomAppearance>) {
    const k = this.screenPpm;
    const selected = new Set(this.selectedElements.roomIds);
    return this.project.rooms.map(room => {
      if (!room.polygon || room.polygon.length < 3) return nothing;
      const pts = pointsAttr(room.polygon.map(p => ({ x: p.x * k, y: p.y * k })));
      const look = looks.get(room.id);
      const fill = look?.fill ?? room.color;
      const isSelected = selected.has(room.id);

      return svg`
        <g
          class="room-group ${isSelected ? 'selected' : ''}"
          data-room-id=${room.id}
          @pointerdown=${(e: PointerEvent) => this.handleElementPointerDown({ kind: 'room', id: room.id }, e)}
          @dblclick=${(e: MouseEvent) => this.handleRoomDblClick(e, room)}
        >
          ${look?.illuminated ? svg`<polygon class="room-glow" points=${pts} />` : nothing}
          <polygon
            class="room-polygon ${look?.illuminated ? 'illuminated' : ''}"
            points=${pts}
            style=${styleMap(fill ? { '--room-fill': fill } : {})}
          />
        </g>
      `;
    });
  }

  /**
   * Étiquettes des pièces en 2D, au point d'étiquette (toujours à l'intérieur de la pièce, constat F124),
   * dessinées au-dessus des meubles, murs et ouvertures (elles ne captent pas le pointeur).
   */
  private renderRoomLabels(looks: ReadonlyMap<string, RoomAppearance>) {
    const k = this.screenPpm;
    return this.project.rooms.map(room => {
      if (!room.polygon || room.polygon.length < 3) return nothing;
      const p = PolygonUtils.labelPoint(room.polygon);
      const temperature: TemperatureReading | null = looks.get(room.id)?.temperature ?? null;
      return svg`
        <g class="room-label-group" transform="translate(${p.x * k}, ${p.y * k})">
          <text class="room-label-name" y=${temperature ? -10 : -6}>${room.name}</text>
          <text class="room-label-area" y=${temperature ? 6 : 12}>${room.areaM2.toFixed(1)} m²</text>
          ${temperature ? svg`<text class="room-label-temp" y="21">🌡️ ${formatTemperature(temperature, this.hass)}</text>` : nothing}
        </g>
      `;
    });
  }

  /** Étiquettes des pièces en 3D : badges toujours face à l'écran, au-dessus des murs. */
  private renderRoomBadges3D(basis: CameraBasis, center: Point) {
    const selected = new Set(this.selectedElements.roomIds);
    const defaultH = this.project.defaultCeilingHeight || 2.50;
    return this.project.rooms.map(room => {
      if (!room.polygon || room.polygon.length < 3) return nothing;
      const p = projectPoint(this.worldToScreen(PolygonUtils.labelPoint(room.polygon)), 0, basis, center);
      const roomH = room.height || defaultH;
      return svg`
        <g
          class="room-3d-badge-group ${selected.has(room.id) ? 'selected' : ''}"
          transform="translate(${p.x}, ${p.y})"
          @pointerdown=${(e: PointerEvent) => this.handleElementPointerDown({ kind: 'room', id: room.id }, e)}
          @dblclick=${(e: MouseEvent) => this.handleRoomDblClick(e, room)}
        >
          <rect class="room-badge-bg" x="-62" y="-30" width="124" height="60" rx="10" ry="10" />
          <text class="room-label-name" y="-12">${room.name}</text>
          <text class="room-label-area" y="6">${room.areaM2.toFixed(1)} m²</text>
          <text class="room-label-height" y="21">H: ${roomH.toFixed(2)}m · ${(room.areaM2 * roomH).toFixed(1)} m³</text>
        </g>
      `;
    });
  }

  /** Meubles : symbole du catalogue (décors en mètres, jamais de taille négative ; constats F114, F139). */
  private renderFurniture() {
    const k = this.screenPpm;
    const selected = new Set(this.selectedElements.furnitureIds ?? []);
    const hint = this.canEdit ? ' – Touche R pour pivoter' : '';
    return (this.project.furniture || []).map(item => {
      const tmpl = findFurnitureTemplate(item.type);
      const wMeters = item.width || tmpl?.width || 1;
      const lMeters = item.length || tmpl?.length || 1;
      const isSelected = selected.has(item.id);
      return svg`
        <g
          class="furniture-group ${isSelected ? 'selected' : ''}"
          data-furniture-id=${item.id}
          transform="translate(${item.position.x * k}, ${item.position.y * k}) rotate(${item.rotation || 0})"
          @pointerdown=${(e: PointerEvent) => this.handleElementPointerDown({ kind: 'furniture', id: item.id }, e)}
        >
          <title>${furnitureDisplayName(item)} (${wMeters.toFixed(2)} × ${lMeters.toFixed(2)} m)${hint}</title>
          ${renderFurnitureSymbol(item, { pixelsPerMeter: k, selected: isSelected })}
        </g>
      `;
    });
  }

  /**
   * Murs 2D joints aux angles (constat F143), en deux passes comme le SVG publié : contours de tous les
   * murs, puis remplissages par-dessus, qui masquent les arêtes intérieures des jonctions.
   */
  private renderWalls2D() {
    const k = this.screenPpm;
    const polygons = this.wallPolygons(this.project.walls);
    const selected = new Set(this.selectedElements.wallIds);
    const plane = (poly: readonly Point[]) => pointsAttr(poly.map(p => ({ x: p.x * k, y: p.y * k })));

    return svg`
      <g class="walls-outline">
        ${this.project.walls.map(wall => {
          const poly = polygons.get(wall.id);
          return poly ? svg`<polygon class="wall-outline" points=${plane(poly)} />` : nothing;
        })}
      </g>
      ${this.project.walls.map(wall => {
        const poly = polygons.get(wall.id);
        const s = { x: wall.start.x * k, y: wall.start.y * k };
        const e = { x: wall.end.x * k, y: wall.end.y * k };
        const lenMeters = SnappingEngine.distance(wall.start, wall.end);
        const distPx = Math.hypot(e.x - s.x, e.y - s.y) || 1;
        const nx = -(e.y - s.y) / distPx;
        const ny = (e.x - s.x) / distPx;
        const mid = { x: (s.x + e.x) / 2, y: (s.y + e.y) / 2 };

        return svg`
          <g
            class="wall-element ${selected.has(wall.id) ? 'selected' : ''}"
            data-wall-id=${wall.id}
            @pointerdown=${(ev: PointerEvent) => this.handleElementPointerDown({ kind: 'wall', id: wall.id }, ev)}
          >
            ${poly ? svg`<polygon class="wall-rect" points=${plane(poly)} />` : nothing}
            <line class="wall-centerline" x1=${s.x} y1=${s.y} x2=${e.x} y2=${e.y} />
            ${this.showDimensions && lenMeters >= 0.4 ? svg`
              <g class="wall-dim-badge" transform="translate(${mid.x + nx * 14}, ${mid.y + ny * 14})">
                <rect x="-24" y="-9" width="48" height="18" />
                <text>${SnappingEngine.roundMeters(lenMeters).toFixed(2)} m</text>
              </g>
            ` : nothing}
          </g>
        `;
      })}
    `;
  }

  /** Couleur d'une face de mur 3D selon son éclairement (−1 à 1), la sélection et la palette. */
  private faceColors(shade: number, selected: boolean): { fill: string; stroke: string } {
    const light = this.colorScheme === 'light';
    if (selected) {
      const l = Math.round((light ? 52 : 42) + shade * 14);
      return { fill: `hsl(192, 85%, ${l}%)`, stroke: light ? '#0891b2' : '#38bdf8' };
    }
    const sat = light ? 16 : 22;
    const l = Math.round(light ? 70 + shade * 12 : 34 + shade * 16);
    return { fill: `hsl(215, ${sat}%, ${l}%)`, stroke: `hsl(215, ${sat}%, ${l + (light ? -12 : 6)}%)` };
  }

  /**
   * Murs 3D (constat F120) : faces extrudées vers le haut de l'écran quel que soit l'angle, triées de la
   * plus lointaine à la plus proche, portes et fenêtres reprojetées sur leurs faces, chapeaux par-dessus.
   */
  private renderWalls3D(size: CanvasSize) {
    const p = this.project;
    const items = this.wallScene(
      p.walls, p.openings, p.rooms, p.defaultCeilingHeight, this.viewport, this.ppm, this.orbitPitch, this.orbitYaw,
      size.width, size.height
    );
    const walls = new Set(this.selectedElements.wallIds);
    const openings = new Set(this.selectedElements.openingIds);
    return svg`
      <g class="walls-3d">
        ${items.map(item => {
          const selected = walls.has(item.wallId);
          const onDown = (e: PointerEvent) => this.handleElementPointerDown({ kind: 'wall', id: item.wallId }, e);
          if (item.kind === 'cap') {
            return svg`<polygon class="wall-cap-3d ${selected ? 'selected' : ''}" points=${pointsAttr(item.points)} @pointerdown=${onDown} />`;
          }
          const colors = this.faceColors(item.shade, selected);
          return svg`
            <polygon
              class="wall-face-3d ${selected ? 'selected' : ''}"
              points=${pointsAttr(item.points)}
              fill=${colors.fill}
              stroke=${colors.stroke}
              @pointerdown=${onDown}
            />
            ${item.panels.map(panel => svg`
              <polygon
                class="opening-3d ${panel.type} ${openings.has(panel.openingId) ? 'selected' : ''}"
                points=${pointsAttr(panel.points)}
                @pointerdown=${(e: PointerEvent) => this.handleElementPointerDown({ kind: 'opening', id: panel.openingId }, e)}
              />
            `)}
          `;
        })}
      </g>
    `;
  }

  /** Nombre de battants d'une ouverture posée avec l'outil courant. */
  private sashCountFor(type: OpeningType): number {
    if (type === 'window') return this.windowSashCount || 1;
    return type === 'french_window' ? 2 : 1;
  }

  /** Ouvertures 2D : même géométrie, pour chaque type, que le SVG publié (constat F114). */
  private renderOpenings() {
    const k = this.screenPpm;
    const walls = new Map(this.project.walls.map(w => [w.id, w]));
    const selected = new Set(this.selectedElements.openingIds);
    return this.project.openings.map(op => {
      const wall = walls.get(op.wallId);
      if (!wall) return nothing;
      const dx = wall.end.x - wall.start.x;
      const dy = wall.end.y - wall.start.y;
      const wallLen = Math.hypot(dx, dy);
      if (wallLen === 0) return nothing;
      const x = (wall.start.x + (op.offset / wallLen) * dx) * k;
      const y = (wall.start.y + (op.offset / wallLen) * dy) * k;
      const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

      return svg`
        <g
          class="opening-element ${selected.has(op.id) ? 'selected' : ''}"
          transform="translate(${x}, ${y}) rotate(${angleDeg})"
          @pointerdown=${(e: PointerEvent) => this.handleElementPointerDown({ kind: 'opening', id: op.id }, e)}
        >
          ${this.renderOpeningSymbol(op, wall.thickness, k, true)}
        </g>
      `;
    });
  }

  /**
   * Symbole d'une ouverture projeté à `k` px/m (traits en pixels). La découpe, de la couleur du fond,
   * déborde d'un pixel pour masquer le contour du mur.
   */
  private renderOpeningSymbol(op: OpeningShape, thickness: number, k: number, withCutout: boolean) {
    return openingPrimitives(op, thickness, 1 / k)
      .filter(prim => withCutout || prim.role !== 'cutout')
      .map(prim => {
        switch (prim.kind) {
          case 'rect':
            return svg`<rect class="opening-${prim.role}" x=${prim.x * k} y=${prim.y * k} width=${prim.w * k} height=${prim.h * k} />`;
          case 'line':
            return svg`<line class="opening-${prim.role}" x1=${prim.x1 * k} y1=${prim.y1 * k} x2=${prim.x2 * k} y2=${prim.y2 * k} />`;
          case 'arc':
            return svg`<path class="opening-${prim.role}" d="M ${prim.x1 * k} ${prim.y1 * k} A ${prim.r * k} ${prim.r * k} 0 0 ${prim.sweep} ${prim.x2 * k} ${prim.y2 * k}" />`;
        }
      });
  }

  // ==========================================
  // RENDU DES ÉPINGLES D'ENTITÉS HOME ASSISTANT
  // ==========================================

  private renderPins2D(views: ReadonlyMap<string, EntityView>) {
    const k = this.screenPpm;
    return this.displayableBindings(this.project.bindings).map(binding => {
      const view = views.get(binding.id);
      return view ? this.renderPin(binding, view, binding.position.x * k, binding.position.y * k) : nothing;
    });
  }

  /** Épingles en 3D : toujours face à l'écran, au-dessus des murs, les plus proches devant. */
  private renderPins3D(views: ReadonlyMap<string, EntityView>, basis: CameraBasis, center: Point) {
    return this.displayableBindings(this.project.bindings)
      .map(binding => ({ binding, at: projectPoint(this.worldToScreen(binding.position), 0, basis, center) }))
      .sort((a, b) => a.at.y - b.at.y)
      .map(({ binding, at }) => {
        const view = views.get(binding.id);
        return view ? this.renderPin(binding, view, at.x, at.y) : nothing;
      });
  }

  /**
   * Épingle accessible (constat F103) : bouton nommé « nom : état », focusable, <title> pour l'infobulle,
   * Entrée / Espace. Entité introuvable signalée (constat F132), état selon la device_class (constat F57).
   */
  private renderPin(binding: EntityBinding, view: EntityView, x: number, y: number) {
    const focusable = this.isDashboardMode || this.canSelect;
    const label = `${view.name} : ${view.stateText}`;
    const classes = {
      'entity-pin': true,
      selected: this.selectedElements.bindingIds.includes(binding.id),
      'active-light': view.lightOn,
      'active-radar': view.radar,
      orphan: view.orphan
    };
    const badgeWidth = view.badge ? Math.max(28, view.badge.length * 5.6 + 8) : 0;

    return svg`
      <g
        class=${classMap(classes)}
        transform="translate(${x}, ${y})"
        role=${focusable ? 'button' : nothing}
        tabindex=${focusable ? 0 : nothing}
        aria-label=${label}
        @pointerdown=${(e: PointerEvent) => this.handlePinPointerDown(binding, e)}
        @click=${(e: Event) => this.handlePinClick(binding, e)}
        @dblclick=${(e: Event) => this.handlePinDblClick(binding, e)}
        @keydown=${(e: KeyboardEvent) => this.handlePinKeyDown(binding, e)}
        @contextmenu=${(e: Event) => this.handlePinContextMenu(e)}
      >
        <title>${label}</title>
        ${view.lightOn ? svg`<circle class="pin-glow" cx="0" cy="0" r="22" />` : nothing}
        <!-- Anneau animé si mouvement ou présence détectés ; ondes pour un lecteur multimédia actif -->
        ${view.radar ? svg`<circle class="radar-pulse-ring" cx="0" cy="0" r="16" />` : nothing}
        ${view.playing ? svg`<circle class="soundwave-pulse" cx="0" cy="0" r="16" />` : nothing}
        <circle class="entity-pin-bg" cx="0" cy="0" r="16" />
        <text class="entity-pin-icon ${view.fanOn ? 'fan-spin' : ''}" x="0" y="0">${view.icon}</text>
        <text class="entity-pin-label" x="0" y="27">${view.name}</text>
        <text class="entity-pin-state state-${view.status}" x="0" y="38">${view.stateText}</text>
        ${view.badge && !view.unavailable ? svg`
          <g class="entity-pin-value-badge" transform="translate(${14 + (badgeWidth - 28) / 2}, -14)">
            <rect x=${-badgeWidth / 2} y="-8" width=${badgeWidth} height="16" />
            <text>${view.badge}</text>
          </g>
        ` : nothing}
      </g>
    `;
  }

  // ==========================================
  // APERÇUS, GUIDES ET POIGNÉES (repère vue, au-dessus du plan)
  // ==========================================

  /**
   * Aperçu de l'ouverture à poser, à sa position et sa largeur bornées au mur ; en rouge si le mur est
   * trop court ou si elle chevauche une ouverture existante (le clic est alors refusé, constat F44).
   */
  private renderOpeningPreview() {
    const snap = this.wallSnap;
    const fit = this.openingFit;
    const type = this.currentOpeningType();
    if (!snap || !fit || !type || !this.canEdit2D) return nothing;

    const k = this.screenPpm;
    const wall = snap.wall;
    const len = SnappingEngine.wallLength(wall) || 1;
    const center = {
      x: wall.start.x + ((wall.end.x - wall.start.x) * fit.offset) / len,
      y: wall.start.y + ((wall.end.y - wall.start.y) * fit.offset) / len
    };
    const sPos = this.worldToScreen(center);
    const angleDeg = (snap.angleRad * 180) / Math.PI;
    const invalid = !fit.fits || fit.overlaps.length > 0;
    const wPx = fit.width * k;
    const thickPx = wall.thickness * k;
    const shape: OpeningShape = {
      type,
      width: fit.width,
      flipSide: this.openingFlipSide,
      flipDirection: this.openingFlipDirection,
      sashCount: this.sashCountFor(type)
    };

    return svg`
      <g
        class="opening-preview ${invalid ? 'invalid' : ''}"
        transform="translate(${sPos.x}, ${sPos.y}) rotate(${angleDeg})"
      >
        <rect class="opening-preview-body" x=${-wPx / 2} y=${-thickPx / 2} width=${wPx} height=${thickPx} stroke-dasharray="4, 2" />
        ${this.renderOpeningSymbol(shape, wall.thickness, k, false)}
      </g>
    `;
  }

  private renderPreviewWall() {
    if (!this.drawingWallStart || !this.previewPoint || this.activeTool !== 'wall') return nothing;

    const start = this.drawingWallStart;
    const end = this.previewPoint;
    const poly = computeWallPolygons([
      { id: 'preview', start, end, thickness: this.currentWallThickness, type: 'standard' }
    ]).get('preview');
    const sStart = this.worldToScreen(start);
    const sEnd = this.worldToScreen(end);
    const lenMeters = SnappingEngine.distance(start, end);
    const mid = {
      x: (sStart.x + sEnd.x) / 2,
      y: (sStart.y + sEnd.y) / 2
    };

    return svg`
      <g class="preview-wall-group">
        ${poly ? svg`<polygon points=${pointsAttr(poly.map(p => this.worldToScreen(p)))} class="preview-wall-rect" />` : nothing}
        <line x1=${sStart.x} y1=${sStart.y} x2=${sEnd.x} y2=${sEnd.y} class="preview-wall-line" />

        ${this.snapInfo.guideAngle !== undefined ? svg`
          <line x1=${sStart.x} y1=${sStart.y} x2=${sEnd.x} y2=${sEnd.y} class="angle-guide-line" />
        ` : nothing}

        <g class="dimension-badge" transform="translate(${mid.x}, ${mid.y - 16})">
          <rect x="-30" y="-11" width="60" height="22" />
          <text>${SnappingEngine.roundMeters(lenMeters).toFixed(2)} m</text>
        </g>
      </g>
    `;
  }

  /** Contour de pièce en cours de tracé (outil 'room') : côtés posés, côté suivant et fermeture en pointillés. */
  private renderRoomDraft() {
    const draft = this.roomDraft;
    if (this.activeTool !== 'room' || draft.length === 0) return nothing;
    const pts = draft.map(p => this.worldToScreen(p));
    const preview = this.previewPoint ? this.worldToScreen(this.previewPoint) : null;
    const path = [...pts, ...(preview ? [preview] : [])];
    const first = pts[0];
    const closable = draft.length >= 3;
    const area = closable ? PolygonUtils.computeArea(this.previewPoint ? [...draft, this.previewPoint] : draft) : 0;

    return svg`
      <g class="room-draft-group" pointer-events="none">
        ${closable ? svg`<polygon class="room-draft-fill" points=${pointsAttr(path)} />` : nothing}
        <polyline class="room-draft-line" points=${pointsAttr(path)} />
        ${preview && closable ? svg`
          <line class="room-draft-closing" x1=${preview.x} y1=${preview.y} x2=${first.x} y2=${first.y} />
        ` : nothing}
        ${pts.map((p, i) => svg`<circle class="room-draft-vertex ${i === 0 ? 'first' : ''}" cx=${p.x} cy=${p.y} r=${i === 0 && closable ? 7 : 4.5} />`)}
        ${closable ? svg`
          <g class="dimension-badge" transform="translate(${first.x}, ${first.y - 20})">
            <rect x="-34" y="-11" width="68" height="22" />
            <text>${area.toFixed(2)} m²</text>
          </g>
        ` : nothing}
      </g>
    `;
  }

  /** Rectangle en cours de tracé (outil 'rect_room') avec ses dimensions. */
  private renderRectRoomPreview() {
    if (this.activeTool !== 'rect_room' || !this.rectStart || !this.rectCurrent) return nothing;
    const corners = rectanglePolygon(this.rectStart, this.rectCurrent).map(p => this.worldToScreen(p));
    const w = Math.abs(this.rectCurrent.x - this.rectStart.x);
    const h = Math.abs(this.rectCurrent.y - this.rectStart.y);
    const center = {
      x: (corners[0].x + corners[2].x) / 2,
      y: (corners[0].y + corners[2].y) / 2
    };
    return svg`
      <g class="room-draft-group" pointer-events="none">
        <polygon class="room-draft-fill" points=${pointsAttr(corners)} />
        <polygon class="room-draft-line" points=${pointsAttr(corners)} />
        ${w > 0 || h > 0 ? svg`
          <g class="dimension-badge" transform="translate(${center.x}, ${center.y})">
            <rect x="-48" y="-11" width="96" height="22" />
            <text>${w.toFixed(2)} × ${h.toFixed(2)} m</text>
          </g>
        ` : nothing}
      </g>
    `;
  }

  /** Segment d'étalonnage, mesuré en mètres monde (stable pendant un zoom ou un pan, constat F50). */
  private renderCalibrationLine() {
    if (!this.calibrateStart || !this.calibrateCurrent) return nothing;

    const p1 = this.worldToScreen(this.calibrateStart);
    const p2 = this.worldToScreen(this.calibrateCurrent);
    const distMeters = SnappingEngine.distance(this.calibrateStart, this.calibrateCurrent);
    const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };

    return svg`
      <g class="calibration-preview-group">
        <line x1=${p1.x} y1=${p1.y} x2=${p2.x} y2=${p2.y} class="calibration-line" />
        <circle cx=${p1.x} cy=${p1.y} r="6" class="calibration-endpoint" />
        <circle cx=${p2.x} cy=${p2.y} r="6" class="calibration-endpoint" />

        <g class="dimension-badge calibration" transform="translate(${mid.x}, ${mid.y - 18})">
          <rect x="-35" y="-11" width="70" height="22" />
          <text>${distMeters.toFixed(2)} m</text>
        </g>
      </g>
    `;
  }

  private renderRescaleLine() {
    if (!this.rescaleStart || !this.rescaleCurrent) return nothing;

    const sStart = this.worldToScreen(this.rescaleStart);
    const sEnd = this.worldToScreen(this.rescaleCurrent);
    const distMeters = SnappingEngine.distance(this.rescaleStart, this.rescaleCurrent);
    const mid = {
      x: (sStart.x + sEnd.x) / 2,
      y: (sStart.y + sEnd.y) / 2
    };

    return svg`
      <g class="rescale-preview-group">
        <line class="rescale-line" x1=${sStart.x} y1=${sStart.y} x2=${sEnd.x} y2=${sEnd.y} />
        <circle class="rescale-start" cx=${sStart.x} cy=${sStart.y} r="6" />
        <circle class="rescale-end" cx=${sEnd.x} cy=${sEnd.y} r="6" />

        <g class="dimension-badge rescale" transform="translate(${mid.x}, ${mid.y - 18})">
          <rect x="-48" y="-13" width="96" height="26" />
          <text>📐 ${distMeters.toFixed(3)} m</text>
        </g>
      </g>
    `;
  }

  private renderSmartGuides() {
    const { smartGuideX, smartGuideY } = this.snapInfo;
    if (smartGuideX === undefined && smartGuideY === undefined) return nothing;
    const x = smartGuideX !== undefined ? this.worldToScreen({ x: smartGuideX, y: 0 }).x : 0;
    const y = smartGuideY !== undefined ? this.worldToScreen({ x: 0, y: smartGuideY }).y : 0;

    return svg`
      <g class="smart-guides-group" pointer-events="none">
        ${smartGuideX !== undefined ? svg`<line x1=${x} y1="-10000" x2=${x} y2="10000" class="smart-guide-line" />` : nothing}
        ${smartGuideY !== undefined ? svg`<line x1="-10000" y1=${y} x2="10000" y2=${y} class="smart-guide-line" />` : nothing}
      </g>
    `;
  }

  /**
   * Poignées des meubles sélectionnés (rotation fine et redimensionnement, v1.0.22 / v1.0.26), dessinées
   * au-dessus de tous les meubles, murs et épingles avec la même transformation que le meuble : un
   * meuble voisin ne recouvre jamais la poignée.
   */
  private renderFurnitureHandles() {
    if (!this.canEdit2D) return null;
    const ppm = this.screenPpm;
    const selected = new Set(this.selectedElements.furnitureIds ?? []);
    return (this.project.furniture || []).filter(item => selected.has(item.id)).map(item => {
      const tmpl = findFurnitureTemplate(item.type);
      const sPos = this.worldToScreen(item.position);
      const wMeters = item.width || tmpl?.width || 1;
      const lMeters = item.length || tmpl?.length || 1;
      const wPx = wMeters * ppm;
      const lPx = lMeters * ppm;
      const rot = item.rotation || 0;
      const sizeLabel = `${wMeters.toFixed(2)}×${lMeters.toFixed(2)}m`;

      return svg`
        <g class="furniture-handles" transform="translate(${sPos.x}, ${sPos.y}) rotate(${rot})">
          <!-- Ligne de rappel vers la poignée de rotation -->
          <line class="handle-guide" x1="0" y1="${-lPx/2}" x2="0" y2="${-lPx/2 - 18}" />
          <!-- Poignée interactive de rotation degré par degré -->
          <g
            class="furniture-rotate-handle"
            @pointerdown=${(e: PointerEvent) => this.handleFurnitureRotatePointerDown(item, e)}
          >
            <!-- Zone cliquable invisible élargie -->
            <circle class="handle-hit" cx="0" cy="${-lPx/2 - 18}" r="12" />
            <!-- Petit rond bleu clair visible avec contour blanc -->
            <circle class="handle-knob" cx="0" cy="${-lPx/2 - 18}" r="6.5" stroke-width="2" />
            <!-- Indicateur d'angle en direct quand le meuble est sélectionné -->
            <text class="handle-angle" x="0" y="${-lPx/2 - 28}">${Math.round(rot)}°</text>
          </g>

          <!-- Poignée interactive d'étirement / redimensionnement en bas à droite -->
          <g
            class="furniture-resize-handle"
            @pointerdown=${(e: PointerEvent) => this.handleFurnitureResizePointerDown(item, e)}
          >
            <!-- Zone cliquable invisible élargie -->
            <rect class="handle-hit" x="${wPx/2 - 6}" y="${lPx/2 - 6}" width="20" height="20" />
            <!-- Poignée carrée aux coins légèrement arrondis avec bordure blanche -->
            <rect class="handle-knob" x="${wPx/2 - 2}" y="${lPx/2 - 2}" width="11" height="11" rx="2.5" stroke-width="1.8" />
            <!-- 2 stries diagonales symbolisant le grip de redimensionnement -->
            <line class="handle-grip" x1="${wPx/2 + 2}" y1="${lPx/2 + 7}" x2="${wPx/2 + 7}" y2="${lPx/2 + 2}" />
            <line class="handle-grip" x1="${wPx/2 + 5}" y1="${lPx/2 + 7}" x2="${wPx/2 + 7}" y2="${lPx/2 + 5}" />

            <!-- Badge des dimensions actuelles en bas à droite -->
            <g class="handle-size-badge" transform="translate(${wPx/2 + 14}, ${lPx/2 + 16})">
              <rect x="-2" y="-9" width="${sizeLabel.length * 6.5 + 8}" height="14" rx="3" />
              <text class="handle-size-text" x="2" y="1.5">${sizeLabel}</text>
            </g>
          </g>
        </g>
      `;
    });
  }

  /**
   * Poignées d'édition de la sélection (outil Sélection, 2D) : extrémités d'un mur seul sélectionné
   * (les murs connectés suivent) et sommets d'une pièce seule sélectionnée (constats F46, F131).
   */
  private renderSelectionHandles() {
    if (!this.canEdit2D || this.activeTool !== 'select') return null;
    const sel = this.selectedElements;
    const count = selectionCount(sel);
    if (count !== 1) return null;

    if (sel.wallIds.length === 1) {
      const wall = this.project.walls.find(w => w.id === sel.wallIds[0]);
      if (!wall) return null;
      return svg`
        <g class="selection-handles">
          ${(['start', 'end'] as const).map(which => {
            const p = this.worldToScreen(wall[which]);
            return svg`
              <g class="wall-endpoint-handle" @pointerdown=${(e: PointerEvent) => this.handleWallEndpointPointerDown(wall, which, e)}>
                <circle cx="${p.x}" cy="${p.y}" r="12" fill="transparent" />
                <circle class="handle-dot" cx="${p.x}" cy="${p.y}" r="6" />
              </g>
            `;
          })}
        </g>
      `;
    }

    if (sel.roomIds.length === 1) {
      const room = this.project.rooms.find(r => r.id === sel.roomIds[0]);
      if (!room) return null;
      return svg`
        <g class="selection-handles">
          ${room.polygon.map((vertex, index) => {
            const p = this.worldToScreen(vertex);
            return svg`
              <g class="room-vertex-handle" @pointerdown=${(e: PointerEvent) => this.handleRoomVertexPointerDown(room, index, e)}>
                <circle cx="${p.x}" cy="${p.y}" r="11" fill="transparent" />
                <rect class="handle-dot" x="${p.x - 5}" y="${p.y - 5}" width="10" height="10" rx="2" />
              </g>
            `;
          })}
        </g>
      `;
    }
    return null;
  }

  /** Indicateur d'accrochage : sommet, milieu de mur, axe de mur (jonction en T) ou autre contrainte. */
  private renderSnapIndicator() {
    if (!this.previewPoint || this.snapInfo.snappedTo === 'none') return null;

    const sPt = this.worldToScreen(this.previewPoint);
    const kind = this.snapInfo.snappedTo;

    if (kind === 'midpoint') {
      return svg`
        <g transform="translate(${sPt.x}, ${sPt.y})" pointer-events="none">
          <polygon points="0,-7 7,5 -7,5" class="snap-indicator" />
        </g>
      `;
    }
    if (kind === 'wall') {
      return svg`
        <g transform="translate(${sPt.x}, ${sPt.y})" pointer-events="none">
          <rect x="-5.5" y="-5.5" width="11" height="11" class="snap-indicator" />
        </g>
      `;
    }
    const isVertex = kind === 'vertex';
    return svg`
      <g transform="translate(${sPt.x}, ${sPt.y})" pointer-events="none">
        <circle r="${isVertex ? 7 : 5}" class="snap-indicator" />
        ${isVertex ? svg`<circle r="2" class="snap-indicator-dot" />` : null}
      </g>
    `;
  }

  private renderMarqueeBox() {
    if (!this.marqueeStart || !this.marqueeCurrent) return null;
    const p1 = this.worldToScreen(this.marqueeStart);
    const p2 = this.worldToScreen(this.marqueeCurrent);
    const x = Math.min(p1.x, p2.x);
    const y = Math.min(p1.y, p2.y);
    const w = Math.abs(p1.x - p2.x);
    const h = Math.abs(p1.y - p2.y);

    return svg`
      <rect
        class="marquee-selection-box"
        x="${x}"
        y="${y}"
        width="${w}"
        height="${h}"
      />
    `;
  }

  public rotateQuarterTurn(): void {
    const view = this.view3dElement;
    if (view) {
      view.rotateQuarterTurn();
    } else if (this.is3DMode) {
      // En 3D : pivoter l'orbite d'un quart de tour (depuis l'angle visé si une transition est en cours)
      const from = this.cameraTarget ?? { pitchDeg: this.orbitPitch, yawDeg: this.orbitYaw };
      this.animateCamera({ pitchDeg: from.pitchDeg, yawDeg: (from.yawDeg - 90) % 360 });
    } else {
      // En 2D : pivoter l'angle de vue d'un quart de tour à gauche (↺ -90°)
      this.viewRotation -= 90;
      this.fitPlanView();
    }
  }

  /**
   * Cadre le plan dans le canevas (menu « Ajuster » du studio, plan chargé ou importé) : vue 2D et, en
   * vue WebGL, caméra 3D (angles conservés).
   */
  public fitToScreen(padding: number = 60): void {
    this.fitPlanView(padding);
    this.view3dElement?.fitToView();
  }

  /**
   * Cadrage de la vue 2D et de la 3D simplifiée (rotation de vue normalisée : largeur et hauteur
   * transposées à 90° et 270°). Avant la mise en page, le cadrage est différé au premier redimensionnement
   * non nul (constat F55). La caméra WebGL n'est pas touchée (redimensionnement, plan rechargé).
   */
  private fitPlanView(padding: number = 60): void {
    const size = this.measuredSize();
    if (!size) {
      this.pendingFitPadding = padding;
      return;
    }
    this.pendingFitPadding = null;
    this.viewTouched = false;

    if (!hasContent(this.project)) {
      this.viewport = { x: size.width / 2, y: size.height / 2, zoom: defaultZoom(this.ppm) };
      return;
    }

    const bbox = SvgExporter.calculateBoundingBox(this.project, 0.6);
    this.viewport = fitViewport(bbox, this.ppm, size, this.is3DMode ? 0 : this.viewRotation, padding);
  }

  private resetView(): void {
    this.viewRotation = 0;
    this.fitPlanView();
    this.view3dElement?.resetView();
  }

  /** Bouton ⛶ : cadre le plan (caméra recadrée en vue WebGL, qui garde ses angles). */
  private fitView(): void {
    const view = this.view3dElement;
    if (view) view.fitToView();
    else this.fitPlanView(40);
  }

  /** Bouton 2D/3D : le parent possède is3DMode et applique la valeur demandée (constat F100). */
  private toggle3DMode(): void {
    this.dispatchEvent(new CustomEvent('toggle-3d', {
      detail: { is3DMode: !this.is3DMode },
      bubbles: true,
      composed: true
    }));
  }

  private getHelpMessage(): string | null {
    if (this.isDashboardMode || !this.interactive) return null;
    if (this.pendingPlacement && this.canEdit2D) {
      return "Touchez le plan à l'endroit voulu pour placer l'élément (Échap pour annuler).";
    }
    if (this.webgl3D) {
      return "Vue 3D : glisser pour pivoter, clic droit ou Maj+glisser pour déplacer, molette pour zoomer. Clic : sélection, double-clic : fiche. Édition en vue 2D.";
    }
    if (this.is3DMode) {
      const prefix = this.view3d === 'fallback' ? 'Vue 3D simplifiée' : 'Vue 3D Interactive';
      return `${prefix} : Glisser (clic gauche/droit) pour pivoter 360°, Molette pour zoomer, Shift+glisser pour déplacer. Édition en vue 2D.`;
    }
    if (this.readOnly) {
      return 'Lecture seule : vous pouvez parcourir et sélectionner, mais pas modifier le plan.';
    }
    if (this.activeTool === 'select') {
      return "Mode Sélection : Cliquez sur un élément pour le sélectionner (Shift pour multi-sélection, Shift+glisser pour cadre). Glissez pour déplacer, flèches pour ajuster au cm. Suppr pour effacer.";
    }
    if (this.activeTool === 'wall') {
      return this.drawingWallStart
        ? "Cliquez pour terminer le mur (double-clic ou Échap pour arrêter). Alt : sans accrochage."
        : "Cliquez pour démarrer un mur. Alt : sans accrochage.";
    }
    if (this.activeTool === 'room') {
      return this.roomDraft.length >= 3
        ? "Cliquez l'angle suivant. Double-clic, Entrée ou clic sur le 1er angle pour fermer la pièce."
        : "Pièce libre : cliquez chaque angle de la pièce. Alt : sans accrochage.";
    }
    if (this.activeTool === 'rect_room') {
      return this.rectStart
        ? "Cliquez ou relâchez sur l'angle opposé de la pièce."
        : "Pièce rectangulaire : glissez d'un angle à l'angle opposé (ou cliquez les deux angles).";
    }
    if (this.activeTool === 'door') {
      return "Survolez un mur. Espace = inverser intérieur/extérieur. F = gauche/droite.";
    }
    if (this.activeTool === 'window' || this.activeTool === 'french_window') {
      return "Survolez un mur pour insérer la fenêtre.";
    }
    if (this.activeTool === 'calibrate') {
      return this.calibrateStart ? "Cliquez sur la 2ème extrémité du mur mesuré." : "Tracez un segment sur un mur pour étalonner l'échelle.";
    }
    if (this.activeTool === 'rescale') {
      return this.rescaleStart
        ? "Tracez la ligne jusqu'au 2ème point (autre extrémité du mur ou point de référence)."
        : "Mettre à l'échelle : Sélectionnez un mur ou cliquez sur le 1er point de mesure.";
    }
    return null;
  }

  /** Contrôles de la vue : boutons nommés pour les lecteurs d'écran (constat F103), HUD adaptatif (constat F126). */
  private renderControls() {
    const is3D = this.is3DMode;
    return html`
      <div class="canvas-hud" role="toolbar" aria-label="Contrôles de la vue">
        <button
          class="hud-btn ${is3D ? 'active' : ''}"
          @click=${this.toggle3DMode}
          title="Basculer Vue 2D / 3D Isométrique"
          aria-label="Vue 3D"
          aria-pressed=${is3D ? 'true' : 'false'}
        >
          ${is3D ? '🧊' : '📐'}
        </button>

        ${this.webgl3D ? html`
          <button
            class="hud-btn ${this.cutWalls ? 'active' : ''}"
            @click=${() => { this.cutWalls = !this.cutWalls; }}
            title="Couper les murs à mi-hauteur pour voir l'intérieur"
            aria-label="Couper les murs à mi-hauteur"
            aria-pressed=${this.cutWalls ? 'true' : 'false'}
          >
            ✂️
          </button>
        ` : nothing}

        ${is3D ? html`
          <div class="hud-preset-group" role="group" aria-label="Préréglages de la caméra 3D">
            <span class="hud-angle-badge" aria-hidden="true">${Math.round(this.orbitYaw)}° / ${Math.round(this.orbitPitch)}°</span>
            ${CAMERA_PRESETS.map(preset => html`
              <button
                class="hud-preset-btn"
                @click=${() => this.setCameraPreset(preset.camera.pitchDeg, preset.camera.yawDeg)}
                title=${preset.title}
                aria-label=${preset.title}
              >${preset.label}</button>
            `)}
          </div>
        ` : nothing}

        <!-- Rotation du plan d'un quart de tour à gauche (90°) -->
        <button
          class="hud-btn"
          @click=${this.rotateQuarterTurn}
          title="Pivoter le plan d'un quart de tour à gauche (↺ 90°)"
          aria-label="Pivoter le plan d'un quart de tour à gauche"
        >
          ↺
        </button>

        <!-- Zoom automatique et centrage sur l'écran -->
        <button
          class="hud-btn"
          @click=${this.fitView}
          title="Ajuster automatiquement à la page (zoom auto et centrage)"
          aria-label="Ajuster le plan à l'écran"
        >
          ⛶
        </button>

        <button class="hud-btn" @click=${this.zoomOut} title="Zoom Arrière" aria-label="Zoom arrière">−</button>
        <div class="hud-zoom-label">${Math.round((this.webgl3D ? this.view3dZoom : displayZoom(this.viewport.zoom, this.ppm)) * 100)}%</div>
        <button class="hud-btn" @click=${this.zoomIn} title="Zoom Avant" aria-label="Zoom avant">+</button>
        <button class="hud-btn" @click=${this.resetView} title="Recentrer" aria-label="Recentrer la vue">⌖</button>
      </div>
    `;
  }

  /** Plan 2D : calques du plan mémorisés, aperçus et poignées par-dessus (même ordre qu'avant). */
  private renderScene2D(views: ReadonlyMap<string, EntityView>, backdrop: unknown, floor: unknown) {
    const k = this.screenPpm;
    const pan = `translate(${this.viewport.x}, ${this.viewport.y})`;
    const bindings = this.displayableBindings(this.project.bindings);
    return svg`
      ${backdrop}
      ${floor}
      ${this.renderOpeningPreview()}
      ${this.renderPreviewWall()}
      ${this.renderRoomDraft()}
      ${this.renderRectRoomPreview()}
      ${this.renderCalibrationLine()}
      ${this.renderRescaleLine()}
      ${this.renderSmartGuides()}
      ${this.renderSnapIndicator()}
      <g class="plan-layer" transform=${pan}>
        ${guard(
          [bindings, k, views, this.selectedElements, this.isDashboardMode, this.canSelect],
          () => this.renderPins2D(views)
        )}
      </g>
      ${this.renderFurnitureHandles()}
      ${this.renderSelectionHandles()}
      ${this.renderMarqueeBox()}
    `;
  }

  /**
   * Vue 3D (constat F120) : le sol (fond, grille, pièces, meubles) est projeté par une matrice affine,
   * les murs sont extrudés et triés en JS, les étiquettes et épingles restent face à l'écran.
   */
  private renderScene3D(views: ReadonlyMap<string, EntityView>, backdrop: unknown, floor: unknown, size: CanvasSize) {
    const basis = this.camera;
    const center = canvasCenter(size);
    const [a, b, c, d, e, f] = floorMatrix(basis, center);
    return svg`
      <g class="camera-3d" transform="matrix(${a} ${b} ${c} ${d} ${e} ${f})">
        ${backdrop}
        ${floor}
      </g>
      ${this.renderWalls3D(size)}
      ${this.renderRoomBadges3D(basis, center)}
      ${this.renderPins3D(views, basis, center)}
    `;
  }

  /**
   * Vue 3D WebGL (constat F120, lot view3d) : murs, ouvertures, sols, meubles et entités en volume ; le
   * HUD du canevas pilote sa caméra. Les clics, la caméra et le survol remontent par des événements.
   */
  private renderView3D() {
    return html`
      <home-architect-3d-view
        .project=${this.project}
        .hass=${this.hass}
        .ghostProject=${this.ghostProject ?? null}
        .showThermalHeatmap=${this.showThermalHeatmap}
        .interactive=${this.canSelect}
        .readOnly=${this.readOnly}
        .dashboard=${this.isDashboardMode}
        .selectedElements=${this.selectedElements}
        .scheme=${this.colorScheme}
        .animations=${this.animations}
        .shadows=${this.shadows}
        .cutWalls=${this.cutWalls}
        .intro=${this.view3dIntro}
        @view3d-pick=${this.handleView3DPick}
        @view3d-camera=${this.handleView3DCamera}
        @view3d-hover=${this.handleView3DHover}
        @view3d-hint=${this.handleView3DHint}
        @view3d-error=${this.handleView3DError}
      ></home-architect-3d-view>
    `;
  }

  /** Plan SVG : vue 2D, ou projection 3D simplifiée (repli de la vue WebGL). */
  private renderSvgViewport(size: CanvasSize) {
    const cx = size.width / 2;
    const cy = size.height / 2;
    const is3D = this.is3DMode;
    const project = this.project;
    const k = this.screenPpm;
    const sel = this.selectedElements;
    const pan = `translate(${this.viewport.x}, ${this.viewport.y})`;
    const bindings = this.displayableBindings(project.bindings);
    const looks = this.roomLooks(project.rooms, bindings, this.showThermalHeatmap, this.entityRevision);
    const views = this.pinViews(bindings, this.entityRevision);

    // Fond, calque fantôme et grille ; puis pièces, meubles, murs et ouvertures (mêmes calques en 2D et
    // en 3D, où le sol est projeté par la caméra). Un pan ne réévalue aucun de ces calques.
    const backdrop = svg`
      <g class="plan-layer" transform=${pan}>
        ${guard([project.background, this.backgroundSrc, k, this.viewport.zoom], () => this.renderBackgroundLayer())}
        ${guard([this.ghostProject, k], () => this.renderGhostLayer())}
      </g>
      ${this.renderGrid()}
    `;
    const floor = svg`
      <g class="plan-layer" transform=${pan}>
        ${guard([project.rooms, k, looks, sel], () => this.renderRooms(looks))}
        ${guard([project.furniture, k, sel, this.canEdit], () => this.renderFurniture())}
        ${is3D ? nothing : guard([project.walls, k, sel, this.showDimensions], () => this.renderWalls2D())}
        ${is3D ? nothing : guard([project.openings, project.walls, k, sel], () => this.renderOpenings())}
        ${is3D ? nothing : guard([project.rooms, k, looks], () => this.renderRoomLabels(looks))}
      </g>
    `;

    return html`
      <div class="viewport-3d-wrapper ${is3D ? 'mode-3d' : ''}">
        <svg class="main-viewport">
          <!-- Rotation de vue 2D autour du centre du canevas ; transform-box et transition (0,35 s, coupée
               si les animations sont réduites) portés par la classe -->
          <g
            class="viewport-2d-rotator"
            style=${styleMap(is3D ? {} : { transform: `rotate(${this.viewRotation}deg)`, 'transform-origin': `${cx}px ${cy}px` })}
          >
            ${is3D ? this.renderScene3D(views, backdrop, floor, size) : this.renderScene2D(views, backdrop, floor)}
          </g>
        </svg>
      </div>
    `;
  }

  render() {
    const helpMsg = this.getHelpMessage();
    // Taille mise en cache par le ResizeObserver : centre de la rotation de vue (v1.0.29)
    const size = this.sizeOrFallback();
    const it = this.interaction;
    const is3D = this.is3DMode;
    const sel = this.selectedElements;
    const containerClasses = {
      'canvas-container': true,
      'is-panning': it.kind === 'pan',
      'is-orbiting': it.kind === 'orbit',
      'dashboard-mode': this.isDashboardMode,
      'mode-3d': is3D,
      'read-only': !this.canEdit,
      'placing': !!this.pendingPlacement && this.canEdit2D
    };

    return html`
      <div
        class=${classMap(containerClasses)}
        @wheel=${this.handleWheel}
        @pointerdown=${this.handlePointerDown}
        @pointermove=${this.handlePointerMove}
        @pointerup=${this.handlePointerUp}
        @pointercancel=${this.handlePointerCancel}
        @lostpointercapture=${this.handleLostPointerCapture}
        @pointerleave=${this.handlePointerLeave}
        @dblclick=${this.handleDoubleClick}
        @contextmenu=${(e: MouseEvent) => { if (this.is3DMode) e.preventDefault(); }}
        @dragover=${this.handleDragOver}
        @drop=${this.handleDrop}
      >
        ${this.webgl3D ? this.renderView3D() : this.renderSvgViewport(size)}
      </div>

      <!-- HUD hors du conteneur interactif : un clic sur le HUD n'atteint jamais les outils du plan -->
      ${helpMsg ? html`<div class="help-hud">${helpMsg}</div>` : nothing}

      <div class="canvas-hint" role="status" ?hidden=${!this.hint}>${this.hint ?? ''}</div>

      ${!this.isDashboardMode ? html`
        <div class="coords-hud ${selectionCount(sel) > 0 ? 'selection-active' : ''}" aria-hidden="true">
          <span class="coords-key">X:</span>
          <span class="coords-x"></span>
          <span class="coords-sep">|</span>
          <span class="coords-key">Y:</span>
          <span class="coords-y"></span>
          <span class="coords-sep">|</span>
          <span class="coords-tool-key">Outil:</span>
          <span class="coords-tool">${this.activeTool.toUpperCase()}</span>
        </div>
      ` : nothing}

      ${this.showControls ? this.renderControls() : nothing}
    `;
  }
}

defineElement('home-architect-canvas', HomeArchitectCanvas);

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-canvas': HomeArchitectCanvas;
  }
}
