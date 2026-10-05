/**
 * Projets ouverts dans le studio (constats F2, F3, F15).
 *
 * Les projets sont indexés par leur identifiant immuable ; le niveau (catégorie) n'est qu'un
 * attribut. Le sélecteur de niveau, le filigrane et les confirmations s'appuient sur l'index
 * « catégorie -> projets » dérivé des projets ouverts et de la liste légère du serveur.
 * Aucune entrée/sortie ici : le panneau orchestre le serveur et les brouillons.
 */
import { HomeArchitectProject } from '../core/types';
import { ProjectSummary } from '../core/ha-api';
import { isKnownLevel } from '../core/levels';
import { ProjectHistory } from './history';

/** Plan proposé dans le sélecteur de niveau (ouvert dans le studio et/ou enregistré sur le serveur). */
export interface PlanEntry {
  id: string;
  name: string;
  category?: string;
  /** Ouvert dans le studio. */
  open: boolean;
  /** Modifications non sauvegardées. */
  dirty: boolean;
  /** Enregistré sur le serveur (révision connue). */
  stored: boolean;
  updatedAt: string;
}

/** Vrai si le plan ne contient rien (ni géométrie, ni entité, ni fond). */
export function isEmptyProject(p: HomeArchitectProject): boolean {
  return p.walls.length === 0 && p.openings.length === 0 && p.rooms.length === 0 &&
    p.bindings.length === 0 && (p.furniture?.length ?? 0) === 0 && !p.background;
}

function toTime(iso: string | undefined): number {
  const t = iso ? Date.parse(iso) : NaN;
  return Number.isFinite(t) ? t : 0;
}

export class ProjectWorkspace {
  readonly history = new ProjectHistory();
  private projects = new Map<string, HomeArchitectProject>();
  private dirty = new Set<string>();
  private _activeId: string;
  private _summaries: ProjectSummary[] = [];
  /** Dernier plan affiché pour chaque catégorie (choix par défaut du sélecteur de niveau). */
  private lastByCategory = new Map<string, string>();

  constructor(initial: HomeArchitectProject, private readonly onChange: () => void) {
    this.projects.set(initial.id, initial);
    this._activeId = initial.id;
  }

  get activeId(): string {
    return this._activeId;
  }

  /** Projet affiché dans le canevas. */
  get active(): HomeArchitectProject {
    return this.projects.get(this._activeId) as HomeArchitectProject;
  }

  get summaries(): readonly ProjectSummary[] {
    return this._summaries;
  }

  get(id: string): HomeArchitectProject | undefined {
    return this.projects.get(id);
  }

  has(id: string): boolean {
    return this.projects.has(id);
  }

  isDirty(id: string): boolean {
    return this.dirty.has(id);
  }

  hasDirty(): boolean {
    return this.dirty.size > 0;
  }

  dirtyIds(): string[] {
    return [...this.dirty];
  }

  /** Remplace tous les projets ouverts par `project` (chargement initial). */
  reset(project: HomeArchitectProject): void {
    for (const id of this.projects.keys()) this.history.clear(id);
    this.projects.clear();
    this.dirty.clear();
    this.lastByCategory.clear();
    this.projects.set(project.id, project);
    this.setActive(project.id);
    this.onChange();
  }

  /**
   * Ouvre (ou remplace) un projet chargé depuis le serveur ou un brouillon.
   * L'historique du projet est vidé : ses instantanés ne correspondent plus à cette version.
   */
  open(project: HomeArchitectProject, opts: { dirty?: boolean } = {}): void {
    this.projects.set(project.id, project);
    this.history.clear(project.id);
    if (opts.dirty) this.dirty.add(project.id);
    else this.dirty.delete(project.id);
    this.onChange();
  }

  /** Ferme un projet ouvert (le projet actif ne peut pas être fermé). */
  close(id: string): void {
    if (id === this._activeId || !this.projects.has(id)) return;
    this.projects.delete(id);
    this.dirty.delete(id);
    this.history.clear(id);
    for (const [category, lastId] of this.lastByCategory) {
      if (lastId === id) this.lastByCategory.delete(category);
    }
    this.onChange();
  }

  activate(id: string): void {
    if (!this.projects.has(id)) return;
    this.setActive(id);
    this.onChange();
  }

  private setActive(id: string): void {
    this._activeId = id;
    const category = this.projects.get(id)?.category;
    if (category) this.lastByCategory.set(category, id);
  }

  /** Modification de l'utilisateur sur un projet ouvert : instantané, remplacement, drapeau « modifié ». */
  commit(next: HomeArchitectProject, coalesceKey?: string): void {
    const previous = this.projects.get(next.id);
    if (!previous || previous === next) return;
    this.history.record(previous, coalesceKey);
    this.projects.set(next.id, next);
    this.dirty.add(next.id);
    this.onChange();
  }

