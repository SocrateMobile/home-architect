import { ExportFrame, HomeArchitectProject, Opening, Point, Wall } from './types';
import { PolygonUtils } from './polygon';
import { furnitureBounds, furnitureSymbolMarkup } from './furniture-catalog';
import { EntityStates, bindingDisplayName } from './project-model';

export interface SvgExportOptions {
  includeRooms?: boolean;
  includeWalls?: boolean;
  includeOpenings?: boolean;
  includeRoomLabels?: boolean;
  includeEntityMarkers?: boolean;
  includeFurniture?: boolean;
  includeBackground?: boolean;
  /**
   * Image de fond à embarquer, en data-URL base64 (png, jpeg, webp, gif ou svg+xml) : l'appelant
   * la résout depuis l'asset du projet. À défaut, seule une data-URL déjà présente dans
   * background.imageUrl est utilisée. Une URL http(s) n'est jamais référencée : un SVG affiché
   * dans <img> (picture-elements) ne charge aucune ressource externe.
   */
  backgroundDataUrl?: string;
  backgroundColor?: string;
  /** Cadre d'export (mètres) ; à défaut project.exportFrame, sinon le cadre calculé sur le contenu. */
  frame?: ExportFrame;
  /** Marge (mètres) du cadre calculé quand aucun cadre n'est figé. */
  paddingMeters?: number;
  /** États HA (`hass.states`) pour nommer les marqueurs d'entités (friendly_name courant). */
  states?: EntityStates;
}

export interface ProjectBoundingBox {
  minX: number;
  minY: number;
  width: number;
  height: number;
  ppm: number;
}

/** Couleur de fond par défaut du plan exporté. */
export const DEFAULT_EXPORT_BACKGROUND = '#0f172a';

const DEFAULT_PIXELS_PER_METER = 50;
/** Côté minimal (mètres) d'un cadre d'export : évite un viewBox dégénéré pour un plan minuscule. */
const MIN_FRAME_SIZE = 2;
/** Cadre par défaut d'un plan vide (mètres). */
const EMPTY_FRAME: ExportFrame = { minX: -1, minY: -1, maxX: 11, maxY: 7 };
/**
 * Échelle de référence (px/m) des symboles du catalogue (celle du canevas au zoom 1 par défaut) : le
 * symbole y est dessiné puis mis à l'échelle du plan, pour que ses traits suivent pixelsPerMeter.
 */
const SYMBOL_REFERENCE_PPM = 50;
/** Deux extrémités de murs plus proches que cette distance (mètres) forment une jonction. */
const JOINT_EPSILON = 1e-3;
/** Au-delà de MITER_LIMIT demi-épaisseurs, l'onglet est remplacé par une extrémité droite (angles très aigus). */
const MITER_LIMIT = 4;

/**
 * Tailles de rendu exprimées en MÈTRES (converties en unités SVG via pixelsPerMeter) : le texte et
 * les traits gardent la même taille relative au plan quel que soit l'étalonnage.
 */
const SIZE = {
  roomStroke: 0.03,
  wallOutline: 0.02,          // contour visible des murs (le trait réel fait le double, à moitié recouvert)
  cutoutOverlap: 0.03,        // débord de la découpe d'ouverture sur le contour du mur
  jamb: 0.08,
  doorLeaf: 0.04,
  doorArc: 0.024,
  doorDash: 0.06,
  windowFrame: 0.05,
  windowGlass: 0.03,
  windowSash: 0.02,
  windowMullion: 0.05,
  slidingPanel: 0.06,
  labelName: 0.26,
  labelArea: 0.22,
  labelGap: 0.12,
  labelHalo: 0.05,
  markerRadius: 0.32,
  markerStroke: 0.03,
  markerIcon: 0.26,
  markerLabel: 0.2,
} as const;

const COLORS = {
  roomFill: 'rgba(56, 189, 248, 0.12)',
  roomStroke: 'rgba(56, 189, 248, 0.4)',
  wallFill: '#334155',
  wallStroke: '#64748b',
  jamb: '#94a3b8',
  frame: '#94a3b8',
  accent: '#38bdf8',
  accentFaint: 'rgba(56, 189, 248, 0.45)',
  doorSwing: 'rgba(56, 189, 248, 0.08)',
  labelName: '#f8fafc',
  markerFill: 'rgba(30, 41, 59, 0.85)',
  markerLabel: '#f1f5f9',
} as const;

