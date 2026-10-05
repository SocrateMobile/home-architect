import { describe, expect, it } from 'vitest';
import {
  CUSTOM_CATEGORY, CUSTOM_CATEGORY_DEF, DEFAULT_LEVEL, KNOWN_LEVELS,
  getLevel, getLevelBelow, getLevelLabel, isKnownLevel
} from '../../src/core/levels';

describe('levels', () => {
  it('liste les six niveaux connus dans l’ordre d’affichage', () => {
    expect(KNOWN_LEVELS.map(l => l.id)).toEqual(['sous-sol', 'rdc', 'etage1', 'etage2', 'etage3', 'jardin']);
    const orders = KNOWN_LEVELS.map(l => l.order);
    expect([...orders].sort((a, b) => a - b)).toEqual(orders);
    expect(new Set(KNOWN_LEVELS.map(l => l.id)).size).toBe(KNOWN_LEVELS.length);
  });

  it('conserve les libellés français actuels', () => {
    expect(KNOWN_LEVELS.map(l => l.label)).toEqual(['Sous-Sol', 'RDC', '1er Étage', '2ème Étage', '3ème Étage', 'Jardin']);
    expect(getLevel('rdc')?.fullLabel).toBe('Rez-de-Chaussée');
    expect(getLevel('jardin')?.icon).toBe('🌳');
  });

  it('expose les constantes par défaut', () => {
    expect(DEFAULT_LEVEL).toBe('rdc');
    expect(isKnownLevel(DEFAULT_LEVEL)).toBe(true);
    expect(CUSTOM_CATEGORY).toBe('autre');
    expect(CUSTOM_CATEGORY_DEF).toMatchObject({ id: 'autre', label: 'Autre', icon: '📁' });
  });

  it('isKnownLevel ne reconnaît que les niveaux de la table', () => {
    expect(isKnownLevel('etage2')).toBe(true);
    expect(isKnownLevel('autre')).toBe(false);
    expect(isKnownLevel('plan_ab12cd34')).toBe(false);
    expect(isKnownLevel('')).toBe(false);
    expect(isKnownLevel(null)).toBe(false);
    expect(isKnownLevel(undefined)).toBe(false);
  });

  it('getLevelLabel : libellé, sinon id brut, sinon « Autre »', () => {
    expect(getLevelLabel('etage1')).toBe('1er Étage');
    expect(getLevelLabel('garage')).toBe('garage');
    expect(getLevelLabel('autre')).toBe('Autre');
    expect(getLevelLabel('')).toBe('Autre');
    expect(getLevelLabel(null)).toBe('Autre');
    expect(getLevelLabel(undefined)).toBe('Autre');
  });

  it('getLevelBelow suit la pile des étages et ignore le jardin', () => {
    expect(getLevelBelow('etage3')).toBe('etage2');
    expect(getLevelBelow('etage2')).toBe('etage1');
    expect(getLevelBelow('etage1')).toBe('rdc');
    expect(getLevelBelow('rdc')).toBe('sous-sol');
    expect(getLevelBelow('sous-sol')).toBeNull();
    expect(getLevelBelow('jardin')).toBeNull();
    expect(getLevelBelow('autre')).toBeNull();
    expect(getLevelBelow(null)).toBeNull();
  });

  it('la table est figée', () => {
    expect(Object.isFrozen(KNOWN_LEVELS)).toBe(true);
    expect(Object.isFrozen(KNOWN_LEVELS[0])).toBe(true);
    expect(Object.isFrozen(CUSTOM_CATEGORY_DEF)).toBe(true);
  });
});
