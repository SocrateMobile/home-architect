import { describe, expect, it } from 'vitest';
import {
  autoPlaceCalibrationPoints,
  buildRadarConeSvgPath,
  collectRadarEntityIds,
  computeAffineMatrix,
  discoverRadarEntities,
  extractRadarCandidatePrefixes,
  isLikelyRadarBinding,
  projectRadarPointToPlan,
  readLiveRadarTargets,
  readTargetRawState,
} from '../../src/core/radar';
import { EntityBinding, Point, RadarCalibrationPoint, RadarConfig, Room } from '../../src/core/types';
import { normalizeProject } from '../../src/core/project-model';

describe('Radar Discovery Engine', () => {
  it('extracts candidate prefixes from various sensor names', () => {
    const prefixes = extractRadarCandidatePrefixes('binary_sensor.d1_mini_radar_salon2_presence_humaine');
    expect(prefixes).toContain('d1_mini_radar_salon2');

    const cuisine = extractRadarCandidatePrefixes('binary_sensor.0_wemo_radar_cuisine_presence');
    expect(cuisine).toContain('0_wemo_radar_cuisine');

    const arrosage = extractRadarCandidatePrefixes('sensor.gpioarrosagev6_radar_cible_1_x');
    expect(arrosage).toContain('gpioarrosagev6');
  });

  it('discovers 3 targets and threshold entity from Home Assistant states', () => {
    const mockStates: Record<string, { state: string }> = {
      'binary_sensor.d1_mini_radar_salon2_presence': { state: 'on' },
      'sensor.d1_mini_radar_salon2_cible_1_x': { state: '1200' },
      'sensor.d1_mini_radar_salon2_cible_1_y': { state: '2500' },
      'sensor.d1_mini_radar_salon2_cible_1_distance': { state: '2773' },
      'sensor.d1_mini_radar_salon2_cible_1_resolution': { state: '450' },
      'sensor.d1_mini_radar_salon2_cible_2_x': { state: '-800' },
      'sensor.d1_mini_radar_salon2_cible_2_y': { state: '1800' },
      'sensor.d1_mini_radar_salon2_cible_2_distance': { state: '1970' },
      'sensor.d1_mini_radar_salon2_cible_2_resolution': { state: '210' },
      'sensor.d1_mini_radar_salon2_cible_3_x': { state: '0' },
      'sensor.d1_mini_radar_salon2_cible_3_y': { state: '0' },
      'sensor.d1_mini_radar_salon2_cible_3_distance': { state: '0' },
      'sensor.d1_mini_radar_salon2_cible_3_resolution': { state: '0' },
      'number.d1_mini_radar_salon2_seuil_de_resolution_humain': { state: '320' },
    };

    const result = discoverRadarEntities('binary_sensor.d1_mini_radar_salon2_presence', mockStates);
    expect(result.targets).toHaveLength(3);
    expect(result.targets[0].xEntityId).toBe('sensor.d1_mini_radar_salon2_cible_1_x');
    expect(result.targets[0].yEntityId).toBe('sensor.d1_mini_radar_salon2_cible_1_y');
    expect(result.targets[0].distanceEntityId).toBe('sensor.d1_mini_radar_salon2_cible_1_distance');
    expect(result.targets[0].resolutionEntityId).toBe('sensor.d1_mini_radar_salon2_cible_1_resolution');
    expect(result.thresholdEntityId).toBe('number.d1_mini_radar_salon2_seuil_de_resolution_humain');
  });

  it('discovers targets via device_id registry even with custom, mismatched names', () => {
    const mockEntities = {
      'binary_sensor.custom_livingroom_presence_detector': {
        entity_id: 'binary_sensor.custom_livingroom_presence_detector',
        device_id: 'dev_radar_123',
      },
      'sensor.ld2450_hardware_target_1_x': {
        entity_id: 'sensor.ld2450_hardware_target_1_x',
        device_id: 'dev_radar_123',
      },
      'sensor.ld2450_hardware_target_1_y': {
        entity_id: 'sensor.ld2450_hardware_target_1_y',
        device_id: 'dev_radar_123',
      },
      'sensor.ld2450_hardware_target_1_dist': {
        entity_id: 'sensor.ld2450_hardware_target_1_dist',
        device_id: 'dev_radar_123',
      },
      'number.ld2450_hardware_resolution_threshold': {
        entity_id: 'number.ld2450_hardware_resolution_threshold',
        device_id: 'dev_radar_123',
      },
      'sensor.another_device_x': {
        entity_id: 'sensor.another_device_x',
        device_id: 'dev_other_999',
      },
    };

    const mockStates: Record<string, { state: string }> = {
      'binary_sensor.custom_livingroom_presence_detector': { state: 'on' },
      'sensor.ld2450_hardware_target_1_x': { state: '1500' },
      'sensor.ld2450_hardware_target_1_y': { state: '2200' },
      'sensor.ld2450_hardware_target_1_dist': { state: '2662' },
      'number.ld2450_hardware_resolution_threshold': { state: '350' },
      'sensor.another_device_x': { state: '999' },
    };

    const result = discoverRadarEntities(
      'binary_sensor.custom_livingroom_presence_detector',
      mockStates,
      mockEntities
    );

    expect(result.deviceId).toBe('dev_radar_123');
    expect(result.targets).toHaveLength(1);
    expect(result.targets[0].xEntityId).toBe('sensor.ld2450_hardware_target_1_x');
    expect(result.targets[0].yEntityId).toBe('sensor.ld2450_hardware_target_1_y');
    expect(result.targets[0].distanceEntityId).toBe('sensor.ld2450_hardware_target_1_dist');
    expect(result.thresholdEntityId).toBe('number.ld2450_hardware_resolution_threshold');
  });

  it('discovers English target coordinates and thresholds', () => {
    const mockStates: Record<string, { state: string }> = {
      'binary_sensor.office_radar_motion': { state: 'on' },
      'sensor.office_radar_target_1_x_coordinate': { state: '800' },
      'sensor.office_radar_target_1_y_coordinate': { state: '1400' },
      'sensor.office_radar_target_1_distance': { state: '1612' },
      'number.office_radar_human_threshold': { state: '300' },
    };

    const result = discoverRadarEntities('binary_sensor.office_radar_motion', mockStates);
    expect(result.targets).toHaveLength(1);
    expect(result.targets[0].xEntityId).toBe('sensor.office_radar_target_1_x_coordinate');
    expect(result.targets[0].yEntityId).toBe('sensor.office_radar_target_1_y_coordinate');
    expect(result.thresholdEntityId).toBe('number.office_radar_human_threshold');
  });

  it('detects likely radar bindings accurately', () => {
    expect(isLikelyRadarBinding({ id: 'b1', entityId: 'binary_sensor.radar_cuisine', position: { x: 1, y: 1 } })).toBe(true);
    expect(isLikelyRadarBinding({ id: 'b2', entityId: 'light.salon', position: { x: 1, y: 1 } })).toBe(false);
  });
});

