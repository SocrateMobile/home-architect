import { LitElement, html, css, svg, nothing, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { defineElement } from '../core/define';
import { getEventTarget, isEditableTarget } from '../core/keyboard';
import { MAX_UPLOAD_BYTES, compressRasterImage, readFileAsText } from '../core/image-utils';
import { generateProjectId, normalizeProject } from '../core/project-model';
import { DEFAULT_LEVEL, getLevelLabel } from '../core/levels';
import { HomeArchitectProject } from '../core/types';
import {
  SvgAnalysis, SvgBox, SvgDetection, SvgIgnoredRoom, SvgParseOptions, SvgParseResult, SvgPlanParser, decodeSvgBytes
} from '../core/svg-parser';
import { LocalizeController, formatNumber, getLanguage, localize } from '../i18n';
import '../i18n/locales/import';
import { applyColorScheme, uiThemeStyles } from '../styles/theme.styles';

/**
 * Image de fond prête à téléverser (SPEC §6) : image raster déjà redimensionnée et recompressée, ou
 * SVG nettoyé (sans DOCTYPE, viewBox garantie). Le panneau la téléverse puis n'en garde que l'assetId.
 */
export interface ImportModalBackground {
  blob: Blob;
  mimeType: string;
  /** Taille du calque : pixels de l'image, ou unités de la viewBox pour un SVG (alignement des murs, F72). */
  widthPx: number;
  heightPx: number;
  isSvg: boolean;
}

/** Détail de `import-confirmed`. */
export interface ImportModalResult {
  background?: ImportModalBackground;
  opacity: number;
  mode: 'auto_dimension' | 'interactive_calibrate';
  totalWidthMeters?: number;
  /**
   * Mètres réels par pixel du calque (`widthPx`) : la largeur saisie est rapportée à l'emprise des murs
   * pour un SVG, à l'image entière pour une image raster (F70). Le panneau règle
   * background.scale = metersPerPixel × pixelsPerMeter du projet, sans changer pixelsPerMeter (F71).
   * Absent en étalonnage par mesure de mur.
   */
  metersPerPixel?: number;
  targetLevel?: string;
  // Données de vectorisation SVG
  isSvgVectorized?: boolean;
  svgInterpretation?: SvgParseResult;
  keepSvgBackground?: boolean;
}

/** Détail de `import-project-backup` : sauvegarde complète normalisée, sous un nouvel identifiant (F112). */
export interface ImportProjectBackupDetail {
  project: HomeArchitectProject;
}

/** Texte affiché, recalculé à chaque rendu : il suit la langue courante même s'il a été produit avant. */
type Text = () => string;

type ImportCategory = 'importWalls' | 'importDoors' | 'importWindows' | 'importRooms' | 'importLabels';

interface RasterSource {
  kind: 'raster';
  /** Nom du fichier, ou nom générique traduit (image collée…). */
  name: Text;
  background: ImportModalBackground;
  /** Taille du fichier d'origine (avant compression). */
  originalBytes: number;
  previewUrl: string;
}

interface SvgSource {
  kind: 'svg';
  name: Text;
  analysis: SvgAnalysis;
  background: ImportModalBackground;
  previewUrl: string;
  /** Le SVG nettoyé respecte la limite de téléversement : il peut servir de calque. */
  canKeepBackground: boolean;
}

interface ProjectSource {
  kind: 'project';
  name: Text;
  project: HomeArchitectProject;
  /** La sauvegarde référençait une image du serveur sans l'embarquer : le plan est importé sans fond. */
  droppedBackground: boolean;
}

type LoadedSource = RasterSource | SvgSource | ProjectSource;

type FileKind = 'svg' | 'raster' | 'json' | 'pdf' | 'unknown';

/** Erreur destinée à l'utilisateur, dont le message est traduit au moment de l'affichage. */
class ImportError extends Error {
  public readonly text: Text;

  constructor(text: Text) {
    super(text());
    this.name = 'ImportError';
    this.text = text;
  }
}

const SVG_MIME = 'image/svg+xml';
/** Plafonds de lecture : au-delà, le navigateur risque de saturer la mémoire pour rien. */
const MAX_RASTER_INPUT_BYTES = 40 * 1024 * 1024;
const MAX_SVG_INPUT_BYTES = 25 * 1024 * 1024;
const MAX_BACKUP_BYTES = 40 * 1024 * 1024;
/** Largeur réelle admise (m) pour l'étalonnage par la largeur. */
const MIN_WIDTH_METERS = 0.5;
const MAX_WIDTH_METERS = 1000;
/** La reconnaissance est relancée après une pause de frappe, jamais à chaque touche (F73). */
const DETECT_DEBOUNCE_MS = 300;
const DEFAULT_WALL_THICKNESS = 0.2;
const DEFAULT_WALL_HEIGHT = 2.5;
/** Éléments dessinés au plus dans l'aperçu (par type). */
const PREVIEW_MAX_ITEMS = 4000;
/** Formes écartées citées nommément sous l'aperçu. */
const IGNORED_ROOMS_SHOWN = 6;
const RASTER_EXTENSION_RE = /\.(png|jpe?g|jfif|webp|gif|bmp|avif|heic|heif)$/;
const DOOR_TYPES = new Set(['door', 'double_door', 'sliding_door']);
/** Éléments atteignables au clavier (piège de focus de la modale). */
const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'a[href]',
  '[tabindex]:not([tabindex="-1"])'
].join(', ');

function fileKind(file: Blob, name: string): FileKind {
  const lower = name.toLowerCase();
  const type = (file.type || '').toLowerCase();
  if (type === SVG_MIME || lower.endsWith('.svg')) return 'svg';
  if (type === 'application/json' || lower.endsWith('.json')) return 'json';
  if (type === 'application/pdf' || lower.endsWith('.pdf')) return 'pdf';
  if (type.startsWith('image/') || RASTER_EXTENSION_RE.test(lower)) return 'raster';
  return 'unknown';
}

/** Code SVG brut (collage ou dépôt de texte). */
function looksLikeSvg(text: string | null | undefined): text is string {
  if (!text) return false;
  const t = text.trimStart();
  if (t.startsWith('<svg')) return true;
  return (t.startsWith('<?xml') || t.startsWith('<!DOCTYPE') || t.startsWith('<!--')) && t.includes('<svg');
}

/** Nombre décimal saisi (virgule ou point acceptés), ou null si la saisie n'est pas un nombre fini. */
function parseDecimal(text: string): number | null {
  const t = text.trim().replace(',', '.');
  if (t === '') return null;
  const v = Number(t);
  return Number.isFinite(v) ? v : null;
}

/** Taille de fichier dans la langue courante (Ko / KB, Mo / MB). */
function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return localize('import.unit.kb', { value: formatNumber(Math.max(1, Math.round(bytes / 1024))) });
  return localize('import.unit.mb', { value: formatNumber(bytes / (1024 * 1024), { maximumFractionDigits: 1 }) });
}

