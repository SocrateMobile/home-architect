/**
 * Traductions de l'interface (fr / en).
 *
 * Organisation : chaque domaine de l'interface possède son fichier `src/i18n/locales/<espace>.ts`
 * qui appelle `registerTranslations` à l'import (effet de bord). Un composant importe uniquement
 * les espaces qu'il utilise, ce qui garde le bundle de la carte léger. Les clés sont préfixées
 * par l'espace (`panel.save`, `canvas.hud.zoom_in`…).
 *
 * Une clé absente de la langue courante est cherchée dans l'autre langue, puis la clé elle-même
 * est renvoyée. La langue suit `hass.language` (appeler `setLanguage` quand hass change) ; les
 * composants Lit se re-rendent au changement de langue grâce à `LocalizeController`.
 */
import type { ReactiveController, ReactiveControllerHost } from 'lit';

/** Langues prises en charge. */
export type Lang = 'fr' | 'en';

const dictionaries: Record<Lang, Record<string, string>> = { fr: {}, en: {} };
let currentLang: Lang = 'fr';
const listeners = new Set<(lang: Lang) => void>();

/** Choisit la langue d'après la langue HA (`hass.language`) : 'fr*' -> fr, sinon en. Notifie si elle change. */
export function setLanguage(lang: string | undefined | null): void {
  const next: Lang = typeof lang === 'string' && lang.toLowerCase().startsWith('fr') ? 'fr' : 'en';
  if (next === currentLang) return;
  currentLang = next;
  for (const listener of [...listeners]) {
    try {
      listener(next);
    } catch (err) {
      console.error('[home-architect] i18n listener failed', err);
    }
  }
}

/** Langue courante. */
export function getLanguage(): Lang {
  return currentLang;
}

/** Traduit une clé ; les paramètres remplacent les marqueurs `{nom}`. Clé inconnue -> la clé. */
export function localize(key: string, params?: Record<string, string | number>): string {
  const fallbackLang: Lang = currentLang === 'fr' ? 'en' : 'fr';
  const template = dictionaries[currentLang][key] ?? dictionaries[fallbackLang][key] ?? key;
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (marker, name: string) =>
    Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : marker
  );
}

/** Indique si une clé existe dans au moins une langue (utile aux tests). */
export function hasTranslation(key: string, lang?: Lang): boolean {
  return lang ? key in dictionaries[lang] : key in dictionaries.fr || key in dictionaries.en;
}

/** Ajoute (ou remplace) des traductions pour une langue. */
export function registerTranslations(lang: Lang, dict: Record<string, string>): void {
  Object.assign(dictionaries[lang], dict);
}

/** S'abonne aux changements de langue ; retourne la fonction de désabonnement. */
export function subscribeLanguage(listener: (lang: Lang) => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Formate un nombre selon la langue courante (séparateur décimal, groupes). */
export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
  if (!Number.isFinite(value)) return '—';
  try {
    return new Intl.NumberFormat(currentLang === 'fr' ? 'fr-FR' : 'en-US', options).format(value);
  } catch {
    return String(value);
  }
}

/** Nom de la « propriété » signalée dans changedProperties lors d'un changement de langue. */
export const LANGUAGE_CHANGED_KEY = '__i18nLanguage';

/**
 * Contrôleur Lit : re-rend l'hôte quand la langue change.
 * Usage : `private readonly i18n = new LocalizeController(this);` puis `localize('ns.key')` dans render().
 * La mise à jour est demandée avec la clé LANGUAGE_CHANGED_KEY : un `shouldUpdate` filtrant doit
 * laisser passer `changedProperties.has(LANGUAGE_CHANGED_KEY)`.
 */
export class LocalizeController implements ReactiveController {
  private unsubscribe: (() => void) | null = null;

  constructor(private readonly host: ReactiveControllerHost) {
    host.addController(this);
  }

  hostConnected(): void {
    this.unsubscribe = subscribeLanguage((lang) => {
      const previous: Lang = lang === 'fr' ? 'en' : 'fr';
      (this.host as unknown as { requestUpdate(name?: PropertyKey, oldValue?: unknown): void }).requestUpdate(
        LANGUAGE_CHANGED_KEY,
        previous
      );
    });
  }

  hostDisconnected(): void {
    this.unsubscribe?.();
    this.unsubscribe = null;
  }
}
