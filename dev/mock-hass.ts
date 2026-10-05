/**
 * Faux Home Assistant du harnais de développement (`npm run dev`).
 *
 * Fournit un objet `hass` réaliste dont le backend Home Architect est simulé EN MÉMOIRE :
 *  - toutes les commandes WebSocket de l'intégration (droits admin, révisions et conflits,
 *    limites de taille, abonnements subscribe_project) ;
 *  - les vues HTTP des images de fond via fetchWithAuth (téléversement et lecture) ;
 *  - callService journalisé, avec des effets simples sur les états des entités ;
 *  - la publication : le SVG est servi par le serveur Vite (plugin de vite.config.ts) sous la
 *    même URL que le vrai backend, /api/home_architect/published/<fichier>.svg?v=<hash>.
 *
 * Fidélité au protocole : hass.callWS rejette avec l'objet brut `{code, message}` (pas une
 * Error), fetchWithAuth renvoie de vraies `Response`, chaque changement d'état produit un
 * NOUVEL objet `hass` (les composants Lit comparent les références).
 */
import { MAX_PROJECT_BYTES, MAX_PUBLISH_BYTES, PROJECT_ID_PATTERN } from '../src/core/project-model';
import { MAX_UPLOAD_BYTES } from '../src/core/image-utils';
import { VERSION } from '../src/version';
import {
  AREAS, DEMO_BACKGROUND_SVG, FLOORS, LEGACY_WWW_PROJECT_IDS, createDeviceRegistry, createEntityRegistry,
  createInitialStates, createSeedProjects, type HassEntityState, type Json
} from './fixtures';

export type Language = 'fr' | 'en';

export interface MockSettings {
  admin: boolean;
  language: Language;
  darkMode: boolean;
  updateAvailable: boolean;
  /** Latence simulée de chaque appel (WS, HTTP, services), en millisecondes. */
  latencyMs: number;
  /** Connexion perdue : les appels échouent comme dans HA (code 3 / « Failed to fetch »). */
  offline: boolean;
}

export type LogKind = 'ws' | 'service' | 'http' | 'event' | 'error';

export interface LogEntry {
  time: Date;
  kind: LogKind;
  summary: string;
  detail?: unknown;
}

interface ProjectEvent {
  project_id: string;
  revision: number;
  deleted?: boolean;
}

type WsErrorPayload = { code: string | number; message: string };
type Unsubscribe = () => Promise<void>;

/** Objet `hass` exposé aux composants (sous-ensemble de l'interface HomeAssistant du frontend HA). */
export interface MockHass {
  auth: { data: { hassUrl: string; access_token: string } };
  connection: MockConnection;
  connected: boolean;
  states: Record<string, HassEntityState>;
  entities: Record<string, Json>;
  devices: Record<string, Json>;
  areas: typeof AREAS;
  floors: typeof FLOORS;
  services: Record<string, Record<string, Json>>;
  config: Json;
  themes: Json;
  selectedTheme: Json;
  panels: Record<string, Json>;
  panelUrl: string;
  language: Language;
  selectedLanguage: Language;
  locale: Json;
  user: { id: string; name: string; is_admin: boolean; is_owner: boolean; credentials: unknown[]; mfa_modules: unknown[] };
  dockedSidebar: 'docked' | 'always_hidden' | 'auto';
  enableShortcuts: boolean;
  suspendWhenHidden: boolean;
  vibrate: boolean;
  debugConnection: boolean;
  localize: (key: string) => string;
  hassUrl: (path?: string) => string;
  callWS: (msg: Json) => Promise<unknown>;
  sendWS: (msg: Json) => void;
  callService: (domain: string, service: string, serviceData?: Json, target?: Json) => Promise<{ context: Json; response: null }>;
  callApi: (method: string, path: string) => Promise<never>;
  fetchWithAuth: (path: string, init?: RequestInit) => Promise<Response>;
  formatEntityState: (stateObj: HassEntityState, state?: string) => string;
  formatEntityAttributeValue: (stateObj: HassEntityState, attribute: string, value?: unknown) => string;
  formatEntityAttributeName: (stateObj: HassEntityState, attribute: string) => string;
}

export interface MockConnection {
  subscribeMessage: (callback: (event: unknown) => void, msg: Json, options?: { resubscribe?: boolean }) => Promise<Unsubscribe>;
  sendMessagePromise: (msg: Json) => Promise<unknown>;
}

/** Erreur métier d'une commande : convertie en `{code, message}` à la frontière de callWS. */
class WsCommandError extends Error {
  constructor(readonly code: string, message: string) {
    super(message);
  }
}

/** Code de home-assistant-js-websocket quand la connexion est perdue pendant une commande. */
const ERR_CONNECTION_LOST = 3;
const PUBLISHED_URL_PREFIX = '/api/home_architect/published/';
const UPLOAD_MIME_EXTENSIONS: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg'
};
const DATA_URL_RE = /^data:(image\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/=\s]+)$/i;
/** href d'une <image> examiné par svg_sanitizer._clean_image_data_url (type, paramètres, contenu). */
const IMAGE_DATA_URL_RE = /^data:image\/(png|jpe?g|webp|gif|svg\+xml)((?:;[^,;]*)*),(.*)$/is;
const RASTER_DATA_URL_TYPES: Record<string, string> = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif'
};
const FRAGMENT_RE = /^#[A-Za-z_][A-Za-z0-9_.:-]*$/;
const BASE64_RE = /^[A-Za-z0-9+/]*={0,2}$/;
// eslint-disable-next-line no-control-regex -- blancs et caractères de contrôle retirés, comme _INVISIBLE_RE
const INVISIBLE_RE = /[\s\x00-\x1f\x7f]+/g;
/** Seul nom accepté par la commande dépréciée save_svg_to_www (ancien plan public www/plan_<id>.svg). */
const LEGACY_WWW_FILENAME_RE = /^plan_([a-zA-Z0-9_-]{1,64})\.svg$/;
const RELEASE_URL = 'https://github.com/SocrateMobile/home-architect/releases';

// Règles de sauvegarde du backend (storage.py / assets.py), reproduites pour que le harnais
// ne masque pas un bug que Home Assistant révélerait.
const MAX_PROJECTS = 100;
/** Champs possédés par le serveur, ignorés à la réception (les clés « _* » aussi). */
const SERVER_FIELDS = new Set(['publish', 'revision', 'schema_version', 'updated_at']);
const LIST_FIELDS = ['walls', 'openings', 'rooms', 'bindings', 'furniture'];
const OBJECT_FIELDS = ['grid', 'background', 'exportFrame'];
const ASSET_ID_RE = /^([a-zA-Z0-9_-]{1,64})-([0-9a-f]{12})\.(png|jpg|webp|gif|svg)$/;
/** background.imageUrl conservée seulement si c'est une URL http(s) ou absolue ; sinon vidée (blob:, javascript:…). */
const EXTERNAL_IMAGE_URL_RE = /^(?:https?:\/\/|\/)[^\s\p{Cc}]*$/iu;
const MAX_IMAGE_URL_LENGTH = 2048;
/** Délai avant suppression d'une image de fond qui n'est plus référencée (ASSET_GRACE_PERIOD : 24 h). */
const ASSET_GRACE_MS = 24 * 60 * 60 * 1000;

