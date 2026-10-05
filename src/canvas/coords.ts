import { Point, ViewportTransform } from '../core/types';

/**
 * Conversions de coordonnées du canevas (module pur, testé par tests/frontend/canvas-coords.test.ts).
 *
 * Repères :
 *  - client : coordonnées des événements pointeur (fenêtre, px CSS) ;
 *  - local  : relatives au coin haut-gauche du canevas, telles qu'affichées (rotation de vue comprise) ;
 *  - vue    : repère du groupe SVG `viewport-2d-rotator` AVANT sa rotation, celui où le plan est dessiné
 *             (valeurs produites par worldToView, alias worldToScreen dans le canevas) ;
 *  - monde  : mètres.
 *
 * La rotation de vue 2D est appliquée UNE seule fois, par le groupe SVG, autour du centre du canevas
 * (v1.0.28 / v1.0.29) : worldToView ne tourne pas ; seules les conversions depuis l'écran (clic, zoom
 * molette, pan) compensent la rotation. En 3D la rotation de vue vaut 0 (l'orbite est appliquée au wrapper).
 */

/** Échelle (px/m) de référence : les bornes de zoom sont exprimées pour cette échelle de projet. */
export const REFERENCE_PIXELS_PER_METER = 50;

/** Bornes du zoom manuel (molette, boutons, pincement) à l'échelle de référence. */
export const MIN_ZOOM = 0.15;
export const MAX_ZOOM = 8;

/** Bornes du zoom de cadrage automatique (« ajuster à l'écran ») à l'échelle de référence. */
export const FIT_MIN_ZOOM = 0.2;
export const FIT_MAX_ZOOM = 2.5;

/** Taille minimale (px à l'échelle de référence) prise en compte pour cadrer un plan minuscule. */
const FIT_MIN_PLAN_PX = 100;

/** Hauteur d'une « ligne » de molette (WheelEvent.DOM_DELTA_LINE), en pixels. */
const WHEEL_LINE_HEIGHT_PX = 16;
/** Borne d'un delta de molette par événement (évite un saut de zoom sur une molette à crans rapides). */
const MAX_WHEEL_DELTA_PX = 240;
/** Sensibilités du zoom : molette ou défilement (par pixel), pincement de pavé tactile (Ctrl + molette). */
const WHEEL_ZOOM_SENSITIVITY = 0.0015;
const PINCH_ZOOM_SENSITIVITY = 0.01;

export interface CanvasSize {
  width: number;
  height: number;
}

/** Position du canevas dans la fenêtre (DOMRect suffit). */
export interface ClientOrigin {
  left: number;
  top: number;
}

/** État de la vue nécessaire aux conversions. */
export interface ViewGeometry {
  viewport: ViewportTransform;
  /** Échelle du projet (px/m) au zoom 1. */
  pixelsPerMeter: number;
  /** Rotation de vue 2D en degrés (multiple quelconque, non normalisé ; 0 en 3D). */
  rotationDeg: number;
  /** Taille du canevas (px CSS) : son centre est l'origine de la rotation de vue. */
  size: CanvasSize;
}

/** Angle ramené dans [0, 360). */
export function normalizeAngle(deg: number): number {
  const n = ((deg % 360) + 360) % 360;
  return n === 0 ? 0 : n; // évite -0
}

/** Cosinus et sinus exacts pour les quarts de tour (pas de bruit flottant à 90°, 180°, 270°). */
function cosSin(deg: number): [number, number] {
  const n = normalizeAngle(deg);
  if (n === 0) return [1, 0];
  if (n === 90) return [0, 1];
  if (n === 180) return [-1, 0];
  if (n === 270) return [0, -1];
  const rad = (n * Math.PI) / 180;
  return [Math.cos(rad), Math.sin(rad)];
}

/** Rotation d'un vecteur de `deg` degrés, même convention que CSS rotate() (repère Y vers le bas). */
export function rotateVector(v: Point, deg: number): Point {
  const [c, s] = cosSin(deg);
  return { x: v.x * c - v.y * s, y: v.x * s + v.y * c };
}