const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const MONO_FONT_FAMILY = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/** Couleur CSS acceptée telle quelle dans un attribut (#hex, rgb()/hsl(), nom) ; rien qui puisse sortir de l'attribut. */
const SAFE_COLOR = /^(?:#[0-9a-f]{3,8}|(?:rgb|rgba|hsl|hsla)\([0-9\s.,%+-]{1,60}\)|[a-z]{3,24})$/i;
/** Data-URL d'image embarquable : base64 uniquement (format exigé par l'assainisseur du serveur). */
const EMBEDDABLE_DATA_URL = /^data:image\/(?:png|jpe?g|webp|gif|svg\+xml)(?:;[a-z0-9=._+-]+)*;base64,[a-z0-9+/=\s]+$/i;
/**
 * Paire de surrogates valide (conservée) OU caractère interdit en XML 1.0 (contrôle, surrogate
 * isolé, U+FFFE/U+FFFF). Sans lookbehind : ce module est aussi chargé par la carte (Safari < 16.4).
 */
// eslint-disable-next-line no-control-regex -- exclusion volontaire des caractères de contrôle
const XML_INVALID_CHARS = /[\uD800-\uDBFF][\uDC00-\uDFFF]|[\x00-\x08\x0B\x0C\x0E-\x1F\uD800-\uDFFF\uFFFE\uFFFF]/g;

/** Retire les caractères interdits en XML 1.0 (un seul suffit à rendre le document entier invalide). */
function stripInvalidXmlChars(value: string): string {
  return value.replace(XML_INVALID_CHARS, c => (c.length === 2 ? c : ''));
}

/** Échappe une valeur pour un nœud texte OU un attribut XML, et retire les caractères interdits en XML. */
export function escapeXml(value: string): string {
  return stripInvalidXmlChars(String(value)).replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      default: return '&quot;';
    }
  });
}

/** Nombre formaté pour un attribut SVG (2 décimales au plus) ; 0 si la valeur n'est pas finie. */
function fmt(value: number): string {
  if (!Number.isFinite(value)) return '0';
  const rounded = Math.round(value * 100) / 100;
  return String(rounded === 0 ? 0 : rounded);
}

function safeColor(value: string | undefined, fallback: string): string {
  const v = typeof value === 'string' ? value.trim() : '';
  return v && SAFE_COLOR.test(v) ? v : fallback;
}

interface WallEnd {
  dir: Point;    // vecteur unitaire partant de la jonction le long du mur
  half: number;  // demi-épaisseur
  length: number;
  angle: number;
}

interface EndCorners {
  left: Point;   // côté gauche de `dir` (normale (-dir.y, dir.x))
  right: Point;
  joined: boolean;
  /** Onglet refusé côté gauche : coin droit du mur voisin, qui ferme le biseau. */
  bevel?: Point;
}

function cross(a: Point, b: Point): number {
  return a.x * b.y - a.y * b.x;
}

function offsetPoint(p: Point, n: Point, d: number): Point {
  return { x: p.x + n.x * d, y: p.y + n.y * d };
}

/**
 * Coin commun entre le côté gauche de `a` et le côté droit de `b` (secteur angulaire allant de `a`
 * à `b`), ou null si les murs sont parallèles ou si l'onglet serait démesuré (angle très aigu).
 */
function miterCorner(joint: Point, a: WallEnd, b: WallEnd): Point | null {
  const nLeftA = { x: -a.dir.y, y: a.dir.x };
  const nRightB = { x: b.dir.y, y: -b.dir.x };
  const denom = cross(a.dir, b.dir);
  if (Math.abs(denom) < 1e-6) return null;
  const pa = offsetPoint(joint, nLeftA, a.half);
  const pb = offsetPoint(joint, nRightB, b.half);
  const r = { x: pb.x - pa.x, y: pb.y - pa.y };
  const t = cross(r, b.dir) / denom;
  const s = cross(r, a.dir) / denom;
  if (t >= a.length || s >= b.length) return null; // le coin dépasserait l'autre extrémité d'un des murs
  const corner = { x: pa.x + a.dir.x * t, y: pa.y + a.dir.y * t };
  const reach = Math.hypot(corner.x - joint.x, corner.y - joint.y);
  return reach <= MITER_LIMIT * Math.max(a.half, b.half) ? corner : null;
}

function plainCorner(joint: Point, e: WallEnd, side: 1 | -1): Point {
  return offsetPoint(joint, { x: -e.dir.y * side, y: e.dir.x * side }, e.half);
}

