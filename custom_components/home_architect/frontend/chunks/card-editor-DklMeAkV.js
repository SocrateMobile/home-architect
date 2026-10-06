import{i as f,L as $,u as m,a as b,s as x,c as j,l as y,t as w,A as p,j as i,k as a,V as k,n as C,o as u,p as T}from"./version-BTWCWNRA.js";var E=Object.defineProperty,c=(r,e,t,s)=>{for(var o=void 0,l=r.length-1,d;l>=0;l--)(d=r[l])&&(o=d(e,t,o)||o);return o&&E(e,t,o),o};const P=/^(\d+(?:\.\d+)?|\.\d+)$/,H=["2d","3d"],S=["auto","light","dark"];function _(r,e){if(r==null||r==="")return{};const t=typeof r=="string"?r.trim().toLowerCase():void 0,s=e.find(o=>o===t);return s!==void 0?{value:s}:{invalid:typeof r=="string"?r:JSON.stringify(r)??typeof r}}const v=class v extends f{constructor(){super(...arguments),this._heightText="",this._listRequested=!1,this._i18n=new $(this)}setConfig(e){(this._config===void 0||e.height!==this._config.height)&&(this._heightText=e.height===void 0||e.height===null?"":String(e.height)),this._config={...e}}willUpdate(e){if(super.willUpdate(e),!e.has("hass")||!this.hass)return;const t=e.get("hass");t?.language!==this.hass.language&&x(this.hass.language),t?.themes!==this.hass.themes&&j(this,this.hass),this._listRequested||(this._listRequested=!0,this._loadProjects())}async _loadProjects(){this._listError=void 0,this._projects=void 0;try{this._projects=await y(this.hass)}catch(e){this._listError=w(e).message}}_update(e){if(!this._config)return;const t={...this._config};for(const[s,o]of Object.entries(e))o===void 0?delete t[s]:t[s]=o;this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_currentProjectId(){const e=this._config?.project_id;return e==null?"":String(e)}_heightError(){try{this.parseHeight?.(this._heightText);return}catch(e){return e instanceof Error?e.message:String(e)}}_onProjectChange(e){const t=e.target.value.trim();this._update({project_id:t===""?void 0:t})}_onTitleInput(e){const t=e.target.value;this._update({title:t.trim()===""?void 0:t})}_onHeightInput(e){this._heightText=e.target.value}_onHeightChange(){if(this._heightError()!==void 0)return;const e=this._heightText.trim();this._update({height:e===""?void 0:P.test(e)?Number(e):e})}_onViewModeChange(e){this._update({view_mode:e.target.value==="3d"?"3d":"2d"})}_onThemeChange(e){const t=e.target.value;this._update({theme:t==="light"||t==="dark"?t:void 0})}_onHeatmapChange(e){const t=e.target.value;this._update({show_heatmap:t==="project"?void 0:t==="on"})}_onToggle(e,t){this._update({[e]:t.target.checked})}render(){const e=this._config;if(!e)return p;const t=this._currentProjectId(),s=this._projects?.find(n=>n.id===t),o=e.show_heatmap===!0?"on":e.show_heatmap===!1?"off":"project",l=_(e.view_mode,H),d=_(e.theme,S),g=this._heightError();return a`
      <div class="editor">
        <div class="field">
          <label for="project">${i("card.editor.project")}</label>
          ${this._renderProjectControl(t)}
          ${this._renderProjectHelper()}
        </div>

        <div class="field">
          <label for="title">${i("card.editor.title")}</label>
          <input
            id="title"
            type="text"
            .value=${e.title===void 0||e.title===null?"":String(e.title)}
            placeholder=${s?.name??i("card.editor.title_placeholder")}
            aria-describedby="title-help"
            @input=${this._onTitleInput}
          />
          <p class="helper" id="title-help">${i("card.editor.title_help")}</p>
        </div>

        <div class="field">
          <label for="height">${i("card.editor.height")}</label>
          <input
            id="height"
            type="text"
            .value=${this._heightText}
            placeholder="480px"
            aria-invalid=${g?"true":"false"}
            aria-describedby="height-help"
            @input=${this._onHeightInput}
            @change=${this._onHeightChange}
          />
          <p class="helper ${g?"error":""}" id="height-help">
            ${g??i("card.editor.height_help")}
          </p>
        </div>

        <div class="field">
          <label for="view-mode">${i("card.editor.view_mode")}</label>
          <select id="view-mode" aria-invalid=${l.invalid!==void 0?"true":"false"} @change=${this._onViewModeChange}>
            ${this._renderInvalidChoice(l.invalid)}
            <option value="2d" .selected=${l.invalid===void 0&&l.value!=="3d"}>${i("card.editor.view_2d")}</option>
            <option value="3d" .selected=${l.value==="3d"}>${i("card.editor.view_3d")}</option>
          </select>
        </div>

        <div class="field">
          <label for="theme">${i("card.editor.theme")}</label>
          <select id="theme" aria-invalid=${d.invalid!==void 0?"true":"false"} @change=${this._onThemeChange}>
            ${this._renderInvalidChoice(d.invalid)}
            <option value="auto" .selected=${d.invalid===void 0&&(d.value??"auto")==="auto"}>${i("card.editor.theme_auto")}</option>
            <option value="dark" .selected=${d.value==="dark"}>${i("card.editor.theme_dark")}</option>
            <option value="light" .selected=${d.value==="light"}>${i("card.editor.theme_light")}</option>
          </select>
        </div>

        <div class="field">
          <label for="heatmap">${i("card.editor.heatmap")}</label>
          <select id="heatmap" @change=${this._onHeatmapChange}>
            <option value="project" .selected=${o==="project"}>${i("card.editor.heatmap_project")}</option>
            <option value="on" .selected=${o==="on"}>${i("card.editor.heatmap_on")}</option>
            <option value="off" .selected=${o==="off"}>${i("card.editor.heatmap_off")}</option>
          </select>
        </div>

        <label class="toggle">
          <input
            type="checkbox"
            .checked=${e.show_header!==!1}
            @change=${n=>this._onToggle("show_header",n)}
          />
          ${i("card.editor.show_header")}
        </label>

        <label class="toggle">
          <input
            type="checkbox"
            .checked=${e.show_controls!==!1}
            @change=${n=>this._onToggle("show_controls",n)}
          />
          ${i("card.editor.show_controls")}
        </label>

        <label class="toggle">
          <input
            type="checkbox"
            .checked=${e.show_dimensions===!0}
            @change=${n=>this._onToggle("show_dimensions",n)}
          />
          ${i("card.editor.show_dimensions")}
        </label>

        <div class="field">
          <label class="toggle">
            <input
              type="checkbox"
              .checked=${e.animations!==!1}
              aria-describedby="animations-help"
              @change=${n=>this._onToggle("animations",n)}
            />
            ${i("card.editor.animations")}
          </label>
          <p class="helper" id="animations-help">${i("card.editor.animations_help")}</p>
        </div>
      </div>
    `}_renderInvalidChoice(e){return e===void 0?p:a`<option value="" disabled .selected=${!0}>${i("card.editor.invalid_value",{value:e})}</option>`}_renderProjectControl(e){const t=this._projects;if(this._listError!==void 0)return a`
        <input
          id="project"
          type="text"
          .value=${e}
          placeholder="plan_ab12cd34"
          aria-describedby="project-help"
          @change=${this._onProjectChange}
        />
      `;if(!t)return a`
        <select id="project" disabled aria-busy="true">
          <option>${i("card.editor.loading_projects")}</option>
        </select>
      `;const s=t.some(o=>o.id===e);return a`
      <select id="project" aria-describedby="project-help" @change=${this._onProjectChange}>
        ${e===""?a`<option value="" disabled .selected=${!0}>${i("card.editor.choose_project")}</option>`:p}
        ${e!==""&&!s?a`<option value=${e} .selected=${!0}>${i("card.editor.project_missing",{id:e})}</option>`:p}
        ${t.map(o=>a`
          <option value=${o.id} .selected=${o.id===e}>${o.name} — ${k(o.category)}</option>
        `)}
      </select>
    `}_renderProjectHelper(){return this._listError!==void 0?a`
        <p class="helper error" id="project-help">
          ${i("card.editor.list_error",{error:this._listError})}
        </p>
        <button type="button" class="reload" @click=${()=>{this._loadProjects()}}>${i("card.editor.reload_list")}</button>
      `:this._projects&&this._projects.length===0?a`<p class="helper" id="project-help">${i("card.editor.no_projects")}</p>`:a`<p class="helper" id="project-help">${i("card.editor.server_only")}</p>`}};v.styles=[m,b`
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
      color: var(--arch-ui-text);
    }

    input[type='text'],
    select {
      box-sizing: border-box;
      width: 100%;
      min-height: 40px;
      padding: 8px 10px;
      /* Bordure contrastée (3:1 au moins) : la couleur de séparation du thème est trop pâle pour délimiter un champ. */
      border: 1px solid var(--arch-ui-text-muted);
      border-radius: 6px;
      background: var(--arch-ui-surface);
      color: var(--arch-ui-text);
      font: inherit;
    }

    input:focus-visible,
    select:focus-visible,
    button:focus-visible {
      outline: 2px solid var(--arch-ui-accent);
      outline-offset: 1px;
      box-shadow: none;
    }

    input[aria-invalid='true'],
    select[aria-invalid='true'] {
      border-color: var(--arch-ui-danger);
    }

    .helper {
      margin: 0;
      font-size: 0.85rem;
      color: var(--arch-ui-text-muted);
    }

    .helper.error {
      color: var(--arch-ui-danger);
    }

    .toggle {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 400;
    }

    .toggle input {
      flex: none;
      width: 18px;
      height: 18px;
      margin: 0;
      accent-color: var(--arch-ui-accent);
    }

    /* Texte principal (la couleur primaire est souvent trop claire pour du texte) ; bordure primaire. */
    .reload {
      justify-self: start;
      min-height: 32px;
      padding: 0 12px;
      border: 1px solid var(--arch-ui-accent);
      border-radius: 16px;
      background: transparent;
      color: var(--arch-ui-text);
      font: inherit;
      cursor: pointer;
    }

    .reload:hover {
      background: var(--arch-ui-surface-2);
    }
  `];let h=v;c([C({attribute:!1})],h.prototype,"hass");c([u()],h.prototype,"_config");c([u()],h.prototype,"_projects");c([u()],h.prototype,"_listError");c([u()],h.prototype,"_heightText");T("home-architect-card-editor",h);export{h as HomeArchitectCardEditor};
