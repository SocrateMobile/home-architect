import { LitElement, html, nothing, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import './components/canvas-view';
import './components/toolbar';
import './components/wizard-modal';
import './components/room-modal';
import './components/calibrate-modal';
import './components/entity-drawer';
import './components/import-modal';
import type { ImportModalResult, ImportProjectBackupDetail } from './components/import-modal';
import './components/rescale-modal';
import { RescaleModalResult, isValidRescaleFactor } from './components/rescale-modal';
import type { CalibrateConfirmedDetail } from './components/calibrate-modal';
import type { RoomModalSaveDetail } from './components/room-modal';
import { TOOL_SHORTCUTS } from './components/toolbar';
import type { DrawerItemPayload } from './components/entity-drawer';
import './components/export-modal';
import './components/save-load-modal';
import { VERSION } from './version';
import { defineElement } from './core/define';
import {
  getEventTarget, hasCommandModifier, hasPrimaryModifier, isEditableTarget, isEventFromHost, shouldHandleShortcut
} from './core/keyboard';
import { CUSTOM_CATEGORY_DEF, DEFAULT_LEVEL, KNOWN_LEVELS, getLevelBelow, getLevelLabel, isKnownLevel } from './core/levels';
import { bindingDisplayName } from './core/project-model';
import { isAdmin, installUpdate } from './core/ha-api';
import { dataUrlToBlob } from './core/image-utils';
import { findFurnitureTemplate, furnitureDisplayName } from './core/furniture-catalog';
import {
  ActiveTool, BackgroundPlan, ExportFrame, GridConfig, HomeArchitectProject, Point, PublishInfo, Room, SelectedElements,
  Wall
} from './core/types';
import type { SvgParseResult } from './core/svg-parser';
import { LANGUAGE_CHANGED_KEY, LocalizeController, formatNumber, localize, setLanguage } from './i18n';
import './i18n/locales/panel';
import { applyColorScheme, uiThemeStyles } from './styles/theme.styles';
import { PlanEntry, isEmptyProject } from './panel/workspace';
import { isInlineDataUrl } from './panel/background';
import { PersistenceController, ProjectPreferences } from './panel/persistence-controller';
import { HA_UPDATES_PATH, UpdateInfo, describeLoadedBundles, fetchUpdateInfo, navigateInHa, updateEntitySignature } from './panel/update-check';
import { PanelNotice, UpdateInstallStatus, renderAboutDialog, renderUpdateDialog } from './panel/dialogs';
import { panelBaseStyles } from './panel/base-styles';
import { persistenceStyles } from './panel/styles';
import { studioLayoutStyles } from './panel/layout-styles';
import { ModalFocusController, focusMenuItem, handleMenuKeydown } from './panel/a11y';
import { TYPOLOGY_ICONS, typologyIconLabel, typologyTabLabel, typologyTitle } from './panel/icon-palette';
import {
  formatArea, formatCentimeters, formatLength, formatMeters, formatScaleFactor, localizeCount
} from './panel/format';
import {
  PlanGeometry, assignRooms, buildWizardRoom, cleanImportedGeometry, contentBounds, countWithHeight,
  effectiveCeilingHeight, geometryStats, inheritDefaultHeight, mapChanged, parseWizardRequest, reshapeOpenings,
  scaleBackgroundLayer, scalePlan, sideBySideOffset, translateGeometry, wizardRoomOrigin
} from './panel/plan-edits';

/** URL d'image de fond externe conservée par normalizeProject (http(s) ou chemin absolu, sans espace ni caractère de contrôle). */
const EXTERNAL_IMAGE_URL = /^(?:https?:\/\/|\/)[^\s\p{Cc}]*$/iu;
const MAX_EXTERNAL_IMAGE_URL_LENGTH = 2048;

/** Préférence locale (par appareil) du volet des entités : replié ou non. Hors du préfixe des anciens projets. */
const DRAWER_STORAGE_KEY = 'home-architect:drawer-collapsed';

/**
 * Éléments du studio qui reçoivent `hass` (propagé sans re-rendre le panneau, constat F34). Les
 * modales d'import, d'étalonnage et de mise à l'échelle n'en lisent que le thème clair / sombre.
 */
const HASS_CONSUMERS = [
  'home-architect-canvas', 'home-architect-entity-drawer', 'home-architect-export-modal',
  'home-architect-save-load-modal', 'home-architect-room-modal', 'home-architect-import-modal',
  'home-architect-calibrate-modal', 'home-architect-rescale-modal'
].join(', ');

/** Séquence secrète de l'easter egg. */
const SECRET_WORD = 'socrate';

/** Bornes du facteur de mise à l'échelle annoncées dans les messages de refus (isValidRescaleFactor). */
const SCALE_FACTOR_LIMITS = { min: 0.01, max: 100 };

/** Menus déroulants de la barre supérieure. */
type DropdownName = 'file' | 'plan' | 'level';

/** Choix d'une liste de la barre supérieure (valeur en mètres, libellé traduit `{size}`). */
interface MeasureOption {
  value: number;
  key: string;
}

const THICKNESS_OPTIONS: readonly MeasureOption[] = [
  { value: 0.10, key: 'panel.thickness.partition' },
  { value: 0.15, key: 'panel.thickness.wall' },
  { value: 0.20, key: 'panel.thickness.load_bearing' },
  { value: 0.30, key: 'panel.thickness.exterior' }
];

const OPENING_WIDTH_OPTIONS: readonly MeasureOption[] = [
  { value: 0.73, key: 'panel.opening_width.narrow' },
  { value: 0.83, key: 'panel.opening_width.bedroom' },
  { value: 0.90, key: 'panel.opening_width.standard' },
  { value: 1.20, key: 'panel.opening_width.window' },
  { value: 1.40, key: 'panel.opening_width.double' },
  { value: 2.00, key: 'panel.opening_width.bay' },
  { value: 2.40, key: 'panel.opening_width.large_bay' }
];

const CEILING_OPTIONS: readonly MeasureOption[] = [
  { value: 2.10, key: 'panel.ceiling.basement' },
  { value: 2.30, key: 'panel.ceiling.attic' },
  { value: 2.50, key: 'panel.ceiling.standard' },
  { value: 2.70, key: 'panel.ceiling.high' },
  { value: 3.00, key: 'panel.ceiling.haussmann' },
  { value: 3.50, key: 'panel.ceiling.cathedral' }
];

/**
 * Options d'une liste dont la sélection suit la valeur réellement utilisée (constat F134) ; une
 * valeur absente de la liste (réglée par la barre d'outils, le HUD ou un ancien plan) y est ajoutée.
 * `.selected` (propriété) : l'attribut `selected` n'a plus d'effet une fois la liste modifiée à la main.
 */
function selectOptions(options: readonly MeasureOption[], value: number, format: (v: number) => string) {
  const same = (v: number) => Math.abs(v - value) < 1e-6;
  const entries = options.map(o => ({ value: o.value, label: localize(o.key, { size: format(o.value) }) }));
  if (Number.isFinite(value) && !options.some(o => same(o.value))) {
    entries.push({ value, label: localize('panel.measure.current', { size: format(value) }) });
    entries.sort((a, b) => a.value - b.value);
  }
  return entries.map(o => html`<option value=${String(o.value)} .selected=${same(o.value)}>${o.label}</option>`);
}

/** Couleur choisie dans le HUD (format du sélecteur de couleur natif, conservé par normalizeProject). */
const HEX_COLOR = /^#[0-9a-f]{6}$/i;

/** Couleur affichée par le sélecteur du HUD pour un meuble (sa couleur, celle du modèle, sinon un gris neutre). */
function furnitureColorValue(item: { type: string; color?: string } | undefined): string {
  const color = item?.color ?? (item ? findFurnitureTemplate(item.type)?.defaultColor : undefined);
  return color && HEX_COLOR.test(color) ? color : '#94a3b8';
}

/** Nombre total d'éléments d'une sélection. */
function countSelection(s: SelectedElements): number {
  return s.wallIds.length + s.openingIds.length + s.roomIds.length + s.bindingIds.length + (s.furnitureIds?.length ?? 0);
}

/** Outil associé à une touche seule : table TOOL_SHORTCUTS de la barre d'outils (raccourcis annoncés = raccourcis réels). */
function toolForShortcut(key: string): ActiveTool | null {
  const entry = (Object.entries(TOOL_SHORTCUTS) as Array<[ActiveTool, string | undefined]>).find(([, k]) => k === key);
  return entry ? entry[0] : null;
}

/** Code SVG collé tel quel (texte) : ouvert dans la modale d'import (constat F127). */
function looksLikeSvgCode(text: string): boolean {
  return text.startsWith('<svg') || (text.startsWith('<?xml') && text.includes('<svg'));
}

/** Mètres réels par pixel du calque importé (largeur saisie dans la modale), null si l'import n'en fournit pas. */
function importMetersPerPixel(detail: ImportModalResult, background: BackgroundPlan): number | null {
  const mpp = detail.metersPerPixel;
  if (typeof mpp === 'number' && Number.isFinite(mpp) && mpp > 0) return mpp;
  const width = detail.totalWidthMeters;
  return typeof width === 'number' && Number.isFinite(width) && width > 0 && background.widthPx ? width / background.widthPx : null;
}

/** Deux éléments d'une énumération reliés par « et » / « and ». */
function joinPair(parts: string[]): string {
  return parts.length === 2 ? localize('panel.common.pair', { first: parts[0], second: parts[1] }) : parts.join(', ');
}

/** Nom de plan ou d'élément entre guillemets de la langue courante. */
function quoted(name: string): string {
  return localize('panel.common.quoted', { name });
}

function readDrawerPreference(): boolean | null {
  try {
    const raw = localStorage.getItem(DRAWER_STORAGE_KEY);
    return raw === 'true' ? true : raw === 'false' ? false : null;
  } catch {
    return null; // Stockage bloqué (navigation privée, app compagnon) : comportement par défaut.
  }
}

function writeDrawerPreference(collapsed: boolean): void {
  try {
    localStorage.setItem(DRAWER_STORAGE_KEY, String(collapsed));
  } catch {
    // Stockage bloqué : la préférence ne sera simplement pas mémorisée.
  }
}

export class HomeArchitectPanel extends LitElement {
  /** Jetons de thème d'abord (uiThemeStyles), puis styles du studio qui n'utilisent que ces jetons (constats F56, F169). */
  static styles = [uiThemeStyles, panelBaseStyles, persistenceStyles, studioLayoutStyles];

  @property({ type: Object })
  public hass: any;

  /** Mode étroit de HA (mobile) : la barre latérale est masquée et le panneau fournit son bouton. */
  @property({ type: Boolean, reflect: true })
  public narrow: boolean = false;

  @state()
  private activeTool: ActiveTool = 'wall';

  @state()
  private currentThickness: number = 0.20;

  @state()
  private currentOpeningWidth: number = 0.90;

  @state()
  private doorFlipSide: boolean = false;

  @state()
  private doorFlipDirection: boolean = true;

  @state()
  private windowSashCount: number = 1;

  @state()
  private is3DMode: boolean = false;

  @state()
  private isFullscreen: boolean = false;

  /** Volet replié ; préférence mémorisée par appareil (replié par défaut en mode étroit). */
  @state()
  private isDrawerCollapsed: boolean = false;

  /** Élément choisi dans le volet (« toucher pour placer »), posé au prochain appui sur le plan. */
  @state()
  private pendingPlacement: DrawerItemPayload | null = null;

  @state()
  private isWizardOpen: boolean = false;

  @state()
  private isImportModalOpen: boolean = false;

  /** Fichier (image déposée ou collée) ou code SVG collé transmis à la modale d'import (constats F127, F167). */
  @state()
  private importInitialFile: Blob | null = null;

  @state()
  private importInitialSvg: string | null = null;

  @state()
  private isAboutOpen: boolean = false;

  @state()
  private isExportModalOpen: boolean = false;

  @state()
  private isSaveLoadModalOpen: boolean = false;

  @state()
  private isNewPlanModalOpen: boolean = false;

  /** Nom saisi dans le dialogue « Nouveau plan » (prérempli à l'ouverture). */
  @state()
  private newPlanName: string = '';

  @state()
  private newPlanCategory: string = DEFAULT_LEVEL;

  @state()
  private isResetModalOpen: boolean = false;

  @state()
  private saveLoadModalTab: 'save' | 'load' = 'save';

  @state()
  private isCalibrateModalOpen: boolean = false;

  /** Segment tracé avec l'outil Étalonner, en mètres monde (`request-calibration`). */
  @state()
  private calibrationData: { worldDistance: number; defaultMeters: number } | null = null;

  @state()
  private isRescaleModalOpen: boolean = false;

  @state()
  private rescaleMeasuredMeters: number = 0;

  @state()
  private selectedRoomForEdit: Room | null = null;

  @state()
  private selectedElements: SelectedElements = {
    wallIds: [],
    openingIds: [],
    roomIds: [],
    bindingIds: [],
    furnitureIds: []
  };

  @state()
  private activeDropdown: DropdownName | null = null;

  /** Élément du menu qui recevra le focus une fois le menu ouvert rendu (navigation clavier, constat F159). */
  private pendingMenuFocus: 'first' | 'last' | 'checked' | null = null;

  @state()
  private selectedTypologyTab: string = '';

  @state()
  private isIconPickerOpen: boolean = true;

  /** Dernière réponse de check_updates (administrateurs uniquement), null tant qu'elle est inconnue. */
  @state()
  private updateInfo: UpdateInfo | null = null;

  @state()
  private isUpdateModalOpen: boolean = false;

  @state()
  private updateInstallStatus: UpdateInstallStatus = 'idle';

  @state()
  private updateInstallError: string | null = null;

  private logoClickTimes: number[] = [];
  private secretKeySequence: string = '';
  /** Fermeture de l'easter egg affiché (module chargé à la demande), appelée à la déconnexion. */
  private easterEggCleanup: (() => void) | null = null;
  private updateCheckStarted: boolean = false;
  /** Signature de l'entité update au dernier contrôle (réévaluation quand elle change). */
  private updateEntitySig: string | null = null;
  /** Le volet a été replié ou ouvert par l'utilisateur sur cet appareil (sinon il suit le mode étroit). */
  private drawerPreference: boolean | null = null;
  /** requestUpdate() appelé sans propriété depuis le dernier rendu (voir shouldUpdate). */
  private explicitUpdateRequested = false;
  /** hass.themes.darkMode appliqué à l'attribut `scheme` (palette claire ou sombre). */
  private appliedDarkMode: unknown = undefined;

  private readonly onDocumentKeyDown = (e: KeyboardEvent) => this.handleKeyDown(e);
  private readonly onDocumentPaste = (e: ClipboardEvent) => this.handlePaste(e);
  private readonly onWindowClick = (e: MouseEvent) => this.closeDropdownOnOutsideClick(e);
  private readonly onFullscreenChange = () => this.syncFullscreenState();
  /**
   * Un appui dans le studio lui donne le focus (s'il ne l'a pas déjà) : les raccourcis clavier
   * suivent alors le studio et non l'élément de HA qui avait le focus (constat F4).
   */
  private readonly onHostPointerDown = () => {
    if (!this.matches(':focus-within')) this.focus({ preventScroll: true });
  };

  /** Re-rendu du panneau au changement de langue (traductions de l'espace `panel`, constat F110). */
  private readonly i18n = new LocalizeController(this);

  /** Focus des dialogues du panneau : initial, piégé, rendu à l'élément déclencheur (constat F159). */
  private readonly modalFocus = new ModalFocusController(this);

  /**
   * Persistance (src/panel/persistence-controller.ts) : plans ouverts indexés par id, chargement,
   * sauvegarde avec contrôle de révision, brouillons locaux, image de fond et abonnement.
   */
  private readonly persistence = new PersistenceController(this, {
    toast: message => this.showToast(message),
    activeProjectChanged: () => {
      this.clearSelection();
      this.pendingPlacement = null;
    }
  });

  /** Projet affiché et édité. */
  private get project(): HomeArchitectProject {
    return this.persistence.project;
  }

  /** Niveau du projet actif (null pour un plan « Autre » ou de catégorie personnalisée). */
  private get activeLevel(): string | null {
    const category = this.project.category;
    return category && isKnownLevel(category) ? category : null;
  }

  /** Lecture seule : utilisateur non administrateur (défense en profondeur, constat F11). */
  private get readOnly(): boolean {
    return this.persistence.readOnly;
  }

  /** Préférences d'affichage enregistrées avec le plan (constat F104) ; valeurs par défaut du studio. */
  private get showDimensions(): boolean {
    return this.project.showDimensions ?? true;
  }

  private get showThermalHeatmap(): boolean {
    return this.project.showThermalHeatmap ?? false;
  }

  private get showGhostLevel(): boolean {
    return this.project.showGhostLevel ?? false;
  }

  private setPreferences(patch: ProjectPreferences) {
    this.persistence.setPreferences(patch);
  }

  /** Barre d'outils : réglages de la grille (taille, accrochages), enregistrés avec le plan (constat F47). */
  private handleGridConfigChanged(e: CustomEvent<{ grid: Partial<GridConfig> }>) {
    const patch = e.detail?.grid;
    if (!patch || typeof patch !== 'object') return;
    const current = this.project.grid;
    const next: GridConfig = { ...current };
    // Mêmes bornes que normalizeProject : la valeur reste identique après rechargement.
    if (typeof patch.size === 'number' && Number.isFinite(patch.size)) next.size = Math.min(2, Math.max(0.05, patch.size));
    for (const key of ['snapToGrid', 'snapToAngles', 'snapToElements'] as const) {
      const value = patch[key];
      if (typeof value === 'boolean') next[key] = value;
    }
    const changed = next.size !== current.size || next.snapToGrid !== current.snapToGrid ||
      next.snapToAngles !== current.snapToAngles || next.snapToElements !== current.snapToElements;
    if (changed) this.setPreferences({ grid: next });
  }

  private handleToolSelected(e: CustomEvent<{ tool: ActiveTool }>) {
    this.selectTool(e.detail.tool);
  }

  private selectTool(tool: ActiveTool) {
    this.activeTool = tool;
    if (tool === 'door') {
      this.currentOpeningWidth = 0.90;
    } else if (tool === 'window') {
      this.currentOpeningWidth = this.windowSashCount === 2 ? 1.40 : 0.90;
    } else if (tool === 'french_window') {
      this.currentOpeningWidth = 2.00;
    }
  }

  private handleDoorConfigChanged(e: CustomEvent<{ flipSide: boolean; flipDirection: boolean }>) {
    this.doorFlipSide = e.detail.flipSide;
    this.doorFlipDirection = e.detail.flipDirection;
    this.activeTool = 'door';

    // Mettre à jour les portes sélectionnées (seulement si l'une d'elles change réellement)
    if (this.selectedElements.openingIds.length > 0 && !this.readOnly) {
      let updated = 0;
      const newOpenings = mapChanged(this.project.openings, op => {
        if (this.selectedElements.openingIds.includes(op.id) && op.type === 'door' &&
            (op.flipSide !== e.detail.flipSide || op.flipDirection !== e.detail.flipDirection)) {
          updated++;
          return { ...op, flipSide: e.detail.flipSide, flipDirection: e.detail.flipDirection };
        }
        return op;
      });
      if (newOpenings && this.commitProject({ ...this.project, openings: newOpenings })) {
        this.showToast(localizeCount('panel.toast.doors_updated', updated));
      }
    }
  }

  /** Sens d'ouverture inversé au clavier pendant la pose (Espace / F) : le canevas le signale au panneau (SPEC §6). */
  private handleOpeningConfigChanged(e: CustomEvent<{ flipSide: boolean; flipDirection: boolean }>) {
    const { flipSide, flipDirection } = e.detail ?? {};
    if (typeof flipSide === 'boolean') this.doorFlipSide = flipSide;
    if (typeof flipDirection === 'boolean') this.doorFlipDirection = flipDirection;
  }

  private handleWindowConfigChanged(e: CustomEvent<{ type: 'window' | 'french_window'; sashCount: number; width: number }>) {
    const { type, sashCount, width } = e.detail;
    this.activeTool = type;
    this.currentOpeningWidth = width;
    this.windowSashCount = sashCount;
    // Fenêtres sélectionnées : mises à jour seulement si l'une d'elles change réellement.
    if (this.selectedElements.openingIds.length > 0 && !this.readOnly) this.applyWindowFormat(type, sashCount, width);
  }

  /**
   * Nouveau format des fenêtres sélectionnées, borné à leur mur (constat F44) : une fenêtre qui ne
   * tiendrait pas sur son mur ou chevaucherait une autre ouverture garde son format.
   */
  private applyWindowFormat(type: 'window' | 'french_window', sashCount: number, width: number) {
    const reshape = reshapeOpenings(this.project, this.selectedElements.openingIds, op =>
      (op.type === 'window' || op.type === 'french_window') &&
      (op.type !== type || op.width !== width || op.sashCount !== sashCount)
        ? { ...op, type, width, sashCount }
        : op
    );
    const committed = !!reshape.openings && this.commitProject({ ...this.project, openings: reshape.openings });
    const notes: string[] = [];
    if (reshape.adjusted > 0) notes.push(localizeCount('panel.toast.windows_adjusted', reshape.adjusted));
    if (reshape.refused > 0) notes.push(localizeCount('panel.toast.windows_refused', reshape.refused));
    if (committed) {
      this.showToast(localizeCount('panel.toast.windows_updated', reshape.updated, {
        notes: notes.length ? localize('panel.common.parenthesized', { text: notes.join(', ') }) : ''
      }));
    } else if (reshape.refused > 0) {
      this.showToast(localize('panel.toast.window_format_refused', { notes: notes.join(', ') }));
    }
  }

  private handleWallThicknessChanged(e: CustomEvent<{ thickness: number }>) {
    this.currentThickness = e.detail.thickness;
    this.activeTool = 'wall';

    // Mettre à jour les murs sélectionnés
    if (this.selectedElements.wallIds.length > 0 && !this.readOnly) {
      const newWalls = this.wallsWithThickness(e.detail.thickness);
      if (newWalls && this.commitProject({ ...this.project, walls: newWalls })) {
        this.showToast(localizeCount('panel.toast.walls_thickness', this.selectedElements.wallIds.length, {
          size: formatCentimeters(e.detail.thickness)
        }));
      }
    }
  }

  /** Murs sélectionnés avec la nouvelle épaisseur ; null si aucun ne change. */
  private wallsWithThickness(thickness: number): Wall[] | null {
    return mapChanged(this.project.walls, w =>
      this.selectedElements.wallIds.includes(w.id) && w.thickness !== thickness ? { ...w, thickness } : w
    );
  }

  private updateSelectedDoorConfig(flipSide: boolean, flipDirection: boolean) {
    this.doorFlipSide = flipSide;
    this.doorFlipDirection = flipDirection;
    const newOpenings = mapChanged(this.project.openings, op =>
      this.selectedElements.openingIds.includes(op.id) && op.type === 'door' &&
      (op.flipSide !== flipSide || op.flipDirection !== flipDirection)
        ? { ...op, flipSide, flipDirection }
        : op
    );
    if (newOpenings && this.commitProject({ ...this.project, openings: newOpenings })) {
      this.showToast(localize('panel.toast.door_direction'));
    }
  }

  private updateSelectedWindowConfig(type: 'window' | 'french_window', sashCount: number, width: number) {
    this.windowSashCount = sashCount;
    this.currentOpeningWidth = width;
    this.applyWindowFormat(type, sashCount, width);
  }

  private updateSelectedWallsThickness(thickness: number) {
    this.currentThickness = thickness;
    const newWalls = this.wallsWithThickness(thickness);
    if (newWalls && this.commitProject({ ...this.project, walls: newWalls })) {
      this.showToast(localize('panel.toast.wall_thickness', { size: formatCentimeters(thickness) }));
    }
  }

  private handleProjectChanged(e: CustomEvent<{ project: HomeArchitectProject }>) {
    const changed = e.detail?.project;
    // Un événement tardif d'un plan qui n'est plus affiché (changement de plan pendant un glisser) est ignoré.
    if (!changed || changed === this.project || changed.id !== this.project.id) return;
    const committed = this.commitProject({
      ...changed,
      furniture: changed.furniture || []
    });
    // Modification refusée en lecture seule : le canevas, qui l'affiche déjà, revient au plan du panneau
    // (la liaison .project ne le ferait pas, sa valeur n'ayant pas changé côté panneau).
    if (!committed && this.readOnly) {
      const canvas = this.shadowRoot?.querySelector('home-architect-canvas');
      if (canvas) canvas.project = this.project;
    }
  }

  /**
   * Applique une modification de l'utilisateur au plan actif (historique, drapeau « modifié »,
   * brouillon local). Quand les pièces changent (assistant, import, suppression, contour modifié
   * dans le canevas), la pièce de chaque entité et de chaque meuble est recalculée (constat F147).
   * Renvoie false si rien n'a été appliqué.
   */
  private commitProject(next: HomeArchitectProject, opts: { coalesceKey?: string } = {}): boolean {
    const project = next.rooms !== this.project.rooms ? assignRooms(next) : next;
    return this.persistence.commit(project, opts);
  }

  private notifyReadOnly() {
    this.persistence.notifyReadOnly();
  }

  private handleThicknessChange(e: Event) {
    const value = parseFloat((e.target as HTMLSelectElement).value);
    if (Number.isFinite(value) && value > 0) this.currentThickness = value;
  }

  private handleOpeningWidthChange(e: Event) {
    const value = parseFloat((e.target as HTMLSelectElement).value);
    if (Number.isFinite(value) && value > 0) this.currentOpeningWidth = value;
  }

  /** Canevas affiché (absent tant que le panneau n'est pas rendu). */
  private get canvas(): HTMLElementTagNameMap['home-architect-canvas'] | null {
    return this.renderRoot.querySelector('home-architect-canvas');
  }

  /** Recadre le plan une fois la modification rendue par le canevas (constat F55). */
  private async fitCanvasAfterUpdate() {
    await this.updateComplete;
    const canvas = this.canvas;
    if (!canvas) return;
    await canvas.updateComplete;
    canvas.fitToScreen();
  }

  /** Point du plan au centre de la vue 2D, null en 3D ou tant que le canevas n'a pas de taille. */
  private viewCenter(): Point | null {
    const canvas = this.canvas;
    if (!canvas || this.is3DMode) return null;
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return null;
    return canvas.clientToWorld(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  /**
   * Assistant pièce : dimensions revalidées (constat F63), pièce placée à côté du contenu existant
   * ou au centre de la vue (constat F5), dimensions intérieures (F148), hauteur par défaut héritée (F150).
   */
  private handleCreateRoomFromWizard(e: CustomEvent<unknown>) {
    if (this.readOnly) {
      this.isWizardOpen = false;
      this.notifyReadOnly();
      return;
    }
    const request = parseWizardRequest(e.detail);
    if (!request) {
      this.showToast(localize('panel.toast.wizard_invalid'));
      return;
    }
    const origin = wizardRoomOrigin(this.project, request, this.viewCenter());
    const { walls, openings, room } = buildWizardRoom(this.project, request, origin);
    const committed = this.commitProject({
      ...this.project,
      walls: [...this.project.walls, ...walls],
      openings: [...this.project.openings, ...openings],
      rooms: [...this.project.rooms, room]
    });
    this.isWizardOpen = false;
    if (!committed) return;
    this.activeTool = 'select';
    const missing = (request.addDoor ? 1 : 0) + (request.addWindow ? 1 : 0) - openings.length;
    this.showToast(localize(missing > 0 ? 'panel.toast.room_created_too_small' : 'panel.toast.room_created', {
      name: room.name,
      area: formatArea(room.areaM2)
    }));
    void this.fitCanvasAfterUpdate();
  }

  @state()
  private toastMessage: string | null = null;
  private toastTimeout: ReturnType<typeof setTimeout> | null = null;

  connectedCallback() {
    super.connectedCallback();
    // Langue et palette suivent HA dès l'insertion (hass peut précéder la connexion).
    if (this.hass) this.applyHassEnvironment();
    // Hôte focalisable sans entrer dans l'ordre de tabulation : les raccourcis suivent le studio (constat F4).
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '-1');
    this.addEventListener('pointerdown', this.onHostPointerDown);
    // Sur document (bouillonnement) : avant les raccourcis globaux de HA, posés sur window, qui ignorent
    // une touche déjà traitée (defaultPrevented). Rien n'est traité si le focus est ailleurs dans HA.
    document.addEventListener('keydown', this.onDocumentKeyDown);
    document.addEventListener('paste', this.onDocumentPaste);
    window.addEventListener('click', this.onWindowClick);
    document.addEventListener('fullscreenchange', this.onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.onFullscreenChange);
    // Volet : préférence de cet appareil, sinon replié en mode étroit (constat F60).
    this.drawerPreference = readDrawerPreference();
    this.isDrawerCollapsed = this.drawerPreference ?? this.narrow;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('pointerdown', this.onHostPointerDown);
    document.removeEventListener('keydown', this.onDocumentKeyDown);
    document.removeEventListener('paste', this.onDocumentPaste);
    window.removeEventListener('click', this.onWindowClick);
    document.removeEventListener('fullscreenchange', this.onFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this.onFullscreenChange);
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = null;
    this.toastMessage = null;
    // L'easter egg s'arrête avec le panneau : ni animation ni écouteur après un retour arrière (constat F162).
    this.easterEggCleanup?.();
    this.easterEggCleanup = null;
    this.secretKeySequence = '';
  }

  /**
   * Un nouvel objet hass arrive à chaque changement d'état de N'IMPORTE QUELLE entité : le panneau
   * ne se re-rend pas pour autant (constat F34). Le nouvel hass est transmis directement aux éléments
   * qui l'utilisent (canevas, volet, modales), qui ne se mettent à jour que pour ce qui les concerne.
   */
  protected shouldUpdate(changed: PropertyValues<this>): boolean {
    // Racine du studio : langue (setLanguage) et palette (attribut scheme) suivent hass (constats F56, F110).
    // Un changement de langue ajoute LANGUAGE_CHANGED_KEY aux changements : le panneau est alors rendu.
    if (changed.has('hass') && this.hass) this.applyHassEnvironment();
    const languageChanged = (changed as Map<PropertyKey, unknown>).has(LANGUAGE_CHANGED_KEY);
    if (this.hasUpdated && !this.explicitUpdateRequested && !languageChanged && changed.size === 1 && changed.has('hass')) {
      const previous = changed.get('hass');
      if (previous && this.hass && !this.hassAffectsPanel(previous, this.hass)) {
        this.propagateHass();
        this.handleHassChange();
        // Une mise à jour demandée pendant ce suivi (chargement lancé, état modifié) serait perdue si
        // le cycle était abandonné (Lit vide alors les changements en attente) : le panneau est rendu.
        if (!this.explicitUpdateRequested && changed.size === 1) return false;
      }
    }
    this.explicitUpdateRequested = false;
    return super.shouldUpdate(changed);
  }

  /**
   * Une mise à jour demandée sans propriété (contrôleur de persistance : plan modifié, chargement,
   * dialogue…) est toujours rendue, même si un nouvel hass arrive dans le même cycle.
   */
  requestUpdate(...args: Parameters<LitElement['requestUpdate']>): void {
    if (args[0] === undefined) this.explicitUpdateRequested = true;
    super.requestUpdate(...args);
  }

  /**
   * Langue de l'interface et palette claire / sombre d'après hass (le studio est une racine, comme la
   * carte). La palette n'est reposée que si hass.themes.darkMode change (hass change à chaque état).
   */
  private applyHassEnvironment() {
    setLanguage(this.hass.locale?.language ?? this.hass.language);
    const darkMode: unknown = this.hass.themes?.darkMode;
    if (darkMode !== this.appliedDarkMode || !this.hasAttribute('scheme')) {
      this.appliedDarkMode = darkMode;
      applyColorScheme(this, this.hass);
    }
  }

  /** Changements de hass visibles dans le panneau lui-même (droits, barre latérale, langue, entité affichée dans le HUD). */
  private hassAffectsPanel(previous: any, next: any): boolean {
    if (isAdmin(previous) !== isAdmin(next) || previous.dockedSidebar !== next.dockedSidebar || previous.language !== next.language) {
      return true;
    }
    const bindingId = this.selectedElements.bindingIds[0];
    const entityId = bindingId ? this.project.bindings.find(b => b.id === bindingId)?.entityId : undefined;
    return entityId !== undefined && previous.states?.[entityId] !== next.states?.[entityId];
  }

  private propagateHass() {
    for (const el of this.renderRoot.querySelectorAll(HASS_CONSUMERS)) {
      (el as HTMLElement & { hass?: unknown }).hass = this.hass;
    }
  }

  /** Suivi de hass sans rendu : chargement initial des plans, puis contrôle de mise à jour. */
  private handleHassChange() {
    this.persistence.start();
    this.maybeRefreshUpdateInfo();
  }

  willUpdate(changedProps: PropertyValues<this>) {
    super.willUpdate(changedProps);
    // Lecture seule (constat F11) : aucun outil de tracé actif ni placement en attente, seule la sélection reste possible.
    // Tant que hass n'est pas reçu, les droits sont inconnus : l'outil par défaut (Mur) est conservé.
    if (this.hass && this.readOnly) {
      if (this.activeTool !== 'select') this.activeTool = 'select';
      if (this.pendingPlacement) this.pendingPlacement = null;
    }
    // Volet non réglé par l'utilisateur : il suit le mode étroit.
    if (changedProps.has('narrow') && this.drawerPreference === null) this.isDrawerCollapsed = this.narrow;
    if (this.isConnected) this.persistence.prefetchGhost(this.ghostLevel());
  }

  updated(changedProps: PropertyValues<this>) {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass) this.handleHassChange();
    // Menu ouvert : focus sur l'élément demandé (premier, dernier, ou plan affiché du sélecteur de niveau).
    if (this.pendingMenuFocus && this.activeDropdown) {
      const menu = this.renderRoot.querySelector<HTMLElement>(`#menu-${this.activeDropdown}`);
      if (menu) focusMenuItem(menu, this.pendingMenuFocus);
      this.pendingMenuFocus = null;
    }
  }

  /** Plein écran natif quitté (Échap du navigateur, geste système) : état et classe synchronisés. */
  private syncFullscreenState() {
    const isFs = !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
    this.isFullscreen = isFs;
    this.classList.toggle('is-fullscreen', isFs);
  }

  private closeDropdownOnOutsideClick(e: MouseEvent) {
    if (!this.activeDropdown) return;
    const inside = e.composedPath().some(el => el instanceof HTMLElement && el.classList.contains('dropdown-menu-wrapper'));
    if (!inside) this.closeDropdown({ restoreFocus: false });
  }

  // ==========================================
  // MISES À JOUR (notification seulement)
  // ==========================================

  /**
   * Interroge check_updates au premier hass reçu, puis chaque fois que l'entité update change
   * (version ignorée, installée…). Réservé aux administrateurs : jamais appelé pour les autres.
   */
  private maybeRefreshUpdateInfo() {
    if (!isAdmin(this.hass)) return;
    const signature = updateEntitySignature(this.hass, this.updateInfo?.entityId ?? null);
    if (this.updateCheckStarted && signature === this.updateEntitySig) return;
    this.updateCheckStarted = true;
    this.updateEntitySig = signature;
    void this.refreshUpdateInfo();
  }

  private async refreshUpdateInfo() {
    try {
      const info = await fetchUpdateInfo(this.hass);
      this.updateInfo = info;
      // L'entité peut n'être connue qu'après la première réponse : mémoriser sa signature actuelle.
      this.updateEntitySig = updateEntitySignature(this.hass, info?.entityId ?? null);
      if (!info?.available) this.isUpdateModalOpen = false;
    } catch (err) {
      console.debug('[home-architect] Vérification des mises à jour impossible :', err);
    }
  }

  /** Ouvre la page HA des mises à jour (les brouillons des plans modifiés sont écrits avant de quitter). */
  private openHaUpdates() {
    this.isUpdateModalOpen = false;
    this.isAboutOpen = false;
    this.persistence.flushDrafts();
    navigateInHa(HA_UPDATES_PATH);
  }

  private reloadPage() {
    this.persistence.flushDrafts();
    window.location.reload();
  }

  /**
   * Easter egg « Socrate Rules » : module chargé à la demande, hors du code du studio (constat F162).
   * Sa fermeture est conservée pour l'arrêter si le panneau est quitté.
   */
  public async triggerEasterEgg() {
    try {
      const { launchSocrateRulesEasterEgg } = await import('./core/easter-egg');
      if (!this.isConnected) return;
      this.easterEggCleanup = launchSocrateRulesEasterEgg(this.shadowRoot ?? this);
    } catch (err) {
      console.debug('[home-architect] Easter egg indisponible :', err);
    }
  }

  /**
   * Gestion du clic sur le logo (5 clics consécutifs pour lancer l'easter egg)
   */
  private handleLogoClick() {
    const now = Date.now();
    this.logoClickTimes = this.logoClickTimes.filter((t) => now - t < 2500);
    this.logoClickTimes.push(now);

    if (this.logoClickTimes.length >= 5) {
      this.logoClickTimes = [];
      void this.triggerEasterEgg();
    }
  }

  /** Mot secret tapé hors des champs de saisie, sans modificateur (même garde que les raccourcis). */
  private trackSecretWord(e: KeyboardEvent) {
    if (e.key.length !== 1) return;
    this.secretKeySequence = (this.secretKeySequence + e.key.toLowerCase()).slice(-SECRET_WORD.length);
    if (this.secretKeySequence === SECRET_WORD) {
      this.secretKeySequence = '';
      void this.triggerEasterEgg();
    }
  }

  /**
   * Ouvre la modale d'information / installation de mise à jour
   */
  public openUpdateModal() {
    this.isUpdateModalOpen = true;
  }

  public closeUpdateModal() {
    this.isUpdateModalOpen = false;
    this.updateInstallStatus = 'idle';
    this.updateInstallError = null;
  }

  private async handleInstallUpdate() {
    if (!this.updateInfo?.latestVersion) return;
    this.updateInstallStatus = 'installing';
    this.updateInstallError = null;
    try {
      this.persistence.flushDrafts();
      const res = await installUpdate(this.hass, this.updateInfo.latestVersion);
      if (res.success) {
        this.updateInstallStatus = 'success';
        this.showToast(localize('panel.update.success_title'));
      } else {
        this.updateInstallStatus = 'error';
        this.updateInstallError = localize('panel.update.error_title');
      }
    } catch (err: any) {
      console.error('[home-architect] Update installation error:', err);
      this.updateInstallStatus = 'error';
      this.updateInstallError = err?.message || String(err);
    }
  }

  private async handleRestartHa() {
    try {
      this.showToast(localize('panel.update.restarting'));
      await this.hass.callService('homeassistant', 'restart');
      this.closeUpdateModal();
    } catch (err: any) {
      console.error('[home-architect] Failed to restart Home Assistant:', err);
      this.showToast(err?.message || 'Erreur lors du redémarrage');
    }
  }

  /** Dialogue « À propos » : version, état des mises à jour, liens (release, soutien du projet). */
  private openAbout(e: Event) {
    // Le badge de version fait partie du logo : ce clic ne compte pas pour l'easter egg.
    e.stopPropagation();
    this.closeDropdown({ restoreFocus: false });
    this.isAboutOpen = true;
  }

  /** Bouton de menu de HA (mode étroit ou barre latérale masquée) : ouvre la barre latérale (constat F60). */
  private toggleHaSidebar() {
    this.dispatchEvent(new CustomEvent('hass-toggle-menu', { bubbles: true, composed: true }));
  }

  /** Le panneau fournit le bouton de la barre latérale quand HA la masque (mode étroit, barre « toujours masquée »). */
  private get showMenuButton(): boolean {
    return this.narrow || this.hass?.dockedSidebar === 'always_hidden';
  }

  private toggleDrawer() {
    this.isDrawerCollapsed = !this.isDrawerCollapsed;
    this.drawerPreference = this.isDrawerCollapsed;
    writeDrawerPreference(this.isDrawerCollapsed);
  }

  public showToast(msg: string) {
    this.toastMessage = msg;
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastMessage = null;
      this.toastTimeout = null;
    }, 4500);
  }

  // ==========================================
  // IMPORT, COLLAGE ET DÉPÔT (un seul chemin : la modale d'import ; constats F127, F167)
  // ==========================================

  /** Ouvre la modale d'import, éventuellement avec un fichier ou un code SVG venus d'ailleurs (dépôt, collage). */
  private openImportModal(initial: { file?: Blob; svg?: string } = {}) {
    if (this.readOnly) {
      this.notifyReadOnly();
      return;
    }
    this.importInitialFile = initial.file ?? null;
    this.importInitialSvg = initial.svg ?? null;
    this.isImportModalOpen = true;
  }

  private closeImportModal() {
    this.isImportModalOpen = false;
    this.importInitialFile = null;
    this.importInitialSvg = null;
  }

  /**
   * Image déposée sur le canevas : ouverte dans la modale d'import (validation, compression,
   * vectorisation d'un SVG, mise à l'échelle) comme un fichier choisi dans la modale.
   */
  private handleBackgroundDropped(e: CustomEvent<{ file?: Blob; dataUrl?: string }>) {
    const { file, dataUrl } = e.detail ?? {};
    let blob: Blob | null = file instanceof Blob ? file : null;
    if (!blob && isInlineDataUrl(dataUrl)) {
      try {
        blob = dataUrlToBlob(dataUrl);
      } catch {
        blob = null;
      }
    }
    if (blob) this.openImportModal({ file: blob });
    else this.showToast(localize('panel.toast.image_unreadable'));
  }

  /** L'événement concerne le studio : il vient de son contenu, ou de la page sans focus particulier (studio affiché). */
  private isStudioEvent(e: Event): boolean {
    if (isEventFromHost(e, this)) return true;
    const target = getEventTarget(e);
    return (target === document.body || target === document.documentElement) && this.isConnected && this.getClientRects().length > 0;
  }

  /**
   * Collage dans le studio, hors des champs de saisie et des modales (constat F127) : image ou code
   * SVG → modale d'import (qui reçoit le contenu collé) ; URL d'image → fond externe à étalonner.
   */
  private handlePaste(e: ClipboardEvent) {
    if (e.defaultPrevented || !e.clipboardData || this.isModalOpen() || isEditableTarget(e) || !this.isStudioEvent(e)) return;
    const item = Array.from(e.clipboardData.items).find(i => i.kind === 'file' && i.type.startsWith('image/'));
    const file = item?.getAsFile() ?? null;
    if (file) {
      e.preventDefault();
      this.openImportModal({ file });
      return;
    }
    const text = e.clipboardData.getData('text/plain')?.trim() ?? '';
    if (looksLikeSvgCode(text)) {
      e.preventDefault();
      this.openImportModal({ svg: text });
    } else if (isInlineDataUrl(text) && /^data:image\//i.test(text)) {
      e.preventDefault();
      try {
        this.openImportModal({ file: dataUrlToBlob(text) });
      } catch {
        this.showToast(localize('panel.toast.pasted_image_unreadable'));
      }
    } else if (/\.(png|jpe?g|gif|svg|webp)(\?.*)?$/i.test(text)) {
      e.preventDefault();
      void this.loadExternalBackground(text);
    }
  }

  /** Image de fond référencée par une URL collée (aucun téléversement), puis outil Étalonner. */
  private async loadExternalBackground(url: string) {
    if (!this.persistence.ready) return;
    if (this.readOnly) {
      this.notifyReadOnly();
      return;
    }
    const projectId = this.project.id;
    const background = await this.externalBackground(url);
    if (!background || this.project.id !== projectId) return;
    if (this.commitProject({ ...this.project, background })) {
      this.activeTool = 'calibrate';
      this.showToast(localize('panel.toast.pasted_url_loaded'));
    }
  }

  /**
   * Image référencée par une URL externe : dimensions lues par le navigateur, aucun téléversement.
   * Seules les URL que normalizeProject conserve (http(s) ou chemin du serveur HA) sont acceptées :
   * une autre adresse collée (fichier local, schéma inconnu) disparaîtrait au prochain chargement.
   */
  private externalBackground(url: string): Promise<BackgroundPlan | null> {
    if (url.length > MAX_EXTERNAL_IMAGE_URL_LENGTH || !EXTERNAL_IMAGE_URL.test(url)) {
      this.showToast(localize('panel.toast.image_url_unsupported'));
      return Promise.resolve(null);
    }
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve({
        imageUrl: url,
        opacity: 0.40,
        visible: true,
        offset: { x: 0, y: 0 },
        scale: 1.0,
        rotation: 0,
        widthPx: img.naturalWidth,
        heightPx: img.naturalHeight
      });
      img.onerror = () => {
        this.showToast(localize('panel.toast.image_load_error'));
        resolve(null);
      };
      img.src = url;
    });
  }

  /** Téléverse l'image fournie par la modale d'import pour `projectId` (null : échec déjà signalé). */
  private uploadImportBackground(projectId: string, detail: ImportModalResult, defaultOpacity: number): Promise<BackgroundPlan | null> {
    const imported = detail.background;
    if (!imported) return Promise.resolve(null);
    const opacity = Number.isFinite(detail.opacity) ? detail.opacity : defaultOpacity;
    return this.persistence.withBusy(localize('panel.persist.uploading_background'), () =>
      this.persistence.uploadImportedBackground(projectId, imported, opacity)
    );
  }

  /**
   * Import confirmé (SPEC §6) : l'image arrive déjà compressée ; elle est téléversée et le plan n'en
   * garde que la référence. pixelsPerMeter (échelle d'affichage et d'export) ne dépend jamais du
   * fichier : la largeur saisie règle l'échelle du calque, background.scale (constats F70, F71, F72).
   */
  private async handleImportConfirmed(e: CustomEvent<ImportModalResult>) {
    this.closeImportModal();
    const detail = e.detail;
    if (!detail) return;
    if (this.readOnly) {
      this.notifyReadOnly();
      return;
    }
    const interpretation = detail.isSvgVectorized && detail.svgInterpretation?.success ? detail.svgInterpretation : null;
    if (interpretation) {
      await this.importVectorizedPlan(detail, interpretation);
      return;
    }

    const projectId = this.project.id;
    const background = await this.uploadImportBackground(projectId, detail, 0.40);
    if (!background || this.project.id !== projectId) return;
    const metersPerPixel = detail.mode === 'auto_dimension' ? importMetersPerPixel(detail, background) : null;
    const placed = metersPerPixel !== null ? { ...background, scale: metersPerPixel * this.project.pixelsPerMeter } : background;
    if (!this.commitProject({ ...this.project, background: placed })) return;

    if (metersPerPixel !== null) {
      this.activeTool = 'wall';
      this.showToast(localize('panel.toast.import_scaled'));
    } else {
      this.activeTool = 'calibrate';
      this.showToast(localize('panel.toast.import_calibrate'));
    }
    void this.fitCanvasAfterUpdate();
  }

  /**
   * Import d'un SVG vectorisé (murs, ouvertures, pièces). Sur un plan qui a déjà du contenu,
   * l'utilisateur choisit : remplacer le dessin, l'ajouter à côté, ou l'ouvrir dans un nouveau plan
   * du niveau courant (constat F158). L'image de fond existante n'est jamais retirée sans calque
   * de remplacement.
   */
  private async importVectorizedPlan(detail: ImportModalResult, interpretation: SvgParseResult) {
    const geometry = cleanImportedGeometry(interpretation, effectiveCeilingHeight(this.project));
    const wantsBackground = !!detail.background && detail.keepSvgBackground !== false;
    if (geometry.walls.length + geometry.rooms.length === 0 && !wantsBackground) {
      this.showToast(localize('panel.toast.import_empty'));
      return;
    }

    let mode: 'replace' | 'add' | 'new' = 'replace';
    if (!isEmptyProject(this.project)) {
      const choice = await this.askVectorizedImportMode(geometry, detail.targetLevel);
      if (choice === null) return;
      mode = choice;
    }
    if (mode === 'new') {
      const category = detail.targetLevel || this.project.category || DEFAULT_LEVEL;
      if (!(await this.persistence.createPlan(localize('panel.import.new_plan_name'), category, { confirmed: true }))) return;
    }

    const projectId = this.project.id;
    // « Ajouter à côté » d'un plan qui a déjà un calque : le calque du SVG ne le remplace pas.
    const keepCurrentBackground = mode === 'add' && !!this.project.background;
    const uploaded = wantsBackground && !keepCurrentBackground
      ? await this.uploadImportBackground(projectId, detail, 0.25)
      : null;
    if (this.project.id !== projectId) return;

    const project = this.project;
    let offset: Point = { x: 0, y: 0 };
    if (mode === 'add') {
      const existing = contentBounds(project);
      const imported = contentBounds({ walls: geometry.walls, rooms: geometry.rooms, bindings: [], furniture: [] });
      if (existing && imported) offset = sideBySideOffset(existing, imported);
    }
    const placed = translateGeometry(geometry, offset);
    // Calque d'origine (1 px = 1 unité de la viewBox) aligné sur les murs vectorisés par son échelle.
    const metersPerUnit = Number.isFinite(detail.metersPerPixel) && (detail.metersPerPixel as number) > 0
      ? detail.metersPerPixel as number
      : interpretation.metersPerUnit;
    const background = uploaded && Number.isFinite(metersPerUnit) && metersPerUnit > 0
      ? { ...uploaded, scale: metersPerUnit * project.pixelsPerMeter, offset }
      : uploaded ?? project.background;

    const merged: PlanGeometry = mode === 'add'
      ? {
        walls: [...project.walls, ...placed.walls],
        openings: [...project.openings, ...placed.openings],
        rooms: [...project.rooms, ...placed.rooms]
      }
      : placed;
    if (!this.commitProject({ ...project, ...merged, background })) return;

    this.activeTool = 'select';
    const stats = geometryStats(placed);
    const parts = [localize(mode === 'add' ? 'panel.toast.svg_converted_added' : 'panel.toast.svg_converted', {
      walls: localizeCount('panel.count.walls', stats.walls),
      doors: localizeCount('panel.count.doors', stats.doors),
      windows: localizeCount('panel.count.windows', stats.windows),
      rooms: localizeCount('panel.count.rooms', stats.rooms)
    })];
    if (wantsBackground && keepCurrentBackground) parts.push(localize('panel.toast.svg_layer_kept_existing'));
    else if (wantsBackground && !uploaded) parts.push(localize('panel.toast.svg_layer_not_imported'));
    this.showToast(parts.join(' '));
    void this.fitCanvasAfterUpdate();
  }

  /** Plan non vide : remplacer le dessin, l'ajouter à côté ou créer un nouveau plan (null : annulé). */
  private async askVectorizedImportMode(geometry: PlanGeometry, targetLevel: string | undefined): Promise<'replace' | 'add' | 'new' | null> {
    const stats = geometryStats(geometry);
    const level = getLevelLabel(targetLevel || this.project.category);
    const choice = await this.persistence.ask({
      icon: '📐',
      title: localize('panel.import.ask.title'),
      subtitle: quoted(this.project.name),
      message: localize('panel.import.ask.message', {
        walls: localizeCount('panel.count.walls', stats.walls),
        openings: localizeCount('panel.count.openings', stats.doors + stats.windows),
        rooms: localizeCount('panel.count.rooms', stats.rooms),
        current_walls: localizeCount('panel.count.walls', this.project.walls.length),
        current_rooms: localizeCount('panel.count.rooms', this.project.rooms.length)
      }),
      details: [
        localize('panel.import.ask.detail_replace'),
        localize('panel.import.ask.detail_add'),
        localize('panel.import.ask.detail_new', { level }),
        localize('panel.import.ask.detail_undo')
      ],
      actions: [
        { id: 'new', label: localize('panel.import.ask.new'), icon: '📄', kind: 'secondary' },
        { id: 'add', label: localize('panel.import.ask.add'), icon: '➕', kind: 'secondary' },
        { id: 'replace', label: localize('panel.import.ask.replace'), icon: '♻️', kind: 'danger' }
      ],
      tone: 'warning'
    });
    return choice === 'replace' || choice === 'add' || choice === 'new' ? choice : null;
  }

  /** Sauvegarde JSON réimportée (modale d'import) : ouverte comme un nouveau plan, rien n'est écrasé (constat F112). */
  private async handleImportProjectBackup(e: CustomEvent<ImportProjectBackupDetail>) {
    this.closeImportModal();
    const project = e.detail?.project;
    if (project) await this.persistence.importProject(project);
  }

  // ==========================================
  // ÉTALONNAGE ET MISE À L'ÉCHELLE (constats F49, F51, F141, F142)
  // ==========================================

  private handleRequestCalibration(e: CustomEvent<{ worldDistance: number; defaultMeters: number }>) {
    const { worldDistance, defaultMeters } = e.detail ?? {};
    if (!(Number.isFinite(worldDistance) && worldDistance > 0)) return;
    this.calibrationData = {
      worldDistance,
      defaultMeters: Number.isFinite(defaultMeters) && defaultMeters > 0 ? defaultMeters : worldDistance
    };
    this.isCalibrateModalOpen = true;
  }

  private closeCalibrateModal() {
    this.isCalibrateModalOpen = false;
    this.calibrationData = null;
  }

  /**
   * Étalonnage confirmé (SPEC §6) : 'background' ne change que l'échelle du calque de fond (géométrie
   * intacte) ; 'project' met tout le plan à l'échelle, calque compris, comme « Mettre à l'échelle ».
   * Le facteur est revalidé ; pixelsPerMeter ne change pas (constat F71).
   */
  private handleCalibrateConfirmed(e: CustomEvent<CalibrateConfirmedDetail>) {
    const detail = e.detail;
    this.closeCalibrateModal();
    if (!detail) return;
    const k = Number.isFinite(detail.scaleFactor) && detail.scaleFactor > 0
      ? detail.scaleFactor
      : this.project.pixelsPerMeter / detail.pixelsPerMeter;
    if (!isValidRescaleFactor(k)) {
      this.showToast(localize('panel.toast.calibration_refused', this.scaleLimits()));
      return;
    }
    if (Math.abs(k - 1) >= 1e-4) {
      if (detail.mode === 'project') {
        if (!this.applyScale(k, true, localize('panel.scale.calibrated'))) return;
      } else {
        const bg = this.project.background;
        if (!bg) {
          this.showToast(localize('panel.toast.no_background_to_calibrate'));
          return;
        }
        if (!this.commitProject({ ...this.project, background: scaleBackgroundLayer(bg, k) })) return;
        this.showToast(localize('panel.toast.background_calibrated', { factor: formatScaleFactor(k) }));
      }
    }
    this.activeTool = 'wall';
  }

  private handleRequestRescale(e: CustomEvent<{ measuredMeters: number }>) {
    const measured = e.detail?.measuredMeters;
    if (!(Number.isFinite(measured) && measured > 0)) return;
    this.rescaleMeasuredMeters = measured;
    this.isRescaleModalOpen = true;
  }

  private handleRescaleConfirmed(e: CustomEvent<RescaleModalResult>) {
    const { scaleFactor, adjustBackground, scaleElements } = e.detail ?? {};
    this.isRescaleModalOpen = false;
    // Revalidé avant toute modification : facteur fini et borné (constat F141).
    if (!isValidRescaleFactor(scaleFactor)) {
      this.showToast(localize('panel.toast.rescale_refused', this.scaleLimits()));
      return;
    }
    if (Math.abs(scaleFactor - 1) < 1e-4) return;
    if (this.applyScale(scaleFactor, adjustBackground === true, localize('panel.scale.rescaled'), scaleElements !== false)) this.activeTool = 'select';
  }

  /** Bornes du facteur d'échelle, formatées pour les messages de refus. */
  private scaleLimits(): { min: string; max: string } {
    return { min: formatNumber(SCALE_FACTOR_LIMITS.min), max: formatNumber(SCALE_FACTOR_LIMITS.max) };
  }

  /**
   * Met le plan à l'échelle (positions × k). Épaisseurs, ouvertures et meubles sont également mis à l'échelle
   * proportionnellement si scaleElements=true. Renvoie false si rien n'a été appliqué.
   */
  private applyScale(k: number, adjustBackground: boolean, label: string, scaleElements: boolean = true): boolean {
    const { project, openingConflicts } = scalePlan(this.project, k, { adjustBackground, scaleElements });
    if (!this.commitProject(project)) return false;
    const message = localize('panel.toast.scaled', {
      label,
      factor: formatScaleFactor(k),
      walls: localizeCount('panel.count.walls', project.walls.length),
      rooms: localizeCount('panel.count.rooms', project.rooms.length)
    });
    this.showToast(openingConflicts > 0
      ? `${message} ${localizeCount('panel.toast.scale_conflicts', openingConflicts)}`
      : message);
    void this.fitCanvasAfterUpdate();
    return true;
  }

  private handleOpacityChange(e: Event) {
    const opacity = parseFloat((e.target as HTMLInputElement).value);
    const bg = this.project.background;
    if (bg && Number.isFinite(opacity) && opacity !== bg.opacity) {
      this.commitProject({
        ...this.project,
        background: { ...bg, opacity }
      }, { coalesceKey: 'background-opacity' });
    }
  }

  /**
   * Hauteur sous plafond par défaut : les pièces sans hauteur propre la suivent ; celles qui avaient
   * l'ancienne valeur par défaut peuvent la suivre aussi, sur confirmation (constat F150).
   */
  private async handleDefaultCeilingChange(val: number) {
    const previous = effectiveCeilingHeight(this.project);
    if (!Number.isFinite(val) || val <= 0 || Math.abs(val - previous) < 1e-6) return;
    if (!this.commitProject({ ...this.project, defaultCeilingHeight: val })) return;
    this.showToast(localize('panel.toast.default_ceiling', { height: formatMeters(val) }));
    // Pièces ET murs : les murs de l'ancien assistant portent la hauteur de leur pièce (3D cohérente).
    const count = countWithHeight(this.project, previous);
    if (count.rooms + count.walls === 0) return;
    const items = joinPair([
      ...(count.rooms > 0 ? [localizeCount('panel.count.rooms', count.rooms)] : []),
      ...(count.walls > 0 ? [localizeCount('panel.count.walls', count.walls)] : [])
    ]);
    const choice = await this.persistence.ask({
      icon: '📐',
      title: localize('panel.ceiling.ask.title'),
      message: localize('panel.ceiling.ask.message', { items, previous: formatMeters(previous), next: formatMeters(val) }),
      details: [localize('panel.ceiling.ask.detail')],
      actions: [{ id: 'apply', label: localize('panel.common.apply'), icon: '✅', kind: 'primary' }],
      cancelLabel: localize('panel.ceiling.ask.keep')
    });
    if (choice !== 'apply') return;
    const next = inheritDefaultHeight(this.project, previous);
    if (next !== this.project && this.commitProject(next)) this.showToast(localize('panel.toast.ceiling_inherited', { items }));
  }

  /** Modale pièce : nom, couleur, hauteur (propre ou héritée du projet, constat F150) et zone HA. */
  private handleSaveRoom(e: CustomEvent<RoomModalSaveDetail>) {
    const detail = e.detail;
    this.selectedRoomForEdit = null;
    if (!detail) return;
    const updatedRooms = mapChanged(this.project.rooms, r => {
      if (r.id !== detail.roomId) return r;
      const next: Room = { ...r, name: detail.name, color: detail.color };
      if (detail.inheritHeight) delete next.height;
      else next.height = detail.height;
      if (detail.area_id) next.area_id = detail.area_id;
      else delete next.area_id;
      const unchanged = next.name === r.name && next.color === r.color && next.height === r.height && next.area_id === r.area_id;
      return unchanged ? r : next;
    });
    if (updatedRooms && this.commitProject({ ...this.project, rooms: updatedRooms })) {
      this.showToast(localize('panel.toast.room_updated', { name: detail.name, height: formatMeters(detail.height) }));
    }
  }

  private handleDeleteRoom(e: CustomEvent<{ roomId: string }>) {
    const roomId = e.detail?.roomId;
    this.selectedRoomForEdit = null;
    const rooms = this.project.rooms.filter(r => r.id !== roomId);
    if (rooms.length === this.project.rooms.length || !this.commitProject({ ...this.project, rooms })) return;
    // La sélection ne garde pas l'identifiant de la pièce supprimée (constat F130).
    if (this.selectedElements.roomIds.includes(roomId)) {
      this.selectedElements = { ...this.selectedElements, roomIds: this.selectedElements.roomIds.filter(id => id !== roomId) };
    }
    this.showToast(localize('panel.toast.room_deleted'));
  }

  private openSelectedRoomModal(roomId: string): void {
    const room = this.project.rooms.find(r => r.id === roomId);
    if (room) {
      this.selectedRoomForEdit = room;
    }
  }

  private handleUndo() {
    if (!this.persistence.undo()) return;
    this.clearSelection();
    this.showToast(localize('panel.toast.undone'));
  }

  private handleRedo() {
    if (!this.persistence.redo()) return;
    this.clearSelection();
    this.showToast(localize('panel.toast.redone'));
  }

  /**
   * Niveau affiché en filigrane : celui choisi pour le plan (ghostLevelId), sinon celui situé sous
   * le niveau du plan actif (d'après sa catégorie, constat F15).
   */
  private ghostLevel(): string | null {
    if (!this.showGhostLevel) return null;
    const chosen = this.project.ghostLevelId;
    return chosen && isKnownLevel(chosen) && chosen !== this.activeLevel ? chosen : getLevelBelow(this.activeLevel);
  }

  /** Bouton « Pivoter 90° » du HUD (la touche R est gérée par le canevas seul, constat F40). */
  private rotateSelectedFurniture() {
    const furnIds = this.selectedElements.furnitureIds ?? [];
    if (furnIds.length === 0) return;
    const furniture = mapChanged(this.project.furniture ?? [], f =>
      furnIds.includes(f.id) ? { ...f, rotation: (((f.rotation || 0) % 360) + 450) % 360 } : f
    );
    if (furniture && this.commitProject({ ...this.project, furniture })) {
      this.showToast(localize('panel.toast.furniture_rotated'));
    }
  }

  /** Couleur des meubles sélectionnés (HUD) ; null rétablit la couleur du modèle (constat F151). */
  private updateSelectedFurnitureColor(color: string | null) {
    const ids = this.selectedElements.furnitureIds ?? [];
    if (ids.length === 0 || (color !== null && !HEX_COLOR.test(color))) return;
    const furniture = mapChanged(this.project.furniture ?? [], f => {
      if (!ids.includes(f.id) || (f.color ?? null) === color) return f;
      const next = { ...f };
      if (color) next.color = color;
      else delete next.color;
      return next;
    });
    // Glisser dans le sélecteur de couleur : une seule entrée d'historique.
    if (furniture) this.commitProject({ ...this.project, furniture }, { coalesceKey: 'furniture-color' });
  }

  /** Sélection limitée aux éléments qui existent encore dans le plan (identifiants périmés ignorés, constat F130). */
  private liveSelection(): SelectedElements {
    const { walls, openings, rooms, bindings, furniture = [] } = this.project;
    const s = this.selectedElements;
    const existing = (list: Array<{ id: string }>) => {
      const ids = new Set(list.map(item => item.id));
      return (id: string) => ids.has(id);
    };
    return {
      wallIds: s.wallIds.filter(existing(walls)),
      openingIds: s.openingIds.filter(existing(openings)),
      roomIds: s.roomIds.filter(existing(rooms)),
      bindingIds: s.bindingIds.filter(existing(bindings)),
      furnitureIds: (s.furnitureIds ?? []).filter(existing(furniture))
    };
  }

  private handleDeleteSelected() {
    const selection = this.liveSelection();
    const total = countSelection(selection);
    if (total === 0) {
      this.clearSelection();
      return;
    }
    const { wallIds, openingIds, roomIds, bindingIds } = selection;
    const furnitureIds = selection.furnitureIds ?? [];
    const committed = this.commitProject({
      ...this.project,
      walls: this.project.walls.filter(w => !wallIds.includes(w.id)),
      openings: this.project.openings.filter(op => !openingIds.includes(op.id) && !wallIds.includes(op.wallId)),
      rooms: this.project.rooms.filter(r => !roomIds.includes(r.id)),
      bindings: this.project.bindings.filter(b => !bindingIds.includes(b.id)),
      furniture: (this.project.furniture || []).filter(f => !furnitureIds.includes(f.id))
    });
    if (!committed) return;

    this.clearSelection();
    this.showToast(localizeCount('panel.toast.elements_deleted', total));
  }

  private clearSelection() {
    this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] };
  }

  /**
   * Ouvre ou ferme un menu de la barre supérieure. À l'ouverture, le focus passe dans le menu
   * (premier élément, dernier avec Flèche haut, plan affiché pour le sélecteur de niveau).
   */
  private toggleDropdown(name: DropdownName, e?: Event, focus: 'first' | 'last' = 'first') {
    e?.stopPropagation();
    if (this.activeDropdown === name) {
      this.closeDropdown({ restoreFocus: false });
      return;
    }
    this.activeDropdown = name;
    this.pendingMenuFocus = name === 'level' && focus === 'first' ? 'checked' : focus;
    // Liste des plans à jour (autres appareils) à chaque ouverture du sélecteur de niveau.
    if (name === 'level') void this.persistence.refreshSummaries();
  }

  /** Ferme le menu ouvert ; `restoreFocus` rend le focus à son bouton (Échap, Tab, élément activé). */
  private closeDropdown(opts: { restoreFocus: boolean }) {
    const name = this.activeDropdown;
    if (!name) return;
    if (opts.restoreFocus) this.renderRoot.querySelector<HTMLElement>(`#menu-${name}-trigger`)?.focus();
    this.activeDropdown = null;
    this.pendingMenuFocus = null;
  }

  /** Action d'un élément de menu : le menu se ferme et rend le focus à son bouton, puis l'action s'exécute. */
  private menuAction(action: () => void) {
    return () => {
      this.closeDropdown({ restoreFocus: true });
      action();
    };
  }

  /** Bouton d'un menu : Flèche bas / haut ouvre le menu sur son premier / dernier élément. */
  private handleTriggerKeydown(e: KeyboardEvent, name: DropdownName) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const focus = e.key === 'ArrowUp' ? 'last' : 'first';
    if (this.activeDropdown !== name) {
      this.toggleDropdown(name, undefined, focus);
      return;
    }
    const menu = this.renderRoot.querySelector<HTMLElement>(`#menu-${name}`);
    if (menu) focusMenuItem(menu, focus);
  }

  private handleMenuKeydown(e: KeyboardEvent) {
    const menu = e.currentTarget as HTMLElement;
    handleMenuKeydown(e, menu, opts => this.closeDropdown(opts));
  }

  private getActiveTypology(): string {
    if (this.selectedTypologyTab) {
      return this.selectedTypologyTab;
    }
    if (this.selectedElements.bindingIds.length > 0) {
      const b = this.project.bindings.find(item => item.id === this.selectedElements.bindingIds[0]);
      if (b) {
        const domain = b.entityId.split('.')[0];
        if (TYPOLOGY_ICONS[domain]) return domain;
      }
    }
    return 'light';
  }

  private updateSelectedBindingIcon(icon: string, mdi?: string) {
    if (!this.selectedElements.bindingIds || this.selectedElements.bindingIds.length === 0) return;
    const bindingId = this.selectedElements.bindingIds[0];
    // Entrée puis change sur le champ libre : la seconde application, identique, n'est pas empilée.
    const newBindings = mapChanged(this.project.bindings, b =>
      b.id === bindingId && (b.icon !== icon || b.mdiIcon !== mdi) ? { ...b, icon, mdiIcon: mdi } : b
    );
    if (newBindings && this.commitProject({ ...this.project, bindings: newBindings })) {
      this.showToast(localize('panel.toast.icon_applied', { icon }));
    }
  }

  /** Résumé du HUD : éléments existants seulement ; nom live des entités et nom actuel des meubles (constat F172). */
  private getSelectedSummary(selection: SelectedElements): string {
    const parts: string[] = [];
    if (selection.wallIds.length > 0) parts.push(localizeCount('panel.count.walls', selection.wallIds.length));
    if (selection.openingIds.length > 0) parts.push(localizeCount('panel.count.sashes', selection.openingIds.length));
    if (selection.roomIds.length > 0) parts.push(localizeCount('panel.count.rooms', selection.roomIds.length));
    if (selection.bindingIds.length === 1) {
      const b = this.project.bindings.find(item => item.id === selection.bindingIds[0]);
      parts.push(b ? bindingDisplayName(b, this.hass?.states) : localizeCount('panel.count.entities', 1));
    } else if (selection.bindingIds.length > 1) {
      parts.push(localizeCount('panel.count.entities', selection.bindingIds.length));
    }
    const furnitureIds = selection.furnitureIds ?? [];
    if (furnitureIds.length === 1) {
      const item = (this.project.furniture ?? []).find(f => f.id === furnitureIds[0]);
      parts.push(item ? furnitureDisplayName(item) : localizeCount('panel.count.furniture', 1));
    } else if (furnitureIds.length > 1) {
      parts.push(localizeCount('panel.count.furniture', furnitureIds.length));
    }
    return parts.join(', ');
  }

  // ==========================================
  // CLAVIER (constats F4, F40, F128, F129)
  // ==========================================

  /**
   * Raccourcis du studio, écoutés sur document :
   * - uniquement pour un événement du studio (focus dans le studio, ou nulle part et studio affiché) ;
   * - Ctrl/Cmd+S aussi depuis un champ du studio ; Échap ferme d'abord la modale ou le menu ouvert ;
   * - les autres jamais dans un champ de saisie ni sous une modale ;
   * - touches simples (outils de TOOL_SHORTCUTS, Suppr) jamais avec Ctrl/Cmd/Alt ; R (rotation),
   *   Espace/F (sens d'ouverture) et les flèches appartiennent au canevas.
   */
  private handleKeyDown(e: KeyboardEvent) {
    // Événements synthétiques sans touche (remplissage automatique du navigateur) : rien à traiter.
    if (typeof e.key !== 'string' || e.defaultPrevented) return;
    if (!isEventFromHost(e, this) && !shouldHandleShortcut(e, { host: this, allowWhenModalOpen: true })) return;
    const key = e.key.toLowerCase();

    // Ctrl/Cmd+S : sauvegarde du plan actif, y compris depuis un champ du studio (constat F2).
    if (hasPrimaryModifier(e) && !e.shiftKey && key === 's') {
      e.preventDefault();
      if (!this.isModalOpen()) void this.quickSave();
      return;
    }
    // Dialogues de persistance et écrans d'attente : seule Échap est traitée (fermeture).
    if (this.persistence.handleBlockingKey(e)) return;
    if (e.key === 'Escape') {
      this.handleEscape(e);
      return;
    }
    if (!shouldHandleShortcut(e, { host: this, modalOpen: this.isModalOpen() })) return;

    if (hasPrimaryModifier(e)) {
      if (key === 'z' && !e.shiftKey) {
        e.preventDefault();
        this.handleUndo();
      } else if (key === 'y' || (key === 'z' && e.shiftKey)) {
        e.preventDefault();
        this.handleRedo();
      }
      return;
    }
    // Alt+N : nouveau plan (Ctrl+N est réservé par le navigateur). Touche physique : sur macOS, Alt+N saisit un accent.
    if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey && e.code === 'KeyN') {
      e.preventDefault();
      this.openNewPlanModal();
      return;
    }
    if (hasCommandModifier(e)) return;

    this.trackSecretWord(e);
    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (countSelection(this.liveSelection()) > 0) {
        e.preventDefault();
        this.handleDeleteSelected();
      }
      return;
    }
    if (e.shiftKey) return;
    const tool = toolForShortcut(key);
    if (!tool) return;
    // Traitée ici (defaultPrevented), répétition automatique comprise : les raccourcis globaux de HA
    // (ex. « d ») ne s'ouvrent pas en plus quand la touche reste enfoncée.
    e.preventDefault();
    if (e.repeat) return;
    if (tool !== 'select' && this.readOnly) {
      this.notifyReadOnly();
      return;
    }
    this.selectTool(tool);
  }

  /**
   * Échap : ferme la modale ou le menu ouvert ; sinon (hors champ de saisie) annule le placement en
   * attente, quitte le plein écran de repli et vide la sélection. Une touche qui a seulement fermé
   * un menu ou annulé un placement est marquée traitée : le canevas ne vide pas en plus la sélection.
   */
  private handleEscape(e: KeyboardEvent) {
    if (this.closeTopModal()) {
      e.preventDefault();
      return;
    }
    if (this.activeDropdown) {
      e.preventDefault();
      this.closeDropdown({ restoreFocus: true });
      return;
    }
    if (isEditableTarget(e)) return;
    if (this.pendingPlacement) {
      e.preventDefault();
      this.pendingPlacement = null;
      return;
    }
    if (this.isFullscreen) void this.toggleFullscreen();
    this.clearSelection();
  }

  /** Ferme la modale du studio au premier plan ; false s'il n'y en a aucune. */
  private closeTopModal(): boolean {
    if (this.isUpdateModalOpen) {
      if (this.updateInstallStatus !== 'installing') this.closeUpdateModal();
    }
    else if (this.isAboutOpen) this.isAboutOpen = false;
    else if (this.isNewPlanModalOpen) this.isNewPlanModalOpen = false;
    else if (this.isResetModalOpen) this.isResetModalOpen = false;
    else if (this.isWizardOpen) this.isWizardOpen = false;
    else if (this.isExportModalOpen) this.isExportModalOpen = false;
    else if (this.isSaveLoadModalOpen) this.isSaveLoadModalOpen = false;
    else if (this.selectedRoomForEdit) this.selectedRoomForEdit = null;
    else if (this.isCalibrateModalOpen) this.closeCalibrateModal();
    else if (this.isRescaleModalOpen) this.isRescaleModalOpen = false;
    else if (this.isImportModalOpen) this.closeImportModal();
    else return false;
    return true;
  }

  // ==========================================
  // VOLET : « TOUCHER POUR PLACER » (constat F60)
  // ==========================================

  /** Élément choisi dans le volet : posé au prochain appui sur le plan (alternative tactile au glisser-déposer). */
  private handleDrawerItemPicked(e: CustomEvent<{ payload: DrawerItemPayload }>) {
    const payload = e.detail?.payload;
    if (!payload) return;
    if (this.readOnly) {
      this.notifyReadOnly();
      return;
    }
    this.pendingPlacement = payload;
    // Le placement se fait sur le plan 2D ; en mode étroit, le volet superposé libère le plan.
    this.is3DMode = false;
    if (this.narrow) this.isDrawerCollapsed = true;
    this.showToast(localize('panel.toast.tap_to_place', { name: this.placementLabel(payload) }));
  }

  private placementLabel(payload: DrawerItemPayload): string {
    if (payload.kind === 'furniture') return furnitureDisplayName({ type: payload.furnitureType, name: '' });
    return bindingDisplayName({ entityId: payload.entityId }, this.hass?.states);
  }

  private handlePlacementDone() {
    this.pendingPlacement = null;
  }

  public async toggleFullscreen() {
    const isDocFs = !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    );

    if (!this.isFullscreen && !isDocFs) {
      try {
        const elem: any = this || document.documentElement;
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          await elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
          await elem.msRequestFullscreen();
        }
      } catch (err) {
        console.warn('Mode plein écran natif indisponible, utilisation du mode étendu:', err);
      }
      this.isFullscreen = true;
      this.classList.add('is-fullscreen');
      this.showToast(localize('panel.toast.fullscreen_on'));
    } else {
      try {
        const doc: any = document;
        if (doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement) {
          if (doc.exitFullscreen) {
            await doc.exitFullscreen();
          } else if (doc.webkitExitFullscreen) {
            await doc.webkitExitFullscreen();
          } else if (doc.mozCancelFullScreen) {
            await doc.mozCancelFullScreen();
          } else if (doc.msExitFullscreen) {
            await doc.msExitFullscreen();
          }
        }
      } catch (err) {
        console.warn('Erreur lors de la sortie du mode plein écran:', err);
      }
      this.isFullscreen = false;
      this.classList.remove('is-fullscreen');
      this.showToast(localize('panel.toast.fullscreen_off'));
    }
  }

  private openNewPlanModal() {
    if (this.readOnly) {
      this.notifyReadOnly();
      return;
    }
    const level = this.activeLevel ?? DEFAULT_LEVEL;
    this.newPlanName = localize('panel.new_plan.default_name', { level: getLevelLabel(level) });
    this.newPlanCategory = level;
    this.isNewPlanModalOpen = true;
  }

  /**
   * Nouveau plan : identifiant immuable généré, catégorie séparée (constat F3). Le plan en cours
   * reste ouvert avec ses modifications et aucun plan existant n'est remplacé.
   */
  private async handleConfirmNewPlan() {
    const name = this.newPlanName.trim() || localize('panel.new_plan.fallback_name');
    const category = this.newPlanCategory || DEFAULT_LEVEL;
    if (await this.persistence.createPlan(name, category)) this.isNewPlanModalOpen = false;
  }

  private openResetModal() {
    if (this.readOnly) {
      this.notifyReadOnly();
      return;
    }
    this.isResetModalOpen = true;
  }

  private handleConfirmResetPlan() {
    this.isResetModalOpen = false;
    if (isEmptyProject(this.project)) return;
    const committed = this.commitProject({
      ...this.project,
      walls: [],
      openings: [],
      rooms: [],
      bindings: [],
      furniture: [],
      background: undefined
    });
    if (!committed) return;
    this.clearSelection();
    this.showToast(localize('panel.toast.plan_reset'));
    void this.fitCanvasAfterUpdate();
  }

  private openWizard() {
    if (this.readOnly) {
      this.notifyReadOnly();
      return;
    }
    this.isWizardOpen = true;
  }

  private openSaveModal() {
    if (this.readOnly) {
      this.notifyReadOnly();
      return;
    }
    this.saveLoadModalTab = 'save';
    this.isSaveLoadModalOpen = true;
  }

  private openLoadModal() {
    this.saveLoadModalTab = 'load';
    this.isSaveLoadModalOpen = true;
  }

  // ==========================================
  // PERSISTANCE (src/panel/persistence-controller.ts)
  // ==========================================

  /**
   * Modale « Ouvrir » : la modale a déjà averti des modifications non sauvegardées (dirtyProjectIds)
   * et l'utilisateur a confirmé : un plan déjà ouvert est rechargé depuis le serveur sans nouvelle question.
   */
  private async handleLoadProject(e: CustomEvent<{ projectId: string }>) {
    this.isSaveLoadModalOpen = false;
    const id = e.detail?.projectId;
    if (typeof id !== 'string' || id === '') return;
    await this.persistence.openPlan(id, { reload: true });
  }

  /** Modale « Sauvegarder » : nom, catégorie et « Enregistrer sous… » (nouvel identifiant). */
  private async handleSaveConfirmed(e: CustomEvent<{ name: string; category: string; saveAs?: boolean }>) {
    this.isSaveLoadModalOpen = false;
    await this.persistence.saveFromDialog(e.detail);
  }

  /** Ctrl/Cmd+S : sauvegarde directe d'un plan déjà enregistré ; un nouveau plan passe par la modale (nom, niveau). */
  private async quickSave() {
    if (this.readOnly) {
      this.notifyReadOnly();
      return;
    }
    if (!this.persistence.ready) return;
    if (this.project.revision === undefined) {
      this.openSaveModal();
      return;
    }
    await this.persistence.save(this.project.id);
  }

  private async saveAllDirty() {
    await this.persistence.saveAllDirty();
  }

  private handleExportFrameChanged(e: CustomEvent<{ frame: ExportFrame }>) {
    this.persistence.setExportFrame(e.detail?.frame);
  }

  private handleProjectPublished(e: CustomEvent<{ publish: PublishInfo }>) {
    this.persistence.setPublish(e.detail?.publish);
  }

  private handleProjectUnpublished(e: CustomEvent<{ projectId: string }>) {
    const id = e.detail?.projectId;
    if (typeof id === 'string') this.persistence.clearPublish(id);
  }

  /**
   * Modale d'export : « Sauvegarder le plan » (nécessaire avant de publier). Un plan jamais
   * sauvegardé passe par la modale de sauvegarde (nom, niveau) ; les autres sont sauvegardés
   * directement, la modale d'export restant ouverte.
   */
  private handleExportSaveRequested() {
    if (this.project.revision === undefined) {
      this.isExportModalOpen = false;
      this.openSaveModal();
      return;
    }
    void this.persistence.save(this.project.id);
  }

  /** Au moins une modale ou un dialogue du studio est ouvert. */
  private isModalOpen(): boolean {
    return this.isWizardOpen || this.isImportModalOpen || this.isExportModalOpen || this.isSaveLoadModalOpen ||
      this.isNewPlanModalOpen || this.isResetModalOpen || this.isCalibrateModalOpen || this.isRescaleModalOpen ||
      this.isUpdateModalOpen || this.isAboutOpen || this.selectedRoomForEdit !== null || this.persistence.isBlocking();
  }

  /** Bandeau « rechargez la page » quand une nouvelle version a été installée pendant la session (F106). */
  private updateBanners(): PanelNotice[] {
    if (!this.updateInfo?.reloadRequired) return [];
    const version = this.updateInfo.installedVersion;
    return [{
      key: 'reload-required',
      kind: 'info',
      dismissible: false,
      message: () => localize('panel.notice.reload_required', { version, bundles: describeLoadedBundles() || VERSION }),
      actions: [{ label: () => localize('panel.common.reload'), run: () => this.reloadPage() }]
    }];
  }

  /** Pastille « modifications non sauvegardées » (texte équivalent pour les lecteurs d'écran). */
  private renderDirtyDot() {
    const label = localize('panel.common.unsaved_changes');
    return html`<span class="dirty-dot" title=${label}><span aria-hidden="true">●</span><span class="visually-hidden">${label}</span></span>`;
  }

  /** Nom d'un niveau dans le sélecteur : libellé court, et libellé long s'il apporte une précision. */
  private levelMenuName(level: { id: string; fullLabel: string }): string {
    const label = getLevelLabel(level.id);
    return level.fullLabel && level.fullLabel !== label ? localize('panel.level.name_with_full', { label, full: level.fullLabel }) : label;
  }

  /** Sélecteur de niveau : les plans de chaque niveau (par catégorie), puis les plans « Autre ». */
  private renderLevelMenu() {
    const activeId = this.project.id;
    const planButton = (plan: PlanEntry, opts: { sub: boolean; icon?: string; levelName?: string }) => html`
      <button
        role="menuitemradio"
        aria-checked=${plan.id === activeId ? 'true' : 'false'}
        class="dropdown-item ${opts.sub ? 'sub' : ''} ${plan.id === activeId ? 'active' : ''}"
        @click=${this.menuAction(() => void this.persistence.openPlan(plan.id))}
      >
        ${opts.icon ? html`<span aria-hidden="true">${opts.icon}</span>` : nothing}
        ${opts.levelName ? html`<span>${opts.levelName}</span>` : nothing}
        <span class="level-plan-name" title=${plan.name}>${plan.name}</span>
        ${plan.dirty ? this.renderDirtyDot() : nothing}
        ${plan.stored ? nothing : html`<span class="dropdown-item-meta">${localize('panel.level.not_saved')}</span>`}
        ${plan.id === activeId ? html`<span class="dropdown-item-check" aria-hidden="true">✓</span>` : nothing}
      </button>
    `;
    const customPlans = this.persistence.ws.customPlans();
    return html`
      <div id="menu-level" class="dropdown-menu-popup level-menu" role="menu" aria-labelledby="menu-level-trigger"
        @keydown=${this.handleMenuKeydown}>
        ${KNOWN_LEVELS.map(level => {
          const levelName = this.levelMenuName(level);
          const plans = this.persistence.ws.plansForCategory(level.id);
          if (plans.length === 0) {
            return html`
              <button
                role="menuitem"
                class="dropdown-item"
                ?disabled=${this.readOnly}
                title=${localize('panel.level.empty_title')}
                @click=${this.menuAction(() => void this.persistence.switchToLevel(level.id))}
              >
                <span aria-hidden="true">${level.icon}</span>
                <span>${levelName}</span>
                <span class="dropdown-item-meta">${localize('panel.level.empty')}</span>
              </button>
            `;
          }
          if (plans.length === 1) return planButton(plans[0], { sub: false, icon: level.icon, levelName });
          return html`
            <div role="group" aria-labelledby="level-group-${level.id}">
              <div class="dropdown-group-label" id="level-group-${level.id}">
                <span aria-hidden="true">${level.icon}</span><span>${levelName}</span>
              </div>
              ${plans.map(plan => planButton(plan, { sub: true }))}
            </div>
          `;
        })}
        ${customPlans.length > 0 ? html`
          <div class="dropdown-divider" role="separator"></div>
          <div role="group" aria-labelledby="level-group-custom">
            <div class="dropdown-group-label" id="level-group-custom">
              <span aria-hidden="true">${CUSTOM_CATEGORY_DEF.icon}</span><span>${localize('panel.level.other_plans')}</span>
            </div>
            ${customPlans.map(plan => planButton(plan, { sub: true }))}
          </div>
        ` : nothing}
      </div>
    `;
  }

  /** Bouton d'un menu de la barre supérieure (menu-button : aria-haspopup, aria-expanded, flèches). */
  private renderMenuTrigger(name: DropdownName, icon: string, label: string, content?: unknown, ariaLabel?: string) {
    const open = this.activeDropdown === name;
    return html`
      <button
        id="menu-${name}-trigger"
        class="btn-dropdown-trigger ${open ? 'active' : ''}"
        aria-haspopup="menu"
        aria-expanded=${open ? 'true' : 'false'}
        aria-controls=${open ? `menu-${name}` : nothing}
        aria-label=${ariaLabel ?? label}
        title=${ariaLabel ?? label}
        @click=${(e: Event) => this.toggleDropdown(name, e)}
        @keydown=${(e: KeyboardEvent) => this.handleTriggerKeydown(e, name)}
      >
        <span aria-hidden="true">${icon}</span>
        ${content ?? html`<span class="btn-label">${label}</span>`}
        <span class="chevron" aria-hidden="true">▾</span>
      </button>
    `;
  }

  /** Élément d'un menu (icône décorative, libellé, coche pour les bascules). */
  private renderMenuItem(opts: {
    icon: string;
    label: string;
    run: () => void;
    disabled?: boolean;
    checked?: boolean;
    danger?: boolean;
  }) {
    const checkable = opts.checked !== undefined;
    return html`
      <button
        role=${checkable ? 'menuitemcheckbox' : 'menuitem'}
        aria-checked=${checkable ? (opts.checked ? 'true' : 'false') : nothing}
        class="dropdown-item ${opts.checked ? 'active' : ''} ${opts.danger ? 'danger' : ''}"
        ?disabled=${opts.disabled === true}
        @click=${this.menuAction(opts.run)}
      >
        <span aria-hidden="true">${opts.icon}</span>
        <span>${opts.label}</span>
        ${opts.checked ? html`<span class="dropdown-item-check" aria-hidden="true">✓</span>` : nothing}
      </button>
    `;
  }

  private renderFileMenu(ready: boolean, dirtyCount: number, activeDirty: boolean) {
    return html`
      <div id="menu-file" class="dropdown-menu-popup" role="menu" aria-labelledby="menu-file-trigger" @keydown=${this.handleMenuKeydown}>
        ${this.renderMenuItem({ icon: '📄', label: localize('panel.menu.file.new'), disabled: this.readOnly, run: () => this.openNewPlanModal() })}
        ${this.renderMenuItem({ icon: '📂', label: localize('panel.menu.file.open'), run: () => this.openLoadModal() })}
        ${this.renderMenuItem({ icon: '💾', label: localize('panel.menu.file.save'), disabled: this.readOnly || !ready, run: () => this.openSaveModal() })}
        ${dirtyCount > 1 || (dirtyCount === 1 && !activeDirty) ? this.renderMenuItem({
          icon: '🗂️',
          label: localize('panel.menu.file.save_all', { count: formatNumber(dirtyCount) }),
          disabled: this.readOnly || !ready,
          run: () => void this.saveAllDirty()
        }) : nothing}
        <div class="dropdown-divider" role="separator"></div>
        ${this.renderMenuItem({ icon: '📥', label: localize('panel.menu.file.import'), disabled: this.readOnly, run: () => this.openImportModal() })}
        ${this.renderMenuItem({ icon: '📤', label: localize('panel.menu.file.export'), run: () => { this.isExportModalOpen = true; } })}
        <div class="dropdown-divider" role="separator"></div>
        ${this.renderMenuItem({ icon: '🗑️', label: localize('panel.menu.reset'), danger: true, disabled: this.readOnly, run: () => this.openResetModal() })}
      </div>
    `;
  }

  private renderPlanMenu() {
    return html`
      <div id="menu-plan" class="dropdown-menu-popup wide" role="menu" aria-labelledby="menu-plan-trigger" @keydown=${this.handleMenuKeydown}>
        ${this.renderMenuItem({
          icon: '📐',
          label: localize('panel.menu.plan.rescale'),
          checked: this.activeTool === 'rescale',
          disabled: this.readOnly,
          run: () => { this.activeTool = 'rescale'; }
        })}
        ${this.renderMenuItem({
          icon: this.is3DMode ? '🧊' : '📐',
          label: localize(this.is3DMode ? 'panel.menu.plan.view_3d_active' : 'panel.menu.plan.view_2d_3d'),
          checked: this.is3DMode,
          run: () => { this.is3DMode = !this.is3DMode; }
        })}
        ${this.renderMenuItem({ icon: '🪄', label: localize('panel.menu.plan.wizard'), disabled: this.readOnly, run: () => this.openWizard() })}
        <div class="dropdown-divider" role="separator"></div>
        <!-- Préférences d'affichage enregistrées avec le plan (reprises par la carte, constat F104) -->
        ${this.renderMenuItem({
          icon: '📏',
          label: localize('panel.menu.plan.dimensions'),
          checked: this.showDimensions,
          run: () => this.setPreferences({ showDimensions: !this.showDimensions })
        })}
        ${this.renderMenuItem({
          icon: '🌡️',
          label: localize('panel.menu.plan.heatmap'),
          checked: this.showThermalHeatmap,
          run: () => this.setPreferences({ showThermalHeatmap: !this.showThermalHeatmap })
        })}
        ${this.renderMenuItem({
          icon: '👁️',
          label: localize('panel.menu.plan.ghost'),
          checked: this.showGhostLevel,
          run: () => this.setPreferences({ showGhostLevel: !this.showGhostLevel })
        })}
        <div class="dropdown-divider" role="separator"></div>
        ${this.renderMenuItem({ icon: '⛶', label: localize('panel.menu.plan.fit'), run: () => this.canvas?.fitToScreen() })}
        <!-- Quart de tour de la vue 2D (acquis 1.0.28 / 1.0.29 : rotation gérée par le canevas) -->
        ${this.renderMenuItem({ icon: '↺', label: localize('panel.menu.plan.rotate'), run: () => this.canvas?.rotateQuarterTurn() })}
        ${this.renderMenuItem({
          icon: this.isFullscreen ? '🗗' : '⛶',
          label: localize(this.isFullscreen ? 'panel.fullscreen.exit' : 'panel.fullscreen.enter'),
          checked: this.isFullscreen,
          run: () => void this.toggleFullscreen()
        })}
        <div class="dropdown-divider" role="separator"></div>
        ${this.renderMenuItem({ icon: '🗑️', label: localize('panel.menu.reset'), danger: true, disabled: this.readOnly, run: () => this.openResetModal() })}
      </div>
    `;
  }

  /** HUD de sélection (bas du canevas) : éléments encore présents dans le plan uniquement (constat F130). */
  private renderSelectionHud(selection: SelectedElements) {
    if (countSelection(selection) === 0) return nothing;
    const selectedBinding = selection.bindingIds.length > 0
      ? this.project.bindings.find(b => b.id === selection.bindingIds[0])
      : null;
    const selectedRoom = selection.roomIds.length === 1
      ? this.project.rooms.find(r => r.id === selection.roomIds[0])
      : null;
    const selectedFurniture = (selection.furnitureIds ?? []).length > 0
      ? (this.project.furniture ?? []).find(f => f.id === selection.furnitureIds?.[0])
      : undefined;
    const hasDoor = selection.openingIds.some(id => this.project.openings.find(op => op.id === id)?.type === 'door');
    const hasWindow = selection.openingIds.some(id => {
      const op = this.project.openings.find(o => o.id === id);
      return op && (op.type === 'window' || op.type === 'french_window');
    });
    const option = (active: boolean, label: string, title: string, run: () => void) => html`
      <button class="hud-opt-btn ${active ? 'active' : ''}" aria-pressed=${active ? 'true' : 'false'} title=${title} @click=${run}>${label}</button>
    `;
    const activeTypology = this.getActiveTypology();
    const clearLabel = localize('panel.hud.clear_selection');

    return html`
      <div class="selection-hud" role="region" aria-label=${localize('panel.hud.region')}>
        <div class="selection-hud-main">
          <span class="selection-info">
            <span aria-hidden="true">🎯</span>
            <span>${this.getSelectedSummary(selection)}</span>
          </span>

          ${selectedRoom ? html`
            <div class="hud-options-group" role="group" aria-labelledby="hud-room-label">
              <span class="hud-label" id="hud-room-label">${localize('panel.hud.room')}</span>
              <button
                class="hud-opt-btn"
                ?disabled=${this.readOnly}
                @click=${() => this.openSelectedRoomModal(selectedRoom.id)}
                title=${localize('panel.hud.edit_room_title')}
              >
                <span aria-hidden="true">✏️</span> ${localize('panel.hud.edit_room')}
              </button>
            </div>
          ` : nothing}

          ${selection.wallIds.length > 0 ? html`
            <div class="hud-options-group" role="group" aria-labelledby="hud-thickness-label">
              <span class="hud-label" id="hud-thickness-label">${localize('panel.hud.thickness')}</span>
              ${option(this.currentThickness === 0.10, localize('panel.hud.thin', { size: formatCentimeters(0.10) }), localize('panel.thickness.partition', { size: formatCentimeters(0.10) }), () => this.updateSelectedWallsThickness(0.10))}
              ${option(this.currentThickness === 0.20, localize('panel.hud.medium', { size: formatCentimeters(0.20) }), localize('panel.hud.medium_title', { size: formatCentimeters(0.20) }), () => this.updateSelectedWallsThickness(0.20))}
              ${option(this.currentThickness === 0.30, localize('panel.hud.thick', { size: formatCentimeters(0.30) }), localize('panel.thickness.load_bearing', { size: formatCentimeters(0.30) }), () => this.updateSelectedWallsThickness(0.30))}
            </div>
          ` : nothing}

          ${hasDoor ? html`
            <div class="hud-options-group" role="group" aria-labelledby="hud-door-label">
              <span class="hud-label" id="hud-door-label">${localize('panel.hud.door')}</span>
              ${option(!this.doorFlipSide && this.doorFlipDirection, localize('panel.hud.door_right_in'), localize('panel.hud.door_right_in_title'), () => this.updateSelectedDoorConfig(false, true))}
              ${option(!this.doorFlipSide && !this.doorFlipDirection, localize('panel.hud.door_left_in'), localize('panel.hud.door_left_in_title'), () => this.updateSelectedDoorConfig(false, false))}
              ${option(this.doorFlipSide && !this.doorFlipDirection, localize('panel.hud.door_left_out'), localize('panel.hud.door_left_out_title'), () => this.updateSelectedDoorConfig(true, false))}
              ${option(this.doorFlipSide && this.doorFlipDirection, localize('panel.hud.door_right_out'), localize('panel.hud.door_right_out_title'), () => this.updateSelectedDoorConfig(true, true))}
            </div>
          ` : nothing}

          ${hasWindow ? html`
            <div class="hud-options-group" role="group" aria-labelledby="hud-window-label">
              <span class="hud-label" id="hud-window-label">${localize('panel.hud.window')}</span>
              ${option(this.windowSashCount === 1, localize('panel.hud.window_single'), localize('panel.hud.window_single_title', { size: formatLength(0.90) }), () => this.updateSelectedWindowConfig('window', 1, 0.90))}
              ${option(this.windowSashCount === 2, localize('panel.hud.window_double'), localize('panel.hud.window_double_title', { size: formatLength(1.40) }), () => this.updateSelectedWindowConfig('window', 2, 1.40))}
              ${option(false, localize('panel.hud.window_bay'), localize('panel.hud.window_bay_title', { size: formatLength(2.00) }), () => this.updateSelectedWindowConfig('french_window', 2, 2.00))}
            </div>
          ` : nothing}

          ${selectedFurniture ? html`
            <div class="hud-options-group" role="group" aria-labelledby="hud-furniture-label">
              <span class="hud-label" id="hud-furniture-label">${localize('panel.hud.furniture')}</span>
              <button class="hud-opt-btn" ?disabled=${this.readOnly} @click=${this.rotateSelectedFurniture} title=${localize('panel.hud.rotate_title')}>
                <span aria-hidden="true">🔄</span> ${localize('panel.hud.rotate')}
              </button>
              <label class="hud-color" title=${localize('panel.hud.color_title')}>
                <span class="hud-label">${localize('panel.hud.color')}</span>
                <input
                  type="color"
                  .value=${furnitureColorValue(selectedFurniture)}
                  ?disabled=${this.readOnly}
                  @input=${(e: Event) => this.updateSelectedFurnitureColor((e.target as HTMLInputElement).value)}
                />
              </label>
              ${selectedFurniture.color ? html`
                <button class="hud-opt-btn" ?disabled=${this.readOnly} @click=${() => this.updateSelectedFurnitureColor(null)}
                  title=${localize('panel.hud.color_reset')} aria-label=${localize('panel.hud.color_reset')}>
                  <span aria-hidden="true">↺</span>
                </button>
              ` : nothing}
            </div>
          ` : nothing}

          ${selectedBinding ? html`
            <div class="hud-options-group">
              <button
                class="hud-opt-btn ${this.isIconPickerOpen ? 'active' : ''}"
                aria-expanded=${this.isIconPickerOpen ? 'true' : 'false'}
                aria-controls="hud-icon-picker"
                @click=${() => { this.isIconPickerOpen = !this.isIconPickerOpen; }}
                title=${localize('panel.hud.icon_picker_title')}
              >
                <span class="fullscreen-icon" aria-hidden="true">${selectedBinding.icon || '🎨'}</span>
                <span>${localize('panel.hud.icon_picker')}</span>
                <span aria-hidden="true">${this.isIconPickerOpen ? '▴' : '▾'}</span>
              </button>
            </div>
          ` : nothing}

          <button class="btn-delete-selection" ?disabled=${this.readOnly} @click=${this.handleDeleteSelected} title=${localize('panel.hud.delete_title')}>
            <span aria-hidden="true">🗑️</span>
            <span>${localize('panel.common.delete')}</span>
          </button>
          <button class="btn-clear-selection" @click=${this.clearSelection} title=${clearLabel} aria-label=${clearLabel}>
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <!-- Palette « Choisir l'icône » de l'entité sélectionnée -->
        ${selectedBinding && this.isIconPickerOpen ? html`
          <div class="hud-icon-picker-panel" id="hud-icon-picker">
            <div class="icon-category-tabs" role="group" aria-label=${localize('panel.hud.icon_categories')}>
              ${Object.entries(TYPOLOGY_ICONS).map(([key, group]) => html`
                <button
                  class="icon-category-tab ${activeTypology === key ? 'active' : ''}"
                  aria-pressed=${activeTypology === key ? 'true' : 'false'}
                  title=${typologyTitle(key)}
                  @click=${() => { this.selectedTypologyTab = key; }}
                >
                  <span aria-hidden="true">${group.tabIcon}</span> ${typologyTabLabel(key)}
                </button>
              `)}
            </div>

            <div class="icon-grid" role="group" aria-label=${typologyTitle(activeTypology)}>
              ${(TYPOLOGY_ICONS[activeTypology] ?? TYPOLOGY_ICONS.light).icons.map(item => {
                const label = typologyIconLabel(activeTypology, item);
                return html`
                  <button
                    class="icon-item-btn ${selectedBinding.icon === item.icon ? 'active' : ''}"
                    aria-pressed=${selectedBinding.icon === item.icon ? 'true' : 'false'}
                    @click=${() => this.updateSelectedBindingIcon(item.icon, item.mdi)}
                    title="${label} (${item.mdi})"
                  >
                    <span class="icon-item-emoji" aria-hidden="true">${item.icon}</span>
                    <span>${label}</span>
                  </button>
                `;
              })}
            </div>

            <div class="icon-picker-footer">
              <span>${localize('panel.hud.icon_active')} <strong>${selectedBinding.icon || localize('panel.hud.icon_default')}</strong>
                (${selectedBinding.mdiIcon || localize('panel.hud.icon_automatic')})</span>
              <label class="icon-free-input">
                <span>${localize('panel.hud.icon_free')}</span>
                <input
                  type="text"
                  placeholder=${localize('panel.hud.icon_free_placeholder')}
                  maxlength="4"
                  @keydown=${(e: KeyboardEvent) => {
                    if (e.key === 'Enter') {
                      const val = (e.target as HTMLInputElement).value.trim();
                      if (val) this.updateSelectedBindingIcon(val);
                    }
                  }}
                  @change=${(e: Event) => {
                    const val = (e.target as HTMLInputElement).value.trim();
                    if (val) this.updateSelectedBindingIcon(val);
                  }}
                />
              </label>
            </div>
          </div>
        ` : nothing}
      </div>
    `;
  }

  /** Dialogue « Nouveau plan » : nom et niveau (catégorie). */
  private renderNewPlanDialog() {
    const close = () => { this.isNewPlanModalOpen = false; };
    const closeLabel = localize('panel.common.close');
    return html`
      <div class="modal-backdrop" @click=${(e: MouseEvent) => { if (e.target === e.currentTarget) close(); }}>
        <div class="modal-dialog" data-modal tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="new-plan-title" aria-describedby="new-plan-subtitle">
          <div class="modal-dialog-header">
            <div class="modal-dialog-title-group">
              <span class="modal-dialog-icon" aria-hidden="true">📄</span>
              <div>
                <h3 class="modal-dialog-title" id="new-plan-title">${localize('panel.new_plan.title')}</h3>
                <p class="modal-dialog-subtitle" id="new-plan-subtitle">${localize('panel.new_plan.subtitle')}</p>
              </div>
            </div>
            <button class="btn-dialog-close" title=${closeLabel} aria-label=${closeLabel} @click=${close}><span aria-hidden="true">✕</span></button>
          </div>
          <div class="modal-dialog-body">
            <div class="dialog-form-group">
              <label class="dialog-label" for="new-plan-name">${localize('panel.new_plan.name')}</label>
              <input
                id="new-plan-name"
                type="text"
                class="dialog-input"
                data-initial-focus
                .value=${this.newPlanName}
                @input=${(e: Event) => { this.newPlanName = (e.target as HTMLInputElement).value; }}
                @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' && !e.isComposing) void this.handleConfirmNewPlan(); }}
                placeholder=${localize('panel.new_plan.name_placeholder')}
              />
            </div>

            <fieldset class="dialog-form-group">
              <legend class="dialog-label">${localize('panel.new_plan.category')}</legend>
              <div class="category-grid">
                ${[...KNOWN_LEVELS, CUSTOM_CATEGORY_DEF].map(cat => html`
                  <button
                    type="button"
                    class="category-btn ${this.newPlanCategory === cat.id ? 'active' : ''}"
                    aria-pressed=${this.newPlanCategory === cat.id ? 'true' : 'false'}
                    @click=${() => { this.newPlanCategory = cat.id; }}
                  >
                    <span aria-hidden="true">${cat.icon}</span>
                    <span>${getLevelLabel(cat.id)}</span>
                  </button>
                `)}
              </div>
            </fieldset>
          </div>
          <div class="modal-dialog-footer">
            <button class="btn-dialog-cancel" @click=${close}>${localize('panel.common.cancel')}</button>
            <button class="btn-dialog-confirm primary" @click=${() => void this.handleConfirmNewPlan()}>
              <span aria-hidden="true">✨</span>
              <span>${localize('panel.new_plan.create')}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /** Dialogue « Effacer le plan » (réversible avec Annuler) ; focus initial sur « Annuler ». */
  private renderResetDialog() {
    const close = () => { this.isResetModalOpen = false; };
    const closeLabel = localize('panel.common.close');
    const p = this.project;
    const row = (icon: string, labelKey: string, value: string | number) => html`
      <div><dt><span aria-hidden="true">${icon}</span> ${localize(labelKey)}</dt><dd>${typeof value === 'number' ? formatNumber(value) : value}</dd></div>
    `;
    return html`
      <div class="modal-backdrop" @click=${(e: MouseEvent) => { if (e.target === e.currentTarget) close(); }}>
        <div class="modal-dialog danger" data-modal tabindex="-1" role="alertdialog" aria-modal="true" aria-labelledby="reset-title" aria-describedby="reset-message">
          <div class="modal-dialog-header danger">
            <div class="modal-dialog-title-group">
              <span class="modal-dialog-icon" aria-hidden="true">🗑️</span>
              <div>
                <h3 class="modal-dialog-title danger" id="reset-title">${localize('panel.reset.title')}</h3>
                <p class="modal-dialog-subtitle">${localize('panel.reset.subtitle')}</p>
              </div>
            </div>
            <button class="btn-dialog-close" title=${closeLabel} aria-label=${closeLabel} @click=${close}><span aria-hidden="true">✕</span></button>
          </div>
          <div class="modal-dialog-body">
            <p class="dialog-text" id="reset-message">
              ${localize('panel.reset.confirm_before')}<strong>${localize('panel.reset.confirm_strong')}</strong>${localize('panel.reset.confirm_after')}
              (<strong>${p.name || getLevelLabel(p.category)}</strong>)${localize('panel.reset.confirm_end')}
            </p>

            <dl class="reset-summary-box">
              ${row('🧱', 'panel.reset.walls', p.walls.length)}
              ${row('🚪', 'panel.reset.openings', p.openings.length)}
              ${row('🏷️', 'panel.reset.rooms', p.rooms.length)}
              ${row('⚡', 'panel.reset.entities', p.bindings.length)}
              ${row('🛋️', 'panel.reset.furniture', p.furniture?.length || 0)}
              ${row('🖼️', 'panel.reset.background', localize(p.background ? 'panel.common.yes' : 'panel.common.no'))}
            </dl>

            <p class="dialog-hint">${localize('panel.reset.undo_hint')}</p>
          </div>
          <div class="modal-dialog-footer">
            <button class="btn-dialog-cancel" data-initial-focus @click=${close}>${localize('panel.common.cancel')}</button>
            <button class="btn-dialog-confirm danger" @click=${() => this.handleConfirmResetPlan()}>
              <span aria-hidden="true">🗑️</span>
              <span>${localize('panel.reset.confirm')}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const hasBg = !!this.project.background;
    const ws = this.persistence.ws;
    const ready = this.persistence.ready;
    const activeDirty = ws.isDirty(this.project.id);
    const dirtyIds = ws.dirtyIds();
    const dirtyCount = dirtyIds.length;
    const saving = this.persistence.isSaving(this.project.id);
    const modalOpen = this.isModalOpen();
    const selection = this.liveSelection();
    const levelLabel = getLevelLabel(this.project.category);
    const undoLabel = localize('panel.history.undo');
    const redoLabel = localize('panel.history.redo');
    const fullscreenLabel = localize(this.isFullscreen ? 'panel.fullscreen.exit' : 'panel.fullscreen.enter');
    const saveLabel = localize('panel.save.label');
    const saveTitle = localize(activeDirty ? 'panel.save.title_dirty' : 'panel.save.title');
    const drawerTitle = localize('panel.drawer.toggle_title');
    const opacityLabel = localize('panel.controls.background_opacity');

    return html`
      <div class="studio">
        <header class="top-bar">
          ${this.showMenuButton ? html`
            <button class="ha-menu-btn" title=${localize('panel.header.ha_menu')} aria-label=${localize('panel.header.ha_menu_aria')} @click=${this.toggleHaSidebar}>
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
            </button>
          ` : nothing}
          <!-- Logo (5 clics : easter egg, aussi accessible au clavier en tapant le mot secret) -->
          <div class="brand" title=${localize('panel.header.brand_title')} @click=${this.handleLogoClick}>
            <span class="brand-icon" aria-hidden="true">
              <!-- Logo de l'application : couleurs de la marque, identiques dans les deux palettes -->
              <svg viewBox="0 0 512 512" width="28" height="28">
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
            <span class="brand-name">Home Architect</span>
            <span class="brand-tag">Studio</span>
            <button class="brand-version" title=${localize('panel.header.about_title')}
              aria-label=${localize('panel.header.about_aria', { version: VERSION })} @click=${this.openAbout}>v${VERSION}</button>
          </div>

          ${this.updateInfo?.available && !this.readOnly ? html`
            <button class="btn-update-auto" @click=${() => this.openUpdateModal()}
              title=${localize('panel.header.update_title', { version: this.updateInfo.latestVersion ?? '' })}
              aria-label=${localize('panel.header.update_title', { version: this.updateInfo.latestVersion ?? '' })}>
              <span aria-hidden="true">🚀</span>
              <span class="btn-label">${localize('panel.header.update_available')}</span>
              <span class="update-version-tag">v${this.updateInfo.latestVersion}</span>
            </button>
          ` : nothing}

          <!-- Menus déroulants principaux : Fichier, Plan, Niveau (constat F110 : « Pièce » renommé « Niveau ») -->
          <nav class="menu-group" aria-label=${localize('panel.header.menus')}>
            <div class="dropdown-menu-wrapper">
              ${this.renderMenuTrigger('file', '📁', localize('panel.menu.file.label'))}
              ${this.activeDropdown === 'file' ? this.renderFileMenu(ready, dirtyCount, activeDirty) : nothing}
            </div>

            <div class="dropdown-menu-wrapper">
              ${this.renderMenuTrigger('plan', '📐', localize('panel.menu.plan.label'))}
              ${this.activeDropdown === 'plan' ? this.renderPlanMenu() : nothing}
            </div>

            <!-- Sélecteur de niveau : plans rangés par niveau (catégorie), puis plans « Autre » -->
            <div class="dropdown-menu-wrapper">
              ${this.renderMenuTrigger('level', '🏢', localize('panel.level.label'), html`
                <span><span class="btn-label">${localize('panel.level.prefix')} </span><strong>${levelLabel}</strong></span>
                <span class="level-plan-name" title=${this.project.name}>${this.project.name}</span>
                ${activeDirty ? this.renderDirtyDot() : nothing}
              `, localize(activeDirty ? 'panel.level.trigger_aria_dirty' : 'panel.level.trigger_aria', { level: levelLabel, name: this.project.name }))}
              ${this.activeDropdown === 'level' ? this.renderLevelMenu() : nothing}
            </div>
          </nav>

          <div class="top-controls">
            <!-- Historique Annuler / Rétablir -->
            <div class="control-group compact" role="group" aria-label=${localize('panel.history.group')}>
              <button
                class="btn-history"
                @click=${this.handleUndo}
                ?disabled=${this.readOnly || !ws.canUndo()}
                title=${localize('panel.history.undo_title')}
                aria-label=${undoLabel}
              >
                <span aria-hidden="true">↩️</span><span class="btn-label"> ${undoLabel}</span>
              </button>
              <button
                class="btn-history"
                @click=${this.handleRedo}
                ?disabled=${this.readOnly || !ws.canRedo()}
                title=${localize('panel.history.redo_title')}
                aria-label=${redoLabel}
              >
                <span aria-hidden="true">↪️</span><span class="btn-label"> ${redoLabel}</span>
              </button>
            </div>

            <!-- Épaisseur mur contextuelle : reflète la valeur réellement utilisée (constat F134) -->
            ${this.activeTool === 'wall' ? html`
              <div class="control-group">
                <label for="ctl-thickness">${localize('panel.controls.thickness')}</label>
                <select id="ctl-thickness" aria-label=${localize('panel.controls.thickness_aria')} @change=${this.handleThicknessChange}>
                  ${selectOptions(THICKNESS_OPTIONS, this.currentThickness, formatCentimeters)}
                </select>
              </div>
            ` : nothing}

            <!-- Largeur ouvrant contextuelle -->
            ${this.activeTool === 'door' || this.activeTool === 'window' || this.activeTool === 'french_window' ? html`
              <div class="control-group">
                <label for="ctl-opening-width">${localize('panel.controls.width')}</label>
                <select id="ctl-opening-width" aria-label=${localize('panel.controls.width_aria')} @change=${this.handleOpeningWidthChange}>
                  ${selectOptions(OPENING_WIDTH_OPTIONS, this.currentOpeningWidth, formatLength)}
                </select>
              </div>
            ` : nothing}

            <!-- Hauteur sous plafond globale en mode 3D -->
            ${this.is3DMode ? html`
              <div class="control-group" title=${localize('panel.controls.ceiling_title')}>
                <label for="ctl-ceiling">${localize('panel.controls.ceiling')}</label>
                <select id="ctl-ceiling" aria-label=${localize('panel.controls.ceiling_title')} ?disabled=${this.readOnly}
                  @change=${(e: Event) => void this.handleDefaultCeilingChange(parseFloat((e.target as HTMLSelectElement).value))}>
                  ${selectOptions(CEILING_OPTIONS, effectiveCeilingHeight(this.project), v => formatMeters(v))}
                </select>
              </div>
            ` : nothing}

            <!-- Opacité du fond -->
            ${hasBg ? html`
              <div class="control-group">
                <label for="ctl-opacity">${localize('panel.controls.background')}</label>
                <input
                  id="ctl-opacity"
                  type="range"
                  min="0.05"
                  max="1.0"
                  step="0.05"
                  .value=${String(this.project.background?.opacity ?? 0.4)}
                  ?disabled=${this.readOnly}
                  @input=${this.handleOpacityChange}
                  title=${opacityLabel}
                  aria-label=${opacityLabel}
                  aria-valuetext=${formatNumber(this.project.background?.opacity ?? 0.4, { style: 'percent' })}
                />
              </div>
            ` : nothing}

            <!-- Volet Entités HA -->
            <button
              class="btn-drawer ${!this.isDrawerCollapsed ? 'active' : ''}"
              aria-pressed=${this.isDrawerCollapsed ? 'false' : 'true'}
              aria-label=${localizeCount('panel.drawer.toggle_aria', this.project.bindings.length)}
              @click=${this.toggleDrawer}
              title=${drawerTitle}
            >
              <span aria-hidden="true">⚡</span><span class="btn-label"> ${localize('panel.drawer.label')}</span> (${formatNumber(this.project.bindings.length)})
            </button>

            <div class="scale-indicator" title=${localize('panel.controls.scale_title')}>
              ${localize('panel.controls.scale', { value: formatNumber(this.project.pixelsPerMeter, { maximumFractionDigits: 2 }) })}
            </div>

            <!-- Bouton Plein Écran -->
            <button
              class="btn-fullscreen ${this.isFullscreen ? 'active' : ''}"
              aria-pressed=${this.isFullscreen ? 'true' : 'false'}
              @click=${() => void this.toggleFullscreen()}
              title=${localize(this.isFullscreen ? 'panel.fullscreen.exit_title' : 'panel.fullscreen.enter_title')}
            >
              <span class="fullscreen-icon" aria-hidden="true">${this.isFullscreen ? '🗗' : '⛶'}</span>
              <span class="btn-label">${fullscreenLabel}</span>
            </button>

            <!-- Sauvegarde (indicateur des modifications non sauvegardées) -->
            <button
              class="btn-primary ${activeDirty ? 'is-dirty' : ''}"
              ?disabled=${this.readOnly || !ready || saving}
              aria-label=${saving ? localize('panel.save.saving') : saveLabel}
              aria-describedby=${activeDirty ? 'save-dirty-hint' : nothing}
              @click=${this.openSaveModal}
              title=${saveTitle}
            >
              ${saving
                ? html`<span aria-hidden="true">⏳</span><span class="btn-label"> ${localize('panel.save.saving')}</span>`
                : html`<span aria-hidden="true">💾</span><span class="btn-label"> ${saveLabel}</span>${activeDirty ? html` <span class="dirty-dot" aria-hidden="true">●</span>` : nothing}`}
            </button>
            ${activeDirty ? html`<span id="save-dirty-hint" class="visually-hidden">${localize('panel.common.unsaved_changes')}</span>` : nothing}
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
              .canUndo=${!this.readOnly && ws.canUndo()}
              .canRedo=${!this.readOnly && ws.canRedo()}
              .grid=${this.project.grid}
              .narrow=${this.narrow}
              .readOnly=${this.readOnly}
              @undo=${this.handleUndo}
              @redo=${this.handleRedo}
              @tool-selected=${this.handleToolSelected}
              @door-config-changed=${this.handleDoorConfigChanged}
              @window-config-changed=${this.handleWindowConfigChanged}
              @wall-thickness-changed=${this.handleWallThicknessChanged}
              @grid-config-changed=${this.handleGridConfigChanged}
              @open-wizard=${() => this.openWizard()}
              @open-import-modal=${() => this.openImportModal()}
            ></home-architect-toolbar>

            <home-architect-canvas
              .hass=${this.hass}
              .project=${this.project}
              .backgroundSrc=${this.persistence.background.src}
              .readOnly=${this.readOnly}
              .modalOpen=${modalOpen}
              .pendingPlacement=${this.pendingPlacement}
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
              ?has-toast=${!!this.toastMessage}
              @selection-changed=${(e: CustomEvent<{ selectedElements: SelectedElements }>) => {
                this.selectedElements = e.detail.selectedElements;
                if (this.selectedElements.bindingIds.length > 0) {
                  const b = this.project.bindings.find(item => item.id === this.selectedElements.bindingIds[0]);
                  if (b) {
                    const domain = b.entityId.split('.')[0];
                    if (TYPOLOGY_ICONS[domain]) {
                      this.selectedTypologyTab = domain;
                    }
                  }
                  this.isIconPickerOpen = true;
                }
              }}
              @toggle-3d=${(e: CustomEvent<{ is3DMode: boolean }>) => { this.is3DMode = e.detail.is3DMode; }}
              @opening-config-changed=${this.handleOpeningConfigChanged}
              @room-selected=${(e: CustomEvent<{ room: Room }>) => { this.selectedRoomForEdit = e.detail.room; }}
              @project-changed=${this.handleProjectChanged}
              @request-calibration=${this.handleRequestCalibration}
              @request-rescale=${this.handleRequestRescale}
              @background-image-loaded=${this.handleBackgroundDropped}
              @placement-done=${this.handlePlacementDone}
            ></home-architect-canvas>

            ${this.renderSelectionHud(selection)}

            <!-- Notification (région annoncée par les lecteurs d'écran, toujours présente) -->
            <div class="toast-region" role="status" aria-live="polite">
              ${this.toastMessage ? html`<div class="toast-notification">${this.toastMessage}</div>` : nothing}
            </div>
          </div>

          <!-- Volet des entités HA et des meubles : colonne, ou tiroir superposé sur écran étroit -->
          <home-architect-entity-drawer
            .hass=${this.hass}
            ?collapsed=${this.isDrawerCollapsed}
            @toggle-collapse=${this.toggleDrawer}
            @drawer-item-picked=${this.handleDrawerItemPicked}
          ></home-architect-entity-drawer>
        </div>

        <!-- Modales des composants (data-modal : focus rendu à l'élément déclencheur à la fermeture) -->
        ${this.isImportModalOpen ? html`
          <home-architect-import-modal
            data-modal
            .hass=${this.hass}
            .currentLevel=${this.project.category || DEFAULT_LEVEL}
            .initialFile=${this.importInitialFile}
            .initialSvg=${this.importInitialSvg}
            @import-confirmed=${this.handleImportConfirmed}
            @import-project-backup=${this.handleImportProjectBackup}
            @close=${this.closeImportModal}
          ></home-architect-import-modal>
        ` : nothing}

        ${this.isWizardOpen ? html`
          <home-architect-wizard-modal
            data-modal
            @create-room=${this.handleCreateRoomFromWizard}
            @close=${() => { this.isWizardOpen = false; }}
          ></home-architect-wizard-modal>
        ` : nothing}

        ${this.selectedRoomForEdit ? html`
          <home-architect-room-modal
            data-modal
            .room=${this.selectedRoomForEdit}
            .hass=${this.hass}
            .defaultCeilingHeight=${this.project.defaultCeilingHeight}
            .walls=${this.project.walls}
            @save-room=${this.handleSaveRoom}
            @delete-room=${this.handleDeleteRoom}
            @close=${() => { this.selectedRoomForEdit = null; }}
          ></home-architect-room-modal>
        ` : nothing}

        ${this.isCalibrateModalOpen && this.calibrationData ? html`
          <home-architect-calibrate-modal
            data-modal
            .hass=${this.hass}
            .worldDistance=${this.calibrationData.worldDistance}
            .defaultMeters=${this.calibrationData.defaultMeters}
            .pixelsPerMeter=${this.project.pixelsPerMeter}
            .hasGeometry=${!isEmptyProject({ ...this.project, background: undefined })}
            .hasBackground=${!!this.project.background}
            @calibrate-confirmed=${this.handleCalibrateConfirmed}
            @close=${this.closeCalibrateModal}
          ></home-architect-calibrate-modal>
        ` : nothing}

        ${this.isRescaleModalOpen ? html`
          <home-architect-rescale-modal
            data-modal
            .hass=${this.hass}
            .measuredMeters=${this.rescaleMeasuredMeters}
            .wallCount=${this.project.walls.length}
            .roomCount=${this.project.rooms.length}
            .openingCount=${this.project.openings.length}
            .furnitureCount=${(this.project.furniture || []).length}
            .bindingCount=${this.project.bindings.length}
            .hasBackground=${!!(this.project.background && (this.project.background.assetId || this.project.background.imageUrl))}
            @rescale-confirmed=${this.handleRescaleConfirmed}
            @close=${() => { this.isRescaleModalOpen = false; }}
          ></home-architect-rescale-modal>
        ` : nothing}

        ${this.isExportModalOpen ? html`
          <home-architect-export-modal
            data-modal
            .project=${this.project}
            .hass=${this.hass}
            .backgroundSrc=${this.persistence.background.src}
            .readOnly=${this.readOnly}
            .dirty=${activeDirty}
            @export-frame-changed=${this.handleExportFrameChanged}
            @project-published=${this.handleProjectPublished}
            @project-unpublished=${this.handleProjectUnpublished}
            @save-requested=${this.handleExportSaveRequested}
            @close=${() => { this.isExportModalOpen = false; }}
          ></home-architect-export-modal>
        ` : nothing}

        ${this.isSaveLoadModalOpen ? html`
          <home-architect-save-load-modal
            data-modal
            .hass=${this.hass}
            .project=${this.project}
            .mode=${this.saveLoadModalTab}
            .readOnly=${this.readOnly}
            .dirtyProjectIds=${dirtyIds}
            @save-confirmed=${this.handleSaveConfirmed}
            @load-project=${this.handleLoadProject}
            @project-deleted=${(e: CustomEvent<{ projectId: string }>) => this.persistence.projectDeleted(e.detail.projectId, { remote: false })}
            @close=${() => { this.isSaveLoadModalOpen = false; }}
          ></home-architect-save-load-modal>
        ` : nothing}

        ${this.isNewPlanModalOpen ? this.renderNewPlanDialog() : nothing}

        ${this.isResetModalOpen ? this.renderResetDialog() : nothing}

        <!-- Modale Mise à jour (installation 1-clic ou redirection Paramètres HA) -->
        ${this.isUpdateModalOpen && this.updateInfo?.available ? renderUpdateDialog(
          this.updateInfo,
          dirtyCount,
          {
            onClose: () => this.closeUpdateModal(),
            onOpenUpdates: () => this.openHaUpdates(),
            onInstallUpdate: () => void this.handleInstallUpdate(),
            onRestartHa: () => void this.handleRestartHa(),
          },
          {
            canManageUpdates: !this.readOnly,
            installStatus: this.updateInstallStatus,
            installError: this.updateInstallError,
          }
        ) : nothing}

        <!-- À propos : version, état des mises à jour, liens (release, soutien du projet) -->
        ${this.isAboutOpen ? renderAboutDialog({
          info: this.updateInfo,
          canManageUpdates: !this.readOnly,
          onClose: () => { this.isAboutOpen = false; },
          onShowUpdate: () => { this.isAboutOpen = false; this.isUpdateModalOpen = true; },
          onOpenUpdates: () => this.openHaUpdates()
        }) : nothing}

        <!-- Chargement bloquant, opération en cours, copies locales à restaurer, dialogue de choix -->
        ${this.persistence.renderOverlays()}
      </div>
    `;
  }
}

defineElement('home-architect-panel', HomeArchitectPanel);

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-panel': HomeArchitectPanel;
  }
}
