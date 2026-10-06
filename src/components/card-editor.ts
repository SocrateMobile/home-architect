import { LitElement, html, css, nothing, PropertyValues, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { defineElement } from '../core/define';
import { ProjectSummary, listProjects, toHaApiError } from '../core/ha-api';
import { getLevelLabel } from '../core/levels';
import { LocalizeController, localize, setLanguage } from '../i18n/index';
import { applyColorScheme, uiThemeStyles } from '../styles/theme.styles';
// Import de type uniquement (effacé à la compilation) : le module de la carte est l'entrée du bundle,
// chargée avec ?v=<version> ; l'importer à l'exécution depuis ce chunk la réévaluerait sous une autre URL.
import type { CardTheme, HomeArchitectCardConfig } from '../home-architect-card';
// Les traductions `card.editor.*` (src/i18n/locales/card.ts) ne sont PAS importées ici, pour la même
// raison : ce module n'est importé que par la carte, Rollup le place donc dans l'entrée de la carte et
// ce chunk l'importerait depuis l'URL sans ?v. L'éditeur n'est créé que par getConfigElement() de la
// carte, dont le module a déjà enregistré ces traductions.

const PLAIN_NUMBER = /^(\d+(?:\.\d+)?|\.\d+)$/;

type HeatmapChoice = 'project' | 'on' | 'off';
type ToggleKey = 'show_header' | 'show_dimensions' | 'show_controls' | 'animations';

const VIEW_MODES = ['2d', '3d'] as const;
const CARD_THEMES: readonly CardTheme[] = ['auto', 'light', 'dark'];

/**
 * Option à choix du YAML lue comme la lit la carte (normalizeCardConfig : casse et espaces ignorés) :
 * `value` si elle est reconnue, `invalid` (texte brut) si la carte la refuse, rien si elle est absente.
 */
function readChoice<T extends string>(raw: unknown, allowed: readonly T[]): { value?: T; invalid?: string } {
  if (raw === undefined || raw === null || raw === '') return {};
  const text = typeof raw === 'string' ? raw.trim().toLowerCase() : undefined;
  const value = allowed.find(choice => choice === text);
  if (value !== undefined) return { value };
  return { invalid: typeof raw === 'string' ? raw : JSON.stringify(raw) ?? typeof raw };
}

/**
 * Éditeur visuel de la carte Lovelace (constat F98), chargé à la demande par
 * HomeArchitectCard.getConfigElement(). Champs natifs habillés avec les jetons du thème
 * (dérivés des variables HA) : ha-form n'est pas garanti chargé quand cet éditeur est ouvert en premier.
 */
export class HomeArchitectCardEditor extends LitElement {
  static styles = [uiThemeStyles, css`
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
  `];

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

  private _listRequested = false;
  /** Nouveau rendu au changement de langue. */
  private readonly _i18n = new LocalizeController(this);

  public setConfig(config: HomeArchitectCardConfig): void {
    if (this._config === undefined || config.height !== this._config.height) {
      this._heightText = config.height === undefined || config.height === null ? '' : String(config.height);
    }
    this._config = { ...config };
  }

  protected willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);
    if (!changed.has('hass') || !this.hass) return;
    // L'éditeur s'affiche dans un dialogue de Home Assistant : langue et palette suivent hass.
    const oldHass: any = changed.get('hass');
    if (oldHass?.language !== this.hass.language) setLanguage(this.hass.language);
    if (oldHass?.themes !== this.hass.themes) applyColorScheme(this, this.hass);
    if (!this._listRequested) {
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

  /** Erreur de la hauteur saisie, recalculée à chaque rendu (elle suit ainsi la langue courante). */
  private _heightError(): string | undefined {
    try {
      this.parseHeight?.(this._heightText);
      return undefined;
    } catch (err) {
      return err instanceof Error ? err.message : String(err);
    }
  }

  private _onProjectChange(e: Event): void {
    const value = (e.target as HTMLInputElement | HTMLSelectElement).value.trim();
    this._update({ project_id: value === '' ? undefined : value });
  }

  private _onTitleInput(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this._update({ title: value.trim() === '' ? undefined : value });
  }

  /** Validation à la frappe (au rendu) ; la valeur n'est transmise qu'à la validation du champ (change). */
  private _onHeightInput(e: Event): void {
    this._heightText = (e.target as HTMLInputElement).value;
  }

  private _onHeightChange(): void {
    if (this._heightError() !== undefined) return;
    const text = this._heightText.trim();
    // `height: 500` est l'écriture naturelle en YAML : un nombre seul reste un nombre (pixels).
    this._update({ height: text === '' ? undefined : PLAIN_NUMBER.test(text) ? Number(text) : text });
  }

  private _onViewModeChange(e: Event): void {
    this._update({ view_mode: (e.target as HTMLSelectElement).value === '3d' ? '3d' : '2d' });
  }

  /** 'auto' (défaut) retire l'option du YAML. */
  private _onThemeChange(e: Event): void {
    const value = (e.target as HTMLSelectElement).value;
    this._update({ theme: value === 'light' || value === 'dark' ? value : undefined });
  }

  private _onHeatmapChange(e: Event): void {
    const choice = (e.target as HTMLSelectElement).value as HeatmapChoice;
    this._update({ show_heatmap: choice === 'project' ? undefined : choice === 'on' });
  }

  private _onToggle(key: ToggleKey, e: Event): void {
    this._update({ [key]: (e.target as HTMLInputElement).checked });
  }

  render() {
    const config = this._config;
    if (!config) return nothing;
    const projectId = this._currentProjectId();
    const selected = this._projects?.find(p => p.id === projectId);
    const heatmap: HeatmapChoice = config.show_heatmap === true ? 'on' : config.show_heatmap === false ? 'off' : 'project';
    // Valeur refusée par la carte : affichée (et non remplacée par le défaut, que l'on ne pourrait
    // alors pas choisir pour corriger le YAML, faute d'événement change).
    const viewMode = readChoice(config.view_mode, VIEW_MODES);
    const theme = readChoice(config.theme, CARD_THEMES);
    const heightError = this._heightError();

    return html`
      <div class="editor">
        <div class="field">
          <label for="project">${localize('card.editor.project')}</label>
          ${this._renderProjectControl(projectId)}
          ${this._renderProjectHelper()}
        </div>

        <div class="field">
          <label for="title">${localize('card.editor.title')}</label>
          <input
            id="title"
            type="text"
            .value=${config.title === undefined || config.title === null ? '' : String(config.title)}
            placeholder=${selected?.name ?? localize('card.editor.title_placeholder')}
            aria-describedby="title-help"
            @input=${this._onTitleInput}
          />
          <p class="helper" id="title-help">${localize('card.editor.title_help')}</p>
        </div>

        <div class="field">
          <label for="height">${localize('card.editor.height')}</label>
          <input
            id="height"
            type="text"
            .value=${this._heightText}
            placeholder="480px"
            aria-invalid=${heightError ? 'true' : 'false'}
            aria-describedby="height-help"
            @input=${this._onHeightInput}
            @change=${this._onHeightChange}
          />
          <p class="helper ${heightError ? 'error' : ''}" id="height-help">
            ${heightError ?? localize('card.editor.height_help')}
          </p>
        </div>

        <div class="field">
          <label for="view-mode">${localize('card.editor.view_mode')}</label>
          <select id="view-mode" aria-invalid=${viewMode.invalid !== undefined ? 'true' : 'false'} @change=${this._onViewModeChange}>
            ${this._renderInvalidChoice(viewMode.invalid)}
            <option value="2d" .selected=${viewMode.invalid === undefined && viewMode.value !== '3d'}>${localize('card.editor.view_2d')}</option>
            <option value="3d" .selected=${viewMode.value === '3d'}>${localize('card.editor.view_3d')}</option>
          </select>
        </div>

        <div class="field">
          <label for="theme">${localize('card.editor.theme')}</label>
          <select id="theme" aria-invalid=${theme.invalid !== undefined ? 'true' : 'false'} @change=${this._onThemeChange}>
            ${this._renderInvalidChoice(theme.invalid)}
            <option value="auto" .selected=${theme.invalid === undefined && (theme.value ?? 'auto') === 'auto'}>${localize('card.editor.theme_auto')}</option>
            <option value="dark" .selected=${theme.value === 'dark'}>${localize('card.editor.theme_dark')}</option>
            <option value="light" .selected=${theme.value === 'light'}>${localize('card.editor.theme_light')}</option>
          </select>
        </div>

        <div class="field">
          <label for="heatmap">${localize('card.editor.heatmap')}</label>
          <select id="heatmap" @change=${this._onHeatmapChange}>
            <option value="project" .selected=${heatmap === 'project'}>${localize('card.editor.heatmap_project')}</option>
            <option value="on" .selected=${heatmap === 'on'}>${localize('card.editor.heatmap_on')}</option>
            <option value="off" .selected=${heatmap === 'off'}>${localize('card.editor.heatmap_off')}</option>
          </select>
        </div>

        <label class="toggle">
          <input
            type="checkbox"
            .checked=${config.show_header !== false}
            @change=${(e: Event) => this._onToggle('show_header', e)}
          />
          ${localize('card.editor.show_header')}
        </label>

        <label class="toggle">
          <input
            type="checkbox"
            .checked=${config.show_controls !== false}
            @change=${(e: Event) => this._onToggle('show_controls', e)}
          />
          ${localize('card.editor.show_controls')}
        </label>

        <label class="toggle">
          <input
            type="checkbox"
            .checked=${config.show_dimensions === true}
            @change=${(e: Event) => this._onToggle('show_dimensions', e)}
          />
          ${localize('card.editor.show_dimensions')}
        </label>

        <div class="field">
          <label class="toggle">
            <input
              type="checkbox"
              .checked=${config.animations !== false}
              aria-describedby="animations-help"
              @change=${(e: Event) => this._onToggle('animations', e)}
            />
            ${localize('card.editor.animations')}
          </label>
          <p class="helper" id="animations-help">${localize('card.editor.animations_help')}</p>
        </div>
      </div>
    `;
  }

  /** Option désactivée qui montre une valeur refusée par la carte (le choix d'une autre la corrige). */
  private _renderInvalidChoice(invalid: string | undefined): TemplateResult | typeof nothing {
    if (invalid === undefined) return nothing;
    return html`<option value="" disabled .selected=${true}>${localize('card.editor.invalid_value', { value: invalid })}</option>`;
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
      return html`
        <select id="project" disabled aria-busy="true">
          <option>${localize('card.editor.loading_projects')}</option>
        </select>
      `;
    }
    const known = projects.some(p => p.id === projectId);
    return html`
      <select id="project" aria-describedby="project-help" @change=${this._onProjectChange}>
        ${projectId === '' ? html`<option value="" disabled .selected=${true}>${localize('card.editor.choose_project')}</option>` : nothing}
        ${projectId !== '' && !known
          ? html`<option value=${projectId} .selected=${true}>${localize('card.editor.project_missing', { id: projectId })}</option>`
          : nothing}
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
          ${localize('card.editor.list_error', { error: this._listError })}
        </p>
        <button type="button" class="reload" @click=${() => void this._loadProjects()}>${localize('card.editor.reload_list')}</button>
      `;
    }
    if (this._projects && this._projects.length === 0) {
      return html`<p class="helper" id="project-help">${localize('card.editor.no_projects')}</p>`;
    }
    return html`<p class="helper" id="project-help">${localize('card.editor.server_only')}</p>`;
  }
}

defineElement('home-architect-card-editor', HomeArchitectCardEditor);

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-card-editor': HomeArchitectCardEditor;
  }
}
