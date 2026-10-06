import { LitElement, html, css, PropertyValues, TemplateResult } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { ExportFrame, HomeArchitectProject, PublishInfo } from '../core/types';
import { SvgExporter, SvgExportOptions, DEFAULT_EXPORT_BACKGROUND } from '../core/svg-exporter';
import { LovelaceGenerator } from '../core/lovelace-generator';
import { defineElement } from '../core/define';
import { getEventTarget } from '../core/keyboard';
import { HaApiError, PayloadTooLargeError, fetchBackgroundBlob, isAdmin, publishSvg, unpublish } from '../core/ha-api';
import { MAX_PUBLISH_BYTES, legacyCategory, normalizeProject, stripServerFields } from '../core/project-model';
import { blobToDataUrl, dataUrlToBlob, triggerDownload } from '../core/image-utils';
import { LANGUAGE_CHANGED_KEY, LocalizeController, formatNumber, getLanguage, localize } from '../i18n/index';
import '../i18n/locales/export';
import { applyColorScheme, uiThemeStyles } from '../styles/theme.styles';

type ExportTab = 'picture_elements' | 'custom_card' | 'raw_files';
type BusyAction = 'publish' | 'unpublish' | 'svg' | 'backup';
type ConfirmAction = 'publish' | 'unpublish' | 'reframe';
type CopyTarget = 'picture' | 'card';
type NoticeKind = 'success' | 'error' | 'info';
type I18nParams = Record<string, string | number>;

/** Onglets, dans l'ordre d'affichage (navigation aux flèches). */
const TABS: ReadonlyArray<{ id: ExportTab; icon: string; labelKey: string }> = [
  { id: 'picture_elements', icon: '🖼️', labelKey: 'export.tab.picture_elements' },
  { id: 'custom_card', icon: '🧊', labelKey: 'export.tab.custom_card' },
  { id: 'raw_files', icon: '💾', labelKey: 'export.tab.raw_files' },
];

/** Options de rendu communes au SVG publié et au SVG téléchargé (seule l'image de fond varie). */
const SVG_RENDER_OPTIONS: SvgExportOptions = {
  includeRooms: true,
  includeWalls: true,
  includeOpenings: true,
  includeFurniture: true,
  includeRoomLabels: true,
  includeEntityMarkers: false,
  backgroundColor: DEFAULT_EXPORT_BACKGROUND
};

