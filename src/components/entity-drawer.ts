import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface EntityItem {
  entity_id: string;
  name: string;
  state: string;
  domain: string;
  icon: string;
  unit?: string;
}

const DOMAIN_ICONS: Record<string, string> = {
  light: '💡',
  switch: '🔌',
  binary_sensor: '🚨',
  climate: '🌡️',
  sensor: '📊',
  camera: '📷',
  media_player: '📺',
  cover: '🪟',
  fan: '💨',
  default: '⚡'
};

@customElement('home-architect-entity-drawer')
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

    .empty-message {
      padding: 30px 16px;
      text-align: center;
      color: #64748b;
      font-size: 0.83rem;
    }
  `;

  @property({ type: Object })
  public hass: any;

  @property({ type: Boolean, reflect: true })
  public collapsed: boolean = false;

  @state()
  private searchQuery: string = '';

  @state()
  private activeCategory: string = 'all';

  private getEntities(): EntityItem[] {
    if (this.hass?.states) {
      return Object.values(this.hass.states).map((s: any) => {
        const domain = s.entity_id.split('.')[0];
        const icon = DOMAIN_ICONS[domain] || DOMAIN_ICONS.default;
        return {
          entity_id: s.entity_id,
          name: s.attributes?.friendly_name || s.entity_id,
          state: s.state,
          domain,
          icon,
          unit: s.attributes?.unit_of_measurement
        };
      });
    }

    // Échantillon de secours pour démonstration / standalone
    return [
      { entity_id: 'light.salon_plafonnier', name: 'Plafonnier Salon', state: 'on', domain: 'light', icon: '💡' },
      { entity_id: 'light.applique_cuisine', name: 'Applique Cuisine', state: 'off', domain: 'light', icon: '💡' },
      { entity_id: 'switch.prise_tv', name: 'Prise Smart TV', state: 'on', domain: 'switch', icon: '🔌' },
      { entity_id: 'binary_sensor.porte_entree', name: 'Capteur Porte Entrée', state: 'off', domain: 'binary_sensor', icon: '🚪' },
      { entity_id: 'binary_sensor.presence_salon', name: 'Radar Présence Salon', state: 'on', domain: 'binary_sensor', icon: '🚨' },
      { entity_id: 'climate.thermostat_sejour', name: 'Thermostat Séjour', state: '21.5', domain: 'climate', icon: '🌡️', unit: '°C' },
      { entity_id: 'sensor.temperature_chambre', name: 'Température Chambre', state: '19.8', domain: 'sensor', icon: '🌡️', unit: '°C' },
      { entity_id: 'camera.jardin', name: 'Caméra Jardin Extérieur', state: 'idle', domain: 'camera', icon: '📷' }
    ];
  }

  private handleDragStart(e: DragEvent, item: EntityItem) {
    if (e.dataTransfer) {
      e.dataTransfer.setData('application/json', JSON.stringify({
        entityId: item.entity_id,
        domain: item.domain,
        name: item.name,
        icon: item.icon
      }));
      e.dataTransfer.effectAllowed = 'copy';
    }
  }

  private toggleCollapse() {
    this.dispatchEvent(new CustomEvent('toggle-collapse', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    if (this.collapsed) return null;

    let allEntities = this.getEntities();
    let entities = allEntities;

    if (this.activeCategory !== 'all') {
      entities = entities.filter(e => e.domain === this.activeCategory);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      entities = entities.filter(e => e.name.toLowerCase().includes(q) || e.entity_id.toLowerCase().includes(q));
    }

    return html`
      <div class="drawer-header">
        <div class="drawer-title">
          <span>⚡</span>
          <span>Entités HA</span>
          <span class="count-badge">${entities.length}</span>
        </div>
        <button class="btn-toggle" @click=${this.toggleCollapse} title="Masquer / Réduire le volet">
          ⇤
        </button>
      </div>

      <div class="search-section">
        <div class="search-input-wrapper">
          <input 
            type="text" 
            class="search-input" 
            placeholder="Rechercher une entité..."
            .value=${this.searchQuery}
            @input=${(e: any) => this.searchQuery = e.target.value}
          />
        </div>

        <div class="categories-bar">
          <button class="cat-btn ${this.activeCategory === 'all' ? 'active' : ''}" @click=${() => this.activeCategory = 'all'}>Tous</button>
          <button class="cat-btn ${this.activeCategory === 'light' ? 'active' : ''}" @click=${() => this.activeCategory = 'light'}>Lumières</button>
          <button class="cat-btn ${this.activeCategory === 'binary_sensor' ? 'active' : ''}" @click=${() => this.activeCategory = 'binary_sensor'}>Capteurs</button>
          <button class="cat-btn ${this.activeCategory === 'climate' ? 'active' : ''}" @click=${() => this.activeCategory = 'climate'}>Climat</button>
          <button class="cat-btn ${this.activeCategory === 'switch' ? 'active' : ''}" @click=${() => this.activeCategory = 'switch'}>Prises</button>
          <button class="cat-btn ${this.activeCategory === 'camera' ? 'active' : ''}" @click=${() => this.activeCategory = 'camera'}>Caméras</button>
        </div>
      </div>

      <div class="entities-list">
        ${entities.length === 0 ? html`
          <div class="empty-message">Aucune entité trouvée</div>
        ` : entities.map(item => html`
          <div 
            class="entity-card" 
            draggable="true"
            @dragstart=${(e: DragEvent) => this.handleDragStart(e, item)}
            title="Glissez et déposez sur une pièce du plan"
          >
            <div class="entity-info">
              <span class="entity-icon">${item.icon}</span>
              <div class="entity-details">
                <span class="entity-name">${item.name}</span>
                <span class="entity-id">${item.entity_id}</span>
              </div>
            </div>

            <span class="entity-state-badge ${item.state === 'on' ? 'state-on' : 'state-off'}">
              ${item.state}${item.unit ? ' ' + item.unit : ''}
            </span>
          </div>
        `)}
      </div>

      <div class="drag-hint">
        <span>👆</span>
        <span>Glissez une entité sur une pièce du plan</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-entity-drawer': HomeArchitectEntityDrawer;
  }
}
