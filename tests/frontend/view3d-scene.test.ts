import { afterEach, describe, expect, it, vi } from 'vitest';
import { Material, Mesh, Object3D, Vector3 } from 'three';
import { HassDisplayContext, boundEntityIds } from '../../src/canvas/entity-display';
import { EntityBinding, FurnitureItem, HomeArchitectProject, Opening, OpeningType, Point, Room, Wall } from '../../src/core/types';
import { kelvinToRgb, mixRgb, parseCssColor, rgba } from '../../src/view3d/colors';
import { furnitureShape } from '../../src/view3d/furniture3d';
import {
  Prism, buildSceneModel, calculateSunLighting, floorColor, floorLooks, furnitureModel, lightSources, markerModels, openingState,
  sceneSignature, sceneSummary
} from '../../src/view3d/scene-builder';
import { MaterialSet, readPalette } from '../../src/view3d/materials';
import { buildSceneObjects, disposeObject, pickRefOf, poseLeaf } from '../../src/view3d/scene-objects';
import { HomeArchitect3DView } from '../../src/view3d/view3d-element';
import { WEBGL_UNAVAILABLE } from '../../src/view3d/loader';
import { HomeArchitectCanvas } from '../../src/components/canvas-view';

// Références à l'exécution : les imports définissent <home-architect-3d-view> et <home-architect-canvas>.
const ViewElement = HomeArchitect3DView;
const CanvasElement = HomeArchitectCanvas;

/**
 * happy-dom n'a pas de WebGL : le moteur de rendu est remplacé par un double (le reste de three est réel)
 * pour suivre le cycle de vie de la vue. `available = false` : la création du contexte échoue.
 */
const webgl = vi.hoisted(() => ({ available: false, renderers: [] as Array<{ disposed: boolean; contextLost: boolean; renders: number }> }));

vi.mock('three', async importOriginal => {
  const actual = await importOriginal<typeof import('three')>();
  class FakeWebGLRenderer {
    readonly domElement = document.createElement('canvas');
    readonly shadowMap = { enabled: false, type: 0 };
    readonly renderLists = { dispose: () => undefined };
    disposed = false;
    contextLost = false;
    renders = 0;
    constructor() {
      if (!webgl.available) throw new Error('Error creating WebGL context.');
      webgl.renderers.push(this);
    }
    setPixelRatio(): void {}
    setSize(): void {}
    setClearColor(): void {}
    render(): void {
      this.renders++;
    }
    dispose(): void {
      this.disposed = true;
    }
    forceContextLoss(): void {
      this.contextLost = true;
    }
  }
  return { ...actual, WebGLRenderer: FakeWebGLRenderer };
});

// ------------------------------------------------------------------
// Données de test
// ------------------------------------------------------------------

const wall = (id: string, x1: number, y1: number, x2: number, y2: number, extra: Partial<Wall> = {}): Wall => ({
  id, start: { x: x1, y: y1 }, end: { x: x2, y: y2 }, thickness: 0.2, type: 'standard', ...extra
});

const opening = (id: string, wallId: string, type: OpeningType, offset: number, width: number, extra: Partial<Opening> = {}): Opening => ({
  id, wallId, type, offset, width, flipSide: false, flipDirection: false, ...extra
});

const SQUARE: Point[] = [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 4 }, { x: 0, y: 4 }];

function project(extra: Partial<HomeArchitectProject> = {}): HomeArchitectProject {
  return {
    id: 'plan_test0001',
    name: 'Test',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
    pixelsPerMeter: 50,
    grid: { size: 0.5, subdivisions: 2, snapToGrid: true, snapToAngles: true, snapToElements: true },
    walls: [],
    openings: [],
    rooms: [],
    bindings: [],
    furniture: [],
    ...extra
  };
}

function st(entityId: string, state: string, attributes: Record<string, unknown> = {}) {
  return { entity_id: entityId, state, attributes };
}

function hassWith(states: NonNullable<HassDisplayContext['states']>): HassDisplayContext {
  return { states, language: 'fr', locale: { language: 'fr', number_format: 'language' } };
}

/** Étendue (abscisses du plan) d'un prisme d'un mur horizontal. */
function xRange(p: Prism): [number, number] {
  const xs = p.polygon.map(q => q.x);
  return [+Math.min(...xs).toFixed(3), +Math.max(...xs).toFixed(3)];
}

function room(id: string, polygon: Point[], extra: Partial<Room> = {}): Room {
  return { id, name: id, polygon, areaM2: 16, ...extra };
}

function furniture(id: string, type: string, extra: Partial<FurnitureItem> = {}): FurnitureItem {
  return { id, type, name: type, category: 'other', position: { x: 2, y: 2 }, width: 0, length: 0, rotation: 0, ...extra };
}

function meshes(root: Object3D): Mesh[] {
  const out: Mesh[] = [];
  root.traverse(o => {
    if ((o as Mesh).isMesh) out.push(o as Mesh);
  });
  return out;
}

const QUARTER = Math.PI / 2;

// ------------------------------------------------------------------
// Couleurs
// ------------------------------------------------------------------

