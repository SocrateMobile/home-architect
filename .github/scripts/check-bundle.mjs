#!/usr/bin/env node
/**
 * Vérifie le frontend construit par `vite build` (constats F32 et F164) :
 *  - les deux entrées existent (home_architect-card.js et home_architect-panel.js) ;
 *  - la carte, injectée sur TOUTES les pages HA, ne contient que des éléments de la carte
 *    (aucun élément du studio dans ses imports statiques) et respecte un budget gzip ;
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
// Budget du bundle carte (entrée + chunks importés statiquement), compressé gzip.
// L'ancien bundle unique pesait ~100 kB gzip ; la carte seule en pèse environ le tiers.
const CARD_GZIP_BUDGET = 80 * 1024;
// Éléments autorisés dans le bundle carte : la carte (et son éditeur éventuel) et le canevas.
const CARD_ALLOWED_TAG = /^home-architect-(card|canvas)(-[a-z0-9-]+)?$/;

const STATIC_IMPORT_RE = /(?:\bfrom|\bimport)\s*["'](\.{1,2}\/[^"']+)["']/g;
const DYNAMIC_IMPORT_RE = /\bimport\(\s*["'](\.{1,2}\/[^"']+)["']\s*\)/g;

const errors = new Set();

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
    const code = fs.readFileSync(absolute, 'utf-8');
    const patterns = followDynamic ? [STATIC_IMPORT_RE, DYNAMIC_IMPORT_RE] : [STATIC_IMPORT_RE];
    for (const pattern of patterns) {
      for (const match of code.matchAll(pattern)) {
        stack.push(path.posix.normalize(path.posix.join(path.posix.dirname(file), match[1])));
      }
    }
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

const missingEntries = [CARD_ENTRY, PANEL_ENTRY].filter((entry) => !fs.existsSync(path.join(OUT_DIR, entry)));
if (missingEntries.length > 0) {
  console.error(`✗ Entrée(s) manquante(s) : ${missingEntries.join(', ')}`);
  process.exit(1);
}

const cardFiles = closure(CARD_ENTRY, { followDynamic: false });
const cardCode = readExisting(cardFiles).join('\n');
const foreignTags = new Set(
  [...cardCode.matchAll(/["'`](home-architect-[a-z0-9-]+)/g)].map((match) => match[1]).filter((tag) => !CARD_ALLOWED_TAG.test(tag))
);
if (foreignTags.size > 0) {
  errors.add(`Le bundle carte embarque des éléments du studio : ${[...foreignTags].sort().join(', ')}.`);
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