/** Services simulés, par domaine (servent aussi à remplir hass.services). */
const SERVICES: Record<string, string[]> = {
  homeassistant: ['turn_on', 'turn_off', 'toggle'],
  light: ['turn_on', 'turn_off', 'toggle'],
  switch: ['turn_on', 'turn_off', 'toggle'],
  fan: ['turn_on', 'turn_off', 'toggle'],
  input_boolean: ['turn_on', 'turn_off', 'toggle'],
  cover: ['open_cover', 'close_cover', 'stop_cover', 'toggle', 'set_cover_position'],
  lock: ['lock', 'unlock', 'open'],
  climate: ['turn_on', 'turn_off', 'toggle', 'set_temperature', 'set_hvac_mode'],
  media_player: ['turn_on', 'turn_off', 'toggle', 'media_play', 'media_pause', 'media_play_pause', 'media_stop', 'volume_set', 'volume_mute'],
  alarm_control_panel: ['alarm_arm_home', 'alarm_arm_away', 'alarm_arm_night', 'alarm_disarm'],
  scene: ['turn_on'],
  script: ['turn_on', 'turn_off', 'toggle'],
  button: ['press'],
  input_button: ['press']
};

const ON_OFF_DOMAINS = new Set(['light', 'switch', 'fan', 'input_boolean', 'media_player']);

function isRecord(value: unknown): value is Json {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asList(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function utf8Length(text: string): number {
  return new TextEncoder().encode(text).length;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** hass.callWS / callService rejettent avec l'objet d'erreur brut du protocole HA, pas une Error. */
function rejectLikeHass(error: WsErrorPayload): Promise<never> {
  // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors -- fidélité au protocole HA
  return Promise.reject(error);
}

function jsonResponse(status: number, body: Json): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

/** Jeton aléatoire [A-Za-z0-9_-] (crypto.getRandomValues fonctionne aussi hors contexte sécurisé). */
function randomToken(length: number): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)), (byte) => alphabet[byte % alphabet.length]).join('');
}

/**
 * Empreinte hexadécimale d'un contenu : SHA-256 en contexte sécurisé (localhost), FNV-1a 64 bits
 * sinon (harnais ouvert depuis une tablette du réseau local, où crypto.subtle n'existe pas).
 */
async function contentHash(data: ArrayBuffer | string): Promise<string> {
  const bytes = typeof data === 'string' ? new TextEncoder().encode(data) : new Uint8Array(data);
  if (globalThis.crypto?.subtle) {
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
  }
  let hash = 0xcbf29ce484222325n;
  for (const byte of bytes) hash = BigInt.asUintN(64, (hash ^ BigInt(byte)) * 0x100000001b3n);
  return hash.toString(16).padStart(16, '0');
}

function utf8ToBase64(text: string): string {
  let binary = '';
  for (const byte of new TextEncoder().encode(text)) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64ToUtf8(base64: string): string {
  return new TextDecoder().decode(Uint8Array.from(atob(base64), (char) => char.charCodeAt(0)));
}

interface SanitizeOptions {
  /** Publication sans l'image de fond : les <image> sont retirées. */
  dropImages?: boolean;
  /** Document SVG imbriqué dans une <image> : un seul niveau d'imbrication est admis. */
  nested?: boolean;
}

/**
 * href d'une <image>, comme svg_sanitizer._clean_image_data_url : data-URL raster en base64, ou SVG
 * imbriqué (base64 ou encodé en pourcentage) assaini à son tour puis ré-encodé en base64 ; null sinon.
 */
function cleanImageHref(value: string, opts: SanitizeOptions): string | null {
  const match = IMAGE_DATA_URL_RE.exec(value);
  if (!match) return null;
  const type = match[1].toLowerCase();
  const isBase64 = match[2].split(';').some((param) => param.trim().toLowerCase() === 'base64');
  const payload = match[3];
  if (type === 'svg+xml') {
    if (opts.nested) return null;
    try {
      const nested = isBase64 ? base64ToUtf8(payload.replace(INVISIBLE_RE, '')) : decodeURIComponent(payload);
      return `data:image/svg+xml;base64,${utf8ToBase64(sanitizeSvg(nested, { dropImages: opts.dropImages, nested: true }))}`;
    } catch {
      return null; // contenu illisible ou refusé : l'image perd son href, comme côté serveur
    }
  }
  const compact = payload.replace(INVISIBLE_RE, '');
  if (!isBase64 || !BASE64_RE.test(compact)) return null;
  try {
    atob(compact);
  } catch {
    return null;
  }
  return `data:${RASTER_DATA_URL_TYPES[type]};base64,${compact}`;
}

/** href / xlink:href conservé (sous la forme href), comme svg_sanitizer._clean_href ; null sinon. */
function cleanHref(element: string, value: string, opts: SanitizeOptions): string | null {
  const candidate = value.trim();
  if (candidate.startsWith('#')) return element !== 'image' && FRAGMENT_RE.test(candidate) ? candidate : null;
  return element === 'image' ? cleanImageHref(candidate, opts) : null;
}

/**
 * Approximation du nettoyage serveur (svg_sanitizer.py, liste blanche) : rejette les déclarations
 * d'entités et les DOCTYPE à sous-ensemble interne (un DOCTYPE simple d'export LibreOffice ou
 * Illustrator est toléré) ainsi que les documents invalides ; retire scripts, contenus étrangers,
 * animations, liens, gestionnaires on* et références externes ; une <image> ne garde qu'une
 * data-URL raster ou un SVG imbriqué assaini. La référence reste l'assainisseur du backend.
 */
function sanitizeSvg(source: string, opts: SanitizeOptions = {}): string {
  if (/<!ENTITY|<!DOCTYPE[^>[]*\[/i.test(source)) {
    throw new WsCommandError('invalid_svg', 'Les déclarations d’entités (DOCTYPE à sous-ensemble interne, ENTITY) sont interdites.');
  }
  const doc = new DOMParser().parseFromString(source, 'image/svg+xml');
  const root = doc.documentElement;
  if (doc.getElementsByTagName('parsererror').length > 0 || root.localName !== 'svg') {
    throw new WsCommandError('invalid_svg', 'Document SVG invalide.');
  }
  root.querySelectorAll('script, foreignObject, iframe, a, style, animate, set, animateMotion, animateTransform').forEach((el) => el.remove());
  // Publication sans l'image de fond (case non cochée) : le backend retire les <image>.
  if (opts.dropImages) root.querySelectorAll('image').forEach((el) => el.remove());
  for (const el of [root, ...Array.from(root.querySelectorAll('*'))]) {
    let link: string | null = null;
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      if (name === 'href' || name === 'xlink:href') {
        if (name === 'href' || link === null) link = attr.value; // href l'emporte sur xlink:href
        el.removeAttribute(attr.name);
      } else if (name.startsWith('on')) {
        el.removeAttribute(attr.name);
      }
    }
    const href = link === null ? null : cleanHref(el.localName, link, opts);
    if (href !== null) el.setAttribute('href', href);
  }
  return new XMLSerializer().serializeToString(root);
}

/** Remplace les longues chaînes (SVG, data-URL…) pour garder un journal lisible et léger. */
function compactForLog(value: unknown, depth = 0): unknown {
  if (typeof value === 'string') return value.length > 200 ? `‹${value.length} caractères›` : value;
  if (depth > 4 || value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) {
    return value.length > 20 ? `‹tableau de ${value.length} éléments›` : value.map((item) => compactForLog(item, depth + 1));
  }
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, compactForLog(item, depth + 1)]));
}

