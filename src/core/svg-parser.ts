import { Point, Wall, Opening, Room, OpeningType } from './types';
import { PolygonUtils } from './polygon';
import { SnappingEngine } from './snapping';

export interface SvgParseOptions {
  totalWidthMeters?: number;
  defaultThickness?: number;
  defaultHeight?: number;
  importWalls?: boolean;
  importDoors?: boolean;
  importWindows?: boolean;
  importRooms?: boolean;
  importLabels?: boolean;
}

export interface SvgParseStats {
  wallCount: number;
  doorCount: number;
  windowCount: number;
  roomCount: number;
  textLabelCount: number;
  ignoredMeasurementLinesCount: number;
}

export interface SvgParseResult {
  success: boolean;
  walls: Wall[];
  openings: Opening[];
  rooms: Room[];
  viewBox: { x: number; y: number; width: number; height: number };
  pixelsPerMeter: number;
  stats: SvgParseStats;
  error?: string;
}

interface RawSegment {
  start: Point;
  end: Point;
  thickness: number;
  isWallHint: boolean;
  isWindowHint: boolean;
  isDoorHint: boolean;
  isMeasurementLine: boolean;
}

interface RawArc {
  start: Point;
  end: Point;
  rx: number;
  ry: number;
  sweepFlag: boolean;
  isDoorHint: boolean;
}

interface RawTextLabel {
  text: string;
  position: Point;
}

interface RawPolygon {
  points: Point[];
  isRoomHint: boolean;
  fill?: string;
}

/**
 * 2D Affine Transformation Matrix (3x3 for 2D points: [a c e; b d f; 0 0 1])
 */
class Matrix2D {
  constructor(
    public a = 1,
    public b = 0,
    public c = 0,
    public d = 1,
    public e = 0,
    public f = 0
  ) {}

  public static identity(): Matrix2D {
    return new Matrix2D(1, 0, 0, 1, 0, 0);
  }

  public multiply(other: Matrix2D): Matrix2D {
    return new Matrix2D(
      this.a * other.a + this.c * other.b,
      this.b * other.a + this.d * other.b,
      this.a * other.c + this.c * other.d,
      this.b * other.c + this.d * other.d,
      this.a * other.e + this.c * other.f + this.e,
      this.b * other.e + this.d * other.f + this.f
    );
  }

  public translate(tx: number, ty: number): Matrix2D {
    return this.multiply(new Matrix2D(1, 0, 0, 1, tx, ty));
  }

  public scale(sx: number, sy = sx): Matrix2D {
    return this.multiply(new Matrix2D(sx, 0, 0, sy, 0, 0));
  }

  public rotate(deg: number): Matrix2D {
    const rad = (deg * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    return this.multiply(new Matrix2D(cos, sin, -sin, cos, 0, 0));
  }

  public transformPoint(p: Point): Point {
    return {
      x: this.a * p.x + this.c * p.y + this.e,
      y: this.b * p.x + this.d * p.y + this.f
    };
  }

  public static parseTransform(transformStr: string | null): Matrix2D {
    if (!transformStr) return Matrix2D.identity();
    let current = Matrix2D.identity();

    const regex = /([a-zA-Z]+)\s*\(([^)]+)\)/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(transformStr)) !== null) {
      const type = match[1].toLowerCase();
      const args = match[2].trim().split(/[\s,]+/).map(parseFloat).filter(n => !isNaN(n));

      if (type === 'matrix' && args.length >= 6) {
        current = current.multiply(new Matrix2D(args[0], args[1], args[2], args[3], args[4], args[5]));
      } else if (type === 'translate' && args.length >= 1) {
        current = current.translate(args[0], args[1] || 0);
      } else if (type === 'scale' && args.length >= 1) {
        current = current.scale(args[0], args[1] !== undefined ? args[1] : args[0]);
      } else if (type === 'rotate' && args.length >= 1) {
        if (args.length >= 3) {
          current = current.translate(args[1], args[2]).rotate(args[0]).translate(-args[1], -args[2]);
        } else {
          current = current.rotate(args[0]);
        }
      }
    }

    return current;
  }
}

/**
 * Intelligent SVG Architectural Floor Plan Parser and Interpreter
 */
