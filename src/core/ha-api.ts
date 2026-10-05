/**
 * Client typé du backend Home Architect (WebSocket + vues HTTP).
 * Toutes les fonctions prennent l'objet `hass` en premier argument et rejettent avec
 * une HaApiError (ou une sous-classe) dont `code` reprend le code d'erreur du backend.
 */
import { HomeArchitectProject, PublishInfo } from './types';
import {
  ASSET_ID_PATTERN, MAX_INLINE_DATA_URL_BYTES, MAX_PROJECT_BYTES, MAX_PUBLISH_BYTES, PROJECT_ID_PATTERN,
  estimateJsonBytes, legacyCategory, normalizeProject, normalizePublishInfo, stripServerFields
} from './project-model';
import { MAX_UPLOAD_BYTES } from './image-utils';

/** Résumé léger d'un projet (commande list_projects). */
export interface ProjectSummary {
  id: string;
  name: string;
  category?: string;
  created_at?: string;
  updated_at?: string;
  revision: number;
  has_background: boolean;
  publish?: PublishInfo | null;
  counts: { walls: number; rooms: number; bindings: number; furniture: number };
}

/** Erreur renvoyée par le backend (ou détectée avant l'envoi) ; `code` = code d'erreur WS/HTTP. */
export class HaApiError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = 'HaApiError';
    this.code = code;
  }
}

/** Le projet a été modifié ailleurs depuis son chargement (code 'conflict'). */
export class ConflictError extends HaApiError {
  /** Révision actuelle côté serveur, si le backend l'a fournie. */
  serverRevision?: number;

  constructor(message: string, serverRevision?: number) {
    super('conflict', message);
    this.name = 'ConflictError';
    this.serverRevision = serverRevision;
  }
}

/** Action réservée aux administrateurs (code 'unauthorized'). */
export class PermissionDeniedError extends HaApiError {
  constructor(message: string) {
    super('unauthorized', message);
    this.name = 'PermissionDeniedError';
  }
}

/** Charge utile trop volumineuse (code 'payload_too_large') ; `bytes` vaut 0 si la taille est inconnue. */
export class PayloadTooLargeError extends HaApiError {
  bytes: number;
  limit: number;

  constructor(message: string, bytes: number, limit: number) {
    super('payload_too_large', message);
    this.name = 'PayloadTooLargeError';
    this.bytes = bytes;
    this.limit = limit;
  }
}

/** Informations de mise à jour (commande check_updates). */
export interface UpdateStatus {
  installed_version: string;
  latest_version: string | null;
  update_available: boolean;
  skipped_version: string | null;
  release_url: string | null;
  release_notes: string;
  update_entity_id: string | null;
}

type Rec = Record<string, unknown>;

/** Contexte de taille utilisé quand le serveur répond payload_too_large. */
interface SizeContext {
  bytes: number;
  limit: number;
}

/** Code d'erreur de home-assistant-js-websocket quand la connexion est perdue pendant la commande. */
const ERR_CONNECTION_LOST = 3;
const LEGACY_PREFIX = 'home_architect_';
/** Clés localStorage du préfixe qui ne sont pas des projets. */
const NON_PROJECT_KEYS = new Set(['home_architect_toolbar_pos']);