/** Révision stockée d'un projet (0 s'il n'existe pas ou si elle est invalide), comme _revision_of. */
function revisionOf(project: Json | undefined): number {
  const revision: unknown = project?.revision;
  return typeof revision === 'number' && Number.isInteger(revision) && revision >= 0 ? revision : 0;
}

/** Validation légère des types, identique à _validate_project (complète les listes absentes). */
function validateProject(project: Json): void {
  const { name, category, created_at: createdAt } = project;
  if (name === undefined || name === null || name === '') project.name = 'Plan';
  else if (typeof name !== 'string' || name.length > 200) {
    throw new WsCommandError('invalid_project', 'name must be a string of at most 200 characters');
  }
  if (category !== undefined && category !== null && (typeof category !== 'string' || category.length > 64)) {
    throw new WsCommandError('invalid_project', 'category must be a string of at most 64 characters');
  }
  for (const key of LIST_FIELDS) {
    const value: unknown = project[key];
    if (value === undefined || value === null) project[key] = [];
    else if (!Array.isArray(value) || !value.every(isRecord)) throw new WsCommandError('invalid_project', `${key} must be a list of objects`);
  }
  for (const key of OBJECT_FIELDS) {
    const value: unknown = project[key];
    if (value !== undefined && value !== null && !isRecord(value)) throw new WsCommandError('invalid_project', `${key} must be an object`);
  }
  if (createdAt !== undefined && createdAt !== null && typeof createdAt !== 'string') {
    throw new WsCommandError('invalid_project', 'created_at must be a string');
  }
}

function nextMinorVersion(version: string): string {
  const [major, minor] = version.split(/[.-]/).map(Number);
  return Number.isFinite(major) && Number.isFinite(minor) ? `${major}.${minor + 1}.0` : `${version}-next`;
}

export class MockHomeAssistant {
  private settings: MockSettings;
  private states: Record<string, HassEntityState>;
  private readonly entities = createEntityRegistry();
  private readonly devices = createDeviceRegistry();
  private readonly projects = new Map<string, Json>();
  /** Images de fond par asset_id ; `storedAt` sert au délai de grâce avant suppression. */
  private readonly assets = new Map<string, { projectId: string; blob: Blob; mimeType: string; storedAt: number }>();
  /** Publications actives : fichier servi par le serveur de dev et empreinte du contenu. */
  private readonly publications = new Map<string, { file: string; hash: string; published_at: string; include_background: boolean }>();
  private readonly legacyWww = new Set(LEGACY_WWW_PROJECT_IDS);
  private readonly subscriptions = new Set<{ projectId: string; callback: (event: unknown) => void }>();
  private readonly hassListeners = new Set<(hass: MockHass) => void>();
  private readonly projectListeners = new Set<() => void>();
  private readonly logListeners = new Set<(entry: LogEntry) => void>();
  private snapshot: MockHass;

  private constructor(settings: MockSettings) {
    this.settings = { ...settings };
    this.states = createInitialStates(new Date().toISOString());
    this.refreshUpdateEntity();
    this.snapshot = this.buildHass();
  }

  /** Crée le faux Home Assistant et y dépose les projets de démonstration. */
  static async create(settings: MockSettings): Promise<MockHomeAssistant> {
    const mock = new MockHomeAssistant(settings);
    const background = new Blob([DEMO_BACKGROUND_SVG], { type: 'image/svg+xml' });
    const assetId = await mock.storeAsset('plan_etage001', background, 'image/svg+xml');
    for (const project of createSeedProjects(new Date().toISOString(), assetId)) mock.projects.set(project.id, project);
    return mock;
  }

  /** Objet `hass` courant (un nouvel objet à chaque changement). */
  get hass(): MockHass {
    return this.snapshot;
  }

  onHassChanged(listener: (hass: MockHass) => void): () => void {
    this.hassListeners.add(listener);
    return () => this.hassListeners.delete(listener);
  }

  onProjectsChanged(listener: () => void): () => void {
    this.projectListeners.add(listener);
    return () => this.projectListeners.delete(listener);
  }

  onLog(listener: (entry: LogEntry) => void): () => void {
    this.logListeners.add(listener);
    return () => this.logListeners.delete(listener);
  }

  /** Modifie les réglages simulés (droits, langue, thème, mise à jour, réseau). */
  updateSettings(patch: Partial<MockSettings>): void {
    this.settings = { ...this.settings, ...patch };
    if ('updateAvailable' in patch) this.refreshUpdateEntity();
    this.log('event', `Réglages du harnais : ${JSON.stringify(patch)}`);
    this.emitHass();
  }

  listProjectIds(): Array<{ id: string; name: string; revision: number }> {
    return [...this.projects.values()].map((p) => ({ id: p.id, name: p.name, revision: revisionOf(p) }));
  }

  /** Simule une sauvegarde depuis un autre appareil : déplace la première entité et incrémente la révision. */
  simulateExternalEdit(projectId: string): void {
    const project = this.projects.get(projectId);
    if (!project) return;
    const updated = structuredClone(project);
    const binding = Array.isArray(updated.bindings) ? updated.bindings.find(isRecord) : undefined;
    if (binding && isRecord(binding.position)) binding.position.x = Number(binding.position.x) + 0.5;
    updated.revision = revisionOf(project) + 1;
    updated.updated_at = new Date().toISOString();
    this.projects.set(projectId, updated);
    this.log('event', `Modification distante simulée : ${projectId} → révision ${updated.revision}`);
    this.notifyProject({ project_id: projectId, revision: updated.revision });
  }

  /** Simule la suppression du projet depuis un autre appareil. */
  simulateExternalDelete(projectId: string): void {
    if (!this.projects.has(projectId)) return;
    this.log('event', `Suppression distante simulée : ${projectId}`);
    this.removeProject(projectId);
  }

