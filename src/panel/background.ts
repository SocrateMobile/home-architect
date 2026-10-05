/**
 * Image de fond du studio hors du JSON du projet (constat F1).
 *
 * Les images sont téléversées par HTTP (uploadBackground) et le projet ne garde qu'une référence
 * `background.assetId`. Ce module prépare les images (SVG sans DOCTYPE, raster recompressé),
 * convertit les data-URL héritées avant la sauvegarde et résout l'URL affichable du fond actif.
 */
import { BackgroundPlan, HomeArchitectProject } from '../core/types';
import {
  HaApiError, PayloadTooLargeError, fetchBackgroundObjectUrl, releaseBackgroundObjectUrl, uploadBackground
} from '../core/ha-api';
import { compressRasterImage, dataUrlToBlob } from '../core/image-utils';

const SVG_MIME = 'image/svg+xml';

/** Image de fond fournie par la modale d'import (`import-confirmed`, SPEC §6), déjà compressée. */
export interface ImportedBackground {
  blob: Blob;
  mimeType: string;
  widthPx: number;
  heightPx: number;
  isSvg: boolean;
}

/** Le serveur refuse l'image (format invalide, illisible ou trop lourde) : réessayer ne sert à rien. */
export class BackgroundRejectedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BackgroundRejectedError';
  }
}

