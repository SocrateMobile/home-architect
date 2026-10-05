#!/usr/bin/env node
/**
 * Synchronise la version unique du projet dans tous les fichiers cibles :
 * - package.json et package-lock.json (source principale, ou argument CLI)
 * - custom_components/home_architect/manifest.json (clés triées dans l'ordre hassfest)
 * - custom_components/home_architect/const.py
 * - src/version.ts
 * - README.md (badge de version)
 *
 * Chaque remplacement doit trouver sa cible exactement une fois : sinon le script échoue
 * sans rien écrire (aucune mise à jour silencieusement ignorée).
 *
 * Usage :
 *   npm version 1.2.0 --no-git-tag-version   # flux recommandé (le script « version » appelle ce fichier)
 *   node scripts/sync-version.js [version]    # applique la version donnée, ou celle de package.json
 *   node scripts/sync-version.js --check      # vérifie seulement que tout est synchronisé (CI)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const PACKAGE_JSON_PATH = path.join(ROOT_DIR, 'package.json');
const PACKAGE_LOCK_PATH = path.join(ROOT_DIR, 'package-lock.json');
const MANIFEST_JSON_PATH = path.join(ROOT_DIR, 'custom_components', 'home_architect', 'manifest.json');
const CONST_PY_PATH = path.join(ROOT_DIR, 'custom_components', 'home_architect', 'const.py');
const VERSION_TS_PATH = path.join(ROOT_DIR, 'src', 'version.ts');
const README_PATH = path.join(ROOT_DIR, 'README.md');

// SemVer 2.0.0 complet (pré-versions et métadonnées de build comprises), ancré des deux côtés.
const SEMVER_RE =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

class SyncError extends Error {}

function readFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new SyncError(`Fichier introuvable : ${path.relative(ROOT_DIR, filePath)}`);
  }
  return fs.readFileSync(filePath, 'utf-8');
}

function toJson(data) {
  return JSON.stringify(data, null, 2) + '\n';
}

/** Remplace l'unique occurrence de `pattern` ; échoue si elle est absente ou multiple. */
function replaceExactlyOnce(content, pattern, replacement, label) {
  const flags = pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g';
  const matches = content.match(new RegExp(pattern.source, flags)) ?? [];
  if (matches.length !== 1) {
    throw new SyncError(`${label} : ${matches.length} occurrence(s) trouvée(s), 1 attendue (motif ${pattern}).`);
  }
  return content.replace(pattern, replacement);
}

/** Ordre exigé par hassfest : domain, name, puis les autres clés par ordre alphabétique. */
function sortManifestKeys(manifest) {
  const { domain, name, ...rest } = manifest;
  const sorted = { domain, name };
  for (const key of Object.keys(rest).sort()) sorted[key] = rest[key];
  return sorted;
}

/** Message d'un badge shields.io statique : « - » s'écrit « -- », « _ » s'écrit « __ ». */
function shieldsEscape(text) {
  return encodeURIComponent(text).replace(/-/g, '--').replace(/_/g, '__');
}

function buildTargets(version) {
  const targets = [];

  const pkg = JSON.parse(readFile(PACKAGE_JSON_PATH));
  pkg.version = version;
  targets.push({ filePath: PACKAGE_JSON_PATH, content: toJson(pkg) });

  const lock = JSON.parse(readFile(PACKAGE_LOCK_PATH));
  if (!lock.packages?.['']) {
    throw new SyncError('package-lock.json : entrée racine packages[""] absente (lockfileVersion >= 2 attendu).');
  }
  lock.version = version;
  lock.packages[''].version = version;
  targets.push({ filePath: PACKAGE_LOCK_PATH, content: toJson(lock) });

  const manifest = JSON.parse(readFile(MANIFEST_JSON_PATH));
  manifest.version = version;
  targets.push({ filePath: MANIFEST_JSON_PATH, content: toJson(sortManifestKeys(manifest)) });

  // Ancré en début de ligne : ne capture jamais MIN_HA_VERSION ou une autre constante *_VERSION.
  targets.push({
    filePath: CONST_PY_PATH,
    content: replaceExactlyOnce(
      readFile(CONST_PY_PATH),
      /^(VERSION(?:\s*:\s*[\w.[\]]+)?\s*=\s*)(["'])[^"'\n]*\2[ \t]*$/m,
      `$1$2${version}$2`,
      'const.py (VERSION)'
    )
  });

  targets.push({
    filePath: VERSION_TS_PATH,
    content: replaceExactlyOnce(
      readFile(VERSION_TS_PATH),
      /^(export const VERSION\s*=\s*)(['"])[^'"\n]*\2;?[ \t]*$/m,
      `$1$2${version}$2;`,
      'src/version.ts (VERSION)'
    )
  });

  let readme = readFile(README_PATH);
  readme = replaceExactlyOnce(
    readme,
    /(https:\/\/img\.shields\.io\/badge\/version-)(?:[^-\s"'/?]|--)+(-[0-9a-zA-Z]+(?:\.svg)?)(?=[?"'\s)]|$)/m,
    `$1${shieldsEscape(version)}$2`,
    'README.md (badge de version)'
  );
  readme = replaceExactlyOnce(readme, /alt="Version [^"]*"/, `alt="Version ${version}"`, 'README.md (texte alternatif du badge)');
  targets.push({ filePath: README_PATH, content: readme });

  return targets;
}

function main() {
  const args = process.argv.slice(2);
  const checkOnly = args.includes('--check');
  const positional = args.filter((arg) => !arg.startsWith('--'));
  if (positional.length > 1 || args.some((arg) => arg.startsWith('--') && arg !== '--check')) {
    throw new SyncError('Usage : node scripts/sync-version.js [version] [--check]');
  }

  const rawVersion = positional[0] ?? JSON.parse(readFile(PACKAGE_JSON_PATH)).version;
  const version = String(rawVersion ?? '').trim().replace(/^v/, '');
  if (!SEMVER_RE.test(version)) {
    throw new SyncError(`Version invalide : "${rawVersion}". Format attendu : X.Y.Z ou X.Y.Z-pre.N (SemVer).`);
  }

  // Tout est calculé avant la moindre écriture : un échec ne laisse aucun fichier à moitié synchronisé.
  const targets = buildTargets(version);
  const outdated = targets.filter(({ filePath, content }) => fs.readFileSync(filePath, 'utf-8') !== content);

  if (checkOnly) {
    if (outdated.length > 0) {
      for (const { filePath } of outdated) {
        console.error(`  ✗ ${path.relative(ROOT_DIR, filePath)} n'est pas synchronisé sur ${version}`);
      }
      throw new SyncError('Versions désynchronisées : lancez `npm run version:sync`.');
    }
    console.log(`✓ Tous les fichiers sont synchronisés sur ${version}.`);
    return;
  }

  console.log(`Synchronisation de la version vers ${version}...`);
  for (const { filePath, content } of targets) {
    const relative = path.relative(ROOT_DIR, filePath);
    if (outdated.some((target) => target.filePath === filePath)) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`  ✓ ${relative} mis à jour`);
    } else {
      console.log(`  = ${relative} déjà à jour`);
    }
  }
}

try {
  main();
} catch (error) {
  if (!(error instanceof SyncError)) throw error;
  console.error(`✗ ${error.message}`);
  process.exit(1);
}
