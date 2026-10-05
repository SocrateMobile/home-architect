/**
 * Table unique des niveaux (catégories de plan) connus.
 * Toutes les listes de niveaux de l'interface (sélecteur, catégories de sauvegarde,
 * niveau fantôme, libellés) doivent en être dérivées.
 */

/** Définition d'un niveau connu. */
export interface LevelDef {
  /** Identifiant stable (sert aussi d'id aux anciens projets : 'rdc', 'etage1'…). */
  id: string;
  /** Libellé court affiché dans l'interface. */
  label: string;
  /** Ordre d'affichage (croissant). */
  order: number;
  /** Icône (emoji) affichée à côté du libellé. */
  icon: string;
  /** Libellé long (nom par défaut d'un nouveau plan, menus détaillés). */
  fullLabel: string;
  /** Étage dans la pile verticale (0 = RDC) ; null pour un niveau hors pile (jardin). */
  floor: number | null;
}

/** Niveaux connus, triés par `order`. */
export const KNOWN_LEVELS: readonly LevelDef[] = Object.freeze([
  { id: 'sous-sol', label: 'Sous-Sol', fullLabel: 'Sous-Sol', order: 0, icon: '🏠', floor: -1 },
  { id: 'rdc', label: 'RDC', fullLabel: 'Rez-de-Chaussée', order: 1, icon: '🏠', floor: 0 },
  { id: 'etage1', label: '1er Étage', fullLabel: '1er Étage', order: 2, icon: '🏠', floor: 1 },
  { id: 'etage2', label: '2ème Étage', fullLabel: '2ème Étage', order: 3, icon: '🏠', floor: 2 },
  { id: 'etage3', label: '3ème Étage', fullLabel: '3ème Étage', order: 4, icon: '🏠', floor: 3 },
  { id: 'jardin', label: 'Jardin', fullLabel: 'Jardin', order: 5, icon: '🌳', floor: null },
].map(level => Object.freeze(level)));

/** Niveau actif par défaut à l'ouverture du studio. */
export const DEFAULT_LEVEL = 'rdc';

/** Catégorie des plans qui ne correspondent à aucun niveau connu. */
export const CUSTOM_CATEGORY = 'autre';

/** Entrée « Autre » des listes de catégories (à ajouter après KNOWN_LEVELS). */
export const CUSTOM_CATEGORY_DEF: LevelDef = Object.freeze({
  id: CUSTOM_CATEGORY,
  label: 'Autre',
  fullLabel: 'Autre',
  order: KNOWN_LEVELS.length,
  icon: '📁',
  floor: null,
});

/** Renvoie la définition d'un niveau connu, ou undefined. */
export function getLevel(id: string | undefined | null): LevelDef | undefined {
  return id ? KNOWN_LEVELS.find(level => level.id === id) : undefined;
}

/** Vrai si `id` est un niveau connu ('autre' n'en est pas un). */
export function isKnownLevel(id: string | undefined | null): boolean {
  return getLevel(id) !== undefined;
}

/** Libellé court d'une catégorie : libellé du niveau connu, sinon l'id brut, sinon 'Autre'. */
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
