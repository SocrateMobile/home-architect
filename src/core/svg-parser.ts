/**
 * Interprétation d'un plan d'architecte au format SVG en murs, ouvertures et pièces.
 *
 * Le traitement est découpé en trois étapes pour ne jamais tout recalculer pendant la saisie :
 *  1. `analyze()` — lecture du DOM, une fois par fichier : primitives géométriques en unités utilisateur
 *     de la racine (repère de la viewBox), styles effectifs, calques, étiquettes ; SVG nettoyé prêt
 *     à être téléversé (sans DOCTYPE, viewBox garantie) ;
 *  2. `detect()` — mise à l'échelle et reconnaissance (murs, portes, fenêtres, pièces), relancée quand
 *     la largeur saisie ou les calques retenus changent ;
 *  3. `select()` — filtres des cases à cocher, instantané.
 *
 * Toutes les structures de recherche sont indexées (tri par direction et par décalage, grille de
 * hachage) : le coût reste en O(n log n) même pour un export DWG de plusieurs dizaines de milliers de
 * segments.
 */
import { Opening, OpeningType, Point, Room, Wall } from './types';
import { PolygonUtils } from './polygon';
import { generateElementId } from './project-model';
import { localize } from '../i18n';
import '../i18n/locales/import';

// ---------------------------------------------------------------------------------------------
// Types publics
// ---------------------------------------------------------------------------------------------

/** Rectangle en unités utilisateur de la racine du SVG. */
export interface SvgBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SvgParseOptions {
  /** Largeur réelle (m) de l'emprise des murs détectés (marges, cartouche et cotes extérieures exclus). Défaut 12. */
  totalWidthMeters?: number;
  /** Épaisseur (m) des murs dessinés en simple trait, faute d'épaisseur mesurable. Défaut 0,20. */
  defaultThickness?: number;
  /** Hauteur (m) des murs et des pièces créés. Défaut 2,50. */
  defaultHeight?: number;
  importWalls?: boolean;
  /** Portes (n'ont de sens qu'avec les murs qui les portent). */
  importDoors?: boolean;
  /** Fenêtres et portes-fenêtres (n'ont de sens qu'avec les murs qui les portent). */
  importWindows?: boolean;
  importRooms?: boolean;
  /** Nommer les pièces d'après les textes du plan (sinon « Pièce N »). */
  importLabels?: boolean;
  /** Surface minimale (m²) d'une pièce étiquetée. Défaut 0,5 ; une forme sans étiquette exige au moins 1,5 m². */
  minRoomAreaM2?: number;
  /** Surface maximale (m²) d'une pièce. Défaut 2000. */
  maxRoomAreaM2?: number;
  /** Calques (`SvgLayerInfo.id`) dont la géométrie est ignorée. */
  excludedLayers?: readonly string[];
}

export interface SvgParseStats {
  wallCount: number;
  doorCount: number;
  windowCount: number;
  roomCount: number;
  /** Pièces nommées d'après un texte du plan. */
  textLabelCount: number;
  ignoredMeasurementLinesCount: number;
}

/** Calque (Inkscape) ou groupe de premier niveau, désélectionnable dans l'aperçu. */
export interface SvgLayerInfo {
  id: string;
  name: string;
  /** Nombre de primitives exploitables (traits, formes, arcs, textes). */
  elementCount: number;
}

/** Pièce candidate écartée (signalée à l'utilisateur dans l'aperçu). */
export interface SvgIgnoredRoom {
  /** Nom issu d'un texte du plan ; '' pour une forme remplie sans étiquette. */
  name: string;
  areaM2: number;
  /** Surface hors des bornes, ou contour qui se recoupe (surface et rendu faux). */
  reason: 'area' | 'self_intersecting';
}

/** Origine de la viewBox retenue : attribut, taille absolue (width/height), emprise du contenu ou défaut. */
export type SvgViewBoxSource = 'attribute' | 'size' | 'content' | 'default';

/** Référence de la largeur saisie : emprise des murs, du contenu, ou toute la viewBox faute de mieux. */
export type SvgWidthReference = 'walls' | 'content' | 'viewBox';

/** Rôle déduit des identifiants, classes et libellés de calque (le niveau le plus proche l'emporte). */
export type SemanticRole = 'wall' | 'door' | 'window' | 'measurement' | 'ignore';

/** Remplissage effectif : aucun, clair (zone, pièce) ou sombre (mur plein « poché »). */
export type FillKind = 'none' | 'light' | 'dark';

/** Trait droit extrait du SVG (unités racine, transformations appliquées). */
export interface RawSegment {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  role: SemanticRole;
  /** Largeur de trait effective (unités racine) ; 0 si aucun trait visible. */
  stroke: number;
  /** Remplissage de la forme fermée d'origine ('none' pour un trait ouvert). */
  fill: FillKind;
  /** Indice de la forme fermée d'origine dans `shapes`, -1 pour un trait ouvert. */
  shape: number;
  layer: number;
}

