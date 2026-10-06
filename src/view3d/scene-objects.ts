import {
  Box3, BufferGeometry, Color, Float32BufferAttribute, GridHelper, Group, Material, Mesh, MeshLambertMaterial, Object3D,
  PlaneGeometry, ShapeUtils, Texture, Vector2, Vector3
} from 'three';
import { Point } from '../core/types';
import { ElementRef } from '../canvas/selection';
import { Rgba } from './colors';
import { MaterialSet, Palette3D, toColor } from './materials';
import { LeafModel, OpeningModel, Prism, SceneModel, SurfaceRole, floorColor } from './scene-builder';

/**
 * Objets three de la vue 3D, construits à partir du modèle pur (scene-builder) : aucune dépendance au
 * contexte WebGL, la scène se construit et se libère dans les tests. Repère : le plan (x, y) devient
 * (x, 0, y) avec Y vers le haut ; vu du dessus, la scène est orientée comme le plan 2D.
 *  - un maillage par mur, par meuble (plus ses vitrages), par sol de pièce, et pour chaque ouverture
 *    son cadre et ses battants (sur un pivot animé selon l'état de l'entité liée) ;
 *  - chaque maillage cliquable porte `userData.pick` (même référence d'élément que la sélection 2D).
 */

/** Hauteur (m) des sols au-dessus du terrain (évite le scintillement avec la grille). */
const FLOOR_Y = 0.004;
/** Marge (m) du terrain autour du plan. */
const GROUND_MARGIN = 6;

export type PickRef = ElementRef;

export interface BuiltLeaf {
  pivot: Group;
  model: LeafModel;
}

export interface BuiltOpening {
  model: OpeningModel;
  /** Maillages opaques (cadre et battants) : matériau échangé pour la sélection ou un avertissement. */
  meshes: Mesh[];
  leaves: BuiltLeaf[];
}

export interface BuiltFloor {
  mesh: Mesh;
  material: MeshLambertMaterial;
  color: Rgba | null;
}

export interface BuiltScene {
  root: Group;
  walls: Map<string, Mesh>;
  openings: Map<string, BuiltOpening>;
  /** Maillage opaque de chaque meuble (ses vitrages éventuels sont dans le même groupe). */
  furniture: Map<string, Mesh>;
  floors: Map<string, BuiltFloor>;
  /** Objets testés au clic. */
  pickables: Object3D[];
  /** Centre au sol (m, repère three) et rayon (m) de la scène : limites de la caméra et des ombres. */
  center: Vector3;
  radius: number;
  /** Boîte englobante du contenu (niveau fantôme compris), pour cadrer la caméra. */
  box: Box3;
}

// ------------------------------------------------------------------
// Géométrie des prismes
// ------------------------------------------------------------------

class GeometryBuffers {
  readonly positions: number[] = [];
  readonly normals: number[] = [];
  readonly colors: number[] = [];

  /** Triangle à normale plate, enroulé pour faire face à `normal`. */
  triangle(p: Vector3, q: Vector3, r: Vector3, normal: Vector3, color: Color): void {
    const e1 = new Vector3().subVectors(q, p);
    const e2 = new Vector3().subVectors(r, p);
    const flip = e1.cross(e2).dot(normal) < 0;
    for (const v of flip ? [p, r, q] : [p, q, r]) {
      this.positions.push(v.x, v.y, v.z);
      this.normals.push(normal.x, normal.y, normal.z);
      this.colors.push(color.r, color.g, color.b);
    }
  }

  toGeometry(): BufferGeometry | null {
    if (this.positions.length === 0) return null;
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(this.positions, 3));
    geometry.setAttribute('normal', new Float32BufferAttribute(this.normals, 3));
    geometry.setAttribute('color', new Float32BufferAttribute(this.colors, 3));
    geometry.computeBoundingSphere();
    return geometry;
  }
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

const UP = new Vector3(0, 1, 0);
const DOWN = new Vector3(0, -1, 0);

/** Face horizontale (contour quelconque, triangulé) à la hauteur y. */
function addCap(buffers: GeometryBuffers, poly: readonly Point[], y: number, normal: Vector3, color: Color): void {
  const contour = poly.map(p => new Vector2(p.x, p.y));
  for (const [i, j, k] of ShapeUtils.triangulateShape(contour, [])) {
    const v = (n: number) => new Vector3(poly[n].x, y, poly[n].y);
    buffers.triangle(v(i), v(j), v(k), normal, color);
  }
}

