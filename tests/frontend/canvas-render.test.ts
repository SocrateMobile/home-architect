import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  HassDisplayContext, MISSING_ENTITY_TEXT, describeEntity, formatTemperature, hassChangeAffects, heatmapFill,
  readTemperature, roomAppearance
} from '../../src/canvas/entity-display';
import {
  DOUBLE_TAP_DELAY_MS, HOLD_DELAY_MS, TapGestureRecognizer, isSafeNavigationPath, planEntityAction, runEntityAction
} from '../../src/canvas/entity-actions';
import { openingPrimitives, openingVerticalRange, windowSashes } from '../../src/canvas/opening-symbols';
import {
  cameraBasis, floorMatrix, pointDepth, projectPoint, screenDeltaToFloor, shortestAngleDelta, unprojectFloor,
  viewerDirection
} from '../../src/canvas/projection';
import { buildWallScene, computeWallHeights } from '../../src/canvas/scene-3d';
import { memoizeLast } from '../../src/canvas/memo';
import { computeWallPolygons } from '../../src/core/svg-exporter';
import { EntityBinding, HomeArchitectProject, Opening, OpeningType, Point, Room, Wall } from '../../src/core/types';
import { HomeArchitectCanvas } from '../../src/components/canvas-view';

// Référence à l'exécution : l'import ne sert pas qu'au typage, il définit <home-architect-canvas>.
const CanvasElement = HomeArchitectCanvas;

// ------------------------------------------------------------------
// Données de test
// ------------------------------------------------------------------

type States = NonNullable<HassDisplayContext['states']>;

function bind(entityId: string, extra: Partial<EntityBinding> = {}): EntityBinding {
  return { id: `b_${entityId}`, entityId, position: { x: 1, y: 1 }, ...extra };
}

function st(entityId: string, state: string, attributes: Record<string, unknown> = {}) {
  return { entity_id: entityId, state, attributes };
}

function hassWith(states: States, extra: Partial<HassDisplayContext> = {}): HassDisplayContext {
  return { states, language: 'fr', locale: { language: 'fr', number_format: 'language' }, ...extra };
}

const wall = (id: string, x1: number, y1: number, x2: number, y2: number, thickness = 0.2): Wall => ({
  id, start: { x: x1, y: y1 }, end: { x: x2, y: y2 }, thickness, type: 'standard'
});

/** Pièce carrée de 4 m fermée par quatre murs joints aux angles (sens horaire à l'écran). */
const SQUARE_WALLS: Wall[] = [
  wall('north', 0, 0, 4, 0),
  wall('east', 4, 0, 4, 4),
  wall('south', 4, 4, 0, 4),
  wall('west', 0, 4, 0, 0)
];

const SQUARE_ROOM: Room = {
  id: 'room_1',
  name: 'Salon',
  polygon: [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 4 }, { x: 0, y: 4 }],
  areaM2: 16,
  height: 3
};

const close = (a: number, b: number, eps = 1e-6) => Math.abs(a - b) <= eps;

// ------------------------------------------------------------------
// État affiché des épingles (constats F57, F109, F132, F138)
// ------------------------------------------------------------------

