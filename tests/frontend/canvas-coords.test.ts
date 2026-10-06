import { describe, expect, it } from 'vitest';
import {
  ViewGeometry, clampZoom, clientToWorld, fitViewport, localToView, panViewport, viewToLocal, wheelDeltaPixels,
  wheelZoomFactor, worldToClient, worldToView, zoomLimits, zoomViewportAt
} from '../../src/canvas/coords';
import { PointerTracker, exceedsTapSlop, pinchViewport } from '../../src/canvas/gestures';
import {
  addToSelection, emptySelection, isSelected, pruneSelection, removeFromSelection, sameSelection, selectOnly, selectionCount
} from '../../src/canvas/selection';
import {
  buildMoveSet, createBinding, createFurniture, createRoom, moveRoomVertex, moveWallEndpoint, nextRoomName,
  parseDrawerPayload, reassignRooms, rectanglePolygon, roomPolygonIssue, roomWallIds, slideOpening, translateSelection
} from '../../src/canvas/editing';
import { snapMeasurePoint } from '../../src/canvas/tool-snap';
import { HomeArchitectProject, Opening, Point, Room, Wall } from '../../src/core/types';

const ROTATIONS = [0, 90, 180, 270, -90, -180, -270, -360, -450, 30];

function geo(rotationDeg: number, overrides: Partial<ViewGeometry> = {}): ViewGeometry {
  return {
    viewport: { x: 137, y: -42, zoom: 1.7 },
    pixelsPerMeter: 50,
    rotationDeg,
    size: { width: 900, height: 640 },
    ...overrides
  };
}

const ORIGIN = { left: 256, top: 64 }; // barre latérale HA + en-tête du panneau

function expectClose(a: Point, b: Point, digits = 6): void {
  expect(a.x).toBeCloseTo(b.x, digits);
  expect(a.y).toBeCloseTo(b.y, digits);
}

/** Formule de screenToWorld de la v1.0.28 (rotation compensée autour du centre du canevas). */
function legacyScreenToWorld(clientX: number, clientY: number, g: ViewGeometry): Point {
  let relX = clientX - ORIGIN.left;
  let relY = clientY - ORIGIN.top;
  if (g.rotationDeg !== 0) {
    const cx = g.size.width / 2;
    const cy = g.size.height / 2;
    const dx = relX - cx;
    const dy = relY - cy;
    const rad = (-g.rotationDeg * Math.PI) / 180;
    relX = cx + (dx * Math.cos(rad) - dy * Math.sin(rad));
    relY = cy + (dx * Math.sin(rad) + dy * Math.cos(rad));
  }
  const ppm = g.pixelsPerMeter * g.viewport.zoom;
  return { x: (relX - g.viewport.x) / ppm, y: (relY - g.viewport.y) / ppm };
}

/** Rotation CSS rotate(θ) appliquée par le groupe viewport-2d-rotator autour de (cx, cy) (v1.0.29). */
function cssRotate(p: Point, g: ViewGeometry): Point {
  const cx = g.size.width / 2;
  const cy = g.size.height / 2;
  const rad = (g.rotationDeg * Math.PI) / 180;
  return {
    x: cx + (p.x - cx) * Math.cos(rad) - (p.y - cy) * Math.sin(rad),
    y: cy + (p.x - cx) * Math.sin(rad) + (p.y - cy) * Math.cos(rad)
  };
}

