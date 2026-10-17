import {
  EntityBinding,
  Point,
  RadarAffineMatrix,
  RadarCalibrationPoint,
  RadarConfig,
  RadarTargetConfig,
  RadarZoneConfig,
  Room,
} from './types';

import {
  DEFAULT_TARGET_COLORS,
  DEFAULT_RADAR_THRESHOLD_MM,
  LiveRadarTarget,
  RadarStateEntry,
  RadarStatesMap,
  toMillimeters,
  projectRadarGeometric,
  projectRadarPointToPlan,
  smoothTargetPosition,
  resetRadarSmoothingCache,
  readTargetRawState,
  readLiveRadarTargets,
  fuseMultiRadarTargets,
  buildRadarConeSvgPath,
} from '../canvas/radar-render';

export {
  DEFAULT_TARGET_COLORS,
  DEFAULT_RADAR_THRESHOLD_MM,
  toMillimeters,
  projectRadarGeometric,
  projectRadarPointToPlan,
  smoothTargetPosition,
  resetRadarSmoothingCache,
  readTargetRawState,
  readLiveRadarTargets,
  fuseMultiRadarTargets,
  buildRadarConeSvgPath,
};
export type {
  LiveRadarTarget,
  RadarStateEntry,
  RadarStatesMap,
};

export const DEFAULT_RADAR_HEIGHT_METERS = 1.20;
export const DEFAULT_RADAR_FOV_DEG = 120;
export const DEFAULT_RADAR_MAX_RANGE_METERS = 6.0;

/** Crée une configuration radar par défaut (avant auto-découverte). */
export function createDefaultRadarConfig(): RadarConfig {
  return {
    enabled: true,
    orientationDeg: 180, // Par défaut regarde vers le bas du plan (Sud = 180°)
    heightMeters: DEFAULT_RADAR_HEIGHT_METERS,
    tiltDeg: 0,
    fovDeg: DEFAULT_RADAR_FOV_DEG,
    maxRangeMeters: DEFAULT_RADAR_MAX_RANGE_METERS,
    showCone: true,
    invertX: false,
    coordinateUnit: 'auto',
    defaultThresholdMm: DEFAULT_RADAR_THRESHOLD_MM,
    targets: [],
    calibrationPoints: [],
  };
}

/**
 * Extrait les préfixes candidats d'un entity_id de radar pour rechercher automatiquement
 * ses entités associées (`cible_1_x`, `target_1_x`, `seuil_de_resolution_humain`, etc.).
 *
 * Exemples :
 * - `binary_sensor.d1_mini_radar_salon2_presence` -> `d1_mini_radar_salon2`
 * - `binary_sensor.0_wemo_radar_cuisine_presence_humaine` -> `0_wemo_radar_cuisine`
 * - `sensor.gpioarrosagev6_radar_cible_1_x` -> `gpioarrosagev6_radar`, `gpioarrosagev6`
 */
export function extractRadarCandidatePrefixes(entityId: string): string[] {
  const dot = entityId.indexOf('.');
  const objectId = dot >= 0 ? entityId.slice(dot + 1) : entityId;
  if (!objectId) return [];

  const suffixes = [
    '_presence_humaine_alongee',
    '_presence_humaine_allongee',
    '_presence_humaine_debout',
    '_presence_humaine',
    '_presence_chat_animal',
    '_presence_animale',
    '_presence_detectee',
    '_presence',
    '_occupancy',
    '_motion',
    '_moving_target',
    '_still_target',
    '_cible_1_x',
    '_cible_1_y',
    '_cible_1_distance',
    '_cible_1_resolution',
    '_target_1_x',
    '_target_1_y',
    '_target_1_distance',
    '_target_1_resolution',
    '_radar',
  ];

  const prefixes = new Set<string>();
  for (const suffix of suffixes) {
    if (objectId.endsWith(suffix) && objectId.length > suffix.length) {
      const base = objectId.slice(0, -suffix.length);
      prefixes.add(base);
      if (base.endsWith('_radar') && base.length > 6) {
        prefixes.add(base.slice(0, -6));
      } else {
        prefixes.add(`${base}_radar`);
      }
    }
  }

  prefixes.add(objectId);
  if (!objectId.endsWith('_radar')) {
    prefixes.add(`${objectId}_radar`);
  }

  return [...prefixes];
}

