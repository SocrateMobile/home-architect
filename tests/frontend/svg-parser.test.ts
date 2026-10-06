import { describe, expect, it } from 'vitest';
import { SvgPlanParser, decodeSvgBytes } from '../../src/core/svg-parser';
import type { SvgParseOptions, SvgParseResult } from '../../src/core/svg-parser';
import type { Wall } from '../../src/core/types';

const svg = (body: string, attrs = 'viewBox="0 0 1000 800"') =>
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" ${attrs}>${body}</svg>`;

const parse = (content: string, options: SvgParseOptions = {}): SvgParseResult => {
  const result = SvgPlanParser.parseSvg(content, options);
  expect(result.error).toBeUndefined();
  expect(result.success).toBe(true);
  return result;
};

const len = (w: Wall) => Math.hypot(w.end.x - w.start.x, w.end.y - w.start.y);
const isHorizontal = (w: Wall) => Math.abs(w.start.y - w.end.y) < 0.02;
const isVertical = (w: Wall) => Math.abs(w.start.x - w.end.x) < 0.02;
const sortedLengths = (walls: Wall[]) => walls.map(len).sort((a, b) => a - b).map(v => Math.round(v * 100) / 100);

const STROKE = 'fill="none" stroke="#000" stroke-width="2"';

describe('lecture des chemins (attribut d)', () => {
  it('ne boucle pas quand des nombres suivent une commande Z (F64)', () => {
    const r = parse(svg(`<path ${STROKE} d="M0 0 L1000 0 L1000 800 z0 0 L 5 5"/>`), { totalWidthMeters: 10 });
    // Le chemin s'arrête à l'erreur (comme dans le navigateur) : L1000,0 · L1000,800 · fermeture.
    expect(r.walls.length).toBe(3);
  });

  it('traite les paires qui suivent M comme des lineto implicites (F65)', () => {
    const r = parse(svg('<path d="M10,10 500,10 500,400 10,400 z"/>'), { totalWidthMeters: 12 });
    expect(r.walls.length).toBe(4);
  });

  it('gère m relatif suivi de paires implicites (l relatif)', () => {
    // L'emprise inclut la demi-épaisseur (0,10 m) de chaque mur extérieur : 4 m d'axe = 4,2 m.
    const r = parse(svg(`<path ${STROKE} d="m100,100 400,0 0,300 -400,0 z"/>`), { totalWidthMeters: 4.2 });
    expect(r.walls.length).toBe(4);
    expect(sortedLengths(r.walls)).toEqual([3, 3, 4, 4]);
  });

  it('lit les drapeaux d\'arc compactés (F152)', () => {
    // « 0 0150 50 » = rotation 0, grand arc 0, sens 1, puis x = 50… : la suite du chemin est préservée.
    const r = parse(svg(`<path ${STROKE} d="M0 0 L100 0 M100 0 A100 100 0 0150 100 L300 100 L300 400"/>`, 'viewBox="0 0 1000 1000"'), { totalWidthMeters: 3 });
    expect(r.walls.some(w => isVertical(w) && len(w) > 0.8)).toBe(true);
  });

  it('résiste aux chemins invalides sans lever', () => {
    for (const d of ['', 'Z', '10 20', 'M', 'M 10', 'L 10 10', 'M0 0 Q', 'M0 0 X 10 10', 'M0,0 A 10 10 0 2 1 10 10']) {
      const r = SvgPlanParser.parseSvg(svg(`<path ${STROKE} d="${d}"/>`));
      expect(r.success).toBe(true);
    }
  });
});

describe('éléments non rendus et visibilité (F67)', () => {
  it('ignore defs, clipPath, symbol non utilisé, marker, pattern, mask', () => {
    const big = '<rect x="0" y="0" width="1000" height="800" stroke="#000" stroke-width="2" fill="none"/>';
    const r = parse(svg(`
      <defs>${big}</defs>
      <clipPath id="c">${big}</clipPath>
      <symbol id="s">${big}</symbol>
      <marker id="m">${big}</marker>
      <pattern id="p">${big}</pattern>
      <mask id="k">${big}</mask>
      <path ${STROKE} d="M100,100 L600,100"/>
    `), { totalWidthMeters: 5 });
    expect(r.walls.length).toBe(1);
    expect(r.rooms.length).toBe(0);
  });

  it('ignore display:none et visibility:hidden portés par style, attribut ou classe', () => {
    const r = parse(svg(`
      <style>.cache { display: none } .invisible { visibility: hidden }</style>
      <g inkscape:groupmode="layer" inkscape:label="Mobilier" style="display:none"><path ${STROKE} d="M0,500 L900,500"/></g>
      <path class="cache" ${STROKE} d="M0,600 L900,600"/>
      <path class="invisible" ${STROKE} d="M0,700 L900,700"/>
      <path ${STROKE} visibility="hidden" d="M0,750 L900,750"/>
      <g opacity="0"><path ${STROKE} d="M0,780 L900,780"/></g>
      <path ${STROKE} d="M0,100 L900,100"/>
    `), { totalWidthMeters: 9 });
    expect(r.walls.length).toBe(1);
    expect(r.walls[0].start.y).toBeCloseTo(r.walls[0].end.y, 2);
  });

  it('résout <use> vers un symbole avec translation', () => {
    const r = parse(svg(`
      <defs><symbol id="mur"><path ${STROKE} d="M0,0 L400,0"/></symbol></defs>
      <use href="#mur" x="100" y="100"/>
      <use xlink:href="#mur" x="100" y="500"/>
    `), { totalWidthMeters: 4 });
    expect(r.walls.length).toBe(2);
    expect(r.walls.every(w => Math.abs(len(w) - 4) < 0.05)).toBe(true);
  });

  it('borne les <use> récursifs', () => {
    const r = SvgPlanParser.parseSvg(svg(`<g id="a"><use href="#b"/></g><g id="b"><use href="#a"/><path ${STROKE} d="M0,0 L500,0"/></g>`));
    expect(r.success).toBe(true);
  });
});

