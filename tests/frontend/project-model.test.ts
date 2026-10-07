import { describe, expect, it, vi } from 'vitest';
import {
  MAX_PROJECT_BYTES, MAX_PUBLISH_BYTES, PROJECT_ID_PATTERN,
  bindingDisplayName, clearRedundantCustomNames, cloneProject, createEmptyProject, defaultTapAction,
  entityDomain, estimateJsonBytes, generateElementId, generateProjectId, legacyCategory, normalizeProject,
  normalizePublishInfo, serviceForTap, stripServerFields
} from '../../src/core/project-model';
import { HomeArchitectProject, PROJECT_SCHEMA_VERSION } from '../../src/core/types';

/** Regex appliquée par le backend (websocket.py : r"^[a-zA-Z0-9_\-]{1,64}$") aux identifiants de projet. */
const BACKEND_ID_REGEX = /^[a-zA-Z0-9_-]{1,64}$/;

const wall = (id: string, x1 = 0, y1 = 0, x2 = 4, y2 = 0) => ({
  id, start: { x: x1, y: y1 }, end: { x: x2, y: y2 }, thickness: 0.2, type: 'standard',
});

const publish = {
  url: '/api/home_architect/published/rdc-abcdefghijklmnopqrstuv.svg?v=123',
  path: '/api/home_architect/published/rdc-abcdefghijklmnopqrstuv.svg',
  hash: '123',
  published_at: '2026-10-01T10:00:00+00:00',
  include_background: false,
};

describe('constantes', () => {
  it('limites de taille', () => {
    expect(MAX_PROJECT_BYTES).toBe(2 * 1024 * 1024);
    expect(MAX_PUBLISH_BYTES).toBe(3.5 * 1024 * 1024);
  });
});

describe('generateProjectId / generateElementId', () => {
  it('produit plan_ + 8 caractères [a-z0-9], accepté par le backend', () => {
    for (let i = 0; i < 200; i++) {
      const id = generateProjectId();
      expect(id).toMatch(/^plan_[a-z0-9]{8}$/);
      expect(id).toMatch(BACKEND_ID_REGEX);
      expect(id).toMatch(PROJECT_ID_PATTERN);
    }
  });

  it('génère des identifiants distincts', () => {
    const ids = new Set(Array.from({ length: 500 }, () => generateProjectId()));
    expect(ids.size).toBe(500);
  });

  it('utilise crypto.getRandomValues', () => {
    const spy = vi.spyOn(crypto, 'getRandomValues');
    generateProjectId();
    expect(spy).toHaveBeenCalled();
  });

  it('fonctionne sans Web Crypto', () => {
    vi.stubGlobal('crypto', undefined);
    expect(generateProjectId()).toMatch(/^plan_[a-z0-9]{8}$/);
  });

  it('generateElementId : préfixe + _ + 10 caractères', () => {
    expect(generateElementId('wall')).toMatch(/^wall_[a-z0-9]{10}$/);
    expect(generateElementId('op')).not.toBe(generateElementId('op'));
  });
});

describe('createEmptyProject', () => {
  it('crée un projet vide avec un id immuable distinct de la catégorie', () => {
    const p = createEmptyProject({ category: 'rdc' });
    expect(p.id).toMatch(/^plan_[a-z0-9]{8}$/);
    expect(p.category).toBe('rdc');
    expect(p.name).toBe('Rez-de-Chaussée');
    expect(p.schema_version).toBe(PROJECT_SCHEMA_VERSION);
    expect(p.revision).toBeUndefined();
    expect(p).toMatchObject({ walls: [], openings: [], rooms: [], bindings: [], furniture: [], pixelsPerMeter: 50 });
    expect(p.grid).toEqual({ size: 0.5, subdivisions: 2, snapToGrid: true, snapToAngles: true, snapToElements: true });
  });

  it('respecte nom, catégorie libre et échelle (bornée)', () => {
    const p = createEmptyProject({ name: '  Garage  ', category: 'autre', pixelsPerMeter: 1e6 });
    expect(p.name).toBe('Garage');
    expect(p.category).toBe('autre');
    expect(p.pixelsPerMeter).toBe(2000);
    expect(createEmptyProject().name).toBe('Nouveau plan');
    expect(createEmptyProject().category).toBeUndefined();
  });
});

