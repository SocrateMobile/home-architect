import { HomeArchitectProject, SelectedElements } from '../core/types';

/** Éléments sélectionnables du plan. */
export type SelectableKind = 'wall' | 'opening' | 'room' | 'binding' | 'furniture';

export interface ElementRef {
  kind: SelectableKind;
  id: string;
}

type SelectionKey = 'wallIds' | 'openingIds' | 'roomIds' | 'bindingIds' | 'furnitureIds';

const KEYS: Record<SelectableKind, SelectionKey> = {
  wall: 'wallIds',
  opening: 'openingIds',
  room: 'roomIds',
  binding: 'bindingIds',
  furniture: 'furnitureIds'
};

const ALL_KEYS: SelectionKey[] = ['wallIds', 'openingIds', 'roomIds', 'bindingIds', 'furnitureIds'];

export function emptySelection(): SelectedElements {
  return { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] };
}

function ids(sel: SelectedElements, key: SelectionKey): string[] {
  return sel[key] ?? [];
}

export function isSelected(sel: SelectedElements, ref: ElementRef): boolean {
  return ids(sel, KEYS[ref.kind]).includes(ref.id);
}

/** Sélection réduite à un seul élément. */
export function selectOnly(ref: ElementRef): SelectedElements {
  const next = emptySelection();
  next[KEYS[ref.kind]] = [ref.id];
  return next;
}

export function addToSelection(sel: SelectedElements, ref: ElementRef): SelectedElements {
  const key = KEYS[ref.kind];
  if (ids(sel, key).includes(ref.id)) return sel;
  return { ...emptySelection(), ...sel, [key]: [...ids(sel, key), ref.id] };
}

export function removeFromSelection(sel: SelectedElements, ref: ElementRef): SelectedElements {
  const key = KEYS[ref.kind];
  if (!ids(sel, key).includes(ref.id)) return sel;
  return { ...emptySelection(), ...sel, [key]: ids(sel, key).filter(id => id !== ref.id) };
}

export function selectionCount(sel: SelectedElements): number {
  return ALL_KEYS.reduce((n, key) => n + ids(sel, key).length, 0);
}

export function sameSelection(a: SelectedElements, b: SelectedElements): boolean {
  return ALL_KEYS.every(key => {
    const x = ids(a, key);
    const y = ids(b, key);
    return x.length === y.length && x.every((id, i) => id === y[i]);
  });
}

/**
 * Retire de la sélection les identifiants qui n'existent plus dans le projet (pièce supprimée depuis
 * sa modale, annulation…, constat F130). Renvoie le même objet si rien n'est retiré.
 */
export function pruneSelection(sel: SelectedElements, project: HomeArchitectProject): SelectedElements {
  const existing: Record<SelectionKey, Set<string>> = {
    wallIds: new Set(project.walls.map(w => w.id)),
    openingIds: new Set(project.openings.map(o => o.id)),
    roomIds: new Set(project.rooms.map(r => r.id)),
    bindingIds: new Set(project.bindings.map(b => b.id)),
    furnitureIds: new Set((project.furniture ?? []).map(f => f.id))
  };
  let changed = false;
  const next = emptySelection();
  for (const key of ALL_KEYS) {
    const kept = ids(sel, key).filter(id => existing[key].has(id));
    if (kept.length !== ids(sel, key).length) changed = true;
    next[key] = kept;
  }
  return changed ? next : sel;
}
