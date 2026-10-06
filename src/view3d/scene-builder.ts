import { EntityBinding, FurnitureItem, HomeArchitectProject, Opening, OpeningType, Point, Room, Wall } from '../core/types';
import { PolygonUtils } from '../core/polygon';
import { computeWallPolygons } from '../core/svg-exporter';
import { entityDomain } from '../core/project-model';
import { computeWallHeights } from '../canvas/scene-3d';
import { openingVerticalRange, windowSashes } from '../canvas/opening-symbols';
import { HassDisplayContext, HassEntityState, TemperatureReading, roomAppearance, toFiniteNumber } from '../canvas/entity-display';
import { Rgba, kelvinToRgb, mixRgb, parseCssColor, rgba, scaleRgb } from './colors';
import { FurnitureRole, furnitureShape } from './furniture3d';

/**
 * Modèle de la vue 3D (module PUR, sans three ni DOM, testé par tests/frontend/view3d-scene.test.ts).
 *
 * Le projet est traduit en descripteurs géométriques en mètres, dans le repère du plan (x vers la
 * droite, y vers le bas, z = hauteur) : la scène three les place en (x, z, y). Toute la géométrie est
 * faite de prismes verticaux (contour au sol extrudé entre deux hauteurs) :
 *  - murs : contours joints aux angles (computeWallPolygons, comme le 2D), découpés le long de leur axe
 *    autour des portes et fenêtres (allège sous la baie, linteau au-dessus) ;
 *  - ouvertures : cadre fixe et parties mobiles (battants pivotants, panneaux coulissants) ;
 *  - sols des pièces, meubles (furniture3d), niveau fantôme.
 * L'état de Home Assistant (lumières, heatmap, ouvertures liées) est calculé à part (dynamicState) :
 * il ne reconstruit jamais la géométrie.
 */

const DEFAULT_CEILING = 2.5;
/** Hauteur (m) des marqueurs d'entités au-dessus du sol. */
export const MARKER_HEIGHT = 1.2;
/** Distance (m) des lampes sous le plafond. */
const LIGHT_DROP = 0.35;
/** Hauteur (m) des étiquettes de pièces au-dessus de l'arase des murs. */
const LABEL_CLEARANCE = 0.1;
/** Largeur (m) des montants et de la traverse du cadre d'une baie. */
const FRAME = 0.05;
/** Débord (m) du cadre de chaque côté du mur, et de l'appui de fenêtre côté extérieur. */
const FRAME_LIP = 0.01;
const SILL_LIP = 0.03;
const DOOR_LEAF = 0.04;
/** Section (m) des montants d'un ouvrant vitré, épaisseur du vitrage. */
const SASH = 0.045;
const SASH_DEPTH = 0.05;
const GLASS = 0.008;
/** Hauteur (m) de la poignée de porte. */
const HANDLE_HEIGHT = 1.0;
/** Ouverture d'un battant lié à un capteur ouvert (fraction du quart de tour) : porte, fenêtre. */
const DOOR_SWING = 0.9;
const WINDOW_SWING = 0.6;
/** Plus petite tranche (m) de mur conservée entre deux découpes. */
const MIN_PIECE = 0.005;

/** Matière d'une face : murs, cadres et battants, ou matière de meuble. */
export type SurfaceRole = 'wall' | 'wall-top' | 'frame' | 'door' | FurnitureRole;

/** Prisme vertical : contour au sol (m) extrudé de `bottom` à `top` (m). */
export interface Prism {
  polygon: Point[];
  bottom: number;
  top: number;
  role: SurfaceRole;
  /** Matière de la face supérieure (défaut : role) : arase des murs. */
  topRole?: SurfaceRole;
  /** Couleur propre (meuble coloré), prioritaire sur celle du rôle. */
  color?: Rgba;
}

export interface WallModel {
  wallId: string;
  /** Hauteur affichée (m) : hauteur du mur, ou mi-hauteur si les murs sont coupés. */
  height: number;
  prisms: Prism[];
}

