import { LitElement, html, css, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { defineElement } from '../core/define';
import { getEventTarget } from '../core/keyboard';
import { LocalizeController, formatNumber, getLanguage, localize } from '../i18n';
import '../i18n/locales/geometry';
import { applyColorScheme, uiThemeStyles } from '../styles/theme.styles';
import { DialogFocusController, geometryModalStyles } from './room-modal';

export interface RescaleModalResult {
  currentMeters: number;
  targetMeters: number;
  scaleFactor: number;
  /** False si le projet n'a pas de calque de fond (hasBackground=false) ou si l'utilisateur a décoché l'option. */
  adjustBackground: boolean;
}

/** Bornes du facteur de mise à l'échelle : une saisie en millimètres ou en kilomètres en sort. */
export const RESCALE_MIN_FACTOR = 0.01;
export const RESCALE_MAX_FACTOR = 100;
/** Au-delà de ×10 (ou en deçà de ÷10), une confirmation explicite est demandée. */
export const RESCALE_CONFIRM_FACTOR = 10;

/** Vrai si le facteur est fini et dans [RESCALE_MIN_FACTOR ; RESCALE_MAX_FACTOR] (à revérifier avant d'appliquer). */
export function isValidRescaleFactor(factor: number): boolean {
  return Number.isFinite(factor) && factor >= RESCALE_MIN_FACTOR && factor <= RESCALE_MAX_FACTOR;
}

/** Vrai pour un facteur inhabituel (au-delà de ×10 ou en deçà de ÷10) qui demande une confirmation. */
export function isUnusualRescaleFactor(factor: number): boolean {
  return factor > RESCALE_CONFIRM_FACTOR || factor < 1 / RESCALE_CONFIRM_FACTOR;
}

/** Nombre décimal saisi (virgule ou point acceptés), ou null si la saisie n'est pas un nombre fini. */
function parseDecimal(text: string): number | null {
  const t = text.trim().replace(',', '.');
  if (t === '') return null;
  const v = Number(t);
  return Number.isFinite(v) ? v : null;
}

/** Éléments du plan dénombrés dans la liste des impacts (clés `geometry.count.<nom>.one|other`). */
type CountedElement = 'walls' | 'openings' | 'rooms' | 'furniture' | 'bindings';

/** Forme du pluriel dans la langue courante (« 0 mur » en français, « 0 walls » en anglais). */
function pluralForm(count: number): 'one' | 'other' {
  return new Intl.PluralRules(getLanguage()).select(count) === 'one' ? 'one' : 'other';
}

function countLabel(element: CountedElement, count: number): string {
  return localize(`geometry.count.${element}.${pluralForm(count)}`, { count: formatNumber(count) });
}

/** Ligne d'impact traduite dont le marqueur {subject} est rendu en gras. */
function impactText(key: string, subject: string) {
  const [before, after = ''] = localize(key).split('{subject}');
  return html`${before}<strong>${subject}</strong>${after}`;
}

/** Longueur à deux décimales dans la langue courante. */
function formatMeters(v: number): string {
  return formatNumber(v, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

interface RescaleEvaluation {
  target: number | null;
  factor: number | null;
  error: string;
  unusual: boolean;
}

/** Sous-ensemble de l'objet hass utilisé : le mode sombre (palette de repli des jetons de thème). */
export interface RescaleModalHass {
  themes?: { darkMode?: unknown };
}

export class HomeArchitectRescaleModal extends LitElement {
  static styles = [uiThemeStyles, geometryModalStyles, css`
    :host {
      --modal-success-text: color-mix(in srgb, var(--arch-ui-success) 60%, var(--arch-ui-text));
      --modal-warning-text: color-mix(in srgb, var(--arch-ui-warning) 50%, var(--arch-ui-text));
    }

    /* Navigateur sans color-mix() : texte lisible plutôt qu'un jeton invalide (voir geometryModalStyles). */
    @supports not (color: color-mix(in srgb, red 50%, blue)) {
      :host {
        --modal-success-text: var(--arch-ui-text);
        --modal-warning-text: var(--arch-ui-text);
      }
    }

    .modal-card {
      width: 480px;
    }

    .modal-header {
      padding: 18px 24px;
    }

    .modal-title-group {
      gap: 12px;
    }

    .modal-icon {
      font-size: 1.6rem;
    }

    .modal-title {
      font-size: 1.15rem;
    }

    .modal-subtitle {
      font-size: 0.8rem;
      color: var(--arch-ui-text-muted);
      margin: 2px 0 0 0;
    }

    .modal-body {
      padding: 22px 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      overflow-y: auto;
    }

    .metric-compare {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .metric-box {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 12px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .metric-box.active {
      border-color: var(--modal-accent-text);
      background: var(--modal-accent-soft);
    }

    .metric-label {
      font-size: 0.78rem;
      letter-spacing: 0.5px;
    }

    .metric-val {
      font-size: 1.3rem;
    }

    .metric-box:not(.active) .metric-val {
      color: var(--arch-ui-text);
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .input-label {
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--arch-ui-text);
    }

    .input-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .target-input {
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 1.25rem;
    }

    .unit-tag {
      font-size: 1rem;
      padding: 0 4px;
    }

    .ratio-indicator {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 0.85rem;
    }

    .factor-label {
      color: var(--arch-ui-text-muted);
    }

    .ratio-pill {
      font-size: 0.82rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 9999px;
      font-family: var(--modal-mono);
      white-space: nowrap;
      border: 1px solid transparent;
    }

    .ratio-expand {
      background: color-mix(in srgb, var(--arch-ui-success) 16%, transparent);
      color: var(--modal-success-text);
      border-color: color-mix(in srgb, var(--arch-ui-success) 45%, transparent);
    }

    .ratio-shrink {
      background: color-mix(in srgb, var(--arch-ui-warning) 16%, transparent);
      color: var(--modal-warning-text);
      border-color: color-mix(in srgb, var(--arch-ui-warning) 45%, transparent);
    }

    .ratio-neutral {
      background: var(--arch-ui-surface-2);
      color: var(--arch-ui-text-muted);
    }

    .impact-box {
      display: flex;
      flex-direction: column;
      gap: 6px;
      background: var(--arch-ui-bg);
      border-radius: 10px;
      padding: 12px 14px;
      font-size: 0.8rem;
      color: var(--arch-ui-text-muted);
    }

    .impact-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .impact-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .impact-item strong {
      color: var(--arch-ui-text);
    }

    .impact-icon {
      font-size: 1rem;
    }

    .warning-box {
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: color-mix(in srgb, var(--arch-ui-warning) 12%, transparent);
      border: 1px solid color-mix(in srgb, var(--arch-ui-warning) 45%, transparent);
      border-radius: 10px;
      padding: 10px 12px;
      font-size: 0.82rem;
      color: var(--modal-warning-text);
    }

    .modal-footer {
      padding: 16px 24px;
      justify-content: flex-end;
      gap: 12px;
    }

    .btn-cancel {
      padding: 8px 16px;
      font-size: 0.88rem;
    }

    .btn-primary {
      padding: 8px 20px;
      font-size: 0.88rem;
    }
  `];

  @property({ type: Number })
  public measuredMeters: number = 0;

  @property({ type: Number })
  public wallCount: number = 0;

  @property({ type: Number })
  public roomCount: number = 0;

  @property({ type: Number })
  public openingCount: number = 0;

  @property({ type: Number })
  public furnitureCount: number = 0;

  @property({ type: Number })
  public bindingCount: number = 0;

  /**
   * Le projet a-t-il un calque de fond ? false : l'option d'ajustement du fond est masquée et
   * adjustBackground vaut false. Non renseigné (parent qui ne le transmet pas) : l'option est
   * proposée, cochée, comme avant (le fond éventuel reste superposé au plan).
   */
  @property({ attribute: false })
  public hasBackground?: boolean;

  /** Objet hass : seul hass.themes.darkMode est lu (palette claire ou sombre des jetons de repli). */
  @property({ attribute: false })
  public hass?: RescaleModalHass;

  /** Saisie brute : jamais réécrite pendant la frappe, validée à la confirmation. */
  @state()
  private targetText: string = '';

  @state()
  private adjustBackground: boolean = true;

  @state()
  private unusualConfirmed: boolean = false;

  private readonly i18n = new LocalizeController(this);
  private readonly focusTrap = new DialogFocusController(this);

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this.handleKeyDown);
    super.disconnectedCallback();
  }

  /** hass change à chaque état d'entité : il ne fait que choisir la palette, sans nouveau rendu. */
  protected shouldUpdate(changed: PropertyValues<this>): boolean {
    if (!changed.has('hass')) return true;
    applyColorScheme(this, this.hass);
    return changed.size > 1 || changed.get('hass') === undefined;
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has('measuredMeters')) {
      const measured = this.measuredMeters;
      this.targetText = Number.isFinite(measured) && measured > 0
        ? formatNumber(measured, { maximumFractionDigits: 3, useGrouping: false })
        : '';
      this.unusualConfirmed = false;
    }
  }

  protected firstUpdated() {
    const input = this.renderRoot.querySelector<HTMLInputElement>('#rescale-target');
    input?.focus();
    input?.select();
  }

  /**
   * Les touches tapées dans la modale ne doivent pas atteindre les raccourcis globaux du panneau
   * et du canevas (Retour arrière supprimerait la sélection, « r » ferait pivoter un meuble…).
   */
  private handleKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === 'Escape') {
      e.preventDefault();
      this.close();
    } else if (e.key === 'Tab') {
      this.focusTrap.trapTab(e);
    } else if (e.key === 'Enter' && !e.isComposing) {
      // Entrée dans le champ de saisie valide (sur un bouton ou une case, Entrée garde son action native).
      const target = getEventTarget(e);
      if (target instanceof HTMLInputElement && target.type === 'text') {
        e.preventDefault();
        this.confirm();
      }
    }
  };

  /** Option « ajuster le fond » proposée : fond présent, ou information non transmise par le parent. */
  private get backgroundOptionVisible(): boolean {
    return this.hasBackground !== false;
  }

  private handleInputChange(e: Event) {
    this.targetText = (e.target as HTMLInputElement).value;
    this.unusualConfirmed = false;
  }

  private evaluate(): RescaleEvaluation {
    const measured = this.measuredMeters;
    if (!(Number.isFinite(measured) && measured > 0)) {
      return { target: null, factor: null, error: localize('geometry.rescale.error_measured'), unusual: false };
    }
    const target = parseDecimal(this.targetText);
    if (target === null) {
      const error = this.targetText.trim() === '' ? '' : localize('geometry.rescale.error_number', { example: formatNumber(4.25) });
      return { target: null, factor: null, error, unusual: false };
    }
    if (target <= 0) {
      return { target, factor: null, error: localize('geometry.rescale.error_positive'), unusual: false };
    }
    const factor = target / measured;
    if (!isValidRescaleFactor(factor)) {
      return {
        target,
        factor: null,
        error: localize('geometry.rescale.error_range', {
          factor: formatNumber(factor, { maximumSignificantDigits: 3 }),
          min: formatNumber(RESCALE_MIN_FACTOR),
          max: formatNumber(RESCALE_MAX_FACTOR)
        }),
        unusual: false
      };
    }
    return { target, factor, error: '', unusual: isUnusualRescaleFactor(factor) };
  }

  private isConfirmable(ev: RescaleEvaluation): boolean {
    return ev.factor !== null && !ev.error && Math.abs(ev.factor - 1) > 0.0001 && (!ev.unusual || this.unusualConfirmed);
  }

  private close() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private confirm() {
    const ev = this.evaluate();
    if (!this.isConfirmable(ev) || ev.target === null || ev.factor === null) return;

    this.dispatchEvent(new CustomEvent<RescaleModalResult>('rescale-confirmed', {
      detail: {
        currentMeters: this.measuredMeters,
        targetMeters: ev.target,
        scaleFactor: ev.factor,
        adjustBackground: this.backgroundOptionVisible && this.adjustBackground
      },
      bubbles: true,
      composed: true
    }));
  }

  private renderBackgroundImpact() {
    if (!this.backgroundOptionVisible) return null;
    return html`
      <label class="check-row">
        <input
          type="checkbox"
          .checked=${this.adjustBackground}
          @change=${(e: Event) => this.adjustBackground = (e.target as HTMLInputElement).checked}
        />
        <span>${localize('geometry.rescale.adjust_background')}</span>
      </label>
    `;
  }

  private renderImpact(icon: string, text: ReturnType<typeof impactText>) {
    return html`
      <li class="impact-item">
        <span class="impact-icon" aria-hidden="true">${icon}</span>
        <span>${text}</span>
      </li>
    `;
  }

  render() {
    const ev = this.evaluate();
    const measuredValid = Number.isFinite(this.measuredMeters) && this.measuredMeters > 0;
    const ratio = ev.factor ?? 1.0;
    const ratioText = formatNumber(ratio, { minimumFractionDigits: 3, maximumFractionDigits: 3 });
    const percentText = formatNumber(ratio - 1.0, {
      style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1, signDisplay: 'exceptZero'
    });
    const isValid = this.isConfirmable(ev);
    const describedBy = ev.error ? 'rescale-unit rescale-error' : 'rescale-unit';

    return html`
      <div
        class="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rescale-title"
        aria-describedby="rescale-subtitle"
        tabindex="-1"
      >
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon" aria-hidden="true">📐</span>
            <div>
              <h2 class="modal-title" id="rescale-title">${localize('geometry.rescale.title')}</h2>
              <p class="modal-subtitle" id="rescale-subtitle">${localize('geometry.rescale.subtitle')}</p>
            </div>
          </div>
          <button
            type="button"
            class="btn-close"
            aria-label=${localize('geometry.close')}
            title=${localize('geometry.close')}
            @click=${this.close}
          ><span aria-hidden="true">✕</span></button>
        </div>

        <div class="modal-body">
          <div class="metric-compare">
            <div class="metric-box">
              <span class="metric-label">${localize('geometry.rescale.measured')}</span>
              <span class="metric-val">${localize('geometry.value_m', { value: measuredValid ? formatMeters(this.measuredMeters) : '--' })}</span>
            </div>
            <div class="metric-box active">
              <span class="metric-label">${localize('geometry.rescale.target')}</span>
              <span class="metric-val">${localize('geometry.value_m', { value: ev.target !== null && ev.target > 0 ? formatMeters(ev.target) : '--' })}</span>
            </div>
          </div>

          <div class="input-group">
            <label class="input-label" for="rescale-target">${localize('geometry.rescale.input_label')}</label>
            <div class="input-row">
              <input
                id="rescale-target"
                type="text"
                inputmode="decimal"
                autocomplete="off"
                class="big-input target-input ${ev.error ? 'invalid' : ''}"
                aria-invalid=${ev.error ? 'true' : 'false'}
                aria-describedby=${describedBy}
                .value=${this.targetText}
                @input=${this.handleInputChange}
              />
              <span class="unit-tag" id="rescale-unit">${localize('geometry.meters')}</span>
            </div>
            ${ev.error ? html`<span class="field-error" id="rescale-error" role="alert">${ev.error}</span>` : null}
          </div>

          <div class="ratio-indicator">
            <span class="factor-label">${localize('geometry.rescale.factor_label')}</span>
            <span class="ratio-pill ${ratio > 1.001 ? 'ratio-expand' : ratio < 0.999 ? 'ratio-shrink' : 'ratio-neutral'}">
              ${localize('geometry.rescale.factor_value', { ratio: ratioText, percent: percentText })}
            </span>
          </div>

          ${ev.unusual ? html`
            <div class="warning-box" role="status">
              <span><span aria-hidden="true">⚠️</span> ${localize('geometry.rescale.unusual', { ratio: ratioText })}</span>
              <label class="check-row">
                <input
                  type="checkbox"
                  .checked=${this.unusualConfirmed}
                  @change=${(e: Event) => this.unusualConfirmed = (e.target as HTMLInputElement).checked}
                />
                <span>${localize('geometry.rescale.confirm_unusual')}</span>
              </label>
            </div>
          ` : null}

          <div class="impact-box">
            <ul class="impact-list">
              ${this.renderImpact('🧱', impactText('geometry.rescale.impact.walls', countLabel('walls', this.wallCount)))}
              ${this.openingCount > 0
                ? this.renderImpact('🚪', impactText('geometry.rescale.impact.openings', countLabel('openings', this.openingCount)))
                : null}
              ${this.roomCount > 0
                ? this.renderImpact('🏡', impactText('geometry.rescale.impact.rooms', countLabel('rooms', this.roomCount)))
                : null}
              ${this.furnitureCount > 0
                ? this.renderImpact('🛋️', impactText('geometry.rescale.impact.furniture', countLabel('furniture', this.furnitureCount)))
                : null}
              ${this.bindingCount > 0
                ? this.renderImpact('⚡', impactText(
                  `geometry.rescale.impact.bindings.${pluralForm(this.bindingCount)}`,
                  countLabel('bindings', this.bindingCount)
                ))
                : null}
              ${this.backgroundOptionVisible
                ? this.renderImpact('🖼️', impactText(
                  this.adjustBackground ? 'geometry.rescale.impact.background_synced' : 'geometry.rescale.impact.background_unchanged',
                  localize('geometry.rescale.background_layer')
                ))
                : null}
            </ul>
            ${this.renderBackgroundImpact()}
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-cancel" @click=${this.close}>${localize('geometry.cancel')}</button>
          <button type="button" class="btn-primary" ?disabled=${!isValid} @click=${this.confirm}>
            <span aria-hidden="true">📐</span>
            <span>${localize('geometry.rescale.submit')}</span>
          </button>
        </div>
      </div>
    `;
  }
}

defineElement('home-architect-rescale-modal', HomeArchitectRescaleModal);

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-rescale-modal': HomeArchitectRescaleModal;
  }
}
