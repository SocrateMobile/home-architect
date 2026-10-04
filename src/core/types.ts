export interface Point {
  x: number; // In meters
  y: number; // In meters
}

export type WallType = 'standard' | 'partition' | 'loadbearing' | 'exterior';

export interface Wall {
  id: string;
  start: Point;
  end: Point;
  thickness: number; // In meters, e.g. 0.20 for 20cm
  height?: number;   // In meters, e.g. 2.50m
  type: WallType;
}

export type OpeningType = 'door' | 'double_door' | 'sliding_door' | 'window' | 'french_window';

export interface Opening {
  id: string;
  wallId: string;
  type: OpeningType;
  offset: number; // Distance in meters from wall.start
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

export interface EntityBinding {
  id: string;
  entityId: string;
  position: Point; // In meters
  roomId?: string;
  icon?: string;
  mdiIcon?: string;
  customName?: string;
  tapAction: 'toggle' | 'more-info' | 'navigate';
  navigationPath?: string;
}

export interface BackgroundPlan {
  imageUrl: string;
  opacity: number;
  visible: boolean;
  offset: Point;     // Offset in meters
  scale: number;      // Scaling multiplier (1.0 = native)
  rotation: number;   // In degrees
  widthPx?: number;
  heightPx?: number;
}

export interface GridConfig {
  size: number;       // Grid cell size in meters, e.g. 0.5m or 1.0m
  subdivisions: number;
  snapToGrid: boolean;
  snapToAngles: boolean; // 0°, 45°, 90°
  snapToElements: boolean; // Snap to existing walls / points
}

export interface HomeArchitectProject {
  id: string;
  name: string;
  category?: string; // 'rdc' | 'jardin' | 'sous-sol' | 'etage1' | 'etage2' | 'etage3' | 'autre'
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
  furniture?: FurnitureItem[];
  showDimensions?: boolean;
  showThermalHeatmap?: boolean;
  showGhostLevel?: boolean;
  ghostLevelId?: string;
}

export type ActiveTool = 
  | 'select'
  | 'wall'
  | 'rect_room'
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

export type FurnitureCategory = 'seating' | 'bed' | 'table' | 'kitchen' | 'bathroom' | 'storage' | 'other';

export interface FurnitureItem {
  id: string;
  type: string;
  name: string;
  category: FurnitureCategory;
  position: Point; // in meters
  width: number;   // in meters
  length: number;  // in meters
  rotation: number; // 0, 90, 180, 270 degrees
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
