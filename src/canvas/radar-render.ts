import { EntityBinding, Point, RadarConfig, RadarTargetConfig } from '../core/types';

export const DEFAULT_TARGET_COLORS: readonly string[] = ['#00bcd4', '#ff9800', '#e91e63'];
export const DEFAULT_RADAR_THRESHOLD_MM = 320;

export interface LiveRadarTarget {
  index: number;
  label: string;
  kind: 'human' | 'animal';
  icon: string;
  color: string;
  radarMm: Point;
  distanceMm: number;
  resolutionMm: number | null;
  thresholdMm: number;
  planPosition: Point;
}

export interface RadarStateEntry {
  state: string;
  attributes?: Record<string, unknown>;
}

export type RadarStatesMap = Record<string, RadarStateEntry | undefined>;

function parseNum(entry: RadarStateEntry | undefined): number | null {
  if (!entry || entry.state === 'unavailable' || entry.state === 'unknown') return null;
  const n = Number(entry.state);
  return Number.isFinite(n) ? n : null;
}

export function toMillimeters(
  rawValue: number,
  unitConfig: 'mm' | 'm' | 'cm' | 'auto' | undefined,
  stateEntry?: RadarStateEntry
): number {
  const mode = unitConfig ?? 'auto';
  if (mode === 'mm') return rawValue;
  if (mode === 'cm') return rawValue * 10;
  if (mode === 'm') return rawValue * 1000;

  const attrUnit = typeof stateEntry?.attributes?.unit_of_measurement === 'string'
    ? stateEntry.attributes.unit_of_measurement.trim().toLowerCase()
    : '';
  if (attrUnit === 'm' || attrUnit === 'meters' || attrUnit === 'mètres') return rawValue * 1000;
  if (attrUnit === 'cm' || attrUnit === 'centimeters') return rawValue * 10;
  if (attrUnit === 'mm' || attrUnit === 'millimeters') return rawValue;

  return rawValue;
}

export function projectRadarGeometric(
  radarMm: Point,
  radarPosition: Point,
  config: Pick<RadarConfig, 'orientationDeg' | 'heightMeters' | 'tiltDeg' | 'invertX'>
): Point {
  const invertFactor = config.invertX ? -1 : 1;
  const xSensorMeters = (radarMm.x / 1000) * invertFactor;
  let ySensorMeters = radarMm.y / 1000;

  if (config.tiltDeg && Math.abs(config.tiltDeg) > 0.01) {
    const tiltRad = (config.tiltDeg * Math.PI) / 180;
    ySensorMeters = ySensorMeters * Math.cos(tiltRad);
  }

  const alphaRad = ((config.orientationDeg ?? 180) * Math.PI) / 180;
  const sinA = Math.sin(alphaRad);
  const cosA = Math.cos(alphaRad);

  const rotatedX = xSensorMeters * cosA + ySensorMeters * sinA;
  const rotatedY = -xSensorMeters * sinA + ySensorMeters * cosA;

  return {
    x: Math.round((radarPosition.x + rotatedX) * 1000) / 1000,
    y: Math.round((radarPosition.y - rotatedY) * 1000) / 1000,
  };
}

export function projectRadarPointToPlan(
  radarMm: Point,
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
    return {
      x: Math.round((m.a * radarMm.x + m.b * radarMm.y + m.tx) * 1000) / 1000,
      y: Math.round((m.c * radarMm.x + m.d * radarMm.y + m.ty) * 1000) / 1000,
    };
  }
  return projectRadarGeometric(radarMm, radarPosition, config);
}

const smoothedTargetsCache = new Map<string, Point>();

export function smoothTargetPosition(key: string, rawPos: Point, enabled: boolean = true): Point {
  if (!enabled) {
    smoothedTargetsCache.set(key, rawPos);
    return rawPos;
  }
  const prev = smoothedTargetsCache.get(key);
  if (!prev) {
    smoothedTargetsCache.set(key, rawPos);
    return rawPos;
  }
  const stepMeters = Math.hypot(rawPos.x - prev.x, rawPos.y - prev.y);
  if (stepMeters > 2.5) {
    smoothedTargetsCache.set(key, rawPos);
    return rawPos;
  }
  const alpha = stepMeters < 0.12 ? 0.28 : stepMeters < 0.35 ? 0.55 : 0.85;
  const smoothed = {
    x: Math.round((prev.x + alpha * (rawPos.x - prev.x)) * 1000) / 1000,
    y: Math.round((prev.y + alpha * (rawPos.y - prev.y)) * 1000) / 1000,
  };
  smoothedTargetsCache.set(key, smoothed);
  return smoothed;
}

export function resetRadarSmoothingCache(): void {
  smoothedTargetsCache.clear();
}