function isRecord(v: unknown): v is Rec {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function optionalString(v: unknown): string | undefined {
  return typeof v === 'string' && v !== '' ? v : undefined;
}

function nonNegativeInt(v: unknown): number | undefined {
  return typeof v === 'number' && Number.isInteger(v) && v >= 0 ? v : undefined;
}

function formatMiB(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

/**
 * Convertit une erreur quelconque (rejet de hass.callWS `{code, message}`, rejet « connexion perdue »
 * `{error: {code, message}}`, Error JS) en HaApiError typée.
 */
export function toHaApiError(err: unknown, size?: SizeContext): HaApiError {
  if (err instanceof HaApiError) return err;
  const raw: Rec | null = isRecord(err) ? (isRecord(err.error) ? err.error : err) : null;
  const rawCode = raw?.code;
  let code: string;
  if (typeof rawCode === 'string' && rawCode !== '') code = rawCode;
  else if (rawCode === ERR_CONNECTION_LOST) code = 'connection_lost';
  else if (typeof rawCode === 'number') code = `error_${rawCode}`;
  else code = 'unknown_error';

  const message = typeof raw?.message === 'string' && raw.message !== ''
    ? raw.message
    : err instanceof Error ? err.message : String(err);

  switch (code) {
    case 'conflict': {
      const match = /conflict:(\d+)/.exec(message);
      const serverRevision = match ? Number(match[1]) : undefined;
      return new ConflictError(
        serverRevision === undefined
          ? 'Le plan a été modifié ailleurs depuis son ouverture.'
          : `Le plan a été modifié ailleurs depuis son ouverture (révision serveur ${serverRevision}).`,
        serverRevision
      );
    }
    case 'unauthorized':
      return new PermissionDeniedError('Action réservée aux administrateurs Home Assistant.');
    case 'payload_too_large': {
      // Le backend précise la taille : "payload_too_large:<octets>:<limite>".
      const match = /payload_too_large:(\d+):(\d+)/.exec(message);
      const bytes = match ? Number(match[1]) : size?.bytes ?? 0;
      const limit = match ? Number(match[2]) : size?.limit ?? 0;
      return new PayloadTooLargeError(
        limit > 0 ? `Données trop volumineuses pour le serveur (${formatMiB(bytes)}, maximum ${formatMiB(limit)}).` : 'Données trop volumineuses pour le serveur.',
        bytes,
        limit
      );
    }
    default:
      return new HaApiError(code, message);
  }
}

async function ws<T = unknown>(hass: any, msg: Rec, size?: SizeContext): Promise<T> {
  if (!hass || typeof hass.callWS !== 'function') {
    throw new HaApiError('not_connected', 'Connexion à Home Assistant indisponible.');
  }
  try {
    return await hass.callWS(msg);
  } catch (err) {
    throw toHaApiError(err, size);
  }
}

function assertProjectId(projectId: string): void {
  if (typeof projectId !== 'string' || !PROJECT_ID_PATTERN.test(projectId)) {
    throw new HaApiError('invalid_project_id', `Identifiant de projet invalide : ${String(projectId)}`);
  }
}

function assertAssetId(assetId: string): void {
  if (typeof assetId !== 'string' || !ASSET_ID_PATTERN.test(assetId)) {
    throw new HaApiError('invalid_asset_id', `Identifiant d'image invalide : ${String(assetId)}`);
  }
}

async function authFetch(hass: any, path: string, init?: RequestInit): Promise<Response> {
  if (!hass || typeof hass.fetchWithAuth !== 'function') {
    throw new HaApiError('not_connected', 'Connexion à Home Assistant indisponible.');
  }
  try {
    return await hass.fetchWithAuth(path, init);
  } catch (err) {
    throw new HaApiError('network_error', err instanceof Error ? err.message : String(err));
  }
}

function httpError(status: number, size?: SizeContext): HaApiError {
  switch (status) {
    case 401:
    case 403:
      return new PermissionDeniedError('Action réservée aux administrateurs Home Assistant.');
    case 404:
      return new HaApiError('not_found', 'Ressource introuvable sur le serveur.');
    case 413:
      return new PayloadTooLargeError('Fichier trop volumineux pour le serveur.', size?.bytes ?? 0, size?.limit ?? 0);
    case 415:
      return new HaApiError('unsupported_media_type', "Format d'image non pris en charge.");
    case 400:
      return new HaApiError('invalid_image', 'Image invalide ou corrompue.');
    case 503:
      return new HaApiError('not_ready', "Home Architect n'est pas encore chargé sur le serveur.");
    default:
      return new HaApiError('http_error', `Erreur HTTP ${status}.`);
  }
}

function toSummary(raw: unknown): ProjectSummary | null {
  if (!isRecord(raw) || typeof raw.id !== 'string' || !PROJECT_ID_PATTERN.test(raw.id)) return null;
  const counts = isRecord(raw.counts) ? raw.counts : {};
  const count = (v: unknown) => nonNegativeInt(v) ?? 0;
  return {
    id: raw.id,
    name: typeof raw.name === 'string' && raw.name !== '' ? raw.name : raw.id,
    // Même règle que normalizeProject : un ancien projet 'rdc', 'etage1'… sans catégorie est rangé dans son niveau.
    category: optionalString(raw.category) ?? legacyCategory(raw.id),
    created_at: optionalString(raw.created_at),
    updated_at: optionalString(raw.updated_at),
    revision: nonNegativeInt(raw.revision) ?? 0,
    has_background: raw.has_background === true,
    publish: normalizePublishInfo(raw.publish) ?? null,
    counts: {
      walls: count(counts.walls),
      rooms: count(counts.rooms),
      bindings: count(counts.bindings),
      furniture: count(counts.furniture),
    },
  };
}

function summarize(p: HomeArchitectProject): ProjectSummary {
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    created_at: p.created_at,
    updated_at: p.updated_at,
    revision: p.revision ?? 0,
    has_background: !!(p.background && (p.background.assetId || p.background.imageUrl)),
    publish: p.publish ?? null,
    counts: {
      walls: p.walls.length,
      rooms: p.rooms.length,
      bindings: p.bindings.length,
      furniture: (p.furniture ?? []).length,
    },
  };
}

/**
 * Projets complets via l'ancienne commande get_projects : uniquement quand le backend n'a pas
 * encore été redémarré après une mise à jour (nouveau frontend servi, ancien code Python chargé).
 */
async function legacyGetProjects(hass: any): Promise<HomeArchitectProject[]> {
  const res = await ws<Rec>(hass, { type: 'home_architect/get_projects' });
  return (Array.isArray(res?.projects) ? res.projects : [])
    .filter(p => isRecord(p) && typeof p.id === 'string' && PROJECT_ID_PATTERN.test(p.id))
    .map(normalizeProject);
}

/** Vrai si l'utilisateur courant est administrateur. */
export function isAdmin(hass: any): boolean {
  return hass?.user?.is_admin === true;
}

/** Liste légère des projets enregistrés (sans géométrie ni image). */
export async function listProjects(hass: any): Promise<ProjectSummary[]> {
  try {
    const res = await ws<Rec>(hass, { type: 'home_architect/list_projects' });
    return (Array.isArray(res?.projects) ? res.projects : [])
      .map(toSummary)
      .filter((s): s is ProjectSummary => s !== null);
  } catch (err) {
    if (err instanceof HaApiError && err.code === 'unknown_command') {
      return (await legacyGetProjects(hass)).map(summarize);
    }
    throw err;
  }
}

/** Charge un projet complet, normalisé ; null s'il n'existe pas. */
export async function getProject(hass: any, projectId: string): Promise<HomeArchitectProject | null> {
  assertProjectId(projectId);
  try {
    const res = await ws<Rec>(hass, { type: 'home_architect/get_project', project_id: projectId });
    return isRecord(res?.project) ? normalizeProject(res.project) : null;
  } catch (err) {
    if (err instanceof HaApiError && err.code === 'not_found') return null;
    if (err instanceof HaApiError && err.code === 'unknown_command') {
      return (await legacyGetProjects(hass)).find(p => p.id === projectId) ?? null;
    }
    throw err;
  }
}

/**
 * Sauvegarde un projet. Retire les champs serveur, refuse avant l'envoi un projet trop lourd
 * ou contenant encore une data-URL de fond volumineuse (à téléverser d'abord via uploadBackground).
 * `expectedRevision` : révision sur laquelle l'édition a commencé (ConflictError si elle a changé ;
 * absente ou 0 = le projet ne doit pas encore exister côté serveur), `force` : écrase malgré un conflit.
 * `assetId` (si présent) : asset de fond retenu par le serveur, à reporter dans background.assetId
 * (le serveur convertit en fichier une petite data-URL héritée).
 */
export async function saveProject(
  hass: any,
  project: HomeArchitectProject,
  opts: { expectedRevision?: number; force?: boolean } = {}
): Promise<{ id: string; revision: number; updated_at: string; assetId?: string }> {
  assertProjectId(project.id);
  const payload = stripServerFields(project);

  const imageUrl = payload.background?.imageUrl;
  if (typeof imageUrl === 'string' && imageUrl.startsWith('data:') && imageUrl.length > MAX_INLINE_DATA_URL_BYTES) {
    throw new PayloadTooLargeError(
      "L'image de fond doit être téléversée sur le serveur avant la sauvegarde.",
      imageUrl.length,
      MAX_INLINE_DATA_URL_BYTES
    );
  }
  const bytes = estimateJsonBytes(payload);
  if (bytes > MAX_PROJECT_BYTES) {
    throw new PayloadTooLargeError(
      `Plan trop volumineux (${formatMiB(bytes)}, maximum ${formatMiB(MAX_PROJECT_BYTES)}).`,
      bytes,
      MAX_PROJECT_BYTES
    );
  }

  const msg: Rec = { type: 'home_architect/save_project', project: payload };
  if (opts.expectedRevision !== undefined) msg.expected_revision = opts.expectedRevision;
  if (opts.force) msg.force = true;
  const res = await ws<Rec>(hass, msg, { bytes, limit: MAX_PROJECT_BYTES });
  const result: { id: string; revision: number; updated_at: string; assetId?: string } = {
    id: typeof res?.id === 'string' ? res.id : project.id,
    revision: nonNegativeInt(res?.revision) ?? 0,
    updated_at: typeof res?.updated_at === 'string' ? res.updated_at : new Date().toISOString(),
  };
  if (typeof res?.asset_id === 'string' && ASSET_ID_PATTERN.test(res.asset_id)) result.assetId = res.asset_id;
  return result;
}

/** Supprime un projet (et ses fichiers côté serveur). Un projet déjà absent est considéré comme supprimé. */
export async function deleteProject(hass: any, projectId: string): Promise<void> {
  assertProjectId(projectId);
  try {
    await ws(hass, { type: 'home_architect/delete_project', project_id: projectId });
  } catch (err) {
    if (err instanceof HaApiError && err.code === 'not_found') return;
    throw err;
  }
}

/** Téléverse l'image de fond d'un projet (admin) ; renvoie la référence d'asset à stocker dans background.assetId. */
export async function uploadBackground(
  hass: any,
  projectId: string,
  blob: Blob
): Promise<{ assetId: string; mimeType: string; size: number }> {
  assertProjectId(projectId);
  const size: SizeContext = { bytes: blob.size, limit: MAX_UPLOAD_BYTES };
  if (blob.size > MAX_UPLOAD_BYTES) {
    throw new PayloadTooLargeError(
      `Image trop volumineuse (${formatMiB(blob.size)}, maximum ${formatMiB(MAX_UPLOAD_BYTES)}).`,
      blob.size,
      MAX_UPLOAD_BYTES
    );
  }
  const resp = await authFetch(hass, `/api/home_architect/background/${encodeURIComponent(projectId)}`, {
    method: 'POST',
    body: blob,
    headers: { 'Content-Type': blob.type || 'application/octet-stream' },
  });
  if (!resp.ok) throw httpError(resp.status, size);
  let data: unknown;
  try {
    data = await resp.json();
  } catch {
    data = null;
  }
  if (!isRecord(data) || typeof data.asset_id !== 'string' || !ASSET_ID_PATTERN.test(data.asset_id)) {
    throw new HaApiError('invalid_response', 'Réponse inattendue du serveur après le téléversement.');
  }
  return {
    assetId: data.asset_id,
    mimeType: typeof data.mime_type === 'string' ? data.mime_type : blob.type,
    size: nonNegativeInt(data.size) ?? blob.size,
  };
}

/**
 * Projet propriétaire d'un asset (`<project_id>-<empreinte>.<ext>`). Le backend ne sert un asset que
 * sous l'URL de ce projet : c'est le cas d'une copie « Enregistrer sous » pas encore sauvegardée,
 * ou de son brouillon, qui référence encore l'image du projet d'origine.
 */
function assetOwner(assetId: string): string | null {
  const match = /^([A-Za-z0-9_-]{1,64})-[A-Za-z0-9]{6,64}\.[A-Za-z0-9]{2,5}$/.exec(assetId);
  return match && PROJECT_ID_PATTERN.test(match[1]) ? match[1] : null;
}

/** Télécharge l'image de fond d'un projet (requête authentifiée). */
export async function fetchBackgroundBlob(hass: any, projectId: string, assetId: string): Promise<Blob> {
  assertProjectId(projectId);
  assertAssetId(assetId);
  const owner = assetOwner(assetId) ?? projectId;
  const resp = await authFetch(
    hass,
    `/api/home_architect/background/${encodeURIComponent(owner)}/${encodeURIComponent(assetId)}`
  );
  if (!resp.ok) throw httpError(resp.status);
  return resp.blob();
}

/** Cache des URL objet des fonds, partagé par le panneau et les cartes : une entrée par assetId. */
const objectUrls = new Map<string, { promise: Promise<string>; refs: number }>();

/**
 * URL affichable (object URL) de l'image de fond, mise en cache par assetId.
 * Chaque appel réussi doit être apparié à un appel de releaseBackgroundObjectUrl(assetId).
 */
export function fetchBackgroundObjectUrl(hass: any, projectId: string, assetId: string): Promise<string> {
  const cached = objectUrls.get(assetId);
  if (cached) {
    cached.refs += 1;
    return cached.promise;
  }
  const promise = fetchBackgroundBlob(hass, projectId, assetId).then(blob => URL.createObjectURL(blob));
  const entry = { promise, refs: 1 };
  objectUrls.set(assetId, entry);
  promise.catch(() => {
    if (objectUrls.get(assetId) === entry) objectUrls.delete(assetId);
  });
  return promise;
}

/** Libère une référence à l'URL objet d'un fond ; l'URL est révoquée quand plus personne ne l'utilise. */
export function releaseBackgroundObjectUrl(assetId: string): void {
  const entry = objectUrls.get(assetId);
  if (!entry) return;
  entry.refs -= 1;
  if (entry.refs > 0) return;
  objectUrls.delete(assetId);
  entry.promise.then(url => URL.revokeObjectURL(url), () => undefined);
}

/** Publie le SVG du plan (assaini côté serveur) pour une carte picture-elements. */
export async function publishSvg(
  hass: any,
  projectId: string,
  svg: string,
  opts: { includeBackground: boolean }
): Promise<PublishInfo> {
  assertProjectId(projectId);
  const bytes = new TextEncoder().encode(svg).length;
  if (bytes > MAX_PUBLISH_BYTES) {
    throw new PayloadTooLargeError(
      `SVG trop volumineux (${formatMiB(bytes)}, maximum ${formatMiB(MAX_PUBLISH_BYTES)}).`,
      bytes,
      MAX_PUBLISH_BYTES
    );
  }
  const res = await ws<unknown>(
    hass,
    {
      type: 'home_architect/publish_svg',
      project_id: projectId,
      svg_content: svg,
      include_background: opts.includeBackground === true,
    },
    { bytes, limit: MAX_PUBLISH_BYTES }
  );
  const info = normalizePublishInfo(res);
  if (!info) throw new HaApiError('invalid_response', 'Réponse inattendue du serveur après la publication.');
  return info;
}

/** Retire la publication du plan (supprime le fichier publié et invalide l'URL). */
export async function unpublish(hass: any, projectId: string): Promise<void> {
  assertProjectId(projectId);
  await ws(hass, { type: 'home_architect/unpublish', project_id: projectId });
}

/** Interroge le backend sur la disponibilité d'une nouvelle version. */
export async function checkUpdates(hass: any, opts: { force?: boolean } = {}): Promise<UpdateStatus> {
  const msg: Rec = { type: 'home_architect/check_updates' };
  if (opts.force) msg.force = true;
  const res = await ws<Rec>(hass, msg);
  const r = isRecord(res) ? res : {};
  const releaseUrl = optionalString(r.release_url);
  return {
    installed_version: optionalString(r.installed_version) ?? '',
    latest_version: optionalString(r.latest_version) ?? null,
    update_available: r.update_available === true,
    skipped_version: optionalString(r.skipped_version) ?? null,
    // Seules les URL http(s) sont acceptées (la valeur finit dans un href).
    release_url: releaseUrl && /^https?:\/\//i.test(releaseUrl) ? releaseUrl : null,
    release_notes: typeof r.release_notes === 'string' ? r.release_notes : '',
    update_entity_id: optionalString(r.update_entity_id) ?? null,
  };
}

/**
 * S'abonne aux modifications d'un projet (sauvegarde, suppression, publication depuis un autre appareil).
 * Résout une fonction de désabonnement idempotente qui ne lève jamais.
 */
export async function subscribeProject(
  hass: any,
  projectId: string,
  cb: (ev: { project_id: string; revision: number; deleted?: boolean }) => void
): Promise<() => void> {
  assertProjectId(projectId);
  const subscribe = hass?.connection?.subscribeMessage;
  if (typeof subscribe !== 'function') {
    throw new HaApiError('not_connected', 'Connexion à Home Assistant indisponible.');
  }
  const onMessage = (msg: unknown) => {
    // L'abonnement est propre à ce projet : on écarte seulement un événement annonçant un autre id.
    if (!isRecord(msg) || (msg.project_id !== undefined && msg.project_id !== projectId)) return;
    const ev: { project_id: string; revision: number; deleted?: boolean } = {
      project_id: projectId,
      revision: nonNegativeInt(msg.revision) ?? 0,
    };
    if (msg.deleted === true) ev.deleted = true;
    cb(ev);
  };
  let unsubscribe: unknown;
  try {
    unsubscribe = await subscribe.call(hass.connection, onMessage, {
      type: 'home_architect/subscribe_project',
      project_id: projectId,
    });
  } catch (err) {
    throw toHaApiError(err);
  }
  let active = true;
  return () => {
    if (!active) return;
    active = false;
    try {
      const result = typeof unsubscribe === 'function' ? unsubscribe() : undefined;
      if (result && typeof result.catch === 'function') result.catch(() => undefined);
    } catch {
      // Connexion déjà fermée : rien à désabonner.
    }
  };
}

function legacyStorage(): Storage | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage;
  } catch {
    return null; // SecurityError : stockage bloqué pour cette origine
  }
}

