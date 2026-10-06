import { LitElement, html, css, PropertyValues, ReactiveController, ReactiveControllerHost } from 'lit';
import { property, state } from 'lit/decorators.js';
import { Room, Wall } from '../core/types';
import { PolygonUtils } from '../core/polygon';
import { defineElement } from '../core/define';
import { getEventTarget } from '../core/keyboard';
import { LocalizeController, formatNumber, getLanguage, localize } from '../i18n';
import { geometryTranslations } from '../i18n/locales/geometry';
import { applyColorScheme, uiThemeStyles } from '../styles/theme.styles';

/** Teintes de sol proposées (valeur enregistrée dans room.color, libellé traduit `geometry.room.color.<id>`). */
const COLOR_PRESETS = [
  { id: 'sky', color: 'rgba(56, 189, 248, 0.18)' },
  { id: 'violet', color: 'rgba(168, 85, 247, 0.18)' },
  { id: 'amber', color: 'rgba(245, 158, 11, 0.18)' },
  { id: 'emerald', color: 'rgba(16, 185, 129, 0.18)' },
  { id: 'indigo', color: 'rgba(99, 102, 241, 0.18)' },
  { id: 'rose', color: 'rgba(244, 63, 94, 0.18)' },
  { id: 'slate', color: 'rgba(148, 163, 184, 0.18)' }
] as const;

/** Hauteurs sous plafond courantes (m), libellé traduit `geometry.room.preset.<id>`. */
const HEIGHT_PRESETS = [
  { id: 'basement', val: 2.10 },
  { id: 'attic', val: 2.30 },
  { id: 'standard', val: 2.50 },
  { id: 'high', val: 2.70 },
  { id: 'haussmann', val: 3.00 },
  { id: 'cathedral', val: 3.50 }
] as const;

/** Hauteur sous plafond utilisée quand le projet n'en définit pas. */
const FALLBACK_CEILING_HEIGHT = 2.50;
const MIN_ROOM_HEIGHT = 1.0;
const MAX_ROOM_HEIGHT = 12.0;
const DEFAULT_ROOM_COLOR = 'rgba(56, 189, 248, 0.18)';
const MAX_ROOM_NAME_LENGTH = 100;
const DEFAULT_ROOM_NAME_KEY = 'geometry.room.default_name';

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

