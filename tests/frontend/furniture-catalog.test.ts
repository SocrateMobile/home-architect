import { render } from 'lit';
import { describe, expect, it } from 'vitest';
import {
  FURNITURE_CATALOG, FURNITURE_CATEGORY_LABELS, FURNITURE_FILTER_CATEGORIES, MIN_SYMBOL_DETAIL_PX, SymbolShape,
  findFurnitureTemplate, furnitureBounds, furnitureDisplayName, furnitureSymbolMarkup, renderFurnitureSymbol
} from '../../src/core/furniture-catalog';
import { FURNITURE_CATEGORIES } from '../../src/core/types';

const SIZES = [0.05, 0.1, 0.2, 0.35, 0.5, 0.9, 1.6, 2.2, 3.5];

/** Toutes les valeurs numériques d'une primitive. */
function numbers(s: SymbolShape): number[] {
  switch (s.kind) {
    case 'rect': return [s.x, s.y, s.w, s.h, s.r ?? 0];
    case 'ellipse': return [s.cx, s.cy, s.rx, s.ry];
    case 'line': return [s.x1, s.y1, s.x2, s.y2];
    case 'path': return s.d.flatMap(c => c.slice(1) as number[]);
  }
}

/** Dimensions qui ne doivent jamais être négatives (sinon « A negative value is not valid » dans le navigateur). */
function sizes(s: SymbolShape): number[] {
  switch (s.kind) {
    case 'rect': return [s.w, s.h, s.r ?? 0];
    case 'ellipse': return [s.rx, s.ry];
    case 'path': return s.d.flatMap(c => (c[0] === 'A' ? [c[1], c[2]] : []));
    default: return [];
  }
}

