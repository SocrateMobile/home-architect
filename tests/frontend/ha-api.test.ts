/* eslint-disable @typescript-eslint/prefer-promise-reject-errors -- hass.callWS rejette avec un objet { code, message }, pas une Error : les simulations reproduisent ce contrat. */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ConflictError, HaApiError, PayloadTooLargeError, PermissionDeniedError,
  checkUpdates, deleteProject, fetchBackgroundObjectUrl, getProject, isAdmin, listProjects, publishSvg,
  readLegacyLocalProjects, releaseBackgroundObjectUrl, removeLegacyLocalProject, saveProject,
  subscribeProject, toHaApiError, unpublish, uploadBackground
} from '../../src/core/ha-api';
import { MAX_PROJECT_BYTES, MAX_PUBLISH_BYTES, createEmptyProject, normalizeProject } from '../../src/core/project-model';
import { MAX_UPLOAD_BYTES } from '../../src/core/image-utils';
import { HomeArchitectProject } from '../../src/core/types';

const publish = {
  url: '/api/home_architect/published/rdc-abcdefghijklmnopqrstuv.svg?v=1',
  path: '/api/home_architect/published/rdc-abcdefghijklmnopqrstuv.svg',
  hash: '1',
  published_at: '2026-10-01T10:00:00+00:00',
  include_background: false,
};

/** Rejet tel que produit par hass.callWS : l'objet `error` du message de résultat. */
const wsError = (code: string, message = code) => ({ code, message });

function mockHass(callWS: (msg: any) => unknown = () => Promise.resolve({})) {
  return { callWS: vi.fn(callWS), user: { is_admin: true } };
}

function project(overrides: Partial<HomeArchitectProject> = {}): HomeArchitectProject {
  return { ...createEmptyProject({ name: 'Maison', category: 'rdc' }), ...overrides };
}

describe('toHaApiError', () => {
  it('mappe conflict:<rev> vers ConflictError avec la révision serveur', () => {
    const err = toHaApiError(wsError('conflict', 'conflict:7'));
    expect(err).toBeInstanceOf(ConflictError);
    expect(err).toBeInstanceOf(HaApiError);
    expect(err).toBeInstanceOf(Error);
    expect(err.code).toBe('conflict');
    expect((err as ConflictError).serverRevision).toBe(7);
    expect((toHaApiError(wsError('conflict', 'conflict')) as ConflictError).serverRevision).toBeUndefined();
  });

  it('mappe unauthorized vers PermissionDeniedError', () => {
    const err = toHaApiError(wsError('unauthorized', 'Unauthorized'));
    expect(err).toBeInstanceOf(PermissionDeniedError);
    expect(err.code).toBe('unauthorized');
  });

  it('mappe payload_too_large avec le contexte de taille', () => {
    const err = toHaApiError(wsError('payload_too_large'), { bytes: 10, limit: 5 });
    expect(err).toBeInstanceOf(PayloadTooLargeError);
    expect((err as PayloadTooLargeError).bytes).toBe(10);
    expect((err as PayloadTooLargeError).limit).toBe(5);
  });

  it('lit la taille et la limite renvoyées par le serveur', () => {
    const err = toHaApiError(wsError('payload_too_large', 'payload_too_large:3000000:2097152'), { bytes: 10, limit: 5 });
    expect(err).toMatchObject({ code: 'payload_too_large', bytes: 3000000, limit: 2097152 });
  });

  it('conserve les autres codes et gère connexion perdue, Error et valeurs quelconques', () => {
    const generic = toHaApiError(wsError('invalid_project', 'Projet invalide'));
    expect(generic.constructor).toBe(HaApiError);
    expect(generic.code).toBe('invalid_project');
    expect(generic.message).toBe('Projet invalide');
    expect(toHaApiError({ type: 'result', success: false, error: { code: 3, message: 'Connection lost' } }).code).toBe('connection_lost');
    expect(toHaApiError(new TypeError('boom'))).toMatchObject({ code: 'unknown_error', message: 'boom' });
    expect(toHaApiError('texte').code).toBe('unknown_error');
    const existing = new HaApiError('x', 'y');
    expect(toHaApiError(existing)).toBe(existing);
  });
});

