import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { RoomTemplate } from '../core/types';

const PREDEFINED_TEMPLATES: RoomTemplate[] = [
  {
    id: 'living',
    name: 'Salon / Séjour',
    icon: '🛋️',
    widthMeters: 6.0,
    lengthMeters: 4.5,
    wallThickness: 0.20,
    color: 'rgba(56, 189, 248, 0.15)',
    addDoor: true,
    addWindow: true,
  },
  {
    id: 'bedroom',
    name: 'Chambre',
    icon: '🛏️',
    widthMeters: 4.0,
    lengthMeters: 3.5,
    wallThickness: 0.15,
    color: 'rgba(168, 85, 247, 0.15)',
    addDoor: true,
    addWindow: true,
  },
  {
    id: 'kitchen',
    name: 'Cuisine',
    icon: '🍳',
    widthMeters: 4.0,
    lengthMeters: 3.0,
    wallThickness: 0.15,
    color: 'rgba(234, 179, 8, 0.15)',
    addDoor: true,
    addWindow: true,
  },
  {
    id: 'bathroom',
    name: 'Salle de Bains',
    icon: '🚿',
    widthMeters: 2.5,
    lengthMeters: 2.2,
    wallThickness: 0.10,
    color: 'rgba(20, 184, 166, 0.15)',
    addDoor: true,
    addWindow: false,
  },
  {
    id: 'office',
    name: 'Bureau',
    icon: '💼',
    widthMeters: 3.2,
    lengthMeters: 3.0,
    wallThickness: 0.15,
    color: 'rgba(99, 102, 241, 0.15)',
    addDoor: true,
    addWindow: true,
  },
  {
    id: 'custom',
    name: 'Sur Mesure',
    icon: '📐',
    widthMeters: 5.0,
    lengthMeters: 4.0,
    wallThickness: 0.20,
    color: 'rgba(148, 163, 184, 0.15)',
    addDoor: true,
    addWindow: true,
  }
];