describe('consolidation des murs (F66, F73)', () => {
  it('fusionne doublons et segments inversés sans mur de longueur nulle', () => {
    const r = parse(svg(`
      <path ${STROKE} d="M0,0 L1000,0"/>
      <path ${STROKE} d="M1000,0 L0,0"/>
      <path ${STROKE} d="M0,0 L500,0 M500,0 L1000,0"/>
      <path ${STROKE} d="M200,0 L700,0"/>
    `), { totalWidthMeters: 10 });
    expect(r.walls.length).toBe(1);
    expect(len(r.walls[0])).toBeCloseTo(10, 1);
  });

  it('garde les cloisons mitoyennes de rectangles accolés', () => {
    const r = parse(svg(`
      <rect x="0" y="0" width="500" height="400" ${STROKE}/>
      <rect x="500" y="0" width="500" height="400" ${STROKE}/>
    `), { totalWidthMeters: 10.2 });
    expect(r.walls.every(w => len(w) > 0.19)).toBe(true);
    // Deux murs horizontaux fusionnés (10 m), trois verticaux (4 m), dont la cloison mitoyenne.
    expect(sortedLengths(r.walls)).toEqual([4, 4, 4, 10, 10]);
  });

  it('traite un export DWG de 20 000 segments en temps raisonnable', () => {
    let seed = 1;
    const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    let d = '';
    for (let i = 0; i < 20000; i++) {
      const a = rand() * Math.PI, l = 20 + rand() * 400;
      d += `M${(rand() * 20000).toFixed(1)},${(rand() * 15000).toFixed(1)} l${(Math.cos(a) * l).toFixed(1)},${(Math.sin(a) * l).toFixed(1)} `;
    }
    const analysis = SvgPlanParser.analyze(svg(`<path ${STROKE} d="${d}"/>`, 'viewBox="0 0 20000 15000"'));
    expect(analysis.primitives.segments.length).toBe(20000);
    const t0 = performance.now();
    const detection = SvgPlanParser.detect(analysis, { totalWidthMeters: 20 });
    expect(detection.success).toBe(true);
    expect(performance.now() - t0).toBeLessThan(4000);
    // Les filtres ne relancent pas la reconnaissance.
    const t1 = performance.now();
    SvgPlanParser.select(detection, { importWalls: false });
    expect(performance.now() - t1).toBeLessThan(50);
  });

  it('reste rapide sur un gros plan (grille de 2 400 segments)', () => {
    let d = '';
    for (let i = 0; i <= 600; i++) d += `M${i * 10},0 L${i * 10},10 `;
    for (let i = 0; i < 600; i++) d += `M${i * 10},0 L${i * 10 + 10},0 M${i * 10},10 L${i * 10 + 10},10 `;
    const t0 = performance.now();
    const r = parse(svg(`<path ${STROKE} d="${d}"/>`, 'viewBox="0 0 6000 10"'), { totalWidthMeters: 600 });
    expect(performance.now() - t0).toBeLessThan(5000);
    expect(r.walls.length).toBeGreaterThan(600);
  });
});