describe('normalizeProject', () => {
  it.each([null, undefined, 42, 'texte', [], true, NaN])('tolère une entrée invalide (%s)', raw => {
    const p = normalizeProject(raw);
    expect(p.id).toMatch(/^plan_[a-z0-9]{8}$/);
    expect(p).toMatchObject({ walls: [], openings: [], rooms: [], bindings: [], furniture: [] });
    expect(p.schema_version).toBe(PROJECT_SCHEMA_VERSION);
    expect(p.pixelsPerMeter).toBe(50);
    expect(p.grid.size).toBe(0.5);
    expect(typeof p.created_at).toBe('string');
    expect(typeof p.updated_at).toBe('string');
  });

  it('ne lève jamais, même sur un objet piégé', () => {
    const trap = Object.defineProperty({}, 'walls', { get() { throw new Error('boom'); }, enumerable: true });
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    expect(() => normalizeProject(trap)).not.toThrow();
    expect(normalizeProject(trap).walls).toEqual([]);
    expect(warn).toHaveBeenCalled();
  });

  it('migre un projet de l’ancien schéma (id = niveau, sans grille ni mobilier)', () => {
    const p = normalizeProject({
      id: 'rdc',
      name: 'Maison',
      created_at: '2025-01-01T00:00:00.000Z',
      updated_at: '2025-02-01T00:00:00.000Z',
      pixelsPerMeter: 40,
      walls: [wall('w1')],
      openings: [],
      rooms: [],
      bindings: [
        { id: 'b1', entityId: 'cover.garage', position: { x: 1, y: 1 }, tapAction: 'toggle', customName: 'Garage' },
        { id: 'b2', entityId: 'light.salon', position: { x: 2, y: 1 }, tapAction: 'more-info' },
      ],
    });
    expect(p.id).toBe('rdc');
    expect(p.category).toBe('rdc');
    expect(p.name).toBe('Maison');
    expect(p.created_at).toBe('2025-01-01T00:00:00.000Z');
    expect(p.updated_at).toBe('2025-02-01T00:00:00.000Z');
    expect(p.furniture).toEqual([]);
    expect(p.grid).toEqual({ size: 0.5, subdivisions: 2, snapToGrid: true, snapToAngles: true, snapToElements: true });
    expect(p.schema_version).toBe(2);
    // 'toggle' était figé au dépôt : il est effacé pour retrouver l'action par défaut du domaine.
    expect(p.bindings[0].tapAction).toBeUndefined();
    expect(p.bindings[0].customName).toBe('Garage');
    expect(p.bindings[1].tapAction).toBe('more-info');
  });

  it('conserve tapAction « toggle » choisi dans un projet du schéma 2', () => {
    const p = normalizeProject({
      id: 'plan_ab12cd34', schema_version: 2,
      bindings: [{ id: 'b', entityId: 'cover.volet', position: { x: 0, y: 0 }, tapAction: 'toggle', holdAction: 'none' }],
    });
    expect(p.bindings[0].tapAction).toBe('toggle');
    expect(p.bindings[0].holdAction).toBe('none');
  });

  it('remplace un id invalide et garde une catégorie libre', () => {
    const p = normalizeProject({ id: '../etc/passwd', name: 'Garage', category: 'autre' });
    expect(p.id).toMatch(/^plan_[a-z0-9]{8}$/);
    expect(p.category).toBe('autre');
    expect(normalizeProject({ id: 'x'.repeat(65) }).id).toMatch(/^plan_/);
    expect(normalizeProject({ id: 'plan_custom' }).category).toBeUndefined();
  });

  it('remplace les nombres non finis par les valeurs par défaut', () => {
    const p = normalizeProject({
      id: 'p1',
      pixelsPerMeter: NaN,
      grid: { size: Infinity, subdivisions: NaN, snapToGrid: false },
      walls: [{ ...wall('w1'), thickness: NaN, height: NaN }],
      defaultCeilingHeight: -Infinity,
    });
    expect(p.pixelsPerMeter).toBe(50);
    expect(p.grid).toEqual({ size: 0.5, subdivisions: 2, snapToGrid: false, snapToAngles: true, snapToElements: true });
    expect(p.walls[0].thickness).toBe(0.2);
    expect(p.walls[0].height).toBeUndefined();
    expect(p.defaultCeilingHeight).toBeUndefined();
  });

  it('accepte les nombres hérités sous forme de chaîne', () => {
    const p = normalizeProject({ id: 'p1', pixelsPerMeter: '60', defaultCeilingHeight: '2.7' });
    expect(p.pixelsPerMeter).toBe(60);
    expect(p.defaultCeilingHeight).toBe(2.7);
  });

  it('borne échelle, épaisseurs, grille et fond', () => {
    expect(normalizeProject({ pixelsPerMeter: 1 }).pixelsPerMeter).toBe(5);
    expect(normalizeProject({ pixelsPerMeter: 99999 }).pixelsPerMeter).toBe(2000);
    expect(normalizeProject({ grid: { size: 0.001 } }).grid.size).toBe(0.05);
    expect(normalizeProject({ grid: { size: 10 } }).grid.size).toBe(2);
    const p = normalizeProject({
      walls: [{ ...wall('thin'), thickness: 0.001 }, { ...wall('thick', 0, 1, 4, 1), thickness: 5 }],
      background: { imageUrl: 'https://example.com/plan.png', opacity: 3, scale: -2, visible: false, offset: { x: NaN, y: 0 } },
    });
    expect(p.walls.map(w => w.thickness)).toEqual([0.02, 1.5]);
    expect(p.background).toMatchObject({ opacity: 1, scale: 1, visible: false, offset: { x: 0, y: 0 }, rotation: 0 });
    expect(normalizeProject({ background: { imageUrl: '/local/plan.png', opacity: -1 } }).background?.opacity).toBe(0);
  });

  it('filtre les murs invalides et dégénérés', () => {
    const p = normalizeProject({
      walls: [
        wall('ok'),
        { id: 'no-end', start: { x: 0, y: 0 }, thickness: 0.2 },
        { id: 'nan', start: { x: NaN, y: 0 }, end: { x: 1, y: 1 } },
        wall('zero', 1, 1, 1, 1),
        null,
        'mur',
        { ...wall('typed', 0, 2, 3, 2), type: 'inconnu' },
      ],
    });
    expect(p.walls.map(w => w.id)).toEqual(['ok', 'typed']);
    expect(p.walls[1].type).toBe('standard');
  });

  it('supprime les ouvertures orphelines et borne leur position', () => {
    const p = normalizeProject({
      walls: [wall('w1'), wall('w2', 0, 0, 0, 0)],
      openings: [
        { id: 'o1', wallId: 'w1', type: 'window', offset: 10, width: 1.2, flipSide: true, flipDirection: 'oui', sashCount: 2 },
        { id: 'o2', wallId: 'absent', type: 'door', offset: 1, width: 0.9 },
        { id: 'o3', wallId: 'w2', type: 'door', offset: 1, width: 0.9 },
        { id: 'o4', wallId: 'w1', type: 'portail', offset: NaN, width: NaN },
        { id: 'o5', type: 'door' },
      ],
    });
    expect(p.openings.map(o => o.id)).toEqual(['o1', 'o4']);
    expect(p.openings[0]).toMatchObject({ offset: 4, width: 1.2, flipSide: true, flipDirection: false, sashCount: 2 });
    expect(p.openings[1]).toMatchObject({ type: 'door', offset: 2, width: 0.9 });
  });

  it('filtre les pièces de moins de 3 points et recalcule une surface manquante', () => {
    const square = [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 3 }, { x: 0, y: 3 }];
    const p = normalizeProject({
      rooms: [
        { id: 'r1', name: 'Salon', polygon: square, areaM2: 6 },
        { id: 'r2', name: 'Ligne', polygon: [{ x: 0, y: 0 }, { x: 1, y: 1 }] },
        { id: 'r3', name: 'Points NaN', polygon: [{ x: 0, y: 0 }, { x: NaN, y: 1 }, { x: 1, y: 1 }] },
        { id: 'r4', polygon: square, areaM2: 'n/a' },
      ],
    });
    expect(p.rooms.map(r => r.id)).toEqual(['r1', 'r4']);
    expect(p.rooms[1].areaM2).toBe(6);
    expect(p.rooms[1].name).toBe('Pièce');
  });

  it('filtre les entités sans entityId ou sans position valide et valide les actions', () => {
    const p = normalizeProject({
      schema_version: 2,
      bindings: [
        { id: 'b1', entityId: 'light.salon', position: { x: 1, y: 2 }, tapAction: 'explode', holdAction: 'more-info', customName: '' },
        { id: 'b2', position: { x: 1, y: 2 } },
        { id: 'b3', entityId: '', position: { x: 1, y: 2 } },
        { id: 'b4', entityId: 'pas-un-id', position: { x: 1, y: 2 } },
        { id: 'b5', entityId: 'switch.prise', position: { x: Infinity, y: 2 } },
        { id: 'b6', entityId: 'switch.prise' },
      ],
    });
    expect(p.bindings).toHaveLength(1);
    expect(p.bindings[0].tapAction).toBeUndefined();
    expect(p.bindings[0].holdAction).toBe('more-info');
    expect(p.bindings[0].customName).toBeUndefined();
  });

  it('n’accepte qu’un chemin de navigation interne et abandonne « navigate » sans chemin', () => {
    const bind = (id: string, extra: Record<string, unknown>) => ({ id, entityId: 'light.a', position: { x: 0, y: 0 }, ...extra });
    const p = normalizeProject({
      schema_version: 2,
      bindings: [
        bind('ok', { tapAction: 'navigate', navigationPath: '/lovelace/salon' }),
        bind('ancre', { holdAction: 'navigate', navigationPath: '#popup-salon' }),
        bind('externe', { tapAction: 'navigate', navigationPath: 'https://evil.example' }),
        bind('proto', { tapAction: 'navigate', navigationPath: '//evil.example/x' }),
        bind('js', { tapAction: 'navigate', navigationPath: 'javascript:alert(1)' }),
        bind('sans', { tapAction: 'navigate', holdAction: 'navigate' }),
        bind('autre', { tapAction: 'none', navigationPath: '/a b' }),
      ],
    });
    const byId = Object.fromEntries(p.bindings.map(b => [b.id, b]));
    expect(byId.ok).toMatchObject({ tapAction: 'navigate', navigationPath: '/lovelace/salon' });
    expect(byId.ancre).toMatchObject({ holdAction: 'navigate', navigationPath: '#popup-salon' });
    for (const id of ['externe', 'proto', 'js', 'sans']) {
      expect(byId[id].tapAction).toBeUndefined();
      expect(byId[id].navigationPath).toBeUndefined();
    }
    expect(byId.sans.holdAction).toBeUndefined();
    expect(byId.autre).toMatchObject({ tapAction: 'none' });
    expect(byId.autre.navigationPath).toBeUndefined();
  });

  it('n’accepte que des couleurs et icônes inoffensives (valeurs insérées dans des attributs SVG)', () => {
    const square = [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 3 }];
    const p = normalizeProject({
      rooms: [
        { id: 'ok', polygon: square, color: 'rgba(56, 189, 248, 0.18)', icon: '🛋️' },
        { id: 'hex', polygon: square, color: '#1e293b', icon: 'mdi:sofa' },
        { id: 'quote', polygon: square, color: 'red" onload="alert(1)', icon: 'x'.repeat(65) },
        { id: 'url', polygon: square, color: 'url(https://evil.example/t.png)' },
        { id: 'semi', polygon: square, color: 'red; background: blue' },
      ],
      furniture: [{ id: 'f', type: 'sofa', position: { x: 0, y: 0 }, color: '"><script>', icon: '🛋️' }],
      bindings: [
        { id: 'b1', entityId: 'light.a', position: { x: 0, y: 0 }, mdiIcon: 'mdi:lightbulb' },
        { id: 'b2', entityId: 'light.b', position: { x: 0, y: 0 }, mdiIcon: 'mdi:"><svg onload=alert(1)>' },
      ],
    });
    const rooms = Object.fromEntries(p.rooms.map(r => [r.id, r]));
    expect(rooms.ok).toMatchObject({ color: 'rgba(56, 189, 248, 0.18)', icon: '🛋️' });
    expect(rooms.hex).toMatchObject({ color: '#1e293b', icon: 'mdi:sofa' });
    expect(rooms.quote.color).toBeUndefined();
    expect(rooms.quote.icon).toBeUndefined();
    expect(rooms.url.color).toBeUndefined();
    expect(rooms.semi.color).toBeUndefined();
    expect(p.furniture?.[0].color).toBeUndefined();
    expect(p.furniture?.[0].icon).toBe('🛋️');
    expect(p.bindings[0].mdiIcon).toBe('mdi:lightbulb');
    expect(p.bindings[1].mdiIcon).toBeUndefined();
  });

  it('borne nom et catégorie aux limites du backend (200 / 64 caractères)', () => {
    const p = normalizeProject({ name: 'n'.repeat(500), category: 'c'.repeat(100) });
    expect(p.name).toHaveLength(200);
    expect(p.category).toHaveLength(64);
    expect(createEmptyProject({ name: 'x'.repeat(300) }).name).toHaveLength(200);
  });

  it('accepte les identifiants numériques des très anciens projets', () => {
    const p = normalizeProject({
      walls: [{ ...wall('ignored'), id: 1712345678 }],
      openings: [{ id: 42, wallId: 1712345678, type: 'door', offset: 1, width: 0.9 }],
    });
    expect(p.walls[0].id).toBe('1712345678');
    expect(p.openings).toHaveLength(1);
    expect(p.openings[0]).toMatchObject({ id: '42', wallId: '1712345678' });
  });

  it('fond : refuse une URL externe que le backend effacerait', () => {
    expect(normalizeProject({ background: { imageUrl: 'https://example.com/a plan.png' } }).background).toBeUndefined();
    expect(normalizeProject({ background: { imageUrl: 'https://example.com/' + 'a'.repeat(3000) } }).background).toBeUndefined();
    expect(normalizeProject({ background: { imageUrl: 'blob:https://ha.local/1234' } }).background).toBeUndefined();
    expect(normalizeProject({ background: { imageUrl: '/local/plan.png' } }).background?.imageUrl).toBe('/local/plan.png');
  });

  it('normalise la rotation du mobilier dans [0, 360)', () => {
    const item = (id: string, rotation: unknown) => ({
      id, type: 'sofa', name: 'Canapé', category: 'seating', position: { x: 1, y: 1 }, width: 2, length: 0.9, rotation,
    });
    const p = normalizeProject({
      furniture: [item('a', -90), item('b', 450), item('c', 360), item('d', NaN), item('e', 12.5), { id: 'f', position: { x: 0, y: 0 } }],
    });
    expect(p.furniture?.map(f => f.rotation)).toEqual([270, 90, 0, 0, 12.5]);
    expect(Object.is(p.furniture?.[2].rotation, -0)).toBe(false);
  });

  it('complète un meuble incomplet sans le perdre', () => {
    const p = normalizeProject({ furniture: [{ id: 'f1', type: 'inconnu', position: { x: 0, y: 0 }, width: -1, category: 'zzz' }] });
    expect(p.furniture?.[0]).toMatchObject({ type: 'inconnu', name: 'inconnu', category: 'other', width: 1, length: 1, rotation: 0 });
  });

  it('remplace un ancien nom par défaut du modèle par son nom actuel, garde un nom choisi (F172)', () => {
    const chair = (id: string, name: unknown) => ({ id, type: 'chair_starck', name, position: { x: 0, y: 0 } });
    const p = normalizeProject({
      furniture: [
        chair('a', 'Chaise Starck (Ghost)'),
        chair('b', 'Ma chaise'),
        chair('c', ''),
        chair('d', undefined),
        { id: 'e', type: 'inconnu', name: 'Chaise Starck (Ghost)', position: { x: 0, y: 0 } },
      ],
    });
    expect(p.furniture?.map(f => f.name)).toEqual([
      'Chaise médaillon transparente', 'Ma chaise', 'Chaise médaillon transparente', 'Chaise médaillon transparente',
      'Chaise Starck (Ghost)',
    ]);
    expect(normalizeProject(p).furniture).toEqual(p.furniture);
  });

  it('régénère les identifiants manquants ou dupliqués', () => {
    const p = normalizeProject({ walls: [wall('w'), wall('w', 0, 1, 4, 1), { ...wall(''), id: undefined }] });
    const ids = p.walls.map(w => w.id);
    expect(ids[0]).toBe('w');
    expect(new Set(ids).size).toBe(3);
    expect(ids[2]).toMatch(/^wall_[a-z0-9]{10}$/);
  });

  it('fond : conserve assetId/imageUrl/mimeType et rejette les références dangereuses', () => {
    const p = normalizeProject({
      id: 'rdc',
      background: { imageUrl: '', assetId: 'rdc-9f8e7d6c5b4a.webp', mimeType: 'image/webp', opacity: 0.3, scale: 2, widthPx: 1200, heightPx: 800 },
    });
    expect(p.background).toMatchObject({ imageUrl: '', assetId: 'rdc-9f8e7d6c5b4a.webp', mimeType: 'image/webp', opacity: 0.3, scale: 2, widthPx: 1200, heightPx: 800 });
    expect(normalizeProject({ background: { imageUrl: 'data:image/png;base64,AAAA' } }).background?.imageUrl).toBe('data:image/png;base64,AAAA');
    expect(normalizeProject({ background: { imageUrl: 'javascript:alert(1)' } }).background).toBeUndefined();
    expect(normalizeProject({ background: { imageUrl: '', assetId: '../../secret.webp' } }).background).toBeUndefined();
    expect(normalizeProject({ background: 'plan.png' }).background).toBeUndefined();
  });

  it('conserve revision si entier >= 0', () => {
    expect(normalizeProject({ revision: 7 }).revision).toBe(7);
    expect(normalizeProject({ revision: 0 }).revision).toBe(0);
    expect(normalizeProject({ revision: -1 }).revision).toBeUndefined();
    expect(normalizeProject({ revision: 1.5 }).revision).toBeUndefined();
    expect(normalizeProject({ revision: '3' }).revision).toBeUndefined();
  });

  it('conserve préférences d’affichage, cadre d’export et publication', () => {
    const p = normalizeProject({
      showDimensions: false, showThermalHeatmap: true, showGhostLevel: 'oui', ghostLevelId: 'sous-sol',
      northAngle: 450, showCompass: false,
      exportFrame: { minX: -1, minY: 0, maxX: 10, maxY: 8 },
      publish,
    });
    expect(p.showDimensions).toBe(false);
    expect(p.showThermalHeatmap).toBe(true);
    expect(p.showGhostLevel).toBeUndefined();
    expect(p.ghostLevelId).toBe('sous-sol');
    expect(p.northAngle).toBe(90);
    expect(p.showCompass).toBe(false);
    expect(p.exportFrame).toEqual({ minX: -1, minY: 0, maxX: 10, maxY: 8 });
    expect(p.publish).toEqual(publish);
    expect(normalizeProject({ exportFrame: { minX: 5, minY: 0, maxX: 1, maxY: 8 } }).exportFrame).toBeUndefined();
    expect(normalizeProject({ northAngle: -90 }).northAngle).toBe(270);
    expect(normalizeProject({ northAngle: NaN }).northAngle).toBeUndefined();
    expect(normalizeProject({ showCompass: 'oui' }).showCompass).toBeUndefined();
  });

  it('ignore les clés inconnues', () => {
    const p = normalizeProject({ id: 'p', _runtime: 1, foo: 'bar' }) as unknown as Record<string, unknown>;
    expect(p._runtime).toBeUndefined();
    expect(p.foo).toBeUndefined();
  });

  it('est idempotente', () => {
    const once = normalizeProject({ id: 'rdc', walls: [wall('w1')], openings: [{ id: 'o', wallId: 'w1', type: 'door', offset: 1, width: 0.9 }] });
    expect(normalizeProject(once)).toEqual(once);
  });
});

