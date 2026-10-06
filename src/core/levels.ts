/**
 * Table unique des niveaux (catégories de plan) connus.
 * Toutes les listes de niveaux de l'interface (sélecteur, catégories de sauvegarde,
 * niveau fantôme, libellés) doivent en être dérivées.
 * Les libellés sont traduits à chaque lecture (langue courante, clés `ui.level.<id>`).
 */
import { localize } from '../i18n';
import '../i18n/locales/levels';

/** Définition d'un niveau connu. */
export interface LevelDef {
  /** Identifiant stable (sert aussi d'id aux anciens projets : 'rdc', 'etage1'…). */
  id: string;
  /** Libellé court affiché dans l'interface (traduit dans la langue courante). */
  label: string;
  /** Ordre d'affichage (croissant). */
  order: number;
  /** Icône (emoji) affichée à côté du libellé. */
  icon: string;
  /** Libellé long (nom par défaut d'un nouveau plan, menus détaillés), traduit dans la langue courante. */
  fullLabel: string;
  /** Étage dans la pile verticale (0 = RDC) ; null pour un niveau hors pile (jardin). */
  floor: number | null;
}

/** Définition figée dont les libellés suivent la langue courante (accesseurs, lus au rendu). */
function defineLevel(id: string, order: number, icon: string, floor: number | null): LevelDef {
  return Object.freeze({
    id,
    order,
    icon,
    floor,
    get label(): string {
      return localize(`ui.level.${id}`);
    },
    get fullLabel(): string {
      return localize(`ui.level.${id}.full`);
    },
  });
}

/** Niveaux connus, triés par `order`. */
export const KNOWN_LEVELS: readonly LevelDef[] = Object.freeze([
  defineLevel('sous-sol', 0, '🏠', -1),
  defineLevel('rdc', 1, '🏠', 0),
  defineLevel('etage1', 2, '🏠', 1),
  defineLevel('etage2', 3, '🏠', 2),
  defineLevel('etage3', 4, '🏠', 3),
  defineLevel('jardin', 5, '🌳', null),
]);

/** Niveau actif par défaut à l'ouverture du studio. */
export const DEFAULT_LEVEL = 'rdc';

/** Catégorie des plans qui ne correspondent à aucun niveau connu. */
export const CUSTOM_CATEGORY = 'autre';

/** Entrée « Autre » des listes de catégories (à ajouter après KNOWN_LEVELS). */
export const CUSTOM_CATEGORY_DEF: LevelDef = defineLevel(CUSTOM_CATEGORY, KNOWN_LEVELS.length, '📁', null);

/** Renvoie la définition d'un niveau connu, ou undefined. */
export function getLevel(id: string | undefined | null): LevelDef | undefined {
  return id ? KNOWN_LEVELS.find(level => level.id === id) : undefined;
}

/** Vrai si `id` est un niveau connu ('autre' n'en est pas un). */
export function isKnownLevel(id: string | undefined | null): boolean {
  return getLevel(id) !== undefined;
}

/** Libellé court d'une catégorie : libellé du niveau connu, sinon l'id brut, sinon « Autre » (traduits). */
export function getLevelLabel(id: string | undefined | null): string {
  const level = getLevel(id);
  if (level) return level.label;
  if (!id || id === CUSTOM_CATEGORY) return CUSTOM_CATEGORY_DEF.label;
  return id;
}

/** Niveau situé juste en dessous dans la pile (niveau fantôme), ou null. */
export function getLevelBelow(id: string | undefined | null): string | null {
  const level = getLevel(id);
  if (!level || level.floor === null) return null;
  const below = KNOWN_LEVELS.find(l => l.floor === (level.floor as number) - 1);
  return below ? below.id : null;
}
