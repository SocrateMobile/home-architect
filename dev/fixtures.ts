/**
 * Données de démonstration du harnais : zones, appareils, entités variées et projets.
 * Les projets sont stockés tels que le backend les conserve (dictionnaires JSON, schéma v2).
 */

export type Json = Record<string, any>;

export interface HassEntityState {
  entity_id: string;
  state: string;
  attributes: Json;
  last_changed: string;
  last_updated: string;
  context: { id: string; parent_id: string | null; user_id: string | null };
}

export interface AreaEntry {
  area_id: string;
  name: string;
  icon: string | null;
  floor_id: string | null;
  picture: null;
  aliases: string[];
  labels: string[];
}

interface EntityFixture {
  entity_id: string;
  state: string;
  area: string;
  attributes?: Json;
}

export const FLOORS = {
  rdc: { floor_id: 'rdc', name: 'Rez-de-chaussée', level: 0, icon: 'mdi:home-floor-0', aliases: [] },
  etage: { floor_id: 'etage', name: 'Étage', level: 1, icon: 'mdi:home-floor-1', aliases: [] }
};

const AREA_DEFS: Array<[string, string, string, string]> = [
  ['salon', 'Salon', 'mdi:sofa', 'rdc'],
  ['cuisine', 'Cuisine', 'mdi:stove', 'rdc'],
  ['chambre', 'Chambre', 'mdi:bed', 'rdc'],
  ['entree', 'Entrée', 'mdi:door', 'rdc'],
  ['garage', 'Garage', 'mdi:garage', 'rdc'],
  ['bureau', 'Bureau', 'mdi:desk', 'etage'],
  ['salle_de_bain', 'Salle de bain', 'mdi:shower', 'etage'],
  ['jardin', 'Jardin', 'mdi:flower', 'rdc']
];

export const AREAS: Record<string, AreaEntry> = Object.fromEntries(
  AREA_DEFS.map(([area_id, name, icon, floor_id]) => [
    area_id,
    { area_id, name, icon, floor_id, picture: null, aliases: [], labels: [] }
  ])
);

const LIGHT_RGB = { supported_color_modes: ['rgb'], supported_features: 40 };

