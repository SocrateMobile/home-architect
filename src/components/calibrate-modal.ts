import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { defineElement } from '../core/define';
import { getEventTarget } from '../core/keyboard';
import { LocalizeController, formatNumber, localize } from '../i18n';
import '../i18n/locales/import';
import { applyColorScheme, uiThemeStyles } from '../styles/theme.styles';

/**
 * Portée de l'étalonnage (SPEC §6, constat F51) :
 *  - 'background' : seul le calque de fond change d'échelle, la géométrie déjà tracée est intacte ;
 *  - 'project' : toute la géométrie (et le calque, pour rester superposé) est mise à l'échelle, comme Rescale.
 */
export type CalibrationMode = 'background' | 'project';

/** Détail de `calibrate-confirmed`. */
export interface CalibrateConfirmedDetail {
  /**
   * Échelle équivalente (px/m, non arrondie) pour laquelle le segment tracé mesurerait la longueur
   * saisie : pixelsPerMeter du projet ÷ scaleFactor.
   */
  pixelsPerMeter: number;
  mode: CalibrationMode;
  /** Facteur à appliquer aux longueurs monde : longueur réelle ÷ longueur mesurée (ajout documenté). */
  scaleFactor: number;
}

/** Longueur réelle admise (m) : une saisie en centimètres ou en millimètres en sort. */
const MIN_REAL_METERS = 0.05;
const MAX_REAL_METERS = 1000;
/** Mêmes bornes que la modale de mise à l'échelle. */
const MIN_FACTOR = 0.01;
const MAX_FACTOR = 100;
/** Bornes de pixelsPerMeter appliquées par normalizeProject. */
const MIN_PIXELS_PER_METER = 5;
const MAX_PIXELS_PER_METER = 2000;
/** Éléments atteignables au clavier (piège de focus de la modale). */
const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'a[href]',
  '[tabindex]:not([tabindex="-1"])'
].join(', ');

/** Nombre décimal saisi (virgule ou point acceptés), ou null si la saisie n'est pas un nombre fini. */
function parseDecimal(text: string): number | null {
  const t = text.trim().replace(',', '.');
  if (t === '') return null;
  const v = Number(t);
  return Number.isFinite(v) ? v : null;
}

/** Longueur affichée dans la langue courante (3 décimales au plus). */
function formatMeters(v: number): string {
  return formatNumber(v, { maximumFractionDigits: 3 });
}

/** Élément qui a le focus, en traversant les racines fantômes (canevas, bouton…). */
function deepActiveElement(): HTMLElement | null {
  let active: Element | null = document.activeElement;
  while (active?.shadowRoot?.activeElement) active = active.shadowRoot.activeElement;
  return active instanceof HTMLElement && active !== document.body ? active : null;
}

interface CalibrationEvaluation {
  /** Saisie valide : longueur réelle, facteur et échelle équivalente. */
  value: { realMeters: number; factor: number; pixelsPerMeter: number } | null;
  /** Message d'erreur ('' si la saisie est vide ou valide). */
  error: string;
}