  // --- Objet hass -----------------------------------------------------------------------------

  private readonly connection: MockConnection = {
    subscribeMessage: (callback, msg) => this.subscribeMessage(callback, msg),
    sendMessagePromise: (msg) => this.callWS(msg)
  };

  private readonly callWS = async (msg: Json): Promise<unknown> => {
    const type = String(msg.type);
    this.log('ws', `→ ${type}`, msg);
    await this.networkDelay();
    if (this.settings.offline) return this.connectionLost(type);
    try {
      const result = await this.handleCommand(msg);
      this.log('ws', `← ${type}`, result);
      return result;
    } catch (error) {
      const payload: WsErrorPayload = error instanceof WsCommandError
        ? { code: error.code, message: error.message }
        : { code: 'unknown_error', message: String(error) };
      this.log('error', `✗ ${type} : ${payload.code}`, payload);
      return rejectLikeHass(payload);
    }
  };

  private readonly callService = async (domain: string, service: string, serviceData: Json = {}, target: Json = {}) => {
    this.log('service', `${domain}.${service}`, { service_data: serviceData, target });
    await this.networkDelay();
    if (this.settings.offline) return this.connectionLost(`${domain}.${service}`);
    if (!SERVICES[domain]?.includes(service) && !(domain === 'script' && this.states[`script.${service}`])) {
      const payload = { code: 'not_found', message: `Action ${domain}.${service} introuvable (non simulée par le harnais).` };
      this.log('error', `✗ ${domain}.${service} : not_found`, payload);
      return rejectLikeHass(payload);
    }
    const entityIds = domain === 'script' && service !== 'turn_on' && service !== 'turn_off' && service !== 'toggle'
      ? [`script.${service}`]
      : [...new Set([...asList(target.entity_id), ...asList(serviceData.entity_id)])];
    for (const entityId of entityIds) this.applyService(domain, service, entityId, serviceData);
    this.emitHass();
    return { context: { id: randomToken(26), parent_id: null, user_id: 'mock-user' }, response: null };
  };

  private readonly fetchWithAuth = async (path: string, init: RequestInit = {}): Promise<Response> => {
    const url = new URL(path, location.origin);
    const method = (init.method ?? 'GET').toUpperCase();
    this.log('http', `→ ${method} ${url.pathname}`);
    await this.networkDelay();
    if (this.settings.offline) {
      this.log('error', `✗ ${method} ${url.pathname} : connexion perdue`);
      throw new TypeError('Failed to fetch');
    }
    const response = await this.handleHttp(method, url.pathname, init);
    this.log(response.ok ? 'http' : 'error', `← ${response.status} ${method} ${url.pathname}`);
    return response;
  };

  private buildHass(): MockHass {
    const { admin, language, darkMode, offline } = this.settings;
    return {
      auth: { data: { hassUrl: location.origin, access_token: 'harnais' } },
      connection: this.connection,
      connected: !offline,
      states: this.states,
      entities: this.entities,
      devices: this.devices,
      areas: AREAS,
      floors: FLOORS,
      services: Object.fromEntries(
        Object.entries(SERVICES).map(([domain, names]) => [domain, Object.fromEntries(names.map((name) => [name, { name, fields: {} }]))])
      ),
      config: {
        location_name: 'Maison (harnais)',
        version: '2026.10.0',
        state: 'RUNNING',
        time_zone: 'Europe/Paris',
        country: 'FR',
        currency: 'EUR',
        language,
        unit_system: { length: 'km', mass: 'g', temperature: '°C', volume: 'L', pressure: 'Pa', wind_speed: 'm/s', accumulated_precipitation: 'mm' },
        components: ['frontend', 'http', 'websocket_api', 'home_architect', ...Object.keys(SERVICES)]
      },
      themes: { default_theme: 'default', default_dark_theme: null, themes: {}, darkMode, theme: 'default' },
      selectedTheme: { theme: 'default', dark: darkMode },
      panels: {
        'home-architect': {
          component_name: 'custom',
          url_path: 'home-architect',
          title: 'Home Architect',
          icon: 'mdi:floor-plan',
          require_admin: true,
          config: { _panel_custom: { name: 'home-architect-panel', module_url: '/home_architect_frontend/home_architect-panel.js' } }
        }
      },
      panelUrl: 'home-architect',
      language,
      selectedLanguage: language,
      locale: { language, number_format: 'language', time_format: 'language', date_format: 'language', first_weekday: 'language', time_zone: 'local' },
      user: {
        id: 'mock-user',
        name: admin ? 'Administrateur (harnais)' : 'Utilisateur (harnais)',
        is_admin: admin,
        is_owner: admin,
        credentials: [],
        mfa_modules: []
      },
      dockedSidebar: 'docked',
      enableShortcuts: true,
      suspendWhenHidden: false,
      vibrate: false,
      debugConnection: false,
      localize: (key) => key,
      hassUrl: (path = '') => new URL(path, location.origin).toString(),
      callWS: this.callWS,
      sendWS: (msg) => this.log('ws', `→ ${String(msg.type)} (sendWS, sans réponse)`, msg),
      callService: this.callService,
      callApi: (method, path) => {
        this.log('error', `callApi ${method} ${path} : non simulé`);
        return Promise.reject(new Error(`callApi ${method} ${path} non simulé par le harnais`));
      },
      fetchWithAuth: this.fetchWithAuth,
      formatEntityState: (stateObj, state) => {
        const value = state ?? stateObj.state;
        const unit = stateObj.attributes.unit_of_measurement;
        return typeof unit === 'string' && value !== '' && !Number.isNaN(Number(value)) ? `${value} ${unit}` : value;
      },
      formatEntityAttributeValue: (stateObj, attribute, value) => String(value ?? stateObj.attributes[attribute] ?? ''),
      formatEntityAttributeName: (_stateObj, attribute) => attribute
    };
  }

  private emitHass(): void {
    this.snapshot = this.buildHass();
    for (const listener of this.hassListeners) listener(this.snapshot);
  }

  private log(kind: LogKind, summary: string, detail?: unknown): void {
    const entry: LogEntry = { time: new Date(), kind, summary, detail: detail === undefined ? undefined : compactForLog(detail) };
    for (const listener of this.logListeners) listener(entry);
  }

  private async networkDelay(): Promise<void> {
    if (this.settings.latencyMs > 0) await delay(this.settings.latencyMs);
  }

  private connectionLost(what: string): Promise<never> {
    const payload = { code: ERR_CONNECTION_LOST, message: 'Connection lost' };
    this.log('error', `✗ ${what} : connexion perdue`, payload);
    return rejectLikeHass(payload);
  }

  // --- Commandes WebSocket ----------------------------------------------------------------------

