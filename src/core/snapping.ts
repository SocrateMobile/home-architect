import { Point, Wall, GridConfig, WallSnapResult, Opening } from './types';

/** Pas de grille proposés à l'utilisateur (m), dans les bornes appliquées par normalizeProject [0,05 ; 2]. */
export const GRID_SIZE_PRESETS: readonly number[] = [0.05, 0.10, 0.25, 0.50, 1.00];

/** Tolérances d'accrochage par défaut, en pixels écran (converties en mètres selon l'échelle d'affichage). */
export const SNAP_TOLERANCES_PX = { vertex: 12, guide: 8, wall: 10 } as const;

/** Tolérances historiques en mètres, utilisées quand l'appelant ne fournit pas l'échelle d'affichage. */
const LEGACY_TOLERANCES_M = { vertex: 0.25, guide: 0.18, wall: 0.25 };

const DEFAULT_ANGLE_STEP_DEG = 45;
const DEFAULT_ANGLE_TOLERANCE_DEG = 6;

/** Précision du point accroché (1 mm) : supprime le bruit flottant (0.1 × 3 = 0.30000000000000004). */
const RESULT_DECIMALS = 3;

/** Largeur minimale d'une ouverture (m) : en deçà, le mur est trop court pour l'accueillir. */
export const MIN_OPENING_WIDTH = 0.3;

/** Retrait minimal (m) entre une ouverture et l'extrémité de son mur (huisserie), en plus du mur adjacent. */
export const OPENING_END_MARGIN = 0.05;

/** Distance (m) sous laquelle une extrémité de mur est considérée comme jointe à un autre mur. */
const JOIN_TOLERANCE = 0.02;

export type SnapKind = 'vertex' | 'midpoint' | 'wall' | 'smart_guide' | 'angle' | 'grid' | 'none';

export interface SnapOptions {
  /**
   * Échelle d'affichage en pixels écran par mètre (pixelsPerMeter × zoom). Si elle est fournie,
   * les tolérances sont exprimées en pixels et converties en mètres (tolM = tolPx / échelle) ;
   * sinon les tolérances historiques en mètres s'appliquent.
   */
  screenPixelsPerMeter?: number;
  /** Tolérance d'accrochage aux sommets et milieux de murs, en pixels (défaut SNAP_TOLERANCES_PX.vertex). */
  vertexTolerancePx?: number;
  /** Tolérance des guides d'alignement X/Y, en pixels (défaut SNAP_TOLERANCES_PX.guide). */
  guideTolerancePx?: number;
  /** Tolérance d'accrochage sur un mur (jonction en T), en pixels depuis la face du mur (défaut SNAP_TOLERANCES_PX.wall). */
  wallTolerancePx?: number;
  /** Pas angulaire en degrés (défaut 45). */
  angleStepDeg?: number;
  /** Tolérance de capture angulaire en degrés (défaut 6). */
  angleToleranceDeg?: number;
  /** Sommets ignorés (ex. extrémités du mur en cours de déplacement). Le point d'origine est toujours ignoré. */
  excludePoints?: Point[];
  /** Murs ignorés (ex. le mur en cours de déplacement). */
  excludeWallIds?: string[];
}

export interface SnapResult {
  point: Point;
  /** Contrainte principale (indicateur visuel). */
  snappedTo: SnapKind;
  /** Toutes les contraintes combinées, dans l'ordre d'application (ex. ['smart_guide', 'angle'] ou ['wall', 'grid']). */
  constraints?: SnapKind[];
  /** Angle capté (degrés, [0, 360)) quand l'accrochage angulaire participe au résultat. */
  guideAngle?: number;
  /** Abscisse du guide vertical appliqué. */
  smartGuideX?: number;
  /** Ordonnée du guide horizontal appliqué. */
  smartGuideY?: number;
  /** Mur accroché (jonction en T ou milieu de mur). */
  wallId?: string;
}

