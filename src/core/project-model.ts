import {
  BackgroundPlan, EntityBinding, ExportFrame, FURNITURE_CATEGORIES, FurnitureCategory, FurnitureItem,
  GridConfig, HomeArchitectProject, OPENING_TYPES, Opening, OpeningType, Point, PROJECT_SCHEMA_VERSION,
  PublishInfo, Room, TAP_ACTION_TYPES, TapActionType, WALL_TYPES, Wall, WallType
} from './types';
import { PolygonUtils } from './polygon';
import { findFurnitureTemplate } from './furniture-catalog';
import { getLevel, isKnownLevel } from './levels';

/** Taille maximale d'un projet sauvegardé (JSON UTF-8) ; le backend applique la même limite. */
export const MAX_PROJECT_BYTES = 2 * 1024 * 1024;

/** Taille maximale du SVG publié via WebSocket. */
export const MAX_PUBLISH_BYTES = 3.5 * 1024 * 1024;

/** Taille maximale d'une data-URL de fond encore tolérée dans le JSON (au-delà : téléverser l'image). */
export const MAX_INLINE_DATA_URL_BYTES = 256 * 1024;

/** Format d'identifiant de projet accepté par le backend. */
export const PROJECT_ID_PATTERN = /^[a-zA-Z0-9_-]{1,64}$/;

/** Format d'identifiant d'asset de fond (`<project_id>-<empreinte>.<ext>`), sans aucun séparateur de chemin. */
export const ASSET_ID_PATTERN = /^[A-Za-z0-9_-]{1,64}-[A-Za-z0-9]{6,64}\.[A-Za-z0-9]{2,5}$/;

