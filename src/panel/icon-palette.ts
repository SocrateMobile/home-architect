/**
 * Palette d'icônes proposée dans le HUD pour une entité sélectionnée, rangée par typologie (domaine
 * HA). Les libellés sont traduits (clés `panel.icons.<typologie>.<id>`, constat F110) ; l'emoji et
 * l'icône MDI enregistrés dans le plan ne dépendent pas de la langue.
 */
import { localize } from '../i18n';
import '../i18n/locales/panel';

export interface TypologyIcon {
  /** Identifiant stable du libellé (clé de traduction). */
  id: string;
  icon: string;
  mdi: string;
}

export interface TypologyGroup {
  /** Emoji de l'onglet. */
  tabIcon: string;
  icons: readonly TypologyIcon[];
}

export const TYPOLOGY_ICONS: Readonly<Record<string, TypologyGroup>> = {
  light: {
    tabIcon: '💡',
    icons: [
      { id: 'bulb', icon: '💡', mdi: 'mdi:lightbulb' },
      { id: 'living_lamp', icon: '🛋️', mdi: 'mdi:lamp' },
      { id: 'recessed_spot', icon: '🌟', mdi: 'mdi:ceiling-light' },
      { id: 'ceiling_light', icon: '🔆', mdi: 'mdi:ceiling-light-outline' },
      { id: 'outdoor_lantern', icon: '🏮', mdi: 'mdi:outdoor-lamp' },
      { id: 'candle', icon: '🕯️', mdi: 'mdi:candle' },
      { id: 'spotlight', icon: '🔦', mdi: 'mdi:spotlight-beam' },
      { id: 'led_strip', icon: '🪩', mdi: 'mdi:led-strip-variant' },
      { id: 'string_lights', icon: '✨', mdi: 'mdi:string-lights' },
      { id: 'wall_sconce', icon: '🛋', mdi: 'mdi:wall-sconce-flat' },
    ]
  },
  switch: {
    tabIcon: '🔌',
    icons: [
      { id: 'smart_plug', icon: '🔌', mdi: 'mdi:power-socket-fr' },
      { id: 'wall_switch', icon: '⚡', mdi: 'mdi:toggle-switch' },
      { id: 'tv', icon: '📺', mdi: 'mdi:television' },
      { id: 'appliance', icon: '☕', mdi: 'mdi:coffee-maker' },
      { id: 'computer', icon: '💻', mdi: 'mdi:laptop' },
      { id: 'speaker', icon: '🔊', mdi: 'mdi:speaker' },
      { id: 'printer', icon: '🖨️', mdi: 'mdi:printer' },
      { id: 'console', icon: '🎮', mdi: 'mdi:gamepad-variant' },
      { id: 'charger', icon: '🔋', mdi: 'mdi:battery-charging' },
      { id: 'fan', icon: '🪭', mdi: 'mdi:fan' },
    ]
  },
  binary_sensor: {
    tabIcon: '📡',
    icons: [
      { id: 'pir_motion', icon: '🚶', mdi: 'mdi:motion-sensor' },
      { id: 'quick_pass', icon: '🏃', mdi: 'mdi:walk' },
      { id: 'presence_radar', icon: '👁️', mdi: 'mdi:radar' },
      { id: 'door_sensor', icon: '🚪', mdi: 'mdi:door' },
      { id: 'window_sensor', icon: '🪟', mdi: 'mdi:window-closed' },
      { id: 'garage_door', icon: '🚗', mdi: 'mdi:garage' },
      { id: 'siren', icon: '🚨', mdi: 'mdi:alarm-light' },
      { id: 'doorbell', icon: '🔔', mdi: 'mdi:doorbell' },
      { id: 'pet', icon: '🐾', mdi: 'mdi:paw' },
      { id: 'water_leak', icon: '💧', mdi: 'mdi:water-alert' },
      { id: 'smoke', icon: '🔥', mdi: 'mdi:smoke-detector' },
      { id: 'mailbox', icon: '📬', mdi: 'mdi:mailbox' },
    ]
  },
  climate: {
    tabIcon: '🌡️',
    icons: [
      { id: 'thermostat', icon: '🌡️', mdi: 'mdi:thermostat' },
      { id: 'air_conditioner', icon: '❄️', mdi: 'mdi:air-conditioner' },
      { id: 'radiator', icon: '🔥', mdi: 'mdi:radiator' },
      { id: 'heat_pump', icon: '♨️', mdi: 'mdi:water-boiler' },
      { id: 'ventilation', icon: '💨', mdi: 'mdi:fan' },
    ]
  },
  sensor: {
    tabIcon: '📊',
    icons: [
      { id: 'temperature', icon: '🌡️', mdi: 'mdi:thermometer' },
      { id: 'humidity', icon: '💧', mdi: 'mdi:water-percent' },
      { id: 'illuminance', icon: '☀️', mdi: 'mdi:weather-sunny' },
      { id: 'air_quality', icon: '💨', mdi: 'mdi:air-filter' },
      { id: 'power', icon: '⚡', mdi: 'mdi:flash' },
      { id: 'battery', icon: '🔋', mdi: 'mdi:battery' },
      { id: 'noise', icon: '🔊', mdi: 'mdi:volume-high' },
      { id: 'pressure', icon: '⚖️', mdi: 'mdi:gauge' },
    ]
  },
  cover: {
    tabIcon: '🪟',
    icons: [
      { id: 'roller_shutter', icon: '🪟', mdi: 'mdi:window-shutter' },
      { id: 'venetian_blind', icon: '🚪', mdi: 'mdi:blinds' },
      { id: 'garage_door', icon: '🚗', mdi: 'mdi:garage' },
      { id: 'awning', icon: '⛺', mdi: 'mdi:awning' },
      { id: 'sliding_door', icon: '↕️', mdi: 'mdi:arrow-up-down' },
    ]
  },
  media_player: {
    tabIcon: '📺',
    icons: [
      { id: 'tv', icon: '📺', mdi: 'mdi:television' },
      { id: 'smart_speaker', icon: '📻', mdi: 'mdi:speaker' },
      { id: 'multiroom', icon: '🎵', mdi: 'mdi:music' },
      { id: 'av_receiver', icon: '🔊', mdi: 'mdi:speaker-wireless' },
      { id: 'projector', icon: '🎬', mdi: 'mdi:projector' },
      { id: 'console', icon: '🎮', mdi: 'mdi:gamepad-variant' },
    ]
  },
  camera: {
    tabIcon: '📷',
    icons: [
      { id: 'indoor', icon: '📷', mdi: 'mdi:camera' },
      { id: 'ptz_dome', icon: '📹', mdi: 'mdi:cctv' },
      { id: 'monitored_zone', icon: '👁️', mdi: 'mdi:eye' },
      { id: 'video_doorbell', icon: '🎥', mdi: 'mdi:video' },
    ]
  },
  fan: {
    tabIcon: '💨',
    icons: [
      { id: 'standing_fan', icon: '💨', mdi: 'mdi:fan' },
      { id: 'extraction', icon: '🌀', mdi: 'mdi:fan-chevron-up' },
      { id: 'ceiling_fan', icon: '🌪️', mdi: 'mdi:ceiling-fan' },
    ]
  },
  vacuum: {
    tabIcon: '🤖',
    icons: [
      { id: 'robot_vacuum', icon: '🤖', mdi: 'mdi:robot-vacuum' },
      { id: 'floor_washer', icon: '🧹', mdi: 'mdi:broom' },
    ]
  },
  lock: {
    tabIcon: '🔒',
    icons: [
      { id: 'smart_lock', icon: '🔒', mdi: 'mdi:lock' },
      { id: 'intrusion_alarm', icon: '🛡️', mdi: 'mdi:shield-home' },
      { id: 'electric_strike', icon: '🗝️', mdi: 'mdi:key' },
    ]
  }
};

/** Titre traduit d'une typologie (« Éclairage & Luminaires »). */
export function typologyTitle(typology: string): string {
  return localize(`panel.icons.${typology}.title`);
}

/** Libellé traduit de l'onglet d'une typologie (« Éclairage »), sans l'emoji. */
export function typologyTabLabel(typology: string): string {
  return localize(`panel.icons.${typology}.tab`);
}

/** Libellé traduit d'une icône de la palette. */
export function typologyIconLabel(typology: string, icon: TypologyIcon): string {
  return localize(`panel.icons.${typology}.${icon.id}`);
}
