/** Version du schéma de projet écrite par ce client (le backend applique la même). */
export const PROJECT_SCHEMA_VERSION = 2;

export interface Point {
  x: number; // In meters
  y: number; // In meters
}

/** Types de murs connus (liste d'exécution utilisée pour valider les projets chargés). */
export const WALL_TYPES = ['standard', 'partition', 'loadbearing', 'exterior'] as const;
export type WallType = typeof WALL_TYPES[number];

export interface Wall {
  id: string;
  start: Point;
  end: Point;
  thickness: number; // In meters, e.g. 0.20 for 20cm
  height?: number;   // In meters, e.g. 2.50m
  type: WallType;
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

export interface Room {
  id: string;
  name: string;
  area_id?: string; // Home Assistant Area ID linkage
  polygon: Point[]; // Boundary polygon points in meters
  areaM2: number;   // Calculated area in m²
  color?: string;   // Hex / RGBA color for floor
  icon?: string;    // MDI icon e.g. 'mdi:sofa'
  height?: number;  // Ceiling height in meters (e.g. 2.50m)
}

/** Actions possibles sur une entité du plan (tap / appui long). */
export const TAP_ACTION_TYPES = ['toggle', 'more-info', 'navigate', 'none'] as const;
export type TapActionType = typeof TAP_ACTION_TYPES[number];

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
  icon?: string;
}

export interface SmartGuide {
  type: 'x' | 'y';
  position: number; // In meters
  start: number;    // In meters
  end: number;      // In meters
}
