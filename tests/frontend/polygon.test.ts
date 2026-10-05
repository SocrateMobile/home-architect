import { describe, expect, it } from 'vitest';
import { PolygonUtils } from '../../src/core/polygon';
import { Point, Room, Wall } from '../../src/core/types';

const rectPoly = (x: number, y: number, w: number, h: number): Point[] => [
  { x, y }, { x: x + w, y }, { x: x + w, y: y + h }, { x, y: y + h }
];

/** Pièce en L : 4 × 4 m moins le carré 3 × 3 m en haut à droite (aire 7 m²). */
const L_SHAPE: Point[] = [
  { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 3 }, { x: 4, y: 3 }, { x: 4, y: 4 }, { x: 0, y: 4 }
];

/** Pièce en U (aire 8 m²) : la moyenne des sommets et le centroïde tombent dans l'échancrure. */
const U_SHAPE: Point[] = [
  { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 0 }, { x: 4, y: 0 },
  { x: 4, y: 4 }, { x: 0, y: 4 }
];

const room = (id: string, polygon: Point[]): Room => ({ id, name: id, polygon, areaM2: PolygonUtils.computeArea(polygon) });

const wall = (id: string, x1: number, y1: number, x2: number, y2: number, thickness = 0.2): Wall => ({
  id, start: { x: x1, y: y1 }, end: { x: x2, y: y2 }, thickness, type: 'standard'
});

describe('computeArea / signedArea', () => {
  it('formule du lacet, arrondie au centième', () => {
    expect(PolygonUtils.computeArea(rectPoly(0, 0, 4, 3))).toBe(12);
    expect(PolygonUtils.computeArea(L_SHAPE)).toBe(7);
    expect(PolygonUtils.computeArea([{ x: 0, y: 0 }, { x: 1, y: 1 }])).toBe(0);
  });

  it('le signe dépend du sens de parcours', () => {
    const poly = rectPoly(0, 0, 2, 2);
    expect(PolygonUtils.signedArea(poly)).toBe(4);
    expect(PolygonUtils.signedArea([...poly].reverse())).toBe(-4);
  });
});

describe('calculateCentroid (F124)', () => {
  it('centre d’un rectangle', () => {
    expect(PolygonUtils.calculateCentroid(rectPoly(1, 2, 4, 2))).toEqual({ x: 3, y: 3 });
  });

  it('centroïde de surface et non moyenne des sommets', () => {
    // Rectangle avec un sommet intermédiaire sur une arête : la moyenne des sommets serait décalée.
    const poly = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 2 }, { x: 0, y: 2 }];
    const c = PolygonUtils.calculateCentroid(poly);
    expect(c.x).toBeCloseTo(2, 9);
    expect(c.y).toBeCloseTo(1, 9);
  });

  it('pièce en L : centroïde de surface exact', () => {
    // Bande verticale 1×3 (centre 0,5 ; 1,5) + bande horizontale 4×1 (centre 2 ; 3,5).
    const c = PolygonUtils.calculateCentroid(L_SHAPE);
    expect(c.x).toBeCloseTo((3 * 0.5 + 4 * 2) / 7, 9);
    expect(c.y).toBeCloseTo((3 * 1.5 + 4 * 3.5) / 7, 9);
  });

  it('polygone dégénéré : moyenne des sommets', () => {
    expect(PolygonUtils.calculateCentroid([{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 4, y: 0 }])).toEqual({ x: 2, y: 0 });
    expect(PolygonUtils.calculateCentroid([])).toEqual({ x: 0, y: 0 });
  });

  it('reste précis loin de l’origine', () => {
    const c = PolygonUtils.calculateCentroid(rectPoly(100000, 100000, 2, 2));
    expect(c.x).toBeCloseTo(100001, 6);
    expect(c.y).toBeCloseTo(100001, 6);
  });
});

