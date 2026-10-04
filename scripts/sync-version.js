#!/usr/bin/env node
/**
 * Synchronise la version unique du projet dans tous les fichiers cibles :
 * - package.json (Source principale ou argument CLI)
 * - custom_components/home_architect/manifest.json
 * - custom_components/home_architect/const.py
 * - src/version.ts
 * - README.md (Badge version)
 *
 * Usage:
 *   node scripts/sync-version.js [nouvelle_version]
 *   Ex: node scripts/sync-version.js 1.0.23
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const PACKAGE_JSON_PATH = path.join(ROOT_DIR, 'package.json');
const MANIFEST_JSON_PATH = path.join(ROOT_DIR, 'custom_components', 'home_architect', 'manifest.json');
const CONST_PY_PATH = path.join(ROOT_DIR, 'custom_components', 'home_architect', 'const.py');
const VERSION_TS_PATH = path.join(ROOT_DIR, 'src', 'version.ts');
const README_PATH = path.join(ROOT_DIR, 'README.md');

// 1. Déterminer la version
const targetVersionArg = process.argv[2];
let versionToApply = '';

if (targetVersionArg) {
  versionToApply = targetVersionArg.replace(/^v/, '').trim();
} else {
  const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'));
  versionToApply = pkg.version.replace(/^v/, '').trim();
}

if (!versionToApply || !/^\d+\.\d+\.\d+/.test(versionToApply)) {
  console.error(`❌ Version invalide : "${versionToApply}". Format attendu: X.Y.Z`);
  process.exit(1);
}

console.log(`🚀 Synchronisation de la version unique vers v${versionToApply}...`);

// 2. package.json
const pkgData = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'));
pkgData.version = versionToApply;
fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(pkgData, null, 2) + '\n', 'utf-8');
console.log(`  ✓ package.json -> ${versionToApply}`);

// 3. manifest.json
if (fs.existsSync(MANIFEST_JSON_PATH)) {
  const manifestData = JSON.parse(fs.readFileSync(MANIFEST_JSON_PATH, 'utf-8'));
  manifestData.version = versionToApply;
  fs.writeFileSync(MANIFEST_JSON_PATH, JSON.stringify(manifestData, null, 2) + '\n', 'utf-8');
  console.log(`  ✓ manifest.json -> ${versionToApply}`);
}

// 4. const.py
if (fs.existsSync(CONST_PY_PATH)) {
  let constContent = fs.readFileSync(CONST_PY_PATH, 'utf-8');
  constContent = constContent.replace(/VERSION\s*=\s*["'][^"']+["']/, `VERSION = "${versionToApply}"`);
  fs.writeFileSync(CONST_PY_PATH, constContent, 'utf-8');
  console.log(`  ✓ const.py -> ${versionToApply}`);
}

// 5. src/version.ts
fs.writeFileSync(VERSION_TS_PATH, `export const VERSION = '${versionToApply}';\n`, 'utf-8');
console.log(`  ✓ src/version.ts -> ${versionToApply}`);

// 6. README.md
if (fs.existsSync(README_PATH)) {
  let readmeContent = fs.readFileSync(README_PATH, 'utf-8');
  readmeContent = readmeContent.replace(
    /badge\/version-[^-\s]+-(?:blue|green)\.svg/,
    `badge/version-${versionToApply}-blue.svg`
  );
  readmeContent = readmeContent.replace(
    /alt="Version [^"]+"/,
    `alt="Version ${versionToApply}"`
  );
  fs.writeFileSync(README_PATH, readmeContent, 'utf-8');
  console.log(`  ✓ README.md -> ${versionToApply}`);
}

console.log(`✨ Toutes les versions sont synchronisées sur ${versionToApply} !`);