describe('Radar 2D Affine & Geometric Projection', () => {
  it('solves exact 2D affine transformation on 4 rectangular room corners', () => {
    // Supposons un radar placé en (2.0, 4.0) orienté vers le haut (0°)
    // Un rectangle de 4m x 3m allant de X=0..4, Y=1..4
    // Coin 1 (bas-gauche) : plan (0, 4) -> radar (-2000, 0)
    // Coin 2 (bas-droite) : plan (4, 4) -> radar (2000, 0)
    // Coin 3 (haut-droite) : plan (4, 1) -> radar (2000, 3000)
    // Coin 4 (haut-gauche) : plan (0, 1) -> radar (-2000, 3000)
    const points: RadarCalibrationPoint[] = [
      { id: 'c1', label: 'Coin 1', radarMm: { x: -2000, y: 0 }, planMeters: { x: 0, y: 4 } },
      { id: 'c2', label: 'Coin 2', radarMm: { x: 2000, y: 0 }, planMeters: { x: 4, y: 4 } },
      { id: 'c3', label: 'Coin 3', radarMm: { x: 2000, y: 3000 }, planMeters: { x: 4, y: 1 } },
      { id: 'c4', label: 'Coin 4', radarMm: { x: -2000, y: 3000 }, planMeters: { x: 0, y: 1 } },
    ];

    const matrix = computeAffineMatrix(points);
    expect(matrix).toBeDefined();
    if (!matrix) return;

    const testConfig: RadarConfig = {
      enabled: true,
      orientationDeg: 0,
      heightMeters: 1.2,
      fovDeg: 120,
      maxRangeMeters: 6,
      showCone: true,
      targets: [],
      calibrationPoints: points,
      affineMatrix: matrix,
    };

    // Tester les 4 coins
    for (const pt of points) {
      const proj = projectRadarPointToPlan(pt.radarMm, { x: 2, y: 4 }, testConfig);
      expect(proj.x).toBeCloseTo(pt.planMeters.x, 2);
      expect(proj.y).toBeCloseTo(pt.planMeters.y, 2);
    }

    // Tester le centre de la pièce : radar (0, 1500) -> plan (2, 2.5)
    const center = projectRadarPointToPlan({ x: 0, y: 1500 }, { x: 2, y: 4 }, testConfig);
    expect(center.x).toBeCloseTo(2.0, 2);
    expect(center.y).toBeCloseTo(2.5, 2);
  });

  it('supports L-shaped rooms with 6 corners', () => {
    // Pièce en L avec 6 sommets
    const points: RadarCalibrationPoint[] = [
      { id: 'c1', label: 'Coin 1', radarMm: { x: -2000, y: 0 }, planMeters: { x: 0, y: 5 } },
      { id: 'c2', label: 'Coin 2', radarMm: { x: 3000, y: 0 }, planMeters: { x: 5, y: 5 } },
      { id: 'c3', label: 'Coin 3', radarMm: { x: 3000, y: 2000 }, planMeters: { x: 5, y: 3 } },
      { id: 'c4', label: 'Coin 4', radarMm: { x: 0, y: 2000 }, planMeters: { x: 2, y: 3 } },
      { id: 'c5', label: 'Coin 5', radarMm: { x: 0, y: 5000 }, planMeters: { x: 2, y: 0 } },
      { id: 'c6', label: 'Coin 6', radarMm: { x: -2000, y: 5000 }, planMeters: { x: 0, y: 0 } },
    ];

    const matrix = computeAffineMatrix(points);
    expect(matrix).toBeDefined();
    if (!matrix) return;

    for (const pt of points) {
      const proj = projectRadarPointToPlan(pt.radarMm, { x: 2, y: 5 }, {
        enabled: true,
        orientationDeg: 0,
        heightMeters: 1.2,
        fovDeg: 120,
        maxRangeMeters: 6,
        showCone: true,
        targets: [],
        calibrationPoints: points,
        affineMatrix: matrix,
      });
      expect(proj.x).toBeCloseTo(pt.planMeters.x, 2);
      expect(proj.y).toBeCloseTo(pt.planMeters.y, 2);
    }
  });

  it('projects geometrically when uncalibrated', () => {
    const radarPos: Point = { x: 2.0, y: 2.0 };
    // Radar orienté vers le bas (180° = Sud, Y positif)
    const config: RadarConfig = {
      enabled: true,
      orientationDeg: 180,
      heightMeters: 1.2,
      fovDeg: 120,
      maxRangeMeters: 6,
      showCone: true,
      targets: [],
      calibrationPoints: [],
    };

    // Une cible devant à 2 mètres (X=0, Y=2000 mm)
    const target = projectRadarPointToPlan({ x: 0, y: 2000 }, radarPos, config);
    expect(target.x).toBeCloseTo(2.0, 2);
    expect(target.y).toBeCloseTo(4.0, 2); // 2.0 + 2.0
  });

  it('snaps captured corners automatically to room polygon vertices', () => {
    const room: Room = {
      id: 'r1',
      name: 'Salon',
      areaM2: 20,
      polygon: [
        { x: 0, y: 0 },
        { x: 4, y: 0 },
        { x: 4, y: 5 },
        { x: 0, y: 5 },
      ],
    };

    const radarPos: Point = { x: 2, y: 5 };
    const captured = [
      { id: 'cp1', label: 'Coin 1', radarMm: { x: -1900, y: 4800 } }, // Proche de (0,0)
      { id: 'cp2', label: 'Coin 2', radarMm: { x: 1900, y: 4900 } },  // Proche de (4,0)
      { id: 'cp3', label: 'Coin 3', radarMm: { x: 1900, y: 150 } },   // Proche de (4,5)
      { id: 'cp4', label: 'Coin 4', radarMm: { x: -1900, y: 150 } },  // Proche de (0,5)
    ];

    const placed = autoPlaceCalibrationPoints(captured, radarPos, { orientationDeg: 0, heightMeters: 1.2 }, room);
    expect(placed).toHaveLength(4);
    expect(placed[0].planMeters).toEqual({ x: 0, y: 0 });
    expect(placed[1].planMeters).toEqual({ x: 4, y: 0 });
    expect(placed[2].planMeters).toEqual({ x: 4, y: 5 });
    expect(placed[3].planMeters).toEqual({ x: 0, y: 5 });
  });
});

