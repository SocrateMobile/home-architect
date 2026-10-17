/** Version du schéma de projet écrite par ce client (le backend applique la même). */
export const PROJECT_SCHEMA_VERSION = 2;

export interface Point {
  x: number; // In meters
  y: number; // In meters
}

/** Types de murs connus (liste d'exécution utilisée pour valider les projets chargés). */
export const WALL_TYPES = ['standard', 'partition', 'loadbearing', 'exterior'] as const;
export type WallType = typeof WALL_TYPES[number];

/** Textures et finitions de murs (2D et 3D). */
export const WALL_TEXTURES = ['paint', 'brick', 'stone', 'wood_cladding', 'concrete', 'plaster'] as const;
export type WallTexture = typeof WALL_TEXTURES[number];

export interface Wall {
  id: string;
  start: Point;
  end: Point;
  thickness: number; // In meters, e.g. 0.20 for 20cm
  height?: number;   // In meters, e.g. 2.50m
  type: WallType;
  texture?: WallTexture;
  color?: string;
}

/** Types d'ouvertures connus (liste d'exécution utilisée pour valider les projets chargés). */
export const OPENING_TYPES = ['door', 'double_door', 'sliding_door', 'window', 'french_window'] as const;
export type OpeningType = typeof OPENING_TYPES[number];

export interface Opening {
  id: string;
  wallId: string;
  type: OpeningType;
  offset: number; // Distance in meters from wall.start to the opening center
  width: number;  // Width in meters (e.g. 0.90 for standard door)
  height?: number; // Height in meters
  flipSide: boolean; // Invert open swing side (interior/exterior)
  flipDirection: boolean; // Invert open swing direction (left/right)
  sashCount?: number; // 1 = simple ouvrant, 2 = double battants
  entityId?: string; // Optional bound sensor (e.g. binary_sensor.door_front)
}

/** Textures de sol pour les pièces et espaces extérieurs (2D SVG pattern et 3D PBR). */
export const FLOOR_TEXTURES = [
  'none',
  'parquet_oak',
  'parquet_herringbone',
  'tiles_light',
  'tiles_slate',
  'terracotta',
  'marble',
  'concrete',
  'carpet',
  'grass',
  'decking',
] as const;
export type FloorTexture = typeof FLOOR_TEXTURES[number];

export interface Room {
  id: string;
  name: string;
  area_id?: string; // Home Assistant Area ID linkage
  polygon: Point[]; // Boundary polygon points in meters
  areaM2: number;   // Calculated area in m²
  color?: string;   // Hex / RGBA color for floor
  texture?: FloorTexture; // Texture procédurale 2D/3D du sol
  icon?: string;    // MDI icon e.g. 'mdi:sofa'
  height?: number;  // Ceiling height in meters (e.g. 2.50m)
}

/** Actions possibles sur une entité du plan (tap / appui long). */
export const TAP_ACTION_TYPES = ['toggle', 'more-info', 'navigate', 'none'] as const;
export type TapActionType = typeof TAP_ACTION_TYPES[number];

/** Cible suivie par un radar multi-cibles (ex: ESPHome LD2450 Cible 1, 2 ou 3). */
export interface RadarTargetConfig {
  label?: string;              // Ex: "Cible 1", "Cible 2", "Cible 3"
  xEntityId: string;           // Ex: "sensor.d1_mini_radar_salon2_cible_1_x" (en mm ou m)
  yEntityId: string;           // Ex: "sensor.d1_mini_radar_salon2_cible_1_y" (en mm ou m)
  distanceEntityId?: string;   // Ex: "sensor.d1_mini_radar_salon2_cible_1_distance" (anti-fantôme d > 0)
  resolutionEntityId?: string; // Ex: "sensor.d1_mini_radar_salon2_cible_1_resolution" (distinction Humain / Chat)
  color?: string;              // Couleur d'affichage de la cible (ex: "#00bcd4")
}

/** Point d'étalonnage associant une mesure brute du radar (mm) à un point sur le plan (m). */
export interface RadarCalibrationPoint {
  id: string;
  label: string;       // Ex: "Coin 1", "Coin 2", "Coin 3", "Coin 4"...
  radarMm: Point;      // Coordonnées brutes (x, y) capturées par la Cible 1 (en mm)
  planMeters: Point;   // Position correspondante sur le plan 2D (en mètres)
}

