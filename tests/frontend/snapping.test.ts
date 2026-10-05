import { describe, expect, it } from 'vitest';
import {
  GRID_SIZE_PRESETS, MIN_OPENING_WIDTH, OPENING_END_MARGIN, SNAP_TOLERANCES_PX, SnappingEngine
} from '../../src/core/snapping';
import { GridConfig, Opening, Wall } from '../../src/core/types';

const grid = (over: Partial<GridConfig> = {}): GridConfig => ({
  size: 0.5, subdivisions: 2, snapToGrid: true, snapToAngles: true, snapToElements: true, ...over
});

const wall = (id: string, x1: number, y1: number, x2: number, y2: number, thickness = 0.2): Wall => ({
  id, start: { x: x1, y: y1 }, end: { x: x2, y: y2 }, thickness, type: 'standard'
});

const opening = (id: string, wallId: string, offset: number, width: number): Opening => ({
  id, wallId, type: 'door', offset, width, flipSide: false, flipDirection: false
});

describe('constantes', () => {
  it('pas de grille dans les bornes de normalizeProject [0,05 ; 2]', () => {
    expect(GRID_SIZE_PRESETS.length).toBeGreaterThan(2);
    for (const size of GRID_SIZE_PRESETS) {
      expect(size).toBeGreaterThanOrEqual(0.05);
      expect(size).toBeLessThanOrEqual(2);
    }
  });
});

describe('snapPoint : sommets', () => {
  const walls = [wall('a', 0, 0, 4, 0), wall('b', 4, 0, 4, 3)];

  it('accroche le sommet le plus proche et le renvoie tel quel', () => {
    const r = SnappingEngine.snapPoint({ x: 3.9, y: 0.12 }, grid(), walls);
    expect(r).toMatchObject({ point: { x: 4, y: 0 }, snappedTo: 'vertex', constraints: ['vertex'] });
  });

  it('tolérances en pixels écran, dépendantes du zoom (F125)', () => {
    const raw = { x: 4.15, y: 0.1 }; // à 18 cm du sommet (4 ; 0)
    // 50 px/m : 12 px = 24 cm → accroché.
    expect(SnappingEngine.snapPoint(raw, grid(), walls, undefined, { screenPixelsPerMeter: 50 }).snappedTo).toBe('vertex');
    // 400 px/m : 12 px = 3 cm → pas d'accrochage au sommet.
    expect(SnappingEngine.snapPoint(raw, grid(), walls, undefined, { screenPixelsPerMeter: 400 }).snappedTo).not.toBe('vertex');
    // Tolérance personnalisée.
    expect(SnappingEngine.snapPoint(raw, grid(), walls, undefined, { screenPixelsPerMeter: 400, vertexTolerancePx: 100 }).snappedTo).toBe('vertex');
    expect(SnappingEngine.metersFromPixels(SNAP_TOLERANCES_PX.vertex, 60)).toBeCloseTo(0.2, 9);
  });

  it('l’origine est exclue : un mur de 15 cm reste possible (F125)', () => {
    // Les guides passant par l'origine (x = 4 via (4 ; 3), y = 0 via (0 ; 0)) sont aussi ignorés.
    const r = SnappingEngine.snapPoint({ x: 4.15, y: 0.01 }, grid({ snapToGrid: false }), walls, { x: 4, y: 0 });
    expect(r.point).toEqual({ x: 4.15, y: 0 });
    expect(r.snappedTo).toBe('angle');
    expect(r.smartGuideX).toBeUndefined();
  });

  it('excludePoints et excludeWallIds (mur en cours de déplacement)', () => {
    const r1 = SnappingEngine.snapPoint({ x: 3.95, y: 0 }, grid({ snapToGrid: false, snapToAngles: false }), walls, undefined, { excludePoints: [{ x: 4, y: 0 }] });
    expect(r1.snappedTo).not.toBe('vertex');
    const r2 = SnappingEngine.snapPoint({ x: 4, y: 2.95 }, grid({ snapToGrid: false }), walls, undefined, { excludeWallIds: ['b'] });
    expect(r2.snappedTo).not.toBe('vertex');
  });

  it('ancien 5e paramètre numérique (rayon en mètres) toujours accepté', () => {
    expect(SnappingEngine.snapPoint({ x: 3.6, y: 0 }, grid(), walls, undefined, 0.5).snappedTo).toBe('vertex');
    expect(SnappingEngine.snapPoint({ x: 3.6, y: 0.3 }, grid(), walls, undefined, 0.1).snappedTo).not.toBe('vertex');
  });
});

