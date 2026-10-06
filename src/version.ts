export const VERSION = '1.1.2';

/**
 * Registre des bundles frontend chargés dans la page (constat F106).
 *
 * La carte (`home_architect-card.js`, injectée sur toutes les pages via add_extra_js_url)
 * et le studio (`home_architect-panel.js`, chargé par le panneau) sont deux bundles
 * distincts. Une page restée ouverte pendant une mise à jour peut donc faire cohabiter
 * une ancienne carte et un nouveau panneau : le registre permet de le détecter et
 * d'inviter l'utilisateur à recharger la page.
 */
export type BundleName = 'card' | 'panel';

/**
 * Version attribuée aux éléments définis par un ancien bundle unique (≤ 1.0.x), antérieur à ce
 * registre : il définissait à la fois la carte et le studio.
 */
export const LEGACY_BUNDLE_VERSION = 'legacy';

/**
 * Forme du registre partagé par TOUTES les versions chargées dans la page (`window`) : elle doit
 * rester compatible d'une version à l'autre (nom du bundle -> version).
 */
type BundleRegistry = Partial<Record<BundleName, string>>;

declare global {
  interface Window {
    __homeArchitectBundles?: BundleRegistry;
  }
}

/** Élément principal de chaque bundle : la carte ne définit jamais le studio, et inversement. */
const MAIN_ELEMENT: Record<BundleName, string> = {
  card: 'home-architect-card',
  panel: 'home-architect-panel'
};

function bundleRegistry(): BundleRegistry {
  const current = window.__homeArchitectBundles;
  if (typeof current === 'object' && current !== null) return current;
  return (window.__homeArchitectBundles = {});
}

function normalizeVersion(version: string): string {
  return version.trim().replace(/^v/i, '');
}

/**
 * Enregistre le bundle courant et affiche la bannière console avec la version réelle.
 * Signale dans la console si des bundles de versions différentes cohabitent.
 *
 * La première définition d'un élément personnalisé l'emporte (`defineElement` ignore les
 * suivantes) : le registre garde donc la version du PREMIER bundle enregistré sous un nom,
 * celle dont le code s'exécute réellement, et non celle du dernier évalué.
 */
export function registerBundle(name: BundleName): void {
  const registry = bundleRegistry();
  const other: BundleName = name === 'card' ? 'panel' : 'card';
  // L'élément principal de l'autre bundle est défini sans que celui-ci se soit enregistré : un
  // ancien bundle unique (≤ 1.0.x) a été évalué avant nous et a aussi défini nos éléments.
  if (registry[other] === undefined && customElements.get(MAIN_ELEMENT[other])) {
    registry[other] = LEGACY_BUNDLE_VERSION;
    registry[name] ??= LEGACY_BUNDLE_VERSION;
  }
  registry[name] ??= VERSION;

  console.info(
    `%c 📐 HOME ARCHITECT %c v${VERSION} · ${name === 'card' ? 'carte' : 'studio'} `,
    'background: #0284c7; color: #fff; font-weight: bold; border-radius: 4px 0 0 4px; padding: 2px 6px;',
    'background: #1e293b; color: #38bdf8; font-weight: bold; border-radius: 0 4px 4px 0; padding: 2px 6px;'
  );

  const mismatched = Object.entries(registry).filter(([, version]) => version !== VERSION);
  if (mismatched.length > 0) {
    console.warn(
      `[home-architect] Versions différentes chargées dans la page (${name} v${VERSION} évalué, actifs : ` +
        mismatched.map(([bundle, version]) => `${bundle} ${version}`).join(', ') +
        ') : rechargez la page pour utiliser la nouvelle version.'
    );
  }
}

/** Versions des bundles dont les éléments sont actifs dans la page (copie). */
export function getLoadedBundles(): Readonly<BundleRegistry> {
  return { ...bundleRegistry() };
}

/**
 * Vrai si le code chargé dans la page ne correspond pas à la version de l'intégration
 * installée côté serveur (`UpdateStatus.installed_version`) : une mise à jour a été
 * installée pendant que la page était ouverte et il faut la recharger.
 */
export function isReloadRequired(backendVersion: string | null | undefined): boolean {
  if (typeof backendVersion !== 'string' || backendVersion.trim() === '') return false;
  const expected = normalizeVersion(backendVersion);
  const loaded = Object.values(bundleRegistry()).filter((version): version is string => typeof version === 'string');
  return [VERSION, ...loaded].some((version) => normalizeVersion(version) !== expected);
}