/** Placement borné d'une ouverture sur son mur (voir SnappingEngine.fitOpening). */
export interface OpeningFit {
  /** Centre de l'ouverture (m depuis wall.start), borné à [début utile + w/2 ; fin utile − w/2]. */
  offset: number;
  /** Largeur, réduite à la longueur utile si nécessaire. */
  width: number;
  /** False si la longueur utile du mur est inférieure à MIN_OPENING_WIDTH (ouverture à refuser). */
  fits: boolean;
  /** True si l'offset ou la largeur demandés ont été modifiés. */
  adjusted: boolean;
  /** Identifiants des ouvertures du même mur chevauchées (l'ouverture est alors à refuser ou à signaler). */
  overlaps: string[];
  /** Début et fin de la zone utile du mur (m depuis wall.start). */
  usableStart: number;
  usableEnd: number;
}

export interface OpeningFitContext {
  /** Murs du projet : la demi-épaisseur des murs joints à chaque extrémité est réservée. */
  walls?: Wall[];
  /** Ouvertures existantes (seules celles du même mur sont examinées). */
  openings?: Opening[];
  /** Ouverture à ignorer (celle qu'on déplace ou redimensionne). */
  ignoreOpeningId?: string;
  /** Retrait minimal à chaque extrémité (défaut OPENING_END_MARGIN). */
  endMargin?: number;
}

interface Tolerances {
  vertex: number;
  guide: number;
  wall: number;
}

/** Contrainte linéaire candidate : droite (ou rayon pour l'angle) passant par `origin`, de direction unitaire `dir`. */
interface SnapLine {
  kind: 'wall' | 'smart_guide' | 'angle';
  origin: Point;
  dir: Point;
  /** Distance perpendiculaire du point brut à la droite. */
  offset: number;
  axis?: 'x' | 'y';
  value?: number;
  angle?: number;
  wall?: Wall;
}

function roundTo(v: number, decimals: number): number {
  const f = Math.pow(10, decimals);
  const r = Math.round(v * f) / f;
  return r === 0 ? 0 : r; // évite -0
}

function roundPoint(p: Point, decimals: number = RESULT_DECIMALS): Point {
  return { x: roundTo(p.x, decimals), y: roundTo(p.y, decimals) };
}

function samePoint(a: Point, b: Point): boolean {
  return Math.abs(a.x - b.x) < 1e-3 && Math.abs(a.y - b.y) < 1e-3;
}

function projectOnLine(p: Point, line: SnapLine): Point {
  const t = (p.x - line.origin.x) * line.dir.x + (p.y - line.origin.y) * line.dir.y;
  return { x: line.origin.x + t * line.dir.x, y: line.origin.y + t * line.dir.y };
}

function intersectLines(a: SnapLine, b: SnapLine): Point | null {
  const denom = a.dir.x * b.dir.y - a.dir.y * b.dir.x;
  if (Math.abs(denom) < 1e-9) return null; // parallèles
  const dx = b.origin.x - a.origin.x;
  const dy = b.origin.y - a.origin.y;
  const t = (dx * b.dir.y - dy * b.dir.x) / denom;
  const p = { x: a.origin.x + t * a.dir.x, y: a.origin.y + t * a.dir.y };
  // Un rayon angulaire ne s'étend que vers l'avant de son origine.
  for (const line of [a, b]) {
    if (line.kind === 'angle' && (p.x - line.origin.x) * line.dir.x + (p.y - line.origin.y) * line.dir.y < 0) return null;
  }
  return p;
}

