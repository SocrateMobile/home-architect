import { LitElement, html, css, nothing, PropertyValues, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { defineElement } from '../core/define';
import { HomeArchitectProject } from '../core/types';
import {
  CUSTOM_CATEGORY, CUSTOM_CATEGORY_DEF, DEFAULT_LEVEL, KNOWN_LEVELS, LevelDef, getLevel, getLevelLabel, isKnownLevel
} from '../core/levels';
import { legacyCategory } from '../core/project-model';
import { HaApiError, ProjectSummary, deleteProject, isAdmin, listProjects } from '../core/ha-api';
import { Draft, deleteDraft, listDrafts } from '../core/drafts';
import { LocalizeController, formatNumber, getLanguage, localize } from '../i18n';
import { localizeCount } from '../i18n/locales/ui';
import { applyColorScheme, uiThemeStyles } from '../styles/theme.styles';
import { deepActiveElement, focusableElements } from '../panel/a11y';

/** Catégories proposées pour un plan : niveaux connus puis « Autre » (dérivées de core/levels). */
export const PLAN_CATEGORIES: readonly LevelDef[] = Object.freeze([...KNOWN_LEVELS, CUSTOM_CATEGORY_DEF]);

/** Limites appliquées par le backend (save_project refuse au-delà). */
const MAX_NAME_LENGTH = 200;
const MAX_CATEGORY_LENGTH = 64;

type Tab = 'save' | 'load';
const TABS: readonly Tab[] = ['save', 'load'];
const TITLE_ID = 'save-load-title';
const TAB_PANEL_ID = 'save-load-tabpanel';

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

/** Nom de plan entre guillemets de la langue courante (« Plan » / “Plan”). */
function quoted(name: string): string {
  return localize('ui.saveload.quoted', { name });
}

/**
 * Locale des dates : celle de Home Assistant quand elle correspond à la langue de l'interface
 * (en-GB, fr-CA…), sinon la locale par défaut de cette langue.
 */
function dateLocale(hass: any): string {
  const lang = getLanguage();
  const haLocale: unknown = hass?.locale?.language ?? hass?.language;
  if (typeof haLocale === 'string' && haLocale.toLowerCase().startsWith(lang)) return haLocale;
  return lang === 'fr' ? 'fr-FR' : 'en-US';
}

export class HomeArchitectSaveLoadModal extends LitElement {
  static styles = [uiThemeStyles, css`
    :host {
      /* Couleurs dérivées des jetons du thème (src/styles/theme.styles.ts) */
      --sl-accent-ink: color-mix(in srgb, var(--arch-ui-accent) 55%, var(--arch-ui-text));
      --sl-accent-soft: color-mix(in srgb, var(--arch-ui-accent) 14%, transparent);
      --sl-hover-bg: color-mix(in srgb, var(--arch-ui-accent) 10%, var(--arch-ui-surface));
      --sl-item-bg: color-mix(in srgb, var(--arch-ui-surface-2) 40%, var(--arch-ui-surface));
      --sl-success-ink: color-mix(in srgb, var(--arch-ui-success) 55%, var(--arch-ui-text));
      --sl-danger-ink: color-mix(in srgb, var(--arch-ui-danger) 65%, var(--arch-ui-text));
      /* Texte secondaire posé sur l'en-tête ou les lignes (fond plus foncé que la surface) : renforcé (4,5:1). */
      --sl-muted-ink: color-mix(in srgb, var(--arch-ui-text-muted) 75%, var(--arch-ui-text));

      position: fixed;
      inset: 0;
      background: var(--arch-ui-overlay);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--arch-ui-font);
      color: var(--arch-ui-text);
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    /* « Réduire les animations » : la règle commune de uiThemeStyles ne vise pas l'hôte lui-même. */
    @media (prefers-reduced-motion: reduce) {
      :host {
        animation: none;
      }
    }

    .modal-card {
      background: var(--arch-ui-surface);
      border: 1px solid color-mix(in srgb, var(--arch-ui-accent) 35%, var(--arch-ui-border));
      border-radius: 16px;
      width: 580px;
      max-width: 94vw;
      max-height: 88vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      overflow: hidden;
    }

    .modal-header {
      padding: 16px 22px;
      border-bottom: 1px solid var(--arch-ui-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--arch-ui-surface-2);
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
      color: var(--arch-ui-text);
      margin: 0;
    }

    .modal-subtitle {
      font-size: 0.8rem;
      color: var(--sl-muted-ink);
      margin: 2px 0 0 0;
    }

    .btn-close {
      background: transparent;
      border: none;
      color: var(--arch-ui-text-muted);
      font-size: 20px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .btn-close:hover {
      color: var(--arch-ui-text);
      background: var(--sl-hover-bg);
    }

    .tabs-nav {
      display: flex;
      border-bottom: 1px solid var(--arch-ui-border);
      padding: 0 20px;
      gap: 10px;
      flex-shrink: 0;
    }

    .tab-btn {
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      color: var(--arch-ui-text-muted);
      padding: 12px 14px;
      font: inherit;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s ease;
    }

    .tab-btn:hover {
      color: var(--arch-ui-text);
    }

    .tab-btn.active {
      color: var(--sl-accent-ink);
      border-bottom-color: var(--arch-ui-accent);
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
      color: var(--arch-ui-text);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .form-input {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 10px 14px;
      color: var(--arch-ui-text);
      font: inherit;
      font-size: 0.92rem;
      outline: none;
      transition: all 0.2s ease;
      box-sizing: border-box;
      width: 100%;
    }

    .form-input::placeholder {
      color: var(--arch-ui-text-muted);
    }

    .form-input:focus {
      border-color: var(--arch-ui-accent);
      box-shadow: var(--arch-ui-focus-ring);
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 8px;
    }

    .category-card {
      background: var(--sl-item-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 10px 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s ease;
      color: var(--arch-ui-text);
      font: inherit;
      font-size: 0.84rem;
      font-weight: 600;
      text-align: left;
      user-select: none;
    }

    .category-card:hover:not(:disabled) {
      background: var(--sl-hover-bg);
      border-color: var(--arch-ui-accent);
      transform: translateY(-1px);
    }

    .category-card.selected {
      background: var(--sl-accent-soft);
      border-color: var(--arch-ui-accent);
      color: var(--sl-accent-ink);
      box-shadow: 0 0 12px color-mix(in srgb, var(--arch-ui-accent) 30%, transparent);
      font-weight: 700;
    }

    .category-card .cat-icon {
      font-size: 1.25rem;
    }

    .metrics-summary {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 12px 16px;
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      margin: 0;
      list-style: none;
      font-size: 0.82rem;
      color: var(--arch-ui-text-muted);
    }

    .metric-badge {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .metric-badge strong {
      color: var(--sl-accent-ink);
    }

    .modal-footer {
      padding: 14px 22px;
      border-top: 1px solid var(--arch-ui-border);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-wrap: wrap;
      gap: 12px;
      background: var(--arch-ui-surface-2);
      flex-shrink: 0;
    }

    .btn-secondary {
      background: var(--arch-ui-surface);
      color: var(--arch-ui-text);
      border: 1px solid var(--arch-ui-border);
      border-radius: 8px;
      padding: 8px 16px;
      font: inherit;
      font-size: 0.86rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-secondary:hover:not(:disabled) {
      background: var(--sl-hover-bg);
    }

    .btn-primary {
      background: var(--arch-ui-accent);
      color: var(--arch-ui-accent-text);
      border: 1px solid var(--arch-ui-accent);
      border-radius: 8px;
      padding: 8px 20px;
      font: inherit;
      font-size: 0.86rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s ease;
      box-shadow: 0 0 14px color-mix(in srgb, var(--arch-ui-accent) 35%, transparent);
    }

    .btn-primary:hover:not(:disabled) {
      background: color-mix(in srgb, var(--arch-ui-accent) 85%, black);
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
      padding: 2px 4px 2px 2px;
      margin: 0;
      list-style: none;
    }

    .project-item {
      background: var(--sl-item-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 12px;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      transition: all 0.15s ease;
    }

    .project-item:hover {
      border-color: color-mix(in srgb, var(--arch-ui-accent) 50%, transparent);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
    }

    .project-item.current {
      border-color: var(--arch-ui-accent);
      background: var(--sl-accent-soft);
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
      background: var(--sl-accent-soft);
      color: var(--sl-accent-ink);
      border: 1px solid color-mix(in srgb, var(--arch-ui-accent) 30%, transparent);
      padding: 2px 7px;
      border-radius: 6px;
      font-size: 0.74rem;
      font-weight: 700;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .project-name {
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--arch-ui-text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .project-meta-row {
      font-size: 0.78rem;
      color: var(--sl-muted-ink);
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 2px 12px;
    }

    .project-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-load {
      background: color-mix(in srgb, var(--arch-ui-success) 16%, transparent);
      color: var(--sl-success-ink);
      border: 1px solid color-mix(in srgb, var(--arch-ui-success) 45%, transparent);
      border-radius: 8px;
      padding: 6px 14px;
      font: inherit;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .btn-load:hover:not(:disabled) {
      background: color-mix(in srgb, var(--arch-ui-success) 30%, transparent);
      color: var(--arch-ui-text);
    }

    .btn-delete {
      background: transparent;
      color: var(--sl-danger-ink);
      border: 1px solid color-mix(in srgb, var(--arch-ui-danger) 40%, transparent);
      border-radius: 8px;
      padding: 6px 10px;
      font: inherit;
      font-size: 0.82rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-delete:hover:not(:disabled) {
      background: color-mix(in srgb, var(--arch-ui-danger) 18%, transparent);
    }

    .empty-state {
      padding: 36px 20px;
      text-align: center;
      color: var(--arch-ui-text-muted);
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

    /* Bandeaux : texte du thème (contraste), couleur portée par la bordure et la teinte de fond. */
    .banner {
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 0.84rem;
      line-height: 1.4;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      color: var(--arch-ui-text);
      border: 1px solid var(--banner-color);
      border-left-width: 4px;
      background: color-mix(in srgb, var(--banner-color) 12%, var(--arch-ui-surface));
    }

    .banner-error {
      --banner-color: var(--arch-ui-danger);
    }

    .banner-info {
      --banner-color: var(--arch-ui-info);
    }

    .banner-warning {
      --banner-color: var(--arch-ui-warning);
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
      font: inherit;
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
    }

    .btn-danger {
      background: color-mix(in srgb, var(--arch-ui-danger) 85%, black);
      border: 1px solid var(--arch-ui-danger);
      color: #ffffff;
      border-radius: 6px;
      padding: 3px 10px;
      font: inherit;
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
    }

    .btn-danger:hover:not(:disabled) {
      background: color-mix(in srgb, var(--arch-ui-danger) 70%, black);
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

    .local-badge {
      background: color-mix(in srgb, var(--arch-ui-warning) 15%, transparent);
      color: var(--arch-ui-text);
      border: 1px solid color-mix(in srgb, var(--arch-ui-warning) 50%, transparent);
      padding: 1px 7px;
      border-radius: 6px;
      font-size: 0.72rem;
      font-weight: 700;
      white-space: nowrap;
    }

    .current-badge {
      font-size: 0.72rem;
      color: var(--sl-accent-ink);
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
    .category-card:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    /* Focus clavier visible même sur les éléments qui portent déjà une ombre (catégorie choisie, bouton principal). */
    .category-card:focus-visible,
    .btn-primary:focus-visible,
    .btn-danger:focus-visible {
      outline: 2px solid var(--arch-ui-accent);
      outline-offset: 2px;
    }

    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
    }
  `];

  /** Projet ouvert dans l'éditeur. */
  @property({ type: Object })
  public project?: HomeArchitectProject;

  @property({ type: Object })
  public hass: any;

  /** Onglet affiché à l'ouverture. */
  @property({ type: String })
  public mode: Tab = 'save';

  /** Lecture seule (utilisateur non administrateur) : ni enregistrement ni suppression sur le serveur. */
  @property({ type: Boolean })
  public readOnly: boolean = false;

  /** Projets ayant des modifications non sauvegardées (pour avertir avant d'ouvrir un autre plan). */
  @property({ attribute: false })
  public dirtyProjectIds: string[] = [];

  @state()
  private activeTab: Tab = 'save';

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

  /** Re-rendu au changement de langue. */
  private readonly i18n = new LocalizeController(this);

  private formInitialized = false;
  private listRequest = 0;
  /** La dernière lecture de la liste a été lancée avec une connexion `hass` disponible. */
  private listHadHass = true;
  /** Élément qui avait le focus à l'ouverture (bouton Sauvegarder / Ouvrir) : il le retrouve à la fermeture. */
  private returnFocusTo: HTMLElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.returnFocusTo = deepActiveElement();
    this.addEventListener('keydown', this.handleKeyDown);
    // Réinsertion pendant un chargement interrompu par disconnectedCallback : on relance.
    if (this.hasUpdated && this.listState === 'loading') void this.refreshList();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.listRequest++; // ignore les réponses arrivant après la fermeture
    this.removeEventListener('keydown', this.handleKeyDown);
    const target = this.returnFocusTo;
    this.returnFocusTo = null;
    if (target?.isConnected && target !== document.body) target.focus({ preventScroll: true });
  }

  protected firstUpdated() {
    void this.refreshList();
    this.focusInitial();
  }

  protected updated(changed: PropertyValues<this>) {
    // `hass` fourni après l'ouverture : la lecture lancée sans connexion a échoué (ou échouera) ;
    // on relance, la réponse de la lecture précédente sera ignorée.
    if (changed.has('hass') && !changed.get('hass') && this.hass && (this.listError || !this.listHadHass)) {
      void this.refreshList();
    }
  }

  protected willUpdate(changed: PropertyValues<this>) {
    // Palette claire / sombre : reposée seulement si les thèmes changent (hass change à chaque état d'entité).
    if (changed.has('hass') && (!this.hasAttribute('scheme') || changed.get('hass')?.themes !== this.hass?.themes)) {
      applyColorScheme(this, this.hass);
    }
    if (changed.has('mode')) {
      this.activeTab = this.mode === 'load' ? 'load' : 'save';
    }
    if (!this.formInitialized && this.project) {
      this.formInitialized = true;
      this.initForm(this.project);
    }
  }

  private initForm(project: HomeArchitectProject) {
    this.planName = project.name || localize('ui.saveload.default_plan_name');
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

  /** Focus initial : nom du plan (enregistrement), recherche (ouverture), sinon l'onglet actif. */
  private focusInitial() {
    const selector = this.activeTab === 'load'
      ? '.list-toolbar .form-input'
      : this.isReadOnly ? '.tab-btn.active' : '#plan-name';
    const target = this.renderRoot.querySelector<HTMLElement>(selector);
    target?.focus({ preventScroll: true });
    if (target instanceof HTMLInputElement && target.id === 'plan-name') target.select();
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
    const name = (this.planName.trim() || localize('ui.saveload.untitled')).slice(0, MAX_NAME_LENGTH);
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
      return localize('ui.saveload.warn_reload_current', { name: quoted(row.name) });
    }
    if (current && current.id !== row.id && dirty.has(current.id)) {
      return localize('ui.saveload.warn_lose_current', { current: quoted(current.name), name: quoted(row.name) });
    }
    if (dirty.has(row.id)) {
      return localize('ui.saveload.warn_replace_memory', { name: quoted(row.name) });
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
      this.actionError = localize('ui.saveload.delete_failed', { name: quoted(row.name), error: errorMessage(err) });
    } finally {
      this.deletingId = null;
    }
  }

  private handleClose() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  /** Échap annule la confirmation en cours, sinon ferme ; Tab et Maj+Tab restent dans la modale. */
  private handleKeyDown = (e: KeyboardEvent) => {
    // Échap pendant une composition (IME) annule seulement la saisie en cours.
    if (e.key === 'Escape' && !e.isComposing) {
      e.preventDefault();
      e.stopPropagation();
      if (this.pendingDeleteId || this.pendingLoadId) {
        this.pendingDeleteId = null;
        this.pendingLoadId = null;
      } else {
        this.handleClose();
      }
      return;
    }
    if (e.key !== 'Tab') return;
    const card = this.renderRoot.querySelector<HTMLElement>('.modal-card');
    if (!card) return;
    const items = focusableElements(card);
    if (items.length === 0) {
      e.preventDefault();
      return;
    }
    const active = this.shadowRoot?.activeElement;
    const first = items[0];
    const last = items[items.length - 1];
    if (!active || !items.includes(active as HTMLElement)) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  /** Change d'onglet ; `focusTab` : le focus suit l'onglet (navigation au clavier). */
  private selectTab(tab: Tab, focusTab = false) {
    this.activeTab = tab;
    if (focusTab) {
      void this.updateComplete.then(() => this.renderRoot.querySelector<HTMLElement>(`#save-load-tab-${tab}`)?.focus());
    }
  }

  /** Onglets au clavier : flèches gauche/droite, Début et Fin. */
  private handleTabKeyDown(e: KeyboardEvent) {
    const index = TABS.indexOf(this.activeTab);
    let next: Tab | undefined;
    switch (e.key) {
      case 'ArrowRight':
        next = TABS[(index + 1) % TABS.length];
        break;
      case 'ArrowLeft':
        next = TABS[(index - 1 + TABS.length) % TABS.length];
        break;
      case 'Home':
        next = TABS[0];
        break;
      case 'End':
        next = TABS[TABS.length - 1];
        break;
      default:
        return;
    }
    e.preventDefault();
    this.selectTab(next, true);
  }

  /** Catégories au clavier (groupe radio) : les flèches sélectionnent la catégorie voisine. */
  private handleCategoryKeyDown(e: KeyboardEvent) {
    if (this.isReadOnly) return;
    const index = Math.max(0, PLAN_CATEGORIES.findIndex(c => c.id === this.planCategory));
    let next: number;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = (index + 1) % PLAN_CATEGORIES.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        next = (index - 1 + PLAN_CATEGORIES.length) % PLAN_CATEGORIES.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = PLAN_CATEGORIES.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    this.planCategory = PLAN_CATEGORIES[next].id;
    void this.updateComplete.then(() =>
      this.renderRoot.querySelector<HTMLElement>('.category-card[aria-checked="true"]')?.focus());
  }

  private formatDate(isoDate?: string): string {
    const t = isoDate ? Date.parse(isoDate) : NaN;
    if (!Number.isFinite(t)) return localize('ui.saveload.unknown_date');
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    try {
      return new Date(t).toLocaleString(dateLocale(this.hass), options);
    } catch {
      return new Date(t).toLocaleString(undefined, options);
    }
  }

  /** Libellé du brouillon local d'une ligne, selon qu'il prolonge la version du serveur ou non. */
  private draftBadge(row: PlanRow): { text: string; title: string } {
    const date = this.formatDate(row.draftSavedAt);
    const base = row.draftBaseRevision;
    let kind: string;
    if (row.onServer) {
      kind = typeof base === 'number' && typeof row.revision === 'number' && base < row.revision ? 'outdated' : 'unsent';
    } else if (this.listError) {
      kind = 'unreachable';
    } else if (typeof base === 'number') {
      kind = 'deleted';
    } else {
      kind = 'local_only';
    }
    return {
      text: localize(`ui.saveload.draft.${kind}`, { date }),
      title: localize(`ui.saveload.draft.${kind}_tooltip`),
    };
  }

  /** Compteur du résumé à enregistrer (« 3 murs ») : nombre mis en évidence, nom accordé (`<noun>_one|_other`). */
  private renderMetric(icon: string, noun: string, count: number) {
    return html`
      <li class="metric-badge">
        <span aria-hidden="true">${icon}</span>
        <strong>${formatNumber(count)}</strong>
        <span>${localizeCount(noun, count)}</span>
      </li>
    `;
  }

  /** Quantité d'une ligne de la liste (« 3 murs »). */
  private quantity(noun: string, count: number): string {
    return localize('ui.saveload.quantity', { count: formatNumber(count), noun: localizeCount(noun, count) });
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
          <span aria-hidden="true">🔒</span>
          <span class="banner-text">${localize('ui.saveload.read_only')}</span>
        </div>
      ` : nothing}

      <!-- Formulaire Sauvegarde -->
      <div class="form-group">
        <label class="form-label" for="plan-name">
          <span aria-hidden="true">🏷️</span>
          <span>${localize('ui.saveload.name_label')}</span>
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
          placeholder=${localize('ui.saveload.name_placeholder')}
        />
      </div>

      <div class="form-group">
        <span class="form-label" id="plan-category-label">
          <span aria-hidden="true">🏢</span>
          <span>${localize('ui.saveload.category_label')}</span>
        </span>
        <div
          class="categories-grid"
          role="radiogroup"
          aria-labelledby="plan-category-label"
          aria-disabled=${readOnly ? 'true' : 'false'}
          @keydown=${this.handleCategoryKeyDown}
        >
          ${PLAN_CATEGORIES.map(cat => {
            const selected = this.planCategory === cat.id;
            return html`
              <button
                type="button"
                class="category-card ${selected ? 'selected' : ''}"
                role="radio"
                aria-checked=${selected ? 'true' : 'false'}
                tabindex=${selected ? 0 : -1}
                ?disabled=${readOnly}
                @click=${() => { if (!readOnly) this.planCategory = cat.id; }}
              >
                <span class="cat-icon" aria-hidden="true">${cat.icon}</span>
                <span>${cat.label}</span>
              </button>
            `;
          })}
        </div>

        ${this.planCategory === CUSTOM_CATEGORY ? html`
          <div style="margin-top: 8px;">
            <input
              type="text"
              class="form-input"
              maxlength=${MAX_CATEGORY_LENGTH}
              .value=${this.customCategoryName}
              ?disabled=${readOnly}
              aria-label=${localize('ui.saveload.custom_category')}
              @input=${(e: Event) => this.customCategoryName = (e.target as HTMLInputElement).value}
              placeholder=${localize('ui.saveload.custom_category_placeholder')}
            />
          </div>
        ` : nothing}
      </div>

      ${!readOnly && currentRow ? html`
        <div class="banner banner-info">
          <span aria-hidden="true">ℹ️</span>
          <span class="banner-text">${localize('ui.saveload.already_saved', { date: this.formatDate(currentRow.updatedAt) })}</span>
        </div>
      ` : nothing}

      ${!readOnly && siblings.length > 0 ? html`
        <div class="banner banner-info">
          <span aria-hidden="true">🏢</span>
          <span class="banner-text">${localize('ui.saveload.siblings', {
            category: quoted(getLevelLabel(category)),
            plans: siblings.map(r => quoted(r.name)).join(', '),
          })}</span>
        </div>
      ` : nothing}

      <!-- Résumé du contenu -->
      <div class="form-group">
        <span class="form-label" id="plan-contents-label">
          <span aria-hidden="true">📊</span>
          <span>${localize('ui.saveload.contents_label')}</span>
        </span>
        <ul class="metrics-summary" aria-labelledby="plan-contents-label">
          ${this.renderMetric('🧱', 'ui.saveload.noun.walls', current?.walls?.length || 0)}
          ${this.renderMetric('📐', 'ui.saveload.noun.rooms', current?.rooms?.length || 0)}
          ${this.renderMetric('🚪', 'ui.saveload.noun.openings', current?.openings?.length || 0)}
          ${this.renderMetric('⚡', 'ui.saveload.noun.ha_entities', current?.bindings?.length || 0)}
          ${this.renderMetric('🛋️', 'ui.saveload.noun.furniture', current?.furniture?.length || 0)}
        </ul>
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
    const name = row.name || localize('ui.saveload.untitled');
    const separator = html`<span aria-hidden="true">•</span>`;

    let deleteQuestion: string;
    if (row.onServer) deleteQuestion = localize('ui.saveload.confirm_delete_server', { name: quoted(name) });
    else if (this.listError) deleteQuestion = localize('ui.saveload.confirm_delete_local_unreachable', { name: quoted(name) });
    else deleteQuestion = localize('ui.saveload.confirm_delete_local', { name: quoted(name) });
    if (isCurrent) deleteQuestion += ` ${localize('ui.saveload.confirm_delete_open')}`;

    return html`
      <li class="project-entry">
        <div class="project-item ${isCurrent ? 'current' : ''}">
          <div class="project-info">
            <div class="project-title-row">
              <span class="project-cat-badge">
                <span aria-hidden="true">${categoryIcon(row.category)}</span>
                <span>${getLevelLabel(row.category)}</span>
              </span>
              <span class="project-name" title=${row.name}>${name}</span>
              ${isCurrent ? html`<span class="current-badge">${localize('ui.saveload.open_badge')}</span>` : nothing}
            </div>
            <div class="project-meta-row">
              <span><span aria-hidden="true">📅</span> ${localize('ui.saveload.modified', { date: this.formatDate(row.updatedAt) })}</span>
              ${separator}
              <span><span aria-hidden="true">🧱</span> ${this.quantity('ui.saveload.noun.walls', walls)}</span>
              ${separator}
              <span><span aria-hidden="true">📐</span> ${this.quantity('ui.saveload.noun.rooms', rooms)}</span>
              ${separator}
              <span><span aria-hidden="true">🛋️</span> ${this.quantity('ui.saveload.noun.furniture', furniture)}</span>
              ${separator}
              <span><span aria-hidden="true">⚡</span> ${this.quantity('ui.saveload.noun.entities', bindings)}</span>
            </div>
            ${row.draftSavedAt ? html`
              <div class="project-meta-row">
                <span class="local-badge" title=${draft.title}><span aria-hidden="true">💾</span> ${draft.text}</span>
              </div>
            ` : nothing}
          </div>

          <div class="project-actions">
            <button
              type="button"
              class="btn-load"
              ?disabled=${isDeleting}
              @click=${() => this.requestLoad(row)}
              title=${localize(isCurrent ? 'ui.saveload.reload_tooltip' : 'ui.saveload.load_tooltip')}
              aria-label=${localize(isCurrent ? 'ui.saveload.reload_plan' : 'ui.saveload.load_plan', { name })}
            >
              <span aria-hidden="true">⚡</span>
              <span>${localize(isCurrent ? 'ui.saveload.reload' : 'ui.saveload.load')}</span>
            </button>
            ${this.canDelete(row) ? html`
              <button
                type="button"
                class="btn-delete"
                ?disabled=${isDeleting}
                @click=${() => this.requestDelete(row)}
                title=${localize(row.onServer ? 'ui.saveload.delete_tooltip' : 'ui.saveload.delete_local_tooltip')}
                aria-label=${localize(row.onServer ? 'ui.saveload.delete_plan' : 'ui.saveload.delete_local_plan', { name })}
              >
                <span aria-hidden="true">🗑️</span>
              </button>
            ` : nothing}
          </div>
        </div>

        ${loadWarning ? html`
          <div class="banner banner-warning" role="alert">
            <span aria-hidden="true">⚠️</span>
            <div class="banner-text">
              <div>${loadWarning}</div>
              <div class="banner-actions">
                <button type="button" class="btn-danger" @click=${() => this.requestLoad(row)}>${localize('ui.saveload.open_anyway')}</button>
                <button type="button" class="btn-link" @click=${() => this.pendingLoadId = null}>${localize('ui.common.cancel')}</button>
              </div>
            </div>
          </div>
        ` : nothing}

        ${confirmDelete ? html`
          <div class="banner banner-error" role="alert">
            <span aria-hidden="true">🗑️</span>
            <div class="banner-text">
              <div>${deleteQuestion}</div>
              <div class="banner-actions">
                <button type="button" class="btn-danger" ?disabled=${isDeleting} @click=${() => this.confirmDelete(row)}>
                  ${localize(isDeleting ? 'ui.saveload.deleting' : 'ui.saveload.delete')}
                </button>
                <button type="button" class="btn-link" ?disabled=${isDeleting} @click=${() => this.pendingDeleteId = null}>${localize('ui.common.cancel')}</button>
              </div>
            </div>
          </div>
        ` : nothing}
      </li>
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
          type="search"
          class="form-input"
          .value=${this.searchQuery}
          @input=${(e: Event) => this.searchQuery = (e.target as HTMLInputElement).value}
          placeholder=${localize('ui.saveload.search_placeholder')}
          aria-label=${localize('ui.saveload.search')}
        />
        <button
          type="button"
          class="btn-secondary"
          ?disabled=${this.listState === 'loading'}
          @click=${() => this.refreshList()}
          title=${localize('ui.saveload.refresh')}
          aria-label=${localize('ui.saveload.refresh')}
        >
          <span aria-hidden="true">🔄</span>
        </button>
      </div>

      ${this.listError ? html`
        <div class="banner banner-error" role="alert">
          <span aria-hidden="true">⚠️</span>
          <div class="banner-text">
            <div>${localize('ui.saveload.list_error', { error: this.listError })}</div>
            <div class="banner-actions">
              <button type="button" class="btn-link" @click=${() => this.refreshList()}>${localize('ui.saveload.retry')}</button>
            </div>
          </div>
        </div>
      ` : nothing}

      ${this.actionError ? html`
        <div class="banner banner-error" role="alert">
          <span aria-hidden="true">⚠️</span>
          <span class="banner-text">${this.actionError}</span>
        </div>
      ` : nothing}

      ${this.listState === 'loading' ? html`
        <div class="empty-state" role="status">
          <span><span aria-hidden="true">⏳</span> ${localize('ui.saveload.loading')}</span>
        </div>
      ` : filteredRows.length === 0 ? html`
        <div class="empty-state" role="status">
          <span class="empty-state-icon" aria-hidden="true">📂</span>
          <span>${localize(q ? 'ui.saveload.no_match' : 'ui.saveload.no_plans')}</span>
          ${!q && !this.isReadOnly ? html`
            <button type="button" class="btn-primary" style="margin-top: 6px;" @click=${() => this.selectTab('save')}>
              <span aria-hidden="true">💾</span>
              <span>${localize('ui.saveload.save_current')}</span>
            </button>
          ` : nothing}
        </div>
      ` : html`
        <span class="visually-hidden" role="status">${localizeCount('ui.saveload.results', filteredRows.length)}</span>
        <ul class="projects-list" aria-label=${localize('ui.saveload.list_label')}>
          ${filteredRows.map(row => this.renderRow(row))}
        </ul>
      `}
    `;
  }

  private renderTab(tab: Tab, icon: string, label: TemplateResult | string) {
    const selected = this.activeTab === tab;
    return html`
      <button
        type="button"
        id="save-load-tab-${tab}"
        class="tab-btn ${selected ? 'active' : ''}"
        role="tab"
        aria-selected=${selected ? 'true' : 'false'}
        aria-controls=${TAB_PANEL_ID}
        tabindex=${selected ? 0 : -1}
        @click=${() => this.selectTab(tab)}
      >
        <span aria-hidden="true">${icon}</span>
        <span>${label}</span>
      </button>
    `;
  }

  render() {
    const readOnly = this.isReadOnly;
    const saving = this.activeTab === 'save';
    const loadTabLabel = this.listState === 'ready'
      ? localize('ui.saveload.tab_load_count', { count: formatNumber(this.rows.length) })
      : localize('ui.saveload.tab_load');

    return html`
      <div
        class="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby=${TITLE_ID}
        aria-describedby="save-load-subtitle"
        @click=${(e: Event) => e.stopPropagation()}
      >
        <!-- Header -->
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon" aria-hidden="true">${saving ? '💾' : '📂'}</span>
            <div>
              <h2 class="modal-title" id=${TITLE_ID}>
                ${localize(saving ? 'ui.saveload.title_save' : 'ui.saveload.title_load')}
              </h2>
              <p class="modal-subtitle" id="save-load-subtitle">
                ${localize(saving ? 'ui.saveload.subtitle_save' : 'ui.saveload.subtitle_load')}
              </p>
            </div>
          </div>
          <button
            type="button"
            class="btn-close"
            @click=${this.handleClose}
            title=${localize('ui.common.close')}
            aria-label=${localize('ui.common.close')}
          ><span aria-hidden="true">✕</span></button>
        </div>

        <!-- Onglets Navigation -->
        <div class="tabs-nav" role="tablist" aria-labelledby=${TITLE_ID} @keydown=${this.handleTabKeyDown}>
          ${this.renderTab('save', '💾', localize('ui.saveload.tab_save'))}
          ${this.renderTab('load', '📂', loadTabLabel)}
        </div>

        <!-- Corps du modal -->
        <div class="modal-body" id=${TAB_PANEL_ID} role="tabpanel" aria-labelledby="save-load-tab-${this.activeTab}">
          ${saving ? this.renderSaveTab() : this.renderLoadTab()}
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button type="button" class="btn-secondary" @click=${this.handleClose}>
            ${localize(saving && !readOnly ? 'ui.common.cancel' : 'ui.common.close')}
          </button>
          ${saving && !readOnly ? html`
            <button
              type="button"
              class="btn-secondary"
              @click=${() => this.handleSave(true)}
              title=${localize('ui.saveload.save_as_tooltip')}
            >
              <span aria-hidden="true">📑</span> ${localize('ui.saveload.save_as')}
            </button>
            <button type="button" class="btn-primary" @click=${() => this.handleSave(false)}>
              <span aria-hidden="true">💾</span>
              <span>${localize('ui.saveload.save')}</span>
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