export class SvgPlanParser {
  /**
   * Main entry point to parse and interpret an architectural SVG floor plan
   */
  public static parseSvg(
    svgContent: string,
    totalWidthMeters: number = 12.0,
    defaultThickness: number = 0.20,
    defaultHeight: number = 2.50,
    options?: SvgParseOptions
  ): SvgParseResult {
    try {
      const opts: SvgParseOptions = {
        importWalls: true,
        importDoors: true,
        importWindows: true,
        importRooms: true,
        importLabels: true,
        ...options
      };

      const parser = new DOMParser();
      const doc = parser.parseFromString(svgContent, 'image/svg+xml');

      const parserError = doc.querySelector('parsererror');
      if (parserError) {
        return {
          success: false,
          walls: [],
          openings: [],
          rooms: [],
          viewBox: { x: 0, y: 0, width: 0, height: 0 },
          pixelsPerMeter: 50,
          stats: { wallCount: 0, doorCount: 0, windowCount: 0, roomCount: 0, textLabelCount: 0, ignoredMeasurementLinesCount: 0 },
          error: 'Le fichier SVG contient des erreurs XML : ' + parserError.textContent
        };
      }

      const svgEl = doc.querySelector('svg');
      if (!svgEl) {
        return {
          success: false,
          walls: [],
          openings: [],
          rooms: [],
          viewBox: { x: 0, y: 0, width: 0, height: 0 },
          pixelsPerMeter: 50,
          stats: { wallCount: 0, doorCount: 0, windowCount: 0, roomCount: 0, textLabelCount: 0, ignoredMeasurementLinesCount: 0 },
          error: 'Aucune balise <svg> trouvée dans le document.'
        };
      }

      // 1. Détermination de la boîte de délimitation (viewBox / width / height)
      const viewBox = this.extractViewBox(svgEl);

      // Échelle globale : mètres réels par unité SVG
      const safeWidth = viewBox.width > 0 ? viewBox.width : 1000;
      const metersPerUnit = totalWidthMeters / safeWidth;
      const pixelsPerMeter = Math.round((safeWidth / totalWidthMeters) * 10) / 10;

      // 2. Extraction récursive de toutes les primitives géométriques
      const segments: RawSegment[] = [];
      const arcs: RawArc[] = [];
      const textLabels: RawTextLabel[] = [];
      const polygons: RawPolygon[] = [];

      this.traverseElement(svgEl, Matrix2D.identity(), {
        segments,
        arcs,
        textLabels,
        polygons,
        defaultThickness
      });

      // Compteur des lignes de mesure/pointillés ignorées
      const ignoredMeasurementLinesCount = segments.filter(s => s.isMeasurementLine).length;

      // 3. Normalisation et conversion en unités réelles (Mètres)
      const allWalls: Wall[] = this.convertSegmentsToWalls(
        segments,
        viewBox,
        metersPerUnit,
        defaultThickness,
        defaultHeight
      );

      // 4. Détection et conversion des ouvertures (Portes et Fenêtres)
      const allOpenings: Opening[] = this.detectOpenings(
        arcs,
        segments,
        allWalls,
        viewBox,
        metersPerUnit
      );

      // 5. Détection des pièces et association des étiquettes de texte
      const allRooms: Room[] = this.detectRooms(
        polygons,
        allWalls,
        textLabels,
        viewBox,
        metersPerUnit,
        defaultHeight,
        opts.importLabels !== false
      );

      // 6. Application des filtres utilisateur (Checkboxes de sélection d'import)
      const finalWalls = opts.importWalls !== false ? allWalls : [];
      const finalOpenings = allOpenings.filter(op => {
        if (op.type === 'door') return opts.importDoors !== false;
        return opts.importWindows !== false;
      });
      const finalRooms = opts.importRooms !== false ? allRooms : [];

      return {
        success: true,
        walls: finalWalls,
        openings: finalOpenings,
        rooms: finalRooms,
        viewBox,
        pixelsPerMeter: pixelsPerMeter || 50,
        stats: {
          wallCount: allWalls.length,
          doorCount: allOpenings.filter(o => o.type === 'door').length,
          windowCount: allOpenings.filter(o => o.type === 'window' || o.type === 'french_window').length,
          roomCount: allRooms.length,
          textLabelCount: textLabels.length,
          ignoredMeasurementLinesCount
        }
      };
    } catch (err: any) {
      console.error('Erreur lors du parsing SVG:', err);
      return {
        success: false,
        walls: [],
        openings: [],
        rooms: [],
        viewBox: { x: 0, y: 0, width: 0, height: 0 },
        pixelsPerMeter: 50,
        stats: { wallCount: 0, doorCount: 0, windowCount: 0, roomCount: 0, textLabelCount: 0, ignoredMeasurementLinesCount: 0 },
        error: `Erreur d'interprétation : ${err.message || String(err)}`
      };
    }
  }

  /**
   * Extrait la viewBox ou dimensions de l'élément SVG racine
   */
  private static extractViewBox(svgEl: Element): { x: number; y: number; width: number; height: number } {
    const vbAttr = svgEl.getAttribute('viewBox');
    if (vbAttr) {
      const parts = vbAttr.trim().split(/[\s,]+/).map(parseFloat).filter(n => !isNaN(n));
      if (parts.length >= 4 && parts[2] > 0 && parts[3] > 0) {
        return { x: parts[0], y: parts[1], width: parts[2], height: parts[3] };
      }
    }

    const parseUnit = (attr: string | null, fallback: number): number => {
      if (!attr) return fallback;
      const val = parseFloat(attr);
      if (isNaN(val)) return fallback;
      if (attr.includes('mm')) return val * 3.7795;
      if (attr.includes('cm')) return val * 37.795;
      if (attr.includes('in')) return val * 96;
      if (attr.includes('pt')) return val * 1.333;
      return val;
    };

    const width = parseUnit(svgEl.getAttribute('width'), 1000);
    const height = parseUnit(svgEl.getAttribute('height'), 750);
    return { x: 0, y: 0, width, height };
  }

