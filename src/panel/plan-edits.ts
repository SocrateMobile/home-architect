/**
 * Opérations d'édition du plan déclenchées par le panneau : pièce de l'assistant, mise à l'échelle
 * et étalonnage, import vectorisé placé à côté de l'existant, appartenance des entités et des
 * meubles aux pièces, forme des ouvertures sélectionnées.
 *
 * Fonctions pures (aucune entrée/sortie, aucun état) : elles renvoient de nouveaux objets et
 * réutilisent les sous-objets inchangés (mises à jour immuables, voir history.ts).
 */
import { BackgroundPlan, HomeArchitectProject, Opening, Point, Room, Wall } from '../core/types';
import { PolygonUtils } from '../core/polygon';
import { SnappingEngine } from '../core/snapping';
import { furnitureBounds } from '../core/furniture-catalog';
import { generateElementId } from '../core/project-model';

/** Hauteur sous plafond utilisée quand le projet n'en définit pas (même repli que le canevas). */
export const FALLBACK_CEILING_HEIGHT = 2.5;

/** Écart (m) entre le contenu existant et une pièce ou un plan importé ajouté à côté. */
export const PLACEMENT_GAP = 0.5;

/** Bornes des saisies de l'assistant (mêmes que la modale ; épaisseurs bornées comme normalizeProject). */
const WIZARD_DIMENSION = { min: 0.5, max: 50 };
const WIZARD_HEIGHT = { min: 1.5, max: 10 };
const WALL_THICKNESS = { min: 0.02, max: 1.5 };
const DEFAULT_WALL_THICKNESS = 0.2;

/** Ouvertures posées par l'assistant. */
const WIZARD_DOOR_WIDTH = 0.9;
const WIZARD_WINDOW_WIDTH = 1.2;

/** Coordonnées recalculées arrondies au millimètre. */
const COORD_DECIMALS = 3;

export interface Bounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

function round(v: number): number {
  return SnappingEngine.roundMeters(v, COORD_DECIMALS);
}

function roundPoint(p: Point): Point {
  return { x: round(p.x), y: round(p.y) };
}

/** Plus petit multiple de `step` supérieur ou égal à `v` (tolérance flottante). */
function ceilTo(v: number, step: number): number {
  return Math.ceil(v / step - 1e-9) * step;
}

function inRange(v: unknown, range: { min: number; max: number }): v is number {
  return typeof v === 'number' && Number.isFinite(v) && v >= range.min && v <= range.max;
}

/** Remplace dans une liste ce que `fn` modifie ; null si rien n'a changé (références conservées sinon). */
export function mapChanged<T>(list: readonly T[], fn: (item: T) => T): T[] | null {
  let changed = false;
  const next = list.map(item => {
    const updated = fn(item);
    if (updated !== item) changed = true;
    return updated;
  });
  return changed ? next : null;
}

/** Hauteur sous plafond par défaut effective du projet. */
export function effectiveCeilingHeight(project: Pick<HomeArchitectProject, 'defaultCeilingHeight'>): number {
  const h = project.defaultCeilingHeight;
  return typeof h === 'number' && Number.isFinite(h) && h > 0 ? h : FALLBACK_CEILING_HEIGHT;
}

function sameHeight(a: number, b: number): boolean {
  return Math.abs(a - b) < 1e-6;
}

function withoutHeight<T extends { height?: number }>(item: T, height: number): T {
  if (typeof item.height !== 'number' || !sameHeight(item.height, height)) return item;
  const next = { ...item };
  delete next.height;
  return next;
}

/**
 * Pièces et murs dont la hauteur enregistrée vaut `height` : ceux que inheritDefaultHeight ferait
 * suivre la hauteur par défaut (les murs de l'ancien assistant portent la hauteur de leur pièce).
 */
export function countWithHeight(project: Pick<HomeArchitectProject, 'rooms' | 'walls'>, height: number): { rooms: number; walls: number } {
  const matches = (item: { height?: number }) => typeof item.height === 'number' && sameHeight(item.height, height);
  return { rooms: project.rooms.filter(matches).length, walls: project.walls.filter(matches).length };
}