describe('isAdmin', () => {
  it('lit hass.user.is_admin', () => {
    expect(isAdmin({ user: { is_admin: true } })).toBe(true);
    expect(isAdmin({ user: { is_admin: false } })).toBe(false);
    expect(isAdmin({})).toBe(false);
    expect(isAdmin(undefined)).toBe(false);
  });
});

describe('listProjects', () => {
  it('normalise les résumés et écarte les entrées invalides', async () => {
    const hass = mockHass(() => Promise.resolve({
      projects: [
        { id: 'rdc', name: 'Maison', category: 'rdc', revision: 3, has_background: true, publish, counts: { walls: 4, rooms: 1, bindings: 2, furniture: 0 } },
        { id: 'plan_ab12cd34', revision: 'x', counts: null },
        { id: '../bad' },
        null,
      ],
    }));
    const list = await listProjects(hass);
    expect(hass.callWS).toHaveBeenCalledWith({ type: 'home_architect/list_projects' });
    expect(list).toHaveLength(2);
    expect(list[0]).toMatchObject({ id: 'rdc', name: 'Maison', revision: 3, has_background: true, publish, counts: { walls: 4, rooms: 1, bindings: 2, furniture: 0 } });
    expect(list[1]).toMatchObject({ id: 'plan_ab12cd34', name: 'plan_ab12cd34', revision: 0, has_background: false, publish: null, counts: { walls: 0, rooms: 0, bindings: 0, furniture: 0 } });
  });

  it('range un ancien projet de niveau sans catégorie dans son niveau (comme normalizeProject)', async () => {
    const hass = mockHass(() => Promise.resolve({
      projects: [
        { id: 'etage1', name: 'Étage', category: null, revision: 1 },
        { id: 'plan_ab12cd34', name: 'Garage', category: null, revision: 1 },
        { id: 'rdc', name: 'Garage historique', category: 'autre', revision: 2 },
      ],
    }));
    const list = await listProjects(hass);
    expect(list.map(s => s.category)).toEqual(['etage1', undefined, 'autre']);
  });

  it('se replie sur get_projects si le backend n’a pas encore redémarré', async () => {
    const hass = mockHass(msg => msg.type === 'home_architect/list_projects'
      ? Promise.reject(wsError('unknown_command', 'Unknown command.'))
      : Promise.resolve({ projects: [{ id: 'rdc', name: 'Maison', walls: [{ id: 'w', start: { x: 0, y: 0 }, end: { x: 1, y: 0 } }] }] }));
    const list = await listProjects(hass);
    expect(list).toHaveLength(1);
    expect(list[0]).toMatchObject({ id: 'rdc', category: 'rdc', counts: { walls: 1 } });
  });

  it('propage les autres erreurs typées', async () => {
    const hass = mockHass(() => Promise.reject(wsError('not_ready', 'Storage not ready')));
    await expect(listProjects(hass)).rejects.toMatchObject({ code: 'not_ready' });
  });

  it('refuse sans connexion', async () => {
    await expect(listProjects({})).rejects.toMatchObject({ code: 'not_connected' });
  });
});

