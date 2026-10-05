import{j as Ws,E as ot,A as _,w as Jt,i as Se,a as ye,b as f,n as O,d as w,e as Ae,k as fs,F as wi,m as Gs,o as Vs,p as Re,q as gs,u as ve,S as we,v as Ys,x as wt,y as Xs,z as Qt,H as xe,M as Et,B as mt,C as rt,G as Ks,I as Zs,J as Js,K as ki,L as Qs,N as ms,O as bs,P as vs,Q as Bt,R as bt,D as ke,T as kt,U as Ye,l as Ut,V as eo,W as $e,X as to,f as io,r as so,Y as oo,Z as no,_ as qt,$ as ct,a0 as ao,g as Xe,a1 as ro,a2 as lo,c as co,a3 as uo,a4 as po,a5 as ho,a6 as fo,a7 as Ht,s as go,a8 as mo,a9 as bo,aa as vo,ab as xo,ac as ie,ad as yo,h as wo}from"./chunks/version-DwWRb8cA.js";const Fe={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},xs=n=>(...e)=>({_$litDirective$:n,values:e});let ys=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};const{I:ko}=Ws,$i=n=>n,$o=n=>n.strings===void 0,Mi=()=>document.createComment(""),Ke=(n,e,t)=>{const i=n._$AA.parentNode,s=e===void 0?n._$AB:e._$AA;if(t===void 0){const o=i.insertBefore(Mi(),s),a=i.insertBefore(Mi(),s);t=new ko(o,a,n,n.options)}else{const o=t._$AB.nextSibling,a=t._$AM,r=a!==n;if(r){let l;t._$AQ?.(n),t._$AM=n,t._$AP!==void 0&&(l=n._$AU)!==a._$AU&&t._$AP(l)}if(o!==s||r){let l=t._$AA;for(;l!==o;){const c=$i(l).nextSibling;$i(i).insertBefore(l,s),l=c}}}return t},je=(n,e,t=n)=>(n._$AI(e,t),n),Mo={},ws=(n,e=Mo)=>n._$AH=e,So=n=>n._$AH,Tt=n=>{n._$AR(),n._$AA.remove()};const _e=xs(class extends ys{constructor(n){if(super(n),n.type!==Fe.PROPERTY&&n.type!==Fe.ATTRIBUTE&&n.type!==Fe.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!$o(n))throw Error("`live` bindings can only contain a single expression")}render(n){return n}update(n,[e]){if(e===ot||e===_)return e;const t=n.element,i=n.name;if(n.type===Fe.PROPERTY){if(e===t[i])return ot}else if(n.type===Fe.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(i))return ot}else if(n.type===Fe.ATTRIBUTE&&t.getAttribute(i)===e+"")return ot;return ws(n),e}});var Co=Object.defineProperty,ge=(n,e,t,i)=>{for(var s=void 0,o=n.length-1,a;o>=0;o--)(a=n[o])&&(s=a(e,t,s)||s);return s&&Co(e,t,s),s};const Io=Object.freeze({select:"v",wall:"w",door:"d",rescale:"s"}),Si=[{value:.05,label:"5 cm"},{value:.1,label:"10 cm"},{value:.25,label:"25 cm"},{value:.5,label:"50 cm"},{value:1,label:"1 m"}],Dt={size:.5,subdivisions:2,snapToGrid:!0,snapToAngles:!0,snapToElements:!0},Wt="home_architect_toolbar_pos",Ze={x:20,y:20},ae=8,dt=10,Eo=300,To=120;function Ue(n,e){return Math.abs(n-e)<1e-6}function Ci(n,e,t){return Math.min(t,Math.max(e,n))}function Do(){try{const n=localStorage.getItem(Wt);if(!n)return null;const e=JSON.parse(n);if(typeof e=="object"&&e!==null){const{x:t,y:i}=e;if(typeof t=="number"&&typeof i=="number"&&Number.isFinite(t)&&Number.isFinite(i))return{x:t,y:i}}}catch{}return null}function Ii(n){try{n?localStorage.setItem(Wt,JSON.stringify(n)):localStorage.removeItem(Wt)}catch{}}const Ei=Jt`<polygon points="4,18 3,7 11,3 20,7 19,18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`,Ti=Jt`<rect x="3.5" y="5.5" width="17" height="13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-dasharray="3 2"/>`,zo=Jt`<path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18" fill="none" stroke="currentColor" stroke-width="1.5"/>`,li=class li extends Se{constructor(){super(...arguments),this.activeTool="wall",this.canUndo=!1,this.canRedo=!1,this.currentThickness=.2,this.doorFlipSide=!1,this.doorFlipDirection=!0,this.windowSashCount=1,this.grid=Dt,this.narrow=!1,this.readOnly=!1,this.isDragging=!1,this.activeSubmenu="none",this.preferredPosition={...Ze},this.position={...Ze},this.dragStartPointer={x:0,y:0},this.dragStartPosition={...Ze},this.resizeObserver=null,this.lastRoomTool="room",this.handleWindowPointerDown=e=>{this.activeSubmenu!=="none"&&!e.composedPath().includes(this)&&(this.activeSubmenu="none")},this.handleLayoutChange=()=>{this.isDragging||(this.applyPosition(),this.activeSubmenu!=="none"&&this.positionFlyout())}}connectedCallback(){super.connectedCallback(),this.preferredPosition=Do()??{...Ze},this.setHostPosition(this.preferredPosition),window.addEventListener("pointerdown",this.handleWindowPointerDown);const e=this.getBoundsElement();typeof ResizeObserver<"u"&&e?(this.resizeObserver=new ResizeObserver(this.handleLayoutChange),this.resizeObserver.observe(e)):window.addEventListener("resize",this.handleLayoutChange)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("pointerdown",this.handleWindowPointerDown),window.removeEventListener("resize",this.handleLayoutChange),this.resizeObserver?.disconnect(),this.resizeObserver=null}firstUpdated(){this.applyPosition()}willUpdate(e){e.has("readOnly")&&this.readOnly&&(this.activeSubmenu="none"),e.has("activeTool")&&(this.activeTool==="room"||this.activeTool==="rect_room")&&(this.lastRoomTool=this.activeTool)}updated(e){super.updated(e),(e.has("narrow")||e.has("readOnly"))&&this.applyPosition(),e.has("activeSubmenu")&&this.activeSubmenu!=="none"&&this.positionFlyout()}getBoundsElement(){if(this.parentElement)return this.parentElement;const e=this.getRootNode();return e instanceof ShadowRoot?e.host:null}getBoundsRect(){const e=this.getBoundsElement()?.getBoundingClientRect();return e&&e.width>0&&e.height>0?e:null}setHostPosition(e){this.position=e,this.style.left=`${e.x}px`,this.style.top=`${e.y}px`}clampPosition(e,t){const i=Math.max(ae,t.width-this.offsetWidth-ae),s=Math.max(ae,t.height-this.offsetHeight-ae);return{x:Math.round(Ci(e.x,ae,i)),y:Math.round(Ci(e.y,ae,s))}}applyPosition(){const e=this.getBoundsRect();if(!e){this.setHostPosition(this.preferredPosition);return}this.style.maxHeight=`${Math.max(To,e.height-2*ae)}px`,this.setHostPosition(this.clampPosition(this.preferredPosition,e))}handleDragStart(e){if(e.button!==0)return;e.preventDefault(),e.stopPropagation(),this.activeSubmenu="none",this.isDragging=!0,this.dragStartPointer={x:e.clientX,y:e.clientY},this.dragStartPosition={...this.position},e.currentTarget.setPointerCapture(e.pointerId)}handleDragMove(e){if(!this.isDragging)return;e.preventDefault(),e.stopPropagation();const t={x:this.dragStartPosition.x+e.clientX-this.dragStartPointer.x,y:this.dragStartPosition.y+e.clientY-this.dragStartPointer.y},i=this.getBoundsRect(),s=i?this.clampPosition(t,i):t;this.preferredPosition=s,this.setHostPosition(s)}handleDragEnd(e){if(this.isDragging){this.isDragging=!1;try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}Ii(this.preferredPosition)}}resetPosition(){this.preferredPosition={...Ze},Ii(null),this.applyPosition()}positionFlyout(){const e=this.renderRoot.querySelector(".flyout-menu"),t=this.renderRoot.querySelector(`[data-submenu="${this.activeSubmenu}"]`);if(!e||!t)return;const i=this.getBoundingClientRect(),s=t.getBoundingClientRect(),o=this.getBoundsRect()??new DOMRect(0,0,window.innerWidth,window.innerHeight),a=Math.max(160,Math.min(Eo,o.width-2*ae));e.style.width=`${a}px`;const r=o.right-ae-(i.right+dt),l=i.left-dt-(o.left+ae);let c;r>=a?c=i.width+dt:l>=a?c=-dt-a:c=(r>=l?o.right-ae-a:o.left+ae)-i.left,e.style.left=`${Math.round(c)}px`;const u=Math.max(120,o.height-2*ae);e.style.maxHeight=`${u}px`;const d=Math.min(e.offsetHeight,u);let g=s.top-6;g=Math.min(g,o.bottom-ae-d),g=Math.max(g,o.top+ae),e.style.top=`${Math.round(g-i.top)}px`}selectTool(e){this.dispatchEvent(new CustomEvent("tool-selected",{detail:{tool:e},bubbles:!0,composed:!0}))}closeSubmenu(){this.activeSubmenu="none"}toggleSubmenu(e,t){t.stopPropagation(),this.activeSubmenu=this.activeSubmenu===e?"none":e}selectDoorOption(e,t){this.dispatchEvent(new CustomEvent("door-config-changed",{detail:{flipSide:e,flipDirection:t},bubbles:!0,composed:!0})),this.selectTool("door"),this.activeSubmenu="none"}selectWindowOption(e,t,i){this.dispatchEvent(new CustomEvent("window-config-changed",{detail:{type:e,sashCount:t,width:i},bubbles:!0,composed:!0})),this.selectTool(e),this.activeSubmenu="none"}selectWallThickness(e){this.dispatchEvent(new CustomEvent("wall-thickness-changed",{detail:{thickness:e},bubbles:!0,composed:!0})),this.selectTool("wall"),this.activeSubmenu="none"}selectRoomTool(e){this.selectTool(e),this.activeSubmenu="none"}changeGrid(e){this.dispatchEvent(new CustomEvent("grid-config-changed",{detail:{grid:e},bubbles:!0,composed:!0}))}openWizard(){this.dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,composed:!0}))}openImportModal(){this.dispatchEvent(new CustomEvent("open-import-modal",{bubbles:!0,composed:!0}))}withShortcut(e,t){const i=Io[t];return i?`${e} (${i.toUpperCase()})`:e}renderFlyoutShell(e,t,i){return f`
      <div class="flyout-menu" @pointerdown=${s=>s.stopPropagation()}>
        <div class="flyout-header">
          <span class="flyout-title">
            <span>${e}</span>
            <span>${t}</span>
          </span>
          <button type="button" class="flyout-close-btn" title="Fermer" @click=${this.closeSubmenu}>✕</button>
        </div>
        ${i}
      </div>
    `}renderDoorItems(){return f`
      <!-- 1. Droite Intérieure (Poussant Droit) -->
      <button 
        type="button"
        class="flyout-item ${!this.doorFlipSide&&this.doorFlipDirection?"active":""}"
        @click=${()=>this.selectDoorOption(!1,!0)}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <line x1="-10" y1="0" x2="10" y2="0" stroke="#64748b" stroke-width="2.5"/>
            <circle cx="8" cy="0" r="1.5" fill="#f59e0b"/>
            <line x1="8" y1="0" x2="8" y2="10" stroke="#38bdf8" stroke-width="2"/>
            <path d="M -2 0 A 10 10 0 0 0 8 10" fill="none" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="2,2"/>
          </svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">Ouverture droite intérieure</div>
          <div class="flyout-item-sub">Poussant droit • Gonds à droite, s'ouvre vers l'intérieur</div>
        </div>
        ${!this.doorFlipSide&&this.doorFlipDirection?f`<span class="flyout-item-badge">Actif</span>`:_}
      </button>

      <!-- 2. Gauche Intérieure (Poussant Gauche) -->
      <button 
        type="button"
        class="flyout-item ${!this.doorFlipSide&&!this.doorFlipDirection?"active":""}"
        @click=${()=>this.selectDoorOption(!1,!1)}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <line x1="-10" y1="0" x2="10" y2="0" stroke="#64748b" stroke-width="2.5"/>
            <circle cx="-8" cy="0" r="1.5" fill="#f59e0b"/>
            <line x1="-8" y1="0" x2="-8" y2="10" stroke="#38bdf8" stroke-width="2"/>
            <path d="M 2 0 A 10 10 0 0 1 -8 10" fill="none" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="2,2"/>
          </svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">Ouverture gauche intérieure</div>
          <div class="flyout-item-sub">Poussant gauche • Gonds à gauche, s'ouvre vers l'intérieur</div>
        </div>
        ${!this.doorFlipSide&&!this.doorFlipDirection?f`<span class="flyout-item-badge">Actif</span>`:_}
      </button>

      <!-- 3. Gauche Extérieure (Tirant Gauche) -->
      <button 
        type="button"
        class="flyout-item ${this.doorFlipSide&&!this.doorFlipDirection?"active":""}"
        @click=${()=>this.selectDoorOption(!0,!1)}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <line x1="-10" y1="0" x2="10" y2="0" stroke="#64748b" stroke-width="2.5"/>
            <circle cx="-8" cy="0" r="1.5" fill="#f59e0b"/>
            <line x1="-8" y1="0" x2="-8" y2="-10" stroke="#38bdf8" stroke-width="2"/>
            <path d="M 2 0 A 10 10 0 0 0 -8 -10" fill="none" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="2,2"/>
          </svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">Ouverture gauche extérieure</div>
          <div class="flyout-item-sub">Tirant gauche • Gonds à gauche, s'ouvre vers l'extérieur</div>
        </div>
        ${this.doorFlipSide&&!this.doorFlipDirection?f`<span class="flyout-item-badge">Actif</span>`:_}
      </button>

      <!-- 4. Droite Extérieure (Tirant Droit) -->
      <button 
        type="button"
        class="flyout-item ${this.doorFlipSide&&this.doorFlipDirection?"active":""}"
        @click=${()=>this.selectDoorOption(!0,!0)}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <line x1="-10" y1="0" x2="10" y2="0" stroke="#64748b" stroke-width="2.5"/>
            <circle cx="8" cy="0" r="1.5" fill="#f59e0b"/>
            <line x1="8" y1="0" x2="8" y2="-10" stroke="#38bdf8" stroke-width="2"/>
            <path d="M -2 0 A 10 10 0 0 1 8 -10" fill="none" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="2,2"/>
          </svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">Ouverture droite extérieure</div>
          <div class="flyout-item-sub">Tirant droit • Gonds à droite, s'ouvre vers l'extérieur</div>
        </div>
        ${this.doorFlipSide&&this.doorFlipDirection?f`<span class="flyout-item-badge">Actif</span>`:_}
      </button>
    `}renderWindowItems(){return f`
      <!-- 1. Fenêtre 1 ouvrant -->
      <button 
        type="button"
        class="flyout-item ${this.activeTool==="window"&&this.windowSashCount!==2?"active":""}"
        @click=${()=>this.selectWindowOption("window",1,.9)}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <rect x="-9" y="-6" width="18" height="12" fill="none" stroke="#94a3b8" stroke-width="1.8"/>
            <line x1="-9" y1="0" x2="9" y2="0" stroke="#38bdf8" stroke-width="1.5"/>
          </svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">1 ouvrant (Battant simple)</div>
          <div class="flyout-item-sub">Fenêtre standard 1 vantail (90 cm)</div>
        </div>
        <span class="flyout-item-badge">90 cm</span>
      </button>

      <!-- 2. Fenêtre 2 battants -->
      <button 
        type="button"
        class="flyout-item ${this.activeTool==="window"&&this.windowSashCount===2?"active":""}"
        @click=${()=>this.selectWindowOption("window",2,1.4)}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <rect x="-10" y="-6" width="20" height="12" fill="none" stroke="#94a3b8" stroke-width="1.8"/>
            <line x1="-10" y1="0" x2="10" y2="0" stroke="#38bdf8" stroke-width="1.5"/>
            <line x1="0" y1="-6" x2="0" y2="6" stroke="#38bdf8" stroke-width="2"/>
          </svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">2 battants (Double vantaux)</div>
          <div class="flyout-item-sub">Fenêtre large avec meneau (1.40 m)</div>
        </div>
        <span class="flyout-item-badge">1.40 m</span>
      </button>

      <!-- 3. Baie vitrée coulissante -->
      <button 
        type="button"
        class="flyout-item ${this.activeTool==="french_window"?"active":""}"
        @click=${()=>this.selectWindowOption("french_window",2,2)}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <rect x="-10" y="-6" width="20" height="12" fill="none" stroke="#94a3b8" stroke-width="1.8"/>
            <rect x="-10" y="-3" width="10" height="2" fill="#38bdf8"/>
            <rect x="0" y="2" width="10" height="2" fill="#38bdf8"/>
          </svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">Baie vitrée coulissante</div>
          <div class="flyout-item-sub">Porte-fenêtre 2 vantaux (2.00 m)</div>
        </div>
        <span class="flyout-item-badge">2.00 m</span>
      </button>
    `}renderWallItems(){return f`
      <!-- 1. Mur Fin (10 cm) -->
      <button 
        type="button"
        class="flyout-item ${Ue(this.currentThickness,.1)?"active":""}"
        @click=${()=>this.selectWallThickness(.1)}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <rect x="-10" y="-2" width="20" height="4" fill="#94a3b8" rx="1"/>
          </svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">Fin (Cloison)</div>
          <div class="flyout-item-sub">Cloisons intérieures séparatives (10 cm)</div>
        </div>
        <span class="flyout-item-badge">10 cm</span>
      </button>

      <!-- 2. Mur Moyen (20 cm) -->
      <button 
        type="button"
        class="flyout-item ${Ue(this.currentThickness,.2)?"active":""}"
        @click=${()=>this.selectWallThickness(.2)}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <rect x="-10" y="-4" width="20" height="8" fill="#38bdf8" rx="1"/>
          </svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">Moyen (Standard)</div>
          <div class="flyout-item-sub">Murs intérieurs porteurs ou standards (20 cm)</div>
        </div>
        <span class="flyout-item-badge">20 cm</span>
      </button>

      <!-- 3. Mur Gros (30 cm) -->
      <button 
        type="button"
        class="flyout-item ${Ue(this.currentThickness,.3)?"active":""}"
        @click=${()=>this.selectWallThickness(.3)}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <rect x="-10" y="-6" width="20" height="12" fill="#0284c7" stroke="#38bdf8" stroke-width="1" rx="1"/>
          </svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">Gros (Porteur / Extérieur)</div>
          <div class="flyout-item-sub">Murs de façade et gros porteurs (30 cm)</div>
        </div>
        <span class="flyout-item-badge">30 cm</span>
      </button>
    `}renderRoomItems(){return f`
      <button
        type="button"
        class="flyout-item ${this.activeTool==="room"?"active":""}"
        @click=${()=>this.selectRoomTool("room")}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" style="color: #38bdf8">${Ei}</svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">Pièce libre (polygone)</div>
          <div class="flyout-item-sub">Cliquez chaque angle ; double-cliquez ou revenez au premier point pour fermer</div>
        </div>
        ${this.activeTool==="room"?f`<span class="flyout-item-badge">Actif</span>`:_}
      </button>

      <button
        type="button"
        class="flyout-item ${this.activeTool==="rect_room"?"active":""}"
        @click=${()=>this.selectRoomTool("rect_room")}
      >
        <div class="flyout-item-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" style="color: #38bdf8">${Ti}</svg>
        </div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">Pièce rectangulaire</div>
          <div class="flyout-item-sub">Glissez d'un angle à l'angle opposé</div>
        </div>
        ${this.activeTool==="rect_room"?f`<span class="flyout-item-badge">Actif</span>`:_}
      </button>
    `}renderGridItems(){const e=this.grid??Dt,t=[{key:"snapToGrid",label:"Accrocher à la grille",sub:"Les points tombent sur les intersections de la grille"},{key:"snapToAngles",label:"Accrocher aux angles",sub:"Murs guidés à 0°, 45° et 90°"},{key:"snapToElements",label:"Accrocher aux murs et points",sub:"Alignement sur les extrémités et murs existants"}];return f`
      <div class="flyout-section-label">Taille de la grille</div>
      <div class="grid-sizes" role="group" aria-label="Taille de la grille">
        ${Si.map(i=>f`
          <button
            type="button"
            class="grid-size-btn ${Ue(e.size,i.value)?"active":""}"
            aria-pressed=${Ue(e.size,i.value)?"true":"false"}
            @click=${()=>this.changeGrid({size:i.value})}
          >${i.label}</button>
        `)}
      </div>

      <div class="flyout-section-label">Accrochages</div>
      ${t.map(i=>f`
        <label class="flyout-toggle">
          <input
            type="checkbox"
            .checked=${_e(e[i.key])}
            @change=${s=>this.changeGrid({[i.key]:s.target.checked})}
          />
          <div class="flyout-item-content">
            <div class="flyout-item-label">${i.label}</div>
            <div class="flyout-item-sub">${i.sub}</div>
          </div>
        </label>
      `)}
    `}renderFlyout(){switch(this.activeSubmenu){case"door":return this.renderFlyoutShell("🚪","Sens d'ouverture de porte",this.renderDoorItems());case"window":return this.renderFlyoutShell("🪟","Type de fenêtre",this.renderWindowItems());case"wall":return this.renderFlyoutShell("🧱","Épaisseur du mur",this.renderWallItems());case"room":return this.renderFlyoutShell("⬠","Tracer une pièce",this.renderRoomItems());case"grid":return this.renderFlyoutShell("▦","Grille et accrochages",this.renderGridItems());default:return _}}render(){const e=this.readOnly,t=this.grid??Dt,i=this.activeTool==="room"||this.activeTool==="rect_room",s=Si.find(o=>Ue(o.value,t.size))?.label??`${Math.round(t.size*100)} cm`;return f`
      <!-- Poignée de déplacement de la boîte à outils -->
      <div 
        class="drag-handle ${this.isDragging?"dragging":""}"
        @pointerdown=${this.handleDragStart}
        @pointermove=${this.handleDragMove}
        @pointerup=${this.handleDragEnd}
        @pointercancel=${this.handleDragEnd}
        @dblclick=${this.resetPosition}
        title="Glisser pour déplacer la boîte à outils (double-clic : position par défaut)"
      >
        <div class="grip-dots">•••</div>
      </div>

      ${e?f`
        <div class="read-only-badge" title="Lecture seule : l'édition est réservée aux administrateurs Home Assistant">🔒</div>
      `:_}

      <div class="tools">
        <!-- Assistant Débutant -->
        <button 
          class="tool-btn highlight" 
          ?disabled=${e}
          @click=${this.openWizard} 
          title="Assistant Débutant : Créer une pièce guidée (🪄)"
        >
          🪄
        </button>

        <div class="divider"></div>

        <!-- Annuler & Rétablir -->
        <button 
          class="tool-btn" 
          ?disabled=${e||!this.canUndo}
          @click=${()=>this.dispatchEvent(new CustomEvent("undo",{bubbles:!0,composed:!0}))}
          title="Annuler (Ctrl+Z / Cmd+Z)"
        >
          ↩️
        </button>
        <button 
          class="tool-btn" 
          ?disabled=${e||!this.canRedo}
          @click=${()=>this.dispatchEvent(new CustomEvent("redo",{bubbles:!0,composed:!0}))}
          title="Rétablir (Ctrl+Y / Cmd+Shift+Z)"
        >
          ↪️
        </button>

        <div class="divider"></div>

        <!-- Outil Sélection / Pan -->
        <button 
          class="tool-btn ${this.activeTool==="select"?"active":""}" 
          @click=${()=>{this.activeSubmenu="none",this.selectTool("select")}} 
          title=${this.withShortcut("Sélectionner & Déplacer","select")}
        >
          👆
        </button>

        <!-- Outil Mur -->
        <button 
          class="tool-btn ${this.activeTool==="wall"?"active":""} ${this.activeSubmenu==="wall"?"menu-open":""}" 
          data-submenu="wall"
          ?disabled=${e}
          @click=${o=>{this.selectTool("wall"),this.toggleSubmenu("wall",o)}} 
          title=${this.withShortcut("Tracer un mur","wall")+" - Cliquez pour choisir l'épaisseur (Fin 10cm, Moyen 20cm, Gros 30cm)"}
        >
          🧱
          <span class="submenu-indicator">▾</span>
        </button>

        <!-- Outil Pièce (polygone ou rectangle) -->
        <button 
          class="tool-btn ${i?"active":""} ${this.activeSubmenu==="room"?"menu-open":""}" 
          data-submenu="room"
          ?disabled=${e}
          @click=${o=>{this.selectTool(this.lastRoomTool),this.toggleSubmenu("room",o)}} 
          title="Tracer une pièce - Cliquez pour choisir : pièce libre (polygone) ou rectangulaire"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">${this.lastRoomTool==="rect_room"?Ti:Ei}</svg>
          <span class="submenu-indicator">▾</span>
        </button>

        <div class="divider"></div>

        <!-- Outil Porte -->
        <button 
          class="tool-btn ${this.activeTool==="door"?"active":""} ${this.activeSubmenu==="door"?"menu-open":""}" 
          data-submenu="door"
          ?disabled=${e}
          @click=${o=>{this.selectTool("door"),this.toggleSubmenu("door",o)}} 
          title=${this.withShortcut("Insérer une porte","door")+" - Cliquez pour choisir le sens d'ouverture (Droite/Gauche, Intérieur/Extérieur)"}
        >
          🚪
          <span class="submenu-indicator">▾</span>
        </button>

        <!-- Outil Fenêtre -->
        <button 
          class="tool-btn ${this.activeTool==="window"?"active":""} ${this.activeSubmenu==="window"?"menu-open":""}" 
          data-submenu="window"
          ?disabled=${e}
          @click=${o=>{this.selectTool("window"),this.toggleSubmenu("window",o)}} 
          title=${this.withShortcut("Insérer une fenêtre","window")+" - Cliquez pour choisir 1 ouvrant ou 2 battants"}
        >
          🪟
          <span class="submenu-indicator">▾</span>
        </button>

        <!-- Outil Baie vitrée / Porte-fenêtre -->
        <button 
          class="tool-btn ${this.activeTool==="french_window"?"active":""}" 
          ?disabled=${e}
          @click=${()=>{this.activeSubmenu="none",this.selectTool("french_window")}} 
          title=${this.withShortcut("Insérer une baie coulissante","french_window")}
        >
          🪞
        </button>

        <div class="divider"></div>

        <!-- Import de plan de fond & vectorisation -->
        <button 
          class="tool-btn" 
          ?disabled=${e}
          @click=${()=>{this.activeSubmenu="none",this.openImportModal()}} 
          title="Importer un plan (PNG, JPG, WebP, SVG) ou coller une image (Ctrl+V / Cmd+V)"
        >
          🖼️
        </button>

        <!-- Étalonnage d'échelle (calque image) -->
        <button 
          class="tool-btn ${this.activeTool==="calibrate"?"active":""}" 
          ?disabled=${e}
          @click=${()=>{this.activeSubmenu="none",this.selectTool("calibrate")}} 
          title=${this.withShortcut("Étalonnage d'échelle : tracer un mur mesuré sur l'image","calibrate")}
        >
          📏
        </button>

        <!-- Mettre à l'échelle le plan (Recalculer toutes les cotes) -->
        <button 
          class="tool-btn ${this.activeTool==="rescale"?"active":""}" 
          ?disabled=${e}
          @click=${()=>{this.activeSubmenu="none",this.selectTool("rescale")}} 
          title=${this.withShortcut("Mettre à l'échelle : mesurer un mur pour recalculer toutes les cotes","rescale")}
        >
          📐
        </button>

        <div class="divider"></div>

        <!-- Grille et accrochages -->
        <button 
          class="tool-btn ${this.activeSubmenu==="grid"?"menu-open":""}" 
          data-submenu="grid"
          ?disabled=${e}
          @click=${o=>this.toggleSubmenu("grid",o)} 
          title="Grille et accrochages (grille ${s}, accrochage ${t.snapToGrid?"activé":"désactivé"})"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" style="opacity: ${t.snapToGrid?1:.45}">${zo}</svg>
          <span class="submenu-indicator">▾</span>
        </button>
      </div>

      <!-- ============================================== -->
      <!-- SOUS-MENU FLYOUT                               -->
      <!-- ============================================== -->
      ${this.renderFlyout()}
    `}};li.styles=ye`
    :host {
      position: absolute;
      left: 20px;
      top: 20px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      box-sizing: border-box;
      max-height: calc(100% - 16px);
      background: rgba(30, 41, 59, 0.95);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 14px;
      padding: 6px 6px 8px 6px;
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.5), 0 0 15px rgba(2, 132, 199, 0.2);
      z-index: 40;
      user-select: none;
      touch-action: none;
    }

    .drag-handle {
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
      color: #64748b;
      border-radius: 6px;
      transition: all 0.2s ease;
      margin-bottom: 2px;
    }

    .drag-handle:hover, .drag-handle.dragging {
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.15);
    }

    .drag-handle.dragging {
      cursor: grabbing;
    }

    /* Outils : défilent verticalement quand la zone de dessin est trop basse (portable, mobile). */
    .tools {
      display: flex;
      flex-direction: column;
      gap: 5px;
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
      overscroll-behavior: contain;
      scrollbar-width: thin;
      padding: 2px;
      margin: -2px;
    }

    .read-only-badge {
      text-align: center;
      font-size: 14px;
      line-height: 1;
      padding: 2px 0 4px 0;
      cursor: help;
    }

    .grip-dots {
      font-size: 11px;
      letter-spacing: 3px;
      font-weight: 900;
      line-height: 1;
    }

    .tool-btn {
      background: transparent;
      color: #94a3b8;
      border: 1px solid transparent;
      border-radius: 10px;
      width: 42px;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 19px;
      transition: all 0.2s ease;
      position: relative;
    }

    .tool-btn:hover:not(:disabled) {
      background: rgba(51, 65, 85, 0.8);
      color: #f8fafc;
      transform: scale(1.05);
    }

    .tool-btn.active {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
    }

    .tool-btn.menu-open {
      border-color: #38bdf8;
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.6);
      background: rgba(2, 132, 199, 0.4);
    }

    .submenu-indicator {
      position: absolute;
      bottom: 2px;
      right: 3px;
      font-size: 8px;
      line-height: 1;
      opacity: 0.7;
    }

    .tool-btn.highlight {
      background: rgba(245, 158, 11, 0.15);
      border-color: rgba(245, 158, 11, 0.4);
      color: #f59e0b;
    }

    .tool-btn.highlight:hover:not(:disabled) {
      background: #f59e0b;
      color: #ffffff;
    }

    .tool-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
      transform: none !important;
    }

    .tool-btn svg {
      width: 22px;
      height: 22px;
      display: block;
    }

    .divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 3px 2px;
    }

    /* Sous-menu Flyout (position calculée par positionFlyout selon la place disponible) */
    .flyout-menu {
      position: absolute;
      top: 0;
      left: calc(100% + 10px);
      box-sizing: border-box;
      overflow-y: auto;
      overscroll-behavior: contain;
      background: rgba(15, 23, 42, 0.96);
      backdrop-filter: blur(20px);
      border: 1.5px solid rgba(56, 189, 248, 0.45);
      border-radius: 14px;
      padding: 10px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(56, 189, 248, 0.25);
      z-index: 60;
      width: 300px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      animation: flyoutIn 0.18s ease-out;
      user-select: none;
    }

    @keyframes flyoutIn {
      from { opacity: 0; transform: translateX(-8px) scale(0.97); }
      to { opacity: 1; transform: translateX(0) scale(1); }
    }

    .flyout-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2px 4px 6px 4px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 2px;
    }

    .flyout-title {
      font-size: 0.8rem;
      font-weight: 700;
      color: #38bdf8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .flyout-close-btn {
      background: transparent;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      font-size: 14px;
      padding: 2px 5px;
      border-radius: 4px;
      line-height: 1;
    }

    .flyout-close-btn:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .flyout-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(30, 41, 59, 0.65);
      color: #e2e8f0;
      cursor: pointer;
      transition: all 0.15s ease;
      text-align: left;
      width: 100%;
      font: inherit;
      flex-shrink: 0;
    }

    .flyout-item:hover {
      background: rgba(56, 189, 248, 0.18);
      border-color: rgba(56, 189, 248, 0.5);
      color: #ffffff;
      transform: translateX(2px);
    }

    .flyout-item.active {
      background: rgba(2, 132, 199, 0.35);
      border-color: #38bdf8;
      color: #ffffff;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
    }

    .flyout-item-icon {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 16px;
    }

    .flyout-item-content {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
    }

    .flyout-item-label {
      font-size: 0.84rem;
      font-weight: 700;
      color: #f1f5f9;
      line-height: 1.25;
    }

    .flyout-item-sub {
      font-size: 0.72rem;
      color: #94a3b8;
      margin-top: 2px;
      line-height: 1.25;
    }

    .flyout-section-label {
      font-size: 0.72rem;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      padding: 4px 4px 0 4px;
    }

    .grid-sizes {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 5px;
    }

    .grid-size-btn {
      background: rgba(30, 41, 59, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: #e2e8f0;
      font: inherit;
      font-size: 0.76rem;
      font-weight: 700;
      padding: 7px 2px;
      cursor: pointer;
      white-space: nowrap;
    }

    .grid-size-btn:hover {
      border-color: rgba(56, 189, 248, 0.5);
      background: rgba(56, 189, 248, 0.18);
    }

    .grid-size-btn.active {
      background: rgba(2, 132, 199, 0.35);
      border-color: #38bdf8;
      color: #ffffff;
    }

    .flyout-toggle {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 7px 10px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(30, 41, 59, 0.65);
      cursor: pointer;
      flex-shrink: 0;
    }

    .flyout-toggle input {
      width: 16px;
      height: 16px;
      accent-color: #0284c7;
      flex-shrink: 0;
      margin: 0;
    }

    .flyout-hint {
      font-size: 0.7rem;
      color: #64748b;
      padding: 0 4px;
      line-height: 1.3;
    }

    /* Mode étroit (mobile) : barre plus compacte */
    :host([narrow]) {
      padding: 4px 4px 6px 4px;
      gap: 3px;
    }

    :host([narrow]) .tools {
      gap: 3px;
    }

    :host([narrow]) .tool-btn {
      width: 36px;
      height: 36px;
      font-size: 17px;
    }

    :host([narrow]) .tool-btn svg {
      width: 19px;
      height: 19px;
    }

    .flyout-item-badge {
      font-size: 0.72rem;
      font-weight: 700;
      font-family: ui-monospace, SFMono-Regular, monospace;
      padding: 3px 8px;
      border-radius: 6px;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(56, 189, 248, 0.35);
      color: #38bdf8;
      flex-shrink: 0;
    }
  `;let re=li;ge([O({type:String})],re.prototype,"activeTool");ge([O({type:Boolean})],re.prototype,"canUndo");ge([O({type:Boolean})],re.prototype,"canRedo");ge([O({type:Number})],re.prototype,"currentThickness");ge([O({type:Boolean})],re.prototype,"doorFlipSide");ge([O({type:Boolean})],re.prototype,"doorFlipDirection");ge([O({type:Number})],re.prototype,"windowSashCount");ge([O({attribute:!1})],re.prototype,"grid");ge([O({type:Boolean,reflect:!0})],re.prototype,"narrow");ge([O({type:Boolean,attribute:"read-only",reflect:!0})],re.prototype,"readOnly");ge([w()],re.prototype,"isDragging");ge([w()],re.prototype,"activeSubmenu");Ae("home-architect-toolbar",re);const Di=(n,e,t)=>{const i=new Map;for(let s=e;s<=t;s++)i.set(n[s],s);return i},Po=xs(class extends ys{constructor(n){if(super(n),n.type!==Fe.CHILD)throw Error("repeat() can only be used in text expressions")}dt(n,e,t){let i;t===void 0?t=e:e!==void 0&&(i=e);const s=[],o=[];let a=0;for(const r of n)s[a]=i?i(r,a):a,o[a]=t(r,a),a++;return{values:o,keys:s}}render(n,e,t){return this.dt(n,e,t).values}update(n,[e,t,i]){const s=So(n),{values:o,keys:a}=this.dt(e,t,i);if(!Array.isArray(s))return this.ut=a,o;const r=this.ut??=[],l=[];let c,u,d=0,g=s.length-1,m=0,b=o.length-1;for(;d<=g&&m<=b;)if(s[d]===null)d++;else if(s[g]===null)g--;else if(r[d]===a[m])l[m]=je(s[d],o[m]),d++,m++;else if(r[g]===a[b])l[b]=je(s[g],o[b]),g--,b--;else if(r[d]===a[b])l[b]=je(s[d],o[b]),Ke(n,l[b+1],s[d]),d++,b--;else if(r[g]===a[m])l[m]=je(s[g],o[m]),Ke(n,s[d],s[g]),g--,m++;else if(c===void 0&&(c=Di(a,m,b),u=Di(r,d,g)),c.has(r[d]))if(c.has(r[g])){const p=u.get(a[m]),v=p!==void 0?s[p]:null;if(v===null){const x=Ke(n,s[d]);je(x,o[m]),l[m]=x}else l[m]=je(v,o[m]),Ke(n,s[d],v),s[p]=null;m++}else Tt(s[g]),g--;else Tt(s[d]),d++;for(;m<=b;){const p=Ke(n,l[b+1]);je(p,o[m]),l[m++]=p}for(;d<=g;){const p=s[d++];p!==null&&Tt(p)}return this.ut=a,ws(n,l),ot}});var Oo=Object.defineProperty,Ce=(n,e,t,i)=>{for(var s=void 0,o=n.length-1,a;o>=0;o--)(a=n[o])&&(s=a(e,t,s)||s);return s&&Oo(e,t,s),s};const zi=[{id:"all",label:"Tous",domains:[]},{id:"lights",label:"Lumières",domains:["light"]},{id:"switches",label:"Prises & interrupteurs",domains:["switch","input_boolean"]},{id:"sensors",label:"Capteurs",domains:["sensor","binary_sensor"]},{id:"climate",label:"Climat",domains:["climate","water_heater","humidifier"]},{id:"covers",label:"Volets & vannes",domains:["cover","valve"]},{id:"fans",label:"Ventilation",domains:["fan"]},{id:"media",label:"Médias",domains:["media_player","remote"]},{id:"security",label:"Serrures & alarmes",domains:["lock","alarm_control_panel","siren"]},{id:"cameras",label:"Caméras",domains:["camera"]},{id:"actions",label:"Scènes & scripts",domains:["scene","script","button","input_button","automation"]}],Ro={light:"💡",switch:"🔌",input_boolean:"🔘",binary_sensor:"🚨",sensor:"📊",climate:"🌡️",water_heater:"♨️",humidifier:"💧",camera:"📷",media_player:"📺",remote:"🎛️",cover:"🪟",valve:"🚰",fan:"💨",lock:"🔒",alarm_control_panel:"🛡️",siren:"📢",scene:"🎬",script:"📜",automation:"🤖",button:"🔘",input_button:"🔘",person:"👤",device_tracker:"📍",vacuum:"🧹"},Ao="⚡",ut=200,Je="",Pi=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"});function pt(n){return n.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function Oi(n){const e=n?.locale;return[n?.language,e?.language,e?.number_format,e?.time_format,e?.date_format,e?.time_zone].join("|")}function Ri(n,e){const t=n?.attributes?.friendly_name;return typeof t=="string"&&t.trim()!==""?t:e}const jo=[{id:"all",label:"Tous"},...Gs.map(n=>({id:n,label:Vs[n]??n}))],ci=class ci extends Se{constructor(){super(...arguments),this.collapsed=!1,this.activeTab="entities",this.furnitureCategory="all",this.entitySearch="",this.furnitureSearch="",this.activeCategory="all",this.areaFilter=Je,this.showSecondary=!1,this.visibleLimit=ut,this.rowsSource=null,this.rows=[],this.indexedStateCount=0,this.availableDomains=new Set,this.secondaryCount=0,this.areaOptions=null,this.filteredFor=null,this.filtered=[],this.renderedRows=null,this.renderedIds=[]}shouldUpdate(e){if(!e.has("hass")||e.size>1)return!0;if(this.collapsed||this.activeTab!=="entities")return!1;const t=e.get("hass"),i=t?.states,s=this.hass?.states;return!i||!s||t.areas!==this.hass.areas||Oi(t)!==Oi(this.hass)||this.getRows()!==this.renderedRows?!0:this.renderedIds.some(o=>i[o]!==s[o])}getRows(){const e=this.hass,t=e?.states;if(!t)return this.rowsSource=null,this.indexedStateCount=0,this.rows=[],this.availableDomains=new Set,this.secondaryCount=0,this.rows;const i=this.rowsSource;return i&&i.entities===e.entities&&i.devices===e.devices&&(i.states===t||this.hasSameEntities(t))?(i.states=t,this.rows):(this.rowsSource={states:t,entities:e.entities,devices:e.devices},this.indexedStateCount=Object.keys(t).length,this.rows=this.buildRows(t,e.entities,e.devices),this.availableDomains=new Set(this.rows.map(s=>s.domain)),this.secondaryCount=this.rows.reduce((s,o)=>s+(o.secondary?1:0),0),this.rows)}hasSameEntities(e){let t=0;for(const i in e)Object.prototype.hasOwnProperty.call(e,i)&&t++;if(t!==this.indexedStateCount)return!1;for(const i of this.rows){const s=e[i.entityId];if(!s||Ri(s,i.entityId)!==i.name)return!1}return!0}buildRows(e,t,i){const s=[];for(const o of Object.keys(e)){const a=fs(o);if(!a)continue;const r=Ri(e[o],o),l=t?.[o],c=l?.area_id??(l?.device_id?i?.[l.device_id]?.area_id:void 0);s.push({entityId:o,name:r,domain:a,areaId:typeof c=="string"&&c!==""?c:void 0,secondary:l?.hidden===!0||l?.entity_category==="diagnostic"||l?.entity_category==="config",searchText:pt(`${r} ${o}`)})}return s.sort((o,a)=>Pi.compare(o.name,a.name)||o.entityId.localeCompare(a.entityId))}getFiltered(e,t){const i=[this.entitySearch.trim(),this.activeCategory,t,this.showSecondary?"1":"0"].join("\0");if(this.filteredFor&&this.filteredFor.rows===e&&this.filteredFor.key===i)return this.filtered;const s=zi.find(r=>r.id===this.activeCategory),o=s&&s.domains.length>0?new Set(s.domains):null,a=pt(this.entitySearch.trim()).split(/\s+/).filter(Boolean);return this.filtered=e.filter(r=>(this.showSecondary||!r.secondary)&&(o===null||o.has(r.domain))&&(t===Je||r.areaId===t)&&a.every(l=>r.searchText.includes(l))),this.filteredFor={rows:e,key:i},this.filtered}getAreaOptions(e){const t=this.hass?.areas;if(this.areaOptions&&this.areaOptions.rows===e&&this.areaOptions.areas===t)return this.areaOptions.options;const i=new Set;for(const o of e)o.areaId&&i.add(o.areaId);const s=t?[...i].map(o=>({id:o,name:typeof t[o]?.name=="string"?t[o].name:o})).sort((o,a)=>Pi.compare(o.name,a.name)):[];return this.areaOptions={rows:e,areas:t,options:s},s}setEntityCriteria(e){e(),this.visibleLimit=ut}entityPayload(e){return{kind:"entity",entityId:e.entityId,domain:e.domain}}furniturePayload(e){return{kind:"furniture",furnitureType:e.type}}handleDragStart(e,t){e.dataTransfer&&(e.dataTransfer.setData("application/json",JSON.stringify(t)),e.dataTransfer.effectAllowed="copy")}pickItem(e){this.dispatchEvent(new CustomEvent("drawer-item-picked",{detail:{payload:e},bubbles:!0,composed:!0}))}handleItemKeyDown(e,t){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.pickItem(t))}toggleCollapse(){this.dispatchEvent(new CustomEvent("toggle-collapse",{bubbles:!0,composed:!0}))}formatState(e){if(!e)return"";if(typeof this.hass?.formatEntityState=="function")try{return String(this.hass.formatEntityState(e))}catch{}const t=e.attributes?.unit_of_measurement;return`${e.state}${t?" "+t:""}`}renderEntitiesTab(e){const t=this.hass?.states??{},i=this.getAreaOptions(e),s=i.some(c=>c.id===this.areaFilter)?this.areaFilter:Je,o=this.getFiltered(e,s),a=o.slice(0,this.visibleLimit),r=o.length-a.length,l=zi.filter(c=>c.domains.length===0||c.id===this.activeCategory||c.domains.some(u=>this.availableDomains.has(u)));return this.renderedRows=e,this.renderedIds=a.map(c=>c.entityId),f`
      <div class="search-section">
        <div class="search-input-wrapper">
          <input 
            type="search" 
            class="search-input" 
            placeholder="Rechercher une entité..."
            aria-label="Rechercher une entité"
            .value=${this.entitySearch}
            @input=${c=>this.setEntityCriteria(()=>this.entitySearch=c.target.value)}
          />
        </div>

        <div class="categories-bar" role="group" aria-label="Filtrer par type">
          ${l.map(c=>f`
            <button
              class="cat-btn ${this.activeCategory===c.id?"active":""}"
              aria-pressed=${this.activeCategory===c.id?"true":"false"}
              @click=${()=>this.setEntityCriteria(()=>this.activeCategory=c.id)}
            >${c.label}</button>
          `)}
        </div>

        <div class="filters-row">
          ${i.length>0?f`
            <select
              class="area-select"
              aria-label="Filtrer par zone"
              .value=${_e(s)}
              @change=${c=>this.setEntityCriteria(()=>this.areaFilter=c.target.value)}
            >
              <option value=${Je} ?selected=${s===Je}>Toutes les zones</option>
              ${i.map(c=>f`<option value=${c.id} ?selected=${s===c.id}>${c.name}</option>`)}
            </select>
          `:_}
          <label class="hidden-toggle" title="Afficher aussi les entités masquées, de diagnostic ou de configuration">
            <input
              type="checkbox"
              .checked=${this.showSecondary}
              @change=${c=>this.setEntityCriteria(()=>this.showSecondary=c.target.checked)}
            />
            <span>Masquées</span>
          </label>
        </div>
      </div>

      <div class="entities-list">
        ${this.hass?.states?o.length===0?f`
          <div class="empty-message">Aucune entité trouvée</div>
        `:f`
          <div class="results-info" aria-live="polite">
            ${o.length} entité${o.length>1?"s":""}${r>0?` (${a.length} affichées)`:""}
          </div>
          ${Po(a,c=>c.entityId,c=>{const u=t[c.entityId],d=this.entityPayload(c);return f`
              <div 
                class="entity-card" 
                draggable="true"
                tabindex="0"
                role="button"
                @dragstart=${g=>this.handleDragStart(g,d)}
                @click=${()=>this.pickItem(d)}
                @keydown=${g=>this.handleItemKeyDown(g,d)}
                title="Glissez et déposez sur une pièce du plan"
              >
                <div class="entity-info">
                  <span class="entity-icon">${Ro[c.domain]??Ao}</span>
                  <div class="entity-details">
                    <span class="entity-name">${c.name}</span>
                    <span class="entity-id">${c.entityId}</span>
                  </div>
                </div>

                <span class="entity-state-badge ${u?.state==="on"?"state-on":"state-off"}">
                  ${this.formatState(u)}
                </span>
              </div>
            `})}
          ${r>0?f`
            <button class="more-btn" @click=${()=>this.visibleLimit+=ut}>
              Afficher ${Math.min(ut,r)} de plus (${r} restante${r>1?"s":""})
            </button>
          `:_}
        `:f`
          <div class="empty-message">Connexion à Home Assistant…</div>
        `}
      </div>

      <div class="drag-hint">
        <span>👆</span>
        <span>Glissez une entité sur une pièce du plan</span>
      </div>
    `}renderFurnitureTab(){let e=wi;this.furnitureCategory!=="all"&&(e=e.filter(i=>i.category===this.furnitureCategory));const t=pt(this.furnitureSearch.trim()).split(/\s+/).filter(Boolean);return t.length>0&&(e=e.filter(i=>{const s=pt(i.name);return t.every(o=>s.includes(o))})),f`
      <div class="search-section">
        <div class="search-input-wrapper">
          <input 
            type="search" 
            class="search-input" 
            placeholder="Rechercher un meuble..."
            aria-label="Rechercher un meuble"
            .value=${this.furnitureSearch}
            @input=${i=>this.furnitureSearch=i.target.value}
          />
        </div>

        <div class="categories-bar" role="group" aria-label="Filtrer par catégorie">
          ${jo.map(i=>f`
            <button
              class="cat-btn ${this.furnitureCategory===i.id?"active":""}"
              aria-pressed=${this.furnitureCategory===i.id?"true":"false"}
              @click=${()=>this.furnitureCategory=i.id}
            >${i.label}</button>
          `)}
        </div>
      </div>

      <div class="furniture-grid">
        ${e.length===0?f`
          <div class="empty-message" style="grid-column: 1 / -1;">Aucun meuble trouvé</div>
        `:e.map(i=>{const s=this.furniturePayload(i);return f`
            <div 
              class="furniture-card" 
              draggable="true"
              tabindex="0"
              role="button"
              @dragstart=${o=>this.handleDragStart(o,s)}
              @click=${()=>this.pickItem(s)}
              @keydown=${o=>this.handleItemKeyDown(o,s)}
              title="Glissez et déposez sur le plan (${i.width.toFixed(2)} × ${i.length.toFixed(2)} m)"
            >
              <span class="furniture-card-icon">${i.icon}</span>
              <span class="furniture-card-name">${i.name}</span>
              <span class="furniture-card-dim">${i.width.toFixed(2)} × ${i.length.toFixed(2)} m</span>
            </div>
          `})}
      </div>

      <div class="drag-hint">
        <span>👆</span>
        <span>Glissez un meuble sur le plan (R pour pivoter)</span>
      </div>
    `}render(){if(this.collapsed)return _;const e=this.getRows(),t=this.showSecondary?e.length:e.length-this.secondaryCount;return f`
      <div class="drawer-header">
        <div class="drawer-title">
          <span>${this.activeTab==="entities"?"⚡":"🛋️"}</span>
          <span>${this.activeTab==="entities"?"Objets & Domotique":"Meubles & Déco"}</span>
        </div>
        <button class="btn-toggle" @click=${this.toggleCollapse} title="Masquer / Réduire le volet">
          ⇤
        </button>
      </div>

      <div class="drawer-tabs" role="tablist">
        <button 
          class="tab-btn ${this.activeTab==="entities"?"active":""}" 
          role="tab"
          aria-selected=${this.activeTab==="entities"?"true":"false"}
          @click=${()=>this.activeTab="entities"}
        >
          <span>⚡</span>
          <span>Entités HA</span>
          <span class="count-badge" title="Nombre total d'entités">${t}</span>
        </button>
        <button 
          class="tab-btn ${this.activeTab==="furniture"?"active":""}" 
          role="tab"
          aria-selected=${this.activeTab==="furniture"?"true":"false"}
          @click=${()=>this.activeTab="furniture"}
        >
          <span>🛋️</span>
          <span>Meubles</span>
          <span class="count-badge" title="Nombre total de meubles">${wi.length}</span>
        </button>
      </div>

      ${this.activeTab==="entities"?this.renderEntitiesTab(e):this.renderFurnitureTab()}
    `}};ci.styles=ye`
    :host {
      width: 320px;
      height: 100%;
      flex-shrink: 0;
      background: rgba(15, 23, 42, 0.96);
      border-left: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: -6px 0 24px rgba(0, 0, 0, 0.35);
      display: flex;
      flex-direction: column;
      z-index: 25;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: #f8fafc;
      position: relative;
      transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    :host([collapsed]) {
      width: 0 !important;
      overflow: hidden;
      border-left: none;
      box-shadow: none;
    }

    /* Écran étroit : tiroir superposé au canevas au lieu d'une colonne qui l'écrase
       (la barre d'outils et ses sous-menus restent au-dessus). */
    @media (max-width: 768px) {
      :host {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        height: auto;
        width: min(320px, calc(100% - 48px));
      }
    }

    .drawer-header {
      padding: 14px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(30, 41, 59, 0.4);
    }

    .drawer-title {
      font-size: 0.95rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #38bdf8;
    }

    .count-badge {
      font-size: 0.72rem;
      padding: 2px 7px;
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border-radius: 9999px;
      border: 1px solid rgba(56, 189, 248, 0.3);
      font-weight: 700;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .btn-toggle {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      color: #94a3b8;
      font-size: 14px;
      cursor: pointer;
      padding: 4px 8px;
      transition: all 0.2s ease;
    }

    .btn-toggle:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
      border-color: #38bdf8;
    }

    .search-section {
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(15, 23, 42, 0.3);
    }

    .search-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-input {
      background: rgba(30, 41, 59, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      color: #f8fafc;
      padding: 7px 12px;
      font-size: 0.83rem;
      outline: none;
      width: 100%;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }

    .search-input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);
    }

    .categories-bar {
      display: flex;
      gap: 5px;
      overflow-x: auto;
      padding-bottom: 4px;
      scrollbar-width: none;
    }

    .categories-bar::-webkit-scrollbar {
      display: none;
    }

    .cat-btn {
      background: rgba(51, 65, 85, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      color: #94a3b8;
      padding: 4px 8px;
      font-size: 0.73rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }

    .cat-btn:hover {
      background: rgba(71, 85, 105, 0.8);
      color: #f1f5f9;
    }

    .cat-btn.active {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
      box-shadow: 0 0 8px rgba(56, 189, 248, 0.3);
    }

    .entities-list {
      flex: 1;
      overflow-y: auto;
      padding: 10px 14px;
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    .entity-card {
      background: rgba(30, 41, 59, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 9px;
      padding: 9px 11px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: grab;
      transition: all 0.18s ease;
      user-select: none;
    }

    .entity-card:hover {
      background: rgba(51, 65, 85, 0.9);
      border-color: #38bdf8;
      transform: translateX(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .entity-card:active {
      cursor: grabbing;
    }

    .entity-info {
      display: flex;
      align-items: center;
      gap: 10px;
      overflow: hidden;
    }

    .entity-icon {
      font-size: 1.25rem;
      min-width: 26px;
      text-align: center;
    }

    .entity-details {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .entity-name {
      font-size: 0.82rem;
      font-weight: 600;
      color: #f1f5f9;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .entity-id {
      font-size: 0.70rem;
      color: #64748b;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .entity-state-badge {
      font-size: 0.72rem;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 9999px;
      text-transform: uppercase;
      font-family: ui-monospace, SFMono-Regular, monospace;
      white-space: nowrap;
    }

    .state-on {
      background: rgba(234, 179, 8, 0.2);
      color: #facc15;
      border: 1px solid rgba(234, 179, 8, 0.4);
    }

    .state-off {
      background: rgba(100, 116, 139, 0.2);
      color: #94a3b8;
    }

    .drag-hint {
      padding: 10px 14px;
      background: rgba(2, 132, 199, 0.12);
      border-top: 1px solid rgba(56, 189, 248, 0.2);
      font-size: 0.74rem;
      color: #38bdf8;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .drawer-tabs {
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(15, 23, 42, 0.5);
    }

    .tab-btn {
      flex: 1;
      padding: 10px 8px;
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      color: #94a3b8;
      font-size: 0.80rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    .tab-btn:hover {
      color: #f1f5f9;
      background: rgba(255, 255, 255, 0.04);
    }

    .tab-btn.active {
      color: #38bdf8;
      border-bottom-color: #38bdf8;
      background: rgba(56, 189, 248, 0.08);
    }

    .furniture-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      padding: 10px 14px;
      overflow-y: auto;
      flex: 1;
    }

    .furniture-card {
      background: rgba(30, 41, 59, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 9px;
      padding: 10px 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      cursor: grab;
      transition: all 0.18s ease;
      user-select: none;
      gap: 4px;
    }

    .furniture-card:hover {
      background: rgba(51, 65, 85, 0.9);
      border-color: #38bdf8;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .furniture-card:active {
      cursor: grabbing;
    }

    .furniture-card-icon {
      font-size: 1.5rem;
    }

    .furniture-card-name {
      font-size: 0.76rem;
      font-weight: 600;
      color: #f1f5f9;
      line-height: 1.2;
    }

    .furniture-card-dim {
      font-size: 0.68rem;
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-weight: 600;
    }

    .empty-message {
      padding: 30px 16px;
      text-align: center;
      color: #64748b;
      font-size: 0.83rem;
    }

    .filters-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.74rem;
      color: #94a3b8;
    }

    .area-select {
      flex: 1;
      min-width: 0;
      background: rgba(30, 41, 59, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 6px;
      color: #f1f5f9;
      padding: 4px 6px;
      font-size: 0.74rem;
      outline: none;
    }

    .area-select:focus {
      border-color: #38bdf8;
    }

    .hidden-toggle {
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      white-space: nowrap;
    }

    .results-info {
      font-size: 0.72rem;
      color: #64748b;
      padding: 0 2px;
    }

    .entity-card:focus-visible,
    .furniture-card:focus-visible {
      outline: 2px solid #38bdf8;
      outline-offset: 1px;
    }

    .more-btn {
      background: rgba(51, 65, 85, 0.5);
      border: 1px dashed rgba(56, 189, 248, 0.4);
      border-radius: 8px;
      color: #38bdf8;
      padding: 8px;
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
    }

    .more-btn:hover {
      background: rgba(56, 189, 248, 0.12);
    }
  `;let ue=ci;Ce([O({type:Object})],ue.prototype,"hass");Ce([O({type:Boolean,reflect:!0})],ue.prototype,"collapsed");Ce([w()],ue.prototype,"activeTab");Ce([w()],ue.prototype,"furnitureCategory");Ce([w()],ue.prototype,"entitySearch");Ce([w()],ue.prototype,"furnitureSearch");Ce([w()],ue.prototype,"activeCategory");Ce([w()],ue.prototype,"areaFilter");Ce([w()],ue.prototype,"showSecondary");Ce([w()],ue.prototype,"visibleLimit");Ae("home-architect-entity-drawer",ue);var Lo=Object.defineProperty,Ie=(n,e,t,i)=>{for(var s=void 0,o=n.length-1,a;o>=0;o--)(a=n[o])&&(s=a(e,t,s)||s);return s&&Lo(e,t,s),s};const ze=[{id:"living",name:"Salon / Séjour",icon:"🛋️",widthMeters:6,lengthMeters:4.5,wallThickness:.2,color:"rgba(56, 189, 248, 0.15)",addDoor:!0,addWindow:!0},{id:"bedroom",name:"Chambre",icon:"🛏️",widthMeters:4,lengthMeters:3.5,wallThickness:.15,color:"rgba(168, 85, 247, 0.15)",addDoor:!0,addWindow:!0},{id:"kitchen",name:"Cuisine",icon:"🍳",widthMeters:4,lengthMeters:3,wallThickness:.15,color:"rgba(234, 179, 8, 0.15)",addDoor:!0,addWindow:!0},{id:"bathroom",name:"Salle de Bains",icon:"🚿",widthMeters:2.5,lengthMeters:2.2,wallThickness:.1,color:"rgba(20, 184, 166, 0.15)",addDoor:!0,addWindow:!1},{id:"office",name:"Bureau",icon:"💼",widthMeters:3.2,lengthMeters:3,wallThickness:.15,color:"rgba(99, 102, 241, 0.15)",addDoor:!0,addWindow:!0},{id:"custom",name:"Sur Mesure",icon:"📐",widthMeters:5,lengthMeters:4,wallThickness:.2,color:"rgba(148, 163, 184, 0.15)",addDoor:!0,addWindow:!0}],Fo=[{value:.1,label:"Cloison 10 cm"},{value:.15,label:"Mur 15 cm"},{value:.2,label:"Porteur 20 cm"},{value:.3,label:"Extérieur 30 cm"}],ht={min:.5,max:50},Ai={min:1.5,max:10},ji=2.5,Li=80,_o={width:"Largeur",length:"Longueur",height:"Hauteur sous plafond"};function qe(n){return n.toLocaleString("fr-FR",{maximumFractionDigits:2})}const No=/^-?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/;function zt(n,e){const t=n.trim();if(t==="")return{value:null,error:"Valeur requise"};if(!No.test(t))return{value:null,error:"Nombre invalide"};const i=Number(t.replace(",","."));return!Number.isFinite(i)||i<e.min||i>e.max?{value:null,error:`Entre ${qe(e.min)} et ${qe(e.max)} m`}:{value:i,error:null}}const di=class di extends Se{constructor(){super(...arguments),this.selectedTemplate=ze[0],this.widthText=String(ze[0].widthMeters),this.lengthText=String(ze[0].lengthMeters),this.heightText=String(ze[0].heightMeters??ji),this.touched={},this.submitAttempted=!1,this.thickness=ze[0].wallThickness,this.addDoor=ze[0].addDoor,this.addWindow=ze[0].addWindow,this.roomName=ze[0].name}selectTemplate(e){this.selectedTemplate=e,this.widthText=String(e.widthMeters),this.lengthText=String(e.lengthMeters),this.heightText=String(e.heightMeters??ji),this.thickness=e.wallThickness,this.addDoor=e.addDoor,this.addWindow=e.addWindow,this.roomName=e.name,this.touched={},this.submitAttempted=!1}checkFields(){return{width:zt(this.widthText,ht),length:zt(this.lengthText,ht),height:zt(this.heightText,Ai)}}markTouched(e){this.touched={...this.touched,[e]:!0}}handleSubmit(e){e.preventDefault();const t=this.checkFields(),i=t.width.value,s=t.length.value,o=t.height.value;if(i===null||s===null||o===null){this.submitAttempted=!0;return}const a=(this.roomName.trim()||this.selectedTemplate.name).slice(0,Li);this.dispatchEvent(new CustomEvent("create-room",{detail:{name:a,width:i,length:s,thickness:this.thickness,height:o,color:this.selectedTemplate.color,icon:this.selectedTemplate.icon,addDoor:this.addDoor,addWindow:this.addWindow},bubbles:!0,composed:!0}))}renderMetersInput(e,t,i,s,o){const a=i.error!==null&&(this.touched[e]||this.submitAttempted);return f`
      <input
        type="text"
        inputmode="decimal"
        autocomplete="off"
        aria-label=${`${_o[e]} (${qe(s.min)} à ${qe(s.max)} m)`}
        aria-invalid=${a?"true":"false"}
        .value=${_e(t)}
        @input=${r=>o(r.target.value)}
        @change=${()=>this.markTouched(e)}
      />
    `}renderFieldError(...e){const t=e.find(([i,s])=>s.error!==null&&(this.touched[i]||this.submitAttempted));return t?f`<span class="field-error" role="alert">${t[1].error}</span>`:_}handleClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){const e=this.checkFields(),t=e.width.value!==null&&e.length.value!==null&&e.height.value!==null,i=e.width.value!==null&&e.length.value!==null?(e.width.value*e.length.value).toLocaleString("fr-FR",{minimumFractionDigits:1,maximumFractionDigits:1}):"—",s=this.thickness.toFixed(2);return f`
      <form class="modal-card" novalidate @submit=${this.handleSubmit}>
        <div class="modal-header">
          <div class="modal-title">
            <span>🪄</span>
            <span>Assistant Création de Pièce</span>
          </div>
          <button type="button" class="btn-close" title="Fermer" @click=${this.handleClose}>✕</button>
        </div>

        <!-- Gabarits prédéfinis -->
        <div class="templates-grid">
          ${ze.map(o=>f`
            <div 
              class="template-card ${this.selectedTemplate.id===o.id?"selected":""}"
              @click=${()=>this.selectTemplate(o)}
            >
              <div class="template-icon">${o.icon}</div>
              <div class="template-name">${o.name}</div>
              <div class="template-dims">${qe(o.widthMeters)} m × ${qe(o.lengthMeters)} m</div>
            </div>
          `)}
        </div>

        <!-- Paramétrage précis des dimensions -->
        <div class="config-section">
          <div class="field-row">
            <span class="field-label">Nom de la pièce :</span>
            <input 
              type="text" 
              style="width: 160px; text-align: left; padding-left: 8px;"
              maxlength=${Li}
              placeholder=${this.selectedTemplate.name}
              .value=${_e(this.roomName)}
              @input=${o=>this.roomName=o.target.value}
            />
          </div>

          <div class="field-block">
            <div class="field-row">
              <span class="field-label">Dimensions (Largeur × Longueur) :</span>
              <div class="field-inputs">
                ${this.renderMetersInput("width",this.widthText,e.width,ht,o=>this.widthText=o)}
                <span>m ×</span>
                ${this.renderMetersInput("length",this.lengthText,e.length,ht,o=>this.lengthText=o)}
                <span>m</span>
              </div>
            </div>
            ${this.renderFieldError(["width",e.width],["length",e.length])}
          </div>

          <div class="field-row">
            <span class="field-label">Superficie calculée :</span>
            <span class="surface-badge">${i} m²</span>
          </div>

          <div class="field-block">
            <div class="field-row">
              <span class="field-label">Hauteur sous plafond (3D) :</span>
              <div class="field-inputs">
                ${this.renderMetersInput("height",this.heightText,e.height,Ai,o=>this.heightText=o)}
                <span>m</span>
              </div>
            </div>
            ${this.renderFieldError(["height",e.height])}
          </div>

          <div class="field-row">
            <span class="field-label">Épaisseur des murs :</span>
            <select 
              .value=${_e(s)}
              @change=${o=>this.thickness=parseFloat(o.target.value)}
            >
              ${Fo.map(o=>f`
                <option value=${o.value.toFixed(2)} ?selected=${o.value.toFixed(2)===s}>${o.label}</option>
              `)}
            </select>
          </div>

          <div class="checkboxes-row">
            <label>
              <input 
                type="checkbox" 
                .checked=${_e(this.addDoor)} 
                @change=${o=>this.addDoor=o.target.checked}
              />
              <span>Porte standard (0.90 m)</span>
            </label>

            <label>
              <input 
                type="checkbox" 
                .checked=${_e(this.addWindow)} 
                @change=${o=>this.addWindow=o.target.checked}
              />
              <span>Fenêtre (1.20 m)</span>
            </label>
          </div>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn btn-cancel" @click=${this.handleClose}>Annuler</button>
          <button
            type="submit"
            class="btn btn-create"
            ?disabled=${!t}
            title=${t?"Générer la pièce sur le plan":"Corrigez les dimensions pour continuer"}
          >
            Générer la pièce sur le plan
          </button>
        </div>
      </form>
    `}};di.styles=ye`
    :host {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: #f8fafc;
    }

    .modal-card {
      width: 90%;
      max-width: 540px;
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 18px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      animation: popIn 0.2s ease-out;
    }

    @keyframes popIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 12px;
    }

    .modal-title {
      font-size: 1.2rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
      color: #38bdf8;
    }

    .btn-close {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 20px;
      cursor: pointer;
      line-height: 1;
    }

    .btn-close:hover {
      color: #ffffff;
    }

    .templates-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }

    .template-card {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 12px 8px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }

    .template-card:hover {
      background: rgba(51, 65, 85, 0.8);
      border-color: #38bdf8;
      transform: translateY(-2px);
    }

    .template-card.selected {
      background: rgba(2, 132, 199, 0.25);
      border-color: #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
    }

    .template-icon {
      font-size: 24px;
    }

    .template-name {
      font-size: 0.85rem;
      font-weight: 600;
    }

    .template-dims {
      font-size: 0.72rem;
      color: #94a3b8;
    }

    .config-section {
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .field-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .field-label {
      font-size: 0.85rem;
      color: #cbd5e1;
    }

    .field-inputs {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    input[type="text"], select {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #f8fafc;
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 0.85rem;
      width: 75px;
      outline: none;
      text-align: center;
    }

    input[type="text"]:focus, select:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);
    }

    select {
      width: auto;
      text-align: left;
    }

    .surface-badge {
      font-weight: 700;
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .checkboxes-row {
      display: flex;
      gap: 18px;
      font-size: 0.85rem;
      color: #cbd5e1;
    }

    .checkboxes-row label {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 4px;
    }

    .btn {
      padding: 9px 18px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
    }

    .btn-cancel {
      background: rgba(51, 65, 85, 0.7);
      color: #cbd5e1;
    }

    .btn-cancel:hover {
      background: rgba(71, 85, 105, 0.9);
      color: #ffffff;
    }

    .btn-create {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
    }

    .btn-create:hover:not(:disabled) {
      background: #0369a1;
      transform: translateY(-1px);
    }

    .btn-create:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      box-shadow: none;
    }

    .field-block {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .field-error {
      align-self: flex-end;
      font-size: 0.75rem;
      color: #f87171;
    }

    input[aria-invalid="true"] {
      border-color: #f87171;
    }
  `;let pe=di;Ie([w()],pe.prototype,"selectedTemplate");Ie([w()],pe.prototype,"widthText");Ie([w()],pe.prototype,"lengthText");Ie([w()],pe.prototype,"heightText");Ie([w()],pe.prototype,"touched");Ie([w()],pe.prototype,"submitAttempted");Ie([w()],pe.prototype,"thickness");Ie([w()],pe.prototype,"addDoor");Ie([w()],pe.prototype,"addWindow");Ie([w()],pe.prototype,"roomName");Ae("home-architect-wizard-modal",pe);const Bo=new Set(["INPUT","TEXTAREA","SELECT"]),Uo=new Set(["ha-textfield","ha-textarea","ha-code-editor","ha-combo-box","ha-select","ha-search-input","ha-entity-picker","ha-icon-picker","mwc-textfield","mwc-textarea","mwc-select","md-filled-text-field","md-outlined-text-field","vaadin-combo-box-light"]),qo=new Set(["textbox","searchbox","combobox","spinbutton"]);function ei(n){return typeof n.composedPath=="function"?n.composedPath():[]}function Fi(n){const e=n;if(typeof e.tagName!="string")return!1;if(Bo.has(e.tagName.toUpperCase())||Uo.has(e.tagName.toLowerCase())||e.isContentEditable)return!0;const t=typeof e.getAttribute=="function"?e.getAttribute("role"):null;return t!==null&&qo.has(t.toLowerCase())}function Ho(n){if(!n.isConnected)return!1;const e=n;return typeof e.checkVisibility=="function"?e.checkVisibility():n.getClientRects().length>0}function ti(n){const e=ei(n);return e.length>0?e[0]:n.target}function ks(n){const e=ei(n);return e.length===0?n.target!==null&&Fi(n.target):e.some(Fi)}function $s(n,e){return ei(n).includes(e)}function Wo(n){return n.ctrlKey||n.metaKey||n.altKey}function Go(n){return(n.ctrlKey||n.metaKey)&&!n.altKey}function Vo(n,e){if(ks(n)||e.modalOpen&&!e.allowWhenModalOpen)return!1;if($s(n,e.host))return!0;const t=ti(n),i=e.host.ownerDocument;return t!==null&&(t===i.body||t===i.documentElement)&&Ho(e.host)}var Yo=Object.defineProperty,Pe=(n,e,t,i)=>{for(var s=void 0,o=n.length-1,a;o>=0;o--)(a=n[o])&&(s=a(e,t,s)||s);return s&&Yo(e,t,s),s};const Xo=[{name:"Bleu ciel",color:"rgba(56, 189, 248, 0.18)"},{name:"Violet moderne",color:"rgba(168, 85, 247, 0.18)"},{name:"Ambre chaleureux",color:"rgba(245, 158, 11, 0.18)"},{name:"Émeraude nature",color:"rgba(16, 185, 129, 0.18)"},{name:"Indigo profond",color:"rgba(99, 102, 241, 0.18)"},{name:"Rose pastel",color:"rgba(244, 63, 94, 0.18)"},{name:"Gris ardoise",color:"rgba(148, 163, 184, 0.18)"}],Ko=[{label:"2.10 m (Sous-sol)",val:2.1},{label:"2.30 m (Combles)",val:2.3},{label:"2.50 m (Standard)",val:2.5},{label:"2.70 m (Élevé)",val:2.7},{label:"3.00 m (Haussmann)",val:3},{label:"3.50 m (Cathédrale)",val:3.5}],_i=2.5,Ms=1,Ss=12,Ni="rgba(56, 189, 248, 0.18)",Bi=100,Pt="Pièce";function Zo(n){const e=n.trim().replace(",",".");if(e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function Ot(n){return typeof n=="number"&&Number.isFinite(n)&&n>=Ms&&n<=Ss}function Oe(n){return n.toFixed(2)}const ui=class ui extends Se{constructor(){super(...arguments),this.walls=[],this.name="",this.heightText=Oe(_i),this.inheritHeight=!0,this.areaId="",this.color=Ni,this.areaCache=null,this.handleKeyDown=e=>{if(e.stopPropagation(),e.key==="Escape")e.preventDefault(),this.close();else if(e.key==="Enter"&&!e.isComposing){const t=ti(e);t instanceof HTMLInputElement&&t.type==="text"&&(e.preventDefault(),this.save())}}}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",this.handleKeyDown)}disconnectedCallback(){this.removeEventListener("keydown",this.handleKeyDown),super.disconnectedCallback()}willUpdate(e){if(e.has("room")&&this.room){const t=Ot(this.room.height);this.name=this.room.name||Pt,this.inheritHeight=!t,this.heightText=Oe(t?this.room.height:this.projectDefaultHeight),this.areaId=this.room.area_id??"",this.color=this.room.color||Ni}}firstUpdated(){this.renderRoot.querySelector(".form-input")?.focus()}get projectDefaultHeight(){return Ot(this.defaultCeilingHeight)?this.defaultCeilingHeight:_i}effectiveHeight(){if(this.inheritHeight)return this.projectDefaultHeight;const e=Zo(this.heightText);return Ot(e)?e:null}areaOptions(){const e=this.hass?.areas;if(!e||typeof e!="object")return null;if(this.areaCache?.source!==e){const t=Object.values(e).filter(i=>!!i&&typeof i.area_id=="string"&&i.area_id!=="").map(i=>({id:i.area_id,name:i.name||i.area_id})).sort((i,s)=>i.name.localeCompare(s.name,"fr"));this.areaCache={source:e,options:t}}return this.areaCache.options}handleAreaChange(e){this.areaId=e.target.value;const t=this.areaOptions()?.find(s=>s.id===this.areaId),i=this.name.trim();t&&(i===""||i===Pt)&&(this.name=t.name)}handleInheritChange(e){this.inheritHeight=e.target.checked,this.inheritHeight||(this.heightText=Oe(this.projectDefaultHeight))}selectPreset(e){this.inheritHeight=!1,this.heightText=Oe(e)}close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}save(){const e=this.effectiveHeight();if(e===null)return;const t={roomId:this.room.id,name:this.name.trim().slice(0,Bi)||Pt,height:e,inheritHeight:this.inheritHeight,color:this.color,area_id:this.areaId||null};this.dispatchEvent(new CustomEvent("save-room",{detail:t,bubbles:!0,composed:!0}))}deleteRoom(){confirm(`Voulez-vous supprimer la pièce "${this.room.name}" ?`)&&this.dispatchEvent(new CustomEvent("delete-room",{detail:{roomId:this.room.id},bubbles:!0,composed:!0}))}renderAreaField(){const e=this.areaOptions();if(!e)return null;const t=this.areaId===""||e.some(i=>i.id===this.areaId);return f`
      <div class="form-group">
        <label class="form-label" for="room-area">Zone Home Assistant :</label>
        <select id="room-area" class="form-select" @change=${this.handleAreaChange}>
          <option value="" ?selected=${this.areaId===""}>Aucune zone liée</option>
          ${t?null:f`<option value=${this.areaId} selected>Zone introuvable (${this.areaId})</option>`}
          ${e.map(i=>f`<option value=${i.id} ?selected=${i.id===this.areaId}>${i.name}</option>`)}
        </select>
        <span class="form-hint">Associe la pièce du plan à une zone de Home Assistant.</span>
      </div>
    `}render(){if(!this.room)return null;const e=this.projectDefaultHeight,t=this.effectiveHeight(),i=t===null?`Hauteur invalide : saisissez une valeur entre ${Oe(Ms)} et ${Oe(Ss)} m.`:"",s=Re.computeInteriorArea(this.room.polygon,this.walls),o=s.axisAreaM2>0?s.axisAreaM2:this.room.areaM2,a=s.matchedEdges>0,r=a?s.areaM2:o,l=t===null?"--":(r*t).toFixed(1);return f`
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="room-modal-title">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon">${this.room.icon||"🏡"}</span>
            <div>
              <h3 class="modal-title" id="room-modal-title">Propriétés de la pièce</h3>
            </div>
          </div>
          <button class="btn-close" title="Fermer" @click=${this.close}>✕</button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label class="form-label" for="room-name">Nom de la pièce :</label>
            <input
              id="room-name"
              type="text"
              class="form-input"
              maxlength=${Bi}
              .value=${this.name}
              @input=${c=>this.name=c.target.value}
            />
          </div>

          ${this.renderAreaField()}

          <!-- Hauteur sous plafond 3D -->
          <div class="form-group">
            <label class="form-label" for="room-height">Hauteur sous plafond (Rendu 3D) :</label>
            <label class="check-row">
              <input type="checkbox" .checked=${this.inheritHeight} @change=${this.handleInheritChange} />
              <span>Hauteur par défaut du projet (${Oe(e)} m)</span>
            </label>
            <div class="height-input-row">
              <input
                id="room-height"
                type="text"
                inputmode="decimal"
                autocomplete="off"
                class="height-input ${i?"invalid":""}"
                aria-invalid=${i?"true":"false"}
                ?disabled=${this.inheritHeight}
                .value=${this.inheritHeight?Oe(e):this.heightText}
                @input=${c=>this.heightText=c.target.value}
              />
              <span class="unit-tag">mètres</span>
            </div>
            ${i?f`<span class="field-error" role="alert">${i}</span>`:null}

            <!-- Préréglages rapides -->
            <div class="presets-row">
              ${Ko.map(c=>f`
                <button
                  class="preset-pill ${!this.inheritHeight&&t!==null&&Math.abs(t-c.val)<.005?"active":""}"
                  @click=${()=>this.selectPreset(c.val)}
                >
                  ${c.label}
                </button>
              `)}
            </div>
          </div>

          <!-- Résumé Surface & Volume -->
          <div class="metrics-summary">
            <div class="metric-item">
              <span class="metric-label">${a?"Surface intérieure":"Surface à l'axe des murs"}</span>
              <span class="metric-val">${r.toFixed(1)} m²</span>
              <span class="metric-sub">${a?`À l'axe des murs : ${o.toFixed(1)} m²`:"Épaisseur des murs non déduite"}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Volume 3D calculé</span>
              <span class="metric-val">${l} m³</span>
            </div>
          </div>

          <!-- Couleur de sol -->
          <div class="form-group">
            <label class="form-label">Couleur d'ambiance du sol :</label>
            <div class="colors-row">
              ${Xo.map(c=>f`
                <div
                  class="color-swatch ${this.color===c.color?"active":""}"
                  style="background: ${c.color};"
                  title="${c.name}"
                  @click=${()=>this.color=c.color}
                ></div>
              `)}
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-delete" @click=${this.deleteRoom}>
            🗑️ Supprimer
          </button>
          <div class="footer-actions">
            <button class="btn-cancel" @click=${this.close}>Annuler</button>
            <button class="btn-save" ?disabled=${t===null} @click=${this.save}>
              💾 Enregistrer
            </button>
          </div>
        </div>
      </div>
    `}};ui.styles=ye`
    :host {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: #f8fafc;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-card {
      background: #1e293b;
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 16px;
      width: 460px;
      max-width: 92vw;
      max-height: 92vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 25px rgba(56, 189, 248, 0.25);
      overflow: hidden;
    }

    .modal-header {
      padding: 16px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(15, 23, 42, 0.6);
    }

    .modal-title-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .modal-icon {
      font-size: 1.5rem;
    }

    .modal-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #f1f5f9;
      margin: 0;
    }

    .btn-close {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 20px;
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .btn-close:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .modal-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      overflow-y: auto;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #cbd5e1;
    }

    .form-input {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 8px;
      color: #ffffff;
      padding: 8px 12px;
      font-size: 0.95rem;
      outline: none;
      transition: all 0.2s ease;
    }

    .form-input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);
    }

    .height-input-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .height-input {
      flex: 1;
      background: #0f172a;
      border: 2px solid #0284c7;
      border-radius: 8px;
      color: #ffffff;
      padding: 8px 12px;
      font-size: 1.15rem;
      font-weight: 800;
      font-family: ui-monospace, SFMono-Regular, monospace;
      outline: none;
    }

    .height-input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.3);
    }

    .unit-tag {
      font-size: 0.95rem;
      font-weight: 700;
      color: #38bdf8;
    }

    .presets-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }

    .preset-pill {
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 6px;
      color: #94a3b8;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 4px 8px;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .preset-pill:hover, .preset-pill.active {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
    }

    .metrics-summary {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 10px 14px;
    }

    .metric-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .metric-label {
      font-size: 0.74rem;
      color: #94a3b8;
      font-weight: 600;
      text-transform: uppercase;
    }

    .metric-val {
      font-size: 1.1rem;
      font-weight: 800;
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .colors-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .color-swatch {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.15s ease;
    }

    .color-swatch:hover, .color-swatch.active {
      transform: scale(1.1);
      border-color: #ffffff;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    }

    .modal-footer {
      padding: 14px 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(15, 23, 42, 0.6);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .btn-delete {
      background: rgba(239, 68, 68, 0.15);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 8px;
      padding: 7px 12px;
      font-size: 0.82rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-delete:hover {
      background: #ef4444;
      color: #ffffff;
    }

    .footer-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn-cancel {
      background: transparent;
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 7px 14px;
      font-size: 0.85rem;
      cursor: pointer;
    }

    .btn-cancel:hover {
      color: #ffffff;
    }

    .btn-save {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      border-radius: 8px;
      padding: 7px 18px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
    }

    .btn-save:hover:not(:disabled) {
      background: #0369a1;
    }

    .btn-save:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      box-shadow: none;
    }

    .form-select {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 8px;
      color: #ffffff;
      padding: 8px 12px;
      font-size: 0.95rem;
      outline: none;
    }

    .form-select:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);
    }

    .form-hint {
      font-size: 0.75rem;
      color: #94a3b8;
    }

    .field-error {
      color: #f87171;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .height-input.invalid {
      border-color: #ef4444;
    }

    .height-input:disabled {
      opacity: 0.55;
      border-color: rgba(255, 255, 255, 0.18);
      cursor: not-allowed;
    }

    .check-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.82rem;
      color: #e2e8f0;
      cursor: pointer;
    }

    .check-row input {
      width: 16px;
      height: 16px;
      accent-color: #38bdf8;
      cursor: pointer;
    }

    .metric-sub {
      font-size: 0.72rem;
      color: #94a3b8;
    }
  `;let fe=ui;Pe([O({attribute:!1})],fe.prototype,"room");Pe([O({attribute:!1})],fe.prototype,"hass");Pe([O({type:Number})],fe.prototype,"defaultCeilingHeight");Pe([O({attribute:!1})],fe.prototype,"walls");Pe([w()],fe.prototype,"name");Pe([w()],fe.prototype,"heightText");Pe([w()],fe.prototype,"inheritHeight");Pe([w()],fe.prototype,"areaId");Pe([w()],fe.prototype,"color");Ae("home-architect-room-modal",fe);var Jo=Object.defineProperty,Qo=Object.getOwnPropertyDescriptor,$t=(n,e,t,i)=>{for(var s=i>1?void 0:i?Qo(e,t):e,o=n.length-1,a;o>=0;o--)(a=n[o])&&(s=(i?a(e,t,s):a(s))||s);return i&&s&&Jo(e,t,s),s};let We=class extends Se{constructor(){super(...arguments),this.pixelDistance=200,this.defaultMeters=4,this.realMeters=4}firstUpdated(){this.realMeters=this.defaultMeters}handleApply(){if(this.realMeters<=.05)return;const n=this.pixelDistance/this.realMeters;this.dispatchEvent(new CustomEvent("calibrate-confirmed",{detail:{realMeters:this.realMeters,pixelDistance:this.pixelDistance,pixelsPerMeter:n},bubbles:!0,composed:!0}))}handleClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){const n=(this.pixelDistance/(this.realMeters||1)).toFixed(1);return f`
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title">
            <span>📏</span>
            <span>Étalonnage de l'Échelle</span>
          </div>
          <button class="btn-cancel" style="border:none; background:transparent; font-size:18px; cursor:pointer;" @click=${this.handleClose}>✕</button>
        </div>

        <div class="modal-desc">
          Indiquez la dimension réelle exacte du segment que vous venez de tracer sur votre plan pour calibrer automatiquement l'ensemble du projet.
        </div>

        <div class="input-box">
          <div class="input-row">
            <span class="input-label">Longueur réelle mesurée :</span>
            <div class="input-field-wrapper">
              <input 
                type="number" 
                step="0.05" 
                min="0.1" 
                max="50"
                .value=${this.realMeters}
                @input=${e=>this.realMeters=parseFloat(e.target.value)||0}
                @keydown=${e=>e.key==="Enter"&&this.handleApply()}
              />
              <span style="font-weight:600; color:#38bdf8;">mètres</span>
            </div>
          </div>

          <div class="measured-info">
            Distance tracée à l'écran : ${Math.round(this.pixelDistance)} px | Échelle résultante : ${n} px/m
          </div>
        </div>

        <div class="modal-actions">
          <button class="btn btn-cancel" @click=${this.handleClose}>Annuler</button>
          <button class="btn btn-apply" @click=${this.handleApply}>
            Appliquer l'échelle
          </button>
        </div>
      </div>
    `}};We.styles=ye`
    :host {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: #f8fafc;
    }

    .modal-card {
      width: 90%;
      max-width: 440px;
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 18px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      animation: popIn 0.2s ease-out;
    }

    @keyframes popIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 12px;
    }

    .modal-title {
      font-size: 1.15rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
      color: #38bdf8;
    }

    .modal-desc {
      font-size: 0.85rem;
      color: #94a3b8;
      line-height: 1.4;
    }

    .input-box {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .input-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .input-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #cbd5e1;
    }

    .input-field-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    input[type="number"] {
      background: #0f172a;
      border: 1px solid #38bdf8;
      color: #f8fafc;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 700;
      width: 100px;
      text-align: center;
      outline: none;
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.25);
    }

    .measured-info {
      font-size: 0.75rem;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }

    .btn {
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
    }

    .btn-cancel {
      background: rgba(51, 65, 85, 0.7);
      color: #cbd5e1;
    }

    .btn-cancel:hover {
      background: rgba(71, 85, 105, 0.9);
      color: #ffffff;
    }

    .btn-apply {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
    }

    .btn-apply:hover {
      background: #0369a1;
      transform: translateY(-1px);
    }
  `;$t([O({type:Number})],We.prototype,"pixelDistance",2);$t([O({type:Number})],We.prototype,"defaultMeters",2);$t([w()],We.prototype,"realMeters",2);We=$t([gs("home-architect-calibrate-modal")],We);var en=Object.defineProperty,Ee=(n,e,t,i)=>{for(var s=void 0,o=n.length-1,a;o>=0;o--)(a=n[o])&&(s=a(e,t,s)||s);return s&&en(e,t,s),s};const Cs=.01,Is=100,Ui=10;function tn(n){return Number.isFinite(n)&&n>=Cs&&n<=Is}function sn(n){return n>Ui||n<1/Ui}function on(n){const e=n.trim().replace(",",".");if(e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function Qe(n,e,t){return`${n} ${n>1?t:e}`}const pi=class pi extends Se{constructor(){super(...arguments),this.measuredMeters=0,this.wallCount=0,this.roomCount=0,this.openingCount=0,this.furnitureCount=0,this.bindingCount=0,this.hasBackground=!1,this.targetText="",this.adjustBackground=!0,this.unusualConfirmed=!1,this.handleKeyDown=e=>{if(e.stopPropagation(),e.key==="Escape")e.preventDefault(),this.close();else if(e.key==="Enter"&&!e.isComposing){const t=ti(e);t instanceof HTMLInputElement&&t.type==="text"&&(e.preventDefault(),this.confirm())}}}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",this.handleKeyDown)}disconnectedCallback(){this.removeEventListener("keydown",this.handleKeyDown),super.disconnectedCallback()}willUpdate(e){if(e.has("measuredMeters")){const t=this.measuredMeters;this.targetText=Number.isFinite(t)&&t>0?String(Math.round(t*1e3)/1e3):"",this.unusualConfirmed=!1}}firstUpdated(){const e=this.renderRoot.querySelector(".target-input");e?.focus(),e?.select()}handleInputChange(e){this.targetText=e.target.value,this.unusualConfirmed=!1}evaluate(){const e=this.measuredMeters;if(!(Number.isFinite(e)&&e>0))return{target:null,factor:null,error:"La cote mesurée est invalide : refaites la mesure sur le plan.",unusual:!1};const t=on(this.targetText);if(t===null)return{target:null,factor:null,error:this.targetText.trim()===""?"":"Saisissez un nombre (ex. 4.25).",unusual:!1};if(t<=0)return{target:t,factor:null,error:"La longueur doit être strictement positive.",unusual:!1};const i=t/e;return tn(i)?{target:t,factor:i,error:"",unusual:sn(i)}:{target:t,factor:null,error:`Facteur ×${Number(i.toPrecision(3))} hors limites (×${Cs} à ×${Is}) : la longueur est-elle bien en mètres ?`,unusual:!1}}isConfirmable(e){return e.factor!==null&&!e.error&&Math.abs(e.factor-1)>1e-4&&(!e.unusual||this.unusualConfirmed)}close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}confirm(){const e=this.evaluate();!this.isConfirmable(e)||e.target===null||e.factor===null||this.dispatchEvent(new CustomEvent("rescale-confirmed",{detail:{currentMeters:this.measuredMeters,targetMeters:e.target,scaleFactor:e.factor,adjustBackground:this.hasBackground&&this.adjustBackground},bubbles:!0,composed:!0}))}renderBackgroundImpact(){return this.hasBackground?f`
      <label class="check-row">
        <input
          type="checkbox"
          .checked=${this.adjustBackground}
          @change=${e=>this.adjustBackground=e.target.checked}
        />
        <span>Ajuster aussi le calque de fond (conserve la superposition avec le plan)</span>
      </label>
    `:null}render(){const e=this.evaluate(),t=Number.isFinite(this.measuredMeters)&&this.measuredMeters>0,i=e.factor??1,s=(i-1)*100,o=this.isConfirmable(e);return f`
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="rescale-title">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon">📐</span>
            <div>
              <h3 class="modal-title" id="rescale-title">Mettre à l'échelle le plan</h3>
              <p class="modal-subtitle">Recalcule automatiquement toutes les dimensions et cotes</p>
            </div>
          </div>
          <button class="btn-close" title="Fermer" @click=${this.close}>✕</button>
        </div>

        <div class="modal-body">
          <div class="metric-compare">
            <div class="metric-box">
              <span class="metric-label">Cote mesurée actuelle</span>
              <span class="metric-val">${t?this.measuredMeters.toFixed(2):"--"} m</span>
            </div>
            <div class="metric-box active">
              <span class="metric-label">Nouvelle cote cible</span>
              <span class="metric-val" style="color: #38bdf8;">${e.target!==null&&e.target>0?e.target.toFixed(2):"--"} m</span>
            </div>
          </div>

          <div class="input-group">
            <label class="input-label" for="rescale-target">Quelle est la taille réelle de ce segment en mètres ?</label>
            <div class="input-row">
              <input
                id="rescale-target"
                type="text"
                inputmode="decimal"
                autocomplete="off"
                class="target-input ${e.error?"invalid":""}"
                aria-invalid=${e.error?"true":"false"}
                .value=${this.targetText}
                @input=${this.handleInputChange}
              />
              <span class="unit-badge">mètres</span>
            </div>
            ${e.error?f`<span class="field-error" role="alert">${e.error}</span>`:null}
          </div>

          <div class="ratio-indicator">
            <span style="color: #94a3b8;">Facteur d'ajustement global :</span>
            <span class="ratio-pill ${i>1.001?"ratio-expand":i<.999?"ratio-shrink":"ratio-neutral"}">
              × ${i.toFixed(3)} (${s>=0?"+":""}${s.toFixed(1)}%)
            </span>
          </div>

          ${e.unusual?f`
            <div class="warning-box">
              <span>⚠️ Facteur inhabituel (×${i.toFixed(3)}) : toutes les dimensions seront multipliées par ce facteur. Vérifiez l'unité saisie.</span>
              <label class="check-row">
                <input
                  type="checkbox"
                  .checked=${this.unusualConfirmed}
                  @change=${a=>this.unusualConfirmed=a.target.checked}
                />
                <span>Je confirme ce facteur</span>
              </label>
            </div>
          `:null}

          <div class="impact-list">
            <div class="impact-item">
              <span class="impact-icon">🧱</span>
              <span><strong>${Qe(this.wallCount,"mur","murs")}</strong> : toutes les longueurs et cotes seront recalculées</span>
            </div>
            ${this.openingCount>0?f`
              <div class="impact-item">
                <span class="impact-icon">🚪</span>
                <span><strong>${Qe(this.openingCount,"ouverture","ouvertures")}</strong> : positions et largeurs ajustées proportionnellement</span>
              </div>
            `:null}
            ${this.roomCount>0?f`
              <div class="impact-item">
                <span class="impact-icon">🏡</span>
                <span><strong>${Qe(this.roomCount,"pièce","pièces")}</strong> : toutes les surfaces en m² seront actualisées</span>
              </div>
            `:null}
            ${this.furnitureCount>0?f`
              <div class="impact-item">
                <span class="impact-icon">🛋️</span>
                <span><strong>${Qe(this.furnitureCount,"meuble","meubles")}</strong> : positions et dimensions ajustées</span>
              </div>
            `:null}
            ${this.bindingCount>0?f`
              <div class="impact-item">
                <span class="impact-icon">⚡</span>
                <span><strong>${Qe(this.bindingCount,"entité","entités")}</strong> : ${this.bindingCount>1?"positions ajustées":"position ajustée"}</span>
              </div>
            `:null}
            ${this.hasBackground?f`
              <div class="impact-item">
                <span class="impact-icon">🖼️</span>
                <span><strong>Calque de fond</strong> : ${this.adjustBackground?"échelle synchronisée pour conserver la superposition":"inchangé (il ne sera plus superposé au plan)"}</span>
              </div>
            `:null}
            ${this.renderBackgroundImpact()}
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click=${this.close}>Annuler</button>
          <button
            class="btn-confirm"
            ?disabled=${!o}
            @click=${this.confirm}
          >
            <span>📐</span>
            <span>Recalculer toutes les cotes</span>
          </button>
        </div>
      </div>
    `}};pi.styles=ye`
    :host {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: #f8fafc;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-card {
      background: #1e293b;
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 16px;
      width: 480px;
      max-width: 92vw;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 25px rgba(56, 189, 248, 0.25);
      overflow: hidden;
    }

    .modal-header {
      padding: 18px 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(15, 23, 42, 0.6);
    }

    .modal-title-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .modal-icon {
      font-size: 1.6rem;
    }

    .modal-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #f1f5f9;
      margin: 0;
    }

    .modal-subtitle {
      font-size: 0.8rem;
      color: #94a3b8;
      margin: 2px 0 0 0;
    }

    .btn-close {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 20px;
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .btn-close:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .modal-body {
      padding: 22px 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .metric-compare {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .metric-box {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .metric-box.active {
      border-color: #38bdf8;
      background: rgba(2, 132, 199, 0.15);
      box-shadow: 0 0 15px rgba(56, 189, 248, 0.15);
    }

    .metric-label {
      font-size: 0.78rem;
      color: #94a3b8;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .metric-val {
      font-size: 1.3rem;
      font-weight: 800;
      color: #cbd5e1;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .input-label {
      font-size: 0.88rem;
      font-weight: 600;
      color: #f1f5f9;
    }

    .input-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .target-input {
      flex: 1;
      background: #0f172a;
      border: 2px solid #0284c7;
      border-radius: 10px;
      color: #ffffff;
      padding: 10px 14px;
      font-size: 1.25rem;
      font-weight: 800;
      font-family: ui-monospace, SFMono-Regular, monospace;
      outline: none;
      transition: all 0.2s ease;
    }

    .target-input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.3);
    }

    .unit-badge {
      font-size: 1rem;
      font-weight: 700;
      color: #38bdf8;
      padding: 0 4px;
    }

    .ratio-indicator {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 0.85rem;
    }

    .ratio-pill {
      font-size: 0.82rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 9999px;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .ratio-expand {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.4);
    }

    .ratio-shrink {
      background: rgba(245, 158, 11, 0.2);
      color: #f59e0b;
      border: 1px solid rgba(245, 158, 11, 0.4);
    }

    .ratio-neutral {
      background: rgba(100, 116, 139, 0.2);
      color: #94a3b8;
    }

    .impact-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      background: rgba(15, 23, 42, 0.4);
      border-radius: 10px;
      padding: 12px 14px;
      font-size: 0.8rem;
      color: #94a3b8;
    }

    .impact-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .impact-icon {
      font-size: 1rem;
    }

    .modal-footer {
      padding: 16px 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(15, 23, 42, 0.6);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
    }

    .btn-cancel {
      background: transparent;
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 0.88rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-cancel:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }

    .btn-confirm {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      border-radius: 8px;
      padding: 8px 20px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
      box-shadow: 0 0 15px rgba(56, 189, 248, 0.35);
    }

    .btn-confirm:hover:not(:disabled) {
      background: #0369a1;
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.55);
    }

    .btn-confirm:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      box-shadow: none;
    }

    .target-input.invalid {
      border-color: #ef4444;
    }

    .field-error {
      color: #f87171;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .warning-box {
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid rgba(245, 158, 11, 0.4);
      border-radius: 10px;
      padding: 10px 12px;
      font-size: 0.82rem;
      color: #fbbf24;
    }

    .check-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.82rem;
      color: #e2e8f0;
      cursor: pointer;
    }

    .check-row input {
      width: 16px;
      height: 16px;
      accent-color: #38bdf8;
      cursor: pointer;
    }
  `;let he=pi;Ee([O({type:Number})],he.prototype,"measuredMeters");Ee([O({type:Number})],he.prototype,"wallCount");Ee([O({type:Number})],he.prototype,"roomCount");Ee([O({type:Number})],he.prototype,"openingCount");Ee([O({type:Number})],he.prototype,"furnitureCount");Ee([O({type:Number})],he.prototype,"bindingCount");Ee([O({type:Boolean})],he.prototype,"hasBackground");Ee([w()],he.prototype,"targetText");Ee([w()],he.prototype,"adjustBackground");Ee([w()],he.prototype,"unusualConfirmed");Ae("home-architect-rescale-modal",he);const Gt="http://www.w3.org/2000/svg",ii={"":1,px:1,mm:96/25.4,cm:96/2.54,q:96/101.6,in:96,pt:96/72,pc:16,em:16,rem:16,ex:8},nn=/[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g,Mt=/^\s*([-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?)\s*([a-zA-Z%]*)\s*$/,an=new Set(["defs","clippath","symbol","marker","pattern","mask","metadata","title","desc","style","script","lineargradient","radialgradient","filter","foreignobject","image","view","cursor","font","font-face"]),rn=new Set(["fill","fill-opacity","stroke","stroke-width","stroke-opacity","stroke-dasharray","opacity","display","visibility","font-size","text-anchor","marker","marker-start","marker-mid","marker-end","color"]),ln=25e4,cn=15e4,dn=8,qi={dimension:"measurement",dim:"measurement",cotation:"measurement",cote:"measurement",mesure:"measurement",measure:"measurement",measurement:"measurement",guide:"measurement",guideline:"measurement",axis:"measurement",axe:"measurement",fleche:"measurement",arrow:"measurement",tick:"measurement",anno:"measurement",annotation:"measurement",grid:"measurement",grille:"measurement",trame:"measurement",door:"door",porte:"door",portillon:"door",swing:"door",battant:"door",window:"window",fenetre:"window",vitrage:"window",chassis:"window",baie:"window",glazing:"window",glaz:"window",velux:"window",mobilier:"ignore",meuble:"ignore",furniture:"ignore",furn:"ignore",equipement:"ignore",equipment:"ignore",fixture:"ignore",fixt:"ignore",sanitaire:"ignore",appareil:"ignore",appliance:"ignore",electromenager:"ignore",decor:"ignore",decoration:"ignore",plante:"ignore",vegetation:"ignore",hatch:"ignore",hachure:"ignore",escalier:"ignore",stair:"ignore",cartouche:"ignore",titleblock:"ignore",legend:"ignore",legende:"ignore",wall:"wall",mur:"wall",cloison:"wall",facade:"wall",envelope:"wall",enveloppe:"wall",structure:"wall",partition:"wall",maconnerie:"wall"},Hi=new Set(["room","piece","espace","zone","area","chambre","salon","cuisine","sdb","sejour","local"]),un=/\b(salon|sejour|living|chambre|bedroom|cuisine|kitchen|sdb|bain|bains|bathroom|wc|toilettes?|bureau|office|entree|hall|garage|couloir|degagement|cellier|buanderie|dressing)\b/,D={mergeAngleDeg:1,mergeOffset:.02,mergeGap:.05,mergeThickness:.03,pairAngleDeg:2,pairMin:.04,pairMax:.5,pairMinOverlap:.15,pairMinPiece:.1,leftoverMin:.3,enclosed:.03,snap:.03,heal:.05,minWall:.2,minSegment:.02,smallObject:.45,frameCoverage:.9,frameMaxStroke:.05,frameTouch:.05,strokeThicknessMin:.05,strokeThicknessMax:.5,doorRadiusMin:.5,doorRadiusMax:1.4,doorHinge:.3,openingDedupe:.35,openingSnap:.5,openingSpanMin:.4,openingSpanMax:3,bridgeParallelDeg:3,unlabeledRoomMin:1.5,scaleRetry:.02},et={totalWidthMeters:12,defaultThickness:.2,defaultHeight:2.5,minRoomAreaM2:.5,maxRoomAreaM2:2e3};function St(n){return n.normalize("NFKD").replace(/[̀-ͯ]/g,"").toLowerCase()}function pn(n){return St(n.replace(/([a-z])([A-Z])/g,"$1 $2")).split(/[^a-z]+/).filter(Boolean)}function hn(n){return qi[n]??(/[sx]$/.test(n)?qi[n.slice(0,-1)]:void 0)}function fn(n){return Hi.has(n)||/[sx]$/.test(n)&&Hi.has(n.slice(0,-1))}function gn(n){const e=[n.getAttribute("id"),n.getAttribute("class"),n.getAttribute("inkscape:label"),n.getAttribute("data-name")].filter(c=>!!c).join(" ");if(!e)return{role:null,roomHint:!1};let t=!1,i=!1,s=!1,o=!1,a=!1,r=!1;for(const c of pn(e)){const u=hn(c);u==="measurement"?t=!0:u==="door"?i=!0:u==="window"?s=!0:u==="ignore"?o=!0:u==="wall"&&(a=!0),fn(c)&&(r=!0)}return{role:t?"measurement":s?"window":i?"door":o?"ignore":a?"wall":null,roomHint:r}}function lt(n){return(n.localName||n.tagName||"").toLowerCase()}function si(n){if(!n)return[];const e=[];for(const t of n.matchAll(nn)){const i=Number(t[0]);Number.isFinite(i)&&e.push(i)}return e}function le(n,e,t){if(n==null)return t;const i=Mt.exec(n);if(!i){const r=/^\s*(\S+)/.exec(n);return r&&r[1]!==n.trim()?le(r[1],e,t):t}const s=Number(i[1]);if(!Number.isFinite(s))return t;const o=i[2].toLowerCase();if(o==="%")return s/100*e;const a=ii[o];return a===void 0?t:s*a}function Wi(n){if(!n)return null;const e=Mt.exec(n);if(!e||e[2]==="%")return null;const t=ii[e[2].toLowerCase()],i=Number(e[1])*(t??NaN);return Number.isFinite(i)&&i>0?i:null}function Es(n){const e=si(n);return e.length<4||!(e[2]>0)||!(e[3]>0)?null:{x:e[0],y:e[1],width:e[2],height:e[3]}}function Vt(n){if(n===void 0)return 1;const e=Mt.exec(n);if(!e)return 1;const t=Number(e[1])/(e[2]==="%"?100:1);return Number.isFinite(t)?Math.min(1,Math.max(0,t)):1}const mn={black:[0,0,0],white:[255,255,255],gray:[128,128,128],grey:[128,128,128],silver:[192,192,192],darkgray:[169,169,169],darkgrey:[169,169,169],dimgray:[105,105,105],dimgrey:[105,105,105],lightgray:[211,211,211],lightgrey:[211,211,211],gainsboro:[220,220,220],whitesmoke:[245,245,245],red:[255,0,0],green:[0,128,0],blue:[0,0,255],navy:[0,0,128],maroon:[128,0,0]};function Ts(n){const e=n.trim().toLowerCase(),t=/^#([0-9a-f]{3,8})$/.exec(e);if(t){const o=t[1];if(o.length===3||o.length===4){const a=o.split("").map(r=>parseInt(r+r,16));return[a[0],a[1],a[2],o.length===4?a[3]/255:1]}if(o.length===6||o.length===8){const a=[0,2,4,6].map(r=>parseInt(o.slice(r,r+2),16));return[a[0],a[1],a[2],o.length===8?a[3]/255:1]}return null}const i=/^rgba?\(([^)]*)\)$/.exec(e);if(i){const o=i[1].split(/[\s,/]+/).filter(Boolean);if(o.length<3)return null;const a=o.slice(0,3).map(l=>l.endsWith("%")?parseFloat(l)*255/100:parseFloat(l)),r=o[3]===void 0?1:o[3].endsWith("%")?parseFloat(o[3])/100:parseFloat(o[3]);return a.every(Number.isFinite)&&Number.isFinite(r)?[a[0],a[1],a[2],r]:null}const s=mn[e];return s?[s[0],s[1],s[2],1]:null}function Ds(n){const e=n.trim().toLowerCase();return e==="none"||e==="transparent"}function bn(n){return/^\s*none\s*$/i.test(n)?!1:si(n).some(e=>e>0)}function zs(n){const e={};for(const t of n.split(";")){const i=t.indexOf(":");if(i<=0)continue;const s=t.slice(0,i).trim().toLowerCase(),o=t.slice(i+1).replace(/!important/i,"").trim();s&&o&&(e[s]=o)}return e}class de{constructor(e=1,t=0,i=0,s=1,o=0,a=0){this.a=e,this.b=t,this.c=i,this.d=s,this.e=o,this.f=a}static identity(){return new de}multiply(e){return new de(this.a*e.a+this.c*e.b,this.b*e.a+this.d*e.b,this.a*e.c+this.c*e.d,this.b*e.c+this.d*e.d,this.a*e.e+this.c*e.f+this.e,this.b*e.e+this.d*e.f+this.f)}translate(e,t){return e===0&&t===0?this:this.multiply(new de(1,0,0,1,e,t))}scale(e,t=e){return this.multiply(new de(e,0,0,t,0,0))}rotate(e){const t=e*Math.PI/180,i=Math.cos(t),s=Math.sin(t);return this.multiply(new de(i,s,-s,i,0,0))}skewX(e){return this.multiply(new de(1,0,Math.tan(e*Math.PI/180),1,0,0))}skewY(e){return this.multiply(new de(1,Math.tan(e*Math.PI/180),0,1,0,0))}apply(e,t){return{x:this.a*e+this.c*t+this.e,y:this.b*e+this.d*t+this.f}}meanScale(){return Math.sqrt(Math.abs(this.a*this.d-this.b*this.c))}static parse(e){let t=de.identity();if(!e||/^\s*none\s*$/i.test(e))return t;const i=/([a-zA-Z]+)\s*\(([^)]*)\)/g;for(const s of e.matchAll(i)){const o=s[1].toLowerCase(),a=[];for(const u of s[2].matchAll(/([-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?)([a-zA-Z%]*)/g)){const d=Number(u[1]);Number.isFinite(d)&&a.push({v:d,unit:u[2].toLowerCase()})}const r=(u,d=0)=>a[u]?a[u].v*(ii[a[u].unit]??1):d,l=u=>{const d=a[u];return d?d.unit==="rad"?d.v*180/Math.PI:d.unit==="grad"?d.v*.9:d.unit==="turn"?d.v*360:d.v:0},c=(u,d)=>a[u]?a[u].v:d;switch(o){case"matrix":a.length>=6&&(t=t.multiply(new de(a[0].v,a[1].v,a[2].v,a[3].v,r(4),r(5))));break;case"translate":t=t.translate(r(0),r(1));break;case"translatex":t=t.translate(r(0),0);break;case"translatey":t=t.translate(0,r(0));break;case"scale":t=t.scale(c(0,1),c(1,c(0,1)));break;case"scalex":t=t.scale(c(0,1),1);break;case"scaley":t=t.scale(1,c(0,1));break;case"rotate":t=a.length>=3?t.translate(r(1),r(2)).rotate(l(0)).translate(-r(1),-r(2)):t.rotate(l(0));break;case"skewx":t=t.skewX(l(0));break;case"skewy":t=t.skewY(l(0));break;case"skew":t=t.skewX(l(0)).skewY(l(1));break}}return t}}function vn(n,e,t,i){let s=e/n.width,o=t/n.height,a=0,r=0;const l=(i||"xMidYMid meet").trim();if(!/^none\b/i.test(l)){const u=/\bslice\b/i.test(l)?Math.max(s,o):Math.min(s,o);s=o=u;const d=/x(Min|Mid|Max)Y(Min|Mid|Max)/.exec(l),g=d?d[1]:"Mid",m=d?d[2]:"Mid",b=e-n.width*u,p=t-n.height*u;a=g==="Min"?0:g==="Mid"?b/2:b,r=m==="Min"?0:m==="Mid"?p/2:p}return new de(s,0,0,o,a-n.x*s,r-n.y*o)}class xn{constructor(){this.complete=!0,this.size=0,this.order=0,this.universal=[],this.byTag=new Map,this.byClass=new Map,this.byTagClass=new Map,this.byId=new Map}add(e){const t=e.replace(/\/\*[\s\S]*?\*\//g,"");let i=0;for(;i<t.length;){const s=t.indexOf("{",i);if(s<0)break;const o=t.slice(i,s).trim();let a=1,r=s+1;for(;r<t.length&&a>0;)t[r]==="{"?a++:t[r]==="}"&&a--,r++;const l=t.slice(s+1,a===0?r-1:r);if(i=r,o.startsWith("@")){/^@(font-face|charset|namespace|page)\b/i.test(o)||(this.complete=!1);continue}const c=zs(l);for(const u of o.split(","))this.addSelector(u.trim(),c)}/@import\b/i.test(t)&&(this.complete=!1)}addSelector(e,t){const i=(o,a,r)=>{const l=o.get(a)??[];l.push({spec:r,order:this.order++,decls:t}),o.set(a,l),this.size++};let s;e==="*"?(this.universal.push({spec:0,order:this.order++,decls:t}),this.size++):(s=/^([a-zA-Z][\w-]*)$/.exec(e))?i(this.byTag,s[1].toLowerCase(),1):(s=/^\.([\w-]+)$/.exec(e))?i(this.byClass,s[1],10):(s=/^([a-zA-Z][\w-]*)\.([\w-]+)$/.exec(e))?i(this.byTagClass,`${s[1].toLowerCase()}.${s[2]}`,11):(s=/^#([\w-]+)$/.exec(e))?i(this.byId,s[1],100):e&&(this.complete=!1)}match(e,t){const i=[...this.universal];i.push(...this.byTag.get(t)??[]);const s=e.getAttribute("class");if(s)for(const a of s.split(/\s+/))a&&i.push(...this.byClass.get(a)??[],...this.byTagClass.get(`${t}.${a}`)??[]);const o=e.getAttribute("id");return o&&i.push(...this.byId.get(o)??[]),i.length>1&&i.sort((a,r)=>a.spec-r.spec||a.order-r.order),i}}const yn="MmZzLlHhVvCcSsQqTtAa",He=class He{constructor(e){this.d=e,this.pos=0}skip(){const e=this.d;for(;this.pos<e.length;){const t=e.charCodeAt(this.pos);if(t===32||t===9||t===10||t===13||t===12||t===44)this.pos++;else break}}atEnd(){return this.skip(),this.pos>=this.d.length}command(){this.skip();const e=this.d[this.pos];return e!==void 0&&yn.includes(e)?(this.pos++,e):null}num(){this.skip(),He.NUM.lastIndex=this.pos;const e=He.NUM.exec(this.d);if(!e)return null;this.pos=He.NUM.lastIndex;const t=Number(e[0]);return Number.isFinite(t)?t:null}flag(){this.skip();const e=this.d[this.pos];return e==="0"||e==="1"?(this.pos++,e==="1"?1:0):null}};He.NUM=/[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/y;let Yt=He;const wn={fill:"black",fillExplicit:!1,fillOpacity:1,stroke:"none",strokeExplicit:!1,strokeWidth:1,strokeOpacity:1,dashed:!1,markers:!1,hidden:!1,fontSize:16,textAnchor:"start",color:"black"};function kn(n,e,t,i){const s={...n},o=x=>{const y=e[x];return y===void 0||/^\s*inherit\s*$/i.test(y)?void 0:y},a=o("fill");a!==void 0&&(s.fill=a,s.fillExplicit=!0);const r=o("fill-opacity");r!==void 0&&(s.fillOpacity=Vt(r));const l=o("stroke");l!==void 0&&(s.stroke=l,s.strokeExplicit=!0);const c=o("stroke-width");c!==void 0&&(s.strokeWidth=Math.max(0,le(c,Math.hypot(t,i)/Math.SQRT2,s.strokeWidth)));const u=o("stroke-opacity");u!==void 0&&(s.strokeOpacity=Vt(u));const d=o("stroke-dasharray");d!==void 0&&(s.dashed=bn(d));const g=["marker","marker-start","marker-mid","marker-end"].map(o).filter(x=>x!==void 0);g.length>0&&(s.markers=g.some(x=>!/^\s*none\s*$/i.test(x)));const m=o("visibility");m!==void 0&&(s.hidden=/^\s*(hidden|collapse)\s*$/i.test(m));const b=o("font-size");if(b!==void 0){const x=Mt.exec(b);x&&x[2].toLowerCase()==="em"?s.fontSize=n.fontSize*Number(x[1]):s.fontSize=le(b,n.fontSize,n.fontSize)}const p=o("text-anchor");p!==void 0&&(s.textAnchor=p.trim().toLowerCase());const v=o("color");return v!==void 0&&(s.color=v),s}function $n(n,e){const t=n.fill.trim().toLowerCase();if(Ds(t))return"none";const i=n.fillOpacity*e;if(i<=.05)return"none";if(t.startsWith("url("))return"light";const s=Ts(t==="currentcolor"?n.color:t);if(!s)return"light";const a=1-(1-(.299*s[0]+.587*s[1]+.114*s[2])/255)*i*s[3];return s[3]*i<=.05?"none":a<.55?"dark":"light"}function Mn(n,e,t){if(!n.strokeExplicit)return t?0:e.m.meanScale();if(Ds(n.stroke)||n.strokeOpacity*e.opacity<=.05||n.strokeWidth<=0)return 0;const i=Ts(n.stroke);return i&&i[3]<=.05?0:n.strokeWidth*e.m.meanScale()}function Sn(n){const e=[];let t="";const i=()=>{const o=t.replace(/\s+/g," ").trim();o&&e.push(o),t=""},s=o=>{for(const a of Array.from(o.childNodes))if(a.nodeType===3||a.nodeType===4)t+=a.nodeValue??"";else if(a.nodeType===1){const r=a,l=lt(r);if(l!=="tspan"&&l!=="textpath"&&l!=="a")continue;const c=r.getAttribute("style")??"";if(r.getAttribute("display")==="none"||/display\s*:\s*none/i.test(c))continue;const u=l==="tspan"&&(r.hasAttribute("x")||r.hasAttribute("y")||r.hasAttribute("dy")||r.getAttribute("sodipodi:role")==="line");u&&i(),s(r),u&&i()}};return s(n),i(),e}function Cn(n){return St(n).replace(/\b(?:m2|m|cm|mm|dm|ml|s|sh|shab|shon|su|surf|surface|hsp|hsf|ht|h|hp|ep|niv|nf|ngf|alt|env|approx|ca|x)\b/g," ").replace(/[^a-z]+/g,"").length===0}function In(n){const t=n.map(i=>i.replace(/[\s(\-–—:,]*\d+(?:[.,]\d+)?\s*m(?:²|2)(?![a-z])\s*\)?/gi," ").replace(/\s+/g," ").replace(/[\s\-–—:,;(]+$/,"").trim()).filter(i=>i&&!Cn(i)).join(" ").trim();return t.length>0&&t.length<=60?t:""}class En{constructor(e){this.root=e,this.segments=[],this.shapes=[],this.arcs=[],this.labels=[],this.layers=[],this.rootCount=0,this.truncated=!1,this.elementCount=0,this.css=new xn,this.ids=new Map;let t=!1;for(const i of Array.from(e.getElementsByTagName("*"))){const s=i.getAttribute("id");s&&!this.ids.has(s)&&this.ids.set(s,i);const o=lt(i);o==="style"?this.css.add(i.textContent??""):o==="g"&&i.getAttribute("inkscape:groupmode")==="layer"&&(t=!0)}this.hasInkscapeLayers=t}run(e,t){const i={m:de.identity(),style:wn,opacity:1,role:null,roomHint:!1,layer:-1,vw:e,vh:t,useDepth:0};this.visit(this.root,i,{isRoot:!0})}contentBounds(){let e=1/0,t=1/0,i=-1/0,s=-1/0;const o=(a,r)=>{a<e&&(e=a),a>i&&(i=a),r<t&&(t=r),r>s&&(s=r)};for(const a of this.segments)o(a.ax,a.ay),o(a.bx,a.by);for(const a of this.shapes)o(a.minX,a.minY),o(a.maxX,a.maxY);for(const a of this.arcs)o(a.ax,a.ay),o(a.bx,a.by);for(const a of this.labels)o(a.x,a.y);return!Number.isFinite(e)||i-e<=0||s-t<=0?null:{x:e,y:t,width:i-e,height:s-t}}declarations(e,t){const i={},s=e.attributes;for(let a=0;a<s.length;a++){const r=s[a];rn.has(r.name)&&(i[r.name]=r.value.trim())}if(this.css.size>0)for(const a of this.css.match(e,t))Object.assign(i,a.decls);const o=e.getAttribute("style");return o&&Object.assign(i,zs(o)),i}isLayer(e){return this.hasInkscapeLayers?e.getAttribute("inkscape:groupmode")==="layer":e.parentElement===this.root}addLayer(e,t){const i=e.getAttribute("inkscape:label")||e.getAttribute("data-name")||e.getAttribute("id")||`Groupe ${this.layers.length+1}`,s=t>=0?`${this.layers[t].name} › ${i}`:i;return this.layers.push({name:s,count:0}),this.layers.length-1}countPrimitive(e){e>=0?this.layers[e].count++:this.rootCount++}visit(e,t,i={}){if(this.truncated)return;if(++this.elementCount>ln){this.truncated=!0;return}const s=e.namespaceURI;if(s&&s!==Gt)return;const o=lt(e);if(an.has(o)&&!(i.useTarget&&o==="symbol"))return;const a=this.declarations(e,o);if(a.display!==void 0&&/^\s*none\s*$/i.test(a.display))return;const r=t.opacity*Vt(a.opacity);if(r<=.01)return;const l=gn(e);let c=t.m;if(!i.isRoot){const g=a.transform??e.getAttribute("transform");g&&(c=c.multiply(de.parse(g)))}const u=o==="g"&&t.useDepth===0&&this.isLayer(e)?this.addLayer(e,t.layer):t.layer,d={m:c,style:kn(t.style,a,t.vw,t.vh),opacity:r,role:l.role??t.role,roomHint:t.roomHint||l.roomHint,layer:u,vw:t.vw,vh:t.vh,useDepth:t.useDepth};switch(o){case"svg":i.isRoot||this.enterViewport(e,d,i.useSize,!1),this.visitChildren(e,d);return;case"symbol":this.enterViewport(e,d,i.useSize,!0),this.visitChildren(e,d);return;case"g":case"a":this.visitChildren(e,d);return;case"switch":{const g=Array.from(e.children).find(m=>!m.namespaceURI||m.namespaceURI===Gt);g&&this.visit(g,d);return}case"use":this.visitUse(e,d);return;case"line":case"polyline":case"polygon":case"rect":case"path":this.extractGeometry(e,o,d);return;case"text":this.extractText(e,d);return;default:return}}visitChildren(e,t){const i=e.children;for(let s=0;s<i.length&&!this.truncated;s++)this.visit(i[s],t)}enterViewport(e,t,i,s){const o=s?0:le(e.getAttribute("x"),t.vw,0),a=s?0:le(e.getAttribute("y"),t.vh,0),r=i?.w??le(e.getAttribute("width"),t.vw,t.vw),l=i?.h??le(e.getAttribute("height"),t.vh,t.vh),c=Es(e.getAttribute("viewBox"));t.m=t.m.translate(o,a),c&&r>0&&l>0?(t.m=t.m.multiply(vn(c,r,l,e.getAttribute("preserveAspectRatio"))),t.vw=c.width,t.vh=c.height):r>0&&l>0&&(t.vw=r,t.vh=l)}visitUse(e,t){if(t.useDepth>=dn)return;const i=(e.getAttribute("href")??e.getAttribute("xlink:href")??"").trim();if(!i.startsWith("#"))return;const s=this.ids.get(i.slice(1));if(!s||s===e||s.contains(e))return;const o=le(e.getAttribute("x"),t.vw,0),a=le(e.getAttribute("y"),t.vh,0),r=e.getAttribute("width"),l=e.getAttribute("height"),c={w:r!==null?le(r,t.vw,t.vw):void 0,h:l!==null?le(l,t.vh,t.vh):void 0};this.visit(s,{...t,m:t.m.translate(o,a),useDepth:t.useDepth+1},{useTarget:!0,useSize:c})}segmentRole(e){return e.role&&e.role!=="wall"?e.role:e.style.dashed||e.style.markers?"measurement":"wall"}extractGeometry(e,t,i){if(i.style.hidden)return;const s=Mn(i.style,i,this.css.complete),o=$n(i.style,i.opacity),a=(r,l)=>le(e.getAttribute(r),l,0);switch(t){case"line":{const r=[{x:a("x1",i.vw),y:a("y1",i.vh),line:!1},{x:a("x2",i.vw),y:a("y2",i.vh),line:!0}];this.emit(r,!1,i,s,"none");return}case"polyline":case"polygon":{const r=si(e.getAttribute("points")),l=[];for(let c=0;c+1<r.length;c+=2)l.push({x:r[c],y:r[c+1],line:c>0});this.emit(l,t==="polygon",i,s,o);return}case"rect":{const r=a("x",i.vw),l=a("y",i.vh),c=a("width",i.vw),u=a("height",i.vh);if(!(c>0&&u>0))return;this.emit([{x:r,y:l,line:!1},{x:r+c,y:l,line:!0},{x:r+c,y:l+u,line:!0},{x:r,y:l+u,line:!0}],!0,i,s,o);return}case"path":this.extractPath(e.getAttribute("d")??"",i,s,o);return;default:return}}emit(e,t,i,s,o){if(e.length<2)return;const a=[];for(const p of e){const v=i.m.apply(p.x,p.y),x=a[a.length-1];x&&Math.abs(x.x-v.x)<1e-9&&Math.abs(x.y-v.y)<1e-9||a.push({x:v.x,y:v.y,line:p.line})}const r=a[0],l=a[a.length-1];let c=t,u=!0;a.length>2&&Math.abs(r.x-l.x)<1e-9&&Math.abs(r.y-l.y)<1e-9&&(c=!0,u=l.line,a.pop());const d=c?o:"none",g=s>0||d==="dark";if(!g&&!(c&&d!=="none"))return;const m=this.segmentRole(i);let b=-1;if(c&&a.length>=3&&m!=="ignore"){let p=1/0,v=1/0,x=-1/0,y=-1/0;for(const h of a)h.x<p&&(p=h.x),h.x>x&&(x=h.x),h.y<v&&(v=h.y),h.y>y&&(y=h.y);b=this.shapes.push({points:a.map(h=>({x:h.x,y:h.y})),role:m,fill:d,fillExplicit:i.style.fillExplicit,roomHint:i.roomHint,stroke:s,layer:i.layer,minX:p,minY:v,maxX:x,maxY:y})-1,this.countPrimitive(i.layer)}if(!(!g||m==="ignore")){for(let p=1;p<a.length;p++)a[p].line&&this.addSegment(a[p-1],a[p],m,s,d,b,i.layer);c&&u&&a.length>=2&&this.addSegment(a[a.length-1],a[0],m,s,d,b,i.layer)}}addSegment(e,t,i,s,o,a,r){if(this.segments.length>=cn){this.truncated=!0;return}this.segments.push({ax:e.x,ay:e.y,bx:t.x,by:t.y,role:i,stroke:s,fill:o,shape:a,layer:r}),this.countPrimitive(r)}extractPath(e,t,i,s){const o=new Yt(e);let a=0,r=0,l=0,c=0,u=0,d=0,g="",m="",b=[];const p=y=>{b.length>=2&&this.emit(b,y,t,i,s),b=[]},v=()=>{b.length===0&&b.push({x:a,y:r,line:!1})},x=(y,h,S)=>{v(),b.push({x:y,y:h,line:S}),a=y,r=h};for(;!o.atEnd();){const y=o.command();if(y)m=y;else if(m===""||m==="Z"||m==="z")break;const h=m===m.toLowerCase(),S=m.toUpperCase(),M=h?a:0,I=h?r:0;if(S==="Z"){b.length>0&&((Math.abs(a-l)>1e-12||Math.abs(r-c)>1e-12)&&b.push({x:l,y:c,line:!0}),p(!0)),a=l,r=c,g="Z";continue}if(S==="M"){const $=o.num(),C=o.num();if($===null||C===null)break;p(!1),a=M+$,r=I+C,l=a,c=r,b=[{x:a,y:r,line:!1}],m=h?"l":"L",g="M";continue}let k=!0;switch(S){case"L":{const $=o.num(),C=o.num();if($===null||C===null){k=!1;break}x(M+$,I+C,!0);break}case"H":{const $=o.num();if($===null){k=!1;break}x(M+$,r,!0);break}case"V":{const $=o.num();if($===null){k=!1;break}x(a,I+$,!0);break}case"C":case"S":{let $,C;if(S==="C")$=o.num(),C=o.num(),$!==null&&C!==null&&($+=M,C+=I);else{const Y=g==="C"||g==="S";$=Y?2*a-u:a,C=Y?2*r-d:r}const z=o.num(),F=o.num(),N=o.num(),B=o.num();if($===null||C===null||z===null||F===null||N===null||B===null){k=!1;break}const W={x:a,y:r};this.addCubic(W,{x:$,y:C},{x:M+z,y:I+F},{x:M+N,y:I+B},t),u=M+z,d=I+F,x(M+N,I+B,!1);break}case"Q":case"T":{let $,C;if(S==="Q")$=o.num(),C=o.num(),$!==null&&C!==null&&($+=M,C+=I);else{const N=g==="Q"||g==="T";$=N?2*a-u:a,C=N?2*r-d:r}const z=o.num(),F=o.num();if($===null||C===null||z===null||F===null){k=!1;break}u=$,d=C,x(M+z,I+F,!1);break}case"A":{const $=o.num(),C=o.num(),z=o.num(),F=o.flag(),N=o.flag(),B=o.num(),W=o.num();if($===null||C===null||z===null||F===null||N===null||B===null||W===null){k=!1;break}const Y=M+B,G=I+W;$===0||C===0?x(Y,G,!0):(this.addArc(a,r,Math.abs($),Math.abs(C),z,F===1,N===1,Y,G,t),x(Y,G,!1));break}default:k=!1}if(!k)break;g=S}p(!1)}addArc(e,t,i,s,o,a,r,l,c,u){if(a||Math.abs(e-l)<1e-12&&Math.abs(t-c)<1e-12)return;const d=o*Math.PI/180,g=Math.cos(d),m=Math.sin(d),b=(e-l)/2,p=(t-c)/2,v=g*b+m*p,x=-m*b+g*p,y=v*v/(i*i)+x*x/(s*s);if(y>1){const B=Math.sqrt(y);i*=B,s*=B}const h=i*i*s*s-i*i*x*x-s*s*v*v,S=i*i*x*x+s*s*v*v,M=(a!==r?1:-1)*Math.sqrt(Math.max(0,h/S)),I=M*i*x/s,k=-M*s*v/i,$=g*I-m*k+(e+l)/2,C=m*I+g*k+(t+c)/2,z=u.m.apply($,C),F=u.m.apply(e,t),N=u.m.apply(l,c);this.recordArc(z,F,N,u,null)}addCubic(e,t,i,s,o){const a=o.m.apply(e.x,e.y),r=o.m.apply(t.x,t.y),l=o.m.apply(i.x,i.y),c=o.m.apply(s.x,s.y),u=r.x-a.x,d=r.y-a.y,g=c.x-l.x,m=c.y-l.y,b=Math.hypot(u,d),p=Math.hypot(g,m);if(b<1e-9||p<1e-9)return;const v=-d,x=u,y=-m,h=g,S=v*h-x*y;if(Math.abs(S)<1e-12*b*p)return;const M=c.x-a.x,I=c.y-a.y,k=(M*h-I*y)/S,$={x:a.x+k*v,y:a.y+k*x};this.recordArc($,a,c,o,{l0:b,l3:p})}recordArc(e,t,i,s,o){const a=s.role??"wall";if(a==="measurement"||a==="ignore"||a==="window"||s.style.hidden)return;const r=Math.hypot(t.x-e.x,t.y-e.y),l=Math.hypot(i.x-e.x,i.y-e.y);if(!(r>0&&l>0))return;const c=r/l;if(c<.85||c>1/.85)return;const u=((t.x-e.x)*(i.x-e.x)+(t.y-e.y)*(i.y-e.y))/(r*l),d=Math.acos(Math.max(-1,Math.min(1,u)))*180/Math.PI;d<75||d>105||o&&(o.l0/r<.4||o.l0/r>.7||o.l3/l<.4||o.l3/l>.7)||(this.arcs.push({cx:e.x,cy:e.y,ax:t.x,ay:t.y,bx:i.x,by:i.y,r1:r,r2:l,role:a,layer:s.layer}),this.countPrimitive(s.layer))}extractText(e,t){if(t.style.hidden||t.role==="measurement"||t.role==="ignore")return;const i=Sn(e),s=In(i);if(!s)return;let o=e.getAttribute("x"),a=e.getAttribute("y");if(o===null||a===null){const p=Array.from(e.getElementsByTagName("*")).find(v=>lt(v)==="tspan"&&(v.hasAttribute("x")||v.hasAttribute("y")));o=o??p?.getAttribute("x")??null,a=a??p?.getAttribute("y")??null}const r=le(o,t.vw,0),l=le(a,t.vh,0),c=t.style.fontSize>0?t.style.fontSize:16,d=i.reduce((p,v)=>Math.max(p,v.length),0)*c*.55,g=t.style.textAnchor==="middle"?0:t.style.textAnchor==="end"?-d/2:d/2,m=-c*.35+(Math.max(1,i.length)-1)*c*.6,b=t.m.apply(r+g,l+m);this.labels.push({text:s,x:b.x,y:b.y,layer:t.layer}),this.countPrimitive(t.layer)}}class Ge{constructor(e){this.size=e,this.cells=new Map}key(e,t){return e*1000003+t}insertBox(e,t,i,s,o){const a=Math.floor(e/this.size),r=Math.floor(i/this.size),l=Math.floor(t/this.size),c=Math.floor(s/this.size);for(let u=a;u<=r;u++)for(let d=l;d<=c;d++){const g=this.key(u,d),m=this.cells.get(g);m?m.push(o):this.cells.set(g,[o])}}query(e,t,i,s,o){const a=Math.floor(e/this.size),r=Math.floor(i/this.size),l=Math.floor(t/this.size),c=Math.floor(s/this.size);for(let u=a;u<=r;u++)for(let d=l;d<=c;d++){const g=this.cells.get(this.key(u,d));if(g)for(const m of g)o(m)}}}function Me(n){return Math.hypot(n.bx-n.ax,n.by-n.ay)}function Ve(n,e){return Math.max(n,e/2e3,1e-9)}function Ct(n){let e=1/0,t=1/0,i=-1/0,s=-1/0;for(const o of n)e=Math.min(e,o.ax,o.bx),i=Math.max(i,o.ax,o.bx),t=Math.min(t,o.ay,o.by),s=Math.max(s,o.ay,o.by);return Number.isFinite(e)?Math.max(i-e,s-t):0}function Tn(n){let e=Math.atan2(n.by-n.ay,n.bx-n.ax);return e<0&&(e+=Math.PI),e>=Math.PI&&(e-=Math.PI),e}function oi(n,e){const t=n.map((o,a)=>({index:a,t:Tn(o)})).sort((o,a)=>o.t-a.t),i=[];let s=[];for(const o of t){const a=s[s.length-1];a&&(o.t-a.t>e||o.t-s[0].t>3*e)&&(i.push(s),s=[]),s.push(o)}if(s.length&&i.push(s),i.length>1){const o=i[0],a=i[i.length-1];o[0].t+Math.PI-a[a.length-1].t<=e&&(i.pop(),i[0]=[...a.map(r=>({index:r.index,t:r.t-Math.PI})),...o])}return i.map(o=>{const a=o.reduce((g,m)=>g+m.t,0)/o.length,r=Math.cos(a),l=Math.sin(a),c=-l,u=r,d=o.map(({index:g,t:m})=>{const b=n[g],p=b.ax*r+b.ay*l,v=b.bx*r+b.by*l,x=(b.ax+b.bx)/2*c+(b.ay+b.by)/2*u;return{index:g,lo:Math.min(p,v),hi:Math.max(p,v),off:x,angle:m}});return{ux:r,uy:l,items:d}})}function vt(n,e,t,i,s,o,a){const r=-e,l=n;return{ax:t*n+s*r,ay:t*e+s*l,bx:i*n+s*r,by:i*e+s*l,thick:o,measured:a}}function xt(n,e,t){const i=t.filter(a=>a[1]>n&&a[0]<e).sort((a,r)=>a[0]-r[0]),s=[];let o=n;for(const[a,r]of i)if(a>o&&s.push([o,Math.min(a,e)]),o=Math.max(o,r),o>=e)break;return o<e&&s.push([o,e]),s.filter(([a,r])=>r-a>1e-12)}function Gi(n,e){const t=[];for(const i of oi(n,e.angle)){const s=i.items.filter(a=>a.hi-a.lo>1e-12).sort((a,r)=>a.off-r.off);let o=0;for(let a=1;a<=s.length;a++)a<s.length&&s[a].off-s[a-1].off<=e.offset||(Dn(s.slice(o,a),n,i,e,t),o=a)}return t}function Dn(n,e,t,i,s){const o=[...n].sort((r,l)=>e[r.index].thick-e[l.index].thick);let a=0;for(let r=1;r<=o.length;r++){if(r<o.length&&e[o[r].index].thick-e[o[r-1].index].thick<=i.thickness)continue;const l=o.slice(a,r).sort((v,x)=>v.lo-x.lo);a=r;let c=l[0].lo,u=l[0].hi,d=0,g=0,m=0,b=!1;const p=()=>{u-c>1e-12&&s.push(vt(t.ux,t.uy,c,u,g>0?d/g:l[0].off,m,b))};for(let v=0;v<l.length;v++){const x=l[v],y=e[x.index];v>0&&x.lo>u+i.gap&&(p(),c=x.lo,u=x.hi,d=0,g=0,m=0,b=!1),u=Math.max(u,x.hi);const h=Math.max(x.hi-x.lo,1e-12);d+=x.off*h,g+=h,m=Math.max(m,y.thick),b=b||y.measured}p()}}function zn(n,e){const t=[];for(const i of oi(n,e.angle)){const s=[...i.items].sort((r,l)=>r.off-l.off),o=new Map,a=[];for(let r=0;r<s.length;r++){const l=s[r];let c=0;for(let u=r+1,d=0;u<s.length&&d<64;u++,d++){const g=s[u],m=g.off-l.off;if(m>e.max)break;if(m<e.min||Math.abs(l.angle-g.angle)>e.angle)continue;const b=Math.max(l.lo,g.lo),p=Math.min(l.hi,g.hi),v=Math.min(l.hi-l.lo,g.hi-g.lo);if(p-b>=Math.max(e.minOverlap,.3*v)&&(a.push({p:l,q:g,d:m,lo:b,hi:p}),++c>=6))break}}a.sort((r,l)=>r.d-l.d||l.hi-l.lo-(r.hi-r.lo));for(const r of a){const l=o.get(r.p.index)??[],c=o.get(r.q.index)??[];for(const[u,d]of xt(r.lo,r.hi,[...l,...c]))d-u<e.minPiece||(t.push(vt(i.ux,i.uy,u,d,(r.p.off+r.q.off)/2,r.d,!0)),l.push([u,d]),c.push([u,d]));o.set(r.p.index,l),o.set(r.q.index,c)}for(const r of s){const l=n[r.index],c=o.get(r.index);if(!c||c.length===0){t.push(l);continue}for(const[u,d]of xt(r.lo,r.hi,c))d-u>=e.leftoverMin&&t.push(vt(i.ux,i.uy,u,d,r.off,l.thick,l.measured))}}return t}function Xt(n,e,t,i){const s=Me(n);if(s===0)return!1;const o=(n.bx-n.ax)/s,a=(n.by-n.ay)/s,r=(e-n.ax)*o+(t-n.ay)*a,l=-(e-n.ax)*a+(t-n.ay)*o;return r>=-i&&r<=s+i&&Math.abs(l)<=n.thick/2+i}function Pn(n,e){const t=n.filter(o=>o.measured);if(t.length===0)return n;const i=t.reduce((o,a)=>Math.max(o,a.thick),0),s=new Ge(Ve(i*4+e,Ct(n)));for(const o of t){const a=o.thick/2+e;s.insertBox(Math.min(o.ax,o.bx)-a,Math.min(o.ay,o.by)-a,Math.max(o.ax,o.bx)+a,Math.max(o.ay,o.by)+a,o)}return n.filter(o=>{const a=Me(o);let r=!1;return s.query(o.ax,o.ay,o.ax,o.ay,l=>{r||l===o||Me(l)<=a+e||Xt(l,o.ax,o.ay,e)&&Xt(l,o.bx,o.by,e)&&(r=!0)}),!r})}function Vi(n,e){const t=new Ge(Ve(e,Ct(n))),i=(s,o)=>{let a=null,r=e;if(t.query(s-e,o-e,s+e,o+e,c=>{const u=Math.hypot(c.x-s,c.y-o);u<=r&&(r=u,a=c)}),a)return a;const l={x:s,y:o};return t.insertBox(s,o,s,o,l),l};for(const s of n){const o=i(s.ax,s.ay),a=i(s.bx,s.by);s.ax=o.x,s.ay=o.y,s.bx=a.x,s.by=a.y}}function On(n,e){if(n.length<2)return;const i=n.reduce((a,r)=>Math.max(a,r.thick),0)+e,s=new Ge(Ve(i*2,Ct(n)));for(const a of n)s.insertBox(Math.min(a.ax,a.bx)-i,Math.min(a.ay,a.by)-i,Math.max(a.ax,a.bx)+i,Math.max(a.ay,a.by)+i,a);const o=Math.sin(20*Math.PI/180);for(const a of n)for(const r of["a","b"]){const l=Me(a);if(l===0)continue;const c=r==="a"?a.ax:a.bx,u=r==="a"?a.ay:a.by,d=(r==="a"?a.ax-a.bx:a.bx-a.ax)/l,g=(r==="a"?a.ay-a.by:a.by-a.ay)/l;let m=!1,b=1/0;s.query(c,u,c,u,p=>{if(m||p===a)return;const v=Me(p);if(v===0)return;if(Math.hypot(p.ax-c,p.ay-u)<=e||Math.hypot(p.bx-c,p.by-u)<=e||Xt({...p,thick:0},c,u,e)){m=!0;return}const x=(p.bx-p.ax)/v,y=(p.by-p.ay)/v,h=d*y-g*x;if(Math.abs(h)<o)return;const S=p.ax-c,M=p.ay-u,I=(S*y-M*x)/h,k=(S*g-M*d)/h,$=(a.thick+p.thick)/2+e;I<-e||I>$||k<-$||k>v+$||Math.abs(I)<Math.abs(b)&&(b=I)}),!(m||!Number.isFinite(b))&&(r==="a"?(a.ax=c+d*b,a.ay=u+g*b):(a.bx=c+d*b,a.by=u+g*b))}}function Rn(n,e,t){const i=[];for(const s of oi(n,e.angle)){const o=[...s.items].sort((c,u)=>n[u.index].thick-n[c.index].thick||u.hi-u.lo-(c.hi-c.lo)),a=o.reduce((c,u)=>Math.max(c,n[u.index].thick),0),r=Math.max(a,e.offset,1e-9),l=new Map;for(const c of o){const u=n[c.index],d=[],g=Math.floor(c.off/r);for(let p=g-1;p<=g+1;p++)for(const v of l.get(p)??[]){const x=n[v.index];Math.abs(v.off-c.off)<=x.thick/2+e.offset&&x.thick>=u.thick&&d.push([v.lo,v.hi])}const m=d.length?xt(c.lo,c.hi,d):[[c.lo,c.hi]];for(const[p,v]of m)v-p<t||i.push(d.length?vt(s.ux,s.uy,p,v,c.off,u.thick,u.measured):u);const b=l.get(g)??[];b.push(c),l.set(g,b)}}return i}function Yi(n){let e=1/0,t=1/0,i=-1/0,s=-1/0;for(const o of n){const a=Me(o);if(a===0)continue;const r=-(o.by-o.ay)/a*(o.thick/2),l=(o.bx-o.ax)/a*(o.thick/2);for(const[c,u]of[[o.ax+r,o.ay+l],[o.ax-r,o.ay-l],[o.bx+r,o.by+l],[o.bx-r,o.by-l]])c<e&&(e=c),c>i&&(i=c),u<t&&(t=u),u>s&&(s=u)}return!Number.isFinite(e)||i-e<=0?null:{x:e,y:t,width:i-e,height:Math.max(0,s-t)}}function ni(n,e,t,i,s,o){const a=s-t,r=o-i,l=a*a+r*r,c=l===0?0:Math.max(0,Math.min(1,((n-t)*a+(e-i)*r)/l));return Math.hypot(n-(t+c*a),e-(i+c*r))}function An(n){let e=0;for(let t=0,i=n.length-1;t<n.length;i=t++)e+=n[i].x*n[t].y-n[t].x*n[i].y;return Math.abs(e)/2}function J(n){return Math.round(n*100)/100}function tt(n,e){return typeof n=="number"&&Number.isFinite(n)&&n>0?n:e}function jn(n){const e=tt(n.minRoomAreaM2,et.minRoomAreaM2);return{totalWidthMeters:tt(n.totalWidthMeters,et.totalWidthMeters),defaultThickness:tt(n.defaultThickness,et.defaultThickness),defaultHeight:tt(n.defaultHeight,et.defaultHeight),minRoomAreaM2:e,maxRoomAreaM2:Math.max(e,tt(n.maxRoomAreaM2,et.maxRoomAreaM2)),excludedLayers:new Set(n.excludedLayers??[])}}function Kt(n){return n<0?"root":`L${n}`}function Ps(n,e){return n.maxX-n.minX>=D.frameCoverage*e.width&&n.maxY-n.minY>=D.frameCoverage*e.height}function Ln(n,e,t,i,s){const o=D.frameTouch*i,a=new Ge(Ve(Math.max(o*20,i),s));n.forEach((d,g)=>{a.insertBox(Math.min(d.ax,d.bx)-o,Math.min(d.ay,d.by)-o,Math.max(d.ax,d.bx)+o,Math.max(d.ay,d.by)+o,g)});const r=(d,g,m)=>ni(g,m,d.ax,d.ay,d.bx,d.by)<=o,l=(d,g)=>r(g,d.ax,d.ay)||r(g,d.bx,d.by)||r(d,g.ax,g.ay)||r(d,g.bx,g.by),c=new Set,u=[];for(n.forEach((d,g)=>{for(const m of t){const b=e[m].points;for(let p=0,v=b.length-1;p<b.length;v=p++){const x={...d,ax:b[v].x,ay:b[v].y,bx:b[p].x,by:b[p].y};!c.has(g)&&(r(x,d.ax,d.ay)||r(x,d.bx,d.by))&&(c.add(g),u.push(g))}}});u.length>0;){const d=n[u.pop()];a.query(Math.min(d.ax,d.bx)-o,Math.min(d.ay,d.by)-o,Math.max(d.ax,d.bx)+o,Math.max(d.ay,d.by)+o,g=>{!c.has(g)&&l(d,n[g])&&(c.add(g),u.push(g))})}return c.size===0?n:n.filter((d,g)=>!c.has(g))}function Fn(n,e,t,i,s){const o=1/s;if(!Ps(n,i)||n.stroke*s>=D.frameMaxStroke||n.points.length!==4)return!1;const a=n.points,r=.01*Math.max(n.maxX-n.minX,n.maxY-n.minY);for(const m of a){const b=Math.abs(m.x-n.minX)<=r||Math.abs(m.x-n.maxX)<=r,p=Math.abs(m.y-n.minY)<=r||Math.abs(m.y-n.maxY)<=r;if(!b||!p)return!1}const l=D.frameTouch*o;let c=1/0,u=1/0,d=-1/0,g=-1/0;for(const m of t){if(m.shape===e)continue;const b=Math.hypot(m.bx-m.ax,m.by-m.ay);for(let p=0,v=a.length-1;p<a.length;v=p++){const x=a[p].x-a[v].x,y=a[p].y-a[v].y,h=Math.hypot(x,y);if(h===0||b===0)continue;const S=(x*(m.by-m.ay)-y*(m.bx-m.ax))/(h*b);if(Math.abs(S)<.035){const M=Math.abs((m.ax-a[v].x)*y-(m.ay-a[v].y)*x)/h;if(M>=D.pairMin*o&&M<=D.pairMax*o){const I=((m.ax-a[v].x)*x+(m.ay-a[v].y)*y)/h,k=((m.bx-a[v].x)*x+(m.by-a[v].y)*y)/h;if(Math.min(h,Math.max(I,k))-Math.max(0,Math.min(I,k))>=.3*h)return!1}}for(const[M,I]of[[m.ax,m.ay],[m.bx,m.by]])ni(M,I,a[v].x,a[v].y,a[p].x,a[p].y)<=l&&(c=Math.min(c,M),d=Math.max(d,M),u=Math.min(u,I),g=Math.max(g,I))}}return Number.isFinite(c)?d-c<.5*(n.maxX-n.minX)&&g-u<.5*(n.maxY-n.minY):!0}function Xi(n,e,t,i){const s=1/t,o=Math.max(e.width,e.height),a=n.arcs.filter(y=>{const h=(y.r1+y.r2)/2;return h>=D.doorRadiusMin*s&&h<=D.doorRadiusMax*s}),r=.06*s,l=new Ge(Ve(r*4,o));for(const y of a)l.insertBox(y.cx,y.cy,y.cx,y.cy,y);const c=(y,h,S,M)=>Math.hypot(y-S,h-M)<=r,u=y=>{let h=!1;const S=(M,I,k,$)=>{l.query(M-r,I-r,M+r,I+r,C=>{!h&&c(C.cx,C.cy,M,I)&&(c(C.ax,C.ay,k,$)||c(C.bx,C.by,k,$))&&(h=!0)})};return S(y.ax,y.ay,y.bx,y.by),h||S(y.bx,y.by,y.ax,y.ay),h},d=new Set;n.shapes.forEach((y,h)=>{Math.max(y.maxX-y.minX,y.maxY-y.minY)<D.smallObject*s&&d.add(h)});const g=n.segments.filter(y=>y.role==="wall"&&(y.stroke>0||y.fill==="dark")&&!(y.shape>=0&&d.has(y.shape))&&Math.hypot(y.bx-y.ax,y.by-y.ay)>=D.minSegment*s&&!u(y)),m=new Set;n.shapes.forEach((y,h)=>{Fn(y,h,g,e,t)&&m.add(h)});let b=g.filter(y=>!(y.shape>=0&&m.has(y.shape)));m.size>0&&(b=Ln(b,n.shapes,m,s,o)),b.length===0&&(b=g);const p=b.map(y=>{const h=y.stroke*t,S=h>=D.strokeThicknessMin&&h<=D.strokeThicknessMax?y.stroke:i.defaultThickness*s;return{ax:y.ax,ay:y.ay,bx:y.bx,by:y.by,thick:S,measured:!1}}),v={angle:D.mergeAngleDeg*Math.PI/180,offset:D.mergeOffset*s,gap:D.mergeGap*s,thickness:D.mergeThickness*s};let x=Gi(p,v);return x=zn(x,{angle:D.pairAngleDeg*Math.PI/180,min:D.pairMin*s,max:D.pairMax*s,minOverlap:D.pairMinOverlap*s,minPiece:D.pairMinPiece*s,leftoverMin:D.leftoverMin*s}),x=Pn(x,D.enclosed*s),Vi(x,D.snap*s),On(x,D.heal*s),Vi(x,D.snap*s),x=Gi(x,v),x=Rn(x,{...v,angle:D.pairAngleDeg*Math.PI/180},D.minWall*s),x=x.filter(y=>Me(y)>=D.minWall*s),{walls:x,doorArcs:a}}function Os(n){let e=n;for(;e.into;)e=e.into;return e}function _n(n,e,t,i){const s=1/i,o=[];if(n.length===0)return o;const a=.8*s,r=new Ge(Ve(s,Ct(n))),l=h=>{r.insertBox(Math.min(h.ax,h.bx)-a,Math.min(h.ay,h.by)-a,Math.max(h.ax,h.bx)+a,Math.max(h.ay,h.by)+a,h)};n.forEach(l);const c=.05*s,u=Math.sin(D.bridgeParallelDeg*Math.PI/180),d=(h,S,M,I)=>{let k=null,$=1/0;const C=new Set;return r.query(h,S,h,S,z=>{if(!z.alive||C.has(z)||(C.add(z),I&&!I(z)))return;const F=ni(h,S,z.ax,z.ay,z.bx,z.by);F<=M(z)&&F<$&&($=F,k=z)}),k},g=h=>{const S=Me(h);return{len:S,ux:(h.bx-h.ax)/S,uy:(h.by-h.ay)/S}},m=(h,S,M)=>{const{len:I,ux:k,uy:$}=g(h),C=-$,z=k,F=h.ax+k*M,N=h.ay+$*M;let B=null,W=0,Y=0;const G=new Set;r.query(Math.min(F,h.ax,h.bx),Math.min(N,h.ay,h.by),Math.max(F,h.ax,h.bx),Math.max(N,h.ay,h.by),A=>{if(!A.alive||A===h||G.has(A))return;G.add(A);const E=Me(A);if(E===0)return;const R=(A.bx-A.ax)/E,U=(A.by-A.ay)/E;if(Math.abs(k*U-$*R)>u)return;const j=Math.max(A.thick,h.thick)/2+c;if(Math.abs((A.ax-h.ax)*C+(A.ay-h.ay)*z)>j||Math.abs((A.bx-h.ax)*C+(A.by-h.ay)*z)>j)return;const H=(A.ax-h.ax)*k+(A.ay-h.ay)*$,T=(A.bx-h.ax)*k+(A.by-h.ay)*$,q=Math.min(H,T),Z=Math.max(H,T);(S==="end"?q<=M+c&&q>=I-c&&Z>I:Z>=M-c&&Z<=c&&q<0)&&(!B||(S==="end"?q<W:Z>Y))&&(B=A,W=q,Y=Z)});const K=h.ax,Te=h.ay;let ce=Math.min(0,M),te=Math.max(I,M);const ne=B;ne&&(ce=Math.min(ce,W),te=Math.max(te,Y),ne.alive=!1,ne.into=h,h.thick=Math.max(h.thick,ne.thick),h.measured=h.measured||ne.measured),h.ax=K+k*ce,h.ay=Te+$*ce,h.bx=K+k*te,h.by=Te+$*te,l(h)},b=(h,S,M)=>{const{len:I}=g(h);M>I+c&&m(h,"end",M),S<-c&&m(h,"start",S)},p=(h,S,M)=>o.some(I=>Os(I.host)===h&&Math.hypot(I.cx-S,I.cy-M)<D.openingDedupe*s),v=D.doorHinge*s,x=Math.sin(10*Math.PI/180);for(const h of e){const S=(h.r1+h.r2)/2;let M=null;const I=[[{x:h.ax,y:h.ay},{x:h.bx,y:h.by}],[{x:h.bx,y:h.by},{x:h.ax,y:h.ay}]];for(const[K,Te]of I){const ce=Math.hypot(K.x-h.cx,K.y-h.cy),te=(K.x-h.cx)/ce,ne=(K.y-h.cy)/ce,A=[],E=new Set;if(r.query(Math.min(h.cx,K.x)-v,Math.min(h.cy,K.y)-v,Math.max(h.cx,K.x)+v,Math.max(h.cy,K.y)+v,T=>{if(!T.alive||E.has(T))return;E.add(T);const{ux:q,uy:Z}=g(T);if(Math.abs(q*ne-Z*te)>x)return;const De=T.thick/2+v,Be=Math.abs((h.cx-T.ax)*-Z+(h.cy-T.ay)*q),mi=Math.abs((K.x-T.ax)*-Z+(K.y-T.ay)*q);if(Be>De||mi>De)return;const bi=(T.ax-h.cx)*te+(T.ay-h.cy)*ne,vi=(T.bx-h.cx)*te+(T.by-h.cy)*ne,xi=Math.min(bi,vi),yi=Math.max(bi,vi);yi<-v||xi>S+v||A.push({w:T,lo:xi,hi:yi,offsets:Be+mi})}),A.length===0)continue;const U=xt(0,S,A.map(T=>[T.lo,T.hi])).reduce((T,[q,Z])=>T-(Z-q),S)/S,j=T=>T.lo<=0&&T.hi>=0?0:Math.min(Math.abs(T.lo),Math.abs(T.hi)),H=A.reduce((T,q)=>j(q)<j(T)||j(q)===j(T)&&q.offsets<T.offsets?q:T);(!M||U<M.coverage-1e-6||Math.abs(U-M.coverage)<=1e-6&&H.offsets<M.offsets)&&(M={host:H.w,coverage:U,offsets:H.offsets,closed:K,open:Te})}if(!M)continue;const k=M.host,{ux:$,uy:C}=g(k),z=-C,F=$,N=Math.sign((M.closed.x-h.cx)*$+(M.closed.y-h.cy)*C)||1,B=(h.cx-k.ax)*$+(h.cy-k.ay)*C;b(k,Math.min(B,B+N*S),Math.max(B,B+N*S));const W=(h.cx-k.ax)*z+(h.cy-k.ay)*F,Y=h.cx-z*W+$*N*(S/2),G=h.cy-F*W+C*N*(S/2);p(k,Y,G)||o.push({host:k,cx:Y,cy:G,width:S,type:"door",hinge:{x:h.cx,y:h.cy},openEnd:M.open})}const y=Math.sin(15*Math.PI/180);for(const h of t){if(h.role!=="window"&&h.role!=="door")continue;const S=Math.hypot(h.bx-h.ax,h.by-h.ay);if(S<D.openingSpanMin*s)continue;const M=(h.bx-h.ax)/S,I=(h.by-h.ay)/S,k=(h.ax+h.bx)/2,$=(h.ay+h.by)/2,C=d(k,$,()=>D.openingSnap*s,R=>{const{ux:U,uy:j}=g(R);return Math.abs(U*I-j*M)<=y});if(!C)continue;const{ux:z,uy:F}=g(C),N=(h.ax-C.ax)*z+(h.ay-C.ay)*F,B=(h.bx-C.ax)*z+(h.by-C.ay)*F,W=Math.min(N,B),Y=Math.max(N,B),G=Y-W;if(G<D.openingSpanMin*s||G>D.openingSpanMax*s)continue;b(C,W,Y);const K=-F,Te=z,ce=(k-C.ax)*K+($-C.ay)*Te,te=k-K*ce,ne=$-Te*ce;if(p(C,te,ne))continue;const A=G*i,E=h.role==="door"?"door":A>1.8?"french_window":"window";o.push({host:C,cx:te,cy:ne,width:G,type:E})}return o}function Rt(n){const e=St(n);return/\b(salon|sejour|living|sam|salle a manger|lounge)\b/.test(e)?{color:"rgba(59, 130, 246, 0.28)",icon:"mdi:sofa"}:/\b(chambre|ch|bed|bedroom|suite|parentale)\b/.test(e)?{color:"rgba(139, 92, 246, 0.28)",icon:"mdi:bed"}:/\b(cuisine|kitchen|kitchenette)\b/.test(e)?{color:"rgba(245, 158, 11, 0.28)",icon:"mdi:silverware-fork-knife"}:/\b(sdb|sde|bain|bains|douche|bath|bathroom|salle d ?eau)\b/.test(e)?{color:"rgba(6, 182, 212, 0.28)",icon:"mdi:shower"}:/\b(wc|toilettes?|toilets?)\b/.test(e)?{color:"rgba(16, 185, 129, 0.28)",icon:"mdi:toilet"}:/\b(bureau|office|travail)\b/.test(e)?{color:"rgba(99, 102, 241, 0.28)",icon:"mdi:desk"}:/\b(entree|hall|couloir|degagement|corridor|palier)\b/.test(e)?{color:"rgba(100, 116, 139, 0.28)",icon:"mdi:door"}:/\b(garage|atelier)\b/.test(e)?{color:"rgba(120, 113, 108, 0.28)",icon:"mdi:garage"}:/\b(terrasse|balcon|patio|loggia)\b/.test(e)?{color:"rgba(20, 184, 166, 0.28)",icon:"mdi:balcony"}:{color:"rgba(56, 189, 248, 0.25)",icon:"mdi:home-outline"}}function Nn(n,e,t,i,s){const o=p=>({x:J((p.x-e.x)*t),y:J((p.y-e.y)*t)}),a=[];n.shapes.forEach((p,v)=>{if(p.role!=="wall"||Ps(p,e))return;const x=An(p.points)*t*t;x<.2||a.push({shape:p,index:v,points:p.points,areaM2:x,label:null})}),a.sort((p,v)=>p.areaM2-v.areaM2||p.index-v.index);const r=[],l=.02/t;for(const p of a){const v=r.find(x=>Math.abs(x.areaM2-p.areaM2)<=.01*p.areaM2&&Math.abs(x.shape.minX-p.shape.minX)<=l&&Math.abs(x.shape.maxX-p.shape.maxX)<=l&&Math.abs(x.shape.minY-p.shape.minY)<=l&&Math.abs(x.shape.maxY-p.shape.maxY)<=l);v?!v.shape.fillExplicit&&p.shape.fillExplicit&&(r[r.indexOf(v)]=p):r.push(p)}const c=(p,v,x)=>v>=p.shape.minX&&v<=p.shape.maxX&&x>=p.shape.minY&&x<=p.shape.maxY&&Re.isPointInPolygon({x:v,y:x},p.points);for(const p of n.labels){const v=r.find(x=>c(x,p.x,p.y));v&&v.label===null&&(v.label=p.text)}const u=[],d=[],g=Math.max(i.minRoomAreaM2,D.unlabeledRoomMin);for(const p of r){if(p.label!==null){if(p.areaM2>=i.minRoomAreaM2&&p.areaM2<=i.maxRoomAreaM2){const y=p.points.map(o);d.push({candidate:p,worldPolygon:y,areaM2:Re.computeArea(y),centroid:Re.calculateCentroid(p.points)})}else u.push({name:p.label,areaM2:J(p.areaM2)});continue}if(!(p.shape.fillExplicit&&p.shape.fill==="light"||p.shape.roomHint)||p.areaM2<g||p.areaM2>i.maxRoomAreaM2||n.labels.some(y=>c(p,y.x,y.y))||d.some(y=>c(p,y.centroid.x,y.centroid.y)))continue;const x=p.points.map(o);d.push({candidate:p,worldPolygon:x,areaM2:Re.computeArea(x),centroid:Re.calculateCentroid(p.points)})}d.sort((p,v)=>p.candidate.index-v.candidate.index);const m=[],b=(p,v,x)=>{const y=Rt("");return{id:"",name:`Pièce ${x}`,polygon:p,areaM2:v,color:y.color,icon:y.icon,height:i.defaultHeight}};if(d.forEach((p,v)=>{const x=ve("room"),y={...b(p.worldPolygon,p.areaM2,v+1),id:x},h=p.candidate.label,S=h?Rt(h):null;m.push({named:h&&S?{...y,name:h,color:S.color,icon:S.icon}:y,generic:y,fromLabel:!!h,labelOnly:!1})}),m.length===0&&s>=4)for(const p of n.labels){if(!un.test(St(p.text)))continue;const v=o({x:p.x,y:p.y}),x=1.8,y=[{x:J(v.x-x),y:J(v.y-x)},{x:J(v.x+x),y:J(v.y-x)},{x:J(v.x+x),y:J(v.y+x)},{x:J(v.x-x),y:J(v.y+x)}],h=Rt(p.text),S={id:ve("room"),name:p.text,polygon:y,areaM2:Re.computeArea(y),color:h.color,icon:h.icon,height:i.defaultHeight};m.push({named:S,generic:S,fromLabel:!0,labelOnly:!0})}return{rooms:m,ignored:u}}function Bn(n,e){if(e.size===0)return n;const t=o=>!e.has(Kt(o)),i=new Map,s=[];return n.shapes.forEach((o,a)=>{t(o.layer)&&i.set(a,s.push(o)-1)}),{segments:n.segments.filter(o=>t(o.layer)).map(o=>o.shape>=0?{...o,shape:i.get(o.shape)??-1}:o),shapes:s,arcs:n.arcs.filter(o=>t(o.layer)),labels:n.labels.filter(o=>t(o.layer))}}function Ki(n){let e=1/0,t=1/0,i=-1/0,s=-1/0;const o=(a,r)=>{a<e&&(e=a),a>i&&(i=a),r<t&&(t=r),r>s&&(s=r)};for(const a of n.segments)a.role==="wall"&&(o(a.ax,a.ay),o(a.bx,a.by));if(!Number.isFinite(e))for(const a of n.shapes)o(a.minX,a.minY),o(a.maxX,a.maxY);return!Number.isFinite(e)||i-e<=0?null:{x:e,y:t,width:i-e,height:s-t}}function Un(){return{wallCount:0,doorCount:0,windowCount:0,roomCount:0,textLabelCount:0,ignoredMeasurementLinesCount:0}}const Rs=new Set(["door","double_door","sliding_door"]);function Zi(n,e,t,i,s){const o=e.filter(a=>Rs.has(a.type)).length;return{wallCount:n.length,doorCount:o,windowCount:e.length-o,roomCount:t.length,textLabelCount:i?t.filter(a=>a.fromLabel).length:0,ignoredMeasurementLinesCount:s}}function At(n){return{success:!1,error:n,viewBox:{x:0,y:0,width:0,height:0},viewBoxSource:"default",markup:"",layers:[],truncated:!1,primitives:{segments:[],shapes:[],arcs:[],labels:[]}}}class qn{static analyze(e){try{const t=new DOMParser().parseFromString(e,"image/svg+xml"),i=t.getElementsByTagName("parsererror")[0];if(i){const m=(i.textContent??"").replace(/\s+/g," ").trim().slice(0,200);return At(`Fichier SVG invalide${m?` : ${m}`:"."}`)}const s=t.documentElement;if(!s||lt(s)!=="svg")return At("Aucune balise <svg> racine dans le document.");t.doctype&&t.removeChild(t.doctype);const o=Es(s.getAttribute("viewBox")),a=Wi(s.getAttribute("width")),r=Wi(s.getAttribute("height"));let l=o,c="attribute";!l&&a&&r&&(l={x:0,y:0,width:a,height:r},c="size");const u=new En(s);if(u.run(l?.width??a??1e3,l?.height??r??750),!l){const m=u.contentBounds();if(m){const b=Math.max(m.width,m.height)*.02;l={x:m.x-b,y:m.y-b,width:m.width+2*b,height:m.height+2*b},c="content"}else l={x:0,y:0,width:a??1e3,height:r??750},c="default"}if(c!=="attribute"){const m=b=>String(Math.round(b*1e4)/1e4);s.setAttribute("viewBox",`${m(l.x)} ${m(l.y)} ${m(l.width)} ${m(l.height)}`)}let d=new XMLSerializer().serializeToString(s);s.namespaceURI||(d=d.replace(/^<svg\b/,`<svg xmlns="${Gt}"`));const g=u.layers.map((m,b)=>({id:Kt(b),name:m.name,elementCount:m.count})).filter(m=>m.elementCount>0);return g.length>0&&u.rootCount>0&&g.unshift({id:Kt(-1),name:"Éléments hors calque",elementCount:u.rootCount}),{success:!0,viewBox:l,viewBoxSource:c,markup:d,layers:g,truncated:u.truncated,primitives:{segments:u.segments,shapes:u.shapes,arcs:u.arcs,labels:u.labels}}}catch(t){return At(`Erreur d'interprétation : ${t instanceof Error?t.message:String(t)}`)}}static detect(e,t={}){const i={success:!1,error:e.error,viewBox:e.viewBox,metersPerUnit:0,footprint:null,widthReference:"viewBox",walls:[],openings:[],rooms:[],ignoredRooms:[],layers:e.layers,truncated:e.truncated,measurementLineCount:0};if(!e.success)return i;try{const s=jn(t),o=Bn(e.primitives,s.excludedLayers),a=e.viewBox,r=s.totalWidthMeters;let l=r/(Ki(o)?.width||a.width),c=Xi(o,a,l,s);const u=Yi(c.walls);if(u){const k=r/u.width;Math.abs(k-l)>D.scaleRetry*l&&(l=k,c=Xi(o,a,l,s))}const d=c.walls.map(k=>({...k,alive:!0,into:null})),g=_n(d,c.doorArcs,o.segments,l),m=d.filter(k=>k.alive);let b="viewBox",p=Yi(m);if(p?b="walls":(p=Ki(o),p&&(b="content")),l=r/(p?.width||a.width),!Number.isFinite(l)||l<=0)throw new Error("échelle invalide");const v=(k,$)=>({x:J((k-a.x)*l),y:J(($-a.y)*l)}),x=[],y=new Map;for(const k of m){const $=v(k.ax,k.ay),C=v(k.bx,k.by);if(Math.hypot(C.x-$.x,C.y-$.y)<D.minWall)continue;const z=k.thick*l,F=!k.measured&&Math.abs(z-s.defaultThickness)<=.1*s.defaultThickness?s.defaultThickness:Math.min(Math.max(D.pairMax,s.defaultThickness),Math.max(D.pairMin,J(z))),N={id:ve("wall"),start:$,end:C,thickness:F,height:s.defaultHeight,type:"standard"};x.push(N),y.set(k,N)}const h=[];for(const k of g){const $=Os(k.host),C=y.get($);if(!C)continue;const z=Me($),F=($.bx-$.ax)/z,N=($.by-$.ay)/z,B=Math.hypot(C.end.x-C.start.x,C.end.y-C.start.y),W=J(k.width*l);if(W<=0||W>B)continue;const Y=((k.cx-$.ax)*F+(k.cy-$.ay)*N)*l,G={id:ve("op"),wallId:C.id,type:k.type,offset:J(Math.min(B-W/2,Math.max(W/2,Y))),width:W,flipSide:!1,flipDirection:!1};k.hinge&&k.openEnd&&(G.flipDirection=(k.hinge.x-k.cx)*F+(k.hinge.y-k.cy)*N>0,G.flipSide=(k.openEnd.x-k.hinge.x)*-N+(k.openEnd.y-k.hinge.y)*F<0),h.push(G)}const{rooms:S,ignored:M}=Nn(o,a,l,s,x.length),I=p?{width:J(p.width*l),height:J(p.height*l)}:null;return{...i,success:!0,error:void 0,metersPerUnit:l,footprint:I,widthReference:b,walls:x,openings:h,rooms:S,ignoredRooms:M,measurementLineCount:o.segments.filter(k=>k.role==="measurement").length}}catch(s){return{...i,error:`Erreur d'interprétation : ${s instanceof Error?s.message:String(s)}`}}}static select(e,t={}){const i=t.importWalls!==!1,s=t.importDoors!==!1,o=t.importWindows!==!1,a=t.importRooms!==!1,r=t.importLabels!==!1,l=i?e.walls:[],c=new Set(l.map(m=>m.id)),u=e.openings.filter(m=>c.has(m.wallId)&&(Rs.has(m.type)?s:o)),d=a?e.rooms.filter(m=>r||!m.labelOnly):[],g=d.map(m=>r?m.named:m.generic);return{success:e.success,walls:l,openings:u,rooms:g,viewBox:e.viewBox,metersPerUnit:e.metersPerUnit,footprint:e.footprint,widthReference:e.widthReference,stats:Zi(l,u,d,r,e.measurementLineCount),available:e.success?Zi(e.walls,e.openings,e.rooms,!0,e.measurementLineCount):Un(),ignoredRooms:e.ignoredRooms,layers:e.layers,truncated:e.truncated,error:e.error}}static parseSvg(e,t={}){return this.select(this.detect(this.analyze(e),t),t)}}var Hn=Object.defineProperty,Wn=Object.getOwnPropertyDescriptor,oe=(n,e,t,i)=>{for(var s=i>1?void 0:i?Wn(e,t):e,o=n.length-1,a;o>=0;o--)(a=n[o])&&(s=(i?a(e,t,s):a(s))||s);return i&&s&&Hn(e,t,s),s};let Q=class extends Se{constructor(){super(...arguments),this.currentLevel="rdc",this.imageDataUrl=null,this.imageWidth=0,this.imageHeight=0,this.imageName="",this.isSvg=!1,this.svgRawText=null,this.svgInterpretResult=null,this.svgImportMode="vectorize",this.keepSvgBackground=!0,this.importOptions={importWalls:!0,importDoors:!0,importWindows:!0,importRooms:!0,importLabels:!0},this.calibrateMode="auto_dimension",this.totalWidthMeters=12,this.opacity=.4,this.isDragOver=!1,this.fileInputRef=null,this._boundPasteListener=null}connectedCallback(){super.connectedCallback(),this._boundPasteListener=this.handleModalPaste.bind(this),window.addEventListener("paste",this._boundPasteListener)}disconnectedCallback(){super.disconnectedCallback(),this._boundPasteListener&&window.removeEventListener("paste",this._boundPasteListener)}handleModalPaste(n){if(!n.clipboardData)return;const e=n.clipboardData.items;for(let i=0;i<e.length;i++)if(e[i].type.indexOf("image")!==-1){const s=e[i].getAsFile();if(s){n.preventDefault(),this.processFile(s);return}}const t=n.clipboardData.getData("text/plain")?.trim();if(t&&(t.startsWith("<svg")||t.startsWith("<?xml")&&t.includes("<svg"))){n.preventDefault(),this.processSvgText(t,"Plan SVG collé depuis le presse-papier");return}}triggerFileInput(){if(!this.fileInputRef){const n=document.createElement("input");n.type="file",n.accept="image/*,.svg",n.style.display="none",n.addEventListener("change",e=>{const t=e.target.files?.[0];t&&this.processFile(t)}),this.fileInputRef=n}this.fileInputRef.click()}processFile(n){if(this.imageName=n.name||"Plan importé",n.type==="image/svg+xml"||n.name.toLowerCase().endsWith(".svg")){const t=new FileReader;t.onload=i=>{const s=i.target?.result;this.processSvgText(s,n.name)},t.readAsText(n)}else{this.isSvg=!1,this.svgRawText=null,this.svgInterpretResult=null;const t=new FileReader;t.onload=i=>{const s=i.target?.result,o=new Image;o.onload=()=>{this.imageDataUrl=s,this.imageWidth=o.naturalWidth,this.imageHeight=o.naturalHeight},o.src=s},t.readAsDataURL(n)}}processSvgText(n,e="Plan SVG importé"){this.imageName=e,this.isSvg=!0,this.svgRawText=n,this.computeSvgInterpretation();const t="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(n);this.imageDataUrl=t;const i=new Image;i.onload=()=>{this.imageWidth=i.naturalWidth||this.svgInterpretResult?.viewBox.width||1e3,this.imageHeight=i.naturalHeight||this.svgInterpretResult?.viewBox.height||750},i.src=t}computeSvgInterpretation(){this.svgRawText&&(this.svgInterpretResult=qn.parseSvg(this.svgRawText,{totalWidthMeters:this.totalWidthMeters,defaultThickness:.2,defaultHeight:2.5,...this.importOptions}))}toggleImportCategory(n,e){this.importOptions={...this.importOptions,[n]:e},this.isSvg&&this.computeSvgInterpretation()}handleDimensionChange(n){this.totalWidthMeters=n>0?n:10,this.isSvg&&this.computeSvgInterpretation()}handleDrop(n){if(n.preventDefault(),this.isDragOver=!1,n.dataTransfer?.files&&n.dataTransfer.files.length>0){const e=n.dataTransfer.files[0];this.processFile(e)}}handleDragOver(n){n.preventDefault(),this.isDragOver=!0}handleDragLeave(){this.isDragOver=!1}async handlePasteButtonClick(){try{if(navigator.clipboard&&navigator.clipboard.readText){const n=await navigator.clipboard.readText();if(n&&(n.trim().startsWith("<svg")||n.trim().startsWith("<?xml")&&n.includes("<svg"))){this.processSvgText(n.trim(),"Plan SVG collé");return}}if(navigator.clipboard&&navigator.clipboard.read){const n=await navigator.clipboard.read();for(const e of n){const t=e.types.find(i=>i.startsWith("image/"));if(t){const i=await e.getType(t),s=new File([i],"clipboard_image.png",{type:t});this.processFile(s);return}}}alert("Appuyez directement sur Cmd+V ou Ctrl+V pour coller l'image ou le code SVG de votre plan !")}catch{alert("Appuyez directement sur Cmd+V ou Ctrl+V pour coller votre plan !")}}close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}confirmImport(){if(!this.imageDataUrl)return;const n=this.isSvg&&this.svgImportMode==="vectorize"&&!!this.svgInterpretResult?.success;this.dispatchEvent(new CustomEvent("import-confirmed",{detail:{dataUrl:this.imageDataUrl,widthPx:this.imageWidth||this.svgInterpretResult?.viewBox.width||1e3,heightPx:this.imageHeight||this.svgInterpretResult?.viewBox.height||750,opacity:this.opacity,mode:this.calibrateMode,totalWidthMeters:this.totalWidthMeters,targetLevel:this.currentLevel,isSvgVectorized:n,svgInterpretation:n?this.svgInterpretResult:void 0,keepSvgBackground:this.keepSvgBackground},bubbles:!0,composed:!0}))}render(){const n=this.isSvg&&this.svgImportMode==="vectorize"&&!!this.svgInterpretResult?.success,e=this.svgInterpretResult?.stats;return f`
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon">📥</span>
            <div>
              <h3 class="modal-title">Importer & Interpréter un plan</h3>
              <p class="modal-subtitle">Prend en charge SVG (vectoriel intelligent), PNG, JPG, JPEG et WebP</p>
            </div>
          </div>
          <button class="btn-close" @click=${this.close}>✕</button>
        </div>

        <div class="modal-body">
          <!-- Zone de Dépôt ou Aperçu -->
          ${this.imageDataUrl?f`
            <div class="preview-card">
              <img class="preview-thumb" src="${this.imageDataUrl}" alt="Aperçu du plan" />
              <div class="preview-meta">
                <div class="preview-title">
                  <span>✅</span>
                  <span>${this.imageName||"Plan sélectionné"}</span>
                  ${this.isSvg?f`<span class="preview-badge-svg">SVG Vectoriel</span>`:null}
                </div>
                <div class="preview-dimensions">
                  Dimensions du plan : ${this.imageWidth} × ${this.imageHeight} px
                </div>
                <button class="btn-change-image" @click=${this.triggerFileInput}>
                  🔄 Remplacer le fichier
                </button>
              </div>
            </div>
          `:f`
            <div 
              class="drop-zone ${this.isDragOver?"dragover":""}"
              @dragover=${this.handleDragOver}
              @dragleave=${this.handleDragLeave}
              @drop=${this.handleDrop}
              @click=${this.triggerFileInput}
            >
              <span class="drop-icon">📐</span>
              <div class="drop-text">Glissez-déposez votre plan ici</div>
              <div class="drop-subtext">SVG (Vectorisation automatique en murs 3D), PNG, JPG, WebP</div>

              <div class="drop-actions" @click=${t=>t.stopPropagation()}>
                <button class="btn-action-small" @click=${this.triggerFileInput}>
                  📁 Choisir un fichier
                </button>
                <button class="btn-action-small" @click=${this.handlePasteButtonClick}>
                  📋 Coller (Cmd+V)
                </button>
              </div>
            </div>
          `}

          <!-- Encadré Vectorisation Intelligente SVG si un fichier SVG est chargé -->
          ${this.isSvg?f`
            <div class="svg-interpret-box">
              <div class="svg-box-header">
                <span class="svg-box-icon">✨</span>
                <div>
                  <div class="svg-box-title">Interprétation Vectorielle Intelligente SVG</div>
                  <div class="svg-box-subtitle">
                    Transformez directement les lignes et courbes de votre SVG en éléments réels
                  </div>
                </div>
              </div>

              <div class="svg-mode-selector">
                <!-- Mode 1 : Convertir en murs, portes, fenêtres et pièces -->
                <div 
                  class="svg-choice-card ${this.svgImportMode==="vectorize"?"selected":""}"
                  @click=${()=>this.svgImportMode="vectorize"}
                >
                  <input 
                    type="radio" 
                    name="svg_mode" 
                    class="svg-choice-radio"
                    .checked=${this.svgImportMode==="vectorize"}
                    @change=${()=>this.svgImportMode="vectorize"}
                  />
                  <div class="svg-choice-content">
                    <div class="svg-choice-title">
                      <span>🧱 Convertir en Murs, Portes, Fenêtres & Pièces 3D</span>
                      <span class="badge-magic">Recommandé</span>
                    </div>
                    <div class="svg-choice-desc">
                      Génère instantanément les murs, baies, ouvertures et pièces prêts pour l'affichage 2D et 3D.
                    </div>

                    ${e?f`
                      <!-- Sélection granulaire des éléments à importer -->
                      <div class="import-categories-box" @click=${t=>t.stopPropagation()}>
                        <div class="categories-title">Éléments à importer :</div>
                        <div class="categories-grid">
                          <label class="category-toggle ${this.importOptions.importWalls?"active":""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importWalls} 
                              @change=${t=>this.toggleImportCategory("importWalls",t.target.checked)}
                            />
                            <span>🧱 Murs</span>
                            <span class="cat-count">(${e.wallCount})</span>
                          </label>

                          <label class="category-toggle ${this.importOptions.importDoors?"active":""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importDoors} 
                              @change=${t=>this.toggleImportCategory("importDoors",t.target.checked)}
                            />
                            <span>🚪 Portes</span>
                            <span class="cat-count">(${e.doorCount})</span>
                          </label>

                          <label class="category-toggle ${this.importOptions.importWindows?"active":""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importWindows} 
                              @change=${t=>this.toggleImportCategory("importWindows",t.target.checked)}
                            />
                            <span>🪟 Fenêtres</span>
                            <span class="cat-count">(${e.windowCount})</span>
                          </label>

                          <label class="category-toggle ${this.importOptions.importRooms?"active":""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importRooms} 
                              @change=${t=>this.toggleImportCategory("importRooms",t.target.checked)}
                            />
                            <span>🏠 Pièces</span>
                            <span class="cat-count">(${e.roomCount})</span>
                          </label>

                          <label class="category-toggle ${this.importOptions.importLabels?"active":""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importLabels} 
                              @change=${t=>this.toggleImportCategory("importLabels",t.target.checked)}
                            />
                            <span>🏷️ Noms</span>
                            <span class="cat-count">(${e.textLabelCount})</span>
                          </label>
                        </div>

                        ${e.ignoredMeasurementLinesCount>0?f`
                          <div class="ignored-note">
                            ℹ️ ${e.ignoredMeasurementLinesCount} ligne(s) de cotation / pointillés ont été automatiquement ignorées (non transformées en murs).
                          </div>
                        `:null}
                      </div>
                    `:null}

                    <div class="checkbox-wrap" @click=${t=>t.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        id="chk_keep_bg"
                        .checked=${this.keepSvgBackground} 
                        @change=${t=>this.keepSvgBackground=t.target.checked}
                      />
                      <label for="chk_keep_bg" style="cursor: pointer;">
                        Conserver également le tracé SVG original en filigrane sous le plan
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Mode 2 : Calque de fond simple -->
                <div 
                  class="svg-choice-card ${this.svgImportMode==="background_only"?"selected":""}"
                  @click=${()=>this.svgImportMode="background_only"}
                >
                  <input 
                    type="radio" 
                    name="svg_mode" 
                    class="svg-choice-radio"
                    .checked=${this.svgImportMode==="background_only"}
                    @change=${()=>this.svgImportMode="background_only"}
                  />
                  <div class="svg-choice-content">
                    <div class="svg-choice-title">
                      <span>🖼️ Calque de fond simple (Décalque manuel)</span>
                    </div>
                    <div class="svg-choice-desc">
                      Affiche le SVG comme une image en arrière-plan pour tracer les murs manuellement.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `:null}

          <!-- Étalonnage de l'échelle (Mètres réels) -->
          <div>
            <div class="section-title">
              <span>📏</span>
              <span>Échelle du plan (Mètres réels)</span>
            </div>

            <div class="calibrate-options">
              <!-- Option A : Automatisé par dimension globale -->
              <div 
                class="option-card ${this.calibrateMode==="auto_dimension"?"selected":""}"
                @click=${()=>this.calibrateMode="auto_dimension"}
              >
                <input 
                  type="radio" 
                  class="option-radio" 
                  name="calib" 
                  .checked=${this.calibrateMode==="auto_dimension"}
                  @change=${()=>this.calibrateMode="auto_dimension"}
                />
                <div class="option-content">
                  <div class="option-title">
                    <span>⚡ Étalonnage par largeur de façade / bâtiment</span>
                    <span class="option-badge">Recommandé</span>
                  </div>
                  <div class="option-desc">
                    Indiquez la largeur totale de la maison ou du bâtiment. Toutes les cotes métriques et les murs seront calculés précisément.
                  </div>

                  ${this.calibrateMode==="auto_dimension"?f`
                    <div class="input-row" @click=${t=>t.stopPropagation()}>
                      <label style="font-size: 0.82rem; color: #94a3b8;">Largeur totale estimée :</label>
                      <input 
                        type="number" 
                        step="0.5" 
                        min="1" 
                        max="100" 
                        class="dimension-input"
                        .value=${this.totalWidthMeters}
                        @input=${t=>this.handleDimensionChange(parseFloat(t.target.value))}
                      />
                      <span class="unit-tag">mètres</span>
                    </div>
                  `:null}
                </div>
              </div>

              <!-- Option B : Tracé manuel assisté sur un mur (si pas vectorisé) -->
              ${n?null:f`
                <div 
                  class="option-card ${this.calibrateMode==="interactive_calibrate"?"selected":""}"
                  @click=${()=>this.calibrateMode="interactive_calibrate"}
                >
                  <input 
                    type="radio" 
                    class="option-radio" 
                    name="calib" 
                    .checked=${this.calibrateMode==="interactive_calibrate"}
                    @change=${()=>this.calibrateMode="interactive_calibrate"}
                  />
                  <div class="option-content">
                    <div class="option-title">
                      <span>📐 Étalonnage assisté par mesure de mur</span>
                    </div>
                    <div class="option-desc">
                      Vous tracerez un segment directement sur un mur mesuré du plan (ex: 3,50 m) pour étalonner avec précision.
                    </div>
                  </div>
                </div>
              `}
            </div>
          </div>

          <!-- Réglage d'opacité du calque si conservé -->
          ${!n||this.keepSvgBackground?f`
            <div class="slider-row">
              <span class="slider-label">Opacité du fond :</span>
              <input 
                type="range" 
                class="slider-input" 
                min="0.05" 
                max="1.0" 
                step="0.05"
                .value=${this.opacity}
                @input=${t=>this.opacity=parseFloat(t.target.value)}
              />
              <span class="slider-val">${Math.round(this.opacity*100)}%</span>
            </div>
          `:null}
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click=${this.close}>Annuler</button>
          <button 
            class="btn-confirm ${n?"btn-magic":""}" 
            ?disabled=${!this.imageDataUrl} 
            @click=${this.confirmImport}
          >
            ${n?f`
              <span>✨</span>
              <span>Convertir le plan SVG (${e?.wallCount||0} murs)</span>
            `:f`
              <span>🚀</span>
              <span>Charger le plan</span>
            `}
          </button>
        </div>
      </div>
    `}};Q.styles=ye`
    :host {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: #f8fafc;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-card {
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      width: 620px;
      max-width: 94vw;
      max-height: 92vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.2);
      overflow: hidden;
    }

    .modal-header {
      padding: 18px 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(15, 23, 42, 0.5);
    }

    .modal-title-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .modal-icon {
      font-size: 1.6rem;
    }

    .modal-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #f1f5f9;
      margin: 0;
    }

    .modal-subtitle {
      font-size: 0.8rem;
      color: #94a3b8;
      margin: 2px 0 0 0;
    }

    .btn-close {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 20px;
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .btn-close:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .modal-body {
      padding: 22px 24px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    /* Zone de Dépôt / Drag & Drop */
    .drop-zone {
      border: 2px dashed rgba(56, 189, 248, 0.4);
      background: rgba(15, 23, 42, 0.6);
      border-radius: 14px;
      padding: 24px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
    }

    .drop-zone:hover, .drop-zone.dragover {
      border-color: #38bdf8;
      background: rgba(56, 189, 248, 0.08);
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.15);
    }

    .drop-icon {
      font-size: 2.4rem;
    }

    .drop-text {
      font-size: 0.95rem;
      font-weight: 600;
      color: #e2e8f0;
    }

    .drop-subtext {
      font-size: 0.8rem;
      color: #64748b;
    }

    .drop-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 4px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .btn-action-small {
      background: rgba(51, 65, 85, 0.8);
      color: #f1f5f9;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    .btn-action-small:hover {
      background: #0284c7;
      border-color: #38bdf8;
    }

    /* Aperçu du plan chargé */
    .preview-card {
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 12px;
      padding: 12px;
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .preview-thumb {
      width: 100px;
      height: 75px;
      border-radius: 8px;
      object-fit: contain;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: #090d16;
    }

    .preview-meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .preview-title {
      font-size: 0.92rem;
      font-weight: 700;
      color: #38bdf8;
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    .preview-badge-svg {
      font-size: 0.72rem;
      padding: 2px 7px;
      background: rgba(168, 85, 247, 0.25);
      color: #c084fc;
      border: 1px solid rgba(168, 85, 247, 0.5);
      border-radius: 9999px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .preview-dimensions {
      font-size: 0.8rem;
      color: #94a3b8;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .btn-change-image {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #94a3b8;
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 0.75rem;
      cursor: pointer;
      width: fit-content;
      margin-top: 4px;
    }

    .btn-change-image:hover {
      color: #ffffff;
      border-color: #ffffff;
    }

    /* Section Vectorisation Intelligente SVG */
    .svg-interpret-box {
      background: linear-gradient(135deg, rgba(88, 28, 135, 0.25) 0%, rgba(30, 58, 138, 0.25) 100%);
      border: 1.5px solid rgba(168, 85, 247, 0.5);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: 0 4px 20px rgba(168, 85, 247, 0.15);
    }

    .svg-box-header {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .svg-box-icon {
      font-size: 1.5rem;
    }

    .svg-box-title {
      font-size: 0.95rem;
      font-weight: 700;
      color: #f3e8ff;
    }

    .svg-box-subtitle {
      font-size: 0.8rem;
      color: #cbd5e1;
      margin-top: 2px;
    }

    .svg-mode-selector {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .svg-choice-card {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      padding: 12px 14px;
      cursor: pointer;
      display: flex;
      gap: 12px;
      align-items: flex-start;
      transition: all 0.2s ease;
    }

    .svg-choice-card:hover {
      border-color: #c084fc;
      background: rgba(15, 23, 42, 0.85);
    }

    .svg-choice-card.selected {
      border-color: #a855f7;
      background: rgba(168, 85, 247, 0.15);
      box-shadow: 0 0 16px rgba(168, 85, 247, 0.25);
    }

    .svg-choice-radio {
      margin-top: 3px;
      accent-color: #a855f7;
    }

    .svg-choice-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .svg-choice-title {
      font-size: 0.9rem;
      font-weight: 700;
      color: #f8fafc;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .badge-magic {
      font-size: 0.7rem;
      padding: 2px 7px;
      background: rgba(168, 85, 247, 0.3);
      color: #e9d5ff;
      border: 1px solid rgba(168, 85, 247, 0.6);
      border-radius: 9999px;
      font-weight: 700;
    }

    .svg-choice-desc {
      font-size: 0.78rem;
      color: #cbd5e1;
      line-height: 1.35;
    }

    .svg-pills-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }

    .stat-pill {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .stat-pill.wall {
      background: rgba(56, 189, 248, 0.2);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.4);
    }

    .stat-pill.door {
      background: rgba(245, 158, 11, 0.2);
      color: #fbbf24;
      border: 1px solid rgba(245, 158, 11, 0.4);
    }

    .stat-pill.window {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.4);
    }

    .stat-pill.room {
      background: rgba(168, 85, 247, 0.2);
      color: #c084fc;
      border: 1px solid rgba(168, 85, 247, 0.4);
    }

    .stat-pill.label {
      background: rgba(236, 72, 153, 0.2);
      color: #f472b6;
      border: 1px solid rgba(236, 72, 153, 0.4);
    }

    .checkbox-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 6px;
      font-size: 0.8rem;
      color: #cbd5e1;
    }

    .checkbox-wrap input {
      accent-color: #a855f7;
      cursor: pointer;
    }

    /* Boîte de sélection personnalisée des catégories à importer */
    .import-categories-box {
      background: rgba(15, 23, 42, 0.65);
      border: 1px solid rgba(168, 85, 247, 0.35);
      border-radius: 10px;
      padding: 10px 12px;
      margin-top: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .categories-title {
      font-size: 0.8rem;
      font-weight: 700;
      color: #e9d5ff;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .categories-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .category-toggle {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 5px 10px;
      font-size: 0.82rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      color: #94a3b8;
      transition: all 0.15s ease;
      user-select: none;
    }

    .category-toggle:hover {
      border-color: #a855f7;
      color: #ffffff;
    }

    .category-toggle.active {
      background: rgba(168, 85, 247, 0.2);
      border-color: #a855f7;
      color: #f1f5f9;
      font-weight: 600;
    }

    .category-toggle input[type="checkbox"] {
      accent-color: #a855f7;
      cursor: pointer;
      margin: 0;
    }

    .cat-count {
      font-size: 0.75rem;
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .ignored-note {
      font-size: 0.76rem;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.25);
      border-radius: 6px;
      padding: 5px 8px;
      line-height: 1.35;
      margin-top: 4px;
    }

    /* Section Méthode d'Étalonnage */
    .section-title {
      font-size: 0.88rem;
      font-weight: 700;
      color: #cbd5e1;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .calibrate-options {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .option-card {
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 12px 14px;
      cursor: pointer;
      display: flex;
      gap: 12px;
      align-items: flex-start;
      transition: all 0.2s ease;
    }

    .option-card:hover {
      border-color: rgba(56, 189, 248, 0.4);
      background: rgba(15, 23, 42, 0.8);
    }

    .option-card.selected {
      border-color: #38bdf8;
      background: rgba(2, 132, 199, 0.15);
      box-shadow: 0 0 15px rgba(56, 189, 248, 0.15);
    }

    .option-radio {
      margin-top: 3px;
      cursor: pointer;
      accent-color: #38bdf8;
    }

    .option-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .option-title {
      font-size: 0.9rem;
      font-weight: 700;
      color: #f1f5f9;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .option-badge {
      font-size: 0.7rem;
      padding: 2px 6px;
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border-radius: 9999px;
      border: 1px solid rgba(16, 185, 129, 0.4);
      font-weight: 600;
    }

    .option-desc {
      font-size: 0.78rem;
      color: #94a3b8;
      line-height: 1.35;
    }

    .input-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 8px;
    }

    .dimension-input {
      background: #0f172a;
      border: 1px solid rgba(56, 189, 248, 0.4);
      border-radius: 6px;
      color: #f8fafc;
      padding: 6px 10px;
      font-size: 0.95rem;
      font-weight: 700;
      width: 100px;
      text-align: center;
      outline: none;
    }

    .dimension-input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);
    }

    .unit-tag {
      font-size: 0.85rem;
      color: #94a3b8;
      font-weight: 600;
    }

    /* Calque & Opacité */
    .slider-row {
      display: flex;
      align-items: center;
      gap: 14px;
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 10px 14px;
    }

    .slider-label {
      font-size: 0.82rem;
      color: #cbd5e1;
      min-width: 130px;
    }

    .slider-input {
      flex: 1;
      cursor: pointer;
      accent-color: #38bdf8;
    }

    .slider-val {
      font-size: 0.82rem;
      color: #38bdf8;
      font-weight: 700;
      min-width: 40px;
      text-align: right;
    }

    .modal-footer {
      padding: 16px 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(15, 23, 42, 0.5);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
    }

    .btn-cancel {
      background: transparent;
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 0.88rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-cancel:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }

    .btn-confirm {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      border-radius: 8px;
      padding: 8px 20px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
      box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);
    }

    .btn-confirm.btn-magic {
      background: linear-gradient(135deg, #7e22ce 0%, #2563eb 100%);
      border-color: #c084fc;
      box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
    }

    .btn-confirm:hover:not(:disabled) {
      filter: brightness(1.1);
      box-shadow: 0 0 25px rgba(56, 189, 248, 0.5);
    }

    .btn-confirm:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: none;
    }
  `;oe([O({type:String})],Q.prototype,"currentLevel",2);oe([w()],Q.prototype,"imageDataUrl",2);oe([w()],Q.prototype,"imageWidth",2);oe([w()],Q.prototype,"imageHeight",2);oe([w()],Q.prototype,"imageName",2);oe([w()],Q.prototype,"isSvg",2);oe([w()],Q.prototype,"svgRawText",2);oe([w()],Q.prototype,"svgInterpretResult",2);oe([w()],Q.prototype,"svgImportMode",2);oe([w()],Q.prototype,"keepSvgBackground",2);oe([w()],Q.prototype,"importOptions",2);oe([w()],Q.prototype,"calibrateMode",2);oe([w()],Q.prototype,"totalWidthMeters",2);oe([w()],Q.prototype,"opacity",2);oe([w()],Q.prototype,"isDragOver",2);Q=oe([gs("home-architect-import-modal")],Q);const Gn=/^[A-Za-z_][A-Za-z0-9_]*$/,Vn=new Set(["sensor","climate","input_number","number","counter"]),Yn={light:{"--state-light-active-color":"#facc15"},switch:{"--state-switch-active-color":"#38bdf8"}},Xn={"--state-icon-color":"#cbd5e1","--state-inactive-color":"#94a3b8"},As={background:"rgba(15, 23, 42, 0.85)",border:"1px solid rgba(56, 189, 248, 0.5)","border-radius":"8px",padding:"2px 8px","font-size":"11px","font-weight":"700",color:"#38bdf8"},Kn={...As,border:"1px solid rgba(245, 158, 11, 0.5)",color:"#f59e0b"};function js(n){let e='"';const t=String(n??"");for(let i=0;i<t.length;i++){const s=t.charCodeAt(i),o=t[i];if(s>=55296&&s<=56319&&i+1<t.length){const r=t.charCodeAt(i+1);if(r>=56320&&r<=57343){e+=o+t[i+1],i++;continue}}switch(o){case"\\":e+="\\\\";continue;case'"':e+='\\"';continue;case`
`:e+="\\n";continue;case"\r":e+="\\r";continue;case"	":e+="\\t";continue}const a=s<32||s>=127&&s<=159||s===8232||s===8233||s===65279||s>=55296&&s<=57343||s===65534||s===65535;e+=a?`\\u${s.toString(16).padStart(4,"0")}`:o}return`${e}"`}function jt(n){return`# ${String(n??"").replace(/[\x00-\x1f\x7f-\x9f\u2028\u2029]+/g," ").trim()}`}function Lt(n){return Gn.test(n)?n:js(n)}function Ft(n){return n===null?"null":typeof n=="boolean"?n?"true":"false":typeof n=="number"?Number.isFinite(n)?String(n):"0":js(n)}function _t(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function Zt(n,e){const t=" ".repeat(e);if(Array.isArray(n)){const i=[];for(const s of n)if(_t(s)||Array.isArray(s)){const o=Zt(s,e+2);if(o.length===0){i.push(`${t}- ${Array.isArray(s)?"[]":"{}"}`);continue}o[0]=`${t}- ${o[0].slice(e+2)}`,i.push(...o)}else i.push(`${t}- ${Ft(s)}`);return i}if(_t(n)){const i=[];for(const[s,o]of Object.entries(n))if(o!==void 0)if(Array.isArray(o)||_t(o)){const a=Zt(o,e+2);a.length===0?i.push(`${t}${Lt(s)}: ${Array.isArray(o)?"[]":"{}"}`):i.push(`${t}${Lt(s)}:`,...a)}else i.push(`${t}${Lt(s)}: ${Ft(o)}`);return i}return[`${t}${Ft(n)}`]}function Ji(n){return`${Zt(n,0).join(`
`)}
`}function Qi(n,e,t){return n==="navigate"?e.navigationPath?{action:n,navigation_path:e.navigationPath}:{action:t}:{action:n}}function Zn(n,e){const{left:t,top:i}=we.worldToPercentage(n.position,e),s=fs(n.entityId),o=Ys(n.entityId),a=Vn.has(s),r={type:a?"state-label":"state-icon",entity:n.entityId};return s==="climate"&&(r.attribute="current_temperature"),!a&&n.mdiIcon&&(r.icon=n.mdiIcon),n.customName&&(r.title=n.customName),r.tap_action=Qi(n.tapAction??o,n,o),r.hold_action=Qi(n.holdAction??"more-info",n,"more-info"),r.style={top:`${i}%`,left:`${t}%`,transform:"translate(-50%, -50%)",...a?s==="climate"?Kn:As:{...Xn,...Yn[s]}},r}class es{static buildPictureElementsConfig(e,t){const i=we.resolveExportFrame(e,t.frame),s=(e.bindings||[]).filter(o=>o&&o.position&&typeof o.entityId=="string"&&o.entityId.includes(".")).map(o=>Zn(o,i));return{type:"picture-elements",title:t.title??e.name??"",image:t.imageUrl,elements:s}}static generatePictureElementsYaml(e,t){return`${[jt(`Home Architect — carte picture-elements du plan « ${e.name||e.id} »`),jt("Republiez le plan depuis le studio après chaque modification, puis recollez ce code.")].join(`
`)}
${Ji(this.buildPictureElementsConfig(e,t))}`}static generateHomeArchitectCardYaml(e,t){const i={type:"custom:home-architect-card",project_id:e.id,view_mode:t?.viewMode??"2d",show_header:t?.showHeader??!0,height:t?.height??"520px"};return`${jt(`Home Architect — carte intégrée du plan « ${e.name||e.id} »`)}
${Ji(i)}`}}var Jn=Object.defineProperty,ee=(n,e,t,i)=>{for(var s=void 0,o=n.length-1,a;o>=0;o--)(a=n[o])&&(s=a(e,t,s)||s);return s&&Jn(e,t,s),s};const ts={includeRooms:!0,includeWalls:!0,includeOpenings:!0,includeFurniture:!0,includeRoomLabels:!0,includeEntityMarkers:!1,backgroundColor:Ks},ft=/^data:image\//i,Qn=3500;function is(n,e){return(n||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]+/g,"-").replace(/^-+|-+$/g,"").toLowerCase().slice(0,60)||e}const hi=class hi extends Se{constructor(){super(...arguments),this.readOnly=!1,this.dirty=!1,this.activeTab="picture_elements",this.customCardViewMode="2d",this.publishInfo=null,this.localFrame=null,this.frameStale=!1,this.includeBackground=!1,this.downloadWithBackground=!0,this.confirmAction=null,this.busy=null,this.publishError="",this.notice=null,this.copied=null,this.manualCopyText=null,this.frame=null,this.outOfFrame=!1,this.pictureYaml="",this.cardYaml=""}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.noticeTimer),clearTimeout(this.copiedTimer)}willUpdate(e){if(super.willUpdate(e),e.has("project")&&this.project){const t=e.get("project");!t||t.id!==this.project.id?(this.publishInfo=this.project.publish??null,this.includeBackground=this.publishInfo?.include_background??!1,this.localFrame=null,this.frameStale=!1,this.confirmAction=null,this.publishError="",this.manualCopyText=null):t.publish!==this.project.publish&&(this.publishInfo=this.project.publish??null),this.project.exportFrame&&(this.localFrame=null)}this.project&&(e.has("project")||e.has("localFrame")||e.has("publishInfo")||e.has("customCardViewMode"))&&this.recomputeOutputs()}updated(e){if(super.updated(e),e.has("manualCopyText")&&this.manualCopyText!==null){const t=this.renderRoot.querySelector("textarea.manual-copy");t&&(t.focus(),t.select(),t.setSelectionRange(0,t.value.length))}}recomputeOutputs(){const e=this.project;this.frame=we.resolveExportFrame(e,this.localFrame);const t=we.contentBounds(e);this.outOfFrame=!!t&&!we.frameContains(this.frame,t),this.pictureYaml=this.publishInfo?es.generatePictureElementsYaml(e,{imageUrl:this.publishInfo.url,frame:this.frame}):"",this.cardYaml=es.generateHomeArchitectCardYaml(e,{viewMode:this.customCardViewMode})}get canEdit(){return!this.readOnly&&wt(this.hass)}get isSavedOnServer(){return(this.project?.revision??0)>0}get isFrameFrozen(){return!!(this.localFrame||this.project?.exportFrame)}get isWriting(){return this.busy==="publish"||this.busy==="unpublish"}get hasEmbeddableBackground(){const e=this.project?.background;return!!e&&e.visible&&(!!e.assetId||ft.test(e.imageUrl||""))}get hasExternalBackground(){const e=this.project?.background;return!!e&&e.visible&&!e.assetId&&!!e.imageUrl&&!ft.test(e.imageUrl)}get backgroundThumbnail(){const e=this.project?.background;return this.backgroundSrc?this.backgroundSrc:e&&ft.test(e.imageUrl||"")?e.imageUrl:void 0}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}handleClose(){this.isWriting||this.emit("close")}requestSave(){this.emit("save-requested")}showNotice(e,t){clearTimeout(this.noticeTimer),this.notice={kind:e,text:t},this.noticeTimer=setTimeout(()=>{this.notice=null},Qn)}async loadBackgroundBlob(){const e=this.project.background;let t;if(e?.assetId)t=await Xs(this.hass,this.project.id,e.assetId);else if(e&&ft.test(e.imageUrl||""))t=Qt(e.imageUrl);else throw new Error("Aucune image de fond téléversée pour ce plan.");return t.type||!e?.mimeType?t:new Blob([t],{type:e.mimeType})}async loadBackgroundDataUrl(){let e;try{e=await this.loadBackgroundBlob()}catch(s){throw s instanceof xe&&["not_connected","connection_lost","network_error","unauthorized"].includes(s.code)?s:(console.warn("[home-architect] Image de fond illisible :",s),new xe("background_unavailable","Image de fond introuvable ou illisible sur le serveur : décochez « Inclure l'image de fond » ou réimportez l'image."))}const t=Math.ceil(e.size/3)*4;if(t>Et){const s=o=>`${(o/1048576).toFixed(1)} Mo`;throw new mt(`Image de fond trop volumineuse pour être incluse (${s(t)} une fois encodée, maximum ${s(Et)}).`,t,Et)}const i=we.embeddableDataUrl(await rt(e));if(!i)throw new Error("Format d'image de fond non pris en charge (PNG, JPEG, WebP, GIF ou SVG attendu) : décochez « Inclure l'image de fond ».");return i}describeError(e,t=!1){if(e instanceof mt)return t?`${e.message} Décochez « Inclure l'image de fond » ou allégez l'image.`:e.message;if(e instanceof xe)switch(e.code){case"not_found":return"Ce plan n'existe pas encore sur le serveur : sauvegardez-le, puis réessayez.";case"invalid_svg":return"Le serveur a refusé le SVG généré (format non valide).";case"write_failed":return"Le serveur n'a pas pu écrire le plan publié (voir le journal de Home Assistant).";case"unknown_command":return"Le serveur Home Architect n'est pas à jour : redémarrez Home Assistant pour terminer la mise à jour.";case"connection_lost":case"not_connected":return"Connexion à Home Assistant indisponible : réessayez dans un instant.";default:return e.message}return e instanceof Error?e.message:String(e)}async publish(){if(!(!this.canEdit||!this.isSavedOnServer||this.busy||!this.frame)){if(this.publishInfo&&this.confirmAction!=="publish"){this.confirmAction="publish";return}this.confirmAction=null,await this.publishWithFrame(this.frame,!this.isFrameFrozen)}}async publishWithFrame(e,t){if(!this.canEdit||!this.isSavedOnServer||this.busy)return;this.busy="publish",this.publishError="";const i=this.project,s=!!this.publishInfo,o=this.includeBackground&&this.hasEmbeddableBackground;try{const a=o?await this.loadBackgroundDataUrl():void 0,r=we.exportToSvg(i,{...ts,includeBackground:o,backgroundDataUrl:a,frame:e}),l=await Zs(this.hass,i.id,r,{includeBackground:o});t&&(this.localFrame={...e},this.emit("export-frame-changed",{frame:{...e}}),s&&(this.frameStale=!0)),this.publishInfo=l,this.emit("project-published",{publish:l}),this.showNotice("success",t&&s?"Plan publié avec le nouveau cadre : recollez le code YAML.":"Plan publié : copiez le code YAML ci-dessous.")}catch(a){console.warn("[home-architect] Publication du plan impossible :",a),this.publishError=this.describeError(a,o)}finally{this.busy=null}}async unpublishPlan(){if(!(!this.canEdit||this.busy||!this.publishInfo)){if(this.confirmAction!=="unpublish"){this.confirmAction="unpublish";return}this.confirmAction=null,this.busy="unpublish",this.publishError="";try{await Js(this.hass,this.project.id),this.publishInfo=null,this.frameStale=!1,this.emit("project-unpublished",{projectId:this.project.id}),this.showNotice("info","Plan dépublié : l'ancienne URL ne fonctionne plus.")}catch(e){console.warn("[home-architect] Dépublication impossible :",e),this.publishError=this.describeError(e)}finally{this.busy=null}}}async reframe(){if(!this.canEdit||this.busy)return;const e=!!this.publishInfo;if(e&&this.confirmAction!=="reframe"){this.confirmAction="reframe";return}this.confirmAction=null;const t=we.computeContentFrame(this.project);if(e){await this.publishWithFrame(t,!0);return}this.localFrame=t,this.emit("export-frame-changed",{frame:t})}async copyText(e,t){let i=!1;if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{await navigator.clipboard.writeText(e),i=!0}catch{}if(i||(i=this.copyWithTextarea(e)),!i){this.manualCopyText=e;return}this.manualCopyText=null,this.copied=t,clearTimeout(this.copiedTimer),this.copiedTimer=setTimeout(()=>{this.copied=null},2500),this.showNotice("success","Code YAML copié dans le presse-papiers.")}copyWithTextarea(e){const t=document.createElement("textarea");t.value=e,t.readOnly=!0,t.setAttribute("aria-hidden","true"),t.style.cssText="position:fixed;top:0;left:0;width:1px;height:1px;padding:0;border:0;opacity:0;";const i=this.renderRoot.activeElement;this.renderRoot.appendChild(t);try{return t.focus({preventScroll:!0}),t.select(),t.setSelectionRange(0,e.length),document.execCommand("copy")}catch{return!1}finally{t.remove(),i?.focus({preventScroll:!0})}}async downloadSvg(){if(this.busy||!this.frame)return;this.busy="svg";const e=this.frame;try{let t,i=!1;if(this.downloadWithBackground&&this.hasEmbeddableBackground){try{t=we.embeddableDataUrl(await rt(await this.loadBackgroundBlob()))??void 0}catch(o){console.warn("[home-architect] Image de fond non incluse dans le SVG :",o)}i=!t}const s=we.exportToSvg(this.project,{...ts,includeBackground:!!t,backgroundDataUrl:t,frame:e});ki(new Blob([s],{type:"image/svg+xml;charset=utf-8"}),`plan_${is(this.project.name,this.project.id)}.svg`),i&&this.showNotice("info","SVG téléchargé sans l'image de fond (image indisponible).")}catch(t){console.warn("[home-architect] Téléchargement du SVG impossible :",t),this.showNotice("error",`Téléchargement impossible : ${this.describeError(t)}`)}finally{this.busy=null}}async downloadBackup(){if(!this.busy){this.busy="backup";try{const{revision:e,...t}=Qs(ms(this.project));let i=!1;const s=t.background;if(s?.assetId)try{const r=await this.loadBackgroundBlob();s.imageUrl=await rt(r),r.type&&(s.mimeType=r.type),delete s.assetId}catch(r){console.warn("[home-architect] Image de fond non incluse dans la sauvegarde :",r),i=!0}const o=JSON.stringify(t,null,2),a=new Date().toISOString().slice(0,10);ki(new Blob([o],{type:"application/json;charset=utf-8"}),`home-architect_${is(t.name,t.id)}_${a}.json`),this.showNotice(i?"info":"success",i?"Sauvegarde téléchargée sans l'image de fond (image indisponible).":"Sauvegarde du projet téléchargée.")}catch(e){console.warn("[home-architect] Sauvegarde JSON impossible :",e),this.showNotice("error",`Téléchargement impossible : ${this.describeError(e)}`)}finally{this.busy=null}}}getEntitySummary(){const e=this.project?.bindings||[],t=e.filter(l=>l.entityId.startsWith("light.")).length,i=e.filter(l=>l.entityId.startsWith("binary_sensor.")).length,s=e.filter(l=>l.entityId.startsWith("sensor.")||l.entityId.startsWith("climate.")).length,o=e.filter(l=>l.entityId.startsWith("switch.")).length,a=this.project?.rooms?.length||0,r=this.project?.furniture?.length||0;return{lights:t,radars:i,sensors:s,switches:o,rooms:a,furniture:r,total:e.length}}formatDate(e){const t=new Date(e);if(Number.isNaN(t.getTime()))return e;try{return t.toLocaleString(this.hass?.locale?.language||this.hass?.language||void 0)}catch{return t.toLocaleString()}}renderSaveState(){if(!this.canEdit||this.isSavedOnServer&&!this.dirty)return null;const e=!this.isSavedOnServer;return f`
      <div class="banner warning">
        <span class="banner-icon">💾</span>
        <div class="banner-text">
          <div class="banner-title">${e?"Ce plan n'est pas encore sauvegardé sur le serveur":"Modifications non sauvegardées"}</div>
          <div>
            ${e?"La carte intégrée ne le trouvera pas et la publication est impossible tant que le plan n'est pas sauvegardé.":"La carte intégrée affiche la dernière version sauvegardée. Sauvegardez pour que les deux cartes affichent le même plan."}
          </div>
          <div class="actions-row">
            <button class="btn-action emerald" @click=${this.requestSave}>💾 Sauvegarder le plan</button>
          </div>
        </div>
      </div>
    `}renderConfirm(e){if(this.confirmAction!==e)return null;const t=e==="publish"?"Le plan publié sera remplacé par l'état actuel du plan. Les tableaux de bord qui l'utilisent afficheront immédiatement la nouvelle version."+(this.isFrameFrozen?"":" Le cadre actuel sera figé : recollez ensuite le code YAML."):e==="unpublish"?"L'URL publiée cessera de fonctionner : les cartes picture-elements qui l'utilisent afficheront une image cassée. Une nouvelle publication créera une nouvelle URL.":"Le cadre sera recalculé sur le contenu actuel et le plan publié sera mis à jour avec ce cadre : les positions changent, il faudra recoller le nouveau code YAML dans vos tableaux de bord.";return f`
      <div class="banner warning">
        <span class="banner-icon">❓</span>
        <div class="banner-text">
          <div>${t}</div>
          <div class="actions-row">
            <button class="btn-action ${e==="unpublish"?"danger":""}" @click=${e==="publish"?()=>this.publish():e==="unpublish"?()=>this.unpublishPlan():()=>this.reframe()}>Confirmer</button>
            <button class="btn-secondary" @click=${()=>{this.confirmAction=null}}>Annuler</button>
          </div>
        </div>
      </div>
    `}renderPublishSection(){const e=this.publishInfo,t=this.canEdit&&this.isSavedOnServer&&!!this.hass&&!this.busy,i=!e&&bs(this.project.id)!==void 0,s=this.backgroundThumbnail;return f`
      <div class="section">
        <div class="section-title"><span>1.</span><span>Publier le plan</span></div>
        <p class="hint">
          Home Assistant sert le plan publié <strong>sans authentification</strong>, à une adresse secrète impossible à deviner :
          ne la partagez pas. Le plan publié n'est mis à jour que lorsque vous cliquez sur « Publier ».
        </p>

        <div class="status-line">
          ${e?f`
            ✅ Publié le ${this.formatDate(e.published_at)} (${e.include_background?"avec":"sans"} image de fond)<br />
            <code>${e.url}</code>
          `:f`⚪ Pas encore publié.`}
        </div>

        ${this.hasExternalBackground?f`
          <div class="banner info">
            <span class="banner-icon">🌐</span>
            <div class="banner-text">
              L'image de fond est une URL externe : elle n'apparaîtra pas dans la carte picture-elements
              (une image SVG affichée par Lovelace ne charge aucune ressource externe). Importez l'image dans le plan pour pouvoir l'inclure.
            </div>
          </div>
        `:null}

        ${this.hasEmbeddableBackground&&this.canEdit?f`
          <label class="check-row">
            <input
              type="checkbox"
              .checked=${this.includeBackground}
              ?disabled=${!!this.busy}
              @change=${o=>{this.includeBackground=o.target.checked}}
            />
            ${s?f`<img class="bg-thumb" src=${s} alt="" />`:null}
            <div>
              <div class="config-label">Inclure l'image de fond</div>
              <div class="hint">
                ${this.includeBackground?f`⚠️ <strong>URL publique :</strong> toute personne qui obtient l'URL pourra voir cette image (plan d'architecte, photo…).`:"Seuls les murs, pièces, ouvertures et meubles sont publiés."}
              </div>
            </div>
          </label>
        `:null}

        ${e?.legacy_path?f`
          <div class="banner warning">
            <span class="banner-icon">⚠️</span>
            <div class="banner-text">
              <div class="banner-title">Ancien fichier public détecté : <code>${e.legacy_path}</code></div>
              <div>
                Il est réécrit à chaque publication et reste accessible sans authentification sous une adresse devinable.
                Remplacez-le dans vos tableaux de bord par le nouveau code YAML, puis cliquez sur « Dépublier » et republiez :
                il sera supprimé (une copie retouchée hors de l'outil est conservée dans <code>/config/home_architect/backups/</code>).
              </div>
            </div>
          </div>
        `:null}

        ${i&&this.canEdit?f`
          <p class="hint">
            Si un ancien fichier <code>/local/plan_${this.project.id}.svg</code> existe dans <code>/config/www</code>, il sera lui aussi mis à jour à chaque publication.
          </p>
        `:null}

        ${this.renderConfirm("publish")}
        ${this.renderConfirm("unpublish")}

        ${this.canEdit?f`
          <div class="actions-row">
            <button class="btn-action emerald" ?disabled=${!t} @click=${this.publish}>
              ${this.busy==="publish"?"⏳ Publication…":e?"🔄 Mettre à jour le plan publié":"🚀 Publier le plan"}
            </button>
            ${e?f`
              <button class="btn-action danger" ?disabled=${!!this.busy} @click=${this.unpublishPlan}>
                ${this.busy==="unpublish"?"⏳ Dépublication…":"🗑️ Dépublier"}
              </button>
            `:null}
          </div>
        `:f`<p class="hint">Seul un administrateur peut publier ou mettre à jour le plan.</p>`}

        ${this.publishError?f`
          <div class="banner error">
            <span class="banner-icon">⚠️</span>
            <div class="banner-text">${this.publishError}</div>
          </div>
        `:null}
      </div>
    `}renderFrameSection(){const e=this.frame;if(!e)return null;const t=(e.maxX-e.minX).toFixed(1),i=(e.maxY-e.minY).toFixed(1);return f`
      <div class="section">
        <div class="section-title"><span>2.</span><span>Cadre d'export</span></div>
        <p class="hint">
          Les positions des entités sont exprimées en pourcentage de ce cadre (${t} × ${i} m).
          ${this.isFrameFrozen?"Il est figé : vos modifications du plan ne décalent pas les cartes déjà collées.":"Il sera figé à la prochaine publication, pour que les cartes déjà collées restent alignées."}
        </p>

        ${this.publishInfo&&!this.isFrameFrozen?f`
          <div class="banner warning">
            <span class="banner-icon">📐</span>
            <div class="banner-text">
              Le cadre de la publication actuelle n'a pas été conservé dans le plan : le code YAML ci-dessous peut ne pas
              correspondre au plan publié. Mettez à jour le plan publié pour figer le cadre, puis recollez le code YAML.
            </div>
          </div>
        `:null}

        ${this.outOfFrame?f`
          <div class="banner warning">
            <span class="banner-icon">📐</span>
            <div class="banner-text">
              Le plan dépasse le cadre figé : les éléments hors cadre seront coupés ou mal placés. Recadrez pour l'agrandir.
            </div>
          </div>
        `:null}

        ${this.frameStale?f`
          <div class="banner warning">
            <span class="banner-icon">🔁</span>
            <div class="banner-text">
              Le plan publié utilise un nouveau cadre : recollez le nouveau code YAML dans vos tableaux de bord
              (les positions des entités ont changé).
            </div>
          </div>
        `:null}

        ${this.renderConfirm("reframe")}

        ${this.canEdit&&this.isFrameFrozen?f`
          <div class="actions-row">
            <button class="btn-action ghost" ?disabled=${!!this.busy||!!this.publishInfo&&!this.isSavedOnServer} @click=${this.reframe}>
              ${this.publishInfo?"📐 Recadrer sur le plan actuel et republier":"📐 Recadrer sur le plan actuel"}
            </button>
          </div>
        `:null}
      </div>
    `}renderCode(e,t,i){const s=this.copied===t;return f`
      <div class="code-container">
        <div class="code-header">
          <span>${i}</span>
          <button class="btn-copy ${s?"copied":""}" @click=${()=>this.copyText(e,t)}>
            <span>${s?"✓ Copié !":"📋 Copier le YAML"}</span>
          </button>
        </div>
        <pre class="code-box"><code>${e}</code></pre>
      </div>
    `}renderPictureElementsTab(){const e=(this.project.bindings||[]).length>0;return f`
      ${this.renderSaveState()}
      ${this.renderPublishSection()}
      ${this.renderFrameSection()}

      <div class="section">
        <div class="section-title"><span>3.</span><span>Code Lovelace</span></div>
        ${this.pictureYaml?f`
          ${e?null:f`
            <p class="hint">Aucune entité n'est placée sur le plan : la carte affichera le plan seul (<code>elements: []</code>).</p>
          `}
          ${this.renderCode(this.pictureYaml,"picture","Code YAML Picture-Elements")}
        `:f`
          <p class="hint">Publiez le plan pour obtenir le code de la carte picture-elements (il référence l'URL publiée).</p>
        `}
      </div>

      <div class="guide-box">
        <div class="guide-title">
          <span>💡</span>
          <span>Comment installer cette carte dans Home Assistant :</span>
        </div>
        <div class="guide-step">
          <span class="guide-num">1</span>
          <div>Sauvegardez puis <strong>publiez</strong> le plan (l'image est servie par Home Assistant, aucun fichier à copier).</div>
        </div>
        <div class="guide-step">
          <span class="guide-num">2</span>
          <div>Cliquez sur <strong>Copier le YAML</strong>.</div>
        </div>
        <div class="guide-step">
          <span class="guide-num">3</span>
          <div>
            Dans votre tableau de bord, cliquez sur <strong>Modifier le tableau de bord</strong> > <strong>Ajouter une carte</strong> > <strong>Manuel</strong>, collez le code et enregistrez.
          </div>
        </div>
        <div class="guide-step">
          <span class="guide-num">4</span>
          <div>Après une modification du plan, cliquez sur <strong>Mettre à jour le plan publié</strong> : l'URL reste la même et les tableaux de bord se mettent à jour.</div>
        </div>
      </div>
    `}renderCustomCardTab(){return f`
      ${this.renderSaveState()}

      <div class="guide-box" style="background: rgba(168, 85, 247, 0.08); border-color: rgba(168, 85, 247, 0.3);">
        <div class="guide-title" style="color: #c084fc;">
          <span>✨</span>
          <span>Carte 2D & 3D temps réel, sans publication</span>
        </div>
        <div style="font-size: 0.82rem; color: #cbd5e1; line-height: 1.45;">
          Cette carte utilise directement le moteur de rendu Home Architect et lit le plan <strong>sauvegardé</strong> sur votre serveur
          (aucune URL publique). Elle affiche votre plan en 2D ou en <strong>3D isométrique</strong>, anime les capteurs en temps réel,
          et se met à jour à chaque sauvegarde du plan.
        </div>
      </div>

      <div class="config-row">
        <span class="config-label">Mode de vue par défaut :</span>
        <div class="actions-row">
          <button
            class="btn-action ${this.customCardViewMode==="2d"?"":"ghost"}"
            @click=${()=>{this.customCardViewMode="2d"}}
          >
            📐 Vue 2D
          </button>
          <button
            class="btn-action ${this.customCardViewMode==="3d"?"purple":"ghost"}"
            @click=${()=>{this.customCardViewMode="3d"}}
          >
            🧊 Vue 3D Isométrique
          </button>
        </div>
      </div>

      ${this.renderCode(this.cardYaml,"card","Code Lovelace YAML")}

      <div class="guide-box">
        <div class="guide-title">
          <span>🚀</span>
          <span>Installation rapide :</span>
        </div>
        <div class="guide-step">
          <span class="guide-num">1</span>
          <div>Sauvegardez le plan (la carte lit la version sauvegardée).</div>
        </div>
        <div class="guide-step">
          <span class="guide-num">2</span>
          <div>
            Dans Lovelace, cliquez sur <strong>Modifier le tableau de bord</strong> > <strong>Ajouter une carte</strong> > <strong>Manuel</strong>, collez ce code YAML et enregistrez.
          </div>
        </div>
      </div>
    `}renderFilesTab(){return f`
      <div class="config-row">
        <div>
          <div class="config-label">Fichier vectoriel SVG</div>
          <div class="hint">Idéal pour ouvrir dans Inkscape, Illustrator ou imprimer (même cadre que le plan publié).</div>
          ${this.hasEmbeddableBackground?f`
            <label class="check-row" style="margin-top: 8px;">
              <input
                type="checkbox"
                .checked=${this.downloadWithBackground}
                @change=${e=>{this.downloadWithBackground=e.target.checked}}
              />
              <span class="hint">Inclure l'image de fond</span>
            </label>
          `:null}
        </div>
        <button class="btn-action emerald" ?disabled=${!!this.busy} @click=${this.downloadSvg}>
          <span>📐</span>
          <span>${this.busy==="svg"?"Préparation…":"Télécharger le SVG"}</span>
        </button>
      </div>

      <div class="config-row">
        <div>
          <div class="config-label">Sauvegarde complète du projet (JSON)</div>
          <div class="hint">
            Murs, pièces, ouvertures, meubles, entités et image de fond. Réimportable depuis la fenêtre d'import (fichier .json).
          </div>
        </div>
        <button class="btn-action purple" ?disabled=${!!this.busy} @click=${this.downloadBackup}>
          <span>💾</span>
          <span>${this.busy==="backup"?"Préparation…":"Télécharger la sauvegarde JSON"}</span>
        </button>
      </div>
    `}render(){if(!this.project)return null;const e=this.getEntitySummary(),t=this.activeTab==="picture_elements"?this.pictureYaml:this.activeTab==="custom_card"?this.cardYaml:"",i=this.activeTab==="custom_card"?"card":"picture";return f`
      <div class="modal-card" @click=${s=>s.stopPropagation()}>
        <!-- En-tête -->
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon">📤</span>
            <div>
              <h2 class="modal-title">Exporter le plan vers Lovelace</h2>
              <p class="modal-subtitle">Générez une carte interactive pour votre tableau de bord Home Assistant</p>
            </div>
          </div>
          <button class="btn-close" ?disabled=${this.isWriting} @click=${this.handleClose} title="Fermer">✕</button>
        </div>

        <!-- Onglets -->
        <div class="tabs-nav">
          <button
            class="tab-btn ${this.activeTab==="picture_elements"?"active":""}"
            @click=${()=>{this.activeTab="picture_elements"}}
          >
            <span>🖼️</span>
            <span>Carte Picture-Elements (Native)</span>
          </button>

          <button
            class="tab-btn ${this.activeTab==="custom_card"?"active":""}"
            @click=${()=>{this.activeTab="custom_card"}}
          >
            <span>🧊</span>
            <span>Carte 2D/3D (Intégrée)</span>
          </button>

          <button
            class="tab-btn ${this.activeTab==="raw_files"?"active":""}"
            @click=${()=>{this.activeTab="raw_files"}}
          >
            <span>💾</span>
            <span>Fichiers & Sauvegarde</span>
          </button>
        </div>

        <!-- Corps de la modale -->
        <div class="modal-body">
          <!-- Résumé des entités liées -->
          <div class="stats-row">
            <div class="stat-badge highlight">
              <span>🏠</span>
              <span><strong>${e.rooms}</strong> pièces</span>
            </div>
            <div class="stat-badge">
              <span>💡</span>
              <span><strong>${e.lights}</strong> lumière(s)</span>
            </div>
            <div class="stat-badge">
              <span>📡</span>
              <span><strong>${e.radars}</strong> détecteur(s)</span>
            </div>
            <div class="stat-badge">
              <span>🌡️</span>
              <span><strong>${e.sensors}</strong> capteur(s) / temp.</span>
            </div>
            <div class="stat-badge">
              <span>🔌</span>
              <span><strong>${e.switches}</strong> prise(s) / switch</span>
            </div>
            ${e.furniture>0?f`
              <div class="stat-badge">
                <span>🛋️</span>
                <span><strong>${e.furniture}</strong> meuble(s)</span>
              </div>
            `:""}
          </div>

          ${this.manualCopyText!==null?f`
            <div class="banner info">
              <span class="banner-icon">📋</span>
              <div class="banner-text">
                <div>Copie automatique impossible dans ce navigateur : le code est sélectionné ci-dessous, copiez-le avec Ctrl+C (⌘C) ou le menu « Copier ».</div>
                <textarea class="manual-copy" readonly .value=${this.manualCopyText}></textarea>
                <div class="actions-row">
                  <button class="btn-secondary" @click=${()=>{this.manualCopyText=null}}>Fermer</button>
                </div>
              </div>
            </div>
          `:null}

          ${this.activeTab==="picture_elements"?this.renderPictureElementsTab():null}
          ${this.activeTab==="custom_card"?this.renderCustomCardTab():null}
          ${this.activeTab==="raw_files"?this.renderFilesTab():null}
        </div>

        <!-- Notification flottante -->
        ${this.notice?f`
          <div class="floating-toast ${this.notice.kind}" role="status">
            <span>${this.notice.kind==="error"?"⚠️":this.notice.kind==="success"?"✅":"ℹ️"}</span>
            <span>${this.notice.text}</span>
          </div>
        `:null}

        <!-- Pied de page -->
        <div class="modal-footer">
          <button class="btn-secondary" ?disabled=${this.isWriting} @click=${this.handleClose}>Fermer</button>
          ${t?f`
            <button
              class="btn-action ${this.copied===i?"emerald":this.activeTab==="custom_card"?"purple":""}"
              style="padding: 10px 22px; font-size: 0.92rem; font-weight: 700;"
              @click=${()=>this.copyText(t,i)}
            >
              <span>📋</span>
              <span>${this.copied===i?"Copié dans le presse-papiers !":"Copier le YAML dans le presse-papiers"}</span>
            </button>
          `:null}
        </div>
      </div>
    `}};hi.styles=ye`
    :host {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(14px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: #f8fafc;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-card {
      position: relative;
      background: #1e293b;
      border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 16px;
      width: 720px;
      max-width: 94vw;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px rgba(56, 189, 248, 0.25);
      overflow: hidden;
    }

    .modal-header {
      padding: 16px 22px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(15, 23, 42, 0.7);
    }

    .modal-title-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .modal-icon {
      font-size: 1.6rem;
    }

    .modal-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #f1f5f9;
      margin: 0;
    }

    .modal-subtitle {
      font-size: 0.8rem;
      color: #94a3b8;
      margin: 2px 0 0 0;
    }

    .btn-close {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 20px;
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .btn-close:hover:not(:disabled) {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .btn-close:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* Onglets de navigation */
    .tabs-nav {
      display: flex;
      flex-wrap: wrap;
      background: rgba(15, 23, 42, 0.5);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0 16px;
      gap: 6px;
    }

    .tab-btn {
      padding: 12px 16px;
      font-size: 0.88rem;
      font-weight: 600;
      color: #94a3b8;
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
    }

    .tab-btn:hover {
      color: #e2e8f0;
    }

    .tab-btn.active {
      color: #38bdf8;
      border-bottom-color: #38bdf8;
      background: rgba(56, 189, 248, 0.06);
    }

    .modal-body {
      padding: 20px 24px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
      flex: 1;
    }

    /* Entités stats banner */
    .stats-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 10px 14px;
    }

    .stat-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.82rem;
      padding: 4px 10px;
      border-radius: 6px;
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #cbd5e1;
    }

    .stat-badge.highlight {
      border-color: #38bdf8;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.1);
    }

    /* Sections (publication, cadre, code) */
    .section {
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 14px 16px;
    }

    .section-title {
      font-size: 0.92rem;
      font-weight: 700;
      color: #38bdf8;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .hint {
      font-size: 0.8rem;
      color: #94a3b8;
      line-height: 1.45;
      margin: 0;
    }

    .hint code,
    .banner code,
    .status-line code {
      background: rgba(0, 0, 0, 0.35);
      padding: 1px 6px;
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-size: 0.78rem;
      word-break: break-all;
    }

    .status-line {
      font-size: 0.84rem;
      color: #e2e8f0;
      line-height: 1.5;
    }

    .actions-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }

    /* Section Actions / Configuration */
    .config-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 10px 14px;
    }

    .config-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #e2e8f0;
    }

    .check-row {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      cursor: pointer;
      user-select: none;
    }

    .check-row input {
      accent-color: #38bdf8;
      width: 16px;
      height: 16px;
      margin-top: 2px;
      cursor: pointer;
      flex-shrink: 0;
    }

    .bg-thumb {
      width: 64px;
      height: 48px;
      object-fit: cover;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      flex-shrink: 0;
    }

    /* Bouton action primaire */
    .btn-action {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
      text-decoration: none;
    }

    .btn-action:hover:not(:disabled) {
      background: #0369a1;
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.45);
    }

    .btn-action:disabled,
    .btn-secondary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-action.emerald {
      background: #059669;
      border-color: #10b981;
    }

    .btn-action.emerald:hover:not(:disabled) {
      background: #047857;
      box-shadow: 0 0 14px rgba(16, 185, 129, 0.45);
    }

    .btn-action.purple {
      background: #7c3aed;
      border-color: #a855f7;
    }

    .btn-action.purple:hover:not(:disabled) {
      background: #6d28d9;
      box-shadow: 0 0 14px rgba(168, 85, 247, 0.45);
    }

    .btn-action.danger {
      background: rgba(239, 68, 68, 0.15);
      border-color: rgba(239, 68, 68, 0.6);
      color: #fca5a5;
    }

    .btn-action.danger:hover:not(:disabled) {
      background: #b91c1c;
      color: #ffffff;
      box-shadow: 0 0 14px rgba(239, 68, 68, 0.45);
    }

    .btn-action.ghost {
      background: rgba(30, 41, 59, 0.8);
      border-color: rgba(255, 255, 255, 0.15);
      color: #e2e8f0;
    }

    /* Zone de code YAML */
    .code-container {
      position: relative;
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid rgba(56, 189, 248, 0.3);
      background: #090d16;
    }

    .code-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 14px;
      background: rgba(15, 23, 42, 0.8);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 0.8rem;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .btn-copy {
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid rgba(56, 189, 248, 0.35);
      color: #38bdf8;
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    .btn-copy:hover {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
    }

    .btn-copy.copied {
      background: #059669;
      border-color: #10b981;
      color: #ffffff;
    }

    pre.code-box {
      margin: 0;
      padding: 14px 16px;
      max-height: 280px;
      overflow: auto;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 0.82rem;
      line-height: 1.5;
      color: #e2e8f0;
      white-space: pre;
    }

    textarea.manual-copy {
      width: 100%;
      box-sizing: border-box;
      min-height: 140px;
      background: #090d16;
      color: #e2e8f0;
      border: 1px solid #38bdf8;
      border-radius: 8px;
      padding: 10px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.8rem;
      resize: vertical;
    }

    /* Guide pas-à-pas */
    .guide-box {
      background: rgba(56, 189, 248, 0.06);
      border: 1px solid rgba(56, 189, 248, 0.2);
      border-radius: 10px;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .guide-title {
      font-size: 0.86rem;
      font-weight: 700;
      color: #38bdf8;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .guide-step {
      font-size: 0.8rem;
      color: #cbd5e1;
      line-height: 1.45;
      display: flex;
      gap: 8px;
    }

    .guide-num {
      background: #0284c7;
      color: #ffffff;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.72rem;
      font-weight: bold;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .modal-footer {
      padding: 14px 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 10px;
      background: rgba(15, 23, 42, 0.6);
    }

    .btn-secondary {
      background: rgba(51, 65, 85, 0.7);
      color: #cbd5e1;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-secondary:hover:not(:disabled) {
      background: #475569;
      color: #ffffff;
    }

    /* Bandeaux d'information / d'avertissement */
    .banner {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 0.82rem;
      line-height: 1.45;
      animation: fadeIn 0.2s ease-out;
    }

    .banner.success {
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: #6ee7b7;
    }

    .banner.info {
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.35);
      color: #bae6fd;
    }

    .banner.warning {
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid rgba(245, 158, 11, 0.45);
      color: #fcd34d;
    }

    .banner.error {
      background: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #fca5a5;
    }

    .banner-icon {
      font-size: 1.2rem;
      flex-shrink: 0;
      line-height: 1.2;
    }

    .banner-text {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .banner-title {
      font-weight: 700;
      font-size: 0.86rem;
    }

    /* Notification flottante */
    .floating-toast {
      position: absolute;
      top: 18px;
      left: 50%;
      transform: translateX(-50%);
      max-width: 90%;
      padding: 10px 22px;
      border-radius: 12px;
      font-size: 0.88rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
      z-index: 200;
      animation: popToast 0.25s ease-out;
      pointer-events: none;
      color: #ffffff;
    }

    .floating-toast.success {
      background: #059669;
      border: 1px solid #10b981;
    }

    .floating-toast.error {
      background: #b91c1c;
      border: 1px solid #ef4444;
    }

    .floating-toast.info {
      background: #0369a1;
      border: 1px solid #38bdf8;
    }

    @keyframes popToast {
      from { transform: translate(-50%, -10px); opacity: 0; }
      to { transform: translate(-50%, 0); opacity: 1; }
    }
  `;let V=hi;ee([O({type:Object})],V.prototype,"project");ee([O({type:Object})],V.prototype,"hass");ee([O({type:String})],V.prototype,"backgroundSrc");ee([O({type:Boolean})],V.prototype,"readOnly");ee([O({type:Boolean})],V.prototype,"dirty");ee([w()],V.prototype,"activeTab");ee([w()],V.prototype,"customCardViewMode");ee([w()],V.prototype,"publishInfo");ee([w()],V.prototype,"localFrame");ee([w()],V.prototype,"frameStale");ee([w()],V.prototype,"includeBackground");ee([w()],V.prototype,"downloadWithBackground");ee([w()],V.prototype,"confirmAction");ee([w()],V.prototype,"busy");ee([w()],V.prototype,"publishError");ee([w()],V.prototype,"notice");ee([w()],V.prototype,"copied");ee([w()],V.prototype,"manualCopyText");Ae("home-architect-export-modal",V);const ea="home_architect",ta=1,yt="drafts",ia=3e3;let be=null;function sa(){if(be)return be;const n=new Promise(e=>{let t=!1,i;const s=o=>{if(t){o?.close();return}t=!0,clearTimeout(i),e(o)};try{if(typeof indexedDB>"u"||!indexedDB){s(null);return}i=setTimeout(()=>s(null),ia);const o=indexedDB.open(ea,ta);o.onupgradeneeded=()=>{const a=o.result;a.objectStoreNames.contains(yt)||a.createObjectStore(yt,{keyPath:"projectId"})},o.onsuccess=()=>{const a=o.result;a.onversionchange=()=>{a.close(),be===n&&(be=null)},a.onclose=()=>{be===n&&(be=null)},s(a)},o.onerror=()=>s(null)}catch{s(null)}});return be=n,n.then(e=>{!e&&be===n&&(be=null)}),n}async function It(n,e,t,i){const s=sa(),o=await s;return o?new Promise(a=>{try{let r;try{r=o.transaction(yt,n)}catch(u){throw be===s&&(be=null),u}const l=e(r.objectStore(yt));let c=i;l.onsuccess=()=>{c=t(l.result)},r.oncomplete=()=>a(c),r.onerror=()=>a(i),r.onabort=()=>a(i)}catch{a(i)}}):i}function Ls(n){if(typeof n!="object"||n===null)return null;const e=n;if(typeof e.projectId!="string"||!vs.test(e.projectId)||typeof e.project!="object"||e.project===null)return null;const t=ms({...e.project,id:e.projectId}),i=e.baseRevision;return{projectId:e.projectId,project:t,savedAt:typeof e.savedAt=="string"?e.savedAt:new Date(0).toISOString(),baseRevision:typeof i=="number"&&Number.isInteger(i)&&i>=0?i:null}}function ss(n,e){if(!n||typeof n.id!="string"||!vs.test(n.id))return Promise.resolve(!1);let t;try{t={projectId:n.id,project:JSON.parse(JSON.stringify(n)),savedAt:new Date().toISOString(),baseRevision:typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}}catch{return Promise.resolve(!1)}return It("readwrite",i=>i.put(t),()=>!0,!1)}function oa(n){return It("readonly",e=>e.get(n),Ls,null)}function nt(n){return It("readwrite",e=>e.delete(n),()=>{},void 0)}function Fs(){return It("readonly",n=>n.getAll(),n=>(Array.isArray(n)?n:[]).map(Ls).filter(e=>e!==null).sort((e,t)=>t.savedAt.localeCompare(e.savedAt)),[])}var na=Object.defineProperty,se=(n,e,t,i)=>{for(var s=void 0,o=n.length-1,a;o>=0;o--)(a=n[o])&&(s=a(e,t,s)||s);return s&&na(e,t,s),s};const aa=Object.freeze([...Bt,bt]),os=200,ns=64;function as(n){const e=n?Date.parse(n):NaN;return Number.isFinite(e)?e:0}function rs(n){return n instanceof xe||n instanceof Error?n.message:String(n)}function ra(n,e){const t=new Map;for(const i of n)t.set(i.id,{id:i.id,name:i.name,category:i.category,updatedAt:i.updated_at,counts:{...i.counts},onServer:!0,revision:i.revision});for(const i of e){const s=t.get(i.projectId);if(s){s.draftSavedAt=i.savedAt,s.draftBaseRevision=i.baseRevision;continue}const o=i.project;t.set(i.projectId,{id:i.projectId,name:o.name,category:o.category,updatedAt:i.savedAt,counts:{walls:o.walls.length,rooms:o.rooms.length,bindings:o.bindings.length,furniture:(o.furniture??[]).length},onServer:!1,draftSavedAt:i.savedAt,draftBaseRevision:i.baseRevision})}return[...t.values()].sort((i,s)=>as(s.updatedAt)-as(i.updatedAt))}function la(n){return to(n)?.icon??bt.icon}function gt(n,e,t){return`${n} ${n>1?t:e}`}const fi=class fi extends Se{constructor(){super(...arguments),this.mode="save",this.readOnly=!1,this.dirtyProjectIds=[],this.activeTab="save",this.planName="",this.planCategory=ke,this.customCategoryName="",this.rows=[],this.listState="loading",this.listError=null,this.actionError=null,this.searchQuery="",this.pendingDeleteId=null,this.deletingId=null,this.pendingLoadId=null,this.formInitialized=!1,this.listRequest=0,this.listHadHass=!0}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.listState==="loading"&&this.refreshList()}disconnectedCallback(){super.disconnectedCallback(),this.listRequest++}firstUpdated(){this.refreshList()}updated(e){e.has("hass")&&!e.get("hass")&&this.hass&&(this.listError||!this.listHadHass)&&this.refreshList()}willUpdate(e){e.has("mode")&&(this.activeTab=this.mode==="load"?"load":"save"),!this.formInitialized&&this.project&&(this.formInitialized=!0,this.initForm(this.project))}initForm(e){this.planName=e.name||"Plan de Maison";const t=e.category??bs(e.id)??ke;kt(t)||t===Ye?(this.planCategory=t,this.customCategoryName=""):(this.planCategory=Ye,this.customCategoryName=t)}get isReadOnly(){return this.readOnly||!wt(this.hass)}async refreshList(){const e=++this.listRequest;this.listHadHass=!!this.hass,this.listState="loading",this.listError=null;const t=Fs();let i=[],s=null;try{i=await Ut(this.hass)}catch(a){s=rs(a)}const o=await t;e===this.listRequest&&(this.rows=ra(i,o),this.listError=s,this.listState="ready")}get selectedCategory(){return this.planCategory!==Ye?this.planCategory:this.customCategoryName.trim().slice(0,ns)||Ye}handleSave(e){if(this.isReadOnly)return;const t=(this.planName.trim()||"Plan sans nom").slice(0,os);this.dispatchEvent(new CustomEvent("save-confirmed",{detail:{name:t,category:this.selectedCategory,saveAs:e},bubbles:!0,composed:!0}))}loadWarning(e){const t=new Set(this.dirtyProjectIds??[]),i=this.project;return i&&i.id===e.id&&t.has(e.id)?`« ${e.name} » est ouvert et contient des modifications non sauvegardées : elles seront remplacées par la version enregistrée.`:i&&i.id!==e.id&&t.has(i.id)?`« ${i.name} » contient des modifications non sauvegardées qui seront perdues si vous ouvrez « ${e.name} » sans enregistrer.`:t.has(e.id)?`« ${e.name} » contient des modifications non sauvegardées en mémoire : la version enregistrée les remplacera.`:null}requestLoad(e){if(this.pendingDeleteId=null,this.actionError=null,this.loadWarning(e)&&this.pendingLoadId!==e.id){this.pendingLoadId=e.id;return}this.pendingLoadId=null,this.dispatchEvent(new CustomEvent("load-project",{detail:{projectId:e.id},bubbles:!0,composed:!0}))}canDelete(e){return!e.onServer||!this.isReadOnly}requestDelete(e){this.pendingLoadId=null,this.actionError=null,this.pendingDeleteId=e.id}async confirmDelete(e){if(!(this.deletingId||!this.canDelete(e))){this.deletingId=e.id,this.actionError=null;try{e.onServer&&await eo(this.hass,e.id),await nt(e.id),this.rows=this.rows.filter(t=>t.id!==e.id),this.pendingDeleteId=null,e.onServer&&this.dispatchEvent(new CustomEvent("project-deleted",{detail:{projectId:e.id},bubbles:!0,composed:!0}))}catch(t){this.actionError=`Suppression de « ${e.name} » impossible : ${rs(t)}`}finally{this.deletingId=null}}}handleClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}handleKeyDown(e){e.key==="Escape"&&(e.stopPropagation(),this.pendingDeleteId||this.pendingLoadId?(this.pendingDeleteId=null,this.pendingLoadId=null):this.handleClose())}formatDate(e){const t=e?Date.parse(e):NaN;return Number.isFinite(t)?new Date(t).toLocaleString("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}):"date inconnue"}draftBadge(e){const t=this.formatDate(e.draftSavedAt),i=e.draftBaseRevision;return e.onServer?typeof i=="number"&&typeof e.revision=="number"&&i<e.revision?{text:`Copie locale du ${t} (antérieure à la version du serveur)`,title:"Brouillon commencé sur une version plus ancienne : le plan a été enregistré depuis, ailleurs ou sur cet appareil"}:{text:`Copie locale du ${t} (modifications non envoyées)`,title:"Brouillon enregistré sur cet appareil et pas encore envoyé au serveur"}:this.listError?{text:`Copie locale du ${t} (serveur injoignable)`,title:"La liste du serveur n'a pas pu être lue : ce plan y existe peut-être aussi"}:typeof i=="number"?{text:`Copie locale du ${t} (plan absent du serveur)`,title:"Ce plan a été enregistré puis supprimé du serveur : ouvrez-le et enregistrez-le pour le recréer"}:{text:"Copie locale uniquement (jamais enregistrée sur le serveur)",title:"Ce plan n'existe que sur cet appareil : ouvrez-le puis enregistrez-le pour l'envoyer au serveur"}}renderSaveTab(){const e=this.isReadOnly,t=this.project,i=t?this.rows.find(a=>a.id===t.id&&a.onServer):void 0,s=this.selectedCategory,o=this.rows.filter(a=>a.onServer&&a.id!==t?.id&&a.category===s);return f`
      ${e?f`
        <div class="banner banner-warning" role="status">
          <span>🔒</span>
          <span class="banner-text">Lecture seule : seul un administrateur Home Assistant peut enregistrer des plans.</span>
        </div>
      `:_}

      <!-- Formulaire Sauvegarde -->
      <div class="form-group">
        <label class="form-label" for="plan-name">
          <span>🏷️</span>
          <span>Nom du plan :</span>
        </label>
        <input 
          id="plan-name"
          type="text" 
          class="form-input" 
          maxlength=${os}
          .value=${this.planName}
          ?disabled=${e}
          @input=${a=>this.planName=a.target.value}
          @keydown=${a=>{a.key==="Enter"&&!a.isComposing&&this.handleSave(!1)}}
          placeholder="Ex: Plan RDC Maison, Plan Jardin Été..."
          autofocus
        />
      </div>

      <div class="form-group">
        <span class="form-label">
          <span>🏢</span>
          <span>Catégorie du plan (Niveau / Zone) :</span>
        </span>
        <div class="categories-grid" role="radiogroup" aria-label="Catégorie du plan">
          ${aa.map(a=>f`
            <div 
              class="category-card ${this.planCategory===a.id?"selected":""} ${e?"disabled":""}"
              role="radio"
              aria-checked=${this.planCategory===a.id?"true":"false"}
              aria-disabled=${e?"true":"false"}
              tabindex=${e?-1:0}
              @click=${()=>{e||(this.planCategory=a.id)}}
              @keydown=${r=>{!e&&(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),this.planCategory=a.id)}}
            >
              <span class="cat-icon">${a.icon}</span>
              <span>${a.label}</span>
            </div>
          `)}
        </div>

        ${this.planCategory===Ye?f`
          <div style="margin-top: 8px;">
            <input 
              type="text" 
              class="form-input" 
              maxlength=${ns}
              .value=${this.customCategoryName}
              ?disabled=${e}
              @input=${a=>this.customCategoryName=a.target.value}
              placeholder="Précisez la catégorie (ex: Combles, Terrasse, Garage...)"
            />
          </div>
        `:_}
      </div>

      ${!e&&i?f`
        <div class="banner banner-info">
          <span>ℹ️</span>
          <span class="banner-text">
            Ce plan est déjà enregistré (modifié le ${this.formatDate(i.updatedAt)}) :
            « Enregistrer » le met à jour, « Enregistrer sous… » crée une copie indépendante sans le modifier.
          </span>
        </div>
      `:_}

      ${!e&&o.length>0?f`
        <div class="banner banner-info">
          <span>🏢</span>
          <span class="banner-text">
            La catégorie « ${$e(s)} » contient déjà
            ${o.map((a,r)=>f`${r>0?", ":""}« ${a.name} »`)} :
            les plans restent distincts, aucun ne sera écrasé.
          </span>
        </div>
      `:_}

      <!-- Résumé du contenu -->
      <div class="form-group">
        <span class="form-label">
          <span>📊</span>
          <span>Contenu du plan à enregistrer :</span>
        </span>
        <div class="metrics-summary">
          <div class="metric-badge">🧱 <strong>${t?.walls?.length||0}</strong> mur(s)</div>
          <div class="metric-badge">📐 <strong>${t?.rooms?.length||0}</strong> pièce(s)</div>
          <div class="metric-badge">🚪 <strong>${t?.openings?.length||0}</strong> ouvrant(s)</div>
          <div class="metric-badge">⚡ <strong>${t?.bindings?.length||0}</strong> entité(s) HA</div>
          <div class="metric-badge">🛋️ <strong>${t?.furniture?.length||0}</strong> meuble(s)</div>
        </div>
      </div>
    `}renderRow(e){const t=e.id===this.project?.id,i=this.deletingId===e.id,s=this.pendingLoadId===e.id?this.loadWarning(e):null,o=this.pendingDeleteId===e.id,{walls:a,rooms:r,furniture:l,bindings:c}=e.counts,u=this.draftBadge(e);return f`
      <div class="project-entry">
        <div class="project-item ${t?"current":""}">
          <div class="project-info">
            <div class="project-title-row">
              <span class="project-cat-badge">
                <span>${la(e.category)}</span>
                <span>${$e(e.category)}</span>
              </span>
              <span class="project-name" title=${e.name}>${e.name||"Plan sans nom"}</span>
              ${t?f`<span class="current-badge">(Ouvert)</span>`:_}
            </div>
            <div class="project-meta-row">
              <span>📅 Modifié le ${this.formatDate(e.updatedAt)}</span>
              <span>•</span>
              <span>🧱 ${gt(a,"mur","murs")}</span>
              <span>•</span>
              <span>📐 ${gt(r,"pièce","pièces")}</span>
              <span>•</span>
              <span>🛋️ ${gt(l,"meuble","meubles")}</span>
              <span>•</span>
              <span>⚡ ${gt(c,"entité","entités")}</span>
            </div>
            ${e.draftSavedAt?f`
              <div class="project-meta-row">
                <span class="local-badge" title=${u.title}>💾 ${u.text}</span>
              </div>
            `:_}
          </div>

          <div class="project-actions">
            <button
              class="btn-load"
              ?disabled=${i}
              @click=${()=>this.requestLoad(e)}
              title=${t?"Recharger la version enregistrée de ce plan":"Charger ce plan"}
            >
              <span>⚡</span>
              <span>${t?"Recharger":"Charger"}</span>
            </button>
            ${this.canDelete(e)?f`
              <button
                class="btn-delete"
                ?disabled=${i}
                @click=${()=>this.requestDelete(e)}
                title=${e.onServer?"Supprimer ce plan":"Supprimer cette copie locale"}
                aria-label=${e.onServer?`Supprimer le plan ${e.name}`:`Supprimer la copie locale de ${e.name}`}
              >
                🗑️
              </button>
            `:_}
          </div>
        </div>

        ${s?f`
          <div class="banner banner-warning" role="alert">
            <span>⚠️</span>
            <div class="banner-text">
              <div>${s}</div>
              <div class="banner-actions">
                <button class="btn-danger" @click=${()=>this.requestLoad(e)}>Ouvrir quand même</button>
                <button class="btn-link" @click=${()=>this.pendingLoadId=null}>Annuler</button>
              </div>
            </div>
          </div>
        `:_}

        ${o?f`
          <div class="banner banner-error" role="alert">
            <span>🗑️</span>
            <div class="banner-text">
              <div>
                ${e.onServer?`Supprimer définitivement « ${e.name} » du serveur ? Cette action est irréversible.`:this.listError?`Supprimer la copie locale de « ${e.name} » de cet appareil ? La liste du serveur étant indisponible, le plan y existe peut-être encore : il n'y sera pas supprimé.`:`Supprimer la copie locale de « ${e.name} » ? Ce plan n'existe nulle part ailleurs.`}
                ${t?" Ce plan est actuellement ouvert dans l'éditeur.":""}
              </div>
              <div class="banner-actions">
                <button class="btn-danger" ?disabled=${i} @click=${()=>this.confirmDelete(e)}>
                  ${i?"Suppression…":"Supprimer"}
                </button>
                <button class="btn-link" ?disabled=${i} @click=${()=>this.pendingDeleteId=null}>Annuler</button>
              </div>
            </div>
          </div>
        `:_}
      </div>
    `}renderLoadTab(){const e=this.searchQuery.trim().toLowerCase(),t=e?this.rows.filter(i=>i.name.toLowerCase().includes(e)||$e(i.category).toLowerCase().includes(e)||i.id.toLowerCase().includes(e)):this.rows;return f`
      <!-- Liste Ouvrir / Recharger -->
      <div class="search-bar list-toolbar">
        <input 
          type="text" 
          class="form-input" 
          .value=${this.searchQuery}
          @input=${i=>this.searchQuery=i.target.value}
          placeholder="🔍 Rechercher un plan par nom ou catégorie..."
          aria-label="Rechercher un plan"
        />
        <button
          class="btn-secondary"
          ?disabled=${this.listState==="loading"}
          @click=${()=>this.refreshList()}
          title="Actualiser la liste"
        >
          🔄
        </button>
      </div>

      ${this.listError?f`
        <div class="banner banner-error" role="alert">
          <span>⚠️</span>
          <div class="banner-text">
            <div>Liste des plans du serveur indisponible : ${this.listError}</div>
            <div class="banner-actions">
              <button class="btn-link" @click=${()=>this.refreshList()}>Réessayer</button>
            </div>
          </div>
        </div>
      `:_}

      ${this.actionError?f`
        <div class="banner banner-error" role="alert">
          <span>⚠️</span>
          <span class="banner-text">${this.actionError}</span>
        </div>
      `:_}

      ${this.listState==="loading"?f`
        <div class="empty-state">
          <span>⏳ Chargement des plans sauvegardés...</span>
        </div>
      `:t.length===0?f`
        <div class="empty-state">
          <span class="empty-state-icon">📂</span>
          <span>${e?"Aucun plan ne correspond à la recherche.":"Aucun plan sauvegardé trouvé."}</span>
          ${!e&&!this.isReadOnly?f`
            <button class="btn-primary" style="margin-top: 6px;" @click=${()=>this.activeTab="save"}>
              💾 Enregistrer le plan actuel
            </button>
          `:_}
        </div>
      `:f`
        <div class="projects-list">
          ${t.map(i=>this.renderRow(i))}
        </div>
      `}
    `}render(){const e=this.isReadOnly;return f`
      <div class="modal-card" @click=${t=>t.stopPropagation()} @keydown=${this.handleKeyDown}>
        <!-- Header -->
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon">${this.activeTab==="save"?"💾":"📂"}</span>
            <div>
              <h2 class="modal-title">
                ${this.activeTab==="save"?"Enregistrer le plan":"Ouvrir / Recharger un plan"}
              </h2>
              <p class="modal-subtitle">
                ${this.activeTab==="save"?"Définissez le nom et la catégorie de votre plan pour le retrouver facilement":"Sélectionnez un plan sauvegardé pour le charger dans l'éditeur"}
              </p>
            </div>
          </div>
          <button class="btn-close" @click=${this.handleClose} title="Fermer">✕</button>
        </div>

        <!-- Onglets Navigation -->
        <div class="tabs-nav" role="tablist">
          <button 
            class="tab-btn ${this.activeTab==="save"?"active":""}"
            role="tab"
            aria-selected=${this.activeTab==="save"?"true":"false"}
            @click=${()=>this.activeTab="save"}
          >
            <span>💾</span>
            <span>Enregistrer le plan</span>
          </button>
          <button 
            class="tab-btn ${this.activeTab==="load"?"active":""}"
            role="tab"
            aria-selected=${this.activeTab==="load"?"true":"false"}
            @click=${()=>this.activeTab="load"}
          >
            <span>📂</span>
            <span>Ouvrir un plan${this.listState==="ready"?` (${this.rows.length})`:""}</span>
          </button>
        </div>

        <!-- Corps du modal -->
        <div class="modal-body">
          ${this.activeTab==="save"?this.renderSaveTab():this.renderLoadTab()}
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button class="btn-secondary" @click=${this.handleClose}>
            ${this.activeTab==="save"&&!e?"Annuler":"Fermer"}
          </button>
          ${this.activeTab==="save"&&!e?f`
            <button
              class="btn-secondary"
              @click=${()=>this.handleSave(!0)}
              title="Crée un nouveau plan (nouvel identifiant) sans modifier le plan enregistré"
            >
              📑 Enregistrer sous…
            </button>
            <button class="btn-primary" @click=${()=>this.handleSave(!1)}>
              <span>💾</span>
              <span>Enregistrer le plan</span>
            </button>
          `:_}
        </div>
      </div>
    `}};fi.styles=ye`
    :host {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: #f8fafc;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-card {
      background: #1e293b;
      border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 16px;
      width: 580px;
      max-width: 94vw;
      max-height: 88vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.25);
      overflow: hidden;
    }

    .modal-header {
      padding: 16px 22px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(15, 23, 42, 0.6);
      flex-shrink: 0;
    }

    .modal-title-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .modal-icon {
      font-size: 1.5rem;
    }

    .modal-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #f1f5f9;
      margin: 0;
    }

    .modal-subtitle {
      font-size: 0.8rem;
      color: #94a3b8;
      margin: 2px 0 0 0;
    }

    .btn-close {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 20px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .btn-close:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .tabs-nav {
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(15, 23, 42, 0.4);
      padding: 0 20px;
      gap: 10px;
      flex-shrink: 0;
    }

    .tab-btn {
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      color: #94a3b8;
      padding: 12px 14px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s ease;
    }

    .tab-btn:hover {
      color: #f1f5f9;
    }

    .tab-btn.active {
      color: #38bdf8;
      border-bottom-color: #38bdf8;
    }

    .modal-body {
      padding: 20px 22px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      overflow-y: auto;
      flex: 1;
      scrollbar-width: thin;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-label {
      font-size: 0.86rem;
      font-weight: 600;
      color: #e2e8f0;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .form-input {
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 10px;
      padding: 10px 14px;
      color: #f8fafc;
      font-size: 0.92rem;
      outline: none;
      transition: all 0.2s ease;
      box-sizing: border-box;
      width: 100%;
    }

    .form-input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 8px;
    }

    .category-card {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      padding: 10px 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s ease;
      color: #cbd5e1;
      font-size: 0.84rem;
      font-weight: 600;
      user-select: none;
    }

    .category-card:hover {
      background: rgba(56, 189, 248, 0.15);
      border-color: #38bdf8;
      color: #ffffff;
      transform: translateY(-1px);
    }

    .category-card.selected {
      background: rgba(2, 132, 199, 0.25);
      border-color: #38bdf8;
      color: #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
      font-weight: 700;
    }

    .category-card .cat-icon {
      font-size: 1.25rem;
    }

    .metrics-summary {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 12px 16px;
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      font-size: 0.82rem;
      color: #94a3b8;
    }

    .metric-badge {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .metric-badge strong {
      color: #38bdf8;
    }

    .modal-footer {
      padding: 14px 22px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
      background: rgba(15, 23, 42, 0.6);
      flex-shrink: 0;
    }

    .btn-secondary {
      background: transparent;
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 0.86rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-secondary:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.08);
    }

    .btn-primary {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      border-radius: 8px;
      padding: 8px 20px;
      font-size: 0.86rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s ease;
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.4);
    }

    .btn-primary:hover {
      background: #0369a1;
      transform: translateY(-1px);
    }

    /* Styles pour la liste des projets sauvegardés */
    .search-bar {
      margin-bottom: 12px;
    }

    .projects-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-height: 380px;
      overflow-y: auto;
      scrollbar-width: thin;
      padding-right: 4px;
    }

    .project-item {
      background: rgba(30, 41, 59, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      transition: all 0.15s ease;
    }

    .project-item:hover {
      border-color: rgba(56, 189, 248, 0.5);
      background: rgba(30, 41, 59, 1);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
    }

    .project-item.current {
      border-color: #38bdf8;
      background: rgba(2, 132, 199, 0.15);
    }

    .project-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
      flex: 1;
    }

    .project-title-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .project-cat-badge {
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.3);
      padding: 2px 7px;
      border-radius: 6px;
      font-size: 0.74rem;
      font-weight: 700;
      white-space: nowrap;
    }

    .project-name {
      font-weight: 700;
      font-size: 0.95rem;
      color: #f1f5f9;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .project-meta-row {
      font-size: 0.78rem;
      color: #94a3b8;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .project-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-load {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.4);
      border-radius: 8px;
      padding: 6px 14px;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .btn-load:hover {
      background: #10b981;
      color: #ffffff;
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.5);
    }

    .btn-delete {
      background: transparent;
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 0.82rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-delete:hover {
      background: #ef4444;
      color: #ffffff;
      box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);
    }

    .empty-state {
      padding: 36px 20px;
      text-align: center;
      color: #94a3b8;
      font-size: 0.9rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .empty-state-icon {
      font-size: 2.2rem;
      opacity: 0.6;
    }

    .btn-primary:disabled,
    .btn-secondary:disabled,
    .btn-load:disabled,
    .btn-delete:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .banner {
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 0.84rem;
      line-height: 1.4;
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }

    .banner-error {
      background: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.45);
      color: #fca5a5;
    }

    .banner-info {
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.35);
      color: #bae6fd;
    }

    .banner-warning {
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid rgba(245, 158, 11, 0.45);
      color: #fde68a;
    }

    .banner-text {
      flex: 1;
      min-width: 0;
    }

    .banner-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 8px;
    }

    .btn-link {
      background: transparent;
      border: 1px solid currentColor;
      border-radius: 6px;
      color: inherit;
      padding: 3px 10px;
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
    }

    .btn-danger {
      background: #ef4444;
      border: 1px solid #f87171;
      color: #ffffff;
      border-radius: 6px;
      padding: 3px 10px;
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
    }

    .btn-danger:disabled {
      opacity: 0.6;
      cursor: progress;
    }

    .project-entry {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .project-meta-row {
      flex-wrap: wrap;
      row-gap: 2px;
    }

    .project-cat-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .local-badge {
      background: rgba(245, 158, 11, 0.15);
      color: #fbbf24;
      border: 1px solid rgba(245, 158, 11, 0.4);
      padding: 1px 7px;
      border-radius: 6px;
      font-size: 0.72rem;
      font-weight: 700;
      white-space: nowrap;
    }

    .current-badge {
      font-size: 0.72rem;
      color: #38bdf8;
      font-weight: 700;
      white-space: nowrap;
    }

    .list-toolbar {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .list-toolbar .form-input {
      flex: 1;
    }

    .form-input:disabled,
    .category-card.disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .category-card.disabled:hover {
      transform: none;
      background: rgba(30, 41, 59, 0.7);
      border-color: rgba(255, 255, 255, 0.12);
      color: #cbd5e1;
    }
  `;let X=fi;se([O({type:Object})],X.prototype,"project");se([O({type:Object})],X.prototype,"hass");se([O({type:String})],X.prototype,"mode");se([O({type:Boolean})],X.prototype,"readOnly");se([O({attribute:!1})],X.prototype,"dirtyProjectIds");se([w()],X.prototype,"activeTab");se([w()],X.prototype,"planName");se([w()],X.prototype,"planCategory");se([w()],X.prototype,"customCategoryName");se([w()],X.prototype,"rows");se([w()],X.prototype,"listState");se([w()],X.prototype,"listError");se([w()],X.prototype,"actionError");se([w()],X.prototype,"searchQuery");se([w()],X.prototype,"pendingDeleteId");se([w()],X.prototype,"deletingId");se([w()],X.prototype,"pendingLoadId");Ae("home-architect-save-load-modal",X);const _s="socrate-rules-overlay",Nt=new WeakMap,ca=`
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
`;function me(n,e,...t){const i=document.createElement(n);return e&&(i.className=e),i.append(...t),i}function da(n){return n.querySelector(`#${_s}`)}function ua(){try{return typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function pa(n){const e=n instanceof Document?n.body:n,t=da(e);if(t)return Nt.get(t)??(()=>t.remove());const i=ua(),s=me("div",null);s.id=_s,s.tabIndex=-1,s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.setAttribute("aria-label","Socrate Rules");const o=document.createElement("style");o.textContent=ca;const a=me("canvas",null);a.setAttribute("aria-hidden","true");const r=me("h1","socrate-title");let l=0;for(const E of["Socrate","Rules"]){const R=me("span","socrate-line");for(const U of E){const j=me("span","socrate-letter",U===" "?" ":U);j.style.animationDelay=`${l*.07}s`,R.appendChild(j),l++}r.appendChild(R)}const c=me("p","socrate-sub","Une expérience visuelle ",me("strong",null,"hautement philosophique"),"."),u=me("p","socrate-exit-hint","Cliquez 3 fois sur ",me("strong",null,"SOCRATE RULES")," ou appuyez sur Échap pour quitter"),d=me("div","socrate-container",r,c,u);s.append(o,a,d),i||s.appendChild(me("div","socrate-instructions","Bougez le pointeur & touchez n'importe où")),e.appendChild(s),s.focus({preventScroll:!0});let g=null;i?s.style.opacity="1":g=requestAnimationFrame(()=>{g=null,s.style.opacity="1"});const m=Math.PI*2,b=a.getContext("2d");let p=[],v=[],x=null,y=null,h=!1,S=!1;const M={x:null,y:null,radius:150,radiusSq:22500};class I{constructor(R,U,j,H,T,q){this.x=R,this.y=U,this.directionX=j,this.directionY=H,this.size=T,this.color=q,this.originalSize=T}draw(R){R.beginPath(),R.arc(this.x,this.y,this.size,0,m,!1),R.fillStyle=this.color,R.fill()}update(R){if((this.x>a.width||this.x<0)&&(this.directionX=-this.directionX),(this.y>a.height||this.y<0)&&(this.directionY=-this.directionY),this.x+=this.directionX,this.y+=this.directionY,M.x!=null&&M.y!=null){const U=M.x-this.x,j=M.y-this.y,H=U*U+j*j;if(H<M.radiusSq){const T=Math.sqrt(H)||1,q=U/T,Z=j/T,De=(M.radius-T)/M.radius;this.x-=q*De*3,this.y-=Z*De*3,this.size<this.originalSize*3.5&&(this.size+=.2)}else this.size>this.originalSize&&(this.size-=.1)}else this.size>this.originalSize&&(this.size-=.1);this.draw(R)}}class k{constructor(R,U){this.x=R,this.y=U,this.size=Math.random()*6+2,this.speedX=(Math.random()-.5)*12,this.speedY=(Math.random()-.5)*12;const j=["#ff007f","#7f00ff","#00f0ff","#ffffff"];this.color=j[Math.floor(Math.random()*j.length)],this.alpha=1,this.decay=Math.random()*.015+.01}update(R){this.x+=this.speedX,this.y+=this.speedY,this.speedX*=.98,this.speedY*=.98,this.alpha-=this.decay,this.alpha>0&&(R.save(),R.globalAlpha=this.alpha,R.beginPath(),R.arc(this.x,this.y,this.size,0,m),R.fillStyle=this.color,R.shadowBlur=15,R.shadowColor=this.color,R.fill(),R.restore())}}function $(){p=[];const E=a.width*a.height/9e3,R=Math.min(E,250),U=["rgba(127, 0, 255, 0.4)","rgba(0, 240, 255, 0.3)","rgba(255, 0, 127, 0.3)"];for(let j=0;j<R;j++){const H=Math.random()*2+.5,T=Math.random()*(a.width-H*4)+H*2,q=Math.random()*(a.height-H*4)+H*2,Z=Math.random()*.4-.2,De=Math.random()*.4-.2,Be=U[Math.floor(Math.random()*U.length)];p.push(new I(T,q,Z,De,H,Be))}}function C(E){for(let j=0;j<p.length;j++)for(let H=j+1;H<p.length;H++){const T=p[j].x-p[H].x,q=p[j].y-p[H].y,Z=T*T+q*q;if(Z<14400){const Be=(1-Math.sqrt(Z)/120)*.15;E.strokeStyle=`rgba(127, 0, 255, ${Be})`,E.lineWidth=.5,E.beginPath(),E.moveTo(p[j].x,p[j].y),E.lineTo(p[H].x,p[H].y),E.stroke()}}}function z(){if(b){b.fillStyle="#030008",b.fillRect(0,0,a.width,a.height);for(const E of p)E.draw(b);C(b)}}function F(){if(x=null,!s.isConnected){A();return}if(b){b.fillStyle="rgba(3, 0, 8, 0.15)",b.fillRect(0,0,a.width,a.height);for(let E=0;E<p.length;E++)p[E].update(b);for(let E=v.length-1;E>=0;E--)v[E].update(b),v[E].alpha<=0&&v.splice(E,1);C(b),x=requestAnimationFrame(F)}}function N(){a.width=window.innerWidth,a.height=window.innerHeight}function B(E,R,U){if(!i)for(let j=0;j<U;j++)v.push(new k(E,R))}function W(){if(!s.isConnected){A();return}N(),i&&($(),z())}function Y(E){M.x=E.clientX,M.y=E.clientY}function G(){M.x=null,M.y=null}function K(E){E.pointerType!=="mouse"&&G()}function Te(E){E.button===0&&B(E.clientX,E.clientY,30)}function ce(E){if(!s.isConnected){A();return}ks(E)||Wo(E)||E.key==="Escape"&&A()}let te=[];function ne(E){if(E.stopPropagation(),E.button!==0||h)return;const R=Date.now();if(te=te.filter(U=>R-U<2e3),te.push(R),B(E.clientX,E.clientY,70),te.length>=3){if(h=!0,te=[],i){A();return}B(window.innerWidth/2,window.innerHeight/2,150),s.style.transition="opacity 0.38s ease, transform 0.38s ease",s.style.opacity="0",s.style.transform="scale(1.05)",y=setTimeout(A,360)}}function A(){S||(S=!0,x!==null&&cancelAnimationFrame(x),g!==null&&cancelAnimationFrame(g),y!==null&&clearTimeout(y),x=null,g=null,y=null,p=[],v=[],window.removeEventListener("resize",W),window.removeEventListener("keydown",ce),Nt.delete(s),s.remove())}return Nt.set(s,A),window.addEventListener("resize",W),window.addEventListener("keydown",ce),s.addEventListener("pointermove",Y),s.addEventListener("pointerleave",G),s.addEventListener("pointerup",K),s.addEventListener("pointercancel",G),s.addEventListener("pointerdown",Te),r.addEventListener("pointerdown",ne),u.addEventListener("pointerdown",ne),N(),$(),i?z():F(),A}const ha=1500,fa=["id","name","category","revision","publish","created_at","updated_at","schema_version"];function ls(n,e){const t={...n},i=e;for(const s of fa)i[s]===void 0?delete t[s]:t[s]=i[s];return t}class ga{constructor(){this.stacks=new Map}stacksFor(e){let t=this.stacks.get(e);return t||(t={undo:[],redo:[],coalesceKey:null,coalescedAt:0},this.stacks.set(e,t)),t}record(e,t){const i=this.stacksFor(e.id),s=Date.now();if(t&&i.coalesceKey===t&&s-i.coalescedAt<ha){i.coalescedAt=s;return}i.undo=[...i.undo.slice(-39),e],i.redo=[],i.coalesceKey=t??null,i.coalescedAt=s}canUndo(e){return(this.stacks.get(e)?.undo.length??0)>0}canRedo(e){return(this.stacks.get(e)?.redo.length??0)>0}undo(e){const t=this.stacks.get(e.id);if(!t||t.undo.length===0)return null;const i=t.undo[t.undo.length-1];return t.undo=t.undo.slice(0,-1),t.redo=[...t.redo.slice(-39),e],t.coalesceKey=null,ls(i,e)}redo(e){const t=this.stacks.get(e.id);if(!t||t.redo.length===0)return null;const i=t.redo[t.redo.length-1];return t.redo=t.redo.slice(0,-1),t.undo=[...t.undo.slice(-39),e],t.coalesceKey=null,ls(i,e)}rewrite(e,t){const i=this.stacks.get(e);i&&(i.undo=i.undo.map(t),i.redo=i.redo.map(t))}clear(e){this.stacks.delete(e)}}function Ns(n){return n.walls.length===0&&n.openings.length===0&&n.rooms.length===0&&n.bindings.length===0&&(n.furniture?.length??0)===0&&!n.background}function cs(n){const e=n?Date.parse(n):NaN;return Number.isFinite(e)?e:0}class ma{constructor(e,t){this.onChange=t,this.history=new ga,this.projects=new Map,this.dirty=new Set,this._summaries=[],this.lastByCategory=new Map,this.projects.set(e.id,e),this._activeId=e.id}get activeId(){return this._activeId}get active(){return this.projects.get(this._activeId)}get summaries(){return this._summaries}get(e){return this.projects.get(e)}has(e){return this.projects.has(e)}isDirty(e){return this.dirty.has(e)}hasDirty(){return this.dirty.size>0}dirtyIds(){return[...this.dirty]}reset(e){for(const t of this.projects.keys())this.history.clear(t);this.projects.clear(),this.dirty.clear(),this.lastByCategory.clear(),this.projects.set(e.id,e),this.setActive(e.id),this.onChange()}open(e,t={}){this.projects.set(e.id,e),this.history.clear(e.id),t.dirty?this.dirty.add(e.id):this.dirty.delete(e.id),this.onChange()}close(e){if(!(e===this._activeId||!this.projects.has(e))){this.projects.delete(e),this.dirty.delete(e),this.history.clear(e);for(const[t,i]of this.lastByCategory)i===e&&this.lastByCategory.delete(t);this.onChange()}}activate(e){this.projects.has(e)&&(this.setActive(e),this.onChange())}setActive(e){this._activeId=e;const t=this.projects.get(e)?.category;t&&this.lastByCategory.set(t,e)}commit(e,t){const i=this.projects.get(e.id);!i||i===e||(this.history.record(i,t),this.projects.set(e.id,e),this.dirty.add(e.id),this.onChange())}replace(e){this.projects.has(e.id)&&(this.projects.set(e.id,e),e.id===this._activeId&&e.category&&this.lastByCategory.set(e.category,e.id),this.onChange())}markDirty(e){!this.projects.has(e)||this.dirty.has(e)||(this.dirty.add(e),this.onChange())}markClean(e){this.dirty.delete(e)&&this.onChange()}canUndo(){return this.history.canUndo(this._activeId)}canRedo(){return this.history.canRedo(this._activeId)}undo(){return this.restore(this.history.undo(this.active))}redo(){return this.restore(this.history.redo(this.active))}restore(e){return e?(this.projects.set(e.id,e),this.dirty.add(e.id),this.onChange(),e):null}setSummaries(e){this._summaries=[...e],this.onChange()}upsertSummary(e){const t=this._summaries.find(s=>s.id===e.id),i={id:e.id,name:e.name,category:e.category,created_at:e.created_at,updated_at:e.updated_at,revision:e.revision??0,has_background:!!e.background,publish:e.publish??t?.publish??null,counts:{walls:e.walls.length,rooms:e.rooms.length,bindings:e.bindings.length,furniture:e.furniture?.length??0}};this._summaries=t?this._summaries.map(s=>s.id===e.id?i:s):[...this._summaries,i],this.onChange()}removeSummary(e){const t=this._summaries.filter(i=>i.id!==e);t.length!==this._summaries.length&&(this._summaries=t,this.onChange())}summary(e){return this._summaries.find(t=>t.id===e)}entries(){const e=new Map;for(const t of this._summaries)e.set(t.id,{id:t.id,name:t.name,category:t.category,open:!1,dirty:!1,stored:!0,updatedAt:t.updated_at??""});for(const t of this.projects.values())e.set(t.id,{id:t.id,name:t.name,category:t.category,open:!0,dirty:this.dirty.has(t.id),stored:t.revision!==void 0,updatedAt:t.updated_at});return[...e.values()]}plansForCategory(e){return this.entries().filter(t=>t.category===e).sort((t,i)=>cs(i.updatedAt)-cs(t.updatedAt)||t.name.localeCompare(i.name))}customPlans(){return this.entries().filter(e=>!kt(e.category)).sort((e,t)=>e.name.localeCompare(t.name))}projectIdForLevel(e){const t=this.lastByCategory.get(e);if(t&&this.projects.get(t)?.category===e)return t;const i=this.plansForCategory(e);return(i.find(s=>s.open)??i[0])?.id??null}}const ai="image/svg+xml";class Ne extends Error{constructor(e){super(e),this.name="BackgroundRejectedError"}}function Bs(n){return n instanceof Error?n.message:String(n)}function ri(n){return typeof n=="string"&&/^data:/i.test(n)}function ba(n){const e=new DOMParser().parseFromString(n,ai),t=e.documentElement;if(!t||t.localName!=="svg"||e.getElementsByTagName("parsererror").length>0)throw new Error("Fichier SVG invalide.");return new XMLSerializer().serializeToString(t)}async function Us(n){return new Blob([ba(await n.text())],{type:ai})}async function qs(n){try{if(n.type===ai)return{blob:await Us(n)};const e=await oo(n);return{blob:e.blob,width:e.width,height:e.height}}catch(e){throw new Ne(`Image de fond illisible : ${Bs(e)}`)}}async function Hs(n,e,t){try{const i=await no(n,e,t);return{assetId:i.assetId,mimeType:i.mimeType}}catch(i){throw i instanceof mt?new Ne(i.message):i instanceof xe&&(i.code==="invalid_image"||i.code==="unsupported_media_type")?new Ne(`Image de fond refusée par le serveur : ${i.message}`):i}}async function va(n,e){const t=e.background;if(!t||!ri(t.imageUrl))return null;let i;try{i=Qt(t.imageUrl)}catch(a){throw new Ne(`Image de fond illisible : ${Bs(a)}`)}const s=await qs(i),o=await Hs(n,e.id,s.blob);return{...t,imageUrl:"",assetId:o.assetId,mimeType:o.mimeType}}class xa{constructor(e){this.onChange=e,this.heldAssetId=null,this.failedAssetId=null,this.token=0}sync(e,t){const i=t?.background,s=i?.assetId??null;if(!s||!t){this.dropHeld(),this.failedAssetId=null,this.setSrc(i?.imageUrl||void 0);return}if(s===this.heldAssetId||s===this.failedAssetId||!e)return;this.dropHeld(),this.failedAssetId=null,this.setSrc(void 0),this.heldAssetId=s;const o=this.token;io(e,t.id,s).then(a=>{o===this.token&&this.setSrc(a)},a=>{o===this.token&&(this.heldAssetId=null,this.failedAssetId=s,console.warn(`[home-architect] Image de fond ${s} indisponible :`,a),this.setSrc(void 0))})}objectUrlFor(e){return this.heldAssetId===e?this.src:void 0}release(){this.dropHeld(),this.failedAssetId=null,this.setSrc(void 0)}dropHeld(){this.heldAssetId&&(this.token++,so(this.heldAssetId),this.heldAssetId=null)}setSrc(e){e!==this.src&&(this.src=e,this.onChange())}}const ya={unsaved:"Plan jamais sauvegardé",newer:"Plus récent que la version du serveur",outdated:"Basé sur une ancienne version du serveur (conflit possible)",deleted:"Le plan n'existe plus sur le serveur"};function wa(n,e){return n.map(t=>{const i=e.find(o=>o.id===t.projectId);if(!i)return{draft:t,status:t.baseRevision===null?"unsaved":"deleted",serverRevision:null};const s=t.baseRevision===i.revision?"newer":"outdated";return{draft:t,status:s,serverRevision:i.revision}})}function ka(n){const e={...n.draft.project};return delete e.publish,n.draft.baseRevision===null?delete e.revision:e.revision=n.draft.baseRevision,e}function $a(n,e){const t=n.tone??"default",i=n.cancelLabel===void 0?"Annuler":n.cancelLabel;return f`
    <div class="modal-backdrop choice-backdrop" @click=${s=>{s.target===s.currentTarget&&e(null)}}>
      <div class="modal-dialog ${t}" role="alertdialog" aria-modal="true" aria-labelledby="choice-title">
        <div class="modal-dialog-header ${t}">
          <div class="modal-dialog-title-group">
            <span class="modal-dialog-icon">${n.icon}</span>
            <div>
              <h3 class="modal-dialog-title" id="choice-title">${n.title}</h3>
              ${n.subtitle?f`<p class="modal-dialog-subtitle">${n.subtitle}</p>`:_}
            </div>
          </div>
          <button class="btn-dialog-close" title="Fermer" @click=${()=>e(null)}>✕</button>
        </div>
        <div class="modal-dialog-body">
          <p class="choice-message">${n.message}</p>
          ${n.details?.length?f`
            <ul class="choice-details">${n.details.map(s=>f`<li>${s}</li>`)}</ul>
          `:_}
        </div>
        <div class="modal-dialog-footer wrap">
          ${i?f`<button class="btn-dialog-cancel" @click=${()=>e(null)}>${i}</button>`:_}
          ${n.actions.map(s=>f`
            <button class="btn-dialog-confirm ${s.kind??"primary"}" @click=${()=>e(s.id)}>
              ${s.icon?f`<span>${s.icon}</span>`:_}
              <span>${s.label}</span>
            </button>
          `)}
        </div>
      </div>
    </div>
  `}function Ma(n){const e=Date.parse(n);return Number.isFinite(e)?new Date(e).toLocaleString("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}):"date inconnue"}function Sa(n,e){return f`
    <div class="modal-backdrop" @click=${t=>{t.target===t.currentTarget&&e.onClose()}}>
      <div class="modal-dialog warning wide" role="dialog" aria-modal="true" aria-labelledby="drafts-title">
        <div class="modal-dialog-header warning">
          <div class="modal-dialog-title-group">
            <span class="modal-dialog-icon">🗂️</span>
            <div>
              <h3 class="modal-dialog-title" id="drafts-title">Copies locales non sauvegardées</h3>
              <p class="modal-dialog-subtitle">Modifications conservées dans ce navigateur et absentes du serveur</p>
            </div>
          </div>
          <button class="btn-dialog-close" title="Fermer" @click=${e.onClose}>✕</button>
        </div>
        <div class="modal-dialog-body">
          <ul class="draft-list">
            ${n.map(t=>{const i=t.draft.project,s=ya[t.status];return f`
                <li class="draft-item status-${t.status}">
                  <div class="draft-info">
                    <strong>${i.name}</strong>
                    <span class="draft-meta">${$e(i.category)} · enregistrée le ${Ma(t.draft.savedAt)}</span>
                    <span class="draft-status">${s}</span>
                  </div>
                  <div class="draft-actions">
                    <button class="btn-dialog-confirm secondary" title="Ouvrir la copie locale dans le studio" @click=${()=>e.onOpen(t)}>📂 Ouvrir</button>
                    <button class="btn-dialog-confirm primary" title="Envoyer la copie locale au serveur" @click=${()=>e.onSend(t)}>☁️ Envoyer au serveur</button>
                    <button class="btn-dialog-confirm danger" title="Supprimer définitivement la copie locale" @click=${()=>e.onDiscard(t)}>🗑️</button>
                  </div>
                </li>
              `})}
          </ul>
          <p class="dialog-hint">
            ℹ️ Si vous modifiez l'un de ces plans sans ouvrir sa copie locale, celle-ci sera remplacée par vos nouvelles modifications.
          </p>
        </div>
        <div class="modal-dialog-footer">
          <button class="btn-dialog-cancel" @click=${e.onClose}>Décider plus tard</button>
        </div>
      </div>
    </div>
  `}function Ca(n,e,t){return f`
    <div class="modal-backdrop" @click=${i=>{i.target===i.currentTarget&&t.onClose()}}>
      <div class="modal-dialog update" role="dialog" aria-modal="true" aria-labelledby="update-title">
        <div class="modal-dialog-header update">
          <div class="modal-dialog-title-group">
            <span class="modal-dialog-icon update-icon">🚀</span>
            <div>
              <h3 class="modal-dialog-title" id="update-title">Mise à jour de Home Architect</h3>
              <p class="modal-dialog-subtitle">Nouvelle version disponible</p>
            </div>
          </div>
          <button class="btn-dialog-close" title="Fermer" @click=${t.onClose}>✕</button>
        </div>
        <div class="modal-dialog-body">
          <div class="version-compare">
            <div>
              <div class="version-label">Version installée</div>
              <div class="version-value">v${n.installedVersion||qt}</div>
            </div>
            <div class="version-arrow">➔</div>
            <div>
              <div class="version-label new">Nouvelle version</div>
              <div class="version-value new">v${n.latestVersion}</div>
            </div>
          </div>
          <div>
            <div class="update-notes-title">📋 Notes de version</div>
            <div class="update-notes">${n.releaseNotes||"Consultez la page de la release pour le détail des nouveautés."}</div>
          </div>
          <p class="dialog-hint">
            💡 La mise à jour s'installe depuis Paramètres › Mises à jour de Home Assistant (ou depuis HACS),
            puis nécessite un redémarrage de Home Assistant.
          </p>
          ${e>0?f`
            <p class="dialog-warning">
              ⚠️ ${e} plan${e>1?"s ont":" a"} des modifications non sauvegardées.
              Sauvegardez avant de quitter le studio : sinon elles ne seront conservées que comme copie locale dans ce navigateur.
            </p>
          `:_}
        </div>
        <div class="modal-dialog-footer spread">
          <a class="release-link" href=${n.releaseUrl} target="_blank" rel="noopener noreferrer">🔗 Voir la release</a>
          <div class="footer-buttons">
            <button class="btn-dialog-cancel" @click=${t.onClose}>Fermer</button>
            <button class="btn-dialog-confirm primary" @click=${t.onOpenUpdates}>
              <span>⚙️</span>
              <span>Ouvrir les mises à jour</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `}function ds(n){return f`
    <div class="loading-overlay" role="status" aria-live="polite">
      <div class="loading-box">
        <span class="spinner" aria-hidden="true"></span>
        <span>${n}</span>
      </div>
    </div>
  `}function Ia(n,e){return f`
    <div class="loading-overlay" role="alert">
      <div class="loading-box error">
        <strong>⚠️ Impossible de charger les plans</strong>
        <span>${n}</span>
        <span class="dialog-hint">La sauvegarde est désactivée tant que les plans du serveur ne sont pas chargés.</span>
        <button class="btn-dialog-confirm primary" @click=${e}>🔄 Réessayer</button>
      </div>
    </div>
  `}function Ea(n,e){return n.length===0?_:f`
    <div class="notice-stack">
      ${n.map(t=>f`
        <div class="notice ${t.kind}" role=${t.kind==="error"?"alert":"status"}>
          <span class="notice-message">${t.message}</span>
          ${t.actions?.map(i=>f`<button class="notice-action" @click=${i.run}>${i.label}</button>`)}
          ${t.dismissible===!1?_:f`
            <button class="notice-close" title="Masquer" @click=${()=>e(t.key)}>✕</button>
          `}
        </div>
      `)}
    </div>
  `}const Ta=2e3,Da=new Set(["connection_lost","not_connected","network_error","not_ready","save_failed","unknown_error","http_error"]);function at(n){return n instanceof Error?n.message:String(n)}function it(n){if(n instanceof xe)switch(n.code){case"connection_lost":case"not_connected":case"network_error":return"connexion à Home Assistant perdue";case"not_ready":return"Home Architect n'est pas chargé sur le serveur";case"save_failed":return"échec d'écriture sur le serveur";case"unknown_command":return"intégration Home Architect à redémarrer après sa mise à jour"}return at(n)}function us(n){const e=Date.parse(n.updated_at??"");return Number.isFinite(e)?e:0}class za{constructor(e,t){this.host=e,this.ui=t,this.loadStateValue="idle",this.loadError="",this.busyMessage=null,this.savingIds=new Set,this.permissionDenied=!1,this.notices=[],this.choiceDialog=null,this.choiceResolve=null,this.draftReviews=null,this.draftTimers=new Map,this.placeholderIds=new Set,this.pendingRemoteEvents=new Map,this.unsubscribeProject=null,this.subscribedProjectId=null,this.subscriptionToken=0,this.ghostCache=new Map,this.ghostLoading=new Set,this.readOnlyToastAt=0,this.onBeforeUnload=i=>{this.ws.hasDirty()&&(this.flushDrafts(),i.preventDefault(),i.returnValue="")},this.onVisibilityChange=()=>{document.visibilityState==="hidden"&&this.flushDrafts()},this.ws=new ma(ct({category:ke}),()=>e.requestUpdate()),this.background=new xa(()=>e.requestUpdate()),e.addController(this)}hostConnected(){window.addEventListener("beforeunload",this.onBeforeUnload),document.addEventListener("visibilitychange",this.onVisibilityChange),this.ready&&this.syncActiveResources()}hostDisconnected(){this.flushDrafts(),this.unsubscribeActive(),this.background.release(),window.removeEventListener("beforeunload",this.onBeforeUnload),document.removeEventListener("visibilitychange",this.onVisibilityChange)}hostUpdate(){this.host.isConnected&&this.background.sync(this.host.hass,this.ws.active)}get project(){return this.ws.active}get ready(){return this.loadStateValue==="ready"}get readOnly(){return!wt(this.host.hass)||this.permissionDenied}isSaving(e){return this.savingIds.has(e)}isBlocking(){return!this.ready||this.busyMessage!==null||this.choiceDialog!==null||this.draftReviews!==null}handleBlockingKey(e){return this.isBlocking()?(e.key==="Escape"&&(this.choiceDialog?this.resolveChoice(null):this.draftReviews&&this.setDraftReviews(null)),!0):!1}setLoadState(e,t=""){this.loadStateValue=e,this.loadError=t,this.host.requestUpdate()}setDraftReviews(e){this.draftReviews=e&&e.length>0?e:null,this.host.requestUpdate()}setSaving(e,t){t?this.savingIds.add(e):this.savingIds.delete(e),this.host.requestUpdate()}commit(e,t={}){if(this.readOnly)return this.notifyReadOnly(),!1;const i=this.ws.active;return!this.ready||e===i||e.id!==i.id?!1:(this.ws.commit(e,t.coalesceKey),this.placeholderIds.delete(e.id),this.scheduleDraft(e.id),!0)}undo(){return this.restore(()=>this.ws.undo())}redo(){return this.restore(()=>this.ws.redo())}restore(e){if(this.readOnly)return this.notifyReadOnly(),null;if(!this.ready)return null;const t=e();return t&&this.scheduleDraft(t.id),t}notifyReadOnly(){const e=Date.now();e-this.readOnlyToastAt<4e3||(this.readOnlyToastAt=e,this.ui.toast("🔒 Lecture seule : seuls les administrateurs peuvent modifier les plans."))}setExportFrame(e){if(!e||this.readOnly)return;const{minX:t,minY:i,maxX:s,maxY:o}=e;if(![t,i,s,o].every(Number.isFinite)||s<=t||o<=i)return;const a=this.ws.active.exportFrame;a&&a.minX===t&&a.minY===i&&a.maxX===s&&a.maxY===o||this.commit({...this.ws.active,exportFrame:{minX:t,minY:i,maxX:s,maxY:o}})}setPublish(e){const t=ao(e);if(!t)return;const i={...this.ws.active,publish:t};this.ws.replace(i),i.revision!==void 0&&this.ws.upsertSummary(i)}start(){this.loadStateValue==="idle"&&this.loadInitial()}async loadInitial(){const e=this.host.hass;if(!(!e||this.loadStateValue==="loading")){this.setLoadState("loading");try{await this.migrateLegacyLocalProjects();const t=await Ut(e),i=this.pickInitialProjectId(t),s=i?await Xe(e,i):null,o=s?this.adoptLoaded(s):ct({category:ke});this.ws.setSummaries(t),this.ws.reset(o),this.placeholderIds.clear(),s||this.placeholderIds.add(o.id),this.ghostCache.clear(),this.setLoadState("ready"),this.ui.activeProjectChanged(),this.syncActiveResources(),this.reviewLocalDrafts()}catch(t){this.setLoadState("error",it(t))}}}pickInitialProjectId(e){const t=[...e].sort((i,s)=>us(s)-us(i));return(t.find(i=>i.category===ke)??t[0])?.id??null}async migrateLegacyLocalProjects(){for(const{key:e,project:t}of ro())(await oa(t.id)||await ss(t,null))&&lo(e)}adoptLoaded(e){return co(e,this.host.hass?.states)}async refreshSummaries(){if(this.ready)try{this.ws.setSummaries(await Ut(this.host.hass))}catch(e){console.debug("[home-architect] Liste des plans indisponible :",e)}}async openPlan(e,t={}){if(!this.ready)return;const i=this.ws.get(e);if(i){if(t.refresh&&this.ws.isDirty(e)){const o=await this.ask({icon:"📂",title:"Plan déjà ouvert et modifié",subtitle:`« ${i.name} »`,message:"Ce plan est déjà ouvert dans le studio avec des modifications non sauvegardées.",details:["Continuer l'édition : affiche votre version en cours, modifications comprises.","Recharger : affiche la version du serveur ; vos modifications non sauvegardées sont perdues."],actions:[{id:"reload",label:"Recharger depuis le serveur",icon:"🔄",kind:"danger"},{id:"keep",label:"Continuer l'édition",icon:"✏️",kind:"primary"}],tone:"warning"});if(o===null||!this.ws.has(e))return;this.activateProject(e),o==="reload"&&await this.reloadFromServer(e);return}this.activateProject(e),t.refresh&&i.revision!==void 0&&!this.ws.isDirty(e)&&await this.reloadFromServer(e);return}let s;try{s=await this.withBusy("Chargement du plan…",()=>Xe(this.host.hass,e))}catch(o){this.showError(`Impossible d'ouvrir le plan : ${it(o)}`);return}if(!s){this.ws.removeSummary(e),this.ui.toast("❌ Ce plan n'existe plus sur le serveur.");return}this.ws.open(this.adoptLoaded(s)),this.ws.upsertSummary(s),this.activateProject(e),this.ui.toast(`📂 Plan "${s.name}" chargé avec succès !`)}async switchToLevel(e){if(!this.ready||this.ws.active.category===e)return;const t=this.ws.projectIdForLevel(e);if(t){await this.openPlan(t);return}if(this.readOnly){this.ui.toast(`Aucun plan enregistré pour le niveau ${$e(e)}.`);return}const i=ct({category:e});this.ws.open(i),this.placeholderIds.add(i.id),this.activateProject(i.id),this.ui.toast(`Étage sélectionné : ${i.name} (plan vierge)`)}async createPlan(e,t){if(this.readOnly||!this.ready||!await this.confirmAdditionalPlan(t,e))return!1;const i=ct({name:e,category:t});return this.ws.open(i),this.activateProject(i.id),this.ui.toast(`📄 Nouveau plan "${i.name}" créé : pensez à le sauvegarder.`),!0}async confirmAdditionalPlan(e,t,i){if(!kt(e))return!0;const s=this.ws.plansForCategory(e).filter(r=>r.id!==i);if(s.length===0)return!0;const o=$e(e);return await this.ask({icon:"🏢",title:`Le niveau ${o} a déjà un plan`,message:`Le niveau ${o} contient déjà ${s.map(r=>`« ${r.name} »`).join(", ")}. « ${t} » y sera ajouté comme plan distinct et deviendra le plan affiché pour ce niveau.`,details:["Rien n'est écrasé : les plans existants restent enregistrés et se rouvrent depuis le sélecteur de niveau ou « Ouvrir »."],actions:[{id:"confirm",label:"Continuer",icon:"✨",kind:"primary"}],tone:"warning"})==="confirm"}activateProject(e){const t=this.ws.active;t.id!==e&&(this.ws.activate(e),this.placeholderIds.has(t.id)&&!this.ws.isDirty(t.id)&&Ns(t)&&this.discardProject(t.id)),this.ui.activeProjectChanged(),this.syncActiveResources();const i=this.ws.active,s=this.ws.summary(e);s&&i.revision!==void 0&&s.revision>i.revision&&this.handleRemoteEvent({project_id:e,revision:s.revision})}syncActiveResources(){this.background.sync(this.host.hass,this.ws.active),this.subscribeActive()}async reloadFromServer(e){let t;try{t=await this.withBusy("Chargement du plan…",()=>Xe(this.host.hass,e))}catch(i){return this.showError(`Impossible de recharger le plan : ${it(i)}`),!1}return t?(this.adoptServerVersion(t),!0):(this.projectDeleted(e,{remote:!0}),!1)}adoptServerVersion(e){const t=e.id;this.ws.open(this.adoptLoaded(e)),this.ws.upsertSummary(e),this.cancelDraft(t),nt(t),this.clearProjectNotices(t),this.placeholderIds.delete(t),t===this.ws.activeId&&(this.ui.activeProjectChanged(),this.subscribeActive())}discardProject(e){e!==this.ws.activeId&&(this.ws.close(e),this.cancelDraft(e),nt(e),this.clearProjectNotices(e),this.placeholderIds.delete(e),this.pendingRemoteEvents.delete(e))}ghostProject(e){const t=e?this.ws.projectIdForLevel(e):null;return t?this.ws.get(t)??this.ghostCache.get(t)?.project??null:null}prefetchGhost(e){const t=e?this.ws.projectIdForLevel(e):null;if(!t||this.ws.has(t)||this.ghostLoading.has(t)||!this.host.hass||!this.ready)return;const i=this.ws.summary(t)?.revision??0;this.ghostCache.get(t)?.revision!==i&&(this.ghostLoading.add(t),Xe(this.host.hass,t).then(s=>{s?this.ghostCache.set(t,{revision:i,project:s}):this.ghostCache.delete(t)},s=>console.warn(`[home-architect] Filigrane ${t} indisponible :`,s)).finally(()=>{this.ghostLoading.delete(t),this.host.requestUpdate()}))}async saveAllDirty(){for(const e of this.ws.dirtyIds())if(!await this.save(e))return}async saveFromDialog(e){if(this.readOnly){this.notifyReadOnly();return}if(!this.ready)return;const t=this.ws.active,i=(e?.name??"").trim()||t.name,s=(e?.category??"").trim()||t.category||ke;if(e?.saveAs){if(!await this.confirmAdditionalPlan(s,i))return;await this.saveAsCopy(t.id,i,s);return}if(s!==t.category&&!await this.confirmAdditionalPlan(s,i,t.id))return;const o=this.ws.get(t.id);o&&((i!==o.name||s!==o.category)&&(this.ws.replace({...o,name:i,category:s}),this.ws.markDirty(o.id),this.scheduleDraft(o.id)),await this.save(o.id))}async saveAsCopy(e,t,i){const s=this.ws.get(e);if(!s)return!1;const o=new Date().toISOString(),a={...po(s),id:uo(),name:t,category:i,created_at:o,updated_at:o};return delete a.revision,delete a.publish,a.category===void 0&&delete a.category,this.ws.open(a,{dirty:!0}),this.ws.activeId===e&&this.activateProject(a.id),this.discardProject(e),this.save(a.id)}async save(e,t={}){if(this.readOnly)return this.notifyReadOnly(),!1;if(!this.ready||this.savingIds.has(e)||!this.ws.has(e))return!1;this.setSaving(e,!0);let i=null;try{const o=await this.uploadPendingBackground(e),a=await ho(this.host.hass,o,{expectedRevision:o.revision,force:t.force});this.applySaveResult(o,a)}catch(o){i=o}finally{this.setSaving(e,!1)}const s=this.pendingRemoteEvents.get(e);return s&&(this.pendingRemoteEvents.delete(e),this.handleRemoteEvent(s)),i===null?!0:this.handleSaveError(e,i)}async uploadPendingBackground(e){const t=this.ws.get(e);if(!t)throw new xe("not_found","Plan fermé pendant la sauvegarde.");const i=t.background?.imageUrl;if(!ri(i))return t;const s=await va(this.host.hass,t);if(!s)return t;const o=l=>l.background&&l.background.imageUrl===i?{...l,background:{...l.background,imageUrl:"",assetId:s.assetId,mimeType:s.mimeType}}:l;this.ws.history.rewrite(e,o);const a=this.ws.get(e);if(!a)throw new xe("not_found","Plan fermé pendant la sauvegarde.");const r=o(a);return r!==a&&this.ws.replace(r),r}applySaveResult(e,t){const i=e.id,s=this.ws.get(i);if(!s)return;let o={...s,revision:t.revision,updated_at:t.updated_at};const a=e.background,r=t.assetId;if(r&&a&&a.assetId!==r){const l=c=>c.background&&c.background.assetId===a.assetId&&c.background.imageUrl===a.imageUrl?{...c,background:{...c.background,assetId:r,imageUrl:""}}:c;o=l(o),this.ws.history.rewrite(i,l)}this.ws.replace(o),this.ws.upsertSummary(o),this.clearProjectNotices(i),this.placeholderIds.delete(i),s===e&&(this.ws.markClean(i),this.cancelDraft(i),nt(i)),i===this.ws.activeId&&this.subscribeActive(),this.ui.toast(`💾 Plan "${o.name}" (${$e(o.category)}) sauvegardé dans Home Assistant !`)}async handleSaveError(e,t){const i=this.ws.get(e)?.name??e;if(t instanceof fo)return this.resolveConflict(e,t);if(t instanceof Ne||t instanceof xe&&t.code==="invalid_project"&&/background/i.test(t.message))return this.offerBackgroundRemoval(e,at(t));if(t instanceof Ht)return this.enterReadOnly(),!1;if(t instanceof mt)return this.flushDraft(e),this.showError(`💾 « ${i} » n'a pas été sauvegardé : ${t.message} Réduisez l'image de fond ou le nombre d'éléments.`,`save:${e}`),!1;if(t instanceof xe&&t.code==="too_many_projects")return this.flushDraft(e),this.showError(`💾 « ${i} » n'a pas été sauvegardé : nombre maximal de plans atteint (100). Supprimez des plans inutilisés depuis « Ouvrir ».`,`save:${e}`),!1;if(t instanceof xe&&!Da.has(t.code))return this.flushDraft(e),this.showError(`💾 « ${i} » n'a pas été sauvegardé : ${t.message}`,`save:${e}`),!1;const s=it(t);return this.ws.isDirty(e)?(this.cancelDraft(e),await this.writeDraft(e)?this.setNotice({key:`unsynced:${e}`,kind:"warning",message:`💾 Copie locale non synchronisée : « ${i} » n'a pas pu être envoyé au serveur (${s}). Vos modifications sont conservées dans ce navigateur.`,actions:[{label:"Réessayer",run:()=>{this.save(e)}}]}):this.showError(`💾 Échec de la sauvegarde de « ${i} » (${s}) et copie locale impossible : ne fermez pas cette page.`,`save:${e}`),!1):(this.showError(`💾 « ${i} » n'a pas été sauvegardé (${s}).`,`save:${e}`),!1)}async resolveConflict(e,t){const i=this.ws.get(e);if(!i)return!1;const s=t.serverRevision===0,o=t.serverRevision??"?";let a;s?a="Ce plan n'existe plus sur le serveur : il a été supprimé depuis un autre appareil ou un autre onglet.":i.revision===void 0?a=`Un plan portant le même identifiant existe déjà sur le serveur (révision ${o}).`:a=`Ce plan a été modifié ailleurs depuis son ouverture (révision ${o} sur le serveur, votre version part de la révision ${i.revision}).`;const r=await this.ask({icon:"⚠️",title:s?"Plan supprimé sur le serveur":"Conflit de modification",subtitle:`« ${i.name} »`,message:a,details:[...s?[]:["Recharger : affiche la version du serveur ; vos modifications locales sont abandonnées."],s?"Recréer : enregistre votre version sous le même identifiant.":"Écraser : remplace la version du serveur par la vôtre ; les modifications faites ailleurs sont perdues.","Enregistrer une copie : crée un nouveau plan avec votre version, sans toucher au serveur."],actions:[...s?[]:[{id:"reload",label:"Recharger",icon:"🔄",kind:"secondary"}],{id:"copy",label:"Enregistrer une copie",icon:"📄",kind:"secondary"},{id:"overwrite",label:s?"Recréer":"Écraser",icon:"⚠️",kind:"danger"}],tone:"warning"}),l=this.ws.get(e);if(!l)return!1;switch(r){case"reload":return await this.reloadFromServer(e),!1;case"overwrite":return this.save(e,{force:!0});case"copy":return this.saveAsCopy(e,`${l.name} (copie)`,l.category);default:return this.flushDraft(e),this.setNotice({key:`save:${e}`,kind:"warning",message:`⚠️ « ${l.name} » n'est pas sauvegardé : sa version entre en conflit avec celle du serveur. Vos modifications sont conservées dans ce navigateur.`,actions:[{label:"Résoudre…",run:()=>{this.save(e)}}]}),!1}}async offerBackgroundRemoval(e,t){const i=this.ws.get(e);if(!i)return!1;const s=await this.ask({icon:"🖼️",title:"Image de fond refusée",subtitle:`« ${i.name} »`,message:`L'image de fond de ce plan ne peut pas être enregistrée sur le serveur. ${t}`,details:["Retirer l'image de fond permet de sauvegarder le reste du plan (murs, pièces, entités, meubles).","Vous pourrez ensuite réimporter une image PNG, JPEG, WebP ou un SVG simple."],actions:[{id:"remove",label:"Retirer l'image et sauvegarder",icon:"🗑️",kind:"danger"}],tone:"warning"}),o=this.ws.get(e);return o?s!=="remove"?(this.flushDraft(e),this.showError(`💾 « ${o.name} » n'a pas été sauvegardé : son image de fond est refusée par le serveur.`,`save:${e}`),!1):(o.background&&(this.ws.commit({...o,background:void 0}),this.scheduleDraft(e)),this.save(e)):!1}enterReadOnly(){this.permissionDenied=!0,this.host.requestUpdate();for(const e of this.ws.dirtyIds())this.flushDraft(e)}projectDeleted(e,t){this.ws.removeSummary(e),this.ghostCache.delete(e);const i=this.ws.get(e);if(!i)return;if(e!==this.ws.activeId&&!this.ws.isDirty(e)){this.discardProject(e);return}const s={...i};delete s.revision,delete s.publish,this.ws.replace(s),this.ws.markDirty(e),this.scheduleDraft(e),e===this.ws.activeId&&this.unsubscribeActive(),s.background?.assetId&&this.keepDeletedBackground(e,s.background.assetId),this.clearProjectNotices(e),this.setNotice({key:`deleted:${e}`,kind:"warning",message:t.remote?`🗑️ « ${i.name} » a été supprimé depuis un autre appareil. Il reste ouvert ici comme plan non sauvegardé : sauvegardez-le pour le recréer.`:`🗑️ « ${i.name} » a été supprimé du serveur. Il reste ouvert comme plan non sauvegardé : sauvegardez-le pour le recréer, ou ouvrez un autre plan.`})}async keepDeletedBackground(e,t){const i=this.background.objectUrlFor(t);let s=null;if(i)try{s=await rt(await(await fetch(i)).blob())}catch{s=null}const o=l=>{if(!l.background||l.background.assetId!==t)return l;if(!s)return{...l,background:void 0};const c={...l.background,imageUrl:s};return delete c.assetId,{...l,background:c}},a=this.ws.get(e);if(!a)return;this.ws.history.rewrite(e,o);const r=o(a);r!==a&&this.ws.replace(r),s||this.ui.toast("⚠️ L'image de fond du plan supprimé n'a pas pu être conservée.")}async subscribeActive(){const e=this.ws.active,t=e.id;if(!this.host.isConnected||!this.ready||this.subscribedProjectId===t||(this.unsubscribeActive(),e.revision===void 0||!this.host.hass?.connection))return;this.subscribedProjectId=t;const i=++this.subscriptionToken;try{const s=await go(this.host.hass,t,o=>this.handleRemoteEvent(o));if(i!==this.subscriptionToken){s();return}this.unsubscribeProject=s}catch(s){i===this.subscriptionToken&&(this.subscribedProjectId=null),console.debug(`[home-architect] Abonnement au plan ${t} impossible :`,s)}}unsubscribeActive(){this.subscriptionToken++,this.unsubscribeProject?.(),this.unsubscribeProject=null,this.subscribedProjectId=null}handleRemoteEvent(e){const t=e.project_id;if(this.savingIds.has(t)){this.pendingRemoteEvents.set(t,e);return}const i=this.ws.get(t);if(i){if(e.deleted){this.projectDeleted(t,{remote:!0});return}if(!(i.revision===void 0||e.revision<=i.revision)){if(!this.ws.isDirty(t)){this.refreshFromServer(t,i);return}this.setNotice({key:`remote:${t}`,kind:"warning",message:`⚠️ « ${i.name} » a été modifié sur un autre appareil (révision ${e.revision}). Vos modifications locales entreront en conflit à la sauvegarde.`,actions:[{label:"Recharger la version du serveur",run:()=>{this.confirmReload(t)}}]})}}}async refreshFromServer(e,t){let i;try{i=await Xe(this.host.hass,e)}catch(s){console.warn(`[home-architect] Mise à jour du plan ${e} impossible :`,s);return}if(!(this.ws.get(e)!==t||this.ws.isDirty(e))){if(!i){this.projectDeleted(e,{remote:!0});return}i.revision!==t.revision&&(this.adoptServerVersion(i),this.ui.toast(`🔄 Plan "${i.name}" mis à jour depuis un autre appareil.`))}}async confirmReload(e){const t=this.ws.get(e);t&&(this.ws.isDirty(e)&&await this.ask({icon:"🔄",title:"Recharger la version du serveur ?",subtitle:`« ${t.name} »`,message:"Vos modifications non sauvegardées de ce plan seront définitivement perdues.",actions:[{id:"reload",label:"Recharger",icon:"🔄",kind:"danger"}],tone:"warning"})!=="reload"||await this.reloadFromServer(e))}scheduleDraft(e){this.cancelDraft(e),this.draftTimers.set(e,setTimeout(()=>{this.draftTimers.delete(e),this.writeDraft(e)},Ta))}cancelDraft(e){const t=this.draftTimers.get(e);t!==void 0&&(clearTimeout(t),this.draftTimers.delete(e))}flushDrafts(){for(const e of[...this.draftTimers.keys()])this.flushDraft(e)}flushDraft(e){this.cancelDraft(e),this.writeDraft(e)}async writeDraft(e){const t=this.ws.get(e);return!t||!this.ws.isDirty(e)?!1:ss(t,t.revision??null)}async reviewLocalDrafts(){const t=wa(await Fs(),this.ws.summaries).filter(i=>!this.ws.isDirty(i.draft.projectId));this.setDraftReviews(this.readOnly?null:t)}removeDraftReview(e){this.setDraftReviews((this.draftReviews??[]).filter(t=>t!==e))}openDraft(e){const t=ka(e);return this.removeDraftReview(e),this.ws.open(t,{dirty:!0}),this.clearProjectNotices(t.id),this.placeholderIds.delete(t.id),this.activateProject(t.id),t.id}async discardDraft(e){await this.ask({icon:"🗑️",title:"Supprimer la copie locale ?",subtitle:`« ${e.draft.project.name} »`,message:"Les modifications enregistrées dans ce navigateur pour ce plan seront définitivement perdues.",actions:[{id:"discard",label:"Supprimer",icon:"🗑️",kind:"danger"}],tone:"danger"})==="discard"&&(await nt(e.draft.projectId),this.removeDraftReview(e))}async prepareAndUploadBackground(e,t){let i,s;try{i=await qs(typeof t=="string"?Qt(t):t),s=i.width&&i.height?{width:i.width,height:i.height}:await mo(i.blob)}catch(o){return this.showError(o instanceof Ne?o.message:`Image de fond illisible : ${at(o)}`),null}return this.uploadNewBackground(e,i.blob,{widthPx:s.width,heightPx:s.height,opacity:.4})}async uploadImportedBackground(e,t,i){let s=t.blob;if(t.isSvg)try{s=await Us(s)}catch(o){return this.showError(`Image de fond illisible : ${at(o)}`),null}return this.uploadNewBackground(e,s,{widthPx:t.widthPx,heightPx:t.heightPx,opacity:i})}async uploadNewBackground(e,t,i){const s={imageUrl:"",opacity:i.opacity,visible:!0,offset:{x:0,y:0},scale:1,rotation:0,widthPx:i.widthPx,heightPx:i.heightPx};try{const o=await Hs(this.host.hass,e,t);return{...s,assetId:o.assetId,mimeType:o.mimeType}}catch(o){if(o instanceof Ne)return this.showError(o.message),null;if(o instanceof Ht)return this.enterReadOnly(),null;try{const a=await rt(t);return this.setNotice({key:`background:${e}`,kind:"warning",message:`⚠️ Image de fond non téléversée (${it(o)}) : elle est gardée dans le plan et sera envoyée au serveur à la prochaine sauvegarde.`}),{...s,imageUrl:a,...t.type?{mimeType:t.type}:{}}}catch{return this.showError(`Téléversement de l'image de fond impossible : ${at(o)}`),null}}}ask(e){return this.resolveChoice(null),new Promise(t=>{this.choiceDialog=e,this.choiceResolve=t,this.host.requestUpdate()})}resolveChoice(e){const t=this.choiceResolve;!t&&!this.choiceDialog||(this.choiceResolve=null,this.choiceDialog=null,this.host.requestUpdate(),t?.(e))}async withBusy(e,t){const i=this.busyMessage;this.busyMessage=e,this.host.requestUpdate();try{return await t()}finally{this.busyMessage=i,this.host.requestUpdate()}}setNotice(e){this.notices=[...this.notices.filter(t=>t.key!==e.key),e],this.host.requestUpdate()}dismissNotice(e){this.notices.some(t=>t.key===e)&&(this.notices=this.notices.filter(t=>t.key!==e),this.host.requestUpdate())}clearProjectNotices(e){const t=`:${e}`;this.notices.some(i=>i.key.endsWith(t))&&(this.notices=this.notices.filter(i=>!i.key.endsWith(t)),this.host.requestUpdate())}showError(e,t="error"){this.setNotice({key:t,kind:"error",message:e})}renderBanners(e=[]){const t=[];return this.host.hass&&this.readOnly&&t.push({key:"read-only",kind:"info",dismissible:!1,message:this.permissionDenied?"🔒 Lecture seule : le serveur a refusé la sauvegarde (action réservée aux administrateurs). Vos modifications non sauvegardées sont conservées dans ce navigateur.":"🔒 Lecture seule : seuls les administrateurs de Home Assistant peuvent modifier et sauvegarder les plans."}),Ea([...t,...e,...this.notices],i=>this.dismissNotice(i))}renderOverlays(){const e=[];return this.loadStateValue==="error"?e.push(Ia(this.loadError,()=>{this.loadInitial()})):this.ready?this.busyMessage!==null&&e.push(ds(this.busyMessage)):e.push(ds("Chargement des plans…")),this.draftReviews&&this.ready&&e.push(Sa(this.draftReviews,{onOpen:t=>{this.openDraft(t),this.ui.toast("📂 Copie locale ouverte : sauvegardez-la pour l'envoyer au serveur.")},onSend:t=>{this.save(this.openDraft(t))},onDiscard:t=>{this.discardDraft(t)},onClose:()=>this.setDraftReviews(null)})),this.choiceDialog&&e.push($a(this.choiceDialog,t=>this.resolveChoice(t))),e}}const Pa="https://github.com/SocrateMobile/home-architect/releases",Oa="/config/updates",Ra=/^https:\/\/github\.com\/SocrateMobile\/home-architect(?:[/?#][^\s"'<>]*)?$/i,Aa=/^v?(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?)$/;function ps(n){const e=n?Aa.exec(n.trim()):null;return e?e[1]:null}function ja(){const n={card:"carte",panel:"studio"};return Object.entries(xo()).map(([e,t])=>`${n[e]??e} ${t}`).join(", ")}async function La(n){let e;try{e=await bo(n)}catch(s){if(s instanceof Ht)return null;throw s}const t=ps(e.latest_version),i=e.release_url&&Ra.test(e.release_url)?e.release_url:Pa;return{available:e.update_available&&t!==null,installedVersion:ps(e.installed_version)??e.installed_version,latestVersion:t,releaseUrl:i,releaseNotes:e.release_notes.trim(),entityId:e.update_entity_id,reloadRequired:vo(e.installed_version),loadedBundles:ja()}}function hs(n,e){const t=e?n?.states?.[e]:void 0;if(!t)return null;const i=t.attributes??{};return[t.state,i.installed_version,i.latest_version,i.skipped_version,i.in_progress].map(String).join("|")}function Fa(n){history.pushState(null,"",n),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}const _a=ye`
  /* Indicateur « modifications non sauvegardées » */
  .dirty-dot {
    color: #f59e0b;
    font-size: 0.75rem;
    line-height: 1;
  }

  button.btn-primary.is-dirty {
    box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.55);
  }

  button.btn-primary:disabled,
  .dropdown-item:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    box-shadow: none;
  }

  .dropdown-item:disabled:hover {
    background: transparent;
    color: #e2e8f0;
  }

  .level-plan-name {
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #cbd5e1;
    font-weight: 500;
  }

  /* Sélecteur de plans par niveau */
  .dropdown-menu-popup.level-menu {
    min-width: 260px;
    max-height: min(70vh, 560px);
    overflow-y: auto;
  }

  .dropdown-group-label {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px 2px;
    font-size: 0.78rem;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .dropdown-item.sub {
    padding-left: 34px;
  }

  .dropdown-item-meta {
    color: #64748b;
    font-size: 0.75rem;
    font-style: italic;
  }

  /* Bandeaux persistants */
  .notice-stack {
    display: flex;
    flex-direction: column;
    gap: 1px;
    flex-shrink: 0;
    position: relative;
    z-index: 84;
  }

  .notice {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px 12px;
    padding: 7px 14px;
    font-size: 0.84rem;
    line-height: 1.4;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .notice.info {
    background: rgba(56, 189, 248, 0.12);
    color: #bae6fd;
  }

  .notice.warning {
    background: rgba(245, 158, 11, 0.14);
    color: #fde68a;
  }

  .notice.error {
    background: rgba(239, 68, 68, 0.16);
    color: #fecaca;
  }

  .notice-message {
    flex: 1 1 260px;
  }

  .notice-action {
    background: rgba(15, 23, 42, 0.55);
    color: #f8fafc;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    padding: 3px 10px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
  }

  .notice-action:hover {
    border-color: #38bdf8;
  }

  .notice-close {
    background: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: 0.9rem;
    padding: 2px 4px;
    opacity: 0.75;
  }

  .notice-close:hover {
    opacity: 1;
  }

  /* Chargement initial, opérations bloquantes et erreur de chargement */
  .loading-overlay {
    position: absolute;
    inset: 0;
    z-index: 115;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(15, 23, 42, 0.72);
    backdrop-filter: blur(6px);
  }

  .loading-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    max-width: 440px;
    padding: 22px 26px;
    text-align: center;
    background: #1e293b;
    border: 1px solid rgba(56, 189, 248, 0.35);
    border-radius: 14px;
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
    color: #e2e8f0;
    font-size: 0.92rem;
  }

  .loading-box.error {
    border-color: rgba(239, 68, 68, 0.5);
  }

  .spinner {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 3px solid rgba(56, 189, 248, 0.25);
    border-top-color: #38bdf8;
    animation: ha-spin 0.9s linear infinite;
  }

  @keyframes ha-spin {
    to { transform: rotate(360deg); }
  }

  @media (prefers-reduced-motion: reduce) {
    .spinner {
      animation-duration: 3s;
    }
  }

  /* Dialogues (complètent .modal-dialog du panneau) */
  .modal-backdrop.choice-backdrop {
    z-index: 130;
  }

  .modal-dialog.wide {
    width: 640px;
  }

  .modal-dialog.warning {
    border-color: rgba(245, 158, 11, 0.45);
  }

  .modal-dialog-header.warning {
    background: rgba(245, 158, 11, 0.1);
    border-bottom-color: rgba(245, 158, 11, 0.25);
  }

  .modal-dialog.update {
    border-color: rgba(245, 158, 11, 0.45);
  }

  .modal-dialog-header.update {
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.05));
    border-bottom-color: rgba(245, 158, 11, 0.25);
  }

  .update-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: linear-gradient(135deg, #f59e0b, #d97706);
  }

  .modal-dialog-body {
    max-height: min(70vh, 640px);
    overflow-y: auto;
  }

  .modal-dialog-footer.wrap {
    flex-wrap: wrap;
  }

  .modal-dialog-footer.spread {
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .footer-buttons {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .btn-dialog-confirm.secondary {
    background: rgba(51, 65, 85, 0.85);
    color: #f1f5f9;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .btn-dialog-confirm.secondary:hover {
    background: #334155;
    border-color: #38bdf8;
  }

  .choice-message {
    margin: 0;
    color: #f1f5f9;
    font-size: 0.92rem;
    line-height: 1.5;
  }

  .choice-details {
    margin: 0;
    padding-left: 18px;
    color: #cbd5e1;
    font-size: 0.84rem;
    line-height: 1.55;
  }

  .dialog-hint {
    margin: 0;
    color: #94a3b8;
    font-size: 0.8rem;
    line-height: 1.45;
  }

  .dialog-warning {
    margin: 0;
    padding: 9px 12px;
    border-radius: 10px;
    background: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.3);
    color: #fde68a;
    font-size: 0.82rem;
    line-height: 1.45;
  }

  .draft-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .draft-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 10px;
    background: rgba(15, 23, 42, 0.65);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .draft-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    color: #f1f5f9;
    font-size: 0.88rem;
  }

  .draft-meta {
    color: #94a3b8;
    font-size: 0.78rem;
  }

  .draft-status {
    font-size: 0.78rem;
    color: #38bdf8;
  }

  .draft-item.status-outdated .draft-status,
  .draft-item.status-deleted .draft-status {
    color: #fbbf24;
  }

  .draft-actions {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .draft-actions .btn-dialog-confirm {
    padding: 6px 10px;
    font-size: 0.8rem;
  }

  .version-compare {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 12px;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.08);
    text-align: center;
  }

  .version-label {
    margin-bottom: 4px;
    color: #94a3b8;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
  }

  .version-label.new {
    color: #f59e0b;
  }

  .version-value {
    color: #ffffff;
    font-family: monospace;
    font-size: 16px;
    font-weight: 800;
  }

  .version-value.new {
    color: #10b981;
  }

  .version-arrow {
    color: #f59e0b;
    font-size: 18px;
    font-weight: 800;
  }

  .update-notes-title {
    margin-bottom: 6px;
    color: #f1f5f9;
    font-size: 12px;
    font-weight: 700;
  }

  .update-notes {
    max-height: 180px;
    overflow-y: auto;
    padding: 12px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #cbd5e1;
    font-size: 12px;
    line-height: 1.5;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }

  .release-link {
    color: #38bdf8;
    font-size: 12px;
    text-decoration: none;
  }

  .release-link:hover {
    text-decoration: underline;
  }
`;var Na=Object.defineProperty,L=(n,e,t,i)=>{for(var s=void 0,o=n.length-1,a;o>=0;o--)(a=n[o])&&(s=a(e,t,s)||s);return s&&Na(e,t,s),s};function Le(n,e){let t=!1;const i=n.map(s=>{const o=e(s);return o!==s&&(t=!0),o});return t?i:null}const st={light:{title:"Éclairage & Luminaires",tabLabel:"💡 Éclairage",icons:[{icon:"💡",label:"Ampoule standard",mdi:"mdi:lightbulb"},{icon:"🛋️",label:"Lampe salon",mdi:"mdi:lamp"},{icon:"🌟",label:"Spot encastré",mdi:"mdi:ceiling-light"},{icon:"🔆",label:"Plafonnier",mdi:"mdi:ceiling-light-outline"},{icon:"🏮",label:"Lanterne extérieure",mdi:"mdi:outdoor-lamp"},{icon:"🕯️",label:"Bougie / Ambiance",mdi:"mdi:candle"},{icon:"🔦",label:"Projecteur",mdi:"mdi:spotlight-beam"},{icon:"🪩",label:"Bandeau LED RGB",mdi:"mdi:led-strip-variant"},{icon:"✨",label:"Guirlande lumineuse",mdi:"mdi:string-lights"},{icon:"🛋",label:"Applique murale",mdi:"mdi:wall-sconce-flat"}]},switch:{title:"Prises & Interrupteurs",tabLabel:"🔌 Prises",icons:[{icon:"🔌",label:"Prise connectée",mdi:"mdi:power-socket-fr"},{icon:"⚡",label:"Interrupteur mural",mdi:"mdi:toggle-switch"},{icon:"📺",label:"Télévision",mdi:"mdi:television"},{icon:"☕",label:"Cafetière / Électroménager",mdi:"mdi:coffee-maker"},{icon:"💻",label:"PC / Bureau",mdi:"mdi:laptop"},{icon:"🔊",label:"Enceinte / Chaîne Hi-Fi",mdi:"mdi:speaker"},{icon:"🖨️",label:"Imprimante",mdi:"mdi:printer"},{icon:"🎮",label:"Console de jeu",mdi:"mdi:gamepad-variant"},{icon:"🔋",label:"Chargeur batterie",mdi:"mdi:battery-charging"},{icon:"🪭",label:"Ventilateur mobile",mdi:"mdi:fan"}]},binary_sensor:{title:"Détecteurs, Sécurité & Ouvrants",tabLabel:"📡 Détecteurs",icons:[{icon:"🚶",label:"Mouvement PIR",mdi:"mdi:motion-sensor"},{icon:"🏃",label:"Passage rapide",mdi:"mdi:walk"},{icon:"👁️",label:"Radar présence",mdi:"mdi:radar"},{icon:"🚪",label:"Capteur porte",mdi:"mdi:door"},{icon:"🪟",label:"Capteur fenêtre",mdi:"mdi:window-closed"},{icon:"🚗",label:"Porte garage",mdi:"mdi:garage"},{icon:"🚨",label:"Sirène / Alarme",mdi:"mdi:alarm-light"},{icon:"🔔",label:"Sonnette / Carillon",mdi:"mdi:doorbell"},{icon:"🐾",label:"Présence animale",mdi:"mdi:paw"},{icon:"💧",label:"Fuite d'eau",mdi:"mdi:water-alert"},{icon:"🔥",label:"Détecteur fumée",mdi:"mdi:smoke-detector"},{icon:"📬",label:"Boîte aux lettres",mdi:"mdi:mailbox"}]},climate:{title:"Thermostats & Climatisation",tabLabel:"🌡️ Climat",icons:[{icon:"🌡️",label:"Thermostat principal",mdi:"mdi:thermostat"},{icon:"❄️",label:"Climatiseur (Froid)",mdi:"mdi:air-conditioner"},{icon:"🔥",label:"Radiateur (Chaud)",mdi:"mdi:radiator"},{icon:"♨️",label:"Pompe à chaleur / ECS",mdi:"mdi:water-boiler"},{icon:"💨",label:"VMC / Aération",mdi:"mdi:fan"}]},sensor:{title:"Capteurs & Sondes",tabLabel:"📊 Sondes",icons:[{icon:"🌡️",label:"Sonde température",mdi:"mdi:thermometer"},{icon:"💧",label:"Hygrométrie (Humidité)",mdi:"mdi:water-percent"},{icon:"☀️",label:"Luminosité (Lux)",mdi:"mdi:weather-sunny"},{icon:"💨",label:"Qualité d'air (CO2/VOC)",mdi:"mdi:air-filter"},{icon:"⚡",label:"Consommation électrique",mdi:"mdi:flash"},{icon:"🔋",label:"Batterie restante",mdi:"mdi:battery"},{icon:"🔊",label:"Bruit / Décibels",mdi:"mdi:volume-high"},{icon:"⚖️",label:"Pression barométrique",mdi:"mdi:gauge"}]},cover:{title:"Volets, Stores & Motorisations",tabLabel:"🪟 Volets",icons:[{icon:"🪟",label:"Volet roulant",mdi:"mdi:window-shutter"},{icon:"🚪",label:"Store vénitien",mdi:"mdi:blinds"},{icon:"🚗",label:"Porte garage motorisée",mdi:"mdi:garage"},{icon:"⛺",label:"Store banne terrasse",mdi:"mdi:awning"},{icon:"↕️",label:"Motorisation baie",mdi:"mdi:arrow-up-down"}]},media_player:{title:"Multimédia & Enceintes",tabLabel:"📺 Média",icons:[{icon:"📺",label:"Téléviseur",mdi:"mdi:television"},{icon:"📻",label:"Enceinte connectée",mdi:"mdi:speaker"},{icon:"🎵",label:"Musique multiroom",mdi:"mdi:music"},{icon:"🔊",label:"Ampli Home-Cinema",mdi:"mdi:speaker-wireless"},{icon:"🎬",label:"Vidéoprojecteur",mdi:"mdi:projector"},{icon:"🎮",label:"Console jeux vidéo",mdi:"mdi:gamepad-variant"}]},camera:{title:"Caméras & Vidéosurveillance",tabLabel:"📷 Caméras",icons:[{icon:"📷",label:"Caméra intérieure fixe",mdi:"mdi:camera"},{icon:"📹",label:"Caméra dôme PTZ extérieure",mdi:"mdi:cctv"},{icon:"👁️",label:"Zone sous surveillance",mdi:"mdi:eye"},{icon:"🎥",label:"Portier / Interphone vidéo",mdi:"mdi:video"}]},fan:{title:"Ventilation & Brassage",tabLabel:"💨 Ventilateur",icons:[{icon:"💨",label:"Ventilateur colonne/pied",mdi:"mdi:fan"},{icon:"🌀",label:"VMC extraction",mdi:"mdi:fan-chevron-up"},{icon:"🌪️",label:"Plafonnier ventilateur",mdi:"mdi:ceiling-fan"}]},vacuum:{title:"Robots Aspirateurs & Nettoyage",tabLabel:"🤖 Robots",icons:[{icon:"🤖",label:"Robot aspirateur",mdi:"mdi:robot-vacuum"},{icon:"🧹",label:"Robot laveur de sol",mdi:"mdi:broom"}]},lock:{title:"Serrures & Contrôle d'accès",tabLabel:"🔒 Serrures",icons:[{icon:"🔒",label:"Serrure connectée",mdi:"mdi:lock"},{icon:"🛡️",label:"Alarme intrusion",mdi:"mdi:shield-home"},{icon:"🗝️",label:"Gâche électrique",mdi:"mdi:key"}]}},gi=class gi extends Se{constructor(){super(...arguments),this.narrow=!1,this.activeTool="wall",this.currentThickness=.2,this.currentOpeningWidth=.9,this.doorFlipSide=!1,this.doorFlipDirection=!0,this.windowSashCount=1,this.showDimensions=!0,this.showThermalHeatmap=!1,this.showGhostLevel=!1,this.is3DMode=!1,this.isFullscreen=!1,this.isDrawerCollapsed=!1,this.isWizardOpen=!1,this.isImportModalOpen=!1,this.isExportModalOpen=!1,this.isSaveLoadModalOpen=!1,this.isNewPlanModalOpen=!1,this.newPlanName="Nouveau Plan",this.newPlanCategory=ke,this.isResetModalOpen=!1,this.saveLoadModalTab="save",this.isCalibrateModalOpen=!1,this.calibrationData=null,this.isRescaleModalOpen=!1,this.rescaleMeasuredMeters=0,this.selectedRoomForEdit=null,this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[]},this.activeDropdown=null,this.selectedTypologyTab="",this.isIconPickerOpen=!0,this.updateInfo=null,this.isUpdateModalOpen=!1,this.logoClickTimes=[],this.socrateKeySequence="",this._boundEasterEggKeyDown=null,this.updateCheckStarted=!1,this.updateEntitySig=null,this.persistence=new za(this,{toast:e=>this.showToast(e),activeProjectChanged:()=>this.clearSelection()}),this.fileInputRef=null,this.toastMessage=null,this.toastTimeout=null,this._boundPaste=null,this._boundKeyDown=null,this._boundClickOutside=null,this._boundFullscreenChange=null,this._boundResize=null,this._boundDocumentClick=null,this._sidebarResizeObserver=null}get project(){return this.persistence.project}get activeLevel(){const e=this.project.category;return e&&kt(e)?e:null}get readOnly(){return this.persistence.readOnly}handleToolSelected(e){this.activeTool=e.detail.tool,this.activeTool==="door"?this.currentOpeningWidth=.9:this.activeTool==="window"?this.currentOpeningWidth=this.windowSashCount===2?1.4:.9:this.activeTool==="french_window"&&(this.currentOpeningWidth=2)}handleDoorConfigChanged(e){if(this.doorFlipSide=e.detail.flipSide,this.doorFlipDirection=e.detail.flipDirection,this.activeTool="door",this.selectedElements.openingIds.length>0&&!this.readOnly){let t=0;const i=Le(this.project.openings,s=>this.selectedElements.openingIds.includes(s.id)&&s.type==="door"&&(s.flipSide!==e.detail.flipSide||s.flipDirection!==e.detail.flipDirection)?(t++,{...s,flipSide:e.detail.flipSide,flipDirection:e.detail.flipDirection}):s);i&&this.commitProject({...this.project,openings:i})&&this.showToast(`🚪 ${t} porte(s) mise(s) à jour`)}}handleWindowConfigChanged(e){if(this.activeTool=e.detail.type,this.currentOpeningWidth=e.detail.width,this.windowSashCount=e.detail.sashCount,this.selectedElements.openingIds.length>0&&!this.readOnly){let t=0;const i=Le(this.project.openings,s=>this.selectedElements.openingIds.includes(s.id)&&(s.type==="window"||s.type==="french_window")&&(s.type!==e.detail.type||s.width!==e.detail.width||s.sashCount!==e.detail.sashCount)?(t++,{...s,type:e.detail.type,width:e.detail.width,sashCount:e.detail.sashCount}):s);i&&this.commitProject({...this.project,openings:i})&&this.showToast(`🪟 ${t} fenêtre(s) mise(s) à jour`)}}handleWallThicknessChanged(e){if(this.currentThickness=e.detail.thickness,this.activeTool="wall",this.selectedElements.wallIds.length>0&&!this.readOnly){const t=this.wallsWithThickness(e.detail.thickness);t&&this.commitProject({...this.project,walls:t})&&this.showToast(`🧱 Épaisseur de ${this.selectedElements.wallIds.length} mur(s) mise à jour (${Math.round(e.detail.thickness*100)} cm)`)}}wallsWithThickness(e){return Le(this.project.walls,t=>this.selectedElements.wallIds.includes(t.id)&&t.thickness!==e?{...t,thickness:e}:t)}updateSelectedDoorConfig(e,t){this.doorFlipSide=e,this.doorFlipDirection=t;const i=Le(this.project.openings,s=>this.selectedElements.openingIds.includes(s.id)&&s.type==="door"&&(s.flipSide!==e||s.flipDirection!==t)?{...s,flipSide:e,flipDirection:t}:s);i&&this.commitProject({...this.project,openings:i})&&this.showToast("🚪 Sens d'ouverture de porte mis à jour")}updateSelectedWindowConfig(e,t,i){this.windowSashCount=t,this.currentOpeningWidth=i;const s=Le(this.project.openings,o=>this.selectedElements.openingIds.includes(o.id)&&(o.type==="window"||o.type==="french_window")&&(o.type!==e||o.sashCount!==t||o.width!==i)?{...o,type:e,sashCount:t,width:i}:o);s&&this.commitProject({...this.project,openings:s})&&this.showToast("🪟 Format de fenêtre mis à jour")}updateSelectedWallsThickness(e){this.currentThickness=e;const t=this.wallsWithThickness(e);t&&this.commitProject({...this.project,walls:t})&&this.showToast(`🧱 Épaisseur de mur mise à jour (${Math.round(e*100)} cm)`)}handleProjectChanged(e){const t=e.detail?.project;!t||t===this.project||t.id!==this.project.id||this.commitProject({...t,furniture:t.furniture||[]})}commitProject(e,t={}){return this.persistence.commit(e,t)}notifyReadOnly(){this.persistence.notifyReadOnly()}handleThicknessChange(e){this.currentThickness=parseFloat(e.target.value)}handleOpeningWidthChange(e){this.currentOpeningWidth=parseFloat(e.target.value)}handleCreateRoomFromWizard(e){if(this.readOnly){this.isWizardOpen=!1,this.notifyReadOnly();return}const{name:t,width:i,length:s,thickness:o,height:a,color:r,icon:l,addDoor:c,addWindow:u}=e.detail,d=a||2.5,g=2,m=2,b={x:g,y:m},p={x:g+i,y:m},v={x:g+i,y:m+s},x={x:g,y:m+s},y={id:ve("w"),start:b,end:p,thickness:o,height:d,type:"standard"},h={id:ve("w"),start:p,end:v,thickness:o,height:d,type:"standard"},S={id:ve("w"),start:v,end:x,thickness:o,height:d,type:"standard"},M={id:ve("w"),start:x,end:b,thickness:o,height:d,type:"standard"},I=[];c&&I.push({id:ve("op"),wallId:S.id,type:"door",offset:i/2,width:.9,flipSide:!1,flipDirection:!1}),u&&I.push({id:ve("op"),wallId:y.id,type:"window",offset:i/2,width:1.2,flipSide:!1,flipDirection:!1});const k={id:ve("room"),name:t,polygon:[b,p,v,x],areaM2:i*s,color:r,icon:l,height:d};this.commitProject({...this.project,walls:[...this.project.walls,y,h,S,M],openings:[...this.project.openings,...I],rooms:[...this.project.rooms,k]}),this.isWizardOpen=!1,this.activeTool="select"}updateSidebarOffset(){if(this.isFullscreen){this.style.setProperty("--ha-sidebar-width","0px");return}let e=0;try{const o=document.querySelector("home-assistant")?.shadowRoot?.querySelector("home-assistant-main")?.shadowRoot?.querySelector("ha-sidebar");if(o){const a=o.getBoundingClientRect();a.width>0&&a.right>0&&window.getComputedStyle(o).display!=="none"&&(e=Math.round(a.width)),!this._sidebarResizeObserver&&typeof ResizeObserver<"u"&&(this._sidebarResizeObserver=new ResizeObserver(()=>{this.updateSidebarOffset()}),this._sidebarResizeObserver.observe(o))}}catch{}if(e===0)try{const i=document.querySelector("ha-sidebar");if(i){const s=i.getBoundingClientRect();s.width>0&&s.right>0&&window.getComputedStyle(i).display!=="none"&&(e=Math.round(s.width))}}catch{}if(e===0)try{const i=getComputedStyle(document.documentElement),s=i.getPropertyValue("--app-drawer-width")||i.getPropertyValue("--mdc-drawer-width");if(s&&s.trim().endsWith("px")){const o=parseFloat(s);!isNaN(o)&&o>0&&(e=o)}}catch{}let t=0;if(e>0){const i=this.getBoundingClientRect(),s=parseFloat(this.style.getPropertyValue("--ha-sidebar-width")||"0")||0,o=i.left-s;o<e&&(t=Math.max(0,e-Math.max(0,o)))}this.style.setProperty("--ha-sidebar-width",`${t}px`)}connectedCallback(){super.connectedCallback(),this._boundPaste=this.handlePaste.bind(this),window.addEventListener("paste",this._boundPaste),this._boundKeyDown=this.handleKeyDown.bind(this),window.addEventListener("keydown",this._boundKeyDown),this._boundClickOutside=e=>{this.activeDropdown&&(e.composedPath().some(s=>s?.classList?.contains("dropdown-menu-wrapper"))||(this.activeDropdown=null))},window.addEventListener("click",this._boundClickOutside),this._boundFullscreenChange=()=>{const e=!!(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement);this.isFullscreen=e,e?this.classList.add("is-fullscreen"):this.classList.remove("is-fullscreen"),this.updateSidebarOffset()},document.addEventListener("fullscreenchange",this._boundFullscreenChange),document.addEventListener("webkitfullscreenchange",this._boundFullscreenChange),document.addEventListener("mozfullscreenchange",this._boundFullscreenChange),document.addEventListener("MSFullscreenChange",this._boundFullscreenChange),this._boundResize=()=>this.updateSidebarOffset(),window.addEventListener("resize",this._boundResize),this._boundDocumentClick=()=>{setTimeout(()=>this.updateSidebarOffset(),50),setTimeout(()=>this.updateSidebarOffset(),320)},document.addEventListener("click",this._boundDocumentClick,{passive:!0}),this.updateSidebarOffset(),setTimeout(()=>this.updateSidebarOffset(),100),this._boundEasterEggKeyDown=e=>{const t=e.target?.tagName?.toLowerCase();t==="input"||t==="textarea"||e.target?.isContentEditable||e.key&&e.key.length===1&&(this.socrateKeySequence=(this.socrateKeySequence+e.key.toLowerCase()).slice(-7),this.socrateKeySequence==="socrate"&&(this.socrateKeySequence="",this.triggerEasterEgg()))},window.addEventListener("keydown",this._boundEasterEggKeyDown)}firstUpdated(){this.updateSidebarOffset()}willUpdate(e){super.willUpdate(e),this.isConnected&&this.persistence.prefetchGhost(this.ghostLevel())}updated(e){super.updated(e),e.has("hass")&&this.hass&&(this.persistence.start(),this.maybeRefreshUpdateInfo(),this.syncSidebarBadge(!!this.updateInfo?.available))}maybeRefreshUpdateInfo(){if(!wt(this.hass))return;const e=hs(this.hass,this.updateInfo?.entityId??null);this.updateCheckStarted&&e===this.updateEntitySig||(this.updateCheckStarted=!0,this.updateEntitySig=e,this.refreshUpdateInfo())}async refreshUpdateInfo(){try{const e=await La(this.hass);this.updateInfo=e,this.updateEntitySig=hs(this.hass,e?.entityId??null),e?.available||(this.isUpdateModalOpen=!1),this.syncSidebarBadge(!!e?.available)}catch(e){console.debug("[home-architect] Vérification des mises à jour impossible :",e)}}openHaUpdates(){this.isUpdateModalOpen=!1,this.persistence.flushDrafts(),Fa(Oa)}reloadPage(){this.persistence.flushDrafts(),window.location.reload()}syncSidebarBadge(e){try{const t=document.querySelector("home-assistant"),i=t&&t.shadowRoot&&t.shadowRoot.querySelector("home-assistant-main"),s=i&&i.shadowRoot&&i.shadowRoot.querySelector("ha-sidebar");if(!s||!s.shadowRoot)return;const a=(s.shadowRoot.querySelector("paper-listbox, ha-md-list, nav, div.menu, div.items")||s.shadowRoot).querySelectorAll("paper-icon-item, ha-md-list-item, ha-sidebar-item, a"),r=["home-architect","home_architect","home architect"];for(const l of Array.from(a)){const c=l.getAttribute("href")||l.dataset?.panel||l.dataset?.href||"",u=l.id||"",d=l.getAttribute("aria-label")||"",g=(l.textContent||"").toLowerCase();if(r.some(b=>c.toLowerCase().includes(b)||u.toLowerCase().includes(b)||d.toLowerCase().includes(b)||g.includes(b))){let b=l.querySelector(".domolink-sidebar-badge");e?b||(b=document.createElement("span"),b.className="badge domolink-sidebar-badge",b.setAttribute("slot","end"),b.setAttribute("style","background: linear-gradient(135deg, #ef4444, #f59e0b); color: white; border-radius: 9999px; padding: 2px 7px; font-size: 10px; font-weight: 800; box-shadow: 0 2px 6px rgba(239,68,68,0.4); margin-left: auto; letter-spacing: 0.5px; z-index: 10; display: inline-block;"),b.textContent="MAJ",b.setAttribute("title","Mise à jour disponible !"),l.appendChild(b)):b&&b.remove()}}}catch{}}triggerEasterEgg(){const e=this.shadowRoot||this;pa(e)}handleLogoClick(){const e=Date.now();this.logoClickTimes=this.logoClickTimes.filter(t=>e-t<2500),this.logoClickTimes.push(e),this.logoClickTimes.length>=5&&(this.logoClickTimes=[],this.triggerEasterEgg())}openUpdateModal(){this.isUpdateModalOpen=!0}closeUpdateModal(){this.isUpdateModalOpen=!1}disconnectedCallback(){super.disconnectedCallback(),this._boundPaste&&window.removeEventListener("paste",this._boundPaste),this._boundKeyDown&&window.removeEventListener("keydown",this._boundKeyDown),this._boundEasterEggKeyDown&&window.removeEventListener("keydown",this._boundEasterEggKeyDown),this._boundClickOutside&&window.removeEventListener("click",this._boundClickOutside),this._boundFullscreenChange&&(document.removeEventListener("fullscreenchange",this._boundFullscreenChange),document.removeEventListener("webkitfullscreenchange",this._boundFullscreenChange),document.removeEventListener("mozfullscreenchange",this._boundFullscreenChange),document.removeEventListener("MSFullscreenChange",this._boundFullscreenChange)),this._boundResize&&window.removeEventListener("resize",this._boundResize),this._boundDocumentClick&&document.removeEventListener("click",this._boundDocumentClick),this._sidebarResizeObserver&&(this._sidebarResizeObserver.disconnect(),this._sidebarResizeObserver=null),this.toastTimeout&&clearTimeout(this.toastTimeout)}showToast(e){this.toastMessage=e,this.toastTimeout&&clearTimeout(this.toastTimeout),this.toastTimeout=setTimeout(()=>{this.toastMessage=null},4500)}async loadBackgroundImage(e,t="Plan chargé !"){if(!this.persistence.ready)return;if(this.readOnly){this.notifyReadOnly();return}const i=this.project.id,s=typeof e=="string"&&!ri(e)?await this.externalBackground(e):await this.persistence.withBusy("Téléversement de l'image de fond…",()=>this.persistence.prepareAndUploadBackground(i,e));!s||this.project.id!==i||this.commitProject({...this.project,background:s})&&(this.activeTool="calibrate",this.showToast(`${t} Tracez un segment sur un mur mesuré pour étalonner l'échelle (📏).`))}externalBackground(e){return new Promise(t=>{const i=new Image;i.onload=()=>t({imageUrl:e,opacity:.4,visible:!0,offset:{x:0,y:0},scale:1,rotation:0,widthPx:i.naturalWidth,heightPx:i.naturalHeight}),i.onerror=()=>{this.showToast("❌ Erreur lors du chargement de l'image."),t(null)},i.src=e})}async handleImportConfirmed(e){if(this.isImportModalOpen=!1,this.readOnly){this.notifyReadOnly();return}const{background:t,opacity:i,mode:s,totalWidthMeters:o,isSvgVectorized:a,svgInterpretation:r,keepSvgBackground:l}=e.detail,c=this.project.id,u=!!(a&&r&&r.success);let d;if(t&&(!u||l)){const m=u?.25:.4,b=await this.persistence.withBusy("Téléversement de l'image de fond…",()=>this.persistence.uploadImportedBackground(c,t,i!==void 0?i:m));if(!b)return;d=b}if(this.project.id!==c)return;if(u&&r){const{walls:m,openings:b,rooms:p,metersPerUnit:v,stats:x}=r,y=d&&Number.isFinite(v)&&v>0?{...d,scale:v*this.project.pixelsPerMeter}:d;if(!this.commitProject({...this.project,walls:[...this.project.walls,...m],openings:[...this.project.openings,...b],rooms:[...this.project.rooms,...p],background:y}))return;this.activeTool="select",this.showToast(`✨ Plan SVG converti : ${x.wallCount} mur${x.wallCount>1?"s":""}, ${x.doorCount} porte${x.doorCount>1?"s":""}, ${x.windowCount} fenêtre${x.windowCount>1?"s":""} et ${x.roomCount} pièce${x.roomCount>1?"s":""} créés !`);return}if(!d)return;let g=this.project.pixelsPerMeter;s==="auto_dimension"&&o&&o>0&&d.widthPx&&(g=Math.round(d.widthPx/o*10)/10),this.commitProject({...this.project,pixelsPerMeter:g,background:d})&&(s==="auto_dimension"?(this.activeTool="wall",this.showToast(`✅ Plan importé et étalonné automatiquement (1 m = ${g} px) ! Vous pouvez tracer vos murs (🧱).`)):(this.activeTool="calibrate",this.showToast("📏 Plan importé ! Tracez un segment sur un mur mesuré pour étalonner l'échelle.")))}handlePaste(e){if(this.isImportModalOpen||!e.clipboardData)return;const t=e.clipboardData.items;for(let s=0;s<t.length;s++)if(t[s].type.indexOf("image")!==-1){const o=t[s].getAsFile();if(o){e.preventDefault(),this.loadBackgroundImage(o,"📋 Image collée depuis le presse-papier !");return}}const i=e.clipboardData.getData("text/plain")?.trim();if(i&&(i.startsWith("<svg")||i.startsWith("<?xml")&&i.includes("<svg"))){e.preventDefault(),this.openImportModal(),this.isImportModalOpen&&this.showToast("📥 Code SVG détecté ! Configurez la vectorisation automatique.");return}i&&(i.startsWith("data:image/")||i.match(/\.(png|jpe?g|svg|webp)(\?.*)?$/i))&&(e.preventDefault(),this.loadBackgroundImage(i,"📋 Image chargée depuis l'URL collée !"))}triggerFileInput(){if(!this.fileInputRef){const e=document.createElement("input");e.type="file",e.accept="image/*",e.style.display="none",e.addEventListener("change",t=>this.handleFileSelected(t)),document.body.appendChild(e),this.fileInputRef=e}this.fileInputRef.click()}handleFileSelected(e){const t=e.target.files?.[0];if(!t)return;const i=new FileReader;i.onload=s=>{const o=s.target?.result;this.loadBackgroundImage(o,"🖼️ Image importée depuis votre ordinateur !")},i.readAsDataURL(t)}handleRequestCalibration(e){this.calibrationData=e.detail,this.isCalibrateModalOpen=!0}handleCalibrateConfirmed(e){const{pixelsPerMeter:t}=e.detail,i=Math.round(t*10)/10;i!==this.project.pixelsPerMeter&&this.commitProject({...this.project,pixelsPerMeter:i}),this.isCalibrateModalOpen=!1,this.calibrationData=null,this.activeTool="wall"}handleRequestRescale(e){this.rescaleMeasuredMeters=e.detail.measuredMeters,this.isRescaleModalOpen=!0}handleRescaleConfirmed(e){const{scaleFactor:t,adjustBackground:i}=e.detail;if(this.isRescaleModalOpen=!1,!Number.isFinite(t)||t<=0||t===1)return;const s=this.project.walls.map(g=>({...g,start:{x:ie.roundMeters(g.start.x*t),y:ie.roundMeters(g.start.y*t)},end:{x:ie.roundMeters(g.end.x*t),y:ie.roundMeters(g.end.y*t)}})),o=this.project.openings.map(g=>({...g,offset:ie.roundMeters(g.offset*t),width:ie.roundMeters(g.width*t)})),a=this.project.rooms.map(g=>{const m=g.polygon.map(p=>({x:ie.roundMeters(p.x*t),y:ie.roundMeters(p.y*t)})),b=Re.computeArea(m);return{...g,polygon:m,areaM2:b||ie.roundMeters(g.areaM2*t*t)}}),r=this.project.bindings.map(g=>({...g,position:{x:ie.roundMeters(g.position.x*t),y:ie.roundMeters(g.position.y*t)}})),l=(this.project.furniture||[]).map(g=>({...g,position:{x:ie.roundMeters(g.position.x*t),y:ie.roundMeters(g.position.y*t)},width:ie.roundMeters(g.width*t),length:ie.roundMeters(g.length*t)}));let c=this.project.pixelsPerMeter,u=this.project.background?{...this.project.background}:void 0;i&&u&&(c=Math.round(this.project.pixelsPerMeter/t*10)/10,u.offset&&(u={...u,offset:{x:ie.roundMeters(u.offset.x*t),y:ie.roundMeters(u.offset.y*t)}})),this.commitProject({...this.project,pixelsPerMeter:c,walls:s,openings:o,rooms:a,bindings:r,furniture:l,background:u})&&(this.activeTool="select",this.showToast(`✅ Plan mis à l'échelle (×${t.toFixed(3)}) : ${s.length} murs et ${a.length} pièces recalculés !`))}handleOpacityChange(e){const t=parseFloat(e.target.value),i=this.project.background;i&&Number.isFinite(t)&&t!==i.opacity&&this.commitProject({...this.project,background:{...i,opacity:t}},{coalesceKey:"background-opacity"})}handleDefaultCeilingChange(e){!Number.isFinite(e)||e===this.project.defaultCeilingHeight||this.commitProject({...this.project,defaultCeilingHeight:e})&&this.showToast(`📐 Hauteur plafond 3D par défaut : ${e.toFixed(2)} m`)}handleSaveRoom(e){const{roomId:t,name:i,height:s,color:o}=e.detail;this.selectedRoomForEdit=null;const a=Le(this.project.rooms,r=>r.id===t&&(r.name!==i||r.height!==s||r.color!==o)?{...r,name:i,height:s,color:o}:r);a&&this.commitProject({...this.project,rooms:a})&&this.showToast(`✨ Pièce "${i}" mise à jour (H: ${s.toFixed(2)} m) !`)}handleDeleteRoom(e){const{roomId:t}=e.detail;this.selectedRoomForEdit=null;const i=this.project.rooms.filter(s=>s.id!==t);i.length!==this.project.rooms.length&&this.commitProject({...this.project,rooms:i})&&this.showToast("🗑️ Pièce supprimée")}handleUndo(){this.persistence.undo()&&(this.clearSelection(),this.showToast("↩️ Action annulée"))}handleRedo(){this.persistence.redo()&&(this.clearSelection(),this.showToast("↪️ Action rétablie"))}ghostLevel(){return this.showGhostLevel?yo(this.activeLevel):null}rotateSelectedFurniture(){if(!this.selectedElements.furnitureIds||this.selectedElements.furnitureIds.length===0)return;const e=this.selectedElements.furnitureIds,t=(this.project.furniture||[]).map(i=>e.includes(i.id)?{...i,rotation:((i.rotation||0)+90)%360}:i);this.commitProject({...this.project,furniture:t})&&this.showToast("🔄 Meuble pivoté de 90°")}handleDeleteSelected(){const{wallIds:e,openingIds:t,roomIds:i,bindingIds:s,furnitureIds:o=[]}=this.selectedElements,a=e.length+t.length+i.length+s.length+o.length;if(a===0)return;const r=this.project.walls.filter(m=>!e.includes(m.id)),l=this.project.openings.filter(m=>!t.includes(m.id)&&!e.includes(m.wallId)),c=this.project.rooms.filter(m=>!i.includes(m.id)),u=this.project.bindings.filter(m=>!s.includes(m.id)),d=(this.project.furniture||[]).filter(m=>!o.includes(m.id));this.commitProject({...this.project,walls:r,openings:l,rooms:c,bindings:u,furniture:d})&&(this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[]},this.showToast(`🗑️ ${a} élément${a>1?"s":""} supprimé${a>1?"s":""} !`))}clearSelection(){this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[]}}toggleDropdown(e,t){t&&t.stopPropagation(),this.activeDropdown=this.activeDropdown===e?null:e,this.activeDropdown==="level"&&this.persistence.refreshSummaries()}getActiveTypology(){if(this.selectedTypologyTab)return this.selectedTypologyTab;if(this.selectedElements.bindingIds.length>0){const e=this.project.bindings.find(t=>t.id===this.selectedElements.bindingIds[0]);if(e){const t=e.entityId.split(".")[0];if(st[t])return t}}return"light"}updateSelectedBindingIcon(e,t){if(!this.selectedElements.bindingIds||this.selectedElements.bindingIds.length===0)return;const i=this.selectedElements.bindingIds[0],s=Le(this.project.bindings,o=>o.id===i&&(o.icon!==e||o.mdiIcon!==t)?{...o,icon:e,mdiIcon:t}:o);s&&this.commitProject({...this.project,bindings:s})&&this.showToast(`✨ Icône ${e} appliquée !`)}getSelectedSummary(){const e=[];if(this.selectedElements.wallIds.length>0&&e.push(`${this.selectedElements.wallIds.length} mur${this.selectedElements.wallIds.length>1?"s":""}`),this.selectedElements.openingIds.length>0&&e.push(`${this.selectedElements.openingIds.length} ouvrant${this.selectedElements.openingIds.length>1?"s":""}`),this.selectedElements.roomIds.length>0&&e.push(`${this.selectedElements.roomIds.length} pièce${this.selectedElements.roomIds.length>1?"s":""}`),this.selectedElements.bindingIds.length>0)if(this.selectedElements.bindingIds.length===1){const t=this.project.bindings.find(i=>i.id===this.selectedElements.bindingIds[0]);e.push(t?t.customName||t.entityId.split(".")[1]||t.entityId:"1 entité")}else e.push(`${this.selectedElements.bindingIds.length} entités`);return this.selectedElements.furnitureIds&&this.selectedElements.furnitureIds.length>0&&e.push(`${this.selectedElements.furnitureIds.length} meuble${this.selectedElements.furnitureIds.length>1?"s":""}`),e.join(", ")}handleKeyDown(e){if(Go(e)&&!e.shiftKey&&e.key.toLowerCase()==="s"){if(!$s(e,this)&&!Vo(e,{host:this}))return;e.preventDefault(),this.isModalOpen()||this.quickSave();return}if(this.persistence.handleBlockingKey(e))return;if(e.key==="Escape"){if(this.isUpdateModalOpen){this.isUpdateModalOpen=!1;return}if(this.isNewPlanModalOpen){this.isNewPlanModalOpen=!1;return}if(this.isResetModalOpen){this.isResetModalOpen=!1;return}this.isFullscreen&&this.toggleFullscreen(),this.activeDropdown&&(this.activeDropdown=null),this.clearSelection();return}const t=e.target?.tagName?.toLowerCase();t==="input"||t==="textarea"||e.target?.isContentEditable||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="n"?(e.preventDefault(),this.openNewPlanModal()):(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"&&!e.shiftKey?(e.preventDefault(),this.handleUndo()):(e.ctrlKey||e.metaKey)&&(e.key.toLowerCase()==="y"||e.key.toLowerCase()==="z"&&e.shiftKey)?(e.preventDefault(),this.handleRedo()):e.key==="Delete"||e.key==="Backspace"?this.selectedElements.wallIds.length+this.selectedElements.openingIds.length+this.selectedElements.roomIds.length+this.selectedElements.bindingIds.length+(this.selectedElements.furnitureIds?.length||0)>0&&(e.preventDefault(),this.handleDeleteSelected()):e.key.toLowerCase()==="r"?this.selectedElements.furnitureIds&&this.selectedElements.furnitureIds.length>0&&(e.preventDefault(),this.rotateSelectedFurniture()):e.key.toLowerCase()==="v"&&(this.activeTool="select"))}async toggleFullscreen(){const e=!!(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement);if(!this.isFullscreen&&!e){try{const t=this||document.documentElement;t.requestFullscreen?await t.requestFullscreen():t.webkitRequestFullscreen?await t.webkitRequestFullscreen():t.mozRequestFullScreen?await t.mozRequestFullScreen():t.msRequestFullscreen&&await t.msRequestFullscreen()}catch(t){console.warn("Mode plein écran natif indisponible, utilisation du mode étendu:",t)}this.isFullscreen=!0,this.classList.add("is-fullscreen"),this.updateSidebarOffset(),this.showToast("⛶ Mode plein écran activé (Échap pour sortir)")}else{try{const t=document;(t.fullscreenElement||t.webkitFullscreenElement||t.mozFullScreenElement||t.msFullscreenElement)&&(t.exitFullscreen?await t.exitFullscreen():t.webkitExitFullscreen?await t.webkitExitFullscreen():t.mozCancelFullScreen?await t.mozCancelFullScreen():t.msExitFullscreen&&await t.msExitFullscreen())}catch(t){console.warn("Erreur lors de la sortie du mode plein écran:",t)}this.isFullscreen=!1,this.classList.remove("is-fullscreen"),this.updateSidebarOffset(),this.showToast("🗗 Sortie du plein écran")}}openNewPlanModal(){if(this.activeDropdown=null,this.readOnly){this.notifyReadOnly();return}const e=this.activeLevel??ke;this.newPlanName=`Plan ${$e(e)}`,this.newPlanCategory=e,this.isNewPlanModalOpen=!0}async handleConfirmNewPlan(){const e=this.newPlanName.trim()||"Nouveau plan",t=this.newPlanCategory||ke;await this.persistence.createPlan(e,t)&&(this.isNewPlanModalOpen=!1)}openResetModal(){if(this.activeDropdown=null,this.readOnly){this.notifyReadOnly();return}this.isResetModalOpen=!0}handleConfirmResetPlan(){this.isResetModalOpen=!1,!(Ns(this.project)||!this.commitProject({...this.project,walls:[],openings:[],rooms:[],bindings:[],furniture:[],background:void 0}))&&(this.clearSelection(),this.showToast("🗑️ Plan effacé (Réinitialisé). Annulez avec Ctrl+Z si besoin."),setTimeout(()=>{this.shadowRoot?.querySelector("home-architect-canvas")?.fitToScreen()},80))}openWizard(){if(this.activeDropdown=null,this.readOnly){this.notifyReadOnly();return}this.isWizardOpen=!0}openImportModal(){if(this.activeDropdown=null,this.readOnly){this.notifyReadOnly();return}this.isImportModalOpen=!0}openSaveModal(){if(this.activeDropdown=null,this.readOnly){this.notifyReadOnly();return}this.saveLoadModalTab="save",this.isSaveLoadModalOpen=!0}openLoadModal(){this.saveLoadModalTab="load",this.isSaveLoadModalOpen=!0,this.activeDropdown=null}async handleLoadProject(e){this.isSaveLoadModalOpen=!1;const t=e.detail?.projectId;typeof t!="string"||t===""||await this.persistence.openPlan(t,{refresh:!0})}async handleSaveConfirmed(e){this.isSaveLoadModalOpen=!1,await this.persistence.saveFromDialog(e.detail)}async quickSave(){if(this.readOnly){this.notifyReadOnly();return}if(this.persistence.ready){if(this.project.revision===void 0){this.openSaveModal();return}await this.persistence.save(this.project.id)}}async saveAllDirty(){this.activeDropdown=null,await this.persistence.saveAllDirty()}handleExportFrameChanged(e){this.persistence.setExportFrame(e.detail?.frame)}handleProjectPublished(e){this.persistence.setPublish(e.detail?.publish)}isModalOpen(){return this.isWizardOpen||this.isImportModalOpen||this.isExportModalOpen||this.isSaveLoadModalOpen||this.isNewPlanModalOpen||this.isResetModalOpen||this.isCalibrateModalOpen||this.isRescaleModalOpen||this.isUpdateModalOpen||this.selectedRoomForEdit!==null||this.persistence.isBlocking()}updateBanners(){return this.updateInfo?.reloadRequired?[{key:"reload-required",kind:"info",dismissible:!1,message:`🔁 Nouvelle version installée (v${this.updateInfo.installedVersion}) : rechargez la page pour l'utiliser. Versions chargées : ${this.updateInfo.loadedBundles||qt}.`,actions:[{label:"Recharger",run:()=>this.reloadPage()}]}]:[]}renderLevelMenu(){const e=this.project.id,t=(s,o)=>f`
      <button
        class="dropdown-item ${o.sub?"sub":""} ${s.id===e?"active":""}"
        @click=${()=>{this.activeDropdown=null,this.persistence.openPlan(s.id)}}
      >
        ${o.icon?f`<span>${o.icon}</span>`:null}
        ${o.levelName?f`<span>${o.levelName}</span>`:null}
        <span class="level-plan-name" title=${s.name}>${s.name}</span>
        ${s.dirty?f`<span class="dirty-dot" title="Modifications non sauvegardées">●</span>`:null}
        ${s.stored?null:f`<span class="dropdown-item-meta">non sauvegardé</span>`}
        ${s.id===e?f`<span class="dropdown-item-check">✓</span>`:null}
      </button>
    `,i=this.persistence.ws.customPlans();return f`
      <div class="dropdown-menu-popup level-menu">
        ${Bt.map(s=>{const o=s.fullLabel!==s.label?`${s.label} (${s.fullLabel})`:s.label,a=this.persistence.ws.plansForCategory(s.id);return a.length===0?f`
              <button
                class="dropdown-item"
                ?disabled=${this.readOnly}
                title="Aucun plan pour ce niveau : un plan vierge sera créé"
                @click=${()=>{this.activeDropdown=null,this.persistence.switchToLevel(s.id)}}
              >
                <span>${s.icon}</span>
                <span>${o}</span>
                <span class="dropdown-item-meta">vide</span>
              </button>
            `:a.length===1?t(a[0],{sub:!1,icon:s.icon,levelName:o}):f`
            <div class="dropdown-group-label"><span>${s.icon}</span><span>${o}</span></div>
            ${a.map(r=>t(r,{sub:!0}))}
          `})}
        ${i.length>0?f`
          <div class="dropdown-divider"></div>
          <div class="dropdown-group-label"><span>${bt.icon}</span><span>Autres plans</span></div>
          ${i.map(s=>t(s,{sub:!0}))}
        `:null}
      </div>
    `}render(){const e=!!this.project.background,t=this.persistence.ws,i=this.persistence.ready,s=t.isDirty(this.project.id),o=t.dirtyIds(),a=o.length,r=this.persistence.isSaving(this.project.id);return f`
      <header class="top-bar">
        <div class="brand" @click=${this.handleLogoClick} style="cursor: pointer;" title="Home Architect Studio (Cliquez pour secret)">
          <span class="brand-icon">
            <svg viewBox="0 0 512 512" width="28" height="28" style="vertical-align: middle; border-radius: 7px; overflow: hidden; box-shadow: 0 2px 8px rgba(56, 189, 248, 0.25);">
              <rect width="512" height="512" rx="108" fill="#0f172a" stroke="#38bdf8" stroke-width="14" />
              <g stroke="rgba(56, 189, 248, 0.15)" stroke-width="6">
                <line x1="0" y1="170" x2="512" y2="170" />
                <line x1="0" y1="340" x2="512" y2="340" />
                <line x1="170" y1="0" x2="170" y2="512" />
                <line x1="340" y1="0" x2="340" y2="512" />
              </g>
              <polygon points="120,310 256,230 392,310 256,390" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" stroke-width="8" stroke-dasharray="8,8" />
              <polygon points="120,310 120,250 256,170 256,230" fill="rgba(15, 23, 42, 0.9)" stroke="#38bdf8" stroke-width="10" stroke-linejoin="round" />
              <polygon points="256,230 256,170 392,250 392,310" fill="rgba(30, 41, 59, 0.9)" stroke="#0284c7" stroke-width="10" stroke-linejoin="round" />
              <polygon points="120,310 120,250 200,298 200,358" fill="rgba(30, 41, 59, 0.9)" stroke="#38bdf8" stroke-width="8" />
              <polygon points="200,358 200,298 256,330 256,390" fill="rgba(15, 23, 42, 0.9)" stroke="#38bdf8" stroke-width="8" />
              <line x1="195" y1="255" x2="235" y2="280" stroke="#f59e0b" stroke-width="5" stroke-dasharray="6,6" />
              <circle cx="195" cy="255" r="14" fill="#f59e0b" stroke="#ffffff" stroke-width="5" />
              <line x1="235" y1="280" x2="295" y2="245" stroke="#38bdf8" stroke-width="5" stroke-dasharray="6,6" />
              <circle cx="235" cy="280" r="18" fill="#06b6d4" stroke="#ffffff" stroke-width="6" />
              <circle cx="295" cy="245" r="14" fill="#38bdf8" stroke="#ffffff" stroke-width="5" />
            </svg>
          </span>
          <span>Home Architect</span>
          <span class="brand-tag">Studio</span>
          <span class="brand-version" title="Version unique du composant">v${qt}</span>
        </div>

        ${this.updateInfo?.available&&!this.readOnly?f`
          <button class="btn-update-auto" @click=${()=>this.openUpdateModal()} title="Nouvelle version ${this.updateInfo.latestVersion} disponible">
            <span>🚀</span>
            <span>Mise à jour dispo</span>
            <span class="update-version-tag">v${this.updateInfo.latestVersion}</span>
          </button>
        `:null}

        <!-- 3 Menus Déroulants Principaux : Fichier, Plan, Pièce -->
        <div style="display: flex; align-items: center; gap: 8px;">
          <!-- 1. Menu Fichier (Ouvrir, Sauvegarder, Importer, Exporter) -->
          <div class="dropdown-menu-wrapper">
            <button class="btn-dropdown-trigger ${this.activeDropdown==="file"?"active":""}" @click=${l=>this.toggleDropdown("file",l)}>
              <span>📁</span>
              <span>Fichier</span>
              <span class="chevron">▾</span>
            </button>
            ${this.activeDropdown==="file"?f`
              <div class="dropdown-menu-popup">
                <button class="dropdown-item" ?disabled=${this.readOnly} @click=${()=>this.openNewPlanModal()}>
                  <span>📄</span>
                  <span>Nouveau plan...</span>
                </button>
                <button class="dropdown-item" @click=${()=>this.openLoadModal()}>
                  <span>📂</span>
                  <span>Ouvrir / Recharger un plan...</span>
                </button>
                <button class="dropdown-item" ?disabled=${this.readOnly||!i} @click=${()=>this.openSaveModal()}>
                  <span>💾</span>
                  <span>Sauvegarder le plan... (Ctrl+S)</span>
                </button>
                ${a>1||a===1&&!s?f`
                  <button class="dropdown-item" ?disabled=${this.readOnly||!i} @click=${()=>{this.saveAllDirty()}}>
                    <span>🗂️</span>
                    <span>Sauvegarder tous les plans modifiés (${a})</span>
                  </button>
                `:null}
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" ?disabled=${this.readOnly} @click=${()=>this.openImportModal()}>
                  <span>📥</span>
                  <span>Importer un plan...</span>
                </button>
                <button class="dropdown-item" @click=${()=>{this.isExportModalOpen=!0,this.activeDropdown=null}}>
                  <span>📤</span>
                  <span>Exporter Lovelace...</span>
                </button>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item danger" ?disabled=${this.readOnly} @click=${()=>this.openResetModal()}>
                  <span>🗑️</span>
                  <span>Effacer le plan (Reset)...</span>
                </button>
              </div>
            `:null}
          </div>

          <!-- 2. Menu Plan (Demande 4: Mettre à l'échelle, Vue 2D/3D, Assistant Pièce, Cotes, etc.) -->
          <div class="dropdown-menu-wrapper">
            <button class="btn-dropdown-trigger ${this.activeDropdown==="plan"?"active":""}" @click=${l=>this.toggleDropdown("plan",l)}>
              <span>📐</span>
              <span>Plan</span>
              <span class="chevron">▾</span>
            </button>
            ${this.activeDropdown==="plan"?f`
              <div class="dropdown-menu-popup" style="min-width: 250px;">
                <button class="dropdown-item ${this.activeTool==="rescale"?"active":""}" ?disabled=${this.readOnly} @click=${()=>{this.activeTool="rescale",this.activeDropdown=null}}>
                  <span>📐</span>
                  <span>Mettre à l'échelle (S)</span>
                  ${this.activeTool==="rescale"?f`<span class="dropdown-item-check">✓</span>`:null}
                </button>
                <button class="dropdown-item ${this.is3DMode?"active":""}" @click=${()=>{this.is3DMode=!this.is3DMode,this.activeDropdown=null}}>
                  <span>${this.is3DMode?"🧊":"📐"}</span>
                  <span>${this.is3DMode?"Vue 3D (Active)":"Vue 2D / 3D"}</span>
                  ${this.is3DMode?f`<span class="dropdown-item-check">✓</span>`:null}
                </button>
                <button class="dropdown-item" ?disabled=${this.readOnly} @click=${()=>this.openWizard()}>
                  <span>🪄</span>
                  <span>Assistant Pièce</span>
                </button>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item ${this.showDimensions?"active":""}" @click=${()=>{this.showDimensions=!this.showDimensions}}>
                  <span>📏</span>
                  <span>Cotes dynamiques</span>
                  ${this.showDimensions?f`<span class="dropdown-item-check">✓</span>`:null}
                </button>
                <button class="dropdown-item ${this.showThermalHeatmap?"active":""}" @click=${()=>{this.showThermalHeatmap=!this.showThermalHeatmap}}>
                  <span>🌡️</span>
                  <span>Carte thermique</span>
                  ${this.showThermalHeatmap?f`<span class="dropdown-item-check">✓</span>`:null}
                </button>
                <button class="dropdown-item ${this.showGhostLevel?"active":""}" @click=${()=>{this.showGhostLevel=!this.showGhostLevel}}>
                  <span>👁️</span>
                  <span>Filigrane niveau inf.</span>
                  ${this.showGhostLevel?f`<span class="dropdown-item-check">✓</span>`:null}
                </button>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" @click=${()=>{this.shadowRoot?.querySelector("home-architect-canvas")?.fitToScreen(),this.activeDropdown=null}}>
                  <span>⛶</span>
                  <span>Ajuster à l'écran (Zoom auto)</span>
                </button>
                <button class="dropdown-item" @click=${()=>{this.shadowRoot?.querySelector("home-architect-canvas")?.rotateQuarterTurn(),this.activeDropdown=null}}>
                  <span>↺</span>
                  <span>Pivoter la vue de 90° à gauche</span>
                </button>
                <button class="dropdown-item ${this.isFullscreen?"active":""}" @click=${()=>{this.toggleFullscreen(),this.activeDropdown=null}}>
                  <span>${this.isFullscreen?"🗗":"⛶"}</span>
                  <span>${this.isFullscreen?"Sortir du plein écran":"Plein écran"}</span>
                  ${this.isFullscreen?f`<span class="dropdown-item-check">✓</span>`:null}
                </button>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item danger" ?disabled=${this.readOnly} @click=${()=>this.openResetModal()}>
                  <span>🗑️</span>
                  <span>Effacer le plan (Reset)...</span>
                </button>
              </div>
            `:null}
          </div>

          <!-- 3. Menu Pièce : plans rangés par niveau (catégorie), puis plans « Autre » -->
          <div class="dropdown-menu-wrapper">
            <button class="btn-dropdown-trigger ${this.activeDropdown==="level"?"active":""}" @click=${l=>this.toggleDropdown("level",l)}>
              <span>🏢</span>
              <span>Pièce : <strong>${$e(this.project.category)}</strong></span>
              <span class="level-plan-name" title=${this.project.name}>${this.project.name}</span>
              ${s?f`<span class="dirty-dot" title="Modifications non sauvegardées">●</span>`:null}
              <span class="chevron">▾</span>
            </button>
            ${this.activeDropdown==="level"?this.renderLevelMenu():null}
          </div>
        </div>

        <div class="top-controls">
          <!-- Historique Annuler / Rétablir -->
          <div class="control-group" style="padding: 2px 4px; gap: 4px;">
            <button 
              class="btn-history" 
              @click=${this.handleUndo} 
              ?disabled=${this.readOnly||!t.canUndo()}
              title="Annuler la dernière action (Ctrl+Z / Cmd+Z)"
            >
              ↩️ Annuler
            </button>
            <button 
              class="btn-history" 
              @click=${this.handleRedo} 
              ?disabled=${this.readOnly||!t.canRedo()}
              title="Rétablir l'action (Ctrl+Y / Cmd+Shift+Z)"
            >
              ↪️ Rétablir
            </button>
          </div>

          <!-- Épaisseur mur contextuelle -->
          ${this.activeTool==="wall"?f`
            <div class="control-group">
              <label>Épaisseur :</label>
              <select @change=${this.handleThicknessChange}>
                <option value="0.10">Cloison 10 cm</option>
                <option value="0.15">Mur 15 cm</option>
                <option value="0.20" selected>Porteur 20 cm</option>
                <option value="0.30">Extérieur 30 cm</option>
              </select>
            </div>
          `:null}

          <!-- Largeur ouvrant contextuelle -->
          ${this.activeTool==="door"||this.activeTool==="window"||this.activeTool==="french_window"?f`
            <div class="control-group">
              <label>Largeur :</label>
              <select @change=${this.handleOpeningWidthChange}>
                <option value="0.73">73 cm (Étroite)</option>
                <option value="0.83">83 cm (Chambre)</option>
                <option value="0.90" selected>90 cm (Standard)</option>
                <option value="1.20">1.20 m (Fenêtre)</option>
                <option value="1.40">1.40 m (Double)</option>
                <option value="2.00">2.00 m (Baie)</option>
                <option value="2.40">2.40 m (Grande baie)</option>
              </select>
            </div>
          `:null}

          <!-- Hauteur sous plafond globale en mode 3D -->
          ${this.is3DMode?f`
            <div class="control-group" title="Hauteur sous plafond par défaut (3D)">
              <label>Plafond 3D :</label>
              <select @change=${l=>this.handleDefaultCeilingChange(parseFloat(l.target.value))}>
                <option value="2.10" ?selected=${(this.project.defaultCeilingHeight||2.5)===2.1}>2.10 m (Sous-sol)</option>
                <option value="2.30" ?selected=${(this.project.defaultCeilingHeight||2.5)===2.3}>2.30 m (Combles)</option>
                <option value="2.50" ?selected=${!this.project.defaultCeilingHeight||this.project.defaultCeilingHeight===2.5}>2.50 m (Standard)</option>
                <option value="2.70" ?selected=${(this.project.defaultCeilingHeight||2.5)===2.7}>2.70 m (Élevé)</option>
                <option value="3.00" ?selected=${(this.project.defaultCeilingHeight||2.5)===3}>3.00 m (Haussmann)</option>
                <option value="3.50" ?selected=${(this.project.defaultCeilingHeight||2.5)===3.5}>3.50 m (Cathédrale)</option>
              </select>
            </div>
          `:null}

          <!-- Opacité du fond -->
          ${e?f`
            <div class="control-group">
              <label>Fond :</label>
              <input 
                type="range" 
                min="0.05" 
                max="1.0" 
                step="0.05" 
                .value=${this.project.background?.opacity||.4}
                @input=${this.handleOpacityChange}
                style="width: 70px;"
                title="Opacité du plan de fond"
              />
            </div>
          `:null}

          <!-- Volet Entités HA -->
          <button 
            class="btn-drawer ${this.isDrawerCollapsed?"":"active"}" 
            @click=${()=>this.isDrawerCollapsed=!this.isDrawerCollapsed}
            title="Afficher / Masquer le volet des entités"
          >
            ⚡ Entités HA (${this.project.bindings.length})
          </button>

          <div class="scale-indicator" title="Échelle : pixels par mètre">
            1 m = ${this.project.pixelsPerMeter} px
          </div>

          <!-- Bouton Plein Écran -->
          <button 
            class="btn-fullscreen ${this.isFullscreen?"active":""}" 
            @click=${()=>this.toggleFullscreen()}
            title="${this.isFullscreen?"Sortir du plein écran (Échap)":"Passer en plein écran"}"
          >
            <span style="font-size: 1.05rem; line-height: 1;">${this.isFullscreen?"🗗":"⛶"}</span>
            <span>${this.isFullscreen?"Sortir du plein écran":"Plein écran"}</span>
          </button>

          <!-- Sauvegarde (indicateur des modifications non sauvegardées) -->
          <button
            class="btn-primary ${s?"is-dirty":""}"
            ?disabled=${this.readOnly||!i||r}
            @click=${this.openSaveModal}
            title=${s?"Modifications non sauvegardées (Ctrl+S / Cmd+S)":"Sauvegarder le plan (Ctrl+S / Cmd+S)"}
          >
            ${r?"⏳ Sauvegarde…":f`💾 Sauvegarder${s?f` <span class="dirty-dot">●</span>`:null}`}
          </button>
        </div>
      </header>

      ${this.persistence.renderBanners(this.updateBanners())}

      <div class="workspace">
        <div class="canvas-area">
          <home-architect-toolbar 
            .activeTool=${this.activeTool}
            .currentThickness=${this.currentThickness}
            .doorFlipSide=${this.doorFlipSide}
            .doorFlipDirection=${this.doorFlipDirection}
            .windowSashCount=${this.windowSashCount}
            .canUndo=${!this.readOnly&&t.canUndo()}
            .canRedo=${!this.readOnly&&t.canRedo()}
            .readOnly=${this.readOnly}
            @undo=${this.handleUndo}
            @redo=${this.handleRedo}
            @tool-selected=${this.handleToolSelected}
            @door-config-changed=${this.handleDoorConfigChanged}
            @window-config-changed=${this.handleWindowConfigChanged}
            @wall-thickness-changed=${this.handleWallThicknessChanged}
            @open-wizard=${()=>this.openWizard()}
            @open-import-modal=${()=>this.openImportModal()}
            @trigger-upload-background=${()=>this.openImportModal()}
          ></home-architect-toolbar>

          <home-architect-canvas
            .hass=${this.hass}
            .project=${this.project}
            .backgroundSrc=${this.persistence.background.src}
            .readOnly=${this.readOnly}
            .activeTool=${this.activeTool}
            .currentWallThickness=${this.currentThickness}
            .currentOpeningWidth=${this.currentOpeningWidth}
            .openingFlipSide=${this.doorFlipSide}
            .openingFlipDirection=${this.doorFlipDirection}
            .windowSashCount=${this.windowSashCount}
            .is3DMode=${this.is3DMode}
            .selectedElements=${this.selectedElements}
            .showDimensions=${this.showDimensions}
            .showThermalHeatmap=${this.showThermalHeatmap}
            .ghostProject=${this.persistence.ghostProject(this.ghostLevel())}
            @selection-changed=${l=>{if(this.selectedElements=l.detail.selectedElements,this.selectedElements.bindingIds.length>0){const c=this.project.bindings.find(u=>u.id===this.selectedElements.bindingIds[0]);if(c){const u=c.entityId.split(".")[0];st[u]&&(this.selectedTypologyTab=u)}this.isIconPickerOpen=!0}}}
            @request-delete-selected=${this.handleDeleteSelected}
            @toggle-3d=${l=>this.is3DMode=l.detail.is3DMode}
            @room-selected=${l=>this.selectedRoomForEdit=l.detail.room}
            @project-changed=${this.handleProjectChanged}
            @request-calibration=${this.handleRequestCalibration}
            @request-rescale=${this.handleRequestRescale}
            @background-image-loaded=${l=>{this.loadBackgroundImage(l.detail.dataUrl,"🖼️ Image de plan glissée-déposée !")}}
          ></home-architect-canvas>

          <!-- Floating HUD de sélection multi-éléments repositionné en bas -->
          ${(()=>{if(!(this.selectedElements.wallIds.length+this.selectedElements.openingIds.length+this.selectedElements.roomIds.length+this.selectedElements.bindingIds.length+(this.selectedElements.furnitureIds?.length||0)>0))return null;const c=this.selectedElements.bindingIds.length>0?this.project.bindings.find(u=>u.id===this.selectedElements.bindingIds[0]):null;return f`
              <div class="selection-hud">
                <div class="selection-hud-main">
                  <span class="selection-info">
                    <span>🎯</span>
                    <span>${this.getSelectedSummary()}</span>
                  </span>

                  ${this.selectedElements.wallIds.length>0?f`
                    <div class="hud-options-group">
                      <span class="hud-label">Épaisseur :</span>
                      <button class="hud-opt-btn ${this.currentThickness===.1?"active":""}" @click=${()=>this.updateSelectedWallsThickness(.1)} title="Cloison 10 cm">Fin 10cm</button>
                      <button class="hud-opt-btn ${this.currentThickness===.2?"active":""}" @click=${()=>this.updateSelectedWallsThickness(.2)} title="Standard 20 cm">Moyen 20cm</button>
                      <button class="hud-opt-btn ${this.currentThickness===.3?"active":""}" @click=${()=>this.updateSelectedWallsThickness(.3)} title="Porteur 30 cm">Gros 30cm</button>
                    </div>
                  `:null}

                  ${this.selectedElements.openingIds.some(u=>this.project.openings.find(d=>d.id===u)?.type==="door")?f`
                    <div class="hud-options-group">
                      <span class="hud-label">Porte :</span>
                      <button class="hud-opt-btn ${!this.doorFlipSide&&this.doorFlipDirection?"active":""}" @click=${()=>this.updateSelectedDoorConfig(!1,!0)} title="Ouverture Droite Intérieure (Poussant Droit)">Droite Int.</button>
                      <button class="hud-opt-btn ${!this.doorFlipSide&&!this.doorFlipDirection?"active":""}" @click=${()=>this.updateSelectedDoorConfig(!1,!1)} title="Ouverture Gauche Intérieure (Poussant Gauche)">Gauche Int.</button>
                      <button class="hud-opt-btn ${this.doorFlipSide&&!this.doorFlipDirection?"active":""}" @click=${()=>this.updateSelectedDoorConfig(!0,!1)} title="Ouverture Gauche Extérieure (Tirant Gauche)">Gauche Ext.</button>
                      <button class="hud-opt-btn ${this.doorFlipSide&&this.doorFlipDirection?"active":""}" @click=${()=>this.updateSelectedDoorConfig(!0,!0)} title="Ouverture Droite Extérieure (Tirant Droit)">Droite Ext.</button>
                    </div>
                  `:null}

                  ${this.selectedElements.openingIds.some(u=>{const d=this.project.openings.find(g=>g.id===u);return d&&(d.type==="window"||d.type==="french_window")})?f`
                    <div class="hud-options-group">
                      <span class="hud-label">Fenêtre :</span>
                      <button class="hud-opt-btn ${this.windowSashCount===1?"active":""}" @click=${()=>this.updateSelectedWindowConfig("window",1,.9)} title="Fenêtre 1 ouvrant (90 cm)">1 Ouvrant</button>
                      <button class="hud-opt-btn ${this.windowSashCount===2?"active":""}" @click=${()=>this.updateSelectedWindowConfig("window",2,1.4)} title="Fenêtre 2 battants (1.40 m)">2 Battants</button>
                      <button class="hud-opt-btn" @click=${()=>this.updateSelectedWindowConfig("french_window",2,2)} title="Baie vitrée coulissante (2.00 m)">Baie vitrée</button>
                    </div>
                  `:null}

                  ${(this.selectedElements.furnitureIds?.length||0)>0?f`
                    <div class="hud-options-group">
                      <span class="hud-label">Meuble :</span>
                      <button class="hud-opt-btn active" @click=${this.rotateSelectedFurniture} title="Pivoter les meubles de 90° (Touche R)">🔄 Pivoter 90° (R)</button>
                    </div>
                  `:null}

                  ${c?f`
                    <div class="hud-options-group">
                      <button 
                        class="hud-opt-btn ${this.isIconPickerOpen?"active":""}" 
                        @click=${()=>this.isIconPickerOpen=!this.isIconPickerOpen}
                        title="Choisir l'icône pour le plan et la card Lovelace"
                      >
                        <span style="font-size: 1.05rem;">${c.icon||"🎨"}</span>
                        <span>Choisir l'icône ${this.isIconPickerOpen?"▴":"▾"}</span>
                      </button>
                    </div>
                  `:null}

                  <button class="btn-delete-selection" ?disabled=${this.readOnly} @click=${this.handleDeleteSelected} title="Supprimer les éléments sélectionnés (Touche Suppr / Retour)">
                    <span>🗑️</span>
                    <span>Supprimer</span>
                  </button>
                  <button class="btn-clear-selection" @click=${this.clearSelection} title="Désélectionner tout (Échap)">
                    ✕
                  </button>
                </div>

                <!-- Onglet / Palette Choisir l'icône pour l'entité sélectionnée -->
                ${c&&this.isIconPickerOpen?f`
                  <div class="hud-icon-picker-panel">
                    <div class="icon-category-tabs">
                      ${Object.entries(st).map(([u,d])=>f`
                        <button 
                          class="icon-category-tab ${this.getActiveTypology()===u?"active":""}"
                          @click=${()=>this.selectedTypologyTab=u}
                        >
                          ${d.tabLabel}
                        </button>
                      `)}
                    </div>

                    <div class="icon-grid">
                      ${(st[this.getActiveTypology()]||st.light).icons.map(u=>f`
                        <button 
                          class="icon-item-btn ${c.icon===u.icon?"active":""}"
                          @click=${()=>this.updateSelectedBindingIcon(u.icon,u.mdi)}
                          title="${u.label} (${u.mdi})"
                        >
                          <span class="icon-item-emoji">${u.icon}</span>
                          <span>${u.label}</span>
                        </button>
                      `)}
                    </div>

                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 0.78rem; color: #94a3b8; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 4px;">
                      <span>Icône active : <strong style="color: #38bdf8;">${c.icon||"Défaut"}</strong> (${c.mdiIcon||"Automatique"})</span>
                      <div style="display: flex; align-items: center; gap: 4px;">
                        <span>Saisie libre :</span>
                        <input 
                          type="text" 
                          style="width: 55px; background: rgba(30, 41, 59, 0.9); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 6px; color: #fff; padding: 2px 4px; font-size: 0.85rem; text-align: center;" 
                          placeholder="Emoji"
                          maxlength="4"
                          @keydown=${u=>{if(u.key==="Enter"){const d=u.target.value.trim();d&&this.updateSelectedBindingIcon(d)}}}
                          @change=${u=>{const d=u.target.value.trim();d&&this.updateSelectedBindingIcon(d)}}
                        />
                      </div>
                    </div>
                  </div>
                `:null}
              </div>
            `})()}

          <!-- Notification Toast -->
          ${this.toastMessage?f`
            <div class="toast-notification">
              ${this.toastMessage}
            </div>
          `:null}
        </div>

        <!-- Volet latéral des entités HA : Toujours visible et docké -->
        <home-architect-entity-drawer
          .hass=${this.hass}
          ?collapsed=${this.isDrawerCollapsed}
          @toggle-collapse=${()=>this.isDrawerCollapsed=!this.isDrawerCollapsed}
        ></home-architect-entity-drawer>
      </div>

      <!-- Modal d'Import Automatisé -->
      ${this.isImportModalOpen?f`
        <home-architect-import-modal
          .currentLevel=${this.activeLevel??ke}
          @import-confirmed=${this.handleImportConfirmed}
          @close=${()=>this.isImportModalOpen=!1}
        ></home-architect-import-modal>
      `:null}

      <!-- Modal Assistant Pièce Débutant -->
      ${this.isWizardOpen?f`
        <home-architect-wizard-modal
          @create-room=${this.handleCreateRoomFromWizard}
          @close=${()=>this.isWizardOpen=!1}
        ></home-architect-wizard-modal>
      `:null}

      <!-- Modal Propriétés de la Pièce (Hauteur sous plafond 3D, etc.) -->
      ${this.selectedRoomForEdit?f`
        <home-architect-room-modal
          .room=${this.selectedRoomForEdit}
          @save-room=${this.handleSaveRoom}
          @delete-room=${this.handleDeleteRoom}
          @close=${()=>this.selectedRoomForEdit=null}
        ></home-architect-room-modal>
      `:null}

      <!-- Modal Étalonnage Mesure de Mur -->
      ${this.isCalibrateModalOpen&&this.calibrationData?f`
        <home-architect-calibrate-modal
          .pixelDistance=${this.calibrationData.pixelDistance}
          .defaultMeters=${this.calibrationData.defaultMeters}
          @calibrate-confirmed=${this.handleCalibrateConfirmed}
          @close=${()=>this.isCalibrateModalOpen=!1}
        ></home-architect-calibrate-modal>
      `:null}

      <!-- Modal Mettre à l'échelle (Recalcul de toutes les cotes) -->
      ${this.isRescaleModalOpen?f`
        <home-architect-rescale-modal
          .measuredMeters=${this.rescaleMeasuredMeters}
          .wallCount=${this.project.walls.length}
          .roomCount=${this.project.rooms.length}
          .openingCount=${this.project.openings.length}
          @rescale-confirmed=${this.handleRescaleConfirmed}
          @close=${()=>this.isRescaleModalOpen=!1}
        ></home-architect-rescale-modal>
      `:null}

      <!-- Modal Exporter vers Lovelace -->
      ${this.isExportModalOpen?f`
        <home-architect-export-modal
          .project=${this.project}
          .hass=${this.hass}
          .backgroundSrc=${this.persistence.background.src}
          .readOnly=${this.readOnly}
          @export-frame-changed=${this.handleExportFrameChanged}
          @project-published=${this.handleProjectPublished}
          @close=${()=>this.isExportModalOpen=!1}
        ></home-architect-export-modal>
      `:null}

      <!-- Modal Sauvegarder & Recharger un Plan -->
      ${this.isSaveLoadModalOpen?f`
        <home-architect-save-load-modal
          .hass=${this.hass}
          .project=${this.project}
          .mode=${this.saveLoadModalTab}
          .readOnly=${this.readOnly}
          .dirtyProjectIds=${o}
          @save-confirmed=${this.handleSaveConfirmed}
          @load-project=${this.handleLoadProject}
          @project-deleted=${l=>this.persistence.projectDeleted(l.detail.projectId,{remote:!1})}
          @close=${()=>this.isSaveLoadModalOpen=!1}
        ></home-architect-save-load-modal>
      `:null}

      <!-- Modal Nouveau Plan -->
      ${this.isNewPlanModalOpen?f`
        <div class="modal-backdrop" @click=${l=>{l.target===l.currentTarget&&(this.isNewPlanModalOpen=!1)}}>
          <div class="modal-dialog">
            <div class="modal-dialog-header">
              <div class="modal-dialog-title-group">
                <span class="modal-dialog-icon">📄</span>
                <div>
                  <h3 class="modal-dialog-title">Nouveau Plan</h3>
                  <p class="modal-dialog-subtitle">Créer une feuille de dessin vierge</p>
                </div>
              </div>
              <button class="btn-dialog-close" @click=${()=>this.isNewPlanModalOpen=!1}>✕</button>
            </div>
            <div class="modal-dialog-body">
              <div class="dialog-form-group">
                <label class="dialog-label">Nom du plan :</label>
                <input
                  type="text"
                  class="dialog-input"
                  .value=${this.newPlanName}
                  @input=${l=>this.newPlanName=l.target.value}
                  placeholder="Ex: Mon Appartement, RDC..."
                  autofocus
                />
              </div>

              <div class="dialog-form-group">
                <label class="dialog-label">Catégorie / Niveau :</label>
                <div class="category-grid">
                  ${[...Bt,bt].map(l=>f`
                    <button
                      type="button"
                      class="category-btn ${this.newPlanCategory===l.id?"active":""}"
                      @click=${()=>this.newPlanCategory=l.id}
                    >
                      <span>${l.icon}</span>
                      <span>${l.label}</span>
                    </button>
                  `)}
                </div>
              </div>
            </div>
            <div class="modal-dialog-footer">
              <button class="btn-dialog-cancel" @click=${()=>this.isNewPlanModalOpen=!1}>Annuler</button>
              <button class="btn-dialog-confirm primary" @click=${()=>{this.handleConfirmNewPlan()}}>
                <span>✨</span>
                <span>Créer le plan</span>
              </button>
            </div>
          </div>
        </div>
      `:null}

      <!-- Modal Effacer le Plan (Reset) -->
      ${this.isResetModalOpen?f`
        <div class="modal-backdrop" @click=${l=>{l.target===l.currentTarget&&(this.isResetModalOpen=!1)}}>
          <div class="modal-dialog danger">
            <div class="modal-dialog-header danger">
              <div class="modal-dialog-title-group">
                <span class="modal-dialog-icon">🗑️</span>
                <div>
                  <h3 class="modal-dialog-title" style="color: #f87171;">Effacer le Plan</h3>
                  <p class="modal-dialog-subtitle">Réinitialisation de l'espace de travail</p>
                </div>
              </div>
              <button class="btn-dialog-close" @click=${()=>this.isResetModalOpen=!1}>✕</button>
            </div>
            <div class="modal-dialog-body">
              <p style="color: #f1f5f9; margin: 0; line-height: 1.5; font-size: 0.92rem;">
                Êtes-vous sûr de vouloir <strong>effacer tout le contenu</strong> du plan actuel
                (<strong>${this.project.name||$e(this.project.category)}</strong>) ?
              </p>

              <div class="reset-summary-box">
                <div>🧱 <strong>Murs :</strong> ${this.project.walls.length}</div>
                <div>🚪 <strong>Ouvrants :</strong> ${this.project.openings.length}</div>
                <div>🏷️ <strong>Pièces :</strong> ${this.project.rooms.length}</div>
                <div>⚡ <strong>Entités HA :</strong> ${this.project.bindings.length}</div>
                <div>🛋️ <strong>Meubles :</strong> ${this.project.furniture?.length||0}</div>
                <div>🖼️ <strong>Image de fond :</strong> ${this.project.background?"Oui":"Non"}</div>
              </div>

              <p style="color: #94a3b8; font-size: 0.8rem; margin: 0;">
                ℹ️ Cette action est réversible avec le bouton Annuler (Ctrl+Z).
              </p>
            </div>
            <div class="modal-dialog-footer">
              <button class="btn-dialog-cancel" @click=${()=>this.isResetModalOpen=!1}>Annuler</button>
              <button class="btn-dialog-confirm danger" @click=${()=>this.handleConfirmResetPlan()}>
                <span>🗑️</span>
                <span>Effacer tout</span>
              </button>
            </div>
          </div>
        </div>
      `:null}

      <!-- Modale Mise à jour (notification seulement : l'installation passe par HA) -->
      ${this.isUpdateModalOpen&&this.updateInfo?.available?Ca(this.updateInfo,a,{onClose:()=>this.closeUpdateModal(),onOpenUpdates:()=>this.openHaUpdates()}):null}

      <!-- Chargement bloquant, opération en cours, copies locales à restaurer, dialogue de choix -->
      ${this.persistence.renderOverlays()}
    `}};gi.styles=[ye`
    :host {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 0;
      bottom: 0;
      left: var(--ha-sidebar-width, 0px);
      right: 0;
      height: 100%;
      max-height: 100%;
      overflow: hidden;
      background: #0f172a;
      color: #f8fafc;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      box-sizing: border-box;
      transition: left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    :host(.is-fullscreen) {
      position: fixed !important;
      inset: 0 !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      max-width: 100vw !important;
      max-height: 100vh !important;
      z-index: 99999 !important;
      transition: none !important;
    }

    :host:fullscreen, :host:-webkit-full-screen {
      width: 100vw !important;
      height: 100vh !important;
      background: #0f172a !important;
    }

    header.top-bar {
      min-height: 56px;
      max-width: 100%;
      background: rgba(30, 41, 59, 0.9);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 14px;
      position: relative;
      z-index: 85;
      flex-shrink: 0;
      overflow: visible;
      box-sizing: border-box;
      gap: 10px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.15rem;
      font-weight: 700;
      color: #f1f5f9;
    }

    .brand-icon {
      font-size: 1.4rem;
    }

    .brand-tag {
      font-size: 0.75rem;
      padding: 2px 8px;
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border-radius: 9999px;
      border: 1px solid rgba(56, 189, 248, 0.3);
      font-weight: 600;
    }

    .brand-version {
      font-size: 0.72rem;
      padding: 2px 7px;
      background: rgba(148, 163, 184, 0.15);
      color: #94a3b8;
      border-radius: 6px;
      font-family: monospace;
      font-weight: 600;
      border: 1px solid rgba(148, 163, 184, 0.25);
    }

    .btn-update-auto {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: linear-gradient(135deg, #f59e0b, #ef4444);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 5px 12px;
      border-radius: 9999px;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 2px 10px rgba(245, 158, 11, 0.45);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      animation: pulse-update-btn 2.2s infinite;
      white-space: nowrap;
    }

    .btn-update-auto:hover {
      transform: translateY(-1px) scale(1.02);
      box-shadow: 0 4px 16px rgba(245, 158, 11, 0.65);
    }

    .btn-update-auto:active {
      transform: translateY(1px);
    }

    .btn-update-auto .update-version-tag {
      background: rgba(255, 255, 255, 0.25);
      padding: 1px 6px;
      border-radius: 6px;
      font-size: 0.72rem;
      font-weight: 800;
    }

    @keyframes pulse-update-btn {
      0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.6); }
      70% { box-shadow: 0 0 0 9px rgba(245, 158, 11, 0); }
      100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
    }

    .top-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .control-group {
      display: flex;
      align-items: center;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 2px 8px;
      gap: 6px;
      font-size: 0.85rem;
    }

    .control-group label {
      color: #94a3b8;
      font-size: 0.8rem;
    }

    select, input[type="range"] {
      background: transparent;
      color: #f8fafc;
      border: none;
      outline: none;
      font-size: 0.85rem;
      cursor: pointer;
    }

    select option {
      background: #1e293b;
      color: #f8fafc;
    }

    button.btn-primary {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #38bdf8;
      border-radius: 8px;
      padding: 6px 14px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    button.btn-primary:hover {
      background: #0369a1;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
    }

    button.btn-import {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.4);
      border-radius: 8px;
      padding: 6px 13px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    button.btn-import:hover {
      background: #10b981;
      color: #ffffff;
      box-shadow: 0 0 14px rgba(16, 185, 129, 0.45);
    }

    button.btn-rescale {
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 8px;
      padding: 6px 13px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    button.btn-rescale:hover, button.btn-rescale.active {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.45);
    }

    button.btn-toggle-option {
      background: rgba(15, 23, 42, 0.6);
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      padding: 6px 11px;
      font-size: 0.83rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.2s ease;
    }

    button.btn-toggle-option:hover {
      background: rgba(51, 65, 85, 0.8);
      color: #f1f5f9;
      border-color: #38bdf8;
    }

    button.btn-toggle-option.active {
      background: rgba(56, 189, 248, 0.18);
      color: #38bdf8;
      border-color: #38bdf8;
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.3);
    }

    button.btn-drawer {
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    button.btn-drawer:hover, button.btn-drawer.active {
      background: #0284c7;
      color: #ffffff;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
    }

    button.btn-3d {
      background: rgba(147, 51, 234, 0.15);
      color: #c084fc;
      border: 1px solid rgba(147, 51, 234, 0.3);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    button.btn-3d.active {
      background: #9333ea;
      color: #ffffff;
      box-shadow: 0 0 12px rgba(192, 132, 252, 0.5);
    }

    button.btn-wizard {
      background: rgba(245, 158, 11, 0.2);
      color: #f59e0b;
      border: 1px solid rgba(245, 158, 11, 0.4);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    button.btn-wizard:hover {
      background: #f59e0b;
      color: #ffffff;
    }

    button.btn-export {
      background: rgba(168, 85, 247, 0.2);
      color: #c084fc;
      border: 1px solid rgba(168, 85, 247, 0.45);
      border-radius: 8px;
      padding: 6px 13px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    button.btn-export:hover {
      background: #9333ea;
      color: #ffffff;
      box-shadow: 0 0 14px rgba(168, 85, 247, 0.5);
    }

    button.btn-fullscreen {
      background: rgba(14, 165, 233, 0.15);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    button.btn-fullscreen:hover {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.45);
    }

    button.btn-fullscreen.active {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border-color: #10b981;
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.35);
    }

    button.btn-fullscreen.active:hover {
      background: #059669;
      color: #ffffff;
      border-color: #34d399;
      box-shadow: 0 0 14px rgba(16, 185, 129, 0.5);
    }

    .workspace {
      flex: 1;
      display: flex;
      flex-direction: row;
      width: 100%;
      height: calc(100% - 56px);
      min-height: 0;
      min-width: 0;
      overflow: hidden;
      position: relative;
      box-sizing: border-box;
      z-index: 1;
    }

    button.btn-history {
      background: rgba(51, 65, 85, 0.6);
      color: #f1f5f9;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 0.84rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    button.btn-history:hover:not(:disabled) {
      background: #0284c7;
      border-color: #38bdf8;
      color: #ffffff;
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.35);
    }

    button.btn-history:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .selection-hud {
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.96);
      backdrop-filter: blur(16px);
      border: 1.5px solid #06b6d4;
      border-radius: 14px;
      padding: 8px 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.65), 0 0 20px rgba(6, 182, 212, 0.35);
      z-index: 60;
      animation: popSelectionBottom 0.2s ease-out;
      max-width: 92vw;
      box-sizing: border-box;
    }

    @keyframes popSelectionBottom {
      from { opacity: 0; transform: translate(-50%, 15px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }

    .selection-hud-main {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
      white-space: nowrap;
    }

    .selection-info {
      font-size: 0.88rem;
      font-weight: 700;
      color: #e2e8f0;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .btn-delete-selection {
      background: #ef4444;
      color: #ffffff;
      border: 1px solid #f87171;
      border-radius: 8px;
      padding: 6px 13px;
      font-size: 0.84rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s ease;
      box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);
    }

    .btn-delete-selection:hover {
      background: #dc2626;
      transform: scale(1.03);
    }

    .btn-clear-selection {
      background: transparent;
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 0.84rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-clear-selection:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .hud-options-group {
      display: flex;
      align-items: center;
      gap: 6px;
      padding-left: 8px;
      border-left: 1px solid rgba(255, 255, 255, 0.15);
    }

    .hud-label {
      font-size: 0.78rem;
      color: #94a3b8;
      font-weight: 600;
    }

    .hud-opt-btn {
      background: rgba(30, 41, 59, 0.8);
      color: #cbd5e1;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .hud-opt-btn:hover {
      background: rgba(56, 189, 248, 0.2);
      border-color: #38bdf8;
      color: #ffffff;
    }

    .hud-opt-btn.active {
      background: #0284c7;
      border-color: #38bdf8;
      color: #ffffff;
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.4);
    }

    /* Panneau Choisir l'icône dans le HUD */
    .hud-icon-picker-panel {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-top: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
      width: 100%;
      max-width: 650px;
      box-sizing: border-box;
    }

    .icon-category-tabs {
      display: flex;
      align-items: center;
      gap: 6px;
      overflow-x: auto;
      scrollbar-width: none;
      padding-bottom: 2px;
      max-width: 100%;
    }

    .icon-category-tabs::-webkit-scrollbar {
      display: none;
    }

    .icon-category-tab {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #94a3b8;
      border-radius: 6px;
      padding: 3px 8px;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }

    .icon-category-tab:hover {
      background: rgba(56, 189, 248, 0.15);
      color: #f1f5f9;
      border-color: #38bdf8;
    }

    .icon-category-tab.active {
      background: #0284c7;
      color: #ffffff;
      border-color: #38bdf8;
    }

    .icon-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      max-height: 140px;
      overflow-y: auto;
      padding: 2px;
      scrollbar-width: thin;
    }

    .icon-item-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(30, 41, 59, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      padding: 4px 8px;
      color: #e2e8f0;
      font-size: 0.78rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .icon-item-btn:hover {
      background: rgba(56, 189, 248, 0.2);
      border-color: #38bdf8;
      color: #ffffff;
      transform: translateY(-1px);
    }

    .icon-item-btn.active {
      background: rgba(6, 182, 212, 0.3);
      border-color: #06b6d4;
      color: #ffffff;
      box-shadow: 0 0 10px rgba(6, 182, 212, 0.4);
      font-weight: 700;
    }

    .icon-item-emoji {
      font-size: 1.15rem;
      line-height: 1;
    }

    /* Menus déroulants barre supérieure */
    .dropdown-menu-wrapper {
      position: relative;
      display: inline-block;
      z-index: 100;
    }

    .btn-dropdown-trigger {
      background: rgba(15, 23, 42, 0.7);
      color: #f1f5f9;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      user-select: none;
      white-space: nowrap;
    }

    .btn-dropdown-trigger:hover, .btn-dropdown-trigger.active {
      background: rgba(56, 189, 248, 0.2);
      border-color: #38bdf8;
      color: #ffffff;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
    }

    .btn-dropdown-trigger .chevron {
      font-size: 0.75rem;
      transition: transform 0.2s ease;
      color: #94a3b8;
    }

    .btn-dropdown-trigger.active .chevron {
      transform: rotate(180deg);
      color: #38bdf8;
    }

    .dropdown-menu-popup {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      background: rgba(15, 23, 42, 0.98);
      backdrop-filter: blur(16px);
      border: 1.5px solid rgba(56, 189, 248, 0.35);
      border-radius: 12px;
      padding: 6px;
      min-width: 220px;
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.65), 0 0 18px rgba(56, 189, 248, 0.25);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 3px;
      animation: popDropdown 0.15s ease-out;
    }

    @keyframes popDropdown {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      border-radius: 8px;
      background: transparent;
      border: none;
      color: #e2e8f0;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      text-align: left;
      width: 100%;
      box-sizing: border-box;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .dropdown-item:hover {
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
    }

    .dropdown-item.active {
      background: rgba(56, 189, 248, 0.25);
      color: #38bdf8;
      font-weight: 700;
    }

    .dropdown-divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 4px 6px;
    }

    .dropdown-item-check {
      margin-left: auto;
      font-size: 0.85rem;
      color: #38bdf8;
      font-weight: 700;
    }

    .canvas-area {
      flex: 1;
      min-width: 0;
      height: 100%;
      position: relative;
      overflow: hidden;
    }

    .level-selector {
      display: flex;
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      overflow: hidden;
    }

    .level-btn {
      padding: 5px 12px;
      font-size: 0.8rem;
      background: transparent;
      color: #94a3b8;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .level-btn.active {
      background: rgba(56, 189, 248, 0.2);
      color: #38bdf8;
      font-weight: 600;
    }

    .scale-indicator {
      font-size: 0.8rem;
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, monospace;
      padding: 2px 6px;
    }

    .toast-notification {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(12px);
      border: 1px solid #38bdf8;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(56, 189, 248, 0.35);
      border-radius: 12px;
      padding: 10px 22px;
      font-size: 0.88rem;
      font-weight: 600;
      color: #f8fafc;
      z-index: 80;
      animation: popToast 0.25s ease-out;
      display: flex;
      align-items: center;
      gap: 10px;
      pointer-events: none;
    }

    @keyframes popToast {
      from { transform: translate(-50%, -12px); opacity: 0; }
      to { transform: translate(-50%, 0); opacity: 1; }
    }

    /* Modales Nouveau Plan & Reset */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 120;
      animation: modalFadeIn 0.2s ease-out;
    }

    @keyframes modalFadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-dialog {
      background: #1e293b;
      border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 16px;
      width: 520px;
      max-width: 92vw;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 30px rgba(56, 189, 248, 0.2);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .modal-dialog.danger {
      border-color: rgba(239, 68, 68, 0.4);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 30px rgba(239, 68, 68, 0.2);
    }

    .modal-dialog-header {
      padding: 16px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(15, 23, 42, 0.6);
    }

    .modal-dialog-header.danger {
      background: rgba(239, 68, 68, 0.08);
      border-bottom-color: rgba(239, 68, 68, 0.2);
    }

    .modal-dialog-title-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .modal-dialog-icon {
      font-size: 1.5rem;
    }

    .modal-dialog-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #f1f5f9;
      margin: 0;
    }

    .modal-dialog-subtitle {
      font-size: 0.8rem;
      color: #94a3b8;
      margin: 2px 0 0 0;
    }

    .btn-dialog-close {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .btn-dialog-close:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    .modal-dialog-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .dialog-form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .dialog-label {
      font-size: 0.84rem;
      font-weight: 600;
      color: #cbd5e1;
    }

    .dialog-input {
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 10px 14px;
      font-size: 0.92rem;
      color: #f8fafc;
      outline: none;
      transition: border-color 0.2s ease;
    }

    .dialog-input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
    }

    .category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 8px;
    }

    .category-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 8px 6px;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: #94a3b8;
      cursor: pointer;
      transition: all 0.15s ease;
      font-size: 0.8rem;
    }

    .category-btn:hover {
      background: rgba(51, 65, 85, 0.5);
      color: #f1f5f9;
    }

    .category-btn.active {
      background: rgba(56, 189, 248, 0.2);
      border-color: #38bdf8;
      color: #38bdf8;
      font-weight: 600;
    }

    .reset-summary-box {
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(239, 68, 68, 0.2);
      border-radius: 10px;
      padding: 12px 16px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      font-size: 0.85rem;
      color: #e2e8f0;
    }

    .modal-dialog-footer {
      padding: 14px 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      background: rgba(15, 23, 42, 0.4);
    }

    .btn-dialog-cancel {
      padding: 8px 16px;
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      color: #cbd5e1;
      font-size: 0.88rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-dialog-cancel:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }

    .btn-dialog-confirm {
      padding: 8px 18px;
      border: none;
      border-radius: 8px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    .btn-dialog-confirm.primary {
      background: #0284c7;
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(2, 132, 199, 0.35);
    }

    .btn-dialog-confirm.primary:hover {
      background: #0369a1;
    }

    .btn-dialog-confirm.danger {
      background: #ef4444;
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.35);
    }

    .btn-dialog-confirm.danger:hover {
      background: #dc2626;
    }

    .dropdown-item.danger:hover {
      background: rgba(239, 68, 68, 0.15);
      color: #f87171;
    }
  `,_a];let P=gi;L([O({type:Object})],P.prototype,"hass");L([O({type:Boolean})],P.prototype,"narrow");L([w()],P.prototype,"activeTool");L([w()],P.prototype,"currentThickness");L([w()],P.prototype,"currentOpeningWidth");L([w()],P.prototype,"doorFlipSide");L([w()],P.prototype,"doorFlipDirection");L([w()],P.prototype,"windowSashCount");L([w()],P.prototype,"showDimensions");L([w()],P.prototype,"showThermalHeatmap");L([w()],P.prototype,"showGhostLevel");L([w()],P.prototype,"is3DMode");L([w()],P.prototype,"isFullscreen");L([w()],P.prototype,"isDrawerCollapsed");L([w()],P.prototype,"isWizardOpen");L([w()],P.prototype,"isImportModalOpen");L([w()],P.prototype,"isExportModalOpen");L([w()],P.prototype,"isSaveLoadModalOpen");L([w()],P.prototype,"isNewPlanModalOpen");L([w()],P.prototype,"newPlanName");L([w()],P.prototype,"newPlanCategory");L([w()],P.prototype,"isResetModalOpen");L([w()],P.prototype,"saveLoadModalTab");L([w()],P.prototype,"isCalibrateModalOpen");L([w()],P.prototype,"calibrationData");L([w()],P.prototype,"isRescaleModalOpen");L([w()],P.prototype,"rescaleMeasuredMeters");L([w()],P.prototype,"selectedRoomForEdit");L([w()],P.prototype,"selectedElements");L([w()],P.prototype,"activeDropdown");L([w()],P.prototype,"selectedTypologyTab");L([w()],P.prototype,"isIconPickerOpen");L([w()],P.prototype,"updateInfo");L([w()],P.prototype,"isUpdateModalOpen");L([w()],P.prototype,"toastMessage");Ae("home-architect-panel",P);wo("panel");