describe('détection stricte des murs (F68)', () => {
  it('apparie un mur dessiné en double trait en un seul mur à l\'épaisseur mesurée', () => {
    // Mur de 4 m × 20 cm dessiné comme un contour (1 unité = 1 cm), plus un mur témoin.
    const r = parse(svg(`
      <polygon points="0,0 400,0 400,20 0,20" ${STROKE}/>
      <path ${STROKE} d="M0,300 L400,300"/>
    `, 'viewBox="0 0 400 400"'), { totalWidthMeters: 4 });
    const thick = r.walls.find(w => Math.abs(w.start.y - 0.1) < 0.02);
    expect(thick).toBeDefined();
    expect(thick!.thickness).toBeCloseTo(0.2, 2);
    expect(len(thick!)).toBeCloseTo(4, 1);
    // Ni deuxième trait parallèle, ni bouts de 20 cm.
    expect(r.walls.length).toBe(2);
  });

  it('reconstitue les angles et les T d\'un plan en double trait', () => {
    // Enveloppe 10 × 8 m (murs de 20 cm) et une cloison de 10 cm au milieu.
    const r = parse(svg(`
      <path ${STROKE} d="M0,0 H1000 V800 H0 Z"/>
      <path ${STROKE} d="M20,20 H495 V780 H20 Z"/>
      <path ${STROKE} d="M505,20 H980 V780 H505 Z"/>
    `, 'viewBox="0 0 1000 800"'), { totalWidthMeters: 10 });
    expect(r.walls.length).toBe(5);
    const partition = r.walls.find(w => isVertical(w) && Math.abs(w.start.x - 5) < 0.05);
    expect(partition?.thickness).toBeCloseTo(0.1, 2);
    expect(r.walls.filter(w => w.thickness === 0.2).length).toBe(4);
    // Les axes se rejoignent : la largeur saisie s'applique à l'emprise extérieure (10 m).
    expect(r.footprint?.width).toBeCloseTo(10, 1);
  });

  it('exclut le cadre de page et le fond plein page', () => {
    const r = parse(svg(`
      <rect width="100%" height="100%" fill="white"/>
      <rect x="10" y="10" width="980" height="780" fill="none" stroke="#000" stroke-width="1"/>
      <rect x="200" y="200" width="400" height="300" ${STROKE}/>
    `), { totalWidthMeters: 4 });
    expect(r.walls.length).toBe(4);
    expect(r.rooms.length).toBe(0);
    expect(r.footprint?.width).toBeCloseTo(4, 1);
  });

  it('retire le cartouche raccordé au cadre de page', () => {
    const thin = 'fill="none" stroke="#000" stroke-width="1"';
    const r = parse(svg(`
      <rect x="10" y="10" width="980" height="780" ${thin}/>
      <path ${thin} d="M700,700 H990 M700,700 V790 M700,740 H990 M850,740 V790"/>
      <rect x="200" y="150" width="400" height="300" ${STROKE}/>
    `), { totalWidthMeters: 4.2 });
    expect(r.walls.length).toBe(4);
    expect(r.walls.every(w => w.thickness === 0.2)).toBe(true);
    expect(r.footprint?.width).toBeCloseTo(4.2, 2);
  });

  it('ignore les petits objets et le mobilier balisé', () => {
    const r = parse(svg(`
      <rect x="100" y="100" width="20" height="20" ${STROKE}/>
      <g id="A-FURN"><rect x="300" y="300" width="200" height="60" ${STROKE}/></g>
      <path ${STROKE} d="M0,700 L1000,700"/>
    `), { totalWidthMeters: 10 });
    expect(r.walls.length).toBe(1);
  });

  it('ignore les cotes en pointillés et à marqueurs', () => {
    const r = parse(svg(`
      <path ${STROKE} stroke-dasharray="5,5" d="M0,100 L1000,100"/>
      <path ${STROKE} style="marker-end:url(#fleche)" d="M0,200 L1000,200"/>
      <path ${STROKE} d="M0,300 L1000,300"/>
    `), { totalWidthMeters: 10 });
    expect(r.walls.length).toBe(1);
    expect(r.stats.ignoredMeasurementLinesCount).toBe(2);
  });

  it('prend l\'épaisseur d\'un trait épais', () => {
    const r = parse(svg('<path fill="none" stroke="#000" stroke-width="15" d="M0,0 L1000,0"/>'), { totalWidthMeters: 10 });
    expect(r.walls[0].thickness).toBeCloseTo(0.15, 2);
  });
});