describe('conversions écran ↔ monde (rotation de vue appliquée une seule fois)', () => {
  it.each(ROTATIONS)('aller-retour clientToWorld(worldToClient(p)) ≈ p à %s°', rotation => {
    const g = geo(rotation);
    for (const p of [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: -3.25, y: 7.5 }, { x: 12.1, y: -8.04 }]) {
      const c = worldToClient(p, ORIGIN, g);
      expectClose(clientToWorld(c.x, c.y, ORIGIN, g), p);
    }
  });

  it.each(ROTATIONS)('le point dessiné puis tourné par le groupe SVG est bien celui que vise le clic (%s°)', rotation => {
    const g = geo(rotation);
    const p = { x: 4, y: 0 };
    const displayed = cssRotate(worldToView(p, g), g);
    expectClose(viewToLocal(worldToView(p, g), g), displayed);
    expectClose(clientToWorld(displayed.x + ORIGIN.left, displayed.y + ORIGIN.top, ORIGIN, g), p);
  });

  it.each([0, 90, 180, 270, -90, -270])('reproduit screenToWorld de la v1.0.28 à %s°', rotation => {
    const g = geo(rotation);
    for (const [cx, cy] of [[300, 300], [ORIGIN.left + 10, ORIGIN.top + 600], [1200, 80]]) {
      expectClose(clientToWorld(cx, cy, ORIGIN, g), legacyScreenToWorld(cx, cy, g), 9);
    }
  });

  it('tient compte de la position du canevas dans la page (barre latérale, en-tête : constat F6)', () => {
    const g = geo(0);
    const a = clientToWorld(500, 400, { left: 0, top: 0 }, g);
    const b = clientToWorld(500 + 256, 400 + 64, { left: 256, top: 64 }, g);
    expectClose(a, b);
  });

  it('localToView et viewToLocal sont inverses, exacts pour les quarts de tour', () => {
    const g = geo(-90);
    const p = { x: 123, y: 45 };
    expect(viewToLocal(localToView(p, g), g)).toEqual(p);
    // À −90° autour du centre (450, 320) : (123, 45) → vue
    expect(localToView(p, g)).toEqual({ x: 450 + 275, y: 320 - 327 });
  });
});

describe('zoom et pan', () => {
  it.each(ROTATIONS)('le zoom molette garde fixe le point monde sous le curseur (%s°)', rotation => {
    const g = geo(rotation);
    const client = { x: 700, y: 333 };
    const before = clientToWorld(client.x, client.y, ORIGIN, g);
    const anchor = localToView({ x: client.x - ORIGIN.left, y: client.y - ORIGIN.top }, g);
    const zoomed: ViewGeometry = { ...g, viewport: zoomViewportAt(g.viewport, anchor, g.viewport.zoom * 1.6) };
    expectClose(clientToWorld(client.x, client.y, ORIGIN, zoomed), before);
  });

  it.each(ROTATIONS)('le plan suit le pointeur pendant un pan (%s°)', rotation => {
    const g = geo(rotation);
    const start = { x: 640, y: 300 };
    const grabbed = clientToWorld(start.x, start.y, ORIGIN, g);
    const delta = { x: 85, y: -37 };
    const pos = panViewport(g.viewport, delta, rotation);
    const panned: ViewGeometry = { ...g, viewport: { ...g.viewport, x: pos.x, y: pos.y } };
    expectClose(clientToWorld(start.x + delta.x, start.y + delta.y, ORIGIN, panned), grabbed);
  });

  it('pincement : le point sous le milieu des doigts suit le milieu, zoom proportionnel à l\'écartement', () => {
    const g = geo(90);
    const startMid = { x: 400, y: 300 };
    const endMid = { x: 460, y: 280 };
    const world = clientToWorld(startMid.x + ORIGIN.left, startMid.y + ORIGIN.top, ORIGIN, g);
    const viewport = pinchViewport(g.viewport, localToView(startMid, g), localToView(endMid, g), 2, g.pixelsPerMeter);
    expect(viewport.zoom).toBeCloseTo(3.4);
    expectClose(clientToWorld(endMid.x + ORIGIN.left, endMid.y + ORIGIN.top, ORIGIN, { ...g, viewport }), world);
  });

  it('bornes de zoom identiques à 0,15–8 pour 50 px/m, proportionnelles sinon (constat F71)', () => {
    expect(zoomLimits(50)).toEqual({ min: 0.15, max: 8 });
    expect(zoomLimits(1250).max).toBeCloseTo(0.32);
    expect(clampZoom(20, 50)).toBe(8);
    expect(clampZoom(0.01, 50)).toBe(0.15);
    expect(clampZoom(Number.NaN, 50)).toBe(1);
  });

  it('facteur de zoom continu et symétrique (constat F122)', () => {
    expect(wheelZoomFactor(0, false)).toBe(1);
    expect(wheelZoomFactor(-100, false)).toBeGreaterThan(1);
    expect(wheelZoomFactor(100, false) * wheelZoomFactor(-100, false)).toBeCloseTo(1);
    // Un léger glissement de pavé tactile ne change presque pas le zoom
    expect(wheelZoomFactor(4, false)).toBeGreaterThan(0.99);
    // Une rafale énorme est bornée
    expect(wheelZoomFactor(-100000, false)).toBe(wheelZoomFactor(-240, false));
    // Ctrl + cran de souris : pas plus d'un facteur 1,3 par événement ; pincement fin du pavé tactile proportionnel
    expect(wheelZoomFactor(-100, true)).toBeLessThan(1.3);
    expect(wheelZoomFactor(-5, true)).toBeCloseTo(Math.exp(0.05));
    expect(wheelDeltaPixels(3, 1, 800)).toBe(48);
    expect(wheelDeltaPixels(1, 2, 700)).toBe(700);
  });
});

