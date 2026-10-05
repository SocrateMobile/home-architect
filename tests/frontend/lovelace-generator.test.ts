import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { LovelaceGenerator, toYaml, yamlQuote } from '../../src/core/lovelace-generator';
import { SvgExporter } from '../../src/core/svg-exporter';
import { createEmptyProject } from '../../src/core/project-model';
import { EntityBinding, ExportFrame, HomeArchitectProject } from '../../src/core/types';

const IMAGE_URL = '/api/home_architect/published/plan_test0001-abcdefghijklmnopqrstuvwx.svg?v=0123456789ab';
const FRAME: ExportFrame = { minX: 0, minY: 0, maxX: 10, maxY: 8 };

type Element = Record<string, any>;

function project(bindings: EntityBinding[] = [], overrides: Partial<HomeArchitectProject> = {}): HomeArchitectProject {
  return { ...createEmptyProject({ name: 'Rez-de-chaussée' }), id: 'plan_test0001', bindings, ...overrides };
}

function binding(entityId: string, x = 5, y = 4, extra: Partial<EntityBinding> = {}): EntityBinding {
  return { id: `b_${entityId}`, entityId, position: { x, y }, ...extra };
}

/** YAML picture-elements analysé en YAML 1.2 ET 1.1 (PyYAML), résultats identiques. */
function pictureConfig(p: HomeArchitectProject, frame: ExportFrame = FRAME): { config: Record<string, any>; yaml: string } {
  const yaml = LovelaceGenerator.generatePictureElementsYaml(p, { imageUrl: IMAGE_URL, frame });
  const config = parse(yaml);
  expect(parse(yaml, { version: '1.1' })).toEqual(config);
  return { config, yaml };
}

function element(entityId: string, extra: Partial<EntityBinding> = {}): Element {
  return pictureConfig(project([binding(entityId, 5, 4, extra)])).config.elements[0];
}

const TRICKY_STRINGS = [
  '', 'simple', 'a: b # c', '- tiret', '? question', '{json: 1}', '[1, 2]', '*alias', '&ancre', '!tag', '%directive',
  '@arobase', '`backtick', 'yes', 'no', 'on', 'off', 'null', '~', 'true', '0123', '1e3', '0x1F', '.inf', '12:30',
  'guillemets " et \\ antislash', "apostrophe ' simple", 'ligne1\nligne2\r\n\ttab', '  espaces  ',
  'emoji 💡🛋️ é à ü', 'séparateurs \u2028\u2029 NEL \u0085', 'contrôles \u0000\u0007\u001b\u007f\u009f', 'BOM \ufeff',
  'surrogate isolé \ud800 fin', '#commentaire', '---', '...', 'clé: "valeur"',
];

describe('yamlQuote', () => {
  it.each(TRICKY_STRINGS)('aller-retour exact en YAML 1.2 et 1.1 : %j', (value) => {
    const doc = `k: ${yamlQuote(value)}\n`;
    expect(parse(doc).k).toBe(value);
    expect(parse(doc, { version: '1.1' }).k).toBe(value);
  });

  it('produit toujours une seule ligne entre guillemets doubles', () => {
    for (const value of TRICKY_STRINGS) {
      const quoted = yamlQuote(value);
      expect(quoted.startsWith('"') && quoted.endsWith('"')).toBe(true);
      expect(quoted).not.toMatch(/[\n\r\u2028\u2029\u0085]/);
    }
  });
});

