import { describe, expect, it } from 'vitest';
import { SvgExporter, computeWallPolygons, escapeXml } from '../../src/core/svg-exporter';
import { PolygonUtils } from '../../src/core/polygon';
import { createEmptyProject } from '../../src/core/project-model';
import { EntityBinding, ExportFrame, FurnitureItem, HomeArchitectProject, Opening, Point, Room, Wall } from '../../src/core/types';

const PNG_DATA_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

function project(overrides: Partial<HomeArchitectProject> = {}): HomeArchitectProject {
  return { ...createEmptyProject({ name: 'Test' }), id: 'plan_test0001', ...overrides };
}

function wall(id: string, x1: number, y1: number, x2: number, y2: number, thickness = 0.2): Wall {
  return { id, start: { x: x1, y: y1 }, end: { x: x2, y: y2 }, thickness, type: 'standard' };
}

function room(id: string, name: string, polygon: Point[], color?: string): Room {
  return { id, name, polygon, areaM2: PolygonUtils.computeArea(polygon), ...(color ? { color } : {}) };
}

function binding(id: string, entityId: string, x: number, y: number, extra: Partial<EntityBinding> = {}): EntityBinding {
  return { id, entityId, position: { x, y }, ...extra };
}

function opening(id: string, wallId: string, type: Opening['type'], extra: Partial<Opening> = {}): Opening {
  return { id, wallId, type, offset: 2, width: 0.9, flipSide: false, flipDirection: false, ...extra };
}

function viewBox(svg: string): number[] {
  const match = /viewBox="([^"]+)"/.exec(svg);
  if (!match) throw new Error('viewBox absent');
  return match[1].split(/\s+/).map(Number);
}

