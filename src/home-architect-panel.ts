import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './components/canvas-view';
import './components/toolbar';
import './components/wizard-modal';
import './components/calibrate-modal';
import './components/entity-drawer';
import { 
  ActiveTool, HomeArchitectProject, Wall, Opening, Room, Point 
} from './core/types';

@customElement('home-architect-panel')
export class HomeArchitectPanel extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background: #0f172a;
      color: #f8fafc;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      position: relative;
    }

    header.top-bar {
      height: 56px;
      background: rgba(30, 41, 59, 0.9);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 18px;
      z-index: 30;
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

    .workspace {
      flex: 1;
      position: relative;
      width: 100%;
      height: calc(100vh - 56px);
      overflow: hidden;
    }

    .floating-toolbar {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 20;
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
      top: 72px;
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
  private isDrawerOpen: boolean = false;

  @state()
  private isWizardOpen: boolean = false;

  @state()
  private isCalibrateModalOpen: boolean = false;

  @state()
  private calibrationData: { pixelDistance: number; defaultMeters: number } | null = null;

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
    this.project = { ...e.detail.project };
  }

  private handleThicknessChange(e: Event) {
    this.currentThickness = parseFloat((e.target as HTMLSelectElement).value);
  }

  private handleOpeningWidthChange(e: Event) {
    this.currentOpeningWidth = parseFloat((e.target as HTMLSelectElement).value);
  }

  private handleCreateRoomFromWizard(e: CustomEvent<any>) {
    const { name, width, length, thickness, color, icon, addDoor, addWindow } = e.detail;

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
      type: 'standard'
    };
    const wRight: Wall = {
      id: `w_right_${Date.now()}`,
      start: p2,
      end: p3,
      thickness,
      type: 'standard'
    };
    const wBottom: Wall = {
      id: `w_bottom_${Date.now()}`,
      start: p3,
      end: p4,
      thickness,
      type: 'standard'
    };
    const wLeft: Wall = {
      id: `w_left_${Date.now()}`,
      start: p4,
      end: p1,
      thickness,
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
      icon
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

  connectedCallback() {
    super.connectedCallback();
    this._boundPaste = this.handlePaste.bind(this);
    window.addEventListener('paste', this._boundPaste);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._boundPaste) {
      window.removeEventListener('paste', this._boundPaste);
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

  private handlePaste(e: ClipboardEvent) {
    if (!e.clipboardData) return;

    // 1. Image brute dans le presse-papier (ex: capture d'écran Cmd+Shift+4 / Cmd+C)
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

    // 2. URL ou data-url en texte brut
    const text = e.clipboardData.getData('text/plain')?.trim();
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
    const { pixelsPerMeter } = e.detail;
    this.project = {
      ...this.project,
      pixelsPerMeter: Math.round(pixelsPerMeter * 10) / 10
    };
    this.isCalibrateModalOpen = false;
    this.calibrationData = null;
    this.activeTool = 'wall';
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

          <!-- Tiroir Entités HA -->
          <button 
            class="btn-drawer ${this.isDrawerOpen ? 'active' : ''}" 
            @click=${() => this.isDrawerOpen = !this.isDrawerOpen}
          >
            ⚡ Entités HA (${this.project.bindings.length})
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
        <home-architect-toolbar 
          class="floating-toolbar"
          .activeTool=${this.activeTool}
          @tool-selected=${this.handleToolSelected}
          @open-wizard=${() => this.isWizardOpen = true}
          @trigger-upload-background=${this.triggerFileInput}
        ></home-architect-toolbar>

        <home-architect-canvas
          .hass=${this.hass}
          .project=${this.project}
          .activeTool=${this.activeTool}
          .currentWallThickness=${this.currentThickness}
          .currentOpeningWidth=${this.currentOpeningWidth}
          .is3DMode=${this.is3DMode}
          @toggle-3d=${(e: any) => this.is3DMode = e.detail.is3DMode}
          @project-changed=${this.handleProjectChanged}
          @request-calibration=${this.handleRequestCalibration}
          @background-image-loaded=${(e: any) => this.loadBackgroundImage(e.detail.dataUrl, '🖼️ Image de plan glissée-déposée !')}
        ></home-architect-canvas>

        <!-- Notification Toast -->
        ${this.toastMessage ? html`
          <div class="toast-notification">
            ${this.toastMessage}
          </div>
        ` : null}

        <!-- Tiroir latéral des entités HA -->
        ${this.isDrawerOpen ? html`
          <home-architect-entity-drawer
            .hass=${this.hass}
            @close=${() => this.isDrawerOpen = false}
          ></home-architect-entity-drawer>
        ` : null}
      </div>

      ${this.isWizardOpen ? html`
        <home-architect-wizard-modal
          @create-room=${this.handleCreateRoomFromWizard}
          @close=${() => this.isWizardOpen = false}
        ></home-architect-wizard-modal>
      ` : null}

      ${this.isCalibrateModalOpen && this.calibrationData ? html`
        <home-architect-calibrate-modal
          .pixelDistance=${this.calibrationData.pixelDistance}
          .defaultMeters=${this.calibrationData.defaultMeters}
          @calibrate-confirmed=${this.handleCalibrateConfirmed}
          @close=${() => this.isCalibrateModalOpen = false}
        ></home-architect-calibrate-modal>
      ` : null}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-panel': HomeArchitectPanel;
  }
}