/**
 * Contours des murs avec jonctions en onglet aux extrémités partagées, et biseau quand l'onglet est
 * refusé (angle très aigu, murs parallèles d'épaisseurs différentes, mur trop court). Chaque contour
 * est orienté dans le même sens ; une jonction de 2 murs ou plus inclut son centre pour que l'union
 * des contours la recouvre sans encoche. Renvoie une entrée par mur de longueur non nulle (clé : wall.id).
 */
export function computeWallPolygons(walls: readonly Wall[]): Map<string, Point[]> {
  const joints: Array<{ point: Point; ends: WallEnd[] }> = [];
  const jointOf = (p: Point) => {
    let joint = joints.find(j => Math.hypot(j.point.x - p.x, j.point.y - p.y) <= JOINT_EPSILON);
    if (!joint) {
      joint = { point: p, ends: [] };
      joints.push(joint);
    }
    return joint;
  };

  const endsByWall = new Map<string, { start: WallEnd; end: WallEnd; startJoint: Point; endJoint: Point }>();
  for (const wall of walls) {
    const dx = wall.end.x - wall.start.x;
    const dy = wall.end.y - wall.start.y;
    const length = Math.hypot(dx, dy);
    if (!(length > JOINT_EPSILON) || !Number.isFinite(length)) continue;
    const half = Math.max(0, Number.isFinite(wall.thickness) ? wall.thickness : 0) / 2;
    const dir = { x: dx / length, y: dy / length };
    const back = { x: -dir.x, y: -dir.y };
    const start: WallEnd = { dir, half, length, angle: Math.atan2(dir.y, dir.x) };
    const end: WallEnd = { dir: back, half, length, angle: Math.atan2(back.y, back.x) };
    const startJoint = jointOf(wall.start);
    const endJoint = jointOf(wall.end);
    startJoint.ends.push(start);
    endJoint.ends.push(end);
    endsByWall.set(wall.id, { start, end, startJoint: startJoint.point, endJoint: endJoint.point });
  }

  const corners = new Map<WallEnd, EndCorners>();
  for (const joint of joints) {
    const ends = [...joint.ends].sort((a, b) => a.angle - b.angle);
    const n = ends.length;
    ends.forEach((e, i) => {
      if (n < 2) {
        corners.set(e, { left: plainCorner(joint.point, e, 1), right: plainCorner(joint.point, e, -1), joined: false });
        return;
      }
      // Secteur gauche (vers le mur suivant) : possédé par ce mur, qui porte le biseau s'il y a lieu.
      const next = ends[(i + 1) % n];
      const prev = ends[(i - 1 + n) % n];
      const leftMiter = miterCorner(joint.point, e, next);
      const corner: EndCorners = {
        left: leftMiter ?? plainCorner(joint.point, e, 1),
        right: miterCorner(joint.point, prev, e) ?? plainCorner(joint.point, e, -1),
        joined: true,
      };
      if (!leftMiter) corner.bevel = plainCorner(joint.point, next, -1);
      corners.set(e, corner);
    });
  }

  const result = new Map<string, Point[]>();
  for (const [wallId, info] of endsByWall) {
    const s = corners.get(info.start)!;
    const e = corners.get(info.end)!;
    // Parcours de chaque extrémité : coin droit -> centre de jonction -> (biseau) -> coin gauche.
    // À l'extrémité « end », la direction locale est inversée : sa gauche est la droite du mur.
    const polygon: Point[] = [s.left, e.right];
    if (e.joined) polygon.push(info.endJoint);
    if (e.bevel) polygon.push(e.bevel);
    polygon.push(e.left, s.right);
    if (s.joined) polygon.push(info.startJoint);
    if (s.bevel) polygon.push(s.bevel);
    if (signedArea(polygon) < 0) polygon.reverse();
    result.set(wallId, polygon);
  }
  return result;
}

function signedArea(polygon: Point[]): number {
  let area = 0;
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i];
    const b = polygon[(i + 1) % polygon.length];
    area += a.x * b.y - b.x * a.y;
  }
  return area / 2;
}

function isValidFrame(frame: ExportFrame | undefined | null): frame is ExportFrame {
  return !!frame
    && [frame.minX, frame.minY, frame.maxX, frame.maxY].every(Number.isFinite)
    && frame.maxX > frame.minX
    && frame.maxY > frame.minY;
}