  private requireAdmin(): void {
    if (!this.settings.admin) throw new WsCommandError('unauthorized', 'Unauthorized');
  }

  private requireProjectId(msg: Json): string {
    const id = msg.project_id;
    if (typeof id !== 'string' || !PROJECT_ID_PATTERN.test(id)) {
      throw new WsCommandError('invalid_format', "Identifiant de projet invalide @ data['project_id']");
    }
    return id;
  }

  private requireProject(msg: Json): Json {
    const id = this.requireProjectId(msg);
    const project = this.projects.get(id);
    if (!project) throw new WsCommandError('not_found', `Projet ${id} introuvable.`);
    return project;
  }

  private handleCommand(msg: Json): unknown {
    switch (msg.type) {
      case 'home_architect/list_projects':
        return {
          projects: [...this.projects.values()].map((p) => this.summarize(p)).sort((a, b) => String(a.name).localeCompare(String(b.name)))
        };
      case 'home_architect/get_project':
        return { project: this.withPublishInfo(this.requireProject(msg)) };
      case 'home_architect/get_projects':
        return { projects: [...this.projects.values()].map((p) => this.withPublishInfo(p)) };
      case 'home_architect/save_project':
        return this.saveProject(msg);
      case 'home_architect/delete_project':
        this.requireAdmin();
        return { success: true, removed_files: this.removeProject(String(this.requireProject(msg).id)) };
      case 'home_architect/publish_svg':
        return this.publishSvg(msg);
      case 'home_architect/unpublish':
        return this.unpublish(msg);
      case 'home_architect/save_svg_to_www':
        return this.saveSvgToWww(msg);
      case 'home_architect/check_updates':
        this.requireAdmin();
        return this.updateStatus();
      case 'home_architect/subscribe_project':
        // Commande d'abonnement appelée sans subscribeMessage : HA répond null, sans événements.
        this.requireProjectId(msg);
        return null;
      default:
        throw new WsCommandError('unknown_command', 'Unknown command.');
    }
  }

  private summarize(project: Json): Json {
    const count = (key: string) => (Array.isArray(project[key]) ? project[key].length : 0);
    const background = isRecord(project.background) ? project.background : undefined;
    return {
      id: project.id,
      name: project.name,
      category: project.category,
      created_at: project.created_at,
      updated_at: project.updated_at,
      revision: revisionOf(project),
      has_background: Boolean(background && (background.assetId || background.imageUrl)),
      publish: this.publishInfo(project.id) ?? null,
      counts: { walls: count('walls'), rooms: count('rooms'), bindings: count('bindings'), furniture: count('furniture') }
    };
  }

  private withPublishInfo(project: Json): Json {
    const copy = structuredClone(project);
    const info = this.publishInfo(project.id);
    if (info) copy.publish = info;
    return copy;
  }

  /** Même déroulé que storage.async_save_project + _prepare_project (ordre des contrôles compris). */
  private async saveProject(msg: Json): Promise<Json> {
    this.requireAdmin();
    const raw = msg.project;
    // Schéma voluptuous de la commande : erreurs « invalid_format ».
    if (!isRecord(raw) || typeof raw.id !== 'string' || !PROJECT_ID_PATTERN.test(raw.id)) {
      throw new WsCommandError('invalid_format', "Identifiant de projet invalide @ data['project']['id']");
    }
    const expected: unknown = msg.expected_revision;
    if (expected !== undefined && expected !== null && (typeof expected !== 'number' || !Number.isInteger(expected) || expected < 0)) {
      throw new WsCommandError('invalid_format', "expected_revision doit être un entier positif ou nul @ data['expected_revision']");
    }
    if (msg.force !== undefined && typeof msg.force !== 'boolean') {
      throw new WsCommandError('invalid_format', "force doit être un booléen @ data['force']");
    }

    const id = raw.id;
    const existing = this.projects.get(id);
    const currentRevision = revisionOf(existing);
    // Comme le backend : sans expected_revision (ou avec 0), le projet ne doit pas encore exister.
    if (msg.force !== true && (typeof expected === 'number' ? expected : 0) !== currentRevision) {
      throw new WsCommandError('conflict', `conflict:${currentRevision}`);
    }
    if (!existing && this.projects.size >= MAX_PROJECTS) {
      throw new WsCommandError('too_many_projects', `at most ${MAX_PROJECTS} projects can be stored`);
    }

    const project: Json = Object.fromEntries(
      Object.entries(structuredClone(raw)).filter(([key]) => !SERVER_FIELDS.has(key) && !key.startsWith('_'))
    );
    validateProject(project);

    let dataUrl: string | undefined;
    const background: Json | undefined = isRecord(project.background) ? { ...project.background } : undefined;
    if (background) {
      project.background = background;
      const imageUrl: unknown = background.imageUrl;
      if (typeof imageUrl === 'string' && imageUrl.startsWith('data:')) {
        dataUrl = imageUrl;
        background.imageUrl = '';
      } else if (!(typeof imageUrl === 'string' && imageUrl.length <= MAX_IMAGE_URL_LENGTH && (imageUrl === '' || EXTERNAL_IMAGE_URL_RE.test(imageUrl)))) {
        background.imageUrl = ''; // blob:, javascript:, type inattendu…
      }
    }

    const bytes = utf8Length(JSON.stringify(project));
    if (bytes > MAX_PROJECT_BYTES) {
      // Format exploité par ha-api (toHaApiError) pour afficher la taille et la limite.
      throw new WsCommandError('payload_too_large', `payload_too_large:${bytes}:${MAX_PROJECT_BYTES}`);
    }

    if (background && dataUrl !== undefined) {
      const { blob, mimeType } = this.decodeDataUrl(dataUrl);
      background.assetId = await this.storeAsset(id, blob, mimeType);
      background.mimeType = mimeType;
    } else if (background) {
      const assetId: unknown = background.assetId;
      if (assetId === undefined || assetId === null || assetId === '') {
        delete background.assetId;
      } else if (typeof assetId !== 'string' || !ASSET_ID_RE.test(assetId)) {
        throw new WsCommandError('invalid_project', 'invalid background.assetId');
      } else {
        // « Enregistrer sous » : l'image d'un autre projet est copiée sous le nouvel identifiant.
        const adopted = this.adoptAsset(assetId, id);
        if (adopted === null) this.log('error', `Image de fond ${assetId} introuvable (conservée telle quelle, comme le backend)`);
        else background.assetId = adopted;
      }
    }

    const now = new Date().toISOString();
    const previousCreatedAt: unknown = existing?.created_at;
    project.created_at = typeof previousCreatedAt === 'string'
      ? previousCreatedAt
      : typeof project.created_at === 'string' ? project.created_at : now;
    project.updated_at = now;
    project.revision = currentRevision + 1;
    project.schema_version = 2;
    this.projects.set(id, project);
    const savedAssetId = typeof background?.assetId === 'string' ? background.assetId : null;
    // L'image qui vient d'être déréférencée repart pour un délai de grâce complet (annulation après sauvegarde).
    const previousBackground: unknown = existing?.background;
    const released = isRecord(previousBackground) && typeof previousBackground.assetId === 'string' ? previousBackground.assetId : null;
    const releasedAsset = released !== null && released !== savedAssetId ? this.assets.get(released) : undefined;
    if (releasedAsset?.projectId === id) releasedAsset.storedAt = Date.now();
    this.removeUnreferencedAssets(id, savedAssetId, ASSET_GRACE_MS);
    this.notifyProject({ project_id: id, revision: project.revision });
    return { success: true, id, revision: project.revision, updated_at: now, asset_id: savedAssetId };
  }

