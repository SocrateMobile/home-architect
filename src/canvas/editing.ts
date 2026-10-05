import {
  EntityBinding, FurnitureItem, HomeArchitectProject, Opening, Point, Room, SelectedElements, Wall
} from '../core/types';
import { PolygonUtils } from '../core/polygon';
import { SnappingEngine } from '../core/snapping';
import { entityDomain, generateElementId } from '../core/project-model';
import { findFurnitureTemplate } from '../core/furniture-catalog';
import type { DrawerItemPayload } from '../components/entity-drawer';

/**
 * Modifications du plan déclenchées par le canevas (module pur : aucune dépendance au DOM).
 * Toutes les fonctions renvoient un NOUVEAU projet (ou le même objet si rien ne change) et ne
 * modifient jamais leur argument : le canevas recalcule chaque étape d'un glisser depuis l'état de
 * départ, ce qui évite toute dérive et permet d'annuler le geste en restaurant cet état.
 */

/** Distance (m) sous laquelle une extrémité de mur ou un sommet de pièce appartient à une jonction (1 cm). */
export const JOIN_TOLERANCE = 0.01;

/** Distance (m) au contour d'une pièce sous laquelle un mur est considéré comme un mur de cette pièce. */
const ROOM_WALL_TOLERANCE = 0.02;

/** Longueur minimale (m) d'un mur après une modification : en deçà, la modification est refusée. */
export const MIN_WALL_LENGTH = 0.05;

/** Surface minimale (m²) d'une pièce tracée ou modifiée. */
export const MIN_ROOM_AREA = 0.1;

/** Deux sommets plus proches que cette distance (m) sont confondus dans un contour de pièce. */
const DUPLICATE_VERTEX_TOLERANCE = 1e-3;

const ENTITY_ID_PATTERN = /^[a-z0-9_]+\.[a-z0-9_]+$/;

function round3(p: Point): Point {
  return SnappingEngine.roundPoint(p);
}

function samePoint(a: Point, b: Point, tolerance = 1e-9): boolean {
  return Math.abs(a.x - b.x) <= tolerance && Math.abs(a.y - b.y) <= tolerance;
}

// ------------------------------------------------------------------
// Affectation des pièces (constat F147)
// ------------------------------------------------------------------

/**
 * Recalcule le roomId des entités et des meubles d'après leur position (pièce la plus petite qui les
 * contient, contour compris). À appeler après toute modification des pièces. Renvoie le même projet si
 * aucune affectation ne change.
 */
export function reassignRooms(project: HomeArchitectProject): HomeArchitectProject {
  const rooms = project.rooms;
  const assign = <T extends { position: Point; roomId?: string }>(items: T[]): T[] => {
    let changed = false;
    const out = items.map(item => {
      const roomId = PolygonUtils.findRoomContainingPoint(item.position, rooms)?.id;
      if (roomId === item.roomId) return item;
      changed = true;
      const next = { ...item };
      if (roomId) next.roomId = roomId;
      else delete next.roomId;
      return next;
    });
    return changed ? out : items;
  };
  const bindings = assign(project.bindings);
  const furniture = project.furniture ? assign(project.furniture) : project.furniture;
  if (bindings === project.bindings && furniture === project.furniture) return project;
  return { ...project, bindings, furniture };
}

// ------------------------------------------------------------------
// Déplacement de la sélection, des jonctions et des sommets (constats F5, F45, F131)
// ------------------------------------------------------------------

/** Éléments déplacés d'un bloc par un glisser ou par les flèches du clavier. */
export interface MoveSet {
  wallIds: string[];
  roomIds: string[];
  furnitureIds: string[];
  bindingIds: string[];
}

export function isMoveSetEmpty(set: MoveSet): boolean {
  return set.wallIds.length + set.roomIds.length + set.furnitureIds.length + set.bindingIds.length === 0;
}