/** Forme fermée (rect, polygon, sous-chemin fermé) : candidate pièce, cadre de page ou petit objet. */
export interface RawShape {
  points: Point[];
  role: SemanticRole;
  fill: FillKind;
  /** Remplissage déclaré (attribut, style ou classe, hérité compris) et non le noir par défaut. */
  fillExplicit: boolean;
  roomHint: boolean;
  stroke: number;
  layer: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

/** Quart de cercle (arc ou courbe de Bézier) : battant de porte potentiel. */
export interface RawArc {
  /** Centre de l'arc, c'est-à-dire la charnière d'une porte. */
  cx: number;
  cy: number;
  ax: number;
  ay: number;
  bx: number;
  by: number;
  /** Rayons mesurés après transformations (unités racine). */
  r1: number;
  r2: number;
  role: SemanticRole;
  layer: number;
}

export interface RawLabel {
  text: string;
  /** Centre estimé du texte (unités racine). */
  x: number;
  y: number;
  layer: number;
}

export interface SvgPrimitives {
  segments: RawSegment[];
  shapes: RawShape[];
  arcs: RawArc[];
  labels: RawLabel[];
}

/** Résultat de `analyze()` : à conserver tant que le fichier ne change pas. */
export interface SvgAnalysis {
  success: boolean;
  error?: string;
  /** Repère des primitives (unités utilisateur de la racine). */
  viewBox: SvgBox;
  viewBoxSource: SvgViewBoxSource;
  /** SVG nettoyé (sans DOCTYPE, viewBox garantie) pour l'aperçu et le téléversement du calque. */
  markup: string;
  layers: SvgLayerInfo[];
  /** Vrai si le document dépasse les plafonds de lecture (seule une partie a été analysée). */
  truncated: boolean;
  primitives: SvgPrimitives;
}

/** Pièce détectée, en deux variantes selon que les noms du plan sont importés ou non. */
export interface DetectedRoom {
  named: Room;
  generic: Room;
  /** Nom issu d'un texte du plan. */
  fromLabel: boolean;
  /** Pièce approximative créée autour d'une étiquette faute de contour (n'existe qu'avec les noms). */
  labelOnly: boolean;
}

/** Résultat de `detect()` : toutes les détections, avant les filtres des cases à cocher. */
export interface SvgDetection {
  success: boolean;
  error?: string;
  viewBox: SvgBox;
  /** Mètres réels par unité utilisateur de la racine (calque : background.scale = metersPerUnit × ppm du projet). */
  metersPerUnit: number;
  /** Emprise (m) servant de référence à la largeur saisie. */
  footprint: { width: number; height: number } | null;
  widthReference: SvgWidthReference;
  walls: Wall[];
  openings: Opening[];
  rooms: DetectedRoom[];
  ignoredRooms: SvgIgnoredRoom[];
  layers: SvgLayerInfo[];
  truncated: boolean;
  measurementLineCount: number;
}

export interface SvgParseResult {
  success: boolean;
  /** Éléments retenus (après filtres) ; les ouvertures n'existent qu'avec les murs importés. */
  walls: Wall[];
  openings: Opening[];
  rooms: Room[];
  /** Repère du SVG : origine (0,0) du monde = coin haut-gauche de la viewBox. */
  viewBox: SvgBox;
  /**
   * Mètres réels par unité utilisateur du SVG. Le pixelsPerMeter du projet n'en dépend PAS : le calque
   * d'origine (widthPx = viewBox.width) s'aligne avec background.scale = metersPerUnit × project.pixelsPerMeter.
   */
  metersPerUnit: number;
  footprint: { width: number; height: number } | null;
  widthReference: SvgWidthReference;
  /** Comptes du résultat final (après filtres). */
  stats: SvgParseStats;
  /** Comptes des détections avant filtres (libellés des cases à cocher). */
  available: SvgParseStats;
  ignoredRooms: SvgIgnoredRoom[];
  layers: SvgLayerInfo[];
  truncated: boolean;
  error?: string;
}

// ---------------------------------------------------------------------------------------------
// Constantes
// ---------------------------------------------------------------------------------------------

const SVG_NS = 'http://www.w3.org/2000/svg';

/** Conversion des unités CSS absolues en px (= unités utilisateur). */
const UNIT_TO_PX: Record<string, number> = {
  '': 1, px: 1, mm: 96 / 25.4, cm: 96 / 2.54, q: 96 / 101.6, in: 96, pt: 96 / 72, pc: 16, em: 16, rem: 16, ex: 8
};

const NUMBER_RE = /[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g;
const LENGTH_RE = /^\s*([-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?)\s*([a-zA-Z%]*)\s*$/;

/** Éléments jamais rendus directement (leur contenu ne s'affiche que via <use>, un clip, un masque…). */
const NON_RENDERED = new Set([
  'defs', 'clippath', 'symbol', 'marker', 'pattern', 'mask', 'metadata', 'title', 'desc', 'style', 'script',
  'lineargradient', 'radialgradient', 'filter', 'foreignobject', 'image', 'view', 'cursor', 'font', 'font-face'
]);

/** Propriétés de présentation lues sur les attributs, les règles CSS et l'attribut style. */
const PRESENTATION_PROPS = new Set([
  'fill', 'fill-opacity', 'stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'opacity', 'display',
  'visibility', 'font-size', 'text-anchor', 'marker', 'marker-start', 'marker-mid', 'marker-end', 'color'
]);

/** Plafonds de lecture (fichier piégé ou démesuré) : au-delà, l'analyse s'arrête et le signale. */
const MAX_ELEMENTS = 250_000;
const MAX_SEGMENTS = 150_000;
const MAX_USE_DEPTH = 8;
/** Au-delà, une forme fermée n'est pas une pièce plausible (et le test d'auto-intersection est en O(n²)). */
const MAX_ROOM_VERTICES = 2000;
/** Étiquettes d'un même contour comparées entre elles (recherche d'une cloison qui les sépare). */
const MAX_LABEL_PAIRS = 64;

/**
 * Mots-clés des identifiants, classes et calques (comparés mot à mot, sans accents ni pluriel). Ce ne
 * sont pas des libellés d'interface : chaque rôle reconnaît les termes français ET anglais des logiciels
 * de plan (exports DWG, Inkscape, SketchUp…), quelle que soit la langue de l'utilisateur.
 */
const ROLE_WORDS: Record<string, SemanticRole> = {
  // Cotation, annotations, trames, pointillés, flèches : jamais des murs
  dimension: 'measurement', dim: 'measurement', cotation: 'measurement', cote: 'measurement', cotes: 'measurement', mesure: 'measurement',
  measure: 'measurement', measurement: 'measurement', guide: 'measurement', guideline: 'measurement', axis: 'measurement',
  axe: 'measurement', fleche: 'measurement', arrow: 'measurement', tick: 'measurement', anno: 'measurement',
  annotation: 'measurement', grid: 'measurement', grille: 'measurement', trame: 'measurement', leader: 'measurement',
  centerline: 'measurement', centreline: 'measurement', dashed: 'measurement', dash: 'measurement',
  pointille: 'measurement', pointilles: 'measurement', dot: 'measurement', dotted: 'measurement',
  tirete: 'measurement', tirets: 'measurement', coffrage: 'measurement', cot: 'measurement', dimline: 'measurement',
  // Portes
  door: 'door', doorway: 'door', porte: 'door', portillon: 'door', portail: 'door', gate: 'door', swing: 'door',
  battant: 'door',
  // Fenêtres
  window: 'window', fenetre: 'window', vitrage: 'window', chassis: 'window', baie: 'window', glazing: 'window',
  glaz: 'window', velux: 'window', skylight: 'window', lucarne: 'window',
  // Mobilier, équipements, hachures, escaliers, cartouche : ni murs ni pièces
  mobilier: 'ignore', meuble: 'ignore', furniture: 'ignore', furn: 'ignore', equipement: 'ignore', equipment: 'ignore',
  fixture: 'ignore', fixt: 'ignore', sanitaire: 'ignore', sanitary: 'ignore', plumbing: 'ignore', appareil: 'ignore',
  appliance: 'ignore', electromenager: 'ignore', decor: 'ignore', decoration: 'ignore', plante: 'ignore',
  vegetation: 'ignore', hatch: 'ignore', hachure: 'ignore', escalier: 'ignore', stair: 'ignore', staircase: 'ignore',
  cartouche: 'ignore', titleblock: 'ignore', legend: 'ignore', legende: 'ignore',
  // Murs
  wall: 'wall', mur: 'wall', cloison: 'wall', facade: 'wall', envelope: 'wall', enveloppe: 'wall', structure: 'wall',
  partition: 'wall', maconnerie: 'wall', masonry: 'wall'
};

/** Mots qui balisent une forme comme pièce (français et anglais). */
const ROOM_WORDS = new Set([
  'room', 'piece', 'espace', 'space', 'zone', 'area', 'local',
  'chambre', 'bedroom', 'salon', 'sejour', 'living', 'lounge', 'cuisine', 'kitchen', 'sdb', 'bathroom',
  'cabinet', 'bureau', 'entree', 'degt', 'degagement'
]);

/** Noms de pièces (français et anglais) reconnus pour les pièces créées autour d'une étiquette. */
const ROOM_NAME_RE = new RegExp('\\b(' + [
  'salon', 'sejour', 'living', 'lounge', 'salle a manger', 'dining', 'sam',
  'chambre', 'bedroom', 'ch\\d*', 'suite', 'parentale',
  'cuisine', 'kitchen', 'kitchenette',
  'sdb', 'sde', 'sd', 'bain', 'bains', 'douche', 'bath', 'bathroom', 'shower', 'salle d ?eau',
  'wc', 'toilettes?', 'toilets?', 'restroom', 'lavatory',
  'bureau', 'office', 'study', 'cabinet', 'consultation',
  'entree', 'entry', 'entrance', 'hall', 'hallway', 'couloir', 'corridor', 'degagement', 'degt', 'degat', 'palier', 'landing', 'foyer',
  'garage', 'atelier', 'workshop',
  'cellier', 'cell', 'pantry', 'buanderie', 'buand', 'lingerie', 'laundry', 'utility', 'dressing', 'closet', 'placard', 'plac', 'pl', 'debarras', 'storage',
  'cave', 'cellar', 'grenier', 'mezzanine', 'reserve', 'chaufferie',
  'balcon', 'terrasse', 'loggia', 'veranda', 'patio', 'piece'
].join('|') + ')\\b');

/** Tolérances métriques de la reconnaissance (converties en unités racine selon l'échelle). */
const TOL = {
  mergeAngleDeg: 1.0,
  mergeOffset: 0.02,
  mergeGap: 0.05,
  mergeThickness: 0.03,
  pairAngleDeg: 2.0,
  pairMin: 0.04,
  pairMax: 0.5,
  pairMinOverlap: 0.15,
  pairMinPiece: 0.1,
  leftoverMin: 0.3,
  enclosed: 0.03,
  snap: 0.03,
  heal: 0.05,
  minWall: 0.2,
  minSegment: 0.02,
  smallObject: 0.45,
  frameCoverage: 0.9,
  frameMaxStroke: 0.05,
  frameTouch: 0.05,
  strokeThicknessMin: 0.05,
  strokeThicknessMax: 0.5,
  doorRadiusMin: 0.5,
  doorRadiusMax: 1.4,
  doorHinge: 0.3,
  openingDedupe: 0.35,
  openingSnap: 0.5,
  openingSpanMin: 0.4,
  openingSpanMax: 3.0,
  bridgeParallelDeg: 3.0,
  dividerMin: 1.0,
  dividerMargin: 0.3,
  dividerCell: 3.0,
  /** Une cloison s'arrête au plus à une baie (sans battant dessiné) du contour ou d'un autre mur. */
  dividerReach: 1.0,
  vertexMerge: 0.005,
  unlabeledRoomMin: 1.5,
  scaleRetry: 0.02
};

const DEFAULTS = {
  totalWidthMeters: 12,
  defaultThickness: 0.2,
  defaultHeight: 2.5,
  minRoomAreaM2: 0.5,
  maxRoomAreaM2: 2000
};

type Decls = Record<string, string>;

// ---------------------------------------------------------------------------------------------
// Outils texte, nombres, longueurs, couleurs
// ---------------------------------------------------------------------------------------------

/** Minuscules sans accents ; NFKD convertit aussi « ² » en « 2 ». */
function normalizeText(s: string): string {
  return s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/** Mots d'un identifiant : « imported_plan » → imported, plan ; « WallsLayer » → walls, layer ; « A-DOOR-01 » → a, door. */
function tokenize(s: string): string[] {
  return normalizeText(s.replace(/([a-z])([A-Z])/g, '$1 $2')).split(/[^a-z]+/).filter(Boolean);
}

function roleOfWord(word: string): SemanticRole | undefined {
  return ROLE_WORDS[word] ?? (/[sx]$/.test(word) ? ROLE_WORDS[word.slice(0, -1)] : undefined);
}

function isRoomWord(word: string): boolean {
  return ROOM_WORDS.has(word) || (/[sx]$/.test(word) && ROOM_WORDS.has(word.slice(0, -1)));
}

/** Rôle porté par l'élément lui-même (id, class, inkscape:label, data-name), sans ses ancêtres. */
function semanticOf(el: Element): { role: SemanticRole | null; roomHint: boolean } {
  const raw = [el.getAttribute('id'), el.getAttribute('class'), el.getAttribute('inkscape:label'), el.getAttribute('data-name')]
    .filter((v): v is string => !!v)
    .join(' ');
  if (!raw) return { role: null, roomHint: false };
  let measurement = false, door = false, windowHint = false, ignore = false, wall = false, roomHint = false;
  for (const word of tokenize(raw)) {
    const role = roleOfWord(word);
    if (role === 'measurement') measurement = true;
    else if (role === 'door') door = true;
    else if (role === 'window') windowHint = true;
    else if (role === 'ignore') ignore = true;
    else if (role === 'wall') wall = true;
    if (isRoomWord(word)) roomHint = true;
  }
  // Priorité : cotation > fenêtre (porte-fenêtre comprise) > porte > à ignorer > mur.
  const role: SemanticRole | null = measurement ? 'measurement'
    : windowHint ? 'window'
    : door ? 'door'
    : ignore ? 'ignore'
    : wall ? 'wall'
    : null;
  return { role, roomHint };
}

function localTag(el: Element): string {
  return (el.localName || el.tagName || '').toLowerCase();
}

function numbersOf(s: string | null | undefined): number[] {
  if (!s) return [];
  const out: number[] = [];
  for (const m of s.matchAll(NUMBER_RE)) {
    const v = Number(m[0]);
    if (Number.isFinite(v)) out.push(v);
  }
  return out;
}

/** Longueur SVG en unités utilisateur : unités absolues converties, % rapporté à `ref`. */
function parseLength(raw: string | null | undefined, ref: number, fallback: number): number {
  if (raw === null || raw === undefined) return fallback;
  const m = LENGTH_RE.exec(raw);
  if (!m) {
    // Liste de valeurs (x="10 20 30" d'un texte) : on garde la première.
    const first = /^\s*(\S+)/.exec(raw);
    return first && first[1] !== raw.trim() ? parseLength(first[1], ref, fallback) : fallback;
  }
  const value = Number(m[1]);
  if (!Number.isFinite(value)) return fallback;
  const unit = m[2].toLowerCase();
  if (unit === '%') return (value / 100) * ref;
  const factor = UNIT_TO_PX[unit];
  return factor === undefined ? fallback : value * factor;
}

/** Longueur absolue de la racine (width/height), null si absente ou relative (%). */
function absoluteLength(raw: string | null): number | null {
  if (!raw) return null;
  const m = LENGTH_RE.exec(raw);
  if (!m || m[2] === '%') return null;
  const factor = UNIT_TO_PX[m[2].toLowerCase()];
  const v = Number(m[1]) * (factor ?? NaN);
  return Number.isFinite(v) && v > 0 ? v : null;
}

function parseViewBox(raw: string | null): SvgBox | null {
  const n = numbersOf(raw);
  if (n.length < 4 || !(n[2] > 0) || !(n[3] > 0)) return null;
  return { x: n[0], y: n[1], width: n[2], height: n[3] };
}

function parseOpacity(raw: string | undefined): number {
  if (raw === undefined) return 1;
  const m = LENGTH_RE.exec(raw);
  if (!m) return 1;
  const v = Number(m[1]) / (m[2] === '%' ? 100 : 1);
  return Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 1;
}

const NAMED_COLORS: Record<string, [number, number, number]> = {
  black: [0, 0, 0], white: [255, 255, 255], gray: [128, 128, 128], grey: [128, 128, 128], silver: [192, 192, 192],
  darkgray: [169, 169, 169], darkgrey: [169, 169, 169], dimgray: [105, 105, 105], dimgrey: [105, 105, 105],
  lightgray: [211, 211, 211], lightgrey: [211, 211, 211], gainsboro: [220, 220, 220], whitesmoke: [245, 245, 245],
  red: [255, 0, 0], green: [0, 128, 0], blue: [0, 0, 255], navy: [0, 0, 128], maroon: [128, 0, 0]
};

/** Couleur CSS → [r, g, b, a] ; null si non reconnue (dégradé, nom exotique). */
function parseColor(raw: string): [number, number, number, number] | null {
  const v = raw.trim().toLowerCase();
  const hex = /^#([0-9a-f]{3,8})$/.exec(v);
  if (hex) {
    const h = hex[1];
    if (h.length === 3 || h.length === 4) {
      const c = h.split('').map(ch => parseInt(ch + ch, 16));
      return [c[0], c[1], c[2], h.length === 4 ? c[3] / 255 : 1];
    }
    if (h.length === 6 || h.length === 8) {
      const c = [0, 2, 4, 6].map(i => parseInt(h.slice(i, i + 2), 16));
      return [c[0], c[1], c[2], h.length === 8 ? c[3] / 255 : 1];
    }
    return null;
  }
  const fn = /^rgba?\(([^)]*)\)$/.exec(v);
  if (fn) {
    const parts = fn[1].split(/[\s,/]+/).filter(Boolean);
    if (parts.length < 3) return null;
    const ch = parts.slice(0, 3).map(p => (p.endsWith('%') ? (parseFloat(p) * 255) / 100 : parseFloat(p)));
    const a = parts[3] === undefined ? 1 : parts[3].endsWith('%') ? parseFloat(parts[3]) / 100 : parseFloat(parts[3]);
    return ch.every(Number.isFinite) && Number.isFinite(a) ? [ch[0], ch[1], ch[2], a] : null;
  }
  const named = NAMED_COLORS[v];
  return named ? [named[0], named[1], named[2], 1] : null;
}

function isNoPaint(v: string): boolean {
  const s = v.trim().toLowerCase();
  return s === 'none' || s === 'transparent';
}

function isDashed(v: string): boolean {
  if (/^\s*none\s*$/i.test(v)) return false;
  return numbersOf(v).some(n => n > 0);
}

/** Déclarations « prop: valeur; … » d'un attribut style ou d'un bloc CSS. */
function parseDeclarations(text: string): Decls {
  const out: Decls = {};
  for (const part of text.split(';')) {
    const i = part.indexOf(':');
    if (i <= 0) continue;
    const name = part.slice(0, i).trim().toLowerCase();
    const value = part.slice(i + 1).replace(/!important/i, '').trim();
    if (name && value) out[name] = value;
  }
  return out;
}

// ---------------------------------------------------------------------------------------------
// Matrice affine 2D ([a c e; b d f; 0 0 1])
// ---------------------------------------------------------------------------------------------

class Matrix2D {
  constructor(
    public a = 1,
    public b = 0,
    public c = 0,
    public d = 1,
    public e = 0,
    public f = 0
  ) {}

  public static identity(): Matrix2D {
    return new Matrix2D();
  }

  public multiply(o: Matrix2D): Matrix2D {
    return new Matrix2D(
      this.a * o.a + this.c * o.b,
      this.b * o.a + this.d * o.b,
      this.a * o.c + this.c * o.d,
      this.b * o.c + this.d * o.d,
      this.a * o.e + this.c * o.f + this.e,
      this.b * o.e + this.d * o.f + this.f
    );
  }

  public translate(tx: number, ty: number): Matrix2D {
    return tx === 0 && ty === 0 ? this : this.multiply(new Matrix2D(1, 0, 0, 1, tx, ty));
  }

  public scale(sx: number, sy = sx): Matrix2D {
    return this.multiply(new Matrix2D(sx, 0, 0, sy, 0, 0));
  }

  public rotate(deg: number): Matrix2D {
    const rad = (deg * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    return this.multiply(new Matrix2D(cos, sin, -sin, cos, 0, 0));
  }

  public skewX(deg: number): Matrix2D {
    return this.multiply(new Matrix2D(1, 0, Math.tan((deg * Math.PI) / 180), 1, 0, 0));
  }

  public skewY(deg: number): Matrix2D {
    return this.multiply(new Matrix2D(1, Math.tan((deg * Math.PI) / 180), 0, 1, 0, 0));
  }

  public apply(x: number, y: number): Point {
    return { x: this.a * x + this.c * y + this.e, y: this.b * x + this.d * y + this.f };
  }

  /** Facteur d'échelle moyen (racine du déterminant), pour les longueurs comme l'épaisseur de trait. */
  public meanScale(): number {
    return Math.sqrt(Math.abs(this.a * this.d - this.b * this.c));
  }

  /** Attribut transform SVG ou propriété CSS transform (unités px/mm…, angles deg/rad/grad/turn). */
  public static parse(raw: string | null | undefined): Matrix2D {
    let m = Matrix2D.identity();
    if (!raw || /^\s*none\s*$/i.test(raw)) return m;
    const fnRe = /([a-zA-Z]+)\s*\(([^)]*)\)/g;
    for (const fn of raw.matchAll(fnRe)) {
      const name = fn[1].toLowerCase();
      const args: Array<{ v: number; unit: string }> = [];
      for (const a of fn[2].matchAll(/([-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?)([a-zA-Z%]*)/g)) {
        const v = Number(a[1]);
        if (Number.isFinite(v)) args.push({ v, unit: a[2].toLowerCase() });
      }
      const len = (i: number, d = 0) => (args[i] ? args[i].v * (UNIT_TO_PX[args[i].unit] ?? 1) : d);
      const ang = (i: number) => {
        const a = args[i];
        if (!a) return 0;
        if (a.unit === 'rad') return (a.v * 180) / Math.PI;
        if (a.unit === 'grad') return a.v * 0.9;
        if (a.unit === 'turn') return a.v * 360;
        return a.v;
      };
      const num = (i: number, d: number) => (args[i] ? args[i].v : d);
      switch (name) {
        case 'matrix':
          if (args.length >= 6) m = m.multiply(new Matrix2D(args[0].v, args[1].v, args[2].v, args[3].v, len(4), len(5)));
          break;
        case 'translate': m = m.translate(len(0), len(1)); break;
        case 'translatex': m = m.translate(len(0), 0); break;
        case 'translatey': m = m.translate(0, len(0)); break;
        case 'scale': m = m.scale(num(0, 1), num(1, num(0, 1))); break;
        case 'scalex': m = m.scale(num(0, 1), 1); break;
        case 'scaley': m = m.scale(1, num(0, 1)); break;
        case 'rotate':
          m = args.length >= 3
            ? m.translate(len(1), len(2)).rotate(ang(0)).translate(-len(1), -len(2))
            : m.rotate(ang(0));
          break;
        case 'skewx': m = m.skewX(ang(0)); break;
        case 'skewy': m = m.skewY(ang(0)); break;
        case 'skew': m = m.skewX(ang(0)).skewY(ang(1)); break;
        default: break;
      }
    }
    return m;
  }
}

/** Passage du repère d'une viewBox au viewport (width × height), selon preserveAspectRatio. */
function viewBoxTransform(vb: SvgBox, width: number, height: number, par: string | null): Matrix2D {
  let sx = width / vb.width;
  let sy = height / vb.height;
  let tx = 0;
  let ty = 0;
  const spec = (par || 'xMidYMid meet').trim();
  if (!/^none\b/i.test(spec)) {
    const slice = /\bslice\b/i.test(spec);
    const s = slice ? Math.max(sx, sy) : Math.min(sx, sy);
    sx = sy = s;
    const align = /x(Min|Mid|Max)Y(Min|Mid|Max)/.exec(spec);
    const ax = align ? align[1] : 'Mid';
    const ay = align ? align[2] : 'Mid';
    const freeX = width - vb.width * s;
    const freeY = height - vb.height * s;
    tx = ax === 'Min' ? 0 : ax === 'Mid' ? freeX / 2 : freeX;
    ty = ay === 'Min' ? 0 : ay === 'Mid' ? freeY / 2 : freeY;
  }
  return new Matrix2D(sx, 0, 0, sy, tx - vb.x * sx, ty - vb.y * sy);
}

// ---------------------------------------------------------------------------------------------
// Feuilles de style internes (<style>) : sélecteurs simples uniquement
// ---------------------------------------------------------------------------------------------

interface CssRule {
  spec: number;
  order: number;
  decls: Decls;
}

class CssIndex {
  /** Faux si une règle n'a pas pu être interprétée (sélecteur complexe, @media, @import). */
  public complete = true;
  public size = 0;
  private order = 0;
  private readonly universal: CssRule[] = [];
  private readonly byTag = new Map<string, CssRule[]>();
  private readonly byClass = new Map<string, CssRule[]>();
  private readonly byTagClass = new Map<string, CssRule[]>();
  private readonly byId = new Map<string, CssRule[]>();

  public add(cssText: string): void {
    const css = cssText.replace(/\/\*[\s\S]*?\*\//g, '');
    let i = 0;
    while (i < css.length) {
      const open = css.indexOf('{', i);
      if (open < 0) break;
      const selectorText = css.slice(i, open).trim();
      let depth = 1;
      let j = open + 1;
      while (j < css.length && depth > 0) {
        if (css[j] === '{') depth++;
        else if (css[j] === '}') depth--;
        j++;
      }
      const body = css.slice(open + 1, depth === 0 ? j - 1 : j);
      i = j;
      if (selectorText.startsWith('@')) {
        if (!/^@(font-face|charset|namespace|page)\b/i.test(selectorText)) this.complete = false;
        continue;
      }
      const decls = parseDeclarations(body);
      for (const sel of selectorText.split(',')) this.addSelector(sel.trim(), decls);
    }
    // @import sans bloc : feuille externe inaccessible.
    if (/@import\b/i.test(css)) this.complete = false;
  }

  private addSelector(sel: string, decls: Decls): void {
    const push = (map: Map<string, CssRule[]>, key: string, spec: number) => {
      const list = map.get(key) ?? [];
      list.push({ spec, order: this.order++, decls });
      map.set(key, list);
      this.size++;
    };
    let m: RegExpExecArray | null;
    if (sel === '*') {
      this.universal.push({ spec: 0, order: this.order++, decls });
      this.size++;
    } else if ((m = /^([a-zA-Z][\w-]*)$/.exec(sel))) push(this.byTag, m[1].toLowerCase(), 1);
    else if ((m = /^\.([\w-]+)$/.exec(sel))) push(this.byClass, m[1], 10);
    else if ((m = /^([a-zA-Z][\w-]*)\.([\w-]+)$/.exec(sel))) push(this.byTagClass, `${m[1].toLowerCase()}.${m[2]}`, 11);
    else if ((m = /^#([\w-]+)$/.exec(sel))) push(this.byId, m[1], 100);
    else if (sel) this.complete = false;
  }

  public match(el: Element, tag: string): CssRule[] {
    const out: CssRule[] = [...this.universal];
    out.push(...(this.byTag.get(tag) ?? []));
    const cls = el.getAttribute('class');
    if (cls) {
      for (const c of cls.split(/\s+/)) {
        if (!c) continue;
        out.push(...(this.byClass.get(c) ?? []), ...(this.byTagClass.get(`${tag}.${c}`) ?? []));
      }
    }
    const id = el.getAttribute('id');
    if (id) out.push(...(this.byId.get(id) ?? []));
    if (out.length > 1) out.sort((x, y) => x.spec - y.spec || x.order - y.order);
    return out;
  }
}

// ---------------------------------------------------------------------------------------------
// Lecture des données de chemin (attribut d)
// ---------------------------------------------------------------------------------------------

const PATH_COMMANDS = 'MmZzLlHhVvCcSsQqTtAa';

/** Lecteur de l'attribut d : chaque appel consomme au moins un caractère ou renvoie null (jamais de boucle infinie). */
class PathScanner {
  private pos = 0;
  private static readonly NUM = /[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/y;

  constructor(private readonly d: string) {}

  private skip(): void {
    const d = this.d;
    while (this.pos < d.length) {
      const c = d.charCodeAt(this.pos);
      // espace, tabulation, retours à la ligne, virgule
      if (c === 32 || c === 9 || c === 10 || c === 13 || c === 12 || c === 44) this.pos++;
      else break;
    }
  }

  public atEnd(): boolean {
    this.skip();
    return this.pos >= this.d.length;
  }

  public command(): string | null {
    this.skip();
    const c = this.d[this.pos];
    if (c !== undefined && PATH_COMMANDS.includes(c)) {
      this.pos++;
      return c;
    }
    return null;
  }

  public num(): number | null {
    this.skip();
    PathScanner.NUM.lastIndex = this.pos;
    const m = PathScanner.NUM.exec(this.d);
    if (!m) return null;
    this.pos = PathScanner.NUM.lastIndex;
    const v = Number(m[0]);
    return Number.isFinite(v) ? v : null;
  }

  /** Drapeau d'arc : un seul caractère 0 ou 1 (« A50 50 0 0150 50 » est valide). */
  public flag(): number | null {
    this.skip();
    const c = this.d[this.pos];
    if (c === '0' || c === '1') {
      this.pos++;
      return c === '1' ? 1 : 0;
    }
    return null;
  }
}

// ---------------------------------------------------------------------------------------------
// Étape 1 : extraction des primitives
// ---------------------------------------------------------------------------------------------

interface InheritedStyle {
  fill: string;
  fillExplicit: boolean;
  fillOpacity: number;
  stroke: string;
  strokeExplicit: boolean;
  strokeWidth: number;
  strokeOpacity: number;
  dashed: boolean;
  markers: boolean;
  hidden: boolean;
  fontSize: number;
  textAnchor: string;
  color: string;
}

const ROOT_STYLE: InheritedStyle = {
  fill: 'black', fillExplicit: false, fillOpacity: 1,
  stroke: 'none', strokeExplicit: false, strokeWidth: 1, strokeOpacity: 1,
  dashed: false, markers: false, hidden: false, fontSize: 16, textAnchor: 'start', color: 'black'
};

interface WalkState {
  m: Matrix2D;
  style: InheritedStyle;
  /** Opacité cumulée des groupes (propriété non héritée mais multiplicative). */
  opacity: number;
  role: SemanticRole | null;
  roomHint: boolean;
  layer: number;
  /** Viewport courant (pour les longueurs en %). */
  vw: number;
  vh: number;
  useDepth: number;
}

interface VisitOptions {
  isRoot?: boolean;
  /** Élément atteint par <use> (un <symbol> est alors rendu). */
  useTarget?: boolean;
  /** Taille imposée par <use> à un <svg> ou <symbol>. */
  useSize?: { w?: number; h?: number };
}

interface PathPoint {
  x: number;
  y: number;
  /** L'arête qui mène à ce point est un segment droit (et non une courbe). */
  line: boolean;
}

function inheritStyle(parent: InheritedStyle, d: Decls, vw: number, vh: number): InheritedStyle {
  const s: InheritedStyle = { ...parent };
  const v = (name: string): string | undefined => {
    const x = d[name];
    return x === undefined || /^\s*inherit\s*$/i.test(x) ? undefined : x;
  };
  const fill = v('fill');
  if (fill !== undefined) {
    s.fill = fill;
    s.fillExplicit = true;
  }
  const fillOpacity = v('fill-opacity');
  if (fillOpacity !== undefined) s.fillOpacity = parseOpacity(fillOpacity);
  const stroke = v('stroke');
  if (stroke !== undefined) {
    s.stroke = stroke;
    s.strokeExplicit = true;
  }
  const strokeWidth = v('stroke-width');
  if (strokeWidth !== undefined) {
    s.strokeWidth = Math.max(0, parseLength(strokeWidth, Math.hypot(vw, vh) / Math.SQRT2, s.strokeWidth));
  }
  const strokeOpacity = v('stroke-opacity');
  if (strokeOpacity !== undefined) s.strokeOpacity = parseOpacity(strokeOpacity);
  const dash = v('stroke-dasharray');
  if (dash !== undefined) s.dashed = isDashed(dash);
  const markers = ['marker', 'marker-start', 'marker-mid', 'marker-end'].map(v).filter((x): x is string => x !== undefined);
  if (markers.length > 0) s.markers = markers.some(x => !/^\s*none\s*$/i.test(x));
  const visibility = v('visibility');
  if (visibility !== undefined) s.hidden = /^\s*(hidden|collapse)\s*$/i.test(visibility);
  const fontSize = v('font-size');
  if (fontSize !== undefined) {
    const m = LENGTH_RE.exec(fontSize);
    if (m && m[2].toLowerCase() === 'em') s.fontSize = parent.fontSize * Number(m[1]);
    else s.fontSize = parseLength(fontSize, parent.fontSize, parent.fontSize);
  }
  const anchor = v('text-anchor');
  if (anchor !== undefined) s.textAnchor = anchor.trim().toLowerCase();
  const color = v('color');
  if (color !== undefined) s.color = color;
  return s;
}

/** Remplissage effectif, mélangé sur fond blanc selon l'opacité. */
function classifyFill(style: InheritedStyle, opacity: number): FillKind {
  const raw = style.fill.trim().toLowerCase();
  if (isNoPaint(raw)) return 'none';
  const alpha = style.fillOpacity * opacity;
  if (alpha <= 0.05) return 'none';
  if (raw.startsWith('url(')) return 'light';
  const rgb = parseColor(raw === 'currentcolor' ? style.color : raw);
  if (!rgb) return 'light';
  const brightness = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
  const effective = 1 - (1 - brightness) * alpha * rgb[3];
  if (rgb[3] * alpha <= 0.05) return 'none';
  return effective < 0.55 ? 'dark' : 'light';
}

/** Largeur de trait visible en unités racine (0 si aucun trait n'est dessiné). */
function strokeWidthOf(style: InheritedStyle, st: WalkState, cssComplete: boolean): number {
  if (!style.strokeExplicit) {
    // Trait non déclaré : invisible selon SVG, sauf si une règle CSS non interprétée a pu le définir.
    return cssComplete ? 0 : st.m.meanScale();
  }
  if (isNoPaint(style.stroke) || style.strokeOpacity * st.opacity <= 0.05 || style.strokeWidth <= 0) return 0;
  const rgb = parseColor(style.stroke);
  if (rgb && rgb[3] <= 0.05) return 0;
  return style.strokeWidth * st.m.meanScale();
}

/** Lignes d'un texte : chaque <tspan> positionné (x, y, dy ou sodipodi:role="line") ouvre une ligne. */
function collectTextLines(textEl: Element): string[] {
  const lines: string[] = [];
  let current = '';
  const flush = () => {
    const t = current.replace(/\s+/g, ' ').trim();
    if (t) lines.push(t);
    current = '';
  };
  const walk = (node: Element) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === 3 || child.nodeType === 4) {
        current += child.nodeValue ?? '';
      } else if (child.nodeType === 1) {
        const el = child as Element;
        const tag = localTag(el);
        if (tag !== 'tspan' && tag !== 'textpath' && tag !== 'a') continue;
        const style = el.getAttribute('style') ?? '';
        if (el.getAttribute('display') === 'none' || /display\s*:\s*none/i.test(style)) continue;
        const newLine = tag === 'tspan' && (
          el.hasAttribute('x') || el.hasAttribute('y') || el.hasAttribute('dy') || el.getAttribute('sodipodi:role') === 'line'
        );
        if (newLine) flush();
        walk(el);
        if (newLine) flush();
      }
    }
  };
  walk(textEl);
  flush();
  return lines;
}

/** Vrai pour une cote, une surface, une hauteur, un niveau ou une annotation de mesure (« 12,5 m² », « HSP 2,50 », « 3.40 x 4.20 », « 4,19 m (mur à mur) », « Coffrage 1.22 x 0.26 m »). */
function isMeasurementText(s: string): boolean {
  const norm = normalizeText(s);
  const rest = norm
    .replace(/\b\d+(?:[.,]\d+)?\s*[xX*×]\s*\d+(?:[.,]\d+)?(?:\s*[xX*×]\s*\d+(?:[.,]\d+)?)?(?:\s*(?:m|cm|mm))?\b/g, ' ')
    .replace(/\b(?:m2|m|cm|mm|dm|ml|s|sh|shab|shon|su|surf|surface|hsp|hsf|ht|h|hp|ep|epaisseur|niv|nf|ngf|alt|env|approx|ca|x|par|ft|ft2|sq|sqft|sf|in|area)\b/g, ' ')
    .replace(/\b(?:mur|coffrage|hors|tout|nu|brut|fini|clair|passage|axe|cote|cotes|reelles|reel|tot|total|larg|largeur|long|longueur|haut|hauteur)\b/g, ' ')
    .replace(/[^a-z]+/g, '');
  return rest.length === 0;
}

/**
 * Nom de pièce à partir des lignes d'un texte, sans les surfaces ni les cotes ; '' si rien d'exploitable.
 * Retire les surfaces, cotes linéaires, cotes au format L x l, préfixes de mesure et annotations entre parenthèses.
 */
function cleanLabel(lines: string[]): string {
  const kept = lines
    .map(l => {
      return l
        .replace(/[\s(\-–—:,]*\d+(?:[.,]\d+)*\s*(?:m(?:²|2)|ft(?:²|2)|sq\.?\s*ft\.?|sf)(?![a-z])\s*\)?/gi, ' ')
        .replace(/\b\d+(?:[.,]\d+)?\s*[xX*×]\s*\d+(?:[.,]\d+)?(?:\s*[xX*×]\s*\d+(?:[.,]\d+)?)?(?:\s*(?:m|cm|mm))?\b/g, ' ')
        .replace(/\b\d+(?:[.,]\d+)?\s*(?:m|cm|mm)\b/gi, ' ')
        .replace(/\([^)]*(?:cote|coffrage|mur|hsp|haut|larg|long|dim)[^)]*\)/gi, ' ')
        .replace(/\b(?:largeur|longueur|hauteur|hsp|cotes?|surface|surf)\s*:\s*/gi, ' ')
        .replace(/\s+/g, ' ')
        .replace(/[\s\-–—:,;(]+$/, '')
        .trim();
    })
    .filter(l => l && !isMeasurementText(l));
  const text = kept.join(' ').trim();
  return text.length > 0 && text.length <= 60 ? text : '';
}

class SvgExtractor {
  public readonly segments: RawSegment[] = [];
  public readonly shapes: RawShape[] = [];
  public readonly arcs: RawArc[] = [];
  public readonly labels: RawLabel[] = [];
  /** Calques rencontrés (index = numéro de calque) ; -1 = hors calque. */
  public readonly layers: Array<{ name: string; count: number }> = [];
  public rootCount = 0;
  public truncated = false;

  private elementCount = 0;
  private readonly css = new CssIndex();
  private readonly ids = new Map<string, Element>();
  private readonly hasInkscapeLayers: boolean;

  constructor(private readonly root: Element) {
    let inkscape = false;
    for (const el of Array.from(root.getElementsByTagName('*'))) {
      const id = el.getAttribute('id');
      if (id && !this.ids.has(id)) this.ids.set(id, el);
      const tag = localTag(el);
      if (tag === 'style') this.css.add(el.textContent ?? '');
      else if (tag === 'g' && el.getAttribute('inkscape:groupmode') === 'layer') inkscape = true;
    }
    this.hasInkscapeLayers = inkscape;
  }

  public run(vw: number, vh: number): void {
    const state: WalkState = {
      m: Matrix2D.identity(), style: ROOT_STYLE, opacity: 1, role: null, roomHint: false, layer: -1, vw, vh, useDepth: 0
    };
    this.visit(this.root, state, { isRoot: true });
  }

  /** Emprise (unités racine) de toutes les primitives, null si le document est vide. */
  public contentBounds(): SvgBox | null {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const add = (x: number, y: number) => {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    };
    for (const s of this.segments) {
      add(s.ax, s.ay);
      add(s.bx, s.by);
    }
    for (const s of this.shapes) {
      add(s.minX, s.minY);
      add(s.maxX, s.maxY);
    }
    for (const a of this.arcs) {
      add(a.ax, a.ay);
      add(a.bx, a.by);
    }
    for (const l of this.labels) add(l.x, l.y);
    if (!Number.isFinite(minX) || maxX - minX <= 0 || maxY - minY <= 0) return null;
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
  }

  private declarations(el: Element, tag: string): Decls {
    const out: Decls = {};
    const attrs = el.attributes;
    for (let i = 0; i < attrs.length; i++) {
      const a = attrs[i];
      const name = a.name.toLowerCase();
      if (PRESENTATION_PROPS.has(name)) out[name] = a.value.trim();
    }
    if (this.css.size > 0) {
      for (const rule of this.css.match(el, tag)) Object.assign(out, rule.decls);
    }
    const style = el.getAttribute('style');
    if (style) Object.assign(out, parseDeclarations(style));
    return out;
  }

  private isLayer(el: Element): boolean {
    if (this.hasInkscapeLayers) return el.getAttribute('inkscape:groupmode') === 'layer';
    return el.parentElement === this.root;
  }

  private addLayer(el: Element, parentLayer: number): number {
    const own = el.getAttribute('inkscape:label') || el.getAttribute('data-name') || el.getAttribute('id') || localize('import.parser.group_generic', { n: this.layers.length + 1 });
    const name = parentLayer >= 0 ? `${this.layers[parentLayer].name} › ${own}` : own;
    this.layers.push({ name, count: 0 });
    return this.layers.length - 1;
  }

  private countPrimitive(layer: number): void {
    if (layer >= 0) this.layers[layer].count++;
    else this.rootCount++;
  }

  private visit(el: Element, parent: WalkState, opts: VisitOptions = {}): void {
    if (this.truncated) return;
    if (++this.elementCount > MAX_ELEMENTS) {
      this.truncated = true;
      return;
    }
    const ns = el.namespaceURI;
    if (ns && ns !== SVG_NS) return;
    const tag = localTag(el);
    if (NON_RENDERED.has(tag) && !(opts.useTarget && tag === 'symbol')) return;

    const decl = this.declarations(el, tag);
    if (decl.display !== undefined && /^\s*none\s*$/i.test(decl.display)) return;
    const opacity = parent.opacity * parseOpacity(decl.opacity);
    if (opacity <= 0.01) return;

    const own = semanticOf(el);
    let m = parent.m;
    if (!opts.isRoot) {
      const tf = decl.transform ?? el.getAttribute('transform');
      if (tf) m = m.multiply(Matrix2D.parse(tf));
    }
    // Un groupe atteint par <use> n'est pas un nouveau calque (il appartient au calque du <use>).
    const layer = tag === 'g' && parent.useDepth === 0 && this.isLayer(el) ? this.addLayer(el, parent.layer) : parent.layer;
    const state: WalkState = {
      m,
      style: inheritStyle(parent.style, decl, parent.vw, parent.vh),
      opacity,
      role: own.role ?? parent.role,
      roomHint: parent.roomHint || own.roomHint,
      layer,
      vw: parent.vw,
      vh: parent.vh,
      useDepth: parent.useDepth
    };

    switch (tag) {
      case 'svg':
        if (!opts.isRoot) this.enterViewport(el, state, opts.useSize, false);
        this.visitChildren(el, state);
        return;
      case 'symbol':
        this.enterViewport(el, state, opts.useSize, true);
        this.visitChildren(el, state);
        return;
      case 'g':
      case 'a':
        this.visitChildren(el, state);
        return;
      case 'switch': {
        // Seul le premier enfant applicable est rendu.
        const first = Array.from(el.children).find(c => !c.namespaceURI || c.namespaceURI === SVG_NS);
        if (first) this.visit(first, state);
        return;
      }
      case 'use':
        this.visitUse(el, state);
        return;
      case 'line':
      case 'polyline':
      case 'polygon':
      case 'rect':
      case 'path':
        this.extractGeometry(el, tag, state);
        return;
      case 'text':
        this.extractText(el, state);
        return;
      default:
        return;
    }
  }

  private visitChildren(el: Element, state: WalkState): void {
    const children = el.children;
    for (let i = 0; i < children.length && !this.truncated; i++) this.visit(children[i], state);
  }

  /** <svg> imbriqué ou <symbol> : position, taille et viewBox (le découpage est ignoré). */
  private enterViewport(el: Element, state: WalkState, useSize: VisitOptions['useSize'], isSymbol: boolean): void {
    const x = isSymbol ? 0 : parseLength(el.getAttribute('x'), state.vw, 0);
    const y = isSymbol ? 0 : parseLength(el.getAttribute('y'), state.vh, 0);
    const w = useSize?.w ?? parseLength(el.getAttribute('width'), state.vw, state.vw);
    const h = useSize?.h ?? parseLength(el.getAttribute('height'), state.vh, state.vh);
    const vb = parseViewBox(el.getAttribute('viewBox'));
    state.m = state.m.translate(x, y);
    if (vb && w > 0 && h > 0) {
      state.m = state.m.multiply(viewBoxTransform(vb, w, h, el.getAttribute('preserveAspectRatio')));
      state.vw = vb.width;
      state.vh = vb.height;
    } else if (w > 0 && h > 0) {
      state.vw = w;
      state.vh = h;
    }
  }

  /** <use href="#id" x y width height> : rendu de l'élément référencé (profondeur bornée, sans cycle). */
  private visitUse(el: Element, state: WalkState): void {
    if (state.useDepth >= MAX_USE_DEPTH) return;
    const href = (el.getAttribute('href') ?? el.getAttribute('xlink:href') ?? '').trim();
    if (!href.startsWith('#')) return;
    const target = this.ids.get(href.slice(1));
    if (!target || target === el || target.contains(el)) return;
    const x = parseLength(el.getAttribute('x'), state.vw, 0);
    const y = parseLength(el.getAttribute('y'), state.vh, 0);
    const wAttr = el.getAttribute('width');
    const hAttr = el.getAttribute('height');
    const useSize = {
      w: wAttr !== null ? parseLength(wAttr, state.vw, state.vw) : undefined,
      h: hAttr !== null ? parseLength(hAttr, state.vh, state.vh) : undefined
    };
    this.visit(target, { ...state, m: state.m.translate(x, y), useDepth: state.useDepth + 1 }, { useTarget: true, useSize });
  }

  /** Rôle d'un trait : sémantique explicite, sinon pointillés et marqueurs = cotation, sinon mur potentiel. */
  private segmentRole(st: WalkState): SemanticRole {
    if (st.role && st.role !== 'wall') return st.role;
    if (st.style.dashed || st.style.markers) return 'measurement';
    return 'wall';
  }

  private extractGeometry(el: Element, tag: string, st: WalkState): void {
    if (st.style.hidden) return;
    const stroke = strokeWidthOf(st.style, st, this.css.complete);
    const fill = classifyFill(st.style, st.opacity);
    const len = (name: string, ref: number) => parseLength(el.getAttribute(name), ref, 0);
    switch (tag) {
      case 'line': {
        const pts: PathPoint[] = [
          { x: len('x1', st.vw), y: len('y1', st.vh), line: false },
          { x: len('x2', st.vw), y: len('y2', st.vh), line: true }
        ];
        this.emit(pts, false, st, stroke, 'none');
        return;
      }
      case 'polyline':
      case 'polygon': {
        const n = numbersOf(el.getAttribute('points'));
        const pts: PathPoint[] = [];
        for (let i = 0; i + 1 < n.length; i += 2) pts.push({ x: n[i], y: n[i + 1], line: i > 0 });
        this.emit(pts, tag === 'polygon', st, stroke, fill);
        return;
      }
      case 'rect': {
        const x = len('x', st.vw);
        const y = len('y', st.vh);
        const w = len('width', st.vw);
        const h = len('height', st.vh);
        if (!(w > 0 && h > 0)) return;
        this.emit([
          { x, y, line: false },
          { x: x + w, y, line: true },
          { x: x + w, y: y + h, line: true },
          { x, y: y + h, line: true }
        ], true, st, stroke, fill);
        return;
      }
      case 'path':
        this.extractPath(el.getAttribute('d') ?? '', st, stroke, fill);
        return;
      default:
        return;
    }
  }

  /**
   * Enregistre une polyligne (coordonnées locales) : segments droits visibles et, si elle est fermée,
   * forme candidate pièce. Une forme sans trait n'a de « murs » que si son remplissage est sombre.
   */
  private emit(local: PathPoint[], closedHint: boolean, st: WalkState, stroke: number, fill: FillKind): void {
    if (local.length < 2) return;
    const pts: PathPoint[] = [];
    for (const p of local) {
      const r = st.m.apply(p.x, p.y);
      const prev = pts[pts.length - 1];
      if (prev && Math.abs(prev.x - r.x) < 1e-9 && Math.abs(prev.y - r.y) < 1e-9) continue;
      pts.push({ x: r.x, y: r.y, line: p.line });
    }
    const first = pts[0];
    const last = pts[pts.length - 1];
    let closed = closedHint;
    let closingLine = true;
    if (pts.length > 2 && Math.abs(first.x - last.x) < 1e-9 && Math.abs(first.y - last.y) < 1e-9) {
      closed = true;
      closingLine = last.line;
      pts.pop();
    }
    const shapeFill: FillKind = closed ? fill : 'none';
    const linesVisible = stroke > 0 || shapeFill === 'dark';
    if (!linesVisible && !(closed && shapeFill !== 'none')) return;

    const role = this.segmentRole(st);
    let shape = -1;
    if (closed && pts.length >= 3 && role !== 'ignore') {
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (const p of pts) {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
      }
      shape = this.shapes.push({
        points: pts.map(p => ({ x: p.x, y: p.y })),
        role,
        fill: shapeFill,
        fillExplicit: st.style.fillExplicit,
        roomHint: st.roomHint,
        stroke,
        layer: st.layer,
        minX, minY, maxX, maxY
      }) - 1;
      this.countPrimitive(st.layer);
    }
    if (!linesVisible || role === 'ignore') return;
    for (let i = 1; i < pts.length; i++) {
      if (pts[i].line) this.addSegment(pts[i - 1], pts[i], role, stroke, shapeFill, shape, st.layer);
    }
    if (closed && closingLine && pts.length >= 2) {
      this.addSegment(pts[pts.length - 1], pts[0], role, stroke, shapeFill, shape, st.layer);
    }
  }

  private addSegment(a: Point, b: Point, role: SemanticRole, stroke: number, fill: FillKind, shape: number, layer: number): void {
    if (this.segments.length >= MAX_SEGMENTS) {
      this.truncated = true;
      return;
    }
    this.segments.push({ ax: a.x, ay: a.y, bx: b.x, by: b.y, role, stroke, fill, shape, layer });
    this.countPrimitive(layer);
  }

  private extractPath(d: string, st: WalkState, stroke: number, fill: FillKind): void {
    const sc = new PathScanner(d);
    let cx = 0, cy = 0, sx = 0, sy = 0;
    let ctrlX = 0, ctrlY = 0;
    let prev = '';
    let cmd = '';
    let sub: PathPoint[] = [];

    const endSubpath = (closed: boolean) => {
      if (sub.length >= 2) this.emit(sub, closed, st, stroke, fill);
      sub = [];
    };
    const ensureStart = () => {
      if (sub.length === 0) sub.push({ x: cx, y: cy, line: false });
    };
    const to = (x: number, y: number, line: boolean) => {
      ensureStart();
      sub.push({ x, y, line });
      cx = x;
      cy = y;
    };

    while (!sc.atEnd()) {
      const letter = sc.command();
      if (letter) cmd = letter;
      // Nombre sans commande (début de chemin) ou après Z : données invalides, on arrête comme le navigateur.
      else if (cmd === '' || cmd === 'Z' || cmd === 'z') break;
      const rel = cmd === cmd.toLowerCase();
      const C = cmd.toUpperCase();
      const ox = rel ? cx : 0;
      const oy = rel ? cy : 0;

      if (C === 'Z') {
        if (sub.length > 0) {
          if (Math.abs(cx - sx) > 1e-12 || Math.abs(cy - sy) > 1e-12) sub.push({ x: sx, y: sy, line: true });
          endSubpath(true);
        }
        cx = sx;
        cy = sy;
        prev = 'Z';
        continue;
      }
      if (C === 'M') {
        const x = sc.num();
        const y = sc.num();
        if (x === null || y === null) break;
        endSubpath(false);
        cx = ox + x;
        cy = oy + y;
        sx = cx;
        sy = cy;
        sub = [{ x: cx, y: cy, line: false }];
        // Les paires suivantes d'un moveto sont des lineto implicites.
        cmd = rel ? 'l' : 'L';
        prev = 'M';
        continue;
      }

      let ok = true;
      switch (C) {
        case 'L': {
          const x = sc.num(), y = sc.num();
          if (x === null || y === null) { ok = false; break; }
          to(ox + x, oy + y, true);
          break;
        }
        case 'H': {
          const x = sc.num();
          if (x === null) { ok = false; break; }
          to(ox + x, cy, true);
          break;
        }
        case 'V': {
          const y = sc.num();
          if (y === null) { ok = false; break; }
          to(cx, oy + y, true);
          break;
        }
        case 'C':
        case 'S': {
          let x1: number | null, y1: number | null;
          if (C === 'C') {
            x1 = sc.num();
            y1 = sc.num();
            if (x1 !== null && y1 !== null) { x1 += ox; y1 += oy; }
          } else {
            const reflect = prev === 'C' || prev === 'S';
            x1 = reflect ? 2 * cx - ctrlX : cx;
            y1 = reflect ? 2 * cy - ctrlY : cy;
          }
          const x2 = sc.num(), y2 = sc.num(), x = sc.num(), y = sc.num();
          if (x1 === null || y1 === null || x2 === null || y2 === null || x === null || y === null) { ok = false; break; }
          const p0 = { x: cx, y: cy };
          this.addCubic(p0, { x: x1, y: y1 }, { x: ox + x2, y: oy + y2 }, { x: ox + x, y: oy + y }, st);
          ctrlX = ox + x2;
          ctrlY = oy + y2;
          to(ox + x, oy + y, false);
          break;
        }
        case 'Q':
        case 'T': {
          let qx: number | null, qy: number | null;
          if (C === 'Q') {
            qx = sc.num();
            qy = sc.num();
            if (qx !== null && qy !== null) { qx += ox; qy += oy; }
          } else {
            const reflect = prev === 'Q' || prev === 'T';
            qx = reflect ? 2 * cx - ctrlX : cx;
            qy = reflect ? 2 * cy - ctrlY : cy;
          }
          const x = sc.num(), y = sc.num();
          if (qx === null || qy === null || x === null || y === null) { ok = false; break; }
          ctrlX = qx;
          ctrlY = qy;
          to(ox + x, oy + y, false);
          break;
        }
        case 'A': {
          const rx = sc.num(), ry = sc.num(), rot = sc.num();
          const large = sc.flag(), sweep = sc.flag();
          const x = sc.num(), y = sc.num();
          if (rx === null || ry === null || rot === null || large === null || sweep === null || x === null || y === null) {
            ok = false;
            break;
          }
          const ex = ox + x, ey = oy + y;
          if (rx === 0 || ry === 0) {
            // Rayon nul : la spécification le traite comme un segment droit.
            to(ex, ey, true);
          } else {
            this.addArc(cx, cy, Math.abs(rx), Math.abs(ry), rot, large === 1, sweep === 1, ex, ey, st);
            to(ex, ey, false);
          }
          break;
        }
        default:
          ok = false;
      }
      if (!ok) break;
      prev = C;
    }
    endSubpath(false);
  }

  /** Arc elliptique (paramétrage par extrémités, SVG 1.1 §F.6.5) : conservé s'il forme un quart de cercle. */
  private addArc(x1: number, y1: number, rx: number, ry: number, phiDeg: number, large: boolean, sweep: boolean, x2: number, y2: number, st: WalkState): void {
    if (large || (Math.abs(x1 - x2) < 1e-12 && Math.abs(y1 - y2) < 1e-12)) return;
    const phi = (phiDeg * Math.PI) / 180;
    const cos = Math.cos(phi);
    const sin = Math.sin(phi);
    const dx = (x1 - x2) / 2;
    const dy = (y1 - y2) / 2;
    const x1p = cos * dx + sin * dy;
    const y1p = -sin * dx + cos * dy;
    const lambda = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);
    if (lambda > 1) {
      const s = Math.sqrt(lambda);
      rx *= s;
      ry *= s;
    }
    const num = rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p;
    const den = rx * rx * y1p * y1p + ry * ry * x1p * x1p;
    const coef = (large !== sweep ? 1 : -1) * Math.sqrt(Math.max(0, num / den));
    const cxp = (coef * rx * y1p) / ry;
    const cyp = (-coef * ry * x1p) / rx;
    const ccx = cos * cxp - sin * cyp + (x1 + x2) / 2;
    const ccy = sin * cxp + cos * cyp + (y1 + y2) / 2;
    const C = st.m.apply(ccx, ccy);
    const A = st.m.apply(x1, y1);
    const B = st.m.apply(x2, y2);
    this.recordArc(C, A, B, st, null);
  }

  /** Courbe de Bézier cubique : un quart de cercle (battant dessiné par Inkscape) devient un arc candidat. */
  private addCubic(p0: Point, p1: Point, p2: Point, p3: Point, st: WalkState): void {
    const P0 = st.m.apply(p0.x, p0.y);
    const P1 = st.m.apply(p1.x, p1.y);
    const P2 = st.m.apply(p2.x, p2.y);
    const P3 = st.m.apply(p3.x, p3.y);
    const t0x = P1.x - P0.x, t0y = P1.y - P0.y;
    const t3x = P3.x - P2.x, t3y = P3.y - P2.y;
    const l0 = Math.hypot(t0x, t0y);
    const l3 = Math.hypot(t3x, t3y);
    if (l0 < 1e-9 || l3 < 1e-9) return;
    // Centre = intersection des normales aux deux extrémités.
    const d0x = -t0y, d0y = t0x, d3x = -t3y, d3y = t3x;
    const den = d0x * d3y - d0y * d3x;
    if (Math.abs(den) < 1e-12 * l0 * l3) return;
    const wx = P3.x - P0.x, wy = P3.y - P0.y;
    const k = (wx * d3y - wy * d3x) / den;
    const C = { x: P0.x + k * d0x, y: P0.y + k * d0y };
    this.recordArc(C, P0, P3, st, { l0, l3 });
  }

  private recordArc(C: Point, A: Point, B: Point, st: WalkState, controls: { l0: number; l3: number } | null): void {
    const role: SemanticRole = st.role ?? 'wall';
    if (role === 'measurement' || role === 'ignore' || role === 'window' || st.style.hidden) return;
    const r1 = Math.hypot(A.x - C.x, A.y - C.y);
    const r2 = Math.hypot(B.x - C.x, B.y - C.y);
    if (!(r1 > 0 && r2 > 0)) return;
    const ratio = r1 / r2;
    if (ratio < 0.85 || ratio > 1 / 0.85) return;
    const cosAngle = ((A.x - C.x) * (B.x - C.x) + (A.y - C.y) * (B.y - C.y)) / (r1 * r2);
    const angle = (Math.acos(Math.max(-1, Math.min(1, cosAngle))) * 180) / Math.PI;
    if (angle < 75 || angle > 105) return;
    // Bézier : longueur des tangentes d'un vrai quart de cercle ≈ 0,55 r.
    if (controls && (controls.l0 / r1 < 0.4 || controls.l0 / r1 > 0.7 || controls.l3 / r2 < 0.4 || controls.l3 / r2 > 0.7)) return;
    this.arcs.push({ cx: C.x, cy: C.y, ax: A.x, ay: A.y, bx: B.x, by: B.y, r1, r2, role, layer: st.layer });
    this.countPrimitive(st.layer);
  }

  private extractText(el: Element, st: WalkState): void {
    if (st.style.hidden || st.role === 'ignore') return;
    const lines = collectTextLines(el);
    const text = cleanLabel(lines);
    if (!text) return;
    let xAttr = el.getAttribute('x');
    let yAttr = el.getAttribute('y');
    if (xAttr === null || yAttr === null) {
      const span = Array.from(el.getElementsByTagName('*')).find(c => localTag(c) === 'tspan' && (c.hasAttribute('x') || c.hasAttribute('y')));
      xAttr = xAttr ?? span?.getAttribute('x') ?? null;
      yAttr = yAttr ?? span?.getAttribute('y') ?? null;
    }
    const x = parseLength(xAttr, st.vw, 0);
    const y = parseLength(yAttr, st.vh, 0);
    // Centre approximatif du bloc de texte (l'ancre est sur la ligne de base, à gauche par défaut).
    const fs = st.style.fontSize > 0 ? st.style.fontSize : 16;
    const longest = lines.reduce((mx, l) => Math.max(mx, l.length), 0);
    const w = longest * fs * 0.55;
    const dx = st.style.textAnchor === 'middle' ? 0 : st.style.textAnchor === 'end' ? -w / 2 : w / 2;
    const dy = -fs * 0.35 + (Math.max(1, lines.length) - 1) * fs * 0.6;
    const p = st.m.apply(x + dx, y + dy);
    this.labels.push({ text, x: p.x, y: p.y, layer: st.layer });
    this.countPrimitive(st.layer);
  }
}

// ---------------------------------------------------------------------------------------------
// Outils géométriques (unités racine)
// ---------------------------------------------------------------------------------------------

/** Ligne de mur en cours de reconnaissance (unités racine). */
interface WallLine {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  /** Épaisseur (unités racine). */
  thick: number;
  /** Épaisseur mesurée (double trait) plutôt que supposée. */
  measured: boolean;
}

interface LiveWall extends WallLine {
  alive: boolean;
  /** Mur qui l'a absorbé (fusion de part et d'autre d'une ouverture). */
  into: LiveWall | null;
}

/** Grille de hachage spatiale (cellules carrées) ; les recherches renvoient des candidats à vérifier. */
class SpatialGrid<T> {
  private readonly cells = new Map<number, T[]>();

  constructor(private readonly size: number) {}

  private key(ix: number, iy: number): number {
    return ix * 1_000_003 + iy;
  }

  public insertBox(minX: number, minY: number, maxX: number, maxY: number, item: T): void {
    const x0 = Math.floor(minX / this.size), x1 = Math.floor(maxX / this.size);
    const y0 = Math.floor(minY / this.size), y1 = Math.floor(maxY / this.size);
    for (let ix = x0; ix <= x1; ix++) {
      for (let iy = y0; iy <= y1; iy++) {
        const k = this.key(ix, iy);
        const list = this.cells.get(k);
        if (list) list.push(item);
        else this.cells.set(k, [item]);
      }
    }
  }

  public query(minX: number, minY: number, maxX: number, maxY: number, visit: (item: T) => void): void {
    const x0 = Math.floor(minX / this.size), x1 = Math.floor(maxX / this.size);
    const y0 = Math.floor(minY / this.size), y1 = Math.floor(maxY / this.size);
    for (let ix = x0; ix <= x1; ix++) {
      for (let iy = y0; iy <= y1; iy++) {
        const list = this.cells.get(this.key(ix, iy));
        if (list) for (const item of list) visit(item);
      }
    }
  }
}

function lineLength(l: { ax: number; ay: number; bx: number; by: number }): number {
  return Math.hypot(l.bx - l.ax, l.by - l.ay);
}

/** Taille de cellule adaptée à une tolérance, bornée pour ne pas créer des millions de cellules. */
function gridSize(tolerance: number, extent: number): number {
  return Math.max(tolerance, extent / 2000, 1e-9);
}

function extentOf(lines: WallLine[]): number {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const l of lines) {
    minX = Math.min(minX, l.ax, l.bx);
    maxX = Math.max(maxX, l.ax, l.bx);
    minY = Math.min(minY, l.ay, l.by);
    maxY = Math.max(maxY, l.ay, l.by);
  }
  return Number.isFinite(minX) ? Math.max(maxX - minX, maxY - minY) : 0;
}

/** Position d'une ligne sur l'axe (ux, uy) : intervalle [lo, hi] et décalage perpendiculaire. */
interface AxisItem {
  index: number;
  lo: number;
  hi: number;
  off: number;
  angle: number;
}

interface DirectionCluster {
  ux: number;
  uy: number;
  items: AxisItem[];
}

function lineAngle(l: WallLine): number {
  let t = Math.atan2(l.by - l.ay, l.bx - l.ax);
  if (t < 0) t += Math.PI;
  if (t >= Math.PI) t -= Math.PI;
  return t;
}

/** Regroupe les lignes quasi parallèles (tri par angle modulo π, raccord autour de 0/π). */
function clusterByDirection(lines: WallLine[], angTol: number): DirectionCluster[] {
  const order = lines.map((l, index) => ({ index, t: lineAngle(l) })).sort((a, b) => a.t - b.t);
  const groups: Array<Array<{ index: number; t: number }>> = [];
  let current: Array<{ index: number; t: number }> = [];
  for (const item of order) {
    const prev = current[current.length - 1];
    if (prev && (item.t - prev.t > angTol || item.t - current[0].t > 3 * angTol)) {
      groups.push(current);
      current = [];
    }
    current.push(item);
  }
  if (current.length) groups.push(current);
  if (groups.length > 1) {
    const first = groups[0];
    const last = groups[groups.length - 1];
    if (first[0].t + Math.PI - last[last.length - 1].t <= angTol) {
      groups.pop();
      groups[0] = [...last.map(i => ({ index: i.index, t: i.t - Math.PI })), ...first];
    }
  }
  return groups.map(group => {
    const mean = group.reduce((s, i) => s + i.t, 0) / group.length;
    const ux = Math.cos(mean), uy = Math.sin(mean);
    const nx = -uy, ny = ux;
    const items = group.map(({ index, t }) => {
      const l = lines[index];
      const s0 = l.ax * ux + l.ay * uy;
      const s1 = l.bx * ux + l.by * uy;
      const off = ((l.ax + l.bx) / 2) * nx + ((l.ay + l.by) / 2) * ny;
      return { index, lo: Math.min(s0, s1), hi: Math.max(s0, s1), off, angle: t };
    });
    return { ux, uy, items };
  });
}

function fromAxis(ux: number, uy: number, lo: number, hi: number, off: number, thick: number, measured: boolean): WallLine {
  const nx = -uy, ny = ux;
  return {
    ax: lo * ux + off * nx, ay: lo * uy + off * ny,
    bx: hi * ux + off * nx, by: hi * uy + off * ny,
    thick, measured
  };
}

/** [lo, hi] privé des intervalles `covers`. */
function subtractIntervals(lo: number, hi: number, covers: Array<[number, number]>): Array<[number, number]> {
  const sorted = covers.filter(c => c[1] > lo && c[0] < hi).sort((a, b) => a[0] - b[0]);
  const out: Array<[number, number]> = [];
  let cur = lo;
  for (const [c0, c1] of sorted) {
    if (c0 > cur) out.push([cur, Math.min(c0, hi)]);
    cur = Math.max(cur, c1);
    if (cur >= hi) break;
  }
  if (cur < hi) out.push([cur, hi]);
  return out.filter(([a, b]) => b - a > 1e-12);
}

interface MergeTolerances {
  angle: number;
  offset: number;
  gap: number;
  thickness: number;
}

/**
 * Fusion des lignes colinéaires : doublons (y compris inversés), recouvrements et prolongements deviennent
 * l'union de leurs intervalles sur l'axe commun. Jamais de mur de longueur nulle (constat F66).
 */
function mergeCollinear(lines: WallLine[], tol: MergeTolerances): WallLine[] {
  const out: WallLine[] = [];
  for (const cluster of clusterByDirection(lines, tol.angle)) {
    const items = cluster.items.filter(i => i.hi - i.lo > 1e-12).sort((a, b) => a.off - b.off);
    let start = 0;
    for (let k = 1; k <= items.length; k++) {
      if (k < items.length && items[k].off - items[k - 1].off <= tol.offset) continue;
      mergeLineGroup(items.slice(start, k), lines, cluster, tol, out);
      start = k;
    }
  }
  return out;
}

function mergeLineGroup(group: AxisItem[], lines: WallLine[], cluster: DirectionCluster, tol: MergeTolerances, out: WallLine[]): void {
  const byThickness = [...group].sort((a, b) => lines[a.index].thick - lines[b.index].thick);
  let start = 0;
  for (let k = 1; k <= byThickness.length; k++) {
    if (k < byThickness.length && lines[byThickness[k].index].thick - lines[byThickness[k - 1].index].thick <= tol.thickness) continue;
    const sub = byThickness.slice(start, k).sort((a, b) => a.lo - b.lo);
    start = k;
    let lo = sub[0].lo, hi = sub[0].hi;
    let offSum = 0, lenSum = 0, thick = 0, measured = false;
    const flush = () => {
      if (hi - lo > 1e-12) out.push(fromAxis(cluster.ux, cluster.uy, lo, hi, lenSum > 0 ? offSum / lenSum : sub[0].off, thick, measured));
    };
    for (let i = 0; i < sub.length; i++) {
      const it = sub[i];
      const l = lines[it.index];
      if (i > 0 && it.lo > hi + tol.gap) {
        flush();
        lo = it.lo;
        hi = it.hi;
        offSum = 0;
        lenSum = 0;
        thick = 0;
        measured = false;
      }
      hi = Math.max(hi, it.hi);
      const len = Math.max(it.hi - it.lo, 1e-12);
      offSum += it.off * len;
      lenSum += len;
      thick = Math.max(thick, l.thick);
      measured = measured || l.measured;
    }
    flush();
  }
}

interface PairTolerances {
  angle: number;
  min: number;
  max: number;
  minOverlap: number;
  minPiece: number;
  leftoverMin: number;
}

/**
 * Murs dessinés en double trait (convention CAO) : deux traits parallèles distants de 4 à 50 cm qui se
 * recouvrent deviennent un mur sur la ligne médiane, avec l'épaisseur mesurée. Les parties non appariées
 * d'un trait partiellement apparié (débords d'angle, raccords) ne sont gardées que si elles sont longues.
 */
function pairDoubleLines(lines: WallLine[], tol: PairTolerances): WallLine[] {
  const out: WallLine[] = [];
  for (const cluster of clusterByDirection(lines, tol.angle)) {
    const items = [...cluster.items].sort((a, b) => a.off - b.off);
    const covers = new Map<number, Array<[number, number]>>();
    const candidates: Array<{ p: AxisItem; q: AxisItem; d: number; lo: number; hi: number }> = [];
    for (let a = 0; a < items.length; a++) {
      const p = items[a];
      let found = 0;
      for (let b = a + 1, scanned = 0; b < items.length && scanned < 64; b++, scanned++) {
        const q = items[b];
        const d = q.off - p.off;
        if (d > tol.max) break;
        if (d < tol.min || Math.abs(p.angle - q.angle) > tol.angle) continue;
        const lo = Math.max(p.lo, q.lo);
        const hi = Math.min(p.hi, q.hi);
        const shorter = Math.min(p.hi - p.lo, q.hi - q.lo);
        if (hi - lo >= Math.max(tol.minOverlap, 0.3 * shorter)) {
          candidates.push({ p, q, d, lo, hi });
          if (++found >= 6) break;
        }
      }
    }
    candidates.sort((x, y) => x.d - y.d || (y.hi - y.lo) - (x.hi - x.lo));
    for (const c of candidates) {
      const coverP = covers.get(c.p.index) ?? [];
      const coverQ = covers.get(c.q.index) ?? [];
      for (const [f0, f1] of subtractIntervals(c.lo, c.hi, [...coverP, ...coverQ])) {
        if (f1 - f0 < tol.minPiece) continue;
        out.push(fromAxis(cluster.ux, cluster.uy, f0, f1, (c.p.off + c.q.off) / 2, c.d, true));
        coverP.push([f0, f1]);
        coverQ.push([f0, f1]);
      }
      covers.set(c.p.index, coverP);
      covers.set(c.q.index, coverQ);
    }
    for (const it of items) {
      const line = lines[it.index];
      const cover = covers.get(it.index);
      if (!cover || cover.length === 0) {
        out.push(line);
        continue;
      }
      for (const [f0, f1] of subtractIntervals(it.lo, it.hi, cover)) {
        if (f1 - f0 >= tol.leftoverMin) out.push(fromAxis(cluster.ux, cluster.uy, f0, f1, it.off, line.thick, line.measured));
      }
    }
  }
  return out;
}

/** Point dans l'emprise (rectangle épais) d'une ligne, avec tolérance. */
function insideFootprint(l: WallLine, px: number, py: number, tol: number): boolean {
  const len = lineLength(l);
  if (len === 0) return false;
  const ux = (l.bx - l.ax) / len, uy = (l.by - l.ay) / len;
  const s = (px - l.ax) * ux + (py - l.ay) * uy;
  const o = -(px - l.ax) * uy + (py - l.ay) * ux;
  return s >= -tol && s <= len + tol && Math.abs(o) <= l.thick / 2 + tol;
}

/**
 * Supprime les traits entièrement contenus dans l'emprise d'un mur à épaisseur mesurée plus long :
 * jambages et bouts de mur des contours doublés, hachures, ligne d'axe.
 */
function removeEnclosed(lines: WallLine[], tol: number): WallLine[] {
  const bands = lines.filter(l => l.measured);
  if (bands.length === 0) return lines;
  const maxThick = bands.reduce((m, b) => Math.max(m, b.thick), 0);
  const grid = new SpatialGrid<WallLine>(gridSize(maxThick * 4 + tol, extentOf(lines)));
  for (const b of bands) {
    const pad = b.thick / 2 + tol;
    grid.insertBox(Math.min(b.ax, b.bx) - pad, Math.min(b.ay, b.by) - pad, Math.max(b.ax, b.bx) + pad, Math.max(b.ay, b.by) + pad, b);
  }
  return lines.filter(l => {
    const len = lineLength(l);
    let enclosed = false;
    grid.query(l.ax, l.ay, l.ax, l.ay, b => {
      if (enclosed || b === l || lineLength(b) <= len + tol) return;
      if (insideFootprint(b, l.ax, l.ay, tol) && insideFootprint(b, l.bx, l.by, tol)) enclosed = true;
    });
    return !enclosed;
  });
}

/** Aimante les extrémités distantes de moins de `tol` sur un même point (grille de hachage, O(n)). */
function snapEndpoints(lines: WallLine[], tol: number): void {
  const grid = new SpatialGrid<Point>(gridSize(tol, extentOf(lines)));
  const snap = (x: number, y: number): Point => {
    let best: Point | null = null;
    let bestD = tol;
    grid.query(x - tol, y - tol, x + tol, y + tol, p => {
      const d = Math.hypot(p.x - x, p.y - y);
      if (d <= bestD) {
        bestD = d;
        best = p;
      }
    });
    if (best) return best;
    const p = { x, y };
    grid.insertBox(x, y, x, y, p);
    return p;
  };
  for (const l of lines) {
    const a = snap(l.ax, l.ay);
    const b = snap(l.bx, l.by);
    l.ax = a.x;
    l.ay = a.y;
    l.bx = b.x;
    l.by = b.y;
  }
}

/**
 * Raccorde les extrémités libres au mur voisin (angle ou T) en prolongeant le mur jusqu'à l'axe de
 * l'autre, d'au plus la demi-épaisseur des deux murs : nécessaire pour les murs issus de doubles traits,
 * dont les axes s'arrêtent au nu du mur perpendiculaire.
 */
function healJunctions(lines: WallLine[], tol: number): void {
  if (lines.length < 2) return;
  const maxThick = lines.reduce((m, l) => Math.max(m, l.thick), 0);
  const reach = maxThick + tol;
  const grid = new SpatialGrid<WallLine>(gridSize(reach * 2, extentOf(lines)));
  for (const l of lines) {
    grid.insertBox(Math.min(l.ax, l.bx) - reach, Math.min(l.ay, l.by) - reach, Math.max(l.ax, l.bx) + reach, Math.max(l.ay, l.by) + reach, l);
  }
  const sinMin = Math.sin((20 * Math.PI) / 180);
  for (const l of lines) {
    for (const end of ['a', 'b'] as const) {
      const len = lineLength(l);
      if (len === 0) continue;
      const px = end === 'a' ? l.ax : l.bx;
      const py = end === 'a' ? l.ay : l.by;
      // Direction sortante de l'extrémité
      const dx = ((end === 'a' ? l.ax - l.bx : l.bx - l.ax)) / len;
      const dy = ((end === 'a' ? l.ay - l.by : l.by - l.ay)) / len;
      let connected = false;
      let bestT = Infinity;
      grid.query(px, py, px, py, o => {
        if (connected || o === l) return;
        const olen = lineLength(o);
        if (olen === 0) return;
        // Déjà raccordée : extrémité commune ou point posé sur l'autre mur.
        if (Math.hypot(o.ax - px, o.ay - py) <= tol || Math.hypot(o.bx - px, o.by - py) <= tol || insideFootprint({ ...o, thick: 0 }, px, py, tol)) {
          connected = true;
          return;
        }
        const ux = (o.bx - o.ax) / olen, uy = (o.by - o.ay) / olen;
        const cross = dx * uy - dy * ux;
        if (Math.abs(cross) < sinMin) return;
        const qx = o.ax - px, qy = o.ay - py;
        const t = (qx * uy - qy * ux) / cross;
        const tau = (qx * dy - qy * dx) / cross;
        const maxExt = (l.thick + o.thick) / 2 + tol;
        if (t < -tol || t > maxExt) return;
        if (tau < -maxExt || tau > olen + maxExt) return;
        if (Math.abs(t) < Math.abs(bestT)) bestT = t;
      });
      if (connected || !Number.isFinite(bestT)) continue;
      if (end === 'a') {
        l.ax = px + dx * bestT;
        l.ay = py + dy * bestT;
      } else {
        l.bx = px + dx * bestT;
        l.by = py + dy * bestT;
      }
    }
  }
}

/**
 * Un mur dont l'axe est compris dans l'épaisseur d'un mur parallèle plus épais qui le recouvre perd la
 * partie recouverte (traits multiples d'un même mur, ligne d'axe pleine).
 */
function removeContained(lines: WallLine[], tol: MergeTolerances, minLength: number): WallLine[] {
  const out: WallLine[] = [];
  for (const cluster of clusterByDirection(lines, tol.angle)) {
    const items = [...cluster.items].sort((a, b) => lines[b.index].thick - lines[a.index].thick || (b.hi - b.lo) - (a.hi - a.lo));
    const maxThick = items.reduce((m, i) => Math.max(m, lines[i.index].thick), 0);
    const bucket = Math.max(maxThick, tol.offset, 1e-9);
    const accepted = new Map<number, AxisItem[]>();
    for (const it of items) {
      const line = lines[it.index];
      const covers: Array<[number, number]> = [];
      const k = Math.floor(it.off / bucket);
      for (let kk = k - 1; kk <= k + 1; kk++) {
        for (const acc of accepted.get(kk) ?? []) {
          const big = lines[acc.index];
          if (Math.abs(acc.off - it.off) <= big.thick / 2 + tol.offset && big.thick >= line.thick) covers.push([acc.lo, acc.hi]);
        }
      }
      const pieces = covers.length ? subtractIntervals(it.lo, it.hi, covers) : [[it.lo, it.hi] as [number, number]];
      for (const [f0, f1] of pieces) {
        if (f1 - f0 < minLength) continue;
        out.push(covers.length ? fromAxis(cluster.ux, cluster.uy, f0, f1, it.off, line.thick, line.measured) : line);
      }
      const list = accepted.get(k) ?? [];
      list.push(it);
      accepted.set(k, list);
    }
  }
  return out;
}

/** Emprise (unités racine) des murs, épaisseur comprise. */
function footprintOf(lines: WallLine[]): SvgBox | null {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const l of lines) {
    const len = lineLength(l);
    if (len === 0) continue;
    const nx = (-(l.by - l.ay) / len) * (l.thick / 2);
    const ny = ((l.bx - l.ax) / len) * (l.thick / 2);
    for (const [x, y] of [[l.ax + nx, l.ay + ny], [l.ax - nx, l.ay - ny], [l.bx + nx, l.by + ny], [l.bx - nx, l.by - ny]]) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  if (!Number.isFinite(minX) || maxX - minX <= 0) return null;
  return { x: minX, y: minY, width: maxX - minX, height: Math.max(0, maxY - minY) };
}

function pointSegmentDistance(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
  const dx = bx - ax, dy = by - ay;
  const l2 = dx * dx + dy * dy;
  const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l2));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

/** Point de croisement des segments [a, b] et [c, d] (contact compris), null s'ils ne se coupent pas. */
function segmentCrossing(ax: number, ay: number, bx: number, by: number, cx: number, cy: number, dx: number, dy: number): Point | null {
  const rx = bx - ax, ry = by - ay;
  const sx = dx - cx, sy = dy - cy;
  const den = rx * sy - ry * sx;
  if (Math.abs(den) <= 1e-12 * Math.hypot(rx, ry) * Math.hypot(sx, sy)) return null;
  const qx = cx - ax, qy = cy - ay;
  const t = (qx * sy - qy * sx) / den;
  const u = (qx * ry - qy * rx) / den;
  if (t < 0 || t > 1 || u < 0 || u > 1) return null;
  return { x: ax + t * rx, y: ay + t * ry };
}

/** Contour sans sommets quasi confondus (bruit de conversion), sommet de fermeture compris. */
function withoutNearDuplicates(points: Point[], tol: number): Point[] {
  const out: Point[] = [];
  for (const p of points) {
    const prev = out[out.length - 1];
    if (!prev || Math.hypot(p.x - prev.x, p.y - prev.y) > tol) out.push(p);
  }
  while (out.length > 2 && Math.hypot(out[0].x - out[out.length - 1].x, out[0].y - out[out.length - 1].y) <= tol) out.pop();
  return out;
}

function polygonAreaAbs(points: Point[]): number {
  let area = 0;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    area += points[j].x * points[i].y - points[i].x * points[j].y;
  }
  return Math.abs(area) / 2;
}