/** Zone rectangulaire ESPHome LD2450 (Zone 1, 2 ou 3) synchronisable avec Home Assistant. */
export interface RadarZoneConfig {
  index: 1 | 2 | 3;
  name?: string;
  enabled: boolean;
  /** Coins opposés du rectangle sur le plan (en mètres). */
  p1: Point;
  p2: Point;
  x1EntityId?: string;
  y1EntityId?: string;
  x2EntityId?: string;
  y2EntityId?: string;
}

/**
 * Matrice de transformation affine 2D (moindres carrés sur N >= 3 coins, ou similitude sur 2 coins) :
 * planX = a * radarX_mm + b * radarY_mm + tx
 * planY = c * radarX_mm + d * radarY_mm + ty
 */
export interface RadarAffineMatrix {
  a: number;
  b: number;
  tx: number;
  c: number;
  d: number;
  ty: number;
}

/** Configuration et calibrage spatial d'un capteur radar (LD2450 ou autre radar X/Y) sur le plan. */
export interface RadarConfig {
  enabled: boolean;
  orientationDeg: number;      // Direction vers laquelle regarde le radar sur le plan [0, 360) (0° = haut/Nord, 90° = droite/Est)
  heightMeters: number;        // Hauteur de pose du radar (défaut 1.20 m, réglable par radar ex: 0.20 m à 3.50 m)
  tiltDeg?: number;            // Inclinaison verticale éventuelle en degrés (défaut 0°)
  fovDeg: number;              // Angle d'ouverture du cône radar (défaut 120° pour LD2450)
  maxRangeMeters: number;      // Portée maximale affichée pour le cône (défaut 6.0 m)
  showCone: boolean;           // Afficher ou masquer le cône de détection sur le plan
  invertX?: boolean;           // Inverser l'axe X gauche/droite du radar si monté à l'envers
  smoothing?: boolean;         // Activer le lissage anti-tremblement EMA des cibles (défaut true)
  coordinateUnit?: 'mm' | 'm' | 'cm' | 'auto'; // Unité des capteurs X/Y (défaut 'auto' : mm pour LD2450)
  thresholdEntityId?: string;  // Ex: "number.d1_mini_radar_salon2_seuil_de_resolution_humain"
  defaultThresholdMm?: number; // Seuil par défaut (ex: 320 mm) si thresholdEntityId n'est pas défini
  targets: RadarTargetConfig[];
  calibrationPoints: RadarCalibrationPoint[];
  affineMatrix?: RadarAffineMatrix;
  zones?: RadarZoneConfig[];
}

export interface EntityBinding {
  id: string;
  entityId: string;
  position: Point; // In meters
  roomId?: string;
  icon?: string;
  mdiIcon?: string;
  customName?: string;         // UNIQUEMENT si l'utilisateur a saisi un nom ; sinon le friendly_name live est affiché
  tapAction?: TapActionType;   // undefined = action par défaut du domaine (voir defaultTapAction)
  holdAction?: TapActionType;  // défaut 'more-info'
  navigationPath?: string;
  radarConfig?: RadarConfig;   // Calibrage spatial et suivi temps réel des cibles X/Y (LD2450, etc.)
}

export interface BackgroundPlan {
  imageUrl: string;   // URL externe http(s) OU data-URL héritée (sera migrée). Chaîne vide '' si assetId est utilisé.
  assetId?: string;   // Nom de fichier de l'asset côté serveur (ex: "plan_ab12cd34-9f8e7d6c5b4a.webp")
  mimeType?: string;
  opacity: number;
  visible: boolean;
  offset: Point;     // Offset in meters
  scale: number;      // Scaling multiplier (1.0 = native)
  rotation: number;   // In degrees
  widthPx?: number;
  heightPx?: number;
}

