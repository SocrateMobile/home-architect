import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export interface ImportModalResult {
  dataUrl: string;
  widthPx: number;
  heightPx: number;
  opacity: number;
  mode: 'auto_dimension' | 'interactive_calibrate';
  totalWidthMeters?: number;
  targetLevel?: string;
}

@customElement('home-architect-import-modal')
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

    .modal-card {
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      width: 580px;
      max-width: 92vw;
      max-height: 90vh;
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

    /* Aperçu de l'image chargée */
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
      object-fit: cover;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: #090d16;
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

    .btn-confirm:hover:not(:disabled) {
      background: #0369a1;
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.5);
    }

    .btn-confirm:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: none;
    }
  `;

  @property({ type: String })
  public currentLevel: string = 'rdc';

  @state()
  private imageDataUrl: string | null = null;

  @state()
  private imageWidth: number = 0;

  @state()
  private imageHeight: number = 0;

  @state()
  private imageName: string = '';

  @state()
  private calibrateMode: 'auto_dimension' | 'interactive_calibrate' = 'auto_dimension';

  @state()
  private totalWidthMeters: number = 12.0;

  @state()
  private opacity: number = 0.40;

  @state()
  private isDragOver: boolean = false;

  private fileInputRef: HTMLInputElement | null = null;
  private _boundPasteListener: any = null;

  connectedCallback() {
    super.connectedCallback();
    this._boundPasteListener = this.handleModalPaste.bind(this);
    window.addEventListener('paste', this._boundPasteListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._boundPasteListener) {
      window.removeEventListener('paste', this._boundPasteListener);
    }
  }

  private handleModalPaste(e: ClipboardEvent) {
    if (!e.clipboardData) return;
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          this.processFile(file);
          return;
        }
      }
    }
  }

  private triggerFileInput() {
    if (!this.fileInputRef) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.style.display = 'none';
      input.addEventListener('change', (e: any) => {
        const file = e.target.files?.[0];
        if (file) this.processFile(file);
      });
      this.fileInputRef = input;
    }
    this.fileInputRef.click();
  }

  private processFile(file: File) {
    this.imageName = file.name || 'Plan importé';
    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const dataUrl = loadEvt.target?.result as string;
      const img = new Image();
      img.onload = () => {
        this.imageDataUrl = dataUrl;
        this.imageWidth = img.naturalWidth;
        this.imageHeight = img.naturalHeight;
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }

  private handleDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragOver = false;
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        this.processFile(file);
      }
    }
  }

  private handleDragOver(e: DragEvent) {
    e.preventDefault();
    this.isDragOver = true;
  }

  private handleDragLeave() {
    this.isDragOver = false;
  }

  private async handlePasteButtonClick() {
    try {
      if (navigator.clipboard && navigator.clipboard.read) {
        const items = await navigator.clipboard.read();
        for (const item of items) {
          const imageType = item.types.find(t => t.startsWith('image/'));
          if (imageType) {
            const blob = await item.getType(imageType);
            const file = new File([blob], 'clipboard_image.png', { type: imageType });
            this.processFile(file);
            return;
          }
        }
      }
      alert('Appuyez simplement sur Cmd+V ou Ctrl+V pour coller l\'image directement !');
    } catch (_) {
      alert('Appuyez directement sur Cmd+V ou Ctrl+V pour coller l\'image de votre plan !');
    }
  }

  private close() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private confirmImport() {
    if (!this.imageDataUrl) return;

    this.dispatchEvent(new CustomEvent('import-confirmed', {
      detail: {
        dataUrl: this.imageDataUrl,
        widthPx: this.imageWidth,
        heightPx: this.imageHeight,
        opacity: this.opacity,
        mode: this.calibrateMode,
        totalWidthMeters: this.totalWidthMeters,
        targetLevel: this.currentLevel
      } as ImportModalResult,
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon">📥</span>
            <div>
              <h3 class="modal-title">Importer & Vectoriser un plan</h3>
              <p class="modal-subtitle">Chargez votre plan en image (PNG, JPG, SVG) et calibrez-le automatiquement</p>
            </div>
          </div>
          <button class="btn-close" @click=${this.close}>✕</button>
        </div>

        <div class="modal-body">
          <!-- Zone de Dépôt ou Aperçu -->
          ${!this.imageDataUrl ? html`
            <div 
              class="drop-zone ${this.isDragOver ? 'dragover' : ''}"
              @dragover=${this.handleDragOver}
              @dragleave=${this.handleDragLeave}
              @drop=${this.handleDrop}
              @click=${this.triggerFileInput}
            >
              <span class="drop-icon">🖼️</span>
              <div class="drop-text">Glissez-déposez l'image de votre plan ici</div>
              <div class="drop-subtext">Prend en charge PNG, JPG, JPEG, SVG et WebP</div>

              <div class="drop-actions" @click=${(e: Event) => e.stopPropagation()}>
                <button class="btn-action-small" @click=${this.triggerFileInput}>
                  📁 Choisir un fichier
                </button>
                <button class="btn-action-small" @click=${this.handlePasteButtonClick}>
                  📋 Coller (Cmd+V)
                </button>
              </div>
            </div>
          ` : html`
            <div class="preview-card">
              <img class="preview-thumb" src="${this.imageDataUrl}" alt="Aperçu du plan" />
              <div class="preview-meta">
                <div class="preview-title">
                  <span>✅</span>
                  <span>${this.imageName || 'Plan sélectionné'}</span>
                </div>
                <div class="preview-dimensions">
                  Résolution : ${this.imageWidth} × ${this.imageHeight} px
                </div>
                <button class="btn-change-image" @click=${this.triggerFileInput}>
                  🔄 Remplacer l'image
                </button>
              </div>
            </div>
          `}

          <!-- Méthode d'Étalonnage Automatisée -->
          <div>
            <div class="section-title">
              <span>📏</span>
              <span>Étalonnage de l'échelle (Mètres réels)</span>
            </div>

            <div class="calibrate-options">
              <!-- Option A : Automatisé par dimension globale -->
              <div 
                class="option-card ${this.calibrateMode === 'auto_dimension' ? 'selected' : ''}"
                @click=${() => this.calibrateMode = 'auto_dimension'}
              >
                <input 
                  type="radio" 
                  class="option-radio" 
                  name="calib" 
                  .checked=${this.calibrateMode === 'auto_dimension'}
                  @change=${() => this.calibrateMode = 'auto_dimension'}
                />
                <div class="option-content">
                  <div class="option-title">
                    <span>⚡ Étalonnage automatique instantané</span>
                    <span class="option-badge">Recommandé</span>
                  </div>
                  <div class="option-desc">
                    Indiquez la largeur totale estimée de la façade ou du bâtiment. L'échelle sera calculée automatiquement.
                  </div>

                  ${this.calibrateMode === 'auto_dimension' ? html`
                    <div class="input-row" @click=${(e: Event) => e.stopPropagation()}>
                      <label style="font-size: 0.82rem; color: #94a3b8;">Largeur totale :</label>
                      <input 
                        type="number" 
                        step="0.5" 
                        min="1" 
                        max="100" 
                        class="dimension-input"
                        .value=${this.totalWidthMeters}
                        @input=${(e: any) => this.totalWidthMeters = parseFloat(e.target.value) || 10}
                      />
                      <span class="unit-tag">mètres</span>
                    </div>
                  ` : null}
                </div>
              </div>

              <!-- Option B : Tracé manuel assisté sur un mur -->
              <div 
                class="option-card ${this.calibrateMode === 'interactive_calibrate' ? 'selected' : ''}"
                @click=${() => this.calibrateMode = 'interactive_calibrate'}
              >
                <input 
                  type="radio" 
                  class="option-radio" 
                  name="calib" 
                  .checked=${this.calibrateMode === 'interactive_calibrate'}
                  @change=${() => this.calibrateMode = 'interactive_calibrate'}
                />
                <div class="option-content">
                  <div class="option-title">
                    <span>📐 Étalonnage assisté par mesure de mur</span>
                  </div>
                  <div class="option-desc">
                    Vous tracerez un segment directement sur un mur mesuré du plan (ex: 3,50 m) pour étalonner avec précision.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Réglage d'opacité du calque -->
          <div class="slider-row">
            <span class="slider-label">Opacité en filigrane :</span>
            <input 
              type="range" 
              class="slider-input" 
              min="0.10" 
              max="1.0" 
              step="0.05"
              .value=${this.opacity}
              @input=${(e: any) => this.opacity = parseFloat(e.target.value)}
            />
            <span class="slider-val">${Math.round(this.opacity * 100)}%</span>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click=${this.close}>Annuler</button>
          <button 
            class="btn-confirm" 
            ?disabled=${!this.imageDataUrl} 
            @click=${this.confirmImport}
          >
            <span>🚀</span>
            <span>Charger le plan</span>
          </button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-import-modal': HomeArchitectImportModal;
  }
}
