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

type ImportCategory = 'importWalls' | 'importDoors' | 'importWindows' | 'importRooms' | 'importLabels';

interface RasterSource {
  kind: 'raster';
  name: string;
  background: ImportModalBackground;
  /** Taille du fichier d'origine (avant compression). */
  originalBytes: number;
  previewUrl: string;
}

interface SvgSource {
  kind: 'svg';
  name: string;
  analysis: SvgAnalysis;
  background: ImportModalBackground;
  previewUrl: string;
  /** Le SVG nettoyé respecte la limite de téléversement : il peut servir de calque. */
  canKeepBackground: boolean;
}

interface ProjectSource {
  kind: 'project';
  name: string;
  project: HomeArchitectProject;
  /** La sauvegarde référençait une image du serveur sans l'embarquer : le plan est importé sans fond. */
  droppedBackground: boolean;
}

type LoadedSource = RasterSource | SvgSource | ProjectSource;

type FileKind = 'svg' | 'raster' | 'json' | 'pdf' | 'unknown';

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
const RASTER_EXTENSION_RE = /\.(png|jpe?g|jfif|webp|gif|bmp|avif|heic|heif)$/;
const DOOR_TYPES = new Set(['door', 'double_door', 'sliding_door']);

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

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} Ko`;
  return `${(bytes / (1024 * 1024)).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} Mo`;
}

function formatMeters(v: number): string {
  return v.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function plural(count: number, singular: string, pluralForm: string): string {
  return `${count} ${count > 1 ? pluralForm : singular}`;
}

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
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
    throw new Error('Fichier JSON illisible (syntaxe invalide).');
  }
  const looksLikeProject = isRecord(raw) && ['walls', 'rooms', 'openings', 'bindings', 'furniture'].some(k => Array.isArray(raw[k]));
  if (!looksLikeProject) throw new Error('Ce fichier JSON n\'est pas une sauvegarde de projet Home Architect.');
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
  const name = room.name || 'forme sans nom';
  return room.reason === 'self_intersecting'
    ? `${name} (contour qui se recoupe)`
    : `${name} (${room.areaM2.toLocaleString('fr-FR')} m²)`;
}

export class HomeArchitectImportModal extends LitElement {
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

    .modal-card:focus {
      outline: none;
    }

    .modal-card {
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      width: 620px;
      max-width: 94vw;
      max-height: 92vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.2);
      overflow: hidden;
    }

    .modal-header {
      padding: 18px 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(15, 23, 42, 0.5);
    }

    .modal-title-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .modal-icon {
      font-size: 1.6rem;
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
      padding: 4px;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .btn-close:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .modal-body {
      padding: 22px 24px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    /* Zone de Dépôt / Drag & Drop */
    .drop-zone {
      border: 2px dashed rgba(56, 189, 248, 0.4);
      background: rgba(15, 23, 42, 0.6);
      border-radius: 14px;
      padding: 24px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
    }

    .drop-zone:hover, .drop-zone.dragover {
      border-color: #38bdf8;
      background: rgba(56, 189, 248, 0.08);
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.15);
    }

    .drop-icon {
      font-size: 2.4rem;
    }

    .drop-text {
      font-size: 0.95rem;
      font-weight: 600;
      color: #e2e8f0;
    }

    .drop-subtext {
      font-size: 0.8rem;
      color: #64748b;
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
      background: rgba(51, 65, 85, 0.8);
      color: #f1f5f9;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    .btn-action-small:hover {
      background: #0284c7;
      border-color: #38bdf8;
    }

    /* Aperçu du plan chargé */
    .preview-card {
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(56, 189, 248, 0.3);
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
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: #f8fafc;
    }

    .preview-meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .preview-title {
      font-size: 0.92rem;
      font-weight: 700;
      color: #38bdf8;
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    .preview-badge-svg {
      font-size: 0.72rem;
      padding: 2px 7px;
      background: rgba(168, 85, 247, 0.25);
      color: #c084fc;
      border: 1px solid rgba(168, 85, 247, 0.5);
      border-radius: 9999px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .preview-dimensions {
      font-size: 0.8rem;
      color: #94a3b8;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .btn-change-image {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #94a3b8;
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 0.75rem;
      cursor: pointer;
      width: fit-content;
      margin-top: 4px;
    }

    .btn-change-image:hover {
      color: #ffffff;
      border-color: #ffffff;
    }

    /* Section Vectorisation Intelligente SVG */
    .svg-interpret-box {
      background: linear-gradient(135deg, rgba(88, 28, 135, 0.25) 0%, rgba(30, 58, 138, 0.25) 100%);
      border: 1.5px solid rgba(168, 85, 247, 0.5);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: 0 4px 20px rgba(168, 85, 247, 0.15);
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
      color: #f3e8ff;
    }

    .svg-box-subtitle {
      font-size: 0.8rem;
      color: #cbd5e1;
      margin-top: 2px;
    }

    .svg-mode-selector {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .svg-choice-card {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      padding: 12px 14px;
      cursor: pointer;
      display: flex;
      gap: 12px;
      align-items: flex-start;
      transition: all 0.2s ease;
    }

    .svg-choice-card:hover {
      border-color: #c084fc;
      background: rgba(15, 23, 42, 0.85);
    }

    .svg-choice-card.selected {
      border-color: #a855f7;
      background: rgba(168, 85, 247, 0.15);
      box-shadow: 0 0 16px rgba(168, 85, 247, 0.25);
    }

    .svg-choice-radio {
      margin-top: 3px;
      accent-color: #a855f7;
    }

    .svg-choice-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .svg-choice-title {
      font-size: 0.9rem;
      font-weight: 700;
      color: #f8fafc;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .badge-magic {
      font-size: 0.7rem;
      padding: 2px 7px;
      background: rgba(168, 85, 247, 0.3);
      color: #e9d5ff;
      border: 1px solid rgba(168, 85, 247, 0.6);
      border-radius: 9999px;
      font-weight: 700;
    }

    .svg-choice-desc {
      font-size: 0.78rem;
      color: #cbd5e1;
      line-height: 1.35;
    }

    .svg-pills-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }

    .stat-pill {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .stat-pill.wall {
      background: rgba(56, 189, 248, 0.2);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.4);
    }

    .stat-pill.door {
      background: rgba(245, 158, 11, 0.2);
      color: #fbbf24;
      border: 1px solid rgba(245, 158, 11, 0.4);
    }

    .stat-pill.window {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.4);
    }

    .stat-pill.room {
      background: rgba(168, 85, 247, 0.2);
      color: #c084fc;
      border: 1px solid rgba(168, 85, 247, 0.4);
    }

    .stat-pill.label {
      background: rgba(236, 72, 153, 0.2);
      color: #f472b6;
      border: 1px solid rgba(236, 72, 153, 0.4);
    }

    .checkbox-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 6px;
      font-size: 0.8rem;
      color: #cbd5e1;
    }

    .checkbox-wrap input {
      accent-color: #a855f7;
      cursor: pointer;
    }

    /* Boîte de sélection personnalisée des catégories à importer */
    .import-categories-box {
      background: rgba(15, 23, 42, 0.65);
      border: 1px solid rgba(168, 85, 247, 0.35);
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
      color: #e9d5ff;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .categories-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .category-toggle {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 5px 10px;
      font-size: 0.82rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      color: #94a3b8;
      transition: all 0.15s ease;
      user-select: none;
    }

    .category-toggle:hover {
      border-color: #a855f7;
      color: #ffffff;
    }

    .category-toggle.active {
      background: rgba(168, 85, 247, 0.2);
      border-color: #a855f7;
      color: #f1f5f9;
      font-weight: 600;
    }

    .category-toggle input[type="checkbox"] {
      accent-color: #a855f7;
      cursor: pointer;
      margin: 0;
    }

    .cat-count {
      font-size: 0.75rem;
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .ignored-note {
      font-size: 0.76rem;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.25);
      border-radius: 6px;
      padding: 5px 8px;
      line-height: 1.35;
      margin-top: 4px;
    }

    /* Section Méthode d'Étalonnage */
    .section-title {
      font-size: 0.88rem;
      font-weight: 700;
      color: #cbd5e1;
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
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 12px 14px;
      cursor: pointer;
      display: flex;
      gap: 12px;
      align-items: flex-start;
      transition: all 0.2s ease;
    }

    .option-card:hover {
      border-color: rgba(56, 189, 248, 0.4);
      background: rgba(15, 23, 42, 0.8);
    }

    .option-card.selected {
      border-color: #38bdf8;
      background: rgba(2, 132, 199, 0.15);
      box-shadow: 0 0 15px rgba(56, 189, 248, 0.15);
    }

    .option-radio {
      margin-top: 3px;
      cursor: pointer;
      accent-color: #38bdf8;
    }

    .option-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .option-title {
      font-size: 0.9rem;
      font-weight: 700;
      color: #f1f5f9;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .option-badge {
      font-size: 0.7rem;
      padding: 2px 6px;
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border-radius: 9999px;
      border: 1px solid rgba(16, 185, 129, 0.4);
      font-weight: 600;
    }

    .option-desc {
      font-size: 0.78rem;
      color: #94a3b8;
      line-height: 1.35;
    }

    .input-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 8px;
    }

    .dimension-input {
      background: #0f172a;
      border: 1px solid rgba(56, 189, 248, 0.4);
      border-radius: 6px;
      color: #f8fafc;
      padding: 6px 10px;
      font-size: 0.95rem;
      font-weight: 700;
      width: 100px;
      text-align: center;
      outline: none;
    }

    .dimension-input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);
    }

    .unit-tag {
      font-size: 0.85rem;
      color: #94a3b8;
      font-weight: 600;
    }

    /* Calque & Opacité */
    .slider-row {
      display: flex;
      align-items: center;
      gap: 14px;
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 10px 14px;
    }

    .slider-label {
      font-size: 0.82rem;
      color: #cbd5e1;
      min-width: 130px;
    }

    .slider-input {
      flex: 1;
      cursor: pointer;
      accent-color: #38bdf8;
    }

    .slider-val {
      font-size: 0.82rem;
      color: #38bdf8;
      font-weight: 700;
      min-width: 40px;
      text-align: right;
    }

    .modal-footer {
      padding: 16px 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(15, 23, 42, 0.5);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
    }

    .btn-cancel {
      background: transparent;
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 0.88rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-cancel:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }

    .btn-confirm {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      border-radius: 8px;
      padding: 8px 20px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
      box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);
    }

    .btn-confirm.btn-magic {
      background: linear-gradient(135deg, #7e22ce 0%, #2563eb 100%);
      border-color: #c084fc;
      box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
    }

    .btn-confirm:hover:not(:disabled) {
      filter: brightness(1.1);
      box-shadow: 0 0 25px rgba(56, 189, 248, 0.5);
    }

    .btn-confirm:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: none;
    }
    .file-input {
      display: none;
    }

    .preview-card.column {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
    }

    .preview-card.dragover {
      border-color: #38bdf8;
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.25);
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
      background: #f8fafc;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      overflow: hidden;
    }

    .preview-figure svg {
      display: block;
      width: 100%;
      height: 100%;
    }

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
      stroke: #f59e0b;
    }

    .ov-opening.window {
      stroke: #10b981;
    }

    .ov-room {
      fill: rgba(168, 85, 247, 0.18);
      stroke: rgba(168, 85, 247, 0.7);
      stroke-width: 1px;
      vector-effect: non-scaling-stroke;
    }

    .ov-footprint {
      fill: none;
      stroke: #ef4444;
      stroke-width: 1.5px;
      stroke-dasharray: 6 4;
      vector-effect: non-scaling-stroke;
    }

    .preview-legend {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      font-size: 0.72rem;
      color: #94a3b8;
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
    .swatch.door { background: #f59e0b; }
    .swatch.window { background: #10b981; }
    .swatch.room { background: rgba(168, 85, 247, 0.7); height: 8px; }
    .swatch.footprint { background: transparent; border-top: 2px dashed #ef4444; height: 0; }

    .busy-box {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.85rem;
      color: #e2e8f0;
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 10px;
      padding: 10px 12px;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(56, 189, 248, 0.3);
      border-top-color: #38bdf8;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      flex-shrink: 0;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (prefers-reduced-motion: reduce) {
      .spinner { animation: none; }
      :host { animation: none; }
    }

    .error-box {
      font-size: 0.82rem;
      color: #fecaca;
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.45);
      border-radius: 10px;
      padding: 10px 12px;
      line-height: 1.4;
    }

    .warn-note {
      font-size: 0.76rem;
      color: #fbbf24;
      background: rgba(245, 158, 11, 0.1);
      border: 1px solid rgba(245, 158, 11, 0.3);
      border-radius: 6px;
      padding: 5px 8px;
      line-height: 1.35;
      margin-top: 4px;
    }

    .input-label {
      font-size: 0.82rem;
      color: #94a3b8;
    }

    .input-row {
      flex-wrap: wrap;
    }

    .dimension-input.invalid {
      border-color: #ef4444;
    }

    .field-error {
      color: #f87171;
      font-size: 0.8rem;
      font-weight: 600;
      margin-top: 4px;
    }

    .footprint-info {
      font-size: 0.76rem;
      color: #94a3b8;
      margin-top: 6px;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .category-toggle.disabled,
    .svg-choice-card.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .option-card.static {
      cursor: default;
    }

    .footer-note {
      margin-right: auto;
      font-size: 0.78rem;
      color: #fbbf24;
    }
  `;

  @property({ type: String })
  public currentLevel: string = DEFAULT_LEVEL;

  /** Code SVG collé hors de la modale, transmis par le panneau (constat F127). */
  @property({ attribute: false })
  public initialSvg: string | null = null;

  /** Fichier déposé hors de la modale (canevas), transmis par le panneau. */
  @property({ attribute: false })
  public initialFile: Blob | null = null;

  @state()
  private source: LoadedSource | null = null;

  /** Traitement en cours (message affiché) : la confirmation est bloquée. */
  @state()
  private busy: string | null = null;

  @state()
  private error: string | null = null;

  @state()
  private hint: string | null = null;

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

  /** Jeton du fichier en cours : le résultat d'une lecture obsolète est ignoré (F156). */
  private loadToken = 0;
  private detectTimer: ReturnType<typeof setTimeout> | null = null;

  connectedCallback() {
    super.connectedCallback();
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
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has('initialFile') && this.initialFile) void this.processFile(this.initialFile, 'Plan déposé');
    if (changed.has('initialSvg') && this.initialSvg) void this.loadSvgFromText(this.initialSvg, 'Plan SVG collé');
  }

  /** Focus dans la modale : Échap la ferme et Ctrl+V y colle un plan sans clic préalable. */
  protected firstUpdated() {
    this.renderRoot.querySelector<HTMLElement>('.modal-card')?.focus();
  }

  // ---------------------------------------------------------------------------------------------
  // Clavier, collage, glisser-déposer
  // ---------------------------------------------------------------------------------------------

  /** Les touches tapées dans la modale n'atteignent pas les raccourcis globaux du panneau et du canevas. */
  private handleKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === 'Escape') {
      e.preventDefault();
      this.close();
    } else if (e.key === 'Enter' && !e.isComposing) {
      // Entrée dans le champ de largeur : applique la saisie sans attendre la fin du délai.
      const target = getEventTarget(e);
      if (target instanceof HTMLInputElement && target.type === 'text') {
        e.preventDefault();
        this.flushDetection();
      }
    }
  };

  /** Collage hors des champs de saisie uniquement : image, fichier ou code SVG (F127). */
  private handleWindowPaste = (e: ClipboardEvent) => {
    if (e.defaultPrevented || !e.clipboardData || isTextEntryEvent(e)) return;
    const file = clipboardFile(e.clipboardData);
    if (file) {
      e.preventDefault();
      void this.processFile(file, 'Image collée');
      return;
    }
    const text = e.clipboardData.getData('text/plain');
    if (looksLikeSvg(text)) {
      e.preventDefault();
      void this.loadSvgFromText(text.trim(), 'Plan SVG collé');
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
            void this.processFile(new File([blob], `presse-papier.${extension}`, { type: imageType }), 'Image collée');
            return;
          }
          if (item.types.includes('text/plain')) {
            const text = await (await item.getType('text/plain')).text();
            if (looksLikeSvg(text)) {
              void this.loadSvgFromText(text.trim(), 'Plan SVG collé');
              return;
            }
          }
        }
      } else if (clipboard?.readText) {
        const text = await clipboard.readText();
        if (looksLikeSvg(text)) {
          void this.loadSvgFromText(text.trim(), 'Plan SVG collé');
          return;
        }
      }
      this.hint = 'Le presse-papier ne contient ni image ni code SVG. Copiez votre plan puis appuyez sur Ctrl+V (Cmd+V sur Mac).';
    } catch {
      this.hint = 'Accès au presse-papier refusé par le navigateur : appuyez directement sur Ctrl+V (Cmd+V sur Mac) pour coller votre plan.';
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
    this.busy = 'Lecture du fichier…';
    return token;
  }

  private releasePreview() {
    const src = this.source;
    if (src && src.kind !== 'project') URL.revokeObjectURL(src.previewUrl);
  }

  private fail(err: unknown) {
    this.busy = null;
    this.error = errorMessage(err);
  }

  /** Laisse le navigateur afficher le message d'attente avant un traitement synchrone long. */
  private async yieldToBrowser(): Promise<void> {
    await this.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 30));
  }

  private async processFile(file: Blob, fallbackName = 'Plan importé'): Promise<void> {
    const fileName = (file as File).name;
    const name = typeof fileName === 'string' && fileName ? fileName : fallbackName;
    const token = this.beginLoad();
    try {
      const kind = fileKind(file, name);
      if (kind === 'svg') {
        if (file.size > MAX_SVG_INPUT_BYTES) {
          throw new Error(`Fichier SVG trop volumineux (${formatBytes(file.size)} ; maximum ${formatBytes(MAX_SVG_INPUT_BYTES)}).`);
        }
        // Décodage selon l'encodage déclaré dans l'en-tête XML (Latin-1, windows-1252…), et non UTF-8 imposé.
        const text = decodeSvgBytes(await file.arrayBuffer());
        if (token !== this.loadToken) return;
        await this.loadSvg(text, name, token);
      } else if (kind === 'raster') {
        await this.loadRaster(file, name, token);
      } else if (kind === 'json') {
        if (file.size > MAX_BACKUP_BYTES) {
          throw new Error(`Sauvegarde trop volumineuse (${formatBytes(file.size)} ; maximum ${formatBytes(MAX_BACKUP_BYTES)}).`);
        }
        const text = await readFileAsText(file);
        if (token !== this.loadToken) return;
        const { project, droppedBackground } = projectFromBackup(text);
        this.source = { kind: 'project', name, project, droppedBackground };
        this.busy = null;
      } else if (kind === 'pdf') {
        throw new Error('Les fichiers PDF ne sont pas pris en charge : exportez le plan en SVG (vectoriel), PNG ou JPEG depuis votre logiciel.');
      } else {
        throw new Error('Format de fichier non pris en charge. Formats acceptés : SVG, PNG, JPEG, WebP, GIF, ou sauvegarde de projet (.json).');
      }
    } catch (err) {
      if (token === this.loadToken) this.fail(err);
    }
  }

  private async loadSvgFromText(text: string, name: string): Promise<void> {
    const token = this.beginLoad();
    try {
      if (text.length > MAX_SVG_INPUT_BYTES) {
        throw new Error(`Code SVG trop volumineux (maximum ${formatBytes(MAX_SVG_INPUT_BYTES)}).`);
      }
      await this.loadSvg(text, name, token);
    } catch (err) {
      if (token === this.loadToken) this.fail(err);
    }
  }

  /** Image raster : redimensionnée et recompressée avant tout (côté max 2 500 px, F1). */
  private async loadRaster(file: Blob, name: string, token: number): Promise<void> {
    if (file.size > MAX_RASTER_INPUT_BYTES) {
      throw new Error(`Image trop volumineuse (${formatBytes(file.size)} ; maximum ${formatBytes(MAX_RASTER_INPUT_BYTES)}).`);
    }
    this.busy = 'Compression de l\'image…';
    const compressed = await compressRasterImage(file);
    if (token !== this.loadToken) return;
    if (compressed.blob.size > MAX_UPLOAD_BYTES) {
      throw new Error(`Image trop lourde même après compression (${formatBytes(compressed.blob.size)} ; maximum ${formatBytes(MAX_UPLOAD_BYTES)}).`);
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
  private async loadSvg(text: string, name: string, token: number): Promise<void> {
    this.busy = 'Analyse du plan SVG…';
    await this.yieldToBrowser();
    if (token !== this.loadToken) return;
    const analysis = SvgPlanParser.analyze(text);
    if (!analysis.success) throw new Error(analysis.error ?? 'Fichier SVG invalide.');

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

    this.busy = 'Reconnaissance des murs, ouvertures et pièces…';
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
    if (v === null) return this.widthText.trim() === '' ? 'Indiquez une largeur en mètres.' : 'Saisissez un nombre (ex. 12,5).';
    if (v < MIN_WIDTH_METERS || v > MAX_WIDTH_METERS) {
      return `La largeur doit être comprise entre ${MIN_WIDTH_METERS.toLocaleString('fr-FR')} et ${MAX_WIDTH_METERS.toLocaleString('fr-FR')} m.`;
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
        return 'Aucun élément sélectionné à importer.';
      }
      return null;
    }
    if (src.kind === 'svg' && !src.canKeepBackground) {
      return 'SVG trop lourd pour servir de calque de fond : seule la conversion en murs est possible.';
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

  private renderDropZone() {
    return html`
      <div class="drop-zone ${this.isDragOver ? 'dragover' : ''}" @click=${this.openFilePicker}>
        <span class="drop-icon">📐</span>
        <div class="drop-text">Glissez-déposez votre plan ici</div>
        <div class="drop-subtext">SVG (vectorisation automatique en murs 3D), PNG, JPEG, WebP — ou sauvegarde de projet (.json)</div>

        <div class="drop-actions" @click=${(e: Event) => e.stopPropagation()}>
          <button class="btn-action-small" @click=${this.openFilePicker}>
            📁 Choisir un fichier
          </button>
          <button class="btn-action-small" @click=${this.pasteFromClipboard}>
            📋 Coller (Ctrl+V)
          </button>
        </div>
      </div>
    `;
  }

  private renderSourceCard(src: LoadedSource) {
    const replace = html`
      <button class="btn-change-image" @click=${this.openFilePicker}>🔄 Remplacer le fichier</button>
    `;
    if (src.kind === 'project') {
      return html`
        <div class="preview-card ${this.isDragOver ? 'dragover' : ''}">
          <span class="preview-icon">🗂️</span>
          <div class="preview-meta">
            <div class="preview-title">
              <span>${src.name}</span>
              <span class="preview-badge-svg">Sauvegarde de projet</span>
            </div>
            ${replace}
          </div>
        </div>
      `;
    }
    if (src.kind === 'raster') {
      const bg = src.background;
      const recompressed = bg.blob.size !== src.originalBytes;
      return html`
        <div class="preview-card ${this.isDragOver ? 'dragover' : ''}">
          <img class="preview-thumb" src=${src.previewUrl} alt="Aperçu du plan" />
          <div class="preview-meta">
            <div class="preview-title">
              <span>✅</span>
              <span>${src.name}</span>
            </div>
            <div class="preview-dimensions">
              ${bg.widthPx} × ${bg.heightPx} px · ${formatBytes(bg.blob.size)}${recompressed ? ` (fichier d'origine : ${formatBytes(src.originalBytes)})` : ''}
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
              <span>✅</span>
              <span>${src.name}</span>
              <span class="preview-badge-svg">SVG Vectoriel</span>
            </div>
            <div class="preview-dimensions">
              Repère du plan : ${Math.round(vb.width)} × ${Math.round(vb.height)} unités · ${formatBytes(src.background.blob.size)}
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
        <svg viewBox="${vb.x} ${vb.y} ${vb.width} ${vb.height}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Aperçu du plan et des éléments détectés">
          <image href=${src.previewUrl} x=${vb.x} y=${vb.y} width=${vb.width} height=${vb.height} preserveAspectRatio="none" opacity=${overlay ? 0.45 : 1}></image>
          ${overlay ? this.renderOverlay(overlay, vb) : nothing}
        </svg>
      </div>
      ${overlay ? html`
        <div class="preview-legend">
          <span class="legend-item"><i class="swatch wall"></i>Murs</span>
          <span class="legend-item"><i class="swatch door"></i>Portes</span>
          <span class="legend-item"><i class="swatch window"></i>Fenêtres</span>
          <span class="legend-item"><i class="swatch room"></i>Pièces</span>
          <span class="legend-item"><i class="swatch footprint"></i>Emprise de la largeur saisie</span>
        </div>
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

  private renderCategory(cat: ImportCategory, label: string, count: number, disabled = false) {
    const checked = this.importOptions[cat];
    return html`
      <label class="category-toggle ${checked && !disabled ? 'active' : ''} ${disabled ? 'disabled' : ''}">
        <input
          type="checkbox"
          .checked=${checked}
          ?disabled=${disabled}
          @change=${(e: Event) => this.toggleImportCategory(cat, (e.target as HTMLInputElement).checked)}
        />
        <span>${label}</span>
        <span class="cat-count">(${count})</span>
      </label>
    `;
  }

  private renderLayers(src: SvgSource) {
    const layers = src.analysis.layers;
    if (layers.length < 2) return nothing;
    const excluded = new Set(this.excludedLayers);
    return html`
      <div class="import-categories-box">
        <div class="categories-title">Calques et groupes pris en compte :</div>
        <div class="categories-grid">
          ${layers.map(layer => html`
            <label class="category-toggle ${excluded.has(layer.id) ? '' : 'active'}">
              <input
                type="checkbox"
                .checked=${!excluded.has(layer.id)}
                @change=${(e: Event) => this.toggleLayer(layer.id, (e.target as HTMLInputElement).checked)}
              />
              <span>${layer.name}</span>
              <span class="cat-count">(${layer.elementCount})</span>
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
    const shown = ignored.slice(0, 6).map(describeIgnoredRoom).join(', ');
    return html`
      ${r.stats.ignoredMeasurementLinesCount > 0 ? html`
        <div class="ignored-note">
          ℹ️ ${r.stats.ignoredMeasurementLinesCount} ligne(s) de cotation / pointillés ont été automatiquement ignorées (non transformées en murs).
        </div>
      ` : nothing}
      ${ignored.length > 0 ? html`
        <div class="warn-note">
          ⚠️ ${plural(ignored.length, 'forme écartée', 'formes écartées')} des pièces : ${shown}${ignored.length > 6 ? '…' : ''}
        </div>
      ` : nothing}
      ${r.truncated ? html`
        <div class="warn-note">⚠️ Plan très volumineux : seule une partie du fichier a été analysée.</div>
      ` : nothing}
    `;
  }

  private renderSvgOptions(src: SvgSource) {
    const r = this.result;
    const available = r?.success ? r.available : null;
    const wallsOn = this.importOptions.importWalls;
    const detectionError = r && !r.success ? r.error ?? 'La reconnaissance du plan a échoué.' : null;

    return html`
      <div class="svg-interpret-box">
        <div class="svg-box-header">
          <span class="svg-box-icon">✨</span>
          <div>
            <div class="svg-box-title">Interprétation Vectorielle Intelligente SVG</div>
            <div class="svg-box-subtitle">
              Transformez directement les lignes et courbes de votre SVG en éléments réels
            </div>
          </div>
        </div>

        ${detectionError ? html`<div class="error-box" role="alert">❌ ${detectionError}</div>` : nothing}

        <div class="svg-mode-selector">
          <!-- Mode 1 : Convertir en murs, portes, fenêtres et pièces -->
          <div
            class="svg-choice-card ${this.svgImportMode === 'vectorize' ? 'selected' : ''}"
            @click=${() => this.svgImportMode = 'vectorize'}
          >
            <input
              type="radio"
              name="svg_mode"
              class="svg-choice-radio"
              .checked=${this.svgImportMode === 'vectorize'}
              @change=${() => this.svgImportMode = 'vectorize'}
            />
            <div class="svg-choice-content">
              <div class="svg-choice-title">
                <span>🧱 Convertir en Murs, Portes, Fenêtres & Pièces 3D</span>
                <span class="badge-magic">Recommandé</span>
              </div>
              <div class="svg-choice-desc">
                Génère instantanément les murs, baies, ouvertures et pièces prêts pour l'affichage 2D et 3D.
              </div>

              ${available ? html`
                <!-- Sélection granulaire des éléments à importer (nombres détectés, avant filtres) -->
                <div class="import-categories-box" @click=${(e: Event) => e.stopPropagation()}>
                  <div class="categories-title">Éléments à importer :</div>
                  <div class="categories-grid">
                    ${this.renderCategory('importWalls', '🧱 Murs', available.wallCount)}
                    ${this.renderCategory('importDoors', '🚪 Portes', available.doorCount, !wallsOn)}
                    ${this.renderCategory('importWindows', '🪟 Fenêtres', available.windowCount, !wallsOn)}
                    ${this.renderCategory('importRooms', '🏠 Pièces', available.roomCount)}
                    ${this.renderCategory('importLabels', '🏷️ Noms', available.textLabelCount, !this.importOptions.importRooms)}
                  </div>
                  ${!wallsOn && available.doorCount + available.windowCount > 0 ? html`
                    <div class="ignored-note">ℹ️ Les portes et fenêtres ne sont importées qu'avec les murs qui les portent.</div>
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
                <label for="chk_keep_bg" style="cursor: pointer;">
                  Conserver également le tracé SVG original en filigrane sous le plan
                </label>
              </div>
              ${!src.canKeepBackground ? html`
                <div class="warn-note">
                  ⚠️ SVG trop lourd (${formatBytes(src.background.blob.size)}) pour servir de calque de fond (maximum ${formatBytes(MAX_UPLOAD_BYTES)}).
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
              name="svg_mode"
              class="svg-choice-radio"
              .checked=${this.svgImportMode === 'background_only'}
              ?disabled=${!src.canKeepBackground}
              @change=${() => this.svgImportMode = 'background_only'}
            />
            <div class="svg-choice-content">
              <div class="svg-choice-title">
                <span>🖼️ Calque de fond simple (Décalque manuel)</span>
              </div>
              <div class="svg-choice-desc">
                Affiche le SVG comme une image en arrière-plan pour tracer les murs manuellement.
              </div>
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
          <span class="svg-box-icon">🗂️</span>
          <div>
            <div class="svg-box-title">${p.name}</div>
            <div class="svg-box-subtitle">Niveau : ${getLevelLabel(p.category)}</div>
          </div>
        </div>
        <div class="svg-pills-row">
          <span class="stat-pill wall">🧱 ${plural(p.walls.length, 'mur', 'murs')}</span>
          <span class="stat-pill door">🚪 ${plural(p.openings.length, 'ouverture', 'ouvertures')}</span>
          <span class="stat-pill room">🏠 ${plural(p.rooms.length, 'pièce', 'pièces')}</span>
          <span class="stat-pill window">🛋️ ${plural(furniture, 'meuble', 'meubles')}</span>
          <span class="stat-pill label">⚡ ${plural(p.bindings.length, 'entité', 'entités')}</span>
          ${p.background ? html`<span class="stat-pill wall">🖼️ Image de fond</span>` : nothing}
        </div>
        <div class="ignored-note">
          ℹ️ Le plan sera ouvert comme un nouveau plan (nouvel identifiant) : aucun plan existant n'est écrasé. Enregistrez-le ensuite pour le conserver.
        </div>
        ${src.droppedBackground ? html`
          <div class="warn-note">
            ⚠️ La sauvegarde ne contient pas l'image de fond (indisponible lors de l'export) : le plan sera importé sans fond.
          </div>
        ` : nothing}
      </div>
    `;
  }

  private renderWidthInput(label: string) {
    const error = this.widthError();
    return html`
      <div class="input-row" @click=${(e: Event) => e.stopPropagation()}>
        <label class="input-label" for="import-width">${label}</label>
        <input
          id="import-width"
          type="text"
          inputmode="decimal"
          autocomplete="off"
          class="dimension-input ${error ? 'invalid' : ''}"
          aria-invalid=${error ? 'true' : 'false'}
          .value=${this.widthText}
          @input=${this.handleWidthInput}
          @change=${this.flushDetection}
        />
        <span class="unit-tag">mètres</span>
      </div>
      ${error ? html`<div class="field-error" role="alert">${error}</div>` : nothing}
    `;
  }

  /** Référence de la largeur saisie (SVG) : emprise des murs détectés, du dessin ou de la page. */
  private renderFootprintInfo() {
    const d = this.detection;
    if (!d?.success || !d.footprint) return nothing;
    const reference = d.widthReference === 'walls'
      ? 'emprise des murs détectés'
      : d.widthReference === 'content' ? 'emprise du dessin (aucun mur détecté)' : 'page entière';
    return html`
      <div class="footprint-info">
        Référence : ${reference} — ${formatMeters(d.footprint.width)} × ${formatMeters(d.footprint.height)} m${this.detectPending ? ' (mise à jour…)' : ''}
      </div>
    `;
  }

  private renderScale(src: RasterSource | SvgSource) {
    if (this.isVectorizing()) {
      return html`
        <div>
          <div class="section-title">
            <span>📏</span>
            <span>Échelle du plan (Mètres réels)</span>
          </div>
          <div class="option-card selected static">
            <div class="option-content">
              <div class="option-desc">
                Largeur réelle du bâtiment, murs extérieurs compris : elle s'applique à l'emprise des murs détectés, pas aux marges ni au cartouche de la page.
              </div>
              ${this.renderWidthInput('Largeur du bâtiment :')}
              ${this.renderFootprintInfo()}
            </div>
          </div>
        </div>
      `;
    }
    const isSvg = src.kind === 'svg';
    const option = (mode: 'auto_dimension' | 'interactive_calibrate', title: string, recommended: boolean, desc: string, extra: unknown) => html`
      <div
        class="option-card ${this.calibrateMode === mode ? 'selected' : ''}"
        @click=${() => this.calibrateMode = mode}
      >
        <input
          type="radio"
          class="option-radio"
          name="calib"
          .checked=${this.calibrateMode === mode}
          @change=${() => this.calibrateMode = mode}
        />
        <div class="option-content">
          <div class="option-title">
            <span>${title}</span>
            ${recommended ? html`<span class="option-badge">Recommandé</span>` : nothing}
          </div>
          <div class="option-desc">${desc}</div>
          ${this.calibrateMode === mode ? extra : nothing}
        </div>
      </div>
    `;
    return html`
      <div>
        <div class="section-title">
          <span>📏</span>
          <span>Échelle du plan (Mètres réels)</span>
        </div>
        <div class="calibrate-options">
          ${option(
            'auto_dimension',
            isSvg ? '⚡ Étalonnage par la largeur du bâtiment' : '⚡ Étalonnage par la largeur de l\'image',
            isSvg,
            isSvg
              ? 'Indiquez la largeur réelle du bâtiment : elle s\'applique à l\'emprise des murs détectés, pas aux marges de la page.'
              : 'Indiquez la largeur réelle couverte par toute l\'image, marges comprises. Si le plan a des marges, un cartouche ou des cotes autour, préférez la mesure d\'un mur.',
            html`
              ${this.renderWidthInput(isSvg ? 'Largeur du bâtiment :' : 'Largeur de l\'image entière :')}
              ${isSvg ? this.renderFootprintInfo() : nothing}
            `
          )}
          ${option(
            'interactive_calibrate',
            '📐 Étalonnage assisté par mesure de mur',
            !isSvg,
            'Vous tracerez un segment directement sur un mur mesuré du plan (ex : 3,50 m) pour étalonner avec précision.',
            nothing
          )}
        </div>
      </div>
    `;
  }

  private renderOpacity() {
    return html`
      <div class="slider-row">
        <span class="slider-label">Opacité du fond :</span>
        <input
          type="range"
          class="slider-input"
          min="0.05"
          max="1.0"
          step="0.05"
          .value=${String(this.opacity)}
          @input=${(e: Event) => this.opacity = Number((e.target as HTMLInputElement).value)}
        />
        <span class="slider-val">${Math.round(this.opacity * 100)}%</span>
      </div>
    `;
  }

  private renderConfirmLabel(src: LoadedSource | null) {
    if (src?.kind === 'project') {
      return html`<span>📂</span><span>Importer le projet</span>`;
    }
    if (this.isVectorizing()) {
      const walls = this.result?.stats.wallCount ?? 0;
      return html`<span>✨</span><span>Convertir le plan SVG (${plural(walls, 'mur', 'murs')})</span>`;
    }
    return html`<span>🚀</span><span>Charger le plan</span>`;
  }

  render() {
    const src = this.source;
    const blocker = this.confirmBlocker();
    const vectorizing = this.isVectorizing();

    return html`
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="import-title" tabindex="-1">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon">📥</span>
            <div>
              <h3 class="modal-title" id="import-title">Importer & Interpréter un plan</h3>
              <p class="modal-subtitle">SVG (vectoriel intelligent), PNG, JPEG, WebP, ou sauvegarde de projet (.json)</p>
            </div>
          </div>
          <button class="btn-close" title="Fermer" @click=${this.close}>✕</button>
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
            <div class="busy-box" role="status"><span class="spinner"></span><span>${this.busy}</span></div>
          ` : nothing}
          ${this.error ? html`<div class="error-box" role="alert">❌ ${this.error}</div>` : nothing}
          ${this.hint ? html`<div class="ignored-note">ℹ️ ${this.hint}</div>` : nothing}

          ${src?.kind === 'svg' ? this.renderSvgOptions(src) : nothing}
          ${src?.kind === 'project' ? this.renderProjectSummary(src) : nothing}
          ${src && src.kind !== 'project' ? this.renderScale(src) : nothing}
          ${src && src.kind !== 'project' && this.includesBackground(src) ? this.renderOpacity() : nothing}
        </div>

        <div class="modal-footer">
          ${blocker ? html`<span class="footer-note">${blocker}</span>` : nothing}
          <button class="btn-cancel" @click=${this.close}>Annuler</button>
          <button
            class="btn-confirm ${vectorizing ? 'btn-magic' : ''}"
            ?disabled=${blocker !== null}
            @click=${this.confirmImport}
          >
            ${this.renderConfirmLabel(src)}
          </button>
        </div>
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
