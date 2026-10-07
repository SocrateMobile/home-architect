import { TemplateResult, html } from 'lit';

export interface Position {
  x: number;
  y: number;
}

export interface DraggableHudOptions {
  storageKey?: string;
  margin?: number;
  onPositionChanged?: (pos: Position | null) => void;
}

export function loadHudPosition(key: string): Position | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const p = JSON.parse(raw) as unknown;
    if (
      typeof p === 'object' &&
      p !== null &&
      'x' in p &&
      'y' in p &&
      typeof (p as Record<string, unknown>).x === 'number' &&
      typeof (p as Record<string, unknown>).y === 'number' &&
      Number.isFinite((p as Record<string, unknown>).x) &&
      Number.isFinite((p as Record<string, unknown>).y)
    ) {
      return { x: (p as Record<string, unknown>).x as number, y: (p as Record<string, unknown>).y as number };
    }
  } catch {
    // LocalStorage non accessible ou corrompu
  }
  return null;
}

export function saveHudPosition(key: string, pos: Position | null): void {
  try {
    if (pos) localStorage.setItem(key, JSON.stringify(pos));
    else localStorage.removeItem(key);
  } catch {
    // LocalStorage non accessible
  }
}

/**
 * Contrôleur de déplacement (Cliquer-glisser / Drag & Drop) pour les barres d'outils et HUDs.
 * Gère le pointer capture, les bornes de l'écran, le stockage local et le repositionnement fluide.
 */
export class DraggableHudController {
  public isDragging = false;
  public hasMoved = false;

  private position: Position | null = null;
  private startPointer = { x: 0, y: 0 };
  private startPos = { x: 0, y: 0 };
  private capturedTarget: HTMLElement | null = null;
  private storageKey: string | null;
  private margin: number;
  private getTarget: () => HTMLElement | null;
  private getContainer: () => HTMLElement | null;
  private onPositionChanged?: (pos: Position | null) => void;

  constructor(
    getTarget: () => HTMLElement | null,
    getContainer: () => HTMLElement | null,
    options?: DraggableHudOptions
  ) {
    this.getTarget = getTarget;
    this.getContainer = getContainer;
    this.storageKey = options?.storageKey ?? null;
    this.margin = options?.margin ?? 8;
    this.onPositionChanged = options?.onPositionChanged;

    if (this.storageKey) {
      this.position = loadHudPosition(this.storageKey);
    }
  }

  public get currentPosition(): Position | null {
    return this.position;
  }

  public get styleString(): string {
    if (!this.position) return '';
    return `left: ${this.position.x}px !important; top: ${this.position.y}px !important; right: auto !important; bottom: auto !important; transform: none !important;`;
  }

  public handlePointerDown = (e: PointerEvent): void => {
    if (e.button !== 0) return;

    // Si le clic provient d'un contrôle interactif enfant (sauf poignée de déplacement), ne pas démarrer le glissement
    const targetElement = e.target as HTMLElement | null;
    if (targetElement) {
      const interactive = targetElement.closest(
        'button, input, select, textarea, a, .hud-btn, .hud-opt-btn, .hud-preset-btn, .icon-picker-btn'
      );
      if (interactive && !interactive.classList.contains('hud-drag-handle')) {
        return;
      }
    }

    const target = this.getTarget();
    const container = this.getContainer();
    if (!target || !container) return;

    e.preventDefault();
    e.stopPropagation();

    const targetRect = target.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    this.startPos = {
      x: targetRect.left - containerRect.left,
      y: targetRect.top - containerRect.top,
    };
    this.startPointer = { x: e.clientX, y: e.clientY };
    this.isDragging = true;
    this.hasMoved = false;

    const captureEl = (e.currentTarget as HTMLElement) || target;
    this.capturedTarget = captureEl;
    try {
      captureEl.setPointerCapture(e.pointerId);
    } catch {
      // Ignorer si échec capture
    }
  };

  public handlePointerMove = (e: PointerEvent): void => {
    if (!this.isDragging) return;
    e.preventDefault();
    e.stopPropagation();

    const target = this.getTarget();
    const container = this.getContainer();
    if (!target || !container) return;

    const dx = e.clientX - this.startPointer.x;
    const dy = e.clientY - this.startPointer.y;

    if (Math.hypot(dx, dy) > 4) {
      this.hasMoved = true;
    }

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const rawX = this.startPos.x + dx;
    const rawY = this.startPos.y + dy;

    const minX = this.margin;
    const maxX = Math.max(minX, containerRect.width - targetRect.width - this.margin);
    const minY = this.margin;
    const maxY = Math.max(minY, containerRect.height - targetRect.height - this.margin);

    const clampedX = Math.round(Math.min(maxX, Math.max(minX, rawX)));
    const clampedY = Math.round(Math.min(maxY, Math.max(minY, rawY)));

    this.position = { x: clampedX, y: clampedY };
    target.style.setProperty('left', `${clampedX}px`, 'important');
    target.style.setProperty('top', `${clampedY}px`, 'important');
    target.style.setProperty('right', 'auto', 'important');
    target.style.setProperty('bottom', 'auto', 'important');
    target.style.setProperty('transform', 'none', 'important');
  };