function round2(v: number): number {
  return Math.round(v * 100) / 100;
}

// ---------------------------------------------------------------------------------------------
// Étape 2 : reconnaissance
// ---------------------------------------------------------------------------------------------

interface ResolvedOptions {
  totalWidthMeters: number;
  defaultThickness: number;
  defaultHeight: number;
  minRoomAreaM2: number;
  maxRoomAreaM2: number;
  excludedLayers: Set<string>;
}

function positiveOr(v: unknown, fallback: number): number {
  return typeof v === 'number' && Number.isFinite(v) && v > 0 ? v : fallback;
}

function resolveOptions(o: SvgParseOptions): ResolvedOptions {
  const minRoom = positiveOr(o.minRoomAreaM2, DEFAULTS.minRoomAreaM2);
  return {
    totalWidthMeters: positiveOr(o.totalWidthMeters, DEFAULTS.totalWidthMeters),
    defaultThickness: positiveOr(o.defaultThickness, DEFAULTS.defaultThickness),
    defaultHeight: positiveOr(o.defaultHeight, DEFAULTS.defaultHeight),
    minRoomAreaM2: minRoom,
    maxRoomAreaM2: Math.max(minRoom, positiveOr(o.maxRoomAreaM2, DEFAULTS.maxRoomAreaM2)),
    excludedLayers: new Set(o.excludedLayers ?? [])
  };
}

