/**
 * 🎆 SOCRATE RULES - EASTER EGG MODULE
 * Module officiel de la suite DomoLink
 *
 * - Aucune ressource externe : polices système uniquement (aucune requête vers un service tiers).
 * - Aucun innerHTML : l'overlay est construit élément par élément.
 * - L'animation s'arrête d'elle-même dès que l'overlay quitte le document (panneau détaché) ;
 *   la fonction renvoyée par launchSocrateRulesEasterEgg permet aussi de la fermer explicitement.
 * - prefers-reduced-motion : image fixe, sans boucle d'animation ni étincelles.
 */
import { hasCommandModifier, isEditableTarget } from './keyboard';

const OVERLAY_ID = 'socrate-rules-overlay';

/** Fermeture de chaque overlay actif (une relance sur la même racine renvoie la fermeture existante). */
const activeOverlays = new WeakMap<HTMLElement, () => void>();

const OVERLAY_STYLES = `
  #socrate-rules-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999999;
    background-color: #030008;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
    outline: none;
    opacity: 0;
    transition: opacity 0.35s ease, transform 0.35s ease;
  }
  #socrate-rules-overlay * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
    -webkit-user-select: none;
  }
  #socrate-rules-overlay canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }
  #socrate-rules-overlay .socrate-container {
    position: relative;
    z-index: 10;
    text-align: center;
    pointer-events: auto;
  }
  #socrate-rules-overlay h1.socrate-title {
    font-family: ui-rounded, "SF Pro Rounded", "Arial Black", "Helvetica Neue", system-ui, sans-serif;
    font-size: 6.5rem;
    font-weight: 900;
    letter-spacing: 12px;
    text-transform: uppercase;
    display: inline-block;
    line-height: 1.1;
    filter:
      drop-shadow(0px 1px 0px #990066)
      drop-shadow(0px 2px 0px #660066)
      drop-shadow(0px 3px 0px #330066)
      drop-shadow(0px 4px 0px #1a0033)
      drop-shadow(0px 12px 15px rgba(0,0,0,0.9))
      drop-shadow(0 0 25px rgba(127, 0, 255, 0.6));
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.5s;
    cursor: pointer;
  }
  #socrate-rules-overlay h1.socrate-title:hover {
    transform: scale(1.05);
    filter:
      drop-shadow(0px 1px 0px #ff007f)
      drop-shadow(0px 2px 0px #990066)
      drop-shadow(0px 3px 0px #660066)
      drop-shadow(0px 4px 0px #330066)
      drop-shadow(0px 5px 0px #1a0033)
      drop-shadow(0px 15px 20px rgba(0,0,0,0.9))
      drop-shadow(0 0 40px rgba(0, 240, 255, 0.9));
  }
  #socrate-rules-overlay .socrate-line {
    display: block;
  }
  #socrate-rules-overlay .socrate-letter {
    display: inline-block;
    background: linear-gradient(
      to bottom,
      #ff66b3 0%,
      #ff007f 35%,
      #7f00ff 65%,
      #00f0ff 100%
    );
    background-size: 100% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: socrate-wave 1.6s ease-in-out infinite;
  }
  #socrate-rules-overlay p.socrate-sub {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 30px;
    letter-spacing: 4px;
    text-transform: uppercase;
    font-weight: 300;
    opacity: 0;
    animation: socrate-fadeIn 2s ease forwards 0.8s;
  }
  #socrate-rules-overlay p.socrate-sub strong {
    color: #00f0ff;
    font-weight: 600;
    text-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
  }
  #socrate-rules-overlay p.socrate-exit-hint {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 16px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 300;
    opacity: 0;
    animation: socrate-fadeIn 2s ease forwards 1.1s;
    cursor: pointer;
  }
  #socrate-rules-overlay p.socrate-exit-hint strong {
    color: #ff007f;
    font-weight: 700;
    text-shadow: 0 0 10px rgba(255, 0, 127, 0.6);
  }
  #socrate-rules-overlay .socrate-instructions {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.8rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    pointer-events: none;
    animation: socrate-pulse 2s infinite;
    text-align: center;
    white-space: nowrap;
  }
  @keyframes socrate-wave {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-25px); }
  }
  @keyframes socrate-fadeIn {
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes socrate-pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.8; }
  }
  @media (max-width: 768px) {
    #socrate-rules-overlay h1.socrate-title {
      font-size: 3rem;
      letter-spacing: 6px;
    }
    #socrate-rules-overlay p.socrate-sub {
      font-size: 0.85rem;
      letter-spacing: 2px;
    }
    #socrate-rules-overlay p.socrate-exit-hint {
      font-size: 0.75rem;
      letter-spacing: 1px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    #socrate-rules-overlay,
    #socrate-rules-overlay * {
      animation: none !important;
      transition: none !important;
    }
    #socrate-rules-overlay p.socrate-sub,
    #socrate-rules-overlay p.socrate-exit-hint {
      opacity: 1;
    }
    #socrate-rules-overlay h1.socrate-title:hover {
      transform: none;
    }
  }
`;