/**
 * Partie mobile d'une ouverture, décrite dans son propre repère (x le long du battant depuis la
 * charnière, y en travers) : la scène la place sur `pivot`, orientée selon `angle` (fermée), puis la
 * fait pivoter de `swing` ou glisser de `slide` quand l'entité liée est ouverte.
 */
export interface LeafModel {
  pivot: Point;
  /** Direction du battant fermé (rad, repère du plan). */
  angle: number;
  /** Rotation (rad, signée) du battant ouvert. */
  swing: number;
  /** Translation (m) d'un panneau coulissant ouvert, dans la direction `angle`. */
  slide: number;
  parts: Prism[];
}

export interface OpeningModel {
  openingId: string;
  wallId: string;
  type: OpeningType;
  entityId?: string;
  /** Hauteurs (m) de la baie dans le mur (bornées à la hauteur affichée). */
  bottom: number;
  top: number;
  /** Cadre (montants, traverse, appui), en coordonnées du plan. */
  frame: Prism[];
  leaves: LeafModel[];
}

export interface FloorModel {
  roomId: string;
  polygon: Point[];
  /** Couleur de la pièce (room.color), null : couleur de sol par défaut. */
  color: Rgba | null;
}

export interface RoomLabelModel {
  roomId: string;
  /** Point d'étiquette (toujours à l'intérieur de la pièce). */
  position: Point;
  /** Hauteur (m) : juste au-dessus des murs de la pièce, pour ne pas masquer le mobilier. */
  height: number;
  name: string;
  areaM2: number;
}

export interface FurnitureModel {
  itemId: string;
  prisms: Prism[];
}

export interface PlanBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export interface SceneModel {
  walls: WallModel[];
  openings: OpeningModel[];
  floors: FloorModel[];
  labels: RoomLabelModel[];
  furniture: FurnitureModel[];
  /** Murs du niveau fantôme (sous le plan), et leur hauteur. */
  ghost: { prisms: Prism[]; height: number } | null;
  /** Emprise du contenu (m), null pour un plan vide. */
  bounds: PlanBounds | null;
  /** Plus grande hauteur (m) de la scène. */
  maxHeight: number;
}

export interface SceneOptions {
  /** Murs coupés à mi-hauteur pour voir l'intérieur. */
  cutWalls: boolean;
}

export interface MarkerModel {
  bindingId: string;
  entityId: string;
  position: Point;
}

// ------------------------------------------------------------------
// Géométrie
// ------------------------------------------------------------------

function ceilingOf(project: Pick<HomeArchitectProject, 'defaultCeilingHeight'>): number {
  const h = project.defaultCeilingHeight;
  return typeof h === 'number' && Number.isFinite(h) && h > 0 ? h : DEFAULT_CEILING;
}

/** Partie du polygone où (p − origin)·dir ≤ limit (keepBelow) ou ≥ limit (Sutherland–Hodgman). */
function clipHalfPlane(poly: readonly Point[], origin: Point, dir: Point, limit: number, keepBelow: boolean): Point[] {
  const side = (p: Point) => {
    const t = (p.x - origin.x) * dir.x + (p.y - origin.y) * dir.y - limit;
    return keepBelow ? -t : t;
  };
  const out: Point[] = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const sa = side(a);
    const sb = side(b);
    if (sa >= 0) out.push(a);
    if ((sa >= 0) !== (sb >= 0)) {
      const k = sa / (sa - sb);
      out.push({ x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k });
    }
  }
  return out;
}

/** Tranche [lo, hi] (abscisses le long de l'axe du mur) du contour joint d'un mur. */
function slab(poly: readonly Point[], origin: Point, dir: Point, lo: number, hi: number): Point[] {
  return clipHalfPlane(clipHalfPlane(poly, origin, dir, lo, false), origin, dir, hi, true);
}

/** Découpe d'une baie dans un mur : abscisses le long de l'axe et hauteurs. */
interface OpeningCut {
  lo: number;
  hi: number;
  bottom: number;
  top: number;
}