  /** Décode une image de fond héritée en data-URL (même contrôle que le téléversement HTTP). */
  private decodeDataUrl(dataUrl: string): { blob: Blob; mimeType: string } {
    const match = DATA_URL_RE.exec(dataUrl);
    const mimeType = match?.[1].toLowerCase() ?? '';
    if (!match || !UPLOAD_MIME_EXTENSIONS[mimeType]) {
      throw new WsCommandError('invalid_project', 'invalid background image: unsupported data URL');
    }
    let binary: string;
    try {
      binary = atob(match[2].replace(/\s/g, ''));
    } catch {
      throw new WsCommandError('invalid_project', 'invalid background image: invalid base64');
    }
    if (binary.length > MAX_UPLOAD_BYTES) throw new WsCommandError('invalid_project', 'invalid background image: too large');
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    if (mimeType === 'image/svg+xml') {
      try {
        return { blob: new Blob([sanitizeSvg(new TextDecoder().decode(bytes))], { type: mimeType }), mimeType };
      } catch {
        throw new WsCommandError('invalid_project', 'invalid background image: invalid SVG');
      }
    }
    return { blob: new Blob([bytes], { type: mimeType }), mimeType };
  }

  /** Rattache à `projectId` l'image d'un autre projet (assets.adopt_background) ; null si la source n'existe pas. */
  private adoptAsset(assetId: string, projectId: string): string | null {
    const match = ASSET_ID_RE.exec(assetId);
    if (!match) return null;
    if (match[1] === projectId) return assetId;
    const targetId = `${projectId}-${match[2]}.${match[3]}`;
    const existingTarget = this.assets.get(targetId);
    if (existingTarget) {
      existingTarget.storedAt = Date.now();
      return targetId;
    }
    const source = this.assets.get(assetId);
    if (!source) return null;
    this.assets.set(targetId, { projectId, blob: source.blob, mimeType: source.mimeType, storedAt: Date.now() });
    return targetId;
  }

  /** Supprime un projet et ses fichiers ; renvoie les fichiers retirés (comme le backend). */
  private removeProject(projectId: string): string[] {
    const project = this.projects.get(projectId);
    const removed: string[] = [];
    for (const [assetId, asset] of this.assets) {
      if (asset.projectId !== projectId) continue;
      this.assets.delete(assetId);
      removed.push(`backgrounds/${assetId}`);
    }
    const publication = this.publications.get(projectId);
    if (publication) {
      this.deletePublishedFile(publication.file);
      removed.push(`published/${publication.file}`);
      this.publications.delete(projectId);
    }
    if (this.legacyWww.delete(projectId)) removed.push(`www/plan_${projectId}.svg`);
    this.projects.delete(projectId);
    this.notifyProject({ project_id: projectId, revision: revisionOf(project), deleted: true });
    return removed;
  }

  private async publishSvg(msg: Json): Promise<Json> {
    this.requireAdmin();
    const project = this.requireProject(msg);
    if (typeof msg.svg_content !== 'string') throw new WsCommandError('invalid_format', 'svg_content doit être une chaîne.');
    if (msg.include_background !== undefined && typeof msg.include_background !== 'boolean') {
      throw new WsCommandError('invalid_format', 'include_background doit être un booléen.');
    }
    const size = utf8Length(msg.svg_content);
    if (size > MAX_PUBLISH_BYTES) {
      throw new WsCommandError('payload_too_large', `payload_too_large:${size}:${MAX_PUBLISH_BYTES}`);
    }
    const svg = sanitizeSvg(msg.svg_content, { dropImages: msg.include_background !== true });
    const projectId = String(project.id);
    // Le jeton (donc l'URL) reste stable d'une publication à l'autre ; unpublish le régénère.
    const file = this.publications.get(projectId)?.file ?? `${projectId}-${randomToken(32)}.svg`;
    const written = await fetch(`${PUBLISHED_URL_PREFIX}${file}`, { method: 'PUT', body: svg, headers: { 'Content-Type': 'image/svg+xml' } })
      .then((response) => response.ok, () => false);
    if (!written) throw new WsCommandError('write_failed', "Écriture du SVG publié impossible (serveur de développement).");
    this.publications.set(projectId, {
      file,
      hash: (await contentHash(svg)).slice(0, 12),
      published_at: new Date().toISOString(),
      include_background: msg.include_background === true
    });
    this.notifyProject({ project_id: projectId, revision: revisionOf(project) });
    return this.publishInfo(projectId) ?? {};
  }

  /** Retire la publication ET l'ancien fichier /config/www (comme assets.unpublish). */
  private unpublish(msg: Json): Json {
    this.requireAdmin();
    const project = this.requireProject(msg);
    const projectId = String(project.id);
    const removed: string[] = [];
    const publication = this.publications.get(projectId);
    if (publication) {
      this.deletePublishedFile(publication.file);
      this.publications.delete(projectId);
      removed.push(`published/${publication.file}`);
    }
    if (this.legacyWww.delete(projectId)) removed.push(`www/plan_${projectId}.svg`);
    this.notifyProject({ project_id: projectId, revision: revisionOf(project) });
    return { success: true, removed_files: removed };
  }

  /**
   * Commande dépréciée des frontends 1.0.x (assets.save_svg_to_www) : seul l'ancien plan public
   * www/plan_<id>.svg peut être écrit, après assainissement (images conservées). Le harnais ne
   * sert pas /local/ : seule l'existence du fichier est simulée (legacy_path).
   */
  private saveSvgToWww(msg: Json): Json {
    this.requireAdmin();
    const filename: unknown = msg.filename;
    const match = typeof filename === 'string' ? LEGACY_WWW_FILENAME_RE.exec(filename) : null;
    if (!match) {
      throw new WsCommandError('invalid_format', "Nom de fichier invalide (plan_<project_id>.svg attendu) @ data['filename']");
    }
    if (typeof msg.svg_content !== 'string' || msg.svg_content === '') {
      throw new WsCommandError('invalid_format', 'svg_content doit être une chaîne non vide.');
    }
    const size = utf8Length(msg.svg_content);
    if (size > MAX_PUBLISH_BYTES) {
      throw new WsCommandError('payload_too_large', `payload_too_large:${size}:${MAX_PUBLISH_BYTES}`);
    }
    sanitizeSvg(msg.svg_content);
    this.legacyWww.add(match[1]);
    this.log('event', `Commande dépréciée save_svg_to_www : www/${match[0]} écrit (ancien frontend)`);
    return { success: true, path: `/local/${match[0]}` };
  }