const ID_ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';
const ENTITY_ID_PATTERN = /^[a-z0-9_]+\.[a-z0-9_]+$/i;
/** URL externe acceptée par le backend (storage.py) : http(s) ou chemin absolu, sans espace ni caractère de contrôle. */
// eslint-disable-next-line no-control-regex -- exclusion volontaire des caractères de contrôle
const EXTERNAL_IMAGE_URL = /^(?:https?:\/\/|\/)[^\s\x00-\x1f\x7f]*$/i;
/** Longueur maximale d'une URL externe conservée par le backend. */
const MAX_IMAGE_URL_LENGTH = 2048;
const DATA_IMAGE_URL = /^data:image\//i;
const MIME_PATTERN = /^image\/[a-z0-9.+-]+$/i;
/** Chemin de navigation HA : chemin relatif à l'instance ('/lovelace/1') ou ancre ('#popup'), jamais une URL externe. */
// eslint-disable-next-line no-control-regex -- exclusion volontaire des caractères de contrôle
const NAVIGATION_PATH = /^(?:\/(?!\/)|#)[^\s\x00-\x1f\x7f\\]*$/;
/**
 * Couleur CSS sûre (#hex, rgb()/rgba()/hsl(), nom, var()) : aucun guillemet, point-virgule, chevron ni
 * deux-points, pour qu'une valeur importée ne puisse sortir d'un attribut fill="…" ou style="…".
 */
const SAFE_COLOR = /^[#a-zA-Z0-9(),.%\s+-]{1,64}$/;
const UNSAFE_COLOR = /url\s*\(|expression|image-set/i;
/** Icône MDI / HA ('mdi:sofa', 'hass:lightbulb'). */
const MDI_ICON = /^[a-z0-9_-]{1,32}:[a-z0-9_-]{1,64}$/i;
/** Icône emoji / texte court affichée dans le plan. */
const MAX_ICON_LENGTH = 64;
/** Limites de longueur appliquées par le backend (save_project refuse au-delà : invalid_project). */
const MAX_NAME_LENGTH = 200;
const MAX_CATEGORY_LENGTH = 64;

const DEFAULT_PIXELS_PER_METER = 50;
const MIN_PIXELS_PER_METER = 5;
const MAX_PIXELS_PER_METER = 2000;
const DEFAULT_WALL_THICKNESS = 0.2;
const MIN_WALL_THICKNESS = 0.02;
const MAX_WALL_THICKNESS = 1.5;
const DEFAULT_GRID_SIZE = 0.5;
const MIN_GRID_SIZE = 0.05;
const MAX_GRID_SIZE = 2;
const DEFAULT_OPENING_WIDTH = 0.9;
const DEFAULT_BACKGROUND_OPACITY = 0.4;
/** Hauteurs (murs, pièces, ouvertures, plafond) : au-delà, la valeur est jugée aberrante. */
const MAX_HEIGHT = 50;
const MAX_DIMENSION = 100;

type Rec = Record<string, unknown>;

function isRecord(v: unknown): v is Rec {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function asArray(v: unknown): unknown[] {
  return Array.isArray(v) ? v : [];
}

/** Nombre fini (les chaînes numériques héritées des champs de saisie sont acceptées), sinon undefined. */
function toFinite(v: unknown): number | undefined {
  if (typeof v === 'number') return Number.isFinite(v) ? v : undefined;
  if (typeof v === 'string' && v.trim() !== '') {
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

function finiteOr(v: unknown, fallback: number): number {
  const n = toFinite(v);
  return n === undefined ? fallback : n;
}

/** Nombre strictement positif borné à `max`, sinon undefined (champ optionnel). */
function positiveOrUndefined(v: unknown, max: number): number | undefined {
  const n = toFinite(v);
  return n !== undefined && n > 0 ? Math.min(n, max) : undefined;
}

function nonNegativeInt(v: unknown): number | undefined {
  return typeof v === 'number' && Number.isInteger(v) && v >= 0 ? v : undefined;
}

function optionalString(v: unknown): string | undefined {
  if (typeof v !== 'string') return undefined;
  const s = v.trim();
  return s === '' ? undefined : s;
}

/** Chaîne non vide tronquée à `max` caractères (limites du backend), sinon undefined. */
function boundedString(v: unknown, max: number): string | undefined {
  const s = optionalString(v);
  return s === undefined ? undefined : (s.length > max ? s.slice(0, max).trim() : s);
}

function safeColor(v: unknown): string | undefined {
  const s = optionalString(v);
  return s && SAFE_COLOR.test(s) && !UNSAFE_COLOR.test(s) ? s : undefined;
}

function shortIcon(v: unknown): string | undefined {
  const s = optionalString(v);
  return s && s.length <= MAX_ICON_LENGTH ? s : undefined;
}

/** Identifiant d'élément : chaîne non vide, ou nombre fini des très anciens projets converti en chaîne. */
function idString(v: unknown): string {
  if (typeof v === 'string') return v.trim() === '' ? '' : v;
  if (typeof v === 'number' && Number.isFinite(v)) return String(v);
  return '';
}

function toPoint(v: unknown): Point | null {
  if (!isRecord(v)) return null;
  const x = toFinite(v.x);
  const y = toFinite(v.y);
  return x === undefined || y === undefined ? null : { x, y };
}

function oneOf<T extends string>(v: unknown, allowed: readonly T[]): T | undefined {
  return typeof v === 'string' && (allowed as readonly string[]).includes(v) ? (v as T) : undefined;
}

function normalizeAngle(deg: number): number {
  const r = ((deg % 360) + 360) % 360;
  return r === 0 ? 0 : r; // évite -0
}

/** Identifiant unique dans `used` : conserve l'existant, en génère un nouveau s'il manque ou est dupliqué. */
function uniqueId(v: unknown, prefix: string, used: Set<string>): string {
  let id = idString(v);
  while (id === '' || used.has(id)) id = generateElementId(prefix);
  used.add(id);
  return id;
}

/** Chaîne aléatoire de `length` caractères [a-z0-9] (crypto.getRandomValues, sans biais de modulo). */
function randomToken(length: number): string {
  const hasCrypto = typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function';
  let out = '';
  while (out.length < length) {
    const bytes = new Uint8Array(length * 2);
    if (hasCrypto) {
      crypto.getRandomValues(bytes);
    } else {
      for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
    }
    for (const b of bytes) {
      if (b >= 252) continue; // 252 = 7 × 36 : on rejette le reste pour une distribution uniforme
      out += ID_ALPHABET[b % ID_ALPHABET.length];
      if (out.length === length) break;
    }
  }
  return out;
}

/** Nouvel identifiant de projet immuable : 'plan_' + 8 caractères [a-z0-9] (compatible avec PROJECT_ID_PATTERN). */
export function generateProjectId(): string {
  return `plan_${randomToken(8)}`;
}

/** Nouvel identifiant d'élément : `${prefix}_` + 10 caractères [a-z0-9]. */
export function generateElementId(prefix: string): string {
  return `${prefix}_${randomToken(10)}`;
}

function defaultGrid(): GridConfig {
  return { size: DEFAULT_GRID_SIZE, subdivisions: 2, snapToGrid: true, snapToAngles: true, snapToElements: true };
}

/**
 * Catégorie déduite de l'id d'un ancien projet (avant la 1.1.0, l'id d'un niveau connu en était
 * aussi la catégorie : 'rdc', 'etage1'…) ; undefined pour tout autre id.
 */
export function legacyCategory(projectId: string | undefined | null): string | undefined {
  return projectId && isKnownLevel(projectId) ? projectId : undefined;
}

function defaultProjectName(category: string | undefined): string {
  return getLevel(category)?.fullLabel ?? 'Nouveau plan';
}

/** Crée un projet vide avec un nouvel identifiant immuable (la catégorie est un champ séparé). */
export function createEmptyProject(opts: { name?: string; category?: string; pixelsPerMeter?: number } = {}): HomeArchitectProject {
  const now = new Date().toISOString();
  const category = boundedString(opts.category, MAX_CATEGORY_LENGTH);
  return {
    id: generateProjectId(),
    name: boundedString(opts.name, MAX_NAME_LENGTH) ?? defaultProjectName(category),
    category,
    schema_version: PROJECT_SCHEMA_VERSION,
    created_at: now,
    updated_at: now,
    pixelsPerMeter: clamp(finiteOr(opts.pixelsPerMeter, DEFAULT_PIXELS_PER_METER), MIN_PIXELS_PER_METER, MAX_PIXELS_PER_METER),
    grid: defaultGrid(),
    walls: [],
    openings: [],
    rooms: [],
    bindings: [],
    furniture: [],
  };
}

function normalizeGrid(v: unknown): GridConfig {
  const g = isRecord(v) ? v : {};
  const subdivisions = toFinite(g.subdivisions);
  return {
    size: clamp(finiteOr(g.size, DEFAULT_GRID_SIZE), MIN_GRID_SIZE, MAX_GRID_SIZE),
    subdivisions: subdivisions === undefined ? 2 : clamp(Math.round(subdivisions), 1, 20),
    snapToGrid: typeof g.snapToGrid === 'boolean' ? g.snapToGrid : true,
    snapToAngles: typeof g.snapToAngles === 'boolean' ? g.snapToAngles : true,
    snapToElements: typeof g.snapToElements === 'boolean' ? g.snapToElements : true,
  };
}

/** URL d'image de fond conservable : data-URL d'image héritée, ou URL externe acceptée par le backend ; sinon ''. */
function safeImageUrl(v: unknown): string {
  if (typeof v !== 'string') return '';
  if (DATA_IMAGE_URL.test(v)) return v;
  return v.length <= MAX_IMAGE_URL_LENGTH && EXTERNAL_IMAGE_URL.test(v) ? v : '';
}

function normalizeBackground(v: unknown): BackgroundPlan | undefined {
  if (!isRecord(v)) return undefined;
  const imageUrl = safeImageUrl(v.imageUrl);
  const assetId = typeof v.assetId === 'string' && ASSET_ID_PATTERN.test(v.assetId) ? v.assetId : undefined;
  if (!imageUrl && !assetId) return undefined;

  const scale = toFinite(v.scale);
  const bg: BackgroundPlan = {
    imageUrl,
    opacity: clamp(finiteOr(v.opacity, DEFAULT_BACKGROUND_OPACITY), 0, 1),
    visible: v.visible !== false,
    offset: toPoint(v.offset) ?? { x: 0, y: 0 },
    scale: scale !== undefined && scale > 0 ? scale : 1,
    rotation: finiteOr(v.rotation, 0),
  };
  if (assetId) bg.assetId = assetId;
  if (typeof v.mimeType === 'string' && MIME_PATTERN.test(v.mimeType)) bg.mimeType = v.mimeType;
  const widthPx = positiveOrUndefined(v.widthPx, Number.MAX_SAFE_INTEGER);
  const heightPx = positiveOrUndefined(v.heightPx, Number.MAX_SAFE_INTEGER);
  if (widthPx !== undefined) bg.widthPx = widthPx;
  if (heightPx !== undefined) bg.heightPx = heightPx;
  return bg;
}

function normalizeWalls(list: unknown): Wall[] {
  const used = new Set<string>();
  const walls: Wall[] = [];
  for (const w of asArray(list)) {
    if (!isRecord(w)) continue;
    const start = toPoint(w.start);
    const end = toPoint(w.end);
    if (!start || !end) continue;
    if (Math.hypot(end.x - start.x, end.y - start.y) < 1e-6) continue; // mur dégénéré (longueur nulle)
    const wall: Wall = {
      id: uniqueId(w.id, 'wall', used),
      start,
      end,
      thickness: clamp(finiteOr(w.thickness, DEFAULT_WALL_THICKNESS), MIN_WALL_THICKNESS, MAX_WALL_THICKNESS),
      type: oneOf<WallType>(w.type, WALL_TYPES) ?? 'standard',
    };
    const height = positiveOrUndefined(w.height, MAX_HEIGHT);
    if (height !== undefined) wall.height = height;
    walls.push(wall);
  }
  return walls;
}

function normalizeOpenings(list: unknown, walls: Wall[]): Opening[] {
  const wallLengths = new Map(walls.map(w => [w.id, Math.hypot(w.end.x - w.start.x, w.end.y - w.start.y)]));
  const used = new Set<string>();
  const openings: Opening[] = [];
  for (const o of asArray(list)) {
    if (!isRecord(o)) continue;
    const wallId = idString(o.wallId);
    const wallLength = wallLengths.get(wallId);
    if (wallLength === undefined) continue; // ouverture orpheline
    const opening: Opening = {
      id: uniqueId(o.id, 'op', used),
      wallId,
      type: oneOf<OpeningType>(o.type, OPENING_TYPES) ?? 'door',
      offset: clamp(finiteOr(o.offset, wallLength / 2), 0, wallLength),
      width: clamp(finiteOr(o.width, DEFAULT_OPENING_WIDTH), 0.05, MAX_DIMENSION),
      flipSide: o.flipSide === true,
      flipDirection: o.flipDirection === true,
    };
    const height = positiveOrUndefined(o.height, MAX_HEIGHT);
    if (height !== undefined) opening.height = height;
    if (o.sashCount === 1 || o.sashCount === 2) opening.sashCount = o.sashCount;
    const entityId = optionalString(o.entityId);
    if (entityId && ENTITY_ID_PATTERN.test(entityId)) opening.entityId = entityId;
    openings.push(opening);
  }
  return openings;
}

function normalizeRooms(list: unknown): Room[] {
  const used = new Set<string>();
  const rooms: Room[] = [];
  for (const r of asArray(list)) {
    if (!isRecord(r)) continue;
    const polygon = asArray(r.polygon).map(toPoint).filter((p): p is Point => p !== null);
    if (polygon.length < 3) continue;
    const area = toFinite(r.areaM2);
    const room: Room = {
      id: uniqueId(r.id, 'room', used),
      name: typeof r.name === 'string' ? r.name : 'Pièce',
      polygon,
      areaM2: area !== undefined && area >= 0 ? area : PolygonUtils.computeArea(polygon),
    };
    const areaId = optionalString(r.area_id);
    const color = safeColor(r.color);
    const icon = shortIcon(r.icon);
    const height = positiveOrUndefined(r.height, MAX_HEIGHT);
    if (areaId) room.area_id = areaId;
    if (color) room.color = color;
    if (icon) room.icon = icon;
    if (height !== undefined) room.height = height;
    rooms.push(room);
  }
  return rooms;
}

function normalizeBindings(list: unknown, legacySchema: boolean): EntityBinding[] {
  const used = new Set<string>();
  const bindings: EntityBinding[] = [];
  for (const b of asArray(list)) {
    if (!isRecord(b)) continue;
    const entityId = optionalString(b.entityId);
    if (!entityId || !ENTITY_ID_PATTERN.test(entityId)) continue;
    const position = toPoint(b.position);
    if (!position) continue;
    const binding: EntityBinding = { id: uniqueId(b.id, 'bind', used), entityId, position };
    const roomId = optionalString(b.roomId);
    const icon = shortIcon(b.icon);
    const rawMdi = optionalString(b.mdiIcon);
    const mdiIcon = rawMdi && MDI_ICON.test(rawMdi) ? rawMdi : undefined;
    const customName = optionalString(b.customName);
    // Chemin interne à HA uniquement (jamais d'URL externe ni de schéma arbitraire passé à history.pushState).
    const rawPath = optionalString(b.navigationPath);
    const navigationPath = rawPath && NAVIGATION_PATH.test(rawPath) ? rawPath : undefined;
    // 'navigate' sans chemin valide n'a aucun effet : on revient à l'action par défaut.
    const action = (v: unknown) => {
      const a = oneOf<TapActionType>(v, TAP_ACTION_TYPES);
      return a === 'navigate' && !navigationPath ? undefined : a;
    };
    // Avant le schéma 2, tapAction valait toujours 'toggle' (figé au dépôt, jamais choisi par
    // l'utilisateur) : on l'efface pour appliquer l'action par défaut du domaine.
    const tapAction = action(b.tapAction);
    const holdAction = action(b.holdAction);
    if (roomId) binding.roomId = roomId;
    if (icon) binding.icon = icon;
    if (mdiIcon) binding.mdiIcon = mdiIcon;
    if (customName) binding.customName = customName;
    if (tapAction && !(legacySchema && tapAction === 'toggle')) binding.tapAction = tapAction;
    if (holdAction) binding.holdAction = holdAction;
    if (navigationPath) binding.navigationPath = navigationPath;
    bindings.push(binding);
  }
  return bindings;
}

function normalizeFurniture(list: unknown): FurnitureItem[] {
  const used = new Set<string>();
  const items: FurnitureItem[] = [];
  for (const f of asArray(list)) {
    if (!isRecord(f)) continue;
    const type = optionalString(f.type);
    const position = toPoint(f.position);
    if (!type || !position) continue;
    const template = findFurnitureTemplate(type);
    const width = toFinite(f.width);
    const length = toFinite(f.length);
    const item: FurnitureItem = {
      id: uniqueId(f.id, 'furn', used),
      type,
      name: typeof f.name === 'string' ? f.name : (template?.name ?? type),
      category: oneOf<FurnitureCategory>(f.category, FURNITURE_CATEGORIES) ?? template?.category ?? 'other',
      position,
      width: width !== undefined && width > 0 ? Math.min(width, MAX_DIMENSION) : (template?.width ?? 1),
      length: length !== undefined && length > 0 ? Math.min(length, MAX_DIMENSION) : (template?.length ?? 1),
      rotation: normalizeAngle(finiteOr(f.rotation, 0)),
    };
    const roomId = optionalString(f.roomId);
    const color = safeColor(f.color);
    const icon = shortIcon(f.icon);
    if (roomId) item.roomId = roomId;
    if (color) item.color = color;
    if (icon) item.icon = icon;
    items.push(item);
  }
  return items;
}

function normalizeExportFrame(v: unknown): ExportFrame | undefined {
  if (!isRecord(v)) return undefined;
  const minX = toFinite(v.minX);
  const minY = toFinite(v.minY);
  const maxX = toFinite(v.maxX);
  const maxY = toFinite(v.maxY);
  if (minX === undefined || minY === undefined || maxX === undefined || maxY === undefined) return undefined;
  if (maxX <= minX || maxY <= minY) return undefined;
  return { minX, minY, maxX, maxY };
}

/** Valide des informations de publication venant du serveur ; undefined si la forme est invalide. */
export function normalizePublishInfo(v: unknown): PublishInfo | undefined {
  if (!isRecord(v)) return undefined;
  const { url, path, hash, published_at } = v;
  if (typeof url !== 'string' || typeof path !== 'string' || typeof hash !== 'string' || typeof published_at !== 'string') {
    return undefined;
  }
  // URL relative à l'instance uniquement (jamais d'URL absolue ni de schéma arbitraire dans un href).
  if (!url.startsWith('/') || url.startsWith('//') || !path.startsWith('/') || path.startsWith('//')) return undefined;
  const info: PublishInfo = { url, path, hash, published_at, include_background: v.include_background === true };
  if (typeof v.legacy_path === 'string' && v.legacy_path.startsWith('/local/')) info.legacy_path = v.legacy_path;
  return info;
}

function normalizeUnsafe(raw: unknown): HomeArchitectProject {
  const src = isRecord(raw) ? raw : {};
  const now = new Date().toISOString();
  const id = typeof src.id === 'string' && PROJECT_ID_PATTERN.test(src.id) ? src.id : generateProjectId();
  // Anciens projets : l'id d'un niveau connu en était aussi la catégorie.
  const category = boundedString(src.category, MAX_CATEGORY_LENGTH) ?? legacyCategory(id);
  const sourceSchema = toFinite(src.schema_version);
  const legacySchema = sourceSchema === undefined || sourceSchema < PROJECT_SCHEMA_VERSION;

  const walls = normalizeWalls(src.walls);
  const project: HomeArchitectProject = {
    id,
    name: boundedString(src.name, MAX_NAME_LENGTH) ?? defaultProjectName(category),
    category,
    schema_version: PROJECT_SCHEMA_VERSION,
    created_at: optionalString(src.created_at) ?? now,
    updated_at: optionalString(src.updated_at) ?? optionalString(src.created_at) ?? now,
    pixelsPerMeter: clamp(finiteOr(src.pixelsPerMeter, DEFAULT_PIXELS_PER_METER), MIN_PIXELS_PER_METER, MAX_PIXELS_PER_METER),
    grid: normalizeGrid(src.grid),
    walls,
    openings: normalizeOpenings(src.openings, walls),
    rooms: normalizeRooms(src.rooms),
    bindings: normalizeBindings(src.bindings, legacySchema),
    furniture: normalizeFurniture(src.furniture),
  };
  if (category === undefined) delete project.category;

  const revision = nonNegativeInt(src.revision);
  if (revision !== undefined) project.revision = revision;
  const ceiling = positiveOrUndefined(src.defaultCeilingHeight, MAX_HEIGHT);
  if (ceiling !== undefined) project.defaultCeilingHeight = ceiling;
  const background = normalizeBackground(src.background);
  if (background) project.background = background;
  if (typeof src.showDimensions === 'boolean') project.showDimensions = src.showDimensions;
  if (typeof src.showThermalHeatmap === 'boolean') project.showThermalHeatmap = src.showThermalHeatmap;
  if (typeof src.showGhostLevel === 'boolean') project.showGhostLevel = src.showGhostLevel;
  const ghostLevelId = optionalString(src.ghostLevelId);
  if (ghostLevelId) project.ghostLevelId = ghostLevelId;
  const exportFrame = normalizeExportFrame(src.exportFrame);
  if (exportFrame) project.exportFrame = exportFrame;
  const publish = normalizePublishInfo(src.publish);
  if (publish) project.publish = publish;
  return project;
}

/**
 * Normalise un projet venant du serveur, d'un brouillon, d'un ancien localStorage ou d'un import.
 * Tolère n'importe quelle entrée et ne lève jamais : tableaux par défaut, éléments invalides
 * filtrés, nombres bornés, schema_version à jour, `publish` conservé (lecture seule).
 */
export function normalizeProject(raw: unknown): HomeArchitectProject {
  try {
    return normalizeUnsafe(raw);
  } catch (err) {
    console.warn('[home-architect] Projet illisible, remplacé par un plan vide :', err);
    return createEmptyProject();
  }
}

/** Copie du projet sans les champs possédés par le serveur (`publish`) ni les clés runtime préfixées par '_'. */
export function stripServerFields(p: HomeArchitectProject): HomeArchitectProject {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(p)) {
    if (key === 'publish' || key.startsWith('_')) continue;
    out[key] = value;
  }
  return out as unknown as HomeArchitectProject;
}

/** Taille en octets de la sérialisation JSON (UTF-8) d'une valeur. */
export function estimateJsonBytes(value: unknown): number {
  const json = JSON.stringify(value);
  return json === undefined ? 0 : new TextEncoder().encode(json).length;
}

/** Copie profonde d'un projet (structuredClone si disponible, sinon aller-retour JSON). */
export function cloneProject(p: HomeArchitectProject): HomeArchitectProject {
  if (typeof structuredClone === 'function') {
    try {
      return structuredClone(p);
    } catch {
      // Objet non clonable (proxy, fonction) : repli JSON ci-dessous.
    }
  }
  return JSON.parse(JSON.stringify(p)) as HomeArchitectProject;
}

/** Domaine d'une entité ('light.salon' -> 'light'), chaîne vide si l'id est invalide. */
export function entityDomain(entityId: string): string {
  const i = typeof entityId === 'string' ? entityId.indexOf('.') : -1;
  return i > 0 ? entityId.slice(0, i) : '';
}

/** Domaines actionnés par défaut au tap ; tous les autres ouvrent la fiche more-info. */
const TOGGLE_BY_DEFAULT = new Set([
  'light', 'switch', 'fan', 'input_boolean', 'automation',
  'scene', 'script', 'button', 'input_button', // « déclencher » (turn_on / press)
]);

/** Service appelé par l'action 'toggle' pour chaque domaine actionnable. */
const TAP_SERVICES: Record<string, { domain: string; service: string }> = {
  light: { domain: 'light', service: 'toggle' },
  switch: { domain: 'switch', service: 'toggle' },
  fan: { domain: 'fan', service: 'toggle' },
  input_boolean: { domain: 'input_boolean', service: 'toggle' },
  automation: { domain: 'automation', service: 'toggle' },
  siren: { domain: 'siren', service: 'toggle' },
  cover: { domain: 'cover', service: 'toggle' },
  valve: { domain: 'valve', service: 'toggle' },
  humidifier: { domain: 'humidifier', service: 'toggle' },
  media_player: { domain: 'media_player', service: 'toggle' },
  climate: { domain: 'climate', service: 'toggle' },
  remote: { domain: 'remote', service: 'toggle' },
  group: { domain: 'homeassistant', service: 'toggle' },
  scene: { domain: 'scene', service: 'turn_on' },
  script: { domain: 'script', service: 'turn_on' },
  button: { domain: 'button', service: 'press' },
  input_button: { domain: 'input_button', service: 'press' },
};

/**
 * Action par défaut d'une entité au tap (table unique partagée par la carte et le générateur YAML).
 * 'toggle' pour les domaines sans risque et les déclencheurs (scene, script, button, input_button) ;
 * 'more-info' pour tout le reste (cover dont portails/garages, lock, alarme, valve, climate, capteurs…).
 */
export function defaultTapAction(entityId: string): TapActionType {
  return TOGGLE_BY_DEFAULT.has(entityDomain(entityId)) ? 'toggle' : 'more-info';
}

/** Service à appeler pour l'action 'toggle' (light.toggle, scene.turn_on, button.press…), null si non actionnable. */
export function serviceForTap(entityId: string): { domain: string; service: string } | null {
  const entry = TAP_SERVICES[entityDomain(entityId)];
  return entry ? { ...entry } : null;
}

/** États HA minimaux utilisés pour résoudre les noms d'entités (`hass.states`). */
export type EntityStates = Record<string, { attributes?: Record<string, unknown> } | undefined>;

function friendlyName(states: EntityStates | undefined, entityId: string): string | undefined {
  const name = states?.[entityId]?.attributes?.friendly_name;
  return typeof name === 'string' && name.trim() !== '' ? name : undefined;
}

/** Nom affiché d'une entité du plan : nom saisi par l'utilisateur, sinon friendly_name courant, sinon entity_id. */
export function bindingDisplayName(binding: Pick<EntityBinding, 'entityId' | 'customName'>, states?: EntityStates): string {
  return optionalString(binding.customName) ?? friendlyName(states, binding.entityId) ?? binding.entityId;
}

/**
 * Migration : efface les customName qui ne sont qu'une copie figée au dépôt par les anciennes
 * versions, c'est-à-dire le friendly_name courant ou, faute de friendly_name, l'entity_id.
 * Sans `states`, seule la copie de l'entity_id est détectée. Renvoie le même objet si rien ne change.
 */
export function clearRedundantCustomNames(project: HomeArchitectProject, states: EntityStates | undefined): HomeArchitectProject {
  if (!Array.isArray(project?.bindings)) return project;
  let changed = false;
  const bindings = project.bindings.map(b => {
    if (b.customName === undefined) return b;
    const redundant = b.customName === b.entityId || (states !== undefined && b.customName === friendlyName(states, b.entityId));
    if (!redundant) return b;
    changed = true;
    const { customName: _removed, ...rest } = b;
    return rest;
  });
  return changed ? { ...project, bindings } : project;
}