/**
 * Auto-découvre les entités X, Y, Distance, Résolution (Cibles 1 à 3) et le seuil Humain/Chat
 * dans `hass.states` à partir de l'entité liée sur le plan.
 */
export function discoverRadarEntities(
  entityId: string,
  states: RadarStatesMap | undefined
): { targets: RadarTargetConfig[]; thresholdEntityId?: string } {
  if (!states) return { targets: [] };
  const allIds = Object.keys(states);
  if (allIds.length === 0) return { targets: [] };

  const stateSet = new Set(allIds);
  const prefixes = extractRadarCandidatePrefixes(entityId);

  const findSensor = (candidates: string[]): string | undefined => {
    for (const c of candidates) {
      if (stateSet.has(c)) return c;
    }
    return undefined;
  };

  // Recherche par préfixes candidats d'abord
  for (const prefix of prefixes) {
    const targets: RadarTargetConfig[] = [];
    for (let i = 1; i <= 3; i++) {
      const xId = findSensor([
        `sensor.${prefix}_cible_${i}_x`,
        `sensor.${prefix}_radar_cible_${i}_x`,
        `sensor.${prefix}_target_${i}_x`,
        `sensor.${prefix}_target_${i}_x_coordinate`,
      ]);
      const yId = findSensor([
        `sensor.${prefix}_cible_${i}_y`,
        `sensor.${prefix}_radar_cible_${i}_y`,
        `sensor.${prefix}_target_${i}_y`,
        `sensor.${prefix}_target_${i}_y_coordinate`,
      ]);
      if (xId && yId) {
        const distId = findSensor([
          `sensor.${prefix}_cible_${i}_distance`,
          `sensor.${prefix}_radar_cible_${i}_distance`,
          `sensor.${prefix}_target_${i}_distance`,
        ]);
        const resId = findSensor([
          `sensor.${prefix}_cible_${i}_resolution`,
          `sensor.${prefix}_radar_cible_${i}_resolution`,
          `sensor.${prefix}_target_${i}_resolution`,
        ]);
        targets.push({
          label: `Cible ${i}`,
          xEntityId: xId,
          yEntityId: yId,
          distanceEntityId: distId,
          resolutionEntityId: resId,
          color: DEFAULT_TARGET_COLORS[(i - 1) % DEFAULT_TARGET_COLORS.length],
        });
      }
    }

    if (targets.length > 0) {
      const thresholdEntityId = findSensor([
        `number.${prefix}_seuil_de_resolution_humain`,
        `number.${prefix}_radar_seuil_de_resolution_humain`,
        `number.${prefix}_seuil_humain_chat`,
        `number.${prefix}_human_threshold`,
        `input_number.${prefix}_seuil_de_resolution_humain`,
      ]);
      return { targets, thresholdEntityId };
    }
  }

  // Repli : chercher dans tout hass.states un capteur *_cible_1_x ou *_target_1_x partageant le plus long préfixe commun
  const dot = entityId.indexOf('.');
  const obj = dot >= 0 ? entityId.slice(dot + 1) : entityId;
  const x1Regex = /^sensor\.(.+?)_(?:radar_)?(?:cible|target)_1_x$/;
  let bestPrefix: string | null = null;
  let bestScore = 0;

  for (const id of allIds) {
    const m = x1Regex.exec(id);
    if (!m) continue;
    const candidatePrefix = m[1];
    let common = 0;
    const minLen = Math.min(obj.length, candidatePrefix.length);
    while (common < minLen && obj[common] === candidatePrefix[common]) common++;
    if (common >= 4 && common > bestScore) {
      bestScore = common;
      bestPrefix = candidatePrefix;
    }
  }

  if (bestPrefix) {
    return discoverRadarEntities(`binary_sensor.${bestPrefix}_presence`, states);
  }

  return { targets: [] };
}