describe('Live Target Tracking & Anti-Ghosting', () => {
  it('filters out ghost targets when distance is 0 or NaN or (0,0)', () => {
    const targetConfig = {
      xEntityId: 'sensor.radar_cible_1_x',
      yEntityId: 'sensor.radar_cible_1_y',
      distanceEntityId: 'sensor.radar_cible_1_distance',
    };

    const ghostStates = {
      'sensor.radar_cible_1_x': { state: '0' },
      'sensor.radar_cible_1_y': { state: '0' },
      'sensor.radar_cible_1_distance': { state: '0' },
    };

    const state = readTargetRawState(targetConfig, { defaultThresholdMm: 320 }, ghostStates);
    expect(state.active).toBe(false);
  });

  it('classifies Human vs Cat/Animal based on resolution and threshold', () => {
    const targetConfig = {
      xEntityId: 'sensor.radar_cible_1_x',
      yEntityId: 'sensor.radar_cible_1_y',
      distanceEntityId: 'sensor.radar_cible_1_distance',
      resolutionEntityId: 'sensor.radar_cible_1_resolution',
    };

    const statesHuman = {
      'sensor.radar_cible_1_x': { state: '500' },
      'sensor.radar_cible_1_y': { state: '2000' },
      'sensor.radar_cible_1_distance': { state: '2061' },
      'sensor.radar_cible_1_resolution': { state: '480' },
    };

    const human = readTargetRawState(targetConfig, { defaultThresholdMm: 320 }, statesHuman);
    expect(human.active).toBe(true);
    expect(human.kind).toBe('human');

    const statesCat = {
      'sensor.radar_cible_1_x': { state: '500' },
      'sensor.radar_cible_1_y': { state: '2000' },
      'sensor.radar_cible_1_distance': { state: '2061' },
      'sensor.radar_cible_1_resolution': { state: '180' },
    };

    const cat = readTargetRawState(targetConfig, { defaultThresholdMm: 320 }, statesCat);
    expect(cat.active).toBe(true);
    expect(cat.kind).toBe('animal');
  });

  it('reads active live targets for an EntityBinding', () => {
    const binding: EntityBinding = {
      id: 'b_radar',
      entityId: 'binary_sensor.radar_salon',
      position: { x: 2, y: 4 },
      radarConfig: {
        enabled: true,
        orientationDeg: 0,
        heightMeters: 1.2,
        fovDeg: 120,
        maxRangeMeters: 6,
        showCone: true,
        targets: [
          {
            xEntityId: 'sensor.radar_cible_1_x',
            yEntityId: 'sensor.radar_cible_1_y',
            distanceEntityId: 'sensor.radar_cible_1_distance',
            resolutionEntityId: 'sensor.radar_cible_1_resolution',
          },
          {
            xEntityId: 'sensor.radar_cible_2_x',
            yEntityId: 'sensor.radar_cible_2_y',
            distanceEntityId: 'sensor.radar_cible_2_distance',
            resolutionEntityId: 'sensor.radar_cible_2_resolution',
          },
        ],
        calibrationPoints: [],
      },
    };

    const states = {
      'sensor.radar_cible_1_x': { state: '1000' },
      'sensor.radar_cible_1_y': { state: '2000' },
      'sensor.radar_cible_1_distance': { state: '2236' },
      'sensor.radar_cible_1_resolution': { state: '450' },
      'sensor.radar_cible_2_x': { state: '0' },
      'sensor.radar_cible_2_y': { state: '0' },
      'sensor.radar_cible_2_distance': { state: '0' },
      'sensor.radar_cible_2_resolution': { state: '0' },
    };

    const live = readLiveRadarTargets(binding, states);
    expect(live).toHaveLength(1);
    expect(live[0].label).toBe('Cible 1');
    expect(live[0].kind).toBe('human');
    expect(live[0].icon).toBe('👤');
  });
});

