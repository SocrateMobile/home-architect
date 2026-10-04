import { Point, Wall, GridConfig, WallSnapResult } from './types';

export class SnappingEngine {
  /**
   * Snaps a world point (in meters) to grid, existing vertices, and angle guides.
   */
  public static snapPoint(
    rawPoint: Point,
    grid: GridConfig,
    existingWalls: Wall[] = [],
    originPoint?: Point,
    snapRadiusMeters: number = 0.25
  ): { 
    point: Point; 
    snappedTo: 'vertex' | 'angle' | 'grid' | 'smart_guide' | 'none'; 
    guideAngle?: number;
    smartGuideX?: number;
    smartGuideY?: number;
  } {
    let bestPoint = { ...rawPoint };

    // 1. Priorité 1 : Accrochage aux sommets (Vertices) existants
    if (grid.snapToElements && existingWalls.length > 0) {
      let minDist = snapRadiusMeters;
      let matchedVertex: Point | null = null;

      for (const wall of existingWalls) {
        for (const vertex of [wall.start, wall.end]) {
          const d = this.distance(rawPoint, vertex);
          if (d < minDist) {
            minDist = d;
            matchedVertex = vertex;
          }
        }
      }

      if (matchedVertex) {
        return {
          point: { x: matchedVertex.x, y: matchedVertex.y },
          snappedTo: 'vertex'
        };
      }
    }

    // 2. Priorité 2 : Smart Guides (Alignement orthogonal magnétique X et Y sur sommets voisins)
    let smartGuideX: number | undefined;
    let smartGuideY: number | undefined;

    if (grid.snapToElements && existingWalls.length > 0) {
      const guideTol = 0.18; // Tolérance d'accrochage d'alignement (18 cm)
      for (const wall of existingWalls) {
        for (const vertex of [wall.start, wall.end]) {
          if (originPoint && Math.abs(vertex.x - originPoint.x) < 0.01 && Math.abs(vertex.y - originPoint.y) < 0.01) {
            continue;
          }
          if (smartGuideX === undefined && Math.abs(bestPoint.x - vertex.x) < guideTol) {
            bestPoint.x = vertex.x;
            smartGuideX = vertex.x;
          }
          if (smartGuideY === undefined && Math.abs(bestPoint.y - vertex.y) < guideTol) {
            bestPoint.y = vertex.y;
            smartGuideY = vertex.y;
          }
        }
      }
    }

    // 3. Priorité 3 : Accrochage Angulaire (0°, 45°, 90°, etc.) si un point d'origine est fourni
    let angleSnapped = false;
    let guideAngleDeg: number | undefined;

    if (grid.snapToAngles && originPoint && smartGuideX === undefined && smartGuideY === undefined) {
      const dx = rawPoint.x - originPoint.x;
      const dy = rawPoint.y - originPoint.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 0.05) { // Évite les micro-mouvements
        const angleRad = Math.atan2(dy, dx);
        let angleDeg = (angleRad * 180) / Math.PI;
        if (angleDeg < 0) angleDeg += 360;

        const step = 45; // 0, 45, 90, 135, 180, 225, 270, 315, 360
        const nearestAngle = Math.round(angleDeg / step) * step;
        const angleDiff = Math.abs(angleDeg - nearestAngle);

        if (angleDiff <= 6.0) { // Tolérance de capture de 6 degrés
          const rad = (nearestAngle * Math.PI) / 180;
          bestPoint = {
            x: originPoint.x + dist * Math.cos(rad),
            y: originPoint.y + dist * Math.sin(rad)
          };
          angleSnapped = true;
          guideAngleDeg = nearestAngle;
        }
      }
    }

    // 4. Priorité 4 : Accrochage Grille
    if (grid.snapToGrid && !angleSnapped && smartGuideX === undefined && smartGuideY === undefined) {
      const size = grid.size || 0.5; // Par défaut 0.5m
      bestPoint = {
        x: Math.round(bestPoint.x / size) * size,
        y: Math.round(bestPoint.y / size) * size
      };
      return { point: bestPoint, snappedTo: 'grid' };
    } else if (smartGuideX !== undefined || smartGuideY !== undefined) {
      return { point: bestPoint, snappedTo: 'smart_guide', smartGuideX, smartGuideY };
    } else if (angleSnapped) {
      return { point: bestPoint, snappedTo: 'angle', guideAngle: guideAngleDeg };
    }

    return { point: rawPoint, snappedTo: 'none' };
  }

  /**
   * Snaps a point to the nearest wall centerline for placing doors and windows
   */
  public static snapPointToWall(
    point: Point,
    walls: Wall[],
    maxDistanceMeters: number = 0.6
  ): WallSnapResult | null {
    let closestSnap: WallSnapResult | null = null;
    let minDistance = maxDistanceMeters;

    for (const wall of walls) {
      const dx = wall.end.x - wall.start.x;
      const dy = wall.end.y - wall.start.y;
      const wallLen = Math.sqrt(dx * dx + dy * dy);
      if (wallLen === 0) continue;

      // Projection scalaire t
      const t = Math.max(0, Math.min(1,
        ((point.x - wall.start.x) * dx + (point.y - wall.start.y) * dy) / (wallLen * wallLen)
      ));

      const projX = wall.start.x + t * dx;
      const projY = wall.start.y + t * dy;
      const dist = Math.sqrt((point.x - projX) ** 2 + (point.y - projY) ** 2);

      if (dist < minDistance) {
        minDistance = dist;
        closestSnap = {
          wall,
          projectionPoint: { x: projX, y: projY },
          offset: t * wallLen,
          distance: dist,
          angleRad: Math.atan2(dy, dx)
        };
      }
    }

    return closestSnap;
  }

  public static distance(p1: Point, p2: Point): number {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  public static roundMeters(val: number, decimals: number = 2): number {
    const factor = Math.pow(10, decimals);
    return Math.round(val * factor) / factor;
  }
}