  public handlePointerUp = (e: PointerEvent): void => {
    if (!this.isDragging) return;
    this.isDragging = false;

    if (this.capturedTarget) {
      try {
        this.capturedTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Ignorer si déjà relâché
      }
      this.capturedTarget = null;
    }

    if (this.position && this.storageKey) {
      saveHudPosition(this.storageKey, this.position);
    }

    if (this.onPositionChanged) {
      this.onPositionChanged(this.position);
    }
  };

  public reset = (): void => {
    this.isDragging = false;
    this.hasMoved = false;
    this.position = null;
    if (this.storageKey) {
      saveHudPosition(this.storageKey, null);
    }
    const target = this.getTarget();
    if (target) {
      target.style.removeProperty('left');
      target.style.removeProperty('top');
      target.style.removeProperty('right');
      target.style.removeProperty('bottom');
      target.style.removeProperty('transform');
    }
    if (this.onPositionChanged) {
      this.onPositionChanged(null);
    }
  };

  public handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Home') {
      e.preventDefault();
      e.stopPropagation();
      this.reset();
      return;
    }
    const step = e.shiftKey ? 40 : 10;
    const deltas: Record<string, { x: number; y: number }> = {
      ArrowLeft: { x: -step, y: 0 },
      ArrowRight: { x: step, y: 0 },
      ArrowUp: { x: 0, y: -step },
      ArrowDown: { x: 0, y: step },
    };
    const delta = deltas[e.key];
    if (!delta) return;

    e.preventDefault();
    e.stopPropagation();

    const target = this.getTarget();
    const container = this.getContainer();
    if (!target || !container) return;

    const targetRect = target.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const currentX = this.position ? this.position.x : targetRect.left - containerRect.left;
    const currentY = this.position ? this.position.y : targetRect.top - containerRect.top;

    const minX = this.margin;
    const maxX = Math.max(minX, containerRect.width - targetRect.width - this.margin);
    const minY = this.margin;
    const maxY = Math.max(minY, containerRect.height - targetRect.height - this.margin);

    const nextX = Math.round(Math.min(maxX, Math.max(minX, currentX + delta.x)));
    const nextY = Math.round(Math.min(maxY, Math.max(minY, currentY + delta.y)));

    this.position = { x: nextX, y: nextY };
    target.style.setProperty('left', `${nextX}px`, 'important');
    target.style.setProperty('top', `${nextY}px`, 'important');
    target.style.setProperty('right', 'auto', 'important');
    target.style.setProperty('bottom', 'auto', 'important');
    target.style.setProperty('transform', 'none', 'important');

    if (this.storageKey) {
      saveHudPosition(this.storageKey, this.position);
    }

    if (this.onPositionChanged) {
      this.onPositionChanged(this.position);
    }
  };

  public applyStoredPosition = (): void => {
    if (!this.position) return;
    const target = this.getTarget();
    const container = this.getContainer();
    if (!target || !container) return;

    const containerRect = container.getBoundingClientRect();
    if (containerRect.width === 0 || containerRect.height === 0) return;

    const targetRect = target.getBoundingClientRect();
    const minX = this.margin;
    const maxX = Math.max(minX, containerRect.width - (targetRect.width || 120) - this.margin);
    const minY = this.margin;
    const maxY = Math.max(minY, containerRect.height - (targetRect.height || 40) - this.margin);

    const clampedX = Math.round(Math.min(maxX, Math.max(minX, this.position.x)));
    const clampedY = Math.round(Math.min(maxY, Math.max(minY, this.position.y)));

    this.position = { x: clampedX, y: clampedY };
    target.style.setProperty('left', `${clampedX}px`, 'important');
    target.style.setProperty('top', `${clampedY}px`, 'important');
    target.style.setProperty('right', 'auto', 'important');
    target.style.setProperty('bottom', 'auto', 'important');
    target.style.setProperty('transform', 'none', 'important');
  };
}

/**
 * Génère le bouton poignée de déplacement réutilisable (grip dots ⋮⋮).
 */
export function renderDragHandle(
  controller: DraggableHudController,
  label = 'Déplacer la barre'
): TemplateResult {
  return html`
    <button
      type="button"
      class="hud-drag-handle ${controller.isDragging ? 'dragging' : ''}"
      @pointerdown=${controller.handlePointerDown}
      @pointermove=${controller.handlePointerMove}
      @pointerup=${controller.handlePointerUp}
      @pointercancel=${controller.handlePointerUp}
      @dblclick=${controller.reset}
      @keydown=${controller.handleKeyDown}
      title="${label} (cliquer-glisser, double-clic pour réinitialiser)"
      aria-label="${label}"
    >
      <span class="grip-dots" aria-hidden="true">⋮⋮</span>
    </button>
  `;
}