describe('indices sémantiques (F154)', () => {
  it('compare des mots entiers : « imported » n\'est pas une porte, « outdoor » n\'est pas une porte', () => {
    const r = parse(svg(`<g id="imported_plan"><g class="outdoor-zone"><path ${STROKE} d="M0,0 L1000,0"/></g></g>`), { totalWidthMeters: 10 });
    expect(r.walls.length).toBe(1);
  });

  it('lit le libellé des calques Inkscape (porte, fenêtre, cotation)', () => {
    const r = parse(svg(`
      <g inkscape:groupmode="layer" inkscape:label="Murs" id="layer1"><path ${STROKE} d="M0,0 L1000,0"/></g>
      <g inkscape:groupmode="layer" inkscape:label="Fenêtres" id="layer2"><path ${STROKE} d="M300,0 L450,0"/></g>
      <g inkscape:groupmode="layer" inkscape:label="Cotes" id="layer3"><path ${STROKE} d="M0,50 L1000,50"/></g>
    `), { totalWidthMeters: 10 });
    expect(r.walls.length).toBe(1);
    expect(r.openings.length).toBe(1);
    expect(r.openings[0].type).toBe('window');
    expect(r.openings[0].offset).toBeCloseTo(3.75, 1);
    expect(r.openings[0].width).toBeCloseTo(1.5, 1);
    expect(r.layers.map(l => l.name)).toEqual(['Murs', 'Fenêtres', 'Cotes']);
  });

  it('permet d\'exclure un calque', () => {
    const content = svg(`
      <g inkscape:groupmode="layer" inkscape:label="Murs"><path ${STROKE} d="M0,0 L1000,0"/></g>
      <g inkscape:groupmode="layer" inkscape:label="Esquisse"><path ${STROKE} d="M0,400 L1000,400"/></g>
    `);
    const all = parse(content, { totalWidthMeters: 10 });
    expect(all.walls.length).toBe(2);
    const sketch = all.layers.find(l => l.name === 'Esquisse')!;
    const filtered = parse(content, { totalWidthMeters: 10, excludedLayers: [sketch.id] });
    expect(filtered.walls.length).toBe(1);
  });
});

describe('portes depuis les arcs (F69)', () => {
  /** Mur de 4 m interrompu entre 1,00 et 1,90 m, battant de 90 cm à charnière en 1,00 m. */
  const doorPlan = (arc: string) => svg(`
    <path ${STROKE} d="M0,0 L100,0 M190,0 L400,0 M0,0 L0,300 M400,0 L400,300"/>
    <path ${STROKE} d="${arc}"/>
  `, 'viewBox="0 0 400 300"');

  it('centre la porte dans la baie et réunit les deux tronçons', () => {
    // Vantail ouvert vers le bas (y+), position fermée vers 1,90 m. Emprise : 4 m d'axe + 2 × 0,10 m.
    const r = parse(doorPlan('M100,90 A90 90 0 0 0 190,0'), { totalWidthMeters: 4.2 });
    const host = r.walls.find(w => isHorizontal(w))!;
    expect(len(host)).toBeCloseTo(4, 1);
    expect(r.openings.length).toBe(1);
    const door = r.openings[0];
    expect(door.wallId).toBe(host.id);
    expect(door.width).toBeCloseTo(0.9, 2);
    const fromLeft = host.start.x < host.end.x ? door.offset : len(host) - door.offset;
    expect(fromLeft).toBeCloseTo(1.45, 1);
    // Charnière côté 1,00 m.
    const hingeAtStart = host.start.x < host.end.x;
    expect(door.flipDirection).toBe(!hingeAtStart);
    // Vantail du côté +y : normale (+n) du mur orienté vers +x.
    expect(door.flipSide).toBe(!hingeAtStart);
  });

  it('place la porte près d\'un angle sur le mur interrompu, pas sur le mur où se rabat le vantail', () => {
    // Charnière dans l'angle ; le vantail ouvert longe le mur vertical (plein).
    const r = parse(svg(`<path ${STROKE} d="M90,0 L400,0 M0,0 L0,300"/><path ${STROKE} d="M0,90 A90 90 0 0 0 90,0"/>`, 'viewBox="0 0 400 300"'), { totalWidthMeters: 4.1 });
    const horizontal = r.walls.find(isHorizontal)!;
    expect(len(horizontal)).toBeCloseTo(4, 1);
    expect(r.openings.length).toBe(1);
    expect(r.openings[0].wallId).toBe(horizontal.id);
    expect(r.openings[0].offset).toBeCloseTo(0.45, 2);
  });

  it('place la porte d\'un mur en double trait sur l\'axe du mur reconstitué', () => {
    const r = parse(svg(`
      <path ${STROKE} d="M0,0 H100 V20 H0 Z M190,0 H400 V20 H190 Z"/>
      <path ${STROKE} d="M100,110 A90 90 0 0 0 190,20"/>
    `, 'viewBox="0 0 400 300"'), { totalWidthMeters: 4 });
    expect(r.walls.length).toBe(1);
    expect(r.walls[0].thickness).toBeCloseTo(0.2, 2);
    expect(r.walls[0].start.y).toBeCloseTo(0.1, 2);
    expect(r.openings.length).toBe(1);
    expect(r.openings[0].offset).toBeCloseTo(1.45, 2);
    expect(r.openings[0].width).toBeCloseTo(0.9, 2);
  });

  it('accepte un battant en courbe de Bézier (Inkscape)', () => {
    const k = 0.5523 * 90;
    const r = parse(doorPlan(`M100,90 C${100 + k},90 190,${k} 190,0`), { totalWidthMeters: 4.2 });
    expect(r.openings.length).toBe(1);
    expect(r.openings[0].width).toBeCloseTo(0.9, 1);
  });

  it('mesure le rayon après transformations (fichier en mm)', () => {
    // Même plan en mm, avec un groupe à l'échelle 10 : le rayon local (9) vaut 90 cm.
    const r = parse(svg(`
      <g transform="scale(10)">
        <path fill="none" stroke="#000" stroke-width="0.2" d="M0,0 L10,0 M19,0 L40,0"/>
        <path fill="none" stroke="#000" stroke-width="0.2" d="M10,9 A9 9 0 0 0 19,0"/>
      </g>
    `, 'viewBox="0 0 400 300"'), { totalWidthMeters: 4 });
    // Sans mur vertical, l'emprise horizontale vaut exactement 4 m : rayon 9 × 10 unités = 0,90 m.
    expect(r.openings.length).toBe(1);
    expect(r.openings[0].width).toBeCloseTo(0.9, 2);
  });

  it('ignore une table ronde (arcs loin des murs) et un arc trop grand', () => {
    const r = parse(svg(`
      <path ${STROKE} d="M0,0 L1000,0"/>
      <path ${STROKE} d="M500,300 A60 60 0 0 1 560,360 A60 60 0 0 1 500,420"/>
      <path ${STROKE} d="M100,300 A300 300 0 0 1 400,600"/>
    `), { totalWidthMeters: 10 });
    expect(r.openings.length).toBe(0);
  });

  it('ne transforme pas le vantail ni la ligne de fermeture en murs', () => {
    const r = parse(doorPlan('M100,0 L100,90 A90 90 0 0 0 190,0 Z'), { totalWidthMeters: 4.2 });
    expect(r.walls.filter(w => isVertical(w) && len(w) < 2).length).toBe(0);
    expect(r.openings.length).toBe(1);
  });
});

