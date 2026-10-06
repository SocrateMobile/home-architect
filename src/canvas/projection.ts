import { Point } from '../core/types';

/**
 * Projection de la vue 3D (constat F120), calculée en JS au lieu d'une transformation CSS 3D :
 * orthographique, mêmes angles et même sens que l'ancienne transformation `rotateX(pitch) rotateZ(yaw)`
 * appliquée autour du centre du canevas. Le sol (repère « vue » du plan 2D, en px) subit une
 * transformation affine ; la hauteur est extrudée dans l'espace écran (vers le haut quel que soit
 * l'angle), et la profondeur permet de trier les faces du plus lointain au plus proche.
 *
 * La vue 3D principale est rendue en WebGL (src/view3d, chargée à la demande) : cette projection SVG
 * sert de repli (WebGL indisponible, ou chunk 3D en cours de chargement), avec les mêmes conventions
 * d'angles (inclinaison 0 = dessus ; orientation = azimut de la caméra WebGL).
 */

export interface Camera3D {
  /** Inclinaison en degrés (0 = vue de dessus). */
  pitchDeg: number;
  /** Orientation en degrés (rotation du plan autour du centre, sens CSS). */
  yawDeg: number;
}

export interface CameraBasis {
  cosYaw: number;
  sinYaw: number;
  cosPitch: number;
  sinPitch: number;
}

/** Cosinus minimal de l'inclinaison : la vue rasante (90°) n'est pas inversible. */
const MIN_COS_PITCH = 1e-3;

export function cameraBasis(cam: Camera3D): CameraBasis {
  const yaw = (cam.yawDeg * Math.PI) / 180;
  const pitch = (cam.pitchDeg * Math.PI) / 180;
  return {
    cosYaw: Math.cos(yaw),
    sinYaw: Math.sin(yaw),
    cosPitch: Math.max(MIN_COS_PITCH, Math.cos(pitch)),
    sinPitch: Math.sin(pitch)
  };
}

/** Coordonnées dans le repère de la caméra (sol tourné de yaw autour du centre), avant inclinaison. */
function rotated(v: Point, b: CameraBasis, center: Point): Point {
  const dx = v.x - center.x;
  const dy = v.y - center.y;
  return { x: dx * b.cosYaw - dy * b.sinYaw, y: dx * b.sinYaw + dy * b.cosYaw };
}

/** Point du sol (repère vue, px) situé à `heightPx` au-dessus du sol → point écran (repère local du canevas). */
export function projectPoint(v: Point, heightPx: number, b: CameraBasis, center: Point): Point {
  const r = rotated(v, b, center);
  return { x: center.x + r.x, y: center.y + r.y * b.cosPitch - heightPx * b.sinPitch };
}

/** Profondeur d'un point : plus elle est grande, plus le point est proche de l'observateur. */
export function pointDepth(v: Point, heightPx: number, b: CameraBasis, center: Point): number {
  return rotated(v, b, center).y * b.sinPitch + heightPx * b.cosPitch;
}

/** Matrice SVG `matrix(a b c d e f)` qui projette le sol (repère vue) à l'écran. */
export function floorMatrix(b: CameraBasis, center: Point): [number, number, number, number, number, number] {
  const a = b.cosYaw;
  const bb = b.sinYaw * b.cosPitch;
  const c = -b.sinYaw;
  const d = b.cosYaw * b.cosPitch;
  return [a, bb, c, d, center.x - (a * center.x + c * center.y), center.y - (bb * center.x + d * center.y)];
}

/** Déplacement à l'écran → déplacement sur le sol (repère vue) : le plan suit le pointeur en 3D. */
export function screenDeltaToFloor(delta: Point, b: CameraBasis): Point {
  const x = delta.x;
  const y = delta.y / b.cosPitch;
  return { x: x * b.cosYaw + y * b.sinYaw, y: -x * b.sinYaw + y * b.cosYaw };
}

/** Point écran (repère local) → point du sol (repère vue) : inverse exact de projectPoint à hauteur nulle. */
export function unprojectFloor(s: Point, b: CameraBasis, center: Point): Point {
  const d = screenDeltaToFloor({ x: s.x - center.x, y: s.y - center.y }, b);
  return { x: center.x + d.x, y: center.y + d.y };
}

/** Direction (monde, sol) vers l'observateur : une face verticale dont la normale y pointe est visible. */
export function viewerDirection(b: CameraBasis): Point {
  return { x: b.sinYaw, y: b.cosYaw };
}

/** Angle ramené dans (−180, 180] (chemin le plus court d'une animation de caméra). */
export function shortestAngleDelta(fromDeg: number, toDeg: number): number {
  let d = (toDeg - fromDeg) % 360;
  if (d > 180) d -= 360;
  if (d <= -180) d += 360;
  return d;
}
