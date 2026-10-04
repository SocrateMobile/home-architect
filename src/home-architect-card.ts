import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './components/canvas-view';
import { HomeArchitectProject } from './core/types';

interface CardConfig {
  type: string;
  project_id?: string;
  view_mode?: '2d' | '3d';
  title?: string;
  show_header?: boolean;
  height?: string;
}

@customElement('home-architect-card')
export class HomeArchitectCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: var(--card-custom-height, 480px);
      position: relative;
      background: #0f172a;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: #f8fafc;
    }

    .card-header {
      position: absolute;
      top: 12px;
      left: 16px;
      right: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 10;
      pointer-events: none;
    }

    .card-title {
      font-size: 1rem;
      font-weight: 700;
      color: #f8fafc;
      background: rgba(30, 41, 59, 0.85);
      backdrop-filter: blur(8px);
      padding: 6px 14px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      pointer-events: auto;
    }

    .view-toggle {
      background: rgba(30, 41, 59, 0.85);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 4px 10px;
      font-size: 0.8rem;
      font-weight: 600;
      color: #38bdf8;
      cursor: pointer;
      pointer-events: auto;
      transition: all 0.2s ease;
    }

    .view-toggle:hover {
      background: #0284c7;
      color: #ffffff;
    }

    .canvas-wrapper {
      width: 100%;
      height: 100%;
    }
  `;

  @property({ type: Object })
  public hass: any;

  @state()
  private config!: CardConfig;

  @state()
  private project: HomeArchitectProject = {
    id: 'rdc',
    name: 'Plan',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    pixelsPerMeter: 50,
    grid: { size: 0.5, subdivisions: 2, snapToGrid: false, snapToAngles: false, snapToElements: false },
    walls: [],
    openings: [],
    rooms: [],
    bindings: []
  };

  @state()
  private is3DMode: boolean = false;

  public setConfig(config: CardConfig): void {
    if (!config) throw new Error('Configuration invalide');
    this.config = config;
    this.is3DMode = config.view_mode === '3d';
    if (config.height) {
      this.style.setProperty('--card-custom-height', config.height);
    }
  }

  private _projectLoaded: boolean = false;

  public getCardSize(): number {
    return 6;
  }

  firstUpdated() {
    this.loadProject();
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has('hass') && !this._projectLoaded && this.hass) {
      this._projectLoaded = true;
      this.loadProject();
    }
  }

  private async loadProject() {
    const projectId = this.config?.project_id || 'rdc';

    if (this.hass && this.hass.callWS) {
      try {
        const res = await this.hass.callWS({ type: 'home_architect/get_projects' });
        const found = res?.projects?.find((p: any) => p.id === projectId);
        if (found) {
          this.project = found;
          return;
        }
      } catch (e) {
        console.warn('WebSocket get_projects échoué, essai localStorage:', e);
      }
    }

    // Fallback localStorage
    const saved = localStorage.getItem(`home_architect_${projectId}`);
    if (saved) {
      try {
        this.project = JSON.parse(saved);
      } catch (e) {}
    }
  }

  private handleMoreInfo(e: CustomEvent): void {
    // Propage l'événement Home Assistant standard pour ouvrir la modale détaillée
    const ev = new CustomEvent('hass-more-info', {
      detail: e.detail,
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(ev);
  }

  render() {
    const showHeader = this.config?.show_header !== false;

    return html`
      ${showHeader ? html`
        <div class="card-header">
          <div class="card-title">${this.config?.title || this.project.name || 'Home Architect'}</div>
          <button class="view-toggle" @click=${() => this.is3DMode = !this.is3DMode}>
            ${this.is3DMode ? '🧊 3D' : '📐 2D'}
          </button>
        </div>
      ` : null}

      <div class="canvas-wrapper">
        <home-architect-canvas
          .hass=${this.hass}
          .project=${this.project}
          .activeTool=${'select'}
          .is3DMode=${this.is3DMode}
          .isDashboardMode=${true}
          @hass-more-info=${this.handleMoreInfo}
        ></home-architect-canvas>
      </div>
    `;
  }
}

// Enregistrement pour le Card Picker de Lovelace HACS
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'home-architect-card',
  name: 'Home Architect Card',
  description: 'Affichez votre plan de maison interactif 2D/3D avec états des entités en temps réel.',
  preview: true
});

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-card': HomeArchitectCard;
  }
}