describe('labelPoint / poleOfInaccessibility (F124)', () => {
  it('rectangle : le centre', () => {
    const p = PolygonUtils.labelPoint(rectPoly(0, 0, 4, 3));
    expect(p.x).toBeCloseTo(2, 6);
    expect(p.y).toBeCloseTo(1.5, 6);
  });

  it('pôle d’inaccessibilité d’un rectangle', () => {
    const pole = PolygonUtils.poleOfInaccessibility(rectPoly(0, 0, 6, 2));
    expect(pole.distance).toBeCloseTo(1, 1);
    expect(pole.point.y).toBeCloseTo(1, 1);
  });

  it('pièces concaves : l’étiquette est toujours à l’intérieur, loin des murs', () => {
    for (const poly of [L_SHAPE, U_SHAPE]) {
      const p = PolygonUtils.labelPoint(poly);
      expect(PolygonUtils.isPointInPolygon(p, poly)).toBe(true);
      expect(PolygonUtils.distanceToBoundary(p, poly)).toBeGreaterThan(0.3);
    }
    // Le centroïde du U tombe dans l'échancrure : l'étiquette ne doit pas l'utiliser.
    expect(PolygonUtils.isPointInPolygon(PolygonUtils.calculateCentroid(U_SHAPE), U_SHAPE)).toBe(false);
  });

  it('bras de même largeur : l’étiquette est au milieu du bras le plus proche du centroïde, pas dans un angle', () => {
    const u = PolygonUtils.labelPoint(U_SHAPE);
    expect(u.x).toBeCloseTo(2, 1);
    expect(u.y).toBeCloseTo(3.5, 1);
    const l = PolygonUtils.labelPoint(L_SHAPE);
    expect(l.y).toBeCloseTo(3.5, 1);
    expect(l.x).toBeGreaterThan(1.2);
    expect(l.x).toBeLessThan(2);
  });

  it('renvoie une copie (le cache n’est pas exposé) et suit les modifications du polygone', () => {
    const poly = rectPoly(0, 0, 4, 4);
    const a = PolygonUtils.labelPoint(poly);
    a.x = 999;
    expect(PolygonUtils.labelPoint(poly).x).toBeCloseTo(2, 6);
    poly[1].x = 8;
    poly[2].x = 8;
    expect(PolygonUtils.labelPoint(poly).x).toBeCloseTo(4, 6);
  });

  it('polygones dégénérés sans erreur', () => {
    expect(PolygonUtils.labelPoint([])).toEqual({ x: 0, y: 0 });
    expect(PolygonUtils.poleOfInaccessibility([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }]).distance).toBe(0);
  });
});

describe('containsPoint / findRoomContainingPoint (F146)', () => {
  it('le contour compte comme intérieur', () => {
    const poly = rectPoly(0, 0, 4, 3);
    expect(PolygonUtils.containsPoint({ x: 4, y: 1 }, poly)).toBe(true);
    expect(PolygonUtils.containsPoint({ x: 0, y: 0 }, poly)).toBe(true);
    expect(PolygonUtils.containsPoint({ x: 4.01, y: 1 }, poly)).toBe(false);
    expect(PolygonUtils.isPointOnBoundary({ x: 2, y: 1 }, poly)).toBe(false);
  });

  it('pièces imbriquées : la plus petite l’emporte, quel que soit l’ordre', () => {
    const salon = room('salon', rectPoly(0, 0, 10, 8));
    const chambre = room('chambre', rectPoly(1, 1, 3, 3));
    expect(PolygonUtils.findRoomContainingPoint({ x: 2, y: 2 }, [salon, chambre])?.id).toBe('chambre');
    expect(PolygonUtils.findRoomContainingPoint({ x: 2, y: 2 }, [chambre, salon])?.id).toBe('chambre');
    expect(PolygonUtils.findRoomContainingPoint({ x: 8, y: 6 }, [salon, chambre])?.id).toBe('salon');
  });

  it('arête partagée : règle déterministe (plus petite pièce)', () => {
    const a = room('a', rectPoly(0, 0, 4, 4));
    const b = room('b', rectPoly(4, 0, 2, 4));
    expect(PolygonUtils.findRoomContainingPoint({ x: 4, y: 2 }, [a, b])?.id).toBe('b');
    expect(PolygonUtils.findRoomContainingPoint({ x: 4, y: 2 }, [b, a])?.id).toBe('b');
  });

  it('à surface égale : la première du tableau ; hors de toute pièce : null', () => {
    const a = room('a', rectPoly(0, 0, 2, 2));
    const b = room('b', rectPoly(2, 0, 2, 2));
    expect(PolygonUtils.findRoomContainingPoint({ x: 2, y: 1 }, [a, b])?.id).toBe('a');
    expect(PolygonUtils.findRoomContainingPoint({ x: 9, y: 9 }, [a, b])).toBeNull();
    expect(PolygonUtils.findRoomContainingPoint({ x: 1, y: 1 }, [])).toBeNull();
  });
});

