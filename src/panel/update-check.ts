/**
 * Notification de mise à jour du studio (constats F7, F18, F81, F86, F87, F106).
 *
 * L'intégration ne s'installe plus elle-même : le panneau signale une nouvelle version d'après
 * `home_architect/check_updates` (comparaison semver et version ignorée gérées par le backend)
 * et renvoie vers la page des mises à jour de Home Assistant et vers la release.
 */
import { PermissionDeniedError, checkUpdates } from '../core/ha-api';
import { getLoadedBundles, isReloadRequired } from '../version';

/** Page des releases (repli quand le backend ne fournit pas d'URL fiable). */
export const RELEASES_URL = 'https://github.com/SocrateMobile/home-architect/releases';

/** Page Home Assistant des mises à jour. */
export const HA_UPDATES_PATH = '/config/updates';

/** Seules les pages du dépôt officiel sont proposées comme lien de release. */
const RELEASE_URL_PATTERN = /^https:\/\/github\.com\/SocrateMobile\/home-architect(?:[/?#][^\s"'<>]*)?$/i;
const SEMVER_PATTERN = /^v?(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?)$/;

export interface UpdateInfo {
  /** Nouvelle version disponible et non ignorée (décision du backend). */
  available: boolean;
  installedVersion: string;
  latestVersion: string | null;
  releaseUrl: string;
  /** Notes de version (texte Markdown brut, affiché comme texte). */
  releaseNotes: string;
  /** Entité update de l'intégration, suivie pour réévaluer l'état pendant la session. */
  entityId: string | null;
  /** Le code chargé dans la page ne correspond plus à la version installée : il faut recharger. */
  reloadRequired: boolean;
  /** Versions des bundles actifs, pour le bandeau de rechargement (« carte 1.0.25, studio 1.1.0 »). */
  loadedBundles: string;
}

function cleanVersion(v: string | null): string | null {
  const match = v ? SEMVER_PATTERN.exec(v.trim()) : null;
  return match ? match[1] : null;
}

function describeLoadedBundles(): string {
  const labels: Record<string, string> = { card: 'carte', panel: 'studio' };
  return Object.entries(getLoadedBundles())
    .map(([bundle, version]) => `${labels[bundle] ?? bundle} ${version}`)
    .join(', ');
}

/**
 * Interroge le backend (commande réservée aux administrateurs).
 * Résout null si l'utilisateur n'est pas administrateur ; lève pour les autres erreurs.
 */
export async function fetchUpdateInfo(hass: any): Promise<UpdateInfo | null> {
  let status;
  try {
    status = await checkUpdates(hass);
  } catch (err) {
    if (err instanceof PermissionDeniedError) return null;
    throw err;
  }
  const latestVersion = cleanVersion(status.latest_version);
  const releaseUrl = status.release_url && RELEASE_URL_PATTERN.test(status.release_url) ? status.release_url : RELEASES_URL;
  return {
    available: status.update_available && latestVersion !== null,
    installedVersion: cleanVersion(status.installed_version) ?? status.installed_version,
    latestVersion,
    releaseUrl,
    releaseNotes: status.release_notes.trim(),
    entityId: status.update_entity_id,
    reloadRequired: isReloadRequired(status.installed_version),
    loadedBundles: describeLoadedBundles(),
  };
}

/**
 * Signature de l'entité update (état, versions, version ignorée) : quand elle change (mise à jour
 * ignorée ou installée depuis les Paramètres), le panneau réinterroge le backend.
 */
export function updateEntitySignature(hass: any, entityId: string | null): string | null {
  const stateObj = entityId ? hass?.states?.[entityId] : undefined;
  if (!stateObj) return null;
  const a = stateObj.attributes ?? {};
  return [stateObj.state, a.installed_version, a.latest_version, a.skipped_version, a.in_progress].map(String).join('|');
}

/** Navigation interne de Home Assistant (même mécanisme que `navigate()` du frontend HA). */
export function navigateInHa(path: string): void {
  history.pushState(null, '', path);
  window.dispatchEvent(new CustomEvent('location-changed', { detail: { replace: false } }));
}