describe('snapPoint : cascade non exclusive (F48)', () => {
  it('scénario de l’audit : guide X + angle 0° donnent (3 ; 0) et non (3 ; 0,07)', () => {
    const walls = [wall('a', 0, 0, 3, 2)];
    const r = SnappingEngine.snapPoint({ x: 3.10, y: 0.07 }, grid(), walls, { x: 0, y: 0 }, { screenPixelsPerMeter: 50 });
    expect(r.point).toEqual({ x: 3, y: 0 });
    expect(r.snappedTo).toBe('smart_guide');
    expect(r.constraints).toEqual(['smart_guide', 'angle']);
    expect(r.smartGuideX).toBe(3);
    expect(r.guideAngle).toBe(0);
  });

  it('guide sur un axe : la grille s’applique sur l’autre axe', () => {
    const walls = [wall('a', 1.3, 5, 1.3, 6)];
    const r = SnappingEngine.snapPoint({ x: 1.35, y: 2.2 }, grid({ snapToAngles: false }), walls);
    expect(r.point).toEqual({ x: 1.3, y: 2 });
    expect(r.constraints).toEqual(['smart_guide', 'grid']);
    expect(r.smartGuideY).toBeUndefined();
  });

  it('angle seul : longueur arrondie au pas de grille le long du rayon', () => {
    const r = SnappingEngine.snapPoint({ x: 2.23, y: 0.1 }, grid(), [], { x: 0, y: 0 });
    expect(r.point).toEqual({ x: 2, y: 0 });
    expect(r.constraints).toEqual(['angle', 'grid']);
    const diag = SnappingEngine.snapPoint({ x: 1.45, y: 1.38 }, grid(), [], { x: 0, y: 0 });
    expect(diag.guideAngle).toBe(45);
    expect(diag.point.x).toBeCloseTo(2 / Math.SQRT2, 3);
    expect(diag.point.y).toBeCloseTo(diag.point.x, 9);
  });

  it('angle sans grille : projection exacte sur le rayon', () => {
    const r = SnappingEngine.snapPoint({ x: 2.23, y: 0.1 }, grid({ snapToGrid: false }), [], { x: 0, y: 0 });
    expect(r.point).toEqual({ x: 2.23, y: 0 });
  });

  it('deux guides : intersection', () => {
    const walls = [wall('a', 2, 9, 2, 10), wall('b', 8, 3, 9, 3)];
    const r = SnappingEngine.snapPoint({ x: 2.1, y: 2.95 }, grid(), walls);
    expect(r.point).toEqual({ x: 2, y: 3 });
    expect(r).toMatchObject({ smartGuideX: 2, smartGuideY: 3 });
  });

  it('sans contrainte : grille absolue sur les deux axes, sans bruit flottant', () => {
    const r = SnappingEngine.snapPoint({ x: 0.29, y: 0.71 }, grid({ size: 0.1 }), []);
    expect(r).toMatchObject({ point: { x: 0.3, y: 0.7 }, snappedTo: 'grid' });
  });

  it('tout désactivé : point brut', () => {
    const r = SnappingEngine.snapPoint({ x: 1.234567, y: 2.5 }, grid({ snapToGrid: false, snapToAngles: false, snapToElements: false }), [wall('a', 1.2, 2.5, 5, 2.5)], { x: 0, y: 0 });
    expect(r).toMatchObject({ point: { x: 1.234567, y: 2.5 }, snappedTo: 'none' });
  });

  it('un point proche d’un guide mais loin de l’intersection ne saute pas', () => {
    // Guide Y à 0 (sommet (5 ; 0)) et rayon à 90° depuis (1 ; 5) : l'intersection (1 ; 0) est trop loin.
    const r = SnappingEngine.snapPoint({ x: 1.02, y: 0.1 }, grid({ snapToGrid: false }), [wall('a', 5, 0, 6, 0)], { x: 1, y: 5 });
    expect(r.point.y).toBeCloseTo(0, 9);
    expect(r.constraints).toEqual(['smart_guide', 'angle']);
    const far = SnappingEngine.snapPoint({ x: 1.6, y: 0.1 }, grid({ snapToGrid: false }), [wall('a', 5, 0, 6, 0)], { x: 1, y: 5 });
    expect(far.constraints).toEqual(['smart_guide']);
    expect(far.point).toEqual({ x: 1.6, y: 0 });
  });
});

