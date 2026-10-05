import { GridConfig, Point, Wall, WallSnapResult } from '../core/types';
import { SNAP_TOLERANCES_PX, SnapOptions, SnapResult, SnappingEngine } from '../core/snapping';

/**
 * Accrochage des outils du canevas. Les tolérances sont exprimées en pixels écran et converties selon
 * l'échelle affichée (pixelsPerMeter × zoom, constat F125) ; Alt enfoncé coupe tout accrochage
 * (point arrondi au millimètre, constat F47). La grille et ses bascules viennent de project.grid.
 */

/** Point libre (Alt) : arrondi au millimètre, sans contrainte. */
export function freePoint(raw: Point): SnapResult {
  return { point: SnappingEngine.roundPoint(raw), snappedTo: 'none', constraints: [] };
}

/** Accrochage d'un point de tracé (mur, sommet de pièce, déplacement de structure). */
export function snapDrawingPoint(
  raw: Point,
  grid: GridConfig,
  walls: Wall[],
  origin: Point | undefined,
  screenPixelsPerMeter: number,
  free: boolean,
  options: Omit<SnapOptions, 'screenPixelsPerMeter'> = {}
): SnapResult {
  if (free) return freePoint(raw);
  return SnappingEngine.snapPoint(raw, grid, walls, origin, { ...options, screenPixelsPerMeter });
}

/**
 * Point de mesure de l'outil « Mettre à l'échelle » (constat F140) : sommet de mur le plus proche,
 * sinon projection sur l'axe d'un mur survolé, sinon le point brut — jamais la grille ni les guides,
 * qui fausseraient la mesure. Le point n'est pas arrondi.
 */
export function snapMeasurePoint(raw: Point, walls: Wall[], screenPixelsPerMeter: number, free: boolean): SnapResult {
  if (free) return { point: { ...raw }, snappedTo: 'none', constraints: [] };
  const vertexTol = SnappingEngine.metersFromPixels(SNAP_TOLERANCES_PX.vertex, screenPixelsPerMeter);
  let vertex: Point | null = null;
  let best = vertexTol;
  for (const wall of walls) {
    for (const v of [wall.start, wall.end]) {
      const d = SnappingEngine.distance(raw, v);
      if (d <= best) {
        best = d;
        vertex = v;
      }
    }
  }
  if (vertex) return { point: { x: vertex.x, y: vertex.y }, snappedTo: 'vertex', constraints: ['vertex'] };
  const onWall = snapToWall(raw, walls, screenPixelsPerMeter);
  if (onWall) return { point: onWall.projectionPoint, snappedTo: 'wall', constraints: ['wall'], wallId: onWall.wall.id };
  return { point: { ...raw }, snappedTo: 'none', constraints: [] };
}

/** Mur survolé pour poser une ouverture ou mesurer : tolérance en pixels comptée depuis la face du mur. */
export function snapToWall(raw: Point, walls: Wall[], screenPixelsPerMeter: number): WallSnapResult | null {
  return SnappingEngine.snapPointToWall(
    raw,
    walls,
    SnappingEngine.metersFromPixels(SNAP_TOLERANCES_PX.wall, screenPixelsPerMeter),
    { measureFromFace: true }
  );
}