function errorText(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

/** Vrai si l'URL est une data-URL (image embarquée dans le projet, à téléverser). */
export function isInlineDataUrl(url: string | undefined | null): url is string {
  return typeof url === 'string' && /^data:/i.test(url);
}

/**
 * Retire le DOCTYPE (et tout prologue) d'un SVG en ne ré-sérialisant que l'élément racine.
 * Le backend refuse les DOCTYPE à sous-ensemble interne (entités) : on ne lui envoie jamais de DOCTYPE.
 */
export function stripSvgDoctype(svgText: string): string {
  const doc = new DOMParser().parseFromString(svgText, SVG_MIME);
  const root = doc.documentElement;
  if (!root || root.localName !== 'svg' || doc.getElementsByTagName('parsererror').length > 0) {
    throw new Error('Fichier SVG invalide.');
  }
  return new XMLSerializer().serializeToString(root);
}

/** SVG prêt à téléverser (sans DOCTYPE). */
export async function svgWithoutDoctype(blob: Blob): Promise<Blob> {
  return new Blob([stripSvgDoctype(await blob.text())], { type: SVG_MIME });
}

/**
 * Prépare une image brute (collée, déposée, data-URL héritée) pour le téléversement :
 * SVG sans DOCTYPE, image raster redimensionnée et recompressée (côté max 2500 px).
 * Lève BackgroundRejectedError si l'image est illisible.
 */
export async function prepareBackgroundBlob(blob: Blob): Promise<{ blob: Blob; width?: number; height?: number }> {
  try {
    if (blob.type === SVG_MIME) return { blob: await svgWithoutDoctype(blob) };
    const compressed = await compressRasterImage(blob);
    return { blob: compressed.blob, width: compressed.width, height: compressed.height };
  } catch (err) {
    throw new BackgroundRejectedError(`Image de fond illisible : ${errorText(err)}`);
  }
}

/** Téléverse une image prête ; un refus définitif du serveur devient BackgroundRejectedError. */
export async function uploadPreparedBackground(
  hass: any,
  projectId: string,
  blob: Blob
): Promise<{ assetId: string; mimeType: string }> {
  try {
    const res = await uploadBackground(hass, projectId, blob);
    return { assetId: res.assetId, mimeType: res.mimeType };
  } catch (err) {
    if (err instanceof PayloadTooLargeError) throw new BackgroundRejectedError(err.message);
    if (err instanceof HaApiError && (err.code === 'invalid_image' || err.code === 'unsupported_media_type')) {
      throw new BackgroundRejectedError(`Image de fond refusée par le serveur : ${err.message}`);
    }
    throw err;
  }
}

/**
 * Téléverse la data-URL de fond héritée d'un projet (ancien schéma, brouillon, import hors ligne)
 * et renvoie le fond qui la remplace (`assetId`, `imageUrl` vide), ou null s'il n'y a rien à faire.
 * Les dimensions d'affichage (widthPx/heightPx) sont conservées : l'image recompressée occupe la
 * même surface et reste alignée sur les murs.
 */
export async function uploadInlineBackground(hass: any, project: HomeArchitectProject): Promise<BackgroundPlan | null> {
  const bg = project.background;
  if (!bg || !isInlineDataUrl(bg.imageUrl)) return null;
  let source: Blob;
  try {
    source = dataUrlToBlob(bg.imageUrl);
  } catch (err) {
    throw new BackgroundRejectedError(`Image de fond illisible : ${errorText(err)}`);
  }
  const prepared = await prepareBackgroundBlob(source);
  const res = await uploadPreparedBackground(hass, project.id, prepared.blob);
  return { ...bg, imageUrl: '', assetId: res.assetId, mimeType: res.mimeType };
}

/**
 * URL affichable de l'image de fond du projet actif (propriété `.backgroundSrc` du canevas et de
 * l'export) : URL objet d'un asset téléchargé avec authentification, ou URL externe / data-URL héritée.
 * Détient au plus une référence sur le cache partagé des URL objet (fetchBackgroundObjectUrl).
 */
export class BackgroundSource {
  /** URL à afficher (undefined pendant le téléchargement ou sans fond). */
  src: string | undefined;
  /** Asset dont une référence est détenue. */
  private heldAssetId: string | null = null;
  /** Asset dont le téléchargement a échoué : pas de nouvel essai tant qu'il ne change pas. */
  private failedAssetId: string | null = null;
  private token = 0;

  constructor(private readonly onChange: () => void) {}

  /** Aligne l'URL sur le fond du projet ; sans effet si rien n'a changé. */
  sync(hass: any, project: HomeArchitectProject | null): void {
    const bg = project?.background;
    const assetId = bg?.assetId ?? null;
    if (!assetId || !project) {
      this.dropHeld();
      this.failedAssetId = null;
      this.setSrc(bg?.imageUrl || undefined);
      return;
    }
    if (assetId === this.heldAssetId || assetId === this.failedAssetId || !hass) return;
    this.dropHeld();
    this.failedAssetId = null;
    this.setSrc(undefined);
    this.heldAssetId = assetId;
    const token = this.token;
    fetchBackgroundObjectUrl(hass, project.id, assetId).then(
      url => {
        if (token === this.token) this.setSrc(url);
      },
      err => {
        if (token !== this.token) return;
        // L'entrée en échec est retirée du cache par ha-api : aucune référence à libérer.
        this.heldAssetId = null;
        this.failedAssetId = assetId;
        console.warn(`[home-architect] Image de fond ${assetId} indisponible :`, err);
        this.setSrc(undefined);
      }
    );
  }

  /** URL objet actuellement affichée pour cet asset (blob encore lisible), sinon undefined. */
  objectUrlFor(assetId: string): string | undefined {
    return this.heldAssetId === assetId ? this.src : undefined;
  }

  /** Libère la référence détenue (déconnexion du panneau) ; le prochain sync la reprendra. */
  release(): void {
    this.dropHeld();
    this.failedAssetId = null;
    this.setSrc(undefined);
  }

  /** Abandonne le téléchargement en cours et la référence détenue, sans toucher à `src`. */
  private dropHeld(): void {
    if (!this.heldAssetId) return;
    this.token++;
    releaseBackgroundObjectUrl(this.heldAssetId);
    this.heldAssetId = null;
  }

  private setSrc(src: string | undefined): void {
    if (src === this.src) return;
    this.src = src;
    this.onChange();
  }
}
