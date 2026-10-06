import { LitElement, html, css, nothing, PropertyValues, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import './components/canvas-view';
import { HomeArchitectProject } from './core/types';
import { defineElement } from './core/define';
import { DEFAULT_LEVEL } from './core/levels';
import { PROJECT_ID_PATTERN, clearRedundantCustomNames } from './core/project-model';
import {
  ProjectSummary, fetchBackgroundObjectUrl, getProject, listProjects, releaseBackgroundObjectUrl,
  subscribeProject, toHaApiError
} from './core/ha-api';
import { LANGUAGE_CHANGED_KEY, LocalizeController, formatNumber, localize, setLanguage } from './i18n/index';
import './i18n/locales/card';
import { applyColorScheme, uiThemeStyles } from './styles/theme.styles';

/** Palette du dessin : 'auto' suit le mode sombre de Home Assistant (constat F56). */
export type CardTheme = 'auto' | 'light' | 'dark';

/** Configuration YAML de la carte, telle que saisie dans le tableau de bord. */
export interface HomeArchitectCardConfig {
  type: string;
  project_id?: string;
  title?: string;
  height?: string | number;
  view_mode?: '2d' | '3d';
  show_header?: boolean;
  show_dimensions?: boolean;
  show_heatmap?: boolean;
  /** Commandes de la vue (zoom, rotation, 2D/3D) dessinées sur le plan (constat F126). */
  show_controls?: boolean;
  /** Animations des entités (mouvement, ventilateurs, lecture) ; false pour les tablettes murales (constat F133). */
  animations?: boolean;
  theme?: CardTheme;
  /** Clés gérées par Home Assistant ou des modules tiers (grid_options, card_mod…), conservées telles quelles. */
  [key: string]: unknown;
}

/** Configuration validée par setConfig. */
export interface NormalizedCardConfig {
  /** Absent : ancien comportement (plan 'rdc'), conservé pour les cartes créées sans project_id. */
  projectId?: string;
  title?: string;
  /** Longueur CSS valide (un nombre est converti en px). */
  height?: string;
  viewMode: '2d' | '3d';
  showHeader: boolean;
  showDimensions: boolean;
  /** Absent : préférence enregistrée dans le plan. */
  showHeatmap?: boolean;
  showControls: boolean;
  animations: boolean;
  theme: CardTheme;
}

export const DEFAULT_CARD_HEIGHT_PX = 480;
const DOCUMENTATION_URL = 'https://github.com/SocrateMobile/home-architect#readme';
/** Variable CSS de la hauteur (préfixée : une variable générique héritée d'un parent s'appliquerait). */
const HEIGHT_VAR = '--home-architect-card-height';
/** Grille de la vue « sections » : lignes de 56 px séparées de 8 px. */
const GRID_ROW_HEIGHT_PX = 56;
const GRID_ROW_GAP_PX = 8;
const MIN_GRID_ROWS = 4;
/** Délais des nouveaux essais après une erreur de chargement. */
const RETRY_DELAYS_MS = [5_000, 15_000, 30_000, 60_000];
/** Nombre de plans listés dans le message « plan introuvable ». */
const MAX_LISTED_PROJECTS = 8;

const CARD_THEMES: readonly CardTheme[] = ['auto', 'light', 'dark'];

const LENGTH_WITH_UNIT = /^(\d+(?:\.\d+)?|\.\d+)([a-z%]+)$/i;
const PLAIN_NUMBER = /^(\d+(?:\.\d+)?|\.\d+)$/;

/**
 * Langue des textes produits sans hass (erreurs de setConfig, appelé avant que HA ne transmette hass ;
 * description du sélecteur de cartes) : celle de l'interface Home Assistant (hass de l'élément racine
 * <home-assistant>), sinon l'attribut lang de la page, que HA aligne sur hass.language une fois
 * l'interface chargée. `browserFallback` : à défaut, langue du navigateur (évaluation du module,
 * qui peut précéder l'initialisation de l'interface). Corrigée par willUpdate dès que hass arrive.
 */
function syncLanguageWithoutHass(browserFallback = false): void {
  if (typeof document === 'undefined') return;
  const root = document.querySelector('home-assistant') as { hass?: { language?: unknown } } | null;
  const rootLanguage = root?.hass?.language;
  const language = typeof rootLanguage === 'string' && rootLanguage !== ''
    ? rootLanguage
    : document.documentElement.lang || (browserFallback && typeof navigator !== 'undefined' ? navigator.language : '');
  if (language) setLanguage(language);
}

syncLanguageWithoutHass(true);

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/** Valeur YAML lisible dans un message d'erreur. */
function displayValue(value: unknown): string {
  return typeof value === 'string' ? value : JSON.stringify(value) ?? typeof value;
}

function isCssLength(text: string): boolean {
  // Longueur ou fonction de calcul uniquement : auto, inherit, fit-content… effondreraient la carte.
  if (!/^(?:[\d.]|(?:calc|min|max|clamp|var)\()/i.test(text)) return false;
  const length = LENGTH_WITH_UNIT.exec(text);
  if (length && Number(length[1]) <= 0) return false;
  if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') return CSS.supports('height', text);
  return length !== null && /^(px|r?em|%|[sdl]?v(h|w|min|max)|ch|ex|cm|mm|in|pt|pc)$/i.test(length[2]);
}

/**
 * Valide l'option `height` : nombre (ou chaîne numérique) de pixels, ou longueur CSS (480px, 60vh,
 * calc(100vh - 200px)…). Renvoie undefined si l'option est absente ; lève une Error explicite sinon.
 */
export function parseCardHeight(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'number') {
    if (Number.isFinite(value) && value > 0) return `${value}px`;
    throw new Error(localize('card.config.height_number_invalid', { value: String(value) }));
  }
  if (typeof value !== 'string') {
    throw new Error(localize('card.config.height_type'));
  }
  const text = value.trim();
  if (text === '') return undefined;
  if (PLAIN_NUMBER.test(text)) {
    // « 0 » est une longueur CSS valide (CSS.supports l'accepte) mais effondrerait la carte.
    if (Number(text) > 0) return `${Number(text)}px`;
    throw new Error(localize('card.config.height_not_positive', { value: text }));
  }
  if (isCssLength(text)) return text;
  throw new Error(localize('card.config.height_invalid', { value: text }));
}

function parseProjectId(value: unknown): string | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  const id = typeof value === 'number' && Number.isInteger(value) ? String(value) : value;
  if (typeof id !== 'string' || !PROJECT_ID_PATTERN.test(id.trim())) {
    throw new Error(localize('card.config.project_id_invalid', { value: displayValue(value) }));
  }
  return id.trim();
}