describe('filtres et statistiques (F157)', () => {
  const plan = svg(`
    <path ${STROKE} d="M0,0 L100,0 M190,0 L400,0 M0,0 L0,300 M400,0 L400,300 M0,300 L400,300"/>
    <path ${STROKE} d="M100,90 A90 90 0 0 0 190,0"/>
  `, 'viewBox="0 0 400 300"');

  it('n\'importe aucune ouverture sans les murs et compte le résultat final', () => {
    const r = parse(plan, { totalWidthMeters: 4.2, importWalls: false, importDoors: true });
    expect(r.walls.length).toBe(0);
    expect(r.openings.length).toBe(0);
    expect(r.stats.wallCount).toBe(0);
    expect(r.stats.doorCount).toBe(0);
    expect(r.available.wallCount).toBe(4);
    expect(r.available.doorCount).toBe(1);
  });

  it('applique les filtres sans relancer la reconnaissance', () => {
    const detection = SvgPlanParser.detect(SvgPlanParser.analyze(plan), { totalWidthMeters: 4.2 });
    const a = SvgPlanParser.select(detection, { importDoors: false });
    const b = SvgPlanParser.select(detection, {});
    expect(a.openings.length).toBe(0);
    expect(b.openings.length).toBe(1);
    expect(a.walls.map(w => w.id)).toEqual(b.walls.map(w => w.id));
  });

  it('parseSvg(svg, options) donne le même résultat que les trois étapes de la modale (acquis 1.0.27)', () => {
    const options: SvgParseOptions = {
      totalWidthMeters: 4.2, defaultThickness: 0.2, defaultHeight: 2.5,
      importWalls: true, importDoors: true, importWindows: true, importRooms: true, importLabels: true
    };
    // Les identifiants sont aléatoires : on compare le reste.
    const strip = (r: SvgParseResult) => JSON.parse(JSON.stringify(r, (key, value) => (key === 'id' || key === 'wallId' ? undefined : value)));
    const direct = SvgPlanParser.parseSvg(plan, options);
    const staged = SvgPlanParser.select(SvgPlanParser.detect(SvgPlanParser.analyze(plan), options), options);
    expect(direct.success).toBe(true);
    expect(strip(staged)).toEqual(strip(direct));
  });
});