describe('getProject', () => {
  it('renvoie un projet normalisé', async () => {
    const hass = mockHass(() => Promise.resolve({ project: { id: 'rdc', name: 'Maison', revision: 4, publish } }));
    const p = await getProject(hass, 'rdc');
    expect(hass.callWS).toHaveBeenCalledWith({ type: 'home_architect/get_project', project_id: 'rdc' });
    expect(p).toMatchObject({ id: 'rdc', category: 'rdc', revision: 4, walls: [], furniture: [], publish });
  });

  it('renvoie null si le projet n’existe pas', async () => {
    const hass = mockHass(() => Promise.reject(wsError('not_found', 'Project not found')));
    expect(await getProject(hass, 'rdc')).toBeNull();
  });

  it('propage les autres erreurs et refuse un id invalide sans appel', async () => {
    await expect(getProject(mockHass(() => Promise.reject(wsError('unauthorized'))), 'rdc')).rejects.toBeInstanceOf(PermissionDeniedError);
    const hass = mockHass();
    await expect(getProject(hass, '../x')).rejects.toMatchObject({ code: 'invalid_project_id' });
    expect(hass.callWS).not.toHaveBeenCalled();
  });
});

describe('saveProject', () => {
  it('retire les champs serveur et transmet révision attendue et forçage', async () => {
    const hass = mockHass(() => Promise.resolve({ success: true, id: 'rdc', revision: 5, updated_at: '2026-10-05T10:00:00+00:00' }));
    const p = { ...project({ id: 'rdc', revision: 4, publish }), _dirty: true } as HomeArchitectProject;
    const res = await saveProject(hass, p, { expectedRevision: 4, force: true });
    expect(res).toEqual({ id: 'rdc', revision: 5, updated_at: '2026-10-05T10:00:00+00:00' });
    const msg = hass.callWS.mock.calls[0][0];
    expect(msg.type).toBe('home_architect/save_project');
    expect(msg.expected_revision).toBe(4);
    expect(msg.force).toBe(true);
    expect(msg.project.publish).toBeUndefined();
    expect(msg.project._dirty).toBeUndefined();
    expect(msg.project.id).toBe('rdc');
    expect(p.publish).toEqual(publish);
  });

  it('remonte l’asset de fond retenu par le serveur', async () => {
    const hass = mockHass(() => Promise.resolve({ success: true, id: 'rdc', revision: 2, updated_at: 'now', asset_id: 'rdc-9f8e7d6c5b4a.png' }));
    expect(await saveProject(hass, project({ id: 'rdc' }), { expectedRevision: 1 })).toEqual({ id: 'rdc', revision: 2, updated_at: 'now', assetId: 'rdc-9f8e7d6c5b4a.png' });
    const none = mockHass(() => Promise.resolve({ success: true, id: 'rdc', revision: 2, updated_at: 'now', asset_id: null }));
    expect(await saveProject(none, project({ id: 'rdc' }), { expectedRevision: 1 })).not.toHaveProperty('assetId');
  });

  it('n’envoie ni expected_revision ni force par défaut', async () => {
    const hass = mockHass(() => Promise.resolve({ success: true, id: 'x', revision: 1, updated_at: 'now' }));
    await saveProject(hass, project());
    const msg = hass.callWS.mock.calls[0][0];
    expect('expected_revision' in msg).toBe(false);
    expect('force' in msg).toBe(false);
  });

  it('mappe le conflit serveur', async () => {
    const hass = mockHass(() => Promise.reject(wsError('conflict', 'conflict:9')));
    const err = await saveProject(hass, project(), { expectedRevision: 8 }).catch(e => e);
    expect(err).toBeInstanceOf(ConflictError);
    expect(err.serverRevision).toBe(9);
  });

  it('mappe le refus de droits et le refus de taille du serveur', async () => {
    await expect(saveProject(mockHass(() => Promise.reject(wsError('unauthorized'))), project())).rejects.toBeInstanceOf(PermissionDeniedError);
    const err = await saveProject(mockHass(() => Promise.reject(wsError('payload_too_large'))), project()).catch(e => e);
    expect(err).toBeInstanceOf(PayloadTooLargeError);
    expect(err.limit).toBe(MAX_PROJECT_BYTES);
    expect(err.bytes).toBeGreaterThan(0);
  });

  it('refuse avant l’envoi un projet de plus de 2 Mio', async () => {
    const hass = mockHass();
    const rooms = Array.from({ length: 30000 }, (_, i) => ({
      id: `room_${i}`, name: `Pièce numéro ${i}`, areaM2: 1,
      polygon: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }],
    }));
    const err = await saveProject(hass, project({ rooms })).catch(e => e);
    expect(err).toBeInstanceOf(PayloadTooLargeError);
    expect(err.bytes).toBeGreaterThan(MAX_PROJECT_BYTES);
    expect(err.limit).toBe(MAX_PROJECT_BYTES);
    expect(hass.callWS).not.toHaveBeenCalled();
  });

  it('refuse une data-URL de fond de plus de 256 Kio (à téléverser d’abord)', async () => {
    const hass = mockHass();
    const imageUrl = 'data:image/png;base64,' + 'A'.repeat(300 * 1024);
    const background = { imageUrl, opacity: 0.4, visible: true, offset: { x: 0, y: 0 }, scale: 1, rotation: 0 };
    const err = await saveProject(hass, project({ background })).catch(e => e);
    expect(err).toBeInstanceOf(PayloadTooLargeError);
    expect(err.limit).toBe(256 * 1024);
    expect(hass.callWS).not.toHaveBeenCalled();
  });

  it('accepte une petite data-URL et une référence d’asset', async () => {
    const hass = mockHass(() => Promise.resolve({ success: true, id: 'x', revision: 1, updated_at: 'now' }));
    const small = { imageUrl: 'data:image/png;base64,AAAA', opacity: 0.4, visible: true, offset: { x: 0, y: 0 }, scale: 1, rotation: 0 };
    await saveProject(hass, project({ background: small }));
    await saveProject(hass, project({ background: { ...small, imageUrl: '', assetId: 'plan_ab12cd34-9f8e7d6c5b4a.webp' } }));
    expect(hass.callWS).toHaveBeenCalledTimes(2);
  });

  it('refuse un id invalide', async () => {
    const hass = mockHass();
    await expect(saveProject(hass, project({ id: 'a b' }))).rejects.toMatchObject({ code: 'invalid_project_id' });
    expect(hass.callWS).not.toHaveBeenCalled();
  });
});

