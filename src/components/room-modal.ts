import { LitElement, html, css, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { Room, Wall } from '../core/types';
import { PolygonUtils } from '../core/polygon';
import { defineElement } from '../core/define';
import { getEventTarget } from '../core/keyboard';

const COLOR_PRESETS = [
  { name: 'Bleu ciel', color: 'rgba(56, 189, 248, 0.18)' },
  { name: 'Violet moderne', color: 'rgba(168, 85, 247, 0.18)' },
  { name: 'Ambre chaleureux', color: 'rgba(245, 158, 11, 0.18)' },
  { name: 'Émeraude nature', color: 'rgba(16, 185, 129, 0.18)' },
  { name: 'Indigo profond', color: 'rgba(99, 102, 241, 0.18)' },
  { name: 'Rose pastel', color: 'rgba(244, 63, 94, 0.18)' },
  { name: 'Gris ardoise', color: 'rgba(148, 163, 184, 0.18)' }
];

const HEIGHT_PRESETS = [
  { label: '2.10 m (Sous-sol)', val: 2.10 },
  { label: '2.30 m (Combles)', val: 2.30 },
  { label: '2.50 m (Standard)', val: 2.50 },
  { label: '2.70 m (Élevé)', val: 2.70 },
  { label: '3.00 m (Haussmann)', val: 3.00 },
  { label: '3.50 m (Cathédrale)', val: 3.50 }
];

/** Hauteur sous plafond utilisée quand le projet n'en définit pas. */
const FALLBACK_CEILING_HEIGHT = 2.50;
const MIN_ROOM_HEIGHT = 1.0;
const MAX_ROOM_HEIGHT = 12.0;
const DEFAULT_ROOM_COLOR = 'rgba(56, 189, 248, 0.18)';
const MAX_ROOM_NAME_LENGTH = 100;
const DEFAULT_ROOM_NAME = 'Pièce';

/** Détail de l'événement `save-room`. */
export interface RoomModalSaveDetail {
  roomId: string;
  name: string;
  /** Hauteur sous plafond effective (m), toujours renseignée. */
  height: number;
  /** True : la pièce suit la hauteur par défaut du projet (ne pas enregistrer room.height). */
  inheritHeight: boolean;
  color: string;
  /** Zone Home Assistant liée (Room.area_id), ou null pour aucune liaison. */
  area_id: string | null;
}

/** Sous-ensemble de l'objet hass utilisé : le registre des zones (hass.areas, HA 2024.x et plus). */
export interface RoomModalHass {
  areas?: Record<string, { area_id: string; name?: string | null } | undefined>;
}

interface AreaOption {
  id: string;
  name: string;
}

/** Nombre décimal saisi (virgule ou point acceptés), ou null. */
function parseDecimal(text: string): number | null {
  const t = text.trim().replace(',', '.');
  if (t === '') return null;
  const v = Number(t);
  return Number.isFinite(v) ? v : null;
}

function isValidHeight(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v) && v >= MIN_ROOM_HEIGHT && v <= MAX_ROOM_HEIGHT;
}

function formatHeight(v: number): string {
  return v.toFixed(2);
}

