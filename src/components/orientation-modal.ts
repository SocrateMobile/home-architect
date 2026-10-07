import { LitElement, html, svg, css, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { defineElement } from '../core/define';
import { getEventTarget } from '../core/keyboard';
import { LocalizeController, localize } from '../i18n';
import '../i18n/locales/panel';
import { applyColorScheme, uiThemeStyles } from '../styles/theme.styles';
import { DialogFocusController, geometryModalStyles } from './room-modal';

export interface OrientationModalResult {
  northAngle: number;
  showCompass: boolean;
}

const PRESETS: Array<{ id: string; angle: number; icon: string }> = [
  { id: 'n', angle: 0, icon: '⬆️' },
  { id: 'ne', angle: 45, icon: '↗️' },
  { id: 'e', angle: 90, icon: '➡️' },
  { id: 'se', angle: 135, icon: '↘️' },
  { id: 's', angle: 180, icon: '⬇️' },
  { id: 'sw', angle: 225, icon: '↙️' },
  { id: 'w', angle: 270, icon: '⬅️' },
  { id: 'nw', angle: 315, icon: '↖️' },
];

import { cardinalLabel } from '../canvas/coords';
export { cardinalLabel } from '../canvas/coords';

export class HomeArchitectOrientationModal extends LitElement {
  static styles = [
    uiThemeStyles,
    geometryModalStyles,
    css`
      .modal-card {
        width: 500px;
        max-width: calc(100vw - 32px);
      }

      .compass-dial-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 8px 0 16px;
        user-select: none;
      }

      .compass-dial {
        position: relative;
        width: 190px;
        height: 190px;
        cursor: grab;
        touch-action: none;
      }

      .compass-dial:active {
        cursor: grabbing;
      }

      .compass-dial-svg {
        width: 100%;
        height: 100%;
        filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.25));
      }

      .compass-readout {
        margin-top: 10px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 18px;
        font-weight: 700;
        color: var(--arch-surface-text);
      }

      .compass-readout-cardinal {
        font-size: 14px;
        font-weight: 600;
        color: var(--arch-primary);
        background: var(--arch-primary-faint, rgba(59, 130, 246, 0.12));
        padding: 2px 8px;
        border-radius: 6px;
      }

      .presets-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 6px;
        margin-top: 10px;
      }

      .preset-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        padding: 6px 4px;
        border-radius: 8px;
        border: 1px solid var(--arch-border);
        background: var(--arch-surface-card);
        color: var(--arch-surface-text);
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .preset-btn:hover {
        background: var(--arch-surface-hover);
        border-color: var(--arch-primary);
      }

      .preset-btn.active {
        background: var(--arch-primary);
        color: #ffffff;
        border-color: var(--arch-primary);
        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
      }

      .preset-icon {
        font-size: 14px;
      }

      .slider-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 12px;
      }

      .slider-input {
        flex: 1;
        accent-color: var(--arch-primary);
        cursor: pointer;
      }

      .degree-input {
        width: 72px;
        text-align: right;
        padding: 6px 10px;
        border-radius: 8px;
        border: 1px solid var(--arch-border);
        background: var(--arch-input-bg);
        color: var(--arch-surface-text);
        font-size: 14px;
        font-weight: 600;
      }

      .info-callout {
        display: flex;
        gap: 10px;
        background: var(--arch-surface-card);
        border: 1px solid var(--arch-border);
        border-radius: 10px;
        padding: 10px 14px;
        font-size: 12px;
        line-height: 1.45;
        color: var(--arch-text-muted);
        margin-top: 14px;
      }

      .info-callout-icon {
        font-size: 18px;
        flex-shrink: 0;
      }

      .options-row {
        margin-top: 14px;
      }
    `
  ];

  @property({ type: Number }) northAngle: number = 0;
  @property({ type: Boolean }) showCompass: boolean = true;
  @property({ type: Object }) hass?: any;

  @state() private currentAngle: number = 0;
  @state() private currentShowCompass: boolean = true;
  @state() private isDragging: boolean = false;

  private readonly focusCtrl = new DialogFocusController(this);
  protected localizeCtrl = new LocalizeController(this);

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has('northAngle')) {
      this.currentAngle = ((Math.round(this.northAngle) % 360) + 360) % 360;
    }
    if (changed.has('showCompass')) {
      this.currentShowCompass = this.showCompass;
    }
    if (changed.has('hass')) {
      applyColorScheme(this, this.hass?.themes?.darkMode);
    }
  }

  protected firstUpdated() {
    const btn = this.renderRoot.querySelector<HTMLButtonElement>('.btn-primary');
    btn?.focus();
  }

  private close() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private apply() {
    const detail: OrientationModalResult = {
      northAngle: this.currentAngle,
      showCompass: this.currentShowCompass
    };
    this.dispatchEvent(new CustomEvent('orientation-applied', { detail, bubbles: true, composed: true }));
    this.close();
  }

  private handleKeydown(e: KeyboardEvent) {
    e.stopPropagation();
    if (e.key === 'Escape') {
      e.preventDefault();
      this.close();
    } else if (e.key === 'Tab') {
      this.focusCtrl.trapTab(e);
    }
  }

  private updateAngleFromPointer(e: PointerEvent) {
    const dial = this.shadowRoot?.querySelector('.compass-dial') as HTMLElement | null;
    if (!dial) return;
    const rect = dial.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    // Angle en radians depuis l'axe Y négatif (haut = 0°, droite = 90°, etc.)
    const rad = Math.atan2(dx, -dy);
    const deg = Math.round((rad * 180 / Math.PI + 360) % 360);
    this.currentAngle = deg;
  }

  private handleDialPointerDown(e: PointerEvent) {
    const target = getEventTarget(e);
    if (target instanceof Element) {
      target.setPointerCapture?.(e.pointerId);
    }
    this.isDragging = true;
    this.updateAngleFromPointer(e);
  }

  private handleDialPointerMove(e: PointerEvent) {
    if (!this.isDragging) return;
    this.updateAngleFromPointer(e);
  }

  private handleDialPointerUp(e: PointerEvent) {
    if (!this.isDragging) return;
    this.isDragging = false;
    const target = getEventTarget(e);
    if (target instanceof Element) {
      try {
        target.releasePointerCapture?.(e.pointerId);
      } catch {
        // Ignorer si la capture est déjà perdue
      }
    }
  }

  private setPreset(angle: number) {
    this.currentAngle = ((Math.round(angle) % 360) + 360) % 360;
  }

  private handleSliderInput(e: Event) {
    const val = Number((e.target as HTMLInputElement).value);
    if (Number.isFinite(val)) {
      this.currentAngle = ((Math.round(val) % 360) + 360) % 360;
    }
  }

  private handleNumberInput(e: Event) {
    const val = Number((e.target as HTMLInputElement).value);
    if (Number.isFinite(val)) {
      this.currentAngle = ((Math.round(val) % 360) + 360) % 360;
    }
  }

  render() {
    const angle = this.currentAngle;
    const cardinal = cardinalLabel(angle);

    return html`
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="orient-title" @keydown=${this.handleKeydown} tabindex="-1">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon" aria-hidden="true">🧭</span>
            <h2 class="modal-title" id="orient-title">${localize('panel.orientation.title')}</h2>
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
          <div class="compass-dial-container">
            <div
              class="compass-dial"
              @pointerdown=${this.handleDialPointerDown}
              @pointermove=${this.handleDialPointerMove}
              @pointerup=${this.handleDialPointerUp}
              @pointercancel=${this.handleDialPointerUp}
              title=${localize('panel.orientation.drag_tip')}
            >
              <svg viewBox="0 0 200 200" class="compass-dial-svg" aria-hidden="true">
                <!-- Cercle extérieur et graduations -->
                <circle cx="100" cy="100" r="94" fill="var(--arch-surface-card)" stroke="var(--arch-border)" stroke-width="2.5" />
                <circle cx="100" cy="100" r="88" fill="none" stroke="var(--arch-border-subtle, rgba(255,255,255,0.08))" stroke-width="1" />
                <circle cx="100" cy="100" r="76" fill="var(--arch-hud-bg)" stroke="none" />

                <!-- Graduations tous les 15° et points cardinaux -->
                ${Array.from({ length: 24 }).map((_, i) => {
                  const deg = i * 15;
                  const isMajor = deg % 45 === 0;
                  const isCard = deg % 90 === 0;
                  const len = isCard ? 10 : isMajor ? 7 : 4;
                  return svg`
                    <line
                      x1="100"
                      y1="${88 - len}"
                      x2="100"
                      y2="88"
                      stroke="${isCard ? 'var(--arch-surface-text)' : 'var(--arch-border)'}"
                      stroke-width="${isCard ? 2 : 1}"
                      transform="rotate(${deg} 100 100)"
                    />
                  `;
                })}

                <!-- Repères cardinaux fixes du cadran -->
                <text x="100" y="24" text-anchor="middle" font-size="12" font-weight="800" fill="#ef4444">N</text>
                <text x="178" y="104" text-anchor="middle" font-size="11" font-weight="700" fill="var(--arch-surface-text)">E</text>
                <text x="100" y="184" text-anchor="middle" font-size="11" font-weight="700" fill="var(--arch-surface-text)">S</text>
                <text x="22" y="104" text-anchor="middle" font-size="11" font-weight="700" fill="var(--arch-surface-text)">O</text>

                <!-- Aiguille tournante pointant vers currentAngle -->
                <g transform="rotate(${angle} 100 100)">
                  <!-- Pointe Nord (Rouge vif) -->
                  <polygon points="100,32 91,100 100,92" fill="#ef4444" />
                  <polygon points="100,32 109,100 100,92" fill="#dc2626" />
                  <!-- Lettrage N sur la pointe Nord -->
                  <circle cx="100" cy="46" r="6" fill="#ef4444" />
                  <text x="100" y="50" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">N</text>

                  <!-- Pointe Sud (Gris / Argenté) -->
                  <polygon points="100,168 91,100 100,108" fill="#94a3b8" />
                  <polygon points="100,168 109,100 100,108" fill="#64748b" />

                  <!-- Pivot central chromé -->
                  <circle cx="100" cy="100" r="9" fill="var(--arch-surface-card)" stroke="var(--arch-border)" stroke-width="2" />
                  <circle cx="100" cy="100" r="4" fill="var(--arch-primary)" />
                </g>
              </svg>
            </div>

            <div class="compass-readout">
              <span>${angle}°</span>
              <span class="compass-readout-cardinal">${cardinal}</span>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="orient-slider">${localize('panel.orientation.angle_label')}</label>
            <div class="slider-row">
              <input
                id="orient-slider"
                type="range"
                min="0"
                max="359"
                step="1"
                class="slider-input"
                .value=${String(angle)}
                @input=${this.handleSliderInput}
                aria-label=${localize('panel.orientation.angle_label')}
              />
              <input
                type="number"
                min="0"
                max="359"
                class="degree-input"
                .value=${String(angle)}
                @input=${this.handleNumberInput}
                aria-label="Angle en degrés"
              />
            </div>
          </div>

          <div class="presets-grid">
            ${PRESETS.map(p => {
              const active = Math.abs(angle - p.angle) < 2;
              return html`
                <button
                  type="button"
                  class="preset-btn ${active ? 'active' : ''}"
                  @click=${() => this.setPreset(p.angle)}
                >
                  <span class="preset-icon" aria-hidden="true">${p.icon}</span>
                  <span>${localize(`panel.orientation.preset_${p.id}`)}</span>
                </button>
              `;
            })}
          </div>

          <div class="options-row">
            <label class="check-row">
              <input
                type="checkbox"
                .checked=${this.currentShowCompass}
                @change=${(e: Event) => { this.currentShowCompass = (e.target as HTMLInputElement).checked; }}
              />
              <span>${localize('panel.orientation.show_compass')}</span>
            </label>
          </div>

          <div class="info-callout">
            <span class="info-callout-icon" aria-hidden="true">☀️</span>
            <div>${localize('panel.orientation.desc')}</div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-modal btn-cancel" @click=${this.close}>
            ${localize('panel.orientation.cancel')}
          </button>
          <button type="button" class="btn-modal btn-primary" @click=${this.apply}>
            ${localize('panel.orientation.apply')}
          </button>
        </div>
      </div>
    `;
  }
}

defineElement('home-architect-orientation-modal', HomeArchitectOrientationModal);

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-orientation-modal': HomeArchitectOrientationModal;
  }
}