describe('deleteProject / unpublish', () => {
  it('envoie la commande et tolère un projet déjà supprimé', async () => {
    const hass = mockHass(() => Promise.resolve({ success: true, removed_files: [] }));
    await deleteProject(hass, 'rdc');
    expect(hass.callWS).toHaveBeenCalledWith({ type: 'home_architect/delete_project', project_id: 'rdc' });
    await expect(deleteProject(mockHass(() => Promise.reject(wsError('not_found'))), 'rdc')).resolves.toBeUndefined();
    await expect(deleteProject(mockHass(() => Promise.reject(wsError('unauthorized'))), 'rdc')).rejects.toBeInstanceOf(PermissionDeniedError);
  });

  it('unpublish', async () => {
    const hass = mockHass(() => Promise.resolve({ success: true }));
    await unpublish(hass, 'rdc');
    expect(hass.callWS).toHaveBeenCalledWith({ type: 'home_architect/unpublish', project_id: 'rdc' });
  });
});

describe('publishSvg', () => {
  it('envoie le SVG et valide la réponse', async () => {
    const hass = mockHass(() => Promise.resolve(publish));
    const info = await publishSvg(hass, 'rdc', '<svg/>', { includeBackground: true });
    expect(info).toEqual(publish);
    expect(hass.callWS).toHaveBeenCalledWith({
      type: 'home_architect/publish_svg', project_id: 'rdc', svg_content: '<svg/>', include_background: true,
    });
  });

  it('refuse avant l’envoi un SVG trop lourd', async () => {
    const hass = mockHass();
    const err = await publishSvg(hass, 'rdc', 'x'.repeat(MAX_PUBLISH_BYTES + 1), { includeBackground: false }).catch(e => e);
    expect(err).toBeInstanceOf(PayloadTooLargeError);
    expect(err.limit).toBe(MAX_PUBLISH_BYTES);
    expect(hass.callWS).not.toHaveBeenCalled();
  });

  it('rejette une réponse inattendue ou une erreur d’assainissement', async () => {
    await expect(publishSvg(mockHass(() => Promise.resolve({ url: 'https://evil' })), 'rdc', '<svg/>', { includeBackground: false }))
      .rejects.toMatchObject({ code: 'invalid_response' });
    await expect(publishSvg(mockHass(() => Promise.reject(wsError('invalid_svg', 'Invalid SVG'))), 'rdc', '<svg/>', { includeBackground: false }))
      .rejects.toMatchObject({ code: 'invalid_svg' });
  });
});

