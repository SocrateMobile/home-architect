import { LitElement, html, css, PropertyValues } from 'lit';
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
import { isAdmin } from './core/ha-api';
import { dataUrlToBlob } from './core/image-utils';
import { findFurnitureTemplate, furnitureDisplayName } from './core/furniture-catalog';
import {
  ActiveTool, BackgroundPlan, ExportFrame, GridConfig, HomeArchitectProject, Point, PublishInfo, Room, SelectedElements,
  Wall
} from './core/types';
import type { SvgParseResult } from './core/svg-parser';
import { PlanEntry, isEmptyProject } from './panel/workspace';
import { isInlineDataUrl } from './panel/background';
import { PersistenceController, ProjectPreferences } from './panel/persistence-controller';
import { HA_UPDATES_PATH, UpdateInfo, fetchUpdateInfo, navigateInHa, updateEntitySignature } from './panel/update-check';
import { PanelNotice, renderAboutDialog, renderUpdateDialog } from './panel/dialogs';
import { persistenceStyles } from './panel/styles';
import { studioLayoutStyles } from './panel/layout-styles';
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

/** Éléments du studio qui reçoivent `hass` (propagé sans re-rendre le panneau, constat F34). */
const HASS_CONSUMERS = [
  'home-architect-canvas', 'home-architect-entity-drawer', 'home-architect-export-modal',
  'home-architect-save-load-modal', 'home-architect-room-modal'
].join(', ');

/** Séquence secrète de l'easter egg. */
const SECRET_WORD = 'socrate';

/** Choix d'une liste de la barre supérieure (valeur en mètres). */
interface MeasureOption {
  value: number;
  label: string;
}

const THICKNESS_OPTIONS: readonly MeasureOption[] = [
  { value: 0.10, label: 'Cloison 10 cm' },
  { value: 0.15, label: 'Mur 15 cm' },
  { value: 0.20, label: 'Porteur 20 cm' },
  { value: 0.30, label: 'Extérieur 30 cm' }
];

const OPENING_WIDTH_OPTIONS: readonly MeasureOption[] = [
  { value: 0.73, label: '73 cm (Étroite)' },
  { value: 0.83, label: '83 cm (Chambre)' },
  { value: 0.90, label: '90 cm (Standard)' },
  { value: 1.20, label: '1.20 m (Fenêtre)' },
  { value: 1.40, label: '1.40 m (Double)' },
  { value: 2.00, label: '2.00 m (Baie)' },
  { value: 2.40, label: '2.40 m (Grande baie)' }
];

const CEILING_OPTIONS: readonly MeasureOption[] = [
  { value: 2.10, label: '2.10 m (Sous-sol)' },
  { value: 2.30, label: '2.30 m (Combles)' },
  { value: 2.50, label: '2.50 m (Standard)' },
  { value: 2.70, label: '2.70 m (Élevé)' },
  { value: 3.00, label: '3.00 m (Haussmann)' },
  { value: 3.50, label: '3.50 m (Cathédrale)' }
];

/**
 * Options d'une liste dont la sélection suit la valeur réellement utilisée (constat F134) ; une
 * valeur absente de la liste (réglée par la barre d'outils, le HUD ou un ancien plan) y est ajoutée.
 * `.selected` (propriété) : l'attribut `selected` n'a plus d'effet une fois la liste modifiée à la main.
 */