export class SnappingEngine {
  /**
   * Snaps a world point (in meters) to existing vertices, wall midpoints and centerlines (T-junction),
   * alignment guides, angle rays and the grid.
   *
   * Cascade NON exclusive :
   *  1. sommet le plus proche (le point d'origine et `excludePoints` exclus) ;
   *  2. milieu d'un mur, puis axe d'un mur survolé (jonction en T) ;
   *  3. contraintes linéaires combinées : axe de mur > guide X/Y (sommet aligné le plus proche) > rayon
   *     angulaire depuis l'origine. Deux contraintes non parallèles sont intersectées (ex. guide X + angle 0°) ;
   *     une contrainte seule est complétée par la grille sur l'axe libre (ou la longueur le long du rayon) ;
   *  4. sans contrainte : grille sur les deux axes.
   * Le point final est arrondi au millimètre (sauf sommet existant, renvoyé tel quel).
   *
   * Le 5e paramètre accepte l'ancien rayon d'accrochage aux sommets (mètres) ou des SnapOptions ;
   * passer `screenPixelsPerMeter` pour des tolérances constantes à l'écran quel que soit le zoom.
   */
  public static snapPoint(
    rawPoint: Point,
    grid: GridConfig,
    existingWalls: Wall[] = [],
    originPoint?: Point,
    options: number | SnapOptions = {}
  ): SnapResult {
    const opts: SnapOptions = typeof options === 'number' ? {} : options;
    const tol = this.resolveTolerances(options);
    const excludedIds = new Set(opts.excludeWallIds ?? []);
    const walls = existingWalls.filter(w => !excludedIds.has(w.id));
    const excludedPoints = [...(originPoint ? [originPoint] : []), ...(opts.excludePoints ?? [])];
    const isExcluded = (p: Point) => excludedPoints.some(e => samePoint(e, p));
    const gridSize = grid.size > 0 ? grid.size : 0.5;

    const lines: SnapLine[] = [];

    if (grid.snapToElements && walls.length > 0) {
      // 1. Sommet existant le plus proche
      let vertex: Point | null = null;
      let vertexDist = tol.vertex;
      for (const wall of walls) {
        for (const v of [wall.start, wall.end]) {
          if (isExcluded(v)) continue;
          const d = this.distance(rawPoint, v);
          if (d < vertexDist) {
            vertexDist = d;
            vertex = v;
          }
        }
      }
      if (vertex) {
        return { point: { x: vertex.x, y: vertex.y }, snappedTo: 'vertex', constraints: ['vertex'] };
      }

      // 2. Mur survolé : milieu, sinon axe (jonction en T)
      const wallLine = this.findWallLine(rawPoint, walls, tol, originPoint);
      if (wallLine) {
        const w = wallLine.wall as Wall;
        const mid = { x: (w.start.x + w.end.x) / 2, y: (w.start.y + w.end.y) / 2 };
        if (this.distance(projectOnLine(rawPoint, wallLine), mid) <= tol.vertex && !isExcluded(mid)) {
          return { point: roundPoint(mid), snappedTo: 'midpoint', constraints: ['midpoint'], wallId: w.id };
        }
        lines.push(wallLine);
      }

      // 3a. Guides d'alignement : le sommet aligné le plus proche sur chaque axe. Un guide passant
      // par l'origine est ignoré : l'alignement avec l'origine relève de l'angle (0°/90°…), et ce
      // guide ramènerait l'extrémité sur l'origine.
      let guideX: number | undefined;
      let guideY: number | undefined;
      let bestDx = tol.guide;
      let bestDy = tol.guide;
      for (const wall of walls) {
        for (const v of [wall.start, wall.end]) {
          if (isExcluded(v)) continue;
          const dx = Math.abs(rawPoint.x - v.x);
          const dy = Math.abs(rawPoint.y - v.y);
          if (dx < bestDx && !(originPoint && Math.abs(v.x - originPoint.x) < 1e-3)) { bestDx = dx; guideX = v.x; }
          if (dy < bestDy && !(originPoint && Math.abs(v.y - originPoint.y) < 1e-3)) { bestDy = dy; guideY = v.y; }
        }
      }
      // Le guide le plus proche passe en premier.
      const guides: SnapLine[] = [];
      if (guideX !== undefined) {
        guides.push({ kind: 'smart_guide', axis: 'x', value: guideX, origin: { x: guideX, y: 0 }, dir: { x: 0, y: 1 }, offset: bestDx });
      }
      if (guideY !== undefined) {
        guides.push({ kind: 'smart_guide', axis: 'y', value: guideY, origin: { x: 0, y: guideY }, dir: { x: 1, y: 0 }, offset: bestDy });
      }
      guides.sort((a, b) => a.offset - b.offset);
      lines.push(...guides);
    }

    // 3b. Rayon angulaire depuis l'origine
    if (grid.snapToAngles && originPoint) {
      const angleLine = this.findAngleLine(rawPoint, originPoint, opts);
      if (angleLine) lines.push(angleLine);
    }

    if (lines.length === 0) {
      if (!grid.snapToGrid) return { point: { ...rawPoint }, snappedTo: 'none', constraints: [] };
      return {
        point: roundPoint({ x: this.quantize(rawPoint.x, gridSize), y: this.quantize(rawPoint.y, gridSize) }),
        snappedTo: 'grid',
        constraints: ['grid']
      };
    }

    // 4. Combinaison : contrainte principale + seconde contrainte non parallèle proche du curseur
    const primary = lines[0];
    let secondary: SnapLine | undefined;
    let point: Point | null = null;
    for (const candidate of lines.slice(1)) {
      const p = intersectLines(primary, candidate);
      if (!p || (originPoint && samePoint(p, originPoint))) continue; // segment de longueur nulle
      if (this.distance(p, rawPoint) <= 2 * (primary.offset + candidate.offset) + 1e-9) {
        secondary = candidate;
        point = p;
        break;
      }
    }

    const constraints: SnapKind[] = [primary.kind];
    if (secondary) {
      constraints.push(secondary.kind);
    } else {
      point = projectOnLine(rawPoint, primary);
      if (grid.snapToGrid) {
        point = this.quantizeAlongLine(point, primary, gridSize);
        constraints.push('grid');
      }
    }

    const result: SnapResult = { point: roundPoint(point as Point), snappedTo: primary.kind, constraints };
    for (const line of secondary ? [primary, secondary] : [primary]) {
      if (line.kind === 'angle') result.guideAngle = line.angle;
      if (line.kind === 'wall') result.wallId = line.wall?.id;
      if (line.kind === 'smart_guide') {
        if (line.axis === 'x') result.smartGuideX = line.value;
        else result.smartGuideY = line.value;
      }
    }
    return result;
  }

