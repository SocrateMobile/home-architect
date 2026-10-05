import { LitElement, html, css, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { defineElement } from '../core/define';
import { getEventTarget } from '../core/keyboard';

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

/** Nombre décimal saisi (virgule ou point acceptés), ou null si la saisie n'est pas un nombre fini. */
function parseDecimal(text: string): number | null {
  const t = text.trim().replace(',', '.');
  if (t === '') return null;
  const v = Number(t);
  return Number.isFinite(v) ? v : null;
}

function formatMeters(v: number): string {
  return v.toLocaleString('fr-FR', { maximumFractionDigits: 3 });
}

interface CalibrationEvaluation {
  /** Saisie valide : longueur réelle, facteur et échelle équivalente. */
  value: { realMeters: number; factor: number; pixelsPerMeter: number } | null;
  /** Message d'erreur ('' si la saisie est vide ou valide). */
  error: string;
}

export class HomeArchitectCalibrateModal extends LitElement {
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
      max-width: 460px;
      max-height: 92vh;
      overflow-y: auto;
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 18px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
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
      font-size: 1.15rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
      color: #38bdf8;
      margin: 0;
    }

    .btn-close {
      border: none;
      background: transparent;
      color: #cbd5e1;
      font-size: 18px;
      cursor: pointer;
      border-radius: 6px;
      padding: 4px;
    }

    .btn-close:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .modal-desc {
      font-size: 0.85rem;
      color: #94a3b8;
      line-height: 1.4;
    }

    .input-box {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
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
      color: #cbd5e1;
    }

    .input-field-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .unit-tag {
      font-weight: 600;
      color: #38bdf8;
    }

    .meters-input {
      background: #0f172a;
      border: 1px solid #38bdf8;
      color: #f8fafc;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 700;
      width: 100px;
      text-align: center;
      outline: none;
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.25);
    }

    .meters-input.invalid {
      border-color: #ef4444;
      box-shadow: 0 0 10px rgba(239, 68, 68, 0.25);
    }

    .field-error {
      color: #f87171;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .measured-info {
      font-size: 0.75rem;
      color: #94a3b8;
      font-family: ui-monospace, SFMono-Regular, monospace;
      line-height: 1.5;
    }

    .mode-title {
      font-size: 0.8rem;
      font-weight: 700;
      color: #cbd5e1;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .mode-options {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .mode-card {
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 10px 12px;
      cursor: pointer;
      display: flex;
      gap: 10px;
      align-items: flex-start;
      transition: all 0.2s ease;
    }

    .mode-card:hover {
      border-color: rgba(56, 189, 248, 0.4);
    }

    .mode-card.selected {
      border-color: #38bdf8;
      background: rgba(2, 132, 199, 0.15);
    }

    .mode-card input {
      margin-top: 3px;
      accent-color: #38bdf8;
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
      color: #f1f5f9;
    }

    .mode-desc,
    .mode-note {
      font-size: 0.78rem;
      color: #94a3b8;
      line-height: 1.35;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }

    .btn {
      padding: 8px 16px;
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

    .btn-apply {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
    }

    .btn-apply:hover:not(:disabled) {
      background: #0369a1;
      transform: translateY(-1px);
    }

    .btn-apply:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      box-shadow: none;
    }
  `;

  /** Longueur du segment tracé, en mètres monde à l'échelle actuelle (`request-calibration`). */
  @property({ type: Number })
  public worldDistance: number = 0;

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

  /** Saisie brute : jamais réécrite pendant la frappe, validée à la confirmation. */
  @state()
  private metersText: string = '';

  @state()
  private mode: CalibrationMode = 'background';

  /** Choix explicite de l'utilisateur (n'est plus écrasé par le choix par défaut). */
  private modeChosen = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this.handleKeyDown);
    super.disconnectedCallback();
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has('defaultMeters')) {
      const d = this.defaultMeters;
      this.metersText = Number.isFinite(d) && d > 0 ? String(Math.round(d * 1000) / 1000) : '';
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
      e.preventDefault();
      this.handleClose();
    } else if (e.key === 'Enter' && !e.isComposing) {
      const target = getEventTarget(e);
      if (target instanceof HTMLInputElement && target.type === 'text') {
        e.preventDefault();
        this.handleApply();
      }
    }
  };

  private evaluate(): CalibrationEvaluation {
    const measured = this.worldDistance;
    if (!(Number.isFinite(measured) && measured > 0)) {
      return { value: null, error: 'Le segment tracé est invalide : recommencez la mesure sur le plan.' };
    }
    const ppm = this.pixelsPerMeter;
    if (!(Number.isFinite(ppm) && ppm > 0)) {
      return { value: null, error: "L'échelle actuelle du plan est invalide." };
    }
    const realMeters = parseDecimal(this.metersText);
    if (realMeters === null) {
      return { value: null, error: this.metersText.trim() === '' ? '' : 'Saisissez une longueur en mètres (ex. 3,50).' };
    }
    if (realMeters < MIN_REAL_METERS || realMeters > MAX_REAL_METERS) {
      return {
        value: null,
        error: `La longueur doit être comprise entre ${formatMeters(MIN_REAL_METERS)} et ${formatMeters(MAX_REAL_METERS)} m.`
      };
    }
    const factor = realMeters / measured;
    const pixelsPerMeter = ppm / factor;
    if (factor < MIN_FACTOR || factor > MAX_FACTOR || pixelsPerMeter < MIN_PIXELS_PER_METER || pixelsPerMeter > MAX_PIXELS_PER_METER) {
      return {
        value: null,
        error: `Échelle hors limites (facteur ×${Number(factor.toPrecision(3))}) : la longueur est-elle bien en mètres ?`
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
          ${this.hasGeometry
            ? 'Le plan n\'a pas de calque de fond : tous ses éléments seront mis à l\'échelle.'
            : 'Le plan ne contient encore aucun élément : seul le calque de fond est mis à l\'échelle.'}
        </div>
      `;
    }
    const option = (mode: CalibrationMode, name: string, desc: string) => html`
      <label class="mode-card ${this.mode === mode ? 'selected' : ''}">
        <input
          type="radio"
          name="calibration-mode"
          .checked=${this.mode === mode}
          @change=${() => this.selectMode(mode)}
        />
        <span class="mode-content">
          <span class="mode-name">${name}</span>
          <span class="mode-desc">${desc}</span>
        </span>
      </label>
    `;
    return html`
      <div class="mode-title">Que faut-il mettre à l'échelle ?</div>
      <div class="mode-options">
        ${option(
          'project',
          '📐 Tout le plan',
          'Murs, pièces, ouvertures, meubles, entités et calque de fond changent d\'échelle ensemble : ce qui a été décalqué reste superposé au fond.'
        )}
        ${option(
          'background',
          '🖼️ Le calque de fond seulement',
          'Les éléments déjà tracés gardent leurs dimensions ; seule l\'image de fond est agrandie ou réduite.'
        )}
      </div>
    `;
  }

  render() {
    const ev = this.evaluate();
    const measuredValid = Number.isFinite(this.worldDistance) && this.worldDistance > 0;

    return html`
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="calibrate-title">
        <div class="modal-header">
          <h3 class="modal-title" id="calibrate-title">
            <span>📏</span>
            <span>Étalonnage de l'Échelle</span>
          </h3>
          <button class="btn-close" title="Fermer" @click=${this.handleClose}>✕</button>
        </div>

        <div class="modal-desc">
          Indiquez la longueur réelle exacte du segment que vous venez de tracer sur votre plan.
        </div>

        <div class="input-box">
          <div class="input-row">
            <label class="input-label" for="calibrate-meters">Longueur réelle mesurée :</label>
            <div class="input-field-wrapper">
              <input
                id="calibrate-meters"
                type="text"
                inputmode="decimal"
                autocomplete="off"
                class="meters-input ${ev.error ? 'invalid' : ''}"
                aria-invalid=${ev.error ? 'true' : 'false'}
                .value=${this.metersText}
                @input=${(e: Event) => this.metersText = (e.target as HTMLInputElement).value}
              />
              <span class="unit-tag">mètres</span>
            </div>
          </div>
          ${ev.error ? html`<span class="field-error" role="alert">${ev.error}</span>` : null}

          <div class="measured-info">
            Segment tracé : ${measuredValid ? `${formatMeters(this.worldDistance)} m à l'échelle actuelle` : '--'}
            ${ev.value ? html`<br />Facteur appliqué : × ${ev.value.factor.toFixed(3)}` : null}
          </div>
        </div>

        ${this.renderModeChoice()}

        <div class="modal-actions">
          <button class="btn btn-cancel" @click=${this.handleClose}>Annuler</button>
          <button class="btn btn-apply" ?disabled=${!ev.value} @click=${this.handleApply}>
            Appliquer l'échelle
          </button>
        </div>
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