/**
 * Vérifie si une liaison d'entité est un radar (soit déjà configurée avec `radarConfig`,
 * soit dont le nom/id évoque un radar ou possède des entités cibles X/Y dans `hass.states`).
 */
export function isLikelyRadarBinding(binding: EntityBinding, states?: RadarStatesMap): boolean {
  if (binding.radarConfig) return true;
  const idLower = binding.entityId.toLowerCase();
  if (idLower.includes('radar') || idLower.includes('ld2450') || idLower.includes('mmwave') || idLower.includes('cible_')) {
    return true;
  }
  if (states) {
    const discovered = discoverRadarEntities(binding.entityId, states);
    if (discovered.targets.length > 0) return true;
  }
  return false;
}



/**
 * Calcule la matrice affine 2D optimale (moindres carrés) transformant les coordonnées brutes du radar `(rx, ry)` en mm
 * vers les coordonnées du plan `(px, py)` en mètres :
 *   px = a * rx + b * ry + tx
 *   py = c * rx + d * ry + ty
 *
 * - Pour N >= 3 points non colinéaires : résolution exacte par moindres carrés (supporte 3, 4, 5, 6+ coins pour pièces en L).
 * - Pour N == 2 points : transformation de similitude directe (rotation + échelle uniforme + translation).
 * - Retourne `undefined` si moins de 2 points ou si les points sont confondus.
 */
export function computeAffineMatrix(points: readonly RadarCalibrationPoint[]): RadarAffineMatrix | undefined {
  if (points.length < 2) return undefined;

  if (points.length === 2) {
    return computeSimilarityMatrix(points[0], points[1]);
  }

  // Moindres carrés : M^T * M * params = M^T * B
  // où chaque ligne i de M est [rx_i, ry_i, 1]
  let sxx = 0, sxy = 0, sx1 = 0;
  let syy = 0, sy1 = 0;
  const n = points.length;

  let spx_x = 0, spx_y = 0, spx_1 = 0;
  let spy_x = 0, spy_y = 0, spy_1 = 0;

  for (const pt of points) {
    const rx = pt.radarMm.x;
    const ry = pt.radarMm.y;
    const px = pt.planMeters.x;
    const py = pt.planMeters.y;

    sxx += rx * rx;
    sxy += rx * ry;
    sx1 += rx;
    syy += ry * ry;
    sy1 += ry;

    spx_x += px * rx;
    spx_y += px * ry;
    spx_1 += px;

    spy_x += py * rx;
    spy_y += py * ry;
    spy_1 += py;
  }

  const xParams = solve3x3(
    [
      [sxx, sxy, sx1],
      [sxy, syy, sy1],
      [sx1, sy1, n],
    ],
    [spx_x, spx_y, spx_1]
  );

  const yParams = solve3x3(
    [
      [sxx, sxy, sx1],
      [sxy, syy, sy1],
      [sx1, sy1, n],
    ],
    [spy_x, spy_y, spy_1]
  );

  if (!xParams || !yParams) {
    // Points colinéaires : repli sur similitude entre les 2 points les plus éloignés
    let bestI = 0, bestJ = 1, maxD = -1;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const d = Math.hypot(
          points[j].radarMm.x - points[i].radarMm.x,
          points[j].radarMm.y - points[i].radarMm.y
        );
        if (d > maxD) {
          maxD = d;
          bestI = i;
          bestJ = j;
        }
      }
    }
    return computeSimilarityMatrix(points[bestI], points[bestJ]);
  }

  return {
    a: xParams[0],
    b: xParams[1],
    tx: xParams[2],
    c: yParams[0],
    d: yParams[1],
    ty: yParams[2],
  };
}

