/**
 * Traductions de la carte Lovelace (`card.*`) et de son éditeur visuel (`card.editor.*`).
 *
 * Importé pour son effet de bord par le module de la carte (src/home-architect-card.ts) uniquement :
 * l'éditeur, chargé à la demande par getConfigElement() de la carte, trouve ces traductions déjà
 * enregistrées (voir le commentaire d'en-tête de src/components/card-editor.ts).
 */
import { registerTranslations } from '../index';

registerTranslations('fr', {
  // Sélecteur de cartes de Lovelace
  'card.picker.description': 'Affichez votre plan de maison interactif 2D/3D avec états des entités en temps réel.',

  // Validation de la configuration YAML (erreurs affichées par Home Assistant et par l'éditeur)
  'card.config.not_object': 'Configuration invalide : un objet YAML est attendu.',
  'card.config.height_number_invalid': 'height invalide : {value} (nombre de pixels supérieur à 0 attendu).',
  'card.config.height_type': 'height doit être un nombre de pixels ou une longueur CSS (ex. 480, 480px, 60vh).',
  'card.config.height_not_positive': 'height invalide : « {value} » (nombre de pixels supérieur à 0 attendu).',
  'card.config.height_invalid': 'height invalide : « {value} » (exemples valides : 480, 480px, 60vh, calc(100vh - 200px)).',
  'card.config.project_id_invalid': 'project_id invalide : « {value} » (lettres, chiffres, « _ » et « - », 64 caractères au plus).',
  'card.config.title_type': 'title doit être un texte.',
  'card.config.view_mode_invalid': 'view_mode invalide : « {value} » (valeurs possibles : 2d, 3d).',
  'card.config.theme_invalid': 'theme invalide : « {value} » (valeurs possibles : auto, light, dark).',
  'card.config.boolean_type': '{key} doit valoir true ou false.',

  // En-tête
  'card.header.view_mode': "Mode d'affichage du plan",
  'card.header.view_2d': 'Vue en plan 2D',
  'card.header.view_3d': 'Vue 3D isométrique',

  // États du chargement
  'card.stale': 'Plan non actualisé : {error}',
  'card.loading': 'Chargement du plan…',
  'card.deleted': 'Le plan « {id} » a été supprimé.',
  'card.choose_other': "Choisissez un autre plan dans l'éditeur de la carte.",
  'card.load_error': 'Impossible de charger le plan « {id} » : {error}',
  'card.retry_soon': 'Nouvel essai automatique dans quelques instants.',
  'card.retry': 'Réessayer',
  'card.not_found.title': 'Plan « {id} » introuvable sur le serveur.',
  'card.not_found.none_selected': "Aucun plan n'est sélectionné pour cette carte.",
  'card.not_found.hint':
    "S'il vient d'être dessiné, enregistrez-le depuis le studio Home Architect ({refresh}) ; sinon, choisissez un autre plan dans l'éditeur de la carte.",
  'card.not_found.refresh_reload': 'puis rechargez la page',
  'card.not_found.refresh_live': "la carte s'actualisera d'elle-même",
  'card.not_found.choose': "Choisissez un plan dans l'éditeur de la carte (option project_id).",
  'card.not_found.no_projects': "Aucun plan n'est encore enregistré.",
  'card.not_found.available': 'Plans disponibles :',
  'card.not_found.more': '… et {count} autre(s).',

  // Éditeur visuel
  'card.editor.project': 'Plan',
  'card.editor.loading_projects': 'Chargement des plans…',
  'card.editor.choose_project': 'Choisir un plan…',
  'card.editor.project_missing': '{id} (introuvable)',
  'card.editor.list_error': "Liste des plans indisponible ({error}). Saisissez l'identifiant du plan (project_id).",
  'card.editor.reload_list': 'Recharger la liste',
  'card.editor.no_projects': 'Aucun plan enregistré : dessinez puis enregistrez un plan dans le studio Home Architect.',
  'card.editor.server_only': 'Seuls les plans enregistrés sur le serveur sont proposés.',
  'card.editor.title': 'Titre',
  'card.editor.title_placeholder': 'Nom du plan',
  'card.editor.title_help': 'Laissez vide pour afficher le nom du plan.',
  'card.editor.height': 'Hauteur',
  'card.editor.height_help':
    'Nombre de pixels ou longueur CSS (480, 480px, 60vh…). Dans la vue « sections », la hauteur suit la grille.',
  'card.editor.view_mode': 'Vue initiale',
  'card.editor.view_2d': 'Plan 2D',
  'card.editor.view_3d': '3D isométrique',
  'card.editor.heatmap': 'Carte thermique des pièces',
  'card.editor.heatmap_project': 'Selon le réglage du plan',
  'card.editor.heatmap_on': 'Afficher',
  'card.editor.heatmap_off': 'Masquer',
  'card.editor.theme': 'Couleurs du plan',
  'card.editor.theme_auto': 'Automatique (suit le thème de Home Assistant)',
  'card.editor.theme_dark': 'Sombres',
  'card.editor.theme_light': 'Claires',
  'card.editor.invalid_value': '{value} (valeur invalide)',
  'card.editor.show_header': "Afficher l'en-tête (titre et bascule 2D/3D)",
  'card.editor.show_dimensions': 'Afficher les cotes des murs',
  'card.editor.show_controls': 'Afficher les commandes de la vue (zoom, rotation, 2D/3D)',
  'card.editor.animations': 'Animer les entités (mouvement détecté, ventilateurs, lecture en cours)',
  'card.editor.animations_help': "Le réglage « Réduire les animations » de l'appareil les désactive dans tous les cas.",
});

