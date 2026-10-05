import { afterEach, describe, expect, it } from 'vitest';
import {
  getEventTarget, hasCommandModifier, hasPrimaryModifier, isEditableTarget, isEventFromHost, shouldHandleShortcut
} from '../../src/core/keyboard';

/** Crée un KeyboardEvent dont composedPath() renvoie le chemin donné (comme vu depuis window). */
function keyEvent(path: EventTarget[], init: KeyboardEventInit = { key: 'Backspace' }): KeyboardEvent {
  const e = new KeyboardEvent('keydown', { bubbles: true, composed: true, ...init });
  Object.defineProperty(e, 'composedPath', { value: () => path });
  // Comme pour un écouteur posé sur window : e.target est recalculé sur l'hôte le plus externe.
  Object.defineProperty(e, 'target', { value: path[path.length - 1] ?? null });
  return e;
}

/** <home-assistant> > shadow > <ha-panel> (hôte) > shadow > [enfants] */
function buildTree() {
  const root = document.createElement('home-assistant');
  document.body.appendChild(root);
  const rootShadow = root.attachShadow({ mode: 'open' });
  const host = document.createElement('home-architect-panel');
  rootShadow.appendChild(host);
  const shadow = host.attachShadow({ mode: 'open' });
  const canvas = document.createElement('div');
  const input = document.createElement('input');
  const textarea = document.createElement('textarea');
  const select = document.createElement('select');
  const editable = document.createElement('div');
  editable.contentEditable = 'true';
  const haField = document.createElement('ha-textfield');
  const roleBox = document.createElement('div');
  roleBox.setAttribute('role', 'textbox');
  shadow.append(canvas, input, textarea, select, editable, haField, roleBox);
  const dialog = document.createElement('ha-more-info-dialog');
  const dialogButton = document.createElement('button');
  dialog.appendChild(dialogButton);
  rootShadow.appendChild(dialog);
  const tail = [shadow, host, rootShadow, root, document.body, document.documentElement, document, window] as EventTarget[];
  return { root, rootShadow, host, shadow, canvas, input, textarea, select, editable, haField, roleBox, dialog, dialogButton, tail };
}

/** Simule la visibilité de l'hôte (checkVisibility si disponible, sinon getClientRects). */
function setVisible(host: Element, visible: boolean): void {
  Object.defineProperty(host, 'checkVisibility', { value: () => visible, configurable: true });
  Object.defineProperty(host, 'getClientRects', { value: () => (visible ? [{}] : []), configurable: true });
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('getEventTarget', () => {
  it('renvoie le premier élément du chemin composé, pas la cible recalculée', () => {
    const t = buildTree();
    const e = keyEvent([t.input, ...t.tail]);
    expect(e.target).toBe(window);
    expect(getEventTarget(e)).toBe(t.input);
  });

  it('se replie sur e.target quand le chemin est vide', () => {
    const e = new KeyboardEvent('keydown');
    expect(getEventTarget(e)).toBeNull();
    const div = document.createElement('div');
    document.body.appendChild(div);
    let seen: EventTarget | null = null;
    div.addEventListener('keydown', ev => { seen = getEventTarget(ev); });
    div.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true }));
    expect(seen).toBe(div);
  });
});

describe('isEditableTarget', () => {
  it.each(['input', 'textarea', 'select', 'editable', 'haField', 'roleBox'] as const)('détecte %s à travers le Shadow DOM', key => {
    const t = buildTree();
    expect(isEditableTarget(keyEvent([t[key], ...t.tail]))).toBe(true);
  });

  it('ignore les éléments non éditables', () => {
    const t = buildTree();
    expect(isEditableTarget(keyEvent([t.canvas, ...t.tail]))).toBe(false);
    expect(isEditableTarget(keyEvent([document.body, document.documentElement, document, window]))).toBe(false);
  });

  it('fonctionne lors d’un vrai dispatch composé depuis un champ en Shadow DOM', () => {
    const t = buildTree();
    let editable: boolean | null = null;
    const listener = (ev: Event) => { editable = isEditableTarget(ev); };
    window.addEventListener('keydown', listener);
    try {
      t.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'r', bubbles: true, composed: true }));
    } finally {
      window.removeEventListener('keydown', listener);
    }
    expect(editable).toBe(true);
  });
});

