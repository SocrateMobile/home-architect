import { css, nothing, svg, unsafeCSS, SVGTemplateResult } from 'lit';
import { localize } from '../i18n';
import { geometryTranslations } from '../i18n/locales/geometry';
import { FURNITURE_CATEGORIES, FurnitureCategory, FurnitureItem } from './types';

/**
 * Catalogue de mobilier. Chaque symbole est décrit par des primitives en MÈTRES dans le repère
 * local du meuble (origine au centre, X = largeur, Y = profondeur ; le dossier / la tête est du
 * côté des Y négatifs). Le rendu (canevas, carte, SVG exporté) les projette à l'échelle voulue :
 * les proportions sont donc identiques à tous les zooms, et les épaisseurs de trait restent en
 * pixels. Sous MIN_SYMBOL_DETAIL_PX, seul le contour est dessiné.
 */

/** Rôle de peinture d'une primitive : la couleur réelle dépend de la sélection et de la couleur du meuble. */
export type SymbolPaint =
  | 'body'      // corps principal (couleur du meuble)
  | 'accent'    // dossier, accoudoirs, tiroirs
  | 'soft'      // oreillers
  | 'water'     // bacs, vasques
  | 'heat'      // foyers de cuisson
  | 'glass'     // dossier transparent
  | 'outline'   // traits de décor sans remplissage
  | 'highlight' // trait clair (tête de lit, écran)
  | 'frost'     // trait bleu (réfrigérateur)
  | 'knob'      // petites pastilles (boutons, robinets)
  | 'brass'     // poignées laiton
  | 'drain';    // bonde

/** Commande de tracé en mètres. 'A' : rx, ry, grand arc (0|1), sens (0|1), x, y. */
export type SymbolPathCommand =
  | ['M' | 'L', number, number]
  | ['Q', number, number, number, number]
  | ['A', number, number, 0 | 1, 0 | 1, number, number]
  | ['Z'];

interface SymbolShapeStyle {
  paint: SymbolPaint;
  /** Épaisseur de trait en pixels (défaut : celle du modèle). */
  strokeWidth?: number;
  /** Motif de pointillés en pixels (ex. '3,3'). */
  dash?: string;
  opacity?: number;
}

/** Primitive de dessin d'un symbole, en mètres. */
export type SymbolShape =
  | (SymbolShapeStyle & { kind: 'rect'; x: number; y: number; w: number; h: number; r?: number })
  | (SymbolShapeStyle & { kind: 'ellipse'; cx: number; cy: number; rx: number; ry: number })
  | (SymbolShapeStyle & { kind: 'line'; x1: number; y1: number; x2: number; y2: number })
  | (SymbolShapeStyle & { kind: 'path'; d: SymbolPathCommand[] });

/** Définition d'un modèle du catalogue (données et primitives du symbole). */
export interface FurnitureTemplateDefinition {
  /** Identifiant persistant dans les projets (ne jamais le renommer). Clé de traduction : `geometry.furniture.<type>`. */
  type: string;
  /**
   * Nom par défaut enregistré dans les projets (français, figé comme `type`). Ne pas l'afficher :
   * utiliser furnitureTemplateName / furnitureDisplayName, qui le traduisent.
   */
  name: string;
  category: FurnitureCategory;
  width: number;  // in meters (width along X)
  length: number; // in meters (depth along Y)
  icon: string;
  /** Couleur de remplissage du corps quand le meuble n'en définit pas (sinon teinte neutre). */
  defaultColor?: string;
  /** Anciens noms par défaut de ce modèle (projets existants), traités comme `name` (nom par défaut). */
  legacyNames?: string[];
  /** Épaisseur de trait par défaut, en pixels. */
  strokeWidth?: number;
  /** Primitives du symbole pour un meuble de w × l mètres (dimensions toujours ≥ 0). */
  shapes: (w: number, l: number) => SymbolShape[];
}

export interface FurnitureCatalogTemplate extends FurnitureTemplateDefinition {
  /**
   * @deprecated Ancienne signature en pixels écran, conservée le temps que le canevas passe à
   * renderFurnitureSymbol (qui gère aussi la couleur du meuble). Le symbole est dessiné aux
   * proportions demandées, l'échelle étant déduite de la largeur du modèle.
   */
  renderSvg: (wPx: number, lPx: number, isSelected: boolean) => SVGTemplateResult;
}

/** Données d'un meuble nécessaires au rendu de son symbole. */
export type FurnitureSymbolSource = Pick<FurnitureItem, 'type'> & Partial<Pick<FurnitureItem, 'width' | 'length' | 'color' | 'icon'>>;

export interface FurnitureSymbolOptions {
  /** Échelle de rendu : unités SVG par mètre (pixels écran = pixelsPerMeter × zoom pour le canevas). */
  pixelsPerMeter: number;
  selected?: boolean;
}

/** Sous cette taille (plus petit côté, en pixels), le symbole est réduit à son contour. */
export const MIN_SYMBOL_DETAIL_PX = 12;

const CATEGORY_ORDER: FurnitureCategory[] = ['seating', 'bed', 'table', 'storage', 'bathroom', 'kitchen', 'other'];

/**
 * Libellés des catégories de mobilier (filtres du volet), traduits à la lecture dans la langue
 * courante : les lire au rendu, ne pas les recopier au chargement d'un module. Clés dans l'ordre
 * d'affichage (CATEGORY_ORDER, complété par toute catégorie qui n'y figurerait pas).
 */
export const FURNITURE_CATEGORY_LABELS: Readonly<Record<FurnitureCategory, string>> = Object.freeze(
  Object.defineProperties(
    {} as Record<FurnitureCategory, string>,
    Object.fromEntries([...new Set([...CATEGORY_ORDER, ...FURNITURE_CATEGORIES])].map(category => [category, {
      enumerable: true,
      get: () => localize(`geometry.furniture_category.${category}`)
    }]))
  )
);

const DEFAULT_STROKE_WIDTH = 1.5;
const UNKNOWN_FURNITURE_ICON = '📦';

/**
 * Couleurs des symboles. Rendu Lit (canevas, carte, volet) : jeton CSS `--arch-furniture-<nom>`
 * (défini par furnitureSymbolStyles, surchargeable par `--ha-arch-furniture-<nom>`) avec la couleur
 * sombre en repli. SVG exporté (fichier autonome) : couleur sombre littérale.
 */
interface ThemedColor {
  /** Nom du jeton (sans préfixe), absent pour une couleur propre au meuble. */
  token?: string;
  /** Couleur de la palette sombre : repli du jeton et valeur du SVG exporté. */
  value: string;
}