/** Contrôle strict de bonne formation XML (le DOMParser de happy-dom est permissif). */
function assertWellFormedXml(xml: string): void {
  const body = xml.replace(/^<\?xml[^?]*\?>\s*/, '');
  // eslint-disable-next-line no-control-regex -- recherche volontaire de caractères de contrôle
  if (/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(body)) throw new Error('caractère de contrôle interdit en XML');
  const badEntity = /&(?!(?:lt|gt|amp|apos|quot|#\d+|#x[0-9a-fA-F]+);)/;
  const token = /<!--[\s\S]*?-->|<(\/?)([A-Za-z_][\w:.-]*)((?:\s+[A-Za-z_:][\w:.-]*\s*=\s*(?:"[^"<]*"|'[^'<]*'))*)\s*(\/?)>|([^<]+)|(<)/g;
  const stack: string[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = token.exec(body))) {
    if (match.index !== last) throw new Error(`balisage invalide à ${last}`);
    last = token.lastIndex;
    if (match[0].startsWith('<!--')) continue;
    if (match[6]) throw new Error(`« < » inattendu à ${match.index} : ${body.slice(match.index, match.index + 60)}`);
    if (match[5] !== undefined) {
      if (badEntity.test(match[5])) throw new Error(`« & » non échappé dans le texte : ${match[5]}`);
      continue;
    }
    const [, closing, name, attrs, selfClosing] = match;
    const names = [...attrs.matchAll(/([A-Za-z_:][\w:.-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)];
    for (const attr of names) {
      if (badEntity.test(attr[2] ?? attr[3] ?? '')) throw new Error(`« & » non échappé dans ${attr[1]}`);
    }
    if (new Set(names.map(a => a[1])).size !== names.length) throw new Error(`attribut dupliqué dans <${name}>`);
    if (closing) {
      const open = stack.pop();
      if (open !== name) throw new Error(`</${name}> ferme <${open}>`);
    } else if (!selfClosing) {
      stack.push(name);
    }
  }
  if (last !== body.length) throw new Error('fin de document invalide');
  if (stack.length) throw new Error(`éléments non fermés : ${stack.join(', ')}`);
}

function near(a: Point, b: Point, tol = 1e-6): boolean {
  return Math.abs(a.x - b.x) <= tol && Math.abs(a.y - b.y) <= tol;
}

function signedArea(poly: Point[]): number {
  let s = 0;
  poly.forEach((p, i) => {
    const q = poly[(i + 1) % poly.length];
    s += p.x * q.y - q.x * p.y;
  });
  return s / 2;
}

/** Projet complet : murs, pièces, ouvertures de tous types, meubles, entités. */
function fullProject(): HomeArchitectProject {
  const walls = [wall('w1', 0, 0, 8, 0), wall('w2', 8, 0, 8, 6), wall('w3', 8, 6, 0, 6), wall('w4', 0, 6, 0, 0)];
  return project({
    walls,
    rooms: [room('r1', 'Salon & cuisine', [{ x: 0, y: 0 }, { x: 8, y: 0 }, { x: 8, y: 6 }, { x: 0, y: 6 }], '#22c55e')],
    openings: [
      opening('o1', 'w1', 'door'),
      opening('o2', 'w1', 'double_door', { offset: 5, width: 1.4 }),
      opening('o3', 'w2', 'window', { offset: 2, width: 1.5 }),
      opening('o4', 'w3', 'french_window', { offset: 3, width: 2 }),
      opening('o5', 'w4', 'sliding_door', { offset: 3, width: 1.8 }),
    ],
    furniture: [
      { id: 'f1', type: 'sofa_3p', name: 'Canapé', category: 'seating', position: { x: 3, y: 3 }, width: 2.2, length: 0.95, rotation: 45 },
      { id: 'f2', type: 'objet_inconnu', name: 'Boîte', category: 'other', position: { x: 6, y: 4 }, width: 1, length: 0.5, rotation: 0, icon: '📦' },
    ],
    bindings: [binding('b1', 'light.salon', 2, 2), binding('b2', 'sensor.temp', 6, 3)],
  });
}

describe('escapeXml', () => {
  it('échappe les caractères spéciaux XML', () => {
    expect(escapeXml(`<a href="x" title='y'>&</a>`)).toBe('&lt;a href=&quot;x&quot; title=&apos;y&apos;&gt;&amp;&lt;/a&gt;');
  });

  it('retire les caractères interdits en XML mais conserve les emoji', () => {
    expect(escapeXml('a\u0000b\u001bc\uFFFEd\uD800e💡')).toBe('abcde💡');
  });
});

describe('SvgExporter.exportToSvg — sécurité et validité', () => {
  it('produit un document bien formé pour un plan complet', () => {
    const svg = SvgExporter.exportToSvg(fullProject(), { includeEntityMarkers: true });
    expect(() => assertWellFormedXml(svg)).not.toThrow();
    expect(svg).toContain('Salon &amp; cuisine');
  });

  it('échappe le nom des pièces et du projet (pas d’injection de balisage)', () => {
    const p = project({
      name: '"/><script>alert(1)</script>',
      rooms: [room('r1', '</text><script>alert(1)</script>', [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 3 }])],
    });
    const svg = SvgExporter.exportToSvg(p);
    expect(svg).not.toMatch(/<script/i);
    expect(svg).toContain('&lt;/text&gt;&lt;script&gt;');
    expect(() => assertWellFormedXml(svg)).not.toThrow();
  });

  it('reste bien formé avec des caractères de contrôle dans les textes et l’icône d’un meuble inconnu', () => {
    const p = project({
      name: 'Plan\u0000\u001b',
      rooms: [room('r1', 'Salon\u0007', [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 3 }])],
      furniture: [{ id: 'f1', type: 'objet_inconnu', name: 'x', category: 'other', position: { x: 1, y: 1 }, width: 1, length: 1, rotation: 0, icon: '📦\u0001<b>' }],
      bindings: [binding('b1', 'light.a', 1, 1, { icon: '\u0002💡', customName: 'Lampe\u0008' })],
    });
    const svg = SvgExporter.exportToSvg(p, { includeEntityMarkers: true });
    expect(() => assertWellFormedXml(svg)).not.toThrow();
    expect(svg).toContain('📦&lt;b&gt;');
  });

  it('remplace une couleur invalide par la couleur par défaut', () => {
    const p = project({ rooms: [room('r1', 'A', [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 3 }], 'red" onload="alert(1)')] });
    const svg = SvgExporter.exportToSvg(p, { backgroundColor: '#fff" onload="x' });
    expect(svg).not.toContain('onload');
    expect(svg).toContain('fill="rgba(56, 189, 248, 0.12)"');
    expect(svg).toContain('fill="#0f172a"');
  });

  it('n’utilise que des éléments de la liste blanche du serveur', () => {
    const allowed = new Set(['svg', 'g', 'defs', 'title', 'desc', 'path', 'rect', 'circle', 'ellipse', 'line', 'polyline',
      'polygon', 'text', 'tspan', 'linearGradient', 'radialGradient', 'stop', 'pattern', 'clipPath', 'mask', 'marker',
      'symbol', 'use', 'image']);
    const p = { ...fullProject(), background: { imageUrl: PNG_DATA_URL, opacity: 0.5, visible: true, offset: { x: 0, y: 0 }, scale: 1, rotation: 0, widthPx: 400, heightPx: 300 } };
    const svg = SvgExporter.exportToSvg(p, { includeEntityMarkers: true });
    const tags = [...svg.matchAll(/<([A-Za-z][\w:-]*)/g)].map(m => m[1]);
    expect(tags.filter(t => !allowed.has(t))).toEqual([]);
    expect(svg).not.toMatch(/\son[a-z]+=/i);
  });
});

describe('SvgExporter.exportToSvg — image de fond', () => {
  const bg = (imageUrl: string, extra = {}) => ({ imageUrl, opacity: 0.4, visible: true, offset: { x: 1, y: 2 }, scale: 2, rotation: 0, widthPx: 100, heightPx: 50, ...extra });

  it('n’embarque jamais une URL externe (invisible dans picture-elements, refusée par le serveur)', () => {
    const svg = SvgExporter.exportToSvg(project({ background: bg('https://evil.example/p.png?"/><x:script>&q=1') }));
    expect(svg).not.toContain('<image');
    expect(svg).not.toContain('evil.example');
    expect(() => assertWellFormedXml(svg)).not.toThrow();
  });

  it('embarque la data-URL fournie, placée comme dans le canevas', () => {
    const p = project({ pixelsPerMeter: 50, background: bg('', { assetId: 'plan_test0001-abcdef123456.png' }) });
    const svg = SvgExporter.exportToSvg(p, { backgroundDataUrl: PNG_DATA_URL });
    expect(svg).toContain(`href="${PNG_DATA_URL}"`);
    // offset (1 m, 2 m) × 50 ; taille = widthPx × scale (unités = pixels d'étalonnage)
    expect(svg).toMatch(/<image id="background-image" href="[^"]+" x="50" y="100" width="200" height="100" opacity="0.4"/);
  });

  it('refuse une data-URL non base64 ou d’un type non image', () => {
    const p = project({ background: bg('', { assetId: 'plan_test0001-abcdef123456.png' }) });
    expect(SvgExporter.exportToSvg(p, { backgroundDataUrl: 'data:text/html;base64,PHNjcmlwdD4=' })).not.toContain('<image');
    expect(SvgExporter.exportToSvg(p, { backgroundDataUrl: 'data:image/svg+xml,<svg onload="x">' })).not.toContain('<image');
  });

  it('respecte includeBackground: false et un fond masqué', () => {
    expect(SvgExporter.exportToSvg(project({ background: bg(PNG_DATA_URL) }), { includeBackground: false })).not.toContain('<image');
    expect(SvgExporter.exportToSvg(project({ background: bg(PNG_DATA_URL, { visible: false }) }))).not.toContain('<image');
    expect(SvgExporter.exportToSvg(project({ background: bg(PNG_DATA_URL) }))).toContain('<image');
  });
});

describe('cadre d’export, viewBox et pourcentages', () => {
  it('le viewBox correspond exactement au cadre × pixelsPerMeter (pas de taille minimale divergente)', () => {
    const p = project({ pixelsPerMeter: 50, bindings: [binding('b1', 'light.a', 0, 0)] });
    const frame = SvgExporter.computeContentFrame(p);
    // Une seule entité : cadre agrandi de façon centrée (au moins 2 m), donc l’entité reste au centre.
    expect(frame.maxX - frame.minX).toBeGreaterThanOrEqual(2);
    expect(SvgExporter.worldToPercentage({ x: 0, y: 0 }, frame)).toEqual({ left: 50, top: 50 });
    const [x, y, w, h] = viewBox(SvgExporter.exportToSvg(p));
    expect(x).toBeCloseTo(frame.minX * 50, 1);
    expect(y).toBeCloseTo(frame.minY * 50, 1);
    expect(w).toBeCloseTo((frame.maxX - frame.minX) * 50, 1);
    expect(h).toBeCloseTo((frame.maxY - frame.minY) * 50, 1);
  });

  it('un point placé à x % du cadre est à x % du viewBox', () => {
    const p = { ...fullProject(), pixelsPerMeter: 137 };
    const [vx, vy, vw, vh] = viewBox(SvgExporter.exportToSvg(p));
    const frame = SvgExporter.resolveExportFrame(p);
    const point = { x: 6.3, y: 1.7 };
    const { left, top } = SvgExporter.worldToPercentage(point, frame);
    expect(vx + (left / 100) * vw).toBeCloseTo(point.x * 137, 0);
    expect(vy + (top / 100) * vh).toBeCloseTo(point.y * 137, 0);
  });

  it('utilise le cadre figé du projet : ajouter du contenu ne décale pas le viewBox', () => {
    const exportFrame: ExportFrame = { minX: -1, minY: -1, maxX: 9, maxY: 7 };
    const base = { ...fullProject(), exportFrame };
    const before = viewBox(SvgExporter.exportToSvg(base));
    const grown = { ...base, walls: [...base.walls, wall('w9', 0, 6, 0, 14)] };
    expect(viewBox(SvgExporter.exportToSvg(grown))).toEqual(before);
    expect(before).toEqual([-50, -50, 500, 400]);
    // Un cadre explicite prime sur le cadre figé
    expect(viewBox(SvgExporter.exportToSvg(grown, { frame: { minX: 0, minY: 0, maxX: 4, maxY: 2 } }))).toEqual([0, 0, 200, 100]);
    // Le contenu dépasse le cadre figé : détectable par l’appelant
    expect(SvgExporter.frameContains(exportFrame, SvgExporter.contentBounds(grown)!)).toBe(false);
    expect(SvgExporter.frameContains(exportFrame, SvgExporter.contentBounds(base)!)).toBe(true);
  });

  it('ignore un cadre figé invalide', () => {
    const p = { ...fullProject(), exportFrame: { minX: 5, minY: 0, maxX: 5, maxY: 3 } };
    expect(SvgExporter.resolveExportFrame(p)).toEqual(SvgExporter.computeContentFrame(p));
  });

  it('l’emprise des meubles tient compte de leur rotation', () => {
    const item = (rotation: number): FurnitureItem => ({ id: 'f', type: 'objet_inconnu', name: 'x', category: 'other', position: { x: 0, y: 0 }, width: 2, length: 1, rotation });
    const flat = SvgExporter.contentBounds(project({ furniture: [item(0)] }))!;
    const turned = SvgExporter.contentBounds(project({ furniture: [item(90)] }))!;
    expect(flat.maxX - flat.minX).toBeCloseTo(2);
    expect(flat.maxY - flat.minY).toBeCloseTo(1);
    expect(turned.maxX - turned.minX).toBeCloseTo(1);
    expect(turned.maxY - turned.minY).toBeCloseTo(2);
  });

  it('l’emprise comprend l’épaisseur des murs et le débattement des portes', () => {
    const p = project({ walls: [wall('w1', 0, 0, 4, 0, 0.2)], openings: [opening('o1', 'w1', 'door', { width: 0.9 })] });
    const b = SvgExporter.contentBounds(p)!;
    expect(b.minY).toBeCloseTo(-0.1);
    expect(b.maxY).toBeCloseTo(0.9); // battant ouvert côté +Y sur toute sa largeur
  });

  it('calculateBoundingBox reste compatible (canevas : ajuster à l’écran)', () => {
    const p = fullProject();
    const box = SvgExporter.calculateBoundingBox(p, 0.6);
    const frame = SvgExporter.computeContentFrame(p, 0.6);
    expect(box).toEqual({ minX: frame.minX, minY: frame.minY, width: frame.maxX - frame.minX, height: frame.maxY - frame.minY, ppm: p.pixelsPerMeter });
  });

  it('plan vide : cadre par défaut', () => {
    expect(SvgExporter.computeContentFrame(project())).toEqual({ minX: -1, minY: -1, maxX: 11, maxY: 7 });
    expect(SvgExporter.contentBounds(project())).toBeNull();
  });
});

describe('tailles cohérentes avec l’étalonnage', () => {
  it('textes et traits suivent pixelsPerMeter', () => {
    const at = (ppm: number) => SvgExporter.exportToSvg({ ...fullProject(), pixelsPerMeter: ppm });
    const fontSize = (svg: string) => Number(/<g id="room-labels"[\s\S]*?font-size="([\d.]+)"/.exec(svg)![1]);
    expect(fontSize(at(100))).toBeCloseTo(26);
    expect(fontSize(at(200))).toBeCloseTo(52);
    const strokeWidth = (svg: string) => Number(/<g id="walls">\s*<path [^>]*stroke-width="([\d.]+)"/.exec(svg)![1]);
    expect(strokeWidth(at(200)) / strokeWidth(at(100))).toBeCloseTo(2);
  });

  it('le halo des étiquettes reprend la couleur de fond du plan', () => {
    const halo = (svg: string) => /<g id="room-labels"[^>]* stroke="([^"]+)"/.exec(svg)![1];
    expect(halo(SvgExporter.exportToSvg(fullProject()))).toBe('#0f172a');
    expect(halo(SvgExporter.exportToSvg(fullProject(), { backgroundColor: '#ffffff' }))).toBe('#ffffff');
    expect(halo(SvgExporter.exportToSvg(fullProject(), { backgroundColor: 'transparent' }))).toBe('#0f172a');
  });

  it('les étiquettes de pièces sont placées à l’intérieur des pièces concaves', () => {
    const lShape = [{ x: 0, y: 0 }, { x: 6, y: 0 }, { x: 6, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 6 }, { x: 0, y: 6 }];
    const svg = SvgExporter.exportToSvg(project({ pixelsPerMeter: 50, rooms: [room('r1', 'L', lShape)] }));
    const match = /<g id="room-labels"[^>]*>\s*<g transform="translate\(([-\d.]+), ([-\d.]+)\)">/.exec(svg)!;
    const anchor = { x: Number(match[1]) / 50, y: Number(match[2]) / 50 };
    expect(PolygonUtils.isPointInPolygon(anchor, lShape)).toBe(true);
  });
});

