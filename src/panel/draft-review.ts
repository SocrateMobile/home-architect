/**
 * Brouillons locaux à proposer au chargement du studio (constats F2 et F12).
 *
 * Un brouillon (IndexedDB) n'existe que tant que les modifications d'un plan ne sont pas
 * sauvegardées : il est supprimé après chaque sauvegarde réussie. Au démarrage, et à l'ouverture
 * d'un plan, chaque brouillon est comparé à la version du serveur pour proposer de le restaurer
 * ou de l'envoyer.
 */
import { Draft } from '../core/drafts';
import { ProjectSummary } from '../core/ha-api';
import { HomeArchitectProject, PublishInfo } from '../core/types';
import { localize } from '../i18n';
import '../i18n/locales/panel';

/**
 * - `unsaved` : plan jamais sauvegardé ;
 * - `newer` : modifications locales faites sur la version actuelle du serveur ;
 * - `outdated` : le serveur a changé depuis (ou ancienne copie locale) : conflit possible ;
 * - `deleted` : le plan n'existe plus sur le serveur.
 *
 * Aucun brouillon n'est écarté d'après sa date : toute sauvegarde réussie incrémente la révision
 * puis supprime le brouillon, donc un brouillon basé sur la révision actuelle contient forcément des
 * modifications jamais sauvegardées. Comparer l'heure du navigateur à celle du serveur (horloges
 * décalées) pourrait faire disparaître ce travail sans prévenir.
 */
export type DraftStatus = 'unsaved' | 'newer' | 'outdated' | 'deleted';

export interface DraftReview {
  draft: Draft;
  status: DraftStatus;
  /** Révision actuelle du serveur, null si le plan n'y existe pas. */
  serverRevision: number | null;
  /** Publication actuelle du plan sur le serveur (champ serveur, jamais repris du brouillon). */
  serverPublish?: PublishInfo;
}

/** État du plan sur le serveur au moment de la comparaison (null : absent du serveur). */
export interface ServerState {
  revision: number;
  publish?: PublishInfo | null;
}

/** Libellé traduit de l'état d'un brouillon (dialogue des copies locales, constat F110). */
export function draftStatusLabel(status: DraftStatus): string {
  return localize(`panel.drafts.status.${status}`);
}

/** Classe un brouillon par rapport à la version du serveur. */
export function reviewDraft(draft: Draft, server: ServerState | null): DraftReview {
  if (!server) {
    return { draft, status: draft.baseRevision === null ? 'unsaved' : 'deleted', serverRevision: null };
  }
  const review: DraftReview = {
    draft,
    status: draft.baseRevision === server.revision ? 'newer' : 'outdated',
    serverRevision: server.revision,
  };
  if (server.publish) review.serverPublish = server.publish;
  return review;
}

/** Classe chaque brouillon par rapport à la liste du serveur. */
export function reviewDrafts(drafts: Draft[], summaries: readonly ProjectSummary[]): DraftReview[] {
  return drafts.map(draft => reviewDraft(draft, summaries.find(s => s.id === draft.projectId) ?? null));
}

/**
 * Projet à rouvrir depuis un brouillon. Sa révision est celle sur laquelle il a été commencé :
 * la sauvegarde signalera un conflit si le serveur a changé depuis. Une ancienne copie locale
 * (révision inconnue) est traitée comme un nouveau plan, ce qui provoque aussi un conflit si
 * l'identifiant existe déjà sur le serveur. La publication, possédée par le serveur, est celle
 * du serveur (la copie du brouillon peut être périmée).
 */
export function projectFromDraft(review: DraftReview): HomeArchitectProject {
  const project: HomeArchitectProject = { ...review.draft.project };
  delete project.publish;
  if (review.serverPublish) project.publish = review.serverPublish;
  if (review.draft.baseRevision === null) delete project.revision;
  else project.revision = review.draft.baseRevision;
  return project;
}