function layerId(layer: number): string {
  return layer < 0 ? 'root' : `L${layer}`;
}

interface BuildResult {
  walls: WallLine[];
  doorArcs: RawArc[];
}

/** Forme couvrant la page (fond, cadre) : jamais une pièce, et un mur seulement si rien d'autre ne l'indique. */
function coversPage(s: RawShape, vb: SvgBox): boolean {
  return (s.maxX - s.minX) >= TOL.frameCoverage * vb.width && (s.maxY - s.minY) >= TOL.frameCoverage * vb.height;
}

/**
 * Retire le cartouche et tout ce qui s'y raccorde : traits posés sur un cadre de page exclu, puis, de
 * proche en proche, les traits qui touchent ceux-ci (extrémité sur un autre trait, à `frameTouch` près).
 */
function withoutFrameAttachments(segments: RawSegment[], shapes: RawShape[], frames: Set<number>, k: number, extent: number): RawSegment[] {
  const tol = TOL.frameTouch * k;
  const grid = new SpatialGrid<number>(gridSize(Math.max(tol * 20, k), extent));
  segments.forEach((s, i) => {
    grid.insertBox(Math.min(s.ax, s.bx) - tol, Math.min(s.ay, s.by) - tol, Math.max(s.ax, s.bx) + tol, Math.max(s.ay, s.by) + tol, i);
  });
  const touches = (s: RawSegment, x: number, y: number) => pointSegmentDistance(x, y, s.ax, s.ay, s.bx, s.by) <= tol;
  const linked = (s: RawSegment, t: RawSegment) =>
    touches(t, s.ax, s.ay) || touches(t, s.bx, s.by) || touches(s, t.ax, t.ay) || touches(s, t.bx, t.by);
  const removed = new Set<number>();
  const queue: number[] = [];
  segments.forEach((s, i) => {
    for (const f of frames) {
      const pts = shapes[f].points;
      for (let p = 0, q = pts.length - 1; p < pts.length; q = p++) {
        const edge: RawSegment = { ...s, ax: pts[q].x, ay: pts[q].y, bx: pts[p].x, by: pts[p].y };
        if (!removed.has(i) && (touches(edge, s.ax, s.ay) || touches(edge, s.bx, s.by))) {
          removed.add(i);
          queue.push(i);
        }
      }
    }
  });
  while (queue.length > 0) {
    const s = segments[queue.pop() as number];
    grid.query(Math.min(s.ax, s.bx) - tol, Math.min(s.ay, s.by) - tol, Math.max(s.ax, s.bx) + tol, Math.max(s.ay, s.by) + tol, j => {
      if (!removed.has(j) && linked(s, segments[j])) {
        removed.add(j);
        queue.push(j);
      }
    });
  }
  return removed.size === 0 ? segments : segments.filter((_, i) => !removed.has(i));
}

