/**
 * Couleurs de la vue 3D (module pur, sans three) : lecture des couleurs CSS du projet et du thème
 * (couleur des pièces, des meubles, jetons --arch-*), mélanges et température de couleur des lampes.
 * Les composantes sont en sRGB 0–255, l'opacité de 0 à 1.
 */

export interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

function clampByte(v: number): number {
  return Math.min(255, Math.max(0, Math.round(v)));
}

function clampUnit(v: number): number {
  return Math.min(1, Math.max(0, v));
}

/** Composante rgb() : nombre (0–255) ou pourcentage. */
function channel(token: string): number | null {
  const pct = token.endsWith('%');
  const n = Number(pct ? token.slice(0, -1) : token);
  if (!Number.isFinite(n)) return null;
  return clampByte(pct ? (n / 100) * 255 : n);
}

/** Opacité : nombre (0–1) ou pourcentage. */
function alphaChannel(token: string | undefined): number | null {
  if (token === undefined) return 1;
  const pct = token.endsWith('%');
  const n = Number(pct ? token.slice(0, -1) : token);
  return Number.isFinite(n) ? clampUnit(pct ? n / 100 : n) : null;
}

function hueToRgb(p: number, q: number, t: number): number {
  let h = t;
  if (h < 0) h += 1;
  if (h > 1) h -= 1;
  if (h < 1 / 6) return p + (q - p) * 6 * h;
  if (h < 1 / 2) return q;
  if (h < 2 / 3) return p + (q - p) * (2 / 3 - h) * 6;
  return p;
}

/** Arguments d'une notation fonctionnelle (virgules ou espaces, opacité après « / »). */
function functionArgs(body: string): string[] {
  return body.replace(/\s*\/\s*/, ' / ').split(/[\s,]+/).filter(Boolean).filter(t => t !== '/');
}

/**
 * Couleur CSS → RGBA : #rgb, #rgba, #rrggbb, #rrggbbaa, rgb()/rgba() et hsl()/hsla() (virgules ou
 * espaces). Tout autre texte (nom de couleur, var(), color-mix()…) donne null : l'appelant choisit
 * alors sa couleur par défaut.
 */
export function parseCssColor(value: string | null | undefined): Rgba | null {
  if (typeof value !== 'string') return null;
  const text = value.trim().toLowerCase();
  if (text === '') return null;

  const hex = /^#([0-9a-f]{3,8})$/.exec(text);
  if (hex) {
    const h = hex[1];
    if (h.length === 3 || h.length === 4) {
      const [r, g, b, a] = [...h].map(c => parseInt(c + c, 16));
      return { r, g, b, a: h.length === 4 ? a / 255 : 1 };
    }
    if (h.length === 6 || h.length === 8) {
      const at = (i: number) => parseInt(h.slice(i, i + 2), 16);
      return { r: at(0), g: at(2), b: at(4), a: h.length === 8 ? at(6) / 255 : 1 };
    }
    return null;
  }

  const fn = /^(rgba?|hsla?)\(([^()]*)\)$/.exec(text);
  if (!fn) return null;
  const args = functionArgs(fn[2]);
  if (args.length !== 3 && args.length !== 4) return null;
  const a = alphaChannel(args[3]);
  if (a === null) return null;
  if (fn[1].startsWith('rgb')) {
    const [r, g, b] = args.slice(0, 3).map(channel);
    return r === null || g === null || b === null ? null : { r, g, b, a };
  }
  const h = Number(args[0].replace(/deg$/, ''));
  const s = Number(args[1].replace(/%$/, '')) / 100;
  const l = Number(args[2].replace(/%$/, '')) / 100;
  if (![h, s, l].every(Number.isFinite)) return null;
  const hue = (((h % 360) + 360) % 360) / 360;
  const sat = clampUnit(s);
  const lig = clampUnit(l);
  if (sat === 0) {
    const v = clampByte(lig * 255);
    return { r: v, g: v, b: v, a };
  }
  const q = lig < 0.5 ? lig * (1 + sat) : lig + sat - lig * sat;
  const p = 2 * lig - q;
  return {
    r: clampByte(hueToRgb(p, q, hue + 1 / 3) * 255),
    g: clampByte(hueToRgb(p, q, hue) * 255),
    b: clampByte(hueToRgb(p, q, hue - 1 / 3) * 255),
    a
  };
}

export function rgba(r: number, g: number, b: number, a = 1): Rgba {
  return { r: clampByte(r), g: clampByte(g), b: clampByte(b), a: clampUnit(a) };
}

/** Mélange de `from` vers `to` (t = 0 : from, t = 1 : to), opacité de `from` conservée. */
export function mixRgb(from: Rgba, to: Rgba, t: number): Rgba {
  const k = clampUnit(t);
  return {
    r: clampByte(from.r + (to.r - from.r) * k),
    g: clampByte(from.g + (to.g - from.g) * k),
    b: clampByte(from.b + (to.b - from.b) * k),
    a: from.a
  };
}

/** Couleur multipliée (assombrie si k < 1, éclaircie au plus jusqu'au blanc si k > 1). */
export function scaleRgb(c: Rgba, k: number): Rgba {
  return { r: clampByte(c.r * k), g: clampByte(c.g * k), b: clampByte(c.b * k), a: c.a };
}

/**
 * Couleur d'une source blanche de température `kelvin` (approximation de Tanner Helland, 1000–40000 K) :
 * teinte des lampes réglées en blanc chaud ou froid (color_temp_kelvin).
 */
export function kelvinToRgb(kelvin: number): Rgba {
  const t = Math.min(40000, Math.max(1000, kelvin)) / 100;
  const r = t <= 66 ? 255 : 329.698727446 * Math.pow(t - 60, -0.1332047592);
  const g = t <= 66 ? 99.4708025861 * Math.log(t) - 161.1195681661 : 288.1221695283 * Math.pow(t - 60, -0.0755148492);
  const b = t >= 66 ? 255 : t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  return rgba(r, g, b);
}