describe('ouvertures, meubles et marqueurs', () => {
  const openingsSvg = (op: Opening) => {
    const svg = SvgExporter.exportToSvg(project({ walls: [wall('w1', 0, 0, 6, 0)], openings: [op] }));
    return /<g id="openings">([\s\S]*?)\n {2}<\/g>/.exec(svg)![1];
  };

  it('fenêtre : même règle de battants que le canevas (sashCount prioritaire)', () => {
    const mullion = /<line x1="0" /;
    expect(openingsSvg(opening('o', 'w1', 'window', { width: 1.5, sashCount: 1 }))).not.toMatch(mullion);
    expect(openingsSvg(opening('o', 'w1', 'window', { width: 1.5 }))).toMatch(mullion);
    expect(openingsSvg(opening('o', 'w1', 'window', { width: 0.8 }))).not.toMatch(mullion);
    expect(openingsSvg(opening('o', 'w1', 'window', { width: 0.8, sashCount: 2 }))).toMatch(mullion);
  });

  it('chaque type d’ouverture a un symbole', () => {
    expect(openingsSvg(opening('o', 'w1', 'door')).match(/ A /g)).toHaveLength(1);
    expect(openingsSvg(opening('o', 'w1', 'double_door', { width: 1.4 })).match(/ A /g)).toHaveLength(2);
    expect(openingsSvg(opening('o', 'w1', 'sliding_door')).match(/<rect /g)!.length).toBeGreaterThanOrEqual(4);
    expect(openingsSvg(opening('o', 'w1', 'french_window')).match(/<rect /g)!.length).toBeGreaterThanOrEqual(4);
  });

  it('meubles : symbole du catalogue avec sa rotation', () => {
    const svg = SvgExporter.exportToSvg(fullProject());
    const furniture = /<g id="furniture">([\s\S]*?)\n {2}<\/g>/.exec(svg)![1];
    expect(furniture).toContain('rotate(45)');
    expect(furniture).toContain('class="furniture-symbol"');
    expect(furniture.match(/<(rect|ellipse|path|line) /g)!.length).toBeGreaterThan(3); // symbole détaillé, pas un simple rectangle
  });

  it('marqueurs : nom courant de l’entité (friendly_name) sauf nom saisi', () => {
    const p = project({ bindings: [binding('b1', 'light.salon', 1, 1), binding('b2', 'light.cuisine', 2, 2, { customName: 'Ma <lampe>' })] });
    const svg = SvgExporter.exportToSvg(p, {
      includeEntityMarkers: true,
      states: { 'light.salon': { attributes: { friendly_name: 'Lampe salon' } } },
    });
    expect(svg).toContain('>Lampe salon</text>');
    expect(svg).toContain('>Ma &lt;lampe&gt;</text>');
    expect(SvgExporter.exportToSvg(p)).not.toContain('entity-markers');
  });
});