/**
 * Prismes d'un mur percé de baies : tranches pleines sur toute la hauteur entre les baies, et sous
 * chaque baie l'allège, au-dessus le linteau. Les faces des tranches pleines forment les tableaux.
 */
export function wallPrisms(wall: Wall, polygon: readonly Point[], height: number, cuts: readonly OpeningCut[]): Prism[] {
  const full = (poly: Point[], bottom: number, top: number): Prism => ({
    polygon: poly, bottom, top, role: 'wall', topRole: top >= height - 1e-6 ? 'wall-top' : undefined
  });
  const length = Math.hypot(wall.end.x - wall.start.x, wall.end.y - wall.start.y);
  if (cuts.length === 0 || !(length > 0)) return [full([...polygon], 0, height)];

  const dir = { x: (wall.end.x - wall.start.x) / length, y: (wall.end.y - wall.start.y) / length };
  const along = polygon.map(p => (p.x - wall.start.x) * dir.x + (p.y - wall.start.y) * dir.y);
  const tMin = Math.min(...along);
  const tMax = Math.max(...along);
  const prisms: Prism[] = [];
  const piece = (lo: number, hi: number, bottom: number, top: number) => {
    if (hi - lo < MIN_PIECE || top - bottom < 1e-4) return;
    const poly = slab(polygon, wall.start, dir, lo, hi);
    if (poly.length >= 3) prisms.push(full(poly, bottom, top));
  };

  let cursor = tMin;
  for (const cut of [...cuts].sort((a, b) => a.lo - b.lo)) {
    const lo = Math.max(cut.lo, cursor);
    const hi = Math.min(cut.hi, tMax);
    if (hi - lo < MIN_PIECE) continue;
    piece(cursor, lo, 0, height);
    piece(lo, hi, 0, cut.bottom);
    piece(lo, hi, cut.top, height);
    cursor = hi;
  }
  piece(cursor, tMax, 0, height);
  return prisms;
}

/** Repère local d'une baie : origine au centre de la baie sur l'axe du mur, u le long du mur, n en travers. */
interface OpeningFrame {
  origin: Point;
  u: Point;
  n: Point;
  angle: number;
}

function toPlan(f: OpeningFrame, x: number, y: number): Point {
  return { x: f.origin.x + f.u.x * x + f.n.x * y, y: f.origin.y + f.u.y * x + f.n.y * y };
}

/** Rectangle [x0, x1] × [y0, y1] d'un repère local, en contour du plan (ou local si `f` est null). */
function rect(f: OpeningFrame | null, x0: number, y0: number, x1: number, y1: number): Point[] {
  const corners: Array<[number, number]> = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
  return corners.map(([x, y]) => (f ? toPlan(f, x, y) : { x, y }));
}

function prism(polygon: Point[], bottom: number, top: number, role: SurfaceRole): Prism | null {
  return top - bottom > 1e-4 ? { polygon, bottom, top, role } : null;
}

function compact(prisms: Array<Prism | null>): Prism[] {
  return prisms.filter((p): p is Prism => p !== null);
}

/** Ouvrant vitré de longueur `len` (repère du battant) : montants, traverses et vitrage. */
function sashParts(len: number, bottom: number, top: number): Prism[] {
  const s = Math.min(SASH, len / 4, (top - bottom) / 4);
  const d = SASH_DEPTH / 2;
  return compact([
    prism(rect(null, 0, -d, len, d), bottom, bottom + s, 'frame'),
    prism(rect(null, 0, -d, len, d), top - s, top, 'frame'),
    prism(rect(null, 0, -d, s, d), bottom + s, top - s, 'frame'),
    prism(rect(null, len - s, -d, len, d), bottom + s, top - s, 'frame'),
    prism(rect(null, s, -GLASS / 2, len - s, GLASS / 2), bottom + s, top - s, 'glass')
  ]);
}