function selectOptions(options: readonly MeasureOption[], value: number, format: (v: number) => string) {
  const same = (v: number) => Math.abs(v - value) < 1e-6;
  const all = !Number.isFinite(value) || options.some(o => same(o.value))
    ? options
    : [...options, { value, label: `${format(value)} (actuelle)` }].sort((a, b) => a.value - b.value);
  return all.map(o => html`<option value=${String(o.value)} .selected=${same(o.value)}>${o.label}</option>`);
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

export interface TypologyIcon {
  icon: string;
  label: string;
  mdi: string;
}

export const TYPOLOGY_ICONS: Record<string, { title: string; tabLabel: string; icons: TypologyIcon[] }> = {
  light: {
    title: 'Éclairage & Luminaires',
    tabLabel: '💡 Éclairage',
    icons: [
      { icon: '💡', label: 'Ampoule standard', mdi: 'mdi:lightbulb' },
      { icon: '🛋️', label: 'Lampe salon', mdi: 'mdi:lamp' },
      { icon: '🌟', label: 'Spot encastré', mdi: 'mdi:ceiling-light' },
      { icon: '🔆', label: 'Plafonnier', mdi: 'mdi:ceiling-light-outline' },
      { icon: '🏮', label: 'Lanterne extérieure', mdi: 'mdi:outdoor-lamp' },
      { icon: '🕯️', label: 'Bougie / Ambiance', mdi: 'mdi:candle' },
      { icon: '🔦', label: 'Projecteur', mdi: 'mdi:spotlight-beam' },
      { icon: '🪩', label: 'Bandeau LED RGB', mdi: 'mdi:led-strip-variant' },
      { icon: '✨', label: 'Guirlande lumineuse', mdi: 'mdi:string-lights' },
      { icon: '🛋', label: 'Applique murale', mdi: 'mdi:wall-sconce-flat' },
    ]
  },
  switch: {
    title: 'Prises & Interrupteurs',
    tabLabel: '🔌 Prises',
    icons: [
      { icon: '🔌', label: 'Prise connectée', mdi: 'mdi:power-socket-fr' },
      { icon: '⚡', label: 'Interrupteur mural', mdi: 'mdi:toggle-switch' },
      { icon: '📺', label: 'Télévision', mdi: 'mdi:television' },
      { icon: '☕', label: 'Cafetière / Électroménager', mdi: 'mdi:coffee-maker' },
      { icon: '💻', label: 'PC / Bureau', mdi: 'mdi:laptop' },
      { icon: '🔊', label: 'Enceinte / Chaîne Hi-Fi', mdi: 'mdi:speaker' },
      { icon: '🖨️', label: 'Imprimante', mdi: 'mdi:printer' },
      { icon: '🎮', label: 'Console de jeu', mdi: 'mdi:gamepad-variant' },
      { icon: '🔋', label: 'Chargeur batterie', mdi: 'mdi:battery-charging' },
      { icon: '🪭', label: 'Ventilateur mobile', mdi: 'mdi:fan' },
    ]
  },
  binary_sensor: {
    title: 'Détecteurs, Sécurité & Ouvrants',
    tabLabel: '📡 Détecteurs',
    icons: [
      { icon: '🚶', label: 'Mouvement PIR', mdi: 'mdi:motion-sensor' },
      { icon: '🏃', label: 'Passage rapide', mdi: 'mdi:walk' },
      { icon: '👁️', label: 'Radar présence', mdi: 'mdi:radar' },
      { icon: '🚪', label: 'Capteur porte', mdi: 'mdi:door' },
      { icon: '🪟', label: 'Capteur fenêtre', mdi: 'mdi:window-closed' },
      { icon: '🚗', label: 'Porte garage', mdi: 'mdi:garage' },
      { icon: '🚨', label: 'Sirène / Alarme', mdi: 'mdi:alarm-light' },
      { icon: '🔔', label: 'Sonnette / Carillon', mdi: 'mdi:doorbell' },
      { icon: '🐾', label: 'Présence animale', mdi: 'mdi:paw' },
      { icon: '💧', label: 'Fuite d\'eau', mdi: 'mdi:water-alert' },
      { icon: '🔥', label: 'Détecteur fumée', mdi: 'mdi:smoke-detector' },
      { icon: '📬', label: 'Boîte aux lettres', mdi: 'mdi:mailbox' },
    ]
  },
  climate: {
    title: 'Thermostats & Climatisation',
    tabLabel: '🌡️ Climat',
    icons: [
      { icon: '🌡️', label: 'Thermostat principal', mdi: 'mdi:thermostat' },
      { icon: '❄️', label: 'Climatiseur (Froid)', mdi: 'mdi:air-conditioner' },
      { icon: '🔥', label: 'Radiateur (Chaud)', mdi: 'mdi:radiator' },
      { icon: '♨️', label: 'Pompe à chaleur / ECS', mdi: 'mdi:water-boiler' },
      { icon: '💨', label: 'VMC / Aération', mdi: 'mdi:fan' },
    ]
  },
  sensor: {
    title: 'Capteurs & Sondes',
    tabLabel: '📊 Sondes',
    icons: [
      { icon: '🌡️', label: 'Sonde température', mdi: 'mdi:thermometer' },
      { icon: '💧', label: 'Hygrométrie (Humidité)', mdi: 'mdi:water-percent' },
      { icon: '☀️', label: 'Luminosité (Lux)', mdi: 'mdi:weather-sunny' },
      { icon: '💨', label: 'Qualité d\'air (CO2/VOC)', mdi: 'mdi:air-filter' },
      { icon: '⚡', label: 'Consommation électrique', mdi: 'mdi:flash' },
      { icon: '🔋', label: 'Batterie restante', mdi: 'mdi:battery' },
      { icon: '🔊', label: 'Bruit / Décibels', mdi: 'mdi:volume-high' },
      { icon: '⚖️', label: 'Pression barométrique', mdi: 'mdi:gauge' },
    ]
  },
  cover: {
    title: 'Volets, Stores & Motorisations',
    tabLabel: '🪟 Volets',
    icons: [
      { icon: '🪟', label: 'Volet roulant', mdi: 'mdi:window-shutter' },
      { icon: '🚪', label: 'Store vénitien', mdi: 'mdi:blinds' },
      { icon: '🚗', label: 'Porte garage motorisée', mdi: 'mdi:garage' },
      { icon: '⛺', label: 'Store banne terrasse', mdi: 'mdi:awning' },
      { icon: '↕️', label: 'Motorisation baie', mdi: 'mdi:arrow-up-down' },
    ]
  },
  media_player: {
    title: 'Multimédia & Enceintes',
    tabLabel: '📺 Média',
    icons: [
      { icon: '📺', label: 'Téléviseur', mdi: 'mdi:television' },
      { icon: '📻', label: 'Enceinte connectée', mdi: 'mdi:speaker' },
      { icon: '🎵', label: 'Musique multiroom', mdi: 'mdi:music' },
      { icon: '🔊', label: 'Ampli Home-Cinema', mdi: 'mdi:speaker-wireless' },
      { icon: '🎬', label: 'Vidéoprojecteur', mdi: 'mdi:projector' },
      { icon: '🎮', label: 'Console jeux vidéo', mdi: 'mdi:gamepad-variant' },
    ]
  },
  camera: {
    title: 'Caméras & Vidéosurveillance',
    tabLabel: '📷 Caméras',
    icons: [
      { icon: '📷', label: 'Caméra intérieure fixe', mdi: 'mdi:camera' },
      { icon: '📹', label: 'Caméra dôme PTZ extérieure', mdi: 'mdi:cctv' },
      { icon: '👁️', label: 'Zone sous surveillance', mdi: 'mdi:eye' },
      { icon: '🎥', label: 'Portier / Interphone vidéo', mdi: 'mdi:video' },
    ]
  },
  fan: {
    title: 'Ventilation & Brassage',
    tabLabel: '💨 Ventilateur',
    icons: [
      { icon: '💨', label: 'Ventilateur colonne/pied', mdi: 'mdi:fan' },
      { icon: '🌀', label: 'VMC extraction', mdi: 'mdi:fan-chevron-up' },
      { icon: '🌪️', label: 'Plafonnier ventilateur', mdi: 'mdi:ceiling-fan' },
    ]
  },
  vacuum: {
    title: 'Robots Aspirateurs & Nettoyage',
    tabLabel: '🤖 Robots',
    icons: [
      { icon: '🤖', label: 'Robot aspirateur', mdi: 'mdi:robot-vacuum' },
      { icon: '🧹', label: 'Robot laveur de sol', mdi: 'mdi:broom' },
    ]
  },
  lock: {
    title: 'Serrures & Contrôle d\'accès',
    tabLabel: '🔒 Serrures',
    icons: [
      { icon: '🔒', label: 'Serrure connectée', mdi: 'mdi:lock' },
      { icon: '🛡️', label: 'Alarme intrusion', mdi: 'mdi:shield-home' },
      { icon: '🗝️', label: 'Gâche électrique', mdi: 'mdi:key' },
    ]
  }
};

export class HomeArchitectPanel extends LitElement {
  static styles = [css`
    /* Dans le flux de la zone de contenu de HA, comme les panneaux natifs : HA place déjà cette zone
       à côté de sa barre latérale (aucune lecture de son DOM interne, constats F37 et F135).
       Hauteur : ha-panel-custom, parent du panneau, n'a pas de hauteur définie (HA donne lui-même
       100vh / 100dvh à ses panneaux iframe) : un pourcentage n'y serait pas résolu et le studio
       s'écraserait. Hauteur de la fenêtre, moins les marges de zone sûre que ha-panel-custom applique. */
    :host {
      display: flex;
      flex-direction: column;
      position: relative;
      width: 100%;
      height: 100vh;
      height: calc(100dvh - var(--safe-area-inset-top, 0px) - var(--safe-area-inset-bottom, 0px));
      min-height: 0;
      overflow: hidden;
      background: #0f172a;
      color: #f8fafc;
      font-family: var(--ha-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      box-sizing: border-box;
      outline: none;
    }

    /* Plein écran de repli (API Fullscreen indisponible, ex. iPhone) : le studio recouvre la page. */
    :host(.is-fullscreen) {
      position: fixed !important;
      inset: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      height: 100dvh !important;
      max-width: 100vw !important;
      max-height: 100dvh !important;
      z-index: 99999 !important;
    }

    /* Règles séparées : un sélecteur inconnu d'un navigateur invaliderait toute la liste. */
    :host(:fullscreen) {
      width: 100vw;
      height: 100vh;
      background: #0f172a;
    }

    :host(:-webkit-full-screen) {
      width: 100vw;
      height: 100vh;
      background: #0f172a;
    }

    /* Colonne du studio : ne dépend pas du display imposé à l'hôte par la page qui l'insère. */
    .studio {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    header.top-bar {
      min-height: 56px;
      max-width: 100%;
      background: rgba(30, 41, 59, 0.9);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      padding: 6px 14px;
      position: relative;
      z-index: 85;
      flex-shrink: 0;
      overflow: visible;
      box-sizing: border-box;
      gap: 8px 10px;
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
  `, persistenceStyles, studioLayoutStyles];

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

  @state()
  private newPlanName: string = 'Nouveau Plan';

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
  private activeDropdown: 'file' | 'plan' | 'level' | null = null;

  @state()
  private selectedTypologyTab: string = '';

  @state()
  private isIconPickerOpen: boolean = true;

  /** Dernière réponse de check_updates (administrateurs uniquement), null tant qu'elle est inconnue. */
  @state()
  private updateInfo: UpdateInfo | null = null;

  @state()
  private isUpdateModalOpen: boolean = false;

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
        this.showToast(`🚪 ${updated} porte(s) mise(s) à jour`);
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
    if (reshape.adjusted > 0) notes.push(`${reshape.adjusted} réduite(s) pour tenir dans le mur`);
    if (reshape.refused > 0) notes.push(`${reshape.refused} inchangée(s) : mur trop court ou ouverture voisine`);
    if (committed) {
      this.showToast(`🪟 ${reshape.updated} fenêtre(s) mise(s) à jour${notes.length ? ` (${notes.join(', ')})` : ''}`);
    } else if (reshape.refused > 0) {
      this.showToast(`⚠️ Format non appliqué : ${notes.join(', ')}.`);
    }
  }

  private handleWallThicknessChanged(e: CustomEvent<{ thickness: number }>) {
    this.currentThickness = e.detail.thickness;
    this.activeTool = 'wall';

    // Mettre à jour les murs sélectionnés
    if (this.selectedElements.wallIds.length > 0 && !this.readOnly) {
      const newWalls = this.wallsWithThickness(e.detail.thickness);
      if (newWalls && this.commitProject({ ...this.project, walls: newWalls })) {
        this.showToast(`🧱 Épaisseur de ${this.selectedElements.wallIds.length} mur(s) mise à jour (${Math.round(e.detail.thickness * 100)} cm)`);
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
      this.showToast('🚪 Sens d\'ouverture de porte mis à jour');
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
      this.showToast(`🧱 Épaisseur de mur mise à jour (${Math.round(thickness * 100)} cm)`);
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
      this.showToast('❌ Dimensions de pièce invalides : vérifiez la largeur, la longueur et la hauteur.');
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
    this.showToast(`✨ Pièce « ${room.name} » créée (${room.areaM2.toLocaleString('fr-FR')} m²)` +
      (missing > 0 ? ' : pièce trop petite pour y placer la porte ou la fenêtre.' : ''));
    void this.fitCanvasAfterUpdate();
  }

  @state()
  private toastMessage: string | null = null;
  private toastTimeout: ReturnType<typeof setTimeout> | null = null;

  connectedCallback() {
    super.connectedCallback();
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
    if (this.hasUpdated && !this.explicitUpdateRequested && changed.size === 1 && changed.has('hass')) {
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
    if (!inside) this.activeDropdown = null;
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
  }

  /** Dialogue « À propos » : version, état des mises à jour, liens (release, soutien du projet). */
  private openAbout(e: Event) {
    // Le badge de version fait partie du logo : ce clic ne compte pas pour l'easter egg.
    e.stopPropagation();
    this.activeDropdown = null;
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
    this.activeDropdown = null;
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
    else this.showToast('❌ Image illisible.');
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
        this.showToast('❌ Image collée illisible.');
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
      this.showToast('📋 Image chargée depuis l\'URL collée ! Tracez un segment sur un mur mesuré pour étalonner l\'échelle (📏).');
    }
  }

  /**
   * Image référencée par une URL externe : dimensions lues par le navigateur, aucun téléversement.
   * Seules les URL que normalizeProject conserve (http(s) ou chemin du serveur HA) sont acceptées :
   * une autre adresse collée (fichier local, schéma inconnu) disparaîtrait au prochain chargement.
   */
  private externalBackground(url: string): Promise<BackgroundPlan | null> {
    if (url.length > MAX_EXTERNAL_IMAGE_URL_LENGTH || !EXTERNAL_IMAGE_URL.test(url)) {
      this.showToast('❌ Adresse d\'image non prise en charge : utilisez une URL http(s) ou importez le fichier.');
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
        this.showToast('❌ Erreur lors du chargement de l\'image.');
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
    return this.persistence.withBusy('Téléversement de l\'image de fond…', () =>
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
      this.showToast('✅ Plan importé et mis à l\'échelle ! Vous pouvez tracer vos murs (🧱).');
    } else {
      this.activeTool = 'calibrate';
      this.showToast('📏 Plan importé ! Tracez un segment sur un mur mesuré pour étalonner l\'échelle.');
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
      this.showToast('ℹ️ Aucun mur ni aucune pièce à importer.');
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
      if (!(await this.persistence.createPlan('Plan importé', category, { confirmed: true }))) return;
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
    const plural = (n: number, word: string) => `${n} ${word}${n > 1 ? 's' : ''}`;
    let message = `✨ Plan SVG converti : ${plural(stats.walls, 'mur')}, ${plural(stats.doors, 'porte')}, ` +
      `${plural(stats.windows, 'fenêtre')} et ${plural(stats.rooms, 'pièce')} ${mode === 'add' ? 'ajoutés à côté du plan' : 'importés'}.`;
    if (wantsBackground && keepCurrentBackground) message += ' Le calque du SVG n\'a pas été repris : le plan a déjà une image de fond.';
    else if (wantsBackground && !uploaded) message += ' Calque de fond non importé.';
    this.showToast(message);
    void this.fitCanvasAfterUpdate();
  }

  /** Plan non vide : remplacer le dessin, l'ajouter à côté ou créer un nouveau plan (null : annulé). */
  private async askVectorizedImportMode(geometry: PlanGeometry, targetLevel: string | undefined): Promise<'replace' | 'add' | 'new' | null> {
    const stats = geometryStats(geometry);
    const level = getLevelLabel(targetLevel || this.project.category);
    const choice = await this.persistence.ask({
      icon: '📐',
      title: 'Le plan contient déjà des éléments',
      subtitle: `« ${this.project.name} »`,
      message: `Le SVG apporte ${stats.walls} mur(s), ${stats.doors + stats.windows} ouverture(s) et ${stats.rooms} pièce(s). ` +
        `Le plan actuel contient ${this.project.walls.length} mur(s) et ${this.project.rooms.length} pièce(s). Que faire ?`,
      details: [
        'Remplacer : les murs, ouvertures et pièces actuels sont remplacés ; entités, meubles et image de fond sont conservés (l\'image est remplacée si le SVG fournit son calque).',
        'Ajouter à côté : le dessin importé est placé à droite du plan actuel, sans rien supprimer.',
        `Nouveau plan : le dessin est ouvert dans un nouveau plan distinct du niveau ${level}, le plan actuel reste inchangé.`,
        'Dans tous les cas, Annuler (Ctrl+Z) reste possible.'
      ],
      actions: [
        { id: 'new', label: 'Nouveau plan', icon: '📄', kind: 'secondary' },
        { id: 'add', label: 'Ajouter à côté', icon: '➕', kind: 'secondary' },
        { id: 'replace', label: 'Remplacer', icon: '♻️', kind: 'danger' }
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
      this.showToast('❌ Étalonnage refusé : facteur d\'échelle hors limites (×0,01 à ×100).');
      return;
    }
    if (Math.abs(k - 1) >= 1e-4) {
      if (detail.mode === 'project') {
        if (!this.applyScale(k, true, 'Plan étalonné')) return;
      } else {
        const bg = this.project.background;
        if (!bg) {
          this.showToast('ℹ️ Aucun calque de fond à étalonner.');
          return;
        }
        if (!this.commitProject({ ...this.project, background: scaleBackgroundLayer(bg, k) })) return;
        this.showToast(`📏 Calque de fond étalonné (×${k.toFixed(3)}) : le dessin existant n'est pas modifié.`);
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
    const { scaleFactor, adjustBackground } = e.detail ?? {};
    this.isRescaleModalOpen = false;
    // Revalidé avant toute modification : facteur fini et borné (constat F141).
    if (!isValidRescaleFactor(scaleFactor)) {
      this.showToast('❌ Mise à l\'échelle refusée : facteur hors limites (×0,01 à ×100).');
      return;
    }
    if (Math.abs(scaleFactor - 1) < 1e-4) return;
    if (this.applyScale(scaleFactor, adjustBackground === true, 'Plan mis à l\'échelle')) this.activeTool = 'select';
  }

  /**
   * Met le plan à l'échelle (positions × k) en conservant les dimensions physiques : épaisseurs,
   * hauteurs, largeurs des ouvertures et meubles (constat F49). Renvoie false si rien n'a été appliqué.
   */
  private applyScale(k: number, adjustBackground: boolean, label: string): boolean {
    const { project, openingConflicts } = scalePlan(this.project, k, { adjustBackground });
    if (!this.commitProject(project)) return false;
    const conflicts = openingConflicts > 0
      ? ` ⚠️ ${openingConflicts} ouverture(s) à vérifier (mur trop court ou chevauchement).`
      : '';
    this.showToast(`✅ ${label} (×${k.toFixed(3)}) : ${project.walls.length} murs et ${project.rooms.length} pièces recalculés ; ` +
      `épaisseurs, ouvertures et meubles gardent leurs dimensions.${conflicts}`);
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
    this.showToast(`📐 Hauteur plafond 3D par défaut : ${val.toFixed(2)} m`);
    // Pièces ET murs : les murs de l'ancien assistant portent la hauteur de leur pièce (3D cohérente).
    const count = countWithHeight(this.project, previous);
    if (count.rooms + count.walls === 0) return;
    const parts = [
      ...(count.rooms > 0 ? [`${count.rooms} pièce(s)`] : []),
      ...(count.walls > 0 ? [`${count.walls} mur(s)`] : [])
    ].join(' et ');
    const choice = await this.persistence.ask({
      icon: '📐',
      title: 'Appliquer la nouvelle hauteur ?',
      message: `${parts} ont une hauteur de ${previous.toFixed(2)} m, l'ancienne valeur par défaut. ` +
        `Doivent-ils suivre la nouvelle hauteur par défaut (${val.toFixed(2)} m) ?`,
      details: ['Les pièces et murs dont la hauteur a été réglée sur une autre valeur ne changent pas.'],
      actions: [{ id: 'apply', label: 'Appliquer', icon: '✅', kind: 'primary' }],
      cancelLabel: 'Conserver leur hauteur'
    });
    if (choice !== 'apply') return;
    const next = inheritDefaultHeight(this.project, previous);
    if (next !== this.project && this.commitProject(next)) this.showToast(`📐 ${parts} suivent la hauteur par défaut.`);
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
      this.showToast(`✨ Pièce "${detail.name}" mise à jour (H: ${detail.height.toFixed(2)} m) !`);
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
    this.showToast('🗑️ Pièce supprimée');
  }

  private handleUndo() {
    if (!this.persistence.undo()) return;
    this.clearSelection();
    this.showToast('↩️ Action annulée');
  }

  private handleRedo() {
    if (!this.persistence.redo()) return;
    this.clearSelection();
    this.showToast('↪️ Action rétablie');
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
      this.showToast('🔄 Meuble pivoté de 90°');
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
    this.showToast(`🗑️ ${total} élément${total > 1 ? 's' : ''} supprimé${total > 1 ? 's' : ''} !`);
  }

  private clearSelection() {
    this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] };
  }

  private toggleDropdown(name: 'file' | 'plan' | 'level', e?: Event) {
    if (e) e.stopPropagation();
    this.activeDropdown = this.activeDropdown === name ? null : name;
    // Liste des plans à jour (autres appareils) à chaque ouverture du sélecteur de niveau.
    if (this.activeDropdown === 'level') void this.persistence.refreshSummaries();
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
      this.showToast(`✨ Icône ${icon} appliquée !`);
    }
  }

  /** Résumé du HUD : éléments existants seulement ; nom live des entités et nom actuel des meubles (constat F172). */
  private getSelectedSummary(selection: SelectedElements): string {
    const plural = (n: number, one: string, many: string) => `${n} ${n > 1 ? many : one}`;
    const parts: string[] = [];
    if (selection.wallIds.length > 0) parts.push(plural(selection.wallIds.length, 'mur', 'murs'));
    if (selection.openingIds.length > 0) parts.push(plural(selection.openingIds.length, 'ouvrant', 'ouvrants'));
    if (selection.roomIds.length > 0) parts.push(plural(selection.roomIds.length, 'pièce', 'pièces'));
    if (selection.bindingIds.length === 1) {
      const b = this.project.bindings.find(item => item.id === selection.bindingIds[0]);
      parts.push(b ? bindingDisplayName(b, this.hass?.states) : '1 entité');
    } else if (selection.bindingIds.length > 1) {
      parts.push(`${selection.bindingIds.length} entités`);
    }
    const furnitureIds = selection.furnitureIds ?? [];
    if (furnitureIds.length === 1) {
      const item = (this.project.furniture ?? []).find(f => f.id === furnitureIds[0]);
      parts.push(item ? furnitureDisplayName(item) : '1 meuble');
    } else if (furnitureIds.length > 1) {
      parts.push(`${furnitureIds.length} meubles`);
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
      this.activeDropdown = null;
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
    if (this.isUpdateModalOpen) this.isUpdateModalOpen = false;
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
    this.showToast(`📍 Touchez le plan pour placer « ${this.placementLabel(payload)} » (Échap pour annuler).`);
  }

  private placementLabel(payload: DrawerItemPayload): string {
    if (payload.kind === 'furniture') return findFurnitureTemplate(payload.furnitureType)?.name ?? payload.furnitureType;
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
      this.showToast('⛶ Mode plein écran activé (Échap pour sortir)');
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
      this.showToast('🗗 Sortie du plein écran');
    }
  }

  private openNewPlanModal() {
    this.activeDropdown = null;
    if (this.readOnly) {
      this.notifyReadOnly();
      return;
    }
    const level = this.activeLevel ?? DEFAULT_LEVEL;
    this.newPlanName = `Plan ${getLevelLabel(level)}`;
    this.newPlanCategory = level;
    this.isNewPlanModalOpen = true;
  }

  /**
   * Nouveau plan : identifiant immuable généré, catégorie séparée (constat F3). Le plan en cours
   * reste ouvert avec ses modifications et aucun plan existant n'est remplacé.
   */
  private async handleConfirmNewPlan() {
    const name = this.newPlanName.trim() || 'Nouveau plan';
    const category = this.newPlanCategory || DEFAULT_LEVEL;
    if (await this.persistence.createPlan(name, category)) this.isNewPlanModalOpen = false;
  }

  private openResetModal() {
    this.activeDropdown = null;
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
    this.showToast(`🗑️ Plan effacé (Réinitialisé). Annulez avec Ctrl+Z si besoin.`);
    void this.fitCanvasAfterUpdate();
  }

  private openWizard() {
    this.activeDropdown = null;
    if (this.readOnly) {
      this.notifyReadOnly();
      return;
    }
    this.isWizardOpen = true;
  }

  private openSaveModal() {
    this.activeDropdown = null;
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
    this.activeDropdown = null;
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
    this.activeDropdown = null;
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
    return [{
      key: 'reload-required',
      kind: 'info',
      dismissible: false,
      message: `🔁 Nouvelle version installée (v${this.updateInfo.installedVersion}) : rechargez la page pour l'utiliser. Versions chargées : ${this.updateInfo.loadedBundles || VERSION}.`,
      actions: [{ label: 'Recharger', run: () => this.reloadPage() }]
    }];
  }

  /** Sélecteur de niveau : les plans de chaque niveau (par catégorie), puis les plans « Autre ». */
  private renderLevelMenu() {
    const activeId = this.project.id;
    const planButton = (plan: PlanEntry, opts: { sub: boolean; icon?: string; levelName?: string }) => html`
      <button
        class="dropdown-item ${opts.sub ? 'sub' : ''} ${plan.id === activeId ? 'active' : ''}"
        @click=${() => { this.activeDropdown = null; void this.persistence.openPlan(plan.id); }}
      >
        ${opts.icon ? html`<span>${opts.icon}</span>` : null}
        ${opts.levelName ? html`<span>${opts.levelName}</span>` : null}
        <span class="level-plan-name" title=${plan.name}>${plan.name}</span>
        ${plan.dirty ? html`<span class="dirty-dot" title="Modifications non sauvegardées">●</span>` : null}
        ${plan.stored ? null : html`<span class="dropdown-item-meta">non sauvegardé</span>`}
        ${plan.id === activeId ? html`<span class="dropdown-item-check">✓</span>` : null}
      </button>
    `;
    const customPlans = this.persistence.ws.customPlans();
    return html`
      <div class="dropdown-menu-popup level-menu">
        ${KNOWN_LEVELS.map(level => {
          const levelName = level.fullLabel !== level.label ? `${level.label} (${level.fullLabel})` : level.label;
          const plans = this.persistence.ws.plansForCategory(level.id);
          if (plans.length === 0) {
            return html`
              <button
                class="dropdown-item"
                ?disabled=${this.readOnly}
                title="Aucun plan pour ce niveau : un plan vierge sera créé"
                @click=${() => { this.activeDropdown = null; void this.persistence.switchToLevel(level.id); }}
              >
                <span>${level.icon}</span>
                <span>${levelName}</span>
                <span class="dropdown-item-meta">vide</span>
              </button>
            `;
          }
          if (plans.length === 1) return planButton(plans[0], { sub: false, icon: level.icon, levelName });
          return html`
            <div class="dropdown-group-label"><span>${level.icon}</span><span>${levelName}</span></div>
            ${plans.map(plan => planButton(plan, { sub: true }))}
          `;
        })}
        ${customPlans.length > 0 ? html`
          <div class="dropdown-divider"></div>
          <div class="dropdown-group-label"><span>${CUSTOM_CATEGORY_DEF.icon}</span><span>Autres plans</span></div>
          ${customPlans.map(plan => planButton(plan, { sub: true }))}
        ` : null}
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

    return html`
      <div class="studio">
        <header class="top-bar">
          ${this.showMenuButton ? html`
            <button class="ha-menu-btn" title="Menu Home Assistant" aria-label="Ouvrir la barre latérale de Home Assistant" @click=${this.toggleHaSidebar}>
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
            </button>
          ` : null}
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
            <span class="brand-name">Home Architect</span>
            <span class="brand-tag">Studio</span>
            <button class="brand-version" title="À propos de Home Architect (version, mises à jour, soutien)" @click=${this.openAbout}>v${VERSION}</button>
          </div>

          ${this.updateInfo?.available && !this.readOnly ? html`
            <button class="btn-update-auto" @click=${() => this.openUpdateModal()} title="Nouvelle version ${this.updateInfo.latestVersion} disponible">
              <span>🚀</span>
              <span class="btn-label">Mise à jour dispo</span>
              <span class="update-version-tag">v${this.updateInfo.latestVersion}</span>
            </button>
          ` : null}

          <!-- 3 Menus Déroulants Principaux : Fichier, Plan, Pièce -->
          <div class="menu-group">
            <!-- 1. Menu Fichier (Ouvrir, Sauvegarder, Importer, Exporter) -->
            <div class="dropdown-menu-wrapper">
              <button class="btn-dropdown-trigger ${this.activeDropdown === 'file' ? 'active' : ''}" title="Fichier" @click=${(e: Event) => this.toggleDropdown('file', e)}>
                <span>📁</span>
                <span class="btn-label">Fichier</span>
                <span class="chevron">▾</span>
              </button>
              ${this.activeDropdown === 'file' ? html`
                <div class="dropdown-menu-popup">
                  <button class="dropdown-item" ?disabled=${this.readOnly} @click=${() => this.openNewPlanModal()}>
                    <span>📄</span>
                    <span>Nouveau plan... (Alt+N)</span>
                  </button>
                  <button class="dropdown-item" @click=${() => this.openLoadModal()}>
                    <span>📂</span>
                    <span>Ouvrir / Recharger un plan...</span>
                  </button>
                  <button class="dropdown-item" ?disabled=${this.readOnly || !ready} @click=${() => this.openSaveModal()}>
                    <span>💾</span>
                    <span>Sauvegarder le plan... (Ctrl+S)</span>
                  </button>
                  ${dirtyCount > 1 || (dirtyCount === 1 && !activeDirty) ? html`
                    <button class="dropdown-item" ?disabled=${this.readOnly || !ready} @click=${() => void this.saveAllDirty()}>
                      <span>🗂️</span>
                      <span>Sauvegarder tous les plans modifiés (${dirtyCount})</span>
                    </button>
                  ` : null}
                  <div class="dropdown-divider"></div>
                  <button class="dropdown-item" ?disabled=${this.readOnly} @click=${() => this.openImportModal()}>
                    <span>📥</span>
                    <span>Importer un plan...</span>
                  </button>
                  <button class="dropdown-item" @click=${() => { this.isExportModalOpen = true; this.activeDropdown = null; }}>
                    <span>📤</span>
                    <span>Exporter Lovelace...</span>
                  </button>
                  <div class="dropdown-divider"></div>
                  <button class="dropdown-item danger" ?disabled=${this.readOnly} @click=${() => this.openResetModal()}>
                    <span>🗑️</span>
                    <span>Effacer le plan (Reset)...</span>
                  </button>
                </div>
              ` : null}
            </div>

            <!-- 2. Menu Plan (Demande 4: Mettre à l'échelle, Vue 2D/3D, Assistant Pièce, Cotes, etc.) -->
            <div class="dropdown-menu-wrapper">
              <button class="btn-dropdown-trigger ${this.activeDropdown === 'plan' ? 'active' : ''}" title="Plan" @click=${(e: Event) => this.toggleDropdown('plan', e)}>
                <span>📐</span>
                <span class="btn-label">Plan</span>
                <span class="chevron">▾</span>
              </button>
              ${this.activeDropdown === 'plan' ? html`
                <div class="dropdown-menu-popup" style="min-width: 250px;">
                  <button class="dropdown-item ${this.activeTool === 'rescale' ? 'active' : ''}" ?disabled=${this.readOnly} @click=${() => { this.activeTool = 'rescale'; this.activeDropdown = null; }}>
                    <span>📐</span>
                    <span>Mettre à l'échelle (S)</span>
                    ${this.activeTool === 'rescale' ? html`<span class="dropdown-item-check">✓</span>` : null}
                  </button>
                  <button class="dropdown-item ${this.is3DMode ? 'active' : ''}" @click=${() => { this.is3DMode = !this.is3DMode; this.activeDropdown = null; }}>
                    <span>${this.is3DMode ? '🧊' : '📐'}</span>
                    <span>${this.is3DMode ? 'Vue 3D (Active)' : 'Vue 2D / 3D'}</span>
                    ${this.is3DMode ? html`<span class="dropdown-item-check">✓</span>` : null}
                  </button>
                  <button class="dropdown-item" ?disabled=${this.readOnly} @click=${() => this.openWizard()}>
                    <span>🪄</span>
                    <span>Assistant Pièce</span>
                  </button>
                  <div class="dropdown-divider"></div>
                  <!-- Préférences d'affichage enregistrées avec le plan (reprises par la carte, constat F104) -->
                  <button class="dropdown-item ${this.showDimensions ? 'active' : ''}" @click=${() => this.setPreferences({ showDimensions: !this.showDimensions })}>
                    <span>📏</span>
                    <span>Cotes dynamiques</span>
                    ${this.showDimensions ? html`<span class="dropdown-item-check">✓</span>` : null}
                  </button>
                  <button class="dropdown-item ${this.showThermalHeatmap ? 'active' : ''}" @click=${() => this.setPreferences({ showThermalHeatmap: !this.showThermalHeatmap })}>
                    <span>🌡️</span>
                    <span>Carte thermique</span>
                    ${this.showThermalHeatmap ? html`<span class="dropdown-item-check">✓</span>` : null}
                  </button>
                  <button class="dropdown-item ${this.showGhostLevel ? 'active' : ''}" @click=${() => this.setPreferences({ showGhostLevel: !this.showGhostLevel })}>
                    <span>👁️</span>
                    <span>Filigrane niveau inf.</span>
                    ${this.showGhostLevel ? html`<span class="dropdown-item-check">✓</span>` : null}
                  </button>
                  <div class="dropdown-divider"></div>
                  <button class="dropdown-item" @click=${() => { this.canvas?.fitToScreen(); this.activeDropdown = null; }}>
                    <span>⛶</span>
                    <span>Ajuster à l'écran (Zoom auto)</span>
                  </button>
                  <!-- Quart de tour de la vue 2D (acquis 1.0.28 / 1.0.29 : rotation gérée par le canevas) -->
                  <button class="dropdown-item" @click=${() => { this.canvas?.rotateQuarterTurn(); this.activeDropdown = null; }}>
                    <span>↺</span>
                    <span>Pivoter la vue de 90° à gauche</span>
                  </button>
                  <button class="dropdown-item ${this.isFullscreen ? 'active' : ''}" @click=${() => { void this.toggleFullscreen(); this.activeDropdown = null; }}>
                    <span>${this.isFullscreen ? '🗗' : '⛶'}</span>
                    <span>${this.isFullscreen ? 'Sortir du plein écran' : 'Plein écran'}</span>
                    ${this.isFullscreen ? html`<span class="dropdown-item-check">✓</span>` : null}
                  </button>
                  <div class="dropdown-divider"></div>
                  <button class="dropdown-item danger" ?disabled=${this.readOnly} @click=${() => this.openResetModal()}>
                    <span>🗑️</span>
                    <span>Effacer le plan (Reset)...</span>
                  </button>
                </div>
              ` : null}
            </div>

            <!-- 3. Menu Pièce : plans rangés par niveau (catégorie), puis plans « Autre » -->
            <div class="dropdown-menu-wrapper">
              <button class="btn-dropdown-trigger ${this.activeDropdown === 'level' ? 'active' : ''}" title="Niveau et plan affichés" @click=${(e: Event) => this.toggleDropdown('level', e)}>
                <span>🏢</span>
                <span><span class="btn-label">Pièce : </span><strong>${getLevelLabel(this.project.category)}</strong></span>
                <span class="level-plan-name" title=${this.project.name}>${this.project.name}</span>
                ${activeDirty ? html`<span class="dirty-dot" title="Modifications non sauvegardées">●</span>` : null}
                <span class="chevron">▾</span>
              </button>
              ${this.activeDropdown === 'level' ? this.renderLevelMenu() : null}
            </div>
          </div>

          <div class="top-controls">
            <!-- Historique Annuler / Rétablir -->
            <div class="control-group" style="padding: 2px 4px; gap: 4px;">
              <button
                class="btn-history"
                @click=${this.handleUndo}
                ?disabled=${this.readOnly || !ws.canUndo()}
                title="Annuler la dernière action (Ctrl+Z / Cmd+Z)"
              >
                ↩️<span class="btn-label"> Annuler</span>
              </button>
              <button
                class="btn-history"
                @click=${this.handleRedo}
                ?disabled=${this.readOnly || !ws.canRedo()}
                title="Rétablir l'action (Ctrl+Y / Cmd+Shift+Z)"
              >
                ↪️<span class="btn-label"> Rétablir</span>
              </button>
            </div>

            <!-- Épaisseur mur contextuelle : reflète la valeur réellement utilisée (constat F134) -->
            ${this.activeTool === 'wall' ? html`
              <div class="control-group">
                <label>Épaisseur :</label>
                <select @change=${this.handleThicknessChange}>
                  ${selectOptions(THICKNESS_OPTIONS, this.currentThickness, v => `${Math.round(v * 100)} cm`)}
                </select>
              </div>
            ` : null}

            <!-- Largeur ouvrant contextuelle -->
            ${this.activeTool === 'door' || this.activeTool === 'window' || this.activeTool === 'french_window' ? html`
              <div class="control-group">
                <label>Largeur :</label>
                <select @change=${this.handleOpeningWidthChange}>
                  ${selectOptions(OPENING_WIDTH_OPTIONS, this.currentOpeningWidth, v => `${v.toFixed(2)} m`)}
                </select>
              </div>
            ` : null}

            <!-- Hauteur sous plafond globale en mode 3D -->
            ${this.is3DMode ? html`
              <div class="control-group" title="Hauteur sous plafond par défaut (3D)">
                <label>Plafond 3D :</label>
                <select ?disabled=${this.readOnly} @change=${(e: Event) => void this.handleDefaultCeilingChange(parseFloat((e.target as HTMLSelectElement).value))}>
                  ${selectOptions(CEILING_OPTIONS, effectiveCeilingHeight(this.project), v => `${v.toFixed(2)} m`)}
                </select>
              </div>
            ` : null}

            <!-- Opacité du fond -->
            ${hasBg ? html`
              <div class="control-group">
                <label>Fond :</label>
                <input
                  type="range"
                  min="0.05"
                  max="1.0"
                  step="0.05"
                  .value=${String(this.project.background?.opacity ?? 0.4)}
                  ?disabled=${this.readOnly}
                  @input=${this.handleOpacityChange}
                  style="width: 70px;"
                  title="Opacité du plan de fond"
                />
              </div>
            ` : null}

            <!-- Volet Entités HA -->
            <button
              class="btn-drawer ${!this.isDrawerCollapsed ? 'active' : ''}"
              @click=${this.toggleDrawer}
              title="Afficher / Masquer le volet des entités et des meubles"
            >
              ⚡<span class="btn-label"> Entités HA</span> (${this.project.bindings.length})
            </button>

            <div class="scale-indicator" title="Échelle d'affichage : pixels par mètre">
              1 m = ${Number(this.project.pixelsPerMeter.toFixed(2))} px
            </div>

            <!-- Bouton Plein Écran -->
            <button
              class="btn-fullscreen ${this.isFullscreen ? 'active' : ''}"
              @click=${() => void this.toggleFullscreen()}
              title="${this.isFullscreen ? 'Sortir du plein écran (Échap)' : 'Passer en plein écran'}"
            >
              <span style="font-size: 1.05rem; line-height: 1;">${this.isFullscreen ? '🗗' : '⛶'}</span>
              <span class="btn-label">${this.isFullscreen ? 'Sortir du plein écran' : 'Plein écran'}</span>
            </button>

            <!-- Sauvegarde (indicateur des modifications non sauvegardées) -->
            <button
              class="btn-primary ${activeDirty ? 'is-dirty' : ''}"
              ?disabled=${this.readOnly || !ready || saving}
              @click=${this.openSaveModal}
              title=${activeDirty ? 'Modifications non sauvegardées (Ctrl+S / Cmd+S)' : 'Sauvegarder le plan (Ctrl+S / Cmd+S)'}
            >
              ${saving ? html`⏳<span class="btn-label"> Sauvegarde…</span>` : html`💾<span class="btn-label"> Sauvegarder</span>${activeDirty ? html` <span class="dirty-dot">●</span>` : null}`}
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
              @toggle-3d=${(e: CustomEvent<{ is3DMode: boolean }>) => this.is3DMode = e.detail.is3DMode}
              @opening-config-changed=${this.handleOpeningConfigChanged}
              @room-selected=${(e: CustomEvent<{ room: Room }>) => this.selectedRoomForEdit = e.detail.room}
              @project-changed=${this.handleProjectChanged}
              @request-calibration=${this.handleRequestCalibration}
              @request-rescale=${this.handleRequestRescale}
              @background-image-loaded=${this.handleBackgroundDropped}
              @placement-done=${this.handlePlacementDone}
            ></home-architect-canvas>

            <!-- Floating HUD de sélection multi-éléments repositionné en bas -->
            ${(() => {
              // Éléments encore présents dans le plan uniquement (identifiants périmés ignorés, constat F130).
              if (countSelection(selection) === 0) return null;

              const selectedBinding = selection.bindingIds.length > 0
                ? this.project.bindings.find(b => b.id === selection.bindingIds[0])
                : null;
              const selectedFurniture = (selection.furnitureIds ?? []).length > 0
                ? (this.project.furniture ?? []).find(f => f.id === selection.furnitureIds?.[0])
                : undefined;

              return html`
                <div class="selection-hud">
                  <div class="selection-hud-main">
                    <span class="selection-info">
                      <span>🎯</span>
                      <span>${this.getSelectedSummary(selection)}</span>
                    </span>

                    ${selection.wallIds.length > 0 ? html`
                      <div class="hud-options-group">
                        <span class="hud-label">Épaisseur :</span>
                        <button class="hud-opt-btn ${this.currentThickness === 0.10 ? 'active' : ''}" @click=${() => this.updateSelectedWallsThickness(0.10)} title="Cloison 10 cm">Fin 10cm</button>
                        <button class="hud-opt-btn ${this.currentThickness === 0.20 ? 'active' : ''}" @click=${() => this.updateSelectedWallsThickness(0.20)} title="Standard 20 cm">Moyen 20cm</button>
                        <button class="hud-opt-btn ${this.currentThickness === 0.30 ? 'active' : ''}" @click=${() => this.updateSelectedWallsThickness(0.30)} title="Porteur 30 cm">Gros 30cm</button>
                      </div>
                    ` : null}

                    ${selection.openingIds.some(id => this.project.openings.find(op => op.id === id)?.type === 'door') ? html`
                      <div class="hud-options-group">
                        <span class="hud-label">Porte :</span>
                        <button class="hud-opt-btn ${!this.doorFlipSide && this.doorFlipDirection ? 'active' : ''}" @click=${() => this.updateSelectedDoorConfig(false, true)} title="Ouverture Droite Intérieure (Poussant Droit)">Droite Int.</button>
                        <button class="hud-opt-btn ${!this.doorFlipSide && !this.doorFlipDirection ? 'active' : ''}" @click=${() => this.updateSelectedDoorConfig(false, false)} title="Ouverture Gauche Intérieure (Poussant Gauche)">Gauche Int.</button>
                        <button class="hud-opt-btn ${this.doorFlipSide && !this.doorFlipDirection ? 'active' : ''}" @click=${() => this.updateSelectedDoorConfig(true, false)} title="Ouverture Gauche Extérieure (Tirant Gauche)">Gauche Ext.</button>
                        <button class="hud-opt-btn ${this.doorFlipSide && this.doorFlipDirection ? 'active' : ''}" @click=${() => this.updateSelectedDoorConfig(true, true)} title="Ouverture Droite Extérieure (Tirant Droit)">Droite Ext.</button>
                      </div>
                    ` : null}

                    ${selection.openingIds.some(id => {
                      const op = this.project.openings.find(o => o.id === id);
                      return op && (op.type === 'window' || op.type === 'french_window');
                    }) ? html`
                      <div class="hud-options-group">
                        <span class="hud-label">Fenêtre :</span>
                        <button class="hud-opt-btn ${this.windowSashCount === 1 ? 'active' : ''}" @click=${() => this.updateSelectedWindowConfig('window', 1, 0.90)} title="Fenêtre 1 ouvrant (90 cm)">1 Ouvrant</button>
                        <button class="hud-opt-btn ${this.windowSashCount === 2 ? 'active' : ''}" @click=${() => this.updateSelectedWindowConfig('window', 2, 1.40)} title="Fenêtre 2 battants (1.40 m)">2 Battants</button>
                        <button class="hud-opt-btn" @click=${() => this.updateSelectedWindowConfig('french_window', 2, 2.00)} title="Baie vitrée coulissante (2.00 m)">Baie vitrée</button>
                      </div>
                    ` : null}

                    ${selectedFurniture ? html`
                      <div class="hud-options-group">
                        <span class="hud-label">Meuble :</span>
                        <button class="hud-opt-btn active" ?disabled=${this.readOnly} @click=${this.rotateSelectedFurniture} title="Pivoter les meubles de 90° (Touche R)">🔄 Pivoter 90° (R)</button>
                        <label class="hud-color" title="Couleur du meuble (plan, export et carte)">
                          <span class="hud-label">Couleur</span>
                          <input
                            type="color"
                            .value=${furnitureColorValue(selectedFurniture)}
                            ?disabled=${this.readOnly}
                            @input=${(e: Event) => this.updateSelectedFurnitureColor((e.target as HTMLInputElement).value)}
                          />
                        </label>
                        ${selectedFurniture.color ? html`
                          <button class="hud-opt-btn" ?disabled=${this.readOnly} @click=${() => this.updateSelectedFurnitureColor(null)} title="Revenir à la couleur du modèle">↺</button>
                        ` : null}
                      </div>
                    ` : null}

                    ${selectedBinding ? html`
                      <div class="hud-options-group">
                        <button 
                          class="hud-opt-btn ${this.isIconPickerOpen ? 'active' : ''}" 
                          @click=${() => this.isIconPickerOpen = !this.isIconPickerOpen}
                          title="Choisir l'icône pour le plan et la card Lovelace"
                        >
                          <span style="font-size: 1.05rem;">${selectedBinding.icon || '🎨'}</span>
                          <span>Choisir l'icône ${this.isIconPickerOpen ? '▴' : '▾'}</span>
                        </button>
                      </div>
                    ` : null}

                    <button class="btn-delete-selection" ?disabled=${this.readOnly} @click=${this.handleDeleteSelected} title="Supprimer les éléments sélectionnés (Touche Suppr / Retour)">
                      <span>🗑️</span>
                      <span>Supprimer</span>
                    </button>
                    <button class="btn-clear-selection" @click=${this.clearSelection} title="Désélectionner tout (Échap)">
                      ✕
                    </button>
                  </div>

                  <!-- Onglet / Palette Choisir l'icône pour l'entité sélectionnée -->
                  ${selectedBinding && this.isIconPickerOpen ? html`
                    <div class="hud-icon-picker-panel">
                      <div class="icon-category-tabs">
                        ${Object.entries(TYPOLOGY_ICONS).map(([key, group]) => html`
                          <button 
                            class="icon-category-tab ${this.getActiveTypology() === key ? 'active' : ''}"
                            @click=${() => this.selectedTypologyTab = key}
                          >
                            ${group.tabLabel}
                          </button>
                        `)}
                      </div>

                      <div class="icon-grid">
                        ${(TYPOLOGY_ICONS[this.getActiveTypology()] || TYPOLOGY_ICONS['light']).icons.map(item => html`
                          <button 
                            class="icon-item-btn ${selectedBinding.icon === item.icon ? 'active' : ''}"
                            @click=${() => this.updateSelectedBindingIcon(item.icon, item.mdi)}
                            title="${item.label} (${item.mdi})"
                          >
                            <span class="icon-item-emoji">${item.icon}</span>
                            <span>${item.label}</span>
                          </button>
                        `)}
                      </div>

                      <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 0.78rem; color: #94a3b8; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 4px;">
                        <span>Icône active : <strong style="color: #38bdf8;">${selectedBinding.icon || 'Défaut'}</strong> (${selectedBinding.mdiIcon || 'Automatique'})</span>
                        <div style="display: flex; align-items: center; gap: 4px;">
                          <span>Saisie libre :</span>
                          <input 
                            type="text" 
                            style="width: 55px; background: rgba(30, 41, 59, 0.9); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 6px; color: #fff; padding: 2px 4px; font-size: 0.85rem; text-align: center;" 
                            placeholder="Emoji"
                            maxlength="4"
                            @keydown=${(e: KeyboardEvent) => {
                              if (e.key === 'Enter') {
                                const val = (e.target as HTMLInputElement).value.trim();
                                if (val) this.updateSelectedBindingIcon(val);
                              }
                            }}
                            @change=${(e: any) => {
                              const val = e.target.value.trim();
                              if (val) this.updateSelectedBindingIcon(val);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ` : null}
                </div>
              `;
            })()}

            <!-- Notification Toast -->
            ${this.toastMessage ? html`
              <div class="toast-notification">
                ${this.toastMessage}
              </div>
            ` : null}
          </div>

          <!-- Volet des entités HA et des meubles : colonne, ou tiroir superposé sur écran étroit -->
          <home-architect-entity-drawer
            .hass=${this.hass}
            ?collapsed=${this.isDrawerCollapsed}
            @toggle-collapse=${this.toggleDrawer}
            @drawer-item-picked=${this.handleDrawerItemPicked}
          ></home-architect-entity-drawer>
        </div>

        <!-- Modal d'Import Automatisé -->
        ${this.isImportModalOpen ? html`
          <home-architect-import-modal
            .currentLevel=${this.project.category || DEFAULT_LEVEL}
            .initialFile=${this.importInitialFile}
            .initialSvg=${this.importInitialSvg}
            @import-confirmed=${this.handleImportConfirmed}
            @import-project-backup=${this.handleImportProjectBackup}
            @close=${this.closeImportModal}
          ></home-architect-import-modal>
        ` : null}

        <!-- Modal Assistant Pièce Débutant -->
        ${this.isWizardOpen ? html`
          <home-architect-wizard-modal
            @create-room=${this.handleCreateRoomFromWizard}
            @close=${() => this.isWizardOpen = false}
          ></home-architect-wizard-modal>
        ` : null}

        <!-- Modal Propriétés de la Pièce (Hauteur sous plafond 3D, etc.) -->
        ${this.selectedRoomForEdit ? html`
          <home-architect-room-modal
            .room=${this.selectedRoomForEdit}
            .hass=${this.hass}
            .defaultCeilingHeight=${this.project.defaultCeilingHeight}
            .walls=${this.project.walls}
            @save-room=${this.handleSaveRoom}
            @delete-room=${this.handleDeleteRoom}
            @close=${() => this.selectedRoomForEdit = null}
          ></home-architect-room-modal>
        ` : null}

        <!-- Modal Étalonnage Mesure de Mur -->
        ${this.isCalibrateModalOpen && this.calibrationData ? html`
          <home-architect-calibrate-modal
            .worldDistance=${this.calibrationData.worldDistance}
            .defaultMeters=${this.calibrationData.defaultMeters}
            .pixelsPerMeter=${this.project.pixelsPerMeter}
            .hasGeometry=${!isEmptyProject({ ...this.project, background: undefined })}
            .hasBackground=${!!this.project.background}
            @calibrate-confirmed=${this.handleCalibrateConfirmed}
            @close=${this.closeCalibrateModal}
          ></home-architect-calibrate-modal>
        ` : null}

        <!-- Modal Mettre à l'échelle (Recalcul de toutes les cotes) -->
        ${this.isRescaleModalOpen ? html`
          <home-architect-rescale-modal
            .measuredMeters=${this.rescaleMeasuredMeters}
            .wallCount=${this.project.walls.length}
            .roomCount=${this.project.rooms.length}
            .openingCount=${this.project.openings.length}
            .furnitureCount=${(this.project.furniture || []).length}
            .bindingCount=${this.project.bindings.length}
            .hasBackground=${!!(this.project.background && (this.project.background.assetId || this.project.background.imageUrl))}
            @rescale-confirmed=${this.handleRescaleConfirmed}
            @close=${() => this.isRescaleModalOpen = false}
          ></home-architect-rescale-modal>
        ` : null}

        <!-- Modal Exporter vers Lovelace -->
        ${this.isExportModalOpen ? html`
          <home-architect-export-modal
            .project=${this.project}
            .hass=${this.hass}
            .backgroundSrc=${this.persistence.background.src}
            .readOnly=${this.readOnly}
            .dirty=${activeDirty}
            @export-frame-changed=${this.handleExportFrameChanged}
            @project-published=${this.handleProjectPublished}
            @project-unpublished=${this.handleProjectUnpublished}
            @save-requested=${this.handleExportSaveRequested}
            @close=${() => this.isExportModalOpen = false}
          ></home-architect-export-modal>
        ` : null}

        <!-- Modal Sauvegarder & Recharger un Plan -->
        ${this.isSaveLoadModalOpen ? html`
          <home-architect-save-load-modal
            .hass=${this.hass}
            .project=${this.project}
            .mode=${this.saveLoadModalTab}
            .readOnly=${this.readOnly}
            .dirtyProjectIds=${dirtyIds}
            @save-confirmed=${this.handleSaveConfirmed}
            @load-project=${this.handleLoadProject}
            @project-deleted=${(e: CustomEvent<{ projectId: string }>) => this.persistence.projectDeleted(e.detail.projectId, { remote: false })}
            @close=${() => this.isSaveLoadModalOpen = false}
          ></home-architect-save-load-modal>
        ` : null}

        <!-- Modal Nouveau Plan -->
        ${this.isNewPlanModalOpen ? html`
          <div class="modal-backdrop" @click=${(e: MouseEvent) => { if (e.target === e.currentTarget) this.isNewPlanModalOpen = false; }}>
            <div class="modal-dialog">
              <div class="modal-dialog-header">
                <div class="modal-dialog-title-group">
                  <span class="modal-dialog-icon">📄</span>
                  <div>
                    <h3 class="modal-dialog-title">Nouveau Plan</h3>
                    <p class="modal-dialog-subtitle">Créer une feuille de dessin vierge</p>
                  </div>
                </div>
                <button class="btn-dialog-close" @click=${() => this.isNewPlanModalOpen = false}>✕</button>
              </div>
              <div class="modal-dialog-body">
                <div class="dialog-form-group">
                  <label class="dialog-label">Nom du plan :</label>
                  <input
                    type="text"
                    class="dialog-input"
                    .value=${this.newPlanName}
                    @input=${(e: any) => this.newPlanName = e.target.value}
                    placeholder="Ex: Mon Appartement, RDC..."
                    autofocus
                  />
                </div>

                <div class="dialog-form-group">
                  <label class="dialog-label">Catégorie / Niveau :</label>
                  <div class="category-grid">
                    ${[...KNOWN_LEVELS, CUSTOM_CATEGORY_DEF].map(cat => html`
                      <button
                        type="button"
                        class="category-btn ${this.newPlanCategory === cat.id ? 'active' : ''}"
                        @click=${() => this.newPlanCategory = cat.id}
                      >
                        <span>${cat.icon}</span>
                        <span>${cat.label}</span>
                      </button>
                    `)}
                  </div>
                </div>
              </div>
              <div class="modal-dialog-footer">
                <button class="btn-dialog-cancel" @click=${() => this.isNewPlanModalOpen = false}>Annuler</button>
                <button class="btn-dialog-confirm primary" @click=${() => void this.handleConfirmNewPlan()}>
                  <span>✨</span>
                  <span>Créer le plan</span>
                </button>
              </div>
            </div>
          </div>
        ` : null}

        <!-- Modal Effacer le Plan (Reset) -->
        ${this.isResetModalOpen ? html`
          <div class="modal-backdrop" @click=${(e: MouseEvent) => { if (e.target === e.currentTarget) this.isResetModalOpen = false; }}>
            <div class="modal-dialog danger">
              <div class="modal-dialog-header danger">
                <div class="modal-dialog-title-group">
                  <span class="modal-dialog-icon">🗑️</span>
                  <div>
                    <h3 class="modal-dialog-title" style="color: #f87171;">Effacer le Plan</h3>
                    <p class="modal-dialog-subtitle">Réinitialisation de l'espace de travail</p>
                  </div>
                </div>
                <button class="btn-dialog-close" @click=${() => this.isResetModalOpen = false}>✕</button>
              </div>
              <div class="modal-dialog-body">
                <p style="color: #f1f5f9; margin: 0; line-height: 1.5; font-size: 0.92rem;">
                  Êtes-vous sûr de vouloir <strong>effacer tout le contenu</strong> du plan actuel
                  (<strong>${this.project.name || getLevelLabel(this.project.category)}</strong>) ?
                </p>

                <div class="reset-summary-box">
                  <div>🧱 <strong>Murs :</strong> ${this.project.walls.length}</div>
                  <div>🚪 <strong>Ouvrants :</strong> ${this.project.openings.length}</div>
                  <div>🏷️ <strong>Pièces :</strong> ${this.project.rooms.length}</div>
                  <div>⚡ <strong>Entités HA :</strong> ${this.project.bindings.length}</div>
                  <div>🛋️ <strong>Meubles :</strong> ${this.project.furniture?.length || 0}</div>
                  <div>🖼️ <strong>Image de fond :</strong> ${this.project.background ? 'Oui' : 'Non'}</div>
                </div>

                <p style="color: #94a3b8; font-size: 0.8rem; margin: 0;">
                  ℹ️ Cette action est réversible avec le bouton Annuler (Ctrl+Z).
                </p>
              </div>
              <div class="modal-dialog-footer">
                <button class="btn-dialog-cancel" @click=${() => this.isResetModalOpen = false}>Annuler</button>
                <button class="btn-dialog-confirm danger" @click=${() => this.handleConfirmResetPlan()}>
                  <span>🗑️</span>
                  <span>Effacer tout</span>
                </button>
              </div>
            </div>
          </div>
        ` : null}

        <!-- Modale Mise à jour (notification seulement : l'installation passe par HA) -->
        ${this.isUpdateModalOpen && this.updateInfo?.available ? renderUpdateDialog(this.updateInfo, dirtyCount, {
          onClose: () => this.closeUpdateModal(),
          onOpenUpdates: () => this.openHaUpdates()
        }) : null}

        <!-- À propos : version, état des mises à jour, liens (release, soutien du projet) -->
        ${this.isAboutOpen ? renderAboutDialog({
          info: this.updateInfo,
          canManageUpdates: !this.readOnly,
          onClose: () => { this.isAboutOpen = false; },
          onShowUpdate: () => { this.isAboutOpen = false; this.isUpdateModalOpen = true; },
          onOpenUpdates: () => this.openHaUpdates()
        }) : null}

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