/** Cadre d'export figé (en mètres) servant de référence aux positions % de picture-elements. */
export interface ExportFrame {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

/** Informations de publication du SVG : possédées par le SERVEUR, injectées en lecture par get_project. */
export interface PublishInfo {
  url: string;            // "/api/home_architect/published/<file>.svg?v=<hash>"
  path: string;           // Sans ?v
  hash: string;
  published_at: string;
  include_background: boolean;
  legacy_path?: string;   // "/local/plan_<id>.svg" si un ancien fichier www existe
}

export interface GridConfig {
  size: number;       // Grid cell size in meters (0.05 à 1 m réglable dans l'interface)
  subdivisions: number;
  snapToGrid: boolean;
  snapToAngles: boolean; // 0°, 45°, 90°
  snapToElements: boolean; // Snap to existing walls / points
}

export interface HomeArchitectProject {
  id: string;        // Identifiant immuable ('plan_xxxxxxxx', ou ancien id de niveau 'rdc', 'etage1'…)
  name: string;
  category?: string; // Niveau ('rdc' | 'jardin' | 'sous-sol' | 'etage1' | 'etage2' | 'etage3') ou 'autre' (voir core/levels.ts)
  schema_version?: number; // PROJECT_SCHEMA_VERSION
  revision?: number;       // Possédé par le serveur (incrémenté à chaque sauvegarde)
  created_at: string;
  updated_at: string;
  pixelsPerMeter: number; // Default 50 px/m
  defaultCeilingHeight?: number; // Default ceiling height in meters, e.g. 2.50m
  grid: GridConfig;
  background?: BackgroundPlan;
  walls: Wall[];
  openings: Opening[];
  rooms: Room[];
  bindings: EntityBinding[];
  furniture?: FurnitureItem[]; // Optionnel dans le type (compatibilité), mais normalizeProject garantit []
  showDimensions?: boolean;
  showThermalHeatmap?: boolean;
  showGhostLevel?: boolean;
  ghostLevelId?: string;
  northAngle?: number; // Orientation du Nord géographique en degrés [0, 360) (0° = haut du plan, sens horaire)
  showCompass?: boolean; // Afficher la boussole sur le plan (défaut true)
  exportFrame?: ExportFrame; // Cadre figé pour les positions % de picture-elements
  publish?: PublishInfo;     // Lecture seule, injecté par le serveur ; retiré avant la sauvegarde
}

export type ActiveTool =
  | 'select'
  | 'wall'
  | 'room'       // Pièce polygonale (clic par sommet, double-clic / clic sur le 1er sommet pour fermer)
  | 'rect_room'  // Pièce rectangulaire par glisser
  | 'door'
  | 'window'
  | 'french_window'
  | 'calibrate'
  | 'rescale'
  | 'entity_bind';

export interface ViewportTransform {
  x: number;     // Screen translation in px
  y: number;     // Screen translation in px
  zoom: number;  // Scale factor (1.0 = 100%)
}

export interface WallSnapResult {
  wall: Wall;
  projectionPoint: Point;
  offset: number; // In meters from wall.start
  distance: number; // Distance in meters from mouse to wall
  angleRad: number;
}

export interface RoomTemplate {
  id: string;
  name: string;
  icon: string;
  widthMeters: number;
  lengthMeters: number;
  wallThickness: number;
  heightMeters?: number; // Ceiling height, e.g. 2.50m
  color: string;
  addDoor: boolean;
  addWindow: boolean;
}

export interface SelectedElements {
  wallIds: string[];
  openingIds: string[];
  roomIds: string[];
  bindingIds: string[];
  furnitureIds?: string[];
}

/** Catégories de mobilier connues (liste d'exécution utilisée pour valider les projets chargés). */
export const FURNITURE_CATEGORIES = ['seating', 'bed', 'table', 'kitchen', 'bathroom', 'storage', 'other'] as const;
export type FurnitureCategory = typeof FURNITURE_CATEGORIES[number];

/** Matériaux et textures pour le mobilier (2D et 3D PBR). */
export const FURNITURE_MATERIALS = ['default', 'oak', 'walnut', 'fabric', 'leather', 'metal', 'glass', 'ceramic'] as const;
export type FurnitureMaterial = typeof FURNITURE_MATERIALS[number];

export interface FurnitureItem {
  id: string;
  type: string;
  name: string;
  category: FurnitureCategory;
  position: Point; // in meters
  width: number;   // in meters
  length: number;  // in meters
  rotation: number; // Degrés quelconques, normalisés dans [0, 360)
  roomId?: string;
  color?: string;
  material?: FurnitureMaterial;
  icon?: string;
}

export interface SmartGuide {
  type: 'x' | 'y';
  position: number; // In meters
  start: number;    // In meters
  end: number;      // In meters
}
