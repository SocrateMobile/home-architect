import { EntityBinding, ExportFrame, HomeArchitectProject, TapActionType } from './types';
import { SvgExporter } from './svg-exporter';
import { defaultTapAction, entityDomain } from './project-model';

export interface PictureElementsOptions {
  /** URL de l'image publiée (PublishInfo.url, avec ?v=<hash> pour invalider le cache). */
  imageUrl: string;
  /** Cadre du SVG publié ; à défaut, cadre figé du projet ou cadre calculé sur le contenu. */
  frame?: ExportFrame;
  /** Titre de la carte ; à défaut le nom du projet. */
  title?: string;
}

export interface CustomCardOptions {
  viewMode?: '2d' | '3d';
  height?: string;
  showHeader?: boolean;
}

/** Valeur sérialisable par toYaml. */
export type YamlValue = string | number | boolean | null | YamlValue[] | { [key: string]: YamlValue | undefined };

/** Configuration d'action Lovelace (tap_action / hold_action). */
interface ActionConfig {
  [key: string]: string;
  action: TapActionType;
}

/** Clé YAML laissée sans guillemets (identifiant simple) ; toute autre clé est citée. */
const PLAIN_KEY = /^[A-Za-z_][A-Za-z0-9_]*$/;

/** Domaines affichés sous forme de valeur (state-label) plutôt que d'icône. */
const LABEL_DOMAINS = new Set(['sensor', 'climate', 'input_number', 'number', 'counter']);

/**
 * Couleurs d'état modernes de HA (state-badge : --state-<domaine>-active-color, --state-inactive-color,
 * --state-icon-color), adaptées au fond sombre du plan. Les autres domaines (binary_sensor, cover…)
 * gardent les couleurs d'état de HA, qui tiennent compte de la device_class.
 */
const ICON_STYLE: Record<string, Record<string, string>> = {
  light: { '--state-light-active-color': '#facc15' },
  switch: { '--state-switch-active-color': '#38bdf8' },
};
const BASE_ICON_STYLE = {
  '--state-icon-color': '#cbd5e1',
  '--state-inactive-color': '#94a3b8',
};
const LABEL_STYLE = {
  background: 'rgba(15, 23, 42, 0.85)',
  border: '1px solid rgba(56, 189, 248, 0.5)',
  'border-radius': '8px',
  padding: '2px 8px',
  'font-size': '11px',
  'font-weight': '700',
  color: '#38bdf8',
};
const CLIMATE_LABEL_STYLE = { ...LABEL_STYLE, border: '1px solid rgba(245, 158, 11, 0.5)', color: '#f59e0b' };

/**
 * Chaîne YAML entre guillemets doubles, valide en YAML 1.1 (PyYAML) et 1.2 : échappe \ et ", les
 * caractères de contrôle, DEL et C1, les séparateurs de ligne Unicode, le BOM et les surrogates isolés.
 */
export function yamlQuote(value: string): string {
  let out = '"';
  const s = String(value ?? '');
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    const ch = s[i];
    if (code >= 0xd800 && code <= 0xdbff && i + 1 < s.length) {
      const low = s.charCodeAt(i + 1);
      if (low >= 0xdc00 && low <= 0xdfff) {
        out += ch + s[i + 1]; // paire de surrogates valide (emoji…)
        i++;
        continue;
      }
    }
    switch (ch) {
      case '\\': out += '\\\\'; continue;
      case '"': out += '\\"'; continue;
      case '\n': out += '\\n'; continue;
      case '\r': out += '\\r'; continue;
      case '\t': out += '\\t'; continue;
    }
    const needsEscape = code < 0x20
      || (code >= 0x7f && code <= 0x9f)
      || code === 0x2028 || code === 0x2029 || code === 0xfeff
      || (code >= 0xd800 && code <= 0xdfff)
      || code === 0xfffe || code === 0xffff;
    out += needsEscape ? `\\u${code.toString(16).padStart(4, '0')}` : ch;
  }
  return `${out}"`;
}

/** Ligne de commentaire YAML (une seule ligne, sans caractère de contrôle). */
function yamlComment(text: string): string {
  // eslint-disable-next-line no-control-regex -- suppression volontaire des caractères de contrôle
  return `# ${String(text ?? '').replace(/[\x00-\x1f\x7f-\x9f\u2028\u2029]+/g, ' ').trim()}`;
}

function yamlKey(key: string): string {
  return PLAIN_KEY.test(key) ? key : yamlQuote(key);
}

function yamlScalar(value: string | number | boolean | null): string {
  if (value === null) return 'null';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') return Number.isFinite(value) ? String(value) : '0';
  return yamlQuote(value);
}