describe('cadrage (fitToScreen, v1.0.28)', () => {
  const bounds = { minX: -1, minY: 2, width: 12, height: 6 };
  const size = { width: 1000, height: 600 };

  it('centre le plan au centre du canevas', () => {
    const viewport = fitViewport(bounds, 50, size, 0, 60);
    const g = geo(0, { viewport, size });
    expectClose(worldToView({ x: 5, y: 5 }, g), { x: 500, y: 300 });
  });

  it('reproduit la formule historique à 50 px/m', () => {
    const viewport = fitViewport(bounds, 50, size, 0, 60);
    const zoom = Math.min((1000 - 120) / (12 * 50), (600 - 120) / (6 * 50));
    expect(viewport.zoom).toBeCloseTo(Math.min(Math.max(zoom, 0.2), 2.5));
  });

  it.each([90, 270, -90, -270])('transpose largeur et hauteur à %s°', rotation => {
    const viewport = fitViewport(bounds, 50, size, rotation, 60);
    const zoom = Math.min((1000 - 120) / (6 * 50), (600 - 120) / (12 * 50));
    expect(viewport.zoom).toBeCloseTo(zoom);
  });
});

describe('suivi des pointeurs', () => {
  it('reconnaît deux doigts et le seuil de tap', () => {
    const tracker = new PointerTracker();
    tracker.set(1, 10, 10, 'touch');
    expect(tracker.pair()).toBeNull();
    tracker.set(2, 50, 10, 'touch');
    expect(tracker.pair()?.ids).toEqual([1, 2]);
    tracker.move(2, 60, 10);
    expect(tracker.get(2)).toEqual({ x: 60, y: 10 });
    tracker.delete(1);
    expect(tracker.size).toBe(1);
    expect(exceedsTapSlop({ x: 0, y: 0 }, { x: 3, y: 0 }, 'mouse')).toBe(false);
    expect(exceedsTapSlop({ x: 0, y: 0 }, { x: 4, y: 0 }, 'mouse')).toBe(true);
    expect(exceedsTapSlop({ x: 0, y: 0 }, { x: 8, y: 0 }, 'touch')).toBe(false);
  });
});

