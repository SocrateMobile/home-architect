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
  `;

  @property({ type: String })
  public activeTool: ActiveTool = 'wall';

  @property({ type: Boolean })
  public canUndo: boolean = false;

  @property({ type: Boolean })
  public canRedo: boolean = false;

  @state()
  private position: { x: number; y: number } = { x: 20, y: 20 };

  @state()
  private isDragging: boolean = false;

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
  }

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
        @click=${() => this.selectTool('select')} 
        title="Sélectionner & Déplacer (V)"
      >
        👆
      </button>

      <!-- Outil Mur -->
      <button 
        class="tool-btn ${this.activeTool === 'wall' ? 'active' : ''}" 
        @click=${() => this.selectTool('wall')} 
        title="Tracer un mur (W)"
      >
        🧱
      </button>

      <div class="divider"></div>

      <!-- Outil Porte -->
      <button 
        class="tool-btn ${this.activeTool === 'door' ? 'active' : ''}" 
        @click=${() => this.selectTool('door')} 
        title="Insérer une porte (D)"
      >
        🚪
      </button>

      <!-- Outil Fenêtre -->
      <button 
        class="tool-btn ${this.activeTool === 'window' ? 'active' : ''}" 
        @click=${() => this.selectTool('window')} 
        title="Insérer une fenêtre"
      >
        🪟
      </button>

      <!-- Outil Baie vitrée / Porte-fenêtre -->
      <button 
        class="tool-btn ${this.activeTool === 'french_window' ? 'active' : ''}" 
        @click=${() => this.selectTool('french_window')} 
        title="Insérer une baie coulissante"
      >
        🪞
      </button>

      <div class="divider"></div>

      <!-- Import de plan de fond & vectorisation -->
      <button 
        class="tool-btn" 
        @click=${this.openImportModal} 
        title="Importer un plan (PNG/JPG/SVG/PDF) ou Coller directement (Cmd+V / Ctrl+V)"
      >
        🖼️
      </button>

      <!-- Étalonnage d'échelle (calque image) -->
      <button 
        class="tool-btn ${this.activeTool === 'calibrate' ? 'active' : ''}" 
        @click=${() => this.selectTool('calibrate')} 
        title="Étalonnage d'échelle : tracer un mur mesuré sur l'image (M)"
      >
        📏
      </button>

      <!-- Mettre à l'échelle le plan (Recalculer toutes les cotes) -->
      <button 
        class="tool-btn ${this.activeTool === 'rescale' ? 'active' : ''}" 
        @click=${() => this.selectTool('rescale')} 
        title="Mettre à l'échelle : mesurer un mur pour recalculer toutes les cotes (S)"
      >
        📐
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-toolbar': HomeArchitectToolbar;
  }
}
