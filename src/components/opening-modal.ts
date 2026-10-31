import { LitElement, html, css, PropertyValues, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { Opening } from '../core/types';
import { entityDomain } from '../core/project-model';
import { defineElement } from '../core/define';
import { LocalizeController, localize } from '../i18n';
import '../i18n/locales/panel';
import { uiThemeStyles } from '../styles/theme.styles';
import { DialogFocusController, geometryModalStyles } from './room-modal';

export type OpeningSlot = 'opening' | 'cover';

interface EntityCandidate {
  entityId: string;
  name: string;
  domain: string;
  state: string;
  isRecommended: boolean;
}

export class HomeArchitectOpeningModal extends LitElement {
  static styles = [
    uiThemeStyles,
    geometryModalStyles,
    css`
      .modal-card {
        width: 540px;
        max-width: calc(100vw - 32px);
        max-height: 85vh;
        display: flex;
        flex-direction: column;
      }

      .modal-body {
        overflow-y: auto;
        padding: 16px 20px;
        flex: 1;
      }

      .slot-nav {
        display: flex;
        gap: 6px;
        margin-bottom: 16px;
        background: var(--arch-ui-surface-2, rgba(255, 255, 255, 0.04));
        padding: 4px;
        border-radius: 8px;
        border: 1px solid var(--arch-ui-border, rgba(255, 255, 255, 0.08));
      }

      .slot-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 6px;
        border: none;
        background: transparent;
        color: var(--arch-ui-muted, #94a3b8);
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s;
      }

      .slot-btn:hover {
        color: var(--arch-ui-text, #f8fafc);
        background: rgba(255, 255, 255, 0.04);
      }

      .slot-btn.active {
        background: var(--arch-ui-surface-1, #1e293b);
        color: var(--arch-ui-accent, #38bdf8);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
      }

      .slot-badge-check {
        font-size: 10px;
        padding: 2px 6px;
        border-radius: 8px;
        background: rgba(16, 185, 129, 0.2);
        color: #10b981;
        font-weight: 600;
      }

      .current-binding {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        background: var(--arch-ui-surface-2, rgba(255, 255, 255, 0.05));
        border: 1px solid var(--arch-ui-border, rgba(255, 255, 255, 0.1));
        border-radius: 8px;
        margin-bottom: 16px;
      }

      .current-binding.empty {
        opacity: 0.8;
        border-style: dashed;
        color: var(--arch-ui-muted, #94a3b8);
        font-size: 12px;
      }

      .current-binding-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .current-binding-label {
        font-size: 11px;
        color: var(--arch-ui-muted, #94a3b8);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .current-binding-name {
        font-size: 14px;
        font-weight: 500;
        color: var(--arch-ui-text, #f8fafc);
      }

      .current-binding-id {
        font-size: 12px;
        color: var(--arch-ui-muted, #94a3b8);
        font-family: monospace;
      }

      .btn-unlink {
        padding: 6px 12px;
        border-radius: 6px;
        border: 1px solid var(--arch-ui-border, rgba(255, 255, 255, 0.15));
        background: transparent;
        color: var(--arch-ui-danger, #ef4444);
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        transition: background 0.15s, border-color 0.15s;
      }

      .btn-unlink:hover {
        background: rgba(239, 68, 68, 0.1);
        border-color: var(--arch-ui-danger, #ef4444);
      }

      .search-box {
        position: relative;
        margin-bottom: 12px;
      }

      .search-input {
        width: 100%;
        box-sizing: border-box;
        padding: 8px 12px 8px 34px;
        border-radius: 6px;
        border: 1px solid var(--arch-ui-border, rgba(255, 255, 255, 0.15));
        background: var(--arch-ui-surface-2, rgba(255, 255, 255, 0.05));
        color: var(--arch-ui-text, #f8fafc);
        font-size: 13px;
      }

      .search-input:focus {
        outline: none;
        border-color: var(--arch-ui-accent, #38bdf8);
        box-shadow: 0 0 0 1px var(--arch-ui-accent, #38bdf8);
      }

      .search-icon {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        opacity: 0.6;
        font-size: 13px;
      }

      .filter-tabs {
        display: flex;
        gap: 6px;
        margin-bottom: 12px;
      }

      .filter-tab {
        padding: 4px 10px;
        border-radius: 14px;
        border: 1px solid var(--arch-ui-border, rgba(255, 255, 255, 0.15));
        background: transparent;
        color: var(--arch-ui-muted, #94a3b8);
        font-size: 12px;
        cursor: pointer;
        transition: all 0.15s;
      }

      .filter-tab.active {
        background: var(--arch-ui-accent, #38bdf8);
        border-color: var(--arch-ui-accent, #38bdf8);
        color: #0f172a;
        font-weight: 500;
      }

      .entity-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
        max-height: 260px;
        overflow-y: auto;
      }

      .entity-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        border-radius: 6px;
        background: transparent;
        border: 1px solid transparent;
        cursor: pointer;
        text-align: left;
        width: 100%;
        box-sizing: border-box;
        transition: background 0.15s;
      }

      .entity-row:hover,
      .entity-row:focus-visible {
        background: var(--arch-ui-surface-2, rgba(255, 255, 255, 0.08));
        outline: none;
      }

      .entity-row.selected {
        background: rgba(56, 189, 248, 0.12);
        border-color: var(--arch-ui-accent, #38bdf8);
      }

      .entity-main {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
      }

      .entity-icon {
        font-size: 16px;
        flex-shrink: 0;
      }

      .entity-text {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }

      .entity-name {
        font-size: 13px;
        font-weight: 500;
        color: var(--arch-ui-text, #f8fafc);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .entity-sub {
        font-size: 11px;
        color: var(--arch-ui-muted, #94a3b8);
        font-family: monospace;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .entity-badge {
        font-size: 11px;
        padding: 2px 8px;
        border-radius: 10px;
        background: var(--arch-ui-surface-3, rgba(255, 255, 255, 0.1));
        color: var(--arch-ui-text, #f8fafc);
        flex-shrink: 0;
      }

      .no-results {
        text-align: center;
        padding: 24px;
        color: var(--arch-ui-muted, #94a3b8);
        font-size: 13px;
      }
    `
  ];

  @property({ attribute: false })
  public hass?: any;

  @property({ attribute: false })
  public opening?: Opening | null;

  @property({ type: String })
  public activeSlot: OpeningSlot = 'opening';

  @state()
  private searchQuery = '';

  @state()
  private activeTab: 'recommended' | 'all' = 'recommended';

  private readonly focusTrap = new DialogFocusController(this);
  private readonly i18n = new LocalizeController(this);

  protected firstUpdated(_changed: PropertyValues): void {
    super.firstUpdated(_changed);
    const input = this.renderRoot.querySelector<HTMLInputElement>('.search-input');
    input?.focus();
  }

  private close(): void {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private selectEntity(entityId: string): void {
    if (!this.opening) return;
    const role = this.activeSlot;
    if (role === 'cover') {
      this.opening = { ...this.opening, coverEntityId: entityId };
    } else {
      this.opening = { ...this.opening, entityId };
    }
    this.dispatchEvent(new CustomEvent('bind-entity', {
      detail: { openingId: this.opening.id, role, entityId },
      bubbles: true,
      composed: true
    }));
  }

  private unbind(role: OpeningSlot): void {
    if (!this.opening) return;
    const next = { ...this.opening };
    if (role === 'cover') {
      delete next.coverEntityId;
    } else {
      delete next.entityId;
    }
    this.opening = next;
    this.dispatchEvent(new CustomEvent('bind-entity', {
      detail: { openingId: this.opening.id, role, entityId: undefined },
      bubbles: true,
      composed: true
    }));
  }

  private getCandidates(): EntityCandidate[] {
    const states = this.hass?.states;
    if (!states) return [];

    const query = this.searchQuery.trim().toLowerCase();
    const candidates: EntityCandidate[] = [];
    const isCoverSlot = this.activeSlot === 'cover';

    for (const entityId of Object.keys(states)) {
      const stateObj = states[entityId];
      if (!stateObj) continue;

      const domain = entityDomain(entityId);
      const isRecommended = isCoverSlot
        ? domain === 'cover'
        : (domain === 'binary_sensor' || domain === 'lock');

      if (this.activeTab === 'recommended' && !isRecommended) continue;

      const name = stateObj.attributes?.friendly_name || entityId;
      if (query && !name.toLowerCase().includes(query) && !entityId.toLowerCase().includes(query)) {
        continue;
      }

      candidates.push({
        entityId,
        name,
        domain,
        state: stateObj.state,
        isRecommended
      });
    }

    return candidates.sort((a, b) => {
      if (a.isRecommended !== b.isRecommended) return a.isRecommended ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  }

  private getDomainIcon(domain: string): string {
    switch (domain) {
      case 'binary_sensor': return '🚪';
      case 'cover': return '🪟';
      case 'lock': return '🔒';
      default: return '⚡';
    }
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      e.preventDefault();
      this.close();
    }
  }

  render() {
    if (!this.opening) return null;
    const candidates = this.getCandidates();
    const isCoverSlot = this.activeSlot === 'cover';
    const currentEntityId = isCoverSlot ? this.opening.coverEntityId : this.opening.entityId;
    const currentState = currentEntityId ? this.hass?.states?.[currentEntityId] : undefined;
    const currentName = currentState?.attributes?.friendly_name || currentEntityId;

    const contactBound = !!this.opening.entityId;
    const coverBound = !!this.opening.coverEntityId;

    return html`
      <div class="modal-backdrop" @click=${(e: MouseEvent) => { if (e.target === e.currentTarget) this.close(); }}>
        <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="opening-modal-title" @keydown=${this.handleKeyDown} tabindex="-1">
          <div class="modal-header">
            <div class="title-group">
              <span class="modal-icon" aria-hidden="true">${this.opening.type.includes('window') ? '🪟' : '🚪'}</span>
              <div>
                <h3 class="modal-title" id="opening-modal-title">${localize('panel.opening_modal.title')}</h3>
                <span class="modal-subtitle">
                  ${this.opening.width.toFixed(2)} m · ${localize('panel.opening_modal.search')}
                </span>
              </div>
            </div>
            <button
              type="button"
              class="btn-close"
              aria-label=${localize('panel.common.close')}
              title=${localize('panel.common.close')}
              @click=${this.close}
            ><span aria-hidden="true">✕</span></button>
          </div>

          <div class="modal-body">
            <!-- Sélecteur de rôle : Capteur d'ouvrant vs Volet roulant -->
            <div class="slot-nav" role="tablist">
              <button
                type="button"
                role="tab"
                class="slot-btn ${!isCoverSlot ? 'active' : ''}"
                aria-selected=${String(!isCoverSlot)}
                @click=${() => { this.activeSlot = 'opening'; this.searchQuery = ''; }}
              >
                <span>${localize('panel.opening_modal.slot_opening')}</span>
                ${contactBound ? html`<span class="slot-badge-check">✓ lié</span>` : nothing}
              </button>
              <button
                type="button"
                role="tab"
                class="slot-btn ${isCoverSlot ? 'active' : ''}"
                aria-selected=${String(isCoverSlot)}
                @click=${() => { this.activeSlot = 'cover'; this.searchQuery = ''; }}
              >
                <span>${localize('panel.opening_modal.slot_cover')}</span>
                ${coverBound ? html`<span class="slot-badge-check">✓ lié</span>` : nothing}
              </button>
            </div>

            <!-- Entité actuellement liée pour ce slot -->
            ${currentEntityId ? html`
              <div class="current-binding">
                <div class="current-binding-info">
                  <span class="current-binding-label">
                    ${isCoverSlot ? localize('panel.hud.sensor_cover') : localize('panel.hud.sensor_contact')}
                  </span>
                  <span class="current-binding-name">${currentName}</span>
                  <span class="current-binding-id">${currentEntityId}</span>
                </div>
                <button type="button" class="btn-unlink" @click=${() => this.unbind(this.activeSlot)}>
                  ${isCoverSlot ? localize('panel.opening_modal.unbind_cover') : localize('panel.opening_modal.unbind_contact')}
                </button>
              </div>
            ` : html`
              <div class="current-binding empty">
                <span>${isCoverSlot ? localize('panel.opening_modal.none_cover') : localize('panel.opening_modal.none_contact')}</span>
              </div>
            `}

            <div class="search-box">
              <span class="search-icon" aria-hidden="true">🔍</span>
              <input
                type="text"
                class="search-input"
                placeholder=${localize('panel.opening_modal.search')}
                .value=${this.searchQuery}
                @input=${(e: Event) => this.searchQuery = (e.target as HTMLInputElement).value}
              />
            </div>

            <div class="filter-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                class="filter-tab ${this.activeTab === 'recommended' ? 'active' : ''}"
                aria-selected=${String(this.activeTab === 'recommended')}
                @click=${() => this.activeTab = 'recommended'}
              >
                ${isCoverSlot ? localize('panel.opening_modal.tab_covers') : localize('panel.opening_modal.tab_openings')}
              </button>
              <button
                type="button"
                role="tab"
                class="filter-tab ${this.activeTab === 'all' ? 'active' : ''}"
                aria-selected=${String(this.activeTab === 'all')}
                @click=${() => this.activeTab = 'all'}
              >
                ${localize('panel.opening_modal.tab_all')}
              </button>
            </div>

            <div class="entity-list" role="listbox">
              ${candidates.length === 0 ? html`
                <div class="no-results">${localize('panel.opening_modal.no_results')}</div>
              ` : candidates.slice(0, 60).map(c => html`
                <button
                  type="button"
                  class="entity-row ${c.entityId === currentEntityId ? 'selected' : ''}"
                  role="option"
                  aria-selected=${String(c.entityId === currentEntityId)}
                  @click=${() => this.selectEntity(c.entityId)}
                >
                  <div class="entity-main">
                    <span class="entity-icon">${this.getDomainIcon(c.domain)}</span>
                    <div class="entity-text">
                      <span class="entity-name">${c.name}</span>
                      <span class="entity-sub">${c.entityId}</span>
                    </div>
                  </div>
                  <span class="entity-badge">${c.state}</span>
                </button>
              `)}
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn-dialog-cancel" @click=${this.close}>
              ${localize('panel.common.close')}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

defineElement('home-architect-opening-modal', HomeArchitectOpeningModal);

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-opening-modal': HomeArchitectOpeningModal;
  }
}
