/**
 * Traductions de l'import de plan : modale d'import, modale d'étalonnage et messages de
 * l'interprétation SVG (src/core/svg-parser.ts). Enregistrées à l'import du module (effet de bord).
 *
 * Pluriels : clés `<clé>_one` / `<clé>_other`, choisies d'après Intl.PluralRules de la langue
 * courante (en français, 0 et 1 prennent le singulier).
 */
import { registerTranslations } from '../index';

registerTranslations('fr', {
  // Commun
  'import.common.close': 'Fermer',
  'import.common.cancel': 'Annuler',
  'import.common.recommended': 'Recommandé',
  'import.common.meters': 'mètres',
  'import.unit.kb': '{value} Ko',
  'import.unit.mb': '{value} Mo',

  // Modale d'import : en-tête et zone de dépôt
  'import.title': 'Importer & Interpréter un plan',
  'import.subtitle': 'SVG (vectoriel intelligent), PNG, JPEG, WebP, ou sauvegarde de projet (.json)',
  'import.drop.region': 'Zone de dépôt du plan',
  'import.drop.title': 'Glissez-déposez votre plan ici',
  'import.drop.formats': 'SVG (vectorisation automatique en murs 3D), PNG, JPEG, WebP — ou sauvegarde de projet (.json)',
  'import.drop.choose_file': 'Choisir un fichier',
  'import.drop.paste': 'Coller (Ctrl+V)',

  // Fichier chargé
  'import.source.replace': 'Remplacer le fichier',
  'import.source.backup_badge': 'Sauvegarde de projet',
  'import.source.svg_badge': 'SVG Vectoriel',
  'import.source.preview_alt': 'Aperçu du plan',
  'import.source.raster_size': '{width} × {height} px · {size}',
  'import.source.raster_size_recompressed': "{width} × {height} px · {size} (fichier d'origine : {original})",
  'import.source.svg_frame': 'Repère du plan : {width} × {height} unités · {size}',
  'import.name.dropped': 'Plan déposé',
  'import.name.pasted_svg': 'Plan SVG collé',
  'import.name.pasted_image': 'Image collée',
  'import.name.imported': 'Plan importé',
  'import.name.clipboard_file': 'presse-papier',

  // Aperçu et légende
  'import.preview.aria': 'Aperçu du plan et des éléments détectés',
  'import.preview.legend': "Légende de l'aperçu",
  'import.element.walls': 'Murs',
  'import.element.doors': 'Portes',
  'import.element.windows': 'Fenêtres',
  'import.element.rooms': 'Pièces',
  'import.element.labels': 'Noms',
  'import.legend.footprint': 'Emprise de la largeur saisie',

  // Interprétation vectorielle (SVG)
  'import.svg.title': 'Interprétation Vectorielle Intelligente SVG',
  'import.svg.subtitle': 'Transformez directement les lignes et courbes de votre SVG en éléments réels',
  'import.svg.detection_failed': 'La reconnaissance du plan a échoué.',
  'import.svg.mode_group': "Mode d'import du SVG",
  'import.svg.vectorize_title': 'Convertir en Murs, Portes, Fenêtres & Pièces 3D',
  'import.svg.vectorize_desc': "Génère instantanément les murs, baies, ouvertures et pièces prêts pour l'affichage 2D et 3D.",
  'import.svg.keep_background': 'Conserver également le tracé SVG original en filigrane sous le plan',
  'import.svg.too_heavy_for_background': 'SVG trop lourd ({size}) pour servir de calque de fond (maximum {max}).',
  'import.svg.background_title': 'Calque de fond simple (Décalque manuel)',
  'import.svg.background_desc': 'Affiche le SVG comme une image en arrière-plan pour tracer les murs manuellement.',
  'import.categories.title': 'Éléments à importer :',
  'import.categories.openings_need_walls': "Les portes et fenêtres ne sont importées qu'avec les murs qui les portent.",
  'import.layers.title': 'Calques et groupes pris en compte :',
  'import.notes.measurement_lines_one': '{count} ligne de cotation / pointillés a été automatiquement ignorée (non transformée en mur).',
  'import.notes.measurement_lines_other': '{count} lignes de cotation / pointillés ont été automatiquement ignorées (non transformées en murs).',
  'import.notes.ignored_rooms_one': '{count} forme écartée des pièces : {list}',
  'import.notes.ignored_rooms_other': '{count} formes écartées des pièces : {list}',
  'import.notes.ignored_unnamed': 'forme sans nom',
  'import.notes.ignored_self_intersecting': '{name} (contour qui se recoupe)',
  'import.notes.ignored_area': '{name} ({area} m²)',
  'import.notes.truncated': 'Plan très volumineux : seule une partie du fichier a été analysée.',

  // Sauvegarde de projet (.json)
  'import.project.level': 'Niveau : {level}',
  'import.project.background': 'Image de fond',
  'import.project.new_plan_note':
    "Le plan sera ouvert comme un nouveau plan (nouvel identifiant) : aucun plan existant n'est écrasé. Enregistrez-le ensuite pour le conserver.",
  'import.project.dropped_background':
    "La sauvegarde ne contient pas l'image de fond (indisponible lors de l'export) : le plan sera importé sans fond.",
  'import.count.walls_one': '{count} mur',
  'import.count.walls_other': '{count} murs',
  'import.count.openings_one': '{count} ouverture',
  'import.count.openings_other': '{count} ouvertures',
  'import.count.rooms_one': '{count} pièce',
  'import.count.rooms_other': '{count} pièces',
  'import.count.furniture_one': '{count} meuble',
  'import.count.furniture_other': '{count} meubles',
  'import.count.entities_one': '{count} entité',
  'import.count.entities_other': '{count} entités',

  // Échelle
  'import.scale.title': 'Échelle du plan (Mètres réels)',
  'import.scale.vectorize_desc':
    "Largeur réelle du bâtiment, murs extérieurs compris : elle s'applique à l'emprise des murs détectés, pas aux marges ni au cartouche de la page.",
  'import.scale.building_width': 'Largeur du bâtiment :',
  'import.scale.image_width': "Largeur de l'image entière :",
  'import.scale.auto_svg_title': 'Étalonnage par la largeur du bâtiment',
  'import.scale.auto_raster_title': "Étalonnage par la largeur de l'image",
  'import.scale.auto_svg_desc':
    "Indiquez la largeur réelle du bâtiment : elle s'applique à l'emprise des murs détectés, pas aux marges de la page.",
  'import.scale.auto_raster_desc':
    "Indiquez la largeur réelle couverte par toute l'image, marges comprises. Si le plan a des marges, un cartouche ou des cotes autour, préférez la mesure d'un mur.",
  'import.scale.measure_title': 'Étalonnage assisté par mesure de mur',
  'import.scale.measure_desc':
    'Vous tracerez un segment directement sur un mur mesuré du plan (ex : 3,50 m) pour étalonner avec précision.',
  'import.width.empty': 'Indiquez une largeur en mètres.',
  'import.width.not_number': 'Saisissez un nombre (ex. 12,5).',
  'import.width.range': 'La largeur doit être comprise entre {min} et {max} m.',
  'import.footprint.walls': 'emprise des murs détectés',
  'import.footprint.content': 'emprise du dessin (aucun mur détecté)',
  'import.footprint.page': 'page entière',
  'import.footprint.info': 'Référence : {reference} — {width} × {height} m',
  'import.footprint.info_pending': 'Référence : {reference} — {width} × {height} m (mise à jour…)',
  'import.opacity.label': 'Opacité du fond :',

  // Validation
  'import.confirm.project': 'Importer le projet',
  'import.confirm.vectorize': 'Convertir le plan SVG ({walls})',
  'import.confirm.load': 'Charger le plan',
  'import.blocker.nothing_selected': 'Aucun élément sélectionné à importer.',
  'import.blocker.svg_too_heavy': 'SVG trop lourd pour servir de calque de fond : seule la conversion en murs est possible.',

  // Traitement en cours, indications et erreurs
  'import.busy.reading': 'Lecture du fichier…',
  'import.busy.compressing': "Compression de l'image…",
  'import.busy.analyzing': 'Analyse du plan SVG…',
  'import.busy.detecting': 'Reconnaissance des murs, ouvertures et pièces…',
  'import.hint.clipboard_empty':
    'Le presse-papier ne contient ni image ni code SVG. Copiez votre plan puis appuyez sur Ctrl+V (Cmd+V sur Mac).',
  'import.hint.clipboard_denied':
    'Accès au presse-papier refusé par le navigateur : appuyez directement sur Ctrl+V (Cmd+V sur Mac) pour coller votre plan.',
  'import.error.json_syntax': 'Fichier JSON illisible (syntaxe invalide).',
  'import.error.not_backup': "Ce fichier JSON n'est pas une sauvegarde de projet Home Architect.",
  'import.error.svg_file_too_large': 'Fichier SVG trop volumineux ({size} ; maximum {max}).',
  'import.error.svg_code_too_large': 'Code SVG trop volumineux (maximum {max}).',
  'import.error.backup_too_large': 'Sauvegarde trop volumineuse ({size} ; maximum {max}).',
  'import.error.image_too_large': 'Image trop volumineuse ({size} ; maximum {max}).',
  'import.error.image_too_heavy': 'Image trop lourde même après compression ({size} ; maximum {max}).',
  'import.error.image_unreadable': 'Image illisible ou format non pris en charge.',
  'import.error.read_failed': 'Lecture du fichier impossible.',
  'import.error.pdf':
    'Les fichiers PDF ne sont pas pris en charge : exportez le plan en SVG (vectoriel), PNG ou JPEG depuis votre logiciel.',
  'import.error.unsupported':
    'Format de fichier non pris en charge. Formats acceptés : SVG, PNG, JPEG, WebP, GIF, ou sauvegarde de projet (.json).',
  'import.error.invalid_svg': 'Fichier SVG invalide.',

  // Interprétation SVG (src/core/svg-parser.ts)
  'import.parser.room_generic': 'Pièce {n}',
  'import.parser.outside_layers': 'Éléments hors calque',
  'import.parser.group_generic': 'Groupe {n}',
  'import.parser.invalid_svg_detail': 'Fichier SVG invalide : {detail}',
  'import.parser.no_root': 'Aucune balise <svg> racine dans le document.',
  'import.parser.failed': "Erreur d'interprétation : {detail}",
  'import.parser.invalid_scale': 'échelle invalide',

  // Modale d'étalonnage
  'import.calibrate.title': "Étalonnage de l'Échelle",
  'import.calibrate.desc': 'Indiquez la longueur réelle exacte du segment que vous venez de tracer sur votre plan.',
  'import.calibrate.length_label': 'Longueur réelle mesurée :',
  'import.calibrate.segment': "Segment tracé : {length} m à l'échelle actuelle",
  'import.calibrate.segment_unknown': 'Segment tracé : --',
  'import.calibrate.factor': 'Facteur appliqué : × {factor}',
  'import.calibrate.apply': "Appliquer l'échelle",
  'import.calibrate.error.segment': 'Le segment tracé est invalide : recommencez la mesure sur le plan.',
  'import.calibrate.error.scale': "L'échelle actuelle du plan est invalide.",
  'import.calibrate.error.not_number': 'Saisissez une longueur en mètres (ex. 3,50).',
  'import.calibrate.error.range': 'La longueur doit être comprise entre {min} et {max} m.',
  'import.calibrate.error.out_of_bounds': 'Échelle hors limites (facteur ×{factor}) : la longueur est-elle bien en mètres ?',
  'import.calibrate.mode.title': "Que faut-il mettre à l'échelle ?",
  'import.calibrate.mode.project': 'Tout le plan',
  'import.calibrate.mode.project_desc':
    "Murs, pièces, ouvertures, meubles, entités et calque de fond changent d'échelle ensemble : ce qui a été décalqué reste superposé au fond.",
  'import.calibrate.mode.background': 'Le calque de fond seulement',
  'import.calibrate.mode.background_desc':
    "Les éléments déjà tracés gardent leurs dimensions ; seule l'image de fond est agrandie ou réduite.",
  'import.calibrate.mode.no_background': "Le plan n'a pas de calque de fond : tous ses éléments seront mis à l'échelle.",
  'import.calibrate.mode.empty_plan': "Le plan ne contient encore aucun élément : seul le calque de fond est mis à l'échelle."
});