/** Centre du canevas (origine de la rotation de vue). */
export function canvasCenter(size: CanvasSize): Point {
  return { x: size.width / 2, y: size.height / 2 };
}

/** Échelle d'affichage : pixels écran par mètre (pixelsPerMeter × zoom). */
export function screenScale(geo: ViewGeometry): number {
  return geo.pixelsPerMeter * geo.viewport.zoom;
}

export function clientToLocal(clientX: number, clientY: number, origin: ClientOrigin): Point {
  return { x: clientX - origin.left, y: clientY - origin.top };
}

export function localToClient(p: Point, origin: ClientOrigin): Point {
  return { x: p.x + origin.left, y: p.y + origin.top };
}

/** Point affiché (local) → repère du groupe tourné : annule la rotation de vue autour du centre. */
export function localToView(p: Point, geo: ViewGeometry): Point {
  if (normalizeAngle(geo.rotationDeg) === 0) return { x: p.x, y: p.y };
  const c = canvasCenter(geo.size);
  const d = rotateVector({ x: p.x - c.x, y: p.y - c.y }, -geo.rotationDeg);
  return { x: c.x + d.x, y: c.y + d.y };
}

/** Repère du groupe tourné → point affiché (local) : applique la rotation de vue autour du centre. */
export function viewToLocal(p: Point, geo: ViewGeometry): Point {
  if (normalizeAngle(geo.rotationDeg) === 0) return { x: p.x, y: p.y };
  const c = canvasCenter(geo.size);
  const d = rotateVector({ x: p.x - c.x, y: p.y - c.y }, geo.rotationDeg);
  return { x: c.x + d.x, y: c.y + d.y };
}

export function viewToWorld(p: Point, geo: ViewGeometry): Point {
  const k = screenScale(geo);
  return { x: (p.x - geo.viewport.x) / k, y: (p.y - geo.viewport.y) / k };
}

export function worldToView(p: Point, geo: ViewGeometry): Point {
  const k = screenScale(geo);
  return { x: p.x * k + geo.viewport.x, y: p.y * k + geo.viewport.y };
}

/** Conversion unique écran → monde : client → local → (rotation annulée) → monde. */
export function clientToWorld(clientX: number, clientY: number, origin: ClientOrigin, geo: ViewGeometry): Point {
  return viewToWorld(localToView(clientToLocal(clientX, clientY, origin), geo), geo);
}

/** Inverse exact de clientToWorld. */
export function worldToClient(p: Point, origin: ClientOrigin, geo: ViewGeometry): Point {
  return localToClient(viewToLocal(worldToView(p, geo), geo), origin);
}

/**
 * Translation de la vue pour un déplacement du pointeur `localDelta` (px affichés) depuis le début du
 * pan : le delta est tourné de −rotation pour que le plan suive le pointeur quelle que soit la rotation.
 */
export function panViewport(start: Point, localDelta: Point, rotationDeg: number): Point {
  const d = rotateVector(localDelta, -rotationDeg);
  return { x: start.x + d.x, y: start.y + d.y };
}

/** Zoom autour d'un point du repère vue : le point monde situé sous `anchorView` y reste. */
export function zoomViewportAt(viewport: ViewportTransform, anchorView: Point, newZoom: number): ViewportTransform {
  const ratio = newZoom / viewport.zoom;
  return {
    x: anchorView.x - (anchorView.x - viewport.x) * ratio,
    y: anchorView.y - (anchorView.y - viewport.y) * ratio,
    zoom: newZoom
  };
}

/** Rapport entre l'échelle de référence et celle du projet (1 pour un projet à 50 px/m). */
function referenceRatio(pixelsPerMeter: number): number {
  return pixelsPerMeter > 0 && Number.isFinite(pixelsPerMeter) ? REFERENCE_PIXELS_PER_METER / pixelsPerMeter : 1;
}

/**
 * Bornes du zoom pour l'échelle du projet : elles portent sur l'échelle affichée (px/m), si bien qu'un
 * projet à 1 px/m ou à 1 250 px/m reste lisible et éditable (constat F71). Identiques à 0,15–8 à 50 px/m.
 */
