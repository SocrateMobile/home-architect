import{i as U,a as z,l as j,D as v,g as B,c as O,t as $,s as V,f as G,r as C,A as _,b as a,n as P,d as u,e as F,P as W,h as X}from"./chunks/version-C3ICoODz.js";const J=(function(){const e=typeof document<"u"&&document.createElement("link").relList;return e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"})(),Y=function(r,e){return new URL(r,e).href},k={},K=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){let L=function(d){return Promise.all(d.map(f=>Promise.resolve(f).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};const l=document.getElementsByTagName("link"),h=document.querySelector("meta[property=csp-nonce]"),I=h?.nonce||h?.getAttribute("nonce");s=L(t.map(d=>{if(d=Y(d,i),d in k)return;k[d]=!0;const f=d.endsWith(".css"),g=f?'[rel="stylesheet"]':"";if(i)for(let m=l.length-1;m>=0;m--){const b=l[m];if(b.href===d&&(!f||b.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${g}`))return;const p=document.createElement("link");if(p.rel=f?"stylesheet":J,f||(p.as="script"),p.crossOrigin="",p.href=d,I&&p.setAttribute("nonce",I),document.head.appendChild(p),f)return new Promise((m,b)=>{p.addEventListener("load",m),p.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(l){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=l,window.dispatchEvent(h),!h.defaultPrevented)throw l}return s.then(l=>{for(const h of l||[])h.status==="rejected"&&o(h.reason);return e().catch(o)})};var Q=Object.defineProperty,c=(r,e,t,i)=>{for(var s=void 0,o=r.length-1,l;o>=0;o--)(l=r[o])&&(s=l(e,t,s)||s);return s&&Q(e,t,s),s};const S=480,Z="https://github.com/SocrateMobile/home-architect#readme",E="--home-architect-card-height",ee=56,R=8,D=4,T=[5e3,15e3,3e4,6e4],y=8,A=/^(\d+(?:\.\d+)?|\.\d+)([a-z%]+)$/i,te=/^(\d+(?:\.\d+)?|\.\d+)$/;function re(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function q(r){return typeof r=="string"?r:JSON.stringify(r)??typeof r}function ie(r){if(!/^(?:[\d.]|(?:calc|min|max|clamp|var)\()/i.test(r))return!1;const e=A.exec(r);return e&&Number(e[1])<=0?!1:typeof CSS<"u"&&typeof CSS.supports=="function"?CSS.supports("height",r):e!==null&&/^(px|r?em|%|[sdl]?v(h|w|min|max)|ch|ex|cm|mm|in|pt|pc)$/i.test(e[2])}function N(r){if(r==null)return;if(typeof r=="number"){if(Number.isFinite(r)&&r>0)return`${r}px`;throw new Error(`height invalide : ${r} (nombre de pixels supérieur à 0 attendu).`)}if(typeof r!="string")throw new Error("height doit être un nombre de pixels ou une longueur CSS (ex. 480, 480px, 60vh).");const e=r.trim();if(e!==""){if(te.test(e)){if(Number(e)>0)return`${Number(e)}px`;throw new Error(`height invalide : « ${e} » (nombre de pixels supérieur à 0 attendu).`)}if(ie(e))return e;throw new Error(`height invalide : « ${e} » (exemples valides : 480, 480px, 60vh, calc(100vh - 200px)).`)}}function se(r){if(r==null||r==="")return;const e=typeof r=="number"&&Number.isInteger(r)?String(r):r;if(typeof e!="string"||!W.test(e.trim()))throw new Error(`project_id invalide : « ${q(r)} » (lettres, chiffres, « _ » et « - », 64 caractères au plus).`);return e.trim()}function oe(r){if(r!=null){if(typeof r=="number")return String(r);if(typeof r!="string")throw new Error("title doit être un texte.");return r.trim()===""?void 0:r}}function ne(r){if(r==null||r==="")return"2d";const e=typeof r=="string"?r.trim().toLowerCase():r;if(e==="2d"||e==="3d")return e;throw new Error(`view_mode invalide : « ${q(r)} » (valeurs possibles : 2d, 3d).`)}function w(r,e){const t=r[e];if(t!=null){if(typeof t=="boolean")return t;throw new Error(`${e} doit valoir true ou false.`)}}function ae(r){if(!re(r))throw new Error("Configuration invalide : un objet YAML est attendu.");return{projectId:se(r.project_id),title:oe(r.title),height:N(r.height),viewMode:ne(r.view_mode),showHeader:w(r,"show_header")??!0,showDimensions:w(r,"show_dimensions")??!1,showHeatmap:w(r,"show_heatmap")}}function H(r){const e=r?A.exec(r):null;if(!e)return S;const t=Number(e[1]);switch(e[2].toLowerCase()){case"px":return t;case"em":case"rem":return t*16;case"vh":case"svh":case"dvh":case"lvh":return t/100*(window.innerHeight||800);default:return S}}const x=class x extends U{constructor(){super(...arguments),this._status="loading",this._is3DMode=!1,this._loadSeq=0,this._liveUnsupported=!1,this._retryCount=0,this._entityIdsCache=[]}static async getStubConfig(e){try{const t=await j(e);return t.length>0?{project_id:t[0].id}:{}}catch{return{}}}static async getConfigElement(){await K(()=>import("./chunks/card-editor-BognhAeq.js"),[],import.meta.url);const e=document.createElement("home-architect-card-editor");return e.parseHeight=N,e}setConfig(e){const t=ae(e),i=this._config;this._config=t,(!i||i.viewMode!==t.viewMode)&&(this._is3DMode=t.viewMode==="3d"),t.height?this.style.setProperty(E,t.height):this.style.removeProperty(E),i&&(i.projectId??v)!==(t.projectId??v)&&this._resetProject()}getCardSize(){return Math.ceil(H(this._config?.height)/50)}getGridOptions(){const e=H(this._config?.height),t=Math.ceil((e+R)/(ee+R));return{columns:12,rows:Math.max(D,t),min_rows:D}}connectedCallback(){super.connectedCallback(),this.hasUpdated&&(this._syncBackground(),this._sync())}disconnectedCallback(){super.disconnectedCallback(),this._loadSeq++,this._requestedId=void 0,this._clearRetry(),this._unsubscribe(),this._releaseBackground()}shouldUpdate(e){if(e.size!==1||!e.has("hass"))return!0;const t=e.get("hass"),i=this.hass;return!t||!i||t.connected!==i.connected||t.themes!==i.themes||t.language!==i.language||t.locale!==i.locale||t.user!==i.user?!0:this._entityIds.some(s=>t.states?.[s]!==i.states?.[s])}willUpdate(e){if(super.willUpdate(e),!e.has("hass")&&!e.has("_config"))return;const t=e.get("hass"),i=e.has("hass")&&t?.connected===!1&&this.hass?.connected!==!1;i&&(this._liveUnsupported=!1),this._sync({reload:i})}get _entityIds(){const e=this._project;if(e!==this._entityIdsSource){this._entityIdsSource=e;const t=new Set;for(const i of e?.bindings??[])t.add(i.entityId);for(const i of e?.openings??[])i.entityId&&t.add(i.entityId);this._entityIdsCache=[...t]}return this._entityIdsCache}get _projectId(){return this._config?.projectId??v}_sync(e={}){if(!this.isConnected||!this.hass||!this._config)return;const t=this._projectId,i=this._retryTimer!==void 0&&!e.reload;this._subscription?.projectId!==t&&!this._liveUnsupported&&!i&&this._subscribe(t),(e.reload||this._requestedId!==t)&&this._load()}_resetProject(){this._loadSeq++,this._requestedId=void 0,this._retryCount=0,this._clearRetry(),this._unsubscribe(),this._releaseBackground(),this._project=void 0,this._status="loading",this._error=void 0,this._warning=void 0,this._available=void 0}async _load(){const e=this.hass,t=this._projectId,i=++this._loadSeq;this._requestedId=t,this._clearRetry(),this._project?.id!==t&&(this._status="loading");try{const s=await B(e,t);if(i!==this._loadSeq)return;if(!s){await this._showNotFound(i);return}const o=this._project?.id!==s.id;this._project=O(s,this.hass?.states),this._status="loaded",this._error=void 0,this._warning=void 0,this._resetRetryIfHealthy(),this._syncBackground(),o&&this._fitWhenRendered()}catch(s){if(i!==this._loadSeq)return;const o=$(s).message;this._project?.id===t?this._warning=o:(this._status="error",this._error=o),this._scheduleRetry()}}async _showNotFound(e){this._project=void 0,this._releaseBackground(),this._status="not-found",this._warning=void 0,this._available=void 0,this._resetRetryIfHealthy();try{const t=await j(this.hass);e===this._loadSeq&&(this._available=t)}catch{}}_onProjectEvent(e){if(e.deleted){this._loadSeq++,this._clearRetry(),this._project=void 0,this._releaseBackground(),this._status="deleted",this._warning=void 0;return}this._status==="loaded"&&e.revision!==0&&e.revision===this._project?.revision||this._load()}async _subscribe(e){this._unsubscribe();const t={projectId:e};this._subscription=t;try{const i=await V(this.hass,e,s=>{this._subscription===t&&this._onProjectEvent(s)});if(this._subscription!==t){i();return}t.unsubscribe=i,this._resetRetryIfHealthy()}catch(i){if(this._subscription!==t)return;this._subscription=void 0;const s=$(i);if(s.code==="unknown_command"){this._liveUnsupported=!0,this._resetRetryIfHealthy();return}console.warn("[home-architect] Abonnement aux mises à jour du plan impossible :",s),this._scheduleRetry()}}_unsubscribe(){const e=this._subscription;this._subscription=void 0,e?.unsubscribe?.()}_scheduleRetry(){if(this._retryTimer!==void 0||!this.isConnected)return;const e=T[Math.min(this._retryCount,T.length-1)];this._retryCount++,this._retryTimer=window.setTimeout(()=>{this._retryTimer=void 0,this._sync({reload:!0})},e)}_resetRetryIfHealthy(){const e=this._status==="loaded"||this._status==="not-found"||this._status==="deleted",t=this._liveUnsupported||this._subscription?.unsubscribe!==void 0;e&&this._warning===void 0&&t&&(this._retryCount=0)}_clearRetry(){this._retryTimer!==void 0&&(window.clearTimeout(this._retryTimer),this._retryTimer=void 0)}_syncBackground(){const e=this._project,t=e?.background,i=e&&this.isConnected&&t?.visible!==!1?t?.assetId:void 0;if(i===this._background?.assetId||(this._releaseBackground(),!e||!i))return;const s={assetId:i,acquired:!1,active:!0};this._background=s,G(this.hass,e.id,i).then(o=>{s.acquired=!0,s.active?this._backgroundSrc=o:C(i)},o=>{s.active&&(this._background=void 0,console.warn("[home-architect] Image de fond du plan indisponible :",o))})}_releaseBackground(){const e=this._background;this._background=void 0,this._backgroundSrc=void 0,e&&(e.active=!1,e.acquired&&C(e.assetId))}async _fitWhenRendered(){await this.updateComplete;const e=this.renderRoot.querySelector("home-architect-canvas");e&&(await e.updateComplete,e.isConnected&&e.getBoundingClientRect().width>0&&e.fitToScreen())}_setViewMode(e){this._is3DMode=e}_onToggle3d(e){this._is3DMode=typeof e.detail?.is3DMode=="boolean"?e.detail.is3DMode:!this._is3DMode}_retry(){this._retryCount=0,this._sync({reload:!0})}render(){const e=this._config;if(!e)return _;const t=this._project,i=e.title??t?.name;return a`
      <ha-card>
        ${e.showHeader?this._renderHeader(i,!!t):_}
        <div class="content">
          ${t?this._renderCanvas(t,e):this._renderMessage()}
          ${t&&this._warning?a`<ha-alert class="stale" alert-type="warning">Plan non actualisé : ${this._warning}</ha-alert>`:_}
        </div>
      </ha-card>
    `}_renderHeader(e,t){return a`
      <div class="card-header">
        <h2 class="card-title">${e??"Home Architect"}</h2>
        ${t?a`
          <div class="view-toggle" role="group" aria-label="Mode d'affichage du plan">
            <button type="button" aria-pressed=${String(!this._is3DMode)} title="Vue en plan 2D" @click=${()=>this._setViewMode(!1)}>2D</button>
            <button type="button" aria-pressed=${String(this._is3DMode)} title="Vue 3D isométrique" @click=${()=>this._setViewMode(!0)}>3D</button>
          </div>
        `:_}
      </div>
    `}_renderCanvas(e,t){return a`
      <home-architect-canvas
        .hass=${this.hass}
        .project=${e}
        .activeTool=${"select"}
        .is3DMode=${this._is3DMode}
        .isDashboardMode=${!0}
        .interactive=${!1}
        .readOnly=${!0}
        .showDimensions=${t.showDimensions}
        .showThermalHeatmap=${t.showHeatmap??e.showThermalHeatmap??!1}
        .backgroundSrc=${this._backgroundSrc}
        @toggle-3d=${this._onToggle3d}
      ></home-architect-canvas>
    `}_renderMessage(){const e=this._projectId;switch(this._status){case"not-found":return this._renderNotFound(e);case"deleted":return a`
          <div class="message">
            <ha-alert alert-type="warning">Le plan « ${e} » a été supprimé.</ha-alert>
            <p>Choisissez un autre plan dans l'éditeur de la carte.</p>
          </div>
        `;case"error":return a`
          <div class="message">
            <ha-alert alert-type="error">Impossible de charger le plan « ${e} » : ${this._error}</ha-alert>
            <p>Nouvel essai automatique dans quelques instants.</p>
            <button type="button" class="retry" @click=${this._retry}>Réessayer</button>
          </div>
        `;default:return a`
          <div class="message loading" role="status">
            <span class="spinner" aria-hidden="true"></span>
            <span>Chargement du plan…</span>
          </div>
        `}}_renderNotFound(e){const t=this._config?.projectId!==void 0,i=this._available,s=this._liveUnsupported?"puis rechargez la page":"la carte s'actualisera d'elle-même";return a`
      <div class="message">
        <ha-alert alert-type="warning">
          ${t?`Plan « ${e} » introuvable sur le serveur.`:"Aucun plan n'est sélectionné pour cette carte."}
        </ha-alert>
        <p>
          ${t?`S'il vient d'être dessiné, enregistrez-le depuis le studio Home Architect (${s}) ; sinon, choisissez un autre plan dans l'éditeur de la carte.`:"Choisissez un plan dans l'éditeur de la carte (option project_id)."}
        </p>
        ${i===void 0?_:i.length===0?a`<p>Aucun plan n'est encore enregistré.</p>`:a`
            <p>Plans disponibles :</p>
            <ul>
              ${i.slice(0,y).map(o=>a`<li><code>${o.id}</code> — ${o.name}</li>`)}
            </ul>
            ${i.length>y?a`<p>… et ${i.length-y} autre(s).</p>`:_}
          `}
      </div>
    `}};x.styles=z`
    :host {
      display: block;
    }

    /* Vue « sections » : la grille fixe la hauteur (lignes réglables dans l'interface). */
    :host([layout='grid']) {
      height: 100%;
    }

    ha-card {
      display: flex;
      flex-direction: column;
      /* Variable HEIGHT_VAR (option height), défaut DEFAULT_CARD_HEIGHT_PX. */
      height: var(--home-architect-card-height, 480px);
      overflow: hidden;
      position: relative;
      box-sizing: border-box;
    }

    :host([layout='grid']) ha-card {
      height: 100%;
      min-height: 200px;
    }

    /* Repli hors de Home Assistant (ha-card non défini) : mêmes variables de thème. */
    ha-card:not(:defined) {
      background: var(--ha-card-background, var(--card-background-color, #fff));
      border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, #e0e0e0));
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: var(--ha-card-box-shadow, none);
      color: var(--primary-text-color);
    }

    .card-header {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      min-height: 48px;
      padding: 6px 12px 6px 16px;
      box-sizing: border-box;
      border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
    }

    .card-title {
      margin: 0;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 1.1rem;
      font-weight: 500;
      line-height: 1.4;
      color: var(--ha-card-header-color, var(--primary-text-color));
    }

    .view-toggle {
      flex: none;
      display: inline-flex;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 18px;
      overflow: hidden;
    }

    .view-toggle button {
      min-width: 44px;
      min-height: 32px;
      padding: 0 12px;
      border: none;
      background: transparent;
      color: var(--secondary-text-color);
      font: inherit;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
    }

    .view-toggle button[aria-pressed='true'] {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }

    .view-toggle button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }

    .content {
      flex: 1 1 auto;
      min-height: 0;
      position: relative;
    }

    home-architect-canvas {
      display: block;
      width: 100%;
      height: 100%;
    }

    .message {
      box-sizing: border-box;
      height: 100%;
      overflow: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;
      padding: 16px;
      color: var(--primary-text-color);
    }

    .message p,
    .message ul {
      margin: 0;
    }

    .message ul {
      padding-left: 20px;
    }

    .message code {
      font-family: var(--code-font-family, monospace);
    }

    .loading {
      align-items: center;
      flex-direction: row;
      justify-content: center;
      color: var(--secondary-text-color);
    }

    .spinner {
      width: 18px;
      height: 18px;
      border: 2px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-top-color: var(--primary-color);
      border-radius: 50%;
      animation: spin 0.9s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .spinner {
        animation: none;
      }
    }

    /* Repli de ha-alert hors de Home Assistant. */
    ha-alert:not(:defined) {
      display: block;
      padding: 8px 12px;
      border-left: 4px solid var(--warning-color, #ffa600);
      border-radius: 4px;
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
    }

    ha-alert[alert-type='error']:not(:defined) {
      border-left-color: var(--error-color, #db4437);
    }

    .stale {
      position: absolute;
      top: 8px;
      left: 8px;
      right: 8px;
      z-index: 1;
    }

    .retry {
      align-self: flex-start;
      min-height: 36px;
      padding: 0 16px;
      border: 1px solid var(--primary-color);
      border-radius: 18px;
      background: transparent;
      color: var(--primary-color);
      font: inherit;
      font-weight: 500;
      cursor: pointer;
    }

    .retry:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
  `;let n=x;c([P({attribute:!1})],n.prototype,"hass");c([P({type:String,reflect:!0})],n.prototype,"layout");c([u()],n.prototype,"_config");c([u()],n.prototype,"_project");c([u()],n.prototype,"_status");c([u()],n.prototype,"_error");c([u()],n.prototype,"_warning");c([u()],n.prototype,"_available");c([u()],n.prototype,"_backgroundSrc");c([u()],n.prototype,"_is3DMode");c([u()],n.prototype,"_liveUnsupported");F("home-architect-card",n);const M=window.customCards??=[];M.some(r=>r?.type==="home-architect-card")||M.push({type:"home-architect-card",name:"Home Architect Card",description:"Affichez votre plan de maison interactif 2D/3D avec états des entités en temps réel.",preview:!0,documentationURL:Z});X("card");