function parseTitle(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'number') return String(value);
  if (typeof value !== 'string') throw new Error(localize('card.config.title_type'));
  return value.trim() === '' ? undefined : value;
}

function parseViewMode(value: unknown): '2d' | '3d' {
  if (value === undefined || value === null || value === '') return '2d';
  const mode = typeof value === 'string' ? value.trim().toLowerCase() : value;
  if (mode === '2d' || mode === '3d') return mode;
  throw new Error(localize('card.config.view_mode_invalid', { value: displayValue(value) }));
}

function parseTheme(value: unknown): CardTheme {
  if (value === undefined || value === null || value === '') return 'auto';
  const theme = typeof value === 'string' ? value.trim().toLowerCase() : value;
  const known = CARD_THEMES.find(t => t === theme);
  if (known) return known;
  throw new Error(localize('card.config.theme_invalid', { value: displayValue(value) }));
}

function parseBoolean(config: Record<string, unknown>, key: string): boolean | undefined {
  const value = config[key];
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'boolean') return value;
  throw new Error(localize('card.config.boolean_type', { key }));
}

/** Valide la configuration YAML de la carte ; lève une Error lisible (affichée par HA) si elle est invalide. */
export function normalizeCardConfig(raw: unknown): NormalizedCardConfig {
  if (!isRecord(raw)) throw new Error(localize('card.config.not_object'));
  return {
    projectId: parseProjectId(raw.project_id),
    title: parseTitle(raw.title),
    height: parseCardHeight(raw.height),
    viewMode: parseViewMode(raw.view_mode),
    showHeader: parseBoolean(raw, 'show_header') ?? true,
    showDimensions: parseBoolean(raw, 'show_dimensions') ?? false,
    showHeatmap: parseBoolean(raw, 'show_heatmap'),
    showControls: parseBoolean(raw, 'show_controls') ?? true,
    animations: parseBoolean(raw, 'animations') ?? true,
    theme: parseTheme(raw.theme),
  };
}