/** Vantail de porte (repère du battant) et sa poignée de chaque côté. */
function doorParts(len: number, bottom: number, top: number): Prism[] {
  const t = DOOR_LEAF / 2;
  const handle = HANDLE_HEIGHT < top - 0.1 && len > 0.3
    ? [-1, 1].map(side => prism(rect(null, len - 0.16, side * t, len - 0.06, side * (t + 0.05)), HANDLE_HEIGHT - 0.015, HANDLE_HEIGHT + 0.015, 'metal'))
    : [];
  return compact([prism(rect(null, 0.004, -t, len - 0.004, t), bottom + 0.004, top, 'door'), ...handle]);
}

/** Direction (rad) du vecteur d. */
function angleOf(d: Point): number {
  return Math.atan2(d.y, d.x);
}

/**
 * Battant pivotant de `len` mètres, charnière en x = `hingeX` (repère de la baie), fermé vers `toward`
 * (±1 le long du mur), ouvert du côté `side` (±1 en travers), décalé de `y` en travers du mur.
 */
function swingLeaf(f: OpeningFrame, hingeX: number, y: number, toward: 1 | -1, side: 1 | -1, fraction: number, parts: Prism[]): LeafModel {
  const closed = toward > 0 ? f.angle : f.angle + Math.PI;
  // De la direction fermée (±u) à la direction ouverte (side·n) : quart de tour signé.
  const cross = (toward > 0 ? 1 : -1) * side;
  return { pivot: toPlan(f, hingeX, y), angle: closed, swing: cross * (Math.PI / 2) * fraction, slide: 0, parts };
}

/** Ouverture : cadre, battants ou panneaux selon le type (mêmes conventions de sens que le symbole 2D). */
function buildOpening(op: Opening, wall: Wall, fullHeight: number, shownHeight: number): OpeningModel | null {
  const length = Math.hypot(wall.end.x - wall.start.x, wall.end.y - wall.start.y);
  const width = Math.max(0, op.width);
  if (!(length > 0) || width < 0.1) return null;
  const u = { x: (wall.end.x - wall.start.x) / length, y: (wall.end.y - wall.start.y) / length };
  const f: OpeningFrame = {
    origin: { x: wall.start.x + u.x * op.offset, y: wall.start.y + u.y * op.offset },
    u,
    n: { x: -u.y, y: u.x },
    angle: angleOf(u)
  };
  const [z0, z1] = openingVerticalRange(op, fullHeight);
  if (z0 >= shownHeight - 0.02) return null; // baie entièrement au-dessus de la coupe
  const top = Math.min(z1, shownHeight);
  const hasHead = z1 <= shownHeight;
  const half = width / 2;
  const fw = Math.min(FRAME, width / 4);
  const ht = Math.max(0, wall.thickness) / 2 + FRAME_LIP;
  const isWindow = op.type === 'window';
  const innerBottom = isWindow ? z0 + fw : z0;
  const innerTop = hasHead ? top - fw : top;
  const innerW = width - fw * 2;
  const side: 1 | -1 = op.flipSide ? -1 : 1;

  const frame = compact([
    prism(rect(f, -half, -ht, -half + fw, ht), z0, top, 'frame'),
    prism(rect(f, half - fw, -ht, half, ht), z0, top, 'frame'),
    hasHead ? prism(rect(f, -half + fw, -ht, half - fw, ht), top - fw, top, 'frame') : null,
    // Appui de fenêtre, débordant côté extérieur (opposé au côté d'ouverture)
    isWindow ? prism(rect(f, -half, side > 0 ? -ht - SILL_LIP : -ht, half, side > 0 ? ht : ht + SILL_LIP), z0, z0 + fw, 'frame') : null
  ]);

  const leaves: LeafModel[] = [];
  if (innerTop - innerBottom > 0.05 && innerW > 0.05) {
    switch (op.type) {
      case 'door': {
        const toward: 1 | -1 = op.flipDirection ? -1 : 1;
        const leafY = side * Math.max(0, ht - FRAME_LIP - DOOR_LEAF / 2 - 0.005);
        leaves.push(swingLeaf(f, -toward * (half - fw), leafY, toward, side, DOOR_SWING, doorParts(innerW, innerBottom, innerTop)));
        break;
      }
      case 'double_door': {
        const leafY = side * Math.max(0, ht - FRAME_LIP - DOOR_LEAF / 2 - 0.005);
        const parts = doorParts(innerW / 2, innerBottom, innerTop);
        leaves.push(
          swingLeaf(f, -(half - fw), leafY, 1, side, DOOR_SWING, parts),
          swingLeaf(f, half - fw, leafY, -1, side, DOOR_SWING, parts)
        );
        break;
      }
      case 'sliding_door': {
        // Deux panneaux vitrés décalés en travers du mur ; le premier glisse devant le second.
        const panel = innerW * 0.55;
        const offset = Math.min(SASH_DEPTH, ht);
        const parts = sashParts(panel, innerBottom, innerTop);
        leaves.push(
          { pivot: toPlan(f, -half + fw, -offset / 2), angle: f.angle, swing: 0, slide: innerW - panel, parts },
          { pivot: toPlan(f, half - fw - panel, offset / 2), angle: f.angle, swing: 0, slide: 0, parts }
        );
        break;
      }
      default: {
        // Fenêtre (allège) ou porte-fenêtre (depuis le sol) : un ou deux ouvrants vitrés à la française.
        const sashes = isWindow ? windowSashes(op) : (op.sashCount === 1 ? 1 : 2);
        if (sashes === 2) {
          const parts = sashParts(innerW / 2, innerBottom, innerTop);
          leaves.push(
            swingLeaf(f, -(half - fw), 0, 1, side, WINDOW_SWING, parts),
            swingLeaf(f, half - fw, 0, -1, side, WINDOW_SWING, parts)
          );
        } else {
          const toward: 1 | -1 = op.flipDirection ? -1 : 1;
          leaves.push(swingLeaf(f, -toward * (half - fw), 0, toward, side, WINDOW_SWING, sashParts(innerW, innerBottom, innerTop)));
        }
        break;
      }
    }
  }

  const model: OpeningModel = { openingId: op.id, wallId: wall.id, type: op.type, bottom: z0, top, frame, leaves };
  if (op.entityId) model.entityId = op.entityId;
  return model;
}

