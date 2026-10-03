import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './components/canvas-view';
import './components/toolbar';
import { ActiveTool, HomeArchitectProject } from './core/types';

@customElement('home-architect-panel')
export class HomeArchitectPanel extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background: #0f172a;
      color: #f8fafc;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
    }

    header.top-bar {
      height: 56px;
      background: rgba(30, 41, 59, 0.9);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 18px;
      z-index: 30;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.15rem;
      font-weight: 700;
      color: #f1f5f9;
    }

    .brand-icon {
      font-size: 1.4rem;
    }

    .brand-tag {
      font-size: 0.75rem;
      padding: 2px 8px;
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border-radius: 9999px;
      border: 1px solid rgba(56, 189, 248, 0.3);
      font-weight: 600;
    }

    .top-controls {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .control-group {
      display: flex;
      align-items: center;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 2px 6px;
      gap: 6px;
      font-size: 0.85rem;
    }

    .control-group label {
      color: #94a3b8;
      font-size: 0.8rem;
    }

    select, button.btn-action {
      background: transparent;
      color: #f8fafc;
      border: none;
      outline: none;
      font-size: 0.85rem;
      cursor: pointer;
    }

    select option {
      background: #1e293b;
      color: #f8fafc;
    }

    button.btn-primary {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      border-radius: 8px;
      padding: 6px 14px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    button.btn-primary:hover {
      background: #0369a1;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
    }

    .workspace {
      flex: 1;
      position: relative;
      width: 100%;
      height: calc(100vh - 56px);
    }

    .floating-toolbar {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 20;
    }

    .level-selector {
      display: flex;
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      overflow: hidden;
    }

    .level-btn {
      padding: 5px 12px;
      font-size: 0.8rem;
      background: transparent;
      color: #94a3b8;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .level-btn.active {
      background: rgba(56, 189, 248, 0.2);
      color: #38bdf8;
      font-weight: 600;
    }
  `;

  // Home Assistant Connection (Injecté automatiquement par HA)
  @property({ type: Object })
  public hass: any;

  @property({ type: Boolean })
  public narrow: boolean = false;

  @state()
  private activeTool: ActiveTool = 'wall';

  @state()
  private currentThickness: number = 0.20; // 20cm

  @state()
  private activeLevel: string = 'rdc';

  @state()
  private project: HomeArchitectProject = {
    id: 'rdc',
    name: 'Rez-de-Chaussée',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    pixelsPerMeter: 50,
    grid: {
      size: 0.5,
      subdivisions: 2,
      snapToGrid: true,
      snapToAngles: true,
      snapToElements: true
    },
    walls: [],
    openings: [],
    rooms: [],
    bindings: []
  };

  private handleToolSelected(e: CustomEvent<{ tool: ActiveTool }>) {
    this.activeTool = e.detail.tool;
  }

  private handleProjectChanged(e: CustomEvent<{ project: HomeArchitectProject }>) {
    this.project = e.detail.project;
  }

  private handleThicknessChange(e: Event) {
    const val = parseFloat((e.target as HTMLSelectElement).value);
    this.currentThickness = val;
  }

  private saveProject() {
    // Appel WebSocket vers custom_component Home Assistant
    if (this.hass && this.hass.callWS) {
      this.hass.callWS({
        type: 'home_architect/save_project',
        project: this.project
      }).then(() => {
        alert('Plan sauvegardé avec succès dans Home Assistant !');
      }).catch((err: any) => {
        console.error('Erreur de sauvegarde HA:', err);
        // Sauvegarde locale de secours
        localStorage.setItem(`home_architect_${this.project.id}`, JSON.stringify(this.project));
        alert('Sauvegardé localement dans le navigateur (Mode autonome).');
      });
    } else {
      localStorage.setItem(`home_architect_${this.project.id}`, JSON.stringify(this.project));
      alert('Plan sauvegardé localement !');
    }
  }

  render() {
    return html`
      <header class="top-bar">
        <div class="brand">
          <span class="brand-icon">📐</span>
          <span>Home Architect</span>
          <span class="brand-tag">Studio 2D/3D</span>
        </div>

        <div class="level-selector">
          <button class="level-btn ${this.activeLevel === 'sous-sol' ? 'active' : ''}" @click=${() => this.activeLevel = 'sous-sol'}>Sous-Sol</button>
          <button class="level-btn ${this.activeLevel === 'rdc' ? 'active' : ''}" @click=${() => this.activeLevel = 'rdc'}>RDC</button>
          <button class="level-btn ${this.activeLevel === 'etage1' ? 'active' : ''}" @click=${() => this.activeLevel = 'etage1'}>1er Étage</button>
          <button class="level-btn ${this.activeLevel === 'jardin' ? 'active' : ''}" @click=${() => this.activeLevel = 'jardin'}>Jardin</button>
        </div>

        <div class="top-controls">
          <!-- Épaisseur de mur -->
          <div class="control-group">
            <label>Épaisseur :</label>
            <select @change=${this.handleThicknessChange}>
              <option value="0.10">Cloison 10 cm</option>
              <option value="0.15">Mur 15 cm</option>
              <option value="0.20" selected>Porteur 20 cm</option>
              <option value="0.30">Extérieur 30 cm</option>
            </select>
          </div>

          <!-- Aimantation -->
          <div class="control-group">
            <label>Grille :</label>
            <input 
              type="checkbox" 
              ?checked=${this.project.grid.snapToGrid}
              @change=${(e: any) => {
                this.project = {
                  ...this.project,
                  grid: { ...this.project.grid, snapToGrid: e.target.checked }
                };
              }}
            />
          </div>

          <!-- Bouton de Sauvegarde -->
          <button class="btn-primary" @click=${this.saveProject}>
            💾 Sauvegarder
          </button>
        </div>
      </header>

      <div class="workspace">
        <!-- Barre d'outils flottante -->
        <home-architect-toolbar 
          class="floating-toolbar"
          .activeTool=${this.activeTool}
          @tool-selected=${this.handleToolSelected}
        ></home-architect-toolbar>

        <!-- Canevas interactif SVG -->
        <home-architect-canvas
          .project=${this.project}
          .activeTool=${this.activeTool}
          .currentWallThickness=${this.currentThickness}
          @project-changed=${this.handleProjectChanged}
        ></home-architect-canvas>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-panel': HomeArchitectPanel;
  }
}