describe('describeEntity', () => {
  it('binary_sensor connectivity : « on » est l’état normal, pas une alerte rouge ni un radar', () => {
    const states = { 'binary_sensor.box': st('binary_sensor.box', 'on', { device_class: 'connectivity' }) };
    const view = describeEntity(bind('binary_sensor.box'), hassWith(states));
    expect(view.status).toBe('on');
    expect(view.stateText).toBe('Connecté');
    expect(view.radar).toBe(false);

    const lost = describeEntity(bind('binary_sensor.box'), hassWith({ 'binary_sensor.box': st('binary_sensor.box', 'off', { device_class: 'connectivity' }) }));
    expect(lost.status).toBe('alert');
  });

  it('binary_sensor power / plug / running : ni alerte ni radar', () => {
    for (const dc of ['power', 'plug', 'running']) {
      const view = describeEntity(bind('binary_sensor.x'), hassWith({ 'binary_sensor.x': st('binary_sensor.x', 'on', { device_class: dc }) }));
      expect(view.status).toBe('on');
      expect(view.radar).toBe(false);
    }
  });

  it('anneau animé réservé au mouvement, à la présence et à l’occupation', () => {
    for (const dc of ['motion', 'occupancy', 'presence']) {
      const view = describeEntity(bind('binary_sensor.m'), hassWith({ 'binary_sensor.m': st('binary_sensor.m', 'on', { device_class: dc }) }));
      expect(view.radar).toBe(true);
      expect(view.status).toBe('alert');
    }
    const door = describeEntity(bind('binary_sensor.d'), hassWith({ 'binary_sensor.d': st('binary_sensor.d', 'on', { device_class: 'door' }) }));
    expect(door.radar).toBe(false);
    expect(door.stateText).toBe('Ouvert');
  });

  it('serrure : bloquée, ouverte et transitions distinctes de « Déverrouillé »', () => {
    const text = (state: string) => describeEntity(bind('lock.porte'), hassWith({ 'lock.porte': st('lock.porte', state) }));
    expect(text('jammed').stateText).toBe('Bloqué');
    expect(text('jammed').status).toBe('alert');
    expect(text('locking').stateText).toBe('Verrouillage…');
    expect(text('unlocking').stateText).toBe('Déverrouillage…');
    expect(text('open').stateText).toBe('Ouvert');
    expect(text('locked').status).toBe('info');
  });

  it('entité absente de Home Assistant : liaison orpheline signalée, jamais « Inactif »', () => {
    const view = describeEntity(bind('binary_sensor.fumee_ancienne'), hassWith({}));
    expect(view.orphan).toBe(true);
    expect(view.status).toBe('missing');
    expect(view.stateText).toBe(MISSING_ENTITY_TEXT);
  });

  it('sans hass (chargement) : état en attente, pas d’orphelin', () => {
    const view = describeEntity(bind('light.salon'), undefined);
    expect(view.orphan).toBe(false);
    expect(view.stateText).toBe('…');
  });

  it('unavailable / unknown : pas de badge de valeur', () => {
    const states = { 'sensor.t': st('sensor.t', 'unavailable', { device_class: 'temperature', unit_of_measurement: '°C' }) };
    const view = describeEntity(bind('sensor.t'), hassWith(states));
    expect(view.unavailable).toBe(true);
    expect(view.badge).toBeNull();
    expect(view.stateText).toBe('Indisponible');
  });

  it('texte d’état formaté par hass.formatEntityState quand HA le fournit', () => {
    const states = { 'switch.prise': st('switch.prise', 'on') };
    const formatEntityState = vi.fn(() => 'On');
    const view = describeEntity(bind('switch.prise'), hassWith(states, { formatEntityState }));
    expect(view.stateText).toBe('On');
    expect(view.status).toBe('on');
  });

  it('scène, bouton : pas d’horodatage du dernier déclenchement sous l’épingle', () => {
    const states = { 'scene.cinema': st('scene.cinema', '2026-01-01T20:30:00+00:00') };
    const formatEntityState = vi.fn(() => '1 janvier 2026 à 21:30');
    expect(describeEntity(bind('scene.cinema'), hassWith(states, { formatEntityState })).stateText).toBe('Prêt');
  });

  it('bouton jamais pressé (« unknown ») : prêt, pas affiché comme une panne', () => {
    const view = describeEntity(bind('input_button.sonnette'), hassWith({ 'input_button.sonnette': st('input_button.sonnette', 'unknown') }));
    expect(view.stateText).toBe('Prêt');
    expect(view.unavailable).toBe(false);
    const sensor = describeEntity(bind('sensor.x'), hassWith({ 'sensor.x': st('sensor.x', 'unknown') }));
    expect(sensor.unavailable).toBe(true);
  });

  it('valeur d’un capteur arrondie selon la langue (pas de « 1523.4567 W » qui déborde)', () => {
    const states = { 'sensor.p': st('sensor.p', '1523.4567', { unit_of_measurement: 'W', device_class: 'power' }) };
    const view = describeEntity(bind('sensor.p'), hassWith(states));
    expect(view.stateText.replace(/\s/g, ' ')).toBe('1 523,5 W');
    expect(view.badge).toBeNull();
  });

  it('climate : température courante dans l’unité du système, jamais « heat° »', () => {
    const states = { 'climate.salon': st('climate.salon', 'heat', { current_temperature: 71.6, hvac_action: 'heating' }) };
    const view = describeEntity(bind('climate.salon'), hassWith(states, { config: { unit_system: { temperature: '°F' } } }));
    expect(view.stateText).toBe('Chauffage · 71,6 °F');
    expect(view.badge).toBe('71,6 °F');
    expect(view.status).toBe('on');
  });

  it('nom : friendly_name courant, nom saisi prioritaire, sinon entity_id', () => {
    const states = { 'light.l1': st('light.l1', 'off', { friendly_name: 'Lampe salon' }) };
    expect(describeEntity(bind('light.l1'), hassWith(states)).name).toBe('Lampe salon');
    expect(describeEntity(bind('light.l1', { customName: 'Plafonnier' }), hassWith(states)).name).toBe('Plafonnier');
    expect(describeEntity(bind('light.inconnue'), hassWith(states)).name).toBe('light.inconnue');
  });
});

// ------------------------------------------------------------------
// Températures, heatmap et pièces éclairées (constats F58, F59)
// ------------------------------------------------------------------

