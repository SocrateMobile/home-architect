import{r as $,i as E,L as M,u as q,a as L,l as b,_ as P,D as p,b as N,s as R,c as z,g as U,d as B,t as y,e as F,f as O,h as w,A as h,j as a,k as d,m as V,n as A,o as l,p as G,P as W,q as X}from"./chunks/version-BTWCWNRA.js";$("fr",{"card.picker.description":"Affichez votre plan de maison interactif 2D/3D avec états des entités en temps réel.","card.config.not_object":"Configuration invalide : un objet YAML est attendu.","card.config.height_number_invalid":"height invalide : {value} (nombre de pixels supérieur à 0 attendu).","card.config.height_type":"height doit être un nombre de pixels ou une longueur CSS (ex. 480, 480px, 60vh).","card.config.height_not_positive":"height invalide : « {value} » (nombre de pixels supérieur à 0 attendu).","card.config.height_invalid":"height invalide : « {value} » (exemples valides : 480, 480px, 60vh, calc(100vh - 200px)).","card.config.project_id_invalid":"project_id invalide : « {value} » (lettres, chiffres, « _ » et « - », 64 caractères au plus).","card.config.title_type":"title doit être un texte.","card.config.view_mode_invalid":"view_mode invalide : « {value} » (valeurs possibles : 2d, 3d).","card.config.theme_invalid":"theme invalide : « {value} » (valeurs possibles : auto, light, dark).","card.config.boolean_type":"{key} doit valoir true ou false.","card.header.view_mode":"Mode d'affichage du plan","card.header.view_2d":"Vue en plan 2D","card.header.view_3d":"Vue 3D isométrique","card.stale":"Plan non actualisé : {error}","card.loading":"Chargement du plan…","card.deleted":"Le plan « {id} » a été supprimé.","card.choose_other":"Choisissez un autre plan dans l'éditeur de la carte.","card.load_error":"Impossible de charger le plan « {id} » : {error}","card.retry_soon":"Nouvel essai automatique dans quelques instants.","card.retry":"Réessayer","card.not_found.title":"Plan « {id} » introuvable sur le serveur.","card.not_found.none_selected":"Aucun plan n'est sélectionné pour cette carte.","card.not_found.hint":"S'il vient d'être dessiné, enregistrez-le depuis le studio Home Architect ({refresh}) ; sinon, choisissez un autre plan dans l'éditeur de la carte.","card.not_found.refresh_reload":"puis rechargez la page","card.not_found.refresh_live":"la carte s'actualisera d'elle-même","card.not_found.choose":"Choisissez un plan dans l'éditeur de la carte (option project_id).","card.not_found.no_projects":"Aucun plan n'est encore enregistré.","card.not_found.available":"Plans disponibles :","card.not_found.more":"… et {count} autre(s).","card.editor.project":"Plan","card.editor.loading_projects":"Chargement des plans…","card.editor.choose_project":"Choisir un plan…","card.editor.project_missing":"{id} (introuvable)","card.editor.list_error":"Liste des plans indisponible ({error}). Saisissez l'identifiant du plan (project_id).","card.editor.reload_list":"Recharger la liste","card.editor.no_projects":"Aucun plan enregistré : dessinez puis enregistrez un plan dans le studio Home Architect.","card.editor.server_only":"Seuls les plans enregistrés sur le serveur sont proposés.","card.editor.title":"Titre","card.editor.title_placeholder":"Nom du plan","card.editor.title_help":"Laissez vide pour afficher le nom du plan.","card.editor.height":"Hauteur","card.editor.height_help":"Nombre de pixels ou longueur CSS (480, 480px, 60vh…). Dans la vue « sections », la hauteur suit la grille.","card.editor.view_mode":"Vue initiale","card.editor.view_2d":"Plan 2D","card.editor.view_3d":"3D isométrique","card.editor.heatmap":"Carte thermique des pièces","card.editor.heatmap_project":"Selon le réglage du plan","card.editor.heatmap_on":"Afficher","card.editor.heatmap_off":"Masquer","card.editor.theme":"Couleurs du plan","card.editor.theme_auto":"Automatique (suit le thème de Home Assistant)","card.editor.theme_dark":"Sombres","card.editor.theme_light":"Claires","card.editor.invalid_value":"{value} (valeur invalide)","card.editor.show_header":"Afficher l'en-tête (titre et bascule 2D/3D)","card.editor.show_dimensions":"Afficher les cotes des murs","card.editor.show_controls":"Afficher les commandes de la vue (zoom, rotation, 2D/3D)","card.editor.animations":"Animer les entités (mouvement détecté, ventilateurs, lecture en cours)","card.editor.animations_help":"Le réglage « Réduire les animations » de l'appareil les désactive dans tous les cas."});$("en",{"card.picker.description":"Display your interactive 2D/3D home floor plan with live entity states.","card.config.not_object":"Invalid configuration: a YAML object is expected.","card.config.height_number_invalid":"Invalid height: {value} (expected a number of pixels greater than 0).","card.config.height_type":"height must be a number of pixels or a CSS length (e.g. 480, 480px, 60vh).","card.config.height_not_positive":'Invalid height: "{value}" (expected a number of pixels greater than 0).',"card.config.height_invalid":'Invalid height: "{value}" (valid examples: 480, 480px, 60vh, calc(100vh - 200px)).',"card.config.project_id_invalid":'Invalid project_id: "{value}" (letters, digits, "_" and "-", 64 characters at most).',"card.config.title_type":"title must be text.","card.config.view_mode_invalid":'Invalid view_mode: "{value}" (allowed values: 2d, 3d).',"card.config.theme_invalid":'Invalid theme: "{value}" (allowed values: auto, light, dark).',"card.config.boolean_type":"{key} must be true or false.","card.header.view_mode":"Floor plan view mode","card.header.view_2d":"2D floor plan view","card.header.view_3d":"Isometric 3D view","card.stale":"Floor plan not refreshed: {error}","card.loading":"Loading floor plan…","card.deleted":'The floor plan "{id}" has been deleted.',"card.choose_other":"Choose another floor plan in the card editor.","card.load_error":'Unable to load the floor plan "{id}": {error}',"card.retry_soon":"Retrying automatically in a few moments.","card.retry":"Retry","card.not_found.title":'Floor plan "{id}" not found on the server.',"card.not_found.none_selected":"No floor plan is selected for this card.","card.not_found.hint":"If it was just drawn, save it from the Home Architect studio ({refresh}); otherwise, choose another floor plan in the card editor.","card.not_found.refresh_reload":"then reload the page","card.not_found.refresh_live":"the card will refresh on its own","card.not_found.choose":"Choose a floor plan in the card editor (project_id option).","card.not_found.no_projects":"No floor plan has been saved yet.","card.not_found.available":"Available floor plans:","card.not_found.more":"… and {count} more.","card.editor.project":"Floor plan","card.editor.loading_projects":"Loading floor plans…","card.editor.choose_project":"Choose a floor plan…","card.editor.project_missing":"{id} (not found)","card.editor.list_error":"Floor plan list unavailable ({error}). Enter the floor plan ID (project_id).","card.editor.reload_list":"Reload list","card.editor.no_projects":"No saved floor plans: draw and save a floor plan in the Home Architect studio.","card.editor.server_only":"Only floor plans saved on the server are listed.","card.editor.title":"Title","card.editor.title_placeholder":"Floor plan name","card.editor.title_help":"Leave empty to show the floor plan name.","card.editor.height":"Height","card.editor.height_help":"Number of pixels or CSS length (480, 480px, 60vh…). In the sections view, the height follows the grid.","card.editor.view_mode":"Initial view","card.editor.view_2d":"2D floor plan","card.editor.view_3d":"Isometric 3D","card.editor.heatmap":"Room heatmap","card.editor.heatmap_project":"Use the floor plan setting","card.editor.heatmap_on":"Show","card.editor.heatmap_off":"Hide","card.editor.theme":"Floor plan colors","card.editor.theme_auto":"Automatic (follows the Home Assistant theme)","card.editor.theme_dark":"Dark","card.editor.theme_light":"Light","card.editor.invalid_value":"{value} (invalid value)","card.editor.show_header":"Show header (title and 2D/3D toggle)","card.editor.show_dimensions":"Show wall dimensions","card.editor.show_controls":"Show view controls (zoom, rotation, 2D/3D)","card.editor.animations":"Animate entities (detected motion, fans, media playing)","card.editor.animations_help":'The device "Reduce motion" setting always turns them off.'});var Y=Object.defineProperty,c=(r,e,t,i)=>{for(var o=void 0,s=r.length-1,v;s>=0;s--)(v=r[s])&&(o=v(e,t,o)||o);return o&&Y(e,t,o),o};const x=480,J="https://github.com/SocrateMobile/home-architect#readme",j="--home-architect-card-height",K=56,I=8,C=4,D=[5e3,15e3,3e4,6e4],_=8,Q=["auto","light","dark"],H=/^(\d+(?:\.\d+)?|\.\d+)([a-z%]+)$/i,Z=/^(\d+(?:\.\d+)?|\.\d+)$/;function f(r=!1){if(typeof document>"u")return;const t=document.querySelector("home-assistant")?.hass?.language,i=typeof t=="string"&&t!==""?t:document.documentElement.lang||(r&&typeof navigator<"u"?navigator.language:"");i&&R(i)}f(!0);function ee(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function g(r){return typeof r=="string"?r:JSON.stringify(r)??typeof r}function te(r){if(!/^(?:[\d.]|(?:calc|min|max|clamp|var)\()/i.test(r))return!1;const e=H.exec(r);return e&&Number(e[1])<=0?!1:typeof CSS<"u"&&typeof CSS.supports=="function"?CSS.supports("height",r):e!==null&&/^(px|r?em|%|[sdl]?v(h|w|min|max)|ch|ex|cm|mm|in|pt|pc)$/i.test(e[2])}function T(r){if(r==null)return;if(typeof r=="number"){if(Number.isFinite(r)&&r>0)return`${r}px`;throw new Error(a("card.config.height_number_invalid",{value:String(r)}))}if(typeof r!="string")throw new Error(a("card.config.height_type"));const e=r.trim();if(e!==""){if(Z.test(e)){if(Number(e)>0)return`${Number(e)}px`;throw new Error(a("card.config.height_not_positive",{value:e}))}if(te(e))return e;throw new Error(a("card.config.height_invalid",{value:e}))}}function re(r){if(r==null||r==="")return;const e=typeof r=="number"&&Number.isInteger(r)?String(r):r;if(typeof e!="string"||!W.test(e.trim()))throw new Error(a("card.config.project_id_invalid",{value:g(r)}));return e.trim()}function ie(r){if(r!=null){if(typeof r=="number")return String(r);if(typeof r!="string")throw new Error(a("card.config.title_type"));return r.trim()===""?void 0:r}}function oe(r){if(r==null||r==="")return"2d";const e=typeof r=="string"?r.trim().toLowerCase():r;if(e==="2d"||e==="3d")return e;throw new Error(a("card.config.view_mode_invalid",{value:g(r)}))}function ae(r){if(r==null||r==="")return"auto";const e=typeof r=="string"?r.trim().toLowerCase():r,t=Q.find(i=>i===e);if(t)return t;throw new Error(a("card.config.theme_invalid",{value:g(r)}))}function u(r,e){const t=r[e];if(t!=null){if(typeof t=="boolean")return t;throw new Error(a("card.config.boolean_type",{key:e}))}}function se(r){if(!ee(r))throw new Error(a("card.config.not_object"));return{projectId:re(r.project_id),title:ie(r.title),height:T(r.height),viewMode:oe(r.view_mode),showHeader:u(r,"show_header")??!0,showDimensions:u(r,"show_dimensions")??!1,showHeatmap:u(r,"show_heatmap"),showControls:u(r,"show_controls")??!0,animations:u(r,"animations")??!0,theme:ae(r.theme)}}function S(r){const e=r?H.exec(r):null;if(!e)return x;const t=Number(e[1]);switch(e[2].toLowerCase()){case"px":return t;case"em":case"rem":return t*16;case"vh":case"svh":case"dvh":case"lvh":return t/100*(window.innerHeight||800);default:return x}}const m=class m extends E{constructor(){super(...arguments),this._status="loading",this._is3DMode=!1,this._loadSeq=0,this._liveUnsupported=!1,this._retryCount=0,this._entityIdsCache=[],this._i18n=new M(this)}static async getStubConfig(e){try{const t=await b(e);return t.length>0?{project_id:t[0].id}:{}}catch{return{}}}static async getConfigElement(){await P(()=>import("./chunks/card-editor-DklMeAkV.js"),[],import.meta.url);const e=document.createElement("home-architect-card-editor");return e.parseHeight=T,e}setConfig(e){this.hass||f();const t=se(e),i=this._config;this._config=t,(!i||i.viewMode!==t.viewMode)&&(this._is3DMode=t.viewMode==="3d"),t.height?this.style.setProperty(j,t.height):this.style.removeProperty(j),i&&(i.projectId??p)!==(t.projectId??p)&&this._resetProject()}getCardSize(){return Math.ceil(S(this._config?.height)/50)}getGridOptions(){const e=S(this._config?.height),t=Math.ceil((e+I)/(K+I));return{columns:12,rows:Math.max(C,t),min_rows:C}}connectedCallback(){super.connectedCallback(),this.hasUpdated&&(this._syncBackground(),this._sync())}disconnectedCallback(){super.disconnectedCallback(),this._loadSeq++,this._requestedId=void 0,this._clearRetry(),this._unsubscribe(),this._releaseBackground()}shouldUpdate(e){if(e.has(N)||e.size!==1||!e.has("hass"))return!0;const t=e.get("hass"),i=this.hass;return!t||!i||t.connected!==i.connected||t.themes!==i.themes||t.language!==i.language||t.locale!==i.locale||t.user!==i.user?!0:this._entityIds.some(o=>t.states?.[o]!==i.states?.[o])}willUpdate(e){if(super.willUpdate(e),!e.has("hass")&&!e.has("_config"))return;const t=e.get("hass");e.has("hass")&&this.hass&&(t?.language!==this.hass.language&&R(this.hass.language),t?.themes!==this.hass.themes&&z(this,this.hass));const i=e.has("hass")&&t?.connected===!1&&this.hass?.connected!==!1;i&&(this._liveUnsupported=!1),this._sync({reload:i})}get _entityIds(){const e=this._project;if(e!==this._entityIdsSource){this._entityIdsSource=e;const t=new Set;for(const i of e?.bindings??[])t.add(i.entityId);for(const i of e?.openings??[])i.entityId&&t.add(i.entityId);this._entityIdsCache=[...t]}return this._entityIdsCache}get _projectId(){return this._config?.projectId??p}_sync(e={}){if(!this.isConnected||!this.hass||!this._config)return;const t=this._projectId,i=this._retryTimer!==void 0&&!e.reload;this._subscription?.projectId!==t&&!this._liveUnsupported&&!i&&this._subscribe(t),(e.reload||this._requestedId!==t)&&this._load()}_resetProject(){this._loadSeq++,this._requestedId=void 0,this._retryCount=0,this._clearRetry(),this._unsubscribe(),this._releaseBackground(),this._project=void 0,this._status="loading",this._error=void 0,this._warning=void 0,this._available=void 0}async _load(){const e=this.hass,t=this._projectId,i=++this._loadSeq;this._requestedId=t,this._clearRetry(),this._project?.id!==t&&(this._status="loading");try{const o=await U(e,t);if(i!==this._loadSeq)return;if(!o){await this._showNotFound(i);return}const s=this._project?.id!==o.id;this._project=B(o,this.hass?.states),this._status="loaded",this._error=void 0,this._warning=void 0,this._resetRetryIfHealthy(),this._syncBackground(),s&&this._fitWhenRendered()}catch(o){if(i!==this._loadSeq)return;const s=y(o).message;this._project?.id===t?this._warning=s:(this._status="error",this._error=s),this._scheduleRetry()}}async _showNotFound(e){this._project=void 0,this._releaseBackground(),this._status="not-found",this._warning=void 0,this._available=void 0,this._resetRetryIfHealthy();try{const t=await b(this.hass);e===this._loadSeq&&(this._available=t)}catch{}}_onProjectEvent(e){if(e.deleted){this._loadSeq++,this._clearRetry(),this._project=void 0,this._releaseBackground(),this._status="deleted",this._warning=void 0;return}this._status==="loaded"&&e.revision!==0&&e.revision===this._project?.revision||this._load()}async _subscribe(e){this._unsubscribe();const t={projectId:e};this._subscription=t;try{const i=await F(this.hass,e,o=>{this._subscription===t&&this._onProjectEvent(o)});if(this._subscription!==t){i();return}t.unsubscribe=i,this._resetRetryIfHealthy()}catch(i){if(this._subscription!==t)return;this._subscription=void 0;const o=y(i);if(o.code==="unknown_command"){this._liveUnsupported=!0,this._resetRetryIfHealthy();return}console.warn("[home-architect] Abonnement aux mises à jour du plan impossible :",o),this._scheduleRetry()}}_unsubscribe(){const e=this._subscription;this._subscription=void 0,e?.unsubscribe?.()}_scheduleRetry(){if(this._retryTimer!==void 0||!this.isConnected)return;const e=D[Math.min(this._retryCount,D.length-1)];this._retryCount++,this._retryTimer=window.setTimeout(()=>{this._retryTimer=void 0,this._sync({reload:!0})},e)}_resetRetryIfHealthy(){const e=this._status==="loaded"||this._status==="not-found"||this._status==="deleted",t=this._liveUnsupported||this._subscription?.unsubscribe!==void 0;e&&this._warning===void 0&&t&&(this._retryCount=0)}_clearRetry(){this._retryTimer!==void 0&&(window.clearTimeout(this._retryTimer),this._retryTimer=void 0)}_syncBackground(){const e=this._project,t=e?.background,i=e&&this.isConnected&&t?.visible!==!1?t?.assetId:void 0;if(i===this._background?.assetId||(this._releaseBackground(),!e||!i))return;const o={assetId:i,acquired:!1,active:!0};this._background=o,O(this.hass,e.id,i).then(s=>{o.acquired=!0,o.active?this._backgroundSrc=s:w(i)},s=>{o.active&&(this._background=void 0,console.warn("[home-architect] Image de fond du plan indisponible :",s))})}_releaseBackground(){const e=this._background;this._background=void 0,this._backgroundSrc=void 0,e&&(e.active=!1,e.acquired&&w(e.assetId))}async _fitWhenRendered(){await this.updateComplete;const e=this.renderRoot.querySelector("home-architect-canvas");e&&(await e.updateComplete,e.isConnected&&e.getBoundingClientRect().width>0&&e.fitToScreen())}_setViewMode(e){this._is3DMode=e}_onToggle3d(e){this._is3DMode=typeof e.detail?.is3DMode=="boolean"?e.detail.is3DMode:!this._is3DMode}_retry(){this._retryCount=0,this._sync({reload:!0})}render(){const e=this._config;if(!e)return h;const t=this._project,i=e.title??t?.name;return d`
      <ha-card>
        ${e.showHeader?this._renderHeader(i,!!t):h}
        <div class="content">
          ${t?this._renderCanvas(t,e):this._renderMessage()}
          ${t&&this._warning?d`<ha-alert class="stale" alert-type="warning">${a("card.stale",{error:this._warning})}</ha-alert>`:h}
        </div>
      </ha-card>
    `}_renderHeader(e,t){const i=a("card.header.view_2d"),o=a("card.header.view_3d");return d`
      <div class="card-header">
        <h2 class="card-title">${e??"Home Architect"}</h2>
        ${t?d`
          <div class="view-toggle" role="group" aria-label=${a("card.header.view_mode")}>
            <button type="button" aria-pressed=${String(!this._is3DMode)} aria-label=${i} title=${i} @click=${()=>this._setViewMode(!1)}>2D</button>
            <button type="button" aria-pressed=${String(this._is3DMode)} aria-label=${o} title=${o} @click=${()=>this._setViewMode(!0)}>3D</button>
          </div>
        `:h}
      </div>
    `}_renderCanvas(e,t){return d`
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
        .showControls=${t.showControls}
        .animations=${t.animations}
        .theme=${t.theme}
        .backgroundSrc=${this._backgroundSrc}
        @toggle-3d=${this._onToggle3d}
      ></home-architect-canvas>
    `}_renderMessage(){const e=this._projectId;switch(this._status){case"not-found":return this._renderNotFound(e);case"deleted":return d`
          <div class="message">
            <ha-alert alert-type="warning">${a("card.deleted",{id:e})}</ha-alert>
            <p>${a("card.choose_other")}</p>
          </div>
        `;case"error":return d`
          <div class="message">
            <ha-alert alert-type="error">${a("card.load_error",{id:e,error:this._error??""})}</ha-alert>
            <p>${a("card.retry_soon")}</p>
            <button type="button" class="retry" @click=${this._retry}>${a("card.retry")}</button>
          </div>
        `;default:return d`
          <div class="message loading" role="status">
            <span class="spinner" aria-hidden="true"></span>
            <span>${a("card.loading")}</span>
          </div>
        `}}_renderNotFound(e){const t=this._config?.projectId!==void 0,i=this._available,o=a(this._liveUnsupported?"card.not_found.refresh_reload":"card.not_found.refresh_live");return d`
      <div class="message">
        <ha-alert alert-type="warning">
          ${t?a("card.not_found.title",{id:e}):a("card.not_found.none_selected")}
        </ha-alert>
        <p>
          ${t?a("card.not_found.hint",{refresh:o}):a("card.not_found.choose")}
        </p>
        ${i===void 0?h:i.length===0?d`<p>${a("card.not_found.no_projects")}</p>`:d`
            <p>${a("card.not_found.available")}</p>
            <ul>
              ${i.slice(0,_).map(s=>d`<li><code>${s.id}</code> — ${s.name}</li>`)}
            </ul>
            ${i.length>_?d`<p>${a("card.not_found.more",{count:V(i.length-_)})}</p>`:h}
          `}
      </div>
    `}};m.styles=[q,L`
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

    /* Repli hors de Home Assistant (ha-card non défini) : mêmes variables que ha-card, puis jetons du thème. */
    ha-card:not(:defined) {
      background: var(--ha-card-background, var(--arch-ui-surface));
      border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--arch-ui-border));
      border-radius: var(--arch-ui-radius);
      box-shadow: var(--ha-card-box-shadow, none);
      color: var(--arch-ui-text);
      font-family: var(--arch-ui-font);
    }

    .card-header {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      min-height: 48px;
      padding-block: 6px;
      padding-inline: 16px 12px;
      box-sizing: border-box;
      border-bottom: 1px solid var(--arch-ui-border);
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
      color: var(--ha-card-header-color, var(--arch-ui-text));
    }

    .view-toggle {
      flex: none;
      display: inline-flex;
      border: 1px solid var(--arch-ui-border);
      border-radius: 18px;
      overflow: hidden;
    }

    .view-toggle button {
      min-width: 44px;
      min-height: 32px;
      padding: 0 12px;
      border: none;
      background: transparent;
      color: var(--arch-ui-text-muted);
      font: inherit;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
    }

    /* Anneau intérieur : le conteneur arrondi (overflow: hidden) rognerait un anneau extérieur. */
    .view-toggle button:focus-visible {
      outline: 2px solid var(--arch-ui-accent);
      outline-offset: -2px;
      box-shadow: none;
    }

    /* Vue active : texte principal sur fond secondaire (contraste suffisant quelle que soit la couleur
       primaire du thème), soulignée par la couleur primaire. Déclarée après :focus-visible pour garder
       le soulignement sur le bouton actif ciblé au clavier. */
    .view-toggle button[aria-pressed='true'] {
      background: var(--arch-ui-surface-2);
      color: var(--arch-ui-text);
      font-weight: 700;
      box-shadow: inset 0 -3px 0 var(--arch-ui-accent);
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
      color: var(--arch-ui-text);
    }

    .message p,
    .message ul {
      margin: 0;
    }

    .message ul {
      padding-inline-start: 20px;
    }

    .message code {
      font-family: var(--ha-font-family-code, var(--code-font-family, monospace));
    }

    .loading {
      align-items: center;
      flex-direction: row;
      justify-content: center;
      color: var(--arch-ui-text-muted);
    }

    .spinner {
      width: 18px;
      height: 18px;
      border: 2px solid var(--arch-ui-border);
      border-top-color: var(--arch-ui-accent);
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
      border-inline-start: 4px solid var(--arch-ui-warning);
      border-radius: 4px;
      background: var(--arch-ui-surface-2);
      color: var(--arch-ui-text);
    }

    ha-alert[alert-type='error']:not(:defined) {
      border-inline-start-color: var(--arch-ui-danger);
    }

    .stale {
      position: absolute;
      top: 8px;
      left: 8px;
      right: 8px;
      z-index: 1;
    }

    /* Texte principal (et non la couleur primaire, souvent trop claire pour du texte) ; bordure primaire. */
    .retry {
      align-self: flex-start;
      min-height: 36px;
      padding: 0 16px;
      border: 1px solid var(--arch-ui-accent);
      border-radius: 18px;
      background: transparent;
      color: var(--arch-ui-text);
      font: inherit;
      font-weight: 500;
      cursor: pointer;
    }

    .retry:hover {
      background: var(--arch-ui-surface-2);
    }

    .retry:focus-visible {
      outline: 2px solid var(--arch-ui-accent);
      outline-offset: 2px;
      box-shadow: none;
    }
  `];let n=m;c([A({attribute:!1})],n.prototype,"hass");c([A({type:String,reflect:!0})],n.prototype,"layout");c([l()],n.prototype,"_config");c([l()],n.prototype,"_project");c([l()],n.prototype,"_status");c([l()],n.prototype,"_error");c([l()],n.prototype,"_warning");c([l()],n.prototype,"_available");c([l()],n.prototype,"_backgroundSrc");c([l()],n.prototype,"_is3DMode");c([l()],n.prototype,"_liveUnsupported");G("home-architect-card",n);const k=window.customCards??=[];k.some(r=>r?.type==="home-architect-card")||k.push({type:"home-architect-card",name:"Home Architect Card",get description(){return f(),a("card.picker.description")},preview:!0,documentationURL:J});X("card");