@customElement('home-architect-wizard-modal')
export class HomeArchitectWizardModal extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: #f8fafc;
    }

    .modal-card {
      width: 90%;
      max-width: 540px;
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 18px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      animation: popIn 0.2s ease-out;
    }

    @keyframes popIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 12px;
    }

    .modal-title {
      font-size: 1.2rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
      color: #38bdf8;
    }

    .btn-close {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 20px;
      cursor: pointer;
      line-height: 1;
    }

    .btn-close:hover {
      color: #ffffff;
    }

    .templates-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }

    .template-card {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 12px 8px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }

    .template-card:hover {
      background: rgba(51, 65, 85, 0.8);
      border-color: #38bdf8;
      transform: translateY(-2px);
    }

    .template-card.selected {
      background: rgba(2, 132, 199, 0.25);
      border-color: #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
    }

    .template-icon {
      font-size: 24px;
    }

    .template-name {
      font-size: 0.85rem;
      font-weight: 600;
    }

    .template-dims {
      font-size: 0.72rem;
      color: #94a3b8;
    }

    .config-section {
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .field-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .field-label {
      font-size: 0.85rem;
      color: #cbd5e1;
    }

    .field-inputs {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    input[type="number"], select {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #f8fafc;
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 0.85rem;
      width: 75px;
      outline: none;
      text-align: center;
    }

    input[type="number"]:focus, select:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);
    }

    .surface-badge {
      font-weight: 700;
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .checkboxes-row {
      display: flex;
      gap: 18px;
      font-size: 0.85rem;
      color: #cbd5e1;
    }

    .checkboxes-row label {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 4px;
    }

    .btn {
      padding: 9px 18px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
    }

    .btn-cancel {
      background: rgba(51, 65, 85, 0.7);
      color: #cbd5e1;
    }

    .btn-cancel:hover {
      background: rgba(71, 85, 105, 0.9);
      color: #ffffff;
    }

    .btn-create {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
    }

    .btn-create:hover {
      background: #0369a1;
      transform: translateY(-1px);
    }
  `;

  @state()
  private selectedTemplate: RoomTemplate = PREDEFINED_TEMPLATES[0];

  @state()
  private width: number = PREDEFINED_TEMPLATES[0].widthMeters;

  @state()
  private length: number = PREDEFINED_TEMPLATES[0].lengthMeters;

  @state()
  private thickness: number = PREDEFINED_TEMPLATES[0].wallThickness;

  @state()
  private addDoor: boolean = PREDEFINED_TEMPLATES[0].addDoor;

  @state()
  private addWindow: boolean = PREDEFINED_TEMPLATES[0].addWindow;

  @state()
  private roomName: string = PREDEFINED_TEMPLATES[0].name;

  @state()
  private height: number = 2.50;

  private selectTemplate(tmpl: RoomTemplate) {
    this.selectedTemplate = tmpl;
    this.width = tmpl.widthMeters;
    this.length = tmpl.lengthMeters;
    this.thickness = tmpl.wallThickness;
    this.height = tmpl.heightMeters || 2.50;
    this.addDoor = tmpl.addDoor;
    this.addWindow = tmpl.addWindow;
    this.roomName = tmpl.name;
  }

  private handleCreate() {
    this.dispatchEvent(new CustomEvent('create-room', {
      detail: {
        name: this.roomName,
        width: this.width,
        length: this.length,
        thickness: this.thickness,
        height: this.height,
        color: this.selectedTemplate.color,
        icon: this.selectedTemplate.icon,
        addDoor: this.addDoor,
        addWindow: this.addWindow
      },
      bubbles: true,
      composed: true
    }));
  }

  private handleClose() {
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const areaM2 = (this.width * this.length).toFixed(1);

    return html`
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title">
            <span>🪄</span>
            <span>Assistant Création de Pièce</span>
          </div>
          <button class="btn-close" @click=${this.handleClose}>✕</button>
        </div>

        <!-- Gabarits prédéfinis -->
        <div class="templates-grid">
          ${PREDEFINED_TEMPLATES.map((tmpl) => html`
            <div 
              class="template-card ${this.selectedTemplate.id === tmpl.id ? 'selected' : ''}"
              @click=${() => this.selectTemplate(tmpl)}
            >
              <div class="template-icon">${tmpl.icon}</div>
              <div class="template-name">${tmpl.name}</div>
              <div class="template-dims">${tmpl.widthMeters}m × ${tmpl.lengthMeters}m</div>
            </div>
          `)}
        </div>

        <!-- Paramétrage précis des dimensions -->
        <div class="config-section">
          <div class="field-row">
            <span class="field-label">Nom de la pièce :</span>
            <input 
              type="text" 
              style="width: 160px; text-align: left; padding-left: 8px;"
              .value=${this.roomName}
              @input=${(e: any) => this.roomName = e.target.value}
            />
          </div>

          <div class="field-row">
            <span class="field-label">Dimensions (Largeur × Longueur) :</span>
            <div class="field-inputs">
              <input 
                type="number" 
                step="0.1" 
                min="1" 
                max="30"
                .value=${this.width}
                @input=${(e: any) => this.width = parseFloat(e.target.value) || 1}
              />
              <span>m ×</span>
              <input 
                type="number" 
                step="0.1" 
                min="1" 
                max="30"
                .value=${this.length}
                @input=${(e: any) => this.length = parseFloat(e.target.value) || 1}
              />
              <span>m</span>
            </div>
          </div>

          <div class="field-row">
            <span class="field-label">Superficie calculée :</span>
            <span class="surface-badge">${areaM2} m²</span>
          </div>

          <div class="field-row">
            <span class="field-label">Hauteur sous plafond (3D) :</span>
            <div class="field-inputs">
              <input 
                type="number" 
                step="0.1" 
                min="1.5" 
                max="10"
                .value=${this.height}
                @input=${(e: any) => this.height = parseFloat(e.target.value) || 2.5}
              />
              <span>m</span>
            </div>
          </div>

          <div class="field-row">
            <span class="field-label">Épaisseur des murs :</span>
            <select 
              .value=${this.thickness.toString()}
              @change=${(e: any) => this.thickness = parseFloat(e.target.value)}
            >
              <option value="0.10">Cloison 10 cm</option>
              <option value="0.15">Mur 15 cm</option>
              <option value="0.20">Porteur 20 cm</option>
              <option value="0.30">Extérieur 30 cm</option>
            </select>
          </div>

          <div class="checkboxes-row">
            <label>
              <input 
                type="checkbox" 
                ?checked=${this.addDoor} 
                @change=${(e: any) => this.addDoor = e.target.checked}
              />
              <span>Porte standard (0.90 m)</span>
            </label>

            <label>
              <input 
                type="checkbox" 
                ?checked=${this.addWindow} 
                @change=${(e: any) => this.addWindow = e.target.checked}
              />
              <span>Fenêtre (1.20 m)</span>
            </label>
          </div>
        </div>

        <div class="modal-actions">
          <button class="btn btn-cancel" @click=${this.handleClose}>Annuler</button>
          <button class="btn btn-create" @click=${this.handleCreate}>
            Générer la pièce sur le plan
          </button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-wizard-modal': HomeArchitectWizardModal;
  }
}