describe('toYaml', () => {
  it('sérialise une structure imbriquée (aller-retour exact)', () => {
    const value = {
      type: 'picture-elements',
      count: 3,
      ratio: 0.25,
      enabled: true,
      nothing: null,
      empty_list: [],
      empty_map: {},
      'clé spéciale: #1': 'v',
      elements: [
        { type: 'state-icon', style: { top: '10%', '--state-icon-color': '#fff', 'border-radius': '8px' } },
        'scalaire',
        [1, 'deux'],
      ],
    };
    expect(parse(toYaml(value))).toEqual(value);
    expect(parse(toYaml(value), { version: '1.1' })).toEqual(value);
  });

  it('cite systématiquement les chaînes et omet les clés undefined', () => {
    const yaml = toYaml({ a: 'yes', b: '12', c: undefined });
    expect(yaml).toBe('a: "yes"\nb: "12"\n');
  });

  it('cite les clés que YAML 1.1 lirait comme booléen ou null', () => {
    const value = { on: 1, Off: 2, yes: 3, n: 4, null: 5, TRUE: 6, online: 7 };
    const yaml = toYaml(value);
    expect(yaml).toContain('"on": 1');
    expect(yaml).toContain('online: 7');
    expect(parse(yaml)).toEqual(value);
    expect(parse(yaml, { version: '1.1' })).toEqual(value);
  });
});