  /**
   * Parcours récursif des nœuds de l'arbre SVG
   */
  private static traverseElement(
    element: Element,
    currentTransform: Matrix2D,
    context: {
      segments: RawSegment[];
      arcs: RawArc[];
      textLabels: RawTextLabel[];
      polygons: RawPolygon[];
      defaultThickness: number;
    }
  ): void {
    // Calcul de la transformation cumulative
    const elTransformStr = element.getAttribute('transform');
    const localTransform = elTransformStr
      ? currentTransform.multiply(Matrix2D.parseTransform(elTransformStr))
      : currentTransform;

    const tagName = element.tagName.toLowerCase();

    // Détection sémantique d'après classes, IDs ou labels Inkscape/AutoCAD
    const id = (element.getAttribute('id') || '').toLowerCase();
    const className = (element.getAttribute('class') || '').toLowerCase();
    const label = (element.getAttribute('inkscape:label') || '').toLowerCase();
    const layer = (element.closest('g[id]')?.getAttribute('id') || '').toLowerCase();
    const parentClass = (element.parentElement?.getAttribute('class') || '').toLowerCase();

    const semanticString = `${id} ${className} ${label} ${layer} ${parentClass}`;

    // 1. Détection des lignes de cotation, mesures, pointillés ou tirets
    // RÈGLE : Les lignes pointillées / tiretées ne sont JAMAIS des murs !
    const strokeDasharray = element.getAttribute('stroke-dasharray') || '';
    const styleAttr = (element.getAttribute('style') || '').toLowerCase();
    const parentDasharray = element.closest('[stroke-dasharray]')?.getAttribute('stroke-dasharray') || '';

    const isDashedOrDotted = 
      (!!strokeDasharray && strokeDasharray !== 'none' && strokeDasharray !== '0') ||
      /stroke-dasharray\s*:\s*(?!none|0)[\d\s,.]+/i.test(styleAttr) ||
      (!!parentDasharray && parentDasharray !== 'none' && parentDasharray !== '0') ||
      /dashed|dotted/.test(styleAttr) ||
      /pointill|tirete|dashed|dotted/.test(semanticString);

    const isDimensionHint = 
      isDashedOrDotted ||
      /dimension|cotation|mesure|cote|measure|guideline|guide|axis|axe|fleche|arrow|marker|tick/i.test(semanticString) ||
      element.hasAttribute('marker-start') ||
      element.hasAttribute('marker-end') ||
      element.closest('g[id*="dimension" i], g[id*="cotation" i], g[id*="cote" i], g[id*="measure" i], g[id*="guide" i]') !== null;

    const isMeasurementLine = isDimensionHint;

    const isDoorHint = /door|porte|portillon|swing|battant/.test(semanticString);
    const isWindowHint = /window|fenetre|vitrage|chassis|baie/.test(semanticString);
    const isWallHint = !isMeasurementLine && (/wall|mur|cloison|facade|envelope|structure|enveloppe/.test(semanticString) || (!isDoorHint && !isWindowHint));
    const isRoomHint = /room|piece|espace|zone|area|chambre|salon|cuisine|sdb|sejour/.test(semanticString);

    const fillAttr = element.getAttribute('fill') || '';

    // Ignore les éléments explicitement invisibles
    const display = element.getAttribute('display');
    const visibility = element.getAttribute('visibility');
    if (display === 'none' || visibility === 'hidden') return;

    switch (tagName) {
      case 'line': {
        const x1 = parseFloat(element.getAttribute('x1') || '0');
        const y1 = parseFloat(element.getAttribute('y1') || '0');
        const x2 = parseFloat(element.getAttribute('x2') || '0');
        const y2 = parseFloat(element.getAttribute('y2') || '0');

        const p1 = localTransform.transformPoint({ x: x1, y: y1 });
        const p2 = localTransform.transformPoint({ x: x2, y: y2 });

        context.segments.push({
          start: p1,
          end: p2,
          thickness: context.defaultThickness,
          isWallHint: isWallHint && !isMeasurementLine,
          isWindowHint,
          isDoorHint,
          isMeasurementLine
        });
        break;
      }

      case 'polyline':
      case 'polygon': {
        const pointsStr = element.getAttribute('points') || '';
        const coords = pointsStr.trim().split(/[\s,]+/).map(parseFloat).filter(n => !isNaN(n));
        const pts: Point[] = [];
        for (let i = 0; i < coords.length; i += 2) {
          if (i + 1 < coords.length) {
            pts.push(localTransform.transformPoint({ x: coords[i], y: coords[i + 1] }));
          }
        }

        if (pts.length >= 2) {
          for (let i = 0; i < pts.length - 1; i++) {
            context.segments.push({
              start: pts[i],
              end: pts[i + 1],
              thickness: context.defaultThickness,
              isWallHint: isWallHint && !isMeasurementLine,
              isWindowHint,
              isDoorHint,
              isMeasurementLine
            });
          }

          if (tagName === 'polygon' && pts.length >= 3) {
            context.segments.push({
              start: pts[pts.length - 1],
              end: pts[0],
              thickness: context.defaultThickness,
              isWallHint: isWallHint && !isMeasurementLine,
              isWindowHint,
              isDoorHint,
              isMeasurementLine
            });

            // Enregistrer comme polygone candidat pièce (si ce n'est pas une zone de cotation)
            if (!isMeasurementLine) {
              context.polygons.push({
                points: pts,
                isRoomHint,
                fill: fillAttr
              });
            }
          }
        }
        break;
      }

      case 'rect': {
        const rx = parseFloat(element.getAttribute('x') || '0');
        const ry = parseFloat(element.getAttribute('y') || '0');
        const rw = parseFloat(element.getAttribute('width') || '0');
        const rh = parseFloat(element.getAttribute('height') || '0');

        if (rw > 0 && rh > 0) {
          const p1 = localTransform.transformPoint({ x: rx, y: ry });
          const p2 = localTransform.transformPoint({ x: rx + rw, y: ry });
          const p3 = localTransform.transformPoint({ x: rx + rw, y: ry + rh });
          const p4 = localTransform.transformPoint({ x: rx, y: ry + rh });

          // Si c'est un rectangle allongé (ex: mur plein représenté sous forme de rectangle)
          const ratio = Math.max(rw / rh, rh / rw);
          if (ratio >= 3.0 && !isMeasurementLine) {
            // Ligne médiane du mur
            if (rw > rh) {
              const startMid = localTransform.transformPoint({ x: rx, y: ry + rh / 2 });
              const endMid = localTransform.transformPoint({ x: rx + rw, y: ry + rh / 2 });
              context.segments.push({
                start: startMid,
                end: endMid,
                thickness: context.defaultThickness,
                isWallHint: true,
                isWindowHint,
                isDoorHint,
                isMeasurementLine: false
              });
            } else {
              const startMid = localTransform.transformPoint({ x: rx + rw / 2, y: ry });
              const endMid = localTransform.transformPoint({ x: rx + rw / 2, y: ry + rh });
              context.segments.push({
                start: startMid,
                end: endMid,
                thickness: context.defaultThickness,
                isWallHint: true,
                isWindowHint,
                isDoorHint,
                isMeasurementLine: false
              });
            }
          } else {
            // Rectangle de pièce ou 4 murs
            if (!isMeasurementLine) {
              context.polygons.push({
                points: [p1, p2, p3, p4],
                isRoomHint: isRoomHint || (fillAttr !== 'none' && fillAttr !== '#000000' && fillAttr !== 'black'),
                fill: fillAttr
              });

              // 4 contours
              context.segments.push(
                { start: p1, end: p2, thickness: context.defaultThickness, isWallHint, isWindowHint, isDoorHint, isMeasurementLine: false },
                { start: p2, end: p3, thickness: context.defaultThickness, isWallHint, isWindowHint, isDoorHint, isMeasurementLine: false },
                { start: p3, end: p4, thickness: context.defaultThickness, isWallHint, isWindowHint, isDoorHint, isMeasurementLine: false },
                { start: p4, end: p1, thickness: context.defaultThickness, isWallHint, isWindowHint, isDoorHint, isMeasurementLine: false }
              );
            }
          }
        }
        break;
      }

      case 'path': {
        const d = element.getAttribute('d');
        if (d) {
          this.parsePathData(
            d, 
            localTransform, 
            context, 
            isWallHint && !isMeasurementLine, 
            isWindowHint, 
            isDoorHint, 
            isMeasurementLine, 
            fillAttr
          );
        }
        break;
      }

      case 'text': {
        const tx = parseFloat(element.getAttribute('x') || '0');
        const ty = parseFloat(element.getAttribute('y') || '0');
        const textContent = element.textContent?.trim() || '';

        // Ignorer les textes purement numériques de cotation (ex: "3.40", "120 cm", "2.85 m")
        const isNumericDimension = /^\d+([.,]\d+)?\s*(m|cm|mm)?$/i.test(textContent);

        if (textContent.length > 0 && !isNumericDimension) {
          const pos = localTransform.transformPoint({ x: tx, y: ty });
          context.textLabels.push({
            text: textContent,
            position: pos
          });
        }
        break;
      }

      default:
        break;
    }

    // Récursion dans les enfants (groupes <g>, calques, etc.)
    for (let i = 0; i < element.children.length; i++) {
      this.traverseElement(element.children[i], localTransform, context);
    }
  }

