import { LitElement, html, css, nothing } from 'lit';
import { state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { defineElement } from '../core/define';
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

/** Épaisseurs proposées (mètres) : doivent couvrir celles des gabarits. */
const THICKNESS_OPTIONS: ReadonlyArray<{ value: number; label: string }> = [
  { value: 0.10, label: 'Cloison 10 cm' },
  { value: 0.15, label: 'Mur 15 cm' },
  { value: 0.20, label: 'Porteur 20 cm' },
  { value: 0.30, label: 'Extérieur 30 cm' },
];

interface MeterLimits {
  min: number;
  max: number;
}

/** Bornes des saisies (mètres). */
const DIMENSION_LIMITS: MeterLimits = { min: 0.5, max: 50 };
const HEIGHT_LIMITS: MeterLimits = { min: 1.5, max: 10 };
const DEFAULT_HEIGHT = 2.5;
const MAX_ROOM_NAME_LENGTH = 80;

type NumericField = 'width' | 'length' | 'height';

const FIELD_LABELS: Record<NumericField, string> = {
  width: 'Largeur',
  length: 'Longueur',
  height: 'Hauteur sous plafond',
};

interface FieldCheck {
  value: number | null;
  error: string | null;
}

function formatMeters(value: number): string {
  return value.toLocaleString('fr-FR', { maximumFractionDigits: 2 });
}

/** Nombre décimal saisi au clavier, avec point ou virgule (« 4,5 », « 4.5 », « ,5 »). */
const DECIMAL_INPUT = /^-?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/;

/** Saisie brute -> nombre borné ; accepte la virgule décimale. Ne réécrit jamais le champ. */
function checkMeters(raw: string, limits: MeterLimits): FieldCheck {
  const text = raw.trim();
  if (text === '') return { value: null, error: 'Valeur requise' };
  if (!DECIMAL_INPUT.test(text)) return { value: null, error: 'Nombre invalide' };
  const value = Number(text.replace(',', '.'));
  if (!Number.isFinite(value) || value < limits.min || value > limits.max) {
    return { value: null, error: `Entre ${formatMeters(limits.min)} et ${formatMeters(limits.max)} m` };
  }
  return { value, error: null };
}

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

    input[type="text"], select {
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

    input[type="text"]:focus, select:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);
    }

    select {
      width: auto;
      text-align: left;
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

    .btn-create:hover:not(:disabled) {
      background: #0369a1;
      transform: translateY(-1px);
    }

    .btn-create:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      box-shadow: none;
    }

    .field-block {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .field-error {
      align-self: flex-end;
      font-size: 0.75rem;
      color: #f87171;
    }

    input[aria-invalid="true"] {
      border-color: #f87171;
    }
  `;

  @state()
  private selectedTemplate: RoomTemplate = PREDEFINED_TEMPLATES[0];

  // Saisies brutes : validées et bornées à la confirmation, jamais réécrites pendant la frappe.
  @state()
  private widthText: string = String(PREDEFINED_TEMPLATES[0].widthMeters);

  @state()
  private lengthText: string = String(PREDEFINED_TEMPLATES[0].lengthMeters);

  @state()
  private heightText: string = String(PREDEFINED_TEMPLATES[0].heightMeters ?? DEFAULT_HEIGHT);

  /** Champs quittés au moins une fois (l'erreur n'est affichée qu'ensuite, ou après une tentative). */
  @state()
  private touched: Partial<Record<NumericField, boolean>> = {};

  @state()
  private submitAttempted: boolean = false;

  @state()
  private thickness: number = PREDEFINED_TEMPLATES[0].wallThickness;

  @state()
  private addDoor: boolean = PREDEFINED_TEMPLATES[0].addDoor;

  @state()
  private addWindow: boolean = PREDEFINED_TEMPLATES[0].addWindow;

  @state()
  private roomName: string = PREDEFINED_TEMPLATES[0].name;

  private selectTemplate(tmpl: RoomTemplate) {
    this.selectedTemplate = tmpl;
    this.widthText = String(tmpl.widthMeters);
    this.lengthText = String(tmpl.lengthMeters);
    this.heightText = String(tmpl.heightMeters ?? DEFAULT_HEIGHT);
    this.thickness = tmpl.wallThickness;
    this.addDoor = tmpl.addDoor;
    this.addWindow = tmpl.addWindow;
    this.roomName = tmpl.name;
    this.touched = {};
    this.submitAttempted = false;
  }

  private checkFields(): Record<NumericField, FieldCheck> {
    return {
      width: checkMeters(this.widthText, DIMENSION_LIMITS),
      length: checkMeters(this.lengthText, DIMENSION_LIMITS),
      height: checkMeters(this.heightText, HEIGHT_LIMITS),
    };
  }

  private markTouched(field: NumericField) {
    this.touched = { ...this.touched, [field]: true };
  }

  private handleSubmit(e: Event) {
    e.preventDefault();
    const fields = this.checkFields();
    const width = fields.width.value;
    const length = fields.length.value;
    const height = fields.height.value;
    if (width === null || length === null || height === null) {
      this.submitAttempted = true;
      return;
    }
    const name = (this.roomName.trim() || this.selectedTemplate.name).slice(0, MAX_ROOM_NAME_LENGTH);
    this.dispatchEvent(new CustomEvent('create-room', {
      detail: {
        name,
        width,
        length,
        thickness: this.thickness,
        height,
        color: this.selectedTemplate.color,
        icon: this.selectedTemplate.icon,
        addDoor: this.addDoor,
        addWindow: this.addWindow
      },
      bubbles: true,
      composed: true
    }));
  }

  private renderMetersInput(field: NumericField, value: string, check: FieldCheck, limits: MeterLimits, onInput: (v: string) => void) {
    const showError = check.error !== null && (this.touched[field] || this.submitAttempted);
    return html`
      <input
        type="text"
        inputmode="decimal"
        autocomplete="off"
        aria-label=${`${FIELD_LABELS[field]} (${formatMeters(limits.min)} à ${formatMeters(limits.max)} m)`}
        aria-invalid=${showError ? 'true' : 'false'}
        .value=${live(value)}
        @input=${(e: Event) => onInput((e.target as HTMLInputElement).value)}
        @change=${() => this.markTouched(field)}
      />
    `;
  }

  /** Première erreur à afficher parmi les champs d'une ligne (champ quitté, ou tentative de validation). */
  private renderFieldError(...entries: Array<[NumericField, FieldCheck]>) {
    const shown = entries.find(([field, check]) => check.error !== null && (this.touched[field] || this.submitAttempted));
    return shown ? html`<span class="field-error" role="alert">${shown[1].error}</span>` : nothing;
  }

  private handleClose() {
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const fields = this.checkFields();
    const isValid = fields.width.value !== null && fields.length.value !== null && fields.height.value !== null;
    const areaM2 = fields.width.value !== null && fields.length.value !== null
      ? (fields.width.value * fields.length.value).toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
      : '—';
    const thicknessValue = this.thickness.toFixed(2);

    return html`
      <form class="modal-card" novalidate @submit=${this.handleSubmit}>
        <div class="modal-header">
          <div class="modal-title">
            <span>🪄</span>
            <span>Assistant Création de Pièce</span>
          </div>
          <button type="button" class="btn-close" title="Fermer" @click=${this.handleClose}>✕</button>
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
              <div class="template-dims">${formatMeters(tmpl.widthMeters)} m × ${formatMeters(tmpl.lengthMeters)} m</div>
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
              maxlength=${MAX_ROOM_NAME_LENGTH}
              placeholder=${this.selectedTemplate.name}
              .value=${live(this.roomName)}
              @input=${(e: Event) => this.roomName = (e.target as HTMLInputElement).value}
            />
          </div>

          <div class="field-block">
            <div class="field-row">
              <span class="field-label">Dimensions (Largeur × Longueur) :</span>
              <div class="field-inputs">
                ${this.renderMetersInput('width', this.widthText, fields.width, DIMENSION_LIMITS, v => this.widthText = v)}
                <span>m ×</span>
                ${this.renderMetersInput('length', this.lengthText, fields.length, DIMENSION_LIMITS, v => this.lengthText = v)}
                <span>m</span>
              </div>
            </div>
            ${this.renderFieldError(['width', fields.width], ['length', fields.length])}
          </div>

          <div class="field-row">
            <span class="field-label">Superficie calculée :</span>
            <span class="surface-badge">${areaM2} m²</span>
          </div>

          <div class="field-block">
            <div class="field-row">
              <span class="field-label">Hauteur sous plafond (3D) :</span>
              <div class="field-inputs">
                ${this.renderMetersInput('height', this.heightText, fields.height, HEIGHT_LIMITS, v => this.heightText = v)}
                <span>m</span>
              </div>
            </div>
            ${this.renderFieldError(['height', fields.height])}
          </div>

          <div class="field-row">
            <span class="field-label">Épaisseur des murs :</span>
            <select 
              .value=${live(thicknessValue)}
              @change=${(e: Event) => this.thickness = parseFloat((e.target as HTMLSelectElement).value)}
            >
              ${THICKNESS_OPTIONS.map(opt => html`
                <option value=${opt.value.toFixed(2)} ?selected=${opt.value.toFixed(2) === thicknessValue}>${opt.label}</option>
              `)}
            </select>
          </div>

          <div class="checkboxes-row">
            <label>
              <input 
                type="checkbox" 
                .checked=${live(this.addDoor)} 
                @change=${(e: Event) => this.addDoor = (e.target as HTMLInputElement).checked}
              />
              <span>Porte standard (0.90 m)</span>
            </label>

            <label>
              <input 
                type="checkbox" 
                .checked=${live(this.addWindow)} 
                @change=${(e: Event) => this.addWindow = (e.target as HTMLInputElement).checked}
              />
              <span>Fenêtre (1.20 m)</span>
            </label>
          </div>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn btn-cancel" @click=${this.handleClose}>Annuler</button>
          <button
            type="submit"
            class="btn btn-create"
            ?disabled=${!isValid}
            title=${isValid ? 'Générer la pièce sur le plan' : 'Corrigez les dimensions pour continuer'}
          >
            Générer la pièce sur le plan
          </button>
        </div>
      </form>
    `;
  }
}

defineElement('home-architect-wizard-modal', HomeArchitectWizardModal);

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-wizard-modal': HomeArchitectWizardModal;
  }
}