export function zoomLimits(pixelsPerMeter: number): { min: number; max: number } {
  const r = referenceRatio(pixelsPerMeter);
  return { min: MIN_ZOOM * r, max: MAX_ZOOM * r };
}

export function clampZoom(zoom: number, pixelsPerMeter: number): number {
  const { min, max } = zoomLimits(pixelsPerMeter);
  const z = Number.isFinite(zoom) ? zoom : referenceRatio(pixelsPerMeter);
  return Math.min(Math.max(z, min), max);
}

/** Zoom par défaut (vue d'un plan vide) : 1 à l'échelle de référence. */
export function defaultZoom(pixelsPerMeter: number): number {
  return referenceRatio(pixelsPerMeter);
}

/** Zoom affiché à l'utilisateur, relatif à l'échelle de référence (100 % = 50 px/m à l'écran). */
export function displayZoom(zoom: number, pixelsPerMeter: number): number {
  return zoom / referenceRatio(pixelsPerMeter);
}

/** Delta de molette converti en pixels selon WheelEvent.deltaMode (0 pixels, 1 lignes, 2 pages). */
export function wheelDeltaPixels(delta: number, deltaMode: number, pageHeight: number): number {
  if (!Number.isFinite(delta)) return 0;
  if (deltaMode === 1) return delta * WHEEL_LINE_HEIGHT_PX;
  if (deltaMode === 2) return delta * (pageHeight > 0 ? pageHeight : 800);
  return delta;
}

/**
 * Facteur de zoom continu pour un delta vertical (px) : exp(−delta × k), proportionnel à l'amplitude
 * du geste (un léger glissement sur pavé tactile ne fait plus passer de 100 % à 800 %, constat F122).
 * `pinch` : Ctrl/⌘ + molette, émis par le pincement du pavé tactile, aux deltas plus fins.
 */
export function wheelZoomFactor(deltaPx: number, pinch: boolean): number {
  const d = Math.max(-MAX_WHEEL_DELTA_PX, Math.min(MAX_WHEEL_DELTA_PX, deltaPx));
  return Math.exp(-d * (pinch ? PINCH_ZOOM_SENSITIVITY : WHEEL_ZOOM_SENSITIVITY));
}

/** Boîte englobante en mètres (origine et dimensions). */
export interface WorldBounds {
  minX: number;
  minY: number;
  width: number;
  height: number;
}

/**
 * Vue qui cadre `bounds` au centre du canevas (comportement de fitToScreen depuis la v1.0.28) : à 90° et
 * 270° de rotation de vue, largeur et hauteur sont transposées ; le centre du plan est placé au centre du
 * canevas, qui est aussi le centre de la rotation, donc le cadrage reste centré une fois la vue tournée.
 */
export function fitViewport(
  bounds: WorldBounds,
  pixelsPerMeter: number,
  size: CanvasSize,
  rotationDeg: number,
  padding: number
): ViewportTransform {
  const r = referenceRatio(pixelsPerMeter);
  const rot = normalizeAngle(rotationDeg);
  const transposed = rot === 90 || rot === 270;
  const rawW = bounds.width * pixelsPerMeter;
  const rawH = bounds.height * pixelsPerMeter;
  const planW = transposed ? rawH : rawW;
  const planH = transposed ? rawW : rawH;
  const planCenterX = (bounds.minX + bounds.width / 2) * pixelsPerMeter;
  const planCenterY = (bounds.minY + bounds.height / 2) * pixelsPerMeter;

  const availW = Math.max(100, size.width - padding * 2);
  const availH = Math.max(100, size.height - padding * 2);
  const minPlanPx = FIT_MIN_PLAN_PX / r;

  let zoom = Math.min(availW / Math.max(planW, minPlanPx), availH / Math.max(planH, minPlanPx));
  zoom = Math.min(Math.max(zoom, FIT_MIN_ZOOM * r), FIT_MAX_ZOOM * r);

  return {
    x: size.width / 2 - planCenterX * zoom,
    y: size.height / 2 - planCenterY * zoom,
    zoom
  };
}
