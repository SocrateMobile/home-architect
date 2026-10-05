import { Point, ViewportTransform } from '../core/types';
import { clampZoom } from './coords';

/**
 * Suivi multi-pointeur du canevas (constat F53) : chaque doigt est suivi par son pointerId ; dès que
 * deux pointeurs sont posés, le canevas passe en geste (pincement pour zoomer, glisser à deux doigts
 * pour déplacer la vue) et annule l'action commencée par le premier doigt.
 */

/**
 * Déplacement (px) au-delà duquel un appui devient un glisser : en deçà, c'est un clic / tap.
 * 3 px à la souris (seuil historique du glisser des meubles, murs et entités), plus au doigt et au stylet.
 */
const TAP_SLOP_PX: Record<string, number> = { mouse: 3, pen: 6, touch: 10 };

export function tapSlop(pointerType: string): number {
  return TAP_SLOP_PX[pointerType] ?? TAP_SLOP_PX.touch;
}

/** Vrai si le pointeur s'est éloigné de son point d'appui au-delà du seuil de tap. */
export function exceedsTapSlop(start: Point, current: Point, pointerType: string): boolean {
  return Math.hypot(current.x - start.x, current.y - start.y) > tapSlop(pointerType);
}

export interface TrackedPointer {
  x: number;
  y: number;
  type: string;
}

/** Pointeurs actuellement posés (coordonnées client). */
export class PointerTracker {
  private readonly pointers = new Map<number, TrackedPointer>();

  get size(): number {
    return this.pointers.size;
  }

  has(id: number): boolean {
    return this.pointers.has(id);
  }

  set(id: number, x: number, y: number, type: string): void {
    this.pointers.set(id, { x, y, type });
  }

  /** Met à jour la position d'un pointeur suivi ; false s'il n'est pas suivi. */
  move(id: number, x: number, y: number): boolean {
    const p = this.pointers.get(id);
    if (!p) return false;
    p.x = x;
    p.y = y;
    return true;
  }

  delete(id: number): void {
    this.pointers.delete(id);
  }

  clear(): void {
    this.pointers.clear();
  }

  /** Les deux premiers pointeurs suivis (identifiants, positions et types), ou null. */
  pair(): { ids: [number, number]; points: [Point, Point]; types: [string, string] } | null {
    if (this.pointers.size < 2) return null;
    const [a, b] = [...this.pointers.entries()];
    return {
      ids: [a[0], b[0]],
      points: [{ x: a[1].x, y: a[1].y }, { x: b[1].x, y: b[1].y }],
      types: [a[1].type, b[1].type]
    };
  }

  /** Position d'un pointeur suivi. */
  get(id: number): Point | null {
    const p = this.pointers.get(id);
    return p ? { x: p.x, y: p.y } : null;
  }
}

export function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

export function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/**
 * Vue après un geste à deux doigts, dans le repère vue (rotation annulée) : le point monde qui était
 * sous le milieu des doigts au début du geste suit le milieu courant, et le zoom est multiplié par le
 * rapport des écartements (borné).
 */
export function pinchViewport(
  startViewport: ViewportTransform,
  startMidView: Point,
  currentMidView: Point,
  scale: number,
  pixelsPerMeter: number
): ViewportTransform {
  const k0 = pixelsPerMeter * startViewport.zoom;
  const anchor = { x: (startMidView.x - startViewport.x) / k0, y: (startMidView.y - startViewport.y) / k0 };
  const zoom = clampZoom(startViewport.zoom * (Number.isFinite(scale) && scale > 0 ? scale : 1), pixelsPerMeter);
  const k = pixelsPerMeter * zoom;
  return { x: currentMidView.x - anchor.x * k, y: currentMidView.y - anchor.y * k, zoom };
}