/** Prisme vertical : faces latérales, dessus, et dessous s'il est décollé du sol. */
function addPrism(buffers: GeometryBuffers, prism: Prism, colorOf: (role: SurfaceRole, own?: Rgba) => Color): void {
  const poly = prism.polygon;
  const area = signedArea(poly);
  if (poly.length < 3 || Math.abs(area) < 1e-8 || prism.top - prism.bottom < 1e-5) return;
  const side = colorOf(prism.role, prism.color);
  // Normale sortante d'une arête (dx, dy) : (dy, −dx) pour un contour d'aire positive.
  const orient = area > 0 ? 1 : -1;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const length = Math.hypot(b.x - a.x, b.y - a.y);
    if (length < 1e-7) continue;
    const normal = new Vector3((orient * (b.y - a.y)) / length, 0, (-orient * (b.x - a.x)) / length);
    const a0 = new Vector3(a.x, prism.bottom, a.y);
    const b0 = new Vector3(b.x, prism.bottom, b.y);
    const b1 = new Vector3(b.x, prism.top, b.y);
    const a1 = new Vector3(a.x, prism.top, a.y);
    buffers.triangle(a0, b0, b1, normal, side);
    buffers.triangle(a0, b1, a1, normal, side);
  }
  addCap(buffers, poly, prism.top, UP, prism.topRole ? colorOf(prism.topRole) : side);
  if (prism.bottom > 1e-4) addCap(buffers, poly, prism.bottom, DOWN, side);
}

/** Géométrie (couleurs par sommet) d'un ensemble de prismes, null s'il est vide. */
export function prismGeometry(prisms: readonly Prism[], palette: Palette3D): BufferGeometry | null {
  const cache = new Map<string, Color>();
  const colorOf = (role: SurfaceRole, own?: Rgba): Color => {
    const c = own ?? palette.roles[role];
    const key = `${c.r},${c.g},${c.b}`;
    let color = cache.get(key);
    if (!color) {
      color = toColor(c);
      cache.set(key, color);
    }
    return color;
  };
  const buffers = new GeometryBuffers();
  for (const prism of prisms) addPrism(buffers, prism, colorOf);
  return buffers.toGeometry();
}

// ------------------------------------------------------------------
// Objets de la scène
// ------------------------------------------------------------------

function setPick(object: Object3D, ref: PickRef): void {
  object.userData.pick = ref;
}

/** Référence d'élément portée par l'objet touché ou l'un de ses parents. */
export function pickRefOf(object: Object3D | null): PickRef | null {
  for (let o = object; o; o = o.parent) {
    const ref = o.userData.pick as PickRef | undefined;
    if (ref) return ref;
  }
  return null;
}

/** Maillages opaque et vitré d'un ensemble de prismes, ajoutés à `parent`. */
function addMeshes(parent: Object3D, prisms: readonly Prism[], materials: MaterialSet, shadows: { cast: boolean; receive: boolean }): Mesh | null {
  const solid = prismGeometry(prisms.filter(p => p.role !== 'glass'), materials.palette);
  const glass = prismGeometry(prisms.filter(p => p.role === 'glass'), materials.palette);
  let opaque: Mesh | null = null;
  if (solid) {
    opaque = new Mesh(solid, materials.surface);
    opaque.castShadow = shadows.cast;
    opaque.receiveShadow = shadows.receive;
    parent.add(opaque);
  }
  if (glass) {
    const pane = new Mesh(glass, materials.glass);
    pane.receiveShadow = shadows.receive;
    pane.renderOrder = 1;
    parent.add(pane);
  }
  return opaque;
}

/** Pose d'un battant : rotation et glissement selon l'ouverture `t` (0 fermé, 1 ouvert). */
export function poseLeaf(leaf: BuiltLeaf, t: number): void {
  const { model, pivot } = leaf;
  pivot.position.set(
    model.pivot.x + Math.cos(model.angle) * model.slide * t,
    0,
    model.pivot.y + Math.sin(model.angle) * model.slide * t
  );
  // rotation.y = −θ oriente l'axe X local selon l'angle θ du plan (repère y vers le bas).
  pivot.rotation.y = -(model.angle + model.swing * t);
}

function buildOpening(model: OpeningModel, materials: MaterialSet): { group: Group; built: BuiltOpening } {
  const group = new Group();
  setPick(group, { kind: 'opening', id: model.openingId });
  const meshes: Mesh[] = [];
  const frame = addMeshes(group, model.frame, materials, { cast: true, receive: true });
  if (frame) meshes.push(frame);
  const leaves = model.leaves.map(leafModel => {
    const pivot = new Group();
    const mesh = addMeshes(pivot, leafModel.parts, materials, { cast: true, receive: true });
    if (mesh) meshes.push(mesh);
    const leaf: BuiltLeaf = { pivot, model: leafModel };
    poseLeaf(leaf, 0);
    group.add(pivot);
    return leaf;
  });
  return { group, built: { model, meshes, leaves } };
}

