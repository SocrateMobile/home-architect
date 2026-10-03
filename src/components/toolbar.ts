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
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 18px;
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

  render() {
    return html`
      <button 
        class="tool-btn ${this.activeTool === 'select' ? 'active' : ''}" 
        @click=${() => this.selectTool('select')} 
        title="Sélectionner & Déplacer (V)"
      >
        👆
      </button>

      <button 
        class="tool-btn ${this.activeTool === 'wall' ? 'active' : ''}" 
        @click=${() => this.selectTool('wall')} 
        title="Tracer un mur (W)"
      >
        🧱
      </button>

      <button 
        class="tool-btn ${this.activeTool === 'rect_room' ? 'active' : ''}" 
        @click=${() => this.selectTool('rect_room')} 
        title="Pièce rectangulaire rapide (R)"
      >
        📐
      </button>

      <div class="divider"></div>

      <button 
        class="tool-btn ${this.activeTool === 'door' ? 'active' : ''}" 
        @click=${() => this.selectTool('door')} 
        title="Placer une porte (D)"
      >
        🚪
      </button>

      <button 
        class="tool-btn ${this.activeTool === 'window' ? 'active' : ''}" 
        @click=${() => this.selectTool('window')} 
        title="Placer une fenêtre"
      >
        🪟
      </button>

      <div class="divider"></div>

      <button 
        class="tool-btn ${this.activeTool === 'calibrate' ? 'active' : ''}" 
        @click=${() => this.selectTool('calibrate')} 
        title="Étalonnage d'échelle (M)"
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
