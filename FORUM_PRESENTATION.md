# 🏛️ Présentation de Home Architect pour les Forums & Communautés

Ce document contient deux modèles prêts à l'emploi (un en **Anglais** pour le forum officiel *Home Assistant Community*, et un en **Français** pour *HACF / Domo-Attitude*).

---

## 🇬🇧 Version Anglaise (Home Assistant Community Forum)
> **Catégorie recommandée** : *Share your Projects!* ou *Custom Integrations*  
> **Tags recommandés** : `hacs`, `custom-component`, `dashboard`, `floorplan`, `lovelace`, `cad`

```markdown
# 🏛️ Home Architect – The Interactive 2D/3D Floor Plan Studio built directly into Home Assistant

Hello everyone! 👋

I'm thrilled to share **Home Architect**, a full-featured architectural CAD studio and interactive 2D/3D floor plan creator running natively inside Home Assistant.

No external software, no complex Blender pipelines, and no SVG editing tools needed. Everything is drawn, measured, furnished, and linked to your entities directly inside your browser!

[![HACS Badge](https://img.shields.io/badge/HACS-Custom_Integration-orange.svg?style=for-the-badge)](https://github.com/SocrateMobile/home-architect)
[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg?style=for-the-badge)](https://github.com/SocrateMobile/home-architect/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge)](https://github.com/SocrateMobile/home-architect/blob/main/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Socrate-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=000000)](https://buymeacoffee.com/Socrate)

---

## ✨ Key Features

### 📐 1. Full 2D Architectural CAD Engine
* **Precision Wall Drawing**: Draw walls with actual architectural thicknesses (Partition 10 cm, Standard 15 cm, Load-bearing 20 cm, Exterior 30 cm).
* **Smart Magnetic Snapping**: Vertex snapping, automatic angle constraints (0°, 45°, 90°, 135°, 180°), and dynamic alignment guides.
* **Automatic Room Detection**: Calculates exact room boundaries, surface areas ($m^2$), and perimeter in real-time.
* **Openings & Joinery**: Insert single doors, double doors, sliding doors, windows, and French windows with custom swing directions (keyboard shortcuts `Space` and `F`).
* **Scale Calibration**: Import a rough sketch or image blueprint, calibrate the scale using a known distance or wall length, and watch all dimensions automatically adapt!

### 🛋️ 2. Vector Furniture Catalog
* Pre-styled, responsive architectural furniture: Sofas, Méridiennes/Divans, Stark chairs, Dining tables, Desks, Double beds, Consoles, TVs, Rugs, and more.
* **Interactive Transformation Handles**:
  * 🔄 **Degree-by-degree orientation** handle (precise 360° rotation with angle badge).
  * ↔️ **Corner resize handle**: Stretch or shrink furniture length and width in real-time with pixel precision.
  * Free pixel-by-pixel drag-and-drop.

### 🧊 3. Real-time 3D Isometric View
* Instantly toggle between 2D technical view and **3D Isometric view** with a single click (`🧊`).
* Real-time wall extrusion with directional sunlight simulation and drop shadows.
* 360° interactive camera orbit (mouse drag / right click), with camera presets: South-West, South-East, North-East, North-West, and Top-down.
* **Quarter-turn view rotation (`↺`)**: Rotate the plan by 90° increments with full responsive adaptation (no borders, entire screen usable).

### 💡 4. Native Home Assistant Integration
* **Docked Entity Sidebar**: Browse and filter all your entities (Lights, Climate, Switches, Sensors, Cameras, Covers).
* **Drag-and-Drop Pinning**: Drop an entity badge directly onto a room or a piece of furniture.
* **Live Status**: Real-time state updates, color changes, and interactive popups/toggles directly from the plan.
* **Automated Lovelace Card Generator**: Export your plan into an interactive Lovelace card ready to be embedded into your dashboards!

### 💾 5. Native HA Storage & Multi-floor Support
* Saves atomically to Home Assistant `.storage` via secure WebSockets.
* Multi-level management (Basement, Ground Floor, 1st Floor, Garden, etc.).
* Undo / Redo history (`Ctrl+Z` / `Ctrl+Y`).

---

## 📦 Installation via HACS

1. Open **HACS** in Home Assistant.
2. Click the three dots menu (top right) ➔ **Custom repositories**.
3. Add `https://github.com/SocrateMobile/home-architect` with category **Integration**.
4. Search for **Home Architect**, click **Download**, and restart Home Assistant.
5. In **Settings ➔ Devices & Services ➔ Add Integration**, search for **Home Architect**.
6. Access the studio directly from your sidebar at `/home-architect`!

---

## 🔗 Links & Repository

