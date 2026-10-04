import { HomeArchitectProject } from './types';
import { SvgExporter } from './svg-exporter';

export interface PictureElementsOptions {
  imagePath?: string;
  title?: string;
  embedDataUri?: boolean;
  svgContent?: string;
}

export interface CustomCardOptions {
  viewMode?: '2d' | '3d';
  title?: string;
  height?: string;
}

const EMOJI_TO_MDI: Record<string, string> = {
  '💡': 'mdi:lightbulb',
  '🛋️': 'mdi:lamp',
  '🛋': 'mdi:wall-sconce-flat',
  '🌟': 'mdi:ceiling-light',
  '🔆': 'mdi:ceiling-light-outline',
  '🏮': 'mdi:outdoor-lamp',
  '🕯️': 'mdi:candle',
  '🔦': 'mdi:spotlight-beam',
  '🪩': 'mdi:led-strip-variant',
  '✨': 'mdi:string-lights',
  '🔌': 'mdi:power-socket-fr',
  '⚡': 'mdi:toggle-switch',
  '📺': 'mdi:television',
  '☕': 'mdi:coffee-maker',
  '💻': 'mdi:laptop',
  '🔊': 'mdi:speaker',
  '🖨️': 'mdi:printer',
  '🎮': 'mdi:gamepad-variant',
  '🔋': 'mdi:battery-charging',
  '🪭': 'mdi:fan',
  '🚶': 'mdi:motion-sensor',
  '🏃': 'mdi:walk',
  '👁️': 'mdi:radar',
  '🚪': 'mdi:door',
  '🪟': 'mdi:window-closed',
  '🚗': 'mdi:garage',
  '🚨': 'mdi:alarm-light',
  '🔔': 'mdi:doorbell',
  '🐾': 'mdi:paw',
  '💧': 'mdi:water-alert',
  '🔥': 'mdi:smoke-detector',
  '📬': 'mdi:mailbox',
  '🌡️': 'mdi:thermometer',
  '☀️': 'mdi:weather-sunny',
  '💨': 'mdi:air-filter',
  '❄️': 'mdi:air-conditioner',
  '♨️': 'mdi:water-boiler',
  '⛺': 'mdi:awning',
  '↕️': 'mdi:arrow-up-down',
  '📻': 'mdi:speaker',
  '🎵': 'mdi:music',
  '🎬': 'mdi:projector',
  '📷': 'mdi:camera',
  '📹': 'mdi:cctv',
  '🎥': 'mdi:video',
  '🌀': 'mdi:fan-chevron-up',
  '🌪️': 'mdi:ceiling-fan',
  '🤖': 'mdi:robot-vacuum',
  '🧹': 'mdi:broom',
  '🔒': 'mdi:lock',
  '🛡️': 'mdi:shield-home',
  '🗝️': 'mdi:key'
};

function resolveMdiIcon(binding: any, defaultMdi?: string): string | undefined {
  if (binding.mdiIcon) return binding.mdiIcon;
  if (binding.icon && EMOJI_TO_MDI[binding.icon]) return EMOJI_TO_MDI[binding.icon];
  if (binding.icon && binding.icon.startsWith('mdi:')) return binding.icon;
  return defaultMdi;
}

function yamlString(val: string): string {
  return JSON.stringify(val ?? '');
}