  /**
   * Snaps a point to the nearest wall centerline for placing doors and windows.
   * `maxDistanceMeters` est mesurée depuis l'axe du mur, ou depuis sa face si `measureFromFace`
   * (tolérance écran constante quelle que soit l'épaisseur du mur). `distance` reste la distance à l'axe.
   */
  public static snapPointToWall(
    point: Point,
    walls: Wall[],
    maxDistanceMeters: number = 0.6,
    options: { measureFromFace?: boolean } = {}
  ): WallSnapResult | null {
    let closestSnap: WallSnapResult | null = null;
    let minDistance = Infinity;

    for (const wall of walls) {
      const dx = wall.end.x - wall.start.x;
      const dy = wall.end.y - wall.start.y;
      const wallLen = Math.sqrt(dx * dx + dy * dy);
      if (wallLen === 0) continue;

      // Projection scalaire t
      const t = Math.max(0, Math.min(1,
        ((point.x - wall.start.x) * dx + (point.y - wall.start.y) * dy) / (wallLen * wallLen)
      ));

      const projX = wall.start.x + t * dx;
      const projY = wall.start.y + t * dy;
      const dist = Math.sqrt((point.x - projX) ** 2 + (point.y - projY) ** 2);
      const reach = options.measureFromFace ? maxDistanceMeters + (wall.thickness || 0) / 2 : maxDistanceMeters;

      if (dist <= reach && dist < minDistance) {
        minDistance = dist;
        closestSnap = {
          wall,
          projectionPoint: { x: projX, y: projY },
          offset: t * wallLen,
          distance: dist,
          angleRad: Math.atan2(dy, dx)
        };
      }
    }

    return closestSnap;
  }