const ENTITY_FIXTURES: EntityFixture[] = [
  // Lumières (rgb_color / brightness), dont une indisponible
  { entity_id: 'light.salon_plafonnier', state: 'on', area: 'salon', attributes: { ...LIGHT_RGB, friendly_name: 'Plafonnier salon', color_mode: 'rgb', brightness: 200, rgb_color: [255, 180, 100] } },
  { entity_id: 'light.salon_lampadaire', state: 'off', area: 'salon', attributes: { supported_color_modes: ['brightness'], friendly_name: 'Lampadaire salon', color_mode: null, brightness: null } },
  { entity_id: 'light.cuisine_spots', state: 'on', area: 'cuisine', attributes: { supported_color_modes: ['color_temp'], friendly_name: 'Spots cuisine', color_mode: 'color_temp', brightness: 255, color_temp_kelvin: 4000 } },
  { entity_id: 'light.chambre_chevet', state: 'off', area: 'chambre', attributes: { ...LIGHT_RGB, friendly_name: 'Lampe de chevet', color_mode: null, brightness: null, rgb_color: null } },
  { entity_id: 'light.bureau', state: 'on', area: 'bureau', attributes: { ...LIGHT_RGB, friendly_name: 'Lampe bureau', color_mode: 'rgb', brightness: 120, rgb_color: [120, 180, 255] } },
  { entity_id: 'light.jardin_guirlande', state: 'unavailable', area: 'jardin', attributes: { friendly_name: 'Guirlande jardin', restored: true, supported_features: 0 } },

  // Commutateurs
  { entity_id: 'switch.prise_tv', state: 'on', area: 'salon', attributes: { friendly_name: 'Prise TV', device_class: 'outlet' } },
  { entity_id: 'switch.machine_cafe', state: 'off', area: 'cuisine', attributes: { friendly_name: 'Machine à café', device_class: 'switch' } },
  { entity_id: 'fan.chambre_ventilateur', state: 'off', area: 'chambre', attributes: { friendly_name: 'Ventilateur chambre', percentage: 0, supported_features: 1 } },
  { entity_id: 'input_boolean.mode_vacances', state: 'off', area: 'entree', attributes: { friendly_name: 'Mode vacances', icon: 'mdi:airplane' } },

  // Ouvrants (garage, volet, portail) et serrures
  { entity_id: 'cover.garage', state: 'closed', area: 'garage', attributes: { friendly_name: 'Porte de garage', device_class: 'garage', supported_features: 3 } },
  { entity_id: 'cover.volet_salon', state: 'open', area: 'salon', attributes: { friendly_name: 'Volet salon', device_class: 'shutter', current_position: 100, supported_features: 15 } },
  { entity_id: 'cover.portail', state: 'closed', area: 'jardin', attributes: { friendly_name: 'Portail', device_class: 'gate', supported_features: 3 } },
  { entity_id: 'lock.porte_entree', state: 'locked', area: 'entree', attributes: { friendly_name: "Serrure porte d'entrée", supported_features: 1 } },
  { entity_id: 'lock.porte_garage', state: 'unlocked', area: 'garage', attributes: { friendly_name: 'Serrure garage', supported_features: 0 } },

  // Climat
  { entity_id: 'climate.salon', state: 'heat', area: 'salon', attributes: { friendly_name: 'Thermostat salon', hvac_modes: ['off', 'heat', 'auto'], min_temp: 7, max_temp: 30, target_temp_step: 0.5, current_temperature: 19.8, temperature: 20.5, hvac_action: 'heating', supported_features: 385 } },
  { entity_id: 'climate.chambre', state: 'off', area: 'chambre', attributes: { friendly_name: 'Radiateur chambre', hvac_modes: ['off', 'heat'], min_temp: 7, max_temp: 30, current_temperature: 18.2, temperature: 18, hvac_action: 'off', supported_features: 385 } },

  // Capteurs (°C, °F, humidité, puissance, inconnu)
  { entity_id: 'sensor.temperature_salon', state: '21.4', area: 'salon', attributes: { friendly_name: 'Température salon', device_class: 'temperature', state_class: 'measurement', unit_of_measurement: '°C' } },
  { entity_id: 'sensor.temperature_cuisine', state: '23.1', area: 'cuisine', attributes: { friendly_name: 'Température cuisine', device_class: 'temperature', state_class: 'measurement', unit_of_measurement: '°C' } },
  { entity_id: 'sensor.temperature_chambre', state: '19.2', area: 'chambre', attributes: { friendly_name: 'Température chambre', device_class: 'temperature', state_class: 'measurement', unit_of_measurement: '°C' } },
  { entity_id: 'sensor.temperature_bureau', state: '70.1', area: 'bureau', attributes: { friendly_name: 'Température bureau (°F)', device_class: 'temperature', state_class: 'measurement', unit_of_measurement: '°F' } },
  { entity_id: 'sensor.temperature_exterieure', state: '12.3', area: 'jardin', attributes: { friendly_name: 'Température extérieure', device_class: 'temperature', state_class: 'measurement', unit_of_measurement: '°C' } },
  { entity_id: 'sensor.temperature_cave', state: 'unknown', area: 'garage', attributes: { friendly_name: 'Température cave', device_class: 'temperature', state_class: 'measurement', unit_of_measurement: '°C' } },
  { entity_id: 'sensor.humidite_salle_de_bain', state: '64', area: 'salle_de_bain', attributes: { friendly_name: 'Humidité salle de bain', device_class: 'humidity', state_class: 'measurement', unit_of_measurement: '%' } },
  { entity_id: 'sensor.consommation_maison', state: '1250', area: 'entree', attributes: { friendly_name: 'Consommation maison', device_class: 'power', state_class: 'measurement', unit_of_measurement: 'W' } },

  // Capteurs binaires (porte, fenêtre, mouvement, fumée)
  { entity_id: 'binary_sensor.porte_entree', state: 'off', area: 'entree', attributes: { friendly_name: "Porte d'entrée", device_class: 'door' } },
  { entity_id: 'binary_sensor.fenetre_chambre', state: 'on', area: 'chambre', attributes: { friendly_name: 'Fenêtre chambre', device_class: 'window' } },
  { entity_id: 'binary_sensor.mouvement_salon', state: 'on', area: 'salon', attributes: { friendly_name: 'Mouvement salon', device_class: 'motion' } },
  { entity_id: 'binary_sensor.mouvement_entree', state: 'off', area: 'entree', attributes: { friendly_name: 'Mouvement entrée', device_class: 'motion' } },
  { entity_id: 'binary_sensor.fumee_cuisine', state: 'off', area: 'cuisine', attributes: { friendly_name: 'Détecteur de fumée', device_class: 'smoke' } },

  // Multimédia, caméra, alarme
  { entity_id: 'media_player.salon_tv', state: 'playing', area: 'salon', attributes: { friendly_name: 'TV salon', device_class: 'tv', volume_level: 0.35, is_volume_muted: false, media_title: 'Documentaire', source: 'HDMI 1', source_list: ['HDMI 1', 'HDMI 2', 'TV'], supported_features: 152463 } },
  { entity_id: 'media_player.cuisine_enceinte', state: 'idle', area: 'cuisine', attributes: { friendly_name: 'Enceinte cuisine', device_class: 'speaker', volume_level: 0.2, supported_features: 152461 } },
  { entity_id: 'camera.entree', state: 'idle', area: 'entree', attributes: { friendly_name: 'Caméra entrée', brand: 'Démo', supported_features: 0 } },
  { entity_id: 'alarm_control_panel.maison', state: 'disarmed', area: 'entree', attributes: { friendly_name: 'Alarme maison', code_format: 'number', supported_features: 63 } },

  // Déclencheurs (scènes, scripts, boutons)
  { entity_id: 'scene.soiree_cinema', state: '2026-01-01T20:30:00+00:00', area: 'salon', attributes: { friendly_name: 'Soirée cinéma', icon: 'mdi:movie-open' } },
  { entity_id: 'scene.bonne_nuit', state: 'unknown', area: 'chambre', attributes: { friendly_name: 'Bonne nuit', icon: 'mdi:weather-night' } },
  { entity_id: 'script.ouvrir_volets', state: 'off', area: 'salon', attributes: { friendly_name: 'Ouvrir les volets', last_triggered: null, mode: 'single', current: 0 } },
  { entity_id: 'button.redemarrer_box', state: 'unknown', area: 'entree', attributes: { friendly_name: 'Redémarrer la box', device_class: 'restart' } },
  { entity_id: 'input_button.sonnette_test', state: 'unknown', area: 'entree', attributes: { friendly_name: 'Tester la sonnette', icon: 'mdi:bell-ring' } },

  // Divers
  { entity_id: 'person.jean', state: 'home', area: 'entree', attributes: { friendly_name: 'Jean', source: 'device_tracker.telephone' } },
  { entity_id: 'weather.maison', state: 'partlycloudy', area: 'jardin', attributes: { friendly_name: 'Météo', temperature: 12.3, temperature_unit: '°C', humidity: 71 } }
];