describe('sélection', () => {
  it('ajoute, retire, réduit et compare', () => {
    const wallA = { kind: 'wall' as const, id: 'a' };
    const wallB = { kind: 'wall' as const, id: 'b' };
    let sel = selectOnly(wallA);
    sel = addToSelection(sel, wallB);
    expect(sel.wallIds).toEqual(['a', 'b']);
    expect(isSelected(sel, wallB)).toBe(true);
    expect(addToSelection(sel, wallB)).toBe(sel);
    sel = removeFromSelection(sel, wallA);
    expect(sel.wallIds).toEqual(['b']);
    expect(selectionCount(sel)).toBe(1);
    expect(sameSelection(sel, selectOnly(wallB))).toBe(true);
    expect(sameSelection(emptySelection(), { wallIds: [], openingIds: [], roomIds: [], bindingIds: [] })).toBe(true);
  });

  it('purge les identifiants disparus (constat F130)', () => {
    const project = makeProject({ rooms: [] });
    const sel = { ...emptySelection(), wallIds: ['w1', 'ghost'], roomIds: ['deleted-room'] };
    const pruned = pruneSelection(sel, project);
    expect(pruned.wallIds).toEqual(['w1']);
    expect(pruned.roomIds).toEqual([]);
    const clean = selectOnly({ kind: 'wall', id: 'w1' });
    expect(pruneSelection(clean, project)).toBe(clean);
  });
});

// ------------------------------------------------------------------
// Édition du plan
// ------------------------------------------------------------------

/** Pièce 4 × 3 m fermée par 4 murs, une porte sur le mur du bas, une entité et un meuble dedans. */
function makeProject(overrides: Partial<HomeArchitectProject> = {}): HomeArchitectProject {
  const p = [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 3 }, { x: 0, y: 3 }];
  const walls: Wall[] = [
    { id: 'w1', start: p[0], end: p[1], thickness: 0.2, type: 'standard' },
    { id: 'w2', start: p[1], end: p[2], thickness: 0.2, type: 'standard' },
    { id: 'w3', start: p[2], end: p[3], thickness: 0.2, type: 'standard' },
    { id: 'w4', start: p[3], end: p[0], thickness: 0.2, type: 'standard' }
  ];
  const openings: Opening[] = [
    { id: 'door', wallId: 'w3', type: 'door', offset: 1, width: 0.9, flipSide: false, flipDirection: false }
  ];
  const rooms: Room[] = [{ id: 'r1', name: 'Salon', polygon: p.map(q => ({ ...q })), areaM2: 12 }];
  return {
    id: 'plan_test0001',
    name: 'Test',
    created_at: '',
    updated_at: '',
    pixelsPerMeter: 50,
    grid: { size: 0.5, subdivisions: 2, snapToGrid: true, snapToAngles: true, snapToElements: true },
    walls,
    openings,
    rooms,
    bindings: [{ id: 'b1', entityId: 'light.salon', position: { x: 1, y: 1 }, roomId: 'r1' }],
    furniture: [{
      id: 'f1', type: 'sofa', name: 'Canapé', category: 'seating', position: { x: 2, y: 1.5 },
      width: 2, length: 0.9, rotation: 0, roomId: 'r1'
    }],
    ...overrides
  };
}

const wall = (p: HomeArchitectProject, id: string) => p.walls.find(w => w.id === id) as Wall;

describe('déplacement de murs : jonctions préservées et pièces mises à jour (constat F45)', () => {
  it('les murs connectés suivent et la pièce se déforme, surface recalculée', () => {
    const project = makeProject();
    const set = buildMoveSet(project, selectOnly({ kind: 'wall', id: 'w2' }));
    const next = translateSelection(project, set, { x: 0.5, y: 0 });
    expect(next).not.toBeNull();
    const moved = next as HomeArchitectProject;
    expect(wall(moved, 'w2')).toMatchObject({ start: { x: 4.5, y: 0 }, end: { x: 4.5, y: 3 } });
    expect(wall(moved, 'w1').end).toEqual({ x: 4.5, y: 0 });
    expect(wall(moved, 'w3').start).toEqual({ x: 4.5, y: 3 });
    expect(wall(moved, 'w4')).toBe(wall(project, 'w4'));
    expect(moved.rooms[0].polygon).toEqual([{ x: 0, y: 0 }, { x: 4.5, y: 0 }, { x: 4.5, y: 3 }, { x: 0, y: 3 }]);
    expect(moved.rooms[0].areaM2).toBe(13.5);
    // La porte du mur du bas (dont l'extrémité de départ a bougé) garde sa distance à l'extrémité fixe
    expect(moved.openings[0].offset).toBeCloseTo(1.5);
    // Le projet d'origine n'est jamais modifié
    expect(wall(project, 'w2').start).toEqual({ x: 4, y: 0 });
  });

  it('refuse un déplacement qui écraserait un mur connecté', () => {
    const project = makeProject();
    const set = buildMoveSet(project, selectOnly({ kind: 'wall', id: 'w2' }));
    expect(translateSelection(project, set, { x: -4, y: 0 })).toBeNull();
  });

  it('extrémité de mur : les murs joints et le sommet de la pièce suivent', () => {
    const project = makeProject();
    const next = moveWallEndpoint(project, 'w1', 'end', { x: 5, y: 0 }) as HomeArchitectProject;
    expect(wall(next, 'w1').end).toEqual({ x: 5, y: 0 });
    expect(wall(next, 'w2').start).toEqual({ x: 5, y: 0 });
    expect(next.rooms[0].polygon[1]).toEqual({ x: 5, y: 0 });
    expect(next.rooms[0].areaM2).toBe(13.5);
  });
});