/**
 * Pièces et murs dont la hauteur enregistrée vaut `height` (ancienne hauteur par défaut) : la
 * hauteur est retirée pour qu'ils suivent la hauteur par défaut du projet (constat F150).
 * Renvoie le projet inchangé (même référence) si rien n'est concerné.
 */
export function inheritDefaultHeight(project: HomeArchitectProject, height: number): HomeArchitectProject {
  const rooms = mapChanged(project.rooms, r => withoutHeight(r, height));
  const walls = mapChanged(project.walls, w => withoutHeight(w, height));
  if (!rooms && !walls) return project;
  return { ...project, rooms: rooms ?? project.rooms, walls: walls ?? project.walls };
}

/**
 * Emprise du contenu du plan (faces des murs, pièces, meubles, entités), null s'il est vide.
 * Le calque de fond n'en fait pas partie : il peut déborder largement du logement.
 */
export function contentBounds(project: Pick<HomeArchitectProject, 'walls' | 'rooms' | 'bindings' | 'furniture'>): Bounds | null {
  let bounds: Bounds | null = null;
  const add = (x: number, y: number, margin: number = 0) => {
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    if (!bounds) {
      bounds = { minX: x - margin, minY: y - margin, maxX: x + margin, maxY: y + margin };
      return;
    }
    bounds.minX = Math.min(bounds.minX, x - margin);
    bounds.minY = Math.min(bounds.minY, y - margin);
    bounds.maxX = Math.max(bounds.maxX, x + margin);
    bounds.maxY = Math.max(bounds.maxY, y + margin);
  };
  for (const w of project.walls) {
    const half = (w.thickness || 0) / 2;
    add(w.start.x, w.start.y, half);
    add(w.end.x, w.end.y, half);
  }
  for (const r of project.rooms) {
    for (const p of r.polygon) add(p.x, p.y);
  }
  for (const f of project.furniture ?? []) {
    const b = furnitureBounds(f);
    add(b.minX, b.minY);
    add(b.maxX, b.maxY);
  }
  for (const b of project.bindings) add(b.position.x, b.position.y);
  return bounds;
}

// --- Appartenance aux pièces (constat F147) --------------------------------------------------------

function withRoom<T extends { roomId?: string }>(item: T, roomId: string | undefined): T {
  if (item.roomId === roomId) return item;
  const next = { ...item };
  if (roomId) next.roomId = roomId;
  else delete next.roomId;
  return next;
}

/**
 * Recalcule la pièce (roomId) de chaque entité et de chaque meuble d'après sa position, après une
 * modification des pièces (assistant, import, suppression, contour modifié). Renvoie le projet
 * inchangé (même référence) si aucune appartenance ne change.
 */
export function assignRooms(project: HomeArchitectProject): HomeArchitectProject {
  const roomAt = (p: Point) => PolygonUtils.findRoomContainingPoint(p, project.rooms)?.id;
  const bindings = mapChanged(project.bindings, b => withRoom(b, roomAt(b.position)));
  const furniture = mapChanged(project.furniture ?? [], f => withRoom(f, roomAt(f.position)));
  if (!bindings && !furniture) return project;
  return {
    ...project,
    ...(bindings ? { bindings } : {}),
    ...(furniture ? { furniture } : {})
  };
}

// --- Assistant pièce (constats F5, F148, F150, F63) ------------------------------------------------

/** Demande de l'assistant (`create-room`), revalidée par le panneau. */
export interface WizardRoomRequest {
  name: string;
  /** Dimensions intérieures (m). */
  width: number;
  length: number;
  thickness: number;
  /** Hauteur sous plafond saisie (m). */
  height: number;
  color?: string;
  icon?: string;
  addDoor: boolean;
  addWindow: boolean;
}