describe('auto-intersections (F170)', () => {
  it('détecte un nœud papillon', () => {
    const bowtie = [{ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 0 }, { x: 0, y: 2 }];
    expect(PolygonUtils.computeArea(bowtie)).toBe(0);
    const hits = PolygonUtils.findSelfIntersections(bowtie);
    expect(hits).toHaveLength(1);
    expect(hits[0].point.x).toBeCloseTo(1, 9);
    expect(hits[0].point.y).toBeCloseTo(1, 9);
    expect(PolygonUtils.isSelfIntersecting(bowtie)).toBe(true);
  });

  it('polygones simples, convexes ou concaves : aucun croisement', () => {
    expect(PolygonUtils.isSelfIntersecting(rectPoly(0, 0, 4, 3))).toBe(false);
    expect(PolygonUtils.isSelfIntersecting(L_SHAPE)).toBe(false);
    expect(PolygonUtils.isSelfIntersecting(U_SHAPE)).toBe(false);
    // Sommet intermédiaire colinéaire et sommet répété : pas un défaut.
    expect(PolygonUtils.isSelfIntersecting([{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 2 }, { x: 0, y: 2 }])).toBe(false);
  });

  it('détecte un aller-retour sur une arête et un contact en un sommet', () => {
    expect(PolygonUtils.isSelfIntersecting([{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 2 }])).toBe(true);
    // Deux carrés reliés par un sommet commun (figure en 8).
    expect(PolygonUtils.isSelfIntersecting([
      { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 1, y: 2 }, { x: 1, y: 1 }, { x: 0, y: 1 }
    ])).toBe(true);
  });
});

describe('offsetPolygon', () => {
  it('décale un rectangle vers l’intérieur, quel que soit le sens de parcours', () => {
    for (const poly of [rectPoly(0, 0, 4, 3), [...rectPoly(0, 0, 4, 3)].reverse()]) {
      const inner = PolygonUtils.offsetPolygon(poly, 0.1);
      expect(inner).not.toBeNull();
      expect(PolygonUtils.computeArea(inner as Point[])).toBeCloseTo(3.8 * 2.8, 6);
    }
  });

  it('décalages différents par arête', () => {
    // Seule l'arête du bas (0 → 1) est décalée de 0,5 m.
    const inner = PolygonUtils.offsetPolygon(rectPoly(0, 0, 4, 3), [0.5, 0, 0, 0]) as Point[];
    expect(PolygonUtils.computeArea(inner)).toBeCloseTo(4 * 2.5, 6);
  });

  it('pièce en L décalée de 0,1 m', () => {
    const inner = PolygonUtils.offsetPolygon(L_SHAPE, 0.1) as Point[];
    // Emprise 3,8 × 3,8 moins l'échancrure 3 × 3 (le coin rentrant passe en (0,9 ; 3,1)).
    expect(PolygonUtils.computeArea(inner)).toBeCloseTo(3.8 * 3.8 - 3 * 3, 6);
    expect(inner).toContainEqual({ x: expect.closeTo(0.9, 9), y: expect.closeTo(3.1, 9) });
  });

  it('arêtes colinéaires avec des décalages différents : décrochement', () => {
    const poly = [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 2 }, { x: 0, y: 2 }];
    const inner = PolygonUtils.offsetPolygon(poly, [0.2, 0, 0, 0, 0]) as Point[];
    expect(inner).toHaveLength(6);
    expect(PolygonUtils.computeArea(inner)).toBeCloseTo(8 - 2 * 0.2, 6);
  });

  it('décalage plus grand que la pièce : null', () => {
    expect(PolygonUtils.offsetPolygon(rectPoly(0, 0, 1, 1), 0.6)).toBeNull();
    expect(PolygonUtils.offsetPolygon([{ x: 0, y: 0 }, { x: 1, y: 0 }], 0.1)).toBeNull();
    expect(PolygonUtils.offsetPolygon(rectPoly(0, 0, 4, 3), Number.NaN)).toBeNull();
  });

  it('décalage négatif : vers l’extérieur', () => {
    const outer = PolygonUtils.offsetPolygon(rectPoly(0, 0, 4, 3), -0.1) as Point[];
    expect(PolygonUtils.computeArea(outer)).toBeCloseTo(4.2 * 3.2, 6);
  });
});