describe('pièces (F149, F153)', () => {
  it('nomme chaque pièce d\'après l\'étiquette qu\'elle contient, sans le contour du bâtiment', () => {
    const r = parse(svg(`
      <rect x="0" y="0" width="1000" height="800" fill="#eeeeee" stroke="#000" stroke-width="2"/>
      <rect x="0" y="0" width="600" height="800" fill="#ffd6a5" stroke="#000" stroke-width="2"/>
      <rect x="600" y="0" width="400" height="800" style="fill:#cde" stroke="#000" stroke-width="2"/>
      <text x="300" y="400" text-anchor="middle"><tspan x="300" y="400">Séjour</tspan><tspan x="300" dy="20">32,5 m²</tspan></text>
      <text x="800" y="400" text-anchor="middle">Chambre<tspan x="800" dy="20">parentale</tspan></text>
    `, 'viewBox="-50 -50 1100 900"'), { totalWidthMeters: 10 });
    const names = r.rooms.map(room => room.name).sort();
    expect(names).toEqual(['Chambre parentale', 'Séjour']);
    expect(r.rooms.find(room => room.name === 'Séjour')?.icon).toBe('mdi:sofa');
    expect(r.stats.textLabelCount).toBe(2);
  });

  it('ne fait pas du contour du bâtiment une pièce quand les cloisons sont de simples traits', () => {
    // Enveloppe 10 × 8 m recoupée par une cloison : deux pièces nommées, pas un « Salon » de 80 m².
    const r = parse(svg(`
      <rect x="0" y="0" width="1000" height="800" ${STROKE}/>
      <path ${STROKE} d="M500,0 L500,800"/>
      <text x="250" y="400" text-anchor="middle">Salon</text>
      <text x="750" y="400" text-anchor="middle">Chambre</text>
    `, 'viewBox="-50 -50 1100 900"'), { totalWidthMeters: 10.2 });
    expect(r.rooms.map(room => room.name).sort()).toEqual(['Chambre', 'Salon']);
    expect(r.rooms.every(room => room.areaM2 < 20)).toBe(true);
  });

  it('garde une chambre qui contient un placard dessiné comme une forme fermée', () => {
    // Placard de 2 × 0,6 m dans l'angle : son côté intérieur n'est pas une cloison de la chambre.
    const r = parse(svg(`
      <rect x="0" y="0" width="400" height="350" ${STROKE}/>
      <rect x="0" y="0" width="200" height="60" ${STROKE}/>
      <text x="100" y="35" text-anchor="middle" font-size="12">Placard</text>
      <text x="250" y="250" text-anchor="middle">Chambre</text>
    `), { totalWidthMeters: 4.2 });
    expect(r.rooms.map(room => room.name).sort()).toEqual(['Chambre', 'Placard']);
    expect(r.rooms.find(room => room.name === 'Chambre')?.areaM2).toBeCloseTo(14, 0);
  });

  it('garde une pièce étiquetée qui contient un mur en épi (extrémité libre)', () => {
    const r = parse(svg(`
      <rect x="0" y="0" width="600" height="400" ${STROKE}/>
      <path ${STROKE} d="M400,0 L400,150"/>
      <text x="150" y="250">Séjour</text>
    `), { totalWidthMeters: 6.2 });
    expect(r.rooms.map(room => room.name)).toEqual(['Séjour']);
    // Le contour lui-même (6 × 4 m), et non une pièce approximative de 3,6 m autour de l'étiquette.
    expect(r.rooms[0].areaM2).toBeCloseTo(24, 0);
  });

  it('ne fait pas d\'une emprise remplie et cloisonnée, sans étiquette, une pièce géante', () => {
    // (Marge autour du plan : une forme qui couvre toute la page n'est jamais une pièce.)
    const filled = 'fill="#eee" stroke="#000" stroke-width="2"';
    const partitioned = parse(svg(`
      <rect x="0" y="0" width="1000" height="800" ${filled}/>
      <path ${STROKE} d="M500,0 L500,800"/>
    `, 'viewBox="-50 -50 1100 900"'), { totalWidthMeters: 10.2 });
    expect(partitioned.walls.length).toBeGreaterThanOrEqual(5);
    expect(partitioned.rooms.length).toBe(0);
    // Un simple épi ne cloisonne pas : la pièce remplie est gardée.
    const stub = parse(svg(`
      <rect x="0" y="0" width="1000" height="800" ${filled}/>
      <path ${STROKE} d="M500,0 L500,250"/>
    `, 'viewBox="-50 -50 1100 900"'), { totalWidthMeters: 10.2 });
    expect(stub.rooms.length).toBe(1);
    expect(stub.rooms[0].areaM2).toBeCloseTo(80, 0);
  });

  it('ne prend pas un sommet de fermeture presque confondu pour un contour qui se recoupe', () => {
    // Bruit de conversion : le dernier sommet est à 0,01 unité du premier, sur la première arête.
    const r = parse(svg(`
      <path ${STROKE} d="M0,0 L400,0 L400,300 L0,300 L0.01,0 Z"/>
      <text x="150" y="150">Bureau</text>
    `), { totalWidthMeters: 4.2 });
    expect(r.rooms.map(room => room.name)).toEqual(['Bureau']);
    expect(r.ignoredRooms).toEqual([]);
  });

  it('garde une pièce ouverte qui porte deux étiquettes sans cloison intérieure', () => {
    const r = parse(svg(`
      <rect x="0" y="0" width="1000" height="600" fill="#eef" stroke="#000" stroke-width="2"/>
      <text x="250" y="300">Cuisine</text>
      <text x="750" y="300">Séjour</text>
    `), { totalWidthMeters: 10.2 });
    expect(r.rooms.length).toBe(1);
    expect(r.rooms[0].areaM2).toBeGreaterThan(55);
  });

  it('accepte un WC étiqueté de 1,08 m² et un garage de 350 m², signale les formes hors bornes', () => {
    const r = parse(svg(`
      <rect x="0" y="0" width="120" height="90" ${STROKE}/>
      <text x="60" y="45" text-anchor="middle">WC</text>
      <rect x="1000" y="0" width="1750" height="2000" ${STROKE}/>
      <text x="1875" y="1000" text-anchor="middle">Garage</text>
      <rect x="3000" y="0" width="60" height="60" ${STROKE}/>
      <text x="3030" y="32" text-anchor="middle" font-size="6">Gaine</text>
    `, 'viewBox="0 0 3060 2000"'), { totalWidthMeters: 30.8 });
    const wc = r.rooms.find(room => room.name === 'WC');
    expect(wc?.areaM2).toBeCloseTo(1.08, 2);
    expect(r.rooms.find(room => room.name === 'Garage')?.areaM2).toBeCloseTo(350, 0);
    expect(r.ignoredRooms.map(i => i.name)).toEqual(['Gaine']);
  });

  it('ne prend pas une surface pour un nom et ignore les formes non remplies sans étiquette', () => {
    const r = parse(svg(`
      <rect x="0" y="0" width="400" height="300" ${STROKE}/>
      <text x="200" y="150">12,5 m²</text>
      <rect x="500" y="0" width="400" height="300" ${STROKE}/>
    `), { totalWidthMeters: 9 });
    expect(r.rooms.length).toBe(0);
  });

  it('écarte et signale un contour qui se recoupe au lieu de lui attribuer une surface fausse (F170)', () => {
    // Nœud papillon asymétrique (les arêtes 0,0→400,300 et 400,100→0,300 se croisent) et une vraie pièce.
    const r = parse(svg(`
      <polygon points="0,0 400,300 400,100 0,300" ${STROKE}/>
      <text x="60" y="150">Salon</text>
      <rect x="500" y="0" width="400" height="300" ${STROKE}/>
      <text x="650" y="150">Bureau</text>
      <polygon points="0,400 400,780 400,500 0,780" fill="#cde" stroke="none"/>
    `), { totalWidthMeters: 9 });
    expect(r.rooms.map(room => room.name)).toEqual(['Bureau']);
    const ignored = r.ignoredRooms.map(i => `${i.name}:${i.reason}`).sort();
    expect(ignored).toEqual([':self_intersecting', 'Salon:self_intersecting']);
    expect(r.ignoredRooms.every(i => i.areaM2 > 0)).toBe(true);
  });

  it('signale le motif d\'une forme étiquetée hors bornes, sans pièce approximative à sa place', () => {
    const r = parse(svg(`
      <rect x="0" y="0" width="400" height="300" ${STROKE}/>
      <text x="150" y="150">Cellier</text>
    `), { totalWidthMeters: 4, minRoomAreaM2: 20 });
    expect(r.rooms.length).toBe(0);
    expect(r.ignoredRooms).toEqual([{ name: 'Cellier', areaM2: expect.any(Number), reason: 'area' }]);
  });

  it('renomme « Pièce N » quand les noms ne sont pas importés', () => {
    const content = svg(`<rect x="0" y="0" width="400" height="300" ${STROKE}/><text x="150" y="150">Bureau</text>`);
    const r = parse(content, { totalWidthMeters: 4, importLabels: false });
    expect(r.rooms.map(room => room.name)).toEqual(['Pièce 1']);
    expect(r.stats.textLabelCount).toBe(0);
  });
});