/** Valide le détail de `create-room` ; null si une dimension est absente ou hors bornes. */
export function parseWizardRequest(detail: unknown): WizardRoomRequest | null {
  if (typeof detail !== 'object' || detail === null) return null;
  const d = detail as Record<string, unknown>;
  if (!inRange(d.width, WIZARD_DIMENSION) || !inRange(d.length, WIZARD_DIMENSION) || !inRange(d.height, WIZARD_HEIGHT)) {
    return null;
  }
  const name = typeof d.name === 'string' && d.name.trim() !== '' ? d.name.trim() : 'Pièce';
  return {
    name,
    width: d.width,
    length: d.length,
    thickness: inRange(d.thickness, WALL_THICKNESS) ? d.thickness : DEFAULT_WALL_THICKNESS,
    height: d.height,
    color: typeof d.color === 'string' ? d.color : undefined,
    icon: typeof d.icon === 'string' ? d.icon : undefined,
    addDoor: d.addDoor === true,
    addWindow: d.addWindow === true
  };
}

/**
 * Coin haut-gauche (axes des murs) de la pièce de l'assistant (constat F5) :
 * - plan non vide : à droite du contenu existant (PLACEMENT_GAP entre les faces), aligné sur son haut ;
 * - plan vide : centrée sur `viewCenter` (centre de la vue 2D), sinon en (2 ; 2).
 * Le coin est calé sur le pas de la grille, pour que les murs tracés ensuite s'y raccordent.
 */
export function wizardRoomOrigin(project: HomeArchitectProject, req: WizardRoomRequest, viewCenter: Point | null): Point {
  const step = project.grid && project.grid.size > 0 ? project.grid.size : 0.5;
  const half = req.thickness / 2;
  const bounds = contentBounds(project);
  if (bounds) {
    return {
      x: round(ceilTo(bounds.maxX + PLACEMENT_GAP + half, step)),
      y: round(SnappingEngine.quantize(bounds.minY + half, step))
    };
  }
  if (viewCenter && Number.isFinite(viewCenter.x) && Number.isFinite(viewCenter.y)) {
    return {
      x: round(SnappingEngine.quantize(viewCenter.x - (req.width + req.thickness) / 2, step)),
      y: round(SnappingEngine.quantize(viewCenter.y - (req.length + req.thickness) / 2, step))
    };
  }
  return { x: 2, y: 2 };
}

export interface WizardRoom {
  walls: Wall[];
  openings: Opening[];
  room: Room;
}

/**
 * Pièce rectangulaire de l'assistant. Les dimensions saisies sont intérieures (constat F148) : les
 * axes des murs sont décalés de la demi-épaisseur vers l'extérieur, le polygone de la pièce suit ces
 * axes et sa surface est la surface intérieure (largeur × longueur saisies). Une hauteur égale à la
 * hauteur par défaut du projet n'est pas enregistrée : la pièce suivra ce réglage (constat F150).
 * Porte et fenêtre sont centrées et bornées à leur mur (constat F44).
 */
export function buildWizardRoom(project: HomeArchitectProject, req: WizardRoomRequest, origin: Point): WizardRoom {
  const t = req.thickness;
  const x0 = origin.x;
  const y0 = origin.y;
  const x1 = round(x0 + req.width + t);
  const y1 = round(y0 + req.length + t);
  const p1: Point = { x: x0, y: y0 };
  const p2: Point = { x: x1, y: y0 };
  const p3: Point = { x: x1, y: y1 };
  const p4: Point = { x: x0, y: y1 };
  const inherit = sameHeight(req.height, effectiveCeilingHeight(project));
  const wall = (start: Point, end: Point): Wall => ({
    id: generateElementId('w'),
    start,
    end,
    thickness: t,
    type: 'standard',
    ...(inherit ? {} : { height: req.height })
  });
  const top = wall(p1, p2);
  const right = wall(p2, p3);
  const bottom = wall(p3, p4);
  const left = wall(p4, p1);
  const walls = [top, right, bottom, left];

  const openings: Opening[] = [];
  const place = (host: Wall, type: 'door' | 'window', width: number) => {
    const fit = SnappingEngine.fitOpening(host, SnappingEngine.wallLength(host) / 2, width, { walls, openings });
    if (!fit.fits) return;
    openings.push({
      id: generateElementId('op'),
      wallId: host.id,
      type,
      offset: fit.offset,
      width: fit.width,
      flipSide: false,
      flipDirection: false
    });
  };
  if (req.addDoor) place(bottom, 'door', WIZARD_DOOR_WIDTH);
  if (req.addWindow) place(top, 'window', WIZARD_WINDOW_WIDTH);

  const polygon = [p1, p2, p3, p4];
  const room: Room = {
    id: generateElementId('room'),
    name: req.name,
    polygon,
    areaM2: PolygonUtils.computeInteriorArea(polygon, walls).areaM2,
    ...(req.color ? { color: req.color } : {}),
    ...(req.icon ? { icon: req.icon } : {}),
    ...(inherit ? {} : { height: req.height })
  };
  return { walls, openings, room };
}