describe('normalizePublishInfo', () => {
  it('rejette une forme invalide ou une URL absolue', () => {
    expect(normalizePublishInfo(publish)).toEqual(publish);
    expect(normalizePublishInfo({ ...publish, url: 'https://evil.example/x.svg' })).toBeUndefined();
    expect(normalizePublishInfo({ ...publish, url: '//evil.example/x.svg' })).toBeUndefined();
    expect(normalizePublishInfo({ ...publish, hash: 1 })).toBeUndefined();
    expect(normalizePublishInfo({ ...publish, legacy_path: '/local/plan_rdc.svg' })?.legacy_path).toBe('/local/plan_rdc.svg');
    expect(normalizePublishInfo({ ...publish, legacy_path: 'javascript:x' })?.legacy_path).toBeUndefined();
  });
});

describe('stripServerFields / estimateJsonBytes / cloneProject', () => {
  it('retire publish et les clés runtime sans modifier l’original', () => {
    const p = { ...createEmptyProject(), publish, _dirty: true, revision: 3 } as HomeArchitectProject;
    const stripped = stripServerFields(p) as unknown as Record<string, unknown>;
    expect(stripped.publish).toBeUndefined();
    expect(stripped._dirty).toBeUndefined();
    expect(stripped.revision).toBe(3);
    expect(stripped.walls).toBe(p.walls);
    expect(p.publish).toEqual(publish);
  });

  it('mesure la taille JSON en octets UTF-8', () => {
    expect(estimateJsonBytes('é')).toBe(4);
    expect(estimateJsonBytes({ a: 1 })).toBe(7);
    expect(estimateJsonBytes(undefined)).toBe(0);
  });

  it('copie profonde', () => {
    const p = normalizeProject({ walls: [wall('w1')] });
    const c = cloneProject(p);
    expect(c).toEqual(p);
    c.walls[0].start.x = 99;
    expect(p.walls[0].start.x).toBe(0);
  });

  it('copie profonde sans structuredClone', () => {
    vi.stubGlobal('structuredClone', undefined);
    const p = normalizeProject({ walls: [wall('w1')] });
    const c = cloneProject(p);
    expect(c).toEqual(p);
    expect(c.walls).not.toBe(p.walls);
  });
});

