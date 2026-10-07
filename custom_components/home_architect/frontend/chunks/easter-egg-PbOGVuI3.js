import{j as Y,W as oe,aG as se,r as G}from"./version-Dfk3_S2N.js";G("fr",{"ui.easter.subtitle":"Une expérience visuelle {emphasis}.","ui.easter.subtitle_emphasis":"hautement philosophique","ui.easter.exit_hint":"Cliquez 3 fois sur {title} ou appuyez sur Échap pour quitter","ui.easter.instructions":"Bougez le pointeur & touchez n'importe où"});G("en",{"ui.easter.subtitle":"A {emphasis} visual experience.","ui.easter.subtitle_emphasis":"highly philosophical","ui.easter.exit_hint":"Click {title} 3 times or press Esc to exit","ui.easter.instructions":"Move the pointer & tap anywhere"});const K="socrate-rules-overlay",N="socrate-rules-exit-hint",re="SOCRATE RULES",P=new WeakMap,ae=`
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
`;function h(r,m,...y){const c=document.createElement(r);return m&&(c.className=m),c.append(...y),c}function j(r,m,y,c){const[S,i=""]=Y(m).split(`{${y}}`);return h("p",r,S,h("strong",null,c),i)}function V(){let r=document.activeElement;for(;r?.shadowRoot?.activeElement;)r=r.shadowRoot.activeElement;return r instanceof HTMLElement&&r!==document.body?r:null}function le(r){return r.querySelector(`#${K}`)}function ce(){try{return typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function de(r){const m=r instanceof Document?r.body:r,y=le(m);if(y)return P.get(y)??(()=>y.remove());const c=ce(),S=V(),i=h("div",null);i.id=K,i.tabIndex=-1,i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","Socrate Rules"),i.setAttribute("aria-describedby",N);const D=document.createElement("style");D.textContent=ae;const l=h("canvas",null);l.setAttribute("aria-hidden","true");const k=h("h1","socrate-title");k.setAttribute("aria-label","Socrate Rules");let I=0;for(const e of["Socrate","Rules"]){const t=h("span","socrate-line");for(const o of e){const n=h("span","socrate-letter",o===" "?" ":o);n.style.animationDelay=`${I*.07}s`,t.appendChild(n),I++}k.appendChild(t)}const J=j("socrate-sub","ui.easter.subtitle","emphasis",Y("ui.easter.subtitle_emphasis")),T=j("socrate-exit-hint","ui.easter.exit_hint","title",re);T.id=N;const Q=h("div","socrate-container",k,J,T);if(i.append(D,l,Q),!c){const e=h("div","socrate-instructions",Y("ui.easter.instructions"));e.setAttribute("aria-hidden","true"),i.appendChild(e)}m.appendChild(i),i.focus({preventScroll:!0});let v=null;c?i.style.opacity="1":v=requestAnimationFrame(()=>{v=null,i.style.opacity="1"});const X=Math.PI*2,u=l.getContext("2d");let a=[],w=[],b=null,M=null,q=!1,R=!1;const d={x:null,y:null,radius:150,radiusSq:22500};class Z{constructor(t,o,n,s,p,x){this.x=t,this.y=o,this.directionX=n,this.directionY=s,this.size=p,this.color=x,this.originalSize=p}draw(t){t.beginPath(),t.arc(this.x,this.y,this.size,0,X,!1),t.fillStyle=this.color,t.fill()}update(t){if((this.x>l.width||this.x<0)&&(this.directionX=-this.directionX),(this.y>l.height||this.y<0)&&(this.directionY=-this.directionY),this.x+=this.directionX,this.y+=this.directionY,d.x!=null&&d.y!=null){const o=d.x-this.x,n=d.y-this.y,s=o*o+n*n;if(s<d.radiusSq){const p=Math.sqrt(s)||1,x=o/p,g=n/p,E=(d.radius-p)/d.radius;this.x-=x*E*3,this.y-=g*E*3,this.size<this.originalSize*3.5&&(this.size+=.2)}else this.size>this.originalSize&&(this.size-=.1)}else this.size>this.originalSize&&(this.size-=.1);this.draw(t)}}class ee{constructor(t,o){this.x=t,this.y=o,this.size=Math.random()*6+2,this.speedX=(Math.random()-.5)*12,this.speedY=(Math.random()-.5)*12;const n=["#ff007f","#7f00ff","#00f0ff","#ffffff"];this.color=n[Math.floor(Math.random()*n.length)],this.alpha=1,this.decay=Math.random()*.015+.01}update(t){this.x+=this.speedX,this.y+=this.speedY,this.speedX*=.98,this.speedY*=.98,this.alpha-=this.decay,this.alpha>0&&(t.save(),t.globalAlpha=this.alpha,t.beginPath(),t.arc(this.x,this.y,this.size,0,X),t.fillStyle=this.color,t.shadowBlur=15,t.shadowColor=this.color,t.fill(),t.restore())}}function _(){a=[];const e=l.width*l.height/9e3,t=Math.min(e,250),o=["rgba(127, 0, 255, 0.4)","rgba(0, 240, 255, 0.3)","rgba(255, 0, 127, 0.3)"];for(let n=0;n<t;n++){const s=Math.random()*2+.5,p=Math.random()*(l.width-s*4)+s*2,x=Math.random()*(l.height-s*4)+s*2,g=Math.random()*.4-.2,E=Math.random()*.4-.2,L=o[Math.floor(Math.random()*o.length)];a.push(new Z(p,x,g,E,s,L))}}function F(e){for(let n=0;n<a.length;n++)for(let s=n+1;s<a.length;s++){const p=a[n].x-a[s].x,x=a[n].y-a[s].y,g=p*p+x*x;if(g<14400){const L=(1-Math.sqrt(g)/120)*.15;e.strokeStyle=`rgba(127, 0, 255, ${L})`,e.lineWidth=.5,e.beginPath(),e.moveTo(a[n].x,a[n].y),e.lineTo(a[s].x,a[s].y),e.stroke()}}}function O(){if(u){u.fillStyle="#030008",u.fillRect(0,0,l.width,l.height);for(const e of a)e.draw(u);F(u)}}function H(){if(b=null,!i.isConnected){f();return}if(u){u.fillStyle="rgba(3, 0, 8, 0.15)",u.fillRect(0,0,l.width,l.height);for(let e=0;e<a.length;e++)a[e].update(u);for(let e=w.length-1;e>=0;e--)w[e].update(u),w[e].alpha<=0&&w.splice(e,1);F(u),b=requestAnimationFrame(H)}}function W(){l.width=window.innerWidth,l.height=window.innerHeight}function A(e,t,o){if(!c)for(let n=0;n<o;n++)w.push(new ee(e,t))}function U(){if(!i.isConnected){f();return}W(),c&&(_(),O())}function te(e){d.x=e.clientX,d.y=e.clientY}function C(){d.x=null,d.y=null}function ie(e){e.pointerType!=="mouse"&&C()}function ne(e){e.button===0&&A(e.clientX,e.clientY,30)}function $(e){if(!i.isConnected){f();return}if(e.key==="Tab"){e.preventDefault(),i.focus({preventScroll:!0});return}oe(e)||se(e)||e.key==="Escape"&&f()}let z=[];function B(e){if(e.stopPropagation(),e.button!==0||q)return;const t=Date.now();if(z=z.filter(o=>t-o<2e3),z.push(t),A(e.clientX,e.clientY,70),z.length>=3){if(q=!0,z=[],c){f();return}A(window.innerWidth/2,window.innerHeight/2,150),i.style.transition="opacity 0.38s ease, transform 0.38s ease",i.style.opacity="0",i.style.transform="scale(1.05)",M=setTimeout(f,360)}}function f(){if(R)return;R=!0,b!==null&&cancelAnimationFrame(b),v!==null&&cancelAnimationFrame(v),M!==null&&clearTimeout(M),b=null,v=null,M=null,a=[],w=[],window.removeEventListener("resize",U),window.removeEventListener("keydown",$),P.delete(i);const e=i.contains(V());i.remove(),e&&S?.isConnected&&S.focus({preventScroll:!0})}return P.set(i,f),window.addEventListener("resize",U),window.addEventListener("keydown",$),i.addEventListener("pointermove",te),i.addEventListener("pointerleave",C),i.addEventListener("pointerup",ie),i.addEventListener("pointercancel",C),i.addEventListener("pointerdown",ne),k.addEventListener("pointerdown",B),T.addEventListener("pointerdown",B),W(),_(),c?O():H(),f}export{de as launchSocrateRulesEasterEgg};