  /**
   * Borne une ouverture à son mur : la largeur est réduite à la longueur utile (longueur du mur
   * moins, à chaque extrémité, la demi-épaisseur du plus épais mur joint et `endMargin`), le centre
   * est borné pour que l'ouverture reste entièrement dans cette zone, et les chevauchements avec les
   * autres ouvertures du même mur sont signalés.
   */
  public static fitOpening(wall: Wall, offset: number, width: number, context: OpeningFitContext = {}): OpeningFit {
    const length = this.wallLength(wall);
    const endMargin = context.endMargin ?? OPENING_END_MARGIN;
    const others = (context.walls ?? []).filter(w => w.id !== wall.id);
    const joinedHalfThickness = (p: Point) => others.reduce((max, w) =>
      this.distanceToSegment(p, w.start, w.end) <= JOIN_TOLERANCE ? Math.max(max, (w.thickness || 0) / 2) : max, 0);

    const usableStart = Math.min(length, joinedHalfThickness(wall.start) + endMargin);
    const usableEnd = Math.max(usableStart, length - joinedHalfThickness(wall.end) - endMargin);
    const available = usableEnd - usableStart;

    const requestedWidth = Number.isFinite(width) && width > 0 ? width : MIN_OPENING_WIDTH;
    const requestedOffset = Number.isFinite(offset) ? offset : length / 2;
    const fits = available + 1e-9 >= MIN_OPENING_WIDTH;
    const fitWidth = Math.min(requestedWidth, Math.max(0, available));
    const half = fitWidth / 2;
    const fitOffset = fits
      ? Math.min(usableEnd - half, Math.max(usableStart + half, requestedOffset))
      : (usableStart + usableEnd) / 2;

    const overlaps = (context.openings ?? [])
      .filter(o => o.wallId === wall.id && o.id !== context.ignoreOpeningId)
      .filter(o => Math.abs(o.offset - fitOffset) < (o.width + fitWidth) / 2 - 1e-3)
      .map(o => o.id);

    const roundedOffset = roundTo(fitOffset, RESULT_DECIMALS);
    const roundedWidth = roundTo(fitWidth, RESULT_DECIMALS);
    return {
      offset: roundedOffset,
      width: roundedWidth,
      fits,
      adjusted: Math.abs(roundedOffset - requestedOffset) > 1e-3 || Math.abs(roundedWidth - requestedWidth) > 1e-3,
      overlaps,
      usableStart,
      usableEnd
    };
  }

  /** Convertit une tolérance en pixels écran en mètres pour l'échelle d'affichage donnée (pixelsPerMeter × zoom). */
  public static metersFromPixels(pixels: number, screenPixelsPerMeter: number): number {
    return pixels / Math.max(screenPixelsPerMeter, 1e-6);
  }

  /** Arrondit une valeur au multiple de `step` le plus proche (position absolue sur la grille). */
  public static quantize(value: number, step: number): number {
    if (!(step > 0)) return value;
    return roundTo(Math.round(value / step) * step, 6);
  }

  /** Arrondit un point au millimètre (ou à `decimals` décimales). */
  public static roundPoint(point: Point, decimals: number = RESULT_DECIMALS): Point {
    return roundPoint(point, decimals);
  }

  public static wallLength(wall: Wall): number {
    return this.distance(wall.start, wall.end);
  }

