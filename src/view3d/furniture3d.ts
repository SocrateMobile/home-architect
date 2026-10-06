import { FurnitureCategory, FurnitureItem } from '../core/types';
import { findFurnitureTemplate } from '../core/furniture-catalog';

/**
 * Volumes 3D des meubles (module pur, sans three) : chaque modèle du catalogue est décrit par quelques
 * pavés (et sections arrondies) aux hauteurs réalistes, dans le repère du meuble : origine au centre,
 * X = largeur, Y = profondeur, dossier / tête de lit du côté des Y négatifs (même convention que les
 * symboles 2D du catalogue), Z = hauteur depuis le sol. La scène les tourne et les place comme le plan.
 */

/** Matière d'une partie de meuble (couleur choisie par la palette de la vue 3D). */
export type FurnitureRole =
  | 'body'     // corps principal : couleur du meuble si elle est définie
  | 'accent'   // dossier, accoudoirs, façades
  | 'soft'     // matelas, oreillers, coussins clairs
  | 'wood'     // plateaux, cadres, pieds en bois
  | 'metal'    // poignées, robinets, pieds métalliques
  | 'ceramic'  // sanitaires, électroménager blanc
  | 'water'    // eau, vasques
  | 'heat'     // foyers de cuisson
  | 'dark'     // socles, plans de travail sombres
  | 'screen'   // écrans, vitrocéramique
  | 'glass';   // parois vitrées, chaise transparente

export interface FurniturePart {
  /** Emprise (m) dans le repère du meuble. */
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  /** Hauteurs (m) du dessous et du dessus. */
  z0: number;
  z1: number;
  role: FurnitureRole;
  /** Section arrondie (octogone inscrit dans l'emprise) : pieds ronds, cuvette, vasque, foyers. */
  round?: boolean;
}

export interface FurnitureShape {
  parts: FurniturePart[];
  /** Matière des parties « body » quand le meuble n'a pas de couleur propre (bois pour une table…). */
  bodyRole: FurnitureRole;
}

/** Hauteur (m) d'un meuble de type inconnu, selon sa catégorie. */
const CATEGORY_HEIGHTS: Record<FurnitureCategory, number> = {
  seating: 0.45,
  bed: 0.5,
  table: 0.75,
  kitchen: 0.9,
  bathroom: 0.85,
  storage: 2.0,
  other: 0.8
};

function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

/** Pavé (bornes remises dans l'ordre) ; null s'il est vide. */
function box(x0: number, y0: number, x1: number, y1: number, z0: number, z1: number, role: FurnitureRole, round = false): FurniturePart | null {
  const part: FurniturePart = {
    x0: Math.min(x0, x1), y0: Math.min(y0, y1), x1: Math.max(x0, x1), y1: Math.max(y0, y1),
    z0: Math.min(z0, z1), z1: Math.max(z0, z1), role
  };
  if (part.x1 - part.x0 < 1e-4 || part.y1 - part.y0 < 1e-4 || part.z1 - part.z0 < 1e-4) return null;
  if (round) part.round = true;
  return part;
}

/** Quatre pieds de section `size`, en retrait de `inset` des bords. */
function legs(w: number, l: number, inset: number, size: number, top: number, role: FurnitureRole, round = false): Array<FurniturePart | null> {
  const s = Math.min(size, w / 4, l / 4);
  const xs = [-w / 2 + inset, w / 2 - inset - s];
  const ys = [-l / 2 + inset, l / 2 - inset - s];
  return xs.flatMap(x => ys.map(y => box(x, y, x + s, y + s, 0, top, role, round)));
}

function mirrorX(parts: Array<FurniturePart | null>): Array<FurniturePart | null> {
  return parts.map(p => (p ? { ...p, x0: -p.x1, x1: -p.x0 } : null));
}