describe('Project Model Normalization', () => {
  it('preserves and normalizes radarConfig on EntityBinding', () => {
    const rawProject = {
      id: 'plan_test123',
      name: 'Plan Test',
      walls: [],
      openings: [],
      rooms: [],
      bindings: [
        {
          id: 'bind_radar',
          entityId: 'binary_sensor.d1_mini_radar_salon2_presence',
          position: { x: 2.5, y: 3.5 },
          radarConfig: {
            enabled: true,
            orientationDeg: 90,
            heightMeters: 1.35,
            showCone: true,
            targets: [
              {
                xEntityId: 'sensor.d1_mini_radar_salon2_cible_1_x',
                yEntityId: 'sensor.d1_mini_radar_salon2_cible_1_y',
                distanceEntityId: 'sensor.d1_mini_radar_salon2_cible_1_distance',
              },
            ],
            calibrationPoints: [
              {
                id: 'cp1',
                label: 'Coin 1',
                radarMm: { x: -1500, y: 2500 },
                planMeters: { x: 0.5, y: 1.0 },
              },
            ],
          },
        },
      ],
    };

    const normalized = normalizeProject(rawProject);
    const b = normalized.bindings[0];
    expect(b.radarConfig).toBeDefined();
    expect(b.radarConfig?.orientationDeg).toBe(90);
    expect(b.radarConfig?.heightMeters).toBe(1.35);
    expect(b.radarConfig?.targets).toHaveLength(1);
    expect(b.radarConfig?.calibrationPoints).toHaveLength(1);
    expect(b.radarConfig?.calibrationPoints[0].planMeters).toEqual({ x: 0.5, y: 1.0 });

    const entityIds = collectRadarEntityIds(b.radarConfig);
    expect(entityIds).toContain('sensor.d1_mini_radar_salon2_cible_1_x');
    expect(entityIds).toContain('sensor.d1_mini_radar_salon2_cible_1_y');
    expect(entityIds).toContain('sensor.d1_mini_radar_salon2_cible_1_distance');
  });

  it('generates valid SVG path for radar detection cone', () => {
    const path = buildRadarConeSvgPath(100, 100, 50, 0, 120);
    expect(path).toContain('M 100 100');
    expect(path).toContain('A 50 50');
    expect(path).toContain('Z');
  });

  it('preserves affine calibration coherence when translating or scaling a plan', async () => {
    const { translateSelection } = await import('../../src/canvas/editing');
    const { scalePlan } = await import('../../src/panel/plan-edits');

    const points: RadarCalibrationPoint[] = [
      { id: 'c1', label: 'Coin 1', radarMm: { x: -2000, y: 0 }, planMeters: { x: 0, y: 4 } },
      { id: 'c2', label: 'Coin 2', radarMm: { x: 2000, y: 0 }, planMeters: { x: 4, y: 4 } },
      { id: 'c3', label: 'Coin 3', radarMm: { x: 2000, y: 3000 }, planMeters: { x: 4, y: 1 } },
      { id: 'c4', label: 'Coin 4', radarMm: { x: -2000, y: 3000 }, planMeters: { x: 0, y: 1 } },
    ];
    const affineMatrix = computeAffineMatrix(points)!;

    const project = normalizeProject({
      id: 'plan_trans',
      name: 'Plan Trans',
      walls: [],
      openings: [],
      rooms: [],
      bindings: [
        {
          id: 'b_radar',
          entityId: 'binary_sensor.radar_salon',
          position: { x: 2, y: 4 },
          radarConfig: {
            enabled: true,
            orientationDeg: 0,
            heightMeters: 1.2,
            fovDeg: 120,
            maxRangeMeters: 6,
            showCone: true,
            targets: [],
            calibrationPoints: points,
            affineMatrix,
          },
        },
      ],
    });

    // 1. Translation de (+3m, -2m)
    const translated = translateSelection(
      project,
      { wallIds: [], roomIds: [], furnitureIds: [], bindingIds: ['b_radar'] },
      { x: 3, y: -2 }
    )!;
    const tb = translated.bindings[0];
    const projTranslated = projectRadarPointToPlan({ x: 0, y: 1500 }, tb.position, tb.radarConfig!);
    expect(projTranslated.x).toBeCloseTo(2.0 + 3, 2);
    expect(projTranslated.y).toBeCloseTo(2.5 - 2, 2);

    // 2. Mise à l'échelle x2 autour de (0, 0)
    const { project: scaled } = scalePlan(project, 2, { adjustBackground: false });
    const sb = scaled.bindings[0];
    const projScaled = projectRadarPointToPlan({ x: 0, y: 1500 }, sb.position, sb.radarConfig!);
    expect(projScaled.x).toBeCloseTo(2.0 * 2, 2);
    expect(projScaled.y).toBeCloseTo(2.5 * 2, 2);
  });

  it('supports EMA anti-jitter smoothing, multi-radar fusion, inverse zone bounds, and materials', async () => {
    const {
      smoothTargetPosition,
      resetRadarSmoothingCache,
      fuseMultiRadarTargets,
      projectPlanPointToRadarMm,
      computeRadarZoneBoundsMm,
      discoverRadarZoneEntities,
    } = await import('../../src/core/radar');
    const { FLOOR_MATERIAL_CATALOG, WALL_MATERIAL_CATALOG, FURNITURE_MATERIAL_CATALOG } = await import('../../src/core/materials');

    resetRadarSmoothingCache();
    const p0 = smoothTargetPosition('r1:t0', { x: 2.0, y: 3.0 }, true);
    expect(p0).toEqual({ x: 2.0, y: 3.0 });
    // Petit jitter (5 cm) : fortement lissé
    const p1 = smoothTargetPosition('r1:t0', { x: 2.05, y: 3.0 }, true);
    expect(p1.x).toBeGreaterThan(2.0);
    expect(p1.x).toBeLessThan(2.03);

    // Fusion multi-radars : deux cibles à 20 cm l'une de l'autre issues de 2 radars différents fusionnent
    const fused = fuseMultiRadarTargets([
      {
        bindingId: 'radar_a',
        targets: [
          {
            index: 0,
            label: 'Cible 1',
            kind: 'human',
            icon: '👤',
            color: '#38bdf8',
            radarMm: { x: 0, y: 2000 },
            distanceMm: 2000,
            resolutionMm: 450,
            thresholdMm: 320,
            planPosition: { x: 2.0, y: 3.0 },
          },
        ],
      },
      {
        bindingId: 'radar_b',
        targets: [
          {
            index: 0,
            label: 'Cible 1',
            kind: 'human',
            icon: '👤',
            color: '#38bdf8',
            radarMm: { x: 500, y: 1800 },
            distanceMm: 1868,
            resolutionMm: 440,
            thresholdMm: 320,
            planPosition: { x: 2.2, y: 3.0 },
          },
        ],
      },
    ]);
    const allFused = Array.from(fused.values()).flat();
    expect(allFused).toHaveLength(1);
    expect(allFused[0].planPosition.x).toBeCloseTo(2.1, 2);

    // Transformation inverse Plan -> Radar mm & Zones LD2450
    const cfg: RadarConfig = {
      enabled: true,
      orientationDeg: 180,
      heightMeters: 1.2,
      fovDeg: 120,
      maxRangeMeters: 6,
      showCone: true,
      targets: [],
      calibrationPoints: [],
    };
    const inv = projectPlanPointToRadarMm({ x: 3.0, y: 4.5 }, { x: 2.0, y: 2.0 }, cfg);
    expect(inv.x).toBeCloseTo(-1000, 0);
    expect(inv.y).toBeCloseTo(2500, 0);

    const bounds = computeRadarZoneBoundsMm(
      { index: 1, name: 'Zone 1', enabled: true, p1: { x: 1, y: 3 }, p2: { x: 3, y: 5 } },
      { x: 2, y: 2 },
      cfg
    );
    expect(bounds.x1).toBeLessThan(bounds.x2);
    expect(bounds.y1).toBeLessThan(bounds.y2);

    const zones = discoverRadarZoneEntities(
      'binary_sensor.d1_mini_radar_salon2_presence',
      {
        'number.d1_mini_radar_salon2_zone_1_x1': { state: '-1000' },
        'number.d1_mini_radar_salon2_zone_1_y1': { state: '500' },
        'number.d1_mini_radar_salon2_zone_1_x2': { state: '1200' },
        'number.d1_mini_radar_salon2_zone_1_y2': { state: '3000' },
      },
      { x: 2, y: 2 },
      cfg
    );
    expect(zones).toHaveLength(3);
    expect(zones[0].enabled).toBe(true);
    expect(zones[0].x1EntityId).toBe('number.d1_mini_radar_salon2_zone_1_x1');

    // Catalogues de matériaux 2D/3D et normalisation
    expect(FLOOR_MATERIAL_CATALOG.length).toBeGreaterThanOrEqual(10);
    expect(WALL_MATERIAL_CATALOG.length).toBeGreaterThanOrEqual(6);
    expect(FURNITURE_MATERIAL_CATALOG.length).toBeGreaterThanOrEqual(8);

    const projMat = normalizeProject({
      id: 'plan_mat',
      name: 'Plan Mat',
      walls: [{ id: 'w1', start: { x: 0, y: 0 }, end: { x: 4, y: 0 }, thickness: 0.2, type: 'standard', texture: 'brick' }],
      openings: [],
      rooms: [{ id: 'r1', name: 'Salon', polygon: [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 4 }], areaM2: 8, texture: 'parquet_herringbone' }],
      furniture: [{ id: 'f1', type: 'sofa_3', name: 'Canapé', category: 'living', position: { x: 2, y: 2 }, width: 2.2, length: 0.9, rotation: 0, material: 'leather' }],
      bindings: [],
    });
    expect(projMat.walls[0].texture).toBe('brick');
    expect(projMat.rooms[0].texture).toBe('parquet_herringbone');
    expect(projMat.furniture?.[0].material).toBe('leather');
  });
});

