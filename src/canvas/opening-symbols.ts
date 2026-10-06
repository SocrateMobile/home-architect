import { Opening } from '../core/types';

/**
 * Symboles des ouvertures en MÈTRES dans le repère local de l'ouverture (origine au centre, axe X le
 * long du mur, Y vers le côté « intérieur » par défaut). Même géométrie, pour chaque OpeningType, que
 * SvgExporter.renderOpening : le canevas et le plan publié dessinent les mêmes portes et fenêtres
 * (constats F114, F139). Le canevas projette ces primitives à l'échelle d'affichage, les traits
 * restant en pixels.
 */

/** Rôle d'une primitive (classe CSS `opening-<rôle>`). */
export type OpeningRole = 'cutout' | 'jamb' | 'frame' | 'leaf' | 'swing' | 'glass' | 'sash' | 'mullion' | 'panel';

export type OpeningPrimitive =
  | { kind: 'rect'; role: OpeningRole; x: number; y: number; w: number; h: number }
  | { kind: 'line'; role: OpeningRole; x1: number; y1: number; x2: number; y2: number }
  /** Arc de débattement : de (x1, y1) à (x2, y2), rayon r, sens `sweep` (drapeau SVG). */
  | { kind: 'arc'; role: OpeningRole; x1: number; y1: number; x2: number; y2: number; r: number; sweep: 0 | 1 };

export type OpeningShape = Pick<Opening, 'type' | 'width' | 'flipSide' | 'flipDirection' | 'sashCount'>;

/** Dimensions des détails (m), identiques à celles de l'export. */
const JAMB = 0.08;
const PANEL = 0.06;
/** Largeur à partir de laquelle une fenêtre sans sashCount est dessinée à deux battants (règle de l'export). */
const DOUBLE_SASH_MIN_WIDTH = 1.25;

/** Nombre de battants dessinés pour une fenêtre : sashCount explicite, sinon deux à partir de 1,25 m. */
export function windowSashes(op: Pick<Opening, 'width' | 'sashCount'>): 1 | 2 {
  if (op.sashCount) return op.sashCount === 2 ? 2 : 1;
  return op.width >= DOUBLE_SASH_MIN_WIDTH ? 2 : 1;
}

/**
 * Primitives d'une ouverture de largeur op.width dans un mur d'épaisseur `thickness`. La découpe
 * (couleur du fond) déborde de `cutoutOverlap` mètres de chaque côté pour masquer le contour du mur.
 */
export function openingPrimitives(op: OpeningShape, thickness: number, cutoutOverlap: number): OpeningPrimitive[] {
  const w = Math.max(0, op.width);
  const half = w / 2;
  const t = Math.max(0, thickness);
  const ht = t / 2;
  const out: OpeningPrimitive[] = [
    { kind: 'rect', role: 'cutout', x: -half, y: -ht - cutoutOverlap, w, h: t + cutoutOverlap * 2 }
  ];
  const frame: OpeningPrimitive = { kind: 'rect', role: 'frame', x: -half, y: -ht, w, h: t };
  const jambs = (): OpeningPrimitive[] => {
    const jw = Math.min(JAMB, w / 4);
    return [
      { kind: 'rect', role: 'jamb', x: -half, y: -ht, w: jw, h: t },
      { kind: 'rect', role: 'jamb', x: half - jw, y: -ht, w: jw, h: t }
    ];
  };
  const side = op.flipSide ? -1 : 1;
  // Battant pivotant en (pivotX, 0) : fermé vers `toward` (±1), ouvert perpendiculairement côté `side`.
  const leaf = (pivotX: number, toward: number, length: number): OpeningPrimitive[] => [
    { kind: 'line', role: 'leaf', x1: pivotX, y1: 0, x2: pivotX, y2: side * length },
    {
      kind: 'arc', role: 'swing',
      x1: pivotX + toward * length, y1: 0, x2: pivotX, y2: side * length,
      r: length, sweep: toward * side > 0 ? 1 : 0
    }
  ];

  switch (op.type) {
    case 'door': {
      const pivotX = op.flipDirection ? half : -half;
      out.push(...jambs(), ...leaf(pivotX, op.flipDirection ? -1 : 1, w));
      break;
    }
    case 'double_door':
      out.push(...jambs(), ...leaf(-half, 1, half), ...leaf(half, -1, half));
      break;
    case 'sliding_door': {
      // Deux panneaux coulissants qui se recouvrent au centre
      const panel = w * 0.55;
      out.push(
        frame,
        { kind: 'rect', role: 'panel', x: -half, y: -t / 4 - PANEL / 2, w: panel, h: PANEL },
        { kind: 'rect', role: 'panel', x: half - panel, y: t / 4 - PANEL / 2, w: panel, h: PANEL }
      );
      break;
    }
    case 'french_window':
      out.push(
        frame,
        { kind: 'rect', role: 'panel', x: -half, y: -t / 4, w: half, h: PANEL },
        { kind: 'rect', role: 'panel', x: 0, y: t / 4, w: half, h: PANEL }
      );
      break;
    case 'window':
    default: {
      const inset = Math.min(JAMB, w / 4);
      out.push(frame, { kind: 'line', role: 'glass', x1: -half, y1: 0, x2: half, y2: 0 });
      if (windowSashes(op) === 2) {
        out.push(
          { kind: 'line', role: 'mullion', x1: 0, y1: -ht, x2: 0, y2: ht },
          { kind: 'line', role: 'sash', x1: -half + inset, y1: -t / 4, x2: -inset / 2, y2: -t / 4 },
          { kind: 'line', role: 'sash', x1: inset / 2, y1: t / 4, x2: half - inset, y2: t / 4 }
        );
      } else {
        out.push(
          { kind: 'line', role: 'sash', x1: -half + inset, y1: -t / 4, x2: half - inset, y2: -t / 4 },
          { kind: 'line', role: 'sash', x1: -half + inset, y1: t / 4, x2: half - inset, y2: t / 4 }
        );
      }
      break;
    }
  }
  return out;
}

/** Hauteurs (m) de la baie dans un mur de hauteur `wallHeight` : porte depuis le sol, fenêtre sur allège. */
export function openingVerticalRange(op: Pick<Opening, 'type' | 'height'>, wallHeight: number): [number, number] {
  const top = (h: number) => Math.min(h, Math.max(0, wallHeight - 0.05));
  const height = typeof op.height === 'number' && op.height > 0 ? op.height : undefined;
  switch (op.type) {
    case 'window': {
      const sill = Math.min(0.9, wallHeight * 0.4);
      return [sill, top(sill + (height ?? 1.25))];
    }
    case 'french_window':
      return [0, top(height ?? 2.15)];
    default:
      return [0, top(height ?? 2.04)];
  }
}