describe('actions au tap', () => {
  it('entityDomain', () => {
    expect(entityDomain('light.salon')).toBe('light');
    expect(entityDomain('invalide')).toBe('');
    expect(entityDomain('.x')).toBe('');
  });

  it.each([
    ['light.salon', 'toggle'],
    ['switch.prise', 'toggle'],
    ['fan.plafond', 'toggle'],
    ['input_boolean.mode_nuit', 'toggle'],
    ['automation.reveil', 'toggle'],
    ['scene.soiree', 'toggle'],
    ['script.depart', 'toggle'],
    ['button.redemarrer', 'toggle'],
    ['input_button.sonnette', 'toggle'],
    ['cover.porte_garage', 'more-info'],
    ['cover.portail', 'more-info'],
    ['lock.entree', 'more-info'],
    ['alarm_control_panel.maison', 'more-info'],
    ['valve.arrosage', 'more-info'],
    ['climate.salon', 'more-info'],
    ['media_player.tv', 'more-info'],
    ['camera.jardin', 'more-info'],
    ['sensor.temperature', 'more-info'],
    ['binary_sensor.porte', 'more-info'],
    ['siren.alarme', 'more-info'],
    ['domaine_inconnu.x', 'more-info'],
    ['', 'more-info'],
  ])('defaultTapAction(%s) = %s', (entityId, expected) => {
    expect(defaultTapAction(entityId)).toBe(expected);
  });

  it.each([
    ['light.salon', 'light', 'toggle'],
    ['switch.prise', 'switch', 'toggle'],
    ['cover.volet', 'cover', 'toggle'],
    ['scene.soiree', 'scene', 'turn_on'],
    ['script.depart', 'script', 'turn_on'],
    ['button.redemarrer', 'button', 'press'],
    ['input_button.sonnette', 'input_button', 'press'],
    ['group.lumieres', 'homeassistant', 'toggle'],
  ])('serviceForTap(%s) = %s.%s', (entityId, domain, service) => {
    expect(serviceForTap(entityId)).toEqual({ domain, service });
  });

  it.each(['lock.entree', 'alarm_control_panel.maison', 'sensor.temperature', 'camera.jardin', 'invalide', ''])(
    'serviceForTap(%s) = null (non actionnable)',
    entityId => {
      expect(serviceForTap(entityId)).toBeNull();
    }
  );

  it('toute entité actionnée par défaut a un service', () => {
    for (const id of ['light.a', 'switch.a', 'fan.a', 'input_boolean.a', 'automation.a', 'scene.a', 'script.a', 'button.a', 'input_button.a']) {
      expect(defaultTapAction(id)).toBe('toggle');
      expect(serviceForTap(id)).not.toBeNull();
    }
  });

  it('renvoie une copie (la table interne n’est pas modifiable)', () => {
    const s = serviceForTap('light.a');
    if (s) s.service = 'turn_off';
    expect(serviceForTap('light.a')?.service).toBe('toggle');
  });
});