function computeSimilarityMatrix(p1: RadarCalibrationPoint, p2: RadarCalibrationPoint): RadarAffineMatrix | undefined {
  const drx = p2.radarMm.x - p1.radarMm.x;
  const dry = p2.radarMm.y - p1.radarMm.y;
  const denom = drx * drx + dry * dry;
  if (denom < 1e-6) return undefined;

  const dpx = p2.planMeters.x - p1.planMeters.x;
  const dpy = p2.planMeters.y - p1.planMeters.y;

  // En tenant compte du fait que l'axe Y du radar pointe vers l'avant (et que dans le plan SVG Y pointe vers le bas),
  // on résout la similitude directe :
  const a = (dpx * drx + dpy * dry) / denom;
  const b = (dpx * dry - dpy * drx) / denom;
  const tx = p1.planMeters.x - (a * p1.radarMm.x + b * p1.radarMm.y);
  const ty = p1.planMeters.y - (-b * p1.radarMm.x + a * p1.radarMm.y);

  return { a, b, tx, c: -b, d: a, ty };
}

/** Résout un système linéaire 3x3 par élimination de Gauss avec pivot partiel. */
function solve3x3(A: number[][], B: number[]): [number, number, number] | null {
  const M = [
    [A[0][0], A[0][1], A[0][2], B[0]],
    [A[1][0], A[1][1], A[1][2], B[1]],
    [A[2][0], A[2][1], A[2][2], B[2]],
  ];

  for (let col = 0; col < 3; col++) {
    let pivotRow = col;
    let maxVal = Math.abs(M[col][col]);
    for (let row = col + 1; row < 3; row++) {
      const val = Math.abs(M[row][col]);
      if (val > maxVal) {
        maxVal = val;
        pivotRow = row;
      }
    }
    if (maxVal < 1e-11) return null;
    if (pivotRow !== col) {
      const tmp = M[col];
      M[col] = M[pivotRow];
      M[pivotRow] = tmp;
    }
    for (let row = col + 1; row < 3; row++) {
      const factor = M[row][col] / M[col][col];
      for (let k = col; k < 4; k++) {
        M[row][k] -= factor * M[col][k];
      }
    }
  }

  const x = [0, 0, 0];
  for (let i = 2; i >= 0; i--) {
    let sum = M[i][3];
    for (let j = i + 1; j < 3; j++) {
      sum -= M[i][j] * x[j];
    }
    x[i] = sum / M[i][i];
    if (!Number.isFinite(x[i])) return null;
  }
  return [x[0], x[1], x[2]];
}



/**
 * Positionne automatiquement les coins capturés au radar sur les angles de la pièce (`room.polygon`) :
 * 1. Projette d'abord chaque mesure radar via la géométrie du capteur (`projectRadarGeometric`).
 * 2. Si une pièce (`room`) avec au moins 3 sommets est associée, accroche chaque coin au sommet de la pièce
 *    le plus cohérent (en évitant que deux coins capturés distincts tombent sur le même sommet tant qu'il reste des sommets disponibles).
 * 3. L'utilisateur peut ensuite affiner manuellement par glisser-déposer n'importe quel coin sur le plan.
 */
export function autoPlaceCalibrationPoints(
  capturedPoints: ReadonlyArray<{ id: string; label: string; radarMm: Point }>,
  radarPosition: Point,
  config: Pick<RadarConfig, 'orientationDeg' | 'heightMeters' | 'tiltDeg' | 'invertX'>,
  room?: Room
): RadarCalibrationPoint[] {
  const geoPoints = capturedPoints.map(cp => ({
    ...cp,
    geoMeters: projectRadarGeometric(cp.radarMm, radarPosition, config),
  }));

  if (!room || !room.polygon || room.polygon.length < 3) {
    return geoPoints.map(p => ({
      id: p.id,
      label: p.label,
      radarMm: { ...p.radarMm },
      planMeters: { ...p.geoMeters },
    }));
  }

  const vertices = room.polygon;
  const usedVertexIndices = new Set<number>();

  return geoPoints.map(p => {
    let bestIdx = -1;
    let bestDist = Infinity;

    for (let i = 0; i < vertices.length; i++) {
      if (usedVertexIndices.has(i) && usedVertexIndices.size < vertices.length) continue;
      const d = Math.hypot(vertices[i].x - p.geoMeters.x, vertices[i].y - p.geoMeters.y);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    }

    if (bestIdx >= 0) {
      usedVertexIndices.add(bestIdx);
      return {
        id: p.id,
        label: p.label,
        radarMm: { ...p.radarMm },
        planMeters: {
          x: Math.round(vertices[bestIdx].x * 1000) / 1000,
          y: Math.round(vertices[bestIdx].y * 1000) / 1000,
        },
      };
    }

    return {
      id: p.id,
      label: p.label,
      radarMm: { ...p.radarMm },
      planMeters: { ...p.geoMeters },
    };
  });
}



