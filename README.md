<p align="center">
  <img src="images/logo.png" alt="Home Architect Logo" width="720" />
</p>

<p align="center">
  <strong>Le studio de CAO et de plans d'étage interactifs pour Home Assistant & Lovelace</strong><br/>
  <em>Concevez, meublez, cotez et animez vos plans en 2D/3D directement dans votre navigateur.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-3.1.0-blue.svg?style=flat-square" alt="Version 3.1.0" />
  <img src="https://img.shields.io/badge/HACS-Custom_Integration-orange.svg?style=flat-square" alt="HACS" />
  <img src="https://img.shields.io/badge/Home_Assistant-2024.1+-blueviolet.svg?style=flat-square" alt="Home Assistant" />
  <img src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square" alt="License" />
  <a href="https://buymeacoffee.com/Socrate"><img src="https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Socrate-FFDD00?style=flat-square&logo=buy-me-a-coffee&logoColor=000000" alt="Buy Me A Coffee" /></a>
</p>

---

## 📑 Sommaire

1. [📦 Installation & Démarrage](#-installation--démarrage-rapide)
2. [📐 Dessin & Conception 2D (CAO)](#-dessin--conception-2d-cao)
3. [🚪 Portes, Fenêtres & Ouvrants connectés (Nouveau v3.1.0)](#-portes-fenêtres--ouvrants-connectés-nouveau-v310)
4. [🛋️ Mobilier & Aménagement intérieur](#️-mobilier--aménagement-intérieur)
5. [🏠 Pièces automatiques & Revêtements de sol](#-pièces-automatiques--revêtements-de-sol)
6. [📡 Radars mmWave & Suivi spatial de présence](#-radars-mmwave--suivi-spatial-de-présence)
7. [🌡️ Heatmap thermique & Ambiance lumineuse](#️-heatmap-thermique--ambiance-lumineuse)
8. [🧊 Moteur 3D temps réel & Visite Walkthrough](#-moteur-3d-temps-réel--visite-walkthrough)
9. [🏢 Gestion Multi-étages](#-gestion-multi-étages)
10. [🎴 Carte Lovelace pour Tableau de bord](#-carte-lovelace-pour-tableau-de-bord-dashboard-card)
11. [🌐 Publication SVG & Accès sécurisé](#-publication-svg--accès-sécurisé)
12. [⌨️ Raccourcis clavier](#️-guide-complet-des-raccourcis-clavier)
13. [☕ Communauté & Soutien](#-soutenir-le-projet--support)

---

## 📦 Installation & Démarrage rapide

### 1. Installation via HACS (Recommandé)

1. Ouvrez **HACS** dans votre barre latérale Home Assistant.
2. Cliquez sur le menu avec les trois petits points (en haut à droite) ➔ **Dépôts personnalisés** (*Custom repositories*).
3. Ajoutez l'URL du dépôt :
   `https://github.com/SocrateMobile/home-architect`
   avec la catégorie **Intégration** (*Integration*).
4. Cliquez sur **Intégrations** puis recherchez **Home Architect**.
5. Cliquez sur **Télécharger** en bas à droite pour installer la dernière version.
6. **Redémarrez Home Assistant**.

### 2. Activation de l'intégration

1. Rendez-vous dans **Paramètres** ➔ **Appareils et services**.
2. Cliquez sur **Ajouter une intégration** en bas à droite.
3. Recherchez **Home Architect** et validez l'assistant.
4. Une entrée **Home Architect** apparaît désormais dans la barre latérale gauche de votre interface (`/home-architect`).

---

## 📐 Dessin & Conception 2D (CAO)

Cliquez sur **Home Architect** dans la barre latérale pour ouvrir le studio de création :

* **📄 Nouveau plan (`Ctrl+N` ou menu)** : Créez un projet vierge pour n'importe quel étage (Sous-Sol, RDC, 1er Étage, Combles, Jardin, etc.).
* **🖼️ Import de plan en filigrane (`Ctrl+V` ou Glisser-Déposer)** :
  * Déposez un scan ou une image de votre plan (PNG, JPG, SVG, WebP) directement sur le canevas.
  * Ajustez la transparence pour redessiner vos murs par-dessus en toute simplicité.
* **📏 Étalonnage métrique instantané (Touche `S`)** : Tracez un segment sur un mur dont vous connaissez la longueur réelle (ex : un pan de mur de 4.20 m) : l'ensemble du plan et de l'échelle métrique se recalibre automatiquement au millimètre près !
* **🧱 Tracé des murs magnétiques (Touche `W`)** :
  * Épaisseurs réelles architecturales au choix : Cloison légère (10 cm), Cloison standard (15 cm), Mur porteur (20 cm), Mur extérieur / façade (30 cm).
  * **Snapping magnétique angulaire** automatique ($0^\circ, 45^\circ, 90^\circ, 135^\circ, 180^\circ$).
  * Accrochage automatique sur les extrémités des murs existants pour garantir des pièces parfaitement closes.
  * Cotes numériques en direct pendant le tracé.

---

## 🚪 Portes, Fenêtres & Ouvrants connectés (Nouveau v3.1.0)

Home Architect intègre une gestion complète et dynamique des menuiseries connectées à vos capteurs domotiques Home Assistant :

```
     [ Porte fermée (vert) ]               [ Porte ouverte (alerte ambre) ]
         ═════════════                           ═════         /
                                                      \       /  (arc 90°)
                                                       \_____/
```

### 1. Types d'ouvrants disponibles
* **🚪 Portes** : Porte simple battant, porte double battants, porte à galandage / coulissante.
* **🪟 Fenêtres** : Fenêtre simple ouvrant, fenêtre 2 battants, baie vitrée coulissante, porte-fenêtre.
* **Inversion en 1 clic** : Sens d'ouverture intérieur/extérieur (Tirant/Poussant) et charnière gauche/droite via la barre d'outils contextuelle (HUD).

### 2. Lier un capteur à un ouvrant
Vous pouvez associer n'importe quel capteur (`binary_sensor`), volet (`cover`) ou serrure (`lock`) à une porte ou une fenêtre :
* **Méthode A (Glisser-Déposer direct)** : Faites glisser une entité depuis le tiroir latéral droit et **déposez-la directement sur la porte ou la fenêtre**.
* **Méthode B (Menu contextuel HUD)** : Cliquez sur un ouvrant, puis dans le bandeau du bas, cliquez sur **`🔗 Lier un capteur`** et choisissez l'entité voulue dans la recherche rapide.

### 3. Visualisation dynamique en temps réel
* **En 2D** :
  * **Fermé (`off` / `closed`)** : Le battant de la porte se rabat physiquement fermé dans l'encadrement en teinte discrète (vert/neutre), l'arc de débattement s'efface.
  * **Ouvert (`on` / `open` ou volet déployé)** : Le battant pivote à $90^\circ$ et son arc s'illumine en **ambre d'alerte (`#f59e0b`)**.
* **En 3D** : Le vantail 3D s'anime et s'ouvre/se ferme physiquement en temps réel selon l'état de votre capteur.
* **Sur vos Dashboards** : Survoler l'ouvrant affiche le curseur interactif 👆, et cliquer dessus ouvre immédiatement la boîte de dialogue **`more-info`** de Home Assistant (historique d'ouverture, pilotage du volet, état de serrure).

---

## 🛋️ Mobilier & Aménagement intérieur

Meublez vos pièces avec un catalogue complet de mobilier vectoriel responsive :

* **🛋️ Salons & Séjours** : Canapés droits, canapés d'angle / méridiennes, fauteuils, tables basses, meubles TV, tapis décoratifs.
* **🛏️ Chambres** : Lits simples, lits doubles (Queen / King size), tables de chevet, armoires, dressings.
* **🍽️ Cuisine & Repas** : Tables à manger rectangulaires ou rondes, chaises, îlots centraux, plans de travail.
* **💼 Bureau & Tech** : Bureaux d'ordinateur, chaises de bureau ergonomiques.
* **🚿 Salle de bain & Sanitaires** : Douches à l'italienne, baignoires, vasques simples/doubles, WC.
* **🌿 Extérieurs & Décoration** : Plantes d'intérieur, terrasses, mobilier de jardin.

### 🔄 Poignées de transformation interactives
* **Orientation 360° précise** : Faites tourner n'importe quel meuble au degré près grâce à la poignée circulaire supérieure (ou appuyez sur la touche **`R`** pour une rotation rapide par pas de 45°).
* **Redimensionnement dynamique ↔️** : Étirez ou réduisez la longueur et la largeur des meubles grâce aux poignées d'angle.
* **Couleurs & Matières personnalisées** : Choisissez la matière (bois, métal, tissu, cuir) et personnalisez la teinte de vos meubles via le sélecteur de couleur.

---

## 🏠 Pièces automatiques & Revêtements de sol

Dès que vous tracez un contour de murs fermé, Home Architect génère automatiquement une pièce intelligente :

* **📐 Calcul surfacique automatique** : La surface en $m^2$ et le périmètre sont recalculés en temps réel dès que vous modifiez un mur.
* **🎨 Textures de sol procédurales (2D & 3D)** :
  * **Parquets** : Parquet chêne naturel, parquet point de Hongrie / chevrons.
  * **Carrelages** : Grands carreaux contemporains 60×60, mosaïque, ardoise foncée, terre cuite provençale.
  * **Minéraux & Tendances** : Béton ciré, marbre blanc veiné.
  * **Confort & Extérieurs** : Moquette douce, terrasse en lames de bois, gazon verdoyant.
* **🏷️ Association aux Zones HA (`area_id`)** : Associez chaque pièce à une pièce officielle de Home Assistant (Salon, Cuisine, Suite Parentale...) pour filtrer automatiquement vos entités domotiques.
* **📏 Hauteurs sous plafond personnalisables** : Ajustez la hauteur sous plafond pièce par pièce (standard 2.50 m, sous-sol 2.10 m, haussmannien 3.00 m, plafond cathédrale 4.50 m).

---

## 📡 Radars mmWave & Suivi spatial de présence

Home Architect est nativement conçu pour la nouvelle génération de capteurs de présence radar à ondes millimétriques (**LD2410, Everything Presence One, Athom, Screek, Tuya mmWave**) :

* **🎯 Cibles en direct sur le plan** : Visualisez les personnes en mouvement ou stationnaires qui se déplacent physiquement dans vos pièces en temps réel.
* **🌊 Lissage cinématique (EMA)** : Filtrage des micro-variations pour un affichage stable et naturel des trajectoires.
* **📐 Cône de détection orientable** : Affichez le cône de détection réel du radar sur votre plan 2D, avec réglage de la portée maximale (ex : 6.0 m), de l'angle de vision (FOV) et de l'orientation spatiale.
* **🎛️ Assistant de calibrage spatial** : Cliquez sur un radar pour ouvrir l'outil de calibrage interactif et aligner précisément les coordonnées du capteur avec votre pièce réelle.

---

## 🌡️ Heatmap thermique & Ambiance lumineuse

Donnez vie à votre maison en synchronisant vos plans avec le climat intérieur et l'éclairage :

* **🔥 Visualisation thermique dynamique (Heatmap)** :
  * Liez une sonde de température (`sensor.temperature_*`) ou un thermostat (`climate.*`) à une pièce.
  * La pièce se colore automatiquement selon un gradient thermique précis : bleu frais (< 18°C), vert confort (19-21°C), orange tiède (22-24°C), rouge chaud (> 25°C).
  * Affichage de la température mesurée en direct sous le nom de la pièce.
* **💡 Éclairage immersif** :
  * Dès qu'une lumière est allumée dans une pièce, le sol s'illumine subtilement en 2D et en 3D avec la **couleur RVB réelle** et l'intensité d'éclairage de l'ampoule (`rgb_color` et `brightness`).

---

## 🧊 Moteur 3D temps réel & Visite Walkthrough

Basculez à tout moment entre le plan 2D et la vue 3D photoréaliste grâce au moteur WebGL Three.js ultra-optimisé :

* **🚶 Visite virtuelle à la première personne (Walkthrough)** :
  * Placez-vous à hauteur d'yeux humaine (1.65 m) et explorez votre maison comme dans un jeu vidéo !
  * Déplacement fluide au clavier : touches **ZQSD** ou **Flèches directionnelles**.
  * Courir avec la touche **`Maj`** (*Shift*).
  * Vue panoramique 360° à la souris ou au doigt sur écran tactile.
* **☀️ Simulation solaire dynamique (`sun.sun`)** :
  * Calcul de l'ensoleillement en direct basé sur les coordonnées GPS exactes de votre Home Assistant.
  * Azimut, hauteur du soleil, ombres portées douces (PCF Soft Shadows), lumière rasante dorée au coucher du soleil et bascule en ambiance nocturne avec illumination douce des luminaires intérieurs.
* **✂️ Coupe à mi-hauteur des murs** : Tranchez les cloisons à 1.20 m de hauteur en un clic pour contempler l'agencement de vos pièces et meubles d'un seul coup d'œil.
* **👻 Vue fantôme des étages inférieurs** : Affichez la dalle et les murs du niveau inférieur en transparence pour caler vos trémies d'escalier et canalisations.

---

## 🏢 Gestion Multi-étages

Gérez facilement les habitations complexes et les extérieurs :

* **Sélecteur d'étage rapide** : Basculez en un clic entre Sous-Sol, Rez-de-chaussée, 1er Étage, 2e Étage, Combles et Jardin/Terrasse.
* **Élévations & Dalles** : Les niveaux se superposent fidèlement dans la scène 3D.
* **Duplication d'étage** : Dupliquez les murs extérieurs d'un étage pour concevoir l'étage supérieur sans tout redessiner.

---

## 🎴 Carte Lovelace pour Tableau de bord (Dashboard Card)

Affichez vos plans directement sur vos dashboards Home Assistant en mode **visualisation pure** (lecture seule sécurisée, sans les outils de modification du studio).

### Ajout via l'interface graphique Lovelace
1. Modifiez votre tableau de bord Lovelace (*Modifier le tableau de bord*).
2. Cliquez sur **Ajouter une carte** et sélectionnez **Home Architect Card**.
3. Choisissez votre plan dans le menu déroulant et cochez vos préférences d'affichage.

### Configuration YAML (Mode 2D ou 3D)

```yaml
type: custom:home-architect-card
project_id: rdc               # Identifiant de votre étage (ex: rdc, etage1)
title: Rez-de-chaussée        # Titre dans l'en-tête (optionnel)
height: 500px                 # Hauteur sur le dashboard (ex: 500px, 65vh)
view_mode: 3d                 # '2d' (plan vectoriel) ou '3d' (vue 3D interactive)
show_header: true             # Affiche l'en-tête avec bouton de bascule 2D/3D
show_controls: true           # Boutons de zoom, recentrage et rotation
show_dimensions: false        # Affiche les cotes métriques sur les murs
show_heatmap: false           # Active la coloration thermique des pièces
animations: true              # Animations des entités (icônes en rotation, etc.)
theme: auto                   # 'auto' (suit le mode sombre/clair), 'light' ou 'dark'
```

### Récapitulatif des options de la carte

| Option | Type | Défaut | Description |
| :--- | :---: | :---: | :--- |
| `project_id` | `string` | *Premier plan* | Identifiant du plan à charger (ex : `rdc`, `etage1`, `sous_sol`). |
| `title` | `string` | *Nom du plan* | Titre personnalisé affiché dans l'en-tête de la carte. |
| `view_mode` | `string` | `2d` | Mode initial d'affichage : `2d` pour le plan vectoriel ou `3d` pour la vue tridimensionnelle temps réel. |
| `height` | `string` / `number` | `480px` | Hauteur de la carte sur votre écran (ex : `500px`, `60vh` ou `500`). |
| `show_header` | `boolean` | `true` | Affiche ou masque la barre d'en-tête (contenant le titre et la bascule 2D/3D). |
| `show_controls` | `boolean` | `true` | Affiche les boutons tactiles de navigation (zoom `+`/`-`, recentrage `⊙`, rotation). |
| `show_dimensions` | `boolean` | `false` | Affiche les cotes numériques de longueur sur chaque mur. |
| `show_heatmap` | `boolean` | `false` | Active la coloration thermique des pièces en fonction des capteurs de température. |
| `animations` | `boolean` | `true` | Active les animations en direct (ventilateurs en rotation, pulsations d'alertes). Désactivable sur tablettes murales anciennes. |
| `theme` | `string` | `auto` | Thème graphique : `auto` (synchronisé avec Home Assistant), `dark` ou `light`. |

---

## 🌐 Publication SVG & Accès sécurisé

Home Architect permet d'exporter et de publier votre plan d'étage sous forme de fichier vectoriel SVG autonome pour l'intégrer facilement dans des cartes *Picture Elements*, des écrans déportés ou des afficheurs e-paper.

### Comment publier un plan ?
1. Ouvrez votre plan dans le studio Home Architect.
2. Cliquez sur l'outil **Exporter / Publier** dans la barre d'outils.
3. Choisissez les éléments à inclure (avec ou sans image de fond) et cliquez sur **Publier**.
4. L'outil génère une URL sécurisée avec un jeton cryptographique unique :
   ```text
   /api/home_architect/published/<projet>-<jeton_secret>.svg
   ```

### 🛡️ Sécurité & Confidentialité
> [!IMPORTANT]
> **Accès direct** : Un plan publié est accessible via son URL sans session Home Assistant active (`requires_auth = False`), ce qui permet son affichage sur des tablettes murales ou cartes locales.
>
> **Protection cryptographique** :
> * Jeton d'accès de haute entropie généré de façon sécurisée (imprévisible).
> * Validation en temps constant (`hmac.compare_digest`) empêchant toute attaque par canal auxiliaire (*timing attack*).
> * Entêtes HTTP stricts : Content Security Policy `sandbox`, interdiction d'exécution de scripts tiers.
> * Aucun fichier n'est écrit dans le dossier public non sécurisé `/config/www`.

### Révoquer l'accès (Dépublier)
Dans la modale **Exporter / Publier**, cliquez simplement sur **Dépublier** : le jeton est immédiatement détruit et l'URL renverra instantanément une erreur `404 Not Found`.

---

## ⌨️ Guide complet des raccourcis clavier

Dessinez et naviguez comme un pro grâce aux raccourcis clavier optimisés :

| Raccourci | Action | Contexte |
| :---: | :--- | :--- |
| **`V`** ou **`Échap`** | Outil Sélection | Studio 2D |
| **`W`** | Outil Mur (tracé avec snapping) | Studio 2D |
| **`D`** | Poser une Porte | Studio 2D |
| **`O`** | Poser une Fenêtre | Studio 2D |
| **`M`** | Outil Règle / Mesure | Studio 2D |
| **`S`** | Étalonner l'échelle métrique du plan | Studio 2D |
| **`R`** | Pivoter le meuble sélectionné (+45°) | Sélection meuble |
| **`Suppr`** / **`Retour`** | Supprimer l'élément sélectionné | Sélection 2D |
| **`Espace`** | Inverser le sens d'ouverture de l'ouvrant | Tracé / Ouvrant |
| **`F`** | Inverser le côté intérieur/extérieur | Tracé / Ouvrant |
| **`Ctrl + Z`** | Annuler la dernière action | Studio |
| **`Ctrl + Y`** / **`Ctrl + Maj + Z`** | Rétablir l'action | Studio |
| **`Ctrl + S`** | Enregistrer immédiatement le plan | Studio |
| **`Ctrl + N`** | Créer un nouveau plan | Studio |
| **`Ctrl + V`** | Coller une image de plan depuis le presse-papier | Studio |
| **`3`** | Basculer entre le mode 2D et 3D | Studio & Carte |
| **`Z Q S D`** / **`Flèches`** | Se déplacer dans la visite virtuelle | Visite 3D |
| **`Maj`** (*Shift*) | Courir / Déplacement rapide | Visite 3D |
| **`Clic droit + Glisser`** | Orbiter / Tourner la caméra autour du plan | Vue 3D |

---

## ☕ Soutenir le projet / Support

Home Architect est un projet open-source développé avec passion pour la communauté Home Assistant francophone et internationale. Si vous appréciez cette intégration et souhaitez soutenir son développement continu :

<p align="center">
  <a href="https://buymeacoffee.com/Socrate" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" width="210">
  </a>
</p>

* 💬 **Forum HACF** : [Fil de discussion officiel Home Architect](https://forum.hacf.fr/t/le-studio-de-cao-et-de-plans-detage-interactifs-pour-home-assistant-lovelace/84465)
* 🐙 **Dépôt GitHub** : [SocrateMobile/home-architect](https://github.com/SocrateMobile/home-architect)
* 🐛 **Signaler un bug / Suggérer une idée** : [GitHub Issues](https://github.com/SocrateMobile/home-architect/issues)