describe('températures des pièces', () => {
  it('ignore un capteur dont l’identifiant contient « temp » sans être une température', () => {
    const states = { 'sensor.lave_vaisselle_temps_restant': st('sensor.lave_vaisselle_temps_restant', '45', { unit_of_measurement: 'min' }) };
    expect(readTemperature('sensor.lave_vaisselle_temps_restant', hassWith(states))).toBeNull();
  });

  it('reconnaît device_class temperature ou une unité de température, et convertit les °F', () => {
    const states = {
      'sensor.salon': st('sensor.salon', '70', { device_class: 'temperature', unit_of_measurement: '°F' }),
      'sensor.cave': st('sensor.cave', '12.5', { unit_of_measurement: '°C' })
    };
    const f = readTemperature('sensor.salon', hassWith(states));
    expect(f?.unit).toBe('°F');
    expect(close(f!.celsius, 21.111, 1e-3)).toBe(true);
    expect(readTemperature('sensor.cave', hassWith(states))?.celsius).toBe(12.5);
    expect(formatTemperature(f!, hassWith(states))).toBe('70 °F');
  });

  it('kelvin seul (température de couleur) : pas une sonde ; avec device_class temperature : converti', () => {
    const states = {
      'sensor.couleur': st('sensor.couleur', '2700', { unit_of_measurement: 'K' }),
      'sensor.labo': st('sensor.labo', '294.15', { device_class: 'temperature', unit_of_measurement: 'K' })
    };
    expect(readTemperature('sensor.couleur', hassWith(states))).toBeNull();
    expect(close(readTemperature('sensor.labo', hassWith(states))!.celsius, 21)).toBe(true);
  });

  it('70 °F n’est pas classé « chaud » par la heatmap', () => {
    expect(heatmapFill(21.1)).toBe(heatmapFill(21));
    expect(heatmapFill(21.1)).not.toBe(heatmapFill(30));
  });

  it('heatmap prioritaire sur la teinte de la lumière, sans classe illuminated', () => {
    const bindings = [bind('sensor.t', { roomId: 'r' }), bind('light.l', { roomId: 'r' })];
    const states = {
      'sensor.t': st('sensor.t', '17', { device_class: 'temperature', unit_of_measurement: '°C' }),
      'light.l': st('light.l', 'on', { rgb_color: [255, 0, 0], brightness: 25 })
    };
    const withHeatmap = roomAppearance({ id: 'r' }, bindings, hassWith(states), true);
    expect(withHeatmap.fill).toBe(heatmapFill(17));
    expect(withHeatmap.illuminated).toBe(false);
    expect(withHeatmap.temperature?.value).toBe(17);

    const lightOnly = roomAppearance({ id: 'r' }, bindings, hassWith(states), false);
    expect(lightOnly.illuminated).toBe(true);
    expect(lightOnly.fill).toMatch(/^rgba\(255, 0, 0, /);
    expect(lightOnly.temperature).toBeNull();
  });
});

describe('hassChangeAffects (constat F34)', () => {
  const base = hassWith({ 'light.a': st('light.a', 'on'), 'sensor.p': st('sensor.p', '12') });

  it('ignore le changement d’une entité non affichée', () => {
    const next = { ...base, states: { ...base.states, 'sensor.p': st('sensor.p', '13') } };
    expect(hassChangeAffects(base, next, ['light.a'])).toBe(false);
  });

  it('détecte le changement d’une entité affichée, du mode sombre ou de l’unité', () => {
    expect(hassChangeAffects(base, { ...base, states: { ...base.states, 'light.a': st('light.a', 'off') } }, ['light.a'])).toBe(true);
    expect(hassChangeAffects(base, { ...base, themes: { darkMode: true } }, ['light.a'])).toBe(true);
    expect(hassChangeAffects(base, { ...base, config: { unit_system: { temperature: '°F' } } }, ['light.a'])).toBe(true);
    expect(hassChangeAffects(undefined, base, [])).toBe(true);
  });

  it('détecte un nouveau formateur d’état (traductions chargées après le premier rendu)', () => {
    const before = { ...base, formatEntityState: () => 'on' };
    expect(hassChangeAffects(before, { ...before }, ['light.a'])).toBe(false);
    expect(hassChangeAffects(before, { ...before, formatEntityState: () => 'Allumé' }, ['light.a'])).toBe(true);
  });
});

// ------------------------------------------------------------------
// Actions des épingles (constats F10, F101, F102)
// ------------------------------------------------------------------

describe('planEntityAction', () => {
  it('volets, portails, serrures, alarmes et vannes : more-info au tap', () => {
    for (const id of ['cover.garage', 'cover.portail', 'lock.entree', 'alarm_control_panel.maison', 'valve.eau']) {
      expect(planEntityAction(bind(id), 'tap').kind).toBe('more-info');
    }
  });

  it('table unique : light.toggle, input_button.press, scene.turn_on', () => {
    expect(planEntityAction(bind('light.salon'), 'tap')).toEqual({ kind: 'service', domain: 'light', service: 'toggle', entityId: 'light.salon' });
    expect(planEntityAction(bind('input_button.sonnette'), 'tap')).toMatchObject({ domain: 'input_button', service: 'press' });
    expect(planEntityAction(bind('scene.soir'), 'tap')).toMatchObject({ domain: 'scene', service: 'turn_on' });
  });

  it('appui long et double tap : more-info par défaut, holdAction respectée', () => {
    expect(planEntityAction(bind('light.salon'), 'hold').kind).toBe('more-info');
    expect(planEntityAction(bind('light.salon'), 'double_tap').kind).toBe('more-info');
    expect(planEntityAction(bind('light.salon', { holdAction: 'none' }), 'hold').kind).toBe('none');
  });

  it('tapAction configurée ; navigate sans chemin sûr ou toggle non actionnable → more-info', () => {
    expect(planEntityAction(bind('cover.volet', { tapAction: 'toggle' }), 'tap')).toMatchObject({ kind: 'service', domain: 'cover' });
    expect(planEntityAction(bind('light.a', { tapAction: 'navigate', navigationPath: '/lovelace/2' }), 'tap')).toEqual({ kind: 'navigate', path: '/lovelace/2' });
    expect(planEntityAction(bind('light.a', { tapAction: 'navigate', navigationPath: '//evil.example' }), 'tap').kind).toBe('more-info');
    expect(planEntityAction(bind('sensor.t', { tapAction: 'toggle' }), 'tap').kind).toBe('more-info');
    expect(isSafeNavigationPath('#popup')).toBe(true);
    expect(isSafeNavigationPath('https://example.com')).toBe(false);
  });
});

describe('runEntityAction', () => {
  it('more-info : un seul événement hass-more-info, bubbles et composed', () => {
    const host = new EventTarget();
    const events: CustomEvent[] = [];
    host.addEventListener('hass-more-info', e => events.push(e as CustomEvent));
    runEntityAction(bind('cover.garage'), 'tap', { host, hass: { callService: vi.fn() }, onError: vi.fn() });
    expect(events).toHaveLength(1);
    expect(events[0].detail).toEqual({ entityId: 'cover.garage' });
    expect(events[0].bubbles && events[0].composed).toBe(true);
  });

  it('service : appel du bon domaine, erreur signalée', async () => {
    const callService = vi.fn(() => Promise.reject(new Error('Entité indisponible')));
    const onError = vi.fn();
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    runEntityAction(bind('input_button.sonnette'), 'tap', { host: new EventTarget(), hass: { callService }, onError });
    expect(callService).toHaveBeenCalledWith('input_button', 'press', { entity_id: 'input_button.sonnette' });
    await Promise.resolve();
    await Promise.resolve();
    expect(onError).toHaveBeenCalledWith(expect.stringContaining('Entité indisponible'));
  });
});

describe('TapGestureRecognizer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  function recognizer(waits = true) {
    const calls: string[] = [];
    const r = new TapGestureRecognizer({
      onTap: id => calls.push(`tap:${id}`),
      onDoubleTap: id => calls.push(`double:${id}`),
      onHold: id => calls.push(`hold:${id}`),
      waitsForDoubleTap: () => waits
    });
    return { r, calls };
  }

  function tap(r: TapGestureRecognizer, id: string) {
    r.down(id, 10, 10, 'touch');
    r.up();
    r.click(id);
  }

  it('simple tap exécuté après la fenêtre de double tap', () => {
    const { r, calls } = recognizer();
    tap(r, 'a');
    expect(calls).toEqual([]);
    vi.advanceTimersByTime(DOUBLE_TAP_DELAY_MS + 1);
    expect(calls).toEqual(['tap:a']);
  });

  it('double tap : more-info sans bascule préalable', () => {
    const { r, calls } = recognizer();
    tap(r, 'a');
    vi.advanceTimersByTime(100);
    tap(r, 'a');
    vi.advanceTimersByTime(1000);
    expect(calls).toEqual(['double:a']);
  });

  it('appui long : holdAction, le click qui suit est ignoré', () => {
    const { r, calls } = recognizer();
    r.down('a', 10, 10, 'touch');
    vi.advanceTimersByTime(HOLD_DELAY_MS + 1);
    r.up();
    r.click('a');
    vi.advanceTimersByTime(1000);
    expect(calls).toEqual(['hold:a']);
  });

  it('glisser au-delà du seuil : ni tap ni appui long', () => {
    const { r, calls } = recognizer();
    r.down('a', 10, 10, 'touch');
    r.move(40, 10);
    vi.advanceTimersByTime(HOLD_DELAY_MS + 1);
    r.up();
    r.click('a');
    vi.advanceTimersByTime(1000);
    expect(calls).toEqual([]);
  });

  it('tap qui ouvre déjà more-info : immédiat, le second tap d’un double tap est ignoré', () => {
    const { r, calls } = recognizer(false);
    tap(r, 'a');
    expect(calls).toEqual(['tap:a']);
    tap(r, 'a');
    vi.advanceTimersByTime(1000);
    expect(calls).toEqual(['tap:a']);
  });
});