/** Sous-ensemble de l'objet hass utilisé : registre des zones (hass.areas, HA 2024.x et plus) et mode sombre. */
export interface RoomModalHass {
  areas?: Record<string, { area_id: string; name?: string | null } | undefined>;
  themes?: { darkMode?: unknown };
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

/** Hauteur à deux décimales dans la langue courante (« 2,50 » / « 2.50 »), relue par parseDecimal. */
function formatHeight(v: number): string {
  return formatNumber(v, { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: false });
}

/** Surface ou volume à une décimale dans la langue courante. */
function formatMeasure(v: number): string {
  return formatNumber(v, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

/**
 * Le nom est-il un nom par défaut de pièce, dans l'une des langues : « Pièce » / « Room », ou
 * numéroté comme les pièces tracées sur le canevas (« Pièce 3 ») ?
 */
function isDefaultRoomName(name: string): boolean {
  return geometryTranslations(DEFAULT_ROOM_NAME_KEY).includes(name.replace(/\s+\d+$/, ''));
}

const FOCUSABLE = 'button, input, select, textarea, [href], [tabindex]';

/** Élément qui a le focus, en traversant les shadow roots ouvertes (document.activeElement s'arrête à l'hôte). */
function deepActiveElement(): HTMLElement | SVGElement | null {
  let active: Element | null = document.activeElement;
  while (active?.shadowRoot?.activeElement) active = active.shadowRoot.activeElement;
  return active instanceof HTMLElement || active instanceof SVGElement ? active : null;
}

/**
 * Focus d'une modale autonome (constat F159) : mémorise l'élément qui avait le focus à l'ouverture
 * et le lui rend à la fermeture, garde Tab / Maj+Tab dans la modale (piège de focus) et empêche un
 * clic sur le fond de lui retirer le focus. L'hôte appelle trapTab depuis son gestionnaire keydown.
 */
export class DialogFocusController implements ReactiveController {
  private returnFocusTo: HTMLElement | SVGElement | null = null;

  constructor(private readonly host: ReactiveControllerHost & HTMLElement) {
    host.addController(this);
  }

  hostConnected(): void {
    this.returnFocusTo = deepActiveElement();
    this.host.addEventListener('mousedown', this.keepFocusOnBackdrop);
  }

  hostDisconnected(): void {
    this.host.removeEventListener('mousedown', this.keepFocusOnBackdrop);
    const target = this.returnFocusTo;
    this.returnFocusTo = null;
    if (target?.isConnected) target.focus({ preventScroll: true });
  }

  /** Tab / Maj+Tab : passe à l'élément focalisable suivant / précédent de la modale, en boucle. */
  trapTab(e: KeyboardEvent): void {
    const root = this.host.shadowRoot;
    if (e.key !== 'Tab' || !root) return;
    e.preventDefault();
    const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE))
      .filter(el => el.tabIndex >= 0 && !el.matches(':disabled') && el.getClientRects().length > 0);
    if (items.length === 0) return;
    const index = items.indexOf(root.activeElement as HTMLElement);
    const next = e.shiftKey
      ? (index <= 0 ? items.length - 1 : index - 1)
      : (index < 0 || index === items.length - 1 ? 0 : index + 1);
    items[next].focus();
  }

  /** Un clic sur le fond (l'hôte lui-même, hors de la carte) ne déplace pas le focus hors de la modale. */
  private readonly keepFocusOnBackdrop = (e: MouseEvent) => {
    if (e.composedPath()[0] === this.host) e.preventDefault();
  };
}

/**
 * Styles communs des modales de géométrie (pièce, mise à l'échelle) : fond, carte, en-tête, pied,
 * boutons et champs, construits sur les jetons --arch-ui-* (uiThemeStyles). Les teintes dérivées
 * (texte d'accent, remplissage des boutons) sont calculées pour un contraste ≥ 4,5:1 dans les deux palettes.
 */
export const geometryModalStyles = css`
  :host {
    /* Accent lisible comme texte ou bordure sur la surface (mélange avec la couleur du texte). */
    --modal-accent-text: color-mix(in srgb, var(--arch-ui-accent) 60%, var(--arch-ui-text));
    /* Accent assombri pour un texte --arch-ui-accent-text (clair) lisible sur les boutons pleins. */
    --modal-accent-fill: color-mix(in srgb, var(--arch-ui-accent) 72%, #000);
    --modal-accent-soft: color-mix(in srgb, var(--arch-ui-accent) 14%, transparent);
    --modal-danger-text: color-mix(in srgb, var(--arch-ui-danger) 80%, var(--arch-ui-text));
    --modal-danger-fill: color-mix(in srgb, var(--arch-ui-danger) 85%, #000);
    --modal-field-border: color-mix(in srgb, var(--arch-ui-text) 45%, transparent);
    --modal-mono: var(--ha-font-family-code, ui-monospace, SFMono-Regular, Menlo, monospace);

    position: fixed;
    inset: 0;
    background: var(--arch-ui-overlay);
    backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    font-family: var(--arch-ui-font);
    color: var(--arch-ui-text);
    animation: fadeIn 0.2s ease-out;
  }

  /*
   * Navigateur sans color-mix() : les jetons dérivés seraient invalides (bouton principal sans fond,
   * texte clair sur surface claire). Repli sur les jetons de base.
   */
  @supports not (color: color-mix(in srgb, red 50%, blue)) {
    :host {
      --modal-accent-text: var(--arch-ui-accent);
      --modal-accent-fill: var(--arch-ui-accent);
      --modal-accent-soft: transparent;
      --modal-danger-text: var(--arch-ui-danger);
      --modal-danger-fill: var(--arch-ui-danger);
      --modal-field-border: var(--arch-ui-text-muted);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.98); }
    to { opacity: 1; transform: scale(1); }
  }

  @media (prefers-reduced-motion: reduce) {
    :host {
      animation: none;
    }
  }

  .modal-card {
    background: var(--arch-ui-surface);
    color: var(--arch-ui-text);
    border: 1px solid var(--arch-ui-border);
    border-radius: var(--arch-ui-radius);
    max-width: 92vw;
    max-height: 92vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.45);
    overflow: hidden;
  }

  .modal-card:focus,
  .modal-card:focus-visible {
    outline: none;
    box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.45);
  }

  .modal-header {
    border-bottom: 1px solid var(--arch-ui-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    background: var(--arch-ui-surface-2);
  }

  .modal-title-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .modal-title {
    font-weight: 700;
    color: var(--arch-ui-text);
    margin: 0;
  }

  .btn-close {
    background: transparent;
    border: none;
    color: var(--arch-ui-text-muted);
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
    padding: 6px;
    border-radius: 6px;
    transition: color 0.15s ease, background 0.15s ease;
  }

  .btn-close:hover {
    color: var(--arch-ui-text);
    background: var(--modal-accent-soft);
  }

  .modal-footer {
    border-top: 1px solid var(--arch-ui-border);
    background: var(--arch-ui-surface-2);
    display: flex;
    align-items: center;
  }

  .btn-cancel {
    background: transparent;
    color: var(--arch-ui-text);
    border: 1px solid var(--modal-field-border);
    border-radius: 8px;
    padding: 7px 14px;
    font: inherit;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .btn-cancel:hover {
    background: var(--modal-accent-soft);
  }

  .btn-primary {
    background: var(--modal-accent-fill);
    color: var(--arch-ui-accent-text);
    border: 1px solid var(--modal-accent-fill);
    border-radius: 8px;
    padding: 7px 18px;
    font: inherit;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: filter 0.2s ease;
  }

  .btn-primary:hover:not(:disabled) {
    filter: brightness(0.9);
  }

  .btn-primary:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .field-error {
    color: var(--modal-danger-text);
    font-size: 0.8rem;
    font-weight: 600;
  }

  .check-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.82rem;
    color: var(--arch-ui-text);
    cursor: pointer;
  }

  .check-row input {
    width: 16px;
    height: 16px;
    margin: 0;
    accent-color: var(--modal-accent-fill);
    cursor: pointer;
  }

  .metric-label {
    color: var(--arch-ui-text-muted);
    font-weight: 600;
    text-transform: uppercase;
  }

  .metric-val {
    font-weight: 800;
    color: var(--modal-accent-text);
    font-family: var(--modal-mono);
  }

  .unit-tag {
    font-weight: 700;
    color: var(--modal-accent-text);
  }

  .big-input {
    flex: 1;
    min-width: 0;
    background: var(--arch-ui-bg);
    border: 2px solid var(--modal-accent-text);
    color: var(--arch-ui-text);
    font-weight: 800;
    font-family: var(--modal-mono);
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .big-input:focus,
  .big-input:focus-visible {
    box-shadow: 0 0 0 3px var(--modal-accent-soft), var(--arch-ui-focus-ring);
  }

  .big-input.invalid {
    border-color: var(--modal-danger-text);
  }
`;

export class HomeArchitectRoomModal extends LitElement {
  static styles = [uiThemeStyles, geometryModalStyles, css`
    .modal-card {
      width: 460px;
    }

    .modal-header {
      padding: 16px 20px;
    }

    .modal-icon {
      font-size: 1.5rem;
    }

    .modal-title {
      font-size: 1.1rem;
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
      color: var(--arch-ui-text);
    }

    .form-input,
    .form-select {
      background: var(--arch-ui-bg);
      border: 1px solid var(--modal-field-border);
      border-radius: 8px;
      color: var(--arch-ui-text);
      padding: 8px 12px;
      font: inherit;
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .form-input:focus,
    .form-select:focus {
      border-color: var(--modal-accent-text);
      box-shadow: var(--arch-ui-focus-ring);
    }

    .height-input-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .height-input {
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 1.15rem;
    }

    .height-input:disabled {
      opacity: 0.55;
      border-color: var(--modal-field-border);
      cursor: not-allowed;
    }

    .unit-tag {
      font-size: 0.95rem;
    }

    .presets-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }

    .preset-pill {
      background: transparent;
      border: 1px solid var(--modal-field-border);
      border-radius: 6px;
      color: var(--arch-ui-text);
      font: inherit;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 4px 8px;
      cursor: pointer;
      transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    }

    .preset-pill:hover {
      background: var(--modal-accent-soft);
      border-color: var(--modal-accent-text);
    }

    .preset-pill[aria-pressed='true'] {
      background: var(--modal-accent-fill);
      border-color: var(--modal-accent-fill);
      color: var(--arch-ui-accent-text);
    }

    .metrics-summary {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
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
    }

    .metric-val {
      font-size: 1.1rem;
    }

    .metric-sub {
      font-size: 0.72rem;
      color: var(--arch-ui-text-muted);
    }

    .colors-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .color-swatch {
      width: 32px;
      height: 32px;
      padding: 0;
      border-radius: 8px;
      cursor: pointer;
      /* Teinte translucide posée sur le fond du plan, comme sur le canevas. */
      background: linear-gradient(var(--swatch-color), var(--swatch-color)), var(--arch-ui-bg);
      border: 1px solid var(--modal-field-border);
      color: var(--arch-ui-text);
      font-size: 0.95rem;
      font-weight: 800;
      line-height: 1;
      transition: transform 0.15s ease, border-color 0.15s ease;
    }

    .color-swatch:hover {
      transform: scale(1.1);
    }

    .color-swatch[aria-checked='true'] {
      transform: scale(1.1);
      border: 2px solid var(--modal-accent-text);
    }

    .form-hint {
      font-size: 0.75rem;
      color: var(--arch-ui-text-muted);
    }

    .modal-footer {
      padding: 14px 20px;
      justify-content: space-between;
    }

    .btn-delete {
      background: transparent;
      color: var(--modal-danger-text);
      border: 1px solid var(--modal-danger-text);
      border-radius: 8px;
      padding: 7px 12px;
      font: inherit;
      font-size: 0.82rem;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      transition: background 0.2s ease, color 0.2s ease;
    }

    .btn-delete:hover {
      background: var(--modal-danger-fill);
      border-color: var(--modal-danger-fill);
      color: var(--arch-ui-accent-text);
    }

    .footer-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  `];

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