describe('échelle, unités et transformations (F70, F71, F72, F155)', () => {
  it('applique la largeur à l\'emprise des murs et non à la page', () => {
    // Page A4 de 1000 unités, maison de 600 unités de large au centre.
    const r = parse(svg(`<rect x="200" y="200" width="600" height="400" ${STROKE}/><text x="20" y="780">Cartouche — Plan RDC</text>`), { totalWidthMeters: 12 });
    expect(r.widthReference).toBe('walls');
    expect(r.footprint?.width).toBeCloseTo(12, 1);
    const horizontal = r.walls.filter(isHorizontal);
    // Emprise = axe + demi-épaisseurs (0,20 m par défaut) : axe ≈ 11,8 m.
    expect(len(horizontal[0])).toBeCloseTo(11.8, 1);
  });

  it('ne renvoie plus de pixelsPerMeter dérivé des unités du SVG', () => {
    const r = parse(svg(`<path ${STROKE} d="M0,0 L15000,0"/>`, 'viewBox="0 0 15000 10000"'), { totalWidthMeters: 12 });
    expect('pixelsPerMeter' in r).toBe(false);
    expect(r.metersPerUnit).toBeGreaterThan(0);
  });

  it('aligne le calque Inkscape en mm sur la viewBox (et non sur width/height)', () => {
    const analysis = SvgPlanParser.analyze(svg(`<path fill="none" stroke="#000" stroke-width="0.5" d="M10,10 L200,10"/>`, 'width="210mm" height="297mm" viewBox="0 0 210 297"'));
    expect(analysis.viewBox).toEqual({ x: 0, y: 0, width: 210, height: 297 });
    const r = SvgPlanParser.select(SvgPlanParser.detect(analysis, { totalWidthMeters: 12 }), {});
    // Le calque (210 unités) mesure 210 × metersPerUnit mètres : cohérent avec les murs.
    const wall = r.walls[0];
    expect(len(wall)).toBeCloseTo(190 * r.metersPerUnit, 1);
  });

  it('utilise l\'emprise du contenu quand width est en % sans viewBox', () => {
    const analysis = SvgPlanParser.analyze(`<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><path ${STROKE} d="M50,50 L650,50 L650,450"/></svg>`);
    expect(analysis.viewBoxSource).toBe('content');
    expect(analysis.viewBox.width).toBeGreaterThan(600);
    expect(analysis.viewBox.width).toBeLessThan(700);
    expect(analysis.markup).toContain('viewBox=');
  });

  it('convertit les unités dans les coordonnées et applique skewX/skewY et rotate', () => {
    const r = parse(svg(`
      <line x1="0" y1="0" x2="10mm" y2="0" ${STROKE}/>
      <g transform="rotate(90)"><line x1="0" y1="-100" x2="37.795" y2="-100" ${STROKE}/></g>
    `, 'viewBox="0 0 200 200"'), { totalWidthMeters: 1 });
    expect(r.walls.length).toBe(2);
    expect(r.walls.some(isVertical)).toBe(true);
    const skewed = parse(svg(`<g transform="skewX(45)"><line x1="0" y1="0" x2="0" y2="100" ${STROKE}/></g>`, 'viewBox="0 0 200 200"'), { totalWidthMeters: 1 });
    const w = skewed.walls[0];
    expect(Math.abs(w.end.x - w.start.x)).toBeGreaterThan(0.5);
  });

  it('gère un <svg> imbriqué avec sa propre viewBox', () => {
    const r = parse(svg(`<svg x="100" y="100" width="500" height="500" viewBox="0 0 50 50"><path ${STROKE} d="M0,0 L50,0"/></svg><path ${STROKE} d="M100,700 L600,700"/>`), { totalWidthMeters: 5 });
    const lengths = sortedLengths(r.walls);
    expect(lengths[0]).toBeCloseTo(lengths[1], 1);
  });
});

