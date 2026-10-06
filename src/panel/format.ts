/**
 * Formats localisés du studio (constat F110) : pluriels, nombres, unités et dates selon la langue
 * courante (src/i18n). Importer ce module enregistre aussi les traductions de l'espace `panel`.
 */
import { formatNumber, getLanguage, localize } from '../i18n';
import '../i18n/locales/panel';

type Params = Record<string, string | number>;

const pluralRules = new Map<string, Intl.PluralRules | null>();

/** Catégorie de pluriel d'un nombre dans la langue courante (en français, 0 et 1 sont au singulier). */
function pluralForm(count: number): 'one' | 'other' {
  const lang = getLanguage();
  if (!pluralRules.has(lang)) {
    try {
      pluralRules.set(lang, new Intl.PluralRules(lang));
    } catch {
      pluralRules.set(lang, null);
    }
  }
  const rules = pluralRules.get(lang);
  if (rules) return rules.select(count) === 'one' ? 'one' : 'other';
  return count === 1 || (lang === 'fr' && count === 0) ? 'one' : 'other';
}

/**
 * Texte qui dépend d'un nombre : clé `<key>_one` ou `<key>_other`. Le marqueur `{count}` reçoit le
 * nombre formaté ; les autres paramètres sont interpolés tels quels.
 */
export function localizeCount(key: string, count: number, params: Params = {}): string {
  return localize(`${key}_${pluralForm(count)}`, { ...params, count: formatNumber(count) });
}

/** Nombre avec exactement `digits` décimales (séparateur de la langue courante). */
export function formatFixed(value: number, digits: number): string {
  return formatNumber(value, { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

/** Longueur en mètres (« 2,50 m » / « 2.50 m »). */
export function formatMeters(meters: number, digits: number = 2): string {
  return localize('panel.unit.meters', { value: formatFixed(meters, digits) });
}

/** Longueur en centimètres, arrondie (« 20 cm »), à partir d'une valeur en mètres. */
export function formatCentimeters(meters: number): string {
  return localize('panel.unit.centimeters', { value: formatNumber(Math.round(meters * 100)) });
}

/** Longueur affichée en centimètres sous 1 m, sinon en mètres (listes de largeurs). */
export function formatLength(meters: number): string {
  return meters < 1 ? formatCentimeters(meters) : formatMeters(meters);
}

/** Surface en mètres carrés (au plus deux décimales). */
export function formatArea(m2: number): string {
  return localize('panel.unit.square_meters', { value: formatNumber(m2, { maximumFractionDigits: 2 }) });
}

/** Facteur d'échelle (« ×1,250 »). */
export function formatScaleFactor(k: number): string {
  return `×${formatFixed(k, 3)}`;
}

/** Date et heure locales d'un horodatage ISO (copies locales). */
export function formatDateTime(iso: string): string {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return localize('panel.common.unknown_date');
  try {
    return new Date(t).toLocaleString(getLanguage() === 'fr' ? 'fr-FR' : 'en-US', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  } catch {
    return new Date(t).toISOString();
  }
}