describe('checkUpdates', () => {
  it('normalise la réponse et n’accepte que des URL http(s)', async () => {
    const hass = mockHass(() => Promise.resolve({
      installed_version: '1.1.0', latest_version: '1.2.0', update_available: true, skipped_version: null,
      release_url: 'javascript:alert(1)', release_notes: 'Notes', update_entity_id: 'update.home_architect',
    }));
    const status = await checkUpdates(hass, { force: true });
    expect(hass.callWS).toHaveBeenCalledWith({ type: 'home_architect/check_updates', force: true });
    expect(status).toEqual({
      installed_version: '1.1.0', latest_version: '1.2.0', update_available: true, skipped_version: null,
      release_url: null, release_notes: 'Notes', update_entity_id: 'update.home_architect',
    });
    const ok = await checkUpdates(mockHass(() => Promise.resolve({ release_url: 'https://github.com/x/releases/tag/v1.2.0' })));
    expect(ok.release_url).toBe('https://github.com/x/releases/tag/v1.2.0');
    expect(ok.update_available).toBe(false);
    expect(ok.latest_version).toBeNull();
  });
});

describe('subscribeProject', () => {
  it('s’abonne, filtre les événements et se désabonne une seule fois sans lever', async () => {
    let handler: ((msg: unknown) => void) | undefined;
    const unsub = vi.fn(() => Promise.reject(new Error('connexion fermée')));
    const connection = {
      subscribeMessage: vi.fn((cb: (msg: unknown) => void) => {
        handler = cb;
        return Promise.resolve(unsub);
      }),
    };
    const cb = vi.fn();
    const stop = await subscribeProject({ connection }, 'rdc', cb);
    expect(connection.subscribeMessage).toHaveBeenCalledWith(expect.any(Function), { type: 'home_architect/subscribe_project', project_id: 'rdc' });
    handler?.({ project_id: 'rdc', revision: 6 });
    handler?.({ project_id: 'etage1', revision: 2 });
    handler?.({ project_id: 'rdc', revision: 7, deleted: true });
    handler?.('bruit');
    expect(cb.mock.calls).toEqual([[{ project_id: 'rdc', revision: 6 }], [{ project_id: 'rdc', revision: 7, deleted: true }]]);
    stop();
    stop();
    expect(unsub).toHaveBeenCalledTimes(1);
  });

  it('mappe un échec d’abonnement', async () => {
    const connection = { subscribeMessage: vi.fn(() => Promise.reject(wsError('unauthorized'))) };
    await expect(subscribeProject({ connection }, 'rdc', () => undefined)).rejects.toBeInstanceOf(PermissionDeniedError);
    await expect(subscribeProject({}, 'rdc', () => undefined)).rejects.toMatchObject({ code: 'not_connected' });
  });
});