describe('view3d / couleurs', () => {
  it('lit les couleurs CSS du projet et du thème (hex, rgb(a), hsl), refuse le reste', () => {
    expect(parseCssColor('#0f172a')).toEqual({ r: 15, g: 23, b: 42, a: 1 });
    expect(parseCssColor('#fff')).toEqual({ r: 255, g: 255, b: 255, a: 1 });
    expect(parseCssColor('#ff000080')!.a).toBeCloseTo(0.5, 2);
    expect(parseCssColor('rgba(56, 189, 248, 0.12)')).toEqual({ r: 56, g: 189, b: 248, a: 0.12 });
    expect(parseCssColor(' rgb(10 20 30 / 50%) ')).toEqual({ r: 10, g: 20, b: 30, a: 0.5 });
    expect(parseCssColor('hsl(0, 100%, 50%)')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    for (const bad of ['red', 'var(--x)', 'color-mix(in srgb, red, blue)', 'rgb(1, 2)', '#12', '', undefined]) {
      expect(parseCssColor(bad)).toBeNull();
    }
  });

  it('mélanges et température de couleur des lampes', () => {
    expect(mixRgb(rgba(0, 0, 0), rgba(200, 100, 50), 0.5)).toEqual({ r: 100, g: 50, b: 25, a: 1 });
    const warm = kelvinToRgb(2700);
    const cold = kelvinToRgb(6500);
    expect(warm.r).toBe(255);
    expect(warm.b).toBeLessThan(warm.r);
    expect(cold.b).toBeGreaterThan(warm.b);
  });
});

// ------------------------------------------------------------------
// Murs et découpes des ouvertures
// ------------------------------------------------------------------

describe('view3d / murs et ouvertures', () => {
  it('porte : découpe du sol à ~2,04 m, linteau au-dessus, tranches pleines de part et d’autre', () => {
    const model = buildSceneModel(project({
      walls: [wall('w', 0, 0, 4, 0)],
      openings: [opening('door', 'w', 'door', 1, 0.9)]
    }), null, { cutWalls: false });
    const prisms = model.walls[0].prisms;
    expect(model.walls[0].height).toBe(2.5);
    expect(prisms.map(xRange)).toEqual([[0, 0.55], [0.55, 1.45], [1.45, 4]]);
    const lintel = prisms[1];
    expect(lintel.bottom).toBeCloseTo(2.04, 5);
    expect(lintel.top).toBe(2.5);
    expect(prisms[0].bottom).toBe(0);
    expect(prisms[0].top).toBe(2.5);
    // Arase des murs (dessus) dans la couleur « coupe » ; pas de face sous un linteau en contact avec le sol.
    expect(prisms.every(p => p.topRole === 'wall-top')).toBe(true);
  });

  it('fenêtre : allège jusqu’à 0,90 m et linteau à partir de 2,15 m ; porte-fenêtre depuis le sol', () => {
    const model = buildSceneModel(project({
      walls: [wall('w', 0, 0, 6, 0)],
      openings: [
        opening('win', 'w', 'window', 1.5, 1.2),
        opening('fr', 'w', 'french_window', 4.5, 1.8)
      ]
    }), null, { cutWalls: false });
    const prisms = model.walls[0].prisms;
    expect(prisms.map(xRange)).toEqual([[0, 0.9], [0.9, 2.1], [0.9, 2.1], [2.1, 3.6], [3.6, 5.4], [5.4, 6]]);
    const [sill, winLintel] = [prisms[1], prisms[2]];
    expect([sill.bottom, sill.top]).toEqual([0, 0.9]);
    expect(sill.topRole).toBeUndefined(); // dessus de l'allège : appui, pas arase
    expect(winLintel.bottom).toBeCloseTo(2.15, 5);
    const frLintel = prisms[4];
    expect(frLintel.bottom).toBeCloseTo(2.15, 5);
    // Aucune allège sous la porte-fenêtre (découpe depuis le sol).
    expect(prisms.filter(p => xRange(p)[0] === 3.6)).toHaveLength(1);
    const fr = model.openings.find(o => o.openingId === 'fr')!;
    expect([fr.bottom, fr.top]).toEqual([0, 2.15]);
  });

  it('hauteur des murs : pièce, mur, puis hauteur par défaut du projet ; coupe à mi-hauteur', () => {
    const base = project({
      defaultCeilingHeight: 2.7,
      walls: [wall('a', 0, 0, 4, 0), wall('b', 10, 0, 14, 0, { height: 2.8 }), wall('c', 20, 0, 24, 0)],
      rooms: [room('r', SQUARE, { height: 3 })]
    });
    const heights = Object.fromEntries(buildSceneModel(base, null, { cutWalls: false }).walls.map(w => [w.wallId, w.height]));
    expect(heights).toEqual({ a: 3, b: 2.8, c: 2.7 });
    const cut = Object.fromEntries(buildSceneModel(base, null, { cutWalls: true }).walls.map(w => [w.wallId, w.height]));
    expect(cut).toEqual({ a: 1.5, b: 1.4, c: 1.35 });
  });

  it('murs coupés : baie bornée à la coupe (sans linteau ni traverse haute), allège conservée', () => {
    const model = buildSceneModel(project({
      walls: [wall('w', 0, 0, 4, 0), wall('low', 10, 0, 14, 0, { height: 1.6 })],
      openings: [opening('win', 'w', 'window', 2, 1.2), opening('low_win', 'low', 'window', 2, 1.2)]
    }), null, { cutWalls: true });
    const win = model.openings.find(o => o.openingId === 'win')!;
    expect([win.bottom, win.top]).toEqual([0.9, 1.25]);
    // Plus de linteau : la baie monte jusqu'à l'arase coupée, sans traverse haute.
    expect(model.walls[0].prisms.map(xRange)).toEqual([[0, 1.4], [1.4, 2.6], [2.6, 4]]);
    expect(win.frame).toHaveLength(3);
    // Mur bas (1,60 m) : allège à 40 % de la hauteur, baie coupée à 0,80 m.
    const low = model.openings.find(o => o.openingId === 'low_win')!;
    expect(low.bottom).toBeCloseTo(0.64, 6);
    expect(low.top).toBeCloseTo(0.8, 6);
  });

  it('battants : sens d’ouverture (flipSide), côté de la charnière (flipDirection), deux vantaux, coulissant', () => {
    const model = buildSceneModel(project({
      walls: [wall('w', 0, 0, 12, 0)],
      openings: [
        opening('d', 'w', 'door', 1, 0.9),
        opening('ds', 'w', 'door', 3, 0.9, { flipSide: true }),
        opening('dd', 'w', 'door', 5, 0.9, { flipDirection: true }),
        opening('dbl', 'w', 'double_door', 7, 1.4),
        opening('sl', 'w', 'sliding_door', 9.5, 1.6),
        opening('win', 'w', 'window', 11.2, 1.0, { entityId: 'binary_sensor.fenetre' })
      ]
    }), null, { cutWalls: false });
    const leaves = (id: string) => model.openings.find(o => o.openingId === id)!.leaves;
    const door = leaves('d')[0];
    expect(door.angle).toBeCloseTo(0, 6);
    expect(door.swing).toBeCloseTo(0.9 * QUARTER, 6);
    expect(door.pivot.x).toBeCloseTo(1 - 0.45 + 0.05, 6);
    expect(door.pivot.y).toBeGreaterThan(0); // vantail du côté où il s'ouvre
    expect(door.parts.filter(p => p.role === 'door')).toHaveLength(1);
    expect(door.parts.filter(p => p.role === 'metal')).toHaveLength(2); // poignée des deux côtés
    expect(leaves('ds')[0].swing).toBeCloseTo(-0.9 * QUARTER, 6);
    expect(leaves('ds')[0].pivot.y).toBeLessThan(0);
    const dd = leaves('dd')[0];
    expect(dd.pivot.x).toBeCloseTo(5 + 0.45 - 0.05, 6);
    expect(dd.angle).toBeCloseTo(Math.PI, 6);
    const dbl = leaves('dbl');
    expect(dbl).toHaveLength(2);
    expect(Math.sign(dbl[0].swing)).toBe(-Math.sign(dbl[1].swing));
    const sl = leaves('sl');
    expect(sl.map(l => l.swing)).toEqual([0, 0]);
    expect(sl[0].slide).toBeGreaterThan(0);
    expect(sl[1].slide).toBe(0);
    expect(sl[0].parts.some(p => p.role === 'glass')).toBe(true);
    const win = model.openings.find(o => o.openingId === 'win')!;
    expect(win.entityId).toBe('binary_sensor.fenetre');
    expect(win.leaves).toHaveLength(1); // 1,00 m : un seul ouvrant (même règle que le symbole 2D)
    expect(win.frame).toHaveLength(4); // montants, traverse et appui
  });

  it('fenêtre de 1,40 m ou sashCount 2 : deux ouvrants ; porte-fenêtre à un vantail si demandé', () => {
    const model = buildSceneModel(project({
      walls: [wall('w', 0, 0, 10, 0)],
      openings: [
        opening('w14', 'w', 'window', 1, 1.4),
        opening('w2', 'w', 'window', 4, 1.0, { sashCount: 2 }),
        opening('fr1', 'w', 'french_window', 7, 1.0, { sashCount: 1 })
      ]
    }), null, { cutWalls: false });
    const count = (id: string) => model.openings.find(o => o.openingId === id)!.leaves.length;
    expect([count('w14'), count('w2'), count('fr1')]).toEqual([2, 2, 1]);
  });
});

// ------------------------------------------------------------------
// Sols, meubles, emprise, fantôme
// ------------------------------------------------------------------

describe('view3d / sols, meubles et emprise', () => {
  it('un sol par pièce valide, avec la couleur de la pièce et la texture procédurale détectée', () => {
    const model = buildSceneModel(project({
      rooms: [
        room('a', SQUARE, { name: 'Salle de bain', icon: 'mdi:shower', color: 'rgba(56, 189, 248, 0.12)' }),
        room('b', SQUARE.map(p => ({ x: p.x + 5, y: p.y })), { name: 'Cuisine', icon: 'mdi:silverware' }),
        room('c', SQUARE.map(p => ({ x: p.x + 10, y: p.y })), { name: 'Terrasse', icon: 'mdi:deck' }),
        room('d', SQUARE.map(p => ({ x: p.x + 15, y: p.y })), { name: 'Chambre', icon: 'mdi:bed' }),
        room('invalid', [{ x: 0, y: 0 }, { x: 1, y: 0 }])
      ]
    }), null, { cutWalls: false });
    expect(model.floors.map(f => f.roomId)).toEqual(['a', 'b', 'c', 'd']);
    expect(model.floors[0].color).toEqual({ r: 56, g: 189, b: 248, a: 0.12 });
    expect(model.floors[0].textureType).toBe('mosaic');
    expect(model.floors[1].textureType).toBe('tile');
    expect(model.floors[2].textureType).toBe('deck');
    expect(model.floors[3].textureType).toBe('parquet');
    expect(model.labels.map(l => l.roomId)).toEqual(['a', 'b', 'c', 'd']);
    expect(model.labels[0].height).toBeCloseTo(2.6, 6); // au-dessus de l'arase (2,50 m)
  });

  it('meubles : hauteurs réalistes par modèle et repli par catégorie', () => {
    const top = (type: string, extra: Partial<FurnitureItem> = {}) =>
      Math.max(...furnitureShape(furniture('f', type, extra)).parts.map(p => p.z1));
    expect(top('sofa_3p')).toBeCloseTo(0.85, 6);
    expect(top('bed_double')).toBeCloseTo(0.95, 6); // tête de lit
    const bed = furnitureShape(furniture('f', 'bed_double')).parts;
    expect(bed.find(p => p.role === 'soft')!.z1).toBeCloseTo(0.5, 6); // matelas
    expect(top('wardrobe')).toBeCloseTo(2, 6);
    expect(top('kitchen_sink')).toBeGreaterThanOrEqual(0.9);
    expect(top('sink_vanity')).toBeGreaterThanOrEqual(0.85);
    expect(top('fridge')).toBeCloseTo(1.85, 6);
    const table = furnitureShape(furniture('f', 'dining_table_6')).parts;
    expect(Math.max(...table.filter(p => p.role === 'body').map(p => p.z1))).toBeCloseTo(0.76, 6);
    expect(table.filter(p => p.role === 'accent' && Math.abs(p.z1 - 0.92) < 1e-6)).toHaveLength(6); // dossiers des chaises
    expect(top('unknown_thing', { category: 'storage' })).toBe(2);
    expect(top('unknown_thing', { category: 'other' })).toBe(0.8);
  });

  it('meubles : dimensions du projet, rotation (comme le 2D) et couleur propre sur le corps', () => {
    const shape = furnitureShape(furniture('f', 'sofa_3p', { width: 3, length: 1 }));
    expect(Math.min(...shape.parts.map(p => p.x0))).toBeCloseTo(-1.5, 6);
    expect(Math.max(...shape.parts.map(p => p.x1))).toBeCloseTo(1.5, 6);
    const item = furniture('s', 'sofa_3p', { position: { x: 5, y: 5 }, width: 2.2, length: 0.95, rotation: 90, color: '#ff0000' });
    const model = furnitureModel(item);
    const xs = model.prisms.flatMap(p => p.polygon.map(q => q.x));
    const ys = model.prisms.flatMap(p => p.polygon.map(q => q.y));
    expect(Math.max(...xs) - Math.min(...xs)).toBeCloseTo(0.95, 6);
    expect(Math.max(...ys) - Math.min(...ys)).toBeCloseTo(2.2, 6);
    expect(model.prisms.filter(p => p.color).every(p => p.role === 'body')).toBe(true);
    expect(model.prisms.find(p => p.color)!.color).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    expect(model.prisms.some(p => p.role === 'accent' && !p.color)).toBe(true);
  });

  it('emprise, hauteur maximale et niveau fantôme (murs pleins, sa propre hauteur)', () => {
    const ghost = project({ defaultCeilingHeight: 2.4, walls: [wall('g', 0, 0, 4, 0)], openings: [opening('o', 'g', 'door', 2, 0.9)] });
    const model = buildSceneModel(project({
      walls: [wall('w', 0, 0, 4, 0)],
      furniture: [furniture('f', 'wardrobe', { position: { x: 8, y: 3 }, width: 1.8, length: 0.6 })],
      bindings: [{ id: 'b', entityId: 'light.x', position: { x: -2, y: 5 } }]
    }), ghost, { cutWalls: false });
    expect(model.bounds!.minX).toBeCloseTo(-2, 6);
    expect(model.bounds!.maxY).toBeCloseTo(5, 6);
    expect(model.bounds!.maxX).toBeCloseTo(8.9, 6);
    expect(model.maxHeight).toBe(2.5);
    expect(model.ghost!.height).toBe(2.4);
    expect(model.ghost!.prisms).toHaveLength(1);
    expect(buildSceneModel(project(), null, { cutWalls: false }).bounds).toBeNull();
  });

  it('marqueurs : liaisons valides seulement ; description accessible du plan', () => {
    const bindings: EntityBinding[] = [
      { id: 'a', entityId: 'light.a', position: { x: 1, y: 2 } },
      { id: 'b', entityId: undefined as unknown as string, position: { x: 1, y: 2 } }
    ];
    expect(markerModels(bindings)).toEqual([{ bindingId: 'a', entityId: 'light.a', position: { x: 1, y: 2 } }]);
    const p = project({ walls: [wall('w', 0, 0, 4, 0)], rooms: [room('r', SQUARE)], bindings });
    expect(sceneSummary(p, false)).toBe('Vue 3D du plan « Test » : 1 pièce, 1 mur, 0 ouverture, 0 meuble, 2 équipements');
    expect(sceneSummary(p, true)).toContain('(lecture seule)');
  });
});

// ------------------------------------------------------------------
// Mémoïsation : seule la géométrie reconstruit la scène
// ------------------------------------------------------------------

describe('view3d / signature de la géométrie', () => {
  const base = project({
    walls: [wall('w', 0, 0, 4, 0)],
    openings: [opening('o', 'w', 'door', 2, 0.9)],
    rooms: [room('r', SQUARE)],
    furniture: [furniture('f', 'sofa_3p')],
    bindings: [{ id: 'b', entityId: 'light.a', position: { x: 1, y: 1 } }]
  });
  const sig = (p: HomeArchitectProject, ghost: HomeArchitectProject | null = null, cutWalls = false) => sceneSignature(p, ghost, { cutWalls });

  it('identique pour une copie, ou quand seules les liaisons d’entités changent', () => {
    expect(sig(JSON.parse(JSON.stringify(base)) as HomeArchitectProject)).toBe(sig(base));
    expect(sig({ ...base, bindings: [] })).toBe(sig(base));
    expect(sig({ ...base, revision: 7, updated_at: 'x' })).toBe(sig(base));
  });

  it('différente quand un mur, une ouverture, une pièce, un meuble, le fantôme ou la coupe change', () => {
    const ref = sig(base);
    expect(sig({ ...base, walls: [wall('w', 0, 0, 5, 0)] })).not.toBe(ref);
    expect(sig({ ...base, openings: [opening('o', 'w', 'door', 2.5, 0.9)] })).not.toBe(ref);
    expect(sig({ ...base, rooms: [room('r', SQUARE, { name: 'Autre' })] })).not.toBe(ref);
    expect(sig({ ...base, furniture: [furniture('f', 'sofa_3p', { rotation: 90 })] })).not.toBe(ref);
    expect(sig({ ...base, defaultCeilingHeight: 2.7 })).not.toBe(ref);
    expect(sig(base, project({ walls: [wall('g', 0, 0, 1, 0)] }))).not.toBe(ref);
    expect(sig(base, null, true)).not.toBe(ref);
  });
});

// ------------------------------------------------------------------
// État de Home Assistant
// ------------------------------------------------------------------

describe('view3d / état des entités', () => {
  const rooms = [room('r', SQUARE, { height: 3 }), room('r2', SQUARE.map(p => ({ x: p.x + 5, y: p.y })))];
  const bindings: EntityBinding[] = [
    { id: 'l1', entityId: 'light.rouge', position: { x: 1, y: 1 }, roomId: 'r' },
    { id: 'l2', entityId: 'light.chaude', position: { x: 6, y: 1 }, roomId: 'r2' },
    { id: 'l3', entityId: 'light.eteinte', position: { x: 2, y: 2 }, roomId: 'r' },
    { id: 't', entityId: 'sensor.temperature', position: { x: 3, y: 3 }, roomId: 'r' }
  ];
  const hass = hassWith({
    'light.rouge': st('light.rouge', 'on', { rgb_color: [255, 0, 0], brightness: 255 }),
    'light.chaude': st('light.chaude', 'on', { color_temp_kelvin: 2700, brightness: 100 }),
    'light.eteinte': st('light.eteinte', 'off'),
    'sensor.temperature': st('sensor.temperature', '25.0', { device_class: 'temperature', unit_of_measurement: '°C' })
  });
  const p = project({ rooms, bindings });

  it('lampes allumées, de la plus lumineuse à la moins lumineuse, sous le plafond de leur pièce', () => {
    const lights = lightSources(p, hass);
    expect(lights.map(l => l.bindingId)).toEqual(['l1', 'l2']);
    expect(lights[0].color).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    expect(lights[0].level).toBe(1);
    expect(lights[0].height).toBeCloseTo(3 - 0.35, 6);
    expect(lights[1].height).toBeCloseTo(2.5 - 0.35, 6);
    expect(lights[1].level).toBeCloseTo(100 / 255, 6);
    expect(lights[1].color.r).toBeGreaterThan(lights[1].color.b); // blanc chaud
  });

  it('sols : heatmap prioritaire (température), sinon teinte et lueur de la lumière allumée', () => {
    const heat = floorLooks(p, hass, true).get('r')!;
    expect(heat.temperature?.celsius).toBe(25);
    expect(heat.glow).toBeNull();
    expect(heat.strength).toBe(0.7);
    const lit = floorLooks(p, hass, false).get('r')!;
    expect(lit.tint).toMatchObject({ r: 255, g: 0, b: 0 });
    expect(lit.glow).not.toBeNull();
    expect(lit.strength).toBeGreaterThan(0);
    expect(lit.strength).toBeLessThanOrEqual(0.6);
    const base = rgba(100, 100, 100);
    expect(floorColor(base, null, undefined)).toEqual(base);
    expect(floorColor(base, rgba(200, 100, 0, 0.12), undefined)).toEqual(mixRgb(base, rgba(200, 100, 0), 0.4));
    expect(floorColor(base, null, lit)).toEqual(mixRgb(base, lit.tint!, lit.strength));
  });

  it('ouvertures liées : capteur, volet, serrure ; entité absente ou indisponible signalée', () => {
    const h = hassWith({
      'binary_sensor.porte': st('binary_sensor.porte', 'on'),
      'binary_sensor.fenetre': st('binary_sensor.fenetre', 'off'),
      'cover.volet': st('cover.volet', 'closed', { current_position: 30 }),
      'lock.porte': st('lock.porte', 'open'),
      'binary_sensor.hs': st('binary_sensor.hs', 'unavailable')
    });
    expect(openingState(undefined, h)).toEqual({ open: false, status: 'unbound' });
    expect(openingState('binary_sensor.porte', h)).toEqual({ open: true, status: 'ok' });
    expect(openingState('binary_sensor.fenetre', h)).toEqual({ open: false, status: 'ok' });
    expect(openingState('cover.volet', h).open).toBe(true);
    expect(openingState('lock.porte', h).open).toBe(true);
    expect(openingState('binary_sensor.hs', h)).toEqual({ open: false, status: 'unavailable' });
    expect(openingState('binary_sensor.absent', h)).toEqual({ open: false, status: 'missing' });
  });

  it('entités surveillées : épingles et capteurs des ouvertures', () => {
    expect(boundEntityIds(bindings.slice(0, 1), [{ entityId: 'binary_sensor.porte' }, {}, { entityId: 'light.rouge' }]))
      .toEqual(['light.rouge', 'binary_sensor.porte']);
  });

  it('calcul de l’éclairage solaire en temps réel selon sun.sun (azimut, élévation, teintes et ombres)', () => {
    // 1. Plein jour : soleil haut à 50° azimut 180° (plein sud)
    const dayHass = hassWith({
      'sun.sun': st('sun.sun', 'above_horizon', { elevation: 50, azimuth: 180 })
    });
    const day = calculateSunLighting(dayHass);
    expect(day.isNight).toBe(false);
    expect(day.intensity).toBeGreaterThan(1.2);
    expect(day.color).toEqual(rgba(255, 255, 255));
    expect(day.dirZ).toBeLessThan(0); // Orienté vers le nord

    // 2. Aube / Crépuscule : soleil rasant à 4° (teintes chaudes dorées)
    const sunsetHass = hassWith({
      'sun.sun': st('sun.sun', 'above_horizon', { elevation: 4, azimuth: 270 }) // Ouest
    });
    const sunset = calculateSunLighting(sunsetHass);
    expect(sunset.isNight).toBe(false);
    expect(sunset.color.r).toBe(255);
    expect(sunset.color.b).toBeLessThan(255); // Teinte dorée/orangée

    // 3. Nuit : soleil sous l’horizon (-10°)
    const nightHass = hassWith({
      'sun.sun': st('sun.sun', 'below_horizon', { elevation: -10, azimuth: 350 })
    });
    const night = calculateSunLighting(nightHass);
    expect(night.isNight).toBe(true);
    expect(night.intensity).toBeLessThan(0.3);
    expect(night.color).toEqual(rgba(59, 130, 246)); // Teinte lunaire bleutée

    // 4. Force nuit (mode 'night' ou booléen true)
    const forced = calculateSunLighting(dayHass, true);
    expect(forced.isNight).toBe(true);
    const forcedNightStr = calculateSunLighting(dayHass, 'night');
    expect(forcedNightStr.isNight).toBe(true);

    // 5. Force jour (mode 'day' même en pleine nuit avec sun.sun sous l'horizon)
    const forcedDay = calculateSunLighting(nightHass, 'day');
    expect(forcedDay.isNight).toBe(false);
    expect(forcedDay.elevationDeg).toBe(50);
    expect(forcedDay.intensity).toBeGreaterThan(1.2);
    expect(forcedDay.color).toEqual(rgba(255, 255, 255));

    // 6. Prise en compte de l'orientation du plan (northAngleDeg)
    // Azimut réel 180° (Sud). Si le plan a son Nord pivoté de 90° (Est à l'écran),
    // l'azimut relatif du soleil devient 180 - 90 = 90° (Est du plan).
    const rotatedDay = calculateSunLighting(dayHass, false, 90);
    expect(rotatedDay.isNight).toBe(false);
    expect(rotatedDay.dirX).toBeGreaterThan(0); // Vient de l'est relatif (azimut 90°)
  });
});

// ------------------------------------------------------------------
// Objets three (sans contexte WebGL)
// ------------------------------------------------------------------

describe('view3d / objets three', () => {
  const p = project({
    walls: [wall('n', 0, 0, 4, 0), wall('e', 4, 0, 4, 4), wall('s', 4, 4, 0, 4), wall('o', 0, 4, 0, 0)],
    openings: [opening('door', 's', 'door', 2, 0.9), opening('win', 'n', 'window', 2, 1.0)],
    rooms: [room('r', SQUARE)],
    furniture: [furniture('sofa', 'sofa_3p'), furniture('ghost', 'chair_starck', { position: { x: 1, y: 1 } })]
  });

  function build() {
    const materials = new MaterialSet(readPalette(document.body, 'dark'));
    const built = buildSceneObjects(buildSceneModel(p, null, { cutWalls: false }), materials);
    return { materials, built };
  }

  it('nombre de maillages : un par mur, sol et meuble, cadre et battants des ouvertures, terrain', () => {
    const { built } = build();
    expect(built.walls.size).toBe(4);
    expect(built.floors.size).toBe(1);
    expect(built.openings.size).toBe(2);
    // Chaise transparente : vitrage seul, aucun maillage opaque.
    expect([...built.furniture.keys()]).toEqual(['sofa']);
    // 4 murs + porte (cadre, vantail) + fenêtre (cadre, ouvrant, vitrage) + sol + canapé + chaise + terrain.
    expect(meshes(built.root)).toHaveLength(4 + 2 + 3 + 1 + 1 + 1 + 1);
    expect(built.pickables).toHaveLength(4 + 2 + 1 + 2);
    expect(built.box.max.y).toBe(2.5);
  });

  it('références de sélection et pose des battants', () => {
    const { built } = build();
    const door = built.openings.get('door')!;
    expect(pickRefOf(door.meshes[1])).toEqual({ kind: 'opening', id: 'door' });
    expect(pickRefOf(built.walls.get('n')!)).toEqual({ kind: 'wall', id: 'n' });
    expect(pickRefOf(built.floors.get('r')!.mesh)).toEqual({ kind: 'room', id: 'r' });
    expect(pickRefOf(built.furniture.get('sofa')!)).toEqual({ kind: 'furniture', id: 'sofa' });
    const leaf = door.leaves[0];
    poseLeaf(leaf, 0);
    expect(leaf.pivot.rotation.y).toBeCloseTo(-leaf.model.angle, 6);
    poseLeaf(leaf, 1);
    expect(leaf.pivot.rotation.y).toBeCloseTo(-(leaf.model.angle + leaf.model.swing), 6);
  });

  it('dispose : géométries et matériaux propres libérés, matériaux partagés conservés jusqu’à MaterialSet.dispose', () => {
    const { materials, built } = build();
    const geometries = new Set(meshes(built.root).map(m => m.geometry));
    let disposedGeometries = 0;
    for (const g of geometries) g.addEventListener('dispose', () => { disposedGeometries++; });
    const floorMaterial = built.floors.get('r')!.material;
    const floorDispose = vi.fn();
    floorMaterial.addEventListener('dispose', floorDispose);
    const shared = [...materials.shared];
    const sharedDispose = vi.fn();
    for (const m of shared) m.addEventListener('dispose', sharedDispose);
    const scene = new Object3D();
    scene.add(built.root);

    disposeObject(built.root, materials.shared);
    expect(disposedGeometries).toBe(geometries.size);
    expect(floorDispose).toHaveBeenCalledTimes(1);
    expect(sharedDispose).not.toHaveBeenCalled();
    expect(built.root.parent).toBeNull();

    materials.dispose();
    expect(sharedDispose).toHaveBeenCalledTimes(shared.length);
    expect(shared.every((m: Material) => m.isMaterial)).toBe(true);
  });
});

// ------------------------------------------------------------------
// Éléments : vue WebGL et canevas sans WebGL (happy-dom)
// ------------------------------------------------------------------

describe('view3d / intégration au canevas', () => {
  let canvas: HomeArchitectCanvas | null = null;

  afterEach(() => {
    canvas?.remove();
    canvas = null;
  });

  it('sans contexte WebGL, la vue signale son échec (le canevas passe alors à la 3D simplifiée)', async () => {
    webgl.available = false;
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const view = document.createElement('home-architect-3d-view');
    expect(view).toBeInstanceOf(ViewElement);
    view.project = project({ walls: [wall('w', 0, 0, 4, 0)] });
    const error = vi.fn();
    view.addEventListener('view3d-error', error);
    document.body.appendChild(view);
    await view.updateComplete;
    expect(error).toHaveBeenCalledTimes(1);
    view.remove();
  });

  async function mountCanvas(): Promise<HomeArchitectCanvas> {
    const el = document.createElement('home-architect-canvas');
    expect(el).toBeInstanceOf(CanvasElement);
    el.project = project({
      walls: [wall('w', 0, 0, 4, 0)],
      rooms: [room('r', SQUARE)],
      bindings: [{ id: 'b', entityId: 'light.a', position: { x: 1, y: 1 } }]
    });
    el.activeTool = 'select';
    el.animations = false;
    document.body.appendChild(el);
    await el.updateComplete;
    canvas = el;
    return el;
  }

  it('passage en 3D sans WebGL : repli sur la projection SVG avec un message discret', async () => {
    const el = await mountCanvas();
    el.is3DMode = true;
    await el.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 0));
    await el.updateComplete;
    expect((el as unknown as { view3d: string }).view3d).toBe('fallback');
    expect(el.shadowRoot!.querySelector('home-architect-3d-view')).toBeNull();
    expect(el.shadowRoot!.querySelector('.camera-3d')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('.canvas-hint')!.textContent).toBe(WEBGL_UNAVAILABLE);
    expect(el.shadowRoot!.querySelector('.help-hud')!.textContent).toContain('Vue 3D simplifiée');
  });

  it('masque le bandeau help-hud quand hasToast est activé pour éviter toute superposition', async () => {
    const el = await mountCanvas();
    expect(el.shadowRoot!.querySelector('.help-hud')).not.toBeNull();
    el.hasToast = true;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.help-hud')).toBeNull();
  });

  it('clics de la vue WebGL : sélection, ajout avec Maj, fiche more-info et fiche de pièce au double clic', async () => {
    const el = await mountCanvas();
    const pick = (detail: { ref: { kind: 'wall' | 'room' | 'binding'; id: string } | null; modifier?: boolean; double?: boolean }) =>
      (el as unknown as { handleView3DPick(e: CustomEvent): void }).handleView3DPick(
        new CustomEvent('view3d-pick', { detail: { modifier: false, double: false, ...detail } })
      );
    const selections: unknown[] = [];
    el.addEventListener('selection-changed', e => selections.push((e as CustomEvent).detail.selectedElements));
    const moreInfo = vi.fn();
    el.addEventListener('hass-more-info', moreInfo);
    const roomSelected = vi.fn();
    el.addEventListener('room-selected', roomSelected);

    pick({ ref: { kind: 'wall', id: 'w' } });
    expect(el.selectedElements.wallIds).toEqual(['w']);
    pick({ ref: { kind: 'room', id: 'r' }, modifier: true });
    expect(el.selectedElements.wallIds).toEqual(['w']);
    expect(el.selectedElements.roomIds).toEqual(['r']);
    pick({ ref: { kind: 'binding', id: 'b' }, double: true });
    expect(moreInfo).toHaveBeenCalledTimes(1);
    expect((moreInfo.mock.calls[0][0] as CustomEvent).detail).toEqual({ entityId: 'light.a' });
    pick({ ref: { kind: 'room', id: 'r' }, double: true });
    expect(roomSelected).toHaveBeenCalledTimes(1);
    pick({ ref: null });
    expect(el.selectedElements.wallIds).toEqual([]);
    expect(selections).toHaveLength(3);
  });
});

