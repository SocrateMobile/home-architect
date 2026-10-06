import { css } from 'lit';

/**
 * Styles du canevas. Toutes les couleurs passent par des jetons `--arch-*` (constat F56) :
 *  - chaque jeton peut être surchargé par la variable publique `--ha-arch-<nom>` (thème HA, card-mod) ;
 *  - palette sombre par défaut, palette claire sous `:host([scheme='light'])` (hass.themes.darkMode ou
 *    propriété `theme`) ;
 *  - `:host([follow-theme])` (thème 'auto') : fond et textes reprennent les variables du thème HA.
 * La découpe des ouvertures utilise le jeton du fond (--arch-bg). Les animations infinies n'animent que
 * transform et opacity, et s'arrêtent avec « Réduire les animations » ou hors écran (constat F133).
 */
export const canvasStyles = css`
  :host {
    /* Palette sombre (défaut) */
    --arch-bg-default: #0f172a;
    --arch-text-default: #f8fafc;
    --arch-text-muted-default: #94a3b8;
    --arch-bg: var(--ha-arch-bg, var(--arch-bg-default));
    --arch-text: var(--ha-arch-text, var(--arch-text-default));
    --arch-text-muted: var(--ha-arch-text-muted, var(--arch-text-muted-default));
    --arch-halo: var(--ha-arch-halo, rgba(15, 23, 42, 0.85));
    --arch-grid: var(--ha-arch-grid, rgba(255, 255, 255, 0.06));
    --arch-grid-major: var(--ha-arch-grid-major, rgba(255, 255, 255, 0.14));
    --arch-grid-dot: var(--ha-arch-grid-dot, rgba(255, 255, 255, 0.08));
    --arch-ground-shadow: var(--ha-arch-ground-shadow, rgba(0, 0, 0, 0.45));
    --arch-accent: var(--ha-arch-accent, #38bdf8);
    --arch-accent-strong: var(--ha-arch-accent-strong, #06b6d4);
    --arch-accent-soft: var(--ha-arch-accent-soft, rgba(56, 189, 248, 0.4));
    --arch-accent-faint: var(--ha-arch-accent-faint, rgba(56, 189, 248, 0.12));
    --arch-accent-text: var(--ha-arch-accent-text, #a5f3fc);
    --arch-selection-fill: var(--ha-arch-selection-fill, rgba(6, 182, 212, 0.45));
    --arch-selection-glow: var(--ha-arch-selection-glow, rgba(6, 182, 212, 0.8));
    --arch-selection-line: var(--ha-arch-selection-line, #22d3ee);
    --arch-marquee-fill: var(--ha-arch-marquee-fill, rgba(6, 182, 212, 0.15));
    --arch-invalid: var(--ha-arch-invalid, #ef4444);
    --arch-invalid-fill: var(--ha-arch-invalid-fill, rgba(239, 68, 68, 0.3));
    --arch-room-fill: var(--ha-arch-room-fill, rgba(56, 189, 248, 0.12));
    --arch-room-stroke: var(--ha-arch-room-stroke, rgba(56, 189, 248, 0.4));
    --arch-wall-fill: var(--ha-arch-wall-fill, #334155);
    --arch-wall-hover: var(--ha-arch-wall-hover, #475569);
    --arch-wall-stroke: var(--ha-arch-wall-stroke, #64748b);
    --arch-wall-centerline: var(--ha-arch-wall-centerline, #94a3b8);
    --arch-wall-cap: var(--ha-arch-wall-cap, #f1f5f9);
    --arch-wall-cap-stroke: var(--ha-arch-wall-cap-stroke, #94a3b8);
    --arch-frame: var(--ha-arch-frame, #94a3b8);
    --arch-door-3d: var(--ha-arch-door-3d, rgba(120, 83, 51, 0.92));
    --arch-glass-3d: var(--ha-arch-glass-3d, rgba(125, 211, 252, 0.55));
    --arch-surface: var(--ha-arch-surface, rgba(15, 23, 42, 0.85));
    --arch-surface-text: var(--ha-arch-surface-text, #f8fafc);
    --arch-surface-muted: var(--ha-arch-surface-muted, #cbd5e1);
    --arch-surface-border: var(--ha-arch-surface-border, rgba(148, 163, 184, 0.35));
    --arch-hud-bg: var(--ha-arch-hud-bg, rgba(30, 41, 59, 0.85));
    --arch-hud-border: var(--ha-arch-hud-border, rgba(255, 255, 255, 0.15));
    --arch-hud-btn: var(--ha-arch-hud-btn, rgba(51, 65, 85, 0.7));
    --arch-hud-btn-border: var(--ha-arch-hud-btn-border, rgba(255, 255, 255, 0.1));
    --arch-hud-text: var(--ha-arch-hud-text, #f1f5f9);
    --arch-hud-active: var(--ha-arch-hud-active, #0284c7);
    --arch-hud-active-text: var(--ha-arch-hud-active-text, #ffffff);
    --arch-pin-bg: var(--ha-arch-pin-bg, rgba(30, 41, 59, 0.9));
    --arch-pin-border: var(--ha-arch-pin-border, rgba(255, 255, 255, 0.2));
    --arch-pin-light-bg: var(--ha-arch-pin-light-bg, #0284c7);
    --arch-media: var(--ha-arch-media, #a855f7);
    --arch-on: var(--ha-arch-on, #34d399);
    --arch-off: var(--ha-arch-off, #94a3b8);
    --arch-alert: var(--ha-arch-alert, #f87171);
    --arch-alert-ring: var(--ha-arch-alert-ring, #ef4444);
    --arch-info: var(--ha-arch-info, #38bdf8);
    --arch-warning: var(--ha-arch-warning, #fbbf24);
    --arch-light: var(--ha-arch-light, #facc15);
    --arch-light-glow: var(--ha-arch-light-glow, rgba(250, 204, 21, 0.28));
    --arch-temperature: var(--ha-arch-temperature, #facc15);
    --arch-measure: var(--ha-arch-measure, #f59e0b);
    --arch-guide: var(--ha-arch-guide, #d946ef);
    --arch-ghost: var(--ha-arch-ghost, rgba(148, 163, 184, 0.42));
    --arch-hint-bg: var(--ha-arch-hint-bg, rgba(15, 23, 42, 0.92));
    --arch-hint-border: var(--ha-arch-hint-border, rgba(250, 204, 21, 0.5));
    --arch-hint-text: var(--ha-arch-hint-text, #fde68a);
    --arch-handle-border: var(--ha-arch-handle-border, #ffffff);
    /* Poignées des meubles (v1.0.22 / v1.0.26) : mêmes couleurs dans les deux palettes */
    --arch-handle: var(--ha-arch-handle, #38bdf8);
    --arch-handle-hover: var(--ha-arch-handle-hover, #06b6d4);
    --arch-handle-grip: var(--ha-arch-handle-grip, #0f172a);
    --arch-handle-badge-bg: var(--ha-arch-handle-badge-bg, rgba(15, 23, 42, 0.85));
    --arch-handle-badge-border: var(--ha-arch-handle-badge-border, rgba(56, 189, 248, 0.4));

    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* Le HUD s'adapte à la largeur du canevas (requêtes de conteneur), pas à celle de la fenêtre */
    container: architect-canvas / inline-size;
    user-select: none;
    touch-action: none;
    background-color: var(--arch-bg);
    font-family: var(--ha-font-family-body, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif);
  }

  /* Palette claire (thème clair de Home Assistant, ou theme='light') */
  :host([scheme='light']) {
    --arch-bg-default: #f8fafc;
    --arch-text-default: #0f172a;
    --arch-text-muted-default: #475569;
    --arch-halo: var(--ha-arch-halo, rgba(255, 255, 255, 0.9));
    --arch-grid: var(--ha-arch-grid, rgba(15, 23, 42, 0.07));
    --arch-grid-major: var(--ha-arch-grid-major, rgba(15, 23, 42, 0.16));
    --arch-grid-dot: var(--ha-arch-grid-dot, rgba(15, 23, 42, 0.16));
    --arch-ground-shadow: var(--ha-arch-ground-shadow, rgba(15, 23, 42, 0.18));
    --arch-accent: var(--ha-arch-accent, #0284c7);
    --arch-accent-strong: var(--ha-arch-accent-strong, #0891b2);
    --arch-accent-soft: var(--ha-arch-accent-soft, rgba(2, 132, 199, 0.45));
    --arch-accent-faint: var(--ha-arch-accent-faint, rgba(2, 132, 199, 0.1));
    --arch-accent-text: var(--ha-arch-accent-text, #0e7490);
    --arch-selection-fill: var(--ha-arch-selection-fill, rgba(8, 145, 178, 0.35));
    --arch-selection-glow: var(--ha-arch-selection-glow, rgba(8, 145, 178, 0.55));
    --arch-selection-line: var(--ha-arch-selection-line, #0891b2);
    --arch-marquee-fill: var(--ha-arch-marquee-fill, rgba(8, 145, 178, 0.12));
    --arch-invalid: var(--ha-arch-invalid, #dc2626);
    --arch-invalid-fill: var(--ha-arch-invalid-fill, rgba(220, 38, 38, 0.22));
    --arch-room-fill: var(--ha-arch-room-fill, rgba(2, 132, 199, 0.08));
    --arch-room-stroke: var(--ha-arch-room-stroke, rgba(2, 132, 199, 0.45));
    --arch-wall-fill: var(--ha-arch-wall-fill, #64748b);
    --arch-wall-hover: var(--ha-arch-wall-hover, #475569);
    --arch-wall-stroke: var(--ha-arch-wall-stroke, #334155);
    --arch-wall-centerline: var(--ha-arch-wall-centerline, #e2e8f0);
    --arch-wall-cap: var(--ha-arch-wall-cap, #e2e8f0);
    --arch-wall-cap-stroke: var(--ha-arch-wall-cap-stroke, #64748b);
    --arch-frame: var(--ha-arch-frame, #475569);
    --arch-door-3d: var(--ha-arch-door-3d, rgba(146, 101, 63, 0.9));
    --arch-glass-3d: var(--ha-arch-glass-3d, rgba(56, 189, 248, 0.45));
    --arch-surface: var(--ha-arch-surface, rgba(255, 255, 255, 0.92));
    --arch-surface-text: var(--ha-arch-surface-text, #0f172a);
    --arch-surface-muted: var(--ha-arch-surface-muted, #334155);
    --arch-surface-border: var(--ha-arch-surface-border, rgba(71, 85, 105, 0.35));
    --arch-hud-bg: var(--ha-arch-hud-bg, rgba(255, 255, 255, 0.9));
    --arch-hud-border: var(--ha-arch-hud-border, rgba(15, 23, 42, 0.12));
    --arch-hud-btn: var(--ha-arch-hud-btn, rgba(241, 245, 249, 0.95));
    --arch-hud-btn-border: var(--ha-arch-hud-btn-border, rgba(15, 23, 42, 0.12));
    --arch-hud-text: var(--ha-arch-hud-text, #0f172a);
    --arch-pin-bg: var(--ha-arch-pin-bg, rgba(255, 255, 255, 0.95));
    --arch-pin-border: var(--ha-arch-pin-border, rgba(15, 23, 42, 0.25));
    --arch-media: var(--ha-arch-media, #9333ea);
    --arch-on: var(--ha-arch-on, #059669);
    --arch-off: var(--ha-arch-off, #64748b);
    --arch-alert: var(--ha-arch-alert, #dc2626);
    --arch-alert-ring: var(--ha-arch-alert-ring, #dc2626);
    --arch-info: var(--ha-arch-info, #0284c7);
    --arch-warning: var(--ha-arch-warning, #b45309);
    --arch-light: var(--ha-arch-light, #ca8a04);
    --arch-light-glow: var(--ha-arch-light-glow, rgba(250, 204, 21, 0.35));
    --arch-temperature: var(--ha-arch-temperature, #b45309);
    --arch-measure: var(--ha-arch-measure, #d97706);
    --arch-guide: var(--ha-arch-guide, #c026d3);
    --arch-ghost: var(--ha-arch-ghost, rgba(71, 85, 105, 0.45));
    --arch-hint-bg: var(--ha-arch-hint-bg, rgba(255, 255, 255, 0.95));
    --arch-hint-border: var(--ha-arch-hint-border, rgba(202, 138, 4, 0.6));
    --arch-hint-text: var(--ha-arch-hint-text, #92400e);
  }

  /* Thème 'auto' : fond et textes suivent le thème de Home Assistant */
  :host([follow-theme]) {
    --arch-bg: var(--ha-arch-bg, var(--primary-background-color, var(--arch-bg-default)));
    --arch-text: var(--ha-arch-text, var(--primary-text-color, var(--arch-text-default)));
    --arch-text-muted: var(--ha-arch-text-muted, var(--secondary-text-color, var(--arch-text-muted-default)));
  }

  /* Carte : un balayage vertical fait défiler le tableau de bord ; le plan se déplace et se zoome à deux doigts */
  :host([dashboard]) {
    touch-action: pan-y;
  }

  /* Focusable au clic (raccourcis clavier du canevas) : pas de contour */
  :host(:focus) {
    outline: none;
  }

  .canvas-container {
    width: 100%;
    height: 100%;
    position: relative;
    cursor: crosshair;
  }

  .canvas-container.is-panning {
    cursor: grabbing;
  }

  .canvas-container.is-orbiting {
    cursor: grab;
  }

  .canvas-container.is-orbiting:active {
    cursor: grabbing;
  }

  .canvas-container.dashboard-mode {
    cursor: default;
  }

  .canvas-container.placing {
    cursor: copy;
  }

  /* Carte : seules les épingles sont interactives */
  .canvas-container.dashboard-mode .room-polygon,
  .canvas-container.dashboard-mode .wall-rect,
  .canvas-container.dashboard-mode .furniture-group,
  .canvas-container.dashboard-mode .opening-element {
    cursor: inherit;
  }

  .canvas-container.dashboard-mode .entity-pin {
    cursor: pointer;
  }

  /* 3D et lecture seule : sélection possible, aucun glisser */
  .canvas-container.mode-3d .furniture-group,
  .canvas-container.mode-3d .entity-pin,
  .canvas-container.read-only:not(.dashboard-mode) .furniture-group,
  .canvas-container.read-only:not(.dashboard-mode) .entity-pin {
    cursor: pointer;
  }

  /* Conteneur de la vue : aucune transformation (la rotation 2D est portée par le groupe SVG, la 3D est projetée en JS) */
  .viewport-3d-wrapper {
    width: 100%;
    height: 100%;
  }

  svg.main-viewport {
    width: 100%;
    height: 100%;
    display: block;
    shape-rendering: geometricPrecision;
  }

  /* Rotation de vue 2D (v1.0.29) : quart de tour animé ; origine (centre du canevas) posée par le canevas */
  .viewport-2d-rotator {
    transform-box: view-box;
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* En 3D la caméra (projetée en JS) reprend l'orientation : le groupe quitte sa rotation sans transition */
  .viewport-3d-wrapper.mode-3d .viewport-2d-rotator {
    transition: none;
  }

  /* Grille 2D et sol 3D */
  .grid-line {
    stroke: var(--arch-grid);
    stroke-width: 0.5;
  }

  .grid-line-major {
    stroke: var(--arch-grid-major);
    stroke-width: 1;
  }

  .grid-dot {
    fill: var(--arch-grid-dot);
  }

  .ground-shadow-core {
    stop-color: var(--arch-ground-shadow);
    stop-opacity: 1;
  }

  .ground-shadow-mid {
    stop-color: var(--arch-ground-shadow);
    stop-opacity: 0.33;
  }

  .ground-shadow-edge {
    stop-color: var(--arch-ground-shadow);
    stop-opacity: 0;
  }

  /* Image de fond */
  .background-image-layer {
    pointer-events: none;
    transition: opacity 0.2s ease;
  }

  /* Sols des pièces : couleur de la pièce, teinte de la lumière ou heatmap via --room-fill */
  .room-polygon {
    fill: var(--room-fill, var(--arch-room-fill));
    stroke: var(--arch-room-stroke);
    stroke-width: 1.5;
    transition: fill 0.3s ease, stroke 0.3s ease;
    cursor: pointer;
  }

  /* Pièce éclairée : contour et halo seulement, la teinte calculée reste visible (constat F59) */
  .room-polygon.illuminated {
    stroke: var(--arch-light);
    stroke-opacity: 0.8;
  }

  .room-glow {
    fill: none;
    stroke: var(--arch-light-glow);
    stroke-width: 12;
    stroke-linejoin: round;
    pointer-events: none;
  }

  .room-polygon:hover {
    stroke: var(--arch-accent);
  }

  .room-label-group {
    pointer-events: none;
  }

  /* Textes posés sur le plan : contour de la couleur du fond plutôt qu'un filtre (pas de flou à chaque pan) */
  .room-label-name,
  .room-label-area,
  .room-label-temp,
  .entity-pin-label,
  .entity-pin-state {
    paint-order: stroke;
    stroke: var(--arch-halo);
    stroke-width: 3px;
    stroke-linejoin: round;
  }

  .room-label-name {
    fill: var(--arch-text);
    font-size: 13px;
    font-weight: 700;
    text-anchor: middle;
  }

  .room-label-area {
    fill: var(--arch-accent);
    font-size: 11px;
    font-weight: 600;
    text-anchor: middle;
    font-family: ui-monospace, SFMono-Regular, monospace;
  }

  .room-label-temp {
    fill: var(--arch-temperature);
    font-size: 9.5px;
    font-weight: 700;
    text-anchor: middle;
    font-family: ui-monospace, SFMono-Regular, monospace;
  }

  /* Étiquettes des pièces en 3D (toujours face à l'écran) */
  .room-3d-badge-group {
    cursor: pointer;
  }

  .room-badge-bg {
    fill: var(--arch-surface);
    stroke: var(--arch-accent-soft);
    stroke-width: 1;
  }

  .room-3d-badge-group.selected .room-badge-bg {
    stroke: var(--arch-accent);
    stroke-width: 2;
  }

  .room-3d-badge-group .room-label-name {
    fill: var(--arch-surface-text);
    font-size: 12px;
    stroke: none;
  }

  .room-3d-badge-group .room-label-area {
    font-size: 11px;
    font-weight: 700;
    stroke: none;
  }

  .room-label-height {
    fill: var(--arch-accent-text);
    font-size: 9.5px;
    font-weight: 600;
    text-anchor: middle;
    font-family: ui-monospace, SFMono-Regular, monospace;
  }

  /* Murs 2D : contours de tous les murs, puis remplissages qui masquent les arêtes des jonctions */
  .wall-outline {
    fill: var(--arch-wall-stroke);
    stroke: var(--arch-wall-stroke);
    stroke-width: 2;
    stroke-linejoin: round;
    pointer-events: none;
  }

  .wall-rect {
    fill: var(--arch-wall-fill);
    stroke: none;
    transition: fill 0.15s ease;
  }

  .wall-element:hover .wall-rect {
    fill: var(--arch-wall-hover);
    stroke: var(--arch-accent);
    stroke-width: 1;
    cursor: pointer;
  }

  .wall-centerline {
    stroke: var(--arch-wall-centerline);
    stroke-width: 1;
    stroke-dasharray: 4, 4;
    opacity: 0.5;
  }

  /* Murs 3D : faces (couleur calculée selon l'éclairage), chapeaux, portes et fenêtres reprojetées */
  .wall-face-3d {
    stroke-width: 0.8;
    stroke-linejoin: round;
  }

  .wall-cap-3d {
    fill: var(--arch-wall-cap);
    stroke: var(--arch-wall-cap-stroke);
    stroke-width: 1.2;
    stroke-linejoin: round;
  }

  .wall-cap-3d.selected {
    fill: var(--arch-accent-strong);
    stroke: var(--arch-accent);
    filter: drop-shadow(0 0 10px var(--arch-selection-glow));
  }

  .opening-3d {
    stroke: var(--arch-frame);
    stroke-width: 1;
    stroke-linejoin: round;
    fill: var(--arch-door-3d);
  }

  .opening-3d.window,
  .opening-3d.french_window,
  .opening-3d.sliding_door {
    fill: var(--arch-glass-3d);
  }

  .opening-3d.selected {
    stroke: var(--arch-accent-strong);
    stroke-width: 2;
  }

  /* Ouvertures (même géométrie que le plan publié) */
  .opening-cutout {
    fill: var(--arch-bg);
    stroke: none;
  }

  .opening-jamb {
    fill: var(--arch-frame);
  }

  .opening-frame {
    fill: none;
    stroke: var(--arch-frame);
    stroke-width: 2.5;
  }

  .opening-leaf {
    stroke: var(--arch-accent);
    stroke-width: 2;
    stroke-linecap: round;
  }

  .opening-swing {
    fill: var(--arch-accent-faint);
    stroke: var(--arch-accent);
    stroke-width: 1.2;
    stroke-dasharray: 3, 3;
  }

  .opening-glass {
    stroke: var(--arch-accent);
    stroke-width: 1.5;
  }

  .opening-sash {
    stroke: var(--arch-accent-soft);
    stroke-width: 1;
  }

  .opening-mullion {
    stroke: var(--arch-accent);
    stroke-width: 2.5;
  }

  .opening-panel {
    fill: var(--arch-accent);
  }

  .opening-preview {
    opacity: 0.85;
    filter: drop-shadow(0 0 6px var(--arch-accent));
    pointer-events: none;
  }

  .opening-preview-body {
    fill: var(--arch-accent-soft);
    stroke: var(--arch-accent);
  }

  /* Ouverture refusée : mur trop court ou chevauchement d'une ouverture existante */
  .opening-preview.invalid {
    filter: drop-shadow(0 0 6px var(--arch-invalid));
  }

  .opening-preview.invalid .opening-preview-body {
    fill: var(--arch-invalid-fill);
    stroke: var(--arch-invalid);
  }

  /* Pièce en cours de tracé (polygone ou rectangle) */
  .room-draft-fill {
    fill: var(--arch-accent-faint);
    stroke: none;
  }

  .room-draft-line {
    fill: none;
    stroke: var(--arch-accent);
    stroke-width: 2;
    stroke-dasharray: 6, 4;
  }

  .room-draft-closing {
    stroke: var(--arch-accent);
    stroke-width: 1.2;
    stroke-dasharray: 2, 4;
    opacity: 0.7;
  }

  .room-draft-vertex {
    fill: var(--arch-bg);
    stroke: var(--arch-accent);
    stroke-width: 2;
  }

  .room-draft-vertex.first {
    fill: var(--arch-accent);
    stroke: var(--arch-handle-border);
  }

  /* Poignées d'extrémité de mur et de sommet de pièce */
  .wall-endpoint-handle,
  .room-vertex-handle {
    cursor: move;
  }

  .selection-handles .handle-dot {
    fill: var(--arch-accent);
    stroke: var(--arch-handle-border);
    stroke-width: 2;
    transition: fill 0.15s ease;
  }

  .wall-endpoint-handle:hover .handle-dot,
  .room-vertex-handle:hover .handle-dot {
    fill: var(--arch-accent-strong);
    filter: drop-shadow(0 0 8px var(--arch-accent-strong));
  }

  /* Aperçu du mur en cours de tracé */
  .preview-wall-rect {
    fill: var(--arch-accent-soft);
    stroke: var(--arch-accent);
    stroke-width: 2;
    stroke-dasharray: 6, 4;
  }

  .preview-wall-line {
    stroke: var(--arch-accent);
    stroke-width: 2;
  }

  /* Segment d'étalonnage */
  .calibration-line {
    stroke: var(--arch-measure);
    stroke-width: 2.5;
    stroke-dasharray: 5, 4;
  }

  .calibration-endpoint {
    fill: var(--arch-measure);
    stroke: var(--arch-handle-border);
    stroke-width: 1.5;
  }

  /* Mise à l'échelle */
  .rescale-line {
    stroke: var(--arch-accent);
    stroke-width: 3;
    stroke-dasharray: 6, 4;
  }

  .rescale-start {
    fill: var(--arch-accent);
    stroke: var(--arch-handle-border);
    stroke-width: 2;
  }

  .rescale-end {
    fill: var(--arch-hud-active);
    stroke: var(--arch-accent);
    stroke-width: 2;
  }

  /* Accrochage et guides */
  .snap-indicator {
    fill: none;
    stroke: var(--arch-accent);
    stroke-width: 2;
    transform-box: fill-box;
    transform-origin: center;
    animation: pulseSnap 1.5s infinite alternate ease-in-out;
  }

  .snap-indicator-dot {
    fill: var(--arch-accent);
  }

  @keyframes pulseSnap {
    0% { transform: scale(0.85); opacity: 0.7; }
    100% { transform: scale(1.15); opacity: 1; }
  }

  .angle-guide-line {
    stroke: var(--arch-accent-strong);
    stroke-width: 1.5;
    stroke-dasharray: 4, 4;
    opacity: 0.8;
  }

  /* Guides d'alignement orthogonaux */
  .smart-guide-line {
    stroke: var(--arch-guide);
    stroke-width: 1.5;
    stroke-dasharray: 4, 3;
    opacity: 0.85;
    pointer-events: none;
  }

  /* Cotation automatique des murs */
  .wall-dim-badge {
    pointer-events: none;
    user-select: none;
  }

  .wall-dim-badge rect {
    fill: var(--arch-surface);
    stroke: var(--arch-surface-border);
    stroke-width: 0.8;
    rx: 3;
  }

  .wall-dim-badge text {
    fill: var(--arch-surface-muted);
    font-size: 9.5px;
    font-weight: 700;
    text-anchor: middle;
    dominant-baseline: central;
    font-family: ui-monospace, SFMono-Regular, monospace;
  }

  /* Meubles */
  .furniture-group {
    cursor: grab;
  }

  .furniture-group:active {
    cursor: grabbing;
  }

  .furniture-group.selected .furniture-symbol {
    filter: drop-shadow(0 0 12px var(--arch-selection-glow));
  }

  /* Poignées des meubles : taille constante à l'écran, au-dessus du plan */
  .handle-hit {
    fill: transparent;
  }

  .handle-guide {
    stroke: var(--arch-handle);
    stroke-width: 1.5;
    stroke-dasharray: 3, 2;
  }

  .handle-knob {
    fill: var(--arch-handle);
    stroke: var(--arch-handle-border);
  }

  .handle-grip {
    stroke: var(--arch-handle-grip);
    stroke-width: 1.2;
    stroke-linecap: round;
  }

  .handle-angle,
  .handle-size-text {
    fill: var(--arch-handle);
    font-weight: 700;
    user-select: none;
    pointer-events: none;
  }

  .handle-angle {
    font-size: 10px;
    text-anchor: middle;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
  }

  .handle-size-badge {
    user-select: none;
    pointer-events: none;
  }

  .handle-size-badge rect {
    fill: var(--arch-handle-badge-bg);
    stroke: var(--arch-handle-badge-border);
    stroke-width: 0.8;
  }

  .handle-size-text {
    font-size: 9px;
    font-family: ui-monospace, SFMono-Regular, monospace;
  }

  .furniture-rotate-handle {
    cursor: grab;
    transition: transform 0.15s ease, filter 0.15s ease;
  }

  .furniture-rotate-handle:hover circle {
    fill: var(--arch-handle-hover) !important;
    stroke: var(--arch-handle-border) !important;
    filter: drop-shadow(0 0 8px var(--arch-handle-hover));
  }

  .furniture-rotate-handle:active {
    cursor: grabbing;
  }

  .furniture-resize-handle {
    cursor: nwse-resize;
    transition: transform 0.15s ease, filter 0.15s ease;
  }

  .furniture-resize-handle:hover rect {
    fill: var(--arch-handle-hover) !important;
    stroke: var(--arch-handle-border) !important;
    filter: drop-shadow(0 0 8px var(--arch-handle-hover));
  }

  .furniture-resize-handle:active {
    cursor: nwse-resize;
  }

  /* Calque fantôme du niveau inférieur */
  .ghost-wall {
    stroke: var(--arch-ghost);
    stroke-width: 2;
    stroke-dasharray: 5, 4;
    fill: none;
    pointer-events: none;
  }

  /* Cotes des aperçus (tracé, étalonnage, mise à l'échelle) */
  .dimension-badge {
    pointer-events: none;
  }

  .dimension-badge rect {
    fill: var(--arch-surface);
    stroke: var(--arch-accent-soft);
    stroke-width: 1;
    rx: 4;
    ry: 4;
  }

  .dimension-badge text {
    fill: var(--arch-surface-text);
    font-size: 11px;
    font-weight: 600;
    text-anchor: middle;
    dominant-baseline: central;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }

  .dimension-badge.calibration rect {
    stroke: var(--arch-measure);
  }

  .dimension-badge.calibration text {
    fill: var(--arch-measure);
  }

  .dimension-badge.rescale rect {
    stroke: var(--arch-accent);
    stroke-width: 1.8;
    rx: 6;
    ry: 6;
  }

  .dimension-badge.rescale text {
    fill: var(--arch-accent);
    font-size: 12px;
    font-weight: 800;
  }

  /* ======================================= */
  /* ÉLÉMENTS SÉLECTIONNÉS & MULTI-SÉLECTION */
  /* (seuls éléments à filtre d'ombre permanent, constat F35) */
  /* ======================================= */

  .wall-element.selected .wall-rect {
    stroke: var(--arch-accent-strong);
    stroke-width: 2.5px;
    fill: var(--arch-selection-fill);
    filter: drop-shadow(0 0 10px var(--arch-selection-glow));
  }

  .wall-element.selected .wall-centerline {
    stroke: var(--arch-selection-line);
    stroke-width: 2px;
    stroke-dasharray: none;
  }

  .opening-element.selected .opening-leaf,
  .opening-element.selected .opening-frame,
  .opening-element.selected .opening-glass {
    stroke: var(--arch-accent-strong);
    stroke-width: 3px;
    filter: drop-shadow(0 0 10px var(--arch-selection-glow));
  }

  .opening-element.selected .opening-cutout {
    stroke: var(--arch-accent-strong);
    stroke-width: 2px;
  }

  .room-group.selected .room-polygon {
    stroke: var(--arch-accent-strong);
    stroke-width: 3px;
    stroke-dasharray: 6, 4;
    filter: drop-shadow(0 0 14px var(--arch-selection-glow));
  }

  .entity-pin.selected .entity-pin-bg {
    stroke: var(--arch-accent-strong);
    stroke-width: 3px;
    filter: drop-shadow(0 0 14px var(--arch-selection-glow));
  }

  .marquee-selection-box {
    fill: var(--arch-marquee-fill);
    stroke: var(--arch-accent-strong);
    stroke-width: 1.5;
    stroke-dasharray: 4, 3;
    pointer-events: none;
  }

  /* ======================================= */
  /* ÉPINGLES D'ENTITÉS ET ÉTATS EN DIRECT   */
  /* ======================================= */

  .entity-pin {
    cursor: grab;
    outline: none;
  }

  .entity-pin:active {
    cursor: grabbing;
  }

  .entity-pin:hover .entity-pin-bg {
    stroke: var(--arch-accent);
    r: 18px;
  }

  /* Focus clavier (constat F103) */
  .entity-pin:focus-visible .entity-pin-bg {
    stroke: var(--arch-accent);
    stroke-width: 3px;
    r: 18px;
  }

  .entity-pin-bg {
    fill: var(--arch-pin-bg);
    stroke: var(--arch-pin-border);
    stroke-width: 2;
    transition: r 0.18s ease, stroke 0.18s ease;
  }

  .entity-pin.active-light .entity-pin-bg {
    fill: var(--arch-pin-light-bg);
    stroke: var(--arch-light);
  }

  .pin-glow {
    fill: var(--arch-light-glow);
    pointer-events: none;
  }

  .entity-pin.active-radar .entity-pin-bg {
    stroke: var(--arch-alert-ring);
  }

  /* Entité introuvable dans Home Assistant (supprimée ou renommée, constat F132) */
  .entity-pin.orphan .entity-pin-bg {
    stroke: var(--arch-warning);
    stroke-dasharray: 4, 3;
  }

  /* Animations composées (transform et opacity uniquement, constat F133) */
  .radar-pulse-ring {
    fill: none;
    stroke: var(--arch-alert-ring);
    stroke-width: 2;
    vector-effect: non-scaling-stroke;
    transform-box: fill-box;
    transform-origin: center;
    animation: radarPulse 1.8s infinite ease-out;
    pointer-events: none;
  }

  @keyframes radarPulse {
    0% { transform: scale(0.75); opacity: 1; }
    100% { transform: scale(2.375); opacity: 0; }
  }

  .soundwave-pulse {
    fill: none;
    stroke: var(--arch-media);
    stroke-width: 1.8;
    vector-effect: non-scaling-stroke;
    transform-box: fill-box;
    transform-origin: center;
    animation: soundWave 1.4s infinite ease-out;
    pointer-events: none;
  }

  @keyframes soundWave {
    0% { transform: scale(0.875); opacity: 0.9; }
    100% { transform: scale(2.125); opacity: 0; }
  }

  .fan-spin {
    animation: spinFan 1.2s infinite linear;
    transform-origin: center;
    transform-box: fill-box;
  }

  @keyframes spinFan {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @media (prefers-reduced-motion: reduce) {
    .radar-pulse-ring,
    .soundwave-pulse,
    .fan-spin,
    .snap-indicator {
      animation: none;
    }

    /* Quart de tour de la vue 2D appliqué sans animation */
    .viewport-2d-rotator {
      transition: none;
    }
  }

  :host([no-animations]) .radar-pulse-ring,
  :host([no-animations]) .soundwave-pulse,
  :host([no-animations]) .fan-spin,
  :host([no-animations]) .snap-indicator {
    animation: none;
  }

  /* Animations coupées (option de la carte) : quart de tour immédiat, comme la caméra 3D */
  :host([no-animations]) .viewport-2d-rotator {
    transition: none;
  }

  /* Hors écran : aucune image calculée pour les animations */
  :host([offscreen]) .radar-pulse-ring,
  :host([offscreen]) .soundwave-pulse,
  :host([offscreen]) .fan-spin,
  :host([offscreen]) .snap-indicator {
    animation-play-state: paused;
  }

  .entity-pin-icon {
    font-size: 15px;
    text-anchor: middle;
    dominant-baseline: central;
    user-select: none;
  }

  .entity-pin-label {
    fill: var(--arch-text);
    font-size: 10px;
    font-weight: 700;
    text-anchor: middle;
    pointer-events: none;
  }

  .entity-pin-state {
    font-size: 8.5px;
    font-weight: 600;
    text-anchor: middle;
    pointer-events: none;
    letter-spacing: 0.2px;
  }

  .entity-pin-state.state-on {
    fill: var(--arch-on);
  }

  .entity-pin-state.state-off {
    fill: var(--arch-off);
  }

  .entity-pin-state.state-alert {
    fill: var(--arch-alert);
  }

  .entity-pin-state.state-info {
    fill: var(--arch-info);
  }

  .entity-pin-state.state-missing {
    fill: var(--arch-warning);
  }

  .entity-pin-value-badge rect {
    fill: var(--arch-surface);
    stroke: var(--arch-accent);
    stroke-width: 1;
    rx: 4;
  }

  .entity-pin-value-badge text {
    fill: var(--arch-accent);
    font-size: 9px;
    font-weight: 700;
    text-anchor: middle;
    dominant-baseline: central;
    font-family: ui-monospace, SFMono-Regular, monospace;
  }

  /* ======================================= */
  /* HUD                                     */
  /* ======================================= */

  .canvas-hud {
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    box-sizing: border-box;
    max-width: calc(100% - 32px);
    background: var(--arch-hud-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--arch-hud-border);
    border-radius: 12px;
    padding: 6px 10px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    z-index: 50;
  }

  .hud-btn {
    background: var(--arch-hud-btn);
    color: var(--arch-hud-text);
    border: 1px solid var(--arch-hud-btn-border);
    border-radius: 8px;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.2s ease;
  }

  .hud-btn:hover {
    background: var(--arch-hud-active);
    border-color: var(--arch-accent);
    color: var(--arch-hud-active-text);
    transform: translateY(-1px);
  }

  .hud-btn.active {
    background: var(--arch-hud-active);
    border-color: var(--arch-accent);
    color: var(--arch-hud-active-text);
  }

  .hud-btn:focus-visible,
  .hud-preset-btn:focus-visible {
    outline: 2px solid var(--arch-accent);
    outline-offset: 2px;
  }

  .hud-zoom-label {
    display: flex;
    align-items: center;
    padding: 0 8px;
    font-size: 12px;
    font-weight: 600;
    color: var(--arch-text-muted);
    min-width: 48px;
    justify-content: center;
    font-family: ui-monospace, SFMono-Regular, monospace;
  }

  .hud-preset-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px;
    padding-left: 6px;
    border-left: 1px solid var(--arch-hud-border);
  }

  .hud-preset-btn {
    background: var(--arch-hud-btn);
    color: var(--arch-hud-text);
    border: 1px solid var(--arch-hud-btn-border);
    border-radius: 6px;
    padding: 4px 7px;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .hud-preset-btn:hover {
    background: var(--arch-hud-active);
    border-color: var(--arch-accent);
    color: var(--arch-hud-active-text);
  }

  .hud-angle-badge {
    font-size: 10px;
    color: var(--arch-accent);
    font-family: ui-monospace, SFMono-Regular, monospace;
    padding: 0 4px;
    white-space: nowrap;
  }

  .coords-hud {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;
    max-width: calc(100% - 32px);
    overflow: hidden;
    background: var(--arch-surface);
    backdrop-filter: blur(14px);
    border: 1px solid var(--arch-accent-soft);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
    border-radius: 10px;
    padding: 6px 16px;
    font-size: 11.5px;
    font-weight: 600;
    color: var(--arch-surface-muted);
    font-family: ui-monospace, SFMono-Regular, monospace;
    z-index: 50;
    pointer-events: none;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: bottom 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .coords-hud.selection-active {
    bottom: 90px;
  }

  /*
   * Largeur insuffisante pour placer les coordonnées (centrées) à côté du HUD (à droite) : elles passent
   * au-dessus du HUD au lieu de le chevaucher ; le HUD 3D, avec ses préréglages et la coupe des murs, est
   * plus large (≈ 690 px, constat F126).
   */
  @container architect-canvas (max-width: 1080px) {
    .coords-hud {
      bottom: 76px;
    }
  }

  @container architect-canvas (max-width: 1740px) {
    .canvas-container.mode-3d ~ .coords-hud:not(.selection-active) {
      bottom: 76px;
    }
  }

  .coords-key {
    color: var(--arch-accent);
  }

  .coords-sep {
    opacity: 0.35;
  }

  .coords-tool-key {
    color: var(--arch-text-muted);
  }

  .coords-tool {
    color: var(--arch-surface-text);
    font-weight: 700;
  }

  /* Message bref (accrochage refusé, aide à la molette sur la carte, action impossible) */
  .canvas-hint {
    position: absolute;
    top: 64px;
    left: 50%;
    transform: translateX(-50%);
    max-width: calc(100% - 32px);
    box-sizing: border-box;
    background: var(--arch-hint-bg);
    border: 1px solid var(--arch-hint-border);
    border-radius: 10px;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 600;
    color: var(--arch-hint-text);
    text-align: center;
    z-index: 60;
    pointer-events: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .canvas-hint[hidden] {
    display: none;
  }

  .help-hud {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
    max-width: calc(100% - 32px);
    box-sizing: border-box;
    text-align: center;
    background: var(--arch-hud-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--arch-accent-soft);
    border-radius: 20px;
    padding: 6px 16px;
    font-size: 12px;
    font-weight: 500;
    color: var(--arch-hud-text);
    z-index: 50;
    pointer-events: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  }

  /* HUD compact : téléphone, carte étroite (constat F126) */
  :host([compact]) .canvas-hud {
    bottom: 12px;
    right: 12px;
    gap: 6px;
    padding: 5px 8px;
    max-width: calc(100% - 24px);
  }

  :host([compact]) .hud-btn {
    width: 32px;
    height: 32px;
    font-size: 15px;
  }

  :host([compact]) .hud-zoom-label {
    min-width: 40px;
    padding: 0 4px;
    font-size: 11px;
  }

  :host([compact]) .hud-preset-group,
  :host([compact]) .coords-hud {
    display: none;
  }

  /* HUD 3D compact (bouton de coupe des murs en plus) : le pourcentage de zoom cède sa place, + et − restent */
  :host([compact]) .canvas-container.mode-3d ~ .canvas-hud .hud-zoom-label {
    display: none;
  }

  :host([compact]) .help-hud {
    top: 12px;
    max-width: calc(100% - 24px);
    padding: 5px 12px;
    font-size: 11px;
    border-radius: 14px;
  }

  :host([compact]) .canvas-hint {
    top: 52px;
    max-width: calc(100% - 24px);
  }

  /* Quand un toast du studio est affiché, masquer l'aide pour éviter toute superposition */
  :host([has-toast]) .help-hud,
  :host([has-toast]) .canvas-hint {
    display: none !important;
  }
`;