describe('uploadBackground', () => {
  const response = (status: number, body: unknown) => ({
    ok: status >= 200 && status < 300, status, json: () => Promise.resolve(body), blob: () => Promise.resolve(new Blob(['x'])),
  });

  it('téléverse le blob brut avec son type et renvoie la référence d’asset', async () => {
    const fetchWithAuth = vi.fn(() => Promise.resolve(response(200, { asset_id: 'rdc-9f8e7d6c5b4a.webp', mime_type: 'image/webp', size: 3 })));
    const blob = new Blob(['abc'], { type: 'image/webp' });
    const res = await uploadBackground({ fetchWithAuth }, 'rdc', blob);
    expect(res).toEqual({ assetId: 'rdc-9f8e7d6c5b4a.webp', mimeType: 'image/webp', size: 3 });
    expect(fetchWithAuth).toHaveBeenCalledWith('/api/home_architect/background/rdc', {
      method: 'POST', body: blob, headers: { 'Content-Type': 'image/webp' },
    });
  });

  it('mappe les statuts HTTP et refuse un fichier trop lourd avant l’envoi', async () => {
    const blob = new Blob(['abc'], { type: 'image/png' });
    await expect(uploadBackground({ fetchWithAuth: () => Promise.resolve(response(403, null)) }, 'rdc', blob)).rejects.toBeInstanceOf(PermissionDeniedError);
    const tooLarge = await uploadBackground({ fetchWithAuth: () => Promise.resolve(response(413, null)) }, 'rdc', blob).catch(e => e);
    expect(tooLarge).toBeInstanceOf(PayloadTooLargeError);
    expect(tooLarge.limit).toBe(MAX_UPLOAD_BYTES);
    await expect(uploadBackground({ fetchWithAuth: () => Promise.resolve(response(200, { asset_id: '../x' })) }, 'rdc', blob))
      .rejects.toMatchObject({ code: 'invalid_response' });
    await expect(uploadBackground({ fetchWithAuth: () => Promise.reject(new TypeError('Failed to fetch')) }, 'rdc', blob))
      .rejects.toMatchObject({ code: 'network_error' });
    const fetchWithAuth = vi.fn();
    const big = { size: MAX_UPLOAD_BYTES + 1, type: 'image/png' } as Blob;
    await expect(uploadBackground({ fetchWithAuth }, 'rdc', big)).rejects.toBeInstanceOf(PayloadTooLargeError);
    expect(fetchWithAuth).not.toHaveBeenCalled();
  });
});

describe('fetchBackgroundObjectUrl / releaseBackgroundObjectUrl', () => {
  let created = 0;
  beforeEach(() => {
    created = 0;
    vi.spyOn(URL, 'createObjectURL').mockImplementation(() => `blob:test/${++created}`);
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
  });

  it('met en cache par assetId et révoque au dernier release', async () => {
    const fetchWithAuth = vi.fn(() => Promise.resolve({ ok: true, status: 200, blob: () => Promise.resolve(new Blob(['x'])) }));
    const hass = { fetchWithAuth };
    const a = await fetchBackgroundObjectUrl(hass, 'rdc', 'rdc-111111111111.webp');
    const b = await fetchBackgroundObjectUrl(hass, 'rdc', 'rdc-111111111111.webp');
    expect(a).toBe(b);
    expect(fetchWithAuth).toHaveBeenCalledTimes(1);
    expect(fetchWithAuth).toHaveBeenCalledWith('/api/home_architect/background/rdc/rdc-111111111111.webp', undefined);
    releaseBackgroundObjectUrl('rdc-111111111111.webp');
    await Promise.resolve();
    expect(URL.revokeObjectURL).not.toHaveBeenCalled();
    releaseBackgroundObjectUrl('rdc-111111111111.webp');
    await new Promise(r => setTimeout(r, 0));
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(a);
    releaseBackgroundObjectUrl('rdc-111111111111.webp');
    expect(URL.revokeObjectURL).toHaveBeenCalledTimes(1);
    const c = await fetchBackgroundObjectUrl(hass, 'rdc', 'rdc-111111111111.webp');
    expect(c).not.toBe(a);
    releaseBackgroundObjectUrl('rdc-111111111111.webp');
  });

  it('n’empoisonne pas le cache après un échec', async () => {
    let fail = true;
    const hass = {
      fetchWithAuth: vi.fn(() => Promise.resolve(fail
        ? { ok: false, status: 404 }
        : { ok: true, status: 200, blob: () => Promise.resolve(new Blob(['x'])) })),
    };
    await expect(fetchBackgroundObjectUrl(hass, 'rdc', 'rdc-222222222222.png')).rejects.toMatchObject({ code: 'not_found' });
    fail = false;
    await expect(fetchBackgroundObjectUrl(hass, 'rdc', 'rdc-222222222222.png')).resolves.toMatch(/^blob:/);
    releaseBackgroundObjectUrl('rdc-222222222222.png');
  });

  it('demande l’asset sous l’URL de son projet propriétaire (copie « Enregistrer sous » non sauvegardée)', async () => {
    const fetchWithAuth = vi.fn(() => Promise.resolve({ ok: true, status: 200, blob: () => Promise.resolve(new Blob(['x'])) }));
    await fetchBackgroundObjectUrl({ fetchWithAuth }, 'plan_newcopy1', 'my-level_2-9f8e7d6c5b4a.png');
    expect(fetchWithAuth).toHaveBeenCalledWith('/api/home_architect/background/my-level_2/my-level_2-9f8e7d6c5b4a.png', undefined);
    releaseBackgroundObjectUrl('my-level_2-9f8e7d6c5b4a.png');
  });

  it('refuse un assetId invalide sans requête', async () => {
    const hass = { fetchWithAuth: vi.fn() };
    await expect(fetchBackgroundObjectUrl(hass, 'rdc', '../../etc/passwd')).rejects.toMatchObject({ code: 'invalid_asset_id' });
    expect(hass.fetchWithAuth).not.toHaveBeenCalled();
  });
});