describe('computeWallPolygons (jonctions)', () => {
  it('mur isolé : rectangle de l’épaisseur du mur', () => {
    const poly = computeWallPolygons([wall('w1', 0, 0, 4, 0, 0.2)]).get('w1')!;
    expect(poly).toHaveLength(4);
    for (const corner of [{ x: 0, y: 0.1 }, { x: 4, y: 0.1 }, { x: 4, y: -0.1 }, { x: 0, y: -0.1 }]) {
      expect(poly.some(p => near(p, corner))).toBe(true);
    }
  });

  it('angle droit : onglet (coins intérieur et extérieur partagés), sans encoche', () => {
    const polys = computeWallPolygons([wall('a', 0, 0, 4, 0), wall('b', 0, 0, 0, 3)]);
    const a = polys.get('a')!;
    const b = polys.get('b')!;
    for (const corner of [{ x: 0.1, y: 0.1 }, { x: -0.1, y: -0.1 }]) {
      expect(a.some(p => near(p, corner))).toBe(true);
      expect(b.some(p => near(p, corner))).toBe(true);
    }
    // L’ancienne encoche de 10 × 10 cm à l’angle extérieur est couverte (de part et d’autre de l’onglet)
    for (const pt of [{ x: -0.05, y: -0.08 }, { x: -0.08, y: -0.05 }]) {
      expect(PolygonUtils.isPointInPolygon(pt, a) || PolygonUtils.isPointInPolygon(pt, b)).toBe(true);
    }
  });

  it('jonction de 3 murs : le centre est couvert', () => {
    const polys = computeWallPolygons([wall('a', 0, 0, 4, 0), wall('b', 0, 0, -4, 0), wall('c', 0, 0, 0, 3)]);
    const centerArea = [{ x: 0.05, y: -0.05 }, { x: -0.05, y: 0.05 }, { x: 0, y: 0.09 }];
    for (const pt of centerArea) {
      expect([...polys.values()].some(poly => PolygonUtils.isPointInPolygon(pt, poly))).toBe(true);
    }
  });

  it('angle très aigu : biseau au lieu d’un onglet démesuré', () => {
    const angle = (15 * Math.PI) / 180;
    const polys = computeWallPolygons([wall('a', 0, 0, 4, 0), wall('b', 0, 0, 4 * Math.cos(angle), 4 * Math.sin(angle))]);
    for (const poly of polys.values()) {
      for (const p of poly) expect(Math.hypot(p.x, p.y) < 0.5 || Math.hypot(p.x, p.y) > 3).toBe(true);
    }
  });

  it('orientation homogène et murs dégénérés ignorés', () => {
    const polys = computeWallPolygons([
      wall('a', 0, 0, 4, 0), wall('b', 4, 0, 4, 3), wall('c', 4, 3, 0, 3), wall('d', 0, 3, 0, 0), wall('z', 1, 1, 1, 1),
    ]);
    expect(polys.has('z')).toBe(false);
    for (const poly of polys.values()) expect(signedArea(poly)).toBeGreaterThan(0);
  });

  it('les murs sont tracés en deux passes (contour puis remplissage)', () => {
    const svg = SvgExporter.exportToSvg(fullProject());
    const walls = /<g id="walls">([\s\S]*?)<\/g>/.exec(svg)![1];
    expect(walls.match(/<path /g)).toHaveLength(2);
  });
});
