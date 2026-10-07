import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  DraggableHudController,
  loadHudPosition,
  saveHudPosition,
  renderDragHandle
} from '../../src/components/draggable-hud';

describe('DraggableHudController', () => {
  const STORAGE_KEY = 'test_draggable_hud_pos';

  beforeEach(() => {
    localStorage.clear();
  });

  it('charge et sauvegarde la position dans localStorage', () => {
    expect(loadHudPosition(STORAGE_KEY)).toBeNull();

    saveHudPosition(STORAGE_KEY, { x: 120, y: 240 });
    expect(loadHudPosition(STORAGE_KEY)).toEqual({ x: 120, y: 240 });

    saveHudPosition(STORAGE_KEY, null);
    expect(loadHudPosition(STORAGE_KEY)).toBeNull();
  });

  it('gère les valeurs de stockage corrompues sans erreur', () => {
    localStorage.setItem(STORAGE_KEY, 'invalid-json');
    expect(loadHudPosition(STORAGE_KEY)).toBeNull();

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ x: 'abc', y: 12 }));
    expect(loadHudPosition(STORAGE_KEY)).toBeNull();
  });

  it('déplace et borne la cible dans son conteneur', () => {
    const container = document.createElement('div');
    const target = document.createElement('div');
    container.appendChild(target);

    // Mock getBoundingClientRect
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      right: 800,
      bottom: 600,
      width: 800,
      height: 600,
      x: 0,
      y: 0,
      toJSON: () => {}
    });

    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
      left: 50,
      top: 50,
      right: 250,
      bottom: 90,
      width: 200,
      height: 40,
      x: 50,
      y: 50,
      toJSON: () => {}
    });

    const controller = new DraggableHudController(
      () => target,
      () => container,
      { storageKey: STORAGE_KEY, margin: 10 }
    );

    // Pointer down à (100, 60)
    controller.handlePointerDown(new PointerEvent('pointerdown', {
      button: 0,
      clientX: 100,
      clientY: 60,
      pointerId: 1
    }));
    expect(controller.isDragging).toBe(true);
    expect(controller.hasMoved).toBe(false);

    // Move de +50px X, +30px Y
    controller.handlePointerMove(new PointerEvent('pointermove', {
      clientX: 150,
      clientY: 90,
      pointerId: 1
    }));
    expect(controller.hasMoved).toBe(true);
    expect(controller.currentPosition).toEqual({ x: 100, y: 80 });
    expect(target.style.left).toBe('100px');
    expect(target.style.top).toBe('80px');

    // Move hors limites (en haut à gauche)
    controller.handlePointerMove(new PointerEvent('pointermove', {
      clientX: -200,
      clientY: -200,
      pointerId: 1
    }));
    // Borné au margin (10, 10)
    expect(controller.currentPosition).toEqual({ x: 10, y: 10 });
    expect(target.style.left).toBe('10px');
    expect(target.style.top).toBe('10px');

    // Relâche
    controller.handlePointerUp(new PointerEvent('pointerup', { pointerId: 1 }));
    expect(controller.isDragging).toBe(false);

    // Position sauvegardée
    expect(loadHudPosition(STORAGE_KEY)).toEqual({ x: 10, y: 10 });

    // Reset
    controller.reset();
    expect(controller.currentPosition).toBeNull();
    expect(loadHudPosition(STORAGE_KEY)).toBeNull();
    expect(target.style.left).toBe('');
  });

  it('supporte le déplacement au clavier et le raccourci Home', () => {
    const container = document.createElement('div');
    const target = document.createElement('div');
    container.appendChild(target);

    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      left: 0, top: 0, right: 1000, bottom: 800, width: 1000, height: 800, x: 0, y: 0, toJSON: () => {}
    });
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
      left: 100, top: 100, right: 200, bottom: 140, width: 100, height: 40, x: 100, y: 100, toJSON: () => {}
    });

    const controller = new DraggableHudController(
      () => target,
      () => container,
      { storageKey: STORAGE_KEY }
    );

    controller.handleKeyDown(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(controller.currentPosition?.x).toBe(110);

    controller.handleKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown', shiftKey: true }));
    expect(controller.currentPosition?.y).toBe(140);

    controller.handleKeyDown(new KeyboardEvent('keydown', { key: 'Home' }));
    expect(controller.currentPosition).toBeNull();
  });

  it('ignore le début de drag si le clic est sur un bouton interactif enfant', () => {
    const target = document.createElement('div');
    const button = document.createElement('button');
    button.className = 'hud-btn';
    target.appendChild(button);

    const controller = new DraggableHudController(() => target, () => document.body);

    const event = new PointerEvent('pointerdown', { button: 0 });
    Object.defineProperty(event, 'target', { value: button });

    controller.handlePointerDown(event);
    expect(controller.isDragging).toBe(false);
  });

  it('génère le template de poignée de déplacement', () => {
    const controller = new DraggableHudController(() => null, () => null);
    const template = renderDragHandle(controller, 'Déplacer');
    expect(template).toBeDefined();
    expect(template.strings.join('')).toContain('hud-drag-handle');
  });
});
