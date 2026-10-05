import { Point, Room, Wall } from './types';

/** Tolérance (m) pour considérer qu'un point est sur une arête (arêtes partagées entre pièces). */
const BOUNDARY_TOLERANCE = 1e-4;

/** Tolérance (m) d'alignement entre une arête de pièce et l'axe d'un mur. */
const WALL_EDGE_TOLERANCE = 0.02;

/** Précision (m) du pôle d'inaccessibilité utilisé pour placer les étiquettes. */
const LABEL_PRECISION = 0.01;

/**
 * Attraction vers le centroïde pour les étiquettes : milieu du bras d'un L ou d'un U plutôt qu'un
 * angle (< 1, sinon le point glisserait vers un mur).
 */
const LABEL_CENTROID_ATTRACTION = 0.5;

/** Garde-fou : nombre maximal de cellules examinées par le pôle d'inaccessibilité. */
const MAX_POLE_CELLS = 5000;

/**
 * Garde-fou : nombre maximal de cellules initiales sur le grand côté de la boîte englobante. Sans
 * lui, un polygone très allongé (ex. 10 m × 1 µm, issu d'un SVG) créerait des millions de cellules.
 */
const MAX_INITIAL_CELLS_PER_AXIS = 256;

/** Cache des points d'étiquette, indexé par le contenu du polygone (sûr même si le tableau est muté). */
const labelCache = new Map<string, Point>();
const LABEL_CACHE_LIMIT = 512;

/** Croisement de deux arêtes d'un polygone (arête i = sommet i → sommet i+1). */
export interface PolygonSelfIntersection {
  edgeA: number;
  edgeB: number;
  point: Point;
}

/** Surface d'une pièce, à l'axe des murs et à l'intérieur (demi-épaisseur des murs déduite). */
export interface InteriorAreaResult {
  /** Surface intérieure en m² (arrondie au centième), demi-épaisseur des murs posés sur les arêtes déduite. */
  areaM2: number;
  /** Surface du polygone brut (à l'axe des murs) en m², arrondie au centième. */
  axisAreaM2: number;
  /** Nombre d'arêtes du polygone posées sur l'axe d'un mur (0 : aucune déduction possible). */
  matchedEdges: number;
}

interface PoleCell {
  x: number;
  y: number;
  h: number;     // demi-côté de la cellule
  d: number;     // distance signée du centre au contour (positive à l'intérieur)
  score: number; // d − attraction × distance au point d'attraction
  max: number;   // majorant du score atteignable dans la cellule
}

/** File de priorité (tas binaire max sur `max`) pour le pôle d'inaccessibilité. */
class CellQueue {
  private items: PoleCell[] = [];

  get length(): number {
    return this.items.length;
  }

  push(cell: PoleCell): void {
    const items = this.items;
    items.push(cell);
    let i = items.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (items[parent].max >= items[i].max) break;
      [items[parent], items[i]] = [items[i], items[parent]];
      i = parent;
    }
  }

  pop(): PoleCell | undefined {
    const items = this.items;
    const top = items[0];
    const last = items.pop();
    if (items.length > 0 && last) {
      items[0] = last;
      let i = 0;
      for (;;) {
        const left = 2 * i + 1;
        const right = left + 1;
        let largest = i;
        if (left < items.length && items[left].max > items[largest].max) largest = left;
        if (right < items.length && items[right].max > items[largest].max) largest = right;
        if (largest === i) break;
        [items[largest], items[i]] = [items[i], items[largest]];
        i = largest;
      }
    }
    return top;
  }
}

function cross(ax: number, ay: number, bx: number, by: number): number {
  return ax * by - ay * bx;
}

/** Distance du point p au segment [a, b]. */
function distanceToSegment(p: Point, a: Point, b: Point): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.hypot(p.x - a.x, p.y - a.y);
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2));
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}