// --- Mise à l'échelle et étalonnage (constats F49, F51, F141, F142) --------------------------------

export interface ScaleOutcome {
  project: HomeArchitectProject;
  /** Ouvertures qui ne tiennent plus sur leur mur raccourci, ou qui en chevauchent une autre. */
  openingConflicts: number;
}

/**
 * Surface d'une pièce après mise à l'échelle, dans la même convention qu'avant : surface intérieure
 * (demi-épaisseur des murs déduite) si c'était la sienne, sinon surface à l'axe des murs.
 */
function scaledRoomArea(room: Room, oldWalls: Wall[], polygon: Point[], walls: Wall[]): number {
  const before = PolygonUtils.computeInteriorArea(room.polygon, oldWalls);
  const wasInterior = before.matchedEdges > 0 &&
    Math.abs(room.areaM2 - before.areaM2) < Math.abs(room.areaM2 - before.axisAreaM2);
  return wasInterior ? PolygonUtils.computeInteriorArea(polygon, walls).areaM2 : PolygonUtils.computeArea(polygon);
}

/**
 * Met le plan à l'échelle d'un facteur `k` (autour de l'origine) : positions des murs, des pièces,
 * des entités, des meubles et des ouvertures sur leur mur. Les dimensions physiques (épaisseurs,
 * hauteurs, largeurs des ouvertures, dimensions des meubles) sont conservées (constat F49) et les
 * ouvertures re-bornées à leur mur (constat F44). Le calque de fond suit (échelle et position × k) si
 * `adjustBackground`. pixelsPerMeter, échelle d'affichage et d'export, ne change jamais (constats F71, F141).
 */
export function scalePlan(project: HomeArchitectProject, k: number, opts: { adjustBackground: boolean }): ScaleOutcome {
  const scale = (p: Point): Point => roundPoint({ x: p.x * k, y: p.y * k });
  const walls = project.walls.map(w => ({ ...w, start: scale(w.start), end: scale(w.end) }));
  const wallById = new Map(walls.map(w => [w.id, w]));

  const openings = project.openings.map(op => ({ ...op, offset: round(op.offset * k) }));
  let openingConflicts = 0;
  for (let i = 0; i < openings.length; i++) {
    const op = openings[i];
    const host = wallById.get(op.wallId);
    if (!host) continue;
    const fit = SnappingEngine.fitOpening(host, op.offset, op.width, { walls, openings, ignoreOpeningId: op.id });
    if (!fit.fits || fit.overlaps.length > 0) openingConflicts++;
    if (fit.fits && fit.adjusted) openings[i] = { ...op, offset: fit.offset, width: fit.width };
  }

  const rooms = project.rooms.map(r => {
    const polygon = r.polygon.map(scale);
    return { ...r, polygon, areaM2: scaledRoomArea(r, project.walls, polygon, walls) };
  });
  const bindings = project.bindings.map(b => ({ ...b, position: scale(b.position) }));
  const furniture = (project.furniture ?? []).map(f => ({ ...f, position: scale(f.position) }));

  const bg = project.background;
  const background = bg && opts.adjustBackground
    ? { ...bg, scale: bg.scale * k, offset: scale(bg.offset) }
    : bg;

  return {
    project: { ...project, walls, openings, rooms, bindings, furniture, background },
    openingConflicts
  };
}

/** Étalonnage du seul calque de fond : son échelle est multipliée par `k`, coin haut-gauche fixe (constat F51). */
export function scaleBackgroundLayer(bg: BackgroundPlan, k: number): BackgroundPlan {
  return { ...bg, scale: bg.scale * k };
}