// ------------------------------------------------------------------
// Symboles des ouvertures (constats F114, F139)
// ------------------------------------------------------------------

describe('openingPrimitives', () => {
  const TYPES: OpeningType[] = ['door', 'double_door', 'sliding_door', 'window', 'french_window'];

  it('aucune dimension négative ni valeur non finie, même pour une ouverture minuscule', () => {
    for (const type of TYPES) {
      for (const width of [0.01, 0.9, 2.4]) {
        const prims = openingPrimitives({ type, width, flipSide: false, flipDirection: true }, 0.2, 0.02);
        for (const p of prims) {
          for (const v of Object.values(p)) if (typeof v === 'number') expect(Number.isFinite(v)).toBe(true);
          if (p.kind === 'rect') {
            expect(p.w).toBeGreaterThanOrEqual(0);
            expect(p.h).toBeGreaterThanOrEqual(0);
          }
        }
      }
    }
  });

  it('porte : vantail et débattement de la largeur de la porte, côté inversé par flipSide', () => {
    const prims = openingPrimitives({ type: 'door', width: 0.9, flipSide: false, flipDirection: false }, 0.2, 0);
    const arc = prims.find(p => p.kind === 'arc');
    const leaf = prims.find(p => p.role === 'leaf');
    expect(arc && arc.kind === 'arc' && arc.r).toBe(0.9);
    expect(leaf && leaf.kind === 'line' && leaf.y2).toBe(0.9);
    const flipped = openingPrimitives({ type: 'door', width: 0.9, flipSide: true, flipDirection: false }, 0.2, 0);
    const fl = flipped.find(p => p.role === 'leaf');
    expect(fl && fl.kind === 'line' && fl.y2).toBe(-0.9);
  });

  it('double porte : deux vantaux d’une demi-largeur', () => {
    const arcs = openingPrimitives({ type: 'double_door', width: 1.6, flipSide: false, flipDirection: false }, 0.2, 0)
      .filter(p => p.kind === 'arc');
    expect(arcs).toHaveLength(2);
    for (const a of arcs) expect(a.kind === 'arc' && a.r).toBe(0.8);
  });

  it('fenêtre : sashCount explicite prioritaire sur la largeur (même règle que l’export)', () => {
    expect(windowSashes({ width: 1.4, sashCount: 1 })).toBe(1);
    expect(windowSashes({ width: 1.4 })).toBe(2);
    expect(windowSashes({ width: 0.9 })).toBe(1);
    expect(windowSashes({ width: 0.9, sashCount: 2 })).toBe(2);
  });

  it('hauteurs de baie bornées par le mur ; fenêtre sur allège', () => {
    const [sill, top] = openingVerticalRange({ type: 'window' }, 2.5);
    expect(sill).toBeGreaterThan(0);
    expect(top).toBeLessThanOrEqual(2.5);
    const [d0, d1] = openingVerticalRange({ type: 'door' }, 1);
    expect(d0).toBe(0);
    expect(d1).toBeLessThan(1);
  });
});

