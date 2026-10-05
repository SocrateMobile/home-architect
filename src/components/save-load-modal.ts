import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { defineElement } from '../core/define';
import { HomeArchitectProject } from '../core/types';
import {
  CUSTOM_CATEGORY, CUSTOM_CATEGORY_DEF, DEFAULT_LEVEL, KNOWN_LEVELS, LevelDef, getLevel, getLevelLabel, isKnownLevel
} from '../core/levels';
import { legacyCategory } from '../core/project-model';
import { HaApiError, ProjectSummary, deleteProject, isAdmin, listProjects } from '../core/ha-api';
import { Draft, deleteDraft, listDrafts } from '../core/drafts';

/** Catégories proposées pour un plan : niveaux connus puis « Autre » (dérivées de core/levels). */
export const PLAN_CATEGORIES: readonly LevelDef[] = Object.freeze([...KNOWN_LEVELS, CUSTOM_CATEGORY_DEF]);

/** Limites appliquées par le backend (save_project refuse au-delà). */
const MAX_NAME_LENGTH = 200;
const MAX_CATEGORY_LENGTH = 64;

/** Entrée de la liste « Ouvrir » : projet du serveur et/ou brouillon local (IndexedDB) de cet appareil. */
interface PlanRow {
  id: string;
  name: string;
  category?: string;
  /** Dernière modification connue (serveur, sinon date du brouillon). */
  updatedAt?: string;
  counts: { walls: number; rooms: number; bindings: number; furniture: number };
  onServer: boolean;
  /** Révision actuelle côté serveur (projet du serveur uniquement). */
  revision?: number;
  /** Date du brouillon local de ce projet, s'il en existe un. */
  draftSavedAt?: string;
  /** Révision serveur sur laquelle le brouillon a été commencé (null : plan jamais enregistré). */
  draftBaseRevision?: number | null;
}

function timestamp(iso: string | undefined): number {
  const t = iso ? Date.parse(iso) : NaN;
  return Number.isFinite(t) ? t : 0;
}

function errorMessage(err: unknown): string {
  if (err instanceof HaApiError || err instanceof Error) return err.message;
  return String(err);
}

/** Fusionne la liste du serveur et les brouillons locaux (un brouillon sans projet serveur forme sa propre ligne). */
function mergeRows(summaries: ProjectSummary[], drafts: Draft[]): PlanRow[] {
  const rows = new Map<string, PlanRow>();
  for (const s of summaries) {
    rows.set(s.id, {
      id: s.id,
      name: s.name,
      category: s.category,
      updatedAt: s.updated_at,
      counts: { ...s.counts },
      onServer: true,
      revision: s.revision,
    });
  }
  for (const d of drafts) {
    const row = rows.get(d.projectId);
    if (row) {
      row.draftSavedAt = d.savedAt;
      row.draftBaseRevision = d.baseRevision;
      continue;
    }
    const p = d.project;
    rows.set(d.projectId, {
      id: d.projectId,
      name: p.name,
      category: p.category,
      updatedAt: d.savedAt,
      counts: { walls: p.walls.length, rooms: p.rooms.length, bindings: p.bindings.length, furniture: (p.furniture ?? []).length },
      onServer: false,
      draftSavedAt: d.savedAt,
      draftBaseRevision: d.baseRevision,
    });
  }
  return [...rows.values()].sort((a, b) => timestamp(b.updatedAt) - timestamp(a.updatedAt));
}

function categoryIcon(category: string | undefined): string {
  return getLevel(category)?.icon ?? CUSTOM_CATEGORY_DEF.icon;
}