describe('robustesse et préparation du calque (F156)', () => {
  it('signale une erreur de syntaxe XML', () => {
    const r = SvgPlanParser.parseSvg('<svg xmlns="http://www.w3.org/2000/svg"><rect></svg>');
    expect(r.success).toBe(false);
    expect(r.error).toMatch(/SVG invalide/);
  });

  it('retire le DOCTYPE du SVG à téléverser', () => {
    const analysis = SvgPlanParser.analyze('<?xml version="1.0"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M0 0 L10 10"/></svg>');
    expect(analysis.success).toBe(true);
    expect(analysis.markup).not.toMatch(/DOCTYPE/i);
    expect(analysis.markup.startsWith('<svg')).toBe(true);
  });

  it('décode un SVG Latin-1 selon l\'encodage déclaré', () => {
    const head = '<?xml version="1.0" encoding="ISO-8859-1"?><svg><text>S';
    const bytes = new Uint8Array([...Array.from(head, c => c.charCodeAt(0)), 0xe9, ...Array.from('jour</text></svg>', c => c.charCodeAt(0))]);
    expect(decodeSvgBytes(bytes)).toContain('Séjour');
  });

  it('décode l\'UTF-8 par défaut et repli windows-1252 si invalide', () => {
    expect(decodeSvgBytes(new TextEncoder().encode('<svg><text>Séjour</text></svg>'))).toContain('Séjour');
    expect(decodeSvgBytes(new Uint8Array([0x3c, 0x73, 0x3e, 0xe9, 0x3c]))).toContain('é');
  });

  it('décode en windows-1252 un fichier Latin-1 qui se déclare à tort en UTF-8', () => {
    const head = '<?xml version="1.0" encoding="UTF-8"?><svg><text>S';
    const bytes = new Uint8Array([...Array.from(head, c => c.charCodeAt(0)), 0xe9, ...Array.from('jour</text></svg>', c => c.charCodeAt(0))]);
    expect(decodeSvgBytes(bytes)).toContain('Séjour');
    // Un vrai UTF-8 déclaré reste décodé en UTF-8.
    expect(decodeSvgBytes(new TextEncoder().encode('<?xml version="1.0" encoding="utf-8"?><svg><text>Séjour</text></svg>'))).toContain('Séjour');
  });
});
