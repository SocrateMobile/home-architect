import { Opening, OpeningType, Point, Room, Wall } from '../core/types';
import { PolygonUtils } from '../core/polygon';
import { CameraBasis, pointDepth, projectPoint, viewerDirection } from './projection';
import { openingVerticalRange } from './opening-symbols';

/**
 * Scène des murs de la vue 3D (module pur, constat F120) : faces verticales extrudées dans l'espace
 * écran (toujours vers le haut, quel que soit l'angle de la caméra), faces arrière éliminées, faces
 * triées de la plus lointaine à la plus proche (algorithme du peintre), puis chapeaux des murs triés de
 * même. Les portes et fenêtres sont reprojetées sur les faces de leur mur, dessinées juste après elles.
 * C'est le rendu de repli de la vue WebGL (src/view3d), qui partage computeWallHeights avec lui.
 */

const DEFAULT_CEILING_HEIGHT = 2.5;
/** Distance (m) au contour d'une pièce, en plus de la demi-épaisseur, sous laquelle un mur borde la pièce. */
const ROOM_WALL_REACH = 0.35;
/** Une arête du contour qui touche l'axe du mur (centre de jonction) est intérieure au massif joint. */
const JOINT_TOLERANCE = 2e-3;
/** Arête considérée parallèle au mur (face longue, qui porte les ouvertures). */
const PARALLEL_TOLERANCE = 0.02;
/** Largeur minimale (m) d'une baie reprojetée sur une face. */
const MIN_PANEL_WIDTH = 0.01;
/** Lumière dans le repère de la caméra : de gauche et de face. */
const LIGHT = { x: -0.55, y: 0.835 };

/**
 * Hauteur (m) de chaque mur : la plus grande hauteur sous plafond des pièces qu'il borde (et sa propre
 * hauteur), sinon sa hauteur, sinon la hauteur par défaut du projet. Calculée seulement en 3D.
 */
export function computeWallHeights(walls: readonly Wall[], rooms: readonly Room[], defaultCeilingHeight?: number): Map<string, number> {
  const defaultH = defaultCeilingHeight && defaultCeilingHeight > 0 ? defaultCeilingHeight : DEFAULT_CEILING_HEIGHT;
  const validRooms = rooms.filter(r => r.polygon && r.polygon.length >= 3);
  const heights = new Map<string, number>();
  for (const wall of walls) {
    const mid = { x: (wall.start.x + wall.end.x) / 2, y: (wall.start.y + wall.end.y) / 2 };
    const reach = wall.thickness / 2 + ROOM_WALL_REACH;
    const adjacent = validRooms.filter(room =>
      PolygonUtils.isPointInPolygon(mid, room.polygon) || PolygonUtils.distanceToBoundary(mid, room.polygon) <= reach
    );
    heights.set(wall.id, adjacent.length > 0
      ? Math.max(...adjacent.map(r => r.height || defaultH), wall.height || 0)
      : (wall.height || defaultH));
  }
  return heights;
}

export interface WallScene3DInput {
  walls: readonly Wall[];
  openings: readonly Opening[];
  /** Contours joints des murs, en mètres (computeWallPolygons). */
  polygons: ReadonlyMap<string, Point[]>;
  /** Hauteur de chaque mur, en mètres. */
  heights: ReadonlyMap<string, number>;
  /** Monde (m) → repère vue (px). */
  toView: (p: Point) => Point;
  /** Pixels par mètre à l'affichage (ppm × zoom). */
  scale: number;
  /** Facteur appliqué aux hauteurs (inférieur à 1 : les pièces restent lisibles derrière les murs). */
  heightScale: number;
  basis: CameraBasis;
  center: Point;
}

export interface OpeningPanel3D {
  openingId: string;
  type: OpeningType;
  points: Point[];
}

export type WallSceneItem =
  | { kind: 'face'; wallId: string; points: Point[]; depth: number; /** Éclairement de −1 à 1. */ shade: number; panels: OpeningPanel3D[] }
  | { kind: 'cap'; wallId: string; points: Point[]; depth: number };

type FaceItem = Extract<WallSceneItem, { kind: 'face' }>;
type CapItem = Extract<WallSceneItem, { kind: 'cap' }>;

function near(a: Point, b: Point, tol: number): boolean {
  return Math.abs(a.x - b.x) <= tol && Math.abs(a.y - b.y) <= tol;
}

function signedArea(poly: readonly Point[]): number {
  let area = 0;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    area += a.x * b.y - b.x * a.y;
  }
  return area / 2;
}

/** Abscisse (m depuis wall.start) de la projection d'un point sur l'axe du mur. */
function alongWall(wall: Wall, dir: Point, p: Point): number {
  return (p.x - wall.start.x) * dir.x + (p.y - wall.start.y) * dir.y;
}