/** Murs d'une pièce : murs dont les deux extrémités et le milieu sont sur le contour de la pièce. */
export function roomWallIds(room: Room, walls: readonly Wall[]): string[] {
  if (!room.polygon || room.polygon.length < 3) return [];
  return walls
    .filter(w => {
      const mid = { x: (w.start.x + w.end.x) / 2, y: (w.start.y + w.end.y) / 2 };
      return [w.start, w.end, mid].every(p => PolygonUtils.distanceToBoundary(p, room.polygon) <= ROOM_WALL_TOLERANCE);
    })
    .map(w => w.id);
}

/**
 * Ensemble déplacé pour une sélection : murs, pièces, meubles et entités sélectionnés ; une pièce
 * sélectionnée entraîne ses murs ainsi que les meubles et entités qui lui sont rattachés (roomId).
 * Les ouvertures suivent leur mur.
 */
export function buildMoveSet(project: HomeArchitectProject, selection: SelectedElements): MoveSet {
  const selectedRooms = project.rooms.filter(r => selection.roomIds.includes(r.id));
  const roomIds = new Set(selectedRooms.map(r => r.id));
  const wallIds = new Set(selection.wallIds.filter(id => project.walls.some(w => w.id === id)));
  for (const room of selectedRooms) {
    for (const id of roomWallIds(room, project.walls)) wallIds.add(id);
  }
  const inSelectedRoom = (roomId: string | undefined) => roomId !== undefined && roomIds.has(roomId);
  const furnitureSel = new Set(selection.furnitureIds ?? []);
  const bindingSel = new Set(selection.bindingIds);
  return {
    wallIds: [...wallIds],
    roomIds: [...roomIds],
    furnitureIds: (project.furniture ?? []).filter(f => furnitureSel.has(f.id) || inSelectedRoom(f.roomId)).map(f => f.id),
    bindingIds: project.bindings.filter(b => bindingSel.has(b.id) || inSelectedRoom(b.roomId)).map(b => b.id)
  };
}

/** Déplacement d'un point de jonction : toute extrémité de mur ou tout sommet de pièce situé en `from` suit. */
export interface PointMove {
  from: Point;
  to: Point;
}

function findMove(p: Point, moves: readonly PointMove[]): PointMove | undefined {
  return moves.find(m => Math.hypot(p.x - m.from.x, p.y - m.from.y) <= JOIN_TOLERANCE);
}

/** Position d'un point après les déplacements de jonction (même décalage que la jonction), null s'il ne bouge pas. */
function movedPoint(p: Point, moves: readonly PointMove[]): Point | null {
  const m = findMove(p, moves);
  if (!m) return null;
  const q = round3({ x: p.x + (m.to.x - m.from.x), y: p.y + (m.to.y - m.from.y) });
  return samePoint(q, p) ? null : q;
}

/**
 * Recale les ouvertures des murs modifiés : une translation d'un bloc ne change pas leur offset ; si une
 * seule extrémité bouge, l'ouverture garde sa distance à l'extrémité fixe ; si les deux bougent
 * différemment, son offset est proportionnel. Le résultat est borné au mur (SnappingEngine.fitOpening).
 */
function adjustOpenings(
  openings: Opening[],
  before: ReadonlyMap<string, Wall>,
  after: ReadonlyMap<string, Wall>,
  walls: Wall[]
): Opening[] {
  let changed = false;
  const out = openings.map(op => {
    const oldWall = before.get(op.wallId);
    const newWall = after.get(op.wallId);
    if (!oldWall || !newWall) return op;
    const ds = { x: newWall.start.x - oldWall.start.x, y: newWall.start.y - oldWall.start.y };
    const de = { x: newWall.end.x - oldWall.end.x, y: newWall.end.y - oldWall.end.y };
    if (samePoint(ds, de)) return op;

    const oldLength = SnappingEngine.wallLength(oldWall);
    const newLength = SnappingEngine.wallLength(newWall);
    const startMoved = !samePoint(ds, { x: 0, y: 0 });
    const endMoved = !samePoint(de, { x: 0, y: 0 });
    let offset = op.offset;
    if (startMoved && !endMoved) offset = newLength - (oldLength - op.offset);
    else if (startMoved && endMoved) offset = oldLength > 0 ? (op.offset * newLength) / oldLength : newLength / 2;

    const fit = SnappingEngine.fitOpening(newWall, offset, op.width, { walls });
    const nextOffset = fit.fits ? fit.offset : Math.min(Math.max(offset, 0), newLength);
    const nextWidth = fit.fits ? fit.width : op.width;
    if (Math.abs(nextOffset - op.offset) < 1e-9 && Math.abs(nextWidth - op.width) < 1e-9) return op;
    changed = true;
    return { ...op, offset: nextOffset, width: nextWidth };
  });
  return changed ? out : openings;
}