type OverlayRoot = ShadowRoot | HTMLElement | Document;

/** Crée un élément avec une classe et des enfants (texte ou nœuds), sans jamais interpréter de HTML. */
function createEl<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string | null,
  ...children: Array<Node | string>
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (className) el.className = className;
  el.append(...children);
  return el;
}

function findOverlay(container: ParentNode): HTMLElement | null {
  return container.querySelector<HTMLElement>(`#${OVERLAY_ID}`);
}

function prefersReducedMotion(): boolean {
  try {
    return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

/**
 * Affiche l'overlay « Socrate Rules » dans `targetRoot` et renvoie sa fonction de fermeture
 * (idempotente). L'appelant la conserve et l'appelle quand il est détaché du document ;
 * à défaut, la boucle d'animation se termine d'elle-même dès que l'overlay n'est plus connecté.
 */
export function launchSocrateRulesEasterEgg(targetRoot: OverlayRoot): () => void {
  const container: ShadowRoot | HTMLElement = targetRoot instanceof Document ? targetRoot.body : targetRoot;
  const existing = findOverlay(container);
  if (existing) {
    return activeOverlays.get(existing) ?? (() => existing.remove());
  }

  const reduceMotion = prefersReducedMotion();

  // 1. Construction de l'overlay (styles statiques, textes via textContent)
  const overlay = createEl('div', null);
  overlay.id = OVERLAY_ID;
  overlay.tabIndex = -1;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Socrate Rules');

  const style = document.createElement('style');
  style.textContent = OVERLAY_STYLES;

  const canvas = createEl('canvas', null);
  canvas.setAttribute('aria-hidden', 'true');

  const title = createEl('h1', 'socrate-title');
  let globalCharIndex = 0;
  for (const lineText of ['Socrate', 'Rules']) {
    const line = createEl('span', 'socrate-line');
    for (const char of lineText) {
      const letter = createEl('span', 'socrate-letter', char === ' ' ? ' ' : char);
      letter.style.animationDelay = `${globalCharIndex * 0.07}s`;
      line.appendChild(letter);
      globalCharIndex++;
    }
    title.appendChild(line);
  }

  const sub = createEl('p', 'socrate-sub',
    'Une expérience visuelle ', createEl('strong', null, 'hautement philosophique'), '.');
  const exitHint = createEl('p', 'socrate-exit-hint',
    'Cliquez 3 fois sur ', createEl('strong', null, 'SOCRATE RULES'), ' ou appuyez sur Échap pour quitter');
  const content = createEl('div', 'socrate-container', title, sub, exitHint);
  overlay.append(style, canvas, content);
  if (!reduceMotion) {
    overlay.appendChild(createEl('div', 'socrate-instructions', 'Bougez le pointeur & touchez n\'importe où'));
  }

  container.appendChild(overlay);
  overlay.focus({ preventScroll: true });

  // Fondu d'apparition
  let fadeId: number | null = null;
  if (reduceMotion) {
    overlay.style.opacity = '1';
  } else {
    fadeId = requestAnimationFrame(() => {
      fadeId = null;
      overlay.style.opacity = '1';
    });
  }

  const TWO_PI = Math.PI * 2;
  const ctx = canvas.getContext('2d');

  // Système de particules
  let particlesArray: Particle[] = [];
  let sparksArray: Spark[] = [];
  let animId: number | null = null;
  let exitTimer: ReturnType<typeof setTimeout> | null = null;
  let isClosing = false;
  let closed = false;

  const mouse: { x: number | null; y: number | null; radius: number; radiusSq: number } = {
    x: null,
    y: null,
    radius: 150,
    radiusSq: 22500,
  };

  class Particle {
    x: number;
    y: number;
    directionX: number;
    directionY: number;
    size: number;
    color: string;
    originalSize: number;

    constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
      this.originalSize = size;
    }

    draw(c: CanvasRenderingContext2D) {
      c.beginPath();
      c.arc(this.x, this.y, this.size, 0, TWO_PI, false);
      c.fillStyle = this.color;
      c.fill();
    }

    update(c: CanvasRenderingContext2D) {
      if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
      if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
      this.x += this.directionX;
      this.y += this.directionY;

      if (mouse.x != null && mouse.y != null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distanceSq = dx * dx + dy * dy;
        if (distanceSq < mouse.radiusSq) {
          const distance = Math.sqrt(distanceSq) || 1;
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= forceDirectionX * force * 3;
          this.y -= forceDirectionY * force * 3;
          if (this.size < this.originalSize * 3.5) this.size += 0.2;
        } else if (this.size > this.originalSize) {
          this.size -= 0.1;
        }
      } else if (this.size > this.originalSize) {
        this.size -= 0.1;
      }
      this.draw(c);
    }
  }

  class Spark {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    alpha: number;
    decay: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 6 + 2;
      this.speedX = (Math.random() - 0.5) * 12;
      this.speedY = (Math.random() - 0.5) * 12;
      const colors = ['#ff007f', '#7f00ff', '#00f0ff', '#ffffff'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = 1;
      this.decay = Math.random() * 0.015 + 0.01;
    }

    update(c: CanvasRenderingContext2D) {
      this.x += this.speedX;
      this.y += this.speedY;
      this.speedX *= 0.98;
      this.speedY *= 0.98;
      this.alpha -= this.decay;
      if (this.alpha > 0) {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, TWO_PI);
        c.fillStyle = this.color;
        c.shadowBlur = 15;
        c.shadowColor = this.color;
        c.fill();
        c.restore();
      }
    }
  }

  function initParticles() {
    particlesArray = [];
    const baseParticles = (canvas.width * canvas.height) / 9000;
    const numberOfParticles = Math.min(baseParticles, 250);
    const colorPalette = ['rgba(127, 0, 255, 0.4)', 'rgba(0, 240, 255, 0.3)', 'rgba(255, 0, 127, 0.3)'];
    for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * 2 + 0.5;
      const x = Math.random() * (canvas.width - size * 4) + size * 2;
      const y = Math.random() * (canvas.height - size * 4) + size * 2;
      const directionX = Math.random() * 0.4 - 0.2;
      const directionY = Math.random() * 0.4 - 0.2;
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
  }

  function connectParticles(c: CanvasRenderingContext2D) {
    const maxDistance = 120;
    const maxDistanceSq = maxDistance * maxDistance;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a + 1; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x;
        const dy = particlesArray[a].y - particlesArray[b].y;
        const distanceSq = dx * dx + dy * dy;
        if (distanceSq < maxDistanceSq) {
          const distance = Math.sqrt(distanceSq);
          const opacity = (1 - distance / maxDistance) * 0.15;
          c.strokeStyle = `rgba(127, 0, 255, ${opacity})`;
          c.lineWidth = 0.5;
          c.beginPath();
          c.moveTo(particlesArray[a].x, particlesArray[a].y);
          c.lineTo(particlesArray[b].x, particlesArray[b].y);
          c.stroke();
        }
      }
    }
  }

  /** Image fixe (prefers-reduced-motion) : particules et liens dessinés une seule fois. */
  function drawStaticFrame() {
    if (!ctx) return;
    ctx.fillStyle = '#030008';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (const particle of particlesArray) particle.draw(ctx);
    connectParticles(ctx);
  }

  function animate() {
    animId = null;
    // Panneau détaché (navigation HA, geste retour…) : on arrête tout, sans attendre l'appelant.
    if (!overlay.isConnected) {
      cleanup();
      return;
    }
    if (!ctx) return;
    ctx.fillStyle = 'rgba(3, 0, 8, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update(ctx);
    }

    for (let i = sparksArray.length - 1; i >= 0; i--) {
      sparksArray[i].update(ctx);
      if (sparksArray[i].alpha <= 0) {
        sparksArray.splice(i, 1);
      }
    }

    connectParticles(ctx);
    animId = requestAnimationFrame(animate);
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function addSparks(x: number, y: number, count: number) {
    if (reduceMotion) return;
    for (let i = 0; i < count; i++) {
      sparksArray.push(new Spark(x, y));
    }
  }

  // Pointeur (souris, doigt, stylet) : un seul type d'événement, donc aucun double comptage.
  function onResize() {
    if (!overlay.isConnected) {
      cleanup();
      return;
    }
    resizeCanvas();
    if (reduceMotion) {
      initParticles();
      drawStaticFrame();
    }
  }
  function onPointerMove(e: PointerEvent) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }
  function onPointerLeave() {
    mouse.x = null;
    mouse.y = null;
  }
  function onPointerUp(e: PointerEvent) {
    // Doigt ou stylet levé : plus de point d'attraction (la souris, elle, reste au-dessus).
    if (e.pointerType !== 'mouse') onPointerLeave();
  }
  function onOverlayPointerDown(e: PointerEvent) {
    if (e.button !== 0) return;
    addSparks(e.clientX, e.clientY, 30);
  }
  function onKeyDown(e: KeyboardEvent) {
    if (!overlay.isConnected) {
      cleanup();
      return;
    }
    if (isEditableTarget(e) || hasCommandModifier(e)) return;
    if (e.key === 'Escape') {
      cleanup();
    }
  }

  // Sortie : 3 appuis en moins de 2 s sur « SOCRATE RULES » (ou sur l'indication de sortie)
  let exitClicks: number[] = [];
  function onExitPointerDown(e: PointerEvent) {
    e.stopPropagation();
    if (e.button !== 0 || isClosing) return;
    const now = Date.now();
    exitClicks = exitClicks.filter((t) => now - t < 2000);
    exitClicks.push(now);
    addSparks(e.clientX, e.clientY, 70);

    if (exitClicks.length >= 3) {
      isClosing = true;
      exitClicks = [];
      if (reduceMotion) {
        cleanup();
        return;
      }
      addSparks(window.innerWidth / 2, window.innerHeight / 2, 150);
      overlay.style.transition = 'opacity 0.38s ease, transform 0.38s ease';
      overlay.style.opacity = '0';
      overlay.style.transform = 'scale(1.05)';
      exitTimer = setTimeout(cleanup, 360);
    }
  }

  function cleanup() {
    if (closed) return;
    closed = true;
    if (animId !== null) cancelAnimationFrame(animId);
    if (fadeId !== null) cancelAnimationFrame(fadeId);
    if (exitTimer !== null) clearTimeout(exitTimer);
    animId = null;
    fadeId = null;
    exitTimer = null;
    particlesArray = [];
    sparksArray = [];
    window.removeEventListener('resize', onResize);
    window.removeEventListener('keydown', onKeyDown);
    activeOverlays.delete(overlay);
    overlay.remove();
  }

  activeOverlays.set(overlay, cleanup);
  window.addEventListener('resize', onResize);
  window.addEventListener('keydown', onKeyDown);
  overlay.addEventListener('pointermove', onPointerMove);
  overlay.addEventListener('pointerleave', onPointerLeave);
  overlay.addEventListener('pointerup', onPointerUp);
  overlay.addEventListener('pointercancel', onPointerLeave);
  overlay.addEventListener('pointerdown', onOverlayPointerDown);
  title.addEventListener('pointerdown', onExitPointerDown);
  exitHint.addEventListener('pointerdown', onExitPointerDown);

  resizeCanvas();
  initParticles();
  if (reduceMotion) {
    drawStaticFrame();
  } else {
    animate();
  }
  return cleanup;
}