/** Palettes des symboles : [nom du jeton, couleur sombre, couleur claire]. */
const SYMBOL_PALETTE = [
  ['stroke', '#94a3b8', '#475569'],
  ['selected', '#38bdf8', '#0284c7'],
  ['fill', 'rgba(30, 41, 59, 0.85)', 'rgba(226, 232, 240, 0.9)'],
  ['selected-fill', 'rgba(56, 189, 248, 0.25)', 'rgba(2, 132, 199, 0.16)'],
  ['accent', 'rgba(51, 65, 85, 0.9)', 'rgba(203, 213, 225, 0.95)'],
  ['soft', 'rgba(241, 245, 249, 0.2)', 'rgba(255, 255, 255, 0.85)'],
  ['water', 'rgba(2, 132, 199, 0.25)', 'rgba(2, 132, 199, 0.18)'],
  ['heat', 'rgba(239, 68, 68, 0.2)', 'rgba(220, 38, 38, 0.16)'],
  ['glass', 'rgba(56, 189, 248, 0.15)', 'rgba(2, 132, 199, 0.12)'],
  ['highlight', '#cbd5e1', '#334155'],
  ['frost', '#38bdf8', '#0284c7'],
  ['brass', '#f59e0b', '#b45309'],
  ['drain', '#0284c7', '#0369a1']
] as const;

type SymbolColorName = typeof SYMBOL_PALETTE[number][0];

const SYMBOL_COLORS = Object.fromEntries(
  SYMBOL_PALETTE.map(([token, dark]) => [token, { token, value: dark }])
) as Record<SymbolColorName, ThemedColor>;

function paletteDeclarations(scheme: 'dark' | 'light'): string {
  return SYMBOL_PALETTE
    .map(([token, dark, light]) => `--arch-furniture-${token}: var(--ha-arch-furniture-${token}, ${scheme === 'dark' ? dark : light});`)
    .join('\n');
}

/**
 * Jetons de couleur des symboles de meubles, à inclure dans les styles de l'hôte qui les affiche
 * (canevas, volet) : palette sombre par défaut, claire sous `:host([scheme='light'])`.
 */
export const furnitureSymbolStyles = css`
  :host {
    ${unsafeCSS(paletteDeclarations('dark'))}
  }

  :host([scheme='light']) {
    ${unsafeCSS(paletteDeclarations('light'))}
  }
`;