  private publishInfo(projectId: string): Json | undefined {
    const publication = this.publications.get(projectId);
    if (!publication) return undefined;
    const path = `${PUBLISHED_URL_PREFIX}${publication.file}`;
    const info: Json = {
      url: `${path}?v=${publication.hash}`,
      path,
      hash: publication.hash,
      published_at: publication.published_at,
      include_background: publication.include_background
    };
    if (this.legacyWww.has(projectId)) info.legacy_path = `/local/plan_${projectId}.svg`;
    return info;
  }

  private deletePublishedFile(file: string): void {
    void fetch(`${PUBLISHED_URL_PREFIX}${file}`, { method: 'DELETE' }).catch((error: unknown) =>
      this.log('error', `Suppression du fichier publié ${file} impossible`, String(error))
    );
  }

  private updateStatus(): Json {
    const latest = this.settings.updateAvailable ? nextMinorVersion(VERSION) : VERSION;
    return {
      installed_version: VERSION,
      latest_version: latest,
      update_available: this.settings.updateAvailable,
      skipped_version: null,
      release_url: `${RELEASE_URL}/tag/v${latest}`,
      release_notes: this.settings.updateAvailable
        ? `## Home Architect ${latest}\n\n- Version simulée par le harnais de développement.\n- Notes de version **Markdown** de démonstration.`
        : '',
      update_entity_id: 'update.home_architect'
    };
  }

  /** Entité update.home_architect (notification seulement), alignée sur check_updates. */
  private refreshUpdateEntity(): void {
    const status = this.updateStatus();
    const now = new Date().toISOString();
    this.states = {
      ...this.states,
      'update.home_architect': {
        entity_id: 'update.home_architect',
        state: status.update_available ? 'on' : 'off',
        attributes: {
          friendly_name: 'Home Architect',
          installed_version: status.installed_version,
          latest_version: status.latest_version,
          release_url: status.release_url,
          release_summary: status.update_available ? `Home Architect ${status.latest_version}` : null,
          title: 'Home Architect',
          skipped_version: null,
          in_progress: false,
          auto_update: false,
          supported_features: 16
        },
        last_changed: now,
        last_updated: now,
        context: { id: randomToken(26), parent_id: null, user_id: null }
      }
    };
  }

  // --- Abonnements ------------------------------------------------------------------------------

  private async subscribeMessage(callback: (event: unknown) => void, msg: Json): Promise<Unsubscribe> {
    const type = String(msg.type);
    this.log('ws', `→ ${type} (abonnement)`, msg);
    await this.networkDelay();
    if (this.settings.offline) return this.connectionLost(type);
    if (type !== 'home_architect/subscribe_project') {
      this.log('error', `✗ ${type} : unknown_command`);
      return rejectLikeHass({ code: 'unknown_command', message: 'Unknown command.' });
    }
    let projectId: string;
    try {
      projectId = this.requireProjectId(msg);
    } catch (error) {
      const payload = { code: 'invalid_format', message: error instanceof Error ? error.message : String(error) };
      this.log('error', `✗ ${type} : invalid_format`, payload);
      return rejectLikeHass(payload);
    }
    const subscription = { projectId, callback };
    this.subscriptions.add(subscription);
    return () => {
      this.subscriptions.delete(subscription);
      this.log('ws', `Fin de l'abonnement ${projectId}`);
      return Promise.resolve();
    };
  }

  /** Diffuse un événement de projet aux abonnés (de façon asynchrone, comme un message WS). */
  private notifyProject(event: ProjectEvent): void {
    for (const listener of this.projectListeners) listener();
    const targets = [...this.subscriptions].filter((subscription) => subscription.projectId === event.project_id);
    if (targets.length === 0) return;
    this.log('event', `subscribe_project → ${targets.length} abonné(s)`, event);
    setTimeout(() => {
      for (const subscription of targets) {
        if (this.subscriptions.has(subscription)) subscription.callback({ ...event });
      }
    }, this.settings.latencyMs);
  }

  // --- Vues HTTP (images de fond) ---------------------------------------------------------------

  private async handleHttp(method: string, pathname: string, init: RequestInit): Promise<Response> {
    const upload = /^\/api\/home_architect\/background\/([^/]+)$/.exec(pathname);
    if (upload) {
      return method === 'POST' ? this.uploadBackground(decodeURIComponent(upload[1]), init) : jsonResponse(405, { message: 'Method Not Allowed' });
    }
    const read = /^\/api\/home_architect\/background\/([^/]+)\/([^/]+)$/.exec(pathname);
    if (read) {
      return method === 'GET' ? this.readBackground(decodeURIComponent(read[1]), decodeURIComponent(read[2])) : jsonResponse(405, { message: 'Method Not Allowed' });
    }
    return jsonResponse(404, { message: 'Not Found (route non simulée par le harnais)' });
  }

  private async uploadBackground(projectId: string, init: RequestInit): Promise<Response> {
    if (!this.settings.admin) return jsonResponse(403, { message: 'Forbidden' });
    if (!PROJECT_ID_PATTERN.test(projectId)) return jsonResponse(400, { message: 'Invalid project id' });
    const mimeType = (new Headers(init.headers).get('Content-Type') ?? '').split(';')[0].trim().toLowerCase();
    if (!UPLOAD_MIME_EXTENSIONS[mimeType]) return jsonResponse(415, { message: `Unsupported media type: ${mimeType || '(aucun)'}` });
    const body = await new Response(init.body ?? null).blob();
    if (body.size > MAX_UPLOAD_BYTES) return jsonResponse(413, { message: 'Payload too large' });
    let blob = new Blob([body], { type: mimeType });
    if (mimeType === 'image/svg+xml') {
      try {
        blob = new Blob([sanitizeSvg(await body.text())], { type: mimeType });
      } catch {
        return jsonResponse(400, { message: 'Invalid SVG' });
      }
    }
    const assetId = await this.storeAsset(projectId, blob, mimeType);
    return jsonResponse(200, { asset_id: assetId, mime_type: mimeType, size: blob.size });
  }

  private readBackground(projectId: string, assetId: string): Response {
    const asset = this.assets.get(assetId);
    if (!asset || asset.projectId !== projectId || !assetId.startsWith(`${projectId}-`)) {
      return jsonResponse(404, { message: 'Not Found' });
    }
    const headers: Record<string, string> = {
      'Content-Type': asset.mimeType,
      'Cache-Control': 'private, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff'
    };
    if (asset.mimeType === 'image/svg+xml') {
      headers['Content-Security-Policy'] = "default-src 'none'; style-src 'unsafe-inline'; img-src data:; sandbox";
    }
    return new Response(asset.blob, { status: 200, headers });
  }