export class HomeArchitectRoomModal extends LitElement {
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
      width: 460px;
      max-width: 92vw;
      max-height: 92vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 25px rgba(56, 189, 248, 0.25);
      overflow: hidden;
    }

    .modal-header {
      padding: 16px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(15, 23, 42, 0.6);
    }

    .modal-title-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .modal-icon {
      font-size: 1.5rem;
    }

    .modal-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #f1f5f9;
      margin: 0;
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
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      overflow-y: auto;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #cbd5e1;
    }

    .form-input {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 8px;
      color: #ffffff;
      padding: 8px 12px;
      font-size: 0.95rem;
      outline: none;
      transition: all 0.2s ease;
    }

    .form-input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);
    }

    .height-input-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .height-input {
      flex: 1;
      background: #0f172a;
      border: 2px solid #0284c7;
      border-radius: 8px;
      color: #ffffff;
      padding: 8px 12px;
      font-size: 1.15rem;
      font-weight: 800;
      font-family: ui-monospace, SFMono-Regular, monospace;
      outline: none;
    }

    .height-input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.3);
    }

    .unit-tag {
      font-size: 0.95rem;
      font-weight: 700;
      color: #38bdf8;
    }

    .presets-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }

    .preset-pill {
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 6px;
      color: #94a3b8;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 4px 8px;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .preset-pill:hover, .preset-pill.active {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
    }

    .metrics-summary {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 10px 14px;
    }

    .metric-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .metric-label {
      font-size: 0.74rem;
      color: #94a3b8;
      font-weight: 600;
      text-transform: uppercase;
    }

    .metric-val {
      font-size: 1.1rem;
      font-weight: 800;
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .colors-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .color-swatch {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.15s ease;
    }

    .color-swatch:hover, .color-swatch.active {
      transform: scale(1.1);
      border-color: #ffffff;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    }

    .modal-footer {
      padding: 14px 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(15, 23, 42, 0.6);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .btn-delete {
      background: rgba(239, 68, 68, 0.15);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 8px;
      padding: 7px 12px;
      font-size: 0.82rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-delete:hover {
      background: #ef4444;
      color: #ffffff;
    }

    .footer-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn-cancel {
      background: transparent;
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 7px 14px;
      font-size: 0.85rem;
      cursor: pointer;
    }

    .btn-cancel:hover {
      color: #ffffff;
    }

    .btn-save {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      border-radius: 8px;
      padding: 7px 18px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
    }

    .btn-save:hover:not(:disabled) {
      background: #0369a1;
    }

    .btn-save:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      box-shadow: none;
    }

    .form-select {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 8px;
      color: #ffffff;
      padding: 8px 12px;
      font-size: 0.95rem;
      outline: none;
    }

    .form-select:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);
    }

    .form-hint {
      font-size: 0.75rem;
      color: #94a3b8;
    }

    .field-error {
      color: #f87171;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .height-input.invalid {
      border-color: #ef4444;
    }

    .height-input:disabled {
      opacity: 0.55;
      border-color: rgba(255, 255, 255, 0.18);
      cursor: not-allowed;
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

    .metric-sub {
      font-size: 0.72rem;
      color: #94a3b8;
    }
  `;

  @property({ attribute: false })
  public room!: Room;

  /** Objet hass : son registre des zones (hass.areas) alimente la liaison optionnelle à une zone HA. */
  @property({ attribute: false })
  public hass?: RoomModalHass;

  /** Hauteur sous plafond par défaut du projet (project.defaultCeilingHeight). */
  @property({ type: Number })
  public defaultCeilingHeight?: number;

  /** Murs du projet : leur demi-épaisseur est déduite pour la surface intérieure. */
  @property({ attribute: false })
  public walls: Wall[] = [];

  @state()
  private name: string = '';

  /** Saisie brute de la hauteur : jamais réécrite pendant la frappe, validée à l'enregistrement. */
  @state()
  private heightText: string = formatHeight(FALLBACK_CEILING_HEIGHT);

  /** La pièce suit-elle la hauteur par défaut du projet ? */
  @state()
  private inheritHeight: boolean = true;

  @state()
  private areaId: string = '';

  @state()
  private color: string = DEFAULT_ROOM_COLOR;

  private areaCache: { source: object; options: AreaOption[] } | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this.handleKeyDown);
    super.disconnectedCallback();
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has('room') && this.room) {
      const customHeight = isValidHeight(this.room.height);
      this.name = this.room.name || DEFAULT_ROOM_NAME;
      this.inheritHeight = !customHeight;
      this.heightText = formatHeight(customHeight ? this.room.height as number : this.projectDefaultHeight);
      this.areaId = this.room.area_id ?? '';
      this.color = this.room.color || DEFAULT_ROOM_COLOR;
    }
  }

  protected firstUpdated() {
    this.renderRoot.querySelector<HTMLInputElement>('.form-input')?.focus();
  }

  /** Hauteur par défaut du projet si elle est valide, sinon 2,50 m. */
  private get projectDefaultHeight(): number {
    return isValidHeight(this.defaultCeilingHeight) ? this.defaultCeilingHeight : FALLBACK_CEILING_HEIGHT;
  }

  /** Hauteur effective, ou null si la saisie personnalisée est invalide. */
  private effectiveHeight(): number | null {
    if (this.inheritHeight) return this.projectDefaultHeight;
    const v = parseDecimal(this.heightText);
    return isValidHeight(v) ? v : null;
  }

  /** Zones HA triées par nom, ou null si hass.areas n'est pas disponible. */
  private areaOptions(): AreaOption[] | null {
    const areas = this.hass?.areas;
    if (!areas || typeof areas !== 'object') return null;
    if (this.areaCache?.source !== areas) {
      const options = Object.values(areas)
        .filter((a): a is { area_id: string; name?: string | null } => !!a && typeof a.area_id === 'string' && a.area_id !== '')
        .map(a => ({ id: a.area_id, name: a.name || a.area_id }))
        .sort((a, b) => a.name.localeCompare(b.name, 'fr'));
      this.areaCache = { source: areas, options };
    }
    return this.areaCache.options;
  }

  /**
   * Les touches tapées dans la modale ne doivent pas atteindre les raccourcis globaux du panneau
   * et du canevas (Retour arrière supprimerait la pièce sélectionnée, « r » ferait pivoter un meuble…).
   */
  private handleKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === 'Escape') {
      e.preventDefault();
      this.close();
    } else if (e.key === 'Enter' && !e.isComposing) {
      // Entrée dans un champ de saisie enregistre (sur un bouton, Entrée garde son action native).
      const target = getEventTarget(e);
      if (target instanceof HTMLInputElement && target.type === 'text') {
        e.preventDefault();
        this.save();
      }
    }
  };

  private handleAreaChange(e: Event) {
    this.areaId = (e.target as HTMLSelectElement).value;
    const area = this.areaOptions()?.find(a => a.id === this.areaId);
    const currentName = this.name.trim();
    if (area && (currentName === '' || currentName === DEFAULT_ROOM_NAME)) {
      this.name = area.name;
    }
  }

  private handleInheritChange(e: Event) {
    this.inheritHeight = (e.target as HTMLInputElement).checked;
    if (!this.inheritHeight) this.heightText = formatHeight(this.projectDefaultHeight);
  }

  private selectPreset(value: number) {
    this.inheritHeight = false;
    this.heightText = formatHeight(value);
  }

  private close() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private save() {
    const height = this.effectiveHeight();
    if (height === null) return;
    const detail: RoomModalSaveDetail = {
      roomId: this.room.id,
      name: this.name.trim().slice(0, MAX_ROOM_NAME_LENGTH) || DEFAULT_ROOM_NAME,
      height,
      inheritHeight: this.inheritHeight,
      color: this.color,
      area_id: this.areaId || null
    };
    this.dispatchEvent(new CustomEvent<RoomModalSaveDetail>('save-room', {
      detail,
      bubbles: true,
      composed: true
    }));
  }

  private deleteRoom() {
    if (confirm(`Voulez-vous supprimer la pièce "${this.room.name}" ?`)) {
      this.dispatchEvent(new CustomEvent('delete-room', {
        detail: { roomId: this.room.id },
        bubbles: true,
        composed: true
      }));
    }
  }

  private renderAreaField() {
    const options = this.areaOptions();
    if (!options) return null;
    const known = this.areaId === '' || options.some(a => a.id === this.areaId);
    return html`
      <div class="form-group">
        <label class="form-label" for="room-area">Zone Home Assistant :</label>
        <select id="room-area" class="form-select" @change=${this.handleAreaChange}>
          <option value="" ?selected=${this.areaId === ''}>Aucune zone liée</option>
          ${known ? null : html`<option value=${this.areaId} selected>Zone introuvable (${this.areaId})</option>`}
          ${options.map(a => html`<option value=${a.id} ?selected=${a.id === this.areaId}>${a.name}</option>`)}
        </select>
        <span class="form-hint">Associe la pièce du plan à une zone de Home Assistant.</span>
      </div>
    `;
  }

  render() {
    if (!this.room) return null;

    const defaultHeight = this.projectDefaultHeight;
    const height = this.effectiveHeight();
    const heightError = height === null
      ? `Hauteur invalide : saisissez une valeur entre ${formatHeight(MIN_ROOM_HEIGHT)} et ${formatHeight(MAX_ROOM_HEIGHT)} m.`
      : '';

    // Surface : intérieure si des murs sont posés sur les arêtes (demi-épaisseur déduite), sinon à l'axe.
    const surface = PolygonUtils.computeInteriorArea(this.room.polygon, this.walls);
    const axisArea = surface.axisAreaM2 > 0 ? surface.axisAreaM2 : this.room.areaM2;
    const hasInterior = surface.matchedEdges > 0;
    const floorArea = hasInterior ? surface.areaM2 : axisArea;
    const volume = height === null ? '--' : (floorArea * height).toFixed(1);

    return html`
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="room-modal-title">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon">${this.room.icon || '🏡'}</span>
            <div>
              <h3 class="modal-title" id="room-modal-title">Propriétés de la pièce</h3>
            </div>
          </div>
          <button class="btn-close" title="Fermer" @click=${this.close}>✕</button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label class="form-label" for="room-name">Nom de la pièce :</label>
            <input
              id="room-name"
              type="text"
              class="form-input"
              maxlength=${MAX_ROOM_NAME_LENGTH}
              .value=${this.name}
              @input=${(e: Event) => this.name = (e.target as HTMLInputElement).value}
            />
          </div>

          ${this.renderAreaField()}

          <!-- Hauteur sous plafond 3D -->
          <div class="form-group">
            <label class="form-label" for="room-height">Hauteur sous plafond (Rendu 3D) :</label>
            <label class="check-row">
              <input type="checkbox" .checked=${this.inheritHeight} @change=${this.handleInheritChange} />
              <span>Hauteur par défaut du projet (${formatHeight(defaultHeight)} m)</span>
            </label>
            <div class="height-input-row">
              <input
                id="room-height"
                type="text"
                inputmode="decimal"
                autocomplete="off"
                class="height-input ${heightError ? 'invalid' : ''}"
                aria-invalid=${heightError ? 'true' : 'false'}
                ?disabled=${this.inheritHeight}
                .value=${this.inheritHeight ? formatHeight(defaultHeight) : this.heightText}
                @input=${(e: Event) => this.heightText = (e.target as HTMLInputElement).value}
              />
              <span class="unit-tag">mètres</span>
            </div>
            ${heightError ? html`<span class="field-error" role="alert">${heightError}</span>` : null}

            <!-- Préréglages rapides -->
            <div class="presets-row">
              ${HEIGHT_PRESETS.map(preset => html`
                <button
                  class="preset-pill ${!this.inheritHeight && height !== null && Math.abs(height - preset.val) < 0.005 ? 'active' : ''}"
                  @click=${() => this.selectPreset(preset.val)}
                >
                  ${preset.label}
                </button>
              `)}
            </div>
          </div>

          <!-- Résumé Surface & Volume -->
          <div class="metrics-summary">
            <div class="metric-item">
              <span class="metric-label">${hasInterior ? 'Surface intérieure' : 'Surface à l\'axe des murs'}</span>
              <span class="metric-val">${floorArea.toFixed(1)} m²</span>
              <span class="metric-sub">${hasInterior
                ? `À l'axe des murs : ${axisArea.toFixed(1)} m²`
                : 'Épaisseur des murs non déduite'}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Volume 3D calculé</span>
              <span class="metric-val">${volume} m³</span>
            </div>
          </div>

          <!-- Couleur de sol -->
          <div class="form-group">
            <label class="form-label">Couleur d'ambiance du sol :</label>
            <div class="colors-row">
              ${COLOR_PRESETS.map(c => html`
                <div
                  class="color-swatch ${this.color === c.color ? 'active' : ''}"
                  style="background: ${c.color};"
                  title="${c.name}"
                  @click=${() => this.color = c.color}
                ></div>
              `)}
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-delete" @click=${this.deleteRoom}>
            🗑️ Supprimer
          </button>
          <div class="footer-actions">
            <button class="btn-cancel" @click=${this.close}>Annuler</button>
            <button class="btn-save" ?disabled=${height === null} @click=${this.save}>
              💾 Enregistrer
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

defineElement('home-architect-room-modal', HomeArchitectRoomModal);

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-room-modal': HomeArchitectRoomModal;
  }
}
