import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { live } from 'lit/directives/live.js';
import { defineElement } from '../core/define';
import {
  FURNITURE_CATALOG, FURNITURE_CATEGORY_LABELS, FURNITURE_FILTER_CATEGORIES, FurnitureCatalogTemplate,
  furnitureBounds, furnitureTemplateName, renderFurnitureSymbol
} from '../core/furniture-catalog';
import { entityDomain } from '../core/project-model';
import { LANGUAGE_CHANGED_KEY, LocalizeController, formatNumber, getLanguage, localize } from '../i18n';
import { localizeCount } from '../i18n/locales/ui';
import { applyColorScheme, uiThemeStyles } from '../styles/theme.styles';

/**
 * Données transportées par un glisser-déposer depuis le volet (MIME 'application/json'),
 * reprises telles quelles par l'événement 'drawer-item-picked' (« toucher pour placer »).
 * Aucune icône ni aucun nom n'est transmis : le plan affiche l'icône dynamique de HA et
 * le friendly_name courant (une icône ou un nom ne sont enregistrés que s'ils sont choisis).
 */
export type DrawerItemPayload =
  | { kind: 'entity'; entityId: string; domain: string }
  | { kind: 'furniture'; furnitureType: string };

/** Entité indexée pour la recherche (recalculée seulement si l'ensemble des entités ou leurs noms changent). */
interface EntityRow {
  entityId: string;
  name: string;
  domain: string;
  areaId?: string;
  /** Masquée, ou de catégorie diagnostic/configuration dans le registre des entités. */
  secondary: boolean;
  /** Nom + entity_id en minuscules, sans accents. */
  searchText: string;
}

interface EntityFilter {
  id: string;
  /** Domaines retenus ; vide = tous. Libellé : clé `ui.drawer.filter.<id>`. */
  domains: readonly string[];
}

const ENTITY_FILTERS: readonly EntityFilter[] = [
  { id: 'all', domains: [] },
  { id: 'lights', domains: ['light'] },
  { id: 'switches', domains: ['switch', 'input_boolean'] },
  { id: 'sensors', domains: ['sensor', 'binary_sensor'] },
  { id: 'climate', domains: ['climate', 'water_heater', 'humidifier'] },
  { id: 'covers', domains: ['cover', 'valve'] },
  { id: 'fans', domains: ['fan'] },
  { id: 'media', domains: ['media_player', 'remote'] },
  { id: 'security', domains: ['lock', 'alarm_control_panel', 'siren'] },
  { id: 'cameras', domains: ['camera'] },
  { id: 'actions', domains: ['scene', 'script', 'button', 'input_button', 'automation'] },
];

/** Icône d'affichage dans la liste uniquement (jamais enregistrée dans la liaison). */
const DOMAIN_ICONS: Record<string, string> = {
  light: '💡',
  switch: '🔌',
  input_boolean: '🔘',
  binary_sensor: '🚨',
  sensor: '📊',
  climate: '🌡️',
  water_heater: '♨️',
  humidifier: '💧',
  camera: '📷',
  media_player: '📺',
  remote: '🎛️',
  cover: '🪟',
  valve: '🚰',
  fan: '💨',
  lock: '🔒',
  alarm_control_panel: '🛡️',
  siren: '📢',
  scene: '🎬',
  script: '📜',
  automation: '🤖',
  button: '🔘',
  input_button: '🔘',
  person: '👤',
  device_tracker: '📍',
  vacuum: '🧹',
};
const DEFAULT_DOMAIN_ICON = '⚡';

/** Domaines dont tout état autre que « off » est un état actif (allumé, en marche, détecté…). */
const ACTIVE_UNLESS_OFF = new Set([
  'light', 'switch', 'input_boolean', 'fan', 'binary_sensor', 'climate', 'water_heater', 'humidifier',
  'automation', 'script', 'siren', 'remote',
]);

/** États « actifs » d'un groupe (son état reprend celui de ses membres : on, home, open, unlocked…). */
const ACTIVE_GROUP_STATES = new Set(['on', 'home', 'open', 'unlocked', 'problem']);

/**
 * État « actif » d'une entité (badge mis en évidence), selon son domaine : volet ou vanne ouverts,
 * serrure déverrouillée, alarme armée, présence à la maison, lecture en cours… Les valeurs mesurées
 * (sensor) et les déclencheurs (scene, button) restent neutres.
 */
function isActiveState(entityId: string, stateObj: { state?: unknown } | undefined): boolean {
  const s = stateObj?.state;
  if (typeof s !== 'string' || s === 'unavailable' || s === 'unknown' || s === 'off') return false;
  const domain = entityDomain(entityId);
  if (ACTIVE_UNLESS_OFF.has(domain)) return true;
  switch (domain) {
    case 'cover':
    case 'valve':
      return s !== 'closed';
    case 'lock':
      return s !== 'locked';
    case 'alarm_control_panel':
      return s !== 'disarmed';
    case 'group':
      return ACTIVE_GROUP_STATES.has(s);
    case 'person':
    case 'device_tracker':
      return s === 'home';
    case 'media_player':
      return s !== 'standby' && s !== 'idle';
    case 'vacuum':
      return s === 'cleaning' || s === 'returning';
    case 'camera':
      return s === 'streaming' || s === 'recording';
    default:
      return false;
  }
}