/** Hauteur approximative en pixels (taille de carte pour la mise en page) ; défaut si non mesurable. */
function estimateHeightPx(height: string | undefined): number {
  const match = height ? LENGTH_WITH_UNIT.exec(height) : null;
  if (!match) return DEFAULT_CARD_HEIGHT_PX;
  const value = Number(match[1]);
  switch (match[2].toLowerCase()) {
    case 'px':
      return value;
    case 'em':
    case 'rem':
      return value * 16;
    case 'vh':
    case 'svh':
    case 'dvh':
    case 'lvh':
      return (value / 100) * (window.innerHeight || 800);
    default:
      return DEFAULT_CARD_HEIGHT_PX;
  }
}

type LoadStatus = 'loading' | 'loaded' | 'not-found' | 'deleted' | 'error';

interface ProjectSubscription {
  projectId: string;
  unsubscribe?: () => void;
}

/** Image de fond retenue dans le cache partagé de ha-api (une libération par récupération réussie). */
interface BackgroundRequest {
  assetId: string;
  acquired: boolean;
  active: boolean;
}

export class HomeArchitectCard extends LitElement {
  static styles = [uiThemeStyles, css`
    :host {
      display: block;
    }

    /* Vue « sections » : la grille fixe la hauteur (lignes réglables dans l'interface). */
    :host([layout='grid']) {
      height: 100%;
    }

    ha-card {
      display: flex;
      flex-direction: column;
      /* Variable HEIGHT_VAR (option height), défaut DEFAULT_CARD_HEIGHT_PX. */
      height: var(--home-architect-card-height, 480px);
      overflow: hidden;
      position: relative;
      box-sizing: border-box;
    }

    :host([layout='grid']) ha-card {
      height: 100%;
      min-height: 200px;
    }

    /* Repli hors de Home Assistant (ha-card non défini) : mêmes variables que ha-card, puis jetons du thème. */
    ha-card:not(:defined) {
      background: var(--ha-card-background, var(--arch-ui-surface));
      border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--arch-ui-border));
      border-radius: var(--arch-ui-radius);
      box-shadow: var(--ha-card-box-shadow, none);
      color: var(--arch-ui-text);
      font-family: var(--arch-ui-font);
    }

    .card-header {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      min-height: 48px;
      padding-block: 6px;
      padding-inline: 16px 12px;
      box-sizing: border-box;
      border-bottom: 1px solid var(--arch-ui-border);
    }

    .card-title {
      margin: 0;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 1.1rem;
      font-weight: 500;
      line-height: 1.4;
      color: var(--ha-card-header-color, var(--arch-ui-text));
    }

    .view-toggle {
      flex: none;
      display: inline-flex;
      border: 1px solid var(--arch-ui-border);
      border-radius: 18px;
      overflow: hidden;
    }

    .view-toggle button {
      min-width: 44px;
      min-height: 32px;
      padding: 0 12px;
      border: none;
      background: transparent;
      color: var(--arch-ui-text-muted);
      font: inherit;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
    }

    /* Anneau intérieur : le conteneur arrondi (overflow: hidden) rognerait un anneau extérieur. */
    .view-toggle button:focus-visible {
      outline: 2px solid var(--arch-ui-accent);
      outline-offset: -2px;
      box-shadow: none;
    }

    /* Vue active : texte principal sur fond secondaire (contraste suffisant quelle que soit la couleur
       primaire du thème), soulignée par la couleur primaire. Déclarée après :focus-visible pour garder
       le soulignement sur le bouton actif ciblé au clavier. */
    .view-toggle button[aria-pressed='true'] {
      background: var(--arch-ui-surface-2);
      color: var(--arch-ui-text);
      font-weight: 700;
      box-shadow: inset 0 -3px 0 var(--arch-ui-accent);
    }

    .content {
      flex: 1 1 auto;
      min-height: 0;
      position: relative;
    }

    home-architect-canvas {
      display: block;
      width: 100%;
      height: 100%;
    }

    .message {
      box-sizing: border-box;
      height: 100%;
      overflow: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;
      padding: 16px;
      color: var(--arch-ui-text);
    }

    .message p,
    .message ul {
      margin: 0;
    }

    .message ul {
      padding-inline-start: 20px;
    }

    .message code {
      font-family: var(--ha-font-family-code, var(--code-font-family, monospace));
    }

    .loading {
      align-items: center;
      flex-direction: row;
      justify-content: center;
      color: var(--arch-ui-text-muted);
    }

    .spinner {
      width: 18px;
      height: 18px;
      border: 2px solid var(--arch-ui-border);
      border-top-color: var(--arch-ui-accent);
      border-radius: 50%;
      animation: spin 0.9s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .spinner {
        animation: none;
      }
    }

    /* Repli de ha-alert hors de Home Assistant. */
    ha-alert:not(:defined) {
      display: block;
      padding: 8px 12px;
      border-inline-start: 4px solid var(--arch-ui-warning);
      border-radius: 4px;
      background: var(--arch-ui-surface-2);
      color: var(--arch-ui-text);
    }

    ha-alert[alert-type='error']:not(:defined) {
      border-inline-start-color: var(--arch-ui-danger);
    }

    .stale {
      position: absolute;
      top: 8px;
      left: 8px;
      right: 8px;
      z-index: 1;
    }

    /* Texte principal (et non la couleur primaire, souvent trop claire pour du texte) ; bordure primaire. */
    .retry {
      align-self: flex-start;
      min-height: 36px;
      padding: 0 16px;
      border: 1px solid var(--arch-ui-accent);
      border-radius: 18px;
      background: transparent;
      color: var(--arch-ui-text);
      font: inherit;
      font-weight: 500;
      cursor: pointer;
    }

    .retry:hover {
      background: var(--arch-ui-surface-2);
    }

    .retry:focus-visible {
      outline: 2px solid var(--arch-ui-accent);
      outline-offset: 2px;
      box-shadow: none;
    }
  `];

