/**
 * 🎆 SOCRATE RULES - EASTER EGG MODULE
 * Module officiel de la suite DomoLink
 */

export function launchSocrateRulesEasterEgg(targetRoot: ShadowRoot | HTMLElement | Document): void {
  if (
    (targetRoot as any).getElementById?.('socrate-rules-overlay') ||
    (targetRoot as any).querySelector?.('#socrate-rules-overlay')
  ) {
    return;
  }

  // 1. Inject fonts in document head if not present
  if (!document.getElementById('socrate-rules-fonts')) {
    const fontLink = document.createElement('link');
    fontLink.id = 'socrate-rules-fonts';
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@500;900&family=Poppins:wght@300;600&display=swap';
    document.head.appendChild(fontLink);
  }

  // 2. Create fullscreen overlay
  const overlay = document.createElement('div');
  overlay.id = 'socrate-rules-overlay';
  overlay.innerHTML = `
    <style>
      #socrate-rules-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999999;
        background-color: #030008;
        font-family: 'Poppins', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        user-select: none;
        -webkit-user-select: none;
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
        font-family: 'Orbitron', sans-serif;
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
    </style>
    <canvas id="socrateParticleCanvas"></canvas>
    <div class="socrate-container">
      <h1 class="socrate-title" id="socrateTitle">Socrate Rules</h1>
      <p class="socrate-sub" id="socrateSub">Une expérience visuelle <strong>hautement philosophique</strong>.</p>
      <p class="socrate-exit-hint" id="socrateExitHint">Cliquez 3 fois sur <strong>SOCRATE RULES</strong> pour quitter</p>
    </div>
    <div class="socrate-instructions" id="socrateInstructions">Bougez votre souris & cliquez n'importe où</div>
  `;

  targetRoot.appendChild(overlay);

  // Fade in animation
  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
  });

  const canvas = overlay.querySelector('#socrateParticleCanvas') as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext('2d')!;
  const title = overlay.querySelector('#socrateTitle') as HTMLElement;
  const TWO_PI = Math.PI * 2;

  // Wave letter splitting
  const lines = ['Socrate', 'Rules'];
  title.innerHTML = '';
  let globalCharIndex = 0;
  lines.forEach((lineText) => {
    const lineDiv = document.createElement('div');
    lineDiv.style.display = 'block';
    [...lineText].forEach((char) => {
      const span = document.createElement('span');
      if (char === ' ') {
        span.innerHTML = '&nbsp;';
      } else {
        span.textContent = char;
      }
      span.classList.add('socrate-letter');
      span.style.animationDelay = `${globalCharIndex * 0.07}s`;
      lineDiv.appendChild(span);
      globalCharIndex++;
    });
    title.appendChild(lineDiv);
  });

  // Particles system
  let particlesArray: Particle[] = [];
  let sparksArray: Spark[] = [];
  let animId: number | null = null;
  let isClosing = false;

  let mouse: { x: number | null; y: number | null; radius: number; radiusSq: number } = {
    x: null,
    y: null,
    radius: 150,
    radiusSq: 22500,
  };

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();

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

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, TWO_PI, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
      if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
      this.x += this.directionX;
      this.y += this.directionY;

      if (mouse.x != null && mouse.y != null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distanceSq = dx * dx + dy * dy;
        if (distanceSq < mouse.radiusSq) {
          let distance = Math.sqrt(distanceSq);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let force = (mouse.radius - distance) / mouse.radius;
          this.x -= forceDirectionX * force * 3;
          this.y -= forceDirectionY * force * 3;
          if (this.size < this.originalSize * 3.5) this.size += 0.2;
        } else if (this.size > this.originalSize) {
          this.size -= 0.1;
        }
      } else if (this.size > this.originalSize) {
        this.size -= 0.1;
      }
      this.draw();
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

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.speedX *= 0.98;
      this.speedY *= 0.98;
      this.alpha -= this.decay;
      if (this.alpha > 0) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, TWO_PI);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }
  }

  function initParticles() {
    particlesArray = [];
    let baseParticles = (canvas.width * canvas.height) / 9000;
    let numberOfParticles = Math.min(baseParticles, 250);
    for (let i = 0; i < numberOfParticles; i++) {
      let size = Math.random() * 2 + 0.5;
      let x = Math.random() * (canvas.width - size * 4) + size * 2;
      let y = Math.random() * (canvas.height - size * 4) + size * 2;
      let directionX = Math.random() * 0.4 - 0.2;
      let directionY = Math.random() * 0.4 - 0.2;
      let colorPalette = ['rgba(127, 0, 255, 0.4)', 'rgba(0, 240, 255, 0.3)', 'rgba(255, 0, 127, 0.3)'];
      let color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
  }

  function connectParticles() {
    let maxDistance = 120;
    let maxDistanceSq = maxDistance * maxDistance;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a + 1; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distanceSq = dx * dx + dy * dy;
        if (distanceSq < maxDistanceSq) {
          let distance = Math.sqrt(distanceSq);
          let opacity = (1 - distance / maxDistance) * 0.15;
          ctx.strokeStyle = `rgba(127, 0, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.fillStyle = 'rgba(3, 0, 8, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }

    for (let i = sparksArray.length - 1; i >= 0; i--) {
      sparksArray[i].update();
      if (sparksArray[i].alpha <= 0) {
        sparksArray.splice(i, 1);
      }
    }

    connectParticles();
    animId = requestAnimationFrame(animate);
  }

  // Mouse & Touch events
  function onMouseMove(e: MouseEvent) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }
  function onMouseOut() {
    mouse.x = null;
    mouse.y = null;
  }
  function onTouchMove(e: TouchEvent) {
    if (e.touches && e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }
  function onTouchEnd() {
    mouse.x = null;
    mouse.y = null;
  }
  function onOverlayClick(e: MouseEvent) {
    const x = e.clientX || window.innerWidth / 2;
    const y = e.clientY || window.innerHeight / 2;
    for (let i = 0; i < 30; i++) {
      sparksArray.push(new Spark(x, y));
    }
  }
  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      cleanup();
    }
  }

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseout', onMouseOut);
  window.addEventListener('touchmove', onTouchMove, { passive: true });
  window.addEventListener('touchend', onTouchEnd, { passive: true });
  window.addEventListener('keydown', onKeyDown);
  overlay.addEventListener('click', onOverlayClick);

  // Exit trigger: 3 clicks in < 2s on "SOCRATE RULES"
  let exitClicks: number[] = [];
  function handleExitClick(clientX: number | null, clientY: number | null) {
    if (isClosing) return;
    const now = Date.now();
    exitClicks = exitClicks.filter((t) => now - t < 2000);
    exitClicks.push(now);

    const x = clientX || window.innerWidth / 2;
    const y = clientY || window.innerHeight / 2;
    for (let i = 0; i < 70; i++) {
      sparksArray.push(new Spark(x, y));
    }

    if (exitClicks.length >= 3) {
      isClosing = true;
      exitClicks = [];
      for (let i = 0; i < 150; i++) {
        sparksArray.push(new Spark(window.innerWidth / 2, window.innerHeight / 2));
      }
      overlay.style.transition = 'opacity 0.38s ease, transform 0.38s ease';
      overlay.style.opacity = '0';
      overlay.style.transform = 'scale(1.05)';
      setTimeout(() => {
        cleanup();
      }, 360);
    }
  }

  title.addEventListener('click', (e) => {
    e.stopPropagation();
    handleExitClick(e.clientX, e.clientY);
  });
  title.addEventListener(
    'touchstart',
    (e: any) => {
      e.stopPropagation();
      const touch = e.touches && e.touches[0];
      handleExitClick(touch ? touch.clientX : null, touch ? touch.clientY : null);
    },
    { passive: true }
  );

  const exitHint = overlay.querySelector('#socrateExitHint');
  if (exitHint) {
    exitHint.addEventListener('click', (e: any) => {
      e.stopPropagation();
      handleExitClick(e.clientX, e.clientY);
    });
    exitHint.addEventListener(
      'touchstart',
      (e: any) => {
        e.stopPropagation();
        const touch = e.touches && e.touches[0];
        handleExitClick(touch ? touch.clientX : null, touch ? touch.clientY : null);
      },
      { passive: true }
    );
  }

  function cleanup() {
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
    window.removeEventListener('resize', resizeCanvas);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseout', onMouseOut);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('keydown', onKeyDown);
    if (overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
  }

  initParticles();
  animate();
}
