/**
 * Harnais de développement (`npm run dev`) : monte le studio (<home-architect-panel>) et la
 * carte Lovelace (<home-architect-card>) sur un faux Home Assistant en mémoire (mock-hass.ts).
 * Les bundles sont chargés dans l'ordre de HA : la carte (extra_js), puis le studio (panneau).
 */
import '../src/card-entry';
import '../src/panel-entry';
import { parse as parseYaml } from 'yaml';
import { VERSION } from '../src/version';
import { MockHomeAssistant, type Language, type LogEntry, type LogKind, type MockHass } from './mock-hass';

interface HassElement extends HTMLElement {
  hass?: MockHass;
}

interface PanelElement extends HassElement {
  narrow?: boolean;
  route?: { prefix: string; path: string };
  panel?: unknown;
}

interface CardElement extends HassElement {
  setConfig(config: Record<string, unknown>): void;
}

type Tab = 'studio' | 'card';

interface Prefs {
  tab: Tab;
  admin: boolean;
  language: Language;
  darkMode: boolean;
  latencyMs: number;
  cardYaml: string;
  cardWidth: string;
}

// Hors du préfixe « home_architect_ », réservé aux anciennes copies locales de projets.
const PREFS_KEY = 'home-architect-dev-harness';
const MAX_LOG_ENTRIES = 300;
const DEFAULT_CARD_YAML = `# Carte telle que saisie dans un tableau de bord (une liste pour plusieurs cartes).
type: custom:home-architect-card
project_id: rdc
title: Rez-de-chaussée
height: 480px
`;
const DEFAULT_PREFS: Prefs = {
  tab: 'studio',
  admin: true,
  language: 'fr',
  darkMode: false,
  latencyMs: 0,
  cardYaml: DEFAULT_CARD_YAML,
  cardWidth: '500px'
};
const KIND_LABELS: Record<LogKind, string> = { ws: 'WS', service: 'SERVICE', http: 'HTTP', event: 'ÉVÉNEMENT', error: 'ERREUR' };
const UI_EVENTS = ['hass-more-info', 'hass-notification', 'hass-action', 'location-changed', 'show-dialog'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : isRecord(error) && typeof error.message === 'string' ? error.message : String(error);
}

/** Préférences du harnais (onglet, réglages, YAML) : simple confort, jamais les données simulées. */
function loadPrefs(): Prefs {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(PREFS_KEY) ?? 'null');
    if (!isRecord(stored)) return { ...DEFAULT_PREFS };
    return {
      tab: stored.tab === 'card' ? 'card' : 'studio',
      admin: typeof stored.admin === 'boolean' ? stored.admin : DEFAULT_PREFS.admin,
      language: stored.language === 'en' ? 'en' : 'fr',
      darkMode: stored.darkMode === true,
      latencyMs: typeof stored.latencyMs === 'number' ? stored.latencyMs : 0,
      cardYaml: typeof stored.cardYaml === 'string' ? stored.cardYaml : DEFAULT_CARD_YAML,
      cardWidth: typeof stored.cardWidth === 'string' ? stored.cardWidth : DEFAULT_PREFS.cardWidth
    };
  } catch {
    return { ...DEFAULT_PREFS };
  }
}

function savePrefs(): void {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {
    // Stockage indisponible (navigation privée) : les préférences ne sont simplement pas conservées.
  }
}

function byId<T extends HTMLElement = HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Élément #${id} absent de dev/index.html`);
  return element as T;
}

function createHassElement<T extends HassElement>(tag: string): T {
  return document.createElement(tag) as T;
}

function errorBox(message: string): HTMLElement {
  const box = document.createElement('div');
  box.className = 'card-error';
  box.textContent = message;
  return box;
}

function toDisplayJson(value: unknown): string {
  try {
    const json = JSON.stringify(value, null, 2) ?? String(value);
    return json.length > 4000 ? `${json.slice(0, 4000)}\n…` : json;
  } catch {
    return String(value);
  }
}

const prefs = loadPrefs();
const mock = await MockHomeAssistant.create({
  admin: prefs.admin,
  language: prefs.language,
  darkMode: prefs.darkMode,
  updateAvailable: false,
  latencyMs: prefs.latencyMs,
  offline: false
});

// --- Journal ----------------------------------------------------------------------------------

const logList = byId<HTMLOListElement>('log-list');
const logFilter = byId<HTMLSelectElement>('log-filter');

