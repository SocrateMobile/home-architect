/**
 * Accessibilité clavier du studio (constat F159) : dialogues modaux (focus initial, piège de focus,
 * retour du focus à l'élément déclencheur) et menus déroulants (flèches, Début/Fin, Échap, Tab).
 * La fermeture par Échap des dialogues reste gérée par le panneau (handleKeyDown).
 */
import { ReactiveController, ReactiveControllerHost } from 'lit';

const FOCUSABLE = [
  'a[href]', 'button:not([disabled])', 'input:not([disabled]):not([type="hidden"])', 'select:not([disabled])',
  'textarea:not([disabled])', '[tabindex]:not([tabindex="-1"])'
].join(', ');

/** Élément qui a réellement le focus, en traversant les shadow roots ouvertes. */
export function deepActiveElement(): HTMLElement | null {
  let active: Element | null = document.activeElement;
  while (active?.shadowRoot?.activeElement) active = active.shadowRoot.activeElement;
  return active instanceof HTMLElement ? active : null;
}

/** Éléments atteignables avec Tab dans `container`, dans l'ordre du document (éléments masqués exclus). */
export function focusableElements(container: ParentNode): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE))
    .filter(el => el.getClientRects().length > 0 && !el.closest('[inert]'));
}

/** Vrai si `node` est `container` ou l'un de ses descendants (shadow DOM des éléments enfants compris). */
function containsDeep(container: Element, node: Node | null): boolean {
  let current: Node | null = node;
  while (current) {
    if (current === container) return true;
    current = current.parentNode ?? (current instanceof ShadowRoot ? current.host : null);
  }
  return false;
}

/** Donne le focus à l'élément marqué `data-initial-focus` du dialogue, sinon au premier élément focalisable, sinon au dialogue. */
export function focusInitial(dialog: HTMLElement): void {
  const target = dialog.querySelector<HTMLElement>('[data-initial-focus]') ?? focusableElements(dialog)[0];
  if (target) {
    target.focus({ preventScroll: true });
    if (target instanceof HTMLInputElement && target.type === 'text') target.select();
    return;
  }
  if (!dialog.hasAttribute('tabindex')) dialog.setAttribute('tabindex', '-1');
  dialog.focus({ preventScroll: true });
}

interface OpenModal {
  el: HTMLElement;
  /** Élément qui avait le focus à l'ouverture (rendu le focus à la fermeture). */
  returnTo: HTMLElement | null;
}

/**
 * Suit les modales du panneau, repérées par l'attribut `data-modal` dans son rendu :
 * - dialogue du panneau (role=dialog / alertdialog) : focus initial et piège de focus (Tab, Maj+Tab,
 *   focus revenu dans le dialogue s'il en sort) ;
 * - modale d'un composant enfant (import, assistant…) : elle gère son propre focus ; seul le retour
 *   du focus à la fermeture est assuré ici ;
 * - à la fermeture d'une modale, le focus revient à l'élément qui l'avait à l'ouverture (bouton du
 *   menu, de la barre…), si le focus a été perdu entre-temps.
 * Les dialogues du panneau portent tabindex="-1" : un clic sur leur contenu non focalisable leur
 * donne le focus (et non à l'hôte du panneau, ce qui ramènerait le focus sur le premier contrôle).
 */
export class ModalFocusController implements ReactiveController {
  private open: OpenModal[] = [];

  private readonly onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab' || e.defaultPrevented) return;
    const dialog = this.topLocalDialog();
    if (!dialog) return;
    const items = focusableElements(dialog);
    if (items.length === 0) {
      e.preventDefault();
      return;
    }
    const active = deepActiveElement();
    const first = items[0];
    const last = items[items.length - 1];
    if (!active || !containsDeep(dialog, active)) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  private readonly onFocusIn = (e: FocusEvent) => {
    const dialog = this.topLocalDialog();
    if (!dialog) return;
    const target = e.composedPath()[0];
    if (target instanceof Node && !containsDeep(dialog, target)) focusInitial(dialog);
  };

  constructor(private readonly host: ReactiveControllerHost & HTMLElement) {
    host.addController(this);
  }

  hostConnected(): void {
    this.host.addEventListener('keydown', this.onKeyDown);
    this.host.addEventListener('focusin', this.onFocusIn);
  }

  hostDisconnected(): void {
    this.host.removeEventListener('keydown', this.onKeyDown);
    this.host.removeEventListener('focusin', this.onFocusIn);
    this.open = [];
  }

