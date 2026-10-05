import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { live } from 'lit/directives/live.js';
import { defineElement } from '../core/define';
import {
  FURNITURE_CATALOG, FURNITURE_CATEGORY_LABELS, FURNITURE_FILTER_CATEGORIES, FurnitureCatalogTemplate
} from '../core/furniture-catalog';
import { entityDomain } from '../core/project-model';

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
  label: string;
  /** Domaines retenus ; vide = tous. */
  domains: readonly string[];
}

const ENTITY_FILTERS: readonly EntityFilter[] = [
  { id: 'all', label: 'Tous', domains: [] },
  { id: 'lights', label: 'Lumières', domains: ['light'] },
  { id: 'switches', label: 'Prises & interrupteurs', domains: ['switch', 'input_boolean'] },
  { id: 'sensors', label: 'Capteurs', domains: ['sensor', 'binary_sensor'] },
  { id: 'climate', label: 'Climat', domains: ['climate', 'water_heater', 'humidifier'] },
  { id: 'covers', label: 'Volets & vannes', domains: ['cover', 'valve'] },
  { id: 'fans', label: 'Ventilation', domains: ['fan'] },
  { id: 'media', label: 'Médias', domains: ['media_player', 'remote'] },
  { id: 'security', label: 'Serrures & alarmes', domains: ['lock', 'alarm_control_panel', 'siren'] },
  { id: 'cameras', label: 'Caméras', domains: ['camera'] },
  { id: 'actions', label: 'Scènes & scripts', domains: ['scene', 'script', 'button', 'input_button', 'automation'] },
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

/** Nombre d'entités rendues avant le bouton « Afficher plus ». */
const PAGE_SIZE = 200;
const ALL_AREAS = '';

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

/** Filtres de meubles : catégories présentes dans le catalogue (table et libellés du catalogue). */
const FURNITURE_FILTERS: ReadonlyArray<{ id: string; label: string }> = [
  { id: 'all', label: 'Tous' },
  ...FURNITURE_FILTER_CATEGORIES.map(cat => ({ id: cat, label: FURNITURE_CATEGORY_LABELS[cat] ?? cat })),
];

export class HomeArchitectEntityDrawer extends LitElement {
  static styles = css`
    :host {
      width: 320px;
      height: 100%;
      flex-shrink: 0;
      background: rgba(15, 23, 42, 0.96);
      border-left: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: -6px 0 24px rgba(0, 0, 0, 0.35);
      display: flex;
      flex-direction: column;
      z-index: 25;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: #f8fafc;
      position: relative;
      transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
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
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(30, 41, 59, 0.4);
    }

    .drawer-title {
      font-size: 0.95rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #38bdf8;
    }

    .count-badge {
      font-size: 0.72rem;
      padding: 2px 7px;
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border-radius: 9999px;
      border: 1px solid rgba(56, 189, 248, 0.3);
      font-weight: 700;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .btn-toggle {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      color: #94a3b8;
      font-size: 14px;
      cursor: pointer;
      padding: 4px 8px;
      transition: all 0.2s ease;
    }

    .btn-toggle:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
      border-color: #38bdf8;
    }

    .search-section {
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(15, 23, 42, 0.3);
    }

    .search-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-input {
      background: rgba(30, 41, 59, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      color: #f8fafc;
      padding: 7px 12px;
      font-size: 0.83rem;
      outline: none;
      width: 100%;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }

    .search-input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);
    }

    .categories-bar {
      display: flex;
      gap: 5px;
      overflow-x: auto;
      padding-bottom: 4px;
      scrollbar-width: none;
    }

    .categories-bar::-webkit-scrollbar {
      display: none;
    }

    .cat-btn {
      background: rgba(51, 65, 85, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      color: #94a3b8;
      padding: 4px 8px;
      font-size: 0.73rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }

    .cat-btn:hover {
      background: rgba(71, 85, 105, 0.8);
      color: #f1f5f9;
    }

    .cat-btn.active {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
      box-shadow: 0 0 8px rgba(56, 189, 248, 0.3);
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
      background: rgba(30, 41, 59, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 9px;
      padding: 9px 11px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: grab;
      transition: all 0.18s ease;
      user-select: none;
    }

    .entity-card:hover {
      background: rgba(51, 65, 85, 0.9);
      border-color: #38bdf8;
      transform: translateX(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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
      color: #f1f5f9;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .entity-id {
      font-size: 0.70rem;
      color: #64748b;
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
    }

    .state-on {
      background: rgba(234, 179, 8, 0.2);
      color: #facc15;
      border: 1px solid rgba(234, 179, 8, 0.4);
    }

    .state-off {
      background: rgba(100, 116, 139, 0.2);
      color: #94a3b8;
    }

    .drag-hint {
      padding: 10px 14px;
      background: rgba(2, 132, 199, 0.12);
      border-top: 1px solid rgba(56, 189, 248, 0.2);
      font-size: 0.74rem;
      color: #38bdf8;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .drawer-tabs {
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(15, 23, 42, 0.5);
    }

    .tab-btn {
      flex: 1;
      padding: 10px 8px;
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      color: #94a3b8;
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
      color: #f1f5f9;
      background: rgba(255, 255, 255, 0.04);
    }

    .tab-btn.active {
      color: #38bdf8;
      border-bottom-color: #38bdf8;
      background: rgba(56, 189, 248, 0.08);
    }

    .furniture-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      padding: 10px 14px;
      overflow-y: auto;
      flex: 1;
    }

    .furniture-card {
      background: rgba(30, 41, 59, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.08);
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
      background: rgba(51, 65, 85, 0.9);
      border-color: #38bdf8;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .furniture-card:active {
      cursor: grabbing;
    }

    .furniture-card-icon {
      font-size: 1.5rem;
    }

    .furniture-card-name {
      font-size: 0.76rem;
      font-weight: 600;
      color: #f1f5f9;
      line-height: 1.2;
    }

    .furniture-card-dim {
      font-size: 0.68rem;
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-weight: 600;
    }

    .empty-message {
      padding: 30px 16px;
      text-align: center;
      color: #64748b;
      font-size: 0.83rem;
    }

    .filters-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.74rem;
      color: #94a3b8;
    }

    .area-select {
      flex: 1;
      min-width: 0;
      background: rgba(30, 41, 59, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 6px;
      color: #f1f5f9;
      padding: 4px 6px;
      font-size: 0.74rem;
      outline: none;
    }

    .area-select:focus {
      border-color: #38bdf8;
    }

    .hidden-toggle {
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      white-space: nowrap;
    }

    .results-info {
      font-size: 0.72rem;
      color: #64748b;
      padding: 0 2px;
    }

    .entity-card:focus-visible,
    .furniture-card:focus-visible {
      outline: 2px solid #38bdf8;
      outline-offset: 1px;
    }

    .more-btn {
      background: rgba(51, 65, 85, 0.5);
      border: 1px dashed rgba(56, 189, 248, 0.4);
      border-radius: 8px;
      color: #38bdf8;
      padding: 8px;
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
    }

    .more-btn:hover {
      background: rgba(56, 189, 248, 0.12);
    }
  `;

  @property({ type: Object })
  public hass: any;

  @property({ type: Boolean, reflect: true })
  public collapsed: boolean = false;

  @state()
  private activeTab: 'entities' | 'furniture' = 'entities';

  @state()
  private furnitureCategory: string = 'all';

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
            placeholder="Rechercher une entité..."
            aria-label="Rechercher une entité"
            .value=${this.entitySearch}
            @input=${(e: Event) => this.setEntityCriteria(() => this.entitySearch = (e.target as HTMLInputElement).value)}
          />
        </div>

        <div class="categories-bar" role="group" aria-label="Filtrer par type">
          ${chips.map(f => html`
            <button
              class="cat-btn ${this.activeCategory === f.id ? 'active' : ''}"
              aria-pressed=${this.activeCategory === f.id ? 'true' : 'false'}
              @click=${() => this.setEntityCriteria(() => this.activeCategory = f.id)}
            >${f.label}</button>
          `)}
        </div>

        <div class="filters-row">
          ${areaOptions.length > 0 ? html`
            <select
              class="area-select"
              aria-label="Filtrer par zone"
              .value=${live(areaFilter)}
              @change=${(e: Event) => this.setEntityCriteria(() => this.areaFilter = (e.target as HTMLSelectElement).value)}
            >
              <option value=${ALL_AREAS} ?selected=${areaFilter === ALL_AREAS}>Toutes les zones</option>
              ${areaOptions.map(a => html`<option value=${a.id} ?selected=${areaFilter === a.id}>${a.name}</option>`)}
            </select>
          ` : nothing}
          <label class="hidden-toggle" title="Afficher aussi les entités masquées, de diagnostic ou de configuration">
            <input
              type="checkbox"
              .checked=${this.showSecondary}
              @change=${(e: Event) => this.setEntityCriteria(() => this.showSecondary = (e.target as HTMLInputElement).checked)}
            />
            <span>Masquées</span>
          </label>
        </div>
      </div>

      <div class="entities-list">
        ${!this.hass?.states ? html`
          <div class="empty-message">Connexion à Home Assistant…</div>
        ` : filtered.length === 0 ? html`
          <div class="empty-message">Aucune entité trouvée</div>
        ` : html`
          <div class="results-info" aria-live="polite">
            ${filtered.length} entité${filtered.length > 1 ? 's' : ''}${remaining > 0 ? ` (${shown.length} affichées)` : ''}
          </div>
          ${repeat(shown, row => row.entityId, row => {
            const stateObj = states[row.entityId];
            const payload = this.entityPayload(row);
            return html`
              <div 
                class="entity-card" 
                draggable="true"
                tabindex="0"
                role="button"
                @dragstart=${(e: DragEvent) => this.handleDragStart(e, payload)}
                @click=${() => this.pickItem(payload)}
                @keydown=${(e: KeyboardEvent) => this.handleItemKeyDown(e, payload)}
                title="Glissez et déposez sur une pièce du plan"
              >
                <div class="entity-info">
                  <span class="entity-icon">${DOMAIN_ICONS[row.domain] ?? DEFAULT_DOMAIN_ICON}</span>
                  <div class="entity-details">
                    <span class="entity-name">${row.name}</span>
                    <span class="entity-id">${row.entityId}</span>
                  </div>
                </div>

                <span class="entity-state-badge ${stateObj?.state === 'on' ? 'state-on' : 'state-off'}">
                  ${this.formatState(stateObj)}
                </span>
              </div>
            `;
          })}
          ${remaining > 0 ? html`
            <button class="more-btn" @click=${() => this.visibleLimit += PAGE_SIZE}>
              Afficher ${Math.min(PAGE_SIZE, remaining)} de plus (${remaining} restante${remaining > 1 ? 's' : ''})
            </button>
          ` : nothing}
        `}
      </div>

      <div class="drag-hint">
        <span>👆</span>
        <span>Glissez une entité sur une pièce du plan</span>
      </div>
    `;
  }

  private renderFurnitureTab() {
    let furniture = FURNITURE_CATALOG;
    if (this.furnitureCategory !== 'all') {
      furniture = furniture.filter(f => f.category === this.furnitureCategory);
    }
    const terms = normalizeSearch(this.furnitureSearch.trim()).split(/\s+/).filter(Boolean);
    if (terms.length > 0) {
      furniture = furniture.filter(f => {
        const text = normalizeSearch(f.name);
        return terms.every(t => text.includes(t));
      });
    }

    return html`
      <div class="search-section">
        <div class="search-input-wrapper">
          <input 
            type="search" 
            class="search-input" 
            placeholder="Rechercher un meuble..."
            aria-label="Rechercher un meuble"
            .value=${this.furnitureSearch}
            @input=${(e: Event) => this.furnitureSearch = (e.target as HTMLInputElement).value}
          />
        </div>

        <div class="categories-bar" role="group" aria-label="Filtrer par catégorie">
          ${FURNITURE_FILTERS.map(f => html`
            <button
              class="cat-btn ${this.furnitureCategory === f.id ? 'active' : ''}"
              aria-pressed=${this.furnitureCategory === f.id ? 'true' : 'false'}
              @click=${() => this.furnitureCategory = f.id}
            >${f.label}</button>
          `)}
        </div>
      </div>

      <div class="furniture-grid">
        ${furniture.length === 0 ? html`
          <div class="empty-message" style="grid-column: 1 / -1;">Aucun meuble trouvé</div>
        ` : furniture.map(item => {
          const payload = this.furniturePayload(item);
          return html`
            <div 
              class="furniture-card" 
              draggable="true"
              tabindex="0"
              role="button"
              @dragstart=${(e: DragEvent) => this.handleDragStart(e, payload)}
              @click=${() => this.pickItem(payload)}
              @keydown=${(e: KeyboardEvent) => this.handleItemKeyDown(e, payload)}
              title="Glissez et déposez sur le plan (${item.width.toFixed(2)} × ${item.length.toFixed(2)} m)"
            >
              <span class="furniture-card-icon">${item.icon}</span>
              <span class="furniture-card-name">${item.name}</span>
              <span class="furniture-card-dim">${item.width.toFixed(2)} × ${item.length.toFixed(2)} m</span>
            </div>
          `;
        })}
      </div>

      <div class="drag-hint">
        <span>👆</span>
        <span>Glissez un meuble sur le plan (R pour pivoter)</span>
      </div>
    `;
  }

  render() {
    if (this.collapsed) return nothing;

    const rows = this.getRows();
    const entityCount = this.showSecondary ? rows.length : rows.length - this.secondaryCount;

    return html`
      <div class="drawer-header">
        <div class="drawer-title">
          <span>${this.activeTab === 'entities' ? '⚡' : '🛋️'}</span>
          <span>${this.activeTab === 'entities' ? 'Objets & Domotique' : 'Meubles & Déco'}</span>
        </div>
        <button class="btn-toggle" @click=${this.toggleCollapse} title="Masquer / Réduire le volet">
          ⇤
        </button>
      </div>

      <div class="drawer-tabs" role="tablist">
        <button 
          class="tab-btn ${this.activeTab === 'entities' ? 'active' : ''}" 
          role="tab"
          aria-selected=${this.activeTab === 'entities' ? 'true' : 'false'}
          @click=${() => this.activeTab = 'entities'}
        >
          <span>⚡</span>
          <span>Entités HA</span>
          <span class="count-badge" title="Nombre total d'entités">${entityCount}</span>
        </button>
        <button 
          class="tab-btn ${this.activeTab === 'furniture' ? 'active' : ''}" 
          role="tab"
          aria-selected=${this.activeTab === 'furniture' ? 'true' : 'false'}
          @click=${() => this.activeTab = 'furniture'}
        >
          <span>🛋️</span>
          <span>Meubles</span>
          <span class="count-badge" title="Nombre total de meubles">${FURNITURE_CATALOG.length}</span>
        </button>
      </div>

      ${this.activeTab === 'entities' ? this.renderEntitiesTab(rows) : this.renderFurnitureTab()}
    `;
  }
}

defineElement('home-architect-entity-drawer', HomeArchitectEntityDrawer);

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-entity-drawer': HomeArchitectEntityDrawer;
  }
}