function formatMeters(v: number): string {
  return formatNumber(v, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Libellé avec un nombre : clé `<key>_one` ou `<key>_other` selon les règles de pluriel de la langue
 * courante (en français, 0 et 1 prennent le singulier). Le marqueur `{count}` reçoit le nombre formaté.
 */
function plural(key: string, count: number, params: Record<string, string | number> = {}): string {
  const form = new Intl.PluralRules(getLanguage()).select(count) === 'one' ? 'one' : 'other';
  return localize(`${key}_${form}`, { ...params, count: formatNumber(count) });
}

/** Message affichable d'une erreur : traduit au rendu pour une ImportError, tel quel sinon. */
function errorText(err: unknown): Text {
  if (err instanceof ImportError) return err.text;
  const message = err instanceof Error ? err.message : String(err);
  return () => message;
}

/**
 * Attend une opération de bas niveau (lecture, décodage) et remplace son éventuel message technique,
 * non traduit, par un message clair dans la langue de l'utilisateur (le détail reste dans la console).
 */
async function withUserMessage<T>(operation: Promise<T>, key: string): Promise<T> {
  try {
    return await operation;
  } catch (err) {
    console.warn('[home-architect] import:', err);
    throw new ImportError(() => localize(key));
  }
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/** Champs qui ne reçoivent pas de texte (cases, curseur, fichier) : le collage d'un plan y reste possible. */
const NON_TEXT_INPUT_TYPES = new Set(['checkbox', 'radio', 'range', 'file', 'button', 'submit', 'reset', 'color', 'image']);

/** L'événement vise un champ de saisie de texte (collage et dépôt de texte natifs à préserver). */
function isTextEntryEvent(e: Event): boolean {
  const target = getEventTarget(e);
  if (target instanceof HTMLInputElement && NON_TEXT_INPUT_TYPES.has(target.type)) return false;
  return isEditableTarget(e);
}

function hasFiles(e: DragEvent): boolean {
  return Array.from(e.dataTransfer?.types ?? []).includes('Files');
}

/** Premier fichier d'un presse-papier (image copiée, fichier copié depuis l'explorateur). */
function clipboardFile(data: DataTransfer): File | null {
  if (data.files && data.files.length > 0) return data.files[0];
  for (const item of Array.from(data.items ?? [])) {
    if (item.kind !== 'file') continue;
    const file = item.getAsFile();
    if (file) return file;
  }
  return null;
}

/** Élément qui a le focus, en traversant les racines fantômes (bouton de la barre d'outils, canevas…). */
function deepActiveElement(): HTMLElement | null {
  let active: Element | null = document.activeElement;
  while (active?.shadowRoot?.activeElement) active = active.shadowRoot.activeElement;
  return active instanceof HTMLElement && active !== document.body ? active : null;
}

/**
 * Sauvegarde JSON complète (modale d'export) → nouveau plan : schéma normalisé, nouvel identifiant,
 * sans champs serveur. Une image de fond référencée sur le serveur sans être embarquée appartient au
 * plan d'origine et ne peut pas être reprise : elle est retirée (et signalée).
 */
function projectFromBackup(text: string): { project: HomeArchitectProject; droppedBackground: boolean } {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    throw new ImportError(() => localize('import.error.json_syntax'));
  }
  const looksLikeProject = isRecord(raw) && ['walls', 'rooms', 'openings', 'bindings', 'furniture'].some(k => Array.isArray(raw[k]));
  if (!looksLikeProject) throw new ImportError(() => localize('import.error.not_backup'));
  const now = new Date().toISOString();
  const project: HomeArchitectProject = { ...normalizeProject(raw), id: generateProjectId(), created_at: now, updated_at: now };
  delete project.revision;
  delete project.publish;
  let droppedBackground = false;
  if (project.background && !project.background.imageUrl) {
    delete project.background;
    droppedBackground = true;
  } else if (project.background) {
    // Image embarquée (ou URL externe) : un assetId restant désignerait l'image du plan d'origine.
    delete project.background.assetId;
  }
  return { project, droppedBackground };
}

function describeIgnoredRoom(room: SvgIgnoredRoom): string {
  const name = room.name || localize('import.notes.ignored_unnamed');
  return room.reason === 'self_intersecting'
    ? localize('import.notes.ignored_self_intersecting', { name })
    : localize('import.notes.ignored_area', { name, area: formatNumber(room.areaM2, { maximumFractionDigits: 2 }) });
}

export class HomeArchitectImportModal extends LitElement {
  /**
   * Styles de la modale. Couleurs : jetons --arch-ui-* (thème HA, palettes claire et sombre). Les teintes
   * sémantiques (vectorisation, portes, fenêtres, alertes) ne servent qu'aux bordures et aux fonds
   * translucides : les textes restent en --arch-ui-text / --arch-ui-text-muted, lisibles dans les deux thèmes.
   */
  static styles = [uiThemeStyles, css`
    :host {
      --import-magic: #a855f7;
      --import-magic-tint: rgba(168, 85, 247, 0.14);
      --import-label-color: #ec4899;
      --import-label-tint: rgba(236, 72, 153, 0.12);
      --import-accent-tint: rgba(3, 169, 244, 0.12);
      --import-danger-tint: rgba(219, 68, 55, 0.12);
      --import-warning-tint: rgba(255, 166, 0, 0.14);
      --import-success-tint: rgba(67, 160, 71, 0.14);
      /* Un plan d'architecte est dessiné pour du papier : l'aperçu garde un fond clair dans les deux thèmes. */
      --import-paper: #ffffff;
      --import-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.45);

      position: fixed;
      inset: 0;
      background: var(--arch-ui-overlay);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--arch-ui-font);
      color: var(--arch-ui-text);
      animation: fadeIn 0.2s ease-out;
    }

    /* Teintes dérivées des couleurs du thème quand le navigateur sait les mélanger. */
    @supports (color: color-mix(in srgb, red 50%, blue)) {
      :host {
        --import-accent-tint: color-mix(in srgb, var(--arch-ui-accent) 12%, transparent);
        --import-danger-tint: color-mix(in srgb, var(--arch-ui-danger) 12%, transparent);
        --import-warning-tint: color-mix(in srgb, var(--arch-ui-warning) 14%, transparent);
        --import-success-tint: color-mix(in srgb, var(--arch-ui-success) 14%, transparent);
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-card {
      background: var(--arch-ui-surface);
      color: var(--arch-ui-text);
      border: 1px solid var(--arch-ui-border);
      border-radius: var(--arch-ui-radius);
      width: 620px;
      max-width: 94vw;
      max-height: 92vh;
      display: flex;
      flex-direction: column;
      box-shadow: var(--import-shadow);
      overflow: hidden;
    }

    /* Focus initial sur la boîte de dialogue elle-même : pas d'anneau, l'ombre reste celle de la carte. */
    .modal-card:focus,
    .modal-card:focus-visible {
      outline: none;
      box-shadow: var(--import-shadow);
    }

    .modal-header {
      padding: 18px 24px;
      border-bottom: 1px solid var(--arch-ui-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
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

    button {
      font-family: inherit;
    }

    .btn-close {
      flex: none;
      background: transparent;
      border: none;
      color: var(--arch-ui-text-muted);
      font-size: 20px;
      line-height: 1;
      cursor: pointer;
      padding: 6px;
      border-radius: 6px;
      transition: background-color 0.15s ease, color 0.15s ease;
    }

    .btn-close:hover {
      color: var(--arch-ui-text);
      background: var(--arch-ui-surface-2);
    }

    .modal-body {
      padding: 22px 24px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    /* Zone de dépôt (glisser-déposer) */
    .drop-zone {
      border: 2px dashed var(--arch-ui-border);
      background: var(--arch-ui-bg);
      border-radius: 14px;
      padding: 24px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      cursor: pointer;
      transition: border-color 0.2s ease, background-color 0.2s ease;
      position: relative;
    }

    .drop-zone:hover,
    .drop-zone.dragover {
      border-color: var(--arch-ui-accent);
      background: var(--import-accent-tint);
    }

    .drop-icon {
      font-size: 2.4rem;
    }

    .drop-text {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--arch-ui-text);
    }

    .drop-subtext {
      font-size: 0.8rem;
      color: var(--arch-ui-text-muted);
    }

    .drop-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 4px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .btn-action-small {
      background: var(--arch-ui-surface-2);
      color: var(--arch-ui-text);
      border: 1px solid var(--arch-ui-border);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: border-color 0.2s ease;
    }

    .btn-action-small:hover {
      border-color: var(--arch-ui-accent);
    }

    /* Aperçu du plan chargé */
    .preview-card {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 12px;
      padding: 12px;
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .preview-thumb {
      width: 100px;
      height: 75px;
      border-radius: 8px;
      object-fit: contain;
      border: 1px solid var(--arch-ui-border);
      background: var(--import-paper);
    }

    .preview-meta {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .preview-title {
      font-size: 0.92rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      overflow-wrap: anywhere;
    }

    .preview-badge {
      font-size: 0.72rem;
      padding: 2px 7px;
      background: var(--import-magic-tint);
      color: var(--arch-ui-text);
      border: 1px solid var(--import-magic);
      border-radius: 9999px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .preview-dimensions {
      font-size: 0.8rem;
      color: var(--arch-ui-text-muted);
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .btn-change-image {
      background: transparent;
      border: 1px solid var(--arch-ui-border);
      color: var(--arch-ui-text-muted);
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 0.75rem;
      cursor: pointer;
      width: fit-content;
      margin-top: 4px;
      flex: none;
    }

    .btn-change-image:hover {
      color: var(--arch-ui-text);
      border-color: var(--arch-ui-text-muted);
    }

    /* Interprétation vectorielle (SVG) */
    .svg-interpret-box {
      background: var(--import-magic-tint);
      border: 1.5px solid var(--import-magic);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .svg-box-header {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .svg-box-icon {
      font-size: 1.5rem;
    }

    .svg-box-title {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      overflow-wrap: anywhere;
    }

    .svg-box-subtitle {
      font-size: 0.8rem;
      color: var(--arch-ui-text-muted);
      margin-top: 2px;
    }

    .svg-mode-selector {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .svg-choice-card {
      background: var(--arch-ui-surface);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 12px 14px;
      cursor: pointer;
      display: flex;
      gap: 12px;
      align-items: flex-start;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .svg-choice-card:hover {
      border-color: var(--import-magic);
    }

    .svg-choice-card.selected {
      border-color: var(--import-magic);
      box-shadow: inset 0 0 0 1px var(--import-magic);
    }

    .svg-choice-radio {
      margin-top: 3px;
      accent-color: var(--import-magic);
    }

    .svg-choice-content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .svg-choice-title {
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      cursor: pointer;
    }

    .badge-magic {
      font-size: 0.7rem;
      padding: 2px 7px;
      background: var(--import-magic-tint);
      color: var(--arch-ui-text);
      border: 1px solid var(--import-magic);
      border-radius: 9999px;
      font-weight: 700;
    }

    .svg-choice-desc {
      font-size: 0.78rem;
      color: var(--arch-ui-text-muted);
      line-height: 1.35;
    }

    .svg-pills-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin: 4px 0 0;
      padding: 0;
      list-style: none;
    }

    .stat-pill {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 4px;
      color: var(--arch-ui-text);
      border: 1px solid var(--arch-ui-border);
    }

    .stat-pill.wall {
      background: var(--import-accent-tint);
      border-color: var(--arch-ui-accent);
    }

    .stat-pill.door {
      background: var(--import-warning-tint);
      border-color: var(--arch-ui-warning);
    }

    .stat-pill.window {
      background: var(--import-success-tint);
      border-color: var(--arch-ui-success);
    }

    .stat-pill.room {
      background: var(--import-magic-tint);
      border-color: var(--import-magic);
    }

    .stat-pill.label {
      background: var(--import-label-tint);
      border-color: var(--import-label-color);
    }

    .checkbox-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 6px;
      font-size: 0.8rem;
      color: var(--arch-ui-text);
    }

    .checkbox-wrap input {
      accent-color: var(--import-magic);
      cursor: pointer;
    }

    .checkbox-wrap label {
      cursor: pointer;
    }

    /* Cases à cocher des éléments et des calques à importer */
    .import-categories-box {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 10px 12px;
      margin-top: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .categories-title {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .categories-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .category-toggle {
      background: var(--arch-ui-surface);
      border: 1px solid var(--arch-ui-border);
      border-radius: 8px;
      padding: 5px 10px;
      font-size: 0.82rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--arch-ui-text-muted);
      transition: border-color 0.15s ease, background-color 0.15s ease;
      user-select: none;
    }

    .category-toggle:hover {
      border-color: var(--import-magic);
      color: var(--arch-ui-text);
    }

    .category-toggle.active {
      background: var(--import-magic-tint);
      border-color: var(--import-magic);
      color: var(--arch-ui-text);
      font-weight: 600;
    }

    .category-toggle input[type="checkbox"] {
      accent-color: var(--import-magic);
      cursor: pointer;
      margin: 0;
    }

    .cat-count {
      font-size: 0.75rem;
      color: var(--arch-ui-text-muted);
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    /* Notes : information, avertissement, erreur (texte du thème sur fond teinté) */
    .ignored-note,
    .warn-note,
    .error-box {
      color: var(--arch-ui-text);
      line-height: 1.4;
      border: 1px solid;
    }

    .ignored-note,
    .warn-note {
      font-size: 0.76rem;
      border-radius: 6px;
      padding: 5px 8px;
      margin-top: 4px;
    }

    .ignored-note {
      background: var(--import-accent-tint);
      border-color: var(--arch-ui-accent);
    }

    .warn-note {
      background: var(--import-warning-tint);
      border-color: var(--arch-ui-warning);
    }

    .error-box {
      font-size: 0.82rem;
      background: var(--import-danger-tint);
      border-color: var(--arch-ui-danger);
      border-radius: 10px;
      padding: 10px 12px;
    }

    /* Méthode d'étalonnage */
    .section-title {
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .calibrate-options {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .option-card {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 12px 14px;
      cursor: pointer;
      display: flex;
      gap: 12px;
      align-items: flex-start;
      transition: border-color 0.2s ease, background-color 0.2s ease;
    }

    .option-card:hover {
      border-color: var(--arch-ui-accent);
    }

    .option-card.selected {
      border-color: var(--arch-ui-accent);
      background: var(--import-accent-tint);
      box-shadow: inset 0 0 0 1px var(--arch-ui-accent);
    }

    .option-card.static {
      cursor: default;
    }

    .option-radio {
      margin-top: 3px;
      cursor: pointer;
      accent-color: var(--arch-ui-accent);
    }

    .option-content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .option-title {
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      cursor: pointer;
    }

    .option-badge {
      font-size: 0.7rem;
      padding: 2px 6px;
      background: var(--import-success-tint);
      color: var(--arch-ui-text);
      border-radius: 9999px;
      border: 1px solid var(--arch-ui-success);
      font-weight: 600;
    }

    .option-desc {
      font-size: 0.78rem;
      color: var(--arch-ui-text-muted);
      line-height: 1.35;
    }

    .input-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 8px;
      flex-wrap: wrap;
    }

    .input-label {
      font-size: 0.82rem;
      color: var(--arch-ui-text-muted);
    }

    .dimension-input {
      background: var(--arch-ui-surface);
      border: 1px solid var(--arch-ui-border);
      border-radius: 6px;
      color: var(--arch-ui-text);
      padding: 6px 10px;
      font: inherit;
      font-size: 0.95rem;
      font-weight: 700;
      width: 100px;
      text-align: center;
      outline: none;
    }

    .dimension-input:focus {
      border-color: var(--arch-ui-accent);
      box-shadow: var(--arch-ui-focus-ring);
    }

    .dimension-input.invalid {
      border-color: var(--arch-ui-danger);
    }

    .unit-tag {
      font-size: 0.85rem;
      color: var(--arch-ui-text-muted);
      font-weight: 600;
    }

    .field-error {
      color: var(--arch-ui-text);
      font-size: 0.8rem;
      font-weight: 600;
      margin-top: 6px;
      padding-left: 8px;
      border-left: 3px solid var(--arch-ui-danger);
    }

    .footprint-info {
      font-size: 0.76rem;
      color: var(--arch-ui-text-muted);
      margin-top: 6px;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    /* Calque & opacité */
    .slider-row {
      display: flex;
      align-items: center;
      gap: 14px;
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 10px 14px;
    }

    .slider-label {
      font-size: 0.82rem;
      color: var(--arch-ui-text);
      min-width: 130px;
    }

    .slider-input {
      flex: 1;
      min-width: 0;
      cursor: pointer;
      accent-color: var(--arch-ui-accent);
    }

    .slider-val {
      font-size: 0.82rem;
      color: var(--arch-ui-text);
      font-weight: 700;
      min-width: 44px;
      text-align: right;
    }

    .modal-footer {
      padding: 16px 24px;
      border-top: 1px solid var(--arch-ui-border);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
    }

    .footer-note {
      margin-right: auto;
      font-size: 0.78rem;
      color: var(--arch-ui-text-muted);
    }

    .btn-cancel {
      background: transparent;
      color: var(--arch-ui-text);
      border: 1px solid var(--arch-ui-border);
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 0.88rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .btn-cancel:hover {
      background: var(--arch-ui-surface-2);
    }

    .btn-confirm {
      background: var(--arch-ui-accent);
      color: var(--arch-ui-accent-text);
      border: 1px solid var(--arch-ui-accent);
      border-radius: 8px;
      padding: 8px 20px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: filter 0.2s ease;
    }

    /* Dégradé violet → bleu foncés : texte blanc lisible dans les deux thèmes. */
    .btn-confirm.btn-magic {
      background: linear-gradient(135deg, #7e22ce 0%, #2563eb 100%);
      border-color: var(--import-magic);
      color: #ffffff;
    }

    .btn-confirm:hover:not(:disabled) {
      filter: brightness(1.08);
    }

    .btn-confirm:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .file-input {
      display: none;
    }

    /*
     * Région annoncée aux lecteurs d'écran, toujours présente : une région live insérée avec son texte
     * n'est pas lue de façon fiable. Hors du flux (position absolue) : elle ne crée aucun espacement.
     */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      border: 0;
      overflow: hidden;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      white-space: nowrap;
    }

    /* Anneau de focus en contour pour les commandes natives (certains navigateurs ignorent leur ombre). */
    input[type='checkbox']:focus-visible,
    input[type='radio']:focus-visible,
    input[type='range']:focus-visible {
      outline: 2px solid var(--arch-ui-accent);
      outline-offset: 2px;
      box-shadow: none;
    }

    .preview-card.column {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
    }

    .preview-card.dragover {
      border-color: var(--arch-ui-accent);
      box-shadow: inset 0 0 0 1px var(--arch-ui-accent);
    }

    .preview-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }

    .preview-icon {
      font-size: 2rem;
    }

    .preview-figure {
      height: 220px;
      background: var(--import-paper);
      border: 1px solid var(--arch-ui-border);
      border-radius: 8px;
      overflow: hidden;
    }

    .preview-figure svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    /* Éléments détectés superposés au plan (toujours sur fond papier clair) */
    .ov-wall {
      stroke: #0284c7;
      stroke-width: 3px;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
    }

    .ov-opening {
      stroke-width: 5px;
      vector-effect: non-scaling-stroke;
    }

    .ov-opening.door {
      stroke: #d97706;
    }

    .ov-opening.window {
      stroke: #059669;
    }

    .ov-room {
      fill: rgba(168, 85, 247, 0.18);
      stroke: rgba(147, 51, 234, 0.75);
      stroke-width: 1px;
      vector-effect: non-scaling-stroke;
    }

    .ov-footprint {
      fill: none;
      stroke: #dc2626;
      stroke-width: 1.5px;
      stroke-dasharray: 6 4;
      vector-effect: non-scaling-stroke;
    }

    .preview-legend {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 0;
      padding: 0;
      list-style: none;
      font-size: 0.72rem;
      color: var(--arch-ui-text-muted);
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .swatch {
      display: inline-block;
      width: 14px;
      height: 4px;
      border-radius: 2px;
    }

    .swatch.wall { background: #0284c7; }
    .swatch.door { background: #d97706; }
    .swatch.window { background: #059669; }
    .swatch.room { background: rgba(147, 51, 234, 0.75); height: 8px; }
    .swatch.footprint { background: transparent; border-top: 2px dashed #dc2626; height: 0; }

    .busy-box {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.85rem;
      color: var(--arch-ui-text);
      background: var(--import-accent-tint);
      border: 1px solid var(--arch-ui-accent);
      border-radius: 10px;
      padding: 10px 12px;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid var(--arch-ui-border);
      border-top-color: var(--arch-ui-accent);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      flex-shrink: 0;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .category-toggle.disabled,
    .svg-choice-card.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .category-toggle.disabled input,
    .svg-choice-card.disabled .svg-choice-title {
      cursor: not-allowed;
    }

    @media (prefers-reduced-motion: reduce) {
      :host,
      .spinner {
        animation: none;
      }
    }

    /* Téléphone : la modale occupe tout l'écran, le contenu défile entre l'en-tête et le pied. */
    @media (max-width: 600px) {
      .modal-card {
        width: 100%;
        max-width: 100%;
        height: 100%;
        max-height: 100%;
        border: none;
        border-radius: 0;
      }

      .modal-header,
      .modal-footer {
        padding: 12px 16px;
      }

      .modal-body {
        padding: 16px;
        flex: 1;
      }

      .modal-footer {
        flex-wrap: wrap;
      }

      .footer-note {
        flex-basis: 100%;
      }

      .preview-card {
        flex-wrap: wrap;
      }

      .preview-figure {
        height: 180px;
      }

      .svg-interpret-box {
        padding: 12px;
      }

      .svg-choice-card,
      .option-card {
        padding: 10px;
        gap: 8px;
      }

      .slider-row {
        flex-wrap: wrap;
      }

      .slider-label {
        min-width: 0;
        flex-basis: 100%;
      }
    }
  `];

  @property({ type: String })
  public currentLevel: string = DEFAULT_LEVEL;

  /** Code SVG collé hors de la modale, transmis par le panneau (constat F127). */
  @property({ attribute: false })
  public initialSvg: string | null = null;

  /** Fichier déposé hors de la modale (canevas), transmis par le panneau. */
  @property({ attribute: false })
  public initialFile: Blob | null = null;

  /**
   * Objet hass (facultatif) : sert seulement à suivre le thème clair / sombre de Home Assistant.
   * Ce n'est pas une propriété réactive : ses mises à jour fréquentes ne provoquent aucun rendu.
   */
  public get hass(): unknown {
    return this.hassRef;
  }

  public set hass(hass: unknown) {
    this.hassRef = hass;
    if (hass) applyColorScheme(this, hass);
  }

  @state()
  private source: LoadedSource | null = null;

  /** Traitement en cours (message affiché) : la confirmation est bloquée. */
  @state()
  private busy: Text | null = null;

  @state()
  private error: Text | null = null;

  @state()
  private hint: Text | null = null;

  /** Reconnaissance à l'échelle saisie (relancée seulement quand la largeur ou les calques changent). */
  @state()
  private detection: SvgDetection | null = null;

  /** Résultat filtré par les cases à cocher (instantané). */
  @state()
  private result: SvgParseResult | null = null;

  /** Une reconnaissance est programmée (saisie en cours). */
  @state()
  private detectPending: boolean = false;

  @state()
  private excludedLayers: readonly string[] = [];

  @state()
  private svgImportMode: 'vectorize' | 'background_only' = 'vectorize';

  @state()
  private keepSvgBackground: boolean = true;

  @state()
  private importOptions: Record<ImportCategory, boolean> = {
    importWalls: true,
    importDoors: true,
    importWindows: true,
    importRooms: true,
    importLabels: true
  };

  @state()
  private calibrateMode: 'auto_dimension' | 'interactive_calibrate' = 'auto_dimension';

  /** Saisie brute de la largeur : jamais réécrite pendant la frappe (F63). */
  @state()
  private widthText: string = '12';

  @state()
  private opacity: number = 0.40;

  @state()
  private isDragOver: boolean = false;

  /** Re-rendu au changement de langue. */
  private readonly i18n = new LocalizeController(this);
  private hassRef: unknown = undefined;
  /** Jeton du fichier en cours : le résultat d'une lecture obsolète est ignoré (F156). */
  private loadToken = 0;
  private detectTimer: ReturnType<typeof setTimeout> | null = null;
  /** Élément qui avait le focus à l'ouverture (bouton d'import…) : il le retrouve à la fermeture. */
  private returnFocusTo: HTMLElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.returnFocusTo = deepActiveElement();
    this.addEventListener('keydown', this.handleKeyDown);
    // Tant que la modale est ouverte, aucun dépôt ne doit faire naviguer l'onglet vers le fichier (F74).
    window.addEventListener('dragover', this.handleWindowDragOver);
    window.addEventListener('dragleave', this.handleWindowDragLeave);
    window.addEventListener('drop', this.handleWindowDrop);
    window.addEventListener('paste', this.handleWindowPaste);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('dragover', this.handleWindowDragOver);
    window.removeEventListener('dragleave', this.handleWindowDragLeave);
    window.removeEventListener('drop', this.handleWindowDrop);
    window.removeEventListener('paste', this.handleWindowPaste);
    this.loadToken++;
    this.clearDetectTimer();
    this.releasePreview();
    this.source = null;
    super.disconnectedCallback();
    const returnTo = this.returnFocusTo;
    this.returnFocusTo = null;
    if (returnTo?.isConnected) returnTo.focus({ preventScroll: true });
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has('initialFile') && this.initialFile) void this.processFile(this.initialFile, 'import.name.dropped');
    if (changed.has('initialSvg') && this.initialSvg) void this.loadSvgFromText(this.initialSvg, 'import.name.pasted_svg');
  }

  /** Focus dans la boîte de dialogue : Échap la ferme et Ctrl+V y colle un plan sans clic préalable. */
  protected firstUpdated() {
    this.dialogCard()?.focus();
  }

  // ---------------------------------------------------------------------------------------------
  // Clavier, collage, glisser-déposer
  // ---------------------------------------------------------------------------------------------

  private dialogCard(): HTMLElement | null {
    return this.renderRoot.querySelector<HTMLElement>('.modal-card');
  }

  /** Les touches tapées dans la modale n'atteignent pas les raccourcis globaux du panneau et du canevas. */
  private handleKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === 'Escape') {
      // Échap pendant une composition (IME) l'annule seulement.
      if (e.isComposing) return;
      e.preventDefault();
      this.close();
    } else if (e.key === 'Tab') {
      this.trapFocus(e);
    } else if (e.key === 'Enter' && !e.isComposing) {
      // Entrée dans le champ de largeur : applique la saisie sans attendre la fin du délai.
      const target = getEventTarget(e);
      if (target instanceof HTMLInputElement && target.type === 'text') {
        e.preventDefault();
        this.flushDetection();
      }
    }
  };

  /** Piège de focus : Tab et Maj+Tab bouclent sur les commandes de la boîte de dialogue. */
  private trapFocus(e: KeyboardEvent) {
    const card = this.dialogCard();
    if (!card) return;
    const items = Array.from(card.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(el => el.getClientRects().length > 0);
    const active = (this.renderRoot as ShadowRoot).activeElement;
    if (items.length === 0) {
      e.preventDefault();
      card.focus();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && (active === first || active === card || !active)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (active === last || !active)) {
      e.preventDefault();
      first.focus();
    }
  }

  /** Collage hors des champs de saisie uniquement : image, fichier ou code SVG (F127). */
  private handleWindowPaste = (e: ClipboardEvent) => {
    if (e.defaultPrevented || !e.clipboardData || isTextEntryEvent(e)) return;
    const file = clipboardFile(e.clipboardData);
    if (file) {
      e.preventDefault();
      void this.processFile(file, 'import.name.pasted_image');
      return;
    }
    const text = e.clipboardData.getData('text/plain');
    if (looksLikeSvg(text)) {
      e.preventDefault();
      void this.loadSvgFromText(text.trim(), 'import.name.pasted_svg');
    }
  };

  private handleWindowDragOver = (e: DragEvent) => {
    const files = hasFiles(e);
    // Texte glissé dans un champ : comportement natif (insertion).
    if (!files && isTextEntryEvent(e)) return;
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = files ? 'copy' : 'none';
    if (files && !this.isDragOver) this.isDragOver = true;
  };

  private handleWindowDragLeave = (e: DragEvent) => {
    // relatedTarget nul : le pointeur a quitté la fenêtre (ou le glisser est annulé).
    if (!e.relatedTarget) this.isDragOver = false;
  };

  /** Un fichier déposé n'importe où (zone de dépôt, aperçu ou hors de la modale) remplace le fichier en cours. */
  private handleWindowDrop = (e: DragEvent) => {
    const files = hasFiles(e);
    if (!files && isTextEntryEvent(e)) return;
    e.preventDefault();
    this.isDragOver = false;
    const file = e.dataTransfer?.files?.[0];
    if (file) void this.processFile(file);
  };

  private openFilePicker() {
    this.renderRoot.querySelector<HTMLInputElement>('.file-input')?.click();
  }

  private handleFileInputChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    // Permet de choisir à nouveau le même fichier.
    input.value = '';
    if (file) void this.processFile(file);
  }

  private async pasteFromClipboard() {
    const clipboard = navigator.clipboard;
    try {
      if (clipboard?.read) {
        for (const item of await clipboard.read()) {
          const imageType = item.types.find(t => t.startsWith('image/'));
          if (imageType) {
            const blob = await item.getType(imageType);
            const extension = imageType === SVG_MIME ? 'svg' : imageType.slice('image/'.length).replace(/[^a-z0-9]/gi, '') || 'png';
            const fileName = `${localize('import.name.clipboard_file')}.${extension}`;
            void this.processFile(new File([blob], fileName, { type: imageType }), 'import.name.pasted_image');
            return;
          }
          if (item.types.includes('text/plain')) {
            const text = await (await item.getType('text/plain')).text();
            if (looksLikeSvg(text)) {
              void this.loadSvgFromText(text.trim(), 'import.name.pasted_svg');
              return;
            }
          }
        }
      } else if (clipboard?.readText) {
        const text = await clipboard.readText();
        if (looksLikeSvg(text)) {
          void this.loadSvgFromText(text.trim(), 'import.name.pasted_svg');
          return;
        }
      }
      this.hint = () => localize('import.hint.clipboard_empty');
    } catch {
      this.hint = () => localize('import.hint.clipboard_denied');
    }
  }

  // ---------------------------------------------------------------------------------------------
  // Chargement des fichiers
  // ---------------------------------------------------------------------------------------------

  /** Nouveau fichier : tout l'état du précédent est oublié (dimensions, analyse, calques, erreurs). */
  private beginLoad(): number {
    const token = ++this.loadToken;
    this.clearDetectTimer();
    this.releasePreview();
    this.source = null;
    this.detection = null;
    this.result = null;
    this.detectPending = false;
    this.excludedLayers = [];
    this.error = null;
    this.hint = null;
    this.busy = () => localize('import.busy.reading');
    return token;
  }

  private releasePreview() {
    const src = this.source;
    if (src && src.kind !== 'project') URL.revokeObjectURL(src.previewUrl);
  }

  private fail(err: unknown) {
    this.busy = null;
    this.error = errorText(err);
  }

  /** Laisse le navigateur afficher le message d'attente avant un traitement synchrone long. */
  private async yieldToBrowser(): Promise<void> {
    await this.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 30));
  }

  /** `fallbackNameKey` : clé du nom affiché quand le fichier n'en a pas (image collée, plan déposé…). */
  private async processFile(file: Blob, fallbackNameKey = 'import.name.imported'): Promise<void> {
    const fileName = (file as File).name;
    const name: Text = typeof fileName === 'string' && fileName ? () => fileName : () => localize(fallbackNameKey);
    const token = this.beginLoad();
    try {
      const kind = fileKind(file, name());
      if (kind === 'svg') {
        if (file.size > MAX_SVG_INPUT_BYTES) {
          throw new ImportError(() => localize('import.error.svg_file_too_large', {
            size: formatBytes(file.size), max: formatBytes(MAX_SVG_INPUT_BYTES)
          }));
        }
        // Décodage selon l'encodage déclaré dans l'en-tête XML (Latin-1, windows-1252…), et non UTF-8 imposé.
        const text = decodeSvgBytes(await withUserMessage(file.arrayBuffer(), 'import.error.read_failed'));
        if (token !== this.loadToken) return;
        await this.loadSvg(text, name, token);
      } else if (kind === 'raster') {
        await this.loadRaster(file, name, token);
      } else if (kind === 'json') {
        if (file.size > MAX_BACKUP_BYTES) {
          throw new ImportError(() => localize('import.error.backup_too_large', {
            size: formatBytes(file.size), max: formatBytes(MAX_BACKUP_BYTES)
          }));
        }
        const text = await withUserMessage(readFileAsText(file), 'import.error.read_failed');
        if (token !== this.loadToken) return;
        const { project, droppedBackground } = projectFromBackup(text);
        this.source = { kind: 'project', name, project, droppedBackground };
        this.busy = null;
      } else if (kind === 'pdf') {
        throw new ImportError(() => localize('import.error.pdf'));
      } else {
        throw new ImportError(() => localize('import.error.unsupported'));
      }
    } catch (err) {
      if (token === this.loadToken) this.fail(err);
    }
  }

  /** `nameKey` : clé du nom générique affiché (plan SVG collé). */
  private async loadSvgFromText(text: string, nameKey: string): Promise<void> {
    const token = this.beginLoad();
    try {
      if (text.length > MAX_SVG_INPUT_BYTES) {
        throw new ImportError(() => localize('import.error.svg_code_too_large', { max: formatBytes(MAX_SVG_INPUT_BYTES) }));
      }
      await this.loadSvg(text, () => localize(nameKey), token);
    } catch (err) {
      if (token === this.loadToken) this.fail(err);
    }
  }

  /** Image raster : redimensionnée et recompressée avant tout (côté max 2 500 px, F1). */
  private async loadRaster(file: Blob, name: Text, token: number): Promise<void> {
    if (file.size > MAX_RASTER_INPUT_BYTES) {
      throw new ImportError(() => localize('import.error.image_too_large', {
        size: formatBytes(file.size), max: formatBytes(MAX_RASTER_INPUT_BYTES)
      }));
    }
    this.busy = () => localize('import.busy.compressing');
    const compressed = await withUserMessage(compressRasterImage(file), 'import.error.image_unreadable');
    if (token !== this.loadToken) return;
    if (compressed.blob.size > MAX_UPLOAD_BYTES) {
      throw new ImportError(() => localize('import.error.image_too_heavy', {
        size: formatBytes(compressed.blob.size), max: formatBytes(MAX_UPLOAD_BYTES)
      }));
    }
    this.source = {
      kind: 'raster',
      name,
      originalBytes: file.size,
      background: {
        blob: compressed.blob,
        mimeType: compressed.mimeType,
        widthPx: compressed.width,
        heightPx: compressed.height,
        isSvg: false
      },
      previewUrl: URL.createObjectURL(compressed.blob)
    };
    // La largeur d'une image inclut ses marges : la mesure d'un mur est plus fiable (F70).
    this.calibrateMode = 'interactive_calibrate';
    this.busy = null;
  }

  /** SVG : analysé une seule fois ; seule la reconnaissance est relancée quand la largeur change (F73). */
  private async loadSvg(text: string, name: Text, token: number): Promise<void> {
    this.busy = () => localize('import.busy.analyzing');
    await this.yieldToBrowser();
    if (token !== this.loadToken) return;
    const analysis = SvgPlanParser.analyze(text);
    if (!analysis.success) {
      const detail = analysis.error;
      throw new ImportError(() => detail ?? localize('import.error.invalid_svg'));
    }

    // SVG nettoyé (sans DOCTYPE, refusé par le serveur ; viewBox garantie) : c'est lui qui sert de calque.
    const blob = new Blob([analysis.markup], { type: SVG_MIME });
    const canKeepBackground = blob.size <= MAX_UPLOAD_BYTES;
    this.source = {
      kind: 'svg',
      name,
      analysis,
      // Calque aligné sur les murs : 1 px = 1 unité de la viewBox, quel que soit width/height (F72).
      background: { blob, mimeType: SVG_MIME, widthPx: analysis.viewBox.width, heightPx: analysis.viewBox.height, isSvg: true },
      previewUrl: URL.createObjectURL(blob),
      canKeepBackground
    };
    this.svgImportMode = 'vectorize';
    this.keepSvgBackground = canKeepBackground;
    this.calibrateMode = 'auto_dimension';

    this.busy = () => localize('import.busy.detecting');
    await this.yieldToBrowser();
    if (token !== this.loadToken) return;
    this.runDetection();
    this.busy = null;
  }

  // ---------------------------------------------------------------------------------------------
  // Reconnaissance (SVG) et saisies
  // ---------------------------------------------------------------------------------------------

  private widthMeters(): number | null {
    const v = parseDecimal(this.widthText);
    return v !== null && v >= MIN_WIDTH_METERS && v <= MAX_WIDTH_METERS ? v : null;
  }

  private widthError(): string {
    const v = parseDecimal(this.widthText);
    if (v === null) return localize(this.widthText.trim() === '' ? 'import.width.empty' : 'import.width.not_number');
    if (v < MIN_WIDTH_METERS || v > MAX_WIDTH_METERS) {
      return localize('import.width.range', { min: formatNumber(MIN_WIDTH_METERS), max: formatNumber(MAX_WIDTH_METERS) });
    }
    return '';
  }

  private clearDetectTimer() {
    if (this.detectTimer !== null) {
      clearTimeout(this.detectTimer);
      this.detectTimer = null;
    }
  }

  /**
   * Options d'interprétation (même objet que `SvgPlanParser.parseSvg(svgText, options)`) : `detect` en lit
   * l'échelle et les calques, `select` les cases à cocher. parseSvg n'est que la composition des trois
   * étapes : le résultat est identique, sans tout recalculer à chaque frappe ou case cochée (F73).
   */
  private parseOptions(totalWidthMeters: number): SvgParseOptions {
    return {
      totalWidthMeters,
      defaultThickness: DEFAULT_WALL_THICKNESS,
      defaultHeight: DEFAULT_WALL_HEIGHT,
      ...this.importOptions,
      excludedLayers: this.excludedLayers
    };
  }

  /** Reconnaissance à la largeur saisie ; sans effet tant que la saisie est invalide. */
  private runDetection() {
    this.clearDetectTimer();
    this.detectPending = false;
    const src = this.source;
    const width = this.widthMeters();
    if (!src || src.kind !== 'svg' || width === null) return;
    const options = this.parseOptions(width);
    this.detection = SvgPlanParser.detect(src.analysis, options);
    this.result = SvgPlanParser.select(this.detection, options);
  }

  private scheduleDetection() {
    this.clearDetectTimer();
    this.detectPending = true;
    this.detectTimer = setTimeout(() => {
      this.detectTimer = null;
      this.runDetection();
    }, DETECT_DEBOUNCE_MS);
  }

  private flushDetection() {
    if (this.detectPending) this.runDetection();
  }

  /** Filtres des cases à cocher : instantané, sans relancer la reconnaissance. */
  private refreshSelection() {
    this.result = this.detection ? SvgPlanParser.select(this.detection, this.importOptions) : null;
  }

  private handleWidthInput(e: Event) {
    this.widthText = (e.target as HTMLInputElement).value;
    if (this.source?.kind === 'svg') this.scheduleDetection();
  }

  private toggleImportCategory(cat: ImportCategory, checked: boolean) {
    this.importOptions = { ...this.importOptions, [cat]: checked };
    this.refreshSelection();
  }

  private toggleLayer(id: string, included: boolean) {
    const excluded = new Set(this.excludedLayers);
    if (included) excluded.delete(id);
    else excluded.add(id);
    this.excludedLayers = [...excluded];
    this.scheduleDetection();
  }

  private isVectorizing(): boolean {
    return this.source?.kind === 'svg' && this.svgImportMode === 'vectorize' && !!this.result?.success;
  }

  /** Le calque de fond fera partie de l'import. */
  private includesBackground(src: RasterSource | SvgSource): boolean {
    if (src.kind === 'raster') return true;
    return src.canKeepBackground && (!this.isVectorizing() || this.keepSvgBackground);
  }

  /** Raison qui empêche de confirmer ('' : bouton désactivé sans message), null si la confirmation est possible. */
  private confirmBlocker(): string | null {
    const src = this.source;
    if (!src || this.busy) return '';
    if (src.kind === 'project') return null;
    if (src.kind === 'svg' && this.isVectorizing()) {
      if (this.widthMeters() === null) return '';
      const stats = this.result?.stats;
      if (!this.includesBackground(src) && stats && stats.wallCount + stats.roomCount === 0) {
        return localize('import.blocker.nothing_selected');
      }
      return null;
    }
    if (src.kind === 'svg' && !src.canKeepBackground) {
      return localize('import.blocker.svg_too_heavy');
    }
    if (this.calibrateMode === 'auto_dimension' && this.widthMeters() === null) return '';
    return null;
  }

  private close() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private confirmImport() {
    // Une saisie encore en attente est appliquée avant de valider et de construire le résultat.
    this.flushDetection();
    const src = this.source;
    if (!src || this.confirmBlocker() !== null) return;
    if (src.kind === 'project') {
      this.dispatchEvent(new CustomEvent<ImportProjectBackupDetail>('import-project-backup', {
        detail: { project: src.project },
        bubbles: true,
        composed: true
      }));
      return;
    }
    const detail = this.buildResult(src);
    if (!detail) return;
    this.dispatchEvent(new CustomEvent<ImportModalResult>('import-confirmed', {
      detail,
      bubbles: true,
      composed: true
    }));
  }

  private buildResult(src: RasterSource | SvgSource): ImportModalResult | null {
    const width = this.widthMeters();
    if (src.kind === 'svg' && this.isVectorizing() && this.result) {
      if (width === null) return null;
      const keep = this.includesBackground(src);
      return {
        background: keep ? src.background : undefined,
        opacity: this.opacity,
        mode: 'auto_dimension',
        totalWidthMeters: width,
        metersPerPixel: this.result.metersPerUnit,
        targetLevel: this.currentLevel,
        isSvgVectorized: true,
        svgInterpretation: this.result,
        keepSvgBackground: keep
      };
    }
    if (!this.includesBackground(src)) return null;
    const auto = this.calibrateMode === 'auto_dimension';
    if (auto && width === null) return null;
    let metersPerPixel: number | undefined;
    if (auto && width !== null) {
      // SVG : largeur rapportée à l'emprise des murs détectés ; raster : à toute l'image.
      metersPerPixel = src.kind === 'svg' && this.detection?.success
        ? this.detection.metersPerUnit
        : width / src.background.widthPx;
    }
    return {
      background: src.background,
      opacity: this.opacity,
      mode: this.calibrateMode,
      totalWidthMeters: auto && width !== null ? width : undefined,
      metersPerPixel,
      targetLevel: this.currentLevel,
      isSvgVectorized: false
    };
  }

  // ---------------------------------------------------------------------------------------------
  // Rendu
  // ---------------------------------------------------------------------------------------------

  /** La zone entière ouvre le sélecteur au pointeur ; au clavier, ce sont ses deux boutons. */
  private renderDropZone() {
    return html`
      <div
        class="drop-zone ${this.isDragOver ? 'dragover' : ''}"
        role="group"
        aria-label=${localize('import.drop.region')}
        @click=${this.openFilePicker}
      >
        <span class="drop-icon" aria-hidden="true">📐</span>
        <div class="drop-text">${localize('import.drop.title')}</div>
        <div class="drop-subtext">${localize('import.drop.formats')}</div>

        <div class="drop-actions" @click=${(e: Event) => e.stopPropagation()}>
          <button type="button" class="btn-action-small" @click=${this.openFilePicker}>
            <span aria-hidden="true">📁</span>
            <span>${localize('import.drop.choose_file')}</span>
          </button>
          <button type="button" class="btn-action-small" @click=${this.pasteFromClipboard}>
            <span aria-hidden="true">📋</span>
            <span>${localize('import.drop.paste')}</span>
          </button>
        </div>
      </div>
    `;
  }

  private renderSourceCard(src: LoadedSource) {
    const replace = html`
      <button type="button" class="btn-change-image" @click=${this.openFilePicker}>
        <span aria-hidden="true">🔄</span> ${localize('import.source.replace')}
      </button>
    `;
    if (src.kind === 'project') {
      return html`
        <div class="preview-card ${this.isDragOver ? 'dragover' : ''}">
          <span class="preview-icon" aria-hidden="true">🗂️</span>
          <div class="preview-meta">
            <div class="preview-title">
              <span>${src.name()}</span>
              <span class="preview-badge">${localize('import.source.backup_badge')}</span>
            </div>
            ${replace}
          </div>
        </div>
      `;
    }
    if (src.kind === 'raster') {
      const bg = src.background;
      const recompressed = bg.blob.size !== src.originalBytes;
      const sizeParams = { width: formatNumber(bg.widthPx), height: formatNumber(bg.heightPx), size: formatBytes(bg.blob.size) };
      return html`
        <div class="preview-card ${this.isDragOver ? 'dragover' : ''}">
          <img class="preview-thumb" src=${src.previewUrl} alt=${localize('import.source.preview_alt')} />
          <div class="preview-meta">
            <div class="preview-title">
              <span aria-hidden="true">✅</span>
              <span>${src.name()}</span>
            </div>
            <div class="preview-dimensions">
              ${recompressed
                ? localize('import.source.raster_size_recompressed', { ...sizeParams, original: formatBytes(src.originalBytes) })
                : localize('import.source.raster_size', sizeParams)}
            </div>
            ${replace}
          </div>
        </div>
      `;
    }
    const vb = src.analysis.viewBox;
    return html`
      <div class="preview-card column ${this.isDragOver ? 'dragover' : ''}">
        <div class="preview-head">
          <div class="preview-meta">
            <div class="preview-title">
              <span aria-hidden="true">✅</span>
              <span>${src.name()}</span>
              <span class="preview-badge">${localize('import.source.svg_badge')}</span>
            </div>
            <div class="preview-dimensions">
              ${localize('import.source.svg_frame', {
                width: formatNumber(Math.round(vb.width)),
                height: formatNumber(Math.round(vb.height)),
                size: formatBytes(src.background.blob.size)
              })}
            </div>
          </div>
          ${replace}
        </div>
        ${this.renderSvgFigure(src)}
      </div>
    `;
  }

  /** Aperçu du SVG avec, en mode conversion, les éléments détectés superposés (même repère que la viewBox). */
  private renderSvgFigure(src: SvgSource) {
    const vb = src.analysis.viewBox;
    const overlay = this.isVectorizing() ? this.result : null;
    return html`
      <div class="preview-figure">
        <svg viewBox="${vb.x} ${vb.y} ${vb.width} ${vb.height}" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${localize('import.preview.aria')}>
          <image href=${src.previewUrl} x=${vb.x} y=${vb.y} width=${vb.width} height=${vb.height} preserveAspectRatio="none" opacity=${overlay ? 0.45 : 1}></image>
          ${overlay ? this.renderOverlay(overlay, vb) : nothing}
        </svg>
      </div>
      ${overlay ? html`
        <ul class="preview-legend" aria-label=${localize('import.preview.legend')}>
          <li class="legend-item"><i class="swatch wall" aria-hidden="true"></i>${localize('import.element.walls')}</li>
          <li class="legend-item"><i class="swatch door" aria-hidden="true"></i>${localize('import.element.doors')}</li>
          <li class="legend-item"><i class="swatch window" aria-hidden="true"></i>${localize('import.element.windows')}</li>
          <li class="legend-item"><i class="swatch room" aria-hidden="true"></i>${localize('import.element.rooms')}</li>
          <li class="legend-item"><i class="swatch footprint" aria-hidden="true"></i>${localize('import.legend.footprint')}</li>
        </ul>
      ` : nothing}
    `;
  }

  private renderOverlay(r: SvgParseResult, vb: SvgBox) {
    const mpu = r.metersPerUnit;
    if (!(mpu > 0)) return nothing;
    const X = (m: number) => m / mpu + vb.x;
    const Y = (m: number) => m / mpu + vb.y;
    const walls = r.walls.slice(0, PREVIEW_MAX_ITEMS);
    const wallsById = new Map(walls.map(w => [w.id, w]));

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const w of walls) {
      const half = w.thickness / 2;
      minX = Math.min(minX, w.start.x - half, w.end.x - half);
      maxX = Math.max(maxX, w.start.x + half, w.end.x + half);
      minY = Math.min(minY, w.start.y - half, w.end.y - half);
      maxY = Math.max(maxY, w.start.y + half, w.end.y + half);
    }

    return svg`
      ${r.rooms.slice(0, PREVIEW_MAX_ITEMS).map(room => svg`
        <polygon class="ov-room" points=${room.polygon.map(p => `${X(p.x)},${Y(p.y)}`).join(' ')}></polygon>
      `)}
      ${walls.map(w => svg`
        <line class="ov-wall" x1=${X(w.start.x)} y1=${Y(w.start.y)} x2=${X(w.end.x)} y2=${Y(w.end.y)}></line>
      `)}
      ${r.openings.slice(0, PREVIEW_MAX_ITEMS).map(op => {
        const w = wallsById.get(op.wallId);
        if (!w) return nothing;
        const len = Math.hypot(w.end.x - w.start.x, w.end.y - w.start.y);
        if (len === 0) return nothing;
        const ux = (w.end.x - w.start.x) / len, uy = (w.end.y - w.start.y) / len;
        const a = op.offset - op.width / 2, b = op.offset + op.width / 2;
        return svg`
          <line class="ov-opening ${DOOR_TYPES.has(op.type) ? 'door' : 'window'}"
            x1=${X(w.start.x + ux * a)} y1=${Y(w.start.y + uy * a)} x2=${X(w.start.x + ux * b)} y2=${Y(w.start.y + uy * b)}></line>
        `;
      })}
      ${Number.isFinite(minX) ? svg`
        <rect class="ov-footprint" x=${X(minX)} y=${Y(minY)} width=${(maxX - minX) / mpu} height=${(maxY - minY) / mpu}></rect>
      ` : nothing}
    `;
  }

  private renderCategory(cat: ImportCategory, icon: string, labelKey: string, count: number, disabled = false) {
    const checked = this.importOptions[cat];
    return html`
      <label class="category-toggle ${checked && !disabled ? 'active' : ''} ${disabled ? 'disabled' : ''}">
        <input
          type="checkbox"
          .checked=${checked}
          ?disabled=${disabled}
          @change=${(e: Event) => this.toggleImportCategory(cat, (e.target as HTMLInputElement).checked)}
        />
        <span aria-hidden="true">${icon}</span>
        <span>${localize(labelKey)}</span>
        <span class="cat-count">(${formatNumber(count)})</span>
      </label>
    `;
  }

  private renderLayers(src: SvgSource) {
    const layers = src.analysis.layers;
    if (layers.length < 2) return nothing;
    const excluded = new Set(this.excludedLayers);
    return html`
      <div class="import-categories-box" role="group" aria-labelledby="import-layers-title">
        <div class="categories-title" id="import-layers-title">${localize('import.layers.title')}</div>
        <div class="categories-grid">
          ${layers.map(layer => html`
            <label class="category-toggle ${excluded.has(layer.id) ? '' : 'active'}">
              <input
                type="checkbox"
                .checked=${!excluded.has(layer.id)}
                @change=${(e: Event) => this.toggleLayer(layer.id, (e.target as HTMLInputElement).checked)}
              />
              <span>${layer.name}</span>
              <span class="cat-count">(${formatNumber(layer.elementCount)})</span>
            </label>
          `)}
        </div>
      </div>
    `;
  }

  private renderDetectionNotes() {
    const r = this.result;
    if (!r) return nothing;
    const ignored = r.ignoredRooms;
    const shown = ignored.slice(0, IGNORED_ROOMS_SHOWN).map(describeIgnoredRoom).join(', ');
    const list = ignored.length > IGNORED_ROOMS_SHOWN ? `${shown}…` : shown;
    return html`
      ${r.stats.ignoredMeasurementLinesCount > 0 ? html`
        <div class="ignored-note">
          <span aria-hidden="true">ℹ️</span> ${plural('import.notes.measurement_lines', r.stats.ignoredMeasurementLinesCount)}
        </div>
      ` : nothing}
      ${ignored.length > 0 ? html`
        <div class="warn-note">
          <span aria-hidden="true">⚠️</span> ${plural('import.notes.ignored_rooms', ignored.length, { list })}
        </div>
      ` : nothing}
      ${r.truncated ? html`
        <div class="warn-note"><span aria-hidden="true">⚠️</span> ${localize('import.notes.truncated')}</div>
      ` : nothing}
    `;
  }

  private renderSvgOptions(src: SvgSource) {
    const r = this.result;
    const available = r?.success ? r.available : null;
    const wallsOn = this.importOptions.importWalls;
    const detectionError = r && !r.success ? r.error ?? localize('import.svg.detection_failed') : null;

    return html`
      <div class="svg-interpret-box">
        <div class="svg-box-header">
          <span class="svg-box-icon" aria-hidden="true">✨</span>
          <div>
            <div class="svg-box-title">${localize('import.svg.title')}</div>
            <div class="svg-box-subtitle">${localize('import.svg.subtitle')}</div>
          </div>
        </div>

        ${detectionError ? html`<div class="error-box" role="alert"><span aria-hidden="true">❌</span> ${detectionError}</div>` : nothing}

        <div class="svg-mode-selector" role="radiogroup" aria-label=${localize('import.svg.mode_group')}>
          <!-- Mode 1 : Convertir en murs, portes, fenêtres et pièces (la carte entière est cliquable) -->
          <div
            class="svg-choice-card ${this.svgImportMode === 'vectorize' ? 'selected' : ''}"
            @click=${() => this.svgImportMode = 'vectorize'}
          >
            <input
              type="radio"
              id="svg-mode-vectorize"
              name="svg_mode"
              class="svg-choice-radio"
              aria-describedby="svg-mode-vectorize-desc"
              .checked=${this.svgImportMode === 'vectorize'}
              @change=${() => this.svgImportMode = 'vectorize'}
            />
            <div class="svg-choice-content">
              <label class="svg-choice-title" for="svg-mode-vectorize">
                <span><span aria-hidden="true">🧱</span> ${localize('import.svg.vectorize_title')}</span>
                <span class="badge-magic">${localize('import.common.recommended')}</span>
              </label>
              <div class="svg-choice-desc" id="svg-mode-vectorize-desc">${localize('import.svg.vectorize_desc')}</div>

              ${available ? html`
                <!-- Sélection granulaire des éléments à importer (nombres détectés, avant filtres) -->
                <div
                  class="import-categories-box"
                  role="group"
                  aria-labelledby="import-categories-title"
                  @click=${(e: Event) => e.stopPropagation()}
                >
                  <div class="categories-title" id="import-categories-title">${localize('import.categories.title')}</div>
                  <div class="categories-grid">
                    ${this.renderCategory('importWalls', '🧱', 'import.element.walls', available.wallCount)}
                    ${this.renderCategory('importDoors', '🚪', 'import.element.doors', available.doorCount, !wallsOn)}
                    ${this.renderCategory('importWindows', '🪟', 'import.element.windows', available.windowCount, !wallsOn)}
                    ${this.renderCategory('importRooms', '🏠', 'import.element.rooms', available.roomCount)}
                    ${this.renderCategory('importLabels', '🏷️', 'import.element.labels', available.textLabelCount, !this.importOptions.importRooms)}
                  </div>
                  ${!wallsOn && available.doorCount + available.windowCount > 0 ? html`
                    <div class="ignored-note"><span aria-hidden="true">ℹ️</span> ${localize('import.categories.openings_need_walls')}</div>
                  ` : nothing}
                </div>
              ` : nothing}

              <div @click=${(e: Event) => e.stopPropagation()}>
                ${this.renderLayers(src)}
                ${this.renderDetectionNotes()}
              </div>

              <div class="checkbox-wrap" @click=${(e: Event) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  id="chk_keep_bg"
                  .checked=${this.keepSvgBackground && src.canKeepBackground}
                  ?disabled=${!src.canKeepBackground}
                  @change=${(e: Event) => this.keepSvgBackground = (e.target as HTMLInputElement).checked}
                />
                <label for="chk_keep_bg">${localize('import.svg.keep_background')}</label>
              </div>
              ${!src.canKeepBackground ? html`
                <div class="warn-note">
                  <span aria-hidden="true">⚠️</span>
                  ${localize('import.svg.too_heavy_for_background', {
                    size: formatBytes(src.background.blob.size),
                    max: formatBytes(MAX_UPLOAD_BYTES)
                  })}
                </div>
              ` : nothing}
            </div>
          </div>

          <!-- Mode 2 : Calque de fond simple -->
          <div
            class="svg-choice-card ${this.svgImportMode === 'background_only' ? 'selected' : ''} ${src.canKeepBackground ? '' : 'disabled'}"
            @click=${() => { if (src.canKeepBackground) this.svgImportMode = 'background_only'; }}
          >
            <input
              type="radio"
              id="svg-mode-background"
              name="svg_mode"
              class="svg-choice-radio"
              aria-describedby="svg-mode-background-desc"
              .checked=${this.svgImportMode === 'background_only'}
              ?disabled=${!src.canKeepBackground}
              @change=${() => this.svgImportMode = 'background_only'}
            />
            <div class="svg-choice-content">
              <label class="svg-choice-title" for="svg-mode-background">
                <span><span aria-hidden="true">🖼️</span> ${localize('import.svg.background_title')}</span>
              </label>
              <div class="svg-choice-desc" id="svg-mode-background-desc">${localize('import.svg.background_desc')}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderProjectSummary(src: ProjectSource) {
    const p = src.project;
    const furniture = p.furniture?.length ?? 0;
    return html`
      <div class="svg-interpret-box">
        <div class="svg-box-header">
          <span class="svg-box-icon" aria-hidden="true">🗂️</span>
          <div>
            <div class="svg-box-title">${p.name}</div>
            <div class="svg-box-subtitle">${localize('import.project.level', { level: getLevelLabel(p.category) })}</div>
          </div>
        </div>
        <ul class="svg-pills-row">
          <li class="stat-pill wall"><span aria-hidden="true">🧱</span> ${plural('import.count.walls', p.walls.length)}</li>
          <li class="stat-pill door"><span aria-hidden="true">🚪</span> ${plural('import.count.openings', p.openings.length)}</li>
          <li class="stat-pill room"><span aria-hidden="true">🏠</span> ${plural('import.count.rooms', p.rooms.length)}</li>
          <li class="stat-pill window"><span aria-hidden="true">🛋️</span> ${plural('import.count.furniture', furniture)}</li>
          <li class="stat-pill label"><span aria-hidden="true">⚡</span> ${plural('import.count.entities', p.bindings.length)}</li>
          ${p.background ? html`
            <li class="stat-pill wall"><span aria-hidden="true">🖼️</span> ${localize('import.project.background')}</li>
          ` : nothing}
        </ul>
        <div class="ignored-note"><span aria-hidden="true">ℹ️</span> ${localize('import.project.new_plan_note')}</div>
        ${src.droppedBackground ? html`
          <div class="warn-note"><span aria-hidden="true">⚠️</span> ${localize('import.project.dropped_background')}</div>
        ` : nothing}
      </div>
    `;
  }

  private renderWidthInput(labelKey: string) {
    const error = this.widthError();
    return html`
      <div class="input-row" @click=${(e: Event) => e.stopPropagation()}>
        <label class="input-label" for="import-width">${localize(labelKey)}</label>
        <input
          id="import-width"
          type="text"
          inputmode="decimal"
          autocomplete="off"
          class="dimension-input ${error ? 'invalid' : ''}"
          aria-invalid=${error ? 'true' : 'false'}
          aria-describedby=${error ? 'import-width-unit import-width-error' : 'import-width-unit'}
          .value=${this.widthText}
          @input=${this.handleWidthInput}
          @change=${this.flushDetection}
        />
        <span class="unit-tag" id="import-width-unit">${localize('import.common.meters')}</span>
      </div>
      ${error ? html`<div class="field-error" id="import-width-error">${error}</div>` : nothing}
    `;
  }

  /** Référence de la largeur saisie (SVG) : emprise des murs détectés, du dessin ou de la page. */
  private renderFootprintInfo() {
    const d = this.detection;
    if (!d?.success || !d.footprint) return nothing;
    const reference = localize(d.widthReference === 'walls'
      ? 'import.footprint.walls'
      : d.widthReference === 'content' ? 'import.footprint.content' : 'import.footprint.page');
    const params = { reference, width: formatMeters(d.footprint.width), height: formatMeters(d.footprint.height) };
    return html`
      <div class="footprint-info">
        ${localize(this.detectPending ? 'import.footprint.info_pending' : 'import.footprint.info', params)}
      </div>
    `;
  }

  private renderScaleTitle() {
    return html`
      <div class="section-title" id="import-scale-title">
        <span aria-hidden="true">📏</span>
        <span>${localize('import.scale.title')}</span>
      </div>
    `;
  }

  private renderScale(src: RasterSource | SvgSource) {
    if (this.isVectorizing()) {
      return html`
        <div>
          ${this.renderScaleTitle()}
          <div class="option-card selected static">
            <div class="option-content">
              <div class="option-desc">${localize('import.scale.vectorize_desc')}</div>
              ${this.renderWidthInput('import.scale.building_width')}
              ${this.renderFootprintInfo()}
            </div>
          </div>
        </div>
      `;
    }
    const isSvg = src.kind === 'svg';
    const option = (
      mode: 'auto_dimension' | 'interactive_calibrate', icon: string, titleKey: string, recommended: boolean, descKey: string, extra: unknown
    ) => html`
      <div
        class="option-card ${this.calibrateMode === mode ? 'selected' : ''}"
        @click=${() => this.calibrateMode = mode}
      >
        <input
          type="radio"
          class="option-radio"
          id="calib-${mode}"
          name="calib"
          aria-describedby="calib-${mode}-desc"
          .checked=${this.calibrateMode === mode}
          @change=${() => this.calibrateMode = mode}
        />
        <div class="option-content">
          <label class="option-title" for="calib-${mode}">
            <span><span aria-hidden="true">${icon}</span> ${localize(titleKey)}</span>
            ${recommended ? html`<span class="option-badge">${localize('import.common.recommended')}</span>` : nothing}
          </label>
          <div class="option-desc" id="calib-${mode}-desc">${localize(descKey)}</div>
          ${this.calibrateMode === mode ? extra : nothing}
        </div>
      </div>
    `;
    return html`
      <div>
        ${this.renderScaleTitle()}
        <div class="calibrate-options" role="radiogroup" aria-labelledby="import-scale-title">
          ${option(
            'auto_dimension',
            '⚡',
            isSvg ? 'import.scale.auto_svg_title' : 'import.scale.auto_raster_title',
            isSvg,
            isSvg ? 'import.scale.auto_svg_desc' : 'import.scale.auto_raster_desc',
            html`
              ${this.renderWidthInput(isSvg ? 'import.scale.building_width' : 'import.scale.image_width')}
              ${isSvg ? this.renderFootprintInfo() : nothing}
            `
          )}
          ${option(
            'interactive_calibrate',
            '📐',
            'import.scale.measure_title',
            !isSvg,
            'import.scale.measure_desc',
            nothing
          )}
        </div>
      </div>
    `;
  }

  private renderOpacity() {
    const percent = formatNumber(this.opacity, { style: 'percent', maximumFractionDigits: 0 });
    return html`
      <div class="slider-row">
        <label class="slider-label" for="import-opacity">${localize('import.opacity.label')}</label>
        <input
          id="import-opacity"
          type="range"
          class="slider-input"
          min="0.05"
          max="1.0"
          step="0.05"
          aria-valuetext=${percent}
          .value=${String(this.opacity)}
          @input=${(e: Event) => this.opacity = Number((e.target as HTMLInputElement).value)}
        />
        <output class="slider-val" for="import-opacity">${percent}</output>
      </div>
    `;
  }

  private renderConfirmLabel(src: LoadedSource | null) {
    if (src?.kind === 'project') {
      return html`<span aria-hidden="true">📂</span><span>${localize('import.confirm.project')}</span>`;
    }
    if (this.isVectorizing()) {
      const walls = plural('import.count.walls', this.result?.stats.wallCount ?? 0);
      return html`<span aria-hidden="true">✨</span><span>${localize('import.confirm.vectorize', { walls })}</span>`;
    }
    return html`<span aria-hidden="true">🚀</span><span>${localize('import.confirm.load')}</span>`;
  }

  /**
   * Messages lus par les lecteurs d'écran (attente, indication, erreur de largeur, blocage) : un
   * élément par message, pour que seul celui qui change soit annoncé. L'erreur de fichier garde son
   * role=alert (annoncé dès l'insertion).
   */
  private renderLiveRegion(src: LoadedSource | null, vectorizing: boolean, blocker: string | null) {
    const widthShown = !!src && src.kind !== 'project' && (vectorizing || this.calibrateMode === 'auto_dimension');
    return html`
      <div class="sr-only" role="status" aria-live="polite">
        <span>${this.busy ? this.busy() : ''}</span>
        <span>${this.hint ? this.hint() : ''}</span>
        <span>${widthShown ? this.widthError() : ''}</span>
        <span>${blocker ?? ''}</span>
      </div>
    `;
  }

  render() {
    const src = this.source;
    const blocker = this.confirmBlocker();
    const vectorizing = this.isVectorizing();
    const closeLabel = localize('import.common.close');

    return html`
      <div
        class="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="import-title"
        aria-describedby="import-subtitle"
        tabindex="-1"
      >
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon" aria-hidden="true">📥</span>
            <div>
              <h2 class="modal-title" id="import-title">${localize('import.title')}</h2>
              <p class="modal-subtitle" id="import-subtitle">${localize('import.subtitle')}</p>
            </div>
          </div>
          <button type="button" class="btn-close" title=${closeLabel} aria-label=${closeLabel} @click=${this.close}>
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div class="modal-body">
          <input
            class="file-input"
            type="file"
            accept="image/*,.svg,image/svg+xml,.json,application/json"
            @change=${this.handleFileInputChange}
          />

          ${src ? this.renderSourceCard(src) : this.renderDropZone()}

          ${this.busy ? html`
            <div class="busy-box"><span class="spinner" aria-hidden="true"></span><span>${this.busy()}</span></div>
          ` : nothing}
          ${this.error ? html`<div class="error-box" role="alert"><span aria-hidden="true">❌</span> ${this.error()}</div>` : nothing}
          ${this.hint ? html`<div class="ignored-note"><span aria-hidden="true">ℹ️</span> ${this.hint()}</div>` : nothing}

          ${src?.kind === 'svg' ? this.renderSvgOptions(src) : nothing}
          ${src?.kind === 'project' ? this.renderProjectSummary(src) : nothing}
          ${src && src.kind !== 'project' ? this.renderScale(src) : nothing}
          ${src && src.kind !== 'project' && this.includesBackground(src) ? this.renderOpacity() : nothing}
        </div>

        <div class="modal-footer">
          ${blocker ? html`<span class="footer-note" id="import-blocker">${blocker}</span>` : nothing}
          <button type="button" class="btn-cancel" @click=${this.close}>${localize('import.common.cancel')}</button>
          <button
            type="button"
            class="btn-confirm ${vectorizing ? 'btn-magic' : ''}"
            ?disabled=${blocker !== null}
            aria-describedby=${blocker ? 'import-blocker' : nothing}
            @click=${this.confirmImport}
          >
            ${this.renderConfirmLabel(src)}
          </button>
        </div>

        ${this.renderLiveRegion(src, vectorizing, blocker)}
      </div>
    `;
  }
}

defineElement('home-architect-import-modal', HomeArchitectImportModal);

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-import-modal': HomeArchitectImportModal;
  }
}
