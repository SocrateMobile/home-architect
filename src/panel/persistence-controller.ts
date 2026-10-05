/**
 * Persistance du studio (contrôleur Lit du panneau).
 *
 * - Chargement initial bloquant : liste légère des plans puis plan actif seul (constat F14).
 * - Plans ouverts indexés par identifiant immuable, catégorie séparée (constats F3, F15).
 * - Sauvegarde avec contrôle de révision et dialogue de conflit : recharger, écraser ou
 *   enregistrer une copie (constat F13) ; jamais de faux succès (constats F11, F12).
 * - Drapeau « modifié » par plan, brouillons IndexedDB différés, migration unique des anciennes
 *   copies localStorage, proposition de restauration au chargement (constats F2, F12, F105).
 * - Image de fond hors du JSON : téléversement et URL affichable (constat F1).
 * - Abonnement aux modifications du plan actif faites ailleurs (constat F13) et suppression (F16).
 * - Lecture seule pour les non-administrateurs (constat F11).
 */
import { ReactiveController, ReactiveControllerHost, TemplateResult, nothing } from 'lit';
import { BackgroundPlan, ExportFrame, HomeArchitectProject, PublishInfo } from '../core/types';
import {
  ConflictError, HaApiError, PayloadTooLargeError, PermissionDeniedError, ProjectSummary,
  getProject, isAdmin, listProjects, readLegacyLocalProjects, removeLegacyLocalProject, saveProject, subscribeProject
} from '../core/ha-api';
import { deleteDraft, listDrafts, loadDraft, saveDraft } from '../core/drafts';
import { blobToDataUrl, dataUrlToBlob, readImageSize } from '../core/image-utils';
import { DEFAULT_LEVEL, getLevelLabel, isKnownLevel } from '../core/levels';
import {
  clearRedundantCustomNames, cloneProject, createEmptyProject, generateProjectId, normalizePublishInfo
} from '../core/project-model';
import { ProjectWorkspace, isEmptyProject } from './workspace';
import {
  BackgroundRejectedError, BackgroundSource, ImportedBackground, isInlineDataUrl, prepareBackgroundBlob,
  svgWithoutDoctype, uploadInlineBackground, uploadPreparedBackground
} from './background';
import { DraftReview, projectFromDraft, reviewDrafts } from './draft-review';
import {
  ChoiceDialogOptions, PanelNotice, renderChoiceDialog, renderDraftsDialog, renderLoadError, renderLoadingOverlay,
  renderNotices
} from './dialogs';

/** Délai d'écriture du brouillon local après la dernière modification d'un plan. */
const DRAFT_DEBOUNCE_MS = 2000;

/** Codes d'erreur qui laissent espérer qu'un nouvel essai réussira (coupure, serveur indisponible). */
const TRANSIENT_ERROR_CODES = new Set([
  'connection_lost', 'not_connected', 'network_error', 'not_ready', 'save_failed', 'unknown_error', 'http_error'
]);

type RemoteEvent = { project_id: string; revision: number; deleted?: boolean };
type LoadState = 'idle' | 'loading' | 'ready' | 'error';

/** Élément hôte : le panneau du studio. */
export type PersistenceHost = ReactiveControllerHost & { readonly hass: any; readonly isConnected: boolean };

/** Interface utilisateur du panneau utilisée par le contrôleur. */
export interface PersistenceUi {
  toast(message: string): void;
  /** Le plan affiché a changé (autre plan, version rechargée) : sélection en cours à réinitialiser. */
  activeProjectChanged(): void;
}

/** Message lisible d'une erreur quelconque (HaApiError, Error, valeur brute). */
export function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

/** Raison lisible d'un échec de communication avec le serveur. */
function describeFailure(err: unknown): string {
  if (err instanceof HaApiError) {
    switch (err.code) {
      case 'connection_lost':
      case 'not_connected':
      case 'network_error':
        return 'connexion à Home Assistant perdue';
      case 'not_ready':
        return "Home Architect n'est pas chargé sur le serveur";
      case 'save_failed':
        return "échec d'écriture sur le serveur";
      case 'unknown_command':
        return 'intégration Home Architect à redémarrer après sa mise à jour';
    }
  }
  return errorMessage(err);
}

function updatedTime(s: ProjectSummary): number {
  const t = Date.parse(s.updated_at ?? '');
  return Number.isFinite(t) ? t : 0;
}

export class PersistenceController implements ReactiveController {
  /** Plans ouverts, plan actif, drapeaux « modifié », historiques et liste légère du serveur. */
  readonly ws: ProjectWorkspace;
  /** URL affichable de l'image de fond du plan actif (canevas, export). */
  readonly background: BackgroundSource;

  private loadStateValue: LoadState = 'idle';
  private loadError = '';
  /** Opération bloquante en cours (chargement d'un plan, téléversement d'une image). */
  private busyMessage: string | null = null;
  private savingIds = new Set<string>();
  /** Sauvegarde refusée par le serveur (non administrateur) : lecture seule. */
  private permissionDenied = false;
  private notices: PanelNotice[] = [];
  private choiceDialog: ChoiceDialogOptions | null = null;
  private choiceResolve: ((id: string | null) => void) | null = null;
  /** Brouillons proposés au chargement (null : dialogue fermé). */
  private draftReviews: DraftReview[] | null = null;

  private draftTimers = new Map<string, ReturnType<typeof setTimeout>>();
  /** Plans vierges créés en changeant de niveau : oubliés s'ils sont quittés sans modification. */
  private placeholderIds = new Set<string>();
  /** Événements d'abonnement reçus pendant la sauvegarde du même plan (traités ensuite). */
  private pendingRemoteEvents = new Map<string, RemoteEvent>();
  private unsubscribeProject: (() => void) | null = null;
  private subscribedProjectId: string | null = null;
  private subscriptionToken = 0;
  /** Plans des niveaux inférieurs chargés pour le filigrane (lecture seule), avec leur révision. */
  private ghostCache = new Map<string, { revision: number; project: HomeArchitectProject }>();
  private ghostLoading = new Set<string>();
  private readOnlyToastAt = 0;

  private readonly onBeforeUnload = (e: BeforeUnloadEvent) => {
    if (!this.ws.hasDirty()) return;
    this.flushDrafts();
    e.preventDefault();
    e.returnValue = '';
  };

  private readonly onVisibilityChange = () => {
    if (document.visibilityState === 'hidden') this.flushDrafts();
  };

  constructor(private readonly host: PersistenceHost, private readonly ui: PersistenceUi) {
    this.ws = new ProjectWorkspace(createEmptyProject({ category: DEFAULT_LEVEL }), () => host.requestUpdate());
    this.background = new BackgroundSource(() => host.requestUpdate());
    host.addController(this);
  }