export class HomeArchitectCalibrateModal extends LitElement {
  static styles = [uiThemeStyles, css`
    :host {
      --calibrate-accent-tint: rgba(3, 169, 244, 0.12);
      --calibrate-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);

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

    /* Teinte de sélection dérivée de la couleur principale du thème quand le navigateur sait la mélanger. */
    @supports (color: color-mix(in srgb, red 50%, blue)) {
      :host {
        --calibrate-accent-tint: color-mix(in srgb, var(--arch-ui-accent) 12%, transparent);
      }
    }

    .modal-card {
      width: 90%;
      max-width: 460px;
      max-height: 92vh;
      overflow-y: auto;
      background: var(--arch-ui-surface);
      color: var(--arch-ui-text);
      border: 1px solid var(--arch-ui-border);
      border-radius: var(--arch-ui-radius);
      box-shadow: var(--calibrate-shadow);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      animation: popIn 0.2s ease-out;
    }

    .modal-card:focus,
    .modal-card:focus-visible {
      outline: none;
      box-shadow: var(--calibrate-shadow);
    }

    @keyframes popIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      border-bottom: 1px solid var(--arch-ui-border);
      padding-bottom: 12px;
    }

    .modal-title {
      font-size: 1.15rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--arch-ui-text);
      margin: 0;
    }

    button {
      font-family: inherit;
    }

    .btn-close {
      flex: none;
      border: none;
      background: transparent;
      color: var(--arch-ui-text-muted);
      font-size: 18px;
      line-height: 1;
      cursor: pointer;
      border-radius: 6px;
      padding: 6px;
    }

    .btn-close:hover {
      color: var(--arch-ui-text);
      background: var(--arch-ui-surface-2);
    }

    .modal-desc {
      font-size: 0.85rem;
      color: var(--arch-ui-text-muted);
      line-height: 1.4;
      margin: 0;
    }

    .input-box {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 12px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .input-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }

    .input-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--arch-ui-text);
    }

    .input-field-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .unit-tag {
      font-weight: 600;
      color: var(--arch-ui-text-muted);
    }

    .meters-input {
      background: var(--arch-ui-surface);
      border: 1px solid var(--arch-ui-accent);
      color: var(--arch-ui-text);
      padding: 8px 12px;
      border-radius: 8px;
      font: inherit;
      font-size: 1rem;
      font-weight: 700;
      width: 100px;
      text-align: center;
      outline: none;
    }

    .meters-input:focus {
      box-shadow: var(--arch-ui-focus-ring);
    }

    .meters-input.invalid {
      border-color: var(--arch-ui-danger);
    }

    .field-error {
      color: var(--arch-ui-text);
      font-size: 0.8rem;
      font-weight: 600;
      padding-left: 8px;
      border-left: 3px solid var(--arch-ui-danger);
    }

    .measured-info {
      font-size: 0.75rem;
      color: var(--arch-ui-text-muted);
      font-family: ui-monospace, SFMono-Regular, monospace;
      line-height: 1.5;
    }

    .mode-title {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .mode-options {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .mode-card {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 10px 12px;
      cursor: pointer;
      display: flex;
      gap: 10px;
      align-items: flex-start;
      transition: border-color 0.2s ease, background-color 0.2s ease;
    }

    .mode-card:hover {
      border-color: var(--arch-ui-accent);
    }

    .mode-card.selected {
      border-color: var(--arch-ui-accent);
      background: var(--calibrate-accent-tint);
      box-shadow: inset 0 0 0 1px var(--arch-ui-accent);
    }

    .mode-card input {
      margin-top: 3px;
      accent-color: var(--arch-ui-accent);
      cursor: pointer;
    }

    .mode-content {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .mode-name {
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--arch-ui-text);
    }

    .mode-desc,
    .mode-note {
      font-size: 0.78rem;
      color: var(--arch-ui-text-muted);
      line-height: 1.35;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      flex-wrap: wrap;
    }

    .btn {
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease, filter 0.2s ease;
      border: 1px solid transparent;
    }

    .btn-cancel {
      background: transparent;
      color: var(--arch-ui-text);
      border-color: var(--arch-ui-border);
    }

    .btn-cancel:hover {
      background: var(--arch-ui-surface-2);
    }

    .btn-apply {
      background: var(--arch-ui-accent);
      color: var(--arch-ui-accent-text);
      border-color: var(--arch-ui-accent);
    }

    .btn-apply:hover:not(:disabled) {
      filter: brightness(1.08);
    }

    .btn-apply:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /*
     * Région annoncée aux lecteurs d'écran, toujours présente : une région live insérée avec son texte
     * n'est pas lue de façon fiable. Hors du flux (position absolue) : elle ne crée aucun espacement.
     */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      border: 0;
      overflow: hidden;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      white-space: nowrap;
    }

    /* Anneau de focus en contour pour les boutons radio natifs (certains navigateurs ignorent leur ombre). */
    .mode-card input:focus-visible {
      outline: 2px solid var(--arch-ui-accent);
      outline-offset: 2px;
      box-shadow: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .modal-card {
        animation: none;
      }
    }
  `];

