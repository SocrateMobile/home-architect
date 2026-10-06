import { EntityBinding, Opening, Room } from '../core/types';
import { bindingDisplayName, entityDomain } from '../core/project-model';

/**
 * Affichage des entités HA sur le plan (module pur, testé par tests/frontend/canvas-render.test.ts) :
 * texte d'état, couleur, effets (radar, lumière, ventilateur), badge de valeur, température des pièces,
 * teinte des pièces éclairées et heatmap. Le texte d'état vient de hass.formatEntityState quand Home
 * Assistant le fournit (langue, unité et précision de l'utilisateur) ; la couleur et les effets
 * dépendent du domaine et de la device_class (constats F57, F58, F109, F132).
 */

/** État d'une entité HA (sous-ensemble de HassEntity). */
export interface HassEntityState {
  entity_id?: string;
  state: string;
  attributes?: Record<string, unknown>;
}

/** Sous-ensemble de l'objet `hass` lu par l'affichage du plan. */
export interface HassDisplayContext {
  states?: Record<string, HassEntityState | undefined>;
  entities?: unknown;
  config?: { unit_system?: { temperature?: string } };
  themes?: { darkMode?: boolean };
  locale?: { language?: string; number_format?: string };
  language?: string;
  formatEntityState?: (stateObj: HassEntityState, state?: string) => string;
}

/** Classe de couleur d'une épingle. */
export type PinStatus = 'on' | 'off' | 'alert' | 'info' | 'missing';

export interface EntityView {
  /** Nom saisi par l'utilisateur, sinon friendly_name courant, sinon entity_id. */
  name: string;
  stateText: string;
  status: PinStatus;
  icon: string;
  /** Entité absente de hass.states : supprimée ou renommée dans Home Assistant (constat F132). */
  orphan: boolean;
  /** État unavailable / unknown : aucune valeur n'est affichée en badge. */
  unavailable: boolean;
  /** Mouvement, présence ou occupation détectés (anneau animé). */
  radar: boolean;
  lightOn: boolean;
  fanOn: boolean;
  playing: boolean;
  /** Valeur courte (température, position d'un volet), null si rien à afficher. */
  badge: string | null;
}

export const MISSING_ENTITY_TEXT = 'Entité introuvable';
const PENDING_TEXT = '…';
const ORPHAN_ICON = '⚠️';
const DEFAULT_ICON = '⚡';

/** Icône par défaut d'une épingle selon le domaine (la liaison n'enregistre une icône que si l'utilisateur la choisit). */
const DOMAIN_ICONS: Record<string, string> = {
  light: '💡',
  switch: '🔌',
  input_boolean: '🔘',
  binary_sensor: '🚨',
  sensor: '📊',
  climate: '🌡️',
  water_heater: '♨️',
  humidifier: '💧',
  camera: '📷',
  media_player: '📺',
  remote: '🎛️',
  cover: '🪟',
  valve: '🚰',
  fan: '💨',
  lock: '🔒',
  alarm_control_panel: '🛡️',
  siren: '📢',
  scene: '🎬',
  script: '📜',
  automation: '🤖',
  button: '🔘',
  input_button: '🔘',
  person: '👤',
  device_tracker: '📍',
  vacuum: '🧹'
};

/** Icônes plus précises selon la device_class. */
const DEVICE_CLASS_ICONS: Record<string, string> = {
  'binary_sensor.motion': '🏃',
  'binary_sensor.occupancy': '🏃',
  'binary_sensor.presence': '🏃',
  'binary_sensor.door': '🚪',
  'binary_sensor.garage_door': '🚪',
  'binary_sensor.window': '🪟',
  'binary_sensor.smoke': '🔥',
  'binary_sensor.gas': '🔥',
  'binary_sensor.carbon_monoxide': '🔥',
  'binary_sensor.moisture': '💧',
  'sensor.temperature': '🌡️',
  'sensor.humidity': '💧',
  'sensor.power': '⚡',
  'sensor.energy': '⚡',
  'cover.garage': '🚪',
  'cover.gate': '🚧',
  'cover.door': '🚪'
};

