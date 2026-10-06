import { Color, DoubleSide, Material, MeshLambertMaterial, SRGBColorSpace } from 'three';
import { Rgba, mixRgb, parseCssColor, rgba } from './colors';
import { SurfaceRole } from './scene-builder';

/**
 * Palette et matériaux de la vue 3D. Les couleurs du décor (fond, murs, cadres, vitrages, accent de
 * sélection) viennent des jetons --arch-* du canevas, eux-mêmes dérivés du thème Home Assistant
 * (constat F56) ; les matières des meubles sont fixes, lisibles dans les deux palettes.
 * Matériaux Lambert (éclairage par fragment, peu coûteux pour les tablettes murales) ; les murs et les
 * meubles portent leurs couleurs par sommet : un seul matériau partagé, un appel de dessin par objet.
 */

export interface Palette3D {
  background: Rgba;
  ground: Rgba;
  grid: Rgba;
  /** Sol d'une pièce sans couleur propre. */
  floor: Rgba;
  accent: Rgba;
  warning: Rgba;
  roles: Record<SurfaceRole, Rgba>;
}

const FURNITURE_ROLES = {
  body: rgba(139, 155, 180),
  accent: rgba(92, 107, 132),
  soft: rgba(241, 245, 249),
  wood: rgba(176, 137, 104),
  metal: rgba(156, 163, 175),
  ceramic: rgba(248, 250, 252),
  water: rgba(56, 189, 248),
  heat: rgba(239, 68, 68),
  dark: rgba(31, 41, 55),
  screen: rgba(15, 23, 42),
  glass: rgba(186, 230, 253, 0.35)
} as const;

const DEFAULTS: Record<'light' | 'dark', Omit<Palette3D, 'ground' | 'grid' | 'roles'> & { wall: Rgba; wallTop: Rgba; frame: Rgba; door: Rgba; glass: Rgba }> = {
  dark: {
    background: rgba(15, 23, 42),
    floor: rgba(71, 85, 105),
    accent: rgba(56, 189, 248),
    warning: rgba(251, 191, 36),
    wall: rgba(241, 245, 249),
    wallTop: rgba(51, 65, 85),
    frame: rgba(148, 163, 184),
    door: rgba(120, 83, 51),
    glass: rgba(125, 211, 252, 0.45)
  },
  light: {
    background: rgba(248, 250, 252),
    floor: rgba(226, 232, 240),
    accent: rgba(2, 132, 199),
    warning: rgba(180, 83, 9),
    wall: rgba(241, 245, 249),
    wallTop: rgba(100, 116, 139),
    frame: rgba(71, 85, 105),
    door: rgba(146, 101, 63),
    glass: rgba(56, 189, 248, 0.4)
  }
};

/**
 * Palette lue sur l'élément (variables CSS héritées du canevas) ; chaque jeton illisible (var()
 * non résolue, color-mix()…) retombe sur la valeur de la palette claire ou sombre.
 */
export function readPalette(host: Element, scheme: 'light' | 'dark'): Palette3D {
  const style = getComputedStyle(host);
  const base = DEFAULTS[scheme];
  const token = (name: string, fallback: Rgba): Rgba => parseCssColor(style.getPropertyValue(name)) ?? fallback;
  const opaque = (c: Rgba): Rgba => ({ ...c, a: 1 });

  const background = opaque(token('--arch-bg', base.background));
  const contrast = scheme === 'dark' ? rgba(255, 255, 255) : rgba(15, 23, 42);
  const gridToken = token('--arch-grid-major', { ...contrast, a: 0.14 });
  const door = token('--arch-door-3d', base.door);
  return {
    background,
    ground: mixRgb(background, contrast, 0.05),
    grid: mixRgb(background, gridToken, Math.max(0.12, gridToken.a)),
    floor: base.floor,
    accent: opaque(token('--arch-accent', base.accent)),
    warning: opaque(token('--arch-warning', base.warning)),
    roles: {
      ...FURNITURE_ROLES,
      wall: opaque(token('--arch-wall-cap', base.wall)),
      'wall-top': opaque(token('--arch-wall-fill', base.wallTop)),
      frame: opaque(token('--arch-frame', base.frame)),
      door: opaque(door),
      glass: token('--arch-glass-3d', base.glass)
    }
  };
}

/** Couleur three (espace de travail linéaire) d'une couleur sRGB. */
export function toColor(c: Rgba, target: Color = new Color()): Color {
  return target.setRGB(c.r / 255, c.g / 255, c.b / 255, SRGBColorSpace);
}

/** Matériaux partagés par toute la scène (jamais libérés avec les objets, seulement par dispose()). */
export class MaterialSet {
  /** Murs, cadres, battants et meubles : couleurs par sommet. */
  readonly surface: MeshLambertMaterial;
  /** Élément sélectionné : mêmes couleurs, rehaussées de la couleur d'accent. */
  readonly selected: MeshLambertMaterial;
  /** Ouverture liée à une entité indisponible ou introuvable. */
  readonly warning: MeshLambertMaterial;
  readonly glass: MeshLambertMaterial;
  readonly ghost: MeshLambertMaterial;
  readonly ground: MeshLambertMaterial;

  constructor(readonly palette: Palette3D) {
    this.surface = new MeshLambertMaterial({ vertexColors: true });
    this.selected = new MeshLambertMaterial({ vertexColors: true, emissive: toColor(palette.accent), emissiveIntensity: 0.45 });
    this.warning = new MeshLambertMaterial({ vertexColors: true, emissive: toColor(palette.warning), emissiveIntensity: 0.5 });
    const glass = palette.roles.glass;
    this.glass = new MeshLambertMaterial({
      color: toColor(glass), transparent: true, opacity: Math.min(0.6, Math.max(0.2, glass.a)), depthWrite: false, side: DoubleSide
    });
    this.ghost = new MeshLambertMaterial({ color: toColor(palette.roles.wall), transparent: true, opacity: 0.16, depthWrite: false });
    this.ground = new MeshLambertMaterial({ color: toColor(palette.ground) });
  }

  /** Matériaux partagés (à ne pas libérer avec les objets de la scène). */
  get shared(): ReadonlySet<Material> {
    return new Set<Material>([this.surface, this.selected, this.warning, this.glass, this.ghost, this.ground]);
  }

  dispose(): void {
    for (const material of this.shared) material.dispose();
  }
}