  // --- Cycle de vie --------------------------------------------------------------------------------

  hostConnected() {
    // Travail non sauvegardé : avertissement avant de quitter la page et brouillons écrits sans attendre
    // quand l'onglet passe en arrière-plan (application compagnon suspendue…).
    window.addEventListener('beforeunload', this.onBeforeUnload);
    document.addEventListener('visibilitychange', this.onVisibilityChange);
    // Panneau réinséré dans la page : reprendre l'abonnement et l'image de fond.
    if (this.ready) this.syncActiveResources();
  }

  hostDisconnected() {
    // Le panneau est détruit quand on navigue ailleurs dans HA : les brouillons sont écrits tout de suite.
    this.flushDrafts();
    this.unsubscribeActive();
    this.background.release();
    window.removeEventListener('beforeunload', this.onBeforeUnload);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  }

  hostUpdate() {
    // Ressources du plan affiché : uniquement panneau connecté (libérées dans hostDisconnected).
    if (this.host.isConnected) this.background.sync(this.host.hass, this.ws.active);
  }

  // --- État exposé au panneau ----------------------------------------------------------------------

  get project(): HomeArchitectProject {
    return this.ws.active;
  }

  get ready(): boolean {
    return this.loadStateValue === 'ready';
  }

  /** Lecture seule : utilisateur non administrateur, ou sauvegarde refusée par le serveur. */
  get readOnly(): boolean {
    return !isAdmin(this.host.hass) || this.permissionDenied;
  }

  isSaving(id: string): boolean {
    return this.savingIds.has(id);
  }

  /** Chargement, opération bloquante ou dialogue de persistance en cours. */
  isBlocking(): boolean {
    return !this.ready || this.busyMessage !== null || this.choiceDialog !== null || this.draftReviews !== null;
  }

  /**
   * Clavier pendant un état bloquant : seule Échap est traitée (fermeture du dialogue).
   * Renvoie true si la touche ne doit pas être traitée par le panneau.
   */
  handleBlockingKey(e: KeyboardEvent): boolean {
    if (!this.isBlocking()) return false;
    if (e.key === 'Escape') {
      if (this.choiceDialog) this.resolveChoice(null);
      else if (this.draftReviews) this.setDraftReviews(null);
    }
    return true;
  }

  private setLoadState(state: LoadState, error = '') {
    this.loadStateValue = state;
    this.loadError = error;
    this.host.requestUpdate();
  }

  private setDraftReviews(reviews: DraftReview[] | null) {
    this.draftReviews = reviews && reviews.length > 0 ? reviews : null;
    this.host.requestUpdate();
  }

  private setSaving(id: string, saving: boolean) {
    if (saving) this.savingIds.add(id);
    else this.savingIds.delete(id);
    this.host.requestUpdate();
  }

  // --- Modifications de l'utilisateur ----------------------------------------------------------------

  /**
   * Applique une modification de l'utilisateur au plan actif : instantané d'historique, drapeau
   * « modifié » et brouillon local différé. Renvoie false si rien n'a été appliqué (lecture seule,
   * chargement en cours, aucune modification, plan qui n'est plus actif).
   */
  commit(next: HomeArchitectProject, opts: { coalesceKey?: string } = {}): boolean {
    if (this.readOnly) {
      this.notifyReadOnly();
      return false;
    }
    const current = this.ws.active;
    if (!this.ready || next === current || next.id !== current.id) return false;
    this.ws.commit(next, opts.coalesceKey);
    this.placeholderIds.delete(next.id);
    this.scheduleDraft(next.id);
    return true;
  }

  undo(): HomeArchitectProject | null {
    return this.restore(() => this.ws.undo());
  }

  redo(): HomeArchitectProject | null {
    return this.restore(() => this.ws.redo());
  }

  private restore(step: () => HomeArchitectProject | null): HomeArchitectProject | null {
    if (this.readOnly) {
      this.notifyReadOnly();
      return null;
    }
    if (!this.ready) return null;
    const restored = step();
    if (restored) this.scheduleDraft(restored.id);
    return restored;
  }

  notifyReadOnly() {
    const now = Date.now();
    if (now - this.readOnlyToastAt < 4000) return;
    this.readOnlyToastAt = now;
    this.ui.toast('🔒 Lecture seule : seuls les administrateurs peuvent modifier les plans.');
  }

  /** Cadre d'export figé (positions % de picture-elements) : enregistré dans le plan, qui devient modifié. */
  setExportFrame(frame: ExportFrame | undefined) {
    if (!frame || this.readOnly) return;
    const { minX, minY, maxX, maxY } = frame;
    if (![minX, minY, maxX, maxY].every(Number.isFinite) || maxX <= minX || maxY <= minY) return;
    const current = this.ws.active.exportFrame;
    if (current && current.minX === minX && current.minY === minY && current.maxX === maxX && current.maxY === maxY) return;
    this.commit({ ...this.ws.active, exportFrame: { minX, minY, maxX, maxY } });
  }

  /** Publication du SVG : champ possédé par le serveur, mis à jour sans marquer le plan comme modifié. */
  setPublish(raw: PublishInfo | undefined) {
    const publish = normalizePublishInfo(raw);
    if (!publish) return;
    const next = { ...this.ws.active, publish };
    this.ws.replace(next);
    if (next.revision !== undefined) this.ws.upsertSummary(next);
  }

  // --- Chargement --------------------------------------------------------------------------------

  /** Premier hass reçu : lance le chargement initial (une seule fois). */
  start() {
    if (this.loadStateValue === 'idle') void this.loadInitial();
  }

  /**
   * Chargement initial bloquant : anciennes copies localStorage migrées en brouillons, liste légère
   * des plans, puis plan actif seul. En cas d'échec, message et « Réessayer » ; la sauvegarde reste
   * désactivée tant que les plans du serveur ne sont pas chargés.
   */
  async loadInitial() {
    const hass = this.host.hass;
    if (!hass || this.loadStateValue === 'loading') return;
    this.setLoadState('loading');
    try {
      await this.migrateLegacyLocalProjects();
      const summaries = await listProjects(hass);
      const initialId = this.pickInitialProjectId(summaries);
      const loaded = initialId ? await getProject(hass, initialId) : null;
      const project = loaded ? this.adoptLoaded(loaded) : createEmptyProject({ category: DEFAULT_LEVEL });
      this.ws.setSummaries(summaries);
      this.ws.reset(project);
      this.placeholderIds.clear();
      if (!loaded) this.placeholderIds.add(project.id);
      this.ghostCache.clear();
      this.setLoadState('ready');
      this.ui.activeProjectChanged();
      this.syncActiveResources();
      void this.reviewLocalDrafts();
    } catch (err) {
      this.setLoadState('error', describeFailure(err));
    }
  }