/** Contour d'une partie de meuble dans le plan : rectangle, ou octogone inscrit pour une section ronde. */
function furniturePartPolygon(x0: number, y0: number, x1: number, y1: number, round: boolean): Point[] {
  if (!round) return rect(null, x0, y0, x1, y1);
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const rx = (x1 - x0) / 2;
  const ry = (y1 - y0) / 2;
  return Array.from({ length: 8 }, (_, i) => {
    const a = ((i + 0.5) * Math.PI) / 4;
    return { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
  });
}

/** Meuble : volumes du modèle tournés (même convention que rotate() du SVG) et placés sur sa position. */
export function furnitureModel(item: FurnitureItem): FurnitureModel {
  const shape = furnitureShape(item);
  const rad = (((item.rotation || 0) % 360) * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const place = (p: Point): Point => ({ x: item.position.x + p.x * cos - p.y * sin, y: item.position.y + p.x * sin + p.y * cos });
  const color = parseCssColor(item.color);
  return {
    itemId: item.id,
    prisms: shape.parts.map(part => {
      const isBody = part.role === 'body';
      const out: Prism = {
        polygon: furniturePartPolygon(part.x0, part.y0, part.x1, part.y1, part.round === true).map(place),
        bottom: part.z0,
        top: part.z1,
        role: isBody ? shape.bodyRole : part.role
      };
      // Couleur propre du meuble (opaque) sur ses parties principales.
      if (isBody && color) out.color = { ...color, a: 1 };
      return out;
    })
  };
}

function boundsOf(points: Iterable<Point>): PlanBounds | null {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of points) {
    if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) continue;
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);
  }
  return minX <= maxX ? { minX, minY, maxX, maxY } : null;
}

