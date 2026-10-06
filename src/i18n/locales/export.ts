/**
 * Traductions de la fenêtre d'export (espace `export.`).
 *
 * Mise en forme enrichie (interprétée par la fenêtre d'export, jamais comme du HTML) :
 * `**texte**` est rendu en gras et `` `texte` `` en code. Les marqueurs `{nom}` sont des paramètres.
 * Les formes `_one` / `_other` suivent les règles de pluriel de la langue (Intl.PluralRules).
 */
import { registerTranslations } from '../index';

registerTranslations('fr', {
  // En-tête et onglets
  'export.title': 'Exporter le plan vers Lovelace',
  'export.subtitle': 'Générez une carte interactive pour votre tableau de bord Home Assistant',
  'export.close': 'Fermer',
  'export.close_busy': 'Fermeture impossible pendant la publication',
  'export.tabs_label': "Type d'export",
  'export.tab.picture_elements': 'Carte Picture-Elements (Native)',
  'export.tab.custom_card': 'Carte 2D/3D (Intégrée)',
  'export.tab.raw_files': 'Fichiers & Sauvegarde',

  // Résumé du plan
  'export.stats.label': 'Résumé du plan',
  'export.stats.rooms_one': 'pièce',
  'export.stats.rooms_other': 'pièces',
  'export.stats.lights_one': 'lumière',
  'export.stats.lights_other': 'lumières',
  'export.stats.radars_one': 'détecteur',
  'export.stats.radars_other': 'détecteurs',
  'export.stats.sensors_one': 'capteur / temp.',
  'export.stats.sensors_other': 'capteurs / temp.',
  'export.stats.switches_one': 'prise / switch',
  'export.stats.switches_other': 'prises / switchs',
  'export.stats.furniture_one': 'meuble',
  'export.stats.furniture_other': 'meubles',

  // Plan non sauvegardé
  'export.save.never_title': "Ce plan n'est pas encore sauvegardé sur le serveur",
  'export.save.dirty_title': 'Modifications non sauvegardées',
  'export.save.never_text':
    "La carte intégrée ne le trouvera pas et la publication est impossible tant que le plan n'est pas sauvegardé.",
  'export.save.dirty_text':
    'La carte intégrée affiche la dernière version sauvegardée. Sauvegardez pour que les deux cartes affichent le même plan.',
  'export.save.button': 'Sauvegarder le plan',

  // Confirmations
  'export.confirm.publish':
    "Le plan publié sera remplacé par l'état actuel du plan. Les tableaux de bord qui l'utilisent afficheront immédiatement la nouvelle version.",
  'export.confirm.publish_freeze': 'Le cadre actuel sera figé : recollez ensuite le code YAML.',
  'export.confirm.unpublish':
    "L'URL publiée cessera de fonctionner : les cartes picture-elements qui l'utilisent afficheront une image cassée. Une nouvelle publication créera une nouvelle URL.",
  'export.confirm.reframe':
    'Le cadre sera recalculé sur le contenu actuel et le plan publié sera mis à jour avec ce cadre : les positions changent, il faudra recoller le nouveau code YAML dans vos tableaux de bord.',
  'export.confirm.ok': 'Confirmer',
  'export.confirm.cancel': 'Annuler',

  // 1. Publication
  'export.publish.title': 'Publier le plan',
  'export.publish.hint':
    "Home Assistant sert le plan publié **sans authentification**, à une adresse secrète impossible à deviner : ne la partagez pas. Le plan publié n'est mis à jour que lorsque vous cliquez sur « Publier ».",
  'export.publish.published_with_background': 'Publié le {date} (avec image de fond)',
  'export.publish.published_without_background': 'Publié le {date} (sans image de fond)',
  'export.publish.not_published': 'Pas encore publié.',
  'export.publish.external_background':
    "L'image de fond est une URL externe : elle n'apparaîtra pas dans la carte picture-elements (une image SVG affichée par Lovelace ne charge aucune ressource externe). Importez l'image dans le plan pour pouvoir l'inclure.",
  'export.include_background': "Inclure l'image de fond",
  'export.publish.public_warning':
    "**URL publique :** toute personne qui obtient l'URL pourra voir cette image (plan d'architecte, photo…).",
  'export.publish.without_background': 'Seuls les murs, pièces, ouvertures et meubles sont publiés.',
  'export.publish.legacy_title': 'Ancien fichier public détecté : `{path}`',
  'export.publish.legacy_text':
    "Il est réécrit à chaque publication et reste accessible sans authentification sous une adresse devinable. Remplacez-le dans vos tableaux de bord par le nouveau code YAML, puis cliquez sur « {unpublish} » et republiez : il sera supprimé (une copie retouchée hors de l'outil est conservée dans `/config/home_architect/backups/`).",
  'export.publish.legacy_id_hint':
    'Si un ancien fichier `/local/plan_{id}.svg` existe dans `/config/www`, il sera lui aussi mis à jour à chaque publication.',
  'export.publish.publishing': 'Publication…',
  'export.publish.update': 'Mettre à jour le plan publié',
  'export.publish.publish': 'Publier le plan',
  'export.publish.unpublishing': 'Dépublication…',
  'export.publish.unpublish': 'Dépublier',
  'export.publish.admin_only': 'Seul un administrateur peut publier ou mettre à jour le plan.',

  // 2. Cadre d'export
  'export.frame.title': "Cadre d'export",
  'export.frame.hint': 'Les positions des entités sont exprimées en pourcentage de ce cadre ({width} × {height} m).',
  'export.frame.frozen': 'Il est figé : vos modifications du plan ne décalent pas les cartes déjà collées.',
  'export.frame.not_frozen': 'Il sera figé à la prochaine publication, pour que les cartes déjà collées restent alignées.',
  'export.frame.not_kept':
    "Le cadre de la publication actuelle n'a pas été conservé dans le plan : le code YAML ci-dessous peut ne pas correspondre au plan publié. Mettez à jour le plan publié pour figer le cadre, puis recollez le code YAML.",
  'export.frame.out_of_frame':
    "Le plan dépasse le cadre figé : les éléments hors cadre seront coupés ou mal placés. Recadrez pour l'agrandir.",
  'export.frame.stale':
    'Le plan publié utilise un nouveau cadre : recollez le nouveau code YAML dans vos tableaux de bord (les positions des entités ont changé).',
  'export.frame.reframe_and_publish': 'Recadrer sur le plan actuel et republier',
  'export.frame.reframe': 'Recadrer sur le plan actuel',

  // 3. Code Lovelace
  'export.code.title': 'Code Lovelace',
  'export.code.picture_title': 'Code YAML Picture-Elements',
  'export.code.card_title': 'Code Lovelace YAML',
  'export.code.copy': 'Copier le YAML',
  'export.code.copied': 'Copié !',
  'export.code.no_entities': "Aucune entité n'est placée sur le plan : la carte affichera le plan seul (`elements: []`).",
  'export.code.publish_first':
    "Publiez le plan pour obtenir le code de la carte picture-elements (il référence l'URL publiée).",
  'export.copy.footer': 'Copier le YAML dans le presse-papiers',
  'export.copy.footer_done': 'Copié dans le presse-papiers !',
  'export.copy.manual':
    'Copie automatique impossible dans ce navigateur : le code est sélectionné ci-dessous, copiez-le avec Ctrl+C (⌘C) ou le menu « Copier ».',
  'export.copy.manual_label': 'Code YAML à copier',

  // Guides
  'export.guide.picture_title': 'Comment installer cette carte dans Home Assistant :',
  'export.guide.picture_step1':
    "Sauvegardez puis **publiez** le plan (l'image est servie par Home Assistant, aucun fichier à copier).",
  'export.guide.picture_step2': 'Cliquez sur **{button}**.',
  'export.guide.picture_step3':
    'Dans votre tableau de bord, cliquez sur **Modifier le tableau de bord** > **Ajouter une carte** > **Manuel**, collez le code et enregistrez.',
  'export.guide.picture_step4':
    "Après une modification du plan, cliquez sur **{button}** : l'URL reste la même et les tableaux de bord se mettent à jour.",
  'export.guide.card_title': 'Installation rapide :',
  'export.guide.card_step1': 'Sauvegardez le plan (la carte lit la version sauvegardée).',
  'export.guide.card_step2':
    'Dans Lovelace, cliquez sur **Modifier le tableau de bord** > **Ajouter une carte** > **Manuel**, collez ce code YAML et enregistrez.',

  // Carte intégrée
  'export.card.intro_title': 'Carte 2D & 3D temps réel, sans publication',
  'export.card.intro':
    'Cette carte utilise directement le moteur de rendu Home Architect et lit le plan **sauvegardé** sur votre serveur (aucune URL publique). Elle affiche votre plan en 2D ou en **3D isométrique**, anime les capteurs en temps réel, et se met à jour à chaque sauvegarde du plan.',
  'export.card.view_mode': 'Mode de vue par défaut :',
  'export.card.view_2d': 'Vue 2D',
  'export.card.view_3d': 'Vue 3D Isométrique',

  // Fichiers
  'export.files.svg_title': 'Fichier vectoriel SVG',
  'export.files.svg_hint': 'Idéal pour ouvrir dans Inkscape, Illustrator ou imprimer (même cadre que le plan publié).',
  'export.files.download_svg': 'Télécharger le SVG',
  'export.files.backup_title': 'Sauvegarde complète du projet (JSON)',
  'export.files.backup_hint':
    "Murs, pièces, ouvertures, meubles, entités et image de fond. Réimportable depuis la fenêtre d'import (fichier .json).",
  'export.files.download_backup': 'Télécharger la sauvegarde JSON',
  'export.files.preparing': 'Préparation…',

  // Notifications
  'export.notice.published': 'Plan publié : copiez le code YAML ci-dessous.',
  'export.notice.published_new_frame': 'Plan publié avec le nouveau cadre : recollez le code YAML.',
  'export.notice.unpublished': "Plan dépublié : l'ancienne URL ne fonctionne plus.",
  'export.notice.copied': 'Code YAML copié dans le presse-papiers.',
  'export.notice.svg_without_background': "SVG téléchargé sans l'image de fond (image indisponible).",
  'export.notice.backup_without_background': "Sauvegarde téléchargée sans l'image de fond (image indisponible).",
  'export.notice.backup_done': 'Sauvegarde du projet téléchargée.',
  'export.notice.download_failed': 'Téléchargement impossible : {error}',

  // Erreurs
  'export.error.no_background': 'Aucune image de fond téléversée pour ce plan.',
  'export.error.background_unavailable':
    "Image de fond introuvable ou illisible sur le serveur : décochez « Inclure l'image de fond » ou réimportez l'image.",
  'export.error.background_too_large':
    'Image de fond trop volumineuse pour être incluse ({size} une fois encodée, maximum {max}).',
  'export.error.background_format':
    "Format d'image de fond non pris en charge (PNG, JPEG, WebP, GIF ou SVG attendu) : décochez « Inclure l'image de fond ».",
  'export.error.background_type': "Type de l'image de fond inconnu.",
  'export.error.too_large_with_background': "{message} Décochez « Inclure l'image de fond » ou allégez l'image.",
  'export.error.not_found': "Ce plan n'existe pas encore sur le serveur : sauvegardez-le, puis réessayez.",
  'export.error.invalid_svg': 'Le serveur a refusé le SVG généré (format non valide).',
  'export.error.write_failed': "Le serveur n'a pas pu écrire le plan publié (voir le journal de Home Assistant).",
  'export.error.unknown_command':
    "Le serveur Home Architect n'est pas à jour : redémarrez Home Assistant pour terminer la mise à jour.",
  'export.error.connection': 'Connexion à Home Assistant indisponible : réessayez dans un instant.',

  // Unités
  'export.unit.megabytes': '{value} Mo',
});

