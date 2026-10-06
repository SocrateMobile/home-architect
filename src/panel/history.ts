/**
 * Historique Annuler / Rétablir du studio, tenu PAR PROJET (constats F17 et F33).
 *
 * Les projets sont mis à jour de façon immuable (copies superficielles `{ ...project }`) : un
 * instantané est donc la référence du projet précédent, sans clonage profond. Les sous-objets
 * inchangés (et l'éventuelle data-URL de fond héritée) sont partagés entre instantanés au lieu
 * d'être dupliqués à chaque action.
 */
import { HomeArchitectProject } from '../core/types';

/** Nombre maximal d'instantanés conservés par pile et par projet. */
export const MAX_HISTORY = 40;

/** Délai pendant lequel des modifications successives de même nature forment une seule entrée. */
const COALESCE_WINDOW_MS = 1500;

/**
 * Champs jamais restaurés par Annuler / Rétablir :
 * - identité et champs possédés par le serveur : un instantané antérieur à une sauvegarde porte une
 *   ancienne révision, qui provoquerait un faux conflit à la sauvegarde suivante ; le nom et la
 *   catégorie ne changent que via la sauvegarde ;
 * - cadre du plan publié : il décrit le SVG déjà publié (le restaurer décalerait silencieusement
 *   les entités du YAML picture-elements) ;
 * - préférences d'affichage et réglages de la grille (constats F47, F104) : enregistrées avec le
 *   plan mais modifiées sans entrée d'historique, elles ne doivent pas changer quand on annule une
 *   modification du dessin.
 */
const PRESERVED_KEYS = [
  'id', 'name', 'category', 'revision', 'publish', 'created_at', 'updated_at', 'schema_version', 'exportFrame',
  'grid', 'showDimensions', 'showThermalHeatmap', 'showGhostLevel', 'ghostLevelId'
] as const;

interface Stacks {
  undo: HomeArchitectProject[];
  redo: HomeArchitectProject[];
  /** Nature et date de la dernière entrée, pour regrouper un geste continu (curseur d'opacité…). */
  coalesceKey: string | null;
  coalescedAt: number;
}

/** Instantané restauré, avec l'identité, les champs serveur et les préférences du projet courant. */
function withIdentity(snapshot: HomeArchitectProject, current: HomeArchitectProject): HomeArchitectProject {
  const restored: Record<string, unknown> = { ...snapshot };
  const source = current as unknown as Record<string, unknown>;
  for (const key of PRESERVED_KEYS) {
    if (source[key] === undefined) delete restored[key];
    else restored[key] = source[key];
  }
  return restored as unknown as HomeArchitectProject;
}

export class ProjectHistory {
  private stacks = new Map<string, Stacks>();

  private stacksFor(projectId: string): Stacks {
    let stacks = this.stacks.get(projectId);
    if (!stacks) {
      stacks = { undo: [], redo: [], coalesceKey: null, coalescedAt: 0 };
      this.stacks.set(projectId, stacks);
    }
    return stacks;
  }

  /**
   * Enregistre l'état `previous` juste avant une modification effective, et vide la pile Rétablir.
   * Avec `coalesceKey`, les modifications de même nature rapprochées (moins de 1,5 s) ne créent
   * qu'une entrée : l'état d'avant le geste.
   */
  record(previous: HomeArchitectProject, coalesceKey?: string): void {
    const stacks = this.stacksFor(previous.id);
    const now = Date.now();
    if (coalesceKey && stacks.coalesceKey === coalesceKey && now - stacks.coalescedAt < COALESCE_WINDOW_MS) {
      stacks.coalescedAt = now;
      return;
    }
    stacks.undo = [...stacks.undo.slice(-(MAX_HISTORY - 1)), previous];
    stacks.redo = [];
    stacks.coalesceKey = coalesceKey ?? null;
    stacks.coalescedAt = now;
  }

  canUndo(projectId: string): boolean {
    return (this.stacks.get(projectId)?.undo.length ?? 0) > 0;
  }

  canRedo(projectId: string): boolean {
    return (this.stacks.get(projectId)?.redo.length ?? 0) > 0;
  }

  /** État précédent de `current` (identité, champs serveur et préférences conservés), ou null si la pile est vide. */
  undo(current: HomeArchitectProject): HomeArchitectProject | null {
    const stacks = this.stacks.get(current.id);
    if (!stacks || stacks.undo.length === 0) return null;
    const previous = stacks.undo[stacks.undo.length - 1];
    stacks.undo = stacks.undo.slice(0, -1);
    stacks.redo = [...stacks.redo.slice(-(MAX_HISTORY - 1)), current];
    stacks.coalesceKey = null;
    return withIdentity(previous, current);
  }

  /** État suivant de `current` (identité, champs serveur et préférences conservés), ou null si la pile est vide. */
  redo(current: HomeArchitectProject): HomeArchitectProject | null {
    const stacks = this.stacks.get(current.id);
    if (!stacks || stacks.redo.length === 0) return null;
    const next = stacks.redo[stacks.redo.length - 1];
    stacks.redo = stacks.redo.slice(0, -1);
    stacks.undo = [...stacks.undo.slice(-(MAX_HISTORY - 1)), current];
    stacks.coalesceKey = null;
    return withIdentity(next, current);
  }

  /** Applique `transform` à tous les instantanés d'un projet (ex. data-URL de fond remplacée par un asset). */
  rewrite(projectId: string, transform: (snapshot: HomeArchitectProject) => HomeArchitectProject): void {
    const stacks = this.stacks.get(projectId);
    if (!stacks) return;
    stacks.undo = stacks.undo.map(transform);
    stacks.redo = stacks.redo.map(transform);
  }

  /** Oublie l'historique d'un projet (rechargé depuis le serveur, fermé…). */
  clear(projectId: string): void {
    this.stacks.delete(projectId);
  }
}