/** Sol d'une pièce : face horizontale à son propre matériau (teinte mise à jour selon l'état HA). */
function buildFloor(polygon: readonly Point[], color: Rgba | null, palette: Palette3D): { mesh: Mesh; material: MeshLambertMaterial } | null {
  const buffers = new GeometryBuffers();
  addCap(buffers, polygon, FLOOR_Y, UP, new Color(1, 1, 1));
  const geometry = buffers.toGeometry();
  if (!geometry) return null;
  geometry.deleteAttribute('color');
  const material = new MeshLambertMaterial({ color: toColor(floorColor(palette.floor, color, undefined)) });
  const mesh = new Mesh(geometry, material);
  mesh.receiveShadow = true;
  return { mesh, material };
}

/** Scène statique complète (murs, ouvertures, sols, meubles, fantôme, terrain et grille). */
export function buildSceneObjects(model: SceneModel, materials: MaterialSet): BuiltScene {
  const palette = materials.palette;
  const root = new Group();
  root.name = 'home-architect-plan';
  const pickables: Object3D[] = [];

  const walls = new Map<string, Mesh>();
  for (const wall of model.walls) {
    const geometry = prismGeometry(wall.prisms, palette);
    if (!geometry) continue;
    const mesh = new Mesh(geometry, materials.surface);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    setPick(mesh, { kind: 'wall', id: wall.wallId });
    root.add(mesh);
    walls.set(wall.wallId, mesh);
    pickables.push(mesh);
  }

  const openings = new Map<string, BuiltOpening>();
  for (const opening of model.openings) {
    const { group, built } = buildOpening(opening, materials);
    root.add(group);
    openings.set(opening.openingId, built);
    pickables.push(group);
  }

  const floors = new Map<string, BuiltFloor>();
  for (const floor of model.floors) {
    const built = buildFloor(floor.polygon, floor.color, palette);
    if (!built) continue;
    setPick(built.mesh, { kind: 'room', id: floor.roomId });
    root.add(built.mesh);
    floors.set(floor.roomId, { ...built, color: floor.color });
    pickables.push(built.mesh);
  }

  const furniture = new Map<string, Mesh>();
  for (const item of model.furniture) {
    const group = new Group();
    setPick(group, { kind: 'furniture', id: item.itemId });
    const mesh = addMeshes(group, item.prisms, materials, { cast: true, receive: true });
    if (group.children.length === 0) continue;
    root.add(group);
    if (mesh) furniture.set(item.itemId, mesh);
    pickables.push(group);
  }

  // Niveau fantôme : murs translucides du niveau inférieur, sous le plan.
  let groundY = 0;
  if (model.ghost) {
    const geometry = prismGeometry(model.ghost.prisms, palette);
    if (geometry) {
      const ghost = new Mesh(geometry, materials.ghost);
      ghost.position.y = -model.ghost.height;
      ghost.renderOrder = 2;
      root.add(ghost);
      groundY = -model.ghost.height;
    }
  }

  const b = model.bounds ?? { minX: -5, minY: -5, maxX: 5, maxY: 5 };
  const center = new Vector3((b.minX + b.maxX) / 2, 0, (b.minY + b.maxY) / 2);
  const span = Math.max(b.maxX - b.minX, b.maxY - b.minY, 1);
  const radius = Math.hypot(b.maxX - b.minX, b.maxY - b.minY, model.maxHeight) / 2 || 1;

  const size = Math.ceil(span + GROUND_MARGIN * 2);
  const ground = new Mesh(new PlaneGeometry(size, size), materials.ground);
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(center.x, groundY - 0.002, center.z);
  ground.receiveShadow = true;
  root.add(ground);
  const gridColor = toColor(palette.grid);
  const grid = new GridHelper(size, size, gridColor, gridColor);
  grid.position.set(center.x, groundY, center.z);
  root.add(grid);

  const box = new Box3(new Vector3(b.minX, groundY, b.minY), new Vector3(b.maxX, model.maxHeight, b.maxY));
  return { root, walls, openings, furniture, floors, pickables, center, radius, box };
}

/**
 * Libère géométries, matériaux et textures d'un sous-graphe, sauf les matériaux partagés `keep`
 * (libérés une seule fois par MaterialSet.dispose()).
 */
export function disposeObject(root: Object3D, keep: ReadonlySet<Material> = new Set()): void {
  root.traverse(object => {
    const mesh = object as Partial<Mesh>;
    mesh.geometry?.dispose();
    const material = mesh.material;
    for (const m of Array.isArray(material) ? material : material ? [material] : []) {
      if (keep.has(m)) continue;
      for (const value of Object.values(m)) {
        if (value instanceof Texture) value.dispose();
      }
      m.dispose();
    }
  });
  root.removeFromParent();
}