// ------------------------------------------------------------------
// Cycle de vie de la vue WebGL (moteur de rendu simulé)
// ------------------------------------------------------------------

describe('view3d / cycle de vie de la vue', () => {
  interface ViewInternals {
    three: {
      built: {
        box: { getCenter(target: Vector3): Vector3 };
        openings: Map<string, { leaves: Array<{ pivot: Object3D; model: { angle: number; swing: number } }> }>;
      } | null;
      controls: { target: Vector3; getPolarAngle(): number; getAzimuthalAngle(): number };
    } | null;
    fitted: boolean;
    resize(width: number, height: number): void;
  }

  const views: HomeArchitect3DView[] = [];

  afterEach(() => {
    for (const view of views.splice(0)) view.remove();
    webgl.available = false;
  });

  async function mountView(p: HomeArchitectProject, setup: (view: HomeArchitect3DView) => void = () => undefined) {
    webgl.available = true;
    const view = document.createElement('home-architect-3d-view');
    view.project = p;
    view.animations = false;
    setup(view);
    document.body.appendChild(view);
    views.push(view);
    await view.updateComplete;
    const internals = view as unknown as ViewInternals;
    // happy-dom ne met rien en page : la taille du canevas est donnée à la main.
    internals.resize(800, 600);
    return { view, internals };
  }

  const deg = (rad: number) => (rad * 180) / Math.PI;

  it('scène reconstruite seulement quand la géométrie change ; l’état HA n’anime que les battants', async () => {
    const { view, internals } = await mountView(project({
      walls: [wall('w', 0, 0, 4, 0)],
      openings: [opening('o', 'w', 'door', 2, 0.9, { entityId: 'binary_sensor.porte' })],
      rooms: [room('r', SQUARE)],
      bindings: [{ id: 'b', entityId: 'light.a', position: { x: 1, y: 1 } }]
    }));
    const built = internals.three!.built!;
    expect(built).toBeTruthy();

    view.selectedElements = { ...view.selectedElements, wallIds: ['w'] };
    await view.updateComplete;
    view.project = { ...view.project, bindings: [{ id: 'b', entityId: 'light.a', position: { x: 2, y: 2 } }] };
    await view.updateComplete;
    // Copie identique (nouveaux tableaux, même géométrie) : signature inchangée.
    view.project = JSON.parse(JSON.stringify(view.project)) as HomeArchitectProject;
    await view.updateComplete;
    expect(internals.three!.built).toBe(built);

    view.hass = hassWith({ 'binary_sensor.porte': st('binary_sensor.porte', 'on'), 'light.a': st('light.a', 'off') });
    await view.updateComplete;
    expect(internals.three!.built).toBe(built);
    const leaf = built.openings.get('o')!.leaves[0];
    expect(leaf.pivot.rotation.y).toBeCloseTo(-(leaf.model.angle + leaf.model.swing), 6);

    view.project = { ...view.project, walls: [wall('w', 0, 0, 5, 0)] };
    await view.updateComplete;
    expect(internals.three!.built).not.toBe(built);
  });

  it('recadrage demandé avec un plan tout juste transmis : cadre la scène reconstruite', async () => {
    const { view, internals } = await mountView(project({ walls: [wall('w', 0, 0, 4, 0)] }));
    expect(internals.fitted).toBe(true);
    // Même plan, contenu remplacé (import) : pas de recadrage automatique, fitToView le demande.
    view.project = { ...view.project, walls: [wall('w', 20, 10, 30, 10)] };
    view.fitToView();
    await view.updateComplete;
    const center = internals.three!.built!.box.getCenter(new Vector3());
    expect(center.x).toBeCloseTo(25, 1);
    expect(internals.three!.controls.target.distanceTo(center)).toBeLessThan(1e-6);
  });

  it('libération complète au retrait, angles repris au retour dans le document', async () => {
    const { view, internals } = await mountView(project({ walls: [wall('w', 0, 0, 4, 0)] }), v => {
      v.intro = { from: null, to: { pitchDeg: 30, yawDeg: 60 } };
    });
    expect(deg(internals.three!.controls.getPolarAngle())).toBeCloseTo(30, 4);
    view.setCamera({ pitchDeg: 60, yawDeg: -120 });
    const renderer = webgl.renderers[webgl.renderers.length - 1];
    const created = webgl.renderers.length;

    view.remove();
    expect(renderer.disposed).toBe(true);
    expect(renderer.contextLost).toBe(true);
    expect(internals.three).toBeNull();
    expect(view.shadowRoot!.querySelector('canvas')).toBeNull();
    expect(view.intro!.to.pitchDeg).toBeCloseTo(60, 4);
    expect(view.intro!.to.yawDeg).toBeCloseTo(-120, 4);

    document.body.appendChild(view);
    await view.updateComplete;
    internals.resize(800, 600);
    expect(webgl.renderers).toHaveLength(created + 1);
    expect(deg(internals.three!.controls.getPolarAngle())).toBeCloseTo(60, 4);
    expect(deg(internals.three!.controls.getAzimuthalAngle())).toBeCloseTo(-120, 4);
  });
});