function validRooms(rooms: readonly Room[]): Room[] {
  return rooms.filter(r => Array.isArray(r.polygon) && r.polygon.length >= 3);
}

/** Murs pleins (sans baies) d'un niveau, pour le fantôme. */
function plainWalls(project: Pick<HomeArchitectProject, 'walls' | 'rooms' | 'defaultCeilingHeight'>): { prisms: Prism[]; height: number } {
  const polygons = computeWallPolygons(project.walls);
  const heights = computeWallHeights(project.walls, project.rooms, project.defaultCeilingHeight);
  const prisms: Prism[] = [];
  let height = 0;
  for (const wall of project.walls) {
    const polygon = polygons.get(wall.id);
    if (!polygon) continue;
    const h = heights.get(wall.id) ?? ceilingOf(project);
    height = Math.max(height, h);
    prisms.push({ polygon, bottom: 0, top: h, role: 'wall' });
  }
  return { prisms, height: height || ceilingOf(project) };
}

/**
 * Scène statique du projet : tout ce qui ne dépend que de la géométrie (reconstruite seulement quand
 * sceneSignature change). Le niveau fantôme (`ghost`) est le niveau affiché en filigrane sous le plan.
 */
export function buildSceneModel(
  project: HomeArchitectProject,
  ghost: HomeArchitectProject | null | undefined,
  options: SceneOptions
): SceneModel {
  const polygons = computeWallPolygons(project.walls);
  const heights = computeWallHeights(project.walls, project.rooms, project.defaultCeilingHeight);
  const wallsById = new Map(project.walls.map(w => [w.id, w]));
  const openingsByWall = new Map<string, Opening[]>();
  for (const op of project.openings) {
    if (!wallsById.has(op.wallId)) continue;
    const list = openingsByWall.get(op.wallId);
    if (list) list.push(op);
    else openingsByWall.set(op.wallId, [op]);
  }

  const walls: WallModel[] = [];
  const openings: OpeningModel[] = [];
  let maxHeight = 0;
  for (const wall of project.walls) {
    const polygon = polygons.get(wall.id);
    if (!polygon) continue;
    const fullHeight = heights.get(wall.id) ?? ceilingOf(project);
    const height = options.cutWalls ? fullHeight / 2 : fullHeight;
    maxHeight = Math.max(maxHeight, height);
    const cuts: OpeningCut[] = [];
    for (const op of openingsByWall.get(wall.id) ?? []) {
      const model = buildOpening(op, wall, fullHeight, height);
      if (!model) continue;
      openings.push(model);
      cuts.push({ lo: op.offset - op.width / 2, hi: op.offset + op.width / 2, bottom: model.bottom, top: model.top });
    }
    walls.push({ wallId: wall.id, height, prisms: wallPrisms(wall, polygon, height, cuts) });
  }

  const rooms = validRooms(project.rooms);
  const floors: FloorModel[] = rooms.map(room => ({ roomId: room.id, polygon: room.polygon, color: parseCssColor(room.color) }));
  const labels: RoomLabelModel[] = rooms.map(room => {
    const ceiling = typeof room.height === 'number' && room.height > 0 ? room.height : ceilingOf(project);
    return {
      roomId: room.id,
      position: PolygonUtils.labelPoint(room.polygon),
      height: (options.cutWalls ? ceiling / 2 : ceiling) + LABEL_CLEARANCE,
      name: room.name,
      areaM2: room.areaM2
    };
  });
  const furniture = (project.furniture ?? []).map(furnitureModel);
  for (const item of furniture) {
    for (const p of item.prisms) maxHeight = Math.max(maxHeight, p.top);
  }

  const contentPoints: Point[] = [
    ...walls.flatMap(w => w.prisms.flatMap(p => p.polygon)),
    ...rooms.flatMap(r => r.polygon),
    ...furniture.flatMap(f => f.prisms.flatMap(p => p.polygon)),
    ...project.bindings.map(b => b.position).filter((p): p is Point => !!p)
  ];
  const hasGhost = !!ghost && ghost.walls.length > 0;
  return {
    walls,
    openings,
    floors,
    labels,
    furniture,
    ghost: hasGhost ? plainWalls(ghost) : null,
    bounds: boundsOf(contentPoints),
    maxHeight: maxHeight || ceilingOf(project)
  };
}