/**
 * Transformation inverse Plan (mètres) -> Radar (millimètres) :
 * Convertit un point du plan 2D (ex: coin d'une zone rectangulaire dessinée sur le plan)
 * en coordonnées `(x_mm, y_mm)` dans le repère interne du radar LD2450.
 */
export function projectPlanPointToRadarMm(
  planMeters: Point,
  radarPosition: Point,
  config: RadarConfig
): Point {
  const m = config.affineMatrix;
  if (
    m &&
    Number.isFinite(m.a) &&
    Number.isFinite(m.b) &&
    Number.isFinite(m.tx) &&
    Number.isFinite(m.c) &&
    Number.isFinite(m.d) &&
    Number.isFinite(m.ty)
  ) {
    const det = m.a * m.d - m.b * m.c;
    if (Math.abs(det) > 1e-11) {
      const dx = planMeters.x - m.tx;
      const dy = planMeters.y - m.ty;
      const rx = (m.d * dx - m.b * dy) / det;
      const ry = (-m.c * dx + m.a * dy) / det;
      return {
        x: Math.round(rx),
        y: Math.round(ry),
      };
    }
  }

  // Repli géométrique inverse
  const dxMeters = planMeters.x - radarPosition.x;
  const dyMeters = planMeters.y - radarPosition.y;
  const theta = ((config.orientationDeg ?? 180) * Math.PI) / 180;
  const sinT = Math.sin(theta);
  const cosT = Math.cos(theta);

  // Inverse de : dx = x*cosT + y*sinT ; dy = x*sinT - y*cosT
  const xMeters = dxMeters * cosT + dyMeters * sinT;
  const yGroundMeters = dxMeters * sinT - dyMeters * cosT;
  const signX = config.invertX ? -1 : 1;

  return {
    x: Math.round(signX * xMeters * 1000),
    y: Math.round(Math.max(0, yGroundMeters) * 1000),
  };
}

/**
 * Découvre automatiquement les entités `number.*_zone_1_x1`, `y1`, `x2`, `y2` (Zones 1 à 3 du LD2450)
 * dans `hass.states` pour permettre leur édition graphique et leur synchronisation vers ESPHome.
 */