/** binary_sensor : textes de repli (sans hass.formatEntityState) et état d'alerte par device_class. */
interface BinaryClassInfo {
  on: string;
  off: string;
  /** État qui signale une alerte (texte rouge). */
  alertWhen?: 'on' | 'off';
  /** Couleur de l'autre état pour une classe surveillée (défaut 'info'). */
  calm?: PinStatus;
}

const BINARY_CLASSES: Record<string, BinaryClassInfo> = {
  motion: { on: 'Mouvement', off: 'Au repos', alertWhen: 'on' },
  occupancy: { on: 'Occupé', off: 'Libre', alertWhen: 'on' },
  presence: { on: 'Présent', off: 'Absent', alertWhen: 'on' },
  door: { on: 'Ouvert', off: 'Fermé', alertWhen: 'on' },
  window: { on: 'Ouvert', off: 'Fermé', alertWhen: 'on' },
  garage_door: { on: 'Ouvert', off: 'Fermé', alertWhen: 'on' },
  opening: { on: 'Ouvert', off: 'Fermé', alertWhen: 'on' },
  lock: { on: 'Déverrouillé', off: 'Verrouillé', alertWhen: 'on' },
  smoke: { on: 'Fumée !', off: 'Normal', alertWhen: 'on' },
  gas: { on: 'Gaz !', off: 'Normal', alertWhen: 'on' },
  carbon_monoxide: { on: 'CO !', off: 'Normal', alertWhen: 'on' },
  moisture: { on: 'Fuite !', off: 'Sec', alertWhen: 'on' },
  safety: { on: 'Danger', off: 'Sûr', alertWhen: 'on' },
  problem: { on: 'Problème', off: 'OK', alertWhen: 'on' },
  tamper: { on: 'Sabotage', off: 'OK', alertWhen: 'on' },
  heat: { on: 'Chaud', off: 'Normal', alertWhen: 'on' },
  cold: { on: 'Froid', off: 'Normal', alertWhen: 'on' },
  battery: { on: 'Batterie faible', off: 'Normale', alertWhen: 'on' },
  sound: { on: 'Son détecté', off: 'Calme', alertWhen: 'on' },
  vibration: { on: 'Vibration', off: 'Calme', alertWhen: 'on' },
  connectivity: { on: 'Connecté', off: 'Déconnecté', alertWhen: 'off', calm: 'on' },
  power: { on: 'Alimenté', off: 'Coupé' },
  plug: { on: 'Branché', off: 'Débranché' },
  running: { on: 'En marche', off: 'Arrêté' },
  light: { on: 'Lumière', off: 'Sombre' },
  battery_charging: { on: 'En charge', off: 'Pas en charge' },
  moving: { on: 'En mouvement', off: 'Immobile' },
  update: { on: 'Mise à jour', off: 'À jour' }
};

const BINARY_DEFAULT: BinaryClassInfo = { on: 'Actif', off: 'Inactif' };

/** binary_sensor dont l'état « on » déclenche l'anneau animé (constat F57). */
const PRESENCE_CLASSES = new Set(['motion', 'occupancy', 'presence']);

const CLIMATE_MODES: Record<string, string> = {
  off: 'Arrêt',
  heat: 'Chauffage',
  cool: 'Climatisation',
  heat_cool: 'Auto',
  auto: 'Auto',
  dry: 'Déshumidification',
  fan_only: 'Ventilation'
};

const ACTIVE_HVAC_ACTIONS = new Set(['heating', 'cooling', 'drying', 'fan', 'preheating', 'defrosting']);

/**
 * Domaines dont l'état est l'horodatage du dernier déclenchement : une date complète n'a pas sa place
 * sous une épingle, le texte court du domaine est affiché.
 */