describe('snapPoint : guide le plus proche (F144)', () => {
  it('retient le sommet le plus proche sur chaque axe, pas le premier trouvé', () => {
    const walls = [wall('a', 2.0, 10, 2.0, 11), wall('b', 2.12, 20, 2.12, 21)];
    const r = SnappingEngine.snapPoint({ x: 2.12, y: 5 }, grid({ snapToGrid: false }), walls);
    expect(r.smartGuideX).toBe(2.12);
    expect(r.point.x).toBe(2.12);
  });
});

describe('snapPoint : jonction en T sur un mur (F145)', () => {
  it('une cloison s’accroche à l’axe du mur (y = 0,15), perpendiculaire', () => {
    const walls = [wall('ext', 0, 0.15, 6, 0.15, 0.3)];
    const r = SnappingEngine.snapPoint({ x: 2.23, y: 0.05 }, grid(), walls, { x: 2.2, y: 2 }, { screenPixelsPerMeter: 50 });
    expect(r.point).toEqual({ x: 2.2, y: 0.15 });
    expect(r.constraints).toEqual(['wall', 'angle']);
    expect(r.wallId).toBe('ext');
  });

  it('premier point sur un mur : grille le long du mur', () => {
    const walls = [wall('ext', 0, 0.15, 6, 0.15, 0.3)];
    const r = SnappingEngine.snapPoint({ x: 2.38, y: 0.2 }, grid(), walls, undefined, { screenPixelsPerMeter: 50 });
    expect(r.point).toEqual({ x: 2.5, y: 0.15 });
    expect(r.constraints).toEqual(['wall', 'grid']);
  });

  it('mur oblique : position quantifiée le long du mur et bornée au segment', () => {
    const walls = [wall('obl', 0, 0, 3, 4, 0.2)]; // longueur 5
    const r = SnappingEngine.snapPoint({ x: 1.85, y: 2.4 }, grid({ size: 1 }), walls, undefined, { screenPixelsPerMeter: 50 });
    expect(r.snappedTo).toBe('wall');
    expect(r.point.x).toBeCloseTo(1.8, 3);
    expect(r.point.y).toBeCloseTo(2.4, 3);
  });

  it('milieu de mur', () => {
    const r = SnappingEngine.snapPoint({ x: 3.05, y: 0.08 }, grid(), [wall('a', 0, 0, 6, 0)], undefined, { screenPixelsPerMeter: 50 });
    expect(r).toMatchObject({ point: { x: 3, y: 0 }, snappedTo: 'midpoint', wallId: 'a' });
  });

  it('le mur passant par l’origine est ignoré (court retour perpendiculaire possible)', () => {
    const walls = [wall('a', 0, 0, 6, 0, 0.3)];
    const r = SnappingEngine.snapPoint({ x: 2.01, y: 0.12 }, grid({ snapToGrid: false }), walls, { x: 2, y: 0 }, { screenPixelsPerMeter: 50 });
    expect(r.snappedTo).toBe('angle');
    expect(r.point).toEqual({ x: 2, y: 0.12 });
  });

  it('hors du corps du mur au-delà de la tolérance : pas d’accrochage', () => {
    const r = SnappingEngine.snapPoint({ x: 2.2, y: 1 }, grid({ snapToGrid: false }), [wall('a', 0, 0, 6, 0)], undefined, { screenPixelsPerMeter: 50 });
    expect(r.snappedTo).toBe('none');
  });
});

describe('snapPointToWall', () => {
  const walls = [wall('a', 0, 0, 4, 0, 0.4)];

  it('distance à l’axe par défaut, à la face avec measureFromFace', () => {
    expect(SnappingEngine.snapPointToWall({ x: 1, y: 0.3 }, walls, 0.2)).toBeNull();
    const r = SnappingEngine.snapPointToWall({ x: 1, y: 0.3 }, walls, 0.2, { measureFromFace: true });
    expect(r).toMatchObject({ offset: 1, projectionPoint: { x: 1, y: 0 } });
    expect(r?.distance).toBeCloseTo(0.3, 9);
  });

  it('choisit le mur le plus proche', () => {
    const r = SnappingEngine.snapPointToWall({ x: 1, y: 0.9 }, [...walls, wall('b', 0, 1, 4, 1)], 0.6);
    expect(r?.wall.id).toBe('b');
  });
});