describe('computeInteriorArea (F148)', () => {
  const box = rectPoly(0, 0, 4, 3);
  const boxWalls = [
    wall('w1', 0, 0, 4, 0), wall('w2', 4, 0, 4, 3), wall('w3', 4, 3, 0, 3), wall('w4', 0, 3, 0, 0)
  ];

  it('pièce de 4 × 3 m, murs de 20 cm : 10,64 m² intérieurs pour 12 m² à l’axe', () => {
    const r = PolygonUtils.computeInteriorArea(box, boxWalls);
    expect(r).toEqual({ areaM2: 10.64, axisAreaM2: 12, matchedEdges: 4 });
  });

  it('murs d’épaisseurs différentes, mur plus long que l’arête et mur coupé en deux', () => {
    const walls = [
      wall('bas', -1, 0, 6, 0, 0.4),            // déborde de l'arête, 40 cm
      wall('droite', 4, 0, 4, 3, 0.2),
      wall('haut-a', 4, 3, 2, 3, 0.1),          // arête du haut couverte par deux tronçons de 10 cm
      wall('haut-b', 2, 3, 0, 3, 0.1),
      wall('gauche', 0, 3, 0, 0, 0.2)
    ];
    const r = PolygonUtils.computeInteriorArea(box, walls);
    expect(r.matchedEdges).toBe(4);
    expect(r.areaM2).toBeCloseTo((4 - 0.2) * (3 - 0.2 - 0.05), 2);
  });

  it('sans mur sur les arêtes : surface à l’axe et aucune arête reconnue', () => {
    expect(PolygonUtils.computeInteriorArea(box, [])).toEqual({ areaM2: 12, axisAreaM2: 12, matchedEdges: 0 });
    // Mur parallèle mais décalé de 30 cm : pas sur l'arête.
    expect(PolygonUtils.computeInteriorArea(box, [wall('x', 0, -0.3, 4, -0.3)]).matchedEdges).toBe(0);
    // Mur colinéaire couvrant moins de la moitié de l'arête.
    expect(PolygonUtils.computeInteriorArea(box, [wall('x', 0, 0, 1, 0)]).matchedEdges).toBe(0);
  });

  it('déduction partielle : seules les arêtes posées sur un mur sont décalées', () => {
    const r = PolygonUtils.computeInteriorArea(box, [wall('bas', 0, 0, 4, 0)]);
    expect(r.matchedEdges).toBe(1);
    expect(r.areaM2).toBeCloseTo(4 * 2.9, 6);
  });

  it('mur plus épais que la pièce : repli sur la surface à l’axe', () => {
    const tiny = rectPoly(0, 0, 0.5, 0.5);
    const walls = [wall('a', 0, 0, 0.5, 0, 1.5), wall('b', 0.5, 0, 0.5, 0.5, 1.5)];
    expect(PolygonUtils.computeInteriorArea(tiny, walls)).toEqual({ areaM2: 0.25, axisAreaM2: 0.25, matchedEdges: 0 });
  });
});