  /** Zones triées, mises en cache par registre hass.areas et par langue (ordre alphabétique). */
  private areaCache: { source: object; lang: string; options: AreaOption[] } | null = null;

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

  /**
   * hass change à chaque état d'entité : seuls le registre des zones et le mode sombre concernent
   * la modale. Un changement de langue (LANGUAGE_CHANGED_KEY) ou d'une autre propriété re-rend.
   */
  protected shouldUpdate(changed: PropertyValues<this>): boolean {
    if (!changed.has('hass')) return true;
    applyColorScheme(this, this.hass);
    const previous = changed.get('hass');
    return changed.size > 1 || !previous || previous.areas !== this.hass?.areas;
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has('room') && this.room) {
      const customHeight = isValidHeight(this.room.height);
      this.name = this.room.name || localize(DEFAULT_ROOM_NAME_KEY);
      this.inheritHeight = !customHeight;
      this.heightText = formatHeight(customHeight ? this.room.height as number : this.projectDefaultHeight);
      this.areaId = this.room.area_id ?? '';
      this.color = this.room.color || DEFAULT_ROOM_COLOR;
    }
  }

  protected firstUpdated() {
    const input = this.renderRoot.querySelector<HTMLInputElement>('#room-name');
    input?.focus();
    input?.select();
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
    const lang = getLanguage();
    if (this.areaCache?.source !== areas || this.areaCache.lang !== lang) {
      const options = Object.values(areas)
        .filter((a): a is { area_id: string; name?: string | null } => !!a && typeof a.area_id === 'string' && a.area_id !== '')
        .map(a => ({ id: a.area_id, name: a.name || a.area_id }))
        .sort((a, b) => a.name.localeCompare(b.name, lang));
      this.areaCache = { source: areas, lang, options };
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
    } else if (e.key === 'Tab') {
      this.focusTrap.trapTab(e);
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
    if (area && (currentName === '' || isDefaultRoomName(currentName))) {
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

  /** Pastilles de couleur (groupe radio) : flèches, Début et Fin choisissent et donnent le focus. */
  private async handleSwatchKeyDown(e: KeyboardEvent) {
    const count = COLOR_PRESETS.length;
    const current = COLOR_PRESETS.findIndex(c => c.color === this.color);
    let next: number;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = current < 0 ? 0 : (current + 1) % count;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        next = current < 0 ? count - 1 : (current - 1 + count) % count;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = count - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    this.color = COLOR_PRESETS[next].color;
    await this.updateComplete;
    this.renderRoot.querySelectorAll<HTMLButtonElement>('.color-swatch')[next]?.focus();
  }

  private close() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private save() {
    const height = this.effectiveHeight();
    if (height === null) return;
    const detail: RoomModalSaveDetail = {
      roomId: this.room.id,
      name: this.name.trim().slice(0, MAX_ROOM_NAME_LENGTH) || localize(DEFAULT_ROOM_NAME_KEY),
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
    if (confirm(localize('geometry.room.delete_confirm', { name: this.room.name }))) {
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
        <label class="form-label" for="room-area">${localize('geometry.room.area_label')}</label>
        <select id="room-area" class="form-select" aria-describedby="room-area-hint" @change=${this.handleAreaChange}>
          <option value="" ?selected=${this.areaId === ''}>${localize('geometry.room.area_none')}</option>
          ${known ? null : html`<option value=${this.areaId} selected>${localize('geometry.room.area_missing', { id: this.areaId })}</option>`}
          ${options.map(a => html`<option value=${a.id} ?selected=${a.id === this.areaId}>${a.name}</option>`)}
        </select>
        <span class="form-hint" id="room-area-hint">${localize('geometry.room.area_hint')}</span>
      </div>
    `;
  }

  private renderColorField() {
    const checked = COLOR_PRESETS.findIndex(c => c.color === this.color);
    // Groupe radio : une seule pastille dans l'ordre de tabulation (la cochée, sinon la première).
    const tabStop = checked >= 0 ? checked : 0;
    return html`
      <div class="form-group">
        <span class="form-label" id="room-color-label">${localize('geometry.room.color_label')}</span>
        <div class="colors-row" role="radiogroup" aria-labelledby="room-color-label" @keydown=${this.handleSwatchKeyDown}>
          ${COLOR_PRESETS.map((c, i) => {
            const label = localize(`geometry.room.color.${c.id}`);
            return html`
              <button
                type="button"
                role="radio"
                class="color-swatch"
                style=${`--swatch-color: ${c.color}`}
                aria-checked=${i === checked ? 'true' : 'false'}
                aria-label=${label}
                title=${label}
                tabindex=${i === tabStop ? 0 : -1}
                @click=${() => this.color = c.color}
              ><span aria-hidden="true">${i === checked ? '✓' : ''}</span></button>
            `;
          })}
        </div>
      </div>
    `;
  }

  render() {
    if (!this.room) return null;

    const defaultHeight = this.projectDefaultHeight;
    const height = this.effectiveHeight();
    const heightError = height === null
      ? localize('geometry.room.height_invalid', { min: formatHeight(MIN_ROOM_HEIGHT), max: formatHeight(MAX_ROOM_HEIGHT) })
      : '';

    // Surface : intérieure si des murs sont posés sur les arêtes (demi-épaisseur déduite), sinon à l'axe.
    const surface = PolygonUtils.computeInteriorArea(this.room.polygon, this.walls);
    const axisArea = surface.axisAreaM2 > 0 ? surface.axisAreaM2 : this.room.areaM2;
    const hasInterior = surface.matchedEdges > 0;
    const floorArea = hasInterior ? surface.areaM2 : axisArea;
    const volume = height === null ? '--' : formatMeasure(floorArea * height);
    const describedBy = heightError ? 'room-height-unit room-height-error' : 'room-height-unit';

    return html`
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="room-modal-title" tabindex="-1">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon" aria-hidden="true">${this.room.icon || '🏡'}</span>
            <h2 class="modal-title" id="room-modal-title">${localize('geometry.room.title')}</h2>
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
          <div class="form-group">
            <label class="form-label" for="room-name">${localize('geometry.room.name_label')}</label>
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
            <label class="form-label" for="room-height">${localize('geometry.room.height_label')}</label>
            <label class="check-row">
              <input type="checkbox" .checked=${this.inheritHeight} @change=${this.handleInheritChange} />
              <span>${localize('geometry.room.height_inherit', { height: formatHeight(defaultHeight) })}</span>
            </label>
            <div class="height-input-row">
              <input
                id="room-height"
                type="text"
                inputmode="decimal"
                autocomplete="off"
                class="big-input height-input ${heightError ? 'invalid' : ''}"
                aria-invalid=${heightError ? 'true' : 'false'}
                aria-describedby=${describedBy}
                ?disabled=${this.inheritHeight}
                .value=${this.inheritHeight ? formatHeight(defaultHeight) : this.heightText}
                @input=${(e: Event) => this.heightText = (e.target as HTMLInputElement).value}
              />
              <span class="unit-tag" id="room-height-unit">${localize('geometry.meters')}</span>
            </div>
            ${heightError ? html`<span class="field-error" id="room-height-error" role="alert">${heightError}</span>` : null}

            <!-- Préréglages rapides -->
            <div class="presets-row" role="group" aria-label=${localize('geometry.room.height_presets')}>
              ${HEIGHT_PRESETS.map(preset => html`
                <button
                  type="button"
                  class="preset-pill"
                  aria-pressed=${!this.inheritHeight && height !== null && Math.abs(height - preset.val) < 0.005 ? 'true' : 'false'}
                  @click=${() => this.selectPreset(preset.val)}
                >
                  ${localize('geometry.room.height_preset', { height: formatHeight(preset.val), name: localize(`geometry.room.preset.${preset.id}`) })}
                </button>
              `)}
            </div>
          </div>

          <!-- Résumé Surface & Volume -->
          <div class="metrics-summary">
            <div class="metric-item">
              <span class="metric-label">${localize(hasInterior ? 'geometry.room.surface_interior' : 'geometry.room.surface_axis')}</span>
              <span class="metric-val">${localize('geometry.value_m2', { value: formatMeasure(floorArea) })}</span>
              <span class="metric-sub">${hasInterior
                ? localize('geometry.room.surface_axis_detail', { area: formatMeasure(axisArea) })
                : localize('geometry.room.surface_not_deducted')}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">${localize('geometry.room.volume')}</span>
              <span class="metric-val">${localize('geometry.value_m3', { value: volume })}</span>
            </div>
          </div>

          <!-- Couleur de sol -->
          ${this.renderColorField()}
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-delete" @click=${this.deleteRoom}>
            <span aria-hidden="true">🗑️</span> ${localize('geometry.room.delete')}
          </button>
          <div class="footer-actions">
            <button type="button" class="btn-cancel" @click=${this.close}>${localize('geometry.cancel')}</button>
            <button type="button" class="btn-primary" ?disabled=${height === null} @click=${this.save}>
              <span aria-hidden="true">💾</span> ${localize('geometry.room.save')}
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