describe('fitOpening (F44)', () => {
  const corner = [wall('a', 0, 0, 4, 0, 0.2), wall('perp', 0, 0, 0, 3, 0.2)];

  it('scénario de l’audit : porte de 0,90 m à 0,20 m de l’angle ramenée hors du mur perpendiculaire', () => {
    const fit = SnappingEngine.fitOpening(corner[0], 0.2, 0.9, { walls: corner });
    expect(fit.fits).toBe(true);
    expect(fit.adjusted).toBe(true);
    expect(fit.width).toBe(0.9);
    expect(fit.offset).toBeCloseTo(0.1 + OPENING_END_MARGIN + 0.45, 9);
    expect(fit.usableStart).toBeCloseTo(0.15, 9);
    expect(fit.usableEnd).toBeCloseTo(4 - OPENING_END_MARGIN, 9);
  });

  it('jonction en T à l’extrémité : demi-épaisseur réservée', () => {
    const walls = [wall('a', 0, 0, 4, 0, 0.2), wall('t', -2, 4, 6, 4, 0.4)];
    const side = wall('side', 1, 0, 1, 4, 0.1);
    const fit = SnappingEngine.fitOpening(side, 3.9, 0.8, { walls: [...walls, side] });
    expect(fit.offset).toBeCloseTo(4 - 0.2 - OPENING_END_MARGIN - 0.4, 9);
  });

  it('porte-fenêtre de 2 m sur un mur de 0,6 m : largeur réduite', () => {
    const fit = SnappingEngine.fitOpening(wall('court', 0, 0, 0.6, 0), 0.3, 2);
    expect(fit.fits).toBe(true);
    expect(fit.width).toBeCloseTo(0.5, 9);
    expect(fit.offset).toBeCloseTo(0.3, 9);
  });

  it('mur trop court : refusé', () => {
    const fit = SnappingEngine.fitOpening(wall('mini', 0, 0, 0.3, 0), 0.15, 0.9, { walls: [wall('mini', 0, 0, 0.3, 0), wall('p', 0, -1, 0, 1)] });
    expect(fit.fits).toBe(false);
    expect(fit.width).toBeLessThan(MIN_OPENING_WIDTH);
  });

  it('ouverture déjà correcte : inchangée', () => {
    const fit = SnappingEngine.fitOpening(corner[0], 2, 0.9, { walls: corner });
    expect(fit).toMatchObject({ offset: 2, width: 0.9, fits: true, adjusted: false, overlaps: [] });
  });

  it('chevauchements sur le même mur, en ignorant l’ouverture déplacée et les autres murs', () => {
    const openings = [opening('o1', 'a', 2, 0.9), opening('o2', 'a', 3.4, 0.8), opening('autre', 'b', 2, 1)];
    // [2,15 ; 3,05] chevauche o1 [1,55 ; 2,45] et o2 [3,0 ; 3,8].
    expect(SnappingEngine.fitOpening(corner[0], 2.6, 0.9, { walls: corner, openings }).overlaps).toEqual(['o1', 'o2']);
    expect(SnappingEngine.fitOpening(corner[0], 2.6, 0.9, { walls: corner, openings, ignoreOpeningId: 'o1' }).overlaps).toEqual(['o2']);
    // Ouvertures bord à bord : pas de chevauchement.
    expect(SnappingEngine.fitOpening(corner[0], 1.1, 0.9, { walls: corner, openings: [openings[0]] }).overlaps).toEqual([]);
  });

  it('valeurs non finies : repli au centre du mur et largeur minimale', () => {
    const fit = SnappingEngine.fitOpening(wall('a', 0, 0, 4, 0), Number.NaN, Number.NaN);
    expect(fit.offset).toBe(2);
    expect(fit.width).toBe(MIN_OPENING_WIDTH);
  });
});

describe('utilitaires', () => {
  it('quantize, roundPoint, wallLength', () => {
    expect(SnappingEngine.quantize(0.29, 0.1)).toBe(0.3);
    expect(SnappingEngine.quantize(-1.26, 0.25)).toBe(-1.25);
    expect(SnappingEngine.quantize(1.234, 0)).toBe(1.234);
    expect(SnappingEngine.roundPoint({ x: 0.1 * 3, y: -0.0001 })).toEqual({ x: 0.3, y: 0 });
    expect(SnappingEngine.wallLength(wall('a', 0, 0, 3, 4))).toBe(5);
  });
});