registerTranslations('en', {
  // Lovelace card picker
  'card.picker.description': 'Display your interactive 2D/3D home floor plan with live entity states.',

  // YAML configuration validation (errors shown by Home Assistant and by the editor)
  'card.config.not_object': 'Invalid configuration: a YAML object is expected.',
  'card.config.height_number_invalid': 'Invalid height: {value} (expected a number of pixels greater than 0).',
  'card.config.height_type': 'height must be a number of pixels or a CSS length (e.g. 480, 480px, 60vh).',
  'card.config.height_not_positive': 'Invalid height: "{value}" (expected a number of pixels greater than 0).',
  'card.config.height_invalid': 'Invalid height: "{value}" (valid examples: 480, 480px, 60vh, calc(100vh - 200px)).',
  'card.config.project_id_invalid': 'Invalid project_id: "{value}" (letters, digits, "_" and "-", 64 characters at most).',
  'card.config.title_type': 'title must be text.',
  'card.config.view_mode_invalid': 'Invalid view_mode: "{value}" (allowed values: 2d, 3d).',
  'card.config.theme_invalid': 'Invalid theme: "{value}" (allowed values: auto, light, dark).',
  'card.config.boolean_type': '{key} must be true or false.',

  // Header
  'card.header.view_mode': 'Floor plan view mode',
  'card.header.view_2d': '2D floor plan view',
  'card.header.view_3d': 'Isometric 3D view',

  // Loading states
  'card.stale': 'Floor plan not refreshed: {error}',
  'card.loading': 'Loading floor plan…',
  'card.deleted': 'The floor plan "{id}" has been deleted.',
  'card.choose_other': 'Choose another floor plan in the card editor.',
  'card.load_error': 'Unable to load the floor plan "{id}": {error}',
  'card.retry_soon': 'Retrying automatically in a few moments.',
  'card.retry': 'Retry',
  'card.not_found.title': 'Floor plan "{id}" not found on the server.',
  'card.not_found.none_selected': 'No floor plan is selected for this card.',
  'card.not_found.hint':
    'If it was just drawn, save it from the Home Architect studio ({refresh}); otherwise, choose another floor plan in the card editor.',
  'card.not_found.refresh_reload': 'then reload the page',
  'card.not_found.refresh_live': 'the card will refresh on its own',
  'card.not_found.choose': 'Choose a floor plan in the card editor (project_id option).',
  'card.not_found.no_projects': 'No floor plan has been saved yet.',
  'card.not_found.available': 'Available floor plans:',
  'card.not_found.more': '… and {count} more.',

  // Visual editor
  'card.editor.project': 'Floor plan',
  'card.editor.loading_projects': 'Loading floor plans…',
  'card.editor.choose_project': 'Choose a floor plan…',
  'card.editor.project_missing': '{id} (not found)',
  'card.editor.list_error': 'Floor plan list unavailable ({error}). Enter the floor plan ID (project_id).',
  'card.editor.reload_list': 'Reload list',
  'card.editor.no_projects': 'No saved floor plans: draw and save a floor plan in the Home Architect studio.',
  'card.editor.server_only': 'Only floor plans saved on the server are listed.',
  'card.editor.title': 'Title',
  'card.editor.title_placeholder': 'Floor plan name',
  'card.editor.title_help': 'Leave empty to show the floor plan name.',
  'card.editor.height': 'Height',
  'card.editor.height_help':
    'Number of pixels or CSS length (480, 480px, 60vh…). In the sections view, the height follows the grid.',
  'card.editor.view_mode': 'Initial view',
  'card.editor.view_2d': '2D floor plan',
  'card.editor.view_3d': 'Isometric 3D',
  'card.editor.heatmap': 'Room heatmap',
  'card.editor.heatmap_project': 'Use the floor plan setting',
  'card.editor.heatmap_on': 'Show',
  'card.editor.heatmap_off': 'Hide',
  'card.editor.theme': 'Floor plan colors',
  'card.editor.theme_auto': 'Automatic (follows the Home Assistant theme)',
  'card.editor.theme_dark': 'Dark',
  'card.editor.theme_light': 'Light',
  'card.editor.invalid_value': '{value} (invalid value)',
  'card.editor.show_header': 'Show header (title and 2D/3D toggle)',
  'card.editor.show_dimensions': 'Show wall dimensions',
  'card.editor.show_controls': 'Show view controls (zoom, rotation, 2D/3D)',
  'card.editor.animations': 'Animate entities (detected motion, fans, media playing)',
  'card.editor.animations_help': 'The device "Reduce motion" setting always turns them off.',
});