  hostUpdated(): void {
    const root = this.host.shadowRoot;
    if (!root) return;
    const current = Array.from(root.querySelectorAll<HTMLElement>('[data-modal]'));
    const closed = this.open.filter(m => !current.includes(m.el));
    const kept = this.open.filter(m => current.includes(m.el));
    // Dialogue remplacé par un autre dans le même rendu (« À propos » -> « Mise à jour ») : l'élément
    // qui avait le focus a disparu avec le premier, sa destination de retour est transmise au second.
    const inherited = closed.length > 0 ? closed[0].returnTo : null;

    const opened: OpenModal[] = [];
    for (const el of current) {
      if (kept.some(m => m.el === el)) continue;
      const active = deepActiveElement();
      const usable = active !== null && active.isConnected && active !== document.body && !containsDeep(el, active);
      opened.push({ el, returnTo: usable ? active : inherited });
    }
    this.open = [...kept, ...opened];

    const top = this.open[this.open.length - 1];
    if (opened.length > 0 && top && isLocalDialog(top.el)) {
      focusInitial(top.el);
    } else if (closed.length > 0 && this.focusLost()) {
      // Retour à l'élément déclencheur s'il est encore là et, si une modale reste ouverte, s'il en fait
      // partie (ex. bouton de la modale d'export qui a provoqué un dialogue de conflit) ; sinon dans cette modale.
      if (inherited?.isConnected && (!top || containsDeep(top.el, inherited))) {
        inherited.focus({ preventScroll: true });
      } else if (top && isLocalDialog(top.el)) {
        focusInitial(top.el);
      }
    }
  }

  /** Dialogue du panneau au premier plan (une modale d'un composant enfant au-dessus n'en est pas un). */
  private topLocalDialog(): HTMLElement | null {
    const top = this.open[this.open.length - 1];
    return top && top.el.isConnected && isLocalDialog(top.el) ? top.el : null;
  }

  /** Le focus n'est plus sur un élément utile (élément retiré du DOM, page, hôte du panneau). */
  private focusLost(): boolean {
    const active = deepActiveElement();
    return !active || !active.isConnected || active === document.body || active === this.host;
  }
}

function isLocalDialog(el: HTMLElement): boolean {
  const role = el.getAttribute('role');
  return role === 'dialog' || role === 'alertdialog';
}

// --- Menus déroulants -----------------------------------------------------------------------------

/** Éléments de menu actifs (désactivés exclus), dans l'ordre. */
function menuItems(menu: HTMLElement): HTMLElement[] {
  return Array.from(menu.querySelectorAll<HTMLElement>('[role^="menuitem"]:not([disabled])'));
}

/** Donne le focus au premier (ou dernier) élément du menu ; l'élément actif (aria-checked) d'abord s'il est demandé. */
export function focusMenuItem(menu: HTMLElement, which: 'first' | 'last' | 'checked'): void {
  const items = menuItems(menu);
  const target = which === 'last'
    ? items[items.length - 1]
    : (which === 'checked' ? items.find(i => i.getAttribute('aria-checked') === 'true') : undefined) ?? items[0];
  target?.focus();
}

/**
 * Clavier dans un menu ouvert : flèches haut/bas (circulaires), Début/Fin, Échap (ferme et rend le
 * focus au bouton du menu), Tab (ferme le menu, le focus suit l'ordre normal depuis le bouton).
 * Entrée et Espace activent l'élément (boutons natifs).
 */
export function handleMenuKeydown(e: KeyboardEvent, menu: HTMLElement, close: (opts: { restoreFocus: boolean }) => void): void {
  const items = menuItems(menu);
  const index = items.indexOf(deepActiveElement() as HTMLElement);
  let next: HTMLElement | undefined;
  switch (e.key) {
    case 'ArrowDown':
      // Focus hors des éléments (index -1) : le premier.
      next = items[(index + 1) % items.length];
      break;
    case 'ArrowUp':
      // Focus hors des éléments (index -1) : le dernier, et non l'avant-dernier.
      next = items[index < 0 ? items.length - 1 : (index - 1 + items.length) % items.length];
      break;
    case 'Home':
      next = items[0];
      break;
    case 'End':
      next = items[items.length - 1];
      break;
    case 'Escape':
      e.preventDefault();
      close({ restoreFocus: true });
      return;
    case 'Tab':
      close({ restoreFocus: true });
      return;
    default:
      return;
  }
  e.preventDefault();
  next?.focus();
}
