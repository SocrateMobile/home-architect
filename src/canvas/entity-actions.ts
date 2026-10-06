import { EntityBinding, TapActionType } from '../core/types';
import { defaultTapAction, serviceForTap } from '../core/project-model';
import { exceedsTapSlop } from './gestures';

/**
 * Actions des épingles d'entités (carte et plan en lecture) — constats F10, F101, F102.
 * Une seule table d'actions (defaultTapAction / serviceForTap de core/project-model) : more-info par
 * défaut pour les volets, portails, serrures, alarmes, vannes… ; le tap ne bascule que les domaines sans
 * risque et déclenche scènes, scripts et boutons. Appui long → holdAction (more-info par défaut),
 * double tap → more-info, sans bascule préalable.
 */

/** Durée (ms) d'un appui long. */
export const HOLD_DELAY_MS = 500;
/** Fenêtre (ms) pendant laquelle un second tap forme un double tap. */
export const DOUBLE_TAP_DELAY_MS = 250;

export type EntityGesture = 'tap' | 'double_tap' | 'hold';

/** Action concrète à exécuter pour un geste. */
export type EntityActionPlan =
  | { kind: 'more-info'; entityId: string }
  | { kind: 'service'; domain: string; service: string; entityId: string }
  | { kind: 'navigate'; path: string }
  | { kind: 'none' };

