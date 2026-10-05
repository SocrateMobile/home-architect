import { LitElement, html, css, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { defineElement } from '../core/define';
import { getEventTarget } from '../core/keyboard';

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

function plural(count: number, singular: string, pluralForm: string): string {
  return `${count} ${count > 1 ? pluralForm : singular}`;
}

interface RescaleEvaluation {
  target: number | null;
  factor: number | null;
  error: string;
  unusual: boolean;
}

export class HomeArchitectRescaleModal extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: #f8fafc;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-card {
      background: #1e293b;
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 16px;
      width: 480px;
      max-width: 92vw;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 25px rgba(56, 189, 248, 0.25);
      overflow: hidden;
    }

    .modal-header {
      padding: 18px 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(15, 23, 42, 0.6);
    }

    .modal-title-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .modal-icon {
      font-size: 1.6rem;
    }

    .modal-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #f1f5f9;
      margin: 0;
    }

    .modal-subtitle {
      font-size: 0.8rem;
      color: #94a3b8;
      margin: 2px 0 0 0;
    }

    .btn-close {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 20px;
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .btn-close:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .modal-body {
      padding: 22px 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .metric-compare {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .metric-box {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .metric-box.active {
      border-color: #38bdf8;
      background: rgba(2, 132, 199, 0.15);
      box-shadow: 0 0 15px rgba(56, 189, 248, 0.15);
    }

    .metric-label {
      font-size: 0.78rem;
      color: #94a3b8;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .metric-val {
      font-size: 1.3rem;
      font-weight: 800;
      color: #cbd5e1;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .input-label {
      font-size: 0.88rem;
      font-weight: 600;
      color: #f1f5f9;
    }

    .input-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .target-input {
      flex: 1;
      background: #0f172a;
      border: 2px solid #0284c7;
      border-radius: 10px;
      color: #ffffff;
      padding: 10px 14px;
      font-size: 1.25rem;
      font-weight: 800;
      font-family: ui-monospace, SFMono-Regular, monospace;
      outline: none;
      transition: all 0.2s ease;
    }

    .target-input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.3);
    }

    .unit-badge {
      font-size: 1rem;
      font-weight: 700;
      color: #38bdf8;
      padding: 0 4px;
    }

    .ratio-indicator {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 0.85rem;
    }

    .ratio-pill {
      font-size: 0.82rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 9999px;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .ratio-expand {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.4);
    }

    .ratio-shrink {
      background: rgba(245, 158, 11, 0.2);
      color: #f59e0b;
      border: 1px solid rgba(245, 158, 11, 0.4);
    }

    .ratio-neutral {
      background: rgba(100, 116, 139, 0.2);
      color: #94a3b8;
    }

    .impact-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      background: rgba(15, 23, 42, 0.4);
      border-radius: 10px;
      padding: 12px 14px;
      font-size: 0.8rem;
      color: #94a3b8;
    }

    .impact-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .impact-icon {
      font-size: 1rem;
    }

    .modal-footer {
      padding: 16px 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(15, 23, 42, 0.6);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
    }

    .btn-cancel {
      background: transparent;
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 0.88rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-cancel:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }

    .btn-confirm {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      border-radius: 8px;
      padding: 8px 20px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
      box-shadow: 0 0 15px rgba(56, 189, 248, 0.35);
    }

    .btn-confirm:hover:not(:disabled) {
      background: #0369a1;
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.55);
    }

    .btn-confirm:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      box-shadow: none;
    }

    .target-input.invalid {
      border-color: #ef4444;
    }

    .field-error {
      color: #f87171;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .warning-box {
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid rgba(245, 158, 11, 0.4);
      border-radius: 10px;
      padding: 10px 12px;
      font-size: 0.82rem;
      color: #fbbf24;
    }

    .check-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.82rem;
      color: #e2e8f0;
      cursor: pointer;
    }

    .check-row input {
      width: 16px;
      height: 16px;
      accent-color: #38bdf8;
      cursor: pointer;
    }
  `;

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

  /** Saisie brute : jamais réécrite pendant la frappe, validée à la confirmation. */
  @state()
  private targetText: string = '';

  @state()
  private adjustBackground: boolean = true;

  @state()
  private unusualConfirmed: boolean = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this.handleKeyDown);
    super.disconnectedCallback();
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has('measuredMeters')) {
      const measured = this.measuredMeters;
      this.targetText = Number.isFinite(measured) && measured > 0 ? String(Math.round(measured * 1000) / 1000) : '';
      this.unusualConfirmed = false;
    }
  }

  protected firstUpdated() {
    const input = this.renderRoot.querySelector<HTMLInputElement>('.target-input');
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
      return { target: null, factor: null, error: 'La cote mesurée est invalide : refaites la mesure sur le plan.', unusual: false };
    }
    const target = parseDecimal(this.targetText);
    if (target === null) {
      return { target: null, factor: null, error: this.targetText.trim() === '' ? '' : 'Saisissez un nombre (ex. 4.25).', unusual: false };
    }
    if (target <= 0) {
      return { target, factor: null, error: 'La longueur doit être strictement positive.', unusual: false };
    }
    const factor = target / measured;
    if (!isValidRescaleFactor(factor)) {
      return {
        target,
        factor: null,
        error: `Facteur ×${Number(factor.toPrecision(3))} hors limites (×${RESCALE_MIN_FACTOR} à ×${RESCALE_MAX_FACTOR}) : la longueur est-elle bien en mètres ?`,
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
        <span>Ajuster aussi le calque de fond (conserve la superposition avec le plan)</span>
      </label>
    `;
  }

  render() {
    const ev = this.evaluate();
    const measuredValid = Number.isFinite(this.measuredMeters) && this.measuredMeters > 0;
    const ratio = ev.factor ?? 1.0;
    const pctDiff = (ratio - 1.0) * 100;
    const isValid = this.isConfirmable(ev);

    return html`
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="rescale-title">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon">📐</span>
            <div>
              <h3 class="modal-title" id="rescale-title">Mettre à l'échelle le plan</h3>
              <p class="modal-subtitle">Recalcule automatiquement toutes les dimensions et cotes</p>
            </div>
          </div>
          <button class="btn-close" title="Fermer" @click=${this.close}>✕</button>
        </div>

        <div class="modal-body">
          <div class="metric-compare">
            <div class="metric-box">
              <span class="metric-label">Cote mesurée actuelle</span>
              <span class="metric-val">${measuredValid ? this.measuredMeters.toFixed(2) : '--'} m</span>
            </div>
            <div class="metric-box active">
              <span class="metric-label">Nouvelle cote cible</span>
              <span class="metric-val" style="color: #38bdf8;">${ev.target !== null && ev.target > 0 ? ev.target.toFixed(2) : '--'} m</span>
            </div>
          </div>

          <div class="input-group">
            <label class="input-label" for="rescale-target">Quelle est la taille réelle de ce segment en mètres ?</label>
            <div class="input-row">
              <input
                id="rescale-target"
                type="text"
                inputmode="decimal"
                autocomplete="off"
                class="target-input ${ev.error ? 'invalid' : ''}"
                aria-invalid=${ev.error ? 'true' : 'false'}
                .value=${this.targetText}
                @input=${this.handleInputChange}
              />
              <span class="unit-badge">mètres</span>
            </div>
            ${ev.error ? html`<span class="field-error" role="alert">${ev.error}</span>` : null}
          </div>

          <div class="ratio-indicator">
            <span style="color: #94a3b8;">Facteur d'ajustement global :</span>
            <span class="ratio-pill ${ratio > 1.001 ? 'ratio-expand' : ratio < 0.999 ? 'ratio-shrink' : 'ratio-neutral'}">
              × ${ratio.toFixed(3)} (${pctDiff >= 0 ? '+' : ''}${pctDiff.toFixed(1)}%)
            </span>
          </div>

          ${ev.unusual ? html`
            <div class="warning-box">
              <span>⚠️ Facteur inhabituel (×${ratio.toFixed(3)}) : toutes les dimensions seront multipliées par ce facteur. Vérifiez l'unité saisie.</span>
              <label class="check-row">
                <input
                  type="checkbox"
                  .checked=${this.unusualConfirmed}
                  @change=${(e: Event) => this.unusualConfirmed = (e.target as HTMLInputElement).checked}
                />
                <span>Je confirme ce facteur</span>
              </label>
            </div>
          ` : null}

          <div class="impact-list">
            <div class="impact-item">
              <span class="impact-icon">🧱</span>
              <span><strong>${plural(this.wallCount, 'mur', 'murs')}</strong> : toutes les longueurs et cotes seront recalculées</span>
            </div>
            ${this.openingCount > 0 ? html`
              <div class="impact-item">
                <span class="impact-icon">🚪</span>
                <span><strong>${plural(this.openingCount, 'ouverture', 'ouvertures')}</strong> : positions et largeurs ajustées proportionnellement</span>
              </div>
            ` : null}
            ${this.roomCount > 0 ? html`
              <div class="impact-item">
                <span class="impact-icon">🏡</span>
                <span><strong>${plural(this.roomCount, 'pièce', 'pièces')}</strong> : toutes les surfaces en m² seront actualisées</span>
              </div>
            ` : null}
            ${this.furnitureCount > 0 ? html`
              <div class="impact-item">
                <span class="impact-icon">🛋️</span>
                <span><strong>${plural(this.furnitureCount, 'meuble', 'meubles')}</strong> : positions et dimensions ajustées</span>
              </div>
            ` : null}
            ${this.bindingCount > 0 ? html`
              <div class="impact-item">
                <span class="impact-icon">⚡</span>
                <span><strong>${plural(this.bindingCount, 'entité', 'entités')}</strong> : ${this.bindingCount > 1 ? 'positions ajustées' : 'position ajustée'}</span>
              </div>
            ` : null}
            ${this.backgroundOptionVisible ? html`
              <div class="impact-item">
                <span class="impact-icon">🖼️</span>
                <span><strong>Calque de fond</strong> : ${this.adjustBackground
                  ? 'échelle synchronisée pour conserver la superposition'
                  : 'inchangé (il ne sera plus superposé au plan)'}</span>
              </div>
            ` : null}
            ${this.renderBackgroundImpact()}
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click=${this.close}>Annuler</button>
          <button
            class="btn-confirm"
            ?disabled=${!isValid}
            @click=${this.confirm}
          >
            <span>📐</span>
            <span>Recalculer toutes les cotes</span>
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