registerTranslations('en', {
  // Header and tabs
  'export.title': 'Export the plan to a dashboard',
  'export.subtitle': 'Generate an interactive card for your Home Assistant dashboard',
  'export.close': 'Close',
  'export.close_busy': "Can't close while publishing",
  'export.tabs_label': 'Export type',
  'export.tab.picture_elements': 'Picture elements card (native)',
  'export.tab.custom_card': '2D/3D card (built in)',
  'export.tab.raw_files': 'Files & backup',

  // Plan summary
  'export.stats.label': 'Plan summary',
  'export.stats.rooms_one': 'room',
  'export.stats.rooms_other': 'rooms',
  'export.stats.lights_one': 'light',
  'export.stats.lights_other': 'lights',
  'export.stats.radars_one': 'detector',
  'export.stats.radars_other': 'detectors',
  'export.stats.sensors_one': 'sensor / temp.',
  'export.stats.sensors_other': 'sensors / temp.',
  'export.stats.switches_one': 'plug / switch',
  'export.stats.switches_other': 'plugs / switches',
  'export.stats.furniture_one': 'piece of furniture',
  'export.stats.furniture_other': 'pieces of furniture',

  // Unsaved plan
  'export.save.never_title': "This plan hasn't been saved to the server yet",
  'export.save.dirty_title': 'Unsaved changes',
  'export.save.never_text': "The built-in card won't find it, and it can't be published until the plan is saved.",
  'export.save.dirty_text': 'The built-in card shows the last saved version. Save so that both cards show the same plan.',
  'export.save.button': 'Save plan',

  // Confirmations
  'export.confirm.publish':
    'The published plan will be replaced with the current state of the plan. Dashboards that use it will show the new version immediately.',
  'export.confirm.publish_freeze': 'The current frame will be locked: paste the YAML code again afterwards.',
  'export.confirm.unpublish':
    'The published URL will stop working: picture elements cards that use it will show a broken image. Publishing again will create a new URL.',
  'export.confirm.reframe':
    'The frame will be recalculated from the current content and the published plan will be updated with it: positions will change, so you will need to paste the new YAML code into your dashboards again.',
  'export.confirm.ok': 'Confirm',
  'export.confirm.cancel': 'Cancel',

  // 1. Publishing
  'export.publish.title': 'Publish the plan',
  'export.publish.hint':
    'Home Assistant serves the published plan **without authentication**, at a secret address that cannot be guessed: do not share it. The published plan is only updated when you click "Publish".',
  'export.publish.published_with_background': 'Published on {date} (with background image)',
  'export.publish.published_without_background': 'Published on {date} (without background image)',
  'export.publish.not_published': 'Not published yet.',
  'export.publish.external_background':
    'The background image is an external URL: it will not appear in the picture elements card (an SVG image displayed by a dashboard does not load any external resource). Import the image into the plan to be able to include it.',
  'export.include_background': 'Include background image',
  'export.publish.public_warning':
    '**Public URL:** anyone who gets hold of the URL will be able to see this image (architectural plan, photo…).',
  'export.publish.without_background': 'Only walls, rooms, openings and furniture are published.',
  'export.publish.legacy_title': 'Old public file detected: `{path}`',
  'export.publish.legacy_text':
    'It is rewritten on every publication and remains accessible without authentication at a guessable address. Replace it in your dashboards with the new YAML code, then click "{unpublish}" and publish again: it will be deleted (a copy edited outside the tool is kept in `/config/home_architect/backups/`).',
  'export.publish.legacy_id_hint':
    'If an old `/local/plan_{id}.svg` file exists in `/config/www`, it will also be updated on every publication.',
  'export.publish.publishing': 'Publishing…',
  'export.publish.update': 'Update the published plan',
  'export.publish.publish': 'Publish the plan',
  'export.publish.unpublishing': 'Unpublishing…',
  'export.publish.unpublish': 'Unpublish',
  'export.publish.admin_only': 'Only an administrator can publish or update the plan.',

  // 2. Export frame
  'export.frame.title': 'Export frame',
  'export.frame.hint': 'Entity positions are expressed as a percentage of this frame ({width} × {height} m).',
  'export.frame.frozen': 'It is locked: changes to the plan will not shift cards you have already pasted.',
  'export.frame.not_frozen': 'It will be locked at the next publication, so that cards you have already pasted stay aligned.',
  'export.frame.not_kept':
    'The frame of the current publication was not kept in the plan: the YAML code below may not match the published plan. Update the published plan to lock the frame, then paste the YAML code again.',
  'export.frame.out_of_frame':
    'The plan extends beyond the locked frame: elements outside it will be cut off or misplaced. Reframe to enlarge it.',
  'export.frame.stale':
    'The published plan uses a new frame: paste the new YAML code into your dashboards again (entity positions have changed).',
  'export.frame.reframe_and_publish': 'Reframe on the current plan and republish',
  'export.frame.reframe': 'Reframe on the current plan',

  // 3. Dashboard code
  'export.code.title': 'Dashboard code',
  'export.code.picture_title': 'Picture elements YAML code',
  'export.code.card_title': 'Dashboard YAML code',
  'export.code.copy': 'Copy YAML',
  'export.code.copied': 'Copied!',
  'export.code.no_entities': 'No entity is placed on the plan: the card will show the plan only (`elements: []`).',
  'export.code.publish_first': 'Publish the plan to get the picture elements card code (it references the published URL).',
  'export.copy.footer': 'Copy YAML to clipboard',
  'export.copy.footer_done': 'Copied to clipboard!',
  'export.copy.manual':
    'Automatic copy is not available in this browser: the code is selected below, copy it with Ctrl+C (⌘C) or the "Copy" menu.',
  'export.copy.manual_label': 'YAML code to copy',

  // Guides
  'export.guide.picture_title': 'How to add this card to Home Assistant:',
  'export.guide.picture_step1': 'Save, then **publish** the plan (the image is served by Home Assistant, there is no file to copy).',
  'export.guide.picture_step2': 'Click **{button}**.',
  'export.guide.picture_step3':
    'In your dashboard, click **Edit dashboard** > **Add card** > **Manual**, paste the code and save.',
  'export.guide.picture_step4':
    'After changing the plan, click **{button}**: the URL stays the same and dashboards update automatically.',
  'export.guide.card_title': 'Quick setup:',
  'export.guide.card_step1': 'Save the plan (the card reads the saved version).',
  'export.guide.card_step2':
    'In your dashboard, click **Edit dashboard** > **Add card** > **Manual**, paste this YAML code and save.',

  // Built-in card
  'export.card.intro_title': 'Real-time 2D & 3D card, no publishing needed',
  'export.card.intro':
    'This card uses the Home Architect rendering engine directly and reads the plan **saved** on your server (no public URL). It shows your plan in 2D or in **isometric 3D**, animates sensors in real time, and updates every time the plan is saved.',
  'export.card.view_mode': 'Default view mode:',
  'export.card.view_2d': '2D view',
  'export.card.view_3d': 'Isometric 3D view',

  // Files
  'export.files.svg_title': 'SVG vector file',
  'export.files.svg_hint': 'Ideal for opening in Inkscape or Illustrator, or for printing (same frame as the published plan).',
  'export.files.download_svg': 'Download SVG',
  'export.files.backup_title': 'Full project backup (JSON)',
  'export.files.backup_hint':
    'Walls, rooms, openings, furniture, entities and background image. Can be re-imported from the import window (.json file).',
  'export.files.download_backup': 'Download JSON backup',
  'export.files.preparing': 'Preparing…',

  // Notifications
  'export.notice.published': 'Plan published: copy the YAML code below.',
  'export.notice.published_new_frame': 'Plan published with the new frame: paste the YAML code again.',
  'export.notice.unpublished': 'Plan unpublished: the old URL no longer works.',
  'export.notice.copied': 'YAML code copied to clipboard.',
  'export.notice.svg_without_background': 'SVG downloaded without the background image (image unavailable).',
  'export.notice.backup_without_background': 'Backup downloaded without the background image (image unavailable).',
  'export.notice.backup_done': 'Project backup downloaded.',
  'export.notice.download_failed': 'Download failed: {error}',

  // Errors
  'export.error.no_background': 'No background image has been uploaded for this plan.',
  'export.error.background_unavailable':
    'Background image missing or unreadable on the server: uncheck "Include background image" or import the image again.',
  'export.error.background_too_large': 'Background image too large to be included ({size} once encoded, maximum {max}).',
  'export.error.background_format':
    'Unsupported background image format (PNG, JPEG, WebP, GIF or SVG expected): uncheck "Include background image".',
  'export.error.background_type': 'Unknown background image type.',
  'export.error.too_large_with_background': '{message} Uncheck "Include background image" or use a lighter image.',
  'export.error.not_found': 'This plan does not exist on the server yet: save it, then try again.',
  'export.error.invalid_svg': 'The server rejected the generated SVG (invalid format).',
  'export.error.write_failed': 'The server could not write the published plan (see the Home Assistant log).',
  'export.error.unknown_command':
    'The Home Architect server is out of date: restart Home Assistant to finish the update.',
  'export.error.connection': 'Connection to Home Assistant unavailable: try again in a moment.',

  // Units
  'export.unit.megabytes': '{value} MB',
});