describe('LovelaceGenerator.generatePictureElementsYaml', () => {
  it('référence l’URL publiée (avec ?v=hash) et produit un YAML valide', () => {
    const { config } = pictureConfig(project([binding('light.salon')]));
    expect(config.type).toBe('picture-elements');
    expect(config.image).toBe(IMAGE_URL);
    expect(config.title).toBe('Rez-de-chaussée');
    expect(config.elements).toHaveLength(1);
  });

  it('elements est toujours un tableau, jamais null (plan sans entité)', () => {
    const { config, yaml } = pictureConfig(project([]));
    expect(Array.isArray(config.elements)).toBe(true);
    expect(config.elements).toHaveLength(0);
    expect(yaml).toContain('elements: []');
  });

  it('positions en % du cadre fourni, cohérentes avec le viewBox du SVG exporté', () => {
    const p = project([binding('light.a', 5, 4), binding('light.b', 2.5, 6)], { pixelsPerMeter: 73 });
    const { config } = pictureConfig(p);
    expect(config.elements[0].style).toMatchObject({ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' });
    expect(config.elements[1].style).toMatchObject({ left: '25%', top: '75%' });

    // Même cadre pour le SVG : le point à left/top % du viewBox est la position monde × ppm.
    const svg = SvgExporter.exportToSvg(p, { frame: FRAME });
    const [vx, vy, vw, vh] = /viewBox="([^"]+)"/.exec(svg)![1].split(' ').map(Number);
    const left = parseFloat(config.elements[1].style.left);
    const top = parseFloat(config.elements[1].style.top);
    expect(vx + (left / 100) * vw).toBeCloseTo(2.5 * 73, 1);
    expect(vy + (top / 100) * vh).toBeCloseTo(6 * 73, 1);
  });

  it('utilise le cadre figé du projet à défaut de cadre explicite', () => {
    const p = project([binding('light.a', 1, 1)], { exportFrame: { minX: 0, minY: 0, maxX: 4, maxY: 2 } });
    const config = parse(LovelaceGenerator.generatePictureElementsYaml(p, { imageUrl: IMAGE_URL }));
    expect(config.elements[0].style).toMatchObject({ left: '25%', top: '50%' });
  });

  it('actions : table partagée defaultTapAction, appui long more-info', () => {
    expect(element('light.salon').tap_action).toEqual({ action: 'toggle' });
    expect(element('switch.prise').tap_action).toEqual({ action: 'toggle' });
    expect(element('scene.soiree').tap_action).toEqual({ action: 'toggle' });
    expect(element('input_button.sonnette').tap_action).toEqual({ action: 'toggle' });
    expect(element('cover.volet').tap_action).toEqual({ action: 'more-info' });
    expect(element('lock.porte').tap_action).toEqual({ action: 'more-info' });
    expect(element('binary_sensor.porte').tap_action).toEqual({ action: 'more-info' });
    expect(element('light.salon').hold_action).toEqual({ action: 'more-info' });
  });

  it('actions : choix de l’utilisateur respectés (none, navigate avec chemin)', () => {
    expect(element('light.salon', { tapAction: 'none' }).tap_action).toEqual({ action: 'none' });
    expect(element('light.salon', { holdAction: 'toggle' }).hold_action).toEqual({ action: 'toggle' });
    expect(element('sensor.t', { tapAction: 'navigate', navigationPath: '/lovelace/salon' }).tap_action)
      .toEqual({ action: 'navigate', navigation_path: '/lovelace/salon' });
    // navigate sans chemin : retour à l’action par défaut
    expect(element('light.salon', { tapAction: 'navigate' }).tap_action).toEqual({ action: 'toggle' });
  });

  it('icône forcée uniquement si l’utilisateur en a choisi une (mdiIcon)', () => {
    expect(element('binary_sensor.porte')).not.toHaveProperty('icon');
    expect(element('binary_sensor.porte', { icon: '🚨' })).not.toHaveProperty('icon');
    expect(element('light.salon', { icon: '💡', mdiIcon: 'mdi:ceiling-light' }).icon).toBe('mdi:ceiling-light');
  });

  it('nom : seulement un nom saisi par l’utilisateur (sinon HA affiche le friendly_name courant)', () => {
    expect(element('light.salon_principal')).not.toHaveProperty('title');
    const tricky = 'Lampe "salon"\n: - # ok';
    expect(element('light.salon', { customName: tricky }).title).toBe(tricky);
  });

  it('valeurs : état formaté par HA, sans unité ni texte français codés en dur', () => {
    const climate = element('climate.sejour');
    expect(climate).toMatchObject({ type: 'state-label', attribute: 'current_temperature' });
    expect(climate).not.toHaveProperty('suffix');
    expect(element('sensor.temperature_chambre')).toMatchObject({ type: 'state-label' });
    expect(element('sensor.temperature_chambre')).not.toHaveProperty('suffix');
    expect(element('binary_sensor.mouvement')).toMatchObject({ type: 'state-icon' });

    const { yaml } = pictureConfig(project([binding('climate.a'), binding('sensor.b'), binding('light.c'), binding('binary_sensor.d')]));
    const body = yaml.split('\n').filter(line => !line.startsWith('#')).join('\n');
    expect(body).not.toMatch(/°C|Allumé|Éteint|Détecté|Inactif/);
  });

  it('couleurs d’état modernes (--state-*), plus de --paper-item-icon-*', () => {
    const { yaml } = pictureConfig(project([binding('light.a'), binding('switch.b'), binding('binary_sensor.c')]));
    expect(yaml).not.toContain('--paper-item-icon');
    expect(element('light.a').style['--state-light-active-color']).toBe('#facc15');
    expect(element('switch.b').style['--state-switch-active-color']).toBe('#38bdf8');
    expect(element('binary_sensor.c').style).toHaveProperty('--state-inactive-color');
    expect(element('binary_sensor.c').style).not.toHaveProperty('--state-binary_sensor-active-color');
  });

  it('un nom de projet piégé ne casse pas le YAML (commentaire sur une seule ligne)', () => {
    const p = project([binding('light.a')], { name: 'Plan\nimage: "/evil.svg"\n# x' });
    const { config, yaml } = pictureConfig(p);
    expect(config.image).toBe(IMAGE_URL);
    expect(config.title).toBe('Plan\nimage: "/evil.svg"\n# x');
    expect(yaml.split('\n')[0]).toMatch(/^# /);
  });
});

describe('LovelaceGenerator.generateHomeArchitectCardYaml', () => {
  it('carte intégrée : type custom et project_id, sans titre figé', () => {
    const yaml = LovelaceGenerator.generateHomeArchitectCardYaml(project([], { id: 'rdc' }), { viewMode: '3d' });
    const config = parse(yaml);
    expect(parse(yaml, { version: '1.1' })).toEqual(config);
    expect(config).toEqual({ type: 'custom:home-architect-card', project_id: 'rdc', view_mode: '3d', show_header: true, height: '520px' });
  });

  it('valeurs par défaut', () => {
    const config = parse(LovelaceGenerator.generateHomeArchitectCardYaml(project()));
    expect(config).toMatchObject({ project_id: 'plan_test0001', view_mode: '2d' });
  });
});