  @property({ attribute: false })
  public hass?: any;

  /** Disposition fournie par HA ('grid' dans la vue « sections »). */
  @property({ type: String, reflect: true })
  public layout?: string;

  @state()
  private _config?: NormalizedCardConfig;

  @state()
  private _project?: HomeArchitectProject;

  @state()
  private _status: LoadStatus = 'loading';

  /** Erreur bloquante (aucun plan affiché). */
  @state()
  private _error?: string;

  /** Échec d'actualisation alors qu'une version du plan reste affichée. */
  @state()
  private _warning?: string;

  /** Plans proposés quand le plan configuré est introuvable (undefined : liste inconnue). */
  @state()
  private _available?: ProjectSummary[];

  @state()
  private _backgroundSrc?: string;

  @state()
  private _is3DMode = false;

  /** Plan dont le dernier chargement a été demandé (undefined : à recharger). */
  private _requestedId?: string;
  /** Numéro du chargement en cours : les réponses d'un chargement dépassé sont ignorées. */
  private _loadSeq = 0;
  private _subscription?: ProjectSubscription;
  /** Ancien backend sans subscribe_project : pas de mise à jour en direct (lu par le message « introuvable »). */
  @state()
  private _liveUnsupported = false;
  private _background?: BackgroundRequest;
  private _retryTimer?: number;
  private _retryCount = 0;
  private _entityIdsSource?: HomeArchitectProject;
  private _entityIdsCache: string[] = [];
  /** Nouveau rendu au changement de langue (clé LANGUAGE_CHANGED_KEY). */
  private readonly _i18n = new LocalizeController(this);

  /** Configuration proposée par le sélecteur de cartes : le premier plan enregistré. */
  public static async getStubConfig(hass: unknown): Promise<Partial<HomeArchitectCardConfig>> {
    try {
      const projects = await listProjects(hass);
      return projects.length > 0 ? { project_id: projects[0].id } : {};
    } catch {
      return {};
    }
  }

