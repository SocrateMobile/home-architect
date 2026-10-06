import { CanvasTexture, RepeatWrapping, SRGBColorSpace, Texture } from 'three';

/**
 * Générateur de textures architecturales procédurales pour la vue 3D.
 *
 * Inspiré de Sweet Home 3D : génère en mémoire vive des textures HD ultra-légères
 * (parquet à lames avec chanfreins, carrelage grand format avec joints, mosaïque,
 * béton ciré marbré, terrasse en bois et gazon naturel) sans aucune requête réseau,
 * sans fichier image externe et avec 0 ko de surcoût réseau.
 */

export type FloorTextureType =
  | 'parquet'
  | 'tile'
  | 'mosaic'
  | 'concrete'
  | 'deck'
  | 'grass'
  | 'carpet'
  | 'none';

/** Cache des textures pour éviter de redessiner les canevas */
const TEXTURE_CACHE = new Map<FloorTextureType, Texture | null>();

/**
 * Détecte intelligemment la texture de sol la plus appropriée
 * selon le nom de la pièce ou son icône MDI.
 */
export function detectFloorTexture(room: { name?: string; icon?: string; color?: string }): FloorTextureType {
  const text = `${room.name ?? ''} ${room.icon ?? ''}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (/bain|sdb|douche|shower|wc|toilet|eau|lavabo/.test(text)) return 'mosaic';
  if (/cuis|kitchen|buanderie|cellier/.test(text)) return 'tile';
  if (/terrasse|balcon|deck|patio/.test(text)) return 'deck';
  if (/jardin|garden|pelouse|exterieur|cour/.test(text)) return 'grass';
  if (/garage|atelier|cave|sous-sol|parking/.test(text)) return 'concrete';
  if (/chambre|bed|dressing/.test(text)) return 'parquet';
  if (/salon|sejour|living|manger|dining|bureau|office|entree|couloir|hall/.test(text)) return 'parquet';

  return 'parquet';
}

function createCanvas(): HTMLCanvasElement | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  return canvas;
}

/**
 * 1. Parquet en chêne naturel avec lames décalées et chanfreins réalistes
 * Répétition : 1m x 1m dans le monde réel (6 lames de 16,6 cm de large).
 */
function drawParquet(ctx: CanvasRenderingContext2D): void {
  const w = 512;
  const h = 512;
  const plankCount = 6;
  const plankHeight = h / plankCount;

  // Teintes de base chaudes (bois de chêne)
  const tones = ['#d8b88d', '#d0ad80', '#e0c29a', '#c8a474', '#dab689', '#cfab7d'];

  ctx.fillStyle = '#b88d58';
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < plankCount; i++) {
    const y = i * plankHeight;
    ctx.fillStyle = tones[i % tones.length];
    ctx.fillRect(0, y, w, plankHeight);

    // Grain fin de bois longitudinal
    ctx.fillStyle = 'rgba(120, 80, 40, 0.08)';
    for (let g = 0; g < 6; g++) {
      const gy = y + (g / 6) * plankHeight + ((i * 3 + g) % 7);
      ctx.fillRect(0, gy, w, 1.5);
    }

    // Joints en bout de lame (décalés d'une rangée sur l'autre)
    ctx.fillStyle = 'rgba(70, 40, 20, 0.6)';
    const split1 = ((i * 179 + 80) % (w - 120)) + 60;
    ctx.fillRect(split1, y, 2.5, plankHeight);

    // Chanfrein sombre entre les lames horizontales
    ctx.fillStyle = 'rgba(70, 40, 20, 0.55)';
    ctx.fillRect(0, y + plankHeight - 2, w, 2);

    // Petit biseau éclairé sur le haut de la lame
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(0, y, w, 1);
  }
}

/**
 * 2. Carrelage contemporain grand format (dalles 60x60 cm à joints fins)
 * Répétition : 1.2m x 1.2m (grille 2x2).
 */
function drawTile(ctx: CanvasRenderingContext2D): void {
  const w = 512;
  const h = 512;
  const half = w / 2;

  // Dalles en pierre claire / grès cérame
  ctx.fillStyle = '#bbb6ad'; // Couleur des joints
  ctx.fillRect(0, 0, w, h);

  const tiles = [
    { x: 2, y: 2, tone: '#e6e3dd' },
    { x: half + 2, y: 2, tone: '#dfdcd6' },
    { x: 2, y: half + 2, tone: '#e2dfd9' },
    { x: half + 2, y: half + 2, tone: '#e5e1db' }
  ];

  const tileSize = half - 4;
  for (const t of tiles) {
    ctx.fillStyle = t.tone;
    ctx.fillRect(t.x, t.y, tileSize, tileSize);

    // Micro-nuances minérales
    ctx.fillStyle = 'rgba(0, 0, 0, 0.025)';
    for (let d = 0; d < 8; d++) {
      const rx = t.x + ((d * 37) % tileSize);
      const ry = t.y + ((d * 43) % tileSize);
      ctx.beginPath();
      ctx.arc(rx, ry, 16 + (d % 10), 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

/**
 * 3. Mosaïque carrée / faïence salle de bain (petits carreaux 10x10 cm)
 * Répétition : 0.8m x 0.8m (grille 8x8).
 */
function drawMosaic(ctx: CanvasRenderingContext2D): void {
  const w = 512;
  const h = 512;
  const count = 8;
  const size = w / count;

  ctx.fillStyle = '#d4d8de'; // Joint clair
  ctx.fillRect(0, 0, w, h);

  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const shade = 240 + ((x * 13 + y * 7) % 12);
      ctx.fillStyle = `rgb(${shade}, ${shade + 2}, ${shade + 5})`;
      ctx.fillRect(x * size + 2, y * size + 2, size - 4, size - 4);

      // Reflet discret
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fillRect(x * size + 3, y * size + 3, size - 6, 2);
    }
  }
}

/**
 * 4. Béton ciré / dalle industrielle lisse
 * Répétition : 2m x 2m.
 */
function drawConcrete(ctx: CanvasRenderingContext2D): void {
  const w = 512;
  const h = 512;

  ctx.fillStyle = '#cfd3d8';
  ctx.fillRect(0, 0, w, h);

  // Nuances douces et marbrures minérales
  for (let i = 0; i < 16; i++) {
    const cx = (i * 97) % w;
    const cy = (i * 71) % h;
    const r = 40 + (i % 5) * 25;
    const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, r);
    const alpha = i % 2 === 0 ? 0.06 : 0.04;
    const col = i % 2 === 0 ? '0, 0, 0' : '255, 255, 255';
    grad.addColorStop(0, `rgba(${col}, ${alpha})`);
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * 5. Terrasse extérieure en bois / teck à lames espacées
 * Répétition : 1m x 1m (8 lames de terrasse).
 */
function drawDeck(ctx: CanvasRenderingContext2D): void {
  const w = 512;
  const h = 512;
  const count = 8;
  const slatHeight = h / count;

  ctx.fillStyle = '#2d1c0e'; // Espaces sombres entre les lames
  ctx.fillRect(0, 0, w, h);

  const woodTones = ['#a27043', '#966439', '#aa794c', '#8e5e34'];

  for (let i = 0; i < count; i++) {
    const y = i * slatHeight;
    ctx.fillStyle = woodTones[i % woodTones.length];
    ctx.fillRect(0, y, w, slatHeight - 4);

    // Veinage doux
    ctx.fillStyle = 'rgba(50, 25, 5, 0.1)';
    ctx.fillRect(0, y + slatHeight * 0.3, w, 2);
    ctx.fillRect(0, y + slatHeight * 0.65, w, 1.5);
  }
}

/**
 * 6. Gazon naturel / pelouse extérieure
 * Répétition : 1m x 1m.
 */
function drawGrass(ctx: CanvasRenderingContext2D): void {
  const w = 512;
  const h = 512;

  ctx.fillStyle = '#548f38';
  ctx.fillRect(0, 0, w, h);

  // Semis de brins d'herbe et variations de vert naturel
  const greens = ['#62a443', '#497e2f', '#70b54e', '#3e6c27'];
  for (let i = 0; i < 240; i++) {
    const gx = (i * 61) % w;
    const gy = (i * 47) % h;
    ctx.fillStyle = greens[i % greens.length];
    ctx.fillRect(gx, gy, 3, 5);
  }
}

/**
 * 7. Moquette douce / tapis tissé
 * Répétition : 1m x 1m.
 */
function drawCarpet(ctx: CanvasRenderingContext2D): void {
  const w = 512;
  const h = 512;

  ctx.fillStyle = '#d5d2cc';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
  for (let x = 0; x < w; x += 4) {
    ctx.fillRect(x, 0, 2, h);
  }
  for (let y = 0; y < h; y += 4) {
    ctx.fillRect(0, y, w, 2);
  }
}

/**
 * Renvoie une texture Three.js répétable et mise à l'échelle pour le type de sol donné.
 */
export function getFloorTexture(type: FloorTextureType): Texture | null {
  if (type === 'none') return null;
  if (TEXTURE_CACHE.has(type)) {
    return TEXTURE_CACHE.get(type) ?? null;
  }

  const canvas = createCanvas();
  if (!canvas) {
    TEXTURE_CACHE.set(type, null);
    return null;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    TEXTURE_CACHE.set(type, null);
    return null;
  }

  let repeatScaleX: number;
  let repeatScaleY: number;

  switch (type) {
    case 'parquet':
      drawParquet(ctx);
      repeatScaleX = 1;
      repeatScaleY = 1;
      break;
    case 'tile':
      drawTile(ctx);
      repeatScaleX = 1 / 1.2;
      repeatScaleY = 1 / 1.2;
      break;
    case 'mosaic':
      drawMosaic(ctx);
      repeatScaleX = 1 / 0.8;
      repeatScaleY = 1 / 0.8;
      break;
    case 'concrete':
      drawConcrete(ctx);
      repeatScaleX = 0.5;
      repeatScaleY = 0.5;
      break;
    case 'deck':
      drawDeck(ctx);
      repeatScaleX = 1;
      repeatScaleY = 1;
      break;
    case 'grass':
      drawGrass(ctx);
      repeatScaleX = 1;
      repeatScaleY = 1;
      break;
    case 'carpet':
      drawCarpet(ctx);
      repeatScaleX = 1;
      repeatScaleY = 1;
      break;
    default:
      TEXTURE_CACHE.set(type, null);
      return null;
  }

  const texture = new CanvasTexture(canvas);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(repeatScaleX, repeatScaleY);
  texture.colorSpace = SRGBColorSpace;

  TEXTURE_CACHE.set(type, texture);
  return texture;
}

/** Libère les textures en cache lors de la destruction de la vue 3D */
export function disposeFloorTextures(): void {
  for (const tex of TEXTURE_CACHE.values()) {
    if (tex) tex.dispose();
  }
  TEXTURE_CACHE.clear();
}