function yamlComment(val: string): string {
  return (val ?? '').replace(/[\r\n]+/g, ' ').replace(/[#]/g, '');
}

export class LovelaceGenerator {
  /**
   * Génère la configuration YAML complète de la carte native 'picture-elements' de Home Assistant
   */
  public static generatePictureElementsYaml(
    project: HomeArchitectProject,
    options?: PictureElementsOptions
  ): string {
    let resolvedImage = options?.imagePath || `/local/plan_${project.id || 'rdc'}.svg`;
    if (options?.embedDataUri && options?.svgContent) {
      try {
        const utf8Bytes = new TextEncoder().encode(options.svgContent);
        let binary = '';
        for (let i = 0; i < utf8Bytes.length; i++) {
          binary += String.fromCharCode(utf8Bytes[i]);
        }
        resolvedImage = `data:image/svg+xml;base64,${btoa(binary)}`;
      } catch (e) {
        resolvedImage = options.imagePath || `/local/plan_${project.id || 'rdc'}.svg`;
      }
    }

    const opts = {
      title: project.name || 'Plan Interactif',
      ...options,
      imagePath: resolvedImage
    };

    const bbox = SvgExporter.calculateBoundingBox(project);
    const bindings = project.bindings || [];

    let yaml = `# ========================================================\n`;
    yaml += `# CARTE LOVELACE PICTURE-ELEMENTS (NATIVE HOME ASSISTANT)\n`;
    yaml += `# Générée automatiquement par DomoLink Plan / Home Architect\n`;
    yaml += `# ========================================================\n`;
    yaml += `type: picture-elements\n`;
    yaml += `title: ${yamlString(opts.title)}\n`;
    yaml += `image: ${yamlString(opts.imagePath)}\n`;
    yaml += `elements:\n`;

    if (bindings.length === 0) {
      yaml += `  # Aucune entité liée pour le moment. Glissez-déposez des entités sur le plan !\n`;
      return yaml;
    }

    for (const binding of bindings) {
      const pos = binding.position || { x: 0, y: 0 };
      const { left, top } = SvgExporter.worldToPercentage(pos, bbox);
      const entityId = binding.entityId || 'sensor.unknown';
      const parts = entityId.split('.');
      const domain = parts[0] || 'sensor';
      const defaultName = (parts[1] || 'entity').replace(/_/g, ' ');
      const customName = binding.customName || defaultName;
      const safeComment = yamlComment(customName);
      const mdi = resolveMdiIcon(binding);

      if (domain === 'light') {
        yaml += `  # 💡 Lumière : ${safeComment}\n`;
        yaml += `  - type: state-icon\n`;
        yaml += `    entity: ${entityId}\n`;
        if (mdi) yaml += `    icon: ${mdi}\n`;
        yaml += `    title: ${yamlString(customName)}\n`;
        yaml += `    tap_action:\n`;
        yaml += `      action: toggle\n`;
        yaml += `    hold_action:\n`;
        yaml += `      action: more-info\n`;
        yaml += `    style:\n`;
        yaml += `      top: ${top}%\n`;
        yaml += `      left: ${left}%\n`;
        yaml += `      transform: translate(-50%, -50%)\n`;
        yaml += `      --paper-item-icon-active-color: "#facc15"\n`;
        yaml += `      --paper-item-icon-color: "#94a3b8"\n\n`;
      } 
      else if (domain === 'binary_sensor') {
        const isRadar = entityId.includes('presence') || entityId.includes('occupancy') || entityId.includes('radar') || entityId.includes('motion') || entityId.includes('mouvement');
        yaml += `  # 📡 ${isRadar ? 'Radar de Présence' : 'Capteur'} : ${safeComment}\n`;
        yaml += `  - type: state-icon\n`;
        yaml += `    entity: ${entityId}\n`;
        if (mdi) yaml += `    icon: ${mdi}\n`;
        yaml += `    title: ${yamlString(customName)}\n`;
        yaml += `    tap_action:\n`;
        yaml += `      action: more-info\n`;
        yaml += `    style:\n`;
        yaml += `      top: ${top}%\n`;
        yaml += `      left: ${left}%\n`;
        yaml += `      transform: translate(-50%, -50%)\n`;
        yaml += `      --paper-item-icon-active-color: "#ef4444"\n`;
        yaml += `      --paper-item-icon-color: "#10b981"\n\n`;
      } 
      else if (domain === 'sensor') {
        const isTemp = entityId.includes('temp') || entityId.includes('temperature');
        yaml += `  # ${isTemp ? '🌡️ Température' : '📊 Capteur'} : ${safeComment}\n`;
        yaml += `  - type: state-label\n`;
        yaml += `    entity: ${entityId}\n`;
        yaml += `    title: ${yamlString(customName)}\n`;
        yaml += `    tap_action:\n`;
        yaml += `      action: more-info\n`;
        yaml += `    style:\n`;
        yaml += `      top: ${top}%\n`;
        yaml += `      left: ${left}%\n`;
        yaml += `      transform: translate(-50%, -50%)\n`;
        yaml += `      background: "rgba(15, 23, 42, 0.85)"\n`;
        yaml += `      border: "1px solid rgba(56, 189, 248, 0.5)"\n`;
        yaml += `      border-radius: "8px"\n`;
        yaml += `      padding: "2px 8px"\n`;
        yaml += `      font-size: "11px"\n`;
        yaml += `      font-weight: "700"\n`;
        yaml += `      color: "#38bdf8"\n`;
        yaml += `      backdrop-filter: "blur(6px)"\n\n`;
      } 
      else if (domain === 'climate') {
        yaml += `  # ❄️ Climatisation / Thermostat : ${safeComment}\n`;
        yaml += `  - type: state-label\n`;
        yaml += `    entity: ${entityId}\n`;
        yaml += `    attribute: current_temperature\n`;
        yaml += `    suffix: "°C"\n`;
        yaml += `    title: ${yamlString(customName)}\n`;
        yaml += `    tap_action:\n`;
        yaml += `      action: more-info\n`;
        yaml += `    style:\n`;
        yaml += `      top: ${top}%\n`;
        yaml += `      left: ${left}%\n`;
        yaml += `      transform: translate(-50%, -50%)\n`;
        yaml += `      background: "rgba(15, 23, 42, 0.85)"\n`;
        yaml += `      border: "1px solid rgba(245, 158, 11, 0.5)"\n`;
        yaml += `      border-radius: "8px"\n`;
        yaml += `      padding: "2px 8px"\n`;
        yaml += `      font-size: "11px"\n`;
        yaml += `      font-weight: "700"\n`;
        yaml += `      color: "#f59e0b"\n`;
        yaml += `      backdrop-filter: "blur(6px)"\n\n`;
      } 
      else if (domain === 'switch') {
        yaml += `  # 🔌 Interrupteur / Prise : ${safeComment}\n`;
        yaml += `  - type: state-icon\n`;
        yaml += `    entity: ${entityId}\n`;
        if (mdi) yaml += `    icon: ${mdi}\n`;
        yaml += `    title: ${yamlString(customName)}\n`;
        yaml += `    tap_action:\n`;
        yaml += `      action: toggle\n`;
        yaml += `    hold_action:\n`;
        yaml += `      action: more-info\n`;
        yaml += `    style:\n`;
        yaml += `      top: ${top}%\n`;
        yaml += `      left: ${left}%\n`;
        yaml += `      transform: translate(-50%, -50%)\n`;
        yaml += `      --paper-item-icon-active-color: "#38bdf8"\n`;
        yaml += `      --paper-item-icon-color: "#64748b"\n\n`;
      } 
      else {
        yaml += `  # ⚡ Entité : ${safeComment}\n`;
        yaml += `  - type: state-icon\n`;
        yaml += `    entity: ${entityId}\n`;
        if (mdi) yaml += `    icon: ${mdi}\n`;
        yaml += `    title: ${yamlString(customName)}\n`;
        yaml += `    tap_action:\n`;
        yaml += `      action: more-info\n`;
        yaml += `    style:\n`;
        yaml += `      top: ${top}%\n`;
        yaml += `      left: ${left}%\n`;
        yaml += `      transform: translate(-50%, -50%)\n\n`;
      }
    }

    return yaml;
  }

  /**
   * Génère la configuration YAML pour la carte Lovelace personnalisée intégrée 'home-architect-card'
   */
  public static generateHomeArchitectCardYaml(
    project: HomeArchitectProject,
    options?: CustomCardOptions
  ): string {
    const opts = {
      viewMode: '2d',
      title: project.name || 'Plan de Maison',
      height: '520px',
      ...options
    };

    let yaml = `# ========================================================\n`;
    yaml += `# CARTE LOVELACE PERSONNALISÉE (HOME ARCHITECT CARD)\n`;
    yaml += `# Rendu vectoriel direct 2D / 3D, états et clics en direct\n`;
    yaml += `# ========================================================\n`;
    yaml += `type: custom:home-architect-card\n`;
    yaml += `project_id: ${yamlString(project.id || 'rdc')}\n`;
    yaml += `title: ${yamlString(opts.title)}\n`;
    yaml += `view_mode: ${opts.viewMode || '2d'} # '2d' ou '3d'\n`;
    yaml += `show_header: true\n`;
    yaml += `height: ${yamlString(opts.height)}\n`;

    return yaml;
  }
}