  /**
   * Parse une chaîne de commandes SVG path ('d')
   */
  private static parsePathData(
    d: string,
    transform: Matrix2D,
    context: {
      segments: RawSegment[];
      arcs: RawArc[];
      polygons: RawPolygon[];
      defaultThickness: number;
    },
    isWallHint: boolean,
    isWindowHint: boolean,
    isDoorHint: boolean,
    isMeasurementLine: boolean,
    fill: string
  ): void {
    // Tokeniseur pour commandes et nombres (incluant signes moins et notation exponentielle)
    const commandRegex = /([a-df-z])|([-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?)/gi;
    const tokens: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = commandRegex.exec(d)) !== null) {
      tokens.push(match[0]);
    }

    let cursor: Point = { x: 0, y: 0 };
    let subpathStart: Point = { x: 0, y: 0 };
    let currentPolygonPts: Point[] = [];
    let idx = 0;
    let currentCmd = '';

    while (idx < tokens.length) {
      const token = tokens[idx];
      if (/^[a-df-z]$/i.test(token)) {
        currentCmd = token;
        idx++;
      }

      const isRelative = currentCmd === currentCmd.toLowerCase();
      const cmd = currentCmd.toUpperCase();

      switch (cmd) {
        case 'M': {
          const x = parseFloat(tokens[idx++]);
          const y = parseFloat(tokens[idx++]);
          if (!isNaN(x) && !isNaN(y)) {
            cursor = isRelative ? { x: cursor.x + x, y: cursor.y + y } : { x, y };
            subpathStart = { ...cursor };
            if (currentPolygonPts.length >= 3 && !isMeasurementLine) {
              context.polygons.push({
                points: currentPolygonPts.map(p => transform.transformPoint(p)),
                isRoomHint: isWallHint ? false : (fill !== 'none' && fill !== ''),
                fill
              });
            }
            currentPolygonPts = [{ ...cursor }];
          }
          break;
        }

        case 'L': {
          const x = parseFloat(tokens[idx++]);
          const y = parseFloat(tokens[idx++]);
          if (!isNaN(x) && !isNaN(y)) {
            const nextPt = isRelative ? { x: cursor.x + x, y: cursor.y + y } : { x, y };
            const p1 = transform.transformPoint(cursor);
            const p2 = transform.transformPoint(nextPt);

            context.segments.push({
              start: p1,
              end: p2,
              thickness: context.defaultThickness,
              isWallHint: isWallHint && !isMeasurementLine,
              isWindowHint,
              isDoorHint,
              isMeasurementLine
            });

            cursor = nextPt;
            currentPolygonPts.push({ ...cursor });
          }
          break;
        }

        case 'H': {
          const x = parseFloat(tokens[idx++]);
          if (!isNaN(x)) {
            const nextPt = isRelative ? { x: cursor.x + x, y: cursor.y } : { x, y: cursor.y };
            const p1 = transform.transformPoint(cursor);
            const p2 = transform.transformPoint(nextPt);

            context.segments.push({
              start: p1,
              end: p2,
              thickness: context.defaultThickness,
              isWallHint: isWallHint && !isMeasurementLine,
              isWindowHint,
              isDoorHint,
              isMeasurementLine
            });

            cursor = nextPt;
            currentPolygonPts.push({ ...cursor });
          }
          break;
        }

        case 'V': {
          const y = parseFloat(tokens[idx++]);
          if (!isNaN(y)) {
            const nextPt = isRelative ? { x: cursor.x, y: cursor.y + y } : { x: cursor.x, y };
            const p1 = transform.transformPoint(cursor);
            const p2 = transform.transformPoint(nextPt);

            context.segments.push({
              start: p1,
              end: p2,
              thickness: context.defaultThickness,
              isWallHint: isWallHint && !isMeasurementLine,
              isWindowHint,
              isDoorHint,
              isMeasurementLine
            });

            cursor = nextPt;
            currentPolygonPts.push({ ...cursor });
          }
          break;
        }

        case 'A': {
          // Commande Arc : A rx ry x-axis-rotation large-arc sweep x y
          const rx = parseFloat(tokens[idx++]);
          const ry = parseFloat(tokens[idx++]);
          const _rot = parseFloat(tokens[idx++]);
          const _largeArc = parseFloat(tokens[idx++]);
          const sweep = parseFloat(tokens[idx++]);
          const x = parseFloat(tokens[idx++]);
          const y = parseFloat(tokens[idx++]);

          if (!isNaN(x) && !isNaN(y) && !isNaN(rx) && !isNaN(ry)) {
            const nextPt = isRelative ? { x: cursor.x + x, y: cursor.y + y } : { x, y };
            const p1 = transform.transformPoint(cursor);
            const p2 = transform.transformPoint(nextPt);

            // Détection arc battant de porte (rayon ~ 0.60m à 1.30m)
            // Note: les arcs de portes peuvent parfois être en pointillés sur le plan
            context.arcs.push({
              start: p1,
              end: p2,
              rx,
              ry,
              sweepFlag: sweep === 1,
              isDoorHint: true
            });

            cursor = nextPt;
            currentPolygonPts.push({ ...cursor });
          }
          break;
        }

        case 'C':
        case 'S':
        case 'Q':
        case 'T': {
          // Pour les courbes de Bézier, on avance simplement au point final
          const count = (cmd === 'C') ? 6 : (cmd === 'S' || cmd === 'Q') ? 4 : 2;
          const coords: number[] = [];
          for (let c = 0; c < count; c++) coords.push(parseFloat(tokens[idx++]));
          const endX = coords[coords.length - 2];
          const endY = coords[coords.length - 1];
          if (!isNaN(endX) && !isNaN(endY)) {
            cursor = isRelative ? { x: cursor.x + endX, y: cursor.y + endY } : { x: endX, y: endY };
            currentPolygonPts.push({ ...cursor });
          }
          break;
        }

        case 'Z': {
          if (currentPolygonPts.length >= 2) {
            const p1 = transform.transformPoint(cursor);
            const p2 = transform.transformPoint(subpathStart);
            context.segments.push({
              start: p1,
              end: p2,
              thickness: context.defaultThickness,
              isWallHint: isWallHint && !isMeasurementLine,
              isWindowHint,
              isDoorHint,
              isMeasurementLine
            });
          }

          if (currentPolygonPts.length >= 3 && !isMeasurementLine) {
            context.polygons.push({
              points: currentPolygonPts.map(p => transform.transformPoint(p)),
              isRoomHint: isWallHint ? false : (fill !== 'none' && fill !== ''),
              fill
            });
          }

          cursor = { ...subpathStart };
          currentPolygonPts = [];
          break;
        }

        default:
          idx++;
          break;
      }
    }
  }

  /**
   * Transforme et consolide les segments bruts en murs réels en mètres
   */
  private static convertSegmentsToWalls(
    segments: RawSegment[],
    viewBox: { x: number; y: number; width: number; height: number },
    metersPerUnit: number,
    defaultThickness: number,
    defaultHeight: number
  ): Wall[] {
    const rawWalls: Wall[] = [];

    for (const seg of segments) {
      // Filtrer STRICTEMENT les lignes de mesure/cotation/pointillés et les ouvrants
      if (seg.isMeasurementLine || seg.isDoorHint || seg.isWindowHint) continue;

      const p1: Point = {
        x: (seg.start.x - viewBox.x) * metersPerUnit,
        y: (seg.start.y - viewBox.y) * metersPerUnit
      };
      const p2: Point = {
        x: (seg.end.x - viewBox.x) * metersPerUnit,
        y: (seg.end.y - viewBox.y) * metersPerUnit
      };

      const dist = SnappingEngine.distance(p1, p2);
      // Ignore les micro-bruits (< 20 cm) comme les flèches de cote ou hachures
      if (dist < 0.20) continue;

      rawWalls.push({
        id: `w_svg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        start: { x: SnappingEngine.roundMeters(p1.x), y: SnappingEngine.roundMeters(p1.y) },
        end: { x: SnappingEngine.roundMeters(p2.x), y: SnappingEngine.roundMeters(p2.y) },
        thickness: defaultThickness,
        height: defaultHeight,
        type: 'standard'
      });
    }

    // Consolidation : Fusion des segments colinéaires et accrochage des sommets
    return this.consolidateWalls(rawWalls);
  }

  /**
   * Fusionne les segments colinéaires consécutifs et magnétise les extrémités proches
   */
  private static consolidateWalls(walls: Wall[]): Wall[] {
    if (walls.length === 0) return [];

    let processed = [...walls];

    // 1. Snapping des sommets très proches (< 0.12 m)
    for (let i = 0; i < processed.length; i++) {
      for (let j = i + 1; j < processed.length; j++) {
        for (const pt1 of [processed[i].start, processed[i].end]) {
          for (const pt2 of [processed[j].start, processed[j].end]) {
            if (SnappingEngine.distance(pt1, pt2) < 0.12) {
              pt2.x = pt1.x;
              pt2.y = pt1.y;
            }
          }
        }
      }
    }

    // 2. Fusion des murs colinéaires consécutifs partageant un sommet
    let mergedSomething = true;
    let iteration = 0;

    while (mergedSomething && iteration < 5) {
      mergedSomething = false;
      iteration++;

      for (let i = 0; i < processed.length; i++) {
        const w1 = processed[i];
        if (!w1) continue;

        for (let j = i + 1; j < processed.length; j++) {
          const w2 = processed[j];
          if (!w2) continue;

          // Vérifier si les deux murs partagent un sommet
          const v1x = w1.end.x - w1.start.x;
          const v1y = w1.end.y - w1.start.y;
          const len1 = Math.sqrt(v1x * v1x + v1y * v1y);

          const v2x = w2.end.x - w2.start.x;
          const v2y = w2.end.y - w2.start.y;
          const len2 = Math.sqrt(v2x * v2x + v2y * v2y);

          if (len1 === 0 || len2 === 0) continue;

          // Produit scalaire pour colinéarité
          const dot = (v1x * v2x + v1y * v2y) / (len1 * len2);
          const isCollinear = Math.abs(dot) > 0.995; // angle < 5 degrés

          if (isCollinear) {
            if (SnappingEngine.distance(w1.end, w2.start) < 0.05) {
              w1.end = { ...w2.end };
              processed.splice(j, 1);
              mergedSomething = true;
              break;
            } else if (SnappingEngine.distance(w1.end, w2.end) < 0.05) {
              w1.end = { ...w2.start };
              processed.splice(j, 1);
              mergedSomething = true;
              break;
            } else if (SnappingEngine.distance(w1.start, w2.end) < 0.05) {
              w1.start = { ...w2.start };
              processed.splice(j, 1);
              mergedSomething = true;
              break;
            } else if (SnappingEngine.distance(w1.start, w2.start) < 0.05) {
              w1.start = { ...w2.end };
              processed.splice(j, 1);
              mergedSomething = true;
              break;
            }
          }
        }
      }
    }

    return processed;
  }

  /**
   * Détecte les portes (depuis les arcs ou segments marqués) et les fenêtres
   */
  private static detectOpenings(
    arcs: RawArc[],
    segments: RawSegment[],
    walls: Wall[],
    viewBox: { x: number; y: number; width: number; height: number },
    metersPerUnit: number
  ): Opening[] {
    const openings: Opening[] = [];
    if (walls.length === 0) return openings;

    // 1. Portes depuis les arcs de battement (quart de cercle classique en architecture)
    for (const arc of arcs) {
      const radiusMeters = Math.max(arc.rx, arc.ry) * metersPerUnit;
      if (radiusMeters < 0.50 || radiusMeters > 1.40) continue;

      const pStart: Point = {
        x: (arc.start.x - viewBox.x) * metersPerUnit,
        y: (arc.start.y - viewBox.y) * metersPerUnit
      };
      const pEnd: Point = {
        x: (arc.end.x - viewBox.x) * metersPerUnit,
        y: (arc.end.y - viewBox.y) * metersPerUnit
      };

      // Le pivot de la porte est soit au début, soit à la fin de l'arc
      const snapStart = SnappingEngine.snapPointToWall(pStart, walls, 0.75);
      const snapEnd = SnappingEngine.snapPointToWall(pEnd, walls, 0.75);

      const bestSnap = (snapStart && (!snapEnd || snapStart.distance < snapEnd.distance)) ? snapStart : snapEnd;

      if (bestSnap && bestSnap.distance < 0.70) {
        const doorWidth = SnappingEngine.roundMeters(Math.min(Math.max(radiusMeters, 0.73), 1.10));
        const offset = SnappingEngine.roundMeters(bestSnap.offset);

        // Éviter les doublons
        const exists = openings.some(
          op => op.wallId === bestSnap.wall.id && Math.abs(op.offset - offset) < 0.35
        );

        if (!exists) {
          openings.push({
            id: `op_door_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            wallId: bestSnap.wall.id,
            type: 'door',
            offset,
            width: doorWidth,
            flipSide: false,
            flipDirection: false
          });
        }
      }
    }

    // 2. Fenêtres et Portes depuis les segments balisés sémantiquement
    for (const seg of segments) {
      if ((!seg.isWindowHint && !seg.isDoorHint) || seg.isMeasurementLine) continue;

      const p1: Point = {
        x: (seg.start.x - viewBox.x) * metersPerUnit,
        y: (seg.start.y - viewBox.y) * metersPerUnit
      };
      const p2: Point = {
        x: (seg.end.x - viewBox.x) * metersPerUnit,
        y: (seg.end.y - viewBox.y) * metersPerUnit
      };

      const midPt: Point = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
      const segWidth = SnappingEngine.distance(p1, p2);

      if (segWidth < 0.40 || segWidth > 3.0) continue;

      const snap = SnappingEngine.snapPointToWall(midPt, walls, 0.60);
      if (snap && snap.distance < 0.50) {
        const type: OpeningType = seg.isDoorHint ? 'door' : (segWidth > 1.8 ? 'french_window' : 'window');
        const offset = SnappingEngine.roundMeters(snap.offset);

        const exists = openings.some(
          op => op.wallId === snap.wall.id && Math.abs(op.offset - offset) < 0.35
        );

        if (!exists) {
          openings.push({
            id: `op_${type}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            wallId: snap.wall.id,
            type,
            offset,
            width: SnappingEngine.roundMeters(segWidth),
            flipSide: false,
            flipDirection: false
          });
        }
      }
    }

    return openings;
  }

  /**
   * Détecte les pièces (Rooms) et associe automatiquement les étiquettes de texte
   */
  private static detectRooms(
    polygons: RawPolygon[],
    walls: Wall[],
    textLabels: RawTextLabel[],
    viewBox: { x: number; y: number; width: number; height: number },
    metersPerUnit: number,
    defaultHeight: number,
    useTextLabels: boolean = true
  ): Room[] {
    const rooms: Room[] = [];

    // Convertir les étiquettes de texte en mètres
    const worldLabels = textLabels.map(tl => ({
      text: tl.text,
      position: {
        x: (tl.position.x - viewBox.x) * metersPerUnit,
        y: (tl.position.y - viewBox.y) * metersPerUnit
      }
    }));

    // 1. À partir des polygones SVG explicites
    for (const poly of polygons) {
      if (poly.points.length < 3) continue;

      const worldPolygon = poly.points.map(p => ({
        x: SnappingEngine.roundMeters((p.x - viewBox.x) * metersPerUnit),
        y: SnappingEngine.roundMeters((p.y - viewBox.y) * metersPerUnit)
      }));

      const area = PolygonUtils.computeArea(worldPolygon);
      // Doit avoir une surface réaliste pour une pièce (1.5 m² à 300 m²)
      if (area < 1.5 || area > 300) continue;

      // Chercher une étiquette de texte située à l'intérieur
      let roomName = '';
      if (useTextLabels) {
        for (const label of worldLabels) {
          if (PolygonUtils.isPointInPolygon(label.position, worldPolygon)) {
            roomName = label.text;
            break;
          }
        }
      }

      if (!roomName && !poly.isRoomHint) continue;

      const finalName = roomName || `Pièce ${rooms.length + 1}`;
      const style = this.getRoomStyle(finalName);

      rooms.push({
        id: `room_svg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        name: finalName,
        polygon: worldPolygon,
        areaM2: area,
        color: style.color,
        icon: style.icon,
        height: defaultHeight
      });
    }

    // 2. Si aucune pièce n'a été détectée via polygones mais qu'on a des étiquettes de texte
    //    et des murs formants des contours, on attribue les étiquettes
    if (rooms.length === 0 && worldLabels.length > 0 && walls.length >= 4 && useTextLabels) {
      for (const label of worldLabels) {
        const lower = label.text.toLowerCase();
        if (/salon|sejour|chambre|cuisine|sdb|bain|wc|bureau|entree|garage|couloir/i.test(lower)) {
          // Définir une boîte englobante locale autour du label (ex: 3.5m x 3.5m)
          const cx = label.position.x;
          const cy = label.position.y;
          const half = 1.8;
          const poly: Point[] = [
            { x: SnappingEngine.roundMeters(cx - half), y: SnappingEngine.roundMeters(cy - half) },
            { x: SnappingEngine.roundMeters(cx + half), y: SnappingEngine.roundMeters(cy - half) },
            { x: SnappingEngine.roundMeters(cx + half), y: SnappingEngine.roundMeters(cy + half) },
            { x: SnappingEngine.roundMeters(cx - half), y: SnappingEngine.roundMeters(cy + half) }
          ];

          const style = this.getRoomStyle(label.text);
          rooms.push({
            id: `room_svg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            name: label.text,
            polygon: poly,
            areaM2: PolygonUtils.computeArea(poly),
            color: style.color,
            icon: style.icon,
            height: defaultHeight
          });
        }
      }
    }

    return rooms;
  }

  /**
   * Associe un nom de pièce à une couleur thématique et une icône MDI
   */
  private static getRoomStyle(name: string): { color: string; icon: string } {
    const n = name.toLowerCase();
    if (/salon|sejour|living|sam|salle à manger/i.test(n)) {
      return { color: 'rgba(59, 130, 246, 0.28)', icon: 'mdi:sofa' };
    }
    if (/chambre|bed|suite|parentale/i.test(n)) {
      return { color: 'rgba(139, 92, 246, 0.28)', icon: 'mdi:bed' };
    }
    if (/cuisine|kitchen/i.test(n)) {
      return { color: 'rgba(245, 158, 11, 0.28)', icon: 'mdi:silverware-fork-knife' };
    }
    if (/sdb|bain|douche|bath|eau/i.test(n)) {
      return { color: 'rgba(6, 182, 212, 0.28)', icon: 'mdi:shower' };
    }
    if (/wc|toilet/i.test(n)) {
      return { color: 'rgba(16, 185, 129, 0.28)', icon: 'mdi:toilet' };
    }
    if (/bureau|office|travail/i.test(n)) {
      return { color: 'rgba(99, 102, 241, 0.28)', icon: 'mdi:desk' };
    }
    if (/entree|entrée|hall|couloir|degagement|dégagement/i.test(n)) {
      return { color: 'rgba(100, 116, 139, 0.28)', icon: 'mdi:door' };
    }
    if (/garage|atelier/i.test(n)) {
      return { color: 'rgba(120, 113, 108, 0.28)', icon: 'mdi:garage' };
    }
    if (/terrasse|balcon|patio/i.test(n)) {
      return { color: 'rgba(20, 184, 166, 0.28)', icon: 'mdi:balcony' };
    }
    return { color: 'rgba(56, 189, 248, 0.25)', icon: 'mdi:home-outline' };
  }
}