describe('anciennes copies localStorage', () => {
  afterEach(() => localStorage.clear());

  it('lit et normalise les projets, ignore la position de barre d’outils et le JSON corrompu', () => {
    localStorage.setItem('home_architect_rdc', JSON.stringify({ id: 'rdc', name: 'Maison', walls: [], bindings: [{ entityId: 'light.a', position: { x: 0, y: 0 }, tapAction: 'toggle' }] }));
    localStorage.setItem('home_architect_etage1', JSON.stringify({ name: 'Étage', walls: [] }));
    localStorage.setItem('home_architect_toolbar_pos', JSON.stringify({ x: 10, y: 20 }));
    localStorage.setItem('home_architect_broken', '{pas du json');
    localStorage.setItem('home_architect_other', JSON.stringify({ theme: 'dark' }));
    localStorage.setItem('autre_cle', JSON.stringify({ id: 'x', walls: [] }));
    const legacy = readLegacyLocalProjects().sort((a, b) => a.key.localeCompare(b.key));
    expect(legacy.map(l => l.key)).toEqual(['home_architect_etage1', 'home_architect_rdc']);
    expect(legacy[0].project).toMatchObject({ id: 'etage1', category: 'etage1', name: 'Étage' });
    expect(legacy[1].project).toEqual(normalizeProject(legacy[1].project));
    expect(legacy[1].project.bindings[0].tapAction).toBeUndefined();
  });

  it('ne lève pas si localStorage est inaccessible', () => {
    vi.spyOn(Storage.prototype, 'key').mockImplementation(() => { throw new DOMException('denied', 'SecurityError'); });
    localStorage.setItem('home_architect_rdc', '{}');
    expect(readLegacyLocalProjects()).toEqual([]);
  });

  it('ne supprime que les clés de projets hérités', () => {
    localStorage.setItem('home_architect_rdc', '{}');
    localStorage.setItem('home_architect_toolbar_pos', '{}');
    localStorage.setItem('autre_cle', '{}');
    removeLegacyLocalProject('home_architect_toolbar_pos');
    removeLegacyLocalProject('autre_cle');
    removeLegacyLocalProject('home_architect_rdc');
    expect(localStorage.getItem('home_architect_toolbar_pos')).toBe('{}');
    expect(localStorage.getItem('autre_cle')).toBe('{}');
    expect(localStorage.getItem('home_architect_rdc')).toBeNull();
  });
});