const TIMESTAMP_STATE_DOMAINS = new Set(['scene', 'button', 'input_button']);

/**
 * Unités qui suffisent, sans device_class, à reconnaître une sonde de température (constat F58 : jamais la
 * sous-chaîne « temp » de l'identifiant). Le kelvin n'en fait pas partie : c'est aussi l'unité des capteurs
 * de température de couleur (2 700 K) ; il n'est retenu qu'avec device_class 'temperature'.
 */
const TEMPERATURE_UNITS = new Set(['°C', '°F']);

// ------------------------------------------------------------------
// Utilitaires
// ------------------------------------------------------------------

function attr(st: HassEntityState, name: string): unknown {
  return st.attributes?.[name];
}

function stringAttr(st: HassEntityState, name: string): string {
  const v = attr(st, name);
  return typeof v === 'string' ? v : '';
}

/** Nombre fini (attribut numérique ou chaîne numérique d'un état), sinon null. */
export function toFiniteNumber(v: unknown): number | null {
  if (typeof v === 'number') return Number.isFinite(v) ? v : null;
  if (typeof v === 'string' && v.trim() !== '') {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

const numberFormats = new Map<string, Intl.NumberFormat>();

/** Locale des nombres selon le réglage « format des nombres » du profil HA (hass.locale.number_format). */
function numberLocale(hass: HassDisplayContext | undefined): string | undefined {
  switch (hass?.locale?.number_format) {
    case 'comma_decimal': return 'en-US';
    case 'decimal_comma': return 'de';
    case 'space_comma': return 'fr';
    case 'system': return undefined;
    default: return hass?.locale?.language || hass?.language || undefined;
  }
}

/** Nombre formaté selon les préférences de l'utilisateur (1 décimale au plus par défaut). */
export function formatNumber(value: number, hass: HassDisplayContext | undefined, maxFractionDigits = 1): string {
  const locale = numberLocale(hass);
  const grouping = hass?.locale?.number_format !== 'none';
  const key = `${locale ?? ''}|${maxFractionDigits}|${grouping}`;
  let fmt = numberFormats.get(key);
  if (!fmt) {
    const options: Intl.NumberFormatOptions = { maximumFractionDigits: maxFractionDigits, useGrouping: grouping };
    try {
      fmt = new Intl.NumberFormat(locale, options);
    } catch {
      fmt = new Intl.NumberFormat(undefined, options); // langue inconnue du navigateur
    }
    numberFormats.set(key, fmt);
  }
  return fmt.format(value);
}

/** Texte d'état formaté par Home Assistant (langue, unité, précision), ou null s'il n'est pas disponible. */
function haStateText(st: HassEntityState, hass: HassDisplayContext): string | null {
  if (typeof hass.formatEntityState !== 'function') return null;
  try {
    const text = hass.formatEntityState(st);
    return typeof text === 'string' && text !== '' ? text : null;
  } catch {
    return null;
  }
}

function pinIcon(binding: EntityBinding, domain: string, st: HassEntityState | undefined): string {
  if (binding.icon) return binding.icon;
  if (!st) return DOMAIN_ICONS[domain] ?? DEFAULT_ICON;
  if (domain === 'lock' && st.state !== 'locked') return '🔓';
  return DEVICE_CLASS_ICONS[`${domain}.${stringAttr(st, 'device_class')}`] ?? DOMAIN_ICONS[domain] ?? DEFAULT_ICON;
}

// ------------------------------------------------------------------
// Températures (constats F58, F109)
// ------------------------------------------------------------------

export interface TemperatureReading {
  entityId: string;
  value: number;
  unit: string;
  /** Valeur convertie en °C (seuils de la heatmap). */
  celsius: number;
}

/** Unité de température du système (hass.config.unit_system), °C par défaut. */
export function systemTemperatureUnit(hass: HassDisplayContext | undefined): string {
  const unit = hass?.config?.unit_system?.temperature;
  return typeof unit === 'string' && unit !== '' ? unit : '°C';
}

export function toCelsius(value: number, unit: string): number {
  if (unit === '°F') return ((value - 32) * 5) / 9;
  if (unit === 'K') return value - 273.15;
  return value;
}

/**
 * Température mesurée par une entité : sensor de device_class 'temperature' ou d'unité °C/°F, ou
 * current_temperature d'un climate (unité du système). null si l'entité n'en est pas une ou si la
 * valeur n'est pas numérique (unavailable, unknown…).
 */
export function readTemperature(entityId: string, hass: HassDisplayContext | undefined): TemperatureReading | null {
  const st = hass?.states?.[entityId];
  if (!st) return null;
  const domain = entityDomain(entityId);
  if (domain === 'climate') {
    const value = toFiniteNumber(attr(st, 'current_temperature'));
    if (value === null) return null;
    const unit = systemTemperatureUnit(hass);
    return { entityId, value, unit, celsius: toCelsius(value, unit) };
  }
  if (domain !== 'sensor') return null;
  const unit = stringAttr(st, 'unit_of_measurement');
  if (stringAttr(st, 'device_class') !== 'temperature' && !TEMPERATURE_UNITS.has(unit)) return null;
  const value = toFiniteNumber(st.state);
  if (value === null) return null;
  const effectiveUnit = unit || systemTemperatureUnit(hass);
  return { entityId, value, unit: effectiveUnit, celsius: toCelsius(value, effectiveUnit) };
}

/** « 21,4 °C » (langue de l'utilisateur, unité réelle). */
export function formatTemperature(reading: TemperatureReading, hass: HassDisplayContext | undefined): string {
  return `${formatNumber(reading.value, hass)} ${reading.unit}`;
}

/** Sonde d'une pièce : première entité de la pièce qui mesure une température exploitable. */
export function roomTemperature(roomId: string, bindings: readonly EntityBinding[], hass: HassDisplayContext | undefined): TemperatureReading | null {
  for (const b of bindings) {
    if (b.roomId !== roomId) continue;
    const reading = readTemperature(b.entityId, hass);
    if (reading) return reading;
  }
  return null;
}

/** Couleur de heatmap pour une température en °C. */
export function heatmapFill(celsius: number): string {
  if (celsius < 18) return 'rgba(59, 130, 246, 0.38)';   // Bleu frais
  if (celsius < 20) return 'rgba(14, 165, 233, 0.32)';   // Cyan doux
  if (celsius < 22) return 'rgba(16, 185, 129, 0.30)';   // Vert confort
  if (celsius < 24) return 'rgba(245, 158, 11, 0.34)';   // Orange chaleureux
  return 'rgba(239, 68, 68, 0.40)';                      // Rouge chaud
}

/** Teinte d'une pièce éclairée : couleur RVB et luminosité de la première lumière allumée, sinon null. */
export function roomLightFill(roomId: string, bindings: readonly EntityBinding[], hass: HassDisplayContext | undefined): string | null {
  for (const b of bindings) {
    if (b.roomId !== roomId || entityDomain(b.entityId) !== 'light') continue;
    const st = hass?.states?.[b.entityId];
    if (!st || st.state !== 'on') continue;
    const rgb = attr(st, 'rgb_color');
    const [r, g, bl] = Array.isArray(rgb) && rgb.length >= 3 && rgb.slice(0, 3).every(c => toFiniteNumber(c) !== null)
      ? rgb.slice(0, 3).map(c => Math.min(255, Math.max(0, Math.round(Number(c)))))
      : [255, 240, 180];
    const brightness = toFiniteNumber(attr(st, 'brightness')) ?? 255;
    const alpha = 0.12 + (Math.min(255, Math.max(0, brightness)) / 255) * 0.22;
    return `rgba(${r}, ${g}, ${bl}, ${alpha.toFixed(2)})`;
  }
  return null;
}

export interface RoomAppearance {
  /** Remplissage calculé (heatmap ou lumière), null : couleur propre de la pièce. */
  fill: string | null;
  /** Pièce éclairée (contour et halo), jamais quand la heatmap colore la pièce (constat F59). */
  illuminated: boolean;
  /** Température affichée sous le nom : seulement quand la heatmap est active. */
  temperature: TemperatureReading | null;
}

/** Apparence d'une pièce : heatmap prioritaire si active et mesurée, sinon teinte de la lumière allumée. */
export function roomAppearance(
  room: Pick<Room, 'id'>,
  bindings: readonly EntityBinding[],
  hass: HassDisplayContext | undefined,
  heatmap: boolean
): RoomAppearance {
  const temperature = heatmap ? roomTemperature(room.id, bindings, hass) : null;
  if (temperature) return { fill: heatmapFill(temperature.celsius), illuminated: false, temperature };
  const light = roomLightFill(room.id, bindings, hass);
  return { fill: light, illuminated: light !== null, temperature: null };
}

// ------------------------------------------------------------------
// État des épingles (constats F57, F109, F132)
// ------------------------------------------------------------------

interface StateInfo {
  text: string;
  status: PinStatus;
  badge?: string | null;
}

function binaryState(st: HassEntityState): StateInfo & { radar: boolean } {
  const dc = stringAttr(st, 'device_class');
  const info = BINARY_CLASSES[dc] ?? BINARY_DEFAULT;
  const on = st.state === 'on';
  const text = on ? info.on : info.off;
  let status: PinStatus;
  if (info.alertWhen) status = (on ? 'on' : 'off') === info.alertWhen ? 'alert' : (info.calm ?? 'info');
  else status = on ? 'on' : 'off';
  return { text, status, radar: on && PRESENCE_CLASSES.has(dc) };
}

function coverState(st: HassEntityState, hass: HassDisplayContext): StateInfo {
  const pos = toFiniteNumber(attr(st, 'current_position'));
  const badge = pos !== null ? `${formatNumber(pos, hass, 0)} %` : null;
  switch (st.state) {
    case 'open': return { text: 'Ouvert', status: 'on', badge };
    case 'closed': return { text: 'Fermé', status: 'off', badge };
    case 'opening': return { text: 'Ouverture…', status: 'info', badge };
    case 'closing': return { text: 'Fermeture…', status: 'info', badge };
    default: return { text: st.state, status: 'info', badge };
  }
}

function lockState(state: string): StateInfo {
  switch (state) {
    case 'locked': return { text: 'Verrouillé', status: 'info' };
    case 'unlocked': return { text: 'Déverrouillé', status: 'alert' };
    case 'jammed': return { text: 'Bloqué', status: 'alert' };
    case 'open': return { text: 'Ouvert', status: 'alert' };
    case 'opening': return { text: 'Ouverture…', status: 'info' };
    case 'locking': return { text: 'Verrouillage…', status: 'info' };
    case 'unlocking': return { text: 'Déverrouillage…', status: 'info' };
    default: return { text: state, status: 'info' };
  }
}

function alarmState(state: string): StateInfo {
  if (state === 'disarmed') return { text: 'Désarmée', status: 'off' };
  if (state === 'triggered') return { text: 'Déclenchée !', status: 'alert' };
  if (state.startsWith('armed')) return { text: 'Armée', status: 'info' };
  if (state === 'arming') return { text: 'Activation…', status: 'info' };
  if (state === 'pending') return { text: 'En attente', status: 'info' };
  if (state === 'disarming') return { text: 'Désactivation…', status: 'info' };
  return { text: state, status: 'info' };
}

function mediaState(state: string): StateInfo {
  switch (state) {
    case 'playing': return { text: 'Lecture', status: 'on' };
    case 'paused': return { text: 'Pause', status: 'info' };
    case 'buffering': return { text: 'Chargement…', status: 'info' };
    case 'on': return { text: 'Allumé', status: 'info' };
    case 'idle': return { text: 'Inactif', status: 'info' };
    case 'standby': return { text: 'Veille', status: 'off' };
    case 'off': return { text: 'Éteint', status: 'off' };
    default: return { text: state, status: 'info' };
  }
}

function climateState(st: HassEntityState, entityId: string, hass: HassDisplayContext): StateInfo {
  const action = stringAttr(st, 'hvac_action');
  const status: PinStatus = st.state === 'off' ? 'off' : (ACTIVE_HVAC_ACTIONS.has(action) ? 'on' : 'info');
  const reading = readTemperature(entityId, hass);
  const mode = CLIMATE_MODES[st.state] ?? st.state;
  const temp = reading ? formatTemperature(reading, hass) : null;
  return { text: temp ? `${mode} · ${temp}` : mode, status, badge: temp };
}

function sensorState(st: HassEntityState, entityId: string, hass: HassDisplayContext): StateInfo {
  const unit = stringAttr(st, 'unit_of_measurement');
  const value = toFiniteNumber(st.state);
  const text = value !== null ? `${formatNumber(value, hass)}${unit ? ` ${unit}` : ''}` : st.state;
  const reading = readTemperature(entityId, hass);
  return { text, status: 'info', badge: reading ? formatTemperature(reading, hass) : null };
}

/** Texte et couleur de repli par domaine (sans hass.formatEntityState) ; le badge et la couleur sont toujours calculés ici. */
function domainState(domain: string, st: HassEntityState, entityId: string, hass: HassDisplayContext): StateInfo {
  const on = st.state === 'on';
  switch (domain) {
    case 'light': {
      if (!on) return { text: 'Éteint', status: 'off' };
      const brightness = toFiniteNumber(attr(st, 'brightness'));
      return { text: brightness !== null ? `Allumé (${Math.round((brightness / 255) * 100)} %)` : 'Allumé', status: 'on' };
    }
    case 'switch':
    case 'input_boolean':
    case 'automation':
    case 'siren':
    case 'humidifier':
    case 'remote':
      return on ? { text: 'Allumé', status: 'on' } : { text: 'Éteint', status: 'off' };
    case 'fan':
      return on ? { text: 'En marche', status: 'on' } : { text: 'Arrêté', status: 'off' };
    case 'cover':
    case 'valve':
      return coverState(st, hass);
    case 'lock':
      return lockState(st.state);
    case 'alarm_control_panel':
      return alarmState(st.state);
    case 'media_player':
      return mediaState(st.state);
    case 'climate':
      return climateState(st, entityId, hass);
    case 'sensor':
      return sensorState(st, entityId, hass);
    case 'binary_sensor':
      return binaryState(st);
    case 'person':
    case 'device_tracker':
      if (st.state === 'home') return { text: 'Présent', status: 'on' };
      if (st.state === 'not_home') return { text: 'Absent', status: 'off' };
      return { text: st.state, status: 'info' };
    case 'script':
      return on ? { text: 'En cours', status: 'on' } : { text: 'Prêt', status: 'info' };
    case 'scene':
    case 'button':
    case 'input_button':
      return { text: 'Prêt', status: 'info' };
    case 'vacuum':
      if (st.state === 'cleaning') return { text: 'Nettoyage', status: 'on' };
      if (st.state === 'docked') return { text: 'À la base', status: 'off' };
      if (st.state === 'error') return { text: 'Erreur', status: 'alert' };
      return { text: st.state, status: 'info' };
    default:
      if (on) return { text: 'Actif', status: 'on' };
      if (st.state === 'off') return { text: 'Inactif', status: 'off' };
      return { text: st.state, status: 'info' };
  }
}

/**
 * Description complète d'une épingle. Sans `hass` (chargement), l'état est en attente. Une entité
 * absente de hass.states est signalée comme orpheline (« Entité introuvable »), jamais « Inactif ».
 */
export function describeEntity(binding: EntityBinding, hass: HassDisplayContext | undefined): EntityView {
  const domain = entityDomain(binding.entityId);
  const st = hass?.states?.[binding.entityId];
  const view: EntityView = {
    name: bindingDisplayName(binding, hass?.states),
    stateText: PENDING_TEXT,
    status: 'off',
    icon: pinIcon(binding, domain, st),
    orphan: false,
    unavailable: false,
    radar: false,
    lightOn: false,
    fanOn: false,
    playing: false,
    badge: null
  };
  if (!hass?.states) return view;
  if (!st) {
    return { ...view, stateText: MISSING_ENTITY_TEXT, status: 'missing', orphan: true, icon: binding.icon || ORPHAN_ICON };
  }
  // Scène ou bouton jamais déclenché : 'unknown' est leur état normal (« Prêt »), pas une panne.
  if (st.state === 'unavailable' || (st.state === 'unknown' && !TIMESTAMP_STATE_DOMAINS.has(domain))) {
    return {
      ...view,
      stateText: haStateText(st, hass) ?? (st.state === 'unavailable' ? 'Indisponible' : 'Inconnu'),
      status: 'off',
      unavailable: true
    };
  }

  const info = domainState(domain, st, binding.entityId, hass);
  let text = (TIMESTAMP_STATE_DOMAINS.has(domain) ? null : haStateText(st, hass)) ?? info.text;
  if (domain === 'light' && st.state === 'on' && text !== info.text) {
    const brightness = toFiniteNumber(attr(st, 'brightness'));
    if (brightness !== null) text = `${text} (${Math.round((brightness / 255) * 100)} %)`;
  } else if (domain === 'climate' && info.badge && text !== info.text) {
    text = `${text} · ${info.badge}`;
  }
  return {
    ...view,
    stateText: text,
    status: info.status,
    radar: domain === 'binary_sensor' && binaryState(st).radar,
    lightOn: domain === 'light' && st.state === 'on',
    fanOn: domain === 'fan' && st.state === 'on',
    playing: domain === 'media_player' && st.state === 'playing',
    badge: info.badge ?? null
  };
}

// ------------------------------------------------------------------
// Nouveau rendu seulement si une entité affichée change (constat F34)
// ------------------------------------------------------------------

/** Entités affichées par le plan : épingles, et capteurs liés aux ouvertures (dont la vue 3D montre l'état). */
export function boundEntityIds(bindings: readonly EntityBinding[], openings: readonly Pick<Opening, 'entityId'>[] = []): string[] {
  const ids = [...bindings.map(b => b.entityId), ...openings.map(o => o.entityId)];
  return [...new Set(ids.filter((id): id is string => typeof id === 'string'))];
}

/**
 * Vrai si le passage de `oldHass` à `hass` change l'affichage du plan : état d'une entité liée,
 * langue ou format des nombres, unité de température, registre des entités (précision d'affichage),
 * formateur d'état de HA (recréé quand des traductions arrivent, jamais à chaque changement d'état)
 * ou mode sombre. Les réglages sont comparés par valeur : seul ce que le plan lit compte.
 */
export function hassChangeAffects(
  oldHass: HassDisplayContext | undefined | null,
  hass: HassDisplayContext | undefined | null,
  entityIds: readonly string[]
): boolean {
  if (!oldHass || !hass) return oldHass !== hass;
  if (oldHass.language !== hass.language ||
    oldHass.locale?.language !== hass.locale?.language ||
    oldHass.locale?.number_format !== hass.locale?.number_format ||
    oldHass.config?.unit_system?.temperature !== hass.config?.unit_system?.temperature ||
    oldHass.themes?.darkMode !== hass.themes?.darkMode ||
    oldHass.entities !== hass.entities ||
    oldHass.formatEntityState !== hass.formatEntityState) {
    return true;
  }
  const before = oldHass.states;
  const after = hass.states;
  if (before === after) return false;
  if (!before || !after) return true;
  return entityIds.some(id => before[id] !== after[id]);
}