function appendLog(entry: LogEntry): void {
  const atBottom = logList.scrollTop + logList.clientHeight >= logList.scrollHeight - 4;
  const item = document.createElement('li');
  item.dataset.kind = entry.kind;
  item.hidden = logFilter.value !== '' && logFilter.value !== entry.kind;
  const time = document.createElement('time');
  time.dateTime = entry.time.toISOString();
  time.textContent = entry.time.toLocaleTimeString();
  const kind = document.createElement('span');
  kind.className = 'kind';
  kind.textContent = KIND_LABELS[entry.kind];
  if (entry.detail === undefined) {
    item.append(time, kind, entry.summary);
  } else {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.append(time, kind, entry.summary);
    const pre = document.createElement('pre');
    pre.textContent = toDisplayJson(entry.detail);
    details.append(summary, pre);
    item.append(details);
  }
  logList.append(item);
  while (logList.childElementCount > MAX_LOG_ENTRIES) logList.firstElementChild?.remove();
  byId('log-count').textContent = `(${logList.childElementCount})`;
  if (atBottom) logList.scrollTop = logList.scrollHeight;
}

mock.onLog(appendLog);
logFilter.addEventListener('change', () => {
  for (const item of Array.from(logList.children) as HTMLElement[]) {
    item.hidden = logFilter.value !== '' && logFilter.value !== item.dataset.kind;
  }
});
byId('btn-clear-log').addEventListener('click', () => {
  logList.replaceChildren();
  byId('log-count').textContent = '';
});

// --- Studio (panneau) et carte ----------------------------------------------------------------

const narrowQuery = window.matchMedia('(max-width: 870px)');
const panel = createHassElement<PanelElement>('home-architect-panel');
panel.hass = mock.hass;
panel.narrow = narrowQuery.matches;
panel.route = { prefix: '/home-architect', path: '' };
panel.panel = mock.hass.panels['home-architect'];
narrowQuery.addEventListener('change', (event) => {
  panel.narrow = event.matches;
});

const studioHost = byId('studio-host');
const cardHost = byId('card-host');
const cardYaml = byId<HTMLTextAreaElement>('card-yaml');
let cards: CardElement[] = [];
let cardSlots: HTMLElement[] = [];

/** Recrée les cartes à partir du YAML, comme le fait un tableau de bord après édition. */
function buildCards(yamlText: string): void {
  cards = [];
  cardSlots = [];
  let parsed: unknown;
  try {
    parsed = parseYaml(yamlText);
  } catch (error) {
    cardSlots.push(errorBox(`YAML invalide : ${errorMessage(error)}`));
    return;
  }
  for (const config of Array.isArray(parsed) ? parsed : [parsed]) {
    const slot = document.createElement('div');
    slot.className = 'card-slot';
    cardSlots.push(slot);
    if (!isRecord(config) || config.type !== 'custom:home-architect-card') {
      slot.append(errorBox('Chaque carte doit déclarer « type: custom:home-architect-card ».'));
      continue;
    }
    const card = createHassElement<CardElement>('home-architect-card');
    try {
      card.setConfig(config);
    } catch (error) {
      slot.append(errorBox(`setConfig a refusé la configuration : ${errorMessage(error)}`));
      continue;
    }
    card.hass = mock.hass;
    slot.append(card);
    cards.push(card);
  }
}

/**
 * Affiche l'onglet actif. Comme dans HA, la vue inactive est retirée du DOM (disconnectedCallback)
 * puis réinsérée telle quelle, ce qui exerce le nettoyage des écouteurs et abonnements.
 */
function mountActiveTab(): void {
  const studio = prefs.tab === 'studio';
  byId('tab-studio').setAttribute('aria-selected', String(studio));
  byId('tab-card').setAttribute('aria-selected', String(!studio));
  byId('studio-tab').hidden = !studio;
  byId('card-tab').hidden = studio;
  if (studio) {
    cardHost.replaceChildren();
    if (panel.parentNode !== studioHost) studioHost.append(panel);
  } else {
    panel.remove();
    cardHost.replaceChildren(...cardSlots);
  }
}

function applyCardYaml(): void {
  prefs.cardYaml = cardYaml.value;
  savePrefs();
  buildCards(cardYaml.value);
  mountActiveTab();
}

for (const tab of ['studio', 'card'] as const) {
  byId(`tab-${tab}`).addEventListener('click', () => {
    prefs.tab = tab;
    savePrefs();
    mountActiveTab();
  });
}

cardYaml.value = prefs.cardYaml;
cardYaml.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    applyCardYaml();
  }
});
byId('btn-apply-card').addEventListener('click', applyCardYaml);

const cardWidth = byId<HTMLSelectElement>('ctl-card-width');
cardWidth.value = prefs.cardWidth;
document.documentElement.style.setProperty('--harness-card-width', prefs.cardWidth);
cardWidth.addEventListener('change', () => {
  prefs.cardWidth = cardWidth.value;
  savePrefs();
  document.documentElement.style.setProperty('--harness-card-width', cardWidth.value);
});