  /**
   * Stocke un asset sous `<project_id>-<empreinte[:12]>.<ext>` (même nommage que le backend).
   * Un contenu identique réutilise le même asset et repousse son nettoyage (_write_or_touch).
   */
  private async storeAsset(projectId: string, blob: Blob, mimeType: string): Promise<string> {
    const hash = (await contentHash(await blob.arrayBuffer())).slice(0, 12);
    const assetId = `${projectId}-${hash}.${UPLOAD_MIME_EXTENSIONS[mimeType]}`;
    this.assets.set(assetId, { projectId, blob, mimeType, storedAt: Date.now() });
    return assetId;
  }

  /**
   * Après une sauvegarde : supprime les assets du projet qu'il ne référence plus ET plus anciens que
   * `minAgeMs`. Comme le backend (délai de grâce de 24 h), une image téléversée mais pas encore
   * sauvegardée, ou celle qu'une annulation après sauvegarde fait réapparaître, reste disponible.
   */
  private removeUnreferencedAssets(projectId: string, keep: string | null, minAgeMs: number): void {
    const now = Date.now();
    for (const [assetId, asset] of this.assets) {
      if (asset.projectId === projectId && assetId !== keep && now - asset.storedAt >= minAgeMs) {
        this.assets.delete(assetId);
        this.log('event', `Image de fond non référencée supprimée : ${assetId}`);
      }
    }
  }

  // --- Services ---------------------------------------------------------------------------------

  private applyService(domain: string, service: string, entityId: string, data: Json): void {
    const current = this.states[entityId];
    if (!current) {
      this.log('error', `${domain}.${service} : entité ${entityId} inconnue (ignorée, comme HA)`);
      return;
    }
    if (current.state === 'unavailable') {
      this.log('error', `${domain}.${service} : ${entityId} indisponible (ignorée, comme HA)`);
      return;
    }
    const entityDomain = entityId.split('.')[0];
    // homeassistant.turn_on/turn_off/toggle délègue au service du domaine de l'entité.
    const effectiveDomain = domain === 'homeassistant' ? entityDomain : domain;
    const attributes = { ...current.attributes };
    let state = current.state;
    const now = new Date().toISOString();
    const isOn = !['off', 'closed', 'locked', 'idle', 'standby', 'paused', 'unknown'].includes(current.state);

    if (ON_OFF_DOMAINS.has(effectiveDomain) && ['turn_on', 'turn_off', 'toggle'].includes(service)) {
      const turnOn = service === 'turn_on' || (service === 'toggle' && !isOn);
      state = turnOn ? 'on' : 'off';
      if (effectiveDomain === 'light') {
        if (turnOn) {
          const pct = typeof data.brightness_pct === 'number' ? Math.round((data.brightness_pct / 100) * 255) : undefined;
          attributes.brightness = typeof data.brightness === 'number' ? data.brightness : pct ?? attributes.brightness ?? 255;
          if (Array.isArray(data.rgb_color)) attributes.rgb_color = data.rgb_color;
          attributes.color_mode = attributes.supported_color_modes?.[0] ?? 'onoff';
        } else {
          attributes.brightness = null;
          attributes.color_mode = null;
        }
      }
    } else if (effectiveDomain === 'cover') {
      if (service === 'set_cover_position' && typeof data.position === 'number') {
        attributes.current_position = data.position;
        state = data.position > 0 ? 'open' : 'closed';
      } else if (service !== 'stop_cover') {
        const open = service === 'open_cover' || (service === 'toggle' && current.state === 'closed') || service === 'turn_on';
        state = open ? 'open' : 'closed';
        if ('current_position' in attributes) attributes.current_position = open ? 100 : 0;
      }
    } else if (effectiveDomain === 'lock' && ['lock', 'unlock', 'open'].includes(service)) {
      state = service === 'lock' ? 'locked' : service === 'open' ? 'open' : 'unlocked';
    } else if (effectiveDomain === 'climate') {
      if (service === 'set_temperature' && typeof data.temperature === 'number') attributes.temperature = data.temperature;
      if (service === 'set_hvac_mode' && typeof data.hvac_mode === 'string') state = data.hvac_mode;
      if (service === 'turn_off' || (service === 'toggle' && current.state !== 'off')) state = 'off';
      else if (service === 'turn_on' || service === 'toggle') {
        const modes: unknown[] = Array.isArray(attributes.hvac_modes) ? attributes.hvac_modes : [];
        state = modes.find((mode): mode is string => typeof mode === 'string' && mode !== 'off') ?? 'heat';
      }
      attributes.hvac_action = state === 'off' ? 'off' : 'heating';
    } else if (effectiveDomain === 'media_player') {
      if (service === 'media_play') state = 'playing';
      else if (service === 'media_pause') state = 'paused';
      else if (service === 'media_stop') state = 'idle';
      else if (service === 'media_play_pause') state = current.state === 'playing' ? 'paused' : 'playing';
      else if (service === 'volume_set' && typeof data.volume_level === 'number') attributes.volume_level = data.volume_level;
      else if (service === 'volume_mute') attributes.is_volume_muted = data.is_volume_muted === true;
    } else if (effectiveDomain === 'alarm_control_panel') {
      state = service === 'alarm_disarm' ? 'disarmed' : service.replace('alarm_arm_', 'armed_');
    } else if (effectiveDomain === 'scene' || effectiveDomain === 'button' || effectiveDomain === 'input_button') {
      state = now; // l'état d'une scène ou d'un bouton est l'horodatage de sa dernière activation
    } else if (effectiveDomain === 'script') {
      if (service === 'turn_off' || (service === 'toggle' && current.state === 'on')) {
        state = 'off';
      } else {
        state = 'on';
        attributes.last_triggered = now;
        setTimeout(() => this.finishScript(entityId), 1000);
      }
    } else {
      this.log('error', `${domain}.${service} : sans effet simulé sur ${entityId}`);
      return;
    }

    this.states = {
      ...this.states,
      [entityId]: {
        ...current,
        state,
        attributes,
        last_changed: state !== current.state ? now : current.last_changed,
        last_updated: now,
        context: { id: randomToken(26), parent_id: null, user_id: 'mock-user' }
      }
    };
  }

  /** Un script simulé se termine au bout d'une seconde. */
  private finishScript(entityId: string): void {
    const current = this.states[entityId];
    if (current?.state !== 'on') return;
    this.states = { ...this.states, [entityId]: { ...current, state: 'off', last_changed: new Date().toISOString(), last_updated: new Date().toISOString() } };
    this.emitHass();
  }
}
