/**
 * Gardes pour les raccourcis clavier globaux.
 *
 * Un écouteur `keydown` posé sur window voit `e.target` recalculé (retargeting du Shadow DOM)
 * sur l'hôte le plus externe (<home-assistant>) : la vraie cible n'est accessible que via
 * `composedPath()`. Ces fonctions s'appuient donc toujours sur le chemin composé.
 */

/** Balises natives dans lesquelles l'utilisateur saisit ou choisit une valeur. */
const EDITABLE_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

/** Composants de saisie Home Assistant / Material (utile si leur Shadow DOM est fermé). */
const EDITABLE_CUSTOM_TAGS = new Set([
  'ha-textfield',
  'ha-textarea',
  'ha-code-editor',
  'ha-combo-box',
  'ha-select',
  'ha-search-input',
  'ha-entity-picker',
  'ha-icon-picker',
  'mwc-textfield',
  'mwc-textarea',
  'mwc-select',
  'md-filled-text-field',
  'md-outlined-text-field',
  'vaadin-combo-box-light',
]);

/** Rôles ARIA d'éléments qui consomment les touches de saisie. */
const EDITABLE_ROLES = new Set(['textbox', 'searchbox', 'combobox', 'spinbutton']);

function eventPath(e: Event): EventTarget[] {
  return typeof e.composedPath === 'function' ? e.composedPath() : [];
}

function isEditableElement(node: EventTarget): boolean {
  const el = node as HTMLElement;
  if (typeof el.tagName !== 'string') return false;
  if (EDITABLE_TAGS.has(el.tagName.toUpperCase())) return true;
  if (EDITABLE_CUSTOM_TAGS.has(el.tagName.toLowerCase())) return true;
  if (el.isContentEditable) return true;
  const role = typeof el.getAttribute === 'function' ? el.getAttribute('role') : null;
  return role !== null && EDITABLE_ROLES.has(role.toLowerCase());
}

function isHostVisible(host: Element): boolean {
  if (!host.isConnected) return false;
  const el = host as Element & { checkVisibility?: () => boolean };
  if (typeof el.checkVisibility === 'function') return el.checkVisibility();
  return host.getClientRects().length > 0;
}

/** Vraie cible d'un événement, à travers les Shadow DOM : `composedPath()[0]`, sinon `e.target`. */
export function getEventTarget(e: Event): EventTarget | null {
  const path = eventPath(e);
  return path.length > 0 ? path[0] : e.target;
}

/** Vrai si l'événement provient d'un champ de saisie (input, textarea, select, contenteditable, ha-textfield…). */
export function isEditableTarget(e: Event): boolean {
  const path = eventPath(e);
  if (path.length === 0) return e.target !== null && isEditableElement(e.target);
  return path.some(isEditableElement);
}

/** Vrai si l'élément `host` se trouve sur le chemin composé de l'événement. */
export function isEventFromHost(e: Event, host: Element): boolean {
  return eventPath(e).includes(host);
}

/**
 * Vrai si une touche de commande (Ctrl, Cmd/Meta ou Alt) est enfoncée.
 * Sert à ignorer les raccourcis à une touche (« r », « v », Suppr…) combinés à un modificateur
 * (Ctrl+R recharge la page, Alt+lettre saisit un caractère spécial sur macOS).
 */
export function hasCommandModifier(e: KeyboardEvent): boolean {
  return e.ctrlKey || e.metaKey || e.altKey;
}

/**
 * Vrai pour un raccourci Ctrl (Windows/Linux) ou Cmd (macOS) sans Alt : Ctrl+Z, Cmd+S…
 * Alt est exclu car AltGr (Ctrl+Alt sous Windows) sert à saisir des caractères (@, #, €…).
 */
export function hasPrimaryModifier(e: KeyboardEvent): boolean {
  return (e.ctrlKey || e.metaKey) && !e.altKey;
}

/** Options de `shouldHandleShortcut`. */
export interface ShortcutGuardOptions {
  /** Élément propriétaire des raccourcis (panneau ou canevas). */
  host: Element;
  /** Traiter quand même le raccourci si une modale est ouverte (ex. Échap). */
  allowWhenModalOpen?: boolean;
  /** Une modale du panneau est-elle ouverte ? */
  modalOpen?: boolean;
}

/**
 * Décide si un raccourci clavier global doit être traité.
 * Renvoie false si la cible est éditable, si une modale est ouverte (sauf `allowWhenModalOpen`),
 * ou si l'événement ne vient ni de l'hôte ni du body/document (focus ailleurs dans HA :
 * dialogues, Assist, recherche). Un événement ciblant body/documentElement (aucun focus)
 * n'est accepté que si l'hôte est connecté et visible.
 */
export function shouldHandleShortcut(e: KeyboardEvent, opts: ShortcutGuardOptions): boolean {
  if (isEditableTarget(e)) return false;
  if (opts.modalOpen && !opts.allowWhenModalOpen) return false;
  if (isEventFromHost(e, opts.host)) return true;

  const target = getEventTarget(e);
  const doc = opts.host.ownerDocument;
  const nothingFocused = target !== null && (target === doc.body || target === doc.documentElement);
  return nothingFocused && isHostVisible(opts.host);
}