/** Scène triée : faces visibles (de la plus lointaine à la plus proche), puis chapeaux. */
export function buildWallScene(input: WallScene3DInput): WallSceneItem[] {
  const { basis, center, toView, scale, heightScale } = input;
  const viewer = viewerDirection(basis);
  const openingsByWall = new Map<string, Opening[]>();
  for (const op of input.openings) {
    const list = openingsByWall.get(op.wallId);
    if (list) list.push(op);
    else openingsByWall.set(op.wallId, [op]);
  }

  const faces: FaceItem[] = [];
  const caps: CapItem[] = [];
  for (const wall of input.walls) {
    const polygon = input.polygons.get(wall.id);
    if (!polygon || polygon.length < 3) continue;
    const length = Math.hypot(wall.end.x - wall.start.x, wall.end.y - wall.start.y);
    if (!(length > 0)) continue;
    const dir = { x: (wall.end.x - wall.start.x) / length, y: (wall.end.y - wall.start.y) / length };
    const wallHeight = input.heights.get(wall.id) ?? DEFAULT_CEILING_HEIGHT;
    const topPx = wallHeight * heightScale * scale;
    // Contour orienté (aire positive) : la normale sortante d'une arête (dx, dy) est (dy, −dx).
    const poly = signedArea(polygon) < 0 ? [...polygon].reverse() : polygon;
    const views = poly.map(toView);
    const base = views.map(v => projectPoint(v, 0, basis, center));
    const top = views.map(v => projectPoint(v, topPx, basis, center));
    const wallOpenings = openingsByWall.get(wall.id) ?? [];

    for (let i = 0; i < poly.length; i++) {
      const j = (i + 1) % poly.length;
      const a = poly[i];
      const b = poly[j];
      // Arête intérieure au massif joint (elle passe par le centre de la jonction) : jamais visible.
      if ([a, b].some(p => near(p, wall.start, JOINT_TOLERANCE) || near(p, wall.end, JOINT_TOLERANCE))) continue;
      const ex = b.x - a.x;
      const ey = b.y - a.y;
      const edgeLength = Math.hypot(ex, ey);
      if (edgeLength < 1e-6) continue;
      const normal = { x: ey / edgeLength, y: -ex / edgeLength };
      if (normal.x * viewer.x + normal.y * viewer.y <= 0) continue; // face arrière
      // Normale dans le repère de la caméra, puis éclairement.
      const nx = normal.x * basis.cosYaw - normal.y * basis.sinYaw;
      const ny = normal.x * basis.sinYaw + normal.y * basis.cosYaw;
      const shade = Math.max(-1, Math.min(1, nx * LIGHT.x + ny * LIGHT.y));
      const mid = toView({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

      const panels: OpeningPanel3D[] = [];
      if (wallOpenings.length > 0 && Math.abs((ex / edgeLength) * dir.y - (ey / edgeLength) * dir.x) < PARALLEL_TOLERANCE) {
        const ta = alongWall(wall, dir, a);
        const tb = alongWall(wall, dir, b);
        const pointAt = (t: number): Point => {
          const k = (t - ta) / (tb - ta);
          return toView({ x: a.x + ex * k, y: a.y + ey * k });
        };
        for (const op of wallOpenings) {
          const lo = Math.max(op.offset - op.width / 2, Math.min(ta, tb));
          const hi = Math.min(op.offset + op.width / 2, Math.max(ta, tb));
          if (hi - lo < MIN_PANEL_WIDTH) continue;
          const [z0, z1] = openingVerticalRange(op, wallHeight);
          const p0 = pointAt(lo);
          const p1 = pointAt(hi);
          const h0 = z0 * heightScale * scale;
          const h1 = z1 * heightScale * scale;
          panels.push({
            openingId: op.id,
            type: op.type,
            points: [
              projectPoint(p0, h0, basis, center), projectPoint(p1, h0, basis, center),
              projectPoint(p1, h1, basis, center), projectPoint(p0, h1, basis, center)
            ]
          });
        }
      }

      faces.push({
        kind: 'face',
        wallId: wall.id,
        points: [base[i], base[j], top[j], top[i]],
        depth: pointDepth(mid, topPx / 2, basis, center),
        shade,
        panels
      });
    }

    const centroid = poly.reduce((acc, p) => ({ x: acc.x + p.x / poly.length, y: acc.y + p.y / poly.length }), { x: 0, y: 0 });
    caps.push({ kind: 'cap', wallId: wall.id, points: top, depth: pointDepth(toView(centroid), topPx, basis, center) });
  }

  faces.sort((p, q) => p.depth - q.depth);
  caps.sort((p, q) => p.depth - q.depth);
  return [...faces, ...caps];
}
