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
        const b64 = btoa(unescape(encodeURIComponent(options.svgContent)));
        resolvedImage = `data:image/svg+xml;base64,${b64}`;
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
    yaml += `title: "${opts.title}"\n`;
    yaml += `image: "${opts.imagePath}"\n`;
    yaml += `elements:\n`;

    if (bindings.length === 0) {
      yaml += `  # Aucune entité liée pour le moment. Glissez-déposez des entités sur le plan !\n`;
      return yaml;
    }

    for (const binding of bindings) {
      const pos = binding.position || { x: 0, y: 0 };
      const { left, top } = SvgExporter.worldToPercentage(pos, bbox);
      const entityId = binding.entityId;
      const domain = entityId.split('.')[0];
      const customName = binding.customName || entityId.split('.')[1].replace(/_/g, ' ');

      if (domain === 'light') {
        yaml += `  # 💡 Lumière : ${customName}\n`;
        yaml += `  - type: state-icon\n`;
        yaml += `    entity: ${entityId}\n`;
        yaml += `    title: "${customName}"\n`;
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
        yaml += `  # 📡 ${isRadar ? 'Radar de Présence' : 'Capteur'} : ${customName}\n`;
        yaml += `  - type: state-icon\n`;
        yaml += `    entity: ${entityId}\n`;
        yaml += `    title: "${customName}"\n`;
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
        yaml += `  # ${isTemp ? '🌡️ Température' : '📊 Capteur'} : ${customName}\n`;
        yaml += `  - type: state-label\n`;
        yaml += `    entity: ${entityId}\n`;
        yaml += `    title: "${customName}"\n`;
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
        yaml += `  # ❄️ Climatisation / Thermostat : ${customName}\n`;
        yaml += `  - type: state-label\n`;
        yaml += `    entity: ${entityId}\n`;
        yaml += `    attribute: current_temperature\n`;
        yaml += `    suffix: "°C"\n`;
        yaml += `    title: "${customName}"\n`;
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
        yaml += `  # 🔌 Interrupteur / Prise : ${customName}\n`;
        yaml += `  - type: state-icon\n`;
        yaml += `    entity: ${entityId}\n`;
        yaml += `    title: "${customName}"\n`;
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
        yaml += `  # ⚡ Entité : ${customName}\n`;
        yaml += `  - type: state-icon\n`;
        yaml += `    entity: ${entityId}\n`;
        yaml += `    title: "${customName}"\n`;
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
    yaml += `project_id: "${project.id || 'rdc'}"\n`;
    yaml += `title: "${opts.title}"\n`;
    yaml += `view_mode: ${opts.viewMode || '2d'} # '2d' ou '3d'\n`;
    yaml += `show_header: true\n`;
    yaml += `height: "${opts.height}"\n`;

    return yaml;
  }
}
