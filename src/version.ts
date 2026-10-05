export const VERSION = '1.0.25';

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

/** Version attribuée à une carte chargée par un bundle antérieur à ce registre (≤ 1.0.x). */
export const LEGACY_BUNDLE_VERSION = 'legacy';

type BundleRegistry = Partial<Record<BundleName, string>>;

declare global {
  interface Window {
    __homeArchitectBundles?: BundleRegistry;
  }
}

function bundleRegistry(): BundleRegistry {
  return (window.__homeArchitectBundles ??= {});
}

/**
 * Enregistre le bundle courant et affiche la bannière console avec la version réelle.
 * Signale dans la console si des bundles de versions différentes cohabitent.
 */
export function registerBundle(name: BundleName): void {
  const registry = bundleRegistry();
  // Une carte définie sans s'être enregistrée provient d'un ancien bundle unique (≤ 1.0.x).
  if (name === 'panel' && !registry.card && customElements.get('home-architect-card')) {
    registry.card = LEGACY_BUNDLE_VERSION;
  }
  registry[name] = VERSION;

  console.info(
    `%c 📐 HOME ARCHITECT %c v${VERSION} · ${name === 'card' ? 'carte' : 'studio'} `,
    'background: #0284c7; color: #fff; font-weight: bold; border-radius: 4px 0 0 4px; padding: 2px 6px;',
    'background: #1e293b; color: #38bdf8; font-weight: bold; border-radius: 0 4px 4px 0; padding: 2px 6px;'
  );

  const mismatched = Object.entries(registry).filter(([, version]) => version !== VERSION);
  if (mismatched.length > 0) {
    console.warn(
      `[home-architect] Versions différentes chargées dans la page (${name} v${VERSION}, ` +
        mismatched.map(([bundle, version]) => `${bundle} ${version}`).join(', ') +
        ') : rechargez la page pour utiliser la nouvelle version.'
    );
  }
}

/** Versions des bundles actuellement chargés dans la page (copie). */
export function getLoadedBundles(): Readonly<BundleRegistry> {
  return { ...bundleRegistry() };
}

/**
 * Vrai si le code chargé dans la page ne correspond pas à la version de l'intégration
 * installée côté serveur (`UpdateStatus.installed_version`) : une mise à jour a été
 * installée pendant que la page était ouverte et il faut la recharger.
 */
export function isReloadRequired(backendVersion: string | null | undefined): boolean {
  if (!backendVersion) return false;
  return [VERSION, ...Object.values(bundleRegistry())].some((version) => version !== backendVersion);
}
