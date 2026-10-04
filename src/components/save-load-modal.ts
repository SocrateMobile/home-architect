import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeArchitectProject } from '../core/types';

export interface PlanCategoryItem {
  id: string;
  label: string;
  icon: string;
}

export const PLAN_CATEGORIES: PlanCategoryItem[] = [
  { id: 'rdc', label: 'RDC', icon: '🏠' },
  { id: 'jardin', label: 'Jardin', icon: '🌳' },
  { id: 'sous-sol', label: 'Sous-Sol', icon: '🏠' },
  { id: 'etage1', label: '1er Étage', icon: '🏠' },
  { id: 'etage2', label: '2ème Étage', icon: '🏠' },
  { id: 'etage3', label: '3ème Étage', icon: '🏠' },
  { id: 'autre', label: 'Autre', icon: '📁' },
];

@customElement('home-architect-save-load-modal')
export class HomeArchitectSaveLoadModal extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: #f8fafc;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-card {
      background: #1e293b;
      border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 16px;
      width: 580px;
      max-width: 94vw;
      max-height: 88vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.25);
      overflow: hidden;
    }

    .modal-header {
      padding: 16px 22px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(15, 23, 42, 0.6);
      flex-shrink: 0;
    }

    .modal-title-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .modal-icon {
      font-size: 1.5rem;
    }

    .modal-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #f1f5f9;
      margin: 0;
    }

    .modal-subtitle {
      font-size: 0.8rem;
      color: #94a3b8;
      margin: 2px 0 0 0;
    }

    .btn-close {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 20px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .btn-close:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .tabs-nav {
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(15, 23, 42, 0.4);
      padding: 0 20px;
      gap: 10px;
      flex-shrink: 0;
    }

    .tab-btn {
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      color: #94a3b8;
      padding: 12px 14px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s ease;
    }

    .tab-btn:hover {
      color: #f1f5f9;
    }

    .tab-btn.active {
      color: #38bdf8;
      border-bottom-color: #38bdf8;
    }

    .modal-body {
      padding: 20px 22px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      overflow-y: auto;
      flex: 1;
      scrollbar-width: thin;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-label {
      font-size: 0.86rem;
      font-weight: 600;
      color: #e2e8f0;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .form-input {
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 10px;
      padding: 10px 14px;
      color: #f8fafc;
      font-size: 0.92rem;
      outline: none;
      transition: all 0.2s ease;
      box-sizing: border-box;
      width: 100%;
    }

    .form-input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 8px;
    }

    .category-card {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      padding: 10px 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s ease;
      color: #cbd5e1;
      font-size: 0.84rem;
      font-weight: 600;
      user-select: none;
    }

    .category-card:hover {
      background: rgba(56, 189, 248, 0.15);
      border-color: #38bdf8;
      color: #ffffff;
      transform: translateY(-1px);
    }

    .category-card.selected {
      background: rgba(2, 132, 199, 0.25);
      border-color: #38bdf8;
      color: #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
      font-weight: 700;
    }

    .category-card .cat-icon {
      font-size: 1.25rem;
    }

    .metrics-summary {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 12px 16px;
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      font-size: 0.82rem;
      color: #94a3b8;
    }

    .metric-badge {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .metric-badge strong {
      color: #38bdf8;
    }

    .modal-footer {
      padding: 14px 22px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
      background: rgba(15, 23, 42, 0.6);
      flex-shrink: 0;
    }

    .btn-secondary {
      background: transparent;
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 0.86rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-secondary:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.08);
    }

    .btn-primary {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      border-radius: 8px;
      padding: 8px 20px;
      font-size: 0.86rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s ease;
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.4);
    }

    .btn-primary:hover {
      background: #0369a1;
      transform: translateY(-1px);
    }

    /* Styles pour la liste des projets sauvegardés */
    .search-bar {
      margin-bottom: 12px;
    }

    .projects-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-height: 380px;
      overflow-y: auto;
      scrollbar-width: thin;
      padding-right: 4px;
    }

    .project-item {
      background: rgba(30, 41, 59, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      transition: all 0.15s ease;
    }

    .project-item:hover {
      border-color: rgba(56, 189, 248, 0.5);
      background: rgba(30, 41, 59, 1);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
    }

    .project-item.current {
      border-color: #38bdf8;
      background: rgba(2, 132, 199, 0.15);
    }

    .project-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
      flex: 1;
    }

    .project-title-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .project-cat-badge {
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.3);
      padding: 2px 7px;
      border-radius: 6px;
      font-size: 0.74rem;
      font-weight: 700;
      white-space: nowrap;
    }

    .project-name {
      font-weight: 700;
      font-size: 0.95rem;
      color: #f1f5f9;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .project-meta-row {
      font-size: 0.78rem;
      color: #94a3b8;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .project-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-load {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.4);
      border-radius: 8px;
      padding: 6px 14px;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .btn-load:hover {
      background: #10b981;
      color: #ffffff;
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.5);
    }

    .btn-delete {
      background: transparent;
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 0.82rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-delete:hover {
      background: #ef4444;
      color: #ffffff;
      box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);
    }

    .empty-state {
      padding: 36px 20px;
      text-align: center;
      color: #94a3b8;
      font-size: 0.9rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .empty-state-icon {
      font-size: 2.2rem;
      opacity: 0.6;
    }
  `;

  @property({ type: Object })
  public project!: HomeArchitectProject;

  @property({ type: Object })
  public hass: any;

  @property({ type: String })
  public initialTab: 'save' | 'load' = 'save';

  @state()
  private activeTab: 'save' | 'load' = 'save';

  @state()
  private planName: string = '';

  @state()
  private planCategory: string = 'rdc';

  @state()
  private customCategoryName: string = '';

  @state()
  private savedProjects: HomeArchitectProject[] = [];

  @state()
  private isLoadingProjects: boolean = false;

  @state()
  private searchQuery: string = '';

  connectedCallback() {
    super.connectedCallback();
    this.activeTab = this.initialTab;
    this.planName = this.project?.name || 'Plan de Maison';
    this.planCategory = this.project?.category || this.project?.id || 'rdc';
    if (!PLAN_CATEGORIES.some(c => c.id === this.planCategory)) {
      this.customCategoryName = this.planCategory;
      this.planCategory = 'autre';
    }
    this.fetchSavedProjects();
  }

  public async fetchSavedProjects() {
    this.isLoadingProjects = true;
    const projectsMap: Map<string, HomeArchitectProject> = new Map();

    // 1. Récupération via Home Assistant websocket
    if (this.hass && this.hass.callWS) {
      try {
        const res = await this.hass.callWS({ type: 'home_architect/get_projects' });
        if (res && res.projects && Array.isArray(res.projects)) {
          for (const p of res.projects) {
            if (p && p.id) projectsMap.set(p.id, p);
          }
        }
      } catch (err) {
        console.warn('Erreur lecture projets HA websocket:', err);
      }
    }

    // 2. Récupération via localStorage (fallback & projets locaux)
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('home_architect_')) {
          const raw = localStorage.getItem(key);
          if (raw) {
            try {
              const p = JSON.parse(raw);
              if (p && p.id && !projectsMap.has(p.id)) {
                projectsMap.set(p.id, p);
              }
            } catch (_) {}
          }
        }
      }
    } catch (_) {}

    this.savedProjects = Array.from(projectsMap.values()).sort((a, b) => {
      const da = new Date(a.updated_at || 0).getTime();
      const db = new Date(b.updated_at || 0).getTime();
      return db - da;
    });
    this.isLoadingProjects = false;
  }

  private handleSave() {
    const finalName = this.planName.trim() || 'Plan Sans Nom';
    const finalCat = this.planCategory === 'autre' && this.customCategoryName.trim()
      ? this.customCategoryName.trim()
      : this.planCategory;

    this.dispatchEvent(new CustomEvent('save-confirmed', {
      detail: {
        name: finalName,
        category: finalCat
      },
      bubbles: true,
      composed: true
    }));
  }

  private handleLoadProject(p: HomeArchitectProject) {
    this.dispatchEvent(new CustomEvent('load-project', {
      detail: { project: p },
      bubbles: true,
      composed: true
    }));
  }

  private async handleDeleteProject(projectId: string, e: Event) {
    e.stopPropagation();
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce plan sauvegardé ?')) return;

    if (this.hass && this.hass.callWS) {
      try {
        await this.hass.callWS({
          type: 'home_architect/delete_project',
          project_id: projectId
        });
      } catch (err) {
        console.warn('Erreur suppression websocket:', err);
      }
    }

    try {
      localStorage.removeItem(`home_architect_${projectId}`);
    } catch (_) {}

    this.savedProjects = this.savedProjects.filter(p => p.id !== projectId);
  }

  private handleClose() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private formatDate(isoDate?: string): string {
    if (!isoDate) return 'Date inconnue';
    try {
      const d = new Date(isoDate);
      return d.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (_) {
      return isoDate;
    }
  }

  private getCategoryItem(catId?: string): PlanCategoryItem {
    return PLAN_CATEGORIES.find(c => c.id === catId) || { id: catId || 'autre', label: catId || 'Autre', icon: '📁' };
  }

  render() {
    const filteredProjects = this.savedProjects.filter(p => {
      if (!this.searchQuery) return true;
      const q = this.searchQuery.toLowerCase();
      return (p.name && p.name.toLowerCase().includes(q)) ||
             (p.category && p.category.toLowerCase().includes(q)) ||
             (p.id && p.id.toLowerCase().includes(q));
    });

    return html`
      <div class="modal-card" @click=${(e: Event) => e.stopPropagation()}>
        <!-- Header -->
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon">${this.activeTab === 'save' ? '💾' : '📂'}</span>
            <div>
              <h2 class="modal-title">
                ${this.activeTab === 'save' ? 'Enregistrer le plan' : 'Ouvrir / Recharger un plan'}
              </h2>
              <p class="modal-subtitle">
                ${this.activeTab === 'save'
                  ? 'Définissez le nom et la catégorie de votre plan pour le retrouver facilement'
                  : 'Sélectionnez un plan sauvegardé pour le charger dans l\'éditeur'}
              </p>
            </div>
          </div>
          <button class="btn-close" @click=${this.handleClose} title="Fermer">✕</button>
        </div>

        <!-- Onglets Navigation -->
        <div class="tabs-nav">
          <button 
            class="tab-btn ${this.activeTab === 'save' ? 'active' : ''}"
            @click=${() => this.activeTab = 'save'}
          >
            <span>💾</span>
            <span>Enregistrer le plan</span>
          </button>
          <button 
            class="tab-btn ${this.activeTab === 'load' ? 'active' : ''}"
            @click=${() => { this.activeTab = 'load'; this.fetchSavedProjects(); }}
          >
            <span>📂</span>
            <span>Ouvrir un plan (${this.savedProjects.length})</span>
          </button>
        </div>

        <!-- Corps du modal -->
        <div class="modal-body">
          ${this.activeTab === 'save' ? html`
            <!-- Formulaire Sauvegarde -->
            <div class="form-group">
              <label class="form-label">
                <span>🏷️</span>
                <span>Nom du plan :</span>
              </label>
              <input 
                type="text" 
                class="form-input" 
                .value=${this.planName}
                @input=${(e: any) => this.planName = e.target.value}
                placeholder="Ex: Plan RDC Maison, Plan Jardin Été..."
                autofocus
              />
            </div>

            <div class="form-group">
              <label class="form-label">
                <span>🏢</span>
                <span>Catégorie du plan (Niveau / Zone) :</span>
              </label>
              <div class="categories-grid">
                ${PLAN_CATEGORIES.map(cat => html`
                  <div 
                    class="category-card ${this.planCategory === cat.id ? 'selected' : ''}"
                    @click=${() => this.planCategory = cat.id}
                  >
                    <span class="cat-icon">${cat.icon}</span>
                    <span>${cat.label}</span>
                  </div>
                `)}
              </div>

              ${this.planCategory === 'autre' ? html`
                <div style="margin-top: 8px;">
                  <input 
                    type="text" 
                    class="form-input" 
                    .value=${this.customCategoryName}
                    @input=${(e: any) => this.customCategoryName = e.target.value}
                    placeholder="Précisez la catégorie (ex: Combles, Terrasse, Garage...)"
                  />
                </div>
              ` : null}
            </div>

            <!-- Résumé du contenu -->
            <div class="form-group">
              <label class="form-label">
                <span>📊</span>
                <span>Contenu du plan à enregistrer :</span>
              </label>
              <div class="metrics-summary">
                <div class="metric-badge">🧱 <strong>${this.project?.walls?.length || 0}</strong> mur(s)</div>
                <div class="metric-badge">📐 <strong>${this.project?.rooms?.length || 0}</strong> pièce(s)</div>
                <div class="metric-badge">🚪 <strong>${this.project?.openings?.length || 0}</strong> ouvrant(s)</div>
                <div class="metric-badge">⚡ <strong>${this.project?.bindings?.length || 0}</strong> entité(s) HA</div>
                <div class="metric-badge">🛋️ <strong>${this.project?.furniture?.length || 0}</strong> meuble(s)</div>
              </div>
            </div>
          ` : html`
            <!-- Liste Ouvrir / Recharger -->
            <div class="search-bar">
              <input 
                type="text" 
                class="form-input" 
                .value=${this.searchQuery}
                @input=${(e: any) => this.searchQuery = e.target.value}
                placeholder="🔍 Rechercher un plan par nom ou catégorie..."
              />
            </div>

            ${this.isLoadingProjects ? html`
              <div class="empty-state">
                <span>⏳ Chargement des plans sauvegardés...</span>
              </div>
            ` : filteredProjects.length === 0 ? html`
              <div class="empty-state">
                <span class="empty-state-icon">📂</span>
                <span>Aucun plan sauvegardé trouvé.</span>
                <button class="btn-primary" style="margin-top: 6px;" @click=${() => this.activeTab = 'save'}>
                  💾 Enregistrer le plan actuel
                </button>
              </div>
            ` : html`
              <div class="projects-list">
                ${filteredProjects.map(p => {
                  const cat = this.getCategoryItem(p.category || p.id);
                  const isCurrent = p.id === this.project?.id;
                  return html`
                    <div class="project-item ${isCurrent ? 'current' : ''}">
                      <div class="project-info">
                        <div class="project-title-row">
                          <span class="project-cat-badge">
                            <span>${cat.icon}</span>
                            <span>${cat.label}</span>
                          </span>
                          <span class="project-name" title="${p.name}">${p.name || 'Plan Sans Nom'}</span>
                          ${isCurrent ? html`<span style="font-size: 0.72rem; color: #38bdf8; font-weight: 700;">(Ouvert)</span>` : null}
                        </div>
                        <div class="project-meta-row">
                          <span>📅 Modifié le ${this.formatDate(p.updated_at)}</span>
                          <span>•</span>
                          <span>🧱 ${p.walls?.length || 0} murs</span>
                          <span>•</span>
                          <span>📐 ${p.rooms?.length || 0} pièces</span>
                          <span>•</span>
                          <span>🛋️ ${p.furniture?.length || 0} meuble${(p.furniture?.length || 0) > 1 ? 's' : ''}</span>
                          <span>•</span>
                          <span>⚡ ${p.bindings?.length || 0} capteurs</span>
                        </div>
                      </div>

                      <div class="project-actions">
                        <button class="btn-load" @click=${() => this.handleLoadProject(p)} title="Charger ce plan">
                          <span>⚡</span>
                          <span>Charger</span>
                        </button>
                        <button class="btn-delete" @click=${(e: Event) => this.handleDeleteProject(p.id, e)} title="Supprimer ce plan">
                          🗑️
                        </button>
                      </div>
                    </div>
                  `;
                })}
              </div>
            `}
          `}
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button class="btn-secondary" @click=${this.handleClose}>
            Annuler
          </button>
          ${this.activeTab === 'save' ? html`
            <button class="btn-primary" @click=${this.handleSave}>
              <span>💾</span>
              <span>Enregistrer le plan</span>
            </button>
          ` : null}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-save-load-modal': HomeArchitectSaveLoadModal;
  }
}