  public static distance(p1: Point, p2: Point): number {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  public static roundMeters(val: number, decimals: number = 2): number {
    const factor = Math.pow(10, decimals);
    return Math.round(val * factor) / factor;
  }

  private static resolveTolerances(options: number | SnapOptions): Tolerances {
    if (typeof options === 'number') return { ...LEGACY_TOLERANCES_M, vertex: options };
    const scale = options.screenPixelsPerMeter;
    if (!(scale !== undefined && Number.isFinite(scale) && scale > 0)) return { ...LEGACY_TOLERANCES_M };
    return {
      vertex: this.metersFromPixels(options.vertexTolerancePx ?? SNAP_TOLERANCES_PX.vertex, scale),
      guide: this.metersFromPixels(options.guideTolerancePx ?? SNAP_TOLERANCES_PX.guide, scale),
      wall: this.metersFromPixels(options.wallTolerancePx ?? SNAP_TOLERANCES_PX.wall, scale)
    };
  }

  /**
   * Mur dont le corps est survolé (distance à l'axe ≤ demi-épaisseur + tolérance), projection
   * strictement à l'intérieur du segment. Les murs passant par l'origine sont ignorés : sinon on ne
   * pourrait pas tracer un court retour perpendiculaire depuis un mur.
   */
  private static findWallLine(raw: Point, walls: Wall[], tol: Tolerances, origin?: Point): SnapLine | null {
    let best: SnapLine | null = null;
    let bestFaceDist = Infinity;
    for (const wall of walls) {
      const dx = wall.end.x - wall.start.x;
      const dy = wall.end.y - wall.start.y;
      const len = Math.hypot(dx, dy);
      if (len < 1e-9) continue;
      if (origin && this.distanceToSegment(origin, wall.start, wall.end) < 1e-3) continue;
      const ux = dx / len, uy = dy / len;
      const t = (raw.x - wall.start.x) * ux + (raw.y - wall.start.y) * uy;
      if (t <= 0 || t >= len) continue;
      const perp = Math.abs((raw.x - wall.start.x) * uy - (raw.y - wall.start.y) * ux);
      const faceDist = Math.max(0, perp - (wall.thickness || 0) / 2);
      if (faceDist > tol.wall) continue;
      if (faceDist < bestFaceDist || (faceDist === bestFaceDist && best && perp < best.offset)) {
        bestFaceDist = faceDist;
        best = { kind: 'wall', origin: wall.start, dir: { x: ux, y: uy }, offset: perp, wall };
      }
    }
    return best;
  }

  private static findAngleLine(raw: Point, origin: Point, opts: SnapOptions): SnapLine | null {
    const dx = raw.x - origin.x;
    const dy = raw.y - origin.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 1e-6) return null;
    const step = opts.angleStepDeg && opts.angleStepDeg > 0 ? opts.angleStepDeg : DEFAULT_ANGLE_STEP_DEG;
    const tolerance = opts.angleToleranceDeg ?? DEFAULT_ANGLE_TOLERANCE_DEG;
    let angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
    if (angleDeg < 0) angleDeg += 360;
    const nearest = Math.round(angleDeg / step) * step;
    if (Math.abs(angleDeg - nearest) > tolerance) return null;
    const rad = (nearest * Math.PI) / 180;
    const dir = { x: Math.cos(rad), y: Math.sin(rad) };
    // Composantes quasi nulles forcées à 0 : rayons exactement horizontaux / verticaux.
    if (Math.abs(dir.x) < 1e-12) dir.x = 0;
    if (Math.abs(dir.y) < 1e-12) dir.y = 0;
    const offset = Math.abs(dx * dir.y - dy * dir.x);
    return { kind: 'angle', angle: ((nearest % 360) + 360) % 360, origin, dir, offset };
  }

  /** Complète une contrainte linéaire par la grille : axe libre d'un guide, longueur d'un rayon, position le long d'un mur. */
  private static quantizeAlongLine(point: Point, line: SnapLine, size: number): Point {
    if (line.kind === 'smart_guide') {
      return line.axis === 'x'
        ? { x: point.x, y: this.quantize(point.y, size) }
        : { x: this.quantize(point.x, size), y: point.y };
    }
    if (line.kind === 'angle') {
      const len = (point.x - line.origin.x) * line.dir.x + (point.y - line.origin.y) * line.dir.y;
      const q = this.quantize(len, size);
      const l = q > 0 ? q : len; // ne jamais ramener l'extrémité sur l'origine
      return { x: line.origin.x + l * line.dir.x, y: line.origin.y + l * line.dir.y };
    }
    // Mur : coordonnée libre sur la grille absolue pour un mur horizontal / vertical, sinon distance
    // depuis wall.start ; toujours borné au segment.
    const wall = line.wall as Wall;
    let s: number;
    if (Math.abs(line.dir.y) < 1e-9) {
      s = (this.quantize(point.x, size) - wall.start.x) / line.dir.x;
    } else if (Math.abs(line.dir.x) < 1e-9) {
      s = (this.quantize(point.y, size) - wall.start.y) / line.dir.y;
    } else {
      s = this.quantize((point.x - wall.start.x) * line.dir.x + (point.y - wall.start.y) * line.dir.y, size);
    }
    s = Math.max(0, Math.min(this.wallLength(wall), s));
    return { x: wall.start.x + s * line.dir.x, y: wall.start.y + s * line.dir.y };
  }

  private static distanceToSegment(p: Point, a: Point, b: Point): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len2 = dx * dx + dy * dy;
    if (len2 === 0) return this.distance(p, a);
    const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2));
    return this.distance(p, { x: a.x + t * dx, y: a.y + t * dy });
  }
}