const DATA_IMAGE_URL = /^data:image\//i;
const NOTICE_DURATION_MS = 3500;
/** Éléments susceptibles de recevoir le focus (piège de focus de la fenêtre). */
const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]';
/** Segments enrichis d'une traduction : **gras** ou `code`. */
const RICH_SEGMENT = /(\*\*[^*]+\*\*|`[^`]+`)/;

/** Nom de fichier sûr dérivé du nom du plan (sans accents ni séparateurs de chemin). */
function fileSlug(name: string | undefined, fallback: string): string {
  const slug = (name || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 60);
  return slug || fallback;
}

/**
 * Traduction mise en forme : `**texte**` devient <strong> et `` `texte` `` devient <code>.
 * Le résultat ne contient que des nœuds texte (jamais de HTML interprété).
 */
function richText(key: string, params?: I18nParams): Array<string | TemplateResult> {
  return localize(key, params)
    .split(RICH_SEGMENT)
    .filter(part => part !== '')
    .map(part => {
      if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) return html`<strong>${part.slice(2, -2)}</strong>`;
      if (part.length > 2 && part.startsWith('`') && part.endsWith('`')) return html`<code>${part.slice(1, -1)}</code>`;
      return part;
    });
}

/** Clé de pluriel (`<base>_one` / `<base>_other`) selon les règles de la langue courante. */
function pluralKey(base: string, count: number): string {
  let rule = 'other';
  try {
    rule = new Intl.PluralRules(getLanguage()).select(count);
  } catch {
    // Intl.PluralRules indisponible : forme plurielle.
  }
  return `${base}_${rule === 'one' ? 'one' : 'other'}`;
}

/** Taille en mégaoctets, au format de la langue courante (« 3,5 Mo » / « 3.5 MB »). */
function formatMegabytes(bytes: number): string {
  return localize('export.unit.megabytes', {
    value: formatNumber(bytes / (1024 * 1024), { minimumFractionDigits: 1, maximumFractionDigits: 1 })
  });
}

/** Élément actif réel, à travers les shadow roots ; null si le focus est sur le document. */
function deepActiveElement(): HTMLElement | null {
  let active: Element | null = document.activeElement;
  while (active?.shadowRoot?.activeElement) active = active.shadowRoot.activeElement;
  return active instanceof HTMLElement && active !== document.body && active !== document.documentElement ? active : null;
}

/** Contexte de `hass` affiché par la fenêtre : droits, langue / formats de date et thème. */
function hassContextChanged(previous: any, next: any): boolean {
  return !previous || !next
    || previous.user?.is_admin !== next.user?.is_admin
    || previous.language !== next.language
    || previous.locale?.language !== next.locale?.language
    || previous.themes?.darkMode !== next.themes?.darkMode;
}

/** Erreur propre à la fenêtre d'export : son message est traduit à l'affichage (langue courante). */
class ExportError extends Error {
  readonly key: string;
  readonly params?: I18nParams;

  constructor(key: string, params?: I18nParams) {
    super(localize(key, params));
    this.name = 'ExportError';
    this.key = key;
    this.params = params;
  }
}

export class HomeArchitectExportModal extends LitElement {
  static styles = [uiThemeStyles, css`
    :host {
      --exp-shadow: var(--ha-arch-ui-shadow, 0 24px 48px -12px rgba(0, 0, 0, 0.45));
      position: fixed;
      inset: 0;
      background: var(--arch-ui-overlay);
      -webkit-backdrop-filter: blur(14px);
      backdrop-filter: blur(14px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--arch-ui-font);
      color: var(--arch-ui-text);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-card {
      position: relative;
      background: var(--arch-ui-surface);
      color: var(--arch-ui-text);
      border: 1px solid var(--arch-ui-border);
      border-radius: var(--arch-ui-radius);
      width: 720px;
      max-width: 94vw;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: var(--exp-shadow);
      overflow: hidden;
      animation: fadeIn 0.2s ease-out;
    }

    /* Focus initial porté par la fenêtre elle-même : pas d'anneau autour de toute la carte. */
    .modal-card:focus,
    .modal-card:focus-visible {
      outline: none;
      box-shadow: var(--exp-shadow);
    }

    .modal-header {
      padding: 16px 22px;
      border-bottom: 1px solid var(--arch-ui-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: var(--arch-ui-bg);
    }

    .modal-title-group {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }

    .modal-icon {
      font-size: 1.6rem;
    }

    .modal-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      margin: 0;
    }

    .modal-subtitle {
      font-size: 0.8rem;
      color: var(--arch-ui-text-muted);
      margin: 2px 0 0 0;
    }

    .btn-close {
      flex-shrink: 0;
      width: 36px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      color: var(--arch-ui-text-muted);
      font-size: 20px;
      cursor: pointer;
      border-radius: 8px;
      transition: background-color 0.15s ease, color 0.15s ease;
    }

    .btn-close:hover:not(:disabled) {
      color: var(--arch-ui-text);
      background: var(--arch-ui-surface-2);
    }

    .btn-close:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* Onglets de navigation */
    .tabs-nav {
      display: flex;
      flex-wrap: wrap;
      background: var(--arch-ui-bg);
      border-bottom: 1px solid var(--arch-ui-border);
      padding: 0 16px;
      gap: 6px;
    }

    .tab-btn {
      padding: 12px 16px;
      font: inherit;
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--arch-ui-text-muted);
      background: transparent;
      border: none;
      border-bottom: 3px solid transparent;
      border-radius: 6px 6px 0 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: color 0.2s ease, border-color 0.2s ease;
    }

    .tab-btn:hover {
      color: var(--arch-ui-text);
    }

    .tab-btn[aria-selected='true'] {
      color: var(--arch-ui-text);
      font-weight: 700;
      border-bottom-color: var(--arch-ui-accent);
    }

    /* Anneau de focus intérieur : la barre d'onglets défile (et rognerait un anneau extérieur) sur mobile. */
    .tab-btn:focus-visible {
      box-shadow: inset 0 0 0 2px var(--arch-ui-accent);
    }

    .modal-body {
      padding: 20px 24px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
      flex: 1;
    }

    .tab-panel {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* Résumé du plan */
    .stats-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 10px 14px;
    }

    .stat-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.82rem;
      padding: 4px 10px;
      border-radius: 6px;
      background: var(--arch-ui-surface);
      border: 1px solid var(--arch-ui-border);
      color: var(--arch-ui-text);
    }

    .stat-badge.highlight {
      border-color: var(--arch-ui-accent);
    }

    /* Sections (publication, cadre, code) */
    .section {
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 14px 16px;
    }

    .section-title {
      margin: 0;
      font-size: 0.92rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .hint {
      font-size: 0.8rem;
      color: var(--arch-ui-text-muted);
      line-height: 1.45;
      margin: 0;
    }

    .hint code,
    .banner code,
    .status-line code,
    .guide-step code {
      background: var(--arch-ui-surface-2);
      color: var(--arch-ui-text);
      padding: 1px 6px;
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-size: 0.78rem;
      word-break: break-all;
    }

    .status-line {
      font-size: 0.84rem;
      color: var(--arch-ui-text);
      line-height: 1.5;
    }

    .actions-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }

    /* Section Actions / Configuration */
    .config-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 10px 14px;
    }

    .config-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--arch-ui-text);
    }

    .check-row {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      cursor: pointer;
      user-select: none;
    }

    .check-row.spaced {
      margin-top: 8px;
    }

    .check-row input {
      accent-color: var(--arch-ui-accent);
      width: 16px;
      height: 16px;
      margin-top: 2px;
      cursor: pointer;
      flex-shrink: 0;
    }

    .bg-thumb {
      width: 64px;
      height: 48px;
      object-fit: cover;
      border-radius: 6px;
      border: 1px solid var(--arch-ui-border);
      flex-shrink: 0;
    }

    /* Boutons : action principale (couleur primaire du thème), neutre, destructive */
    .btn-action {
      background: var(--arch-ui-accent);
      color: var(--arch-ui-accent-text);
      border: 1px solid var(--arch-ui-accent);
      border-radius: 8px;
      padding: 8px 16px;
      font: inherit;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: box-shadow 0.2s ease, background-color 0.2s ease, color 0.2s ease;
      text-decoration: none;
    }

    .btn-action:hover:not(:disabled) {
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
    }

    /* Le survol ne masque pas l'anneau de focus clavier. */
    .btn-action:focus-visible:not(:disabled) {
      box-shadow: var(--arch-ui-focus-ring);
    }

    .btn-action:disabled,
    .btn-secondary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-action.large {
      padding: 10px 22px;
      font-size: 0.92rem;
      font-weight: 700;
    }

    .btn-action.danger {
      background: var(--arch-ui-surface);
      border-color: var(--arch-ui-danger);
      color: var(--arch-ui-text);
    }

    .btn-action.danger:hover:not(:disabled) {
      background: var(--arch-ui-danger);
      color: var(--arch-ui-accent-text);
    }

    .btn-action.ghost {
      background: var(--arch-ui-surface);
      border-color: var(--arch-ui-border);
      color: var(--arch-ui-text);
    }

    .btn-action.ghost:hover:not(:disabled) {
      border-color: var(--arch-ui-accent);
    }

    .btn-secondary {
      background: var(--arch-ui-surface-2);
      color: var(--arch-ui-text);
      border: 1px solid var(--arch-ui-border);
      border-radius: 8px;
      padding: 8px 16px;
      font: inherit;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: border-color 0.2s ease;
    }

    .btn-secondary:hover:not(:disabled) {
      border-color: var(--arch-ui-text-muted);
    }

    /* Zone de code YAML */
    .code-container {
      position: relative;
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid var(--arch-ui-border);
      background: var(--arch-ui-surface);
    }

    .code-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 8px 14px;
      background: var(--arch-ui-surface-2);
      border-bottom: 1px solid var(--arch-ui-border);
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .btn-copy {
      background: var(--arch-ui-surface);
      border: 1px solid var(--arch-ui-border);
      color: var(--arch-ui-text);
      border-radius: 6px;
      padding: 4px 10px;
      font: inherit;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: none;
      letter-spacing: normal;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease;
    }

    .btn-copy:hover {
      border-color: var(--arch-ui-accent);
    }

    /* Copie réussie : liseré et coche de la couleur de succès, texte du thème (contraste garanti). */
    .btn-copy.copied {
      border-color: var(--arch-ui-success);
    }

    .copied-mark {
      color: var(--arch-ui-success);
      font-weight: 700;
    }

    pre.code-box {
      margin: 0;
      padding: 14px 16px;
      max-height: 280px;
      overflow: auto;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 0.82rem;
      line-height: 1.5;
      color: var(--arch-ui-text);
      white-space: pre;
    }

    /* Zone défilante focalisable : anneau intérieur (le conteneur arrondi rogne tout débordement). */
    pre.code-box:focus-visible {
      box-shadow: inset 0 0 0 2px var(--arch-ui-accent);
    }

    textarea.manual-copy {
      width: 100%;
      box-sizing: border-box;
      min-height: 140px;
      background: var(--arch-ui-bg);
      color: var(--arch-ui-text);
      border: 1px solid var(--arch-ui-accent);
      border-radius: 8px;
      padding: 10px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.8rem;
      resize: vertical;
    }

    /* Guide pas-à-pas */
    .guide-box {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-left: 4px solid var(--arch-ui-accent);
      border-radius: 10px;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .guide-title {
      margin: 0;
      font-size: 0.86rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .guide-text {
      font-size: 0.82rem;
      color: var(--arch-ui-text);
      line-height: 1.45;
      margin: 0;
    }

    .guide-steps {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .guide-step {
      font-size: 0.8rem;
      color: var(--arch-ui-text);
      line-height: 1.45;
      display: flex;
      gap: 8px;
    }

    .guide-num,
    .section-num {
      background: var(--arch-ui-accent);
      color: var(--arch-ui-accent-text);
      border-radius: 50%;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.72rem;
      font-weight: bold;
      flex-shrink: 0;
    }

    .guide-num {
      margin-top: 2px;
    }

    .modal-footer {
      padding: 14px 24px;
      border-top: 1px solid var(--arch-ui-border);
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 10px;
      background: var(--arch-ui-bg);
    }

    /* Bandeaux d'information / d'avertissement : texte du thème, couleur d'état en liseré */
    .banner {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 0.82rem;
      line-height: 1.45;
      background: var(--arch-ui-surface);
      border: 1px solid var(--arch-ui-border);
      border-left: 4px solid var(--arch-ui-info);
      color: var(--arch-ui-text);
      animation: fadeIn 0.2s ease-out;
    }

    .banner.info {
      border-left-color: var(--arch-ui-info);
    }

    .banner.warning {
      border-left-color: var(--arch-ui-warning);
    }

    .banner.error {
      border-left-color: var(--arch-ui-danger);
    }

    .banner-icon {
      font-size: 1.2rem;
      flex-shrink: 0;
      line-height: 1.2;
    }

    .banner-text {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .banner-title {
      font-weight: 700;
      font-size: 0.86rem;
    }

    /* Notification flottante (région annoncée par les lecteurs d'écran), couleurs inversées */
    .toast-region {
      position: absolute;
      top: 18px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      padding: 0 16px;
      z-index: 200;
      pointer-events: none;
    }

    .floating-toast {
      max-width: 100%;
      box-sizing: border-box;
      padding: 10px 22px;
      border-radius: 12px;
      font-size: 0.88rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
      animation: popToast 0.25s ease-out;
      background: var(--arch-ui-text);
      color: var(--arch-ui-surface);
      border-left: 4px solid var(--arch-ui-info);
    }

    .floating-toast.success {
      border-left-color: var(--arch-ui-success);
    }

    .floating-toast.error {
      border-left-color: var(--arch-ui-danger);
    }

    @keyframes popToast {
      from { transform: translateY(-10px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    /* Petits écrans : la fenêtre occupe tout l'écran, les onglets défilent horizontalement. */
    @media (max-width: 600px) {
      .modal-card {
        width: 100%;
        max-width: 100%;
        height: 100%;
        max-height: 100%;
        border: none;
        border-radius: 0;
      }

      .modal-header {
        padding: 12px 14px;
        padding-top: max(12px, env(safe-area-inset-top));
      }

      .modal-icon {
        display: none;
      }

      .tabs-nav {
        flex-wrap: nowrap;
        overflow-x: auto;
        scrollbar-width: none;
        padding: 0 8px;
      }

      .tabs-nav::-webkit-scrollbar {
        display: none;
      }

      .tab-btn {
        white-space: nowrap;
        padding: 12px 10px;
      }

      .modal-body {
        padding: 14px;
      }

      .modal-footer {
        padding: 12px 14px;
        padding-bottom: max(12px, env(safe-area-inset-bottom));
      }
    }
  `];

  @property({ type: Object })
  public project!: HomeArchitectProject;

  @property({ type: Object })
  public hass: any;

  /** URL affichable de l'image de fond (object URL d'un asset ou URL externe), pour l'aperçu. */
  @property({ type: String })
  public backgroundSrc?: string;

  @property({ type: Boolean })
  public readOnly: boolean = false;

  /** Le plan ouvert contient des modifications non sauvegardées. */
  @property({ type: Boolean })
  public dirty: boolean = false;

  @state()
  private activeTab: ExportTab = 'picture_elements';

  @state()
  private customCardViewMode: '2d' | '3d' = '2d';

  /** Publication courante (copie locale : mise à jour immédiatement après publier / dépublier). */
  @state()
  private publishInfo: PublishInfo | null = null;

  /** Cadre figé par cette modale, en attendant que le panneau le répercute dans project.exportFrame. */
  @state()
  private localFrame: ExportFrame | null = null;

  /**
   * Le plan publié utilise un nouveau cadre (recadrage, ou cadre figé lors d'une mise à jour) :
   * le YAML déjà collé dans les tableaux de bord n'est plus aligné et doit être recollé.
   */
  @state()
  private frameStale: boolean = false;

  @state()
  private includeBackground: boolean = false;

  @state()
  private downloadWithBackground: boolean = true;

  @state()
  private confirmAction: ConfirmAction | null = null;

  @state()
  private busy: BusyAction | null = null;

  /** Échec de publication, décrit au rendu (le message suit la langue courante). */
  @state()
  private publishError: { error: unknown; withBackground: boolean } | null = null;

  @state()
  private notice: { kind: NoticeKind; text: string } | null = null;

  @state()
  private copied: CopyTarget | null = null;

  /** Texte à copier à la main quand le presse-papiers est inaccessible (HTTP, WebView). */
  @state()
  private manualCopyText: string | null = null;

  @query('.modal-card')
  private dialogCard?: HTMLElement;

  // Valeurs dérivées, recalculées dans willUpdate uniquement quand leurs entrées changent.
  private frame: ExportFrame | null = null;
  private outOfFrame: boolean = false;
  private pictureYaml: string = '';
  private cardYaml: string = '';

  private noticeTimer: ReturnType<typeof setTimeout> | undefined;
  private copiedTimer: ReturnType<typeof setTimeout> | undefined;

  /** Élément qui avait le focus à l'ouverture : il le retrouve à la fermeture. */
  private returnFocusTarget: HTMLElement | null = null;
  /** Bouton qui a demandé la confirmation en cours : il retrouve le focus quand elle se ferme. */
  private confirmOrigin: HTMLElement | null = null;
  /** Contrôle désactivé pendant l'action en cours (« Publier »…) : il retrouve le focus une fois réactivé. */
  private focusAfterBusy: HTMLElement | null = null;
  private initialFocusDone = false;

  /** Re-rendu au changement de langue (clé LANGUAGE_CHANGED_KEY). */
  private readonly i18n = new LocalizeController(this);

  constructor() {
    super();
    this.addEventListener('keydown', this.onKeyDown);
    this.addEventListener('mousedown', this.onBackdropMouseDown);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.returnFocusTarget = deepActiveElement();
    this.initialFocusDone = false;
    window.addEventListener('keydown', this.onWindowKeyDown, true);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.onWindowKeyDown, true);
    clearTimeout(this.noticeTimer);
    clearTimeout(this.copiedTimer);
    this.focusAfterBusy = null;
    this.confirmOrigin = null;
    // Retour du focus à l'élément déclencheur (bouton ou menu du studio), s'il existe encore.
    const target = this.returnFocusTarget;
    this.returnFocusTarget = null;
    if (target?.isConnected) target.focus({ preventScroll: true });
  }

  /**
   * `hass` change à chaque état d'entité : seuls les droits, la langue et le thème concernent la
   * fenêtre. Tout autre changement (dont celui de la langue de l'interface) déclenche le rendu.
   */
  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has(LANGUAGE_CHANGED_KEY)) return true;
    if (changed.size === 1 && changed.has('hass')) return hassContextChanged(changed.get('hass'), this.hass);
    return true;
  }

  protected willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);
    if (changed.has('hass')) applyColorScheme(this, this.hass);
    if (changed.has('project') && this.project) {
      const previous = changed.get('project') as HomeArchitectProject | undefined;
      if (!previous || previous.id !== this.project.id) {
        // Autre plan : on repart de l'état du serveur.
        this.publishInfo = this.project.publish ?? null;
        this.includeBackground = this.publishInfo?.include_background ?? false;
        this.localFrame = null;
        this.frameStale = false;
        this.confirmAction = null;
        this.publishError = null;
        this.manualCopyText = null;
      } else if (previous.publish !== this.project.publish) {
        this.publishInfo = this.project.publish ?? null;
      }
      // Le panneau a enregistré le cadre : il fait de nouveau foi.
      if (this.project.exportFrame) this.localFrame = null;
    }
    if (this.project && (changed.has('project') || changed.has('localFrame') || changed.has('publishInfo') || changed.has('customCardViewMode'))) {
      this.recomputeOutputs();
    }
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    const root = this.renderRoot as ShadowRoot;
    if (!this.initialFocusDone && this.dialogCard) {
      // Focus initial sur la fenêtre : le lecteur d'écran annonce son titre, Tab mène au premier contrôle.
      this.initialFocusDone = true;
      this.dialogCard.focus({ preventScroll: true });
    }
    if (changed.has('activeTab')) {
      // Petits écrans : la barre d'onglets défile ; l'onglet choisi (clic, flèches) reste entièrement visible.
      root.querySelector<HTMLElement>(`#export-tab-${this.activeTab}`)?.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
    }
    if (changed.has('manualCopyText') && this.manualCopyText !== null) {
      const area = root.querySelector<HTMLTextAreaElement>('textarea.manual-copy');
      if (area) {
        area.focus();
        area.select();
        area.setSelectionRange(0, area.value.length);
      }
    }
    if (changed.has('confirmAction')) {
      if (this.confirmAction) {
        root.querySelector<HTMLElement>('.confirm-ok')?.focus();
      } else if (changed.get('confirmAction')) {
        // Confirmation fermée : retour au bouton qui l'a demandée (s'il est encore utilisable),
        // ou dès sa réactivation s'il est désactivé le temps de l'action confirmée.
        const origin = this.confirmOrigin;
        this.confirmOrigin = null;
        if (origin?.isConnected) {
          if (origin.matches(':disabled')) this.focusAfterBusy = origin;
          else origin.focus();
        }
      }
    }
    if (this.dialogCard) {
      const active = root.activeElement as HTMLElement | null;
      if (active && active !== this.dialogCard && active.matches(':disabled')) {
        // Contrôle désactivé pendant une action (publication, téléchargement) : le navigateur lui
        // retirerait le focus au rendu suivant, vers document.body, hors de la fenêtre (Échap
        // n'atteindrait plus la fenêtre, Tab en sortirait). La fenêtre le garde en attendant.
        this.focusAfterBusy = active;
        this.dialogCard.focus({ preventScroll: true });
      } else if (!active && deepActiveElement() === null) {
        // Le contrôle qui avait le focus a disparu (bandeau fermé) : le focus reste dans la fenêtre.
        this.dialogCard.focus({ preventScroll: true });
      }
      if (this.focusAfterBusy && !this.busy) {
        // Action terminée : le contrôle réactivé retrouve le focus, sauf si l'utilisateur l'a déplacé.
        const target = this.focusAfterBusy;
        this.focusAfterBusy = null;
        if (target.isConnected && !target.matches(':disabled') && root.activeElement === this.dialogCard) {
          target.focus({ preventScroll: true });
        }
      }
    }
  }

  /** Cadre, YAML et avertissements : calculés une fois par changement d'entrée (jamais à chaque rendu). */
  private recomputeOutputs(): void {
    const project = this.project;
    this.frame = SvgExporter.resolveExportFrame(project, this.localFrame);
    const bounds = SvgExporter.contentBounds(project);
    this.outOfFrame = !!bounds && !SvgExporter.frameContains(this.frame, bounds);
    this.pictureYaml = this.publishInfo
      ? LovelaceGenerator.generatePictureElementsYaml(project, { imageUrl: this.publishInfo.url, frame: this.frame })
      : '';
    this.cardYaml = LovelaceGenerator.generateHomeArchitectCardYaml(project, { viewMode: this.customCardViewMode });
  }

  // ==========================================
  // CLAVIER ET FOCUS
  // ==========================================

  /**
   * Échap : annule la confirmation en cours, sinon ferme la fenêtre (jamais pendant une écriture).
   * La touche est marquée traitée : le panneau (qui ignore les touches traitées) ne ferme pas la
   * fenêtre de son côté, ce qui perdrait les événements d'une publication en cours.
   * Tab : le focus reste dans la fenêtre.
   */
  private readonly onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      if (e.defaultPrevented) return;
      e.preventDefault();
      if (this.confirmAction) {
        this.confirmAction = null;
        return;
      }
      this.handleClose();
      return;
    }
    if (e.key === 'Tab') this.trapFocus(e);
  };

  /**
   * Échap pressée alors que le focus n'est nulle part (document.body) : la touche n'atteint pas la
   * fenêtre et le panneau la traiterait en fermant la fenêtre. Pendant une écriture, elle est
   * neutralisée (marquée traitée, ignorée par le panneau) et le focus revient dans la fenêtre.
   */
  private readonly onWindowKeyDown = (e: KeyboardEvent): void => {
    if (e.key !== 'Escape' || e.defaultPrevented || !this.isWriting) return;
    const target = getEventTarget(e);
    if (target !== document.body && target !== document.documentElement) return;
    e.preventDefault();
    this.dialogCard?.focus({ preventScroll: true });
  };

  /** Un clic sur le fond (hors de la fenêtre) ne retire pas le focus de la fenêtre. */
  private readonly onBackdropMouseDown = (e: MouseEvent): void => {
    if (e.composedPath()[0] === this) e.preventDefault();
  };

  private focusableElements(): HTMLElement[] {
    return [...(this.renderRoot as ShadowRoot).querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)].filter(
      el => el.tabIndex >= 0 && !el.matches(':disabled') && el.getClientRects().length > 0
    );
  }

  private trapFocus(e: KeyboardEvent): void {
    const items = this.focusableElements();
    const active = (this.renderRoot as ShadowRoot).activeElement;
    if (items.length === 0) {
      e.preventDefault();
      this.dialogCard?.focus();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && (!active || active === first || active === this.dialogCard)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (!active || active === last)) {
      e.preventDefault();
      first.focus();
    }
  }

  /** Flèches, Début et Fin sur les onglets (activation automatique, focus mobile). */
  private handleTabKeydown(e: KeyboardEvent): void {
    const index = TABS.findIndex(tab => tab.id === this.activeTab);
    let next: number;
    switch (e.key) {
      case 'ArrowRight': next = (index + 1) % TABS.length; break;
      case 'ArrowLeft': next = (index - 1 + TABS.length) % TABS.length; break;
      case 'Home': next = 0; break;
      case 'End': next = TABS.length - 1; break;
      default: return;
    }
    e.preventDefault();
    void this.selectTab(TABS[next].id, true);
  }

  private async selectTab(tab: ExportTab, focus: boolean = false): Promise<void> {
    this.activeTab = tab;
    if (!focus) return;
    await this.updateComplete;
    (this.renderRoot as ShadowRoot).querySelector<HTMLElement>(`#export-tab-${tab}`)?.focus();
  }

  /** Ouvre la confirmation `action` en mémorisant le bouton qui l'a demandée. */
  private askConfirmation(action: ConfirmAction): void {
    this.confirmOrigin = (this.renderRoot as ShadowRoot).activeElement as HTMLElement | null;
    this.confirmAction = action;
  }

  // ==========================================
  // ÉTAT DÉRIVÉ
  // ==========================================

  private get canEdit(): boolean {
    return !this.readOnly && isAdmin(this.hass);
  }

  /** Le plan existe sur le serveur (au moins une sauvegarde). */
  private get isSavedOnServer(): boolean {
    return (this.project?.revision ?? 0) > 0;
  }

  private get isFrameFrozen(): boolean {
    return !!(this.localFrame || this.project?.exportFrame);
  }

  /** Écriture serveur en cours : la modale reste ouverte pour que ses événements atteignent le panneau. */
  private get isWriting(): boolean {
    return this.busy === 'publish' || this.busy === 'unpublish';
  }

  /** Fond visible incluable dans le SVG : image téléversée (asset) ou ancienne data-URL. */
  private get hasEmbeddableBackground(): boolean {
    const bg = this.project?.background;
    return !!bg && bg.visible && (!!bg.assetId || DATA_IMAGE_URL.test(bg.imageUrl || ''));
  }

  /** Fond visible donné par une URL externe : jamais affiché par picture-elements (SVG chargé dans <img>). */
  private get hasExternalBackground(): boolean {
    const bg = this.project?.background;
    return !!bg && bg.visible && !bg.assetId && !!bg.imageUrl && !DATA_IMAGE_URL.test(bg.imageUrl);
  }

  private get backgroundThumbnail(): string | undefined {
    const bg = this.project?.background;
    if (this.backgroundSrc) return this.backgroundSrc;
    return bg && DATA_IMAGE_URL.test(bg.imageUrl || '') ? bg.imageUrl : undefined;
  }

  // ==========================================
  // ACTIONS
  // ==========================================

  private emit(name: string, detail?: unknown): void {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private handleClose(): void {
    // Fermée pendant une publication, la modale serait détachée avant la réponse du serveur :
    // project-published / export-frame-changed n'atteindraient plus le panneau.
    if (this.isWriting) return;
    this.emit('close');
  }

  private requestSave(): void {
    this.emit('save-requested');
  }

  private showNotice(kind: NoticeKind, text: string): void {
    clearTimeout(this.noticeTimer);
    this.notice = { kind, text };
    this.noticeTimer = setTimeout(() => { this.notice = null; }, NOTICE_DURATION_MS);
  }

  /** Image de fond du projet (asset du serveur ou ancienne data-URL), avec un type MIME renseigné. */
  private async loadBackgroundBlob(): Promise<Blob> {
    const bg = this.project.background;
    let blob: Blob;
    if (bg?.assetId) {
      blob = await fetchBackgroundBlob(this.hass, this.project.id, bg.assetId);
    } else if (bg && DATA_IMAGE_URL.test(bg.imageUrl || '')) {
      blob = dataUrlToBlob(bg.imageUrl);
    } else {
      throw new ExportError('export.error.no_background');
    }
    return blob.type || !bg?.mimeType ? blob : new Blob([blob], { type: bg.mimeType });
  }

  /** Fond en data-URL base64 (seul format accepté dans le SVG publié), après contrôle de taille. */
  private async loadBackgroundDataUrl(): Promise<string> {
    let blob: Blob;
    try {
      blob = await this.loadBackgroundBlob();
    } catch (err) {
      // Connexion ou droits : message générique ci-dessous. Sinon l'image elle-même est en cause
      // (asset absent : 'not_found' ne doit pas laisser croire que le PLAN est introuvable).
      if (err instanceof HaApiError && ['not_connected', 'connection_lost', 'network_error', 'unauthorized'].includes(err.code)) throw err;
      console.warn('[home-architect] Background image unreadable:', err);
      throw new ExportError('export.error.background_unavailable');
    }
    const encodedBytes = Math.ceil(blob.size / 3) * 4;
    if (encodedBytes > MAX_PUBLISH_BYTES) {
      throw new ExportError('export.error.background_too_large', {
        size: formatMegabytes(encodedBytes),
        max: formatMegabytes(MAX_PUBLISH_BYTES)
      });
    }
    const dataUrl = SvgExporter.embeddableDataUrl(await blobToDataUrl(blob));
    if (!dataUrl) throw new ExportError('export.error.background_format');
    return dataUrl;
  }

  /** Message lisible d'une erreur ; `withBackground` : l'image de fond faisait partie de l'envoi. */
  private describeError(err: unknown, withBackground: boolean = false): string {
    if (err instanceof ExportError) return localize(err.key, err.params);
    if (err instanceof PayloadTooLargeError) {
      return withBackground ? localize('export.error.too_large_with_background', { message: err.message }) : err.message;
    }
    if (err instanceof HaApiError) {
      switch (err.code) {
        case 'not_found':
          return localize('export.error.not_found');
        case 'invalid_svg':
          return localize('export.error.invalid_svg');
        case 'write_failed':
          return localize('export.error.write_failed');
        case 'unknown_command':
          return localize('export.error.unknown_command');
        case 'connection_lost':
        case 'not_connected':
          return localize('export.error.connection');
        default:
          return err.message;
      }
    }
    return err instanceof Error ? err.message : String(err);
  }

  /** Publication explicite (jamais automatique) ; confirmation si un plan publié existe déjà. */
  private async publish(): Promise<void> {
    if (!this.canEdit || !this.isSavedOnServer || this.busy || !this.frame) return;
    if (this.publishInfo && this.confirmAction !== 'publish') {
      this.askConfirmation('publish');
      return;
    }
    this.confirmAction = null;
    // Premier export (ou publication dont le cadre n'a pas été conservé dans le plan) : le cadre
    // courant est figé pour que les positions du YAML restent valables.
    await this.publishWithFrame(this.frame, !this.isFrameFrozen);
  }

  /**
   * Génère et publie le SVG cadré sur `frame`. Quand `adoptFrame` est vrai, ce cadre n'est figé
   * (et transmis au panneau) qu'après le succès de la publication : le plan publié et le YAML
   * affiché utilisent toujours le même cadre.
   */
  private async publishWithFrame(frame: ExportFrame, adoptFrame: boolean): Promise<void> {
    if (!this.canEdit || !this.isSavedOnServer || this.busy) return;
    this.busy = 'publish';
    this.publishError = null;
    const project = this.project;
    const wasPublished = !!this.publishInfo;
    const includeBackground = this.includeBackground && this.hasEmbeddableBackground;
    try {
      const backgroundDataUrl = includeBackground ? await this.loadBackgroundDataUrl() : undefined;
      // Les étiquettes du SVG (surfaces) suivent la langue courante au moment de la publication.
      const svg = SvgExporter.exportToSvg(project, { ...SVG_RENDER_OPTIONS, includeBackground, backgroundDataUrl, frame });
      const info = await publishSvg(this.hass, project.id, svg, { includeBackground });
      // Un autre plan a été ouvert pendant l'envoi : son cadre et sa publication ne doivent pas
      // recevoir ceux du plan publié (les événements ne portent pas d'identifiant de projet).
      if (this.project?.id !== project.id) return;
      if (adoptFrame) {
        this.localFrame = { ...frame };
        this.emit('export-frame-changed', { frame: { ...frame } });
        // Le cadre d'une publication existante a changé : le YAML déjà collé est décalé.
        if (wasPublished) this.frameStale = true;
      }
      this.publishInfo = info;
      this.emit('project-published', { publish: info });
      this.showNotice(
        'success',
        localize(adoptFrame && wasPublished ? 'export.notice.published_new_frame' : 'export.notice.published')
      );
    } catch (err) {
      console.warn('[home-architect] Plan publication failed:', err);
      this.publishError = { error: err, withBackground: includeBackground };
    } finally {
      this.busy = null;
    }
  }

  private async unpublishPlan(): Promise<void> {
    if (!this.canEdit || this.busy || !this.publishInfo) return;
    if (this.confirmAction !== 'unpublish') {
      this.askConfirmation('unpublish');
      return;
    }
    this.confirmAction = null;
    this.busy = 'unpublish';
    this.publishError = null;
    const projectId = this.project.id;
    try {
      await unpublish(this.hass, projectId);
      this.emit('project-unpublished', { projectId });
      // Autre plan ouvert pendant l'envoi : son état de publication n'est pas concerné.
      if (this.project?.id !== projectId) return;
      this.publishInfo = null;
      this.frameStale = false;
      this.showNotice('info', localize('export.notice.unpublished'));
    } catch (err) {
      console.warn('[home-architect] Plan unpublication failed:', err);
      this.publishError = { error: err, withBackground: false };
    } finally {
      this.busy = null;
    }
  }

  /**
   * Recalcule le cadre sur le contenu actuel. Un plan déjà publié est republié avec ce cadre dans
   * la même action (le cadre ne change que si la publication réussit) : sinon le YAML affiché,
   * calculé sur le nouveau cadre, ne correspondrait plus au SVG publié, sans avertissement à la
   * réouverture de la modale.
   */
  private async reframe(): Promise<void> {
    if (!this.canEdit || this.busy) return;
    const published = !!this.publishInfo;
    if (published && this.confirmAction !== 'reframe') {
      this.askConfirmation('reframe');
      return;
    }
    this.confirmAction = null;
    const frame = SvgExporter.computeContentFrame(this.project);
    if (published) {
      await this.publishWithFrame(frame, true);
      return;
    }
    this.localFrame = frame;
    this.emit('export-frame-changed', { frame });
  }

  private async copyText(text: string, target: CopyTarget): Promise<void> {
    let ok = false;
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch {
        // Refus (permission, contexte non sécurisé, WebView) : repli ci-dessous.
      }
    }
    if (!ok) ok = this.copyWithTextarea(text);
    if (!ok) {
      this.manualCopyText = text;
      return;
    }
    this.manualCopyText = null;
    this.copied = target;
    clearTimeout(this.copiedTimer);
    this.copiedTimer = setTimeout(() => { this.copied = null; }, 2500);
    this.showNotice('success', localize('export.notice.copied'));
  }

  /** Repli execCommand('copy') : zone de texte en lecture seule, sélection explicite (iOS). */
  private copyWithTextarea(text: string): boolean {
    const area = document.createElement('textarea');
    area.value = text;
    area.readOnly = true; // pas de clavier virtuel sur mobile
    area.setAttribute('aria-hidden', 'true');
    area.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;padding:0;border:0;opacity:0;';
    // Dans la modale : un éventuel piège à focus de HA ne vole pas la sélection.
    const previousFocus = (this.renderRoot as ShadowRoot).activeElement as HTMLElement | null;
    this.renderRoot.appendChild(area);
    try {
      area.focus({ preventScroll: true });
      area.select();
      area.setSelectionRange(0, text.length);
      return document.execCommand('copy');
    } catch {
      return false;
    } finally {
      area.remove();
      // Le focus revient au bouton « Copier » (navigation au clavier).
      previousFocus?.focus({ preventScroll: true });
    }
  }

  private async downloadSvg(): Promise<void> {
    if (this.busy || !this.frame) return;
    this.busy = 'svg';
    const frame = this.frame;
    try {
      let backgroundDataUrl: string | undefined;
      let backgroundMissing = false;
      if (this.downloadWithBackground && this.hasEmbeddableBackground) {
        try {
          backgroundDataUrl = SvgExporter.embeddableDataUrl(await blobToDataUrl(await this.loadBackgroundBlob())) ?? undefined;
        } catch (err) {
          console.warn('[home-architect] Background image not included in the SVG:', err);
        }
        backgroundMissing = !backgroundDataUrl;
      }
      const svg = SvgExporter.exportToSvg(this.project, {
        ...SVG_RENDER_OPTIONS,
        includeBackground: !!backgroundDataUrl,
        backgroundDataUrl,
        frame
      });
      triggerDownload(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }), `plan_${fileSlug(this.project.name, this.project.id)}.svg`);
      if (backgroundMissing) this.showNotice('info', localize('export.notice.svg_without_background'));
    } catch (err) {
      console.warn('[home-architect] SVG download failed:', err);
      this.showNotice('error', localize('export.notice.download_failed', { error: this.describeError(err) }));
    } finally {
      this.busy = null;
    }
  }

  /**
   * Sauvegarde complète réimportable : projet normalisé, sans champs serveur, image de fond
   * embarquée en data-URL (l'asset appartient au plan d'origine et peut disparaître avec lui).
   */
  private async downloadBackup(): Promise<void> {
    if (this.busy) return;
    this.busy = 'backup';
    try {
      const { revision: _revision, ...backup } = stripServerFields(normalizeProject(this.project));
      let backgroundMissing = false;
      const bg = backup.background;
      if (bg?.assetId) {
        try {
          const blob = await this.loadBackgroundBlob();
          const dataUrl = await blobToDataUrl(blob);
          // À la réimportation, normalizeProject n'accepte qu'une data-URL d'image (data:image/…).
          if (!DATA_IMAGE_URL.test(dataUrl)) throw new ExportError('export.error.background_type');
          bg.imageUrl = dataUrl;
          // Type MIME sans paramètre (« image/svg+xml;charset=utf-8 » serait écarté à la réimportation).
          const mimeType = blob.type.split(';')[0].trim();
          if (mimeType) bg.mimeType = mimeType;
          delete bg.assetId;
        } catch (err) {
          // L'asset reste référencé : il est encore lisible tant que le plan d'origine existe.
          console.warn('[home-architect] Background image not included in the backup:', err);
          backgroundMissing = true;
        }
      }
      const json = JSON.stringify(backup, null, 2);
      const date = new Date().toISOString().slice(0, 10);
      triggerDownload(
        new Blob([json], { type: 'application/json;charset=utf-8' }),
        `home-architect_${fileSlug(backup.name, backup.id)}_${date}.json`
      );
      this.showNotice(
        backgroundMissing ? 'info' : 'success',
        localize(backgroundMissing ? 'export.notice.backup_without_background' : 'export.notice.backup_done')
      );
    } catch (err) {
      console.warn('[home-architect] JSON backup failed:', err);
      this.showNotice('error', localize('export.notice.download_failed', { error: this.describeError(err) }));
    } finally {
      this.busy = null;
    }
  }

  private getEntitySummary() {
    const bindings = this.project?.bindings || [];
    const lights = bindings.filter(b => b.entityId.startsWith('light.')).length;
    const radars = bindings.filter(b => b.entityId.startsWith('binary_sensor.')).length;
    const sensors = bindings.filter(b => b.entityId.startsWith('sensor.') || b.entityId.startsWith('climate.')).length;
    const switches = bindings.filter(b => b.entityId.startsWith('switch.')).length;
    const rooms = this.project?.rooms?.length || 0;
    const furniture = this.project?.furniture?.length || 0;

    return { lights, radars, sensors, switches, rooms, furniture, total: bindings.length };
  }

  private formatDate(iso: string): string {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    try {
      return date.toLocaleString(this.hass?.locale?.language || this.hass?.language || undefined);
    } catch {
      return date.toLocaleString();
    }
  }

  // ==========================================
  // RENDU
  // ==========================================

  /** Bouton dont le libellé est précédé d'un pictogramme décoratif (ignoré des lecteurs d'écran). */
  private iconLabel(icon: string, label: string | Array<string | TemplateResult>) {
    return html`<span aria-hidden="true">${icon}</span><span>${label}</span>`;
  }

  /** Bandeau avec pictogramme décoratif ; `role` : 'alert' pour une erreur à annoncer. */
  private renderBanner(kind: 'info' | 'warning' | 'error', icon: string, content: unknown, role?: 'alert') {
    return html`
      <div class="banner ${kind}" role=${role ?? 'note'}>
        <span class="banner-icon" aria-hidden="true">${icon}</span>
        <div class="banner-text">${content}</div>
      </div>
    `;
  }

  private renderStat(icon: string, baseKey: string, count: number, highlight: boolean = false) {
    return html`
      <div class="stat-badge ${highlight ? 'highlight' : ''}" role="listitem">
        <span aria-hidden="true">${icon}</span>
        <span><strong>${formatNumber(count)}</strong> ${localize(pluralKey(baseKey, count))}</span>
      </div>
    `;
  }

  /** Bandeau « plan non sauvegardé » : la carte intégrée lit le serveur, la publication exige un plan sauvegardé. */
  private renderSaveState() {
    if (!this.canEdit || (this.isSavedOnServer && !this.dirty)) return null;
    const neverSaved = !this.isSavedOnServer;
    return this.renderBanner('warning', '💾', html`
      <div class="banner-title">${localize(neverSaved ? 'export.save.never_title' : 'export.save.dirty_title')}</div>
      <div>${localize(neverSaved ? 'export.save.never_text' : 'export.save.dirty_text')}</div>
      <div class="actions-row">
        <button class="btn-action" @click=${this.requestSave}>${this.iconLabel('💾', localize('export.save.button'))}</button>
      </div>
    `);
  }

  private renderConfirm(action: ConfirmAction) {
    if (this.confirmAction !== action) return null;
    const text = action === 'publish'
      ? [localize('export.confirm.publish'), this.isFrameFrozen ? '' : localize('export.confirm.publish_freeze')].filter(Boolean).join(' ')
      : localize(action === 'unpublish' ? 'export.confirm.unpublish' : 'export.confirm.reframe');
    const confirm = action === 'publish' ? () => this.publish() : action === 'unpublish' ? () => this.unpublishPlan() : () => this.reframe();
    const textId = `confirm-text-${action}`;
    return this.renderBanner('warning', '❓', html`
      <div id=${textId}>${text}</div>
      <div class="actions-row">
        <button class="btn-action confirm-ok ${action === 'unpublish' ? 'danger' : ''}" aria-describedby=${textId} @click=${confirm}>
          ${localize('export.confirm.ok')}
        </button>
        <button class="btn-secondary" @click=${() => { this.confirmAction = null; }}>${localize('export.confirm.cancel')}</button>
      </div>
    `);
  }

  private renderPublishSection() {
    const info = this.publishInfo;
    const canPublish = this.canEdit && this.isSavedOnServer && !!this.hass && !this.busy;
    const legacyId = !info && legacyCategory(this.project.id) !== undefined;
    const thumb = this.backgroundThumbnail;
    const unpublishLabel = localize('export.publish.unpublish');

    return html`
      <section class="section" aria-labelledby="export-publish-title">
        <h3 class="section-title" id="export-publish-title">
          <span class="section-num" aria-hidden="true">1</span><span>${localize('export.publish.title')}</span>
        </h3>
        <p class="hint">${richText('export.publish.hint')}</p>

        <div class="status-line">
          ${info ? html`
            <span aria-hidden="true">✅</span>
            ${localize(info.include_background ? 'export.publish.published_with_background' : 'export.publish.published_without_background', {
              date: this.formatDate(info.published_at)
            })}<br />
            <code>${info.url}</code>
          ` : html`<span aria-hidden="true">⚪</span> ${localize('export.publish.not_published')}`}
        </div>

        ${this.hasExternalBackground ? this.renderBanner('info', '🌐', localize('export.publish.external_background')) : null}

        ${this.hasEmbeddableBackground && this.canEdit ? html`
          <label class="check-row">
            <input
              type="checkbox"
              aria-labelledby="export-include-bg-label"
              aria-describedby="export-include-bg-hint"
              .checked=${this.includeBackground}
              ?disabled=${!!this.busy}
              @change=${(e: Event) => { this.includeBackground = (e.target as HTMLInputElement).checked; }}
            />
            ${thumb ? html`<img class="bg-thumb" src=${thumb} alt="" />` : null}
            <div>
              <div class="config-label" id="export-include-bg-label">${localize('export.include_background')}</div>
              <div class="hint" id="export-include-bg-hint">
                ${this.includeBackground
                  ? html`<span aria-hidden="true">⚠️</span> ${richText('export.publish.public_warning')}`
                  : localize('export.publish.without_background')}
              </div>
            </div>
          </label>
        ` : null}

        ${info?.legacy_path ? this.renderBanner('warning', '⚠️', html`
          <div class="banner-title">${richText('export.publish.legacy_title', { path: info.legacy_path })}</div>
          <div>${richText('export.publish.legacy_text', { unpublish: unpublishLabel })}</div>
        `) : null}

        ${legacyId && this.canEdit ? html`
          <p class="hint">${richText('export.publish.legacy_id_hint', { id: this.project.id })}</p>
        ` : null}

        ${this.renderConfirm('publish')}
        ${this.renderConfirm('unpublish')}

        ${this.canEdit ? html`
          <div class="actions-row">
            <button class="btn-action" ?disabled=${!canPublish} @click=${this.publish}>
              ${this.busy === 'publish'
                ? this.iconLabel('⏳', localize('export.publish.publishing'))
                : info
                  ? this.iconLabel('🔄', localize('export.publish.update'))
                  : this.iconLabel('🚀', localize('export.publish.publish'))}
            </button>
            ${info ? html`
              <button class="btn-action danger" ?disabled=${!!this.busy} @click=${this.unpublishPlan}>
                ${this.busy === 'unpublish'
                  ? this.iconLabel('⏳', localize('export.publish.unpublishing'))
                  : this.iconLabel('🗑️', unpublishLabel)}
              </button>
            ` : null}
          </div>
        ` : html`<p class="hint">${localize('export.publish.admin_only')}</p>`}

        ${this.publishError
          ? this.renderBanner('error', '⚠️', this.describeError(this.publishError.error, this.publishError.withBackground), 'alert')
          : null}
      </section>
    `;
  }

  private renderFrameSection() {
    const frame = this.frame;
    if (!frame) return null;
    const oneDecimal = { minimumFractionDigits: 1, maximumFractionDigits: 1 };
    const width = formatNumber(frame.maxX - frame.minX, oneDecimal);
    const height = formatNumber(frame.maxY - frame.minY, oneDecimal);
    return html`
      <section class="section" aria-labelledby="export-frame-title">
        <h3 class="section-title" id="export-frame-title">
          <span class="section-num" aria-hidden="true">2</span><span>${localize('export.frame.title')}</span>
        </h3>
        <p class="hint">
          ${localize('export.frame.hint', { width, height })}
          ${localize(this.isFrameFrozen ? 'export.frame.frozen' : 'export.frame.not_frozen')}
        </p>

        ${this.publishInfo && !this.isFrameFrozen ? this.renderBanner('warning', '📐', localize('export.frame.not_kept')) : null}
        ${this.outOfFrame ? this.renderBanner('warning', '📐', localize('export.frame.out_of_frame')) : null}
        ${this.frameStale ? this.renderBanner('warning', '🔁', localize('export.frame.stale')) : null}

        ${this.renderConfirm('reframe')}

        ${this.canEdit && this.isFrameFrozen ? html`
          <div class="actions-row">
            <button class="btn-action ghost" ?disabled=${!!this.busy || (!!this.publishInfo && !this.isSavedOnServer)} @click=${this.reframe}>
              ${this.iconLabel('📐', localize(this.publishInfo ? 'export.frame.reframe_and_publish' : 'export.frame.reframe'))}
            </button>
          </div>
        ` : null}
      </section>
    `;
  }

  private renderCode(yaml: string, target: CopyTarget, title: string) {
    const copied = this.copied === target;
    return html`
      <div class="code-container">
        <div class="code-header">
          <span>${title}</span>
          <button class="btn-copy ${copied ? 'copied' : ''}" @click=${() => this.copyText(yaml, target)}>
            ${copied
              ? html`<span class="copied-mark" aria-hidden="true">✓</span><span>${localize('export.code.copied')}</span>`
              : this.iconLabel('📋', localize('export.code.copy'))}
          </button>
        </div>
        <pre class="code-box" tabindex="0" role="region" aria-label=${title}><code>${yaml}</code></pre>
      </div>
    `;
  }

  private renderGuide(icon: string, title: string, steps: Array<Array<string | TemplateResult>>) {
    return html`
      <div class="guide-box">
        <h3 class="guide-title">${this.iconLabel(icon, title)}</h3>
        <ol class="guide-steps" role="list">
          ${steps.map((step, i) => html`
            <li class="guide-step">
              <span class="guide-num" aria-hidden="true">${formatNumber(i + 1)}</span>
              <div>${step}</div>
            </li>
          `)}
        </ol>
      </div>
    `;
  }

  private renderPictureElementsTab() {
    const hasBindings = (this.project.bindings || []).length > 0;
    return html`
      ${this.renderSaveState()}
      ${this.renderPublishSection()}
      ${this.renderFrameSection()}

      <section class="section" aria-labelledby="export-code-title">
        <h3 class="section-title" id="export-code-title">
          <span class="section-num" aria-hidden="true">3</span><span>${localize('export.code.title')}</span>
        </h3>
        ${this.pictureYaml ? html`
          ${!hasBindings ? html`<p class="hint">${richText('export.code.no_entities')}</p>` : null}
          ${this.renderCode(this.pictureYaml, 'picture', localize('export.code.picture_title'))}
        ` : html`
          <p class="hint">${localize('export.code.publish_first')}</p>
        `}
      </section>

      ${this.renderGuide('💡', localize('export.guide.picture_title'), [
        richText('export.guide.picture_step1'),
        richText('export.guide.picture_step2', { button: localize('export.code.copy') }),
        richText('export.guide.picture_step3'),
        richText('export.guide.picture_step4', { button: localize('export.publish.update') }),
      ])}
    `;
  }

  private renderCustomCardTab() {
    const is2d = this.customCardViewMode === '2d';
    return html`
      ${this.renderSaveState()}

      <div class="guide-box">
        <h3 class="guide-title">${this.iconLabel('✨', localize('export.card.intro_title'))}</h3>
        <p class="guide-text">${richText('export.card.intro')}</p>
      </div>

      <div class="config-row">
        <span class="config-label" id="export-view-mode-label">${localize('export.card.view_mode')}</span>
        <div class="actions-row" role="group" aria-labelledby="export-view-mode-label">
          <button
            class="btn-action ${is2d ? '' : 'ghost'}"
            aria-pressed=${is2d ? 'true' : 'false'}
            @click=${() => { this.customCardViewMode = '2d'; }}
          >
            ${this.iconLabel('📐', localize('export.card.view_2d'))}
          </button>
          <button
            class="btn-action ${is2d ? 'ghost' : ''}"
            aria-pressed=${is2d ? 'false' : 'true'}
            @click=${() => { this.customCardViewMode = '3d'; }}
          >
            ${this.iconLabel('🧊', localize('export.card.view_3d'))}
          </button>
        </div>
      </div>

      ${this.renderCode(this.cardYaml, 'card', localize('export.code.card_title'))}

      ${this.renderGuide('🚀', localize('export.guide.card_title'), [
        richText('export.guide.card_step1'),
        richText('export.guide.card_step2'),
      ])}
    `;
  }

  private renderFilesTab() {
    return html`
      <div class="config-row">
        <div>
          <div class="config-label">${localize('export.files.svg_title')}</div>
          <div class="hint">${localize('export.files.svg_hint')}</div>
          ${this.hasEmbeddableBackground ? html`
            <label class="check-row spaced">
              <input
                type="checkbox"
                .checked=${this.downloadWithBackground}
                @change=${(e: Event) => { this.downloadWithBackground = (e.target as HTMLInputElement).checked; }}
              />
              <span class="hint">${localize('export.include_background')}</span>
            </label>
          ` : null}
        </div>
        <button class="btn-action" ?disabled=${!!this.busy} @click=${this.downloadSvg}>
          ${this.iconLabel('📐', localize(this.busy === 'svg' ? 'export.files.preparing' : 'export.files.download_svg'))}
        </button>
      </div>

      <div class="config-row">
        <div>
          <div class="config-label">${localize('export.files.backup_title')}</div>
          <div class="hint">${localize('export.files.backup_hint')}</div>
        </div>
        <button class="btn-action" ?disabled=${!!this.busy} @click=${this.downloadBackup}>
          ${this.iconLabel('💾', localize(this.busy === 'backup' ? 'export.files.preparing' : 'export.files.download_backup'))}
        </button>
      </div>
    `;
  }

  private renderTab(tab: (typeof TABS)[number]) {
    const selected = this.activeTab === tab.id;
    return html`
      <button
        class="tab-btn"
        role="tab"
        id="export-tab-${tab.id}"
        aria-selected=${selected ? 'true' : 'false'}
        aria-controls="export-tabpanel"
        tabindex=${selected ? '0' : '-1'}
        @click=${() => { void this.selectTab(tab.id); }}
      >
        ${this.iconLabel(tab.icon, localize(tab.labelKey))}
      </button>
    `;
  }

  render() {
    if (!this.project) return null;
    const summary = this.getEntitySummary();
    const footerYaml = this.activeTab === 'picture_elements' ? this.pictureYaml : this.activeTab === 'custom_card' ? this.cardYaml : '';
    const footerTarget: CopyTarget = this.activeTab === 'custom_card' ? 'card' : 'picture';
    const footerCopied = this.copied === footerTarget;
    const closeLabel = localize(this.isWriting ? 'export.close_busy' : 'export.close');
    const notice = this.notice;

    return html`
      <div
        class="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-title"
        aria-describedby="export-subtitle"
        tabindex="-1"
        @click=${(e: Event) => e.stopPropagation()}
      >
        <!-- En-tête -->
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon" aria-hidden="true">📤</span>
            <div>
              <h2 class="modal-title" id="export-title">${localize('export.title')}</h2>
              <p class="modal-subtitle" id="export-subtitle">${localize('export.subtitle')}</p>
            </div>
          </div>
          <button class="btn-close" ?disabled=${this.isWriting} @click=${this.handleClose} aria-label=${closeLabel} title=${closeLabel}>
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <!-- Onglets -->
        <div class="tabs-nav" role="tablist" aria-label=${localize('export.tabs_label')} @keydown=${this.handleTabKeydown}>
          ${TABS.map(tab => this.renderTab(tab))}
        </div>

        <!-- Corps de la modale -->
        <div class="modal-body">
          <!-- Résumé des entités liées -->
          <div class="stats-row" role="list" aria-label=${localize('export.stats.label')}>
            ${this.renderStat('🏠', 'export.stats.rooms', summary.rooms, true)}
            ${this.renderStat('💡', 'export.stats.lights', summary.lights)}
            ${this.renderStat('📡', 'export.stats.radars', summary.radars)}
            ${this.renderStat('🌡️', 'export.stats.sensors', summary.sensors)}
            ${this.renderStat('🔌', 'export.stats.switches', summary.switches)}
            ${summary.furniture > 0 ? this.renderStat('🛋️', 'export.stats.furniture', summary.furniture) : null}
          </div>

          ${this.manualCopyText !== null ? this.renderBanner('info', '📋', html`
            <div>${localize('export.copy.manual')}</div>
            <textarea class="manual-copy" readonly aria-label=${localize('export.copy.manual_label')} .value=${this.manualCopyText}></textarea>
            <div class="actions-row">
              <button class="btn-secondary" @click=${() => { this.manualCopyText = null; }}>${localize('export.close')}</button>
            </div>
          `) : null}

          <div class="tab-panel" role="tabpanel" id="export-tabpanel" aria-labelledby="export-tab-${this.activeTab}">
            ${this.activeTab === 'picture_elements' ? this.renderPictureElementsTab() : null}
            ${this.activeTab === 'custom_card' ? this.renderCustomCardTab() : null}
            ${this.activeTab === 'raw_files' ? this.renderFilesTab() : null}
          </div>
        </div>

        <!-- Notification flottante (région toujours présente pour être annoncée) -->
        <div class="toast-region" role="status" aria-live="polite" aria-atomic="true">
          ${notice ? html`
            <div class="floating-toast ${notice.kind}">
              <span aria-hidden="true">${notice.kind === 'error' ? '⚠️' : notice.kind === 'success' ? '✅' : 'ℹ️'}</span>
              <span>${notice.text}</span>
            </div>
          ` : null}
        </div>

        <!-- Pied de page -->
        <div class="modal-footer">
          <button class="btn-secondary" ?disabled=${this.isWriting} @click=${this.handleClose}>${localize('export.close')}</button>
          ${footerYaml ? html`
            <button
              class="btn-action large"
              @click=${() => this.copyText(footerYaml, footerTarget)}
            >
              ${this.iconLabel(footerCopied ? '✓' : '📋', localize(footerCopied ? 'export.copy.footer_done' : 'export.copy.footer'))}
            </button>
          ` : null}
        </div>
      </div>
    `;
  }
}

defineElement('home-architect-export-modal', HomeArchitectExportModal);

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-export-modal': HomeArchitectExportModal;
  }
}