/**
 * Signature de la géométrie (mémoïsation) : murs, ouvertures, pièces, meubles, hauteur par défaut,
 * niveau fantôme et coupe des murs. Les liaisons d'entités et l'état de Home Assistant n'en font pas
 * partie : ils ne reconstruisent jamais la scène.
 */
export function sceneSignature(
  project: HomeArchitectProject,
  ghost: HomeArchitectProject | null | undefined,
  options: SceneOptions
): string {
  return JSON.stringify([
    project.walls,
    project.openings,
    project.rooms,
    project.furniture ?? [],
    project.defaultCeilingHeight ?? null,
    ghost ? [ghost.walls, ghost.rooms, ghost.defaultCeilingHeight ?? null] : null,
    options.cutWalls
  ]);
}

/** Marqueurs des entités liées (position au sol ; la scène les dresse à MARKER_HEIGHT). */
export function markerModels(bindings: readonly EntityBinding[]): MarkerModel[] {
  return bindings
    .filter(b => typeof b.entityId === 'string' && b.position && Number.isFinite(b.position.x) && Number.isFinite(b.position.y))
    .map(b => ({ bindingId: b.id, entityId: b.entityId, position: b.position }));
}

function plural(n: number, singular: string, pluralForm: string): string {
  return `${n} ${n > 1 ? pluralForm : singular}`;
}

/** Description du plan pour les lecteurs d'écran (canevas 3D en role="img"). */
export function sceneSummary(project: HomeArchitectProject, readOnly: boolean): string {
  const parts = [
    plural(validRooms(project.rooms).length, 'pièce', 'pièces'),
    plural(project.walls.length, 'mur', 'murs'),
    plural(project.openings.length, 'ouverture', 'ouvertures'),
    plural((project.furniture ?? []).length, 'meuble', 'meubles'),
    plural(project.bindings.length, 'équipement', 'équipements')
  ];
  return `Vue 3D${readOnly ? ' (lecture seule)' : ''} du plan « ${project.name} » : ${parts.join(', ')}`;
}

// ------------------------------------------------------------------
// État de Home Assistant (mise à jour légère, sans reconstruction)
// ------------------------------------------------------------------

/** Lampe allumée : position (m), hauteur (m), couleur et niveau (0–1). */
export interface LightSource {
  bindingId: string;
  position: Point;
  height: number;
  color: Rgba;
  level: number;
}

/** Blanc chaud d'une lampe sans couleur ni température connues. */
const WARM_WHITE = rgba(255, 214, 170);

function lightColor(st: HassEntityState): Rgba {
  const rgb = st.attributes?.rgb_color;
  if (Array.isArray(rgb) && rgb.length >= 3) {
    const [r, g, b] = rgb.slice(0, 3).map(toFiniteNumber);
    if (r !== null && g !== null && b !== null) return rgba(r, g, b);
  }
  const kelvin = toFiniteNumber(st.attributes?.color_temp_kelvin);
  if (kelvin !== null && kelvin > 0) return kelvinToRgb(kelvin);
  const mired = toFiniteNumber(st.attributes?.color_temp);
  if (mired !== null && mired > 0) return kelvinToRgb(1e6 / mired);
  return WARM_WHITE;
}