  /** Plan affiché à l'ouverture : le plus récent du niveau par défaut (RDC), sinon le plus récent. */
  private pickInitialProjectId(summaries: ProjectSummary[]): string | null {
    const byRecent = [...summaries].sort((a, b) => updatedTime(b) - updatedTime(a));
    return (byRecent.find(s => s.category === DEFAULT_LEVEL) ?? byRecent[0])?.id ?? null;
  }

  /** Migration unique : les anciennes copies localStorage deviennent des brouillons IndexedDB. */
  private async migrateLegacyLocalProjects() {
    for (const { key, project } of readLegacyLocalProjects()) {
      // Un brouillon existant est forcément plus récent (les anciennes versions n'en écrivaient pas).
      const existing = await loadDraft(project.id);
      if (existing || await saveDraft(project, null)) removeLegacyLocalProject(key);
    }
  }

  /** Plan venant du serveur : noms d'entités figés par les anciennes versions effacés (affichage live). */
  private adoptLoaded(project: HomeArchitectProject): HomeArchitectProject {
    return clearRedundantCustomNames(project, this.host.hass?.states);
  }

  /** Liste des plans à jour (autres appareils), par exemple à l'ouverture du sélecteur de niveau. */
  async refreshSummaries() {
    if (!this.ready) return;
    try {
      this.ws.setSummaries(await listProjects(this.host.hass));
    } catch (err) {
      console.debug('[home-architect] Liste des plans indisponible :', err);
    }
  }

  /**
   * Affiche un plan. Déjà ouvert, il est repris tel quel ; avec `refresh` (« Ouvrir / Recharger »),
   * il est rechargé depuis le serveur, après confirmation s'il a des modifications non sauvegardées.
   * Sinon il est chargé depuis le serveur.
   */
  async openPlan(id: string, opts: { refresh?: boolean } = {}) {
    if (!this.ready) return;
    const open = this.ws.get(id);
    if (open) {
      if (opts.refresh && this.ws.isDirty(id)) {
        const choice = await this.ask({
          icon: '📂',
          title: 'Plan déjà ouvert et modifié',
          subtitle: `« ${open.name} »`,
          message: 'Ce plan est déjà ouvert dans le studio avec des modifications non sauvegardées.',
          details: [
            "Continuer l'édition : affiche votre version en cours, modifications comprises.",
            'Recharger : affiche la version du serveur ; vos modifications non sauvegardées sont perdues.'
          ],
          actions: [
            { id: 'reload', label: 'Recharger depuis le serveur', icon: '🔄', kind: 'danger' },
            { id: 'keep', label: "Continuer l'édition", icon: '✏️', kind: 'primary' }
          ],
          tone: 'warning'
        });
        if (choice === null || !this.ws.has(id)) return;
        this.activateProject(id);
        if (choice === 'reload') await this.reloadFromServer(id);
        return;
      }
      this.activateProject(id);
      if (opts.refresh && open.revision !== undefined && !this.ws.isDirty(id)) await this.reloadFromServer(id);
      return;
    }

    let project: HomeArchitectProject | null;
    try {
      project = await this.withBusy('Chargement du plan…', () => getProject(this.host.hass, id));
    } catch (err) {
      this.showError(`Impossible d'ouvrir le plan : ${describeFailure(err)}`);
      return;
    }
    if (!project) {
      this.ws.removeSummary(id);
      this.ui.toast('❌ Ce plan n\'existe plus sur le serveur.');
      return;
    }
    this.ws.open(this.adoptLoaded(project));
    this.ws.upsertSummary(project);
    this.activateProject(id);
    this.ui.toast(`📂 Plan "${project.name}" chargé avec succès !`);
  }

  /**
   * Sélecteur de niveau : affiche le plan de ce niveau (déjà ouvert, sinon chargé depuis le serveur)
   * ou, s'il n'en a aucun, un plan vierge rangé dans ce niveau.
   */
  async switchToLevel(level: string) {
    if (!this.ready || this.ws.active.category === level) return;
    const id = this.ws.projectIdForLevel(level);
    if (id) {
      await this.openPlan(id);
      return;
    }
    if (this.readOnly) {
      this.ui.toast(`Aucun plan enregistré pour le niveau ${getLevelLabel(level)}.`);
      return;
    }
    const project = createEmptyProject({ category: level });
    this.ws.open(project);
    this.placeholderIds.add(project.id);
    this.activateProject(project.id);
    this.ui.toast(`Étage sélectionné : ${project.name} (plan vierge)`);
  }

  /**
   * Nouveau plan : identifiant immuable généré, catégorie séparée (constat F3). Le plan en cours
   * reste ouvert avec ses modifications et aucun plan existant n'est remplacé.
   * Renvoie false si l'utilisateur a renoncé.
   */
  async createPlan(name: string, category: string): Promise<boolean> {
    if (this.readOnly || !this.ready) return false;
    if (!(await this.confirmAdditionalPlan(category, name))) return false;
    const project = createEmptyProject({ name, category });
    this.ws.open(project);
    this.activateProject(project.id);
    this.ui.toast(`📄 Nouveau plan "${project.name}" créé : pensez à le sauvegarder.`);
    return true;
  }

  /**
   * Un niveau peut contenir plusieurs plans, mais en ajouter un à un niveau déjà occupé doit être
   * explicite : le sélecteur et le filigrane afficheront ensuite ce plan pour le niveau.
   */
  private async confirmAdditionalPlan(category: string, planName: string, excludeId?: string): Promise<boolean> {
    if (!isKnownLevel(category)) return true;
    const others = this.ws.plansForCategory(category).filter(p => p.id !== excludeId);
    if (others.length === 0) return true;
    const label = getLevelLabel(category);
    const choice = await this.ask({
      icon: '🏢',
      title: `Le niveau ${label} a déjà un plan`,
      message: `Le niveau ${label} contient déjà ${others.map(p => `« ${p.name} »`).join(', ')}. ` +
        `« ${planName} » y sera ajouté comme plan distinct et deviendra le plan affiché pour ce niveau.`,
      details: [
        "Rien n'est écrasé : les plans existants restent enregistrés et se rouvrent depuis le sélecteur de niveau ou « Ouvrir »."
      ],
      actions: [{ id: 'confirm', label: 'Continuer', icon: '✨', kind: 'primary' }],
      tone: 'warning'
    });
    return choice === 'confirm';
  }

