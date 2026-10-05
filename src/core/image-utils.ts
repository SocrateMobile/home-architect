/** Côté maximal (px) d'une image de fond après compression. */
export const MAX_BACKGROUND_SIDE = 2500;

/** Taille maximale (octets) d'un fichier de fond téléversé ; le backend applique la même limite. */
export const MAX_UPLOAD_BYTES = 12 * 1024 * 1024;

/** Formats raster acceptés tels quels par le backend (un original plus léger peut être renvoyé sans réencodage). */
const SERVER_RASTER_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif']);
/** Une image PNG transparente n'est conservée en PNG que sous cette taille. */
const MAX_TRANSPARENT_PNG_BYTES = 2 * 1024 * 1024;
const DEFAULT_QUALITY = 0.85;
/** Délai avant révocation de l'URL d'un téléchargement (Safari iOS et certaines WebView lisent l'URL après click()). */
const DOWNLOAD_URL_TTL_MS = 60_000;

interface DecodedImage {
  source: CanvasImageSource;
  width: number;
  height: number;
  release: () => void;
}

function loadHtmlImage(blob: Blob): Promise<DecodedImage> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      resolve({
        source: img,
        width: img.naturalWidth,
        height: img.naturalHeight,
        release: () => URL.revokeObjectURL(url),
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Image illisible ou format non pris en charge.'));
    };
    img.src = url;
  });
}

/** Décode une image (createImageBitmap si possible, sinon <img>). L'appelant doit appeler release(). */
async function decodeImage(blob: Blob): Promise<DecodedImage> {
  if (typeof createImageBitmap === 'function' && blob.type !== 'image/svg+xml') {
    try {
      const bitmap = await createImageBitmap(blob);
      return { source: bitmap, width: bitmap.width, height: bitmap.height, release: () => bitmap.close() };
    } catch {
      // Format non géré par createImageBitmap dans ce navigateur : repli sur <img>.
    }
  }
  return loadHtmlImage(blob);
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob | null> {
  return new Promise(resolve => {
    try {
      canvas.toBlob(blob => resolve(blob), type, quality);
    } catch {
      resolve(null);
    }
  });
}

/** Vrai si au moins un pixel n'est pas totalement opaque. */
function hasTransparency(ctx: CanvasRenderingContext2D, width: number, height: number): boolean {
  const data = ctx.getImageData(0, 0, width, height).data;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 255) return true;
  }
  return false;
}

/**
 * Compresse une image raster de fond : redimensionnée pour que son plus grand côté ne dépasse pas
 * `maxSide` (jamais agrandie), encodée en WebP si le navigateur le permet, sinon en JPEG.
 * Une image transparente reste en PNG si elle fait moins de 2 Mo. Si l'image n'a pas à être
 * réduite et que le résultat serait plus lourd, l'original est renvoyé tel quel (s'il est dans un
 * format accepté par le serveur : PNG, JPEG, WebP ou GIF).
 */
export async function compressRasterImage(
  input: Blob,
  opts: { maxSide?: number; quality?: number } = {}
): Promise<{ blob: Blob; width: number; height: number; mimeType: string }> {
  if (input.type === 'image/svg+xml') {
    throw new Error('Les images SVG ne sont pas compressées : elles sont téléversées telles quelles.');
  }
  const maxSide = opts.maxSide && opts.maxSide > 0 ? opts.maxSide : MAX_BACKGROUND_SIDE;
  const quality = opts.quality && opts.quality > 0 && opts.quality <= 1 ? opts.quality : DEFAULT_QUALITY;

  const decoded = await decodeImage(input);
  const canvas = document.createElement('canvas');
  try {
    if (!decoded.width || !decoded.height) throw new Error('Image vide ou dimensions inconnues.');
    const ratio = Math.min(1, maxSide / Math.max(decoded.width, decoded.height));
    const width = Math.max(1, Math.round(decoded.width * ratio));
    const height = Math.max(1, Math.round(decoded.height * ratio));
    const resized = ratio < 1;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D indisponible dans ce navigateur.');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(decoded.source, 0, 0, width, height);

    const transparent = input.type !== 'image/jpeg' && hasTransparency(ctx, width, height);

    let output: Blob | null = null;
    if (transparent) {
      const png = await canvasToBlob(canvas, 'image/png');
      if (png && png.size < MAX_TRANSPARENT_PNG_BYTES) output = png;
    }
    if (!output) {
      const webp = await canvasToBlob(canvas, 'image/webp', quality);
      // Un navigateur qui ne sait pas encoder le WebP renvoie du PNG : on le détecte par le type.
      if (webp && webp.type === 'image/webp') output = webp;
    }
    if (!output) {
      if (transparent) {
        // Le JPEG n'a pas de canal alpha : on aplatit sur fond blanc plutôt que noir.
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over';
      }
      output = await canvasToBlob(canvas, 'image/jpeg', quality);
    }
    if (!output) throw new Error("Impossible d'encoder l'image.");

    if (!resized && output.size >= input.size && SERVER_RASTER_TYPES.has(input.type)) {
      return { blob: input, width: decoded.width, height: decoded.height, mimeType: input.type };
    }
    return { blob: output, width, height, mimeType: output.type };
  } finally {
    decoded.release();
    // Libère immédiatement la mémoire du canvas (important sur Safari iOS).
    canvas.width = 0;
    canvas.height = 0;
  }
}

/** Dimensions intrinsèques (px) d'une image raster ou SVG. */
export async function readImageSize(blob: Blob): Promise<{ width: number; height: number }> {
  const decoded = await decodeImage(blob);
  try {
    return { width: decoded.width, height: decoded.height };
  } finally {
    decoded.release();
  }
}

/** Convertit un Blob en data-URL (base64). */
export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
      else reject(new Error('Lecture du fichier impossible.'));
    };
    reader.onerror = () => reject(reader.error ?? new Error('Lecture du fichier impossible.'));
    reader.readAsDataURL(blob);
  });
}

/** Convertit une data-URL (base64 ou texte encodé) en Blob ; lève une erreur si le format est invalide. */
export function dataUrlToBlob(dataUrl: string): Blob {
  const match = /^data:([^,]*),/i.exec(dataUrl);
  if (!match) throw new Error('Data-URL invalide.');
  const meta = match[1];
  const payload = dataUrl.slice(match[0].length);
  const isBase64 = /;base64$/i.test(meta);
  const mimeType = (meta.split(';')[0] || 'application/octet-stream').toLowerCase();
  if (!isBase64) {
    return new Blob([decodeURIComponent(payload)], { type: mimeType });
  }
  const binary = atob(payload.replace(/\s+/g, ''));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mimeType });
}

/** Lit un fichier texte (UTF-8) ; la promesse est rejetée explicitement en cas d'erreur de lecture. */
export function readFileAsText(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
      else reject(new Error('Lecture du fichier impossible.'));
    };
    reader.onerror = () => reject(reader.error ?? new Error('Lecture du fichier impossible.'));
    reader.readAsText(file);
  });
}

/** Déclenche le téléchargement d'un Blob ; l'URL objet est révoquée après un délai (et non juste après click()). */
export function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), DOWNLOAD_URL_TTL_MS);
}
