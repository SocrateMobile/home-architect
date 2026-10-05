/**
 * Traductions de l'interface (squelette : les dictionnaires sont remplis par la vague i18n).
 * Les libellés source sont en français ; une clé absente de la langue courante est cherchée
 * dans l'autre langue, puis la clé elle-même est renvoyée.
 */

/** Langues prises en charge. */
export type Lang = 'fr' | 'en';

const dictionaries: Record<Lang, Record<string, string>> = { fr: {}, en: {} };
let currentLang: Lang = 'fr';

/** Choisit la langue d'après la langue HA (`hass.language`) : 'fr*' -> fr, sinon en. */
export function setLanguage(lang: string | undefined | null): void {
  currentLang = typeof lang === 'string' && lang.toLowerCase().startsWith('fr') ? 'fr' : 'en';
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

/** Ajoute (ou remplace) des traductions pour une langue. */
export function registerTranslations(lang: Lang, dict: Record<string, string>): void {
  Object.assign(dictionaries[lang], dict);
}