/** Couleur propre au meuble acceptée dans un attribut `style` (même règle que normalizeProject). */
const SAFE_COLOR = /^[#a-zA-Z0-9(),.%\s+-]{1,64}$/;
const UNSAFE_COLOR = /url\s*\(|expression|image-set/i;

// ------------------------------------------------------------------
// Aides de construction (toutes les dimensions sont bornées à ≥ 0)
// ------------------------------------------------------------------

/**
 * Borne v à [min, max]. Si les bornes se croisent (meuble plus petit que le minimum absolu d'un
 * décor), la borne haute l'emporte : elle est proportionnelle au meuble, le décor reste donc dans
 * son emprise (ex. dossier de 12 cm sur un canapé de 10 cm de profondeur).
 */
function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

function rect(x: number, y: number, w: number, h: number, paint: SymbolPaint, r = 0, style: Partial<SymbolShapeStyle> = {}): SymbolShape {
  const width = Math.max(0, w);
  const height = Math.max(0, h);
  return { kind: 'rect', x, y, w: width, h: height, r: clamp(r, 0, Math.min(width, height) / 2), paint, ...style };
}

function ellipse(cx: number, cy: number, rx: number, ry: number, paint: SymbolPaint, style: Partial<SymbolShapeStyle> = {}): SymbolShape {
  return { kind: 'ellipse', cx, cy, rx: Math.max(0, rx), ry: Math.max(0, ry), paint, ...style };
}

function line(x1: number, y1: number, x2: number, y2: number, paint: SymbolPaint, style: Partial<SymbolShapeStyle> = {}): SymbolShape {
  return { kind: 'line', x1, y1, x2, y2, paint, ...style };
}

function path(d: SymbolPathCommand[], paint: SymbolPaint, style: Partial<SymbolShapeStyle> = {}): SymbolShape {
  return { kind: 'path', d, paint, ...style };
}

/** Contour arrondi occupant toute l'emprise du meuble. */
function outline(w: number, l: number, radiusRatio = 0.08): SymbolShape {
  return rect(-w / 2, -l / 2, w, l, 'body', Math.min(w, l) * radiusRatio);
}

/** Symétrie gauche/droite (X → −X) d'un ensemble de primitives. */
function mirrorX(shapes: SymbolShape[]): SymbolShape[] {
  return shapes.map(s => {
    switch (s.kind) {
      case 'rect': return { ...s, x: -(s.x + s.w) };
      case 'ellipse': return { ...s, cx: -s.cx };
      case 'line': return { ...s, x1: -s.x1, x2: -s.x2 };
      case 'path': return {
        ...s,
        d: s.d.map((c): SymbolPathCommand => {
          switch (c[0]) {
            case 'M': case 'L': return [c[0], -c[1], c[2]];
            case 'Q': return ['Q', -c[1], c[2], -c[3], c[4]];
            case 'A': return ['A', c[1], c[2], c[3], c[4] === 1 ? 0 : 1, -c[5], c[6]];
            default: return c;
          }
        })
      };
    }
  });
}

/** Canapé : accoudoirs, dossier et `seats` coussins d'assise. */
function sofaShapes(w: number, l: number, seats: number, armRatio: number): SymbolShape[] {
  const armW = clamp(w * armRatio, 0.1, w * 0.25);
  const backH = clamp(l * 0.26, 0.12, l * 0.45);
  const gap = Math.min(0.04, w * 0.02, l * 0.04);
  const innerW = w - armW * 2;
  const cushionW = innerW / seats;
  const shapes: SymbolShape[] = [
    outline(w, l),
    rect(-w / 2 + armW, -l / 2, innerW, backH, 'accent', backH * 0.2),
    rect(-w / 2, -l / 2, armW, l, 'accent', armW * 0.3),
    rect(w / 2 - armW, -l / 2, armW, l, 'accent', armW * 0.3)
  ];
  for (let i = 0; i < seats; i++) {
    const cw = cushionW - gap;
    shapes.push(rect(-w / 2 + armW + i * cushionW + gap / 2, -l / 2 + backH + gap / 2, cw, l - backH - gap, 'body', Math.min(cw, l) * 0.1));
  }
  return shapes;
}

/** Divan / méridienne, tête à gauche. */
function divanShapes(w: number, l: number): SymbolShape[] {
  const headW = clamp(w * 0.22, 0.15, w * 0.4);
  const backH = clamp(l * 0.24, 0.1, l * 0.45);
  const gap = Math.min(0.05, w * 0.03, l * 0.05);
  const seatW = w - headW;
  const lineTop = -l / 2 + backH + gap;
  const lineBottom = Math.max(lineTop, l / 2 - gap);
  return [
    outline(w, l, 0.1),
    rect(-w / 2, -l / 2, w * 0.65, backH, 'accent', backH * 0.25),
    rect(-w / 2, -l / 2, headW, l, 'accent', headW * 0.2),
    rect(-w / 2 + headW + gap, -l / 2 + backH + gap, seatW - gap * 2, l - backH - gap * 2, 'body', Math.min(seatW, l) * 0.08),
    line(-w / 2 + headW + seatW / 3, lineTop, -w / 2 + headW + seatW / 3, lineBottom, 'outline', { dash: '3,3', opacity: 0.5 }),
    line(-w / 2 + headW + (seatW * 2) / 3, lineTop, -w / 2 + headW + (seatW * 2) / 3, lineBottom, 'outline', { dash: '3,3', opacity: 0.5 })
  ];
}

/** Lit : tête de lit, `pillows` oreillers et revers de couette. */
function bedShapes(w: number, l: number, pillows: number): SymbolShape[] {
  const margin = Math.min(w * 0.05, l * 0.04, 0.08);
  const headboard = Math.min(l * 0.03, 0.05);
  const pillowH = l * 0.18;
  const pillowW = (w - margin * (pillows + 1)) / pillows;
  const pillowY = -l / 2 + headboard + margin;
  const duvetY = Math.min(l / 2, pillowY + pillowH + margin);
  const shapes: SymbolShape[] = [
    outline(w, l, 0.06),
    line(-w / 2, -l / 2 + headboard, w / 2, -l / 2 + headboard, 'highlight', { strokeWidth: 2.5 })
  ];
  for (let i = 0; i < pillows; i++) {
    shapes.push(rect(-w / 2 + margin + i * (pillowW + margin), pillowY, pillowW, pillowH, 'soft', Math.min(pillowW, pillowH) * 0.2));
  }
  shapes.push(path([['M', -w / 2 + margin / 2, duvetY], ['Q', 0, duvetY + l * 0.04, w / 2 - margin / 2, duvetY]], 'outline', { strokeWidth: 1.8 }));
  return shapes;
}

// ------------------------------------------------------------------
// Catalogue
// ------------------------------------------------------------------

const CATALOG_DEFINITIONS: FurnitureTemplateDefinition[] = [
  // ==========================================
  // SALON (SEATING)
  // ==========================================
  {
    type: 'sofa_3p',
    name: 'Canapé 3 places',
    category: 'seating',
    width: 2.20,
    length: 0.95,
    icon: '🛋️',
    strokeWidth: 1.6,
    shapes: (w, l) => sofaShapes(w, l, 3, 0.1)
  },
  {
    type: 'sofa_2p',
    name: 'Canapé 2 places',
    category: 'seating',
    width: 1.60,
    length: 0.90,
    icon: '🛋️',
    strokeWidth: 1.6,
    shapes: (w, l) => sofaShapes(w, l, 2, 0.12)
  },
  {
    type: 'divan',
    name: 'Divan / Méridienne (Tête Gauche)',
    category: 'seating',
    width: 1.80,
    length: 0.85,
    icon: '🛋️',
    strokeWidth: 1.6,
    shapes: (w, l) => divanShapes(w, l)
  },
  {
    type: 'divan_right',
    name: 'Divan / Méridienne (Tête Droite)',
    category: 'seating',
    width: 1.80,
    length: 0.85,
    icon: '🛋️',
    strokeWidth: 1.6,
    shapes: (w, l) => mirrorX(divanShapes(w, l))
  },
  {
    type: 'armchair',
    name: 'Fauteuil club',
    category: 'seating',
    width: 0.85,
    length: 0.85,
    icon: '🪑',
    shapes: (w, l) => {
      const armW = clamp(w * 0.18, 0.08, w * 0.3);
      const backH = clamp(l * 0.28, 0.1, l * 0.45);
      const gap = Math.min(0.04, w * 0.04, l * 0.04);
      return [
        outline(w, l),
        rect(-w / 2 + armW, -l / 2, w - armW * 2, backH, 'accent', backH * 0.2),
        rect(-w / 2, -l / 2, armW, l, 'accent', armW * 0.3),
        rect(w / 2 - armW, -l / 2, armW, l, 'accent', armW * 0.3),
        rect(-w / 2 + armW + gap / 2, -l / 2 + backH + gap / 2, w - armW * 2 - gap, l - backH - gap, 'body', Math.min(w, l) * 0.06)
      ];
    }
  },
  {
    type: 'coffee_table',
    name: 'Table basse',
    category: 'seating',
    width: 1.10,
    length: 0.60,
    icon: '☕',
    shapes: (w, l) => {
      const m = Math.min(w, l) * 0.12;
      return [
        outline(w, l, 0.12),
        line(-w / 2 + m, -l / 2 + m, w / 2 - m, l / 2 - m, 'outline', { dash: '3,3', opacity: 0.4 }),
        line(w / 2 - m, -l / 2 + m, -w / 2 + m, l / 2 - m, 'outline', { dash: '3,3', opacity: 0.4 })
      ];
    }
  },

  // ==========================================
  // CHAMBRE (BED)
  // ==========================================
  {
    type: 'bed_double',
    name: 'Lit double (Queen)',
    category: 'bed',
    width: 1.60,
    length: 2.00,
    icon: '🛏️',
    strokeWidth: 1.6,
    shapes: (w, l) => bedShapes(w, l, 2)
  },
  {
    type: 'bed_single',
    name: 'Lit simple',
    category: 'bed',
    width: 0.90,
    length: 1.90,
    icon: '🛏️',
    shapes: (w, l) => bedShapes(w, l, 1)
  },
  {
    type: 'nightstand',
    name: 'Table de chevet',
    category: 'bed',
    width: 0.45,
    length: 0.40,
    icon: '🕰️',
    strokeWidth: 1.4,
    shapes: (w, l) => {
      const m = Math.min(w, l) * 0.1;
      const knob = Math.min(w, l) * 0.05;
      return [
        outline(w, l),
        line(-w / 2 + m, 0, w / 2 - m, 0, 'outline', { strokeWidth: 1.2 }),
        ellipse(0, -l / 4, knob, knob, 'knob'),
        ellipse(0, l / 4, knob, knob, 'knob')
      ];
    }
  },

  // ==========================================
  // RANGEMENTS (STORAGE)
  // ==========================================
  {
    type: 'wardrobe',
    name: 'Armoire dressing',
    category: 'storage',
    width: 1.80,
    length: 0.60,
    icon: '🚪',
    shapes: (w, l) => {
      const m = Math.min(w, l) * 0.1;
      return [
        outline(w, l, 0.05),
        line(-w / 2 + w / 3, -l / 2, -w / 2 + w / 3, l / 2, 'outline'),
        line(-w / 2 + (w * 2) / 3, -l / 2, -w / 2 + (w * 2) / 3, l / 2, 'outline'),
        // Tringle à vêtements symbolique
        line(-w / 2 + m, 0, w / 2 - m, 0, 'outline', { dash: '4,3', strokeWidth: 1.2, opacity: 0.6 })
      ];
    }
  },

  // ==========================================
  // REPAS & BUREAU (TABLE)
  // ==========================================
  {
    type: 'dining_table_6',
    name: 'Table repas (6 chaises)',
    category: 'table',
    width: 1.60,
    length: 0.90,
    icon: '🍽️',
    shapes: (w, l) => {
      // Les chaises débordent de l'emprise du plateau (voir furnitureBounds).
      const chairW = w * 0.24;
      const chairD = Math.min(0.18, l * 0.25);
      const m = w * 0.04;
      const xs = [-w / 2 + m, -chairW / 2, w / 2 - chairW - m];
      const r = Math.min(chairW, chairD) * 0.2;
      return [
        outline(w, l, 0.06),
        ...xs.map(x => rect(x, -l / 2 - chairD, chairW, chairD, 'body', r)),
        ...xs.map(x => rect(x, l / 2, chairW, chairD, 'body', r))
      ];
    }
  },
  {
    type: 'desk',
    name: 'Bureau avec fauteuil',
    category: 'table',
    width: 1.40,
    length: 0.70,
    icon: '💻',
    shapes: (w, l) => {
      const screenW = Math.min(w * 0.4, 0.6);
      const screenH = Math.min(l * 0.06, 0.05);
      const cutR = Math.min(w * 0.2, l * 0.45);
      return [
        outline(w, l, 0.05),
        // Écran d'ordinateur symbolique
        rect(-screenW / 2, -l / 2 + l * 0.08, screenW, screenH, 'highlight', screenH * 0.25),
        // Évidement chaise
        path([['M', -cutR, l / 2], ['A', cutR, cutR, 0, 1, cutR, l / 2]], 'outline', { dash: '3,3' })
      ];
    }
  },
  {
    // Identifiant historique conservé pour la compatibilité des projets existants.
    type: 'chair_starck',
    name: 'Chaise médaillon transparente',
    legacyNames: ['Chaise Starck (Ghost)'],
    category: 'table',
    width: 0.54,
    length: 0.55,
    icon: '🪑',
    shapes: (w, l) => {
      const s = Math.min(w, l);
      const mx = w * 0.04;
      const seatTop = -l / 2 + l * 0.11;
      return [
        // Assise aux coins adoucis
        rect(-w / 2 + mx, seatTop, w - mx * 2, l - l * 0.18, 'body', s * 0.11),
        // Dossier médaillon
        ellipse(0, seatTop, s * 0.32, l * 0.16, 'glass', { strokeWidth: 1.6 }),
        // Accoudoirs galbés
        path([['M', -w / 2 + mx * 2, -l / 2 + l * 0.18], ['Q', -w / 2 + mx * 0.5, 0, -w / 2 + mx * 3, l / 2 - l * 0.11]], 'outline', { strokeWidth: 1.4, opacity: 0.8 }),
        path([['M', w / 2 - mx * 2, -l / 2 + l * 0.18], ['Q', w / 2 - mx * 0.5, 0, w / 2 - mx * 3, l / 2 - l * 0.11]], 'outline', { strokeWidth: 1.4, opacity: 0.8 }),
        // Galbe de l'assise transparente
        ellipse(0, l * 0.08, s * 0.21, s * 0.21, 'outline', { dash: '2,2', opacity: 0.4 })
      ];
    }
  },
  {
    type: 'console',
    name: 'Console murale',
    category: 'table',
    width: 1.20,
    length: 0.35,
    icon: '🗄️',
    shapes: (w, l) => {
      const g = Math.min(w, l) * 0.08;
      const drawerW = (w - g * 3) / 2;
      const handle = Math.min(w, l) * 0.05;
      return [
        outline(w, l, 0.08),
        rect(-w / 2 + g, -l / 2 + g, drawerW, l - g * 2, 'accent', g * 0.6),
        rect(g / 2, -l / 2 + g, drawerW, l - g * 2, 'accent', g * 0.6),
        ellipse(-w / 4, 0, handle, handle, 'brass'),
        ellipse(w / 4, 0, handle, handle, 'brass')
      ];
    }
  },

  // ==========================================
  // SANITAIRES (BATHROOM)
  // ==========================================
  {
    type: 'toilet',
    name: 'WC / Toilettes',
    category: 'bathroom',
    width: 0.45,
    length: 0.65,
    icon: '🚽',
    shapes: (w, l) => {
      const tankH = l * 0.28;
      const g = w * 0.04;
      const r = Math.max(0, w / 2 - g);
      const top = -l / 2 + tankH;
      const arcY = Math.max(top, l / 2 - r);
      return [
        rect(-w / 2, -l / 2, w, tankH, 'accent', Math.min(w, tankH) * 0.15),
        path([['M', -w / 2 + g, top], ['L', w / 2 - g, top], ['L', w / 2 - g, arcY], ['A', r, r, 0, 1, -w / 2 + g, arcY], ['Z']], 'body')
      ];
    }
  },
  {
    type: 'shower',
    name: 'Douche italienne',
    category: 'bathroom',
    width: 0.90,
    length: 0.90,
    icon: '🚿',
    shapes: (w, l) => {
      const drain = Math.min(w, l) * 0.045;
      const diag = { strokeWidth: 1, dash: '2,2', opacity: 0.6 };
      return [
        outline(w, l, 0.03),
        line(-w / 2, -l / 2, 0, 0, 'outline', diag),
        line(w / 2, -l / 2, 0, 0, 'outline', diag),
        line(-w / 2, l / 2, 0, 0, 'outline', diag),
        line(w / 2, l / 2, 0, 0, 'outline', diag),
        ellipse(0, 0, drain, drain, 'drain')
      ];
    }
  },
  {
    type: 'bathtub',
    name: 'Baignoire droite',
    category: 'bathroom',
    width: 1.70,
    length: 0.75,
    icon: '🛁',
    strokeWidth: 1.6,
    shapes: (w, l) => {
      const m = Math.min(w, l) * 0.08;
      const drain = Math.min(w, l) * 0.035;
      return [
        outline(w, l, 0.07),
        rect(-w / 2 + m, -l / 2 + m, w - m * 2, l - m * 2, 'water', (l - m * 2) / 2),
        ellipse(-w / 2 + m + Math.min(w, l) * 0.15, 0, drain, drain, 'knob')
      ];
    }
  },
  {
    type: 'sink_vanity',
    name: 'Meuble vasque',
    category: 'bathroom',
    width: 0.90,
    length: 0.50,
    icon: '🧼',
    shapes: (w, l) => {
      const basinRy = (l * 0.65) / 2;
      const tap = Math.min(w, l) * 0.04;
      return [
        outline(w, l, 0.06),
        ellipse(0, 0, (w * 0.65) / 2, basinRy, 'water'),
        ellipse(0, -basinRy + tap * 1.2, tap, tap, 'knob')
      ];
    }
  },
  {
    type: 'double_vanity',
    name: 'Meuble double vasque',
    category: 'bathroom',
    width: 1.40,
    length: 0.50,
    icon: '🫧',
    shapes: (w, l) => {
      const bW = (w * 0.35);
      const basinRy = (l * 0.65) / 2;
      const tap = Math.min(w, l) * 0.04;
      const leftX = -w / 4;
      const rightX = w / 4;
      return [
        outline(w, l, 0.06),
        ellipse(leftX, 0, bW / 2, basinRy, 'water'),
        ellipse(leftX, -basinRy + tap * 1.2, tap, tap, 'knob'),
        ellipse(rightX, 0, bW / 2, basinRy, 'water'),
        ellipse(rightX, -basinRy + tap * 1.2, tap, tap, 'knob')
      ];
    }
  },
  {
    type: 'towel_dryer',
    name: 'Sèche-serviettes',
    category: 'bathroom',
    width: 0.55,
    length: 0.15,
    icon: '♨️',
    shapes: (w, l) => {
      const bars = 4;
      const step = l / (bars + 1);
      return [
        outline(w, l, 0.04),
        ...Array.from({ length: bars }, (_, i) => {
          const y = -l / 2 + (i + 1) * step;
          return line(-w / 2 + 0.04, y, w / 2 - 0.04, y, 'heat', { strokeWidth: 1.5 });
        })
      ];
    }
  },

  // ==========================================
  // CUISINE & ÉLECTROMÉNAGER (KITCHEN)
  // ==========================================
  {
    type: 'kitchen_sink',
    name: 'Évier cuisine double',
    category: 'kitchen',
    width: 1.00,
    length: 0.60,
    icon: '🚰',
    shapes: (w, l) => {
      const g = Math.min(w, l) * 0.08;
      const basinW = (w - g * 3) / 2;
      const basinH = l - g * 2.6;
      return [
        outline(w, l, 0.05),
        rect(-w / 2 + g, -l / 2 + g * 1.6, basinW, basinH, 'water', Math.min(basinW, basinH) * 0.12),
        rect(g / 2, -l / 2 + g * 1.6, basinW, basinH, 'water', Math.min(basinW, basinH) * 0.12),
        ellipse(0, -l / 2 + g * 0.8, g * 0.4, g * 0.4, 'brass')
      ];
    }
  },
  {
    type: 'cooktop',
    name: 'Plaque de cuisson',
    category: 'kitchen',
    width: 0.60,
    length: 0.60,
    icon: '🍳',
    shapes: (w, l) => {
      const rLarge = Math.min(w, l) * 0.18;
      const rSmall = Math.min(w, l) * 0.13;
      return [
        outline(w, l, 0.07),
        ellipse(-w / 4, -l / 4, rLarge, rLarge, 'heat'),
        ellipse(w / 4, -l / 4, rSmall, rSmall, 'heat'),
        ellipse(-w / 4, l / 4, rSmall, rSmall, 'heat'),
        ellipse(w / 4, l / 4, rLarge, rLarge, 'heat')
      ];
    }
  },
  {
    type: 'fridge',
    name: 'Réfrigérateur',
    category: 'kitchen',
    width: 0.65,
    length: 0.65,
    icon: '🧊',
    shapes: (w, l) => {
      const flake = Math.min(w, l) * 0.18;
      const branches = [90, 30, 150].map(deg => {
        const dx = flake * Math.cos((deg * Math.PI) / 180);
        const dy = flake * Math.sin((deg * Math.PI) / 180);
        return line(-dx, l * 0.06 - dy, dx, l * 0.06 + dy, 'frost', { strokeWidth: 1.4 });
      });
      return [
        outline(w, l, 0.05),
        line(-w / 2, -l / 2 + l * 0.09, w / 2, -l / 2 + l * 0.09, 'outline', { strokeWidth: 2 }),
        line(-w / 2 + w * 0.12, -l / 2 + l * 0.045, -w / 2 + w * 0.3, -l / 2 + l * 0.045, 'frost', { strokeWidth: 2 }),
        // Symbole froid (flocon)
        ...branches
      ];
    }
  },
  {
    type: 'fridge_us',
    name: 'Réfrigérateur américain',
    category: 'kitchen',
    width: 0.95,
    length: 0.75,
    icon: '🧊',
    shapes: (w, l) => {
      return [
        outline(w, l, 0.05),
        line(0, -l / 2, 0, l / 2, 'outline', { strokeWidth: 1.8 }),
        line(-w / 2, -l / 2 + l * 0.1, w / 2, -l / 2 + l * 0.1, 'outline', { strokeWidth: 1.4 }),
        // Poignées verticales doubles
        line(-0.04, -l / 2 + 0.02, -0.04, -l / 2 + 0.08, 'brass', { strokeWidth: 2.2 }),
        line(0.04, -l / 2 + 0.02, 0.04, -l / 2 + 0.08, 'brass', { strokeWidth: 2.2 })
      ];
    }
  },
  {
    type: 'dishwasher',
    name: 'Lave-vaisselle',
    category: 'kitchen',
    width: 0.60,
    length: 0.60,
    icon: '🍽️',
    shapes: (w, l) => {
      const knob = Math.min(w, l) * 0.04;
      return [
        outline(w, l, 0.05),
        line(-w / 2, -l / 2 + l * 0.15, w / 2, -l / 2 + l * 0.15, 'outline', { strokeWidth: 1.5 }),
        ellipse(-w / 4, -l / 2 + l * 0.075, knob, knob, 'knob'),
        line(-w * 0.1, -l / 2 + l * 0.075, w * 0.3, -l / 2 + l * 0.075, 'outline', { strokeWidth: 1.5 }),
        // Panier à vaisselle symbolisé
        rect(-w / 2 + 0.06, -l / 2 + l * 0.22, w - 0.12, l * 0.65, 'outline', 0.03, { strokeWidth: 1, dash: '3,3', opacity: 0.6 })
      ];
    }
  },
  {
    type: 'washing_machine',
    name: 'Lave-linge',
    category: 'kitchen',
    width: 0.60,
    length: 0.60,
    icon: '🧺',
    shapes: (w, l) => {
      const r = Math.min(w, l) * 0.32;
      const knob = Math.min(w, l) * 0.035;
      return [
        outline(w, l, 0.05),
        line(-w / 2, -l / 2 + l * 0.15, w / 2, -l / 2 + l * 0.15, 'outline', { strokeWidth: 1.5 }),
        ellipse(-w / 4, -l / 2 + l * 0.075, knob, knob, 'knob'),
        ellipse(w / 4, -l / 2 + l * 0.075, knob * 1.5, knob * 1.5, 'knob'),
        // Hublot tambour
        ellipse(0, l * 0.08, r, r, 'glass', { strokeWidth: 2 }),
        ellipse(0, l * 0.08, r * 0.5, r * 0.5, 'water', { strokeWidth: 1.2 })
      ];
    }
  },

  // ==========================================
  // DÉCORATION & MIROIRS (OTHER)
  // ==========================================
  {
    type: 'mirror',
    name: 'Miroir mural',
    category: 'other',
    width: 0.80,
    length: 0.12,
    icon: '🪞',
    shapes: (w, l) => {
      return [
        outline(w, l, 0.04),
        rect(-w / 2 + 0.02, -l / 2 + 0.02, w - 0.04, l - 0.04, 'glass', 0.02),
        line(-w / 3, -l / 4, -w / 6, l / 4, 'highlight', { strokeWidth: 1.2, opacity: 0.8 })
      ];
    }
  },
  {
    type: 'wall_art',
    name: 'Tableau / Poster',
    category: 'other',
    width: 0.90,
    length: 0.10,
    icon: '🖼️',
    shapes: (w, l) => {
      return [
        outline(w, l, 0.04),
        rect(-w / 2 + 0.02, -l / 2 + 0.02, w - 0.04, l - 0.04, 'accent', 0.01),
        line(-w / 2 + 0.04, 0, w / 2 - 0.04, 0, 'highlight', { strokeWidth: 1.2 })
      ];
    }
  }
];

export const FURNITURE_CATALOG: FurnitureCatalogTemplate[] = CATALOG_DEFINITIONS.map(def => ({
  ...def,
  renderSvg: (wPx: number, lPx: number, isSelected: boolean) => renderLegacySymbol(def, wPx, lPx, isSelected)
}));

/** Catégories présentes dans le catalogue, dans l'ordre d'affichage des filtres du volet. */
export const FURNITURE_FILTER_CATEGORIES: readonly FurnitureCategory[] =
  CATEGORY_ORDER.filter(c => FURNITURE_CATALOG.some(t => t.category === c));

export function findFurnitureTemplate(type: string): FurnitureCatalogTemplate | undefined {
  return FURNITURE_CATALOG.find(f => f.type === type);
}

/** Nom d'un modèle du catalogue dans la langue courante ; l'identifiant brut pour un type inconnu. */
export function furnitureTemplateName(type: string): string {
  return findFurnitureTemplate(type) ? localize(`geometry.furniture.${type}`) : type;
}

/**
 * Le nom enregistré est-il un nom par défaut du modèle : nom enregistré par défaut, ancien nom
 * (renommage du catalogue) ou traduction dans l'une des langues (meuble nommé dans une autre langue) ?
 */
function isDefaultFurnitureName(template: FurnitureTemplateDefinition, name: string): boolean {
  return name === template.name
    || (template.legacyNames?.includes(name) ?? false)
    || geometryTranslations(`geometry.furniture.${template.type}`).includes(name);
}

/**
 * Nom d'affichage d'un meuble : le nom choisi par l'utilisateur, ou, pour un nom par défaut de
 * son modèle (dans n'importe quelle langue, ou ancien nom), le nom du modèle dans la langue courante.
 */
export function furnitureDisplayName(item: Pick<FurnitureItem, 'type' | 'name'>): string {
  const template = findFurnitureTemplate(item.type);
  if (!template) return item.name || item.type;
  return !item.name || isDefaultFurnitureName(template, item.name) ? furnitureTemplateName(template.type) : item.name;
}

/**
 * Nom à enregistrer dans le projet (normalisation) : le nom choisi par l'utilisateur, ou le nom
 * enregistré par défaut du modèle (jamais une traduction, pour qu'un projet ne dépende pas de la
 * langue de l'interface qui l'a sauvegardé).
 */
export function canonicalFurnitureName(item: Pick<FurnitureItem, 'type' | 'name'>): string {
  const template = findFurnitureTemplate(item.type);
  if (!template) return item.name || item.type;
  return !item.name || isDefaultFurnitureName(template, item.name) ? template.name : item.name;
}

// ------------------------------------------------------------------
// Rendu
// ------------------------------------------------------------------

interface ResolvedPaint {
  fill: ThemedColor | null;
  stroke: ThemedColor | null;
}

interface ResolvedSymbol {
  shapes: SymbolShape[];
  strokeWidth: number;
  bodyFill: ThemedColor;
  selected: boolean;
  /** Icône de repli (meuble inconnu du catalogue) et sa taille en unités de rendu. */
  icon?: { text: string; size: number };
}

/** Couleurs de remplissage (null = 'none') et de trait (null = 'none') d'un rôle de peinture. */
function resolvePaint(paint: SymbolPaint, selected: boolean, bodyFill: ThemedColor): ResolvedPaint {
  const c = SYMBOL_COLORS;
  const stroke = selected ? c.selected : c.stroke;
  switch (paint) {
    case 'body': return { fill: bodyFill, stroke };
    case 'accent': return { fill: c.accent, stroke };
    case 'soft': return { fill: c.soft, stroke };
    case 'water': return { fill: c.water, stroke };
    case 'heat': return { fill: c.heat, stroke };
    case 'glass': return { fill: c.glass, stroke };
    case 'outline': return { fill: null, stroke };
    case 'highlight': return selected ? { fill: c.selected, stroke: c.selected } : { fill: c.highlight, stroke: c.highlight };
    case 'frost': return { fill: null, stroke: c.frost };
    case 'knob': return { fill: stroke, stroke: null };
    case 'brass': return { fill: selected ? c.selected : c.brass, stroke: null };
    case 'drain': return { fill: selected ? c.selected : c.drain, stroke: null };
  }
}

/** Valeur littérale (SVG exporté). */
function literal(color: ThemedColor | null): string {
  return color ? color.value : 'none';
}

/** Valeur CSS thémable (rendu Lit) : le jeton avec la couleur sombre en repli. */
function themed(color: ThemedColor | null): string {
  if (!color) return 'none';
  return color.token ? `var(--arch-furniture-${color.token}, ${color.value})` : color.value;
}

/** Couleur acceptée dans un attribut `style` (même règle que normalizeProject), sinon undefined. */
function safeColor(color: string | undefined): string | undefined {
  return color && SAFE_COLOR.test(color) && !UNSAFE_COLOR.test(color) ? color : undefined;
}

/**
 * Couleur du corps : celle du meuble si elle est sûre, sinon celle du modèle, sinon la teinte
 * neutre ; la sélection prime.
 */
function bodyFillColor(selected: boolean, color: string | undefined, templateColor: string | undefined): ThemedColor {
  if (selected) return SYMBOL_COLORS['selected-fill'];
  const value = safeColor(color) ?? safeColor(templateColor);
  return value ? { value } : SYMBOL_COLORS.fill;
}

function positive(v: number | undefined): number | undefined {
  return typeof v === 'number' && Number.isFinite(v) && v > 0 ? v : undefined;
}

/** Dimensions effectives (m) d'un meuble : les siennes, sinon celles du modèle, sinon 1 m. */
function furnitureSize(item: FurnitureSymbolSource, template: FurnitureTemplateDefinition | undefined): { w: number; l: number } {
  return {
    w: positive(item.width) ?? template?.width ?? 1,
    l: positive(item.length) ?? template?.length ?? 1
  };
}

/** Symbole d'un modèle (ou d'un type inconnu) de w × l mètres, rendu à `scale` unités par mètre. */
function resolveSymbol(
  template: FurnitureTemplateDefinition | undefined,
  w: number,
  l: number,
  scale: number,
  selected: boolean,
  color?: string,
  icon?: string
): ResolvedSymbol {
  const bodyFill = bodyFillColor(selected, color, template?.defaultColor);
  const detailed = template !== undefined && Math.min(w, l) * scale >= MIN_SYMBOL_DETAIL_PX;
  const resolved: ResolvedSymbol = {
    shapes: detailed ? template.shapes(w, l) : [outline(w, l, 0.06)],
    strokeWidth: template?.strokeWidth ?? DEFAULT_STROKE_WIDTH,
    bodyFill,
    selected
  };
  if (!template && Math.min(w, l) * scale >= MIN_SYMBOL_DETAIL_PX) {
    // Même repli que l'ancien rendu du canevas pour un type inconnu : 📦 sans icône propre.
    resolved.icon = { text: icon || UNKNOWN_FURNITURE_ICON, size: clamp(Math.min(w, l) * scale * 0.5, 8, 16) };
  }
  return resolved;
}

function resolveItemSymbol(item: FurnitureSymbolSource, opts: FurnitureSymbolOptions): { sym: ResolvedSymbol; k: number } {
  const template = findFurnitureTemplate(item.type);
  const { w, l } = furnitureSize(item, template);
  const k = positive(opts.pixelsPerMeter) ?? 1;
  return { sym: resolveSymbol(template, w, l, k, opts.selected === true, item.color, item.icon), k };
}

/** Arrondi au centième d'unité de rendu (SVG compact, sans -0). */
function n(v: number): number {
  const r = Math.round(v * 100) / 100;
  return r === 0 ? 0 : r;
}

function pathData(d: SymbolPathCommand[], k: number): string {
  return d.map(c => {
    switch (c[0]) {
      case 'M': case 'L': return `${c[0]} ${n(c[1] * k)} ${n(c[2] * k)}`;
      case 'Q': return `Q ${n(c[1] * k)} ${n(c[2] * k)} ${n(c[3] * k)} ${n(c[4] * k)}`;
      case 'A': return `A ${n(c[1] * k)} ${n(c[2] * k)} 0 ${c[3]} ${c[4]} ${n(c[5] * k)} ${n(c[6] * k)}`;
      default: return 'Z';
    }
  }).join(' ');
}

/** Attributs SVG d'une primitive projetée à l'échelle k (valeurs numériques ou chaînes, jamais négatives pour les tailles). */
function shapeAttributes(s: SymbolShape, k: number): Array<[string, string | number]> {
  switch (s.kind) {
    case 'rect': return [['x', n(s.x * k)], ['y', n(s.y * k)], ['width', n(s.w * k)], ['height', n(s.h * k)], ['rx', n((s.r ?? 0) * k)]];
    case 'ellipse': return [['cx', n(s.cx * k)], ['cy', n(s.cy * k)], ['rx', n(s.rx * k)], ['ry', n(s.ry * k)]];
    case 'line': return [['x1', n(s.x1 * k)], ['y1', n(s.y1 * k)], ['x2', n(s.x2 * k)], ['y2', n(s.y2 * k)]];
    case 'path': return [['d', pathData(s.d, k)]];
  }
}

function styleAttributes(s: SymbolShape, sym: ResolvedSymbol): Array<[string, string | number]> {
  const paint = resolvePaint(s.paint, sym.selected, sym.bodyFill);
  const attrs: Array<[string, string | number]> = [['fill', literal(paint.fill)], ['stroke', literal(paint.stroke)]];
  if (paint.stroke) attrs.push(['stroke-width', s.strokeWidth ?? sym.strokeWidth]);
  if (paint.stroke && s.dash) attrs.push(['stroke-dasharray', s.dash]);
  if (s.opacity !== undefined) attrs.push(['opacity', s.opacity]);
  return attrs;
}

function shapeTemplate(s: SymbolShape, k: number, sym: ResolvedSymbol): SVGTemplateResult {
  const paint = resolvePaint(s.paint, sym.selected, sym.bodyFill);
  // Couleurs dans `style` : var() n'est pas fiable dans les attributs de présentation SVG.
  const style = `fill: ${themed(paint.fill)}; stroke: ${themed(paint.stroke)}`;
  const strokeWidth = paint.stroke ? (s.strokeWidth ?? sym.strokeWidth) : nothing;
  const dash = paint.stroke && s.dash ? s.dash : nothing;
  const opacity = s.opacity ?? nothing;
  switch (s.kind) {
    case 'rect':
      return svg`<rect x=${n(s.x * k)} y=${n(s.y * k)} width=${n(s.w * k)} height=${n(s.h * k)} rx=${n((s.r ?? 0) * k)}
        style=${style} stroke-width=${strokeWidth} stroke-dasharray=${dash} opacity=${opacity} />`;
    case 'ellipse':
      return svg`<ellipse cx=${n(s.cx * k)} cy=${n(s.cy * k)} rx=${n(s.rx * k)} ry=${n(s.ry * k)}
        style=${style} stroke-width=${strokeWidth} stroke-dasharray=${dash} opacity=${opacity} />`;
    case 'line':
      return svg`<line x1=${n(s.x1 * k)} y1=${n(s.y1 * k)} x2=${n(s.x2 * k)} y2=${n(s.y2 * k)}
        style=${style} stroke-width=${strokeWidth} stroke-dasharray=${dash} opacity=${opacity} />`;
    case 'path':
      return svg`<path d=${pathData(s.d, k)}
        style=${style} stroke-width=${strokeWidth} stroke-dasharray=${dash} opacity=${opacity} />`;
  }
}

/**
 * Symbole d'un meuble pour le canevas et la carte (Lit), centré sur l'origine : l'appelant le place
 * avec `translate(x, y) rotate(rotation)`. `pixelsPerMeter` = échelle d'affichage (ppm × zoom).
 * Couleur : item.color, sinon defaultColor du modèle, sinon teinte neutre ; la sélection prime.
 * Un type inconnu du catalogue est dessiné comme un rectangle avec son icône.
 */
export function renderFurnitureSymbol(item: FurnitureSymbolSource, opts: FurnitureSymbolOptions): SVGTemplateResult {
  const { sym, k } = resolveItemSymbol(item, opts);
  return symbolTemplate(sym, k);
}

function symbolTemplate(sym: ResolvedSymbol, k: number): SVGTemplateResult {
  return svg`
    <g class="furniture-symbol">
      ${sym.shapes.map(s => shapeTemplate(s, k, sym))}
      ${sym.icon ? svg`<text x="0" y=${n(sym.icon.size * 0.35)} text-anchor="middle" font-size=${n(sym.icon.size)}
        style=${`fill: ${themed(SYMBOL_COLORS.highlight)}; stroke: none`}>${sym.icon.text}</text>` : nothing}
    </g>
  `;
}

/** Adaptateur de l'ancienne signature en pixels (voir FurnitureCatalogTemplate.renderSvg). */
function renderLegacySymbol(def: FurnitureTemplateDefinition, wPx: number, lPx: number, selected: boolean): SVGTemplateResult {
  const k = wPx > 0 ? wPx / def.width : 1;
  return symbolTemplate(resolveSymbol(def, Math.max(0, wPx) / k, Math.max(0, lPx) / k, k, selected), k);
}

function escapeXml(value: string): string {
  return value.replace(/[<>&'"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '\'': '&apos;', '"': '&quot;' }[c] as string));
}

/**
 * Même symbole que renderFurnitureSymbol, sous forme de balisage SVG (export du plan).
 * `pixelsPerMeter` = échelle du SVG exporté. Toutes les valeurs textuelles sont échappées.
 */
export function furnitureSymbolMarkup(item: FurnitureSymbolSource, opts: FurnitureSymbolOptions): string {
  const { sym, k } = resolveItemSymbol(item, opts);
  const attr = (pairs: Array<[string, string | number]>) =>
    pairs.map(([name, value]) => `${name}="${escapeXml(String(value))}"`).join(' ');
  const parts = sym.shapes.map(s => `<${s.kind} ${attr([...shapeAttributes(s, k), ...styleAttributes(s, sym)])} />`);
  if (sym.icon) {
    parts.push(`<text x="0" y="${n(sym.icon.size * 0.35)}" text-anchor="middle" font-size="${n(sym.icon.size)}" fill="${literal(SYMBOL_COLORS.highlight)}" stroke="none">${escapeXml(sym.icon.text)}</text>`);
  }
  return `<g class="furniture-symbol">${parts.join('')}</g>`;
}

/** Boîte englobante locale (m, avant rotation) des primitives d'un symbole. */
function localExtents(shapes: SymbolShape[], w: number, l: number): { minX: number; minY: number; maxX: number; maxY: number } {
  let minX = -w / 2, minY = -l / 2, maxX = w / 2, maxY = l / 2;
  const add = (x: number, y: number) => {
    minX = Math.min(minX, x); minY = Math.min(minY, y);
    maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
  };
  for (const s of shapes) {
    switch (s.kind) {
      case 'rect': add(s.x, s.y); add(s.x + s.w, s.y + s.h); break;
      case 'ellipse': add(s.cx - s.rx, s.cy - s.ry); add(s.cx + s.rx, s.cy + s.ry); break;
      case 'line': add(s.x1, s.y1); add(s.x2, s.y2); break;
      case 'path':
        for (const c of s.d) {
          if (c[0] === 'M' || c[0] === 'L') add(c[1], c[2]);
          else if (c[0] === 'Q') { add(c[1], c[2]); add(c[3], c[4]); }
          else if (c[0] === 'A') add(c[5], c[6]);
        }
        break;
    }
  }
  return { minX, minY, maxX, maxY };
}

/**
 * Emprise d'un meuble dans le monde (m) : boîte englobante alignée sur les axes de son symbole
 * (décors débordants compris, ex. chaises de la table) après rotation autour de sa position.
 * À utiliser pour la boîte d'export, le recadrage et la sélection au cadre.
 */
export function furnitureBounds(item: FurnitureSymbolSource & Pick<FurnitureItem, 'position'> & Partial<Pick<FurnitureItem, 'rotation'>>): { minX: number; minY: number; maxX: number; maxY: number } {
  const template = findFurnitureTemplate(item.type);
  const { w, l } = furnitureSize(item, template);
  const local = localExtents(template ? template.shapes(w, l) : [], w, l);
  const rad = (((item.rotation ?? 0) % 360) * Math.PI) / 180;
  const cos = Math.cos(rad), sin = Math.sin(rad);
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [x, y] of [[local.minX, local.minY], [local.maxX, local.minY], [local.maxX, local.maxY], [local.minX, local.maxY]]) {
    // Même convention que le transform SVG rotate(θ) (repère Y vers le bas).
    const wx = item.position.x + x * cos - y * sin;
    const wy = item.position.y + x * sin + y * cos;
    minX = Math.min(minX, wx); minY = Math.min(minY, wy);
    maxX = Math.max(maxX, wx); maxY = Math.max(maxY, wy);
  }
  return { minX, minY, maxX, maxY };
}
