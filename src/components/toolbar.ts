import { LitElement, html, css, nothing, svg, PropertyValues, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { defineElement } from '../core/define';
import { GRID_SIZE_PRESETS } from '../core/snapping';
import { ActiveTool, GridConfig } from '../core/types';

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

type Position = { x: number; y: number };
type Submenu = 'none' | 'door' | 'window' | 'wall' | 'room' | 'grid';
type RoomTool = 'room' | 'rect_room';

function sameMeasure(a: number, b: number): boolean {
  return Math.abs(a - b) < 1e-6;
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

/** Libellé d'un pas de grille : centimètres sous 1 m (« 5 cm », « 12.5 cm »), mètres au-delà (« 1 m »). */
function gridSizeLabel(size: number): string {
  return size < 1 ? `${Number((size * 100).toFixed(1))} cm` : `${Number(size.toFixed(2))} m`;
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

export class HomeArchitectToolbar extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      left: 20px;
      top: 20px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      box-sizing: border-box;
      max-height: calc(100% - 16px);
      background: rgba(30, 41, 59, 0.95);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 14px;
      padding: 6px 6px 8px 6px;
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.5), 0 0 15px rgba(2, 132, 199, 0.2);
      z-index: 40;
      user-select: none;
      touch-action: none;
    }

    .drag-handle {
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
      color: #64748b;
      border-radius: 6px;
      transition: all 0.2s ease;
      margin-bottom: 2px;
    }

    .drag-handle:hover, .drag-handle.dragging {
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.15);
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
      padding: 2px;
      margin: -2px;
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
      color: #94a3b8;
      border: 1px solid transparent;
      border-radius: 10px;
      width: 42px;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 19px;
      transition: all 0.2s ease;
      position: relative;
    }

    .tool-btn:hover:not(:disabled) {
      background: rgba(51, 65, 85, 0.8);
      color: #f8fafc;
      transform: scale(1.05);
    }

    .tool-btn.active {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
    }

    .tool-btn.menu-open {
      border-color: #38bdf8;
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.6);
      background: rgba(2, 132, 199, 0.4);
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
      background: rgba(245, 158, 11, 0.15);
      border-color: rgba(245, 158, 11, 0.4);
      color: #f59e0b;
    }

    .tool-btn.highlight:hover:not(:disabled) {
      background: #f59e0b;
      color: #ffffff;
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
      background: rgba(255, 255, 255, 0.1);
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
      background: rgba(15, 23, 42, 0.96);
      backdrop-filter: blur(20px);
      border: 1.5px solid rgba(56, 189, 248, 0.45);
      border-radius: 14px;
      padding: 10px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(56, 189, 248, 0.25);
      z-index: 60;
      width: 300px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      animation: flyoutIn 0.18s ease-out;
      user-select: none;
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
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 2px;
    }

    .flyout-title {
      font-size: 0.8rem;
      font-weight: 700;
      color: #38bdf8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .flyout-close-btn {
      background: transparent;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      font-size: 14px;
      padding: 2px 5px;
      border-radius: 4px;
      line-height: 1;
    }

    .flyout-close-btn:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .flyout-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(30, 41, 59, 0.65);
      color: #e2e8f0;
      cursor: pointer;
      transition: all 0.15s ease;
      text-align: left;
      width: 100%;
      font: inherit;
      flex-shrink: 0;
    }

    .flyout-item:hover {
      background: rgba(56, 189, 248, 0.18);
      border-color: rgba(56, 189, 248, 0.5);
      color: #ffffff;
      transform: translateX(2px);
    }

    .flyout-item.active {
      background: rgba(2, 132, 199, 0.35);
      border-color: #38bdf8;
      color: #ffffff;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
    }

    .flyout-item-icon {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 16px;
    }

    .flyout-item-content {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
    }

    .flyout-item-label {
      font-size: 0.84rem;
      font-weight: 700;
      color: #f1f5f9;
      line-height: 1.25;
    }

    .flyout-item-sub {
      font-size: 0.72rem;
      color: #94a3b8;
      margin-top: 2px;
      line-height: 1.25;
    }

    .flyout-section-label {
      font-size: 0.72rem;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      padding: 4px 4px 0 4px;
    }

    .grid-sizes {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(48px, 1fr));
      gap: 5px;
    }

    .grid-size-btn {
      background: rgba(30, 41, 59, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: #e2e8f0;
      font: inherit;
      font-size: 0.76rem;
      font-weight: 700;
      padding: 7px 2px;
      cursor: pointer;
      white-space: nowrap;
    }

    .grid-size-btn:hover {
      border-color: rgba(56, 189, 248, 0.5);
      background: rgba(56, 189, 248, 0.18);
    }

    .grid-size-btn.active {
      background: rgba(2, 132, 199, 0.35);
      border-color: #38bdf8;
      color: #ffffff;
    }

    .flyout-toggle {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 7px 10px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(30, 41, 59, 0.65);
      cursor: pointer;
      flex-shrink: 0;
    }

    .flyout-toggle input {
      width: 16px;
      height: 16px;
      accent-color: #0284c7;
      flex-shrink: 0;
      margin: 0;
    }

    .flyout-hint {
      font-size: 0.7rem;
      color: #64748b;
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

    .flyout-item-badge {
      font-size: 0.72rem;
      font-weight: 700;
      font-family: ui-monospace, SFMono-Regular, monospace;
      padding: 3px 8px;
      border-radius: 6px;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(56, 189, 248, 0.35);
      color: #38bdf8;
      flex-shrink: 0;
    }
  `;

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

  /** Lecture seule (utilisateur non administrateur) : seuls la sélection et la navigation restent actives. */
  @property({ type: Boolean, attribute: 'read-only', reflect: true })
  public readOnly: boolean = false;

  @state()
  private isDragging: boolean = false;

  @state()
  private activeSubmenu: Submenu = 'none';

  /** Position choisie par l'utilisateur (mémorisée), et position effective re-bornée à la zone visible. */
  private preferredPosition: Position = { ...DEFAULT_POSITION };
  private position: Position = { ...DEFAULT_POSITION };
  private dragStartPointer: Position = { x: 0, y: 0 };
  private dragStartPosition: Position = { ...DEFAULT_POSITION };
  private resizeObserver: ResizeObserver | null = null;
  private lastRoomTool: RoomTool = 'room';

  connectedCallback() {
    super.connectedCallback();
    this.preferredPosition = readStoredPosition() ?? { ...DEFAULT_POSITION };
    this.setHostPosition(this.preferredPosition);
    window.addEventListener('pointerdown', this.handleWindowPointerDown);

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
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
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
  }

  protected updated(changed: PropertyValues) {
    super.updated(changed);
    // La hauteur de la barre change (boutons compacts, badge lecture seule) : re-bornage.
    if (changed.has('narrow') || changed.has('readOnly')) {
      this.applyPosition();
    }
    if (changed.has('activeSubmenu') && this.activeSubmenu !== 'none') {
      this.positionFlyout();
    }
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

    const target = {
      x: this.dragStartPosition.x + e.clientX - this.dragStartPointer.x,
      y: this.dragStartPosition.y + e.clientY - this.dragStartPointer.y,
    };
    const bounds = this.getBoundsRect();
    const next = bounds ? this.clampPosition(target, bounds) : target;
    this.preferredPosition = next;
    this.setHostPosition(next);
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

  private closeSubmenu() {
    this.activeSubmenu = 'none';
  }

  private toggleSubmenu(menu: Exclude<Submenu, 'none'>, e: Event) {
    e.stopPropagation();
    this.activeSubmenu = this.activeSubmenu === menu ? 'none' : menu;
  }

  private selectDoorOption(flipSide: boolean, flipDirection: boolean) {
    this.dispatchEvent(new CustomEvent('door-config-changed', {
      detail: { flipSide, flipDirection },
      bubbles: true,
      composed: true
    }));
    this.selectTool('door');
    this.activeSubmenu = 'none';
  }

  private selectWindowOption(type: 'window' | 'french_window', sashCount: number, width: number) {
    this.dispatchEvent(new CustomEvent('window-config-changed', {
      detail: { type, sashCount, width },
      bubbles: true,
      composed: true
    }));
    this.selectTool(type);
    this.activeSubmenu = 'none';
  }

  private selectWallThickness(thickness: number) {
    this.dispatchEvent(new CustomEvent('wall-thickness-changed', {
      detail: { thickness },
      bubbles: true,
      composed: true
    }));
    this.selectTool('wall');
    this.activeSubmenu = 'none';
  }

  private selectRoomTool(tool: RoomTool) {
    this.selectTool(tool);
    this.activeSubmenu = 'none';
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

  private renderFlyoutShell(icon: TemplateResult | string, title: string, body: TemplateResult) {
    return html`
      <div class="flyout-menu" @pointerdown=${(e: Event) => e.stopPropagation()}>
        <div class="flyout-header">
          <span class="flyout-title">
            <span>${icon}</span>
            <span>${title}</span>
          </span>
          <button type="button" class="flyout-close-btn" title="Fermer" @click=${this.closeSubmenu}>✕</button>
        </div>
        ${body}
      </div>
    `;
  }

  private renderDoorItems() {
    return html`
      <!-- 1. Droite Intérieure (Poussant Droit) -->
      <button 
        type="button"
        class="flyout-item ${!this.doorFlipSide && this.doorFlipDirection ? 'active' : ''}"
        @click=${() => this.selectDoorOption(false, true)}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <line x1="-10" y1="0" x2="10" y2="0" stroke="#64748b" stroke-width="2.5"/>
            <circle cx="8" cy="0" r="1.5" fill="#f59e0b"/>
            <line x1="8" y1="0" x2="8" y2="10" stroke="#38bdf8" stroke-width="2"/>
            <path d="M -2 0 A 10 10 0 0 0 8 10" fill="none" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="2,2"/>
          </svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">Ouverture droite intérieure</div>
          <div class="flyout-item-sub">Poussant droit • Gonds à droite, s'ouvre vers l'intérieur</div>
        </div>
        ${!this.doorFlipSide && this.doorFlipDirection ? html`<span class="flyout-item-badge">Actif</span>` : nothing}
      </button>

      <!-- 2. Gauche Intérieure (Poussant Gauche) -->
      <button 
        type="button"
        class="flyout-item ${!this.doorFlipSide && !this.doorFlipDirection ? 'active' : ''}"
        @click=${() => this.selectDoorOption(false, false)}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <line x1="-10" y1="0" x2="10" y2="0" stroke="#64748b" stroke-width="2.5"/>
            <circle cx="-8" cy="0" r="1.5" fill="#f59e0b"/>
            <line x1="-8" y1="0" x2="-8" y2="10" stroke="#38bdf8" stroke-width="2"/>
            <path d="M 2 0 A 10 10 0 0 1 -8 10" fill="none" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="2,2"/>
          </svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">Ouverture gauche intérieure</div>
          <div class="flyout-item-sub">Poussant gauche • Gonds à gauche, s'ouvre vers l'intérieur</div>
        </div>
        ${!this.doorFlipSide && !this.doorFlipDirection ? html`<span class="flyout-item-badge">Actif</span>` : nothing}
      </button>

      <!-- 3. Gauche Extérieure (Tirant Gauche) -->
      <button 
        type="button"
        class="flyout-item ${this.doorFlipSide && !this.doorFlipDirection ? 'active' : ''}"
        @click=${() => this.selectDoorOption(true, false)}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <line x1="-10" y1="0" x2="10" y2="0" stroke="#64748b" stroke-width="2.5"/>
            <circle cx="-8" cy="0" r="1.5" fill="#f59e0b"/>
            <line x1="-8" y1="0" x2="-8" y2="-10" stroke="#38bdf8" stroke-width="2"/>
            <path d="M 2 0 A 10 10 0 0 0 -8 -10" fill="none" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="2,2"/>
          </svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">Ouverture gauche extérieure</div>
          <div class="flyout-item-sub">Tirant gauche • Gonds à gauche, s'ouvre vers l'extérieur</div>
        </div>
        ${this.doorFlipSide && !this.doorFlipDirection ? html`<span class="flyout-item-badge">Actif</span>` : nothing}
      </button>

      <!-- 4. Droite Extérieure (Tirant Droit) -->
      <button 
        type="button"
        class="flyout-item ${this.doorFlipSide && this.doorFlipDirection ? 'active' : ''}"
        @click=${() => this.selectDoorOption(true, true)}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <line x1="-10" y1="0" x2="10" y2="0" stroke="#64748b" stroke-width="2.5"/>
            <circle cx="8" cy="0" r="1.5" fill="#f59e0b"/>
            <line x1="8" y1="0" x2="8" y2="-10" stroke="#38bdf8" stroke-width="2"/>
            <path d="M -2 0 A 10 10 0 0 1 8 -10" fill="none" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="2,2"/>
          </svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">Ouverture droite extérieure</div>
          <div class="flyout-item-sub">Tirant droit • Gonds à droite, s'ouvre vers l'extérieur</div>
        </div>
        ${this.doorFlipSide && this.doorFlipDirection ? html`<span class="flyout-item-badge">Actif</span>` : nothing}
      </button>
    `;
  }

  private renderWindowItems() {
    return html`
      <!-- 1. Fenêtre 1 ouvrant -->
      <button 
        type="button"
        class="flyout-item ${this.activeTool === 'window' && this.windowSashCount !== 2 ? 'active' : ''}"
        @click=${() => this.selectWindowOption('window', 1, 0.90)}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <rect x="-9" y="-6" width="18" height="12" fill="none" stroke="#94a3b8" stroke-width="1.8"/>
            <line x1="-9" y1="0" x2="9" y2="0" stroke="#38bdf8" stroke-width="1.5"/>
          </svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">1 ouvrant (Battant simple)</div>
          <div class="flyout-item-sub">Fenêtre standard 1 vantail (90 cm)</div>
        </div>
        <span class="flyout-item-badge">90 cm</span>
      </button>

      <!-- 2. Fenêtre 2 battants -->
      <button 
        type="button"
        class="flyout-item ${this.activeTool === 'window' && this.windowSashCount === 2 ? 'active' : ''}"
        @click=${() => this.selectWindowOption('window', 2, 1.40)}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <rect x="-10" y="-6" width="20" height="12" fill="none" stroke="#94a3b8" stroke-width="1.8"/>
            <line x1="-10" y1="0" x2="10" y2="0" stroke="#38bdf8" stroke-width="1.5"/>
            <line x1="0" y1="-6" x2="0" y2="6" stroke="#38bdf8" stroke-width="2"/>
          </svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">2 battants (Double vantaux)</div>
          <div class="flyout-item-sub">Fenêtre large avec meneau (1.40 m)</div>
        </div>
        <span class="flyout-item-badge">1.40 m</span>
      </button>

      <!-- 3. Baie vitrée coulissante -->
      <button 
        type="button"
        class="flyout-item ${this.activeTool === 'french_window' ? 'active' : ''}"
        @click=${() => this.selectWindowOption('french_window', 2, 2.00)}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <rect x="-10" y="-6" width="20" height="12" fill="none" stroke="#94a3b8" stroke-width="1.8"/>
            <rect x="-10" y="-3" width="10" height="2" fill="#38bdf8"/>
            <rect x="0" y="2" width="10" height="2" fill="#38bdf8"/>
          </svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">Baie vitrée coulissante</div>
          <div class="flyout-item-sub">Porte-fenêtre 2 vantaux (2.00 m)</div>
        </div>
        <span class="flyout-item-badge">2.00 m</span>
      </button>
    `;
  }

  private renderWallItems() {
    return html`
      <!-- 1. Mur Fin (10 cm) -->
      <button 
        type="button"
        class="flyout-item ${sameMeasure(this.currentThickness, 0.10) ? 'active' : ''}"
        @click=${() => this.selectWallThickness(0.10)}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <rect x="-10" y="-2" width="20" height="4" fill="#94a3b8" rx="1"/>
          </svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">Fin (Cloison)</div>
          <div class="flyout-item-sub">Cloisons intérieures séparatives (10 cm)</div>
        </div>
        <span class="flyout-item-badge">10 cm</span>
      </button>

      <!-- 2. Mur Moyen (20 cm) -->
      <button 
        type="button"
        class="flyout-item ${sameMeasure(this.currentThickness, 0.20) ? 'active' : ''}"
        @click=${() => this.selectWallThickness(0.20)}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <rect x="-10" y="-4" width="20" height="8" fill="#38bdf8" rx="1"/>
          </svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">Moyen (Standard)</div>
          <div class="flyout-item-sub">Murs intérieurs porteurs ou standards (20 cm)</div>
        </div>
        <span class="flyout-item-badge">20 cm</span>
      </button>

      <!-- 3. Mur Gros (30 cm) -->
      <button 
        type="button"
        class="flyout-item ${sameMeasure(this.currentThickness, 0.30) ? 'active' : ''}"
        @click=${() => this.selectWallThickness(0.30)}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <rect x="-10" y="-6" width="20" height="12" fill="#0284c7" stroke="#38bdf8" stroke-width="1" rx="1"/>
          </svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">Gros (Porteur / Extérieur)</div>
          <div class="flyout-item-sub">Murs de façade et gros porteurs (30 cm)</div>
        </div>
        <span class="flyout-item-badge">30 cm</span>
      </button>
    `;
  }

  private renderRoomItems() {
    return html`
      <button
        type="button"
        class="flyout-item ${this.activeTool === 'room' ? 'active' : ''}"
        @click=${() => this.selectRoomTool('room')}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" style="color: #38bdf8">${ROOM_POLYGON_ICON}</svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">Pièce libre (polygone)</div>
          <div class="flyout-item-sub">Cliquez chaque angle ; double-cliquez ou revenez au premier point pour fermer</div>
        </div>
        ${this.activeTool === 'room' ? html`<span class="flyout-item-badge">Actif</span>` : nothing}
      </button>

      <button
        type="button"
        class="flyout-item ${this.activeTool === 'rect_room' ? 'active' : ''}"
        @click=${() => this.selectRoomTool('rect_room')}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" style="color: #38bdf8">${ROOM_RECT_ICON}</svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">Pièce rectangulaire</div>
          <div class="flyout-item-sub">Glissez d'un angle à l'angle opposé</div>
        </div>
        ${this.activeTool === 'rect_room' ? html`<span class="flyout-item-badge">Actif</span>` : nothing}
      </button>
    `;
  }

  private renderGridItems() {
    const grid = this.grid ?? DEFAULT_GRID;
    const toggles: ReadonlyArray<{ key: 'snapToGrid' | 'snapToAngles' | 'snapToElements'; label: string; sub: string }> = [
      { key: 'snapToGrid', label: 'Accrocher à la grille', sub: 'Les points tombent sur les intersections de la grille' },
      { key: 'snapToAngles', label: 'Accrocher aux angles', sub: 'Murs guidés à 0°, 45° et 90°' },
      { key: 'snapToElements', label: 'Accrocher aux murs et points', sub: 'Alignement sur les extrémités et murs existants' },
    ];
    return html`
      <div class="flyout-section-label">Taille de la grille</div>
      <div class="grid-sizes" role="group" aria-label="Taille de la grille">
        ${GRID_SIZE_PRESETS.map(size => html`
          <button
            type="button"
            class="grid-size-btn ${sameMeasure(grid.size, size) ? 'active' : ''}"
            aria-pressed=${sameMeasure(grid.size, size) ? 'true' : 'false'}
            @click=${() => this.changeGrid({ size })}
          >${gridSizeLabel(size)}</button>
        `)}
      </div>

      <div class="flyout-section-label">Accrochages</div>
      ${toggles.map(t => html`
        <label class="flyout-toggle">
          <input
            type="checkbox"
            .checked=${live(grid[t.key])}
            @change=${(e: Event) => this.changeGrid({ [t.key]: (e.target as HTMLInputElement).checked })}
          />
          <div class="flyout-item-content">
            <div class="flyout-item-label">${t.label}</div>
            <div class="flyout-item-sub">${t.sub}</div>
          </div>
        </label>
      `)}
      <div class="flyout-hint">Maintenez Alt pendant un tracé ou un glisser pour désactiver temporairement l'accrochage.</div>
    `;
  }

  private renderFlyout() {
    switch (this.activeSubmenu) {
      case 'door':
        return this.renderFlyoutShell('🚪', "Sens d'ouverture de porte", this.renderDoorItems());
      case 'window':
        return this.renderFlyoutShell('🪟', 'Type de fenêtre', this.renderWindowItems());
      case 'wall':
        return this.renderFlyoutShell('🧱', 'Épaisseur du mur', this.renderWallItems());
      case 'room':
        return this.renderFlyoutShell('⬠', 'Tracer une pièce', this.renderRoomItems());
      case 'grid':
        return this.renderFlyoutShell('▦', 'Grille et accrochages', this.renderGridItems());
      default:
        return nothing;
    }
  }

  render() {
    const ro = this.readOnly;
    const grid = this.grid ?? DEFAULT_GRID;
    const isRoomTool = this.activeTool === 'room' || this.activeTool === 'rect_room';
    const gridSize = gridSizeLabel(grid.size);

    return html`
      <!-- Poignée de déplacement de la boîte à outils -->
      <div 
        class="drag-handle ${this.isDragging ? 'dragging' : ''}"
        @pointerdown=${this.handleDragStart}
        @pointermove=${this.handleDragMove}
        @pointerup=${this.handleDragEnd}
        @pointercancel=${this.handleDragEnd}
        @dblclick=${this.resetPosition}
        title="Glisser pour déplacer la boîte à outils (double-clic : position par défaut)"
      >
        <div class="grip-dots">•••</div>
      </div>

      ${ro ? html`
        <div class="read-only-badge" title="Lecture seule : l'édition est réservée aux administrateurs Home Assistant">🔒</div>
      ` : nothing}

      <div class="tools">
        <!-- Assistant Débutant -->
        <button 
          class="tool-btn highlight" 
          ?disabled=${ro}
          @click=${this.openWizard} 
          title="Assistant Débutant : Créer une pièce guidée (🪄)"
        >
          🪄
        </button>

        <div class="divider"></div>

        <!-- Annuler & Rétablir -->
        <button 
          class="tool-btn" 
          ?disabled=${ro || !this.canUndo}
          @click=${() => this.dispatchEvent(new CustomEvent('undo', { bubbles: true, composed: true }))}
          title="Annuler (Ctrl+Z / Cmd+Z)"
        >
          ↩️
        </button>
        <button 
          class="tool-btn" 
          ?disabled=${ro || !this.canRedo}
          @click=${() => this.dispatchEvent(new CustomEvent('redo', { bubbles: true, composed: true }))}
          title="Rétablir (Ctrl+Y / Cmd+Shift+Z)"
        >
          ↪️
        </button>

        <div class="divider"></div>

        <!-- Outil Sélection / Pan -->
        <button 
          class="tool-btn ${this.activeTool === 'select' ? 'active' : ''}" 
          @click=${() => { this.activeSubmenu = 'none'; this.selectTool('select'); }} 
          title=${this.withShortcut('Sélectionner & Déplacer', 'select')}
        >
          👆
        </button>

        <!-- Outil Mur -->
        <button 
          class="tool-btn ${this.activeTool === 'wall' ? 'active' : ''} ${this.activeSubmenu === 'wall' ? 'menu-open' : ''}" 
          data-submenu="wall"
          ?disabled=${ro}
          @click=${(e: MouseEvent) => { this.selectTool('wall'); this.toggleSubmenu('wall', e); }} 
          title=${this.withShortcut('Tracer un mur', 'wall') + " - Cliquez pour choisir l'épaisseur (Fin 10cm, Moyen 20cm, Gros 30cm)"}
        >
          🧱
          <span class="submenu-indicator">▾</span>
        </button>

        <!-- Outil Pièce (polygone ou rectangle) -->
        <button 
          class="tool-btn ${isRoomTool ? 'active' : ''} ${this.activeSubmenu === 'room' ? 'menu-open' : ''}" 
          data-submenu="room"
          ?disabled=${ro}
          @click=${(e: MouseEvent) => { this.selectTool(this.lastRoomTool); this.toggleSubmenu('room', e); }} 
          title="Tracer une pièce - Cliquez pour choisir : pièce libre (polygone) ou rectangulaire"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">${this.lastRoomTool === 'rect_room' ? ROOM_RECT_ICON : ROOM_POLYGON_ICON}</svg>
          <span class="submenu-indicator">▾</span>
        </button>

        <div class="divider"></div>

        <!-- Outil Porte -->
        <button 
          class="tool-btn ${this.activeTool === 'door' ? 'active' : ''} ${this.activeSubmenu === 'door' ? 'menu-open' : ''}" 
          data-submenu="door"
          ?disabled=${ro}
          @click=${(e: MouseEvent) => { this.selectTool('door'); this.toggleSubmenu('door', e); }} 
          title=${this.withShortcut('Insérer une porte', 'door') + " - Cliquez pour choisir le sens d'ouverture (Droite/Gauche, Intérieur/Extérieur)"}
        >
          🚪
          <span class="submenu-indicator">▾</span>
        </button>

        <!-- Outil Fenêtre -->
        <button 
          class="tool-btn ${this.activeTool === 'window' ? 'active' : ''} ${this.activeSubmenu === 'window' ? 'menu-open' : ''}" 
          data-submenu="window"
          ?disabled=${ro}
          @click=${(e: MouseEvent) => { this.selectTool('window'); this.toggleSubmenu('window', e); }} 
          title=${this.withShortcut('Insérer une fenêtre', 'window') + ' - Cliquez pour choisir 1 ouvrant ou 2 battants'}
        >
          🪟
          <span class="submenu-indicator">▾</span>
        </button>

        <!-- Outil Baie vitrée / Porte-fenêtre -->
        <button 
          class="tool-btn ${this.activeTool === 'french_window' ? 'active' : ''}" 
          ?disabled=${ro}
          @click=${() => { this.activeSubmenu = 'none'; this.selectTool('french_window'); }} 
          title=${this.withShortcut('Insérer une baie coulissante', 'french_window')}
        >
          🪞
        </button>

        <div class="divider"></div>

        <!-- Import de plan de fond & vectorisation -->
        <button 
          class="tool-btn" 
          ?disabled=${ro}
          @click=${() => { this.activeSubmenu = 'none'; this.openImportModal(); }} 
          title="Importer un plan (PNG, JPG, WebP, SVG) ou coller une image (Ctrl+V / Cmd+V)"
        >
          🖼️
        </button>

        <!-- Étalonnage d'échelle (calque image) -->
        <button 
          class="tool-btn ${this.activeTool === 'calibrate' ? 'active' : ''}" 
          ?disabled=${ro}
          @click=${() => { this.activeSubmenu = 'none'; this.selectTool('calibrate'); }} 
          title=${this.withShortcut("Étalonnage d'échelle : tracer un mur mesuré sur l'image", 'calibrate')}
        >
          📏
        </button>

        <!-- Mettre à l'échelle le plan (Recalculer toutes les cotes) -->
        <button 
          class="tool-btn ${this.activeTool === 'rescale' ? 'active' : ''}" 
          ?disabled=${ro}
          @click=${() => { this.activeSubmenu = 'none'; this.selectTool('rescale'); }} 
          title=${this.withShortcut("Mettre à l'échelle : mesurer un mur pour recalculer toutes les cotes", 'rescale')}
        >
          📐
        </button>

        <div class="divider"></div>

        <!-- Grille et accrochages -->
        <button 
          class="tool-btn ${this.activeSubmenu === 'grid' ? 'menu-open' : ''}" 
          data-submenu="grid"
          ?disabled=${ro}
          @click=${(e: MouseEvent) => this.toggleSubmenu('grid', e)} 
          title="Grille et accrochages (grille ${gridSize}, accrochage ${grid.snapToGrid ? 'activé' : 'désactivé'} ; Alt : sans accrochage)"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" style="opacity: ${grid.snapToGrid ? 1 : 0.45}">${GRID_ICON}</svg>
          <span class="submenu-indicator">▾</span>
        </button>
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
