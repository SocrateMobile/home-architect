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
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 340px;
      background: rgba(15, 23, 42, 0.94);
      backdrop-filter: blur(20px);
      border-left: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      z-index: 60;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: #f8fafc;
      animation: slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }

    .drawer-header {
      padding: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .drawer-title {
      font-size: 1.05rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #38bdf8;
    }

    .btn-close {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 18px;
      cursor: pointer;
      padding: 4px;
    }

    .btn-close:hover {
      color: #ffffff;
    }

    .search-section {
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .search-input {
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      color: #f8fafc;
      padding: 8px 12px;
      font-size: 0.85rem;
      outline: none;
      width: 100%;
      box-sizing: border-box;
    }

    .search-input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);
    }

    .categories-bar {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      padding-bottom: 4px;
    }

    .cat-btn {
      background: rgba(51, 65, 85, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      color: #94a3b8;
      padding: 4px 8px;
      font-size: 0.75rem;
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
    }

    .entities-list {
      flex: 1;
      overflow-y: auto;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .entity-card {
      background: rgba(30, 41, 59, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 10px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: grab;
      transition: all 0.2s ease;
      user-select: none;
    }

    .entity-card:hover {
      background: rgba(51, 65, 85, 0.8);
      border-color: #38bdf8;
      transform: translateY(-1px);
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
      font-size: 1.3rem;
      min-width: 28px;
      text-align: center;
    }

    .entity-details {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .entity-name {
      font-size: 0.85rem;
      font-weight: 600;
      color: #f1f5f9;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .entity-id {
      font-size: 0.72rem;
      color: #64748b;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .entity-state-badge {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 3px 8px;
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
      padding: 12px 16px;
      background: rgba(2, 132, 199, 0.15);
      border-top: 1px solid rgba(56, 189, 248, 0.2);
      font-size: 0.75rem;
      color: #38bdf8;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
  `;

  @property({ type: Object })
  public hass: any;

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

  private closeDrawer() {
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    let entities = this.getEntities();

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
          <span>Entités Home Assistant</span>
        </div>
        <button class="btn-close" @click=${this.closeDrawer}>✕</button>
      </div>

      <div class="search-section">
        <input 
          type="text" 
          class="search-input" 
          placeholder="Rechercher une lumière, un capteur..."
          .value=${this.searchQuery}
          @input=${(e: any) => this.searchQuery = e.target.value}
        />

        <div class="categories-bar">
          <button class="cat-btn ${this.activeCategory === 'all' ? 'active' : ''}" @click=${() => this.activeCategory = 'all'}>Tous</button>
          <button class="cat-btn ${this.activeCategory === 'light' ? 'active' : ''}" @click=${() => this.activeCategory = 'light'}>Lumières</button>
          <button class="cat-btn ${this.activeCategory === 'binary_sensor' ? 'active' : ''}" @click=${() => this.activeCategory = 'binary_sensor'}>Capteurs</button>
          <button class="cat-btn ${this.activeCategory === 'climate' ? 'active' : ''}" @click=${() => this.activeCategory = 'climate'}>Climat</button>
          <button class="cat-btn ${this.activeCategory === 'switch' ? 'active' : ''}" @click=${() => this.activeCategory = 'switch'}>Prises</button>
        </div>
      </div>

      <div class="entities-list">
        ${entities.map(item => html`
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
        <span>Glissez-déposez une entité sur une pièce du plan</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-entity-drawer': HomeArchitectEntityDrawer;
  }
}
