import { Point, Room } from './types';

export class PolygonUtils {
  /**
   * Ray-casting algorithm to test if a 2D point is inside a polygon
   */
  public static isPointInPolygon(point: Point, polygon: Point[]): boolean {
    if (!polygon || polygon.length < 3) return false;

    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x, yi = polygon[i].y;
      const xj = polygon[j].x, yj = polygon[j].y;

      const intersect = ((yi > point.y) !== (yj > point.y))
          && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }

    return inside;
  }

  /**
   * Finds the room containing the specified world point (if any)
   */
  public static findRoomContainingPoint(point: Point, rooms: Room[]): Room | null {
    for (const room of rooms) {
      if (this.isPointInPolygon(point, room.polygon)) {
        return room;
      }
    }
    return null;
  }

  /**
   * Calculates the centroid of a polygon
   */
  public static calculateCentroid(polygon: Point[]): Point {
    if (!polygon || polygon.length === 0) return { x: 0, y: 0 };
    let sumX = 0, sumY = 0;
    for (const p of polygon) {
      sumX += p.x;
      sumY += p.y;
    }
    return {
      x: sumX / polygon.length,
      y: sumY / polygon.length
    };
  }

  /**
   * Computes the geometric area (in m²) of a polygon using the Shoelace formula
   */
  public static computeArea(polygon: Point[]): number {
    if (!polygon || polygon.length < 3) return 0;
    let area = 0;
    for (let i = 0; i < polygon.length; i++) {
      const j = (i + 1) % polygon.length;
      area += polygon[i].x * polygon[j].y;
      area -= polygon[j].x * polygon[i].y;
    }
    return Math.round(Math.abs(area / 2) * 100) / 100;
  }
}

