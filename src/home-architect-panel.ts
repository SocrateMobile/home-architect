import { LitElement, html, css, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import './components/canvas-view';
import './components/toolbar';
import './components/wizard-modal';
import './components/room-modal';
import './components/calibrate-modal';
import './components/entity-drawer';
import './components/import-modal';
import './components/rescale-modal';
import { RescaleModalResult } from './components/rescale-modal';
import './components/export-modal';
import './components/save-load-modal';
import { SnappingEngine } from './core/snapping';
import { PolygonUtils } from './core/polygon';
import { VERSION } from './version';
import { launchSocrateRulesEasterEgg } from './core/easter-egg';
import { defineElement } from './core/define';
import { hasPrimaryModifier, isEventFromHost, shouldHandleShortcut } from './core/keyboard';
import { CUSTOM_CATEGORY_DEF, DEFAULT_LEVEL, KNOWN_LEVELS, getLevelBelow, getLevelLabel, isKnownLevel } from './core/levels';
import { generateElementId } from './core/project-model';
import { isAdmin } from './core/ha-api';
import {
  ActiveTool, BackgroundPlan, ExportFrame, HomeArchitectProject, Wall, Opening, Room, Point, EntityBinding,
  PublishInfo, SelectedElements
} from './core/types';
import { SvgParseResult } from './core/svg-parser';
import { PlanEntry, isEmptyProject } from './panel/workspace';
import { ImportedBackground, isInlineDataUrl } from './panel/background';
import { PersistenceController } from './panel/persistence-controller';
import { HA_UPDATES_PATH, UpdateInfo, fetchUpdateInfo, navigateInHa, updateEntitySignature } from './panel/update-check';
import { PanelNotice, renderUpdateDialog } from './panel/dialogs';
import { persistenceStyles } from './panel/styles';

/**
 * Détail de `import-confirmed` (SPEC §6) : l'image de fond arrive déjà compressée sous forme de
 * Blob, le panneau la téléverse puis ne garde que sa référence (assetId).
 */
interface ImportConfirmedDetail {
  background?: ImportedBackground;
  opacity?: number;
  mode: 'auto_dimension' | 'interactive_calibrate';
  totalWidthMeters?: number;
  isSvgVectorized?: boolean;
  svgInterpretation?: SvgParseResult;
  keepSvgBackground?: boolean;
}

/** Remplace dans un élément de liste ce que `fn` modifie ; null si rien n'a changé. */
function mapChanged<T>(list: T[], fn: (item: T) => T): T[] | null {
  let changed = false;
  const next = list.map(item => {
    const updated = fn(item);
    if (updated !== item) changed = true;
    return updated;
  });
  return changed ? next : null;
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
  `, persistenceStyles];

  @property({ type: Object })
  public hass: any;

  @property({ type: Boolean })
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
  private showDimensions: boolean = true;

  @state()
  private showThermalHeatmap: boolean = false;

  @state()
  private showGhostLevel: boolean = false;

  @state()
  private is3DMode: boolean = false;

  @state()
  private isFullscreen: boolean = false;

  @state()
  private isDrawerCollapsed: boolean = false;

  @state()
  private isWizardOpen: boolean = false;

  @state()
  private isImportModalOpen: boolean = false;

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

  @state()
  private calibrationData: { pixelDistance: number; defaultMeters: number } | null = null;

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
  private socrateKeySequence: string = '';
  private _boundEasterEggKeyDown: ((e: KeyboardEvent) => void) | null = null;
  private updateCheckStarted: boolean = false;
  /** Signature de l'entité update au dernier contrôle (réévaluation quand elle change). */
  private updateEntitySig: string | null = null;

  /**
   * Persistance (src/panel/persistence-controller.ts) : plans ouverts indexés par id, chargement,
   * sauvegarde avec contrôle de révision, brouillons locaux, image de fond et abonnement.
   */
  private readonly persistence = new PersistenceController(this, {
    toast: message => this.showToast(message),
    activeProjectChanged: () => this.clearSelection()
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

  private fileInputRef: HTMLInputElement | null = null;

  private handleToolSelected(e: CustomEvent<{ tool: ActiveTool }>) {
    this.activeTool = e.detail.tool;
    if (this.activeTool === 'door') {
      this.currentOpeningWidth = 0.90;
    } else if (this.activeTool === 'window') {
      this.currentOpeningWidth = this.windowSashCount === 2 ? 1.40 : 0.90;
    } else if (this.activeTool === 'french_window') {
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
    this.activeTool = e.detail.type;
    this.currentOpeningWidth = e.detail.width;
    this.windowSashCount = e.detail.sashCount;

    // Mettre à jour les fenêtres sélectionnées (seulement si l'une d'elles change réellement)
    if (this.selectedElements.openingIds.length > 0 && !this.readOnly) {
      let updated = 0;
      const newOpenings = mapChanged(this.project.openings, op => {
        if (this.selectedElements.openingIds.includes(op.id) && (op.type === 'window' || op.type === 'french_window') &&
            (op.type !== e.detail.type || op.width !== e.detail.width || op.sashCount !== e.detail.sashCount)) {
          updated++;
          return {
            ...op,
            type: e.detail.type,
            width: e.detail.width,
            sashCount: e.detail.sashCount
          };
        }
        return op;
      });
      if (newOpenings && this.commitProject({ ...this.project, openings: newOpenings })) {
        this.showToast(`🪟 ${updated} fenêtre(s) mise(s) à jour`);
      }
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
    const newOpenings = mapChanged(this.project.openings, op =>
      this.selectedElements.openingIds.includes(op.id) && (op.type === 'window' || op.type === 'french_window') &&
      (op.type !== type || op.sashCount !== sashCount || op.width !== width)
        ? { ...op, type, sashCount, width }
        : op
    );
    if (newOpenings && this.commitProject({ ...this.project, openings: newOpenings })) {
      this.showToast('🪟 Format de fenêtre mis à jour');
    }
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
    this.commitProject({
      ...changed,
      furniture: changed.furniture || []
    });
  }

  /**
   * Applique une modification de l'utilisateur au plan actif (historique, drapeau « modifié »,
   * brouillon local). Renvoie false si rien n'a été appliqué.
   */
  private commitProject(next: HomeArchitectProject, opts: { coalesceKey?: string } = {}): boolean {
    return this.persistence.commit(next, opts);
  }

  private notifyReadOnly() {
    this.persistence.notifyReadOnly();
  }

  private handleThicknessChange(e: Event) {
    this.currentThickness = parseFloat((e.target as HTMLSelectElement).value);
  }

  private handleOpeningWidthChange(e: Event) {
    this.currentOpeningWidth = parseFloat((e.target as HTMLSelectElement).value);
  }

  private handleCreateRoomFromWizard(e: CustomEvent<any>) {
    if (this.readOnly) {
      this.isWizardOpen = false;
      this.notifyReadOnly();
      return;
    }
    const { name, width, length, thickness, height, color, icon, addDoor, addWindow } = e.detail;
    const roomH = height || 2.50;

    const startX = 2.0;
    const startY = 2.0;

    const p1: Point = { x: startX, y: startY };
    const p2: Point = { x: startX + width, y: startY };
    const p3: Point = { x: startX + width, y: startY + length };
    const p4: Point = { x: startX, y: startY + length };

    const wTop: Wall = {
      id: generateElementId('w'),
      start: p1,
      end: p2,
      thickness,
      height: roomH,
      type: 'standard'
    };
    const wRight: Wall = {
      id: generateElementId('w'),
      start: p2,
      end: p3,
      thickness,
      height: roomH,
      type: 'standard'
    };
    const wBottom: Wall = {
      id: generateElementId('w'),
      start: p3,
      end: p4,
      thickness,
      height: roomH,
      type: 'standard'
    };
    const wLeft: Wall = {
      id: generateElementId('w'),
      start: p4,
      end: p1,
      thickness,
      height: roomH,
      type: 'standard'
    };

    const newOpenings: Opening[] = [];

    if (addDoor) {
      newOpenings.push({
        id: generateElementId('op'),
        wallId: wBottom.id,
        type: 'door',
        offset: width / 2,
        width: 0.90,
        flipSide: false,
        flipDirection: false
      });
    }

    if (addWindow) {
      newOpenings.push({
        id: generateElementId('op'),
        wallId: wTop.id,
        type: 'window',
        offset: width / 2,
        width: 1.20,
        flipSide: false,
        flipDirection: false
      });
    }

    const newRoom: Room = {
      id: generateElementId('room'),
      name,
      polygon: [p1, p2, p3, p4],
      areaM2: width * length,
      color,
      icon,
      height: roomH
    };

    this.commitProject({
      ...this.project,
      walls: [...this.project.walls, wTop, wRight, wBottom, wLeft],
      openings: [...this.project.openings, ...newOpenings],
      rooms: [...this.project.rooms, newRoom]
    });

    this.isWizardOpen = false;
    this.activeTool = 'select';
  }

  @state()
  private toastMessage: string | null = null;
  private toastTimeout: any = null;
  private _boundPaste: any = null;
  private _boundKeyDown: any = null;
  private _boundClickOutside: any = null;
  private _boundFullscreenChange: any = null;
  private _boundResize: any = null;
  private _boundDocumentClick: any = null;
  private _sidebarResizeObserver: ResizeObserver | null = null;

  public updateSidebarOffset(): void {
    if (this.isFullscreen) {
      this.style.setProperty('--ha-sidebar-width', '0px');
      return;
    }

    let sidebarW = 0;

    // 1. Détection via Shadow DOM Home Assistant (structure standard ha-sidebar)
    try {
      const ha = document.querySelector('home-assistant');
      const main = ha?.shadowRoot?.querySelector('home-assistant-main');
      const sidebar = main?.shadowRoot?.querySelector('ha-sidebar');
      if (sidebar) {
        const rect = sidebar.getBoundingClientRect();
        if (rect.width > 0 && rect.right > 0 && window.getComputedStyle(sidebar).display !== 'none') {
          sidebarW = Math.round(rect.width);
        }

        if (!this._sidebarResizeObserver && typeof ResizeObserver !== 'undefined') {
          this._sidebarResizeObserver = new ResizeObserver(() => {
            this.updateSidebarOffset();
          });
          this._sidebarResizeObserver.observe(sidebar);
        }
      }
    } catch (_) {}

    // 2. Recherche directe de l'élément ha-sidebar dans le document
    if (sidebarW === 0) {
      try {
        const sidebar = document.querySelector('ha-sidebar');
        if (sidebar) {
          const rect = sidebar.getBoundingClientRect();
          if (rect.width > 0 && rect.right > 0 && window.getComputedStyle(sidebar).display !== 'none') {
            sidebarW = Math.round(rect.width);
          }
        }
      } catch (_) {}
    }

    // 3. Fallback sur les variables CSS officielles de Home Assistant
    if (sidebarW === 0) {
      try {
        const docStyles = getComputedStyle(document.documentElement);
        const drawerW = docStyles.getPropertyValue('--app-drawer-width') || docStyles.getPropertyValue('--mdc-drawer-width');
        if (drawerW && drawerW.trim().endsWith('px')) {
          const val = parseFloat(drawerW);
          if (!isNaN(val) && val > 0) sidebarW = val;
        }
      } catch (_) {}
    }

    // 4. Calcul de l'empiètement réel sur l'élément hôte
    let neededOffset = 0;
    if (sidebarW > 0) {
      const hostRect = this.getBoundingClientRect();
      const currentApplied = parseFloat(this.style.getPropertyValue('--ha-sidebar-width') || '0') || 0;
      const baselineLeft = hostRect.left - currentApplied;

      if (baselineLeft < sidebarW) {
        neededOffset = Math.max(0, sidebarW - Math.max(0, baselineLeft));
      }
    }

    this.style.setProperty('--ha-sidebar-width', `${neededOffset}px`);
  }

  connectedCallback() {
    super.connectedCallback();
    this._boundPaste = this.handlePaste.bind(this);
    window.addEventListener('paste', this._boundPaste);
    this._boundKeyDown = this.handleKeyDown.bind(this);
    window.addEventListener('keydown', this._boundKeyDown);

    this._boundClickOutside = (e: MouseEvent) => {
      if (this.activeDropdown) {
        const path = e.composedPath();
        const isInside = path.some((el: any) => el?.classList?.contains('dropdown-menu-wrapper'));
        if (!isInside) {
          this.activeDropdown = null;
        }
      }
    };
    window.addEventListener('click', this._boundClickOutside);

    this._boundFullscreenChange = () => {
      const isFs = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      this.isFullscreen = isFs;
      if (isFs) {
        this.classList.add('is-fullscreen');
      } else {
        this.classList.remove('is-fullscreen');
      }
      this.updateSidebarOffset();
    };
    document.addEventListener('fullscreenchange', this._boundFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this._boundFullscreenChange);
    document.addEventListener('mozfullscreenchange', this._boundFullscreenChange);
    document.addEventListener('MSFullscreenChange', this._boundFullscreenChange);

    this._boundResize = () => this.updateSidebarOffset();
    window.addEventListener('resize', this._boundResize);

    this._boundDocumentClick = () => {
      setTimeout(() => this.updateSidebarOffset(), 50);
      setTimeout(() => this.updateSidebarOffset(), 320);
    };
    document.addEventListener('click', this._boundDocumentClick, { passive: true });

    this.updateSidebarOffset();
    setTimeout(() => this.updateSidebarOffset(), 100);

    // Easter Egg: Écoute globale du mot-clé secret "socrate" au clavier
    this._boundEasterEggKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || (e.target as HTMLElement)?.isContentEditable) {
        return;
      }
      if (e.key && e.key.length === 1) {
        this.socrateKeySequence = (this.socrateKeySequence + e.key.toLowerCase()).slice(-7);
        if (this.socrateKeySequence === 'socrate') {
          this.socrateKeySequence = '';
          this.triggerEasterEgg();
        }
      }
    };
    window.addEventListener('keydown', this._boundEasterEggKeyDown);
  }

  firstUpdated() {
    this.updateSidebarOffset();
  }

  willUpdate(changedProps: PropertyValues<this>) {
    super.willUpdate(changedProps);
    // Lecture seule (constat F11) : aucun outil de tracé actif, seule la sélection reste possible.
    if (this.readOnly && this.activeTool !== 'select') this.activeTool = 'select';
    if (this.isConnected) this.persistence.prefetchGhost(this.ghostLevel());
  }

  updated(changedProps: PropertyValues<this>) {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass) {
      this.persistence.start();
      this.maybeRefreshUpdateInfo();
      this.syncSidebarBadge(!!this.updateInfo?.available);
    }
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
      this.syncSidebarBadge(!!info?.available);
    } catch (err) {
      console.debug('[home-architect] Vérification des mises à jour impossible :', err);
    }
  }

  /** Ouvre la page HA des mises à jour (les brouillons des plans modifiés sont écrits avant de quitter). */
  private openHaUpdates() {
    this.isUpdateModalOpen = false;
    this.persistence.flushDrafts();
    navigateInHa(HA_UPDATES_PATH);
  }

  private reloadPage() {
    this.persistence.flushDrafts();
    window.location.reload();
  }

  /**
   * Synchronise le badge rouge "MAJ" dans le volet latéral Home Assistant
   */
  public syncSidebarBadge(hasUpdate: boolean) {
    try {
      const ha = document.querySelector('home-assistant');
      const main = ha && ha.shadowRoot && ha.shadowRoot.querySelector('home-assistant-main');
      const sidebar = main && main.shadowRoot && main.shadowRoot.querySelector('ha-sidebar');
      if (!sidebar || !sidebar.shadowRoot) return;

      const container = sidebar.shadowRoot.querySelector('paper-listbox, ha-md-list, nav, div.menu, div.items');
      const items = (container || sidebar.shadowRoot).querySelectorAll('paper-icon-item, ha-md-list-item, ha-sidebar-item, a');

      const patterns = ['home-architect', 'home_architect', 'home architect'];

      for (const item of Array.from(items)) {
        const href = item.getAttribute('href') || (item as any).dataset?.panel || (item as any).dataset?.href || '';
        const id = item.id || '';
        const ariaLabel = item.getAttribute('aria-label') || '';
        const text = (item.textContent || '').toLowerCase();

        const isMatch = patterns.some((p) =>
          href.toLowerCase().includes(p) ||
          id.toLowerCase().includes(p) ||
          ariaLabel.toLowerCase().includes(p) ||
          text.includes(p)
        );

        if (isMatch) {
          let badge = item.querySelector('.domolink-sidebar-badge');
          if (hasUpdate) {
            if (!badge) {
              badge = document.createElement('span');
              badge.className = 'badge domolink-sidebar-badge';
              badge.setAttribute('slot', 'end');
              badge.setAttribute('style', 'background: linear-gradient(135deg, #ef4444, #f59e0b); color: white; border-radius: 9999px; padding: 2px 7px; font-size: 10px; font-weight: 800; box-shadow: 0 2px 6px rgba(239,68,68,0.4); margin-left: auto; letter-spacing: 0.5px; z-index: 10; display: inline-block;');
              badge.textContent = 'MAJ';
              badge.setAttribute('title', 'Mise à jour disponible !');
              item.appendChild(badge);
            }
          } else if (badge) {
            badge.remove();
          }
        }
      }
    } catch (_) {}
  }

  /**
   * Déclenche l'easter egg Socrate Rules
   */
  public triggerEasterEgg() {
    const root = this.shadowRoot || this;
    launchSocrateRulesEasterEgg(root);
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
      this.triggerEasterEgg();
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

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._boundPaste) {
      window.removeEventListener('paste', this._boundPaste);
    }
    if (this._boundKeyDown) {
      window.removeEventListener('keydown', this._boundKeyDown);
    }
    if (this._boundEasterEggKeyDown) {
      window.removeEventListener('keydown', this._boundEasterEggKeyDown);
    }
    if (this._boundClickOutside) {
      window.removeEventListener('click', this._boundClickOutside);
    }
    if (this._boundFullscreenChange) {
      document.removeEventListener('fullscreenchange', this._boundFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', this._boundFullscreenChange);
      document.removeEventListener('mozfullscreenchange', this._boundFullscreenChange);
      document.removeEventListener('MSFullscreenChange', this._boundFullscreenChange);
    }
    if (this._boundResize) {
      window.removeEventListener('resize', this._boundResize);
    }
    if (this._boundDocumentClick) {
      document.removeEventListener('click', this._boundDocumentClick);
    }
    if (this._sidebarResizeObserver) {
      this._sidebarResizeObserver.disconnect();
      this._sidebarResizeObserver = null;
    }
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
  }

  public showToast(msg: string) {
    this.toastMessage = msg;
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastMessage = null;
    }, 4500);
  }

  /**
   * Nouvelle image de fond (collage, glisser-déposer) : une image brute (Blob ou data-URL) est
   * compressée puis téléversée, une URL externe est référencée telle quelle (constat F1).
   */
  public async loadBackgroundImage(source: string | Blob, sourceLabel: string = 'Plan chargé !') {
    if (!this.persistence.ready) return;
    if (this.readOnly) {
      this.notifyReadOnly();
      return;
    }
    const projectId = this.project.id;
    const background = typeof source === 'string' && !isInlineDataUrl(source)
      ? await this.externalBackground(source)
      : await this.persistence.withBusy('Téléversement de l\'image de fond…', () =>
        this.persistence.prepareAndUploadBackground(projectId, source)
      );
    if (!background || this.project.id !== projectId) return;
    if (this.commitProject({ ...this.project, background })) {
      this.activeTool = 'calibrate';
      this.showToast(`${sourceLabel} Tracez un segment sur un mur mesuré pour étalonner l'échelle (📏).`);
    }
  }

  /** Image référencée par une URL externe : dimensions lues par le navigateur, aucun téléversement. */
  private externalBackground(url: string): Promise<BackgroundPlan | null> {
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

  private async handleImportConfirmed(e: CustomEvent<ImportConfirmedDetail>) {
    this.isImportModalOpen = false;
    if (this.readOnly) {
      this.notifyReadOnly();
      return;
    }
    const {
      background: imported, opacity, mode, totalWidthMeters,
      isSvgVectorized, svgInterpretation, keepSvgBackground
    } = e.detail;
    const projectId = this.project.id;
    const vectorized = !!(isSvgVectorized && svgInterpretation && svgInterpretation.success);

    // L'image est téléversée avant de modifier le plan : le projet n'en garde que la référence.
    let background: BackgroundPlan | undefined;
    if (imported && (!vectorized || keepSvgBackground)) {
      const defaultOpacity = vectorized ? 0.25 : 0.40;
      const uploaded = await this.persistence.withBusy('Téléversement de l\'image de fond…', () =>
        this.persistence.uploadImportedBackground(projectId, imported, opacity !== undefined ? opacity : defaultOpacity)
      );
      if (!uploaded) return;
      background = uploaded;
    }
    if (this.project.id !== projectId) return;

    // Traitement du mode Vectorisation Intelligente SVG
    if (vectorized && svgInterpretation) {
      const { walls, openings, rooms, metersPerUnit, stats } = svgInterpretation;
      // L'échelle du projet ne dépend pas des unités du SVG : le calque d'origine (1 px = 1 unité de la
      // viewBox) est aligné sur les murs vectorisés par son facteur d'échelle.
      const alignedBackground = background && Number.isFinite(metersPerUnit) && metersPerUnit > 0
        ? { ...background, scale: metersPerUnit * this.project.pixelsPerMeter }
        : background;
      const committed = this.commitProject({
        ...this.project,
        walls: [...this.project.walls, ...walls],
        openings: [...this.project.openings, ...openings],
        rooms: [...this.project.rooms, ...rooms],
        background: alignedBackground
      });
      if (!committed) return;

      this.activeTool = 'select';
      this.showToast(
        `✨ Plan SVG converti : ${stats.wallCount} mur${stats.wallCount > 1 ? 's' : ''}, ${stats.doorCount} porte${stats.doorCount > 1 ? 's' : ''}, ${stats.windowCount} fenêtre${stats.windowCount > 1 ? 's' : ''} et ${stats.roomCount} pièce${stats.roomCount > 1 ? 's' : ''} créés !`
      );
      return;
    }

    // Traitement standard (image de fond ou calque passif)
    if (!background) return;
    let calculatedPpm = this.project.pixelsPerMeter;
    if (mode === 'auto_dimension' && totalWidthMeters && totalWidthMeters > 0 && background.widthPx) {
      calculatedPpm = Math.round((background.widthPx / totalWidthMeters) * 10) / 10;
    }

    if (!this.commitProject({ ...this.project, pixelsPerMeter: calculatedPpm, background })) return;

    if (mode === 'auto_dimension') {
      this.activeTool = 'wall';
      this.showToast(`✅ Plan importé et étalonné automatiquement (1 m = ${calculatedPpm} px) ! Vous pouvez tracer vos murs (🧱).`);
    } else {
      this.activeTool = 'calibrate';
      this.showToast('📏 Plan importé ! Tracez un segment sur un mur mesuré pour étalonner l\'échelle.');
    }
  }

  private handlePaste(e: ClipboardEvent) {
    if (this.isImportModalOpen) return; // Le modal gère lui-même son collage si ouvert
    if (!e.clipboardData) return;

    // 1. Image brute dans le presse-papier
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          void this.loadBackgroundImage(file, '📋 Image collée depuis le presse-papier !');
          return;
        }
      }
    }

    // 2. Traitement du texte dans le presse-papier (Code SVG ou URL)
    const text = e.clipboardData.getData('text/plain')?.trim();

    // 2a. Code SVG brut
    if (text && (text.startsWith('<svg') || (text.startsWith('<?xml') && text.includes('<svg')))) {
      e.preventDefault();
      this.openImportModal();
      if (this.isImportModalOpen) this.showToast('📥 Code SVG détecté ! Configurez la vectorisation automatique.');
      return;
    }

    // 3. URL ou data-url en texte brut
    if (text && (text.startsWith('data:image/') || text.match(/\.(png|jpe?g|svg|webp)(\?.*)?$/i))) {
      e.preventDefault();
      void this.loadBackgroundImage(text, '📋 Image chargée depuis l\'URL collée !');
    }
  }

  private triggerFileInput() {
    if (!this.fileInputRef) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.style.display = 'none';
      input.addEventListener('change', (e: any) => this.handleFileSelected(e));
      document.body.appendChild(input);
      this.fileInputRef = input;
    }
    this.fileInputRef.click();
  }

  private handleFileSelected(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const dataUrl = loadEvent.target?.result as string;
      void this.loadBackgroundImage(dataUrl, '🖼️ Image importée depuis votre ordinateur !');
    };
    reader.readAsDataURL(file);
  }

  private handleRequestCalibration(e: CustomEvent<{ pixelDistance: number; defaultMeters: number }>) {
    this.calibrationData = e.detail;
    this.isCalibrateModalOpen = true;
  }

  private handleCalibrateConfirmed(e: CustomEvent<{ pixelsPerMeter: number }>) {
    const { pixelsPerMeter } = e.detail;
    const rounded = Math.round(pixelsPerMeter * 10) / 10;
    if (rounded !== this.project.pixelsPerMeter) {
      this.commitProject({
        ...this.project,
        pixelsPerMeter: rounded
      });
    }
    this.isCalibrateModalOpen = false;
    this.calibrationData = null;
    this.activeTool = 'wall';
  }

  private handleRequestRescale(e: CustomEvent<{ measuredMeters: number }>) {
    this.rescaleMeasuredMeters = e.detail.measuredMeters;
    this.isRescaleModalOpen = true;
  }

  private handleRescaleConfirmed(e: CustomEvent<RescaleModalResult>) {
    const { scaleFactor, adjustBackground } = e.detail;
    this.isRescaleModalOpen = false;

    if (!Number.isFinite(scaleFactor) || scaleFactor <= 0 || scaleFactor === 1) return;

    // 1. Recalcul de tous les murs (coordonnées et cotes)
    const newWalls: Wall[] = this.project.walls.map(w => ({
      ...w,
      start: {
        x: SnappingEngine.roundMeters(w.start.x * scaleFactor),
        y: SnappingEngine.roundMeters(w.start.y * scaleFactor)
      },
      end: {
        x: SnappingEngine.roundMeters(w.end.x * scaleFactor),
        y: SnappingEngine.roundMeters(w.end.y * scaleFactor)
      }
    }));

    // 2. Recalcul de toutes les ouvertures
    const newOpenings: Opening[] = this.project.openings.map(op => ({
      ...op,
      offset: SnappingEngine.roundMeters(op.offset * scaleFactor),
      width: SnappingEngine.roundMeters(op.width * scaleFactor)
    }));

    // 3. Recalcul de toutes les pièces et de leurs surfaces en m²
    const newRooms: Room[] = this.project.rooms.map(room => {
      const newPolygon = room.polygon.map(p => ({
        x: SnappingEngine.roundMeters(p.x * scaleFactor),
        y: SnappingEngine.roundMeters(p.y * scaleFactor)
      }));
      const newArea = PolygonUtils.computeArea(newPolygon);
      return {
        ...room,
        polygon: newPolygon,
        areaM2: newArea || SnappingEngine.roundMeters(room.areaM2 * scaleFactor * scaleFactor)
      };
    });

    // 4. Recalcul des liaisons d'entités domotiques
    const newBindings: EntityBinding[] = this.project.bindings.map(b => ({
      ...b,
      position: {
        x: SnappingEngine.roundMeters(b.position.x * scaleFactor),
        y: SnappingEngine.roundMeters(b.position.y * scaleFactor)
      }
    }));

    // 4b. Recalcul des meubles
    const newFurniture = (this.project.furniture || []).map(f => ({
      ...f,
      position: {
        x: SnappingEngine.roundMeters(f.position.x * scaleFactor),
        y: SnappingEngine.roundMeters(f.position.y * scaleFactor)
      },
      width: SnappingEngine.roundMeters(f.width * scaleFactor),
      length: SnappingEngine.roundMeters(f.length * scaleFactor)
    }));

    // 5. Ajustement de l'échelle du calque de fond (si présent)
    let newPpm = this.project.pixelsPerMeter;
    let newBg = this.project.background ? { ...this.project.background } : undefined;
    if (adjustBackground && newBg) {
      newPpm = Math.round((this.project.pixelsPerMeter / scaleFactor) * 10) / 10;
      if (newBg.offset) {
        newBg = {
          ...newBg,
          offset: {
            x: SnappingEngine.roundMeters(newBg.offset.x * scaleFactor),
            y: SnappingEngine.roundMeters(newBg.offset.y * scaleFactor)
          }
        };
      }
    }

    const committed = this.commitProject({
      ...this.project,
      pixelsPerMeter: newPpm,
      walls: newWalls,
      openings: newOpenings,
      rooms: newRooms,
      bindings: newBindings,
      furniture: newFurniture,
      background: newBg
    });
    if (!committed) return;

    this.activeTool = 'select';
    this.showToast(
      `✅ Plan mis à l'échelle (×${scaleFactor.toFixed(3)}) : ${newWalls.length} murs et ${newRooms.length} pièces recalculés !`
    );
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

  private handleDefaultCeilingChange(val: number) {
    if (!Number.isFinite(val) || val === this.project.defaultCeilingHeight) return;
    if (this.commitProject({ ...this.project, defaultCeilingHeight: val })) {
      this.showToast(`📐 Hauteur plafond 3D par défaut : ${val.toFixed(2)} m`);
    }
  }

  private handleSaveRoom(e: CustomEvent<any>) {
    const { roomId, name, height, color } = e.detail;
    this.selectedRoomForEdit = null;
    const updatedRooms = mapChanged(this.project.rooms, r =>
      r.id === roomId && (r.name !== name || r.height !== height || r.color !== color)
        ? { ...r, name, height, color }
        : r
    );
    if (updatedRooms && this.commitProject({ ...this.project, rooms: updatedRooms })) {
      this.showToast(`✨ Pièce "${name}" mise à jour (H: ${height.toFixed(2)} m) !`);
    }
  }

  private handleDeleteRoom(e: CustomEvent<any>) {
    const { roomId } = e.detail;
    this.selectedRoomForEdit = null;
    const rooms = this.project.rooms.filter(r => r.id !== roomId);
    if (rooms.length !== this.project.rooms.length && this.commitProject({ ...this.project, rooms })) {
      this.showToast('🗑️ Pièce supprimée');
    }
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

  /** Niveau affiché en filigrane : celui situé sous le niveau du plan actif (d'après sa catégorie, constat F15). */
  private ghostLevel(): string | null {
    return this.showGhostLevel ? getLevelBelow(this.activeLevel) : null;
  }

  private rotateSelectedFurniture() {
    if (!this.selectedElements.furnitureIds || this.selectedElements.furnitureIds.length === 0) return;
    const furnIds = this.selectedElements.furnitureIds;
    const newFurniture = (this.project.furniture || []).map(f => {
      if (furnIds.includes(f.id)) {
        return {
          ...f,
          rotation: ((f.rotation || 0) + 90) % 360
        };
      }
      return f;
    });
    if (this.commitProject({ ...this.project, furniture: newFurniture })) {
      this.showToast('🔄 Meuble pivoté de 90°');
    }
  }

  private handleDeleteSelected() {
    const { wallIds, openingIds, roomIds, bindingIds, furnitureIds = [] } = this.selectedElements;
    const total = wallIds.length + openingIds.length + roomIds.length + bindingIds.length + furnitureIds.length;
    if (total === 0) return;

    const remainingWalls = this.project.walls.filter(w => !wallIds.includes(w.id));
    const remainingOpenings = this.project.openings.filter(
      op => !openingIds.includes(op.id) && !wallIds.includes(op.wallId)
    );
    const remainingRooms = this.project.rooms.filter(r => !roomIds.includes(r.id));
    const remainingBindings = this.project.bindings.filter(b => !bindingIds.includes(b.id));
    const remainingFurniture = (this.project.furniture || []).filter(f => !furnitureIds.includes(f.id));

    const committed = this.commitProject({
      ...this.project,
      walls: remainingWalls,
      openings: remainingOpenings,
      rooms: remainingRooms,
      bindings: remainingBindings,
      furniture: remainingFurniture
    });
    if (!committed) return;

    this.selectedElements = { wallIds: [], openingIds: [], roomIds: [], bindingIds: [], furnitureIds: [] };
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

  private getSelectedSummary(): string {
    const parts: string[] = [];
    if (this.selectedElements.wallIds.length > 0) {
      parts.push(`${this.selectedElements.wallIds.length} mur${this.selectedElements.wallIds.length > 1 ? 's' : ''}`);
    }
    if (this.selectedElements.openingIds.length > 0) {
      parts.push(`${this.selectedElements.openingIds.length} ouvrant${this.selectedElements.openingIds.length > 1 ? 's' : ''}`);
    }
    if (this.selectedElements.roomIds.length > 0) {
      parts.push(`${this.selectedElements.roomIds.length} pièce${this.selectedElements.roomIds.length > 1 ? 's' : ''}`);
    }
    if (this.selectedElements.bindingIds.length > 0) {
      if (this.selectedElements.bindingIds.length === 1) {
        const b = this.project.bindings.find(item => item.id === this.selectedElements.bindingIds[0]);
        parts.push(b ? (b.customName || b.entityId.split('.')[1] || b.entityId) : '1 entité');
      } else {
        parts.push(`${this.selectedElements.bindingIds.length} entités`);
      }
    }
    if (this.selectedElements.furnitureIds && this.selectedElements.furnitureIds.length > 0) {
      parts.push(`${this.selectedElements.furnitureIds.length} meuble${this.selectedElements.furnitureIds.length > 1 ? 's' : ''}`);
    }
    return parts.join(', ');
  }

  private handleKeyDown(e: KeyboardEvent) {
    // Ctrl/Cmd+S : sauvegarde du plan actif, y compris depuis un champ du studio (constat F2).
    if (hasPrimaryModifier(e) && !e.shiftKey && typeof e.key === 'string' && e.key.toLowerCase() === 's') {
      if (!isEventFromHost(e, this) && !shouldHandleShortcut(e, { host: this })) return;
      e.preventDefault();
      if (!this.isModalOpen()) void this.quickSave();
      return;
    }

    // Dialogues de persistance et écrans d'attente : seule Échap est traitée (fermeture).
    if (this.persistence.handleBlockingKey(e)) return;

    if (e.key === 'Escape') {
      if (this.isUpdateModalOpen) {
        this.isUpdateModalOpen = false;
        return;
      }
      if (this.isNewPlanModalOpen) {
        this.isNewPlanModalOpen = false;
        return;
      }
      if (this.isResetModalOpen) {
        this.isResetModalOpen = false;
        return;
      }
      if (this.isFullscreen) {
        this.toggleFullscreen();
      }
      if (this.activeDropdown) {
        this.activeDropdown = null;
      }
      this.clearSelection();
      return;
    }

    const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || (e.target as HTMLElement)?.isContentEditable) {
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
      e.preventDefault();
      this.openNewPlanModal();
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
      e.preventDefault();
      this.handleUndo();
    } else if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'y' || (e.key.toLowerCase() === 'z' && e.shiftKey))) {
      e.preventDefault();
      this.handleRedo();
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      const total = this.selectedElements.wallIds.length + 
                    this.selectedElements.openingIds.length + 
                    this.selectedElements.roomIds.length + 
                    this.selectedElements.bindingIds.length +
                    (this.selectedElements.furnitureIds?.length || 0);
      if (total > 0) {
        e.preventDefault();
        this.handleDeleteSelected();
      }
    } else if (e.key.toLowerCase() === 'r') {
      if (this.selectedElements.furnitureIds && this.selectedElements.furnitureIds.length > 0) {
        e.preventDefault();
        this.rotateSelectedFurniture();
      }
    } else if (e.key.toLowerCase() === 'v') {
      this.activeTool = 'select';
    }
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
      this.updateSidebarOffset();
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
      this.updateSidebarOffset();
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
    setTimeout(() => {
      (this.shadowRoot?.querySelector('home-architect-canvas') as any)?.fitToScreen();
    }, 80);
  }

  private openWizard() {
    this.activeDropdown = null;
    if (this.readOnly) {
      this.notifyReadOnly();
      return;
    }
    this.isWizardOpen = true;
  }

  private openImportModal() {
    this.activeDropdown = null;
    if (this.readOnly) {
      this.notifyReadOnly();
      return;
    }
    this.isImportModalOpen = true;
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
      this.isUpdateModalOpen || this.selectedRoomForEdit !== null || this.persistence.isBlocking();
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

    return html`
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
          <span class="brand-version" title="Version unique du composant">v${VERSION}</span>
        </div>

        ${this.updateInfo?.available && !this.readOnly ? html`
          <button class="btn-update-auto" @click=${() => this.openUpdateModal()} title="Nouvelle version ${this.updateInfo.latestVersion} disponible">
            <span>🚀</span>
            <span>Mise à jour dispo</span>
            <span class="update-version-tag">v${this.updateInfo.latestVersion}</span>
          </button>
        ` : null}

        <!-- 3 Menus Déroulants Principaux : Fichier, Plan, Pièce -->
        <div style="display: flex; align-items: center; gap: 8px;">
          <!-- 1. Menu Fichier (Ouvrir, Sauvegarder, Importer, Exporter) -->
          <div class="dropdown-menu-wrapper">
            <button class="btn-dropdown-trigger ${this.activeDropdown === 'file' ? 'active' : ''}" @click=${(e: Event) => this.toggleDropdown('file', e)}>
              <span>📁</span>
              <span>Fichier</span>
              <span class="chevron">▾</span>
            </button>
            ${this.activeDropdown === 'file' ? html`
              <div class="dropdown-menu-popup">
                <button class="dropdown-item" ?disabled=${this.readOnly} @click=${() => this.openNewPlanModal()}>
                  <span>📄</span>
                  <span>Nouveau plan...</span>
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
            <button class="btn-dropdown-trigger ${this.activeDropdown === 'plan' ? 'active' : ''}" @click=${(e: Event) => this.toggleDropdown('plan', e)}>
              <span>📐</span>
              <span>Plan</span>
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
                <button class="dropdown-item ${this.showDimensions ? 'active' : ''}" @click=${() => { this.showDimensions = !this.showDimensions; }}>
                  <span>📏</span>
                  <span>Cotes dynamiques</span>
                  ${this.showDimensions ? html`<span class="dropdown-item-check">✓</span>` : null}
                </button>
                <button class="dropdown-item ${this.showThermalHeatmap ? 'active' : ''}" @click=${() => { this.showThermalHeatmap = !this.showThermalHeatmap; }}>
                  <span>🌡️</span>
                  <span>Carte thermique</span>
                  ${this.showThermalHeatmap ? html`<span class="dropdown-item-check">✓</span>` : null}
                </button>
                <button class="dropdown-item ${this.showGhostLevel ? 'active' : ''}" @click=${() => { this.showGhostLevel = !this.showGhostLevel; }}>
                  <span>👁️</span>
                  <span>Filigrane niveau inf.</span>
                  ${this.showGhostLevel ? html`<span class="dropdown-item-check">✓</span>` : null}
                </button>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" @click=${() => { (this.shadowRoot?.querySelector('home-architect-canvas') as any)?.fitToScreen(); this.activeDropdown = null; }}>
                  <span>⛶</span>
                  <span>Ajuster à l'écran (Zoom auto)</span>
                </button>
                <button class="dropdown-item" @click=${() => { (this.shadowRoot?.querySelector('home-architect-canvas') as any)?.rotateQuarterTurn(); this.activeDropdown = null; }}>
                  <span>↺</span>
                  <span>Pivoter la vue de 90° à gauche</span>
                </button>
                <button class="dropdown-item ${this.isFullscreen ? 'active' : ''}" @click=${() => { this.toggleFullscreen(); this.activeDropdown = null; }}>
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
            <button class="btn-dropdown-trigger ${this.activeDropdown === 'level' ? 'active' : ''}" @click=${(e: Event) => this.toggleDropdown('level', e)}>
              <span>🏢</span>
              <span>Pièce : <strong>${getLevelLabel(this.project.category)}</strong></span>
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
              ↩️ Annuler
            </button>
            <button 
              class="btn-history" 
              @click=${this.handleRedo} 
              ?disabled=${this.readOnly || !ws.canRedo()}
              title="Rétablir l'action (Ctrl+Y / Cmd+Shift+Z)"
            >
              ↪️ Rétablir
            </button>
          </div>

          <!-- Épaisseur mur contextuelle -->
          ${this.activeTool === 'wall' ? html`
            <div class="control-group">
              <label>Épaisseur :</label>
              <select @change=${this.handleThicknessChange}>
                <option value="0.10">Cloison 10 cm</option>
                <option value="0.15">Mur 15 cm</option>
                <option value="0.20" selected>Porteur 20 cm</option>
                <option value="0.30">Extérieur 30 cm</option>
              </select>
            </div>
          ` : null}

          <!-- Largeur ouvrant contextuelle -->
          ${this.activeTool === 'door' || this.activeTool === 'window' || this.activeTool === 'french_window' ? html`
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
          ` : null}

          <!-- Hauteur sous plafond globale en mode 3D -->
          ${this.is3DMode ? html`
            <div class="control-group" title="Hauteur sous plafond par défaut (3D)">
              <label>Plafond 3D :</label>
              <select @change=${(e: any) => this.handleDefaultCeilingChange(parseFloat(e.target.value))}>
                <option value="2.10" ?selected=${(this.project.defaultCeilingHeight || 2.50) === 2.10}>2.10 m (Sous-sol)</option>
                <option value="2.30" ?selected=${(this.project.defaultCeilingHeight || 2.50) === 2.30}>2.30 m (Combles)</option>
                <option value="2.50" ?selected=${!this.project.defaultCeilingHeight || this.project.defaultCeilingHeight === 2.50}>2.50 m (Standard)</option>
                <option value="2.70" ?selected=${(this.project.defaultCeilingHeight || 2.50) === 2.70}>2.70 m (Élevé)</option>
                <option value="3.00" ?selected=${(this.project.defaultCeilingHeight || 2.50) === 3.00}>3.00 m (Haussmann)</option>
                <option value="3.50" ?selected=${(this.project.defaultCeilingHeight || 2.50) === 3.50}>3.50 m (Cathédrale)</option>
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
                .value=${this.project.background?.opacity || 0.4}
                @input=${this.handleOpacityChange}
                style="width: 70px;"
                title="Opacité du plan de fond"
              />
            </div>
          ` : null}

          <!-- Volet Entités HA -->
          <button 
            class="btn-drawer ${!this.isDrawerCollapsed ? 'active' : ''}" 
            @click=${() => this.isDrawerCollapsed = !this.isDrawerCollapsed}
            title="Afficher / Masquer le volet des entités"
          >
            ⚡ Entités HA (${this.project.bindings.length})
          </button>

          <div class="scale-indicator" title="Échelle : pixels par mètre">
            1 m = ${this.project.pixelsPerMeter} px
          </div>

          <!-- Bouton Plein Écran -->
          <button 
            class="btn-fullscreen ${this.isFullscreen ? 'active' : ''}" 
            @click=${() => this.toggleFullscreen()}
            title="${this.isFullscreen ? 'Sortir du plein écran (Échap)' : 'Passer en plein écran'}"
          >
            <span style="font-size: 1.05rem; line-height: 1;">${this.isFullscreen ? '🗗' : '⛶'}</span>
            <span>${this.isFullscreen ? 'Sortir du plein écran' : 'Plein écran'}</span>
          </button>

          <!-- Sauvegarde (indicateur des modifications non sauvegardées) -->
          <button
            class="btn-primary ${activeDirty ? 'is-dirty' : ''}"
            ?disabled=${this.readOnly || !ready || saving}
            @click=${this.openSaveModal}
            title=${activeDirty ? 'Modifications non sauvegardées (Ctrl+S / Cmd+S)' : 'Sauvegarder le plan (Ctrl+S / Cmd+S)'}
          >
            ${saving ? '⏳ Sauvegarde…' : html`💾 Sauvegarder${activeDirty ? html` <span class="dirty-dot">●</span>` : null}`}
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
            .readOnly=${this.readOnly}
            @undo=${this.handleUndo}
            @redo=${this.handleRedo}
            @tool-selected=${this.handleToolSelected}
            @door-config-changed=${this.handleDoorConfigChanged}
            @window-config-changed=${this.handleWindowConfigChanged}
            @wall-thickness-changed=${this.handleWallThicknessChanged}
            @open-wizard=${() => this.openWizard()}
            @open-import-modal=${() => this.openImportModal()}
            @trigger-upload-background=${() => this.openImportModal()}
          ></home-architect-toolbar>

          <home-architect-canvas
            .hass=${this.hass}
            .project=${this.project}
            .backgroundSrc=${this.persistence.background.src}
            .readOnly=${this.readOnly}
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
            @selection-changed=${(e: any) => {
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
            @request-delete-selected=${this.handleDeleteSelected}
            @toggle-3d=${(e: any) => this.is3DMode = e.detail.is3DMode}
            @opening-config-changed=${this.handleOpeningConfigChanged}
            @room-selected=${(e: any) => this.selectedRoomForEdit = e.detail.room}
            @project-changed=${this.handleProjectChanged}
            @request-calibration=${this.handleRequestCalibration}
            @request-rescale=${this.handleRequestRescale}
            @background-image-loaded=${(e: any) => void this.loadBackgroundImage(e.detail.dataUrl, '🖼️ Image de plan glissée-déposée !')}
          ></home-architect-canvas>

          <!-- Floating HUD de sélection multi-éléments repositionné en bas -->
          ${(() => {
            const hasSelection = (this.selectedElements.wallIds.length + 
               this.selectedElements.openingIds.length + 
               this.selectedElements.roomIds.length + 
               this.selectedElements.bindingIds.length + 
               (this.selectedElements.furnitureIds?.length || 0)) > 0;
            if (!hasSelection) return null;

            const selectedBinding = this.selectedElements.bindingIds.length > 0
              ? this.project.bindings.find(b => b.id === this.selectedElements.bindingIds[0])
              : null;

            return html`
              <div class="selection-hud">
                <div class="selection-hud-main">
                  <span class="selection-info">
                    <span>🎯</span>
                    <span>${this.getSelectedSummary()}</span>
                  </span>

                  ${this.selectedElements.wallIds.length > 0 ? html`
                    <div class="hud-options-group">
                      <span class="hud-label">Épaisseur :</span>
                      <button class="hud-opt-btn ${this.currentThickness === 0.10 ? 'active' : ''}" @click=${() => this.updateSelectedWallsThickness(0.10)} title="Cloison 10 cm">Fin 10cm</button>
                      <button class="hud-opt-btn ${this.currentThickness === 0.20 ? 'active' : ''}" @click=${() => this.updateSelectedWallsThickness(0.20)} title="Standard 20 cm">Moyen 20cm</button>
                      <button class="hud-opt-btn ${this.currentThickness === 0.30 ? 'active' : ''}" @click=${() => this.updateSelectedWallsThickness(0.30)} title="Porteur 30 cm">Gros 30cm</button>
                    </div>
                  ` : null}

                  ${this.selectedElements.openingIds.some(id => this.project.openings.find(op => op.id === id)?.type === 'door') ? html`
                    <div class="hud-options-group">
                      <span class="hud-label">Porte :</span>
                      <button class="hud-opt-btn ${!this.doorFlipSide && this.doorFlipDirection ? 'active' : ''}" @click=${() => this.updateSelectedDoorConfig(false, true)} title="Ouverture Droite Intérieure (Poussant Droit)">Droite Int.</button>
                      <button class="hud-opt-btn ${!this.doorFlipSide && !this.doorFlipDirection ? 'active' : ''}" @click=${() => this.updateSelectedDoorConfig(false, false)} title="Ouverture Gauche Intérieure (Poussant Gauche)">Gauche Int.</button>
                      <button class="hud-opt-btn ${this.doorFlipSide && !this.doorFlipDirection ? 'active' : ''}" @click=${() => this.updateSelectedDoorConfig(true, false)} title="Ouverture Gauche Extérieure (Tirant Gauche)">Gauche Ext.</button>
                      <button class="hud-opt-btn ${this.doorFlipSide && this.doorFlipDirection ? 'active' : ''}" @click=${() => this.updateSelectedDoorConfig(true, true)} title="Ouverture Droite Extérieure (Tirant Droit)">Droite Ext.</button>
                    </div>
                  ` : null}

                  ${this.selectedElements.openingIds.some(id => {
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

                  ${(this.selectedElements.furnitureIds?.length || 0) > 0 ? html`
                    <div class="hud-options-group">
                      <span class="hud-label">Meuble :</span>
                      <button class="hud-opt-btn active" @click=${this.rotateSelectedFurniture} title="Pivoter les meubles de 90° (Touche R)">🔄 Pivoter 90° (R)</button>
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

        <!-- Volet latéral des entités HA : Toujours visible et docké -->
        <home-architect-entity-drawer
          .hass=${this.hass}
          ?collapsed=${this.isDrawerCollapsed}
          @toggle-collapse=${() => this.isDrawerCollapsed = !this.isDrawerCollapsed}
        ></home-architect-entity-drawer>
      </div>

      <!-- Modal d'Import Automatisé -->
      ${this.isImportModalOpen ? html`
        <home-architect-import-modal
          .currentLevel=${this.activeLevel ?? DEFAULT_LEVEL}
          @import-confirmed=${this.handleImportConfirmed}
          @close=${() => this.isImportModalOpen = false}
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
          @save-room=${this.handleSaveRoom}
          @delete-room=${this.handleDeleteRoom}
          @close=${() => this.selectedRoomForEdit = null}
        ></home-architect-room-modal>
      ` : null}

      <!-- Modal Étalonnage Mesure de Mur -->
      ${this.isCalibrateModalOpen && this.calibrationData ? html`
        <home-architect-calibrate-modal
          .pixelDistance=${this.calibrationData.pixelDistance}
          .defaultMeters=${this.calibrationData.defaultMeters}
          @calibrate-confirmed=${this.handleCalibrateConfirmed}
          @close=${() => this.isCalibrateModalOpen = false}
        ></home-architect-calibrate-modal>
      ` : null}

      <!-- Modal Mettre à l'échelle (Recalcul de toutes les cotes) -->
      ${this.isRescaleModalOpen ? html`
        <home-architect-rescale-modal
          .measuredMeters=${this.rescaleMeasuredMeters}
          .wallCount=${this.project.walls.length}
          .roomCount=${this.project.rooms.length}
          .openingCount=${this.project.openings.length}
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

      <!-- Chargement bloquant, opération en cours, copies locales à restaurer, dialogue de choix -->
      ${this.persistence.renderOverlays()}
    `;
  }
}

defineElement('home-architect-panel', HomeArchitectPanel);

declare global {
  interface HTMLElementTagNameMap {
    'home-architect-panel': HomeArchitectPanel;
  }
}
