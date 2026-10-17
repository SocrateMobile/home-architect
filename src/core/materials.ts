import { FloorTexture, FurnitureMaterial, WallTexture } from './types';
import { getLanguage } from '../i18n';

export interface MaterialPreset<T extends string> {
  id: T;
  labelFr: string;
  labelEn: string;
  icon: string;
  /** Aperçu CSS (background) pour les pastilles de sélection dans les modales. */
  previewCss: string;
  /** Couleur de base par défaut si l'élément n'a pas de couleur personnalisée. */
  defaultColor: string;
  /** Rugosité PBR 3D [0..1]. */
  roughness: number;
  /** Métallicité PBR 3D [0..1]. */
  metalness: number;
  /** Opacité PBR 3D [0..1] (ex. verre = 0.45). */
  opacity?: number;
}

export const FLOOR_MATERIAL_CATALOG: readonly MaterialPreset<FloorTexture>[] = [
  {
    id: 'none',
    labelFr: 'Couleur unie',
    labelEn: 'Solid color',
    icon: '🎨',
    previewCss: 'linear-gradient(135deg, rgba(56,189,248,0.35), rgba(56,189,248,0.15))',
    defaultColor: '#38bdf8',
    roughness: 0.75,
    metalness: 0.05,
  },
  {
    id: 'parquet_oak',
    labelFr: 'Parquet Chêne',
    labelEn: 'Oak Parquet',
    icon: '🪵',
    previewCss: 'repeating-linear-gradient(90deg, #b68656 0px, #b68656 10px, #9d6f42 10px, #9d6f42 12px)',
    defaultColor: '#b68656',
    roughness: 0.55,
    metalness: 0.05,
  },
  {
    id: 'parquet_herringbone',
    labelFr: 'Point de Hongrie',
    labelEn: 'Herringbone Wood',
    icon: '✨',
    previewCss: 'repeating-linear-gradient(45deg, #a47449 0px, #a47449 7px, #8b5e34 7px, #8b5e34 14px)',
    defaultColor: '#a47449',
    roughness: 0.5,
    metalness: 0.08,
  },
  {
    id: 'tiles_light',
    labelFr: 'Carrelage Clair',
    labelEn: 'Light Tiles',
    icon: '⬜',
    previewCss: 'linear-gradient(90deg, #cbd5e1 1px, transparent 1px), linear-gradient(180deg, #cbd5e1 1px, #f1f5f9 1px)',
    defaultColor: '#e2e8f0',
    roughness: 0.3,
    metalness: 0.1,
  },
  {
    id: 'tiles_slate',
    labelFr: 'Carrelage Ardoise',
    labelEn: 'Slate Tiles',
    icon: '⬛',
    previewCss: 'linear-gradient(90deg, #475569 1px, transparent 1px), linear-gradient(180deg, #475569 1px, #1e293b 1px)',
    defaultColor: '#334155',
    roughness: 0.4,
    metalness: 0.12,
  },
  {
    id: 'terracotta',
    labelFr: 'Terre Cuite / Tomettes',
    labelEn: 'Terracotta Tiles',
    icon: '🧱',
    previewCss: 'repeating-linear-gradient(45deg, #c2593f 0px, #c2593f 8px, #a3442d 8px, #a3442d 10px)',
    defaultColor: '#c2593f',
    roughness: 0.7,
    metalness: 0.04,
  },
  {
    id: 'marble',
    labelFr: 'Marbre Veinage',
    labelEn: 'Veined Marble',
    icon: '💎',
    previewCss: 'linear-gradient(125deg, #f8fafc 0%, #cbd5e1 45%, #f8fafc 55%, #94a3b8 100%)',
    defaultColor: '#f1f5f9',
    roughness: 0.18,
    metalness: 0.15,
  },
  {
    id: 'concrete',
    labelFr: 'Béton Ciré',
    labelEn: 'Polished Concrete',
    icon: '🪨',
    previewCss: 'radial-gradient(circle at 30% 30%, #94a3b8, #64748b)',
    defaultColor: '#78869b',
    roughness: 0.65,
    metalness: 0.08,
  },
  {
    id: 'carpet',
    labelFr: 'Moquette / Tapis',
    labelEn: 'Soft Carpet',
    icon: '🧶',
    previewCss: 'radial-gradient(#475569 1px, #64748b 1px)',
    defaultColor: '#64748b',
    roughness: 0.92,
    metalness: 0.0,
  },
  {
    id: 'grass',
    labelFr: 'Pelouse / Jardin',
    labelEn: 'Lawn / Garden',
    icon: '🌱',
    previewCss: 'repeating-linear-gradient(60deg, #16a34a 0px, #15803d 6px, #22c55e 12px)',
    defaultColor: '#22c55e',
    roughness: 0.9,
    metalness: 0.0,
  },
  {
    id: 'decking',
    labelFr: 'Terrasse Bois',
    labelEn: 'Wood Decking',
    icon: '🏖️',
    previewCss: 'repeating-linear-gradient(0deg, #8c5832 0px, #8c5832 6px, #59351c 6px, #59351c 8px)',
    defaultColor: '#8c5832',
    roughness: 0.68,
    metalness: 0.04,
  },
];

