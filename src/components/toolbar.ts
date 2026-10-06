import { LitElement, html, css, nothing, svg, PropertyValues, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { defineElement } from '../core/define';
import { GRID_SIZE_PRESETS } from '../core/snapping';
import { ActiveTool, GridConfig } from '../core/types';
import { LocalizeController, formatNumber, localize } from '../i18n';
import '../i18n/locales/ui';
import { uiThemeStyles } from '../styles/theme.styles';
import { focusMenuItem, handleMenuKeydown } from '../panel/a11y';

/**
 * Raccourcis clavier des outils (touche seule, sans modificateur), affichés dans les infobulles.
 * Table unique : le panneau, qui gère le clavier, s'appuie sur elle pour que les raccourcis
 * annoncés soient exactement ceux qui existent.
 */
export const TOOL_SHORTCUTS: Readonly<Partial<Record<ActiveTool, string>>> = Object.freeze({
  select: 'v',
  wall: 'w',
  door: 'd',
  rescale: 's',
});

const DEFAULT_GRID: GridConfig = { size: 0.5, subdivisions: 2, snapToGrid: true, snapToAngles: true, snapToElements: true };

/** Position mémorisée de la barre (préférence locale de l'appareil, hors projets). */
const POSITION_STORAGE_KEY = 'home_architect_toolbar_pos';
const DEFAULT_POSITION: Position = { x: 20, y: 20 };
/** Marge minimale entre la barre (ou un sous-menu) et le bord de la zone de dessin. */
const EDGE_MARGIN = 8;
const FLYOUT_GAP = 10;
const FLYOUT_WIDTH = 300;
const MIN_TOOLBAR_HEIGHT = 120;
/** Déplacement de la barre au clavier (flèches de la poignée), en pixels ; Maj : pas large. */
const KEYBOARD_MOVE_STEP = 10;
const KEYBOARD_MOVE_STEP_LARGE = 40;

const FLYOUT_ID = 'toolbar-flyout';
const FLYOUT_TITLE_ID = 'toolbar-flyout-title';
const GRID_HINT_ID = 'toolbar-grid-hint';

type Position = { x: number; y: number };
type Submenu = 'none' | 'door' | 'window' | 'wall' | 'room' | 'grid';
type OpenSubmenu = Exclude<Submenu, 'none'>;
type RoomTool = 'room' | 'rect_room';
type SnapKey = 'snapToGrid' | 'snapToAngles' | 'snapToElements';

function sameMeasure(a: number, b: number): boolean {
  return Math.abs(a - b) < 1e-6;
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

/** Longueur en centimètres arrondis (« 90 cm »), à partir de mètres. */
function formatCentimeters(meters: number): string {
  return localize('ui.unit.cm', { value: formatNumber(Number((meters * 100).toFixed(1)), { maximumFractionDigits: 1 }) });
}

/** Longueur en mètres à deux décimales (« 1,40 m » / « 1.40 m »). */
function formatMeters(meters: number): string {
  return localize('ui.unit.m', { value: formatNumber(meters, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) });
}

/** Libellé d'un pas de grille : centimètres sous 1 m (« 5 cm », « 12,5 cm »), mètres au-delà (« 1 m »). */
function gridSizeLabel(size: number): string {
  return size < 1
    ? formatCentimeters(size)
    : localize('ui.unit.m', { value: formatNumber(size, { maximumFractionDigits: 2 }) });
}

function readStoredPosition(): Position | null {
  try {
    const raw = localStorage.getItem(POSITION_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed === 'object' && parsed !== null) {
      const { x, y } = parsed as Record<string, unknown>;
      if (typeof x === 'number' && typeof y === 'number' && Number.isFinite(x) && Number.isFinite(y)) {
        return { x, y };
      }
    }
  } catch {
    // Stockage bloqué (navigation privée, app compagnon) ou valeur corrompue : position par défaut.
  }
  return null;
}

function writeStoredPosition(position: Position | null): void {
  try {
    if (position) localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify(position));
    else localStorage.removeItem(POSITION_STORAGE_KEY);
  } catch {
    // Stockage bloqué : la position ne sera simplement pas mémorisée.
  }
}

const ROOM_POLYGON_ICON = svg`<polygon points="4,18 3,7 11,3 20,7 19,18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`;
const ROOM_RECT_ICON = svg`<rect x="3.5" y="5.5" width="17" height="13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-dasharray="3 2"/>`;
const GRID_ICON = svg`<path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18" fill="none" stroke="currentColor" stroke-width="1.5"/>`;
const CHECK_ICON = svg`<path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;

/** Bouton d'outil de la barre (voir renderTool). */
interface ToolButton {
  /** Contenu visuel (emoji ou icône SVG), masqué aux technologies d'assistance. */
  icon: TemplateResult | string;
  /** Nom accessible (sans emoji). */
  label: string;
  /** Infobulle (libellé détaillé). */
  title: string;
  onClick: (e: MouseEvent) => void;
  /** État enfoncé (outil actif) ; absent pour une simple action. */
  pressed?: boolean;
  /** Sous-menu ouvert par le bouton. */
  submenu?: OpenSubmenu;
  disabled?: boolean;
  /** Raccourci clavier (aria-keyshortcuts). */
  shortcut?: string;
  className?: string;
}

export class HomeArchitectToolbar extends LitElement {
  static styles = [uiThemeStyles, css`
    :host {
      /* Couleurs dérivées des jetons du thème (src/styles/theme.styles.ts) */
      --tb-bg: color-mix(in srgb, var(--arch-ui-surface) 95%, transparent);
      --tb-flyout-bg: color-mix(in srgb, var(--arch-ui-surface) 97%, transparent);
      --tb-item-bg: color-mix(in srgb, var(--arch-ui-surface-2) 55%, transparent);
      --tb-hover-bg: color-mix(in srgb, var(--arch-ui-accent) 14%, transparent);
      --tb-selected-bg: color-mix(in srgb, var(--arch-ui-accent) 22%, transparent);
      --tb-accent-ink: color-mix(in srgb, var(--arch-ui-accent) 55%, var(--arch-ui-text));
      /* Texte secondaire posé sur les éléments de sous-menu (fond plus foncé que la surface) : renforcé (4,5:1). */
      --tb-muted-ink: color-mix(in srgb, var(--arch-ui-text-muted) 75%, var(--arch-ui-text));

      position: absolute;
      left: 20px;
      top: 20px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      box-sizing: border-box;
      max-height: calc(100% - 16px);
      background: var(--tb-bg);
      backdrop-filter: blur(16px);
      border: 1px solid var(--arch-ui-border);
      border-radius: 14px;
      padding: 6px 6px 8px 6px;
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35);
      z-index: 40;
      user-select: none;
      touch-action: none;
      color: var(--arch-ui-text);
      font-family: var(--arch-ui-font);
    }

    /* Sous-menu ouvert : la barre passe au-dessus des HUD du canevas (z-index 50) pour ne pas être masquée. */
    :host([menu-open]) {
      z-index: 65;
    }

    .drag-handle {
      height: 18px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
      color: var(--arch-ui-text-muted);
      background: transparent;
      border: none;
      padding: 0;
      font: inherit;
      border-radius: 6px;
      transition: all 0.2s ease;
      margin-bottom: 2px;
      touch-action: none;
    }

    .drag-handle:hover, .drag-handle.dragging {
      color: var(--tb-accent-ink);
      background: var(--tb-hover-bg);
    }

    .drag-handle.dragging {
      cursor: grabbing;
    }

    /* Outils : défilent verticalement quand la zone de dessin est trop basse (portable, mobile). */
    .tools {
      display: flex;
      flex-direction: column;
      gap: 5px;
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
      overscroll-behavior: contain;
      scrollbar-width: thin;
      /* Marge intérieure : le contour de focus (2 px, décalé de 2 px) n'est pas rogné par le défilement. */
      padding: 2px 4px;
      margin: -2px -4px;
    }

    .read-only-badge {
      text-align: center;
      font-size: 14px;
      line-height: 1;
      padding: 2px 0 4px 0;
      cursor: help;
    }

    .grip-dots {
      font-size: 11px;
      letter-spacing: 3px;
      font-weight: 900;
      line-height: 1;
    }

    .tool-btn {
      background: transparent;
      color: var(--arch-ui-text-muted);
      border: 1px solid transparent;
      border-radius: 10px;
      width: 42px;
      height: 42px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font: inherit;
      font-size: 19px;
      transition: all 0.2s ease;
      position: relative;
      flex-shrink: 0;
    }

    .tool-btn:hover:not(:disabled) {
      background: var(--arch-ui-surface-2);
      color: var(--arch-ui-text);
      transform: scale(1.05);
    }

    .tool-btn.active {
      background: var(--arch-ui-accent);
      color: var(--arch-ui-accent-text);
      border-color: var(--arch-ui-accent);
      box-shadow: 0 0 12px color-mix(in srgb, var(--arch-ui-accent) 40%, transparent);
    }

    .tool-btn.active:hover:not(:disabled) {
      background: var(--arch-ui-accent);
      color: var(--arch-ui-accent-text);
    }

    .tool-btn.menu-open {
      border-color: var(--arch-ui-accent);
      box-shadow: 0 0 14px color-mix(in srgb, var(--arch-ui-accent) 50%, transparent);
    }

    .tool-btn.menu-open:not(.active) {
      background: var(--tb-selected-bg);
    }

    .submenu-indicator {
      position: absolute;
      bottom: 2px;
      right: 3px;
      font-size: 8px;
      line-height: 1;
      opacity: 0.7;
    }

    .tool-btn.highlight {
      background: color-mix(in srgb, var(--arch-ui-warning) 15%, transparent);
      border-color: color-mix(in srgb, var(--arch-ui-warning) 45%, transparent);
      color: var(--arch-ui-warning);
    }

    .tool-btn.highlight:hover:not(:disabled) {
      background: color-mix(in srgb, var(--arch-ui-warning) 35%, transparent);
      color: var(--arch-ui-text);
    }

    .tool-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
      transform: none !important;
    }

    .tool-btn svg {
      width: 22px;
      height: 22px;
      display: block;
    }

    .divider {
      height: 1px;
      flex-shrink: 0;
      background: var(--arch-ui-border);
      margin: 3px 2px;
    }

    /* Sous-menu Flyout (position calculée par positionFlyout selon la place disponible) */
    .flyout-menu {
      position: absolute;
      top: 0;
      left: calc(100% + 10px);
      box-sizing: border-box;
      overflow-y: auto;
      overscroll-behavior: contain;
      background: var(--tb-flyout-bg);
      backdrop-filter: blur(20px);
      border: 1.5px solid color-mix(in srgb, var(--arch-ui-accent) 45%, transparent);
      border-radius: 14px;
      padding: 10px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
      z-index: 60;
      width: 300px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      animation: flyoutIn 0.18s ease-out;
      user-select: none;
    }

    .flyout-items {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    @keyframes flyoutIn {
      from { opacity: 0; transform: translateX(-8px) scale(0.97); }
      to { opacity: 1; transform: translateX(0) scale(1); }
    }

    .flyout-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2px 4px 6px 4px;
      border-bottom: 1px solid var(--arch-ui-border);
      margin-bottom: 2px;
    }

    .flyout-title {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--tb-accent-ink);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .flyout-close-btn {
      background: transparent;
      border: none;
      color: var(--arch-ui-text-muted);
      cursor: pointer;
      font-size: 14px;
      padding: 2px 5px;
      border-radius: 4px;
      line-height: 1;
    }

    .flyout-close-btn:hover {
      color: var(--arch-ui-text);
      background: var(--arch-ui-surface-2);
    }

    .flyout-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 10px;
      border: 1px solid var(--arch-ui-border);
      background: var(--tb-item-bg);
      color: var(--arch-ui-text);
      cursor: pointer;
      transition: all 0.15s ease;
      text-align: left;
      width: 100%;
      font: inherit;
      flex-shrink: 0;
    }

    .flyout-item:hover {
      background: var(--tb-hover-bg);
      border-color: color-mix(in srgb, var(--arch-ui-accent) 50%, transparent);
      transform: translateX(2px);
    }

    .flyout-item.active {
      background: var(--tb-selected-bg);
      border-color: var(--arch-ui-accent);
      box-shadow: 0 0 12px color-mix(in srgb, var(--arch-ui-accent) 30%, transparent);
    }

    .flyout-item-icon {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      color: var(--arch-ui-accent);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 16px;
    }

    /* Pictogrammes des sous-menus (couleurs du thème) */
    .ico-wall { stroke: var(--arch-ui-text-muted); }
    .ico-frame { stroke: var(--arch-ui-text-muted); }
    .ico-leaf { stroke: var(--arch-ui-accent); }
    .ico-hinge { fill: var(--arch-ui-warning); }
    .ico-fill { fill: var(--arch-ui-accent); }
    .ico-fill-muted { fill: var(--arch-ui-text-muted); }
    .ico-fill-strong { fill: color-mix(in srgb, var(--arch-ui-accent) 75%, black); stroke: var(--arch-ui-accent); }

    .flyout-item-content {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
    }

    .flyout-item-label {
      font-size: 0.84rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      line-height: 1.25;
    }

    .flyout-item-sub {
      font-size: 0.72rem;
      color: var(--tb-muted-ink);
      margin-top: 2px;
      line-height: 1.25;
    }

    .flyout-section-label {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--arch-ui-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.4px;
      padding: 4px 4px 0 4px;
    }

    .flyout-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .grid-sizes {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(48px, 1fr));
      gap: 5px;
    }

    .grid-size-btn {
      background: var(--tb-item-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 8px;
      color: var(--arch-ui-text);
      font: inherit;
      font-size: 0.76rem;
      font-weight: 700;
      padding: 7px 2px;
      cursor: pointer;
      white-space: nowrap;
    }

    .grid-size-btn:hover {
      border-color: color-mix(in srgb, var(--arch-ui-accent) 50%, transparent);
      background: var(--tb-hover-bg);
    }

    .grid-size-btn.active {
      background: var(--tb-selected-bg);
      border-color: var(--arch-ui-accent);
    }

    .flyout-toggle {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 7px 10px;
      border-radius: 10px;
      border: 1px solid var(--arch-ui-border);
      background: var(--tb-item-bg);
      color: var(--arch-ui-text);
      cursor: pointer;
      flex-shrink: 0;
      width: 100%;
      font: inherit;
      text-align: left;
    }

    .flyout-toggle:hover {
      background: var(--tb-hover-bg);
    }

    /* Case à cocher dessinée (l'état est porté par aria-checked du menuitemcheckbox) */
    .check-box {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      box-sizing: border-box;
      border: 1.5px solid var(--arch-ui-text-muted);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: transparent;
      background: var(--arch-ui-surface);
    }

    .check-box svg {
      width: 12px;
      height: 12px;
      display: block;
    }

    .flyout-toggle[aria-checked='true'] .check-box {
      background: var(--arch-ui-accent);
      border-color: var(--arch-ui-accent);
      color: var(--arch-ui-accent-text);
    }

    .flyout-hint {
      font-size: 0.7rem;
      color: var(--arch-ui-text-muted);
      padding: 0 4px;
      line-height: 1.3;
    }

    /* Mode étroit (mobile) : barre plus compacte */
    :host([narrow]) {
      padding: 4px 4px 6px 4px;
      gap: 3px;
    }

    :host([narrow]) .tools {
      gap: 3px;
    }

    :host([narrow]) .tool-btn {
      width: 36px;
      height: 36px;
      font-size: 17px;
    }

    :host([narrow]) .tool-btn svg {
      width: 19px;
      height: 19px;
    }

    /* Focus clavier visible même sur les éléments qui portent déjà une ombre (outil actif, choix courant). */
    .tool-btn:focus-visible,
    .flyout-item:focus-visible,
    .grid-size-btn:focus-visible,
    .flyout-toggle:focus-visible,
    .drag-handle:focus-visible {
      outline: 2px solid var(--arch-ui-accent);
      outline-offset: 2px;
    }

    .flyout-item-badge {
      font-size: 0.72rem;
      font-weight: 700;
      font-family: ui-monospace, SFMono-Regular, monospace;
      padding: 3px 8px;
      border-radius: 6px;
      background: var(--arch-ui-bg);
      border: 1px solid color-mix(in srgb, var(--arch-ui-accent) 35%, transparent);
      color: var(--tb-accent-ink);
      flex-shrink: 0;
    }
  `];

  @property({ type: String })
  public activeTool: ActiveTool = 'wall';

  @property({ type: Boolean })
  public canUndo: boolean = false;

  @property({ type: Boolean })
  public canRedo: boolean = false;

  @property({ type: Number })
  public currentThickness: number = 0.20;

  @property({ type: Boolean })
  public doorFlipSide: boolean = false;

  @property({ type: Boolean })
  public doorFlipDirection: boolean = true;

  @property({ type: Number })
  public windowSashCount: number = 1;

  /** Grille du projet (taille et accrochages), modifiée via 'grid-config-changed'. */
  @property({ attribute: false })
  public grid: GridConfig = DEFAULT_GRID;

  /** Mode étroit de HA (mobile) : barre compacte. */
  @property({ type: Boolean, reflect: true })
  public narrow: boolean = false;

  /** Lecture seule (utilisateur non administrateur) : seules la sélection et la navigation restent actives. */
  @property({ type: Boolean, attribute: 'read-only', reflect: true })
  public readOnly: boolean = false;

  @state()
  private isDragging: boolean = false;

  @state()
  private activeSubmenu: Submenu = 'none';

  /** Re-rendu au changement de langue. */
  private readonly i18n = new LocalizeController(this);

  /** Position choisie par l'utilisateur (mémorisée), et position effective re-bornée à la zone visible. */
  private preferredPosition: Position = { ...DEFAULT_POSITION };
  private position: Position = { ...DEFAULT_POSITION };
  private dragStartPointer: Position = { x: 0, y: 0 };
  private dragStartPosition: Position = { ...DEFAULT_POSITION };
  private resizeObserver: ResizeObserver | null = null;
  private schemeObserver: MutationObserver | null = null;
  private lastRoomTool: RoomTool = 'room';
  /** Sous-menu ouvert au clavier : son premier élément (ou l'élément actif) reçoit le focus. */
  private focusMenuOnOpen = false;

  connectedCallback() {
    super.connectedCallback();
    this.preferredPosition = readStoredPosition() ?? { ...DEFAULT_POSITION };
    this.setHostPosition(this.preferredPosition);
    window.addEventListener('pointerdown', this.handleWindowPointerDown);
    this.addEventListener('keydown', this.handleHostKeyDown);
    this.followHostScheme();

    // Re-bornage au chargement (première mesure) et à chaque redimensionnement de la zone de dessin.
    const bounds = this.getBoundsElement();
    if (typeof ResizeObserver !== 'undefined' && bounds) {
      this.resizeObserver = new ResizeObserver(this.handleLayoutChange);
      this.resizeObserver.observe(bounds);
    } else {
      window.addEventListener('resize', this.handleLayoutChange);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('pointerdown', this.handleWindowPointerDown);
    window.removeEventListener('resize', this.handleLayoutChange);
    this.removeEventListener('keydown', this.handleHostKeyDown);
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.schemeObserver?.disconnect();
    this.schemeObserver = null;
  }

  protected firstUpdated() {
    this.applyPosition();
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has('readOnly') && this.readOnly) {
      this.activeSubmenu = 'none';
    }
    if (changed.has('activeTool') && (this.activeTool === 'room' || this.activeTool === 'rect_room')) {
      this.lastRoomTool = this.activeTool;
    }
    this.toggleAttribute('menu-open', this.activeSubmenu !== 'none');
  }

  protected updated(changed: PropertyValues) {
    super.updated(changed);
    // La hauteur de la barre change (boutons compacts, badge lecture seule) : re-bornage.
    if (changed.has('narrow') || changed.has('readOnly')) {
      this.applyPosition();
    }
    if (changed.has('activeSubmenu') && this.activeSubmenu !== 'none') {
      this.positionFlyout();
      if (this.focusMenuOnOpen) {
        const menu = this.renderRoot.querySelector<HTMLElement>('[role="menu"]');
        if (menu) focusMenuItem(menu, 'checked');
      }
    }
    this.focusMenuOnOpen = false;
  }

  /**
   * Reprend le schéma clair/sombre (attribut `scheme`) de l'élément qui contient la barre (le panneau,
   * qui le pose d'après hass.themes.darkMode) : les couleurs de repli du thème suivent celles du studio.
   */
  private followHostScheme() {
    const root = this.getRootNode();
    const themed = root instanceof ShadowRoot ? root.host : null;
    if (!themed) return;
    const sync = () => {
      const scheme = themed.getAttribute('scheme');
      if (scheme) this.setAttribute('scheme', scheme);
      else this.removeAttribute('scheme');
    };
    sync();
    this.schemeObserver = new MutationObserver(sync);
    this.schemeObserver.observe(themed, { attributes: true, attributeFilter: ['scheme'] });
  }

  private handleWindowPointerDown = (e: PointerEvent) => {
    if (this.activeSubmenu !== 'none' && !e.composedPath().includes(this)) {
      this.activeSubmenu = 'none';
    }
  };

  private handleLayoutChange = () => {
    if (this.isDragging) return;
    this.applyPosition();
    if (this.activeSubmenu !== 'none') this.positionFlyout();
  };

  /**
   * Clavier dans la barre : Échap ferme le sous-menu ouvert (le focus revient à son bouton),
   * flèches haut/bas, Début et Fin parcourent les outils, flèche droite ouvre le sous-menu d'un outil.
   */
  private handleHostKeyDown = (e: KeyboardEvent) => {
    if (e.defaultPrevented) return;
    if (e.key === 'Escape' && this.activeSubmenu !== 'none') {
      e.preventDefault();
      e.stopPropagation();
      this.closeSubmenu({ restoreFocus: true });
      return;
    }
    const target = e.composedPath()[0];
    if (!(target instanceof HTMLElement) || !target.classList.contains('tool-btn')) return;
    const submenu = target.dataset.submenu as OpenSubmenu | undefined;
    if (e.key === 'ArrowRight' && submenu && !target.hasAttribute('disabled')) {
      e.preventDefault();
      e.stopPropagation();
      const openMenu = this.activeSubmenu === submenu ? this.renderRoot.querySelector<HTMLElement>('[role="menu"]') : null;
      if (openMenu) {
        focusMenuItem(openMenu, 'checked');
      } else {
        this.focusMenuOnOpen = true;
        this.activeSubmenu = submenu;
      }
      return;
    }
    const buttons = Array.from(this.renderRoot.querySelectorAll<HTMLButtonElement>('.tools .tool-btn:not(:disabled)'));
    const index = buttons.indexOf(target as HTMLButtonElement);
    if (index < 0) return;
    let next: HTMLButtonElement | undefined;
    switch (e.key) {
      case 'ArrowDown':
        next = buttons[(index + 1) % buttons.length];
        break;
      case 'ArrowUp':
        next = buttons[(index - 1 + buttons.length) % buttons.length];
        break;
      case 'Home':
        next = buttons[0];
        break;
      case 'End':
        next = buttons[buttons.length - 1];
        break;
      default:
        return;
    }
    e.preventDefault();
    e.stopPropagation();
    next?.focus();
  };

  /** Élément dont la barre ne doit pas sortir (zone de dessin). */
  private getBoundsElement(): Element | null {
    if (this.parentElement) return this.parentElement;
    const root = this.getRootNode();
    return root instanceof ShadowRoot ? root.host : null;
  }

  /** Rectangle de la zone de dessin, ou null tant qu'elle n'est pas affichée (taille nulle). */
  private getBoundsRect(): DOMRect | null {
    const rect = this.getBoundsElement()?.getBoundingClientRect();
    return rect && rect.width > 0 && rect.height > 0 ? rect : null;
  }

  private setHostPosition(position: Position) {
    this.position = position;
    this.style.left = `${position.x}px`;
    this.style.top = `${position.y}px`;
  }

  private clampPosition(position: Position, bounds: DOMRect): Position {
    const maxX = Math.max(EDGE_MARGIN, bounds.width - this.offsetWidth - EDGE_MARGIN);
    const maxY = Math.max(EDGE_MARGIN, bounds.height - this.offsetHeight - EDGE_MARGIN);
    return {
      x: Math.round(clamp(position.x, EDGE_MARGIN, maxX)),
      y: Math.round(clamp(position.y, EDGE_MARGIN, maxY)),
    };
  }

  /** Applique la position préférée, re-bornée à la zone visible (la préférence est conservée telle quelle). */
  private applyPosition() {
    const bounds = this.getBoundsRect();
    if (!bounds) {
      this.setHostPosition(this.preferredPosition);
      return;
    }
    // Barre plus haute que la zone : elle défile au lieu d'être coupée.
    this.style.maxHeight = `${Math.max(MIN_TOOLBAR_HEIGHT, bounds.height - 2 * EDGE_MARGIN)}px`;
    this.setHostPosition(this.clampPosition(this.preferredPosition, bounds));
  }

  /** Déplace la barre vers `target` (bornée à la zone visible) et mémorise la position. */
  private moveTo(target: Position) {
    const bounds = this.getBoundsRect();
    const next = bounds ? this.clampPosition(target, bounds) : target;
    this.preferredPosition = next;
    this.setHostPosition(next);
  }

  private handleDragStart(e: PointerEvent) {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();

    this.activeSubmenu = 'none';
    this.isDragging = true;
    this.dragStartPointer = { x: e.clientX, y: e.clientY };
    this.dragStartPosition = { ...this.position };

    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
  }

  private handleDragMove(e: PointerEvent) {
    if (!this.isDragging) return;
    e.preventDefault();
    e.stopPropagation();

    this.moveTo({
      x: this.dragStartPosition.x + e.clientX - this.dragStartPointer.x,
      y: this.dragStartPosition.y + e.clientY - this.dragStartPointer.y,
    });
  }

  private handleDragEnd(e: PointerEvent) {
    if (!this.isDragging) return;
    this.isDragging = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Capture déjà relâchée (pointercancel).
    }
    writeStoredPosition(this.preferredPosition);
  }

  /** Poignée au clavier : flèches pour déplacer la barre (Maj : pas large), Début pour la position par défaut. */
  private handleDragKeyDown(e: KeyboardEvent) {
    if (e.key === 'Home') {
      e.preventDefault();
      e.stopPropagation();
      this.resetPosition();
      return;
    }
    const step = e.shiftKey ? KEYBOARD_MOVE_STEP_LARGE : KEYBOARD_MOVE_STEP;
    const deltas: Record<string, Position> = {
      ArrowLeft: { x: -step, y: 0 },
      ArrowRight: { x: step, y: 0 },
      ArrowUp: { x: 0, y: -step },
      ArrowDown: { x: 0, y: step },
    };
    const delta = deltas[e.key];
    if (!delta) return;
    e.preventDefault();
    e.stopPropagation();
    this.activeSubmenu = 'none';
    this.moveTo({ x: this.position.x + delta.x, y: this.position.y + delta.y });
    writeStoredPosition(this.preferredPosition);
  }

  /** Double-clic sur la poignée : retour à la position par défaut. */
  private resetPosition() {
    this.preferredPosition = { ...DEFAULT_POSITION };
    writeStoredPosition(null);
    this.applyPosition();
  }

  /**
   * Place le sous-menu ouvert dans la zone de dessin : à droite de la barre s'il y a la place,
   * sinon à gauche, sinon contre le bord ; décalé vers le haut s'il dépasserait en bas.
   */
  private positionFlyout() {
    const flyout = this.renderRoot.querySelector<HTMLElement>('.flyout-menu');
    const anchor = this.renderRoot.querySelector<HTMLElement>(`[data-submenu="${this.activeSubmenu}"]`);
    if (!flyout || !anchor) return;
    const host = this.getBoundingClientRect();
    const btn = anchor.getBoundingClientRect();
    const bounds = this.getBoundsRect() ?? new DOMRect(0, 0, window.innerWidth, window.innerHeight);

    const width = Math.max(160, Math.min(FLYOUT_WIDTH, bounds.width - 2 * EDGE_MARGIN));
    flyout.style.width = `${width}px`;
    const spaceRight = bounds.right - EDGE_MARGIN - (host.right + FLYOUT_GAP);
    const spaceLeft = host.left - FLYOUT_GAP - (bounds.left + EDGE_MARGIN);
    let left: number; // relatif à la barre
    if (spaceRight >= width) {
      left = host.width + FLYOUT_GAP;
    } else if (spaceLeft >= width) {
      left = -FLYOUT_GAP - width;
    } else {
      // Ni à droite ni à gauche : collé au bord du côté le plus large, quitte à recouvrir la barre.
      const viewportLeft = spaceRight >= spaceLeft ? bounds.right - EDGE_MARGIN - width : bounds.left + EDGE_MARGIN;
      left = viewportLeft - host.left;
    }
    flyout.style.left = `${Math.round(left)}px`;

    const maxHeight = Math.max(120, bounds.height - 2 * EDGE_MARGIN);
    flyout.style.maxHeight = `${maxHeight}px`;
    const height = Math.min(flyout.offsetHeight, maxHeight);
    let top = btn.top - 6;
    top = Math.min(top, bounds.bottom - EDGE_MARGIN - height);
    top = Math.max(top, bounds.top + EDGE_MARGIN);
    flyout.style.top = `${Math.round(top - host.top)}px`;
  }

  private selectTool(tool: ActiveTool): void {
    this.dispatchEvent(new CustomEvent('tool-selected', {
      detail: { tool },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Ferme le sous-menu. `restoreFocus` : le focus revient (immédiatement, pour que Tab reparte de lui)
   * au bouton qui l'a ouvert, uniquement si le focus était dans le sous-menu.
   */
  private closeSubmenu({ restoreFocus }: { restoreFocus: boolean } = { restoreFocus: false }) {
    const menu = this.activeSubmenu;
    if (menu === 'none') return;
    const active = this.shadowRoot?.activeElement;
    if (restoreFocus && active instanceof HTMLElement && active.closest('.flyout-menu')) {
      this.renderRoot.querySelector<HTMLElement>(`[data-submenu="${menu}"]`)?.focus();
    }
    this.activeSubmenu = 'none';
  }

  /** Ouvre ou ferme un sous-menu ; ouvert au clavier (clic sans pointeur), son élément actif reçoit le focus. */
  private toggleSubmenu(menu: OpenSubmenu, e: MouseEvent) {
    e.stopPropagation();
    if (this.activeSubmenu === menu) {
      this.activeSubmenu = 'none';
      return;
    }
    this.focusMenuOnOpen = e.detail === 0;
    this.activeSubmenu = menu;
  }

  private selectDoorOption(flipSide: boolean, flipDirection: boolean) {
    this.dispatchEvent(new CustomEvent('door-config-changed', {
      detail: { flipSide, flipDirection },
      bubbles: true,
      composed: true
    }));
    this.selectTool('door');
    this.closeSubmenu({ restoreFocus: true });
  }

  private selectWindowOption(type: 'window' | 'french_window', sashCount: number, width: number) {
    this.dispatchEvent(new CustomEvent('window-config-changed', {
      detail: { type, sashCount, width },
      bubbles: true,
      composed: true
    }));
    this.selectTool(type);
    this.closeSubmenu({ restoreFocus: true });
  }

  private selectWallThickness(thickness: number) {
    this.dispatchEvent(new CustomEvent('wall-thickness-changed', {
      detail: { thickness },
      bubbles: true,
      composed: true
    }));
    this.selectTool('wall');
    this.closeSubmenu({ restoreFocus: true });
  }

  private selectRoomTool(tool: RoomTool) {
    this.selectTool(tool);
    this.closeSubmenu({ restoreFocus: true });
  }

  private changeGrid(grid: Partial<GridConfig>) {
    this.dispatchEvent(new CustomEvent('grid-config-changed', {
      detail: { grid },
      bubbles: true,
      composed: true
    }));
  }

  private openWizard(): void {
    this.dispatchEvent(new CustomEvent('open-wizard', {
      bubbles: true,
      composed: true
    }));
  }

  private openImportModal(): void {
    this.dispatchEvent(new CustomEvent('open-import-modal', {
      bubbles: true,
      composed: true
    }));
  }

  /** Libellé d'infobulle suivi du raccourci clavier réel de l'outil, s'il en a un. */
  private withShortcut(label: string, tool: ActiveTool): string {
    const key = TOOL_SHORTCUTS[tool];
    return key ? `${label} (${key.toUpperCase()})` : label;
  }

  private handleMenuKeyDown(e: KeyboardEvent) {
    // Échap est aussi traité par le panneau (annulation du tracé) : il s'arrête au sous-menu.
    if (e.key === 'Escape') e.stopPropagation();
    handleMenuKeydown(e, e.currentTarget as HTMLElement, opts => this.closeSubmenu(opts));
  }

  /** Bouton d'outil : nom accessible traduit, état enfoncé et sous-menu annoncés. */
  private renderTool(b: ToolButton) {
    const open = b.submenu !== undefined && this.activeSubmenu === b.submenu;
    const classes = [
      'tool-btn',
      b.className ?? '',
      b.pressed ? 'active' : '',
      open ? 'menu-open' : '',
    ].filter(Boolean).join(' ');
    return html`
      <button
        type="button"
        class=${classes}
        data-submenu=${b.submenu ?? nothing}
        ?disabled=${b.disabled ?? false}
        aria-label=${b.label}
        aria-pressed=${b.pressed === undefined ? nothing : String(b.pressed)}
        aria-haspopup=${b.submenu ? 'menu' : nothing}
        aria-expanded=${b.submenu ? String(open) : nothing}
        aria-controls=${open ? FLYOUT_ID : nothing}
        aria-keyshortcuts=${b.shortcut ? b.shortcut.toUpperCase() : nothing}
        title=${b.title}
        @click=${b.onClick}
      >
        ${typeof b.icon === 'string' ? html`<span aria-hidden="true">${b.icon}</span>` : b.icon}
        ${b.submenu ? html`<span class="submenu-indicator" aria-hidden="true">▾</span>` : nothing}
      </button>
    `;
  }

  /** Coque d'un sous-menu : en-tête (titre, ✕) et liste role=menu parcourue au clavier. */
  private renderFlyoutShell(icon: TemplateResult | string, title: string, body: TemplateResult, describedBy?: string, footer?: TemplateResult) {
    return html`
      <div class="flyout-menu" id=${FLYOUT_ID} @pointerdown=${(e: Event) => e.stopPropagation()}>
        <div class="flyout-header">
          <span class="flyout-title">
            <span aria-hidden="true">${icon}</span>
            <span id=${FLYOUT_TITLE_ID}>${title}</span>
          </span>
          <button
            type="button"
            class="flyout-close-btn"
            title=${localize('ui.common.close')}
            aria-label=${localize('ui.common.close')}
            @click=${() => this.closeSubmenu({ restoreFocus: true })}
          ><span aria-hidden="true">✕</span></button>
        </div>
        <div
          class="flyout-items"
          role="menu"
          aria-labelledby=${FLYOUT_TITLE_ID}
          aria-describedby=${describedBy ?? nothing}
          @keydown=${this.handleMenuKeyDown}
        >
          ${body}
        </div>
        ${footer ?? nothing}
      </div>
    `;
  }

  /** Élément de sous-menu à choix unique (porte, fenêtre, épaisseur, pièce). */
  private renderRadioItem(opts: {
    checked: boolean;
    icon: TemplateResult;
    label: string;
    sub: string;
    /** Pastille visuelle (dimension, déjà dite par `sub`) ; « Actif » par défaut, annoncé par aria-checked. */
    badge?: string;
    onSelect: () => void;
  }) {
    const badge = opts.badge ?? (opts.checked ? localize('ui.toolbar.active_badge') : undefined);
    return html`
      <button
        type="button"
        class="flyout-item ${opts.checked ? 'active' : ''}"
        role="menuitemradio"
        aria-checked=${opts.checked ? 'true' : 'false'}
        @click=${opts.onSelect}
      >
        <div class="flyout-item-icon" aria-hidden="true">${opts.icon}</div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">${opts.label}</div>
          <div class="flyout-item-sub">${opts.sub}</div>
        </div>
        ${badge ? html`<span class="flyout-item-badge" aria-hidden="true">${badge}</span>` : nothing}
      </button>
    `;
  }

  /** Pictogramme d'un sens d'ouverture de porte (gonds à droite ou à gauche, vers l'intérieur ou l'extérieur). */
  private doorIcon(hingeRight: boolean, inward: boolean) {
    const hx = hingeRight ? 8 : -8;
    const ly = inward ? 10 : -10;
    const arcStart = hingeRight ? -2 : 2;
    const sweep = (hingeRight === inward) ? 0 : 1;
    return html`
      <svg width="24" height="24" viewBox="-12 -12 24 24">
        <line class="ico-wall" x1="-10" y1="0" x2="10" y2="0" stroke-width="2.5"/>
        <circle class="ico-hinge" cx=${hx} cy="0" r="1.5"/>
        <line class="ico-leaf" x1=${hx} y1="0" x2=${hx} y2=${ly} stroke-width="2"/>
        <path class="ico-leaf" d="M ${arcStart} 0 A 10 10 0 0 ${sweep} ${hx} ${ly}" fill="none" stroke-width="1.2" stroke-dasharray="2,2"/>
      </svg>
    `;
  }

  private renderDoorItems() {
    // Les quatre sens : (flipSide, flipDirection) -> gonds à droite si flipDirection, vers l'intérieur si !flipSide.
    const options: ReadonlyArray<{ flipSide: boolean; flipDirection: boolean; key: string }> = [
      { flipSide: false, flipDirection: true, key: 'right_in' },
      { flipSide: false, flipDirection: false, key: 'left_in' },
      { flipSide: true, flipDirection: false, key: 'left_out' },
      { flipSide: true, flipDirection: true, key: 'right_out' },
    ];
    return html`${options.map(o => this.renderRadioItem({
      checked: this.doorFlipSide === o.flipSide && this.doorFlipDirection === o.flipDirection,
      icon: this.doorIcon(o.flipDirection, !o.flipSide),
      label: localize(`ui.toolbar.door.${o.key}`),
      sub: localize(`ui.toolbar.door.${o.key}_sub`),
      onSelect: () => this.selectDoorOption(o.flipSide, o.flipDirection),
    }))}`;
  }

  private renderWindowItems() {
    return html`
      ${this.renderRadioItem({
        checked: this.activeTool === 'window' && this.windowSashCount !== 2,
        icon: html`
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <rect class="ico-frame" x="-9" y="-6" width="18" height="12" fill="none" stroke-width="1.8"/>
            <line class="ico-leaf" x1="-9" y1="0" x2="9" y2="0" stroke-width="1.5"/>
          </svg>`,
        label: localize('ui.toolbar.window.single'),
        sub: localize('ui.toolbar.window.single_sub', { width: formatCentimeters(0.90) }),
        badge: formatCentimeters(0.90),
        onSelect: () => this.selectWindowOption('window', 1, 0.90),
      })}
      ${this.renderRadioItem({
        checked: this.activeTool === 'window' && this.windowSashCount === 2,
        icon: html`
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <rect class="ico-frame" x="-10" y="-6" width="20" height="12" fill="none" stroke-width="1.8"/>
            <line class="ico-leaf" x1="-10" y1="0" x2="10" y2="0" stroke-width="1.5"/>
            <line class="ico-leaf" x1="0" y1="-6" x2="0" y2="6" stroke-width="2"/>
          </svg>`,
        label: localize('ui.toolbar.window.double'),
        sub: localize('ui.toolbar.window.double_sub', { width: formatMeters(1.40) }),
        badge: formatMeters(1.40),
        onSelect: () => this.selectWindowOption('window', 2, 1.40),
      })}
      ${this.renderRadioItem({
        checked: this.activeTool === 'french_window',
        icon: html`
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <rect class="ico-frame" x="-10" y="-6" width="20" height="12" fill="none" stroke-width="1.8"/>
            <rect class="ico-fill" x="-10" y="-3" width="10" height="2"/>
            <rect class="ico-fill" x="0" y="2" width="10" height="2"/>
          </svg>`,
        label: localize('ui.toolbar.window.sliding'),
        sub: localize('ui.toolbar.window.sliding_sub', { width: formatMeters(2.00) }),
        badge: formatMeters(2.00),
        onSelect: () => this.selectWindowOption('french_window', 2, 2.00),
      })}
    `;
  }

  private renderWallItems() {
    const options: ReadonlyArray<{ thickness: number; key: string; icon: TemplateResult }> = [
      { thickness: 0.10, key: 'thin', icon: html`<svg width="24" height="24" viewBox="-12 -12 24 24"><rect class="ico-fill-muted" x="-10" y="-2" width="20" height="4" rx="1"/></svg>` },
      { thickness: 0.20, key: 'medium', icon: html`<svg width="24" height="24" viewBox="-12 -12 24 24"><rect class="ico-fill" x="-10" y="-4" width="20" height="8" rx="1"/></svg>` },
      { thickness: 0.30, key: 'thick', icon: html`<svg width="24" height="24" viewBox="-12 -12 24 24"><rect class="ico-fill-strong" x="-10" y="-6" width="20" height="12" stroke-width="1" rx="1"/></svg>` },
    ];
    return html`${options.map(o => this.renderRadioItem({
      checked: sameMeasure(this.currentThickness, o.thickness),
      icon: o.icon,
      label: localize(`ui.toolbar.wall.${o.key}`),
      sub: localize(`ui.toolbar.wall.${o.key}_sub`, { thickness: formatCentimeters(o.thickness) }),
      badge: formatCentimeters(o.thickness),
      onSelect: () => this.selectWallThickness(o.thickness),
    }))}`;
  }

  private renderRoomItems() {
    return html`
      ${this.renderRadioItem({
        checked: this.activeTool === 'room',
        icon: html`<svg width="24" height="24" viewBox="0 0 24 24">${ROOM_POLYGON_ICON}</svg>`,
        label: localize('ui.toolbar.room.polygon'),
        sub: localize('ui.toolbar.room.polygon_sub'),
        onSelect: () => this.selectRoomTool('room'),
      })}
      ${this.renderRadioItem({
        checked: this.activeTool === 'rect_room',
        icon: html`<svg width="24" height="24" viewBox="0 0 24 24">${ROOM_RECT_ICON}</svg>`,
        label: localize('ui.toolbar.room.rect'),
        sub: localize('ui.toolbar.room.rect_sub'),
        onSelect: () => this.selectRoomTool('rect_room'),
      })}
    `;
  }

  private renderGridItems() {
    const grid = this.grid ?? DEFAULT_GRID;
    const toggles: readonly SnapKey[] = ['snapToGrid', 'snapToAngles', 'snapToElements'];
    return html`
      <div class="flyout-group" role="group" aria-labelledby="grid-size-label">
        <div class="flyout-section-label" id="grid-size-label">${localize('ui.toolbar.grid.size')}</div>
        <div class="grid-sizes">
          ${GRID_SIZE_PRESETS.map(size => html`
            <button
              type="button"
              class="grid-size-btn ${sameMeasure(grid.size, size) ? 'active' : ''}"
              role="menuitemradio"
              aria-checked=${sameMeasure(grid.size, size) ? 'true' : 'false'}
              @click=${() => this.changeGrid({ size })}
            >${gridSizeLabel(size)}</button>
          `)}
        </div>
      </div>

      <div class="flyout-group" role="group" aria-labelledby="grid-snap-label">
        <div class="flyout-section-label" id="grid-snap-label">${localize('ui.toolbar.grid.snapping')}</div>
        ${toggles.map(key => html`
          <button
            type="button"
            class="flyout-toggle"
            role="menuitemcheckbox"
            aria-checked=${grid[key] ? 'true' : 'false'}
            @click=${() => this.changeGrid({ [key]: !grid[key] })}
          >
            <span class="check-box" aria-hidden="true"><svg viewBox="0 0 16 16">${CHECK_ICON}</svg></span>
            <div class="flyout-item-content">
              <div class="flyout-item-label">${localize(`ui.toolbar.grid.${key}`)}</div>
              <div class="flyout-item-sub">${localize(`ui.toolbar.grid.${key}_sub`)}</div>
            </div>
          </button>
        `)}
      </div>
    `;
  }

  private renderFlyout() {
    switch (this.activeSubmenu) {
      case 'door':
        return this.renderFlyoutShell('🚪', localize('ui.toolbar.door.title'), this.renderDoorItems());
      case 'window':
        return this.renderFlyoutShell('🪟', localize('ui.toolbar.window.title'), this.renderWindowItems());
      case 'wall':
        return this.renderFlyoutShell('🧱', localize('ui.toolbar.wall.title'), this.renderWallItems());
      case 'room':
        return this.renderFlyoutShell('⬠', localize('ui.toolbar.room.title'), this.renderRoomItems());
      case 'grid':
        return this.renderFlyoutShell('▦', localize('ui.toolbar.grid.title'), this.renderGridItems(), GRID_HINT_ID,
          html`<div class="flyout-hint" id=${GRID_HINT_ID}>${localize('ui.toolbar.grid.hint')}</div>`);
      default:
        return nothing;
    }
  }

  render() {
    const ro = this.readOnly;
    const grid = this.grid ?? DEFAULT_GRID;
    const isRoomTool = this.activeTool === 'room' || this.activeTool === 'rect_room';
    const gridTitle = localize('ui.toolbar.grid_tooltip', {
      size: gridSizeLabel(grid.size),
      state: localize(grid.snapToGrid ? 'ui.toolbar.snap_on' : 'ui.toolbar.snap_off'),
    });

    return html`
      <!-- Poignée de déplacement de la boîte à outils (souris, toucher ou flèches du clavier) -->
      <button
        type="button"
        class="drag-handle ${this.isDragging ? 'dragging' : ''}"
        @pointerdown=${this.handleDragStart}
        @pointermove=${this.handleDragMove}
        @pointerup=${this.handleDragEnd}
        @pointercancel=${this.handleDragEnd}
        @dblclick=${this.resetPosition}
        @keydown=${this.handleDragKeyDown}
        title=${localize('ui.toolbar.drag')}
        aria-label=${localize('ui.toolbar.drag_label')}
      >
        <span class="grip-dots" aria-hidden="true">•••</span>
      </button>

      ${ro ? html`
        <div
          class="read-only-badge"
          role="img"
          aria-label=${localize('ui.toolbar.read_only')}
          title=${localize('ui.toolbar.read_only')}
        >🔒</div>
      ` : nothing}

      <div class="tools" role="toolbar" aria-orientation="vertical" aria-label=${localize('ui.toolbar.label')}>
        <!-- Assistant Débutant -->
        ${this.renderTool({
          icon: '🪄',
          className: 'highlight',
          label: localize('ui.toolbar.wizard'),
          title: localize('ui.toolbar.wizard_tooltip'),
          disabled: ro,
          onClick: () => { this.activeSubmenu = 'none'; this.openWizard(); },
        })}

        <div class="divider" role="separator"></div>

        <!-- Annuler & Rétablir -->
        ${this.renderTool({
          icon: '↩️',
          label: localize('ui.toolbar.undo'),
          title: localize('ui.toolbar.undo_tooltip'),
          disabled: ro || !this.canUndo,
          onClick: () => this.dispatchEvent(new CustomEvent('undo', { bubbles: true, composed: true })),
        })}
        ${this.renderTool({
          icon: '↪️',
          label: localize('ui.toolbar.redo'),
          title: localize('ui.toolbar.redo_tooltip'),
          disabled: ro || !this.canRedo,
          onClick: () => this.dispatchEvent(new CustomEvent('redo', { bubbles: true, composed: true })),
        })}

        <div class="divider" role="separator"></div>

        <!-- Outil Sélection / Pan -->
        ${this.renderTool({
          icon: '👆',
          label: localize('ui.toolbar.select'),
          title: this.withShortcut(localize('ui.toolbar.select'), 'select'),
          pressed: this.activeTool === 'select',
          shortcut: TOOL_SHORTCUTS.select,
          onClick: () => { this.activeSubmenu = 'none'; this.selectTool('select'); },
        })}

        <!-- Outil Mur -->
        ${this.renderTool({
          icon: '🧱',
          label: localize('ui.toolbar.wall'),
          title: this.withShortcut(localize('ui.toolbar.wall'), 'wall') + localize('ui.toolbar.wall_tooltip_suffix'),
          pressed: this.activeTool === 'wall',
          submenu: 'wall',
          shortcut: TOOL_SHORTCUTS.wall,
          disabled: ro,
          onClick: (e) => { this.selectTool('wall'); this.toggleSubmenu('wall', e); },
        })}

        <!-- Outil Pièce (polygone ou rectangle) -->
        ${this.renderTool({
          icon: html`<svg viewBox="0 0 24 24" aria-hidden="true">${this.lastRoomTool === 'rect_room' ? ROOM_RECT_ICON : ROOM_POLYGON_ICON}</svg>`,
          label: localize('ui.toolbar.room'),
          title: localize('ui.toolbar.room_tooltip'),
          pressed: isRoomTool,
          submenu: 'room',
          disabled: ro,
          onClick: (e) => { this.selectTool(this.lastRoomTool); this.toggleSubmenu('room', e); },
        })}

        <div class="divider" role="separator"></div>

        <!-- Outil Porte -->
        ${this.renderTool({
          icon: '🚪',
          label: localize('ui.toolbar.door'),
          title: this.withShortcut(localize('ui.toolbar.door'), 'door') + localize('ui.toolbar.door_tooltip_suffix'),
          pressed: this.activeTool === 'door',
          submenu: 'door',
          shortcut: TOOL_SHORTCUTS.door,
          disabled: ro,
          onClick: (e) => { this.selectTool('door'); this.toggleSubmenu('door', e); },
        })}

        <!-- Outil Fenêtre -->
        ${this.renderTool({
          icon: '🪟',
          label: localize('ui.toolbar.window'),
          title: this.withShortcut(localize('ui.toolbar.window'), 'window') + localize('ui.toolbar.window_tooltip_suffix'),
          pressed: this.activeTool === 'window',
          submenu: 'window',
          shortcut: TOOL_SHORTCUTS.window,
          disabled: ro,
          onClick: (e) => { this.selectTool('window'); this.toggleSubmenu('window', e); },
        })}

        <!-- Outil Baie vitrée / Porte-fenêtre -->
        ${this.renderTool({
          icon: '🪞',
          label: localize('ui.toolbar.french_window'),
          title: this.withShortcut(localize('ui.toolbar.french_window'), 'french_window'),
          pressed: this.activeTool === 'french_window',
          shortcut: TOOL_SHORTCUTS.french_window,
          disabled: ro,
          onClick: () => { this.activeSubmenu = 'none'; this.selectTool('french_window'); },
        })}

        <div class="divider" role="separator"></div>

        <!-- Import de plan de fond & vectorisation -->
        ${this.renderTool({
          icon: '🖼️',
          label: localize('ui.toolbar.import'),
          title: localize('ui.toolbar.import_tooltip'),
          disabled: ro,
          onClick: () => { this.activeSubmenu = 'none'; this.openImportModal(); },
        })}

        <!-- Étalonnage d'échelle (calque image) -->
        ${this.renderTool({
          icon: '📏',
          label: localize('ui.toolbar.calibrate'),
          title: this.withShortcut(localize('ui.toolbar.calibrate_tooltip'), 'calibrate'),
          pressed: this.activeTool === 'calibrate',
          shortcut: TOOL_SHORTCUTS.calibrate,
          disabled: ro,
          onClick: () => { this.activeSubmenu = 'none'; this.selectTool('calibrate'); },
        })}

        <!-- Mettre à l'échelle le plan (Recalculer toutes les cotes) -->
        ${this.renderTool({
          icon: '📐',
          label: localize('ui.toolbar.rescale'),
          title: this.withShortcut(localize('ui.toolbar.rescale_tooltip'), 'rescale'),
          pressed: this.activeTool === 'rescale',
          shortcut: TOOL_SHORTCUTS.rescale,
          disabled: ro,
          onClick: () => { this.activeSubmenu = 'none'; this.selectTool('rescale'); },
        })}

        <div class="divider" role="separator"></div>

        <!-- Grille et accrochages -->
        ${this.renderTool({
          icon: html`<svg viewBox="0 0 24 24" aria-hidden="true" style="opacity: ${grid.snapToGrid ? 1 : 0.45}">${GRID_ICON}</svg>`,
          label: localize('ui.toolbar.grid.title'),
          title: gridTitle,
          submenu: 'grid',
          disabled: ro,
          onClick: (e) => this.toggleSubmenu('grid', e),
        })}
      </div>

      <!-- ============================================== -->
      <!-- SOUS-MENU FLYOUT                               -->
      <!-- ============================================== -->
      ${this.renderFlyout()}
    `;
  }
}

defineElement('home-architect-toolbar', HomeArchitectToolbar);

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-toolbar': HomeArchitectToolbar;
  }
}
