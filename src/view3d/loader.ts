/**
 * Chargement à la demande de la vue 3D WebGL. Ce module est importé statiquement par le canevas (bundle
 * carte) : il ne doit importer ni three ni la vue elle-même, seulement la charger par import() — le
 * moteur 3D reste dans son propre chunk (`chunks/view3d-*.js`, vérifié par check-bundle.mjs).
 */

export const WEBGL_UNAVAILABLE = 'Vue 3D simplifiée : WebGL est indisponible sur cet appareil.';
const VIEW3D_LOAD_FAILED = 'Vue 3D simplifiée : le moteur 3D n\'a pas pu être chargé.';

let loading: Promise<void> | null = null;
let loaded = false;
/** Raison pour laquelle la vue WebGL n'est pas utilisable dans cette page (WebGL absent ou en échec : définitive). */
let failure: string | null = null;

/** Vrai si un contexte WebGL peut être créé (contexte de test libéré aussitôt). */
function webglAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    if (!gl) return false;
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/** La vue WebGL est définie et utilisable sans attente. */
export function isView3DReady(): boolean {
  return loaded && failure === null;
}

/** La vue a échoué à l'exécution (création du contexte) : la 3D simplifiée est utilisée pour la suite. */
export function markView3DFailed(reason: string): void {
  failure = reason;
}

/**
 * Charge le chunk de la vue 3D (une seule fois) ; rejette avec la raison si la vue n'est pas utilisable.
 * Un échec de téléchargement (réseau) n'est pas définitif : le prochain passage en 3D réessaie.
 */
export function loadView3D(): Promise<void> {
  if (failure !== null) return Promise.reject(new Error(failure));
  if (loading) return loading;
  if (!webglAvailable()) {
    failure = WEBGL_UNAVAILABLE;
    return Promise.reject(new Error(failure));
  }
  loading = import('./view3d-element').then(
    () => {
      loaded = true;
    },
    (err: unknown) => {
      console.warn('[home-architect] Chargement de la vue 3D impossible :', err);
      loading = null;
      throw new Error(VIEW3D_LOAD_FAILED);
    }
  );
  return loading;
}