/**
 * Applique des déplacements de jonction aux murs (extrémités) et aux pièces (sommets), translate d'un
 * bloc les pièces `rigidRoomIds`, recale les ouvertures et recalcule la surface des pièces déformées.
 * Null si un mur deviendrait plus court que MIN_WALL_LENGTH.
 */
function applyPointMoves(
  project: HomeArchitectProject,
  moves: readonly PointMove[],
  rigid?: { roomIds: ReadonlySet<string>; delta: Point }
): HomeArchitectProject | null {
  const before = new Map<string, Wall>();
  const after = new Map<string, Wall>();
  const walls = project.walls.map(w => {
    const start = movedPoint(w.start, moves);
    const end = movedPoint(w.end, moves);
    if (!start && !end) return w;
    const next: Wall = { ...w, start: start ?? w.start, end: end ?? w.end };
    before.set(w.id, w);
    after.set(w.id, next);
    return next;
  });
  for (const w of after.values()) {
    if (SnappingEngine.wallLength(w) < MIN_WALL_LENGTH) return null;
  }

  let roomsChanged = false;
  const rooms = project.rooms.map(room => {
    if (rigid && rigid.roomIds.has(room.id)) {
      if (rigid.delta.x === 0 && rigid.delta.y === 0) return room;
      roomsChanged = true;
      return { ...room, polygon: room.polygon.map(p => round3({ x: p.x + rigid.delta.x, y: p.y + rigid.delta.y })) };
    }
    let changed = false;
    const polygon = room.polygon.map(p => {
      const q = movedPoint(p, moves);
      if (!q) return p;
      changed = true;
      return q;
    });
    if (!changed) return room;
    roomsChanged = true;
    return { ...room, polygon, areaM2: PolygonUtils.computeArea(polygon) };
  });

  if (after.size === 0 && !roomsChanged) return project;
  return {
    ...project,
    walls: after.size > 0 ? walls : project.walls,
    rooms: roomsChanged ? rooms : project.rooms,
    openings: after.size > 0 ? adjustOpenings(project.openings, before, after, walls) : project.openings
  };
}

/**
 * Translate l'ensemble `set` de `delta` mètres. Les extrémités des murs non déplacés qui touchent un
 * mur déplacé (jonction à 1 cm près) suivent, de même que les sommets des pièces posés sur ces
 * jonctions (surface recalculée) : le plan reste fermé. Les roomId sont ensuite recalculés.
 * Null si le déplacement écraserait un mur connecté (longueur < MIN_WALL_LENGTH).
 */
export function translateSelection(project: HomeArchitectProject, set: MoveSet, delta: Point): HomeArchitectProject | null {
  if (delta.x === 0 && delta.y === 0) return project;
  const wallIds = new Set(set.wallIds);
  const moves: PointMove[] = [];
  for (const wall of project.walls) {
    if (!wallIds.has(wall.id)) continue;
    for (const p of [wall.start, wall.end]) {
      if (!findMove(p, moves)) moves.push({ from: p, to: { x: p.x + delta.x, y: p.y + delta.y } });
    }
  }
  const moved = applyPointMoves(project, moves, { roomIds: new Set(set.roomIds), delta });
  if (!moved) return null;

  const shift = (p: Point) => round3({ x: p.x + delta.x, y: p.y + delta.y });
  const furnitureIds = new Set(set.furnitureIds);
  const bindingIds = new Set(set.bindingIds);
  const furniture = moved.furniture && furnitureIds.size > 0
    ? moved.furniture.map(f => (furnitureIds.has(f.id) ? { ...f, position: shift(f.position) } : f))
    : moved.furniture;
  const bindings = bindingIds.size > 0
    ? moved.bindings.map(b => (bindingIds.has(b.id) ? { ...b, position: shift(b.position) } : b))
    : moved.bindings;
  if (furniture === moved.furniture && bindings === moved.bindings) return reassignRooms(moved);
  return reassignRooms({ ...moved, furniture, bindings });
}