/** Agrandit un intervalle autour de son centre pour qu'il mesure au moins `min`. */
function ensureMinSpan(lo: number, hi: number, min: number): [number, number] {
  const span = hi - lo;
  if (span >= min) return [lo, hi];
  const center = (lo + hi) / 2;
  return [center - min / 2, center + min / 2];
}

/** Repère local d'une ouverture : centre sur le mur, direction du mur et normale. */
function openingFrame(op: Opening, wall: Wall): { center: Point; dir: Point; normal: Point; angleDeg: number } | null {
  const dx = wall.end.x - wall.start.x;
  const dy = wall.end.y - wall.start.y;
  const len = Math.hypot(dx, dy);
  if (!(len > 0)) return null;
  const dir = { x: dx / len, y: dy / len };
  return {
    center: { x: wall.start.x + dir.x * op.offset, y: wall.start.y + dir.y * op.offset },
    dir,
    normal: { x: -dir.y, y: dir.x },
    angleDeg: (Math.atan2(dy, dx) * 180) / Math.PI,
  };
}

function isDoorType(type: string): boolean {
  return type === 'door' || type === 'double_door';
}

export class SvgExporter {
  /**
   * Cadre (mètres) englobant tout le contenu du plan : murs avec leur épaisseur, pièces, entités,
   * meubles (emprise pivotée), débattement des portes et image de fond visible, plus une marge.
   * Le cadre mesure au moins 2 m de côté (agrandi de façon centrée).
   */
  public static computeContentFrame(project: HomeArchitectProject, paddingMeters?: number): ExportFrame {
    const bounds = this.contentBounds(project);
    if (!bounds) return { ...EMPTY_FRAME };
    const span = Math.max(bounds.maxX - bounds.minX, bounds.maxY - bounds.minY);
    const padding = paddingMeters !== undefined && Number.isFinite(paddingMeters) && paddingMeters >= 0
      ? paddingMeters
      : Math.max(0.6, span * 0.05);
    const [x0, x1] = ensureMinSpan(bounds.minX - padding, bounds.maxX + padding, MIN_FRAME_SIZE);
    const [y0, y1] = ensureMinSpan(bounds.minY - padding, bounds.maxY + padding, MIN_FRAME_SIZE);
    return { minX: x0, minY: y0, maxX: x1, maxY: y1 };
  }

