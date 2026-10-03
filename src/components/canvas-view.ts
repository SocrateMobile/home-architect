import { LitElement, html, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { canvasStyles } from '../styles/canvas.styles';
import { 
  Point, Wall, ActiveTool, GridConfig, ViewportTransform, HomeArchitectProject 
} from '../core/types';
import { SnappingEngine } from '../core/snapping';

@customElement('home-architect-canvas')
export class HomeArchitectCanvas extends LitElement {
  static styles = canvasStyles;

  @property({ type: Object })
  public project: HomeArchitectProject = {
    id: 'default',
    name: 'Plan sans titre',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    pixelsPerMeter: 50, // 50 px = 1 mètre
    grid: {
      size: 0.5, // Pas de 0.5m (50 cm)
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
  public currentWallThickness: number = 0.20; // 20 cm par défaut

  // État du Viewport (Pan & Zoom)
  @state()
  private viewport: ViewportTransform = { x: 300, y: 300, zoom: 1.0 };

  @state()
  private isPanning: boolean = false;

  private panStart: Point = { x: 0, y: 0 };
  private initialPinchDistance: number | null = null;
  private initialPinchZoom: number = 1.0;

  // État de dessin de mur en cours
  @state()
  private drawingWallStart: Point | null = null; // En mètres

  @state()
  private previewPoint: Point | null = null; // Point visuel magnétisé en mètres

  @state()
  private snapInfo: { snappedTo: string; guideAngle?: number } = { snappedTo: 'none' };

  @state()
  private cursorCoords: Point = { x: 0, y: 0 }; // En mètres

  // ==========================================
  // CONVERSIONS DE COORDONNÉES MONDE <-> ÉCRAN
  // ==========================================

  public screenToWorld(screenX: number, screenY: number): Point {
    const rect = this.getBoundingClientRect();
    const relX = screenX - rect.left;
    const relY = screenY - rect.top;

    const ppm = this.project.pixelsPerMeter * this.viewport.zoom;
    return {
      x: (relX - this.viewport.x) / ppm,
      y: (relY - this.viewport.y) / ppm
    };
  }

  public worldToScreen(worldPoint: Point): Point {
    const ppm = this.project.pixelsPerMeter * this.viewport.zoom;
    return {
      x: worldPoint.x * ppm + this.viewport.x,
      y: worldPoint.y * ppm + this.viewport.y
    };
  }

  // ==========================================
  // GESTION DU PAN & ZOOM (SOURIS & TACTILE)
  // ==========================================

  private handleWheel(e: WheelEvent): void {
    e.preventDefault();

    const rect = this.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.89;
    const newZoom = Math.min(Math.max(this.viewport.zoom * zoomFactor, 0.15), 8.0);

    // Zoom centré précisément sur le curseur de la souris
    const newX = mouseX - (mouseX - this.viewport.x) * (newZoom / this.viewport.zoom);
    const newY = mouseY - (mouseY - this.viewport.y) * (newZoom / this.viewport.zoom);

    this.viewport = { x: newX, y: newY, zoom: newZoom };
  }

  private handlePointerDown(e: PointerEvent): void {
    // Clic milieu (molette) ou espace ou outil sélection -> début de translation Pan
    if (e.button === 1 || this.activeTool === 'select' || e.shiftKey) {
      this.isPanning = true;
      this.panStart = { x: e.clientX - this.viewport.x, y: e.clientY - this.viewport.y };
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      return;
    }

    if (e.button !== 0) return; // Uniquement clic gauche pour dessiner

    const worldPoint = this.screenToWorld(e.clientX, e.clientY);
    const snapped = SnappingEngine.snapPoint(
      worldPoint,
      this.project.grid,
      this.project.walls,
      this.drawingWallStart || undefined
    );

    if (this.activeTool === 'wall') {
      if (!this.drawingWallStart) {
        // Premier clic : Ancre le début du mur
        this.drawingWallStart = snapped.point;
      } else {
        // Deuxième clic : Valide le mur
        const start = this.drawingWallStart;
        const end = snapped.point;
        const dist = SnappingEngine.distance(start, end);

        if (dist >= 0.15) { // Empêche la création de micro-murs accidentels
          const newWall: Wall = {
            id: `wall_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            start: { ...start },
            end: { ...end },
            thickness: this.currentWallThickness,
            type: 'standard'
          };

          this.project = {
            ...this.project,
            walls: [...this.project.walls, newWall]
          };

          this.dispatchEvent(new CustomEvent('project-changed', {
            detail: { project: this.project },
            bubbles: true,
            composed: true
          }));

          // Accrochage continu : le point d'arrivée devient le nouveau point de départ
          this.drawingWallStart = end;
        }
      }
    }
  }

  private handlePointerMove(e: PointerEvent): void {
    if (this.isPanning) {
      this.viewport = {
        ...this.viewport,
        x: e.clientX - this.panStart.x,
        y: e.clientY - this.panStart.y
      };
      return;
    }

    const worldPoint = this.screenToWorld(e.clientX, e.clientY);
    this.cursorCoords = {
      x: SnappingEngine.roundMeters(worldPoint.x),
      y: SnappingEngine.roundMeters(worldPoint.y)
    };

    if (this.activeTool === 'wall') {
      const snapped = SnappingEngine.snapPoint(
        worldPoint,
        this.project.grid,
        this.project.walls,
        this.drawingWallStart || undefined
      );

      this.previewPoint = snapped.point;
      this.snapInfo = { snappedTo: snapped.snappedTo, guideAngle: snapped.guideAngle };
    } else {
      this.previewPoint = null;
    }
  }

  private handlePointerUp(e: PointerEvent): void {
    if (this.isPanning) {
      this.isPanning = false;
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    }
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      // Annule le tracé en cours
      this.drawingWallStart = null;
      this.previewPoint = null;
      this.requestUpdate();
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  // ==========================================
  // RENDU GÉOMÉTRIQUE DES MURS & GRILLE
  // ==========================================

  /**
   * Calcule le polygone rectangulaire épais d'un mur à partir de sa ligne centrale
   */
  private computeWallPolygon(start: Point, end: Point, thickness: number): Point[] {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len === 0) return [start, start, end, end];

    const halfThick = thickness / 2;
    const nx = (-dy / len) * halfThick;
    const ny = (dx / len) * halfThick;

    return [
      { x: start.x + nx, y: start.y + ny },
      { x: end.x + nx, y: end.y + ny },
      { x: end.x - nx, y: end.y - ny },
      { x: start.x - nx, y: start.y - ny }
    ];
  }

  private renderGrid() {
    const ppm = this.project.pixelsPerMeter * this.viewport.zoom;
    const gridMeters = this.project.grid.size || 0.5;
    const stepPx = gridMeters * ppm;

    // Masque la micro-grille si le zoom est trop faible pour éviter la saturation
    if (stepPx < 12) return null;

    const majorStepPx = stepPx * 2; // Lignes majeures tous les 1m

    return svg`
      <defs>
        <pattern id="grid-sub" width="${stepPx}" height="${stepPx}" patternUnits="userSpaceOnUse"
          patternTransform="translate(${this.viewport.x % stepPx}, ${this.viewport.y % stepPx})">
          <line x1="0" y1="0" x2="${stepPx}" y2="0" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" />
          <line x1="0" y1="0" x2="0" y2="${stepPx}" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" />
        </pattern>
        <pattern id="grid-major" width="${majorStepPx}" height="${majorStepPx}" patternUnits="userSpaceOnUse"
          patternTransform="translate(${this.viewport.x % majorStepPx}, ${this.viewport.y % majorStepPx})">
          <line x1="0" y1="0" x2="${majorStepPx}" y2="0" stroke="rgba(255,255,255,0.14)" stroke-width="1" />
          <line x1="0" y1="0" x2="0" y2="${majorStepPx}" stroke="rgba(255,255,255,0.14)" stroke-width="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-sub)" />
      <rect width="100%" height="100%" fill="url(#grid-major)" />
    `;
  }

  private renderWalls() {
    return this.project.walls.map((wall) => {
      const p = this.computeWallPolygon(wall.start, wall.end, wall.thickness);
      const sp = p.map(pt => this.worldToScreen(pt));
      const sStart = this.worldToScreen(wall.start);
      const sEnd = this.worldToScreen(wall.end);

      const pointsAttr = sp.map(pt => `${pt.x},${pt.y}`).join(' ');
      const lenMeters = SnappingEngine.distance(wall.start, wall.end);
      const mid = {
        x: (sStart.x + sEnd.x) / 2,
        y: (sStart.y + sEnd.y) / 2
      };

      return svg`
        <g class="wall-element" data-wall-id="${wall.id}">
          <!-- Corps épais du mur -->
          <polygon points="${pointsAttr}" class="wall-rect" />
          
          <!-- Ligne médiane discrète -->
          <line x1="${sStart.x}" y1="${sStart.y}" x2="${sEnd.x}" y2="${sEnd.y}" class="wall-centerline" />
          
          <!-- Étiquette de dimension en mètres -->
          ${lenMeters >= 0.6 ? svg`
            <g class="dimension-badge" transform="translate(${mid.x}, ${mid.y - 14})">
              <rect x="-26" y="-10" width="52" height="20" />
              <text>${SnappingEngine.roundMeters(lenMeters).toFixed(2)} m</text>
            </g>
          ` : null}
        </g>
      `;
    });
  }

  private renderPreviewWall() {
    if (!this.drawingWallStart || !this.previewPoint) return null;

    const p = this.computeWallPolygon(
      this.drawingWallStart,
      this.previewPoint,
      this.currentWallThickness
    );
    const sp = p.map(pt => this.worldToScreen(pt));
    const sStart = this.worldToScreen(this.drawingWallStart);
    const sEnd = this.worldToScreen(this.previewPoint);

    const pointsAttr = sp.map(pt => `${pt.x},${pt.y}`).join(' ');
    const lenMeters = SnappingEngine.distance(this.drawingWallStart, this.previewPoint);
    const mid = {
      x: (sStart.x + sEnd.x) / 2,
      y: (sStart.y + sEnd.y) / 2
    };

    return svg`
      <g class="preview-wall-group">
        <!-- Prévisualisation polygonale épaisse -->
        <polygon points="${pointsAttr}" class="preview-wall-rect" />
        <line x1="${sStart.x}" y1="${sStart.y}" x2="${sEnd.x}" y2="${sEnd.y}" class="preview-wall-line" />

        <!-- Ligne guide angulaire si magnétisme 45°/90° actif -->
        ${this.snapInfo.guideAngle !== undefined ? svg`
          <line x1="${sStart.x}" y1="${sStart.y}" x2="${sEnd.x}" y2="${sEnd.y}" class="angle-guide-line" />
        ` : null}

        <!-- Badge de cote dynamique en temps réel -->
        <g class="dimension-badge" transform="translate(${mid.x}, ${mid.y - 16})">
          <rect x="-30" y="-11" width="60" height="22" />
          <text>${SnappingEngine.roundMeters(lenMeters).toFixed(2)} m</text>
        </g>
      </g>
    `;
  }

  private renderSnapIndicator() {
    if (!this.previewPoint || this.snapInfo.snappedTo === 'none') return null;

    const sPt = this.worldToScreen(this.previewPoint);
    const isVertex = this.snapInfo.snappedTo === 'vertex';

    return svg`
      <g transform="translate(${sPt.x}, ${sPt.y})">
        <circle r="${isVertex ? 7 : 5}" class="snap-indicator" />
        ${isVertex ? svg`<circle r="2" fill="#38bdf8" />` : null}
      </g>
    `;
  }

  // ==========================================
  // COMMANDES HUD ZOOM & CENTRAGE
  // ==========================================

  private zoomIn(): void {
    this.viewport = { ...this.viewport, zoom: Math.min(this.viewport.zoom * 1.25, 8.0) };
  }

  private zoomOut(): void {
    this.viewport = { ...this.viewport, zoom: Math.max(this.viewport.zoom / 1.25, 0.15) };
  }

  private resetView(): void {
    this.viewport = { x: 300, y: 300, zoom: 1.0 };
  }

  render() {
    return html`
      <div 
        class="canvas-container ${this.isPanning ? 'is-panning' : ''}"
        @wheel=${this.handleWheel}
        @pointerdown=${this.handlePointerDown}
        @pointermove=${this.handlePointerMove}
        @pointerup=${this.handlePointerUp}
      >
        <svg class="main-viewport">
          <!-- Grille vectorielle dynamique en mètres -->
          ${this.renderGrid()}

          <!-- Calque des murs commités -->
          ${this.renderWalls()}

          <!-- Calque de prévisualisation du mur en tracé -->
          ${this.renderPreviewWall()}

          <!-- Indicateur magnétique visuel -->
          ${this.renderSnapIndicator()}
        </svg>

        <!-- Affichage des coordonnées curseur -->
        <div class="coords-hud">
          X: ${this.cursorCoords.x.toFixed(2)} m | Y: ${this.cursorCoords.y.toFixed(2)} m | Outil: ${this.activeTool.toUpperCase()}
        </div>

        <!-- HUD Contrôles Zoom & Réinitialisation -->
        <div class="canvas-hud">
          <button class="hud-btn" @click=${this.zoomOut} title="Zoom Arrière">−</button>
          <div class="hud-zoom-label">${Math.round(this.viewport.zoom * 100)}%</div>
          <button class="hud-btn" @click=${this.zoomIn} title="Zoom Avant">+</button>
          <button class="hud-btn" @click=${this.resetView} title="Recentrer">⌖</button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-canvas': HomeArchitectCanvas;
  }
}