/** Nombre d'entités rendues avant le bouton « Afficher plus ». */
const PAGE_SIZE = 200;
const ALL_AREAS = '';
const ALL_FURNITURE = 'all';

type DrawerTab = 'entities' | 'furniture';
const TABS: readonly DrawerTab[] = ['entities', 'furniture'];
const TAB_PANEL_ID = 'drawer-tabpanel';

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

function normalizeSearch(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

/** Réglages régionaux qui changent le texte des états (comparés par valeur : l'objet peut être recréé). */
function localeKey(hass: any): string {
  const l = hass?.locale;
  return [hass?.language, l?.language, l?.number_format, l?.time_format, l?.date_format, l?.time_zone].join('|');
}

function friendlyName(stateObj: any, entityId: string): string {
  const name = stateObj?.attributes?.friendly_name;
  return typeof name === 'string' && name.trim() !== '' ? name : entityId;
}

/** Libellé d'une catégorie de meubles (traduit à la lecture par le catalogue). */
function furnitureCategoryLabel(category: string): string {
  return (FURNITURE_CATEGORY_LABELS as Record<string, string | undefined>)[category] ?? category;
}

/** Textes de recherche des meubles (nom et catégorie : « rangement » trouve l'armoire), par langue. */
const furnitureSearchTexts = new Map<string, Map<string, string>>();

function furnitureSearchText(item: FurnitureCatalogTemplate): string {
  const lang = getLanguage();
  let texts = furnitureSearchTexts.get(lang);
  if (!texts) {
    texts = new Map(FURNITURE_CATALOG.map(t =>
      [t.type, normalizeSearch(`${furnitureTemplateName(t.type)} ${furnitureCategoryLabel(t.category)}`)]));
    furnitureSearchTexts.set(lang, texts);
  }
  return texts.get(item.type) ?? '';
}

/** Dimensions d'un meuble (« 2,10 × 0,90 m »). */
function furnitureDimensions(item: FurnitureCatalogTemplate): string {
  const fmt = (v: number) => formatNumber(v, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return localize('ui.drawer.dimensions', { width: fmt(item.width), length: fmt(item.length) });
}

/**
 * Aperçu du symbole (vue de dessus, tel qu'il sera dessiné sur le plan) : cadre fixe en pixels, à
 * 48 px/m au plus pour garder les tailles relatives des meubles, réduit si le meuble n'y tient pas.
 */
const PREVIEW_WIDTH = 104;
const PREVIEW_HEIGHT = 64;
const PREVIEW_MARGIN = 4;
const PREVIEW_MAX_PIXELS_PER_METER = 48;

/** Échelle de l'aperçu, d'après l'emprise du symbole (décors débordants compris, ex. chaises de la table). */
function previewPixelsPerMeter(item: FurnitureCatalogTemplate): number {
  const b = furnitureBounds({ type: item.type, position: { x: 0, y: 0 } });
  // Symbole centré sur l'origine du cadre : demi-emprise la plus grande de chaque côté.
  const halfWidth = Math.max(-b.minX, b.maxX, 0.01);
  const halfLength = Math.max(-b.minY, b.maxY, 0.01);
  return Math.min(
    PREVIEW_MAX_PIXELS_PER_METER,
    (PREVIEW_WIDTH / 2 - PREVIEW_MARGIN) / halfWidth,
    (PREVIEW_HEIGHT / 2 - PREVIEW_MARGIN) / halfLength
  );
}

const PREVIEW_PIXELS_PER_METER = new Map(FURNITURE_CATALOG.map(t => [t.type, previewPixelsPerMeter(t)]));

export class HomeArchitectEntityDrawer extends LitElement {
  static styles = [uiThemeStyles, css`
    :host {
      /* Couleurs dérivées des jetons du thème (src/styles/theme.styles.ts) */
      --dr-item-bg: color-mix(in srgb, var(--arch-ui-surface-2) 45%, var(--arch-ui-surface));
      --dr-hover-bg: color-mix(in srgb, var(--arch-ui-accent) 12%, var(--arch-ui-surface));
      --dr-accent-ink: color-mix(in srgb, var(--arch-ui-accent) 55%, var(--arch-ui-text));
      --dr-accent-soft: color-mix(in srgb, var(--arch-ui-accent) 14%, transparent);
      /* Texte secondaire posé sur les cartes (fond plus foncé que la surface) : renforcé pour rester lisible (4,5:1). */
      --dr-muted-ink: color-mix(in srgb, var(--arch-ui-text-muted) 75%, var(--arch-ui-text));

      width: 320px;
      height: 100%;
      flex-shrink: 0;
      background: var(--arch-ui-surface);
      border-left: 1px solid var(--arch-ui-border);
      box-shadow: -6px 0 24px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      z-index: 25;
      font-family: var(--arch-ui-font);
      color: var(--arch-ui-text);
      position: relative;
      transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* « Réduire les animations » : la règle commune de uiThemeStyles ne vise pas l'hôte lui-même. */
    @media (prefers-reduced-motion: reduce) {
      :host {
        transition: none;
      }
    }

    :host([collapsed]) {
      width: 0 !important;
      overflow: hidden;
      border-left: none;
      box-shadow: none;
    }

    /* Écran étroit : tiroir superposé au canevas au lieu d'une colonne qui l'écrase
       (la barre d'outils et ses sous-menus restent au-dessus). */
    @media (max-width: 768px) {
      :host {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        height: auto;
        width: min(320px, calc(100% - 48px));
      }
    }

    .drawer-header {
      padding: 14px 16px;
      border-bottom: 1px solid var(--arch-ui-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--arch-ui-surface-2);
    }

    .drawer-title {
      font-size: 0.95rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      color: var(--arch-ui-text);
    }

    .count-badge {
      font-size: 0.72rem;
      padding: 2px 7px;
      background: var(--dr-accent-soft);
      color: var(--dr-accent-ink);
      border-radius: 9999px;
      border: 1px solid color-mix(in srgb, var(--arch-ui-accent) 30%, transparent);
      font-weight: 700;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .btn-toggle {
      background: transparent;
      border: 1px solid var(--arch-ui-border);
      border-radius: 6px;
      color: var(--arch-ui-text-muted);
      font-size: 14px;
      cursor: pointer;
      padding: 4px 8px;
      transition: all 0.2s ease;
    }

    .btn-toggle:hover {
      color: var(--arch-ui-text);
      background: var(--dr-hover-bg);
      border-color: var(--arch-ui-accent);
    }

    .tab-panel {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
    }

    .search-section {
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      border-bottom: 1px solid var(--arch-ui-border);
    }

    .search-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-input {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 8px;
      color: var(--arch-ui-text);
      padding: 7px 12px;
      font: inherit;
      font-size: 0.83rem;
      outline: none;
      width: 100%;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }

    .search-input::placeholder {
      color: var(--arch-ui-text-muted);
    }

    .search-input:focus {
      border-color: var(--arch-ui-accent);
      box-shadow: var(--arch-ui-focus-ring);
    }

    .categories-bar {
      display: flex;
      gap: 5px;
      overflow-x: auto;
      padding: 2px 2px 4px 2px;
      scrollbar-width: none;
    }

    .categories-bar::-webkit-scrollbar {
      display: none;
    }

    .cat-btn {
      background: var(--dr-item-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 6px;
      color: var(--arch-ui-text);
      padding: 4px 8px;
      font: inherit;
      font-size: 0.73rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }

    .cat-btn:hover {
      background: var(--dr-hover-bg);
    }

    .cat-btn.active {
      background: var(--arch-ui-accent);
      color: var(--arch-ui-accent-text);
      border-color: var(--arch-ui-accent);
    }

    .entities-list {
      flex: 1;
      overflow-y: auto;
      padding: 10px 14px;
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    .entity-card {
      background: var(--dr-item-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 9px;
      padding: 9px 11px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      cursor: grab;
      transition: all 0.18s ease;
      user-select: none;
    }

    .entity-card:hover {
      background: var(--dr-hover-bg);
      border-color: var(--arch-ui-accent);
      transform: translateX(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
    }

    .entity-card:active {
      cursor: grabbing;
    }

    .entity-info {
      display: flex;
      align-items: center;
      gap: 10px;
      overflow: hidden;
    }

    .entity-icon {
      font-size: 1.25rem;
      min-width: 26px;
      text-align: center;
    }

    .entity-details {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .entity-name {
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--arch-ui-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .entity-id {
      font-size: 0.70rem;
      color: var(--dr-muted-ink);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .entity-state-badge {
      font-size: 0.72rem;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 9999px;
      text-transform: uppercase;
      font-family: ui-monospace, SFMono-Regular, monospace;
      white-space: nowrap;
      max-width: 45%;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-shrink: 0;
    }

    .state-on {
      background: color-mix(in srgb, var(--arch-ui-warning) 22%, transparent);
      color: var(--arch-ui-text);
      border: 1px solid color-mix(in srgb, var(--arch-ui-warning) 55%, transparent);
    }

    .state-off {
      background: transparent;
      color: var(--dr-muted-ink);
      border: 1px solid var(--arch-ui-border);
    }

    .drag-hint {
      padding: 10px 14px;
      background: var(--dr-accent-soft);
      border-top: 1px solid color-mix(in srgb, var(--arch-ui-accent) 25%, transparent);
      font-size: 0.74rem;
      color: var(--dr-accent-ink);
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .drawer-tabs {
      display: flex;
      border-bottom: 1px solid var(--arch-ui-border);
    }

    .tab-btn {
      flex: 1;
      padding: 10px 8px;
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      color: var(--arch-ui-text-muted);
      font: inherit;
      font-size: 0.80rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    .tab-btn:hover {
      color: var(--arch-ui-text);
      background: var(--dr-hover-bg);
    }

    .tab-btn.active {
      color: var(--dr-accent-ink);
      border-bottom-color: var(--arch-ui-accent);
      background: var(--dr-accent-soft);
    }

    .furniture-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      /* Peu de résultats (filtre, recherche) : cartes en haut, sans étirer les lignes. */
      align-content: start;
      gap: 8px;
      padding: 10px 14px;
      overflow-y: auto;
      flex: 1;
    }

    .furniture-card {
      position: relative;
      background: var(--dr-item-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 9px;
      padding: 10px 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      cursor: grab;
      transition: all 0.18s ease;
      user-select: none;
      gap: 4px;
    }

    .furniture-card:hover {
      background: var(--dr-hover-bg);
      border-color: var(--arch-ui-accent);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
    }

    .furniture-card:active {
      cursor: grabbing;
    }

    .furniture-card-preview {
      display: block;
      flex: none;
      max-width: 100%;
      height: auto;
      background: var(--arch-ui-bg);
      border-radius: 6px;
    }

    .furniture-card-icon {
      position: absolute;
      top: 4px;
      left: 6px;
      font-size: 0.9rem;
      line-height: 1;
    }

    .furniture-card-name {
      font-size: 0.76rem;
      font-weight: 600;
      color: var(--arch-ui-text);
      line-height: 1.2;
    }

    .furniture-card-dim {
      font-size: 0.68rem;
      color: var(--dr-accent-ink);
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-weight: 600;
    }

    .empty-message {
      padding: 30px 16px;
      text-align: center;
      color: var(--arch-ui-text-muted);
      font-size: 0.83rem;
    }

    .filters-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.74rem;
      color: var(--arch-ui-text-muted);
    }

    .area-select {
      flex: 1;
      min-width: 0;
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 6px;
      color: var(--arch-ui-text);
      padding: 4px 6px;
      font: inherit;
      font-size: 0.74rem;
      outline: none;
    }

    .area-select:focus {
      border-color: var(--arch-ui-accent);
    }

    .hidden-toggle {
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      white-space: nowrap;
    }

    .hidden-toggle input {
      accent-color: var(--arch-ui-accent);
    }

    .results-info {
      font-size: 0.72rem;
      color: var(--arch-ui-text-muted);
      padding: 0 2px;
    }

    .entity-card:focus-visible,
    .furniture-card:focus-visible {
      outline: 2px solid var(--arch-ui-accent);
      outline-offset: 1px;
    }

    .more-btn {
      background: var(--dr-item-bg);
      border: 1px dashed color-mix(in srgb, var(--arch-ui-accent) 45%, transparent);
      border-radius: 8px;
      color: var(--dr-accent-ink);
      padding: 8px;
      font: inherit;
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
    }

    .more-btn:hover {
      background: var(--dr-hover-bg);
    }
  `];

  @property({ type: Object })
  public hass: any;

  @property({ type: Boolean, reflect: true })
  public collapsed: boolean = false;

  @state()
  private activeTab: DrawerTab = 'entities';

  @state()
  private furnitureCategory: string = ALL_FURNITURE;

  @state()
  private entitySearch: string = '';

  @state()
  private furnitureSearch: string = '';

  @state()
  private activeCategory: string = 'all';

  @state()
  private areaFilter: string = ALL_AREAS;

  @state()
  private showSecondary: boolean = false;

  @state()
  private visibleLimit: number = PAGE_SIZE;

  /** Re-rendu au changement de langue (voir shouldUpdate). */
  private readonly i18n = new LocalizeController(this);

  // Index des entités : reconstruit seulement si l'ensemble des entity_id, leurs noms ou les registres changent.
  private rowsSource: { states: unknown; entities: unknown; devices: unknown } | null = null;
  private rows: EntityRow[] = [];
  /** Nombre de clés de hass.states à la construction de l'index (les identifiants invalides n'y figurent pas). */
  private indexedStateCount = 0;
  private availableDomains = new Set<string>();
  private secondaryCount = 0;
  private areaOptions: { rows: EntityRow[]; areas: unknown; options: Array<{ id: string; name: string }> } | null = null;

  // Liste filtrée : recalculée seulement si l'index ou les critères changent.
  private filteredFor: { rows: EntityRow[]; key: string } | null = null;
  private filtered: EntityRow[] = [];

  // Dernier rendu : sert à ignorer les changements d'état d'entités non affichées.
  private renderedRows: EntityRow[] | null = null;
  private renderedIds: string[] = [];

  protected shouldUpdate(changed: PropertyValues<this>): boolean {
    // Thème clair/sombre : attribut de l'hôte, sans re-rendu (même quand le volet est replié), reposé
    // seulement si les thèmes changent (hass change à chaque état d'entité).
    if (changed.has('hass') && (!this.hasAttribute('scheme') || changed.get('hass')?.themes !== this.hass?.themes)) {
      applyColorScheme(this, this.hass);
    }
    if ((changed as PropertyValues).has(LANGUAGE_CHANGED_KEY)) return true;
    if (!changed.has('hass') || changed.size > 1) return true;
    // Volet replié ou onglet Meubles : un changement d'état HA n'a aucun effet visible.
    if (this.collapsed || this.activeTab !== 'entities') return false;
    const oldHass = changed.get('hass');
    const oldStates = oldHass?.states;
    const newStates = this.hass?.states;
    if (!oldStates || !newStates) return true;
    // Zones renommées / ajoutées (liste du filtre) ou langue / format régional changés (affichage des états).
    if (oldHass.areas !== this.hass.areas || localeKey(oldHass) !== localeKey(this.hass)) return true;
    if (this.getRows() !== this.renderedRows) return true;
    return this.renderedIds.some(id => oldStates[id] !== newStates[id]);
  }

  private getRows(): EntityRow[] {
    const hass = this.hass;
    const states: Record<string, any> | undefined = hass?.states;
    if (!states) {
      this.rowsSource = null;
      this.indexedStateCount = 0;
      this.rows = [];
      this.availableDomains = new Set();
      this.secondaryCount = 0;
      return this.rows;
    }
    const src = this.rowsSource;
    if (src && src.entities === hass.entities && src.devices === hass.devices) {
      if (src.states === states || this.hasSameEntities(states)) {
        src.states = states;
        return this.rows;
      }
    }
    this.rowsSource = { states, entities: hass.entities, devices: hass.devices };
    this.indexedStateCount = Object.keys(states).length;
    this.rows = this.buildRows(states, hass.entities, hass.devices);
    this.availableDomains = new Set(this.rows.map(r => r.domain));
    this.secondaryCount = this.rows.reduce((n, r) => n + (r.secondary ? 1 : 0), 0);
    return this.rows;
  }

  /** Même ensemble d'entity_id et mêmes noms que l'index actuel (parcours linéaire, sans allocation). */
  private hasSameEntities(states: Record<string, any>): boolean {
    let count = 0;
    for (const id in states) {
      if (Object.prototype.hasOwnProperty.call(states, id)) count++;
    }
    if (count !== this.indexedStateCount) return false;
    for (const row of this.rows) {
      const stateObj = states[row.entityId];
      if (!stateObj || friendlyName(stateObj, row.entityId) !== row.name) return false;
    }
    return true;
  }

  private buildRows(states: Record<string, any>, entities: any, devices: any): EntityRow[] {
    const rows: EntityRow[] = [];
    for (const entityId of Object.keys(states)) {
      const domain = entityDomain(entityId);
      if (!domain) continue;
      const name = friendlyName(states[entityId], entityId);
      const entry = entities?.[entityId];
      const areaId: unknown = entry?.area_id ?? (entry?.device_id ? devices?.[entry.device_id]?.area_id : undefined);
      rows.push({
        entityId,
        name,
        domain,
        areaId: typeof areaId === 'string' && areaId !== '' ? areaId : undefined,
        secondary: entry?.hidden === true || entry?.entity_category === 'diagnostic' || entry?.entity_category === 'config',
        searchText: normalizeSearch(`${name} ${entityId}`),
      });
    }
    return rows.sort((a, b) => collator.compare(a.name, b.name) || a.entityId.localeCompare(b.entityId));
  }

  private getFiltered(rows: EntityRow[], areaFilter: string): EntityRow[] {
    const key = [this.entitySearch.trim(), this.activeCategory, areaFilter, this.showSecondary ? '1' : '0'].join('\u0000');
    if (this.filteredFor && this.filteredFor.rows === rows && this.filteredFor.key === key) return this.filtered;

    const filter = ENTITY_FILTERS.find(f => f.id === this.activeCategory);
    const domains = filter && filter.domains.length > 0 ? new Set(filter.domains) : null;
    const terms = normalizeSearch(this.entitySearch.trim()).split(/\s+/).filter(Boolean);
    this.filtered = rows.filter(r =>
      (this.showSecondary || !r.secondary) &&
      (domains === null || domains.has(r.domain)) &&
      (areaFilter === ALL_AREAS || r.areaId === areaFilter) &&
      terms.every(t => r.searchText.includes(t))
    );
    this.filteredFor = { rows, key };
    return this.filtered;
  }

  /** Zones HA ayant au moins une entité, triées par nom (mémorisées tant que l'index et les zones ne changent pas). */
  private getAreaOptions(rows: EntityRow[]): Array<{ id: string; name: string }> {
    const areas = this.hass?.areas;
    if (this.areaOptions && this.areaOptions.rows === rows && this.areaOptions.areas === areas) {
      return this.areaOptions.options;
    }
    const ids = new Set<string>();
    for (const r of rows) if (r.areaId) ids.add(r.areaId);
    const options = !areas ? [] : [...ids]
      .map(id => ({ id, name: typeof areas[id]?.name === 'string' ? areas[id].name as string : id }))
      .sort((a, b) => collator.compare(a.name, b.name));
    this.areaOptions = { rows, areas, options };
    return options;
  }

  /** Change un critère de filtre et revient à la première page de résultats. */
  private setEntityCriteria(update: () => void) {
    update();
    this.visibleLimit = PAGE_SIZE;
  }

  private entityPayload(row: EntityRow): DrawerItemPayload {
    return { kind: 'entity', entityId: row.entityId, domain: row.domain };
  }

  private furniturePayload(item: FurnitureCatalogTemplate): DrawerItemPayload {
    return { kind: 'furniture', furnitureType: item.type };
  }

  private handleDragStart(e: DragEvent, payload: DrawerItemPayload) {
    if (e.dataTransfer) {
      e.dataTransfer.setData('application/json', JSON.stringify(payload));
      e.dataTransfer.effectAllowed = 'copy';
    }
  }

  /** « Toucher pour placer » : alternative au glisser-déposer (écrans tactiles, clavier). */
  private pickItem(payload: DrawerItemPayload) {
    this.dispatchEvent(new CustomEvent('drawer-item-picked', {
      detail: { payload },
      bubbles: true,
      composed: true
    }));
  }

  private handleItemKeyDown(e: KeyboardEvent, payload: DrawerItemPayload) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.pickItem(payload);
    }
  }

  private toggleCollapse() {
    this.dispatchEvent(new CustomEvent('toggle-collapse', {
      bubbles: true,
      composed: true
    }));
  }

  /** Onglets au clavier : flèches gauche/droite, Début et Fin changent d'onglet (focus suivant l'onglet actif). */
  private handleTabKeyDown(e: KeyboardEvent) {
    const index = TABS.indexOf(this.activeTab);
    let next: DrawerTab | undefined;
    switch (e.key) {
      case 'ArrowRight':
        next = TABS[(index + 1) % TABS.length];
        break;
      case 'ArrowLeft':
        next = TABS[(index - 1 + TABS.length) % TABS.length];
        break;
      case 'Home':
        next = TABS[0];
        break;
      case 'End':
        next = TABS[TABS.length - 1];
        break;
      default:
        return;
    }
    e.preventDefault();
    e.stopPropagation();
    this.activeTab = next;
    void this.updateComplete.then(() => this.renderRoot.querySelector<HTMLElement>(`#drawer-tab-${next}`)?.focus());
  }

  private formatState(stateObj: any): string {
    if (!stateObj) return '';
    if (typeof this.hass?.formatEntityState === 'function') {
      try {
        return String(this.hass.formatEntityState(stateObj));
      } catch {
        // Formatage indisponible pour cette entité : repli sur l'état brut.
      }
    }
    const unit = stateObj.attributes?.unit_of_measurement;
    return `${stateObj.state}${unit ? ' ' + unit : ''}`;
  }

  private renderEntitiesTab(rows: EntityRow[]) {
    const states: Record<string, any> = this.hass?.states ?? {};
    const areaOptions = this.getAreaOptions(rows);
    // Zone choisie puis supprimée (ou registre des zones pas encore chargé) : le filtre, devenu
    // invisible, ne doit pas vider la liste.
    const areaFilter = areaOptions.some(a => a.id === this.areaFilter) ? this.areaFilter : ALL_AREAS;
    const filtered = this.getFiltered(rows, areaFilter);
    const shown = filtered.slice(0, this.visibleLimit);
    const remaining = filtered.length - shown.length;
    const chips = ENTITY_FILTERS.filter(f =>
      f.domains.length === 0 || f.id === this.activeCategory || f.domains.some(d => this.availableDomains.has(d)));
    this.renderedRows = rows;
    this.renderedIds = shown.map(r => r.entityId);

    return html`
      <div class="search-section">
        <div class="search-input-wrapper">
          <input
            type="search"
            class="search-input"
            placeholder=${localize('ui.drawer.search_entities_placeholder')}
            aria-label=${localize('ui.drawer.search_entities')}
            .value=${this.entitySearch}
            @input=${(e: Event) => this.setEntityCriteria(() => this.entitySearch = (e.target as HTMLInputElement).value)}
          />
        </div>

        <div class="categories-bar" role="group" aria-label=${localize('ui.drawer.filter_by_type')}>
          ${chips.map(f => html`
            <button
              type="button"
              class="cat-btn ${this.activeCategory === f.id ? 'active' : ''}"
              aria-pressed=${this.activeCategory === f.id ? 'true' : 'false'}
              @click=${() => this.setEntityCriteria(() => this.activeCategory = f.id)}
            >${localize(`ui.drawer.filter.${f.id}`)}</button>
          `)}
        </div>

        <div class="filters-row">
          ${areaOptions.length > 0 ? html`
            <select
              class="area-select"
              aria-label=${localize('ui.drawer.filter_by_area')}
              .value=${live(areaFilter)}
              @change=${(e: Event) => this.setEntityCriteria(() => this.areaFilter = (e.target as HTMLSelectElement).value)}
            >
              <option value=${ALL_AREAS} ?selected=${areaFilter === ALL_AREAS}>${localize('ui.drawer.all_areas')}</option>
              ${areaOptions.map(a => html`<option value=${a.id} ?selected=${areaFilter === a.id}>${a.name}</option>`)}
            </select>
          ` : nothing}
          <label class="hidden-toggle" title=${localize('ui.drawer.show_hidden_tooltip')}>
            <input
              type="checkbox"
              .checked=${this.showSecondary}
              @change=${(e: Event) => this.setEntityCriteria(() => this.showSecondary = (e.target as HTMLInputElement).checked)}
            />
            <span>${localize('ui.drawer.show_hidden')}</span>
          </label>
        </div>
      </div>

      <div class="entities-list">
        ${!this.hass?.states ? html`
          <div class="empty-message" role="status">${localize('ui.drawer.connecting')}</div>
        ` : filtered.length === 0 ? html`
          <div class="empty-message" role="status">${localize('ui.drawer.no_entities')}</div>
        ` : html`
          <div class="results-info" aria-live="polite">
            ${localizeCount('ui.drawer.results', filtered.length)}${remaining > 0
              ? ` ${localize('ui.drawer.results_shown', { count: formatNumber(shown.length) })}`
              : ''}
          </div>
          ${repeat(shown, row => row.entityId, row => {
            const stateObj = states[row.entityId];
            const payload = this.entityPayload(row);
            const stateText = this.formatState(stateObj);
            return html`
              <div
                class="entity-card"
                draggable="true"
                tabindex="0"
                role="button"
                aria-label=${localize('ui.drawer.place_entity', { name: row.name, state: stateText })}
                @dragstart=${(e: DragEvent) => this.handleDragStart(e, payload)}
                @click=${() => this.pickItem(payload)}
                @keydown=${(e: KeyboardEvent) => this.handleItemKeyDown(e, payload)}
                title=${localize('ui.drawer.drag_entity_tooltip')}
              >
                <div class="entity-info">
                  <span class="entity-icon" aria-hidden="true">${DOMAIN_ICONS[row.domain] ?? DEFAULT_DOMAIN_ICON}</span>
                  <div class="entity-details">
                    <span class="entity-name">${row.name}</span>
                    <span class="entity-id">${row.entityId}</span>
                  </div>
                </div>

                <span class="entity-state-badge ${isActiveState(row.entityId, stateObj) ? 'state-on' : 'state-off'}" title=${stateText}>
                  ${stateText}
                </span>
              </div>
            `;
          })}
          ${remaining > 0 ? html`
            <button type="button" class="more-btn" @click=${() => this.visibleLimit += PAGE_SIZE}>
              ${localizeCount('ui.drawer.show_more', remaining, { batch: formatNumber(Math.min(PAGE_SIZE, remaining)) })}
            </button>
          ` : nothing}
        `}
      </div>

      <div class="drag-hint">
        <span aria-hidden="true">👆</span>
        <span>${localize('ui.drawer.drag_entity_hint')}</span>
      </div>
    `;
  }

  private renderFurnitureTab() {
    let furniture = FURNITURE_CATALOG;
    if (this.furnitureCategory !== ALL_FURNITURE) {
      furniture = furniture.filter(f => f.category === this.furnitureCategory);
    }
    const terms = normalizeSearch(this.furnitureSearch.trim()).split(/\s+/).filter(Boolean);
    if (terms.length > 0) {
      furniture = furniture.filter(f => {
        const text = furnitureSearchText(f);
        return terms.every(t => text.includes(t));
      });
    }
    const filters: ReadonlyArray<{ id: string; label: string }> = [
      { id: ALL_FURNITURE, label: localize('ui.drawer.filter.all') },
      ...FURNITURE_FILTER_CATEGORIES.map(cat => ({ id: cat, label: furnitureCategoryLabel(cat) })),
    ];

    return html`
      <div class="search-section">
        <div class="search-input-wrapper">
          <input
            type="search"
            class="search-input"
            placeholder=${localize('ui.drawer.search_furniture_placeholder')}
            aria-label=${localize('ui.drawer.search_furniture')}
            .value=${this.furnitureSearch}
            @input=${(e: Event) => this.furnitureSearch = (e.target as HTMLInputElement).value}
          />
        </div>

        <div class="categories-bar" role="group" aria-label=${localize('ui.drawer.filter_by_category')}>
          ${filters.map(f => html`
            <button
              type="button"
              class="cat-btn ${this.furnitureCategory === f.id ? 'active' : ''}"
              aria-pressed=${this.furnitureCategory === f.id ? 'true' : 'false'}
              @click=${() => this.furnitureCategory = f.id}
            >${f.label}</button>
          `)}
        </div>
      </div>

      <div class="furniture-grid">
        ${furniture.length === 0 ? html`
          <div class="empty-message" role="status" style="grid-column: 1 / -1;">${localize('ui.drawer.no_furniture')}</div>
        ` : furniture.map(item => {
          const payload = this.furniturePayload(item);
          const name = furnitureTemplateName(item.type);
          const dimensions = furnitureDimensions(item);
          return html`
            <div
              class="furniture-card"
              draggable="true"
              tabindex="0"
              role="button"
              aria-label=${localize('ui.drawer.place_furniture', { name, dimensions })}
              @dragstart=${(e: DragEvent) => this.handleDragStart(e, payload)}
              @click=${() => this.pickItem(payload)}
              @keydown=${(e: KeyboardEvent) => this.handleItemKeyDown(e, payload)}
              title=${localize('ui.drawer.drag_furniture_tooltip', { dimensions })}
            >
              <span class="furniture-card-icon" aria-hidden="true">${item.icon}</span>
              <svg
                class="furniture-card-preview"
                width=${PREVIEW_WIDTH}
                height=${PREVIEW_HEIGHT}
                viewBox="${-PREVIEW_WIDTH / 2} ${-PREVIEW_HEIGHT / 2} ${PREVIEW_WIDTH} ${PREVIEW_HEIGHT}"
                aria-hidden="true"
              >${renderFurnitureSymbol({ type: item.type }, { pixelsPerMeter: PREVIEW_PIXELS_PER_METER.get(item.type) ?? PREVIEW_MAX_PIXELS_PER_METER })}</svg>
              <span class="furniture-card-name">${name}</span>
              <span class="furniture-card-dim">${dimensions}</span>
            </div>
          `;
        })}
      </div>

      <div class="drag-hint">
        <span aria-hidden="true">👆</span>
        <span>${localize('ui.drawer.drag_furniture_hint')}</span>
      </div>
    `;
  }

  private renderTab(tab: DrawerTab, icon: string, count: number) {
    const selected = this.activeTab === tab;
    return html`
      <button
        type="button"
        id="drawer-tab-${tab}"
        class="tab-btn ${selected ? 'active' : ''}"
        role="tab"
        aria-selected=${selected ? 'true' : 'false'}
        aria-controls=${TAB_PANEL_ID}
        tabindex=${selected ? 0 : -1}
        @click=${() => this.activeTab = tab}
      >
        <span aria-hidden="true">${icon}</span>
        <span>${localize(`ui.drawer.tab.${tab}`)}</span>
        <span class="count-badge" title=${localize(`ui.drawer.tab.${tab}_count`)}>${formatNumber(count)}</span>
      </button>
    `;
  }

  render() {
    if (this.collapsed) return nothing;

    const rows = this.getRows();
    const entityCount = this.showSecondary ? rows.length : rows.length - this.secondaryCount;
    const entitiesTab = this.activeTab === 'entities';

    return html`
      <div class="drawer-header">
        <h2 class="drawer-title">
          <span aria-hidden="true">${entitiesTab ? '⚡' : '🛋️'}</span>
          <span>${localize(entitiesTab ? 'ui.drawer.title_entities' : 'ui.drawer.title_furniture')}</span>
        </h2>
        <button
          type="button"
          class="btn-toggle"
          @click=${this.toggleCollapse}
          title=${localize('ui.drawer.collapse')}
          aria-label=${localize('ui.drawer.collapse')}
        >
          <span aria-hidden="true">⇤</span>
        </button>
      </div>

      <div class="drawer-tabs" role="tablist" aria-label=${localize('ui.drawer.tabs')} @keydown=${this.handleTabKeyDown}>
        ${this.renderTab('entities', '⚡', entityCount)}
        ${this.renderTab('furniture', '🛋️', FURNITURE_CATALOG.length)}
      </div>

      <div class="tab-panel" id=${TAB_PANEL_ID} role="tabpanel" aria-labelledby="drawer-tab-${this.activeTab}">
        ${entitiesTab ? this.renderEntitiesTab(rows) : this.renderFurnitureTab()}
      </div>
    `;
  }
}

defineElement('home-architect-entity-drawer', HomeArchitectEntityDrawer);

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-entity-drawer': HomeArchitectEntityDrawer;
  }
}