  /** Rend un plan ouvert actif : sélection vidée, abonnement et image de fond du nouveau plan. */
  private activateProject(id: string) {
    const previous = this.ws.active;
    if (previous.id !== id) {
      this.ws.activate(id);
      // Plan vierge créé en changeant de niveau puis quitté sans modification : inutile de le garder.
      if (this.placeholderIds.has(previous.id) && !this.ws.isDirty(previous.id) && isEmptyProject(previous)) {
        this.discardProject(previous.id);
      }
    }
    this.ui.activeProjectChanged();
    this.syncActiveResources();
    // Plan resté ouvert en arrière-plan : le serveur en a peut-être reçu une version plus récente.
    const project = this.ws.active;
    const summary = this.ws.summary(id);
    if (summary && project.revision !== undefined && summary.revision > project.revision) {
      this.handleRemoteEvent({ project_id: id, revision: summary.revision });
    }
  }

  /** Abonnement aux modifications du plan actif et image de fond (chargement, activation, reconnexion). */
  private syncActiveResources() {
    this.background.sync(this.host.hass, this.ws.active);
    void this.subscribeActive();
  }

  /** Remplace un plan ouvert par la version du serveur : modifications locales et brouillon abandonnés. */
  private async reloadFromServer(id: string): Promise<boolean> {
    let fresh: HomeArchitectProject | null;
    try {
      fresh = await this.withBusy('Chargement du plan…', () => getProject(this.host.hass, id));
    } catch (err) {
      this.showError(`Impossible de recharger le plan : ${describeFailure(err)}`);
      return false;
    }
    if (!fresh) {
      this.projectDeleted(id, { remote: true });
      return false;
    }
    this.adoptServerVersion(fresh);
    return true;
  }

  private adoptServerVersion(fresh: HomeArchitectProject) {
    const id = fresh.id;
    this.ws.open(this.adoptLoaded(fresh));
    this.ws.upsertSummary(fresh);
    this.cancelDraft(id);
    void deleteDraft(id);
    this.clearProjectNotices(id);
    this.placeholderIds.delete(id);
    if (id === this.ws.activeId) {
      this.ui.activeProjectChanged();
      void this.subscribeActive();
    }
  }

  /** Ferme un plan sans le sauvegarder et oublie sa copie locale. */
  private discardProject(id: string) {
    if (id === this.ws.activeId) return;
    this.ws.close(id);
    this.cancelDraft(id);
    void deleteDraft(id);
    this.clearProjectNotices(id);
    this.placeholderIds.delete(id);
    this.pendingRemoteEvents.delete(id);
  }

  // --- Filigrane du niveau inférieur ---------------------------------------------------------------

  /** Plan affiché pour un niveau (ouvert, sinon version du serveur en cache) ; null s'il n'y en a pas. */
  ghostProject(level: string | null): HomeArchitectProject | null {
    const id = level ? this.ws.projectIdForLevel(level) : null;
    if (!id) return null;
    return this.ws.get(id) ?? this.ghostCache.get(id)?.project ?? null;
  }

  /** Charge (en lecture seule) le plan d'un niveau pour le filigrane s'il n'est pas ouvert ou a changé. */
  prefetchGhost(level: string | null) {
    const id = level ? this.ws.projectIdForLevel(level) : null;
    if (!id || this.ws.has(id) || this.ghostLoading.has(id) || !this.host.hass || !this.ready) return;
    const revision = this.ws.summary(id)?.revision ?? 0;
    if (this.ghostCache.get(id)?.revision === revision) return;
    this.ghostLoading.add(id);
    getProject(this.host.hass, id).then(
      project => {
        if (project) this.ghostCache.set(id, { revision, project });
        else this.ghostCache.delete(id);
      },
      err => console.warn(`[home-architect] Filigrane ${id} indisponible :`, err)
    ).finally(() => {
      this.ghostLoading.delete(id);
      this.host.requestUpdate();
    });
  }

  // --- Sauvegarde --------------------------------------------------------------------------------

  /** Sauvegarde successive de tous les plans modifiés (arrêt au premier échec à résoudre). */
  async saveAllDirty() {
    for (const id of this.ws.dirtyIds()) {
      if (!(await this.save(id))) return;
    }
  }

  /**
   * Modale « Sauvegarder » : l'identifiant du plan ne change jamais (seuls le nom et la catégorie) ;
   * « Enregistrer sous… » crée un nouveau plan (constat F3).
   */
  async saveFromDialog(detail: { name?: string; category?: string; saveAs?: boolean } | undefined) {
    if (this.readOnly) {
      this.notifyReadOnly();
      return;
    }
    if (!this.ready) return;
    const current = this.ws.active;
    const name = (detail?.name ?? '').trim() || current.name;
    const category = (detail?.category ?? '').trim() || current.category || DEFAULT_LEVEL;

    if (detail?.saveAs) {
      if (!(await this.confirmAdditionalPlan(category, name))) return;
      await this.saveAsCopy(current.id, name, category);
      return;
    }

    if (category !== current.category && !(await this.confirmAdditionalPlan(category, name, current.id))) return;
    const latest = this.ws.get(current.id);
    if (!latest) return;
    if (name !== latest.name || category !== latest.category) {
      this.ws.replace({ ...latest, name, category });
      this.ws.markDirty(latest.id);
      this.scheduleDraft(latest.id);
    }
    await this.save(latest.id);
  }

  /**
   * « Enregistrer sous » / « Enregistrer une copie » : nouveau plan (nouvel identifiant) qui reprend
   * le contenu et les modifications du plan source. Le plan source n'est pas modifié sur le serveur ;
   * il est refermé dans le studio, ses modifications non sauvegardées vivant désormais dans la copie.
   * L'image de fond du source est copiée par le serveur, qui renvoie le nouvel assetId.
   */
  private async saveAsCopy(sourceId: string, name: string, category: string | undefined): Promise<boolean> {
    const source = this.ws.get(sourceId);
    if (!source) return false;
    const now = new Date().toISOString();
    const copy: HomeArchitectProject = {
      ...cloneProject(source),
      id: generateProjectId(),
      name,
      category,
      created_at: now,
      updated_at: now
    };
    delete copy.revision;
    delete copy.publish;
    if (copy.category === undefined) delete copy.category;
    this.ws.open(copy, { dirty: true });
    if (this.ws.activeId === sourceId) this.activateProject(copy.id);
    this.discardProject(sourceId);
    return this.save(copy.id);
  }