// ------------------------------------------------------------------
// Projection et scène 3D (constat F120)
// ------------------------------------------------------------------

const PRESET_YAWS = [-35, 35, 125, -125, 0, 180];
const CENTER: Point = { x: 400, y: 300 };

describe('projection 3D', () => {
  it('le sol se projette par la matrice affine et se déprojette exactement', () => {
    for (const yaw of PRESET_YAWS) {
      const b = cameraBasis({ pitchDeg: 55, yawDeg: yaw });
      const [a, bb, c, d, e, f] = floorMatrix(b, CENTER);
      for (const v of [{ x: 0, y: 0 }, { x: 123, y: -45 }, { x: 700, y: 520 }]) {
        const s = projectPoint(v, 0, b, CENTER);
        expect(close(s.x, a * v.x + c * v.y + e)).toBe(true);
        expect(close(s.y, bb * v.x + d * v.y + f)).toBe(true);
        const back = unprojectFloor(s, b, CENTER);
        expect(close(back.x, v.x, 1e-6) && close(back.y, v.y, 1e-6)).toBe(true);
      }
    }
  });

  it('la hauteur est extrudée vers le haut de l’écran quel que soit l’angle (presets NE et NO compris)', () => {
    for (const yaw of PRESET_YAWS) {
      const b = cameraBasis({ pitchDeg: 55, yawDeg: yaw });
      const ground = projectPoint({ x: 250, y: 120 }, 0, b, CENTER);
      const top = projectPoint({ x: 250, y: 120 }, 80, b, CENTER);
      expect(top.y).toBeLessThan(ground.y);
      expect(close(top.x, ground.x)).toBe(true);
    }
  });

  it('profondeur : un point déplacé vers l’observateur est plus proche', () => {
    for (const yaw of PRESET_YAWS) {
      const b = cameraBasis({ pitchDeg: 40, yawDeg: yaw });
      const dir = viewerDirection(b);
      const v = { x: 300, y: 200 };
      const nearer = { x: v.x + dir.x * 50, y: v.y + dir.y * 50 };
      expect(pointDepth(nearer, 0, b, CENTER)).toBeGreaterThan(pointDepth(v, 0, b, CENTER));
    }
  });

  it('pan 3D : le sol suit le pointeur', () => {
    const b = cameraBasis({ pitchDeg: 60, yawDeg: 125 });
    const v = { x: 200, y: 260 };
    const delta = { x: 17, y: -9 };
    const moved = screenDeltaToFloor(delta, b);
    const s0 = projectPoint(v, 0, b, CENTER);
    const s1 = projectPoint({ x: v.x + moved.x, y: v.y + moved.y }, 0, b, CENTER);
    expect(close(s1.x - s0.x, delta.x) && close(s1.y - s0.y, delta.y)).toBe(true);
  });

  it('transition de caméra par le chemin angulaire le plus court', () => {
    expect(shortestAngleDelta(170, -170)).toBe(20);
    expect(shortestAngleDelta(-170, 170)).toBe(-20);
    expect(shortestAngleDelta(-35, 125)).toBe(160);
  });
});

