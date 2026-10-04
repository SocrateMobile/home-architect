import { HomeArchitectProject, Point, Wall, Opening, Room } from './types';
import { PolygonUtils } from './polygon';

export interface SvgExportOptions {
  includeRooms?: boolean;
  includeWalls?: boolean;
  includeOpenings?: boolean;
  includeRoomLabels?: boolean;
  includeDimensions?: boolean;
  includeEntityMarkers?: boolean;
  backgroundColor?: string;
  paddingMeters?: number;
}

export interface ProjectBoundingBox {
  minX: number;
  minY: number;
  width: number;
  height: number;
  ppm: number;
}

export class SvgExporter {
  /**
   * Calcule la boîte englobante exacte du plan (murs, pièces, entités)
   */
  public static calculateBoundingBox(
    project: HomeArchitectProject, 
    customPadding?: number
  ): ProjectBoundingBox {
    const ppm = project.pixelsPerMeter || 50;
    const pts: Point[] = [];

    // 1. Points des murs
    for (const w of project.walls) {
      pts.push(w.start, w.end);
    }

    // 2. Points des pièces
    for (const r of project.rooms) {
      if (r.polygon && r.polygon.length > 0) {
        pts.push(...r.polygon);
      }
    }

    // 3. Points des entités
    for (const b of project.bindings) {
      if (b.position) {
        pts.push(b.position);
      }
    }

    if (pts.length === 0) {
      return {
        minX: -1,
        minY: -1,
        width: 12,
        height: 8,
        ppm
      };
    }

    let minX = Math.min(...pts.map(p => p.x));
    let maxX = Math.max(...pts.map(p => p.x));
    let minY = Math.min(...pts.map(p => p.y));
    let maxY = Math.max(...pts.map(p => p.y));

    // Marge minimale autour du plan
    const rawSpanX = maxX - minX || 5;
    const rawSpanY = maxY - minY || 5;
    const padding = customPadding !== undefined 
      ? customPadding 
      : Math.max(0.8, Math.max(rawSpanX, rawSpanY) * 0.06);

    const boxX = minX - padding;
    const boxY = minY - padding;
    const boxW = (maxX - minX) + padding * 2;
    const boxH = (maxY - minY) + padding * 2;

    return {
      minX: boxX,
      minY: boxY,
      width: boxW,
      height: boxH,
      ppm
    };
  }

  /**
   * Convertit un point monde en coordonnées de pourcentage (0% à 100%)
   * strictement compatible avec la carte Lovelace picture-elements de Home Assistant
   */
  public static worldToPercentage(point: Point, bbox: ProjectBoundingBox): { left: number; top: number } {
    const left = ((point.x - bbox.minX) / bbox.width) * 100;
    const top = ((point.y - bbox.minY) / bbox.height) * 100;

    return {
      left: Math.round(left * 10) / 10,
      top: Math.round(top * 10) / 10
    };
  }