  /**
   * Sauvegarde un plan ouvert avec contrôle de révision (constat F13). Une image de fond encore
   * embarquée en data-URL est d'abord téléversée (constat F1). Aucun succès n'est annoncé s'il n'a
   * pas eu lieu : en cas d'échec, une copie locale est écrite et un bandeau reste affiché.
   */
  async save(id: string, opts: { force?: boolean } = {}): Promise<boolean> {
    if (this.readOnly) {
      this.notifyReadOnly();
      return false;
    }
    if (!this.ready || this.savingIds.has(id) || !this.ws.has(id)) return false;
    this.setSaving(id, true);
    let failure: unknown = null;
    try {
      const project = await this.uploadPendingBackground(id);
      // Plan déjà enregistré : sa révision ; nouveau plan : rien (le serveur vérifie qu'il n'existe pas).
      const result = await saveProject(this.host.hass, project, { expectedRevision: project.revision, force: opts.force });
      this.applySaveResult(project, result);
    } catch (err) {
      failure = err;
    } finally {
      this.setSaving(id, false);
    }
    const pending = this.pendingRemoteEvents.get(id);
    if (pending) {
      this.pendingRemoteEvents.delete(id);
      this.handleRemoteEvent(pending);
    }
    return failure === null ? true : this.handleSaveError(id, failure);
  }

  /**
   * Téléverse l'image de fond encore embarquée en data-URL (ancien schéma, brouillon, import hors
   * ligne) et renvoie le plan à envoyer. Le remplacement est reporté sur la version courante du plan
   * (modifiable pendant le téléversement) et sur son historique.
   */
  private async uploadPendingBackground(id: string): Promise<HomeArchitectProject> {
    const project = this.ws.get(id);
    if (!project) throw new HaApiError('not_found', 'Plan fermé pendant la sauvegarde.');
    const dataUrl = project.background?.imageUrl;
    if (!isInlineDataUrl(dataUrl)) return project;
    const uploaded = await uploadInlineBackground(this.host.hass, project);
    if (!uploaded) return project;
    const swap = (p: HomeArchitectProject): HomeArchitectProject =>
      p.background && p.background.imageUrl === dataUrl
        ? { ...p, background: { ...p.background, imageUrl: '', assetId: uploaded.assetId, mimeType: uploaded.mimeType } }
        : p;
    this.ws.history.rewrite(id, swap);
    const latest = this.ws.get(id);
    if (!latest) throw new HaApiError('not_found', 'Plan fermé pendant la sauvegarde.');
    const next = swap(latest);
    if (next !== latest) this.ws.replace(next);
    return next;
  }

  private applySaveResult(saved: HomeArchitectProject, result: { revision: number; updated_at: string; assetId?: string }) {
    const id = saved.id;
    const current = this.ws.get(id);
    if (!current) return;
    let next: HomeArchitectProject = { ...current, revision: result.revision, updated_at: result.updated_at };
    // Asset retenu par le serveur (petite data-URL convertie, image adoptée par « Enregistrer sous ») :
    // reporté si le fond n'a pas changé pendant la sauvegarde, sans marquer le plan comme modifié.
    const savedBg = saved.background;
    const newAssetId = result.assetId;
    if (newAssetId && savedBg && savedBg.assetId !== newAssetId) {
      const adopt = (p: HomeArchitectProject): HomeArchitectProject =>
        p.background && p.background.assetId === savedBg.assetId && p.background.imageUrl === savedBg.imageUrl
          ? { ...p, background: { ...p.background, assetId: newAssetId, imageUrl: '' } }
          : p;
      next = adopt(next);
      this.ws.history.rewrite(id, adopt);
    }
    this.ws.replace(next);
    this.ws.upsertSummary(next);
    this.clearProjectNotices(id);
    this.placeholderIds.delete(id);
    if (current === saved) {
      this.ws.markClean(id);
      this.cancelDraft(id);
      void deleteDraft(id);
    }
    if (id === this.ws.activeId) void this.subscribeActive();
    this.ui.toast(`💾 Plan "${next.name}" (${getLevelLabel(next.category)}) sauvegardé dans Home Assistant !`);
  }

  private async handleSaveError(id: string, err: unknown): Promise<boolean> {
    const name = this.ws.get(id)?.name ?? id;
    if (err instanceof ConflictError) return this.resolveConflict(id, err);
    if (err instanceof BackgroundRejectedError ||
        (err instanceof HaApiError && err.code === 'invalid_project' && /background/i.test(err.message))) {
      return this.offerBackgroundRemoval(id, errorMessage(err));
    }
    if (err instanceof PermissionDeniedError) {
      this.enterReadOnly();
      return false;
    }
    if (err instanceof PayloadTooLargeError) {
      this.flushDraft(id);
      this.showError(`💾 « ${name} » n'a pas été sauvegardé : ${err.message} Réduisez l'image de fond ou le nombre d'éléments.`, `save:${id}`);
      return false;
    }
    if (err instanceof HaApiError && err.code === 'too_many_projects') {
      this.flushDraft(id);
      this.showError(`💾 « ${name} » n'a pas été sauvegardé : nombre maximal de plans atteint (100). Supprimez des plans inutilisés depuis « Ouvrir ».`, `save:${id}`);
      return false;
    }
    if (err instanceof HaApiError && !TRANSIENT_ERROR_CODES.has(err.code)) {
      // Plan refusé par le serveur (invalid_project…) : un nouvel essai à l'identique échouerait.
      this.flushDraft(id);
      this.showError(`💾 « ${name} » n'a pas été sauvegardé : ${err.message}`, `save:${id}`);
      return false;
    }
    // Coupure ou erreur du serveur : copie locale et bandeau persistant, jamais de faux succès.
    const reason = describeFailure(err);
    if (!this.ws.isDirty(id)) {
      this.showError(`💾 « ${name} » n'a pas été sauvegardé (${reason}).`, `save:${id}`);
      return false;
    }
    this.cancelDraft(id);
    if (await this.writeDraft(id)) {
      this.setNotice({
        key: `unsynced:${id}`,
        kind: 'warning',
        message: `💾 Copie locale non synchronisée : « ${name} » n'a pas pu être envoyé au serveur (${reason}). Vos modifications sont conservées dans ce navigateur.`,
        actions: [{ label: 'Réessayer', run: () => void this.save(id) }]
      });
    } else {
      this.showError(`💾 Échec de la sauvegarde de « ${name} » (${reason}) et copie locale impossible : ne fermez pas cette page.`, `save:${id}`);
    }
    return false;
  }