describe('scène 3D des murs', () => {
  const toView = (p: Point) => ({ x: p.x * 50 + 300, y: p.y * 50 + 200 });

  function scene(yawDeg: number, openings: Opening[] = []) {
    return buildWallScene({
      walls: SQUARE_WALLS,
      openings,
      polygons: computeWallPolygons(SQUARE_WALLS),
      heights: computeWallHeights(SQUARE_WALLS, [SQUARE_ROOM]),
      toView,
      scale: 50,
      heightScale: 1,
      basis: cameraBasis({ pitchDeg: 55, yawDeg }),
      center: CENTER
    });
  }

  it('hauteur des murs : pièce bordée, sinon hauteur propre du mur, sinon défaut du projet', () => {
    const lone = { ...wall('lone', 10, 10, 12, 10), height: 2.2 };
    const bare = wall('bare', 20, 20, 22, 20);
    const heights = computeWallHeights([...SQUARE_WALLS, lone, bare], [SQUARE_ROOM], 2.4);
    expect(heights.get('north')).toBe(3);
    expect(heights.get('lone')).toBe(2.2);
    expect(heights.get('bare')).toBe(2.4);
  });

  it('faces extrudées vers le haut et triées de la plus lointaine à la plus proche, pour chaque préréglage', () => {
    for (const yaw of PRESET_YAWS) {
      const items = scene(yaw);
      const faces = items.filter(i => i.kind === 'face');
      const caps = items.filter(i => i.kind === 'cap');
      expect(faces.length).toBeGreaterThan(0);
      expect(caps).toHaveLength(4);
      // Faces avant les chapeaux, chaque groupe trié par profondeur croissante.
      expect(items.indexOf(faces[faces.length - 1])).toBeLessThan(items.indexOf(caps[0]));
      for (let i = 1; i < faces.length; i++) expect(faces[i].depth).toBeGreaterThanOrEqual(faces[i - 1].depth);
      for (const face of faces) {
        const [b0, b1, t1, t0] = face.points;
        expect(t0.y).toBeLessThan(b0.y);
        expect(t1.y).toBeLessThan(b1.y);
      }
    }
  });

  it('faces arrière éliminées : vue Sud-Ouest, une face visible par mur ; la face sud passe devant le mur nord', () => {
    const faces = scene(-35).filter(i => i.kind === 'face');
    expect(faces.map(f => f.wallId).sort()).toEqual(['east', 'north', 'south', 'west']);
    const order = faces.map(f => f.wallId);
    expect(order.indexOf('south')).toBeGreaterThan(order.indexOf('north'));
  });

  it('portes et fenêtres reprojetées sur la face de leur mur', () => {
    const window: Opening = { id: 'op_w', wallId: 'south', type: 'window', offset: 2, width: 1.2, flipSide: false, flipDirection: false };
    const faces = scene(-35, [window]).filter(i => i.kind === 'face');
    const south = faces.find(f => f.wallId === 'south');
    expect(south && south.kind === 'face' && south.panels.map(p => p.openingId)).toEqual(['op_w']);
    const panel = south && south.kind === 'face' ? south.panels[0] : null;
    // Fenêtre sur allège : le bas de la baie est au-dessus du pied du mur.
    const baseY = Math.max(...south!.points.slice(0, 2).map(p => p.y));
    expect(Math.max(...panel!.points.map(p => p.y))).toBeLessThan(baseY);
  });
});

