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
const RELEASE_URL = 'https://github.com/SocrateMobile/home-architect/releases';

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

/**
 * Approximation du nettoyage serveur (svg_sanitizer.py, liste blanche) : rejette DOCTYPE/ENTITY
 * et les documents invalides, retire scripts, contenus étrangers, animations, liens, gestionnaires
 * on* et références externes. La référence reste l'assainisseur du backend.
 */
function sanitizeSvg(source: string): string {
  if (/<!DOCTYPE|<!ENTITY/i.test(source)) throw new WsCommandError('invalid_svg', 'DOCTYPE et ENTITY sont interdits.');
  const doc = new DOMParser().parseFromString(source, 'image/svg+xml');
  const root = doc.documentElement;
  if (doc.getElementsByTagName('parsererror').length > 0 || root.localName !== 'svg') {
    throw new WsCommandError('invalid_svg', 'Document SVG invalide.');
  }
  root.querySelectorAll('script, foreignObject, iframe, a, style, animate, set, animateMotion, animateTransform').forEach((el) => el.remove());
  for (const el of [root, ...Array.from(root.querySelectorAll('*'))]) {
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      const isLink = name === 'href' || name === 'xlink:href';
      if (name.startsWith('on') || (isLink && !/^(#|data:image\/(png|jpeg|webp|gif);base64,)/i.test(attr.value.trim()))) {
        el.removeAttribute(attr.name);
      }
    }
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
  private readonly assets = new Map<string, { projectId: string; blob: Blob; mimeType: string }>();
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
    return [...this.projects.values()].map((p) => ({ id: p.id, name: p.name, revision: p.revision ?? 0 }));
  }

  /** Simule une sauvegarde depuis un autre appareil : déplace la première entité et incrémente la révision. */
  simulateExternalEdit(projectId: string): void {
    const project = this.projects.get(projectId);
    if (!project) return;
    const updated = structuredClone(project);
    const binding = Array.isArray(updated.bindings) ? updated.bindings.find(isRecord) : undefined;
    if (binding && isRecord(binding.position)) binding.position.x = Number(binding.position.x) + 0.5;
    updated.revision = (project.revision ?? 0) + 1;
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
      revision: project.revision ?? 0,
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

  private async saveProject(msg: Json): Promise<Json> {
    this.requireAdmin();
    const raw = msg.project;
    if (!isRecord(raw) || typeof raw.id !== 'string' || !PROJECT_ID_PATTERN.test(raw.id)) {
      throw new WsCommandError('invalid_project', 'Projet invalide : identifiant manquant ou incorrect.');
    }
    const bytes = utf8Length(JSON.stringify(raw));
    if (bytes > MAX_PROJECT_BYTES) {
      throw new WsCommandError('payload_too_large', `Projet trop volumineux : ${bytes} octets (maximum ${MAX_PROJECT_BYTES}).`);
    }
    for (const key of ['walls', 'openings', 'rooms', 'bindings', 'furniture']) {
      if (raw[key] !== undefined && !Array.isArray(raw[key])) throw new WsCommandError('invalid_project', `Champ « ${key} » invalide (liste attendue).`);
    }
    for (const key of ['grid', 'background', 'exportFrame']) {
      if (raw[key] !== undefined && raw[key] !== null && !isRecord(raw[key])) throw new WsCommandError('invalid_project', `Champ « ${key} » invalide (objet attendu).`);
    }
    const expected: unknown = msg.expected_revision;
    if (expected !== undefined && (typeof expected !== 'number' || !Number.isInteger(expected))) {
      throw new WsCommandError('invalid_format', 'expected_revision doit être un entier.');
    }

    const id = raw.id;
    const existing = this.projects.get(id);
    const currentRevision: number = existing?.revision ?? 0;
    if (expected !== undefined && msg.force !== true && expected !== currentRevision) {
      throw new WsCommandError('conflict', `conflict:${currentRevision}`);
    }

    const project = structuredClone(raw);
    delete project.publish;
    delete project.revision;
    const background = project.background;
    if (isRecord(background) && typeof background.imageUrl === 'string' && background.imageUrl.startsWith('data:')) {
      const match = DATA_URL_RE.exec(background.imageUrl);
      const mimeType = match?.[1].toLowerCase() ?? '';
      if (!match || !UPLOAD_MIME_EXTENSIONS[mimeType]) {
        throw new WsCommandError('invalid_project', "Image de fond en data-URL non prise en charge.");
      }
      const binary = atob(match[2].replace(/\s/g, ''));
      const blob = new Blob([Uint8Array.from(binary, (char) => char.charCodeAt(0))], { type: mimeType });
      project.background = { ...background, imageUrl: '', assetId: await this.storeAsset(id, blob, mimeType), mimeType };
    }

    const now = new Date().toISOString();
    project.revision = currentRevision + 1;
    project.updated_at = now;
    project.created_at = existing?.created_at ?? (typeof project.created_at === 'string' ? project.created_at : now);
    project.schema_version = 2;
    this.projects.set(id, project);
    this.removeUnreferencedAssets(id);
    this.notifyProject({ project_id: id, revision: project.revision });
    return { success: true, id, revision: project.revision, updated_at: now };
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
    this.notifyProject({ project_id: projectId, revision: project?.revision ?? 0, deleted: true });
    return removed;
  }

  private async publishSvg(msg: Json): Promise<Json> {
    this.requireAdmin();
    const project = this.requireProject(msg);
    if (typeof msg.svg_content !== 'string') throw new WsCommandError('invalid_format', 'svg_content doit être une chaîne.');
    if (msg.include_background !== undefined && typeof msg.include_background !== 'boolean') {
      throw new WsCommandError('invalid_format', 'include_background doit être un booléen.');
    }
    if (utf8Length(msg.svg_content) > MAX_PUBLISH_BYTES) {
      throw new WsCommandError('payload_too_large', `SVG trop volumineux (maximum ${MAX_PUBLISH_BYTES} octets).`);
    }
    const svg = sanitizeSvg(msg.svg_content);
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
    this.notifyProject({ project_id: projectId, revision: project.revision ?? 0 });
    return this.publishInfo(projectId) ?? {};
  }

  private unpublish(msg: Json): Json {
    this.requireAdmin();
    const project = this.requireProject(msg);
    const projectId = String(project.id);
    const publication = this.publications.get(projectId);
    if (publication) {
      this.deletePublishedFile(publication.file);
      this.publications.delete(projectId);
    }
    this.notifyProject({ project_id: projectId, revision: project.revision ?? 0 });
    return { success: true };
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
    return new Response(asset.blob, {
      status: 200,
      headers: { 'Content-Type': asset.mimeType, 'Cache-Control': 'private, max-age=31536000, immutable' }
    });
  }

  /** Stocke un asset sous `<project_id>-<empreinte[:12]>.<ext>` (même nommage que le backend). */
  private async storeAsset(projectId: string, blob: Blob, mimeType: string): Promise<string> {
    const hash = (await contentHash(await blob.arrayBuffer())).slice(0, 12);
    const assetId = `${projectId}-${hash}.${UPLOAD_MIME_EXTENSIONS[mimeType]}`;
    this.assets.set(assetId, { projectId, blob, mimeType });
    return assetId;
  }

  /** Après une sauvegarde : supprime les assets du projet que le projet ne référence plus. */
  private removeUnreferencedAssets(projectId: string): void {
    const background = this.projects.get(projectId)?.background;
    const referenced = isRecord(background) ? background.assetId : undefined;
    for (const [assetId, asset] of this.assets) {
      if (asset.projectId === projectId && assetId !== referenced) this.assets.delete(assetId);
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