/** Cadre de page (et non mur extérieur dessiné à fleur de page) : voir buildWalls, étape 4. */
function isPageFrame(s: RawShape, index: number, candidates: RawSegment[], vb: SvgBox, mpu: number): boolean {
  const k = 1 / mpu;
  if (!coversPage(s, vb) || s.stroke * mpu >= TOL.frameMaxStroke || s.points.length !== 4) return false;
  const pts = s.points;
  // Rectangle aligné sur les axes de la page.
  const tolAxis = 0.01 * Math.max(s.maxX - s.minX, s.maxY - s.minY);
  for (const p of pts) {
    const onX = Math.abs(p.x - s.minX) <= tolAxis || Math.abs(p.x - s.maxX) <= tolAxis;
    const onY = Math.abs(p.y - s.minY) <= tolAxis || Math.abs(p.y - s.maxY) <= tolAxis;
    if (!onX || !onY) return false;
  }
  const touch = TOL.frameTouch * k;
  let tMinX = Infinity, tMinY = Infinity, tMaxX = -Infinity, tMaxY = -Infinity;
  for (const c of candidates) {
    if (c.shape === index) continue;
    const clen = Math.hypot(c.bx - c.ax, c.by - c.ay);
    for (let p = 0, q = pts.length - 1; p < pts.length; q = p++) {
      const ex = pts[p].x - pts[q].x, ey = pts[p].y - pts[q].y;
      const elen = Math.hypot(ex, ey);
      if (elen === 0 || clen === 0) continue;
      // Face d'un mur en double trait : trait parallèle à 4–50 cm, qui recouvre une bonne part du côté.
      const cross = (ex * (c.by - c.ay) - ey * (c.bx - c.ax)) / (elen * clen);
      if (Math.abs(cross) < 0.035) {
        const dist = Math.abs((c.ax - pts[q].x) * ey - (c.ay - pts[q].y) * ex) / elen;
        if (dist >= TOL.pairMin * k && dist <= TOL.pairMax * k) {
          const s0 = ((c.ax - pts[q].x) * ex + (c.ay - pts[q].y) * ey) / elen;
          const s1 = ((c.bx - pts[q].x) * ex + (c.by - pts[q].y) * ey) / elen;
          const overlap = Math.min(elen, Math.max(s0, s1)) - Math.max(0, Math.min(s0, s1));
          if (overlap >= 0.3 * elen) return false;
        }
      }
      for (const [x, y] of [[c.ax, c.ay], [c.bx, c.by]]) {
        if (pointSegmentDistance(x, y, pts[q].x, pts[q].y, pts[p].x, pts[p].y) <= touch) {
          tMinX = Math.min(tMinX, x);
          tMaxX = Math.max(tMaxX, x);
          tMinY = Math.min(tMinY, y);
          tMaxY = Math.max(tMaxY, y);
        }
      }
    }
  }
  if (!Number.isFinite(tMinX)) return true;
  // Raccords regroupés dans un coin (cartouche) : cadre ; répartis sur le pourtour (cloisons) : mur.
  return tMaxX - tMinX < 0.5 * (s.maxX - s.minX) && tMaxY - tMinY < 0.5 * (s.maxY - s.minY);
}

