import { describe, expect, it } from 'vitest';
import { scalePlan } from '../../src/panel/plan-edits';
import { createEmptyProject } from '../../src/core/project-model';
import { Wall, Opening, FurnitureItem, Room } from '../../src/core/types';

describe('plan-edits : scalePlan', () => {
  it('met à l\'échelle les dimensions des éléments quand scaleElements est vrai', () => {
    const base = createEmptyProject({ name: 'Test' });
    const wall: Wall = {
      id: 'w1',
      start: { x: 0, y: 0 },
      end: { x: 4, y: 0 },
      thickness: 0.20,
      type: 'standard'
    };
    const opening: Opening = {
      id: 'op1',
      wallId: 'w1',
      type: 'door',
      offset: 2.0,
      width: 0.90,
      flipSide: false,
      flipDirection: false
    };
    const furniture: FurnitureItem = {
      id: 'f1',
      type: 'table',
      name: 'Table',
      category: 'table',
      position: { x: 2, y: 2 },
      rotation: 0,
      width: 0.80,
      length: 1.40
    };
    const room: Room = {
      id: 'r1',
      name: 'Salon',
      polygon: [
        { x: 0, y: 0 },
        { x: 4, y: 0 },
        { x: 4, y: 4 },
        { x: 0, y: 4 }
      ],
      areaM2: 16
    };

    const project = {
      ...base,
      walls: [wall],
      openings: [opening],
      furniture: [furniture],
      rooms: [room]
    };

    // Doubler la taille (k = 2) avec scaleElements = true
    const outcome = scalePlan(project, 2, { adjustBackground: false, scaleElements: true });
    const scaledWall = outcome.project.walls[0];
    const scaledOp = outcome.project.openings[0];
    const scaledFurn = outcome.project.furniture?.[0];

    expect(scaledWall.thickness).toBeCloseTo(0.40, 2);
    expect(scaledOp.width).toBeCloseTo(1.80, 2);
    expect(scaledOp.offset).toBeCloseTo(4.0, 2);
    expect(scaledFurn?.width).toBeCloseTo(1.60, 2);
    expect(scaledFurn?.length).toBeCloseTo(2.80, 2);
    expect(scaledFurn?.position.x).toBeCloseTo(4.0, 2);
    expect(scaledFurn?.position.y).toBeCloseTo(4.0, 2);
  });

  it('préserve les épaisseurs et tailles d\'éléments quand scaleElements est faux', () => {
    const base = createEmptyProject({ name: 'Test' });
    const wall: Wall = {
      id: 'w1',
      start: { x: 0, y: 0 },
      end: { x: 4, y: 0 },
      thickness: 0.20,
      type: 'standard'
    };
    const opening: Opening = {
      id: 'op1',
      wallId: 'w1',
      type: 'door',
      offset: 2.0,
      width: 0.90,
      flipSide: false,
      flipDirection: false
    };
    const furniture: FurnitureItem = {
      id: 'f1',
      type: 'table',
      name: 'Table',
      category: 'table',
      position: { x: 2, y: 2 },
      rotation: 0,
      width: 0.80,
      length: 1.40
    };

    const project = {
      ...base,
      walls: [wall],
      openings: [opening],
      furniture: [furniture]
    };

    // Doubler la taille (k = 2) avec scaleElements = false
    const outcome = scalePlan(project, 2, { adjustBackground: false, scaleElements: false });
    const scaledWall = outcome.project.walls[0];
    const scaledOp = outcome.project.openings[0];
    const scaledFurn = outcome.project.furniture?.[0];

    // Les coordonnées du mur ont doublé
    expect(scaledWall.end.x).toBeCloseTo(8.0, 2);
    // Mais l'épaisseur, la largeur d'ouverture et les dimensions du meuble restent inchangées
    expect(scaledWall.thickness).toBe(0.20);
    expect(scaledOp.width).toBe(0.90);
    expect(scaledOp.offset).toBeCloseTo(4.0, 2);
    expect(scaledFurn?.width).toBe(0.80);
    expect(scaledFurn?.length).toBe(1.40);
  });
});