/** Canapé ou fauteuil : pieds, socle, coussins d'assise, dossier et accoudoirs. */
function sofa(w: number, l: number, armRatio: number, armMin: number, backRatio: number, backMin: number): Array<FurniturePart | null> {
  const arm = clamp(w * armRatio, armMin, w * 0.25);
  const back = clamp(l * backRatio, backMin, l * 0.45);
  return [
    ...legs(w, l, 0.04, 0.05, 0.08, 'dark'),
    box(-w / 2, -l / 2, w / 2, l / 2, 0.08, 0.4, 'accent'),
    box(-w / 2 + arm, -l / 2 + back, w / 2 - arm, l / 2, 0.4, 0.5, 'body'),
    box(-w / 2 + arm, -l / 2, w / 2 - arm, -l / 2 + back, 0.4, 0.85, 'accent'),
    box(-w / 2, -l / 2, -w / 2 + arm, l / 2, 0.4, 0.64, 'accent'),
    box(w / 2 - arm, -l / 2, w / 2, l / 2, 0.4, 0.64, 'accent')
  ];
}

/** Divan / méridienne, tête à gauche. */
function divan(w: number, l: number): Array<FurniturePart | null> {
  const head = clamp(w * 0.22, 0.15, w * 0.4);
  const back = clamp(l * 0.24, 0.1, l * 0.45);
  return [
    ...legs(w, l, 0.04, 0.05, 0.08, 'dark'),
    box(-w / 2, -l / 2, w / 2, l / 2, 0.08, 0.38, 'accent'),
    box(-w / 2 + head, -l / 2 + back, w / 2, l / 2, 0.38, 0.48, 'body'),
    box(-w / 2 + head, -l / 2, -w / 2 + w * 0.65, -l / 2 + back, 0.38, 0.8, 'accent'),
    box(-w / 2, -l / 2, -w / 2 + head, l / 2, 0.38, 0.75, 'accent')
  ];
}

/** Lit : cadre, matelas, tête de lit, oreillers et couette (couleur du meuble). */
function bed(w: number, l: number, pillows: number): Array<FurniturePart | null> {
  const head = Math.min(0.06, l * 0.05);
  const margin = Math.min(0.06, w * 0.05);
  const pillowD = Math.min(0.4, l * 0.2);
  const pillowW = (w - margin * (pillows + 1)) / pillows;
  const pillowY = -l / 2 + head + margin;
  const parts: Array<FurniturePart | null> = [
    ...legs(w, l, 0.03, 0.06, 0.1, 'dark'),
    box(-w / 2, -l / 2, w / 2, l / 2, 0.1, 0.3, 'wood'),
    box(-w / 2 + 0.02, -l / 2 + head, w / 2 - 0.02, l / 2 - 0.02, 0.3, 0.5, 'soft'),
    box(-w / 2, -l / 2, w / 2, -l / 2 + head, 0.1, 0.95, 'wood'),
    box(-w / 2 + 0.01, pillowY + pillowD + 0.04, w / 2 - 0.01, l / 2 - 0.01, 0.5, 0.56, 'body')
  ];
  for (let i = 0; i < pillows; i++) {
    const x = -w / 2 + margin + i * (pillowW + margin);
    parts.push(box(x, pillowY, x + pillowW, pillowY + pillowD, 0.5, 0.62, 'soft'));
  }
  return parts;
}

/** Table : plateau (couleur du meuble ou bois) et quatre pieds. */
function table(w: number, l: number, top: number, legRole: FurnitureRole): Array<FurniturePart | null> {
  return [
    box(-w / 2, -l / 2, w / 2, l / 2, top - 0.04, top, 'body'),
    ...legs(w, l, 0.05, 0.05, top - 0.04, legRole)
  ];
}

/** Chaise vue de face à l'extérieur d'une table : assise de `x` à `x + cw`, dossier côté `outer`. */
function chair(x: number, cw: number, outer: number, inward: 1 | -1): Array<FurniturePart | null> {
  const depth = 0.42;
  const inner = outer + inward * depth;
  const back = outer + inward * 0.04;
  const legY = [outer + inward * 0.02, inner - inward * 0.05];
  return [
    ...[x + 0.02, x + cw - 0.05].flatMap(lx => legY.map(ly => box(lx, ly, lx + 0.03, ly + inward * 0.03, 0, 0.43, 'dark'))),
    box(x, outer, x + cw, inner, 0.43, 0.47, 'accent'),
    box(x, outer, x + cw, back, 0.47, 0.92, 'accent')
  ];
}