/** Mesure de l'échelle : mètres par unité racine (`mpu`) ; `k` = unités racine par mètre. */
function buildWalls(prims: SvgPrimitives, vb: SvgBox, mpu: number, o: ResolvedOptions): BuildResult {
  const k = 1 / mpu;
  const extent = Math.max(vb.width, vb.height);

  // 1. Battants de porte (quarts de cercle de rayon plausible) : leurs traits (vantail, fermeture) ne sont pas des murs.
  const doorArcs = prims.arcs.filter(a => {
    const r = (a.r1 + a.r2) / 2;
    return r >= TOL.doorRadiusMin * k && r <= TOL.doorRadiusMax * k;
  });
  const leafTol = 0.06 * k;
  const arcGrid = new SpatialGrid<RawArc>(gridSize(leafTol * 4, extent));
  for (const a of doorArcs) arcGrid.insertBox(a.cx, a.cy, a.cx, a.cy, a);
  const near = (x1: number, y1: number, x2: number, y2: number) => Math.hypot(x1 - x2, y1 - y2) <= leafTol;
  const isLeaf = (s: RawSegment): boolean => {
    let leaf = false;
    const test = (hx: number, hy: number, ox: number, oy: number) => {
      arcGrid.query(hx - leafTol, hy - leafTol, hx + leafTol, hy + leafTol, a => {
        if (!leaf && near(a.cx, a.cy, hx, hy) && (near(a.ax, a.ay, ox, oy) || near(a.bx, a.by, ox, oy))) leaf = true;
      });
    };
    test(s.ax, s.ay, s.bx, s.by);
    if (!leaf) test(s.bx, s.by, s.ax, s.ay);
    return leaf;
  };

  // 2. Petits objets (prises, poteaux, symboles) : jamais des murs.
  const small = new Set<number>();
  prims.shapes.forEach((s, i) => {
    if (Math.max(s.maxX - s.minX, s.maxY - s.minY) < TOL.smallObject * k) small.add(i);
  });

  // Détection des pointillés (suites de petits segments colinéaires alignés) : indications de mesure / structure
  const shortDashTol = 0.4 * k;
  const dashedSegments = new Set<RawSegment>();
  const shortSegGrid = new SpatialGrid<RawSegment>(gridSize(shortDashTol * 2, extent));
  const shortSegs: RawSegment[] = [];
  for (const s of prims.segments) {
    const l = Math.hypot(s.bx - s.ax, s.by - s.ay);
    if (l >= TOL.minSegment * k && l <= shortDashTol) {
      shortSegs.push(s);
      shortSegGrid.insertBox(Math.min(s.ax, s.bx), Math.min(s.ay, s.by), Math.max(s.ax, s.bx), Math.max(s.ay, s.by), s);
    }
  }

  for (const s of shortSegs) {
    if (dashedSegments.has(s)) continue;
    const sLen = Math.hypot(s.bx - s.ax, s.by - s.ay);
    if (sLen === 0) continue;
    const sDx = (s.bx - s.ax) / sLen;
    const sDy = (s.by - s.ay) / sLen;
    let collinearCount = 0;
    const pad = 0.3 * k;
    shortSegGrid.query(
      Math.min(s.ax, s.bx) - pad, Math.min(s.ay, s.by) - pad,
      Math.max(s.ax, s.bx) + pad, Math.max(s.ay, s.by) + pad,
      o => {
        if (o === s) return;
        const oLen = Math.hypot(o.bx - o.ax, o.by - o.ay);
        if (oLen === 0) return;
        const oDx = (o.bx - o.ax) / oLen;
        const oDy = (o.by - o.ay) / oLen;
        if (Math.abs(sDx * oDx + sDy * oDy) > 0.98) {
          const perp = Math.abs((o.ax - s.ax) * sDy - (o.ay - s.ay) * sDx);
          if (perp < 0.04 * k) {
            const d1 = Math.hypot(o.ax - s.bx, o.ay - s.by);
            const d2 = Math.hypot(o.bx - s.ax, o.by - s.ay);
            if (d1 < 0.25 * k || d2 < 0.25 * k) collinearCount++;
          }
        }
      }
    );
    if (collinearCount >= 2) dashedSegments.add(s);
  }

  // Détection des flèches géométriques ou ticks aux extrémités
  const arrowTol = 0.20 * k;
  const smallShapeGrid = new SpatialGrid<RawShape>(gridSize(arrowTol * 4, extent));
  for (const shapeIdx of small) {
    const sh = prims.shapes[shapeIdx];
    smallShapeGrid.insertBox(sh.minX, sh.minY, sh.maxX, sh.maxY, sh);
  }

  const hasArrowAt = (x: number, y: number): boolean => {
    let found = false;
    smallShapeGrid.query(x - arrowTol, y - arrowTol, x + arrowTol, y + arrowTol, () => {
      found = true;
    });
    if (found) return true;
    let branches = 0;
    shortSegGrid.query(x - arrowTol, y - arrowTol, x + arrowTol, y + arrowTol, s => {
      if (Math.hypot(s.ax - x, s.ay - y) <= arrowTol || Math.hypot(s.bx - x, s.by - y) <= arrowTol) branches++;
    });
    return branches >= 2;
  };
  const isArrowMeasurement = (s: RawSegment): boolean => hasArrowAt(s.ax, s.ay) && hasArrowAt(s.bx, s.by);

  // 3. Traits candidats
  const candidates = prims.segments.filter(s =>
    s.role === 'wall' &&
    !dashedSegments.has(s) &&
    !isArrowMeasurement(s) &&
    (s.stroke > 0 || s.fill === 'dark') &&
    !(s.shape >= 0 && small.has(s.shape)) &&
    Math.hypot(s.bx - s.ax, s.by - s.ay) >= TOL.minSegment * k &&
    !isLeaf(s)
  );

  // 4. Cadre de page : rectangle au trait fin couvrant la page, qui n'est pas la face d'un mur en double
  //    trait, et auquel ne se raccordent au plus que les traits d'un cartouche (regroupés dans un coin).
  const frames = new Set<number>();
  prims.shapes.forEach((s, i) => {
    if (isPageFrame(s, i, candidates, vb, mpu)) frames.add(i);
  });
  let kept = candidates.filter(c => !(c.shape >= 0 && frames.has(c.shape)));
  if (frames.size > 0) kept = withoutFrameAttachments(kept, prims.shapes, frames, k, extent);
  // Un plan réduit à un seul rectangle pleine page : c'est bien le mur.
  if (kept.length === 0) kept = candidates;

  // 5. Lignes avec leur épaisseur : trait épais = épaisseur réelle, sinon épaisseur par défaut.
  const lines: WallLine[] = kept.map(s => {
    const strokeM = s.stroke * mpu;
    const thick = strokeM >= TOL.strokeThicknessMin && strokeM <= TOL.strokeThicknessMax ? s.stroke : o.defaultThickness * k;
    return { ax: s.ax, ay: s.ay, bx: s.bx, by: s.by, thick, measured: false };
  });

  const merge: MergeTolerances = {
    angle: (TOL.mergeAngleDeg * Math.PI) / 180,
    offset: TOL.mergeOffset * k,
    gap: TOL.mergeGap * k,
    thickness: TOL.mergeThickness * k
  };
  let walls = mergeCollinear(lines, merge);
  walls = pairDoubleLines(walls, {
    angle: (TOL.pairAngleDeg * Math.PI) / 180,
    min: TOL.pairMin * k,
    max: TOL.pairMax * k,
    minOverlap: TOL.pairMinOverlap * k,
    minPiece: TOL.pairMinPiece * k,
    leftoverMin: TOL.leftoverMin * k
  });
  walls = removeEnclosed(walls, TOL.enclosed * k);
  snapEndpoints(walls, TOL.snap * k);
  healJunctions(walls, TOL.heal * k);
  snapEndpoints(walls, TOL.snap * k);
  walls = mergeCollinear(walls, merge);
  walls = removeContained(walls, { ...merge, angle: (TOL.pairAngleDeg * Math.PI) / 180 }, TOL.minWall * k);
  walls = walls.filter(w => lineLength(w) >= TOL.minWall * k);
  return { walls, doorArcs };
}

interface PendingOpening {
  host: LiveWall;
  cx: number;
  cy: number;
  width: number;
  type: OpeningType;
  hinge?: Point;
  openEnd?: Point;
}

function resolveWall(w: LiveWall): LiveWall {
  let cur = w;
  while (cur.into) cur = cur.into;
  return cur;
}

/**
 * Ouvertures : portes depuis les battants (charnière = centre de l'arc, largeur = rayon mesuré après
 * transformations, sens d'ouverture reporté) et portes/fenêtres depuis les traits balisés. Une ouverture
 * dessinée dans l'interruption d'un mur réunit les deux tronçons (ou prolonge le mur) pour être portée
 * par un mur continu, centrée sur la baie (constat F69).
 */