  /** Conflit de révision : recharger la version du serveur, l'écraser ou enregistrer une copie. */
  private async resolveConflict(id: string, err: ConflictError): Promise<boolean> {
    const project = this.ws.get(id);
    if (!project) return false;
    const deleted = err.serverRevision === 0;
    const serverRevision = err.serverRevision ?? '?';
    let message: string;
    if (deleted) message = "Ce plan n'existe plus sur le serveur : il a été supprimé depuis un autre appareil ou un autre onglet.";
    else if (project.revision === undefined) message = `Un plan portant le même identifiant existe déjà sur le serveur (révision ${serverRevision}).`;
    else message = `Ce plan a été modifié ailleurs depuis son ouverture (révision ${serverRevision} sur le serveur, votre version part de la révision ${project.revision}).`;

    const choice = await this.ask({
      icon: '⚠️',
      title: deleted ? 'Plan supprimé sur le serveur' : 'Conflit de modification',
      subtitle: `« ${project.name} »`,
      message,
      details: [
        ...(deleted ? [] : ['Recharger : affiche la version du serveur ; vos modifications locales sont abandonnées.']),
        deleted
          ? 'Recréer : enregistre votre version sous le même identifiant.'
          : 'Écraser : remplace la version du serveur par la vôtre ; les modifications faites ailleurs sont perdues.',
        'Enregistrer une copie : crée un nouveau plan avec votre version, sans toucher au serveur.'
      ],
      actions: [
        ...(deleted ? [] : [{ id: 'reload', label: 'Recharger', icon: '🔄', kind: 'secondary' as const }]),
        { id: 'copy', label: 'Enregistrer une copie', icon: '📄', kind: 'secondary' },
        { id: 'overwrite', label: deleted ? 'Recréer' : 'Écraser', icon: '⚠️', kind: 'danger' }
      ],
      tone: 'warning'
    });
    const latest = this.ws.get(id);
    if (!latest) return false;
    switch (choice) {
      case 'reload':
        await this.reloadFromServer(id);
        return false;
      case 'overwrite':
        return this.save(id, { force: true });
      case 'copy':
        return this.saveAsCopy(id, `${latest.name} (copie)`, latest.category);
      default:
        this.flushDraft(id);
        this.setNotice({
          key: `save:${id}`,
          kind: 'warning',
          message: `⚠️ « ${latest.name} » n'est pas sauvegardé : sa version entre en conflit avec celle du serveur. Vos modifications sont conservées dans ce navigateur.`,
          actions: [{ label: 'Résoudre…', run: () => void this.save(id) }]
        });
        return false;
    }
  }

  /** Image de fond refusée par le serveur : proposer de la retirer pour sauvegarder le reste du plan. */
  private async offerBackgroundRemoval(id: string, reason: string): Promise<boolean> {
    const project = this.ws.get(id);
    if (!project) return false;
    const choice = await this.ask({
      icon: '🖼️',
      title: 'Image de fond refusée',
      subtitle: `« ${project.name} »`,
      message: `L'image de fond de ce plan ne peut pas être enregistrée sur le serveur. ${reason}`,
      details: [
        'Retirer l\'image de fond permet de sauvegarder le reste du plan (murs, pièces, entités, meubles).',
        'Vous pourrez ensuite réimporter une image PNG, JPEG, WebP ou un SVG simple.'
      ],
      actions: [{ id: 'remove', label: 'Retirer l\'image et sauvegarder', icon: '🗑️', kind: 'danger' }],
      tone: 'warning'
    });
    const latest = this.ws.get(id);
    if (!latest) return false;
    if (choice !== 'remove') {
      this.flushDraft(id);
      this.showError(`💾 « ${latest.name} » n'a pas été sauvegardé : son image de fond est refusée par le serveur.`, `save:${id}`);
      return false;
    }
    if (latest.background) {
      this.ws.commit({ ...latest, background: undefined });
      this.scheduleDraft(id);
    }
    return this.save(id);
  }

  /** Sauvegarde refusée (non administrateur) : lecture seule, modifications conservées en brouillon. */
  private enterReadOnly() {
    this.permissionDenied = true;
    this.host.requestUpdate();
    for (const id of this.ws.dirtyIds()) this.flushDraft(id);
  }

  // --- Suppression et modifications venues d'ailleurs ------------------------------------------------

  /**
   * Plan supprimé (depuis la modale ou un autre appareil). S'il est affiché ou modifié, il reste
   * ouvert comme plan non sauvegardé : une sauvegarde le recréera (constat F16). Sinon il est fermé.
   */
  projectDeleted(id: string, opts: { remote: boolean }) {
    this.ws.removeSummary(id);
    this.ghostCache.delete(id);
    const project = this.ws.get(id);
    if (!project) return;
    if (id !== this.ws.activeId && !this.ws.isDirty(id)) {
      this.discardProject(id);
      return;
    }
    const next: HomeArchitectProject = { ...project };
    delete next.revision;
    delete next.publish;
    this.ws.replace(next);
    this.ws.markDirty(id);
    this.scheduleDraft(id);
    if (id === this.ws.activeId) this.unsubscribeActive();
    if (next.background?.assetId) void this.keepDeletedBackground(id, next.background.assetId);
    this.clearProjectNotices(id);
    this.setNotice({
      key: `deleted:${id}`,
      kind: 'warning',
      message: opts.remote
        ? `🗑️ « ${project.name} » a été supprimé depuis un autre appareil. Il reste ouvert ici comme plan non sauvegardé : sauvegardez-le pour le recréer.`
        : `🗑️ « ${project.name} » a été supprimé du serveur. Il reste ouvert comme plan non sauvegardé : sauvegardez-le pour le recréer, ou ouvrez un autre plan.`
    });
  }

  /**
   * L'image d'un plan supprimé n'existe plus sur le serveur : elle est récupérée depuis l'URL objet
   * encore affichée et conservée en data-URL, téléversée de nouveau à la prochaine sauvegarde.
   */
  private async keepDeletedBackground(id: string, assetId: string) {
    const objectUrl = this.background.objectUrlFor(assetId);
    let dataUrl: string | null = null;
    if (objectUrl) {
      try {
        dataUrl = await blobToDataUrl(await (await fetch(objectUrl)).blob());
      } catch {
        dataUrl = null;
      }
    }
    const detach = (p: HomeArchitectProject): HomeArchitectProject => {
      if (!p.background || p.background.assetId !== assetId) return p;
      if (!dataUrl) return { ...p, background: undefined };
      const background: BackgroundPlan = { ...p.background, imageUrl: dataUrl };
      delete background.assetId;
      return { ...p, background };
    };
    const latest = this.ws.get(id);
    if (!latest) return;
    this.ws.history.rewrite(id, detach);
    const next = detach(latest);
    if (next !== latest) this.ws.replace(next);
    if (!dataUrl) this.ui.toast('⚠️ L\'image de fond du plan supprimé n\'a pas pu être conservée.');
  }