/** Polygone sans sommets consécutifs confondus (ni dernier sommet égal au premier). */
function withoutDuplicateVertices(polygon: Point[]): Point[] {
  const out: Point[] = [];
  for (const p of polygon) {
    const prev = out[out.length - 1];
    if (!prev || Math.hypot(p.x - prev.x, p.y - prev.y) > 1e-9) out.push(p);
  }
  while (out.length > 1 && Math.hypot(out[0].x - out[out.length - 1].x, out[0].y - out[out.length - 1].y) <= 1e-9) {
    out.pop();
  }
  return out;
}

/**
 * Intersection des segments [p1, p2] et [p3, p4] (contact compris), ou null.
 * Pour deux segments colinéaires qui se recouvrent, renvoie un point du recouvrement.
 */
function segmentIntersection(p1: Point, p2: Point, p3: Point, p4: Point): Point | null {
  const rx = p2.x - p1.x, ry = p2.y - p1.y;
  const sx = p4.x - p3.x, sy = p4.y - p3.y;
  const denom = cross(rx, ry, sx, sy);
  const qpx = p3.x - p1.x, qpy = p3.y - p1.y;
  const eps = 1e-12;
  if (Math.abs(denom) < eps) {
    if (Math.abs(cross(qpx, qpy, rx, ry)) > 1e-9) return null; // parallèles disjoints
    const rr = rx * rx + ry * ry;
    if (rr === 0) return null;
    const t0 = (qpx * rx + qpy * ry) / rr;
    const t1 = t0 + (sx * rx + sy * ry) / rr;
    const lo = Math.max(0, Math.min(t0, t1));
    const hi = Math.min(1, Math.max(t0, t1));
    if (lo > hi + 1e-9) return null;
    return { x: p1.x + lo * rx, y: p1.y + lo * ry };
  }
  const t = cross(qpx, qpy, sx, sy) / denom;
  const u = cross(qpx, qpy, rx, ry) / denom;
  if (t < -1e-9 || t > 1 + 1e-9 || u < -1e-9 || u > 1 + 1e-9) return null;
  return { x: p1.x + t * rx, y: p1.y + t * ry };
}

function round2(v: number): number {
  return Math.round(v * 100) / 100;
}

export class PolygonUtils {
  /**
   * Ray-casting algorithm to test if a 2D point is inside a polygon.
   * Le résultat pour un point situé exactement sur le contour n'est pas défini : voir containsPoint.
   */
  public static isPointInPolygon(point: Point, polygon: Point[]): boolean {
    if (!polygon || polygon.length < 3) return false;

    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x, yi = polygon[i].y;
      const xj = polygon[j].x, yj = polygon[j].y;

      const intersect = ((yi > point.y) !== (yj > point.y))
          && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }

    return inside;
  }

  /** Vrai si le point est sur le contour du polygone (à `tolerance` mètres près). */
  public static isPointOnBoundary(point: Point, polygon: Point[], tolerance: number = BOUNDARY_TOLERANCE): boolean {
    if (!polygon || polygon.length < 2) return false;
    for (let i = 0; i < polygon.length; i++) {
      if (distanceToSegment(point, polygon[i], polygon[(i + 1) % polygon.length]) <= tolerance) return true;
    }
    return false;
  }

  /** Vrai si le point est à l'intérieur du polygone OU sur son contour (règle déterministe aux arêtes). */
  public static containsPoint(point: Point, polygon: Point[], tolerance: number = BOUNDARY_TOLERANCE): boolean {
    if (!polygon || polygon.length < 3) return false;
    return this.isPointOnBoundary(point, polygon, tolerance) || this.isPointInPolygon(point, polygon);
  }

  /**
   * Pièce contenant le point (contour compris). Si plusieurs pièces le contiennent (pièces
   * imbriquées, arête partagée), renvoie celle de plus petite surface ; à surface égale, la
   * première du tableau. Null si aucune.
   */
  public static findRoomContainingPoint(point: Point, rooms: Room[]): Room | null {
    let best: Room | null = null;
    let bestArea = Infinity;
    for (const room of rooms) {
      if (!this.containsPoint(point, room.polygon)) continue;
      const area = Math.abs(this.signedArea(room.polygon));
      if (area < bestArea - 1e-9) {
        best = room;
        bestArea = area;
      }
    }
    return best;
  }

  /** Aire signée par la formule du lacet (le signe dépend du sens de parcours des sommets). */
  public static signedArea(polygon: Point[]): number {
    if (!polygon || polygon.length < 3) return 0;
    let sum = 0;
    for (let i = 0; i < polygon.length; i++) {
      const p = polygon[i];
      const q = polygon[(i + 1) % polygon.length];
      sum += p.x * q.y - q.x * p.y;
    }
    return sum / 2;
  }

  /**
   * Centroïde de surface du polygone (formule du lacet). Pour un polygone dégénéré (aire nulle),
   * renvoie la moyenne des sommets. Peut tomber hors d'une pièce concave : utiliser labelPoint
   * pour placer une étiquette.
   */
  public static calculateCentroid(polygon: Point[]): Point {
    if (!polygon || polygon.length === 0) return { x: 0, y: 0 };
    let sumX = 0, sumY = 0;
    for (const p of polygon) {
      sumX += p.x;
      sumY += p.y;
    }
    const mean = { x: sumX / polygon.length, y: sumY / polygon.length };
    if (polygon.length < 3) return mean;

    // Coordonnées relatives au premier sommet : évite la perte de précision loin de l'origine.
    const ox = polygon[0].x, oy = polygon[0].y;
    let a2 = 0, cx = 0, cy = 0;
    for (let i = 0; i < polygon.length; i++) {
      const px = polygon[i].x - ox, py = polygon[i].y - oy;
      const q = polygon[(i + 1) % polygon.length];
      const qx = q.x - ox, qy = q.y - oy;
      const f = px * qy - qx * py;
      a2 += f;
      cx += (px + qx) * f;
      cy += (py + qy) * f;
    }
    if (Math.abs(a2) < 1e-12) return mean;
    return { x: ox + cx / (3 * a2), y: oy + cy / (3 * a2) };
  }

  /** Distance (≥ 0) du point au contour du polygone. */
  public static distanceToBoundary(point: Point, polygon: Point[]): number {
    if (!polygon || polygon.length === 0) return Infinity;
    if (polygon.length === 1) return Math.hypot(point.x - polygon[0].x, point.y - polygon[0].y);
    let min = Infinity;
    for (let i = 0; i < polygon.length; i++) {
      min = Math.min(min, distanceToSegment(point, polygon[i], polygon[(i + 1) % polygon.length]));
    }
    return min;
  }

  /**
   * Pôle d'inaccessibilité : point intérieur le plus éloigné du contour (algorithme « polylabel »
   * par subdivision de cellules), à `precision` mètres près. `distance` = distance au contour.
   */
  public static poleOfInaccessibility(polygon: Point[], precision: number = LABEL_PRECISION): { point: Point; distance: number } {
    return this.searchInteriorPoint(polygon, precision, 0);
  }

  /**
   * Recherche par subdivision de cellules (« polylabel ») du point intérieur maximisant
   * d − attraction × distance(centroïde) : attraction 0 = pôle d'inaccessibilité. Le majorant
   * d'une cellule de demi-côté h reste valable : d ≤ d(c) + h√2 et distance ≥ distance(c) − h√2.
   */
  private static searchInteriorPoint(polygon: Point[], precision: number, attraction: number): { point: Point; distance: number } {
    const poly = withoutDuplicateVertices(polygon || []);
    if (poly.length < 3) return { point: this.calculateCentroid(poly), distance: 0 };

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of poly) {
      minX = Math.min(minX, p.x); minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y);
    }
    const width = maxX - minX;
    const height = maxY - minY;
    if (!(width > 0 && height > 0) || Math.abs(this.signedArea(poly)) < 1e-12) {
      return { point: this.calculateCentroid(poly), distance: 0 };
    }
    // Côté des cellules initiales : le petit côté, mais jamais sous la précision ni au point de
    // dépasser MAX_INITIAL_CELLS_PER_AXIS cellules sur le grand côté (polygone en lame).
    const cellSize = Math.max(Math.min(width, height), precision, Math.max(width, height) / MAX_INITIAL_CELLS_PER_AXIS);

    const eps = Math.max(precision, cellSize * 1e-6);
    const c = this.calculateCentroid(poly);
    const makeCell = (x: number, y: number, h: number): PoleCell => {
      const p = { x, y };
      const dist = this.distanceToBoundary(p, poly);
      const d = this.isPointInPolygon(p, poly) ? dist : -dist;
      const score = d - attraction * Math.hypot(x - c.x, y - c.y);
      return { x, y, h, d, score, max: score + h * Math.SQRT2 * (1 + attraction) };
    };

    const queue = new CellQueue();
    const h0 = cellSize / 2;
    // Compteurs entiers : `x += cellSize` ne progresserait plus avec de très grandes coordonnées.
    const nx = Math.ceil(width / cellSize);
    const ny = Math.ceil(height / cellSize);
    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < ny; j++) {
        queue.push(makeCell(minX + i * cellSize + h0, minY + j * cellSize + h0, h0));
      }
    }

    // Candidats initiaux : centroïde de surface, puis centre de la boîte englobante.
    let best = makeCell(c.x, c.y, 0);
    const bboxCell = makeCell(minX + width / 2, minY + height / 2, 0);
    if (bboxCell.score > best.score) best = bboxCell;

    let processed = 0;
    while (queue.length > 0 && processed < MAX_POLE_CELLS) {
      const cell = queue.pop() as PoleCell;
      processed++;
      if (cell.score > best.score) best = cell;
      if (cell.max - best.score <= eps) continue;
      const h = cell.h / 2;
      queue.push(makeCell(cell.x - h, cell.y - h, h));
      queue.push(makeCell(cell.x + h, cell.y - h, h));
      queue.push(makeCell(cell.x - h, cell.y + h, h));
      queue.push(makeCell(cell.x + h, cell.y + h, h));
    }

    return { point: { x: best.x, y: best.y }, distance: Math.max(0, best.d) };
  }

  /**
   * Point d'ancrage d'une étiquette : le centroïde de surface s'il est à l'intérieur et
   * suffisamment éloigné du contour (au moins la moitié du dégagement maximal), sinon le point
   * de plus grand dégagement, départagé vers le centroïde (milieu du bras d'un L ou d'un U plutôt
   * qu'un angle). Toujours à l'intérieur d'un polygone simple.
   */
  public static labelPoint(polygon: Point[]): Point {
    if (!polygon || polygon.length < 3) return this.calculateCentroid(polygon);
    const key = polygon.map(p => `${p.x},${p.y}`).join(';');
    const cached = labelCache.get(key);
    if (cached) return { ...cached };

    const centroid = this.calculateCentroid(polygon);
    const pole = this.poleOfInaccessibility(polygon);
    const centroidClearance = this.isPointInPolygon(centroid, polygon) ? this.distanceToBoundary(centroid, polygon) : -1;
    let result = centroidClearance >= pole.distance * 0.5
      ? centroid
      : this.searchInteriorPoint(polygon, LABEL_PRECISION, LABEL_CENTROID_ATTRACTION).point;
    // Garde-fou (recherche interrompue par MAX_POLE_CELLS) : jamais hors de la pièce si le pôle y est.
    if (!this.isPointInPolygon(result, polygon) && this.isPointInPolygon(pole.point, polygon)) result = pole.point;

    if (labelCache.size >= LABEL_CACHE_LIMIT) labelCache.clear();
    labelCache.set(key, result);
    return { ...result };
  }

  /**
   * Computes the geometric area (in m²) of a polygon using the Shoelace formula.
   * Fausse pour un polygone qui se recoupe (les lobes de sens opposés s'annulent) :
   * le détecter avec isSelfIntersecting.
   */
  public static computeArea(polygon: Point[]): number {
    return round2(Math.abs(this.signedArea(polygon)));
  }

  /**
   * Croisements entre arêtes du polygone (« nœud papillon », arête qui revient sur la précédente…).
   * Les arêtes voisines ne sont signalées que si elles se superposent (aller-retour).
   */
  public static findSelfIntersections(polygon: Point[]): PolygonSelfIntersection[] {
    const poly = withoutDuplicateVertices(polygon || []);
    const n = poly.length;
    const found: PolygonSelfIntersection[] = [];
    if (n < 3) return found;

    for (let i = 0; i < n; i++) {
      const a1 = poly[i];
      const a2 = poly[(i + 1) % n];
      for (let j = i + 1; j < n; j++) {
        const b1 = poly[j];
        const b2 = poly[(j + 1) % n];
        const adjacent = j === i + 1 || (i === 0 && j === n - 1);
        if (adjacent) {
          // Arêtes consécutives : seul un aller-retour (colinéaires, sens opposés) est un défaut.
          const shared = j === i + 1 ? a2 : a1;
          const u = j === i + 1 ? { x: a1.x - shared.x, y: a1.y - shared.y } : { x: a2.x - shared.x, y: a2.y - shared.y };
          const v = j === i + 1 ? { x: b2.x - shared.x, y: b2.y - shared.y } : { x: b1.x - shared.x, y: b1.y - shared.y };
          const lu = Math.hypot(u.x, u.y), lv = Math.hypot(v.x, v.y);
          if (lu > 0 && lv > 0 && Math.abs(cross(u.x, u.y, v.x, v.y)) / (lu * lv) < 1e-9 && u.x * v.x + u.y * v.y > 0) {
            found.push({ edgeA: i, edgeB: j, point: { ...shared } });
          }
          continue;
        }
        const p = segmentIntersection(a1, a2, b1, b2);
        if (p) found.push({ edgeA: i, edgeB: j, point: p });
      }
    }
    return found;
  }

  /** Vrai si deux arêtes du polygone se croisent ou se superposent (polygone non simple). */
  public static isSelfIntersecting(polygon: Point[]): boolean {
    return this.findSelfIntersections(polygon).length > 0;
  }

  /**
   * Décale chaque arête du polygone vers l'intérieur de `distances` mètres (une valeur pour
   * toutes les arêtes, ou une par arête i = sommet i → sommet i+1 ; négatif = vers l'extérieur),
   * avec des angles vifs. Renvoie null si le résultat n'est pas exploitable (décalage plus grand
   * que la pièce, polygone qui se recoupe, polygone dégénéré).
   */
  public static offsetPolygon(polygon: Point[], distances: number | number[]): Point[] | null {
    if (!polygon || polygon.length < 3) return null;
    // Retire les sommets confondus en conservant la distance de l'arête sortante de chaque sommet gardé.
    const pts: Point[] = [];
    const dist: number[] = [];
    const n0 = polygon.length;
    for (let i = 0; i < n0; i++) {
      const p = polygon[i];
      const q = polygon[(i + 1) % n0];
      if (Math.hypot(q.x - p.x, q.y - p.y) <= 1e-9) continue;
      const d = Array.isArray(distances) ? distances[i] : distances;
      if (!Number.isFinite(d)) return null;
      pts.push(p);
      dist.push(d);
    }
    const n = pts.length;
    if (n < 3) return null;
    const area = this.signedArea(pts);
    if (Math.abs(area) < 1e-12) return null;
    const sign = area > 0 ? 1 : -1; // normale intérieure = normale gauche si l'aire est positive

    // Droites décalées : point d'appui et direction unitaire de chaque arête.
    const lines = pts.map((p, i) => {
      const q = pts[(i + 1) % n];
      const len = Math.hypot(q.x - p.x, q.y - p.y);
      const ux = (q.x - p.x) / len, uy = (q.y - p.y) / len;
      const nx = -uy * sign, ny = ux * sign;
      return { px: p.x + nx * dist[i], py: p.y + ny * dist[i], ux, uy, nx, ny };
    });

    // Sommets décalés de chaque sommet d'origine (deux en cas de décrochement entre arêtes colinéaires).
    const corners: Point[][] = [];
    for (let i = 0; i < n; i++) {
      const prev = lines[(i - 1 + n) % n];
      const cur = lines[i];
      const denom = cross(prev.ux, prev.uy, cur.ux, cur.uy);
      if (Math.abs(denom) < 1e-9) {
        const p = pts[i];
        const dPrev = dist[(i - 1 + n) % n];
        const corner = [{ x: p.x + prev.nx * dPrev, y: p.y + prev.ny * dPrev }];
        if (Math.abs(dPrev - dist[i]) > 1e-9) corner.push({ x: p.x + cur.nx * dist[i], y: p.y + cur.ny * dist[i] });
        corners.push(corner);
        continue;
      }
      const t = cross(cur.px - prev.px, cur.py - prev.py, cur.ux, cur.uy) / denom;
      corners.push([{ x: prev.px + t * prev.ux, y: prev.py + t * prev.uy }]);
    }

    // Une arête décalée qui change de sens signale un décalage plus grand que la pièce (polygone
    // retourné, dont l'orientation peut pourtant être conservée).
    for (let i = 0; i < n; i++) {
      const from = corners[i][corners[i].length - 1];
      const to = corners[(i + 1) % n][0];
      if ((to.x - from.x) * lines[i].ux + (to.y - from.y) * lines[i].uy < -1e-9) return null;
    }

    const out = corners.flat();
    const newArea = this.signedArea(out);
    const inward = dist.every(d => d >= 0);
    if (Math.sign(newArea) !== sign || Math.abs(newArea) < 1e-9) return null;
    if (inward && Math.abs(newArea) > Math.abs(area) + 1e-9) return null;
    if (this.isSelfIntersecting(out)) return null;
    return out;
  }

  /**
   * Surface intérieure d'une pièce : chaque arête posée sur l'axe d'un mur (colinéaire à 2 cm près
   * et recouverte au moins à moitié) est décalée vers l'intérieur de la demi-épaisseur du plus
   * épais de ces murs. Les autres arêtes ne sont pas décalées. Si aucune arête n'est sur un mur
   * (ou si le décalage échoue), areaM2 vaut la surface à l'axe et matchedEdges 0.
   */
  public static computeInteriorArea(polygon: Point[], walls: Wall[]): InteriorAreaResult {
    const axisAreaM2 = this.computeArea(polygon);
    const fallback: InteriorAreaResult = { areaM2: axisAreaM2, axisAreaM2, matchedEdges: 0 };
    if (!polygon || polygon.length < 3 || !walls || walls.length === 0) return fallback;

    const n = polygon.length;
    const offsets: number[] = [];
    let matchedEdges = 0;
    for (let i = 0; i < n; i++) {
      const a = polygon[i];
      const b = polygon[(i + 1) % n];
      const edgeLen = Math.hypot(b.x - a.x, b.y - a.y);
      let covered = 0;
      let halfThickness = 0;
      if (edgeLen > 1e-9) {
        for (const wall of walls) {
          const wx = wall.end.x - wall.start.x, wy = wall.end.y - wall.start.y;
          const wallLen = Math.hypot(wx, wy);
          if (wallLen < 1e-9) continue;
          const ux = wx / wallLen, uy = wy / wallLen;
          // Les deux extrémités de l'arête doivent être sur la droite portant l'axe du mur.
          const da = Math.abs(cross(ux, uy, a.x - wall.start.x, a.y - wall.start.y));
          const db = Math.abs(cross(ux, uy, b.x - wall.start.x, b.y - wall.start.y));
          if (da > WALL_EDGE_TOLERANCE || db > WALL_EDGE_TOLERANCE) continue;
          const ta = ux * (a.x - wall.start.x) + uy * (a.y - wall.start.y);
          const tb = ux * (b.x - wall.start.x) + uy * (b.y - wall.start.y);
          const overlap = Math.min(Math.max(ta, tb), wallLen) - Math.max(Math.min(ta, tb), 0);
          if (overlap <= WALL_EDGE_TOLERANCE) continue;
          covered += overlap;
          halfThickness = Math.max(halfThickness, (wall.thickness || 0) / 2);
        }
      }
      const matched = covered >= edgeLen * 0.5 && halfThickness > 0;
      if (matched) matchedEdges++;
      offsets.push(matched ? halfThickness : 0);
    }

    if (matchedEdges === 0) return fallback;
    const inner = this.offsetPolygon(polygon, offsets);
    if (!inner) return fallback;
    return { areaM2: this.computeArea(inner), axisAreaM2, matchedEdges };
  }
}