function isLegacyProjectKey(key: string): boolean {
  return key.startsWith(LEGACY_PREFIX) && !NON_PROJECT_KEYS.has(key);
}

/**
 * Anciennes copies de projets laissées dans localStorage (clés 'home_architect_*') par les versions
 * précédentes, normalisées. Ne lève jamais (stockage bloqué, JSON corrompu…).
 */
export function readLegacyLocalProjects(): Array<{ key: string; project: HomeArchitectProject }> {
  const storage = legacyStorage();
  if (!storage) return [];
  const result: Array<{ key: string; project: HomeArchitectProject }> = [];
  try {
    const keys: string[] = [];
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key && isLegacyProjectKey(key)) keys.push(key);
    }
    for (const key of keys) {
      let parsed: unknown;
      try {
        const raw = storage.getItem(key);
        if (!raw) continue;
        parsed = JSON.parse(raw);
      } catch {
        continue;
      }
      if (!isRecord(parsed) || !(Array.isArray(parsed.walls) || Array.isArray(parsed.rooms) || Array.isArray(parsed.bindings))) {
        continue;
      }
      // Les anciennes versions écrivaient sous `home_architect_<id>` : l'id de la clé sert de repli.
      const keyId = key.slice(LEGACY_PREFIX.length);
      const source = typeof parsed.id === 'string' && PROJECT_ID_PATTERN.test(parsed.id) ? parsed : { ...parsed, id: keyId };
      result.push({ key, project: normalizeProject(source) });
    }
  } catch {
    // Accès refusé en cours de lecture : on renvoie ce qui a pu être lu.
  }
  return result;
}

/** Supprime une ancienne copie de projet de localStorage (sans effet sur les autres clés). */
export function removeLegacyLocalProject(key: string): void {
  if (typeof key !== 'string' || !isLegacyProjectKey(key)) return;
  const storage = legacyStorage();
  if (!storage) return;
  try {
    storage.removeItem(key);
  } catch {
    // Stockage bloqué : rien à faire.
  }
}
