import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ActiveTool } from '../core/types';

@customElement('home-architect-toolbar')
export class HomeArchitectToolbar extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 6px;
      background: rgba(30, 41, 59, 0.9);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 14px;
      padding: 8px 6px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      z-index: 40;
    }

    .tool-btn {
      background: transparent;
      color: #94a3b8;
      border: 1px solid transparent;
      border-radius: 10px;
      width: 42px;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 19px;
      transition: all 0.2s ease;
      position: relative;
    }

    .tool-btn:hover {
      background: rgba(51, 65, 85, 0.8);
      color: #f8fafc;
      transform: scale(1.05);
    }

    .tool-btn.active {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
    }

    .tool-btn.highlight {
      background: rgba(245, 158, 11, 0.15);
      border-color: rgba(245, 158, 11, 0.4);
      color: #f59e0b;
    }

    .tool-btn.highlight:hover {
      background: #f59e0b;
      color: #ffffff;
    }

    .divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 4px 2px;
    }
  `;

  @property({ type: String })
  public activeTool: ActiveTool = 'wall';

  private selectTool(tool: ActiveTool): void {
    this.dispatchEvent(new CustomEvent('tool-selected', {
      detail: { tool },
      bubbles: true,
      composed: true
    }));
  }

  private openWizard(): void {
    this.dispatchEvent(new CustomEvent('open-wizard', {
      bubbles: true,
      composed: true
    }));
  }

  private triggerImageUpload(): void {
    this.dispatchEvent(new CustomEvent('trigger-upload-background', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <!-- Assistant Débutant -->
      <button 
        class="tool-btn highlight" 
        @click=${this.openWizard} 
        title="Assistant Débutant : Créer une pièce guidée (🪄)"
      >
        🪄
      </button>

      <div class="divider"></div>

      <!-- Outil Sélection / Pan -->
      <button 
        class="tool-btn ${this.activeTool === 'select' ? 'active' : ''}" 
        @click=${() => this.selectTool('select')} 
        title="Sélectionner & Déplacer (V)"
      >
        👆
      </button>

      <!-- Outil Mur -->
      <button 
        class="tool-btn ${this.activeTool === 'wall' ? 'active' : ''}" 
        @click=${() => this.selectTool('wall')} 
        title="Tracer un mur (W)"
      >
        🧱
      </button>

      <div class="divider"></div>

      <!-- Outil Porte -->
      <button 
        class="tool-btn ${this.activeTool === 'door' ? 'active' : ''}" 
        @click=${() => this.selectTool('door')} 
        title="Insérer une porte (D)"
      >
        🚪
      </button>

      <!-- Outil Fenêtre -->
      <button 
        class="tool-btn ${this.activeTool === 'window' ? 'active' : ''}" 
        @click=${() => this.selectTool('window')} 
        title="Insérer une fenêtre"
      >
        🪟
      </button>

      <!-- Outil Baie vitrée / Porte-fenêtre -->
      <button 
        class="tool-btn ${this.activeTool === 'french_window' ? 'active' : ''}" 
        @click=${() => this.selectTool('french_window')} 
        title="Insérer une baie coulissante"
      >
        🪞
      </button>

      <div class="divider"></div>

      <!-- Import de plan de fond -->
      <button 
        class="tool-btn" 
        @click=${this.triggerImageUpload} 
        title="Importer un plan en fond (PNG/JPG/PDF)"
      >
        🖼️
      </button>

      <!-- Étalonnage d'échelle -->
      <button 
        class="tool-btn ${this.activeTool === 'calibrate' ? 'active' : ''}" 
        @click=${() => this.selectTool('calibrate')} 
        title="Étalonnage d'échelle : tracer un mur mesuré (M)"
      >
        📏
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-toolbar': HomeArchitectToolbar;
  }
}