/**
 * Déplace une extrémité de mur : les murs connectés à cette extrémité et les sommets de pièces posés
 * dessus suivent. Null si un mur deviendrait trop court.
 */
export function moveWallEndpoint(project: HomeArchitectProject, wallId: string, which: 'start' | 'end', to: Point): HomeArchitectProject | null {
  const wall = project.walls.find(w => w.id === wallId);
  if (!wall) return null;
  const moved = applyPointMoves(project, [{ from: wall[which], to }]);
  return moved ? reassignRooms(moved) : null;
}

/** Déplace un sommet du contour d'une pièce. Null si le contour se recouperait ou deviendrait trop petit. */
export function moveRoomVertex(project: HomeArchitectProject, roomId: string, index: number, to: Point): HomeArchitectProject | null {
  const room = project.rooms.find(r => r.id === roomId);
  if (!room || index < 0 || index >= room.polygon.length) return null;
  const polygon = room.polygon.map((p, i) => (i === index ? round3(to) : p));
  if (roomPolygonIssue(polygon) !== null) return null;
  const rooms = project.rooms.map(r => (r.id === roomId ? { ...r, polygon, areaM2: PolygonUtils.computeArea(polygon) } : r));
  return reassignRooms({ ...project, rooms });
}

/** Abscisse (m depuis wall.start, non bornée) de la projection d'un point sur l'axe d'un mur. */
export function offsetAlongWall(wall: Wall, point: Point): number {
  const dx = wall.end.x - wall.start.x;
  const dy = wall.end.y - wall.start.y;
  const len = Math.hypot(dx, dy);
  if (len === 0) return 0;
  return ((point.x - wall.start.x) * dx + (point.y - wall.start.y) * dy) / len;
}

/**
 * Fait glisser une ouverture le long de son mur (constat F131), bornée au mur. Null si la position
 * demandée chevaucherait une autre ouverture ou si le mur est trop court.
 */
export function slideOpening(project: HomeArchitectProject, openingId: string, offset: number): HomeArchitectProject | null {
  const op = project.openings.find(o => o.id === openingId);
  const wall = op ? project.walls.find(w => w.id === op.wallId) : undefined;
  if (!op || !wall) return null;
  const fit = SnappingEngine.fitOpening(wall, offset, op.width, {
    walls: project.walls,
    openings: project.openings,
    ignoreOpeningId: op.id
  });
  if (!fit.fits || fit.overlaps.length > 0) return null;
  if (fit.offset === op.offset && fit.width === op.width) return project;
  return { ...project, openings: project.openings.map(o => (o.id === op.id ? { ...o, offset: fit.offset, width: fit.width } : o)) };
}

// ------------------------------------------------------------------
// Création de pièces (constat F46)
// ------------------------------------------------------------------

export type RoomPolygonIssue = 'too-few' | 'self-intersecting' | 'too-small';

/** Contour sans sommets consécutifs confondus (ni dernier sommet égal au premier). */
export function cleanPolygon(points: readonly Point[]): Point[] {
  const out: Point[] = [];
  for (const p of points) {
    const prev = out[out.length - 1];
    if (!prev || !samePoint(prev, p, DUPLICATE_VERTEX_TOLERANCE)) out.push({ x: p.x, y: p.y });
  }
  while (out.length > 1 && samePoint(out[0], out[out.length - 1], DUPLICATE_VERTEX_TOLERANCE)) out.pop();
  return out;
}

