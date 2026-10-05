import{i as p,n as l,r as n,a as f,b as h,t as u,c as g}from"./chunks/version-Dl216f42.js";var b=Object.defineProperty,v=Object.getOwnPropertyDescriptor,a=(e,t,o,r)=>{for(var s=r>1?void 0:r?v(t,o):t,c=e.length-1,d;c>=0;c--)(d=e[c])&&(s=(r?d(t,o,s):d(s))||s);return r&&s&&b(t,o,s),s};let i=class extends f{constructor(){super(...arguments),this.project={id:"rdc",name:"Plan",created_at:new Date().toISOString(),updated_at:new Date().toISOString(),pixelsPerMeter:50,grid:{size:.5,subdivisions:2,snapToGrid:!1,snapToAngles:!1,snapToElements:!1},walls:[],openings:[],rooms:[],bindings:[]},this.is3DMode=!1,this._projectLoaded=!1}setConfig(e){if(!e)throw new Error("Configuration invalide");this.config=e,this.is3DMode=e.view_mode==="3d",e.height&&this.style.setProperty("--card-custom-height",e.height)}getCardSize(){return 6}firstUpdated(){this.loadProject()}updated(e){super.updated(e),e.has("hass")&&!this._projectLoaded&&this.hass&&(this._projectLoaded=!0,this.loadProject())}async loadProject(){const e=this.config?.project_id||"rdc";if(this.hass&&this.hass.callWS)try{const r=(await this.hass.callWS({type:"home_architect/get_projects"}))?.projects?.find(s=>s.id===e);if(r){this.project=r;return}}catch(o){console.warn("WebSocket get_projects échoué, essai localStorage:",o)}const t=localStorage.getItem(`home_architect_${e}`);if(t)try{this.project=JSON.parse(t)}catch{}}handleMoreInfo(e){const t=new CustomEvent("hass-more-info",{detail:e.detail,bubbles:!0,composed:!0});this.dispatchEvent(t)}render(){const e=this.config?.show_header!==!1;return h`
      ${e?h`
        <div class="card-header">
          <div class="card-title">${this.config?.title||this.project.name||"Home Architect"}</div>
          <button class="view-toggle" @click=${()=>this.is3DMode=!this.is3DMode}>
            ${this.is3DMode?"🧊 3D":"📐 2D"}
          </button>
        </div>
      `:null}

      <div class="canvas-wrapper">
        <home-architect-canvas
          .hass=${this.hass}
          .project=${this.project}
          .activeTool=${"select"}
          .is3DMode=${this.is3DMode}
          .isDashboardMode=${!0}
          @hass-more-info=${this.handleMoreInfo}
        ></home-architect-canvas>
      </div>
    `}};i.styles=p`
    :host {
      display: block;
      height: var(--card-custom-height, 480px);
      position: relative;
      background: #0f172a;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      color: #f8fafc;
    }

    .card-header {
      position: absolute;
      top: 12px;
      left: 16px;
      right: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 10;
      pointer-events: none;
    }

    .card-title {
      font-size: 1rem;
      font-weight: 700;
      color: #f8fafc;
      background: rgba(30, 41, 59, 0.85);
      backdrop-filter: blur(8px);
      padding: 6px 14px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      pointer-events: auto;
    }

    .view-toggle {
      background: rgba(30, 41, 59, 0.85);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 4px 10px;
      font-size: 0.8rem;
      font-weight: 600;
      color: #38bdf8;
      cursor: pointer;
      pointer-events: auto;
      transition: all 0.2s ease;
    }

    .view-toggle:hover {
      background: #0284c7;
      color: #ffffff;
    }

    .canvas-wrapper {
      width: 100%;
      height: 100%;
    }
  `;a([l({type:Object})],i.prototype,"hass",2);a([n()],i.prototype,"config",2);a([n()],i.prototype,"project",2);a([n()],i.prototype,"is3DMode",2);i=a([u("home-architect-card")],i);window.customCards=window.customCards||[];window.customCards.push({type:"home-architect-card",name:"Home Architect Card",description:"Affichez votre plan de maison interactif 2D/3D avec états des entités en temps réel.",preview:!0});g("card");
