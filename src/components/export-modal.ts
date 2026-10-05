import { LitElement, html, css, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ExportFrame, HomeArchitectProject, PublishInfo } from '../core/types';
import { SvgExporter, SvgExportOptions, DEFAULT_EXPORT_BACKGROUND } from '../core/svg-exporter';
import { LovelaceGenerator } from '../core/lovelace-generator';
import { defineElement } from '../core/define';
import { HaApiError, PayloadTooLargeError, fetchBackgroundBlob, isAdmin, publishSvg, unpublish } from '../core/ha-api';
import { MAX_PUBLISH_BYTES, legacyCategory, normalizeProject, stripServerFields } from '../core/project-model';
import { blobToDataUrl, dataUrlToBlob, triggerDownload } from '../core/image-utils';

type ExportTab = 'picture_elements' | 'custom_card' | 'raw_files';
type BusyAction = 'publish' | 'unpublish' | 'svg' | 'backup';
type ConfirmAction = 'publish' | 'unpublish' | 'reframe';
type CopyTarget = 'picture' | 'card';

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

export class HomeArchitectExportModal extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(14px);
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
      position: relative;
      background: #1e293b;
      border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 16px;
      width: 720px;
      max-width: 94vw;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px rgba(56, 189, 248, 0.25);
      overflow: hidden;
    }

    .modal-header {
      padding: 16px 22px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(15, 23, 42, 0.7);
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

    .btn-close:hover:not(:disabled) {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .btn-close:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* Onglets de navigation */
    .tabs-nav {
      display: flex;
      flex-wrap: wrap;
      background: rgba(15, 23, 42, 0.5);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0 16px;
      gap: 6px;
    }

    .tab-btn {
      padding: 12px 16px;
      font-size: 0.88rem;
      font-weight: 600;
      color: #94a3b8;
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
    }

    .tab-btn:hover {
      color: #e2e8f0;
    }

    .tab-btn.active {
      color: #38bdf8;
      border-bottom-color: #38bdf8;
      background: rgba(56, 189, 248, 0.06);
    }

    .modal-body {
      padding: 20px 24px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
      flex: 1;
    }

    /* Entités stats banner */
    .stats-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
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
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #cbd5e1;
    }

    .stat-badge.highlight {
      border-color: #38bdf8;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.1);
    }

    /* Sections (publication, cadre, code) */
    .section {
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 14px 16px;
    }

    .section-title {
      font-size: 0.92rem;
      font-weight: 700;
      color: #38bdf8;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .hint {
      font-size: 0.8rem;
      color: #94a3b8;
      line-height: 1.45;
      margin: 0;
    }

    .hint code,
    .banner code,
    .status-line code {
      background: rgba(0, 0, 0, 0.35);
      padding: 1px 6px;
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-size: 0.78rem;
      word-break: break-all;
    }

    .status-line {
      font-size: 0.84rem;
      color: #e2e8f0;
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
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 10px 14px;
    }

    .config-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #e2e8f0;
    }

    .check-row {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      cursor: pointer;
      user-select: none;
    }

    .check-row input {
      accent-color: #38bdf8;
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
      border: 1px solid rgba(255, 255, 255, 0.15);
      flex-shrink: 0;
    }

    /* Bouton action primaire */
    .btn-action {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
      text-decoration: none;
    }

    .btn-action:hover:not(:disabled) {
      background: #0369a1;
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.45);
    }

    .btn-action:disabled,
    .btn-secondary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-action.emerald {
      background: #059669;
      border-color: #10b981;
    }

    .btn-action.emerald:hover:not(:disabled) {
      background: #047857;
      box-shadow: 0 0 14px rgba(16, 185, 129, 0.45);
    }

    .btn-action.purple {
      background: #7c3aed;
      border-color: #a855f7;
    }

    .btn-action.purple:hover:not(:disabled) {
      background: #6d28d9;
      box-shadow: 0 0 14px rgba(168, 85, 247, 0.45);
    }

    .btn-action.danger {
      background: rgba(239, 68, 68, 0.15);
      border-color: rgba(239, 68, 68, 0.6);
      color: #fca5a5;
    }

    .btn-action.danger:hover:not(:disabled) {
      background: #b91c1c;
      color: #ffffff;
      box-shadow: 0 0 14px rgba(239, 68, 68, 0.45);
    }

    .btn-action.ghost {
      background: rgba(30, 41, 59, 0.8);
      border-color: rgba(255, 255, 255, 0.15);
      color: #e2e8f0;
    }

    /* Zone de code YAML */
    .code-container {
      position: relative;
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid rgba(56, 189, 248, 0.3);
      background: #090d16;
    }

    .code-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 14px;
      background: rgba(15, 23, 42, 0.8);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 0.8rem;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .btn-copy {
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid rgba(56, 189, 248, 0.35);
      color: #38bdf8;
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    .btn-copy:hover {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
    }

    .btn-copy.copied {
      background: #059669;
      border-color: #10b981;
      color: #ffffff;
    }

    pre.code-box {
      margin: 0;
      padding: 14px 16px;
      max-height: 280px;
      overflow: auto;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 0.82rem;
      line-height: 1.5;
      color: #e2e8f0;
      white-space: pre;
    }

    textarea.manual-copy {
      width: 100%;
      box-sizing: border-box;
      min-height: 140px;
      background: #090d16;
      color: #e2e8f0;
      border: 1px solid #38bdf8;
      border-radius: 8px;
      padding: 10px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.8rem;
      resize: vertical;
    }

    /* Guide pas-à-pas */
    .guide-box {
      background: rgba(56, 189, 248, 0.06);
      border: 1px solid rgba(56, 189, 248, 0.2);
      border-radius: 10px;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .guide-title {
      font-size: 0.86rem;
      font-weight: 700;
      color: #38bdf8;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .guide-step {
      font-size: 0.8rem;
      color: #cbd5e1;
      line-height: 1.45;
      display: flex;
      gap: 8px;
    }

    .guide-num {
      background: #0284c7;
      color: #ffffff;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.72rem;
      font-weight: bold;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .modal-footer {
      padding: 14px 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 10px;
      background: rgba(15, 23, 42, 0.6);
    }

    .btn-secondary {
      background: rgba(51, 65, 85, 0.7);
      color: #cbd5e1;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-secondary:hover:not(:disabled) {
      background: #475569;
      color: #ffffff;
    }

    /* Bandeaux d'information / d'avertissement */
    .banner {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 0.82rem;
      line-height: 1.45;
      animation: fadeIn 0.2s ease-out;
    }

    .banner.success {
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: #6ee7b7;
    }

    .banner.info {
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.35);
      color: #bae6fd;
    }

    .banner.warning {
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid rgba(245, 158, 11, 0.45);
      color: #fcd34d;
    }

    .banner.error {
      background: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #fca5a5;
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

    /* Notification flottante */
    .floating-toast {
      position: absolute;
      top: 18px;
      left: 50%;
      transform: translateX(-50%);
      max-width: 90%;
      padding: 10px 22px;
      border-radius: 12px;
      font-size: 0.88rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
      z-index: 200;
      animation: popToast 0.25s ease-out;
      pointer-events: none;
      color: #ffffff;
    }

    .floating-toast.success {
      background: #059669;
      border: 1px solid #10b981;
    }

    .floating-toast.error {
      background: #b91c1c;
      border: 1px solid #ef4444;
    }

    .floating-toast.info {
      background: #0369a1;
      border: 1px solid #38bdf8;
    }

    @keyframes popToast {
      from { transform: translate(-50%, -10px); opacity: 0; }
      to { transform: translate(-50%, 0); opacity: 1; }
    }
  `;

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

  @state()
  private publishError: string = '';

  @state()
  private notice: { kind: 'success' | 'error' | 'info'; text: string } | null = null;

  @state()
  private copied: CopyTarget | null = null;

  /** Texte à copier à la main quand le presse-papiers est inaccessible (HTTP, WebView). */
  @state()
  private manualCopyText: string | null = null;

  // Valeurs dérivées, recalculées dans willUpdate uniquement quand leurs entrées changent.
  private frame: ExportFrame | null = null;
  private outOfFrame: boolean = false;
  private pictureYaml: string = '';
  private cardYaml: string = '';

  private noticeTimer: ReturnType<typeof setTimeout> | undefined;
  private copiedTimer: ReturnType<typeof setTimeout> | undefined;

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this.noticeTimer);
    clearTimeout(this.copiedTimer);
  }

  protected willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);
    if (changed.has('project') && this.project) {
      const previous = changed.get('project') as HomeArchitectProject | undefined;
      if (!previous || previous.id !== this.project.id) {
        // Autre plan : on repart de l'état du serveur.
        this.publishInfo = this.project.publish ?? null;
        this.includeBackground = this.publishInfo?.include_background ?? false;
        this.localFrame = null;
        this.frameStale = false;
        this.confirmAction = null;
        this.publishError = '';
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
    if (changed.has('manualCopyText') && this.manualCopyText !== null) {
      const area = this.renderRoot.querySelector<HTMLTextAreaElement>('textarea.manual-copy');
      if (area) {
        area.focus();
        area.select();
        area.setSelectionRange(0, area.value.length);
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

  private showNotice(kind: 'success' | 'error' | 'info', text: string): void {
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
      throw new Error("Aucune image de fond téléversée pour ce plan.");
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
      console.warn('[home-architect] Image de fond illisible :', err);
      throw new HaApiError(
        'background_unavailable',
        "Image de fond introuvable ou illisible sur le serveur : décochez « Inclure l'image de fond » ou réimportez l'image."
      );
    }
    const encodedBytes = Math.ceil(blob.size / 3) * 4;
    if (encodedBytes > MAX_PUBLISH_BYTES) {
      const mb = (n: number) => `${(n / (1024 * 1024)).toFixed(1)} Mo`;
      throw new PayloadTooLargeError(
        `Image de fond trop volumineuse pour être incluse (${mb(encodedBytes)} une fois encodée, maximum ${mb(MAX_PUBLISH_BYTES)}).`,
        encodedBytes,
        MAX_PUBLISH_BYTES
      );
    }
    const dataUrl = SvgExporter.embeddableDataUrl(await blobToDataUrl(blob));
    if (!dataUrl) {
      throw new Error("Format d'image de fond non pris en charge (PNG, JPEG, WebP, GIF ou SVG attendu) : décochez « Inclure l'image de fond ».");
    }
    return dataUrl;
  }

  /** Message lisible d'une erreur ; `withBackground` : l'image de fond faisait partie de l'envoi. */
  private describeError(err: unknown, withBackground: boolean = false): string {
    if (err instanceof PayloadTooLargeError) {
      return withBackground ? `${err.message} Décochez « Inclure l'image de fond » ou allégez l'image.` : err.message;
    }
    if (err instanceof HaApiError) {
      switch (err.code) {
        case 'not_found':
          return "Ce plan n'existe pas encore sur le serveur : sauvegardez-le, puis réessayez.";
        case 'invalid_svg':
          return 'Le serveur a refusé le SVG généré (format non valide).';
        case 'write_failed':
          return "Le serveur n'a pas pu écrire le plan publié (voir le journal de Home Assistant).";
        case 'unknown_command':
          return "Le serveur Home Architect n'est pas à jour : redémarrez Home Assistant pour terminer la mise à jour.";
        case 'connection_lost':
        case 'not_connected':
          return 'Connexion à Home Assistant indisponible : réessayez dans un instant.';
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
      this.confirmAction = 'publish';
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
    this.publishError = '';
    const project = this.project;
    const wasPublished = !!this.publishInfo;
    const includeBackground = this.includeBackground && this.hasEmbeddableBackground;
    try {
      const backgroundDataUrl = includeBackground ? await this.loadBackgroundDataUrl() : undefined;
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
        adoptFrame && wasPublished ? 'Plan publié avec le nouveau cadre : recollez le code YAML.' : 'Plan publié : copiez le code YAML ci-dessous.'
      );
    } catch (err) {
      console.warn('[home-architect] Publication du plan impossible :', err);
      this.publishError = this.describeError(err, includeBackground);
    } finally {
      this.busy = null;
    }
  }

  private async unpublishPlan(): Promise<void> {
    if (!this.canEdit || this.busy || !this.publishInfo) return;
    if (this.confirmAction !== 'unpublish') {
      this.confirmAction = 'unpublish';
      return;
    }
    this.confirmAction = null;
    this.busy = 'unpublish';
    this.publishError = '';
    const projectId = this.project.id;
    try {
      await unpublish(this.hass, projectId);
      this.emit('project-unpublished', { projectId });
      // Autre plan ouvert pendant l'envoi : son état de publication n'est pas concerné.
      if (this.project?.id !== projectId) return;
      this.publishInfo = null;
      this.frameStale = false;
      this.showNotice('info', "Plan dépublié : l'ancienne URL ne fonctionne plus.");
    } catch (err) {
      console.warn('[home-architect] Dépublication impossible :', err);
      this.publishError = this.describeError(err);
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
      this.confirmAction = 'reframe';
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
    this.showNotice('success', 'Code YAML copié dans le presse-papiers.');
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
          console.warn("[home-architect] Image de fond non incluse dans le SVG :", err);
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
      if (backgroundMissing) this.showNotice('info', "SVG téléchargé sans l'image de fond (image indisponible).");
    } catch (err) {
      console.warn('[home-architect] Téléchargement du SVG impossible :', err);
      this.showNotice('error', `Téléchargement impossible : ${this.describeError(err)}`);
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
          if (!DATA_IMAGE_URL.test(dataUrl)) throw new Error("Type de l'image de fond inconnu.");
          bg.imageUrl = dataUrl;
          // Type MIME sans paramètre (« image/svg+xml;charset=utf-8 » serait écarté à la réimportation).
          const mimeType = blob.type.split(';')[0].trim();
          if (mimeType) bg.mimeType = mimeType;
          delete bg.assetId;
        } catch (err) {
          // L'asset reste référencé : il est encore lisible tant que le plan d'origine existe.
          console.warn("[home-architect] Image de fond non incluse dans la sauvegarde :", err);
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
        backgroundMissing ? "Sauvegarde téléchargée sans l'image de fond (image indisponible)." : 'Sauvegarde du projet téléchargée.'
      );
    } catch (err) {
      console.warn('[home-architect] Sauvegarde JSON impossible :', err);
      this.showNotice('error', `Téléchargement impossible : ${this.describeError(err)}`);
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

  /** Bandeau « plan non sauvegardé » : la carte intégrée lit le serveur, la publication exige un plan sauvegardé. */
  private renderSaveState() {
    if (!this.canEdit || (this.isSavedOnServer && !this.dirty)) return null;
    const neverSaved = !this.isSavedOnServer;
    return html`
      <div class="banner warning">
        <span class="banner-icon">💾</span>
        <div class="banner-text">
          <div class="banner-title">${neverSaved ? "Ce plan n'est pas encore sauvegardé sur le serveur" : 'Modifications non sauvegardées'}</div>
          <div>
            ${neverSaved
              ? 'La carte intégrée ne le trouvera pas et la publication est impossible tant que le plan n\'est pas sauvegardé.'
              : 'La carte intégrée affiche la dernière version sauvegardée. Sauvegardez pour que les deux cartes affichent le même plan.'}
          </div>
          <div class="actions-row">
            <button class="btn-action emerald" @click=${this.requestSave}>💾 Sauvegarder le plan</button>
          </div>
        </div>
      </div>
    `;
  }

  private renderConfirm(action: ConfirmAction) {
    if (this.confirmAction !== action) return null;
    const text = action === 'publish'
      ? 'Le plan publié sera remplacé par l\'état actuel du plan. Les tableaux de bord qui l\'utilisent afficheront immédiatement la nouvelle version.'
        + (this.isFrameFrozen ? '' : ' Le cadre actuel sera figé : recollez ensuite le code YAML.')
      : action === 'unpublish'
        ? 'L\'URL publiée cessera de fonctionner : les cartes picture-elements qui l\'utilisent afficheront une image cassée. Une nouvelle publication créera une nouvelle URL.'
        : 'Le cadre sera recalculé sur le contenu actuel et le plan publié sera mis à jour avec ce cadre : les positions changent, il faudra recoller le nouveau code YAML dans vos tableaux de bord.';
    const confirm = action === 'publish' ? () => this.publish() : action === 'unpublish' ? () => this.unpublishPlan() : () => this.reframe();
    return html`
      <div class="banner warning">
        <span class="banner-icon">❓</span>
        <div class="banner-text">
          <div>${text}</div>
          <div class="actions-row">
            <button class="btn-action ${action === 'unpublish' ? 'danger' : ''}" @click=${confirm}>Confirmer</button>
            <button class="btn-secondary" @click=${() => { this.confirmAction = null; }}>Annuler</button>
          </div>
        </div>
      </div>
    `;
  }

  private renderPublishSection() {
    const info = this.publishInfo;
    const canPublish = this.canEdit && this.isSavedOnServer && !!this.hass && !this.busy;
    const legacyId = !info && legacyCategory(this.project.id) !== undefined;
    const thumb = this.backgroundThumbnail;

    return html`
      <div class="section">
        <div class="section-title"><span>1.</span><span>Publier le plan</span></div>
        <p class="hint">
          Home Assistant sert le plan publié <strong>sans authentification</strong>, à une adresse secrète impossible à deviner :
          ne la partagez pas. Le plan publié n'est mis à jour que lorsque vous cliquez sur « Publier ».
        </p>

        <div class="status-line">
          ${info ? html`
            ✅ Publié le ${this.formatDate(info.published_at)} (${info.include_background ? 'avec' : 'sans'} image de fond)<br />
            <code>${info.url}</code>
          ` : html`⚪ Pas encore publié.`}
        </div>

        ${this.hasExternalBackground ? html`
          <div class="banner info">
            <span class="banner-icon">🌐</span>
            <div class="banner-text">
              L'image de fond est une URL externe : elle n'apparaîtra pas dans la carte picture-elements
              (une image SVG affichée par Lovelace ne charge aucune ressource externe). Importez l'image dans le plan pour pouvoir l'inclure.
            </div>
          </div>
        ` : null}

        ${this.hasEmbeddableBackground && this.canEdit ? html`
          <label class="check-row">
            <input
              type="checkbox"
              .checked=${this.includeBackground}
              ?disabled=${!!this.busy}
              @change=${(e: Event) => { this.includeBackground = (e.target as HTMLInputElement).checked; }}
            />
            ${thumb ? html`<img class="bg-thumb" src=${thumb} alt="" />` : null}
            <div>
              <div class="config-label">Inclure l'image de fond</div>
              <div class="hint">
                ${this.includeBackground
                  ? html`⚠️ <strong>URL publique :</strong> toute personne qui obtient l'URL pourra voir cette image (plan d'architecte, photo…).`
                  : 'Seuls les murs, pièces, ouvertures et meubles sont publiés.'}
              </div>
            </div>
          </label>
        ` : null}

        ${info?.legacy_path ? html`
          <div class="banner warning">
            <span class="banner-icon">⚠️</span>
            <div class="banner-text">
              <div class="banner-title">Ancien fichier public détecté : <code>${info.legacy_path}</code></div>
              <div>
                Il est réécrit à chaque publication et reste accessible sans authentification sous une adresse devinable.
                Remplacez-le dans vos tableaux de bord par le nouveau code YAML, puis cliquez sur « Dépublier » et republiez :
                il sera supprimé (une copie retouchée hors de l'outil est conservée dans <code>/config/home_architect/backups/</code>).
              </div>
            </div>
          </div>
        ` : null}

        ${legacyId && this.canEdit ? html`
          <p class="hint">
            Si un ancien fichier <code>/local/plan_${this.project.id}.svg</code> existe dans <code>/config/www</code>, il sera lui aussi mis à jour à chaque publication.
          </p>
        ` : null}

        ${this.renderConfirm('publish')}
        ${this.renderConfirm('unpublish')}

        ${this.canEdit ? html`
          <div class="actions-row">
            <button class="btn-action emerald" ?disabled=${!canPublish} @click=${this.publish}>
              ${this.busy === 'publish' ? '⏳ Publication…' : info ? '🔄 Mettre à jour le plan publié' : '🚀 Publier le plan'}
            </button>
            ${info ? html`
              <button class="btn-action danger" ?disabled=${!!this.busy} @click=${this.unpublishPlan}>
                ${this.busy === 'unpublish' ? '⏳ Dépublication…' : '🗑️ Dépublier'}
              </button>
            ` : null}
          </div>
        ` : html`<p class="hint">Seul un administrateur peut publier ou mettre à jour le plan.</p>`}

        ${this.publishError ? html`
          <div class="banner error">
            <span class="banner-icon">⚠️</span>
            <div class="banner-text">${this.publishError}</div>
          </div>
        ` : null}
      </div>
    `;
  }

  private renderFrameSection() {
    const frame = this.frame;
    if (!frame) return null;
    const width = (frame.maxX - frame.minX).toFixed(1);
    const height = (frame.maxY - frame.minY).toFixed(1);
    return html`
      <div class="section">
        <div class="section-title"><span>2.</span><span>Cadre d'export</span></div>
        <p class="hint">
          Les positions des entités sont exprimées en pourcentage de ce cadre (${width} × ${height} m).
          ${this.isFrameFrozen
            ? 'Il est figé : vos modifications du plan ne décalent pas les cartes déjà collées.'
            : 'Il sera figé à la prochaine publication, pour que les cartes déjà collées restent alignées.'}
        </p>

        ${this.publishInfo && !this.isFrameFrozen ? html`
          <div class="banner warning">
            <span class="banner-icon">📐</span>
            <div class="banner-text">
              Le cadre de la publication actuelle n'a pas été conservé dans le plan : le code YAML ci-dessous peut ne pas
              correspondre au plan publié. Mettez à jour le plan publié pour figer le cadre, puis recollez le code YAML.
            </div>
          </div>
        ` : null}

        ${this.outOfFrame ? html`
          <div class="banner warning">
            <span class="banner-icon">📐</span>
            <div class="banner-text">
              Le plan dépasse le cadre figé : les éléments hors cadre seront coupés ou mal placés. Recadrez pour l'agrandir.
            </div>
          </div>
        ` : null}

        ${this.frameStale ? html`
          <div class="banner warning">
            <span class="banner-icon">🔁</span>
            <div class="banner-text">
              Le plan publié utilise un nouveau cadre : recollez le nouveau code YAML dans vos tableaux de bord
              (les positions des entités ont changé).
            </div>
          </div>
        ` : null}

        ${this.renderConfirm('reframe')}

        ${this.canEdit && this.isFrameFrozen ? html`
          <div class="actions-row">
            <button class="btn-action ghost" ?disabled=${!!this.busy || (!!this.publishInfo && !this.isSavedOnServer)} @click=${this.reframe}>
              ${this.publishInfo ? '📐 Recadrer sur le plan actuel et republier' : '📐 Recadrer sur le plan actuel'}
            </button>
          </div>
        ` : null}
      </div>
    `;
  }

  private renderCode(yaml: string, target: CopyTarget, title: string) {
    const copied = this.copied === target;
    return html`
      <div class="code-container">
        <div class="code-header">
          <span>${title}</span>
          <button class="btn-copy ${copied ? 'copied' : ''}" @click=${() => this.copyText(yaml, target)}>
            <span>${copied ? '✓ Copié !' : '📋 Copier le YAML'}</span>
          </button>
        </div>
        <pre class="code-box"><code>${yaml}</code></pre>
      </div>
    `;
  }

  private renderPictureElementsTab() {
    const hasBindings = (this.project.bindings || []).length > 0;
    return html`
      ${this.renderSaveState()}
      ${this.renderPublishSection()}
      ${this.renderFrameSection()}

      <div class="section">
        <div class="section-title"><span>3.</span><span>Code Lovelace</span></div>
        ${this.pictureYaml ? html`
          ${!hasBindings ? html`
            <p class="hint">Aucune entité n'est placée sur le plan : la carte affichera le plan seul (<code>elements: []</code>).</p>
          ` : null}
          ${this.renderCode(this.pictureYaml, 'picture', 'Code YAML Picture-Elements')}
        ` : html`
          <p class="hint">Publiez le plan pour obtenir le code de la carte picture-elements (il référence l'URL publiée).</p>
        `}
      </div>

      <div class="guide-box">
        <div class="guide-title">
          <span>💡</span>
          <span>Comment installer cette carte dans Home Assistant :</span>
        </div>
        <div class="guide-step">
          <span class="guide-num">1</span>
          <div>Sauvegardez puis <strong>publiez</strong> le plan (l'image est servie par Home Assistant, aucun fichier à copier).</div>
        </div>
        <div class="guide-step">
          <span class="guide-num">2</span>
          <div>Cliquez sur <strong>Copier le YAML</strong>.</div>
        </div>
        <div class="guide-step">
          <span class="guide-num">3</span>
          <div>
            Dans votre tableau de bord, cliquez sur <strong>Modifier le tableau de bord</strong> > <strong>Ajouter une carte</strong> > <strong>Manuel</strong>, collez le code et enregistrez.
          </div>
        </div>
        <div class="guide-step">
          <span class="guide-num">4</span>
          <div>Après une modification du plan, cliquez sur <strong>Mettre à jour le plan publié</strong> : l'URL reste la même et les tableaux de bord se mettent à jour.</div>
        </div>
      </div>
    `;
  }

  private renderCustomCardTab() {
    return html`
      ${this.renderSaveState()}

      <div class="guide-box" style="background: rgba(168, 85, 247, 0.08); border-color: rgba(168, 85, 247, 0.3);">
        <div class="guide-title" style="color: #c084fc;">
          <span>✨</span>
          <span>Carte 2D & 3D temps réel, sans publication</span>
        </div>
        <div style="font-size: 0.82rem; color: #cbd5e1; line-height: 1.45;">
          Cette carte utilise directement le moteur de rendu Home Architect et lit le plan <strong>sauvegardé</strong> sur votre serveur
          (aucune URL publique). Elle affiche votre plan en 2D ou en <strong>3D isométrique</strong>, anime les capteurs en temps réel,
          et se met à jour à chaque sauvegarde du plan.
        </div>
      </div>

      <div class="config-row">
        <span class="config-label">Mode de vue par défaut :</span>
        <div class="actions-row">
          <button
            class="btn-action ${this.customCardViewMode === '2d' ? '' : 'ghost'}"
            @click=${() => { this.customCardViewMode = '2d'; }}
          >
            📐 Vue 2D
          </button>
          <button
            class="btn-action ${this.customCardViewMode === '3d' ? 'purple' : 'ghost'}"
            @click=${() => { this.customCardViewMode = '3d'; }}
          >
            🧊 Vue 3D Isométrique
          </button>
        </div>
      </div>

      ${this.renderCode(this.cardYaml, 'card', 'Code Lovelace YAML')}

      <div class="guide-box">
        <div class="guide-title">
          <span>🚀</span>
          <span>Installation rapide :</span>
        </div>
        <div class="guide-step">
          <span class="guide-num">1</span>
          <div>Sauvegardez le plan (la carte lit la version sauvegardée).</div>
        </div>
        <div class="guide-step">
          <span class="guide-num">2</span>
          <div>
            Dans Lovelace, cliquez sur <strong>Modifier le tableau de bord</strong> > <strong>Ajouter une carte</strong> > <strong>Manuel</strong>, collez ce code YAML et enregistrez.
          </div>
        </div>
      </div>
    `;
  }

  private renderFilesTab() {
    return html`
      <div class="config-row">
        <div>
          <div class="config-label">Fichier vectoriel SVG</div>
          <div class="hint">Idéal pour ouvrir dans Inkscape, Illustrator ou imprimer (même cadre que le plan publié).</div>
          ${this.hasEmbeddableBackground ? html`
            <label class="check-row" style="margin-top: 8px;">
              <input
                type="checkbox"
                .checked=${this.downloadWithBackground}
                @change=${(e: Event) => { this.downloadWithBackground = (e.target as HTMLInputElement).checked; }}
              />
              <span class="hint">Inclure l'image de fond</span>
            </label>
          ` : null}
        </div>
        <button class="btn-action emerald" ?disabled=${!!this.busy} @click=${this.downloadSvg}>
          <span>📐</span>
          <span>${this.busy === 'svg' ? 'Préparation…' : 'Télécharger le SVG'}</span>
        </button>
      </div>

      <div class="config-row">
        <div>
          <div class="config-label">Sauvegarde complète du projet (JSON)</div>
          <div class="hint">
            Murs, pièces, ouvertures, meubles, entités et image de fond. Réimportable depuis la fenêtre d'import (fichier .json).
          </div>
        </div>
        <button class="btn-action purple" ?disabled=${!!this.busy} @click=${this.downloadBackup}>
          <span>💾</span>
          <span>${this.busy === 'backup' ? 'Préparation…' : 'Télécharger la sauvegarde JSON'}</span>
        </button>
      </div>
    `;
  }

  render() {
    if (!this.project) return null;
    const summary = this.getEntitySummary();
    const footerYaml = this.activeTab === 'picture_elements' ? this.pictureYaml : this.activeTab === 'custom_card' ? this.cardYaml : '';
    const footerTarget: CopyTarget = this.activeTab === 'custom_card' ? 'card' : 'picture';

    return html`
      <div class="modal-card" @click=${(e: Event) => e.stopPropagation()}>
        <!-- En-tête -->
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon">📤</span>
            <div>
              <h2 class="modal-title">Exporter le plan vers Lovelace</h2>
              <p class="modal-subtitle">Générez une carte interactive pour votre tableau de bord Home Assistant</p>
            </div>
          </div>
          <button class="btn-close" ?disabled=${this.isWriting} @click=${this.handleClose} title="Fermer">✕</button>
        </div>

        <!-- Onglets -->
        <div class="tabs-nav">
          <button
            class="tab-btn ${this.activeTab === 'picture_elements' ? 'active' : ''}"
            @click=${() => { this.activeTab = 'picture_elements'; }}
          >
            <span>🖼️</span>
            <span>Carte Picture-Elements (Native)</span>
          </button>

          <button
            class="tab-btn ${this.activeTab === 'custom_card' ? 'active' : ''}"
            @click=${() => { this.activeTab = 'custom_card'; }}
          >
            <span>🧊</span>
            <span>Carte 2D/3D (Intégrée)</span>
          </button>

          <button
            class="tab-btn ${this.activeTab === 'raw_files' ? 'active' : ''}"
            @click=${() => { this.activeTab = 'raw_files'; }}
          >
            <span>💾</span>
            <span>Fichiers & Sauvegarde</span>
          </button>
        </div>

        <!-- Corps de la modale -->
        <div class="modal-body">
          <!-- Résumé des entités liées -->
          <div class="stats-row">
            <div class="stat-badge highlight">
              <span>🏠</span>
              <span><strong>${summary.rooms}</strong> pièces</span>
            </div>
            <div class="stat-badge">
              <span>💡</span>
              <span><strong>${summary.lights}</strong> lumière(s)</span>
            </div>
            <div class="stat-badge">
              <span>📡</span>
              <span><strong>${summary.radars}</strong> détecteur(s)</span>
            </div>
            <div class="stat-badge">
              <span>🌡️</span>
              <span><strong>${summary.sensors}</strong> capteur(s) / temp.</span>
            </div>
            <div class="stat-badge">
              <span>🔌</span>
              <span><strong>${summary.switches}</strong> prise(s) / switch</span>
            </div>
            ${summary.furniture > 0 ? html`
              <div class="stat-badge">
                <span>🛋️</span>
                <span><strong>${summary.furniture}</strong> meuble(s)</span>
              </div>
            ` : ''}
          </div>

          ${this.manualCopyText !== null ? html`
            <div class="banner info">
              <span class="banner-icon">📋</span>
              <div class="banner-text">
                <div>Copie automatique impossible dans ce navigateur : le code est sélectionné ci-dessous, copiez-le avec Ctrl+C (⌘C) ou le menu « Copier ».</div>
                <textarea class="manual-copy" readonly .value=${this.manualCopyText}></textarea>
                <div class="actions-row">
                  <button class="btn-secondary" @click=${() => { this.manualCopyText = null; }}>Fermer</button>
                </div>
              </div>
            </div>
          ` : null}

          ${this.activeTab === 'picture_elements' ? this.renderPictureElementsTab() : null}
          ${this.activeTab === 'custom_card' ? this.renderCustomCardTab() : null}
          ${this.activeTab === 'raw_files' ? this.renderFilesTab() : null}
        </div>

        <!-- Notification flottante -->
        ${this.notice ? html`
          <div class="floating-toast ${this.notice.kind}" role="status">
            <span>${this.notice.kind === 'error' ? '⚠️' : this.notice.kind === 'success' ? '✅' : 'ℹ️'}</span>
            <span>${this.notice.text}</span>
          </div>
        ` : null}

        <!-- Pied de page -->
        <div class="modal-footer">
          <button class="btn-secondary" ?disabled=${this.isWriting} @click=${this.handleClose}>Fermer</button>
          ${footerYaml ? html`
            <button
              class="btn-action ${this.copied === footerTarget ? 'emerald' : (this.activeTab === 'custom_card' ? 'purple' : '')}"
              style="padding: 10px 22px; font-size: 0.92rem; font-weight: 700;"
              @click=${() => this.copyText(footerYaml, footerTarget)}
            >
              <span>📋</span>
              <span>${this.copied === footerTarget ? 'Copié dans le presse-papiers !' : 'Copier le YAML dans le presse-papiers'}</span>
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
