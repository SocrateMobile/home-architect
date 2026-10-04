import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ActiveTool } from '../core/types';

@customElement('home-architect-toolbar')
export class HomeArchitectToolbar extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      left: 20px;
      top: 20px;
      display: flex;
      flex-direction: column;
      gap: 5px;
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

    .tool-btn:hover {
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

    .tool-btn.highlight:hover {
      background: #f59e0b;
      color: #ffffff;
    }

    .tool-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
      transform: none !important;
    }

    .divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 3px 2px;
    }

    /* Sous-menu Flyout */
    .flyout-menu {
      position: absolute;
      left: calc(100% + 10px);
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

    .flyout-menu.on-left {
      left: auto;
      right: calc(100% + 10px);
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

  @state()
  private position: { x: number; y: number } = { x: 20, y: 20 };

  @state()
  private isDragging: boolean = false;

  @state()
  private activeSubmenu: 'none' | 'door' | 'window' | 'wall' = 'none';

  @state()
  private submenuTop: number = 0;

  @state()
  private submenuOnLeft: boolean = false;

  private dragStartPointer: { x: number; y: number } = { x: 0, y: 0 };
  private dragStartPosition: { x: number; y: number } = { x: 20, y: 20 };

  connectedCallback() {
    super.connectedCallback();
    try {
      const saved = localStorage.getItem('home_architect_toolbar_pos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
          this.position = parsed;
        }
      }
    } catch (_) {}
    this.updateHostPosition();
    window.addEventListener('pointerdown', this.handleWindowPointerDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('pointerdown', this.handleWindowPointerDown);
  }

  private handleWindowPointerDown = (e: MouseEvent) => {
    if (this.activeSubmenu !== 'none') {
      const path = e.composedPath();
      if (!path.includes(this)) {
        this.activeSubmenu = 'none';
      }
    }
  };

  protected updated(changedProps: PropertyValues) {
    super.updated(changedProps);
    if (changedProps.has('position')) {
      this.updateHostPosition();
    }
  }

  private updateHostPosition() {
    this.style.left = `${this.position.x}px`;
    this.style.top = `${this.position.y}px`;
  }

  private handleDragStart(e: PointerEvent) {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();

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

    const dx = e.clientX - this.dragStartPointer.x;
    const dy = e.clientY - this.dragStartPointer.y;

    const parent = this.parentElement || document.body;
    const parentRect = parent.getBoundingClientRect();
    const hostRect = this.getBoundingClientRect();

    const minX = 8;
    const maxX = Math.max(minX, parentRect.width - hostRect.width - 8);
    const minY = 8;
    const maxY = Math.max(minY, parentRect.height - hostRect.height - 8);

    const newX = Math.min(Math.max(this.dragStartPosition.x + dx, minX), maxX);
    const newY = Math.min(Math.max(this.dragStartPosition.y + dy, minY), maxY);

    this.position = { x: Math.round(newX), y: Math.round(newY) };
    this.updateHostPosition();
  }

  private handleDragEnd(e: PointerEvent) {
    if (!this.isDragging) return;
    this.isDragging = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (_) {}

    try {
      localStorage.setItem('home_architect_toolbar_pos', JSON.stringify(this.position));
    } catch (_) {}
  }

  private selectTool(tool: ActiveTool): void {
    this.dispatchEvent(new CustomEvent('tool-selected', {
      detail: { tool },
      bubbles: true,
      composed: true
    }));
  }

  private toggleSubmenu(menu: 'door' | 'window' | 'wall', e: MouseEvent) {
    e.stopPropagation();
    if (this.activeSubmenu === menu) {
      this.activeSubmenu = 'none';
      return;
    }
    const btn = (e.currentTarget as HTMLElement);
    const hostRect = this.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    this.submenuTop = Math.max(0, btnRect.top - hostRect.top - 6);
    this.submenuOnLeft = (hostRect.right + 320 > window.innerWidth);
    this.activeSubmenu = menu;
  }

  private selectDoorOption(flipSide: boolean, flipDirection: boolean) {
    this.doorFlipSide = flipSide;
    this.doorFlipDirection = flipDirection;
    this.dispatchEvent(new CustomEvent('door-config-changed', {
      detail: { flipSide, flipDirection },
      bubbles: true,
      composed: true
    }));
    this.selectTool('door');
    this.activeSubmenu = 'none';
  }

  private selectWindowOption(type: 'window' | 'french_window', sashCount: number, width: number) {
    this.windowSashCount = sashCount;
    this.dispatchEvent(new CustomEvent('window-config-changed', {
      detail: { type, sashCount, width },
      bubbles: true,
      composed: true
    }));
    this.selectTool(type);
    this.activeSubmenu = 'none';
  }

  private selectWallThickness(thickness: number) {
    this.currentThickness = thickness;
    this.dispatchEvent(new CustomEvent('wall-thickness-changed', {
      detail: { thickness },
      bubbles: true,
      composed: true
    }));
    this.selectTool('wall');
    this.activeSubmenu = 'none';
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

  render() {
    return html`
      <!-- Poignée de déplacement de la boîte à outils -->
      <div 
        class="drag-handle ${this.isDragging ? 'dragging' : ''}"
        @pointerdown=${this.handleDragStart}
        @pointermove=${this.handleDragMove}
        @pointerup=${this.handleDragEnd}
        @pointercancel=${this.handleDragEnd}
        title="Glisser pour déplacer la boîte à outils"
      >
        <div class="grip-dots">•••</div>
      </div>

      <!-- Assistant Débutant -->
      <button 
        class="tool-btn highlight" 
        @click=${this.openWizard} 
        title="Assistant Débutant : Créer une pièce guidée (🪄)"
      >
        🪄
      </button>

      <div class="divider"></div>

      <!-- Annuler & Rétablir -->
      <button 
        class="tool-btn" 
        ?disabled=${!this.canUndo}
        @click=${() => this.dispatchEvent(new CustomEvent('undo', { bubbles: true, composed: true }))}
        title="Annuler (Ctrl+Z / Cmd+Z)"
      >
        ↩️
      </button>
      <button 
        class="tool-btn" 
        ?disabled=${!this.canRedo}
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
        title="Sélectionner & Déplacer (V)"
      >
        👆
      </button>

      <!-- Outil Mur -->
      <button 
        class="tool-btn ${this.activeTool === 'wall' ? 'active' : ''} ${this.activeSubmenu === 'wall' ? 'menu-open' : ''}" 
        @click=${(e: MouseEvent) => { this.selectTool('wall'); this.toggleSubmenu('wall', e); }} 
        title="Tracer un mur (W) - Cliquez pour choisir l'épaisseur (Fin 10cm, Moyen 20cm, Gros 30cm)"
      >
        🧱
        <span class="submenu-indicator">▾</span>
      </button>

      <div class="divider"></div>

      <!-- Outil Porte -->
      <button 
        class="tool-btn ${this.activeTool === 'door' ? 'active' : ''} ${this.activeSubmenu === 'door' ? 'menu-open' : ''}" 
        @click=${(e: MouseEvent) => { this.selectTool('door'); this.toggleSubmenu('door', e); }} 
        title="Insérer une porte (D) - Cliquez pour choisir le sens d'ouverture (Droite/Gauche, Intérieur/Extérieur)"
      >
        🚪
        <span class="submenu-indicator">▾</span>
      </button>

      <!-- Outil Fenêtre -->
      <button 
        class="tool-btn ${this.activeTool === 'window' ? 'active' : ''} ${this.activeSubmenu === 'window' ? 'menu-open' : ''}" 
        @click=${(e: MouseEvent) => { this.selectTool('window'); this.toggleSubmenu('window', e); }} 
        title="Insérer une fenêtre - Cliquez pour choisir 1 ouvrant ou 2 battants"
      >
        🪟
        <span class="submenu-indicator">▾</span>
      </button>

      <!-- Outil Baie vitrée / Porte-fenêtre -->
      <button 
        class="tool-btn ${this.activeTool === 'french_window' ? 'active' : ''}" 
        @click=${() => { this.activeSubmenu = 'none'; this.selectTool('french_window'); }} 
        title="Insérer une baie coulissante"
      >
        🪞
      </button>

      <div class="divider"></div>

      <!-- Import de plan de fond & vectorisation -->
      <button 
        class="tool-btn" 
        @click=${() => { this.activeSubmenu = 'none'; this.openImportModal(); }} 
        title="Importer un plan (PNG/JPG/SVG/PDF) ou Coller directement (Cmd+V / Ctrl+V)"
      >
        🖼️
      </button>

      <!-- Étalonnage d'échelle (calque image) -->
      <button 
        class="tool-btn ${this.activeTool === 'calibrate' ? 'active' : ''}" 
        @click=${() => { this.activeSubmenu = 'none'; this.selectTool('calibrate'); }} 
        title="Étalonnage d'échelle : tracer un mur mesuré sur l'image (M)"
      >
        📏
      </button>

      <!-- Mettre à l'échelle le plan (Recalculer toutes les cotes) -->
      <button 
        class="tool-btn ${this.activeTool === 'rescale' ? 'active' : ''}" 
        @click=${() => { this.activeSubmenu = 'none'; this.selectTool('rescale'); }} 
        title="Mettre à l'échelle : mesurer un mur pour recalculer toutes les cotes (S)"
      >
        📐
      </button>

      <!-- ============================================== -->
      <!-- SOUS-MENUS FLYOUT                              -->
      <!-- ============================================== -->

      <!-- Sous-menu Flyout Porte (4 sens d'ouverture) -->
      ${this.activeSubmenu === 'door' ? html`
        <div class="flyout-menu ${this.submenuOnLeft ? 'on-left' : ''}" style="top: ${this.submenuTop}px;" @pointerdown=${(e: Event) => e.stopPropagation()}>
          <div class="flyout-header">
            <span class="flyout-title">
              <span>🚪</span>
              <span>Sens d'ouverture de porte</span>
            </span>
            <button class="flyout-close-btn" @click=${() => this.activeSubmenu = 'none'}>✕</button>
          </div>

          <!-- 1. Droite Intérieure (Poussant Droit) -->
          <div 
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
            ${!this.doorFlipSide && this.doorFlipDirection ? html`<span class="flyout-item-badge">Actif</span>` : null}
          </div>

          <!-- 2. Gauche Intérieure (Poussant Gauche) -->
          <div 
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
            ${!this.doorFlipSide && !this.doorFlipDirection ? html`<span class="flyout-item-badge">Actif</span>` : null}
          </div>

          <!-- 3. Gauche Extérieure (Tirant Gauche) -->
          <div 
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
            ${this.doorFlipSide && !this.doorFlipDirection ? html`<span class="flyout-item-badge">Actif</span>` : null}
          </div>

          <!-- 4. Droite Extérieure (Tirant Droit) -->
          <div 
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
            ${this.doorFlipSide && this.doorFlipDirection ? html`<span class="flyout-item-badge">Actif</span>` : null}
          </div>
        </div>
      ` : null}

      <!-- Sous-menu Flyout Fenêtre (1 ouvrant, 2 battants, baie vitrée) -->
      ${this.activeSubmenu === 'window' ? html`
        <div class="flyout-menu ${this.submenuOnLeft ? 'on-left' : ''}" style="top: ${this.submenuTop}px;" @pointerdown=${(e: Event) => e.stopPropagation()}>
          <div class="flyout-header">
            <span class="flyout-title">
              <span>🪟</span>
              <span>Type de fenêtre</span>
            </span>
            <button class="flyout-close-btn" @click=${() => this.activeSubmenu = 'none'}>✕</button>
          </div>

          <!-- 1. Fenêtre 1 ouvrant -->
          <div 
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
          </div>

          <!-- 2. Fenêtre 2 battants -->
          <div 
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
          </div>

          <!-- 3. Baie vitrée coulissante -->
          <div 
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
          </div>
        </div>
      ` : null}

      <!-- Sous-menu Flyout Mur (Fin, Moyen, Gros) -->
      ${this.activeSubmenu === 'wall' ? html`
        <div class="flyout-menu ${this.submenuOnLeft ? 'on-left' : ''}" style="top: ${this.submenuTop}px;" @pointerdown=${(e: Event) => e.stopPropagation()}>
          <div class="flyout-header">
            <span class="flyout-title">
              <span>🧱</span>
              <span>Épaisseur du mur</span>
            </span>
            <button class="flyout-close-btn" @click=${() => this.activeSubmenu = 'none'}>✕</button>
          </div>

          <!-- 1. Mur Fin (10 cm) -->
          <div 
            class="flyout-item ${this.currentThickness === 0.10 ? 'active' : ''}"
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
          </div>

          <!-- 2. Mur Moyen (20 cm) -->
          <div 
            class="flyout-item ${this.currentThickness === 0.20 ? 'active' : ''}"
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
          </div>

          <!-- 3. Mur Gros (30 cm) -->
          <div 
            class="flyout-item ${this.currentThickness === 0.30 ? 'active' : ''}"
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
          </div>
        </div>
      ` : null}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-toolbar': HomeArchitectToolbar;
  }
}