  /** Remplacement sans historique ni changement du drapeau (révision serveur, publication, asset de fond…). */
  replace(next: HomeArchitectProject): void {
    if (!this.projects.has(next.id)) return;
    this.projects.set(next.id, next);
    if (next.id === this._activeId && next.category) this.lastByCategory.set(next.category, next.id);
    this.onChange();
  }

  markDirty(id: string): void {
    if (!this.projects.has(id) || this.dirty.has(id)) return;
    this.dirty.add(id);
    this.onChange();
  }

  markClean(id: string): void {
    if (!this.dirty.delete(id)) return;
    this.onChange();
  }

  canUndo(): boolean {
    return this.history.canUndo(this._activeId);
  }

  canRedo(): boolean {
    return this.history.canRedo(this._activeId);
  }

  /** Annule la dernière modification du projet actif ; renvoie le projet restauré, ou null. */
  undo(): HomeArchitectProject | null {
    return this.restore(this.history.undo(this.active));
  }

  /** Rétablit la dernière modification annulée du projet actif ; renvoie le projet restauré, ou null. */
  redo(): HomeArchitectProject | null {
    return this.restore(this.history.redo(this.active));
  }

  private restore(project: HomeArchitectProject | null): HomeArchitectProject | null {
    if (!project) return null;
    this.projects.set(project.id, project);
    this.dirty.add(project.id);
    this.onChange();
    return project;
  }

  // --- Liste légère du serveur -------------------------------------------------------------------

  setSummaries(summaries: ProjectSummary[]): void {
    this._summaries = [...summaries];
    this.onChange();
  }

  /** Met à jour (ou ajoute) le résumé d'un projet après une sauvegarde ou une publication. */
  upsertSummary(project: HomeArchitectProject): void {
    const previous = this._summaries.find(s => s.id === project.id);
    const summary: ProjectSummary = {
      id: project.id,
      name: project.name,
      category: project.category,
      created_at: project.created_at,
      updated_at: project.updated_at,
      revision: project.revision ?? 0,
      has_background: !!project.background,
      publish: project.publish ?? previous?.publish ?? null,
      counts: {
        walls: project.walls.length,
        rooms: project.rooms.length,
        bindings: project.bindings.length,
        furniture: project.furniture?.length ?? 0,
      },
    };
    this._summaries = previous
      ? this._summaries.map(s => (s.id === project.id ? summary : s))
      : [...this._summaries, summary];
    this.onChange();
  }

  removeSummary(id: string): void {
    const next = this._summaries.filter(s => s.id !== id);
    if (next.length === this._summaries.length) return;
    this._summaries = next;
    this.onChange();
  }

  summary(id: string): ProjectSummary | undefined {
    return this._summaries.find(s => s.id === id);
  }

  // --- Index catégorie -> projets ----------------------------------------------------------------

  /** Tous les plans connus (ouverts d'abord pour leurs données à jour), sans doublon. */
  private entries(): PlanEntry[] {
    const byId = new Map<string, PlanEntry>();
    for (const s of this._summaries) {
      byId.set(s.id, {
        id: s.id, name: s.name, category: s.category, open: false, dirty: false, stored: true,
        updatedAt: s.updated_at ?? '',
      });
    }
    for (const p of this.projects.values()) {
      byId.set(p.id, {
        id: p.id, name: p.name, category: p.category, open: true, dirty: this.dirty.has(p.id),
        stored: p.revision !== undefined, updatedAt: p.updated_at,
      });
    }
    return [...byId.values()];
  }

  /** Plans rangés dans une catégorie, du plus récemment modifié au plus ancien. */
  plansForCategory(category: string): PlanEntry[] {
    return this.entries()
      .filter(e => e.category === category)
      .sort((a, b) => toTime(b.updatedAt) - toTime(a.updatedAt) || a.name.localeCompare(b.name));
  }

  /** Plans dont la catégorie n'est pas un niveau connu (« Autre » ou catégorie personnalisée). */
  customPlans(): PlanEntry[] {
    return this.entries()
      .filter(e => !isKnownLevel(e.category))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Plan affiché pour un niveau : le dernier ouvert dans ce niveau, sinon un plan ouvert de ce
   * niveau, sinon le plus récent du serveur ; null si le niveau n'a aucun plan.
   */
  projectIdForLevel(level: string): string | null {
    const last = this.lastByCategory.get(level);
    if (last && this.projects.get(last)?.category === level) return last;
    const plans = this.plansForCategory(level);
    return (plans.find(p => p.open) ?? plans[0])?.id ?? null;
  }
}