function renderToSvg(markup: string): SVGSVGElement {
  const doc = new DOMParser().parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${markup}</svg>`, 'image/svg+xml');
  return doc.documentElement as unknown as SVGSVGElement;
}

describe('catalogue', () => {
  it('types uniques, catégories connues', () => {
    const types = FURNITURE_CATALOG.map(t => t.type);
    expect(new Set(types).size).toBe(types.length);
    for (const t of FURNITURE_CATALOG) {
      expect(FURNITURE_CATEGORIES).toContain(t.category);
      expect(t.width).toBeGreaterThan(0);
      expect(t.length).toBeGreaterThan(0);
    }
  });

  it('chaque catégorie utilisée est filtrable, dont « storage » (F151)', () => {
    for (const t of FURNITURE_CATALOG) expect(FURNITURE_FILTER_CATEGORIES).toContain(t.category);
    expect(FURNITURE_FILTER_CATEGORIES).toContain('storage');
    expect(FURNITURE_CATEGORY_LABELS.storage).toBe('Rangements');
    expect(findFurnitureTemplate('wardrobe')?.category).toBe('storage');
    // Pas de filtre vide.
    for (const c of FURNITURE_FILTER_CATEGORIES) expect(FURNITURE_CATALOG.some(t => t.category === c)).toBe(true);
  });

  it('chaise renommée en nom générique, identifiant historique conservé (F172)', () => {
    const chair = findFurnitureTemplate('chair_starck');
    expect(chair?.name).toBe('Chaise médaillon transparente');
    expect(FURNITURE_CATALOG.some(t => /starck|ghost/i.test(t.name))).toBe(false);
    expect(furnitureDisplayName({ type: 'chair_starck', name: 'Chaise Starck (Ghost)' })).toBe('Chaise médaillon transparente');
    expect(furnitureDisplayName({ type: 'chair_starck', name: 'Ma chaise' })).toBe('Ma chaise');
    expect(furnitureDisplayName({ type: 'sofa_3p', name: '' })).toBe('Canapé 3 places');
    expect(furnitureDisplayName({ type: 'inconnu', name: '' })).toBe('inconnu');
  });
});

describe('primitives en mètres (F139)', () => {
  it('dimensions finies et jamais négatives, à toutes les tailles', () => {
    for (const t of FURNITURE_CATALOG) {
      for (const w of SIZES) {
        for (const l of SIZES) {
          for (const shape of t.shapes(w, l)) {
            for (const v of numbers(shape)) expect(Number.isFinite(v), `${t.type} ${w}×${l}`).toBe(true);
            for (const v of sizes(shape)) expect(v, `${t.type} ${w}×${l} ${shape.kind}`).toBeGreaterThanOrEqual(0);
            if (shape.kind === 'rect') expect(shape.r ?? 0).toBeLessThanOrEqual(Math.min(shape.w, shape.h) / 2 + 1e-12);
          }
        }
      }
    }
  });

  it('meubles rembourrés très petits : dossier et accoudoirs restent dans l’emprise', () => {
    for (const type of ['sofa_3p', 'sofa_2p', 'divan', 'divan_right', 'armchair']) {
      const t = findFurnitureTemplate(type);
      for (const w of SIZES) {
        for (const l of SIZES) {
          for (const s of t?.shapes(w, l) ?? []) {
            if (s.kind !== 'rect') continue;
            const where = `${type} ${w}×${l}`;
            expect(s.x, where).toBeGreaterThanOrEqual(-w / 2 - 1e-9);
            expect(s.x + s.w, where).toBeLessThanOrEqual(w / 2 + 1e-9);
            expect(s.y, where).toBeGreaterThanOrEqual(-l / 2 - 1e-9);
            expect(s.y + s.h, where).toBeLessThanOrEqual(l / 2 + 1e-9);
          }
        }
      }
    }
  });

  it('décors proportionnels : le symbole ne dépend pas de l’échelle d’affichage', () => {
    const sofa = findFurnitureTemplate('sofa_3p');
    const at = (ppm: number) => renderToSvg(furnitureSymbolMarkup({ type: 'sofa_3p' }, { pixelsPerMeter: ppm }));
    const small = at(50).querySelectorAll('rect');
    const large = at(200).querySelectorAll('rect');
    expect(small.length).toBe(sofa?.shapes(2.2, 0.95).length);
    expect(large.length).toBe(small.length);
    for (let i = 0; i < small.length; i++) {
      expect(Number(large[i].getAttribute('width'))).toBeCloseTo(Number(small[i].getAttribute('width')) * 4, 1);
    }
  });

  it('divan tête à droite = miroir du divan tête à gauche', () => {
    const left = findFurnitureTemplate('divan')?.shapes(1.8, 0.85) ?? [];
    const right = findFurnitureTemplate('divan_right')?.shapes(1.8, 0.85) ?? [];
    expect(right).toHaveLength(left.length);
    const headLeft = left[2] as Extract<SymbolShape, { kind: 'rect' }>;
    const headRight = right[2] as Extract<SymbolShape, { kind: 'rect' }>;
    expect(headLeft.x).toBeCloseTo(-0.9, 9);
    expect(headRight.x + headRight.w).toBeCloseTo(0.9, 9);
  });
});

describe('rendu SVG (markup)', () => {
  it('aucune valeur négative de largeur, hauteur ou rayon, même à 20 px/m (évier)', () => {
    for (const t of FURNITURE_CATALOG) {
      for (const ppm of [5, 20, 50, 400]) {
        const root = renderToSvg(furnitureSymbolMarkup({ type: t.type }, { pixelsPerMeter: ppm }));
        for (const el of Array.from(root.querySelectorAll('*'))) {
          for (const attr of ['width', 'height', 'rx', 'ry', 'r']) {
            const v = el.getAttribute(attr);
            if (v !== null) expect(Number(v), `${t.type} @${ppm} ${el.tagName}.${attr}`).toBeGreaterThanOrEqual(0);
          }
        }
      }
    }
  });

  it('simplifié en contour sous MIN_SYMBOL_DETAIL_PX', () => {
    const ppm = (MIN_SYMBOL_DETAIL_PX - 1) / 0.6; // évier : 0,6 m de profondeur → 11 px
    const root = renderToSvg(furnitureSymbolMarkup({ type: 'kitchen_sink' }, { pixelsPerMeter: ppm }));
    expect(root.querySelectorAll('rect, ellipse, line, path')).toHaveLength(1);
    const detailed = renderToSvg(furnitureSymbolMarkup({ type: 'kitchen_sink' }, { pixelsPerMeter: 50 }));
    expect(detailed.querySelectorAll('rect, ellipse, line, path').length).toBeGreaterThan(1);
  });

  it('couleur du meuble rendue, la sélection prime (F151)', () => {
    const colored = renderToSvg(furnitureSymbolMarkup({ type: 'bed_double', color: '#a855f7' }, { pixelsPerMeter: 50 }));
    expect(colored.querySelector('rect')?.getAttribute('fill')).toBe('#a855f7');
    const selected = renderToSvg(furnitureSymbolMarkup({ type: 'bed_double', color: '#a855f7' }, { pixelsPerMeter: 50, selected: true }));
    expect(selected.querySelector('rect')?.getAttribute('fill')).toBe('rgba(56, 189, 248, 0.25)');
    expect(selected.querySelector('rect')?.getAttribute('stroke')).toBe('#38bdf8');
  });

  it('dimensions du meuble prioritaires sur celles du modèle', () => {
    const root = renderToSvg(furnitureSymbolMarkup({ type: 'fridge', width: 1, length: 0.5 }, { pixelsPerMeter: 100 }));
    const outline = root.querySelector('rect');
    expect(outline?.getAttribute('width')).toBe('100');
    expect(outline?.getAttribute('height')).toBe('50');
  });

  it('type inconnu : rectangle et icône échappée', () => {
    const markup = furnitureSymbolMarkup({ type: 'inconnu', width: 1, length: 1, icon: '<b>&"' }, { pixelsPerMeter: 50 });
    expect(markup).not.toContain('<b>');
    const root = renderToSvg(markup);
    expect(root.querySelectorAll('rect')).toHaveLength(1);
    expect(root.querySelector('text')?.textContent).toBe('<b>&"');
  });

  it('type inconnu sans icône : 📦 comme l’ancien rendu du canevas ; pas d’icône sous MIN_SYMBOL_DETAIL_PX', () => {
    const root = renderToSvg(furnitureSymbolMarkup({ type: 'inconnu', width: 1, length: 1 }, { pixelsPerMeter: 50 }));
    expect(root.querySelector('text')?.textContent).toBe('📦');
    const tiny = renderToSvg(furnitureSymbolMarkup({ type: 'inconnu', width: 0.1, length: 0.1 }, { pixelsPerMeter: 50 }));
    expect(tiny.querySelector('text')).toBeNull();
  });

  it('couleur échappée dans le balisage', () => {
    const markup = furnitureSymbolMarkup({ type: 'fridge', color: '"/><script>' }, { pixelsPerMeter: 50 });
    expect(markup).not.toContain('<script>');
  });
});

describe('rendu Lit', () => {
  it('produit les mêmes éléments que le balisage', () => {
    const host = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    render(renderFurnitureSymbol({ type: 'cooktop' }, { pixelsPerMeter: 50 }), host);
    const markup = renderToSvg(furnitureSymbolMarkup({ type: 'cooktop' }, { pixelsPerMeter: 50 }));
    expect(host.querySelectorAll('ellipse')).toHaveLength(4);
    expect(host.querySelectorAll('rect, ellipse, line, path')).toHaveLength(markup.querySelectorAll('rect, ellipse, line, path').length);
    expect(host.querySelector('rect')?.getAttribute('width')).toBe('30');
    expect(host.querySelector('rect')?.getAttribute('stroke-dasharray')).toBeNull();
  });

  it('ancienne signature renderSvg(wPx, lPx, sélection) : contour aux dimensions en pixels, sans valeur négative', () => {
    const sink = findFurnitureTemplate('kitchen_sink');
    for (const [w, l] of [[50, 30], [20, 12], [140, 30], [8, 5]]) {
      const host = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      render(sink?.renderSvg(w, l, true), host);
      const outline = host.querySelector('rect');
      expect(Number(outline?.getAttribute('width'))).toBeCloseTo(w, 1);
      expect(Number(outline?.getAttribute('height'))).toBeCloseTo(l, 1);
      expect(outline?.getAttribute('stroke')).toBe('#38bdf8');
      host.querySelectorAll('rect, ellipse').forEach(el => {
        for (const a of ['width', 'height', 'rx', 'ry']) {
          const v = el.getAttribute(a);
          if (v !== null) expect(Number(v)).toBeGreaterThanOrEqual(0);
        }
      });
    }
  });
});

describe('furnitureBounds (emprise pivotée)', () => {
  it('rotation de 90° : largeur et profondeur échangées', () => {
    const b = furnitureBounds({ type: 'sofa_3p', position: { x: 10, y: 5 }, rotation: 90 });
    expect(b.minX).toBeCloseTo(10 - 0.475, 9);
    expect(b.maxX).toBeCloseTo(10 + 0.475, 9);
    expect(b.minY).toBeCloseTo(5 - 1.1, 9);
    expect(b.maxY).toBeCloseTo(5 + 1.1, 9);
  });

  it('rotation de 45° : emprise agrandie', () => {
    const b = furnitureBounds({ type: 'fridge', width: 1, length: 1, position: { x: 0, y: 0 }, rotation: 45 });
    expect(b.maxX).toBeCloseTo(Math.SQRT2 / 2, 9);
  });

  it('les chaises de la table débordent du plateau', () => {
    const b = furnitureBounds({ type: 'dining_table_6', position: { x: 0, y: 0 }, rotation: 0 });
    expect(b.minY).toBeLessThan(-0.45);
    expect(b.maxY).toBeGreaterThan(0.45);
    expect(b.minX).toBeCloseTo(-0.8, 9);
  });
});