export function discoverRadarZoneEntities(
  primaryEntityId: string,
  states: RadarStatesMap | undefined,
  radarPosition: Point,
  config: RadarConfig
): RadarZoneConfig[] {
  const prefixes = extractRadarCandidatePrefixes(primaryEntityId);
  if (prefixes.length === 0) return [];
  const stateKeys = states ? Object.keys(states) : [];

  const findZoneNumberEntity = (zoneIndex: 1 | 2 | 3, coord: 'x1' | 'y1' | 'x2' | 'y2'): string | undefined => {
    for (const prefix of prefixes) {
      const candidates = [
        `number.${prefix}_zone_${zoneIndex}_${coord}`,
        `number.${prefix}_radar_zone_${zoneIndex}_${coord}`,
        `number.${prefix}_zone${zoneIndex}_${coord}`,
      ];
      for (const c of candidates) {
        if (states && c in states) return c;
      }
      const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`^number\\.${escapedPrefix}.*zone[_-]?${zoneIndex}[_-]?${coord}$`, 'i');
      const match = stateKeys.find(k => regex.test(k));
      if (match) return match;
    }
    return `number.${prefixes[0]}_zone_${zoneIndex}_${coord}`;
  };

  const parseNumericState = (entry: RadarStateEntry | undefined): number | null => {
    if (!entry || entry.state === 'unavailable' || entry.state === 'unknown') return null;
    const n = Number(entry.state);
    return Number.isFinite(n) ? n : null;
  };

  const zones: RadarZoneConfig[] = [];
  for (const idx of [1, 2, 3] as const) {
    const x1EntityId = findZoneNumberEntity(idx, 'x1');
    const y1EntityId = findZoneNumberEntity(idx, 'y1');
    const x2EntityId = findZoneNumberEntity(idx, 'x2');
    const y2EntityId = findZoneNumberEntity(idx, 'y2');

    const x1Val = x1EntityId ? parseNumericState(states?.[x1EntityId]) : null;
    const y1Val = y1EntityId ? parseNumericState(states?.[y1EntityId]) : null;
    const x2Val = x2EntityId ? parseNumericState(states?.[x2EntityId]) : null;
    const y2Val = y2EntityId ? parseNumericState(states?.[y2EntityId]) : null;

    const hasNonZero =
      x1Val !== null &&
      y1Val !== null &&
      x2Val !== null &&
      y2Val !== null &&
      (Math.abs(x1Val) > 0 || Math.abs(y1Val) > 0 || Math.abs(x2Val) > 0 || Math.abs(y2Val) > 0);

    const p1 = hasNonZero
      ? projectRadarPointToPlan({ x: x1Val, y: y1Val }, radarPosition, config)
      : projectRadarPointToPlan({ x: -1000 + (idx - 1) * 400, y: 1000 }, radarPosition, config);
    const p2 = hasNonZero
      ? projectRadarPointToPlan({ x: x2Val, y: y2Val }, radarPosition, config)
      : projectRadarPointToPlan({ x: 1000 + (idx - 1) * 400, y: 2500 }, radarPosition, config);

    zones.push({
      index: idx,
      name: `Zone ${idx}`,
      enabled: hasNonZero,
      p1,
      p2,
      x1EntityId,
      y1EntityId,
      x2EntityId,
      y2EntityId,
    });
  }

  return zones;
}

/**
 * Calcule les bornes `(x1, y1, x2, y2)` en millimètres (ordonnées `x1 <= x2` et `y1 <= y2`)
 * à envoyer à ESPHome pour une zone rectangulaire dessinée sur le plan.
 */
export function computeRadarZoneBoundsMm(
  zone: RadarZoneConfig,
  radarPosition: Point,
  config: RadarConfig
): { x1: number; y1: number; x2: number; y2: number } {
  const r1 = projectPlanPointToRadarMm(zone.p1, radarPosition, config);
  const r2 = projectPlanPointToRadarMm(zone.p2, radarPosition, config);
  return {
    x1: Math.min(r1.x, r2.x),
    y1: Math.max(0, Math.min(r1.y, r2.y)),
    x2: Math.max(r1.x, r2.x),
    y2: Math.max(0, Math.max(r1.y, r2.y)),
  };
}



/** Retourne tous les entity_id référencés par la configuration radar d'une liaison. */
export function collectRadarEntityIds(config: RadarConfig | undefined): string[] {
  if (!config) return [];
  const ids: string[] = [];
  if (config.thresholdEntityId) ids.push(config.thresholdEntityId);
  for (const t of config.targets) {
    if (t.xEntityId) ids.push(t.xEntityId);
    if (t.yEntityId) ids.push(t.yEntityId);
    if (t.distanceEntityId) ids.push(t.distanceEntityId);
    if (t.resolutionEntityId) ids.push(t.resolutionEntityId);
  }
  if (config.zones) {
    for (const z of config.zones) {
      if (z.x1EntityId) ids.push(z.x1EntityId);
      if (z.y1EntityId) ids.push(z.y1EntityId);
      if (z.x2EntityId) ids.push(z.x2EntityId);
      if (z.y2EntityId) ids.push(z.y2EntityId);
    }
  }
  return ids;
}

