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
}

export interface EntityBinding {
  id: string;
  entityId: string;
  position: Point; // In meters
  roomId?: string;
  icon?: string;
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
  created_at: string;
  updated_at: string;
  pixelsPerMeter: number; // Default 50 px/m
  grid: GridConfig;
  background?: BackgroundPlan;
  walls: Wall[];
  openings: Opening[];
  rooms: Room[];
  bindings: EntityBinding[];
}

export type ActiveTool = 
  | 'select'
  | 'wall'
  | 'rect_room'
  | 'door'
  | 'window'
  | 'french_window'
  | 'calibrate'
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
  color: string;
  addDoor: boolean;
  addWindow: boolean;
}
