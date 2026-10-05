/**
 * Brouillons locaux des projets (IndexedDB : base `home_architect`, magasin `drafts`, clé = projectId).
 *
 * Remplace les copies de projets dans localStorage (quota de quelques Mo partagé avec toute
 * l'interface HA). Toutes les fonctions résolvent sans lever si IndexedDB est indisponible
 * (navigation privée, application compagnon, stockage bloqué).
 */
import { HomeArchitectProject } from './types';
import { PROJECT_ID_PATTERN, normalizeProject } from './project-model';

/** Brouillon d'un projet non synchronisé avec le serveur. */
export interface Draft {
  projectId: string;
  project: HomeArchitectProject;
  /** Date ISO de l'enregistrement local. */
  savedAt: string;
  /** Révision serveur sur laquelle le brouillon a été commencé (null : projet jamais sauvegardé). */
  baseRevision: number | null;
}

const DB_NAME = 'home_architect';
const DB_VERSION = 1;
const STORE = 'drafts';
const OPEN_TIMEOUT_MS = 3000;

let dbPromise: Promise<IDBDatabase | null> | null = null;

function openDb(): Promise<IDBDatabase | null> {
  if (dbPromise) return dbPromise;
  const opening = new Promise<IDBDatabase | null>(resolve => {
    let settled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const finish = (db: IDBDatabase | null) => {
      if (settled) {
        db?.close(); // ouverture arrivée après le délai : la connexion n'est plus attendue
        return;
      }
      settled = true;
      clearTimeout(timer);
      resolve(db);
    };
    try {
      if (typeof indexedDB === 'undefined' || !indexedDB) {
        finish(null);
        return;
      }
      // Certains WebKit ne déclenchent jamais success/error : on n'attend pas indéfiniment.
      timer = setTimeout(() => finish(null), OPEN_TIMEOUT_MS);
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'projectId' });
      };
      request.onsuccess = () => {
        const db = request.result;
        // Une autre page ouvre une version plus récente, ou le stockage est purgé : on rouvrira au prochain appel.
        db.onversionchange = () => {
          db.close();
          if (dbPromise === opening) dbPromise = null;
        };
        db.onclose = () => {
          if (dbPromise === opening) dbPromise = null;
        };
        finish(db);
      };
      request.onerror = () => finish(null);
    } catch {
      finish(null);
    }
  });
  dbPromise = opening;
  // Échec d'ouverture : autoriser un nouvel essai lors d'un prochain appel.
  void opening.then(db => {
    if (!db && dbPromise === opening) dbPromise = null;
  });
  return opening;
}

/** Exécute une requête dans une transaction ; résout `fallback` en cas d'indisponibilité ou d'erreur. */
async function run<T>(
  mode: IDBTransactionMode,
  makeRequest: (store: IDBObjectStore) => IDBRequest,
  onSuccess: (result: unknown) => T,
  fallback: T
): Promise<T> {
  const pending = openDb();
  const db = await pending;
  if (!db) return fallback;
  return new Promise<T>(resolve => {
    try {
      let tx: IDBTransaction;
      try {
        tx = db.transaction(STORE, mode);
      } catch (err) {
        // Connexion fermée par le navigateur (stockage purgé…) sans événement close : on rouvrira au prochain appel.
        if (dbPromise === pending) dbPromise = null;
        throw err;
      }
      const request = makeRequest(tx.objectStore(STORE));
      let value = fallback;
      request.onsuccess = () => {
        value = onSuccess(request.result);
      };
      tx.oncomplete = () => resolve(value);
      tx.onerror = () => resolve(fallback);
      tx.onabort = () => resolve(fallback);
    } catch {
      resolve(fallback);
    }
  });
}

function toDraft(raw: unknown): Draft | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.projectId !== 'string' || !PROJECT_ID_PATTERN.test(r.projectId)) return null;
  if (typeof r.project !== 'object' || r.project === null) return null;
  const project = normalizeProject({ ...(r.project as Record<string, unknown>), id: r.projectId });
  const base = r.baseRevision;
  return {
    projectId: r.projectId,
    project,
    savedAt: typeof r.savedAt === 'string' ? r.savedAt : new Date(0).toISOString(),
    baseRevision: typeof base === 'number' && Number.isInteger(base) && base >= 0 ? base : null,
  };
}

/**
 * Enregistre (ou remplace) le brouillon d'un projet.
 * Résout true si le brouillon est bien écrit, false sinon (IndexedDB indisponible, quota dépassé…).
 */
export function saveDraft(project: HomeArchitectProject, baseRevision: number | null): Promise<boolean> {
  // Un id invalide serait écarté à la relecture (toDraft) : le brouillon serait perdu sans le savoir.
  if (!project || typeof project.id !== 'string' || !PROJECT_ID_PATTERN.test(project.id)) return Promise.resolve(false);
  let record: Draft;
  try {
    // Copie JSON : garantit un objet clonable par IndexedDB (aucun proxy ni champ runtime non sérialisable).
    record = {
      projectId: project.id,
      project: JSON.parse(JSON.stringify(project)) as HomeArchitectProject,
      savedAt: new Date().toISOString(),
      baseRevision: typeof baseRevision === 'number' && Number.isInteger(baseRevision) && baseRevision >= 0 ? baseRevision : null,
    };
  } catch {
    return Promise.resolve(false);
  }
  return run('readwrite', store => store.put(record), () => true, false);
}

/** Charge le brouillon d'un projet (projet normalisé), ou null s'il n'existe pas. */
export function loadDraft(projectId: string): Promise<Draft | null> {
  return run('readonly', store => store.get(projectId), toDraft, null);
}

/** Supprime le brouillon d'un projet (sans effet s'il n'existe pas). */
export function deleteDraft(projectId: string): Promise<void> {
  return run('readwrite', store => store.delete(projectId), () => undefined, undefined);
}

/** Liste tous les brouillons, du plus récent au plus ancien. */
export function listDrafts(): Promise<Draft[]> {
  return run(
    'readonly',
    store => store.getAll(),
    result => (Array.isArray(result) ? result : [])
      .map(toDraft)
      .filter((d): d is Draft => d !== null)
      .sort((a, b) => b.savedAt.localeCompare(a.savedAt)),
    [] as Draft[]
  );
}