/** Image de remplacement (SVG en data-URL) pour les entity_picture, sans requête réseau. */
function placeholderPicture(label: string): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180">` +
    `<rect width="320" height="180" fill="#1e293b"/><text x="160" y="96" font-family="sans-serif" font-size="18" ` +
    `fill="#94a3b8" text-anchor="middle">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function createInitialStates(now: string): Record<string, HassEntityState> {
  const states: Record<string, HassEntityState> = {};
  for (const fixture of ENTITY_FIXTURES) {
    const attributes: Json = { ...(fixture.attributes ?? {}) };
    if (fixture.entity_id.startsWith('camera.')) attributes.entity_picture = placeholderPicture('Caméra (harnais)');
    states[fixture.entity_id] = {
      entity_id: fixture.entity_id,
      state: fixture.state,
      attributes,
      last_changed: now,
      last_updated: now,
      context: { id: `seed-${fixture.entity_id}`, parent_id: null, user_id: null }
    };
  }
  return states;
}

/** Registre d'entités tel qu'exposé par hass.entities (EntityRegistryDisplayEntry). */
export function createEntityRegistry(): Record<string, Json> {
  return Object.fromEntries(
    ENTITY_FIXTURES.map((fixture) => [
      fixture.entity_id,
      {
        entity_id: fixture.entity_id,
        platform: 'demo',
        device_id: `device_${fixture.area}`,
        area_id: fixture.area,
        labels: [],
        hidden: false,
        entity_category: null
      }
    ])
  );
}

/** Un appareil « pièce » par zone : suffisant pour la résolution entité → appareil → zone. */
export function createDeviceRegistry(): Record<string, Json> {
  return Object.fromEntries(
    Object.values(AREAS).map((area) => [
      `device_${area.area_id}`,
      {
        id: `device_${area.area_id}`,
        name: `Équipements ${area.name.toLowerCase()}`,
        area_id: area.area_id,
        manufacturer: 'Démo',
        model: 'Harnais',
        name_by_user: null,
        disabled_by: null,
        entry_type: null
      }
    ])
  );
}

const GRID = { size: 0.5, subdivisions: 2, snapToGrid: true, snapToAngles: true, snapToElements: true };

/** Plan du rez-de-chaussée : ancien identifiant de niveau ('rdc'), comme une installation 1.0.x migrée. */
function groundFloorProject(now: string): Json {
  const wall = (id: string, x1: number, y1: number, x2: number, y2: number, type: string, thickness: number) => ({
    id, start: { x: x1, y: y1 }, end: { x: x2, y: y2 }, thickness, height: 2.5, type
  });
  const binding = (id: string, entityId: string, x: number, y: number, roomId: string, extra: Json = {}) => ({
    id, entityId, position: { x, y }, roomId, ...extra
  });
  return {
    id: 'rdc',
    name: 'Rez-de-chaussée',
    category: 'rdc',
    schema_version: 2,
    revision: 3,
    created_at: '2026-01-10T09:00:00.000Z',
    updated_at: now,
    pixelsPerMeter: 50,
    defaultCeilingHeight: 2.5,
    grid: { ...GRID },
    walls: [
      wall('wall_n', 0, 0, 10, 0, 'exterior', 0.3),
      wall('wall_e', 10, 0, 10, 8, 'exterior', 0.3),
      wall('wall_s', 10, 8, 0, 8, 'exterior', 0.3),
      wall('wall_o', 0, 8, 0, 0, 'exterior', 0.3),
      wall('wall_salon', 6, 0, 6, 8, 'loadbearing', 0.2),
      wall('wall_cuisine', 6, 4, 10, 4, 'partition', 0.1)
    ],
    openings: [
      { id: 'open_entree', wallId: 'wall_s', type: 'door', offset: 7.5, width: 0.9, height: 2.1, flipSide: false, flipDirection: false },
      { id: 'open_salon_cuisine', wallId: 'wall_salon', type: 'double_door', offset: 2, width: 1.4, height: 2.1, flipSide: false, flipDirection: false },
      { id: 'open_chambre', wallId: 'wall_salon', type: 'door', offset: 6, width: 0.8, height: 2.1, flipSide: true, flipDirection: false },
      { id: 'open_fenetre_salon', wallId: 'wall_n', type: 'window', offset: 3, width: 1.6, height: 1.2, flipSide: false, flipDirection: false, sashCount: 2 },
      { id: 'open_fenetre_cuisine', wallId: 'wall_e', type: 'window', offset: 2, width: 1.0, height: 1.0, flipSide: false, flipDirection: false, sashCount: 1 },
      { id: 'open_baie', wallId: 'wall_o', type: 'french_window', offset: 4, width: 1.8, height: 2.15, flipSide: false, flipDirection: false, sashCount: 2 }
    ],
    rooms: [
      { id: 'room_salon', name: 'Salon', polygon: [{ x: 0, y: 0 }, { x: 6, y: 0 }, { x: 6, y: 8 }, { x: 0, y: 8 }], areaM2: 48, color: 'rgba(56, 189, 248, 0.12)', icon: 'mdi:sofa', height: 2.5 },
      { id: 'room_cuisine', name: 'Cuisine', polygon: [{ x: 6, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 4 }, { x: 6, y: 4 }], areaM2: 16, color: 'rgba(251, 191, 36, 0.12)', icon: 'mdi:stove', height: 2.5 },
      { id: 'room_chambre', name: 'Chambre', polygon: [{ x: 6, y: 4 }, { x: 10, y: 4 }, { x: 10, y: 8 }, { x: 6, y: 8 }], areaM2: 16, color: 'rgba(167, 139, 250, 0.12)', icon: 'mdi:bed', height: 2.5 }
    ],
    bindings: [
      binding('bind_salon_plafonnier', 'light.salon_plafonnier', 3, 3, 'room_salon'),
      binding('bind_salon_temp', 'sensor.temperature_salon', 1, 1, 'room_salon'),
      binding('bind_salon_mouvement', 'binary_sensor.mouvement_salon', 5.2, 7.2, 'room_salon'),
      binding('bind_salon_tv', 'media_player.salon_tv', 0.8, 4, 'room_salon', { tapAction: 'more-info' }),
      binding('bind_salon_volet', 'cover.volet_salon', 3, 0.7, 'room_salon'),
      binding('bind_salon_scene', 'scene.soiree_cinema', 1.5, 6.2, 'room_salon', { customName: 'Cinéma' }),
      binding('bind_salon_climat', 'climate.salon', 4.6, 1.2, 'room_salon'),
      binding('bind_cuisine_spots', 'light.cuisine_spots', 8, 2, 'room_cuisine'),
      binding('bind_cuisine_fumee', 'binary_sensor.fumee_cuisine', 9.2, 0.8, 'room_cuisine'),
      binding('bind_cuisine_cafe', 'switch.machine_cafe', 7, 1, 'room_cuisine'),
      binding('bind_cuisine_temp', 'sensor.temperature_cuisine', 7, 3.2, 'room_cuisine'),
      binding('bind_chambre_chevet', 'light.chambre_chevet', 8, 6, 'room_chambre'),
      binding('bind_chambre_fenetre', 'binary_sensor.fenetre_chambre', 9.3, 6, 'room_chambre'),
      binding('bind_chambre_climat', 'climate.chambre', 7, 7.3, 'room_chambre'),
      binding('bind_chambre_temp', 'sensor.temperature_chambre', 9, 7.3, 'room_chambre'),
      binding('bind_entree_serrure', 'lock.porte_entree', 2.5, 7.3, 'room_salon', { holdAction: 'more-info' }),
      binding('bind_jardin_guirlande', 'light.jardin_guirlande', 0.6, 0.6, 'room_salon'),
      binding('bind_garage', 'cover.garage', 9.3, 4.6, 'room_chambre', { tapAction: 'toggle' })
    ],
    furniture: [
      { id: 'furn_canape', type: 'sofa_3p', name: 'Canapé 3 places', category: 'seating', position: { x: 3, y: 5.6 }, width: 2.2, length: 0.95, rotation: 0, roomId: 'room_salon' },
      { id: 'furn_table_basse', type: 'coffee_table', name: 'Table basse', category: 'table', position: { x: 3, y: 4.4 }, width: 1.1, length: 0.6, rotation: 0, roomId: 'room_salon' },
      { id: 'furn_lit', type: 'bed_double', name: 'Lit double (Queen)', category: 'bed', position: { x: 8.4, y: 6.2 }, width: 1.6, length: 2.0, rotation: 90, roomId: 'room_chambre' },
      { id: 'furn_evier', type: 'kitchen_sink', name: 'Évier', category: 'kitchen', position: { x: 8, y: 0.5 }, width: 1.2, length: 0.6, rotation: 0, roomId: 'room_cuisine' },
      { id: 'furn_frigo', type: 'fridge', name: 'Réfrigérateur', category: 'kitchen', position: { x: 9.5, y: 1.8 }, width: 0.7, length: 0.7, rotation: 270, roomId: 'room_cuisine' }
    ],
    showDimensions: true,
    showThermalHeatmap: true
  };
}

/** Plan d'étage au nouveau format d'identifiant, avec une image de fond téléversée (asset). */
function upperFloorProject(now: string, backgroundAssetId: string): Json {
  return {
    id: 'plan_etage001',
    name: 'Étage',
    category: 'etage1',
    schema_version: 2,
    revision: 1,
    created_at: '2026-02-01T14:00:00.000Z',
    updated_at: now,
    pixelsPerMeter: 50,
    defaultCeilingHeight: 2.4,
    grid: { ...GRID, size: 0.25 },
    background: {
      imageUrl: '',
      assetId: backgroundAssetId,
      mimeType: 'image/svg+xml',
      opacity: 0.35,
      visible: true,
      offset: { x: 0, y: 0 },
      scale: 1,
      rotation: 0,
      widthPx: 400,
      heightPx: 300
    },
    walls: [
      { id: 'wall_e1', start: { x: 0, y: 0 }, end: { x: 8, y: 0 }, thickness: 0.3, height: 2.4, type: 'exterior' },
      { id: 'wall_e2', start: { x: 8, y: 0 }, end: { x: 8, y: 6 }, thickness: 0.3, height: 2.4, type: 'exterior' },
      { id: 'wall_e3', start: { x: 8, y: 6 }, end: { x: 0, y: 6 }, thickness: 0.3, height: 2.4, type: 'exterior' },
      { id: 'wall_e4', start: { x: 0, y: 6 }, end: { x: 0, y: 0 }, thickness: 0.3, height: 2.4, type: 'exterior' },
      { id: 'wall_e5', start: { x: 5, y: 0 }, end: { x: 5, y: 6 }, thickness: 0.1, height: 2.4, type: 'partition' }
    ],
    openings: [
      { id: 'open_sdb', wallId: 'wall_e5', type: 'sliding_door', offset: 4.5, width: 0.9, height: 2.1, flipSide: false, flipDirection: false },
      { id: 'open_velux', wallId: 'wall_e1', type: 'window', offset: 2.5, width: 1.2, height: 1.0, flipSide: false, flipDirection: false, sashCount: 2 }
    ],
    rooms: [
      { id: 'room_bureau', name: 'Bureau', polygon: [{ x: 0, y: 0 }, { x: 5, y: 0 }, { x: 5, y: 6 }, { x: 0, y: 6 }], areaM2: 30, color: 'rgba(52, 211, 153, 0.12)', icon: 'mdi:desk' },
      { id: 'room_sdb', name: 'Salle de bain', polygon: [{ x: 5, y: 0 }, { x: 8, y: 0 }, { x: 8, y: 6 }, { x: 5, y: 6 }], areaM2: 18, color: 'rgba(56, 189, 248, 0.15)', icon: 'mdi:shower' }
    ],
    bindings: [
      { id: 'bind_bureau_lampe', entityId: 'light.bureau', position: { x: 2.5, y: 2.5 }, roomId: 'room_bureau' },
      { id: 'bind_bureau_temp', entityId: 'sensor.temperature_bureau', position: { x: 1, y: 5 }, roomId: 'room_bureau' },
      { id: 'bind_sdb_humidite', entityId: 'sensor.humidite_salle_de_bain', position: { x: 6.5, y: 3 }, roomId: 'room_sdb' }
    ],
    furniture: [
      { id: 'furn_bureau', type: 'desk', name: 'Bureau', category: 'table', position: { x: 2.5, y: 1 }, width: 1.4, length: 0.7, rotation: 0, roomId: 'room_bureau' },
      { id: 'furn_baignoire', type: 'bathtub', name: 'Baignoire', category: 'bathroom', position: { x: 6.5, y: 5 }, width: 1.7, length: 0.75, rotation: 0, roomId: 'room_sdb' }
    ],
    showDimensions: false,
    showThermalHeatmap: false
  };
}

/** Image de fond de démonstration (SVG « plan scanné »), téléversée comme un asset au démarrage. */
export const DEMO_BACKGROUND_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">' +
  '<rect width="400" height="300" fill="#f8fafc"/>' +
  '<g stroke="#334155" stroke-width="6" fill="none"><rect x="3" y="3" width="394" height="294"/>' +
  '<line x1="250" y1="3" x2="250" y2="297"/></g>' +
  '<g font-family="sans-serif" font-size="16" fill="#475569"><text x="100" y="150">BUREAU</text>' +
  '<text x="275" y="150">SDB</text></g></svg>';

export function createSeedProjects(now: string, backgroundAssetId: string): Json[] {
  return [groundFloorProject(now), upperFloorProject(now, backgroundAssetId)];
}

/** Projets dont un ancien fichier /config/www/plan_<id>.svg existe (installation 1.0.x). */
export const LEGACY_WWW_PROJECT_IDS = ['rdc'];