registerTranslations('en', {
  // Common
  'import.common.close': 'Close',
  'import.common.cancel': 'Cancel',
  'import.common.recommended': 'Recommended',
  'import.common.meters': 'meters',
  'import.unit.kb': '{value} KB',
  'import.unit.mb': '{value} MB',

  // Import dialog: header and drop zone
  'import.title': 'Import & interpret a floor plan',
  'import.subtitle': 'SVG (smart vector), PNG, JPEG, WebP, or project backup (.json)',
  'import.drop.region': 'Floor plan drop zone',
  'import.drop.title': 'Drag and drop your floor plan here',
  'import.drop.formats': 'SVG (automatic conversion into 3D walls), PNG, JPEG, WebP — or a project backup (.json)',
  'import.drop.choose_file': 'Choose a file',
  'import.drop.paste': 'Paste (Ctrl+V)',

  // Loaded file
  'import.source.replace': 'Replace file',
  'import.source.backup_badge': 'Project backup',
  'import.source.svg_badge': 'Vector SVG',
  'import.source.preview_alt': 'Floor plan preview',
  'import.source.raster_size': '{width} × {height} px · {size}',
  'import.source.raster_size_recompressed': '{width} × {height} px · {size} (original file: {original})',
  'import.source.svg_frame': 'Plan coordinates: {width} × {height} units · {size}',
  'import.name.dropped': 'Dropped plan',
  'import.name.pasted_svg': 'Pasted SVG plan',
  'import.name.pasted_image': 'Pasted image',
  'import.name.imported': 'Imported plan',
  'import.name.clipboard_file': 'clipboard',

  // Preview and legend
  'import.preview.aria': 'Preview of the plan and the detected elements',
  'import.preview.legend': 'Preview legend',
  'import.element.walls': 'Walls',
  'import.element.doors': 'Doors',
  'import.element.windows': 'Windows',
  'import.element.rooms': 'Rooms',
  'import.element.labels': 'Names',
  'import.legend.footprint': 'Extent of the entered width',

  // Vector interpretation (SVG)
  'import.svg.title': 'Smart SVG vector interpretation',
  'import.svg.subtitle': 'Turn the lines and curves of your SVG directly into real plan elements',
  'import.svg.detection_failed': 'Plan recognition failed.',
  'import.svg.mode_group': 'SVG import mode',
  'import.svg.vectorize_title': 'Convert into 3D walls, doors, windows & rooms',
  'import.svg.vectorize_desc': 'Instantly generates walls, bays, openings and rooms, ready for 2D and 3D display.',
  'import.svg.keep_background': 'Also keep the original SVG drawing as a faint layer under the plan',
  'import.svg.too_heavy_for_background': 'SVG too large ({size}) to be used as a background layer (maximum {max}).',
  'import.svg.background_title': 'Plain background layer (manual tracing)',
  'import.svg.background_desc': 'Shows the SVG as a background image so you can trace the walls by hand.',
  'import.categories.title': 'Elements to import:',
  'import.categories.openings_need_walls': 'Doors and windows are only imported together with the walls they belong to.',
  'import.layers.title': 'Layers and groups taken into account:',
  'import.notes.measurement_lines_one': '{count} dimension or dashed line was ignored automatically (not converted into a wall).',
  'import.notes.measurement_lines_other': '{count} dimension or dashed lines were ignored automatically (not converted into walls).',
  'import.notes.ignored_rooms_one': '{count} shape excluded from rooms: {list}',
  'import.notes.ignored_rooms_other': '{count} shapes excluded from rooms: {list}',
  'import.notes.ignored_unnamed': 'unnamed shape',
  'import.notes.ignored_self_intersecting': '{name} (self-intersecting outline)',
  'import.notes.ignored_area': '{name} ({area} m²)',
  'import.notes.truncated': 'Very large plan: only part of the file was analyzed.',

  // Project backup (.json)
  'import.project.level': 'Floor: {level}',
  'import.project.background': 'Background image',
  'import.project.new_plan_note':
    'The plan will open as a new plan (new ID): no existing plan is overwritten. Save it afterwards to keep it.',
  'import.project.dropped_background':
    'The backup does not contain the background image (it was unavailable at export time): the plan will be imported without a background.',
  'import.count.walls_one': '{count} wall',
  'import.count.walls_other': '{count} walls',
  'import.count.openings_one': '{count} opening',
  'import.count.openings_other': '{count} openings',
  'import.count.rooms_one': '{count} room',
  'import.count.rooms_other': '{count} rooms',
  'import.count.furniture_one': '{count} furniture item',
  'import.count.furniture_other': '{count} furniture items',
  'import.count.entities_one': '{count} entity',
  'import.count.entities_other': '{count} entities',

  // Scale
  'import.scale.title': 'Plan scale (real meters)',
  'import.scale.vectorize_desc':
    'Real width of the building, exterior walls included: it applies to the extent of the detected walls, not to the page margins or title block.',
  'import.scale.building_width': 'Building width:',
  'import.scale.image_width': 'Width of the whole image:',
  'import.scale.auto_svg_title': 'Calibrate from the building width',
  'import.scale.auto_raster_title': 'Calibrate from the image width',
  'import.scale.auto_svg_desc':
    'Enter the real width of the building: it applies to the extent of the detected walls, not to the page margins.',
  'import.scale.auto_raster_desc':
    'Enter the real width covered by the whole image, margins included. If the plan has margins, a title block or dimensions around it, measuring a wall is more accurate.',
  'import.scale.measure_title': 'Guided calibration by measuring a wall',
  'import.scale.measure_desc':
    'You will draw a line directly over a wall of known length on the plan (e.g. 3.50 m) for an accurate calibration.',
  'import.width.empty': 'Enter a width in meters.',
  'import.width.not_number': 'Enter a number (e.g. 12.5).',
  'import.width.range': 'The width must be between {min} and {max} m.',
  'import.footprint.walls': 'extent of the detected walls',
  'import.footprint.content': 'extent of the drawing (no walls detected)',
  'import.footprint.page': 'whole page',
  'import.footprint.info': 'Reference: {reference} — {width} × {height} m',
  'import.footprint.info_pending': 'Reference: {reference} — {width} × {height} m (updating…)',
  'import.opacity.label': 'Background opacity:',

  // Confirmation
  'import.confirm.project': 'Import project',
  'import.confirm.vectorize': 'Convert SVG plan ({walls})',
  'import.confirm.load': 'Load plan',
  'import.blocker.nothing_selected': 'No elements selected for import.',
  'import.blocker.svg_too_heavy': 'SVG too large to be used as a background layer: only conversion into walls is possible.',

  // Progress, hints and errors
  'import.busy.reading': 'Reading file…',
  'import.busy.compressing': 'Compressing image…',
  'import.busy.analyzing': 'Analyzing SVG plan…',
  'import.busy.detecting': 'Detecting walls, openings and rooms…',
  'import.hint.clipboard_empty':
    'The clipboard contains neither an image nor SVG code. Copy your plan, then press Ctrl+V (Cmd+V on Mac).',
  'import.hint.clipboard_denied':
    'The browser denied access to the clipboard: press Ctrl+V (Cmd+V on Mac) directly to paste your plan.',
  'import.error.json_syntax': 'Unreadable JSON file (invalid syntax).',
  'import.error.not_backup': 'This JSON file is not a Home Architect project backup.',
  'import.error.svg_file_too_large': 'SVG file too large ({size}; maximum {max}).',
  'import.error.svg_code_too_large': 'SVG code too large (maximum {max}).',
  'import.error.backup_too_large': 'Backup too large ({size}; maximum {max}).',
  'import.error.image_too_large': 'Image too large ({size}; maximum {max}).',
  'import.error.image_too_heavy': 'Image still too large after compression ({size}; maximum {max}).',
  'import.error.image_unreadable': 'Unreadable image or unsupported format.',
  'import.error.read_failed': 'The file could not be read.',
  'import.error.pdf': 'PDF files are not supported: export the plan as SVG (vector), PNG or JPEG from your software.',
  'import.error.unsupported':
    'Unsupported file format. Accepted formats: SVG, PNG, JPEG, WebP, GIF, or a project backup (.json).',
  'import.error.invalid_svg': 'Invalid SVG file.',

  // SVG interpretation (src/core/svg-parser.ts)
  'import.parser.room_generic': 'Room {n}',
  'import.parser.outside_layers': 'Elements outside layers',
  'import.parser.group_generic': 'Group {n}',
  'import.parser.invalid_svg_detail': 'Invalid SVG file: {detail}',
  'import.parser.no_root': 'No root <svg> element in the document.',
  'import.parser.failed': 'Interpretation error: {detail}',
  'import.parser.invalid_scale': 'invalid scale',

  // Calibration dialog
  'import.calibrate.title': 'Scale calibration',
  'import.calibrate.desc': 'Enter the exact real length of the line you just drew on your plan.',
  'import.calibrate.length_label': 'Measured real length:',
  'import.calibrate.segment': 'Drawn line: {length} m at the current scale',
  'import.calibrate.segment_unknown': 'Drawn line: --',
  'import.calibrate.factor': 'Applied factor: × {factor}',
  'import.calibrate.apply': 'Apply scale',
  'import.calibrate.error.segment': 'The drawn line is invalid: measure again on the plan.',
  'import.calibrate.error.scale': "The plan's current scale is invalid.",
  'import.calibrate.error.not_number': 'Enter a length in meters (e.g. 3.50).',
  'import.calibrate.error.range': 'The length must be between {min} and {max} m.',
  'import.calibrate.error.out_of_bounds': 'Scale out of range (factor ×{factor}): is the length really in meters?',
  'import.calibrate.mode.title': 'What should be scaled?',
  'import.calibrate.mode.project': 'The whole plan',
  'import.calibrate.mode.project_desc':
    'Walls, rooms, openings, furniture, entities and the background layer are scaled together: what was traced stays aligned with the background.',
  'import.calibrate.mode.background': 'The background layer only',
  'import.calibrate.mode.background_desc':
    'Elements already drawn keep their dimensions; only the background image is enlarged or reduced.',
  'import.calibrate.mode.no_background': 'The plan has no background layer: all of its elements will be scaled.',
  'import.calibrate.mode.empty_plan': 'The plan has no elements yet: only the background layer will be scaled.'
});