/** Meuble bas de cuisine ou de salle de bain : socle en retrait, caisson et plan. */
function cabinet(w: number, l: number, top: number, worktop: FurnitureRole): Array<FurniturePart | null> {
  return [
    box(-w / 2 + 0.02, -l / 2 + 0.02, w / 2 - 0.02, l / 2 - 0.06, 0, 0.08, 'dark'),
    box(-w / 2, -l / 2, w / 2, l / 2 - 0.01, 0.08, top - 0.04, 'body'),
    box(-w / 2, -l / 2, w / 2, l / 2, top - 0.04, top, worktop)
  ];
}

/** Robinet au fond (côté Y négatifs) : colonne et bec. */
function tap(y: number, top: number, reach: number): Array<FurniturePart | null> {
  return [
    box(-0.015, y, 0.015, y + 0.03, top, top + 0.22, 'metal'),
    box(-0.015, y, 0.015, y + reach, top + 0.19, top + 0.22, 'metal')
  ];
}

type ShapeBuilder = (w: number, l: number) => { parts: Array<FurniturePart | null>; bodyRole?: FurnitureRole };

const SHAPES: Record<string, ShapeBuilder> = {
  sofa_3p: (w, l) => ({ parts: sofa(w, l, 0.1, 0.1, 0.26, 0.12) }),
  sofa_2p: (w, l) => ({ parts: sofa(w, l, 0.12, 0.1, 0.26, 0.12) }),
  armchair: (w, l) => ({ parts: sofa(w, l, 0.18, 0.08, 0.28, 0.1) }),
  divan: (w, l) => ({ parts: divan(w, l) }),
  divan_right: (w, l) => ({ parts: mirrorX(divan(w, l)) }),
  coffee_table: (w, l) => ({ parts: table(w, l, 0.4, 'wood'), bodyRole: 'wood' }),
  bed_double: (w, l) => ({ parts: bed(w, l, 2) }),
  bed_single: (w, l) => ({ parts: bed(w, l, 1) }),
  nightstand: (w, l) => ({
    bodyRole: 'wood',
    parts: [
      box(-w / 2, -l / 2, w / 2, l / 2, 0, 0.55, 'body'),
      box(-w / 2 + 0.03, l / 2, w / 2 - 0.03, l / 2 + 0.01, 0.3, 0.5, 'accent'),
      box(-0.02, l / 2 + 0.01, 0.02, l / 2 + 0.03, 0.38, 0.42, 'metal')
    ]
  }),
  wardrobe: (w, l) => {
    const doors = [-w / 2 + w / 3, -w / 2 + (w * 2) / 3];
    return {
      bodyRole: 'wood',
      parts: [
        box(-w / 2 + 0.02, -l / 2, w / 2 - 0.02, l / 2 - 0.04, 0, 0.06, 'dark'),
        box(-w / 2, -l / 2, w / 2, l / 2, 0.06, 2.0, 'body'),
        ...doors.flatMap(x => [
          box(x - 0.005, l / 2, x + 0.005, l / 2 + 0.005, 0.1, 1.96, 'dark'),
          box(x - 0.04, l / 2, x - 0.025, l / 2 + 0.03, 0.9, 1.3, 'metal'),
          box(x + 0.025, l / 2, x + 0.04, l / 2 + 0.03, 0.9, 1.3, 'metal')
        ])
      ]
    };
  },
  dining_table_6: (w, l) => {
    // Six chaises comme le symbole 2D : trois de chaque côté long, à l'extérieur du plateau.
    const chairW = w * 0.24;
    const chairD = Math.min(0.18, l * 0.25);
    const m = w * 0.04;
    const xs = [-w / 2 + m, -chairW / 2, w / 2 - chairW - m];
    return {
      bodyRole: 'wood',
      parts: [
        ...table(w, l, 0.76, 'wood'),
        ...xs.flatMap(x => [...chair(x, chairW, -l / 2 - chairD, 1), ...chair(x, chairW, l / 2 + chairD, -1)])
      ]
    };
  },
  desk: (w, l) => {
    const screenW = Math.min(w * 0.4, 0.6);
    const drawerW = Math.min(0.45, w * 0.3);
    return {
      bodyRole: 'wood',
      parts: [
        ...table(w, l, 0.75, 'metal'),
        box(w / 2 - drawerW - 0.06, -l / 2 + 0.06, w / 2 - 0.06, l / 2 - 0.06, 0.12, 0.71, 'accent'),
        box(-0.04, -l / 2 + 0.1, 0.04, -l / 2 + 0.14, 0.75, 0.84, 'dark'),
        box(-screenW / 2, -l / 2 + 0.08, screenW / 2, -l / 2 + 0.1, 0.82, 1.16, 'screen')
      ]
    };
  },
  chair_starck: (w, l) => ({
    bodyRole: 'glass',
    parts: [
      ...legs(w, l, 0.03, 0.035, 0.42, 'glass'),
      box(-w / 2 + 0.03, -l / 2 + 0.06, w / 2 - 0.03, l / 2 - 0.04, 0.42, 0.46, 'body'),
      box(-w / 2 + 0.07, -l / 2 + 0.03, w / 2 - 0.07, -l / 2 + 0.07, 0.46, 0.92, 'body')
    ]
  }),
  console: (w, l) => ({
    bodyRole: 'wood',
    parts: [
      ...table(w, l, 0.8, 'wood'),
      box(-w / 2 + 0.04, -l / 2 + 0.03, w / 2 - 0.04, l / 2 - 0.02, 0.62, 0.76, 'accent'),
      box(-w / 4 - 0.02, l / 2 - 0.02, -w / 4 + 0.02, l / 2 + 0.01, 0.67, 0.71, 'metal'),
      box(w / 4 - 0.02, l / 2 - 0.02, w / 4 + 0.02, l / 2 + 0.01, 0.67, 0.71, 'metal')
    ]
  }),
  toilet: (w, l) => {
    const tank = l * 0.28;
    const g = w * 0.04;
    return {
      bodyRole: 'ceramic',
      parts: [
        box(-w * 0.28, -l / 2 + tank * 0.6, w * 0.28, l / 2 - 0.1, 0, 0.32, 'ceramic', true),
        box(-w / 2 + g, -l / 2 + tank, w / 2 - g, l / 2, 0.3, 0.4, 'ceramic', true),
        box(-w / 2 + g, -l / 2 + tank, w / 2 - g, l / 2, 0.4, 0.43, 'soft', true),
        box(-w / 2, -l / 2, w / 2, -l / 2 + tank, 0.32, 0.8, 'body')
      ]
    };
  },
  shower: (w, l) => ({
    bodyRole: 'ceramic',
    parts: [
      box(-w / 2, -l / 2, w / 2, l / 2, 0, 0.05, 'body'),
      box(-0.03, -0.03, 0.03, 0.03, 0.05, 0.052, 'dark', true),
      box(w / 2 - w * 0.7, l / 2 - 0.01, w / 2, l / 2, 0.05, 2.0, 'glass'),
      box(-0.015, -l / 2, 0.015, -l / 2 + 0.03, 1.0, 2.0, 'metal'),
      box(-0.1, -l / 2 + 0.03, 0.1, -l / 2 + 0.25, 1.96, 2.0, 'metal')
    ]
  }),
  bathtub: (w, l) => {
    const m = Math.min(w, l) * 0.08;
    return {
      bodyRole: 'ceramic',
      parts: [
        box(-w / 2, -l / 2, w / 2, l / 2, 0, 0.42, 'body'),
        box(-w / 2, -l / 2, w / 2, -l / 2 + m, 0.42, 0.56, 'body'),
        box(-w / 2, l / 2 - m, w / 2, l / 2, 0.42, 0.56, 'body'),
        box(-w / 2, -l / 2 + m, -w / 2 + m, l / 2 - m, 0.42, 0.56, 'body'),
        box(w / 2 - m, -l / 2 + m, w / 2, l / 2 - m, 0.42, 0.56, 'body'),
        box(-w / 2 + m, -l / 2 + m, w / 2 - m, l / 2 - m, 0.42, 0.5, 'water'),
        box(-w / 2 + 0.01, -0.03, -w / 2 + m, 0.03, 0.56, 0.62, 'metal')
      ]
    };
  },
  sink_vanity: (w, l) => {
    const basinRx = (w * 0.65) / 2;
    const basinRy = (l * 0.65) / 2;
    return {
      bodyRole: 'wood',
      parts: [
        ...cabinet(w, l, 0.85, 'ceramic'),
        box(-basinRx, -basinRy, basinRx, basinRy, 0.85, 0.855, 'water', true),
        ...tap(-l / 2 + 0.03, 0.85, 0.12)
      ]
    };
  },
  kitchen_sink: (w, l) => {
    const g = Math.min(w, l) * 0.08;
    const basinW = (w - g * 3) / 2;
    const basinH = l - g * 2.6;
    const y0 = -l / 2 + g * 1.6;
    return {
      bodyRole: 'ceramic',
      parts: [
        ...cabinet(w, l, 0.9, 'dark'),
        box(-w / 2 + g, y0, -w / 2 + g + basinW, y0 + basinH, 0.9, 0.905, 'water'),
        box(g / 2, y0, g / 2 + basinW, y0 + basinH, 0.9, 0.905, 'water'),
        ...tap(-l / 2 + 0.02, 0.9, 0.16)
      ]
    };
  },
  cooktop: (w, l) => {
    const rLarge = Math.min(w, l) * 0.18;
    const rSmall = Math.min(w, l) * 0.13;
    const burner = (cx: number, cy: number, r: number) => box(cx - r, cy - r, cx + r, cy + r, 0.905, 0.908, 'heat', true);
    return {
      bodyRole: 'ceramic',
      parts: [
        ...cabinet(w, l, 0.9, 'dark'),
        box(-w / 2 + 0.03, -l / 2 + 0.03, w / 2 - 0.03, l / 2 - 0.03, 0.9, 0.905, 'screen'),
        burner(-w / 4, -l / 4, rLarge),
        burner(w / 4, -l / 4, rSmall),
        burner(-w / 4, l / 4, rSmall),
        burner(w / 4, l / 4, rLarge)
      ]
    };
  },
  fridge: (w, l) => {
    // Portes côté Y négatifs, comme la ligne de joint et la poignée du symbole 2D.
    const hx = w / 2 - 0.1;
    return {
      bodyRole: 'ceramic',
      parts: [
        box(-w / 2, -l / 2, w / 2, l / 2, 0, 1.85, 'body'),
        box(-w / 2, -l / 2 - 0.005, w / 2, -l / 2, 1.2, 1.215, 'dark'),
        box(hx, -l / 2 - 0.035, hx + 0.02, -l / 2, 1.3, 1.6, 'metal'),
        box(hx, -l / 2 - 0.035, hx + 0.02, -l / 2, 0.75, 1.1, 'metal')
      ]
    };
  }
};