export function readTargetRawState(
  target: RadarTargetConfig | undefined,
  config: Pick<RadarConfig, 'coordinateUnit' | 'thresholdEntityId' | 'defaultThresholdMm'>,
  states: RadarStatesMap | undefined
): {
  active: boolean;
  radarMm: Point;
  distanceMm: number;
  resolutionMm: number | null;
  thresholdMm: number;
  kind: 'human' | 'animal';
} {
  const defaultThreshold = config.defaultThresholdMm ?? DEFAULT_RADAR_THRESHOLD_MM;
  const thresholdVal = config.thresholdEntityId ? parseNum(states?.[config.thresholdEntityId]) : null;
  const thresholdMm = thresholdVal !== null && thresholdVal > 0 ? thresholdVal : defaultThreshold;

  if (!target || !states) {
    return {
      active: false,
      radarMm: { x: 0, y: 0 },
      distanceMm: 0,
      resolutionMm: null,
      thresholdMm,
      kind: 'human',
    };
  }

  const xEntry = states[target.xEntityId];
  const yEntry = states[target.yEntityId];
  const rawX = parseNum(xEntry);
  const rawY = parseNum(yEntry);

  if (rawX === null || rawY === null) {
    return {
      active: false,
      radarMm: { x: 0, y: 0 },
      distanceMm: 0,
      resolutionMm: null,
      thresholdMm,
      kind: 'human',
    };
  }

  const xMm = toMillimeters(rawX, config.coordinateUnit, xEntry);
  const yMm = toMillimeters(rawY, config.coordinateUnit, yEntry);

  let distanceMm = Math.hypot(xMm, yMm);
  if (target.distanceEntityId) {
    const dEntry = states[target.distanceEntityId];
    const rawD = parseNum(dEntry);
    if (rawD === null || rawD <= 0) {
      return {
        active: false,
        radarMm: { x: xMm, y: yMm },
        distanceMm: 0,
        resolutionMm: null,
        thresholdMm,
        kind: 'human',
      };
    }
    distanceMm = toMillimeters(rawD, config.coordinateUnit, dEntry);
  }

  const active = distanceMm > 0 && !(Math.abs(xMm) < 1e-3 && Math.abs(yMm) < 1e-3);

  const resEntry = target.resolutionEntityId ? states[target.resolutionEntityId] : undefined;
  const rawRes = parseNum(resEntry);
  const resolutionMm = rawRes !== null ? toMillimeters(rawRes, config.coordinateUnit, resEntry) : null;

  const kind: 'human' | 'animal' =
    resolutionMm !== null && resolutionMm > 0 && resolutionMm < thresholdMm ? 'animal' : 'human';

  return {
    active,
    radarMm: { x: Math.round(xMm), y: Math.round(yMm) },
    distanceMm: Math.round(distanceMm),
    resolutionMm: resolutionMm !== null ? Math.round(resolutionMm) : null,
    thresholdMm: Math.round(thresholdMm),
    kind,
  };
}

export function readLiveRadarTargets(
  binding: EntityBinding,
  states: RadarStatesMap | undefined,
  options: { applySmoothing?: boolean } = {}
): LiveRadarTarget[] {
  const cfg = binding.radarConfig;
  if (!cfg || !cfg.enabled || !states || cfg.targets.length === 0) return [];
  const useSmoothing = options.applySmoothing === true && cfg.smoothing !== false;

  const live: LiveRadarTarget[] = [];
  cfg.targets.forEach((target, index) => {
    const cacheKey = `${binding.id}:t${index}`;
    const raw = readTargetRawState(target, cfg, states);
    if (!raw.active) {
      smoothedTargetsCache.delete(cacheKey);
      return;
    }

    const rawPlanPos = projectRadarPointToPlan(raw.radarMm, binding.position, cfg);
    const planPosition = smoothTargetPosition(cacheKey, rawPlanPos, useSmoothing);
    live.push({
      index,
      label: target.label || `Cible ${index + 1}`,
      kind: raw.kind,
      icon: raw.kind === 'animal' ? '🐱' : '👤',
      color: target.color || DEFAULT_TARGET_COLORS[index % DEFAULT_TARGET_COLORS.length],
      radarMm: raw.radarMm,
      distanceMm: raw.distanceMm,
      resolutionMm: raw.resolutionMm,
      thresholdMm: raw.thresholdMm,
      planPosition,
    });
  });

  return live;
}

export function fuseMultiRadarTargets(
  targetsByBinding: ReadonlyArray<{ bindingId: string; targets: LiveRadarTarget[] }>,
  mergeRadiusMeters: number = 0.45
): Map<string, LiveRadarTarget[]> {
  const result = new Map<string, LiveRadarTarget[]>();
  const acceptedGlobal: Array<{ bindingId: string; target: LiveRadarTarget }> = [];

  for (const entry of targetsByBinding) {
    const kept: LiveRadarTarget[] = [];
    for (const t of entry.targets) {
      const duplicate = acceptedGlobal.find(
        g =>
          g.bindingId !== entry.bindingId &&
          Math.hypot(g.target.planPosition.x - t.planPosition.x, g.target.planPosition.y - t.planPosition.y) <=
            mergeRadiusMeters
      );
      if (duplicate) {
        duplicate.target.planPosition = {
          x: Math.round(((duplicate.target.planPosition.x + t.planPosition.x) / 2) * 1000) / 1000,
          y: Math.round(((duplicate.target.planPosition.y + t.planPosition.y) / 2) * 1000) / 1000,
        };
      } else {
        kept.push(t);
        acceptedGlobal.push({ bindingId: entry.bindingId, target: t });
      }
    }
    result.set(entry.bindingId, kept);
  }

  return result;
}

export function buildRadarConeSvgPath(
  cx: number,
  cy: number,
  radiusPx: number,
  orientationDeg: number,
  fovDeg: number
): string {
  if (radiusPx <= 0 || fovDeg <= 0) return '';
  const clampedFov = Math.min(359.9, Math.max(5, fovDeg));
  const halfRad = ((clampedFov / 2) * Math.PI) / 180;
  const centerRad = ((orientationDeg - 90) * Math.PI) / 180; // En SVG : 0 rad = droite (90°), -PI/2 = haut (0°)

  const startAngle = centerRad - halfRad;
  const endAngle = centerRad + halfRad;

  const x1 = cx + radiusPx * Math.cos(startAngle);
  const y1 = cy + radiusPx * Math.sin(startAngle);
  const x2 = cx + radiusPx * Math.cos(endAngle);
  const y2 = cy + radiusPx * Math.sin(endAngle);
  const largeArc = clampedFov > 180 ? 1 : 0;

  return `M ${cx} ${cy} L ${x1} ${y1} A ${radiusPx} ${radiusPx} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}
