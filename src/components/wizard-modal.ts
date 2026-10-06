import { LitElement, html, css, nothing } from 'lit';
import { state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { defineElement } from '../core/define';
import { RoomTemplate } from '../core/types';
import { LocalizeController, formatNumber, localize } from '../i18n';
import '../i18n/locales/ui';
import { uiThemeStyles } from '../styles/theme.styles';
import { deepActiveElement, focusableElements } from '../panel/a11y';

/** Gabarit de pièce : son nom est traduit au rendu (clé `ui.wizard.template.<id>`). */
type WizardTemplate = Omit<RoomTemplate, 'name'>;

const PREDEFINED_TEMPLATES: readonly WizardTemplate[] = [
  {
    id: 'living',
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
    icon: '📐',
    widthMeters: 5.0,
    lengthMeters: 4.0,
    wallThickness: 0.20,
    color: 'rgba(148, 163, 184, 0.15)',
    addDoor: true,
    addWindow: true,
  }
];

/** Épaisseurs proposées (mètres) : doivent couvrir celles des gabarits. Libellé : `ui.wizard.thickness.<key>`. */
const THICKNESS_OPTIONS: ReadonlyArray<{ value: number; key: string }> = [
  { value: 0.10, key: 'partition' },
  { value: 0.15, key: 'wall' },
  { value: 0.20, key: 'load_bearing' },
  { value: 0.30, key: 'exterior' },
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
/** Largeurs des ouvertures ajoutées par le panneau (porte standard, fenêtre). */
const DOOR_WIDTH = 0.90;
const WINDOW_WIDTH = 1.20;

const TITLE_ID = 'wizard-title';
const NAME_INPUT_ID = 'wizard-room-name';
const THICKNESS_SELECT_ID = 'wizard-thickness';
const DIMENSIONS_ERROR_ID = 'wizard-error-dimensions';
const HEIGHT_ERROR_ID = 'wizard-error-height';

type NumericField = 'width' | 'length' | 'height';

interface FieldCheck {
  value: number | null;
  error: string | null;
}

function templateName(tmpl: WizardTemplate): string {
  return localize(`ui.wizard.template.${tmpl.id}`);
}

/** Nombre au plus à deux décimales, dans la langue courante (« 4,5 » / « 4.5 »). */
function formatValue(value: number): string {
  return formatNumber(value, { maximumFractionDigits: 2 });
}

/** Longueur en mètres à deux décimales (« 0,90 m » / « 0.90 m »). */
function formatMeters(value: number): string {
  return localize('ui.unit.m', { value: formatNumber(value, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) });
}

/** Nombre décimal saisi au clavier, avec point ou virgule (« 4,5 », « 4.5 », « ,5 »). */
const DECIMAL_INPUT = /^-?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/;

/** Saisie brute -> nombre borné ; accepte la virgule décimale. Ne réécrit jamais le champ. */
function checkMeters(raw: string, limits: MeterLimits): FieldCheck {
  const text = raw.trim();
  if (text === '') return { value: null, error: localize('ui.wizard.error.required') };
  if (!DECIMAL_INPUT.test(text)) return { value: null, error: localize('ui.wizard.error.invalid') };
  const value = Number(text.replace(',', '.'));
  if (!Number.isFinite(value) || value < limits.min || value > limits.max) {
    return { value: null, error: localize('ui.wizard.error.range', { min: formatValue(limits.min), max: formatValue(limits.max) }) };
  }
  return { value, error: null };
}

export class HomeArchitectWizardModal extends LitElement {
  static styles = [uiThemeStyles, css`
    :host {
      --wz-accent-ink: color-mix(in srgb, var(--arch-ui-accent) 55%, var(--arch-ui-text));
      --wz-hover-bg: color-mix(in srgb, var(--arch-ui-accent) 12%, var(--arch-ui-surface));

      position: fixed;
      inset: 0;
      background: var(--arch-ui-overlay);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--arch-ui-font);
      color: var(--arch-ui-text);
    }

    .modal-card {
      width: 90%;
      max-width: 540px;
      max-height: 92vh;
      overflow-y: auto;
      box-sizing: border-box;
      background: var(--arch-ui-surface);
      border: 1px solid var(--arch-ui-border);
      border-radius: 18px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
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
      border-bottom: 1px solid var(--arch-ui-border);
      padding-bottom: 12px;
    }

    .modal-title {
      font-size: 1.2rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 0;
      color: var(--arch-ui-text);
    }

    .btn-close {
      background: transparent;
      border: none;
      color: var(--arch-ui-text-muted);
      font-size: 20px;
      cursor: pointer;
      line-height: 1;
      border-radius: 6px;
      padding: 2px 6px;
    }

    .btn-close:hover {
      color: var(--arch-ui-text);
      background: var(--arch-ui-surface-2);
    }

    .templates-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }

    @media (max-width: 480px) {
      .templates-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .template-card {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 12px;
      padding: 12px 8px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      color: var(--arch-ui-text);
      font: inherit;
    }

    .template-card:hover {
      background: var(--wz-hover-bg);
      border-color: var(--arch-ui-accent);
      transform: translateY(-2px);
    }

    .template-card.selected {
      background: color-mix(in srgb, var(--arch-ui-accent) 20%, var(--arch-ui-surface));
      border-color: var(--arch-ui-accent);
      box-shadow: 0 0 12px color-mix(in srgb, var(--arch-ui-accent) 30%, transparent);
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
      color: var(--arch-ui-text-muted);
    }

    .config-section {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
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
      flex-wrap: wrap;
      gap: 8px 12px;
    }

    .field-label {
      font-size: 0.85rem;
      color: var(--arch-ui-text);
    }

    .field-inputs {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    input[type="text"], select {
      background: var(--arch-ui-surface);
      border: 1px solid var(--arch-ui-border);
      color: var(--arch-ui-text);
      padding: 6px 10px;
      border-radius: 6px;
      font: inherit;
      font-size: 0.85rem;
      width: 75px;
      outline: none;
      text-align: center;
    }

    input[type="text"]:focus, select:focus {
      border-color: var(--arch-ui-accent);
      box-shadow: var(--arch-ui-focus-ring);
    }

    input.name-input {
      width: 160px;
      text-align: left;
      padding-left: 8px;
    }

    select {
      width: auto;
      text-align: left;
    }

    .surface-badge {
      font-weight: 700;
      color: var(--wz-accent-ink);
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .checkboxes-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 18px;
      font-size: 0.85rem;
      color: var(--arch-ui-text);
    }

    .checkboxes-row label {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }

    .checkboxes-row input {
      accent-color: var(--arch-ui-accent);
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 4px;
    }

    .btn {
      padding: 9px 18px;
      border-radius: 8px;
      font: inherit;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 1px solid transparent;
    }

    .btn-cancel {
      background: var(--arch-ui-surface-2);
      color: var(--arch-ui-text);
      border-color: var(--arch-ui-border);
    }

    .btn-cancel:hover {
      background: var(--wz-hover-bg);
    }

    .btn-create {
      background: var(--arch-ui-accent);
      color: var(--arch-ui-accent-text);
      border-color: var(--arch-ui-accent);
      box-shadow: 0 0 12px color-mix(in srgb, var(--arch-ui-accent) 35%, transparent);
    }

    .btn-create:hover:not(:disabled) {
      background: color-mix(in srgb, var(--arch-ui-accent) 85%, black);
      transform: translateY(-1px);
    }

    .btn-create:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      box-shadow: none;
    }

    /* Focus clavier visible même sur les éléments qui portent déjà une ombre (gabarit choisi, bouton principal). */
    .template-card:focus-visible,
    .btn:focus-visible {
      outline: 2px solid var(--arch-ui-accent);
      outline-offset: 2px;
    }

    .field-block {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .field-error {
      align-self: flex-end;
      font-size: 0.75rem;
      color: var(--arch-ui-danger);
      font-weight: 600;
    }

    input[aria-invalid="true"] {
      border-color: var(--arch-ui-danger);
    }
  `];

  @state()
  private selectedTemplate: WizardTemplate = PREDEFINED_TEMPLATES[0];

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

  /** Nom saisi par l'utilisateur ; null = nom du gabarit, dans la langue courante. */
  @state()
  private roomName: string | null = null;

  /** Re-rendu au changement de langue. */
  private readonly i18n = new LocalizeController(this);

  /** Élément qui avait le focus à l'ouverture (bouton de la barre d'outils) : il le retrouve à la fermeture. */
  private returnFocusTo: HTMLElement | null = null;
  private schemeObserver: MutationObserver | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.returnFocusTo = deepActiveElement();
    this.addEventListener('keydown', this.handleKeyDown);
    this.followHostScheme();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleKeyDown);
    this.schemeObserver?.disconnect();
    this.schemeObserver = null;
    const target = this.returnFocusTo;
    this.returnFocusTo = null;
    if (target?.isConnected && target !== document.body) target.focus({ preventScroll: true });
  }

  protected firstUpdated() {
    // Focus initial : le gabarit sélectionné (groupe radio parcouru aux flèches).
    this.renderRoot.querySelector<HTMLElement>('.template-card[aria-checked="true"]')?.focus({ preventScroll: true });
  }

  /** Reprend le schéma clair/sombre (attribut `scheme`) de l'élément qui contient la modale (le panneau). */
  private followHostScheme() {
    const root = this.getRootNode();
    const themed = root instanceof ShadowRoot ? root.host : null;
    if (!themed) return;
    const sync = () => {
      const scheme = themed.getAttribute('scheme');
      if (scheme) this.setAttribute('scheme', scheme);
      else this.removeAttribute('scheme');
    };
    sync();
    this.schemeObserver = new MutationObserver(sync);
    this.schemeObserver.observe(themed, { attributes: true, attributeFilter: ['scheme'] });
  }

  /** Échap ferme la modale ; Tab et Maj+Tab restent dans la modale (piège de focus). */
  private handleKeyDown = (e: KeyboardEvent) => {
    // Échap pendant une composition (IME) annule seulement la saisie en cours.
    if (e.key === 'Escape' && !e.isComposing) {
      e.preventDefault();
      e.stopPropagation();
      this.handleClose();
      return;
    }
    if (e.key !== 'Tab') return;
    const card = this.renderRoot.querySelector<HTMLElement>('.modal-card');
    if (!card) return;
    const items = focusableElements(card);
    if (items.length === 0) {
      e.preventDefault();
      return;
    }
    const active = this.shadowRoot?.activeElement;
    const first = items[0];
    const last = items[items.length - 1];
    if (!active || !items.includes(active as HTMLElement)) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  private selectTemplate(tmpl: WizardTemplate) {
    this.selectedTemplate = tmpl;
    this.widthText = String(tmpl.widthMeters);
    this.lengthText = String(tmpl.lengthMeters);
    this.heightText = String(tmpl.heightMeters ?? DEFAULT_HEIGHT);
    this.thickness = tmpl.wallThickness;
    this.addDoor = tmpl.addDoor;
    this.addWindow = tmpl.addWindow;
    this.roomName = null;
    this.touched = {};
    this.submitAttempted = false;
  }

  /** Gabarits au clavier (groupe radio) : les flèches sélectionnent le gabarit voisin. */
  private handleTemplateKeyDown(e: KeyboardEvent) {
    const index = PREDEFINED_TEMPLATES.indexOf(this.selectedTemplate);
    let next: number;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = (index + 1) % PREDEFINED_TEMPLATES.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        next = (index - 1 + PREDEFINED_TEMPLATES.length) % PREDEFINED_TEMPLATES.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = PREDEFINED_TEMPLATES.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    this.selectTemplate(PREDEFINED_TEMPLATES[next]);
    void this.updateComplete.then(() =>
      this.renderRoot.querySelector<HTMLElement>('.template-card[aria-checked="true"]')?.focus());
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
    const defaultName = templateName(this.selectedTemplate);
    const name = ((this.roomName ?? defaultName).trim() || defaultName).slice(0, MAX_ROOM_NAME_LENGTH);
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

  /** `errorId` : identifiant du message d'erreur affiché pour ce champ (aria-describedby), s'il y en a un. */
  private renderMetersInput(field: NumericField, value: string, check: FieldCheck, limits: MeterLimits, errorId: string | null, onInput: (v: string) => void) {
    const showError = check.error !== null && (this.touched[field] || this.submitAttempted);
    return html`
      <input
        type="text"
        inputmode="decimal"
        autocomplete="off"
        aria-label=${localize('ui.wizard.field_range', {
          field: localize(`ui.wizard.field.${field}`),
          min: formatValue(limits.min),
          max: formatValue(limits.max),
        })}
        aria-invalid=${showError ? 'true' : 'false'}
        aria-describedby=${errorId ?? nothing}
        .value=${live(value)}
        @input=${(e: Event) => onInput((e.target as HTMLInputElement).value)}
        @change=${() => this.markTouched(field)}
      />
    `;
  }

  /** Première erreur à afficher parmi les champs d'une ligne (champ quitté, ou tentative de validation). */
  private shownError(...entries: Array<[NumericField, FieldCheck]>): [NumericField, FieldCheck] | undefined {
    return entries.find(([field, check]) => check.error !== null && (this.touched[field] || this.submitAttempted));
  }

  private renderFieldError(id: string, shown: [NumericField, FieldCheck] | undefined) {
    return shown ? html`<span class="field-error" id=${id} role="alert">${shown[1].error}</span>` : nothing;
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
      ? formatNumber(fields.width.value * fields.length.value, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
      : '—';
    const thicknessValue = this.thickness.toFixed(2);
    const defaultName = templateName(this.selectedTemplate);
    const dimensionsError = this.shownError(['width', fields.width], ['length', fields.length]);
    const heightError = this.shownError(['height', fields.height]);
    const errorIdFor = (field: NumericField, shown: [NumericField, FieldCheck] | undefined, id: string) =>
      shown?.[0] === field ? id : null;

    return html`
      <form
        class="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby=${TITLE_ID}
        novalidate
        @submit=${this.handleSubmit}
      >
        <div class="modal-header">
          <h2 class="modal-title" id=${TITLE_ID}>
            <span aria-hidden="true">🪄</span>
            <span>${localize('ui.wizard.title')}</span>
          </h2>
          <button
            type="button"
            class="btn-close"
            title=${localize('ui.common.close')}
            aria-label=${localize('ui.common.close')}
            @click=${this.handleClose}
          ><span aria-hidden="true">✕</span></button>
        </div>

        <!-- Gabarits prédéfinis -->
        <div
          class="templates-grid"
          role="radiogroup"
          aria-label=${localize('ui.wizard.templates')}
          @keydown=${this.handleTemplateKeyDown}
        >
          ${PREDEFINED_TEMPLATES.map((tmpl) => {
            const selected = this.selectedTemplate.id === tmpl.id;
            return html`
              <button
                type="button"
                class="template-card ${selected ? 'selected' : ''}"
                role="radio"
                aria-checked=${selected ? 'true' : 'false'}
                tabindex=${selected ? 0 : -1}
                @click=${() => this.selectTemplate(tmpl)}
              >
                <span class="template-icon" aria-hidden="true">${tmpl.icon}</span>
                <span class="template-name">${templateName(tmpl)}</span>
                <span class="template-dims">${localize('ui.wizard.template_dims', {
                  width: formatValue(tmpl.widthMeters),
                  length: formatValue(tmpl.lengthMeters),
                })}</span>
              </button>
            `;
          })}
        </div>

        <!-- Paramétrage précis des dimensions -->
        <div class="config-section">
          <div class="field-row">
            <label class="field-label" for=${NAME_INPUT_ID}>${localize('ui.wizard.room_name')}</label>
            <input
              id=${NAME_INPUT_ID}
              type="text"
              class="name-input"
              maxlength=${MAX_ROOM_NAME_LENGTH}
              placeholder=${defaultName}
              .value=${live(this.roomName ?? defaultName)}
              @input=${(e: Event) => this.roomName = (e.target as HTMLInputElement).value}
            />
          </div>

          <div class="field-block">
            <div class="field-row" role="group" aria-labelledby="wizard-dimensions-label">
              <span class="field-label" id="wizard-dimensions-label">${localize('ui.wizard.dimensions')}</span>
              <div class="field-inputs">
                ${this.renderMetersInput('width', this.widthText, fields.width, DIMENSION_LIMITS,
                  errorIdFor('width', dimensionsError, DIMENSIONS_ERROR_ID), v => this.widthText = v)}
                <span aria-hidden="true">${localize('ui.wizard.unit_times')}</span>
                ${this.renderMetersInput('length', this.lengthText, fields.length, DIMENSION_LIMITS,
                  errorIdFor('length', dimensionsError, DIMENSIONS_ERROR_ID), v => this.lengthText = v)}
                <span aria-hidden="true">${localize('ui.wizard.unit_m')}</span>
              </div>
            </div>
            ${this.renderFieldError(DIMENSIONS_ERROR_ID, dimensionsError)}
          </div>

          <div class="field-row">
            <span class="field-label">${localize('ui.wizard.area')}</span>
            <span class="surface-badge" aria-live="polite">${localize('ui.unit.m2', { value: areaM2 })}</span>
          </div>

          <div class="field-block">
            <div class="field-row" role="group" aria-labelledby="wizard-height-label">
              <span class="field-label" id="wizard-height-label">${localize('ui.wizard.height')}</span>
              <div class="field-inputs">
                ${this.renderMetersInput('height', this.heightText, fields.height, HEIGHT_LIMITS,
                  errorIdFor('height', heightError, HEIGHT_ERROR_ID), v => this.heightText = v)}
                <span aria-hidden="true">${localize('ui.wizard.unit_m')}</span>
              </div>
            </div>
            ${this.renderFieldError(HEIGHT_ERROR_ID, heightError)}
          </div>

          <div class="field-row">
            <label class="field-label" for=${THICKNESS_SELECT_ID}>${localize('ui.wizard.thickness')}</label>
            <select
              id=${THICKNESS_SELECT_ID}
              .value=${live(thicknessValue)}
              @change=${(e: Event) => this.thickness = parseFloat((e.target as HTMLSelectElement).value)}
            >
              ${THICKNESS_OPTIONS.map(opt => html`
                <option value=${opt.value.toFixed(2)} ?selected=${opt.value.toFixed(2) === thicknessValue}>${localize(`ui.wizard.thickness.${opt.key}`)}</option>
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
              <span>${localize('ui.wizard.add_door', { width: formatMeters(DOOR_WIDTH) })}</span>
            </label>

            <label>
              <input
                type="checkbox"
                .checked=${live(this.addWindow)}
                @change=${(e: Event) => this.addWindow = (e.target as HTMLInputElement).checked}
              />
              <span>${localize('ui.wizard.add_window', { width: formatMeters(WINDOW_WIDTH) })}</span>
            </label>
          </div>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn btn-cancel" @click=${this.handleClose}>${localize('ui.common.cancel')}</button>
          <button
            type="submit"
            class="btn btn-create"
            ?disabled=${!isValid}
            title=${localize(isValid ? 'ui.wizard.create' : 'ui.wizard.fix_dimensions')}
          >
            ${localize('ui.wizard.create')}
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