describe('memoizeLast', () => {
  it('recalcule seulement quand un argument change (identité)', () => {
    const fn = vi.fn((a: readonly number[], k: number) => a.map(v => v * k));
    const memo = memoizeLast(fn);
    const arr = [1, 2];
    const first = memo(arr, 2);
    expect(memo(arr, 2)).toBe(first);
    expect(fn).toHaveBeenCalledTimes(1);
    memo([1, 2], 2);
    memo([1, 2], 3);
    expect(fn).toHaveBeenCalledTimes(3);
  });
});

// ------------------------------------------------------------------
// Composant : nouveau rendu, épingles accessibles, actions de la carte
// ------------------------------------------------------------------

function project(bindings: EntityBinding[]): HomeArchitectProject {
  return {
    id: 'plan_test0001',
    name: 'Test',
    created_at: '2026-10-01T00:00:00Z',
    updated_at: '2026-10-01T00:00:00Z',
    pixelsPerMeter: 50,
    grid: { size: 0.5, subdivisions: 2, snapToGrid: true, snapToAngles: true, snapToElements: true },
    walls: SQUARE_WALLS,
    openings: [],
    rooms: [SQUARE_ROOM],
    bindings
  };
}

describe('<home-architect-canvas>', () => {
  let el: HomeArchitectCanvas;
  let callService: ReturnType<typeof vi.fn>;
  let hass: HassDisplayContext & { callService: typeof callService };

  const BINDINGS = [
    bind('light.salon', { roomId: 'room_1' }),
    bind('cover.garage', { position: { x: 2, y: 2 } }),
    bind('binary_sensor.box', { position: { x: 3, y: 1 } }),
    bind('binary_sensor.disparu', { position: { x: 3, y: 3 } })
  ];

  async function mount(dashboard: boolean) {
    callService = vi.fn(() => Promise.resolve());
    hass = {
      ...hassWith({
        'light.salon': st('light.salon', 'off', { friendly_name: 'Plafonnier' }),
        'cover.garage': st('cover.garage', 'closed', { device_class: 'garage', friendly_name: 'Garage' }),
        'binary_sensor.box': st('binary_sensor.box', 'on', { device_class: 'connectivity', friendly_name: 'Box' }),
        'sensor.puissance': st('sensor.puissance', '1523.4567', { unit_of_measurement: 'W' })
      }),
      themes: { darkMode: false },
      callService
    };
    el = document.createElement('home-architect-canvas');
    expect(el).toBeInstanceOf(CanvasElement);
    el.project = project(BINDINGS);
    el.hass = hass;
    el.isDashboardMode = dashboard;
    el.interactive = !dashboard;
    el.readOnly = dashboard;
    el.animations = false;
    document.body.appendChild(el);
    await el.updateComplete;
  }

  const pins = () => [...el.shadowRoot!.querySelectorAll<SVGGElement>('.entity-pin')];
  const pinOf = (entityId: string) => pins()[BINDINGS.findIndex(b => b.entityId === entityId)];

  afterEach(() => {
    el?.remove();
    vi.useRealTimers();
  });

  it('épingles : bouton nommé « nom : état », focusable, <title> en premier enfant, orphelin signalé', async () => {
    await mount(true);
    expect(pins()).toHaveLength(4);
    for (const pin of pins()) {
      expect(pin.getAttribute('role')).toBe('button');
      expect(pin.getAttribute('tabindex')).toBe('0');
      expect(pin.firstElementChild?.tagName.toLowerCase()).toBe('title');
    }
    expect(pinOf('light.salon').getAttribute('aria-label')).toBe('Plafonnier : Éteint');
    expect(pinOf('binary_sensor.disparu').classList.contains('orphan')).toBe(true);
    expect(pinOf('binary_sensor.box').querySelector('.radar-pulse-ring')).toBeNull();
  });

  it('palette claire suivie depuis hass.themes.darkMode', async () => {
    await mount(true);
    expect(el.getAttribute('scheme')).toBe('light');
    expect(el.hasAttribute('follow-theme')).toBe(true);
  });

  it('un changement d’état d’une entité non affichée ne redessine pas le plan', async () => {
    await mount(true);
    const render = vi.spyOn(el, 'render');
    el.hass = { ...hass, states: { ...hass.states, 'sensor.puissance': st('sensor.puissance', '1600', { unit_of_measurement: 'W' }) } };
    await el.updateComplete;
    expect(render).not.toHaveBeenCalled();

    el.hass = { ...el.hass, states: { ...el.hass.states, 'light.salon': st('light.salon', 'on', { friendly_name: 'Plafonnier' }) } } as typeof hass;
    await el.updateComplete;
    expect(render).toHaveBeenCalledTimes(1);
    expect(pinOf('light.salon').getAttribute('aria-label')).toBe('Plafonnier : Allumé');
  });

  it('carte : un tap sur la porte de garage ouvre more-info sans l’actionner', async () => {
    await mount(true);
    const moreInfo = vi.fn();
    el.addEventListener('hass-more-info', moreInfo);
    pinOf('cover.garage').dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    expect(moreInfo).toHaveBeenCalledTimes(1);
    expect(callService).not.toHaveBeenCalled();
  });

  it('carte : double tap sur une lumière = more-info une seule fois, sans bascule ; tap simple = bascule', async () => {
    await mount(true);
    vi.useFakeTimers();
    const moreInfo = vi.fn();
    el.addEventListener('hass-more-info', moreInfo);
    const light = pinOf('light.salon');
    light.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    vi.advanceTimersByTime(80);
    light.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    vi.advanceTimersByTime(1000);
    expect(moreInfo).toHaveBeenCalledTimes(1);
    expect(callService).not.toHaveBeenCalled();

    light.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    vi.advanceTimersByTime(DOUBLE_TAP_DELAY_MS + 10);
    expect(callService).toHaveBeenCalledTimes(1);
    expect(callService).toHaveBeenCalledWith('light', 'toggle', { entity_id: 'light.salon' });
  });

  it('carte : Entrée sur une épingle déclenche l’action du tap', async () => {
    await mount(true);
    pinOf('light.salon').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
    expect(callService).toHaveBeenCalledWith('light', 'toggle', { entity_id: 'light.salon' });
  });

  it('murs 2D joints : contour et remplissage dessinés depuis computeWallPolygons', async () => {
    await mount(false);
    const polygons = computeWallPolygons(SQUARE_WALLS);
    const outlines = [...el.shadowRoot!.querySelectorAll('.wall-outline')];
    const fills = [...el.shadowRoot!.querySelectorAll('.wall-rect')];
    expect(outlines).toHaveLength(4);
    expect(fills).toHaveLength(4);
    SQUARE_WALLS.forEach((w, i) => {
      const count = fills[i].getAttribute('points')!.trim().split(/\s+/).length;
      expect(count).toBe(polygons.get(w.id)!.length);
    });
  });

  it('redimensionnement reçu avec un hass sans effet : le rendu (centre de rotation) n’est pas perdu', async () => {
    await mount(true);
    const internals = el as unknown as {
      viewTouched: boolean;
      pendingFitPadding: number | null;
      handleResize(rect: { width: number; height: number }): void;
    };
    // Vue déjà touchée, aucun cadrage en attente : seul un nouveau rendu est demandé (pas de nouveau viewport).
    internals.viewTouched = true;
    internals.pendingFitPadding = null;
    const render = vi.spyOn(el, 'render');
    internals.handleResize({ width: 913, height: 517 });
    el.hass = { ...hass, states: { ...hass.states, 'sensor.puissance': st('sensor.puissance', '1700', { unit_of_measurement: 'W' }) } };
    await el.updateComplete;
    expect(render).toHaveBeenCalledTimes(1);
  });

  it('sortie de la 3D pendant la transition de caméra : l’angle visé est conservé', async () => {
    await mount(false);
    el.animations = true;
    await el.updateComplete;
    const camera = () => {
      const c = el as unknown as { orbitPitch: number; orbitYaw: number };
      return { pitch: c.orbitPitch, yaw: c.orbitYaw };
    };
    const before = camera();
    el.is3DMode = true;
    await el.updateComplete;
    el.is3DMode = false;
    await el.updateComplete;
    expect(camera()).toEqual(before);
  });

  it('bouton 2D/3D : émet toggle-3d sans modifier is3DMode (le parent possède la valeur)', async () => {
    await mount(false);
    const toggle = vi.fn();
    el.addEventListener('toggle-3d', toggle);
    el.shadowRoot!.querySelector<HTMLButtonElement>('.canvas-hud .hud-btn')!.click();
    expect(toggle).toHaveBeenCalledTimes(1);
    expect((toggle.mock.calls[0][0] as CustomEvent).detail).toEqual({ is3DMode: true });
    expect(el.is3DMode).toBe(false);
  });
});
