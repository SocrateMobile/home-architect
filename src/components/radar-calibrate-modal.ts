import { LitElement, html, css, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { EntityBinding, Point, RadarConfig, RadarTargetConfig, Room } from '../core/types';
import { defineElement } from '../core/define';
import { getEventTarget } from '../core/keyboard';
import { LocalizeController } from '../i18n';
import '../i18n/locales/panel';
import { applyColorScheme, uiThemeStyles } from '../styles/theme.styles';
import { DialogFocusController, geometryModalStyles } from './room-modal';
import {
  autoPlaceCalibrationPoints,
  buildRadarConeSvgPath,
  computeAffineMatrix,
  computeRadarZoneBoundsMm,
  DEFAULT_TARGET_COLORS,
  createDefaultRadarConfig,
  discoverRadarEntities,
  discoverRadarZoneEntities,
  projectRadarPointToPlan,
  readTargetRawState,
} from '../core/radar';

export interface RadarCalibrationModalResult {
  radarConfig: RadarConfig;
}

const SVG_VIEW_W = 520;
const SVG_VIEW_H = 380;
const SVG_PAD_PX = 32;

const CORNER_GUIDE_LABELS = [
  'le 1er angle de la pièce (ex. supérieur gauche)',
  'le 2e angle de la pièce (ex. supérieur droit)',
  'le 3e angle de la pièce (ex. inférieur droit)',
  'le 4e angle de la pièce (ex. inférieur gauche)',
];

export class HomeArchitectRadarModal extends LitElement {
  static styles = [
    uiThemeStyles,
    geometryModalStyles,
    css`
      .modal-card {
        width: 880px;
        max-width: calc(100vw - 32px);
        max-height: calc(100vh - 40px);
      }

      .radar-dialog-grid {
        display: grid;
        grid-template-columns: 1fr 330px;
        gap: 16px;
        padding: 16px 20px;
        overflow-y: auto;
      }

      @media (max-width: 768px) {
        .radar-dialog-grid {
          grid-template-columns: 1fr;
        }
      }

      .wizard-card {
        background: var(--arch-ui-surface-2, rgba(255, 255, 255, 0.04));
        border: 1px solid var(--arch-ui-border);
        border-radius: 12px;
        padding: 14px 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .wizard-step-banner {
        display: flex;
        align-items: center;
        gap: 12px;
        background: var(--arch-primary-faint, rgba(59, 130, 246, 0.12));
        border: 1px solid var(--arch-primary, #3b82f6);
        border-radius: 10px;
        padding: 10px 14px;
      }

      .wizard-step-banner.finished {
        background: rgba(34, 197, 94, 0.12);
        border-color: rgba(34, 197, 94, 0.5);
      }

      .wizard-step-badge {
        font-size: 20px;
        flex-shrink: 0;
      }

      .wizard-step-title {
        font-weight: 700;
        font-size: 14px;
        color: var(--arch-ui-text);
        margin: 0;
      }

      .wizard-step-instruction {
        font-size: 12.5px;
        color: var(--arch-ui-text-muted);
        margin: 2px 0 0;
      }

      .wizard-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }

      .live-hud {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--arch-ui-surface);
        border: 1px solid var(--arch-ui-border);
        border-radius: 8px;
        padding: 8px 12px;
        font-family: var(--modal-mono, monospace);
        font-size: 12px;
      }

      .live-target-status {
        display: flex;
        align-items: center;
        gap: 6px;
        font-weight: 600;
      }

      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #94a3b8;
      }

      .status-dot.active {
        background: #22c55e;
        box-shadow: 0 0 8px #22c55e;
      }

      /* Canevas SVG interactif de calibrage (coordonnées en pixels SVG 520x380) */
      .canvas-preview-container {
        position: relative;
        width: 100%;
        height: 380px;
        background: #0b1120;
        border: 1px solid var(--arch-ui-border);
        border-radius: 10px;
        overflow: hidden;
        user-select: none;
        touch-action: none;
      }

      .canvas-preview-svg {
        width: 100%;
        height: 100%;
        cursor: crosshair;
        display: block;
      }

      .room-polygon-preview {
        fill: rgba(56, 189, 248, 0.08);
        stroke: #38bdf8;
        stroke-width: 2px;
      }

      .radar-cone-preview {
        fill: rgba(59, 130, 246, 0.15);
        stroke: rgba(59, 130, 246, 0.5);
        stroke-width: 1.5px;
        stroke-dasharray: 5 4;
      }

      .radar-pin-preview {
        fill: #3b82f6;
        stroke: #ffffff;
        stroke-width: 2px;
      }

      .radar-direction-arrow {
        stroke: #60a5fa;
        stroke-width: 2.5px;
        stroke-linecap: round;
      }

      .corner-handle {
        cursor: grab;
      }

      .corner-handle:active {
        cursor: grabbing;
      }

      .corner-circle {
        fill: #f59e0b;
        stroke: #ffffff;
        stroke-width: 2px;
        transition: fill 0.15s ease;
      }

      .corner-handle:hover .corner-circle,
      .corner-handle.active .corner-circle {
        fill: #ef4444;
      }

      .corner-label {
        font-size: 11px;
        font-weight: 700;
        fill: #ffffff;
        text-anchor: middle;
        paint-order: stroke;
        stroke: #000000;
        stroke-width: 3px;
        pointer-events: none;
      }

      .live-target-dot {
        fill: #00bcd4;
        stroke: #ffffff;
        stroke-width: 2px;
        filter: drop-shadow(0 0 6px #00bcd4);
      }

      /* Barre latérale des réglages */
      .settings-sidebar {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .form-section-title {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--arch-ui-text-muted);
        margin: 0 0 4px;
      }

      .form-field {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .form-field label {
        font-size: 12px;
        font-weight: 600;
        color: var(--arch-ui-text);
      }

      .form-input, .form-select {
        padding: 6px 10px;
        border-radius: 6px;
        border: 1px solid var(--arch-ui-border);
        background: var(--arch-input-bg, rgba(255, 255, 255, 0.05));
        color: var(--arch-ui-text);
        font-size: 12.5px;
      }

      .form-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .btn-ghost {
        background: transparent;
        border: 1px solid var(--arch-ui-border);
        color: var(--arch-ui-text);
        padding: 6px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
        transition: all 0.15s ease;
      }

      .btn-ghost:hover:not(:disabled) {
        background: var(--arch-ui-surface-2);
        border-color: var(--arch-primary, #3b82f6);
      }

      .btn-ghost:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }

      .corner-chips-list {
        display: flex;
        flex-direction: column;
        gap: 6px;
        max-height: 150px;
        overflow-y: auto;
      }

      .corner-chip {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--arch-ui-surface);
        border: 1px solid var(--arch-ui-border);
        border-radius: 6px;
        padding: 6px 10px;
        font-size: 11.5px;
      }

      .corner-chip-coords {
        font-family: var(--modal-mono, monospace);
        color: var(--arch-ui-text-muted);
      }

      .btn-chip-delete {
        background: transparent;
        border: none;
        color: #ef4444;
        cursor: pointer;
        padding: 2px 4px;
      }

      .entity-mapping-details {
        border: 1px solid var(--arch-ui-border);
        border-radius: 8px;
        padding: 8px 10px;
        background: var(--arch-ui-surface);
        font-size: 12px;
      }

      .entity-mapping-details summary {
        cursor: pointer;
        font-weight: 600;
        color: var(--arch-ui-text);
        user-select: none;
      }

      .entity-mapping-grid {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 8px;
      }

      .modal-footer {
        border-top: 1px solid var(--arch-ui-border);
        padding: 12px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--arch-ui-surface-2);
      }

      .footer-actions {
        display: flex;
        gap: 8px;
      }
    `
  ];

  @property({ type: Object }) binding!: EntityBinding;
  @property({ type: Object }) room?: Room;
  @property({ type: Object }) hass?: any;

  @state() private config: RadarConfig = createDefaultRadarConfig();
  @state() private currentStep: number = 1;
  @state() private wizardFinished: boolean = false;
  @state() private capturedCorners: Array<{ id: string; label: string; radarMm: Point }> = [];
  @state() private activeCornerDragIndex: number = -1;
  @state() private lastCapturedRadarMm: Point = { x: 0, y: 0 };
  @state() private lastDistanceMm: number = 0;
  @state() private isLiveTargetDetected: boolean = false;

  private readonly focusCtrl = new DialogFocusController(this);
  protected localizeCtrl = new LocalizeController(this);

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeyDown);
    this.initConfig();
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this.handleKeyDown);
    super.disconnectedCallback();
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has('binding') && this.binding) {
      this.initConfig();
    }
    if (changed.has('hass')) {
      applyColorScheme(this, this.hass);
      this.pollLiveTarget();
    }
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === 'Escape') {
      e.preventDefault();
      this.close();
    } else if (e.key === 'Tab') {
      this.focusCtrl.trapTab(e);
    }
  };

  private initConfig() {
    const existing = this.binding?.radarConfig;
    if (existing) {
      this.config = JSON.parse(JSON.stringify(existing));
      if (!this.config.targets || this.config.targets.length === 0) {
        const discovered = discoverRadarEntities(this.binding?.entityId || '', this.hass?.states, this.hass?.entities);
        if (discovered.targets.length > 0) {
          this.config.targets = discovered.targets;
        }
        if (!this.config.thresholdEntityId && discovered.thresholdEntityId) {
          this.config.thresholdEntityId = discovered.thresholdEntityId;
        }
      }
      this.capturedCorners = this.config.calibrationPoints.map(cp => ({
        id: cp.id,
        label: cp.label,
        radarMm: { ...cp.radarMm }
      }));
      this.currentStep = this.capturedCorners.length + 1;
      this.wizardFinished = this.capturedCorners.length >= 3;
    } else {
      const discovered = discoverRadarEntities(this.binding?.entityId || '', this.hass?.states, this.hass?.entities);
      this.config = {
        ...createDefaultRadarConfig(),
        targets: discovered.targets,
        thresholdEntityId: discovered.thresholdEntityId
      };
      this.capturedCorners = [];
      this.currentStep = 1;
      this.wizardFinished = false;
    }
    this.pollLiveTarget();
  }

  /** Lit la position instantanée de la Cible 1 depuis Home Assistant. */
  private pollLiveTarget() {
    const target1 = this.config.targets[0];
    if (!target1 || !this.hass?.states) {
      this.isLiveTargetDetected = false;
      return;
    }
    const raw = readTargetRawState(target1, this.config, this.hass.states);
    this.isLiveTargetDetected = raw.active;
    this.lastCapturedRadarMm = raw.radarMm;
    this.lastDistanceMm = raw.distanceMm;
  }

  private close() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private apply() {
    let affineMatrix = this.config.affineMatrix;
    if (this.config.calibrationPoints.length >= 2) {
      affineMatrix = computeAffineMatrix(this.config.calibrationPoints);
    }

    const finalConfig: RadarConfig = {
      ...this.config,
      affineMatrix
    };

    this.dispatchEvent(
      new CustomEvent('radar-calibrated', {
        detail: { radarConfig: finalConfig },
        bubbles: true,
        composed: true
      })
    );
    this.close();
  }

  /** Valide le coin actuel avec la coordonnée mesurée de la Cible 1. */
  private recordCurrentCorner() {
    this.pollLiveTarget();
    const cornerLabel = `Coin ${this.currentStep}`;
    const cornerId = `corner_${Date.now()}_${this.currentStep}`;

    const radarMm: Point = this.isLiveTargetDetected && this.lastDistanceMm > 0
      ? { ...this.lastCapturedRadarMm }
      : { x: (this.currentStep % 2 === 1 ? -1500 : 1500), y: (this.currentStep <= 2 ? 3000 : 1000) };

    const newCorners = [...this.capturedCorners, { id: cornerId, label: cornerLabel, radarMm }];
    this.capturedCorners = newCorners;
    this.refreshCalibrationPoints(newCorners);
    this.currentStep = newCorners.length + 1;
  }

  private finishWizardSteps() {
    this.wizardFinished = true;
  }

  private resumeWizardSteps() {
    this.wizardFinished = false;
    this.currentStep = this.capturedCorners.length + 1;
  }

  /** Recalcule les points d'étalonnage et leur position sur le plan. */
  private refreshCalibrationPoints(corners: Array<{ id: string; label: string; radarMm: Point }>) {
    const placed = autoPlaceCalibrationPoints(
      corners,
      this.binding.position,
      this.config,
      this.room
    );
    this.config = {
      ...this.config,
      calibrationPoints: placed,
      affineMatrix: placed.length >= 2 ? computeAffineMatrix(placed) : undefined
    };
  }

  private autoSnapAllCorners() {
    if (this.capturedCorners.length === 0) return;
    this.refreshCalibrationPoints(this.capturedCorners);
  }

  private deleteCorner(index: number) {
    const corners = [...this.capturedCorners];
    corners.splice(index, 1);
    this.capturedCorners = corners;
    this.refreshCalibrationPoints(corners);
    this.currentStep = corners.length + 1;
    if (corners.length < 2) {
      this.wizardFinished = false;
    }
  }

  private resetCalibration() {
    this.capturedCorners = [];
    this.config = {
      ...this.config,
      calibrationPoints: [],
      affineMatrix: undefined
    };
    this.currentStep = 1;
    this.wizardFinished = false;
  }

  private updateTargetEntity(targetIdx: number, field: keyof RadarTargetConfig, value: string) {
    const targets = [...this.config.targets];
    if (!targets[targetIdx]) {
      targets[targetIdx] = {
        label: `Cible ${targetIdx + 1}`,
        xEntityId: '',
        yEntityId: '',
        color: DEFAULT_TARGET_COLORS[targetIdx % DEFAULT_TARGET_COLORS.length],
      };
    }
    targets[targetIdx] = {
      ...targets[targetIdx],
      [field]: value.trim() || undefined
    };
    this.config = { ...this.config, targets };
    this.pollLiveTarget();
  }

  private updateThresholdEntity(value: string) {
    this.config = {
      ...this.config,
      thresholdEntityId: value.trim() || undefined
    };
    this.pollLiveTarget();
  }

  /**
   * Calcule la transformation Homothétie + Centrage entre les coordonnées du plan (mètres)
   * et le canevas SVG fixe (520 x 380 pixels). Garantit des proportions parfaites sans distorsion.
   */
  private getSvgTransform() {
    let minX = this.binding.position.x - 2.5;
    let maxX = this.binding.position.x + 2.5;
    let minY = this.binding.position.y - 2.5;
    let maxY = this.binding.position.y + 2.5;

    if (this.room?.polygon && this.room.polygon.length >= 3) {
      for (const p of this.room.polygon) {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
      }
    }

    for (const cp of this.config.calibrationPoints) {
      if (cp.planMeters.x < minX) minX = cp.planMeters.x;
      if (cp.planMeters.x > maxX) maxX = cp.planMeters.x;
      if (cp.planMeters.y < minY) minY = cp.planMeters.y;
      if (cp.planMeters.y > maxY) maxY = cp.planMeters.y;
    }

    const spanX = Math.max(1, maxX - minX);
    const spanY = Math.max(1, maxY - minY);
    const availW = SVG_VIEW_W - 2 * SVG_PAD_PX;
    const availH = SVG_VIEW_H - 2 * SVG_PAD_PX;
    const ppm = Math.min(availW / spanX, availH / spanY);

    const offsetX = (SVG_VIEW_W - spanX * ppm) / 2 - minX * ppm;
    const offsetY = (SVG_VIEW_H - spanY * ppm) / 2 - minY * ppm;

    return {
      ppm,
      toSvg: (pt: Point): Point => ({
        x: pt.x * ppm + offsetX,
        y: pt.y * ppm + offsetY
      }),
      toPlan: (svgX: number, svgY: number): Point => ({
        x: (svgX - offsetX) / ppm,
        y: (svgY - offsetY) / ppm
      })
    };
  }

  // --- Gestion du glisser-déposer des coins sur l'aperçu SVG ---
  private handleSvgPointerDown(index: number, e: PointerEvent) {
    e.stopPropagation();
    this.activeCornerDragIndex = index;
    const target = getEventTarget(e);
    if (target instanceof Element) {
      target.setPointerCapture?.(e.pointerId);
    }
  }

  private handleSvgPointerMove(e: PointerEvent) {
    if (this.activeCornerDragIndex < 0) return;
    const svgEl = this.shadowRoot?.querySelector('.canvas-preview-svg') as SVGSVGElement | null;
    if (!svgEl) return;

    const rect = svgEl.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    // Conversion exacte client -> viewBox SVG (520 x 380) en tenant compte du preserveAspectRatio="xMidYMid meet"
    const scale = Math.min(rect.width / SVG_VIEW_W, rect.height / SVG_VIEW_H);
    const padLeft = (rect.width - SVG_VIEW_W * scale) / 2;
    const padTop = (rect.height - SVG_VIEW_H * scale) / 2;
    const svgX = (e.clientX - rect.left - padLeft) / scale;
    const svgY = (e.clientY - rect.top - padTop) / scale;

    const { toPlan } = this.getSvgTransform();
    const planPt = toPlan(svgX, svgY);

    const points = [...this.config.calibrationPoints];
    if (points[this.activeCornerDragIndex]) {
      points[this.activeCornerDragIndex] = {
        ...points[this.activeCornerDragIndex],
        planMeters: {
          x: Math.round(planPt.x * 100) / 100,
          y: Math.round(planPt.y * 100) / 100
        }
      };
      this.config = {
        ...this.config,
        calibrationPoints: points,
        affineMatrix: points.length >= 2 ? computeAffineMatrix(points) : undefined
      };
    }
  }

  private handleSvgPointerUp() {
    this.activeCornerDragIndex = -1;
  }

  render() {
    const { ppm, toSvg } = this.getSvgTransform();
    const radarSvgPos = toSvg(this.binding.position);

    const coneRadiusPx = (this.config.maxRangeMeters || 6.0) * ppm;
    const conePath = buildRadarConeSvgPath(
      radarSvgPos.x,
      radarSvgPos.y,
      coneRadiusPx,
      this.config.orientationDeg,
      this.config.fovDeg
    );

    const liveTargetPlanPos = this.isLiveTargetDetected
      ? projectRadarPointToPlan(this.lastCapturedRadarMm, this.binding.position, this.config)
      : null;
    const liveTargetSvgPos = liveTargetPlanPos ? toSvg(liveTargetPlanPos) : null;

    const guideCornerText =
      CORNER_GUIDE_LABELS[this.currentStep - 1] || `le ${this.currentStep}e angle de la pièce`;

    return html`
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="radar-dialog-title" tabindex="-1">
        <div class="modal-header">
          <div class="modal-title-group">
            <span style="font-size: 22px;" aria-hidden="true">🎯</span>
            <div>
              <h3 class="modal-title" id="radar-dialog-title">Calibrage Spatial du Radar</h3>
              <p style="font-size: 12px; margin: 2px 0 0; color: var(--arch-ui-text-muted);">
                ${this.binding.customName || this.binding.entityId} · ${this.room?.name || 'Pièce non assignée'}
              </p>
            </div>
          </div>
          <button type="button" class="btn-close" @click=${this.close} aria-label="Fermer">✕</button>
        </div>

        <div class="radar-dialog-grid">
          <!-- Colonne Gauche : Assistant et Canevas interactif -->
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div class="wizard-card">
              ${!this.wizardFinished ? html`
                <div class="wizard-step-banner">
                  <span class="wizard-step-badge" aria-hidden="true">🚶</span>
                  <div style="flex: 1;">
                    <h4 class="wizard-step-title">
                      Étape ${this.currentStep} : Allez dans ${guideCornerText} et validez
                    </h4>
                    <p class="wizard-step-instruction">
                      ${this.capturedCorners.length >= 2
                        ? 'Attendez que la Cible 1 se stabilise puis validez ce coin, ou cliquez sur « Fin » si tous les angles ont été relevés.'
                        : 'Placez-vous physiquement dans l’angle, attendez que la Cible 1 se stabilise, puis cliquez sur Valider.'}
                    </p>
                  </div>
                  <div class="wizard-actions">
                    <button type="button" class="btn-primary" @click=${this.recordCurrentCorner} style="padding: 8px 14px; font-size: 13px;">
                      📍 Valider Coin ${this.currentStep}
                    </button>
                    ${this.capturedCorners.length >= 2 ? html`
                      <button type="button" class="btn-ghost" @click=${this.finishWizardSteps} style="padding: 8px 12px;">
                        ✓ Fin
                      </button>
                    ` : null}
                  </div>
                </div>
              ` : html`
                <div class="wizard-step-banner finished">
                  <span class="wizard-step-badge" aria-hidden="true">✅</span>
                  <div style="flex: 1;">
                    <h4 class="wizard-step-title">
                      ${this.config.calibrationPoints.length} coins positionnés sur le plan
                    </h4>
                    <p class="wizard-step-instruction">
                      Ajustez les poignées orange aux angles de la pièce si nécessaire, ou ajoutez un coin supplémentaire (pièce en L).
                    </p>
                  </div>
                  <div class="wizard-actions">
                    <button type="button" class="btn-ghost" @click=${this.resumeWizardSteps}>
                      ➕ Ajouter un coin
                    </button>
                  </div>
                </div>
              `}

              <!-- État de détection en direct -->
              <div class="live-hud">
                <div class="live-target-status">
                  <span class="status-dot ${this.isLiveTargetDetected ? 'active' : ''}"></span>
                  <span>${this.isLiveTargetDetected ? 'Cible 1 Détectée' : 'En attente de détection...'}</span>
                </div>
                <div>
                  Distance : <strong>${(this.lastDistanceMm / 1000).toFixed(2)} m</strong>
                  (X: ${this.lastCapturedRadarMm.x} mm, Y: ${this.lastCapturedRadarMm.y} mm)
                </div>
              </div>
            </div>

            <!-- Aperçu SVG interactif (coordonnées pixels 520x380) -->
            <div class="canvas-preview-container">
              <svg
                class="canvas-preview-svg"
                viewBox="0 0 ${SVG_VIEW_W} ${SVG_VIEW_H}"
                @pointermove=${this.handleSvgPointerMove}
                @pointerup=${this.handleSvgPointerUp}
                @pointercancel=${this.handleSvgPointerUp}
              >
                <!-- Pièce polygonale -->
                ${this.room?.polygon && this.room.polygon.length >= 3 ? html`
                  <polygon
                    class="room-polygon-preview"
                    points=${this.room.polygon.map(p => {
                      const sp = toSvg(p);
                      return `${sp.x.toFixed(1)},${sp.y.toFixed(1)}`;
                    }).join(' ')}
                  ></polygon>
                ` : null}

                <!-- Cône de détection radar -->
                ${this.config.showCone ? html`
                  <path class="radar-cone-preview" d=${conePath}></path>
                ` : null}

                <!-- Capteur radar (position + flèche d'orientation) -->
                <circle class="radar-pin-preview" cx=${radarSvgPos.x} cy=${radarSvgPos.y} r="7"></circle>
                <line
                  class="radar-direction-arrow"
                  x1=${radarSvgPos.x}
                  y1=${radarSvgPos.y}
                  x2=${radarSvgPos.x + 26 * Math.sin((this.config.orientationDeg * Math.PI) / 180)}
                  y2=${radarSvgPos.y - 26 * Math.cos((this.config.orientationDeg * Math.PI) / 180)}
                ></line>

                <!-- Cible 1 en temps réel sur le plan -->
                ${liveTargetSvgPos ? html`
                  <circle class="live-target-dot" cx=${liveTargetSvgPos.x} cy=${liveTargetSvgPos.y} r="6.5"></circle>
                ` : null}

                <!-- Poignées interactives des coins étalonnés (déplaçables par glisser) -->
                ${this.config.calibrationPoints.map((cp, idx) => {
                  const sp = toSvg(cp.planMeters);
                  return html`
                    <g
                      class="corner-handle ${this.activeCornerDragIndex === idx ? 'active' : ''}"
                      transform="translate(${sp.x.toFixed(1)}, ${sp.y.toFixed(1)})"
                      @pointerdown=${(e: PointerEvent) => this.handleSvgPointerDown(idx, e)}
                    >
                      <circle class="corner-circle" cx="0" cy="0" r="8"></circle>
                      <text class="corner-label" x="0" y="-12">${cp.label}</text>
                    </g>
                  `;
                })}
              </svg>
            </div>
          </div>

          <!-- Colonne Droite : Paramètres, Coins et Entités X/Y -->
          <div class="settings-sidebar">
            <h4 class="form-section-title">Orientation & Pose</h4>

            <div class="form-field">
              <label>Orientation du Radar : ${Math.round(this.config.orientationDeg)}°</label>
              <div class="form-row">
                <input
                  type="range"
                  min="0"
                  max="359"
                  step="5"
                  .value=${String(this.config.orientationDeg)}
                  @input=${(e: Event) => {
                    this.config = { ...this.config, orientationDeg: Number((e.target as HTMLInputElement).value) };
                  }}
                  style="flex: 1;"
                />
                <input
                  type="number"
                  class="form-input"
                  style="width: 65px;"
                  min="0"
                  max="359"
                  .value=${String(Math.round(this.config.orientationDeg))}
                  @change=${(e: Event) => {
                    this.config = { ...this.config, orientationDeg: ((Number((e.target as HTMLInputElement).value) % 360) + 360) % 360 };
                  }}
                />
              </div>
            </div>

            <div class="form-field">
              <label>Hauteur de pose : ${this.config.heightMeters.toFixed(2)} m</label>
              <input
                type="number"
                class="form-input"
                step="0.05"
                min="0.2"
                max="4.0"
                .value=${String(this.config.heightMeters)}
                @change=${(e: Event) => {
                  this.config = { ...this.config, heightMeters: Number((e.target as HTMLInputElement).value) };
                }}
              />
            </div>

            <div class="form-row" style="margin-top: 2px; flex-wrap: wrap;">
              <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; cursor: pointer;">
                <input
                  type="checkbox"
                  ?checked=${this.config.showCone}
                  @change=${(e: Event) => {
                    this.config = { ...this.config, showCone: (e.target as HTMLInputElement).checked };
                  }}
                />
                Afficher le cône (120°)
              </label>

              <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; cursor: pointer;">
                <input
                  type="checkbox"
                  ?checked=${this.config.invertX}
                  @change=${(e: Event) => {
                    this.config = { ...this.config, invertX: (e.target as HTMLInputElement).checked };
                  }}
                />
                Inverser Gauche/Droite
              </label>

              <label style="display: flex; align-items: center; gap: 6px; font-size: 12px; cursor: pointer;" title="Filtre exponentiel adaptatif réduisant le sautillement mmWave des cibles immobiles">
                <input
                  type="checkbox"
                  ?checked=${this.config.smoothing !== false}
                  @change=${(e: Event) => {
                    this.config = { ...this.config, smoothing: (e.target as HTMLInputElement).checked };
                  }}
                />
                Lissage anti-bruit (EMA)
              </label>
            </div>

            <hr style="border: 0; border-top: 1px solid var(--arch-ui-border); margin: 4px 0;" />

            <div style="display: flex; align-items: center; justify-content: space-between;">
              <h4 class="form-section-title" style="margin: 0;">Coins Enregistrés (${this.config.calibrationPoints.length})</h4>
              ${this.room?.polygon && this.config.calibrationPoints.length > 0 ? html`
                <button type="button" class="btn-ghost" @click=${this.autoSnapAllCorners} title="Recaler automatiquement les coins sur les sommets de la pièce">
                  ⚡ Auto-Snap
                </button>
              ` : null}
            </div>

            <div class="corner-chips-list">
              ${this.config.calibrationPoints.length === 0 ? html`
                <div style="font-size: 12px; color: var(--arch-ui-text-muted); font-style: italic; padding: 6px 0;">
                  Aucun coin enregistré. Suivez l'assistant ci-contre pour calibrer la pièce.
                </div>
              ` : this.config.calibrationPoints.map((cp, idx) => html`
                <div class="corner-chip">
                  <div>
                    <strong>${cp.label}</strong>
                    <div class="corner-chip-coords">
                      Plan: (${cp.planMeters.x.toFixed(2)}m, ${cp.planMeters.y.toFixed(2)}m)
                    </div>
                  </div>
                  <button type="button" class="btn-chip-delete" @click=${() => this.deleteCorner(idx)} title="Supprimer ce coin">
                    ✕
                  </button>
                </div>
              `)}
            </div>

            ${this.config.affineMatrix ? html`
              <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.4); border-radius: 6px; padding: 6px 10px; font-size: 11px; color: #4ade80;">
                ✓ Matrice affine active (${this.config.calibrationPoints.length} points)
              </div>
            ` : null}

            <!-- Synchronisation bidirectionnelle des Zones LD2450 (ESPHome) -->
            <details class="entity-mapping-details">
              <summary>📡 Zones Matérielles LD2450 (ESPHome)</summary>
              <div class="entity-mapping-grid">
                <p style="font-size: 11px; margin: 0; color: var(--arch-ui-text-muted); line-height: 1.35;">
                  Calcule l'emprise en millimètres de la pièce (ou des coins calibrés) dans le repère du radar et l'envoie aux entités <code>number.*_zone_N_x1/y1/x2/y2</code>.
                </p>
                <div class="form-row">
                  ${([1, 2, 3] as const).map(zIdx => html`
                    <button
                      type="button"
                      class="btn-ghost"
                      style="flex: 1; padding: 6px 8px; font-size: 11px;"
                      @click=${() => void this.syncZoneToEsphome(zIdx)}
                    >
                      📡 Zone ${zIdx}
                    </button>
                  `)}
                </div>
                ${this.zoneSyncFeedback ? html`
                  <div style="font-size: 11px; color: var(--arch-accent);">${this.zoneSyncFeedback}</div>
                ` : null}
              </div>
            </details>

            <!-- Sélection Auto / Manuelle des entités X/Y des cibles -->
            <details class="entity-mapping-details">
              <summary>Capteurs Cibles X/Y & Seuil (Auto / Manuel)</summary>
              <div class="entity-mapping-grid">
                <datalist id="radar-sensor-options">
                  ${Object.keys(this.hass?.states || {})
                    .filter(id => id.startsWith('sensor.') && (id.includes('cible') || id.includes('target') || id.includes('_x') || id.includes('_y') || id.includes('dist') || id.includes('radar')))
                    .slice(0, 100)
                    .map(id => html`<option value=${id}></option>`)}
                </datalist>
                <datalist id="radar-number-options">
                  ${Object.keys(this.hass?.states || {})
                    .filter(id => (id.startsWith('number.') || id.startsWith('input_number.')) && (id.includes('seuil') || id.includes('threshold') || id.includes('radar') || id.includes('humain')))
                    .slice(0, 50)
                    .map(id => html`<option value=${id}></option>`)}
                </datalist>

                ${[0, 1, 2].map(idx => {
                  const t = this.config.targets[idx] || { index: (idx + 1) as 1 | 2 | 3, xEntityId: '', yEntityId: '' };
                  return html`
                    <div class="form-field">
                      <label>Cible ${idx + 1} (X / Y)</label>
                      <input
                        type="text"
                        class="form-input"
                        list="radar-sensor-options"
                        placeholder="sensor.*_cible_${idx + 1}_x"
                        .value=${t.xEntityId || ''}
                        @change=${(e: Event) => this.updateTargetEntity(idx, 'xEntityId', (e.target as HTMLInputElement).value)}
                      />
                      <input
                        type="text"
                        class="form-input"
                        list="radar-sensor-options"
                        placeholder="sensor.*_cible_${idx + 1}_y"
                        .value=${t.yEntityId || ''}
                        @change=${(e: Event) => this.updateTargetEntity(idx, 'yEntityId', (e.target as HTMLInputElement).value)}
                      />
                    </div>
                  `;
                })}

                <div class="form-field" style="grid-column: 1 / -1;">
                  <label>Seuil de distinction Humain / Animal</label>
                  <input
                    type="text"
                    class="form-input"
                    list="radar-number-options"
                    placeholder="number.*_seuil_de_resolution_humain"
                    .value=${this.config.thresholdEntityId || ''}
                    @change=${(e: Event) => this.updateThresholdEntity((e.target as HTMLInputElement).value)}
                  />
                </div>
              </div>
            </details>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-ghost" @click=${this.resetCalibration} ?disabled=${this.config.calibrationPoints.length === 0}>
            ↺ Réinitialiser les coins
          </button>
          <div class="footer-actions">
            <button type="button" class="btn-dialog-cancel" @click=${this.close}>Annuler</button>
            <button type="button" class="btn-primary" @click=${this.apply}>
              💾 Enregistrer le calibrage
            </button>
          </div>
        </div>
      </div>
    `;
  }

  @state() private zoneSyncFeedback: string | null = null;

  private async syncZoneToEsphome(zoneIndex: 1 | 2 | 3) {
    const sourcePoints: Point[] =
      this.config.calibrationPoints.length >= 2
        ? this.config.calibrationPoints.map(cp => cp.planMeters)
        : this.room?.polygon && this.room.polygon.length >= 3
          ? this.room.polygon
          : [];
    if (sourcePoints.length < 2) {
      this.zoneSyncFeedback = 'Calibrez au moins 2 coins ou assignez une pièce au radar.';
      return;
    }

    const minX = Math.min(...sourcePoints.map(p => p.x));
    const maxX = Math.max(...sourcePoints.map(p => p.x));
    const minY = Math.min(...sourcePoints.map(p => p.y));
    const maxY = Math.max(...sourcePoints.map(p => p.y));

    const discovered = discoverRadarZoneEntities(
      this.binding.entityId,
      this.hass?.states,
      this.binding.position,
      this.config
    );
    const zEntities = discovered.find(z => z.index === zoneIndex);
    const zoneObj = {
      index: zoneIndex,
      name: `Zone ${zoneIndex}`,
      enabled: true,
      p1: { x: minX, y: minY },
      p2: { x: maxX, y: maxY },
      x1EntityId: zEntities?.x1EntityId,
      y1EntityId: zEntities?.y1EntityId,
      x2EntityId: zEntities?.x2EntityId,
      y2EntityId: zEntities?.y2EntityId,
    };

    const bounds = computeRadarZoneBoundsMm(zoneObj, this.binding.position, this.config);
    const existingZones = (this.config.zones ?? []).filter(z => z.index !== zoneIndex);
    this.config = {
      ...this.config,
      zones: [...existingZones, zoneObj]
    };

    if (zEntities && typeof this.hass?.callService === 'function') {
      const pairs: Array<[string | undefined, number]> = [
        [zEntities.x1EntityId, bounds.x1],
        [zEntities.y1EntityId, bounds.y1],
        [zEntities.x2EntityId, bounds.x2],
        [zEntities.y2EntityId, bounds.y2]
      ];
      let sent = 0;
      for (const [entityId, value] of pairs) {
        if (entityId) {
          await this.hass.callService('number', 'set_value', { entity_id: entityId, value });
          sent++;
        }
      }
      this.zoneSyncFeedback = sent > 0
        ? `✓ Zone ${zoneIndex} envoyée à ESPHome : X[${bounds.x1}..${bounds.x2}] Y[${bounds.y1}..${bounds.y2}] mm`
        : `Zone ${zoneIndex} calculée : X[${bounds.x1}..${bounds.x2}] Y[${bounds.y1}..${bounds.y2}] mm`;
    } else {
      this.zoneSyncFeedback = `Zone ${zoneIndex} enregistrée : X[${bounds.x1}..${bounds.x2}] Y[${bounds.y1}..${bounds.y2}] mm`;
    }
  }
}

defineElement('home-architect-radar-modal', HomeArchitectRadarModal);

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-radar-modal': HomeArchitectRadarModal;
  }
}
