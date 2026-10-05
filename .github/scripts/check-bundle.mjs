#!/usr/bin/env node
/**
 * Vérifie le frontend construit par `vite build` (constats F32 et F164) :
 *  - les deux entrées existent (home_architect-card.js et home_architect-panel.js) ;
 *  - la carte, injectée sur TOUTES les pages HA, ne définit que des éléments de la carte
 *    (aucun élément du studio dans ses imports statiques) et respecte un budget gzip ;
 *  - aucun chunk n'importe une entrée : HA les charge avec ?v=<version>, un chunk qui importerait
 *    l'URL sans ?v en évaluerait une seconde copie (ou une ancienne version en cache HTTP) ;
 *  - aucun chunk orphelin ni sourcemap n'est livré.
 *
 * Usage : node .github/scripts/check-bundle.mjs [dossier]
 *         (défaut : custom_components/home_architect/frontend)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT_DIR = path.resolve(process.argv[2] ?? path.join(ROOT_DIR, 'custom_components', 'home_architect', 'frontend'));

const CARD_ENTRY = 'home_architect-card.js';
const PANEL_ENTRY = 'home_architect-panel.js';
const ENTRIES = [CARD_ENTRY, PANEL_ENTRY];
const CHUNKS_DIR = 'chunks/';
// Budget du bundle carte (entrée + chunks importés statiquement), compressé gzip.
// L'ancien bundle unique pesait ~100 kB gzip ; la carte seule en pèse environ le tiers.
const CARD_GZIP_BUDGET = 80 * 1024;
// Éléments autorisés dans le bundle carte : la carte (et son éditeur éventuel) et le canevas.
const CARD_ALLOWED_TAG = /^home-architect-(card|canvas)(-[a-z0-9-]+)?$/;

const STATIC_IMPORT_RE = /(?:\bfrom|\bimport)\s*["'](\.{1,2}\/[^"']+)["']/g;
const DYNAMIC_IMPORT_RE = /\bimport\(\s*["'](\.{1,2}\/[^"']+)["']\s*\)/g;
// Définition d'un élément : defineElement('tag', Classe) ou décorateur customElement('tag'), dont le
// nom est minifié (appel de fonction, pas de méthode), ou customElements.define('tag', …). Une simple
// mention du nom (customElements.get, querySelector, registre des bundles) n'en est pas une.
const ELEMENT_DEFINITION_RE = /(?:\bcustomElements\.define|(?<![.\w$])[\w$]+)\(\s*(["'`])(home-architect-[a-z0-9-]+)\1/g;

const errors = new Set();

/** Imports relatifs de `file` (statiques, et dynamiques si demandé), en chemins du dossier de sortie. */
function relativeImports(file, code, { followDynamic }) {
  const patterns = followDynamic ? [STATIC_IMPORT_RE, DYNAMIC_IMPORT_RE] : [STATIC_IMPORT_RE];
  return patterns.flatMap((pattern) =>
    [...code.matchAll(pattern)].map((match) => path.posix.normalize(path.posix.join(path.posix.dirname(file), match[1])))
  );
}

/** Fichiers atteints depuis `entry` par imports relatifs (statiques, et dynamiques si demandé). */
function closure(entry, { followDynamic }) {
  const seen = new Set();
  const stack = [entry];
  while (stack.length > 0) {
    const file = stack.pop();
    if (seen.has(file)) continue;
    seen.add(file);
    const absolute = path.join(OUT_DIR, file);
    if (!fs.existsSync(absolute)) {
      errors.add(`${file} est importé mais absent du dossier de sortie.`);
      continue;
    }
    stack.push(...relativeImports(file, fs.readFileSync(absolute, 'utf-8'), { followDynamic }));
  }
  return seen;
}

// Métadonnées locales de macOS (ignorées par git, donc jamais livrées).
const IGNORED_FILES = new Set(['.DS_Store']);

function listFiles(dir, prefix = '') {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((dirent) => !IGNORED_FILES.has(dirent.name))
    .flatMap((dirent) =>
      dirent.isDirectory() ? listFiles(path.join(dir, dirent.name), `${prefix}${dirent.name}/`) : [`${prefix}${dirent.name}`]
    );
}

function readExisting(files) {
  return [...files].filter((file) => fs.existsSync(path.join(OUT_DIR, file))).map((file) => fs.readFileSync(path.join(OUT_DIR, file)));
}

function measure(files) {
  const contents = readExisting(files);
  return {
    raw: contents.reduce((sum, content) => sum + content.length, 0),
    gzip: contents.reduce((sum, content) => sum + zlib.gzipSync(content, { level: 9 }).length, 0)
  };
}

const kib = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`;

if (!fs.existsSync(OUT_DIR)) {
  console.error(`✗ Dossier de sortie introuvable : ${OUT_DIR} (lancez \`npm run build\`).`);
  process.exit(1);
}

const missingEntries = ENTRIES.filter((entry) => !fs.existsSync(path.join(OUT_DIR, entry)));
if (missingEntries.length > 0) {
  console.error(`✗ Entrée(s) manquante(s) : ${missingEntries.join(', ')}`);
  process.exit(1);
}

const cardFiles = closure(CARD_ENTRY, { followDynamic: false });
const cardCode = readExisting(cardFiles).join('\n');
const foreignTags = new Set(
  [...cardCode.matchAll(ELEMENT_DEFINITION_RE)].map((match) => match[2]).filter((tag) => !CARD_ALLOWED_TAG.test(tag))
);
if (foreignTags.size > 0) {
  errors.add(`Le bundle carte embarque des éléments du studio : ${[...foreignTags].sort().join(', ')}.`);
}

// Un module placé par Rollup dans le chunk d'entrée et importé par un chunk à la demande produit
// `import { … } from '../home_architect-card.js'` : URL sans ?v, donc seconde copie du bundle.
for (const file of listFiles(OUT_DIR).filter((name) => name.startsWith(CHUNKS_DIR) && name.endsWith('.js'))) {
  const code = fs.readFileSync(path.join(OUT_DIR, file), 'utf-8');
  for (const entry of new Set(relativeImports(file, code, { followDynamic: true }).filter((target) => ENTRIES.includes(target)))) {
    errors.add(
      `${file} importe l'entrée ${entry} : les entrées sont chargées avec ?v=, ce chunk en évaluerait une seconde copie (ou une version en cache)`
    );
  }
}

const card = measure(cardFiles);
const panelFiles = closure(PANEL_ENTRY, { followDynamic: true });
const panel = measure(panelFiles);
console.log(`Carte  (${cardFiles.size} fichier(s), imports statiques) : ${kib(card.raw)} brut, ${kib(card.gzip)} gzip`);
console.log(`Studio (${panelFiles.size} fichier(s), avec import())     : ${kib(panel.raw)} brut, ${kib(panel.gzip)} gzip`);
if (card.gzip > CARD_GZIP_BUDGET) {
  errors.add(`Le bundle carte dépasse son budget : ${kib(card.gzip)} gzip > ${kib(CARD_GZIP_BUDGET)}.`);
}

const used = new Set([...closure(CARD_ENTRY, { followDynamic: true }), ...panelFiles]);
for (const file of listFiles(OUT_DIR)) {
  if (file.endsWith('.map')) errors.add(`Sourcemap livrée : ${file}`);
  else if (!used.has(file)) errors.add(`Fichier orphelin (importé par aucune entrée) : ${file}`);
}

if (errors.size > 0) {
  for (const message of errors) console.error(`✗ ${message}`);
  process.exit(1);
}
console.log('✓ Bundle frontend conforme.');
