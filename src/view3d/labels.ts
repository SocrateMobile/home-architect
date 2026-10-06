import { Group } from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { EntityView } from '../canvas/entity-display';
import { Rgba } from './colors';
import { MARKER_HEIGHT, MarkerModel, RoomLabelModel } from './scene-builder';

/**
 * Calques HTML de la vue 3D, placés par CSS2DRenderer au-dessus du canevas WebGL :
 *  - marqueurs d'entités : boutons accessibles (nom et état en aria-label et en infobulle au survol ou
 *    au focus), couleur selon l'état, halo de la couleur d'une lampe allumée ;
 *  - étiquettes des pièces (nom, surface, température quand la heatmap est active).
 * Tout le texte passe par textContent (aucun HTML venu des données) ; les éléments sont créés une fois
 * et seulement modifiés quand leur affichage change.
 */

/** Gestionnaires des marqueurs (identifiant de la liaison d'entité). */
export interface MarkerHandlers {
  pointerDown(bindingId: string, e: PointerEvent): void;
  pointerMove(e: PointerEvent): void;
  pointerUp(e: PointerEvent): void;
  pointerCancel(e: PointerEvent): void;
  click(bindingId: string, e: MouseEvent): void;
  dblClick(bindingId: string, e: MouseEvent): void;
  keyDown(bindingId: string, e: KeyboardEvent): void;
  contextMenu(e: Event): void;
}

export interface MarkerDisplay {
  view: EntityView;
  selected: boolean;
  focusable: boolean;
  /** Couleur d'une lampe allumée (halo), null sinon. */
  glow: Rgba | null;
}

interface MarkerEntry {
  object: CSS2DObject;
  element: HTMLElement;
  icon: HTMLElement;
  name: HTMLElement;
  state: HTMLElement;
  key: string;
}

function span(className: string, parent: HTMLElement): HTMLElement {
  const el = document.createElement('span');
  el.className = className;
  parent.append(el);
  return el;
}

/** Marqueurs des entités liées. */
export class MarkerLayer {
  readonly group = new Group();
  private readonly entries = new Map<string, MarkerEntry>();

  constructor(private readonly handlers: MarkerHandlers) {
    this.group.name = 'home-architect-markers';
  }

  /** Crée, déplace ou retire les marqueurs selon les liaisons du projet. */
  sync(models: readonly MarkerModel[]): void {
    const wanted = new Set(models.map(m => m.bindingId));
    for (const [id, entry] of this.entries) {
      if (wanted.has(id)) continue;
      entry.object.removeFromParent();
      this.entries.delete(id);
    }
    for (const model of models) {
      const entry = this.entries.get(model.bindingId) ?? this.create(model.bindingId);
      entry.object.position.set(model.position.x, MARKER_HEIGHT, model.position.y);
    }
  }

  private create(bindingId: string): MarkerEntry {
    const element = document.createElement('div');
    element.className = 'marker';
    const icon = span('marker-icon', element);
    icon.setAttribute('aria-hidden', 'true');
    const tip = span('marker-tip', element);
    tip.setAttribute('aria-hidden', 'true');
    const name = span('marker-name', tip);
    const state = span('marker-state', tip);
    const h = this.handlers;
    element.addEventListener('pointerdown', e => h.pointerDown(bindingId, e));
    element.addEventListener('pointermove', e => h.pointerMove(e));
    element.addEventListener('pointerup', e => h.pointerUp(e));
    element.addEventListener('pointercancel', e => h.pointerCancel(e));
    element.addEventListener('click', e => h.click(bindingId, e));
    element.addEventListener('dblclick', e => h.dblClick(bindingId, e));
    element.addEventListener('keydown', e => h.keyDown(bindingId, e));
    element.addEventListener('contextmenu', e => h.contextMenu(e));
    const object = new CSS2DObject(element);
    // Au-dessus des étiquettes de pièces (tri des calques par renderOrder, puis par distance).
    object.renderOrder = 1;
    this.group.add(object);
    const entry: MarkerEntry = { object, element, icon, name, state, key: '' };
    this.entries.set(bindingId, entry);
    return entry;
  }

  /** Affichage de chaque marqueur (état, sélection, focus) ; seuls les marqueurs modifiés sont réécrits. */
  update(displays: ReadonlyMap<string, MarkerDisplay>): void {
    for (const [id, entry] of this.entries) {
      const d = displays.get(id);
      if (!d) continue;
      const { view } = d;
      const glow = d.glow ? `rgb(${d.glow.r}, ${d.glow.g}, ${d.glow.b})` : '';
      const label = `${view.name} : ${view.stateText}`;
      const key = [view.icon, label, view.status, view.unavailable, view.orphan, view.radar, view.playing, d.selected, d.focusable, glow].join('|');
      if (key === entry.key) continue;
      entry.key = key;
      const el = entry.element;
      el.className = 'marker';
      el.classList.add(`status-${view.status}`);
      el.classList.toggle('selected', d.selected);
      el.classList.toggle('unavailable', view.unavailable);
      el.classList.toggle('orphan', view.orphan);
      el.classList.toggle('radar', view.radar);
      el.classList.toggle('playing', view.playing);
      el.classList.toggle('lit', glow !== '');
      if (glow) el.style.setProperty('--marker-glow', glow);
      else el.style.removeProperty('--marker-glow');
      if (d.focusable) {
        el.setAttribute('role', 'button');
        el.tabIndex = 0;
      } else {
        el.removeAttribute('role');
        el.removeAttribute('tabindex');
      }
      el.setAttribute('aria-label', label);
      entry.icon.textContent = view.icon;
      entry.name.textContent = view.name;
      entry.state.textContent = view.stateText;
    }
  }

  dispose(): void {
    for (const entry of this.entries.values()) entry.object.removeFromParent();
    this.entries.clear();
    this.group.removeFromParent();
  }
}

interface LabelEntry {
  object: CSS2DObject;
  temperature: HTMLElement;
}

/**
 * Étiquettes des pièces, au-dessus du point d'étiquette (toujours à l'intérieur de la pièce), à hauteur
 * de l'arase des murs : le mobilier reste visible, les marqueurs d'entités passent devant.
 */
export class RoomLabelLayer {
  readonly group = new Group();
  private readonly entries = new Map<string, LabelEntry>();

  constructor() {
    this.group.name = 'home-architect-room-labels';
  }

  /** Recrée les étiquettes (après une reconstruction de la scène). */
  sync(models: readonly RoomLabelModel[]): void {
    this.clear();
    for (const model of models) {
      const element = document.createElement('div');
      element.className = 'room-label';
      span('room-label-name', element).textContent = model.name;
      span('room-label-area', element).textContent = `${model.areaM2.toFixed(1)} m²`;
      const temperature = span('room-label-temp', element);
      temperature.hidden = true;
      const object = new CSS2DObject(element);
      object.position.set(model.position.x, model.height, model.position.y);
      this.group.add(object);
      this.entries.set(model.roomId, { object, temperature });
    }
  }

  /** Température affichée sous le nom (heatmap active), texte déjà formaté. */
  updateTemperatures(texts: ReadonlyMap<string, string>): void {
    for (const [roomId, entry] of this.entries) {
      const text = texts.get(roomId) ?? '';
      if (entry.temperature.textContent === text && entry.temperature.hidden === (text === '')) continue;
      entry.temperature.textContent = text;
      entry.temperature.hidden = text === '';
    }
  }

  private clear(): void {
    for (const entry of this.entries.values()) entry.object.removeFromParent();
    this.entries.clear();
  }

  dispose(): void {
    this.clear();
    this.group.removeFromParent();
  }
}