/** Lampes allumées, de la plus lumineuse à la moins lumineuse (les premières reçoivent un éclairage réel). */
export function lightSources(project: HomeArchitectProject, hass: HassDisplayContext | undefined): LightSource[] {
  const rooms = new Map(project.rooms.map(r => [r.id, r]));
  const ceiling = ceilingOf(project);
  const lights: LightSource[] = [];
  for (const b of project.bindings) {
    if (typeof b.entityId !== 'string' || entityDomain(b.entityId) !== 'light' || !b.position) continue;
    const st = hass?.states?.[b.entityId];
    if (!st || st.state !== 'on') continue;
    const brightness = toFiniteNumber(st.attributes?.brightness);
    const roomHeight = b.roomId ? rooms.get(b.roomId)?.height : undefined;
    const height = (typeof roomHeight === 'number' && roomHeight > 0 ? roomHeight : ceiling) - LIGHT_DROP;
    lights.push({
      bindingId: b.id,
      position: b.position,
      height: Math.max(0.5, height),
      color: lightColor(st),
      level: brightness === null ? 1 : Math.min(1, Math.max(0, brightness / 255))
    });
  }
  return lights.sort((a, b) => b.level - a.level);
}

/** Aspect d'un sol : teinte (lumière ou heatmap, mêmes règles que le 2D), lueur d'une pièce éclairée, température. */
export interface FloorLook {
  /** Couleur vers laquelle le sol est teinté, et force de la teinte (0–1). */
  tint: Rgba | null;
  strength: number;
  /** Lueur émise par le sol d'une pièce éclairée. */
  glow: Rgba | null;
  temperature: TemperatureReading | null;
}

export function floorLooks(project: HomeArchitectProject, hass: HassDisplayContext | undefined, heatmap: boolean): Map<string, FloorLook> {
  const bindings = project.bindings.filter(b => typeof b.entityId === 'string');
  const looks = new Map<string, FloorLook>();
  for (const room of validRooms(project.rooms)) {
    const look = roomAppearance(room, bindings, hass, heatmap);
    const fill = parseCssColor(look.fill);
    if (!fill) {
      looks.set(room.id, { tint: null, strength: 0, glow: null, temperature: look.temperature });
    } else if (look.illuminated) {
      // Teinte et lueur proportionnelles à la luminosité (alpha de la teinte 2D : 0,12 à 0,34).
      looks.set(room.id, { tint: fill, strength: Math.min(0.6, fill.a * 1.6), glow: scaleRgb(fill, fill.a * 0.9), temperature: null });
    } else {
      looks.set(room.id, { tint: fill, strength: 0.7, glow: null, temperature: look.temperature });
    }
  }
  return looks;
}

/** État d'une ouverture liée à une entité (capteur d'ouverture, volet, serrure). */
export interface OpeningState {
  open: boolean;
  /** 'unbound' : aucune entité liée ; 'missing' : entité absente ; 'unavailable' : état inconnu. */
  status: 'ok' | 'unbound' | 'missing' | 'unavailable';
}

const OPEN_STATES = new Set(['on', 'open', 'opening', 'closing']);

export function openingState(entityId: string | undefined, hass: HassDisplayContext | undefined): OpeningState {
  if (!entityId) return { open: false, status: 'unbound' };
  const st = hass?.states?.[entityId];
  if (!hass?.states) return { open: false, status: 'ok' };
  if (!st) return { open: false, status: 'missing' };
  if (st.state === 'unavailable' || st.state === 'unknown') return { open: false, status: 'unavailable' };
  const position = toFiniteNumber(st.attributes?.current_position);
  const open = OPEN_STATES.has(st.state) || (entityDomain(entityId) === 'cover' && position !== null && position > 0);
  return { open, status: 'ok' };
}

/** Teinte effective d'un sol : couleur de la pièce (sinon sol par défaut) teintée par la lumière ou la heatmap. */
export function floorColor(base: Rgba, roomColor: Rgba | null, look: FloorLook | undefined): Rgba {
  // Les couleurs de pièce sont des voiles pensés pour le 2D (alpha ~0,12) : en 3D, le sol en prend la teinte.
  const own = roomColor ? mixRgb(base, roomColor, roomColor.a >= 0.99 ? 0.75 : 0.4) : base;
  return look?.tint ? mixRgb(own, look.tint, look.strength) : own;
}