export const WALL_MATERIAL_CATALOG: readonly MaterialPreset<WallTexture>[] = [
  {
    id: 'paint',
    labelFr: 'Peinture Mate',
    labelEn: 'Matte Paint',
    icon: '🖌️',
    previewCss: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)',
    defaultColor: '#cbd5e1',
    roughness: 0.72,
    metalness: 0.04,
  },
  {
    id: 'brick',
    labelFr: 'Brique Apparente',
    labelEn: 'Exposed Brick',
    icon: '🧱',
    previewCss: 'repeating-linear-gradient(0deg, #b4533c 0px, #b4533c 6px, #cbd5e1 6px, #cbd5e1 8px)',
    defaultColor: '#b4533c',
    roughness: 0.85,
    metalness: 0.03,
  },
  {
    id: 'stone',
    labelFr: 'Pierre de Taille',
    labelEn: 'Natural Stone',
    icon: '🪨',
    previewCss: 'linear-gradient(135deg, #a8a29e 0%, #78716c 50%, #d6d3d1 100%)',
    defaultColor: '#a8a29e',
    roughness: 0.82,
    metalness: 0.05,
  },
  {
    id: 'wood_cladding',
    labelFr: 'Bardage Bois',
    labelEn: 'Wood Cladding',
    icon: '🪵',
    previewCss: 'repeating-linear-gradient(90deg, #9c6b3f 0px, #9c6b3f 6px, #704926 6px, #704926 8px)',
    defaultColor: '#9c6b3f',
    roughness: 0.62,
    metalness: 0.05,
  },
  {
    id: 'concrete',
    labelFr: 'Béton Brut',
    labelEn: 'Raw Concrete',
    icon: '🏢',
    previewCss: 'linear-gradient(135deg, #64748b, #475569)',
    defaultColor: '#64748b',
    roughness: 0.78,
    metalness: 0.06,
  },
  {
    id: 'plaster',
    labelFr: 'Enduit Crépis',
    labelEn: 'Textured Plaster',
    icon: '🏠',
    previewCss: 'linear-gradient(135deg, #fef3c7, #fde68a)',
    defaultColor: '#f5ebe0',
    roughness: 0.88,
    metalness: 0.02,
  },
];

export const FURNITURE_MATERIAL_CATALOG: readonly MaterialPreset<FurnitureMaterial>[] = [
  {
    id: 'default',
    labelFr: 'Standard',
    labelEn: 'Standard',
    icon: '✨',
    previewCss: 'linear-gradient(135deg, #94a3b8, #64748b)',
    defaultColor: '#94a3b8',
    roughness: 0.6,
    metalness: 0.1,
  },
  {
    id: 'oak',
    labelFr: 'Chêne Clair',
    labelEn: 'Light Oak',
    icon: '🪵',
    previewCss: 'repeating-linear-gradient(90deg, #c29565 0px, #b08050 8px)',
    defaultColor: '#c29565',
    roughness: 0.52,
    metalness: 0.05,
  },
  {
    id: 'walnut',
    labelFr: 'Noyer Foncé',
    labelEn: 'Dark Walnut',
    icon: '🌰',
    previewCss: 'repeating-linear-gradient(90deg, #5e3c23 0px, #4a2d18 8px)',
    defaultColor: '#5e3c23',
    roughness: 0.45,
    metalness: 0.08,
  },
  {
    id: 'fabric',
    labelFr: 'Tissu Chiné',
    labelEn: 'Woven Fabric',
    icon: '🛋️',
    previewCss: 'radial-gradient(#475569 1px, #64748b 2px)',
    defaultColor: '#64748b',
    roughness: 0.9,
    metalness: 0.0,
  },
  {
    id: 'leather',
    labelFr: 'Cuir Souple',
    labelEn: 'Soft Leather',
    icon: '👜',
    previewCss: 'linear-gradient(135deg, #7c3f23, #4a2210)',
    defaultColor: '#7c3f23',
    roughness: 0.38,
    metalness: 0.12,
  },
  {
    id: 'metal',
    labelFr: 'Métal Brossé',
    labelEn: 'Brushed Metal',
    icon: '🔩',
    previewCss: 'linear-gradient(135deg, #e2e8f0 0%, #64748b 50%, #cbd5e1 100%)',
    defaultColor: '#94a3b8',
    roughness: 0.25,
    metalness: 0.82,
  },
  {
    id: 'glass',
    labelFr: 'Verre Fumé',
    labelEn: 'Tinted Glass',
    icon: '🧊',
    previewCss: 'linear-gradient(135deg, rgba(125,211,252,0.65), rgba(56,189,248,0.25))',
    defaultColor: '#7dd3fc',
    roughness: 0.1,
    metalness: 0.2,
    opacity: 0.55,
  },
  {
    id: 'ceramic',
    labelFr: 'Céramique Émaillée',
    labelEn: 'Glazed Ceramic',
    icon: '🛁',
    previewCss: 'linear-gradient(135deg, #ffffff, #e2e8f0)',
    defaultColor: '#f8fafc',
    roughness: 0.15,
    metalness: 0.1,
  },
];

export function materialLabel<T extends string>(preset: MaterialPreset<T>): string {
  return getLanguage() === 'en' ? preset.labelEn : preset.labelFr;
}

export function getFloorPreset(texture?: FloorTexture): MaterialPreset<FloorTexture> {
  return FLOOR_MATERIAL_CATALOG.find(p => p.id === texture) ?? FLOOR_MATERIAL_CATALOG[0];
}

export function getWallPreset(texture?: WallTexture): MaterialPreset<WallTexture> {
  return WALL_MATERIAL_CATALOG.find(p => p.id === texture) ?? WALL_MATERIAL_CATALOG[0];
}

export function getFurniturePreset(material?: FurnitureMaterial): MaterialPreset<FurnitureMaterial> {
  return FURNITURE_MATERIAL_CATALOG.find(p => p.id === material) ?? FURNITURE_MATERIAL_CATALOG[0];
}

/**
 * Définit les `<pattern>` SVG vectoriels pour le rendu 2D du canevas (sols de pièces et murs).
 * Les motifs s'adaptent aux pixels du plan et se superposent proprement à la couleur choisie.
 */
export { renderSvgMaterialPatterns2D } from '../canvas/material-patterns';