describe('déplacement de pièce (constat F5)', () => {
  it('la pièce entraîne ses murs, ses ouvertures, ses entités et ses meubles', () => {
    const project = makeProject();
    expect(roomWallIds(project.rooms[0], project.walls).sort()).toEqual(['w1', 'w2', 'w3', 'w4']);
    const set = buildMoveSet(project, selectOnly({ kind: 'room', id: 'r1' }));
    expect(set.furnitureIds).toEqual(['f1']);
    expect(set.bindingIds).toEqual(['b1']);
    const next = translateSelection(project, set, { x: 6, y: 1 }) as HomeArchitectProject;
    expect(next.rooms[0].polygon[0]).toEqual({ x: 6, y: 1 });
    expect(next.rooms[0].areaM2).toBe(12);
    expect(wall(next, 'w3')).toMatchObject({ start: { x: 10, y: 4 }, end: { x: 6, y: 4 } });
    expect(next.openings[0].offset).toBe(1);
    expect(next.bindings[0]).toMatchObject({ position: { x: 7, y: 2 }, roomId: 'r1' });
    expect(next.furniture?.[0]).toMatchObject({ position: { x: 8, y: 2.5 }, roomId: 'r1' });
  });

  it('sommet de pièce : surface recalculée, contour croisé refusé', () => {
    const project = makeProject();
    const next = moveRoomVertex(project, 'r1', 2, { x: 4, y: 4 }) as HomeArchitectProject;
    expect(next.rooms[0].areaM2).toBe(14);
    expect(moveRoomVertex(project, 'r1', 1, { x: 0, y: 4 })).toBeNull();
  });
});

describe('roomId recalculé quand les pièces changent (constat F147)', () => {
  it('rattache les entités et meubles à la plus petite pièce qui les contient', () => {
    const project = makeProject({
      bindings: [{ id: 'b1', entityId: 'light.salon', position: { x: 1, y: 1 } }, { id: 'b2', entityId: 'light.dehors', position: { x: 9, y: 9 }, roomId: 'r1' }]
    });
    const next = reassignRooms(project);
    expect(next.bindings[0].roomId).toBe('r1');
    expect('roomId' in next.bindings[1]).toBe(false);
    expect(reassignRooms(next)).toBe(next);
  });
});

describe('ouvertures bornées au mur (constats F44, F131)', () => {
  it('glisser une ouverture la garde dans le mur et refuse un chevauchement', () => {
    const base = makeProject();
    const project: HomeArchitectProject = {
      ...base,
      openings: [...base.openings, { id: 'win', wallId: 'w3', type: 'window', offset: 3, width: 0.9, flipSide: false, flipDirection: false }]
    };
    const clamped = slideOpening(project, 'door', -5) as HomeArchitectProject;
    const door = clamped.openings.find(o => o.id === 'door') as Opening;
    expect(door.offset - door.width / 2).toBeGreaterThanOrEqual(0.15 - 1e-9);
    expect(slideOpening(project, 'door', 2.8)).toBeNull();
  });
});

