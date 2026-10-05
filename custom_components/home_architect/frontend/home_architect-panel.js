import{i as Q,n as _,r as p,a as Z,b as c,t as ee,F as xe,S as y,P as fe,d as he,V as de,c as Se}from"./chunks/version-Dl216f42.js";var Ce=Object.defineProperty,Me=Object.getOwnPropertyDescriptor,B=(t,e,i,o)=>{for(var s=o>1?void 0:o?Me(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&Ce(e,i,s),s};let H=class extends Z{constructor(){super(...arguments),this.activeTool="wall",this.canUndo=!1,this.canRedo=!1,this.currentThickness=.2,this.doorFlipSide=!1,this.doorFlipDirection=!0,this.windowSashCount=1,this.position={x:20,y:20},this.isDragging=!1,this.activeSubmenu="none",this.submenuTop=0,this.submenuOnLeft=!1,this.dragStartPointer={x:0,y:0},this.dragStartPosition={x:20,y:20},this.handleWindowPointerDown=t=>{this.activeSubmenu!=="none"&&(t.composedPath().includes(this)||(this.activeSubmenu="none"))}}connectedCallback(){super.connectedCallback();try{const t=localStorage.getItem("home_architect_toolbar_pos");if(t){const e=JSON.parse(t);typeof e.x=="number"&&typeof e.y=="number"&&(this.position=e)}}catch{}this.updateHostPosition(),window.addEventListener("pointerdown",this.handleWindowPointerDown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("pointerdown",this.handleWindowPointerDown)}updated(t){super.updated(t),t.has("position")&&this.updateHostPosition()}updateHostPosition(){this.style.left=`${this.position.x}px`,this.style.top=`${this.position.y}px`}handleDragStart(t){if(t.button!==0)return;t.preventDefault(),t.stopPropagation(),this.isDragging=!0,this.dragStartPointer={x:t.clientX,y:t.clientY},this.dragStartPosition={...this.position},t.currentTarget.setPointerCapture(t.pointerId)}handleDragMove(t){if(!this.isDragging)return;t.preventDefault(),t.stopPropagation();const e=t.clientX-this.dragStartPointer.x,i=t.clientY-this.dragStartPointer.y,s=(this.parentElement||document.body).getBoundingClientRect(),n=this.getBoundingClientRect(),r=8,a=Math.max(r,s.width-n.width-8),d=8,v=Math.max(d,s.height-n.height-8),h=Math.min(Math.max(this.dragStartPosition.x+e,r),a),g=Math.min(Math.max(this.dragStartPosition.y+i,d),v);this.position={x:Math.round(h),y:Math.round(g)},this.updateHostPosition()}handleDragEnd(t){if(this.isDragging){this.isDragging=!1;try{t.currentTarget.releasePointerCapture(t.pointerId)}catch{}try{localStorage.setItem("home_architect_toolbar_pos",JSON.stringify(this.position))}catch{}}}selectTool(t){this.dispatchEvent(new CustomEvent("tool-selected",{detail:{tool:t},bubbles:!0,composed:!0}))}toggleSubmenu(t,e){if(e.stopPropagation(),this.activeSubmenu===t){this.activeSubmenu="none";return}const i=e.currentTarget,o=this.getBoundingClientRect(),s=i.getBoundingClientRect();this.submenuTop=Math.max(0,s.top-o.top-6),this.submenuOnLeft=o.right+320>window.innerWidth,this.activeSubmenu=t}selectDoorOption(t,e){this.doorFlipSide=t,this.doorFlipDirection=e,this.dispatchEvent(new CustomEvent("door-config-changed",{detail:{flipSide:t,flipDirection:e},bubbles:!0,composed:!0})),this.selectTool("door"),this.activeSubmenu="none"}selectWindowOption(t,e,i){this.windowSashCount=e,this.dispatchEvent(new CustomEvent("window-config-changed",{detail:{type:t,sashCount:e,width:i},bubbles:!0,composed:!0})),this.selectTool(t),this.activeSubmenu="none"}selectWallThickness(t){this.currentThickness=t,this.dispatchEvent(new CustomEvent("wall-thickness-changed",{detail:{thickness:t},bubbles:!0,composed:!0})),this.selectTool("wall"),this.activeSubmenu="none"}openWizard(){this.dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,composed:!0}))}openImportModal(){this.dispatchEvent(new CustomEvent("open-import-modal",{bubbles:!0,composed:!0}))}render(){return c`
      <!-- Poignée de déplacement de la boîte à outils -->
      <div 
        class="drag-handle ${this.isDragging?"dragging":""}"
        @pointerdown=${this.handleDragStart}
        @pointermove=${this.handleDragMove}
        @pointerup=${this.handleDragEnd}
        @pointercancel=${this.handleDragEnd}
        title="Glisser pour déplacer la boîte à outils"
      >
        <div class="grip-dots">•••</div>
      </div>

      <!-- Assistant Débutant -->
      <button 
        class="tool-btn highlight" 
        @click=${this.openWizard} 
        title="Assistant Débutant : Créer une pièce guidée (🪄)"
      >
        🪄
      </button>

      <div class="divider"></div>

      <!-- Annuler & Rétablir -->
      <button 
        class="tool-btn" 
        ?disabled=${!this.canUndo}
        @click=${()=>this.dispatchEvent(new CustomEvent("undo",{bubbles:!0,composed:!0}))}
        title="Annuler (Ctrl+Z / Cmd+Z)"
      >
        ↩️
      </button>
      <button 
        class="tool-btn" 
        ?disabled=${!this.canRedo}
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
        title="Sélectionner & Déplacer (V)"
      >
        👆
      </button>

      <!-- Outil Mur -->
      <button 
        class="tool-btn ${this.activeTool==="wall"?"active":""} ${this.activeSubmenu==="wall"?"menu-open":""}" 
        @click=${t=>{this.selectTool("wall"),this.toggleSubmenu("wall",t)}} 
        title="Tracer un mur (W) - Cliquez pour choisir l'épaisseur (Fin 10cm, Moyen 20cm, Gros 30cm)"
      >
        🧱
        <span class="submenu-indicator">▾</span>
      </button>

      <div class="divider"></div>

      <!-- Outil Porte -->
      <button 
        class="tool-btn ${this.activeTool==="door"?"active":""} ${this.activeSubmenu==="door"?"menu-open":""}" 
        @click=${t=>{this.selectTool("door"),this.toggleSubmenu("door",t)}} 
        title="Insérer une porte (D) - Cliquez pour choisir le sens d'ouverture (Droite/Gauche, Intérieur/Extérieur)"
      >
        🚪
        <span class="submenu-indicator">▾</span>
      </button>

      <!-- Outil Fenêtre -->
      <button 
        class="tool-btn ${this.activeTool==="window"?"active":""} ${this.activeSubmenu==="window"?"menu-open":""}" 
        @click=${t=>{this.selectTool("window"),this.toggleSubmenu("window",t)}} 
        title="Insérer une fenêtre - Cliquez pour choisir 1 ouvrant ou 2 battants"
      >
        🪟
        <span class="submenu-indicator">▾</span>
      </button>

      <!-- Outil Baie vitrée / Porte-fenêtre -->
      <button 
        class="tool-btn ${this.activeTool==="french_window"?"active":""}" 
        @click=${()=>{this.activeSubmenu="none",this.selectTool("french_window")}} 
        title="Insérer une baie coulissante"
      >
        🪞
      </button>

      <div class="divider"></div>

      <!-- Import de plan de fond & vectorisation -->
      <button 
        class="tool-btn" 
        @click=${()=>{this.activeSubmenu="none",this.openImportModal()}} 
        title="Importer un plan (PNG/JPG/SVG/PDF) ou Coller directement (Cmd+V / Ctrl+V)"
      >
        🖼️
      </button>

      <!-- Étalonnage d'échelle (calque image) -->
      <button 
        class="tool-btn ${this.activeTool==="calibrate"?"active":""}" 
        @click=${()=>{this.activeSubmenu="none",this.selectTool("calibrate")}} 
        title="Étalonnage d'échelle : tracer un mur mesuré sur l'image (M)"
      >
        📏
      </button>

      <!-- Mettre à l'échelle le plan (Recalculer toutes les cotes) -->
      <button 
        class="tool-btn ${this.activeTool==="rescale"?"active":""}" 
        @click=${()=>{this.activeSubmenu="none",this.selectTool("rescale")}} 
        title="Mettre à l'échelle : mesurer un mur pour recalculer toutes les cotes (S)"
      >
        📐
      </button>

      <!-- ============================================== -->
      <!-- SOUS-MENUS FLYOUT                              -->
      <!-- ============================================== -->

      <!-- Sous-menu Flyout Porte (4 sens d'ouverture) -->
      ${this.activeSubmenu==="door"?c`
        <div class="flyout-menu ${this.submenuOnLeft?"on-left":""}" style="top: ${this.submenuTop}px;" @pointerdown=${t=>t.stopPropagation()}>
          <div class="flyout-header">
            <span class="flyout-title">
              <span>🚪</span>
              <span>Sens d'ouverture de porte</span>
            </span>
            <button class="flyout-close-btn" @click=${()=>this.activeSubmenu="none"}>✕</button>
          </div>

          <!-- 1. Droite Intérieure (Poussant Droit) -->
          <div 
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
            ${!this.doorFlipSide&&this.doorFlipDirection?c`<span class="flyout-item-badge">Actif</span>`:null}
          </div>

          <!-- 2. Gauche Intérieure (Poussant Gauche) -->
          <div 
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
            ${!this.doorFlipSide&&!this.doorFlipDirection?c`<span class="flyout-item-badge">Actif</span>`:null}
          </div>

          <!-- 3. Gauche Extérieure (Tirant Gauche) -->
          <div 
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
            ${this.doorFlipSide&&!this.doorFlipDirection?c`<span class="flyout-item-badge">Actif</span>`:null}
          </div>

          <!-- 4. Droite Extérieure (Tirant Droit) -->
          <div 
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
            ${this.doorFlipSide&&this.doorFlipDirection?c`<span class="flyout-item-badge">Actif</span>`:null}
          </div>
        </div>
      `:null}

      <!-- Sous-menu Flyout Fenêtre (1 ouvrant, 2 battants, baie vitrée) -->
      ${this.activeSubmenu==="window"?c`
        <div class="flyout-menu ${this.submenuOnLeft?"on-left":""}" style="top: ${this.submenuTop}px;" @pointerdown=${t=>t.stopPropagation()}>
          <div class="flyout-header">
            <span class="flyout-title">
              <span>🪟</span>
              <span>Type de fenêtre</span>
            </span>
            <button class="flyout-close-btn" @click=${()=>this.activeSubmenu="none"}>✕</button>
          </div>

          <!-- 1. Fenêtre 1 ouvrant -->
          <div 
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
          </div>

          <!-- 2. Fenêtre 2 battants -->
          <div 
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
          </div>

          <!-- 3. Baie vitrée coulissante -->
          <div 
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
          </div>
        </div>
      `:null}

      <!-- Sous-menu Flyout Mur (Fin, Moyen, Gros) -->
      ${this.activeSubmenu==="wall"?c`
        <div class="flyout-menu ${this.submenuOnLeft?"on-left":""}" style="top: ${this.submenuTop}px;" @pointerdown=${t=>t.stopPropagation()}>
          <div class="flyout-header">
            <span class="flyout-title">
              <span>🧱</span>
              <span>Épaisseur du mur</span>
            </span>
            <button class="flyout-close-btn" @click=${()=>this.activeSubmenu="none"}>✕</button>
          </div>

          <!-- 1. Mur Fin (10 cm) -->
          <div 
            class="flyout-item ${this.currentThickness===.1?"active":""}"
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
          </div>

          <!-- 2. Mur Moyen (20 cm) -->
          <div 
            class="flyout-item ${this.currentThickness===.2?"active":""}"
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
          </div>

          <!-- 3. Mur Gros (30 cm) -->
          <div 
            class="flyout-item ${this.currentThickness===.3?"active":""}"
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
          </div>
        </div>
      `:null}
    `}};H.styles=Q`
    :host {
      position: absolute;
      left: 20px;
      top: 20px;
      display: flex;
      flex-direction: column;
      gap: 5px;
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

    .tool-btn:hover {
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

    .tool-btn.highlight:hover {
      background: #f59e0b;
      color: #ffffff;
    }

    .tool-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
      transform: none !important;
    }

    .divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 3px 2px;
    }

    /* Sous-menu Flyout */
    .flyout-menu {
      position: absolute;
      left: calc(100% + 10px);
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

    .flyout-menu.on-left {
      left: auto;
      right: calc(100% + 10px);
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
  `;B([_({type:String})],H.prototype,"activeTool",2);B([_({type:Boolean})],H.prototype,"canUndo",2);B([_({type:Boolean})],H.prototype,"canRedo",2);B([_({type:Number})],H.prototype,"currentThickness",2);B([_({type:Boolean})],H.prototype,"doorFlipSide",2);B([_({type:Boolean})],H.prototype,"doorFlipDirection",2);B([_({type:Number})],H.prototype,"windowSashCount",2);B([p()],H.prototype,"position",2);B([p()],H.prototype,"isDragging",2);B([p()],H.prototype,"activeSubmenu",2);B([p()],H.prototype,"submenuTop",2);B([p()],H.prototype,"submenuOnLeft",2);H=B([ee("home-architect-toolbar")],H);var Pe=Object.defineProperty,je=Object.getOwnPropertyDescriptor,le=(t,e,i,o)=>{for(var s=o>1?void 0:o?je(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&Pe(e,i,s),s};const ye={light:"💡",switch:"🔌",binary_sensor:"🚨",climate:"🌡️",sensor:"📊",camera:"📷",media_player:"📺",cover:"🪟",fan:"💨",default:"⚡"};let oe=class extends Z{constructor(){super(...arguments),this.collapsed=!1,this.activeTab="entities",this.furnitureCategory="all",this.searchQuery="",this.activeCategory="all"}getEntities(){return this.hass?.states?Object.values(this.hass.states).map(t=>{const e=t.entity_id.split(".")[0],i=ye[e]||ye.default;return{entity_id:t.entity_id,name:t.attributes?.friendly_name||t.entity_id,state:t.state,domain:e,icon:i,unit:t.attributes?.unit_of_measurement}}):[{entity_id:"light.salon_plafonnier",name:"Plafonnier Salon",state:"on",domain:"light",icon:"💡"},{entity_id:"light.applique_cuisine",name:"Applique Cuisine",state:"off",domain:"light",icon:"💡"},{entity_id:"switch.prise_tv",name:"Prise Smart TV",state:"on",domain:"switch",icon:"🔌"},{entity_id:"binary_sensor.porte_entree",name:"Capteur Porte Entrée",state:"off",domain:"binary_sensor",icon:"🚪"},{entity_id:"binary_sensor.presence_salon",name:"Radar Présence Salon",state:"on",domain:"binary_sensor",icon:"🚨"},{entity_id:"climate.thermostat_sejour",name:"Thermostat Séjour",state:"21.5",domain:"climate",icon:"🌡️",unit:"°C"},{entity_id:"sensor.temperature_chambre",name:"Température Chambre",state:"19.8",domain:"sensor",icon:"🌡️",unit:"°C"},{entity_id:"camera.jardin",name:"Caméra Jardin Extérieur",state:"idle",domain:"camera",icon:"📷"}]}handleDragStart(t,e){t.dataTransfer&&(t.dataTransfer.setData("application/json",JSON.stringify({entityId:e.entity_id,domain:e.domain,name:e.name,icon:e.icon})),t.dataTransfer.effectAllowed="copy")}handleFurnitureDragStart(t,e){t.dataTransfer&&(t.dataTransfer.setData("application/json",JSON.stringify({kind:"furniture",furnitureType:e.type})),t.dataTransfer.effectAllowed="copy")}toggleCollapse(){this.dispatchEvent(new CustomEvent("toggle-collapse",{bubbles:!0,composed:!0}))}render(){if(this.collapsed)return null;let e=this.getEntities();if(this.activeCategory!=="all"&&(e=e.filter(o=>o.domain===this.activeCategory)),this.searchQuery.trim()&&this.activeTab==="entities"){const o=this.searchQuery.toLowerCase();e=e.filter(s=>s.name.toLowerCase().includes(o)||s.entity_id.toLowerCase().includes(o))}let i=xe;if(this.furnitureCategory!=="all"&&(i=i.filter(o=>o.category===this.furnitureCategory)),this.searchQuery.trim()&&this.activeTab==="furniture"){const o=this.searchQuery.toLowerCase();i=i.filter(s=>s.name.toLowerCase().includes(o))}return c`
      <div class="drawer-header">
        <div class="drawer-title">
          <span>${this.activeTab==="entities"?"⚡":"🛋️"}</span>
          <span>${this.activeTab==="entities"?"Objets & Domotique":"Meubles & Déco"}</span>
        </div>
        <button class="btn-toggle" @click=${this.toggleCollapse} title="Masquer / Réduire le volet">
          ⇤
        </button>
      </div>

      <div class="drawer-tabs">
        <button 
          class="tab-btn ${this.activeTab==="entities"?"active":""}" 
          @click=${()=>{this.activeTab="entities",this.searchQuery=""}}
        >
          <span>⚡</span>
          <span>Entités HA</span>
          <span class="count-badge">${e.length}</span>
        </button>
        <button 
          class="tab-btn ${this.activeTab==="furniture"?"active":""}" 
          @click=${()=>{this.activeTab="furniture",this.searchQuery=""}}
        >
          <span>🛋️</span>
          <span>Meubles</span>
          <span class="count-badge">${xe.length}</span>
        </button>
      </div>

      ${this.activeTab==="entities"?c`
        <div class="search-section">
          <div class="search-input-wrapper">
            <input 
              type="text" 
              class="search-input" 
              placeholder="Rechercher une entité..."
              .value=${this.searchQuery}
              @input=${o=>this.searchQuery=o.target.value}
            />
          </div>

          <div class="categories-bar">
            <button class="cat-btn ${this.activeCategory==="all"?"active":""}" @click=${()=>this.activeCategory="all"}>Tous</button>
            <button class="cat-btn ${this.activeCategory==="light"?"active":""}" @click=${()=>this.activeCategory="light"}>Lumières</button>
            <button class="cat-btn ${this.activeCategory==="binary_sensor"?"active":""}" @click=${()=>this.activeCategory="binary_sensor"}>Capteurs</button>
            <button class="cat-btn ${this.activeCategory==="climate"?"active":""}" @click=${()=>this.activeCategory="climate"}>Climat</button>
            <button class="cat-btn ${this.activeCategory==="switch"?"active":""}" @click=${()=>this.activeCategory="switch"}>Prises</button>
            <button class="cat-btn ${this.activeCategory==="camera"?"active":""}" @click=${()=>this.activeCategory="camera"}>Caméras</button>
          </div>
        </div>

        <div class="entities-list">
          ${e.length===0?c`
            <div class="empty-message">Aucune entité trouvée</div>
          `:e.map(o=>c`
            <div 
              class="entity-card" 
              draggable="true"
              @dragstart=${s=>this.handleDragStart(s,o)}
              title="Glissez et déposez sur une pièce du plan"
            >
              <div class="entity-info">
                <span class="entity-icon">${o.icon}</span>
                <div class="entity-details">
                  <span class="entity-name">${o.name}</span>
                  <span class="entity-id">${o.entity_id}</span>
                </div>
              </div>

              <span class="entity-state-badge ${o.state==="on"?"state-on":"state-off"}">
                ${o.state}${o.unit?" "+o.unit:""}
              </span>
            </div>
          `)}
        </div>

        <div class="drag-hint">
          <span>👆</span>
          <span>Glissez une entité sur une pièce du plan</span>
        </div>
      `:c`
        <div class="search-section">
          <div class="search-input-wrapper">
            <input 
              type="text" 
              class="search-input" 
              placeholder="Rechercher un meuble..."
              .value=${this.searchQuery}
              @input=${o=>this.searchQuery=o.target.value}
            />
          </div>

          <div class="categories-bar">
            <button class="cat-btn ${this.furnitureCategory==="all"?"active":""}" @click=${()=>this.furnitureCategory="all"}>Tous</button>
            <button class="cat-btn ${this.furnitureCategory==="seating"?"active":""}" @click=${()=>this.furnitureCategory="seating"}>Salon</button>
            <button class="cat-btn ${this.furnitureCategory==="bed"?"active":""}" @click=${()=>this.furnitureCategory="bed"}>Chambre</button>
            <button class="cat-btn ${this.furnitureCategory==="table"?"active":""}" @click=${()=>this.furnitureCategory="table"}>Tables</button>
            <button class="cat-btn ${this.furnitureCategory==="bathroom"?"active":""}" @click=${()=>this.furnitureCategory="bathroom"}>Bains</button>
            <button class="cat-btn ${this.furnitureCategory==="kitchen"?"active":""}" @click=${()=>this.furnitureCategory="kitchen"}>Cuisine</button>
          </div>
        </div>

        <div class="furniture-grid">
          ${i.length===0?c`
            <div class="empty-message" style="grid-column: 1 / -1;">Aucun meuble trouvé</div>
          `:i.map(o=>c`
            <div 
              class="furniture-card" 
              draggable="true"
              @dragstart=${s=>this.handleFurnitureDragStart(s,o)}
              title="Glissez et déposez sur le plan (${o.width.toFixed(2)} × ${o.length.toFixed(2)} m)"
            >
              <span class="furniture-card-icon">${o.icon}</span>
              <span class="furniture-card-name">${o.name}</span>
              <span class="furniture-card-dim">${o.width.toFixed(2)} × ${o.length.toFixed(2)} m</span>
            </div>
          `)}
        </div>

        <div class="drag-hint">
          <span>👆</span>
          <span>Glissez un meuble sur le plan (R pour pivoter)</span>
        </div>
      `}
    `}};oe.styles=Q`
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
  `;le([_({type:Object})],oe.prototype,"hass",2);le([_({type:Boolean,reflect:!0})],oe.prototype,"collapsed",2);le([p()],oe.prototype,"activeTab",2);le([p()],oe.prototype,"furnitureCategory",2);le([p()],oe.prototype,"searchQuery",2);le([p()],oe.prototype,"activeCategory",2);oe=le([ee("home-architect-entity-drawer")],oe);var De=Object.defineProperty,ze=Object.getOwnPropertyDescriptor,ae=(t,e,i,o)=>{for(var s=o>1?void 0:o?ze(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&De(e,i,s),s};const re=[{id:"living",name:"Salon / Séjour",icon:"🛋️",widthMeters:6,lengthMeters:4.5,wallThickness:.2,color:"rgba(56, 189, 248, 0.15)",addDoor:!0,addWindow:!0},{id:"bedroom",name:"Chambre",icon:"🛏️",widthMeters:4,lengthMeters:3.5,wallThickness:.15,color:"rgba(168, 85, 247, 0.15)",addDoor:!0,addWindow:!0},{id:"kitchen",name:"Cuisine",icon:"🍳",widthMeters:4,lengthMeters:3,wallThickness:.15,color:"rgba(234, 179, 8, 0.15)",addDoor:!0,addWindow:!0},{id:"bathroom",name:"Salle de Bains",icon:"🚿",widthMeters:2.5,lengthMeters:2.2,wallThickness:.1,color:"rgba(20, 184, 166, 0.15)",addDoor:!0,addWindow:!1},{id:"office",name:"Bureau",icon:"💼",widthMeters:3.2,lengthMeters:3,wallThickness:.15,color:"rgba(99, 102, 241, 0.15)",addDoor:!0,addWindow:!0},{id:"custom",name:"Sur Mesure",icon:"📐",widthMeters:5,lengthMeters:4,wallThickness:.2,color:"rgba(148, 163, 184, 0.15)",addDoor:!0,addWindow:!0}];let X=class extends Z{constructor(){super(...arguments),this.selectedTemplate=re[0],this.width=re[0].widthMeters,this.length=re[0].lengthMeters,this.thickness=re[0].wallThickness,this.addDoor=re[0].addDoor,this.addWindow=re[0].addWindow,this.roomName=re[0].name,this.height=2.5}selectTemplate(t){this.selectedTemplate=t,this.width=t.widthMeters,this.length=t.lengthMeters,this.thickness=t.wallThickness,this.height=t.heightMeters||2.5,this.addDoor=t.addDoor,this.addWindow=t.addWindow,this.roomName=t.name}handleCreate(){this.dispatchEvent(new CustomEvent("create-room",{detail:{name:this.roomName,width:this.width,length:this.length,thickness:this.thickness,height:this.height,color:this.selectedTemplate.color,icon:this.selectedTemplate.icon,addDoor:this.addDoor,addWindow:this.addWindow},bubbles:!0,composed:!0}))}handleClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){const t=(this.width*this.length).toFixed(1);return c`
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title">
            <span>🪄</span>
            <span>Assistant Création de Pièce</span>
          </div>
          <button class="btn-close" @click=${this.handleClose}>✕</button>
        </div>

        <!-- Gabarits prédéfinis -->
        <div class="templates-grid">
          ${re.map(e=>c`
            <div 
              class="template-card ${this.selectedTemplate.id===e.id?"selected":""}"
              @click=${()=>this.selectTemplate(e)}
            >
              <div class="template-icon">${e.icon}</div>
              <div class="template-name">${e.name}</div>
              <div class="template-dims">${e.widthMeters}m × ${e.lengthMeters}m</div>
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
              .value=${this.roomName}
              @input=${e=>this.roomName=e.target.value}
            />
          </div>

          <div class="field-row">
            <span class="field-label">Dimensions (Largeur × Longueur) :</span>
            <div class="field-inputs">
              <input 
                type="number" 
                step="0.1" 
                min="1" 
                max="30"
                .value=${this.width}
                @input=${e=>this.width=parseFloat(e.target.value)||1}
              />
              <span>m ×</span>
              <input 
                type="number" 
                step="0.1" 
                min="1" 
                max="30"
                .value=${this.length}
                @input=${e=>this.length=parseFloat(e.target.value)||1}
              />
              <span>m</span>
            </div>
          </div>

          <div class="field-row">
            <span class="field-label">Superficie calculée :</span>
            <span class="surface-badge">${t} m²</span>
          </div>

          <div class="field-row">
            <span class="field-label">Hauteur sous plafond (3D) :</span>
            <div class="field-inputs">
              <input 
                type="number" 
                step="0.1" 
                min="1.5" 
                max="10"
                .value=${this.height}
                @input=${e=>this.height=parseFloat(e.target.value)||2.5}
              />
              <span>m</span>
            </div>
          </div>

          <div class="field-row">
            <span class="field-label">Épaisseur des murs :</span>
            <select 
              .value=${this.thickness.toString()}
              @change=${e=>this.thickness=parseFloat(e.target.value)}
            >
              <option value="0.10">Cloison 10 cm</option>
              <option value="0.15">Mur 15 cm</option>
              <option value="0.20">Porteur 20 cm</option>
              <option value="0.30">Extérieur 30 cm</option>
            </select>
          </div>

          <div class="checkboxes-row">
            <label>
              <input 
                type="checkbox" 
                ?checked=${this.addDoor} 
                @change=${e=>this.addDoor=e.target.checked}
              />
              <span>Porte standard (0.90 m)</span>
            </label>

            <label>
              <input 
                type="checkbox" 
                ?checked=${this.addWindow} 
                @change=${e=>this.addWindow=e.target.checked}
              />
              <span>Fenêtre (1.20 m)</span>
            </label>
          </div>
        </div>

        <div class="modal-actions">
          <button class="btn btn-cancel" @click=${this.handleClose}>Annuler</button>
          <button class="btn btn-create" @click=${this.handleCreate}>
            Générer la pièce sur le plan
          </button>
        </div>
      </div>
    `}};X.styles=Q`
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

    input[type="number"], select {
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

    input[type="number"]:focus, select:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);
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

    .btn-create:hover {
      background: #0369a1;
      transform: translateY(-1px);
    }
  `;ae([p()],X.prototype,"selectedTemplate",2);ae([p()],X.prototype,"width",2);ae([p()],X.prototype,"length",2);ae([p()],X.prototype,"thickness",2);ae([p()],X.prototype,"addDoor",2);ae([p()],X.prototype,"addWindow",2);ae([p()],X.prototype,"roomName",2);ae([p()],X.prototype,"height",2);X=ae([ee("home-architect-wizard-modal")],X);var Te=Object.defineProperty,Ee=Object.getOwnPropertyDescriptor,ge=(t,e,i,o)=>{for(var s=o>1?void 0:o?Ee(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&Te(e,i,s),s};const Ie=[{name:"Bleu ciel",color:"rgba(56, 189, 248, 0.18)"},{name:"Violet moderne",color:"rgba(168, 85, 247, 0.18)"},{name:"Ambre chaleureux",color:"rgba(245, 158, 11, 0.18)"},{name:"Émeraude nature",color:"rgba(16, 185, 129, 0.18)"},{name:"Indigo profond",color:"rgba(99, 102, 241, 0.18)"},{name:"Rose pastel",color:"rgba(244, 63, 94, 0.18)"},{name:"Gris ardoise",color:"rgba(148, 163, 184, 0.18)"}],_e=[{label:"2.10 m (Sous-sol)",val:2.1},{label:"2.30 m (Combles)",val:2.3},{label:"2.50 m (Standard)",val:2.5},{label:"2.70 m (Élevé)",val:2.7},{label:"3.00 m (Haussmann)",val:3},{label:"3.50 m (Cathédrale)",val:3.5}];let ne=class extends Z{constructor(){super(...arguments),this.name="",this.height=2.5,this.color="rgba(56, 189, 248, 0.18)"}connectedCallback(){super.connectedCallback(),this.room&&(this.name=this.room.name||"Pièce",this.height=this.room.height||2.5,this.color=this.room.color||"rgba(56, 189, 248, 0.18)")}close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}save(){this.dispatchEvent(new CustomEvent("save-room",{detail:{roomId:this.room.id,name:this.name.trim()||"Pièce",height:Math.max(1,this.height),color:this.color},bubbles:!0,composed:!0}))}deleteRoom(){confirm(`Voulez-vous supprimer la pièce "${this.room.name}" ?`)&&this.dispatchEvent(new CustomEvent("delete-room",{detail:{roomId:this.room.id},bubbles:!0,composed:!0}))}render(){if(!this.room)return null;const t=(this.room.areaM2*this.height).toFixed(1);return c`
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon">${this.room.icon||"🏡"}</span>
            <div>
              <h3 class="modal-title">Propriétés de la pièce</h3>
            </div>
          </div>
          <button class="btn-close" @click=${this.close}>✕</button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Nom de la pièce :</label>
            <input 
              type="text" 
              class="form-input" 
              .value=${this.name} 
              @input=${e=>this.name=e.target.value}
            />
          </div>

          <!-- Hauteur sous plafond 3D -->
          <div class="form-group">
            <label class="form-label">Hauteur sous plafond (Rendu 3D) :</label>
            <div class="height-input-row">
              <input 
                type="number" 
                step="0.05" 
                min="1.0" 
                max="12.0" 
                class="height-input" 
                .value=${this.height}
                @input=${e=>this.height=parseFloat(e.target.value)||2.5}
              />
              <span class="unit-tag">mètres</span>
            </div>

            <!-- Préréglages rapides -->
            <div class="presets-row">
              ${_e.map(e=>c`
                <button 
                  class="preset-pill ${Math.abs(this.height-e.val)<.02?"active":""}"
                  @click=${()=>this.height=e.val}
                >
                  ${e.label}
                </button>
              `)}
            </div>
          </div>

          <!-- Résumé Surface & Volume -->
          <div class="metrics-summary">
            <div class="metric-item">
              <span class="metric-label">Superficie au sol</span>
              <span class="metric-val">${this.room.areaM2.toFixed(1)} m²</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Volume 3D calculé</span>
              <span class="metric-val">${t} m³</span>
            </div>
          </div>

          <!-- Couleur de sol -->
          <div class="form-group">
            <label class="form-label">Couleur d'ambiance du sol :</label>
            <div class="colors-row">
              ${Ie.map(e=>c`
                <div 
                  class="color-swatch ${this.color===e.color?"active":""}" 
                  style="background: ${e.color};"
                  title="${e.name}"
                  @click=${()=>this.color=e.color}
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
            <button class="btn-save" @click=${this.save}>
              💾 Enregistrer
            </button>
          </div>
        </div>
      </div>
    `}};ne.styles=Q`
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

    .btn-save:hover {
      background: #0369a1;
    }
  `;ge([_({type:Object})],ne.prototype,"room",2);ge([p()],ne.prototype,"name",2);ge([p()],ne.prototype,"height",2);ge([p()],ne.prototype,"color",2);ne=ge([ee("home-architect-room-modal")],ne);var Oe=Object.defineProperty,Le=Object.getOwnPropertyDescriptor,ve=(t,e,i,o)=>{for(var s=o>1?void 0:o?Le(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&Oe(e,i,s),s};let pe=class extends Z{constructor(){super(...arguments),this.pixelDistance=200,this.defaultMeters=4,this.realMeters=4}firstUpdated(){this.realMeters=this.defaultMeters}handleApply(){if(this.realMeters<=.05)return;const t=this.pixelDistance/this.realMeters;this.dispatchEvent(new CustomEvent("calibrate-confirmed",{detail:{realMeters:this.realMeters,pixelDistance:this.pixelDistance,pixelsPerMeter:t},bubbles:!0,composed:!0}))}handleClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){const t=(this.pixelDistance/(this.realMeters||1)).toFixed(1);return c`
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
            Distance tracée à l'écran : ${Math.round(this.pixelDistance)} px | Échelle résultante : ${t} px/m
          </div>
        </div>

        <div class="modal-actions">
          <button class="btn btn-cancel" @click=${this.handleClose}>Annuler</button>
          <button class="btn btn-apply" @click=${this.handleApply}>
            Appliquer l'échelle
          </button>
        </div>
      </div>
    `}};pe.styles=Q`
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
  `;ve([_({type:Number})],pe.prototype,"pixelDistance",2);ve([_({type:Number})],pe.prototype,"defaultMeters",2);ve([p()],pe.prototype,"realMeters",2);pe=ve([ee("home-architect-calibrate-modal")],pe);var Fe=Object.defineProperty,Re=Object.getOwnPropertyDescriptor,ce=(t,e,i,o)=>{for(var s=o>1?void 0:o?Re(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&Fe(e,i,s),s};let se=class extends Z{constructor(){super(...arguments),this.measuredMeters=0,this.wallCount=0,this.roomCount=0,this.openingCount=0,this.targetMeters=0,this.adjustBackground=!0}connectedCallback(){super.connectedCallback(),this.targetMeters=this.measuredMeters}handleInputChange(t){const e=parseFloat(t.target.value);this.targetMeters=isNaN(e)?0:e}close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}confirm(){if(this.targetMeters<=0||this.measuredMeters<=0)return;const t=this.targetMeters/this.measuredMeters;this.dispatchEvent(new CustomEvent("rescale-confirmed",{detail:{currentMeters:this.measuredMeters,targetMeters:this.targetMeters,scaleFactor:t,adjustBackground:this.adjustBackground},bubbles:!0,composed:!0}))}render(){const t=this.measuredMeters>0&&this.targetMeters>0?this.targetMeters/this.measuredMeters:1,e=(t-1)*100,i=this.targetMeters>0&&Math.abs(t-1)>1e-4;return c`
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon">📐</span>
            <div>
              <h3 class="modal-title">Mettre à l'échelle le plan</h3>
              <p class="modal-subtitle">Recalcule automatiquement toutes les dimensions et cotes</p>
            </div>
          </div>
          <button class="btn-close" @click=${this.close}>✕</button>
        </div>

        <div class="modal-body">
          <div class="metric-compare">
            <div class="metric-box">
              <span class="metric-label">Cote mesurée actuelle</span>
              <span class="metric-val">${this.measuredMeters.toFixed(2)} m</span>
            </div>
            <div class="metric-box active">
              <span class="metric-label">Nouvelle cote cible</span>
              <span class="metric-val" style="color: #38bdf8;">${this.targetMeters>0?this.targetMeters.toFixed(2):"--"} m</span>
            </div>
          </div>

          <div class="input-group">
            <label class="input-label">Quelle est la taille réelle de ce segment en mètres ?</label>
            <div class="input-row">
              <input 
                type="number" 
                step="0.05" 
                min="0.10" 
                max="500" 
                class="target-input" 
                .value=${this.targetMeters}
                @input=${this.handleInputChange}
                autofocus
              />
              <span class="unit-badge">mètres</span>
            </div>
          </div>

          <div class="ratio-indicator">
            <span style="color: #94a3b8;">Facteur d'ajustement global :</span>
            <span class="ratio-pill ${t>1.001?"ratio-expand":t<.999?"ratio-shrink":"ratio-neutral"}">
              × ${t.toFixed(3)} (${e>=0?"+":""}${e.toFixed(1)}%)
            </span>
          </div>

          <div class="impact-list">
            <div class="impact-item">
              <span class="impact-icon">🧱</span>
              <span><strong>${this.wallCount} murs</strong> : toutes les longueurs et cotes seront recalculées</span>
            </div>
            ${this.openingCount>0?c`
              <div class="impact-item">
                <span class="impact-icon">🚪</span>
                <span><strong>${this.openingCount} ouvertures</strong> : positions ajustées proportionnellement</span>
              </div>
            `:null}
            ${this.roomCount>0?c`
              <div class="impact-item">
                <span class="impact-icon">🏡</span>
                <span><strong>${this.roomCount} pièces</strong> : toutes les surfaces en m² seront actualisées</span>
              </div>
            `:null}
            <div class="impact-item">
              <span class="impact-icon">🖼️</span>
              <span><strong>Calque de fond</strong> : échelle synchronisée pour conserver la superposition</span>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click=${this.close}>Annuler</button>
          <button 
            class="btn-confirm" 
            ?disabled=${!i} 
            @click=${this.confirm}
          >
            <span>📐</span>
            <span>Recalculer toutes les cotes</span>
          </button>
        </div>
      </div>
    `}};se.styles=Q`
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
  `;ce([_({type:Number})],se.prototype,"measuredMeters",2);ce([_({type:Number})],se.prototype,"wallCount",2);ce([_({type:Number})],se.prototype,"roomCount",2);ce([_({type:Number})],se.prototype,"openingCount",2);ce([p()],se.prototype,"targetMeters",2);ce([p()],se.prototype,"adjustBackground",2);se=ce([ee("home-architect-rescale-modal")],se);class J{constructor(e=1,i=0,o=0,s=1,n=0,r=0){this.a=e,this.b=i,this.c=o,this.d=s,this.e=n,this.f=r}static identity(){return new J(1,0,0,1,0,0)}multiply(e){return new J(this.a*e.a+this.c*e.b,this.b*e.a+this.d*e.b,this.a*e.c+this.c*e.d,this.b*e.c+this.d*e.d,this.a*e.e+this.c*e.f+this.e,this.b*e.e+this.d*e.f+this.f)}translate(e,i){return this.multiply(new J(1,0,0,1,e,i))}scale(e,i=e){return this.multiply(new J(e,0,0,i,0,0))}rotate(e){const i=e*Math.PI/180,o=Math.cos(i),s=Math.sin(i);return this.multiply(new J(o,s,-s,o,0,0))}transformPoint(e){return{x:this.a*e.x+this.c*e.y+this.e,y:this.b*e.x+this.d*e.y+this.f}}static parseTransform(e){if(!e)return J.identity();let i=J.identity();const o=/([a-zA-Z]+)\s*\(([^)]+)\)/g;let s;for(;(s=o.exec(e))!==null;){const n=s[1].toLowerCase(),r=s[2].trim().split(/[\s,]+/).map(parseFloat).filter(a=>!isNaN(a));n==="matrix"&&r.length>=6?i=i.multiply(new J(r[0],r[1],r[2],r[3],r[4],r[5])):n==="translate"&&r.length>=1?i=i.translate(r[0],r[1]||0):n==="scale"&&r.length>=1?i=i.scale(r[0],r[1]!==void 0?r[1]:r[0]):n==="rotate"&&r.length>=1&&(r.length>=3?i=i.translate(r[1],r[2]).rotate(r[0]).translate(-r[1],-r[2]):i=i.rotate(r[0]))}return i}}class Ae{static parseSvg(e,i=12,o=.2,s=2.5,n){try{const r={importWalls:!0,importDoors:!0,importWindows:!0,importRooms:!0,importLabels:!0,...n},d=new DOMParser().parseFromString(e,"image/svg+xml"),v=d.querySelector("parsererror");if(v)return{success:!1,walls:[],openings:[],rooms:[],viewBox:{x:0,y:0,width:0,height:0},pixelsPerMeter:50,stats:{wallCount:0,doorCount:0,windowCount:0,roomCount:0,textLabelCount:0,ignoredMeasurementLinesCount:0},error:"Le fichier SVG contient des erreurs XML : "+v.textContent};const h=d.querySelector("svg");if(!h)return{success:!1,walls:[],openings:[],rooms:[],viewBox:{x:0,y:0,width:0,height:0},pixelsPerMeter:50,stats:{wallCount:0,doorCount:0,windowCount:0,roomCount:0,textLabelCount:0,ignoredMeasurementLinesCount:0},error:"Aucune balise <svg> trouvée dans le document."};const g=this.extractViewBox(h),l=g.width>0?g.width:1e3,b=i/l,m=Math.round(l/i*10)/10,f=[],S=[],L=[],M=[];this.traverseElement(h,J.identity(),{segments:f,arcs:S,textLabels:L,polygons:M,defaultThickness:o});const T=f.filter(P=>P.isMeasurementLine).length,x=this.convertSegmentsToWalls(f,g,b,o,s),w=this.detectOpenings(S,f,x,g,b),E=this.detectRooms(M,x,L,g,b,s,r.importLabels!==!1),I=r.importWalls!==!1?x:[],W=w.filter(P=>P.type==="door"?r.importDoors!==!1:r.importWindows!==!1),U=r.importRooms!==!1?E:[];return{success:!0,walls:I,openings:W,rooms:U,viewBox:g,pixelsPerMeter:m||50,stats:{wallCount:x.length,doorCount:w.filter(P=>P.type==="door").length,windowCount:w.filter(P=>P.type==="window"||P.type==="french_window").length,roomCount:E.length,textLabelCount:L.length,ignoredMeasurementLinesCount:T}}}catch(r){return console.error("Erreur lors du parsing SVG:",r),{success:!1,walls:[],openings:[],rooms:[],viewBox:{x:0,y:0,width:0,height:0},pixelsPerMeter:50,stats:{wallCount:0,doorCount:0,windowCount:0,roomCount:0,textLabelCount:0,ignoredMeasurementLinesCount:0},error:`Erreur d'interprétation : ${r.message||String(r)}`}}}static extractViewBox(e){const i=e.getAttribute("viewBox");if(i){const r=i.trim().split(/[\s,]+/).map(parseFloat).filter(a=>!isNaN(a));if(r.length>=4&&r[2]>0&&r[3]>0)return{x:r[0],y:r[1],width:r[2],height:r[3]}}const o=(r,a)=>{if(!r)return a;const d=parseFloat(r);return isNaN(d)?a:r.includes("mm")?d*3.7795:r.includes("cm")?d*37.795:r.includes("in")?d*96:r.includes("pt")?d*1.333:d},s=o(e.getAttribute("width"),1e3),n=o(e.getAttribute("height"),750);return{x:0,y:0,width:s,height:n}}static traverseElement(e,i,o){const s=e.getAttribute("transform"),n=s?i.multiply(J.parseTransform(s)):i,r=e.tagName.toLowerCase(),a=(e.getAttribute("id")||"").toLowerCase(),d=(e.getAttribute("class")||"").toLowerCase(),v=(e.getAttribute("inkscape:label")||"").toLowerCase(),h=(e.closest("g[id]")?.getAttribute("id")||"").toLowerCase(),g=(e.parentElement?.getAttribute("class")||"").toLowerCase(),l=`${a} ${d} ${v} ${h} ${g}`,b=e.getAttribute("stroke-dasharray")||"",m=(e.getAttribute("style")||"").toLowerCase(),f=e.closest("[stroke-dasharray]")?.getAttribute("stroke-dasharray")||"",M=!!b&&b!=="none"&&b!=="0"||/stroke-dasharray\s*:\s*(?!none|0)[\d\s,.]+/i.test(m)||!!f&&f!=="none"&&f!=="0"||/dashed|dotted/.test(m)||/pointill|tirete|dashed|dotted/.test(l)||/dimension|cotation|mesure|cote|measure|guideline|guide|axis|axe|fleche|arrow|marker|tick/i.test(l)||e.hasAttribute("marker-start")||e.hasAttribute("marker-end")||e.closest('g[id*="dimension" i], g[id*="cotation" i], g[id*="cote" i], g[id*="measure" i], g[id*="guide" i]')!==null,T=/door|porte|portillon|swing|battant/.test(l),x=/window|fenetre|vitrage|chassis|baie/.test(l),w=!M&&(/wall|mur|cloison|facade|envelope|structure|enveloppe/.test(l)||!T&&!x),E=/room|piece|espace|zone|area|chambre|salon|cuisine|sdb|sejour/.test(l),I=e.getAttribute("fill")||"",W=e.getAttribute("display"),U=e.getAttribute("visibility");if(!(W==="none"||U==="hidden")){switch(r){case"line":{const P=parseFloat(e.getAttribute("x1")||"0"),O=parseFloat(e.getAttribute("y1")||"0"),z=parseFloat(e.getAttribute("x2")||"0"),u=parseFloat(e.getAttribute("y2")||"0"),C=n.transformPoint({x:P,y:O}),D=n.transformPoint({x:z,y:u});o.segments.push({start:C,end:D,thickness:o.defaultThickness,isWallHint:w&&!M,isWindowHint:x,isDoorHint:T,isMeasurementLine:M});break}case"polyline":case"polygon":{const O=(e.getAttribute("points")||"").trim().split(/[\s,]+/).map(parseFloat).filter(u=>!isNaN(u)),z=[];for(let u=0;u<O.length;u+=2)u+1<O.length&&z.push(n.transformPoint({x:O[u],y:O[u+1]}));if(z.length>=2){for(let u=0;u<z.length-1;u++)o.segments.push({start:z[u],end:z[u+1],thickness:o.defaultThickness,isWallHint:w&&!M,isWindowHint:x,isDoorHint:T,isMeasurementLine:M});r==="polygon"&&z.length>=3&&(o.segments.push({start:z[z.length-1],end:z[0],thickness:o.defaultThickness,isWallHint:w&&!M,isWindowHint:x,isDoorHint:T,isMeasurementLine:M}),M||o.polygons.push({points:z,isRoomHint:E,fill:I}))}break}case"rect":{const P=parseFloat(e.getAttribute("x")||"0"),O=parseFloat(e.getAttribute("y")||"0"),z=parseFloat(e.getAttribute("width")||"0"),u=parseFloat(e.getAttribute("height")||"0");if(z>0&&u>0){const C=n.transformPoint({x:P,y:O}),D=n.transformPoint({x:P+z,y:O}),j=n.transformPoint({x:P+z,y:O+u}),A=n.transformPoint({x:P,y:O+u});if(Math.max(z/u,u/z)>=3&&!M)if(z>u){const V=n.transformPoint({x:P,y:O+u/2}),ie=n.transformPoint({x:P+z,y:O+u/2});o.segments.push({start:V,end:ie,thickness:o.defaultThickness,isWallHint:!0,isWindowHint:x,isDoorHint:T,isMeasurementLine:!1})}else{const V=n.transformPoint({x:P+z/2,y:O}),ie=n.transformPoint({x:P+z/2,y:O+u});o.segments.push({start:V,end:ie,thickness:o.defaultThickness,isWallHint:!0,isWindowHint:x,isDoorHint:T,isMeasurementLine:!1})}else M||(o.polygons.push({points:[C,D,j,A],isRoomHint:E||I!=="none"&&I!=="#000000"&&I!=="black",fill:I}),o.segments.push({start:C,end:D,thickness:o.defaultThickness,isWallHint:w,isWindowHint:x,isDoorHint:T,isMeasurementLine:!1},{start:D,end:j,thickness:o.defaultThickness,isWallHint:w,isWindowHint:x,isDoorHint:T,isMeasurementLine:!1},{start:j,end:A,thickness:o.defaultThickness,isWallHint:w,isWindowHint:x,isDoorHint:T,isMeasurementLine:!1},{start:A,end:C,thickness:o.defaultThickness,isWallHint:w,isWindowHint:x,isDoorHint:T,isMeasurementLine:!1}))}break}case"path":{const P=e.getAttribute("d");P&&this.parsePathData(P,n,o,w&&!M,x,T,M,I);break}case"text":{const P=parseFloat(e.getAttribute("x")||"0"),O=parseFloat(e.getAttribute("y")||"0"),z=e.textContent?.trim()||"",u=/^\d+([.,]\d+)?\s*(m|cm|mm)?$/i.test(z);if(z.length>0&&!u){const C=n.transformPoint({x:P,y:O});o.textLabels.push({text:z,position:C})}break}}for(let P=0;P<e.children.length;P++)this.traverseElement(e.children[P],n,o)}}static parsePathData(e,i,o,s,n,r,a,d){const v=/([a-df-z])|([-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?)/gi,h=[];let g;for(;(g=v.exec(e))!==null;)h.push(g[0]);let l={x:0,y:0},b={x:0,y:0},m=[],f=0,S="";for(;f<h.length;){const L=h[f];/^[a-df-z]$/i.test(L)&&(S=L,f++);const M=S===S.toLowerCase(),T=S.toUpperCase();switch(T){case"M":{const x=parseFloat(h[f++]),w=parseFloat(h[f++]);!isNaN(x)&&!isNaN(w)&&(l=M?{x:l.x+x,y:l.y+w}:{x,y:w},b={...l},m.length>=3&&!a&&o.polygons.push({points:m.map(E=>i.transformPoint(E)),isRoomHint:s?!1:d!=="none"&&d!=="",fill:d}),m=[{...l}]);break}case"L":{const x=parseFloat(h[f++]),w=parseFloat(h[f++]);if(!isNaN(x)&&!isNaN(w)){const E=M?{x:l.x+x,y:l.y+w}:{x,y:w},I=i.transformPoint(l),W=i.transformPoint(E);o.segments.push({start:I,end:W,thickness:o.defaultThickness,isWallHint:s&&!a,isWindowHint:n,isDoorHint:r,isMeasurementLine:a}),l=E,m.push({...l})}break}case"H":{const x=parseFloat(h[f++]);if(!isNaN(x)){const w=M?{x:l.x+x,y:l.y}:{x,y:l.y},E=i.transformPoint(l),I=i.transformPoint(w);o.segments.push({start:E,end:I,thickness:o.defaultThickness,isWallHint:s&&!a,isWindowHint:n,isDoorHint:r,isMeasurementLine:a}),l=w,m.push({...l})}break}case"V":{const x=parseFloat(h[f++]);if(!isNaN(x)){const w=M?{x:l.x,y:l.y+x}:{x:l.x,y:x},E=i.transformPoint(l),I=i.transformPoint(w);o.segments.push({start:E,end:I,thickness:o.defaultThickness,isWallHint:s&&!a,isWindowHint:n,isDoorHint:r,isMeasurementLine:a}),l=w,m.push({...l})}break}case"A":{const x=parseFloat(h[f++]),w=parseFloat(h[f++]);parseFloat(h[f++]),parseFloat(h[f++]);const E=parseFloat(h[f++]),I=parseFloat(h[f++]),W=parseFloat(h[f++]);if(!isNaN(I)&&!isNaN(W)&&!isNaN(x)&&!isNaN(w)){const U=M?{x:l.x+I,y:l.y+W}:{x:I,y:W},P=i.transformPoint(l),O=i.transformPoint(U);o.arcs.push({start:P,end:O,rx:x,ry:w,sweepFlag:E===1,isDoorHint:!0}),l=U,m.push({...l})}break}case"C":case"S":case"Q":case"T":{const x=T==="C"?6:T==="S"||T==="Q"?4:2,w=[];for(let W=0;W<x;W++)w.push(parseFloat(h[f++]));const E=w[w.length-2],I=w[w.length-1];!isNaN(E)&&!isNaN(I)&&(l=M?{x:l.x+E,y:l.y+I}:{x:E,y:I},m.push({...l}));break}case"Z":{if(m.length>=2){const x=i.transformPoint(l),w=i.transformPoint(b);o.segments.push({start:x,end:w,thickness:o.defaultThickness,isWallHint:s&&!a,isWindowHint:n,isDoorHint:r,isMeasurementLine:a})}m.length>=3&&!a&&o.polygons.push({points:m.map(x=>i.transformPoint(x)),isRoomHint:s?!1:d!=="none"&&d!=="",fill:d}),l={...b},m=[];break}default:f++;break}}}static convertSegmentsToWalls(e,i,o,s,n){const r=[];for(const a of e){if(a.isMeasurementLine||a.isDoorHint||a.isWindowHint)continue;const d={x:(a.start.x-i.x)*o,y:(a.start.y-i.y)*o},v={x:(a.end.x-i.x)*o,y:(a.end.y-i.y)*o};y.distance(d,v)<.2||r.push({id:`w_svg_${Date.now()}_${Math.random().toString(36).substr(2,6)}`,start:{x:y.roundMeters(d.x),y:y.roundMeters(d.y)},end:{x:y.roundMeters(v.x),y:y.roundMeters(v.y)},thickness:s,height:n,type:"standard"})}return this.consolidateWalls(r)}static consolidateWalls(e){if(e.length===0)return[];let i=[...e];for(let n=0;n<i.length;n++)for(let r=n+1;r<i.length;r++)for(const a of[i[n].start,i[n].end])for(const d of[i[r].start,i[r].end])y.distance(a,d)<.12&&(d.x=a.x,d.y=a.y);let o=!0,s=0;for(;o&&s<5;){o=!1,s++;for(let n=0;n<i.length;n++){const r=i[n];if(r)for(let a=n+1;a<i.length;a++){const d=i[a];if(!d)continue;const v=r.end.x-r.start.x,h=r.end.y-r.start.y,g=Math.sqrt(v*v+h*h),l=d.end.x-d.start.x,b=d.end.y-d.start.y,m=Math.sqrt(l*l+b*b);if(g===0||m===0)continue;const f=(v*l+h*b)/(g*m);if(Math.abs(f)>.995){if(y.distance(r.end,d.start)<.05){r.end={...d.end},i.splice(a,1),o=!0;break}else if(y.distance(r.end,d.end)<.05){r.end={...d.start},i.splice(a,1),o=!0;break}else if(y.distance(r.start,d.end)<.05){r.start={...d.start},i.splice(a,1),o=!0;break}else if(y.distance(r.start,d.start)<.05){r.start={...d.end},i.splice(a,1),o=!0;break}}}}}return i}static detectOpenings(e,i,o,s,n){const r=[];if(o.length===0)return r;for(const a of e){const d=Math.max(a.rx,a.ry)*n;if(d<.5||d>1.4)continue;const v={x:(a.start.x-s.x)*n,y:(a.start.y-s.y)*n},h={x:(a.end.x-s.x)*n,y:(a.end.y-s.y)*n},g=y.snapPointToWall(v,o,.75),l=y.snapPointToWall(h,o,.75),b=g&&(!l||g.distance<l.distance)?g:l;if(b&&b.distance<.7){const m=y.roundMeters(Math.min(Math.max(d,.73),1.1)),f=y.roundMeters(b.offset);r.some(L=>L.wallId===b.wall.id&&Math.abs(L.offset-f)<.35)||r.push({id:`op_door_${Date.now()}_${Math.random().toString(36).substr(2,6)}`,wallId:b.wall.id,type:"door",offset:f,width:m,flipSide:!1,flipDirection:!1})}}for(const a of i){if(!a.isWindowHint&&!a.isDoorHint||a.isMeasurementLine)continue;const d={x:(a.start.x-s.x)*n,y:(a.start.y-s.y)*n},v={x:(a.end.x-s.x)*n,y:(a.end.y-s.y)*n},h={x:(d.x+v.x)/2,y:(d.y+v.y)/2},g=y.distance(d,v);if(g<.4||g>3)continue;const l=y.snapPointToWall(h,o,.6);if(l&&l.distance<.5){const b=a.isDoorHint?"door":g>1.8?"french_window":"window",m=y.roundMeters(l.offset);r.some(S=>S.wallId===l.wall.id&&Math.abs(S.offset-m)<.35)||r.push({id:`op_${b}_${Date.now()}_${Math.random().toString(36).substr(2,6)}`,wallId:l.wall.id,type:b,offset:m,width:y.roundMeters(g),flipSide:!1,flipDirection:!1})}}return r}static detectRooms(e,i,o,s,n,r,a=!0){const d=[],v=o.map(h=>({text:h.text,position:{x:(h.position.x-s.x)*n,y:(h.position.y-s.y)*n}}));for(const h of e){if(h.points.length<3)continue;const g=h.points.map(S=>({x:y.roundMeters((S.x-s.x)*n),y:y.roundMeters((S.y-s.y)*n)})),l=fe.computeArea(g);if(l<1.5||l>300)continue;let b="";if(a){for(const S of v)if(fe.isPointInPolygon(S.position,g)){b=S.text;break}}if(!b&&!h.isRoomHint)continue;const m=b||`Pièce ${d.length+1}`,f=this.getRoomStyle(m);d.push({id:`room_svg_${Date.now()}_${Math.random().toString(36).substr(2,6)}`,name:m,polygon:g,areaM2:l,color:f.color,icon:f.icon,height:r})}if(d.length===0&&v.length>0&&i.length>=4&&a)for(const h of v){const g=h.text.toLowerCase();if(/salon|sejour|chambre|cuisine|sdb|bain|wc|bureau|entree|garage|couloir/i.test(g)){const l=h.position.x,b=h.position.y,m=1.8,f=[{x:y.roundMeters(l-m),y:y.roundMeters(b-m)},{x:y.roundMeters(l+m),y:y.roundMeters(b-m)},{x:y.roundMeters(l+m),y:y.roundMeters(b+m)},{x:y.roundMeters(l-m),y:y.roundMeters(b+m)}],S=this.getRoomStyle(h.text);d.push({id:`room_svg_${Date.now()}_${Math.random().toString(36).substr(2,6)}`,name:h.text,polygon:f,areaM2:fe.computeArea(f),color:S.color,icon:S.icon,height:r})}}return d}static getRoomStyle(e){const i=e.toLowerCase();return/salon|sejour|living|sam|salle à manger/i.test(i)?{color:"rgba(59, 130, 246, 0.28)",icon:"mdi:sofa"}:/chambre|bed|suite|parentale/i.test(i)?{color:"rgba(139, 92, 246, 0.28)",icon:"mdi:bed"}:/cuisine|kitchen/i.test(i)?{color:"rgba(245, 158, 11, 0.28)",icon:"mdi:silverware-fork-knife"}:/sdb|bain|douche|bath|eau/i.test(i)?{color:"rgba(6, 182, 212, 0.28)",icon:"mdi:shower"}:/wc|toilet/i.test(i)?{color:"rgba(16, 185, 129, 0.28)",icon:"mdi:toilet"}:/bureau|office|travail/i.test(i)?{color:"rgba(99, 102, 241, 0.28)",icon:"mdi:desk"}:/entree|entrée|hall|couloir|degagement|dégagement/i.test(i)?{color:"rgba(100, 116, 139, 0.28)",icon:"mdi:door"}:/garage|atelier/i.test(i)?{color:"rgba(120, 113, 108, 0.28)",icon:"mdi:garage"}:/terrasse|balcon|patio/i.test(i)?{color:"rgba(20, 184, 166, 0.28)",icon:"mdi:balcony"}:{color:"rgba(56, 189, 248, 0.25)",icon:"mdi:home-outline"}}}var Ne=Object.defineProperty,We=Object.getOwnPropertyDescriptor,N=(t,e,i,o)=>{for(var s=o>1?void 0:o?We(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&Ne(e,i,s),s};let R=class extends Z{constructor(){super(...arguments),this.currentLevel="rdc",this.imageDataUrl=null,this.imageWidth=0,this.imageHeight=0,this.imageName="",this.isSvg=!1,this.svgRawText=null,this.svgInterpretResult=null,this.svgImportMode="vectorize",this.keepSvgBackground=!0,this.importOptions={importWalls:!0,importDoors:!0,importWindows:!0,importRooms:!0,importLabels:!0},this.calibrateMode="auto_dimension",this.totalWidthMeters=12,this.opacity=.4,this.isDragOver=!1,this.fileInputRef=null,this._boundPasteListener=null}connectedCallback(){super.connectedCallback(),this._boundPasteListener=this.handleModalPaste.bind(this),window.addEventListener("paste",this._boundPasteListener)}disconnectedCallback(){super.disconnectedCallback(),this._boundPasteListener&&window.removeEventListener("paste",this._boundPasteListener)}handleModalPaste(t){if(!t.clipboardData)return;const e=t.clipboardData.items;for(let o=0;o<e.length;o++)if(e[o].type.indexOf("image")!==-1){const s=e[o].getAsFile();if(s){t.preventDefault(),this.processFile(s);return}}const i=t.clipboardData.getData("text/plain")?.trim();if(i&&(i.startsWith("<svg")||i.startsWith("<?xml")&&i.includes("<svg"))){t.preventDefault(),this.processSvgText(i,"Plan SVG collé depuis le presse-papier");return}}triggerFileInput(){if(!this.fileInputRef){const t=document.createElement("input");t.type="file",t.accept="image/*,.svg",t.style.display="none",t.addEventListener("change",e=>{const i=e.target.files?.[0];i&&this.processFile(i)}),this.fileInputRef=t}this.fileInputRef.click()}processFile(t){if(this.imageName=t.name||"Plan importé",t.type==="image/svg+xml"||t.name.toLowerCase().endsWith(".svg")){const i=new FileReader;i.onload=o=>{const s=o.target?.result;this.processSvgText(s,t.name)},i.readAsText(t)}else{this.isSvg=!1,this.svgRawText=null,this.svgInterpretResult=null;const i=new FileReader;i.onload=o=>{const s=o.target?.result,n=new Image;n.onload=()=>{this.imageDataUrl=s,this.imageWidth=n.naturalWidth,this.imageHeight=n.naturalHeight},n.src=s},i.readAsDataURL(t)}}processSvgText(t,e="Plan SVG importé"){this.imageName=e,this.isSvg=!0,this.svgRawText=t,this.computeSvgInterpretation();const i="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(t);this.imageDataUrl=i;const o=new Image;o.onload=()=>{this.imageWidth=o.naturalWidth||this.svgInterpretResult?.viewBox.width||1e3,this.imageHeight=o.naturalHeight||this.svgInterpretResult?.viewBox.height||750},o.src=i}computeSvgInterpretation(){this.svgRawText&&(this.svgInterpretResult=Ae.parseSvg(this.svgRawText,this.totalWidthMeters,.2,2.5,this.importOptions))}toggleImportCategory(t,e){this.importOptions={...this.importOptions,[t]:e},this.isSvg&&this.computeSvgInterpretation()}handleDimensionChange(t){this.totalWidthMeters=t>0?t:10,this.isSvg&&this.computeSvgInterpretation()}handleDrop(t){if(t.preventDefault(),this.isDragOver=!1,t.dataTransfer?.files&&t.dataTransfer.files.length>0){const e=t.dataTransfer.files[0];this.processFile(e)}}handleDragOver(t){t.preventDefault(),this.isDragOver=!0}handleDragLeave(){this.isDragOver=!1}async handlePasteButtonClick(){try{if(navigator.clipboard&&navigator.clipboard.readText){const t=await navigator.clipboard.readText();if(t&&(t.trim().startsWith("<svg")||t.trim().startsWith("<?xml")&&t.includes("<svg"))){this.processSvgText(t.trim(),"Plan SVG collé");return}}if(navigator.clipboard&&navigator.clipboard.read){const t=await navigator.clipboard.read();for(const e of t){const i=e.types.find(o=>o.startsWith("image/"));if(i){const o=await e.getType(i),s=new File([o],"clipboard_image.png",{type:i});this.processFile(s);return}}}alert("Appuyez directement sur Cmd+V ou Ctrl+V pour coller l'image ou le code SVG de votre plan !")}catch{alert("Appuyez directement sur Cmd+V ou Ctrl+V pour coller votre plan !")}}close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}confirmImport(){if(!this.imageDataUrl)return;const t=this.isSvg&&this.svgImportMode==="vectorize"&&!!this.svgInterpretResult?.success;this.dispatchEvent(new CustomEvent("import-confirmed",{detail:{dataUrl:this.imageDataUrl,widthPx:this.imageWidth||this.svgInterpretResult?.viewBox.width||1e3,heightPx:this.imageHeight||this.svgInterpretResult?.viewBox.height||750,opacity:this.opacity,mode:this.calibrateMode,totalWidthMeters:this.totalWidthMeters,targetLevel:this.currentLevel,isSvgVectorized:t,svgInterpretation:t?this.svgInterpretResult:void 0,keepSvgBackground:this.keepSvgBackground},bubbles:!0,composed:!0}))}render(){const t=this.isSvg&&this.svgImportMode==="vectorize"&&!!this.svgInterpretResult?.success,e=this.svgInterpretResult?.stats;return c`
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
          ${this.imageDataUrl?c`
            <div class="preview-card">
              <img class="preview-thumb" src="${this.imageDataUrl}" alt="Aperçu du plan" />
              <div class="preview-meta">
                <div class="preview-title">
                  <span>✅</span>
                  <span>${this.imageName||"Plan sélectionné"}</span>
                  ${this.isSvg?c`<span class="preview-badge-svg">SVG Vectoriel</span>`:null}
                </div>
                <div class="preview-dimensions">
                  Dimensions du plan : ${this.imageWidth} × ${this.imageHeight} px
                </div>
                <button class="btn-change-image" @click=${this.triggerFileInput}>
                  🔄 Remplacer le fichier
                </button>
              </div>
            </div>
          `:c`
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

              <div class="drop-actions" @click=${i=>i.stopPropagation()}>
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
          ${this.isSvg?c`
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

                    ${e?c`
                      <!-- Sélection granulaire des éléments à importer -->
                      <div class="import-categories-box" @click=${i=>i.stopPropagation()}>
                        <div class="categories-title">Éléments à importer :</div>
                        <div class="categories-grid">
                          <label class="category-toggle ${this.importOptions.importWalls?"active":""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importWalls} 
                              @change=${i=>this.toggleImportCategory("importWalls",i.target.checked)}
                            />
                            <span>🧱 Murs</span>
                            <span class="cat-count">(${e.wallCount})</span>
                          </label>

                          <label class="category-toggle ${this.importOptions.importDoors?"active":""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importDoors} 
                              @change=${i=>this.toggleImportCategory("importDoors",i.target.checked)}
                            />
                            <span>🚪 Portes</span>
                            <span class="cat-count">(${e.doorCount})</span>
                          </label>

                          <label class="category-toggle ${this.importOptions.importWindows?"active":""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importWindows} 
                              @change=${i=>this.toggleImportCategory("importWindows",i.target.checked)}
                            />
                            <span>🪟 Fenêtres</span>
                            <span class="cat-count">(${e.windowCount})</span>
                          </label>

                          <label class="category-toggle ${this.importOptions.importRooms?"active":""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importRooms} 
                              @change=${i=>this.toggleImportCategory("importRooms",i.target.checked)}
                            />
                            <span>🏠 Pièces</span>
                            <span class="cat-count">(${e.roomCount})</span>
                          </label>

                          <label class="category-toggle ${this.importOptions.importLabels?"active":""}">
                            <input 
                              type="checkbox" 
                              .checked=${this.importOptions.importLabels} 
                              @change=${i=>this.toggleImportCategory("importLabels",i.target.checked)}
                            />
                            <span>🏷️ Noms</span>
                            <span class="cat-count">(${e.textLabelCount})</span>
                          </label>
                        </div>

                        ${e.ignoredMeasurementLinesCount>0?c`
                          <div class="ignored-note">
                            ℹ️ ${e.ignoredMeasurementLinesCount} ligne(s) de cotation / pointillés ont été automatiquement ignorées (non transformées en murs).
                          </div>
                        `:null}
                      </div>
                    `:null}

                    <div class="checkbox-wrap" @click=${i=>i.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        id="chk_keep_bg"
                        .checked=${this.keepSvgBackground} 
                        @change=${i=>this.keepSvgBackground=i.target.checked}
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

                  ${this.calibrateMode==="auto_dimension"?c`
                    <div class="input-row" @click=${i=>i.stopPropagation()}>
                      <label style="font-size: 0.82rem; color: #94a3b8;">Largeur totale estimée :</label>
                      <input 
                        type="number" 
                        step="0.5" 
                        min="1" 
                        max="100" 
                        class="dimension-input"
                        .value=${this.totalWidthMeters}
                        @input=${i=>this.handleDimensionChange(parseFloat(i.target.value))}
                      />
                      <span class="unit-tag">mètres</span>
                    </div>
                  `:null}
                </div>
              </div>

              <!-- Option B : Tracé manuel assisté sur un mur (si pas vectorisé) -->
              ${t?null:c`
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
          ${!t||this.keepSvgBackground?c`
            <div class="slider-row">
              <span class="slider-label">Opacité du fond :</span>
              <input 
                type="range" 
                class="slider-input" 
                min="0.05" 
                max="1.0" 
                step="0.05"
                .value=${this.opacity}
                @input=${i=>this.opacity=parseFloat(i.target.value)}
              />
              <span class="slider-val">${Math.round(this.opacity*100)}%</span>
            </div>
          `:null}
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click=${this.close}>Annuler</button>
          <button 
            class="btn-confirm ${t?"btn-magic":""}" 
            ?disabled=${!this.imageDataUrl} 
            @click=${this.confirmImport}
          >
            ${t?c`
              <span>✨</span>
              <span>Convertir le plan SVG (${e?.wallCount||0} murs)</span>
            `:c`
              <span>🚀</span>
              <span>Charger le plan</span>
            `}
          </button>
        </div>
      </div>
    `}};R.styles=Q`
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
  `;N([_({type:String})],R.prototype,"currentLevel",2);N([p()],R.prototype,"imageDataUrl",2);N([p()],R.prototype,"imageWidth",2);N([p()],R.prototype,"imageHeight",2);N([p()],R.prototype,"imageName",2);N([p()],R.prototype,"isSvg",2);N([p()],R.prototype,"svgRawText",2);N([p()],R.prototype,"svgInterpretResult",2);N([p()],R.prototype,"svgImportMode",2);N([p()],R.prototype,"keepSvgBackground",2);N([p()],R.prototype,"importOptions",2);N([p()],R.prototype,"calibrateMode",2);N([p()],R.prototype,"totalWidthMeters",2);N([p()],R.prototype,"opacity",2);N([p()],R.prototype,"isDragOver",2);R=N([ee("home-architect-import-modal")],R);const we={"💡":"mdi:lightbulb","🛋️":"mdi:lamp","🛋":"mdi:wall-sconce-flat","🌟":"mdi:ceiling-light","🔆":"mdi:ceiling-light-outline","🏮":"mdi:outdoor-lamp","🕯️":"mdi:candle","🔦":"mdi:spotlight-beam","🪩":"mdi:led-strip-variant","✨":"mdi:string-lights","🔌":"mdi:power-socket-fr","⚡":"mdi:toggle-switch","📺":"mdi:television","☕":"mdi:coffee-maker","💻":"mdi:laptop","🔊":"mdi:speaker","🖨️":"mdi:printer","🎮":"mdi:gamepad-variant","🔋":"mdi:battery-charging","🪭":"mdi:fan","🚶":"mdi:motion-sensor","🏃":"mdi:walk","👁️":"mdi:radar","🚪":"mdi:door","🪟":"mdi:window-closed","🚗":"mdi:garage","🚨":"mdi:alarm-light","🔔":"mdi:doorbell","🐾":"mdi:paw","💧":"mdi:water-alert","🔥":"mdi:smoke-detector","📬":"mdi:mailbox","🌡️":"mdi:thermometer","☀️":"mdi:weather-sunny","💨":"mdi:air-filter","❄️":"mdi:air-conditioner","♨️":"mdi:water-boiler","⛺":"mdi:awning","↕️":"mdi:arrow-up-down","📻":"mdi:speaker","🎵":"mdi:music","🎬":"mdi:projector","📷":"mdi:camera","📹":"mdi:cctv","🎥":"mdi:video","🌀":"mdi:fan-chevron-up","🌪️":"mdi:ceiling-fan","🤖":"mdi:robot-vacuum","🧹":"mdi:broom","🔒":"mdi:lock","🛡️":"mdi:shield-home","🗝️":"mdi:key"};function He(t,e){return t.mdiIcon?t.mdiIcon:t.icon&&we[t.icon]?we[t.icon]:t.icon&&t.icon.startsWith("mdi:")?t.icon:e}function Y(t){return JSON.stringify(t??"")}function qe(t){return(t??"").replace(/[\r\n]+/g," ").replace(/[#]/g,"")}class ke{static generatePictureElementsYaml(e,i){let o=i?.imagePath||`/local/plan_${e.id||"rdc"}.svg`;if(i?.embedDataUri&&i?.svgContent)try{const d=new TextEncoder().encode(i.svgContent);let v="";for(let h=0;h<d.length;h++)v+=String.fromCharCode(d[h]);o=`data:image/svg+xml;base64,${btoa(v)}`}catch{o=i.imagePath||`/local/plan_${e.id||"rdc"}.svg`}const s={title:e.name||"Plan Interactif",...i,imagePath:o},n=he.calculateBoundingBox(e),r=e.bindings||[];let a=`# ========================================================
`;if(a+=`# CARTE LOVELACE PICTURE-ELEMENTS (NATIVE HOME ASSISTANT)
`,a+=`# Générée automatiquement par DomoLink Plan / Home Architect
`,a+=`# ========================================================
`,a+=`type: picture-elements
`,a+=`title: ${Y(s.title)}
`,a+=`image: ${Y(s.imagePath)}
`,a+=`elements:
`,r.length===0)return a+=`  # Aucune entité liée pour le moment. Glissez-déposez des entités sur le plan !
`,a;for(const d of r){const v=d.position||{x:0,y:0},{left:h,top:g}=he.worldToPercentage(v,n),l=d.entityId||"sensor.unknown",b=l.split("."),m=b[0]||"sensor",f=(b[1]||"entity").replace(/_/g," "),S=d.customName||f,L=qe(S),M=He(d);if(m==="light")a+=`  # 💡 Lumière : ${L}
`,a+=`  - type: state-icon
`,a+=`    entity: ${l}
`,M&&(a+=`    icon: ${M}
`),a+=`    title: ${Y(S)}
`,a+=`    tap_action:
`,a+=`      action: toggle
`,a+=`    hold_action:
`,a+=`      action: more-info
`,a+=`    style:
`,a+=`      top: ${g}%
`,a+=`      left: ${h}%
`,a+=`      transform: translate(-50%, -50%)
`,a+=`      --paper-item-icon-active-color: "#facc15"
`,a+=`      --paper-item-icon-color: "#94a3b8"

`;else if(m==="binary_sensor"){const T=l.includes("presence")||l.includes("occupancy")||l.includes("radar")||l.includes("motion")||l.includes("mouvement");a+=`  # 📡 ${T?"Radar de Présence":"Capteur"} : ${L}
`,a+=`  - type: state-icon
`,a+=`    entity: ${l}
`,M&&(a+=`    icon: ${M}
`),a+=`    title: ${Y(S)}
`,a+=`    tap_action:
`,a+=`      action: more-info
`,a+=`    style:
`,a+=`      top: ${g}%
`,a+=`      left: ${h}%
`,a+=`      transform: translate(-50%, -50%)
`,a+=`      --paper-item-icon-active-color: "#ef4444"
`,a+=`      --paper-item-icon-color: "#10b981"

`}else if(m==="sensor"){const T=l.includes("temp")||l.includes("temperature");a+=`  # ${T?"🌡️ Température":"📊 Capteur"} : ${L}
`,a+=`  - type: state-label
`,a+=`    entity: ${l}
`,a+=`    title: ${Y(S)}
`,a+=`    tap_action:
`,a+=`      action: more-info
`,a+=`    style:
`,a+=`      top: ${g}%
`,a+=`      left: ${h}%
`,a+=`      transform: translate(-50%, -50%)
`,a+=`      background: "rgba(15, 23, 42, 0.85)"
`,a+=`      border: "1px solid rgba(56, 189, 248, 0.5)"
`,a+=`      border-radius: "8px"
`,a+=`      padding: "2px 8px"
`,a+=`      font-size: "11px"
`,a+=`      font-weight: "700"
`,a+=`      color: "#38bdf8"
`,a+=`      backdrop-filter: "blur(6px)"

`}else m==="climate"?(a+=`  # ❄️ Climatisation / Thermostat : ${L}
`,a+=`  - type: state-label
`,a+=`    entity: ${l}
`,a+=`    attribute: current_temperature
`,a+=`    suffix: "°C"
`,a+=`    title: ${Y(S)}
`,a+=`    tap_action:
`,a+=`      action: more-info
`,a+=`    style:
`,a+=`      top: ${g}%
`,a+=`      left: ${h}%
`,a+=`      transform: translate(-50%, -50%)
`,a+=`      background: "rgba(15, 23, 42, 0.85)"
`,a+=`      border: "1px solid rgba(245, 158, 11, 0.5)"
`,a+=`      border-radius: "8px"
`,a+=`      padding: "2px 8px"
`,a+=`      font-size: "11px"
`,a+=`      font-weight: "700"
`,a+=`      color: "#f59e0b"
`,a+=`      backdrop-filter: "blur(6px)"

`):m==="switch"?(a+=`  # 🔌 Interrupteur / Prise : ${L}
`,a+=`  - type: state-icon
`,a+=`    entity: ${l}
`,M&&(a+=`    icon: ${M}
`),a+=`    title: ${Y(S)}
`,a+=`    tap_action:
`,a+=`      action: toggle
`,a+=`    hold_action:
`,a+=`      action: more-info
`,a+=`    style:
`,a+=`      top: ${g}%
`,a+=`      left: ${h}%
`,a+=`      transform: translate(-50%, -50%)
`,a+=`      --paper-item-icon-active-color: "#38bdf8"
`,a+=`      --paper-item-icon-color: "#64748b"

`):(a+=`  # ⚡ Entité : ${L}
`,a+=`  - type: state-icon
`,a+=`    entity: ${l}
`,M&&(a+=`    icon: ${M}
`),a+=`    title: ${Y(S)}
`,a+=`    tap_action:
`,a+=`      action: more-info
`,a+=`    style:
`,a+=`      top: ${g}%
`,a+=`      left: ${h}%
`,a+=`      transform: translate(-50%, -50%)

`)}return a}static generateHomeArchitectCardYaml(e,i){const o={viewMode:"2d",title:e.name||"Plan de Maison",height:"520px",...i};let s=`# ========================================================
`;return s+=`# CARTE LOVELACE PERSONNALISÉE (HOME ARCHITECT CARD)
`,s+=`# Rendu vectoriel direct 2D / 3D, états et clics en direct
`,s+=`# ========================================================
`,s+=`type: custom:home-architect-card
`,s+=`project_id: ${Y(e.id||"rdc")}
`,s+=`title: ${Y(o.title)}
`,s+=`view_mode: ${o.viewMode||"2d"} # '2d' ou '3d'
`,s+=`show_header: true
`,s+=`height: ${Y(o.height)}
`,s}}var Be=Object.defineProperty,Ue=Object.getOwnPropertyDescriptor,te=(t,e,i,o)=>{for(var s=o>1?void 0:o?Ue(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&Be(e,i,s),s};let G=class extends Z{constructor(){super(...arguments),this.activeTab="picture_elements",this.imagePath="",this.customCardViewMode="2d",this.copiedToast=!1,this.syncStatus="idle",this.syncErrorMsg="",this.embedDataUri=!1}connectedCallback(){super.connectedCallback(),this.imagePath=`/local/plan_${this.project?.id||"rdc"}.svg`,this.autoSyncSvg()}async autoSyncSvg(){if(!this.hass?.callWS){this.syncStatus="idle";return}this.syncStatus="syncing";try{const t=he.exportToSvg(this.project,{includeRooms:!0,includeWalls:!0,includeOpenings:!0,includeFurniture:!0,includeRoomLabels:!0,includeEntityMarkers:!1,includeBackground:!0,backgroundColor:"#0f172a"}),e=`plan_${this.project?.id||"rdc"}.svg`,i=await this.hass.callWS({type:"home_architect/save_svg_to_www",filename:e,svg_content:t});i&&i.success?this.syncStatus="success":(this.syncStatus="error",this.syncErrorMsg="Erreur lors de la sauvegarde sur le serveur")}catch(t){console.warn("Home Architect auto-sync to www failed:",t),this.syncStatus="error",this.syncErrorMsg=t?.message||String(t)}}handleClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}copyCode(t){const e=()=>{this.copiedToast=!0,setTimeout(()=>{this.copiedToast=!1},2500)};navigator.clipboard&&typeof navigator.clipboard.writeText=="function"?navigator.clipboard.writeText(t).then(e).catch(i=>{console.warn("navigator.clipboard.writeText rejected, attempting fallback:",i),this.copyFallback(t,e)}):this.copyFallback(t,e)}copyFallback(t,e){try{const i=document.createElement("textarea");i.value=t,i.style.position="fixed",i.style.top="0",i.style.left="0",i.style.width="2em",i.style.height="2em",i.style.padding="0",i.style.border="none",i.style.outline="none",i.style.boxShadow="none",i.style.background="transparent",i.style.opacity="0",document.body.appendChild(i),i.focus(),i.select();const o=document.execCommand("copy");document.body.removeChild(i),o?e():prompt("Copiez le code YAML ci-dessous :",t)}catch(i){console.error("Fallback copy failed:",i),prompt("Copiez le code YAML ci-dessous :",t)}}downloadSvg(){const t=he.exportToSvg(this.project,{includeRooms:!0,includeWalls:!0,includeOpenings:!0,includeFurniture:!0,includeRoomLabels:!0,includeEntityMarkers:!1,includeBackground:!0,backgroundColor:"#0f172a"}),e=new Blob([t],{type:"image/svg+xml;charset=utf-8"}),i=URL.createObjectURL(e),o=document.createElement("a");o.href=i,o.download=`plan_${this.project.id||"rdc"}.svg`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i)}downloadJson(){const t=JSON.stringify(this.project,null,2),e=new Blob([t],{type:"application/json;charset=utf-8"}),i=URL.createObjectURL(e),o=document.createElement("a");o.href=i,o.download=`projet_plan_${this.project.id||"rdc"}.json`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i)}getEntitySummary(){const t=this.project?.bindings||[],e=t.filter(a=>a.entityId.startsWith("light.")).length,i=t.filter(a=>a.entityId.startsWith("binary_sensor.")).length,o=t.filter(a=>a.entityId.startsWith("sensor.")||a.entityId.startsWith("climate.")).length,s=t.filter(a=>a.entityId.startsWith("switch.")).length,n=this.project?.rooms?.length||0,r=this.project?.furniture?.length||0;return{lights:e,radars:i,sensors:o,switches:s,rooms:n,furniture:r,total:t.length}}render(){const t=this.getEntitySummary(),e=he.exportToSvg(this.project,{includeRooms:!0,includeWalls:!0,includeOpenings:!0,includeFurniture:!0,includeRoomLabels:!0,includeEntityMarkers:!1,includeBackground:!0,backgroundColor:"#0f172a"}),i=ke.generatePictureElementsYaml(this.project,{imagePath:this.imagePath,title:this.project.name||"Plan Interactif",embedDataUri:this.embedDataUri,svgContent:e}),o=ke.generateHomeArchitectCardYaml(this.project,{viewMode:this.customCardViewMode,title:this.project.name||"Plan de Maison"});return c`
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
          <button class="btn-close" @click=${this.handleClose} title="Fermer">✕</button>
        </div>

        <!-- Onglets -->
        <div class="tabs-nav">
          <button 
            class="tab-btn ${this.activeTab==="picture_elements"?"active":""}"
            @click=${()=>this.activeTab="picture_elements"}
          >
            <span>🖼️</span>
            <span>Carte Picture-Elements (Native)</span>
          </button>

          <button 
            class="tab-btn ${this.activeTab==="custom_card"?"active":""}"
            @click=${()=>this.activeTab="custom_card"}
          >
            <span>🧊</span>
            <span>Carte 2D/3D (Intégrée)</span>
          </button>

          <button 
            class="tab-btn ${this.activeTab==="raw_files"?"active":""}"
            @click=${()=>this.activeTab="raw_files"}
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
              <span><strong>${t.rooms}</strong> pièces</span>
            </div>
            <div class="stat-badge">
              <span>💡</span>
              <span><strong>${t.lights}</strong> lumière(s)</span>
            </div>
            <div class="stat-badge">
              <span>📡</span>
              <span><strong>${t.radars}</strong> radar(s) / présence</span>
            </div>
            <div class="stat-badge">
              <span>🌡️</span>
              <span><strong>${t.sensors}</strong> capteur(s) / temp.</span>
            </div>
            <div class="stat-badge">
              <span>🔌</span>
              <span><strong>${t.switches}</strong> prise(s) / switch</span>
            </div>
            ${t.furniture>0?c`
              <div class="stat-badge">
                <span>🛋️</span>
                <span><strong>${t.furniture}</strong> meuble(s)</span>
              </div>
            `:""}
          </div>

          <!-- Onglet 1 : Carte Native picture-elements -->
          ${this.activeTab==="picture_elements"?c`
            <!-- Bannière de synchronisation avec HA -->
            ${this.syncStatus==="success"?c`
              <div class="sync-banner success">
                <span class="sync-icon">✅</span>
                <div class="sync-text">
                  <div class="sync-title">Plan synchronisé directement sur votre serveur Home Assistant !</div>
                  <div class="sync-desc">
                    Le fichier vectoriel avec ses dimensions calibrées est écrit dans <code>/config/www/plan_${this.project?.id||"rdc"}.svg</code>.<br/>
                    Accessible immédiatement par Lovelace via <code>${this.imagePath}</code>. Aucun transfert de fichier requis !
                  </div>
                </div>
                <button class="btn-refresh-sync" @click=${this.autoSyncSvg} title="Mettre à jour le fichier SVG sur le serveur">
                  🔄 Re-synchroniser
                </button>
              </div>
            `:this.syncStatus==="syncing"?c`
              <div class="sync-banner syncing">
                <span class="sync-icon">⏳</span>
                <div class="sync-text">
                  <div class="sync-title">Synchronisation automatique en cours avec Home Assistant...</div>
                  <div class="sync-desc">Enregistrement direct dans <code>/config/www/plan_${this.project?.id||"rdc"}.svg</code>.</div>
                </div>
              </div>
            `:this.syncStatus==="error"?c`
              <div class="sync-banner error">
                <span class="sync-icon">⚠️</span>
                <div class="sync-text">
                  <div class="sync-title">Synchronisation automatique impossible (${this.syncErrorMsg||"erreur"})</div>
                  <div class="sync-desc">
                    Vous pouvez cocher l'option <strong>"Embarquer en Data-URI"</strong> ci-dessous, ou télécharger le fichier SVG et le déposer dans <code>/config/www/</code>.
                  </div>
                </div>
                <button class="btn-refresh-sync" @click=${this.autoSyncSvg}>
                  🔄 Réessayer
                </button>
              </div>
            `:c`
              <div class="sync-banner syncing" style="background: rgba(30, 41, 59, 0.6); border-color: rgba(255, 255, 255, 0.1);">
                <span class="sync-icon">💡</span>
                <div class="sync-text">
                  <div class="sync-title">Synchroniser le plan avec Home Assistant</div>
                  <div class="sync-desc">Enregistre directement le fichier dans <code>/config/www/</code> sans intervention manuelle.</div>
                </div>
                <button class="btn-refresh-sync" @click=${this.autoSyncSvg}>
                  ⚡ Synchroniser
                </button>
              </div>
            `}

            <!-- Option Data-URI 100% autonome -->
            <div class="config-row">
              <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none;">
                <input 
                  type="checkbox" 
                  .checked=${this.embedDataUri} 
                  @change=${s=>this.embedDataUri=s.target.checked}
                  style="accent-color: #38bdf8; width: 16px; height: 16px; cursor: pointer;"
                />
                <div>
                  <div class="config-label">Embarquer le plan en Data-URI (100% autonome sans aucun fichier requis)</div>
                  <div style="font-size: 0.78rem; color: #94a3b8;">
                    Le code SVG est directement injecté dans le YAML Lovelace : fonctionne immédiatement même sans dossier /config/www/ !
                  </div>
                </div>
              </label>
            </div>

            ${this.embedDataUri?null:c`
              <div class="config-row">
                <label class="config-label">Chemin d'image dans Lovelace :</label>
                <input 
                  type="text" 
                  class="config-input" 
                  .value=${this.imagePath} 
                  @input=${s=>this.imagePath=s.target.value}
                  placeholder="/local/mon_plan.svg"
                />
                <button class="btn-action emerald" @click=${this.downloadSvg} title="Télécharger une copie locale du SVG">
                  <span>📥</span>
                  <span>Télécharger SVG</span>
                </button>
              </div>
            `}

            <!-- Bloc de code YAML -->
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 6px;">
              <span style="font-size: 0.9rem; font-weight: 700; color: #38bdf8; display: flex; align-items: center; gap: 6px;">
                <span>📋</span>
                <span>Code Lovelace prêt à coller :</span>
              </span>
              <button 
                class="btn-action ${this.copiedToast?"emerald":""}" 
                style="padding: 8px 18px; font-size: 0.88rem; font-weight: 700;"
                @click=${()=>this.copyCode(i)}
              >
                <span>${this.copiedToast?"✅ Copié !":"📋 Copier le YAML"}</span>
              </button>
            </div>

            <div class="code-container">
              <div class="code-header">
                <span>Code YAML Picture-Elements</span>
                <button 
                  class="btn-copy ${this.copiedToast?"copied":""}" 
                  @click=${()=>this.copyCode(i)}
                >
                  <span>${this.copiedToast?"✓ Copié !":"📋 Copier le YAML"}</span>
                </button>
              </div>
              <pre class="code-box"><code>${i}</code></pre>
            </div>

            <!-- Guide Pas-à-Pas -->
            <div class="guide-box">
              <div class="guide-title">
                <span>💡</span>
                <span>Comment installer cette carte dans Home Assistant :</span>
              </div>
              <div class="guide-step">
                <span class="guide-num">1</span>
                <div>
                  ${this.syncStatus==="success"?c`Le fichier SVG est <strong>déjà présent sur votre serveur Home Assistant</strong> (aucun transfert requis !).`:this.embedDataUri?c`Le plan est <strong>100% intégré dans le YAML</strong> (aucun fichier externe n'est requis).`:c`Assurez-vous que le fichier <code>plan_${this.project?.id||"rdc"}.svg</code> est présent dans <code>/config/www/</code>.`}
                </div>
              </div>
              <div class="guide-step">
                <span class="guide-num">2</span>
                <div>
                  Cliquez sur <strong>Copier le YAML dans le presse-papier</strong>.
                </div>
              </div>
              <div class="guide-step">
                <span class="guide-num">3</span>
                <div>
                  Dans votre tableau de bord Home Assistant, cliquez sur <strong>Modifier le tableau de bord</strong> > <strong>Ajouter une carte</strong> > Descendez tout en bas et choisissez <strong>Manuel</strong>.
                </div>
              </div>
              <div class="guide-step">
                <span class="guide-num">4</span>
                <div>
                  Collez le code YAML et cliquez sur <strong>Enregistrer</strong>. Vos lumières, radars et températures s'affichent directement à l'échelle sur votre plan !
                </div>
              </div>
            </div>
          `:null}

          <!-- Onglet 2 : Carte Custom Card (home-architect-card) -->
          ${this.activeTab==="custom_card"?c`
            <div class="guide-box" style="background: rgba(168, 85, 247, 0.08); border-color: rgba(168, 85, 247, 0.3);">
              <div class="guide-title" style="color: #c084fc;">
                <span>✨</span>
                <span>Carte 2D & 3D Temps Réel intégrée sans fichier externe</span>
              </div>
              <div style="font-size: 0.82rem; color: #cbd5e1; line-height: 1.45;">
                Cette carte utilise directement le moteur de rendu Home Architect. Elle affiche votre plan en 2D ou en <strong>3D isométrique avec rotation libre</strong>, anime les radars en temps réel, illumine les pièces quand les lumières s'allument, et permet de contrôler vos appareils en un clic.
              </div>
            </div>

            <div class="config-row">
              <label class="config-label">Mode de vue par défaut :</label>
              <div style="display: flex; gap: 8px;">
                <button 
                  class="btn-action ${this.customCardViewMode==="2d"?"":"purple"}" 
                  style="${this.customCardViewMode==="2d"?"background: #0284c7;":"background: rgba(30, 41, 59, 0.8);"}"
                  @click=${()=>this.customCardViewMode="2d"}
                >
                  📐 Vue 2D
                </button>
                <button 
                  class="btn-action ${this.customCardViewMode==="3d"?"":"purple"}" 
                  style="${this.customCardViewMode==="3d"?"background: #7c3aed;":"background: rgba(30, 41, 59, 0.8);"}"
                  @click=${()=>this.customCardViewMode="3d"}
                >
                  🧊 Vue 3D Isométrique
                </button>
              </div>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 6px;">
              <span style="font-size: 0.9rem; font-weight: 700; color: #c084fc; display: flex; align-items: center; gap: 6px;">
                <span>📋</span>
                <span>Code Lovelace prêt à coller :</span>
              </span>
              <button 
                class="btn-action ${this.copiedToast?"emerald":"purple"}" 
                style="padding: 8px 18px; font-size: 0.88rem; font-weight: 700;"
                @click=${()=>this.copyCode(o)}
              >
                <span>${this.copiedToast?"✅ Copié !":"📋 Copier le YAML"}</span>
              </button>
            </div>

            <!-- Bloc de code YAML -->
            <div class="code-container">
              <div class="code-header">
                <span>Code Lovelace YAML</span>
                <button 
                  class="btn-copy ${this.copiedToast?"copied":""}" 
                  @click=${()=>this.copyCode(o)}
                >
                  <span>${this.copiedToast?"✓ Copié !":"📋 Copier le YAML"}</span>
                </button>
              </div>
              <pre class="code-box"><code>${o}</code></pre>
            </div>

            <div class="guide-box">
              <div class="guide-title">
                <span>🚀</span>
                <span>Installation rapide en 1 étape :</span>
              </div>
              <div class="guide-step">
                <span class="guide-num">1</span>
                <div>
                  Dans Lovelace, cliquez sur <strong>Modifier le tableau de bord</strong> > <strong>Ajouter une carte</strong> > <strong>Manuel</strong>, collez ce code YAML et enregistrez !
                </div>
              </div>
            </div>
          `:null}

          <!-- Onglet 3 : Téléchargement Fichiers Bruts -->
          ${this.activeTab==="raw_files"?c`
            <div class="config-row">
              <div>
                <div class="config-label">Fichier Vectoriel SVG (Haute Définition)</div>
                <div style="font-size: 0.78rem; color: #94a3b8; margin-top: 2px;">
                  Idéal pour ouvrir dans Inkscape, Illustrator ou imprimer
                </div>
              </div>
              <button class="btn-action emerald" @click=${this.downloadSvg}>
                <span>📐</span>
                <span>Télécharger le SVG</span>
              </button>
            </div>

            <div class="config-row">
              <div>
                <div class="config-label">Sauvegarde complète du projet (JSON)</div>
                <div style="font-size: 0.78rem; color: #94a3b8; margin-top: 2px;">
                  Contient les murs, pièces, hauteurs sous plafond, ouvertures et entités
                </div>
              </div>
              <button class="btn-action purple" @click=${this.downloadJson}>
                <span>💾</span>
                <span>Télécharger la Sauvegarde JSON</span>
              </button>
            </div>
          `:null}
        </div>

        <!-- Notification Toast Flottante -->
        ${this.copiedToast?c`
          <div class="copy-floating-toast">
            <span>✅</span>
            <span>Code YAML copié dans le presse-papier !</span>
          </div>
        `:null}

        <!-- Pied de page -->
        <div class="modal-footer">
          <button class="btn-secondary" @click=${this.handleClose}>Fermer</button>
          ${this.activeTab!=="raw_files"?c`
            <button 
              class="btn-action ${this.copiedToast?"emerald":this.activeTab==="custom_card"?"purple":""}" 
              style="padding: 10px 22px; font-size: 0.92rem; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 15px rgba(2, 132, 199, 0.4);"
              @click=${()=>this.copyCode(this.activeTab==="picture_elements"?i:o)}
            >
              <span>📋</span>
              <span>${this.copiedToast?"✅ Copié dans le presse-papier !":"Copier le YAML dans le presse-papier"}</span>
            </button>
          `:null}
        </div>
      </div>
    `}};G.styles=Q`
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

    .btn-close:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }

    /* Onglets de navigation */
    .tabs-nav {
      display: flex;
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

    /* Section Actions / Configuration */
    .config-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
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

    .config-input {
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 6px;
      padding: 6px 10px;
      color: #f8fafc;
      font-size: 0.85rem;
      font-family: ui-monospace, SFMono-Regular, monospace;
      outline: none;
      flex: 1;
      max-width: 320px;
    }

    .config-input:focus {
      border-color: #38bdf8;
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

    .btn-action:hover {
      background: #0369a1;
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.45);
    }

    .btn-action.emerald {
      background: #059669;
      border-color: #10b981;
    }

    .btn-action.emerald:hover {
      background: #047857;
      box-shadow: 0 0 14px rgba(16, 185, 129, 0.45);
    }

    .btn-action.purple {
      background: #7c3aed;
      border-color: #a855f7;
    }

    .btn-action.purple:hover {
      background: #6d28d9;
      box-shadow: 0 0 14px rgba(168, 85, 247, 0.45);
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
      overflow-y: auto;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 0.82rem;
      line-height: 1.5;
      color: #e2e8f0;
      white-space: pre;
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

    .btn-secondary:hover {
      background: #475569;
      color: #ffffff;
    }

    /* Bannière de synchronisation automatique */
    .sync-banner {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 0.84rem;
      line-height: 1.4;
      animation: fadeIn 0.2s ease-out;
    }

    .sync-banner.success {
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: #6ee7b7;
    }

    .sync-banner.syncing {
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.35);
      color: #7dd3fc;
    }

    .sync-banner.error {
      background: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #fca5a5;
    }

    .sync-icon {
      font-size: 1.4rem;
      flex-shrink: 0;
    }

    .sync-text {
      flex: 1;
    }

    .sync-title {
      font-weight: 700;
      font-size: 0.88rem;
      margin-bottom: 2px;
    }

    .sync-desc {
      font-size: 0.8rem;
      opacity: 0.9;
    }

    .sync-desc code {
      background: rgba(0, 0, 0, 0.35);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-size: 0.78rem;
    }

    .btn-refresh-sync {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #ffffff;
      border-radius: 6px;
      padding: 6px 12px;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }

    .btn-refresh-sync:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    /* Notification flottante de copie */
    .copy-floating-toast {
      position: absolute;
      top: 18px;
      left: 50%;
      transform: translateX(-50%);
      background: #059669;
      border: 1px solid #10b981;
      color: #ffffff;
      padding: 10px 22px;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(16, 185, 129, 0.5);
      z-index: 200;
      animation: popToast 0.25s ease-out;
      pointer-events: none;
    }

    @keyframes popToast {
      from { transform: translate(-50%, -10px); opacity: 0; }
      to { transform: translate(-50%, 0); opacity: 1; }
    }
  `;te([_({type:Object})],G.prototype,"project",2);te([_({type:Object})],G.prototype,"hass",2);te([p()],G.prototype,"activeTab",2);te([p()],G.prototype,"imagePath",2);te([p()],G.prototype,"customCardViewMode",2);te([p()],G.prototype,"copiedToast",2);te([p()],G.prototype,"syncStatus",2);te([p()],G.prototype,"syncErrorMsg",2);te([p()],G.prototype,"embedDataUri",2);G=te([ee("home-architect-export-modal")],G);var Ve=Object.defineProperty,Ge=Object.getOwnPropertyDescriptor,K=(t,e,i,o)=>{for(var s=o>1?void 0:o?Ge(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&Ve(e,i,s),s};const me=[{id:"rdc",label:"RDC",icon:"🏠"},{id:"jardin",label:"Jardin",icon:"🌳"},{id:"sous-sol",label:"Sous-Sol",icon:"🏠"},{id:"etage1",label:"1er Étage",icon:"🏠"},{id:"etage2",label:"2ème Étage",icon:"🏠"},{id:"etage3",label:"3ème Étage",icon:"🏠"},{id:"autre",label:"Autre",icon:"📁"}];let q=class extends Z{constructor(){super(...arguments),this.initialTab="save",this.activeTab="save",this.planName="",this.planCategory="rdc",this.customCategoryName="",this.savedProjects=[],this.isLoadingProjects=!1,this.searchQuery=""}connectedCallback(){super.connectedCallback(),this.activeTab=this.initialTab,this.planName=this.project?.name||"Plan de Maison",this.planCategory=this.project?.category||this.project?.id||"rdc",me.some(t=>t.id===this.planCategory)||(this.customCategoryName=this.planCategory,this.planCategory="autre"),this.fetchSavedProjects()}async fetchSavedProjects(){this.isLoadingProjects=!0;const t=new Map;if(this.hass&&this.hass.callWS)try{const e=await this.hass.callWS({type:"home_architect/get_projects"});if(e&&e.projects&&Array.isArray(e.projects))for(const i of e.projects)i&&i.id&&t.set(i.id,i)}catch(e){console.warn("Erreur lecture projets HA websocket:",e)}try{for(let e=0;e<localStorage.length;e++){const i=localStorage.key(e);if(i&&i.startsWith("home_architect_")){const o=localStorage.getItem(i);if(o)try{const s=JSON.parse(o);s&&s.id&&!t.has(s.id)&&t.set(s.id,s)}catch{}}}}catch{}this.savedProjects=Array.from(t.values()).sort((e,i)=>{const o=new Date(e.updated_at||0).getTime();return new Date(i.updated_at||0).getTime()-o}),this.isLoadingProjects=!1}handleSave(){const t=this.planName.trim()||"Plan Sans Nom",e=this.planCategory==="autre"&&this.customCategoryName.trim()?this.customCategoryName.trim():this.planCategory;this.dispatchEvent(new CustomEvent("save-confirmed",{detail:{name:t,category:e},bubbles:!0,composed:!0}))}handleLoadProject(t){this.dispatchEvent(new CustomEvent("load-project",{detail:{project:t},bubbles:!0,composed:!0}))}async handleDeleteProject(t,e){if(e.stopPropagation(),!!confirm("Êtes-vous sûr de vouloir supprimer ce plan sauvegardé ?")){if(this.hass&&this.hass.callWS)try{await this.hass.callWS({type:"home_architect/delete_project",project_id:t})}catch(i){console.warn("Erreur suppression websocket:",i)}try{localStorage.removeItem(`home_architect_${t}`)}catch{}this.savedProjects=this.savedProjects.filter(i=>i.id!==t)}}handleClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}formatDate(t){if(!t)return"Date inconnue";try{return new Date(t).toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return t}}getCategoryItem(t){return me.find(e=>e.id===t)||{id:t||"autre",label:t||"Autre",icon:"📁"}}render(){const t=this.savedProjects.filter(e=>{if(!this.searchQuery)return!0;const i=this.searchQuery.toLowerCase();return e.name&&e.name.toLowerCase().includes(i)||e.category&&e.category.toLowerCase().includes(i)||e.id&&e.id.toLowerCase().includes(i)});return c`
      <div class="modal-card" @click=${e=>e.stopPropagation()}>
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
        <div class="tabs-nav">
          <button 
            class="tab-btn ${this.activeTab==="save"?"active":""}"
            @click=${()=>this.activeTab="save"}
          >
            <span>💾</span>
            <span>Enregistrer le plan</span>
          </button>
          <button 
            class="tab-btn ${this.activeTab==="load"?"active":""}"
            @click=${()=>{this.activeTab="load",this.fetchSavedProjects()}}
          >
            <span>📂</span>
            <span>Ouvrir un plan (${this.savedProjects.length})</span>
          </button>
        </div>

        <!-- Corps du modal -->
        <div class="modal-body">
          ${this.activeTab==="save"?c`
            <!-- Formulaire Sauvegarde -->
            <div class="form-group">
              <label class="form-label">
                <span>🏷️</span>
                <span>Nom du plan :</span>
              </label>
              <input 
                type="text" 
                class="form-input" 
                .value=${this.planName}
                @input=${e=>this.planName=e.target.value}
                placeholder="Ex: Plan RDC Maison, Plan Jardin Été..."
                autofocus
              />
            </div>

            <div class="form-group">
              <label class="form-label">
                <span>🏢</span>
                <span>Catégorie du plan (Niveau / Zone) :</span>
              </label>
              <div class="categories-grid">
                ${me.map(e=>c`
                  <div 
                    class="category-card ${this.planCategory===e.id?"selected":""}"
                    @click=${()=>this.planCategory=e.id}
                  >
                    <span class="cat-icon">${e.icon}</span>
                    <span>${e.label}</span>
                  </div>
                `)}
              </div>

              ${this.planCategory==="autre"?c`
                <div style="margin-top: 8px;">
                  <input 
                    type="text" 
                    class="form-input" 
                    .value=${this.customCategoryName}
                    @input=${e=>this.customCategoryName=e.target.value}
                    placeholder="Précisez la catégorie (ex: Combles, Terrasse, Garage...)"
                  />
                </div>
              `:null}
            </div>

            <!-- Résumé du contenu -->
            <div class="form-group">
              <label class="form-label">
                <span>📊</span>
                <span>Contenu du plan à enregistrer :</span>
              </label>
              <div class="metrics-summary">
                <div class="metric-badge">🧱 <strong>${this.project?.walls?.length||0}</strong> mur(s)</div>
                <div class="metric-badge">📐 <strong>${this.project?.rooms?.length||0}</strong> pièce(s)</div>
                <div class="metric-badge">🚪 <strong>${this.project?.openings?.length||0}</strong> ouvrant(s)</div>
                <div class="metric-badge">⚡ <strong>${this.project?.bindings?.length||0}</strong> entité(s) HA</div>
                <div class="metric-badge">🛋️ <strong>${this.project?.furniture?.length||0}</strong> meuble(s)</div>
              </div>
            </div>
          `:c`
            <!-- Liste Ouvrir / Recharger -->
            <div class="search-bar">
              <input 
                type="text" 
                class="form-input" 
                .value=${this.searchQuery}
                @input=${e=>this.searchQuery=e.target.value}
                placeholder="🔍 Rechercher un plan par nom ou catégorie..."
              />
            </div>

            ${this.isLoadingProjects?c`
              <div class="empty-state">
                <span>⏳ Chargement des plans sauvegardés...</span>
              </div>
            `:t.length===0?c`
              <div class="empty-state">
                <span class="empty-state-icon">📂</span>
                <span>Aucun plan sauvegardé trouvé.</span>
                <button class="btn-primary" style="margin-top: 6px;" @click=${()=>this.activeTab="save"}>
                  💾 Enregistrer le plan actuel
                </button>
              </div>
            `:c`
              <div class="projects-list">
                ${t.map(e=>{const i=this.getCategoryItem(e.category||e.id),o=e.id===this.project?.id;return c`
                    <div class="project-item ${o?"current":""}">
                      <div class="project-info">
                        <div class="project-title-row">
                          <span class="project-cat-badge">
                            <span>${i.icon}</span>
                            <span>${i.label}</span>
                          </span>
                          <span class="project-name" title="${e.name}">${e.name||"Plan Sans Nom"}</span>
                          ${o?c`<span style="font-size: 0.72rem; color: #38bdf8; font-weight: 700;">(Ouvert)</span>`:null}
                        </div>
                        <div class="project-meta-row">
                          <span>📅 Modifié le ${this.formatDate(e.updated_at)}</span>
                          <span>•</span>
                          <span>🧱 ${e.walls?.length||0} murs</span>
                          <span>•</span>
                          <span>📐 ${e.rooms?.length||0} pièces</span>
                          <span>•</span>
                          <span>🛋️ ${e.furniture?.length||0} meuble${(e.furniture?.length||0)>1?"s":""}</span>
                          <span>•</span>
                          <span>⚡ ${e.bindings?.length||0} capteurs</span>
                        </div>
                      </div>

                      <div class="project-actions">
                        <button class="btn-load" @click=${()=>this.handleLoadProject(e)} title="Charger ce plan">
                          <span>⚡</span>
                          <span>Charger</span>
                        </button>
                        <button class="btn-delete" @click=${s=>this.handleDeleteProject(e.id,s)} title="Supprimer ce plan">
                          🗑️
                        </button>
                      </div>
                    </div>
                  `})}
              </div>
            `}
          `}
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button class="btn-secondary" @click=${this.handleClose}>
            Annuler
          </button>
          ${this.activeTab==="save"?c`
            <button class="btn-primary" @click=${this.handleSave}>
              <span>💾</span>
              <span>Enregistrer le plan</span>
            </button>
          `:null}
        </div>
      </div>
    `}};q.styles=Q`
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
  `;K([_({type:Object})],q.prototype,"project",2);K([_({type:Object})],q.prototype,"hass",2);K([_({type:String})],q.prototype,"initialTab",2);K([p()],q.prototype,"activeTab",2);K([p()],q.prototype,"planName",2);K([p()],q.prototype,"planCategory",2);K([p()],q.prototype,"customCategoryName",2);K([p()],q.prototype,"savedProjects",2);K([p()],q.prototype,"isLoadingProjects",2);K([p()],q.prototype,"searchQuery",2);q=K([ee("home-architect-save-load-modal")],q);function Ye(t){if(t.getElementById?.("socrate-rules-overlay")||t.querySelector?.("#socrate-rules-overlay"))return;if(!document.getElementById("socrate-rules-fonts")){const u=document.createElement("link");u.id="socrate-rules-fonts",u.rel="stylesheet",u.href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;900&family=Poppins:wght@300;600&display=swap",document.head.appendChild(u)}const e=document.createElement("div");e.id="socrate-rules-overlay",e.innerHTML=`
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
  `,t.appendChild(e),requestAnimationFrame(()=>{e.style.opacity="1"});const i=e.querySelector("#socrateParticleCanvas");if(!i)return;const o=i.getContext("2d"),s=e.querySelector("#socrateTitle"),n=Math.PI*2,r=["Socrate","Rules"];s.innerHTML="";let a=0;r.forEach(u=>{const C=document.createElement("div");C.style.display="block",[...u].forEach(D=>{const j=document.createElement("span");D===" "?j.innerHTML="&nbsp;":j.textContent=D,j.classList.add("socrate-letter"),j.style.animationDelay=`${a*.07}s`,C.appendChild(j),a++}),s.appendChild(C)});let d=[],v=[],h=null,g=!1,l={x:null,y:null,radius:150,radiusSq:22500};function b(){i.width=window.innerWidth,i.height=window.innerHeight}b();class m{constructor(C,D,j,A,F,V){this.x=C,this.y=D,this.directionX=j,this.directionY=A,this.size=F,this.color=V,this.originalSize=F}draw(){o.beginPath(),o.arc(this.x,this.y,this.size,0,n,!1),o.fillStyle=this.color,o.fill()}update(){if((this.x>i.width||this.x<0)&&(this.directionX=-this.directionX),(this.y>i.height||this.y<0)&&(this.directionY=-this.directionY),this.x+=this.directionX,this.y+=this.directionY,l.x!=null&&l.y!=null){let C=l.x-this.x,D=l.y-this.y,j=C*C+D*D;if(j<l.radiusSq){let A=Math.sqrt(j),F=C/A,V=D/A,ie=(l.radius-A)/l.radius;this.x-=F*ie*3,this.y-=V*ie*3,this.size<this.originalSize*3.5&&(this.size+=.2)}else this.size>this.originalSize&&(this.size-=.1)}else this.size>this.originalSize&&(this.size-=.1);this.draw()}}class f{constructor(C,D){this.x=C,this.y=D,this.size=Math.random()*6+2,this.speedX=(Math.random()-.5)*12,this.speedY=(Math.random()-.5)*12;const j=["#ff007f","#7f00ff","#00f0ff","#ffffff"];this.color=j[Math.floor(Math.random()*j.length)],this.alpha=1,this.decay=Math.random()*.015+.01}update(){this.x+=this.speedX,this.y+=this.speedY,this.speedX*=.98,this.speedY*=.98,this.alpha-=this.decay,this.alpha>0&&(o.save(),o.globalAlpha=this.alpha,o.beginPath(),o.arc(this.x,this.y,this.size,0,n),o.fillStyle=this.color,o.shadowBlur=15,o.shadowColor=this.color,o.fill(),o.restore())}}function S(){d=[];let u=i.width*i.height/9e3,C=Math.min(u,250);for(let D=0;D<C;D++){let j=Math.random()*2+.5,A=Math.random()*(i.width-j*4)+j*2,F=Math.random()*(i.height-j*4)+j*2,V=Math.random()*.4-.2,ie=Math.random()*.4-.2,be=["rgba(127, 0, 255, 0.4)","rgba(0, 240, 255, 0.3)","rgba(255, 0, 127, 0.3)"],$e=be[Math.floor(Math.random()*be.length)];d.push(new m(A,F,V,ie,j,$e))}}function L(){let u=120,C=u*u;for(let D=0;D<d.length;D++)for(let j=D+1;j<d.length;j++){let A=d[D].x-d[j].x,F=d[D].y-d[j].y,V=A*A+F*F;if(V<C){let be=(1-Math.sqrt(V)/u)*.15;o.strokeStyle=`rgba(127, 0, 255, ${be})`,o.lineWidth=.5,o.beginPath(),o.moveTo(d[D].x,d[D].y),o.lineTo(d[j].x,d[j].y),o.stroke()}}}function M(){o.fillStyle="rgba(3, 0, 8, 0.15)",o.fillRect(0,0,i.width,i.height);for(let u=0;u<d.length;u++)d[u].update();for(let u=v.length-1;u>=0;u--)v[u].update(),v[u].alpha<=0&&v.splice(u,1);L(),h=requestAnimationFrame(M)}function T(u){l.x=u.clientX,l.y=u.clientY}function x(){l.x=null,l.y=null}function w(u){u.touches&&u.touches.length>0&&(l.x=u.touches[0].clientX,l.y=u.touches[0].clientY)}function E(){l.x=null,l.y=null}function I(u){const C=u.clientX||window.innerWidth/2,D=u.clientY||window.innerHeight/2;for(let j=0;j<30;j++)v.push(new f(C,D))}function W(u){u.key==="Escape"&&z()}window.addEventListener("resize",b),window.addEventListener("mousemove",T),window.addEventListener("mouseout",x),window.addEventListener("touchmove",w,{passive:!0}),window.addEventListener("touchend",E,{passive:!0}),window.addEventListener("keydown",W),e.addEventListener("click",I);let U=[];function P(u,C){if(g)return;const D=Date.now();U=U.filter(F=>D-F<2e3),U.push(D);const j=u||window.innerWidth/2,A=C||window.innerHeight/2;for(let F=0;F<70;F++)v.push(new f(j,A));if(U.length>=3){g=!0,U=[];for(let F=0;F<150;F++)v.push(new f(window.innerWidth/2,window.innerHeight/2));e.style.transition="opacity 0.38s ease, transform 0.38s ease",e.style.opacity="0",e.style.transform="scale(1.05)",setTimeout(()=>{z()},360)}}s.addEventListener("click",u=>{u.stopPropagation(),P(u.clientX,u.clientY)}),s.addEventListener("touchstart",u=>{u.stopPropagation();const C=u.touches&&u.touches[0];P(C?C.clientX:null,C?C.clientY:null)},{passive:!0});const O=e.querySelector("#socrateExitHint");O&&(O.addEventListener("click",u=>{u.stopPropagation(),P(u.clientX,u.clientY)}),O.addEventListener("touchstart",u=>{u.stopPropagation();const C=u.touches&&u.touches[0];P(C?C.clientX:null,C?C.clientY:null)},{passive:!0}));function z(){h&&(cancelAnimationFrame(h),h=null),window.removeEventListener("resize",b),window.removeEventListener("mousemove",T),window.removeEventListener("mouseout",x),window.removeEventListener("touchmove",w),window.removeEventListener("touchend",E),window.removeEventListener("keydown",W),e.parentNode&&e.parentNode.removeChild(e)}S(),M()}var Je=Object.defineProperty,Xe=Object.getOwnPropertyDescriptor,$=(t,e,i,o)=>{for(var s=o>1?void 0:o?Xe(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(s=(o?r(e,i,s):r(s))||s);return o&&s&&Je(e,i,s),s};const ue={light:{title:"Éclairage & Luminaires",tabLabel:"💡 Éclairage",icons:[{icon:"💡",label:"Ampoule standard",mdi:"mdi:lightbulb"},{icon:"🛋️",label:"Lampe salon",mdi:"mdi:lamp"},{icon:"🌟",label:"Spot encastré",mdi:"mdi:ceiling-light"},{icon:"🔆",label:"Plafonnier",mdi:"mdi:ceiling-light-outline"},{icon:"🏮",label:"Lanterne extérieure",mdi:"mdi:outdoor-lamp"},{icon:"🕯️",label:"Bougie / Ambiance",mdi:"mdi:candle"},{icon:"🔦",label:"Projecteur",mdi:"mdi:spotlight-beam"},{icon:"🪩",label:"Bandeau LED RGB",mdi:"mdi:led-strip-variant"},{icon:"✨",label:"Guirlande lumineuse",mdi:"mdi:string-lights"},{icon:"🛋",label:"Applique murale",mdi:"mdi:wall-sconce-flat"}]},switch:{title:"Prises & Interrupteurs",tabLabel:"🔌 Prises",icons:[{icon:"🔌",label:"Prise connectée",mdi:"mdi:power-socket-fr"},{icon:"⚡",label:"Interrupteur mural",mdi:"mdi:toggle-switch"},{icon:"📺",label:"Télévision",mdi:"mdi:television"},{icon:"☕",label:"Cafetière / Électroménager",mdi:"mdi:coffee-maker"},{icon:"💻",label:"PC / Bureau",mdi:"mdi:laptop"},{icon:"🔊",label:"Enceinte / Chaîne Hi-Fi",mdi:"mdi:speaker"},{icon:"🖨️",label:"Imprimante",mdi:"mdi:printer"},{icon:"🎮",label:"Console de jeu",mdi:"mdi:gamepad-variant"},{icon:"🔋",label:"Chargeur batterie",mdi:"mdi:battery-charging"},{icon:"🪭",label:"Ventilateur mobile",mdi:"mdi:fan"}]},binary_sensor:{title:"Détecteurs, Sécurité & Ouvrants",tabLabel:"📡 Détecteurs",icons:[{icon:"🚶",label:"Mouvement PIR",mdi:"mdi:motion-sensor"},{icon:"🏃",label:"Passage rapide",mdi:"mdi:walk"},{icon:"👁️",label:"Radar présence",mdi:"mdi:radar"},{icon:"🚪",label:"Capteur porte",mdi:"mdi:door"},{icon:"🪟",label:"Capteur fenêtre",mdi:"mdi:window-closed"},{icon:"🚗",label:"Porte garage",mdi:"mdi:garage"},{icon:"🚨",label:"Sirène / Alarme",mdi:"mdi:alarm-light"},{icon:"🔔",label:"Sonnette / Carillon",mdi:"mdi:doorbell"},{icon:"🐾",label:"Présence animale",mdi:"mdi:paw"},{icon:"💧",label:"Fuite d'eau",mdi:"mdi:water-alert"},{icon:"🔥",label:"Détecteur fumée",mdi:"mdi:smoke-detector"},{icon:"📬",label:"Boîte aux lettres",mdi:"mdi:mailbox"}]},climate:{title:"Thermostats & Climatisation",tabLabel:"🌡️ Climat",icons:[{icon:"🌡️",label:"Thermostat principal",mdi:"mdi:thermostat"},{icon:"❄️",label:"Climatiseur (Froid)",mdi:"mdi:air-conditioner"},{icon:"🔥",label:"Radiateur (Chaud)",mdi:"mdi:radiator"},{icon:"♨️",label:"Pompe à chaleur / ECS",mdi:"mdi:water-boiler"},{icon:"💨",label:"VMC / Aération",mdi:"mdi:fan"}]},sensor:{title:"Capteurs & Sondes",tabLabel:"📊 Sondes",icons:[{icon:"🌡️",label:"Sonde température",mdi:"mdi:thermometer"},{icon:"💧",label:"Hygrométrie (Humidité)",mdi:"mdi:water-percent"},{icon:"☀️",label:"Luminosité (Lux)",mdi:"mdi:weather-sunny"},{icon:"💨",label:"Qualité d'air (CO2/VOC)",mdi:"mdi:air-filter"},{icon:"⚡",label:"Consommation électrique",mdi:"mdi:flash"},{icon:"🔋",label:"Batterie restante",mdi:"mdi:battery"},{icon:"🔊",label:"Bruit / Décibels",mdi:"mdi:volume-high"},{icon:"⚖️",label:"Pression barométrique",mdi:"mdi:gauge"}]},cover:{title:"Volets, Stores & Motorisations",tabLabel:"🪟 Volets",icons:[{icon:"🪟",label:"Volet roulant",mdi:"mdi:window-shutter"},{icon:"🚪",label:"Store vénitien",mdi:"mdi:blinds"},{icon:"🚗",label:"Porte garage motorisée",mdi:"mdi:garage"},{icon:"⛺",label:"Store banne terrasse",mdi:"mdi:awning"},{icon:"↕️",label:"Motorisation baie",mdi:"mdi:arrow-up-down"}]},media_player:{title:"Multimédia & Enceintes",tabLabel:"📺 Média",icons:[{icon:"📺",label:"Téléviseur",mdi:"mdi:television"},{icon:"📻",label:"Enceinte connectée",mdi:"mdi:speaker"},{icon:"🎵",label:"Musique multiroom",mdi:"mdi:music"},{icon:"🔊",label:"Ampli Home-Cinema",mdi:"mdi:speaker-wireless"},{icon:"🎬",label:"Vidéoprojecteur",mdi:"mdi:projector"},{icon:"🎮",label:"Console jeux vidéo",mdi:"mdi:gamepad-variant"}]},camera:{title:"Caméras & Vidéosurveillance",tabLabel:"📷 Caméras",icons:[{icon:"📷",label:"Caméra intérieure fixe",mdi:"mdi:camera"},{icon:"📹",label:"Caméra dôme PTZ extérieure",mdi:"mdi:cctv"},{icon:"👁️",label:"Zone sous surveillance",mdi:"mdi:eye"},{icon:"🎥",label:"Portier / Interphone vidéo",mdi:"mdi:video"}]},fan:{title:"Ventilation & Brassage",tabLabel:"💨 Ventilateur",icons:[{icon:"💨",label:"Ventilateur colonne/pied",mdi:"mdi:fan"},{icon:"🌀",label:"VMC extraction",mdi:"mdi:fan-chevron-up"},{icon:"🌪️",label:"Plafonnier ventilateur",mdi:"mdi:ceiling-fan"}]},vacuum:{title:"Robots Aspirateurs & Nettoyage",tabLabel:"🤖 Robots",icons:[{icon:"🤖",label:"Robot aspirateur",mdi:"mdi:robot-vacuum"},{icon:"🧹",label:"Robot laveur de sol",mdi:"mdi:broom"}]},lock:{title:"Serrures & Contrôle d'accès",tabLabel:"🔒 Serrures",icons:[{icon:"🔒",label:"Serrure connectée",mdi:"mdi:lock"},{icon:"🛡️",label:"Alarme intrusion",mdi:"mdi:shield-home"},{icon:"🗝️",label:"Gâche électrique",mdi:"mdi:key"}]}};let k=class extends Z{constructor(){super(...arguments),this.narrow=!1,this.activeTool="wall",this.currentThickness=.2,this.currentOpeningWidth=.9,this.doorFlipSide=!1,this.doorFlipDirection=!0,this.windowSashCount=1,this.activeLevel="rdc",this.showDimensions=!0,this.showThermalHeatmap=!1,this.showGhostLevel=!1,this.levelProjects={},this.is3DMode=!1,this.isFullscreen=!1,this.isDrawerCollapsed=!1,this.isWizardOpen=!1,this.isImportModalOpen=!1,this.isExportModalOpen=!1,this.isSaveLoadModalOpen=!1,this.isNewPlanModalOpen=!1,this.newPlanName="Nouveau Plan",this.newPlanCategory="rdc",this.isResetModalOpen=!1,this.saveLoadModalTab="save",this.isCalibrateModalOpen=!1,this.calibrationData=null,this.isRescaleModalOpen=!1,this.rescaleMeasuredMeters=0,this.selectedRoomForEdit=null,this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[]},this.activeDropdown=null,this.selectedTypologyTab="",this.isIconPickerOpen=!0,this.updateInfo={available:!1,latestVersion:de,releaseNotes:"",releaseUrl:""},this.isUpdateModalOpen=!1,this.logoClickTimes=[],this.socrateKeySequence="",this._boundEasterEggKeyDown=null,this._updateCheckDone=!1,this.undoStack=[],this.redoStack=[],this.project={id:"rdc",name:"Rez-de-Chaussée",created_at:new Date().toISOString(),updated_at:new Date().toISOString(),pixelsPerMeter:50,grid:{size:.5,subdivisions:2,snapToGrid:!0,snapToAngles:!0,snapToElements:!0},walls:[],openings:[],rooms:[],bindings:[],furniture:[],category:"rdc"},this.fileInputRef=null,this.toastMessage=null,this.toastTimeout=null,this._boundPaste=null,this._boundKeyDown=null,this._boundClickOutside=null,this._boundFullscreenChange=null,this._boundResize=null,this._boundDocumentClick=null,this._sidebarResizeObserver=null}handleToolSelected(t){this.activeTool=t.detail.tool,this.activeTool==="door"?this.currentOpeningWidth=.9:this.activeTool==="window"?this.currentOpeningWidth=this.windowSashCount===2?1.4:.9:this.activeTool==="french_window"&&(this.currentOpeningWidth=2)}handleDoorConfigChanged(t){if(this.doorFlipSide=t.detail.flipSide,this.doorFlipDirection=t.detail.flipDirection,this.activeTool="door",this.selectedElements.openingIds.length>0){this.pushUndoSnapshot();let e=0;const i=this.project.openings.map(o=>this.selectedElements.openingIds.includes(o.id)&&o.type==="door"?(e++,{...o,flipSide:t.detail.flipSide,flipDirection:t.detail.flipDirection}):o);e>0&&(this.project={...this.project,openings:i},this.showToast(`🚪 ${e} porte(s) mise(s) à jour`))}}handleWindowConfigChanged(t){if(this.activeTool=t.detail.type,this.currentOpeningWidth=t.detail.width,this.windowSashCount=t.detail.sashCount,this.selectedElements.openingIds.length>0){this.pushUndoSnapshot();let e=0;const i=this.project.openings.map(o=>this.selectedElements.openingIds.includes(o.id)&&(o.type==="window"||o.type==="french_window")?(e++,{...o,type:t.detail.type,width:t.detail.width,sashCount:t.detail.sashCount}):o);e>0&&(this.project={...this.project,openings:i},this.showToast(`🪟 ${e} fenêtre(s) mise(s) à jour`))}}handleWallThicknessChanged(t){if(this.currentThickness=t.detail.thickness,this.activeTool="wall",this.selectedElements.wallIds.length>0){this.pushUndoSnapshot();const e=this.project.walls.map(i=>this.selectedElements.wallIds.includes(i.id)?{...i,thickness:t.detail.thickness}:i);this.project={...this.project,walls:e},this.showToast(`🧱 Épaisseur de ${this.selectedElements.wallIds.length} mur(s) mise à jour (${Math.round(t.detail.thickness*100)} cm)`)}}updateSelectedDoorConfig(t,e){this.pushUndoSnapshot(),this.doorFlipSide=t,this.doorFlipDirection=e;const i=this.project.openings.map(o=>this.selectedElements.openingIds.includes(o.id)&&o.type==="door"?{...o,flipSide:t,flipDirection:e}:o);this.project={...this.project,openings:i},this.showToast("🚪 Sens d'ouverture de porte mis à jour")}updateSelectedWindowConfig(t,e,i){this.pushUndoSnapshot(),this.windowSashCount=e,this.currentOpeningWidth=i;const o=this.project.openings.map(s=>this.selectedElements.openingIds.includes(s.id)&&(s.type==="window"||s.type==="french_window")?{...s,type:t,sashCount:e,width:i}:s);this.project={...this.project,openings:o},this.showToast("🪟 Format de fenêtre mis à jour")}updateSelectedWallsThickness(t){this.pushUndoSnapshot(),this.currentThickness=t;const e=this.project.walls.map(i=>this.selectedElements.wallIds.includes(i.id)?{...i,thickness:t}:i);this.project={...this.project,walls:e},this.showToast(`🧱 Épaisseur de mur mise à jour (${Math.round(t*100)} cm)`)}handleProjectChanged(t){this.pushUndoSnapshot(),this.project={...t.detail.project,furniture:t.detail.project.furniture||[]},this.levelProjects[this.activeLevel]={...this.project}}handleThicknessChange(t){this.currentThickness=parseFloat(t.target.value)}handleOpeningWidthChange(t){this.currentOpeningWidth=parseFloat(t.target.value)}handleCreateRoomFromWizard(t){this.pushUndoSnapshot();const{name:e,width:i,length:o,thickness:s,height:n,color:r,icon:a,addDoor:d,addWindow:v}=t.detail,h=n||2.5,g=2,l=2,b={x:g,y:l},m={x:g+i,y:l},f={x:g+i,y:l+o},S={x:g,y:l+o},L={id:`w_top_${Date.now()}`,start:b,end:m,thickness:s,height:h,type:"standard"},M={id:`w_right_${Date.now()}`,start:m,end:f,thickness:s,height:h,type:"standard"},T={id:`w_bottom_${Date.now()}`,start:f,end:S,thickness:s,height:h,type:"standard"},x={id:`w_left_${Date.now()}`,start:S,end:b,thickness:s,height:h,type:"standard"},w=[];d&&w.push({id:`op_door_${Date.now()}`,wallId:T.id,type:"door",offset:i/2,width:.9,flipSide:!1,flipDirection:!1}),v&&w.push({id:`op_win_${Date.now()}`,wallId:L.id,type:"window",offset:i/2,width:1.2,flipSide:!1,flipDirection:!1});const E={id:`room_${Date.now()}`,name:e,polygon:[b,m,f,S],areaM2:i*o,color:r,icon:a,height:h};this.project={...this.project,walls:[...this.project.walls,L,M,T,x],openings:[...this.project.openings,...w],rooms:[...this.project.rooms,E]},this.isWizardOpen=!1,this.activeTool="select"}updateSidebarOffset(){if(this.isFullscreen){this.style.setProperty("--ha-sidebar-width","0px");return}let t=0;try{const s=document.querySelector("home-assistant")?.shadowRoot?.querySelector("home-assistant-main")?.shadowRoot?.querySelector("ha-sidebar");if(s){const n=s.getBoundingClientRect();n.width>0&&n.right>0&&window.getComputedStyle(s).display!=="none"&&(t=Math.round(n.width)),!this._sidebarResizeObserver&&typeof ResizeObserver<"u"&&(this._sidebarResizeObserver=new ResizeObserver(()=>{this.updateSidebarOffset()}),this._sidebarResizeObserver.observe(s))}}catch{}if(t===0)try{const i=document.querySelector("ha-sidebar");if(i){const o=i.getBoundingClientRect();o.width>0&&o.right>0&&window.getComputedStyle(i).display!=="none"&&(t=Math.round(o.width))}}catch{}if(t===0)try{const i=getComputedStyle(document.documentElement),o=i.getPropertyValue("--app-drawer-width")||i.getPropertyValue("--mdc-drawer-width");if(o&&o.trim().endsWith("px")){const s=parseFloat(o);!isNaN(s)&&s>0&&(t=s)}}catch{}let e=0;if(t>0){const i=this.getBoundingClientRect(),o=parseFloat(this.style.getPropertyValue("--ha-sidebar-width")||"0")||0,s=i.left-o;s<t&&(e=Math.max(0,t-Math.max(0,s)))}this.style.setProperty("--ha-sidebar-width",`${e}px`)}connectedCallback(){super.connectedCallback(),this._boundPaste=this.handlePaste.bind(this),window.addEventListener("paste",this._boundPaste),this._boundKeyDown=this.handleKeyDown.bind(this),window.addEventListener("keydown",this._boundKeyDown),this._boundClickOutside=t=>{this.activeDropdown&&(t.composedPath().some(o=>o?.classList?.contains("dropdown-menu-wrapper"))||(this.activeDropdown=null))},window.addEventListener("click",this._boundClickOutside),this._boundFullscreenChange=()=>{const t=!!(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement);this.isFullscreen=t,t?this.classList.add("is-fullscreen"):this.classList.remove("is-fullscreen"),this.updateSidebarOffset()},document.addEventListener("fullscreenchange",this._boundFullscreenChange),document.addEventListener("webkitfullscreenchange",this._boundFullscreenChange),document.addEventListener("mozfullscreenchange",this._boundFullscreenChange),document.addEventListener("MSFullscreenChange",this._boundFullscreenChange),this._boundResize=()=>this.updateSidebarOffset(),window.addEventListener("resize",this._boundResize),this._boundDocumentClick=()=>{setTimeout(()=>this.updateSidebarOffset(),50),setTimeout(()=>this.updateSidebarOffset(),320)},document.addEventListener("click",this._boundDocumentClick,{passive:!0}),this.updateSidebarOffset(),setTimeout(()=>this.updateSidebarOffset(),100),this._boundEasterEggKeyDown=t=>{const e=t.target?.tagName?.toLowerCase();e==="input"||e==="textarea"||t.target?.isContentEditable||t.key&&t.key.length===1&&(this.socrateKeySequence=(this.socrateKeySequence+t.key.toLowerCase()).slice(-7),this.socrateKeySequence==="socrate"&&(this.socrateKeySequence="",this.triggerEasterEgg()))},window.addEventListener("keydown",this._boundEasterEggKeyDown)}async firstUpdated(){if(this.updateSidebarOffset(),this.checkUpdates(),this.hass&&this.hass.callWS)try{const t=await this.hass.callWS({type:"home_architect/get_projects"});if(t&&t.projects&&Array.isArray(t.projects)){for(const e of t.projects)e&&e.id&&(this.levelProjects[e.id]=e);this.levelProjects[this.activeLevel]&&(this.project={...this.levelProjects[this.activeLevel]})}}catch(t){console.warn("Initial project load from HA websocket failed:",t)}if(!this.levelProjects[this.activeLevel]){const t=localStorage.getItem(`home_architect_${this.activeLevel}`);if(t)try{const e=JSON.parse(t);e&&e.id&&(this.project=e,this.levelProjects[this.activeLevel]=e)}catch{}}}updated(t){super.updated(t),t.has("hass")&&this.hass&&(this._updateCheckDone||(this._updateCheckDone=!0,this.checkUpdates()),this.syncSidebarBadge(this.updateInfo.available))}async checkUpdates(){try{const t=this.hass?.states&&(this.hass.states["update.home_architect"]||this.hass.states["update.home_architect_mise_a_jour"]);if(t){const e=t.attributes&&t.attributes.installed_version||de,i=t.attributes&&t.attributes.latest_version||e,o=!!(t.state==="on"||t.attributes&&t.attributes.update_available||this.isNewerVersion(i,e));this.updateInfo={available:o,latestVersion:i,releaseNotes:t.attributes&&t.attributes.release_summary||"Nouvelle version de Home Architect disponible.",releaseUrl:t.attributes&&t.attributes.release_url||`https://github.com/SocrateMobile/home-architect/releases/tag/v${i}`},this.syncSidebarBadge(o);return}if(this.hass?.callWS)try{const e=await this.hass.callWS({type:"home_architect/check_updates"});if(e&&e.latest_version){const i=!!(e.update_available||this.isNewerVersion(e.latest_version,de));this.updateInfo={available:i,latestVersion:e.latest_version,releaseNotes:e.release_notes||"Nouvelle version officielle disponible sur GitHub.",releaseUrl:e.release_url||`https://github.com/SocrateMobile/home-architect/releases/tag/v${e.latest_version}`},this.syncSidebarBadge(i);return}}catch{}try{const e=await fetch("https://api.github.com/repos/SocrateMobile/home-architect/releases/latest",{headers:{Accept:"application/vnd.github.v3+json"}});if(e.ok){const i=await e.json(),o=(i.tag_name||"").replace(/^[vV]/,"").trim();if(o){const s=this.isNewerVersion(o,de);this.updateInfo={available:s,latestVersion:o,releaseNotes:i.body||i.name||"Mise à jour disponible.",releaseUrl:i.html_url||`https://github.com/SocrateMobile/home-architect/releases/tag/v${o}`},this.syncSidebarBadge(s)}}}catch{}}catch(t){console.debug("Home Architect update check failed:",t)}}isNewerVersion(t,e){const i=r=>(r||"").replace(/^[vV]/,"").split(".").map(a=>parseInt(a,10)||0),o=i(t),s=i(e),n=Math.max(o.length,s.length);for(let r=0;r<n;r++){const a=o[r]||0,d=s[r]||0;if(a>d)return!0;if(a<d)return!1}return!1}syncSidebarBadge(t){try{const e=document.querySelector("home-assistant"),i=e&&e.shadowRoot&&e.shadowRoot.querySelector("home-assistant-main"),o=i&&i.shadowRoot&&i.shadowRoot.querySelector("ha-sidebar");if(!o||!o.shadowRoot)return;const n=(o.shadowRoot.querySelector("paper-listbox, ha-md-list, nav, div.menu, div.items")||o.shadowRoot).querySelectorAll("paper-icon-item, ha-md-list-item, ha-sidebar-item, a"),r=["home-architect","home_architect","home architect"];for(const a of Array.from(n)){const d=a.getAttribute("href")||a.dataset?.panel||a.dataset?.href||"",v=a.id||"",h=a.getAttribute("aria-label")||"",g=(a.textContent||"").toLowerCase();if(r.some(b=>d.toLowerCase().includes(b)||v.toLowerCase().includes(b)||h.toLowerCase().includes(b)||g.includes(b))){let b=a.querySelector(".domolink-sidebar-badge");t?b||(b=document.createElement("span"),b.className="badge domolink-sidebar-badge",b.setAttribute("slot","end"),b.setAttribute("style","background: linear-gradient(135deg, #ef4444, #f59e0b); color: white; border-radius: 9999px; padding: 2px 7px; font-size: 10px; font-weight: 800; box-shadow: 0 2px 6px rgba(239,68,68,0.4); margin-left: auto; letter-spacing: 0.5px; z-index: 10; display: inline-block;"),b.textContent="MAJ",b.setAttribute("title","Mise à jour disponible !"),a.appendChild(b)):b&&b.remove()}}}catch{}}triggerEasterEgg(){const t=this.shadowRoot||this;Ye(t)}handleLogoClick(){const t=Date.now();this.logoClickTimes=this.logoClickTimes.filter(e=>t-e<2500),this.logoClickTimes.push(t),this.logoClickTimes.length>=5&&(this.logoClickTimes=[],this.triggerEasterEgg())}openUpdateModal(){this.isUpdateModalOpen=!0}closeUpdateModal(){this.isUpdateModalOpen=!1}async executeAutoUpdate(){this.isUpdateModalOpen=!1;const t=document.createElement("div");t.id="home-architect-update-overlay",t.style.cssText="position:fixed; inset:0; background:rgba(0,0,0,0.92); backdrop-filter:blur(12px); z-index:9999999; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:24px; cursor:wait; font-family:-apple-system,BlinkMacSystemFont,sans-serif; color:#f8fafc;",t.innerHTML=`
      <div style="background:#1e293b; border:1px solid rgba(245,158,11,0.4); border-radius:20px; padding:32px; width:90vw; max-width:480px; text-align:center; box-shadow:0 30px 70px rgba(0,0,0,0.9);">
        <div style="width:60px; height:60px; border-radius:50%; background:linear-gradient(135deg, #f59e0b, #d97706); margin:0 auto 20px; display:flex; align-items:center; justify-content:center; font-size:28px; box-shadow:0 0 24px rgba(245,158,11,0.6);">
          🚀
        </div>
        <div style="font-size:18px; font-weight:800; color:#fff; margin-bottom:8px;" id="update-status-title">Mise à jour en cours...</div>
        <div style="font-size:13px; color:#94a3b8; line-height:1.6; margin-bottom:24px;" id="update-status-desc">
          Téléchargement de la release GitHub v${this.updateInfo.latestVersion} et application des fichiers...
        </div>
        <div style="width:100%; height:8px; background:rgba(255,255,255,0.1); border-radius:999px; overflow:hidden; margin-bottom:16px;">
          <div id="update-progress-bar" style="width:25%; height:100%; background:linear-gradient(90deg, #f59e0b, #10b981); border-radius:999px; transition:width 0.4s ease;"></div>
        </div>
        <div style="font-size:11px; color:#64748b; font-family:monospace;" id="update-timer-msg">Veuillez patienter sans fermer la page</div>
      </div>
    `,(this.shadowRoot||this).appendChild(t);try{this.hass?.callService?await this.hass.callService("update","install",{entity_id:"update.home_architect"}):this.hass?.callWS&&await this.hass.callWS({type:"home_architect/install_update",backup:!0})}catch{try{this.hass?.callWS&&await this.hass.callWS({type:"home_architect/install_update",backup:!0})}catch(d){console.warn("Update trigger returned error (may be restarting already):",d)}}const e=t.querySelector("#update-progress-bar"),i=t.querySelector("#update-status-title"),o=t.querySelector("#update-status-desc"),s=t.querySelector("#update-timer-msg");let n=25;const r=setInterval(()=>{n<85&&(n+=15,e&&(e.style.width=n+"%"))},1500);setTimeout(()=>{clearInterval(r),e&&(e.style.width="95%"),i&&(i.textContent="Redémarrage de Home Assistant..."),o&&(o.textContent="Fichiers mis à jour ! Reconnexion automatique au serveur en cours...");let a=0;const d=setInterval(async()=>{a++,s&&(s.textContent=`Tentative de reconnexion (${a*2}s)...`);try{(await fetch("/manifest.json",{cache:"no-store"})).ok&&(clearInterval(d),e&&(e.style.width="100%"),i&&(i.textContent="Mise à jour terminée !"),o&&(o.textContent="Rechargement de la page..."),setTimeout(()=>{window.location.reload()},1e3))}catch{}},2e3)},6e3)}disconnectedCallback(){super.disconnectedCallback(),this._boundPaste&&window.removeEventListener("paste",this._boundPaste),this._boundKeyDown&&window.removeEventListener("keydown",this._boundKeyDown),this._boundEasterEggKeyDown&&window.removeEventListener("keydown",this._boundEasterEggKeyDown),this._boundClickOutside&&window.removeEventListener("click",this._boundClickOutside),this._boundFullscreenChange&&(document.removeEventListener("fullscreenchange",this._boundFullscreenChange),document.removeEventListener("webkitfullscreenchange",this._boundFullscreenChange),document.removeEventListener("mozfullscreenchange",this._boundFullscreenChange),document.removeEventListener("MSFullscreenChange",this._boundFullscreenChange)),this._boundResize&&window.removeEventListener("resize",this._boundResize),this._boundDocumentClick&&document.removeEventListener("click",this._boundDocumentClick),this._sidebarResizeObserver&&(this._sidebarResizeObserver.disconnect(),this._sidebarResizeObserver=null),this.toastTimeout&&clearTimeout(this.toastTimeout)}showToast(t){this.toastMessage=t,this.toastTimeout&&clearTimeout(this.toastTimeout),this.toastTimeout=setTimeout(()=>{this.toastMessage=null},4500)}loadBackgroundImage(t,e="Plan chargé !"){const i=new Image;i.onload=()=>{this.pushUndoSnapshot(),this.project={...this.project,background:{imageUrl:t,opacity:.4,visible:!0,offset:{x:0,y:0},scale:1,rotation:0,widthPx:i.naturalWidth,heightPx:i.naturalHeight}},this.activeTool="calibrate",this.showToast(`${e} Tracez un segment sur un mur mesuré pour étalonner l'échelle (📏).`)},i.onerror=()=>{this.showToast("❌ Erreur lors du chargement de l'image.")},i.src=t}handleImportConfirmed(t){this.pushUndoSnapshot();const{dataUrl:e,widthPx:i,heightPx:o,opacity:s,mode:n,totalWidthMeters:r,isSvgVectorized:a,svgInterpretation:d,keepSvgBackground:v}=t.detail;if(this.isImportModalOpen=!1,a&&d&&d.success){const{walls:g,openings:l,rooms:b,pixelsPerMeter:m,stats:f}=d,S=v?{imageUrl:e,opacity:s!==void 0?s:.25,visible:!0,offset:{x:0,y:0},scale:1,rotation:0,widthPx:i,heightPx:o}:void 0;this.project={...this.project,pixelsPerMeter:m||this.project.pixelsPerMeter,walls:[...this.project.walls,...g],openings:[...this.project.openings,...l],rooms:[...this.project.rooms,...b],background:S},this.activeTool="select",this.showToast(`✨ Plan SVG converti : ${f.wallCount} mur${f.wallCount>1?"s":""}, ${f.doorCount} porte${f.doorCount>1?"s":""}, ${f.windowCount} fenêtre${f.windowCount>1?"s":""} et ${f.roomCount} pièce${f.roomCount>1?"s":""} créés !`);return}let h=this.project.pixelsPerMeter;n==="auto_dimension"&&r&&r>0&&(h=Math.round(i/r*10)/10),this.project={...this.project,pixelsPerMeter:h,background:{imageUrl:e,opacity:s!==void 0?s:.4,visible:!0,offset:{x:0,y:0},scale:1,rotation:0,widthPx:i,heightPx:o}},n==="auto_dimension"?(this.activeTool="wall",this.showToast(`✅ Plan importé et étalonné automatiquement (1 m = ${h} px) ! Vous pouvez tracer vos murs (🧱).`)):(this.activeTool="calibrate",this.showToast("📏 Plan importé ! Tracez un segment sur un mur mesuré pour étalonner l'échelle."))}handlePaste(t){if(this.isImportModalOpen||!t.clipboardData)return;const e=t.clipboardData.items;for(let o=0;o<e.length;o++)if(e[o].type.indexOf("image")!==-1){const s=e[o].getAsFile();if(s){t.preventDefault();const n=new FileReader;n.onload=r=>{const a=r.target?.result;this.loadBackgroundImage(a,"📋 Image collée depuis le presse-papier !")},n.readAsDataURL(s);return}}const i=t.clipboardData.getData("text/plain")?.trim();if(i&&(i.startsWith("<svg")||i.startsWith("<?xml")&&i.includes("<svg"))){t.preventDefault(),this.isImportModalOpen=!0,this.showToast("📥 Code SVG détecté ! Configurez la vectorisation automatique.");return}i&&(i.startsWith("data:image/")||i.match(/\.(png|jpe?g|svg|webp)(\?.*)?$/i))&&(t.preventDefault(),this.loadBackgroundImage(i,"📋 Image chargée depuis l'URL collée !"))}triggerFileInput(){if(!this.fileInputRef){const t=document.createElement("input");t.type="file",t.accept="image/*",t.style.display="none",t.addEventListener("change",e=>this.handleFileSelected(e)),document.body.appendChild(t),this.fileInputRef=t}this.fileInputRef.click()}handleFileSelected(t){const e=t.target.files?.[0];if(!e)return;const i=new FileReader;i.onload=o=>{const s=o.target?.result;this.loadBackgroundImage(s,"🖼️ Image importée depuis votre ordinateur !")},i.readAsDataURL(e)}handleRequestCalibration(t){this.calibrationData=t.detail,this.isCalibrateModalOpen=!0}handleCalibrateConfirmed(t){this.pushUndoSnapshot();const{pixelsPerMeter:e}=t.detail;this.project={...this.project,pixelsPerMeter:Math.round(e*10)/10},this.isCalibrateModalOpen=!1,this.calibrationData=null,this.activeTool="wall"}handleRequestRescale(t){this.rescaleMeasuredMeters=t.detail.measuredMeters,this.isRescaleModalOpen=!0}handleRescaleConfirmed(t){this.pushUndoSnapshot();const{currentMeters:e,targetMeters:i,scaleFactor:o,adjustBackground:s}=t.detail;if(this.isRescaleModalOpen=!1,o<=0||isNaN(o))return;const n=this.project.walls.map(l=>({...l,start:{x:y.roundMeters(l.start.x*o),y:y.roundMeters(l.start.y*o)},end:{x:y.roundMeters(l.end.x*o),y:y.roundMeters(l.end.y*o)}})),r=this.project.openings.map(l=>({...l,offset:y.roundMeters(l.offset*o),width:y.roundMeters(l.width*o)})),a=this.project.rooms.map(l=>{const b=l.polygon.map(f=>({x:y.roundMeters(f.x*o),y:y.roundMeters(f.y*o)})),m=fe.computeArea(b);return{...l,polygon:b,areaM2:m||y.roundMeters(l.areaM2*o*o)}}),d=this.project.bindings.map(l=>({...l,position:{x:y.roundMeters(l.position.x*o),y:y.roundMeters(l.position.y*o)}})),v=(this.project.furniture||[]).map(l=>({...l,position:{x:y.roundMeters(l.position.x*o),y:y.roundMeters(l.position.y*o)},width:y.roundMeters(l.width*o),length:y.roundMeters(l.length*o)}));let h=this.project.pixelsPerMeter,g=this.project.background?{...this.project.background}:void 0;s&&g&&(h=Math.round(this.project.pixelsPerMeter/o*10)/10,g.offset&&(g={...g,offset:{x:y.roundMeters(g.offset.x*o),y:y.roundMeters(g.offset.y*o)}})),this.project={...this.project,pixelsPerMeter:h,walls:n,openings:r,rooms:a,bindings:d,furniture:v,background:g},this.levelProjects[this.activeLevel]={...this.project},this.activeTool="select",this.showToast(`✅ Plan mis à l'échelle (×${o.toFixed(3)}) : ${n.length} murs et ${a.length} pièces recalculés !`)}handleOpacityChange(t){const e=parseFloat(t.target.value);this.project.background&&(this.project={...this.project,background:{...this.project.background,opacity:e}})}handleDefaultCeilingChange(t){this.project={...this.project,defaultCeilingHeight:t},this.showToast(`📐 Hauteur plafond 3D par défaut : ${t.toFixed(2)} m`)}handleSaveRoom(t){this.pushUndoSnapshot();const{roomId:e,name:i,height:o,color:s}=t.detail,n=this.project.rooms.map(r=>r.id===e?{...r,name:i,height:o,color:s}:r);this.project={...this.project,rooms:n},this.selectedRoomForEdit=null,this.showToast(`✨ Pièce "${i}" mise à jour (H: ${o.toFixed(2)} m) !`)}handleDeleteRoom(t){this.pushUndoSnapshot();const{roomId:e}=t.detail;this.project={...this.project,rooms:this.project.rooms.filter(i=>i.id!==e)},this.selectedRoomForEdit=null,this.showToast("🗑️ Pièce supprimée")}pushUndoSnapshot(t){const e=JSON.parse(JSON.stringify(t||this.project));this.undoStack=[...this.undoStack.slice(-39),e],this.redoStack=[]}handleUndo(){if(this.undoStack.length===0)return;const t=this.undoStack[this.undoStack.length-1],e=this.undoStack.slice(0,-1),i=JSON.parse(JSON.stringify(this.project));this.redoStack=[...this.redoStack.slice(-39),i],this.undoStack=e,this.project=t,this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[]},this.showToast("↩️ Action annulée")}handleRedo(){if(this.redoStack.length===0)return;const t=this.redoStack[this.redoStack.length-1],e=this.redoStack.slice(0,-1),i=JSON.parse(JSON.stringify(this.project));this.undoStack=[...this.undoStack.slice(-39),i],this.redoStack=e,this.project=t,this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[]},this.showToast("↪️ Action rétablie")}getGhostProject(){if(!this.showGhostLevel)return null;let t=null;return this.activeLevel==="etage3"?t="etage2":this.activeLevel==="etage2"?t="etage1":this.activeLevel==="etage1"?t="rdc":this.activeLevel==="rdc"&&(t="sous-sol"),t&&this.levelProjects[t]||null}handleLevelSwitch(t){if(this.activeLevel!==t){if(this.levelProjects[this.activeLevel]={...this.project},this.activeLevel=t,this.levelProjects[t])this.project={...this.levelProjects[t]};else{const e={"sous-sol":"Sous-Sol",rdc:"Rez-de-Chaussée",etage1:"1er Étage",etage2:"2ème Étage",etage3:"3ème Étage",jardin:"Jardin"};this.project={id:t,name:e[t]||t,category:t,created_at:new Date().toISOString(),updated_at:new Date().toISOString(),pixelsPerMeter:50,grid:{size:.5,subdivisions:2,snapToGrid:!0,snapToAngles:!0,snapToElements:!0},walls:[],openings:[],rooms:[],bindings:[],furniture:[]},this.levelProjects[t]={...this.project}}this.undoStack=[],this.redoStack=[],this.clearSelection(),this.showToast(`Étage sélectionné : ${this.project.name}`)}}rotateSelectedFurniture(){if(!this.selectedElements.furnitureIds||this.selectedElements.furnitureIds.length===0)return;this.pushUndoSnapshot();const t=this.selectedElements.furnitureIds,e=(this.project.furniture||[]).map(i=>t.includes(i.id)?{...i,rotation:((i.rotation||0)+90)%360}:i);this.project={...this.project,furniture:e},this.showToast("🔄 Meuble pivoté de 90°")}handleDeleteSelected(){const{wallIds:t,openingIds:e,roomIds:i,bindingIds:o,furnitureIds:s=[]}=this.selectedElements,n=t.length+e.length+i.length+o.length+s.length;if(n===0)return;this.pushUndoSnapshot();const r=this.project.walls.filter(g=>!t.includes(g.id)),a=this.project.openings.filter(g=>!e.includes(g.id)&&!t.includes(g.wallId)),d=this.project.rooms.filter(g=>!i.includes(g.id)),v=this.project.bindings.filter(g=>!o.includes(g.id)),h=(this.project.furniture||[]).filter(g=>!s.includes(g.id));this.project={...this.project,walls:r,openings:a,rooms:d,bindings:v,furniture:h},this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[]},this.showToast(`🗑️ ${n} élément${n>1?"s":""} supprimé${n>1?"s":""} !`)}clearSelection(){this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[]}}getLevelLabel(t){switch(t){case"sous-sol":return"Sous-Sol";case"rdc":return"RDC";case"etage1":return"1er Étage";case"etage2":return"2ème Étage";case"etage3":return"3ème Étage";case"jardin":return"Jardin";default:return t.toUpperCase()}}toggleDropdown(t,e){e&&e.stopPropagation(),this.activeDropdown=this.activeDropdown===t?null:t}getActiveTypology(){if(this.selectedTypologyTab)return this.selectedTypologyTab;if(this.selectedElements.bindingIds.length>0){const t=this.project.bindings.find(e=>e.id===this.selectedElements.bindingIds[0]);if(t){const e=t.entityId.split(".")[0];if(ue[e])return e}}return"light"}updateSelectedBindingIcon(t,e){if(!this.selectedElements.bindingIds||this.selectedElements.bindingIds.length===0)return;this.pushUndoSnapshot();const i=this.selectedElements.bindingIds[0],o=this.project.bindings.map(s=>s.id===i?{...s,icon:t,mdiIcon:e}:s);this.project={...this.project,bindings:o},this.showToast(`✨ Icône ${t} appliquée !`)}getSelectedSummary(){const t=[];if(this.selectedElements.wallIds.length>0&&t.push(`${this.selectedElements.wallIds.length} mur${this.selectedElements.wallIds.length>1?"s":""}`),this.selectedElements.openingIds.length>0&&t.push(`${this.selectedElements.openingIds.length} ouvrant${this.selectedElements.openingIds.length>1?"s":""}`),this.selectedElements.roomIds.length>0&&t.push(`${this.selectedElements.roomIds.length} pièce${this.selectedElements.roomIds.length>1?"s":""}`),this.selectedElements.bindingIds.length>0)if(this.selectedElements.bindingIds.length===1){const e=this.project.bindings.find(i=>i.id===this.selectedElements.bindingIds[0]);t.push(e?e.customName||e.entityId.split(".")[1]||e.entityId:"1 entité")}else t.push(`${this.selectedElements.bindingIds.length} entités`);return this.selectedElements.furnitureIds&&this.selectedElements.furnitureIds.length>0&&t.push(`${this.selectedElements.furnitureIds.length} meuble${this.selectedElements.furnitureIds.length>1?"s":""}`),t.join(", ")}handleKeyDown(t){if(t.key==="Escape"){if(this.isNewPlanModalOpen){this.isNewPlanModalOpen=!1;return}if(this.isResetModalOpen){this.isResetModalOpen=!1;return}this.isFullscreen&&this.toggleFullscreen(),this.activeDropdown&&(this.activeDropdown=null),this.clearSelection();return}const e=t.target?.tagName?.toLowerCase();e==="input"||e==="textarea"||t.target?.isContentEditable||((t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="n"?(t.preventDefault(),this.openNewPlanModal()):(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="z"&&!t.shiftKey?(t.preventDefault(),this.handleUndo()):(t.ctrlKey||t.metaKey)&&(t.key.toLowerCase()==="y"||t.key.toLowerCase()==="z"&&t.shiftKey)?(t.preventDefault(),this.handleRedo()):t.key==="Delete"||t.key==="Backspace"?this.selectedElements.wallIds.length+this.selectedElements.openingIds.length+this.selectedElements.roomIds.length+this.selectedElements.bindingIds.length+(this.selectedElements.furnitureIds?.length||0)>0&&(t.preventDefault(),this.handleDeleteSelected()):t.key.toLowerCase()==="r"?this.selectedElements.furnitureIds&&this.selectedElements.furnitureIds.length>0&&(t.preventDefault(),this.rotateSelectedFurniture()):t.key.toLowerCase()==="v"&&(this.activeTool="select"))}async toggleFullscreen(){const t=!!(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement);if(!this.isFullscreen&&!t){try{const e=this||document.documentElement;e.requestFullscreen?await e.requestFullscreen():e.webkitRequestFullscreen?await e.webkitRequestFullscreen():e.mozRequestFullScreen?await e.mozRequestFullScreen():e.msRequestFullscreen&&await e.msRequestFullscreen()}catch(e){console.warn("Mode plein écran natif indisponible, utilisation du mode étendu:",e)}this.isFullscreen=!0,this.classList.add("is-fullscreen"),this.updateSidebarOffset(),this.showToast("⛶ Mode plein écran activé (Échap pour sortir)")}else{try{const e=document;(e.fullscreenElement||e.webkitFullscreenElement||e.mozFullScreenElement||e.msFullscreenElement)&&(e.exitFullscreen?await e.exitFullscreen():e.webkitExitFullscreen?await e.webkitExitFullscreen():e.mozCancelFullScreen?await e.mozCancelFullScreen():e.msExitFullscreen&&await e.msExitFullscreen())}catch(e){console.warn("Erreur lors de la sortie du mode plein écran:",e)}this.isFullscreen=!1,this.classList.remove("is-fullscreen"),this.updateSidebarOffset(),this.showToast("🗗 Sortie du plein écran")}}openNewPlanModal(){this.newPlanName=`Plan ${this.getLevelLabel(this.activeLevel)}`,this.newPlanCategory=this.activeLevel,this.isNewPlanModalOpen=!0,this.activeDropdown=null}handleConfirmNewPlan(){this.pushUndoSnapshot();const t=this.newPlanName.trim()||"Nouveau Plan",e=this.newPlanCategory||"rdc",i=["sous-sol","rdc","etage1","etage2","etage3","jardin"],o=i.includes(e)?e:`plan_${Date.now()}`;this.project={id:o,name:t,category:e,created_at:new Date().toISOString(),updated_at:new Date().toISOString(),pixelsPerMeter:50,grid:{size:.5,subdivisions:2,snapToGrid:!0,snapToAngles:!0,snapToElements:!0},walls:[],openings:[],rooms:[],bindings:[],furniture:[]},i.includes(e)&&(this.activeLevel=e),this.levelProjects[this.activeLevel]={...this.project},this.clearSelection(),this.isNewPlanModalOpen=!1,this.showToast(`📄 Nouveau plan "${t}" créé avec succès !`),setTimeout(()=>{this.shadowRoot?.querySelector("home-architect-canvas")?.fitToScreen()},80)}openResetModal(){this.isResetModalOpen=!0,this.activeDropdown=null}handleConfirmResetPlan(){this.pushUndoSnapshot(),this.project={...this.project,walls:[],openings:[],rooms:[],bindings:[],furniture:[],background:void 0,updated_at:new Date().toISOString()},this.levelProjects[this.activeLevel]={...this.project},this.clearSelection(),this.isResetModalOpen=!1,this.showToast("🗑️ Plan effacé (Réinitialisé). Annulez avec Ctrl+Z si besoin."),setTimeout(()=>{this.shadowRoot?.querySelector("home-architect-canvas")?.fitToScreen()},80)}openSaveModal(){this.saveLoadModalTab="save",this.isSaveLoadModalOpen=!0,this.activeDropdown=null}openLoadModal(){this.saveLoadModalTab="load",this.isSaveLoadModalOpen=!0,this.activeDropdown=null}saveProject(){this.openSaveModal()}async handleSaveConfirmed(t){const{name:e,category:i}=t.detail,o=["sous-sol","rdc","etage1","etage2","etage3","jardin"];let s=this.project.id;if(o.includes(i)&&(!s||o.includes(s))?s=i:s||(s="plan_"+Date.now()),this.project={...this.project,id:s,name:e,category:i,furniture:this.project.furniture||[],updated_at:new Date().toISOString()},o.includes(i)&&(this.activeLevel=i),this.levelProjects[this.activeLevel]={...this.project},this.hass&&this.hass.callWS)try{await this.hass.callWS({type:"home_architect/save_project",project:this.project}),this.showToast(`💾 Plan "${e}" (${i}) sauvegardé avec succès dans Home Assistant !`)}catch(n){console.error("Erreur sauvegarde HA:",n);try{localStorage.setItem(`home_architect_${this.project.id}`,JSON.stringify(this.project)),this.showToast(`💾 Plan "${e}" sauvegardé localement (Mode hors-ligne).`)}catch(r){console.error("Quota localStorage dépassé:",r),this.showToast("⚠️ Échec de la sauvegarde locale (quota dépassé). Réduisez la taille de l'image de fond.")}}else try{localStorage.setItem(`home_architect_${this.project.id}`,JSON.stringify(this.project)),this.showToast(`💾 Plan "${e}" sauvegardé localement !`)}catch(n){console.error("Quota localStorage dépassé:",n),this.showToast("⚠️ Échec de la sauvegarde locale (quota dépassé). Réduisez la taille de l'image de fond.")}this.isSaveLoadModalOpen=!1}handleLoadProject(t){const e=t.detail.project;if(!e)return;this.pushUndoSnapshot(),this.project={...e,furniture:e.furniture||[]};const i=e.category||e.id;i&&["sous-sol","rdc","etage1","etage2","etage3","jardin"].includes(i)&&(this.activeLevel=i),this.levelProjects[this.activeLevel]={...this.project},this.undoStack=[],this.redoStack=[],this.clearSelection(),this.isSaveLoadModalOpen=!1,this.showToast(`📂 Plan "${e.name||e.id}" chargé avec succès !`)}render(){const t=!!this.project.background?.imageUrl;return c`
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
          <span class="brand-version" title="Version unique du composant">v${de}</span>
        </div>

        ${this.updateInfo.available?c`
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
            <button class="btn-dropdown-trigger ${this.activeDropdown==="file"?"active":""}" @click=${e=>this.toggleDropdown("file",e)}>
              <span>📁</span>
              <span>Fichier</span>
              <span class="chevron">▾</span>
            </button>
            ${this.activeDropdown==="file"?c`
              <div class="dropdown-menu-popup">
                <button class="dropdown-item" @click=${()=>this.openNewPlanModal()}>
                  <span>📄</span>
                  <span>Nouveau plan...</span>
                </button>
                <button class="dropdown-item" @click=${()=>this.openLoadModal()}>
                  <span>📂</span>
                  <span>Ouvrir / Recharger un plan...</span>
                </button>
                <button class="dropdown-item" @click=${()=>this.openSaveModal()}>
                  <span>💾</span>
                  <span>Sauvegarder le plan...</span>
                </button>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" @click=${()=>{this.isImportModalOpen=!0,this.activeDropdown=null}}>
                  <span>📥</span>
                  <span>Importer un plan...</span>
                </button>
                <button class="dropdown-item" @click=${()=>{this.isExportModalOpen=!0,this.activeDropdown=null}}>
                  <span>📤</span>
                  <span>Exporter Lovelace...</span>
                </button>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item danger" @click=${()=>this.openResetModal()}>
                  <span>🗑️</span>
                  <span>Effacer le plan (Reset)...</span>
                </button>
              </div>
            `:null}
          </div>

          <!-- 2. Menu Plan (Demande 4: Mettre à l'échelle, Vue 2D/3D, Assistant Pièce, Cotes, etc.) -->
          <div class="dropdown-menu-wrapper">
            <button class="btn-dropdown-trigger ${this.activeDropdown==="plan"?"active":""}" @click=${e=>this.toggleDropdown("plan",e)}>
              <span>📐</span>
              <span>Plan</span>
              <span class="chevron">▾</span>
            </button>
            ${this.activeDropdown==="plan"?c`
              <div class="dropdown-menu-popup" style="min-width: 250px;">
                <button class="dropdown-item ${this.activeTool==="rescale"?"active":""}" @click=${()=>{this.activeTool="rescale",this.activeDropdown=null}}>
                  <span>📐</span>
                  <span>Mettre à l'échelle (S)</span>
                  ${this.activeTool==="rescale"?c`<span class="dropdown-item-check">✓</span>`:null}
                </button>
                <button class="dropdown-item ${this.is3DMode?"active":""}" @click=${()=>{this.is3DMode=!this.is3DMode,this.activeDropdown=null}}>
                  <span>${this.is3DMode?"🧊":"📐"}</span>
                  <span>${this.is3DMode?"Vue 3D (Active)":"Vue 2D / 3D"}</span>
                  ${this.is3DMode?c`<span class="dropdown-item-check">✓</span>`:null}
                </button>
                <button class="dropdown-item" @click=${()=>{this.isWizardOpen=!0,this.activeDropdown=null}}>
                  <span>🪄</span>
                  <span>Assistant Pièce</span>
                </button>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item ${this.showDimensions?"active":""}" @click=${()=>{this.showDimensions=!this.showDimensions}}>
                  <span>📏</span>
                  <span>Cotes dynamiques</span>
                  ${this.showDimensions?c`<span class="dropdown-item-check">✓</span>`:null}
                </button>
                <button class="dropdown-item ${this.showThermalHeatmap?"active":""}" @click=${()=>{this.showThermalHeatmap=!this.showThermalHeatmap}}>
                  <span>🌡️</span>
                  <span>Carte thermique</span>
                  ${this.showThermalHeatmap?c`<span class="dropdown-item-check">✓</span>`:null}
                </button>
                <button class="dropdown-item ${this.showGhostLevel?"active":""}" @click=${()=>{this.showGhostLevel=!this.showGhostLevel}}>
                  <span>👁️</span>
                  <span>Filigrane niveau inf.</span>
                  ${this.showGhostLevel?c`<span class="dropdown-item-check">✓</span>`:null}
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
                  ${this.isFullscreen?c`<span class="dropdown-item-check">✓</span>`:null}
                </button>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item danger" @click=${()=>this.openResetModal()}>
                  <span>🗑️</span>
                  <span>Effacer le plan (Reset)...</span>
                </button>
              </div>
            `:null}
          </div>

          <!-- 3. Menu Pièce (Sous-Sol, RDC, 1er Étage, 2ème Étage, 3ème Étage, Jardin) -->
          <div class="dropdown-menu-wrapper">
            <button class="btn-dropdown-trigger ${this.activeDropdown==="level"?"active":""}" @click=${e=>this.toggleDropdown("level",e)}>
              <span>🏢</span>
              <span>Pièce : <strong>${this.getLevelLabel(this.activeLevel)}</strong></span>
              <span class="chevron">▾</span>
            </button>
            ${this.activeDropdown==="level"?c`
              <div class="dropdown-menu-popup">
                <button class="dropdown-item ${this.activeLevel==="sous-sol"?"active":""}" @click=${()=>{this.handleLevelSwitch("sous-sol"),this.activeDropdown=null}}>
                  <span>🏠</span>
                  <span>Sous-Sol</span>
                  ${this.activeLevel==="sous-sol"?c`<span class="dropdown-item-check">✓</span>`:null}
                </button>
                <button class="dropdown-item ${this.activeLevel==="rdc"?"active":""}" @click=${()=>{this.handleLevelSwitch("rdc"),this.activeDropdown=null}}>
                  <span>🏠</span>
                  <span>RDC (Rez-de-Chaussée)</span>
                  ${this.activeLevel==="rdc"?c`<span class="dropdown-item-check">✓</span>`:null}
                </button>
                <button class="dropdown-item ${this.activeLevel==="etage1"?"active":""}" @click=${()=>{this.handleLevelSwitch("etage1"),this.activeDropdown=null}}>
                  <span>🏠</span>
                  <span>1er Étage</span>
                  ${this.activeLevel==="etage1"?c`<span class="dropdown-item-check">✓</span>`:null}
                </button>
                <button class="dropdown-item ${this.activeLevel==="etage2"?"active":""}" @click=${()=>{this.handleLevelSwitch("etage2"),this.activeDropdown=null}}>
                  <span>🏠</span>
                  <span>2ème Étage</span>
                  ${this.activeLevel==="etage2"?c`<span class="dropdown-item-check">✓</span>`:null}
                </button>
                <button class="dropdown-item ${this.activeLevel==="etage3"?"active":""}" @click=${()=>{this.handleLevelSwitch("etage3"),this.activeDropdown=null}}>
                  <span>🏠</span>
                  <span>3ème Étage</span>
                  ${this.activeLevel==="etage3"?c`<span class="dropdown-item-check">✓</span>`:null}
                </button>
                <button class="dropdown-item ${this.activeLevel==="jardin"?"active":""}" @click=${()=>{this.handleLevelSwitch("jardin"),this.activeDropdown=null}}>
                  <span>🌳</span>
                  <span>Jardin</span>
                  ${this.activeLevel==="jardin"?c`<span class="dropdown-item-check">✓</span>`:null}
                </button>
              </div>
            `:null}
          </div>
        </div>

        <div class="top-controls">
          <!-- Historique Annuler / Rétablir -->
          <div class="control-group" style="padding: 2px 4px; gap: 4px;">
            <button 
              class="btn-history" 
              @click=${this.handleUndo} 
              ?disabled=${this.undoStack.length===0}
              title="Annuler la dernière action (Ctrl+Z / Cmd+Z)"
            >
              ↩️ Annuler
            </button>
            <button 
              class="btn-history" 
              @click=${this.handleRedo} 
              ?disabled=${this.redoStack.length===0}
              title="Rétablir l'action (Ctrl+Y / Cmd+Shift+Z)"
            >
              ↪️ Rétablir
            </button>
          </div>

          <!-- Épaisseur mur contextuelle -->
          ${this.activeTool==="wall"?c`
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
          ${this.activeTool==="door"||this.activeTool==="window"||this.activeTool==="french_window"?c`
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
          ${this.is3DMode?c`
            <div class="control-group" title="Hauteur sous plafond par défaut (3D)">
              <label>Plafond 3D :</label>
              <select @change=${e=>this.handleDefaultCeilingChange(parseFloat(e.target.value))}>
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
          ${t?c`
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

          <!-- Sauvegarde Directe -->
          <button class="btn-primary" @click=${this.saveProject}>
            💾 Sauvegarder
          </button>
        </div>
      </header>

      <div class="workspace">
        <div class="canvas-area">
          <home-architect-toolbar 
            .activeTool=${this.activeTool}
            .currentThickness=${this.currentThickness}
            .doorFlipSide=${this.doorFlipSide}
            .doorFlipDirection=${this.doorFlipDirection}
            .windowSashCount=${this.windowSashCount}
            .canUndo=${this.undoStack.length>0}
            .canRedo=${this.redoStack.length>0}
            @undo=${this.handleUndo}
            @redo=${this.handleRedo}
            @tool-selected=${this.handleToolSelected}
            @door-config-changed=${this.handleDoorConfigChanged}
            @window-config-changed=${this.handleWindowConfigChanged}
            @wall-thickness-changed=${this.handleWallThicknessChanged}
            @open-wizard=${()=>this.isWizardOpen=!0}
            @open-import-modal=${()=>this.isImportModalOpen=!0}
            @trigger-upload-background=${()=>this.isImportModalOpen=!0}
          ></home-architect-toolbar>

          <home-architect-canvas
            .hass=${this.hass}
            .project=${this.project}
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
            .ghostProject=${this.getGhostProject()}
            @selection-changed=${e=>{if(this.selectedElements=e.detail.selectedElements,this.selectedElements.bindingIds.length>0){const i=this.project.bindings.find(o=>o.id===this.selectedElements.bindingIds[0]);if(i){const o=i.entityId.split(".")[0];ue[o]&&(this.selectedTypologyTab=o)}this.isIconPickerOpen=!0}}}
            @request-delete-selected=${this.handleDeleteSelected}
            @toggle-3d=${e=>this.is3DMode=e.detail.is3DMode}
            @room-selected=${e=>this.selectedRoomForEdit=e.detail.room}
            @project-changed=${this.handleProjectChanged}
            @request-calibration=${this.handleRequestCalibration}
            @request-rescale=${this.handleRequestRescale}
            @background-image-loaded=${e=>this.loadBackgroundImage(e.detail.dataUrl,"🖼️ Image de plan glissée-déposée !")}
          ></home-architect-canvas>

          <!-- Floating HUD de sélection multi-éléments repositionné en bas -->
          ${(()=>{if(!(this.selectedElements.wallIds.length+this.selectedElements.openingIds.length+this.selectedElements.roomIds.length+this.selectedElements.bindingIds.length+(this.selectedElements.furnitureIds?.length||0)>0))return null;const i=this.selectedElements.bindingIds.length>0?this.project.bindings.find(o=>o.id===this.selectedElements.bindingIds[0]):null;return c`
              <div class="selection-hud">
                <div class="selection-hud-main">
                  <span class="selection-info">
                    <span>🎯</span>
                    <span>${this.getSelectedSummary()}</span>
                  </span>

                  ${this.selectedElements.wallIds.length>0?c`
                    <div class="hud-options-group">
                      <span class="hud-label">Épaisseur :</span>
                      <button class="hud-opt-btn ${this.currentThickness===.1?"active":""}" @click=${()=>this.updateSelectedWallsThickness(.1)} title="Cloison 10 cm">Fin 10cm</button>
                      <button class="hud-opt-btn ${this.currentThickness===.2?"active":""}" @click=${()=>this.updateSelectedWallsThickness(.2)} title="Standard 20 cm">Moyen 20cm</button>
                      <button class="hud-opt-btn ${this.currentThickness===.3?"active":""}" @click=${()=>this.updateSelectedWallsThickness(.3)} title="Porteur 30 cm">Gros 30cm</button>
                    </div>
                  `:null}

                  ${this.selectedElements.openingIds.some(o=>this.project.openings.find(s=>s.id===o)?.type==="door")?c`
                    <div class="hud-options-group">
                      <span class="hud-label">Porte :</span>
                      <button class="hud-opt-btn ${!this.doorFlipSide&&this.doorFlipDirection?"active":""}" @click=${()=>this.updateSelectedDoorConfig(!1,!0)} title="Ouverture Droite Intérieure (Poussant Droit)">Droite Int.</button>
                      <button class="hud-opt-btn ${!this.doorFlipSide&&!this.doorFlipDirection?"active":""}" @click=${()=>this.updateSelectedDoorConfig(!1,!1)} title="Ouverture Gauche Intérieure (Poussant Gauche)">Gauche Int.</button>
                      <button class="hud-opt-btn ${this.doorFlipSide&&!this.doorFlipDirection?"active":""}" @click=${()=>this.updateSelectedDoorConfig(!0,!1)} title="Ouverture Gauche Extérieure (Tirant Gauche)">Gauche Ext.</button>
                      <button class="hud-opt-btn ${this.doorFlipSide&&this.doorFlipDirection?"active":""}" @click=${()=>this.updateSelectedDoorConfig(!0,!0)} title="Ouverture Droite Extérieure (Tirant Droit)">Droite Ext.</button>
                    </div>
                  `:null}

                  ${this.selectedElements.openingIds.some(o=>{const s=this.project.openings.find(n=>n.id===o);return s&&(s.type==="window"||s.type==="french_window")})?c`
                    <div class="hud-options-group">
                      <span class="hud-label">Fenêtre :</span>
                      <button class="hud-opt-btn ${this.windowSashCount===1?"active":""}" @click=${()=>this.updateSelectedWindowConfig("window",1,.9)} title="Fenêtre 1 ouvrant (90 cm)">1 Ouvrant</button>
                      <button class="hud-opt-btn ${this.windowSashCount===2?"active":""}" @click=${()=>this.updateSelectedWindowConfig("window",2,1.4)} title="Fenêtre 2 battants (1.40 m)">2 Battants</button>
                      <button class="hud-opt-btn" @click=${()=>this.updateSelectedWindowConfig("french_window",2,2)} title="Baie vitrée coulissante (2.00 m)">Baie vitrée</button>
                    </div>
                  `:null}

                  ${(this.selectedElements.furnitureIds?.length||0)>0?c`
                    <div class="hud-options-group">
                      <span class="hud-label">Meuble :</span>
                      <button class="hud-opt-btn active" @click=${this.rotateSelectedFurniture} title="Pivoter les meubles de 90° (Touche R)">🔄 Pivoter 90° (R)</button>
                    </div>
                  `:null}

                  ${i?c`
                    <div class="hud-options-group">
                      <button 
                        class="hud-opt-btn ${this.isIconPickerOpen?"active":""}" 
                        @click=${()=>this.isIconPickerOpen=!this.isIconPickerOpen}
                        title="Choisir l'icône pour le plan et la card Lovelace"
                      >
                        <span style="font-size: 1.05rem;">${i.icon||"🎨"}</span>
                        <span>Choisir l'icône ${this.isIconPickerOpen?"▴":"▾"}</span>
                      </button>
                    </div>
                  `:null}

                  <button class="btn-delete-selection" @click=${this.handleDeleteSelected} title="Supprimer les éléments sélectionnés (Touche Suppr / Retour)">
                    <span>🗑️</span>
                    <span>Supprimer</span>
                  </button>
                  <button class="btn-clear-selection" @click=${this.clearSelection} title="Désélectionner tout (Échap)">
                    ✕
                  </button>
                </div>

                <!-- Onglet / Palette Choisir l'icône pour l'entité sélectionnée -->
                ${i&&this.isIconPickerOpen?c`
                  <div class="hud-icon-picker-panel">
                    <div class="icon-category-tabs">
                      ${Object.entries(ue).map(([o,s])=>c`
                        <button 
                          class="icon-category-tab ${this.getActiveTypology()===o?"active":""}"
                          @click=${()=>this.selectedTypologyTab=o}
                        >
                          ${s.tabLabel}
                        </button>
                      `)}
                    </div>

                    <div class="icon-grid">
                      ${(ue[this.getActiveTypology()]||ue.light).icons.map(o=>c`
                        <button 
                          class="icon-item-btn ${i.icon===o.icon?"active":""}"
                          @click=${()=>this.updateSelectedBindingIcon(o.icon,o.mdi)}
                          title="${o.label} (${o.mdi})"
                        >
                          <span class="icon-item-emoji">${o.icon}</span>
                          <span>${o.label}</span>
                        </button>
                      `)}
                    </div>

                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 0.78rem; color: #94a3b8; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 4px;">
                      <span>Icône active : <strong style="color: #38bdf8;">${i.icon||"Défaut"}</strong> (${i.mdiIcon||"Automatique"})</span>
                      <div style="display: flex; align-items: center; gap: 4px;">
                        <span>Saisie libre :</span>
                        <input 
                          type="text" 
                          style="width: 55px; background: rgba(30, 41, 59, 0.9); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 6px; color: #fff; padding: 2px 4px; font-size: 0.85rem; text-align: center;" 
                          placeholder="Emoji"
                          maxlength="4"
                          @keydown=${o=>{if(o.key==="Enter"){const s=o.target.value.trim();s&&this.updateSelectedBindingIcon(s)}}}
                          @change=${o=>{const s=o.target.value.trim();s&&this.updateSelectedBindingIcon(s)}}
                        />
                      </div>
                    </div>
                  </div>
                `:null}
              </div>
            `})()}

          <!-- Notification Toast -->
          ${this.toastMessage?c`
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
      ${this.isImportModalOpen?c`
        <home-architect-import-modal
          .currentLevel=${this.activeLevel}
          @import-confirmed=${this.handleImportConfirmed}
          @close=${()=>this.isImportModalOpen=!1}
        ></home-architect-import-modal>
      `:null}

      <!-- Modal Assistant Pièce Débutant -->
      ${this.isWizardOpen?c`
        <home-architect-wizard-modal
          @create-room=${this.handleCreateRoomFromWizard}
          @close=${()=>this.isWizardOpen=!1}
        ></home-architect-wizard-modal>
      `:null}

      <!-- Modal Propriétés de la Pièce (Hauteur sous plafond 3D, etc.) -->
      ${this.selectedRoomForEdit?c`
        <home-architect-room-modal
          .room=${this.selectedRoomForEdit}
          @save-room=${this.handleSaveRoom}
          @delete-room=${this.handleDeleteRoom}
          @close=${()=>this.selectedRoomForEdit=null}
        ></home-architect-room-modal>
      `:null}

      <!-- Modal Étalonnage Mesure de Mur -->
      ${this.isCalibrateModalOpen&&this.calibrationData?c`
        <home-architect-calibrate-modal
          .pixelDistance=${this.calibrationData.pixelDistance}
          .defaultMeters=${this.calibrationData.defaultMeters}
          @calibrate-confirmed=${this.handleCalibrateConfirmed}
          @close=${()=>this.isCalibrateModalOpen=!1}
        ></home-architect-calibrate-modal>
      `:null}

      <!-- Modal Mettre à l'échelle (Recalcul de toutes les cotes) -->
      ${this.isRescaleModalOpen?c`
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
      ${this.isExportModalOpen?c`
        <home-architect-export-modal
          .project=${this.project}
          .hass=${this.hass}
          @close=${()=>this.isExportModalOpen=!1}
        ></home-architect-export-modal>
      `:null}

      <!-- Modal Sauvegarder & Recharger un Plan -->
      ${this.isSaveLoadModalOpen?c`
        <home-architect-save-load-modal
          .hass=${this.hass}
          .project=${this.project}
          .initialTab=${this.saveLoadModalTab}
          @save-confirmed=${this.handleSaveConfirmed}
          @load-project=${this.handleLoadProject}
          @close=${()=>this.isSaveLoadModalOpen=!1}
        ></home-architect-save-load-modal>
      `:null}

      <!-- Modal Nouveau Plan -->
      ${this.isNewPlanModalOpen?c`
        <div class="modal-backdrop" @click=${e=>{e.target===e.currentTarget&&(this.isNewPlanModalOpen=!1)}}>
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
                  @input=${e=>this.newPlanName=e.target.value}
                  placeholder="Ex: Mon Appartement, RDC..."
                  autofocus
                />
              </div>

              <div class="dialog-form-group">
                <label class="dialog-label">Catégorie / Niveau :</label>
                <div class="category-grid">
                  ${me.map(e=>c`
                    <button
                      type="button"
                      class="category-btn ${this.newPlanCategory===e.id?"active":""}"
                      @click=${()=>this.newPlanCategory=e.id}
                    >
                      <span>${e.icon}</span>
                      <span>${e.label}</span>
                    </button>
                  `)}
                </div>
              </div>
            </div>
            <div class="modal-dialog-footer">
              <button class="btn-dialog-cancel" @click=${()=>this.isNewPlanModalOpen=!1}>Annuler</button>
              <button class="btn-dialog-confirm primary" @click=${()=>this.handleConfirmNewPlan()}>
                <span>✨</span>
                <span>Créer le plan</span>
              </button>
            </div>
          </div>
        </div>
      `:null}

      <!-- Modal Effacer le Plan (Reset) -->
      ${this.isResetModalOpen?c`
        <div class="modal-backdrop" @click=${e=>{e.target===e.currentTarget&&(this.isResetModalOpen=!1)}}>
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
                (<strong>${this.project.name||this.getLevelLabel(this.activeLevel)}</strong>) ?
              </p>

              <div class="reset-summary-box">
                <div>🧱 <strong>Murs :</strong> ${this.project.walls.length}</div>
                <div>🚪 <strong>Ouvrants :</strong> ${this.project.openings.length}</div>
                <div>🏷️ <strong>Pièces :</strong> ${this.project.rooms.length}</div>
                <div>⚡ <strong>Entités HA :</strong> ${this.project.bindings.length}</div>
                <div>🛋️ <strong>Meubles :</strong> ${this.project.furniture?.length||0}</div>
                <div>🖼️ <strong>Image de fond :</strong> ${this.project.background?.imageUrl?"Oui":"Non"}</div>
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

      <!-- Modal Information & Lancement Mise à jour (DomoLink Suite) -->
      ${this.isUpdateModalOpen?c`
        <div class="modal-backdrop" @click=${e=>{e.target===e.currentTarget&&this.closeUpdateModal()}}>
          <div class="modal-dialog" style="max-width: 540px; border-color: rgba(245, 158, 11, 0.45); box-shadow: 0 25px 60px rgba(0,0,0,0.8), 0 0 25px rgba(245, 158, 11, 0.25);">
            <div class="modal-dialog-header" style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.05)); border-bottom: 1px solid rgba(245, 158, 11, 0.25);">
              <div class="modal-dialog-title-group">
                <span class="modal-dialog-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: #fff; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; border-radius: 10px; font-size: 20px;">🚀</span>
                <div>
                  <h3 class="modal-dialog-title" style="color: #fff;">Mise à jour Home Architect</h3>
                  <p class="modal-dialog-subtitle" style="color: #94a3b8;">Nouvelle version officielle disponible</p>
                </div>
              </div>
              <button class="btn-dialog-close" @click=${()=>this.closeUpdateModal()}>✕</button>
            </div>

            <div class="modal-dialog-body" style="gap: 16px;">
              <!-- Comparateur de version -->
              <div style="display: flex; align-items: center; justify-content: space-around; background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 12px;">
                <div style="text-align: center;">
                  <div style="font-size: 11px; color: #94a3b8; font-weight: 600; text-transform: uppercase; margin-bottom: 4px;">Version installée</div>
                  <div style="font-size: 16px; font-weight: 800; color: #fff; font-family: monospace;">v${de}</div>
                </div>
                <div style="color: #f59e0b; font-size: 18px; font-weight: 800;">➔</div>
                <div style="text-align: center;">
                  <div style="font-size: 11px; color: #f59e0b; font-weight: 600; text-transform: uppercase; margin-bottom: 4px;">Nouvelle version</div>
                  <div style="font-size: 16px; font-weight: 800; color: #10b981; font-family: monospace;">v${this.updateInfo.latestVersion}</div>
                </div>
              </div>

              <!-- Changelog / Notes de version -->
              <div>
                <div style="font-size: 12px; font-weight: 700; color: #f1f5f9; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                  <span>📋</span> Notes de version & Nouveautés GitHub :
                </div>
                <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 12px; max-height: 160px; overflow-y: auto; font-size: 12px; color: #cbd5e1; line-height: 1.5; white-space: pre-wrap; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">${this.updateInfo.releaseNotes||"Mise à jour officielle de Home Architect."}</div>
              </div>

              <!-- Note de sécurité -->
              <div style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 10px; padding: 10px 12px; display: flex; align-items: flex-start; gap: 8px; font-size: 11.5px; color: #f8fafc; line-height: 1.45;">
                <span style="font-size: 16px;">💡</span>
                <div>
                  L'installation remplace les fichiers par la release officielle GitHub, applique une sauvegarde préalable de sécurité, puis <strong>redémarre automatiquement Home Assistant</strong>.
                </div>
              </div>
            </div>

            <div class="modal-dialog-footer" style="justify-content: space-between;">
              <a href="${this.updateInfo.releaseUrl||"https://github.com/SocrateMobile/home-architect/releases"}" target="_blank" rel="noopener" style="font-size: 12px; color: #38bdf8; text-decoration: none; display: flex; align-items: center; gap: 4px;">
                <span>🔗</span> Voir sur GitHub
              </a>
              <div style="display: flex; align-items: center; gap: 10px;">
                <button class="btn-dialog-cancel" @click=${()=>this.closeUpdateModal()}>Annuler</button>
                <button 
                  class="btn-dialog-confirm" 
                  style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; border: none; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4);"
                  @click=${()=>this.executeAutoUpdate()}
                >
                  <span>🚀</span>
                  <span>Confirmer et Mettre à jour</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `:null}
    `}};k.styles=Q`
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
  `;$([_({type:Object})],k.prototype,"hass",2);$([_({type:Boolean})],k.prototype,"narrow",2);$([p()],k.prototype,"activeTool",2);$([p()],k.prototype,"currentThickness",2);$([p()],k.prototype,"currentOpeningWidth",2);$([p()],k.prototype,"doorFlipSide",2);$([p()],k.prototype,"doorFlipDirection",2);$([p()],k.prototype,"windowSashCount",2);$([p()],k.prototype,"activeLevel",2);$([p()],k.prototype,"showDimensions",2);$([p()],k.prototype,"showThermalHeatmap",2);$([p()],k.prototype,"showGhostLevel",2);$([p()],k.prototype,"levelProjects",2);$([p()],k.prototype,"is3DMode",2);$([p()],k.prototype,"isFullscreen",2);$([p()],k.prototype,"isDrawerCollapsed",2);$([p()],k.prototype,"isWizardOpen",2);$([p()],k.prototype,"isImportModalOpen",2);$([p()],k.prototype,"isExportModalOpen",2);$([p()],k.prototype,"isSaveLoadModalOpen",2);$([p()],k.prototype,"isNewPlanModalOpen",2);$([p()],k.prototype,"newPlanName",2);$([p()],k.prototype,"newPlanCategory",2);$([p()],k.prototype,"isResetModalOpen",2);$([p()],k.prototype,"saveLoadModalTab",2);$([p()],k.prototype,"isCalibrateModalOpen",2);$([p()],k.prototype,"calibrationData",2);$([p()],k.prototype,"isRescaleModalOpen",2);$([p()],k.prototype,"rescaleMeasuredMeters",2);$([p()],k.prototype,"selectedRoomForEdit",2);$([p()],k.prototype,"selectedElements",2);$([p()],k.prototype,"activeDropdown",2);$([p()],k.prototype,"selectedTypologyTab",2);$([p()],k.prototype,"isIconPickerOpen",2);$([p()],k.prototype,"updateInfo",2);$([p()],k.prototype,"isUpdateModalOpen",2);$([p()],k.prototype,"undoStack",2);$([p()],k.prototype,"redoStack",2);$([p()],k.prototype,"project",2);$([p()],k.prototype,"toastMessage",2);k=$([ee("home-architect-panel")],k);Se("panel");