/** Chemin de navigation interne à HA ('/lovelace/1') ou ancre ('#popup'), jamais une URL externe. */
// eslint-disable-next-line no-control-regex -- exclusion volontaire des caractères de contrôle
const NAVIGATION_PATH = /^(?:\/(?!\/)|#)[^\s\x00-\x1f\x7f\\]*$/;

export function isSafeNavigationPath(path: unknown): path is string {
  return typeof path === 'string' && NAVIGATION_PATH.test(path);
}

/** Type d'action configuré pour un geste (défaut du domaine pour le tap, more-info pour l'appui long). */
export function entityActionType(binding: Pick<EntityBinding, 'entityId' | 'tapAction' | 'holdAction'>, gesture: EntityGesture): TapActionType {
  if (gesture === 'double_tap') return 'more-info';
  if (gesture === 'hold') return binding.holdAction ?? 'more-info';
  return binding.tapAction ?? defaultTapAction(binding.entityId);
}

/**
 * Action à exécuter. 'toggle' sur un domaine non actionnable et 'navigate' sans chemin sûr (liaison
 * modifiée pendant la session, non normalisée) se replient sur more-info.
 */
export function planEntityAction(
  binding: Pick<EntityBinding, 'entityId' | 'tapAction' | 'holdAction' | 'navigationPath'>,
  gesture: EntityGesture
): EntityActionPlan {
  const type = entityActionType(binding, gesture);
  const moreInfo: EntityActionPlan = { kind: 'more-info', entityId: binding.entityId };
  switch (type) {
    case 'none':
      return { kind: 'none' };
    case 'navigate':
      return isSafeNavigationPath(binding.navigationPath) ? { kind: 'navigate', path: binding.navigationPath } : moreInfo;
    case 'toggle': {
      const svc = serviceForTap(binding.entityId);
      return svc ? { kind: 'service', domain: svc.domain, service: svc.service, entityId: binding.entityId } : moreInfo;
    }
    default:
      return moreInfo;
  }
}

export interface EntityActionContext {
  /** Élément qui émet hass-more-info (une seule fois, bubbles + composed). */
  host: EventTarget;
  hass: { callService?: (domain: string, service: string, data?: Record<string, unknown>) => unknown } | undefined;
  /** Message affiché si l'appel de service échoue. */
  onError: (message: string) => void;
}

function errorMessage(err: unknown): string {
  if (err && typeof err === 'object' && 'message' in err && typeof err.message === 'string') return err.message;
  return typeof err === 'string' ? err : '';
}

/** Exécute le geste sur l'entité et renvoie l'action effectuée. */
export function runEntityAction(
  binding: Pick<EntityBinding, 'entityId' | 'tapAction' | 'holdAction' | 'navigationPath'>,
  gesture: EntityGesture,
  ctx: EntityActionContext
): EntityActionPlan {
  const plan = planEntityAction(binding, gesture);
  switch (plan.kind) {
    case 'more-info':
      ctx.host.dispatchEvent(new CustomEvent('hass-more-info', {
        detail: { entityId: plan.entityId },
        bubbles: true,
        composed: true
      }));
      break;
    case 'service': {
      const callService = ctx.hass?.callService;
      if (typeof callService !== 'function') {
        ctx.onError('Home Assistant est indisponible.');
        break;
      }
      const fail = (err: unknown) => {
        console.error(`[home-architect] ${plan.domain}.${plan.service} (${plan.entityId}) a échoué :`, err);
        const detail = errorMessage(err);
        ctx.onError(`Action impossible sur ${plan.entityId}${detail ? ` : ${detail}` : '.'}`);
      };
      try {
        Promise.resolve(callService.call(ctx.hass, plan.domain, plan.service, { entity_id: plan.entityId })).catch(fail);
      } catch (err) {
        fail(err);
      }
      break;
    }
    case 'navigate':
      history.pushState(null, '', plan.path);
      window.dispatchEvent(new CustomEvent('location-changed', { detail: { replace: false } }));
      break;
    default:
      break;
  }
  return plan;
}

export interface TapGestureHandlers {
  onTap(id: string): void;
  onDoubleTap(id: string): void;
  onHold(id: string): void;
  /**
   * Faut-il attendre un éventuel second tap avant d'exécuter le tap ? Non quand le tap ouvre déjà
   * more-info : il part aussitôt, et le second tap d'un double tap est ignoré.
   */
  waitsForDoubleTap(id: string): boolean;
}

interface Press {
  id: string;
  start: { x: number; y: number };
  pointerType: string;
  timer: ReturnType<typeof setTimeout> | null;
}

/**
 * Reconnaissance tap / double tap / appui long d'une cible. Le tap vient de l'événement click (souris,
 * toucher, clavier virtuel et lecteurs d'écran le produisent tous) ; l'appui long vient des événements
 * pointeur. Un clic qui suit un appui long ou un glisser est ignoré.
 */
export class TapGestureRecognizer {
  private press: Press | null = null;
  private swallowClick = false;
  private pendingTap: { id: string; timer: ReturnType<typeof setTimeout> } | null = null;
  private lastImmediate: { id: string; at: number } | null = null;

  constructor(
    private readonly handlers: TapGestureHandlers,
    private readonly holdMs: number = HOLD_DELAY_MS,
    private readonly doubleTapMs: number = DOUBLE_TAP_DELAY_MS
  ) {}

  /** pointerdown sur la cible. */
  down(id: string, x: number, y: number, pointerType: string): void {
    this.clearPress();
    this.swallowClick = false;
    const press: Press = { id, start: { x, y }, pointerType, timer: null };
    press.timer = setTimeout(() => {
      press.timer = null;
      this.swallowClick = true;
      this.handlers.onHold(id);
    }, this.holdMs);
    this.press = press;
  }

  /** pointermove pendant l'appui : au-delà du seuil de tap, ce n'est ni un tap ni un appui long. */
  move(x: number, y: number): void {
    const press = this.press;
    if (!press || !exceedsTapSlop(press.start, { x, y }, press.pointerType)) return;
    this.clearPress();
    this.swallowClick = true;
  }

  /** pointerup : fin de l'appui (le tap éventuel arrive ensuite par click). */
  up(): void {
    this.clearPress();
  }

  /** pointercancel, geste à deux doigts : aucun geste en cours n'aboutit. */
  cancel(): void {
    this.clearPress();
    this.clearPendingTap();
    // Après pointercancel le navigateur n'émet pas de click : rien à ignorer ensuite.
    this.swallowClick = false;
  }

  /** click sur la cible. */
  click(id: string): void {
    if (this.swallowClick) {
      this.swallowClick = false;
      return;
    }
    const pending = this.pendingTap;
    if (pending && pending.id === id) {
      this.clearPendingTap();
      this.handlers.onDoubleTap(id);
      return;
    }
    if (pending) {
      // Tap sur une autre cible : le tap en attente est exécuté tout de suite.
      this.clearPendingTap();
      this.handlers.onTap(pending.id);
    }
    const now = Date.now();
    if (this.lastImmediate && this.lastImmediate.id === id && now - this.lastImmediate.at <= this.doubleTapMs) {
      this.lastImmediate = null; // second tap d'un double tap : more-info est déjà ouvert
      return;
    }
    if (this.handlers.waitsForDoubleTap(id)) {
      const timer = setTimeout(() => {
        this.pendingTap = null;
        this.handlers.onTap(id);
      }, this.doubleTapMs);
      this.pendingTap = { id, timer };
      this.lastImmediate = null;
    } else {
      this.lastImmediate = { id, at: now };
      this.handlers.onTap(id);
    }
  }

  /** Abandonne tout geste en attente (déconnexion). */
  dispose(): void {
    this.clearPress();
    this.clearPendingTap();
    this.swallowClick = false;
    this.lastImmediate = null;
  }

  private clearPress(): void {
    if (this.press?.timer) clearTimeout(this.press.timer);
    this.press = null;
  }

  private clearPendingTap(): void {
    if (this.pendingTap) clearTimeout(this.pendingTap.timer);
    this.pendingTap = null;
  }
}