function detectOpenings(walls: LiveWall[], doorArcs: RawArc[], segments: RawSegment[], mpu: number): PendingOpening[] {
  const k = 1 / mpu;
  const openings: PendingOpening[] = [];
  if (walls.length === 0) return openings;
  const reach = 0.8 * k;
  const grid = new SpatialGrid<LiveWall>(gridSize(k, extentOf(walls)));
  const index = (w: LiveWall) => {
    grid.insertBox(Math.min(w.ax, w.bx) - reach, Math.min(w.ay, w.by) - reach, Math.max(w.ax, w.bx) + reach, Math.max(w.ay, w.by) + reach, w);
  };
  walls.forEach(index);
  const tol = 0.05 * k;
  const sinParallel = Math.sin((TOL.bridgeParallelDeg * Math.PI) / 180);

  const nearest = (px: number, py: number, maxDist: (w: LiveWall) => number, accept?: (w: LiveWall) => boolean) => {
    let best: LiveWall | null = null;
    let bestD = Infinity;
    const seen = new Set<LiveWall>();
    grid.query(px, py, px, py, w => {
      if (!w.alive || seen.has(w)) return;
      seen.add(w);
      if (accept && !accept(w)) return;
      const d = pointSegmentDistance(px, py, w.ax, w.ay, w.bx, w.by);
      if (d <= maxDist(w) && d < bestD) {
        bestD = d;
        best = w;
      }
    });
    return best as LiveWall | null;
  };

  const axis = (w: LiveWall) => {
    const len = lineLength(w);
    return { len, ux: (w.bx - w.ax) / len, uy: (w.by - w.ay) / len };
  };

  /** Prolonge `host` jusqu'au paramètre `param` (côté début ou fin), en absorbant le tronçon colinéaire d'en face. */
  const extend = (host: LiveWall, side: 'start' | 'end', param: number) => {
    const { len, ux, uy } = axis(host);
    const nx = -uy, ny = ux;
    const px = host.ax + ux * param, py = host.ay + uy * param;
    let partner: LiveWall | null = null;
    let partnerLo = 0, partnerHi = 0;
    const seen = new Set<LiveWall>();
    grid.query(Math.min(px, host.ax, host.bx), Math.min(py, host.ay, host.by), Math.max(px, host.ax, host.bx), Math.max(py, host.ay, host.by), c => {
      if (!c.alive || c === host || seen.has(c)) return;
      seen.add(c);
      const clen = lineLength(c);
      if (clen === 0) return;
      const cux = (c.bx - c.ax) / clen, cuy = (c.by - c.ay) / clen;
      if (Math.abs(ux * cuy - uy * cux) > sinParallel) return;
      const maxOff = Math.max(c.thick, host.thick) / 2 + tol;
      if (Math.abs((c.ax - host.ax) * nx + (c.ay - host.ay) * ny) > maxOff) return;
      if (Math.abs((c.bx - host.ax) * nx + (c.by - host.ay) * ny) > maxOff) return;
      const s0 = (c.ax - host.ax) * ux + (c.ay - host.ay) * uy;
      const s1 = (c.bx - host.ax) * ux + (c.by - host.ay) * uy;
      const lo = Math.min(s0, s1), hi = Math.max(s0, s1);
      if (side === 'end' ? (lo <= param + tol && lo >= len - tol && hi > len) : (hi >= param - tol && hi <= tol && lo < 0)) {
        const better = !partner || (side === 'end' ? lo < partnerLo : hi > partnerHi);
        if (better) {
          partner = c;
          partnerLo = lo;
          partnerHi = hi;
        }
      }
    });
    const ax = host.ax, ay = host.ay;
    let newLo = Math.min(0, param), newHi = Math.max(len, param);
    const absorbed = partner as LiveWall | null;
    if (absorbed) {
      newLo = Math.min(newLo, partnerLo);
      newHi = Math.max(newHi, partnerHi);
      absorbed.alive = false;
      absorbed.into = host;
      host.thick = Math.max(host.thick, absorbed.thick);
      host.measured = host.measured || absorbed.measured;
    }
    host.ax = ax + ux * newLo;
    host.ay = ay + uy * newLo;
    host.bx = ax + ux * newHi;
    host.by = ay + uy * newHi;
    index(host);
  };

  /** Garantit que [lo, hi] (paramètres depuis host.a) est porté par le mur. */
  const attach = (host: LiveWall, lo: number, hi: number) => {
    const { len } = axis(host);
    if (hi > len + tol) extend(host, 'end', hi);
    if (lo < -tol) extend(host, 'start', lo);
  };

  const isDuplicate = (host: LiveWall, cx: number, cy: number) =>
    openings.some(op => resolveWall(op.host) === host && Math.hypot(op.cx - cx, op.cy - cy) < TOL.openingDedupe * k);

  // 1. Portes depuis les battants. Des deux extrémités de l'arc, l'une est la position fermée (le long du
  //    mur), l'autre le vantail ouvert. On retient l'hypothèse dont la baie tombe dans une interruption de
  //    mur (porte près d'un angle : le vantail ouvert longe aussi un mur, mais un mur plein).
  const hingeTol = TOL.doorHinge * k;
  const sinAlong = Math.sin((10 * Math.PI) / 180);
  for (const arc of doorArcs) {
    const r = (arc.r1 + arc.r2) / 2;
    let best: { host: LiveWall; coverage: number; offsets: number; closed: Point; open: Point } | null = null;
    const ends: Array<[Point, Point]> = [
      [{ x: arc.ax, y: arc.ay }, { x: arc.bx, y: arc.by }],
      [{ x: arc.bx, y: arc.by }, { x: arc.ax, y: arc.ay }]
    ];
    for (const [closed, open] of ends) {
      const vlen = Math.hypot(closed.x - arc.cx, closed.y - arc.cy);
      const vx = (closed.x - arc.cx) / vlen, vy = (closed.y - arc.cy) / vlen;
      const found: Array<{ w: LiveWall; lo: number; hi: number; offsets: number }> = [];
      const seen = new Set<LiveWall>();
      grid.query(
        Math.min(arc.cx, closed.x) - hingeTol, Math.min(arc.cy, closed.y) - hingeTol,
        Math.max(arc.cx, closed.x) + hingeTol, Math.max(arc.cy, closed.y) + hingeTol,
        w => {
          if (!w.alive || seen.has(w)) return;
          seen.add(w);
          const { ux, uy } = axis(w);
          if (Math.abs(ux * vy - uy * vx) > sinAlong) return;
          const maxOff = w.thick / 2 + hingeTol;
          const dHinge = Math.abs((arc.cx - w.ax) * -uy + (arc.cy - w.ay) * ux);
          const dClosed = Math.abs((closed.x - w.ax) * -uy + (closed.y - w.ay) * ux);
          if (dHinge > maxOff || dClosed > maxOff) return;
          const s0 = (w.ax - arc.cx) * vx + (w.ay - arc.cy) * vy;
          const s1 = (w.bx - arc.cx) * vx + (w.by - arc.cy) * vy;
          const lo = Math.min(s0, s1), hi = Math.max(s0, s1);
          if (hi < -hingeTol || lo > r + hingeTol) return;
          found.push({ w, lo, hi, offsets: dHinge + dClosed });
        }
      );
      if (found.length === 0) continue;
      const covered = subtractIntervals(0, r, found.map(f => [f.lo, f.hi] as [number, number]))
        .reduce((free, [a, b]) => free - (b - a), r);
      const coverage = covered / r;
      // Mur porteur : celui qui contient ou touche la charnière.
      const hingeDist = (f: { lo: number; hi: number }) => (f.lo <= 0 && f.hi >= 0 ? 0 : Math.min(Math.abs(f.lo), Math.abs(f.hi)));
      const host = found.reduce((a, b) => (hingeDist(b) < hingeDist(a) || (hingeDist(b) === hingeDist(a) && b.offsets < a.offsets) ? b : a));
      if (!best || coverage < best.coverage - 1e-6 || (Math.abs(coverage - best.coverage) <= 1e-6 && host.offsets < best.offsets)) {
        best = { host: host.w, coverage, offsets: host.offsets, closed, open };
      }
    }
    if (!best) continue;
    const host = best.host;
    const { ux, uy } = axis(host);
    const nx = -uy, ny = ux;
    const s = Math.sign((best.closed.x - arc.cx) * ux + (best.closed.y - arc.cy) * uy) || 1;
    const tHinge = (arc.cx - host.ax) * ux + (arc.cy - host.ay) * uy;
    attach(host, Math.min(tHinge, tHinge + s * r), Math.max(tHinge, tHinge + s * r));
    // Centre de la baie : projection de la charnière sur l'axe, décalée d'une demi-largeur vers la fermeture.
    const hingeOff = (arc.cx - host.ax) * nx + (arc.cy - host.ay) * ny;
    const cx = arc.cx - nx * hingeOff + ux * s * (r / 2);
    const cy = arc.cy - ny * hingeOff + uy * s * (r / 2);
    if (isDuplicate(host, cx, cy)) continue;
    openings.push({ host, cx, cy, width: r, type: 'door', hinge: { x: arc.cx, y: arc.cy }, openEnd: best.open });
  }

  // 2. Portes et fenêtres depuis les traits balisés (calque, groupe ou identifiant « fenêtre », « porte »…)
  const sinOpening = Math.sin((15 * Math.PI) / 180);
  for (const seg of segments) {
    if (seg.role !== 'window' && seg.role !== 'door') continue;
    const slen = Math.hypot(seg.bx - seg.ax, seg.by - seg.ay);
    if (slen < TOL.openingSpanMin * k) continue;
    const sux = (seg.bx - seg.ax) / slen, suy = (seg.by - seg.ay) / slen;
    const mx = (seg.ax + seg.bx) / 2, my = (seg.ay + seg.by) / 2;
    const host = nearest(mx, my, () => TOL.openingSnap * k, w => {
      const { ux, uy } = axis(w);
      return Math.abs(ux * suy - uy * sux) <= sinOpening;
    });
    if (!host) continue;
    const { ux, uy } = axis(host);
    const p0 = (seg.ax - host.ax) * ux + (seg.ay - host.ay) * uy;
    const p1 = (seg.bx - host.ax) * ux + (seg.by - host.ay) * uy;
    const lo = Math.min(p0, p1), hi = Math.max(p0, p1);
    const span = hi - lo;
    if (span < TOL.openingSpanMin * k || span > TOL.openingSpanMax * k) continue;
    attach(host, lo, hi);
    const nx = -uy, ny = ux;
    const off = (mx - host.ax) * nx + (my - host.ay) * ny;
    const cx = mx - nx * off, cy = my - ny * off;
    if (isDuplicate(host, cx, cy)) continue;
    const widthM = span * mpu;
    const type: OpeningType = seg.role === 'door' ? 'door' : widthM > 1.8 ? 'french_window' : 'window';
    openings.push({ host, cx, cy, width: span, type });
  }
  return openings;
}

interface RoomCandidate {
  shape: RawShape;
  index: number;
  points: Point[];
  areaM2: number;
  label: string | null;
}

/** Couleur et icône d'après le nom (mots entiers français ou anglais, sans accents). */
function roomStyle(name: string): { color: string; icon: string } {
  const n = normalizeText(name);
  if (/\b(salon|sejour|living|sam|salle a manger|lounge|dining)\b/.test(n)) return { color: 'rgba(59, 130, 246, 0.28)', icon: 'mdi:sofa' };
  if (/\b(chambre|ch|bed|bedroom|suite|parentale)\b/.test(n)) return { color: 'rgba(139, 92, 246, 0.28)', icon: 'mdi:bed' };
  if (/\b(cuisine|kitchen|kitchenette)\b/.test(n)) return { color: 'rgba(245, 158, 11, 0.28)', icon: 'mdi:silverware-fork-knife' };
  if (/\b(sdb|sde|bain|bains|douche|bath|bathroom|shower|salle d ?eau)\b/.test(n)) return { color: 'rgba(6, 182, 212, 0.28)', icon: 'mdi:shower' };
  if (/\b(wc|toilettes?|toilets?|restroom|lavatory)\b/.test(n)) return { color: 'rgba(16, 185, 129, 0.28)', icon: 'mdi:toilet' };
  if (/\b(bureau|office|travail|study|cabinet|consultation)\b/.test(n)) return { color: 'rgba(99, 102, 241, 0.28)', icon: 'mdi:desk' };
  if (/\b(entree|hall|couloir|degagement|degt|degat|corridor|palier|entry|entrance|hallway|landing|foyer)\b/.test(n)) return { color: 'rgba(100, 116, 139, 0.28)', icon: 'mdi:door' };
  if (/\b(buand|buanderie|lingerie|laundry)\b/.test(n)) return { color: 'rgba(100, 116, 139, 0.28)', icon: 'mdi:washing-machine' };
  if (/\b(cellier|cell|placard|plac|pl|dressing|debarras|storage|reserve)\b/.test(n)) return { color: 'rgba(148, 163, 184, 0.28)', icon: 'mdi:wardrobe' };
  if (/\b(garage|atelier|workshop)\b/.test(n)) return { color: 'rgba(120, 113, 108, 0.28)', icon: 'mdi:garage' };
  if (/\b(terrasse|balcon|patio|loggia|veranda|terrace|balcony|deck|porch)\b/.test(n)) return { color: 'rgba(20, 184, 166, 0.28)', icon: 'mdi:balcony' };
  return { color: 'rgba(56, 189, 248, 0.25)', icon: 'mdi:home-outline' };
}

/**
 * Pièces : chaque étiquette va au plus petit contour qui la contient ; une forme sans étiquette n'est une
 * pièce que si elle est explicitement remplie (couleur claire) ou balisée « pièce », et qu'elle n'englobe
 * ni étiquette ni autre pièce (contour du bâtiment). Un contour qui regroupe plusieurs pièces (enveloppe du
 * bâtiment dont les cloisons sont de simples traits) n'est pas une pièce : étiqueté, il a deux étiquettes
 * séparées par une cloison et n'en reçoit aucune ; rempli sans étiquette, il est recoupé par une cloison
 * raccordée aux deux bouts. Placards et pièces imbriquées ne cloisonnent pas leur contour, un épi non plus.
 * Les bornes de surface sont configurables ; les formes étiquetées hors bornes et les contours qui se
 * recoupent sont signalés (constats F149, F153, F170).
 *
 * `wallLines` : murs reconnus, en unités racine ; `wallCount` : murs créés (après conversion en mètres).
 */
function detectRooms(
  prims: SvgPrimitives,
  vb: SvgBox,
  mpu: number,
  o: ResolvedOptions,
  wallLines: WallLine[],
  wallCount: number
): { rooms: DetectedRoom[]; ignored: SvgIgnoredRoom[] } {
  const toWorld = (p: Point): Point => ({ x: round2((p.x - vb.x) * mpu), y: round2((p.y - vb.y) * mpu) });
  const candidates: RoomCandidate[] = [];
  prims.shapes.forEach((shape, index) => {
    if (shape.role !== 'wall' || shape.points.length > MAX_ROOM_VERTICES) return;
    // Fond ou cadre de page : jamais une pièce.
    if (coversPage(shape, vb)) return;
    const areaM2 = polygonAreaAbs(shape.points) * mpu * mpu;
    if (areaM2 < 0.2) return;
    candidates.push({ shape, index, points: shape.points, areaM2, label: null });
  });
  candidates.sort((a, b) => a.areaM2 - b.areaM2 || a.index - b.index);

  // Doublons (pièce remplie + contour tracé au même endroit) : on garde la forme la plus « pièce ».
  const unique: RoomCandidate[] = [];
  const bboxTol = 0.02 / mpu;
  for (const c of candidates) {
    const twin = unique.find(u =>
      Math.abs(u.areaM2 - c.areaM2) <= 0.01 * c.areaM2 &&
      Math.abs(u.shape.minX - c.shape.minX) <= bboxTol && Math.abs(u.shape.maxX - c.shape.maxX) <= bboxTol &&
      Math.abs(u.shape.minY - c.shape.minY) <= bboxTol && Math.abs(u.shape.maxY - c.shape.maxY) <= bboxTol
    );
    if (!twin) unique.push(c);
    else if (!twin.shape.fillExplicit && c.shape.fillExplicit) unique[unique.indexOf(twin)] = c;
  }

  const inside = (c: RoomCandidate, x: number, y: number) =>
    x >= c.shape.minX && x <= c.shape.maxX && y >= c.shape.minY && y <= c.shape.maxY && PolygonUtils.isPointInPolygon({ x, y }, c.points);

  // Murs reconnus (épaisseur comprise), contours candidats et étiquettes, indexés par leur emprise. Les
  // contours couvrent des surfaces : cellules d'au moins 1/256 de la page (jamais des millions de cellules).
  const k = 1 / mpu;
  const cell = Math.max(TOL.dividerCell * k, Math.max(vb.width, vb.height) / 256, 1e-9);
  const wallGrid = new SpatialGrid<WallLine>(cell);
  for (const w of wallLines) {
    const pad = w.thick / 2;
    wallGrid.insertBox(Math.min(w.ax, w.bx) - pad, Math.min(w.ay, w.by) - pad, Math.max(w.ax, w.bx) + pad, Math.max(w.ay, w.by) + pad, w);
  }
  const candidateGrid = new SpatialGrid<RoomCandidate>(cell);
  const rank = new Map<RoomCandidate, number>();
  unique.forEach((c, i) => {
    candidateGrid.insertBox(c.shape.minX, c.shape.minY, c.shape.maxX, c.shape.maxY, c);
    rank.set(c, i);
  });
  const labelGrid = new SpatialGrid<RawLabel>(cell);
  for (const l of prims.labels) labelGrid.insertBox(l.x, l.y, l.x, l.y, l);
  /** Étiquettes posées dans `c`. */
  const labelsIn = (c: RoomCandidate): RawLabel[] => {
    const out: RawLabel[] = [];
    labelGrid.query(c.shape.minX, c.shape.minY, c.shape.maxX, c.shape.maxY, l => {
      if (inside(c, l.x, l.y)) out.push(l);
    });
    return out;
  };

  /**
   * Point `p` du mur `w` qui fait de `w` une cloison intérieure de `c` : dans `c`, à plus de TOL.dividerMargin
   * (plus la demi-épaisseur) de son contour, et pas sur le contour d'une forme plus petite incluse dans `c`
   * (placard, pièce imbriquée, meuble), qui ne sépare pas `c` en plusieurs pièces.
   */
  const interiorPoint = (c: RoomCandidate, p: Point, w: WallLine): boolean => {
    if (!inside(c, p.x, p.y)) return false;
    if (PolygonUtils.distanceToBoundary(p, c.points) <= w.thick / 2 + TOL.dividerMargin * k) return false;
    const near = w.thick / 2 + TOL.enclosed * k;
    const t = TOL.enclosed * k;
    let onNested = false;
    candidateGrid.query(p.x - near, p.y - near, p.x + near, p.y + near, d => {
      if (onNested || d === c || d.areaM2 >= c.areaM2) return;
      const s = d.shape;
      if (s.minX < c.shape.minX - t || s.maxX > c.shape.maxX + t || s.minY < c.shape.minY - t || s.maxY > c.shape.maxY + t) return;
      if (PolygonUtils.distanceToBoundary(p, d.points) <= near) onNested = true;
    });
    return !onNested;
  };

  /**
   * Contour étiqueté qui regroupe plusieurs pièces (enveloppe du bâtiment dont les cloisons sont de simples
   * traits) : deux de ses étiquettes sont séparées par une cloison intérieure. Une seule étiquette n'est
   * jamais retirée à son contour (épi, îlot, meuble dessiné au trait).
   */
  const envelopeCache = new Map<RoomCandidate, boolean>();
  const separatesLabels = (c: RoomCandidate): boolean => {
    const cached = envelopeCache.get(c);
    if (cached !== undefined) return cached;
    const inC = labelsIn(c).slice(0, MAX_LABEL_PAIRS);
    let result = false;
    for (let i = 1; i < inC.length && !result; i++) {
      const a = inC[0], b = inC[i];
      const seen = new Set<WallLine>();
      wallGrid.query(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.max(a.x, b.x), Math.max(a.y, b.y), w => {
        if (result || seen.has(w)) return;
        seen.add(w);
        if (lineLength(w) < TOL.dividerMin * k) return;
        const p = segmentCrossing(a.x, a.y, b.x, b.y, w.ax, w.ay, w.bx, w.by);
        if (p && interiorPoint(c, p, w)) result = true;
      });
    }
    envelopeCache.set(c, result);
    return result;
  };

  /** Extrémité d'une cloison raccordée au contour de `c` ou à un autre mur, à une baie près. */
  const anchored = (c: RoomCandidate, w: WallLine, x: number, y: number): boolean => {
    const reach = TOL.dividerReach * k + w.thick / 2;
    if (PolygonUtils.distanceToBoundary({ x, y }, c.points) <= reach) return true;
    let found = false;
    wallGrid.query(x - reach, y - reach, x + reach, y + reach, o => {
      if (!found && o !== w && pointSegmentDistance(x, y, o.ax, o.ay, o.bx, o.by) <= reach + o.thick / 2) found = true;
    });
    return found;
  };

  /** Forme remplie sans étiquette recoupée par une cloison raccordée aux deux bouts (et non un simple épi). */
  const partitioned = (c: RoomCandidate): boolean => {
    let found = false;
    const seen = new Set<WallLine>();
    wallGrid.query(c.shape.minX, c.shape.minY, c.shape.maxX, c.shape.maxY, w => {
      if (found || seen.has(w)) return;
      seen.add(w);
      if (lineLength(w) < TOL.dividerMin * k) return;
      const mid = { x: (w.ax + w.bx) / 2, y: (w.ay + w.by) / 2 };
      if (interiorPoint(c, mid, w) && anchored(c, w, w.ax, w.ay) && anchored(c, w, w.bx, w.by)) found = true;
    });
    return found;
  };

  /** Étiquettes posées dans un contour candidat (retenu ou écarté) : jamais de pièce approximative pour elles. */
  const enclosedLabels = new Set<RawLabel>();
  for (const label of prims.labels) {
    // Contours qui contiennent l'étiquette, du plus petit au plus grand (ordre de `unique`).
    const containing: RoomCandidate[] = [];
    candidateGrid.query(label.x, label.y, label.x, label.y, c => {
      if (inside(c, label.x, label.y)) containing.push(c);
    });
    containing.sort((a, b) => (rank.get(a) ?? 0) - (rank.get(b) ?? 0));
    const owner = containing.find(c => !separatesLabels(c));
    if (!owner) continue;
    enclosedLabels.add(label);
    if (owner.label === null) owner.label = label.text;
  }

  const ignored: SvgIgnoredRoom[] = [];
  const accepted: Array<{ candidate: RoomCandidate; worldPolygon: Point[]; areaM2: number; centroid: Point }> = [];
  /**
   * Un contour qui se recoupe (« nœud papillon ») n'est pas une pièce : sa surface calculée est fausse
   * (les lobes s'annulent) et son rendu aussi. Il est écarté et signalé (constat F170).
   */
  const accept = (c: RoomCandidate): void => {
    // Sommets quasi confondus (bruit d'export) : sinon une arête minuscule passe pour un aller-retour.
    const points = withoutNearDuplicates(c.points, TOL.vertexMerge * k);
    if (points.length < 3) return;
    if (PolygonUtils.isSelfIntersecting(points)) {
      ignored.push({ name: c.label ?? '', areaM2: round2(c.areaM2), reason: 'self_intersecting' });
      return;
    }
    const worldPolygon = points.map(toWorld);
    accepted.push({ candidate: c, worldPolygon, areaM2: PolygonUtils.computeArea(worldPolygon), centroid: PolygonUtils.calculateCentroid(points) });
  };
  const minUnlabeled = Math.max(o.minRoomAreaM2, TOL.unlabeledRoomMin);
  for (const c of unique) {
    if (c.label !== null) {
      if (c.areaM2 >= o.minRoomAreaM2 && c.areaM2 <= o.maxRoomAreaM2) accept(c);
      else ignored.push({ name: c.label, areaM2: round2(c.areaM2), reason: 'area' });
      continue;
    }
    const filled = (c.shape.fillExplicit && c.shape.fill === 'light') || c.shape.roomHint;
    if (!filled || c.areaM2 < minUnlabeled || c.areaM2 > o.maxRoomAreaM2) continue;
    if (labelsIn(c).length > 0 || partitioned(c)) continue;
    if (accepted.some(a => inside(c, a.centroid.x, a.centroid.y))) continue;
    accept(c);
  }
  accepted.sort((a, b) => a.candidate.index - b.candidate.index);

  const rooms: DetectedRoom[] = [];
  const generic = (polygon: Point[], areaM2: number, n: number): Room => {
    const style = roomStyle('');
    return { id: '', name: localize('import.parser.room_generic', { n }), polygon, areaM2, color: style.color, icon: style.icon, height: o.defaultHeight };
  };
  accepted.forEach((a, i) => {
    const id = generateElementId('room');
    const g = { ...generic(a.worldPolygon, a.areaM2, i + 1), id };
    let name = a.candidate.label;
    if (!name) {
      const closeLabel = prims.labels.find(l =>
        !enclosedLabels.has(l) &&
        ROOM_NAME_RE.test(normalizeText(l.text)) &&
        Math.hypot(toWorld({ x: l.x, y: l.y }).x - a.centroid.x, toWorld({ x: l.x, y: l.y }).y - a.centroid.y) < 2.5
      );
      if (closeLabel) {
        name = closeLabel.text;
        enclosedLabels.add(closeLabel);
      }
    }
    const style = name ? roomStyle(name) : null;
    rooms.push({
      named: name && style ? { ...g, name, color: style.color, icon: style.icon } : g,
      generic: g,
      fromLabel: !!name,
      labelOnly: false
    });
  });

  // Détection des pièces autour des étiquettes de pièces restantes (délimitées par les murs ou emprise par défaut)
  if (wallCount >= 4) {
    for (const label of prims.labels) {
      if (enclosedLabels.has(label) || !ROOM_NAME_RE.test(normalizeText(label.text))) continue;
      const c = toWorld({ x: label.x, y: label.y });
      if (rooms.some(r => !r.labelOnly && PolygonUtils.containsPoint(c, r.generic.polygon))) continue;

      const half = 1.8;
      const polygon: Point[] = [
        { x: round2(c.x - half), y: round2(c.y - half) },
        { x: round2(c.x + half), y: round2(c.y - half) },
        { x: round2(c.x + half), y: round2(c.y + half) },
        { x: round2(c.x - half), y: round2(c.y + half) }
      ];
      const style = roomStyle(label.text);
      const room: Room = {
        id: generateElementId('room'),
        name: label.text,
        polygon,
        areaM2: PolygonUtils.computeArea(polygon),
        color: style.color,
        icon: style.icon,
        height: o.defaultHeight
      };
      rooms.push({ named: room, generic: room, fromLabel: true, labelOnly: true });
      enclosedLabels.add(label);
    }
  }
  return { rooms, ignored };
}