  /** Éditeur visuel, chargé à la demande (absent du code évalué sur chaque tableau de bord). */
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./components/card-editor');
    const editor = document.createElement('home-architect-card-editor');
    // Le validateur est transmis plutôt qu'importé par l'éditeur : ce module est l'entrée du bundle
    // (chargée avec ?v=<version>) ; un import statique depuis le chunk de l'éditeur la réévaluerait
    // sous l'URL sans ?v (seconde copie, voire ancienne version servie par le cache HTTP).
    editor.parseHeight = parseCardHeight;
    return editor;
  }

  public setConfig(config: HomeArchitectCardConfig): void {
    // HA appelle setConfig avant de transmettre hass : les erreurs levées ici suivent sa langue.
    if (!this.hass) syncLanguageWithoutHass();
    const next = normalizeCardConfig(config);
    const previous = this._config;
    this._config = next;
    // La vue n'est réinitialisée que si l'option change (pas à chaque édition du titre).
    if (!previous || previous.viewMode !== next.viewMode) this._is3DMode = next.viewMode === '3d';
    if (next.height) this.style.setProperty(HEIGHT_VAR, next.height);
    else this.style.removeProperty(HEIGHT_VAR);
    if (previous && (previous.projectId ?? DEFAULT_LEVEL) !== (next.projectId ?? DEFAULT_LEVEL)) this._resetProject();
  }

  /** Hauteur en unités de 50 px (vue en colonnes). */
  public getCardSize(): number {
    return Math.ceil(estimateHeightPx(this._config?.height) / 50);
  }

  /** Taille par défaut dans la vue « sections » (redimensionnable dans l'interface). */
  public getGridOptions(): { columns: number; rows: number; min_rows: number } {
    const heightPx = estimateHeightPx(this._config?.height);
    const rows = Math.ceil((heightPx + GRID_ROW_GAP_PX) / (GRID_ROW_HEIGHT_PX + GRID_ROW_GAP_PX));
    return { columns: 12, rows: Math.max(MIN_GRID_ROWS, rows), min_rows: MIN_GRID_ROWS };
  }

  connectedCallback(): void {
    super.connectedCallback();
    // Réinsertion (changement de vue, mode édition) : les sauvegardes faites entre-temps n'ont
    // pas été reçues, le plan est rechargé ; l'image de fond est reprise sans attendre.
    if (this.hasUpdated) {
      this._syncBackground();
      this._sync();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._loadSeq++;
    this._requestedId = undefined;
    this._clearRetry();
    this._unsubscribe();
    this._releaseBackground();
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has(LANGUAGE_CHANGED_KEY)) return true;
    if (changed.size !== 1 || !changed.has('hass')) return true;
    const oldHass: any = changed.get('hass');
    const hass = this.hass;
    if (!oldHass || !hass) return true;
    if (
      oldHass.connected !== hass.connected ||
      oldHass.themes !== hass.themes ||
      oldHass.language !== hass.language ||
      oldHass.locale !== hass.locale ||
      oldHass.user !== hass.user
    ) {
      return true;
    }
    // Les autres entités de HA changent sans cesse : seules celles du plan concernent la carte.
    return this._entityIds.some(id => oldHass.states?.[id] !== hass.states?.[id]);
  }

  protected willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);
    if (!changed.has('hass') && !changed.has('_config')) return;
    const oldHass: any = changed.get('hass');
    if (changed.has('hass') && this.hass) {
      // Racine de l'interface sur le tableau de bord : langue et palette suivent Home Assistant.
      if (oldHass?.language !== this.hass.language) setLanguage(this.hass.language);
      if (oldHass?.themes !== this.hass.themes) applyColorScheme(this, this.hass);
    }
    const reconnected = changed.has('hass') && oldHass?.connected === false && this.hass?.connected !== false;
    // Un abonnement actif est renouvelé par home-assistant-js-websocket : ne pas appeler ici son
    // désabonnement (il viserait l'ancien numéro de commande, réattribué sur la nouvelle connexion).
    if (reconnected) this._liveUnsupported = false; // le backend a pu être mis à jour entre-temps
    this._sync({ reload: reconnected });
  }

  /** Entités affichées par le plan (mémorisées par version du projet). */
  private get _entityIds(): string[] {
    const project = this._project;
    if (project !== this._entityIdsSource) {
      this._entityIdsSource = project;
      const ids = new Set<string>();
      for (const binding of project?.bindings ?? []) ids.add(binding.entityId);
      for (const opening of project?.openings ?? []) {
        if (opening.entityId) ids.add(opening.entityId);
      }
      this._entityIdsCache = [...ids];
    }
    return this._entityIdsCache;
  }

  private get _projectId(): string {
    return this._config?.projectId ?? DEFAULT_LEVEL;
  }

  /** Assure l'abonnement au plan configuré et son chargement (ou rechargement si `reload`). */
  private _sync(opts: { reload?: boolean } = {}): void {
    if (!this.isConnected || !this.hass || !this._config) return;
    const projectId = this._projectId;
    // Après un échec, l'abonnement n'est retenté qu'au nouvel essai programmé (ou à un rechargement),
    // pas à chaque changement d'état d'une entité du plan (willUpdate).
    const retryPending = this._retryTimer !== undefined && !opts.reload;
    if (this._subscription?.projectId !== projectId && !this._liveUnsupported && !retryPending) {
      void this._subscribe(projectId);
    }
    if (opts.reload || this._requestedId !== projectId) void this._load();
  }

  private _resetProject(): void {
    this._loadSeq++;
    this._requestedId = undefined;
    this._retryCount = 0;
    this._clearRetry();
    this._unsubscribe();
    this._releaseBackground();
    this._project = undefined;
    this._status = 'loading';
    this._error = undefined;
    this._warning = undefined;
    this._available = undefined;
  }

  private async _load(): Promise<void> {
    const hass = this.hass;
    const projectId = this._projectId;
    const seq = ++this._loadSeq;
    this._requestedId = projectId;
    this._clearRetry();
    // Un plan déjà affiché reste visible pendant son actualisation.
    if (this._project?.id !== projectId) this._status = 'loading';
    try {
      const project = await getProject(hass, projectId);
      if (seq !== this._loadSeq) return;
      if (!project) {
        await this._showNotFound(seq);
        return;
      }
      const firstDisplay = this._project?.id !== project.id;
      // Copies figées du friendly_name des anciennes versions : le nom courant est affiché à la place.
      this._project = clearRedundantCustomNames(project, this.hass?.states);
      this._status = 'loaded';
      this._error = undefined;
      this._warning = undefined;
      this._resetRetryIfHealthy();
      this._syncBackground();
      if (firstDisplay) void this._fitWhenRendered();
    } catch (err) {
      if (seq !== this._loadSeq) return;
      const message = toHaApiError(err).message;
      if (this._project?.id === projectId) {
        this._warning = message;
      } else {
        this._status = 'error';
        this._error = message;
      }
      this._scheduleRetry();
    }
  }

  private async _showNotFound(seq: number): Promise<void> {
    this._project = undefined;
    this._releaseBackground();
    this._status = 'not-found';
    this._warning = undefined;
    this._available = undefined;
    this._resetRetryIfHealthy();
    try {
      const projects = await listProjects(this.hass);
      if (seq === this._loadSeq) this._available = projects;
    } catch {
      // La liste n'est qu'une aide : le message reste affiché sans elle.
    }
  }

  private _onProjectEvent(ev: { project_id: string; revision: number; deleted?: boolean }): void {
    if (ev.deleted) {
      this._loadSeq++;
      this._clearRetry();
      this._project = undefined;
      this._releaseBackground();
      this._status = 'deleted';
      this._warning = undefined;
      return;
    }
    // Publication du SVG : même révision, rien à recharger.
    if (this._status === 'loaded' && ev.revision !== 0 && ev.revision === this._project?.revision) return;
    void this._load();
  }

  private async _subscribe(projectId: string): Promise<void> {
    this._unsubscribe();
    const subscription: ProjectSubscription = { projectId };
    this._subscription = subscription;
    try {
      const unsubscribe = await subscribeProject(this.hass, projectId, ev => {
        if (this._subscription === subscription) this._onProjectEvent(ev);
      });
      if (this._subscription !== subscription) {
        unsubscribe();
        return;
      }
      subscription.unsubscribe = unsubscribe;
      this._resetRetryIfHealthy();
    } catch (err) {
      if (this._subscription !== subscription) return;
      this._subscription = undefined;
      const error = toHaApiError(err);
      if (error.code === 'unknown_command') {
        this._liveUnsupported = true;
        this._resetRetryIfHealthy();
        return;
      }
      console.warn('[home-architect] Abonnement aux mises à jour du plan impossible :', error);
      this._scheduleRetry();
    }
  }

  private _unsubscribe(): void {
    const subscription = this._subscription;
    this._subscription = undefined;
    subscription?.unsubscribe?.();
  }

  private _scheduleRetry(): void {
    if (this._retryTimer !== undefined || !this.isConnected) return;
    const delay = RETRY_DELAYS_MS[Math.min(this._retryCount, RETRY_DELAYS_MS.length - 1)];
    this._retryCount++;
    this._retryTimer = window.setTimeout(() => {
      this._retryTimer = undefined;
      this._sync({ reload: true });
    }, delay);
  }

  /**
   * Remet à zéro le délai des nouveaux essais seulement quand le plan ET l'abonnement sont à jour :
   * sinon un abonnement en échec permanent, relancé avec un chargement qui réussit, serait
   * retenté toutes les 5 s au lieu de suivre le délai croissant.
   */
  private _resetRetryIfHealthy(): void {
    const settled = this._status === 'loaded' || this._status === 'not-found' || this._status === 'deleted';
    const live = this._liveUnsupported || this._subscription?.unsubscribe !== undefined;
    if (settled && this._warning === undefined && live) this._retryCount = 0;
  }

  private _clearRetry(): void {
    if (this._retryTimer === undefined) return;
    window.clearTimeout(this._retryTimer);
    this._retryTimer = undefined;
  }

  /** Résout l'image de fond du plan (asset serveur) en URL objet ; libère la précédente au changement. */
  private _syncBackground(): void {
    const project = this._project;
    const background = project?.background;
    const assetId = project && this.isConnected && background?.visible !== false ? background?.assetId : undefined;
    if (assetId === this._background?.assetId) return;
    this._releaseBackground();
    if (!project || !assetId) return;
    const request: BackgroundRequest = { assetId, acquired: false, active: true };
    this._background = request;
    fetchBackgroundObjectUrl(this.hass, project.id, assetId).then(
      url => {
        request.acquired = true;
        if (request.active) this._backgroundSrc = url;
        else releaseBackgroundObjectUrl(assetId);
      },
      err => {
        if (!request.active) return;
        this._background = undefined; // nouvel essai au prochain chargement du plan
        console.warn('[home-architect] Image de fond du plan indisponible :', err);
      }
    );
  }

  private _releaseBackground(): void {
    const request = this._background;
    this._background = undefined;
    this._backgroundSrc = undefined;
    if (!request) return;
    request.active = false;
    if (request.acquired) releaseBackgroundObjectUrl(request.assetId);
  }

  /** Cadre le plan dès son premier affichage (le canevas ne connaît pas l'ordre de chargement). */
  private async _fitWhenRendered(): Promise<void> {
    await this.updateComplete;
    const canvas = this.renderRoot.querySelector('home-architect-canvas');
    if (!canvas) return;
    await canvas.updateComplete;
    if (canvas.isConnected && canvas.getBoundingClientRect().width > 0) canvas.fitToScreen();
  }

  private _setViewMode(is3D: boolean): void {
    this._is3DMode = is3D;
  }

  /** Bascule demandée par le bouton 2D/3D du canevas (la carte reste propriétaire de l'état). */
  private _onToggle3d(e: CustomEvent<{ is3DMode?: boolean }>): void {
    this._is3DMode = typeof e.detail?.is3DMode === 'boolean' ? e.detail.is3DMode : !this._is3DMode;
  }

  private _retry(): void {
    this._retryCount = 0;
    this._sync({ reload: true });
  }

  render() {
    const config = this._config;
    if (!config) return nothing;
    const project = this._project;
    const title = config.title ?? project?.name;
    return html`
      <ha-card>
        ${config.showHeader ? this._renderHeader(title, !!project) : nothing}
        <div class="content">
          ${project ? this._renderCanvas(project, config) : this._renderMessage()}
          ${project && this._warning
            ? html`<ha-alert class="stale" alert-type="warning">${localize('card.stale', { error: this._warning })}</ha-alert>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  private _renderHeader(title: string | undefined, showToggle: boolean): TemplateResult {
    const label2d = localize('card.header.view_2d');
    const label3d = localize('card.header.view_3d');
    return html`
      <div class="card-header">
        <h2 class="card-title">${title ?? 'Home Architect'}</h2>
        ${showToggle ? html`
          <div class="view-toggle" role="group" aria-label=${localize('card.header.view_mode')}>
            <button type="button" aria-pressed=${String(!this._is3DMode)} aria-label=${label2d} title=${label2d} @click=${() => this._setViewMode(false)}>2D</button>
            <button type="button" aria-pressed=${String(this._is3DMode)} aria-label=${label3d} title=${label3d} @click=${() => this._setViewMode(true)}>3D</button>
          </div>
        ` : nothing}
      </div>
    `;
  }

  private _renderCanvas(project: HomeArchitectProject, config: NormalizedCardConfig): TemplateResult {
    // hass-more-info est émis par le canevas (bubbles + composed) : la carte ne le relaie pas.
    return html`
      <home-architect-canvas
        .hass=${this.hass}
        .project=${project}
        .activeTool=${'select'}
        .is3DMode=${this._is3DMode}
        .isDashboardMode=${true}
        .interactive=${false}
        .readOnly=${true}
        .showDimensions=${config.showDimensions}
        .showThermalHeatmap=${config.showHeatmap ?? project.showThermalHeatmap ?? false}
        .showControls=${config.showControls}
        .animations=${config.animations}
        .theme=${config.theme}
        .backgroundSrc=${this._backgroundSrc}
        @toggle-3d=${this._onToggle3d}
      ></home-architect-canvas>
    `;
  }

  private _renderMessage(): TemplateResult {
    const projectId = this._projectId;
    switch (this._status) {
      case 'not-found':
        return this._renderNotFound(projectId);
      case 'deleted':
        return html`
          <div class="message">
            <ha-alert alert-type="warning">${localize('card.deleted', { id: projectId })}</ha-alert>
            <p>${localize('card.choose_other')}</p>
          </div>
        `;
      case 'error':
        return html`
          <div class="message">
            <ha-alert alert-type="error">${localize('card.load_error', { id: projectId, error: this._error ?? '' })}</ha-alert>
            <p>${localize('card.retry_soon')}</p>
            <button type="button" class="retry" @click=${this._retry}>${localize('card.retry')}</button>
          </div>
        `;
      default:
        return html`
          <div class="message loading" role="status">
            <span class="spinner" aria-hidden="true"></span>
            <span>${localize('card.loading')}</span>
          </div>
        `;
    }
  }

  private _renderNotFound(projectId: string): TemplateResult {
    const explicit = this._config?.projectId !== undefined;
    const available = this._available;
    const refresh = localize(this._liveUnsupported ? 'card.not_found.refresh_reload' : 'card.not_found.refresh_live');
    return html`
      <div class="message">
        <ha-alert alert-type="warning">
          ${explicit ? localize('card.not_found.title', { id: projectId }) : localize('card.not_found.none_selected')}
        </ha-alert>
        <p>
          ${explicit ? localize('card.not_found.hint', { refresh }) : localize('card.not_found.choose')}
        </p>
        ${available === undefined ? nothing : available.length === 0
          ? html`<p>${localize('card.not_found.no_projects')}</p>`
          : html`
            <p>${localize('card.not_found.available')}</p>
            <ul>
              ${available.slice(0, MAX_LISTED_PROJECTS).map(p => html`<li><code>${p.id}</code> — ${p.name}</li>`)}
            </ul>
            ${available.length > MAX_LISTED_PROJECTS
              ? html`<p>${localize('card.not_found.more', { count: formatNumber(available.length - MAX_LISTED_PROJECTS) })}</p>`
              : nothing}
          `}
      </div>
    `;
  }
}

defineElement('home-architect-card', HomeArchitectCard);

interface CustomCardEntry {
  type: string;
  name: string;
  description?: string;
  preview?: boolean;
  documentationURL?: string;
}

declare global {
  interface Window {
    customCards?: CustomCardEntry[];
  }
  interface HTMLElementTagNameMap {
    'home-architect-card': HomeArchitectCard;
  }
}

// Sélecteur de cartes de Lovelace. Le bundle peut être évalué deux fois (page restée ouverte
// pendant une mise à jour) : la carte n'est déclarée qu'une fois. La description est lue par le
// sélecteur à son ouverture : l'accesseur la traduit dans la langue de l'interface à ce moment
// (aucune carte Home Architect n'a forcément encore reçu hass).
const customCards = (window.customCards ??= []);
if (!customCards.some(card => card?.type === 'home-architect-card')) {
  customCards.push({
    type: 'home-architect-card',
    name: 'Home Architect Card',
    get description() {
      syncLanguageWithoutHass();
      return localize('card.picker.description');
    },
    preview: true,
    documentationURL: DOCUMENTATION_URL,
  });
}
