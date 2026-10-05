import { LitElement, html, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { canvasStyles } from '../styles/canvas.styles';
import { 
  Point, Wall, Opening, OpeningType, Room, ActiveTool, GridConfig, 
  ViewportTransform, HomeArchitectProject, WallSnapResult, EntityBinding, SelectedElements,
  FurnitureItem, SmartGuide 
} from '../core/types';
import { SnappingEngine } from '../core/snapping';
import { PolygonUtils } from '../core/polygon';
import { findFurnitureTemplate } from '../core/furniture-catalog';
import { SvgExporter } from '../core/svg-exporter';

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
    bindingIds: [],
    furnitureIds: []
  };

  @property({ type: Boolean })
  public isDashboardMode: boolean = false;

  @property({ type: Object })
  public ghostProject?: HomeArchitectProject | null = null;

  @property({ type: Boolean })
  public showDimensions: boolean = true;

  @property({ type: Boolean })
  public showThermalHeatmap: boolean = false;

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
  private snapInfo: { 
    snappedTo: string; 
    guideAngle?: number; 
    smartGuideX?: number; 
    smartGuideY?: number 
  } = { snappedTo: 'none' };

  @state()
  private cursorCoords: Point = { x: 0, y: 0 };

  // État déplacement de meuble
  @state()
  private draggingFurnitureId: string | null = null;
  private dragFurnitureMoved: boolean = false;
  private dragFurnitureStartPos: Point = { x: 0, y: 0 };
  private dragFurnitureItemStartPos: Point = { x: 0, y: 0 };

  // État rotation fine degré par degré de meuble
  @state()
  private rotatingFurnitureId: string | null = null;
  private rotateFurnitureMoved: boolean = false;
  private rotateFurnitureStartAngle: number = 0;
  private rotateFurnitureInitialAngle: number = 0;

  // État redimensionnement / étirement de meuble (poignée coin bas-droit)
  @state()
  private resizingFurnitureId: string | null = null;
  private resizeFurnitureMoved: boolean = false;
  private resizeFurnitureStartPointer: Point = { x: 0, y: 0 };
  private resizeFurnitureInitialWidth: number = 1.0;
  private resizeFurnitureInitialLength: number = 1.0;

  // État déplacement de mur
  @state()
  private draggingWallId: string | null = null;
  private dragWallMoved: boolean = false;
  private dragWallStartPointer: Point = { x: 0, y: 0 };
  private dragWallInitialStart: Point = { x: 0, y: 0 };
  private dragWallInitialEnd: Point = { x: 0, y: 0 };

  // État d'insertion d'ouvrants
  @state()
  private wallSnap: WallSnapResult | null = null;

  @property({ type: Boolean })
  public openingFlipSide: boolean = false;

  @property({ type: Boolean })
  public openingFlipDirection: boolean = false;

  @property({ type: Number })
  public windowSashCount: number = 1;

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

  @state()
  private draggingBindingId: string | null = null;
  private dragBindingMoved: boolean = false;
  private dragBindingStartPos: Point = { x: 0, y: 0 };

  // État de rotation de la vue 2D (0, 90, 180, 270 degrés)
  @state()
  public viewRotation: number = 0;

  // État Orbite / Rotation 3D
  @state()
  private orbitPitch: number = 55;

  @state()
  private orbitYaw: number = -35;

  @state()
  private isOrbiting: boolean = false;

  private orbitStart: Point = { x: 0, y: 0 };
  private orbitStartPitch: number = 55;
  private orbitStartYaw: number = -35;

  public setCameraPreset(pitch: number, yaw: number): void {
    this.orbitPitch = pitch;
    this.orbitYaw = yaw;
    this.requestUpdate();
  }

  // ==========================================
  // CONVERSIONS DE COORDONNÉES
  // ==========================================

  public screenToWorld(screenX: number, screenY: number): Point {
    const rect = this.getBoundingClientRect();
    let relX = screenX - rect.left;
    let relY = screenY - rect.top;

    // Prise en compte de la rotation de vue 2D par rapport au centre du canvas
    if (!this.is3DMode && this.viewRotation !== 0) {
      const cx = (rect.width || 800) / 2;
      const cy = (rect.height || 600) / 2;
      const dx = relX - cx;
      const dy = relY - cy;
      const rad = (-this.viewRotation * Math.PI) / 180;
      relX = cx + (dx * Math.cos(rad) - dy * Math.sin(rad));
      relY = cy + (dx * Math.sin(rad) + dy * Math.cos(rad));
    }

    const ppm = this.project.pixelsPerMeter * this.viewport.zoom;
    return {
      x: (relX - this.viewport.x) / ppm,
      y: (relY - this.viewport.y) / ppm
    };
  }

  public worldToScreen(worldPoint: Point): Point {
    const ppm = this.project.pixelsPerMeter * this.viewport.zoom;
    let sx = worldPoint.x * ppm + this.viewport.x;
    let sy = worldPoint.y * ppm + this.viewport.y;

    // Prise en compte de la rotation de vue 2D par rapport au centre du canvas
    if (!this.is3DMode && this.viewRotation !== 0) {
      const rect = this.getBoundingClientRect();
      const cx = (rect.width || 800) / 2;
      const cy = (rect.height || 600) / 2;
      const dx = sx - cx;
      const dy = sy - cy;
      const rad = (this.viewRotation * Math.PI) / 180;
      sx = cx + (dx * Math.cos(rad) - dy * Math.sin(rad));
      sy = cy + (dx * Math.sin(rad) + dy * Math.cos(rad));
    }

    return {
      x: sx,
      y: sy
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
    if (this.is3DMode) {
      // 1. Clic molette (button 1) ou Shift + Clic : PAN dans l'espace 3D
      if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
        this.isPanning = true;
        this.panStart = { x: e.clientX - this.viewport.x, y: e.clientY - this.viewport.y };
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        return;
      }

      // 2. Clic droit (button 2) ou Alt + Clic : ORBITE interactive 360°
      if (e.button === 2 || (e.button === 0 && e.altKey)) {
        this.isOrbiting = true;
        this.orbitStart = { x: e.clientX, y: e.clientY };
        this.orbitStartPitch = this.orbitPitch;
        this.orbitStartYaw = this.orbitYaw;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        return;
      }

      // 3. Clic gauche direct (button 0) : Orbite sur fond ou sélection sur élément
      if (e.button === 0) {
        const isClickOnObject = (e.target as Element)?.closest?.('.wall-element, .wall-element-3d, .room-group, .entity-pin, .opening-element, .furniture-group');
        if (!isClickOnObject) {
          this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] };
          this.dispatchSelectionChanged();

          this.isOrbiting = true;
          this.orbitStart = { x: e.clientX, y: e.clientY };
          this.orbitStartPitch = this.orbitPitch;
          this.orbitStartYaw = this.orbitYaw;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          return;
        }
      }
      return;
    }

    if (e.button === 1) {
      this.isPanning = true;
      this.panStart = { x: e.clientX - this.viewport.x, y: e.clientY - this.viewport.y };
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      return;
    }

    if (e.button !== 0) return;

    const targetEl = e.target as Element;

    // Clic sur l'interface HUD (zoom, centrage, rotation, presets 3D, coords...) :
    // Ne jamais déclencher le traçage d'un mur ou d'un outil sur le canvas !
    if (targetEl?.closest?.('.canvas-hud, .coords-hud, .help-hud, button')) {
      return;
    }

    const isClickOnObject = !!targetEl?.closest?.(
      '.wall-element, .wall-element-3d, .room-group, .entity-pin, .opening-element, .furniture-group, .dimension-badge, .wall-dim-badge'
    );

    // Clic direct sur une entité ou un meuble : laisser l'élément gérer son interaction et son glisser-déposer
    if (targetEl?.closest?.('.entity-pin, .furniture-group')) {
      return;
    }

    if (this.activeTool === 'select') {
      if (isClickOnObject) {
        // Clic sur un objet sélectionnable : ne pas démarrer le pan ni vider la sélection
        return;
      }

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
      this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] };
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

        const defaultW = (opType === 'door')
          ? 0.90
          : (opType === 'french_window' ? 2.00 : (this.windowSashCount === 2 ? 1.40 : 0.90));

        const newOpening: Opening = {
          id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          wallId: this.wallSnap.wall.id,
          type: opType,
          offset: SnappingEngine.roundMeters(this.wallSnap.offset),
          width: this.currentOpeningWidth || defaultW,
          flipSide: this.openingFlipSide,
          flipDirection: this.openingFlipDirection,
          sashCount: opType === 'window' ? (this.windowSashCount || 1) : (opType === 'french_window' ? 2 : 1)
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
    if (this.resizingFurnitureId) {
      this.resizeFurnitureMoved = true;
      const item = (this.project.furniture || []).find(f => f.id === this.resizingFurnitureId);
      if (item) {
        const ppm = this.project.pixelsPerMeter * this.viewport.zoom;
        const dxScreen = e.clientX - this.resizeFurnitureStartPointer.x;
        const dyScreen = e.clientY - this.resizeFurnitureStartPointer.y;

        // Angle total appliqué au meuble dans le canvas (rotation meuble + rotation de vue 2D)
        const totalAngleDeg = (item.rotation || 0) + (!this.is3DMode ? this.viewRotation : 0);
        const rad = (totalAngleDeg * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);

        // Projection du vecteur de déplacement de la souris dans le repère local du meuble (axe X = largeur, axe Y = longueur)
        const dxLocalPx = dxScreen * cos + dyScreen * sin;
        const dyLocalPx = -dxScreen * sin + dyScreen * cos;

        const dWidthMeters = dxLocalPx / ppm;
        const dLengthMeters = dyLocalPx / ppm;

        let newWidth = Math.max(0.20, this.resizeFurnitureInitialWidth + dWidthMeters);
        let newLength = Math.max(0.20, this.resizeFurnitureInitialLength + dLengthMeters);

        // Si Shift est maintenu, conserver les proportions d'origine (aspect ratio)
        if (e.shiftKey && this.resizeFurnitureInitialWidth > 0 && this.resizeFurnitureInitialLength > 0) {
          const ratio = this.resizeFurnitureInitialLength / this.resizeFurnitureInitialWidth;
          const scale = Math.max(newWidth / this.resizeFurnitureInitialWidth, newLength / this.resizeFurnitureInitialLength);
          newWidth = Math.max(0.20, this.resizeFurnitureInitialWidth * scale);
          newLength = Math.max(0.20, newWidth * ratio);
        }

        // Arrondi millimétrique (pixel par pixel)
        newWidth = Math.round(newWidth * 1000) / 1000;
        newLength = Math.round(newLength * 1000) / 1000;

        const newFurniture = (this.project.furniture || []).map(f => {
          if (f.id === this.resizingFurnitureId) {
            return {
              ...f,
              width: newWidth,
              length: newLength
            };
          }
          return f;
        });

        this.project = { ...this.project, furniture: newFurniture };
        this.requestUpdate();
      }
      return;
    }

    if (this.rotatingFurnitureId) {
      this.rotateFurnitureMoved = true;
      const item = (this.project.furniture || []).find(f => f.id === this.rotatingFurnitureId);
      if (item) {
        const sCenter = this.worldToScreen(item.position);
        const currentAngle = Math.atan2(e.clientY - sCenter.y, e.clientX - sCenter.x) * (180 / Math.PI);
        const deltaAngle = currentAngle - this.rotateFurnitureStartAngle;
        let newAngle = Math.round(this.rotateFurnitureInitialAngle + deltaAngle);
        // Normalize angle between 0 and 359 degrees
        newAngle = ((newAngle % 360) + 360) % 360;

        const newFurniture = (this.project.furniture || []).map(f => {
          if (f.id === this.rotatingFurnitureId) {
            return { ...f, rotation: newAngle };
          }
          return f;
        });

        this.project = { ...this.project, furniture: newFurniture };
        this.requestUpdate();
      }
      return;
    }

    if (this.isOrbiting) {
      const deltaX = e.clientX - this.orbitStart.x;
      const deltaY = e.clientY - this.orbitStart.y;
      this.orbitYaw = (this.orbitStartYaw + deltaX * 0.55) % 360;
      this.orbitPitch = Math.max(15, Math.min(85, this.orbitStartPitch - deltaY * 0.38));
      this.requestUpdate();
      return;
    }

    if (this.draggingFurnitureId) {
      const dist = Math.hypot(e.clientX - this.dragFurnitureStartPos.x, e.clientY - this.dragFurnitureStartPos.y);
      if (dist > 3) {
        this.dragFurnitureMoved = true;
        const ppm = this.project.pixelsPerMeter * this.viewport.zoom;
        const dx = (e.clientX - this.dragFurnitureStartPos.x) / ppm;
        const dy = (e.clientY - this.dragFurnitureStartPos.y) / ppm;
        let newX = this.dragFurnitureItemStartPos.x + dx;
        let newY = this.dragFurnitureItemStartPos.y + dy;

        // Déplacement ultra-précis pixel par pixel (ou snap si Alt / grille forcé, mais par défaut libre)
        if (this.project.grid.snapToGrid && e.altKey) {
          const gSize = this.project.grid.size || 0.5;
          newX = Math.round(newX / gSize) * gSize;
          newY = Math.round(newY / gSize) * gSize;
        }

        const newPos = {
          x: Math.round(newX * 1000) / 1000,
          y: Math.round(newY * 1000) / 1000
        };
        const matchingRoom = PolygonUtils.findRoomContainingPoint(newPos, this.project.rooms);

        const newFurniture = (this.project.furniture || []).map(f => {
          if (f.id === this.draggingFurnitureId) {
            return {
              ...f,
              position: newPos,
              roomId: matchingRoom?.id
            };
          }
          return f;
        });

        this.project = { ...this.project, furniture: newFurniture };
        this.requestUpdate();
      }
      return;
    }

    if (this.draggingWallId) {
      const dist = Math.hypot(e.clientX - this.dragWallStartPointer.x, e.clientY - this.dragWallStartPointer.y);
      if (dist > 3) {
        this.dragWallMoved = true;
        const ppm = this.project.pixelsPerMeter * this.viewport.zoom;
        let dx = (e.clientX - this.dragWallStartPointer.x) / ppm;
        let dy = (e.clientY - this.dragWallStartPointer.y) / ppm;

        if (this.project.grid.snapToGrid) {
          const gSize = this.project.grid.size || 0.5;
          dx = Math.round(dx / gSize) * gSize;
          dy = Math.round(dy / gSize) * gSize;
        }

        const newWalls = this.project.walls.map(w => {
          if (w.id === this.draggingWallId) {
            return {
              ...w,
              start: {
                x: SnappingEngine.roundMeters(this.dragWallInitialStart.x + dx),
                y: SnappingEngine.roundMeters(this.dragWallInitialStart.y + dy)
              },
              end: {
                x: SnappingEngine.roundMeters(this.dragWallInitialEnd.x + dx),
                y: SnappingEngine.roundMeters(this.dragWallInitialEnd.y + dy)
              }
            };
          }
          return w;
        });

        this.project = { ...this.project, walls: newWalls };
        this.requestUpdate();
      }
      return;
    }

    if (this.draggingBindingId) {
      const dist = Math.hypot(e.clientX - this.dragBindingStartPos.x, e.clientY - this.dragBindingStartPos.y);
      if (dist > 3) {
        this.dragBindingMoved = true;
        const worldPt = this.screenToWorld(e.clientX, e.clientY);
        const matchingRoom = PolygonUtils.findRoomContainingPoint(worldPt, this.project.rooms);
        const newBindings = this.project.bindings.map(b => {
          if (b.id === this.draggingBindingId) {
            return {
              ...b,
              position: {
                x: SnappingEngine.roundMeters(worldPt.x),
                y: SnappingEngine.roundMeters(worldPt.y)
              },
              roomId: matchingRoom?.id
            };
          }
          return b;
        });
        this.project = { ...this.project, bindings: newBindings };
        this.requestUpdate();
      }
      return;
    }

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
      this.snapInfo = { 
        snappedTo: snapped.snappedTo, 
        guideAngle: snapped.guideAngle,
        smartGuideX: snapped.smartGuideX,
        smartGuideY: snapped.smartGuideY
      };
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
      this.snapInfo = { 
        snappedTo: snapped.snappedTo, 
        guideAngle: snapped.guideAngle,
        smartGuideX: snapped.smartGuideX,
        smartGuideY: snapped.smartGuideY
      };
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
    if (this.resizingFurnitureId) {
      const moved = this.resizeFurnitureMoved;
      this.resizingFurnitureId = null;
      this.resizeFurnitureMoved = false;
      try {
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch (_) {}
      if (moved) {
        this.dispatchProjectChanged();
        return;
      }
    }

    if (this.rotatingFurnitureId) {
      const moved = this.rotateFurnitureMoved;
      this.rotatingFurnitureId = null;
      this.rotateFurnitureMoved = false;
      try {
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch (_) {}
      if (moved) {
        this.dispatchProjectChanged();
        return;
      }
    }

    if (this.draggingFurnitureId) {
      const moved = this.dragFurnitureMoved;
      this.draggingFurnitureId = null;
      this.dragFurnitureMoved = false;
      try {
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch (_) {}
      if (moved) {
        this.dispatchProjectChanged();
        return;
      }
    }

    if (this.draggingWallId) {
      const moved = this.dragWallMoved;
      this.draggingWallId = null;
      this.dragWallMoved = false;
      try {
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch (_) {}
      if (moved) {
        this.dispatchProjectChanged();
        return;
      }
    }

    if (this.draggingBindingId) {
      const moved = this.dragBindingMoved;
      this.draggingBindingId = null;
      const container = this.shadowRoot?.querySelector('.canvas-container') as HTMLElement;
      try {
        container?.releasePointerCapture?.(e.pointerId);
      } catch (_) {}
      try {
        (e.target as HTMLElement)?.releasePointerCapture?.(e.pointerId);
      } catch (_) {}
      if (moved) {
        setTimeout(() => {
          this.dragBindingMoved = false;
        }, 150);
        this.dispatchProjectChanged();
        return;
      } else {
        this.dragBindingMoved = false;
      }
    }

    if (this.isOrbiting) {
      this.isOrbiting = false;
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      return;
    }

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

        const foundFurniture = (this.project.furniture || []).filter(f => {
          return f.position.x >= minX && f.position.x <= maxX && f.position.y >= minY && f.position.y <= maxY;
        }).map(f => f.id);

        this.selectedElements = {
          wallIds: Array.from(new Set([...this.selectedElements.wallIds, ...foundWalls])),
          openingIds: Array.from(new Set([...this.selectedElements.openingIds, ...foundOpenings])),
          roomIds: Array.from(new Set([...this.selectedElements.roomIds, ...foundRooms])),
          bindingIds: Array.from(new Set([...this.selectedElements.bindingIds, ...foundBindings])),
          furnitureIds: Array.from(new Set([...(this.selectedElements.furnitureIds || []), ...foundFurniture]))
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
      if (file.type.startsWith('image/') || file.name.toLowerCase().endsWith('.svg')) {
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

    // 2. Dépose d'une entité Home Assistant ou d'un meuble depuis le tiroir
    const rawData = e.dataTransfer?.getData('application/json');
    if (!rawData) return;

    try {
      const data = JSON.parse(rawData);

      // 2a. Dépose d'un meuble architectural
      if (data.kind === 'furniture') {
        const template = findFurnitureTemplate(data.furnitureType);
        if (template) {
          const worldPoint = this.screenToWorld(e.clientX, e.clientY);
          const matchingRoom = PolygonUtils.findRoomContainingPoint(worldPoint, this.project.rooms);
          const newFurniture: FurnitureItem = {
            id: `furn_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            type: template.type,
            name: template.name,
            category: template.category,
            position: {
              x: SnappingEngine.roundMeters(worldPoint.x),
              y: SnappingEngine.roundMeters(worldPoint.y)
            },
            width: template.width,
            length: template.length,
            rotation: 0,
            color: template.defaultColor,
            icon: template.icon,
            roomId: matchingRoom?.id
          };

          this.project = {
            ...this.project,
            furniture: [...(this.project.furniture || []), newFurniture]
          };

          this.selectedElements = { 
            wallIds: [], 
            openingIds: [], 
            roomIds: [], 
            bindingIds: [], 
            furnitureIds: [newFurniture.id] 
          };
          this.dispatchSelectionChanged();
          this.dispatchProjectChanged();
          return;
        }
      }

      // 2b. Dépose d'une entité Home Assistant
      const { entityId, domain, name, icon } = data;
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
      console.error('Erreur lors de la liaison entité/meuble:', err);
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

  private handleWallPointerDown(wall: Wall, e: PointerEvent): void {
    if (this.isDashboardMode) return;
    if (e.button !== 0) return;
    if (this.activeTool !== 'select') return;
    e.stopPropagation();

    this.draggingWallId = wall.id;
    this.dragWallMoved = false;
    this.dragWallStartPointer = { x: e.clientX, y: e.clientY };
    this.dragWallInitialStart = { ...wall.start };
    this.dragWallInitialEnd = { ...wall.end };

    const isMulti = e.shiftKey || e.ctrlKey || e.metaKey;
    const exists = this.selectedElements.wallIds.includes(wall.id);
    if (isMulti) {
      const newWallIds = exists
        ? this.selectedElements.wallIds.filter(id => id !== wall.id)
        : [...this.selectedElements.wallIds, wall.id];
      this.selectedElements = { ...this.selectedElements, wallIds: newWallIds };
    } else if (!exists) {
      this.selectedElements = { wallIds: [wall.id], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] };
    }
    this.dispatchSelectionChanged();
    (e.currentTarget as HTMLElement)?.setPointerCapture?.(e.pointerId);
  }

  private handleWallClick(e: MouseEvent, wall: Wall) {
    if (this.activeTool !== 'select') return;
    if (this.dragWallMoved) return;
    e.stopPropagation();
    const isMulti = e.shiftKey || e.ctrlKey || e.metaKey;
    const exists = this.selectedElements.wallIds.includes(wall.id);

    if (isMulti) {
      const newWallIds = exists
        ? this.selectedElements.wallIds.filter(id => id !== wall.id)
        : [...this.selectedElements.wallIds, wall.id];
      this.selectedElements = { ...this.selectedElements, wallIds: newWallIds };
    } else {
      this.selectedElements = { wallIds: [wall.id], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] };
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
      this.selectedElements = { wallIds: [], openingIds: [op.id], roomIds: [], bindingIds: [], furnitureIds: [] };
    }
    this.dispatchSelectionChanged();
  }

  private handleFurnitureRotatePointerDown(item: FurnitureItem, e: PointerEvent): void {
    if (this.isDashboardMode) return;
    if (e.button !== 0) return;
    e.stopPropagation();

    this.rotatingFurnitureId = item.id;
    this.rotateFurnitureMoved = false;

    // Calcul de l'angle initial du curseur par rapport au centre du meuble en pixels écran
    const sCenter = this.worldToScreen(item.position);
    this.rotateFurnitureStartAngle = Math.atan2(e.clientY - sCenter.y, e.clientX - sCenter.x) * (180 / Math.PI);
    this.rotateFurnitureInitialAngle = item.rotation || 0;

    // Assurer que le meuble est sélectionné
    if (!this.selectedElements.furnitureIds?.includes(item.id)) {
      this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [item.id] };
      this.dispatchSelectionChanged();
    }

    try {
      (e.currentTarget as HTMLElement)?.setPointerCapture?.(e.pointerId);
    } catch (_) {}
  }

  private handleFurnitureResizePointerDown(item: FurnitureItem, e: PointerEvent): void {
    if (this.isDashboardMode) return;
    if (e.button !== 0) return;
    e.stopPropagation();

    this.resizingFurnitureId = item.id;
    this.resizeFurnitureMoved = false;
    this.resizeFurnitureStartPointer = { x: e.clientX, y: e.clientY };

    const tmpl = findFurnitureTemplate(item.type);
    this.resizeFurnitureInitialWidth = item.width || tmpl?.width || 1.0;
    this.resizeFurnitureInitialLength = item.length || tmpl?.length || 1.0;

    // Assurer que le meuble est sélectionné
    if (!this.selectedElements.furnitureIds?.includes(item.id)) {
      this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [item.id] };
      this.dispatchSelectionChanged();
    }

    try {
      (e.currentTarget as HTMLElement)?.setPointerCapture?.(e.pointerId);
    } catch (_) {}
  }

  private handleFurniturePointerDown(item: FurnitureItem, e: PointerEvent): void {
    if (this.isDashboardMode) return;
    if (e.button !== 0) return;
    if (this.activeTool !== 'select') return;
    e.stopPropagation();

    this.draggingFurnitureId = item.id;
    this.dragFurnitureMoved = false;
    this.dragFurnitureStartPos = { x: e.clientX, y: e.clientY };
    this.dragFurnitureItemStartPos = { ...item.position };

    const isMulti = e.shiftKey || e.ctrlKey || e.metaKey;
    const exists = this.selectedElements.furnitureIds?.includes(item.id) || false;
    if (isMulti) {
      const newFurnIds = exists
        ? (this.selectedElements.furnitureIds || []).filter(id => id !== item.id)
        : [...(this.selectedElements.furnitureIds || []), item.id];
      this.selectedElements = { ...this.selectedElements, furnitureIds: newFurnIds };
    } else if (!exists) {
      this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [item.id] };
    }
    this.dispatchSelectionChanged();
    (e.currentTarget as HTMLElement)?.setPointerCapture?.(e.pointerId);
  }

  private handleFurnitureClick(e: MouseEvent, item: FurnitureItem): void {
    if (this.activeTool !== 'select') return;
    if (this.dragFurnitureMoved) return;
    e.stopPropagation();

    const isMulti = e.shiftKey || e.ctrlKey || e.metaKey;
    const exists = this.selectedElements.furnitureIds?.includes(item.id) || false;
    if (isMulti) {
      const newFurnIds = exists
        ? (this.selectedElements.furnitureIds || []).filter(id => id !== item.id)
        : [...(this.selectedElements.furnitureIds || []), item.id];
      this.selectedElements = { ...this.selectedElements, furnitureIds: newFurnIds };
    } else {
      this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [item.id] };
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

  private handleEntityPointerDown(binding: EntityBinding, e: PointerEvent): void {
    if (this.isDashboardMode) return;
    if (e.button !== 0) return;
    e.stopPropagation();

    this.draggingBindingId = binding.id;
    this.dragBindingMoved = false;
    this.dragBindingStartPos = { x: e.clientX, y: e.clientY };

    const me = e as MouseEvent;
    const isMulti = me.shiftKey || me.ctrlKey || me.metaKey;
    const exists = this.selectedElements.bindingIds.includes(binding.id);
    if (isMulti) {
      const newBindingIds = exists
        ? this.selectedElements.bindingIds.filter(id => id !== binding.id)
        : [...this.selectedElements.bindingIds, binding.id];
      this.selectedElements = { ...this.selectedElements, bindingIds: newBindingIds };
    } else {
      this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [binding.id], furnitureIds: [] };
    }
    this.dispatchSelectionChanged();

    const container = this.shadowRoot?.querySelector('.canvas-container') as HTMLElement;
    try {
      container?.setPointerCapture?.(e.pointerId);
    } catch (_) {}
  }

  private executeEntityTapAction(binding: EntityBinding): void {
    const domain = (binding.entityId || '').split('.')[0];

    // Security & Safety: Critical domains must NEVER trigger blind action on simple tap
    const safeToggleDomains = ['light', 'switch', 'input_boolean', 'fan'];
    const moreInfoOnlyDomains = ['lock', 'alarm_control_panel', 'camera', 'climate', 'media_player', 'sensor', 'binary_sensor', 'device_tracker'];

    if (binding.tapAction === 'more-info' || moreInfoOnlyDomains.includes(domain)) {
      this.dispatchEvent(new CustomEvent('hass-more-info', {
        detail: { entityId: binding.entityId },
        bubbles: true,
        composed: true
      }));
      return;
    }

    if (this.hass && this.hass.callService) {
      if (safeToggleDomains.includes(domain)) {
        this.hass.callService(domain, 'toggle', { entity_id: binding.entityId })
          .catch(() => {
            this.hass.callService('homeassistant', 'toggle', { entity_id: binding.entityId });
          });
      } else if (domain === 'cover') {
        this.hass.callService('cover', 'toggle', { entity_id: binding.entityId })
          .catch(() => {
            this.hass.callService('homeassistant', 'toggle', { entity_id: binding.entityId });
          });
      } else if (domain === 'scene') {
        this.hass.callService('scene', 'turn_on', { entity_id: binding.entityId });
      } else if (domain === 'script') {
        this.hass.callService('script', 'turn_on', { entity_id: binding.entityId });
      } else if (domain === 'button' || domain === 'input_button') {
        this.hass.callService('button', 'press', { entity_id: binding.entityId });
      } else {
        // Fallback: More-info dialog rather than dangerous unexpected blind action
        this.dispatchEvent(new CustomEvent('hass-more-info', {
          detail: { entityId: binding.entityId },
          bubbles: true,
          composed: true
        }));
      }
    }
  }

  private handleEntityClick(binding: EntityBinding, e: Event): void {
    e.stopPropagation();
    if (this.dragBindingMoved) {
      return;
    }

    // En mode dashboard Lovelace : interaction directe au clic
    if (this.isDashboardMode) {
      this.executeEntityTapAction(binding);
      return;
    }

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

    // Si pas en mode sélection : déclenchement de l'action selon la table sécurisée
    this.executeEntityTapAction(binding);
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

  public rotateSelectedFurniture(): void {
    if (!this.selectedElements.furnitureIds || this.selectedElements.furnitureIds.length === 0) return;
    const furnIds = this.selectedElements.furnitureIds;
    const newFurniture = (this.project.furniture || []).map(f => {
      if (furnIds.includes(f.id)) {
        return {
          ...f,
          rotation: ((f.rotation || 0) + 90) % 360
        };
      }
      return f;
    });
    this.project = { ...this.project, furniture: newFurniture };
    this.dispatchProjectChanged();
    this.requestUpdate();
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
      this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] };
      this.dispatchSelectionChanged();
      this.requestUpdate();
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
    } else if (e.key.toLowerCase() === 'r') {
      if (this.selectedElements.furnitureIds && this.selectedElements.furnitureIds.length > 0) {
        e.preventDefault();
        this.rotateSelectedFurniture();
      }
    }
  }

  private _canvasResizeObserver: ResizeObserver | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this._boundKeyDown = this.handleKeyDown.bind(this);
    window.addEventListener('keydown', this._boundKeyDown);

    if (typeof ResizeObserver !== 'undefined') {
      this._canvasResizeObserver = new ResizeObserver(() => {
        this.requestUpdate();
      });
      this._canvasResizeObserver.observe(this);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._boundKeyDown) {
      window.removeEventListener('keydown', this._boundKeyDown);
    }
    if (this._canvasResizeObserver) {
      this._canvasResizeObserver.disconnect();
      this._canvasResizeObserver = null;
    }
  }

  firstUpdated(): void {
    setTimeout(() => {
      if (this.project && (this.project.walls?.length > 0 || this.project.rooms?.length > 0)) {
        this.fitToScreen();
      }
    }, 150);
  }

  updated(changedProperties: Map<string, any>): void {
    super.updated(changedProperties);
    if (changedProperties.has('project')) {
      const oldProject = changedProperties.get('project');
      if (oldProject && this.project && oldProject.id !== this.project.id) {
        setTimeout(() => this.fitToScreen(), 80);
      }
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

  // Rendu des Pièces avec détection d'illumination (RGB & Brightness) et Carte Thermique
  private renderRooms() {
    return this.project.rooms.map((room) => {
      if (!room.polygon || room.polygon.length < 3) return null;

      const screenPts = room.polygon.map(p => this.worldToScreen(p));
      const pointsAttr = screenPts.map(p => `${p.x},${p.y}`).join(' ');

      // 1. Détection des lumières allumées dans cette pièce avec RGB et Luminosité
      const activeLights = this.project.bindings
        .filter(b => b.roomId === room.id && b.entityId.startsWith('light.'))
        .map(b => this.hass?.states?.[b.entityId])
        .filter(s => s && s.state === 'on');

      const isRoomIlluminated = activeLights.length > 0;
      let lightBleedFill: string | null = null;
      if (isRoomIlluminated) {
        const firstLight = activeLights[0];
        const rgb = firstLight.attributes?.rgb_color || [255, 240, 180];
        const brightness = firstLight.attributes?.brightness !== undefined ? firstLight.attributes.brightness : 255;
        const alpha = 0.12 + (brightness / 255) * 0.22;
        lightBleedFill = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha.toFixed(2)})`;
      }

      // 2. Détection de la température pour la Carte Thermique (Heatmap)
      let roomTemp: number | null = null;
      const tempBinding = this.project.bindings.find(b => 
        b.roomId === room.id && (
          b.entityId.startsWith('climate.') ||
          (b.entityId.startsWith('sensor.') && (b.entityId.toLowerCase().includes('temp') || b.customName?.toLowerCase().includes('temp')))
        )
      );

      if (tempBinding) {
        const st = this.hass?.states?.[tempBinding.entityId];
        if (st) {
          if (tempBinding.entityId.startsWith('climate.')) {
            const val = st.attributes?.current_temperature ?? st.state;
            if (!isNaN(parseFloat(val))) roomTemp = parseFloat(val);
          } else {
            if (!isNaN(parseFloat(st.state))) roomTemp = parseFloat(st.state);
          }
        }
      }

      // Couleur de remplissage : priorité à la heatmap si activée, sinon éclairage simulant, sinon couleur de pièce
      let roomFillColor = room.color || 'rgba(56, 189, 248, 0.12)';
      if (this.showThermalHeatmap && roomTemp !== null) {
        if (roomTemp < 18) roomFillColor = 'rgba(59, 130, 246, 0.38)';      // Bleu frais
        else if (roomTemp < 20) roomFillColor = 'rgba(14, 165, 233, 0.32)'; // Cyan doux
        else if (roomTemp < 22) roomFillColor = 'rgba(16, 185, 129, 0.30)'; // Vert confort
        else if (roomTemp < 24) roomFillColor = 'rgba(245, 158, 11, 0.34)'; // Orange chaleureux
        else roomFillColor = 'rgba(239, 68, 68, 0.40)';                     // Rouge chaud
      } else if (lightBleedFill) {
        roomFillColor = lightBleedFill;
      }

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
            style="fill: ${roomFillColor}; cursor: pointer; transition: fill 0.3s ease;"
          />
          ${this.is3DMode ? svg`
            <g class="room-3d-badge-group" transform="translate(${centroid.x}, ${centroid.y})">
              <rect 
                x="-62" 
                y="-30" 
                width="124" 
                height="60" 
                rx="10" 
                ry="10" 
                fill="rgba(15, 23, 42, 0.84)" 
                stroke="${isRoomSelected ? '#38bdf8' : 'rgba(56, 189, 248, 0.4)'}" 
                stroke-width="${isRoomSelected ? 2 : 1}"
                filter="drop-shadow(0 6px 14px rgba(0, 0, 0, 0.6))"
              />
              <text class="room-label-name" y="-12" style="font-size: 12px; font-weight: 700; fill: #f8fafc; text-anchor: middle;">
                ${room.name}
              </text>
              <text class="room-label-area" y="6" style="font-size: 11px; font-weight: 700; fill: #38bdf8; text-anchor: middle; font-family: ui-monospace, SFMono-Regular, monospace;">
                ${room.areaM2.toFixed(1)} m²
              </text>
              <text class="room-label-height" y="21" style="font-size: 9.5px; font-weight: 600; fill: #a5f3fc; text-anchor: middle; font-family: ui-monospace, SFMono-Regular, monospace;">
                H: ${roomH.toFixed(2)}m · ${roomVolume} m³
              </text>
            </g>
          ` : svg`
            <g class="room-label-group" transform="translate(${centroid.x}, ${centroid.y})">
              <text class="room-label-name" y="${roomTemp !== null ? -10 : -6}">${room.name}</text>
              <text class="room-label-area" y="${roomTemp !== null ? 6 : 12}">${room.areaM2.toFixed(1)} m²</text>
              ${roomTemp !== null ? svg`
                <text class="room-label-temp" y="21" style="font-size: 9.5px; font-weight: 700; fill: #facc15; text-anchor: middle; font-family: ui-monospace, SFMono-Regular, monospace;">
                  🌡️ ${roomTemp.toFixed(1)}°C
                </text>
              ` : null}
            </g>
          `}
        </g>
      `;
    });
  }

  private renderGrid() {
    if (this.is3DMode) {
      return svg`
        <defs>
          <radialGradient id="ground-shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(0, 0, 0, 0.45)" />
            <stop offset="65%" stop-color="rgba(0, 0, 0, 0.15)" />
            <stop offset="100%" stop-color="rgba(0, 0, 0, 0)" />
          </radialGradient>
          <pattern id="grid-dots-3d" width="40" height="40" patternUnits="userSpaceOnUse"
            patternTransform="translate(${this.viewport.x % 40}, ${this.viewport.y % 40})">
            <circle cx="20" cy="20" r="1.2" fill="rgba(255, 255, 255, 0.08)" />
          </pattern>
        </defs>
        <!-- Grille de repère architectural au sol -->
        <rect x="-4000" y="-4000" width="8000" height="8000" fill="url(#grid-dots-3d)" />
        <!-- Ombre portée architecturale sous le bâtiment -->
        <ellipse cx="${this.viewport.x + 300}" cy="${this.viewport.y + 200}" rx="900" ry="550" fill="url(#ground-shadow)" />
      `;
    }

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
        // Rendu 3D avec 4 parois verticales ombrées et chapeau supérieur
        const spTop = sp.map(pt => ({ x: pt.x, y: pt.y - wallExtrusionH }));
        const pointsTopAttr = spTop.map(pt => `${pt.x},${pt.y}`).join(' ');

        // Éclairage directionnel simulé (Soleil haut-gauche: vecteur directionnel [-0.7, -0.7])
        const faces = [0, 1, 2, 3].map(k => {
          const nextK = (k + 1) % 4;
          const pA = sp[k];
          const pB = sp[nextK];
          const pBTop = spTop[nextK];
          const pATop = spTop[k];

          const dx = pB.x - pA.x;
          const dy = pB.y - pA.y;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const nx = -dy / len;
          const ny = dx / len;
          const dot = Math.max(-1, Math.min(1, nx * (-0.7) + ny * (-0.7)));

          const lightness = isWallSelected 
            ? Math.round(42 + dot * 14) 
            : Math.round(34 + dot * 16);
          const fill = isWallSelected 
            ? `hsl(192, 85%, ${lightness}%)` 
            : `hsl(215, 22%, ${lightness}%)`;
          const stroke = isWallSelected 
            ? '#38bdf8' 
            : `hsl(215, 22%, ${lightness + 6}%)`;

          return {
            pts: `${pA.x},${pA.y} ${pB.x},${pB.y} ${pBTop.x},${pBTop.y} ${pATop.x},${pATop.y}`,
            fill,
            stroke
          };
        });

        const topFill = isWallSelected ? '#06b6d4' : '#f1f5f9';
        const topStroke = isWallSelected ? '#22d3ee' : '#94a3b8';

        return svg`
          <g 
            class="wall-element-3d ${isWallSelected ? 'selected' : ''}" 
            data-wall-id="${wall.id}"
            @click=${(e: MouseEvent) => this.handleWallClick(e, wall)}
            style="cursor: pointer;"
          >
            <!-- 4 parois verticales solides -->
            ${faces.map(f => svg`
              <polygon points="${f.pts}" style="fill: ${f.fill}; stroke: ${f.stroke}; stroke-width: 0.8; stroke-linejoin: round;" />
            `)}
            <!-- Chapeau supérieur du mur -->
            <polygon points="${pointsTopAttr}" style="fill: ${topFill}; stroke: ${topStroke}; stroke-width: 1.2; stroke-linejoin: round;" />
          </g>
        `;
      }

      // Rendu 2D classique
      const dxWall = sEnd.x - sStart.x;
      const dyWall = sEnd.y - sStart.y;
      const distPx = Math.hypot(dxWall, dyWall) || 1;
      const nx = -dyWall / distPx;
      const ny = dxWall / distPx;

      return svg`
        <g 
          class="wall-element ${isWallSelected ? 'selected' : ''}" 
          data-wall-id="${wall.id}"
          @pointerdown=${(e: PointerEvent) => this.handleWallPointerDown(wall, e)}
          @click=${(e: MouseEvent) => this.handleWallClick(e, wall)}
        >
          <polygon points="${pointsAttr}" class="wall-rect" />
          <line x1="${sStart.x}" y1="${sStart.y}" x2="${sEnd.x}" y2="${sEnd.y}" class="wall-centerline" />
          
          ${this.showDimensions && lenMeters >= 0.4 ? svg`
            <g class="wall-dim-badge" transform="translate(${mid.x + nx * 14}, ${mid.y + ny * 14})">
              <rect x="-24" y="-9" width="48" height="18" />
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
          ${op.type === 'window' ? this.renderWindowSymbol(wPx, thickPx, op.sashCount || (op.width >= 1.25 ? 2 : 1)) : null}
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

  private renderWindowSymbol(wPx: number, thickPx: number, sashCount: number = 1) {
    const halfW = wPx / 2;
    if (sashCount === 2) {
      return svg`
        <g>
          <rect x="${-halfW}" y="${-thickPx / 2}" width="${wPx}" height="${thickPx}" fill="none" class="opening-window-frame" />
          <line x1="${-halfW}" y1="0" x2="${halfW}" y2="0" class="opening-window-glass" />
          <line x1="0" y1="${-thickPx / 2}" x2="0" y2="${thickPx / 2}" stroke="#38bdf8" stroke-width="2.5" />
          <line x1="${-halfW + 4}" y1="${-thickPx / 4}" x2="-3" y2="${-thickPx / 4}" stroke="rgba(56, 189, 248, 0.45)" stroke-width="1.2" />
          <line x1="3" y1="${thickPx / 4}" x2="${halfW - 4}" y2="${thickPx / 4}" stroke="rgba(56, 189, 248, 0.45)" stroke-width="1.2" />
        </g>
      `;
    }

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

  private getEntityDisplayState(binding: EntityBinding): { text: string; statusClass: 'on' | 'off' | 'alert' | 'info' } {
    const entityState = this.hass?.states?.[binding.entityId];
    if (!entityState) {
      return { text: 'Inactif', statusClass: 'off' };
    }

    const stateStr = entityState.state;
    if (stateStr === 'unavailable') return { text: 'Indisponible', statusClass: 'off' };
    if (stateStr === 'unknown') return { text: 'Inconnu', statusClass: 'off' };

    const domain = binding.entityId.split('.')[0];
    const attrs = entityState.attributes || {};
    const deviceClass = attrs.device_class || '';

    if (domain === 'light') {
      if (stateStr === 'on') {
        const pct = attrs.brightness ? Math.round((attrs.brightness / 255) * 100) : null;
        return { text: pct !== null ? `Allumé (${pct}%)` : 'Allumé', statusClass: 'on' };
      }
      return { text: 'Éteint', statusClass: 'off' };
    }

    if (domain === 'switch') {
      return stateStr === 'on' 
        ? { text: 'Actif', statusClass: 'on' } 
        : { text: 'Éteint', statusClass: 'off' };
    }

    if (domain === 'binary_sensor') {
      const isRadar = deviceClass === 'motion' || deviceClass === 'occupancy' || deviceClass === 'presence' ||
        binding.entityId.includes('presence') || binding.entityId.includes('occupancy') || binding.entityId.includes('radar') || binding.entityId.includes('motion');
      const isOpening = deviceClass === 'door' || deviceClass === 'window' || deviceClass === 'garage_door' || deviceClass === 'opening';
      const isMoisture = deviceClass === 'moisture';
      const isSmoke = deviceClass === 'smoke';

      if (stateStr === 'on' || stateStr === 'detected') {
        if (isRadar) return { text: 'Mouvement', statusClass: 'alert' };
        if (isOpening) return { text: 'Ouvert', statusClass: 'alert' };
        if (isMoisture) return { text: 'Fuite !', statusClass: 'alert' };
        if (isSmoke) return { text: 'Fumée !', statusClass: 'alert' };
        return { text: 'Détecté', statusClass: 'alert' };
      } else {
        if (isRadar) return { text: 'Au repos', statusClass: 'info' };
        if (isOpening) return { text: 'Fermé', statusClass: 'info' };
        if (isMoisture) return { text: 'Sec', statusClass: 'info' };
        if (isSmoke) return { text: 'Normal', statusClass: 'info' };
        return { text: 'Inactif', statusClass: 'off' };
      }
    }

    if (domain === 'climate') {
      const cur = attrs.current_temperature;
      const target = attrs.temperature;
      if (cur !== undefined && target !== undefined) {
        return { text: `${cur}°C (${target}°)`, statusClass: 'info' };
      }
      if (cur !== undefined) return { text: `${cur}°C`, statusClass: 'info' };
      return { text: stateStr, statusClass: 'info' };
    }

    if (domain === 'sensor') {
      const unit = attrs.unit_of_measurement || '';
      return { text: `${stateStr}${unit ? ' ' + unit : ''}`, statusClass: 'info' };
    }

    if (domain === 'cover') {
      const pos = attrs.current_position;
      if (pos !== undefined) return { text: `${pos}%`, statusClass: pos > 0 ? 'on' : 'off' };
      return stateStr === 'open' ? { text: 'Ouvert', statusClass: 'on' } : { text: 'Fermé', statusClass: 'off' };
    }

    if (domain === 'media_player') {
      if (stateStr === 'playing') return { text: 'Lecture', statusClass: 'on' };
      if (stateStr === 'paused') return { text: 'Pause', statusClass: 'info' };
      return { text: 'Arrêt', statusClass: 'off' };
    }

    if (domain === 'fan') {
      return stateStr === 'on' ? { text: 'En marche', statusClass: 'on' } : { text: 'Arrêté', statusClass: 'off' };
    }

    if (domain === 'lock') {
      return stateStr === 'locked' ? { text: 'Verrouillé', statusClass: 'info' } : { text: 'Déverrouillé', statusClass: 'alert' };
    }

    return { text: stateStr === 'on' ? 'Actif' : (stateStr === 'off' ? 'Inactif' : stateStr), statusClass: stateStr === 'on' ? 'on' : 'off' };
  }

  private renderEntityBindings() {
    return this.project.bindings.map((binding) => {
      const sPos = this.worldToScreen(binding.position);
      const entityState = this.hass?.states?.[binding.entityId];
      const stateStr = entityState?.state || 'off';
      const isLightOn = binding.entityId.startsWith('light.') && stateStr === 'on';
      const isRadarActive = binding.entityId.startsWith('binary_sensor.') && (stateStr === 'on' || stateStr === 'detected');
      const isTempSensor = binding.entityId.startsWith('sensor.') || binding.entityId.startsWith('climate.');
      const isFan = binding.entityId.startsWith('fan.');
      const isFanOn = isFan && stateStr === 'on';
      const isMediaPlayer = binding.entityId.startsWith('media_player.');
      const isPlaying = isMediaPlayer && stateStr === 'playing';
      const isCover = binding.entityId.startsWith('cover.');
      const coverPos = entityState?.attributes?.current_position;
      const unit = entityState?.attributes?.unit_of_measurement || (isTempSensor ? '°' : '');
      const isBindingSelected = this.selectedElements?.bindingIds?.includes(binding.id);
      const displayState = this.getEntityDisplayState(binding);

      return svg`
        <g 
          class="entity-pin ${isBindingSelected ? 'selected' : ''} ${isLightOn ? 'active-light' : ''} ${isRadarActive ? 'active-radar' : ''}"
          transform="translate(${sPos.x}, ${sPos.y})"
          @pointerdown=${(e: PointerEvent) => this.handleEntityPointerDown(binding, e)}
          @click=${(e: Event) => this.handleEntityClick(binding, e)}
          @dblclick=${(e: Event) => this.handleEntityDblClick(binding, e)}
          title="${binding.customName || binding.entityId} : ${displayState.text} (Clic pour basculer)"
        >
          <!-- Onde radar animée si mouvement détecté -->
          ${isRadarActive ? svg`<circle cx="0" cy="0" r="16" class="radar-pulse-ring" />` : null}

          <!-- Ondes sonores pour lecteur multimédia actif -->
          ${isPlaying ? svg`<circle cx="0" cy="0" r="16" class="soundwave-pulse" />` : null}

          <!-- Pastille de fond -->
          <circle cx="0" cy="0" r="16" class="entity-pin-bg" />

          <!-- Pictogramme avec micro-animation (rotation ventilateur) -->
          <text x="0" y="0" class="entity-pin-icon ${isFanOn ? 'fan-spin' : ''}">
            ${binding.icon || (isFan ? '💨' : (isCover ? '🪟' : (isMediaPlayer ? '📺' : '⚡')))}
          </text>

          <!-- Étiquette Nom -->
          <text x="0" y="27" class="entity-pin-label">
            ${binding.customName || binding.entityId.split('.')[1]}
          </text>

          <!-- Étiquette État en direct -->
          <text x="0" y="38" class="entity-pin-state state-${displayState.statusClass}">
            ${displayState.text}
          </text>

          <!-- Badge Valeur (Thermostat / Capteur de température) -->
          ${isTempSensor && stateStr !== 'unknown' ? svg`
            <g class="entity-pin-value-badge" transform="translate(14, -14)">
              <rect x="-14" y="-8" width="28" height="16" />
              <text>${stateStr}${unit}</text>
            </g>
          ` : null}

          <!-- Badge Position Volet roulant -->
          ${isCover && coverPos !== undefined ? svg`
            <g class="entity-pin-value-badge" transform="translate(14, -14)">
              <rect x="-14" y="-8" width="28" height="16" />
              <text>${coverPos}%</text>
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

  private renderGhostLayer() {
    if (!this.ghostProject || !this.ghostProject.walls || this.ghostProject.walls.length === 0) return null;
    const ppm = this.project.pixelsPerMeter * this.viewport.zoom;

    return svg`
      <g class="ghost-layer" opacity="0.45" pointer-events="none">
        ${this.ghostProject.walls.map(w => {
          const sStart = this.worldToScreen(w.start);
          const sEnd = this.worldToScreen(w.end);
          const thickPx = (w.thickness || 0.2) * ppm;
          return svg`
            <line 
              x1="${sStart.x}" y1="${sStart.y}" 
              x2="${sEnd.x}" y2="${sEnd.y}" 
              class="ghost-wall" 
              stroke-width="${thickPx}" 
            />
          `;
        })}
      </g>
    `;
  }

  private renderSmartGuides() {
    if (this.snapInfo.smartGuideX === undefined && this.snapInfo.smartGuideY === undefined) return null;

    return svg`
      <g class="smart-guides-group" pointer-events="none">
        ${this.snapInfo.smartGuideX !== undefined ? svg`
          <line 
            x1="${this.worldToScreen({ x: this.snapInfo.smartGuideX, y: 0 }).x}" 
            y1="-2000" 
            x2="${this.worldToScreen({ x: this.snapInfo.smartGuideX, y: 0 }).x}" 
            y2="6000" 
            class="smart-guide-line" 
          />
        ` : null}
        ${this.snapInfo.smartGuideY !== undefined ? svg`
          <line 
            x1="-2000" 
            y1="${this.worldToScreen({ x: 0, y: this.snapInfo.smartGuideY }).y}" 
            x2="6000" 
            y2="${this.worldToScreen({ x: 0, y: this.snapInfo.smartGuideY }).y}" 
            class="smart-guide-line" 
          />
        ` : null}
      </g>
    `;
  }

  private renderFurniture() {
    const ppm = this.project.pixelsPerMeter * this.viewport.zoom;
    return (this.project.furniture || []).map(item => {
      const tmpl = findFurnitureTemplate(item.type);
      const isSelected = this.selectedElements.furnitureIds?.includes(item.id) || false;
      const sPos = this.worldToScreen(item.position);
      const wMeters = item.width || tmpl?.width || 1;
      const lMeters = item.length || tmpl?.length || 1;
      const wPx = wMeters * ppm;
      const lPx = lMeters * ppm;
      const rot = item.rotation || 0;

      return svg`
        <g
          class="furniture-group ${isSelected ? 'selected' : ''}"
          data-furniture-id="${item.id}"
          transform="translate(${sPos.x}, ${sPos.y}) rotate(${rot})"
          @pointerdown=${(e: PointerEvent) => this.handleFurniturePointerDown(item, e)}
          @click=${(e: MouseEvent) => this.handleFurnitureClick(e, item)}
          title="${item.name} (${wMeters.toFixed(2)} × ${lMeters.toFixed(2)} m) - Touche R pour pivoter"
        >
          ${tmpl ? tmpl.renderSvg(wPx, lPx, isSelected) : svg`
            <rect x="${-wPx/2}" y="${-lPx/2}" width="${wPx}" height="${lPx}" fill="rgba(30, 41, 59, 0.85)" stroke="${isSelected ? '#38bdf8' : '#94a3b8'}" stroke-width="1.5" rx="4" />
            <text x="0" y="4" text-anchor="middle" font-size="12" fill="#cbd5e1">${item.icon || '📦'}</text>
          `}
          ${isSelected ? svg`
            <!-- Ligne de rappel vers la poignée de rotation -->
            <line x1="0" y1="${-lPx/2}" x2="0" y2="${-lPx/2 - 18}" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3,2" />
            <!-- Poignée interactive de rotation degré par degré -->
            <g
              class="furniture-rotate-handle"
              @pointerdown=${(e: PointerEvent) => this.handleFurnitureRotatePointerDown(item, e)}
              style="cursor: grab;"
            >
              <!-- Zone cliquable invisible élargie -->
              <circle cx="0" cy="${-lPx/2 - 18}" r="12" fill="transparent" />
              <!-- Petit rond bleu clair visible avec contour blanc -->
              <circle cx="0" cy="${-lPx/2 - 18}" r="6.5" fill="#38bdf8" stroke="#ffffff" stroke-width="2" />
              <!-- Indicateur d'angle en direct quand le meuble est sélectionné -->
              <text 
                x="0" 
                y="${-lPx/2 - 28}" 
                text-anchor="middle" 
                font-size="10" 
                font-weight="700" 
                fill="#38bdf8"
                style="user-select: none; pointer-events: none; text-shadow: 0 1px 4px rgba(0,0,0,0.8);"
              >
                ${Math.round(rot)}°
              </text>
            </g>

            <!-- Poignée interactive d'étirement / redimensionnement en bas à droite -->
            <g
              class="furniture-resize-handle"
              @pointerdown=${(e: PointerEvent) => this.handleFurnitureResizePointerDown(item, e)}
              style="cursor: nwse-resize;"
            >
              <!-- Zone cliquable invisible élargie -->
              <rect x="${wPx/2 - 6}" y="${lPx/2 - 6}" width="20" height="20" fill="transparent" />
              <!-- Poignée carrée moderne aux coins légèrement arrondis avec bordure blanche -->
              <rect 
                x="${wPx/2 - 2}" 
                y="${lPx/2 - 2}" 
                width="11" 
                height="11" 
                rx="2.5" 
                fill="#38bdf8" 
                stroke="#ffffff" 
                stroke-width="1.8" 
              />
              <!-- 2 stries diagonales symbolisant le grip de redimensionnement -->
              <line x1="${wPx/2 + 2}" y1="${lPx/2 + 7}" x2="${wPx/2 + 7}" y2="${lPx/2 + 2}" stroke="#0f172a" stroke-width="1.2" stroke-linecap="round" />
              <line x1="${wPx/2 + 5}" y1="${lPx/2 + 7}" x2="${wPx/2 + 7}" y2="${lPx/2 + 5}" stroke="#0f172a" stroke-width="1.2" stroke-linecap="round" />

              <!-- Badge des dimensions actuelles en bas à droite -->
              <g transform="translate(${wPx/2 + 14}, ${lPx/2 + 16})" style="user-select: none; pointer-events: none;">
                <rect x="-2" y="-9" width="${(wMeters.toFixed(2) + '×' + lMeters.toFixed(2) + 'm').length * 6.5 + 8}" height="14" rx="3" fill="rgba(15, 23, 42, 0.85)" stroke="rgba(56, 189, 248, 0.4)" stroke-width="0.8" />
                <text 
                  x="2" 
                  y="1.5" 
                  font-size="9" 
                  font-weight="700" 
                  font-family="ui-monospace, SFMono-Regular, monospace"
                  fill="#38bdf8"
                >
                  ${wMeters.toFixed(2)}×${lMeters.toFixed(2)}m
                </text>
              </g>
            </g>
          ` : null}
        </g>
      `;
    });
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

  public rotateQuarterTurn(): void {
    if (this.is3DMode) {
      // En 3D : pivoter l'angle d'orbite de 90°
      this.orbitYaw = (this.orbitYaw - 90) % 360;
    } else {
      // En 2D : pivoter l'angle de vue de 90° dans le sens anti-horaire
      this.viewRotation = (this.viewRotation + 270) % 360;
      this.fitToScreen();
    }
    this.requestUpdate();
  }

  public fitToScreen(padding: number = 60): void {
    const rect = this.getBoundingClientRect();
    const canvasW = rect.width || this.clientWidth || 800;
    const canvasH = rect.height || this.clientHeight || 600;

    const hasContent = (this.project.walls && this.project.walls.length > 0) ||
      (this.project.rooms && this.project.rooms.length > 0) ||
      (this.project.furniture && this.project.furniture.length > 0) ||
      (this.project.background?.imageUrl && this.project.background.visible);

    if (!hasContent) {
      this.viewport = { x: canvasW / 2, y: canvasH / 2, zoom: 1.0 };
      this.requestUpdate();
      return;
    }

    const bbox = SvgExporter.calculateBoundingBox(this.project, 0.6);
    const ppm = bbox.ppm;
    
    // Si la vue est tournée de 90° ou 270°, inverser largeur et hauteur pour le cadrage
    const isTransposed = (!this.is3DMode && (this.viewRotation === 90 || this.viewRotation === 270));
    const rawPlanW = bbox.width * ppm;
    const rawPlanH = bbox.height * ppm;
    const planW = isTransposed ? rawPlanH : rawPlanW;
    const planH = isTransposed ? rawPlanW : rawPlanH;

    const planCenterX = (bbox.minX + bbox.width / 2) * ppm;
    const planCenterY = (bbox.minY + bbox.height / 2) * ppm;

    const availW = Math.max(100, canvasW - padding * 2);
    const availH = Math.max(100, canvasH - padding * 2);

    let zoom = Math.min(availW / Math.max(planW, 100), availH / Math.max(planH, 100));
    zoom = Math.min(Math.max(zoom, 0.2), 2.5);

    this.viewport = {
      x: canvasW / 2 - planCenterX * zoom,
      y: canvasH / 2 - planCenterY * zoom,
      zoom
    };
    this.requestUpdate();
  }

  private resetView(): void {
    this.fitToScreen();
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
    if (this.isDashboardMode) return null;
    if (this.is3DMode) {
      return "Vue 3D Interactive : Glisser (clic gauche/droit) pour pivoter 360°, Molette pour zoomer, Shift+glisser pour déplacer.";
    }
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
        class="canvas-container ${this.isPanning ? 'is-panning' : ''} ${this.isOrbiting ? 'is-orbiting' : ''} ${this.isDashboardMode ? 'dashboard-mode' : ''}"
        @wheel=${this.handleWheel}
        @pointerdown=${this.handlePointerDown}
        @pointermove=${this.handlePointerMove}
        @pointerup=${this.handlePointerUp}
        @contextmenu=${(e: MouseEvent) => { if (this.is3DMode) e.preventDefault(); }}
        @dragover=${this.handleDragOver}
        @drop=${this.handleDrop}
      >
        <div 
          class="viewport-3d-wrapper ${this.is3DMode ? 'mode-3d' : ''}"
          style="${this.is3DMode 
            ? `transform: rotateX(${this.orbitPitch}deg) rotateZ(${this.orbitYaw}deg); transition: ${this.isOrbiting ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'};` 
            : (this.viewRotation !== 0 ? `transform: rotate(${this.viewRotation}deg); transform-origin: center center; transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);` : '')}"
        >
          <svg class="main-viewport">
            ${this.renderBackgroundLayer()}
            ${this.renderGhostLayer()}
            ${this.renderGrid()}
            ${this.renderRooms()}
            ${this.renderFurniture()}
            ${this.renderWalls()}
            ${this.renderOpenings()}
            ${this.renderOpeningPreview()}
            ${this.renderPreviewWall()}
            ${this.renderCalibrationLine()}
            ${this.renderRescaleLine()}
            ${this.renderSmartGuides()}
            ${this.renderSnapIndicator()}
            ${this.renderEntityBindings()}
            ${this.renderMarqueeBox()}
          </svg>
        </div>

        ${!this.isDashboardMode && helpMsg ? html`<div class="help-hud">${helpMsg}</div>` : null}

        ${!this.isDashboardMode ? html`
          <div class="coords-hud ${(this.selectedElements.wallIds.length + this.selectedElements.openingIds.length + this.selectedElements.roomIds.length + this.selectedElements.bindingIds.length + (this.selectedElements.furnitureIds?.length || 0)) > 0 ? 'selection-active' : ''}">
            <span style="color: #38bdf8;">X:</span>
            <span>${this.cursorCoords.x.toFixed(2)} m</span>
            <span style="opacity: 0.35;">|</span>
            <span style="color: #38bdf8;">Y:</span>
            <span>${this.cursorCoords.y.toFixed(2)} m</span>
            <span style="opacity: 0.35;">|</span>
            <span style="color: #94a3b8;">Outil:</span>
            <span style="color: #f1f5f9; font-weight: 700;">${this.activeTool.toUpperCase()}</span>
          </div>
        ` : null}

        <!-- HUD Contrôles Zoom & 3D -->
        <div class="canvas-hud">
          <button 
            class="hud-btn ${this.is3DMode ? 'active' : ''}" 
            @click=${this.toggle3DMode} 
            title="Basculer Vue 2D / 3D Isométrique"
          >
            ${this.is3DMode ? '🧊' : '📐'}
          </button>

          ${this.is3DMode ? html`
            <div class="hud-preset-group">
              <span class="hud-angle-badge">${Math.round(this.orbitYaw)}° / ${Math.round(this.orbitPitch)}°</span>
              <button class="hud-preset-btn" @click=${() => this.setCameraPreset(55, -35)} title="Vue Sud-Ouest (Défaut)">SO</button>
              <button class="hud-preset-btn" @click=${() => this.setCameraPreset(55, 35)} title="Vue Sud-Est">SE</button>
              <button class="hud-preset-btn" @click=${() => this.setCameraPreset(55, 125)} title="Vue Nord-Est">NE</button>
              <button class="hud-preset-btn" @click=${() => this.setCameraPreset(55, -125)} title="Vue Nord-Ouest">NO</button>
              <button class="hud-preset-btn" @click=${() => this.setCameraPreset(75, 0)} title="Vue Plongeante">Top</button>
            </div>
          ` : null}

          <!-- Rotation du plan d'un quart de tour à gauche (90°) -->
          <button 
            class="hud-btn" 
            @click=${this.rotateQuarterTurn} 
            title="Pivoter le plan d'un quart de tour à gauche (↺ 90°)"
          >
            ↺
          </button>

          <!-- Zoom automatique et centrage sur l'écran -->
          <button 
            class="hud-btn" 
            @click=${() => this.fitToScreen(40)} 
            title="Ajuster automatiquement à la page (Zoom auto & centrage)"
          >
            ⛶
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