// --- Réglages simulés -------------------------------------------------------------------------

function applyDocumentTheme(hass: MockHass): void {
  document.documentElement.lang = hass.language;
  document.documentElement.dataset.theme = hass.themes.darkMode ? 'dark' : 'light';
}

mock.onHassChanged((hass) => {
  panel.hass = hass;
  for (const card of cards) card.hass = hass;
  applyDocumentTheme(hass);
  refreshMoreInfo();
});
applyDocumentTheme(mock.hass);

function bindCheckbox(id: string, initial: boolean, onChange: (checked: boolean) => void): void {
  const input = byId<HTMLInputElement>(id);
  input.checked = initial;
  input.addEventListener('change', () => onChange(input.checked));
}

function bindSelect(id: string, initial: string, onChange: (value: string) => void): void {
  const select = byId<HTMLSelectElement>(id);
  select.value = initial;
  select.addEventListener('change', () => onChange(select.value));
}

bindCheckbox('ctl-admin', prefs.admin, (admin) => {
  prefs.admin = admin;
  savePrefs();
  mock.updateSettings({ admin });
});
bindSelect('ctl-language', prefs.language, (value) => {
  prefs.language = value === 'en' ? 'en' : 'fr';
  savePrefs();
  mock.updateSettings({ language: prefs.language });
});
bindCheckbox('ctl-dark', prefs.darkMode, (darkMode) => {
  prefs.darkMode = darkMode;
  savePrefs();
  mock.updateSettings({ darkMode });
});
bindCheckbox('ctl-update', false, (updateAvailable) => mock.updateSettings({ updateAvailable }));
bindSelect('ctl-latency', String(prefs.latencyMs), (value) => {
  prefs.latencyMs = Number(value);
  savePrefs();
  mock.updateSettings({ latencyMs: prefs.latencyMs });
});
bindCheckbox('ctl-offline', false, (offline) => mock.updateSettings({ offline }));

// --- Simulation d'un autre appareil -----------------------------------------------------------

const projectSelect = byId<HTMLSelectElement>('ctl-project');

function refreshProjectSelect(): void {
  const previous = projectSelect.value;
  const projects = mock.listProjectIds();
  projectSelect.replaceChildren(
    ...projects.map(({ id, name, revision }) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = `${name} (${id}, rév. ${revision})`;
      return option;
    })
  );
  if (projects.some((project) => project.id === previous)) projectSelect.value = previous;
  byId<HTMLButtonElement>('btn-external-edit').disabled = projects.length === 0;
  byId<HTMLButtonElement>('btn-external-delete').disabled = projects.length === 0;
}

mock.onProjectsChanged(refreshProjectSelect);
refreshProjectSelect();
byId('btn-external-edit').addEventListener('click', () => mock.simulateExternalEdit(projectSelect.value));
byId('btn-external-delete').addEventListener('click', () => mock.simulateExternalDelete(projectSelect.value));

// --- Événements émis par les composants vers Home Assistant -----------------------------------

const moreInfo = byId<HTMLDialogElement>('more-info');
let moreInfoEntityId: string | null = null;

function refreshMoreInfo(): void {
  if (!moreInfoEntityId || !moreInfo.open) return;
  const stateObj = mock.hass.states[moreInfoEntityId];
  byId('more-info-title').textContent = stateObj
    ? `${String(stateObj.attributes.friendly_name ?? moreInfoEntityId)} — ${moreInfoEntityId}`
    : `${moreInfoEntityId} (entité inconnue)`;
  byId('more-info-state').textContent = stateObj ? toDisplayJson({ state: stateObj.state, attributes: stateObj.attributes }) : '';
}

byId('more-info-toggle').addEventListener('click', () => {
  if (!moreInfoEntityId) return;
  // Les échecs sont déjà consignés dans le journal par le faux backend.
  mock.hass.callService('homeassistant', 'toggle', {}, { entity_id: moreInfoEntityId }).catch(() => undefined);
});

for (const type of UI_EVENTS) {
  window.addEventListener(type, (event) => {
    const detail: unknown = event instanceof CustomEvent ? event.detail : undefined;
    const suffix = type === 'location-changed' ? ` → ${location.pathname}${location.search}` : '';
    appendLog({ time: new Date(), kind: 'event', summary: `${type}${suffix}`, detail });
    if (type === 'hass-more-info' && isRecord(detail) && typeof detail.entityId === 'string') {
      moreInfoEntityId = detail.entityId;
      if (!moreInfo.open) moreInfo.showModal();
      refreshMoreInfo();
    }
  });
}

byId('harness-version').textContent = `v${VERSION} · harnais`;
buildCards(prefs.cardYaml);
mountActiveTab();