  /**
   * Génère un document SVG vectoriel autonome et complet représentant le plan
   */
  public static exportToSvg(project: HomeArchitectProject, options?: SvgExportOptions): string {
    const opts: SvgExportOptions = {
      includeRooms: true,
      includeWalls: true,
      includeOpenings: true,
      includeRoomLabels: true,
      includeDimensions: false,
      includeEntityMarkers: false,
      backgroundColor: '#0f172a',
      ...options
    };

    const bbox = this.calculateBoundingBox(project, opts.paddingMeters);
    const ppm = bbox.ppm;

    const svgMinX = (bbox.minX * ppm).toFixed(1);
    const svgMinY = (bbox.minY * ppm).toFixed(1);
    const svgW = (bbox.width * ppm).toFixed(1);
    const svgH = (bbox.height * ppm).toFixed(1);

    let content = '';

    // 1. Fond
    if (opts.backgroundColor && opts.backgroundColor !== 'transparent') {
      content += `  <rect x="${svgMinX}" y="${svgMinY}" width="${svgW}" height="${svgH}" fill="${opts.backgroundColor}" />\n`;
    }

    // 2. Pièces (Floors)
    if (opts.includeRooms && project.rooms.length > 0) {
      content += `  <!-- Pièces -->\n  <g id="rooms">\n`;
      for (const room of project.rooms) {
        if (!room.polygon || room.polygon.length < 3) continue;
        const ptsAttr = room.polygon.map(p => `${(p.x * ppm).toFixed(1)},${(p.y * ppm).toFixed(1)}`).join(' ');
        const fill = room.color || 'rgba(56, 189, 248, 0.12)';
        content += `    <polygon points="${ptsAttr}" fill="${fill}" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1.5" />\n`;
      }
      content += `  </g>\n`;
    }

    // 3. Murs (Walls)
    if (opts.includeWalls && project.walls.length > 0) {
      content += `  <!-- Murs -->\n  <g id="walls">\n`;
      for (const wall of project.walls) {
        const poly = this.computeWallPolygon(wall.start, wall.end, wall.thickness);
        const ptsAttr = poly.map(p => `${(p.x * ppm).toFixed(1)},${(p.y * ppm).toFixed(1)}`).join(' ');
        content += `    <polygon points="${ptsAttr}" fill="#334155" stroke="#64748b" stroke-width="1" />\n`;
      }
      content += `  </g>\n`;
    }

    // 4. Ouvertures (Doors & Windows)
    if (opts.includeOpenings && project.openings.length > 0) {
      content += `  <!-- Portes & Fenêtres -->\n  <g id="openings">\n`;
      for (const op of project.openings) {
        const wall = project.walls.find(w => w.id === op.wallId);
        if (!wall) continue;

        const dx = wall.end.x - wall.start.x;
        const dy = wall.end.y - wall.start.y;
        const wallLen = Math.sqrt(dx * dx + dy * dy);
        if (wallLen === 0) continue;

        const angleRad = Math.atan2(dy, dx);
        const angleDeg = ((angleRad * 180) / Math.PI).toFixed(1);

        const opX = (wall.start.x + (op.offset / wallLen) * dx) * ppm;
        const opY = (wall.start.y + (op.offset / wallLen) * dy) * ppm;
        const wPx = op.width * ppm;
        const thickPx = wall.thickness * ppm;

        content += `    <g transform="translate(${opX.toFixed(1)}, ${opY.toFixed(1)}) rotate(${angleDeg})">\n`;
        // Découpe dans le mur
        content += `      <rect x="${(-wPx / 2).toFixed(1)}" y="${(-thickPx / 2 - 1).toFixed(1)}" width="${wPx.toFixed(1)}" height="${(thickPx + 2).toFixed(1)}" fill="${opts.backgroundColor || '#0f172a'}" />\n`;

        if (op.type === 'door') {
          const halfW = wPx / 2;
          const signSide = op.flipSide ? -1 : 1;
          const pivotX = op.flipDirection ? halfW : -halfW;
          const sweepSign = op.flipDirection ? -1 : 1;
          content += `      <rect x="${-halfW}" y="${-thickPx / 2}" width="4" height="${thickPx}" fill="#94a3b8" />\n`;
          content += `      <rect x="${halfW - 4}" y="${-thickPx / 2}" width="4" height="${thickPx}" fill="#94a3b8" />\n`;
          content += `      <line x1="${pivotX}" y1="0" x2="${pivotX}" y2="${signSide * wPx}" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />\n`;
          content += `      <path d="M ${pivotX + (sweepSign * wPx)} 0 A ${wPx} ${wPx} 0 0 ${signSide > 0 ? (op.flipDirection ? 0 : 1) : (op.flipDirection ? 1 : 0)} ${pivotX} ${signSide * wPx}" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="3, 3" />\n`;
        } else {
          // Fenêtre
          const halfW = wPx / 2;
          content += `      <rect x="${-halfW}" y="${-thickPx / 2}" width="${wPx}" height="${thickPx}" fill="none" stroke="#94a3b8" stroke-width="2" />\n`;
          content += `      <line x1="${-halfW}" y1="0" x2="${halfW}" y2="0" stroke="#38bdf8" stroke-width="1.5" />\n`;
        }

        content += `    </g>\n`;
      }
      content += `  </g>\n`;
    }

    // 5. Noms et étiquettes des pièces
    if (opts.includeRoomLabels && project.rooms.length > 0) {
      content += `  <!-- Étiquettes de Pièces -->\n  <g id="room-labels">\n`;
      for (const room of project.rooms) {
        if (!room.polygon || room.polygon.length < 3) continue;
        const centroid = PolygonUtils.calculateCentroid(room.polygon);
        const cx = (centroid.x * ppm).toFixed(1);
        const cy = (centroid.y * ppm).toFixed(1);

        content += `    <g transform="translate(${cx}, ${cy})">\n`;
        content += `      <text y="-6" fill="#f8fafc" font-size="13" font-weight="700" text-anchor="middle">${this.escapeXml(room.name)}</text>\n`;
        content += `      <text y="12" fill="#38bdf8" font-size="11" font-weight="600" text-anchor="middle" font-family="monospace">${room.areaM2.toFixed(1)} m²</text>\n`;
        content += `    </g>\n`;
      }
      content += `  </g>\n`;
    }

    // 6. Marqueurs visuels d'entités (si demandé)
    if (opts.includeEntityMarkers && project.bindings.length > 0) {
      content += `  <!-- Emplacements des Entités -->\n  <g id="entity-markers">\n`;
      for (const b of project.bindings) {
        const bx = (b.position.x * ppm).toFixed(1);
        const by = (b.position.y * ppm).toFixed(1);
        const icon = b.icon || '⚡';
        const label = b.customName || b.entityId.split('.')[1];

        content += `    <g transform="translate(${bx}, ${by})">\n`;
        content += `      <circle cx="0" cy="0" r="16" fill="rgba(30, 41, 59, 0.85)" stroke="#38bdf8" stroke-width="1.5" />\n`;
        content += `      <text x="0" y="5" font-size="12" text-anchor="middle">${this.escapeXml(icon)}</text>\n`;
        content += `      <text x="0" y="26" fill="#f1f5f9" font-size="10" font-weight="600" text-anchor="middle">${this.escapeXml(label)}</text>\n`;
        content += `    </g>\n`;
      }
      content += `  </g>\n`;
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${svgMinX} ${svgMinY} ${svgW} ${svgH}" width="100%" height="100%" style="background-color: ${opts.backgroundColor || '#0f172a'}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
${content}</svg>`;
  }

  private static computeWallPolygon(start: Point, end: Point, thickness: number): Point[] {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len === 0) return [start, start, end, end];

    const halfThick = thickness / 2;
    const nx = (-dy / len) * halfThick;
    const ny = (dx / len) * halfThick;

    return [
      { x: start.x + nx, y: start.y + ny },
      { x: end.x + nx, y: end.y + ny },
      { x: end.x - nx, y: end.y - ny },
      { x: start.x - nx, y: start.y - ny }
    ];
  }

  private static escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, c => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  }
}
