import { LitElement, html, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { canvasStyles } from '../styles/canvas.styles';
import { 
  Point, Wall, Opening, OpeningType, Room, ActiveTool, GridConfig, 
  ViewportTransform, HomeArchitectProject, WallSnapResult 
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
  public currentWallThickness: number = 0.20; // 20 cm par défaut

  @property({ type: Number })
  public currentOpeningWidth: number = 0.90; // 90 cm par défaut pour portes

  // État du Viewport (Pan & Zoom)
  @state()
  private viewport: ViewportTransform = { x: 300, y: 300, zoom: 1.0 };

  @state()
  private isPanning: boolean = false;

  private panStart: Point = { x: 0, y: 0 };

  // État de dessin de mur en cours
  @state()
  private drawingWallStart: Point | null = null; // En mètres

  @state()
  private previewPoint: Point | null = null; // Point visuel magnétisé en mètres

  @state()
  private snapInfo: { snappedTo: string; guideAngle?: number } = { snappedTo: 'none' };

  @state()
  private cursorCoords: Point = { x: 0, y: 0 }; // En mètres

  // État d'insertion d'ouvrants (Portes / Fenêtres)
  @state()
  private wallSnap: WallSnapResult | null = null;

  @state()
  private openingFlipSide: boolean = false;

  @state()
  private openingFlipDirection: boolean = false;

  // État d'étalonnage de l'échelle
  @state()
  private calibrateStart: Point | null = null; // En pixels écran

  @state()
  private calibrateCurrent: Point | null = null; // En pixels écran

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

    const newX = mouseX - (mouseX - this.viewport.x) * (newZoom / this.viewport.zoom);
    const newY = mouseY - (mouseY - this.viewport.y) * (newZoom / this.viewport.zoom);

    this.viewport = { x: newX, y: newY, zoom: newZoom };
  }

  private handlePointerDown(e: PointerEvent): void {
    // Panning
    if (e.button === 1 || this.activeTool === 'select' || e.shiftKey) {
      this.isPanning = true;
      this.panStart = { x: e.clientX - this.viewport.x, y: e.clientY - this.viewport.y };
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      return;
    }

    if (e.button !== 0) return;

    const worldPoint = this.screenToWorld(e.clientX, e.clientY);

    // 1. OUTIL MUR
    if (this.activeTool === 'wall') {
      const snapped = SnappingEngine.snapPoint(
        worldPoint,
        this.project.grid,
        this.project.walls,
        this.drawingWallStart || undefined
      );

      if (!this.drawingWallStart) {
        this.drawingWallStart = snapped.point;
      } else {
        const start = this.drawingWallStart;
        const end = snapped.point;
        const dist = SnappingEngine.distance(start, end);

        if (dist >= 0.15) {
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

          this.dispatchProjectChanged();
          this.drawingWallStart = end;
        }
      }
    }

    // 2. OUTIL OUVERTURES (Porte / Fenêtre / Baie)
    else if (this.activeTool === 'door' || this.activeTool === 'window' || this.activeTool === 'french_window') {
      if (this.wallSnap) {
        const opType: OpeningType = 
          this.activeTool === 'window' ? 'window' :
          this.activeTool === 'french_window' ? 'french_window' : 'door';

        const newOpening: Opening = {
          id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          wallId: this.wallSnap.wall.id,
          type: opType,
          offset: SnappingEngine.roundMeters(this.wallSnap.offset),
          width: this.currentOpeningWidth || (opType === 'door' ? 0.90 : 1.20),
          flipSide: this.openingFlipSide,
          flipDirection: this.openingFlipDirection
        };

        this.project = {
          ...this.project,
          openings: [...this.project.openings, newOpening]
        };

        this.dispatchProjectChanged();
      }
    }

    // 3. OUTIL ÉTALONNAGE D'ÉCHELLE
    else if (this.activeTool === 'calibrate') {
      const rect = this.getBoundingClientRect();
      const clickPx: Point = { x: e.clientX - rect.left, y: e.clientY - rect.top };

      if (!this.calibrateStart) {
        this.calibrateStart = clickPx;
        this.calibrateCurrent = clickPx;
      } else {
        // Deuxième clic : déclenche la modale de calibration
        const dx = clickPx.x - this.calibrateStart.x;
        const dy = clickPx.y - this.calibrateStart.y;
        const screenDistPx = Math.sqrt(dx * dx + dy * dy);

        if (screenDistPx >= 10) {
          // Distance en pixels natifs hors zoom
          const rawPixelDist = screenDistPx / this.viewport.zoom;

          this.dispatchEvent(new CustomEvent('request-calibration', {
            detail: {
              pixelDistance: rawPixelDist,
              defaultMeters: SnappingEngine.roundMeters(rawPixelDist / this.project.pixelsPerMeter)
            },
            bubbles: true,
            composed: true
          }));

          this.calibrateStart = null;
          this.calibrateCurrent = null;
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

    // Suivi outil Mur
    if (this.activeTool === 'wall') {
      const snapped = SnappingEngine.snapPoint(
        worldPoint,
        this.project.grid,
        this.project.walls,
        this.drawingWallStart || undefined
      );

      this.previewPoint = snapped.point;
      this.snapInfo = { snappedTo: snapped.snappedTo, guideAngle: snapped.guideAngle };
      this.wallSnap = null;
    } 
    // Suivi outil Ouvertures
    else if (this.activeTool === 'door' || this.activeTool === 'window' || this.activeTool === 'french_window') {
      this.wallSnap = SnappingEngine.snapPointToWall(worldPoint, this.project.walls, 0.8);
      this.previewPoint = null;
    } 
    // Suivi outil Étalonnage
    else if (this.activeTool === 'calibrate' && this.calibrateStart) {
      const rect = this.getBoundingClientRect();
      this.calibrateCurrent = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    } 
    else {
      this.previewPoint = null;
      this.wallSnap = null;
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
      this.drawingWallStart = null;
      this.previewPoint = null;
      this.calibrateStart = null;
      this.calibrateCurrent = null;
      this.wallSnap = null;
      this.requestUpdate();
    } else if (e.key === ' ' || e.key === 'Spacebar') {
      // Espace : bascule le sens d'ouverture de la porte
      if (this.wallSnap) {
        e.preventDefault();
        this.openingFlipSide = !this.openingFlipSide;
        this.requestUpdate();
      }
    } else if (e.key.toLowerCase() === 'f') {
      // F : bascule la direction gauche/droite
      if (this.wallSnap) {
        this.openingFlipDirection = !this.openingFlipDirection;
        this.requestUpdate();
      }
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

  private dispatchProjectChanged() {
    this.dispatchEvent(new CustomEvent('project-changed', {
      detail: { project: this.project },
      bubbles: true,
      composed: true
    }));
  }

  // ==========================================
  // RENDU GÉOMÉTRIQUE
  // ==========================================

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

  // Calque de fond d'image importé
  private renderBackgroundLayer() {
    const bg = this.project.background;
    if (!bg || !bg.imageUrl || !bg.visible) return null;

    const ppm = this.project.pixelsPerMeter * this.viewport.zoom;
    const pos = this.worldToScreen(bg.offset || { x: 0, y: 0 });
    const scale = bg.scale || 1.0;

    return svg`
      <g 
        class="background-image-layer" 
        transform="translate(${pos.x}, ${pos.y}) scale(${this.viewport.zoom * scale})"
        style="opacity: ${bg.opacity};"
      >
        <image 
          href="${bg.imageUrl}" 
          x="0" 
          y="0" 
          width="${bg.widthPx || 1200}" 
          height="${bg.heightPx || 900}" 
        />
      </g>
    `;
  }

  // Calque des Pièces (Surfaces colorées et étiquettes m²)
  private renderRooms() {
    return this.project.rooms.map((room) => {
      if (!room.polygon || room.polygon.length < 3) return null;

      const screenPts = room.polygon.map(p => this.worldToScreen(p));
      const pointsAttr = screenPts.map(p => `${p.x},${p.y}`).join(' ');

      // Calcul du centroïde pour placer l'étiquette
      let cx = 0, cy = 0;
      screenPts.forEach(p => { cx += p.x; cy += p.y; });
      cx /= screenPts.length;
      cy /= screenPts.length;

      return svg`
        <g class="room-group" data-room-id="${room.id}">
          <polygon 
            points="${pointsAttr}" 
            class="room-polygon"
            style="fill: ${room.color || 'rgba(56, 189, 248, 0.12)'};"
          />
          <g class="room-label-group" transform="translate(${cx}, ${cy})">
            <text class="room-label-name" y="-6">${room.name}</text>
            <text class="room-label-area" y="12">${room.areaM2.toFixed(1)} m²</text>
          </g>
        </g>
      `;
    });
  }

  private renderGrid() {
    const ppm = this.project.pixelsPerMeter * this.viewport.zoom;
    const gridMeters = this.project.grid.size || 0.5;
    const stepPx = gridMeters * ppm;

    if (stepPx < 12) return null;

    const majorStepPx = stepPx * 2;

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
          <polygon points="${pointsAttr}" class="wall-rect" />
          <line x1="${sStart.x}" y1="${sStart.y}" x2="${sEnd.x}" y2="${sEnd.y}" class="wall-centerline" />
          
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

  // Rendu des Portes et Fenêtres dans les cloisons
  private renderOpenings() {
    return this.project.openings.map((op) => {
      const wall = this.project.walls.find(w => w.id === op.wallId);
      if (!wall) return null;

      const dx = wall.end.x - wall.start.x;
      const dy = wall.end.y - wall.start.y;
      const wallLen = Math.sqrt(dx * dx + dy * dy);
      if (wallLen === 0) return null;

      const angleRad = Math.atan2(dy, dx);
      const angleDeg = (angleRad * 180) / Math.PI;

      // Position de l'ouverture
      const opX = wall.start.x + (op.offset / wallLen) * dx;
      const opY = wall.start.y + (op.offset / wallLen) * dy;
      const screenPos = this.worldToScreen({ x: opX, y: opY });

      const ppm = this.project.pixelsPerMeter * this.viewport.zoom;
      const wPx = op.width * ppm;
      const thickPx = wall.thickness * ppm;

      return svg`
        <g 
          class="opening-element" 
          transform="translate(${screenPos.x}, ${screenPos.y}) rotate(${angleDeg})"
        >
          <!-- Découpe du mur -->
          <rect 
            x="${-wPx / 2}" 
            y="${-thickPx / 2 - 1}" 
            width="${wPx}" 
            height="${thickPx + 2}" 
            class="wall-cutout"
          />

          <!-- Rendu Porte ou Fenêtre -->
          ${op.type === 'door' ? this.renderDoorSymbol(wPx, thickPx, op.flipSide, op.flipDirection) : null}
          ${op.type === 'window' ? this.renderWindowSymbol(wPx, thickPx) : null}
          ${op.type === 'french_window' ? this.renderFrenchWindowSymbol(wPx, thickPx) : null}
        </g>
      `;
    });
  }

  // Symboles architecturaux
  private renderDoorSymbol(wPx: number, thickPx: number, flipSide: boolean, flipDirection: boolean) {
    const halfW = wPx / 2;
    const signSide = flipSide ? -1 : 1;
    const pivotX = flipDirection ? halfW : -halfW;
    const sweepSign = flipDirection ? -1 : 1;

    return svg`
      <g>
        <!-- Bâti de porte -->
        <rect x="${-halfW}" y="${-thickPx / 2}" width="4" height="${thickPx}" fill="#94a3b8" />
        <rect x="${halfW - 4}" y="${-thickPx / 2}" width="4" height="${thickPx}" fill="#94a3b8" />

        <!-- Vantail ouvert à 90 degrés -->
        <line 
          x1="${pivotX}" 
          y1="0" 
          x2="${pivotX}" 
          y2="${signSide * wPx}" 
          class="opening-door-leaf" 
        />

        <!-- Arc d'ouverture quart-de-cercle -->
        <path 
          d="M ${pivotX + (sweepSign * wPx)} 0 A ${wPx} ${wPx} 0 0 ${signSide > 0 ? (flipDirection ? 0 : 1) : (flipDirection ? 1 : 0)} ${pivotX} ${signSide * wPx}" 
          class="opening-door-arc" 
        />
      </g>
    `;
  }

  private renderWindowSymbol(wPx: number, thickPx: number) {
    const halfW = wPx / 2;
    return svg`
      <g>
        <!-- Cadre extérieur -->
        <rect x="${-halfW}" y="${-thickPx / 2}" width="${wPx}" height="${thickPx}" fill="none" class="opening-window-frame" />
        <!-- Vitrage central -->
        <line x1="${-halfW}" y1="0" x2="${halfW}" y2="0" class="opening-window-glass" />
        <line x1="${-halfW + 4}" y1="${-thickPx / 4}" x2="${halfW - 4}" y2="${-thickPx / 4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
        <line x1="${-halfW + 4}" y1="${thickPx / 4}" x2="${halfW - 4}" y2="${thickPx / 4}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
      </g>
    `;
  }

  private renderFrenchWindowSymbol(wPx: number, thickPx: number) {
    const halfW = wPx / 2;
    return svg`
      <g>
        <rect x="${-halfW}" y="${-thickPx / 2}" width="${wPx}" height="${thickPx}" fill="none" class="opening-window-frame" />
        <!-- Double vantail coulissant -->
        <rect x="${-halfW}" y="${-thickPx / 4}" width="${halfW}" height="3" fill="#38bdf8" />
        <rect x="0" y="${thickPx / 4}" width="${halfW}" height="3" fill="#38bdf8" />
      </g>
    `;
  }

  // Prévisualisation de placement d'ouvrant lors du survol de mur
  private renderOpeningPreview() {
    if (!this.wallSnap) return null;

    const ppm = this.project.pixelsPerMeter * this.viewport.zoom;
    const wPx = (this.currentOpeningWidth || 0.90) * ppm;
    const thickPx = this.wallSnap.wall.thickness * ppm;
    const sPos = this.worldToScreen(this.wallSnap.projectionPoint);
    const angleDeg = (this.wallSnap.angleRad * 180) / Math.PI;

    return svg`
      <g 
        class="opening-preview" 
        transform="translate(${sPos.x}, ${sPos.y}) rotate(${angleDeg})"
      >
        <rect x="${-wPx / 2}" y="${-thickPx / 2}" width="${wPx}" height="${thickPx}" fill="rgba(56, 189, 248, 0.3)" stroke="#38bdf8" stroke-dasharray="4, 2" />
        ${this.activeTool === 'door' ? this.renderDoorSymbol(wPx, thickPx, this.openingFlipSide, this.openingFlipDirection) : null}
        ${this.activeTool === 'window' ? this.renderWindowSymbol(wPx, thickPx) : null}
        ${this.activeTool === 'french_window' ? this.renderFrenchWindowSymbol(wPx, thickPx) : null}
      </g>
    `;
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
        <polygon points="${pointsAttr}" class="preview-wall-rect" />
        <line x1="${sStart.x}" y1="${sStart.y}" x2="${sEnd.x}" y2="${sEnd.y}" class="preview-wall-line" />

        ${this.snapInfo.guideAngle !== undefined ? svg`
          <line x1="${sStart.x}" y1="${sStart.y}" x2="${sEnd.x}" y2="${sEnd.y}" class="angle-guide-line" />
        ` : null}

        <g class="dimension-badge" transform="translate(${mid.x}, ${mid.y - 16})">
          <rect x="-30" y="-11" width="60" height="22" />
          <text>${SnappingEngine.roundMeters(lenMeters).toFixed(2)} m</text>
        </g>
      </g>
    `;
  }

  // Prévisualisation du tracé d'étalonnage
  private renderCalibrationLine() {
    if (!this.calibrateStart || !this.calibrateCurrent) return null;

    const p1 = this.calibrateStart;
    const p2 = this.calibrateCurrent;
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const distPx = Math.sqrt(dx * dx + dy * dy);
    const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };

    return svg`
      <g class="calibration-preview-group">
        <line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" class="calibration-line" />
        <circle cx="${p1.x}" cy="${p1.y}" r="6" class="calibration-endpoint" />
        <circle cx="${p2.x}" cy="${p2.y}" r="6" class="calibration-endpoint" />

        <g class="dimension-badge" transform="translate(${mid.x}, ${mid.y - 18})">
          <rect x="-35" y="-11" width="70" height="22" style="stroke: #f59e0b;" />
          <text style="fill: #f59e0b;">${Math.round(distPx)} px</text>
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

  private getHelpMessage(): string | null {
    if (this.activeTool === 'wall') {
      return this.drawingWallStart ? "Cliquez pour terminer le mur. Échap pour annuler." : "Cliquez pour démarrer un mur.";
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
    return null;
  }

  render() {
    const helpMsg = this.getHelpMessage();

    return html`
      <div 
        class="canvas-container ${this.isPanning ? 'is-panning' : ''}"
        @wheel=${this.handleWheel}
        @pointerdown=${this.handlePointerDown}
        @pointermove=${this.handlePointerMove}
        @pointerup=${this.handlePointerUp}
      >
        <svg class="main-viewport">
          <!-- 1. Calque Image de Fond -->
          ${this.renderBackgroundLayer()}

          <!-- 2. Grille métrique -->
          ${this.renderGrid()}

          <!-- 3. Pièces / Sols -->
          ${this.renderRooms()}

          <!-- 4. Murs -->
          ${this.renderWalls()}

          <!-- 5. Ouvertures (Portes & Fenêtres) -->
          ${this.renderOpenings()}

          <!-- 6. Prévisualisation Ouvertures -->
          ${this.renderOpeningPreview()}

          <!-- 7. Prévisualisation Mur en tracé -->
          ${this.renderPreviewWall()}

          <!-- 8. Ligne d'étalonnage -->
          ${this.renderCalibrationLine()}

          <!-- 9. Indicateur d'accroche magnétique -->
          ${this.renderSnapIndicator()}
        </svg>

        <!-- Message d'aide contextuel en haut -->
        ${helpMsg ? html`<div class="help-hud">${helpMsg}</div>` : null}

        <!-- Coordonnées curseur -->
        <div class="coords-hud">
          X: ${this.cursorCoords.x.toFixed(2)} m | Y: ${this.cursorCoords.y.toFixed(2)} m | Outil: ${this.activeTool.toUpperCase()}
        </div>

        <!-- HUD Contrôles Zoom -->
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