/** Défaut d'un contour de pièce, ou null s'il est valide. */
export function roomPolygonIssue(points: readonly Point[]): RoomPolygonIssue | null {
  const polygon = cleanPolygon(points);
  if (polygon.length < 3) return 'too-few';
  if (PolygonUtils.isSelfIntersecting(polygon)) return 'self-intersecting';
  if (PolygonUtils.computeArea(polygon) < MIN_ROOM_AREA) return 'too-small';
  return null;
}

/** Nom par défaut d'une nouvelle pièce : « Pièce N », N étant le premier numéro libre. */
export function nextRoomName(rooms: readonly Room[]): string {
  const names = new Set(rooms.map(r => r.name));
  let n = rooms.length + 1;
  while (names.has(`Pièce ${n}`)) n++;
  return `Pièce ${n}`;
}

/** Nouvelle pièce à partir d'un contour valide (surface à l'axe, comme l'assistant et l'import). */
export function createRoom(points: readonly Point[], rooms: readonly Room[]): Room {
  const polygon = cleanPolygon(points).map(round3);
  return {
    id: generateElementId('room'),
    name: nextRoomName(rooms),
    polygon,
    areaM2: PolygonUtils.computeArea(polygon)
  };
}

/** Rectangle aligné sur les axes ayant `a` et `b` pour coins opposés (sens horaire à l'écran). */
export function rectanglePolygon(a: Point, b: Point): Point[] {
  const minX = Math.min(a.x, b.x);
  const maxX = Math.max(a.x, b.x);
  const minY = Math.min(a.y, b.y);
  const maxY = Math.max(a.y, b.y);
  return [{ x: minX, y: minY }, { x: maxX, y: minY }, { x: maxX, y: maxY }, { x: minX, y: maxY }];
}

// ------------------------------------------------------------------
// Dépôt depuis le volet (constats F28, F123, F138)
// ------------------------------------------------------------------

/** Vrai pour un identifiant d'entité HA bien formé (domaine.objet, minuscules, chiffres et _). */
export function isValidEntityId(entityId: unknown): entityId is string {
  return typeof entityId === 'string' && ENTITY_ID_PATTERN.test(entityId);
}

/**
 * Données d'un glisser-déposer validées (MIME application/json) : n'importe quelle page peut déposer
 * du JSON sur le canevas, seules les formes émises par le volet sont acceptées.
 */
export function parseDrawerPayload(raw: unknown): DrawerItemPayload | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const data = raw as Record<string, unknown>;
  if (data.kind === 'furniture') {
    return typeof data.furnitureType === 'string' && findFurnitureTemplate(data.furnitureType)
      ? { kind: 'furniture', furnitureType: data.furnitureType }
      : null;
  }
  if (data.kind === 'entity' && isValidEntityId(data.entityId)) {
    return { kind: 'entity', entityId: data.entityId, domain: entityDomain(data.entityId) };
  }
  return null;
}

/** Nouvelle liaison d'entité : ni nom figé, ni icône, ni action (défauts dynamiques, constat F138). */
export function createBinding(entityId: string, position: Point, rooms: Room[]): EntityBinding {
  const point = round3(position);
  const binding: EntityBinding = { id: generateElementId('bind'), entityId, position: point };
  const room = PolygonUtils.findRoomContainingPoint(point, rooms);
  if (room) binding.roomId = room.id;
  return binding;
}

/** Nouveau meuble du catalogue, centré sur `position`, ou null si le modèle est inconnu. */
export function createFurniture(type: string, position: Point, rooms: Room[]): FurnitureItem | null {
  const template = findFurnitureTemplate(type);
  if (!template) return null;
  const point = round3(position);
  const item: FurnitureItem = {
    id: generateElementId('furn'),
    type: template.type,
    name: template.name,
    category: template.category,
    position: point,
    width: template.width,
    length: template.length,
    rotation: 0,
    icon: template.icon
  };
  if (template.defaultColor) item.color = template.defaultColor;
  const room = PolygonUtils.findRoomContainingPoint(point, rooms);
  if (room) item.roomId = room.id;
  return item;
}
