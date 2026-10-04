import { LitElement, html, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { canvasStyles } from '../styles/canvas.styles';
import { 
  Point, Wall, Opening, OpeningType, Room, ActiveTool, GridConfig, 
  ViewportTransform, HomeArchitectProject, WallSnapResult, EntityBinding, SelectedElements 
} from '../core/types';
import { SnappingEngine } from '../core/snapping';
import { PolygonUtils } from '../core/polygon';

@customElement('home-architect-canvas')
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

  @property({ type: Boolean })
  public is3DMode: boolean = false;

  @property({ type: Object })
  public selectedElements: SelectedElements = {
    wallIds: [],
    openingIds: [],
    roomIds: [],
    bindingIds: []
  };

  @state()
  private isMarqueeSelecting: boolean = false;

  @state()
  private marqueeStart: Point | null = null;

  @state()
  private marqueeCurrent: Point | null = null;

  // État du Viewport (Pan & Zoom)
  @state()
  private viewport: ViewportTransform = { x: 300, y: 300, zoom: 1.0 };

  @state()
  private isPanning: boolean = false;

  private panStart: Point = { x: 0, y: 0 };

  // État de dessin de mur en cours
  @state()
  private drawingWallStart: Point | null = null;

  @state()
  private previewPoint: Point | null = null;

  @state()
  private snapInfo: { snappedTo: string; guideAngle?: number } = { snappedTo: 'none' };

  @state()
  private cursorCoords: Point = { x: 0, y: 0 };

  // État d'insertion d'ouvrants
  @state()
  private wallSnap: WallSnapResult | null = null;

  @state()
  private openingFlipSide: boolean = false;

  @state()
  private openingFlipDirection: boolean = false;

  // État d'étalonnage calque image
  @state()
  private calibrateStart: Point | null = null;

  @state()
  private calibrateCurrent: Point | null = null;

  // État de mise à l'échelle du plan (Recalcul des cotes)
  @state()
  private rescaleStart: Point | null = null;

  @state()
  private rescaleCurrent: Point | null = null;

  private _boundKeyDown: any = null;

  // ==========================================
  // CONVERSIONS DE COORDONNÉES
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
  // GESTION DU PAN & ZOOM
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
    if (e.button === 1) {
      this.isPanning = true;
      this.panStart = { x: e.clientX - this.viewport.x, y: e.clientY - this.viewport.y };
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      return;
    }

    if (e.button !== 0) return;

    if (this.activeTool === 'select') {
      if (e.shiftKey) {
        // Shift+Click sur fond : sélection par rectangle (Marquee)
        const worldPt = this.screenToWorld(e.clientX, e.clientY);
        this.isMarqueeSelecting = true;
        this.marqueeStart = worldPt;
        this.marqueeCurrent = worldPt;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        return;
      }

      // Clic sur fond sans Shift : désélectionne et commence le Pan
      this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] };
      this.dispatchSelectionChanged();

      this.isPanning = true;
      this.panStart = { x: e.clientX - this.viewport.x, y: e.clientY - this.viewport.y };
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      return;
    }

    if (e.shiftKey) {
      this.isPanning = true;
      this.panStart = { x: e.clientX - this.viewport.x, y: e.clientY - this.viewport.y };
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      return;
    }

    const worldPoint = this.screenToWorld(e.clientX, e.clientY);

    // 1. Outil Mur
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

    // 2. Outil Ouvertures
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

    // 3. Outil Étalonnage
    else if (this.activeTool === 'calibrate') {
      const rect = this.getBoundingClientRect();
      const clickPx: Point = { x: e.clientX - rect.left, y: e.clientY - rect.top };

      if (!this.calibrateStart) {
        this.calibrateStart = clickPx;
        this.calibrateCurrent = clickPx;
      } else {
        const dx = clickPx.x - this.calibrateStart.x;
        const dy = clickPx.y - this.calibrateStart.y;
        const screenDistPx = Math.sqrt(dx * dx + dy * dy);

        if (screenDistPx >= 10) {
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

    // 4. Outil Mettre à l'échelle le plan (Recalcul de toutes les cotes)
    else if (this.activeTool === 'rescale') {
      const worldPoint = this.screenToWorld(e.clientX, e.clientY);
      let snapped = SnappingEngine.snapPoint(
        worldPoint,
        this.project.grid,
        this.project.walls,
        this.rescaleStart || undefined
      );

      // Si pas de vertex direct mais qu'on clique sur un mur, s'accrocher à la projection du mur
      if (snapped.snappedTo === 'none' && this.project.walls.length > 0) {
        const wallSnap = SnappingEngine.snapPointToWall(worldPoint, this.project.walls, 0.6);
        if (wallSnap) {
          snapped = { point: wallSnap.projectionPoint, snappedTo: 'vertex' };
        }
      }

      if (!this.rescaleStart) {
        this.rescaleStart = snapped.point;
        this.rescaleCurrent = snapped.point;
      } else {
        const p1 = this.rescaleStart;
        const p2 = snapped.point;
        const dist = SnappingEngine.distance(p1, p2);

        if (dist >= 0.05) {
          this.dispatchEvent(new CustomEvent('request-rescale', {
            detail: {
              measuredMeters: SnappingEngine.roundMeters(dist)
            },
            bubbles: true,
            composed: true
          }));

          this.rescaleStart = null;
          this.rescaleCurrent = null;
          this.previewPoint = null;
        }
      }
    }
  }

  private handlePointerMove(e: PointerEvent): void {
    if (this.isMarqueeSelecting && this.marqueeStart) {
      this.marqueeCurrent = this.screenToWorld(e.clientX, e.clientY);
      this.requestUpdate();
      return;
    }

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
      this.wallSnap = null;
    } 
    else if (this.activeTool === 'door' || this.activeTool === 'window' || this.activeTool === 'french_window') {
      this.wallSnap = SnappingEngine.snapPointToWall(worldPoint, this.project.walls, 0.8);
      this.previewPoint = null;
    } 
    else if (this.activeTool === 'calibrate' && this.calibrateStart) {
      const rect = this.getBoundingClientRect();
      this.calibrateCurrent = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    } 
    else if (this.activeTool === 'rescale') {
      let snapped = SnappingEngine.snapPoint(
        worldPoint,
        this.project.grid,
        this.project.walls,
        this.rescaleStart || undefined
      );

      if (snapped.snappedTo === 'none' && this.project.walls.length > 0) {
        const wallSnap = SnappingEngine.snapPointToWall(worldPoint, this.project.walls, 0.6);
        if (wallSnap) {
          snapped = { point: wallSnap.projectionPoint, snappedTo: 'vertex' };
        }
      }

      this.previewPoint = snapped.point;
      this.snapInfo = { snappedTo: snapped.snappedTo, guideAngle: snapped.guideAngle };
      this.wallSnap = null;

      if (this.rescaleStart) {
        this.rescaleCurrent = snapped.point;
      }
    } 
    else {
      this.previewPoint = null;
      this.wallSnap = null;
    }
  }

  private handlePointerUp(e: PointerEvent): void {
    if (this.isMarqueeSelecting && this.marqueeStart && this.marqueeCurrent) {
      const minX = Math.min(this.marqueeStart.x, this.marqueeCurrent.x);
      const maxX = Math.max(this.marqueeStart.x, this.marqueeCurrent.x);
      const minY = Math.min(this.marqueeStart.y, this.marqueeCurrent.y);
      const maxY = Math.max(this.marqueeStart.y, this.marqueeCurrent.y);

      if (maxX - minX > 0.05 || maxY - minY > 0.05) {
        const foundWalls = this.project.walls.filter(w => {
          const midX = (w.start.x + w.end.x) / 2;
          const midY = (w.start.y + w.end.y) / 2;
          return midX >= minX && midX <= maxX && midY >= minY && midY <= maxY;
        }).map(w => w.id);

        const foundOpenings = this.project.openings.filter(op => {
          const wall = this.project.walls.find(w => w.id === op.wallId);
          if (!wall) return false;
          const dx = wall.end.x - wall.start.x;
          const dy = wall.end.y - wall.start.y;
          const l = Math.sqrt(dx * dx + dy * dy);
          if (l === 0) return false;
          const opX = wall.start.x + (op.offset / l) * dx;
          const opY = wall.start.y + (op.offset / l) * dy;
          return opX >= minX && opX <= maxX && opY >= minY && opY <= maxY;
        }).map(op => op.id);

        const foundRooms = this.project.rooms.filter(r => {
          if (!r.polygon || r.polygon.length < 3) return false;
          const c = PolygonUtils.calculateCentroid(r.polygon);
          return c.x >= minX && c.x <= maxX && c.y >= minY && c.y <= maxY;
        }).map(r => r.id);

        const foundBindings = this.project.bindings.filter(b => {
          return b.position.x >= minX && b.position.x <= maxX && b.position.y >= minY && b.position.y <= maxY;
        }).map(b => b.id);

        this.selectedElements = {
          wallIds: Array.from(new Set([...this.selectedElements.wallIds, ...foundWalls])),
          openingIds: Array.from(new Set([...this.selectedElements.openingIds, ...foundOpenings])),
          roomIds: Array.from(new Set([...this.selectedElements.roomIds, ...foundRooms])),
          bindingIds: Array.from(new Set([...this.selectedElements.bindingIds, ...foundBindings]))
        };
        this.dispatchSelectionChanged();
      }

      this.isMarqueeSelecting = false;
      this.marqueeStart = null;
      this.marqueeCurrent = null;
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      return;
    }

    if (this.isPanning) {
      this.isPanning = false;
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    }
  }

  // ==========================================
  // DRAG & DROP ENTITÉS HOME ASSISTANT
  // ==========================================

  private handleDragOver(e: DragEvent): void {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
    }
  }

  private handleDrop(e: DragEvent): void {
    e.preventDefault();

    // 1. Dépose d'un fichier image (Glisser-Déposer depuis le bureau ou le Finder)
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (loadEvt) => {
          const dataUrl = loadEvt.target?.result as string;
          this.dispatchEvent(new CustomEvent('background-image-loaded', {
            detail: { dataUrl },
            bubbles: true,
            composed: true
          }));
        };
        reader.readAsDataURL(file);
        return;
      }
    }

    // 2. Dépose d'une entité Home Assistant depuis le tiroir
    const rawData = e.dataTransfer?.getData('application/json');
    if (!rawData) return;

    try {
      const { entityId, domain, name, icon } = JSON.parse(rawData);
      const worldPoint = this.screenToWorld(e.clientX, e.clientY);

      // Détection automatique de la pièce contenant le point de dépose
      const matchingRoom = PolygonUtils.findRoomContainingPoint(worldPoint, this.project.rooms);

      const newBinding: EntityBinding = {
        id: `bind_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        entityId,
        position: {
          x: SnappingEngine.roundMeters(worldPoint.x),
          y: SnappingEngine.roundMeters(worldPoint.y)
        },
        roomId: matchingRoom?.id,
        icon,
        customName: name,
        tapAction: 'toggle'
      };

      this.project = {
        ...this.project,
        bindings: [...this.project.bindings, newBinding]
      };

      this.dispatchProjectChanged();
    } catch (err) {
      console.error('Erreur lors de la liaison entité HA:', err);
    }
  }

  private dispatchSelectionChanged() {
    this.dispatchEvent(new CustomEvent('selection-changed', {
      detail: { selectedElements: this.selectedElements },
      bubbles: true,
      composed: true
    }));
    this.requestUpdate();
  }

  private handleWallClick(e: MouseEvent, wall: Wall) {
    if (this.activeTool !== 'select') return;
    e.stopPropagation();
    const isMulti = e.shiftKey || e.ctrlKey || e.metaKey;
    const exists = this.selectedElements.wallIds.includes(wall.id);

    if (isMulti) {
      const newWallIds = exists
        ? this.selectedElements.wallIds.filter(id => id !== wall.id)
        : [...this.selectedElements.wallIds, wall.id];
      this.selectedElements = { ...this.selectedElements, wallIds: newWallIds };
    } else {
      this.selectedElements = { wallIds: [wall.id], openingIds: [], roomIds: [], bindingIds: [] };
    }
    this.dispatchSelectionChanged();
  }

  private handleOpeningClick(e: MouseEvent, op: Opening) {
    if (this.activeTool !== 'select') return;
    e.stopPropagation();
    const isMulti = e.shiftKey || e.ctrlKey || e.metaKey;
    const exists = this.selectedElements.openingIds.includes(op.id);

    if (isMulti) {
      const newOpIds = exists
        ? this.selectedElements.openingIds.filter(id => id !== op.id)
        : [...this.selectedElements.openingIds, op.id];
      this.selectedElements = { ...this.selectedElements, openingIds: newOpIds };
    } else {
      this.selectedElements = { wallIds: [], openingIds: [op.id], roomIds: [], bindingIds: [] };
    }
    this.dispatchSelectionChanged();
  }

  private renderMarqueeBox() {
    if (!this.isMarqueeSelecting || !this.marqueeStart || !this.marqueeCurrent) return null;
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

  private handleEntityClick(binding: EntityBinding, e: Event): void {
    e.stopPropagation();

    if (this.activeTool === 'select') {
      const me = e as MouseEvent;
      const isMulti = me.shiftKey || me.ctrlKey || me.metaKey;
      const exists = this.selectedElements.bindingIds.includes(binding.id);
      if (isMulti) {
        const newBindingIds = exists
          ? this.selectedElements.bindingIds.filter(id => id !== binding.id)
          : [...this.selectedElements.bindingIds, binding.id];
        this.selectedElements = { ...this.selectedElements, bindingIds: newBindingIds };
      } else {
        this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [binding.id] };
      }
      this.dispatchSelectionChanged();
      return;
    }

    // Interaction 1 : Toggle via service HA
    if (this.hass && this.hass.callService) {
      const domain = binding.entityId.split('.')[0];
      const service = domain === 'light' || domain === 'switch' ? 'toggle' : 'toggle';
      this.hass.callService(domain, service, { entity_id: binding.entityId })
        .catch(() => {
          // Fallback générique homeassistant.toggle
          this.hass.callService('homeassistant', 'toggle', { entity_id: binding.entityId });
        });
    } else {
      console.log(`[Demo Standalone] Toggle entité: ${binding.entityId}`);
    }
  }

  private handleEntityDblClick(binding: EntityBinding, e: Event): void {
    e.stopPropagation();
    // Interaction 2 : More-Info modal HA
    this.dispatchEvent(new CustomEvent('hass-more-info', {
      detail: { entityId: binding.entityId },
      bubbles: true,
      composed: true
    }));
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      this.drawingWallStart = null;
      this.previewPoint = null;
      this.calibrateStart = null;
      this.calibrateCurrent = null;
      this.rescaleStart = null;
      this.rescaleCurrent = null;
      this.wallSnap = null;
      this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] };
      this.dispatchSelectionChanged();
      this.requestUpdate();
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      const total = this.selectedElements.wallIds.length + 
                    this.selectedElements.openingIds.length + 
                    this.selectedElements.roomIds.length + 
                    this.selectedElements.bindingIds.length;
      if (total > 0) {
        e.preventDefault();
        this.dispatchEvent(new CustomEvent('request-delete-selected', {
          bubbles: true,
          composed: true
        }));
      }
    } else if (e.key === ' ' || e.key === 'Spacebar') {
      if (this.wallSnap) {
        e.preventDefault();
        this.openingFlipSide = !this.openingFlipSide;
        this.requestUpdate();
      }
    } else if (e.key.toLowerCase() === 'f') {
      if (this.wallSnap) {
        this.openingFlipDirection = !this.openingFlipDirection;
        this.requestUpdate();
      }
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._boundKeyDown = this.handleKeyDown.bind(this);
    window.addEventListener('keydown', this._boundKeyDown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._boundKeyDown) {
      window.removeEventListener('keydown', this._boundKeyDown);
    }
  }

  private dispatchProjectChanged() {
    this.dispatchEvent(new CustomEvent('project-changed', {
      detail: { project: this.project },
      bubbles: true,
      composed: true
    }));
  }

  // ==========================================
  // RENDU GÉOMÉTRIQUE & 3D
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

  private renderBackgroundLayer() {
    const bg = this.project.background;
    if (!bg || !bg.imageUrl || !bg.visible) return null;

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

  private pointToSegmentDistance(p: Point, a: Point, b: Point): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const l2 = dx * dx + dy * dy;
    if (l2 === 0) return SnappingEngine.distance(p, a);
    let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2;
    t = Math.max(0, Math.min(1, t));
    const proj = { x: a.x + t * dx, y: a.y + t * dy };
    return SnappingEngine.distance(p, proj);
  }

  private getWallHeight(wall: Wall): number {
    const defaultH = this.project.defaultCeilingHeight || 2.50;
    const mid = {
      x: (wall.start.x + wall.end.x) / 2,
      y: (wall.start.y + wall.end.y) / 2
    };

    const adjacentRooms = (this.project.rooms || []).filter(room => {
      if (!room.polygon || room.polygon.length < 3) return false;
      if (PolygonUtils.isPointInPolygon(mid, room.polygon)) return true;
      for (let i = 0; i < room.polygon.length; i++) {
        const pA = room.polygon[i];
        const pB = room.polygon[(i + 1) % room.polygon.length];
        if (this.pointToSegmentDistance(mid, pA, pB) <= (wall.thickness / 2 + 0.35)) {
          return true;
        }
      }
      return false;
    });

    if (adjacentRooms.length > 0) {
      const roomHeights = adjacentRooms.map(r => r.height || defaultH);
      return Math.max(...roomHeights, wall.height || 0);
    }

    return wall.height || defaultH;
  }

  private handleRoomClick(e: MouseEvent, room: Room) {
    if (this.drawingWallStart || this.calibrateStart || this.rescaleStart) {
      return;
    }
    e.stopPropagation();

    if (this.activeTool === 'select') {
      const isMulti = e.shiftKey || e.ctrlKey || e.metaKey;
      const exists = this.selectedElements.roomIds.includes(room.id);
      if (isMulti) {
        const newRoomIds = exists
          ? this.selectedElements.roomIds.filter(id => id !== room.id)
          : [...this.selectedElements.roomIds, room.id];
        this.selectedElements = { ...this.selectedElements, roomIds: newRoomIds };
      } else {
        this.selectedElements = { wallIds: [], openingIds: [], roomIds: [room.id], bindingIds: [] };
      }
      this.dispatchSelectionChanged();
      return;
    }

    this.dispatchEvent(new CustomEvent('room-selected', {
      detail: { room },
      bubbles: true,
      composed: true
    }));
  }

  private handleRoomDblClick(e: MouseEvent, room: Room) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('room-selected', {
      detail: { room },
      bubbles: true,
      composed: true
    }));
  }

  // Rendu des Pièces avec détection d'illumination si lumière allumée
  private renderRooms() {
    return this.project.rooms.map((room) => {
      if (!room.polygon || room.polygon.length < 3) return null;

      const screenPts = room.polygon.map(p => this.worldToScreen(p));
      const pointsAttr = screenPts.map(p => `${p.x},${p.y}`).join(' ');

      // Vérifie si une lumière liée à cette pièce est allumée
      const isRoomIlluminated = this.project.bindings
        .filter(b => b.roomId === room.id && b.entityId.startsWith('light.'))
        .some(b => {
          const state = this.hass?.states?.[b.entityId]?.state;
          return state === 'on';
        });

      const centroid = PolygonUtils.calculateCentroid(screenPts);
      const roomH = room.height || this.project.defaultCeilingHeight || 2.50;
      const roomVolume = (room.areaM2 * roomH).toFixed(1);
      const isRoomSelected = this.selectedElements?.roomIds?.includes(room.id);

      return svg`
        <g 
          class="room-group ${isRoomSelected ? 'selected' : ''}" 
          data-room-id="${room.id}" 
          @click=${(e: MouseEvent) => this.handleRoomClick(e, room)}
          @dblclick=${(e: MouseEvent) => this.handleRoomDblClick(e, room)}
        >
          <polygon 
            points="${pointsAttr}" 
            class="room-polygon ${isRoomIlluminated ? 'illuminated' : ''}"
            style="fill: ${room.color || 'rgba(56, 189, 248, 0.12)'}; cursor: pointer;"
          />
          <g class="room-label-group" transform="translate(${centroid.x}, ${centroid.y})">
            <text class="room-label-name" y="${this.is3DMode ? -14 : -6}">${room.name}</text>
            <text class="room-label-area" y="${this.is3DMode ? 4 : 12}">${room.areaM2.toFixed(1)} m²</text>
            ${this.is3DMode ? svg`
              <text class="room-label-height" y="20">H: ${roomH.toFixed(2)}m · ${roomVolume} m³</text>
            ` : null}
          </g>
        </g>
      `;
    });
  }

  private renderGrid() {
    if (this.is3DMode) return null; // Grille épurée en 3D

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
    const ppm = this.project.pixelsPerMeter * this.viewport.zoom;

    return this.project.walls.map((wall) => {
      const isWallSelected = this.selectedElements?.wallIds?.includes(wall.id);
      const wallHeight = this.getWallHeight(wall);
      const wallExtrusionH = this.is3DMode ? wallHeight * ppm * 0.55 : 0; // Hauteur d'extrusion 3D métrique
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

      if (this.is3DMode) {
        // Rendu 3D avec parois verticales et toit de mur
        const spTop = sp.map(pt => ({ x: pt.x, y: pt.y - wallExtrusionH }));
        const pointsTopAttr = spTop.map(pt => `${pt.x},${pt.y}`).join(' ');

        return svg`
          <g 
            class="wall-element-3d ${isWallSelected ? 'selected' : ''}" 
            data-wall-id="${wall.id}"
            @click=${(e: MouseEvent) => this.handleWallClick(e, wall)}
          >
            <!-- Paroi latérale ombrée 1 -->
            <polygon points="${sp[0].x},${sp[0].y} ${sp[1].x},${sp[1].y} ${spTop[1].x},${spTop[1].y} ${spTop[0].x},${spTop[0].y}" class="wall-3d-side-shaded" />
            <!-- Paroi latérale ombrée 2 -->
            <polygon points="${sp[1].x},${sp[1].y} ${sp[2].x},${sp[2].y} ${spTop[2].x},${spTop[2].y} ${spTop[1].x},${spTop[1].y}" class="wall-3d-side-light" />
            <!-- Chapeau supérieur du mur -->
            <polygon points="${pointsTopAttr}" class="wall-3d-top" />
          </g>
        `;
      }

      // Rendu 2D classique
      return svg`
        <g 
          class="wall-element ${isWallSelected ? 'selected' : ''}" 
          data-wall-id="${wall.id}"
          @click=${(e: MouseEvent) => this.handleWallClick(e, wall)}
        >
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

  private renderOpenings() {
    return this.project.openings.map((op) => {
      const isOpSelected = this.selectedElements?.openingIds?.includes(op.id);
      const wall = this.project.walls.find(w => w.id === op.wallId);
      if (!wall) return null;

      const dx = wall.end.x - wall.start.x;
      const dy = wall.end.y - wall.start.y;
      const wallLen = Math.sqrt(dx * dx + dy * dy);
      if (wallLen === 0) return null;

      const angleRad = Math.atan2(dy, dx);
      const angleDeg = (angleRad * 180) / Math.PI;

      const opX = wall.start.x + (op.offset / wallLen) * dx;
      const opY = wall.start.y + (op.offset / wallLen) * dy;
      const screenPos = this.worldToScreen({ x: opX, y: opY });

      const ppm = this.project.pixelsPerMeter * this.viewport.zoom;
      const wPx = op.width * ppm;
      const thickPx = wall.thickness * ppm;

      return svg`
        <g 
          class="opening-element ${isOpSelected ? 'selected' : ''}" 
          transform="translate(${screenPos.x}, ${screenPos.y}) rotate(${angleDeg})"
          style="cursor: pointer;"
          @click=${(e: MouseEvent) => this.handleOpeningClick(e, op)}
        >
          <rect 
            x="${-wPx / 2}" 
            y="${-thickPx / 2 - 1}" 
            width="${wPx}" 
            height="${thickPx + 2}" 
            class="wall-cutout"
          />

          ${op.type === 'door' ? this.renderDoorSymbol(wPx, thickPx, op.flipSide, op.flipDirection) : null}
          ${op.type === 'window' ? this.renderWindowSymbol(wPx, thickPx) : null}
          ${op.type === 'french_window' ? this.renderFrenchWindowSymbol(wPx, thickPx) : null}
        </g>
      `;
    });
  }

  private renderDoorSymbol(wPx: number, thickPx: number, flipSide: boolean, flipDirection: boolean) {
    const halfW = wPx / 2;
    const signSide = flipSide ? -1 : 1;
    const pivotX = flipDirection ? halfW : -halfW;
    const sweepSign = flipDirection ? -1 : 1;

    return svg`
      <g>
        <rect x="${-halfW}" y="${-thickPx / 2}" width="4" height="${thickPx}" fill="#94a3b8" />
        <rect x="${halfW - 4}" y="${-thickPx / 2}" width="4" height="${thickPx}" fill="#94a3b8" />
        <line 
          x1="${pivotX}" 
          y1="0" 
          x2="${pivotX}" 
          y2="${signSide * wPx}" 
          class="opening-door-leaf" 
        />
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
        <rect x="${-halfW}" y="${-thickPx / 2}" width="${wPx}" height="${thickPx}" fill="none" class="opening-window-frame" />
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
        <rect x="${-halfW}" y="${-thickPx / 4}" width="${halfW}" height="3" fill="#38bdf8" />
        <rect x="0" y="${thickPx / 4}" width="${halfW}" height="3" fill="#38bdf8" />
      </g>
    `;
  }

  // ==========================================
  // RENDU DES PINS D'ENTITÉS HOME ASSISTANT
  // ==========================================

  private renderEntityBindings() {
    return this.project.bindings.map((binding) => {
      const sPos = this.worldToScreen(binding.position);
      const entityState = this.hass?.states?.[binding.entityId];
      const stateStr = entityState?.state || 'off';
      const isLightOn = binding.entityId.startsWith('light.') && stateStr === 'on';
      const isRadarActive = binding.entityId.startsWith('binary_sensor.') && (stateStr === 'on' || stateStr === 'detected');
      const isTempSensor = binding.entityId.startsWith('sensor.') || binding.entityId.startsWith('climate.');
      const unit = entityState?.attributes?.unit_of_measurement || (isTempSensor ? '°' : '');
      const isBindingSelected = this.selectedElements?.bindingIds?.includes(binding.id);

      return svg`
        <g 
          class="entity-pin ${isBindingSelected ? 'selected' : ''} ${isLightOn ? 'active-light' : ''} ${isRadarActive ? 'active-radar' : ''}"
          transform="translate(${sPos.x}, ${sPos.y})"
          @click=${(e: Event) => this.handleEntityClick(binding, e)}
          @dblclick=${(e: Event) => this.handleEntityDblClick(binding, e)}
          title="${binding.customName || binding.entityId} : ${stateStr} (Clic pour basculer)"
        >
          <!-- Onde radar animée si mouvement détecté -->
          ${isRadarActive ? svg`<circle cx="0" cy="0" r="16" class="radar-pulse-ring" />` : null}

          <!-- Pastille de fond -->
          <circle cx="0" cy="0" r="16" class="entity-pin-bg" />

          <!-- Pictogramme -->
          <text x="0" y="0" class="entity-pin-icon">
            ${binding.icon || '⚡'}
          </text>

          <!-- Étiquette Nom -->
          <text x="0" y="27" class="entity-pin-label">
            ${binding.customName || binding.entityId.split('.')[1]}
          </text>

          <!-- Badge Valeur (Thermostat / Capteur) -->
          ${isTempSensor && stateStr !== 'unknown' ? svg`
            <g class="entity-pin-value-badge" transform="translate(14, -14)">
              <rect x="-14" y="-8" width="28" height="16" />
              <text>${stateStr}${unit}</text>
            </g>
          ` : null}
        </g>
      `;
    });
  }

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

  private renderRescaleLine() {
    if (!this.rescaleStart || !this.rescaleCurrent) return null;

    const sStart = this.worldToScreen(this.rescaleStart);
    const sEnd = this.worldToScreen(this.rescaleCurrent);
    const distMeters = SnappingEngine.distance(this.rescaleStart, this.rescaleCurrent);
    const mid = {
      x: (sStart.x + sEnd.x) / 2,
      y: (sStart.y + sEnd.y) / 2
    };

    return svg`
      <g class="rescale-preview-group">
        <line 
          x1="${sStart.x}" y1="${sStart.y}" 
          x2="${sEnd.x}" y2="${sEnd.y}" 
          stroke="#38bdf8" 
          stroke-width="3" 
          stroke-dasharray="6, 4" 
        />
        <circle cx="${sStart.x}" cy="${sStart.y}" r="6" fill="#38bdf8" stroke="#ffffff" stroke-width="2" />
        <circle cx="${sEnd.x}" cy="${sEnd.y}" r="6" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />

        <g class="dimension-badge" transform="translate(${mid.x}, ${mid.y - 18})">
          <rect x="-48" y="-13" width="96" height="26" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.8" />
          <text fill="#38bdf8" font-size="12px" font-weight="800" text-anchor="middle" dy="5">
            📐 ${SnappingEngine.roundMeters(distMeters).toFixed(2)} m
          </text>
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

  private zoomIn(): void {
    this.viewport = { ...this.viewport, zoom: Math.min(this.viewport.zoom * 1.25, 8.0) };
  }

  private zoomOut(): void {
    this.viewport = { ...this.viewport, zoom: Math.max(this.viewport.zoom / 1.25, 0.15) };
  }

  private resetView(): void {
    this.viewport = { x: 300, y: 300, zoom: 1.0 };
  }

  private toggle3DMode(): void {
    this.is3DMode = !this.is3DMode;
    this.dispatchEvent(new CustomEvent('toggle-3d', {
      detail: { is3DMode: this.is3DMode },
      bubbles: true,
      composed: true
    }));
  }

  private getHelpMessage(): string | null {
    if (this.is3DMode) return "Vue 3D Isométrique : Murs extrudés avec éclairage dynamique.";
    if (this.activeTool === 'select') {
      return "Mode Sélection : Cliquez sur un élément pour le sélectionner (Shift pour multi-sélection, Shift+glisser pour cadre). Suppr pour effacer.";
    }
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
    if (this.activeTool === 'rescale') {
      return this.rescaleStart 
        ? "Tracez la ligne jusqu'au 2ème point (autre extrémité du mur ou point de référence)." 
        : "Mettre à l'échelle : Sélectionnez un mur ou cliquez sur le 1er point de mesure.";
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
        @dragover=${this.handleDragOver}
        @drop=${this.handleDrop}
      >
        <div class="viewport-3d-wrapper ${this.is3DMode ? 'mode-3d' : ''}">
          <svg class="main-viewport">
            ${this.renderBackgroundLayer()}
            ${this.renderGrid()}
            ${this.renderRooms()}
            ${this.renderWalls()}
            ${this.renderOpenings()}
            ${this.renderOpeningPreview()}
            ${this.renderPreviewWall()}
            ${this.renderCalibrationLine()}
            ${this.renderRescaleLine()}
            ${this.renderSnapIndicator()}
            ${this.renderEntityBindings()}
            ${this.renderMarqueeBox()}
          </svg>
        </div>

        ${helpMsg ? html`<div class="help-hud">${helpMsg}</div>` : null}

        <div class="coords-hud">
          X: ${this.cursorCoords.x.toFixed(2)} m | Y: ${this.cursorCoords.y.toFixed(2)} m | Outil: ${this.activeTool.toUpperCase()}
        </div>

        <!-- HUD Contrôles Zoom & 3D -->
        <div class="canvas-hud">
          <button 
            class="hud-btn ${this.is3DMode ? 'active' : ''}" 
            @click=${this.toggle3DMode} 
            title="Basculer Vue 2D / 3D Isométrique"
          >
            ${this.is3DMode ? '🧊' : '📐'}
          </button>
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