function filterPrimitives(prims: SvgPrimitives, excluded: Set<string>): SvgPrimitives {
  if (excluded.size === 0) return prims;
  const keep = (layer: number) => !excluded.has(layerId(layer));
  // Les indices de forme des segments doivent rester valides : on remplace les formes exclues par null.
  const shapeMap = new Map<number, number>();
  const shapes: RawShape[] = [];
  prims.shapes.forEach((s, i) => {
    if (keep(s.layer)) shapeMap.set(i, shapes.push(s) - 1);
  });
  return {
    segments: prims.segments
      .filter(s => keep(s.layer))
      .map(s => (s.shape >= 0 ? { ...s, shape: shapeMap.get(s.shape) ?? -1 } : s)),
    shapes,
    arcs: prims.arcs.filter(a => keep(a.layer)),
    labels: prims.labels.filter(l => keep(l.layer))
  };
}

/** Emprise des traits candidats murs, à défaut de tout le contenu. */
function candidateBounds(prims: SvgPrimitives): SvgBox | null {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const add = (x: number, y: number) => {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  };
  for (const s of prims.segments) {
    if (s.role === 'wall') {
      add(s.ax, s.ay);
      add(s.bx, s.by);
    }
  }
  if (!Number.isFinite(minX)) {
    for (const s of prims.shapes) {
      add(s.minX, s.minY);
      add(s.maxX, s.maxY);
    }
  }
  if (!Number.isFinite(minX) || maxX - minX <= 0) return null;
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}

function emptyStats(): SvgParseStats {
  return { wallCount: 0, doorCount: 0, windowCount: 0, roomCount: 0, textLabelCount: 0, ignoredMeasurementLinesCount: 0 };
}

const DOOR_TYPES: ReadonlySet<OpeningType> = new Set<OpeningType>(['door', 'double_door', 'sliding_door']);

function countStats(walls: Wall[], openings: Opening[], rooms: DetectedRoom[], useLabels: boolean, measurementLines: number): SvgParseStats {
  const doors = openings.filter(op => DOOR_TYPES.has(op.type)).length;
  return {
    wallCount: walls.length,
    doorCount: doors,
    windowCount: openings.length - doors,
    roomCount: rooms.length,
    textLabelCount: useLabels ? rooms.filter(r => r.fromLabel).length : 0,
    ignoredMeasurementLinesCount: measurementLines
  };
}

// ---------------------------------------------------------------------------------------------
// Façade
// ---------------------------------------------------------------------------------------------

/** Message (langue courante) d'une erreur inattendue pendant l'interprétation. */
function interpretationError(err: unknown): string {
  return localize('import.parser.failed', { detail: err instanceof Error ? err.message : String(err) });
}

function failedAnalysis(error: string): SvgAnalysis {
  return {
    success: false,
    error,
    viewBox: { x: 0, y: 0, width: 0, height: 0 },
    viewBoxSource: 'default',
    markup: '',
    layers: [],
    truncated: false,
    primitives: { segments: [], shapes: [], arcs: [], labels: [] }
  };
}

export class SvgPlanParser {
  /**
   * Étape 1 — lecture du document (une fois par fichier). Ne lève jamais : les erreurs XML ou de structure
   * sont renvoyées dans `error`.
   */
  public static analyze(svgContent: string): SvgAnalysis {
    try {
      const doc = new DOMParser().parseFromString(svgContent, 'image/svg+xml');
      const parserError = doc.getElementsByTagName('parsererror')[0];
      if (parserError) {
        const detail = (parserError.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 200);
        return failedAnalysis(detail ? localize('import.parser.invalid_svg_detail', { detail }) : localize('import.error.invalid_svg'));
      }
      const root = doc.documentElement;
      if (!root || localTag(root) !== 'svg') return failedAnalysis(localize('import.parser.no_root'));
      // Le serveur refuse les DOCTYPE (entités) : le navigateur les a déjà développées, on retire la déclaration.
      if (doc.doctype) doc.removeChild(doc.doctype);

      const vbAttr = parseViewBox(root.getAttribute('viewBox'));
      const width = absoluteLength(root.getAttribute('width'));
      const height = absoluteLength(root.getAttribute('height'));
      let viewBox: SvgBox | null = vbAttr;
      let source: SvgViewBoxSource = 'attribute';
      if (!viewBox && width && height) {
        viewBox = { x: 0, y: 0, width, height };
        source = 'size';
      }
      const extractor = new SvgExtractor(root);
      extractor.run(viewBox?.width ?? width ?? 1000, viewBox?.height ?? height ?? 750);
      if (!viewBox) {
        // width="100%" sans viewBox : le repère est l'emprise du contenu (et non 100 unités).
        const content = extractor.contentBounds();
        if (content) {
          const pad = Math.max(content.width, content.height) * 0.02;
          viewBox = { x: content.x - pad, y: content.y - pad, width: content.width + 2 * pad, height: content.height + 2 * pad };
          source = 'content';
        } else {
          viewBox = { x: 0, y: 0, width: width ?? 1000, height: height ?? 750 };
          source = 'default';
        }
      }
      if (source !== 'attribute') {
        const f = (v: number) => String(Math.round(v * 10000) / 10000);
        root.setAttribute('viewBox', `${f(viewBox.x)} ${f(viewBox.y)} ${f(viewBox.width)} ${f(viewBox.height)}`);
      }
      let markup = new XMLSerializer().serializeToString(root);
      if (!root.namespaceURI) markup = markup.replace(/^<svg\b/, `<svg xmlns="${SVG_NS}"`);

      const layers: SvgLayerInfo[] = extractor.layers
        .map((l, i) => ({ id: layerId(i), name: l.name, elementCount: l.count }))
        .filter(l => l.elementCount > 0);
      if (layers.length > 0 && extractor.rootCount > 0) {
        layers.unshift({ id: layerId(-1), name: localize('import.parser.outside_layers'), elementCount: extractor.rootCount });
      }
      return {
        success: true,
        viewBox,
        viewBoxSource: source,
        markup,
        layers,
        truncated: extractor.truncated,
        primitives: { segments: extractor.segments, shapes: extractor.shapes, arcs: extractor.arcs, labels: extractor.labels }
      };
    } catch (err) {
      return failedAnalysis(interpretationError(err));
    }
  }

  /**
   * Étape 2 — reconnaissance à l'échelle demandée : la largeur saisie s'applique à l'emprise des murs
   * détectés (épaisseur comprise), pas à toute la page.
   */
  public static detect(analysis: SvgAnalysis, options: SvgParseOptions = {}): SvgDetection {
    const base: SvgDetection = {
      success: false,
      error: analysis.error,
      viewBox: analysis.viewBox,
      metersPerUnit: 0,
      footprint: null,
      widthReference: 'viewBox',
      walls: [],
      openings: [],
      rooms: [],
      ignoredRooms: [],
      layers: analysis.layers,
      truncated: analysis.truncated,
      measurementLineCount: 0
    };
    if (!analysis.success) return base;
    try {
      const o = resolveOptions(options);
      const prims = filterPrimitives(analysis.primitives, o.excludedLayers);
      const vb = analysis.viewBox;
      const W = o.totalWidthMeters;

      // Échelle provisoire (emprise des traits candidats), affinée sur l'emprise des murs reconnus.
      let mpu = W / (candidateBounds(prims)?.width || vb.width);
      let built = buildWalls(prims, vb, mpu, o);
      const firstFootprint = footprintOf(built.walls);
      if (firstFootprint) {
        const refined = W / firstFootprint.width;
        if (Math.abs(refined - mpu) > TOL.scaleRetry * mpu) {
          mpu = refined;
          built = buildWalls(prims, vb, mpu, o);
        }
      }

      const live: LiveWall[] = built.walls.map(w => ({ ...w, alive: true, into: null }));
      const pending = detectOpenings(live, built.doorArcs, prims.segments, mpu);
      const alive = live.filter(w => w.alive);

      let reference: SvgWidthReference = 'viewBox';
      let refBox: SvgBox | null = footprintOf(alive);
      if (refBox) reference = 'walls';
      else {
        refBox = candidateBounds(prims);
        if (refBox) reference = 'content';
      }
      mpu = W / (refBox?.width || vb.width);
      if (!Number.isFinite(mpu) || mpu <= 0) throw new Error(localize('import.parser.invalid_scale'));

      const toWorld = (x: number, y: number): Point => ({ x: round2((x - vb.x) * mpu), y: round2((y - vb.y) * mpu) });
      const walls: Wall[] = [];
      const wallIds = new Map<LiveWall, Wall>();
      for (const w of alive) {
        const start = toWorld(w.ax, w.ay);
        const end = toWorld(w.bx, w.by);
        if (Math.hypot(end.x - start.x, end.y - start.y) < TOL.minWall) continue;
        // Épaisseur supposée convertie avec l'échelle provisoire : on retombe exactement sur la valeur par défaut.
        const thickM = w.thick * mpu;
        const thickness = !w.measured && Math.abs(thickM - o.defaultThickness) <= 0.1 * o.defaultThickness
          ? o.defaultThickness
          : Math.min(Math.max(TOL.pairMax, o.defaultThickness), Math.max(TOL.pairMin, round2(thickM)));
        const wall: Wall = {
          id: generateElementId('wall'),
          start,
          end,
          thickness,
          height: o.defaultHeight,
          type: 'standard'
        };
        walls.push(wall);
        wallIds.set(w, wall);
      }

      const openings: Opening[] = [];
      for (const p of pending) {
        const host = resolveWall(p.host);
        const wall = wallIds.get(host);
        if (!wall) continue;
        const len = lineLength(host);
        const ux = (host.bx - host.ax) / len, uy = (host.by - host.ay) / len;
        const wallLen = Math.hypot(wall.end.x - wall.start.x, wall.end.y - wall.start.y);
        const width = round2(p.width * mpu);
        if (width <= 0 || width > wallLen) continue;
        const offset = ((p.cx - host.ax) * ux + (p.cy - host.ay) * uy) * mpu;
        const opening: Opening = {
          id: generateElementId('op'),
          wallId: wall.id,
          type: p.type,
          offset: round2(Math.min(wallLen - width / 2, Math.max(width / 2, offset))),
          width,
          flipSide: false,
          flipDirection: false
        };
        if (p.hinge && p.openEnd) {
          // Rendu du canevas : charnière côté début (flipDirection = false) ou fin, vantail côté normale (+n) ou opposé.
          opening.flipDirection = (p.hinge.x - p.cx) * ux + (p.hinge.y - p.cy) * uy > 0;
          opening.flipSide = (p.openEnd.x - p.hinge.x) * -uy + (p.openEnd.y - p.hinge.y) * ux < 0;
        }
        openings.push(opening);
      }

      const { rooms, ignored } = detectRooms(prims, vb, mpu, o, alive, walls.length);
      const footprint = refBox ? { width: round2(refBox.width * mpu), height: round2(refBox.height * mpu) } : null;
      return {
        ...base,
        success: true,
        error: undefined,
        metersPerUnit: mpu,
        footprint,
        widthReference: reference,
        walls,
        openings,
        rooms,
        ignoredRooms: ignored,
        measurementLineCount: prims.segments.filter(s => s.role === 'measurement').length
      };
    } catch (err) {
      return { ...base, error: interpretationError(err) };
    }
  }

  /**
   * Étape 3 — filtres des cases à cocher. Une ouverture n'est conservée que si son mur l'est, et les
   * statistiques décrivent le résultat final (constat F157).
   */
  public static select(detection: SvgDetection, options: SvgParseOptions = {}): SvgParseResult {
    const importWalls = options.importWalls !== false;
    const importDoors = options.importDoors !== false;
    const importWindows = options.importWindows !== false;
    const importRooms = options.importRooms !== false;
    const importLabels = options.importLabels !== false;

    const walls = importWalls ? detection.walls : [];
    const wallIds = new Set(walls.map(w => w.id));
    const openings = detection.openings.filter(op =>
      wallIds.has(op.wallId) && (DOOR_TYPES.has(op.type) ? importDoors : importWindows)
    );
    const keptRooms = importRooms ? detection.rooms.filter(r => importLabels || !r.labelOnly) : [];
    const rooms = keptRooms.map(r => (importLabels ? r.named : r.generic));
    return {
      success: detection.success,
      walls,
      openings,
      rooms,
      viewBox: detection.viewBox,
      metersPerUnit: detection.metersPerUnit,
      footprint: detection.footprint,
      widthReference: detection.widthReference,
      stats: countStats(walls, openings, keptRooms, importLabels, detection.measurementLineCount),
      available: detection.success
        ? countStats(detection.walls, detection.openings, detection.rooms, true, detection.measurementLineCount)
        : emptyStats(),
      ignoredRooms: detection.ignoredRooms,
      layers: detection.layers,
      truncated: detection.truncated,
      error: detection.error
    };
  }

  /** Les trois étapes d'un coup (tests, import sans aperçu). */
  public static parseSvg(svgContent: string, options: SvgParseOptions = {}): SvgParseResult {
    return this.select(this.detect(this.analyze(svgContent), options), options);
  }
}

/**
 * Décode les octets d'un fichier SVG selon sa marque d'ordre (BOM) ou l'encodage déclaré dans l'en-tête
 * XML (« ISO-8859-1 », « windows-1252 »…), sinon en UTF-8, avec repli windows-1252 si l'UTF-8 est invalide.
 */
export function decodeSvgBytes(input: ArrayBuffer | Uint8Array): string {
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  if (bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) return new TextDecoder('utf-8').decode(bytes);
  if (bytes[0] === 0xff && bytes[1] === 0xfe) return new TextDecoder('utf-16le').decode(bytes);
  if (bytes[0] === 0xfe && bytes[1] === 0xff) return new TextDecoder('utf-16be').decode(bytes);
  let head = '';
  for (let i = 0; i < Math.min(bytes.length, 512); i++) head += String.fromCharCode(bytes[i]);
  const declared = /^\s*<\?xml[^>]*?\bencoding\s*=\s*["']([A-Za-z0-9._:-]+)["']/.exec(head);
  // Un en-tête « UTF-8 » est souvent écrit par défaut sur un fichier Latin-1 : l'UTF-8 déclaré passe par la
  // détection stricte ci-dessous (repli windows-1252) au lieu de produire des « � ».
  const label = declared?.[1].toLowerCase();
  if (label && label !== 'utf-8' && label !== 'utf8') {
    try {
      return new TextDecoder(label).decode(bytes);
    } catch {
      // Étiquette d'encodage inconnue du navigateur : détection ci-dessous.
    }
  }
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    return new TextDecoder('windows-1252').decode(bytes);
  }
}