  private async subscribeActive() {
    const project = this.ws.active;
    const id = project.id;
    if (!this.host.isConnected || !this.ready || this.subscribedProjectId === id) return;
    this.unsubscribeActive();
    // Plan jamais sauvegardé : rien à suivre côté serveur.
    if (project.revision === undefined || !this.host.hass?.connection) return;
    this.subscribedProjectId = id;
    const token = ++this.subscriptionToken;
    try {
      const unsubscribe = await subscribeProject(this.host.hass, id, ev => this.handleRemoteEvent(ev));
      if (token !== this.subscriptionToken) {
        unsubscribe();
        return;
      }
      this.unsubscribeProject = unsubscribe;
    } catch (err) {
      if (token === this.subscriptionToken) this.subscribedProjectId = null;
      console.debug(`[home-architect] Abonnement au plan ${id} impossible :`, err);
    }
  }

  private unsubscribeActive() {
    this.subscriptionToken++;
    this.unsubscribeProject?.();
    this.unsubscribeProject = null;
    this.subscribedProjectId = null;
  }

  /**
   * Événement de l'abonnement (sauvegarde ou suppression depuis un autre appareil, constat F13) :
   * plan non modifié localement -> rechargé ; modifié -> bandeau ; supprimé -> plan non sauvegardé.
   */
  private handleRemoteEvent(ev: RemoteEvent) {
    const id = ev.project_id;
    // Notre propre sauvegarde peut être annoncée avant sa réponse : traité une fois la révision connue.
    if (this.savingIds.has(id)) {
      this.pendingRemoteEvents.set(id, ev);
      return;
    }
    const project = this.ws.get(id);
    if (!project) return;
    if (ev.deleted) {
      this.projectDeleted(id, { remote: true });
      return;
    }
    if (project.revision === undefined || ev.revision <= project.revision) return;
    if (!this.ws.isDirty(id)) {
      void this.refreshFromServer(id, project);
      return;
    }
    this.setNotice({
      key: `remote:${id}`,
      kind: 'warning',
      message: `⚠️ « ${project.name} » a été modifié sur un autre appareil (révision ${ev.revision}). Vos modifications locales entreront en conflit à la sauvegarde.`,
      actions: [{ label: 'Recharger la version du serveur', run: () => void this.confirmReload(id) }]
    });
  }

  /** Mise à jour silencieuse d'un plan non modifié, abandonnée s'il a été modifié entre-temps. */
  private async refreshFromServer(id: string, expected: HomeArchitectProject) {
    let fresh: HomeArchitectProject | null;
    try {
      fresh = await getProject(this.host.hass, id);
    } catch (err) {
      console.warn(`[home-architect] Mise à jour du plan ${id} impossible :`, err);
      return;
    }
    if (this.ws.get(id) !== expected || this.ws.isDirty(id)) return;
    if (!fresh) {
      this.projectDeleted(id, { remote: true });
      return;
    }
    if (fresh.revision === expected.revision) return;
    this.adoptServerVersion(fresh);
    this.ui.toast(`🔄 Plan "${fresh.name}" mis à jour depuis un autre appareil.`);
  }

  private async confirmReload(id: string) {
    const project = this.ws.get(id);
    if (!project) return;
    if (this.ws.isDirty(id)) {
      const choice = await this.ask({
        icon: '🔄',
        title: 'Recharger la version du serveur ?',
        subtitle: `« ${project.name} »`,
        message: 'Vos modifications non sauvegardées de ce plan seront définitivement perdues.',
        actions: [{ id: 'reload', label: 'Recharger', icon: '🔄', kind: 'danger' }],
        tone: 'warning'
      });
      if (choice !== 'reload') return;
    }
    await this.reloadFromServer(id);
  }

  // --- Brouillons locaux (IndexedDB) -----------------------------------------------------------------

  /** Brouillon différé (~2 s après la dernière modification). */
  private scheduleDraft(id: string) {
    this.cancelDraft(id);
    this.draftTimers.set(id, setTimeout(() => {
      this.draftTimers.delete(id);
      void this.writeDraft(id);
    }, DRAFT_DEBOUNCE_MS));
  }

  private cancelDraft(id: string) {
    const timer = this.draftTimers.get(id);
    if (timer === undefined) return;
    clearTimeout(timer);
    this.draftTimers.delete(id);
  }

  /** Écrit sans attendre les brouillons en attente (navigation hors du panneau, onglet masqué…). */
  flushDrafts() {
    for (const id of [...this.draftTimers.keys()]) this.flushDraft(id);
  }

  private flushDraft(id: string) {
    this.cancelDraft(id);
    void this.writeDraft(id);
  }

  /** Brouillon d'un plan modifié, sur la révision serveur dont partent ses modifications. */
  private async writeDraft(id: string): Promise<boolean> {
    const project = this.ws.get(id);
    if (!project || !this.ws.isDirty(id)) return false;
    return saveDraft(project, project.revision ?? null);
  }

  /** Propose les brouillons laissés par une session précédente. */
  private async reviewLocalDrafts() {
    const reviews = reviewDrafts(await listDrafts(), this.ws.summaries);
    const pending = reviews.filter(r => !this.ws.isDirty(r.draft.projectId));
    this.setDraftReviews(this.readOnly ? null : pending);
  }

  private removeDraftReview(review: DraftReview) {
    this.setDraftReviews((this.draftReviews ?? []).filter(r => r !== review));
  }

  /** Rouvre un brouillon dans le studio (plan modifié, à sauvegarder). */
  private openDraft(review: DraftReview): string {
    const project = projectFromDraft(review);
    this.removeDraftReview(review);
    this.ws.open(project, { dirty: true });
    this.clearProjectNotices(project.id);
    this.placeholderIds.delete(project.id);
    this.activateProject(project.id);
    return project.id;
  }

  private async discardDraft(review: DraftReview) {
    const choice = await this.ask({
      icon: '🗑️',
      title: 'Supprimer la copie locale ?',
      subtitle: `« ${review.draft.project.name} »`,
      message: 'Les modifications enregistrées dans ce navigateur pour ce plan seront définitivement perdues.',
      actions: [{ id: 'discard', label: 'Supprimer', icon: '🗑️', kind: 'danger' }],
      tone: 'danger'
    });
    if (choice !== 'discard') return;
    await deleteDraft(review.draft.projectId);
    this.removeDraftReview(review);
  }

  // --- Image de fond -------------------------------------------------------------------------------

  /** Image brute (collée, déposée) : SVG sans DOCTYPE ou raster recompressé, puis téléversement. */
  async prepareAndUploadBackground(projectId: string, source: string | Blob): Promise<BackgroundPlan | null> {
    let prepared: { blob: Blob; width?: number; height?: number };
    let size: { width: number; height: number };
    try {
      prepared = await prepareBackgroundBlob(typeof source === 'string' ? dataUrlToBlob(source) : source);
      size = prepared.width && prepared.height
        ? { width: prepared.width, height: prepared.height }
        : await readImageSize(prepared.blob);
    } catch (err) {
      this.showError(err instanceof BackgroundRejectedError ? err.message : `Image de fond illisible : ${errorMessage(err)}`);
      return null;
    }
    return this.uploadNewBackground(projectId, prepared.blob, { widthPx: size.width, heightPx: size.height, opacity: 0.40 });
  }