  /** Longueur du segment tracé, en mètres monde à l'échelle actuelle (`request-calibration`). */
  @property({ type: Number })
  public worldDistance: number = 0;

  /**
   * Ancien contrat (`request-calibration` { pixelDistance }) : longueur en pixels monde, convertie en mètres
   * avec `pixelsPerMeter` quand `worldDistance` n'est pas fourni (transition, voir les relais panneau/canevas).
   */
  @property({ type: Number })
  public pixelDistance: number = 0;

  /** Longueur proposée par défaut (m). */
  @property({ type: Number })
  public defaultMeters: number = 4.0;

  /** pixelsPerMeter actuel du projet (sert au calcul de l'échelle équivalente). */
  @property({ type: Number })
  public pixelsPerMeter: number = 50;

  /** Le plan contient-il déjà des éléments (murs, pièces, ouvertures, meubles, entités) ? */
  @property({ type: Boolean })
  public hasGeometry: boolean = false;

  /** Le plan a-t-il un calque de fond ? */
  @property({ type: Boolean })
  public hasBackground: boolean = true;

  /**
   * Objet hass (facultatif) : sert seulement à suivre le thème clair / sombre de Home Assistant.
   * Ce n'est pas une propriété réactive : ses mises à jour fréquentes ne provoquent aucun rendu.
   */
  public get hass(): unknown {
    return this.hassRef;
  }

  public set hass(hass: unknown) {
    this.hassRef = hass;
    if (hass) applyColorScheme(this, hass);
  }

  /** Saisie brute : jamais réécrite pendant la frappe, validée à la confirmation. */
  @state()
  private metersText: string = '';

  @state()
  private mode: CalibrationMode = 'background';

