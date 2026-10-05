import{i as u,a as g,l as _,t as v,A as d,b as r,W as f,n as b,d as h,e as m}from"./version-C3ICoODz.js";var x=Object.defineProperty,n=(c,e,t,l)=>{for(var i=void 0,a=c.length-1,s;a>=0;a--)(s=c[a])&&(i=s(e,t,i)||i);return i&&x(e,t,i),i};const $=/^(\d+(?:\.\d+)?|\.\d+)$/,p=class p extends u{constructor(){super(...arguments),this._heightText="",this._listRequested=!1}setConfig(e){(this._config===void 0||e.height!==this._config.height)&&(this._heightText=e.height===void 0||e.height===null?"":String(e.height),this._heightError=void 0),this._config={...e}}willUpdate(e){super.willUpdate(e),e.has("hass")&&this.hass&&!this._listRequested&&(this._listRequested=!0,this._loadProjects())}async _loadProjects(){this._listError=void 0,this._projects=void 0;try{this._projects=await _(this.hass)}catch(e){this._listError=v(e).message}}_update(e){if(!this._config)return;const t={...this._config};for(const[l,i]of Object.entries(e))i===void 0?delete t[l]:t[l]=i;this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_currentProjectId(){const e=this._config?.project_id;return e==null?"":String(e)}_onProjectChange(e){const t=e.target.value.trim();this._update({project_id:t===""?void 0:t})}_onTitleInput(e){const t=e.target.value;this._update({title:t.trim()===""?void 0:t})}_onHeightInput(e){this._heightText=e.target.value;try{this.parseHeight?.(this._heightText),this._heightError=void 0}catch(t){this._heightError=t instanceof Error?t.message:String(t)}}_onHeightChange(){if(this._heightError)return;const e=this._heightText.trim();this._update({height:e===""?void 0:$.test(e)?Number(e):e})}_onViewModeChange(e){this._update({view_mode:e.target.value==="3d"?"3d":"2d"})}_onHeatmapChange(e){const t=e.target.value;this._update({show_heatmap:t==="project"?void 0:t==="on"})}_onToggle(e,t){this._update({[e]:t.target.checked})}render(){const e=this._config;if(!e)return d;const t=this._currentProjectId(),l=this._projects?.find(s=>s.id===t),i=e.show_heatmap===!0?"on":e.show_heatmap===!1?"off":"project",a=typeof e.view_mode=="string"&&e.view_mode.toLowerCase()==="3d"?"3d":"2d";return r`
      <div class="editor">
        <div class="field">
          <label for="project">Plan</label>
          ${this._renderProjectControl(t)}
          ${this._renderProjectHelper()}
        </div>

        <div class="field">
          <label for="title">Titre</label>
          <input
            id="title"
            type="text"
            .value=${e.title===void 0||e.title===null?"":String(e.title)}
            placeholder=${l?.name??"Nom du plan"}
            aria-describedby="title-help"
            @input=${this._onTitleInput}
          />
          <p class="helper" id="title-help">Laissez vide pour afficher le nom du plan.</p>
        </div>

        <div class="field">
          <label for="height">Hauteur</label>
          <input
            id="height"
            type="text"
            .value=${this._heightText}
            placeholder="480px"
            aria-invalid=${this._heightError?"true":"false"}
            aria-describedby="height-help"
            @input=${this._onHeightInput}
            @change=${this._onHeightChange}
          />
          <p class="helper ${this._heightError?"error":""}" id="height-help">
            ${this._heightError??"Nombre de pixels ou longueur CSS (480, 480px, 60vh…). Dans la vue « sections », la hauteur suit la grille."}
          </p>
        </div>

        <div class="field">
          <label for="view-mode">Vue initiale</label>
          <select id="view-mode" @change=${this._onViewModeChange}>
            <option value="2d" .selected=${a==="2d"}>Plan 2D</option>
            <option value="3d" .selected=${a==="3d"}>3D isométrique</option>
          </select>
        </div>

        <div class="field">
          <label for="heatmap">Carte thermique des pièces</label>
          <select id="heatmap" @change=${this._onHeatmapChange}>
            <option value="project" .selected=${i==="project"}>Selon le réglage du plan</option>
            <option value="on" .selected=${i==="on"}>Afficher</option>
            <option value="off" .selected=${i==="off"}>Masquer</option>
          </select>
        </div>

        <label class="toggle">
          <input
            type="checkbox"
            .checked=${e.show_header!==!1}
            @change=${s=>this._onToggle("show_header",s)}
          />
          Afficher l'en-tête (titre et bascule 2D/3D)
        </label>

        <label class="toggle">
          <input
            type="checkbox"
            .checked=${e.show_dimensions===!0}
            @change=${s=>this._onToggle("show_dimensions",s)}
          />
          Afficher les cotes des murs
        </label>
      </div>
    `}_renderProjectControl(e){const t=this._projects;if(this._listError!==void 0)return r`
        <input
          id="project"
          type="text"
          .value=${e}
          placeholder="plan_ab12cd34"
          aria-describedby="project-help"
          @change=${this._onProjectChange}
        />
      `;if(!t)return r`<select id="project" disabled><option>Chargement des plans…</option></select>`;const l=t.some(i=>i.id===e);return r`
      <select id="project" aria-describedby="project-help" @change=${this._onProjectChange}>
        ${e===""?r`<option value="" disabled .selected=${!0}>Choisir un plan…</option>`:d}
        ${e!==""&&!l?r`<option value=${e} .selected=${!0}>${e} (introuvable)</option>`:d}
        ${t.map(i=>r`
          <option value=${i.id} .selected=${i.id===e}>${i.name} — ${f(i.category)}</option>
        `)}
      </select>
    `}_renderProjectHelper(){return this._listError!==void 0?r`
        <p class="helper error" id="project-help">
          Liste des plans indisponible (${this._listError}). Saisissez l'identifiant du plan (project_id).
        </p>
        <button type="button" class="reload" @click=${()=>{this._loadProjects()}}>Recharger la liste</button>
      `:this._projects&&this._projects.length===0?r`
        <p class="helper" id="project-help">
          Aucun plan enregistré : dessinez puis enregistrez un plan dans le studio Home Architect.
        </p>
      `:r`<p class="helper" id="project-help">Seuls les plans enregistrés sur le serveur sont proposés.</p>`}};p.styles=g`
    :host {
      display: block;
    }

    .editor {
      display: grid;
      gap: 16px;
    }

    .field {
      display: grid;
      gap: 4px;
    }

    label {
      font-weight: 500;
      color: var(--primary-text-color);
    }

    input[type='text'],
    select {
      box-sizing: border-box;
      width: 100%;
      min-height: 40px;
      padding: 8px 10px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 6px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font: inherit;
    }

    input[type='text']:focus-visible,
    select:focus-visible,
    button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
    }

    input[aria-invalid='true'] {
      border-color: var(--error-color, #db4437);
    }

    .helper {
      margin: 0;
      font-size: 0.85rem;
      color: var(--secondary-text-color);
    }

    .helper.error {
      color: var(--error-color, #db4437);
    }

    .toggle {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 400;
    }

    .toggle input {
      width: 18px;
      height: 18px;
      margin: 0;
      accent-color: var(--primary-color);
    }

    .reload {
      justify-self: start;
      min-height: 32px;
      padding: 0 12px;
      border: 1px solid var(--primary-color);
      border-radius: 16px;
      background: transparent;
      color: var(--primary-color);
      font: inherit;
      cursor: pointer;
    }
  `;let o=p;n([b({attribute:!1})],o.prototype,"hass");n([h()],o.prototype,"_config");n([h()],o.prototype,"_projects");n([h()],o.prototype,"_listError");n([h()],o.prototype,"_heightText");n([h()],o.prototype,"_heightError");m("home-architect-card-editor",o);export{o as HomeArchitectCardEditor};
