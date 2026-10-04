import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './components/canvas-view';
import './components/toolbar';
import './components/wizard-modal';
import './components/room-modal';
import './components/calibrate-modal';
import './components/entity-drawer';
import './components/import-modal';
import { ImportModalResult } from './components/import-modal';
import './components/rescale-modal';
import { RescaleModalResult } from './components/rescale-modal';
import './components/export-modal';
import { SnappingEngine } from './core/snapping';
import { PolygonUtils } from './core/polygon';
import { 
  ActiveTool, HomeArchitectProject, Wall, Opening, Room, Point, EntityBinding, SelectedElements 
} from './core/types';

@customElement('home-architect-panel')
export class HomeArchitectPanel extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      overflow: hidden;
      background: #0f172a;
      color: #f8fafc;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      position: absolute;
      inset: 0;
      box-sizing: border-box;
    }

    header.top-bar {
      min-height: 56px;
      max-width: 100%;
      background: rgba(30, 41, 59, 0.9);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 14px;
      z-index: 30;
      flex-shrink: 0;
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
      box-sizing: border-box;
      gap: 10px;
    }

    header.top-bar::-webkit-scrollbar {
      display: none;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.15rem;
      font-weight: 700;
      color: #f1f5f9;
    }

    .brand-icon {
      font-size: 1.4rem;
    }

    .brand-tag {
      font-size: 0.75rem;
      padding: 2px 8px;
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border-radius: 9999px;
      border: 1px solid rgba(56, 189, 248, 0.3);
      font-weight: 600;
    }

    .top-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .control-group {
      display: flex;
      align-items: center;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 2px 8px;
      gap: 6px;
      font-size: 0.85rem;
    }

    .control-group label {
      color: #94a3b8;
      font-size: 0.8rem;
    }

    select, input[type="range"] {
      background: transparent;
      color: #f8fafc;
      border: none;
      outline: none;
      font-size: 0.85rem;
      cursor: pointer;
    }

    select option {
      background: #1e293b;
      color: #f8fafc;
    }

    button.btn-primary {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      border-radius: 8px;
      padding: 6px 14px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    button.btn-primary:hover {
      background: #0369a1;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
    }

    button.btn-import {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.4);
      border-radius: 8px;
      padding: 6px 13px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    button.btn-import:hover {
      background: #10b981;
      color: #ffffff;
      box-shadow: 0 0 14px rgba(16, 185, 129, 0.45);
    }

    button.btn-rescale {
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 8px;
      padding: 6px 13px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    button.btn-rescale:hover, button.btn-rescale.active {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.45);
    }

    button.btn-drawer {
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    button.btn-drawer:hover, button.btn-drawer.active {
      background: #0284c7;
      color: #ffffff;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
    }

    button.btn-3d {
      background: rgba(147, 51, 234, 0.15);
      color: #c084fc;
      border: 1px solid rgba(147, 51, 234, 0.3);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    button.btn-3d.active {
      background: #9333ea;
      color: #ffffff;
      box-shadow: 0 0 12px rgba(192, 132, 252, 0.5);
    }

    button.btn-wizard {
      background: rgba(245, 158, 11, 0.2);
      color: #f59e0b;
      border: 1px solid rgba(245, 158, 11, 0.4);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    button.btn-wizard:hover {
      background: #f59e0b;
      color: #ffffff;
    }

    button.btn-export {
      background: rgba(168, 85, 247, 0.2);
      color: #c084fc;
      border: 1px solid rgba(168, 85, 247, 0.45);
      border-radius: 8px;
      padding: 6px 13px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    button.btn-export:hover {
      background: #9333ea;
      color: #ffffff;
      box-shadow: 0 0 14px rgba(168, 85, 247, 0.5);
    }

    .workspace {
      flex: 1;
      display: flex;
      flex-direction: row;
      width: 100%;
      height: calc(100% - 56px);
      min-height: 0;
      min-width: 0;
      overflow: hidden;
      position: relative;
      box-sizing: border-box;
    }

    button.btn-history {
      background: rgba(51, 65, 85, 0.6);
      color: #f1f5f9;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 0.84rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    button.btn-history:hover:not(:disabled) {
      background: #0284c7;
      border-color: #38bdf8;
      color: #ffffff;
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.35);
    }

    button.btn-history:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .selection-hud {
      position: absolute;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(14px);
      border: 1.5px solid #06b6d4;
      border-radius: 12px;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(6, 182, 212, 0.35);
      z-index: 60;
      animation: popSelection 0.2s ease-out;
      white-space: nowrap;
    }

    @keyframes popSelection {
      from { opacity: 0; transform: translate(-50%, -10px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }

    .selection-info {
      font-size: 0.88rem;
      font-weight: 700;
      color: #e2e8f0;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .btn-delete-selection {
      background: #ef4444;
      color: #ffffff;
      border: 1px solid #f87171;
      border-radius: 8px;
      padding: 6px 13px;
      font-size: 0.84rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s ease;
      box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);
    }

    .btn-delete-selection:hover {
      background: #dc2626;
      transform: scale(1.03);
    }

    .btn-clear-selection {
      background: transparent;
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 0.84rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-clear-selection:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .canvas-area {
      flex: 1;
      min-width: 0;
      height: 100%;
      position: relative;
      overflow: hidden;
    }

    .level-selector {
      display: flex;
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      overflow: hidden;
    }

    .level-btn {
      padding: 5px 12px;
      font-size: 0.8rem;
      background: transparent;
      color: #94a3b8;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .level-btn.active {
      background: rgba(56, 189, 248, 0.2);
      color: #38bdf8;
      font-weight: 600;
    }

    .scale-indicator {
      font-size: 0.8rem;
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, monospace;
      padding: 2px 6px;
    }

    .toast-notification {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(12px);
      border: 1px solid #38bdf8;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(56, 189, 248, 0.35);
      border-radius: 12px;
      padding: 10px 22px;
      font-size: 0.88rem;
      font-weight: 600;
      color: #f8fafc;
      z-index: 80;
      animation: popToast 0.25s ease-out;
      display: flex;
      align-items: center;
      gap: 10px;
      pointer-events: none;
    }

    @keyframes popToast {
      from { transform: translate(-50%, -12px); opacity: 0; }
      to { transform: translate(-50%, 0); opacity: 1; }
    }
  `;

  @property({ type: Object })
  public hass: any;

  @property({ type: Boolean })
  public narrow: boolean = false;

  @state()
  private activeTool: ActiveTool = 'wall';

  @state()
  private currentThickness: number = 0.20;

  @state()
  private currentOpeningWidth: number = 0.90;

  @state()
  private activeLevel: string = 'rdc';

  @state()
  private is3DMode: boolean = false;

  @state()
  private isDrawerCollapsed: boolean = false;

  @state()
  private isWizardOpen: boolean = false;

  @state()
  private isImportModalOpen: boolean = false;

  @state()
  private isExportModalOpen: boolean = false;

  @state()
  private isCalibrateModalOpen: boolean = false;

  @state()
  private calibrationData: { pixelDistance: number; defaultMeters: number } | null = null;

  @state()
  private isRescaleModalOpen: boolean = false;

  @state()
  private rescaleMeasuredMeters: number = 0;

  @state()
  private selectedRoomForEdit: Room | null = null;

  @state()
  private selectedElements: SelectedElements = {
    wallIds: [],
    openingIds: [],
    roomIds: [],
    bindingIds: []
  };

  @state()
  private undoStack: HomeArchitectProject[] = [];

  @state()
  private redoStack: HomeArchitectProject[] = [];

  @state()
  private project: HomeArchitectProject = {
    id: 'rdc',
    name: 'Rez-de-Chaussée',
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

  private fileInputRef: HTMLInputElement | null = null;

  private handleToolSelected(e: CustomEvent<{ tool: ActiveTool }>) {
    this.activeTool = e.detail.tool;
    if (this.activeTool === 'door') {
      this.currentOpeningWidth = 0.90;
    } else if (this.activeTool === 'window') {
      this.currentOpeningWidth = 1.20;
    } else if (this.activeTool === 'french_window') {
      this.currentOpeningWidth = 2.00;
    }
  }

  private handleProjectChanged(e: CustomEvent<{ project: HomeArchitectProject }>) {
    this.pushUndoSnapshot();
    this.project = { ...e.detail.project };
  }

  private handleThicknessChange(e: Event) {
    this.currentThickness = parseFloat((e.target as HTMLSelectElement).value);
  }

  private handleOpeningWidthChange(e: Event) {
    this.currentOpeningWidth = parseFloat((e.target as HTMLSelectElement).value);
  }

  private handleCreateRoomFromWizard(e: CustomEvent<any>) {
    this.pushUndoSnapshot();
    const { name, width, length, thickness, height, color, icon, addDoor, addWindow } = e.detail;
    const roomH = height || 2.50;

    const startX = 2.0;
    const startY = 2.0;

    const p1: Point = { x: startX, y: startY };
    const p2: Point = { x: startX + width, y: startY };
    const p3: Point = { x: startX + width, y: startY + length };
    const p4: Point = { x: startX, y: startY + length };

    const wTop: Wall = {
      id: `w_top_${Date.now()}`,
      start: p1,
      end: p2,
      thickness,
      height: roomH,
      type: 'standard'
    };
    const wRight: Wall = {
      id: `w_right_${Date.now()}`,
      start: p2,
      end: p3,
      thickness,
      height: roomH,
      type: 'standard'
    };
    const wBottom: Wall = {
      id: `w_bottom_${Date.now()}`,
      start: p3,
      end: p4,
      thickness,
      height: roomH,
      type: 'standard'
    };
    const wLeft: Wall = {
      id: `w_left_${Date.now()}`,
      start: p4,
      end: p1,
      thickness,
      height: roomH,
      type: 'standard'
    };

    const newOpenings: Opening[] = [];

    if (addDoor) {
      newOpenings.push({
        id: `op_door_${Date.now()}`,
        wallId: wBottom.id,
        type: 'door',
        offset: width / 2,
        width: 0.90,
        flipSide: false,
        flipDirection: false
      });
    }

    if (addWindow) {
      newOpenings.push({
        id: `op_win_${Date.now()}`,
        wallId: wTop.id,
        type: 'window',
        offset: width / 2,
        width: 1.20,
        flipSide: false,
        flipDirection: false
      });
    }

    const newRoom: Room = {
      id: `room_${Date.now()}`,
      name,
      polygon: [p1, p2, p3, p4],
      areaM2: width * length,
      color,
      icon,
      height: roomH
    };

    this.project = {
      ...this.project,
      walls: [...this.project.walls, wTop, wRight, wBottom, wLeft],
      openings: [...this.project.openings, ...newOpenings],
      rooms: [...this.project.rooms, newRoom]
    };

    this.isWizardOpen = false;
    this.activeTool = 'select';
  }

  @state()
  private toastMessage: string | null = null;
  private toastTimeout: any = null;
  private _boundPaste: any = null;
  private _boundKeyDown: any = null;

  connectedCallback() {
    super.connectedCallback();
    this._boundPaste = this.handlePaste.bind(this);
    window.addEventListener('paste', this._boundPaste);
    this._boundKeyDown = this.handleKeyDown.bind(this);
    window.addEventListener('keydown', this._boundKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._boundPaste) {
      window.removeEventListener('paste', this._boundPaste);
    }
    if (this._boundKeyDown) {
      window.removeEventListener('keydown', this._boundKeyDown);
    }
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
  }

  public showToast(msg: string) {
    this.toastMessage = msg;
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastMessage = null;
    }, 4500);
  }

  public loadBackgroundImage(dataUrl: string, sourceLabel: string = 'Plan chargé !') {
    const img = new Image();
    img.onload = () => {
      this.pushUndoSnapshot();
      this.project = {
        ...this.project,
        background: {
          imageUrl: dataUrl,
          opacity: 0.40,
          visible: true,
          offset: { x: 0, y: 0 },
          scale: 1.0,
          rotation: 0,
          widthPx: img.naturalWidth,
          heightPx: img.naturalHeight
        }
      };
      this.activeTool = 'calibrate';
      this.showToast(`${sourceLabel} Tracez un segment sur un mur mesuré pour étalonner l'échelle (📏).`);
    };
    img.onerror = () => {
      this.showToast('❌ Erreur lors du chargement de l\'image.');
    };
    img.src = dataUrl;
  }

  private handleImportConfirmed(e: CustomEvent<ImportModalResult>) {
    this.pushUndoSnapshot();
    const { 
      dataUrl, widthPx, heightPx, opacity, mode, totalWidthMeters,
      isSvgVectorized, svgInterpretation, keepSvgBackground 
    } = e.detail;
    this.isImportModalOpen = false;

    // Traitement du mode Vectorisation Intelligente SVG
    if (isSvgVectorized && svgInterpretation && svgInterpretation.success) {
      const { walls, openings, rooms, pixelsPerMeter: svgPpm, stats } = svgInterpretation;

      const bgPlan = keepSvgBackground ? {
        imageUrl: dataUrl,
        opacity: opacity !== undefined ? opacity : 0.25,
        visible: true,
        offset: { x: 0, y: 0 },
        scale: 1.0,
        rotation: 0,
        widthPx,
        heightPx
      } : undefined;

      this.project = {
        ...this.project,
        pixelsPerMeter: svgPpm || this.project.pixelsPerMeter,
        walls: [...this.project.walls, ...walls],
        openings: [...this.project.openings, ...openings],
        rooms: [...this.project.rooms, ...rooms],
        background: bgPlan
      };

      this.activeTool = 'select';
      this.showToast(
        `✨ Plan SVG converti : ${stats.wallCount} mur${stats.wallCount > 1 ? 's' : ''}, ${stats.doorCount} porte${stats.doorCount > 1 ? 's' : ''}, ${stats.windowCount} fenêtre${stats.windowCount > 1 ? 's' : ''} et ${stats.roomCount} pièce${stats.roomCount > 1 ? 's' : ''} créés !`
      );
      return;
    }

    // Traitement standard (image de fond ou calque passif)
    let calculatedPpm = this.project.pixelsPerMeter;
    if (mode === 'auto_dimension' && totalWidthMeters && totalWidthMeters > 0) {
      calculatedPpm = Math.round((widthPx / totalWidthMeters) * 10) / 10;
    }

    this.project = {
      ...this.project,
      pixelsPerMeter: calculatedPpm,
      background: {
        imageUrl: dataUrl,
        opacity: opacity !== undefined ? opacity : 0.40,
        visible: true,
        offset: { x: 0, y: 0 },
        scale: 1.0,
        rotation: 0,
        widthPx,
        heightPx
      }
    };

    if (mode === 'auto_dimension') {
      this.activeTool = 'wall';
      this.showToast(`✅ Plan importé et étalonné automatiquement (1 m = ${calculatedPpm} px) ! Vous pouvez tracer vos murs (🧱).`);
    } else {
      this.activeTool = 'calibrate';
      this.showToast('📏 Plan importé ! Tracez un segment sur un mur mesuré pour étalonner l\'échelle.');
    }
  }

  private handlePaste(e: ClipboardEvent) {
    if (this.isImportModalOpen) return; // Le modal gère lui-même son collage si ouvert
    if (!e.clipboardData) return;

    // 1. Image brute dans le presse-papier
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          const reader = new FileReader();
          reader.onload = (loadEvt) => {
            const dataUrl = loadEvt.target?.result as string;
            this.loadBackgroundImage(dataUrl, '📋 Image collée depuis le presse-papier !');
          };
          reader.readAsDataURL(file);
          return;
        }
      }
    }

    // 2. Traitement du texte dans le presse-papier (Code SVG ou URL)
    const text = e.clipboardData.getData('text/plain')?.trim();

    // 2a. Code SVG brut
    if (text && (text.startsWith('<svg') || (text.startsWith('<?xml') && text.includes('<svg')))) {
      e.preventDefault();
      this.isImportModalOpen = true;
      this.showToast('📥 Code SVG détecté ! Configurez la vectorisation automatique.');
      return;
    }

    // 3. URL ou data-url en texte brut
    if (text && (text.startsWith('data:image/') || text.match(/\.(png|jpe?g|svg|webp)(\?.*)?$/i))) {
      e.preventDefault();
      this.loadBackgroundImage(text, '📋 Image chargée depuis l\'URL collée !');
    }
  }

  private triggerFileInput() {
    if (!this.fileInputRef) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.style.display = 'none';
      input.addEventListener('change', (e: any) => this.handleFileSelected(e));
      document.body.appendChild(input);
      this.fileInputRef = input;
    }
    this.fileInputRef.click();
  }

  private handleFileSelected(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const dataUrl = loadEvent.target?.result as string;
      this.loadBackgroundImage(dataUrl, '🖼️ Image importée depuis votre ordinateur !');
    };
    reader.readAsDataURL(file);
  }

  private handleRequestCalibration(e: CustomEvent<{ pixelDistance: number; defaultMeters: number }>) {
    this.calibrationData = e.detail;
    this.isCalibrateModalOpen = true;
  }

  private handleCalibrateConfirmed(e: CustomEvent<{ pixelsPerMeter: number }>) {
    this.pushUndoSnapshot();
    const { pixelsPerMeter } = e.detail;
    this.project = {
      ...this.project,
      pixelsPerMeter: Math.round(pixelsPerMeter * 10) / 10
    };
    this.isCalibrateModalOpen = false;
    this.calibrationData = null;
    this.activeTool = 'wall';
  }

  private handleRequestRescale(e: CustomEvent<{ measuredMeters: number }>) {
    this.rescaleMeasuredMeters = e.detail.measuredMeters;
    this.isRescaleModalOpen = true;
  }

  private handleRescaleConfirmed(e: CustomEvent<RescaleModalResult>) {
    this.pushUndoSnapshot();
    const { currentMeters, targetMeters, scaleFactor, adjustBackground } = e.detail;
    this.isRescaleModalOpen = false;

    if (scaleFactor <= 0 || isNaN(scaleFactor)) return;

    // 1. Recalcul de tous les murs (coordonnées et cotes)
    const newWalls: Wall[] = this.project.walls.map(w => ({
      ...w,
      start: {
        x: SnappingEngine.roundMeters(w.start.x * scaleFactor),
        y: SnappingEngine.roundMeters(w.start.y * scaleFactor)
      },
      end: {
        x: SnappingEngine.roundMeters(w.end.x * scaleFactor),
        y: SnappingEngine.roundMeters(w.end.y * scaleFactor)
      }
    }));

    // 2. Recalcul de toutes les ouvertures
    const newOpenings: Opening[] = this.project.openings.map(op => ({
      ...op,
      offset: SnappingEngine.roundMeters(op.offset * scaleFactor),
      width: SnappingEngine.roundMeters(op.width * scaleFactor)
    }));

    // 3. Recalcul de toutes les pièces et de leurs surfaces en m²
    const newRooms: Room[] = this.project.rooms.map(room => {
      const newPolygon = room.polygon.map(p => ({
        x: SnappingEngine.roundMeters(p.x * scaleFactor),
        y: SnappingEngine.roundMeters(p.y * scaleFactor)
      }));
      const newArea = PolygonUtils.computeArea(newPolygon);
      return {
        ...room,
        polygon: newPolygon,
        areaM2: newArea || SnappingEngine.roundMeters(room.areaM2 * scaleFactor * scaleFactor)
      };
    });

    // 4. Recalcul des liaisons d'entités domotiques
    const newBindings: EntityBinding[] = this.project.bindings.map(b => ({
      ...b,
      position: {
        x: SnappingEngine.roundMeters(b.position.x * scaleFactor),
        y: SnappingEngine.roundMeters(b.position.y * scaleFactor)
      }
    }));

    // 5. Ajustement de l'échelle du calque de fond (si présent)
    let newPpm = this.project.pixelsPerMeter;
    let newBg = this.project.background ? { ...this.project.background } : undefined;
    if (adjustBackground && newBg) {
      newPpm = Math.round((this.project.pixelsPerMeter / scaleFactor) * 10) / 10;
      if (newBg.offset) {
        newBg = {
          ...newBg,
          offset: {
            x: SnappingEngine.roundMeters(newBg.offset.x * scaleFactor),
            y: SnappingEngine.roundMeters(newBg.offset.y * scaleFactor)
          }
        };
      }
    }

    this.project = {
      ...this.project,
      pixelsPerMeter: newPpm,
      walls: newWalls,
      openings: newOpenings,
      rooms: newRooms,
      bindings: newBindings,
      background: newBg
    };

    this.activeTool = 'select';
    this.showToast(
      `✅ Plan mis à l'échelle (×${scaleFactor.toFixed(3)}) : ${newWalls.length} murs et ${newRooms.length} pièces recalculés !`
    );
  }

  private handleOpacityChange(e: Event) {
    const opacity = parseFloat((e.target as HTMLInputElement).value);
    if (this.project.background) {
      this.project = {
        ...this.project,
        background: { ...this.project.background, opacity }
      };
    }
  }

  private handleDefaultCeilingChange(val: number) {
    this.project = {
      ...this.project,
      defaultCeilingHeight: val
    };
    this.showToast(`📐 Hauteur plafond 3D par défaut : ${val.toFixed(2)} m`);
  }

  private handleSaveRoom(e: CustomEvent<any>) {
    this.pushUndoSnapshot();
    const { roomId, name, height, color } = e.detail;
    const updatedRooms = this.project.rooms.map(r => {
      if (r.id === roomId) {
        return { ...r, name, height, color };
      }
      return r;
    });

    this.project = {
      ...this.project,
      rooms: updatedRooms
    };
    this.selectedRoomForEdit = null;
    this.showToast(`✨ Pièce "${name}" mise à jour (H: ${height.toFixed(2)} m) !`);
  }

  private handleDeleteRoom(e: CustomEvent<any>) {
    this.pushUndoSnapshot();
    const { roomId } = e.detail;
    this.project = {
      ...this.project,
      rooms: this.project.rooms.filter(r => r.id !== roomId)
    };
    this.selectedRoomForEdit = null;
    this.showToast('🗑️ Pièce supprimée');
  }

  private pushUndoSnapshot(snapshot?: HomeArchitectProject) {
    const snap = JSON.parse(JSON.stringify(snapshot || this.project));
    this.undoStack = [...this.undoStack.slice(-39), snap];
    this.redoStack = [];
  }

  private handleUndo() {
    if (this.undoStack.length === 0) return;
    const previous = this.undoStack[this.undoStack.length - 1];
    const newUndo = this.undoStack.slice(0, -1);
    const currentSnap = JSON.parse(JSON.stringify(this.project));
    this.redoStack = [...this.redoStack.slice(-39), currentSnap];
    this.undoStack = newUndo;
    this.project = previous;
    this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] };
    this.showToast('↩️ Action annulée');
  }

  private handleRedo() {
    if (this.redoStack.length === 0) return;
    const next = this.redoStack[this.redoStack.length - 1];
    const newRedo = this.redoStack.slice(0, -1);
    const currentSnap = JSON.parse(JSON.stringify(this.project));
    this.undoStack = [...this.undoStack.slice(-39), currentSnap];
    this.redoStack = newRedo;
    this.project = next;
    this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] };
    this.showToast('↪️ Action rétablie');
  }

  private handleDeleteSelected() {
    const { wallIds, openingIds, roomIds, bindingIds } = this.selectedElements;
    const total = wallIds.length + openingIds.length + roomIds.length + bindingIds.length;
    if (total === 0) return;

    this.pushUndoSnapshot();

    const remainingWalls = this.project.walls.filter(w => !wallIds.includes(w.id));
    const remainingOpenings = this.project.openings.filter(
      op => !openingIds.includes(op.id) && !wallIds.includes(op.wallId)
    );
    const remainingRooms = this.project.rooms.filter(r => !roomIds.includes(r.id));
    const remainingBindings = this.project.bindings.filter(b => !bindingIds.includes(b.id));

    this.project = {
      ...this.project,
      walls: remainingWalls,
      openings: remainingOpenings,
      rooms: remainingRooms,
      bindings: remainingBindings
    };

    this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] };
    this.showToast(`🗑️ ${total} élément${total > 1 ? 's' : ''} supprimé${total > 1 ? 's' : ''} !`);
  }

  private clearSelection() {
    this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] };
  }

  private getSelectedSummary(): string {
    const parts: string[] = [];
    if (this.selectedElements.wallIds.length > 0) {
      parts.push(`${this.selectedElements.wallIds.length} mur${this.selectedElements.wallIds.length > 1 ? 's' : ''}`);
    }
    if (this.selectedElements.openingIds.length > 0) {
      parts.push(`${this.selectedElements.openingIds.length} ouvrant${this.selectedElements.openingIds.length > 1 ? 's' : ''}`);
    }
    if (this.selectedElements.roomIds.length > 0) {
      parts.push(`${this.selectedElements.roomIds.length} pièce${this.selectedElements.roomIds.length > 1 ? 's' : ''}`);
    }
    if (this.selectedElements.bindingIds.length > 0) {
      parts.push(`${this.selectedElements.bindingIds.length} entité${this.selectedElements.bindingIds.length > 1 ? 's' : ''}`);
    }
    return parts.join(', ');
  }

  private handleKeyDown(e: KeyboardEvent) {
    const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || (e.target as HTMLElement)?.isContentEditable) {
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
      e.preventDefault();
      this.handleUndo();
    } else if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'y' || (e.key.toLowerCase() === 'z' && e.shiftKey))) {
      e.preventDefault();
      this.handleRedo();
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      const total = this.selectedElements.wallIds.length + 
                    this.selectedElements.openingIds.length + 
                    this.selectedElements.roomIds.length + 
                    this.selectedElements.bindingIds.length;
      if (total > 0) {
        e.preventDefault();
        this.handleDeleteSelected();
      }
    } else if (e.key === 'Escape') {
      this.clearSelection();
    } else if (e.key.toLowerCase() === 'v') {
      this.activeTool = 'select';
    }
  }

  private saveProject() {
    if (this.hass && this.hass.callWS) {
      this.hass.callWS({
        type: 'home_architect/save_project',
        project: this.project
      }).then(() => {
        alert('Plan sauvegardé avec succès dans Home Assistant !');
      }).catch((err: any) => {
        console.error('Erreur sauvegarde HA:', err);
        localStorage.setItem(`home_architect_${this.project.id}`, JSON.stringify(this.project));
        alert('Sauvegardé localement dans le navigateur.');
      });
    } else {
      localStorage.setItem(`home_architect_${this.project.id}`, JSON.stringify(this.project));
      alert('Plan sauvegardé localement !');
    }
  }

  render() {
    const hasBg = !!this.project.background?.imageUrl;

    return html`
      <header class="top-bar">
        <div class="brand">
          <span class="brand-icon">📐</span>
          <span>Home Architect</span>
          <span class="brand-tag">Studio & Décalque</span>
        </div>

        <div class="level-selector">
          <button class="level-btn ${this.activeLevel === 'sous-sol' ? 'active' : ''}" @click=${() => this.activeLevel = 'sous-sol'}>Sous-Sol</button>
          <button class="level-btn ${this.activeLevel === 'rdc' ? 'active' : ''}" @click=${() => this.activeLevel = 'rdc'}>RDC</button>
          <button class="level-btn ${this.activeLevel === 'etage1' ? 'active' : ''}" @click=${() => this.activeLevel = 'etage1'}>1er Étage</button>
          <button class="level-btn ${this.activeLevel === 'jardin' ? 'active' : ''}" @click=${() => this.activeLevel = 'jardin'}>Jardin</button>
        </div>

        <div class="top-controls">
          <!-- Historique Annuler / Rétablir -->
          <div class="control-group" style="padding: 2px 4px; gap: 4px;">
            <button 
              class="btn-history" 
              @click=${this.handleUndo} 
              ?disabled=${this.undoStack.length === 0}
              title="Annuler la dernière action (Ctrl+Z / Cmd+Z)"
            >
              ↩️ Annuler
            </button>
            <button 
              class="btn-history" 
              @click=${this.handleRedo} 
              ?disabled=${this.redoStack.length === 0}
              title="Rétablir l'action (Ctrl+Y / Cmd+Shift+Z)"
            >
              ↪️ Rétablir
            </button>
          </div>

          <!-- Bouton Importer un plan (Automatisé) -->
          <button class="btn-import" @click=${() => this.isImportModalOpen = true} title="Importer et calibrer un plan image (PNG, JPG, SVG)">
            <span>📥</span>
            <span>Importer un plan</span>
          </button>

          <!-- Bouton Mettre à l'échelle (Recalculer toutes les cotes) -->
          <button 
            class="btn-rescale ${this.activeTool === 'rescale' ? 'active' : ''}" 
            @click=${() => this.activeTool = 'rescale'} 
            title="Mettre à l'échelle : mesurer un mur ou deux points pour recalculer toutes les cotes (S)"
          >
            <span>📐</span>
            <span>Mettre à l'échelle</span>
          </button>

          <!-- Bascule 2D / 3D -->
          <button 
            class="btn-3d ${this.is3DMode ? 'active' : ''}" 
            @click=${() => this.is3DMode = !this.is3DMode}
          >
            ${this.is3DMode ? '🧊 Vue 3D' : '📐 Vue 2D'}
          </button>

          <!-- Assistant Débutant -->
          <button class="btn-wizard" @click=${() => this.isWizardOpen = true}>
            🪄 Assistant Pièce
          </button>

          <!-- Volet Entités HA -->
          <button 
            class="btn-drawer ${!this.isDrawerCollapsed ? 'active' : ''}" 
            @click=${() => this.isDrawerCollapsed = !this.isDrawerCollapsed}
            title="Afficher / Masquer le volet des entités"
          >
            ⚡ Entités HA (${this.project.bindings.length})
          </button>

          <!-- Bouton Exporter vers Lovelace -->
          <button 
            class="btn-export" 
            @click=${() => this.isExportModalOpen = true} 
            title="Exporter le plan vers Lovelace (Carte Picture-Elements ou Carte 2D/3D)"
          >
            <span>📤</span>
            <span>Exporter Lovelace</span>
          </button>

          <!-- Épaisseur mur -->
          ${this.activeTool === 'wall' ? html`
            <div class="control-group">
              <label>Épaisseur :</label>
              <select @change=${this.handleThicknessChange}>
                <option value="0.10">Cloison 10 cm</option>
                <option value="0.15">Mur 15 cm</option>
                <option value="0.20" selected>Porteur 20 cm</option>
                <option value="0.30">Extérieur 30 cm</option>
              </select>
            </div>
          ` : null}

          <!-- Largeur ouvrant -->
          ${this.activeTool === 'door' || this.activeTool === 'window' || this.activeTool === 'french_window' ? html`
            <div class="control-group">
              <label>Largeur :</label>
              <select @change=${this.handleOpeningWidthChange}>
                <option value="0.73">73 cm (Étroite)</option>
                <option value="0.83">83 cm (Chambre)</option>
                <option value="0.90" selected>90 cm (Standard)</option>
                <option value="1.20">1.20 m (Fenêtre)</option>
                <option value="1.40">1.40 m (Double)</option>
                <option value="2.00">2.00 m (Baie)</option>
                <option value="2.40">2.40 m (Grande baie)</option>
              </select>
            </div>
          ` : null}

          <!-- Hauteur sous plafond globale en mode 3D -->
          ${this.is3DMode ? html`
            <div class="control-group" title="Hauteur sous plafond par défaut (3D)">
              <label>Plafond 3D :</label>
              <select @change=${(e: any) => this.handleDefaultCeilingChange(parseFloat(e.target.value))}>
                <option value="2.10" ?selected=${(this.project.defaultCeilingHeight || 2.50) === 2.10}>2.10 m (Sous-sol)</option>
                <option value="2.30" ?selected=${(this.project.defaultCeilingHeight || 2.50) === 2.30}>2.30 m (Combles)</option>
                <option value="2.50" ?selected=${!this.project.defaultCeilingHeight || this.project.defaultCeilingHeight === 2.50}>2.50 m (Standard)</option>
                <option value="2.70" ?selected=${(this.project.defaultCeilingHeight || 2.50) === 2.70}>2.70 m (Élevé)</option>
                <option value="3.00" ?selected=${(this.project.defaultCeilingHeight || 2.50) === 3.00}>3.00 m (Haussmann)</option>
                <option value="3.50" ?selected=${(this.project.defaultCeilingHeight || 2.50) === 3.50}>3.50 m (Cathédrale)</option>
              </select>
            </div>
          ` : null}

          <!-- Opacité du fond -->
          ${hasBg ? html`
            <div class="control-group">
              <label>Fond :</label>
              <input 
                type="range" 
                min="0.05" 
                max="1.0" 
                step="0.05" 
                .value=${this.project.background?.opacity || 0.4}
                @input=${this.handleOpacityChange}
                style="width: 70px;"
                title="Opacité du plan de fond"
              />
            </div>
          ` : null}

          <div class="scale-indicator" title="Échelle : pixels par mètre">
            1 m = ${this.project.pixelsPerMeter} px
          </div>

          <!-- Sauvegarde -->
          <button class="btn-primary" @click=${this.saveProject}>
            💾 Sauvegarder
          </button>
        </div>
      </header>

      <div class="workspace">
        <div class="canvas-area">
          <home-architect-toolbar 
            .activeTool=${this.activeTool}
            .canUndo=${this.undoStack.length > 0}
            .canRedo=${this.redoStack.length > 0}
            @undo=${this.handleUndo}
            @redo=${this.handleRedo}
            @tool-selected=${this.handleToolSelected}
            @open-wizard=${() => this.isWizardOpen = true}
            @open-import-modal=${() => this.isImportModalOpen = true}
            @trigger-upload-background=${() => this.isImportModalOpen = true}
          ></home-architect-toolbar>

          <home-architect-canvas
            .hass=${this.hass}
            .project=${this.project}
            .activeTool=${this.activeTool}
            .currentWallThickness=${this.currentThickness}
            .currentOpeningWidth=${this.currentOpeningWidth}
            .is3DMode=${this.is3DMode}
            .selectedElements=${this.selectedElements}
            @selection-changed=${(e: any) => this.selectedElements = e.detail.selectedElements}
            @request-delete-selected=${this.handleDeleteSelected}
            @toggle-3d=${(e: any) => this.is3DMode = e.detail.is3DMode}
            @room-selected=${(e: any) => this.selectedRoomForEdit = e.detail.room}
            @project-changed=${this.handleProjectChanged}
            @request-calibration=${this.handleRequestCalibration}
            @request-rescale=${this.handleRequestRescale}
            @background-image-loaded=${(e: any) => this.loadBackgroundImage(e.detail.dataUrl, '🖼️ Image de plan glissée-déposée !')}
          ></home-architect-canvas>

          <!-- Floating HUD de sélection multi-éléments -->
          ${(this.selectedElements.wallIds.length + 
             this.selectedElements.openingIds.length + 
             this.selectedElements.roomIds.length + 
             this.selectedElements.bindingIds.length) > 0 ? html`
            <div class="selection-hud">
              <span class="selection-info">
                <span>🎯</span>
                <span>${this.getSelectedSummary()} sélectionné(s)</span>
              </span>
              <button class="btn-delete-selection" @click=${this.handleDeleteSelected} title="Supprimer les éléments sélectionnés (Touche Suppr / Retour)">
                <span>🗑️</span>
                <span>Supprimer</span>
              </button>
              <button class="btn-clear-selection" @click=${this.clearSelection} title="Désélectionner tout (Échap)">
                ✕
              </button>
            </div>
          ` : null}

          <!-- Notification Toast -->
          ${this.toastMessage ? html`
            <div class="toast-notification">
              ${this.toastMessage}
            </div>
          ` : null}
        </div>

        <!-- Volet latéral des entités HA : Toujours visible et docké -->
        <home-architect-entity-drawer
          .hass=${this.hass}
          ?collapsed=${this.isDrawerCollapsed}
          @toggle-collapse=${() => this.isDrawerCollapsed = !this.isDrawerCollapsed}
        ></home-architect-entity-drawer>
      </div>

      <!-- Modal d'Import Automatisé -->
      ${this.isImportModalOpen ? html`
        <home-architect-import-modal
          .currentLevel=${this.activeLevel}
          @import-confirmed=${this.handleImportConfirmed}
          @close=${() => this.isImportModalOpen = false}
        ></home-architect-import-modal>
      ` : null}

      <!-- Modal Assistant Pièce Débutant -->
      ${this.isWizardOpen ? html`
        <home-architect-wizard-modal
          @create-room=${this.handleCreateRoomFromWizard}
          @close=${() => this.isWizardOpen = false}
        ></home-architect-wizard-modal>
      ` : null}

      <!-- Modal Propriétés de la Pièce (Hauteur sous plafond 3D, etc.) -->
      ${this.selectedRoomForEdit ? html`
        <home-architect-room-modal
          .room=${this.selectedRoomForEdit}
          @save-room=${this.handleSaveRoom}
          @delete-room=${this.handleDeleteRoom}
          @close=${() => this.selectedRoomForEdit = null}
        ></home-architect-room-modal>
      ` : null}

      <!-- Modal Étalonnage Mesure de Mur -->
      ${this.isCalibrateModalOpen && this.calibrationData ? html`
        <home-architect-calibrate-modal
          .pixelDistance=${this.calibrationData.pixelDistance}
          .defaultMeters=${this.calibrationData.defaultMeters}
          @calibrate-confirmed=${this.handleCalibrateConfirmed}
          @close=${() => this.isCalibrateModalOpen = false}
        ></home-architect-calibrate-modal>
      ` : null}

      <!-- Modal Mettre à l'échelle (Recalcul de toutes les cotes) -->
      ${this.isRescaleModalOpen ? html`
        <home-architect-rescale-modal
          .measuredMeters=${this.rescaleMeasuredMeters}
          .wallCount=${this.project.walls.length}
          .roomCount=${this.project.rooms.length}
          .openingCount=${this.project.openings.length}
          @rescale-confirmed=${this.handleRescaleConfirmed}
          @close=${() => this.isRescaleModalOpen = false}
        ></home-architect-rescale-modal>
      ` : null}

      <!-- Modal Exporter vers Lovelace -->
      ${this.isExportModalOpen ? html`
        <home-architect-export-modal
          .project=${this.project}
          @close=${() => this.isExportModalOpen = false}
        ></home-architect-export-modal>
      ` : null}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-panel': HomeArchitectPanel;
  }
}