  /** Re-rendu au changement de langue. */
  private readonly i18n = new LocalizeController(this);
  private hassRef: unknown = undefined;
  /** Choix explicite de l'utilisateur (n'est plus écrasé par le choix par défaut). */
  private modeChosen = false;
  /** Élément qui avait le focus à l'ouverture (canevas…) : il le retrouve à la fermeture. */
  private returnFocusTo: HTMLElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.returnFocusTo = deepActiveElement();
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this.handleKeyDown);
    super.disconnectedCallback();
    const returnTo = this.returnFocusTo;
    this.returnFocusTo = null;
    if (returnTo?.isConnected) returnTo.focus({ preventScroll: true });
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has('defaultMeters')) {
      const d = this.defaultMeters;
      // Séparateur décimal de la langue (3,5 / 3.5) ; la saisie accepte la virgule comme le point.
      this.metersText = Number.isFinite(d) && d > 0 ? formatNumber(d, { maximumFractionDigits: 3, useGrouping: false }) : '';
    }
    if (!this.modeChosen && (changed.has('hasGeometry') || changed.has('hasBackground'))) {
      this.mode = this.defaultMode();
    }
  }

  protected firstUpdated() {
    const input = this.renderRoot.querySelector<HTMLInputElement>('.meters-input');
    input?.focus();
    input?.select();
  }

  /**
   * Plan déjà décalqué : la géométrie et le fond sont faux du même facteur, on met tout à l'échelle.
   * Plan vide : seul le calque est concerné. Sans calque, seule la géométrie peut changer.
   */
  private defaultMode(): CalibrationMode {
    return this.hasGeometry ? 'project' : 'background';
  }

  /** Les deux portées n'ont un sens différent que si le plan a des éléments ET un calque. */
  private get modeSelectable(): boolean {
    return this.hasGeometry && this.hasBackground;
  }

  private get effectiveMode(): CalibrationMode {
    if (this.modeSelectable) return this.mode;
    return this.hasGeometry ? 'project' : 'background';
  }

  /** Les touches tapées dans la modale n'atteignent pas les raccourcis globaux du panneau et du canevas. */
  private handleKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === 'Escape') {
      // Échap pendant une composition (IME) l'annule seulement.
      if (e.isComposing) return;
      e.preventDefault();
      this.handleClose();
    } else if (e.key === 'Tab') {
      this.trapFocus(e);
    } else if (e.key === 'Enter' && !e.isComposing) {
      const target = getEventTarget(e);
      if (target instanceof HTMLInputElement && target.type === 'text') {
        e.preventDefault();
        this.handleApply();
      }
    }
  };

  /** Piège de focus : Tab et Maj+Tab bouclent sur les commandes de la boîte de dialogue. */
  private trapFocus(e: KeyboardEvent) {
    const card = this.renderRoot.querySelector<HTMLElement>('.modal-card');
    if (!card) return;
    const items = Array.from(card.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(el => el.getClientRects().length > 0);
    const active = (this.renderRoot as ShadowRoot).activeElement;
    if (items.length === 0) {
      e.preventDefault();
      card.focus();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && (active === first || active === card || !active)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (active === last || !active)) {
      e.preventDefault();
      first.focus();
    }
  }

  /** Longueur mesurée en mètres monde (worldDistance, sinon pixelDistance ÷ pixelsPerMeter), 0 si inconnue. */
  private get measuredMeters(): number {
    if (Number.isFinite(this.worldDistance) && this.worldDistance > 0) return this.worldDistance;
    const px = this.pixelDistance;
    const ppm = this.pixelsPerMeter;
    return Number.isFinite(px) && px > 0 && Number.isFinite(ppm) && ppm > 0 ? px / ppm : 0;
  }

  private evaluate(): CalibrationEvaluation {
    const measured = this.measuredMeters;
    if (!(Number.isFinite(measured) && measured > 0)) {
      return { value: null, error: localize('import.calibrate.error.segment') };
    }
    const ppm = this.pixelsPerMeter;
    if (!(Number.isFinite(ppm) && ppm > 0)) {
      return { value: null, error: localize('import.calibrate.error.scale') };
    }
    const realMeters = parseDecimal(this.metersText);
    if (realMeters === null) {
      return { value: null, error: this.metersText.trim() === '' ? '' : localize('import.calibrate.error.not_number') };
    }
    if (realMeters < MIN_REAL_METERS || realMeters > MAX_REAL_METERS) {
      return {
        value: null,
        error: localize('import.calibrate.error.range', { min: formatMeters(MIN_REAL_METERS), max: formatMeters(MAX_REAL_METERS) })
      };
    }
    const factor = realMeters / measured;
    const pixelsPerMeter = ppm / factor;
    if (factor < MIN_FACTOR || factor > MAX_FACTOR || pixelsPerMeter < MIN_PIXELS_PER_METER || pixelsPerMeter > MAX_PIXELS_PER_METER) {
      return {
        value: null,
        error: localize('import.calibrate.error.out_of_bounds', { factor: formatNumber(factor, { maximumSignificantDigits: 3 }) })
      };
    }
    return { value: { realMeters, factor, pixelsPerMeter }, error: '' };
  }

  private handleApply() {
    const { value } = this.evaluate();
    if (!value) return;
    this.dispatchEvent(new CustomEvent<CalibrateConfirmedDetail>('calibrate-confirmed', {
      detail: {
        pixelsPerMeter: value.pixelsPerMeter,
        mode: this.effectiveMode,
        scaleFactor: value.factor
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

  private selectMode(mode: CalibrationMode) {
    this.mode = mode;
    this.modeChosen = true;
  }

  private renderModeChoice() {
    if (!this.modeSelectable) {
      return html`
        <div class="mode-note">
          ${localize(this.hasGeometry ? 'import.calibrate.mode.no_background' : 'import.calibrate.mode.empty_plan')}
        </div>
      `;
    }
    const option = (mode: CalibrationMode, icon: string, nameKey: string, descKey: string) => html`
      <label class="mode-card ${this.mode === mode ? 'selected' : ''}">
        <input
          type="radio"
          name="calibration-mode"
          aria-labelledby="calibrate-mode-${mode}-name"
          aria-describedby="calibrate-mode-${mode}-desc"
          .checked=${this.mode === mode}
          @change=${() => this.selectMode(mode)}
        />
        <span class="mode-content">
          <span class="mode-name" id="calibrate-mode-${mode}-name">
            <span aria-hidden="true">${icon}</span> ${localize(nameKey)}
          </span>
          <span class="mode-desc" id="calibrate-mode-${mode}-desc">${localize(descKey)}</span>
        </span>
      </label>
    `;
    return html`
      <div class="mode-title" id="calibrate-mode-title">${localize('import.calibrate.mode.title')}</div>
      <div class="mode-options" role="radiogroup" aria-labelledby="calibrate-mode-title">
        ${option('project', '📐', 'import.calibrate.mode.project', 'import.calibrate.mode.project_desc')}
        ${option('background', '🖼️', 'import.calibrate.mode.background', 'import.calibrate.mode.background_desc')}
      </div>
    `;
  }

  render() {
    const ev = this.evaluate();
    const measured = this.measuredMeters;
    const measuredValid = measured > 0;
    const closeLabel = localize('import.common.close');

    return html`
      <div
        class="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="calibrate-title"
        aria-describedby="calibrate-desc"
        tabindex="-1"
      >
        <div class="modal-header">
          <h2 class="modal-title" id="calibrate-title">
            <span aria-hidden="true">📏</span>
            <span>${localize('import.calibrate.title')}</span>
          </h2>
          <button type="button" class="btn-close" title=${closeLabel} aria-label=${closeLabel} @click=${this.handleClose}>
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <p class="modal-desc" id="calibrate-desc">${localize('import.calibrate.desc')}</p>

        <div class="input-box">
          <div class="input-row">
            <label class="input-label" for="calibrate-meters">${localize('import.calibrate.length_label')}</label>
            <div class="input-field-wrapper">
              <input
                id="calibrate-meters"
                type="text"
                inputmode="decimal"
                autocomplete="off"
                class="meters-input ${ev.error ? 'invalid' : ''}"
                aria-invalid=${ev.error ? 'true' : 'false'}
                aria-describedby=${ev.error ? 'calibrate-unit calibrate-error' : 'calibrate-unit'}
                .value=${this.metersText}
                @input=${(e: Event) => this.metersText = (e.target as HTMLInputElement).value}
              />
              <span class="unit-tag" id="calibrate-unit">${localize('import.common.meters')}</span>
            </div>
          </div>
          ${ev.error ? html`<span class="field-error" id="calibrate-error">${ev.error}</span>` : nothing}

          <div class="measured-info">
            ${measuredValid
              ? localize('import.calibrate.segment', { length: formatMeters(measured) })
              : localize('import.calibrate.segment_unknown')}
            ${ev.value ? html`<br />${localize('import.calibrate.factor', {
              factor: formatNumber(ev.value.factor, { minimumFractionDigits: 3, maximumFractionDigits: 3 })
            })}` : nothing}
          </div>
        </div>

        ${this.renderModeChoice()}

        <div class="modal-actions">
          <button type="button" class="btn btn-cancel" @click=${this.handleClose}>${localize('import.common.cancel')}</button>
          <button type="button" class="btn btn-apply" ?disabled=${!ev.value} @click=${this.handleApply}>
            ${localize('import.calibrate.apply')}
          </button>
        </div>

        <!-- Erreur de saisie lue par les lecteurs d'écran (région persistante) -->
        <div class="sr-only" role="status" aria-live="polite">${ev.error}</div>
      </div>
    `;
  }
}

defineElement('home-architect-calibrate-modal', HomeArchitectCalibrateModal);

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-calibrate-modal': HomeArchitectCalibrateModal;
  }
}