* 🐙 **GitHub Repository**: [https://github.com/SocrateMobile/home-architect](https://github.com/SocrateMobile/home-architect)
* 🐛 **Issue Tracker**: [https://github.com/SocrateMobile/home-architect/issues](https://github.com/SocrateMobile/home-architect/issues)
* ☕ **Support the Project**: [https://buymeacoffee.com/Socrate](https://buymeacoffee.com/Socrate)

Feedback, feature requests, and bug reports are very welcome! Let me know what you think and what features you'd love to see next!
```

---

## 🇫🇷 Version Française (Forum HACF / Domo-Attitude)
> **Catégorie recommandée** : *Vos Projets / Partage d'intégrations & cartes*  
> **Tags recommandés** : `hacs`, `integration`, `plan`, `dashboard`, `3d`, `lovelace`

```markdown
# 🏛️ Home Architect – Le studio de CAO et de plans d'étage 2D/3D directement dans Home Assistant

Bonjour à toute la communauté ! 👋

Je vous présente **Home Architect**, une intégration et studio complet de dessin architectural conçu pour concevoir, meubler et animer vos plans de maison en 2D et 3D directement depuis Home Assistant.

Plus besoin de passer par Sweet Home 3D, Blender, Inkscape ou des éditeurs de SVG externes complexes : vous dessinez vos murs, placez vos meubles, cotez vos pièces et associez vos entités domotiques en quelques clics dans votre navigateur !

[![HACS Badge](https://img.shields.io/badge/HACS-Custom_Integration-orange.svg?style=for-the-badge)](https://github.com/SocrateMobile/home-architect)
[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg?style=for-the-badge)](https://github.com/SocrateMobile/home-architect/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge)](https://github.com/SocrateMobile/home-architect/blob/main/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Socrate-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=000000)](https://buymeacoffee.com/Socrate)

---

## 🌟 Fonctionnalités principales

### 📐 1. Moteur CAO 2D vectoriel ultra-fluide
* **Tracé de murs réalistes** : Dessin avec épaisseurs réelles paramétrables (Cloison 10 cm, Mur standard 15 cm, Porteur 20 cm, Extérieur 30 cm).
* **Accroche magnétique intelligente (Snapping)** : Accroche sur les sommets, guidage d'alignement intelligent et contraintes angulaires ($0^\circ, 45^\circ, 90^\circ, 135^\circ, 180^\circ$).
* **Détection automatique des pièces** : Calcul en temps réel des polygones de pièces, de leur périmètre et de leur surface en $m^2$.
* **Menuiseries et ouvrants** : Portes simples, doubles, coulissantes, fenêtres et portes-fenêtres avec inversion d'ouverture en direct (touches `Espace` et `F`).
* **Calibrage & mise à l'échelle** : Importez un plan image (PNG, JPG, SVG), tracez une ligne de référence et tout le plan se met à l'échelle métrique automatiquement.

### 🛋️ 2. Catalogue de mobilier architectural vectoriel
* Mobilier complet et stylisé : Canapés, Méridiennes/Divans, Chaises type Starck, Tables de repas, Bureaux, Lits, Consoles, Meubles TV, etc.
* **Poignées de manipulation interactives** :
  * 🔄 **Poignée de rotation degré par degré** : Petit rond d'orientation pour tourner précisément vos meubles à 360° avec affichage de l'angle en temps réel.
  * ↔️ **Poignée d'étirement en bas à droite** : Redimensionnez largeur et longueur du meuble en direct à la souris au millimètre près.
  * Déplacement libre pixel par pixel ou contraint sur la grille.

### 🧊 3. Rendu 3D Isométrique temps réel
* Bascule instantanée entre la vue 2D et la vue **3D Isométrique** (`🧊`).
* Extrusion métrique des murs en relief avec éclairage directionnel simulant le soleil et ombres portées.
* Orbite 360° interactive (clic droit ou glisser), avec presets d'angles (Sud-Ouest, Sud-Est, Nord-Est, Nord-Ouest, Vue du dessus).
* **Bascule quart de tour (`↺`)** : Rotation du plan à 90° fluide sans bandes latérales, utilisant 100 % de votre écran.

### 💡 4. Intégration Home Assistant & Cartes Lovelace
* **Volet latéral des entités HA** : Vos lumières, prises, capteurs, volets, climatisations et caméras sont disponibles en permanence à droite de l'écran.
* **Glisser-déposer sur le plan** : Déposez directement une entité dans une pièce ou sur un meuble. Détection automatique de la zone (area).
* **Retours d'état et commandes en direct** : Contrôlez vos appareils depuis le plan avec états animés et popups de contrôle.
* **Générateur de carte Lovelace** : Exportez votre plan sous forme de carte interactive prête pour vos dashboards Home Assistant.

### 💾 5. Persistance native & Multi-niveaux
* Stockage atomique et sécurisé dans `.storage` via WebSocket HA.
* Gestion multi-étages (Sous-sol, RDC, 1er Étage, Combles, Extérieurs).
* Historique complet Annuler / Rétablir (`Ctrl+Z` / `Ctrl+Y`).

---

## 📦 Installation via HACS

1. Dans **HACS**, cliquez sur les trois petits points en haut à droite ➔ **Dépôts personnalisés** (*Custom repositories*).
2. Ajoutez l'URL : `https://github.com/SocrateMobile/home-architect` avec la catégorie **Intégration** (*Integration*).
3. Recherchez **Home Architect**, cliquez sur **Télécharger** puis redémarrez Home Assistant.
4. Allez dans **Paramètres ➔ Appareils et services ➔ Ajouter une intégration**, puis cherchez **Home Architect**.
5. Le studio est accessible directement dans le menu latéral à gauche (`/home-architect`) !

---

## 🔗 Liens utiles

* 🐙 **Dépôt GitHub** : [https://github.com/SocrateMobile/home-architect](https://github.com/SocrateMobile/home-architect)
* 🐞 **Signaler un bug / Proposer une idée** : [https://github.com/SocrateMobile/home-architect/issues](https://github.com/SocrateMobile/home-architect/issues)
* ☕ **Soutenir le projet** : [https://buymeacoffee.com/Socrate](https://buymeacoffee.com/Socrate)

N'hésitez pas à tester, faire vos retours et partager vos idées d'améliorations !
```