function plural(n: number, singular: string, pluralForm: string): string {
  return `${n} ${n > 1 ? pluralForm : singular}`;
}

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

    .btn-primary:disabled,
    .btn-secondary:disabled,
    .btn-load:disabled,
    .btn-delete:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .banner {
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 0.84rem;
      line-height: 1.4;
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }

    .banner-error {
      background: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.45);
      color: #fca5a5;
    }

    .banner-info {
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.35);
      color: #bae6fd;
    }

    .banner-warning {
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid rgba(245, 158, 11, 0.45);
      color: #fde68a;
    }

    .banner-text {
      flex: 1;
      min-width: 0;
    }

    .banner-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 8px;
    }

    .btn-link {
      background: transparent;
      border: 1px solid currentColor;
      border-radius: 6px;
      color: inherit;
      padding: 3px 10px;
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
    }

    .btn-danger {
      background: #ef4444;
      border: 1px solid #f87171;
      color: #ffffff;
      border-radius: 6px;
      padding: 3px 10px;
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
    }

    .btn-danger:disabled {
      opacity: 0.6;
      cursor: progress;
    }

    .project-entry {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .project-meta-row {
      flex-wrap: wrap;
      row-gap: 2px;
    }

    .project-cat-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .local-badge {
      background: rgba(245, 158, 11, 0.15);
      color: #fbbf24;
      border: 1px solid rgba(245, 158, 11, 0.4);
      padding: 1px 7px;
      border-radius: 6px;
      font-size: 0.72rem;
      font-weight: 700;
      white-space: nowrap;
    }

    .current-badge {
      font-size: 0.72rem;
      color: #38bdf8;
      font-weight: 700;
      white-space: nowrap;
    }

    .list-toolbar {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .list-toolbar .form-input {
      flex: 1;
    }

    .form-input:disabled,
    .category-card.disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .category-card.disabled:hover {
      transform: none;
      background: rgba(30, 41, 59, 0.7);
      border-color: rgba(255, 255, 255, 0.12);
      color: #cbd5e1;
    }
  `;

  /** Projet ouvert dans l'éditeur. */
  @property({ type: Object })
  public project?: HomeArchitectProject;

  @property({ type: Object })
  public hass: any;

  /** Onglet affiché à l'ouverture. */
  @property({ type: String })
  public mode: 'save' | 'load' = 'save';

  /** Lecture seule (utilisateur non administrateur) : ni enregistrement ni suppression sur le serveur. */
  @property({ type: Boolean })
  public readOnly: boolean = false;

  /** Projets ayant des modifications non sauvegardées (pour avertir avant d'ouvrir un autre plan). */
  @property({ attribute: false })
  public dirtyProjectIds: string[] = [];

  @state()
  private activeTab: 'save' | 'load' = 'save';

  @state()
  private planName: string = '';

  @state()
  private planCategory: string = DEFAULT_LEVEL;

  @state()
  private customCategoryName: string = '';

  @state()
  private rows: PlanRow[] = [];

  @state()
  private listState: 'loading' | 'ready' = 'loading';

  /** Échec de lecture de la liste du serveur (les brouillons locaux restent affichés). */
  @state()
  private listError: string | null = null;

  /** Échec d'une action (suppression). */
  @state()
  private actionError: string | null = null;

  @state()
  private searchQuery: string = '';

  /** Ligne en attente de confirmation de suppression. */
  @state()
  private pendingDeleteId: string | null = null;

  /** Suppression en cours. */
  @state()
  private deletingId: string | null = null;

  /** Ligne en attente de confirmation d'ouverture (modifications non sauvegardées). */
  @state()
  private pendingLoadId: string | null = null;

  private formInitialized = false;
  private listRequest = 0;
  /** La dernière lecture de la liste a été lancée avec une connexion `hass` disponible. */
  private listHadHass = true;

  connectedCallback() {
    super.connectedCallback();
    // Réinsertion pendant un chargement interrompu par disconnectedCallback : on relance.
    if (this.hasUpdated && this.listState === 'loading') void this.refreshList();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.listRequest++; // ignore les réponses arrivant après la fermeture
  }

  protected firstUpdated() {
    void this.refreshList();
  }

  protected updated(changed: PropertyValues<this>) {
    // `hass` fourni après l'ouverture : la lecture lancée sans connexion a échoué (ou échouera) ;
    // on relance, la réponse de la lecture précédente sera ignorée.
    if (changed.has('hass') && !changed.get('hass') && this.hass && (this.listError || !this.listHadHass)) {
      void this.refreshList();
    }
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has('mode')) {
      this.activeTab = this.mode === 'load' ? 'load' : 'save';
    }
    if (!this.formInitialized && this.project) {
      this.formInitialized = true;
      this.initForm(this.project);
    }
  }

  private initForm(project: HomeArchitectProject) {
    this.planName = project.name || 'Plan de Maison';
    const category = project.category ?? legacyCategory(project.id) ?? DEFAULT_LEVEL;
    if (isKnownLevel(category) || category === CUSTOM_CATEGORY) {
      this.planCategory = category;
      this.customCategoryName = '';
    } else {
      this.planCategory = CUSTOM_CATEGORY;
      this.customCategoryName = category;
    }
  }

  private get isReadOnly(): boolean {
    return this.readOnly || !isAdmin(this.hass);
  }

  /** Recharge la liste (résumés légers du serveur + brouillons de cet appareil). */
  public async refreshList(): Promise<void> {
    const request = ++this.listRequest;
    this.listHadHass = !!this.hass;
    this.listState = 'loading';
    this.listError = null;
    const draftsPromise = listDrafts();
    let summaries: ProjectSummary[] = [];
    let error: string | null = null;
    try {
      summaries = await listProjects(this.hass);
    } catch (err) {
      error = errorMessage(err);
    }
    const drafts = await draftsPromise;
    if (request !== this.listRequest) return;
    this.rows = mergeRows(summaries, drafts);
    this.listError = error;
    this.listState = 'ready';
  }

  /** Catégorie finale du formulaire (« Autre » précisée, sinon 'autre'). */
  private get selectedCategory(): string {
    if (this.planCategory !== CUSTOM_CATEGORY) return this.planCategory;
    return this.customCategoryName.trim().slice(0, MAX_CATEGORY_LENGTH) || CUSTOM_CATEGORY;
  }

  private handleSave(saveAs: boolean) {
    if (this.isReadOnly) return;
    const name = (this.planName.trim() || 'Plan sans nom').slice(0, MAX_NAME_LENGTH);
    this.dispatchEvent(new CustomEvent('save-confirmed', {
      detail: { name, category: this.selectedCategory, saveAs },
      bubbles: true,
      composed: true
    }));
  }

  /** Vrai si ouvrir `projectId` ferait perdre des modifications non sauvegardées. */
  private loadWarning(row: PlanRow): string | null {
    const dirty = new Set(this.dirtyProjectIds ?? []);
    const current = this.project;
    if (current && current.id === row.id && dirty.has(row.id)) {
      return `« ${row.name} » est ouvert et contient des modifications non sauvegardées : elles seront remplacées par la version enregistrée.`;
    }
    if (current && current.id !== row.id && dirty.has(current.id)) {
      return `« ${current.name} » contient des modifications non sauvegardées qui seront perdues si vous ouvrez « ${row.name} » sans enregistrer.`;
    }
    if (dirty.has(row.id)) {
      return `« ${row.name} » contient des modifications non sauvegardées en mémoire : la version enregistrée les remplacera.`;
    }
    return null;
  }

  private requestLoad(row: PlanRow) {
    this.pendingDeleteId = null;
    this.actionError = null;
    if (this.loadWarning(row) && this.pendingLoadId !== row.id) {
      this.pendingLoadId = row.id;
      return;
    }
    this.pendingLoadId = null;
    this.dispatchEvent(new CustomEvent('load-project', {
      detail: { projectId: row.id },
      bubbles: true,
      composed: true
    }));
  }

  private canDelete(row: PlanRow): boolean {
    // Un brouillon local se supprime sans droit serveur ; un projet du serveur exige un administrateur.
    return !row.onServer || !this.isReadOnly;
  }

  private requestDelete(row: PlanRow) {
    this.pendingLoadId = null;
    this.actionError = null;
    this.pendingDeleteId = row.id;
  }

  private async confirmDelete(row: PlanRow) {
    if (this.deletingId || !this.canDelete(row)) return;
    this.deletingId = row.id;
    this.actionError = null;
    try {
      if (row.onServer) {
        await deleteProject(this.hass, row.id);
      }
      await deleteDraft(row.id);
      this.rows = this.rows.filter(r => r.id !== row.id);
      this.pendingDeleteId = null;
      if (row.onServer) {
        this.dispatchEvent(new CustomEvent('project-deleted', {
          detail: { projectId: row.id },
          bubbles: true,
          composed: true
        }));
      }
    } catch (err) {
      this.actionError = `Suppression de « ${row.name} » impossible : ${errorMessage(err)}`;
    } finally {
      this.deletingId = null;
    }
  }

  private handleClose() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.stopPropagation();
      if (this.pendingDeleteId || this.pendingLoadId) {
        this.pendingDeleteId = null;
        this.pendingLoadId = null;
      } else {
        this.handleClose();
      }
    }
  }

  private formatDate(isoDate?: string): string {
    const t = isoDate ? Date.parse(isoDate) : NaN;
    if (!Number.isFinite(t)) return 'date inconnue';
    return new Date(t).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /** Libellé du brouillon local d'une ligne, selon qu'il prolonge la version du serveur ou non. */
  private draftBadge(row: PlanRow): { text: string; title: string } {
    const date = this.formatDate(row.draftSavedAt);
    const base = row.draftBaseRevision;
    if (row.onServer) {
      if (typeof base === 'number' && typeof row.revision === 'number' && base < row.revision) {
        return {
          text: `Copie locale du ${date} (antérieure à la version du serveur)`,
          title: "Brouillon commencé sur une version plus ancienne : le plan a été enregistré depuis, ailleurs ou sur cet appareil",
        };
      }
      return {
        text: `Copie locale du ${date} (modifications non envoyées)`,
        title: 'Brouillon enregistré sur cet appareil et pas encore envoyé au serveur',
      };
    }
    if (this.listError) {
      return {
        text: `Copie locale du ${date} (serveur injoignable)`,
        title: "La liste du serveur n'a pas pu être lue : ce plan y existe peut-être aussi",
      };
    }
    if (typeof base === 'number') {
      return {
        text: `Copie locale du ${date} (plan absent du serveur)`,
        title: "Ce plan a été enregistré puis supprimé du serveur : ouvrez-le et enregistrez-le pour le recréer",
      };
    }
    return {
      text: 'Copie locale uniquement (jamais enregistrée sur le serveur)',
      title: "Ce plan n'existe que sur cet appareil : ouvrez-le puis enregistrez-le pour l'envoyer au serveur",
    };
  }

  private renderSaveTab() {
    const readOnly = this.isReadOnly;
    const current = this.project;
    const currentRow = current ? this.rows.find(r => r.id === current.id && r.onServer) : undefined;
    const category = this.selectedCategory;
    const siblings = this.rows.filter(r => r.onServer && r.id !== current?.id && r.category === category);

    return html`
      ${readOnly ? html`
        <div class="banner banner-warning" role="status">
          <span>🔒</span>
          <span class="banner-text">Lecture seule : seul un administrateur Home Assistant peut enregistrer des plans.</span>
        </div>
      ` : nothing}

      <!-- Formulaire Sauvegarde -->
      <div class="form-group">
        <label class="form-label" for="plan-name">
          <span>🏷️</span>
          <span>Nom du plan :</span>
        </label>
        <input 
          id="plan-name"
          type="text" 
          class="form-input" 
          maxlength=${MAX_NAME_LENGTH}
          .value=${this.planName}
          ?disabled=${readOnly}
          @input=${(e: Event) => this.planName = (e.target as HTMLInputElement).value}
          @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' && !e.isComposing) this.handleSave(false); }}
          placeholder="Ex: Plan RDC Maison, Plan Jardin Été..."
          autofocus
        />
      </div>

      <div class="form-group">
        <span class="form-label">
          <span>🏢</span>
          <span>Catégorie du plan (Niveau / Zone) :</span>
        </span>
        <div class="categories-grid" role="radiogroup" aria-label="Catégorie du plan">
          ${PLAN_CATEGORIES.map(cat => html`
            <div 
              class="category-card ${this.planCategory === cat.id ? 'selected' : ''} ${readOnly ? 'disabled' : ''}"
              role="radio"
              aria-checked=${this.planCategory === cat.id ? 'true' : 'false'}
              aria-disabled=${readOnly ? 'true' : 'false'}
              tabindex=${readOnly ? -1 : 0}
              @click=${() => { if (!readOnly) this.planCategory = cat.id; }}
              @keydown=${(e: KeyboardEvent) => {
                if (!readOnly && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  this.planCategory = cat.id;
                }
              }}
            >
              <span class="cat-icon">${cat.icon}</span>
              <span>${cat.label}</span>
            </div>
          `)}
        </div>

        ${this.planCategory === CUSTOM_CATEGORY ? html`
          <div style="margin-top: 8px;">
            <input 
              type="text" 
              class="form-input" 
              maxlength=${MAX_CATEGORY_LENGTH}
              .value=${this.customCategoryName}
              ?disabled=${readOnly}
              @input=${(e: Event) => this.customCategoryName = (e.target as HTMLInputElement).value}
              placeholder="Précisez la catégorie (ex: Combles, Terrasse, Garage...)"
            />
          </div>
        ` : nothing}
      </div>

      ${!readOnly && currentRow ? html`
        <div class="banner banner-info">
          <span>ℹ️</span>
          <span class="banner-text">
            Ce plan est déjà enregistré (modifié le ${this.formatDate(currentRow.updatedAt)}) :
            « Enregistrer » le met à jour, « Enregistrer sous… » crée une copie indépendante sans le modifier.
          </span>
        </div>
      ` : nothing}

      ${!readOnly && siblings.length > 0 ? html`
        <div class="banner banner-info">
          <span>🏢</span>
          <span class="banner-text">
            La catégorie « ${getLevelLabel(category)} » contient déjà
            ${siblings.map((r, i) => html`${i > 0 ? ', ' : ''}« ${r.name} »`)} :
            les plans restent distincts, aucun ne sera écrasé.
          </span>
        </div>
      ` : nothing}

      <!-- Résumé du contenu -->
      <div class="form-group">
        <span class="form-label">
          <span>📊</span>
          <span>Contenu du plan à enregistrer :</span>
        </span>
        <div class="metrics-summary">
          <div class="metric-badge">🧱 <strong>${current?.walls?.length || 0}</strong> mur(s)</div>
          <div class="metric-badge">📐 <strong>${current?.rooms?.length || 0}</strong> pièce(s)</div>
          <div class="metric-badge">🚪 <strong>${current?.openings?.length || 0}</strong> ouvrant(s)</div>
          <div class="metric-badge">⚡ <strong>${current?.bindings?.length || 0}</strong> entité(s) HA</div>
          <div class="metric-badge">🛋️ <strong>${current?.furniture?.length || 0}</strong> meuble(s)</div>
        </div>
      </div>
    `;
  }

  private renderRow(row: PlanRow) {
    const isCurrent = row.id === this.project?.id;
    const isDeleting = this.deletingId === row.id;
    const loadWarning = this.pendingLoadId === row.id ? this.loadWarning(row) : null;
    const confirmDelete = this.pendingDeleteId === row.id;
    const { walls, rooms, furniture, bindings } = row.counts;
    const draft = this.draftBadge(row);

    return html`
      <div class="project-entry">
        <div class="project-item ${isCurrent ? 'current' : ''}">
          <div class="project-info">
            <div class="project-title-row">
              <span class="project-cat-badge">
                <span>${categoryIcon(row.category)}</span>
                <span>${getLevelLabel(row.category)}</span>
              </span>
              <span class="project-name" title=${row.name}>${row.name || 'Plan sans nom'}</span>
              ${isCurrent ? html`<span class="current-badge">(Ouvert)</span>` : nothing}
            </div>
            <div class="project-meta-row">
              <span>📅 Modifié le ${this.formatDate(row.updatedAt)}</span>
              <span>•</span>
              <span>🧱 ${plural(walls, 'mur', 'murs')}</span>
              <span>•</span>
              <span>📐 ${plural(rooms, 'pièce', 'pièces')}</span>
              <span>•</span>
              <span>🛋️ ${plural(furniture, 'meuble', 'meubles')}</span>
              <span>•</span>
              <span>⚡ ${plural(bindings, 'entité', 'entités')}</span>
            </div>
            ${row.draftSavedAt ? html`
              <div class="project-meta-row">
                <span class="local-badge" title=${draft.title}>💾 ${draft.text}</span>
              </div>
            ` : nothing}
          </div>

          <div class="project-actions">
            <button
              class="btn-load"
              ?disabled=${isDeleting}
              @click=${() => this.requestLoad(row)}
              title=${isCurrent ? 'Recharger la version enregistrée de ce plan' : 'Charger ce plan'}
            >
              <span>⚡</span>
              <span>${isCurrent ? 'Recharger' : 'Charger'}</span>
            </button>
            ${this.canDelete(row) ? html`
              <button
                class="btn-delete"
                ?disabled=${isDeleting}
                @click=${() => this.requestDelete(row)}
                title=${row.onServer ? 'Supprimer ce plan' : 'Supprimer cette copie locale'}
                aria-label=${row.onServer ? `Supprimer le plan ${row.name}` : `Supprimer la copie locale de ${row.name}`}
              >
                🗑️
              </button>
            ` : nothing}
          </div>
        </div>

        ${loadWarning ? html`
          <div class="banner banner-warning" role="alert">
            <span>⚠️</span>
            <div class="banner-text">
              <div>${loadWarning}</div>
              <div class="banner-actions">
                <button class="btn-danger" @click=${() => this.requestLoad(row)}>Ouvrir quand même</button>
                <button class="btn-link" @click=${() => this.pendingLoadId = null}>Annuler</button>
              </div>
            </div>
          </div>
        ` : nothing}

        ${confirmDelete ? html`
          <div class="banner banner-error" role="alert">
            <span>🗑️</span>
            <div class="banner-text">
              <div>
                ${row.onServer
                  ? `Supprimer définitivement « ${row.name} » du serveur ? Cette action est irréversible.`
                  : this.listError
                    ? `Supprimer la copie locale de « ${row.name} » de cet appareil ? La liste du serveur étant indisponible, le plan y existe peut-être encore : il n'y sera pas supprimé.`
                    : `Supprimer la copie locale de « ${row.name} » ? Ce plan n'existe nulle part ailleurs.`}
                ${isCurrent ? ' Ce plan est actuellement ouvert dans l\'éditeur.' : ''}
              </div>
              <div class="banner-actions">
                <button class="btn-danger" ?disabled=${isDeleting} @click=${() => this.confirmDelete(row)}>
                  ${isDeleting ? 'Suppression…' : 'Supprimer'}
                </button>
                <button class="btn-link" ?disabled=${isDeleting} @click=${() => this.pendingDeleteId = null}>Annuler</button>
              </div>
            </div>
          </div>
        ` : nothing}
      </div>
    `;
  }

  private renderLoadTab() {
    const q = this.searchQuery.trim().toLowerCase();
    const filteredRows = q
      ? this.rows.filter(r =>
          r.name.toLowerCase().includes(q) ||
          getLevelLabel(r.category).toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q))
      : this.rows;

    return html`
      <!-- Liste Ouvrir / Recharger -->
      <div class="search-bar list-toolbar">
        <input 
          type="text" 
          class="form-input" 
          .value=${this.searchQuery}
          @input=${(e: Event) => this.searchQuery = (e.target as HTMLInputElement).value}
          placeholder="🔍 Rechercher un plan par nom ou catégorie..."
          aria-label="Rechercher un plan"
        />
        <button
          class="btn-secondary"
          ?disabled=${this.listState === 'loading'}
          @click=${() => this.refreshList()}
          title="Actualiser la liste"
        >
          🔄
        </button>
      </div>

      ${this.listError ? html`
        <div class="banner banner-error" role="alert">
          <span>⚠️</span>
          <div class="banner-text">
            <div>Liste des plans du serveur indisponible : ${this.listError}</div>
            <div class="banner-actions">
              <button class="btn-link" @click=${() => this.refreshList()}>Réessayer</button>
            </div>
          </div>
        </div>
      ` : nothing}

      ${this.actionError ? html`
        <div class="banner banner-error" role="alert">
          <span>⚠️</span>
          <span class="banner-text">${this.actionError}</span>
        </div>
      ` : nothing}

      ${this.listState === 'loading' ? html`
        <div class="empty-state">
          <span>⏳ Chargement des plans sauvegardés...</span>
        </div>
      ` : filteredRows.length === 0 ? html`
        <div class="empty-state">
          <span class="empty-state-icon">📂</span>
          <span>${q ? 'Aucun plan ne correspond à la recherche.' : 'Aucun plan sauvegardé trouvé.'}</span>
          ${!q && !this.isReadOnly ? html`
            <button class="btn-primary" style="margin-top: 6px;" @click=${() => this.activeTab = 'save'}>
              💾 Enregistrer le plan actuel
            </button>
          ` : nothing}
        </div>
      ` : html`
        <div class="projects-list">
          ${filteredRows.map(row => this.renderRow(row))}
        </div>
      `}
    `;
  }

  render() {
    const readOnly = this.isReadOnly;

    return html`
      <div class="modal-card" @click=${(e: Event) => e.stopPropagation()} @keydown=${this.handleKeyDown}>
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
        <div class="tabs-nav" role="tablist">
          <button 
            class="tab-btn ${this.activeTab === 'save' ? 'active' : ''}"
            role="tab"
            aria-selected=${this.activeTab === 'save' ? 'true' : 'false'}
            @click=${() => this.activeTab = 'save'}
          >
            <span>💾</span>
            <span>Enregistrer le plan</span>
          </button>
          <button 
            class="tab-btn ${this.activeTab === 'load' ? 'active' : ''}"
            role="tab"
            aria-selected=${this.activeTab === 'load' ? 'true' : 'false'}
            @click=${() => this.activeTab = 'load'}
          >
            <span>📂</span>
            <span>Ouvrir un plan${this.listState === 'ready' ? ` (${this.rows.length})` : ''}</span>
          </button>
        </div>

        <!-- Corps du modal -->
        <div class="modal-body">
          ${this.activeTab === 'save' ? this.renderSaveTab() : this.renderLoadTab()}
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button class="btn-secondary" @click=${this.handleClose}>
            ${this.activeTab === 'save' && !readOnly ? 'Annuler' : 'Fermer'}
          </button>
          ${this.activeTab === 'save' && !readOnly ? html`
            <button
              class="btn-secondary"
              @click=${() => this.handleSave(true)}
              title="Crée un nouveau plan (nouvel identifiant) sans modifier le plan enregistré"
            >
              📑 Enregistrer sous…
            </button>
            <button class="btn-primary" @click=${() => this.handleSave(false)}>
              <span>💾</span>
              <span>Enregistrer le plan</span>
            </button>
          ` : nothing}
        </div>
      </div>
    `;
  }
}

defineElement('home-architect-save-load-modal', HomeArchitectSaveLoadModal);

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-save-load-modal': HomeArchitectSaveLoadModal;
  }
}