describe('noms des entités', () => {
  const states = {
    'light.lampe_1': { attributes: { friendly_name: 'Lampe salon' } },
    'light.lampe_2': { attributes: { friendly_name: 'Lampe 2' } },
  };

  it('bindingDisplayName : nom saisi, sinon friendly_name, sinon entity_id', () => {
    expect(bindingDisplayName({ entityId: 'light.lampe_1', customName: 'Ma lampe' }, states)).toBe('Ma lampe');
    expect(bindingDisplayName({ entityId: 'light.lampe_1' }, states)).toBe('Lampe salon');
    expect(bindingDisplayName({ entityId: 'light.lampe_1', customName: '  ' }, states)).toBe('Lampe salon');
    expect(bindingDisplayName({ entityId: 'light.absente' }, states)).toBe('light.absente');
    expect(bindingDisplayName({ entityId: 'light.lampe_1' })).toBe('light.lampe_1');
  });

  it('clearRedundantCustomNames efface les copies du friendly_name seulement', () => {
    const p = normalizeProject({
      bindings: [
        { id: 'a', entityId: 'light.lampe_2', position: { x: 0, y: 0 }, customName: 'Lampe 2' },
        { id: 'b', entityId: 'light.lampe_1', position: { x: 0, y: 0 }, customName: 'Lampe 1' },
      ],
    });
    const migrated = clearRedundantCustomNames(p, states);
    expect(migrated).not.toBe(p);
    expect(migrated.bindings[0].customName).toBeUndefined();
    expect('customName' in migrated.bindings[0]).toBe(false);
    expect(migrated.bindings[1].customName).toBe('Lampe 1');
    expect(p.bindings[0].customName).toBe('Lampe 2');
    expect(clearRedundantCustomNames(migrated, states)).toBe(migrated);
    expect(clearRedundantCustomNames(p, undefined)).toBe(p);
  });

  it('clearRedundantCustomNames efface aussi une copie de l’entity_id (entité sans friendly_name au dépôt)', () => {
    const p = normalizeProject({
      bindings: [{ id: 'a', entityId: 'switch.prise', position: { x: 0, y: 0 }, customName: 'switch.prise' }],
    });
    const withoutStates = clearRedundantCustomNames(p, undefined);
    expect(withoutStates.bindings[0].customName).toBeUndefined();
    expect(clearRedundantCustomNames(p, { 'switch.prise': { attributes: { friendly_name: 'Prise TV' } } }).bindings[0].customName).toBeUndefined();
    expect(bindingDisplayName(withoutStates.bindings[0], { 'switch.prise': { attributes: { friendly_name: 'Prise TV' } } })).toBe('Prise TV');
  });
});

describe('legacyCategory', () => {
  it('déduit la catégorie des seuls anciens ids de niveau', () => {
    expect(legacyCategory('rdc')).toBe('rdc');
    expect(legacyCategory('jardin')).toBe('jardin');
    expect(legacyCategory('plan_ab12cd34')).toBeUndefined();
    expect(legacyCategory('autre')).toBeUndefined();
    expect(legacyCategory(undefined)).toBeUndefined();
  });
});
