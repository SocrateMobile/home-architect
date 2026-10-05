import { LitElement, html, css, nothing, PropertyValues, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { defineElement } from '../core/define';
import { ProjectSummary, listProjects, toHaApiError } from '../core/ha-api';
import { getLevelLabel } from '../core/levels';
// Import de type uniquement (effacé à la compilation) : le module de la carte est l'entrée du bundle,
// chargée avec ?v=<version> ; l'importer à l'exécution depuis ce chunk la réévaluerait sous une autre URL.
import type { HomeArchitectCardConfig } from '../home-architect-card';

const PLAIN_NUMBER = /^(\d+(?:\.\d+)?|\.\d+)$/;

type HeatmapChoice = 'project' | 'on' | 'off';

/**
 * Éditeur visuel de la carte Lovelace (constat F98), chargé à la demande par
 * HomeArchitectCard.getConfigElement(). Champs natifs habillés avec les variables du thème HA :
 * ha-form n'est pas garanti chargé quand cet éditeur est ouvert en premier.
 */
export class HomeArchitectCardEditor extends LitElement {
  static styles = css`
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
  `;

  @property({ attribute: false })
  public hass?: any;

  /**
   * Validation de l'option height (parseCardHeight de la carte), fournie par
   * HomeArchitectCard.getConfigElement(). Absente : la saisie est transmise sans contrôle et
   * c'est setConfig de la carte qui la refuse (carte d'erreur de HA dans l'aperçu).
   */
  public parseHeight?: (value: unknown) => string | undefined;

  @state()
  private _config?: HomeArchitectCardConfig;

  /** Plans enregistrés (undefined : chargement en cours ou en échec). */
  @state()
  private _projects?: ProjectSummary[];

  @state()
  private _listError?: string;

  /** Saisie de la hauteur, conservée telle quelle tant qu'elle est invalide (non transmise). */
  @state()
  private _heightText = '';

  @state()
  private _heightError?: string;

  private _listRequested = false;

  public setConfig(config: HomeArchitectCardConfig): void {
    if (this._config === undefined || config.height !== this._config.height) {
      this._heightText = config.height === undefined || config.height === null ? '' : String(config.height);
      this._heightError = undefined;
    }
    this._config = { ...config };
  }

  protected willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);
    if (changed.has('hass') && this.hass && !this._listRequested) {
      this._listRequested = true;
      void this._loadProjects();
    }
  }

  private async _loadProjects(): Promise<void> {
    this._listError = undefined;
    this._projects = undefined;
    try {
      this._projects = await listProjects(this.hass);
    } catch (err) {
      this._listError = toHaApiError(err).message;
    }
  }

  /** Applique un changement et le transmet à HA ; une valeur undefined retire l'option du YAML. */
  private _update(patch: Record<string, unknown>): void {
    if (!this._config) return;
    const next: Record<string, unknown> = { ...this._config };
    for (const [key, value] of Object.entries(patch)) {
      if (value === undefined) delete next[key];
      else next[key] = value;
    }
    this._config = next as HomeArchitectCardConfig;
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: next },
      bubbles: true,
      composed: true
    }));
  }

  private _currentProjectId(): string {
    const id = this._config?.project_id;
    return id === undefined || id === null ? '' : String(id);
  }

  private _onProjectChange(e: Event): void {
    const value = (e.target as HTMLInputElement | HTMLSelectElement).value.trim();
    this._update({ project_id: value === '' ? undefined : value });
  }

  private _onTitleInput(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this._update({ title: value.trim() === '' ? undefined : value });
  }

  /** Validation à la frappe ; la valeur n'est transmise qu'à la validation du champ (change). */
  private _onHeightInput(e: Event): void {
    this._heightText = (e.target as HTMLInputElement).value;
    try {
      this.parseHeight?.(this._heightText);
      this._heightError = undefined;
    } catch (err) {
      this._heightError = err instanceof Error ? err.message : String(err);
    }
  }

  private _onHeightChange(): void {
    if (this._heightError) return;
    const text = this._heightText.trim();
    // `height: 500` est l'écriture naturelle en YAML : un nombre seul reste un nombre (pixels).
    this._update({ height: text === '' ? undefined : PLAIN_NUMBER.test(text) ? Number(text) : text });
  }

  private _onViewModeChange(e: Event): void {
    this._update({ view_mode: (e.target as HTMLSelectElement).value === '3d' ? '3d' : '2d' });
  }

  private _onHeatmapChange(e: Event): void {
    const choice = (e.target as HTMLSelectElement).value as HeatmapChoice;
    this._update({ show_heatmap: choice === 'project' ? undefined : choice === 'on' });
  }

  private _onToggle(key: 'show_header' | 'show_dimensions', e: Event): void {
    this._update({ [key]: (e.target as HTMLInputElement).checked });
  }

  render() {
    const config = this._config;
    if (!config) return nothing;
    const projectId = this._currentProjectId();
    const selected = this._projects?.find(p => p.id === projectId);
    const heatmap: HeatmapChoice = config.show_heatmap === true ? 'on' : config.show_heatmap === false ? 'off' : 'project';
    const viewMode = typeof config.view_mode === 'string' && config.view_mode.toLowerCase() === '3d' ? '3d' : '2d';

    return html`
      <div class="editor">
        <div class="field">
          <label for="project">Plan</label>
          ${this._renderProjectControl(projectId)}
          ${this._renderProjectHelper()}
        </div>

        <div class="field">
          <label for="title">Titre</label>
          <input
            id="title"
            type="text"
            .value=${config.title === undefined || config.title === null ? '' : String(config.title)}
            placeholder=${selected?.name ?? 'Nom du plan'}
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
            aria-invalid=${this._heightError ? 'true' : 'false'}
            aria-describedby="height-help"
            @input=${this._onHeightInput}
            @change=${this._onHeightChange}
          />
          <p class="helper ${this._heightError ? 'error' : ''}" id="height-help">
            ${this._heightError ?? 'Nombre de pixels ou longueur CSS (480, 480px, 60vh…). Dans la vue « sections », la hauteur suit la grille.'}
          </p>
        </div>

        <div class="field">
          <label for="view-mode">Vue initiale</label>
          <select id="view-mode" @change=${this._onViewModeChange}>
            <option value="2d" .selected=${viewMode === '2d'}>Plan 2D</option>
            <option value="3d" .selected=${viewMode === '3d'}>3D isométrique</option>
          </select>
        </div>

        <div class="field">
          <label for="heatmap">Carte thermique des pièces</label>
          <select id="heatmap" @change=${this._onHeatmapChange}>
            <option value="project" .selected=${heatmap === 'project'}>Selon le réglage du plan</option>
            <option value="on" .selected=${heatmap === 'on'}>Afficher</option>
            <option value="off" .selected=${heatmap === 'off'}>Masquer</option>
          </select>
        </div>

        <label class="toggle">
          <input
            type="checkbox"
            .checked=${config.show_header !== false}
            @change=${(e: Event) => this._onToggle('show_header', e)}
          />
          Afficher l'en-tête (titre et bascule 2D/3D)
        </label>

        <label class="toggle">
          <input
            type="checkbox"
            .checked=${config.show_dimensions === true}
            @change=${(e: Event) => this._onToggle('show_dimensions', e)}
          />
          Afficher les cotes des murs
        </label>
      </div>
    `;
  }

  private _renderProjectControl(projectId: string): TemplateResult {
    const projects = this._projects;
    if (this._listError !== undefined) {
      // Liste indisponible (ancien backend, connexion) : saisie manuelle de l'identifiant.
      return html`
        <input
          id="project"
          type="text"
          .value=${projectId}
          placeholder="plan_ab12cd34"
          aria-describedby="project-help"
          @change=${this._onProjectChange}
        />
      `;
    }
    if (!projects) {
      return html`<select id="project" disabled><option>Chargement des plans…</option></select>`;
    }
    const known = projects.some(p => p.id === projectId);
    return html`
      <select id="project" aria-describedby="project-help" @change=${this._onProjectChange}>
        ${projectId === '' ? html`<option value="" disabled .selected=${true}>Choisir un plan…</option>` : nothing}
        ${projectId !== '' && !known ? html`<option value=${projectId} .selected=${true}>${projectId} (introuvable)</option>` : nothing}
        ${projects.map(p => html`
          <option value=${p.id} .selected=${p.id === projectId}>${p.name} — ${getLevelLabel(p.category)}</option>
        `)}
      </select>
    `;
  }

  private _renderProjectHelper(): TemplateResult {
    if (this._listError !== undefined) {
      return html`
        <p class="helper error" id="project-help">
          Liste des plans indisponible (${this._listError}). Saisissez l'identifiant du plan (project_id).
        </p>
        <button type="button" class="reload" @click=${() => void this._loadProjects()}>Recharger la liste</button>
      `;
    }
    if (this._projects && this._projects.length === 0) {
      return html`
        <p class="helper" id="project-help">
          Aucun plan enregistré : dessinez puis enregistrez un plan dans le studio Home Architect.
        </p>
      `;
    }
    return html`<p class="helper" id="project-help">Seuls les plans enregistrés sur le serveur sont proposés.</p>`;
  }
}

defineElement('home-architect-card-editor', HomeArchitectCardEditor);

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-card-editor': HomeArchitectCardEditor;
  }
}