describe('outils pièce (constat F46)', () => {
  it('valide le contour', () => {
    expect(roomPolygonIssue([{ x: 0, y: 0 }, { x: 1, y: 0 }])).toBe('too-few');
    expect(roomPolygonIssue([{ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 0 }, { x: 0, y: 2 }])).toBe('self-intersecting');
    expect(roomPolygonIssue([{ x: 0, y: 0 }, { x: 0.2, y: 0 }, { x: 0.2, y: 0.2 }])).toBe('too-small');
    expect(roomPolygonIssue(rectanglePolygon({ x: 3, y: 2 }, { x: 0, y: 0 }))).toBeNull();
  });

  it('crée une pièce nommée, surface à l\'axe, sommets dédoublonnés', () => {
    const rooms = makeProject().rooms;
    expect(nextRoomName(rooms)).toBe('Pièce 2');
    const room = createRoom([{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 2 }, { x: 0, y: 2 }, { x: 0, y: 0 }], rooms);
    expect(room.polygon).toHaveLength(4);
    expect(room.areaM2).toBe(6);
    expect(room.id).toMatch(/^room_[a-z0-9]{10}$/);
  });
});

describe('dépôt depuis le volet (constats F123, F138)', () => {
  it('n\'accepte que les données émises par le volet', () => {
    expect(parseDrawerPayload({ kind: 'entity', entityId: 'light.salon', domain: 'light' })).toEqual({ kind: 'entity', entityId: 'light.salon', domain: 'light' });
    expect(parseDrawerPayload({ kind: 'entity' })).toBeNull();
    expect(parseDrawerPayload({ kind: 'entity', entityId: 'Not An Entity' })).toBeNull();
    expect(parseDrawerPayload({ entityId: 'light.salon' })).toBeNull();
    expect(parseDrawerPayload({ kind: 'furniture', furnitureType: 'sofa_3p' })).toEqual({ kind: 'furniture', furnitureType: 'sofa_3p' });
    expect(parseDrawerPayload({ kind: 'furniture', furnitureType: 'inconnu' })).toBeNull();
    expect(parseDrawerPayload(null)).toBeNull();
    expect(parseDrawerPayload([1, 2])).toBeNull();
  });

  it('crée une liaison sans nom, icône ni action figés, rattachée à sa pièce', () => {
    const rooms = makeProject().rooms;
    const binding = createBinding('light.salon', { x: 1.23456, y: 2 }, rooms);
    expect(binding).toEqual({ id: binding.id, entityId: 'light.salon', position: { x: 1.235, y: 2 }, roomId: 'r1' });
    expect(binding.id).toMatch(/^bind_[a-z0-9]{10}$/);
    expect(createFurniture('sofa_3p', { x: 9, y: 9 }, rooms)).toMatchObject({ type: 'sofa_3p', rotation: 0, position: { x: 9, y: 9 } });
    expect(createFurniture('inconnu', { x: 0, y: 0 }, rooms)).toBeNull();
  });
});

describe('mise à l\'échelle : accrochage de mesure (constat F140)', () => {
  it('sommet, sinon projection sur un mur, sinon point brut non arrondi', () => {
    const walls = makeProject().walls;
    expect(snapMeasurePoint({ x: 4.05, y: 0.02 }, walls, 50, false)).toMatchObject({ snappedTo: 'vertex', point: { x: 4, y: 0 } });
    expect(snapMeasurePoint({ x: 2.123, y: 0.08 }, walls, 50, false)).toMatchObject({ snappedTo: 'wall', point: { x: 2.123, y: 0 } });
    expect(snapMeasurePoint({ x: 2.1234, y: 1.5 }, walls, 50, false)).toMatchObject({ snappedTo: 'none', point: { x: 2.1234, y: 1.5 } });
    expect(snapMeasurePoint({ x: 4.05, y: 0.02 }, walls, 50, true).snappedTo).toBe('none');
  });
});