  /** Enveloppe exacte du contenu (sans marge ni taille minimale), null pour un plan vide. */
  public static contentBounds(project: HomeArchitectProject): ExportFrame | null {
    const pts = this.collectContentPoints(project);
    if (pts.length === 0) return null;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of pts) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
    return { minX, minY, maxX, maxY };
  }

  /** Cadre d'export effectif : cadre explicite, sinon cadre figé du projet, sinon cadre calculé sur le contenu. */
  public static resolveExportFrame(project: HomeArchitectProject, frame?: ExportFrame | null, paddingMeters?: number): ExportFrame {
    if (isValidFrame(frame)) return { ...frame };
    if (isValidFrame(project.exportFrame)) return { ...project.exportFrame };
    return this.computeContentFrame(project, paddingMeters);
  }

  /** Vrai si `inner` est entièrement contenu dans `outer` (tolérance d'un millimètre). */
  public static frameContains(outer: ExportFrame, inner: ExportFrame): boolean {
    const tol = 1e-3;
    return inner.minX >= outer.minX - tol && inner.minY >= outer.minY - tol
      && inner.maxX <= outer.maxX + tol && inner.maxY <= outer.maxY + tol;
  }

  /**
   * Boîte englobante du contenu (compatibilité : utilisée par le canevas pour « ajuster à l'écran »).
   */
  public static calculateBoundingBox(project: HomeArchitectProject, customPadding?: number): ProjectBoundingBox {
    const frame = this.computeContentFrame(project, customPadding);
    return {
      minX: frame.minX,
      minY: frame.minY,
      width: frame.maxX - frame.minX,
      height: frame.maxY - frame.minY,
      ppm: this.unitsPerMeter(project),
    };
  }

  /**
   * Position d'un point monde en pourcentage (0 à 100 %) du cadre d'export, avec la même référence
   * que le viewBox du SVG exporté sur ce cadre (positions des éléments picture-elements).
   */
  public static worldToPercentage(point: Point, frame: ExportFrame): { left: number; top: number } {
    const left = ((point.x - frame.minX) / (frame.maxX - frame.minX)) * 100;
    const top = ((point.y - frame.minY) / (frame.maxY - frame.minY)) * 100;
    return {
      left: Number.isFinite(left) ? Math.round(left * 100) / 100 : 0,
      top: Number.isFinite(top) ? Math.round(top * 100) / 100 : 0,
    };
  }

  /** Unités SVG par mètre (= pixelsPerMeter du projet, 50 par défaut). */
  public static unitsPerMeter(project: HomeArchitectProject): number {
    const ppm = project.pixelsPerMeter;
    return Number.isFinite(ppm) && ppm > 0 ? ppm : DEFAULT_PIXELS_PER_METER;
  }

  /** Data-URL de fond embarquable (base64, type image accepté par le serveur), sinon null. */
  public static embeddableDataUrl(value: string | undefined | null): string | null {
    return typeof value === 'string' && EMBEDDABLE_DATA_URL.test(value) ? value : null;
  }

  /**
   * Génère un document SVG autonome représentant le plan, cadré sur `frame` (ou le cadre figé du
   * projet). Toutes les valeurs injectées sont validées ou échappées.
   */
  public static exportToSvg(project: HomeArchitectProject, options?: SvgExportOptions): string {
    const opts: SvgExportOptions = {
      includeRooms: true,
      includeWalls: true,
      includeOpenings: true,
      includeFurniture: true,
      includeRoomLabels: true,
      includeEntityMarkers: false,
      includeBackground: true,
      backgroundColor: DEFAULT_EXPORT_BACKGROUND,
      ...options
    };

    const u = this.unitsPerMeter(project);
    const m = (meters: number) => fmt(meters * u);
    const frame = this.resolveExportFrame(project, opts.frame, opts.paddingMeters);
    const vbX = m(frame.minX);
    const vbY = m(frame.minY);
    const vbW = m(frame.maxX - frame.minX);
    const vbH = m(frame.maxY - frame.minY);
    const bgColor = safeColor(opts.backgroundColor, DEFAULT_EXPORT_BACKGROUND);
    const cutoutFill = bgColor === 'transparent' ? DEFAULT_EXPORT_BACKGROUND : bgColor;
    const walls = project.walls || [];
    const rooms = project.rooms || [];
    const openings = project.openings || [];
    const furniture = project.furniture || [];
    const bindings = project.bindings || [];

    let content = '';

    // 1. Fond de couleur
    if (bgColor !== 'transparent') {
      content += `  <rect id="background" x="${vbX}" y="${vbY}" width="${vbW}" height="${vbH}" fill="${bgColor}" />\n`;
    }

    // 2. Image de fond (data-URL embarquée uniquement)
    const bg = project.background;
    const bgHref = opts.includeBackground !== false && bg?.visible
      ? this.embeddableDataUrl(opts.backgroundDataUrl) ?? this.embeddableDataUrl(bg.imageUrl)
      : null;
    if (bg && bgHref) {
      // Même placement que le canevas : l'image (widthPx × heightPx) est à l'échelle `scale` du plan.
      const scale = Number.isFinite(bg.scale) && bg.scale > 0 ? bg.scale : 1;
      const off = bg.offset || { x: 0, y: 0 };
      const opacity = Number.isFinite(bg.opacity) ? Math.min(1, Math.max(0, bg.opacity)) : 0.6;
      content += `  <image id="background-image" href="${escapeXml(bgHref)}" x="${m(off.x)}" y="${m(off.y)}" width="${fmt((bg.widthPx || 1200) * scale)}" height="${fmt((bg.heightPx || 900) * scale)}" opacity="${fmt(opacity)}" />\n`;
    }

    // 3. Pièces
    if (opts.includeRooms && rooms.length > 0) {
      content += `  <g id="rooms" stroke="${COLORS.roomStroke}" stroke-width="${m(SIZE.roomStroke)}">\n`;
      for (const room of rooms) {
        if (!room.polygon || room.polygon.length < 3) continue;
        const ptsAttr = room.polygon.map(p => `${m(p.x)},${m(p.y)}`).join(' ');
        content += `    <polygon points="${ptsAttr}" fill="${safeColor(room.color, COLORS.roomFill)}" />\n`;
      }
      content += `  </g>\n`;
    }

    // 4. Meubles : même symbole que le canevas (catalogue), dessiné à l'échelle de référence puis
    //    mis à l'échelle du plan, rotation quelconque comprise.
    if (opts.includeFurniture !== false && furniture.length > 0) {
      const symbolScale = String(Math.round((u / SYMBOL_REFERENCE_PPM) * 1e4) / 1e4);
      content += `  <g id="furniture">\n`;
      for (const item of furniture) {
        if (!item.position) continue;
        const rotation = Number.isFinite(item.rotation) ? item.rotation : 0;
        // Balisage déjà échappé par le catalogue ; l'icône d'un meuble inconnu peut toutefois
        // contenir un caractère de contrôle, qui rendrait le XML invalide (refus du serveur).
        const symbol = stripInvalidXmlChars(furnitureSymbolMarkup(item, { pixelsPerMeter: SYMBOL_REFERENCE_PPM }));
        content += `    <g transform="translate(${m(item.position.x)}, ${m(item.position.y)}) rotate(${fmt(rotation)}) scale(${symbolScale})">${symbol}</g>\n`;
      }
      content += `  </g>\n`;
    }

    // 5. Murs : jonctions en onglet ; contour tracé puis recouvert par le remplissage pour
    //    masquer les arêtes intérieures (recouvrements aux jonctions en T).
    if (opts.includeWalls && walls.length > 0) {
      const polygons = computeWallPolygons(walls);
      const d = [...polygons.values()]
        .map(poly => `M${poly.map(p => `${m(p.x)} ${m(p.y)}`).join(' L')} Z`)
        .join(' ');
      if (d) {
        content += `  <g id="walls">\n`;
        content += `    <path d="${d}" fill="${COLORS.wallStroke}" stroke="${COLORS.wallStroke}" stroke-width="${m(SIZE.wallOutline * 2)}" stroke-linejoin="round" />\n`;
        content += `    <path d="${d}" fill="${COLORS.wallFill}" />\n`;
        content += `  </g>\n`;
      }
    }

    // 6. Portes et fenêtres (chaque OpeningType est traité explicitement)
    if (opts.includeOpenings && openings.length > 0) {
      content += `  <g id="openings">\n`;
      for (const op of openings) {
        const wall = walls.find(w => w.id === op.wallId);
        if (!wall) continue;
        const local = openingFrame(op, wall);
        if (!local) continue;
        content += `    <g transform="translate(${m(local.center.x)}, ${m(local.center.y)}) rotate(${fmt(local.angleDeg)})">\n`;
        content += this.renderOpening(op, wall, u, cutoutFill);
        content += `    </g>\n`;
      }
      content += `  </g>\n`;
    }

    // 7. Étiquettes des pièces (au-dessus des meubles pour rester lisibles)
    if (opts.includeRoomLabels && rooms.length > 0) {
      // Halo de la couleur du fond (comme la découpe des ouvertures) pour détacher le texte des traits.
      content += `  <g id="room-labels" text-anchor="middle" stroke="${cutoutFill}" stroke-width="${m(SIZE.labelHalo)}" stroke-linejoin="round" paint-order="stroke">\n`;
      for (const room of rooms) {
        if (!room.polygon || room.polygon.length < 3) continue;
        // Toujours à l'intérieur de la pièce, même concave (pièce en L, en U…).
        const c = PolygonUtils.labelPoint(room.polygon);
        const area = Number.isFinite(room.areaM2) ? room.areaM2 : PolygonUtils.computeArea(room.polygon);
        content += `    <g transform="translate(${m(c.x)}, ${m(c.y)})">\n`;
        content += `      <text y="${m(-SIZE.labelGap / 2)}" fill="${COLORS.labelName}" font-size="${m(SIZE.labelName)}" font-weight="700">${escapeXml(room.name || '')}</text>\n`;
        content += `      <text y="${m(SIZE.labelGap / 2 + SIZE.labelArea)}" fill="${COLORS.accent}" font-size="${m(SIZE.labelArea)}" font-weight="600" font-family="${MONO_FONT_FAMILY}">${area.toFixed(1)} m²</text>\n`;
        content += `    </g>\n`;
      }
      content += `  </g>\n`;
    }

    // 8. Marqueurs d'entités (optionnels)
    if (opts.includeEntityMarkers && bindings.length > 0) {
      content += `  <g id="entity-markers" text-anchor="middle">\n`;
      for (const b of bindings) {
        if (!b.position) continue;
        const label = bindingDisplayName(b, opts.states);
        content += `    <g transform="translate(${m(b.position.x)}, ${m(b.position.y)})">\n`;
        content += `      <circle r="${m(SIZE.markerRadius)}" fill="${COLORS.markerFill}" stroke="${COLORS.accent}" stroke-width="${m(SIZE.markerStroke)}" />\n`;
        content += `      <text y="${m(SIZE.markerIcon * 0.35)}" font-size="${m(SIZE.markerIcon)}">${escapeXml(b.icon || '⚡')}</text>\n`;
        content += `      <text y="${m(SIZE.markerRadius + SIZE.markerLabel * 1.1)}" fill="${COLORS.markerLabel}" font-size="${m(SIZE.markerLabel)}" font-weight="600">${escapeXml(label)}</text>\n`;
        content += `    </g>\n`;
      }
      content += `  </g>\n`;
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vbX} ${vbY} ${vbW} ${vbH}" width="${vbW}" height="${vbH}" font-family="${escapeXml(FONT_FAMILY)}">
  <title>${escapeXml(project.name || 'Home Architect')}</title>
${content}</svg>`;
  }

  /** Symbole d'une ouverture dans son repère local (origine au centre, axe X le long du mur). */
  private static renderOpening(op: Opening, wall: Wall, u: number, cutoutFill: string): string {
    const m = (meters: number) => fmt(meters * u);
    const w = op.width;
    const half = w / 2;
    const t = wall.thickness;
    const ht = t / 2;
    const pad = '      ';
    let out = `${pad}<rect x="${m(-half)}" y="${m(-ht - SIZE.cutoutOverlap)}" width="${m(w)}" height="${m(t + SIZE.cutoutOverlap * 2)}" fill="${cutoutFill}" />\n`;

    const frameRect = `${pad}<rect x="${m(-half)}" y="${m(-ht)}" width="${m(w)}" height="${m(t)}" fill="none" stroke="${COLORS.frame}" stroke-width="${m(SIZE.windowFrame)}" />\n`;
    const jambs = () => {
      const jw = Math.min(SIZE.jamb, w / 4);
      return `${pad}<rect x="${m(-half)}" y="${m(-ht)}" width="${m(jw)}" height="${m(t)}" fill="${COLORS.jamb}" />\n`
        + `${pad}<rect x="${m(half - jw)}" y="${m(-ht)}" width="${m(jw)}" height="${m(t)}" fill="${COLORS.jamb}" />\n`;
    };
    const side = op.flipSide ? -1 : 1;
    // Battant pivotant en (pivotX, 0) : fermé vers `toward` (±1), ouvert perpendiculairement côté `side`.
    const leaf = (pivotX: number, toward: number, length: number) => {
      const sweep = toward * side > 0 ? 1 : 0;
      return `${pad}<line x1="${m(pivotX)}" y1="0" x2="${m(pivotX)}" y2="${m(side * length)}" stroke="${COLORS.accent}" stroke-width="${m(SIZE.doorLeaf)}" stroke-linecap="round" />\n`
        + `${pad}<path d="M ${m(pivotX + toward * length)} 0 A ${m(length)} ${m(length)} 0 0 ${sweep} ${m(pivotX)} ${m(side * length)}" fill="${COLORS.doorSwing}" stroke="${COLORS.accent}" stroke-width="${m(SIZE.doorArc)}" stroke-dasharray="${m(SIZE.doorDash)} ${m(SIZE.doorDash)}" />\n`;
    };

    switch (op.type) {
      case 'door': {
        const pivotX = op.flipDirection ? half : -half;
        out += jambs() + leaf(pivotX, op.flipDirection ? -1 : 1, w);
        break;
      }
      case 'double_door':
        out += jambs() + leaf(-half, 1, half) + leaf(half, -1, half);
        break;
      case 'sliding_door': {
        // Deux panneaux coulissants qui se recouvrent au centre
        const panel = w * 0.55;
        out += frameRect
          + `${pad}<rect x="${m(-half)}" y="${m(-t / 4 - SIZE.slidingPanel / 2)}" width="${m(panel)}" height="${m(SIZE.slidingPanel)}" fill="${COLORS.accent}" />\n`
          + `${pad}<rect x="${m(half - panel)}" y="${m(t / 4 - SIZE.slidingPanel / 2)}" width="${m(panel)}" height="${m(SIZE.slidingPanel)}" fill="${COLORS.accent}" />\n`;
        break;
      }
      case 'french_window':
        out += frameRect
          + `${pad}<rect x="${m(-half)}" y="${m(-t / 4)}" width="${m(half)}" height="${m(SIZE.slidingPanel)}" fill="${COLORS.accent}" />\n`
          + `${pad}<rect x="0" y="${m(t / 4)}" width="${m(half)}" height="${m(SIZE.slidingPanel)}" fill="${COLORS.accent}" />\n`;
        break;
      case 'window':
      default: {
        // Même règle que le canevas : sashCount explicite, sinon 2 battants à partir de 1,25 m.
        const sashes = op.sashCount || (w >= 1.25 ? 2 : 1);
        const inset = Math.min(SIZE.jamb, w / 4);
        out += frameRect
          + `${pad}<line x1="${m(-half)}" y1="0" x2="${m(half)}" y2="0" stroke="${COLORS.accent}" stroke-width="${m(SIZE.windowGlass)}" />\n`;
        if (sashes === 2) {
          out += `${pad}<line x1="0" y1="${m(-ht)}" x2="0" y2="${m(ht)}" stroke="${COLORS.accent}" stroke-width="${m(SIZE.windowMullion)}" />\n`
            + `${pad}<line x1="${m(-half + inset)}" y1="${m(-t / 4)}" x2="${m(-inset / 2)}" y2="${m(-t / 4)}" stroke="${COLORS.accentFaint}" stroke-width="${m(SIZE.windowSash)}" />\n`
            + `${pad}<line x1="${m(inset / 2)}" y1="${m(t / 4)}" x2="${m(half - inset)}" y2="${m(t / 4)}" stroke="${COLORS.accentFaint}" stroke-width="${m(SIZE.windowSash)}" />\n`;
        } else {
          out += `${pad}<line x1="${m(-half + inset)}" y1="${m(-t / 4)}" x2="${m(half - inset)}" y2="${m(-t / 4)}" stroke="${COLORS.accentFaint}" stroke-width="${m(SIZE.windowSash)}" />\n`
            + `${pad}<line x1="${m(-half + inset)}" y1="${m(t / 4)}" x2="${m(half - inset)}" y2="${m(t / 4)}" stroke="${COLORS.accentFaint}" stroke-width="${m(SIZE.windowSash)}" />\n`;
        }
        break;
      }
    }
    return out;
  }

  /** Points (monde) dont l'enveloppe délimite le contenu du plan. */
  private static collectContentPoints(project: HomeArchitectProject): Point[] {
    const pts: Point[] = [];
    const walls = project.walls || [];

    // Murs, épaisseur comprise
    for (const poly of computeWallPolygons(walls).values()) pts.push(...poly);

    for (const r of project.rooms || []) {
      if (r.polygon && r.polygon.length > 0) pts.push(...r.polygon);
    }

    for (const b of project.bindings || []) {
      if (b.position) pts.push(b.position);
    }

    // Meubles : emprise du symbole pivoté (décors débordants compris)
    for (const f of project.furniture || []) {
      if (!f.position) continue;
      const b = furnitureBounds(f);
      pts.push({ x: b.minX, y: b.minY }, { x: b.maxX, y: b.maxY });
    }

    // Débattement des portes (carré balayé par chaque battant)
    for (const op of project.openings || []) {
      if (!isDoorType(op.type)) continue;
      const wall = walls.find(w => w.id === op.wallId);
      const local = wall ? openingFrame(op, wall) : null;
      if (!local) continue;
      const side = op.flipSide ? -1 : 1;
      const half = op.width / 2;
      for (const along of [-half, half]) {
        const base = { x: local.center.x + local.dir.x * along, y: local.center.y + local.dir.y * along };
        const reach = op.type === 'door' ? op.width : half;
        pts.push(base, offsetPoint(base, local.normal, side * reach));
      }
    }

    // Image de fond visible
    const bg = project.background;
    if (bg && bg.visible && (bg.imageUrl || bg.assetId)) {
      const ppm = this.unitsPerMeter(project);
      const off = bg.offset || { x: 0, y: 0 };
      const scale = Number.isFinite(bg.scale) && bg.scale > 0 ? bg.scale : 1;
      pts.push(
        { x: off.x, y: off.y },
        { x: off.x + ((bg.widthPx || 1200) * scale) / ppm, y: off.y + ((bg.heightPx || 900) * scale) / ppm }
      );
    }

    return pts.filter(p => Number.isFinite(p.x) && Number.isFinite(p.y));
  }
}