describe('isEventFromHost / hasCommandModifier', () => {
  it('vérifie la présence de l’hôte dans le chemin', () => {
    const t = buildTree();
    expect(isEventFromHost(keyEvent([t.canvas, ...t.tail]), t.host)).toBe(true);
    expect(isEventFromHost(keyEvent([t.dialogButton, t.dialog, t.rootShadow, t.root, document.body]), t.host)).toBe(false);
  });

  it('détecte Ctrl, Cmd et Alt', () => {
    expect(hasCommandModifier(new KeyboardEvent('keydown', { key: 'z', ctrlKey: true }))).toBe(true);
    expect(hasCommandModifier(new KeyboardEvent('keydown', { key: 'z', metaKey: true }))).toBe(true);
    expect(hasCommandModifier(new KeyboardEvent('keydown', { key: 'z', altKey: true }))).toBe(true);
    expect(hasCommandModifier(new KeyboardEvent('keydown', { key: 'z', shiftKey: true }))).toBe(false);
  });

  it('hasPrimaryModifier : Ctrl ou Cmd, mais ni Alt seul ni AltGr (Ctrl+Alt)', () => {
    expect(hasPrimaryModifier(new KeyboardEvent('keydown', { key: 'z', ctrlKey: true }))).toBe(true);
    expect(hasPrimaryModifier(new KeyboardEvent('keydown', { key: 'z', metaKey: true, shiftKey: true }))).toBe(true);
    expect(hasPrimaryModifier(new KeyboardEvent('keydown', { key: 'z', altKey: true }))).toBe(false);
    expect(hasPrimaryModifier(new KeyboardEvent('keydown', { key: '@', ctrlKey: true, altKey: true }))).toBe(false);
    expect(hasPrimaryModifier(new KeyboardEvent('keydown', { key: 'z' }))).toBe(false);
  });
});

describe('shouldHandleShortcut', () => {
  it('accepte un raccourci venant de l’hôte (élément non éditable)', () => {
    const t = buildTree();
    expect(shouldHandleShortcut(keyEvent([t.canvas, ...t.tail]), { host: t.host })).toBe(true);
  });

  it('refuse un raccourci tapé dans un champ (Retour arrière dans « Nom de la pièce »)', () => {
    const t = buildTree();
    expect(shouldHandleShortcut(keyEvent([t.input, ...t.tail]), { host: t.host })).toBe(false);
    expect(shouldHandleShortcut(keyEvent([t.editable, ...t.tail], { key: 'r' }), { host: t.host })).toBe(false);
  });

  it('refuse quand une modale est ouverte, sauf autorisation explicite', () => {
    const t = buildTree();
    const e = keyEvent([t.canvas, ...t.tail], { key: 'Escape' });
    expect(shouldHandleShortcut(e, { host: t.host, modalOpen: true })).toBe(false);
    expect(shouldHandleShortcut(e, { host: t.host, modalOpen: true, allowWhenModalOpen: true })).toBe(true);
    expect(shouldHandleShortcut(e, { host: t.host, modalOpen: false })).toBe(true);
  });

  it('une modale autorisée ne rend pas éditable un champ', () => {
    const t = buildTree();
    const e = keyEvent([t.input, ...t.tail], { key: 'Escape' });
    expect(shouldHandleShortcut(e, { host: t.host, modalOpen: true, allowWhenModalOpen: true })).toBe(false);
  });

  it('refuse un événement venant d’ailleurs dans HA (dialogue, Assist, recherche)', () => {
    const t = buildTree();
    const e = keyEvent([t.dialogButton, t.dialog, t.rootShadow, t.root, document.body, document.documentElement, document, window], { key: 'r' });
    expect(shouldHandleShortcut(e, { host: t.host })).toBe(false);
  });

  it('accepte un événement sur body (aucun focus) si l’hôte est connecté et visible', () => {
    const t = buildTree();
    const bodyPath = [document.body, document.documentElement, document, window];
    setVisible(t.host, true);
    expect(shouldHandleShortcut(keyEvent(bodyPath), { host: t.host })).toBe(true);
    expect(shouldHandleShortcut(keyEvent([document.documentElement, document, window]), { host: t.host })).toBe(true);
  });

  it('refuse un événement sur body si l’hôte est masqué', () => {
    const t = buildTree();
    const bodyPath = [document.body, document.documentElement, document, window];
    setVisible(t.host, false);
    expect(shouldHandleShortcut(keyEvent(bodyPath), { host: t.host })).toBe(false);
  });

  it('refuse un événement sur body si l’hôte est déconnecté (panneau quitté)', () => {
    const detached = document.createElement('home-architect-panel');
    expect(shouldHandleShortcut(keyEvent([document.body, document.documentElement, document, window]), { host: detached })).toBe(false);
  });

  it('refuse une modale ouverte même quand rien n’a le focus', () => {
    const t = buildTree();
    setVisible(t.host, true);
    expect(shouldHandleShortcut(keyEvent([document.body, document.documentElement, document, window]), { host: t.host, modalOpen: true })).toBe(false);
  });
});
