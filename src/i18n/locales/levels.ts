/**
 * Traductions des modules partagés de `src/core` (espace `ui.`, partie « cœur ») :
 *  - libellés des niveaux (`ui.level.*`, utilisés par src/core/levels.ts) ;
 *  - noms par défaut des plans et des pièces (`ui.project.*`, src/core/project-model.ts) ;
 *  - messages d'erreur du client du backend (`ui.api.*`, src/core/ha-api.ts).
 *
 * Ces modules sont aussi chargés par la carte Lovelace (bundle injecté sur toutes les pages) : ce
 * fichier reste donc volontairement petit, les textes du studio vivent dans `ui.ts`.
 * Importé pour son effet de bord par les modules qui utilisent ces clés.
 */
import { registerTranslations } from '../index';

registerTranslations('fr', {
  // Niveaux (libellé court, puis libellé long : nom par défaut d'un nouveau plan, menus détaillés)
  'ui.level.sous-sol': 'Sous-Sol',
  'ui.level.sous-sol.full': 'Sous-Sol',
  'ui.level.rdc': 'RDC',
  'ui.level.rdc.full': 'Rez-de-Chaussée',
  'ui.level.etage1': '1er Étage',
  'ui.level.etage1.full': '1er Étage',
  'ui.level.etage2': '2ème Étage',
  'ui.level.etage2.full': '2ème Étage',
  'ui.level.etage3': '3ème Étage',
  'ui.level.etage3.full': '3ème Étage',
  'ui.level.jardin': 'Jardin',
  'ui.level.jardin.full': 'Jardin',
  'ui.level.autre': 'Autre',
  'ui.level.autre.full': 'Autre',

  // Noms par défaut (enregistrés dans le projet à sa création)
  'ui.project.default_name': 'Nouveau plan',
  'ui.project.default_room_name': 'Pièce',

  // Erreurs du client du backend
  'ui.api.size_mib': '{value} Mo',
  'ui.api.conflict': 'Le plan a été modifié ailleurs depuis son ouverture.',
  'ui.api.conflict_revision': 'Le plan a été modifié ailleurs depuis son ouverture (révision serveur {revision}).',
  'ui.api.unauthorized': 'Action réservée aux administrateurs Home Assistant.',
  'ui.api.payload_too_large': 'Données trop volumineuses pour le serveur.',
  'ui.api.payload_too_large_size': 'Données trop volumineuses pour le serveur ({size}, maximum {limit}).',
  'ui.api.not_connected': 'Connexion à Home Assistant indisponible.',
  'ui.api.connection_lost': 'La connexion à Home Assistant a été perdue.',
  'ui.api.invalid_project_id': 'Identifiant de projet invalide : {id}',
  'ui.api.invalid_asset_id': "Identifiant d'image invalide : {id}",
  'ui.api.not_found': 'Ressource introuvable sur le serveur.',
  'ui.api.project_not_found': 'Plan introuvable sur le serveur (il a peut-être été supprimé).',
  'ui.api.write_failed': "Le serveur n'a pas pu enregistrer les données.",
  'ui.api.unknown_command': 'Commande inconnue du serveur : redémarrez Home Assistant après la mise à jour de Home Architect.',
  'ui.api.file_too_large': 'Fichier trop volumineux pour le serveur.',
  'ui.api.unsupported_media_type': "Format d'image non pris en charge.",
  'ui.api.invalid_image': 'Image invalide ou corrompue.',
  'ui.api.not_ready': "Home Architect n'est pas encore chargé sur le serveur.",
  'ui.api.http_error': 'Erreur HTTP {status}.',
  'ui.api.background_not_uploaded': "L'image de fond doit être téléversée sur le serveur avant la sauvegarde.",
  'ui.api.project_too_large': 'Plan trop volumineux ({size}, maximum {limit}).',
  'ui.api.image_too_large': 'Image trop volumineuse ({size}, maximum {limit}).',
  'ui.api.svg_too_large': 'SVG trop volumineux ({size}, maximum {limit}).',
  'ui.api.invalid_upload_response': 'Réponse inattendue du serveur après le téléversement.',
  'ui.api.invalid_publish_response': 'Réponse inattendue du serveur après la publication.',
});

registerTranslations('en', {
  'ui.level.sous-sol': 'Basement',
  'ui.level.sous-sol.full': 'Basement',
  'ui.level.rdc': 'Ground floor',
  'ui.level.rdc.full': 'Ground floor',
  'ui.level.etage1': 'First floor',
  'ui.level.etage1.full': 'First floor',
  'ui.level.etage2': 'Second floor',
  'ui.level.etage2.full': 'Second floor',
  'ui.level.etage3': 'Third floor',
  'ui.level.etage3.full': 'Third floor',
  'ui.level.jardin': 'Garden',
  'ui.level.jardin.full': 'Garden',
  'ui.level.autre': 'Other',
  'ui.level.autre.full': 'Other',

  'ui.project.default_name': 'New plan',
  'ui.project.default_room_name': 'Room',

  'ui.api.size_mib': '{value} MB',
  'ui.api.conflict': 'The plan has been changed elsewhere since it was opened.',
  'ui.api.conflict_revision': 'The plan has been changed elsewhere since it was opened (server revision {revision}).',
  'ui.api.unauthorized': 'Only Home Assistant administrators can do this.',
  'ui.api.payload_too_large': 'The data is too large for the server.',
  'ui.api.payload_too_large_size': 'The data is too large for the server ({size}, maximum {limit}).',
  'ui.api.not_connected': 'The connection to Home Assistant is unavailable.',
  'ui.api.connection_lost': 'The connection to Home Assistant was lost.',
  'ui.api.invalid_project_id': 'Invalid project identifier: {id}',
  'ui.api.invalid_asset_id': 'Invalid image identifier: {id}',
  'ui.api.not_found': 'Resource not found on the server.',
  'ui.api.project_not_found': 'Plan not found on the server (it may have been deleted).',
  'ui.api.write_failed': 'The server could not save the data.',
  'ui.api.unknown_command': 'Unknown server command: restart Home Assistant after updating Home Architect.',
  'ui.api.file_too_large': 'The file is too large for the server.',
  'ui.api.unsupported_media_type': 'Unsupported image format.',
  'ui.api.invalid_image': 'The image is invalid or corrupted.',
  'ui.api.not_ready': 'Home Architect is not loaded on the server yet.',
  'ui.api.http_error': 'HTTP error {status}.',
  'ui.api.background_not_uploaded': 'The background image must be uploaded to the server before saving.',
  'ui.api.project_too_large': 'The plan is too large ({size}, maximum {limit}).',
  'ui.api.image_too_large': 'The image is too large ({size}, maximum {limit}).',
  'ui.api.svg_too_large': 'The SVG is too large ({size}, maximum {limit}).',
  'ui.api.invalid_upload_response': 'Unexpected server response after the upload.',
  'ui.api.invalid_publish_response': 'Unexpected server response after publishing.',
});