function positive(v: number | undefined): number | undefined {
  return typeof v === 'number' && Number.isFinite(v) && v > 0 ? v : undefined;
}

/** Dimensions effectives (m) d'un meuble : les siennes, sinon celles du modèle, sinon 1 m (comme le 2D). */
export function furnitureSize(item: Pick<FurnitureItem, 'type'> & Partial<Pick<FurnitureItem, 'width' | 'length'>>): { w: number; l: number } {
  const template = findFurnitureTemplate(item.type);
  return { w: positive(item.width) ?? template?.width ?? 1, l: positive(item.length) ?? template?.length ?? 1 };
}

/**
 * Volumes d'un meuble : modèle du catalogue, sinon simple bloc à la hauteur usuelle de sa catégorie.
 * Les dimensions (largeur, profondeur) sont celles du meuble ; les hauteurs sont réalistes et fixes.
 */
export function furnitureShape(item: Pick<FurnitureItem, 'type'> & Partial<Pick<FurnitureItem, 'width' | 'length' | 'category'>>): FurnitureShape {
  const { w, l } = furnitureSize(item);
  const builder = SHAPES[item.type];
  if (builder) {
    const shape = builder(w, l);
    return { parts: shape.parts.filter((p): p is FurniturePart => p !== null), bodyRole: shape.bodyRole ?? 'body' };
  }
  const category = item.category && item.category in CATEGORY_HEIGHTS ? item.category : 'other';
  const part = box(-w / 2, -l / 2, w / 2, l / 2, 0, CATEGORY_HEIGHTS[category], 'body');
  return { parts: part ? [part] : [], bodyRole: 'body' };
}