// --- Import vectorisé (constats F157, F158, F150) --------------------------------------------------

export interface PlanGeometry {
  walls: Wall[];
  openings: Opening[];
  rooms: Room[];
}

/**
 * Géométrie vectorisée prête à fusionner : ouvertures sans mur importé écartées (constat F157), et
 * hauteurs égales à la hauteur par défaut du projet retirées (la géométrie suivra ce réglage, F150).
 */
export function cleanImportedGeometry(geometry: PlanGeometry, defaultHeight: number): PlanGeometry {
  const wallIds = new Set(geometry.walls.map(w => w.id));
  return {
    walls: geometry.walls.map(w => withoutHeight(w, defaultHeight)),
    openings: geometry.openings.filter(op => wallIds.has(op.wallId)),
    rooms: geometry.rooms.map(r => withoutHeight(r, defaultHeight))
  };
}

/** Comptes affichés après un import (murs, portes, fenêtres, pièces), calculés sur le résultat final (constat F157). */
export function geometryStats(geometry: PlanGeometry): { walls: number; doors: number; windows: number; rooms: number } {
  const windows = geometry.openings.filter(op => op.type === 'window' || op.type === 'french_window').length;
  return {
    walls: geometry.walls.length,
    doors: geometry.openings.length - windows,
    windows,
    rooms: geometry.rooms.length
  };
}

/** Décalage qui place `imported` à droite de `existing` (PLACEMENT_GAP entre les deux), aligné sur son haut. */
export function sideBySideOffset(existing: Bounds, imported: Bounds): Point {
  return {
    x: round(existing.maxX + PLACEMENT_GAP - imported.minX),
    y: round(existing.minY - imported.minY)
  };
}

/** Translate une géométrie (les ouvertures, repérées sur leur mur, ne bougent pas). */
export function translateGeometry(geometry: PlanGeometry, d: Point): PlanGeometry {
  if (d.x === 0 && d.y === 0) return geometry;
  const move = (p: Point): Point => roundPoint({ x: p.x + d.x, y: p.y + d.y });
  return {
    walls: geometry.walls.map(w => ({ ...w, start: move(w.start), end: move(w.end) })),
    openings: geometry.openings,
    rooms: geometry.rooms.map(r => ({ ...r, polygon: r.polygon.map(move) }))
  };
}

// --- Ouvertures sélectionnées (constat F44) --------------------------------------------------------

export interface OpeningReshape {
  /** Ouvertures du projet après modification, null si aucune n'a changé. */
  openings: Opening[] | null;
  updated: number;
  /** Modifications refusées : l'ouverture ne tiendrait pas sur son mur ou chevaucherait une voisine. */
  refused: number;
  /** Ouvertures dont la largeur ou la position a dû être réduite ou décalée pour rester dans le mur. */
  adjusted: number;
}

/**
 * Applique `change` aux ouvertures `ids` en les bornant à leur mur (SnappingEngine.fitOpening) ;
 * une ouverture qui ne tiendrait pas ou chevaucherait une autre ouverture du même mur garde sa forme.
 */
export function reshapeOpenings(project: HomeArchitectProject, ids: readonly string[], change: (op: Opening) => Opening): OpeningReshape {
  const wallById = new Map(project.walls.map(w => [w.id, w]));
  const working = [...project.openings];
  let updated = 0;
  let refused = 0;
  let adjusted = 0;
  for (let i = 0; i < working.length; i++) {
    const op = working[i];
    if (!ids.includes(op.id)) continue;
    const candidate = change(op);
    if (candidate === op) continue;
    const host = wallById.get(op.wallId);
    if (!host) continue;
    const fit = SnappingEngine.fitOpening(host, candidate.offset, candidate.width, {
      walls: project.walls,
      openings: working,
      ignoreOpeningId: op.id
    });
    if (!fit.fits || fit.overlaps.length > 0) {
      refused++;
      continue;
    }
    if (fit.adjusted) adjusted++;
    working[i] = { ...candidate, offset: fit.offset, width: fit.width };
    updated++;
  }
  return { openings: updated > 0 ? working : null, updated, refused, adjusted };
}