function isMapping(value: YamlValue): value is { [key: string]: YamlValue | undefined } {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function emitYaml(value: YamlValue, indent: number): string[] {
  const pad = ' '.repeat(indent);
  if (Array.isArray(value)) {
    const lines: string[] = [];
    for (const item of value) {
      if (isMapping(item) || Array.isArray(item)) {
        const nested = emitYaml(item, indent + 2);
        if (nested.length === 0) {
          lines.push(`${pad}- ${Array.isArray(item) ? '[]' : '{}'}`);
          continue;
        }
        nested[0] = `${pad}- ${nested[0].slice(indent + 2)}`;
        lines.push(...nested);
      } else {
        lines.push(`${pad}- ${yamlScalar(item)}`);
      }
    }
    return lines;
  }
  if (isMapping(value)) {
    const lines: string[] = [];
    for (const [key, v] of Object.entries(value)) {
      if (v === undefined) continue;
      if (Array.isArray(v) || isMapping(v)) {
        const nested = emitYaml(v, indent + 2);
        if (nested.length === 0) {
          lines.push(`${pad}${yamlKey(key)}: ${Array.isArray(v) ? '[]' : '{}'}`);
        } else {
          lines.push(`${pad}${yamlKey(key)}:`, ...nested);
        }
      } else {
        lines.push(`${pad}${yamlKey(key)}: ${yamlScalar(v)}`);
      }
    }
    return lines;
  }
  return [`${pad}${yamlScalar(value)}`];
}

/** Sérialise une valeur en YAML (bloc), toutes les chaînes entre guillemets. */
export function toYaml(value: YamlValue): string {
  return `${emitYaml(value, 0).join('\n')}\n`;
}

/** Configuration d'action : l'action 'navigate' sans chemin retombe sur `fallback`. */
function actionConfig(action: TapActionType, binding: EntityBinding, fallback: TapActionType): ActionConfig {
  if (action === 'navigate') {
    return binding.navigationPath ? { action, navigation_path: binding.navigationPath } : { action: fallback };
  }
  return { action };
}

/** Élément picture-elements d'une entité placée sur le plan. */
function bindingElement(binding: EntityBinding, frame: ExportFrame): { [key: string]: YamlValue } {
  const { left, top } = SvgExporter.worldToPercentage(binding.position, frame);
  const domain = entityDomain(binding.entityId);
  const defaultTap = defaultTapAction(binding.entityId);
  const isLabel = LABEL_DOMAINS.has(domain);

  const element: { [key: string]: YamlValue } = {
    type: isLabel ? 'state-label' : 'state-icon',
    entity: binding.entityId,
  };
  // climate : température mesurée, formatée par HA avec l'unité de l'installation (°C ou °F).
  if (domain === 'climate') element.attribute = 'current_temperature';
  // Icône forcée seulement si l'utilisateur l'a choisie : sinon HA garde l'icône d'état / device_class.
  if (!isLabel && binding.mdiIcon) element.icon = binding.mdiIcon;
  // Infobulle : HA affiche le friendly_name courant ; seul un nom saisi par l'utilisateur est figé.
  if (binding.customName) element.title = binding.customName;
  element.tap_action = actionConfig(binding.tapAction ?? defaultTap, binding, defaultTap);
  element.hold_action = actionConfig(binding.holdAction ?? 'more-info', binding, 'more-info');
  element.style = {
    top: `${top}%`,
    left: `${left}%`,
    transform: 'translate(-50%, -50%)',
    ...(isLabel
      ? (domain === 'climate' ? CLIMATE_LABEL_STYLE : LABEL_STYLE)
      : { ...BASE_ICON_STYLE, ...ICON_STYLE[domain] }),
  };
  return element;
}

export class LovelaceGenerator {
  /** Objet de configuration de la carte native 'picture-elements' (positions en % du cadre d'export). */
  public static buildPictureElementsConfig(
    project: HomeArchitectProject,
    options: PictureElementsOptions
  ): { [key: string]: YamlValue } {
    const frame = SvgExporter.resolveExportFrame(project, options.frame);
    const elements = (project.bindings || [])
      .filter(b => b && b.position && typeof b.entityId === 'string' && b.entityId.includes('.'))
      .map(b => bindingElement(b, frame));
    return {
      type: 'picture-elements',
      title: options.title ?? project.name ?? '',
      image: options.imageUrl,
      // Toujours un tableau (jamais null) : picture-elements refuse une liste absente.
      elements,
    };
  }

  /**
   * YAML de la carte native 'picture-elements' : l'image est l'URL publiée du plan, les positions
   * sont calculées sur le même cadre que le SVG publié.
   */
  public static generatePictureElementsYaml(project: HomeArchitectProject, options: PictureElementsOptions): string {
    const header = [
      yamlComment(`Home Architect — carte picture-elements du plan « ${project.name || project.id} »`),
      yamlComment('Republiez le plan depuis le studio après chaque modification, puis recollez ce code.'),
    ];
    return `${header.join('\n')}\n${toYaml(this.buildPictureElementsConfig(project, options))}`;
  }

  /** YAML de la carte personnalisée 'home-architect-card' (lit le projet sauvegardé sur le serveur). */
  public static generateHomeArchitectCardYaml(project: HomeArchitectProject, options?: CustomCardOptions): string {
    const config: { [key: string]: YamlValue } = {
      type: 'custom:home-architect-card',
      project_id: project.id,
      view_mode: options?.viewMode ?? '2d',
      show_header: options?.showHeader ?? true,
      height: options?.height ?? '520px',
    };
    return `${yamlComment(`Home Architect — carte intégrée du plan « ${project.name || project.id} »`)}\n${toYaml(config)}`;
  }
}