  /** Image fournie par la modale d'import, déjà compressée (un SVG est seulement débarrassé de son DOCTYPE). */
  async uploadImportedBackground(projectId: string, imported: ImportedBackground, opacity: number): Promise<BackgroundPlan | null> {
    let blob = imported.blob;
    if (imported.isSvg) {
      try {
        blob = await svgWithoutDoctype(blob);
      } catch (err) {
        this.showError(`Image de fond illisible : ${errorMessage(err)}`);
        return null;
      }
    }
    return this.uploadNewBackground(projectId, blob, { widthPx: imported.widthPx, heightPx: imported.heightPx, opacity });
  }

  /**
   * Téléverse une nouvelle image de fond pour `projectId` et renvoie le fond à enregistrer dans le
   * plan (référence assetId), ou null en cas d'échec déjà signalé. Après une erreur passagère
   * (hors ligne…), l'image reste dans le plan en data-URL et sera téléversée à la prochaine sauvegarde.
   */
  private async uploadNewBackground(
    projectId: string,
    blob: Blob,
    layout: { widthPx: number; heightPx: number; opacity: number }
  ): Promise<BackgroundPlan | null> {
    const base: BackgroundPlan = {
      imageUrl: '',
      opacity: layout.opacity,
      visible: true,
      offset: { x: 0, y: 0 },
      scale: 1.0,
      rotation: 0,
      widthPx: layout.widthPx,
      heightPx: layout.heightPx
    };
    try {
      const res = await uploadPreparedBackground(this.host.hass, projectId, blob);
      return { ...base, assetId: res.assetId, mimeType: res.mimeType };
    } catch (err) {
      if (err instanceof BackgroundRejectedError) {
        this.showError(err.message);
        return null;
      }
      if (err instanceof PermissionDeniedError) {
        this.enterReadOnly();
        return null;
      }
      try {
        const dataUrl = await blobToDataUrl(blob);
        // Bandeau propre au plan : retiré après la sauvegarde qui téléversera l'image.
        this.setNotice({
          key: `background:${projectId}`,
          kind: 'warning',
          message: `⚠️ Image de fond non téléversée (${describeFailure(err)}) : elle est gardée dans le plan et sera envoyée au serveur à la prochaine sauvegarde.`
        });
        return { ...base, imageUrl: dataUrl, ...(blob.type ? { mimeType: blob.type } : {}) };
      } catch {
        this.showError(`Téléversement de l'image de fond impossible : ${errorMessage(err)}`);
        return null;
      }
    }
  }

  // --- Dialogues, attente et bandeaux ----------------------------------------------------------------

  /** Ouvre le dialogue de choix et résout l'action choisie (null : fermé sans choisir). */
  ask(dialog: ChoiceDialogOptions): Promise<string | null> {
    this.resolveChoice(null);
    return new Promise(resolve => {
      this.choiceDialog = dialog;
      this.choiceResolve = resolve;
      this.host.requestUpdate();
    });
  }

  private resolveChoice(id: string | null) {
    const resolve = this.choiceResolve;
    if (!resolve && !this.choiceDialog) return;
    this.choiceResolve = null;
    this.choiceDialog = null;
    this.host.requestUpdate();
    resolve?.(id);
  }

  /** Exécute une opération en affichant un écran d'attente bloquant. */
  async withBusy<T>(message: string, task: () => Promise<T>): Promise<T> {
    const previous = this.busyMessage;
    this.busyMessage = message;
    this.host.requestUpdate();
    try {
      return await task();
    } finally {
      this.busyMessage = previous;
      this.host.requestUpdate();
    }
  }

  private setNotice(notice: PanelNotice) {
    this.notices = [...this.notices.filter(n => n.key !== notice.key), notice];
    this.host.requestUpdate();
  }

  private dismissNotice(key: string) {
    if (!this.notices.some(n => n.key === key)) return;
    this.notices = this.notices.filter(n => n.key !== key);
    this.host.requestUpdate();
  }

  /** Retire les bandeaux propres à un plan (clés `<nature>:<id>`). */
  private clearProjectNotices(id: string) {
    const suffix = `:${id}`;
    if (!this.notices.some(n => n.key.endsWith(suffix))) return;
    this.notices = this.notices.filter(n => !n.key.endsWith(suffix));
    this.host.requestUpdate();
  }

  showError(message: string, key: string = 'error') {
    this.setNotice({ key, kind: 'error', message });
  }

  /** Bandeaux : lecture seule, bandeaux fournis par le panneau (`extra`), puis événements de persistance. */
  renderBanners(extra: PanelNotice[] = []): TemplateResult | typeof nothing {
    const banners: PanelNotice[] = [];
    if (this.host.hass && this.readOnly) {
      banners.push({
        key: 'read-only',
        kind: 'info',
        dismissible: false,
        message: this.permissionDenied
          ? '🔒 Lecture seule : le serveur a refusé la sauvegarde (action réservée aux administrateurs). Vos modifications non sauvegardées sont conservées dans ce navigateur.'
          : '🔒 Lecture seule : seuls les administrateurs de Home Assistant peuvent modifier et sauvegarder les plans.'
      });
    }
    return renderNotices([...banners, ...extra, ...this.notices], key => this.dismissNotice(key));
  }

  /** Écran de chargement / d'erreur / d'attente, brouillons à restaurer et dialogue de choix. */
  renderOverlays(): TemplateResult[] {
    const layers: TemplateResult[] = [];
    if (this.loadStateValue === 'error') layers.push(renderLoadError(this.loadError, () => void this.loadInitial()));
    else if (!this.ready) layers.push(renderLoadingOverlay('Chargement des plans…'));
    else if (this.busyMessage !== null) layers.push(renderLoadingOverlay(this.busyMessage));

    if (this.draftReviews && this.ready) {
      layers.push(renderDraftsDialog(this.draftReviews, {
        onOpen: review => {
          this.openDraft(review);
          this.ui.toast('📂 Copie locale ouverte : sauvegardez-la pour l\'envoyer au serveur.');
        },
        onSend: review => void this.save(this.openDraft(review)),
        onDiscard: review => void this.discardDraft(review),
        onClose: () => this.setDraftReviews(null)
      }));
    }
    if (this.choiceDialog) layers.push(renderChoiceDialog(this.choiceDialog, id => this.resolveChoice(id)));
    return layers;
  }
}
