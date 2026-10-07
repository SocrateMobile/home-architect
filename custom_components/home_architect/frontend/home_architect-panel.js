import{r as et,j as o,m as R,v as Ye,w as je,i as De,L as Ee,u as ze,a as he,A as w,k as u,G as lo,n as L,o as k,p as Ae,x as co,y as wn,z as _n,B as st,E as At,F as di,c as Ke,b as ga,C as fa,H as uo,I as kn,J as po,K as $n,M as ho,N as Ge,O as oe,Q as mo,R as lt,D as xe,S as go,T as Sn,U as qt,V as pe,W as ea,X as ta,Y as vi,Z as Oe,$ as fo,a0 as xt,a1 as bo,a2 as ui,a3 as Le,a4 as Ua,a5 as Ot,a6 as ba,a7 as vo,a8 as xo,a9 as yo,aa as Ha,ab as wo,ac as Mn,P as Cn,ad as ia,ae as pi,af as Nt,ag as _t,l as aa,ah as _o,ai as ko,aj as $o,f as So,h as Mo,ak as Co,al as To,am as ii,an as Io,ao as Do,ap as jt,aq as Wt,ar as Eo,g as kt,as as zo,at as Ao,d as Po,au as Ro,av as Oo,aw as jo,e as Lo,ax as Je,s as Fo,_ as No,ay as Bo,az as qa,aA as Uo,aB as Wa,aC as Ga,aD as Va,aE as Ya,aF as Ho,aG as qo,q as Wo}from"./chunks/version-C-Fa6Gn_.js";const Go=(r,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(r,e,t),t);function Vo(r,e){return(t,i,a)=>{const n=s=>s.renderRoot?.querySelector(r)??null;return Go(t,i,{get(){return n(this)}})}}et("fr",{"ui.common.close":"Fermer","ui.common.cancel":"Annuler","ui.unit.cm":"{value} cm","ui.unit.m":"{value} m","ui.unit.m2":"{value} m²","ui.toolbar.label":"Outils de dessin","ui.toolbar.drag":"Glisser pour déplacer la boîte à outils (double-clic : position par défaut)","ui.toolbar.drag_label":"Déplacer la boîte à outils (flèches du clavier ; Début : position par défaut)","ui.toolbar.read_only":"Lecture seule : l'édition est réservée aux administrateurs Home Assistant","ui.toolbar.wizard":"Assistant Débutant : Créer une pièce guidée","ui.toolbar.wizard_tooltip":"Assistant Débutant : Créer une pièce guidée (🪄)","ui.toolbar.undo":"Annuler","ui.toolbar.undo_tooltip":"Annuler (Ctrl+Z / Cmd+Z)","ui.toolbar.redo":"Rétablir","ui.toolbar.redo_tooltip":"Rétablir (Ctrl+Y / Cmd+Shift+Z)","ui.toolbar.select":"Sélectionner & Déplacer","ui.toolbar.wall":"Tracer un mur","ui.toolbar.wall_tooltip_suffix":" - Cliquez pour choisir l'épaisseur (Fin 10cm, Moyen 20cm, Gros 30cm)","ui.toolbar.room":"Tracer une pièce","ui.toolbar.room_tooltip":"Tracer une pièce - Cliquez pour choisir : pièce libre (polygone) ou rectangulaire","ui.toolbar.door":"Insérer une porte","ui.toolbar.door_tooltip_suffix":" - Cliquez pour choisir le sens d'ouverture (Droite/Gauche, Intérieur/Extérieur)","ui.toolbar.window":"Insérer une fenêtre","ui.toolbar.window_tooltip_suffix":" - Cliquez pour choisir 1 ouvrant ou 2 battants","ui.toolbar.french_window":"Insérer une baie coulissante","ui.toolbar.import":"Importer un plan","ui.toolbar.import_tooltip":"Importer un plan (PNG, JPG, WebP, SVG) ou coller une image (Ctrl+V / Cmd+V)","ui.toolbar.calibrate":"Étalonnage d'échelle","ui.toolbar.calibrate_tooltip":"Étalonnage d'échelle : tracer un mur mesuré sur l'image","ui.toolbar.rescale":"Mettre à l'échelle","ui.toolbar.rescale_tooltip":"Mettre à l'échelle : mesurer un mur pour recalculer toutes les cotes","ui.toolbar.grid_tooltip":"Grille et accrochages (grille {size}, accrochage {state} ; Alt : sans accrochage)","ui.toolbar.snap_on":"activé","ui.toolbar.snap_off":"désactivé","ui.toolbar.active_badge":"Actif","ui.toolbar.door.title":"Sens d'ouverture de porte","ui.toolbar.door.right_in":"Ouverture droite intérieure","ui.toolbar.door.right_in_sub":"Poussant droit • Gonds à droite, s'ouvre vers l'intérieur","ui.toolbar.door.left_in":"Ouverture gauche intérieure","ui.toolbar.door.left_in_sub":"Poussant gauche • Gonds à gauche, s'ouvre vers l'intérieur","ui.toolbar.door.left_out":"Ouverture gauche extérieure","ui.toolbar.door.left_out_sub":"Tirant gauche • Gonds à gauche, s'ouvre vers l'extérieur","ui.toolbar.door.right_out":"Ouverture droite extérieure","ui.toolbar.door.right_out_sub":"Tirant droit • Gonds à droite, s'ouvre vers l'extérieur","ui.toolbar.window.title":"Type de fenêtre","ui.toolbar.window.single":"1 ouvrant (Battant simple)","ui.toolbar.window.single_sub":"Fenêtre standard 1 vantail ({width})","ui.toolbar.window.double":"2 battants (Double vantaux)","ui.toolbar.window.double_sub":"Fenêtre large avec meneau ({width})","ui.toolbar.window.sliding":"Baie vitrée coulissante","ui.toolbar.window.sliding_sub":"Porte-fenêtre 2 vantaux ({width})","ui.toolbar.wall.title":"Épaisseur du mur","ui.toolbar.wall.thin":"Fin (Cloison)","ui.toolbar.wall.thin_sub":"Cloisons intérieures séparatives ({thickness})","ui.toolbar.wall.medium":"Moyen (Standard)","ui.toolbar.wall.medium_sub":"Murs intérieurs porteurs ou standards ({thickness})","ui.toolbar.wall.thick":"Gros (Porteur / Extérieur)","ui.toolbar.wall.thick_sub":"Murs de façade et gros porteurs ({thickness})","ui.toolbar.room.title":"Tracer une pièce","ui.toolbar.room.polygon":"Pièce libre (polygone)","ui.toolbar.room.polygon_sub":"Cliquez chaque angle ; double-cliquez ou revenez au premier point pour fermer","ui.toolbar.room.rect":"Pièce rectangulaire","ui.toolbar.room.rect_sub":"Glissez d'un angle à l'angle opposé","ui.toolbar.grid.title":"Grille et accrochages","ui.toolbar.grid.size":"Taille de la grille","ui.toolbar.grid.snapping":"Accrochages","ui.toolbar.grid.snapToGrid":"Accrocher à la grille","ui.toolbar.grid.snapToGrid_sub":"Les points tombent sur les intersections de la grille","ui.toolbar.grid.snapToAngles":"Accrocher aux angles","ui.toolbar.grid.snapToAngles_sub":"Murs guidés à 0°, 45° et 90°","ui.toolbar.grid.snapToElements":"Accrocher aux murs et points","ui.toolbar.grid.snapToElements_sub":"Alignement sur les extrémités et murs existants","ui.toolbar.grid.hint":"Maintenez Alt pendant un tracé ou un glisser pour désactiver temporairement l'accrochage.","ui.drawer.title_entities":"Objets & Domotique","ui.drawer.title_furniture":"Meubles & Déco","ui.drawer.collapse":"Masquer / Réduire le volet","ui.drawer.tabs":"Contenu du volet","ui.drawer.tab.entities":"Entités HA","ui.drawer.tab.entities_count":"Nombre total d'entités","ui.drawer.tab.furniture":"Meubles","ui.drawer.tab.furniture_count":"Nombre total de meubles","ui.drawer.filter.all":"Tous","ui.drawer.filter.lights":"Lumières","ui.drawer.filter.switches":"Prises & interrupteurs","ui.drawer.filter.sensors":"Capteurs","ui.drawer.filter.climate":"Climat","ui.drawer.filter.covers":"Volets & vannes","ui.drawer.filter.fans":"Ventilation","ui.drawer.filter.media":"Médias","ui.drawer.filter.security":"Serrures & alarmes","ui.drawer.filter.cameras":"Caméras","ui.drawer.filter.actions":"Scènes & scripts","ui.drawer.search_entities":"Rechercher une entité","ui.drawer.search_entities_placeholder":"Rechercher une entité...","ui.drawer.filter_by_type":"Filtrer par type","ui.drawer.filter_by_area":"Filtrer par zone","ui.drawer.all_areas":"Toutes les zones","ui.drawer.show_hidden":"Masquées","ui.drawer.show_hidden_tooltip":"Afficher aussi les entités masquées, de diagnostic ou de configuration","ui.drawer.connecting":"Connexion à Home Assistant…","ui.drawer.no_entities":"Aucune entité trouvée","ui.drawer.results_one":"{count} entité","ui.drawer.results_other":"{count} entités","ui.drawer.results_shown":"({count} affichées)","ui.drawer.place_entity":"Placer {name} ({state}) sur le plan","ui.drawer.drag_entity_tooltip":"Glissez et déposez sur une pièce du plan","ui.drawer.show_more_one":"Afficher {batch} de plus ({count} restante)","ui.drawer.show_more_other":"Afficher {batch} de plus ({count} restantes)","ui.drawer.drag_entity_hint":"Glissez une entité sur une pièce du plan","ui.drawer.search_furniture":"Rechercher un meuble","ui.drawer.search_furniture_placeholder":"Rechercher un meuble...","ui.drawer.filter_by_category":"Filtrer par catégorie","ui.drawer.no_furniture":"Aucun meuble trouvé","ui.drawer.dimensions":"{width} × {length} m","ui.drawer.place_furniture":"Placer {name} ({dimensions}) sur le plan","ui.drawer.drag_furniture_tooltip":"Glissez et déposez sur le plan ({dimensions})","ui.drawer.drag_furniture_hint":"Glissez un meuble sur le plan (R pour pivoter)","ui.wizard.title":"Assistant Création de Pièce","ui.wizard.templates":"Gabarits de pièce","ui.wizard.template.living":"Salon / Séjour","ui.wizard.template.bedroom":"Chambre","ui.wizard.template.kitchen":"Cuisine","ui.wizard.template.bathroom":"Salle de Bains","ui.wizard.template.office":"Bureau","ui.wizard.template.custom":"Sur Mesure","ui.wizard.template_dims":"{width} m × {length} m","ui.wizard.room_name":"Nom de la pièce :","ui.wizard.dimensions":"Dimensions (Largeur × Longueur) :","ui.wizard.unit_times":"m ×","ui.wizard.unit_m":"m","ui.wizard.area":"Superficie calculée :","ui.wizard.height":"Hauteur sous plafond (3D) :","ui.wizard.thickness":"Épaisseur des murs :","ui.wizard.thickness.partition":"Cloison 10 cm","ui.wizard.thickness.wall":"Mur 15 cm","ui.wizard.thickness.load_bearing":"Porteur 20 cm","ui.wizard.thickness.exterior":"Extérieur 30 cm","ui.wizard.field.width":"Largeur","ui.wizard.field.length":"Longueur","ui.wizard.field.height":"Hauteur sous plafond","ui.wizard.field_range":"{field} ({min} à {max} m)","ui.wizard.error.required":"Valeur requise","ui.wizard.error.invalid":"Nombre invalide","ui.wizard.error.range":"Entre {min} et {max} m","ui.wizard.add_door":"Porte standard ({width})","ui.wizard.add_window":"Fenêtre ({width})","ui.wizard.create":"Générer la pièce sur le plan","ui.wizard.fix_dimensions":"Corrigez les dimensions pour continuer","ui.saveload.title_save":"Enregistrer le plan","ui.saveload.title_load":"Ouvrir / Recharger un plan","ui.saveload.subtitle_save":"Définissez le nom et la catégorie de votre plan pour le retrouver facilement","ui.saveload.subtitle_load":"Sélectionnez un plan sauvegardé pour le charger dans l'éditeur","ui.saveload.tab_save":"Enregistrer le plan","ui.saveload.tab_load":"Ouvrir un plan","ui.saveload.tab_load_count":"Ouvrir un plan ({count})","ui.saveload.save":"Enregistrer le plan","ui.saveload.save_as":"Enregistrer sous…","ui.saveload.save_as_tooltip":"Crée un nouveau plan (nouvel identifiant) sans modifier le plan enregistré","ui.saveload.default_plan_name":"Plan de Maison","ui.saveload.untitled":"Plan sans nom","ui.saveload.quoted":"« {name} »","ui.saveload.warn_reload_current":"{name} est ouvert et contient des modifications non sauvegardées : elles seront remplacées par la version enregistrée.","ui.saveload.warn_lose_current":"{current} contient des modifications non sauvegardées qui seront perdues si vous ouvrez {name} sans enregistrer.","ui.saveload.warn_replace_memory":"{name} contient des modifications non sauvegardées en mémoire : la version enregistrée les remplacera.","ui.saveload.delete_failed":"Suppression de {name} impossible : {error}","ui.saveload.unknown_date":"date inconnue","ui.saveload.draft.outdated":"Copie locale du {date} (antérieure à la version du serveur)","ui.saveload.draft.outdated_tooltip":"Brouillon commencé sur une version plus ancienne : le plan a été enregistré depuis, ailleurs ou sur cet appareil","ui.saveload.draft.unsent":"Copie locale du {date} (modifications non envoyées)","ui.saveload.draft.unsent_tooltip":"Brouillon enregistré sur cet appareil et pas encore envoyé au serveur","ui.saveload.draft.unreachable":"Copie locale du {date} (serveur injoignable)","ui.saveload.draft.unreachable_tooltip":"La liste du serveur n'a pas pu être lue : ce plan y existe peut-être aussi","ui.saveload.draft.deleted":"Copie locale du {date} (plan absent du serveur)","ui.saveload.draft.deleted_tooltip":"Ce plan a été enregistré puis supprimé du serveur : ouvrez-le et enregistrez-le pour le recréer","ui.saveload.draft.local_only":"Copie locale uniquement (jamais enregistrée sur le serveur)","ui.saveload.draft.local_only_tooltip":"Ce plan n'existe que sur cet appareil : ouvrez-le puis enregistrez-le pour l'envoyer au serveur","ui.saveload.read_only":"Lecture seule : seul un administrateur Home Assistant peut enregistrer des plans.","ui.saveload.name_label":"Nom du plan :","ui.saveload.name_placeholder":"Ex: Plan RDC Maison, Plan Jardin Été...","ui.saveload.category_label":"Catégorie du plan (Niveau / Zone) :","ui.saveload.custom_category":"Catégorie personnalisée","ui.saveload.custom_category_placeholder":"Précisez la catégorie (ex: Combles, Terrasse, Garage...)","ui.saveload.already_saved":"Ce plan est déjà enregistré (modifié le {date}) : « Enregistrer » le met à jour, « Enregistrer sous… » crée une copie indépendante sans le modifier.","ui.saveload.siblings":"La catégorie {category} contient déjà {plans} : les plans restent distincts, aucun ne sera écrasé.","ui.saveload.contents_label":"Contenu du plan à enregistrer :","ui.saveload.noun.walls_one":"mur","ui.saveload.noun.walls_other":"murs","ui.saveload.noun.rooms_one":"pièce","ui.saveload.noun.rooms_other":"pièces","ui.saveload.noun.openings_one":"ouvrant","ui.saveload.noun.openings_other":"ouvrants","ui.saveload.noun.ha_entities_one":"entité HA","ui.saveload.noun.ha_entities_other":"entités HA","ui.saveload.noun.entities_one":"entité","ui.saveload.noun.entities_other":"entités","ui.saveload.noun.furniture_one":"meuble","ui.saveload.noun.furniture_other":"meubles","ui.saveload.quantity":"{count} {noun}","ui.saveload.modified":"Modifié le {date}","ui.saveload.open_badge":"(Ouvert)","ui.saveload.load":"Charger","ui.saveload.reload":"Recharger","ui.saveload.load_tooltip":"Charger ce plan","ui.saveload.reload_tooltip":"Recharger la version enregistrée de ce plan","ui.saveload.load_plan":"Charger le plan {name}","ui.saveload.reload_plan":"Recharger le plan {name}","ui.saveload.delete_tooltip":"Supprimer ce plan","ui.saveload.delete_local_tooltip":"Supprimer cette copie locale","ui.saveload.delete_plan":"Supprimer le plan {name}","ui.saveload.delete_local_plan":"Supprimer la copie locale de {name}","ui.saveload.open_anyway":"Ouvrir quand même","ui.saveload.confirm_delete_server":"Supprimer définitivement {name} du serveur ? Cette action est irréversible.","ui.saveload.confirm_delete_local_unreachable":"Supprimer la copie locale de {name} de cet appareil ? La liste du serveur étant indisponible, le plan y existe peut-être encore : il n'y sera pas supprimé.","ui.saveload.confirm_delete_local":"Supprimer la copie locale de {name} ? Ce plan n'existe nulle part ailleurs.","ui.saveload.confirm_delete_open":"Ce plan est actuellement ouvert dans l'éditeur.","ui.saveload.deleting":"Suppression…","ui.saveload.delete":"Supprimer","ui.saveload.search":"Rechercher un plan","ui.saveload.search_placeholder":"🔍 Rechercher un plan par nom ou catégorie...","ui.saveload.refresh":"Actualiser la liste","ui.saveload.list_error":"Liste des plans du serveur indisponible : {error}","ui.saveload.retry":"Réessayer","ui.saveload.loading":"Chargement des plans sauvegardés...","ui.saveload.no_match":"Aucun plan ne correspond à la recherche.","ui.saveload.no_plans":"Aucun plan sauvegardé trouvé.","ui.saveload.save_current":"Enregistrer le plan actuel","ui.saveload.results_one":"{count} plan affiché","ui.saveload.results_other":"{count} plans affichés","ui.saveload.list_label":"Plans enregistrés"});et("en",{"ui.common.close":"Close","ui.common.cancel":"Cancel","ui.unit.cm":"{value} cm","ui.unit.m":"{value} m","ui.unit.m2":"{value} m²","ui.toolbar.label":"Drawing tools","ui.toolbar.drag":"Drag to move the toolbox (double-click: default position)","ui.toolbar.drag_label":"Move the toolbox (arrow keys; Home: default position)","ui.toolbar.read_only":"Read-only: editing is restricted to Home Assistant administrators","ui.toolbar.wizard":"Beginner wizard: create a guided room","ui.toolbar.wizard_tooltip":"Beginner wizard: create a guided room (🪄)","ui.toolbar.undo":"Undo","ui.toolbar.undo_tooltip":"Undo (Ctrl+Z / Cmd+Z)","ui.toolbar.redo":"Redo","ui.toolbar.redo_tooltip":"Redo (Ctrl+Y / Cmd+Shift+Z)","ui.toolbar.select":"Select & move","ui.toolbar.wall":"Draw a wall","ui.toolbar.wall_tooltip_suffix":" - Click to choose the thickness (thin 10 cm, medium 20 cm, thick 30 cm)","ui.toolbar.room":"Draw a room","ui.toolbar.room_tooltip":"Draw a room - Click to choose: freeform (polygon) or rectangular room","ui.toolbar.door":"Insert a door","ui.toolbar.door_tooltip_suffix":" - Click to choose the opening direction (right/left, inward/outward)","ui.toolbar.window":"Insert a window","ui.toolbar.window_tooltip_suffix":" - Click to choose a single or double casement","ui.toolbar.french_window":"Insert a sliding glass door","ui.toolbar.import":"Import a floor plan","ui.toolbar.import_tooltip":"Import a floor plan (PNG, JPG, WebP, SVG) or paste an image (Ctrl+V / Cmd+V)","ui.toolbar.calibrate":"Scale calibration","ui.toolbar.calibrate_tooltip":"Scale calibration: trace a measured wall on the image","ui.toolbar.rescale":"Rescale the plan","ui.toolbar.rescale_tooltip":"Rescale: measure a wall to recalculate all dimensions","ui.toolbar.grid_tooltip":"Grid and snapping (grid {size}, snapping {state}; Alt: no snapping)","ui.toolbar.snap_on":"on","ui.toolbar.snap_off":"off","ui.toolbar.active_badge":"Active","ui.toolbar.door.title":"Door opening direction","ui.toolbar.door.right_in":"Right-hand, opens inward","ui.toolbar.door.right_in_sub":"Right-hand push • Hinges on the right, opens inward","ui.toolbar.door.left_in":"Left-hand, opens inward","ui.toolbar.door.left_in_sub":"Left-hand push • Hinges on the left, opens inward","ui.toolbar.door.left_out":"Left-hand, opens outward","ui.toolbar.door.left_out_sub":"Left-hand pull • Hinges on the left, opens outward","ui.toolbar.door.right_out":"Right-hand, opens outward","ui.toolbar.door.right_out_sub":"Right-hand pull • Hinges on the right, opens outward","ui.toolbar.window.title":"Window type","ui.toolbar.window.single":"Single casement","ui.toolbar.window.single_sub":"Standard single-sash window ({width})","ui.toolbar.window.double":"Double casement","ui.toolbar.window.double_sub":"Wide window with a mullion ({width})","ui.toolbar.window.sliding":"Sliding glass door","ui.toolbar.window.sliding_sub":"Two-panel patio door ({width})","ui.toolbar.wall.title":"Wall thickness","ui.toolbar.wall.thin":"Thin (partition)","ui.toolbar.wall.thin_sub":"Interior partition walls ({thickness})","ui.toolbar.wall.medium":"Medium (standard)","ui.toolbar.wall.medium_sub":"Standard or load-bearing interior walls ({thickness})","ui.toolbar.wall.thick":"Thick (load-bearing / exterior)","ui.toolbar.wall.thick_sub":"Exterior and main load-bearing walls ({thickness})","ui.toolbar.room.title":"Draw a room","ui.toolbar.room.polygon":"Freeform room (polygon)","ui.toolbar.room.polygon_sub":"Click each corner; double-click or return to the first point to close","ui.toolbar.room.rect":"Rectangular room","ui.toolbar.room.rect_sub":"Drag from one corner to the opposite corner","ui.toolbar.grid.title":"Grid and snapping","ui.toolbar.grid.size":"Grid size","ui.toolbar.grid.snapping":"Snapping","ui.toolbar.grid.snapToGrid":"Snap to grid","ui.toolbar.grid.snapToGrid_sub":"Points land on grid intersections","ui.toolbar.grid.snapToAngles":"Snap to angles","ui.toolbar.grid.snapToAngles_sub":"Walls guided at 0°, 45° and 90°","ui.toolbar.grid.snapToElements":"Snap to walls and points","ui.toolbar.grid.snapToElements_sub":"Align with existing endpoints and walls","ui.toolbar.grid.hint":"Hold Alt while drawing or dragging to temporarily disable snapping.","ui.drawer.title_entities":"Smart home entities","ui.drawer.title_furniture":"Furniture & decor","ui.drawer.collapse":"Hide / collapse the side panel","ui.drawer.tabs":"Side panel content","ui.drawer.tab.entities":"HA entities","ui.drawer.tab.entities_count":"Total number of entities","ui.drawer.tab.furniture":"Furniture","ui.drawer.tab.furniture_count":"Total number of furniture items","ui.drawer.filter.all":"All","ui.drawer.filter.lights":"Lights","ui.drawer.filter.switches":"Plugs & switches","ui.drawer.filter.sensors":"Sensors","ui.drawer.filter.climate":"Climate","ui.drawer.filter.covers":"Covers & valves","ui.drawer.filter.fans":"Fans","ui.drawer.filter.media":"Media","ui.drawer.filter.security":"Locks & alarms","ui.drawer.filter.cameras":"Cameras","ui.drawer.filter.actions":"Scenes & scripts","ui.drawer.search_entities":"Search entities","ui.drawer.search_entities_placeholder":"Search entities…","ui.drawer.filter_by_type":"Filter by type","ui.drawer.filter_by_area":"Filter by area","ui.drawer.all_areas":"All areas","ui.drawer.show_hidden":"Hidden","ui.drawer.show_hidden_tooltip":"Also show hidden, diagnostic and configuration entities","ui.drawer.connecting":"Connecting to Home Assistant…","ui.drawer.no_entities":"No entities found","ui.drawer.results_one":"{count} entity","ui.drawer.results_other":"{count} entities","ui.drawer.results_shown":"({count} shown)","ui.drawer.place_entity":"Place {name} ({state}) on the plan","ui.drawer.drag_entity_tooltip":"Drag and drop onto a room of the plan","ui.drawer.show_more_one":"Show {batch} more ({count} remaining)","ui.drawer.show_more_other":"Show {batch} more ({count} remaining)","ui.drawer.drag_entity_hint":"Drag an entity onto a room of the plan","ui.drawer.search_furniture":"Search furniture","ui.drawer.search_furniture_placeholder":"Search furniture…","ui.drawer.filter_by_category":"Filter by category","ui.drawer.no_furniture":"No furniture found","ui.drawer.dimensions":"{width} × {length} m","ui.drawer.place_furniture":"Place {name} ({dimensions}) on the plan","ui.drawer.drag_furniture_tooltip":"Drag and drop onto the plan ({dimensions})","ui.drawer.drag_furniture_hint":"Drag a piece of furniture onto the plan (R to rotate)","ui.wizard.title":"Room creation wizard","ui.wizard.templates":"Room templates","ui.wizard.template.living":"Living room","ui.wizard.template.bedroom":"Bedroom","ui.wizard.template.kitchen":"Kitchen","ui.wizard.template.bathroom":"Bathroom","ui.wizard.template.office":"Office","ui.wizard.template.custom":"Custom","ui.wizard.template_dims":"{width} m × {length} m","ui.wizard.room_name":"Room name:","ui.wizard.dimensions":"Dimensions (width × length):","ui.wizard.unit_times":"m ×","ui.wizard.unit_m":"m","ui.wizard.area":"Calculated area:","ui.wizard.height":"Ceiling height (3D):","ui.wizard.thickness":"Wall thickness:","ui.wizard.thickness.partition":"Partition 10 cm","ui.wizard.thickness.wall":"Wall 15 cm","ui.wizard.thickness.load_bearing":"Load-bearing 20 cm","ui.wizard.thickness.exterior":"Exterior 30 cm","ui.wizard.field.width":"Width","ui.wizard.field.length":"Length","ui.wizard.field.height":"Ceiling height","ui.wizard.field_range":"{field} ({min} to {max} m)","ui.wizard.error.required":"Value required","ui.wizard.error.invalid":"Invalid number","ui.wizard.error.range":"Between {min} and {max} m","ui.wizard.add_door":"Standard door ({width})","ui.wizard.add_window":"Window ({width})","ui.wizard.create":"Create the room on the plan","ui.wizard.fix_dimensions":"Fix the dimensions to continue","ui.saveload.title_save":"Save plan","ui.saveload.title_load":"Open / reload a plan","ui.saveload.subtitle_save":"Set the name and category of your plan so you can find it easily","ui.saveload.subtitle_load":"Select a saved plan to load it into the editor","ui.saveload.tab_save":"Save plan","ui.saveload.tab_load":"Open a plan","ui.saveload.tab_load_count":"Open a plan ({count})","ui.saveload.save":"Save plan","ui.saveload.save_as":"Save as…","ui.saveload.save_as_tooltip":"Creates a new plan (new identifier) without changing the saved plan","ui.saveload.default_plan_name":"Home plan","ui.saveload.untitled":"Untitled plan","ui.saveload.quoted":"“{name}”","ui.saveload.warn_reload_current":"{name} is open and has unsaved changes: they will be replaced by the saved version.","ui.saveload.warn_lose_current":"{current} has unsaved changes that will be lost if you open {name} without saving.","ui.saveload.warn_replace_memory":"{name} has unsaved changes in memory: the saved version will replace them.","ui.saveload.delete_failed":"Could not delete {name}: {error}","ui.saveload.unknown_date":"unknown date","ui.saveload.draft.outdated":"Local copy from {date} (older than the server version)","ui.saveload.draft.outdated_tooltip":"Draft started from an older version: the plan has been saved since, elsewhere or on this device","ui.saveload.draft.unsent":"Local copy from {date} (unsent changes)","ui.saveload.draft.unsent_tooltip":"Draft stored on this device and not yet sent to the server","ui.saveload.draft.unreachable":"Local copy from {date} (server unreachable)","ui.saveload.draft.unreachable_tooltip":"The server list could not be read: this plan may exist there too","ui.saveload.draft.deleted":"Local copy from {date} (plan no longer on the server)","ui.saveload.draft.deleted_tooltip":"This plan was saved and then deleted from the server: open and save it to recreate it","ui.saveload.draft.local_only":"Local copy only (never saved to the server)","ui.saveload.draft.local_only_tooltip":"This plan only exists on this device: open it, then save it to send it to the server","ui.saveload.read_only":"Read-only: only a Home Assistant administrator can save plans.","ui.saveload.name_label":"Plan name:","ui.saveload.name_placeholder":"E.g. House ground floor, Summer garden…","ui.saveload.category_label":"Plan category (floor / area):","ui.saveload.custom_category":"Custom category","ui.saveload.custom_category_placeholder":"Specify the category (e.g. Attic, Terrace, Garage…)","ui.saveload.already_saved":"This plan is already saved (modified {date}): “Save plan” updates it, “Save as…” creates an independent copy without changing it.","ui.saveload.siblings":"The {category} category already contains {plans}: plans remain separate and none will be overwritten.","ui.saveload.contents_label":"Plan contents to save:","ui.saveload.noun.walls_one":"wall","ui.saveload.noun.walls_other":"walls","ui.saveload.noun.rooms_one":"room","ui.saveload.noun.rooms_other":"rooms","ui.saveload.noun.openings_one":"opening","ui.saveload.noun.openings_other":"openings","ui.saveload.noun.ha_entities_one":"HA entity","ui.saveload.noun.ha_entities_other":"HA entities","ui.saveload.noun.entities_one":"entity","ui.saveload.noun.entities_other":"entities","ui.saveload.noun.furniture_one":"furniture item","ui.saveload.noun.furniture_other":"furniture items","ui.saveload.quantity":"{count} {noun}","ui.saveload.modified":"Modified {date}","ui.saveload.open_badge":"(Open)","ui.saveload.load":"Load","ui.saveload.reload":"Reload","ui.saveload.load_tooltip":"Load this plan","ui.saveload.reload_tooltip":"Reload the saved version of this plan","ui.saveload.load_plan":"Load plan {name}","ui.saveload.reload_plan":"Reload plan {name}","ui.saveload.delete_tooltip":"Delete this plan","ui.saveload.delete_local_tooltip":"Delete this local copy","ui.saveload.delete_plan":"Delete plan {name}","ui.saveload.delete_local_plan":"Delete the local copy of {name}","ui.saveload.open_anyway":"Open anyway","ui.saveload.confirm_delete_server":"Permanently delete {name} from the server? This cannot be undone.","ui.saveload.confirm_delete_local_unreachable":"Delete the local copy of {name} from this device? The server list is unavailable, so the plan may still exist there: it will not be deleted from the server.","ui.saveload.confirm_delete_local":"Delete the local copy of {name}? This plan does not exist anywhere else.","ui.saveload.confirm_delete_open":"This plan is currently open in the editor.","ui.saveload.deleting":"Deleting…","ui.saveload.delete":"Delete","ui.saveload.search":"Search plans","ui.saveload.search_placeholder":"🔍 Search plans by name or category…","ui.saveload.refresh":"Refresh the list","ui.saveload.list_error":"Server plan list unavailable: {error}","ui.saveload.retry":"Retry","ui.saveload.loading":"Loading saved plans…","ui.saveload.no_match":"No plans match your search.","ui.saveload.no_plans":"No saved plans found.","ui.saveload.save_current":"Save the current plan","ui.saveload.results_one":"{count} plan shown","ui.saveload.results_other":"{count} plans shown","ui.saveload.list_label":"Saved plans"});const Gt=new Map;function Yo(r){const e=Ye();if(!Gt.has(e))try{Gt.set(e,new Intl.PluralRules(e==="fr"?"fr-FR":"en-US"))}catch{Gt.set(e,null)}const t=Gt.get(e);return t?t.select(r)==="one"?"one":"other":r===1||e==="fr"&&r===0?"one":"other"}function Lt(r,e,t={}){return o(`${r}_${Yo(e)}`,{...t,count:R(e)})}const Ko=["a[href]","button:not([disabled])",'input:not([disabled]):not([type="hidden"])',"select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(", ");function yt(){let r=document.activeElement;for(;r?.shadowRoot?.activeElement;)r=r.shadowRoot.activeElement;return r instanceof HTMLElement?r:null}function xi(r){return Array.from(r.querySelectorAll(Ko)).filter(e=>e.getClientRects().length>0&&!e.closest("[inert]"))}function Vt(r,e){let t=e;for(;t;){if(t===r)return!0;t=t.parentNode??(t instanceof ShadowRoot?t.host:null)}return!1}function Ci(r){const e=r.querySelector("[data-initial-focus]")??xi(r)[0];if(e){e.focus({preventScroll:!0}),e instanceof HTMLInputElement&&e.type==="text"&&e.select();return}r.hasAttribute("tabindex")||r.setAttribute("tabindex","-1"),r.focus({preventScroll:!0})}class Xo{constructor(e){this.host=e,this.open=[],this.onKeyDown=t=>{if(t.key!=="Tab"||t.defaultPrevented)return;const i=this.topLocalDialog();if(!i)return;const a=xi(i);if(a.length===0){t.preventDefault();return}const n=yt(),s=a[0],l=a[a.length-1];!n||!Vt(i,n)?(t.preventDefault(),s.focus()):t.shiftKey&&n===s?(t.preventDefault(),l.focus()):!t.shiftKey&&n===l&&(t.preventDefault(),s.focus())},this.onFocusIn=t=>{const i=this.topLocalDialog();if(!i)return;const a=t.composedPath()[0];a instanceof Node&&!Vt(i,a)&&Ci(i)},e.addController(this)}hostConnected(){this.host.addEventListener("keydown",this.onKeyDown),this.host.addEventListener("focusin",this.onFocusIn)}hostDisconnected(){this.host.removeEventListener("keydown",this.onKeyDown),this.host.removeEventListener("focusin",this.onFocusIn),this.open=[]}hostUpdated(){const e=this.host.shadowRoot;if(!e)return;const t=Array.from(e.querySelectorAll("[data-modal]")),i=this.open.filter(c=>!t.includes(c.el)),a=this.open.filter(c=>t.includes(c.el)),n=i.length>0?i[0].returnTo:null,s=[];for(const c of t){if(a.some(h=>h.el===c))continue;const d=yt(),p=d!==null&&d.isConnected&&d!==document.body&&!Vt(c,d);s.push({el:c,returnTo:p?d:n})}this.open=[...a,...s];const l=this.open[this.open.length-1];s.length>0&&l&&Ti(l.el)?Ci(l.el):i.length>0&&this.focusLost()&&(n?.isConnected&&(!l||Vt(l.el,n))?n.focus({preventScroll:!0}):l&&Ti(l.el)&&Ci(l.el))}topLocalDialog(){const e=this.open[this.open.length-1];return e&&e.el.isConnected&&Ti(e.el)?e.el:null}focusLost(){const e=yt();return!e||!e.isConnected||e===document.body||e===this.host}}function Ti(r){const e=r.getAttribute("role");return e==="dialog"||e==="alertdialog"}function Tn(r){return Array.from(r.querySelectorAll('[role^="menuitem"]:not([disabled])'))}function hi(r,e){const t=Tn(r);(e==="last"?t[t.length-1]:(e==="checked"?t.find(a=>a.getAttribute("aria-checked")==="true"):void 0)??t[0])?.focus()}function In(r,e,t){const i=Tn(e),a=i.indexOf(yt());let n;switch(r.key){case"ArrowDown":n=i[(a+1)%i.length];break;case"ArrowUp":n=i[a<0?i.length-1:(a-1+i.length)%i.length];break;case"Home":n=i[0];break;case"End":n=i[i.length-1];break;case"Escape":r.preventDefault(),t({restoreFocus:!0});return;case"Tab":t({restoreFocus:!0});return;default:return}r.preventDefault(),n?.focus()}var Zo=Object.defineProperty,_e=(r,e,t,i)=>{for(var a=void 0,n=r.length-1,s;n>=0;n--)(s=r[n])&&(a=s(e,t,a)||a);return a&&Zo(e,t,a),a};const We=Object.freeze({select:"v",wall:"w",door:"d",rescale:"s"}),Ii={size:.5,subdivisions:2,snapToGrid:!0,snapToAngles:!0,snapToElements:!0},ra="home_architect_toolbar_pos",$t={x:20,y:20},ne=8,Yt=10,Jo=300,Qo=120,es=10,ts=40,Ka="toolbar-flyout",Xa="toolbar-flyout-title",Za="toolbar-grid-hint";function Di(r,e){return Math.abs(r-e)<1e-6}function Ja(r,e,t){return Math.min(t,Math.max(e,r))}function Pt(r){return o("ui.unit.cm",{value:R(Number((r*100).toFixed(1)),{maximumFractionDigits:1})})}function Kt(r){return o("ui.unit.m",{value:R(r,{minimumFractionDigits:2,maximumFractionDigits:2})})}function Qa(r){return r<1?Pt(r):o("ui.unit.m",{value:R(r,{maximumFractionDigits:2})})}function is(){try{const r=localStorage.getItem(ra);if(!r)return null;const e=JSON.parse(r);if(typeof e=="object"&&e!==null){const{x:t,y:i}=e;if(typeof t=="number"&&typeof i=="number"&&Number.isFinite(t)&&Number.isFinite(i))return{x:t,y:i}}}catch{}return null}function Ei(r){try{r?localStorage.setItem(ra,JSON.stringify(r)):localStorage.removeItem(ra)}catch{}}const er=je`<polygon points="4,18 3,7 11,3 20,7 19,18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`,tr=je`<rect x="3.5" y="5.5" width="17" height="13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-dasharray="3 2"/>`,as=je`<path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18" fill="none" stroke="currentColor" stroke-width="1.5"/>`,rs=je`<path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,Sa=class Sa extends De{constructor(){super(...arguments),this.activeTool="wall",this.canUndo=!1,this.canRedo=!1,this.currentThickness=.2,this.doorFlipSide=!1,this.doorFlipDirection=!0,this.windowSashCount=1,this.grid=Ii,this.narrow=!1,this.readOnly=!1,this.isDragging=!1,this.activeSubmenu="none",this.i18n=new Ee(this),this.preferredPosition={...$t},this.position={...$t},this.dragStartPointer={x:0,y:0},this.dragStartPosition={...$t},this.resizeObserver=null,this.schemeObserver=null,this.lastRoomTool="room",this.focusMenuOnOpen=!1,this.handleWindowPointerDown=e=>{this.activeSubmenu!=="none"&&!e.composedPath().includes(this)&&(this.activeSubmenu="none")},this.handleLayoutChange=()=>{this.isDragging||(this.applyPosition(),this.activeSubmenu!=="none"&&this.positionFlyout())},this.handleHostKeyDown=e=>{if(e.defaultPrevented)return;if(e.key==="Escape"&&this.activeSubmenu!=="none"){e.preventDefault(),e.stopPropagation(),this.closeSubmenu({restoreFocus:!0});return}const t=e.composedPath()[0];if(!(t instanceof HTMLElement)||!t.classList.contains("tool-btn"))return;const i=t.dataset.submenu;if(e.key==="ArrowRight"&&i&&!t.hasAttribute("disabled")){e.preventDefault(),e.stopPropagation();const l=this.activeSubmenu===i?this.renderRoot.querySelector('[role="menu"]'):null;l?hi(l,"checked"):(this.focusMenuOnOpen=!0,this.activeSubmenu=i);return}const a=Array.from(this.renderRoot.querySelectorAll(".tools .tool-btn:not(:disabled)")),n=a.indexOf(t);if(n<0)return;let s;switch(e.key){case"ArrowDown":s=a[(n+1)%a.length];break;case"ArrowUp":s=a[(n-1+a.length)%a.length];break;case"Home":s=a[0];break;case"End":s=a[a.length-1];break;default:return}e.preventDefault(),e.stopPropagation(),s?.focus()}}connectedCallback(){super.connectedCallback(),this.preferredPosition=is()??{...$t},this.setHostPosition(this.preferredPosition),window.addEventListener("pointerdown",this.handleWindowPointerDown),this.addEventListener("keydown",this.handleHostKeyDown),this.followHostScheme();const e=this.getBoundsElement();typeof ResizeObserver<"u"&&e?(this.resizeObserver=new ResizeObserver(this.handleLayoutChange),this.resizeObserver.observe(e)):window.addEventListener("resize",this.handleLayoutChange)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("pointerdown",this.handleWindowPointerDown),window.removeEventListener("resize",this.handleLayoutChange),this.removeEventListener("keydown",this.handleHostKeyDown),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.schemeObserver?.disconnect(),this.schemeObserver=null}firstUpdated(){this.applyPosition()}willUpdate(e){e.has("readOnly")&&this.readOnly&&(this.activeSubmenu="none"),e.has("activeTool")&&(this.activeTool==="room"||this.activeTool==="rect_room")&&(this.lastRoomTool=this.activeTool),this.toggleAttribute("menu-open",this.activeSubmenu!=="none")}updated(e){if(super.updated(e),(e.has("narrow")||e.has("readOnly"))&&this.applyPosition(),e.has("activeSubmenu")&&this.activeSubmenu!=="none"&&(this.positionFlyout(),this.focusMenuOnOpen)){const t=this.renderRoot.querySelector('[role="menu"]');t&&hi(t,"checked")}this.focusMenuOnOpen=!1}followHostScheme(){const e=this.getRootNode(),t=e instanceof ShadowRoot?e.host:null;if(!t)return;const i=()=>{const a=t.getAttribute("scheme");a?this.setAttribute("scheme",a):this.removeAttribute("scheme")};i(),this.schemeObserver=new MutationObserver(i),this.schemeObserver.observe(t,{attributes:!0,attributeFilter:["scheme"]})}getBoundsElement(){if(this.parentElement)return this.parentElement;const e=this.getRootNode();return e instanceof ShadowRoot?e.host:null}getBoundsRect(){const e=this.getBoundsElement()?.getBoundingClientRect();return e&&e.width>0&&e.height>0?e:null}setHostPosition(e){this.position=e,this.style.left=`${e.x}px`,this.style.top=`${e.y}px`}clampPosition(e,t){const i=Math.max(ne,t.width-this.offsetWidth-ne),a=Math.max(ne,t.height-this.offsetHeight-ne);return{x:Math.round(Ja(e.x,ne,i)),y:Math.round(Ja(e.y,ne,a))}}applyPosition(){const e=this.getBoundsRect();if(!e){this.setHostPosition(this.preferredPosition);return}this.style.maxHeight=`${Math.max(Qo,e.height-2*ne)}px`,this.setHostPosition(this.clampPosition(this.preferredPosition,e))}moveTo(e){const t=this.getBoundsRect(),i=t?this.clampPosition(e,t):e;this.preferredPosition=i,this.setHostPosition(i)}handleDragStart(e){if(e.button!==0)return;e.preventDefault(),e.stopPropagation(),this.activeSubmenu="none",this.isDragging=!0,this.dragStartPointer={x:e.clientX,y:e.clientY},this.dragStartPosition={...this.position},e.currentTarget.setPointerCapture(e.pointerId)}handleDragMove(e){this.isDragging&&(e.preventDefault(),e.stopPropagation(),this.moveTo({x:this.dragStartPosition.x+e.clientX-this.dragStartPointer.x,y:this.dragStartPosition.y+e.clientY-this.dragStartPointer.y}))}handleDragEnd(e){if(this.isDragging){this.isDragging=!1;try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}Ei(this.preferredPosition)}}handleDragKeyDown(e){if(e.key==="Home"){e.preventDefault(),e.stopPropagation(),this.resetPosition();return}const t=e.shiftKey?ts:es,a={ArrowLeft:{x:-t,y:0},ArrowRight:{x:t,y:0},ArrowUp:{x:0,y:-t},ArrowDown:{x:0,y:t}}[e.key];a&&(e.preventDefault(),e.stopPropagation(),this.activeSubmenu="none",this.moveTo({x:this.position.x+a.x,y:this.position.y+a.y}),Ei(this.preferredPosition))}resetPosition(){this.preferredPosition={...$t},Ei(null),this.applyPosition()}positionFlyout(){const e=this.renderRoot.querySelector(".flyout-menu"),t=this.renderRoot.querySelector(`[data-submenu="${this.activeSubmenu}"]`);if(!e||!t)return;const i=this.getBoundingClientRect(),a=t.getBoundingClientRect(),n=this.getBoundsRect()??new DOMRect(0,0,window.innerWidth,window.innerHeight),s=Math.max(160,Math.min(Jo,n.width-2*ne));e.style.width=`${s}px`;const l=n.right-ne-(i.right+Yt),c=i.left-Yt-(n.left+ne);let d;l>=s?d=i.width+Yt:c>=s?d=-Yt-s:d=(l>=c?n.right-ne-s:n.left+ne)-i.left,e.style.left=`${Math.round(d)}px`;const p=Math.max(120,n.height-2*ne);e.style.maxHeight=`${p}px`;const h=Math.min(e.offsetHeight,p);let m=a.top-6;m=Math.min(m,n.bottom-ne-h),m=Math.max(m,n.top+ne),e.style.top=`${Math.round(m-i.top)}px`}selectTool(e){this.dispatchEvent(new CustomEvent("tool-selected",{detail:{tool:e},bubbles:!0,composed:!0}))}closeSubmenu({restoreFocus:e}={restoreFocus:!1}){const t=this.activeSubmenu;if(t==="none")return;const i=this.shadowRoot?.activeElement;e&&i instanceof HTMLElement&&i.closest(".flyout-menu")&&this.renderRoot.querySelector(`[data-submenu="${t}"]`)?.focus(),this.activeSubmenu="none"}toggleSubmenu(e,t){if(t.stopPropagation(),this.activeSubmenu===e){this.activeSubmenu="none";return}this.focusMenuOnOpen=t.detail===0,this.activeSubmenu=e}selectDoorOption(e,t){this.dispatchEvent(new CustomEvent("door-config-changed",{detail:{flipSide:e,flipDirection:t},bubbles:!0,composed:!0})),this.selectTool("door"),this.closeSubmenu({restoreFocus:!0})}selectWindowOption(e,t,i){this.dispatchEvent(new CustomEvent("window-config-changed",{detail:{type:e,sashCount:t,width:i},bubbles:!0,composed:!0})),this.selectTool(e),this.closeSubmenu({restoreFocus:!0})}selectWallThickness(e){this.dispatchEvent(new CustomEvent("wall-thickness-changed",{detail:{thickness:e},bubbles:!0,composed:!0})),this.selectTool("wall"),this.closeSubmenu({restoreFocus:!0})}selectRoomTool(e){this.selectTool(e),this.closeSubmenu({restoreFocus:!0})}changeGrid(e){this.dispatchEvent(new CustomEvent("grid-config-changed",{detail:{grid:e},bubbles:!0,composed:!0}))}openWizard(){this.dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,composed:!0}))}openImportModal(){this.dispatchEvent(new CustomEvent("open-import-modal",{bubbles:!0,composed:!0}))}withShortcut(e,t){const i=We[t];return i?`${e} (${i.toUpperCase()})`:e}handleMenuKeyDown(e){e.key==="Escape"&&e.stopPropagation(),In(e,e.currentTarget,t=>this.closeSubmenu(t))}renderTool(e){const t=e.submenu!==void 0&&this.activeSubmenu===e.submenu,i=["tool-btn",e.className??"",e.pressed?"active":"",t?"menu-open":""].filter(Boolean).join(" ");return u`
      <button
        type="button"
        class=${i}
        data-submenu=${e.submenu??w}
        ?disabled=${e.disabled??!1}
        aria-label=${e.label}
        aria-pressed=${e.pressed===void 0?w:String(e.pressed)}
        aria-haspopup=${e.submenu?"menu":w}
        aria-expanded=${e.submenu?String(t):w}
        aria-controls=${t?Ka:w}
        aria-keyshortcuts=${e.shortcut?e.shortcut.toUpperCase():w}
        title=${e.title}
        @click=${e.onClick}
      >
        ${typeof e.icon=="string"?u`<span aria-hidden="true">${e.icon}</span>`:e.icon}
        ${e.submenu?u`<span class="submenu-indicator" aria-hidden="true">▾</span>`:w}
      </button>
    `}renderFlyoutShell(e,t,i,a,n){return u`
      <div class="flyout-menu" id=${Ka} @pointerdown=${s=>s.stopPropagation()}>
        <div class="flyout-header">
          <span class="flyout-title">
            <span aria-hidden="true">${e}</span>
            <span id=${Xa}>${t}</span>
          </span>
          <button
            type="button"
            class="flyout-close-btn"
            title=${o("ui.common.close")}
            aria-label=${o("ui.common.close")}
            @click=${()=>this.closeSubmenu({restoreFocus:!0})}
          ><span aria-hidden="true">✕</span></button>
        </div>
        <div
          class="flyout-items"
          role="menu"
          aria-labelledby=${Xa}
          aria-describedby=${a??w}
          @keydown=${this.handleMenuKeyDown}
        >
          ${i}
        </div>
        ${n??w}
      </div>
    `}renderRadioItem(e){const t=e.badge??(e.checked?o("ui.toolbar.active_badge"):void 0);return u`
      <button
        type="button"
        class="flyout-item ${e.checked?"active":""}"
        role="menuitemradio"
        aria-checked=${e.checked?"true":"false"}
        @click=${e.onSelect}
      >
        <div class="flyout-item-icon" aria-hidden="true">${e.icon}</div>
        <div class="flyout-item-content">
          <div class="flyout-item-label">${e.label}</div>
          <div class="flyout-item-sub">${e.sub}</div>
        </div>
        ${t?u`<span class="flyout-item-badge" aria-hidden="true">${t}</span>`:w}
      </button>
    `}doorIcon(e,t){const i=e?8:-8,a=t?10:-10;return u`
      <svg width="24" height="24" viewBox="-12 -12 24 24">
        <line class="ico-wall" x1="-10" y1="0" x2="10" y2="0" stroke-width="2.5"/>
        <circle class="ico-hinge" cx=${i} cy="0" r="1.5"/>
        <line class="ico-leaf" x1=${i} y1="0" x2=${i} y2=${a} stroke-width="2"/>
        <path class="ico-leaf" d="M ${e?-2:2} 0 A 10 10 0 0 ${e===t?0:1} ${i} ${a}" fill="none" stroke-width="1.2" stroke-dasharray="2,2"/>
      </svg>
    `}renderDoorItems(){return u`${[{flipSide:!1,flipDirection:!0,key:"right_in"},{flipSide:!1,flipDirection:!1,key:"left_in"},{flipSide:!0,flipDirection:!1,key:"left_out"},{flipSide:!0,flipDirection:!0,key:"right_out"}].map(t=>this.renderRadioItem({checked:this.doorFlipSide===t.flipSide&&this.doorFlipDirection===t.flipDirection,icon:this.doorIcon(t.flipDirection,!t.flipSide),label:o(`ui.toolbar.door.${t.key}`),sub:o(`ui.toolbar.door.${t.key}_sub`),onSelect:()=>this.selectDoorOption(t.flipSide,t.flipDirection)}))}`}renderWindowItems(){return u`
      ${this.renderRadioItem({checked:this.activeTool==="window"&&this.windowSashCount!==2,icon:u`
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <rect class="ico-frame" x="-9" y="-6" width="18" height="12" fill="none" stroke-width="1.8"/>
            <line class="ico-leaf" x1="-9" y1="0" x2="9" y2="0" stroke-width="1.5"/>
          </svg>`,label:o("ui.toolbar.window.single"),sub:o("ui.toolbar.window.single_sub",{width:Pt(.9)}),badge:Pt(.9),onSelect:()=>this.selectWindowOption("window",1,.9)})}
      ${this.renderRadioItem({checked:this.activeTool==="window"&&this.windowSashCount===2,icon:u`
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <rect class="ico-frame" x="-10" y="-6" width="20" height="12" fill="none" stroke-width="1.8"/>
            <line class="ico-leaf" x1="-10" y1="0" x2="10" y2="0" stroke-width="1.5"/>
            <line class="ico-leaf" x1="0" y1="-6" x2="0" y2="6" stroke-width="2"/>
          </svg>`,label:o("ui.toolbar.window.double"),sub:o("ui.toolbar.window.double_sub",{width:Kt(1.4)}),badge:Kt(1.4),onSelect:()=>this.selectWindowOption("window",2,1.4)})}
      ${this.renderRadioItem({checked:this.activeTool==="french_window",icon:u`
          <svg width="24" height="24" viewBox="-12 -12 24 24">
            <rect class="ico-frame" x="-10" y="-6" width="20" height="12" fill="none" stroke-width="1.8"/>
            <rect class="ico-fill" x="-10" y="-3" width="10" height="2"/>
            <rect class="ico-fill" x="0" y="2" width="10" height="2"/>
          </svg>`,label:o("ui.toolbar.window.sliding"),sub:o("ui.toolbar.window.sliding_sub",{width:Kt(2)}),badge:Kt(2),onSelect:()=>this.selectWindowOption("french_window",2,2)})}
    `}renderWallItems(){const e=[{thickness:.1,key:"thin",icon:u`<svg width="24" height="24" viewBox="-12 -12 24 24"><rect class="ico-fill-muted" x="-10" y="-2" width="20" height="4" rx="1"/></svg>`},{thickness:.2,key:"medium",icon:u`<svg width="24" height="24" viewBox="-12 -12 24 24"><rect class="ico-fill" x="-10" y="-4" width="20" height="8" rx="1"/></svg>`},{thickness:.3,key:"thick",icon:u`<svg width="24" height="24" viewBox="-12 -12 24 24"><rect class="ico-fill-strong" x="-10" y="-6" width="20" height="12" stroke-width="1" rx="1"/></svg>`}];return u`${e.map(t=>this.renderRadioItem({checked:Di(this.currentThickness,t.thickness),icon:t.icon,label:o(`ui.toolbar.wall.${t.key}`),sub:o(`ui.toolbar.wall.${t.key}_sub`,{thickness:Pt(t.thickness)}),badge:Pt(t.thickness),onSelect:()=>this.selectWallThickness(t.thickness)}))}`}renderRoomItems(){return u`
      ${this.renderRadioItem({checked:this.activeTool==="room",icon:u`<svg width="24" height="24" viewBox="0 0 24 24">${er}</svg>`,label:o("ui.toolbar.room.polygon"),sub:o("ui.toolbar.room.polygon_sub"),onSelect:()=>this.selectRoomTool("room")})}
      ${this.renderRadioItem({checked:this.activeTool==="rect_room",icon:u`<svg width="24" height="24" viewBox="0 0 24 24">${tr}</svg>`,label:o("ui.toolbar.room.rect"),sub:o("ui.toolbar.room.rect_sub"),onSelect:()=>this.selectRoomTool("rect_room")})}
    `}renderGridItems(){const e=this.grid??Ii,t=["snapToGrid","snapToAngles","snapToElements"];return u`
      <div class="flyout-group" role="group" aria-labelledby="grid-size-label">
        <div class="flyout-section-label" id="grid-size-label">${o("ui.toolbar.grid.size")}</div>
        <div class="grid-sizes">
          ${lo.map(i=>u`
            <button
              type="button"
              class="grid-size-btn ${Di(e.size,i)?"active":""}"
              role="menuitemradio"
              aria-checked=${Di(e.size,i)?"true":"false"}
              @click=${()=>this.changeGrid({size:i})}
            >${Qa(i)}</button>
          `)}
        </div>
      </div>

      <div class="flyout-group" role="group" aria-labelledby="grid-snap-label">
        <div class="flyout-section-label" id="grid-snap-label">${o("ui.toolbar.grid.snapping")}</div>
        ${t.map(i=>u`
          <button
            type="button"
            class="flyout-toggle"
            role="menuitemcheckbox"
            aria-checked=${e[i]?"true":"false"}
            @click=${()=>this.changeGrid({[i]:!e[i]})}
          >
            <span class="check-box" aria-hidden="true"><svg viewBox="0 0 16 16">${rs}</svg></span>
            <div class="flyout-item-content">
              <div class="flyout-item-label">${o(`ui.toolbar.grid.${i}`)}</div>
              <div class="flyout-item-sub">${o(`ui.toolbar.grid.${i}_sub`)}</div>
            </div>
          </button>
        `)}
      </div>
    `}renderFlyout(){switch(this.activeSubmenu){case"door":return this.renderFlyoutShell("🚪",o("ui.toolbar.door.title"),this.renderDoorItems());case"window":return this.renderFlyoutShell("🪟",o("ui.toolbar.window.title"),this.renderWindowItems());case"wall":return this.renderFlyoutShell("🧱",o("ui.toolbar.wall.title"),this.renderWallItems());case"room":return this.renderFlyoutShell("⬠",o("ui.toolbar.room.title"),this.renderRoomItems());case"grid":return this.renderFlyoutShell("▦",o("ui.toolbar.grid.title"),this.renderGridItems(),Za,u`<div class="flyout-hint" id=${Za}>${o("ui.toolbar.grid.hint")}</div>`);default:return w}}render(){const e=this.readOnly,t=this.grid??Ii,i=this.activeTool==="room"||this.activeTool==="rect_room",a=o("ui.toolbar.grid_tooltip",{size:Qa(t.size),state:o(t.snapToGrid?"ui.toolbar.snap_on":"ui.toolbar.snap_off")});return u`
      <!-- Poignée de déplacement de la boîte à outils (souris, toucher ou flèches du clavier) -->
      <button
        type="button"
        class="drag-handle ${this.isDragging?"dragging":""}"
        @pointerdown=${this.handleDragStart}
        @pointermove=${this.handleDragMove}
        @pointerup=${this.handleDragEnd}
        @pointercancel=${this.handleDragEnd}
        @dblclick=${this.resetPosition}
        @keydown=${this.handleDragKeyDown}
        title=${o("ui.toolbar.drag")}
        aria-label=${o("ui.toolbar.drag_label")}
      >
        <span class="grip-dots" aria-hidden="true">•••</span>
      </button>

      ${e?u`
        <div
          class="read-only-badge"
          role="img"
          aria-label=${o("ui.toolbar.read_only")}
          title=${o("ui.toolbar.read_only")}
        >🔒</div>
      `:w}

      <div class="tools" role="toolbar" aria-orientation="vertical" aria-label=${o("ui.toolbar.label")}>
        <!-- Assistant Débutant -->
        ${this.renderTool({icon:"🪄",className:"highlight",label:o("ui.toolbar.wizard"),title:o("ui.toolbar.wizard_tooltip"),disabled:e,onClick:()=>{this.activeSubmenu="none",this.openWizard()}})}

        <div class="divider" role="separator"></div>

        <!-- Annuler & Rétablir -->
        ${this.renderTool({icon:"↩️",label:o("ui.toolbar.undo"),title:o("ui.toolbar.undo_tooltip"),disabled:e||!this.canUndo,onClick:()=>this.dispatchEvent(new CustomEvent("undo",{bubbles:!0,composed:!0}))})}
        ${this.renderTool({icon:"↪️",label:o("ui.toolbar.redo"),title:o("ui.toolbar.redo_tooltip"),disabled:e||!this.canRedo,onClick:()=>this.dispatchEvent(new CustomEvent("redo",{bubbles:!0,composed:!0}))})}

        <div class="divider" role="separator"></div>

        <!-- Outil Sélection / Pan -->
        ${this.renderTool({icon:"👆",label:o("ui.toolbar.select"),title:this.withShortcut(o("ui.toolbar.select"),"select"),pressed:this.activeTool==="select",shortcut:We.select,onClick:()=>{this.activeSubmenu="none",this.selectTool("select")}})}

        <!-- Outil Mur -->
        ${this.renderTool({icon:"🧱",label:o("ui.toolbar.wall"),title:this.withShortcut(o("ui.toolbar.wall"),"wall")+o("ui.toolbar.wall_tooltip_suffix"),pressed:this.activeTool==="wall",submenu:"wall",shortcut:We.wall,disabled:e,onClick:n=>{this.selectTool("wall"),this.toggleSubmenu("wall",n)}})}

        <!-- Outil Pièce (polygone ou rectangle) -->
        ${this.renderTool({icon:u`<svg viewBox="0 0 24 24" aria-hidden="true">${this.lastRoomTool==="rect_room"?tr:er}</svg>`,label:o("ui.toolbar.room"),title:o("ui.toolbar.room_tooltip"),pressed:i,submenu:"room",disabled:e,onClick:n=>{this.selectTool(this.lastRoomTool),this.toggleSubmenu("room",n)}})}

        <div class="divider" role="separator"></div>

        <!-- Outil Porte -->
        ${this.renderTool({icon:"🚪",label:o("ui.toolbar.door"),title:this.withShortcut(o("ui.toolbar.door"),"door")+o("ui.toolbar.door_tooltip_suffix"),pressed:this.activeTool==="door",submenu:"door",shortcut:We.door,disabled:e,onClick:n=>{this.selectTool("door"),this.toggleSubmenu("door",n)}})}

        <!-- Outil Fenêtre -->
        ${this.renderTool({icon:"🪟",label:o("ui.toolbar.window"),title:this.withShortcut(o("ui.toolbar.window"),"window")+o("ui.toolbar.window_tooltip_suffix"),pressed:this.activeTool==="window",submenu:"window",shortcut:We.window,disabled:e,onClick:n=>{this.selectTool("window"),this.toggleSubmenu("window",n)}})}

        <!-- Outil Baie vitrée / Porte-fenêtre -->
        ${this.renderTool({icon:"🪞",label:o("ui.toolbar.french_window"),title:this.withShortcut(o("ui.toolbar.french_window"),"french_window"),pressed:this.activeTool==="french_window",shortcut:We.french_window,disabled:e,onClick:()=>{this.activeSubmenu="none",this.selectTool("french_window")}})}

        <div class="divider" role="separator"></div>

        <!-- Import de plan de fond & vectorisation -->
        ${this.renderTool({icon:"🖼️",label:o("ui.toolbar.import"),title:o("ui.toolbar.import_tooltip"),disabled:e,onClick:()=>{this.activeSubmenu="none",this.openImportModal()}})}

        <!-- Étalonnage d'échelle (calque image) -->
        ${this.renderTool({icon:"📏",label:o("ui.toolbar.calibrate"),title:this.withShortcut(o("ui.toolbar.calibrate_tooltip"),"calibrate"),pressed:this.activeTool==="calibrate",shortcut:We.calibrate,disabled:e,onClick:()=>{this.activeSubmenu="none",this.selectTool("calibrate")}})}

        <!-- Mettre à l'échelle le plan (Recalculer toutes les cotes) -->
        ${this.renderTool({icon:"📐",label:o("ui.toolbar.rescale"),title:this.withShortcut(o("ui.toolbar.rescale_tooltip"),"rescale"),pressed:this.activeTool==="rescale",shortcut:We.rescale,disabled:e,onClick:()=>{this.activeSubmenu="none",this.selectTool("rescale")}})}

        <div class="divider" role="separator"></div>

        <!-- Grille et accrochages -->
        ${this.renderTool({icon:u`<svg viewBox="0 0 24 24" aria-hidden="true" style="opacity: ${t.snapToGrid?1:.45}">${as}</svg>`,label:o("ui.toolbar.grid.title"),title:a,submenu:"grid",disabled:e,onClick:n=>this.toggleSubmenu("grid",n)})}
      </div>

      <!-- ============================================== -->
      <!-- SOUS-MENU FLYOUT                               -->
      <!-- ============================================== -->
      ${this.renderFlyout()}
    `}};Sa.styles=[ze,he`
    :host {
      /* Couleurs dérivées des jetons du thème (src/styles/theme.styles.ts) */
      --tb-bg: color-mix(in srgb, var(--arch-ui-surface) 95%, transparent);
      --tb-flyout-bg: color-mix(in srgb, var(--arch-ui-surface) 97%, transparent);
      --tb-item-bg: color-mix(in srgb, var(--arch-ui-surface-2) 55%, transparent);
      --tb-hover-bg: color-mix(in srgb, var(--arch-ui-accent) 14%, transparent);
      --tb-selected-bg: color-mix(in srgb, var(--arch-ui-accent) 22%, transparent);
      --tb-accent-ink: color-mix(in srgb, var(--arch-ui-accent) 55%, var(--arch-ui-text));
      /* Texte secondaire posé sur les éléments de sous-menu (fond plus foncé que la surface) : renforcé (4,5:1). */
      --tb-muted-ink: color-mix(in srgb, var(--arch-ui-text-muted) 75%, var(--arch-ui-text));

      position: absolute;
      left: 20px;
      top: 20px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      box-sizing: border-box;
      max-height: calc(100% - 16px);
      background: var(--tb-bg);
      backdrop-filter: blur(16px);
      border: 1px solid var(--arch-ui-border);
      border-radius: 14px;
      padding: 6px 6px 8px 6px;
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35);
      z-index: 40;
      user-select: none;
      touch-action: none;
      color: var(--arch-ui-text);
      font-family: var(--arch-ui-font);
    }

    /* Sous-menu ouvert : la barre passe au-dessus des HUD du canevas (z-index 50) pour ne pas être masquée. */
    :host([menu-open]) {
      z-index: 65;
    }

    .drag-handle {
      height: 18px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
      color: var(--arch-ui-text-muted);
      background: transparent;
      border: none;
      padding: 0;
      font: inherit;
      border-radius: 6px;
      transition: all 0.2s ease;
      margin-bottom: 2px;
      touch-action: none;
    }

    .drag-handle:hover, .drag-handle.dragging {
      color: var(--tb-accent-ink);
      background: var(--tb-hover-bg);
    }

    .drag-handle.dragging {
      cursor: grabbing;
    }

    /* Outils : défilent verticalement quand la zone de dessin est trop basse (portable, mobile). */
    .tools {
      display: flex;
      flex-direction: column;
      gap: 5px;
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
      overscroll-behavior: contain;
      scrollbar-width: thin;
      /* Marge intérieure : le contour de focus (2 px, décalé de 2 px) n'est pas rogné par le défilement. */
      padding: 2px 4px;
      margin: -2px -4px;
    }

    .read-only-badge {
      text-align: center;
      font-size: 14px;
      line-height: 1;
      padding: 2px 0 4px 0;
      cursor: help;
    }

    .grip-dots {
      font-size: 11px;
      letter-spacing: 3px;
      font-weight: 900;
      line-height: 1;
    }

    .tool-btn {
      background: transparent;
      color: var(--arch-ui-text-muted);
      border: 1px solid transparent;
      border-radius: 10px;
      width: 42px;
      height: 42px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font: inherit;
      font-size: 19px;
      transition: all 0.2s ease;
      position: relative;
      flex-shrink: 0;
    }

    .tool-btn:hover:not(:disabled) {
      background: var(--arch-ui-surface-2);
      color: var(--arch-ui-text);
      transform: scale(1.05);
    }

    .tool-btn.active {
      background: var(--arch-ui-accent);
      color: var(--arch-ui-accent-text);
      border-color: var(--arch-ui-accent);
      box-shadow: 0 0 12px color-mix(in srgb, var(--arch-ui-accent) 40%, transparent);
    }

    .tool-btn.active:hover:not(:disabled) {
      background: var(--arch-ui-accent);
      color: var(--arch-ui-accent-text);
    }

    .tool-btn.menu-open {
      border-color: var(--arch-ui-accent);
      box-shadow: 0 0 14px color-mix(in srgb, var(--arch-ui-accent) 50%, transparent);
    }

    .tool-btn.menu-open:not(.active) {
      background: var(--tb-selected-bg);
    }

    .submenu-indicator {
      position: absolute;
      bottom: 2px;
      right: 3px;
      font-size: 8px;
      line-height: 1;
      opacity: 0.7;
    }

    .tool-btn.highlight {
      background: color-mix(in srgb, var(--arch-ui-warning) 15%, transparent);
      border-color: color-mix(in srgb, var(--arch-ui-warning) 45%, transparent);
      color: var(--arch-ui-warning);
    }

    .tool-btn.highlight:hover:not(:disabled) {
      background: color-mix(in srgb, var(--arch-ui-warning) 35%, transparent);
      color: var(--arch-ui-text);
    }

    .tool-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
      transform: none !important;
    }

    .tool-btn svg {
      width: 22px;
      height: 22px;
      display: block;
    }

    .divider {
      height: 1px;
      flex-shrink: 0;
      background: var(--arch-ui-border);
      margin: 3px 2px;
    }

    /* Sous-menu Flyout (position calculée par positionFlyout selon la place disponible) */
    .flyout-menu {
      position: absolute;
      top: 0;
      left: calc(100% + 10px);
      box-sizing: border-box;
      overflow-y: auto;
      overscroll-behavior: contain;
      background: var(--tb-flyout-bg);
      backdrop-filter: blur(20px);
      border: 1.5px solid color-mix(in srgb, var(--arch-ui-accent) 45%, transparent);
      border-radius: 14px;
      padding: 10px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
      z-index: 60;
      width: 300px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      animation: flyoutIn 0.18s ease-out;
      user-select: none;
    }

    .flyout-items {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    @keyframes flyoutIn {
      from { opacity: 0; transform: translateX(-8px) scale(0.97); }
      to { opacity: 1; transform: translateX(0) scale(1); }
    }

    .flyout-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2px 4px 6px 4px;
      border-bottom: 1px solid var(--arch-ui-border);
      margin-bottom: 2px;
    }

    .flyout-title {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--tb-accent-ink);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .flyout-close-btn {
      background: transparent;
      border: none;
      color: var(--arch-ui-text-muted);
      cursor: pointer;
      font-size: 14px;
      padding: 2px 5px;
      border-radius: 4px;
      line-height: 1;
    }

    .flyout-close-btn:hover {
      color: var(--arch-ui-text);
      background: var(--arch-ui-surface-2);
    }

    .flyout-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 10px;
      border: 1px solid var(--arch-ui-border);
      background: var(--tb-item-bg);
      color: var(--arch-ui-text);
      cursor: pointer;
      transition: all 0.15s ease;
      text-align: left;
      width: 100%;
      font: inherit;
      flex-shrink: 0;
    }

    .flyout-item:hover {
      background: var(--tb-hover-bg);
      border-color: color-mix(in srgb, var(--arch-ui-accent) 50%, transparent);
      transform: translateX(2px);
    }

    .flyout-item.active {
      background: var(--tb-selected-bg);
      border-color: var(--arch-ui-accent);
      box-shadow: 0 0 12px color-mix(in srgb, var(--arch-ui-accent) 30%, transparent);
    }

    .flyout-item-icon {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      color: var(--arch-ui-accent);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 16px;
    }

    /* Pictogrammes des sous-menus (couleurs du thème) */
    .ico-wall { stroke: var(--arch-ui-text-muted); }
    .ico-frame { stroke: var(--arch-ui-text-muted); }
    .ico-leaf { stroke: var(--arch-ui-accent); }
    .ico-hinge { fill: var(--arch-ui-warning); }
    .ico-fill { fill: var(--arch-ui-accent); }
    .ico-fill-muted { fill: var(--arch-ui-text-muted); }
    .ico-fill-strong { fill: color-mix(in srgb, var(--arch-ui-accent) 75%, black); stroke: var(--arch-ui-accent); }

    .flyout-item-content {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
    }

    .flyout-item-label {
      font-size: 0.84rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      line-height: 1.25;
    }

    .flyout-item-sub {
      font-size: 0.72rem;
      color: var(--tb-muted-ink);
      margin-top: 2px;
      line-height: 1.25;
    }

    .flyout-section-label {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--arch-ui-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.4px;
      padding: 4px 4px 0 4px;
    }

    .flyout-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .grid-sizes {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(48px, 1fr));
      gap: 5px;
    }

    .grid-size-btn {
      background: var(--tb-item-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 8px;
      color: var(--arch-ui-text);
      font: inherit;
      font-size: 0.76rem;
      font-weight: 700;
      padding: 7px 2px;
      cursor: pointer;
      white-space: nowrap;
    }

    .grid-size-btn:hover {
      border-color: color-mix(in srgb, var(--arch-ui-accent) 50%, transparent);
      background: var(--tb-hover-bg);
    }

    .grid-size-btn.active {
      background: var(--tb-selected-bg);
      border-color: var(--arch-ui-accent);
    }

    .flyout-toggle {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 7px 10px;
      border-radius: 10px;
      border: 1px solid var(--arch-ui-border);
      background: var(--tb-item-bg);
      color: var(--arch-ui-text);
      cursor: pointer;
      flex-shrink: 0;
      width: 100%;
      font: inherit;
      text-align: left;
    }

    .flyout-toggle:hover {
      background: var(--tb-hover-bg);
    }

    /* Case à cocher dessinée (l'état est porté par aria-checked du menuitemcheckbox) */
    .check-box {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      box-sizing: border-box;
      border: 1.5px solid var(--arch-ui-text-muted);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: transparent;
      background: var(--arch-ui-surface);
    }

    .check-box svg {
      width: 12px;
      height: 12px;
      display: block;
    }

    .flyout-toggle[aria-checked='true'] .check-box {
      background: var(--arch-ui-accent);
      border-color: var(--arch-ui-accent);
      color: var(--arch-ui-accent-text);
    }

    .flyout-hint {
      font-size: 0.7rem;
      color: var(--arch-ui-text-muted);
      padding: 0 4px;
      line-height: 1.3;
    }

    /* Mode étroit (mobile) : barre plus compacte */
    :host([narrow]) {
      padding: 4px 4px 6px 4px;
      gap: 3px;
    }

    :host([narrow]) .tools {
      gap: 3px;
    }

    :host([narrow]) .tool-btn {
      width: 36px;
      height: 36px;
      font-size: 17px;
    }

    :host([narrow]) .tool-btn svg {
      width: 19px;
      height: 19px;
    }

    /* Focus clavier visible même sur les éléments qui portent déjà une ombre (outil actif, choix courant). */
    .tool-btn:focus-visible,
    .flyout-item:focus-visible,
    .grid-size-btn:focus-visible,
    .flyout-toggle:focus-visible,
    .drag-handle:focus-visible {
      outline: 2px solid var(--arch-ui-accent);
      outline-offset: 2px;
    }

    .flyout-item-badge {
      font-size: 0.72rem;
      font-weight: 700;
      font-family: ui-monospace, SFMono-Regular, monospace;
      padding: 3px 8px;
      border-radius: 6px;
      background: var(--arch-ui-bg);
      border: 1px solid color-mix(in srgb, var(--arch-ui-accent) 35%, transparent);
      color: var(--tb-accent-ink);
      flex-shrink: 0;
    }
  `];let se=Sa;_e([L({type:String})],se.prototype,"activeTool");_e([L({type:Boolean})],se.prototype,"canUndo");_e([L({type:Boolean})],se.prototype,"canRedo");_e([L({type:Number})],se.prototype,"currentThickness");_e([L({type:Boolean})],se.prototype,"doorFlipSide");_e([L({type:Boolean})],se.prototype,"doorFlipDirection");_e([L({type:Number})],se.prototype,"windowSashCount");_e([L({attribute:!1})],se.prototype,"grid");_e([L({type:Boolean,reflect:!0})],se.prototype,"narrow");_e([L({type:Boolean,attribute:"read-only",reflect:!0})],se.prototype,"readOnly");_e([k()],se.prototype,"isDragging");_e([k()],se.prototype,"activeSubmenu");Ae("home-architect-toolbar",se);const{I:ns}=co,ir=r=>r,os=r=>r.strings===void 0,ar=()=>document.createComment(""),St=(r,e,t)=>{const i=r._$AA.parentNode,a=e===void 0?r._$AB:e._$AA;if(t===void 0){const n=i.insertBefore(ar(),a),s=i.insertBefore(ar(),a);t=new ns(n,s,r,r.options)}else{const n=t._$AB.nextSibling,s=t._$AM,l=s!==r;if(l){let c;t._$AQ?.(r),t._$AM=r,t._$AP!==void 0&&(c=r._$AU)!==s._$AU&&t._$AP(c)}if(n!==a||l){let c=t._$AA;for(;c!==n;){const d=ir(c).nextSibling;ir(i).insertBefore(c,a),c=d}}}return t},at=(r,e,t=r)=>(r._$AI(e,t),r),ss={},Dn=(r,e=ss)=>r._$AH=e,ls=r=>r._$AH,zi=r=>{r._$AR(),r._$AA.remove()};const rr=(r,e,t)=>{const i=new Map;for(let a=e;a<=t;a++)i.set(r[a],a);return i},cs=wn(class extends _n{constructor(r){if(super(r),r.type!==st.CHILD)throw Error("repeat() can only be used in text expressions")}dt(r,e,t){let i;t===void 0?t=e:e!==void 0&&(i=e);const a=[],n=[];let s=0;for(const l of r)a[s]=i?i(l,s):s,n[s]=t(l,s),s++;return{values:n,keys:a}}render(r,e,t){return this.dt(r,e,t).values}update(r,[e,t,i]){const a=ls(r),{values:n,keys:s}=this.dt(e,t,i);if(!Array.isArray(a))return this.ut=s,n;const l=this.ut??=[],c=[];let d,p,h=0,m=a.length-1,g=0,v=n.length-1;for(;h<=m&&g<=v;)if(a[h]===null)h++;else if(a[m]===null)m--;else if(l[h]===s[g])c[g]=at(a[h],n[g]),h++,g++;else if(l[m]===s[v])c[v]=at(a[m],n[v]),m--,v--;else if(l[h]===s[v])c[v]=at(a[h],n[v]),St(r,c[v+1],a[h]),h++,v--;else if(l[m]===s[g])c[g]=at(a[m],n[g]),St(r,a[h],a[m]),m--,g++;else if(d===void 0&&(d=rr(s,g,v),p=rr(l,h,m)),d.has(l[h]))if(d.has(l[m])){const y=p.get(s[g]),_=y!==void 0?a[y]:null;if(_===null){const $=St(r,a[h]);at($,n[g]),c[g]=$}else c[g]=at(_,n[g]),St(r,a[h],_),a[y]=null;g++}else zi(a[m]),m--;else zi(a[h]),h++;for(;g<=v;){const y=St(r,c[v+1]);at(y,n[g]),c[g++]=y}for(;h<=m;){const y=a[h++];y!==null&&zi(y)}return this.ut=s,Dn(r,c),At}});const gt=wn(class extends _n{constructor(r){if(super(r),r.type!==st.PROPERTY&&r.type!==st.ATTRIBUTE&&r.type!==st.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!os(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(r,[e]){if(e===At||e===w)return e;const t=r.element,i=r.name;if(r.type===st.PROPERTY){if(e===t[i])return At}else if(r.type===st.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(i))return At}else if(r.type===st.ATTRIBUTE&&t.getAttribute(i)===e+"")return At;return Dn(r),e}});var ds=Object.defineProperty,Fe=(r,e,t,i)=>{for(var a=void 0,n=r.length-1,s;n>=0;n--)(s=r[n])&&(a=s(e,t,a)||a);return a&&ds(e,t,a),a};const nr=[{id:"all",domains:[]},{id:"lights",domains:["light"]},{id:"switches",domains:["switch","input_boolean"]},{id:"sensors",domains:["sensor","binary_sensor"]},{id:"climate",domains:["climate","water_heater","humidifier"]},{id:"covers",domains:["cover","valve"]},{id:"fans",domains:["fan"]},{id:"media",domains:["media_player","remote"]},{id:"security",domains:["lock","alarm_control_panel","siren"]},{id:"cameras",domains:["camera"]},{id:"actions",domains:["scene","script","button","input_button","automation"]}],us={light:"💡",switch:"🔌",input_boolean:"🔘",binary_sensor:"🚨",sensor:"📊",climate:"🌡️",water_heater:"♨️",humidifier:"💧",camera:"📷",media_player:"📺",remote:"🎛️",cover:"🪟",valve:"🚰",fan:"💨",lock:"🔒",alarm_control_panel:"🛡️",siren:"📢",scene:"🎬",script:"📜",automation:"🤖",button:"🔘",input_button:"🔘",person:"👤",device_tracker:"📍",vacuum:"🧹"},ps="⚡",hs=new Set(["light","switch","input_boolean","fan","binary_sensor","climate","water_heater","humidifier","automation","script","siren","remote"]),ms=new Set(["on","home","open","unlocked","problem"]);function gs(r,e){const t=e?.state;if(typeof t!="string"||t==="unavailable"||t==="unknown"||t==="off")return!1;const i=fa(r);if(hs.has(i))return!0;switch(i){case"cover":case"valve":return t!=="closed";case"lock":return t!=="locked";case"alarm_control_panel":return t!=="disarmed";case"group":return ms.has(t);case"person":case"device_tracker":return t==="home";case"media_player":return t!=="standby"&&t!=="idle";case"vacuum":return t==="cleaning"||t==="returning";case"camera":return t==="streaming"||t==="recording";default:return!1}}const Xt=200,Mt="",Ai="all",Ue=["entities","furniture"],or="drawer-tabpanel",sr=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"});function ai(r){return r.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function lr(r){const e=r?.locale;return[r?.language,e?.language,e?.number_format,e?.time_format,e?.date_format,e?.time_zone].join("|")}function cr(r,e){const t=r?.attributes?.friendly_name;return typeof t=="string"&&t.trim()!==""?t:e}function En(r){return ho[r]??r}const dr=new Map;function fs(r){const e=Ye();let t=dr.get(e);return t||(t=new Map(di.map(i=>[i.type,ai(`${kn(i.type)} ${En(i.category)}`)])),dr.set(e,t)),t.get(r.type)??""}function bs(r){const e=t=>R(t,{minimumFractionDigits:2,maximumFractionDigits:2});return o("ui.drawer.dimensions",{width:e(r.width),length:e(r.length)})}const ri=104,ni=64,ur=4,zn=48;function vs(r){const e=$n({type:r.type,position:{x:0,y:0}}),t=Math.max(-e.minX,e.maxX,.01),i=Math.max(-e.minY,e.maxY,.01);return Math.min(zn,(ri/2-ur)/t,(ni/2-ur)/i)}const xs=new Map(di.map(r=>[r.type,vs(r)])),Ma=class Ma extends De{constructor(){super(...arguments),this.collapsed=!1,this.activeTab="entities",this.furnitureCategory=Ai,this.entitySearch="",this.furnitureSearch="",this.activeCategory="all",this.areaFilter=Mt,this.showSecondary=!1,this.visibleLimit=Xt,this.i18n=new Ee(this),this.rowsSource=null,this.rows=[],this.indexedStateCount=0,this.availableDomains=new Set,this.secondaryCount=0,this.areaOptions=null,this.filteredFor=null,this.filtered=[],this.renderedRows=null,this.renderedIds=[]}shouldUpdate(e){if(e.has("hass")&&(!this.hasAttribute("scheme")||e.get("hass")?.themes!==this.hass?.themes)&&Ke(this,this.hass),e.has(ga)||!e.has("hass")||e.size>1)return!0;if(this.collapsed||this.activeTab!=="entities")return!1;const t=e.get("hass"),i=t?.states,a=this.hass?.states;return!i||!a||t.areas!==this.hass.areas||lr(t)!==lr(this.hass)||this.getRows()!==this.renderedRows?!0:this.renderedIds.some(n=>i[n]!==a[n])}getRows(){const e=this.hass,t=e?.states;if(!t)return this.rowsSource=null,this.indexedStateCount=0,this.rows=[],this.availableDomains=new Set,this.secondaryCount=0,this.rows;const i=this.rowsSource;return i&&i.entities===e.entities&&i.devices===e.devices&&(i.states===t||this.hasSameEntities(t))?(i.states=t,this.rows):(this.rowsSource={states:t,entities:e.entities,devices:e.devices},this.indexedStateCount=Object.keys(t).length,this.rows=this.buildRows(t,e.entities,e.devices),this.availableDomains=new Set(this.rows.map(a=>a.domain)),this.secondaryCount=this.rows.reduce((a,n)=>a+(n.secondary?1:0),0),this.rows)}hasSameEntities(e){let t=0;for(const i in e)Object.prototype.hasOwnProperty.call(e,i)&&t++;if(t!==this.indexedStateCount)return!1;for(const i of this.rows){const a=e[i.entityId];if(!a||cr(a,i.entityId)!==i.name)return!1}return!0}buildRows(e,t,i){const a=[];for(const n of Object.keys(e)){const s=fa(n);if(!s)continue;const l=cr(e[n],n),c=t?.[n],d=c?.area_id??(c?.device_id?i?.[c.device_id]?.area_id:void 0);a.push({entityId:n,name:l,domain:s,areaId:typeof d=="string"&&d!==""?d:void 0,secondary:c?.hidden===!0||c?.entity_category==="diagnostic"||c?.entity_category==="config",searchText:ai(`${l} ${n}`)})}return a.sort((n,s)=>sr.compare(n.name,s.name)||n.entityId.localeCompare(s.entityId))}getFiltered(e,t){const i=[this.entitySearch.trim(),this.activeCategory,t,this.showSecondary?"1":"0"].join("\0");if(this.filteredFor&&this.filteredFor.rows===e&&this.filteredFor.key===i)return this.filtered;const a=nr.find(l=>l.id===this.activeCategory),n=a&&a.domains.length>0?new Set(a.domains):null,s=ai(this.entitySearch.trim()).split(/\s+/).filter(Boolean);return this.filtered=e.filter(l=>(this.showSecondary||!l.secondary)&&(n===null||n.has(l.domain))&&(t===Mt||l.areaId===t)&&s.every(c=>l.searchText.includes(c))),this.filteredFor={rows:e,key:i},this.filtered}getAreaOptions(e){const t=this.hass?.areas;if(this.areaOptions&&this.areaOptions.rows===e&&this.areaOptions.areas===t)return this.areaOptions.options;const i=new Set;for(const n of e)n.areaId&&i.add(n.areaId);const a=t?[...i].map(n=>({id:n,name:typeof t[n]?.name=="string"?t[n].name:n})).sort((n,s)=>sr.compare(n.name,s.name)):[];return this.areaOptions={rows:e,areas:t,options:a},a}setEntityCriteria(e){e(),this.visibleLimit=Xt}entityPayload(e){return{kind:"entity",entityId:e.entityId,domain:e.domain}}furniturePayload(e){return{kind:"furniture",furnitureType:e.type}}handleDragStart(e,t){e.dataTransfer&&(e.dataTransfer.setData("application/json",JSON.stringify(t)),e.dataTransfer.effectAllowed="copy")}pickItem(e){this.dispatchEvent(new CustomEvent("drawer-item-picked",{detail:{payload:e},bubbles:!0,composed:!0}))}handleItemKeyDown(e,t){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.pickItem(t))}toggleCollapse(){this.dispatchEvent(new CustomEvent("toggle-collapse",{bubbles:!0,composed:!0}))}handleTabKeyDown(e){const t=Ue.indexOf(this.activeTab);let i;switch(e.key){case"ArrowRight":i=Ue[(t+1)%Ue.length];break;case"ArrowLeft":i=Ue[(t-1+Ue.length)%Ue.length];break;case"Home":i=Ue[0];break;case"End":i=Ue[Ue.length-1];break;default:return}e.preventDefault(),e.stopPropagation(),this.activeTab=i,this.updateComplete.then(()=>this.renderRoot.querySelector(`#drawer-tab-${i}`)?.focus())}formatState(e){if(!e)return"";if(typeof this.hass?.formatEntityState=="function")try{return String(this.hass.formatEntityState(e))}catch{}const t=e.attributes?.unit_of_measurement;return`${e.state}${t?" "+t:""}`}renderEntitiesTab(e){const t=this.hass?.states??{},i=this.getAreaOptions(e),a=i.some(d=>d.id===this.areaFilter)?this.areaFilter:Mt,n=this.getFiltered(e,a),s=n.slice(0,this.visibleLimit),l=n.length-s.length,c=nr.filter(d=>d.domains.length===0||d.id===this.activeCategory||d.domains.some(p=>this.availableDomains.has(p)));return this.renderedRows=e,this.renderedIds=s.map(d=>d.entityId),u`
      <div class="search-section">
        <div class="search-input-wrapper">
          <input
            type="search"
            class="search-input"
            placeholder=${o("ui.drawer.search_entities_placeholder")}
            aria-label=${o("ui.drawer.search_entities")}
            .value=${this.entitySearch}
            @input=${d=>this.setEntityCriteria(()=>this.entitySearch=d.target.value)}
          />
        </div>

        <div class="categories-bar" role="group" aria-label=${o("ui.drawer.filter_by_type")}>
          ${c.map(d=>u`
            <button
              type="button"
              class="cat-btn ${this.activeCategory===d.id?"active":""}"
              aria-pressed=${this.activeCategory===d.id?"true":"false"}
              @click=${()=>this.setEntityCriteria(()=>this.activeCategory=d.id)}
            >${o(`ui.drawer.filter.${d.id}`)}</button>
          `)}
        </div>

        <div class="filters-row">
          ${i.length>0?u`
            <select
              class="area-select"
              aria-label=${o("ui.drawer.filter_by_area")}
              .value=${gt(a)}
              @change=${d=>this.setEntityCriteria(()=>this.areaFilter=d.target.value)}
            >
              <option value=${Mt} ?selected=${a===Mt}>${o("ui.drawer.all_areas")}</option>
              ${i.map(d=>u`<option value=${d.id} ?selected=${a===d.id}>${d.name}</option>`)}
            </select>
          `:w}
          <label class="hidden-toggle" title=${o("ui.drawer.show_hidden_tooltip")}>
            <input
              type="checkbox"
              .checked=${this.showSecondary}
              @change=${d=>this.setEntityCriteria(()=>this.showSecondary=d.target.checked)}
            />
            <span>${o("ui.drawer.show_hidden")}</span>
          </label>
        </div>
      </div>

      <div class="entities-list">
        ${this.hass?.states?n.length===0?u`
          <div class="empty-message" role="status">${o("ui.drawer.no_entities")}</div>
        `:u`
          <div class="results-info" aria-live="polite">
            ${Lt("ui.drawer.results",n.length)}${l>0?` ${o("ui.drawer.results_shown",{count:R(s.length)})}`:""}
          </div>
          ${cs(s,d=>d.entityId,d=>{const p=t[d.entityId],h=this.entityPayload(d),m=this.formatState(p);return u`
              <div
                class="entity-card"
                draggable="true"
                tabindex="0"
                role="button"
                aria-label=${o("ui.drawer.place_entity",{name:d.name,state:m})}
                @dragstart=${g=>this.handleDragStart(g,h)}
                @click=${()=>this.pickItem(h)}
                @keydown=${g=>this.handleItemKeyDown(g,h)}
                title=${o("ui.drawer.drag_entity_tooltip")}
              >
                <div class="entity-info">
                  <span class="entity-icon" aria-hidden="true">${us[d.domain]??ps}</span>
                  <div class="entity-details">
                    <span class="entity-name">${d.name}</span>
                    <span class="entity-id">${d.entityId}</span>
                  </div>
                </div>

                <span class="entity-state-badge ${gs(d.entityId,p)?"state-on":"state-off"}" title=${m}>
                  ${m}
                </span>
              </div>
            `})}
          ${l>0?u`
            <button type="button" class="more-btn" @click=${()=>this.visibleLimit+=Xt}>
              ${Lt("ui.drawer.show_more",l,{batch:R(Math.min(Xt,l))})}
            </button>
          `:w}
        `:u`
          <div class="empty-message" role="status">${o("ui.drawer.connecting")}</div>
        `}
      </div>

      <div class="drag-hint">
        <span aria-hidden="true">👆</span>
        <span>${o("ui.drawer.drag_entity_hint")}</span>
      </div>
    `}renderFurnitureTab(){let e=di;this.furnitureCategory!==Ai&&(e=e.filter(a=>a.category===this.furnitureCategory));const t=ai(this.furnitureSearch.trim()).split(/\s+/).filter(Boolean);t.length>0&&(e=e.filter(a=>{const n=fs(a);return t.every(s=>n.includes(s))}));const i=[{id:Ai,label:o("ui.drawer.filter.all")},...uo.map(a=>({id:a,label:En(a)}))];return u`
      <div class="search-section">
        <div class="search-input-wrapper">
          <input
            type="search"
            class="search-input"
            placeholder=${o("ui.drawer.search_furniture_placeholder")}
            aria-label=${o("ui.drawer.search_furniture")}
            .value=${this.furnitureSearch}
            @input=${a=>this.furnitureSearch=a.target.value}
          />
        </div>

        <div class="categories-bar" role="group" aria-label=${o("ui.drawer.filter_by_category")}>
          ${i.map(a=>u`
            <button
              type="button"
              class="cat-btn ${this.furnitureCategory===a.id?"active":""}"
              aria-pressed=${this.furnitureCategory===a.id?"true":"false"}
              @click=${()=>this.furnitureCategory=a.id}
            >${a.label}</button>
          `)}
        </div>
      </div>

      <div class="furniture-grid">
        ${e.length===0?u`
          <div class="empty-message" role="status" style="grid-column: 1 / -1;">${o("ui.drawer.no_furniture")}</div>
        `:e.map(a=>{const n=this.furniturePayload(a),s=kn(a.type),l=bs(a);return u`
            <div
              class="furniture-card"
              draggable="true"
              tabindex="0"
              role="button"
              aria-label=${o("ui.drawer.place_furniture",{name:s,dimensions:l})}
              @dragstart=${c=>this.handleDragStart(c,n)}
              @click=${()=>this.pickItem(n)}
              @keydown=${c=>this.handleItemKeyDown(c,n)}
              title=${o("ui.drawer.drag_furniture_tooltip",{dimensions:l})}
            >
              <span class="furniture-card-icon" aria-hidden="true">${a.icon}</span>
              <svg
                class="furniture-card-preview"
                width=${ri}
                height=${ni}
                viewBox="${-ri/2} ${-ni/2} ${ri} ${ni}"
                aria-hidden="true"
              >${po({type:a.type},{pixelsPerMeter:xs.get(a.type)??zn})}</svg>
              <span class="furniture-card-name">${s}</span>
              <span class="furniture-card-dim">${l}</span>
            </div>
          `})}
      </div>

      <div class="drag-hint">
        <span aria-hidden="true">👆</span>
        <span>${o("ui.drawer.drag_furniture_hint")}</span>
      </div>
    `}renderTab(e,t,i){const a=this.activeTab===e;return u`
      <button
        type="button"
        id="drawer-tab-${e}"
        class="tab-btn ${a?"active":""}"
        role="tab"
        aria-selected=${a?"true":"false"}
        aria-controls=${or}
        tabindex=${a?0:-1}
        @click=${()=>this.activeTab=e}
      >
        <span aria-hidden="true">${t}</span>
        <span>${o(`ui.drawer.tab.${e}`)}</span>
        <span class="count-badge" title=${o(`ui.drawer.tab.${e}_count`)}>${R(i)}</span>
      </button>
    `}render(){if(this.collapsed)return w;const e=this.getRows(),t=this.showSecondary?e.length:e.length-this.secondaryCount,i=this.activeTab==="entities";return u`
      <div class="drawer-header">
        <h2 class="drawer-title">
          <span aria-hidden="true">${i?"⚡":"🛋️"}</span>
          <span>${o(i?"ui.drawer.title_entities":"ui.drawer.title_furniture")}</span>
        </h2>
        <button
          type="button"
          class="btn-toggle"
          @click=${this.toggleCollapse}
          title=${o("ui.drawer.collapse")}
          aria-label=${o("ui.drawer.collapse")}
        >
          <span aria-hidden="true">⇤</span>
        </button>
      </div>

      <div class="drawer-tabs" role="tablist" aria-label=${o("ui.drawer.tabs")} @keydown=${this.handleTabKeyDown}>
        ${this.renderTab("entities","⚡",t)}
        ${this.renderTab("furniture","🛋️",di.length)}
      </div>

      <div class="tab-panel" id=${or} role="tabpanel" aria-labelledby="drawer-tab-${this.activeTab}">
        ${i?this.renderEntitiesTab(e):this.renderFurnitureTab()}
      </div>
    `}};Ma.styles=[ze,he`
    :host {
      /* Couleurs dérivées des jetons du thème (src/styles/theme.styles.ts) */
      --dr-item-bg: color-mix(in srgb, var(--arch-ui-surface-2) 45%, var(--arch-ui-surface));
      --dr-hover-bg: color-mix(in srgb, var(--arch-ui-accent) 12%, var(--arch-ui-surface));
      --dr-accent-ink: color-mix(in srgb, var(--arch-ui-accent) 55%, var(--arch-ui-text));
      --dr-accent-soft: color-mix(in srgb, var(--arch-ui-accent) 14%, transparent);
      /* Texte secondaire posé sur les cartes (fond plus foncé que la surface) : renforcé pour rester lisible (4,5:1). */
      --dr-muted-ink: color-mix(in srgb, var(--arch-ui-text-muted) 75%, var(--arch-ui-text));

      width: 320px;
      height: 100%;
      flex-shrink: 0;
      background: var(--arch-ui-surface);
      border-left: 1px solid var(--arch-ui-border);
      box-shadow: -6px 0 24px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      z-index: 25;
      font-family: var(--arch-ui-font);
      color: var(--arch-ui-text);
      position: relative;
      transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* « Réduire les animations » : la règle commune de uiThemeStyles ne vise pas l'hôte lui-même. */
    @media (prefers-reduced-motion: reduce) {
      :host {
        transition: none;
      }
    }

    :host([collapsed]) {
      width: 0 !important;
      overflow: hidden;
      border-left: none;
      box-shadow: none;
    }

    /* Écran étroit : tiroir superposé au canevas au lieu d'une colonne qui l'écrase
       (la barre d'outils et ses sous-menus restent au-dessus). */
    @media (max-width: 768px) {
      :host {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        height: auto;
        width: min(320px, calc(100% - 48px));
      }
    }

    .drawer-header {
      padding: 14px 16px;
      border-bottom: 1px solid var(--arch-ui-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--arch-ui-surface-2);
    }

    .drawer-title {
      font-size: 0.95rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      color: var(--arch-ui-text);
    }

    .count-badge {
      font-size: 0.72rem;
      padding: 2px 7px;
      background: var(--dr-accent-soft);
      color: var(--dr-accent-ink);
      border-radius: 9999px;
      border: 1px solid color-mix(in srgb, var(--arch-ui-accent) 30%, transparent);
      font-weight: 700;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .btn-toggle {
      background: transparent;
      border: 1px solid var(--arch-ui-border);
      border-radius: 6px;
      color: var(--arch-ui-text-muted);
      font-size: 14px;
      cursor: pointer;
      padding: 4px 8px;
      transition: all 0.2s ease;
    }

    .btn-toggle:hover {
      color: var(--arch-ui-text);
      background: var(--dr-hover-bg);
      border-color: var(--arch-ui-accent);
    }

    .tab-panel {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
    }

    .search-section {
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      border-bottom: 1px solid var(--arch-ui-border);
    }

    .search-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-input {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 8px;
      color: var(--arch-ui-text);
      padding: 7px 12px;
      font: inherit;
      font-size: 0.83rem;
      outline: none;
      width: 100%;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }

    .search-input::placeholder {
      color: var(--arch-ui-text-muted);
    }

    .search-input:focus {
      border-color: var(--arch-ui-accent);
      box-shadow: var(--arch-ui-focus-ring);
    }

    .categories-bar {
      display: flex;
      gap: 5px;
      overflow-x: auto;
      padding: 2px 2px 4px 2px;
      scrollbar-width: none;
    }

    .categories-bar::-webkit-scrollbar {
      display: none;
    }

    .cat-btn {
      background: var(--dr-item-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 6px;
      color: var(--arch-ui-text);
      padding: 4px 8px;
      font: inherit;
      font-size: 0.73rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }

    .cat-btn:hover {
      background: var(--dr-hover-bg);
    }

    .cat-btn.active {
      background: var(--arch-ui-accent);
      color: var(--arch-ui-accent-text);
      border-color: var(--arch-ui-accent);
    }

    .entities-list {
      flex: 1;
      overflow-y: auto;
      padding: 10px 14px;
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    .entity-card {
      background: var(--dr-item-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 9px;
      padding: 9px 11px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      cursor: grab;
      transition: all 0.18s ease;
      user-select: none;
    }

    .entity-card:hover {
      background: var(--dr-hover-bg);
      border-color: var(--arch-ui-accent);
      transform: translateX(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
    }

    .entity-card:active {
      cursor: grabbing;
    }

    .entity-info {
      display: flex;
      align-items: center;
      gap: 10px;
      overflow: hidden;
    }

    .entity-icon {
      font-size: 1.25rem;
      min-width: 26px;
      text-align: center;
    }

    .entity-details {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .entity-name {
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--arch-ui-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .entity-id {
      font-size: 0.70rem;
      color: var(--dr-muted-ink);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .entity-state-badge {
      font-size: 0.72rem;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 9999px;
      text-transform: uppercase;
      font-family: ui-monospace, SFMono-Regular, monospace;
      white-space: nowrap;
      max-width: 45%;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-shrink: 0;
    }

    .state-on {
      background: color-mix(in srgb, var(--arch-ui-warning) 22%, transparent);
      color: var(--arch-ui-text);
      border: 1px solid color-mix(in srgb, var(--arch-ui-warning) 55%, transparent);
    }

    .state-off {
      background: transparent;
      color: var(--dr-muted-ink);
      border: 1px solid var(--arch-ui-border);
    }

    .drag-hint {
      padding: 10px 14px;
      background: var(--dr-accent-soft);
      border-top: 1px solid color-mix(in srgb, var(--arch-ui-accent) 25%, transparent);
      font-size: 0.74rem;
      color: var(--dr-accent-ink);
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .drawer-tabs {
      display: flex;
      border-bottom: 1px solid var(--arch-ui-border);
    }

    .tab-btn {
      flex: 1;
      padding: 10px 8px;
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      color: var(--arch-ui-text-muted);
      font: inherit;
      font-size: 0.80rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    .tab-btn:hover {
      color: var(--arch-ui-text);
      background: var(--dr-hover-bg);
    }

    .tab-btn.active {
      color: var(--dr-accent-ink);
      border-bottom-color: var(--arch-ui-accent);
      background: var(--dr-accent-soft);
    }

    .furniture-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      /* Peu de résultats (filtre, recherche) : cartes en haut, sans étirer les lignes. */
      align-content: start;
      gap: 8px;
      padding: 10px 14px;
      overflow-y: auto;
      flex: 1;
    }

    .furniture-card {
      position: relative;
      background: var(--dr-item-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 9px;
      padding: 10px 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      cursor: grab;
      transition: all 0.18s ease;
      user-select: none;
      gap: 4px;
    }

    .furniture-card:hover {
      background: var(--dr-hover-bg);
      border-color: var(--arch-ui-accent);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
    }

    .furniture-card:active {
      cursor: grabbing;
    }

    .furniture-card-preview {
      display: block;
      flex: none;
      max-width: 100%;
      height: auto;
      background: var(--arch-ui-bg);
      border-radius: 6px;
    }

    .furniture-card-icon {
      position: absolute;
      top: 4px;
      left: 6px;
      font-size: 0.9rem;
      line-height: 1;
    }

    .furniture-card-name {
      font-size: 0.76rem;
      font-weight: 600;
      color: var(--arch-ui-text);
      line-height: 1.2;
    }

    .furniture-card-dim {
      font-size: 0.68rem;
      color: var(--dr-accent-ink);
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-weight: 600;
    }

    .empty-message {
      padding: 30px 16px;
      text-align: center;
      color: var(--arch-ui-text-muted);
      font-size: 0.83rem;
    }

    .filters-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.74rem;
      color: var(--arch-ui-text-muted);
    }

    .area-select {
      flex: 1;
      min-width: 0;
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 6px;
      color: var(--arch-ui-text);
      padding: 4px 6px;
      font: inherit;
      font-size: 0.74rem;
      outline: none;
    }

    .area-select:focus {
      border-color: var(--arch-ui-accent);
    }

    .hidden-toggle {
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      white-space: nowrap;
    }

    .hidden-toggle input {
      accent-color: var(--arch-ui-accent);
    }

    .results-info {
      font-size: 0.72rem;
      color: var(--arch-ui-text-muted);
      padding: 0 2px;
    }

    .entity-card:focus-visible,
    .furniture-card:focus-visible {
      outline: 2px solid var(--arch-ui-accent);
      outline-offset: 1px;
    }

    .more-btn {
      background: var(--dr-item-bg);
      border: 1px dashed color-mix(in srgb, var(--arch-ui-accent) 45%, transparent);
      border-radius: 8px;
      color: var(--dr-accent-ink);
      padding: 8px;
      font: inherit;
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
    }

    .more-btn:hover {
      background: var(--dr-hover-bg);
    }
  `];let fe=Ma;Fe([L({type:Object})],fe.prototype,"hass");Fe([L({type:Boolean,reflect:!0})],fe.prototype,"collapsed");Fe([k()],fe.prototype,"activeTab");Fe([k()],fe.prototype,"furnitureCategory");Fe([k()],fe.prototype,"entitySearch");Fe([k()],fe.prototype,"furnitureSearch");Fe([k()],fe.prototype,"activeCategory");Fe([k()],fe.prototype,"areaFilter");Fe([k()],fe.prototype,"showSecondary");Fe([k()],fe.prototype,"visibleLimit");Ae("home-architect-entity-drawer",fe);var ys=Object.defineProperty,Ne=(r,e,t,i)=>{for(var a=void 0,n=r.length-1,s;n>=0;n--)(s=r[n])&&(a=s(e,t,a)||a);return a&&ys(e,t,a),a};const ce=[{id:"living",icon:"🛋️",widthMeters:6,lengthMeters:4.5,wallThickness:.2,color:"rgba(56, 189, 248, 0.15)",addDoor:!0,addWindow:!0},{id:"bedroom",icon:"🛏️",widthMeters:4,lengthMeters:3.5,wallThickness:.15,color:"rgba(168, 85, 247, 0.15)",addDoor:!0,addWindow:!0},{id:"kitchen",icon:"🍳",widthMeters:4,lengthMeters:3,wallThickness:.15,color:"rgba(234, 179, 8, 0.15)",addDoor:!0,addWindow:!0},{id:"bathroom",icon:"🚿",widthMeters:2.5,lengthMeters:2.2,wallThickness:.1,color:"rgba(20, 184, 166, 0.15)",addDoor:!0,addWindow:!1},{id:"office",icon:"💼",widthMeters:3.2,lengthMeters:3,wallThickness:.15,color:"rgba(99, 102, 241, 0.15)",addDoor:!0,addWindow:!0},{id:"custom",icon:"📐",widthMeters:5,lengthMeters:4,wallThickness:.2,color:"rgba(148, 163, 184, 0.15)",addDoor:!0,addWindow:!0}],ws=[{value:.1,key:"partition"},{value:.15,key:"wall"},{value:.2,key:"load_bearing"},{value:.3,key:"exterior"}],Zt={min:.5,max:50},pr={min:1.5,max:10},hr=2.5,mr=80,_s=.9,ks=1.2,gr="wizard-title",fr="wizard-room-name",br="wizard-thickness",Pi="wizard-error-dimensions",vr="wizard-error-height";function Ri(r){return o(`ui.wizard.template.${r.id}`)}function bt(r){return R(r,{maximumFractionDigits:2})}function xr(r){return o("ui.unit.m",{value:R(r,{minimumFractionDigits:2,maximumFractionDigits:2})})}const $s=/^-?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/;function Oi(r,e){const t=r.trim();if(t==="")return{value:null,error:o("ui.wizard.error.required")};if(!$s.test(t))return{value:null,error:o("ui.wizard.error.invalid")};const i=Number(t.replace(",","."));return!Number.isFinite(i)||i<e.min||i>e.max?{value:null,error:o("ui.wizard.error.range",{min:bt(e.min),max:bt(e.max)})}:{value:i,error:null}}const Ca=class Ca extends De{constructor(){super(...arguments),this.selectedTemplate=ce[0],this.widthText=String(ce[0].widthMeters),this.lengthText=String(ce[0].lengthMeters),this.heightText=String(ce[0].heightMeters??hr),this.touched={},this.submitAttempted=!1,this.thickness=ce[0].wallThickness,this.addDoor=ce[0].addDoor,this.addWindow=ce[0].addWindow,this.roomName=null,this.i18n=new Ee(this),this.returnFocusTo=null,this.schemeObserver=null,this.handleKeyDown=e=>{if(e.key==="Escape"&&!e.isComposing){e.preventDefault(),e.stopPropagation(),this.handleClose();return}if(e.key!=="Tab")return;const t=this.renderRoot.querySelector(".modal-card");if(!t)return;const i=xi(t);if(i.length===0){e.preventDefault();return}const a=this.shadowRoot?.activeElement,n=i[0],s=i[i.length-1];!a||!i.includes(a)?(e.preventDefault(),n.focus()):e.shiftKey&&a===n?(e.preventDefault(),s.focus()):!e.shiftKey&&a===s&&(e.preventDefault(),n.focus())}}connectedCallback(){super.connectedCallback(),this.returnFocusTo=yt(),this.addEventListener("keydown",this.handleKeyDown),this.followHostScheme()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("keydown",this.handleKeyDown),this.schemeObserver?.disconnect(),this.schemeObserver=null;const e=this.returnFocusTo;this.returnFocusTo=null,e?.isConnected&&e!==document.body&&e.focus({preventScroll:!0})}firstUpdated(){this.renderRoot.querySelector('.template-card[aria-checked="true"]')?.focus({preventScroll:!0})}followHostScheme(){const e=this.getRootNode(),t=e instanceof ShadowRoot?e.host:null;if(!t)return;const i=()=>{const a=t.getAttribute("scheme");a?this.setAttribute("scheme",a):this.removeAttribute("scheme")};i(),this.schemeObserver=new MutationObserver(i),this.schemeObserver.observe(t,{attributes:!0,attributeFilter:["scheme"]})}selectTemplate(e){this.selectedTemplate=e,this.widthText=String(e.widthMeters),this.lengthText=String(e.lengthMeters),this.heightText=String(e.heightMeters??hr),this.thickness=e.wallThickness,this.addDoor=e.addDoor,this.addWindow=e.addWindow,this.roomName=null,this.touched={},this.submitAttempted=!1}handleTemplateKeyDown(e){const t=ce.indexOf(this.selectedTemplate);let i;switch(e.key){case"ArrowRight":case"ArrowDown":i=(t+1)%ce.length;break;case"ArrowLeft":case"ArrowUp":i=(t-1+ce.length)%ce.length;break;case"Home":i=0;break;case"End":i=ce.length-1;break;default:return}e.preventDefault(),this.selectTemplate(ce[i]),this.updateComplete.then(()=>this.renderRoot.querySelector('.template-card[aria-checked="true"]')?.focus())}checkFields(){return{width:Oi(this.widthText,Zt),length:Oi(this.lengthText,Zt),height:Oi(this.heightText,pr)}}markTouched(e){this.touched={...this.touched,[e]:!0}}handleSubmit(e){e.preventDefault();const t=this.checkFields(),i=t.width.value,a=t.length.value,n=t.height.value;if(i===null||a===null||n===null){this.submitAttempted=!0;return}const s=Ri(this.selectedTemplate),l=((this.roomName??s).trim()||s).slice(0,mr);this.dispatchEvent(new CustomEvent("create-room",{detail:{name:l,width:i,length:a,thickness:this.thickness,height:n,color:this.selectedTemplate.color,icon:this.selectedTemplate.icon,addDoor:this.addDoor,addWindow:this.addWindow},bubbles:!0,composed:!0}))}renderMetersInput(e,t,i,a,n,s){const l=i.error!==null&&(this.touched[e]||this.submitAttempted);return u`
      <input
        type="text"
        inputmode="decimal"
        autocomplete="off"
        aria-label=${o("ui.wizard.field_range",{field:o(`ui.wizard.field.${e}`),min:bt(a.min),max:bt(a.max)})}
        aria-invalid=${l?"true":"false"}
        aria-describedby=${n??w}
        .value=${gt(t)}
        @input=${c=>s(c.target.value)}
        @change=${()=>this.markTouched(e)}
      />
    `}shownError(...e){return e.find(([t,i])=>i.error!==null&&(this.touched[t]||this.submitAttempted))}renderFieldError(e,t){return t?u`<span class="field-error" id=${e} role="alert">${t[1].error}</span>`:w}handleClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){const e=this.checkFields(),t=e.width.value!==null&&e.length.value!==null&&e.height.value!==null,i=e.width.value!==null&&e.length.value!==null?R(e.width.value*e.length.value,{minimumFractionDigits:1,maximumFractionDigits:1}):"—",a=this.thickness.toFixed(2),n=Ri(this.selectedTemplate),s=this.shownError(["width",e.width],["length",e.length]),l=this.shownError(["height",e.height]),c=(d,p,h)=>p?.[0]===d?h:null;return u`
      <form
        class="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby=${gr}
        novalidate
        @submit=${this.handleSubmit}
      >
        <div class="modal-header">
          <h2 class="modal-title" id=${gr}>
            <span aria-hidden="true">🪄</span>
            <span>${o("ui.wizard.title")}</span>
          </h2>
          <button
            type="button"
            class="btn-close"
            title=${o("ui.common.close")}
            aria-label=${o("ui.common.close")}
            @click=${this.handleClose}
          ><span aria-hidden="true">✕</span></button>
        </div>

        <!-- Gabarits prédéfinis -->
        <div
          class="templates-grid"
          role="radiogroup"
          aria-label=${o("ui.wizard.templates")}
          @keydown=${this.handleTemplateKeyDown}
        >
          ${ce.map(d=>{const p=this.selectedTemplate.id===d.id;return u`
              <button
                type="button"
                class="template-card ${p?"selected":""}"
                role="radio"
                aria-checked=${p?"true":"false"}
                tabindex=${p?0:-1}
                @click=${()=>this.selectTemplate(d)}
              >
                <span class="template-icon" aria-hidden="true">${d.icon}</span>
                <span class="template-name">${Ri(d)}</span>
                <span class="template-dims">${o("ui.wizard.template_dims",{width:bt(d.widthMeters),length:bt(d.lengthMeters)})}</span>
              </button>
            `})}
        </div>

        <!-- Paramétrage précis des dimensions -->
        <div class="config-section">
          <div class="field-row">
            <label class="field-label" for=${fr}>${o("ui.wizard.room_name")}</label>
            <input
              id=${fr}
              type="text"
              class="name-input"
              maxlength=${mr}
              placeholder=${n}
              .value=${gt(this.roomName??n)}
              @input=${d=>this.roomName=d.target.value}
            />
          </div>

          <div class="field-block">
            <div class="field-row" role="group" aria-labelledby="wizard-dimensions-label">
              <span class="field-label" id="wizard-dimensions-label">${o("ui.wizard.dimensions")}</span>
              <div class="field-inputs">
                ${this.renderMetersInput("width",this.widthText,e.width,Zt,c("width",s,Pi),d=>this.widthText=d)}
                <span aria-hidden="true">${o("ui.wizard.unit_times")}</span>
                ${this.renderMetersInput("length",this.lengthText,e.length,Zt,c("length",s,Pi),d=>this.lengthText=d)}
                <span aria-hidden="true">${o("ui.wizard.unit_m")}</span>
              </div>
            </div>
            ${this.renderFieldError(Pi,s)}
          </div>

          <div class="field-row">
            <span class="field-label">${o("ui.wizard.area")}</span>
            <span class="surface-badge" aria-live="polite">${o("ui.unit.m2",{value:i})}</span>
          </div>

          <div class="field-block">
            <div class="field-row" role="group" aria-labelledby="wizard-height-label">
              <span class="field-label" id="wizard-height-label">${o("ui.wizard.height")}</span>
              <div class="field-inputs">
                ${this.renderMetersInput("height",this.heightText,e.height,pr,c("height",l,vr),d=>this.heightText=d)}
                <span aria-hidden="true">${o("ui.wizard.unit_m")}</span>
              </div>
            </div>
            ${this.renderFieldError(vr,l)}
          </div>

          <div class="field-row">
            <label class="field-label" for=${br}>${o("ui.wizard.thickness")}</label>
            <select
              id=${br}
              .value=${gt(a)}
              @change=${d=>this.thickness=parseFloat(d.target.value)}
            >
              ${ws.map(d=>u`
                <option value=${d.value.toFixed(2)} ?selected=${d.value.toFixed(2)===a}>${o(`ui.wizard.thickness.${d.key}`)}</option>
              `)}
            </select>
          </div>

          <div class="checkboxes-row">
            <label>
              <input
                type="checkbox"
                .checked=${gt(this.addDoor)}
                @change=${d=>this.addDoor=d.target.checked}
              />
              <span>${o("ui.wizard.add_door",{width:xr(_s)})}</span>
            </label>

            <label>
              <input
                type="checkbox"
                .checked=${gt(this.addWindow)}
                @change=${d=>this.addWindow=d.target.checked}
              />
              <span>${o("ui.wizard.add_window",{width:xr(ks)})}</span>
            </label>
          </div>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn btn-cancel" @click=${this.handleClose}>${o("ui.common.cancel")}</button>
          <button
            type="submit"
            class="btn btn-create"
            ?disabled=${!t}
            title=${o(t?"ui.wizard.create":"ui.wizard.fix_dimensions")}
          >
            ${o("ui.wizard.create")}
          </button>
        </div>
      </form>
    `}};Ca.styles=[ze,he`
    :host {
      --wz-accent-ink: color-mix(in srgb, var(--arch-ui-accent) 55%, var(--arch-ui-text));
      --wz-hover-bg: color-mix(in srgb, var(--arch-ui-accent) 12%, var(--arch-ui-surface));

      position: fixed;
      inset: 0;
      background: var(--arch-ui-overlay);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--arch-ui-font);
      color: var(--arch-ui-text);
    }

    .modal-card {
      width: 90%;
      max-width: 540px;
      max-height: 92vh;
      overflow-y: auto;
      box-sizing: border-box;
      background: var(--arch-ui-surface);
      border: 1px solid var(--arch-ui-border);
      border-radius: 18px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      animation: popIn 0.2s ease-out;
    }

    @keyframes popIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--arch-ui-border);
      padding-bottom: 12px;
    }

    .modal-title {
      font-size: 1.2rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 0;
      color: var(--arch-ui-text);
    }

    .btn-close {
      background: transparent;
      border: none;
      color: var(--arch-ui-text-muted);
      font-size: 20px;
      cursor: pointer;
      line-height: 1;
      border-radius: 6px;
      padding: 2px 6px;
    }

    .btn-close:hover {
      color: var(--arch-ui-text);
      background: var(--arch-ui-surface-2);
    }

    .templates-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }

    @media (max-width: 480px) {
      .templates-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .template-card {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 12px;
      padding: 12px 8px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      color: var(--arch-ui-text);
      font: inherit;
    }

    .template-card:hover {
      background: var(--wz-hover-bg);
      border-color: var(--arch-ui-accent);
      transform: translateY(-2px);
    }

    .template-card.selected {
      background: color-mix(in srgb, var(--arch-ui-accent) 20%, var(--arch-ui-surface));
      border-color: var(--arch-ui-accent);
      box-shadow: 0 0 12px color-mix(in srgb, var(--arch-ui-accent) 30%, transparent);
    }

    .template-icon {
      font-size: 24px;
    }

    .template-name {
      font-size: 0.85rem;
      font-weight: 600;
    }

    .template-dims {
      font-size: 0.72rem;
      color: var(--arch-ui-text-muted);
    }

    .config-section {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 12px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .field-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px 12px;
    }

    .field-label {
      font-size: 0.85rem;
      color: var(--arch-ui-text);
    }

    .field-inputs {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    input[type="text"], select {
      background: var(--arch-ui-surface);
      border: 1px solid var(--arch-ui-border);
      color: var(--arch-ui-text);
      padding: 6px 10px;
      border-radius: 6px;
      font: inherit;
      font-size: 0.85rem;
      width: 75px;
      outline: none;
      text-align: center;
    }

    input[type="text"]:focus, select:focus {
      border-color: var(--arch-ui-accent);
      box-shadow: var(--arch-ui-focus-ring);
    }

    input.name-input {
      width: 160px;
      text-align: left;
      padding-left: 8px;
    }

    select {
      width: auto;
      text-align: left;
    }

    .surface-badge {
      font-weight: 700;
      color: var(--wz-accent-ink);
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .checkboxes-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 18px;
      font-size: 0.85rem;
      color: var(--arch-ui-text);
    }

    .checkboxes-row label {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }

    .checkboxes-row input {
      accent-color: var(--arch-ui-accent);
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 4px;
    }

    .btn {
      padding: 9px 18px;
      border-radius: 8px;
      font: inherit;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 1px solid transparent;
    }

    .btn-cancel {
      background: var(--arch-ui-surface-2);
      color: var(--arch-ui-text);
      border-color: var(--arch-ui-border);
    }

    .btn-cancel:hover {
      background: var(--wz-hover-bg);
    }

    .btn-create {
      background: var(--arch-ui-accent);
      color: var(--arch-ui-accent-text);
      border-color: var(--arch-ui-accent);
      box-shadow: 0 0 12px color-mix(in srgb, var(--arch-ui-accent) 35%, transparent);
    }

    .btn-create:hover:not(:disabled) {
      background: color-mix(in srgb, var(--arch-ui-accent) 85%, black);
      transform: translateY(-1px);
    }

    .btn-create:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      box-shadow: none;
    }

    /* Focus clavier visible même sur les éléments qui portent déjà une ombre (gabarit choisi, bouton principal). */
    .template-card:focus-visible,
    .btn:focus-visible {
      outline: 2px solid var(--arch-ui-accent);
      outline-offset: 2px;
    }

    .field-block {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .field-error {
      align-self: flex-end;
      font-size: 0.75rem;
      color: var(--arch-ui-danger);
      font-weight: 600;
    }

    input[aria-invalid="true"] {
      border-color: var(--arch-ui-danger);
    }
  `];let be=Ca;Ne([k()],be.prototype,"selectedTemplate");Ne([k()],be.prototype,"widthText");Ne([k()],be.prototype,"lengthText");Ne([k()],be.prototype,"heightText");Ne([k()],be.prototype,"touched");Ne([k()],be.prototype,"submitAttempted");Ne([k()],be.prototype,"thickness");Ne([k()],be.prototype,"addDoor");Ne([k()],be.prototype,"addWindow");Ne([k()],be.prototype,"roomName");Ae("home-architect-wizard-modal",be);var Ss=Object.defineProperty,Xe=(r,e,t,i)=>{for(var a=void 0,n=r.length-1,s;n>=0;n--)(s=r[n])&&(a=s(e,t,a)||a);return a&&Ss(e,t,a),a};const Ct=[{id:"sky",color:"rgba(56, 189, 248, 0.18)"},{id:"violet",color:"rgba(168, 85, 247, 0.18)"},{id:"amber",color:"rgba(245, 158, 11, 0.18)"},{id:"emerald",color:"rgba(16, 185, 129, 0.18)"},{id:"indigo",color:"rgba(99, 102, 241, 0.18)"},{id:"rose",color:"rgba(244, 63, 94, 0.18)"},{id:"slate",color:"rgba(148, 163, 184, 0.18)"}],Ms=[{id:"basement",val:2.1},{id:"attic",val:2.3},{id:"standard",val:2.5},{id:"high",val:2.7},{id:"haussmann",val:3},{id:"cathedral",val:3.5}],yr=2.5,An=1,Pn=12,wr="rgba(56, 189, 248, 0.18)",_r=100,na="geometry.room.default_name";function Cs(r){const e=r.trim().replace(",",".");if(e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function ji(r){return typeof r=="number"&&Number.isFinite(r)&&r>=An&&r<=Pn}function He(r){return R(r,{minimumFractionDigits:2,maximumFractionDigits:2,useGrouping:!1})}function Li(r){return R(r,{minimumFractionDigits:1,maximumFractionDigits:1})}function Ts(r){return mo(na).includes(r.replace(/\s+\d+$/,""))}const Is="button, input, select, textarea, [href], [tabindex]";function Ds(){let r=document.activeElement;for(;r?.shadowRoot?.activeElement;)r=r.shadowRoot.activeElement;return r instanceof HTMLElement||r instanceof SVGElement?r:null}class va{constructor(e){this.host=e,this.returnFocusTo=null,this.keepFocusOnBackdrop=t=>{t.composedPath()[0]===this.host&&t.preventDefault()},e.addController(this)}hostConnected(){this.returnFocusTo=Ds(),this.host.addEventListener("mousedown",this.keepFocusOnBackdrop)}hostDisconnected(){this.host.removeEventListener("mousedown",this.keepFocusOnBackdrop);const e=this.returnFocusTo;this.returnFocusTo=null,e?.isConnected&&e.focus({preventScroll:!0})}trapTab(e){const t=this.host.shadowRoot;if(e.key!=="Tab"||!t)return;e.preventDefault();const i=Array.from(t.querySelectorAll(Is)).filter(s=>s.tabIndex>=0&&!s.matches(":disabled")&&s.getClientRects().length>0);if(i.length===0)return;const a=i.indexOf(t.activeElement),n=e.shiftKey?a<=0?i.length-1:a-1:a<0||a===i.length-1?0:a+1;i[n].focus()}}const xa=he`
  :host {
    /* Accent lisible comme texte ou bordure sur la surface (mélange avec la couleur du texte). */
    --modal-accent-text: color-mix(in srgb, var(--arch-ui-accent) 60%, var(--arch-ui-text));
    /* Accent assombri pour un texte --arch-ui-accent-text (clair) lisible sur les boutons pleins. */
    --modal-accent-fill: color-mix(in srgb, var(--arch-ui-accent) 72%, #000);
    --modal-accent-soft: color-mix(in srgb, var(--arch-ui-accent) 14%, transparent);
    --modal-danger-text: color-mix(in srgb, var(--arch-ui-danger) 80%, var(--arch-ui-text));
    --modal-danger-fill: color-mix(in srgb, var(--arch-ui-danger) 85%, #000);
    --modal-field-border: color-mix(in srgb, var(--arch-ui-text) 45%, transparent);
    --modal-mono: var(--ha-font-family-code, ui-monospace, SFMono-Regular, Menlo, monospace);

    position: fixed;
    inset: 0;
    background: var(--arch-ui-overlay);
    backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    font-family: var(--arch-ui-font);
    color: var(--arch-ui-text);
    animation: fadeIn 0.2s ease-out;
  }

  /*
   * Navigateur sans color-mix() : les jetons dérivés seraient invalides (bouton principal sans fond,
   * texte clair sur surface claire). Repli sur les jetons de base.
   */
  @supports not (color: color-mix(in srgb, red 50%, blue)) {
    :host {
      --modal-accent-text: var(--arch-ui-accent);
      --modal-accent-fill: var(--arch-ui-accent);
      --modal-accent-soft: transparent;
      --modal-danger-text: var(--arch-ui-danger);
      --modal-danger-fill: var(--arch-ui-danger);
      --modal-field-border: var(--arch-ui-text-muted);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.98); }
    to { opacity: 1; transform: scale(1); }
  }

  @media (prefers-reduced-motion: reduce) {
    :host {
      animation: none;
    }
  }

  .modal-card {
    background: var(--arch-ui-surface);
    color: var(--arch-ui-text);
    border: 1px solid var(--arch-ui-border);
    border-radius: var(--arch-ui-radius);
    max-width: 92vw;
    max-height: 92vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.45);
    overflow: hidden;
  }

  .modal-card:focus,
  .modal-card:focus-visible {
    outline: none;
    box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.45);
  }

  .modal-header {
    border-bottom: 1px solid var(--arch-ui-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    background: var(--arch-ui-surface-2);
  }

  .modal-title-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .modal-title {
    font-weight: 700;
    color: var(--arch-ui-text);
    margin: 0;
  }

  .btn-close {
    background: transparent;
    border: none;
    color: var(--arch-ui-text-muted);
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
    padding: 6px;
    border-radius: 6px;
    transition: color 0.15s ease, background 0.15s ease;
  }

  .btn-close:hover {
    color: var(--arch-ui-text);
    background: var(--modal-accent-soft);
  }

  .modal-footer {
    border-top: 1px solid var(--arch-ui-border);
    background: var(--arch-ui-surface-2);
    display: flex;
    align-items: center;
  }

  .btn-cancel {
    background: transparent;
    color: var(--arch-ui-text);
    border: 1px solid var(--modal-field-border);
    border-radius: 8px;
    padding: 7px 14px;
    font: inherit;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .btn-cancel:hover {
    background: var(--modal-accent-soft);
  }

  .btn-primary {
    background: var(--modal-accent-fill);
    color: var(--arch-ui-accent-text);
    border: 1px solid var(--modal-accent-fill);
    border-radius: 8px;
    padding: 7px 18px;
    font: inherit;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: filter 0.2s ease;
  }

  .btn-primary:hover:not(:disabled) {
    filter: brightness(0.9);
  }

  .btn-primary:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .field-error {
    color: var(--modal-danger-text);
    font-size: 0.8rem;
    font-weight: 600;
  }

  .check-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.82rem;
    color: var(--arch-ui-text);
    cursor: pointer;
  }

  .check-row input {
    width: 16px;
    height: 16px;
    margin: 0;
    accent-color: var(--modal-accent-fill);
    cursor: pointer;
  }

  .metric-label {
    color: var(--arch-ui-text-muted);
    font-weight: 600;
    text-transform: uppercase;
  }

  .metric-val {
    font-weight: 800;
    color: var(--modal-accent-text);
    font-family: var(--modal-mono);
  }

  .unit-tag {
    font-weight: 700;
    color: var(--modal-accent-text);
  }

  .big-input {
    flex: 1;
    min-width: 0;
    background: var(--arch-ui-bg);
    border: 2px solid var(--modal-accent-text);
    color: var(--arch-ui-text);
    font-weight: 800;
    font-family: var(--modal-mono);
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .big-input:focus,
  .big-input:focus-visible {
    box-shadow: 0 0 0 3px var(--modal-accent-soft), var(--arch-ui-focus-ring);
  }

  .big-input.invalid {
    border-color: var(--modal-danger-text);
  }
`,Ta=class Ta extends De{constructor(){super(...arguments),this.walls=[],this.name="",this.heightText=He(yr),this.inheritHeight=!0,this.areaId="",this.color=wr,this.areaCache=null,this.i18n=new Ee(this),this.focusTrap=new va(this),this.handleKeyDown=e=>{if(e.stopPropagation(),e.key==="Escape")e.preventDefault(),this.close();else if(e.key==="Tab")this.focusTrap.trapTab(e);else if(e.key==="Enter"&&!e.isComposing){const t=Ge(e);t instanceof HTMLInputElement&&t.type==="text"&&(e.preventDefault(),this.save())}}}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",this.handleKeyDown)}disconnectedCallback(){this.removeEventListener("keydown",this.handleKeyDown),super.disconnectedCallback()}shouldUpdate(e){if(!e.has("hass"))return!0;Ke(this,this.hass);const t=e.get("hass");return e.size>1||!t||t.areas!==this.hass?.areas}willUpdate(e){if(e.has("room")&&this.room){const t=ji(this.room.height);this.name=this.room.name||o(na),this.inheritHeight=!t,this.heightText=He(t?this.room.height:this.projectDefaultHeight),this.areaId=this.room.area_id??"",this.color=this.room.color||wr}}firstUpdated(){const e=this.renderRoot.querySelector("#room-name");e?.focus(),e?.select()}get projectDefaultHeight(){return ji(this.defaultCeilingHeight)?this.defaultCeilingHeight:yr}effectiveHeight(){if(this.inheritHeight)return this.projectDefaultHeight;const e=Cs(this.heightText);return ji(e)?e:null}areaOptions(){const e=this.hass?.areas;if(!e||typeof e!="object")return null;const t=Ye();if(this.areaCache?.source!==e||this.areaCache.lang!==t){const i=Object.values(e).filter(a=>!!a&&typeof a.area_id=="string"&&a.area_id!=="").map(a=>({id:a.area_id,name:a.name||a.area_id})).sort((a,n)=>a.name.localeCompare(n.name,t));this.areaCache={source:e,lang:t,options:i}}return this.areaCache.options}handleAreaChange(e){this.areaId=e.target.value;const t=this.areaOptions()?.find(a=>a.id===this.areaId),i=this.name.trim();t&&(i===""||Ts(i))&&(this.name=t.name)}handleInheritChange(e){this.inheritHeight=e.target.checked,this.inheritHeight||(this.heightText=He(this.projectDefaultHeight))}selectPreset(e){this.inheritHeight=!1,this.heightText=He(e)}async handleSwatchKeyDown(e){const t=Ct.length,i=Ct.findIndex(n=>n.color===this.color);let a;switch(e.key){case"ArrowRight":case"ArrowDown":a=i<0?0:(i+1)%t;break;case"ArrowLeft":case"ArrowUp":a=i<0?t-1:(i-1+t)%t;break;case"Home":a=0;break;case"End":a=t-1;break;default:return}e.preventDefault(),this.color=Ct[a].color,await this.updateComplete,this.renderRoot.querySelectorAll(".color-swatch")[a]?.focus()}close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}save(){const e=this.effectiveHeight();if(e===null)return;const t={roomId:this.room.id,name:this.name.trim().slice(0,_r)||o(na),height:e,inheritHeight:this.inheritHeight,color:this.color,area_id:this.areaId||null};this.dispatchEvent(new CustomEvent("save-room",{detail:t,bubbles:!0,composed:!0}))}deleteRoom(){confirm(o("geometry.room.delete_confirm",{name:this.room.name}))&&this.dispatchEvent(new CustomEvent("delete-room",{detail:{roomId:this.room.id},bubbles:!0,composed:!0}))}renderAreaField(){const e=this.areaOptions();if(!e)return null;const t=this.areaId===""||e.some(i=>i.id===this.areaId);return u`
      <div class="form-group">
        <label class="form-label" for="room-area">${o("geometry.room.area_label")}</label>
        <select id="room-area" class="form-select" aria-describedby="room-area-hint" @change=${this.handleAreaChange}>
          <option value="" ?selected=${this.areaId===""}>${o("geometry.room.area_none")}</option>
          ${t?null:u`<option value=${this.areaId} selected>${o("geometry.room.area_missing",{id:this.areaId})}</option>`}
          ${e.map(i=>u`<option value=${i.id} ?selected=${i.id===this.areaId}>${i.name}</option>`)}
        </select>
        <span class="form-hint" id="room-area-hint">${o("geometry.room.area_hint")}</span>
      </div>
    `}renderColorField(){const e=Ct.findIndex(i=>i.color===this.color),t=e>=0?e:0;return u`
      <div class="form-group">
        <span class="form-label" id="room-color-label">${o("geometry.room.color_label")}</span>
        <div class="colors-row" role="radiogroup" aria-labelledby="room-color-label" @keydown=${this.handleSwatchKeyDown}>
          ${Ct.map((i,a)=>{const n=o(`geometry.room.color.${i.id}`);return u`
              <button
                type="button"
                role="radio"
                class="color-swatch"
                style=${`--swatch-color: ${i.color}`}
                aria-checked=${a===e?"true":"false"}
                aria-label=${n}
                title=${n}
                tabindex=${a===t?0:-1}
                @click=${()=>this.color=i.color}
              ><span aria-hidden="true">${a===e?"✓":""}</span></button>
            `})}
        </div>
      </div>
    `}render(){if(!this.room)return null;const e=this.projectDefaultHeight,t=this.effectiveHeight(),i=t===null?o("geometry.room.height_invalid",{min:He(An),max:He(Pn)}):"",a=oe.computeInteriorArea(this.room.polygon,this.walls),n=a.axisAreaM2>0?a.axisAreaM2:this.room.areaM2,s=a.matchedEdges>0,l=s?a.areaM2:n,c=t===null?"--":Li(l*t),d=i?"room-height-unit room-height-error":"room-height-unit";return u`
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="room-modal-title" tabindex="-1">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon" aria-hidden="true">${this.room.icon||"🏡"}</span>
            <h2 class="modal-title" id="room-modal-title">${o("geometry.room.title")}</h2>
          </div>
          <button
            type="button"
            class="btn-close"
            aria-label=${o("geometry.close")}
            title=${o("geometry.close")}
            @click=${this.close}
          ><span aria-hidden="true">✕</span></button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label class="form-label" for="room-name">${o("geometry.room.name_label")}</label>
            <input
              id="room-name"
              type="text"
              class="form-input"
              maxlength=${_r}
              .value=${this.name}
              @input=${p=>this.name=p.target.value}
            />
          </div>

          ${this.renderAreaField()}

          <!-- Hauteur sous plafond 3D -->
          <div class="form-group">
            <label class="form-label" for="room-height">${o("geometry.room.height_label")}</label>
            <label class="check-row">
              <input type="checkbox" .checked=${this.inheritHeight} @change=${this.handleInheritChange} />
              <span>${o("geometry.room.height_inherit",{height:He(e)})}</span>
            </label>
            <div class="height-input-row">
              <input
                id="room-height"
                type="text"
                inputmode="decimal"
                autocomplete="off"
                class="big-input height-input ${i?"invalid":""}"
                aria-invalid=${i?"true":"false"}
                aria-describedby=${d}
                ?disabled=${this.inheritHeight}
                .value=${this.inheritHeight?He(e):this.heightText}
                @input=${p=>this.heightText=p.target.value}
              />
              <span class="unit-tag" id="room-height-unit">${o("geometry.meters")}</span>
            </div>
            ${i?u`<span class="field-error" id="room-height-error" role="alert">${i}</span>`:null}

            <!-- Préréglages rapides -->
            <div class="presets-row" role="group" aria-label=${o("geometry.room.height_presets")}>
              ${Ms.map(p=>u`
                <button
                  type="button"
                  class="preset-pill"
                  aria-pressed=${!this.inheritHeight&&t!==null&&Math.abs(t-p.val)<.005?"true":"false"}
                  @click=${()=>this.selectPreset(p.val)}
                >
                  ${o("geometry.room.height_preset",{height:He(p.val),name:o(`geometry.room.preset.${p.id}`)})}
                </button>
              `)}
            </div>
          </div>

          <!-- Résumé Surface & Volume -->
          <div class="metrics-summary">
            <div class="metric-item">
              <span class="metric-label">${o(s?"geometry.room.surface_interior":"geometry.room.surface_axis")}</span>
              <span class="metric-val">${o("geometry.value_m2",{value:Li(l)})}</span>
              <span class="metric-sub">${s?o("geometry.room.surface_axis_detail",{area:Li(n)}):o("geometry.room.surface_not_deducted")}</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">${o("geometry.room.volume")}</span>
              <span class="metric-val">${o("geometry.value_m3",{value:c})}</span>
            </div>
          </div>

          <!-- Couleur de sol -->
          ${this.renderColorField()}
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-delete" @click=${this.deleteRoom}>
            <span aria-hidden="true">🗑️</span> ${o("geometry.room.delete")}
          </button>
          <div class="footer-actions">
            <button type="button" class="btn-cancel" @click=${this.close}>${o("geometry.cancel")}</button>
            <button type="button" class="btn-primary" ?disabled=${t===null} @click=${this.save}>
              <span aria-hidden="true">💾</span> ${o("geometry.room.save")}
            </button>
          </div>
        </div>
      </div>
    `}};Ta.styles=[ze,xa,he`
    .modal-card {
      width: 460px;
    }

    .modal-header {
      padding: 16px 20px;
    }

    .modal-icon {
      font-size: 1.5rem;
    }

    .modal-title {
      font-size: 1.1rem;
    }

    .modal-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      overflow-y: auto;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--arch-ui-text);
    }

    .form-input,
    .form-select {
      background: var(--arch-ui-bg);
      border: 1px solid var(--modal-field-border);
      border-radius: 8px;
      color: var(--arch-ui-text);
      padding: 8px 12px;
      font: inherit;
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .form-input:focus,
    .form-select:focus {
      border-color: var(--modal-accent-text);
      box-shadow: var(--arch-ui-focus-ring);
    }

    .height-input-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .height-input {
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 1.15rem;
    }

    .height-input:disabled {
      opacity: 0.55;
      border-color: var(--modal-field-border);
      cursor: not-allowed;
    }

    .unit-tag {
      font-size: 0.95rem;
    }

    .presets-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }

    .preset-pill {
      background: transparent;
      border: 1px solid var(--modal-field-border);
      border-radius: 6px;
      color: var(--arch-ui-text);
      font: inherit;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 4px 8px;
      cursor: pointer;
      transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    }

    .preset-pill:hover {
      background: var(--modal-accent-soft);
      border-color: var(--modal-accent-text);
    }

    .preset-pill[aria-pressed='true'] {
      background: var(--modal-accent-fill);
      border-color: var(--modal-accent-fill);
      color: var(--arch-ui-accent-text);
    }

    .metrics-summary {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 10px 14px;
    }

    .metric-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .metric-label {
      font-size: 0.74rem;
    }

    .metric-val {
      font-size: 1.1rem;
    }

    .metric-sub {
      font-size: 0.72rem;
      color: var(--arch-ui-text-muted);
    }

    .colors-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .color-swatch {
      width: 32px;
      height: 32px;
      padding: 0;
      border-radius: 8px;
      cursor: pointer;
      /* Teinte translucide posée sur le fond du plan, comme sur le canevas. */
      background: linear-gradient(var(--swatch-color), var(--swatch-color)), var(--arch-ui-bg);
      border: 1px solid var(--modal-field-border);
      color: var(--arch-ui-text);
      font-size: 0.95rem;
      font-weight: 800;
      line-height: 1;
      transition: transform 0.15s ease, border-color 0.15s ease;
    }

    .color-swatch:hover {
      transform: scale(1.1);
    }

    .color-swatch[aria-checked='true'] {
      transform: scale(1.1);
      border: 2px solid var(--modal-accent-text);
    }

    .form-hint {
      font-size: 0.75rem;
      color: var(--arch-ui-text-muted);
    }

    .modal-footer {
      padding: 14px 20px;
      justify-content: space-between;
    }

    .btn-delete {
      background: transparent;
      color: var(--modal-danger-text);
      border: 1px solid var(--modal-danger-text);
      border-radius: 8px;
      padding: 7px 12px;
      font: inherit;
      font-size: 0.82rem;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      transition: background 0.2s ease, color 0.2s ease;
    }

    .btn-delete:hover {
      background: var(--modal-danger-fill);
      border-color: var(--modal-danger-fill);
      color: var(--arch-ui-accent-text);
    }

    .footer-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  `];let ye=Ta;Xe([L({attribute:!1})],ye.prototype,"room");Xe([L({attribute:!1})],ye.prototype,"hass");Xe([L({type:Number})],ye.prototype,"defaultCeilingHeight");Xe([L({attribute:!1})],ye.prototype,"walls");Xe([k()],ye.prototype,"name");Xe([k()],ye.prototype,"heightText");Xe([k()],ye.prototype,"inheritHeight");Xe([k()],ye.prototype,"areaId");Xe([k()],ye.prototype,"color");Ae("home-architect-room-modal",ye);et("fr",{"import.common.close":"Fermer","import.common.cancel":"Annuler","import.common.recommended":"Recommandé","import.common.meters":"mètres","import.unit.kb":"{value} Ko","import.unit.mb":"{value} Mo","import.title":"Importer & Interpréter un plan","import.subtitle":"SVG (vectoriel intelligent), PNG, JPEG, WebP, ou sauvegarde de projet (.json)","import.drop.region":"Zone de dépôt du plan","import.drop.title":"Glissez-déposez votre plan ici","import.drop.formats":"SVG (vectorisation automatique en murs 3D), PNG, JPEG, WebP — ou sauvegarde de projet (.json)","import.drop.choose_file":"Choisir un fichier","import.drop.paste":"Coller (Ctrl+V)","import.source.replace":"Remplacer le fichier","import.source.backup_badge":"Sauvegarde de projet","import.source.svg_badge":"SVG Vectoriel","import.source.preview_alt":"Aperçu du plan","import.source.raster_size":"{width} × {height} px · {size}","import.source.raster_size_recompressed":"{width} × {height} px · {size} (fichier d'origine : {original})","import.source.svg_frame":"Repère du plan : {width} × {height} unités · {size}","import.name.dropped":"Plan déposé","import.name.pasted_svg":"Plan SVG collé","import.name.pasted_image":"Image collée","import.name.imported":"Plan importé","import.name.clipboard_file":"presse-papier","import.preview.aria":"Aperçu du plan et des éléments détectés","import.preview.legend":"Légende de l'aperçu","import.element.walls":"Murs","import.element.doors":"Portes","import.element.windows":"Fenêtres","import.element.rooms":"Pièces","import.element.labels":"Noms","import.legend.footprint":"Emprise de la largeur saisie","import.svg.title":"Interprétation Vectorielle Intelligente SVG","import.svg.subtitle":"Transformez directement les lignes et courbes de votre SVG en éléments réels","import.svg.detection_failed":"La reconnaissance du plan a échoué.","import.svg.mode_group":"Mode d'import du SVG","import.svg.vectorize_title":"Convertir en Murs, Portes, Fenêtres & Pièces 3D","import.svg.vectorize_desc":"Génère instantanément les murs, baies, ouvertures et pièces prêts pour l'affichage 2D et 3D.","import.svg.keep_background":"Conserver également le tracé SVG original en filigrane sous le plan","import.svg.too_heavy_for_background":"SVG trop lourd ({size}) pour servir de calque de fond (maximum {max}).","import.svg.background_title":"Calque de fond simple (Décalque manuel)","import.svg.background_desc":"Affiche le SVG comme une image en arrière-plan pour tracer les murs manuellement.","import.categories.title":"Éléments à importer :","import.categories.openings_need_walls":"Les portes et fenêtres ne sont importées qu'avec les murs qui les portent.","import.layers.title":"Calques et groupes pris en compte :","import.notes.measurement_lines_one":"{count} ligne de cotation / pointillés a été automatiquement ignorée (non transformée en mur).","import.notes.measurement_lines_other":"{count} lignes de cotation / pointillés ont été automatiquement ignorées (non transformées en murs).","import.notes.ignored_rooms_one":"{count} forme écartée des pièces : {list}","import.notes.ignored_rooms_other":"{count} formes écartées des pièces : {list}","import.notes.ignored_unnamed":"forme sans nom","import.notes.ignored_self_intersecting":"{name} (contour qui se recoupe)","import.notes.ignored_area":"{name} ({area} m²)","import.notes.truncated":"Plan très volumineux : seule une partie du fichier a été analysée.","import.project.level":"Niveau : {level}","import.project.background":"Image de fond","import.project.new_plan_note":"Le plan sera ouvert comme un nouveau plan (nouvel identifiant) : aucun plan existant n'est écrasé. Enregistrez-le ensuite pour le conserver.","import.project.dropped_background":"La sauvegarde ne contient pas l'image de fond (indisponible lors de l'export) : le plan sera importé sans fond.","import.count.walls_one":"{count} mur","import.count.walls_other":"{count} murs","import.count.openings_one":"{count} ouverture","import.count.openings_other":"{count} ouvertures","import.count.rooms_one":"{count} pièce","import.count.rooms_other":"{count} pièces","import.count.furniture_one":"{count} meuble","import.count.furniture_other":"{count} meubles","import.count.entities_one":"{count} entité","import.count.entities_other":"{count} entités","import.scale.title":"Échelle du plan (Mètres réels)","import.scale.vectorize_desc":"Largeur réelle du bâtiment, murs extérieurs compris : elle s'applique à l'emprise des murs détectés, pas aux marges ni au cartouche de la page.","import.scale.building_width":"Largeur du bâtiment :","import.scale.image_width":"Largeur de l'image entière :","import.scale.auto_svg_title":"Étalonnage par la largeur du bâtiment","import.scale.auto_raster_title":"Étalonnage par la largeur de l'image","import.scale.auto_svg_desc":"Indiquez la largeur réelle du bâtiment : elle s'applique à l'emprise des murs détectés, pas aux marges de la page.","import.scale.auto_raster_desc":"Indiquez la largeur réelle couverte par toute l'image, marges comprises. Si le plan a des marges, un cartouche ou des cotes autour, préférez la mesure d'un mur.","import.scale.measure_title":"Étalonnage assisté par mesure de mur","import.scale.measure_desc":"Vous tracerez un segment directement sur un mur mesuré du plan (ex : 3,50 m) pour étalonner avec précision.","import.width.empty":"Indiquez une largeur en mètres.","import.width.not_number":"Saisissez un nombre (ex. 12,5).","import.width.range":"La largeur doit être comprise entre {min} et {max} m.","import.footprint.walls":"emprise des murs détectés","import.footprint.content":"emprise du dessin (aucun mur détecté)","import.footprint.page":"page entière","import.footprint.info":"Référence : {reference} — {width} × {height} m","import.footprint.info_pending":"Référence : {reference} — {width} × {height} m (mise à jour…)","import.opacity.label":"Opacité du fond :","import.confirm.project":"Importer le projet","import.confirm.vectorize":"Convertir le plan SVG ({walls})","import.confirm.load":"Charger le plan","import.blocker.nothing_selected":"Aucun élément sélectionné à importer.","import.blocker.svg_too_heavy":"SVG trop lourd pour servir de calque de fond : seule la conversion en murs est possible.","import.busy.reading":"Lecture du fichier…","import.busy.compressing":"Compression de l'image…","import.busy.analyzing":"Analyse du plan SVG…","import.busy.detecting":"Reconnaissance des murs, ouvertures et pièces…","import.hint.clipboard_empty":"Le presse-papier ne contient ni image ni code SVG. Copiez votre plan puis appuyez sur Ctrl+V (Cmd+V sur Mac).","import.hint.clipboard_denied":"Accès au presse-papier refusé par le navigateur : appuyez directement sur Ctrl+V (Cmd+V sur Mac) pour coller votre plan.","import.error.json_syntax":"Fichier JSON illisible (syntaxe invalide).","import.error.not_backup":"Ce fichier JSON n'est pas une sauvegarde de projet Home Architect.","import.error.svg_file_too_large":"Fichier SVG trop volumineux ({size} ; maximum {max}).","import.error.svg_code_too_large":"Code SVG trop volumineux (maximum {max}).","import.error.backup_too_large":"Sauvegarde trop volumineuse ({size} ; maximum {max}).","import.error.image_too_large":"Image trop volumineuse ({size} ; maximum {max}).","import.error.image_too_heavy":"Image trop lourde même après compression ({size} ; maximum {max}).","import.error.image_unreadable":"Image illisible ou format non pris en charge.","import.error.read_failed":"Lecture du fichier impossible.","import.error.pdf":"Les fichiers PDF ne sont pas pris en charge : exportez le plan en SVG (vectoriel), PNG ou JPEG depuis votre logiciel.","import.error.unsupported":"Format de fichier non pris en charge. Formats acceptés : SVG, PNG, JPEG, WebP, GIF, ou sauvegarde de projet (.json).","import.error.invalid_svg":"Fichier SVG invalide.","import.parser.room_generic":"Pièce {n}","import.parser.outside_layers":"Éléments hors calque","import.parser.group_generic":"Groupe {n}","import.parser.invalid_svg_detail":"Fichier SVG invalide : {detail}","import.parser.no_root":"Aucune balise <svg> racine dans le document.","import.parser.failed":"Erreur d'interprétation : {detail}","import.parser.invalid_scale":"échelle invalide","import.calibrate.title":"Étalonnage de l'Échelle","import.calibrate.desc":"Indiquez la longueur réelle exacte du segment que vous venez de tracer sur votre plan.","import.calibrate.length_label":"Longueur réelle mesurée :","import.calibrate.segment":"Segment tracé : {length} m à l'échelle actuelle","import.calibrate.segment_unknown":"Segment tracé : --","import.calibrate.factor":"Facteur appliqué : × {factor}","import.calibrate.apply":"Appliquer l'échelle","import.calibrate.error.segment":"Le segment tracé est invalide : recommencez la mesure sur le plan.","import.calibrate.error.scale":"L'échelle actuelle du plan est invalide.","import.calibrate.error.not_number":"Saisissez une longueur en mètres (ex. 3,50).","import.calibrate.error.range":"La longueur doit être comprise entre {min} et {max} m.","import.calibrate.error.out_of_bounds":"Échelle hors limites (facteur ×{factor}) : la longueur est-elle bien en mètres ?","import.calibrate.mode.title":"Que faut-il mettre à l'échelle ?","import.calibrate.mode.project":"Tout le plan","import.calibrate.mode.project_desc":"Murs, pièces, ouvertures, meubles, entités et calque de fond changent d'échelle ensemble : ce qui a été décalqué reste superposé au fond.","import.calibrate.mode.background":"Le calque de fond seulement","import.calibrate.mode.background_desc":"Les éléments déjà tracés gardent leurs dimensions ; seule l'image de fond est agrandie ou réduite.","import.calibrate.mode.no_background":"Le plan n'a pas de calque de fond : tous ses éléments seront mis à l'échelle.","import.calibrate.mode.empty_plan":"Le plan ne contient encore aucun élément : seul le calque de fond est mis à l'échelle."});et("en",{"import.common.close":"Close","import.common.cancel":"Cancel","import.common.recommended":"Recommended","import.common.meters":"meters","import.unit.kb":"{value} KB","import.unit.mb":"{value} MB","import.title":"Import & interpret a floor plan","import.subtitle":"SVG (smart vector), PNG, JPEG, WebP, or project backup (.json)","import.drop.region":"Floor plan drop zone","import.drop.title":"Drag and drop your floor plan here","import.drop.formats":"SVG (automatic conversion into 3D walls), PNG, JPEG, WebP — or a project backup (.json)","import.drop.choose_file":"Choose a file","import.drop.paste":"Paste (Ctrl+V)","import.source.replace":"Replace file","import.source.backup_badge":"Project backup","import.source.svg_badge":"Vector SVG","import.source.preview_alt":"Floor plan preview","import.source.raster_size":"{width} × {height} px · {size}","import.source.raster_size_recompressed":"{width} × {height} px · {size} (original file: {original})","import.source.svg_frame":"Plan coordinates: {width} × {height} units · {size}","import.name.dropped":"Dropped plan","import.name.pasted_svg":"Pasted SVG plan","import.name.pasted_image":"Pasted image","import.name.imported":"Imported plan","import.name.clipboard_file":"clipboard","import.preview.aria":"Preview of the plan and the detected elements","import.preview.legend":"Preview legend","import.element.walls":"Walls","import.element.doors":"Doors","import.element.windows":"Windows","import.element.rooms":"Rooms","import.element.labels":"Names","import.legend.footprint":"Extent of the entered width","import.svg.title":"Smart SVG vector interpretation","import.svg.subtitle":"Turn the lines and curves of your SVG directly into real plan elements","import.svg.detection_failed":"Plan recognition failed.","import.svg.mode_group":"SVG import mode","import.svg.vectorize_title":"Convert into 3D walls, doors, windows & rooms","import.svg.vectorize_desc":"Instantly generates walls, bays, openings and rooms, ready for 2D and 3D display.","import.svg.keep_background":"Also keep the original SVG drawing as a faint layer under the plan","import.svg.too_heavy_for_background":"SVG too large ({size}) to be used as a background layer (maximum {max}).","import.svg.background_title":"Plain background layer (manual tracing)","import.svg.background_desc":"Shows the SVG as a background image so you can trace the walls by hand.","import.categories.title":"Elements to import:","import.categories.openings_need_walls":"Doors and windows are only imported together with the walls they belong to.","import.layers.title":"Layers and groups taken into account:","import.notes.measurement_lines_one":"{count} dimension or dashed line was ignored automatically (not converted into a wall).","import.notes.measurement_lines_other":"{count} dimension or dashed lines were ignored automatically (not converted into walls).","import.notes.ignored_rooms_one":"{count} shape excluded from rooms: {list}","import.notes.ignored_rooms_other":"{count} shapes excluded from rooms: {list}","import.notes.ignored_unnamed":"unnamed shape","import.notes.ignored_self_intersecting":"{name} (self-intersecting outline)","import.notes.ignored_area":"{name} ({area} m²)","import.notes.truncated":"Very large plan: only part of the file was analyzed.","import.project.level":"Floor: {level}","import.project.background":"Background image","import.project.new_plan_note":"The plan will open as a new plan (new ID): no existing plan is overwritten. Save it afterwards to keep it.","import.project.dropped_background":"The backup does not contain the background image (it was unavailable at export time): the plan will be imported without a background.","import.count.walls_one":"{count} wall","import.count.walls_other":"{count} walls","import.count.openings_one":"{count} opening","import.count.openings_other":"{count} openings","import.count.rooms_one":"{count} room","import.count.rooms_other":"{count} rooms","import.count.furniture_one":"{count} furniture item","import.count.furniture_other":"{count} furniture items","import.count.entities_one":"{count} entity","import.count.entities_other":"{count} entities","import.scale.title":"Plan scale (real meters)","import.scale.vectorize_desc":"Real width of the building, exterior walls included: it applies to the extent of the detected walls, not to the page margins or title block.","import.scale.building_width":"Building width:","import.scale.image_width":"Width of the whole image:","import.scale.auto_svg_title":"Calibrate from the building width","import.scale.auto_raster_title":"Calibrate from the image width","import.scale.auto_svg_desc":"Enter the real width of the building: it applies to the extent of the detected walls, not to the page margins.","import.scale.auto_raster_desc":"Enter the real width covered by the whole image, margins included. If the plan has margins, a title block or dimensions around it, measuring a wall is more accurate.","import.scale.measure_title":"Guided calibration by measuring a wall","import.scale.measure_desc":"You will draw a line directly over a wall of known length on the plan (e.g. 3.50 m) for an accurate calibration.","import.width.empty":"Enter a width in meters.","import.width.not_number":"Enter a number (e.g. 12.5).","import.width.range":"The width must be between {min} and {max} m.","import.footprint.walls":"extent of the detected walls","import.footprint.content":"extent of the drawing (no walls detected)","import.footprint.page":"whole page","import.footprint.info":"Reference: {reference} — {width} × {height} m","import.footprint.info_pending":"Reference: {reference} — {width} × {height} m (updating…)","import.opacity.label":"Background opacity:","import.confirm.project":"Import project","import.confirm.vectorize":"Convert SVG plan ({walls})","import.confirm.load":"Load plan","import.blocker.nothing_selected":"No elements selected for import.","import.blocker.svg_too_heavy":"SVG too large to be used as a background layer: only conversion into walls is possible.","import.busy.reading":"Reading file…","import.busy.compressing":"Compressing image…","import.busy.analyzing":"Analyzing SVG plan…","import.busy.detecting":"Detecting walls, openings and rooms…","import.hint.clipboard_empty":"The clipboard contains neither an image nor SVG code. Copy your plan, then press Ctrl+V (Cmd+V on Mac).","import.hint.clipboard_denied":"The browser denied access to the clipboard: press Ctrl+V (Cmd+V on Mac) directly to paste your plan.","import.error.json_syntax":"Unreadable JSON file (invalid syntax).","import.error.not_backup":"This JSON file is not a Home Architect project backup.","import.error.svg_file_too_large":"SVG file too large ({size}; maximum {max}).","import.error.svg_code_too_large":"SVG code too large (maximum {max}).","import.error.backup_too_large":"Backup too large ({size}; maximum {max}).","import.error.image_too_large":"Image too large ({size}; maximum {max}).","import.error.image_too_heavy":"Image still too large after compression ({size}; maximum {max}).","import.error.image_unreadable":"Unreadable image or unsupported format.","import.error.read_failed":"The file could not be read.","import.error.pdf":"PDF files are not supported: export the plan as SVG (vector), PNG or JPEG from your software.","import.error.unsupported":"Unsupported file format. Accepted formats: SVG, PNG, JPEG, WebP, GIF, or a project backup (.json).","import.error.invalid_svg":"Invalid SVG file.","import.parser.room_generic":"Room {n}","import.parser.outside_layers":"Elements outside layers","import.parser.group_generic":"Group {n}","import.parser.invalid_svg_detail":"Invalid SVG file: {detail}","import.parser.no_root":"No root <svg> element in the document.","import.parser.failed":"Interpretation error: {detail}","import.parser.invalid_scale":"invalid scale","import.calibrate.title":"Scale calibration","import.calibrate.desc":"Enter the exact real length of the line you just drew on your plan.","import.calibrate.length_label":"Measured real length:","import.calibrate.segment":"Drawn line: {length} m at the current scale","import.calibrate.segment_unknown":"Drawn line: --","import.calibrate.factor":"Applied factor: × {factor}","import.calibrate.apply":"Apply scale","import.calibrate.error.segment":"The drawn line is invalid: measure again on the plan.","import.calibrate.error.scale":"The plan's current scale is invalid.","import.calibrate.error.not_number":"Enter a length in meters (e.g. 3.50).","import.calibrate.error.range":"The length must be between {min} and {max} m.","import.calibrate.error.out_of_bounds":"Scale out of range (factor ×{factor}): is the length really in meters?","import.calibrate.mode.title":"What should be scaled?","import.calibrate.mode.project":"The whole plan","import.calibrate.mode.project_desc":"Walls, rooms, openings, furniture, entities and the background layer are scaled together: what was traced stays aligned with the background.","import.calibrate.mode.background":"The background layer only","import.calibrate.mode.background_desc":"Elements already drawn keep their dimensions; only the background image is enlarged or reduced.","import.calibrate.mode.no_background":"The plan has no background layer: all of its elements will be scaled.","import.calibrate.mode.empty_plan":"The plan has no elements yet: only the background layer will be scaled."});var Es=Object.defineProperty,tt=(r,e,t,i)=>{for(var a=void 0,n=r.length-1,s;n>=0;n--)(s=r[n])&&(a=s(e,t,a)||a);return a&&Es(e,t,a),a};const kr=.05,$r=1e3,zs=.01,As=100,Ps=5,Rs=2e3,Os=["button:not([disabled])",'input:not([disabled]):not([type="hidden"])',"select:not([disabled])","textarea:not([disabled])","a[href]",'[tabindex]:not([tabindex="-1"])'].join(", ");function js(r){const e=r.trim().replace(",",".");if(e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function Fi(r){return R(r,{maximumFractionDigits:3})}function Ls(){let r=document.activeElement;for(;r?.shadowRoot?.activeElement;)r=r.shadowRoot.activeElement;return r instanceof HTMLElement&&r!==document.body?r:null}const Ia=class Ia extends De{constructor(){super(...arguments),this.worldDistance=0,this.pixelDistance=0,this.defaultMeters=4,this.pixelsPerMeter=50,this.hasGeometry=!1,this.hasBackground=!0,this.metersText="",this.mode="background",this.i18n=new Ee(this),this.hassRef=void 0,this.modeChosen=!1,this.returnFocusTo=null,this.handleKeyDown=e=>{if(e.stopPropagation(),e.key==="Escape"){if(e.isComposing)return;e.preventDefault(),this.handleClose()}else if(e.key==="Tab")this.trapFocus(e);else if(e.key==="Enter"&&!e.isComposing){const t=Ge(e);t instanceof HTMLInputElement&&t.type==="text"&&(e.preventDefault(),this.handleApply())}}}get hass(){return this.hassRef}set hass(e){this.hassRef=e,e&&Ke(this,e)}connectedCallback(){super.connectedCallback(),this.returnFocusTo=Ls(),this.addEventListener("keydown",this.handleKeyDown)}disconnectedCallback(){this.removeEventListener("keydown",this.handleKeyDown),super.disconnectedCallback();const e=this.returnFocusTo;this.returnFocusTo=null,e?.isConnected&&e.focus({preventScroll:!0})}willUpdate(e){if(e.has("defaultMeters")){const t=this.defaultMeters;this.metersText=Number.isFinite(t)&&t>0?R(t,{maximumFractionDigits:3,useGrouping:!1}):""}!this.modeChosen&&(e.has("hasGeometry")||e.has("hasBackground"))&&(this.mode=this.defaultMode())}firstUpdated(){const e=this.renderRoot.querySelector(".meters-input");e?.focus(),e?.select()}defaultMode(){return this.hasGeometry?"project":"background"}get modeSelectable(){return this.hasGeometry&&this.hasBackground}get effectiveMode(){return this.modeSelectable?this.mode:this.hasGeometry?"project":"background"}trapFocus(e){const t=this.renderRoot.querySelector(".modal-card");if(!t)return;const i=Array.from(t.querySelectorAll(Os)).filter(l=>l.getClientRects().length>0),a=this.renderRoot.activeElement;if(i.length===0){e.preventDefault(),t.focus();return}const n=i[0],s=i[i.length-1];e.shiftKey&&(a===n||a===t||!a)?(e.preventDefault(),s.focus()):!e.shiftKey&&(a===s||!a)&&(e.preventDefault(),n.focus())}get measuredMeters(){if(Number.isFinite(this.worldDistance)&&this.worldDistance>0)return this.worldDistance;const e=this.pixelDistance,t=this.pixelsPerMeter;return Number.isFinite(e)&&e>0&&Number.isFinite(t)&&t>0?e/t:0}evaluate(){const e=this.measuredMeters;if(!(Number.isFinite(e)&&e>0))return{value:null,error:o("import.calibrate.error.segment")};const t=this.pixelsPerMeter;if(!(Number.isFinite(t)&&t>0))return{value:null,error:o("import.calibrate.error.scale")};const i=js(this.metersText);if(i===null)return{value:null,error:this.metersText.trim()===""?"":o("import.calibrate.error.not_number")};if(i<kr||i>$r)return{value:null,error:o("import.calibrate.error.range",{min:Fi(kr),max:Fi($r)})};const a=i/e,n=t/a;return a<zs||a>As||n<Ps||n>Rs?{value:null,error:o("import.calibrate.error.out_of_bounds",{factor:R(a,{maximumSignificantDigits:3})})}:{value:{realMeters:i,factor:a,pixelsPerMeter:n},error:""}}handleApply(){const{value:e}=this.evaluate();e&&this.dispatchEvent(new CustomEvent("calibrate-confirmed",{detail:{pixelsPerMeter:e.pixelsPerMeter,mode:this.effectiveMode,scaleFactor:e.factor},bubbles:!0,composed:!0}))}handleClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}selectMode(e){this.mode=e,this.modeChosen=!0}renderModeChoice(){if(!this.modeSelectable)return u`
        <div class="mode-note">
          ${o(this.hasGeometry?"import.calibrate.mode.no_background":"import.calibrate.mode.empty_plan")}
        </div>
      `;const e=(t,i,a,n)=>u`
      <label class="mode-card ${this.mode===t?"selected":""}">
        <input
          type="radio"
          name="calibration-mode"
          aria-labelledby="calibrate-mode-${t}-name"
          aria-describedby="calibrate-mode-${t}-desc"
          .checked=${this.mode===t}
          @change=${()=>this.selectMode(t)}
        />
        <span class="mode-content">
          <span class="mode-name" id="calibrate-mode-${t}-name">
            <span aria-hidden="true">${i}</span> ${o(a)}
          </span>
          <span class="mode-desc" id="calibrate-mode-${t}-desc">${o(n)}</span>
        </span>
      </label>
    `;return u`
      <div class="mode-title" id="calibrate-mode-title">${o("import.calibrate.mode.title")}</div>
      <div class="mode-options" role="radiogroup" aria-labelledby="calibrate-mode-title">
        ${e("project","📐","import.calibrate.mode.project","import.calibrate.mode.project_desc")}
        ${e("background","🖼️","import.calibrate.mode.background","import.calibrate.mode.background_desc")}
      </div>
    `}render(){const e=this.evaluate(),t=this.measuredMeters,i=t>0,a=o("import.common.close");return u`
      <div
        class="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="calibrate-title"
        aria-describedby="calibrate-desc"
        tabindex="-1"
      >
        <div class="modal-header">
          <h2 class="modal-title" id="calibrate-title">
            <span aria-hidden="true">📏</span>
            <span>${o("import.calibrate.title")}</span>
          </h2>
          <button type="button" class="btn-close" title=${a} aria-label=${a} @click=${this.handleClose}>
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <p class="modal-desc" id="calibrate-desc">${o("import.calibrate.desc")}</p>

        <div class="input-box">
          <div class="input-row">
            <label class="input-label" for="calibrate-meters">${o("import.calibrate.length_label")}</label>
            <div class="input-field-wrapper">
              <input
                id="calibrate-meters"
                type="text"
                inputmode="decimal"
                autocomplete="off"
                class="meters-input ${e.error?"invalid":""}"
                aria-invalid=${e.error?"true":"false"}
                aria-describedby=${e.error?"calibrate-unit calibrate-error":"calibrate-unit"}
                .value=${this.metersText}
                @input=${n=>this.metersText=n.target.value}
              />
              <span class="unit-tag" id="calibrate-unit">${o("import.common.meters")}</span>
            </div>
          </div>
          ${e.error?u`<span class="field-error" id="calibrate-error">${e.error}</span>`:w}

          <div class="measured-info">
            ${i?o("import.calibrate.segment",{length:Fi(t)}):o("import.calibrate.segment_unknown")}
            ${e.value?u`<br />${o("import.calibrate.factor",{factor:R(e.value.factor,{minimumFractionDigits:3,maximumFractionDigits:3})})}`:w}
          </div>
        </div>

        ${this.renderModeChoice()}

        <div class="modal-actions">
          <button type="button" class="btn btn-cancel" @click=${this.handleClose}>${o("import.common.cancel")}</button>
          <button type="button" class="btn btn-apply" ?disabled=${!e.value} @click=${this.handleApply}>
            ${o("import.calibrate.apply")}
          </button>
        </div>

        <!-- Erreur de saisie lue par les lecteurs d'écran (région persistante) -->
        <div class="sr-only" role="status" aria-live="polite">${e.error}</div>
      </div>
    `}};Ia.styles=[ze,he`
    :host {
      --calibrate-accent-tint: rgba(3, 169, 244, 0.12);
      --calibrate-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);

      position: fixed;
      inset: 0;
      background: var(--arch-ui-overlay);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--arch-ui-font);
      color: var(--arch-ui-text);
    }

    /* Teinte de sélection dérivée de la couleur principale du thème quand le navigateur sait la mélanger. */
    @supports (color: color-mix(in srgb, red 50%, blue)) {
      :host {
        --calibrate-accent-tint: color-mix(in srgb, var(--arch-ui-accent) 12%, transparent);
      }
    }

    .modal-card {
      width: 90%;
      max-width: 460px;
      max-height: 92vh;
      overflow-y: auto;
      background: var(--arch-ui-surface);
      color: var(--arch-ui-text);
      border: 1px solid var(--arch-ui-border);
      border-radius: var(--arch-ui-radius);
      box-shadow: var(--calibrate-shadow);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      animation: popIn 0.2s ease-out;
    }

    .modal-card:focus,
    .modal-card:focus-visible {
      outline: none;
      box-shadow: var(--calibrate-shadow);
    }

    @keyframes popIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      border-bottom: 1px solid var(--arch-ui-border);
      padding-bottom: 12px;
    }

    .modal-title {
      font-size: 1.15rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--arch-ui-text);
      margin: 0;
    }

    button {
      font-family: inherit;
    }

    .btn-close {
      flex: none;
      border: none;
      background: transparent;
      color: var(--arch-ui-text-muted);
      font-size: 18px;
      line-height: 1;
      cursor: pointer;
      border-radius: 6px;
      padding: 6px;
    }

    .btn-close:hover {
      color: var(--arch-ui-text);
      background: var(--arch-ui-surface-2);
    }

    .modal-desc {
      font-size: 0.85rem;
      color: var(--arch-ui-text-muted);
      line-height: 1.4;
      margin: 0;
    }

    .input-box {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 12px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .input-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }

    .input-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--arch-ui-text);
    }

    .input-field-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .unit-tag {
      font-weight: 600;
      color: var(--arch-ui-text-muted);
    }

    .meters-input {
      background: var(--arch-ui-surface);
      border: 1px solid var(--arch-ui-accent);
      color: var(--arch-ui-text);
      padding: 8px 12px;
      border-radius: 8px;
      font: inherit;
      font-size: 1rem;
      font-weight: 700;
      width: 100px;
      text-align: center;
      outline: none;
    }

    .meters-input:focus {
      box-shadow: var(--arch-ui-focus-ring);
    }

    .meters-input.invalid {
      border-color: var(--arch-ui-danger);
    }

    .field-error {
      color: var(--arch-ui-text);
      font-size: 0.8rem;
      font-weight: 600;
      padding-left: 8px;
      border-left: 3px solid var(--arch-ui-danger);
    }

    .measured-info {
      font-size: 0.75rem;
      color: var(--arch-ui-text-muted);
      font-family: ui-monospace, SFMono-Regular, monospace;
      line-height: 1.5;
    }

    .mode-title {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .mode-options {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .mode-card {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 10px 12px;
      cursor: pointer;
      display: flex;
      gap: 10px;
      align-items: flex-start;
      transition: border-color 0.2s ease, background-color 0.2s ease;
    }

    .mode-card:hover {
      border-color: var(--arch-ui-accent);
    }

    .mode-card.selected {
      border-color: var(--arch-ui-accent);
      background: var(--calibrate-accent-tint);
      box-shadow: inset 0 0 0 1px var(--arch-ui-accent);
    }

    .mode-card input {
      margin-top: 3px;
      accent-color: var(--arch-ui-accent);
      cursor: pointer;
    }

    .mode-content {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .mode-name {
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--arch-ui-text);
    }

    .mode-desc,
    .mode-note {
      font-size: 0.78rem;
      color: var(--arch-ui-text-muted);
      line-height: 1.35;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      flex-wrap: wrap;
    }

    .btn {
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease, filter 0.2s ease;
      border: 1px solid transparent;
    }

    .btn-cancel {
      background: transparent;
      color: var(--arch-ui-text);
      border-color: var(--arch-ui-border);
    }

    .btn-cancel:hover {
      background: var(--arch-ui-surface-2);
    }

    .btn-apply {
      background: var(--arch-ui-accent);
      color: var(--arch-ui-accent-text);
      border-color: var(--arch-ui-accent);
    }

    .btn-apply:hover:not(:disabled) {
      filter: brightness(1.08);
    }

    .btn-apply:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /*
     * Région annoncée aux lecteurs d'écran, toujours présente : une région live insérée avec son texte
     * n'est pas lue de façon fiable. Hors du flux (position absolue) : elle ne crée aucun espacement.
     */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      border: 0;
      overflow: hidden;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      white-space: nowrap;
    }

    /* Anneau de focus en contour pour les boutons radio natifs (certains navigateurs ignorent leur ombre). */
    .mode-card input:focus-visible {
      outline: 2px solid var(--arch-ui-accent);
      outline-offset: 2px;
      box-shadow: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .modal-card {
        animation: none;
      }
    }
  `];let Ie=Ia;tt([L({type:Number})],Ie.prototype,"worldDistance");tt([L({type:Number})],Ie.prototype,"pixelDistance");tt([L({type:Number})],Ie.prototype,"defaultMeters");tt([L({type:Number})],Ie.prototype,"pixelsPerMeter");tt([L({type:Boolean})],Ie.prototype,"hasGeometry");tt([L({type:Boolean})],Ie.prototype,"hasBackground");tt([k()],Ie.prototype,"metersText");tt([k()],Ie.prototype,"mode");Ae("home-architect-calibrate-modal",Ie);var Fs=Object.defineProperty,ke=(r,e,t,i)=>{for(var a=void 0,n=r.length-1,s;n>=0;n--)(s=r[n])&&(a=s(e,t,a)||a);return a&&Fs(e,t,a),a};const Rn=.01,On=100,Sr=10;function oa(r){return Number.isFinite(r)&&r>=Rn&&r<=On}function Ns(r){return r>Sr||r<1/Sr}function Bs(r){const e=r.trim().replace(",",".");if(e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function jn(r){return new Intl.PluralRules(Ye()).select(r)==="one"?"one":"other"}function Tt(r,e){return o(`geometry.count.${r}.${jn(e)}`,{count:R(e)})}function ut(r,e){const[t,i=""]=o(r).split("{subject}");return u`${t}<strong>${e}</strong>${i}`}function Mr(r){return R(r,{minimumFractionDigits:2,maximumFractionDigits:2})}const Da=class Da extends De{constructor(){super(...arguments),this.measuredMeters=0,this.wallCount=0,this.roomCount=0,this.openingCount=0,this.furnitureCount=0,this.bindingCount=0,this.targetText="",this.adjustBackground=!0,this.scaleElements=!0,this.unusualConfirmed=!1,this.i18n=new Ee(this),this.focusTrap=new va(this),this.handleKeyDown=e=>{if(e.stopPropagation(),e.key==="Escape")e.preventDefault(),this.close();else if(e.key==="Tab")this.focusTrap.trapTab(e);else if(e.key==="Enter"&&!e.isComposing){const t=Ge(e);t instanceof HTMLInputElement&&t.type==="text"&&(e.preventDefault(),this.confirm())}}}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",this.handleKeyDown)}disconnectedCallback(){this.removeEventListener("keydown",this.handleKeyDown),super.disconnectedCallback()}shouldUpdate(e){return e.has("hass")?(Ke(this,this.hass),e.size>1||e.get("hass")===void 0):!0}willUpdate(e){if(e.has("measuredMeters")){const t=this.measuredMeters;this.targetText=Number.isFinite(t)&&t>0?R(t,{maximumFractionDigits:3,useGrouping:!1}):"",this.unusualConfirmed=!1}}firstUpdated(){const e=this.renderRoot.querySelector("#rescale-target");e?.focus(),e?.select()}get backgroundOptionVisible(){return this.hasBackground!==!1}handleInputChange(e){this.targetText=e.target.value,this.unusualConfirmed=!1}evaluate(){const e=this.measuredMeters;if(!(Number.isFinite(e)&&e>0))return{target:null,factor:null,error:o("geometry.rescale.error_measured"),unusual:!1};const t=Bs(this.targetText);if(t===null)return{target:null,factor:null,error:this.targetText.trim()===""?"":o("geometry.rescale.error_number",{example:R(4.25)}),unusual:!1};if(t<=0)return{target:t,factor:null,error:o("geometry.rescale.error_positive"),unusual:!1};const i=t/e;return oa(i)?{target:t,factor:i,error:"",unusual:Ns(i)}:{target:t,factor:null,error:o("geometry.rescale.error_range",{factor:R(i,{maximumSignificantDigits:3}),min:R(Rn),max:R(On)}),unusual:!1}}isConfirmable(e){return e.factor!==null&&!e.error&&Math.abs(e.factor-1)>1e-4&&(!e.unusual||this.unusualConfirmed)}close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}confirm(){const e=this.evaluate();!this.isConfirmable(e)||e.target===null||e.factor===null||this.dispatchEvent(new CustomEvent("rescale-confirmed",{detail:{currentMeters:this.measuredMeters,targetMeters:e.target,scaleFactor:e.factor,adjustBackground:this.backgroundOptionVisible&&this.adjustBackground,scaleElements:this.scaleElements},bubbles:!0,composed:!0}))}renderScaleElementsImpact(){return u`
      <label class="check-row">
        <input
          type="checkbox"
          .checked=${this.scaleElements}
          @change=${e=>this.scaleElements=e.target.checked}
        />
        <span>${o("geometry.rescale.scale_elements")}</span>
      </label>
    `}renderBackgroundImpact(){return this.backgroundOptionVisible?u`
      <label class="check-row">
        <input
          type="checkbox"
          .checked=${this.adjustBackground}
          @change=${e=>this.adjustBackground=e.target.checked}
        />
        <span>${o("geometry.rescale.adjust_background")}</span>
      </label>
    `:null}renderImpact(e,t){return u`
      <li class="impact-item">
        <span class="impact-icon" aria-hidden="true">${e}</span>
        <span>${t}</span>
      </li>
    `}render(){const e=this.evaluate(),t=Number.isFinite(this.measuredMeters)&&this.measuredMeters>0,i=e.factor??1,a=R(i,{minimumFractionDigits:3,maximumFractionDigits:3}),n=R(i-1,{style:"percent",minimumFractionDigits:1,maximumFractionDigits:1,signDisplay:"exceptZero"}),s=this.isConfirmable(e),l=e.error?"rescale-unit rescale-error":"rescale-unit";return u`
      <div
        class="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rescale-title"
        aria-describedby="rescale-subtitle"
        tabindex="-1"
      >
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon" aria-hidden="true">📐</span>
            <div>
              <h2 class="modal-title" id="rescale-title">${o("geometry.rescale.title")}</h2>
              <p class="modal-subtitle" id="rescale-subtitle">${o("geometry.rescale.subtitle")}</p>
            </div>
          </div>
          <button
            type="button"
            class="btn-close"
            aria-label=${o("geometry.close")}
            title=${o("geometry.close")}
            @click=${this.close}
          ><span aria-hidden="true">✕</span></button>
        </div>

        <div class="modal-body">
          <div class="metric-compare">
            <div class="metric-box">
              <span class="metric-label">${o("geometry.rescale.measured")}</span>
              <span class="metric-val">${o("geometry.value_m",{value:t?Mr(this.measuredMeters):"--"})}</span>
            </div>
            <div class="metric-box active">
              <span class="metric-label">${o("geometry.rescale.target")}</span>
              <span class="metric-val">${o("geometry.value_m",{value:e.target!==null&&e.target>0?Mr(e.target):"--"})}</span>
            </div>
          </div>

          <div class="input-group">
            <label class="input-label" for="rescale-target">${o("geometry.rescale.input_label")}</label>
            <div class="input-row">
              <input
                id="rescale-target"
                type="text"
                inputmode="decimal"
                autocomplete="off"
                class="big-input target-input ${e.error?"invalid":""}"
                aria-invalid=${e.error?"true":"false"}
                aria-describedby=${l}
                .value=${this.targetText}
                @input=${this.handleInputChange}
              />
              <span class="unit-tag" id="rescale-unit">${o("geometry.meters")}</span>
            </div>
            ${e.error?u`<span class="field-error" id="rescale-error" role="alert">${e.error}</span>`:null}
          </div>

          <div class="ratio-indicator">
            <span class="factor-label">${o("geometry.rescale.factor_label")}</span>
            <span class="ratio-pill ${i>1.001?"ratio-expand":i<.999?"ratio-shrink":"ratio-neutral"}">
              ${o("geometry.rescale.factor_value",{ratio:a,percent:n})}
            </span>
          </div>

          ${e.unusual?u`
            <div class="warning-box" role="status">
              <span><span aria-hidden="true">⚠️</span> ${o("geometry.rescale.unusual",{ratio:a})}</span>
              <label class="check-row">
                <input
                  type="checkbox"
                  .checked=${this.unusualConfirmed}
                  @change=${c=>this.unusualConfirmed=c.target.checked}
                />
                <span>${o("geometry.rescale.confirm_unusual")}</span>
              </label>
            </div>
          `:null}

          <div class="impact-box">
            <ul class="impact-list">
              ${this.renderImpact("🧱",ut("geometry.rescale.impact.walls",Tt("walls",this.wallCount)))}
              ${this.openingCount>0?this.renderImpact("🚪",ut("geometry.rescale.impact.openings",Tt("openings",this.openingCount))):null}
              ${this.roomCount>0?this.renderImpact("🏡",ut("geometry.rescale.impact.rooms",Tt("rooms",this.roomCount))):null}
              ${this.furnitureCount>0?this.renderImpact("🛋️",ut("geometry.rescale.impact.furniture",Tt("furniture",this.furnitureCount))):null}
              ${this.bindingCount>0?this.renderImpact("⚡",ut(`geometry.rescale.impact.bindings.${jn(this.bindingCount)}`,Tt("bindings",this.bindingCount))):null}
              ${this.backgroundOptionVisible?this.renderImpact("🖼️",ut(this.adjustBackground?"geometry.rescale.impact.background_synced":"geometry.rescale.impact.background_unchanged",o("geometry.rescale.background_layer"))):null}
            </ul>
            ${this.renderScaleElementsImpact()}
            ${this.renderBackgroundImpact()}
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-cancel" @click=${this.close}>${o("geometry.cancel")}</button>
          <button type="button" class="btn-primary" ?disabled=${!s} @click=${this.confirm}>
            <span aria-hidden="true">📐</span>
            <span>${o("geometry.rescale.submit")}</span>
          </button>
        </div>
      </div>
    `}};Da.styles=[ze,xa,he`
    :host {
      --modal-success-text: color-mix(in srgb, var(--arch-ui-success) 60%, var(--arch-ui-text));
      --modal-warning-text: color-mix(in srgb, var(--arch-ui-warning) 50%, var(--arch-ui-text));
    }

    /* Navigateur sans color-mix() : texte lisible plutôt qu'un jeton invalide (voir geometryModalStyles). */
    @supports not (color: color-mix(in srgb, red 50%, blue)) {
      :host {
        --modal-success-text: var(--arch-ui-text);
        --modal-warning-text: var(--arch-ui-text);
      }
    }

    .modal-card {
      width: 480px;
    }

    .modal-header {
      padding: 18px 24px;
    }

    .modal-title-group {
      gap: 12px;
    }

    .modal-icon {
      font-size: 1.6rem;
    }

    .modal-title {
      font-size: 1.15rem;
    }

    .modal-subtitle {
      font-size: 0.8rem;
      color: var(--arch-ui-text-muted);
      margin: 2px 0 0 0;
    }

    .modal-body {
      padding: 22px 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      overflow-y: auto;
    }

    .metric-compare {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .metric-box {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 12px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .metric-box.active {
      border-color: var(--modal-accent-text);
      background: var(--modal-accent-soft);
    }

    .metric-label {
      font-size: 0.78rem;
      letter-spacing: 0.5px;
    }

    .metric-val {
      font-size: 1.3rem;
    }

    .metric-box:not(.active) .metric-val {
      color: var(--arch-ui-text);
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .input-label {
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--arch-ui-text);
    }

    .input-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .target-input {
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 1.25rem;
    }

    .unit-tag {
      font-size: 1rem;
      padding: 0 4px;
    }

    .ratio-indicator {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 0.85rem;
    }

    .factor-label {
      color: var(--arch-ui-text-muted);
    }

    .ratio-pill {
      font-size: 0.82rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 9999px;
      font-family: var(--modal-mono);
      white-space: nowrap;
      border: 1px solid transparent;
    }

    .ratio-expand {
      background: color-mix(in srgb, var(--arch-ui-success) 16%, transparent);
      color: var(--modal-success-text);
      border-color: color-mix(in srgb, var(--arch-ui-success) 45%, transparent);
    }

    .ratio-shrink {
      background: color-mix(in srgb, var(--arch-ui-warning) 16%, transparent);
      color: var(--modal-warning-text);
      border-color: color-mix(in srgb, var(--arch-ui-warning) 45%, transparent);
    }

    .ratio-neutral {
      background: var(--arch-ui-surface-2);
      color: var(--arch-ui-text-muted);
    }

    .impact-box {
      display: flex;
      flex-direction: column;
      gap: 6px;
      background: var(--arch-ui-bg);
      border-radius: 10px;
      padding: 12px 14px;
      font-size: 0.8rem;
      color: var(--arch-ui-text-muted);
    }

    .impact-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .impact-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .impact-item strong {
      color: var(--arch-ui-text);
    }

    .impact-icon {
      font-size: 1rem;
    }

    .warning-box {
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: color-mix(in srgb, var(--arch-ui-warning) 12%, transparent);
      border: 1px solid color-mix(in srgb, var(--arch-ui-warning) 45%, transparent);
      border-radius: 10px;
      padding: 10px 12px;
      font-size: 0.82rem;
      color: var(--modal-warning-text);
    }

    .modal-footer {
      padding: 16px 24px;
      justify-content: flex-end;
      gap: 12px;
    }

    .btn-cancel {
      padding: 8px 16px;
      font-size: 0.88rem;
    }

    .btn-primary {
      padding: 8px 20px;
      font-size: 0.88rem;
    }
  `];let le=Da;ke([L({type:Number})],le.prototype,"measuredMeters");ke([L({type:Number})],le.prototype,"wallCount");ke([L({type:Number})],le.prototype,"roomCount");ke([L({type:Number})],le.prototype,"openingCount");ke([L({type:Number})],le.prototype,"furnitureCount");ke([L({type:Number})],le.prototype,"bindingCount");ke([L({attribute:!1})],le.prototype,"hasBackground");ke([L({attribute:!1})],le.prototype,"hass");ke([k()],le.prototype,"targetText");ke([k()],le.prototype,"adjustBackground");ke([k()],le.prototype,"scaleElements");ke([k()],le.prototype,"unusualConfirmed");Ae("home-architect-rescale-modal",le);const sa="http://www.w3.org/2000/svg",ya={"":1,px:1,mm:96/25.4,cm:96/2.54,q:96/101.6,in:96,pt:96/72,pc:16,em:16,rem:16,ex:8},Us=/[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g,yi=/^\s*([-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?)\s*([a-zA-Z%]*)\s*$/,Hs=new Set(["defs","clippath","symbol","marker","pattern","mask","metadata","title","desc","style","script","lineargradient","radialgradient","filter","foreignobject","image","view","cursor","font","font-face"]),qs=new Set(["fill","fill-opacity","stroke","stroke-width","stroke-opacity","stroke-dasharray","stroke-dashoffset","opacity","display","visibility","font-size","text-anchor","marker","marker-start","marker-mid","marker-end","color"]),Ws=25e4,Gs=15e4,Vs=8,Ys=2e3,Ks=64,Cr={dimension:"measurement",dim:"measurement",cotation:"measurement",cote:"measurement",cotes:"measurement",mesure:"measurement",measure:"measurement",measurement:"measurement",guide:"measurement",guideline:"measurement",axis:"measurement",axe:"measurement",fleche:"measurement",arrow:"measurement",tick:"measurement",anno:"measurement",annotation:"measurement",grid:"measurement",grille:"measurement",trame:"measurement",leader:"measurement",centerline:"measurement",centreline:"measurement",dashed:"measurement",dash:"measurement",pointille:"measurement",pointilles:"measurement",dot:"measurement",dotted:"measurement",tirete:"measurement",tirets:"measurement",coffrage:"measurement",cot:"measurement",dimline:"measurement",door:"door",doorway:"door",porte:"door",portillon:"door",portail:"door",gate:"door",swing:"door",battant:"door",window:"window",fenetre:"window",vitrage:"window",chassis:"window",baie:"window",glazing:"window",glaz:"window",velux:"window",skylight:"window",lucarne:"window",mobilier:"ignore",meuble:"ignore",furniture:"ignore",furn:"ignore",equipement:"ignore",equipment:"ignore",fixture:"ignore",fixt:"ignore",sanitaire:"ignore",sanitary:"ignore",plumbing:"ignore",appareil:"ignore",appliance:"ignore",electromenager:"ignore",decor:"ignore",decoration:"ignore",plante:"ignore",vegetation:"ignore",hatch:"ignore",hachure:"ignore",escalier:"ignore",stair:"ignore",staircase:"ignore",cartouche:"ignore",titleblock:"ignore",legend:"ignore",legende:"ignore",wall:"wall",mur:"wall",cloison:"wall",facade:"wall",envelope:"wall",enveloppe:"wall",structure:"wall",partition:"wall",maconnerie:"wall",masonry:"wall"},Tr=new Set(["room","piece","espace","space","zone","area","local","chambre","bedroom","salon","sejour","living","lounge","cuisine","kitchen","sdb","bathroom","cabinet","bureau","entree","degt","degagement"]),Ir=new RegExp("\\b("+["salon","sejour","living","lounge","salle a manger","dining","sam","chambre","bedroom","ch\\d*","suite","parentale","cuisine","kitchen","kitchenette","sdb","sde","sd","bain","bains","douche","bath","bathroom","shower","salle d ?eau","wc","toilettes?","toilets?","restroom","lavatory","bureau","office","study","cabinet","consultation","entree","entry","entrance","hall","hallway","couloir","corridor","degagement","degt","degat","palier","landing","foyer","garage","atelier","workshop","cellier","cell","pantry","buanderie","buand","lingerie","laundry","utility","dressing","closet","placard","plac","pl","debarras","storage","cave","cellar","grenier","mezzanine","reserve","chaufferie","balcon","terrasse","loggia","veranda","patio","piece"].join("|")+")\\b"),j={mergeAngleDeg:1,mergeOffset:.02,mergeGap:.05,mergeThickness:.03,pairAngleDeg:2,pairMin:.04,pairMax:.5,pairMinOverlap:.15,pairMinPiece:.1,leftoverMin:.3,enclosed:.03,snap:.03,heal:.05,minWall:.2,minSegment:.02,smallObject:.45,frameCoverage:.9,frameMaxStroke:.05,frameTouch:.05,strokeThicknessMin:.05,strokeThicknessMax:.5,doorRadiusMin:.5,doorRadiusMax:1.4,doorHinge:.3,openingDedupe:.35,openingSnap:.5,openingSpanMin:.4,openingSpanMax:3,bridgeParallelDeg:3,dividerMin:1,dividerMargin:.3,dividerCell:3,dividerReach:1,vertexMerge:.005,unlabeledRoomMin:1.5,scaleRetry:.02},It={totalWidthMeters:12,defaultThickness:.2,defaultHeight:2.5,minRoomAreaM2:.5,maxRoomAreaM2:2e3};function Bt(r){return r.normalize("NFKD").replace(/[̀-ͯ]/g,"").toLowerCase()}function Xs(r){return Bt(r.replace(/([a-z])([A-Z])/g,"$1 $2")).split(/[^a-z]+/).filter(Boolean)}function Zs(r){return Cr[r]??(/[sx]$/.test(r)?Cr[r.slice(0,-1)]:void 0)}function Js(r){return Tr.has(r)||/[sx]$/.test(r)&&Tr.has(r.slice(0,-1))}function Qs(r){const e=[r.getAttribute("id"),r.getAttribute("class"),r.getAttribute("inkscape:label"),r.getAttribute("data-name")].filter(d=>!!d).join(" ");if(!e)return{role:null,roomHint:!1};let t=!1,i=!1,a=!1,n=!1,s=!1,l=!1;for(const d of Xs(e)){const p=Zs(d);p==="measurement"?t=!0:p==="door"?i=!0:p==="window"?a=!0:p==="ignore"?n=!0:p==="wall"&&(s=!0),Js(d)&&(l=!0)}return{role:t?"measurement":a?"window":i?"door":n?"ignore":s?"wall":null,roomHint:l}}function Ft(r){return(r.localName||r.tagName||"").toLowerCase()}function wa(r){if(!r)return[];const e=[];for(const t of r.matchAll(Us)){const i=Number(t[0]);Number.isFinite(i)&&e.push(i)}return e}function ue(r,e,t){if(r==null)return t;const i=yi.exec(r);if(!i){const l=/^\s*(\S+)/.exec(r);return l&&l[1]!==r.trim()?ue(l[1],e,t):t}const a=Number(i[1]);if(!Number.isFinite(a))return t;const n=i[2].toLowerCase();if(n==="%")return a/100*e;const s=ya[n];return s===void 0?t:a*s}function Dr(r){if(!r)return null;const e=yi.exec(r);if(!e||e[2]==="%")return null;const t=ya[e[2].toLowerCase()],i=Number(e[1])*(t??NaN);return Number.isFinite(i)&&i>0?i:null}function Ln(r){const e=wa(r);return e.length<4||!(e[2]>0)||!(e[3]>0)?null:{x:e[0],y:e[1],width:e[2],height:e[3]}}function la(r){if(r===void 0)return 1;const e=yi.exec(r);if(!e)return 1;const t=Number(e[1])/(e[2]==="%"?100:1);return Number.isFinite(t)?Math.min(1,Math.max(0,t)):1}const el={black:[0,0,0],white:[255,255,255],gray:[128,128,128],grey:[128,128,128],silver:[192,192,192],darkgray:[169,169,169],darkgrey:[169,169,169],dimgray:[105,105,105],dimgrey:[105,105,105],lightgray:[211,211,211],lightgrey:[211,211,211],gainsboro:[220,220,220],whitesmoke:[245,245,245],red:[255,0,0],green:[0,128,0],blue:[0,0,255],navy:[0,0,128],maroon:[128,0,0]};function Fn(r){const e=r.trim().toLowerCase(),t=/^#([0-9a-f]{3,8})$/.exec(e);if(t){const n=t[1];if(n.length===3||n.length===4){const s=n.split("").map(l=>parseInt(l+l,16));return[s[0],s[1],s[2],n.length===4?s[3]/255:1]}if(n.length===6||n.length===8){const s=[0,2,4,6].map(l=>parseInt(n.slice(l,l+2),16));return[s[0],s[1],s[2],n.length===8?s[3]/255:1]}return null}const i=/^rgba?\(([^)]*)\)$/.exec(e);if(i){const n=i[1].split(/[\s,/]+/).filter(Boolean);if(n.length<3)return null;const s=n.slice(0,3).map(c=>c.endsWith("%")?parseFloat(c)*255/100:parseFloat(c)),l=n[3]===void 0?1:n[3].endsWith("%")?parseFloat(n[3])/100:parseFloat(n[3]);return s.every(Number.isFinite)&&Number.isFinite(l)?[s[0],s[1],s[2],l]:null}const a=el[e];return a?[a[0],a[1],a[2],1]:null}function Nn(r){const e=r.trim().toLowerCase();return e==="none"||e==="transparent"}function tl(r){return/^\s*none\s*$/i.test(r)?!1:wa(r).some(e=>e>0)}function Bn(r){const e={};for(const t of r.split(";")){const i=t.indexOf(":");if(i<=0)continue;const a=t.slice(0,i).trim().toLowerCase(),n=t.slice(i+1).replace(/!important/i,"").trim();a&&n&&(e[a]=n)}return e}class ge{constructor(e=1,t=0,i=0,a=1,n=0,s=0){this.a=e,this.b=t,this.c=i,this.d=a,this.e=n,this.f=s}static identity(){return new ge}multiply(e){return new ge(this.a*e.a+this.c*e.b,this.b*e.a+this.d*e.b,this.a*e.c+this.c*e.d,this.b*e.c+this.d*e.d,this.a*e.e+this.c*e.f+this.e,this.b*e.e+this.d*e.f+this.f)}translate(e,t){return e===0&&t===0?this:this.multiply(new ge(1,0,0,1,e,t))}scale(e,t=e){return this.multiply(new ge(e,0,0,t,0,0))}rotate(e){const t=e*Math.PI/180,i=Math.cos(t),a=Math.sin(t);return this.multiply(new ge(i,a,-a,i,0,0))}skewX(e){return this.multiply(new ge(1,0,Math.tan(e*Math.PI/180),1,0,0))}skewY(e){return this.multiply(new ge(1,Math.tan(e*Math.PI/180),0,1,0,0))}apply(e,t){return{x:this.a*e+this.c*t+this.e,y:this.b*e+this.d*t+this.f}}meanScale(){return Math.sqrt(Math.abs(this.a*this.d-this.b*this.c))}static parse(e){let t=ge.identity();if(!e||/^\s*none\s*$/i.test(e))return t;const i=/([a-zA-Z]+)\s*\(([^)]*)\)/g;for(const a of e.matchAll(i)){const n=a[1].toLowerCase(),s=[];for(const p of a[2].matchAll(/([-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?)([a-zA-Z%]*)/g)){const h=Number(p[1]);Number.isFinite(h)&&s.push({v:h,unit:p[2].toLowerCase()})}const l=(p,h=0)=>s[p]?s[p].v*(ya[s[p].unit]??1):h,c=p=>{const h=s[p];return h?h.unit==="rad"?h.v*180/Math.PI:h.unit==="grad"?h.v*.9:h.unit==="turn"?h.v*360:h.v:0},d=(p,h)=>s[p]?s[p].v:h;switch(n){case"matrix":s.length>=6&&(t=t.multiply(new ge(s[0].v,s[1].v,s[2].v,s[3].v,l(4),l(5))));break;case"translate":t=t.translate(l(0),l(1));break;case"translatex":t=t.translate(l(0),0);break;case"translatey":t=t.translate(0,l(0));break;case"scale":t=t.scale(d(0,1),d(1,d(0,1)));break;case"scalex":t=t.scale(d(0,1),1);break;case"scaley":t=t.scale(1,d(0,1));break;case"rotate":t=s.length>=3?t.translate(l(1),l(2)).rotate(c(0)).translate(-l(1),-l(2)):t.rotate(c(0));break;case"skewx":t=t.skewX(c(0));break;case"skewy":t=t.skewY(c(0));break;case"skew":t=t.skewX(c(0)).skewY(c(1));break}}return t}}function il(r,e,t,i){let a=e/r.width,n=t/r.height,s=0,l=0;const c=(i||"xMidYMid meet").trim();if(!/^none\b/i.test(c)){const p=/\bslice\b/i.test(c)?Math.max(a,n):Math.min(a,n);a=n=p;const h=/x(Min|Mid|Max)Y(Min|Mid|Max)/.exec(c),m=h?h[1]:"Mid",g=h?h[2]:"Mid",v=e-r.width*p,y=t-r.height*p;s=m==="Min"?0:m==="Mid"?v/2:v,l=g==="Min"?0:g==="Mid"?y/2:y}return new ge(a,0,0,n,s-r.x*a,l-r.y*n)}class al{constructor(){this.complete=!0,this.size=0,this.order=0,this.universal=[],this.byTag=new Map,this.byClass=new Map,this.byTagClass=new Map,this.byId=new Map}add(e){const t=e.replace(/\/\*[\s\S]*?\*\//g,"");let i=0;for(;i<t.length;){const a=t.indexOf("{",i);if(a<0)break;const n=t.slice(i,a).trim();let s=1,l=a+1;for(;l<t.length&&s>0;)t[l]==="{"?s++:t[l]==="}"&&s--,l++;const c=t.slice(a+1,s===0?l-1:l);if(i=l,n.startsWith("@")){/^@(font-face|charset|namespace|page)\b/i.test(n)||(this.complete=!1);continue}const d=Bn(c);for(const p of n.split(","))this.addSelector(p.trim(),d)}/@import\b/i.test(t)&&(this.complete=!1)}addSelector(e,t){const i=(n,s,l)=>{const c=n.get(s)??[];c.push({spec:l,order:this.order++,decls:t}),n.set(s,c),this.size++};let a;e==="*"?(this.universal.push({spec:0,order:this.order++,decls:t}),this.size++):(a=/^([a-zA-Z][\w-]*)$/.exec(e))?i(this.byTag,a[1].toLowerCase(),1):(a=/^\.([\w-]+)$/.exec(e))?i(this.byClass,a[1],10):(a=/^([a-zA-Z][\w-]*)\.([\w-]+)$/.exec(e))?i(this.byTagClass,`${a[1].toLowerCase()}.${a[2]}`,11):(a=/^#([\w-]+)$/.exec(e))?i(this.byId,a[1],100):e&&(this.complete=!1)}match(e,t){const i=[...this.universal];i.push(...this.byTag.get(t)??[]);const a=e.getAttribute("class");if(a)for(const s of a.split(/\s+/))s&&i.push(...this.byClass.get(s)??[],...this.byTagClass.get(`${t}.${s}`)??[]);const n=e.getAttribute("id");return n&&i.push(...this.byId.get(n)??[]),i.length>1&&i.sort((s,l)=>s.spec-l.spec||s.order-l.order),i}}const rl="MmZzLlHhVvCcSsQqTtAa",vt=class vt{constructor(e){this.d=e,this.pos=0}skip(){const e=this.d;for(;this.pos<e.length;){const t=e.charCodeAt(this.pos);if(t===32||t===9||t===10||t===13||t===12||t===44)this.pos++;else break}}atEnd(){return this.skip(),this.pos>=this.d.length}command(){this.skip();const e=this.d[this.pos];return e!==void 0&&rl.includes(e)?(this.pos++,e):null}num(){this.skip(),vt.NUM.lastIndex=this.pos;const e=vt.NUM.exec(this.d);if(!e)return null;this.pos=vt.NUM.lastIndex;const t=Number(e[0]);return Number.isFinite(t)?t:null}flag(){this.skip();const e=this.d[this.pos];return e==="0"||e==="1"?(this.pos++,e==="1"?1:0):null}};vt.NUM=/[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/y;let ca=vt;const nl={fill:"black",fillExplicit:!1,fillOpacity:1,stroke:"none",strokeExplicit:!1,strokeWidth:1,strokeOpacity:1,dashed:!1,markers:!1,hidden:!1,fontSize:16,textAnchor:"start",color:"black"};function ol(r,e,t,i){const a={...r},n=$=>{const z=e[$];return z===void 0||/^\s*inherit\s*$/i.test(z)?void 0:z},s=n("fill");s!==void 0&&(a.fill=s,a.fillExplicit=!0);const l=n("fill-opacity");l!==void 0&&(a.fillOpacity=la(l));const c=n("stroke");c!==void 0&&(a.stroke=c,a.strokeExplicit=!0);const d=n("stroke-width");d!==void 0&&(a.strokeWidth=Math.max(0,ue(d,Math.hypot(t,i)/Math.SQRT2,a.strokeWidth)));const p=n("stroke-opacity");p!==void 0&&(a.strokeOpacity=la(p));const h=n("stroke-dasharray");h!==void 0&&(a.dashed=tl(h));const m=["marker","marker-start","marker-mid","marker-end"].map(n).filter($=>$!==void 0);m.length>0&&(a.markers=m.some($=>!/^\s*none\s*$/i.test($)));const g=n("visibility");g!==void 0&&(a.hidden=/^\s*(hidden|collapse)\s*$/i.test(g));const v=n("font-size");if(v!==void 0){const $=yi.exec(v);$&&$[2].toLowerCase()==="em"?a.fontSize=r.fontSize*Number($[1]):a.fontSize=ue(v,r.fontSize,r.fontSize)}const y=n("text-anchor");y!==void 0&&(a.textAnchor=y.trim().toLowerCase());const _=n("color");return _!==void 0&&(a.color=_),a}function sl(r,e){const t=r.fill.trim().toLowerCase();if(Nn(t))return"none";const i=r.fillOpacity*e;if(i<=.05)return"none";if(t.startsWith("url("))return"light";const a=Fn(t==="currentcolor"?r.color:t);if(!a)return"light";const s=1-(1-(.299*a[0]+.587*a[1]+.114*a[2])/255)*i*a[3];return a[3]*i<=.05?"none":s<.55?"dark":"light"}function ll(r,e,t){if(!r.strokeExplicit)return t?0:e.m.meanScale();if(Nn(r.stroke)||r.strokeOpacity*e.opacity<=.05||r.strokeWidth<=0)return 0;const i=Fn(r.stroke);return i&&i[3]<=.05?0:r.strokeWidth*e.m.meanScale()}function cl(r){const e=[];let t="";const i=()=>{const n=t.replace(/\s+/g," ").trim();n&&e.push(n),t=""},a=n=>{for(const s of Array.from(n.childNodes))if(s.nodeType===3||s.nodeType===4)t+=s.nodeValue??"";else if(s.nodeType===1){const l=s,c=Ft(l);if(c!=="tspan"&&c!=="textpath"&&c!=="a")continue;const d=l.getAttribute("style")??"";if(l.getAttribute("display")==="none"||/display\s*:\s*none/i.test(d))continue;const p=c==="tspan"&&(l.hasAttribute("x")||l.hasAttribute("y")||l.hasAttribute("dy")||l.getAttribute("sodipodi:role")==="line");p&&i(),a(l),p&&i()}};return a(r),i(),e}function dl(r){return Bt(r).replace(/\b\d+(?:[.,]\d+)?\s*[xX*×]\s*\d+(?:[.,]\d+)?(?:\s*[xX*×]\s*\d+(?:[.,]\d+)?)?(?:\s*(?:m|cm|mm))?\b/g," ").replace(/\b(?:m2|m|cm|mm|dm|ml|s|sh|shab|shon|su|surf|surface|hsp|hsf|ht|h|hp|ep|epaisseur|niv|nf|ngf|alt|env|approx|ca|x|par|ft|ft2|sq|sqft|sf|in|area)\b/g," ").replace(/\b(?:mur|coffrage|hors|tout|nu|brut|fini|clair|passage|axe|cote|cotes|reelles|reel|tot|total|larg|largeur|long|longueur|haut|hauteur)\b/g," ").replace(/[^a-z]+/g,"").length===0}function ul(r){const t=r.map(i=>i.replace(/[\s(\-–—:,]*\d+(?:[.,]\d+)*\s*(?:m(?:²|2)|ft(?:²|2)|sq\.?\s*ft\.?|sf)(?![a-z])\s*\)?/gi," ").replace(/\b\d+(?:[.,]\d+)?\s*[xX*×]\s*\d+(?:[.,]\d+)?(?:\s*[xX*×]\s*\d+(?:[.,]\d+)?)?(?:\s*(?:m|cm|mm))?\b/g," ").replace(/\b\d+(?:[.,]\d+)?\s*(?:m|cm|mm)\b/gi," ").replace(/\([^)]*(?:cote|coffrage|mur|hsp|haut|larg|long|dim)[^)]*\)/gi," ").replace(/\b(?:largeur|longueur|hauteur|hsp|cotes?|surface|surf)\s*:\s*/gi," ").replace(/\s+/g," ").replace(/[\s\-–—:,;(]+$/,"").trim()).filter(i=>i&&!dl(i)).join(" ").trim();return t.length>0&&t.length<=60?t:""}class pl{constructor(e){this.root=e,this.segments=[],this.shapes=[],this.arcs=[],this.labels=[],this.layers=[],this.rootCount=0,this.truncated=!1,this.elementCount=0,this.css=new al,this.ids=new Map;let t=!1;for(const i of Array.from(e.getElementsByTagName("*"))){const a=i.getAttribute("id");a&&!this.ids.has(a)&&this.ids.set(a,i);const n=Ft(i);n==="style"?this.css.add(i.textContent??""):n==="g"&&i.getAttribute("inkscape:groupmode")==="layer"&&(t=!0)}this.hasInkscapeLayers=t}run(e,t){const i={m:ge.identity(),style:nl,opacity:1,role:null,roomHint:!1,layer:-1,vw:e,vh:t,useDepth:0};this.visit(this.root,i,{isRoot:!0})}contentBounds(){let e=1/0,t=1/0,i=-1/0,a=-1/0;const n=(s,l)=>{s<e&&(e=s),s>i&&(i=s),l<t&&(t=l),l>a&&(a=l)};for(const s of this.segments)n(s.ax,s.ay),n(s.bx,s.by);for(const s of this.shapes)n(s.minX,s.minY),n(s.maxX,s.maxY);for(const s of this.arcs)n(s.ax,s.ay),n(s.bx,s.by);for(const s of this.labels)n(s.x,s.y);return!Number.isFinite(e)||i-e<=0||a-t<=0?null:{x:e,y:t,width:i-e,height:a-t}}declarations(e,t){const i={},a=e.attributes;for(let s=0;s<a.length;s++){const l=a[s],c=l.name.toLowerCase();qs.has(c)&&(i[c]=l.value.trim())}if(this.css.size>0)for(const s of this.css.match(e,t))Object.assign(i,s.decls);const n=e.getAttribute("style");return n&&Object.assign(i,Bn(n)),i}isLayer(e){return this.hasInkscapeLayers?e.getAttribute("inkscape:groupmode")==="layer":e.parentElement===this.root}addLayer(e,t){const i=e.getAttribute("inkscape:label")||e.getAttribute("data-name")||e.getAttribute("id")||o("import.parser.group_generic",{n:this.layers.length+1}),a=t>=0?`${this.layers[t].name} › ${i}`:i;return this.layers.push({name:a,count:0}),this.layers.length-1}countPrimitive(e){e>=0?this.layers[e].count++:this.rootCount++}visit(e,t,i={}){if(this.truncated)return;if(++this.elementCount>Ws){this.truncated=!0;return}const a=e.namespaceURI;if(a&&a!==sa)return;const n=Ft(e);if(Hs.has(n)&&!(i.useTarget&&n==="symbol"))return;const s=this.declarations(e,n);if(s.display!==void 0&&/^\s*none\s*$/i.test(s.display))return;const l=t.opacity*la(s.opacity);if(l<=.01)return;const c=Qs(e);let d=t.m;if(!i.isRoot){const m=s.transform??e.getAttribute("transform");m&&(d=d.multiply(ge.parse(m)))}const p=n==="g"&&t.useDepth===0&&this.isLayer(e)?this.addLayer(e,t.layer):t.layer,h={m:d,style:ol(t.style,s,t.vw,t.vh),opacity:l,role:c.role??t.role,roomHint:t.roomHint||c.roomHint,layer:p,vw:t.vw,vh:t.vh,useDepth:t.useDepth};switch(n){case"svg":i.isRoot||this.enterViewport(e,h,i.useSize,!1),this.visitChildren(e,h);return;case"symbol":this.enterViewport(e,h,i.useSize,!0),this.visitChildren(e,h);return;case"g":case"a":this.visitChildren(e,h);return;case"switch":{const m=Array.from(e.children).find(g=>!g.namespaceURI||g.namespaceURI===sa);m&&this.visit(m,h);return}case"use":this.visitUse(e,h);return;case"line":case"polyline":case"polygon":case"rect":case"path":this.extractGeometry(e,n,h);return;case"text":this.extractText(e,h);return;default:return}}visitChildren(e,t){const i=e.children;for(let a=0;a<i.length&&!this.truncated;a++)this.visit(i[a],t)}enterViewport(e,t,i,a){const n=a?0:ue(e.getAttribute("x"),t.vw,0),s=a?0:ue(e.getAttribute("y"),t.vh,0),l=i?.w??ue(e.getAttribute("width"),t.vw,t.vw),c=i?.h??ue(e.getAttribute("height"),t.vh,t.vh),d=Ln(e.getAttribute("viewBox"));t.m=t.m.translate(n,s),d&&l>0&&c>0?(t.m=t.m.multiply(il(d,l,c,e.getAttribute("preserveAspectRatio"))),t.vw=d.width,t.vh=d.height):l>0&&c>0&&(t.vw=l,t.vh=c)}visitUse(e,t){if(t.useDepth>=Vs)return;const i=(e.getAttribute("href")??e.getAttribute("xlink:href")??"").trim();if(!i.startsWith("#"))return;const a=this.ids.get(i.slice(1));if(!a||a===e||a.contains(e))return;const n=ue(e.getAttribute("x"),t.vw,0),s=ue(e.getAttribute("y"),t.vh,0),l=e.getAttribute("width"),c=e.getAttribute("height"),d={w:l!==null?ue(l,t.vw,t.vw):void 0,h:c!==null?ue(c,t.vh,t.vh):void 0};this.visit(a,{...t,m:t.m.translate(n,s),useDepth:t.useDepth+1},{useTarget:!0,useSize:d})}segmentRole(e){return e.role&&e.role!=="wall"?e.role:e.style.dashed||e.style.markers?"measurement":"wall"}extractGeometry(e,t,i){if(i.style.hidden)return;const a=ll(i.style,i,this.css.complete),n=sl(i.style,i.opacity),s=(l,c)=>ue(e.getAttribute(l),c,0);switch(t){case"line":{const l=[{x:s("x1",i.vw),y:s("y1",i.vh),line:!1},{x:s("x2",i.vw),y:s("y2",i.vh),line:!0}];this.emit(l,!1,i,a,"none");return}case"polyline":case"polygon":{const l=wa(e.getAttribute("points")),c=[];for(let d=0;d+1<l.length;d+=2)c.push({x:l[d],y:l[d+1],line:d>0});this.emit(c,t==="polygon",i,a,n);return}case"rect":{const l=s("x",i.vw),c=s("y",i.vh),d=s("width",i.vw),p=s("height",i.vh);if(!(d>0&&p>0))return;this.emit([{x:l,y:c,line:!1},{x:l+d,y:c,line:!0},{x:l+d,y:c+p,line:!0},{x:l,y:c+p,line:!0}],!0,i,a,n);return}case"path":this.extractPath(e.getAttribute("d")??"",i,a,n);return;default:return}}emit(e,t,i,a,n){if(e.length<2)return;const s=[];for(const y of e){const _=i.m.apply(y.x,y.y),$=s[s.length-1];$&&Math.abs($.x-_.x)<1e-9&&Math.abs($.y-_.y)<1e-9||s.push({x:_.x,y:_.y,line:y.line})}const l=s[0],c=s[s.length-1];let d=t,p=!0;s.length>2&&Math.abs(l.x-c.x)<1e-9&&Math.abs(l.y-c.y)<1e-9&&(d=!0,p=c.line,s.pop());const h=d?n:"none",m=a>0||h==="dark";if(!m&&!(d&&h!=="none"))return;const g=this.segmentRole(i);let v=-1;if(d&&s.length>=3&&g!=="ignore"){let y=1/0,_=1/0,$=-1/0,z=-1/0;for(const f of s)f.x<y&&(y=f.x),f.x>$&&($=f.x),f.y<_&&(_=f.y),f.y>z&&(z=f.y);v=this.shapes.push({points:s.map(f=>({x:f.x,y:f.y})),role:g,fill:h,fillExplicit:i.style.fillExplicit,roomHint:i.roomHint,stroke:a,layer:i.layer,minX:y,minY:_,maxX:$,maxY:z})-1,this.countPrimitive(i.layer)}if(!(!m||g==="ignore")){for(let y=1;y<s.length;y++)s[y].line&&this.addSegment(s[y-1],s[y],g,a,h,v,i.layer);d&&p&&s.length>=2&&this.addSegment(s[s.length-1],s[0],g,a,h,v,i.layer)}}addSegment(e,t,i,a,n,s,l){if(this.segments.length>=Gs){this.truncated=!0;return}this.segments.push({ax:e.x,ay:e.y,bx:t.x,by:t.y,role:i,stroke:a,fill:n,shape:s,layer:l}),this.countPrimitive(l)}extractPath(e,t,i,a){const n=new ca(e);let s=0,l=0,c=0,d=0,p=0,h=0,m="",g="",v=[];const y=z=>{v.length>=2&&this.emit(v,z,t,i,a),v=[]},_=()=>{v.length===0&&v.push({x:s,y:l,line:!1})},$=(z,f,P)=>{_(),v.push({x:z,y:f,line:P}),s=z,l=f};for(;!n.atEnd();){const z=n.command();if(z)g=z;else if(g===""||g==="Z"||g==="z")break;const f=g===g.toLowerCase(),P=g.toUpperCase(),A=f?s:0,O=f?l:0;if(P==="Z"){v.length>0&&((Math.abs(s-c)>1e-12||Math.abs(l-d)>1e-12)&&v.push({x:c,y:d,line:!0}),y(!0)),s=c,l=d,m="Z";continue}if(P==="M"){const T=n.num(),I=n.num();if(T===null||I===null)break;y(!1),s=A+T,l=O+I,c=s,d=l,v=[{x:s,y:l,line:!1}],g=f?"l":"L",m="M";continue}let M=!0;switch(P){case"L":{const T=n.num(),I=n.num();if(T===null||I===null){M=!1;break}$(A+T,O+I,!0);break}case"H":{const T=n.num();if(T===null){M=!1;break}$(A+T,l,!0);break}case"V":{const T=n.num();if(T===null){M=!1;break}$(s,O+T,!0);break}case"C":case"S":{let T,I;if(P==="C")T=n.num(),I=n.num(),T!==null&&I!==null&&(T+=A,I+=O);else{const S=m==="C"||m==="S";T=S?2*s-p:s,I=S?2*l-h:l}const x=n.num(),E=n.num(),F=n.num(),H=n.num();if(T===null||I===null||x===null||E===null||F===null||H===null){M=!1;break}const b={x:s,y:l};this.addCubic(b,{x:T,y:I},{x:A+x,y:O+E},{x:A+F,y:O+H},t),p=A+x,h=O+E,$(A+F,O+H,!1);break}case"Q":case"T":{let T,I;if(P==="Q")T=n.num(),I=n.num(),T!==null&&I!==null&&(T+=A,I+=O);else{const F=m==="Q"||m==="T";T=F?2*s-p:s,I=F?2*l-h:l}const x=n.num(),E=n.num();if(T===null||I===null||x===null||E===null){M=!1;break}p=T,h=I,$(A+x,O+E,!1);break}case"A":{const T=n.num(),I=n.num(),x=n.num(),E=n.flag(),F=n.flag(),H=n.num(),b=n.num();if(T===null||I===null||x===null||E===null||F===null||H===null||b===null){M=!1;break}const S=A+H,C=O+b;T===0||I===0?$(S,C,!0):(this.addArc(s,l,Math.abs(T),Math.abs(I),x,E===1,F===1,S,C,t),$(S,C,!1));break}default:M=!1}if(!M)break;m=P}y(!1)}addArc(e,t,i,a,n,s,l,c,d,p){if(s||Math.abs(e-c)<1e-12&&Math.abs(t-d)<1e-12)return;const h=n*Math.PI/180,m=Math.cos(h),g=Math.sin(h),v=(e-c)/2,y=(t-d)/2,_=m*v+g*y,$=-g*v+m*y,z=_*_/(i*i)+$*$/(a*a);if(z>1){const H=Math.sqrt(z);i*=H,a*=H}const f=i*i*a*a-i*i*$*$-a*a*_*_,P=i*i*$*$+a*a*_*_,A=(s!==l?1:-1)*Math.sqrt(Math.max(0,f/P)),O=A*i*$/a,M=-A*a*_/i,T=m*O-g*M+(e+c)/2,I=g*O+m*M+(t+d)/2,x=p.m.apply(T,I),E=p.m.apply(e,t),F=p.m.apply(c,d);this.recordArc(x,E,F,p,null)}addCubic(e,t,i,a,n){const s=n.m.apply(e.x,e.y),l=n.m.apply(t.x,t.y),c=n.m.apply(i.x,i.y),d=n.m.apply(a.x,a.y),p=l.x-s.x,h=l.y-s.y,m=d.x-c.x,g=d.y-c.y,v=Math.hypot(p,h),y=Math.hypot(m,g);if(v<1e-9||y<1e-9)return;const _=-h,$=p,z=-g,f=m,P=_*f-$*z;if(Math.abs(P)<1e-12*v*y)return;const A=d.x-s.x,O=d.y-s.y,M=(A*f-O*z)/P,T={x:s.x+M*_,y:s.y+M*$};this.recordArc(T,s,d,n,{l0:v,l3:y})}recordArc(e,t,i,a,n){const s=a.role??"wall";if(s==="measurement"||s==="ignore"||s==="window"||a.style.hidden)return;const l=Math.hypot(t.x-e.x,t.y-e.y),c=Math.hypot(i.x-e.x,i.y-e.y);if(!(l>0&&c>0))return;const d=l/c;if(d<.85||d>1/.85)return;const p=((t.x-e.x)*(i.x-e.x)+(t.y-e.y)*(i.y-e.y))/(l*c),h=Math.acos(Math.max(-1,Math.min(1,p)))*180/Math.PI;h<75||h>105||n&&(n.l0/l<.4||n.l0/l>.7||n.l3/c<.4||n.l3/c>.7)||(this.arcs.push({cx:e.x,cy:e.y,ax:t.x,ay:t.y,bx:i.x,by:i.y,r1:l,r2:c,role:s,layer:a.layer}),this.countPrimitive(a.layer))}extractText(e,t){if(t.style.hidden||t.role==="ignore")return;const i=cl(e),a=ul(i);if(!a)return;let n=e.getAttribute("x"),s=e.getAttribute("y");if(n===null||s===null){const y=Array.from(e.getElementsByTagName("*")).find(_=>Ft(_)==="tspan"&&(_.hasAttribute("x")||_.hasAttribute("y")));n=n??y?.getAttribute("x")??null,s=s??y?.getAttribute("y")??null}const l=ue(n,t.vw,0),c=ue(s,t.vh,0),d=t.style.fontSize>0?t.style.fontSize:16,h=i.reduce((y,_)=>Math.max(y,_.length),0)*d*.55,m=t.style.textAnchor==="middle"?0:t.style.textAnchor==="end"?-h/2:h/2,g=-d*.35+(Math.max(1,i.length)-1)*d*.6,v=t.m.apply(l+m,c+g);this.labels.push({text:a,x:v.x,y:v.y,layer:t.layer}),this.countPrimitive(t.layer)}}class Te{constructor(e){this.size=e,this.cells=new Map}key(e,t){return e*1000003+t}insertBox(e,t,i,a,n){const s=Math.floor(e/this.size),l=Math.floor(i/this.size),c=Math.floor(t/this.size),d=Math.floor(a/this.size);for(let p=s;p<=l;p++)for(let h=c;h<=d;h++){const m=this.key(p,h),g=this.cells.get(m);g?g.push(n):this.cells.set(m,[n])}}query(e,t,i,a,n){const s=Math.floor(e/this.size),l=Math.floor(i/this.size),c=Math.floor(t/this.size),d=Math.floor(a/this.size);for(let p=s;p<=l;p++)for(let h=c;h<=d;h++){const m=this.cells.get(this.key(p,h));if(m)for(const g of m)n(g)}}}function we(r){return Math.hypot(r.bx-r.ax,r.by-r.ay)}function Qe(r,e){return Math.max(r,e/2e3,1e-9)}function wi(r){let e=1/0,t=1/0,i=-1/0,a=-1/0;for(const n of r)e=Math.min(e,n.ax,n.bx),i=Math.max(i,n.ax,n.bx),t=Math.min(t,n.ay,n.by),a=Math.max(a,n.ay,n.by);return Number.isFinite(e)?Math.max(i-e,a-t):0}function hl(r){let e=Math.atan2(r.by-r.ay,r.bx-r.ax);return e<0&&(e+=Math.PI),e>=Math.PI&&(e-=Math.PI),e}function _a(r,e){const t=r.map((n,s)=>({index:s,t:hl(n)})).sort((n,s)=>n.t-s.t),i=[];let a=[];for(const n of t){const s=a[a.length-1];s&&(n.t-s.t>e||n.t-a[0].t>3*e)&&(i.push(a),a=[]),a.push(n)}if(a.length&&i.push(a),i.length>1){const n=i[0],s=i[i.length-1];n[0].t+Math.PI-s[s.length-1].t<=e&&(i.pop(),i[0]=[...s.map(l=>({index:l.index,t:l.t-Math.PI})),...n])}return i.map(n=>{const s=n.reduce((m,g)=>m+g.t,0)/n.length,l=Math.cos(s),c=Math.sin(s),d=-c,p=l,h=n.map(({index:m,t:g})=>{const v=r[m],y=v.ax*l+v.ay*c,_=v.bx*l+v.by*c,$=(v.ax+v.bx)/2*d+(v.ay+v.by)/2*p;return{index:m,lo:Math.min(y,_),hi:Math.max(y,_),off:$,angle:g}});return{ux:l,uy:c,items:h}})}function mi(r,e,t,i,a,n,s){const l=-e,c=r;return{ax:t*r+a*l,ay:t*e+a*c,bx:i*r+a*l,by:i*e+a*c,thick:n,measured:s}}function gi(r,e,t){const i=t.filter(s=>s[1]>r&&s[0]<e).sort((s,l)=>s[0]-l[0]),a=[];let n=r;for(const[s,l]of i)if(s>n&&a.push([n,Math.min(s,e)]),n=Math.max(n,l),n>=e)break;return n<e&&a.push([n,e]),a.filter(([s,l])=>l-s>1e-12)}function Er(r,e){const t=[];for(const i of _a(r,e.angle)){const a=i.items.filter(s=>s.hi-s.lo>1e-12).sort((s,l)=>s.off-l.off);let n=0;for(let s=1;s<=a.length;s++)s<a.length&&a[s].off-a[s-1].off<=e.offset||(ml(a.slice(n,s),r,i,e,t),n=s)}return t}function ml(r,e,t,i,a){const n=[...r].sort((l,c)=>e[l.index].thick-e[c.index].thick);let s=0;for(let l=1;l<=n.length;l++){if(l<n.length&&e[n[l].index].thick-e[n[l-1].index].thick<=i.thickness)continue;const c=n.slice(s,l).sort((_,$)=>_.lo-$.lo);s=l;let d=c[0].lo,p=c[0].hi,h=0,m=0,g=0,v=!1;const y=()=>{p-d>1e-12&&a.push(mi(t.ux,t.uy,d,p,m>0?h/m:c[0].off,g,v))};for(let _=0;_<c.length;_++){const $=c[_],z=e[$.index];_>0&&$.lo>p+i.gap&&(y(),d=$.lo,p=$.hi,h=0,m=0,g=0,v=!1),p=Math.max(p,$.hi);const f=Math.max($.hi-$.lo,1e-12);h+=$.off*f,m+=f,g=Math.max(g,z.thick),v=v||z.measured}y()}}function gl(r,e){const t=[];for(const i of _a(r,e.angle)){const a=[...i.items].sort((l,c)=>l.off-c.off),n=new Map,s=[];for(let l=0;l<a.length;l++){const c=a[l];let d=0;for(let p=l+1,h=0;p<a.length&&h<64;p++,h++){const m=a[p],g=m.off-c.off;if(g>e.max)break;if(g<e.min||Math.abs(c.angle-m.angle)>e.angle)continue;const v=Math.max(c.lo,m.lo),y=Math.min(c.hi,m.hi),_=Math.min(c.hi-c.lo,m.hi-m.lo);if(y-v>=Math.max(e.minOverlap,.3*_)&&(s.push({p:c,q:m,d:g,lo:v,hi:y}),++d>=6))break}}s.sort((l,c)=>l.d-c.d||c.hi-c.lo-(l.hi-l.lo));for(const l of s){const c=n.get(l.p.index)??[],d=n.get(l.q.index)??[];for(const[p,h]of gi(l.lo,l.hi,[...c,...d]))h-p<e.minPiece||(t.push(mi(i.ux,i.uy,p,h,(l.p.off+l.q.off)/2,l.d,!0)),c.push([p,h]),d.push([p,h]));n.set(l.p.index,c),n.set(l.q.index,d)}for(const l of a){const c=r[l.index],d=n.get(l.index);if(!d||d.length===0){t.push(c);continue}for(const[p,h]of gi(l.lo,l.hi,d))h-p>=e.leftoverMin&&t.push(mi(i.ux,i.uy,p,h,l.off,c.thick,c.measured))}}return t}function da(r,e,t,i){const a=we(r);if(a===0)return!1;const n=(r.bx-r.ax)/a,s=(r.by-r.ay)/a,l=(e-r.ax)*n+(t-r.ay)*s,c=-(e-r.ax)*s+(t-r.ay)*n;return l>=-i&&l<=a+i&&Math.abs(c)<=r.thick/2+i}function fl(r,e){const t=r.filter(n=>n.measured);if(t.length===0)return r;const i=t.reduce((n,s)=>Math.max(n,s.thick),0),a=new Te(Qe(i*4+e,wi(r)));for(const n of t){const s=n.thick/2+e;a.insertBox(Math.min(n.ax,n.bx)-s,Math.min(n.ay,n.by)-s,Math.max(n.ax,n.bx)+s,Math.max(n.ay,n.by)+s,n)}return r.filter(n=>{const s=we(n);let l=!1;return a.query(n.ax,n.ay,n.ax,n.ay,c=>{l||c===n||we(c)<=s+e||da(c,n.ax,n.ay,e)&&da(c,n.bx,n.by,e)&&(l=!0)}),!l})}function zr(r,e){const t=new Te(Qe(e,wi(r))),i=(a,n)=>{let s=null,l=e;if(t.query(a-e,n-e,a+e,n+e,d=>{const p=Math.hypot(d.x-a,d.y-n);p<=l&&(l=p,s=d)}),s)return s;const c={x:a,y:n};return t.insertBox(a,n,a,n,c),c};for(const a of r){const n=i(a.ax,a.ay),s=i(a.bx,a.by);a.ax=n.x,a.ay=n.y,a.bx=s.x,a.by=s.y}}function bl(r,e){if(r.length<2)return;const i=r.reduce((s,l)=>Math.max(s,l.thick),0)+e,a=new Te(Qe(i*2,wi(r)));for(const s of r)a.insertBox(Math.min(s.ax,s.bx)-i,Math.min(s.ay,s.by)-i,Math.max(s.ax,s.bx)+i,Math.max(s.ay,s.by)+i,s);const n=Math.sin(20*Math.PI/180);for(const s of r)for(const l of["a","b"]){const c=we(s);if(c===0)continue;const d=l==="a"?s.ax:s.bx,p=l==="a"?s.ay:s.by,h=(l==="a"?s.ax-s.bx:s.bx-s.ax)/c,m=(l==="a"?s.ay-s.by:s.by-s.ay)/c;let g=!1,v=1/0;a.query(d,p,d,p,y=>{if(g||y===s)return;const _=we(y);if(_===0)return;if(Math.hypot(y.ax-d,y.ay-p)<=e||Math.hypot(y.bx-d,y.by-p)<=e||da({...y,thick:0},d,p,e)){g=!0;return}const $=(y.bx-y.ax)/_,z=(y.by-y.ay)/_,f=h*z-m*$;if(Math.abs(f)<n)return;const P=y.ax-d,A=y.ay-p,O=(P*z-A*$)/f,M=(P*m-A*h)/f,T=(s.thick+y.thick)/2+e;O<-e||O>T||M<-T||M>_+T||Math.abs(O)<Math.abs(v)&&(v=O)}),!(g||!Number.isFinite(v))&&(l==="a"?(s.ax=d+h*v,s.ay=p+m*v):(s.bx=d+h*v,s.by=p+m*v))}}function vl(r,e,t){const i=[];for(const a of _a(r,e.angle)){const n=[...a.items].sort((d,p)=>r[p.index].thick-r[d.index].thick||p.hi-p.lo-(d.hi-d.lo)),s=n.reduce((d,p)=>Math.max(d,r[p.index].thick),0),l=Math.max(s,e.offset,1e-9),c=new Map;for(const d of n){const p=r[d.index],h=[],m=Math.floor(d.off/l);for(let y=m-1;y<=m+1;y++)for(const _ of c.get(y)??[]){const $=r[_.index];Math.abs(_.off-d.off)<=$.thick/2+e.offset&&$.thick>=p.thick&&h.push([_.lo,_.hi])}const g=h.length?gi(d.lo,d.hi,h):[[d.lo,d.hi]];for(const[y,_]of g)_-y<t||i.push(h.length?mi(a.ux,a.uy,y,_,d.off,p.thick,p.measured):p);const v=c.get(m)??[];v.push(d),c.set(m,v)}}return i}function Ar(r){let e=1/0,t=1/0,i=-1/0,a=-1/0;for(const n of r){const s=we(n);if(s===0)continue;const l=-(n.by-n.ay)/s*(n.thick/2),c=(n.bx-n.ax)/s*(n.thick/2);for(const[d,p]of[[n.ax+l,n.ay+c],[n.ax-l,n.ay-c],[n.bx+l,n.by+c],[n.bx-l,n.by-c]])d<e&&(e=d),d>i&&(i=d),p<t&&(t=p),p>a&&(a=p)}return!Number.isFinite(e)||i-e<=0?null:{x:e,y:t,width:i-e,height:Math.max(0,a-t)}}function _i(r,e,t,i,a,n){const s=a-t,l=n-i,c=s*s+l*l,d=c===0?0:Math.max(0,Math.min(1,((r-t)*s+(e-i)*l)/c));return Math.hypot(r-(t+d*s),e-(i+d*l))}function xl(r,e,t,i,a,n,s,l){const c=t-r,d=i-e,p=s-a,h=l-n,m=c*h-d*p;if(Math.abs(m)<=1e-12*Math.hypot(c,d)*Math.hypot(p,h))return null;const g=a-r,v=n-e,y=(g*h-v*p)/m,_=(g*d-v*c)/m;return y<0||y>1||_<0||_>1?null:{x:r+y*c,y:e+y*d}}function yl(r,e){const t=[];for(const i of r){const a=t[t.length-1];(!a||Math.hypot(i.x-a.x,i.y-a.y)>e)&&t.push(i)}for(;t.length>2&&Math.hypot(t[0].x-t[t.length-1].x,t[0].y-t[t.length-1].y)<=e;)t.pop();return t}function wl(r){let e=0;for(let t=0,i=r.length-1;t<r.length;i=t++)e+=r[i].x*r[t].y-r[t].x*r[i].y;return Math.abs(e)/2}function Q(r){return Math.round(r*100)/100}function Dt(r,e){return typeof r=="number"&&Number.isFinite(r)&&r>0?r:e}function _l(r){const e=Dt(r.minRoomAreaM2,It.minRoomAreaM2);return{totalWidthMeters:Dt(r.totalWidthMeters,It.totalWidthMeters),defaultThickness:Dt(r.defaultThickness,It.defaultThickness),defaultHeight:Dt(r.defaultHeight,It.defaultHeight),minRoomAreaM2:e,maxRoomAreaM2:Math.max(e,Dt(r.maxRoomAreaM2,It.maxRoomAreaM2)),excludedLayers:new Set(r.excludedLayers??[])}}function ua(r){return r<0?"root":`L${r}`}function Un(r,e){return r.maxX-r.minX>=j.frameCoverage*e.width&&r.maxY-r.minY>=j.frameCoverage*e.height}function kl(r,e,t,i,a){const n=j.frameTouch*i,s=new Te(Qe(Math.max(n*20,i),a));r.forEach((h,m)=>{s.insertBox(Math.min(h.ax,h.bx)-n,Math.min(h.ay,h.by)-n,Math.max(h.ax,h.bx)+n,Math.max(h.ay,h.by)+n,m)});const l=(h,m,g)=>_i(m,g,h.ax,h.ay,h.bx,h.by)<=n,c=(h,m)=>l(m,h.ax,h.ay)||l(m,h.bx,h.by)||l(h,m.ax,m.ay)||l(h,m.bx,m.by),d=new Set,p=[];for(r.forEach((h,m)=>{for(const g of t){const v=e[g].points;for(let y=0,_=v.length-1;y<v.length;_=y++){const $={...h,ax:v[_].x,ay:v[_].y,bx:v[y].x,by:v[y].y};!d.has(m)&&(l($,h.ax,h.ay)||l($,h.bx,h.by))&&(d.add(m),p.push(m))}}});p.length>0;){const h=r[p.pop()];s.query(Math.min(h.ax,h.bx)-n,Math.min(h.ay,h.by)-n,Math.max(h.ax,h.bx)+n,Math.max(h.ay,h.by)+n,m=>{!d.has(m)&&c(h,r[m])&&(d.add(m),p.push(m))})}return d.size===0?r:r.filter((h,m)=>!d.has(m))}function $l(r,e,t,i,a){const n=1/a;if(!Un(r,i)||r.stroke*a>=j.frameMaxStroke||r.points.length!==4)return!1;const s=r.points,l=.01*Math.max(r.maxX-r.minX,r.maxY-r.minY);for(const g of s){const v=Math.abs(g.x-r.minX)<=l||Math.abs(g.x-r.maxX)<=l,y=Math.abs(g.y-r.minY)<=l||Math.abs(g.y-r.maxY)<=l;if(!v||!y)return!1}const c=j.frameTouch*n;let d=1/0,p=1/0,h=-1/0,m=-1/0;for(const g of t){if(g.shape===e)continue;const v=Math.hypot(g.bx-g.ax,g.by-g.ay);for(let y=0,_=s.length-1;y<s.length;_=y++){const $=s[y].x-s[_].x,z=s[y].y-s[_].y,f=Math.hypot($,z);if(f===0||v===0)continue;const P=($*(g.by-g.ay)-z*(g.bx-g.ax))/(f*v);if(Math.abs(P)<.035){const A=Math.abs((g.ax-s[_].x)*z-(g.ay-s[_].y)*$)/f;if(A>=j.pairMin*n&&A<=j.pairMax*n){const O=((g.ax-s[_].x)*$+(g.ay-s[_].y)*z)/f,M=((g.bx-s[_].x)*$+(g.by-s[_].y)*z)/f;if(Math.min(f,Math.max(O,M))-Math.max(0,Math.min(O,M))>=.3*f)return!1}}for(const[A,O]of[[g.ax,g.ay],[g.bx,g.by]])_i(A,O,s[_].x,s[_].y,s[y].x,s[y].y)<=c&&(d=Math.min(d,A),h=Math.max(h,A),p=Math.min(p,O),m=Math.max(m,O))}}return Number.isFinite(d)?h-d<.5*(r.maxX-r.minX)&&m-p<.5*(r.maxY-r.minY):!0}function Pr(r,e,t,i){const a=1/t,n=Math.max(e.width,e.height),s=r.arcs.filter(x=>{const E=(x.r1+x.r2)/2;return E>=j.doorRadiusMin*a&&E<=j.doorRadiusMax*a}),l=.06*a,c=new Te(Qe(l*4,n));for(const x of s)c.insertBox(x.cx,x.cy,x.cx,x.cy,x);const d=(x,E,F,H)=>Math.hypot(x-F,E-H)<=l,p=x=>{let E=!1;const F=(H,b,S,C)=>{c.query(H-l,b-l,H+l,b+l,D=>{!E&&d(D.cx,D.cy,H,b)&&(d(D.ax,D.ay,S,C)||d(D.bx,D.by,S,C))&&(E=!0)})};return F(x.ax,x.ay,x.bx,x.by),E||F(x.bx,x.by,x.ax,x.ay),E},h=new Set;r.shapes.forEach((x,E)=>{Math.max(x.maxX-x.minX,x.maxY-x.minY)<j.smallObject*a&&h.add(E)});const m=.4*a,g=new Set,v=new Te(Qe(m*2,n)),y=[];for(const x of r.segments){const E=Math.hypot(x.bx-x.ax,x.by-x.ay);E>=j.minSegment*a&&E<=m&&(y.push(x),v.insertBox(Math.min(x.ax,x.bx),Math.min(x.ay,x.by),Math.max(x.ax,x.bx),Math.max(x.ay,x.by),x))}for(const x of y){if(g.has(x))continue;const E=Math.hypot(x.bx-x.ax,x.by-x.ay);if(E===0)continue;const F=(x.bx-x.ax)/E,H=(x.by-x.ay)/E;let b=0;const S=.3*a;v.query(Math.min(x.ax,x.bx)-S,Math.min(x.ay,x.by)-S,Math.max(x.ax,x.bx)+S,Math.max(x.ay,x.by)+S,C=>{if(C===x)return;const D=Math.hypot(C.bx-C.ax,C.by-C.ay);if(D===0)return;const B=(C.bx-C.ax)/D,G=(C.by-C.ay)/D;if(Math.abs(F*B+H*G)>.98&&Math.abs((C.ax-x.ax)*H-(C.ay-x.ay)*F)<.04*a){const K=Math.hypot(C.ax-x.bx,C.ay-x.by),W=Math.hypot(C.bx-x.ax,C.by-x.ay);(K<.25*a||W<.25*a)&&b++}}),b>=2&&g.add(x)}const _=.2*a,$=new Te(Qe(_*4,n));for(const x of h){const E=r.shapes[x];$.insertBox(E.minX,E.minY,E.maxX,E.maxY,E)}const z=(x,E)=>{let F=!1;if($.query(x-_,E-_,x+_,E+_,()=>{F=!0}),F)return!0;let H=0;return v.query(x-_,E-_,x+_,E+_,b=>{(Math.hypot(b.ax-x,b.ay-E)<=_||Math.hypot(b.bx-x,b.by-E)<=_)&&H++}),H>=2},f=x=>z(x.ax,x.ay)&&z(x.bx,x.by),P=r.segments.filter(x=>x.role==="wall"&&!g.has(x)&&!f(x)&&(x.stroke>0||x.fill==="dark")&&!(x.shape>=0&&h.has(x.shape))&&Math.hypot(x.bx-x.ax,x.by-x.ay)>=j.minSegment*a&&!p(x)),A=new Set;r.shapes.forEach((x,E)=>{$l(x,E,P,e,t)&&A.add(E)});let O=P.filter(x=>!(x.shape>=0&&A.has(x.shape)));A.size>0&&(O=kl(O,r.shapes,A,a,n)),O.length===0&&(O=P);const M=O.map(x=>{const E=x.stroke*t,F=E>=j.strokeThicknessMin&&E<=j.strokeThicknessMax?x.stroke:i.defaultThickness*a;return{ax:x.ax,ay:x.ay,bx:x.bx,by:x.by,thick:F,measured:!1}}),T={angle:j.mergeAngleDeg*Math.PI/180,offset:j.mergeOffset*a,gap:j.mergeGap*a,thickness:j.mergeThickness*a};let I=Er(M,T);return I=gl(I,{angle:j.pairAngleDeg*Math.PI/180,min:j.pairMin*a,max:j.pairMax*a,minOverlap:j.pairMinOverlap*a,minPiece:j.pairMinPiece*a,leftoverMin:j.leftoverMin*a}),I=fl(I,j.enclosed*a),zr(I,j.snap*a),bl(I,j.heal*a),zr(I,j.snap*a),I=Er(I,T),I=vl(I,{...T,angle:j.pairAngleDeg*Math.PI/180},j.minWall*a),I=I.filter(x=>we(x)>=j.minWall*a),{walls:I,doorArcs:s}}function Hn(r){let e=r;for(;e.into;)e=e.into;return e}function Sl(r,e,t,i){const a=1/i,n=[];if(r.length===0)return n;const s=.8*a,l=new Te(Qe(a,wi(r))),c=f=>{l.insertBox(Math.min(f.ax,f.bx)-s,Math.min(f.ay,f.by)-s,Math.max(f.ax,f.bx)+s,Math.max(f.ay,f.by)+s,f)};r.forEach(c);const d=.05*a,p=Math.sin(j.bridgeParallelDeg*Math.PI/180),h=(f,P,A,O)=>{let M=null,T=1/0;const I=new Set;return l.query(f,P,f,P,x=>{if(!x.alive||I.has(x)||(I.add(x),O&&!O(x)))return;const E=_i(f,P,x.ax,x.ay,x.bx,x.by);E<=A(x)&&E<T&&(T=E,M=x)}),M},m=f=>{const P=we(f);return{len:P,ux:(f.bx-f.ax)/P,uy:(f.by-f.ay)/P}},g=(f,P,A)=>{const{len:O,ux:M,uy:T}=m(f),I=-T,x=M,E=f.ax+M*A,F=f.ay+T*A;let H=null,b=0,S=0;const C=new Set;l.query(Math.min(E,f.ax,f.bx),Math.min(F,f.ay,f.by),Math.max(E,f.ax,f.bx),Math.max(F,f.ay,f.by),W=>{if(!W.alive||W===f||C.has(W))return;C.add(W);const $e=we(W);if($e===0)return;const Ht=(W.bx-W.ax)/$e,it=(W.by-W.ay)/$e;if(Math.abs(M*it-T*Ht)>p)return;const Be=Math.max(W.thick,f.thick)/2+d;if(Math.abs((W.ax-f.ax)*I+(W.ay-f.ay)*x)>Be||Math.abs((W.bx-f.ax)*I+(W.by-f.ay)*x)>Be)return;const dt=(W.ax-f.ax)*M+(W.ay-f.ay)*T,V=(W.bx-f.ax)*M+(W.by-f.ay)*T,ae=Math.min(dt,V),Se=Math.max(dt,V);(P==="end"?ae<=A+d&&ae>=O-d&&Se>O:Se>=A-d&&Se<=d&&ae<0)&&(!H||(P==="end"?ae<b:Se>S))&&(H=W,b=ae,S=Se)});const D=f.ax,B=f.ay;let G=Math.min(0,A),q=Math.max(O,A);const K=H;K&&(G=Math.min(G,b),q=Math.max(q,S),K.alive=!1,K.into=f,f.thick=Math.max(f.thick,K.thick),f.measured=f.measured||K.measured),f.ax=D+M*G,f.ay=B+T*G,f.bx=D+M*q,f.by=B+T*q,c(f)},v=(f,P,A)=>{const{len:O}=m(f);A>O+d&&g(f,"end",A),P<-d&&g(f,"start",P)},y=(f,P,A)=>n.some(O=>Hn(O.host)===f&&Math.hypot(O.cx-P,O.cy-A)<j.openingDedupe*a),_=j.doorHinge*a,$=Math.sin(10*Math.PI/180);for(const f of e){const P=(f.r1+f.r2)/2;let A=null;const O=[[{x:f.ax,y:f.ay},{x:f.bx,y:f.by}],[{x:f.bx,y:f.by},{x:f.ax,y:f.ay}]];for(const[D,B]of O){const G=Math.hypot(D.x-f.cx,D.y-f.cy),q=(D.x-f.cx)/G,K=(D.y-f.cy)/G,W=[],$e=new Set;if(l.query(Math.min(f.cx,D.x)-_,Math.min(f.cy,D.y)-_,Math.max(f.cx,D.x)+_,Math.max(f.cy,D.y)+_,V=>{if(!V.alive||$e.has(V))return;$e.add(V);const{ux:ae,uy:Se}=m(V);if(Math.abs(ae*K-Se*q)>$)return;const Mi=V.thick/2+_,Oa=Math.abs((f.cx-V.ax)*-Se+(f.cy-V.ay)*ae),ja=Math.abs((D.x-V.ax)*-Se+(D.y-V.ay)*ae);if(Oa>Mi||ja>Mi)return;const La=(V.ax-f.cx)*q+(V.ay-f.cy)*K,Fa=(V.bx-f.cx)*q+(V.by-f.cy)*K,Na=Math.min(La,Fa),Ba=Math.max(La,Fa);Ba<-_||Na>P+_||W.push({w:V,lo:Na,hi:Ba,offsets:Oa+ja})}),W.length===0)continue;const it=gi(0,P,W.map(V=>[V.lo,V.hi])).reduce((V,[ae,Se])=>V-(Se-ae),P)/P,Be=V=>V.lo<=0&&V.hi>=0?0:Math.min(Math.abs(V.lo),Math.abs(V.hi)),dt=W.reduce((V,ae)=>Be(ae)<Be(V)||Be(ae)===Be(V)&&ae.offsets<V.offsets?ae:V);(!A||it<A.coverage-1e-6||Math.abs(it-A.coverage)<=1e-6&&dt.offsets<A.offsets)&&(A={host:dt.w,coverage:it,offsets:dt.offsets,closed:D,open:B})}if(!A)continue;const M=A.host,{ux:T,uy:I}=m(M),x=-I,E=T,F=Math.sign((A.closed.x-f.cx)*T+(A.closed.y-f.cy)*I)||1,H=(f.cx-M.ax)*T+(f.cy-M.ay)*I;v(M,Math.min(H,H+F*P),Math.max(H,H+F*P));const b=(f.cx-M.ax)*x+(f.cy-M.ay)*E,S=f.cx-x*b+T*F*(P/2),C=f.cy-E*b+I*F*(P/2);y(M,S,C)||n.push({host:M,cx:S,cy:C,width:P,type:"door",hinge:{x:f.cx,y:f.cy},openEnd:A.open})}const z=Math.sin(15*Math.PI/180);for(const f of t){if(f.role!=="window"&&f.role!=="door")continue;const P=Math.hypot(f.bx-f.ax,f.by-f.ay);if(P<j.openingSpanMin*a)continue;const A=(f.bx-f.ax)/P,O=(f.by-f.ay)/P,M=(f.ax+f.bx)/2,T=(f.ay+f.by)/2,I=h(M,T,()=>j.openingSnap*a,Ht=>{const{ux:it,uy:Be}=m(Ht);return Math.abs(it*O-Be*A)<=z});if(!I)continue;const{ux:x,uy:E}=m(I),F=(f.ax-I.ax)*x+(f.ay-I.ay)*E,H=(f.bx-I.ax)*x+(f.by-I.ay)*E,b=Math.min(F,H),S=Math.max(F,H),C=S-b;if(C<j.openingSpanMin*a||C>j.openingSpanMax*a)continue;v(I,b,S);const D=-E,B=x,G=(M-I.ax)*D+(T-I.ay)*B,q=M-D*G,K=T-B*G;if(y(I,q,K))continue;const W=C*i,$e=f.role==="door"?"door":W>1.8?"french_window":"window";n.push({host:I,cx:q,cy:K,width:C,type:$e})}return n}function Ni(r){const e=Bt(r);return/\b(salon|sejour|living|sam|salle a manger|lounge|dining)\b/.test(e)?{color:"rgba(59, 130, 246, 0.28)",icon:"mdi:sofa"}:/\b(chambre|ch|bed|bedroom|suite|parentale)\b/.test(e)?{color:"rgba(139, 92, 246, 0.28)",icon:"mdi:bed"}:/\b(cuisine|kitchen|kitchenette)\b/.test(e)?{color:"rgba(245, 158, 11, 0.28)",icon:"mdi:silverware-fork-knife"}:/\b(sdb|sde|bain|bains|douche|bath|bathroom|shower|salle d ?eau)\b/.test(e)?{color:"rgba(6, 182, 212, 0.28)",icon:"mdi:shower"}:/\b(wc|toilettes?|toilets?|restroom|lavatory)\b/.test(e)?{color:"rgba(16, 185, 129, 0.28)",icon:"mdi:toilet"}:/\b(bureau|office|travail|study|cabinet|consultation)\b/.test(e)?{color:"rgba(99, 102, 241, 0.28)",icon:"mdi:desk"}:/\b(entree|hall|couloir|degagement|degt|degat|corridor|palier|entry|entrance|hallway|landing|foyer)\b/.test(e)?{color:"rgba(100, 116, 139, 0.28)",icon:"mdi:door"}:/\b(buand|buanderie|lingerie|laundry)\b/.test(e)?{color:"rgba(100, 116, 139, 0.28)",icon:"mdi:washing-machine"}:/\b(cellier|cell|placard|plac|pl|dressing|debarras|storage|reserve)\b/.test(e)?{color:"rgba(148, 163, 184, 0.28)",icon:"mdi:wardrobe"}:/\b(garage|atelier|workshop)\b/.test(e)?{color:"rgba(120, 113, 108, 0.28)",icon:"mdi:garage"}:/\b(terrasse|balcon|patio|loggia|veranda|terrace|balcony|deck|porch)\b/.test(e)?{color:"rgba(20, 184, 166, 0.28)",icon:"mdi:balcony"}:{color:"rgba(56, 189, 248, 0.25)",icon:"mdi:home-outline"}}function Ml(r,e,t,i,a,n){const s=b=>({x:Q((b.x-e.x)*t),y:Q((b.y-e.y)*t)}),l=[];r.shapes.forEach((b,S)=>{if(b.role!=="wall"||b.points.length>Ys||Un(b,e))return;const C=wl(b.points)*t*t;C<.2||l.push({shape:b,index:S,points:b.points,areaM2:C,label:null})}),l.sort((b,S)=>b.areaM2-S.areaM2||b.index-S.index);const c=[],d=.02/t;for(const b of l){const S=c.find(C=>Math.abs(C.areaM2-b.areaM2)<=.01*b.areaM2&&Math.abs(C.shape.minX-b.shape.minX)<=d&&Math.abs(C.shape.maxX-b.shape.maxX)<=d&&Math.abs(C.shape.minY-b.shape.minY)<=d&&Math.abs(C.shape.maxY-b.shape.maxY)<=d);S?!S.shape.fillExplicit&&b.shape.fillExplicit&&(c[c.indexOf(S)]=b):c.push(b)}const p=(b,S,C)=>S>=b.shape.minX&&S<=b.shape.maxX&&C>=b.shape.minY&&C<=b.shape.maxY&&oe.isPointInPolygon({x:S,y:C},b.points),h=1/t,m=Math.max(j.dividerCell*h,Math.max(e.width,e.height)/256,1e-9),g=new Te(m);for(const b of a){const S=b.thick/2;g.insertBox(Math.min(b.ax,b.bx)-S,Math.min(b.ay,b.by)-S,Math.max(b.ax,b.bx)+S,Math.max(b.ay,b.by)+S,b)}const v=new Te(m),y=new Map;c.forEach((b,S)=>{v.insertBox(b.shape.minX,b.shape.minY,b.shape.maxX,b.shape.maxY,b),y.set(b,S)});const _=new Te(m);for(const b of r.labels)_.insertBox(b.x,b.y,b.x,b.y,b);const $=b=>{const S=[];return _.query(b.shape.minX,b.shape.minY,b.shape.maxX,b.shape.maxY,C=>{p(b,C.x,C.y)&&S.push(C)}),S},z=(b,S,C)=>{if(!p(b,S.x,S.y)||oe.distanceToBoundary(S,b.points)<=C.thick/2+j.dividerMargin*h)return!1;const D=C.thick/2+j.enclosed*h,B=j.enclosed*h;let G=!1;return v.query(S.x-D,S.y-D,S.x+D,S.y+D,q=>{if(G||q===b||q.areaM2>=b.areaM2)return;const K=q.shape;K.minX<b.shape.minX-B||K.maxX>b.shape.maxX+B||K.minY<b.shape.minY-B||K.maxY>b.shape.maxY+B||oe.distanceToBoundary(S,q.points)<=D&&(G=!0)}),!G},f=new Map,P=b=>{const S=f.get(b);if(S!==void 0)return S;const C=$(b).slice(0,Ks);let D=!1;for(let B=1;B<C.length&&!D;B++){const G=C[0],q=C[B],K=new Set;g.query(Math.min(G.x,q.x),Math.min(G.y,q.y),Math.max(G.x,q.x),Math.max(G.y,q.y),W=>{if(D||K.has(W)||(K.add(W),we(W)<j.dividerMin*h))return;const $e=xl(G.x,G.y,q.x,q.y,W.ax,W.ay,W.bx,W.by);$e&&z(b,$e,W)&&(D=!0)})}return f.set(b,D),D},A=(b,S,C,D)=>{const B=j.dividerReach*h+S.thick/2;if(oe.distanceToBoundary({x:C,y:D},b.points)<=B)return!0;let G=!1;return g.query(C-B,D-B,C+B,D+B,q=>{!G&&q!==S&&_i(C,D,q.ax,q.ay,q.bx,q.by)<=B+q.thick/2&&(G=!0)}),G},O=b=>{let S=!1;const C=new Set;return g.query(b.shape.minX,b.shape.minY,b.shape.maxX,b.shape.maxY,D=>{if(S||C.has(D)||(C.add(D),we(D)<j.dividerMin*h))return;const B={x:(D.ax+D.bx)/2,y:(D.ay+D.by)/2};z(b,B,D)&&A(b,D,D.ax,D.ay)&&A(b,D,D.bx,D.by)&&(S=!0)}),S},M=new Set;for(const b of r.labels){const S=[];v.query(b.x,b.y,b.x,b.y,D=>{p(D,b.x,b.y)&&S.push(D)}),S.sort((D,B)=>(y.get(D)??0)-(y.get(B)??0));const C=S.find(D=>!P(D));C&&(M.add(b),C.label===null&&(C.label=b.text))}const T=[],I=[],x=b=>{const S=yl(b.points,j.vertexMerge*h);if(S.length<3)return;if(oe.isSelfIntersecting(S)){T.push({name:b.label??"",areaM2:Q(b.areaM2),reason:"self_intersecting"});return}const C=S.map(s);I.push({candidate:b,worldPolygon:C,areaM2:oe.computeArea(C),centroid:oe.calculateCentroid(S)})},E=Math.max(i.minRoomAreaM2,j.unlabeledRoomMin);for(const b of c){if(b.label!==null){b.areaM2>=i.minRoomAreaM2&&b.areaM2<=i.maxRoomAreaM2?x(b):T.push({name:b.label,areaM2:Q(b.areaM2),reason:"area"});continue}!(b.shape.fillExplicit&&b.shape.fill==="light"||b.shape.roomHint)||b.areaM2<E||b.areaM2>i.maxRoomAreaM2||$(b).length>0||O(b)||I.some(C=>p(b,C.centroid.x,C.centroid.y))||x(b)}I.sort((b,S)=>b.candidate.index-S.candidate.index);const F=[],H=(b,S,C)=>{const D=Ni("");return{id:"",name:o("import.parser.room_generic",{n:C}),polygon:b,areaM2:S,color:D.color,icon:D.icon,height:i.defaultHeight}};if(I.forEach((b,S)=>{const C=lt("room"),D={...H(b.worldPolygon,b.areaM2,S+1),id:C};let B=b.candidate.label;if(!B){const q=r.labels.find(K=>!M.has(K)&&Ir.test(Bt(K.text))&&Math.hypot(s({x:K.x,y:K.y}).x-b.centroid.x,s({x:K.x,y:K.y}).y-b.centroid.y)<2.5);q&&(B=q.text,M.add(q))}const G=B?Ni(B):null;F.push({named:B&&G?{...D,name:B,color:G.color,icon:G.icon}:D,generic:D,fromLabel:!!B,labelOnly:!1})}),n>=4)for(const b of r.labels){if(M.has(b)||!Ir.test(Bt(b.text)))continue;const S=s({x:b.x,y:b.y});if(F.some(q=>!q.labelOnly&&oe.containsPoint(S,q.generic.polygon)))continue;const C=1.8,D=[{x:Q(S.x-C),y:Q(S.y-C)},{x:Q(S.x+C),y:Q(S.y-C)},{x:Q(S.x+C),y:Q(S.y+C)},{x:Q(S.x-C),y:Q(S.y+C)}],B=Ni(b.text),G={id:lt("room"),name:b.text,polygon:D,areaM2:oe.computeArea(D),color:B.color,icon:B.icon,height:i.defaultHeight};F.push({named:G,generic:G,fromLabel:!0,labelOnly:!0}),M.add(b)}return{rooms:F,ignored:T}}function Cl(r,e){if(e.size===0)return r;const t=n=>!e.has(ua(n)),i=new Map,a=[];return r.shapes.forEach((n,s)=>{t(n.layer)&&i.set(s,a.push(n)-1)}),{segments:r.segments.filter(n=>t(n.layer)).map(n=>n.shape>=0?{...n,shape:i.get(n.shape)??-1}:n),shapes:a,arcs:r.arcs.filter(n=>t(n.layer)),labels:r.labels.filter(n=>t(n.layer))}}function Rr(r){let e=1/0,t=1/0,i=-1/0,a=-1/0;const n=(s,l)=>{s<e&&(e=s),s>i&&(i=s),l<t&&(t=l),l>a&&(a=l)};for(const s of r.segments)s.role==="wall"&&(n(s.ax,s.ay),n(s.bx,s.by));if(!Number.isFinite(e))for(const s of r.shapes)n(s.minX,s.minY),n(s.maxX,s.maxY);return!Number.isFinite(e)||i-e<=0?null:{x:e,y:t,width:i-e,height:a-t}}function Tl(){return{wallCount:0,doorCount:0,windowCount:0,roomCount:0,textLabelCount:0,ignoredMeasurementLinesCount:0}}const qn=new Set(["door","double_door","sliding_door"]);function Or(r,e,t,i,a){const n=e.filter(s=>qn.has(s.type)).length;return{wallCount:r.length,doorCount:n,windowCount:e.length-n,roomCount:t.length,textLabelCount:i?t.filter(s=>s.fromLabel).length:0,ignoredMeasurementLinesCount:a}}function jr(r){return o("import.parser.failed",{detail:r instanceof Error?r.message:String(r)})}function Bi(r){return{success:!1,error:r,viewBox:{x:0,y:0,width:0,height:0},viewBoxSource:"default",markup:"",layers:[],truncated:!1,primitives:{segments:[],shapes:[],arcs:[],labels:[]}}}class Jt{static analyze(e){try{const t=new DOMParser().parseFromString(e,"image/svg+xml"),i=t.getElementsByTagName("parsererror")[0];if(i){const g=(i.textContent??"").replace(/\s+/g," ").trim().slice(0,200);return Bi(g?o("import.parser.invalid_svg_detail",{detail:g}):o("import.error.invalid_svg"))}const a=t.documentElement;if(!a||Ft(a)!=="svg")return Bi(o("import.parser.no_root"));t.doctype&&t.removeChild(t.doctype);const n=Ln(a.getAttribute("viewBox")),s=Dr(a.getAttribute("width")),l=Dr(a.getAttribute("height"));let c=n,d="attribute";!c&&s&&l&&(c={x:0,y:0,width:s,height:l},d="size");const p=new pl(a);if(p.run(c?.width??s??1e3,c?.height??l??750),!c){const g=p.contentBounds();if(g){const v=Math.max(g.width,g.height)*.02;c={x:g.x-v,y:g.y-v,width:g.width+2*v,height:g.height+2*v},d="content"}else c={x:0,y:0,width:s??1e3,height:l??750},d="default"}if(d!=="attribute"){const g=v=>String(Math.round(v*1e4)/1e4);a.setAttribute("viewBox",`${g(c.x)} ${g(c.y)} ${g(c.width)} ${g(c.height)}`)}let h=new XMLSerializer().serializeToString(a);a.namespaceURI||(h=h.replace(/^<svg\b/,`<svg xmlns="${sa}"`));const m=p.layers.map((g,v)=>({id:ua(v),name:g.name,elementCount:g.count})).filter(g=>g.elementCount>0);return m.length>0&&p.rootCount>0&&m.unshift({id:ua(-1),name:o("import.parser.outside_layers"),elementCount:p.rootCount}),{success:!0,viewBox:c,viewBoxSource:d,markup:h,layers:m,truncated:p.truncated,primitives:{segments:p.segments,shapes:p.shapes,arcs:p.arcs,labels:p.labels}}}catch(t){return Bi(jr(t))}}static detect(e,t={}){const i={success:!1,error:e.error,viewBox:e.viewBox,metersPerUnit:0,footprint:null,widthReference:"viewBox",walls:[],openings:[],rooms:[],ignoredRooms:[],layers:e.layers,truncated:e.truncated,measurementLineCount:0};if(!e.success)return i;try{const a=_l(t),n=Cl(e.primitives,a.excludedLayers),s=e.viewBox,l=a.totalWidthMeters;let c=l/(Rr(n)?.width||s.width),d=Pr(n,s,c,a);const p=Ar(d.walls);if(p){const M=l/p.width;Math.abs(M-c)>j.scaleRetry*c&&(c=M,d=Pr(n,s,c,a))}const h=d.walls.map(M=>({...M,alive:!0,into:null})),m=Sl(h,d.doorArcs,n.segments,c),g=h.filter(M=>M.alive);let v="viewBox",y=Ar(g);if(y?v="walls":(y=Rr(n),y&&(v="content")),c=l/(y?.width||s.width),!Number.isFinite(c)||c<=0)throw new Error(o("import.parser.invalid_scale"));const _=(M,T)=>({x:Q((M-s.x)*c),y:Q((T-s.y)*c)}),$=[],z=new Map;for(const M of g){const T=_(M.ax,M.ay),I=_(M.bx,M.by);if(Math.hypot(I.x-T.x,I.y-T.y)<j.minWall)continue;const x=M.thick*c,E=!M.measured&&Math.abs(x-a.defaultThickness)<=.1*a.defaultThickness?a.defaultThickness:Math.min(Math.max(j.pairMax,a.defaultThickness),Math.max(j.pairMin,Q(x))),F={id:lt("wall"),start:T,end:I,thickness:E,height:a.defaultHeight,type:"standard"};$.push(F),z.set(M,F)}const f=[];for(const M of m){const T=Hn(M.host),I=z.get(T);if(!I)continue;const x=we(T),E=(T.bx-T.ax)/x,F=(T.by-T.ay)/x,H=Math.hypot(I.end.x-I.start.x,I.end.y-I.start.y),b=Q(M.width*c);if(b<=0||b>H)continue;const S=((M.cx-T.ax)*E+(M.cy-T.ay)*F)*c,C={id:lt("op"),wallId:I.id,type:M.type,offset:Q(Math.min(H-b/2,Math.max(b/2,S))),width:b,flipSide:!1,flipDirection:!1};M.hinge&&M.openEnd&&(C.flipDirection=(M.hinge.x-M.cx)*E+(M.hinge.y-M.cy)*F>0,C.flipSide=(M.openEnd.x-M.hinge.x)*-F+(M.openEnd.y-M.hinge.y)*E<0),f.push(C)}const{rooms:P,ignored:A}=Ml(n,s,c,a,g,$.length),O=y?{width:Q(y.width*c),height:Q(y.height*c)}:null;return{...i,success:!0,error:void 0,metersPerUnit:c,footprint:O,widthReference:v,walls:$,openings:f,rooms:P,ignoredRooms:A,measurementLineCount:n.segments.filter(M=>M.role==="measurement").length}}catch(a){return{...i,error:jr(a)}}}static select(e,t={}){const i=t.importWalls!==!1,a=t.importDoors!==!1,n=t.importWindows!==!1,s=t.importRooms!==!1,l=t.importLabels!==!1,c=i?e.walls:[],d=new Set(c.map(g=>g.id)),p=e.openings.filter(g=>d.has(g.wallId)&&(qn.has(g.type)?a:n)),h=s?e.rooms.filter(g=>l||!g.labelOnly):[],m=h.map(g=>l?g.named:g.generic);return{success:e.success,walls:c,openings:p,rooms:m,viewBox:e.viewBox,metersPerUnit:e.metersPerUnit,footprint:e.footprint,widthReference:e.widthReference,stats:Or(c,p,h,l,e.measurementLineCount),available:e.success?Or(e.walls,e.openings,e.rooms,!0,e.measurementLineCount):Tl(),ignoredRooms:e.ignoredRooms,layers:e.layers,truncated:e.truncated,error:e.error}}static parseSvg(e,t={}){return this.select(this.detect(this.analyze(e),t),t)}}function Il(r){const e=r instanceof Uint8Array?r:new Uint8Array(r);if(e[0]===239&&e[1]===187&&e[2]===191)return new TextDecoder("utf-8").decode(e);if(e[0]===255&&e[1]===254)return new TextDecoder("utf-16le").decode(e);if(e[0]===254&&e[1]===255)return new TextDecoder("utf-16be").decode(e);let t="";for(let n=0;n<Math.min(e.length,512);n++)t+=String.fromCharCode(e[n]);const a=/^\s*<\?xml[^>]*?\bencoding\s*=\s*["']([A-Za-z0-9._:-]+)["']/.exec(t)?.[1].toLowerCase();if(a&&a!=="utf-8"&&a!=="utf8")try{return new TextDecoder(a).decode(e)}catch{}try{return new TextDecoder("utf-8",{fatal:!0}).decode(e)}catch{return new TextDecoder("windows-1252").decode(e)}}var Dl=Object.defineProperty,te=(r,e,t,i)=>{for(var a=void 0,n=r.length-1,s;n>=0;n--)(s=r[n])&&(a=s(e,t,a)||a);return a&&Dl(e,t,a),a};class ve extends Error{constructor(e){super(e()),this.name="ImportError",this.text=e}}const oi="image/svg+xml",Lr=40*1024*1024,Qt=25*1024*1024,Fr=40*1024*1024,Ui=.5,Hi=1e3,El=300,zl=.2,Al=2.5,qi=4e3,Nr=6,Pl=/\.(png|jpe?g|jfif|webp|gif|bmp|avif|heic|heif)$/,Rl=new Set(["door","double_door","sliding_door"]),Ol=["button:not([disabled])",'input:not([disabled]):not([type="hidden"])',"select:not([disabled])","textarea:not([disabled])","a[href]",'[tabindex]:not([tabindex="-1"])'].join(", ");function jl(r,e){const t=e.toLowerCase(),i=(r.type||"").toLowerCase();return i===oi||t.endsWith(".svg")?"svg":i==="application/json"||t.endsWith(".json")?"json":i==="application/pdf"||t.endsWith(".pdf")?"pdf":i.startsWith("image/")||Pl.test(t)?"raster":"unknown"}function Wi(r){if(!r)return!1;const e=r.trimStart();return e.startsWith("<svg")?!0:(e.startsWith("<?xml")||e.startsWith("<!DOCTYPE")||e.startsWith("<!--"))&&e.includes("<svg")}function Br(r){const e=r.trim().replace(",",".");if(e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function de(r){return r<1024*1024?o("import.unit.kb",{value:R(Math.max(1,Math.round(r/1024)))}):o("import.unit.mb",{value:R(r/(1024*1024),{maximumFractionDigits:1})})}function Ur(r){return R(r,{minimumFractionDigits:2,maximumFractionDigits:2})}function Ze(r,e,t={}){const i=new Intl.PluralRules(Ye()).select(e)==="one"?"one":"other";return o(`${r}_${i}`,{...t,count:R(e)})}function Ll(r){if(r instanceof ve)return r.text;const e=r instanceof Error?r.message:String(r);return()=>e}async function Gi(r,e){try{return await r}catch(t){throw console.warn("[home-architect] import:",t),new ve(()=>o(e))}}function Fl(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}const Nl=new Set(["checkbox","radio","range","file","button","submit","reset","color","image"]);function Vi(r){const e=Ge(r);return e instanceof HTMLInputElement&&Nl.has(e.type)?!1:ea(r)}function Hr(r){return Array.from(r.dataTransfer?.types??[]).includes("Files")}function Bl(r){if(r.files&&r.files.length>0)return r.files[0];for(const e of Array.from(r.items??[])){if(e.kind!=="file")continue;const t=e.getAsFile();if(t)return t}return null}function Ul(){let r=document.activeElement;for(;r?.shadowRoot?.activeElement;)r=r.shadowRoot.activeElement;return r instanceof HTMLElement&&r!==document.body?r:null}function Hl(r){let e;try{e=JSON.parse(r)}catch{throw new ve(()=>o("import.error.json_syntax"))}if(!(Fl(e)&&["walls","rooms","openings","bindings","furniture"].some(s=>Array.isArray(e[s]))))throw new ve(()=>o("import.error.not_backup"));const i=new Date().toISOString(),a={...vi(e),id:ta(),created_at:i,updated_at:i};delete a.revision,delete a.publish;let n=!1;return a.background&&!a.background.imageUrl?(delete a.background,n=!0):a.background&&delete a.background.assetId,{project:a,droppedBackground:n}}function ql(r){const e=r.name||o("import.notes.ignored_unnamed");return r.reason==="self_intersecting"?o("import.notes.ignored_self_intersecting",{name:e}):o("import.notes.ignored_area",{name:e,area:R(r.areaM2,{maximumFractionDigits:2})})}const Ea=class Ea extends De{constructor(){super(...arguments),this.currentLevel=xe,this.initialSvg=null,this.initialFile=null,this.source=null,this.busy=null,this.error=null,this.hint=null,this.detection=null,this.result=null,this.detectPending=!1,this.excludedLayers=[],this.svgImportMode="vectorize",this.keepSvgBackground=!0,this.importOptions={importWalls:!0,importDoors:!0,importWindows:!0,importRooms:!0,importLabels:!0},this.calibrateMode="auto_dimension",this.widthText="12",this.opacity=.4,this.isDragOver=!1,this.i18n=new Ee(this),this.hassRef=void 0,this.loadToken=0,this.detectTimer=null,this.returnFocusTo=null,this.handleKeyDown=e=>{if(e.stopPropagation(),e.key==="Escape"){if(e.isComposing)return;e.preventDefault(),this.close()}else if(e.key==="Tab")this.trapFocus(e);else if(e.key==="Enter"&&!e.isComposing){const t=Ge(e);t instanceof HTMLInputElement&&t.type==="text"&&(e.preventDefault(),this.flushDetection())}},this.handleWindowPaste=e=>{if(e.defaultPrevented||!e.clipboardData||Vi(e))return;const t=Bl(e.clipboardData);if(t){e.preventDefault(),this.processFile(t,"import.name.pasted_image");return}const i=e.clipboardData.getData("text/plain");Wi(i)&&(e.preventDefault(),this.loadSvgFromText(i.trim(),"import.name.pasted_svg"))},this.handleWindowDragOver=e=>{const t=Hr(e);!t&&Vi(e)||(e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect=t?"copy":"none"),t&&!this.isDragOver&&(this.isDragOver=!0))},this.handleWindowDragLeave=e=>{e.relatedTarget||(this.isDragOver=!1)},this.handleWindowDrop=e=>{if(!Hr(e)&&Vi(e))return;e.preventDefault(),this.isDragOver=!1;const i=e.dataTransfer?.files?.[0];i&&this.processFile(i)}}get hass(){return this.hassRef}set hass(e){this.hassRef=e,e&&Ke(this,e)}connectedCallback(){super.connectedCallback(),this.returnFocusTo=Ul(),this.addEventListener("keydown",this.handleKeyDown),window.addEventListener("dragover",this.handleWindowDragOver),window.addEventListener("dragleave",this.handleWindowDragLeave),window.addEventListener("drop",this.handleWindowDrop),window.addEventListener("paste",this.handleWindowPaste)}disconnectedCallback(){this.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("dragover",this.handleWindowDragOver),window.removeEventListener("dragleave",this.handleWindowDragLeave),window.removeEventListener("drop",this.handleWindowDrop),window.removeEventListener("paste",this.handleWindowPaste),this.loadToken++,this.clearDetectTimer(),this.releasePreview(),this.source=null,super.disconnectedCallback();const e=this.returnFocusTo;this.returnFocusTo=null,e?.isConnected&&e.focus({preventScroll:!0})}willUpdate(e){e.has("initialFile")&&this.initialFile&&this.processFile(this.initialFile,"import.name.dropped"),e.has("initialSvg")&&this.initialSvg&&this.loadSvgFromText(this.initialSvg,"import.name.pasted_svg")}firstUpdated(){this.dialogCard()?.focus()}dialogCard(){return this.renderRoot.querySelector(".modal-card")}trapFocus(e){const t=this.dialogCard();if(!t)return;const i=Array.from(t.querySelectorAll(Ol)).filter(l=>l.getClientRects().length>0),a=this.renderRoot.activeElement;if(i.length===0){e.preventDefault(),t.focus();return}const n=i[0],s=i[i.length-1];e.shiftKey&&(a===n||a===t||!a)?(e.preventDefault(),s.focus()):!e.shiftKey&&(a===s||!a)&&(e.preventDefault(),n.focus())}openFilePicker(){this.renderRoot.querySelector(".file-input")?.click()}handleFileInputChange(e){const t=e.target,i=t.files?.[0];t.value="",i&&this.processFile(i)}async pasteFromClipboard(){const e=navigator.clipboard;try{if(e?.read)for(const t of await e.read()){const i=t.types.find(a=>a.startsWith("image/"));if(i){const a=await t.getType(i),n=i===oi?"svg":i.slice(6).replace(/[^a-z0-9]/gi,"")||"png",s=`${o("import.name.clipboard_file")}.${n}`;this.processFile(new File([a],s,{type:i}),"import.name.pasted_image");return}if(t.types.includes("text/plain")){const a=await(await t.getType("text/plain")).text();if(Wi(a)){this.loadSvgFromText(a.trim(),"import.name.pasted_svg");return}}}else if(e?.readText){const t=await e.readText();if(Wi(t)){this.loadSvgFromText(t.trim(),"import.name.pasted_svg");return}}this.hint=()=>o("import.hint.clipboard_empty")}catch{this.hint=()=>o("import.hint.clipboard_denied")}}beginLoad(){const e=++this.loadToken;return this.clearDetectTimer(),this.releasePreview(),this.source=null,this.detection=null,this.result=null,this.detectPending=!1,this.excludedLayers=[],this.error=null,this.hint=null,this.busy=()=>o("import.busy.reading"),e}releasePreview(){const e=this.source;e&&e.kind!=="project"&&URL.revokeObjectURL(e.previewUrl)}fail(e){this.busy=null,this.error=Ll(e)}async yieldToBrowser(){await this.updateComplete,await new Promise(e=>setTimeout(e,30))}async processFile(e,t="import.name.imported"){const i=e.name,a=typeof i=="string"&&i?()=>i:()=>o(t),n=this.beginLoad();try{const s=jl(e,a());if(s==="svg"){if(e.size>Qt)throw new ve(()=>o("import.error.svg_file_too_large",{size:de(e.size),max:de(Qt)}));const l=Il(await Gi(e.arrayBuffer(),"import.error.read_failed"));if(n!==this.loadToken)return;await this.loadSvg(l,a,n)}else if(s==="raster")await this.loadRaster(e,a,n);else if(s==="json"){if(e.size>Fr)throw new ve(()=>o("import.error.backup_too_large",{size:de(e.size),max:de(Fr)}));const l=await Gi(go(e),"import.error.read_failed");if(n!==this.loadToken)return;const{project:c,droppedBackground:d}=Hl(l);this.source={kind:"project",name:a,project:c,droppedBackground:d},this.busy=null}else throw s==="pdf"?new ve(()=>o("import.error.pdf")):new ve(()=>o("import.error.unsupported"))}catch(s){n===this.loadToken&&this.fail(s)}}async loadSvgFromText(e,t){const i=this.beginLoad();try{if(e.length>Qt)throw new ve(()=>o("import.error.svg_code_too_large",{max:de(Qt)}));await this.loadSvg(e,()=>o(t),i)}catch(a){i===this.loadToken&&this.fail(a)}}async loadRaster(e,t,i){if(e.size>Lr)throw new ve(()=>o("import.error.image_too_large",{size:de(e.size),max:de(Lr)}));this.busy=()=>o("import.busy.compressing");const a=await Gi(Sn(e),"import.error.image_unreadable");if(i===this.loadToken){if(a.blob.size>qt)throw new ve(()=>o("import.error.image_too_heavy",{size:de(a.blob.size),max:de(qt)}));this.source={kind:"raster",name:t,originalBytes:e.size,background:{blob:a.blob,mimeType:a.mimeType,widthPx:a.width,heightPx:a.height,isSvg:!1},previewUrl:URL.createObjectURL(a.blob)},this.calibrateMode="interactive_calibrate",this.busy=null}}async loadSvg(e,t,i){if(this.busy=()=>o("import.busy.analyzing"),await this.yieldToBrowser(),i!==this.loadToken)return;const a=Jt.analyze(e);if(!a.success){const l=a.error;throw new ve(()=>l??o("import.error.invalid_svg"))}const n=new Blob([a.markup],{type:oi}),s=n.size<=qt;this.source={kind:"svg",name:t,analysis:a,background:{blob:n,mimeType:oi,widthPx:a.viewBox.width,heightPx:a.viewBox.height,isSvg:!0},previewUrl:URL.createObjectURL(n),canKeepBackground:s},this.svgImportMode="vectorize",this.keepSvgBackground=s,this.calibrateMode="auto_dimension",this.busy=()=>o("import.busy.detecting"),await this.yieldToBrowser(),i===this.loadToken&&(this.runDetection(),this.busy=null)}widthMeters(){const e=Br(this.widthText);return e!==null&&e>=Ui&&e<=Hi?e:null}widthError(){const e=Br(this.widthText);return e===null?o(this.widthText.trim()===""?"import.width.empty":"import.width.not_number"):e<Ui||e>Hi?o("import.width.range",{min:R(Ui),max:R(Hi)}):""}clearDetectTimer(){this.detectTimer!==null&&(clearTimeout(this.detectTimer),this.detectTimer=null)}parseOptions(e){return{totalWidthMeters:e,defaultThickness:zl,defaultHeight:Al,...this.importOptions,excludedLayers:this.excludedLayers}}runDetection(){this.clearDetectTimer(),this.detectPending=!1;const e=this.source,t=this.widthMeters();if(!e||e.kind!=="svg"||t===null)return;const i=this.parseOptions(t);this.detection=Jt.detect(e.analysis,i),this.result=Jt.select(this.detection,i)}scheduleDetection(){this.clearDetectTimer(),this.detectPending=!0,this.detectTimer=setTimeout(()=>{this.detectTimer=null,this.runDetection()},El)}flushDetection(){this.detectPending&&this.runDetection()}refreshSelection(){this.result=this.detection?Jt.select(this.detection,this.importOptions):null}handleWidthInput(e){this.widthText=e.target.value,this.source?.kind==="svg"&&this.scheduleDetection()}toggleImportCategory(e,t){this.importOptions={...this.importOptions,[e]:t},this.refreshSelection()}toggleLayer(e,t){const i=new Set(this.excludedLayers);t?i.delete(e):i.add(e),this.excludedLayers=[...i],this.scheduleDetection()}isVectorizing(){return this.source?.kind==="svg"&&this.svgImportMode==="vectorize"&&!!this.result?.success}includesBackground(e){return e.kind==="raster"?!0:e.canKeepBackground&&(!this.isVectorizing()||this.keepSvgBackground)}confirmBlocker(){const e=this.source;if(!e||this.busy)return"";if(e.kind==="project")return null;if(e.kind==="svg"&&this.isVectorizing()){if(this.widthMeters()===null)return"";const t=this.result?.stats;return!this.includesBackground(e)&&t&&t.wallCount+t.roomCount===0?o("import.blocker.nothing_selected"):null}return e.kind==="svg"&&!e.canKeepBackground?o("import.blocker.svg_too_heavy"):this.calibrateMode==="auto_dimension"&&this.widthMeters()===null?"":null}close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}confirmImport(){this.flushDetection();const e=this.source;if(!e||this.confirmBlocker()!==null)return;if(e.kind==="project"){this.dispatchEvent(new CustomEvent("import-project-backup",{detail:{project:e.project},bubbles:!0,composed:!0}));return}const t=this.buildResult(e);t&&this.dispatchEvent(new CustomEvent("import-confirmed",{detail:t,bubbles:!0,composed:!0}))}buildResult(e){const t=this.widthMeters();if(e.kind==="svg"&&this.isVectorizing()&&this.result){if(t===null)return null;const n=this.includesBackground(e);return{background:n?e.background:void 0,opacity:this.opacity,mode:"auto_dimension",totalWidthMeters:t,metersPerPixel:this.result.metersPerUnit,targetLevel:this.currentLevel,isSvgVectorized:!0,svgInterpretation:this.result,keepSvgBackground:n}}if(!this.includesBackground(e))return null;const i=this.calibrateMode==="auto_dimension";if(i&&t===null)return null;let a;return i&&t!==null&&(a=e.kind==="svg"&&this.detection?.success?this.detection.metersPerUnit:t/e.background.widthPx),{background:e.background,opacity:this.opacity,mode:this.calibrateMode,totalWidthMeters:i&&t!==null?t:void 0,metersPerPixel:a,targetLevel:this.currentLevel,isSvgVectorized:!1}}renderDropZone(){return u`
      <div
        class="drop-zone ${this.isDragOver?"dragover":""}"
        role="group"
        aria-label=${o("import.drop.region")}
        @click=${this.openFilePicker}
      >
        <span class="drop-icon" aria-hidden="true">📐</span>
        <div class="drop-text">${o("import.drop.title")}</div>
        <div class="drop-subtext">${o("import.drop.formats")}</div>

        <div class="drop-actions" @click=${e=>e.stopPropagation()}>
          <button type="button" class="btn-action-small" @click=${this.openFilePicker}>
            <span aria-hidden="true">📁</span>
            <span>${o("import.drop.choose_file")}</span>
          </button>
          <button type="button" class="btn-action-small" @click=${this.pasteFromClipboard}>
            <span aria-hidden="true">📋</span>
            <span>${o("import.drop.paste")}</span>
          </button>
        </div>
      </div>
    `}renderSourceCard(e){const t=u`
      <button type="button" class="btn-change-image" @click=${this.openFilePicker}>
        <span aria-hidden="true">🔄</span> ${o("import.source.replace")}
      </button>
    `;if(e.kind==="project")return u`
        <div class="preview-card ${this.isDragOver?"dragover":""}">
          <span class="preview-icon" aria-hidden="true">🗂️</span>
          <div class="preview-meta">
            <div class="preview-title">
              <span>${e.name()}</span>
              <span class="preview-badge">${o("import.source.backup_badge")}</span>
            </div>
            ${t}
          </div>
        </div>
      `;if(e.kind==="raster"){const a=e.background,n=a.blob.size!==e.originalBytes,s={width:R(a.widthPx),height:R(a.heightPx),size:de(a.blob.size)};return u`
        <div class="preview-card ${this.isDragOver?"dragover":""}">
          <img class="preview-thumb" src=${e.previewUrl} alt=${o("import.source.preview_alt")} />
          <div class="preview-meta">
            <div class="preview-title">
              <span aria-hidden="true">✅</span>
              <span>${e.name()}</span>
            </div>
            <div class="preview-dimensions">
              ${n?o("import.source.raster_size_recompressed",{...s,original:de(e.originalBytes)}):o("import.source.raster_size",s)}
            </div>
            ${t}
          </div>
        </div>
      `}const i=e.analysis.viewBox;return u`
      <div class="preview-card column ${this.isDragOver?"dragover":""}">
        <div class="preview-head">
          <div class="preview-meta">
            <div class="preview-title">
              <span aria-hidden="true">✅</span>
              <span>${e.name()}</span>
              <span class="preview-badge">${o("import.source.svg_badge")}</span>
            </div>
            <div class="preview-dimensions">
              ${o("import.source.svg_frame",{width:R(Math.round(i.width)),height:R(Math.round(i.height)),size:de(e.background.blob.size)})}
            </div>
          </div>
          ${t}
        </div>
        ${this.renderSvgFigure(e)}
      </div>
    `}renderSvgFigure(e){const t=e.analysis.viewBox,i=this.isVectorizing()?this.result:null;return u`
      <div class="preview-figure">
        <svg viewBox="${t.x} ${t.y} ${t.width} ${t.height}" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${o("import.preview.aria")}>
          <image href=${e.previewUrl} x=${t.x} y=${t.y} width=${t.width} height=${t.height} preserveAspectRatio="none" opacity=${i?.45:1}></image>
          ${i?this.renderOverlay(i,t):w}
        </svg>
      </div>
      ${i?u`
        <ul class="preview-legend" aria-label=${o("import.preview.legend")}>
          <li class="legend-item"><i class="swatch wall" aria-hidden="true"></i>${o("import.element.walls")}</li>
          <li class="legend-item"><i class="swatch door" aria-hidden="true"></i>${o("import.element.doors")}</li>
          <li class="legend-item"><i class="swatch window" aria-hidden="true"></i>${o("import.element.windows")}</li>
          <li class="legend-item"><i class="swatch room" aria-hidden="true"></i>${o("import.element.rooms")}</li>
          <li class="legend-item"><i class="swatch footprint" aria-hidden="true"></i>${o("import.legend.footprint")}</li>
        </ul>
      `:w}
    `}renderOverlay(e,t){const i=e.metersPerUnit;if(!(i>0))return w;const a=m=>m/i+t.x,n=m=>m/i+t.y,s=e.walls.slice(0,qi),l=new Map(s.map(m=>[m.id,m]));let c=1/0,d=1/0,p=-1/0,h=-1/0;for(const m of s){const g=m.thickness/2;c=Math.min(c,m.start.x-g,m.end.x-g),p=Math.max(p,m.start.x+g,m.end.x+g),d=Math.min(d,m.start.y-g,m.end.y-g),h=Math.max(h,m.start.y+g,m.end.y+g)}return je`
      ${e.rooms.slice(0,qi).map(m=>je`
        <polygon class="ov-room" points=${m.polygon.map(g=>`${a(g.x)},${n(g.y)}`).join(" ")}></polygon>
      `)}
      ${s.map(m=>je`
        <line class="ov-wall" x1=${a(m.start.x)} y1=${n(m.start.y)} x2=${a(m.end.x)} y2=${n(m.end.y)}></line>
      `)}
      ${e.openings.slice(0,qi).map(m=>{const g=l.get(m.wallId);if(!g)return w;const v=Math.hypot(g.end.x-g.start.x,g.end.y-g.start.y);if(v===0)return w;const y=(g.end.x-g.start.x)/v,_=(g.end.y-g.start.y)/v,$=m.offset-m.width/2,z=m.offset+m.width/2;return je`
          <line class="ov-opening ${Rl.has(m.type)?"door":"window"}"
            x1=${a(g.start.x+y*$)} y1=${n(g.start.y+_*$)} x2=${a(g.start.x+y*z)} y2=${n(g.start.y+_*z)}></line>
        `})}
      ${Number.isFinite(c)?je`
        <rect class="ov-footprint" x=${a(c)} y=${n(d)} width=${(p-c)/i} height=${(h-d)/i}></rect>
      `:w}
    `}renderCategory(e,t,i,a,n=!1){const s=this.importOptions[e];return u`
      <label class="category-toggle ${s&&!n?"active":""} ${n?"disabled":""}">
        <input
          type="checkbox"
          .checked=${s}
          ?disabled=${n}
          @change=${l=>this.toggleImportCategory(e,l.target.checked)}
        />
        <span aria-hidden="true">${t}</span>
        <span>${o(i)}</span>
        <span class="cat-count">(${R(a)})</span>
      </label>
    `}renderLayers(e){const t=e.analysis.layers;if(t.length<2)return w;const i=new Set(this.excludedLayers);return u`
      <div class="import-categories-box" role="group" aria-labelledby="import-layers-title">
        <div class="categories-title" id="import-layers-title">${o("import.layers.title")}</div>
        <div class="categories-grid">
          ${t.map(a=>u`
            <label class="category-toggle ${i.has(a.id)?"":"active"}">
              <input
                type="checkbox"
                .checked=${!i.has(a.id)}
                @change=${n=>this.toggleLayer(a.id,n.target.checked)}
              />
              <span>${a.name}</span>
              <span class="cat-count">(${R(a.elementCount)})</span>
            </label>
          `)}
        </div>
      </div>
    `}renderDetectionNotes(){const e=this.result;if(!e)return w;const t=e.ignoredRooms,i=t.slice(0,Nr).map(ql).join(", "),a=t.length>Nr?`${i}…`:i;return u`
      ${e.stats.ignoredMeasurementLinesCount>0?u`
        <div class="ignored-note">
          <span aria-hidden="true">ℹ️</span> ${Ze("import.notes.measurement_lines",e.stats.ignoredMeasurementLinesCount)}
        </div>
      `:w}
      ${t.length>0?u`
        <div class="warn-note">
          <span aria-hidden="true">⚠️</span> ${Ze("import.notes.ignored_rooms",t.length,{list:a})}
        </div>
      `:w}
      ${e.truncated?u`
        <div class="warn-note"><span aria-hidden="true">⚠️</span> ${o("import.notes.truncated")}</div>
      `:w}
    `}renderSvgOptions(e){const t=this.result,i=t?.success?t.available:null,a=this.importOptions.importWalls,n=t&&!t.success?t.error??o("import.svg.detection_failed"):null;return u`
      <div class="svg-interpret-box">
        <div class="svg-box-header">
          <span class="svg-box-icon" aria-hidden="true">✨</span>
          <div>
            <div class="svg-box-title">${o("import.svg.title")}</div>
            <div class="svg-box-subtitle">${o("import.svg.subtitle")}</div>
          </div>
        </div>

        ${n?u`<div class="error-box" role="alert"><span aria-hidden="true">❌</span> ${n}</div>`:w}

        <div class="svg-mode-selector" role="radiogroup" aria-label=${o("import.svg.mode_group")}>
          <!-- Mode 1 : Convertir en murs, portes, fenêtres et pièces (la carte entière est cliquable) -->
          <div
            class="svg-choice-card ${this.svgImportMode==="vectorize"?"selected":""}"
            @click=${()=>this.svgImportMode="vectorize"}
          >
            <input
              type="radio"
              id="svg-mode-vectorize"
              name="svg_mode"
              class="svg-choice-radio"
              aria-describedby="svg-mode-vectorize-desc"
              .checked=${this.svgImportMode==="vectorize"}
              @change=${()=>this.svgImportMode="vectorize"}
            />
            <div class="svg-choice-content">
              <label class="svg-choice-title" for="svg-mode-vectorize">
                <span><span aria-hidden="true">🧱</span> ${o("import.svg.vectorize_title")}</span>
                <span class="badge-magic">${o("import.common.recommended")}</span>
              </label>
              <div class="svg-choice-desc" id="svg-mode-vectorize-desc">${o("import.svg.vectorize_desc")}</div>

              ${i?u`
                <!-- Sélection granulaire des éléments à importer (nombres détectés, avant filtres) -->
                <div
                  class="import-categories-box"
                  role="group"
                  aria-labelledby="import-categories-title"
                  @click=${s=>s.stopPropagation()}
                >
                  <div class="categories-title" id="import-categories-title">${o("import.categories.title")}</div>
                  <div class="categories-grid">
                    ${this.renderCategory("importWalls","🧱","import.element.walls",i.wallCount)}
                    ${this.renderCategory("importDoors","🚪","import.element.doors",i.doorCount,!a)}
                    ${this.renderCategory("importWindows","🪟","import.element.windows",i.windowCount,!a)}
                    ${this.renderCategory("importRooms","🏠","import.element.rooms",i.roomCount)}
                    ${this.renderCategory("importLabels","🏷️","import.element.labels",i.textLabelCount,!this.importOptions.importRooms)}
                  </div>
                  ${!a&&i.doorCount+i.windowCount>0?u`
                    <div class="ignored-note"><span aria-hidden="true">ℹ️</span> ${o("import.categories.openings_need_walls")}</div>
                  `:w}
                </div>
              `:w}

              <div @click=${s=>s.stopPropagation()}>
                ${this.renderLayers(e)}
                ${this.renderDetectionNotes()}
              </div>

              <div class="checkbox-wrap" @click=${s=>s.stopPropagation()}>
                <input
                  type="checkbox"
                  id="chk_keep_bg"
                  .checked=${this.keepSvgBackground&&e.canKeepBackground}
                  ?disabled=${!e.canKeepBackground}
                  @change=${s=>this.keepSvgBackground=s.target.checked}
                />
                <label for="chk_keep_bg">${o("import.svg.keep_background")}</label>
              </div>
              ${e.canKeepBackground?w:u`
                <div class="warn-note">
                  <span aria-hidden="true">⚠️</span>
                  ${o("import.svg.too_heavy_for_background",{size:de(e.background.blob.size),max:de(qt)})}
                </div>
              `}
            </div>
          </div>

          <!-- Mode 2 : Calque de fond simple -->
          <div
            class="svg-choice-card ${this.svgImportMode==="background_only"?"selected":""} ${e.canKeepBackground?"":"disabled"}"
            @click=${()=>{e.canKeepBackground&&(this.svgImportMode="background_only")}}
          >
            <input
              type="radio"
              id="svg-mode-background"
              name="svg_mode"
              class="svg-choice-radio"
              aria-describedby="svg-mode-background-desc"
              .checked=${this.svgImportMode==="background_only"}
              ?disabled=${!e.canKeepBackground}
              @change=${()=>this.svgImportMode="background_only"}
            />
            <div class="svg-choice-content">
              <label class="svg-choice-title" for="svg-mode-background">
                <span><span aria-hidden="true">🖼️</span> ${o("import.svg.background_title")}</span>
              </label>
              <div class="svg-choice-desc" id="svg-mode-background-desc">${o("import.svg.background_desc")}</div>
            </div>
          </div>
        </div>
      </div>
    `}renderProjectSummary(e){const t=e.project,i=t.furniture?.length??0;return u`
      <div class="svg-interpret-box">
        <div class="svg-box-header">
          <span class="svg-box-icon" aria-hidden="true">🗂️</span>
          <div>
            <div class="svg-box-title">${t.name}</div>
            <div class="svg-box-subtitle">${o("import.project.level",{level:pe(t.category)})}</div>
          </div>
        </div>
        <ul class="svg-pills-row">
          <li class="stat-pill wall"><span aria-hidden="true">🧱</span> ${Ze("import.count.walls",t.walls.length)}</li>
          <li class="stat-pill door"><span aria-hidden="true">🚪</span> ${Ze("import.count.openings",t.openings.length)}</li>
          <li class="stat-pill room"><span aria-hidden="true">🏠</span> ${Ze("import.count.rooms",t.rooms.length)}</li>
          <li class="stat-pill window"><span aria-hidden="true">🛋️</span> ${Ze("import.count.furniture",i)}</li>
          <li class="stat-pill label"><span aria-hidden="true">⚡</span> ${Ze("import.count.entities",t.bindings.length)}</li>
          ${t.background?u`
            <li class="stat-pill wall"><span aria-hidden="true">🖼️</span> ${o("import.project.background")}</li>
          `:w}
        </ul>
        <div class="ignored-note"><span aria-hidden="true">ℹ️</span> ${o("import.project.new_plan_note")}</div>
        ${e.droppedBackground?u`
          <div class="warn-note"><span aria-hidden="true">⚠️</span> ${o("import.project.dropped_background")}</div>
        `:w}
      </div>
    `}renderWidthInput(e){const t=this.widthError();return u`
      <div class="input-row" @click=${i=>i.stopPropagation()}>
        <label class="input-label" for="import-width">${o(e)}</label>
        <input
          id="import-width"
          type="text"
          inputmode="decimal"
          autocomplete="off"
          class="dimension-input ${t?"invalid":""}"
          aria-invalid=${t?"true":"false"}
          aria-describedby=${t?"import-width-unit import-width-error":"import-width-unit"}
          .value=${this.widthText}
          @input=${this.handleWidthInput}
          @change=${this.flushDetection}
        />
        <span class="unit-tag" id="import-width-unit">${o("import.common.meters")}</span>
      </div>
      ${t?u`<div class="field-error" id="import-width-error">${t}</div>`:w}
    `}renderFootprintInfo(){const e=this.detection;if(!e?.success||!e.footprint)return w;const i={reference:o(e.widthReference==="walls"?"import.footprint.walls":e.widthReference==="content"?"import.footprint.content":"import.footprint.page"),width:Ur(e.footprint.width),height:Ur(e.footprint.height)};return u`
      <div class="footprint-info">
        ${o(this.detectPending?"import.footprint.info_pending":"import.footprint.info",i)}
      </div>
    `}renderScaleTitle(){return u`
      <div class="section-title" id="import-scale-title">
        <span aria-hidden="true">📏</span>
        <span>${o("import.scale.title")}</span>
      </div>
    `}renderScale(e){if(this.isVectorizing())return u`
        <div>
          ${this.renderScaleTitle()}
          <div class="option-card selected static">
            <div class="option-content">
              <div class="option-desc">${o("import.scale.vectorize_desc")}</div>
              ${this.renderWidthInput("import.scale.building_width")}
              ${this.renderFootprintInfo()}
            </div>
          </div>
        </div>
      `;const t=e.kind==="svg",i=(a,n,s,l,c,d)=>u`
      <div
        class="option-card ${this.calibrateMode===a?"selected":""}"
        @click=${()=>this.calibrateMode=a}
      >
        <input
          type="radio"
          class="option-radio"
          id="calib-${a}"
          name="calib"
          aria-describedby="calib-${a}-desc"
          .checked=${this.calibrateMode===a}
          @change=${()=>this.calibrateMode=a}
        />
        <div class="option-content">
          <label class="option-title" for="calib-${a}">
            <span><span aria-hidden="true">${n}</span> ${o(s)}</span>
            ${l?u`<span class="option-badge">${o("import.common.recommended")}</span>`:w}
          </label>
          <div class="option-desc" id="calib-${a}-desc">${o(c)}</div>
          ${this.calibrateMode===a?d:w}
        </div>
      </div>
    `;return u`
      <div>
        ${this.renderScaleTitle()}
        <div class="calibrate-options" role="radiogroup" aria-labelledby="import-scale-title">
          ${i("auto_dimension","⚡",t?"import.scale.auto_svg_title":"import.scale.auto_raster_title",t,t?"import.scale.auto_svg_desc":"import.scale.auto_raster_desc",u`
              ${this.renderWidthInput(t?"import.scale.building_width":"import.scale.image_width")}
              ${t?this.renderFootprintInfo():w}
            `)}
          ${i("interactive_calibrate","📐","import.scale.measure_title",!t,"import.scale.measure_desc",w)}
        </div>
      </div>
    `}renderOpacity(){const e=R(this.opacity,{style:"percent",maximumFractionDigits:0});return u`
      <div class="slider-row">
        <label class="slider-label" for="import-opacity">${o("import.opacity.label")}</label>
        <input
          id="import-opacity"
          type="range"
          class="slider-input"
          min="0.05"
          max="1.0"
          step="0.05"
          aria-valuetext=${e}
          .value=${String(this.opacity)}
          @input=${t=>this.opacity=Number(t.target.value)}
        />
        <output class="slider-val" for="import-opacity">${e}</output>
      </div>
    `}renderConfirmLabel(e){if(e?.kind==="project")return u`<span aria-hidden="true">📂</span><span>${o("import.confirm.project")}</span>`;if(this.isVectorizing()){const t=Ze("import.count.walls",this.result?.stats.wallCount??0);return u`<span aria-hidden="true">✨</span><span>${o("import.confirm.vectorize",{walls:t})}</span>`}return u`<span aria-hidden="true">🚀</span><span>${o("import.confirm.load")}</span>`}renderLiveRegion(e,t,i){const a=!!e&&e.kind!=="project"&&(t||this.calibrateMode==="auto_dimension");return u`
      <div class="sr-only" role="status" aria-live="polite">
        <span>${this.busy?this.busy():""}</span>
        <span>${this.hint?this.hint():""}</span>
        <span>${a?this.widthError():""}</span>
        <span>${i??""}</span>
      </div>
    `}render(){const e=this.source,t=this.confirmBlocker(),i=this.isVectorizing(),a=o("import.common.close");return u`
      <div
        class="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="import-title"
        aria-describedby="import-subtitle"
        tabindex="-1"
      >
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon" aria-hidden="true">📥</span>
            <div>
              <h2 class="modal-title" id="import-title">${o("import.title")}</h2>
              <p class="modal-subtitle" id="import-subtitle">${o("import.subtitle")}</p>
            </div>
          </div>
          <button type="button" class="btn-close" title=${a} aria-label=${a} @click=${this.close}>
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div class="modal-body">
          <input
            class="file-input"
            type="file"
            accept="image/*,.svg,image/svg+xml,.json,application/json"
            @change=${this.handleFileInputChange}
          />

          ${e?this.renderSourceCard(e):this.renderDropZone()}

          ${this.busy?u`
            <div class="busy-box"><span class="spinner" aria-hidden="true"></span><span>${this.busy()}</span></div>
          `:w}
          ${this.error?u`<div class="error-box" role="alert"><span aria-hidden="true">❌</span> ${this.error()}</div>`:w}
          ${this.hint?u`<div class="ignored-note"><span aria-hidden="true">ℹ️</span> ${this.hint()}</div>`:w}

          ${e?.kind==="svg"?this.renderSvgOptions(e):w}
          ${e?.kind==="project"?this.renderProjectSummary(e):w}
          ${e&&e.kind!=="project"?this.renderScale(e):w}
          ${e&&e.kind!=="project"&&this.includesBackground(e)?this.renderOpacity():w}
        </div>

        <div class="modal-footer">
          ${t?u`<span class="footer-note" id="import-blocker">${t}</span>`:w}
          <button type="button" class="btn-cancel" @click=${this.close}>${o("import.common.cancel")}</button>
          <button
            type="button"
            class="btn-confirm ${i?"btn-magic":""}"
            ?disabled=${t!==null}
            aria-describedby=${t?"import-blocker":w}
            @click=${this.confirmImport}
          >
            ${this.renderConfirmLabel(e)}
          </button>
        </div>

        ${this.renderLiveRegion(e,i,t)}
      </div>
    `}};Ea.styles=[ze,he`
    :host {
      --import-magic: #a855f7;
      --import-magic-tint: rgba(168, 85, 247, 0.14);
      --import-label-color: #ec4899;
      --import-label-tint: rgba(236, 72, 153, 0.12);
      --import-accent-tint: rgba(3, 169, 244, 0.12);
      --import-danger-tint: rgba(219, 68, 55, 0.12);
      --import-warning-tint: rgba(255, 166, 0, 0.14);
      --import-success-tint: rgba(67, 160, 71, 0.14);
      /* Un plan d'architecte est dessiné pour du papier : l'aperçu garde un fond clair dans les deux thèmes. */
      --import-paper: #ffffff;
      --import-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.45);

      position: fixed;
      inset: 0;
      background: var(--arch-ui-overlay);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--arch-ui-font);
      color: var(--arch-ui-text);
      animation: fadeIn 0.2s ease-out;
    }

    /* Teintes dérivées des couleurs du thème quand le navigateur sait les mélanger. */
    @supports (color: color-mix(in srgb, red 50%, blue)) {
      :host {
        --import-accent-tint: color-mix(in srgb, var(--arch-ui-accent) 12%, transparent);
        --import-danger-tint: color-mix(in srgb, var(--arch-ui-danger) 12%, transparent);
        --import-warning-tint: color-mix(in srgb, var(--arch-ui-warning) 14%, transparent);
        --import-success-tint: color-mix(in srgb, var(--arch-ui-success) 14%, transparent);
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-card {
      background: var(--arch-ui-surface);
      color: var(--arch-ui-text);
      border: 1px solid var(--arch-ui-border);
      border-radius: var(--arch-ui-radius);
      width: 620px;
      max-width: 94vw;
      max-height: 92vh;
      display: flex;
      flex-direction: column;
      box-shadow: var(--import-shadow);
      overflow: hidden;
    }

    /* Focus initial sur la boîte de dialogue elle-même : pas d'anneau, l'ombre reste celle de la carte. */
    .modal-card:focus,
    .modal-card:focus-visible {
      outline: none;
      box-shadow: var(--import-shadow);
    }

    .modal-header {
      padding: 18px 24px;
      border-bottom: 1px solid var(--arch-ui-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .modal-title-group {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }

    .modal-icon {
      font-size: 1.6rem;
    }

    .modal-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      margin: 0;
    }

    .modal-subtitle {
      font-size: 0.8rem;
      color: var(--arch-ui-text-muted);
      margin: 2px 0 0 0;
    }

    button {
      font-family: inherit;
    }

    .btn-close {
      flex: none;
      background: transparent;
      border: none;
      color: var(--arch-ui-text-muted);
      font-size: 20px;
      line-height: 1;
      cursor: pointer;
      padding: 6px;
      border-radius: 6px;
      transition: background-color 0.15s ease, color 0.15s ease;
    }

    .btn-close:hover {
      color: var(--arch-ui-text);
      background: var(--arch-ui-surface-2);
    }

    .modal-body {
      padding: 22px 24px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    /* Zone de dépôt (glisser-déposer) */
    .drop-zone {
      border: 2px dashed var(--arch-ui-border);
      background: var(--arch-ui-bg);
      border-radius: 14px;
      padding: 24px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      cursor: pointer;
      transition: border-color 0.2s ease, background-color 0.2s ease;
      position: relative;
    }

    .drop-zone:hover,
    .drop-zone.dragover {
      border-color: var(--arch-ui-accent);
      background: var(--import-accent-tint);
    }

    .drop-icon {
      font-size: 2.4rem;
    }

    .drop-text {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--arch-ui-text);
    }

    .drop-subtext {
      font-size: 0.8rem;
      color: var(--arch-ui-text-muted);
    }

    .drop-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 4px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .btn-action-small {
      background: var(--arch-ui-surface-2);
      color: var(--arch-ui-text);
      border: 1px solid var(--arch-ui-border);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: border-color 0.2s ease;
    }

    .btn-action-small:hover {
      border-color: var(--arch-ui-accent);
    }

    /* Aperçu du plan chargé */
    .preview-card {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 12px;
      padding: 12px;
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .preview-thumb {
      width: 100px;
      height: 75px;
      border-radius: 8px;
      object-fit: contain;
      border: 1px solid var(--arch-ui-border);
      background: var(--import-paper);
    }

    .preview-meta {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .preview-title {
      font-size: 0.92rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      overflow-wrap: anywhere;
    }

    .preview-badge {
      font-size: 0.72rem;
      padding: 2px 7px;
      background: var(--import-magic-tint);
      color: var(--arch-ui-text);
      border: 1px solid var(--import-magic);
      border-radius: 9999px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .preview-dimensions {
      font-size: 0.8rem;
      color: var(--arch-ui-text-muted);
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    .btn-change-image {
      background: transparent;
      border: 1px solid var(--arch-ui-border);
      color: var(--arch-ui-text-muted);
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 0.75rem;
      cursor: pointer;
      width: fit-content;
      margin-top: 4px;
      flex: none;
    }

    .btn-change-image:hover {
      color: var(--arch-ui-text);
      border-color: var(--arch-ui-text-muted);
    }

    /* Interprétation vectorielle (SVG) */
    .svg-interpret-box {
      background: var(--import-magic-tint);
      border: 1.5px solid var(--import-magic);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .svg-box-header {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .svg-box-icon {
      font-size: 1.5rem;
    }

    .svg-box-title {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      overflow-wrap: anywhere;
    }

    .svg-box-subtitle {
      font-size: 0.8rem;
      color: var(--arch-ui-text-muted);
      margin-top: 2px;
    }

    .svg-mode-selector {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .svg-choice-card {
      background: var(--arch-ui-surface);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 12px 14px;
      cursor: pointer;
      display: flex;
      gap: 12px;
      align-items: flex-start;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .svg-choice-card:hover {
      border-color: var(--import-magic);
    }

    .svg-choice-card.selected {
      border-color: var(--import-magic);
      box-shadow: inset 0 0 0 1px var(--import-magic);
    }

    .svg-choice-radio {
      margin-top: 3px;
      accent-color: var(--import-magic);
    }

    .svg-choice-content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .svg-choice-title {
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      cursor: pointer;
    }

    .badge-magic {
      font-size: 0.7rem;
      padding: 2px 7px;
      background: var(--import-magic-tint);
      color: var(--arch-ui-text);
      border: 1px solid var(--import-magic);
      border-radius: 9999px;
      font-weight: 700;
    }

    .svg-choice-desc {
      font-size: 0.78rem;
      color: var(--arch-ui-text-muted);
      line-height: 1.35;
    }

    .svg-pills-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin: 4px 0 0;
      padding: 0;
      list-style: none;
    }

    .stat-pill {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 4px;
      color: var(--arch-ui-text);
      border: 1px solid var(--arch-ui-border);
    }

    .stat-pill.wall {
      background: var(--import-accent-tint);
      border-color: var(--arch-ui-accent);
    }

    .stat-pill.door {
      background: var(--import-warning-tint);
      border-color: var(--arch-ui-warning);
    }

    .stat-pill.window {
      background: var(--import-success-tint);
      border-color: var(--arch-ui-success);
    }

    .stat-pill.room {
      background: var(--import-magic-tint);
      border-color: var(--import-magic);
    }

    .stat-pill.label {
      background: var(--import-label-tint);
      border-color: var(--import-label-color);
    }

    .checkbox-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 6px;
      font-size: 0.8rem;
      color: var(--arch-ui-text);
    }

    .checkbox-wrap input {
      accent-color: var(--import-magic);
      cursor: pointer;
    }

    .checkbox-wrap label {
      cursor: pointer;
    }

    /* Cases à cocher des éléments et des calques à importer */
    .import-categories-box {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 10px 12px;
      margin-top: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .categories-title {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .categories-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .category-toggle {
      background: var(--arch-ui-surface);
      border: 1px solid var(--arch-ui-border);
      border-radius: 8px;
      padding: 5px 10px;
      font-size: 0.82rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--arch-ui-text-muted);
      transition: border-color 0.15s ease, background-color 0.15s ease;
      user-select: none;
    }

    .category-toggle:hover {
      border-color: var(--import-magic);
      color: var(--arch-ui-text);
    }

    .category-toggle.active {
      background: var(--import-magic-tint);
      border-color: var(--import-magic);
      color: var(--arch-ui-text);
      font-weight: 600;
    }

    .category-toggle input[type="checkbox"] {
      accent-color: var(--import-magic);
      cursor: pointer;
      margin: 0;
    }

    .cat-count {
      font-size: 0.75rem;
      color: var(--arch-ui-text-muted);
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    /* Notes : information, avertissement, erreur (texte du thème sur fond teinté) */
    .ignored-note,
    .warn-note,
    .error-box {
      color: var(--arch-ui-text);
      line-height: 1.4;
      border: 1px solid;
    }

    .ignored-note,
    .warn-note {
      font-size: 0.76rem;
      border-radius: 6px;
      padding: 5px 8px;
      margin-top: 4px;
    }

    .ignored-note {
      background: var(--import-accent-tint);
      border-color: var(--arch-ui-accent);
    }

    .warn-note {
      background: var(--import-warning-tint);
      border-color: var(--arch-ui-warning);
    }

    .error-box {
      font-size: 0.82rem;
      background: var(--import-danger-tint);
      border-color: var(--arch-ui-danger);
      border-radius: 10px;
      padding: 10px 12px;
    }

    /* Méthode d'étalonnage */
    .section-title {
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .calibrate-options {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .option-card {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 12px 14px;
      cursor: pointer;
      display: flex;
      gap: 12px;
      align-items: flex-start;
      transition: border-color 0.2s ease, background-color 0.2s ease;
    }

    .option-card:hover {
      border-color: var(--arch-ui-accent);
    }

    .option-card.selected {
      border-color: var(--arch-ui-accent);
      background: var(--import-accent-tint);
      box-shadow: inset 0 0 0 1px var(--arch-ui-accent);
    }

    .option-card.static {
      cursor: default;
    }

    .option-radio {
      margin-top: 3px;
      cursor: pointer;
      accent-color: var(--arch-ui-accent);
    }

    .option-content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .option-title {
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      cursor: pointer;
    }

    .option-badge {
      font-size: 0.7rem;
      padding: 2px 6px;
      background: var(--import-success-tint);
      color: var(--arch-ui-text);
      border-radius: 9999px;
      border: 1px solid var(--arch-ui-success);
      font-weight: 600;
    }

    .option-desc {
      font-size: 0.78rem;
      color: var(--arch-ui-text-muted);
      line-height: 1.35;
    }

    .input-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 8px;
      flex-wrap: wrap;
    }

    .input-label {
      font-size: 0.82rem;
      color: var(--arch-ui-text-muted);
    }

    .dimension-input {
      background: var(--arch-ui-surface);
      border: 1px solid var(--arch-ui-border);
      border-radius: 6px;
      color: var(--arch-ui-text);
      padding: 6px 10px;
      font: inherit;
      font-size: 0.95rem;
      font-weight: 700;
      width: 100px;
      text-align: center;
      outline: none;
    }

    .dimension-input:focus {
      border-color: var(--arch-ui-accent);
      box-shadow: var(--arch-ui-focus-ring);
    }

    .dimension-input.invalid {
      border-color: var(--arch-ui-danger);
    }

    .unit-tag {
      font-size: 0.85rem;
      color: var(--arch-ui-text-muted);
      font-weight: 600;
    }

    .field-error {
      color: var(--arch-ui-text);
      font-size: 0.8rem;
      font-weight: 600;
      margin-top: 6px;
      padding-left: 8px;
      border-left: 3px solid var(--arch-ui-danger);
    }

    .footprint-info {
      font-size: 0.76rem;
      color: var(--arch-ui-text-muted);
      margin-top: 6px;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }

    /* Calque & opacité */
    .slider-row {
      display: flex;
      align-items: center;
      gap: 14px;
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 10px 14px;
    }

    .slider-label {
      font-size: 0.82rem;
      color: var(--arch-ui-text);
      min-width: 130px;
    }

    .slider-input {
      flex: 1;
      min-width: 0;
      cursor: pointer;
      accent-color: var(--arch-ui-accent);
    }

    .slider-val {
      font-size: 0.82rem;
      color: var(--arch-ui-text);
      font-weight: 700;
      min-width: 44px;
      text-align: right;
    }

    .modal-footer {
      padding: 16px 24px;
      border-top: 1px solid var(--arch-ui-border);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
    }

    .footer-note {
      margin-right: auto;
      font-size: 0.78rem;
      color: var(--arch-ui-text-muted);
    }

    .btn-cancel {
      background: transparent;
      color: var(--arch-ui-text);
      border: 1px solid var(--arch-ui-border);
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 0.88rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .btn-cancel:hover {
      background: var(--arch-ui-surface-2);
    }

    .btn-confirm {
      background: var(--arch-ui-accent);
      color: var(--arch-ui-accent-text);
      border: 1px solid var(--arch-ui-accent);
      border-radius: 8px;
      padding: 8px 20px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: filter 0.2s ease;
    }

    /* Dégradé violet → bleu foncés : texte blanc lisible dans les deux thèmes. */
    .btn-confirm.btn-magic {
      background: linear-gradient(135deg, #7e22ce 0%, #2563eb 100%);
      border-color: var(--import-magic);
      color: #ffffff;
    }

    .btn-confirm:hover:not(:disabled) {
      filter: brightness(1.08);
    }

    .btn-confirm:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .file-input {
      display: none;
    }

    /*
     * Région annoncée aux lecteurs d'écran, toujours présente : une région live insérée avec son texte
     * n'est pas lue de façon fiable. Hors du flux (position absolue) : elle ne crée aucun espacement.
     */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      border: 0;
      overflow: hidden;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      white-space: nowrap;
    }

    /* Anneau de focus en contour pour les commandes natives (certains navigateurs ignorent leur ombre). */
    input[type='checkbox']:focus-visible,
    input[type='radio']:focus-visible,
    input[type='range']:focus-visible {
      outline: 2px solid var(--arch-ui-accent);
      outline-offset: 2px;
      box-shadow: none;
    }

    .preview-card.column {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
    }

    .preview-card.dragover {
      border-color: var(--arch-ui-accent);
      box-shadow: inset 0 0 0 1px var(--arch-ui-accent);
    }

    .preview-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }

    .preview-icon {
      font-size: 2rem;
    }

    .preview-figure {
      height: 220px;
      background: var(--import-paper);
      border: 1px solid var(--arch-ui-border);
      border-radius: 8px;
      overflow: hidden;
    }

    .preview-figure svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    /* Éléments détectés superposés au plan (toujours sur fond papier clair) */
    .ov-wall {
      stroke: #0284c7;
      stroke-width: 3px;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
    }

    .ov-opening {
      stroke-width: 5px;
      vector-effect: non-scaling-stroke;
    }

    .ov-opening.door {
      stroke: #d97706;
    }

    .ov-opening.window {
      stroke: #059669;
    }

    .ov-room {
      fill: rgba(168, 85, 247, 0.18);
      stroke: rgba(147, 51, 234, 0.75);
      stroke-width: 1px;
      vector-effect: non-scaling-stroke;
    }

    .ov-footprint {
      fill: none;
      stroke: #dc2626;
      stroke-width: 1.5px;
      stroke-dasharray: 6 4;
      vector-effect: non-scaling-stroke;
    }

    .preview-legend {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 0;
      padding: 0;
      list-style: none;
      font-size: 0.72rem;
      color: var(--arch-ui-text-muted);
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .swatch {
      display: inline-block;
      width: 14px;
      height: 4px;
      border-radius: 2px;
    }

    .swatch.wall { background: #0284c7; }
    .swatch.door { background: #d97706; }
    .swatch.window { background: #059669; }
    .swatch.room { background: rgba(147, 51, 234, 0.75); height: 8px; }
    .swatch.footprint { background: transparent; border-top: 2px dashed #dc2626; height: 0; }

    .busy-box {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.85rem;
      color: var(--arch-ui-text);
      background: var(--import-accent-tint);
      border: 1px solid var(--arch-ui-accent);
      border-radius: 10px;
      padding: 10px 12px;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid var(--arch-ui-border);
      border-top-color: var(--arch-ui-accent);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      flex-shrink: 0;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .category-toggle.disabled,
    .svg-choice-card.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .category-toggle.disabled input,
    .svg-choice-card.disabled .svg-choice-title {
      cursor: not-allowed;
    }

    @media (prefers-reduced-motion: reduce) {
      :host,
      .spinner {
        animation: none;
      }
    }

    /* Téléphone : la modale occupe tout l'écran, le contenu défile entre l'en-tête et le pied. */
    @media (max-width: 600px) {
      .modal-card {
        width: 100%;
        max-width: 100%;
        height: 100%;
        max-height: 100%;
        border: none;
        border-radius: 0;
      }

      .modal-header,
      .modal-footer {
        padding: 12px 16px;
      }

      .modal-body {
        padding: 16px;
        flex: 1;
      }

      .modal-footer {
        flex-wrap: wrap;
      }

      .footer-note {
        flex-basis: 100%;
      }

      .preview-card {
        flex-wrap: wrap;
      }

      .preview-figure {
        height: 180px;
      }

      .svg-interpret-box {
        padding: 12px;
      }

      .svg-choice-card,
      .option-card {
        padding: 10px;
        gap: 8px;
      }

      .slider-row {
        flex-wrap: wrap;
      }

      .slider-label {
        min-width: 0;
        flex-basis: 100%;
      }
    }
  `];let Z=Ea;te([L({type:String})],Z.prototype,"currentLevel");te([L({attribute:!1})],Z.prototype,"initialSvg");te([L({attribute:!1})],Z.prototype,"initialFile");te([k()],Z.prototype,"source");te([k()],Z.prototype,"busy");te([k()],Z.prototype,"error");te([k()],Z.prototype,"hint");te([k()],Z.prototype,"detection");te([k()],Z.prototype,"result");te([k()],Z.prototype,"detectPending");te([k()],Z.prototype,"excludedLayers");te([k()],Z.prototype,"svgImportMode");te([k()],Z.prototype,"keepSvgBackground");te([k()],Z.prototype,"importOptions");te([k()],Z.prototype,"calibrateMode");te([k()],Z.prototype,"widthText");te([k()],Z.prototype,"opacity");te([k()],Z.prototype,"isDragOver");Ae("home-architect-import-modal",Z);const Wl=/^[A-Za-z_][A-Za-z0-9_]*$/,Gl=/^(?:y|n|yes|no|true|false|on|off|null)$/i,Vl=new Set(["sensor","climate","input_number","number","counter"]),Yl={light:{"--state-light-active-color":"#facc15"},switch:{"--state-switch-active-color":"#38bdf8"}},Kl={"--state-icon-color":"#cbd5e1","--state-inactive-color":"#94a3b8"},Wn={background:"rgba(15, 23, 42, 0.85)",border:"1px solid rgba(56, 189, 248, 0.5)","border-radius":"8px",padding:"2px 8px","font-size":"11px","font-weight":"700",color:"#38bdf8"},Xl={...Wn,border:"1px solid rgba(245, 158, 11, 0.5)",color:"#f59e0b"};function Gn(r){let e='"';const t=String(r??"");for(let i=0;i<t.length;i++){const a=t.charCodeAt(i),n=t[i];if(a>=55296&&a<=56319&&i+1<t.length){const l=t.charCodeAt(i+1);if(l>=56320&&l<=57343){e+=n+t[i+1],i++;continue}}switch(n){case"\\":e+="\\\\";continue;case'"':e+='\\"';continue;case`
`:e+="\\n";continue;case"\r":e+="\\r";continue;case"	":e+="\\t";continue}const s=a<32||a>=127&&a<=159||a===8232||a===8233||a===65279||a>=55296&&a<=57343||a===65534||a===65535;e+=s?`\\u${a.toString(16).padStart(4,"0")}`:n}return`${e}"`}function Zl(r){return`# ${String(r??"").replace(/[\x00-\x1f\x7f-\x9f\u2028\u2029]+/g," ").trim()}`}function Yi(r){return Wl.test(r)&&!Gl.test(r)?r:Gn(r)}function Ki(r){return r===null?"null":typeof r=="boolean"?r?"true":"false":typeof r=="number"?Number.isFinite(r)?String(r):"0":Gn(r)}function Xi(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function pa(r,e){const t=" ".repeat(e);if(Array.isArray(r)){const i=[];for(const a of r)if(Xi(a)||Array.isArray(a)){const n=pa(a,e+2);if(n.length===0){i.push(`${t}- ${Array.isArray(a)?"[]":"{}"}`);continue}n[0]=`${t}- ${n[0].slice(e+2)}`,i.push(...n)}else i.push(`${t}- ${Ki(a)}`);return i}if(Xi(r)){const i=[];for(const[a,n]of Object.entries(r))if(n!==void 0)if(Array.isArray(n)||Xi(n)){const s=pa(n,e+2);s.length===0?i.push(`${t}${Yi(a)}: ${Array.isArray(n)?"[]":"{}"}`):i.push(`${t}${Yi(a)}:`,...s)}else i.push(`${t}${Yi(a)}: ${Ki(n)}`);return i}return[`${t}${Ki(r)}`]}function qr(r){return`${pa(r,0).join(`
`)}
`}function Wr(r){return Zl(`Home Architect — ${r.name||r.id}`)}function Gr(r,e,t){return r==="navigate"?e.navigationPath?{action:r,navigation_path:e.navigationPath}:{action:t}:{action:r}}function Jl(r,e){const{left:t,top:i}=Oe.worldToPercentage(r.position,e),a=fa(r.entityId),n=fo(r.entityId),s=Vl.has(a),l={type:s?"state-label":"state-icon",entity:r.entityId};return a==="climate"&&(l.attribute="current_temperature"),!s&&r.mdiIcon&&(l.icon=r.mdiIcon),r.customName&&(l.title=r.customName),l.tap_action=Gr(r.tapAction??n,r,n),l.hold_action=Gr(r.holdAction??"more-info",r,"more-info"),l.style={top:`${i}%`,left:`${t}%`,transform:"translate(-50%, -50%)",...s?a==="climate"?Xl:Wn:{...Kl,...Yl[a]}},l}class Vr{static buildPictureElementsConfig(e,t){const i=Oe.resolveExportFrame(e,t.frame),a=(e.bindings||[]).filter(n=>n&&n.position&&typeof n.entityId=="string"&&n.entityId.includes(".")).map(n=>Jl(n,i));return{type:"picture-elements",title:t.title??e.name??"",image:t.imageUrl,elements:a}}static generatePictureElementsYaml(e,t){return`${Wr(e)}
${qr(this.buildPictureElementsConfig(e,t))}`}static generateHomeArchitectCardYaml(e,t){const i={type:"custom:home-architect-card",project_id:e.id,view_mode:t?.viewMode??"2d",show_header:t?.showHeader??!0,height:t?.height??"520px"};return`${Wr(e)}
${qr(i)}`}}et("fr",{"export.title":"Exporter le plan vers Lovelace","export.subtitle":"Générez une carte interactive pour votre tableau de bord Home Assistant","export.close":"Fermer","export.close_busy":"Fermeture impossible pendant la publication","export.tabs_label":"Type d'export","export.tab.picture_elements":"Carte Picture-Elements (Native)","export.tab.custom_card":"Carte 2D/3D (Intégrée)","export.tab.raw_files":"Fichiers & Sauvegarde","export.stats.label":"Résumé du plan","export.stats.rooms_one":"pièce","export.stats.rooms_other":"pièces","export.stats.lights_one":"lumière","export.stats.lights_other":"lumières","export.stats.radars_one":"détecteur","export.stats.radars_other":"détecteurs","export.stats.sensors_one":"capteur / temp.","export.stats.sensors_other":"capteurs / temp.","export.stats.switches_one":"prise / switch","export.stats.switches_other":"prises / switchs","export.stats.furniture_one":"meuble","export.stats.furniture_other":"meubles","export.save.never_title":"Ce plan n'est pas encore sauvegardé sur le serveur","export.save.dirty_title":"Modifications non sauvegardées","export.save.never_text":"La carte intégrée ne le trouvera pas et la publication est impossible tant que le plan n'est pas sauvegardé.","export.save.dirty_text":"La carte intégrée affiche la dernière version sauvegardée. Sauvegardez pour que les deux cartes affichent le même plan.","export.save.button":"Sauvegarder le plan","export.confirm.publish":"Le plan publié sera remplacé par l'état actuel du plan. Les tableaux de bord qui l'utilisent afficheront immédiatement la nouvelle version.","export.confirm.publish_freeze":"Le cadre actuel sera figé : recollez ensuite le code YAML.","export.confirm.unpublish":"L'URL publiée cessera de fonctionner : les cartes picture-elements qui l'utilisent afficheront une image cassée. Une nouvelle publication créera une nouvelle URL.","export.confirm.reframe":"Le cadre sera recalculé sur le contenu actuel et le plan publié sera mis à jour avec ce cadre : les positions changent, il faudra recoller le nouveau code YAML dans vos tableaux de bord.","export.confirm.ok":"Confirmer","export.confirm.cancel":"Annuler","export.publish.title":"Publier le plan","export.publish.hint":"Home Assistant sert le plan publié **sans authentification**, à une adresse secrète impossible à deviner : ne la partagez pas. Le plan publié n'est mis à jour que lorsque vous cliquez sur « Publier ».","export.publish.published_with_background":"Publié le {date} (avec image de fond)","export.publish.published_without_background":"Publié le {date} (sans image de fond)","export.publish.not_published":"Pas encore publié.","export.publish.external_background":"L'image de fond est une URL externe : elle n'apparaîtra pas dans la carte picture-elements (une image SVG affichée par Lovelace ne charge aucune ressource externe). Importez l'image dans le plan pour pouvoir l'inclure.","export.include_background":"Inclure l'image de fond","export.publish.public_warning":"**URL publique :** toute personne qui obtient l'URL pourra voir cette image (plan d'architecte, photo…).","export.publish.without_background":"Seuls les murs, pièces, ouvertures et meubles sont publiés.","export.publish.legacy_title":"Ancien fichier public détecté : `{path}`","export.publish.legacy_text":"Il est réécrit à chaque publication et reste accessible sans authentification sous une adresse devinable. Remplacez-le dans vos tableaux de bord par le nouveau code YAML, puis cliquez sur « {unpublish} » et republiez : il sera supprimé (une copie retouchée hors de l'outil est conservée dans `/config/home_architect/backups/`).","export.publish.legacy_id_hint":"Si un ancien fichier `/local/plan_{id}.svg` existe dans `/config/www`, il sera lui aussi mis à jour à chaque publication.","export.publish.publishing":"Publication…","export.publish.update":"Mettre à jour le plan publié","export.publish.publish":"Publier le plan","export.publish.unpublishing":"Dépublication…","export.publish.unpublish":"Dépublier","export.publish.admin_only":"Seul un administrateur peut publier ou mettre à jour le plan.","export.frame.title":"Cadre d'export","export.frame.hint":"Les positions des entités sont exprimées en pourcentage de ce cadre ({width} × {height} m).","export.frame.frozen":"Il est figé : vos modifications du plan ne décalent pas les cartes déjà collées.","export.frame.not_frozen":"Il sera figé à la prochaine publication, pour que les cartes déjà collées restent alignées.","export.frame.not_kept":"Le cadre de la publication actuelle n'a pas été conservé dans le plan : le code YAML ci-dessous peut ne pas correspondre au plan publié. Mettez à jour le plan publié pour figer le cadre, puis recollez le code YAML.","export.frame.out_of_frame":"Le plan dépasse le cadre figé : les éléments hors cadre seront coupés ou mal placés. Recadrez pour l'agrandir.","export.frame.stale":"Le plan publié utilise un nouveau cadre : recollez le nouveau code YAML dans vos tableaux de bord (les positions des entités ont changé).","export.frame.reframe_and_publish":"Recadrer sur le plan actuel et republier","export.frame.reframe":"Recadrer sur le plan actuel","export.code.title":"Code Lovelace","export.code.picture_title":"Code YAML Picture-Elements","export.code.card_title":"Code Lovelace YAML","export.code.copy":"Copier le YAML","export.code.copied":"Copié !","export.code.no_entities":"Aucune entité n'est placée sur le plan : la carte affichera le plan seul (`elements: []`).","export.code.publish_first":"Publiez le plan pour obtenir le code de la carte picture-elements (il référence l'URL publiée).","export.copy.footer":"Copier le YAML dans le presse-papiers","export.copy.footer_done":"Copié dans le presse-papiers !","export.copy.manual":"Copie automatique impossible dans ce navigateur : le code est sélectionné ci-dessous, copiez-le avec Ctrl+C (⌘C) ou le menu « Copier ».","export.copy.manual_label":"Code YAML à copier","export.guide.picture_title":"Comment installer cette carte dans Home Assistant :","export.guide.picture_step1":"Sauvegardez puis **publiez** le plan (l'image est servie par Home Assistant, aucun fichier à copier).","export.guide.picture_step2":"Cliquez sur **{button}**.","export.guide.picture_step3":"Dans votre tableau de bord, cliquez sur **Modifier le tableau de bord** > **Ajouter une carte** > **Manuel**, collez le code et enregistrez.","export.guide.picture_step4":"Après une modification du plan, cliquez sur **{button}** : l'URL reste la même et les tableaux de bord se mettent à jour.","export.guide.card_title":"Installation rapide :","export.guide.card_step1":"Sauvegardez le plan (la carte lit la version sauvegardée).","export.guide.card_step2":"Dans Lovelace, cliquez sur **Modifier le tableau de bord** > **Ajouter une carte** > **Manuel**, collez ce code YAML et enregistrez.","export.card.intro_title":"Carte 2D & 3D temps réel, sans publication","export.card.intro":"Cette carte utilise directement le moteur de rendu Home Architect et lit le plan **sauvegardé** sur votre serveur (aucune URL publique). Elle affiche votre plan en 2D ou en **3D isométrique**, anime les capteurs en temps réel, et se met à jour à chaque sauvegarde du plan.","export.card.view_mode":"Mode de vue par défaut :","export.card.view_2d":"Vue 2D","export.card.view_3d":"Vue 3D Isométrique","export.files.svg_title":"Fichier vectoriel SVG","export.files.svg_hint":"Idéal pour ouvrir dans Inkscape, Illustrator ou imprimer (même cadre que le plan publié).","export.files.download_svg":"Télécharger le SVG","export.files.backup_title":"Sauvegarde complète du projet (JSON)","export.files.backup_hint":"Murs, pièces, ouvertures, meubles, entités et image de fond. Réimportable depuis la fenêtre d'import (fichier .json).","export.files.download_backup":"Télécharger la sauvegarde JSON","export.files.preparing":"Préparation…","export.notice.published":"Plan publié : copiez le code YAML ci-dessous.","export.notice.published_new_frame":"Plan publié avec le nouveau cadre : recollez le code YAML.","export.notice.unpublished":"Plan dépublié : l'ancienne URL ne fonctionne plus.","export.notice.copied":"Code YAML copié dans le presse-papiers.","export.notice.svg_without_background":"SVG téléchargé sans l'image de fond (image indisponible).","export.notice.backup_without_background":"Sauvegarde téléchargée sans l'image de fond (image indisponible).","export.notice.backup_done":"Sauvegarde du projet téléchargée.","export.notice.download_failed":"Téléchargement impossible : {error}","export.error.no_background":"Aucune image de fond téléversée pour ce plan.","export.error.background_unavailable":"Image de fond introuvable ou illisible sur le serveur : décochez « Inclure l'image de fond » ou réimportez l'image.","export.error.background_too_large":"Image de fond trop volumineuse pour être incluse ({size} une fois encodée, maximum {max}).","export.error.background_format":"Format d'image de fond non pris en charge (PNG, JPEG, WebP, GIF ou SVG attendu) : décochez « Inclure l'image de fond ».","export.error.background_type":"Type de l'image de fond inconnu.","export.error.too_large_with_background":"{message} Décochez « Inclure l'image de fond » ou allégez l'image.","export.error.not_found":"Ce plan n'existe pas encore sur le serveur : sauvegardez-le, puis réessayez.","export.error.invalid_svg":"Le serveur a refusé le SVG généré (format non valide).","export.error.write_failed":"Le serveur n'a pas pu écrire le plan publié (voir le journal de Home Assistant).","export.error.unknown_command":"Le serveur Home Architect n'est pas à jour : redémarrez Home Assistant pour terminer la mise à jour.","export.error.connection":"Connexion à Home Assistant indisponible : réessayez dans un instant.","export.unit.megabytes":"{value} Mo"});et("en",{"export.title":"Export the plan to a dashboard","export.subtitle":"Generate an interactive card for your Home Assistant dashboard","export.close":"Close","export.close_busy":"Can't close while publishing","export.tabs_label":"Export type","export.tab.picture_elements":"Picture elements card (native)","export.tab.custom_card":"2D/3D card (built in)","export.tab.raw_files":"Files & backup","export.stats.label":"Plan summary","export.stats.rooms_one":"room","export.stats.rooms_other":"rooms","export.stats.lights_one":"light","export.stats.lights_other":"lights","export.stats.radars_one":"detector","export.stats.radars_other":"detectors","export.stats.sensors_one":"sensor / temp.","export.stats.sensors_other":"sensors / temp.","export.stats.switches_one":"plug / switch","export.stats.switches_other":"plugs / switches","export.stats.furniture_one":"piece of furniture","export.stats.furniture_other":"pieces of furniture","export.save.never_title":"This plan hasn't been saved to the server yet","export.save.dirty_title":"Unsaved changes","export.save.never_text":"The built-in card won't find it, and it can't be published until the plan is saved.","export.save.dirty_text":"The built-in card shows the last saved version. Save so that both cards show the same plan.","export.save.button":"Save plan","export.confirm.publish":"The published plan will be replaced with the current state of the plan. Dashboards that use it will show the new version immediately.","export.confirm.publish_freeze":"The current frame will be locked: paste the YAML code again afterwards.","export.confirm.unpublish":"The published URL will stop working: picture elements cards that use it will show a broken image. Publishing again will create a new URL.","export.confirm.reframe":"The frame will be recalculated from the current content and the published plan will be updated with it: positions will change, so you will need to paste the new YAML code into your dashboards again.","export.confirm.ok":"Confirm","export.confirm.cancel":"Cancel","export.publish.title":"Publish the plan","export.publish.hint":'Home Assistant serves the published plan **without authentication**, at a secret address that cannot be guessed: do not share it. The published plan is only updated when you click "Publish".',"export.publish.published_with_background":"Published on {date} (with background image)","export.publish.published_without_background":"Published on {date} (without background image)","export.publish.not_published":"Not published yet.","export.publish.external_background":"The background image is an external URL: it will not appear in the picture elements card (an SVG image displayed by a dashboard does not load any external resource). Import the image into the plan to be able to include it.","export.include_background":"Include background image","export.publish.public_warning":"**Public URL:** anyone who gets hold of the URL will be able to see this image (architectural plan, photo…).","export.publish.without_background":"Only walls, rooms, openings and furniture are published.","export.publish.legacy_title":"Old public file detected: `{path}`","export.publish.legacy_text":'It is rewritten on every publication and remains accessible without authentication at a guessable address. Replace it in your dashboards with the new YAML code, then click "{unpublish}" and publish again: it will be deleted (a copy edited outside the tool is kept in `/config/home_architect/backups/`).',"export.publish.legacy_id_hint":"If an old `/local/plan_{id}.svg` file exists in `/config/www`, it will also be updated on every publication.","export.publish.publishing":"Publishing…","export.publish.update":"Update the published plan","export.publish.publish":"Publish the plan","export.publish.unpublishing":"Unpublishing…","export.publish.unpublish":"Unpublish","export.publish.admin_only":"Only an administrator can publish or update the plan.","export.frame.title":"Export frame","export.frame.hint":"Entity positions are expressed as a percentage of this frame ({width} × {height} m).","export.frame.frozen":"It is locked: changes to the plan will not shift cards you have already pasted.","export.frame.not_frozen":"It will be locked at the next publication, so that cards you have already pasted stay aligned.","export.frame.not_kept":"The frame of the current publication was not kept in the plan: the YAML code below may not match the published plan. Update the published plan to lock the frame, then paste the YAML code again.","export.frame.out_of_frame":"The plan extends beyond the locked frame: elements outside it will be cut off or misplaced. Reframe to enlarge it.","export.frame.stale":"The published plan uses a new frame: paste the new YAML code into your dashboards again (entity positions have changed).","export.frame.reframe_and_publish":"Reframe on the current plan and republish","export.frame.reframe":"Reframe on the current plan","export.code.title":"Dashboard code","export.code.picture_title":"Picture elements YAML code","export.code.card_title":"Dashboard YAML code","export.code.copy":"Copy YAML","export.code.copied":"Copied!","export.code.no_entities":"No entity is placed on the plan: the card will show the plan only (`elements: []`).","export.code.publish_first":"Publish the plan to get the picture elements card code (it references the published URL).","export.copy.footer":"Copy YAML to clipboard","export.copy.footer_done":"Copied to clipboard!","export.copy.manual":'Automatic copy is not available in this browser: the code is selected below, copy it with Ctrl+C (⌘C) or the "Copy" menu.',"export.copy.manual_label":"YAML code to copy","export.guide.picture_title":"How to add this card to Home Assistant:","export.guide.picture_step1":"Save, then **publish** the plan (the image is served by Home Assistant, there is no file to copy).","export.guide.picture_step2":"Click **{button}**.","export.guide.picture_step3":"In your dashboard, click **Edit dashboard** > **Add card** > **Manual**, paste the code and save.","export.guide.picture_step4":"After changing the plan, click **{button}**: the URL stays the same and dashboards update automatically.","export.guide.card_title":"Quick setup:","export.guide.card_step1":"Save the plan (the card reads the saved version).","export.guide.card_step2":"In your dashboard, click **Edit dashboard** > **Add card** > **Manual**, paste this YAML code and save.","export.card.intro_title":"Real-time 2D & 3D card, no publishing needed","export.card.intro":"This card uses the Home Architect rendering engine directly and reads the plan **saved** on your server (no public URL). It shows your plan in 2D or in **isometric 3D**, animates sensors in real time, and updates every time the plan is saved.","export.card.view_mode":"Default view mode:","export.card.view_2d":"2D view","export.card.view_3d":"Isometric 3D view","export.files.svg_title":"SVG vector file","export.files.svg_hint":"Ideal for opening in Inkscape or Illustrator, or for printing (same frame as the published plan).","export.files.download_svg":"Download SVG","export.files.backup_title":"Full project backup (JSON)","export.files.backup_hint":"Walls, rooms, openings, furniture, entities and background image. Can be re-imported from the import window (.json file).","export.files.download_backup":"Download JSON backup","export.files.preparing":"Preparing…","export.notice.published":"Plan published: copy the YAML code below.","export.notice.published_new_frame":"Plan published with the new frame: paste the YAML code again.","export.notice.unpublished":"Plan unpublished: the old URL no longer works.","export.notice.copied":"YAML code copied to clipboard.","export.notice.svg_without_background":"SVG downloaded without the background image (image unavailable).","export.notice.backup_without_background":"Backup downloaded without the background image (image unavailable).","export.notice.backup_done":"Project backup downloaded.","export.notice.download_failed":"Download failed: {error}","export.error.no_background":"No background image has been uploaded for this plan.","export.error.background_unavailable":'Background image missing or unreadable on the server: uncheck "Include background image" or import the image again.',"export.error.background_too_large":"Background image too large to be included ({size} once encoded, maximum {max}).","export.error.background_format":'Unsupported background image format (PNG, JPEG, WebP, GIF or SVG expected): uncheck "Include background image".',"export.error.background_type":"Unknown background image type.","export.error.too_large_with_background":'{message} Uncheck "Include background image" or use a lighter image.',"export.error.not_found":"This plan does not exist on the server yet: save it, then try again.","export.error.invalid_svg":"The server rejected the generated SVG (invalid format).","export.error.write_failed":"The server could not write the published plan (see the Home Assistant log).","export.error.unknown_command":"The Home Architect server is out of date: restart Home Assistant to finish the update.","export.error.connection":"Connection to Home Assistant unavailable: try again in a moment.","export.unit.megabytes":"{value} MB"});var Ql=Object.defineProperty,ee=(r,e,t,i)=>{for(var a=void 0,n=r.length-1,s;n>=0;n--)(s=r[n])&&(a=s(e,t,a)||a);return a&&Ql(e,t,a),a};const rt=[{id:"picture_elements",icon:"🖼️",labelKey:"export.tab.picture_elements"},{id:"custom_card",icon:"🧊",labelKey:"export.tab.custom_card"},{id:"raw_files",icon:"💾",labelKey:"export.tab.raw_files"}],Yr={includeRooms:!0,includeWalls:!0,includeOpenings:!0,includeFurniture:!0,includeRoomLabels:!0,includeEntityMarkers:!1,backgroundColor:vo},Et=/^data:image\//i,ec=3500,tc="button, [href], input, select, textarea, [tabindex]",ic=/(\*\*[^*]+\*\*|`[^`]+`)/;function Kr(r,e){return(r||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]+/g,"-").replace(/^-+|-+$/g,"").toLowerCase().slice(0,60)||e}function me(r,e){return o(r,e).split(ic).filter(t=>t!=="").map(t=>t.length>4&&t.startsWith("**")&&t.endsWith("**")?u`<strong>${t.slice(2,-2)}</strong>`:t.length>2&&t.startsWith("`")&&t.endsWith("`")?u`<code>${t.slice(1,-1)}</code>`:t)}function ac(r,e){let t="other";try{t=new Intl.PluralRules(Ye()).select(e)}catch{}return`${r}_${t==="one"?"one":"other"}`}function Xr(r){return o("export.unit.megabytes",{value:R(r/(1024*1024),{minimumFractionDigits:1,maximumFractionDigits:1})})}function Zr(){let r=document.activeElement;for(;r?.shadowRoot?.activeElement;)r=r.shadowRoot.activeElement;return r instanceof HTMLElement&&r!==document.body&&r!==document.documentElement?r:null}function rc(r,e){return!r||!e||r.user?.is_admin!==e.user?.is_admin||r.language!==e.language||r.locale?.language!==e.locale?.language||r.themes?.darkMode!==e.themes?.darkMode}class pt extends Error{constructor(e,t){super(o(e,t)),this.name="ExportError",this.key=e,this.params=t}}const za=class za extends De{constructor(){super(),this.readOnly=!1,this.dirty=!1,this.activeTab="picture_elements",this.customCardViewMode="2d",this.publishInfo=null,this.localFrame=null,this.frameStale=!1,this.includeBackground=!1,this.downloadWithBackground=!0,this.confirmAction=null,this.busy=null,this.publishError=null,this.notice=null,this.copied=null,this.manualCopyText=null,this.frame=null,this.outOfFrame=!1,this.pictureYaml="",this.cardYaml="",this.returnFocusTarget=null,this.confirmOrigin=null,this.focusAfterBusy=null,this.initialFocusDone=!1,this.i18n=new Ee(this),this.onKeyDown=e=>{if(e.key==="Escape"){if(e.defaultPrevented)return;if(e.preventDefault(),this.confirmAction){this.confirmAction=null;return}this.handleClose();return}e.key==="Tab"&&this.trapFocus(e)},this.onWindowKeyDown=e=>{if(e.key!=="Escape"||e.defaultPrevented||!this.isWriting)return;const t=Ge(e);t!==document.body&&t!==document.documentElement||(e.preventDefault(),this.dialogCard?.focus({preventScroll:!0}))},this.onBackdropMouseDown=e=>{e.composedPath()[0]===this&&e.preventDefault()},this.addEventListener("keydown",this.onKeyDown),this.addEventListener("mousedown",this.onBackdropMouseDown)}connectedCallback(){super.connectedCallback(),this.returnFocusTarget=Zr(),this.initialFocusDone=!1,window.addEventListener("keydown",this.onWindowKeyDown,!0)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onWindowKeyDown,!0),clearTimeout(this.noticeTimer),clearTimeout(this.copiedTimer),this.focusAfterBusy=null,this.confirmOrigin=null;const e=this.returnFocusTarget;this.returnFocusTarget=null,e?.isConnected&&e.focus({preventScroll:!0})}shouldUpdate(e){return e.has(ga)?!0:e.size===1&&e.has("hass")?rc(e.get("hass"),this.hass):!0}willUpdate(e){if(super.willUpdate(e),e.has("hass")&&Ke(this,this.hass),e.has("project")&&this.project){const t=e.get("project");!t||t.id!==this.project.id?(this.publishInfo=this.project.publish??null,this.includeBackground=this.publishInfo?.include_background??!1,this.localFrame=null,this.frameStale=!1,this.confirmAction=null,this.publishError=null,this.manualCopyText=null):t.publish!==this.project.publish&&(this.publishInfo=this.project.publish??null),this.project.exportFrame&&(this.localFrame=null)}this.project&&(e.has("project")||e.has("localFrame")||e.has("publishInfo")||e.has("customCardViewMode"))&&this.recomputeOutputs()}updated(e){super.updated(e);const t=this.renderRoot;if(!this.initialFocusDone&&this.dialogCard&&(this.initialFocusDone=!0,this.dialogCard.focus({preventScroll:!0})),e.has("activeTab")&&t.querySelector(`#export-tab-${this.activeTab}`)?.scrollIntoView?.({block:"nearest",inline:"nearest"}),e.has("manualCopyText")&&this.manualCopyText!==null){const i=t.querySelector("textarea.manual-copy");i&&(i.focus(),i.select(),i.setSelectionRange(0,i.value.length))}if(e.has("confirmAction")){if(this.confirmAction)t.querySelector(".confirm-ok")?.focus();else if(e.get("confirmAction")){const i=this.confirmOrigin;this.confirmOrigin=null,i?.isConnected&&(i.matches(":disabled")?this.focusAfterBusy=i:i.focus())}}if(this.dialogCard){const i=t.activeElement;if(i&&i!==this.dialogCard&&i.matches(":disabled")?(this.focusAfterBusy=i,this.dialogCard.focus({preventScroll:!0})):!i&&Zr()===null&&this.dialogCard.focus({preventScroll:!0}),this.focusAfterBusy&&!this.busy){const a=this.focusAfterBusy;this.focusAfterBusy=null,a.isConnected&&!a.matches(":disabled")&&t.activeElement===this.dialogCard&&a.focus({preventScroll:!0})}}}recomputeOutputs(){const e=this.project;this.frame=Oe.resolveExportFrame(e,this.localFrame);const t=Oe.contentBounds(e);this.outOfFrame=!!t&&!Oe.frameContains(this.frame,t),this.pictureYaml=this.publishInfo?Vr.generatePictureElementsYaml(e,{imageUrl:this.publishInfo.url,frame:this.frame}):"",this.cardYaml=Vr.generateHomeArchitectCardYaml(e,{viewMode:this.customCardViewMode})}focusableElements(){return[...this.renderRoot.querySelectorAll(tc)].filter(e=>e.tabIndex>=0&&!e.matches(":disabled")&&e.getClientRects().length>0)}trapFocus(e){const t=this.focusableElements(),i=this.renderRoot.activeElement;if(t.length===0){e.preventDefault(),this.dialogCard?.focus();return}const a=t[0],n=t[t.length-1];e.shiftKey&&(!i||i===a||i===this.dialogCard)?(e.preventDefault(),n.focus()):!e.shiftKey&&(!i||i===n)&&(e.preventDefault(),a.focus())}handleTabKeydown(e){const t=rt.findIndex(a=>a.id===this.activeTab);let i;switch(e.key){case"ArrowRight":i=(t+1)%rt.length;break;case"ArrowLeft":i=(t-1+rt.length)%rt.length;break;case"Home":i=0;break;case"End":i=rt.length-1;break;default:return}e.preventDefault(),this.selectTab(rt[i].id,!0)}async selectTab(e,t=!1){this.activeTab=e,t&&(await this.updateComplete,this.renderRoot.querySelector(`#export-tab-${e}`)?.focus())}askConfirmation(e){this.confirmOrigin=this.renderRoot.activeElement,this.confirmAction=e}get canEdit(){return!this.readOnly&&xt(this.hass)}get isSavedOnServer(){return(this.project?.revision??0)>0}get isFrameFrozen(){return!!(this.localFrame||this.project?.exportFrame)}get isWriting(){return this.busy==="publish"||this.busy==="unpublish"}get hasEmbeddableBackground(){const e=this.project?.background;return!!e&&e.visible&&(!!e.assetId||Et.test(e.imageUrl||""))}get hasExternalBackground(){const e=this.project?.background;return!!e&&e.visible&&!e.assetId&&!!e.imageUrl&&!Et.test(e.imageUrl)}get backgroundThumbnail(){const e=this.project?.background;return this.backgroundSrc?this.backgroundSrc:e&&Et.test(e.imageUrl||"")?e.imageUrl:void 0}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}handleClose(){this.isWriting||this.emit("close")}requestSave(){this.emit("save-requested")}showNotice(e,t){clearTimeout(this.noticeTimer),this.notice={kind:e,text:t},this.noticeTimer=setTimeout(()=>{this.notice=null},ec)}async loadBackgroundBlob(){const e=this.project.background;let t;if(e?.assetId)t=await bo(this.hass,this.project.id,e.assetId);else if(e&&Et.test(e.imageUrl||""))t=ui(e.imageUrl);else throw new pt("export.error.no_background");return t.type||!e?.mimeType?t:new Blob([t],{type:e.mimeType})}async loadBackgroundDataUrl(){let e;try{e=await this.loadBackgroundBlob()}catch(a){throw a instanceof Le&&["not_connected","connection_lost","network_error","unauthorized"].includes(a.code)?a:(console.warn("[home-architect] Background image unreadable:",a),new pt("export.error.background_unavailable"))}const t=Math.ceil(e.size/3)*4;if(t>Ua)throw new pt("export.error.background_too_large",{size:Xr(t),max:Xr(Ua)});const i=Oe.embeddableDataUrl(await Ot(e));if(!i)throw new pt("export.error.background_format");return i}describeError(e,t=!1){if(e instanceof pt)return o(e.key,e.params);if(e instanceof ba)return t?o("export.error.too_large_with_background",{message:e.message}):e.message;if(e instanceof Le)switch(e.code){case"not_found":return o("export.error.not_found");case"invalid_svg":return o("export.error.invalid_svg");case"write_failed":return o("export.error.write_failed");case"unknown_command":return o("export.error.unknown_command");case"connection_lost":case"not_connected":return o("export.error.connection");default:return e.message}return e instanceof Error?e.message:String(e)}async publish(){if(!(!this.canEdit||!this.isSavedOnServer||this.busy||!this.frame)){if(this.publishInfo&&this.confirmAction!=="publish"){this.askConfirmation("publish");return}this.confirmAction=null,await this.publishWithFrame(this.frame,!this.isFrameFrozen)}}async publishWithFrame(e,t){if(!this.canEdit||!this.isSavedOnServer||this.busy)return;this.busy="publish",this.publishError=null;const i=this.project,a=!!this.publishInfo,n=this.includeBackground&&this.hasEmbeddableBackground;try{const s=n?await this.loadBackgroundDataUrl():void 0,l=Oe.exportToSvg(i,{...Yr,includeBackground:n,backgroundDataUrl:s,frame:e}),c=await xo(this.hass,i.id,l,{includeBackground:n});if(this.project?.id!==i.id)return;t&&(this.localFrame={...e},this.emit("export-frame-changed",{frame:{...e}}),a&&(this.frameStale=!0)),this.publishInfo=c,this.emit("project-published",{publish:c}),this.showNotice("success",o(t&&a?"export.notice.published_new_frame":"export.notice.published"))}catch(s){console.warn("[home-architect] Plan publication failed:",s),this.publishError={error:s,withBackground:n}}finally{this.busy=null}}async unpublishPlan(){if(!this.canEdit||this.busy||!this.publishInfo)return;if(this.confirmAction!=="unpublish"){this.askConfirmation("unpublish");return}this.confirmAction=null,this.busy="unpublish",this.publishError=null;const e=this.project.id;try{if(await yo(this.hass,e),this.emit("project-unpublished",{projectId:e}),this.project?.id!==e)return;this.publishInfo=null,this.frameStale=!1,this.showNotice("info",o("export.notice.unpublished"))}catch(t){console.warn("[home-architect] Plan unpublication failed:",t),this.publishError={error:t,withBackground:!1}}finally{this.busy=null}}async reframe(){if(!this.canEdit||this.busy)return;const e=!!this.publishInfo;if(e&&this.confirmAction!=="reframe"){this.askConfirmation("reframe");return}this.confirmAction=null;const t=Oe.computeContentFrame(this.project);if(e){await this.publishWithFrame(t,!0);return}this.localFrame=t,this.emit("export-frame-changed",{frame:t})}async copyText(e,t){let i=!1;if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{await navigator.clipboard.writeText(e),i=!0}catch{}if(i||(i=this.copyWithTextarea(e)),!i){this.manualCopyText=e;return}this.manualCopyText=null,this.copied=t,clearTimeout(this.copiedTimer),this.copiedTimer=setTimeout(()=>{this.copied=null},2500),this.showNotice("success",o("export.notice.copied"))}copyWithTextarea(e){const t=document.createElement("textarea");t.value=e,t.readOnly=!0,t.setAttribute("aria-hidden","true"),t.style.cssText="position:fixed;top:0;left:0;width:1px;height:1px;padding:0;border:0;opacity:0;";const i=this.renderRoot.activeElement;this.renderRoot.appendChild(t);try{return t.focus({preventScroll:!0}),t.select(),t.setSelectionRange(0,e.length),document.execCommand("copy")}catch{return!1}finally{t.remove(),i?.focus({preventScroll:!0})}}async downloadSvg(){if(this.busy||!this.frame)return;this.busy="svg";const e=this.frame;try{let t,i=!1;if(this.downloadWithBackground&&this.hasEmbeddableBackground){try{t=Oe.embeddableDataUrl(await Ot(await this.loadBackgroundBlob()))??void 0}catch(n){console.warn("[home-architect] Background image not included in the SVG:",n)}i=!t}const a=Oe.exportToSvg(this.project,{...Yr,includeBackground:!!t,backgroundDataUrl:t,frame:e});Ha(new Blob([a],{type:"image/svg+xml;charset=utf-8"}),`plan_${Kr(this.project.name,this.project.id)}.svg`),i&&this.showNotice("info",o("export.notice.svg_without_background"))}catch(t){console.warn("[home-architect] SVG download failed:",t),this.showNotice("error",o("export.notice.download_failed",{error:this.describeError(t)}))}finally{this.busy=null}}async downloadBackup(){if(!this.busy){this.busy="backup";try{const{revision:e,...t}=wo(vi(this.project));let i=!1;const a=t.background;if(a?.assetId)try{const l=await this.loadBackgroundBlob(),c=await Ot(l);if(!Et.test(c))throw new pt("export.error.background_type");a.imageUrl=c;const d=l.type.split(";")[0].trim();d&&(a.mimeType=d),delete a.assetId}catch(l){console.warn("[home-architect] Background image not included in the backup:",l),i=!0}const n=JSON.stringify(t,null,2),s=new Date().toISOString().slice(0,10);Ha(new Blob([n],{type:"application/json;charset=utf-8"}),`home-architect_${Kr(t.name,t.id)}_${s}.json`),this.showNotice(i?"info":"success",o(i?"export.notice.backup_without_background":"export.notice.backup_done"))}catch(e){console.warn("[home-architect] JSON backup failed:",e),this.showNotice("error",o("export.notice.download_failed",{error:this.describeError(e)}))}finally{this.busy=null}}}getEntitySummary(){const e=this.project?.bindings||[],t=e.filter(c=>c.entityId.startsWith("light.")).length,i=e.filter(c=>c.entityId.startsWith("binary_sensor.")).length,a=e.filter(c=>c.entityId.startsWith("sensor.")||c.entityId.startsWith("climate.")).length,n=e.filter(c=>c.entityId.startsWith("switch.")).length,s=this.project?.rooms?.length||0,l=this.project?.furniture?.length||0;return{lights:t,radars:i,sensors:a,switches:n,rooms:s,furniture:l,total:e.length}}formatDate(e){const t=new Date(e);if(Number.isNaN(t.getTime()))return e;try{return t.toLocaleString(this.hass?.locale?.language||this.hass?.language||void 0)}catch{return t.toLocaleString()}}iconLabel(e,t){return u`<span aria-hidden="true">${e}</span><span>${t}</span>`}renderBanner(e,t,i,a){return u`
      <div class="banner ${e}" role=${a??"note"}>
        <span class="banner-icon" aria-hidden="true">${t}</span>
        <div class="banner-text">${i}</div>
      </div>
    `}renderStat(e,t,i,a=!1){return u`
      <div class="stat-badge ${a?"highlight":""}" role="listitem">
        <span aria-hidden="true">${e}</span>
        <span><strong>${R(i)}</strong> ${o(ac(t,i))}</span>
      </div>
    `}renderSaveState(){if(!this.canEdit||this.isSavedOnServer&&!this.dirty)return null;const e=!this.isSavedOnServer;return this.renderBanner("warning","💾",u`
      <div class="banner-title">${o(e?"export.save.never_title":"export.save.dirty_title")}</div>
      <div>${o(e?"export.save.never_text":"export.save.dirty_text")}</div>
      <div class="actions-row">
        <button class="btn-action" @click=${this.requestSave}>${this.iconLabel("💾",o("export.save.button"))}</button>
      </div>
    `)}renderConfirm(e){if(this.confirmAction!==e)return null;const t=e==="publish"?[o("export.confirm.publish"),this.isFrameFrozen?"":o("export.confirm.publish_freeze")].filter(Boolean).join(" "):o(e==="unpublish"?"export.confirm.unpublish":"export.confirm.reframe"),i=e==="publish"?()=>this.publish():e==="unpublish"?()=>this.unpublishPlan():()=>this.reframe(),a=`confirm-text-${e}`;return this.renderBanner("warning","❓",u`
      <div id=${a}>${t}</div>
      <div class="actions-row">
        <button class="btn-action confirm-ok ${e==="unpublish"?"danger":""}" aria-describedby=${a} @click=${i}>
          ${o("export.confirm.ok")}
        </button>
        <button class="btn-secondary" @click=${()=>{this.confirmAction=null}}>${o("export.confirm.cancel")}</button>
      </div>
    `)}renderPublishSection(){const e=this.publishInfo,t=this.canEdit&&this.isSavedOnServer&&!!this.hass&&!this.busy,i=!e&&Mn(this.project.id)!==void 0,a=this.backgroundThumbnail,n=o("export.publish.unpublish");return u`
      <section class="section" aria-labelledby="export-publish-title">
        <h3 class="section-title" id="export-publish-title">
          <span class="section-num" aria-hidden="true">1</span><span>${o("export.publish.title")}</span>
        </h3>
        <p class="hint">${me("export.publish.hint")}</p>

        <div class="status-line">
          ${e?u`
            <span aria-hidden="true">✅</span>
            ${o(e.include_background?"export.publish.published_with_background":"export.publish.published_without_background",{date:this.formatDate(e.published_at)})}<br />
            <code>${e.url}</code>
          `:u`<span aria-hidden="true">⚪</span> ${o("export.publish.not_published")}`}
        </div>

        ${this.hasExternalBackground?this.renderBanner("info","🌐",o("export.publish.external_background")):null}

        ${this.hasEmbeddableBackground&&this.canEdit?u`
          <label class="check-row">
            <input
              type="checkbox"
              aria-labelledby="export-include-bg-label"
              aria-describedby="export-include-bg-hint"
              .checked=${this.includeBackground}
              ?disabled=${!!this.busy}
              @change=${s=>{this.includeBackground=s.target.checked}}
            />
            ${a?u`<img class="bg-thumb" src=${a} alt="" />`:null}
            <div>
              <div class="config-label" id="export-include-bg-label">${o("export.include_background")}</div>
              <div class="hint" id="export-include-bg-hint">
                ${this.includeBackground?u`<span aria-hidden="true">⚠️</span> ${me("export.publish.public_warning")}`:o("export.publish.without_background")}
              </div>
            </div>
          </label>
        `:null}

        ${e?.legacy_path?this.renderBanner("warning","⚠️",u`
          <div class="banner-title">${me("export.publish.legacy_title",{path:e.legacy_path})}</div>
          <div>${me("export.publish.legacy_text",{unpublish:n})}</div>
        `):null}

        ${i&&this.canEdit?u`
          <p class="hint">${me("export.publish.legacy_id_hint",{id:this.project.id})}</p>
        `:null}

        ${this.renderConfirm("publish")}
        ${this.renderConfirm("unpublish")}

        ${this.canEdit?u`
          <div class="actions-row">
            <button class="btn-action" ?disabled=${!t} @click=${this.publish}>
              ${this.busy==="publish"?this.iconLabel("⏳",o("export.publish.publishing")):e?this.iconLabel("🔄",o("export.publish.update")):this.iconLabel("🚀",o("export.publish.publish"))}
            </button>
            ${e?u`
              <button class="btn-action danger" ?disabled=${!!this.busy} @click=${this.unpublishPlan}>
                ${this.busy==="unpublish"?this.iconLabel("⏳",o("export.publish.unpublishing")):this.iconLabel("🗑️",n)}
              </button>
            `:null}
          </div>
        `:u`<p class="hint">${o("export.publish.admin_only")}</p>`}

        ${this.publishError?this.renderBanner("error","⚠️",this.describeError(this.publishError.error,this.publishError.withBackground),"alert"):null}
      </section>
    `}renderFrameSection(){const e=this.frame;if(!e)return null;const t={minimumFractionDigits:1,maximumFractionDigits:1},i=R(e.maxX-e.minX,t),a=R(e.maxY-e.minY,t);return u`
      <section class="section" aria-labelledby="export-frame-title">
        <h3 class="section-title" id="export-frame-title">
          <span class="section-num" aria-hidden="true">2</span><span>${o("export.frame.title")}</span>
        </h3>
        <p class="hint">
          ${o("export.frame.hint",{width:i,height:a})}
          ${o(this.isFrameFrozen?"export.frame.frozen":"export.frame.not_frozen")}
        </p>

        ${this.publishInfo&&!this.isFrameFrozen?this.renderBanner("warning","📐",o("export.frame.not_kept")):null}
        ${this.outOfFrame?this.renderBanner("warning","📐",o("export.frame.out_of_frame")):null}
        ${this.frameStale?this.renderBanner("warning","🔁",o("export.frame.stale")):null}

        ${this.renderConfirm("reframe")}

        ${this.canEdit&&this.isFrameFrozen?u`
          <div class="actions-row">
            <button class="btn-action ghost" ?disabled=${!!this.busy||!!this.publishInfo&&!this.isSavedOnServer} @click=${this.reframe}>
              ${this.iconLabel("📐",o(this.publishInfo?"export.frame.reframe_and_publish":"export.frame.reframe"))}
            </button>
          </div>
        `:null}
      </section>
    `}renderCode(e,t,i){const a=this.copied===t;return u`
      <div class="code-container">
        <div class="code-header">
          <span>${i}</span>
          <button class="btn-copy ${a?"copied":""}" @click=${()=>this.copyText(e,t)}>
            ${a?u`<span class="copied-mark" aria-hidden="true">✓</span><span>${o("export.code.copied")}</span>`:this.iconLabel("📋",o("export.code.copy"))}
          </button>
        </div>
        <pre class="code-box" tabindex="0" role="region" aria-label=${i}><code>${e}</code></pre>
      </div>
    `}renderGuide(e,t,i){return u`
      <div class="guide-box">
        <h3 class="guide-title">${this.iconLabel(e,t)}</h3>
        <ol class="guide-steps" role="list">
          ${i.map((a,n)=>u`
            <li class="guide-step">
              <span class="guide-num" aria-hidden="true">${R(n+1)}</span>
              <div>${a}</div>
            </li>
          `)}
        </ol>
      </div>
    `}renderPictureElementsTab(){const e=(this.project.bindings||[]).length>0;return u`
      ${this.renderSaveState()}
      ${this.renderPublishSection()}
      ${this.renderFrameSection()}

      <section class="section" aria-labelledby="export-code-title">
        <h3 class="section-title" id="export-code-title">
          <span class="section-num" aria-hidden="true">3</span><span>${o("export.code.title")}</span>
        </h3>
        ${this.pictureYaml?u`
          ${e?null:u`<p class="hint">${me("export.code.no_entities")}</p>`}
          ${this.renderCode(this.pictureYaml,"picture",o("export.code.picture_title"))}
        `:u`
          <p class="hint">${o("export.code.publish_first")}</p>
        `}
      </section>

      ${this.renderGuide("💡",o("export.guide.picture_title"),[me("export.guide.picture_step1"),me("export.guide.picture_step2",{button:o("export.code.copy")}),me("export.guide.picture_step3"),me("export.guide.picture_step4",{button:o("export.publish.update")})])}
    `}renderCustomCardTab(){const e=this.customCardViewMode==="2d";return u`
      ${this.renderSaveState()}

      <div class="guide-box">
        <h3 class="guide-title">${this.iconLabel("✨",o("export.card.intro_title"))}</h3>
        <p class="guide-text">${me("export.card.intro")}</p>
      </div>

      <div class="config-row">
        <span class="config-label" id="export-view-mode-label">${o("export.card.view_mode")}</span>
        <div class="actions-row" role="group" aria-labelledby="export-view-mode-label">
          <button
            class="btn-action ${e?"":"ghost"}"
            aria-pressed=${e?"true":"false"}
            @click=${()=>{this.customCardViewMode="2d"}}
          >
            ${this.iconLabel("📐",o("export.card.view_2d"))}
          </button>
          <button
            class="btn-action ${e?"ghost":""}"
            aria-pressed=${e?"false":"true"}
            @click=${()=>{this.customCardViewMode="3d"}}
          >
            ${this.iconLabel("🧊",o("export.card.view_3d"))}
          </button>
        </div>
      </div>

      ${this.renderCode(this.cardYaml,"card",o("export.code.card_title"))}

      ${this.renderGuide("🚀",o("export.guide.card_title"),[me("export.guide.card_step1"),me("export.guide.card_step2")])}
    `}renderFilesTab(){return u`
      <div class="config-row">
        <div>
          <div class="config-label">${o("export.files.svg_title")}</div>
          <div class="hint">${o("export.files.svg_hint")}</div>
          ${this.hasEmbeddableBackground?u`
            <label class="check-row spaced">
              <input
                type="checkbox"
                .checked=${this.downloadWithBackground}
                @change=${e=>{this.downloadWithBackground=e.target.checked}}
              />
              <span class="hint">${o("export.include_background")}</span>
            </label>
          `:null}
        </div>
        <button class="btn-action" ?disabled=${!!this.busy} @click=${this.downloadSvg}>
          ${this.iconLabel("📐",o(this.busy==="svg"?"export.files.preparing":"export.files.download_svg"))}
        </button>
      </div>

      <div class="config-row">
        <div>
          <div class="config-label">${o("export.files.backup_title")}</div>
          <div class="hint">${o("export.files.backup_hint")}</div>
        </div>
        <button class="btn-action" ?disabled=${!!this.busy} @click=${this.downloadBackup}>
          ${this.iconLabel("💾",o(this.busy==="backup"?"export.files.preparing":"export.files.download_backup"))}
        </button>
      </div>
    `}renderTab(e){const t=this.activeTab===e.id;return u`
      <button
        class="tab-btn"
        role="tab"
        id="export-tab-${e.id}"
        aria-selected=${t?"true":"false"}
        aria-controls="export-tabpanel"
        tabindex=${t?"0":"-1"}
        @click=${()=>{this.selectTab(e.id)}}
      >
        ${this.iconLabel(e.icon,o(e.labelKey))}
      </button>
    `}render(){if(!this.project)return null;const e=this.getEntitySummary(),t=this.activeTab==="picture_elements"?this.pictureYaml:this.activeTab==="custom_card"?this.cardYaml:"",i=this.activeTab==="custom_card"?"card":"picture",a=this.copied===i,n=o(this.isWriting?"export.close_busy":"export.close"),s=this.notice;return u`
      <div
        class="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-title"
        aria-describedby="export-subtitle"
        tabindex="-1"
        @click=${l=>l.stopPropagation()}
      >
        <!-- En-tête -->
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon" aria-hidden="true">📤</span>
            <div>
              <h2 class="modal-title" id="export-title">${o("export.title")}</h2>
              <p class="modal-subtitle" id="export-subtitle">${o("export.subtitle")}</p>
            </div>
          </div>
          <button class="btn-close" ?disabled=${this.isWriting} @click=${this.handleClose} aria-label=${n} title=${n}>
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <!-- Onglets -->
        <div class="tabs-nav" role="tablist" aria-label=${o("export.tabs_label")} @keydown=${this.handleTabKeydown}>
          ${rt.map(l=>this.renderTab(l))}
        </div>

        <!-- Corps de la modale -->
        <div class="modal-body">
          <!-- Résumé des entités liées -->
          <div class="stats-row" role="list" aria-label=${o("export.stats.label")}>
            ${this.renderStat("🏠","export.stats.rooms",e.rooms,!0)}
            ${this.renderStat("💡","export.stats.lights",e.lights)}
            ${this.renderStat("📡","export.stats.radars",e.radars)}
            ${this.renderStat("🌡️","export.stats.sensors",e.sensors)}
            ${this.renderStat("🔌","export.stats.switches",e.switches)}
            ${e.furniture>0?this.renderStat("🛋️","export.stats.furniture",e.furniture):null}
          </div>

          ${this.manualCopyText!==null?this.renderBanner("info","📋",u`
            <div>${o("export.copy.manual")}</div>
            <textarea class="manual-copy" readonly aria-label=${o("export.copy.manual_label")} .value=${this.manualCopyText}></textarea>
            <div class="actions-row">
              <button class="btn-secondary" @click=${()=>{this.manualCopyText=null}}>${o("export.close")}</button>
            </div>
          `):null}

          <div class="tab-panel" role="tabpanel" id="export-tabpanel" aria-labelledby="export-tab-${this.activeTab}">
            ${this.activeTab==="picture_elements"?this.renderPictureElementsTab():null}
            ${this.activeTab==="custom_card"?this.renderCustomCardTab():null}
            ${this.activeTab==="raw_files"?this.renderFilesTab():null}
          </div>
        </div>

        <!-- Notification flottante (région toujours présente pour être annoncée) -->
        <div class="toast-region" role="status" aria-live="polite" aria-atomic="true">
          ${s?u`
            <div class="floating-toast ${s.kind}">
              <span aria-hidden="true">${s.kind==="error"?"⚠️":s.kind==="success"?"✅":"ℹ️"}</span>
              <span>${s.text}</span>
            </div>
          `:null}
        </div>

        <!-- Pied de page -->
        <div class="modal-footer">
          <button class="btn-secondary" ?disabled=${this.isWriting} @click=${this.handleClose}>${o("export.close")}</button>
          ${t?u`
            <button
              class="btn-action large"
              @click=${()=>this.copyText(t,i)}
            >
              ${this.iconLabel(a?"✓":"📋",o(a?"export.copy.footer_done":"export.copy.footer"))}
            </button>
          `:null}
        </div>
      </div>
    `}};za.styles=[ze,he`
    :host {
      --exp-shadow: var(--ha-arch-ui-shadow, 0 24px 48px -12px rgba(0, 0, 0, 0.45));
      position: fixed;
      inset: 0;
      background: var(--arch-ui-overlay);
      -webkit-backdrop-filter: blur(14px);
      backdrop-filter: blur(14px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--arch-ui-font);
      color: var(--arch-ui-text);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-card {
      position: relative;
      background: var(--arch-ui-surface);
      color: var(--arch-ui-text);
      border: 1px solid var(--arch-ui-border);
      border-radius: var(--arch-ui-radius);
      width: 720px;
      max-width: 94vw;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: var(--exp-shadow);
      overflow: hidden;
      animation: fadeIn 0.2s ease-out;
    }

    /* Focus initial porté par la fenêtre elle-même : pas d'anneau autour de toute la carte. */
    .modal-card:focus,
    .modal-card:focus-visible {
      outline: none;
      box-shadow: var(--exp-shadow);
    }

    .modal-header {
      padding: 16px 22px;
      border-bottom: 1px solid var(--arch-ui-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: var(--arch-ui-bg);
    }

    .modal-title-group {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }

    .modal-icon {
      font-size: 1.6rem;
    }

    .modal-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      margin: 0;
    }

    .modal-subtitle {
      font-size: 0.8rem;
      color: var(--arch-ui-text-muted);
      margin: 2px 0 0 0;
    }

    .btn-close {
      flex-shrink: 0;
      width: 36px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      color: var(--arch-ui-text-muted);
      font-size: 20px;
      cursor: pointer;
      border-radius: 8px;
      transition: background-color 0.15s ease, color 0.15s ease;
    }

    .btn-close:hover:not(:disabled) {
      color: var(--arch-ui-text);
      background: var(--arch-ui-surface-2);
    }

    .btn-close:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* Onglets de navigation */
    .tabs-nav {
      display: flex;
      flex-wrap: wrap;
      background: var(--arch-ui-bg);
      border-bottom: 1px solid var(--arch-ui-border);
      padding: 0 16px;
      gap: 6px;
    }

    .tab-btn {
      padding: 12px 16px;
      font: inherit;
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--arch-ui-text-muted);
      background: transparent;
      border: none;
      border-bottom: 3px solid transparent;
      border-radius: 6px 6px 0 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: color 0.2s ease, border-color 0.2s ease;
    }

    .tab-btn:hover {
      color: var(--arch-ui-text);
    }

    .tab-btn[aria-selected='true'] {
      color: var(--arch-ui-text);
      font-weight: 700;
      border-bottom-color: var(--arch-ui-accent);
    }

    /* Anneau de focus intérieur : la barre d'onglets défile (et rognerait un anneau extérieur) sur mobile. */
    .tab-btn:focus-visible {
      box-shadow: inset 0 0 0 2px var(--arch-ui-accent);
    }

    .modal-body {
      padding: 20px 24px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
      flex: 1;
    }

    .tab-panel {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* Résumé du plan */
    .stats-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 10px 14px;
    }

    .stat-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.82rem;
      padding: 4px 10px;
      border-radius: 6px;
      background: var(--arch-ui-surface);
      border: 1px solid var(--arch-ui-border);
      color: var(--arch-ui-text);
    }

    .stat-badge.highlight {
      border-color: var(--arch-ui-accent);
    }

    /* Sections (publication, cadre, code) */
    .section {
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 14px 16px;
    }

    .section-title {
      margin: 0;
      font-size: 0.92rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .hint {
      font-size: 0.8rem;
      color: var(--arch-ui-text-muted);
      line-height: 1.45;
      margin: 0;
    }

    .hint code,
    .banner code,
    .status-line code,
    .guide-step code {
      background: var(--arch-ui-surface-2);
      color: var(--arch-ui-text);
      padding: 1px 6px;
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-size: 0.78rem;
      word-break: break-all;
    }

    .status-line {
      font-size: 0.84rem;
      color: var(--arch-ui-text);
      line-height: 1.5;
    }

    .actions-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }

    /* Section Actions / Configuration */
    .config-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 10px 14px;
    }

    .config-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--arch-ui-text);
    }

    .check-row {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      cursor: pointer;
      user-select: none;
    }

    .check-row.spaced {
      margin-top: 8px;
    }

    .check-row input {
      accent-color: var(--arch-ui-accent);
      width: 16px;
      height: 16px;
      margin-top: 2px;
      cursor: pointer;
      flex-shrink: 0;
    }

    .bg-thumb {
      width: 64px;
      height: 48px;
      object-fit: cover;
      border-radius: 6px;
      border: 1px solid var(--arch-ui-border);
      flex-shrink: 0;
    }

    /* Boutons : action principale (couleur primaire du thème), neutre, destructive */
    .btn-action {
      background: var(--arch-ui-accent);
      color: var(--arch-ui-accent-text);
      border: 1px solid var(--arch-ui-accent);
      border-radius: 8px;
      padding: 8px 16px;
      font: inherit;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: box-shadow 0.2s ease, background-color 0.2s ease, color 0.2s ease;
      text-decoration: none;
    }

    .btn-action:hover:not(:disabled) {
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
    }

    /* Le survol ne masque pas l'anneau de focus clavier. */
    .btn-action:focus-visible:not(:disabled) {
      box-shadow: var(--arch-ui-focus-ring);
    }

    .btn-action:disabled,
    .btn-secondary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-action.large {
      padding: 10px 22px;
      font-size: 0.92rem;
      font-weight: 700;
    }

    .btn-action.danger {
      background: var(--arch-ui-surface);
      border-color: var(--arch-ui-danger);
      color: var(--arch-ui-text);
    }

    .btn-action.danger:hover:not(:disabled) {
      background: var(--arch-ui-danger);
      color: var(--arch-ui-accent-text);
    }

    .btn-action.ghost {
      background: var(--arch-ui-surface);
      border-color: var(--arch-ui-border);
      color: var(--arch-ui-text);
    }

    .btn-action.ghost:hover:not(:disabled) {
      border-color: var(--arch-ui-accent);
    }

    .btn-secondary {
      background: var(--arch-ui-surface-2);
      color: var(--arch-ui-text);
      border: 1px solid var(--arch-ui-border);
      border-radius: 8px;
      padding: 8px 16px;
      font: inherit;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: border-color 0.2s ease;
    }

    .btn-secondary:hover:not(:disabled) {
      border-color: var(--arch-ui-text-muted);
    }

    /* Zone de code YAML */
    .code-container {
      position: relative;
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid var(--arch-ui-border);
      background: var(--arch-ui-surface);
    }

    .code-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 8px 14px;
      background: var(--arch-ui-surface-2);
      border-bottom: 1px solid var(--arch-ui-border);
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .btn-copy {
      background: var(--arch-ui-surface);
      border: 1px solid var(--arch-ui-border);
      color: var(--arch-ui-text);
      border-radius: 6px;
      padding: 4px 10px;
      font: inherit;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: none;
      letter-spacing: normal;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease;
    }

    .btn-copy:hover {
      border-color: var(--arch-ui-accent);
    }

    /* Copie réussie : liseré et coche de la couleur de succès, texte du thème (contraste garanti). */
    .btn-copy.copied {
      border-color: var(--arch-ui-success);
    }

    .copied-mark {
      color: var(--arch-ui-success);
      font-weight: 700;
    }

    pre.code-box {
      margin: 0;
      padding: 14px 16px;
      max-height: 280px;
      overflow: auto;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 0.82rem;
      line-height: 1.5;
      color: var(--arch-ui-text);
      white-space: pre;
    }

    /* Zone défilante focalisable : anneau intérieur (le conteneur arrondi rogne tout débordement). */
    pre.code-box:focus-visible {
      box-shadow: inset 0 0 0 2px var(--arch-ui-accent);
    }

    textarea.manual-copy {
      width: 100%;
      box-sizing: border-box;
      min-height: 140px;
      background: var(--arch-ui-bg);
      color: var(--arch-ui-text);
      border: 1px solid var(--arch-ui-accent);
      border-radius: 8px;
      padding: 10px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.8rem;
      resize: vertical;
    }

    /* Guide pas-à-pas */
    .guide-box {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-left: 4px solid var(--arch-ui-accent);
      border-radius: 10px;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .guide-title {
      margin: 0;
      font-size: 0.86rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .guide-text {
      font-size: 0.82rem;
      color: var(--arch-ui-text);
      line-height: 1.45;
      margin: 0;
    }

    .guide-steps {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .guide-step {
      font-size: 0.8rem;
      color: var(--arch-ui-text);
      line-height: 1.45;
      display: flex;
      gap: 8px;
    }

    .guide-num,
    .section-num {
      background: var(--arch-ui-accent);
      color: var(--arch-ui-accent-text);
      border-radius: 50%;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.72rem;
      font-weight: bold;
      flex-shrink: 0;
    }

    .guide-num {
      margin-top: 2px;
    }

    .modal-footer {
      padding: 14px 24px;
      border-top: 1px solid var(--arch-ui-border);
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 10px;
      background: var(--arch-ui-bg);
    }

    /* Bandeaux d'information / d'avertissement : texte du thème, couleur d'état en liseré */
    .banner {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 0.82rem;
      line-height: 1.45;
      background: var(--arch-ui-surface);
      border: 1px solid var(--arch-ui-border);
      border-left: 4px solid var(--arch-ui-info);
      color: var(--arch-ui-text);
      animation: fadeIn 0.2s ease-out;
    }

    .banner.info {
      border-left-color: var(--arch-ui-info);
    }

    .banner.warning {
      border-left-color: var(--arch-ui-warning);
    }

    .banner.error {
      border-left-color: var(--arch-ui-danger);
    }

    .banner-icon {
      font-size: 1.2rem;
      flex-shrink: 0;
      line-height: 1.2;
    }

    .banner-text {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .banner-title {
      font-weight: 700;
      font-size: 0.86rem;
    }

    /* Notification flottante (région annoncée par les lecteurs d'écran), couleurs inversées */
    .toast-region {
      position: absolute;
      top: 18px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      padding: 0 16px;
      z-index: 200;
      pointer-events: none;
    }

    .floating-toast {
      max-width: 100%;
      box-sizing: border-box;
      padding: 10px 22px;
      border-radius: 12px;
      font-size: 0.88rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
      animation: popToast 0.25s ease-out;
      background: var(--arch-ui-text);
      color: var(--arch-ui-surface);
      border-left: 4px solid var(--arch-ui-info);
    }

    .floating-toast.success {
      border-left-color: var(--arch-ui-success);
    }

    .floating-toast.error {
      border-left-color: var(--arch-ui-danger);
    }

    @keyframes popToast {
      from { transform: translateY(-10px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    /* Petits écrans : la fenêtre occupe tout l'écran, les onglets défilent horizontalement. */
    @media (max-width: 600px) {
      .modal-card {
        width: 100%;
        max-width: 100%;
        height: 100%;
        max-height: 100%;
        border: none;
        border-radius: 0;
      }

      .modal-header {
        padding: 12px 14px;
        padding-top: max(12px, env(safe-area-inset-top));
      }

      .modal-icon {
        display: none;
      }

      .tabs-nav {
        flex-wrap: nowrap;
        overflow-x: auto;
        scrollbar-width: none;
        padding: 0 8px;
      }

      .tabs-nav::-webkit-scrollbar {
        display: none;
      }

      .tab-btn {
        white-space: nowrap;
        padding: 12px 10px;
      }

      .modal-body {
        padding: 14px;
      }

      .modal-footer {
        padding: 12px 14px;
        padding-bottom: max(12px, env(safe-area-inset-bottom));
      }
    }
  `];let X=za;ee([L({type:Object})],X.prototype,"project");ee([L({type:Object})],X.prototype,"hass");ee([L({type:String})],X.prototype,"backgroundSrc");ee([L({type:Boolean})],X.prototype,"readOnly");ee([L({type:Boolean})],X.prototype,"dirty");ee([k()],X.prototype,"activeTab");ee([k()],X.prototype,"customCardViewMode");ee([k()],X.prototype,"publishInfo");ee([k()],X.prototype,"localFrame");ee([k()],X.prototype,"frameStale");ee([k()],X.prototype,"includeBackground");ee([k()],X.prototype,"downloadWithBackground");ee([k()],X.prototype,"confirmAction");ee([k()],X.prototype,"busy");ee([k()],X.prototype,"publishError");ee([k()],X.prototype,"notice");ee([k()],X.prototype,"copied");ee([k()],X.prototype,"manualCopyText");ee([Vo(".modal-card")],X.prototype,"dialogCard");Ae("home-architect-export-modal",X);const nc="home_architect",oc=1,fi="drafts",sc=3e3;let Me=null;function lc(){if(Me)return Me;const r=new Promise(e=>{let t=!1,i;const a=n=>{if(t){n?.close();return}t=!0,clearTimeout(i),e(n)};try{if(typeof indexedDB>"u"||!indexedDB){a(null);return}i=setTimeout(()=>a(null),sc);const n=indexedDB.open(nc,oc);n.onupgradeneeded=()=>{const s=n.result;s.objectStoreNames.contains(fi)||s.createObjectStore(fi,{keyPath:"projectId"})},n.onsuccess=()=>{const s=n.result;s.onversionchange=()=>{s.close(),Me===r&&(Me=null)},s.onclose=()=>{Me===r&&(Me=null)},a(s)},n.onerror=()=>a(null)}catch{a(null)}});return Me=r,r.then(e=>{!e&&Me===r&&(Me=null)}),r}async function ki(r,e,t,i){const a=lc(),n=await a;return n?new Promise(s=>{try{let l;try{l=n.transaction(fi,r)}catch(p){throw Me===a&&(Me=null),p}const c=e(l.objectStore(fi));let d=i;c.onsuccess=()=>{d=t(c.result)},l.oncomplete=()=>s(d),l.onerror=()=>s(i),l.onabort=()=>s(i)}catch{s(i)}}):i}function Vn(r){if(typeof r!="object"||r===null)return null;const e=r;if(typeof e.projectId!="string"||!Cn.test(e.projectId)||typeof e.project!="object"||e.project===null)return null;const t=vi({...e.project,id:e.projectId}),i=e.baseRevision;return{projectId:e.projectId,project:t,savedAt:typeof e.savedAt=="string"?e.savedAt:new Date(0).toISOString(),baseRevision:typeof i=="number"&&Number.isInteger(i)&&i>=0?i:null}}function Jr(r,e){if(!r||typeof r.id!="string"||!Cn.test(r.id))return Promise.resolve(!1);let t;try{t={projectId:r.id,project:JSON.parse(JSON.stringify(r)),savedAt:new Date().toISOString(),baseRevision:typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}}catch{return Promise.resolve(!1)}return ki("readwrite",i=>i.put(t),()=>!0,!1)}function Qr(r){return ki("readonly",e=>e.get(r),Vn,null)}function Rt(r){return ki("readwrite",e=>e.delete(r),()=>{},void 0)}function Yn(){return ki("readonly",r=>r.getAll(),r=>(Array.isArray(r)?r:[]).map(Vn).filter(e=>e!==null).sort((e,t)=>t.savedAt.localeCompare(e.savedAt)),[])}var cc=Object.defineProperty,ie=(r,e,t,i)=>{for(var a=void 0,n=r.length-1,s;n>=0;n--)(s=r[n])&&(a=s(e,t,a)||a);return a&&cc(e,t,a),a};const nt=Object.freeze([...ia,pi]),en=200,tn=64,qe=["save","load"],Zi="save-load-title",an="save-load-tabpanel";function rn(r){const e=r?Date.parse(r):NaN;return Number.isFinite(e)?e:0}function nn(r){return r instanceof Le||r instanceof Error?r.message:String(r)}function dc(r,e){const t=new Map;for(const i of r)t.set(i.id,{id:i.id,name:i.name,category:i.category,updatedAt:i.updated_at,counts:{...i.counts},onServer:!0,revision:i.revision});for(const i of e){const a=t.get(i.projectId);if(a){a.draftSavedAt=i.savedAt,a.draftBaseRevision=i.baseRevision;continue}const n=i.project;t.set(i.projectId,{id:i.projectId,name:n.name,category:n.category,updatedAt:i.savedAt,counts:{walls:n.walls.length,rooms:n.rooms.length,bindings:n.bindings.length,furniture:(n.furniture??[]).length},onServer:!1,draftSavedAt:i.savedAt,draftBaseRevision:i.baseRevision})}return[...t.values()].sort((i,a)=>rn(a.updatedAt)-rn(i.updatedAt))}function uc(r){return ko(r)?.icon??pi.icon}function Pe(r){return o("ui.saveload.quoted",{name:r})}function pc(r){const e=Ye(),t=r?.locale?.language??r?.language;return typeof t=="string"&&t.toLowerCase().startsWith(e)?t:e==="fr"?"fr-FR":"en-US"}const Aa=class Aa extends De{constructor(){super(...arguments),this.mode="save",this.readOnly=!1,this.dirtyProjectIds=[],this.activeTab="save",this.planName="",this.planCategory=xe,this.customCategoryName="",this.rows=[],this.listState="loading",this.listError=null,this.actionError=null,this.searchQuery="",this.pendingDeleteId=null,this.deletingId=null,this.pendingLoadId=null,this.i18n=new Ee(this),this.formInitialized=!1,this.listRequest=0,this.listHadHass=!0,this.returnFocusTo=null,this.handleKeyDown=e=>{if(e.key==="Escape"&&!e.isComposing){e.preventDefault(),e.stopPropagation(),this.pendingDeleteId||this.pendingLoadId?(this.pendingDeleteId=null,this.pendingLoadId=null):this.handleClose();return}if(e.key!=="Tab")return;const t=this.renderRoot.querySelector(".modal-card");if(!t)return;const i=xi(t);if(i.length===0){e.preventDefault();return}const a=this.shadowRoot?.activeElement,n=i[0],s=i[i.length-1];!a||!i.includes(a)?(e.preventDefault(),n.focus()):e.shiftKey&&a===n?(e.preventDefault(),s.focus()):!e.shiftKey&&a===s&&(e.preventDefault(),n.focus())}}connectedCallback(){super.connectedCallback(),this.returnFocusTo=yt(),this.addEventListener("keydown",this.handleKeyDown),this.hasUpdated&&this.listState==="loading"&&this.refreshList()}disconnectedCallback(){super.disconnectedCallback(),this.listRequest++,this.removeEventListener("keydown",this.handleKeyDown);const e=this.returnFocusTo;this.returnFocusTo=null,e?.isConnected&&e!==document.body&&e.focus({preventScroll:!0})}firstUpdated(){this.refreshList(),this.focusInitial()}updated(e){e.has("hass")&&!e.get("hass")&&this.hass&&(this.listError||!this.listHadHass)&&this.refreshList()}willUpdate(e){e.has("hass")&&(!this.hasAttribute("scheme")||e.get("hass")?.themes!==this.hass?.themes)&&Ke(this,this.hass),e.has("mode")&&(this.activeTab=this.mode==="load"?"load":"save"),!this.formInitialized&&this.project&&(this.formInitialized=!0,this.initForm(this.project))}initForm(e){this.planName=e.name||o("ui.saveload.default_plan_name");const t=e.category??Mn(e.id)??xe;Nt(t)||t===_t?(this.planCategory=t,this.customCategoryName=""):(this.planCategory=_t,this.customCategoryName=t)}get isReadOnly(){return this.readOnly||!xt(this.hass)}focusInitial(){const e=this.activeTab==="load"?".list-toolbar .form-input":this.isReadOnly?".tab-btn.active":"#plan-name",t=this.renderRoot.querySelector(e);t?.focus({preventScroll:!0}),t instanceof HTMLInputElement&&t.id==="plan-name"&&t.select()}async refreshList(){const e=++this.listRequest;this.listHadHass=!!this.hass,this.listState="loading",this.listError=null;const t=Yn();let i=[],a=null;try{i=await aa(this.hass)}catch(s){a=nn(s)}const n=await t;e===this.listRequest&&(this.rows=dc(i,n),this.listError=a,this.listState="ready")}get selectedCategory(){return this.planCategory!==_t?this.planCategory:this.customCategoryName.trim().slice(0,tn)||_t}handleSave(e){if(this.isReadOnly)return;const t=(this.planName.trim()||o("ui.saveload.untitled")).slice(0,en);this.dispatchEvent(new CustomEvent("save-confirmed",{detail:{name:t,category:this.selectedCategory,saveAs:e},bubbles:!0,composed:!0}))}loadWarning(e){const t=new Set(this.dirtyProjectIds??[]),i=this.project;return i&&i.id===e.id&&t.has(e.id)?o("ui.saveload.warn_reload_current",{name:Pe(e.name)}):i&&i.id!==e.id&&t.has(i.id)?o("ui.saveload.warn_lose_current",{current:Pe(i.name),name:Pe(e.name)}):t.has(e.id)?o("ui.saveload.warn_replace_memory",{name:Pe(e.name)}):null}requestLoad(e){if(this.pendingDeleteId=null,this.actionError=null,this.loadWarning(e)&&this.pendingLoadId!==e.id){this.pendingLoadId=e.id;return}this.pendingLoadId=null,this.dispatchEvent(new CustomEvent("load-project",{detail:{projectId:e.id},bubbles:!0,composed:!0}))}canDelete(e){return!e.onServer||!this.isReadOnly}requestDelete(e){this.pendingLoadId=null,this.actionError=null,this.pendingDeleteId=e.id}async confirmDelete(e){if(!(this.deletingId||!this.canDelete(e))){this.deletingId=e.id,this.actionError=null;try{e.onServer&&await _o(this.hass,e.id),await Rt(e.id),this.rows=this.rows.filter(t=>t.id!==e.id),this.pendingDeleteId=null,e.onServer&&this.dispatchEvent(new CustomEvent("project-deleted",{detail:{projectId:e.id},bubbles:!0,composed:!0}))}catch(t){this.actionError=o("ui.saveload.delete_failed",{name:Pe(e.name),error:nn(t)})}finally{this.deletingId=null}}}handleClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}selectTab(e,t=!1){this.activeTab=e,t&&this.updateComplete.then(()=>this.renderRoot.querySelector(`#save-load-tab-${e}`)?.focus())}handleTabKeyDown(e){const t=qe.indexOf(this.activeTab);let i;switch(e.key){case"ArrowRight":i=qe[(t+1)%qe.length];break;case"ArrowLeft":i=qe[(t-1+qe.length)%qe.length];break;case"Home":i=qe[0];break;case"End":i=qe[qe.length-1];break;default:return}e.preventDefault(),this.selectTab(i,!0)}handleCategoryKeyDown(e){if(this.isReadOnly)return;const t=Math.max(0,nt.findIndex(a=>a.id===this.planCategory));let i;switch(e.key){case"ArrowRight":case"ArrowDown":i=(t+1)%nt.length;break;case"ArrowLeft":case"ArrowUp":i=(t-1+nt.length)%nt.length;break;case"Home":i=0;break;case"End":i=nt.length-1;break;default:return}e.preventDefault(),this.planCategory=nt[i].id,this.updateComplete.then(()=>this.renderRoot.querySelector('.category-card[aria-checked="true"]')?.focus())}formatDate(e){const t=e?Date.parse(e):NaN;if(!Number.isFinite(t))return o("ui.saveload.unknown_date");const i={day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"};try{return new Date(t).toLocaleString(pc(this.hass),i)}catch{return new Date(t).toLocaleString(void 0,i)}}draftBadge(e){const t=this.formatDate(e.draftSavedAt),i=e.draftBaseRevision;let a;return e.onServer?a=typeof i=="number"&&typeof e.revision=="number"&&i<e.revision?"outdated":"unsent":this.listError?a="unreachable":typeof i=="number"?a="deleted":a="local_only",{text:o(`ui.saveload.draft.${a}`,{date:t}),title:o(`ui.saveload.draft.${a}_tooltip`)}}renderMetric(e,t,i){return u`
      <li class="metric-badge">
        <span aria-hidden="true">${e}</span>
        <strong>${R(i)}</strong>
        <span>${Lt(t,i)}</span>
      </li>
    `}quantity(e,t){return o("ui.saveload.quantity",{count:R(t),noun:Lt(e,t)})}renderSaveTab(){const e=this.isReadOnly,t=this.project,i=t?this.rows.find(s=>s.id===t.id&&s.onServer):void 0,a=this.selectedCategory,n=this.rows.filter(s=>s.onServer&&s.id!==t?.id&&s.category===a);return u`
      ${e?u`
        <div class="banner banner-warning" role="status">
          <span aria-hidden="true">🔒</span>
          <span class="banner-text">${o("ui.saveload.read_only")}</span>
        </div>
      `:w}

      <!-- Formulaire Sauvegarde -->
      <div class="form-group">
        <label class="form-label" for="plan-name">
          <span aria-hidden="true">🏷️</span>
          <span>${o("ui.saveload.name_label")}</span>
        </label>
        <input
          id="plan-name"
          type="text"
          class="form-input"
          maxlength=${en}
          .value=${this.planName}
          ?disabled=${e}
          @input=${s=>this.planName=s.target.value}
          @keydown=${s=>{s.key==="Enter"&&!s.isComposing&&this.handleSave(!1)}}
          placeholder=${o("ui.saveload.name_placeholder")}
        />
      </div>

      <div class="form-group">
        <span class="form-label" id="plan-category-label">
          <span aria-hidden="true">🏢</span>
          <span>${o("ui.saveload.category_label")}</span>
        </span>
        <div
          class="categories-grid"
          role="radiogroup"
          aria-labelledby="plan-category-label"
          aria-disabled=${e?"true":"false"}
          @keydown=${this.handleCategoryKeyDown}
        >
          ${nt.map(s=>{const l=this.planCategory===s.id;return u`
              <button
                type="button"
                class="category-card ${l?"selected":""}"
                role="radio"
                aria-checked=${l?"true":"false"}
                tabindex=${l?0:-1}
                ?disabled=${e}
                @click=${()=>{e||(this.planCategory=s.id)}}
              >
                <span class="cat-icon" aria-hidden="true">${s.icon}</span>
                <span>${s.label}</span>
              </button>
            `})}
        </div>

        ${this.planCategory===_t?u`
          <div style="margin-top: 8px;">
            <input
              type="text"
              class="form-input"
              maxlength=${tn}
              .value=${this.customCategoryName}
              ?disabled=${e}
              aria-label=${o("ui.saveload.custom_category")}
              @input=${s=>this.customCategoryName=s.target.value}
              placeholder=${o("ui.saveload.custom_category_placeholder")}
            />
          </div>
        `:w}
      </div>

      ${!e&&i?u`
        <div class="banner banner-info">
          <span aria-hidden="true">ℹ️</span>
          <span class="banner-text">${o("ui.saveload.already_saved",{date:this.formatDate(i.updatedAt)})}</span>
        </div>
      `:w}

      ${!e&&n.length>0?u`
        <div class="banner banner-info">
          <span aria-hidden="true">🏢</span>
          <span class="banner-text">${o("ui.saveload.siblings",{category:Pe(pe(a)),plans:n.map(s=>Pe(s.name)).join(", ")})}</span>
        </div>
      `:w}

      <!-- Résumé du contenu -->
      <div class="form-group">
        <span class="form-label" id="plan-contents-label">
          <span aria-hidden="true">📊</span>
          <span>${o("ui.saveload.contents_label")}</span>
        </span>
        <ul class="metrics-summary" aria-labelledby="plan-contents-label">
          ${this.renderMetric("🧱","ui.saveload.noun.walls",t?.walls?.length||0)}
          ${this.renderMetric("📐","ui.saveload.noun.rooms",t?.rooms?.length||0)}
          ${this.renderMetric("🚪","ui.saveload.noun.openings",t?.openings?.length||0)}
          ${this.renderMetric("⚡","ui.saveload.noun.ha_entities",t?.bindings?.length||0)}
          ${this.renderMetric("🛋️","ui.saveload.noun.furniture",t?.furniture?.length||0)}
        </ul>
      </div>
    `}renderRow(e){const t=e.id===this.project?.id,i=this.deletingId===e.id,a=this.pendingLoadId===e.id?this.loadWarning(e):null,n=this.pendingDeleteId===e.id,{walls:s,rooms:l,furniture:c,bindings:d}=e.counts,p=this.draftBadge(e),h=e.name||o("ui.saveload.untitled"),m=u`<span aria-hidden="true">•</span>`;let g;return e.onServer?g=o("ui.saveload.confirm_delete_server",{name:Pe(h)}):this.listError?g=o("ui.saveload.confirm_delete_local_unreachable",{name:Pe(h)}):g=o("ui.saveload.confirm_delete_local",{name:Pe(h)}),t&&(g+=` ${o("ui.saveload.confirm_delete_open")}`),u`
      <li class="project-entry">
        <div class="project-item ${t?"current":""}">
          <div class="project-info">
            <div class="project-title-row">
              <span class="project-cat-badge">
                <span aria-hidden="true">${uc(e.category)}</span>
                <span>${pe(e.category)}</span>
              </span>
              <span class="project-name" title=${e.name}>${h}</span>
              ${t?u`<span class="current-badge">${o("ui.saveload.open_badge")}</span>`:w}
            </div>
            <div class="project-meta-row">
              <span><span aria-hidden="true">📅</span> ${o("ui.saveload.modified",{date:this.formatDate(e.updatedAt)})}</span>
              ${m}
              <span><span aria-hidden="true">🧱</span> ${this.quantity("ui.saveload.noun.walls",s)}</span>
              ${m}
              <span><span aria-hidden="true">📐</span> ${this.quantity("ui.saveload.noun.rooms",l)}</span>
              ${m}
              <span><span aria-hidden="true">🛋️</span> ${this.quantity("ui.saveload.noun.furniture",c)}</span>
              ${m}
              <span><span aria-hidden="true">⚡</span> ${this.quantity("ui.saveload.noun.entities",d)}</span>
            </div>
            ${e.draftSavedAt?u`
              <div class="project-meta-row">
                <span class="local-badge" title=${p.title}><span aria-hidden="true">💾</span> ${p.text}</span>
              </div>
            `:w}
          </div>

          <div class="project-actions">
            <button
              type="button"
              class="btn-load"
              ?disabled=${i}
              @click=${()=>this.requestLoad(e)}
              title=${o(t?"ui.saveload.reload_tooltip":"ui.saveload.load_tooltip")}
              aria-label=${o(t?"ui.saveload.reload_plan":"ui.saveload.load_plan",{name:h})}
            >
              <span aria-hidden="true">⚡</span>
              <span>${o(t?"ui.saveload.reload":"ui.saveload.load")}</span>
            </button>
            ${this.canDelete(e)?u`
              <button
                type="button"
                class="btn-delete"
                ?disabled=${i}
                @click=${()=>this.requestDelete(e)}
                title=${o(e.onServer?"ui.saveload.delete_tooltip":"ui.saveload.delete_local_tooltip")}
                aria-label=${o(e.onServer?"ui.saveload.delete_plan":"ui.saveload.delete_local_plan",{name:h})}
              >
                <span aria-hidden="true">🗑️</span>
              </button>
            `:w}
          </div>
        </div>

        ${a?u`
          <div class="banner banner-warning" role="alert">
            <span aria-hidden="true">⚠️</span>
            <div class="banner-text">
              <div>${a}</div>
              <div class="banner-actions">
                <button type="button" class="btn-danger" @click=${()=>this.requestLoad(e)}>${o("ui.saveload.open_anyway")}</button>
                <button type="button" class="btn-link" @click=${()=>this.pendingLoadId=null}>${o("ui.common.cancel")}</button>
              </div>
            </div>
          </div>
        `:w}

        ${n?u`
          <div class="banner banner-error" role="alert">
            <span aria-hidden="true">🗑️</span>
            <div class="banner-text">
              <div>${g}</div>
              <div class="banner-actions">
                <button type="button" class="btn-danger" ?disabled=${i} @click=${()=>this.confirmDelete(e)}>
                  ${o(i?"ui.saveload.deleting":"ui.saveload.delete")}
                </button>
                <button type="button" class="btn-link" ?disabled=${i} @click=${()=>this.pendingDeleteId=null}>${o("ui.common.cancel")}</button>
              </div>
            </div>
          </div>
        `:w}
      </li>
    `}renderLoadTab(){const e=this.searchQuery.trim().toLowerCase(),t=e?this.rows.filter(i=>i.name.toLowerCase().includes(e)||pe(i.category).toLowerCase().includes(e)||i.id.toLowerCase().includes(e)):this.rows;return u`
      <!-- Liste Ouvrir / Recharger -->
      <div class="search-bar list-toolbar">
        <input
          type="search"
          class="form-input"
          .value=${this.searchQuery}
          @input=${i=>this.searchQuery=i.target.value}
          placeholder=${o("ui.saveload.search_placeholder")}
          aria-label=${o("ui.saveload.search")}
        />
        <button
          type="button"
          class="btn-secondary"
          ?disabled=${this.listState==="loading"}
          @click=${()=>this.refreshList()}
          title=${o("ui.saveload.refresh")}
          aria-label=${o("ui.saveload.refresh")}
        >
          <span aria-hidden="true">🔄</span>
        </button>
      </div>

      ${this.listError?u`
        <div class="banner banner-error" role="alert">
          <span aria-hidden="true">⚠️</span>
          <div class="banner-text">
            <div>${o("ui.saveload.list_error",{error:this.listError})}</div>
            <div class="banner-actions">
              <button type="button" class="btn-link" @click=${()=>this.refreshList()}>${o("ui.saveload.retry")}</button>
            </div>
          </div>
        </div>
      `:w}

      ${this.actionError?u`
        <div class="banner banner-error" role="alert">
          <span aria-hidden="true">⚠️</span>
          <span class="banner-text">${this.actionError}</span>
        </div>
      `:w}

      ${this.listState==="loading"?u`
        <div class="empty-state" role="status">
          <span><span aria-hidden="true">⏳</span> ${o("ui.saveload.loading")}</span>
        </div>
      `:t.length===0?u`
        <div class="empty-state" role="status">
          <span class="empty-state-icon" aria-hidden="true">📂</span>
          <span>${o(e?"ui.saveload.no_match":"ui.saveload.no_plans")}</span>
          ${!e&&!this.isReadOnly?u`
            <button type="button" class="btn-primary" style="margin-top: 6px;" @click=${()=>this.selectTab("save")}>
              <span aria-hidden="true">💾</span>
              <span>${o("ui.saveload.save_current")}</span>
            </button>
          `:w}
        </div>
      `:u`
        <span class="visually-hidden" role="status">${Lt("ui.saveload.results",t.length)}</span>
        <ul class="projects-list" aria-label=${o("ui.saveload.list_label")}>
          ${t.map(i=>this.renderRow(i))}
        </ul>
      `}
    `}renderTab(e,t,i){const a=this.activeTab===e;return u`
      <button
        type="button"
        id="save-load-tab-${e}"
        class="tab-btn ${a?"active":""}"
        role="tab"
        aria-selected=${a?"true":"false"}
        aria-controls=${an}
        tabindex=${a?0:-1}
        @click=${()=>this.selectTab(e)}
      >
        <span aria-hidden="true">${t}</span>
        <span>${i}</span>
      </button>
    `}render(){const e=this.isReadOnly,t=this.activeTab==="save",i=this.listState==="ready"?o("ui.saveload.tab_load_count",{count:R(this.rows.length)}):o("ui.saveload.tab_load");return u`
      <div
        class="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby=${Zi}
        aria-describedby="save-load-subtitle"
        @click=${a=>a.stopPropagation()}
      >
        <!-- Header -->
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon" aria-hidden="true">${t?"💾":"📂"}</span>
            <div>
              <h2 class="modal-title" id=${Zi}>
                ${o(t?"ui.saveload.title_save":"ui.saveload.title_load")}
              </h2>
              <p class="modal-subtitle" id="save-load-subtitle">
                ${o(t?"ui.saveload.subtitle_save":"ui.saveload.subtitle_load")}
              </p>
            </div>
          </div>
          <button
            type="button"
            class="btn-close"
            @click=${this.handleClose}
            title=${o("ui.common.close")}
            aria-label=${o("ui.common.close")}
          ><span aria-hidden="true">✕</span></button>
        </div>

        <!-- Onglets Navigation -->
        <div class="tabs-nav" role="tablist" aria-labelledby=${Zi} @keydown=${this.handleTabKeyDown}>
          ${this.renderTab("save","💾",o("ui.saveload.tab_save"))}
          ${this.renderTab("load","📂",i)}
        </div>

        <!-- Corps du modal -->
        <div class="modal-body" id=${an} role="tabpanel" aria-labelledby="save-load-tab-${this.activeTab}">
          ${t?this.renderSaveTab():this.renderLoadTab()}
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button type="button" class="btn-secondary" @click=${this.handleClose}>
            ${o(t&&!e?"ui.common.cancel":"ui.common.close")}
          </button>
          ${t&&!e?u`
            <button
              type="button"
              class="btn-secondary"
              @click=${()=>this.handleSave(!0)}
              title=${o("ui.saveload.save_as_tooltip")}
            >
              <span aria-hidden="true">📑</span> ${o("ui.saveload.save_as")}
            </button>
            <button type="button" class="btn-primary" @click=${()=>this.handleSave(!1)}>
              <span aria-hidden="true">💾</span>
              <span>${o("ui.saveload.save")}</span>
            </button>
          `:w}
        </div>
      </div>
    `}};Aa.styles=[ze,he`
    :host {
      /* Couleurs dérivées des jetons du thème (src/styles/theme.styles.ts) */
      --sl-accent-ink: color-mix(in srgb, var(--arch-ui-accent) 55%, var(--arch-ui-text));
      --sl-accent-soft: color-mix(in srgb, var(--arch-ui-accent) 14%, transparent);
      --sl-hover-bg: color-mix(in srgb, var(--arch-ui-accent) 10%, var(--arch-ui-surface));
      --sl-item-bg: color-mix(in srgb, var(--arch-ui-surface-2) 40%, var(--arch-ui-surface));
      --sl-success-ink: color-mix(in srgb, var(--arch-ui-success) 55%, var(--arch-ui-text));
      --sl-danger-ink: color-mix(in srgb, var(--arch-ui-danger) 65%, var(--arch-ui-text));
      /* Texte secondaire posé sur l'en-tête ou les lignes (fond plus foncé que la surface) : renforcé (4,5:1). */
      --sl-muted-ink: color-mix(in srgb, var(--arch-ui-text-muted) 75%, var(--arch-ui-text));

      position: fixed;
      inset: 0;
      background: var(--arch-ui-overlay);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      font-family: var(--arch-ui-font);
      color: var(--arch-ui-text);
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    /* « Réduire les animations » : la règle commune de uiThemeStyles ne vise pas l'hôte lui-même. */
    @media (prefers-reduced-motion: reduce) {
      :host {
        animation: none;
      }
    }

    .modal-card {
      background: var(--arch-ui-surface);
      border: 1px solid color-mix(in srgb, var(--arch-ui-accent) 35%, var(--arch-ui-border));
      border-radius: 16px;
      width: 580px;
      max-width: 94vw;
      max-height: 88vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      overflow: hidden;
    }

    .modal-header {
      padding: 16px 22px;
      border-bottom: 1px solid var(--arch-ui-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--arch-ui-surface-2);
      flex-shrink: 0;
    }

    .modal-title-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .modal-icon {
      font-size: 1.5rem;
    }

    .modal-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--arch-ui-text);
      margin: 0;
    }

    .modal-subtitle {
      font-size: 0.8rem;
      color: var(--sl-muted-ink);
      margin: 2px 0 0 0;
    }

    .btn-close {
      background: transparent;
      border: none;
      color: var(--arch-ui-text-muted);
      font-size: 20px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .btn-close:hover {
      color: var(--arch-ui-text);
      background: var(--sl-hover-bg);
    }

    .tabs-nav {
      display: flex;
      border-bottom: 1px solid var(--arch-ui-border);
      padding: 0 20px;
      gap: 10px;
      flex-shrink: 0;
    }

    .tab-btn {
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      color: var(--arch-ui-text-muted);
      padding: 12px 14px;
      font: inherit;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s ease;
    }

    .tab-btn:hover {
      color: var(--arch-ui-text);
    }

    .tab-btn.active {
      color: var(--sl-accent-ink);
      border-bottom-color: var(--arch-ui-accent);
    }

    .modal-body {
      padding: 20px 22px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      overflow-y: auto;
      flex: 1;
      scrollbar-width: thin;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-label {
      font-size: 0.86rem;
      font-weight: 600;
      color: var(--arch-ui-text);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .form-input {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 10px 14px;
      color: var(--arch-ui-text);
      font: inherit;
      font-size: 0.92rem;
      outline: none;
      transition: all 0.2s ease;
      box-sizing: border-box;
      width: 100%;
    }

    .form-input::placeholder {
      color: var(--arch-ui-text-muted);
    }

    .form-input:focus {
      border-color: var(--arch-ui-accent);
      box-shadow: var(--arch-ui-focus-ring);
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 8px;
    }

    .category-card {
      background: var(--sl-item-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 10px 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s ease;
      color: var(--arch-ui-text);
      font: inherit;
      font-size: 0.84rem;
      font-weight: 600;
      text-align: left;
      user-select: none;
    }

    .category-card:hover:not(:disabled) {
      background: var(--sl-hover-bg);
      border-color: var(--arch-ui-accent);
      transform: translateY(-1px);
    }

    .category-card.selected {
      background: var(--sl-accent-soft);
      border-color: var(--arch-ui-accent);
      color: var(--sl-accent-ink);
      box-shadow: 0 0 12px color-mix(in srgb, var(--arch-ui-accent) 30%, transparent);
      font-weight: 700;
    }

    .category-card .cat-icon {
      font-size: 1.25rem;
    }

    .metrics-summary {
      background: var(--arch-ui-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 10px;
      padding: 12px 16px;
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      margin: 0;
      list-style: none;
      font-size: 0.82rem;
      color: var(--arch-ui-text-muted);
    }

    .metric-badge {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .metric-badge strong {
      color: var(--sl-accent-ink);
    }

    .modal-footer {
      padding: 14px 22px;
      border-top: 1px solid var(--arch-ui-border);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-wrap: wrap;
      gap: 12px;
      background: var(--arch-ui-surface-2);
      flex-shrink: 0;
    }

    .btn-secondary {
      background: var(--arch-ui-surface);
      color: var(--arch-ui-text);
      border: 1px solid var(--arch-ui-border);
      border-radius: 8px;
      padding: 8px 16px;
      font: inherit;
      font-size: 0.86rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-secondary:hover:not(:disabled) {
      background: var(--sl-hover-bg);
    }

    .btn-primary {
      background: var(--arch-ui-accent);
      color: var(--arch-ui-accent-text);
      border: 1px solid var(--arch-ui-accent);
      border-radius: 8px;
      padding: 8px 20px;
      font: inherit;
      font-size: 0.86rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s ease;
      box-shadow: 0 0 14px color-mix(in srgb, var(--arch-ui-accent) 35%, transparent);
    }

    .btn-primary:hover:not(:disabled) {
      background: color-mix(in srgb, var(--arch-ui-accent) 85%, black);
      transform: translateY(-1px);
    }

    /* Styles pour la liste des projets sauvegardés */
    .search-bar {
      margin-bottom: 12px;
    }

    .projects-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-height: 380px;
      overflow-y: auto;
      scrollbar-width: thin;
      padding: 2px 4px 2px 2px;
      margin: 0;
      list-style: none;
    }

    .project-item {
      background: var(--sl-item-bg);
      border: 1px solid var(--arch-ui-border);
      border-radius: 12px;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      transition: all 0.15s ease;
    }

    .project-item:hover {
      border-color: color-mix(in srgb, var(--arch-ui-accent) 50%, transparent);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
    }

    .project-item.current {
      border-color: var(--arch-ui-accent);
      background: var(--sl-accent-soft);
    }

    .project-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
      flex: 1;
    }

    .project-title-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .project-cat-badge {
      background: var(--sl-accent-soft);
      color: var(--sl-accent-ink);
      border: 1px solid color-mix(in srgb, var(--arch-ui-accent) 30%, transparent);
      padding: 2px 7px;
      border-radius: 6px;
      font-size: 0.74rem;
      font-weight: 700;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .project-name {
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--arch-ui-text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .project-meta-row {
      font-size: 0.78rem;
      color: var(--sl-muted-ink);
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 2px 12px;
    }

    .project-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-load {
      background: color-mix(in srgb, var(--arch-ui-success) 16%, transparent);
      color: var(--sl-success-ink);
      border: 1px solid color-mix(in srgb, var(--arch-ui-success) 45%, transparent);
      border-radius: 8px;
      padding: 6px 14px;
      font: inherit;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .btn-load:hover:not(:disabled) {
      background: color-mix(in srgb, var(--arch-ui-success) 30%, transparent);
      color: var(--arch-ui-text);
    }

    .btn-delete {
      background: transparent;
      color: var(--sl-danger-ink);
      border: 1px solid color-mix(in srgb, var(--arch-ui-danger) 40%, transparent);
      border-radius: 8px;
      padding: 6px 10px;
      font: inherit;
      font-size: 0.82rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-delete:hover:not(:disabled) {
      background: color-mix(in srgb, var(--arch-ui-danger) 18%, transparent);
    }

    .empty-state {
      padding: 36px 20px;
      text-align: center;
      color: var(--arch-ui-text-muted);
      font-size: 0.9rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .empty-state-icon {
      font-size: 2.2rem;
      opacity: 0.6;
    }

    .btn-primary:disabled,
    .btn-secondary:disabled,
    .btn-load:disabled,
    .btn-delete:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    /* Bandeaux : texte du thème (contraste), couleur portée par la bordure et la teinte de fond. */
    .banner {
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 0.84rem;
      line-height: 1.4;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      color: var(--arch-ui-text);
      border: 1px solid var(--banner-color);
      border-left-width: 4px;
      background: color-mix(in srgb, var(--banner-color) 12%, var(--arch-ui-surface));
    }

    .banner-error {
      --banner-color: var(--arch-ui-danger);
    }

    .banner-info {
      --banner-color: var(--arch-ui-info);
    }

    .banner-warning {
      --banner-color: var(--arch-ui-warning);
    }

    .banner-text {
      flex: 1;
      min-width: 0;
    }

    .banner-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 8px;
    }

    .btn-link {
      background: transparent;
      border: 1px solid currentColor;
      border-radius: 6px;
      color: inherit;
      padding: 3px 10px;
      font: inherit;
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
    }

    .btn-danger {
      background: color-mix(in srgb, var(--arch-ui-danger) 85%, black);
      border: 1px solid var(--arch-ui-danger);
      color: #ffffff;
      border-radius: 6px;
      padding: 3px 10px;
      font: inherit;
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
    }

    .btn-danger:hover:not(:disabled) {
      background: color-mix(in srgb, var(--arch-ui-danger) 70%, black);
    }

    .btn-danger:disabled {
      opacity: 0.6;
      cursor: progress;
    }

    .project-entry {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .local-badge {
      background: color-mix(in srgb, var(--arch-ui-warning) 15%, transparent);
      color: var(--arch-ui-text);
      border: 1px solid color-mix(in srgb, var(--arch-ui-warning) 50%, transparent);
      padding: 1px 7px;
      border-radius: 6px;
      font-size: 0.72rem;
      font-weight: 700;
      white-space: nowrap;
    }

    .current-badge {
      font-size: 0.72rem;
      color: var(--sl-accent-ink);
      font-weight: 700;
      white-space: nowrap;
    }

    .list-toolbar {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .list-toolbar .form-input {
      flex: 1;
    }

    .form-input:disabled,
    .category-card:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    /* Focus clavier visible même sur les éléments qui portent déjà une ombre (catégorie choisie, bouton principal). */
    .category-card:focus-visible,
    .btn-primary:focus-visible,
    .btn-danger:focus-visible {
      outline: 2px solid var(--arch-ui-accent);
      outline-offset: 2px;
    }

    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
    }
  `];let J=Aa;ie([L({type:Object})],J.prototype,"project");ie([L({type:Object})],J.prototype,"hass");ie([L({type:String})],J.prototype,"mode");ie([L({type:Boolean})],J.prototype,"readOnly");ie([L({attribute:!1})],J.prototype,"dirtyProjectIds");ie([k()],J.prototype,"activeTab");ie([k()],J.prototype,"planName");ie([k()],J.prototype,"planCategory");ie([k()],J.prototype,"customCategoryName");ie([k()],J.prototype,"rows");ie([k()],J.prototype,"listState");ie([k()],J.prototype,"listError");ie([k()],J.prototype,"actionError");ie([k()],J.prototype,"searchQuery");ie([k()],J.prototype,"pendingDeleteId");ie([k()],J.prototype,"deletingId");ie([k()],J.prototype,"pendingLoadId");Ae("home-architect-save-load-modal",J);const hc={"panel.common.apply":"Appliquer","panel.common.cancel":"Annuler","panel.common.close":"Fermer","panel.common.continue":"Continuer","panel.common.delete":"Supprimer","panel.common.yes":"Oui","panel.common.no":"Non","panel.common.pair":"{first} et {second}","panel.common.parenthesized":" ({text})","panel.common.quoted":"« {name} »","panel.common.reload":"Recharger","panel.common.retry":"Réessayer","panel.common.unknown_date":"date inconnue","panel.common.unsaved_changes":"Modifications non sauvegardées","panel.unit.meters":"{value} m","panel.unit.centimeters":"{value} cm","panel.unit.square_meters":"{value} m²","panel.thickness.partition":"Cloison {size}","panel.thickness.wall":"Mur {size}","panel.thickness.load_bearing":"Porteur {size}","panel.thickness.exterior":"Extérieur {size}","panel.opening_width.narrow":"{size} (Étroite)","panel.opening_width.bedroom":"{size} (Chambre)","panel.opening_width.standard":"{size} (Standard)","panel.opening_width.window":"{size} (Fenêtre)","panel.opening_width.double":"{size} (Double)","panel.opening_width.bay":"{size} (Baie)","panel.opening_width.large_bay":"{size} (Grande baie)","panel.ceiling.basement":"{size} (Sous-sol)","panel.ceiling.attic":"{size} (Combles)","panel.ceiling.standard":"{size} (Standard)","panel.ceiling.high":"{size} (Élevé)","panel.ceiling.haussmann":"{size} (Haussmann)","panel.ceiling.cathedral":"{size} (Cathédrale)","panel.measure.current":"{size} (actuelle)","panel.count.walls_one":"{count} mur","panel.count.walls_other":"{count} murs","panel.count.doors_one":"{count} porte","panel.count.doors_other":"{count} portes","panel.count.windows_one":"{count} fenêtre","panel.count.windows_other":"{count} fenêtres","panel.count.rooms_one":"{count} pièce","panel.count.rooms_other":"{count} pièces","panel.count.openings_one":"{count} ouverture","panel.count.openings_other":"{count} ouvertures","panel.count.sashes_one":"{count} ouvrant","panel.count.sashes_other":"{count} ouvrants","panel.count.entities_one":"{count} entité","panel.count.entities_other":"{count} entités","panel.count.furniture_one":"{count} meuble","panel.count.furniture_other":"{count} meubles","panel.header.ha_menu":"Menu Home Assistant","panel.header.ha_menu_aria":"Ouvrir la barre latérale de Home Assistant","panel.header.brand_title":"Home Architect Studio (Cliquez pour secret)","panel.header.about_title":"À propos de Home Architect (version, mises à jour, soutien)","panel.header.about_aria":"À propos de Home Architect, version {version}","panel.header.update_title":"Nouvelle version {version} disponible","panel.header.update_available":"Mise à jour dispo","panel.header.menus":"Menus du studio","panel.menu.file.label":"Fichier","panel.menu.file.new":"Nouveau plan... (Alt+N)","panel.menu.file.open":"Ouvrir / Recharger un plan...","panel.menu.file.save":"Sauvegarder le plan... (Ctrl+S)","panel.menu.file.save_all":"Sauvegarder tous les plans modifiés ({count})","panel.menu.file.import":"Importer un plan...","panel.menu.file.export":"Exporter Lovelace...","panel.menu.reset":"Effacer le plan (Reset)...","panel.menu.plan.label":"Plan","panel.menu.plan.rescale":"Mettre à l'échelle (S)","panel.menu.plan.view_3d_active":"Vue 3D (Active)","panel.menu.plan.view_2d_3d":"Vue 2D / 3D","panel.menu.plan.wizard":"Assistant Pièce","panel.menu.plan.dimensions":"Cotes dynamiques","panel.menu.plan.heatmap":"Carte thermique","panel.menu.plan.ghost":"Filigrane niveau inf.","panel.menu.plan.fit":"Ajuster à l'écran (Zoom auto)","panel.menu.plan.rotate":"Pivoter la vue de 90° à gauche","panel.menu.plan.orientation":"Orientation (Nord)...","panel.orientation.title":"Orientation du plan (Nord géographique)","panel.orientation.desc":"Définissez l'orientation du Nord géographique pour aligner votre plan avec son exposition réelle. Dans la vue 3D, le cycle solaire en direct (sun.sun) et les ombres portées à travers les fenêtres s'ajusteront à l'exposition réelle.","panel.orientation.angle_label":"Angle du Nord :","panel.orientation.compass_label":"Boussole sur le plan","panel.orientation.show_compass":"Afficher la boussole sur le plan","panel.orientation.apply":"Appliquer","panel.orientation.cancel":"Annuler","panel.orientation.drag_tip":"Glissez ou cliquez sur le cadran pour orienter le Nord","panel.orientation.preset_n":"Nord (0°)","panel.orientation.preset_ne":"Nord-Est (45°)","panel.orientation.preset_e":"Est (90°)","panel.orientation.preset_se":"Sud-Est (135°)","panel.orientation.preset_s":"Sud (180°)","panel.orientation.preset_sw":"Sud-Ouest (225°)","panel.orientation.preset_w":"Ouest (270°)","panel.orientation.preset_nw":"Nord-Ouest (315°)","panel.fullscreen.enter":"Plein écran","panel.fullscreen.exit":"Sortir du plein écran","panel.fullscreen.enter_title":"Passer en plein écran","panel.fullscreen.exit_title":"Sortir du plein écran (Échap)","panel.level.label":"Niveau","panel.level.prefix":"Niveau :","panel.level.trigger_aria":"Niveau et plan affichés : {level}, {name}","panel.level.trigger_aria_dirty":"Niveau et plan affichés : {level}, {name} (modifications non sauvegardées)","panel.level.name_with_full":"{label} ({full})","panel.level.not_saved":"non sauvegardé","panel.level.empty":"vide","panel.level.empty_title":"Aucun plan pour ce niveau : un plan vierge sera créé","panel.level.other_plans":"Autres plans","panel.history.group":"Historique","panel.history.undo":"Annuler","panel.history.redo":"Rétablir","panel.history.undo_title":"Annuler la dernière action (Ctrl+Z / Cmd+Z)","panel.history.redo_title":"Rétablir l'action (Ctrl+Y / Cmd+Shift+Z)","panel.controls.thickness":"Épaisseur :","panel.controls.thickness_aria":"Épaisseur des murs","panel.controls.width":"Largeur :","panel.controls.width_aria":"Largeur des ouvertures","panel.controls.ceiling":"Plafond 3D :","panel.controls.ceiling_title":"Hauteur sous plafond par défaut (3D)","panel.controls.background":"Fond :","panel.controls.background_opacity":"Opacité du plan de fond","panel.controls.scale":"1 m = {value} px","panel.controls.scale_title":"Échelle d'affichage : pixels par mètre","panel.drawer.label":"Entités HA","panel.drawer.toggle_title":"Afficher / Masquer le volet des entités et des meubles","panel.drawer.toggle_aria_one":"Entités HA : volet des entités et des meubles ({count} entité placée)","panel.drawer.toggle_aria_other":"Entités HA : volet des entités et des meubles ({count} entités placées)","panel.save.label":"Sauvegarder","panel.save.saving":"Sauvegarde…","panel.save.title":"Sauvegarder le plan (Ctrl+S / Cmd+S)","panel.save.title_dirty":"Modifications non sauvegardées (Ctrl+S / Cmd+S)","panel.hud.region":"Sélection","panel.hud.thickness":"Épaisseur :","panel.hud.thin":"Fin {size}","panel.hud.medium":"Moyen {size}","panel.hud.medium_title":"Standard {size}","panel.hud.thick":"Gros {size}","panel.hud.door":"Porte :","panel.hud.door_right_in":"Droite Int.","panel.hud.door_right_in_title":"Ouverture Droite Intérieure (Poussant Droit)","panel.hud.door_left_in":"Gauche Int.","panel.hud.door_left_in_title":"Ouverture Gauche Intérieure (Poussant Gauche)","panel.hud.door_left_out":"Gauche Ext.","panel.hud.door_left_out_title":"Ouverture Gauche Extérieure (Tirant Gauche)","panel.hud.door_right_out":"Droite Ext.","panel.hud.door_right_out_title":"Ouverture Droite Extérieure (Tirant Droit)","panel.hud.window":"Fenêtre :","panel.hud.window_single":"1 Ouvrant","panel.hud.window_single_title":"Fenêtre 1 ouvrant ({size})","panel.hud.window_double":"2 Battants","panel.hud.window_double_title":"Fenêtre 2 battants ({size})","panel.hud.window_bay":"Baie vitrée","panel.hud.window_bay_title":"Baie vitrée coulissante ({size})","panel.hud.opening_width":"Largeur :","panel.hud.opening_width_title":"Régler la largeur de l'ouverture","panel.hud.furniture":"Meuble :","panel.hud.room":"Pièce :","panel.hud.edit_room":"Renommer / Modifier","panel.hud.edit_room_title":"Modifier le nom, la couleur ou la hauteur de la pièce","panel.hud.rotate":"Pivoter 90° (R)","panel.hud.rotate_title":"Pivoter les meubles de 90° (Touche R)","panel.hud.color":"Couleur","panel.hud.color_title":"Couleur du meuble (plan, export et carte)","panel.hud.color_reset":"Revenir à la couleur du modèle","panel.hud.icon_picker":"Choisir l'icône","panel.hud.icon_picker_title":"Choisir l'icône pour le plan et la card Lovelace","panel.hud.icon_categories":"Catégories d'icônes","panel.hud.icon_active":"Icône active :","panel.hud.icon_default":"Défaut","panel.hud.icon_automatic":"Automatique","panel.hud.icon_free":"Saisie libre :","panel.hud.icon_free_placeholder":"Emoji","panel.hud.delete_title":"Supprimer les éléments sélectionnés (Touche Suppr / Retour)","panel.hud.clear_selection":"Désélectionner tout (Échap)","panel.icons.light.title":"Éclairage & Luminaires","panel.icons.light.tab":"Éclairage","panel.icons.light.bulb":"Ampoule standard","panel.icons.light.living_lamp":"Lampe salon","panel.icons.light.recessed_spot":"Spot encastré","panel.icons.light.ceiling_light":"Plafonnier","panel.icons.light.outdoor_lantern":"Lanterne extérieure","panel.icons.light.candle":"Bougie / Ambiance","panel.icons.light.spotlight":"Projecteur","panel.icons.light.led_strip":"Bandeau LED RGB","panel.icons.light.string_lights":"Guirlande lumineuse","panel.icons.light.wall_sconce":"Applique murale","panel.icons.switch.title":"Prises & Interrupteurs","panel.icons.switch.tab":"Prises","panel.icons.switch.smart_plug":"Prise connectée","panel.icons.switch.wall_switch":"Interrupteur mural","panel.icons.switch.tv":"Télévision","panel.icons.switch.appliance":"Cafetière / Électroménager","panel.icons.switch.computer":"PC / Bureau","panel.icons.switch.speaker":"Enceinte / Chaîne Hi-Fi","panel.icons.switch.printer":"Imprimante","panel.icons.switch.console":"Console de jeu","panel.icons.switch.charger":"Chargeur batterie","panel.icons.switch.fan":"Ventilateur mobile","panel.icons.binary_sensor.title":"Détecteurs, Sécurité & Ouvrants","panel.icons.binary_sensor.tab":"Détecteurs","panel.icons.binary_sensor.pir_motion":"Mouvement PIR","panel.icons.binary_sensor.quick_pass":"Passage rapide","panel.icons.binary_sensor.presence_radar":"Radar présence","panel.icons.binary_sensor.door_sensor":"Capteur porte","panel.icons.binary_sensor.window_sensor":"Capteur fenêtre","panel.icons.binary_sensor.garage_door":"Porte garage","panel.icons.binary_sensor.siren":"Sirène / Alarme","panel.icons.binary_sensor.doorbell":"Sonnette / Carillon","panel.icons.binary_sensor.pet":"Présence animale","panel.icons.binary_sensor.water_leak":"Fuite d'eau","panel.icons.binary_sensor.smoke":"Détecteur fumée","panel.icons.binary_sensor.mailbox":"Boîte aux lettres","panel.icons.climate.title":"Thermostats & Climatisation","panel.icons.climate.tab":"Climat","panel.icons.climate.thermostat":"Thermostat principal","panel.icons.climate.air_conditioner":"Climatiseur (Froid)","panel.icons.climate.radiator":"Radiateur (Chaud)","panel.icons.climate.heat_pump":"Pompe à chaleur / ECS","panel.icons.climate.ventilation":"VMC / Aération","panel.icons.sensor.title":"Capteurs & Sondes","panel.icons.sensor.tab":"Sondes","panel.icons.sensor.temperature":"Sonde température","panel.icons.sensor.humidity":"Hygrométrie (Humidité)","panel.icons.sensor.illuminance":"Luminosité (Lux)","panel.icons.sensor.air_quality":"Qualité d'air (CO2/VOC)","panel.icons.sensor.power":"Consommation électrique","panel.icons.sensor.battery":"Batterie restante","panel.icons.sensor.noise":"Bruit / Décibels","panel.icons.sensor.pressure":"Pression barométrique","panel.icons.cover.title":"Volets, Stores & Motorisations","panel.icons.cover.tab":"Volets","panel.icons.cover.roller_shutter":"Volet roulant","panel.icons.cover.venetian_blind":"Store vénitien","panel.icons.cover.garage_door":"Porte garage motorisée","panel.icons.cover.awning":"Store banne terrasse","panel.icons.cover.sliding_door":"Motorisation baie","panel.icons.media_player.title":"Multimédia & Enceintes","panel.icons.media_player.tab":"Média","panel.icons.media_player.tv":"Téléviseur","panel.icons.media_player.smart_speaker":"Enceinte connectée","panel.icons.media_player.multiroom":"Musique multiroom","panel.icons.media_player.av_receiver":"Ampli Home-Cinema","panel.icons.media_player.projector":"Vidéoprojecteur","panel.icons.media_player.console":"Console jeux vidéo","panel.icons.camera.title":"Caméras & Vidéosurveillance","panel.icons.camera.tab":"Caméras","panel.icons.camera.indoor":"Caméra intérieure fixe","panel.icons.camera.ptz_dome":"Caméra dôme PTZ extérieure","panel.icons.camera.monitored_zone":"Zone sous surveillance","panel.icons.camera.video_doorbell":"Portier / Interphone vidéo","panel.icons.fan.title":"Ventilation & Brassage","panel.icons.fan.tab":"Ventilateur","panel.icons.fan.standing_fan":"Ventilateur colonne/pied","panel.icons.fan.extraction":"VMC extraction","panel.icons.fan.ceiling_fan":"Plafonnier ventilateur","panel.icons.vacuum.title":"Robots Aspirateurs & Nettoyage","panel.icons.vacuum.tab":"Robots","panel.icons.vacuum.robot_vacuum":"Robot aspirateur","panel.icons.vacuum.floor_washer":"Robot laveur de sol","panel.icons.lock.title":"Serrures & Contrôle d'accès","panel.icons.lock.tab":"Serrures","panel.icons.lock.smart_lock":"Serrure connectée","panel.icons.lock.intrusion_alarm":"Alarme intrusion","panel.icons.lock.electric_strike":"Gâche électrique","panel.toast.doors_updated_one":"🚪 {count} porte mise à jour","panel.toast.doors_updated_other":"🚪 {count} portes mises à jour","panel.toast.windows_adjusted_one":"{count} réduite pour tenir dans le mur","panel.toast.windows_adjusted_other":"{count} réduites pour tenir dans le mur","panel.toast.windows_refused_one":"{count} inchangée : mur trop court ou ouverture voisine","panel.toast.windows_refused_other":"{count} inchangées : mur trop court ou ouverture voisine","panel.toast.windows_updated_one":"🪟 {count} fenêtre mise à jour{notes}","panel.toast.windows_updated_other":"🪟 {count} fenêtres mises à jour{notes}","panel.toast.window_format_refused":"⚠️ Format non appliqué : {notes}.","panel.toast.walls_thickness_one":"🧱 Épaisseur de {count} mur mise à jour ({size})","panel.toast.walls_thickness_other":"🧱 Épaisseur de {count} murs mise à jour ({size})","panel.toast.door_direction":"🚪 Sens d'ouverture de porte mis à jour","panel.toast.wall_thickness":"🧱 Épaisseur de mur mise à jour ({size})","panel.toast.wizard_invalid":"❌ Dimensions de pièce invalides : vérifiez la largeur, la longueur et la hauteur.","panel.toast.room_created":"✨ Pièce « {name} » créée ({area})","panel.toast.room_created_too_small":"✨ Pièce « {name} » créée ({area}) : pièce trop petite pour y placer la porte ou la fenêtre.","panel.toast.image_unreadable":"❌ Image illisible.","panel.toast.pasted_image_unreadable":"❌ Image collée illisible.","panel.toast.pasted_url_loaded":"📋 Image chargée depuis l'URL collée ! Tracez un segment sur un mur mesuré pour étalonner l'échelle (📏).","panel.toast.image_url_unsupported":"❌ Adresse d'image non prise en charge : utilisez une URL http(s) ou importez le fichier.","panel.toast.image_load_error":"❌ Erreur lors du chargement de l'image.","panel.toast.import_scaled":"✅ Plan importé et mis à l'échelle ! Vous pouvez tracer vos murs (🧱).","panel.toast.import_calibrate":"📏 Plan importé ! Tracez un segment sur un mur mesuré pour étalonner l'échelle.","panel.toast.import_empty":"ℹ️ Aucun mur ni aucune pièce à importer.","panel.toast.svg_converted":"✨ Plan SVG converti : {walls}, {doors}, {windows} et {rooms} importés.","panel.toast.svg_converted_added":"✨ Plan SVG converti : {walls}, {doors}, {windows} et {rooms} ajoutés à côté du plan.","panel.toast.svg_layer_kept_existing":"Le calque du SVG n'a pas été repris : le plan a déjà une image de fond.","panel.toast.svg_layer_not_imported":"Calque de fond non importé.","panel.toast.calibration_refused":"❌ Étalonnage refusé : facteur d'échelle hors limites (×{min} à ×{max}).","panel.toast.no_background_to_calibrate":"ℹ️ Aucun calque de fond à étalonner.","panel.toast.background_calibrated":"📏 Calque de fond étalonné ({factor}) : le dessin existant n'est pas modifié.","panel.toast.rescale_refused":"❌ Mise à l'échelle refusée : facteur hors limites (×{min} à ×{max}).","panel.toast.scaled":"✅ {label} ({factor}) : {walls} et {rooms} recalculés ; épaisseurs, ouvertures et meubles gardent leurs dimensions.","panel.toast.scale_conflicts_one":"⚠️ {count} ouverture à vérifier (mur trop court ou chevauchement).","panel.toast.scale_conflicts_other":"⚠️ {count} ouvertures à vérifier (mur trop court ou chevauchement).","panel.toast.default_ceiling":"📐 Hauteur plafond 3D par défaut : {height}","panel.toast.ceiling_inherited":"📐 {items} suivent la hauteur par défaut.","panel.toast.room_updated":'✨ Pièce "{name}" mise à jour (H: {height}) !',"panel.toast.room_deleted":"🗑️ Pièce supprimée","panel.toast.undone":"↩️ Action annulée","panel.toast.redone":"↪️ Action rétablie","panel.toast.furniture_rotated":"🔄 Meuble pivoté de 90°","panel.toast.elements_deleted_one":"🗑️ {count} élément supprimé !","panel.toast.elements_deleted_other":"🗑️ {count} éléments supprimés !","panel.toast.icon_applied":"✨ Icône {icon} appliquée !","panel.toast.tap_to_place":"📍 Touchez le plan pour placer « {name} » (Échap pour annuler).","panel.toast.fullscreen_on":"⛶ Mode plein écran activé (Échap pour sortir)","panel.toast.fullscreen_off":"🗗 Sortie du plein écran","panel.toast.plan_reset":"🗑️ Plan effacé (Réinitialisé). Annulez avec Ctrl+Z si besoin.","panel.scale.calibrated":"Plan étalonné","panel.scale.rescaled":"Plan mis à l'échelle","panel.ceiling.ask.title":"Appliquer la nouvelle hauteur ?","panel.ceiling.ask.message":"{items} ont une hauteur de {previous}, l'ancienne valeur par défaut. Doivent-ils suivre la nouvelle hauteur par défaut ({next}) ?","panel.ceiling.ask.detail":"Les pièces et murs dont la hauteur a été réglée sur une autre valeur ne changent pas.","panel.ceiling.ask.keep":"Conserver leur hauteur","panel.import.new_plan_name":"Plan importé","panel.import.ask.title":"Le plan contient déjà des éléments","panel.import.ask.message":"Le SVG apporte {walls}, {openings} et {rooms}. Le plan actuel contient {current_walls} et {current_rooms}. Que faire ?","panel.import.ask.detail_replace":"Remplacer : les murs, ouvertures et pièces actuels sont remplacés ; entités, meubles et image de fond sont conservés (l'image est remplacée si le SVG fournit son calque).","panel.import.ask.detail_add":"Ajouter à côté : le dessin importé est placé à droite du plan actuel, sans rien supprimer.","panel.import.ask.detail_new":"Nouveau plan : le dessin est ouvert dans un nouveau plan distinct du niveau {level}, le plan actuel reste inchangé.","panel.import.ask.detail_undo":"Dans tous les cas, Annuler (Ctrl+Z) reste possible.","panel.import.ask.new":"Nouveau plan","panel.import.ask.add":"Ajouter à côté","panel.import.ask.replace":"Remplacer","panel.wizard.default_room_name":"Pièce","panel.new_plan.title":"Nouveau Plan","panel.new_plan.subtitle":"Créer une feuille de dessin vierge","panel.new_plan.name":"Nom du plan :","panel.new_plan.name_placeholder":"Ex: Mon Appartement, RDC...","panel.new_plan.category":"Catégorie / Niveau :","panel.new_plan.create":"Créer le plan","panel.new_plan.default_name":"Plan {level}","panel.new_plan.fallback_name":"Nouveau plan","panel.reset.title":"Effacer le Plan","panel.reset.subtitle":"Réinitialisation de l'espace de travail","panel.reset.confirm_before":"Êtes-vous sûr de vouloir ","panel.reset.confirm_strong":"effacer tout le contenu","panel.reset.confirm_after":" du plan actuel ","panel.reset.confirm_end":" ?","panel.reset.walls":"Murs :","panel.reset.openings":"Ouvrants :","panel.reset.rooms":"Pièces :","panel.reset.entities":"Entités HA :","panel.reset.furniture":"Meubles :","panel.reset.background":"Image de fond :","panel.reset.undo_hint":"ℹ️ Cette action est réversible avec le bouton Annuler (Ctrl+Z).","panel.reset.confirm":"Effacer tout","panel.drafts.title":"Copies locales non sauvegardées","panel.drafts.subtitle":"Modifications conservées dans ce navigateur et absentes du serveur","panel.drafts.meta":"{level} · enregistrée le {date}","panel.drafts.open":"Ouvrir","panel.drafts.open_title":"Ouvrir la copie locale dans le studio","panel.drafts.send":"Envoyer au serveur","panel.drafts.send_title":"Envoyer la copie locale au serveur","panel.drafts.discard_title":"Supprimer définitivement la copie locale de « {name} »","panel.drafts.hint":"ℹ️ Si vous modifiez l'un de ces plans sans ouvrir sa copie locale, celle-ci sera remplacée par vos nouvelles modifications.","panel.drafts.later":"Décider plus tard","panel.drafts.status.unsaved":"Plan jamais sauvegardé","panel.drafts.status.newer":"Plus récent que la version du serveur","panel.drafts.status.outdated":"Basé sur une ancienne version du serveur (conflit possible)","panel.drafts.status.deleted":"Le plan n'existe plus sur le serveur","panel.update.title":"Mise à jour de Home Architect","panel.update.subtitle":"Nouvelle version disponible","panel.update.installed":"Version installée","panel.update.latest":"Nouvelle version","panel.update.notes":"Notes de version","panel.update.notes_empty":"Consultez la page de la release pour le détail des nouveautés.","panel.update.how_to":"💡 La mise à jour s'installe en 1 clic ci-dessous ou depuis Paramètres › Mises à jour de Home Assistant.","panel.update.dirty_warning_one":"⚠️ {count} plan a des modifications non sauvegardées. Sauvegardez avant de quitter le studio : sinon elles ne seront conservées que comme copie locale dans ce navigateur.","panel.update.dirty_warning_other":"⚠️ {count} plans ont des modifications non sauvegardées. Sauvegardez avant de quitter le studio : sinon elles ne seront conservées que comme copie locale dans ce navigateur.","panel.update.view_release":"Voir la release","panel.update.open_updates":"Paramètres HA","panel.update.install_button":"⚡ Mettre à jour vers v{version}","panel.update.installing":"Installation de la mise à jour…","panel.update.installing_hint":"Téléchargement de la release GitHub et mise à jour des fichiers… Veuillez patienter.","panel.update.success_title":"Mise à jour installée avec succès !","panel.update.success_message":"La version v{version} a été installée.","panel.update.success_hint":"Redémarrez Home Assistant pour appliquer les modifications, puis rechargez votre page.","panel.update.restart_ha":"Redémarrer Home Assistant","panel.update.restarting":"Redémarrage de Home Assistant en cours…","panel.update.retry":"Réessayer la mise à jour","panel.update.error_title":"Échec de la mise à jour","panel.about.subtitle":"Plans interactifs pour Home Assistant","panel.about.studio_version":"Version du studio","panel.about.loaded_bundles":"Chargé dans la page : {bundles}","panel.about.bundle_version":"{bundle} {version}","panel.about.bundle.card":"carte","panel.about.bundle.panel":"studio","panel.about.updates_by_admin":"ℹ️ Les mises à jour sont installées par un administrateur depuis Paramètres › Mises à jour.","panel.about.updates_unknown":"ℹ️ État des mises à jour indisponible pour le moment.","panel.about.update_available":"🚀 Nouvelle version v{version} disponible.","panel.about.show_update":"Voir la mise à jour","panel.about.up_to_date":"✅ Home Architect est à jour.","panel.about.reload_required":"🔁 Une nouvelle version (v{version}) est installée : rechargez la page pour l'utiliser.","panel.about.release_notes":"Notes de version","panel.about.documentation":"Documentation et support","panel.about.support_hint":"Home Architect est développé bénévolement. Si le projet vous est utile :","panel.about.ha_updates":"Mises à jour de Home Assistant","panel.support.label":"☕ Soutenir le projet","panel.support.aria":"Soutenir le projet sur Buy Me A Coffee (ouvre un nouvel onglet)","panel.notice.dismiss":"Masquer","panel.notice.reload_required":"🔁 Nouvelle version installée (v{version}) : rechargez la page pour l'utiliser. Versions chargées : {bundles}.","panel.loading.plans":"Chargement des plans…","panel.loading.error_title":"Impossible de charger les plans","panel.loading.error_hint":"La sauvegarde est désactivée tant que les plans du serveur ne sont pas chargés.","panel.error.connection_lost":"connexion à Home Assistant perdue","panel.error.not_ready":"Home Architect n'est pas chargé sur le serveur","panel.error.save_failed":"échec d'écriture sur le serveur","panel.error.unknown_command":"intégration Home Architect à redémarrer après sa mise à jour","panel.background.invalid_svg":"Fichier SVG invalide.","panel.background.unreadable":"Image de fond illisible : {reason}","panel.background.rejected":"Image de fond refusée par le serveur : {reason}","panel.persist.read_only_toast":"🔒 Lecture seule : seuls les administrateurs peuvent modifier les plans.","panel.persist.read_only":"🔒 Lecture seule : seuls les administrateurs de Home Assistant peuvent modifier et sauvegarder les plans.","panel.persist.read_only_denied":"🔒 Lecture seule : le serveur a refusé la sauvegarde (action réservée aux administrateurs). Vos modifications non sauvegardées sont conservées dans ce navigateur.","panel.persist.loading_plan":"Chargement du plan…","panel.persist.draft_reason.unreachable":"serveur injoignable : {reason}","panel.persist.draft_reason.unsaved":"plan jamais enregistré sur le serveur","panel.persist.draft_reason.deleted":"plan supprimé du serveur","panel.persist.draft_opened_reason":"📂 Copie locale de « {name} » ouverte ({reason}) : sauvegardez-la pour l'envoyer au serveur.","panel.persist.open_failed":"Impossible d'ouvrir le plan : {reason}","panel.persist.reload_failed":"Impossible de recharger le plan : {reason}","panel.persist.plan_missing":"❌ Ce plan n'existe plus sur le serveur.","panel.persist.draft_opened":"📂 Copie locale ouverte : sauvegardez-la pour l'envoyer au serveur.","panel.persist.plan_loaded":'📂 Plan "{name}" chargé avec succès !',"panel.persist.draft_choice.title":"Copie locale non sauvegardée","panel.persist.draft_choice.message":"Ce navigateur conserve des modifications de ce plan qui n'ont pas été envoyées au serveur (copie du {date}). {status}.","panel.persist.draft_choice.detail_draft":"Copie locale : reprend vos modifications ; sauvegardez ensuite le plan pour les envoyer au serveur.","panel.persist.draft_choice.detail_server":"Version du serveur : la copie locale est conservée, mais elle sera remplacée dès que vous modifierez ce plan.","panel.persist.draft_choice.server":"Version du serveur","panel.persist.draft_choice.draft":"Copie locale","panel.persist.no_plan_for_level":"Aucun plan enregistré pour le niveau {level}.","panel.persist.level_blank":"Étage sélectionné : {name} (plan vierge)","panel.persist.plan_created":'📄 Nouveau plan "{name}" créé : pensez à le sauvegarder.',"panel.persist.backup_imported":"📥 « {name} » importé comme nouveau plan : sauvegardez-le pour le conserver sur le serveur.","panel.persist.additional.title":"Le niveau {level} a déjà un plan","panel.persist.additional.message":"Le niveau {level} contient déjà {plans}. « {name} » y sera ajouté comme plan distinct et deviendra le plan affiché pour ce niveau.","panel.persist.additional.detail":"Rien n'est écrasé : les plans existants restent enregistrés et se rouvrent depuis le sélecteur de niveau ou « Ouvrir ».","panel.persist.closed_during_save":"Plan fermé pendant la sauvegarde.","panel.persist.saved":'💾 Plan "{name}" ({level}) sauvegardé dans Home Assistant !',"panel.persist.save_too_large":"💾 « {name} » n'a pas été sauvegardé : {reason} Réduisez l'image de fond ou le nombre d'éléments.","panel.persist.save_too_many":"💾 « {name} » n'a pas été sauvegardé : nombre maximal de plans atteint ({max}). Supprimez des plans inutilisés depuis « Ouvrir ».","panel.persist.save_refused":"💾 « {name} » n'a pas été sauvegardé : {reason}","panel.persist.save_failed":"💾 « {name} » n'a pas été sauvegardé ({reason}).","panel.persist.unsynced":"💾 Copie locale non synchronisée : « {name} » n'a pas pu être envoyé au serveur ({reason}). Vos modifications sont conservées dans ce navigateur.","panel.persist.save_failed_no_draft":"💾 Échec de la sauvegarde de « {name} » ({reason}) et copie locale impossible : ne fermez pas cette page.","panel.persist.conflict.title":"Conflit de modification","panel.persist.conflict.deleted_title":"Plan supprimé sur le serveur","panel.persist.conflict.deleted_message":"Ce plan n'existe plus sur le serveur : il a été supprimé depuis un autre appareil ou un autre onglet.","panel.persist.conflict.same_id":"Un plan portant le même identifiant existe déjà sur le serveur (révision {revision}).","panel.persist.conflict.modified":"Ce plan a été modifié ailleurs depuis son ouverture (révision {server} sur le serveur, votre version part de la révision {local}).","panel.persist.conflict.detail_reload":"Recharger : affiche la version du serveur ; vos modifications locales sont abandonnées.","panel.persist.conflict.detail_recreate":"Recréer : enregistre votre version sous le même identifiant.","panel.persist.conflict.detail_overwrite":"Écraser : remplace la version du serveur par la vôtre ; les modifications faites ailleurs sont perdues.","panel.persist.conflict.detail_copy":"Enregistrer une copie : crée un nouveau plan avec votre version, sans toucher au serveur.","panel.persist.conflict.copy":"Enregistrer une copie","panel.persist.conflict.recreate":"Recréer","panel.persist.conflict.overwrite":"Écraser","panel.persist.conflict.pending":"⚠️ « {name} » n'est pas sauvegardé : sa version entre en conflit avec celle du serveur. Vos modifications sont conservées dans ce navigateur.","panel.persist.conflict.resolve":"Résoudre…","panel.persist.copy_name":"{name} (copie)","panel.persist.bg_refused.title":"Image de fond refusée","panel.persist.bg_refused.message":"L'image de fond de ce plan ne peut pas être enregistrée sur le serveur. {reason}","panel.persist.bg_refused.detail_remove":"Retirer l'image de fond permet de sauvegarder le reste du plan (murs, pièces, entités, meubles).","panel.persist.bg_refused.detail_reimport":"Vous pourrez ensuite réimporter une image PNG, JPEG, WebP ou un SVG simple.","panel.persist.bg_refused.remove":"Retirer l'image et sauvegarder","panel.persist.bg_refused.not_saved":"💾 « {name} » n'a pas été sauvegardé : son image de fond est refusée par le serveur.","panel.persist.deleted_remote":"🗑️ « {name} » a été supprimé depuis un autre appareil. Il reste ouvert ici comme plan non sauvegardé : sauvegardez-le pour le recréer.","panel.persist.deleted_local":"🗑️ « {name} » a été supprimé du serveur. Il reste ouvert comme plan non sauvegardé : sauvegardez-le pour le recréer, ou ouvrez un autre plan.","panel.persist.deleted_background_lost":"⚠️ L'image de fond du plan supprimé n'a pas pu être conservée.","panel.persist.remote_changed":"⚠️ « {name} » a été modifié sur un autre appareil (révision {revision}). Vos modifications locales entreront en conflit à la sauvegarde.","panel.persist.reload_server":"Recharger la version du serveur","panel.persist.remote_refreshed":'🔄 Plan "{name}" mis à jour depuis un autre appareil.',"panel.persist.confirm_reload.title":"Recharger la version du serveur ?","panel.persist.confirm_reload.message":"Vos modifications non sauvegardées de ce plan seront définitivement perdues.","panel.persist.discard_draft.title":"Supprimer la copie locale ?","panel.persist.discard_draft.message":"Les modifications enregistrées dans ce navigateur pour ce plan seront définitivement perdues.","panel.persist.uploading_background":"Téléversement de l'image de fond…","panel.persist.background_pending":"⚠️ Image de fond non téléversée ({reason}) : elle est gardée dans le plan et sera envoyée au serveur à la prochaine sauvegarde.","panel.persist.upload_failed":"Téléversement de l'image de fond impossible : {reason}"},mc={"panel.common.apply":"Apply","panel.common.cancel":"Cancel","panel.common.close":"Close","panel.common.continue":"Continue","panel.common.delete":"Delete","panel.common.yes":"Yes","panel.common.no":"No","panel.common.pair":"{first} and {second}","panel.common.parenthesized":" ({text})","panel.common.quoted":"“{name}”","panel.common.reload":"Reload","panel.common.retry":"Retry","panel.common.unknown_date":"unknown date","panel.common.unsaved_changes":"Unsaved changes","panel.unit.meters":"{value} m","panel.unit.centimeters":"{value} cm","panel.unit.square_meters":"{value} m²","panel.thickness.partition":"Partition {size}","panel.thickness.wall":"Wall {size}","panel.thickness.load_bearing":"Load-bearing {size}","panel.thickness.exterior":"Exterior {size}","panel.opening_width.narrow":"{size} (Narrow)","panel.opening_width.bedroom":"{size} (Bedroom)","panel.opening_width.standard":"{size} (Standard)","panel.opening_width.window":"{size} (Window)","panel.opening_width.double":"{size} (Double)","panel.opening_width.bay":"{size} (Bay)","panel.opening_width.large_bay":"{size} (Large bay)","panel.ceiling.basement":"{size} (Basement)","panel.ceiling.attic":"{size} (Attic)","panel.ceiling.standard":"{size} (Standard)","panel.ceiling.high":"{size} (High)","panel.ceiling.haussmann":"{size} (Haussmann)","panel.ceiling.cathedral":"{size} (Cathedral)","panel.measure.current":"{size} (current)","panel.count.walls_one":"{count} wall","panel.count.walls_other":"{count} walls","panel.count.doors_one":"{count} door","panel.count.doors_other":"{count} doors","panel.count.windows_one":"{count} window","panel.count.windows_other":"{count} windows","panel.count.rooms_one":"{count} room","panel.count.rooms_other":"{count} rooms","panel.count.openings_one":"{count} opening","panel.count.openings_other":"{count} openings","panel.count.sashes_one":"{count} door or window","panel.count.sashes_other":"{count} doors and windows","panel.count.entities_one":"{count} entity","panel.count.entities_other":"{count} entities","panel.count.furniture_one":"{count} furniture item","panel.count.furniture_other":"{count} furniture items","panel.header.ha_menu":"Home Assistant menu","panel.header.ha_menu_aria":"Open the Home Assistant sidebar","panel.header.brand_title":"Home Architect Studio (click for a secret)","panel.header.about_title":"About Home Architect (version, updates, support)","panel.header.about_aria":"About Home Architect, version {version}","panel.header.update_title":"New version {version} available","panel.header.update_available":"Update available","panel.header.menus":"Studio menus","panel.menu.file.label":"File","panel.menu.file.new":"New plan… (Alt+N)","panel.menu.file.open":"Open / reload a plan…","panel.menu.file.save":"Save plan… (Ctrl+S)","panel.menu.file.save_all":"Save all modified plans ({count})","panel.menu.file.import":"Import a plan…","panel.menu.file.export":"Export to a dashboard…","panel.menu.reset":"Clear plan (reset)…","panel.menu.plan.label":"Plan","panel.menu.plan.rescale":"Rescale (S)","panel.menu.plan.view_3d_active":"3D view (active)","panel.menu.plan.view_2d_3d":"2D / 3D view","panel.menu.plan.wizard":"Room wizard","panel.menu.plan.dimensions":"Live dimensions","panel.menu.plan.heatmap":"Heat map","panel.menu.plan.ghost":"Floor below overlay","panel.menu.plan.fit":"Fit to screen (auto zoom)","panel.menu.plan.rotate":"Rotate view 90° left","panel.menu.plan.orientation":"Orientation (North)...","panel.orientation.title":"Floor Plan Orientation (Geographic North)","panel.orientation.desc":"Set geographic North to align your floor plan with its real-world exposure. In 3D view, real-time solar simulation (sun.sun) and natural shadows cast through windows will adjust automatically.","panel.orientation.angle_label":"North Angle:","panel.orientation.compass_label":"Compass on plan","panel.orientation.show_compass":"Show compass rose on floor plan","panel.orientation.apply":"Apply","panel.orientation.cancel":"Cancel","panel.orientation.drag_tip":"Drag or click on the dial to orient North","panel.orientation.preset_n":"North (0°)","panel.orientation.preset_ne":"North-East (45°)","panel.orientation.preset_e":"East (90°)","panel.orientation.preset_se":"South-East (135°)","panel.orientation.preset_s":"South (180°)","panel.orientation.preset_sw":"South-West (225°)","panel.orientation.preset_w":"West (270°)","panel.orientation.preset_nw":"North-West (315°)","panel.fullscreen.enter":"Full screen","panel.fullscreen.exit":"Exit full screen","panel.fullscreen.enter_title":"Switch to full screen","panel.fullscreen.exit_title":"Exit full screen (Esc)","panel.level.label":"Floor","panel.level.prefix":"Floor:","panel.level.trigger_aria":"Displayed floor and plan: {level}, {name}","panel.level.trigger_aria_dirty":"Displayed floor and plan: {level}, {name} (unsaved changes)","panel.level.name_with_full":"{label} ({full})","panel.level.not_saved":"not saved","panel.level.empty":"empty","panel.level.empty_title":"No plan for this floor: a blank plan will be created","panel.level.other_plans":"Other plans","panel.history.group":"History","panel.history.undo":"Undo","panel.history.redo":"Redo","panel.history.undo_title":"Undo the last action (Ctrl+Z / Cmd+Z)","panel.history.redo_title":"Redo the action (Ctrl+Y / Cmd+Shift+Z)","panel.controls.thickness":"Thickness:","panel.controls.thickness_aria":"Wall thickness","panel.controls.width":"Width:","panel.controls.width_aria":"Opening width","panel.controls.ceiling":"3D ceiling:","panel.controls.ceiling_title":"Default ceiling height (3D)","panel.controls.background":"Background:","panel.controls.background_opacity":"Background plan opacity","panel.controls.scale":"1 m = {value} px","panel.controls.scale_title":"Display scale: pixels per meter","panel.drawer.label":"HA entities","panel.drawer.toggle_title":"Show / hide the entities and furniture panel","panel.drawer.toggle_aria_one":"HA entities: entities and furniture panel ({count} entity placed)","panel.drawer.toggle_aria_other":"HA entities: entities and furniture panel ({count} entities placed)","panel.save.label":"Save","panel.save.saving":"Saving…","panel.save.title":"Save the plan (Ctrl+S / Cmd+S)","panel.save.title_dirty":"Unsaved changes (Ctrl+S / Cmd+S)","panel.hud.region":"Selection","panel.hud.thickness":"Thickness:","panel.hud.thin":"Thin {size}","panel.hud.medium":"Medium {size}","panel.hud.medium_title":"Standard {size}","panel.hud.thick":"Thick {size}","panel.hud.door":"Door:","panel.hud.door_right_in":"Right, in","panel.hud.door_right_in_title":"Right-hand, opens inward (push, right)","panel.hud.door_left_in":"Left, in","panel.hud.door_left_in_title":"Left-hand, opens inward (push, left)","panel.hud.door_left_out":"Left, out","panel.hud.door_left_out_title":"Left-hand, opens outward (pull, left)","panel.hud.door_right_out":"Right, out","panel.hud.door_right_out_title":"Right-hand, opens outward (pull, right)","panel.hud.window":"Window:","panel.hud.window_single":"1 sash","panel.hud.window_single_title":"Single-sash window ({size})","panel.hud.window_double":"2 sashes","panel.hud.window_double_title":"Double-sash window ({size})","panel.hud.window_bay":"Patio door","panel.hud.window_bay_title":"Sliding patio door ({size})","panel.hud.opening_width":"Width:","panel.hud.opening_width_title":"Adjust opening width","panel.hud.furniture":"Furniture:","panel.hud.room":"Room:","panel.hud.edit_room":"Rename / Edit","panel.hud.edit_room_title":"Edit room name, color, or ceiling height","panel.hud.rotate":"Rotate 90° (R)","panel.hud.rotate_title":"Rotate the furniture by 90° (R key)","panel.hud.color":"Color","panel.hud.color_title":"Furniture color (plan, export and card)","panel.hud.color_reset":"Restore the default color","panel.hud.icon_picker":"Choose icon","panel.hud.icon_picker_title":"Choose the icon for the plan and the dashboard card","panel.hud.icon_categories":"Icon categories","panel.hud.icon_active":"Active icon:","panel.hud.icon_default":"Default","panel.hud.icon_automatic":"Automatic","panel.hud.icon_free":"Custom:","panel.hud.icon_free_placeholder":"Emoji","panel.hud.delete_title":"Delete the selected items (Delete / Backspace key)","panel.hud.clear_selection":"Deselect all (Esc)","panel.icons.light.title":"Lighting & fixtures","panel.icons.light.tab":"Lighting","panel.icons.light.bulb":"Standard bulb","panel.icons.light.living_lamp":"Living room lamp","panel.icons.light.recessed_spot":"Recessed spotlight","panel.icons.light.ceiling_light":"Ceiling light","panel.icons.light.outdoor_lantern":"Outdoor lantern","panel.icons.light.candle":"Candle / ambience","panel.icons.light.spotlight":"Spotlight","panel.icons.light.led_strip":"RGB LED strip","panel.icons.light.string_lights":"String lights","panel.icons.light.wall_sconce":"Wall sconce","panel.icons.switch.title":"Plugs & switches","panel.icons.switch.tab":"Plugs","panel.icons.switch.smart_plug":"Smart plug","panel.icons.switch.wall_switch":"Wall switch","panel.icons.switch.tv":"Television","panel.icons.switch.appliance":"Coffee maker / appliance","panel.icons.switch.computer":"PC / desk","panel.icons.switch.speaker":"Speaker / hi-fi","panel.icons.switch.printer":"Printer","panel.icons.switch.console":"Game console","panel.icons.switch.charger":"Battery charger","panel.icons.switch.fan":"Portable fan","panel.icons.binary_sensor.title":"Sensors, security & openings","panel.icons.binary_sensor.tab":"Sensors","panel.icons.binary_sensor.pir_motion":"PIR motion","panel.icons.binary_sensor.quick_pass":"Walk-by","panel.icons.binary_sensor.presence_radar":"Presence radar","panel.icons.binary_sensor.door_sensor":"Door sensor","panel.icons.binary_sensor.window_sensor":"Window sensor","panel.icons.binary_sensor.garage_door":"Garage door","panel.icons.binary_sensor.siren":"Siren / alarm","panel.icons.binary_sensor.doorbell":"Doorbell / chime","panel.icons.binary_sensor.pet":"Pet presence","panel.icons.binary_sensor.water_leak":"Water leak","panel.icons.binary_sensor.smoke":"Smoke detector","panel.icons.binary_sensor.mailbox":"Mailbox","panel.icons.climate.title":"Thermostats & air conditioning","panel.icons.climate.tab":"Climate","panel.icons.climate.thermostat":"Main thermostat","panel.icons.climate.air_conditioner":"Air conditioner (cooling)","panel.icons.climate.radiator":"Radiator (heating)","panel.icons.climate.heat_pump":"Heat pump / hot water","panel.icons.climate.ventilation":"Ventilation / air exchange","panel.icons.sensor.title":"Sensors & probes","panel.icons.sensor.tab":"Probes","panel.icons.sensor.temperature":"Temperature probe","panel.icons.sensor.humidity":"Humidity","panel.icons.sensor.illuminance":"Illuminance (lux)","panel.icons.sensor.air_quality":"Air quality (CO2/VOC)","panel.icons.sensor.power":"Power consumption","panel.icons.sensor.battery":"Battery level","panel.icons.sensor.noise":"Noise / decibels","panel.icons.sensor.pressure":"Barometric pressure","panel.icons.cover.title":"Shutters, blinds & motorized covers","panel.icons.cover.tab":"Covers","panel.icons.cover.roller_shutter":"Roller shutter","panel.icons.cover.venetian_blind":"Venetian blind","panel.icons.cover.garage_door":"Motorized garage door","panel.icons.cover.awning":"Patio awning","panel.icons.cover.sliding_door":"Motorized sliding door","panel.icons.media_player.title":"Media & speakers","panel.icons.media_player.tab":"Media","panel.icons.media_player.tv":"TV","panel.icons.media_player.smart_speaker":"Smart speaker","panel.icons.media_player.multiroom":"Multi-room audio","panel.icons.media_player.av_receiver":"Home cinema receiver","panel.icons.media_player.projector":"Projector","panel.icons.media_player.console":"Video game console","panel.icons.camera.title":"Cameras & video surveillance","panel.icons.camera.tab":"Cameras","panel.icons.camera.indoor":"Fixed indoor camera","panel.icons.camera.ptz_dome":"Outdoor PTZ dome camera","panel.icons.camera.monitored_zone":"Monitored zone","panel.icons.camera.video_doorbell":"Video doorbell / intercom","panel.icons.fan.title":"Ventilation & air circulation","panel.icons.fan.tab":"Fans","panel.icons.fan.standing_fan":"Tower / pedestal fan","panel.icons.fan.extraction":"Extractor fan","panel.icons.fan.ceiling_fan":"Ceiling fan","panel.icons.vacuum.title":"Robot vacuums & cleaning","panel.icons.vacuum.tab":"Robots","panel.icons.vacuum.robot_vacuum":"Robot vacuum","panel.icons.vacuum.floor_washer":"Floor-washing robot","panel.icons.lock.title":"Locks & access control","panel.icons.lock.tab":"Locks","panel.icons.lock.smart_lock":"Smart lock","panel.icons.lock.intrusion_alarm":"Intrusion alarm","panel.icons.lock.electric_strike":"Electric strike","panel.toast.doors_updated_one":"🚪 {count} door updated","panel.toast.doors_updated_other":"🚪 {count} doors updated","panel.toast.windows_adjusted_one":"{count} narrowed to fit the wall","panel.toast.windows_adjusted_other":"{count} narrowed to fit the wall","panel.toast.windows_refused_one":"{count} unchanged: wall too short or adjacent opening","panel.toast.windows_refused_other":"{count} unchanged: wall too short or adjacent opening","panel.toast.windows_updated_one":"🪟 {count} window updated{notes}","panel.toast.windows_updated_other":"🪟 {count} windows updated{notes}","panel.toast.window_format_refused":"⚠️ Format not applied: {notes}.","panel.toast.walls_thickness_one":"🧱 Thickness of {count} wall updated ({size})","panel.toast.walls_thickness_other":"🧱 Thickness of {count} walls updated ({size})","panel.toast.door_direction":"🚪 Door opening direction updated","panel.toast.wall_thickness":"🧱 Wall thickness updated ({size})","panel.toast.wizard_invalid":"❌ Invalid room dimensions: check the width, length and height.","panel.toast.room_created":"✨ Room “{name}” created ({area})","panel.toast.room_created_too_small":"✨ Room “{name}” created ({area}): the room is too small to fit the door or window.","panel.toast.image_unreadable":"❌ Unreadable image.","panel.toast.pasted_image_unreadable":"❌ The pasted image is unreadable.","panel.toast.pasted_url_loaded":"📋 Image loaded from the pasted URL! Draw a segment along a measured wall to calibrate the scale (📏).","panel.toast.image_url_unsupported":"❌ Unsupported image address: use an http(s) URL or import the file.","panel.toast.image_load_error":"❌ Error while loading the image.","panel.toast.import_scaled":"✅ Plan imported and scaled! You can now draw your walls (🧱).","panel.toast.import_calibrate":"📏 Plan imported! Draw a segment along a measured wall to calibrate the scale.","panel.toast.import_empty":"ℹ️ No walls or rooms to import.","panel.toast.svg_converted":"✨ SVG plan converted: {walls}, {doors}, {windows} and {rooms} imported.","panel.toast.svg_converted_added":"✨ SVG plan converted: {walls}, {doors}, {windows} and {rooms} added next to the plan.","panel.toast.svg_layer_kept_existing":"The SVG's background layer was not used: the plan already has a background image.","panel.toast.svg_layer_not_imported":"Background layer not imported.","panel.toast.calibration_refused":"❌ Calibration rejected: scale factor out of range (×{min} to ×{max}).","panel.toast.no_background_to_calibrate":"ℹ️ No background layer to calibrate.","panel.toast.background_calibrated":"📏 Background layer calibrated ({factor}): the existing drawing is unchanged.","panel.toast.rescale_refused":"❌ Rescaling rejected: factor out of range (×{min} to ×{max}).","panel.toast.scaled":"✅ {label} ({factor}): {walls} and {rooms} recalculated; thicknesses, openings and furniture keep their dimensions.","panel.toast.scale_conflicts_one":"⚠️ {count} opening to check (wall too short or overlap).","panel.toast.scale_conflicts_other":"⚠️ {count} openings to check (wall too short or overlap).","panel.toast.default_ceiling":"📐 Default 3D ceiling height: {height}","panel.toast.ceiling_inherited":"📐 {items} now follow the default height.","panel.toast.room_updated":"✨ Room “{name}” updated (H: {height})!","panel.toast.room_deleted":"🗑️ Room deleted","panel.toast.undone":"↩️ Action undone","panel.toast.redone":"↪️ Action redone","panel.toast.furniture_rotated":"🔄 Furniture rotated by 90°","panel.toast.elements_deleted_one":"🗑️ {count} item deleted!","panel.toast.elements_deleted_other":"🗑️ {count} items deleted!","panel.toast.icon_applied":"✨ Icon {icon} applied!","panel.toast.tap_to_place":"📍 Tap the plan to place “{name}” (Esc to cancel).","panel.toast.fullscreen_on":"⛶ Full screen on (Esc to exit)","panel.toast.fullscreen_off":"🗗 Exited full screen","panel.toast.plan_reset":"🗑️ Plan cleared (reset). Undo with Ctrl+Z if needed.","panel.scale.calibrated":"Plan calibrated","panel.scale.rescaled":"Plan rescaled","panel.ceiling.ask.title":"Apply the new height?","panel.ceiling.ask.message":"{items} have a height of {previous}, the former default value. Should they follow the new default height ({next})?","panel.ceiling.ask.detail":"Rooms and walls whose height was set to another value are not changed.","panel.ceiling.ask.keep":"Keep their height","panel.import.new_plan_name":"Imported plan","panel.import.ask.title":"The plan already contains elements","panel.import.ask.message":"The SVG brings {walls}, {openings} and {rooms}. The current plan contains {current_walls} and {current_rooms}. What would you like to do?","panel.import.ask.detail_replace":"Replace: the current walls, openings and rooms are replaced; entities, furniture and the background image are kept (the image is replaced if the SVG provides its own layer).","panel.import.ask.detail_add":"Add alongside: the imported drawing is placed to the right of the current plan, without deleting anything.","panel.import.ask.detail_new":"New plan: the drawing opens in a separate new plan for {level}; the current plan is left unchanged.","panel.import.ask.detail_undo":"In every case, Undo (Ctrl+Z) remains available.","panel.import.ask.new":"New plan","panel.import.ask.add":"Add alongside","panel.import.ask.replace":"Replace","panel.wizard.default_room_name":"Room","panel.new_plan.title":"New plan","panel.new_plan.subtitle":"Create a blank drawing sheet","panel.new_plan.name":"Plan name:","panel.new_plan.name_placeholder":"E.g. My apartment, Ground floor…","panel.new_plan.category":"Category / floor:","panel.new_plan.create":"Create plan","panel.new_plan.default_name":"{level} plan","panel.new_plan.fallback_name":"New plan","panel.reset.title":"Clear the plan","panel.reset.subtitle":"Workspace reset","panel.reset.confirm_before":"Are you sure you want to ","panel.reset.confirm_strong":"erase all content","panel.reset.confirm_after":" of the current plan ","panel.reset.confirm_end":"?","panel.reset.walls":"Walls:","panel.reset.openings":"Doors and windows:","panel.reset.rooms":"Rooms:","panel.reset.entities":"HA entities:","panel.reset.furniture":"Furniture:","panel.reset.background":"Background image:","panel.reset.undo_hint":"ℹ️ This action can be reverted with the Undo button (Ctrl+Z).","panel.reset.confirm":"Erase everything","panel.drafts.title":"Unsaved local copies","panel.drafts.subtitle":"Changes kept in this browser that are not on the server","panel.drafts.meta":"{level} · saved on {date}","panel.drafts.open":"Open","panel.drafts.open_title":"Open the local copy in the studio","panel.drafts.send":"Send to server","panel.drafts.send_title":"Send the local copy to the server","panel.drafts.discard_title":"Permanently delete the local copy of “{name}”","panel.drafts.hint":"ℹ️ If you edit one of these plans without opening its local copy, the copy will be replaced by your new changes.","panel.drafts.later":"Decide later","panel.drafts.status.unsaved":"Plan never saved","panel.drafts.status.newer":"Newer than the server version","panel.drafts.status.outdated":"Based on an older server version (possible conflict)","panel.drafts.status.deleted":"The plan no longer exists on the server","panel.update.title":"Home Architect update","panel.update.subtitle":"New version available","panel.update.installed":"Installed version","panel.update.latest":"New version","panel.update.notes":"Release notes","panel.update.notes_empty":"See the release page for details on what is new.","panel.update.how_to":"💡 Install the update in 1 click below or from Home Assistant Settings › Updates.","panel.update.dirty_warning_one":"⚠️ {count} plan has unsaved changes. Save before leaving the studio: otherwise they will only be kept as a local copy in this browser.","panel.update.dirty_warning_other":"⚠️ {count} plans have unsaved changes. Save before leaving the studio: otherwise they will only be kept as a local copy in this browser.","panel.update.view_release":"View release","panel.update.open_updates":"HA Settings","panel.update.install_button":"⚡ Update to v{version}","panel.update.installing":"Installing update…","panel.update.installing_hint":"Downloading GitHub release and updating files… Please wait.","panel.update.success_title":"Update installed successfully!","panel.update.success_message":"Version v{version} has been installed.","panel.update.success_hint":"Restart Home Assistant to apply changes, then reload your page.","panel.update.restart_ha":"Restart Home Assistant","panel.update.restarting":"Restarting Home Assistant…","panel.update.retry":"Retry update","panel.update.error_title":"Update failed","panel.about.subtitle":"Interactive floor plans for Home Assistant","panel.about.studio_version":"Studio version","panel.about.loaded_bundles":"Loaded in this page: {bundles}","panel.about.bundle_version":"{bundle} {version}","panel.about.bundle.card":"card","panel.about.bundle.panel":"studio","panel.about.updates_by_admin":"ℹ️ Updates are installed by an administrator from Settings › Updates.","panel.about.updates_unknown":"ℹ️ Update status is currently unavailable.","panel.about.update_available":"🚀 New version v{version} available.","panel.about.show_update":"View update","panel.about.up_to_date":"✅ Home Architect is up to date.","panel.about.reload_required":"🔁 A new version (v{version}) is installed: reload the page to use it.","panel.about.release_notes":"Release notes","panel.about.documentation":"Documentation and support","panel.about.support_hint":"Home Architect is developed on a volunteer basis. If you find the project useful:","panel.about.ha_updates":"Home Assistant updates","panel.support.label":"☕ Support the project","panel.support.aria":"Support the project on Buy Me A Coffee (opens in a new tab)","panel.notice.dismiss":"Dismiss","panel.notice.reload_required":"🔁 New version installed (v{version}): reload the page to use it. Loaded versions: {bundles}.","panel.loading.plans":"Loading plans…","panel.loading.error_title":"Unable to load the plans","panel.loading.error_hint":"Saving is disabled until the plans are loaded from the server.","panel.error.connection_lost":"connection to Home Assistant lost","panel.error.not_ready":"Home Architect is not loaded on the server","panel.error.save_failed":"write failure on the server","panel.error.unknown_command":"the Home Architect integration must be restarted after its update","panel.background.invalid_svg":"Invalid SVG file.","panel.background.unreadable":"Unreadable background image: {reason}","panel.background.rejected":"Background image rejected by the server: {reason}","panel.persist.read_only_toast":"🔒 Read-only: only administrators can edit plans.","panel.persist.read_only":"🔒 Read-only: only Home Assistant administrators can edit and save plans.","panel.persist.read_only_denied":"🔒 Read-only: the server refused to save (administrators only). Your unsaved changes are kept in this browser.","panel.persist.loading_plan":"Loading plan…","panel.persist.draft_reason.unreachable":"server unreachable: {reason}","panel.persist.draft_reason.unsaved":"plan never saved to the server","panel.persist.draft_reason.deleted":"plan deleted from the server","panel.persist.draft_opened_reason":"📂 Local copy of “{name}” opened ({reason}): save it to send it to the server.","panel.persist.open_failed":"Unable to open the plan: {reason}","panel.persist.reload_failed":"Unable to reload the plan: {reason}","panel.persist.plan_missing":"❌ This plan no longer exists on the server.","panel.persist.draft_opened":"📂 Local copy opened: save it to send it to the server.","panel.persist.plan_loaded":"📂 Plan “{name}” loaded successfully!","panel.persist.draft_choice.title":"Unsaved local copy","panel.persist.draft_choice.message":"This browser holds changes to this plan that were not sent to the server (copy from {date}). {status}.","panel.persist.draft_choice.detail_draft":"Local copy: restores your changes; then save the plan to send them to the server.","panel.persist.draft_choice.detail_server":"Server version: the local copy is kept, but it will be replaced as soon as you edit this plan.","panel.persist.draft_choice.server":"Server version","panel.persist.draft_choice.draft":"Local copy","panel.persist.no_plan_for_level":"No plan saved for {level}.","panel.persist.level_blank":"Floor selected: {name} (blank plan)","panel.persist.plan_created":"📄 New plan “{name}” created: remember to save it.","panel.persist.backup_imported":"📥 “{name}” imported as a new plan: save it to keep it on the server.","panel.persist.additional.title":"{level} already has a plan","panel.persist.additional.message":"{level} already contains {plans}. “{name}” will be added as a separate plan and become the plan displayed for this floor.","panel.persist.additional.detail":"Nothing is overwritten: existing plans stay saved and can be reopened from the floor selector or “Open”.","panel.persist.closed_during_save":"Plan closed during the save.","panel.persist.saved":"💾 Plan “{name}” ({level}) saved to Home Assistant!","panel.persist.save_too_large":"💾 “{name}” was not saved: {reason} Reduce the background image or the number of elements.","panel.persist.save_too_many":"💾 “{name}” was not saved: maximum number of plans reached ({max}). Delete unused plans from “Open”.","panel.persist.save_refused":"💾 “{name}” was not saved: {reason}","panel.persist.save_failed":"💾 “{name}” was not saved ({reason}).","panel.persist.unsynced":"💾 Local copy not synced: “{name}” could not be sent to the server ({reason}). Your changes are kept in this browser.","panel.persist.save_failed_no_draft":"💾 Saving “{name}” failed ({reason}) and no local copy could be made: do not close this page.","panel.persist.conflict.title":"Edit conflict","panel.persist.conflict.deleted_title":"Plan deleted on the server","panel.persist.conflict.deleted_message":"This plan no longer exists on the server: it was deleted from another device or tab.","panel.persist.conflict.same_id":"A plan with the same ID already exists on the server (revision {revision}).","panel.persist.conflict.modified":"This plan was changed elsewhere since you opened it (revision {server} on the server; your version is based on revision {local}).","panel.persist.conflict.detail_reload":"Reload: shows the server version; your local changes are discarded.","panel.persist.conflict.detail_recreate":"Recreate: saves your version under the same ID.","panel.persist.conflict.detail_overwrite":"Overwrite: replaces the server version with yours; changes made elsewhere are lost.","panel.persist.conflict.detail_copy":"Save a copy: creates a new plan with your version, without touching the server one.","panel.persist.conflict.copy":"Save a copy","panel.persist.conflict.recreate":"Recreate","panel.persist.conflict.overwrite":"Overwrite","panel.persist.conflict.pending":"⚠️ “{name}” is not saved: its version conflicts with the server one. Your changes are kept in this browser.","panel.persist.conflict.resolve":"Resolve…","panel.persist.copy_name":"{name} (copy)","panel.persist.bg_refused.title":"Background image rejected","panel.persist.bg_refused.message":"This plan's background image cannot be saved on the server. {reason}","panel.persist.bg_refused.detail_remove":"Removing the background image lets you save the rest of the plan (walls, rooms, entities, furniture).","panel.persist.bg_refused.detail_reimport":"You can then re-import a PNG, JPEG or WebP image, or a simple SVG.","panel.persist.bg_refused.remove":"Remove the image and save","panel.persist.bg_refused.not_saved":"💾 “{name}” was not saved: its background image is rejected by the server.","panel.persist.deleted_remote":"🗑️ “{name}” was deleted from another device. It stays open here as an unsaved plan: save it to recreate it.","panel.persist.deleted_local":"🗑️ “{name}” was deleted from the server. It stays open as an unsaved plan: save it to recreate it, or open another plan.","panel.persist.deleted_background_lost":"⚠️ The deleted plan's background image could not be kept.","panel.persist.remote_changed":"⚠️ “{name}” was changed on another device (revision {revision}). Your local changes will conflict when you save.","panel.persist.reload_server":"Reload the server version","panel.persist.remote_refreshed":"🔄 Plan “{name}” updated from another device.","panel.persist.confirm_reload.title":"Reload the server version?","panel.persist.confirm_reload.message":"Your unsaved changes to this plan will be permanently lost.","panel.persist.discard_draft.title":"Delete the local copy?","panel.persist.discard_draft.message":"The changes stored in this browser for this plan will be permanently lost.","panel.persist.uploading_background":"Uploading the background image…","panel.persist.background_pending":"⚠️ Background image not uploaded ({reason}): it is kept in the plan and will be sent to the server on the next save.","panel.persist.upload_failed":"Unable to upload the background image: {reason}"};et("fr",hc);et("en",mc);var gc=Object.defineProperty,wt=(r,e,t,i)=>{for(var a=void 0,n=r.length-1,s;n>=0;n--)(s=r[n])&&(a=s(e,t,a)||a);return a&&gc(e,t,a),a};const fc=[{id:"n",angle:0,icon:"⬆️"},{id:"ne",angle:45,icon:"↗️"},{id:"e",angle:90,icon:"➡️"},{id:"se",angle:135,icon:"↘️"},{id:"s",angle:180,icon:"⬇️"},{id:"sw",angle:225,icon:"↙️"},{id:"w",angle:270,icon:"⬅️"},{id:"nw",angle:315,icon:"↖️"}],Pa=class Pa extends De{constructor(){super(...arguments),this.northAngle=0,this.showCompass=!0,this.currentAngle=0,this.currentShowCompass=!0,this.isDragging=!1,this.focusCtrl=new va(this),this.localizeCtrl=new Ee(this)}willUpdate(e){e.has("northAngle")&&(this.currentAngle=(Math.round(this.northAngle)%360+360)%360),e.has("showCompass")&&(this.currentShowCompass=this.showCompass),e.has("hass")&&Ke(this,this.hass?.themes?.darkMode)}firstUpdated(){this.renderRoot.querySelector(".btn-primary")?.focus()}close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}apply(){const e={northAngle:this.currentAngle,showCompass:this.currentShowCompass};this.dispatchEvent(new CustomEvent("orientation-applied",{detail:e,bubbles:!0,composed:!0})),this.close()}handleKeydown(e){e.stopPropagation(),e.key==="Escape"?(e.preventDefault(),this.close()):e.key==="Tab"&&this.focusCtrl.trapTab(e)}updateAngleFromPointer(e){const t=this.shadowRoot?.querySelector(".compass-dial");if(!t)return;const i=t.getBoundingClientRect(),a=i.left+i.width/2,n=i.top+i.height/2,s=e.clientX-a,l=e.clientY-n,c=Math.atan2(s,-l),d=Math.round((c*180/Math.PI+360)%360);this.currentAngle=d}handleDialPointerDown(e){const t=Ge(e);t instanceof Element&&t.setPointerCapture?.(e.pointerId),this.isDragging=!0,this.updateAngleFromPointer(e)}handleDialPointerMove(e){this.isDragging&&this.updateAngleFromPointer(e)}handleDialPointerUp(e){if(!this.isDragging)return;this.isDragging=!1;const t=Ge(e);if(t instanceof Element)try{t.releasePointerCapture?.(e.pointerId)}catch{}}setPreset(e){this.currentAngle=(Math.round(e)%360+360)%360}handleSliderInput(e){const t=Number(e.target.value);Number.isFinite(t)&&(this.currentAngle=(Math.round(t)%360+360)%360)}handleNumberInput(e){const t=Number(e.target.value);Number.isFinite(t)&&(this.currentAngle=(Math.round(t)%360+360)%360)}render(){const e=this.currentAngle,t=$o(e);return u`
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="orient-title" @keydown=${this.handleKeydown} tabindex="-1">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-icon" aria-hidden="true">🧭</span>
            <h2 class="modal-title" id="orient-title">${o("panel.orientation.title")}</h2>
          </div>
          <button
            type="button"
            class="btn-close"
            aria-label=${o("geometry.close")}
            title=${o("geometry.close")}
            @click=${this.close}
          ><span aria-hidden="true">✕</span></button>
        </div>

        <div class="modal-body">
          <div class="compass-dial-container">
            <div
              class="compass-dial"
              @pointerdown=${this.handleDialPointerDown}
              @pointermove=${this.handleDialPointerMove}
              @pointerup=${this.handleDialPointerUp}
              @pointercancel=${this.handleDialPointerUp}
              title=${o("panel.orientation.drag_tip")}
            >
              <svg viewBox="0 0 200 200" class="compass-dial-svg" aria-hidden="true">
                <!-- Cercle extérieur et graduations -->
                <circle cx="100" cy="100" r="94" fill="var(--arch-surface-card)" stroke="var(--arch-border)" stroke-width="2.5" />
                <circle cx="100" cy="100" r="88" fill="none" stroke="var(--arch-border-subtle, rgba(255,255,255,0.08))" stroke-width="1" />
                <circle cx="100" cy="100" r="76" fill="var(--arch-hud-bg)" stroke="none" />

                <!-- Graduations tous les 15° et points cardinaux -->
                ${Array.from({length:24}).map((i,a)=>{const n=a*15,s=n%45===0,l=n%90===0;return je`
                    <line
                      x1="100"
                      y1="${88-(l?10:s?7:4)}"
                      x2="100"
                      y2="88"
                      stroke="${l?"var(--arch-surface-text)":"var(--arch-border)"}"
                      stroke-width="${l?2:1}"
                      transform="rotate(${n} 100 100)"
                    />
                  `})}

                <!-- Repères cardinaux fixes du cadran -->
                <text x="100" y="24" text-anchor="middle" font-size="12" font-weight="800" fill="#ef4444">N</text>
                <text x="178" y="104" text-anchor="middle" font-size="11" font-weight="700" fill="var(--arch-surface-text)">E</text>
                <text x="100" y="184" text-anchor="middle" font-size="11" font-weight="700" fill="var(--arch-surface-text)">S</text>
                <text x="22" y="104" text-anchor="middle" font-size="11" font-weight="700" fill="var(--arch-surface-text)">O</text>

                <!-- Aiguille tournante pointant vers currentAngle -->
                <g transform="rotate(${e} 100 100)">
                  <!-- Pointe Nord (Rouge vif) -->
                  <polygon points="100,32 91,100 100,92" fill="#ef4444" />
                  <polygon points="100,32 109,100 100,92" fill="#dc2626" />
                  <!-- Lettrage N sur la pointe Nord -->
                  <circle cx="100" cy="46" r="6" fill="#ef4444" />
                  <text x="100" y="50" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">N</text>

                  <!-- Pointe Sud (Gris / Argenté) -->
                  <polygon points="100,168 91,100 100,108" fill="#94a3b8" />
                  <polygon points="100,168 109,100 100,108" fill="#64748b" />

                  <!-- Pivot central chromé -->
                  <circle cx="100" cy="100" r="9" fill="var(--arch-surface-card)" stroke="var(--arch-border)" stroke-width="2" />
                  <circle cx="100" cy="100" r="4" fill="var(--arch-primary)" />
                </g>
              </svg>
            </div>

            <div class="compass-readout">
              <span>${e}°</span>
              <span class="compass-readout-cardinal">${t}</span>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="orient-slider">${o("panel.orientation.angle_label")}</label>
            <div class="slider-row">
              <input
                id="orient-slider"
                type="range"
                min="0"
                max="359"
                step="1"
                class="slider-input"
                .value=${String(e)}
                @input=${this.handleSliderInput}
                aria-label=${o("panel.orientation.angle_label")}
              />
              <input
                type="number"
                min="0"
                max="359"
                class="degree-input"
                .value=${String(e)}
                @input=${this.handleNumberInput}
                aria-label="Angle en degrés"
              />
            </div>
          </div>

          <div class="presets-grid">
            ${fc.map(i=>{const a=Math.abs(e-i.angle)<2;return u`
                <button
                  type="button"
                  class="preset-btn ${a?"active":""}"
                  @click=${()=>this.setPreset(i.angle)}
                >
                  <span class="preset-icon" aria-hidden="true">${i.icon}</span>
                  <span>${o(`panel.orientation.preset_${i.id}`)}</span>
                </button>
              `})}
          </div>

          <div class="options-row">
            <label class="check-row">
              <input
                type="checkbox"
                .checked=${this.currentShowCompass}
                @change=${i=>{this.currentShowCompass=i.target.checked}}
              />
              <span>${o("panel.orientation.show_compass")}</span>
            </label>
          </div>

          <div class="info-callout">
            <span class="info-callout-icon" aria-hidden="true">☀️</span>
            <div>${o("panel.orientation.desc")}</div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-modal btn-cancel" @click=${this.close}>
            ${o("panel.orientation.cancel")}
          </button>
          <button type="button" class="btn-modal btn-primary" @click=${this.apply}>
            ${o("panel.orientation.apply")}
          </button>
        </div>
      </div>
    `}};Pa.styles=[ze,xa,he`
      .modal-card {
        width: 500px;
        max-width: calc(100vw - 32px);
      }

      .compass-dial-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 8px 0 16px;
        user-select: none;
      }

      .compass-dial {
        position: relative;
        width: 190px;
        height: 190px;
        cursor: grab;
        touch-action: none;
      }

      .compass-dial:active {
        cursor: grabbing;
      }

      .compass-dial-svg {
        width: 100%;
        height: 100%;
        filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.25));
      }

      .compass-readout {
        margin-top: 10px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 18px;
        font-weight: 700;
        color: var(--arch-surface-text);
      }

      .compass-readout-cardinal {
        font-size: 14px;
        font-weight: 600;
        color: var(--arch-primary);
        background: var(--arch-primary-faint, rgba(59, 130, 246, 0.12));
        padding: 2px 8px;
        border-radius: 6px;
      }

      .presets-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 6px;
        margin-top: 10px;
      }

      .preset-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        padding: 6px 4px;
        border-radius: 8px;
        border: 1px solid var(--arch-border);
        background: var(--arch-surface-card);
        color: var(--arch-surface-text);
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .preset-btn:hover {
        background: var(--arch-surface-hover);
        border-color: var(--arch-primary);
      }

      .preset-btn.active {
        background: var(--arch-primary);
        color: #ffffff;
        border-color: var(--arch-primary);
        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
      }

      .preset-icon {
        font-size: 14px;
      }

      .slider-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 12px;
      }

      .slider-input {
        flex: 1;
        accent-color: var(--arch-primary);
        cursor: pointer;
      }

      .degree-input {
        width: 72px;
        text-align: right;
        padding: 6px 10px;
        border-radius: 8px;
        border: 1px solid var(--arch-border);
        background: var(--arch-input-bg);
        color: var(--arch-surface-text);
        font-size: 14px;
        font-weight: 600;
      }

      .info-callout {
        display: flex;
        gap: 10px;
        background: var(--arch-surface-card);
        border: 1px solid var(--arch-border);
        border-radius: 10px;
        padding: 10px 14px;
        font-size: 12px;
        line-height: 1.45;
        color: var(--arch-text-muted);
        margin-top: 14px;
      }

      .info-callout-icon {
        font-size: 18px;
        flex-shrink: 0;
      }

      .options-row {
        margin-top: 14px;
      }
    `];let Ve=Pa;wt([L({type:Number})],Ve.prototype,"northAngle");wt([L({type:Boolean})],Ve.prototype,"showCompass");wt([L({type:Object})],Ve.prototype,"hass");wt([k()],Ve.prototype,"currentAngle");wt([k()],Ve.prototype,"currentShowCompass");wt([k()],Ve.prototype,"isDragging");Ae("home-architect-orientation-modal",Ve);const bc=1500,vc=["id","name","category","revision","publish","created_at","updated_at","schema_version","exportFrame","grid","showDimensions","showThermalHeatmap","showGhostLevel","ghostLevelId"];function on(r,e){const t={...r},i=e;for(const a of vc)i[a]===void 0?delete t[a]:t[a]=i[a];return t}class xc{constructor(){this.stacks=new Map}stacksFor(e){let t=this.stacks.get(e);return t||(t={undo:[],redo:[],coalesceKey:null,coalescedAt:0},this.stacks.set(e,t)),t}record(e,t){const i=this.stacksFor(e.id),a=Date.now();if(t&&i.coalesceKey===t&&a-i.coalescedAt<bc){i.coalescedAt=a;return}i.undo=[...i.undo.slice(-39),e],i.redo=[],i.coalesceKey=t??null,i.coalescedAt=a}canUndo(e){return(this.stacks.get(e)?.undo.length??0)>0}canRedo(e){return(this.stacks.get(e)?.redo.length??0)>0}undo(e){const t=this.stacks.get(e.id);if(!t||t.undo.length===0)return null;const i=t.undo[t.undo.length-1];return t.undo=t.undo.slice(0,-1),t.redo=[...t.redo.slice(-39),e],t.coalesceKey=null,on(i,e)}redo(e){const t=this.stacks.get(e.id);if(!t||t.redo.length===0)return null;const i=t.redo[t.redo.length-1];return t.redo=t.redo.slice(0,-1),t.undo=[...t.undo.slice(-39),e],t.coalesceKey=null,on(i,e)}rewrite(e,t){const i=this.stacks.get(e);i&&(i.undo=i.undo.map(t),i.redo=i.redo.map(t))}clear(e){this.stacks.delete(e)}}function si(r){return r.walls.length===0&&r.openings.length===0&&r.rooms.length===0&&r.bindings.length===0&&(r.furniture?.length??0)===0&&!r.background}function sn(r){const e=r?Date.parse(r):NaN;return Number.isFinite(e)?e:0}class yc{constructor(e,t){this.onChange=t,this.history=new xc,this.projects=new Map,this.dirty=new Set,this._summaries=[],this.lastByCategory=new Map,this.projects.set(e.id,e),this._activeId=e.id}get activeId(){return this._activeId}get active(){return this.projects.get(this._activeId)}get summaries(){return this._summaries}get(e){return this.projects.get(e)}has(e){return this.projects.has(e)}isDirty(e){return this.dirty.has(e)}hasDirty(){return this.dirty.size>0}dirtyIds(){return[...this.dirty]}reset(e){for(const t of this.projects.keys())this.history.clear(t);this.projects.clear(),this.dirty.clear(),this.lastByCategory.clear(),this.projects.set(e.id,e),this.setActive(e.id),this.onChange()}open(e,t={}){this.projects.set(e.id,e),this.history.clear(e.id),t.dirty?this.dirty.add(e.id):this.dirty.delete(e.id),this.onChange()}close(e){if(!(e===this._activeId||!this.projects.has(e))){this.projects.delete(e),this.dirty.delete(e),this.history.clear(e);for(const[t,i]of this.lastByCategory)i===e&&this.lastByCategory.delete(t);this.onChange()}}activate(e){this.projects.has(e)&&(this.setActive(e),this.onChange())}setActive(e){this._activeId=e;const t=this.projects.get(e)?.category;t&&this.lastByCategory.set(t,e)}commit(e,t){const i=this.projects.get(e.id);!i||i===e||(this.history.record(i,t),this.projects.set(e.id,e),this.dirty.add(e.id),this.onChange())}replace(e){this.projects.has(e.id)&&(this.projects.set(e.id,e),e.id===this._activeId&&e.category&&this.lastByCategory.set(e.category,e.id),this.onChange())}markDirty(e){!this.projects.has(e)||this.dirty.has(e)||(this.dirty.add(e),this.onChange())}markClean(e){this.dirty.delete(e)&&this.onChange()}canUndo(){return this.history.canUndo(this._activeId)}canRedo(){return this.history.canRedo(this._activeId)}undo(){return this.restore(this.history.undo(this.active))}redo(){return this.restore(this.history.redo(this.active))}restore(e){return e?(this.projects.set(e.id,e),this.dirty.add(e.id),this.onChange(),e):null}setSummaries(e){this._summaries=[...e],this.onChange()}upsertSummary(e){const t=this._summaries.find(a=>a.id===e.id),i={id:e.id,name:e.name,category:e.category,created_at:e.created_at,updated_at:e.updated_at,revision:e.revision??0,has_background:!!e.background,publish:e.publish??null,counts:{walls:e.walls.length,rooms:e.rooms.length,bindings:e.bindings.length,furniture:e.furniture?.length??0}};this._summaries=t?this._summaries.map(a=>a.id===e.id?i:a):[...this._summaries,i],this.onChange()}removeSummary(e){const t=this._summaries.filter(i=>i.id!==e);t.length!==this._summaries.length&&(this._summaries=t,this.onChange())}summary(e){return this._summaries.find(t=>t.id===e)}entries(){const e=new Map;for(const t of this._summaries)e.set(t.id,{id:t.id,name:t.name,category:t.category,open:!1,dirty:!1,stored:!0,updatedAt:t.updated_at??""});for(const t of this.projects.values())e.set(t.id,{id:t.id,name:t.name,category:t.category,open:!0,dirty:this.dirty.has(t.id),stored:t.revision!==void 0,updatedAt:t.updated_at});return[...e.values()]}plansForCategory(e){return this.entries().filter(t=>t.category===e).sort((t,i)=>sn(i.updatedAt)-sn(t.updatedAt)||t.name.localeCompare(i.name))}customPlans(){return this.entries().filter(e=>!Nt(e.category)).sort((e,t)=>e.name.localeCompare(t.name))}projectIdForLevel(e){const t=this.lastByCategory.get(e);if(t&&this.projects.get(t)?.category===e)return t;const i=this.plansForCategory(e);return(i.find(a=>a.open)??i[0])?.id??null}}const ka="image/svg+xml";class ct extends Error{constructor(e){super(e),this.name="BackgroundRejectedError"}}function Kn(r){return r instanceof Error?r.message:String(r)}function Ut(r){return typeof r=="string"&&/^data:/i.test(r)}function wc(r){const e=new DOMParser().parseFromString(r,ka),t=e.documentElement;if(!t||t.localName!=="svg"||e.getElementsByTagName("parsererror").length>0)throw new Error(o("panel.background.invalid_svg"));return new XMLSerializer().serializeToString(t)}async function Xn(r){return new Blob([wc(await r.text())],{type:ka})}async function _c(r){try{if(r.type===ka)return{blob:await Xn(r)};const e=await Sn(r);return{blob:e.blob,width:e.width,height:e.height}}catch(e){throw new ct(o("panel.background.unreadable",{reason:Kn(e)}))}}async function Zn(r,e,t){try{const i=await Co(r,e,t);return{assetId:i.assetId,mimeType:i.mimeType}}catch(i){throw i instanceof ba?new ct(i.message):i instanceof Le&&(i.code==="invalid_image"||i.code==="unsupported_media_type")?new ct(o("panel.background.rejected",{reason:i.message})):i}}async function kc(r,e){const t=e.background;if(!t||!Ut(t.imageUrl))return null;let i;try{i=ui(t.imageUrl)}catch(s){throw new ct(o("panel.background.unreadable",{reason:Kn(s)}))}const a=await _c(i),n=await Zn(r,e.id,a.blob);return{...t,imageUrl:"",assetId:n.assetId,mimeType:n.mimeType}}class $c{constructor(e){this.onChange=e,this.heldAssetId=null,this.failedAssetId=null,this.token=0}sync(e,t){const i=t?.background,a=i?.assetId??null;if(!a||!t){this.dropHeld(),this.failedAssetId=null,this.setSrc(i?.imageUrl||void 0);return}if(a===this.heldAssetId||a===this.failedAssetId||!e)return;this.dropHeld(),this.failedAssetId=null,this.setSrc(void 0),this.heldAssetId=a;const n=this.token;So(e,t.id,a).then(s=>{n===this.token&&this.setSrc(s)},s=>{n===this.token&&(this.heldAssetId=null,this.failedAssetId=a,console.warn(`[home-architect] Image de fond ${a} indisponible :`,s),this.setSrc(void 0))})}objectUrlFor(e){return this.heldAssetId===e?this.src:void 0}release(){this.dropHeld(),this.failedAssetId=null,this.setSrc(void 0)}dropHeld(){this.heldAssetId&&(this.token++,Mo(this.heldAssetId),this.heldAssetId=null)}setSrc(e){e!==this.src&&(this.src=e,this.onChange())}}function Jn(r){return o(`panel.drafts.status.${r}`)}function ha(r,e){if(!e)return{draft:r,status:r.baseRevision===null?"unsaved":"deleted",serverRevision:null};const t={draft:r,status:r.baseRevision===e.revision?"newer":"outdated",serverRevision:e.revision};return e.publish&&(t.serverPublish=e.publish),t}function Sc(r,e){return r.map(t=>ha(t,e.find(i=>i.id===t.projectId)??null))}function Mc(r){const e={...r.draft.project};return delete e.publish,r.serverPublish&&(e.publish=r.serverPublish),r.draft.baseRevision===null?delete e.revision:e.revision=r.draft.baseRevision,e}const Qn="https://github.com/SocrateMobile/home-architect/releases",Cc="/config/updates",Tc=/^https:\/\/github\.com\/SocrateMobile\/home-architect(?:[/?#][^\s"'<>]*)?$/i,Ic=/^v?(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?)$/;function ln(r){const e=r?Ic.exec(r.trim()):null;return e?e[1]:null}function eo(){return Object.entries(Do()).map(([r,e])=>o("panel.about.bundle_version",{bundle:r==="card"||r==="panel"?o(`panel.about.bundle.${r}`):r,version:e})).join(", ")}async function Dc(r){let e;try{e=await To(r)}catch(a){if(a instanceof ii)return null;throw a}const t=ln(e.latest_version),i=e.release_url&&Tc.test(e.release_url)?e.release_url:Qn;return{available:e.update_available&&t!==null,installedVersion:ln(e.installed_version)??e.installed_version,latestVersion:t,releaseUrl:i,releaseNotes:e.release_notes.trim(),entityId:e.update_entity_id,reloadRequired:Io(e.installed_version)}}function cn(r,e){const t=e?r?.states?.[e]:void 0;if(!t)return null;const i=t.attributes??{};return[t.state,i.installed_version,i.latest_version,i.skipped_version,i.in_progress].map(String).join("|")}function Ec(r){history.pushState(null,"",r),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}const ei=new Map;function zc(r){const e=Ye();if(!ei.has(e))try{ei.set(e,new Intl.PluralRules(e))}catch{ei.set(e,null)}const t=ei.get(e);return t?t.select(r)==="one"?"one":"other":r===1||e==="fr"&&r===0?"one":"other"}function Y(r,e,t={}){return o(`${r}_${zc(e)}`,{...t,count:R(e)})}function to(r,e){return R(r,{minimumFractionDigits:e,maximumFractionDigits:e})}function ft(r,e=2){return o("panel.unit.meters",{value:to(r,e)})}function Re(r){return o("panel.unit.centimeters",{value:R(Math.round(r*100))})}function ht(r){return r<1?Re(r):ft(r)}function Ac(r){return o("panel.unit.square_meters",{value:R(r,{maximumFractionDigits:2})})}function dn(r){return`×${to(r,3)}`}function io(r){const e=Date.parse(r);if(!Number.isFinite(e))return o("panel.common.unknown_date");try{return new Date(e).toLocaleString(Ye()==="fr"?"fr-FR":"en-US",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return new Date(e).toISOString()}}const Pc="https://github.com/SocrateMobile/home-architect",Rc="https://www.buymeacoffee.com/Socrate";function un(r){return typeof r=="function"?r():r}function $i(r){const e=o("panel.common.close");return u`<button class="btn-dialog-close" title=${e} aria-label=${e} @click=${r}><span aria-hidden="true">✕</span></button>`}function ao(){return u`
    <a class="support-link" href=${Rc} target="_blank" rel="noopener noreferrer"
      aria-label=${o("panel.support.aria")}>${o("panel.support.label")}</a>
  `}function Si(r){return e=>{e.target===e.currentTarget&&r()}}function Oc(r,e){const t=r.tone??"default",i=r.cancelLabel===void 0?o("panel.common.cancel"):r.cancelLabel,a=i?null:(r.actions.find(n=>n.kind!=="danger")??r.actions[0])?.id;return u`
    <div class="modal-backdrop choice-backdrop" @click=${Si(()=>e(null))}>
      <div class="modal-dialog ${t}" data-modal tabindex="-1" role="alertdialog" aria-modal="true"
        aria-labelledby="choice-title" aria-describedby="choice-message">
        <div class="modal-dialog-header ${t}">
          <div class="modal-dialog-title-group">
            <span class="modal-dialog-icon" aria-hidden="true">${r.icon}</span>
            <div>
              <h3 class="modal-dialog-title" id="choice-title">${r.title}</h3>
              ${r.subtitle?u`<p class="modal-dialog-subtitle">${r.subtitle}</p>`:w}
            </div>
          </div>
          ${$i(()=>e(null))}
        </div>
        <div class="modal-dialog-body">
          <p class="choice-message" id="choice-message">${r.message}</p>
          ${r.details?.length?u`
            <ul class="choice-details">${r.details.map(n=>u`<li>${n}</li>`)}</ul>
          `:w}
        </div>
        <div class="modal-dialog-footer wrap">
          ${i?u`
            <button class="btn-dialog-cancel" data-initial-focus @click=${()=>e(null)}>${i}</button>
          `:w}
          ${r.actions.map(n=>u`
            <button class="btn-dialog-confirm ${n.kind??"primary"}" ?data-initial-focus=${n.id===a}
              @click=${()=>e(n.id)}>
              ${n.icon?u`<span aria-hidden="true">${n.icon}</span>`:w}
              <span>${n.label}</span>
            </button>
          `)}
        </div>
      </div>
    </div>
  `}function jc(r,e){return u`
    <div class="modal-backdrop" @click=${Si(e.onClose)}>
      <div class="modal-dialog warning wide" data-modal tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="drafts-title">
        <div class="modal-dialog-header warning">
          <div class="modal-dialog-title-group">
            <span class="modal-dialog-icon" aria-hidden="true">🗂️</span>
            <div>
              <h3 class="modal-dialog-title" id="drafts-title">${o("panel.drafts.title")}</h3>
              <p class="modal-dialog-subtitle">${o("panel.drafts.subtitle")}</p>
            </div>
          </div>
          ${$i(e.onClose)}
        </div>
        <div class="modal-dialog-body">
          <ul class="draft-list">
            ${r.map(t=>{const i=t.draft.project,a=o("panel.drafts.discard_title",{name:i.name});return u`
                <li class="draft-item status-${t.status}">
                  <div class="draft-info">
                    <strong>${i.name}</strong>
                    <span class="draft-meta">${o("panel.drafts.meta",{level:pe(i.category),date:io(t.draft.savedAt)})}</span>
                    <span class="draft-status">${Jn(t.status)}</span>
                  </div>
                  <div class="draft-actions">
                    <button class="btn-dialog-confirm secondary" title=${o("panel.drafts.open_title")} @click=${()=>e.onOpen(t)}>
                      <span aria-hidden="true">📂</span> ${o("panel.drafts.open")}
                    </button>
                    <button class="btn-dialog-confirm primary" title=${o("panel.drafts.send_title")} @click=${()=>e.onSend(t)}>
                      <span aria-hidden="true">☁️</span> ${o("panel.drafts.send")}
                    </button>
                    <button class="btn-dialog-confirm danger" title=${a} aria-label=${a} @click=${()=>e.onDiscard(t)}>
                      <span aria-hidden="true">🗑️</span>
                    </button>
                  </div>
                </li>
              `})}
          </ul>
          <p class="dialog-hint">${o("panel.drafts.hint")}</p>
        </div>
        <div class="modal-dialog-footer">
          <button class="btn-dialog-cancel" @click=${e.onClose}>${o("panel.drafts.later")}</button>
        </div>
      </div>
    </div>
  `}function Lc(r,e,t,i={}){const{canManageUpdates:a=!0,installStatus:n="idle",installError:s=null}=i,l=n==="installing",c=n==="success",d=n==="error";let p,h;return l?(p=u`
      <div class="update-progress-box" role="status" aria-live="polite">
        <span class="spinner" aria-hidden="true"></span>
        <h4>${o("panel.update.installing")}</h4>
        <p class="dialog-hint">${o("panel.update.installing_hint")}</p>
      </div>
    `,h=u`
      <button class="btn-dialog-cancel" disabled>${o("panel.common.close")}</button>
    `):c?(p=u`
      <div class="update-success-box" role="status">
        <span class="update-success-icon" aria-hidden="true">✅</span>
        <h4>${o("panel.update.success_title")}</h4>
        <p class="update-success-msg">${o("panel.update.success_message",{version:r.latestVersion??""})}</p>
        <p class="dialog-hint">${o("panel.update.success_hint")}</p>
      </div>
    `,h=u`
      <button class="btn-dialog-cancel" @click=${t.onClose}>${o("panel.common.close")}</button>
      ${t.onRestartHa?u`
        <button class="btn-dialog-confirm primary" data-initial-focus @click=${t.onRestartHa}>
          <span aria-hidden="true">🔄</span>
          <span>${o("panel.update.restart_ha")}</span>
        </button>
      `:w}
    `):d?(p=u`
      <div class="update-error-box" role="alert">
        <span class="update-error-icon" aria-hidden="true">⚠️</span>
        <h4>${o("panel.update.error_title")}</h4>
        <p class="dialog-warning">${s||o("panel.update.error_title")}</p>
        <p class="dialog-hint">${o("panel.update.how_to")}</p>
      </div>
    `,h=u`
      <button class="btn-dialog-cancel" @click=${t.onClose}>${o("panel.common.close")}</button>
      <button class="btn-dialog-confirm secondary" @click=${t.onOpenUpdates}>
        <span aria-hidden="true">⚙️</span>
        <span>${o("panel.update.open_updates")}</span>
      </button>
      ${t.onInstallUpdate&&a?u`
        <button class="btn-dialog-confirm primary" data-initial-focus @click=${t.onInstallUpdate}>
          <span aria-hidden="true">⚡</span>
          <span>${o("panel.update.retry")}</span>
        </button>
      `:w}
    `):(p=u`
      <div class="version-compare">
        <div>
          <div class="version-label">${o("panel.update.installed")}</div>
          <div class="version-value">v${r.installedVersion||jt}</div>
        </div>
        <div class="version-arrow" aria-hidden="true">➔</div>
        <div>
          <div class="version-label new">${o("panel.update.latest")}</div>
          <div class="version-value new">v${r.latestVersion}</div>
        </div>
      </div>
      <div>
        <div class="update-notes-title"><span aria-hidden="true">📋</span> ${o("panel.update.notes")}</div>
        <div class="update-notes">${r.releaseNotes||o("panel.update.notes_empty")}</div>
      </div>
      <p class="dialog-hint">${o("panel.update.how_to")}</p>
      ${e>0?u`
        <p class="dialog-warning">${Y("panel.update.dirty_warning",e)}</p>
      `:w}
    `,h=u`
      <button class="btn-dialog-cancel" @click=${t.onClose}>${o("panel.common.close")}</button>
      <button class="btn-dialog-confirm secondary" @click=${t.onOpenUpdates}>
        <span aria-hidden="true">⚙️</span>
        <span>${o("panel.update.open_updates")}</span>
      </button>
      ${t.onInstallUpdate&&a?u`
        <button class="btn-dialog-confirm primary" data-initial-focus @click=${t.onInstallUpdate}>
          <span aria-hidden="true">⚡</span>
          <span>${o("panel.update.install_button",{version:r.latestVersion??""})}</span>
        </button>
      `:w}
    `),u`
    <div class="modal-backdrop" @click=${l?void 0:Si(t.onClose)}>
      <div class="modal-dialog update" data-modal tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="update-title">
        <div class="modal-dialog-header update">
          <div class="modal-dialog-title-group">
            <span class="modal-dialog-icon update-icon" aria-hidden="true">🚀</span>
            <div>
              <h3 class="modal-dialog-title" id="update-title">${o("panel.update.title")}</h3>
              <p class="modal-dialog-subtitle">${o("panel.update.subtitle")}</p>
            </div>
          </div>
          ${l?w:$i(t.onClose)}
        </div>
        <div class="modal-dialog-body">
          ${p}
        </div>
        <div class="modal-dialog-footer spread">
          <div class="footer-links">
            <a class="release-link" href=${r.releaseUrl} target="_blank" rel="noopener noreferrer">
              <span aria-hidden="true">🔗</span> ${o("panel.update.view_release")}
            </a>
            ${ao()}
          </div>
          <div class="footer-buttons">
            ${h}
          </div>
        </div>
      </div>
    </div>
  `}function Fc(r){const{info:e}=r;return r.canManageUpdates?e?u`
    ${e.available?u`
      <div class="about-status update" role="status">
        <span>${o("panel.about.update_available",{version:e.latestVersion??""})}</span>
        <button class="btn-dialog-confirm primary" @click=${r.onShowUpdate}>${o("panel.about.show_update")}</button>
      </div>
    `:u`<div class="about-status" role="status">${o("panel.about.up_to_date")}</div>`}
    ${e.reloadRequired?u`
      <p class="dialog-warning">${o("panel.about.reload_required",{version:e.installedVersion})}</p>
    `:w}
  `:u`<p class="dialog-hint">${o("panel.about.updates_unknown")}</p>`:u`<p class="dialog-hint">${o("panel.about.updates_by_admin")}</p>`}function Nc(r){const e=r.info?.releaseUrl??Qn,t=r.info?eo():"";return u`
    <div class="modal-backdrop" @click=${Si(r.onClose)}>
      <div class="modal-dialog" data-modal tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="about-title">
        <div class="modal-dialog-header">
          <div class="modal-dialog-title-group">
            <span class="modal-dialog-icon" aria-hidden="true">📐</span>
            <div>
              <h3 class="modal-dialog-title" id="about-title">Home Architect Studio</h3>
              <p class="modal-dialog-subtitle">${o("panel.about.subtitle")}</p>
            </div>
          </div>
          ${$i(r.onClose)}
        </div>
        <div class="modal-dialog-body">
          <div class="about-version">
            <span class="version-label">${o("panel.about.studio_version")}</span>
            <span class="version-value">v${jt}</span>
            ${t?u`<span class="dialog-hint">${o("panel.about.loaded_bundles",{bundles:t})}</span>`:w}
          </div>
          ${Fc(r)}
          <div class="about-links">
            <a class="release-link" href=${e} target="_blank" rel="noopener noreferrer">
              <span aria-hidden="true">🔗</span> ${o("panel.about.release_notes")}
            </a>
            <a class="release-link" href=${Pc} target="_blank" rel="noopener noreferrer">
              <span aria-hidden="true">📘</span> ${o("panel.about.documentation")}
            </a>
          </div>
          <div class="about-support">
            <span class="dialog-hint">${o("panel.about.support_hint")}</span>
            ${ao()}
          </div>
        </div>
        <div class="modal-dialog-footer spread">
          ${r.canManageUpdates?u`
            <button class="btn-dialog-confirm secondary" @click=${r.onOpenUpdates}>
              <span aria-hidden="true">⚙️</span> ${o("panel.about.ha_updates")}
            </button>
          `:u`<span></span>`}
          <button class="btn-dialog-cancel" data-initial-focus @click=${r.onClose}>${o("panel.common.close")}</button>
        </div>
      </div>
    </div>
  `}function pn(r){return u`
    <div class="loading-overlay" role="status" aria-live="polite">
      <div class="loading-box">
        <span class="spinner" aria-hidden="true"></span>
        <span>${r}</span>
      </div>
    </div>
  `}function Bc(r,e){return u`
    <div class="loading-overlay" role="alert">
      <div class="loading-box error">
        <strong><span aria-hidden="true">⚠️</span> ${o("panel.loading.error_title")}</strong>
        <span>${r}</span>
        <span class="dialog-hint">${o("panel.loading.error_hint")}</span>
        <button class="btn-dialog-confirm primary" @click=${e}>
          <span aria-hidden="true">🔄</span> ${o("panel.common.retry")}
        </button>
      </div>
    </div>
  `}function Uc(r,e){if(r.length===0)return w;const t=o("panel.notice.dismiss");return u`
    <div class="notice-stack">
      ${r.map(i=>u`
        <div class="notice ${i.kind}" role=${i.kind==="error"?"alert":"status"}>
          <span class="notice-message">${un(i.message)}</span>
          ${i.actions?.map(a=>u`<button class="notice-action" @click=${a.run}>${un(a.label)}</button>`)}
          ${i.dismissible===!1?w:u`
            <button class="notice-close" title=${t} aria-label=${t} @click=${()=>e(i.key)}>
              <span aria-hidden="true">✕</span>
            </button>
          `}
        </div>
      `)}
    </div>
  `}const Hc=2e3,qc=3e4,Wc=new Set(["connection_lost","not_connected","network_error","not_ready","save_failed","unknown_error","http_error"]);function li(r){return r instanceof Error?r.message:String(r)}function ot(r){if(r instanceof Le)switch(r.code){case"connection_lost":case"not_connected":case"network_error":return o("panel.error.connection_lost");case"not_ready":return o("panel.error.not_ready");case"save_failed":return o("panel.error.save_failed");case"unknown_command":return o("panel.error.unknown_command")}return li(r)}function mt(r){return o("panel.common.quoted",{name:r})}const Gc=new Set(["publish","revision","updated_at"]);function Vc(r,e){if(r===e)return!0;const t=r,i=e,a=new Set([...Object.keys(t),...Object.keys(i)]);for(const n of a)if(!Gc.has(n)&&t[n]!==i[n])return!1;return!0}function hn(r){const e=Date.parse(r.updated_at??"");return Number.isFinite(e)?e:0}class Yc{constructor(e,t){this.host=e,this.ui=t,this.loadStateValue="idle",this.loadFailure=null,this.busyMessage=null,this.savingIds=new Set,this.permissionDenied=!1,this.notices=[],this.choiceDialog=null,this.choiceResolve=null,this.draftReviews=null,this.draftTimers=new Map,this.placeholderIds=new Set,this.pendingRemoteEvents=new Map,this.unsubscribeProject=null,this.subscribedProjectId=null,this.subscriptionToken=0,this.ghostCache=new Map,this.ghostLoading=new Set,this.ghostFailedAt=new Map,this.readOnlyToastAt=0,this.onBeforeUnload=i=>{this.ws.hasDirty()&&(this.flushDrafts(),i.preventDefault(),i.returnValue="")},this.onVisibilityChange=()=>{document.visibilityState==="hidden"&&this.flushDrafts()},this.ws=new yc(Wt({category:xe}),()=>e.requestUpdate()),this.background=new $c(()=>e.requestUpdate()),e.addController(this)}hostConnected(){window.addEventListener("beforeunload",this.onBeforeUnload),document.addEventListener("visibilitychange",this.onVisibilityChange),this.ready&&this.syncActiveResources()}hostDisconnected(){this.flushDrafts(),this.unsubscribeActive(),this.background.release(),window.removeEventListener("beforeunload",this.onBeforeUnload),document.removeEventListener("visibilitychange",this.onVisibilityChange)}hostUpdate(){this.host.isConnected&&this.background.sync(this.host.hass,this.ws.active)}get project(){return this.ws.active}get ready(){return this.loadStateValue==="ready"}get readOnly(){return!xt(this.host.hass)||this.permissionDenied}isSaving(e){return this.savingIds.has(e)}isBlocking(){return!this.ready||this.busyMessage!==null||this.choiceDialog!==null||this.draftReviews!==null}handleBlockingKey(e){return this.isBlocking()?(e.key==="Escape"&&(this.choiceDialog?this.resolveChoice(null):this.draftReviews&&this.setDraftReviews(null)),!0):!1}setLoadState(e,t=null){this.loadStateValue=e,this.loadFailure=t,this.host.requestUpdate()}setDraftReviews(e){this.draftReviews=e&&e.length>0?e:null,this.host.requestUpdate()}setSaving(e,t){t?this.savingIds.add(e):this.savingIds.delete(e),this.host.requestUpdate()}commit(e,t={}){if(!this.ready)return!1;if(this.readOnly)return this.notifyReadOnly(),!1;const i=this.ws.active;return e===i||e.id!==i.id?!1:(this.ws.commit(e,t.coalesceKey),this.placeholderIds.delete(e.id),this.scheduleDraft(e.id),!0)}undo(){return this.restore(()=>this.ws.undo())}redo(){return this.restore(()=>this.ws.redo())}restore(e){if(!this.ready)return null;if(this.readOnly)return this.notifyReadOnly(),null;const t=e();return t&&this.scheduleDraft(t.id),t}notifyReadOnly(){const e=Date.now();e-this.readOnlyToastAt<4e3||(this.readOnlyToastAt=e,this.ui.toast(o("panel.persist.read_only_toast")))}setExportFrame(e){if(!e||this.readOnly||!this.ready)return;const{minX:t,minY:i,maxX:a,maxY:n}=e;if(![t,i,a,n].every(Number.isFinite)||a<=t||n<=i)return;const s=this.ws.active,l=s.exportFrame;l&&l.minX===t&&l.minY===i&&l.maxX===a&&l.maxY===n||(this.ws.replace({...s,exportFrame:{minX:t,minY:i,maxX:a,maxY:n}}),this.ws.markDirty(s.id),this.placeholderIds.delete(s.id),this.scheduleDraft(s.id))}setPreferences(e){if(!this.ready)return!1;const t=this.ws.active,i=t,a=Object.entries(e).filter(([s,l])=>l!==void 0&&i[s]!==l);if(a.length===0)return!1;const n={...t,...Object.fromEntries(a)};return this.ws.replace(n),this.readOnly||(this.ws.markDirty(t.id),this.placeholderIds.delete(t.id),this.scheduleDraft(t.id)),!0}setPublish(e){const t=Eo(e);if(!t)return;const i={...this.ws.active,publish:t};this.ws.replace(i),i.revision!==void 0&&this.ws.upsertSummary(i)}clearPublish(e){const t=this.ws.get(e);if(!t?.publish)return;const i={...t};delete i.publish,this.ws.replace(i),i.revision!==void 0&&this.ws.upsertSummary(i)}start(){this.loadStateValue==="idle"&&this.loadInitial()}async loadInitial(){const e=this.host.hass;if(!(!e||this.loadStateValue==="loading")){this.setLoadState("loading");try{await this.migrateLegacyLocalProjects();const t=await aa(e),i=this.pickInitialProjectId(t),a=i?await kt(e,i):null,n=a?this.adoptLoaded(a):Wt({category:xe});this.ws.setSummaries(t),this.ws.reset(n),this.placeholderIds.clear(),a||this.placeholderIds.add(n.id),this.ghostCache.clear(),this.ghostFailedAt.clear(),this.setLoadState("ready"),this.ui.activeProjectChanged(),this.syncActiveResources(),this.reviewLocalDrafts()}catch(t){this.setLoadState("error",t)}}}pickInitialProjectId(e){const t=[...e].sort((i,a)=>hn(a)-hn(i));return(t.find(i=>i.category===xe)??t[0])?.id??null}async migrateLegacyLocalProjects(){for(const{key:e,project:t}of zo())(await Qr(t.id)||await Jr(t,null))&&Ao(e)}adoptLoaded(e){return Po(e,this.host.hass?.states)}async refreshSummaries(){if(this.ready)try{this.ws.setSummaries(await aa(this.host.hass))}catch(e){console.debug("[home-architect] Liste des plans indisponible :",e)}}async openPlan(e,t={}){if(!this.ready)return;const i=this.ws.get(e);if(i){this.activateProject(e),t.reload&&i.revision!==void 0&&await this.reloadFromServer(e);return}let a=null,n=null;try{a=await this.withBusy(o("panel.persist.loading_plan"),()=>kt(this.host.hass,e))}catch(l){n=l}const s=this.readOnly?null:await Qr(e);if(this.ws.has(e)){this.activateProject(e);return}if(!a){if(n===null&&this.ws.removeSummary(e),s){const l=ha(s,n===null?null:this.ws.summary(e)??null);let c;n!==null?c=o("panel.persist.draft_reason.unreachable",{reason:ot(n)}):l.status==="unsaved"?c=o("panel.persist.draft_reason.unsaved"):c=o("panel.persist.draft_reason.deleted"),this.openDraft(l),this.ui.toast(o("panel.persist.draft_opened_reason",{name:s.project.name,reason:c}))}else if(n!==null){const l=ot(n);this.showError(()=>o("panel.persist.open_failed",{reason:l}))}else this.ui.toast(o("panel.persist.plan_missing"));return}if(s){const l=ha(s,{revision:a.revision??0,publish:a.publish}),c=await this.askDraftOrServer(l);if(c===null)return;if(this.ws.has(e)){this.activateProject(e);return}if(c==="draft"){this.openDraft(l),this.ui.toast(o("panel.persist.draft_opened"));return}}this.ws.open(this.adoptLoaded(a)),this.ws.upsertSummary(a),this.activateProject(e),this.ui.toast(o("panel.persist.plan_loaded",{name:a.name}))}async askDraftOrServer(e){const{draft:t}=e,i=await this.ask({icon:"🗂️",title:o("panel.persist.draft_choice.title"),subtitle:mt(t.project.name),message:o("panel.persist.draft_choice.message",{date:io(t.savedAt),status:Jn(e.status)}),details:[o("panel.persist.draft_choice.detail_draft"),o("panel.persist.draft_choice.detail_server")],actions:[{id:"server",label:o("panel.persist.draft_choice.server"),icon:"☁️",kind:"secondary"},{id:"draft",label:o("panel.persist.draft_choice.draft"),icon:"📂",kind:"primary"}],tone:"warning"});return i==="draft"||i==="server"?i:null}async switchToLevel(e){if(!this.ready||this.ws.active.category===e)return;const t=this.ws.projectIdForLevel(e);if(t){await this.openPlan(t);return}if(this.readOnly){this.ui.toast(o("panel.persist.no_plan_for_level",{level:pe(e)}));return}const i=Wt({category:e});this.ws.open(i),this.placeholderIds.add(i.id),this.activateProject(i.id),this.ui.toast(o("panel.persist.level_blank",{name:i.name}))}async createPlan(e,t,i={}){if(this.readOnly||!this.ready||!i.confirmed&&!await this.confirmAdditionalPlan(t,e))return!1;const a=Wt({name:e,category:t});return this.ws.open(a),this.activateProject(a.id),this.ui.toast(o("panel.persist.plan_created",{name:a.name})),!0}async importProject(e){if(this.readOnly)return this.notifyReadOnly(),!1;if(!this.ready)return!1;const t=new Date().toISOString(),i={...vi(e),id:ta(),created_at:t,updated_at:t};return delete i.revision,delete i.publish,i.category&&!await this.confirmAdditionalPlan(i.category,i.name)?!1:(this.ws.open(i,{dirty:!0}),this.activateProject(i.id),this.scheduleDraft(i.id),Ut(i.background?.imageUrl)&&await this.uploadInlineBackgroundNow(i.id),this.ui.toast(o("panel.persist.backup_imported",{name:i.name})),!0)}async confirmAdditionalPlan(e,t,i){if(!Nt(e))return!0;const a=this.ws.plansForCategory(e).filter(l=>l.id!==i&&!(this.placeholderIds.has(l.id)&&!l.dirty));if(a.length===0)return!0;const n=pe(e);return await this.ask({icon:"🏢",title:o("panel.persist.additional.title",{level:n}),message:o("panel.persist.additional.message",{level:n,plans:a.map(l=>mt(l.name)).join(", "),name:t}),details:[o("panel.persist.additional.detail")],actions:[{id:"confirm",label:o("panel.common.continue"),icon:"✨",kind:"primary"}],tone:"warning"})==="confirm"}activateProject(e){const t=this.ws.active;t.id!==e&&(this.ws.activate(e),this.placeholderIds.has(t.id)&&!this.ws.isDirty(t.id)&&si(t)&&this.discardProject(t.id)),this.ui.activeProjectChanged(),this.syncActiveResources();const i=this.ws.active,a=this.ws.summary(e);a&&i.revision!==void 0&&a.revision>i.revision&&this.handleRemoteEvent({project_id:e,revision:a.revision})}syncActiveResources(){this.background.sync(this.host.hass,this.ws.active),this.subscribeActive()}async reloadFromServer(e){let t;try{t=await this.withBusy(o("panel.persist.loading_plan"),()=>kt(this.host.hass,e))}catch(i){const a=ot(i);return this.showError(()=>o("panel.persist.reload_failed",{reason:a})),!1}return t?(this.adoptServerVersion(t),!0):(this.projectDeleted(e,{remote:!0}),!1)}adoptServerVersion(e){const t=e.id;this.ws.open(this.adoptLoaded(e)),this.ws.upsertSummary(e),this.cancelDraft(t),Rt(t),this.clearProjectNotices(t),this.placeholderIds.delete(t),t===this.ws.activeId&&(this.ui.activeProjectChanged(),this.subscribeActive())}discardProject(e){e!==this.ws.activeId&&(this.ws.close(e),this.cancelDraft(e),Rt(e),this.clearProjectNotices(e),this.placeholderIds.delete(e),this.pendingRemoteEvents.delete(e))}ghostProject(e){const t=e?this.ws.projectIdForLevel(e):null;return t?this.ws.get(t)??this.ghostCache.get(t)?.project??null:null}prefetchGhost(e){const t=e?this.ws.projectIdForLevel(e):null;if(!t||this.ws.has(t)||this.ghostLoading.has(t)||!this.host.hass||!this.ready)return;const i=this.ws.summary(t)?.revision??0;if(this.ghostCache.get(t)?.revision===i)return;const a=this.ghostFailedAt.get(t);a!==void 0&&Date.now()-a<qc||(this.ghostLoading.add(t),kt(this.host.hass,t).then(n=>{if(this.ghostFailedAt.delete(t),n){this.ghostCache.set(t,{revision:i,project:n});return}this.ghostCache.delete(t),this.ws.removeSummary(t)},n=>{this.ghostFailedAt.set(t,Date.now()),console.warn(`[home-architect] Filigrane ${t} indisponible :`,n)}).finally(()=>{this.ghostLoading.delete(t),this.host.requestUpdate()}))}async saveAllDirty(){for(const e of this.ws.dirtyIds())if(!await this.save(e))return}async saveFromDialog(e){if(this.readOnly){this.notifyReadOnly();return}if(!this.ready)return;const t=this.ws.active,i=(e?.name??"").trim()||t.name,a=(e?.category??"").trim()||t.category||xe;if(e?.saveAs){if(!await this.confirmAdditionalPlan(a,i))return;await this.saveAsCopy(t.id,i,a);return}if(a!==t.category&&!await this.confirmAdditionalPlan(a,i,t.id))return;const n=this.ws.get(t.id);n&&((i!==n.name||a!==n.category)&&(this.ws.replace({...n,name:i,category:a}),this.ws.markDirty(n.id),this.scheduleDraft(n.id)),await this.save(n.id))}async saveAsCopy(e,t,i){const a=this.ws.get(e);if(!a)return!1;const n=new Date().toISOString(),s={...Ro(a),id:ta(),name:t,category:i,created_at:n,updated_at:n};return delete s.revision,delete s.publish,s.category===void 0&&delete s.category,this.ws.open(s,{dirty:!0}),this.ws.activeId===e&&this.activateProject(s.id),this.discardProject(e),this.save(s.id)}async save(e,t={}){if(this.readOnly)return this.notifyReadOnly(),!1;if(!this.ready||this.savingIds.has(e)||!this.ws.has(e))return!1;this.setSaving(e,!0);let i=null;try{const n=await this.uploadPendingBackground(e),s=await Oo(this.host.hass,n,{expectedRevision:n.revision,force:t.force});this.applySaveResult(n,s)}catch(n){i=n}finally{this.setSaving(e,!1)}const a=this.pendingRemoteEvents.get(e);return a&&(this.pendingRemoteEvents.delete(e),this.handleRemoteEvent(a)),i===null?!0:this.handleSaveError(e,i)}async uploadPendingBackground(e){const t=this.ws.get(e);if(!t)throw new Le("not_found",o("panel.persist.closed_during_save"));const i=t.background?.imageUrl;if(!Ut(i))return t;const a=await kc(this.host.hass,t);if(!a)return t;const n=c=>c.background&&c.background.imageUrl===i?{...c,background:{...c.background,imageUrl:"",assetId:a.assetId,mimeType:a.mimeType}}:c;this.ws.history.rewrite(e,n);const s=this.ws.get(e);if(!s)throw new Le("not_found",o("panel.persist.closed_during_save"));const l=n(s);return l!==s&&this.ws.replace(l),l}applySaveResult(e,t){const i=e.id,a=this.ws.get(i);if(!a)return;let n={...a,revision:t.revision,updated_at:t.updated_at};const s=e.background,l=t.assetId;if(l&&s&&s.assetId!==l){const c=d=>d.background&&d.background.assetId===s.assetId&&d.background.imageUrl===s.imageUrl?{...d,background:{...d.background,assetId:l,imageUrl:""}}:d;n=c(n),this.ws.history.rewrite(i,c)}this.ws.replace(n),this.ws.upsertSummary(n),this.clearProjectNotices(i),this.placeholderIds.delete(i),Vc(a,e)&&(this.ws.markClean(i),this.cancelDraft(i),Rt(i)),i===this.ws.activeId&&this.subscribeActive(),this.ui.toast(o("panel.persist.saved",{name:n.name,level:pe(n.category)}))}async handleSaveError(e,t){const i=this.ws.get(e)?.name??e;if(t instanceof jo)return this.resolveConflict(e,t);if(t instanceof ct||t instanceof Le&&t.code==="invalid_project"&&/background/i.test(t.message))return this.offerBackgroundRemoval(e,li(t));if(t instanceof ii)return this.enterReadOnly(),!1;if(t instanceof ba){this.flushDraft(e);const n=t.message;return this.showError(()=>o("panel.persist.save_too_large",{name:i,reason:n}),`save:${e}`),!1}if(t instanceof Le&&t.code==="too_many_projects")return this.flushDraft(e),this.showError(()=>o("panel.persist.save_too_many",{name:i,max:100}),`save:${e}`),!1;if(t instanceof Le&&!Wc.has(t.code)){this.flushDraft(e);const n=t.message;return this.showError(()=>o("panel.persist.save_refused",{name:i,reason:n}),`save:${e}`),!1}const a=()=>ot(t);return this.ws.isDirty(e)?(this.cancelDraft(e),await this.writeDraft(e)?this.setNotice({key:`unsynced:${e}`,kind:"warning",message:()=>o("panel.persist.unsynced",{name:i,reason:a()}),actions:[{label:()=>o("panel.common.retry"),run:()=>{this.save(e)}}]}):this.showError(()=>o("panel.persist.save_failed_no_draft",{name:i,reason:a()}),`save:${e}`),!1):(this.showError(()=>o("panel.persist.save_failed",{name:i,reason:a()}),`save:${e}`),!1)}async resolveConflict(e,t){const i=this.ws.get(e);if(!i)return!1;const a=t.serverRevision===0,n=t.serverRevision??"?";let s;a?s=o("panel.persist.conflict.deleted_message"):i.revision===void 0?s=o("panel.persist.conflict.same_id",{revision:n}):s=o("panel.persist.conflict.modified",{server:n,local:i.revision});const l=await this.ask({icon:"⚠️",title:o(a?"panel.persist.conflict.deleted_title":"panel.persist.conflict.title"),subtitle:mt(i.name),message:s,details:[...a?[]:[o("panel.persist.conflict.detail_reload")],o(a?"panel.persist.conflict.detail_recreate":"panel.persist.conflict.detail_overwrite"),o("panel.persist.conflict.detail_copy")],actions:[...a?[]:[{id:"reload",label:o("panel.common.reload"),icon:"🔄",kind:"secondary"}],{id:"copy",label:o("panel.persist.conflict.copy"),icon:"📄",kind:"secondary"},{id:"overwrite",label:o(a?"panel.persist.conflict.recreate":"panel.persist.conflict.overwrite"),icon:"⚠️",kind:"danger"}],tone:"warning"}),c=this.ws.get(e);if(!c)return!1;switch(l){case"reload":return await this.reloadFromServer(e),!1;case"overwrite":return this.save(e,{force:!0});case"copy":return this.saveAsCopy(e,o("panel.persist.copy_name",{name:c.name}),c.category);default:{this.flushDraft(e);const d=c.name;return this.setNotice({key:`save:${e}`,kind:"warning",message:()=>o("panel.persist.conflict.pending",{name:d}),actions:[{label:()=>o("panel.persist.conflict.resolve"),run:()=>{this.save(e)}}]}),!1}}}async offerBackgroundRemoval(e,t){const i=this.ws.get(e);if(!i)return!1;const a=await this.ask({icon:"🖼️",title:o("panel.persist.bg_refused.title"),subtitle:mt(i.name),message:o("panel.persist.bg_refused.message",{reason:t}),details:[o("panel.persist.bg_refused.detail_remove"),o("panel.persist.bg_refused.detail_reimport")],actions:[{id:"remove",label:o("panel.persist.bg_refused.remove"),icon:"🗑️",kind:"danger"}],tone:"warning"}),n=this.ws.get(e);if(!n)return!1;if(a!=="remove"){this.flushDraft(e);const s=n.name;return this.showError(()=>o("panel.persist.bg_refused.not_saved",{name:s}),`save:${e}`),!1}return n.background&&(this.ws.commit({...n,background:void 0}),this.scheduleDraft(e)),this.save(e)}enterReadOnly(){this.permissionDenied=!0,this.host.requestUpdate();for(const e of this.ws.dirtyIds())this.flushDraft(e)}projectDeleted(e,t){this.ws.removeSummary(e),this.ghostCache.delete(e);const i=this.ws.get(e);if(!i)return;if(e!==this.ws.activeId&&!this.ws.isDirty(e)){this.discardProject(e);return}const a={...i};delete a.revision,delete a.publish,this.ws.replace(a),this.ws.markDirty(e),this.scheduleDraft(e),e===this.ws.activeId&&this.unsubscribeActive(),a.background?.assetId&&this.keepDeletedBackground(e,a.background.assetId),this.clearProjectNotices(e);const n=i.name;this.setNotice({key:`deleted:${e}`,kind:"warning",message:()=>o(t.remote?"panel.persist.deleted_remote":"panel.persist.deleted_local",{name:n})})}async keepDeletedBackground(e,t){const i=this.background.objectUrlFor(t);let a=null;if(i)try{a=await Ot(await(await fetch(i)).blob())}catch{a=null}const n=c=>{if(!c.background||c.background.assetId!==t)return c;if(!a)return{...c,background:void 0};const d={...c.background,imageUrl:a};return delete d.assetId,{...c,background:d}},s=this.ws.get(e);if(!s)return;this.ws.history.rewrite(e,n);const l=n(s);l!==s&&this.ws.replace(l),a||this.ui.toast(o("panel.persist.deleted_background_lost"))}async subscribeActive(){const e=this.ws.active,t=e.id;if(!this.host.isConnected||!this.ready||this.subscribedProjectId===t||(this.unsubscribeActive(),e.revision===void 0||!this.host.hass?.connection))return;this.subscribedProjectId=t;const i=++this.subscriptionToken;try{const a=await Lo(this.host.hass,t,n=>this.handleRemoteEvent(n));if(i!==this.subscriptionToken){a();return}this.unsubscribeProject=a}catch(a){i===this.subscriptionToken&&(this.subscribedProjectId=null),console.debug(`[home-architect] Abonnement au plan ${t} impossible :`,a)}}unsubscribeActive(){this.subscriptionToken++,this.unsubscribeProject?.(),this.unsubscribeProject=null,this.subscribedProjectId=null}handleRemoteEvent(e){const t=e.project_id;if(this.savingIds.has(t)){this.pendingRemoteEvents.set(t,e);return}const i=this.ws.get(t);if(!i)return;if(e.deleted){this.projectDeleted(t,{remote:!0});return}if(i.revision===void 0||e.revision<=i.revision)return;if(!this.ws.isDirty(t)){this.refreshFromServer(t,i);return}const a=i.name,n=e.revision;this.setNotice({key:`remote:${t}`,kind:"warning",message:()=>o("panel.persist.remote_changed",{name:a,revision:n}),actions:[{label:()=>o("panel.persist.reload_server"),run:()=>{this.confirmReload(t)}}]})}async refreshFromServer(e,t){let i;try{i=await kt(this.host.hass,e)}catch(a){console.warn(`[home-architect] Mise à jour du plan ${e} impossible :`,a);return}if(!(this.ws.get(e)!==t||this.ws.isDirty(e))){if(!i){this.projectDeleted(e,{remote:!0});return}i.revision!==t.revision&&(this.adoptServerVersion(i),this.ui.toast(o("panel.persist.remote_refreshed",{name:i.name})))}}async confirmReload(e){const t=this.ws.get(e);t&&(this.ws.isDirty(e)&&await this.ask({icon:"🔄",title:o("panel.persist.confirm_reload.title"),subtitle:mt(t.name),message:o("panel.persist.confirm_reload.message"),actions:[{id:"reload",label:o("panel.common.reload"),icon:"🔄",kind:"danger"}],tone:"warning"})!=="reload"||await this.reloadFromServer(e))}scheduleDraft(e){this.cancelDraft(e),this.draftTimers.set(e,setTimeout(()=>{this.draftTimers.delete(e),this.writeDraft(e)},Hc))}cancelDraft(e){const t=this.draftTimers.get(e);t!==void 0&&(clearTimeout(t),this.draftTimers.delete(e))}flushDrafts(){for(const e of[...this.draftTimers.keys()])this.flushDraft(e)}flushDraft(e){this.cancelDraft(e),this.writeDraft(e)}async writeDraft(e){const t=this.ws.get(e);return!t||!this.ws.isDirty(e)?!1:Jr(t,t.revision??null)}async reviewLocalDrafts(){const t=Sc(await Yn(),this.ws.summaries).filter(i=>!this.ws.isDirty(i.draft.projectId));this.setDraftReviews(this.readOnly?null:t)}removeDraftReview(e){this.draftReviews&&this.setDraftReviews(this.draftReviews.filter(t=>t.draft.projectId!==e))}openDraft(e){const t=Mc(e);return this.removeDraftReview(t.id),this.ws.open(t,{dirty:!0}),this.clearProjectNotices(t.id),this.placeholderIds.delete(t.id),this.activateProject(t.id),t.id}async discardDraft(e){await this.ask({icon:"🗑️",title:o("panel.persist.discard_draft.title"),subtitle:mt(e.draft.project.name),message:o("panel.persist.discard_draft.message"),actions:[{id:"discard",label:o("panel.common.delete"),icon:"🗑️",kind:"danger"}],tone:"danger"})==="discard"&&(await Rt(e.draft.projectId),this.removeDraftReview(e.draft.projectId))}async uploadInlineBackgroundNow(e){try{await this.withBusy(o("panel.persist.uploading_background"),()=>this.uploadPendingBackground(e))}catch(t){if(t instanceof ii){this.enterReadOnly();return}const i=()=>t instanceof ct?t.message:ot(t);this.setNotice({key:`background:${e}`,kind:"warning",message:()=>o("panel.persist.background_pending",{reason:i()})})}}async uploadImportedBackground(e,t,i){let a=t.blob;if(t.isSvg)try{a=await Xn(a)}catch(n){const s=li(n);return this.showError(()=>o("panel.background.unreadable",{reason:s})),null}return this.uploadNewBackground(e,a,{widthPx:t.widthPx,heightPx:t.heightPx,opacity:i})}async uploadNewBackground(e,t,i){const a={imageUrl:"",opacity:i.opacity,visible:!0,offset:{x:0,y:0},scale:1,rotation:0,widthPx:i.widthPx,heightPx:i.heightPx};try{const n=await Zn(this.host.hass,e,t);return{...a,assetId:n.assetId,mimeType:n.mimeType}}catch(n){if(n instanceof ct)return this.showError(n.message),null;if(n instanceof ii)return this.enterReadOnly(),null;try{const s=await Ot(t);return this.setNotice({key:`background:${e}`,kind:"warning",message:()=>o("panel.persist.background_pending",{reason:ot(n)})}),{...a,imageUrl:s,...t.type?{mimeType:t.type}:{}}}catch{const s=li(n);return this.showError(()=>o("panel.persist.upload_failed",{reason:s})),null}}}ask(e){return this.resolveChoice(null),new Promise(t=>{this.choiceDialog=e,this.choiceResolve=t,this.host.requestUpdate()})}resolveChoice(e){const t=this.choiceResolve;!t&&!this.choiceDialog||(this.choiceResolve=null,this.choiceDialog=null,this.host.requestUpdate(),t?.(e))}async withBusy(e,t){const i=this.busyMessage;this.busyMessage=e,this.host.requestUpdate();try{return await t()}finally{this.busyMessage=i,this.host.requestUpdate()}}setNotice(e){this.notices=[...this.notices.filter(t=>t.key!==e.key),e],this.host.requestUpdate()}dismissNotice(e){this.notices.some(t=>t.key===e)&&(this.notices=this.notices.filter(t=>t.key!==e),this.host.requestUpdate())}clearProjectNotices(e){const t=`:${e}`;this.notices.some(i=>i.key.endsWith(t))&&(this.notices=this.notices.filter(i=>!i.key.endsWith(t)),this.host.requestUpdate())}showError(e,t="error"){this.setNotice({key:t,kind:"error",message:e})}renderBanners(e=[]){const t=[];return this.host.hass&&this.readOnly&&t.push({key:"read-only",kind:"info",dismissible:!1,message:o(this.permissionDenied?"panel.persist.read_only_denied":"panel.persist.read_only")}),Uc([...t,...e,...this.notices],i=>this.dismissNotice(i))}renderOverlays(){const e=[];return this.loadStateValue==="error"?e.push(Bc(ot(this.loadFailure),()=>{this.loadInitial()})):this.ready?this.busyMessage!==null&&e.push(pn(this.busyMessage)):e.push(pn(o("panel.loading.plans"))),this.draftReviews&&this.ready&&e.push(jc(this.draftReviews,{onOpen:t=>{this.openDraft(t),this.ui.toast(o("panel.persist.draft_opened"))},onSend:t=>{this.save(this.openDraft(t))},onDiscard:t=>{this.discardDraft(t)},onClose:()=>this.setDraftReviews(null)})),this.choiceDialog&&e.push(Oc(this.choiceDialog,t=>this.resolveChoice(t))),e}}const Kc=he`
  /* Dans le flux de la zone de contenu de HA, comme les panneaux natifs : HA place déjà cette zone
     à côté de sa barre latérale (aucune lecture de son DOM interne, constats F37 et F135).
     Hauteur : ha-panel-custom, parent du panneau, n'a pas de hauteur définie (HA donne lui-même
     100vh / 100dvh à ses panneaux iframe) : un pourcentage n'y serait pas résolu et le studio
     s'écraserait. Hauteur de la fenêtre, moins les marges de zone sûre que ha-panel-custom applique. */
  :host {
    --studio-accent-text: color-mix(in srgb, var(--arch-ui-accent) 55%, var(--arch-ui-text));
    --studio-accent-strong: color-mix(in srgb, var(--arch-ui-accent) 70%, #000000);
    --studio-accent-soft: color-mix(in srgb, var(--arch-ui-accent) 16%, transparent);
    --studio-accent-border: color-mix(in srgb, var(--arch-ui-accent) 50%, transparent);
    --studio-danger-text: color-mix(in srgb, var(--arch-ui-danger) 70%, var(--arch-ui-text));
    --studio-danger-strong: color-mix(in srgb, var(--arch-ui-danger) 85%, #000000);
    --studio-danger-soft: color-mix(in srgb, var(--arch-ui-danger) 12%, transparent);
    --studio-danger-border: color-mix(in srgb, var(--arch-ui-danger) 45%, transparent);
    --studio-warning-text: color-mix(in srgb, var(--arch-ui-warning) 50%, var(--arch-ui-text));
    --studio-warning-soft: color-mix(in srgb, var(--arch-ui-warning) 14%, transparent);
    --studio-warning-border: color-mix(in srgb, var(--arch-ui-warning) 45%, transparent);
    --studio-on-warning: #1a1300;
    --studio-success-text: color-mix(in srgb, var(--arch-ui-success) 65%, var(--arch-ui-text));
    --studio-success-soft: color-mix(in srgb, var(--arch-ui-success) 12%, transparent);
    --studio-success-border: color-mix(in srgb, var(--arch-ui-success) 40%, transparent);
    --studio-info-text: color-mix(in srgb, var(--arch-ui-info) 62%, var(--arch-ui-text));
    --studio-info-soft: color-mix(in srgb, var(--arch-ui-info) 12%, transparent);
    --studio-hover: color-mix(in srgb, var(--arch-ui-text) 8%, transparent);
    --studio-shadow: 0 12px 32px rgba(0, 0, 0, 0.28);

    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100vh;
    height: calc(100dvh - var(--safe-area-inset-top, 0px) - var(--safe-area-inset-bottom, 0px));
    min-height: 0;
    overflow: hidden;
    background: var(--arch-ui-bg);
    color: var(--arch-ui-text);
    font-family: var(--arch-ui-font);
    box-sizing: border-box;
    outline: none;
  }

  /* Plein écran de repli (API Fullscreen indisponible, ex. iPhone) : le studio recouvre la page. */
  :host(.is-fullscreen) {
    position: fixed !important;
    inset: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    height: 100dvh !important;
    max-width: 100vw !important;
    max-height: 100dvh !important;
    z-index: 99999 !important;
  }

  /* Règles séparées : un sélecteur inconnu d'un navigateur invaliderait toute la liste. */
  :host(:fullscreen) {
    width: 100vw;
    height: 100vh;
    background: var(--arch-ui-bg);
  }

  :host(:-webkit-full-screen) {
    width: 100vw;
    height: 100vh;
    background: var(--arch-ui-bg);
  }

  /* Colonne du studio : ne dépend pas du display imposé à l'hôte par la page qui l'insère. */
  .studio {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 0;
    overflow: hidden;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }

  header.top-bar {
    min-height: 56px;
    max-width: 100%;
    background: var(--arch-ui-surface);
    border-bottom: 1px solid var(--arch-ui-border);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 6px 14px;
    position: relative;
    z-index: 85;
    flex-shrink: 0;
    overflow: visible;
    box-sizing: border-box;
    gap: 8px 10px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--arch-ui-text);
    cursor: pointer;
  }

  .brand-icon {
    display: inline-flex;
    font-size: 1.4rem;
  }

  .brand-icon svg {
    vertical-align: middle;
    border-radius: 7px;
    overflow: hidden;
  }

  .brand-tag {
    font-size: 0.75rem;
    padding: 2px 8px;
    background: var(--studio-accent-soft);
    color: var(--studio-accent-text);
    border-radius: 9999px;
    border: 1px solid var(--studio-accent-border);
    font-weight: 600;
  }

  .brand-version {
    font-size: 0.72rem;
    padding: 2px 7px;
    background: transparent;
    color: var(--arch-ui-text-muted);
    border-radius: 6px;
    font-family: monospace;
    font-weight: 600;
    border: 1px solid var(--arch-ui-border);
  }

  /* Bouton « mise à jour disponible » : halo animé par transform et opacity (composité, constat F133) */
  .btn-update-auto {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: var(--arch-ui-warning);
    color: var(--studio-on-warning);
    border: 1px solid var(--studio-warning-border);
    padding: 5px 12px;
    border-radius: 9999px;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
  }

  .btn-update-auto::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    border: 2px solid var(--arch-ui-warning);
    opacity: 0;
    pointer-events: none;
    animation: pulse-update-btn 2.2s ease-out 6;
  }

  .btn-update-auto:hover {
    transform: translateY(-1px) scale(1.02);
  }

  .btn-update-auto:active {
    transform: translateY(1px);
  }

  .btn-update-auto .update-version-tag {
    background: rgba(255, 255, 255, 0.4);
    padding: 1px 6px;
    border-radius: 6px;
    font-size: 0.72rem;
    font-weight: 800;
  }

  @keyframes pulse-update-btn {
    0% { opacity: 0.8; transform: scale(1); }
    70% { opacity: 0; transform: scale(1.18, 1.45); }
    100% { opacity: 0; transform: scale(1.18, 1.45); }
  }

  .top-controls {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .control-group {
    display: flex;
    align-items: center;
    background: transparent;
    border: 1px solid var(--arch-ui-border);
    border-radius: 8px;
    padding: 2px 8px;
    gap: 6px;
    font-size: 0.85rem;
  }

  .control-group.compact {
    padding: 2px 4px;
    gap: 4px;
  }

  .control-group label {
    color: var(--arch-ui-text-muted);
    font-size: 0.8rem;
  }

  select, input[type="range"] {
    background: transparent;
    color: var(--arch-ui-text);
    border: none;
    font-size: 0.85rem;
    font-family: inherit;
    cursor: pointer;
  }

  input[type="range"] {
    width: 70px;
    accent-color: var(--arch-ui-accent);
  }

  select option {
    background: var(--arch-ui-surface);
    color: var(--arch-ui-text);
  }

  select:disabled, input[type="range"]:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Boutons de la barre supérieure */
  .btn-dropdown-trigger, button.btn-history, button.btn-drawer, button.btn-fullscreen {
    background: transparent;
    color: var(--arch-ui-text);
    border: 1px solid var(--arch-ui-border);
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 0.85rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
    white-space: nowrap;
  }

  .btn-dropdown-trigger:hover, button.btn-history:hover:not(:disabled), button.btn-drawer:hover, button.btn-fullscreen:hover {
    background: var(--studio-hover);
    border-color: var(--studio-accent-border);
  }

  .btn-dropdown-trigger.active, button.btn-drawer.active, button.btn-fullscreen.active {
    background: var(--studio-accent-soft);
    border-color: var(--arch-ui-accent);
    color: var(--studio-accent-text);
  }

  button.btn-history {
    padding: 6px 10px;
    gap: 5px;
    font-size: 0.84rem;
  }

  button.btn-history:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .btn-dropdown-trigger {
    user-select: none;
  }

  .btn-dropdown-trigger .chevron {
    font-size: 0.75rem;
    transition: transform 0.2s ease;
    color: var(--arch-ui-text-muted);
  }

  .btn-dropdown-trigger.active .chevron {
    transform: rotate(180deg);
    color: var(--studio-accent-text);
  }

  .fullscreen-icon {
    font-size: 1.05rem;
    line-height: 1;
  }

  button.btn-primary {
    background: var(--studio-accent-strong);
    color: var(--arch-ui-accent-text);
    border: 1px solid var(--studio-accent-strong);
    border-radius: 8px;
    padding: 6px 14px;
    font-size: 0.85rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: filter 0.15s ease;
  }

  button.btn-primary:hover:not(:disabled) {
    filter: brightness(1.1);
  }

  .workspace {
    flex: 1;
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 0;
    min-width: 0;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    z-index: 1;
  }

  .canvas-area {
    flex: 1;
    min-width: 0;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .scale-indicator {
    font-size: 0.8rem;
    color: var(--studio-accent-text);
    font-family: ui-monospace, SFMono-Regular, monospace;
    padding: 2px 6px;
  }

  /* HUD de sélection (bas du canevas) */
  .selection-hud {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--arch-ui-surface);
    color: var(--arch-ui-text);
    border: 1.5px solid var(--arch-ui-accent);
    border-radius: 14px;
    padding: 8px 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    box-shadow: var(--studio-shadow);
    z-index: 60;
    animation: popSelectionBottom 0.2s ease-out;
    max-width: min(92vw, calc(100% - 24px));
    box-sizing: border-box;
  }

  @keyframes popSelectionBottom {
    from { opacity: 0; transform: translate(-50%, 15px); }
    to { opacity: 1; transform: translate(-50%, 0); }
  }

  .selection-hud-main {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
    white-space: nowrap;
  }

  .selection-info {
    font-size: 0.88rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .btn-delete-selection {
    background: var(--studio-danger-strong);
    color: #ffffff;
    border: 1px solid var(--studio-danger-strong);
    border-radius: 8px;
    padding: 6px 13px;
    font-size: 0.84rem;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: filter 0.15s ease, transform 0.15s ease;
  }

  .btn-delete-selection:hover:not(:disabled) {
    filter: brightness(1.1);
    transform: scale(1.03);
  }

  .btn-clear-selection {
    background: transparent;
    color: var(--arch-ui-text-muted);
    border: 1px solid var(--arch-ui-border);
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 0.84rem;
    font-family: inherit;
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  .btn-clear-selection:hover {
    color: var(--arch-ui-text);
    background: var(--studio-hover);
  }

  .hud-options-group {
    display: flex;
    align-items: center;
    gap: 6px;
    padding-left: 8px;
    border-left: 1px solid var(--arch-ui-border);
  }

  .hud-label {
    font-size: 0.78rem;
    color: var(--arch-ui-text-muted);
    font-weight: 600;
  }

  .hud-opt-btn {
    background: var(--arch-ui-surface-2);
    color: var(--arch-ui-text);
    border: 1px solid var(--arch-ui-border);
    border-radius: 6px;
    padding: 4px 8px;
    font-size: 0.78rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: background-color 0.15s ease, border-color 0.15s ease;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .hud-opt-btn:hover:not(:disabled) {
    background: var(--studio-accent-soft);
    border-color: var(--arch-ui-accent);
  }

  .hud-opt-btn.active {
    background: var(--studio-accent-strong);
    border-color: var(--studio-accent-strong);
    color: var(--arch-ui-accent-text);
  }

  /* Palette « Choisir l'icône » du HUD */
  .hud-icon-picker-panel {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 8px;
    border-top: 1px solid var(--arch-ui-border);
    width: 100%;
    max-width: 650px;
    box-sizing: border-box;
  }

  .icon-category-tabs {
    display: flex;
    align-items: center;
    gap: 6px;
    overflow-x: auto;
    scrollbar-width: none;
    padding-bottom: 2px;
    max-width: 100%;
  }

  .icon-category-tabs::-webkit-scrollbar {
    display: none;
  }

  .icon-category-tab {
    background: var(--arch-ui-surface-2);
    border: 1px solid var(--arch-ui-border);
    color: var(--arch-ui-text);
    border-radius: 6px;
    padding: 3px 8px;
    font-size: 0.75rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.15s ease, border-color 0.15s ease;
  }

  .icon-category-tab:hover {
    background: var(--studio-accent-soft);
    border-color: var(--arch-ui-accent);
  }

  .icon-category-tab.active {
    background: var(--studio-accent-strong);
    color: var(--arch-ui-accent-text);
    border-color: var(--studio-accent-strong);
  }

  .icon-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    max-height: 140px;
    overflow-y: auto;
    padding: 2px;
    scrollbar-width: thin;
  }

  .icon-item-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--arch-ui-surface-2);
    border: 1px solid var(--arch-ui-border);
    border-radius: 8px;
    padding: 4px 8px;
    color: var(--arch-ui-text);
    font-size: 0.78rem;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
    white-space: nowrap;
  }

  .icon-item-btn:hover {
    background: var(--studio-accent-soft);
    border-color: var(--arch-ui-accent);
    transform: translateY(-1px);
  }

  .icon-item-btn.active {
    background: var(--studio-accent-soft);
    border-color: var(--arch-ui-accent);
    color: var(--studio-accent-text);
    font-weight: 700;
  }

  .icon-item-emoji {
    font-size: 1.15rem;
    line-height: 1;
  }

  .icon-picker-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    font-size: 0.78rem;
    color: var(--arch-ui-text-muted);
    border-top: 1px solid var(--arch-ui-border);
    padding-top: 4px;
  }

  .icon-picker-footer strong {
    color: var(--studio-accent-text);
  }

  .icon-free-input {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .icon-free-input input {
    width: 55px;
    background: var(--arch-ui-surface-2);
    border: 1px solid var(--arch-ui-border);
    border-radius: 6px;
    color: var(--arch-ui-text);
    padding: 2px 4px;
    font-size: 0.85rem;
    text-align: center;
  }

  /* Menus déroulants de la barre supérieure */
  .dropdown-menu-wrapper {
    position: relative;
    display: inline-block;
    z-index: 100;
  }

  .dropdown-menu-popup {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    background: var(--arch-ui-surface);
    color: var(--arch-ui-text);
    border: 1px solid var(--arch-ui-border);
    border-radius: 12px;
    padding: 6px;
    min-width: 220px;
    box-shadow: var(--studio-shadow);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 3px;
    animation: popDropdown 0.15s ease-out;
  }

  .dropdown-menu-popup.wide {
    min-width: 250px;
  }

  @keyframes popDropdown {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 8px;
    background: transparent;
    border: none;
    color: var(--arch-ui-text);
    font-size: 0.85rem;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    text-align: left;
    width: 100%;
    box-sizing: border-box;
    transition: background-color 0.15s ease, color 0.15s ease;
    white-space: nowrap;
  }

  .dropdown-item:hover, .dropdown-item:focus-visible {
    background: var(--studio-accent-soft);
    color: var(--studio-accent-text);
  }

  .dropdown-item.active {
    background: var(--studio-accent-soft);
    color: var(--studio-accent-text);
    font-weight: 700;
  }

  .dropdown-item.danger:hover, .dropdown-item.danger:focus-visible {
    background: var(--studio-danger-soft);
    color: var(--studio-danger-text);
  }

  .dropdown-divider {
    height: 1px;
    background: var(--arch-ui-border);
    margin: 4px 6px;
  }

  .dropdown-item-check {
    margin-left: auto;
    font-size: 0.85rem;
    color: var(--studio-accent-text);
    font-weight: 700;
  }

  /* Toast (région annoncée par les lecteurs d'écran) */
  .toast-region {
    position: absolute;
    top: 20px;
    left: 12px;
    right: 12px;
    display: flex;
    justify-content: center;
    z-index: 80;
    pointer-events: none;
  }

  .toast-notification {
    background: var(--arch-ui-surface);
    color: var(--arch-ui-text);
    border: 1px solid var(--arch-ui-accent);
    box-shadow: var(--studio-shadow);
    border-radius: 12px;
    padding: 10px 22px;
    font-size: 0.88rem;
    font-weight: 600;
    animation: popToast 0.25s ease-out;
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 100%;
    box-sizing: border-box;
    text-align: center;
  }

  @keyframes popToast {
    from { transform: translateY(-12px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  /* Dialogues du panneau (nouveau plan, effacement, choix, brouillons, mise à jour, à propos) */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: var(--arch-ui-overlay);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 120;
    animation: modalFadeIn 0.2s ease-out;
  }

  @keyframes modalFadeIn {
    from { opacity: 0; transform: scale(0.98); }
    to { opacity: 1; transform: scale(1); }
  }

  .modal-dialog {
    background: var(--arch-ui-surface);
    color: var(--arch-ui-text);
    border: 1px solid var(--arch-ui-border);
    border-radius: var(--arch-ui-radius);
    width: 520px;
    max-width: 92vw;
    box-shadow: var(--studio-shadow);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    outline: none;
  }

  .modal-dialog.danger {
    border-color: var(--studio-danger-border);
  }

  .modal-dialog-header {
    padding: 16px 20px;
    border-bottom: 1px solid var(--arch-ui-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--arch-ui-surface);
  }

  .modal-dialog-header.danger {
    background: var(--studio-danger-soft);
    border-bottom-color: var(--studio-danger-border);
  }

  .modal-dialog-title-group {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .modal-dialog-icon {
    font-size: 1.5rem;
  }

  .modal-dialog-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--arch-ui-text);
    margin: 0;
  }

  .modal-dialog-title.danger {
    color: var(--studio-danger-text);
  }

  .modal-dialog-subtitle {
    font-size: 0.8rem;
    color: var(--arch-ui-text-muted);
    margin: 2px 0 0 0;
  }

  .btn-dialog-close {
    background: transparent;
    border: none;
    color: var(--arch-ui-text-muted);
    font-size: 1.2rem;
    cursor: pointer;
    padding: 4px;
    border-radius: 6px;
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  .btn-dialog-close:hover {
    color: var(--arch-ui-text);
    background: var(--studio-hover);
  }

  .modal-dialog-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .dialog-text {
    margin: 0;
    line-height: 1.5;
    font-size: 0.92rem;
  }

  .dialog-form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 0;
    padding: 0;
    border: none;
    min-width: 0;
  }

  .dialog-label {
    font-size: 0.84rem;
    font-weight: 600;
    color: var(--arch-ui-text);
    padding: 0;
  }

  .dialog-input {
    background: var(--arch-ui-bg);
    border: 1px solid var(--arch-ui-border);
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 0.92rem;
    font-family: inherit;
    color: var(--arch-ui-text);
    transition: border-color 0.2s ease;
  }

  .dialog-input:focus {
    border-color: var(--arch-ui-accent);
  }

  .category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 8px;
  }

  .category-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px 6px;
    background: var(--arch-ui-surface-2);
    border: 1px solid var(--arch-ui-border);
    border-radius: 8px;
    color: var(--arch-ui-text);
    cursor: pointer;
    transition: background-color 0.15s ease, border-color 0.15s ease;
    font-size: 0.8rem;
    font-family: inherit;
  }

  .category-btn:hover {
    border-color: var(--studio-accent-border);
  }

  .category-btn.active {
    background: var(--studio-accent-soft);
    border-color: var(--arch-ui-accent);
    color: var(--studio-accent-text);
    font-weight: 600;
  }

  .reset-summary-box {
    background: var(--arch-ui-surface-2);
    border: 1px solid var(--studio-danger-border);
    border-radius: 10px;
    padding: 12px 16px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    font-size: 0.85rem;
    margin: 0;
  }

  .reset-summary-box dt {
    font-weight: 700;
  }

  .reset-summary-box div {
    display: flex;
    gap: 6px;
  }

  .reset-summary-box dd {
    margin: 0;
  }

  .modal-dialog-footer {
    padding: 14px 20px;
    border-top: 1px solid var(--arch-ui-border);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    background: var(--arch-ui-surface-2);
  }

  .btn-dialog-cancel {
    padding: 8px 16px;
    background: transparent;
    border: 1px solid var(--arch-ui-border);
    border-radius: 8px;
    color: var(--arch-ui-text);
    font-size: 0.88rem;
    font-family: inherit;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  .btn-dialog-cancel:hover {
    background: var(--studio-hover);
  }

  .btn-dialog-confirm {
    padding: 8px 18px;
    border: 1px solid transparent;
    border-radius: 8px;
    font-size: 0.88rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: filter 0.15s ease, background-color 0.15s ease;
  }

  .btn-dialog-confirm.primary {
    background: var(--studio-accent-strong);
    color: var(--arch-ui-accent-text);
  }

  .btn-dialog-confirm.danger {
    background: var(--studio-danger-strong);
    color: #ffffff;
  }

  .btn-dialog-confirm.primary:hover, .btn-dialog-confirm.danger:hover {
    filter: brightness(1.1);
  }
`,Xc=he`
  /* Indicateur « modifications non sauvegardées » */
  .dirty-dot {
    color: var(--studio-warning-text);
    font-size: 0.75rem;
    line-height: 1;
  }

  button.btn-primary.is-dirty {
    box-shadow: 0 0 0 2px var(--studio-warning-border);
  }

  /* L'anneau « modifié » remplace celui du focus (même propriété) : les deux sont combinés. */
  button.btn-primary.is-dirty:focus-visible {
    box-shadow: 0 0 0 2px var(--studio-warning-border), 0 0 0 4px var(--arch-ui-accent);
  }

  button.btn-primary:disabled,
  .dropdown-item:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    box-shadow: none;
    filter: none;
  }

  .dropdown-item:disabled:hover {
    background: transparent;
    color: var(--arch-ui-text);
  }

  .level-plan-name {
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--arch-ui-text-muted);
    font-weight: 500;
  }

  /* Sélecteur de plans par niveau */
  .dropdown-menu-popup.level-menu {
    min-width: 260px;
    max-height: min(70vh, 560px);
    overflow-y: auto;
  }

  /* Groupe d'un niveau à plusieurs plans (role=group) : même empilement que le menu */
  .dropdown-menu-popup [role="group"] {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .dropdown-group-label {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px 2px;
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--arch-ui-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .dropdown-item.sub {
    padding-left: 34px;
  }

  .dropdown-item-meta {
    color: var(--arch-ui-text-muted);
    font-size: 0.75rem;
    font-style: italic;
  }

  /* Bandeaux persistants */
  .notice-stack {
    display: flex;
    flex-direction: column;
    gap: 1px;
    flex-shrink: 0;
    position: relative;
    z-index: 84;
  }

  .notice {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px 12px;
    padding: 7px 14px;
    font-size: 0.84rem;
    line-height: 1.4;
    border-bottom: 1px solid var(--arch-ui-border);
    background: var(--arch-ui-surface);
  }

  .notice.info {
    background-image: linear-gradient(var(--studio-info-soft), var(--studio-info-soft));
    color: var(--studio-info-text);
  }

  .notice.warning {
    background-image: linear-gradient(var(--studio-warning-soft), var(--studio-warning-soft));
    color: var(--studio-warning-text);
  }

  .notice.error {
    background-image: linear-gradient(var(--studio-danger-soft), var(--studio-danger-soft));
    color: var(--studio-danger-text);
  }

  .notice-message {
    flex: 1 1 260px;
  }

  .notice-action {
    background: var(--arch-ui-surface);
    color: var(--arch-ui-text);
    border: 1px solid var(--arch-ui-border);
    border-radius: 6px;
    padding: 3px 10px;
    font-size: 0.8rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    white-space: nowrap;
  }

  .notice-action:hover {
    border-color: var(--arch-ui-accent);
  }

  .notice-close {
    background: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: 0.9rem;
    padding: 2px 4px;
    opacity: 0.8;
  }

  .notice-close:hover {
    opacity: 1;
  }

  /* Chargement initial, opérations bloquantes et erreur de chargement */
  .loading-overlay {
    position: absolute;
    inset: 0;
    z-index: 115;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: var(--arch-ui-overlay);
    backdrop-filter: blur(6px);
  }

  .loading-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    max-width: 440px;
    padding: 22px 26px;
    text-align: center;
    background: var(--arch-ui-surface);
    border: 1px solid var(--studio-accent-border);
    border-radius: 14px;
    box-shadow: var(--studio-shadow);
    color: var(--arch-ui-text);
    font-size: 0.92rem;
  }

  .loading-box.error {
    border-color: var(--studio-danger-border);
  }

  .spinner {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 3px solid var(--studio-accent-soft);
    border-top-color: var(--arch-ui-accent);
    animation: ha-spin 0.9s linear infinite;
  }

  /* « Réduire les animations » : la règle commune de uiThemeStyles immobilise l'anneau (le message reste affiché). */
  @keyframes ha-spin {
    to { transform: rotate(360deg); }
  }

  /* Dialogues (complètent .modal-dialog du panneau) */
  .modal-backdrop.choice-backdrop {
    z-index: 130;
  }

  .modal-dialog.wide {
    width: 640px;
  }

  .modal-dialog.warning,
  .modal-dialog.update {
    border-color: var(--studio-warning-border);
  }

  .modal-dialog-header.warning,
  .modal-dialog-header.update {
    background: var(--studio-warning-soft);
    border-bottom-color: var(--studio-warning-border);
  }

  /* Sous-titre sur un en-tête teinté : plus proche du texte principal (contraste ≥ 4,5:1 en palette claire) */
  .modal-dialog-header.warning .modal-dialog-subtitle,
  .modal-dialog-header.update .modal-dialog-subtitle,
  .modal-dialog-header.danger .modal-dialog-subtitle {
    color: color-mix(in srgb, var(--arch-ui-text-muted) 60%, var(--arch-ui-text));
  }

  .update-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: var(--arch-ui-warning);
  }

  .modal-dialog-body {
    max-height: min(70vh, 640px);
    overflow-y: auto;
  }

  .modal-dialog-footer.wrap {
    flex-wrap: wrap;
  }

  .modal-dialog-footer.spread {
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .footer-buttons {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .btn-dialog-confirm.secondary {
    background: var(--arch-ui-surface);
    color: var(--arch-ui-text);
    border: 1px solid var(--arch-ui-border);
  }

  .btn-dialog-confirm.secondary:hover {
    background: var(--studio-hover);
    border-color: var(--arch-ui-accent);
  }

  .choice-message {
    margin: 0;
    font-size: 0.92rem;
    line-height: 1.5;
  }

  .choice-details {
    margin: 0;
    padding-left: 18px;
    color: var(--arch-ui-text-muted);
    font-size: 0.84rem;
    line-height: 1.55;
  }

  .dialog-hint {
    margin: 0;
    color: var(--arch-ui-text-muted);
    font-size: 0.8rem;
    line-height: 1.45;
  }

  .dialog-warning {
    margin: 0;
    padding: 9px 12px;
    border-radius: 10px;
    background: var(--studio-warning-soft);
    border: 1px solid var(--studio-warning-border);
    color: var(--studio-warning-text);
    font-size: 0.82rem;
    line-height: 1.45;
  }

  .draft-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .draft-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 10px;
    background: var(--arch-ui-surface);
    border: 1px solid var(--arch-ui-border);
  }

  .draft-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    font-size: 0.88rem;
  }

  .draft-meta {
    color: var(--arch-ui-text-muted);
    font-size: 0.78rem;
  }

  .draft-status {
    font-size: 0.78rem;
    color: var(--studio-accent-text);
  }

  .draft-item.status-outdated .draft-status,
  .draft-item.status-deleted .draft-status {
    color: var(--studio-warning-text);
  }

  .draft-actions {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .draft-actions .btn-dialog-confirm {
    padding: 6px 10px;
    font-size: 0.8rem;
  }

  .version-compare {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 12px;
    border-radius: 12px;
    background: var(--arch-ui-surface);
    border: 1px solid var(--arch-ui-border);
    text-align: center;
  }

  .version-label {
    margin-bottom: 4px;
    color: var(--arch-ui-text-muted);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
  }

  .version-label.new {
    color: var(--studio-warning-text);
  }

  .version-value {
    color: var(--arch-ui-text);
    font-family: monospace;
    font-size: 16px;
    font-weight: 800;
  }

  .version-value.new {
    color: var(--studio-success-text);
  }

  .version-arrow {
    color: var(--studio-warning-text);
    font-size: 18px;
    font-weight: 800;
  }

  .update-notes-title {
    margin-bottom: 6px;
    font-size: 12px;
    font-weight: 700;
  }

  .update-notes {
    max-height: 180px;
    overflow-y: auto;
    padding: 12px;
    border-radius: 10px;
    background: var(--arch-ui-surface-2);
    border: 1px solid var(--arch-ui-border);
    color: var(--arch-ui-text);
    font-size: 12px;
    line-height: 1.5;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }

  .release-link {
    color: var(--studio-accent-text);
    font-size: 12px;
    text-decoration: none;
  }

  .release-link:hover,
  .release-link:focus-visible {
    text-decoration: underline;
  }

  .update-progress-box,
  .update-success-box,
  .update-error-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 24px 16px;
    gap: 12px;
  }

  .update-progress-box .spinner {
    width: 32px;
    height: 32px;
    border-width: 3px;
    margin-bottom: 6px;
  }

  .update-success-icon,
  .update-error-icon {
    font-size: 36px;
    line-height: 1;
    margin-bottom: 4px;
  }

  .update-progress-box h4,
  .update-success-box h4,
  .update-error-box h4 {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 700;
  }

  .update-success-msg {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--studio-success-text);
  }

  .footer-links {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px 14px;
  }

  /* Lien de soutien (Buy Me A Coffee) : style local, aucune image externe chargée (acquis P8).
     Jaune de la marque et texte noir dans les deux palettes (contraste 14:1). */
  .support-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 9999px;
    background: #ffdd00;
    color: #000000;
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    white-space: nowrap;
    border: 1px solid rgba(0, 0, 0, 0.25);
  }

  .support-link:hover {
    background: #ffe94d;
  }

  .support-link:focus-visible {
    background: #ffe94d;
    box-shadow: 0 0 0 2px var(--arch-ui-surface), 0 0 0 4px var(--arch-ui-text);
  }

  /* Dialogue « À propos » */
  .about-version {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .about-status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px 12px;
    padding: 9px 12px;
    border-radius: 10px;
    background: var(--studio-success-soft);
    border: 1px solid var(--studio-success-border);
    color: var(--studio-success-text);
    font-size: 0.86rem;
  }

  .about-status.update {
    background: var(--studio-warning-soft);
    border-color: var(--studio-warning-border);
    color: var(--studio-warning-text);
  }

  .about-links {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 16px;
  }

  .about-support {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px 12px;
    padding-top: 10px;
    border-top: 1px solid var(--arch-ui-border);
  }
`,Zc=he`
  /* Bouton de la barre latérale de HA (mode étroit ou barre « toujours masquée ») */
  .ha-menu-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    margin-left: -6px;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 50%;
    color: var(--arch-ui-text);
    cursor: pointer;
  }

  .ha-menu-btn:hover,
  .ha-menu-btn:focus-visible {
    background: var(--studio-hover);
  }

  /* Barre supérieure : les groupes passent à la ligne au lieu d'être coupés */
  .menu-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .top-controls {
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  /* Badge de version : ouvre le dialogue « À propos » */
  button.brand-version {
    cursor: pointer;
    line-height: inherit;
  }

  button.brand-version:hover,
  button.brand-version:focus-visible {
    border-color: var(--arch-ui-accent);
    color: var(--arch-ui-text);
  }

  /* HUD : couleur des meubles, commandes désactivées en lecture seule */
  .hud-color {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }

  .hud-color input[type="color"] {
    width: 28px;
    height: 22px;
    padding: 0;
    border: 1px solid var(--arch-ui-border);
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
  }

  .hud-opt-btn:disabled,
  .btn-delete-selection:disabled,
  .hud-color input:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  /* Mode étroit (mobile) : icônes seules ; plein écran et échelle restent dans le menu Plan */
  :host([narrow]) header.top-bar {
    min-height: 52px;
    padding: 4px 8px;
    gap: 6px;
    justify-content: flex-start;
  }

  :host([narrow]) .brand {
    gap: 6px;
  }

  :host([narrow]) .brand-name,
  :host([narrow]) .brand-tag,
  :host([narrow]) .btn-label,
  :host([narrow]) .control-group label,
  :host([narrow]) .level-plan-name,
  :host([narrow]) .scale-indicator,
  :host([narrow]) .btn-fullscreen {
    display: none;
  }

  :host([narrow]) .top-controls {
    flex: 1 1 auto;
    gap: 6px;
  }

  :host([narrow]) .btn-dropdown-trigger,
  :host([narrow]) .btn-drawer,
  :host([narrow]) button.btn-primary,
  :host([narrow]) .btn-history {
    padding: 6px 9px;
  }

  :host([narrow]) .dropdown-menu-popup {
    max-width: calc(100vw - 16px);
    max-height: 70vh;
    overflow-y: auto;
  }

  :host([narrow]) .selection-hud {
    bottom: 12px;
    max-width: calc(100% - 16px);
    padding: 6px 10px;
  }

  :host([narrow]) .selection-hud-main {
    white-space: normal;
  }

  :host([narrow]) .hud-options-group {
    flex-wrap: wrap;
    border-left: none;
    padding-left: 0;
  }
`,zt={light:{tabIcon:"💡",icons:[{id:"bulb",icon:"💡",mdi:"mdi:lightbulb"},{id:"living_lamp",icon:"🛋️",mdi:"mdi:lamp"},{id:"recessed_spot",icon:"🌟",mdi:"mdi:ceiling-light"},{id:"ceiling_light",icon:"🔆",mdi:"mdi:ceiling-light-outline"},{id:"outdoor_lantern",icon:"🏮",mdi:"mdi:outdoor-lamp"},{id:"candle",icon:"🕯️",mdi:"mdi:candle"},{id:"spotlight",icon:"🔦",mdi:"mdi:spotlight-beam"},{id:"led_strip",icon:"🪩",mdi:"mdi:led-strip-variant"},{id:"string_lights",icon:"✨",mdi:"mdi:string-lights"},{id:"wall_sconce",icon:"🛋",mdi:"mdi:wall-sconce-flat"}]},switch:{tabIcon:"🔌",icons:[{id:"smart_plug",icon:"🔌",mdi:"mdi:power-socket-fr"},{id:"wall_switch",icon:"⚡",mdi:"mdi:toggle-switch"},{id:"tv",icon:"📺",mdi:"mdi:television"},{id:"appliance",icon:"☕",mdi:"mdi:coffee-maker"},{id:"computer",icon:"💻",mdi:"mdi:laptop"},{id:"speaker",icon:"🔊",mdi:"mdi:speaker"},{id:"printer",icon:"🖨️",mdi:"mdi:printer"},{id:"console",icon:"🎮",mdi:"mdi:gamepad-variant"},{id:"charger",icon:"🔋",mdi:"mdi:battery-charging"},{id:"fan",icon:"🪭",mdi:"mdi:fan"}]},binary_sensor:{tabIcon:"📡",icons:[{id:"pir_motion",icon:"🚶",mdi:"mdi:motion-sensor"},{id:"quick_pass",icon:"🏃",mdi:"mdi:walk"},{id:"presence_radar",icon:"👁️",mdi:"mdi:radar"},{id:"door_sensor",icon:"🚪",mdi:"mdi:door"},{id:"window_sensor",icon:"🪟",mdi:"mdi:window-closed"},{id:"garage_door",icon:"🚗",mdi:"mdi:garage"},{id:"siren",icon:"🚨",mdi:"mdi:alarm-light"},{id:"doorbell",icon:"🔔",mdi:"mdi:doorbell"},{id:"pet",icon:"🐾",mdi:"mdi:paw"},{id:"water_leak",icon:"💧",mdi:"mdi:water-alert"},{id:"smoke",icon:"🔥",mdi:"mdi:smoke-detector"},{id:"mailbox",icon:"📬",mdi:"mdi:mailbox"}]},climate:{tabIcon:"🌡️",icons:[{id:"thermostat",icon:"🌡️",mdi:"mdi:thermostat"},{id:"air_conditioner",icon:"❄️",mdi:"mdi:air-conditioner"},{id:"radiator",icon:"🔥",mdi:"mdi:radiator"},{id:"heat_pump",icon:"♨️",mdi:"mdi:water-boiler"},{id:"ventilation",icon:"💨",mdi:"mdi:fan"}]},sensor:{tabIcon:"📊",icons:[{id:"temperature",icon:"🌡️",mdi:"mdi:thermometer"},{id:"humidity",icon:"💧",mdi:"mdi:water-percent"},{id:"illuminance",icon:"☀️",mdi:"mdi:weather-sunny"},{id:"air_quality",icon:"💨",mdi:"mdi:air-filter"},{id:"power",icon:"⚡",mdi:"mdi:flash"},{id:"battery",icon:"🔋",mdi:"mdi:battery"},{id:"noise",icon:"🔊",mdi:"mdi:volume-high"},{id:"pressure",icon:"⚖️",mdi:"mdi:gauge"}]},cover:{tabIcon:"🪟",icons:[{id:"roller_shutter",icon:"🪟",mdi:"mdi:window-shutter"},{id:"venetian_blind",icon:"🚪",mdi:"mdi:blinds"},{id:"garage_door",icon:"🚗",mdi:"mdi:garage"},{id:"awning",icon:"⛺",mdi:"mdi:awning"},{id:"sliding_door",icon:"↕️",mdi:"mdi:arrow-up-down"}]},media_player:{tabIcon:"📺",icons:[{id:"tv",icon:"📺",mdi:"mdi:television"},{id:"smart_speaker",icon:"📻",mdi:"mdi:speaker"},{id:"multiroom",icon:"🎵",mdi:"mdi:music"},{id:"av_receiver",icon:"🔊",mdi:"mdi:speaker-wireless"},{id:"projector",icon:"🎬",mdi:"mdi:projector"},{id:"console",icon:"🎮",mdi:"mdi:gamepad-variant"}]},camera:{tabIcon:"📷",icons:[{id:"indoor",icon:"📷",mdi:"mdi:camera"},{id:"ptz_dome",icon:"📹",mdi:"mdi:cctv"},{id:"monitored_zone",icon:"👁️",mdi:"mdi:eye"},{id:"video_doorbell",icon:"🎥",mdi:"mdi:video"}]},fan:{tabIcon:"💨",icons:[{id:"standing_fan",icon:"💨",mdi:"mdi:fan"},{id:"extraction",icon:"🌀",mdi:"mdi:fan-chevron-up"},{id:"ceiling_fan",icon:"🌪️",mdi:"mdi:ceiling-fan"}]},vacuum:{tabIcon:"🤖",icons:[{id:"robot_vacuum",icon:"🤖",mdi:"mdi:robot-vacuum"},{id:"floor_washer",icon:"🧹",mdi:"mdi:broom"}]},lock:{tabIcon:"🔒",icons:[{id:"smart_lock",icon:"🔒",mdi:"mdi:lock"},{id:"intrusion_alarm",icon:"🛡️",mdi:"mdi:shield-home"},{id:"electric_strike",icon:"🗝️",mdi:"mdi:key"}]}};function mn(r){return o(`panel.icons.${r}.title`)}function Jc(r){return o(`panel.icons.${r}.tab`)}function Qc(r,e){return o(`panel.icons.${r}.${e.id}`)}const ed=2.5,ro=.5,gn={min:.5,max:50},td={min:1.5,max:10},id={min:.02,max:1.5},ad=.2,rd=.9,nd=1.2,od=3;function re(r){return Je.roundMeters(r,od)}function no(r){return{x:re(r.x),y:re(r.y)}}function sd(r,e){return Math.ceil(r/e-1e-9)*e}function ti(r,e){return typeof r=="number"&&Number.isFinite(r)&&r>=e.min&&r<=e.max}function Ce(r,e){let t=!1;const i=r.map(a=>{const n=e(a);return n!==a&&(t=!0),n});return t?i:null}function ci(r){const e=r.defaultCeilingHeight;return typeof e=="number"&&Number.isFinite(e)&&e>0?e:ed}function $a(r,e){return Math.abs(r-e)<1e-6}function bi(r,e){if(typeof r.height!="number"||!$a(r.height,e))return r;const t={...r};return delete t.height,t}function ld(r,e){const t=i=>typeof i.height=="number"&&$a(i.height,e);return{rooms:r.rooms.filter(t).length,walls:r.walls.filter(t).length}}function cd(r,e){const t=Ce(r.rooms,a=>bi(a,e)),i=Ce(r.walls,a=>bi(a,e));return!t&&!i?r:{...r,rooms:t??r.rooms,walls:i??r.walls}}function ma(r){let e=null;const t=(i,a,n=0)=>{if(!(!Number.isFinite(i)||!Number.isFinite(a))){if(!e){e={minX:i-n,minY:a-n,maxX:i+n,maxY:a+n};return}e.minX=Math.min(e.minX,i-n),e.minY=Math.min(e.minY,a-n),e.maxX=Math.max(e.maxX,i+n),e.maxY=Math.max(e.maxY,a+n)}};for(const i of r.walls){const a=(i.thickness||0)/2;t(i.start.x,i.start.y,a),t(i.end.x,i.end.y,a)}for(const i of r.rooms)for(const a of i.polygon)t(a.x,a.y);for(const i of r.furniture??[]){const a=$n(i);t(a.minX,a.minY),t(a.maxX,a.maxY)}for(const i of r.bindings)t(i.position.x,i.position.y);return e}function fn(r,e){if(r.roomId===e)return r;const t={...r};return e?t.roomId=e:delete t.roomId,t}function dd(r){const e=a=>oe.findRoomContainingPoint(a,r.rooms)?.id,t=Ce(r.bindings,a=>fn(a,e(a.position))),i=Ce(r.furniture??[],a=>fn(a,e(a.position)));return!t&&!i?r:{...r,...t?{bindings:t}:{},...i?{furniture:i}:{}}}function ud(r){if(typeof r!="object"||r===null)return null;const e=r;return!ti(e.width,gn)||!ti(e.length,gn)||!ti(e.height,td)?null:{name:typeof e.name=="string"&&e.name.trim()!==""?e.name.trim():o("panel.wizard.default_room_name"),width:e.width,length:e.length,thickness:ti(e.thickness,id)?e.thickness:ad,height:e.height,color:typeof e.color=="string"?e.color:void 0,icon:typeof e.icon=="string"?e.icon:void 0,addDoor:e.addDoor===!0,addWindow:e.addWindow===!0}}function pd(r,e,t){const i=r.grid&&r.grid.size>0?r.grid.size:.5,a=e.thickness/2,n=ma(r);return n?{x:re(sd(n.maxX+ro+a,i)),y:re(Je.quantize(n.minY+a,i))}:t&&Number.isFinite(t.x)&&Number.isFinite(t.y)?{x:re(Je.quantize(t.x-(e.width+e.thickness)/2,i)),y:re(Je.quantize(t.y-(e.length+e.thickness)/2,i))}:{x:2,y:2}}function hd(r,e,t){const i=e.thickness,a=t.x,n=t.y,s=re(a+e.width+i),l=re(n+e.length+i),c={x:a,y:n},d={x:s,y:n},p={x:s,y:l},h={x:a,y:l},m=$a(e.height,ci(r)),g=(M,T)=>({id:lt("w"),start:M,end:T,thickness:i,type:"standard",...m?{}:{height:e.height}}),v=g(c,d),y=g(d,p),_=g(p,h),$=g(h,c),z=[v,y,_,$],f=[],P=(M,T,I)=>{const x=Je.fitOpening(M,Je.wallLength(M)/2,I,{walls:z,openings:f});x.fits&&f.push({id:lt("op"),wallId:M.id,type:T,offset:x.offset,width:x.width,flipSide:!1,flipDirection:!1})};e.addDoor&&P(_,"door",rd),e.addWindow&&P(v,"window",nd);const A=[c,d,p,h],O={id:lt("room"),name:e.name,polygon:A,areaM2:oe.computeInteriorArea(A,z).areaM2,...e.color?{color:e.color}:{},...e.icon?{icon:e.icon}:{},...m?{}:{height:e.height}};return{walls:z,openings:f,room:O}}function md(r,e,t,i){const a=oe.computeInteriorArea(r.polygon,e);return a.matchedEdges>0&&Math.abs(r.areaM2-a.areaM2)<Math.abs(r.areaM2-a.axisAreaM2)?oe.computeInteriorArea(t,i).areaM2:oe.computeArea(t)}function gd(r,e,t){const i=v=>no({x:v.x*e,y:v.y*e}),a=t.scaleElements??!0,n=r.walls.map(v=>({...v,start:i(v.start),end:i(v.end),...a?{thickness:Math.max(.01,re(v.thickness*e))}:{}})),s=new Map(n.map(v=>[v.id,v])),l=r.openings.map(v=>({...v,offset:re(v.offset*e),...a?{width:Math.max(.1,re(v.width*e)),...v.height?{height:Math.max(.1,re(v.height*e))}:{}}:{}}));let c=0;for(let v=0;v<l.length;v++){const y=l[v],_=s.get(y.wallId);if(!_)continue;const $=Je.fitOpening(_,y.offset,y.width,{walls:n,openings:l,ignoreOpeningId:y.id});(!$.fits||$.overlaps.length>0)&&c++,$.fits&&$.adjusted&&(l[v]={...y,offset:$.offset,width:$.width})}const d=r.rooms.map(v=>{const y=v.polygon.map(i);return{...v,polygon:y,areaM2:md(v,r.walls,y,n)}}),p=r.bindings.map(v=>({...v,position:i(v.position)})),h=(r.furniture??[]).map(v=>({...v,position:i(v.position),...a?{width:Math.max(.05,re(v.width*e)),length:Math.max(.05,re(v.length*e))}:{}})),m=r.background,g=m&&t.adjustBackground?{...m,scale:m.scale*e,offset:i(m.offset)}:m;return{project:{...r,walls:n,openings:l,rooms:d,bindings:p,furniture:h,background:g},openingConflicts:c}}function fd(r,e){return{...r,scale:r.scale*e}}function bd(r,e){const t=new Set(r.walls.map(i=>i.id));return{walls:r.walls.map(i=>bi(i,e)),openings:r.openings.filter(i=>t.has(i.wallId)),rooms:r.rooms.map(i=>bi(i,e))}}function bn(r){const e=r.openings.filter(t=>t.type==="window"||t.type==="french_window").length;return{walls:r.walls.length,doors:r.openings.length-e,windows:e,rooms:r.rooms.length}}function vd(r,e){return{x:re(r.maxX+ro-e.minX),y:re(r.minY-e.minY)}}function xd(r,e){if(e.x===0&&e.y===0)return r;const t=i=>no({x:i.x+e.x,y:i.y+e.y});return{walls:r.walls.map(i=>({...i,start:t(i.start),end:t(i.end)})),openings:r.openings,rooms:r.rooms.map(i=>({...i,polygon:i.polygon.map(t)}))}}function vn(r,e,t){const i=new Map(r.walls.map(c=>[c.id,c])),a=[...r.openings];let n=0,s=0,l=0;for(let c=0;c<a.length;c++){const d=a[c];if(!e.includes(d.id))continue;const p=t(d);if(p===d)continue;const h=i.get(d.wallId);if(!h)continue;const m=Je.fitOpening(h,p.offset,p.width,{walls:r.walls,openings:a,ignoreOpeningId:d.id});if(!m.fits||m.overlaps.length>0){s++;continue}m.adjusted&&l++,a[c]={...p,offset:m.offset,width:m.width},n++}return{openings:n>0?a:null,updated:n,refused:s,adjusted:l}}var yd=Object.defineProperty,U=(r,e,t,i)=>{for(var a=void 0,n=r.length-1,s;n>=0;n--)(s=r[n])&&(a=s(e,t,a)||a);return a&&yd(e,t,a),a};const wd=/^(?:https?:\/\/|\/)[^\s\p{Cc}]*$/iu,_d=2048,oo="home-architect:drawer-collapsed",kd=["home-architect-canvas","home-architect-entity-drawer","home-architect-export-modal","home-architect-save-load-modal","home-architect-room-modal","home-architect-import-modal","home-architect-calibrate-modal","home-architect-rescale-modal","home-architect-orientation-modal"].join(", "),xn="socrate",yn={min:.01,max:100},$d=[{value:.1,key:"panel.thickness.partition"},{value:.15,key:"panel.thickness.wall"},{value:.2,key:"panel.thickness.load_bearing"},{value:.3,key:"panel.thickness.exterior"}],Sd=[{value:.73,key:"panel.opening_width.narrow"},{value:.83,key:"panel.opening_width.bedroom"},{value:.9,key:"panel.opening_width.standard"},{value:1.2,key:"panel.opening_width.window"},{value:1.4,key:"panel.opening_width.double"},{value:2,key:"panel.opening_width.bay"},{value:2.4,key:"panel.opening_width.large_bay"}],Md=[{value:2.1,key:"panel.ceiling.basement"},{value:2.3,key:"panel.ceiling.attic"},{value:2.5,key:"panel.ceiling.standard"},{value:2.7,key:"panel.ceiling.high"},{value:3,key:"panel.ceiling.haussmann"},{value:3.5,key:"panel.ceiling.cathedral"}];function Ji(r,e,t){const i=n=>Math.abs(n-e)<1e-6,a=r.map(n=>({value:n.value,label:o(n.key,{size:t(n.value)})}));return Number.isFinite(e)&&!r.some(n=>i(n.value))&&(a.push({value:e,label:o("panel.measure.current",{size:t(e)})}),a.sort((n,s)=>n.value-s.value)),a.map(n=>u`<option value=${String(n.value)} .selected=${i(n.value)}>${n.label}</option>`)}const so=/^#[0-9a-f]{6}$/i;function Cd(r){const e=r?.color??(r?qo(r.type)?.defaultColor:void 0);return e&&so.test(e)?e:"#94a3b8"}function Qi(r){return r.wallIds.length+r.openingIds.length+r.roomIds.length+r.bindingIds.length+(r.furnitureIds?.length??0)}function Td(r){const e=Object.entries(We).find(([,t])=>t===r);return e?e[0]:null}function Id(r){return r.startsWith("<svg")||r.startsWith("<?xml")&&r.includes("<svg")}function Dd(r,e){const t=r.metersPerPixel;if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t;const i=r.totalWidthMeters;return typeof i=="number"&&Number.isFinite(i)&&i>0&&e.widthPx?i/e.widthPx:null}function Ed(r){return r.length===2?o("panel.common.pair",{first:r[0],second:r[1]}):r.join(", ")}function zd(r){return o("panel.common.quoted",{name:r})}function Ad(){try{const r=localStorage.getItem(oo);return r==="true"?!0:r==="false"?!1:null}catch{return null}}function Pd(r){try{localStorage.setItem(oo,String(r))}catch{}}const Ra=class Ra extends De{constructor(){super(...arguments),this.narrow=!1,this.activeTool="wall",this.currentThickness=.2,this.currentOpeningWidth=.9,this.doorFlipSide=!1,this.doorFlipDirection=!0,this.windowSashCount=1,this.is3DMode=!1,this.isFullscreen=!1,this.isDrawerCollapsed=!1,this.pendingPlacement=null,this.isWizardOpen=!1,this.isImportModalOpen=!1,this.importInitialFile=null,this.importInitialSvg=null,this.isAboutOpen=!1,this.isExportModalOpen=!1,this.isSaveLoadModalOpen=!1,this.isNewPlanModalOpen=!1,this.newPlanName="",this.newPlanCategory=xe,this.isResetModalOpen=!1,this.saveLoadModalTab="save",this.isCalibrateModalOpen=!1,this.calibrationData=null,this.isRescaleModalOpen=!1,this.isOrientationModalOpen=!1,this.rescaleMeasuredMeters=0,this.selectedRoomForEdit=null,this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[]},this.activeDropdown=null,this.pendingMenuFocus=null,this.selectedTypologyTab="",this.isIconPickerOpen=!0,this.updateInfo=null,this.isUpdateModalOpen=!1,this.updateInstallStatus="idle",this.updateInstallError=null,this.logoClickTimes=[],this.secretKeySequence="",this.easterEggCleanup=null,this.updateCheckStarted=!1,this.updateEntitySig=null,this.drawerPreference=null,this.explicitUpdateRequested=!1,this.appliedDarkMode=void 0,this.onDocumentKeyDown=e=>this.handleKeyDown(e),this.onDocumentPaste=e=>this.handlePaste(e),this.onWindowClick=e=>this.closeDropdownOnOutsideClick(e),this.onFullscreenChange=()=>this.syncFullscreenState(),this.onHostPointerDown=()=>{this.matches(":focus-within")||this.focus({preventScroll:!0})},this.i18n=new Ee(this),this.modalFocus=new Xo(this),this.persistence=new Yc(this,{toast:e=>this.showToast(e),activeProjectChanged:()=>{this.clearSelection(),this.pendingPlacement=null}}),this.toastMessage=null,this.toastTimeout=null}get project(){return this.persistence.project}get activeLevel(){const e=this.project.category;return e&&Nt(e)?e:null}get readOnly(){return this.persistence.readOnly}get showDimensions(){return this.project.showDimensions??!0}get showThermalHeatmap(){return this.project.showThermalHeatmap??!1}get showGhostLevel(){return this.project.showGhostLevel??!1}setPreferences(e){this.persistence.setPreferences(e)}handleGridConfigChanged(e){const t=e.detail?.grid;if(!t||typeof t!="object")return;const i=this.project.grid,a={...i};typeof t.size=="number"&&Number.isFinite(t.size)&&(a.size=Math.min(2,Math.max(.05,t.size)));for(const s of["snapToGrid","snapToAngles","snapToElements"]){const l=t[s];typeof l=="boolean"&&(a[s]=l)}(a.size!==i.size||a.snapToGrid!==i.snapToGrid||a.snapToAngles!==i.snapToAngles||a.snapToElements!==i.snapToElements)&&this.setPreferences({grid:a})}handleToolSelected(e){this.selectTool(e.detail.tool)}selectTool(e){this.activeTool=e,e==="door"?this.currentOpeningWidth=.9:e==="window"?this.currentOpeningWidth=this.windowSashCount===2?1.4:.9:e==="french_window"&&(this.currentOpeningWidth=2)}handleDoorConfigChanged(e){if(this.doorFlipSide=e.detail.flipSide,this.doorFlipDirection=e.detail.flipDirection,this.activeTool="door",this.selectedElements.openingIds.length>0&&!this.readOnly){let t=0;const i=Ce(this.project.openings,a=>this.selectedElements.openingIds.includes(a.id)&&a.type==="door"&&(a.flipSide!==e.detail.flipSide||a.flipDirection!==e.detail.flipDirection)?(t++,{...a,flipSide:e.detail.flipSide,flipDirection:e.detail.flipDirection}):a);i&&this.commitProject({...this.project,openings:i})&&this.showToast(Y("panel.toast.doors_updated",t))}}handleOpeningConfigChanged(e){const{flipSide:t,flipDirection:i}=e.detail??{};typeof t=="boolean"&&(this.doorFlipSide=t),typeof i=="boolean"&&(this.doorFlipDirection=i)}handleWindowConfigChanged(e){const{type:t,sashCount:i,width:a}=e.detail;this.activeTool=t,this.currentOpeningWidth=a,this.windowSashCount=i,this.selectedElements.openingIds.length>0&&!this.readOnly&&this.applyWindowFormat(t,i,a)}applyWindowFormat(e,t,i){const a=vn(this.project,this.selectedElements.openingIds,l=>(l.type==="window"||l.type==="french_window")&&(l.type!==e||l.width!==i||l.sashCount!==t)?{...l,type:e,width:i,sashCount:t}:l),n=!!a.openings&&this.commitProject({...this.project,openings:a.openings}),s=[];a.adjusted>0&&s.push(Y("panel.toast.windows_adjusted",a.adjusted)),a.refused>0&&s.push(Y("panel.toast.windows_refused",a.refused)),n?this.showToast(Y("panel.toast.windows_updated",a.updated,{notes:s.length?o("panel.common.parenthesized",{text:s.join(", ")}):""})):a.refused>0&&this.showToast(o("panel.toast.window_format_refused",{notes:s.join(", ")}))}handleWallThicknessChanged(e){if(this.currentThickness=e.detail.thickness,this.activeTool="wall",this.selectedElements.wallIds.length>0&&!this.readOnly){const t=this.wallsWithThickness(e.detail.thickness);t&&this.commitProject({...this.project,walls:t})&&this.showToast(Y("panel.toast.walls_thickness",this.selectedElements.wallIds.length,{size:Re(e.detail.thickness)}))}}wallsWithThickness(e){return Ce(this.project.walls,t=>this.selectedElements.wallIds.includes(t.id)&&t.thickness!==e?{...t,thickness:e}:t)}updateSelectedDoorConfig(e,t){this.doorFlipSide=e,this.doorFlipDirection=t;const i=Ce(this.project.openings,a=>this.selectedElements.openingIds.includes(a.id)&&a.type==="door"&&(a.flipSide!==e||a.flipDirection!==t)?{...a,flipSide:e,flipDirection:t}:a);i&&this.commitProject({...this.project,openings:i})&&this.showToast(o("panel.toast.door_direction"))}updateSelectedWindowConfig(e,t,i){this.windowSashCount=t,this.currentOpeningWidth=i,this.applyWindowFormat(e,t,i)}updateSelectedOpeningsWidth(e){this.currentOpeningWidth=e;const t=vn(this.project,this.selectedElements.openingIds,n=>n.width!==e?{...n,width:e}:n),i=!!t.openings&&this.commitProject({...this.project,openings:t.openings}),a=[];t.adjusted>0&&a.push(Y("panel.toast.windows_adjusted",t.adjusted)),t.refused>0&&a.push(Y("panel.toast.windows_refused",t.refused)),i?this.showToast(Y("panel.toast.doors_updated",t.updated,{notes:a.length?o("panel.common.parenthesized",{text:a.join(", ")}):""})):t.refused>0&&this.showToast(o("panel.toast.window_format_refused",{notes:a.join(", ")}))}updateSelectedWallsThickness(e){this.currentThickness=e;const t=this.wallsWithThickness(e);t&&this.commitProject({...this.project,walls:t})&&this.showToast(o("panel.toast.wall_thickness",{size:Re(e)}))}handleProjectChanged(e){const t=e.detail?.project;if(!t||t===this.project||t.id!==this.project.id)return;if(!this.commitProject({...t,furniture:t.furniture||[]})&&this.readOnly){const a=this.shadowRoot?.querySelector("home-architect-canvas");a&&(a.project=this.project)}}commitProject(e,t={}){const i=e.rooms!==this.project.rooms?dd(e):e;return this.persistence.commit(i,t)}notifyReadOnly(){this.persistence.notifyReadOnly()}handleThicknessChange(e){const t=parseFloat(e.target.value);Number.isFinite(t)&&t>0&&(this.currentThickness=t)}handleOpeningWidthChange(e){const t=parseFloat(e.target.value);Number.isFinite(t)&&t>0&&(this.currentOpeningWidth=t)}get canvas(){return this.renderRoot.querySelector("home-architect-canvas")}async fitCanvasAfterUpdate(){await this.updateComplete;const e=this.canvas;e&&(await e.updateComplete,e.fitToScreen())}viewCenter(){const e=this.canvas;if(!e||this.is3DMode)return null;const t=e.getBoundingClientRect();return t.width<=0||t.height<=0?null:e.clientToWorld(t.left+t.width/2,t.top+t.height/2)}handleCreateRoomFromWizard(e){if(this.readOnly){this.isWizardOpen=!1,this.notifyReadOnly();return}const t=ud(e.detail);if(!t){this.showToast(o("panel.toast.wizard_invalid"));return}const i=pd(this.project,t,this.viewCenter()),{walls:a,openings:n,room:s}=hd(this.project,t,i),l=this.commitProject({...this.project,walls:[...this.project.walls,...a],openings:[...this.project.openings,...n],rooms:[...this.project.rooms,s]});if(this.isWizardOpen=!1,!l)return;this.activeTool="select";const c=(t.addDoor?1:0)+(t.addWindow?1:0)-n.length;this.showToast(o(c>0?"panel.toast.room_created_too_small":"panel.toast.room_created",{name:s.name,area:Ac(s.areaM2)})),this.fitCanvasAfterUpdate()}connectedCallback(){super.connectedCallback(),this.hass&&this.applyHassEnvironment(),this.hasAttribute("tabindex")||this.setAttribute("tabindex","-1"),this.addEventListener("pointerdown",this.onHostPointerDown),document.addEventListener("keydown",this.onDocumentKeyDown),document.addEventListener("paste",this.onDocumentPaste),window.addEventListener("click",this.onWindowClick),document.addEventListener("fullscreenchange",this.onFullscreenChange),document.addEventListener("webkitfullscreenchange",this.onFullscreenChange),this.drawerPreference=Ad(),this.isDrawerCollapsed=this.drawerPreference??this.narrow}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("pointerdown",this.onHostPointerDown),document.removeEventListener("keydown",this.onDocumentKeyDown),document.removeEventListener("paste",this.onDocumentPaste),window.removeEventListener("click",this.onWindowClick),document.removeEventListener("fullscreenchange",this.onFullscreenChange),document.removeEventListener("webkitfullscreenchange",this.onFullscreenChange),this.toastTimeout&&clearTimeout(this.toastTimeout),this.toastTimeout=null,this.toastMessage=null,this.easterEggCleanup?.(),this.easterEggCleanup=null,this.secretKeySequence=""}shouldUpdate(e){e.has("hass")&&this.hass&&this.applyHassEnvironment();const t=e.has(ga);if(this.hasUpdated&&!this.explicitUpdateRequested&&!t&&e.size===1&&e.has("hass")){const i=e.get("hass");if(i&&this.hass&&!this.hassAffectsPanel(i,this.hass)&&(this.propagateHass(),this.handleHassChange(),!this.explicitUpdateRequested&&e.size===1))return!1}return this.explicitUpdateRequested=!1,super.shouldUpdate(e)}requestUpdate(...e){e[0]===void 0&&(this.explicitUpdateRequested=!0),super.requestUpdate(...e)}applyHassEnvironment(){Fo(this.hass.locale?.language??this.hass.language);const e=this.hass.themes?.darkMode;(e!==this.appliedDarkMode||!this.hasAttribute("scheme"))&&(this.appliedDarkMode=e,Ke(this,this.hass))}hassAffectsPanel(e,t){if(xt(e)!==xt(t)||e.dockedSidebar!==t.dockedSidebar||e.language!==t.language)return!0;const i=this.selectedElements.bindingIds[0],a=i?this.project.bindings.find(n=>n.id===i)?.entityId:void 0;return a!==void 0&&e.states?.[a]!==t.states?.[a]}propagateHass(){for(const e of this.renderRoot.querySelectorAll(kd))e.hass=this.hass}handleHassChange(){this.persistence.start(),this.maybeRefreshUpdateInfo()}willUpdate(e){super.willUpdate(e),this.hass&&this.readOnly&&(this.activeTool!=="select"&&(this.activeTool="select"),this.pendingPlacement&&(this.pendingPlacement=null)),e.has("narrow")&&this.drawerPreference===null&&(this.isDrawerCollapsed=this.narrow),this.isConnected&&this.persistence.prefetchGhost(this.ghostLevel())}updated(e){if(super.updated(e),e.has("hass")&&this.hass&&this.handleHassChange(),this.pendingMenuFocus&&this.activeDropdown){const t=this.renderRoot.querySelector(`#menu-${this.activeDropdown}`);t&&hi(t,this.pendingMenuFocus),this.pendingMenuFocus=null}}syncFullscreenState(){const e=!!(document.fullscreenElement||document.webkitFullscreenElement);this.isFullscreen=e,this.classList.toggle("is-fullscreen",e)}closeDropdownOnOutsideClick(e){if(!this.activeDropdown)return;e.composedPath().some(i=>i instanceof HTMLElement&&i.classList.contains("dropdown-menu-wrapper"))||this.closeDropdown({restoreFocus:!1})}maybeRefreshUpdateInfo(){if(!xt(this.hass))return;const e=cn(this.hass,this.updateInfo?.entityId??null);this.updateCheckStarted&&e===this.updateEntitySig||(this.updateCheckStarted=!0,this.updateEntitySig=e,this.refreshUpdateInfo())}async refreshUpdateInfo(){try{const e=await Dc(this.hass);this.updateInfo=e,this.updateEntitySig=cn(this.hass,e?.entityId??null),e?.available||(this.isUpdateModalOpen=!1)}catch(e){console.debug("[home-architect] Vérification des mises à jour impossible :",e)}}openHaUpdates(){this.isUpdateModalOpen=!1,this.isAboutOpen=!1,this.persistence.flushDrafts(),Ec(Cc)}reloadPage(){this.persistence.flushDrafts(),window.location.reload()}async triggerEasterEgg(){try{const{launchSocrateRulesEasterEgg:e}=await No(async()=>{const{launchSocrateRulesEasterEgg:t}=await import("./chunks/easter-egg-8IGRpTk8.js");return{launchSocrateRulesEasterEgg:t}},[],import.meta.url);if(!this.isConnected)return;this.easterEggCleanup=e(this.shadowRoot??this)}catch(e){console.debug("[home-architect] Easter egg indisponible :",e)}}handleLogoClick(){const e=Date.now();this.logoClickTimes=this.logoClickTimes.filter(t=>e-t<2500),this.logoClickTimes.push(e),this.logoClickTimes.length>=5&&(this.logoClickTimes=[],this.triggerEasterEgg())}trackSecretWord(e){e.key.length===1&&(this.secretKeySequence=(this.secretKeySequence+e.key.toLowerCase()).slice(-xn.length),this.secretKeySequence===xn&&(this.secretKeySequence="",this.triggerEasterEgg()))}openUpdateModal(){this.isUpdateModalOpen=!0}closeUpdateModal(){this.isUpdateModalOpen=!1,this.updateInstallStatus="idle",this.updateInstallError=null}async handleInstallUpdate(){if(this.updateInfo?.latestVersion){this.updateInstallStatus="installing",this.updateInstallError=null;try{this.persistence.flushDrafts(),(await Bo(this.hass,this.updateInfo.latestVersion)).success?(this.updateInstallStatus="success",this.showToast(o("panel.update.success_title"))):(this.updateInstallStatus="error",this.updateInstallError=o("panel.update.error_title"))}catch(e){console.error("[home-architect] Update installation error:",e),this.updateInstallStatus="error",this.updateInstallError=e?.message||String(e)}}}async handleRestartHa(){try{this.showToast(o("panel.update.restarting")),await this.hass.callService("homeassistant","restart"),this.closeUpdateModal()}catch(e){console.error("[home-architect] Failed to restart Home Assistant:",e),this.showToast(e?.message||"Erreur lors du redémarrage")}}openAbout(e){e.stopPropagation(),this.closeDropdown({restoreFocus:!1}),this.isAboutOpen=!0}toggleHaSidebar(){this.dispatchEvent(new CustomEvent("hass-toggle-menu",{bubbles:!0,composed:!0}))}get showMenuButton(){return this.narrow||this.hass?.dockedSidebar==="always_hidden"}toggleDrawer(){this.isDrawerCollapsed=!this.isDrawerCollapsed,this.drawerPreference=this.isDrawerCollapsed,Pd(this.isDrawerCollapsed)}showToast(e){this.toastMessage=e,this.toastTimeout&&clearTimeout(this.toastTimeout),this.toastTimeout=setTimeout(()=>{this.toastMessage=null,this.toastTimeout=null},4500)}openImportModal(e={}){if(this.readOnly){this.notifyReadOnly();return}this.importInitialFile=e.file??null,this.importInitialSvg=e.svg??null,this.isImportModalOpen=!0}closeImportModal(){this.isImportModalOpen=!1,this.importInitialFile=null,this.importInitialSvg=null}handleBackgroundDropped(e){const{file:t,dataUrl:i}=e.detail??{};let a=t instanceof Blob?t:null;if(!a&&Ut(i))try{a=ui(i)}catch{a=null}a?this.openImportModal({file:a}):this.showToast(o("panel.toast.image_unreadable"))}isStudioEvent(e){if(qa(e,this))return!0;const t=Ge(e);return(t===document.body||t===document.documentElement)&&this.isConnected&&this.getClientRects().length>0}handlePaste(e){if(e.defaultPrevented||!e.clipboardData||this.isModalOpen()||ea(e)||!this.isStudioEvent(e))return;const i=Array.from(e.clipboardData.items).find(n=>n.kind==="file"&&n.type.startsWith("image/"))?.getAsFile()??null;if(i){e.preventDefault(),this.openImportModal({file:i});return}const a=e.clipboardData.getData("text/plain")?.trim()??"";if(Id(a))e.preventDefault(),this.openImportModal({svg:a});else if(Ut(a)&&/^data:image\//i.test(a)){e.preventDefault();try{this.openImportModal({file:ui(a)})}catch{this.showToast(o("panel.toast.pasted_image_unreadable"))}}else/\.(png|jpe?g|gif|svg|webp)(\?.*)?$/i.test(a)&&(e.preventDefault(),this.loadExternalBackground(a))}async loadExternalBackground(e){if(!this.persistence.ready)return;if(this.readOnly){this.notifyReadOnly();return}const t=this.project.id,i=await this.externalBackground(e);!i||this.project.id!==t||this.commitProject({...this.project,background:i})&&(this.activeTool="calibrate",this.showToast(o("panel.toast.pasted_url_loaded")))}externalBackground(e){return e.length>_d||!wd.test(e)?(this.showToast(o("panel.toast.image_url_unsupported")),Promise.resolve(null)):new Promise(t=>{const i=new Image;i.onload=()=>t({imageUrl:e,opacity:.4,visible:!0,offset:{x:0,y:0},scale:1,rotation:0,widthPx:i.naturalWidth,heightPx:i.naturalHeight}),i.onerror=()=>{this.showToast(o("panel.toast.image_load_error")),t(null)},i.src=e})}uploadImportBackground(e,t,i){const a=t.background;if(!a)return Promise.resolve(null);const n=Number.isFinite(t.opacity)?t.opacity:i;return this.persistence.withBusy(o("panel.persist.uploading_background"),()=>this.persistence.uploadImportedBackground(e,a,n))}async handleImportConfirmed(e){this.closeImportModal();const t=e.detail;if(!t)return;if(this.readOnly){this.notifyReadOnly();return}const i=t.isSvgVectorized&&t.svgInterpretation?.success?t.svgInterpretation:null;if(i){await this.importVectorizedPlan(t,i);return}const a=this.project.id,n=await this.uploadImportBackground(a,t,.4);if(!n||this.project.id!==a)return;const s=t.mode==="auto_dimension"?Dd(t,n):null,l=s!==null?{...n,scale:s*this.project.pixelsPerMeter}:n;this.commitProject({...this.project,background:l})&&(s!==null?(this.activeTool="wall",this.showToast(o("panel.toast.import_scaled"))):(this.activeTool="calibrate",this.showToast(o("panel.toast.import_calibrate"))),this.fitCanvasAfterUpdate())}async importVectorizedPlan(e,t){const i=bd(t,ci(this.project)),a=!!e.background&&e.keepSvgBackground!==!1;if(i.walls.length+i.rooms.length===0&&!a){this.showToast(o("panel.toast.import_empty"));return}let n="replace";if(!si(this.project)){const $=await this.askVectorizedImportMode(i,e.targetLevel);if($===null)return;n=$}if(n==="new"){const $=e.targetLevel||this.project.category||xe;if(!await this.persistence.createPlan(o("panel.import.new_plan_name"),$,{confirmed:!0}))return}const s=this.project.id,l=n==="add"&&!!this.project.background,c=a&&!l?await this.uploadImportBackground(s,e,.25):null;if(this.project.id!==s)return;const d=this.project;let p={x:0,y:0};if(n==="add"){const $=ma(d),z=ma({walls:i.walls,rooms:i.rooms,bindings:[],furniture:[]});$&&z&&(p=vd($,z))}const h=xd(i,p),m=Number.isFinite(e.metersPerPixel)&&e.metersPerPixel>0?e.metersPerPixel:t.metersPerUnit,g=c&&Number.isFinite(m)&&m>0?{...c,scale:m*d.pixelsPerMeter,offset:p}:c??d.background,v=n==="add"?{walls:[...d.walls,...h.walls],openings:[...d.openings,...h.openings],rooms:[...d.rooms,...h.rooms]}:h;if(!this.commitProject({...d,...v,background:g}))return;this.activeTool="select";const y=bn(h),_=[o(n==="add"?"panel.toast.svg_converted_added":"panel.toast.svg_converted",{walls:Y("panel.count.walls",y.walls),doors:Y("panel.count.doors",y.doors),windows:Y("panel.count.windows",y.windows),rooms:Y("panel.count.rooms",y.rooms)})];a&&l?_.push(o("panel.toast.svg_layer_kept_existing")):a&&!c&&_.push(o("panel.toast.svg_layer_not_imported")),this.showToast(_.join(" ")),this.fitCanvasAfterUpdate()}async askVectorizedImportMode(e,t){const i=bn(e),a=pe(t||this.project.category),n=await this.persistence.ask({icon:"📐",title:o("panel.import.ask.title"),subtitle:zd(this.project.name),message:o("panel.import.ask.message",{walls:Y("panel.count.walls",i.walls),openings:Y("panel.count.openings",i.doors+i.windows),rooms:Y("panel.count.rooms",i.rooms),current_walls:Y("panel.count.walls",this.project.walls.length),current_rooms:Y("panel.count.rooms",this.project.rooms.length)}),details:[o("panel.import.ask.detail_replace"),o("panel.import.ask.detail_add"),o("panel.import.ask.detail_new",{level:a}),o("panel.import.ask.detail_undo")],actions:[{id:"new",label:o("panel.import.ask.new"),icon:"📄",kind:"secondary"},{id:"add",label:o("panel.import.ask.add"),icon:"➕",kind:"secondary"},{id:"replace",label:o("panel.import.ask.replace"),icon:"♻️",kind:"danger"}],tone:"warning"});return n==="replace"||n==="add"||n==="new"?n:null}async handleImportProjectBackup(e){this.closeImportModal();const t=e.detail?.project;t&&await this.persistence.importProject(t)}handleRequestCalibration(e){const{worldDistance:t,defaultMeters:i}=e.detail??{};Number.isFinite(t)&&t>0&&(this.calibrationData={worldDistance:t,defaultMeters:Number.isFinite(i)&&i>0?i:t},this.isCalibrateModalOpen=!0)}closeCalibrateModal(){this.isCalibrateModalOpen=!1,this.calibrationData=null}handleCalibrateConfirmed(e){const t=e.detail;if(this.closeCalibrateModal(),!t)return;const i=Number.isFinite(t.scaleFactor)&&t.scaleFactor>0?t.scaleFactor:this.project.pixelsPerMeter/t.pixelsPerMeter;if(!oa(i)){this.showToast(o("panel.toast.calibration_refused",this.scaleLimits()));return}if(Math.abs(i-1)>=1e-4)if(t.mode==="project"){if(!this.applyScale(i,!0,o("panel.scale.calibrated")))return}else{const a=this.project.background;if(!a){this.showToast(o("panel.toast.no_background_to_calibrate"));return}if(!this.commitProject({...this.project,background:fd(a,i)}))return;this.showToast(o("panel.toast.background_calibrated",{factor:dn(i)}))}this.activeTool="wall"}handleRequestRescale(e){const t=e.detail?.measuredMeters;Number.isFinite(t)&&t>0&&(this.rescaleMeasuredMeters=t,this.isRescaleModalOpen=!0)}handleRescaleConfirmed(e){const{scaleFactor:t,adjustBackground:i,scaleElements:a}=e.detail??{};if(this.isRescaleModalOpen=!1,!oa(t)){this.showToast(o("panel.toast.rescale_refused",this.scaleLimits()));return}Math.abs(t-1)<1e-4||this.applyScale(t,i===!0,o("panel.scale.rescaled"),a!==!1)&&(this.activeTool="select")}openOrientationModal(){this.closeDropdown({restoreFocus:!1}),this.isOrientationModalOpen=!0}handleOrientationApplied(e){const{northAngle:t,showCompass:i}=e.detail??{};this.isOrientationModalOpen=!1,this.setPreferences({northAngle:t,showCompass:i})}scaleLimits(){return{min:R(yn.min),max:R(yn.max)}}applyScale(e,t,i,a=!0){const{project:n,openingConflicts:s}=gd(this.project,e,{adjustBackground:t,scaleElements:a});if(!this.commitProject(n))return!1;const l=o("panel.toast.scaled",{label:i,factor:dn(e),walls:Y("panel.count.walls",n.walls.length),rooms:Y("panel.count.rooms",n.rooms.length)});return this.showToast(s>0?`${l} ${Y("panel.toast.scale_conflicts",s)}`:l),this.fitCanvasAfterUpdate(),!0}handleOpacityChange(e){const t=parseFloat(e.target.value),i=this.project.background;i&&Number.isFinite(t)&&t!==i.opacity&&this.commitProject({...this.project,background:{...i,opacity:t}},{coalesceKey:"background-opacity"})}async handleDefaultCeilingChange(e){const t=ci(this.project);if(!Number.isFinite(e)||e<=0||Math.abs(e-t)<1e-6||!this.commitProject({...this.project,defaultCeilingHeight:e}))return;this.showToast(o("panel.toast.default_ceiling",{height:ft(e)}));const i=ld(this.project,t);if(i.rooms+i.walls===0)return;const a=Ed([...i.rooms>0?[Y("panel.count.rooms",i.rooms)]:[],...i.walls>0?[Y("panel.count.walls",i.walls)]:[]]);if(await this.persistence.ask({icon:"📐",title:o("panel.ceiling.ask.title"),message:o("panel.ceiling.ask.message",{items:a,previous:ft(t),next:ft(e)}),details:[o("panel.ceiling.ask.detail")],actions:[{id:"apply",label:o("panel.common.apply"),icon:"✅",kind:"primary"}],cancelLabel:o("panel.ceiling.ask.keep")})!=="apply")return;const s=cd(this.project,t);s!==this.project&&this.commitProject(s)&&this.showToast(o("panel.toast.ceiling_inherited",{items:a}))}handleSaveRoom(e){const t=e.detail;if(this.selectedRoomForEdit=null,!t)return;const i=Ce(this.project.rooms,a=>{if(a.id!==t.roomId)return a;const n={...a,name:t.name,color:t.color};return t.inheritHeight?delete n.height:n.height=t.height,t.area_id?n.area_id=t.area_id:delete n.area_id,n.name===a.name&&n.color===a.color&&n.height===a.height&&n.area_id===a.area_id?a:n});i&&this.commitProject({...this.project,rooms:i})&&this.showToast(o("panel.toast.room_updated",{name:t.name,height:ft(t.height)}))}handleDeleteRoom(e){const t=e.detail?.roomId;this.selectedRoomForEdit=null;const i=this.project.rooms.filter(a=>a.id!==t);i.length===this.project.rooms.length||!this.commitProject({...this.project,rooms:i})||(this.selectedElements.roomIds.includes(t)&&(this.selectedElements={...this.selectedElements,roomIds:this.selectedElements.roomIds.filter(a=>a!==t)}),this.showToast(o("panel.toast.room_deleted")))}openSelectedRoomModal(e){const t=this.project.rooms.find(i=>i.id===e);t&&(this.selectedRoomForEdit=t)}handleUndo(){this.persistence.undo()&&(this.clearSelection(),this.showToast(o("panel.toast.undone")))}handleRedo(){this.persistence.redo()&&(this.clearSelection(),this.showToast(o("panel.toast.redone")))}ghostLevel(){if(!this.showGhostLevel)return null;const e=this.project.ghostLevelId;return e&&Nt(e)&&e!==this.activeLevel?e:Uo(this.activeLevel)}rotateSelectedFurniture(){const e=this.selectedElements.furnitureIds??[];if(e.length===0)return;const t=Ce(this.project.furniture??[],i=>e.includes(i.id)?{...i,rotation:((i.rotation||0)%360+450)%360}:i);t&&this.commitProject({...this.project,furniture:t})&&this.showToast(o("panel.toast.furniture_rotated"))}updateSelectedFurnitureColor(e){const t=this.selectedElements.furnitureIds??[];if(t.length===0||e!==null&&!so.test(e))return;const i=Ce(this.project.furniture??[],a=>{if(!t.includes(a.id)||(a.color??null)===e)return a;const n={...a};return e?n.color=e:delete n.color,n});i&&this.commitProject({...this.project,furniture:i},{coalesceKey:"furniture-color"})}liveSelection(){const{walls:e,openings:t,rooms:i,bindings:a,furniture:n=[]}=this.project,s=this.selectedElements,l=c=>{const d=new Set(c.map(p=>p.id));return p=>d.has(p)};return{wallIds:s.wallIds.filter(l(e)),openingIds:s.openingIds.filter(l(t)),roomIds:s.roomIds.filter(l(i)),bindingIds:s.bindingIds.filter(l(a)),furnitureIds:(s.furnitureIds??[]).filter(l(n))}}handleDeleteSelected(){const e=this.liveSelection(),t=Qi(e);if(t===0){this.clearSelection();return}const{wallIds:i,openingIds:a,roomIds:n,bindingIds:s}=e,l=e.furnitureIds??[];this.commitProject({...this.project,walls:this.project.walls.filter(d=>!i.includes(d.id)),openings:this.project.openings.filter(d=>!a.includes(d.id)&&!i.includes(d.wallId)),rooms:this.project.rooms.filter(d=>!n.includes(d.id)),bindings:this.project.bindings.filter(d=>!s.includes(d.id)),furniture:(this.project.furniture||[]).filter(d=>!l.includes(d.id))})&&(this.clearSelection(),this.showToast(Y("panel.toast.elements_deleted",t)))}clearSelection(){this.selectedElements={wallIds:[],openingIds:[],roomIds:[],bindingIds:[],furnitureIds:[]}}toggleDropdown(e,t,i="first"){if(t?.stopPropagation(),this.activeDropdown===e){this.closeDropdown({restoreFocus:!1});return}this.activeDropdown=e,this.pendingMenuFocus=e==="level"&&i==="first"?"checked":i,e==="level"&&this.persistence.refreshSummaries()}closeDropdown(e){const t=this.activeDropdown;t&&(e.restoreFocus&&this.renderRoot.querySelector(`#menu-${t}-trigger`)?.focus(),this.activeDropdown=null,this.pendingMenuFocus=null)}menuAction(e){return()=>{this.closeDropdown({restoreFocus:!0}),e()}}handleTriggerKeydown(e,t){if(e.key!=="ArrowDown"&&e.key!=="ArrowUp")return;e.preventDefault();const i=e.key==="ArrowUp"?"last":"first";if(this.activeDropdown!==t){this.toggleDropdown(t,void 0,i);return}const a=this.renderRoot.querySelector(`#menu-${t}`);a&&hi(a,i)}handleMenuKeydown(e){const t=e.currentTarget;In(e,t,i=>this.closeDropdown(i))}getActiveTypology(){if(this.selectedTypologyTab)return this.selectedTypologyTab;if(this.selectedElements.bindingIds.length>0){const e=this.project.bindings.find(t=>t.id===this.selectedElements.bindingIds[0]);if(e){const t=e.entityId.split(".")[0];if(zt[t])return t}}return"light"}updateSelectedBindingIcon(e,t){if(!this.selectedElements.bindingIds||this.selectedElements.bindingIds.length===0)return;const i=this.selectedElements.bindingIds[0],a=Ce(this.project.bindings,n=>n.id===i&&(n.icon!==e||n.mdiIcon!==t)?{...n,icon:e,mdiIcon:t}:n);a&&this.commitProject({...this.project,bindings:a})&&this.showToast(o("panel.toast.icon_applied",{icon:e}))}getSelectedSummary(e){const t=[];if(e.wallIds.length>0&&t.push(Y("panel.count.walls",e.wallIds.length)),e.openingIds.length>0&&t.push(Y("panel.count.sashes",e.openingIds.length)),e.roomIds.length>0&&t.push(Y("panel.count.rooms",e.roomIds.length)),e.bindingIds.length===1){const a=this.project.bindings.find(n=>n.id===e.bindingIds[0]);t.push(a?Wa(a,this.hass?.states):Y("panel.count.entities",1))}else e.bindingIds.length>1&&t.push(Y("panel.count.entities",e.bindingIds.length));const i=e.furnitureIds??[];if(i.length===1){const a=(this.project.furniture??[]).find(n=>n.id===i[0]);t.push(a?Ga(a):Y("panel.count.furniture",1))}else i.length>1&&t.push(Y("panel.count.furniture",i.length));return t.join(", ")}handleKeyDown(e){if(typeof e.key!="string"||e.defaultPrevented||!qa(e,this)&&!Va(e,{host:this,allowWhenModalOpen:!0}))return;const t=e.key.toLowerCase();if(Ya(e)&&!e.shiftKey&&t==="s"){e.preventDefault(),this.isModalOpen()||this.quickSave();return}if(this.persistence.handleBlockingKey(e))return;if(e.key==="Escape"){this.handleEscape(e);return}if(!Va(e,{host:this,modalOpen:this.isModalOpen()}))return;if(Ya(e)){t==="z"&&!e.shiftKey?(e.preventDefault(),this.handleUndo()):(t==="y"||t==="z"&&e.shiftKey)&&(e.preventDefault(),this.handleRedo());return}if(e.altKey&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&e.code==="KeyN"){e.preventDefault(),this.openNewPlanModal();return}if(Ho(e))return;if(this.trackSecretWord(e),e.key==="Delete"||e.key==="Backspace"){Qi(this.liveSelection())>0&&(e.preventDefault(),this.handleDeleteSelected());return}if(e.shiftKey)return;const i=Td(t);if(i&&(e.preventDefault(),!e.repeat)){if(i!=="select"&&this.readOnly){this.notifyReadOnly();return}this.selectTool(i)}}handleEscape(e){if(this.closeTopModal()){e.preventDefault();return}if(this.activeDropdown){e.preventDefault(),this.closeDropdown({restoreFocus:!0});return}if(!ea(e)){if(this.pendingPlacement){e.preventDefault(),this.pendingPlacement=null;return}this.isFullscreen&&this.toggleFullscreen(),this.clearSelection()}}closeTopModal(){if(this.isUpdateModalOpen)this.updateInstallStatus!=="installing"&&this.closeUpdateModal();else if(this.isAboutOpen)this.isAboutOpen=!1;else if(this.isNewPlanModalOpen)this.isNewPlanModalOpen=!1;else if(this.isResetModalOpen)this.isResetModalOpen=!1;else if(this.isWizardOpen)this.isWizardOpen=!1;else if(this.isExportModalOpen)this.isExportModalOpen=!1;else if(this.isSaveLoadModalOpen)this.isSaveLoadModalOpen=!1;else if(this.selectedRoomForEdit)this.selectedRoomForEdit=null;else if(this.isCalibrateModalOpen)this.closeCalibrateModal();else if(this.isRescaleModalOpen)this.isRescaleModalOpen=!1;else if(this.isOrientationModalOpen)this.isOrientationModalOpen=!1;else if(this.isImportModalOpen)this.closeImportModal();else return!1;return!0}handleDrawerItemPicked(e){const t=e.detail?.payload;if(t){if(this.readOnly){this.notifyReadOnly();return}this.pendingPlacement=t,this.is3DMode=!1,this.narrow&&(this.isDrawerCollapsed=!0),this.showToast(o("panel.toast.tap_to_place",{name:this.placementLabel(t)}))}}placementLabel(e){return e.kind==="furniture"?Ga({type:e.furnitureType,name:""}):Wa({entityId:e.entityId},this.hass?.states)}handlePlacementDone(){this.pendingPlacement=null}async toggleFullscreen(){const e=!!(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement);if(!this.isFullscreen&&!e){try{const t=this||document.documentElement;t.requestFullscreen?await t.requestFullscreen():t.webkitRequestFullscreen?await t.webkitRequestFullscreen():t.mozRequestFullScreen?await t.mozRequestFullScreen():t.msRequestFullscreen&&await t.msRequestFullscreen()}catch(t){console.warn("Mode plein écran natif indisponible, utilisation du mode étendu:",t)}this.isFullscreen=!0,this.classList.add("is-fullscreen"),this.showToast(o("panel.toast.fullscreen_on"))}else{try{const t=document;(t.fullscreenElement||t.webkitFullscreenElement||t.mozFullScreenElement||t.msFullscreenElement)&&(t.exitFullscreen?await t.exitFullscreen():t.webkitExitFullscreen?await t.webkitExitFullscreen():t.mozCancelFullScreen?await t.mozCancelFullScreen():t.msExitFullscreen&&await t.msExitFullscreen())}catch(t){console.warn("Erreur lors de la sortie du mode plein écran:",t)}this.isFullscreen=!1,this.classList.remove("is-fullscreen"),this.showToast(o("panel.toast.fullscreen_off"))}}openNewPlanModal(){if(this.readOnly){this.notifyReadOnly();return}const e=this.activeLevel??xe;this.newPlanName=o("panel.new_plan.default_name",{level:pe(e)}),this.newPlanCategory=e,this.isNewPlanModalOpen=!0}async handleConfirmNewPlan(){const e=this.newPlanName.trim()||o("panel.new_plan.fallback_name"),t=this.newPlanCategory||xe;await this.persistence.createPlan(e,t)&&(this.isNewPlanModalOpen=!1)}openResetModal(){if(this.readOnly){this.notifyReadOnly();return}this.isResetModalOpen=!0}handleConfirmResetPlan(){this.isResetModalOpen=!1,!(si(this.project)||!this.commitProject({...this.project,walls:[],openings:[],rooms:[],bindings:[],furniture:[],background:void 0}))&&(this.clearSelection(),this.showToast(o("panel.toast.plan_reset")),this.fitCanvasAfterUpdate())}openWizard(){if(this.readOnly){this.notifyReadOnly();return}this.isWizardOpen=!0}openSaveModal(){if(this.readOnly){this.notifyReadOnly();return}this.saveLoadModalTab="save",this.isSaveLoadModalOpen=!0}openLoadModal(){this.saveLoadModalTab="load",this.isSaveLoadModalOpen=!0}async handleLoadProject(e){this.isSaveLoadModalOpen=!1;const t=e.detail?.projectId;typeof t!="string"||t===""||await this.persistence.openPlan(t,{reload:!0})}async handleSaveConfirmed(e){this.isSaveLoadModalOpen=!1,await this.persistence.saveFromDialog(e.detail)}async quickSave(){if(this.readOnly){this.notifyReadOnly();return}if(this.persistence.ready){if(this.project.revision===void 0){this.openSaveModal();return}await this.persistence.save(this.project.id)}}async saveAllDirty(){await this.persistence.saveAllDirty()}handleExportFrameChanged(e){this.persistence.setExportFrame(e.detail?.frame)}handleProjectPublished(e){this.persistence.setPublish(e.detail?.publish)}handleProjectUnpublished(e){const t=e.detail?.projectId;typeof t=="string"&&this.persistence.clearPublish(t)}handleExportSaveRequested(){if(this.project.revision===void 0){this.isExportModalOpen=!1,this.openSaveModal();return}this.persistence.save(this.project.id)}isModalOpen(){return this.isWizardOpen||this.isImportModalOpen||this.isExportModalOpen||this.isSaveLoadModalOpen||this.isNewPlanModalOpen||this.isResetModalOpen||this.isCalibrateModalOpen||this.isRescaleModalOpen||this.isOrientationModalOpen||this.isUpdateModalOpen||this.isAboutOpen||this.selectedRoomForEdit!==null||this.persistence.isBlocking()}updateBanners(){if(!this.updateInfo?.reloadRequired)return[];const e=this.updateInfo.installedVersion;return[{key:"reload-required",kind:"info",dismissible:!1,message:()=>o("panel.notice.reload_required",{version:e,bundles:eo()||jt}),actions:[{label:()=>o("panel.common.reload"),run:()=>this.reloadPage()}]}]}renderDirtyDot(){const e=o("panel.common.unsaved_changes");return u`<span class="dirty-dot" title=${e}><span aria-hidden="true">●</span><span class="visually-hidden">${e}</span></span>`}levelMenuName(e){const t=pe(e.id);return e.fullLabel&&e.fullLabel!==t?o("panel.level.name_with_full",{label:t,full:e.fullLabel}):t}renderLevelMenu(){const e=this.project.id,t=(a,n)=>u`
      <button
        role="menuitemradio"
        aria-checked=${a.id===e?"true":"false"}
        class="dropdown-item ${n.sub?"sub":""} ${a.id===e?"active":""}"
        @click=${this.menuAction(()=>{this.persistence.openPlan(a.id)})}
      >
        ${n.icon?u`<span aria-hidden="true">${n.icon}</span>`:w}
        ${n.levelName?u`<span>${n.levelName}</span>`:w}
        <span class="level-plan-name" title=${a.name}>${a.name}</span>
        ${a.dirty?this.renderDirtyDot():w}
        ${a.stored?w:u`<span class="dropdown-item-meta">${o("panel.level.not_saved")}</span>`}
        ${a.id===e?u`<span class="dropdown-item-check" aria-hidden="true">✓</span>`:w}
      </button>
    `,i=this.persistence.ws.customPlans();return u`
      <div id="menu-level" class="dropdown-menu-popup level-menu" role="menu" aria-labelledby="menu-level-trigger"
        @keydown=${this.handleMenuKeydown}>
        ${ia.map(a=>{const n=this.levelMenuName(a),s=this.persistence.ws.plansForCategory(a.id);return s.length===0?u`
              <button
                role="menuitem"
                class="dropdown-item"
                ?disabled=${this.readOnly}
                title=${o("panel.level.empty_title")}
                @click=${this.menuAction(()=>{this.persistence.switchToLevel(a.id)})}
              >
                <span aria-hidden="true">${a.icon}</span>
                <span>${n}</span>
                <span class="dropdown-item-meta">${o("panel.level.empty")}</span>
              </button>
            `:s.length===1?t(s[0],{sub:!1,icon:a.icon,levelName:n}):u`
            <div role="group" aria-labelledby="level-group-${a.id}">
              <div class="dropdown-group-label" id="level-group-${a.id}">
                <span aria-hidden="true">${a.icon}</span><span>${n}</span>
              </div>
              ${s.map(l=>t(l,{sub:!0}))}
            </div>
          `})}
        ${i.length>0?u`
          <div class="dropdown-divider" role="separator"></div>
          <div role="group" aria-labelledby="level-group-custom">
            <div class="dropdown-group-label" id="level-group-custom">
              <span aria-hidden="true">${pi.icon}</span><span>${o("panel.level.other_plans")}</span>
            </div>
            ${i.map(a=>t(a,{sub:!0}))}
          </div>
        `:w}
      </div>
    `}renderMenuTrigger(e,t,i,a,n){const s=this.activeDropdown===e;return u`
      <button
        id="menu-${e}-trigger"
        class="btn-dropdown-trigger ${s?"active":""}"
        aria-haspopup="menu"
        aria-expanded=${s?"true":"false"}
        aria-controls=${s?`menu-${e}`:w}
        aria-label=${n??i}
        title=${n??i}
        @click=${l=>this.toggleDropdown(e,l)}
        @keydown=${l=>this.handleTriggerKeydown(l,e)}
      >
        <span aria-hidden="true">${t}</span>
        ${a??u`<span class="btn-label">${i}</span>`}
        <span class="chevron" aria-hidden="true">▾</span>
      </button>
    `}renderMenuItem(e){const t=e.checked!==void 0;return u`
      <button
        role=${t?"menuitemcheckbox":"menuitem"}
        aria-checked=${t?e.checked?"true":"false":w}
        class="dropdown-item ${e.checked?"active":""} ${e.danger?"danger":""}"
        ?disabled=${e.disabled===!0}
        @click=${this.menuAction(e.run)}
      >
        <span aria-hidden="true">${e.icon}</span>
        <span>${e.label}</span>
        ${e.checked?u`<span class="dropdown-item-check" aria-hidden="true">✓</span>`:w}
      </button>
    `}renderFileMenu(e,t,i){return u`
      <div id="menu-file" class="dropdown-menu-popup" role="menu" aria-labelledby="menu-file-trigger" @keydown=${this.handleMenuKeydown}>
        ${this.renderMenuItem({icon:"📄",label:o("panel.menu.file.new"),disabled:this.readOnly,run:()=>this.openNewPlanModal()})}
        ${this.renderMenuItem({icon:"📂",label:o("panel.menu.file.open"),run:()=>this.openLoadModal()})}
        ${this.renderMenuItem({icon:"💾",label:o("panel.menu.file.save"),disabled:this.readOnly||!e,run:()=>this.openSaveModal()})}
        ${t>1||t===1&&!i?this.renderMenuItem({icon:"🗂️",label:o("panel.menu.file.save_all",{count:R(t)}),disabled:this.readOnly||!e,run:()=>{this.saveAllDirty()}}):w}
        <div class="dropdown-divider" role="separator"></div>
        ${this.renderMenuItem({icon:"📥",label:o("panel.menu.file.import"),disabled:this.readOnly,run:()=>this.openImportModal()})}
        ${this.renderMenuItem({icon:"📤",label:o("panel.menu.file.export"),run:()=>{this.isExportModalOpen=!0}})}
        <div class="dropdown-divider" role="separator"></div>
        ${this.renderMenuItem({icon:"🗑️",label:o("panel.menu.reset"),danger:!0,disabled:this.readOnly,run:()=>this.openResetModal()})}
      </div>
    `}renderPlanMenu(){return u`
      <div id="menu-plan" class="dropdown-menu-popup wide" role="menu" aria-labelledby="menu-plan-trigger" @keydown=${this.handleMenuKeydown}>
        ${this.renderMenuItem({icon:"📐",label:o("panel.menu.plan.rescale"),checked:this.activeTool==="rescale",disabled:this.readOnly,run:()=>{this.activeTool="rescale"}})}
        ${this.renderMenuItem({icon:this.is3DMode?"🧊":"📐",label:o(this.is3DMode?"panel.menu.plan.view_3d_active":"panel.menu.plan.view_2d_3d"),checked:this.is3DMode,run:()=>{this.is3DMode=!this.is3DMode}})}
        ${this.renderMenuItem({icon:"🪄",label:o("panel.menu.plan.wizard"),disabled:this.readOnly,run:()=>this.openWizard()})}
        <div class="dropdown-divider" role="separator"></div>
        <!-- Préférences d'affichage enregistrées avec le plan (reprises par la carte, constat F104) -->
        ${this.renderMenuItem({icon:"📏",label:o("panel.menu.plan.dimensions"),checked:this.showDimensions,run:()=>this.setPreferences({showDimensions:!this.showDimensions})})}
        ${this.renderMenuItem({icon:"🌡️",label:o("panel.menu.plan.heatmap"),checked:this.showThermalHeatmap,run:()=>this.setPreferences({showThermalHeatmap:!this.showThermalHeatmap})})}
        ${this.renderMenuItem({icon:"👁️",label:o("panel.menu.plan.ghost"),checked:this.showGhostLevel,run:()=>this.setPreferences({showGhostLevel:!this.showGhostLevel})})}
        ${this.renderMenuItem({icon:"🧭",label:o("panel.menu.plan.orientation"),run:()=>this.openOrientationModal()})}
        <div class="dropdown-divider" role="separator"></div>
        ${this.renderMenuItem({icon:"⛶",label:o("panel.menu.plan.fit"),run:()=>this.canvas?.fitToScreen()})}
        <!-- Quart de tour de la vue 2D (acquis 1.0.28 / 1.0.29 : rotation gérée par le canevas) -->
        ${this.renderMenuItem({icon:"↺",label:o("panel.menu.plan.rotate"),run:()=>this.canvas?.rotateQuarterTurn()})}
        ${this.renderMenuItem({icon:this.isFullscreen?"🗗":"⛶",label:o(this.isFullscreen?"panel.fullscreen.exit":"panel.fullscreen.enter"),checked:this.isFullscreen,run:()=>{this.toggleFullscreen()}})}
        <div class="dropdown-divider" role="separator"></div>
        ${this.renderMenuItem({icon:"🗑️",label:o("panel.menu.reset"),danger:!0,disabled:this.readOnly,run:()=>this.openResetModal()})}
      </div>
    `}renderSelectionHud(e){if(Qi(e)===0)return w;const t=e.bindingIds.length>0?this.project.bindings.find(p=>p.id===e.bindingIds[0]):null,i=e.roomIds.length===1?this.project.rooms.find(p=>p.id===e.roomIds[0]):null,a=(e.furnitureIds??[]).length>0?(this.project.furniture??[]).find(p=>p.id===e.furnitureIds?.[0]):void 0,n=e.openingIds.some(p=>this.project.openings.find(h=>h.id===p)?.type==="door"),s=e.openingIds.some(p=>{const h=this.project.openings.find(m=>m.id===p);return h&&(h.type==="window"||h.type==="french_window")}),l=(p,h,m,g)=>u`
      <button class="hud-opt-btn ${p?"active":""}" aria-pressed=${p?"true":"false"} title=${m} @click=${g}>${h}</button>
    `,c=this.getActiveTypology(),d=o("panel.hud.clear_selection");return u`
      <div class="selection-hud" role="region" aria-label=${o("panel.hud.region")}>
        <div class="selection-hud-main">
          <span class="selection-info">
            <span aria-hidden="true">🎯</span>
            <span>${this.getSelectedSummary(e)}</span>
          </span>

          ${i?u`
            <div class="hud-options-group" role="group" aria-labelledby="hud-room-label">
              <span class="hud-label" id="hud-room-label">${o("panel.hud.room")}</span>
              <button
                class="hud-opt-btn"
                ?disabled=${this.readOnly}
                @click=${()=>this.openSelectedRoomModal(i.id)}
                title=${o("panel.hud.edit_room_title")}
              >
                <span aria-hidden="true">✏️</span> ${o("panel.hud.edit_room")}
              </button>
            </div>
          `:w}

          ${e.wallIds.length>0?u`
            <div class="hud-options-group" role="group" aria-labelledby="hud-thickness-label">
              <span class="hud-label" id="hud-thickness-label">${o("panel.hud.thickness")}</span>
              ${l(this.currentThickness===.1,o("panel.hud.thin",{size:Re(.1)}),o("panel.thickness.partition",{size:Re(.1)}),()=>this.updateSelectedWallsThickness(.1))}
              ${l(this.currentThickness===.2,o("panel.hud.medium",{size:Re(.2)}),o("panel.hud.medium_title",{size:Re(.2)}),()=>this.updateSelectedWallsThickness(.2))}
              ${l(this.currentThickness===.3,o("panel.hud.thick",{size:Re(.3)}),o("panel.thickness.load_bearing",{size:Re(.3)}),()=>this.updateSelectedWallsThickness(.3))}
            </div>
          `:w}

          ${n?u`
            <div class="hud-options-group" role="group" aria-labelledby="hud-door-label">
              <span class="hud-label" id="hud-door-label">${o("panel.hud.door")}</span>
              ${l(!this.doorFlipSide&&this.doorFlipDirection,o("panel.hud.door_right_in"),o("panel.hud.door_right_in_title"),()=>this.updateSelectedDoorConfig(!1,!0))}
              ${l(!this.doorFlipSide&&!this.doorFlipDirection,o("panel.hud.door_left_in"),o("panel.hud.door_left_in_title"),()=>this.updateSelectedDoorConfig(!1,!1))}
              ${l(this.doorFlipSide&&!this.doorFlipDirection,o("panel.hud.door_left_out"),o("panel.hud.door_left_out_title"),()=>this.updateSelectedDoorConfig(!0,!1))}
              ${l(this.doorFlipSide&&this.doorFlipDirection,o("panel.hud.door_right_out"),o("panel.hud.door_right_out_title"),()=>this.updateSelectedDoorConfig(!0,!0))}
            </div>
            <div class="hud-options-group" role="group" aria-label=${o("panel.hud.opening_width")}>
              <span class="hud-label">${o("panel.hud.opening_width")}</span>
              ${[.73,.83,.9,1.2].map(p=>l(this.currentOpeningWidth===p,ht(p),o("panel.hud.opening_width_title"),()=>this.updateSelectedOpeningsWidth(p)))}
            </div>
          `:w}

          ${s?u`
            <div class="hud-options-group" role="group" aria-labelledby="hud-window-label">
              <span class="hud-label" id="hud-window-label">${o("panel.hud.window")}</span>
              ${l(this.windowSashCount===1,o("panel.hud.window_single"),o("panel.hud.window_single_title",{size:ht(.9)}),()=>this.updateSelectedWindowConfig("window",1,.9))}
              ${l(this.windowSashCount===2,o("panel.hud.window_double"),o("panel.hud.window_double_title",{size:ht(1.4)}),()=>this.updateSelectedWindowConfig("window",2,1.4))}
              ${l(!1,o("panel.hud.window_bay"),o("panel.hud.window_bay_title",{size:ht(2)}),()=>this.updateSelectedWindowConfig("french_window",2,2))}
            </div>
            <div class="hud-options-group" role="group" aria-label=${o("panel.hud.opening_width")}>
              <span class="hud-label">${o("panel.hud.opening_width")}</span>
              ${[.8,1,1.2,1.4,1.8,2,2.4].map(p=>l(this.currentOpeningWidth===p,ht(p),o("panel.hud.opening_width_title"),()=>this.updateSelectedOpeningsWidth(p)))}
            </div>
          `:w}

          ${a?u`
            <div class="hud-options-group" role="group" aria-labelledby="hud-furniture-label">
              <span class="hud-label" id="hud-furniture-label">${o("panel.hud.furniture")}</span>
              <button class="hud-opt-btn" ?disabled=${this.readOnly} @click=${this.rotateSelectedFurniture} title=${o("panel.hud.rotate_title")}>
                <span aria-hidden="true">🔄</span> ${o("panel.hud.rotate")}
              </button>
              <label class="hud-color" title=${o("panel.hud.color_title")}>
                <span class="hud-label">${o("panel.hud.color")}</span>
                <input
                  type="color"
                  .value=${Cd(a)}
                  ?disabled=${this.readOnly}
                  @input=${p=>this.updateSelectedFurnitureColor(p.target.value)}
                />
              </label>
              ${a.color?u`
                <button class="hud-opt-btn" ?disabled=${this.readOnly} @click=${()=>this.updateSelectedFurnitureColor(null)}
                  title=${o("panel.hud.color_reset")} aria-label=${o("panel.hud.color_reset")}>
                  <span aria-hidden="true">↺</span>
                </button>
              `:w}
            </div>
          `:w}

          ${t?u`
            <div class="hud-options-group">
              <button
                class="hud-opt-btn ${this.isIconPickerOpen?"active":""}"
                aria-expanded=${this.isIconPickerOpen?"true":"false"}
                aria-controls="hud-icon-picker"
                @click=${()=>{this.isIconPickerOpen=!this.isIconPickerOpen}}
                title=${o("panel.hud.icon_picker_title")}
              >
                <span class="fullscreen-icon" aria-hidden="true">${t.icon||"🎨"}</span>
                <span>${o("panel.hud.icon_picker")}</span>
                <span aria-hidden="true">${this.isIconPickerOpen?"▴":"▾"}</span>
              </button>
            </div>
          `:w}

          <button class="btn-delete-selection" ?disabled=${this.readOnly} @click=${this.handleDeleteSelected} title=${o("panel.hud.delete_title")}>
            <span aria-hidden="true">🗑️</span>
            <span>${o("panel.common.delete")}</span>
          </button>
          <button class="btn-clear-selection" @click=${this.clearSelection} title=${d} aria-label=${d}>
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <!-- Palette « Choisir l'icône » de l'entité sélectionnée -->
        ${t&&this.isIconPickerOpen?u`
          <div class="hud-icon-picker-panel" id="hud-icon-picker">
            <div class="icon-category-tabs" role="group" aria-label=${o("panel.hud.icon_categories")}>
              ${Object.entries(zt).map(([p,h])=>u`
                <button
                  class="icon-category-tab ${c===p?"active":""}"
                  aria-pressed=${c===p?"true":"false"}
                  title=${mn(p)}
                  @click=${()=>{this.selectedTypologyTab=p}}
                >
                  <span aria-hidden="true">${h.tabIcon}</span> ${Jc(p)}
                </button>
              `)}
            </div>

            <div class="icon-grid" role="group" aria-label=${mn(c)}>
              ${(zt[c]??zt.light).icons.map(p=>{const h=Qc(c,p);return u`
                  <button
                    class="icon-item-btn ${t.icon===p.icon?"active":""}"
                    aria-pressed=${t.icon===p.icon?"true":"false"}
                    @click=${()=>this.updateSelectedBindingIcon(p.icon,p.mdi)}
                    title="${h} (${p.mdi})"
                  >
                    <span class="icon-item-emoji" aria-hidden="true">${p.icon}</span>
                    <span>${h}</span>
                  </button>
                `})}
            </div>

            <div class="icon-picker-footer">
              <span>${o("panel.hud.icon_active")} <strong>${t.icon||o("panel.hud.icon_default")}</strong>
                (${t.mdiIcon||o("panel.hud.icon_automatic")})</span>
              <label class="icon-free-input">
                <span>${o("panel.hud.icon_free")}</span>
                <input
                  type="text"
                  placeholder=${o("panel.hud.icon_free_placeholder")}
                  maxlength="4"
                  @keydown=${p=>{if(p.key==="Enter"){const h=p.target.value.trim();h&&this.updateSelectedBindingIcon(h)}}}
                  @change=${p=>{const h=p.target.value.trim();h&&this.updateSelectedBindingIcon(h)}}
                />
              </label>
            </div>
          </div>
        `:w}
      </div>
    `}renderNewPlanDialog(){const e=()=>{this.isNewPlanModalOpen=!1},t=o("panel.common.close");return u`
      <div class="modal-backdrop" @click=${i=>{i.target===i.currentTarget&&e()}}>
        <div class="modal-dialog" data-modal tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="new-plan-title" aria-describedby="new-plan-subtitle">
          <div class="modal-dialog-header">
            <div class="modal-dialog-title-group">
              <span class="modal-dialog-icon" aria-hidden="true">📄</span>
              <div>
                <h3 class="modal-dialog-title" id="new-plan-title">${o("panel.new_plan.title")}</h3>
                <p class="modal-dialog-subtitle" id="new-plan-subtitle">${o("panel.new_plan.subtitle")}</p>
              </div>
            </div>
            <button class="btn-dialog-close" title=${t} aria-label=${t} @click=${e}><span aria-hidden="true">✕</span></button>
          </div>
          <div class="modal-dialog-body">
            <div class="dialog-form-group">
              <label class="dialog-label" for="new-plan-name">${o("panel.new_plan.name")}</label>
              <input
                id="new-plan-name"
                type="text"
                class="dialog-input"
                data-initial-focus
                .value=${this.newPlanName}
                @input=${i=>{this.newPlanName=i.target.value}}
                @keydown=${i=>{i.key==="Enter"&&!i.isComposing&&this.handleConfirmNewPlan()}}
                placeholder=${o("panel.new_plan.name_placeholder")}
              />
            </div>

            <fieldset class="dialog-form-group">
              <legend class="dialog-label">${o("panel.new_plan.category")}</legend>
              <div class="category-grid">
                ${[...ia,pi].map(i=>u`
                  <button
                    type="button"
                    class="category-btn ${this.newPlanCategory===i.id?"active":""}"
                    aria-pressed=${this.newPlanCategory===i.id?"true":"false"}
                    @click=${()=>{this.newPlanCategory=i.id}}
                  >
                    <span aria-hidden="true">${i.icon}</span>
                    <span>${pe(i.id)}</span>
                  </button>
                `)}
              </div>
            </fieldset>
          </div>
          <div class="modal-dialog-footer">
            <button class="btn-dialog-cancel" @click=${e}>${o("panel.common.cancel")}</button>
            <button class="btn-dialog-confirm primary" @click=${()=>{this.handleConfirmNewPlan()}}>
              <span aria-hidden="true">✨</span>
              <span>${o("panel.new_plan.create")}</span>
            </button>
          </div>
        </div>
      </div>
    `}renderResetDialog(){const e=()=>{this.isResetModalOpen=!1},t=o("panel.common.close"),i=this.project,a=(n,s,l)=>u`
      <div><dt><span aria-hidden="true">${n}</span> ${o(s)}</dt><dd>${typeof l=="number"?R(l):l}</dd></div>
    `;return u`
      <div class="modal-backdrop" @click=${n=>{n.target===n.currentTarget&&e()}}>
        <div class="modal-dialog danger" data-modal tabindex="-1" role="alertdialog" aria-modal="true" aria-labelledby="reset-title" aria-describedby="reset-message">
          <div class="modal-dialog-header danger">
            <div class="modal-dialog-title-group">
              <span class="modal-dialog-icon" aria-hidden="true">🗑️</span>
              <div>
                <h3 class="modal-dialog-title danger" id="reset-title">${o("panel.reset.title")}</h3>
                <p class="modal-dialog-subtitle">${o("panel.reset.subtitle")}</p>
              </div>
            </div>
            <button class="btn-dialog-close" title=${t} aria-label=${t} @click=${e}><span aria-hidden="true">✕</span></button>
          </div>
          <div class="modal-dialog-body">
            <p class="dialog-text" id="reset-message">
              ${o("panel.reset.confirm_before")}<strong>${o("panel.reset.confirm_strong")}</strong>${o("panel.reset.confirm_after")}
              (<strong>${i.name||pe(i.category)}</strong>)${o("panel.reset.confirm_end")}
            </p>

            <dl class="reset-summary-box">
              ${a("🧱","panel.reset.walls",i.walls.length)}
              ${a("🚪","panel.reset.openings",i.openings.length)}
              ${a("🏷️","panel.reset.rooms",i.rooms.length)}
              ${a("⚡","panel.reset.entities",i.bindings.length)}
              ${a("🛋️","panel.reset.furniture",i.furniture?.length||0)}
              ${a("🖼️","panel.reset.background",o(i.background?"panel.common.yes":"panel.common.no"))}
            </dl>

            <p class="dialog-hint">${o("panel.reset.undo_hint")}</p>
          </div>
          <div class="modal-dialog-footer">
            <button class="btn-dialog-cancel" data-initial-focus @click=${e}>${o("panel.common.cancel")}</button>
            <button class="btn-dialog-confirm danger" @click=${()=>this.handleConfirmResetPlan()}>
              <span aria-hidden="true">🗑️</span>
              <span>${o("panel.reset.confirm")}</span>
            </button>
          </div>
        </div>
      </div>
    `}render(){const e=!!this.project.background,t=this.persistence.ws,i=this.persistence.ready,a=t.isDirty(this.project.id),n=t.dirtyIds(),s=n.length,l=this.persistence.isSaving(this.project.id),c=this.isModalOpen(),d=this.liveSelection(),p=pe(this.project.category),h=o("panel.history.undo"),m=o("panel.history.redo"),g=o(this.isFullscreen?"panel.fullscreen.exit":"panel.fullscreen.enter"),v=o("panel.save.label"),y=o(a?"panel.save.title_dirty":"panel.save.title"),_=o("panel.drawer.toggle_title"),$=o("panel.controls.background_opacity");return u`
      <div class="studio">
        <header class="top-bar">
          ${this.showMenuButton?u`
            <button class="ha-menu-btn" title=${o("panel.header.ha_menu")} aria-label=${o("panel.header.ha_menu_aria")} @click=${this.toggleHaSidebar}>
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
            </button>
          `:w}
          <!-- Logo (5 clics : easter egg, aussi accessible au clavier en tapant le mot secret) -->
          <div class="brand" title=${o("panel.header.brand_title")} @click=${this.handleLogoClick}>
            <span class="brand-icon" aria-hidden="true">
              <!-- Logo de l'application : couleurs de la marque, identiques dans les deux palettes -->
              <svg viewBox="0 0 512 512" width="28" height="28">
                <rect width="512" height="512" rx="108" fill="#0f172a" stroke="#38bdf8" stroke-width="14" />
                <g stroke="rgba(56, 189, 248, 0.15)" stroke-width="6">
                  <line x1="0" y1="170" x2="512" y2="170" />
                  <line x1="0" y1="340" x2="512" y2="340" />
                  <line x1="170" y1="0" x2="170" y2="512" />
                  <line x1="340" y1="0" x2="340" y2="512" />
                </g>
                <polygon points="120,310 256,230 392,310 256,390" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" stroke-width="8" stroke-dasharray="8,8" />
                <polygon points="120,310 120,250 256,170 256,230" fill="rgba(15, 23, 42, 0.9)" stroke="#38bdf8" stroke-width="10" stroke-linejoin="round" />
                <polygon points="256,230 256,170 392,250 392,310" fill="rgba(30, 41, 59, 0.9)" stroke="#0284c7" stroke-width="10" stroke-linejoin="round" />
                <polygon points="120,310 120,250 200,298 200,358" fill="rgba(30, 41, 59, 0.9)" stroke="#38bdf8" stroke-width="8" />
                <polygon points="200,358 200,298 256,330 256,390" fill="rgba(15, 23, 42, 0.9)" stroke="#38bdf8" stroke-width="8" />
                <line x1="195" y1="255" x2="235" y2="280" stroke="#f59e0b" stroke-width="5" stroke-dasharray="6,6" />
                <circle cx="195" cy="255" r="14" fill="#f59e0b" stroke="#ffffff" stroke-width="5" />
                <line x1="235" y1="280" x2="295" y2="245" stroke="#38bdf8" stroke-width="5" stroke-dasharray="6,6" />
                <circle cx="235" cy="280" r="18" fill="#06b6d4" stroke="#ffffff" stroke-width="6" />
                <circle cx="295" cy="245" r="14" fill="#38bdf8" stroke="#ffffff" stroke-width="5" />
              </svg>
            </span>
            <span class="brand-name">Home Architect</span>
            <span class="brand-tag">Studio</span>
            <button class="brand-version" title=${o("panel.header.about_title")}
              aria-label=${o("panel.header.about_aria",{version:jt})} @click=${this.openAbout}>v${jt}</button>
          </div>

          ${this.updateInfo?.available&&!this.readOnly?u`
            <button class="btn-update-auto" @click=${()=>this.openUpdateModal()}
              title=${o("panel.header.update_title",{version:this.updateInfo.latestVersion??""})}
              aria-label=${o("panel.header.update_title",{version:this.updateInfo.latestVersion??""})}>
              <span aria-hidden="true">🚀</span>
              <span class="btn-label">${o("panel.header.update_available")}</span>
              <span class="update-version-tag">v${this.updateInfo.latestVersion}</span>
            </button>
          `:w}

          <!-- Menus déroulants principaux : Fichier, Plan, Niveau (constat F110 : « Pièce » renommé « Niveau ») -->
          <nav class="menu-group" aria-label=${o("panel.header.menus")}>
            <div class="dropdown-menu-wrapper">
              ${this.renderMenuTrigger("file","📁",o("panel.menu.file.label"))}
              ${this.activeDropdown==="file"?this.renderFileMenu(i,s,a):w}
            </div>

            <div class="dropdown-menu-wrapper">
              ${this.renderMenuTrigger("plan","📐",o("panel.menu.plan.label"))}
              ${this.activeDropdown==="plan"?this.renderPlanMenu():w}
            </div>

            <!-- Sélecteur de niveau : plans rangés par niveau (catégorie), puis plans « Autre » -->
            <div class="dropdown-menu-wrapper">
              ${this.renderMenuTrigger("level","🏢",o("panel.level.label"),u`
                <span><span class="btn-label">${o("panel.level.prefix")} </span><strong>${p}</strong></span>
                <span class="level-plan-name" title=${this.project.name}>${this.project.name}</span>
                ${a?this.renderDirtyDot():w}
              `,o(a?"panel.level.trigger_aria_dirty":"panel.level.trigger_aria",{level:p,name:this.project.name}))}
              ${this.activeDropdown==="level"?this.renderLevelMenu():w}
            </div>
          </nav>

          <div class="top-controls">
            <!-- Historique Annuler / Rétablir -->
            <div class="control-group compact" role="group" aria-label=${o("panel.history.group")}>
              <button
                class="btn-history"
                @click=${this.handleUndo}
                ?disabled=${this.readOnly||!t.canUndo()}
                title=${o("panel.history.undo_title")}
                aria-label=${h}
              >
                <span aria-hidden="true">↩️</span><span class="btn-label"> ${h}</span>
              </button>
              <button
                class="btn-history"
                @click=${this.handleRedo}
                ?disabled=${this.readOnly||!t.canRedo()}
                title=${o("panel.history.redo_title")}
                aria-label=${m}
              >
                <span aria-hidden="true">↪️</span><span class="btn-label"> ${m}</span>
              </button>
            </div>

            <!-- Épaisseur mur contextuelle : reflète la valeur réellement utilisée (constat F134) -->
            ${this.activeTool==="wall"?u`
              <div class="control-group">
                <label for="ctl-thickness">${o("panel.controls.thickness")}</label>
                <select id="ctl-thickness" aria-label=${o("panel.controls.thickness_aria")} @change=${this.handleThicknessChange}>
                  ${Ji($d,this.currentThickness,Re)}
                </select>
              </div>
            `:w}

            <!-- Largeur ouvrant contextuelle -->
            ${this.activeTool==="door"||this.activeTool==="window"||this.activeTool==="french_window"?u`
              <div class="control-group">
                <label for="ctl-opening-width">${o("panel.controls.width")}</label>
                <select id="ctl-opening-width" aria-label=${o("panel.controls.width_aria")} @change=${this.handleOpeningWidthChange}>
                  ${Ji(Sd,this.currentOpeningWidth,ht)}
                </select>
              </div>
            `:w}

            <!-- Hauteur sous plafond globale en mode 3D -->
            ${this.is3DMode?u`
              <div class="control-group" title=${o("panel.controls.ceiling_title")}>
                <label for="ctl-ceiling">${o("panel.controls.ceiling")}</label>
                <select id="ctl-ceiling" aria-label=${o("panel.controls.ceiling_title")} ?disabled=${this.readOnly}
                  @change=${z=>{this.handleDefaultCeilingChange(parseFloat(z.target.value))}}>
                  ${Ji(Md,ci(this.project),z=>ft(z))}
                </select>
              </div>
            `:w}

            <!-- Opacité du fond -->
            ${e?u`
              <div class="control-group">
                <label for="ctl-opacity">${o("panel.controls.background")}</label>
                <input
                  id="ctl-opacity"
                  type="range"
                  min="0.05"
                  max="1.0"
                  step="0.05"
                  .value=${String(this.project.background?.opacity??.4)}
                  ?disabled=${this.readOnly}
                  @input=${this.handleOpacityChange}
                  title=${$}
                  aria-label=${$}
                  aria-valuetext=${R(this.project.background?.opacity??.4,{style:"percent"})}
                />
              </div>
            `:w}

            <!-- Volet Entités HA -->
            <button
              class="btn-drawer ${this.isDrawerCollapsed?"":"active"}"
              aria-pressed=${this.isDrawerCollapsed?"false":"true"}
              aria-label=${Y("panel.drawer.toggle_aria",this.project.bindings.length)}
              @click=${this.toggleDrawer}
              title=${_}
            >
              <span aria-hidden="true">⚡</span><span class="btn-label"> ${o("panel.drawer.label")}</span> (${R(this.project.bindings.length)})
            </button>

            <div class="scale-indicator" title=${o("panel.controls.scale_title")}>
              ${o("panel.controls.scale",{value:R(this.project.pixelsPerMeter,{maximumFractionDigits:2})})}
            </div>

            <!-- Bouton Plein Écran -->
            <button
              class="btn-fullscreen ${this.isFullscreen?"active":""}"
              aria-pressed=${this.isFullscreen?"true":"false"}
              @click=${()=>{this.toggleFullscreen()}}
              title=${o(this.isFullscreen?"panel.fullscreen.exit_title":"panel.fullscreen.enter_title")}
            >
              <span class="fullscreen-icon" aria-hidden="true">${this.isFullscreen?"🗗":"⛶"}</span>
              <span class="btn-label">${g}</span>
            </button>

            <!-- Sauvegarde (indicateur des modifications non sauvegardées) -->
            <button
              class="btn-primary ${a?"is-dirty":""}"
              ?disabled=${this.readOnly||!i||l}
              aria-label=${l?o("panel.save.saving"):v}
              aria-describedby=${a?"save-dirty-hint":w}
              @click=${this.openSaveModal}
              title=${y}
            >
              ${l?u`<span aria-hidden="true">⏳</span><span class="btn-label"> ${o("panel.save.saving")}</span>`:u`<span aria-hidden="true">💾</span><span class="btn-label"> ${v}</span>${a?u` <span class="dirty-dot" aria-hidden="true">●</span>`:w}`}
            </button>
            ${a?u`<span id="save-dirty-hint" class="visually-hidden">${o("panel.common.unsaved_changes")}</span>`:w}
          </div>
        </header>

        ${this.persistence.renderBanners(this.updateBanners())}

        <div class="workspace">
          <div class="canvas-area">
            <home-architect-toolbar
              .activeTool=${this.activeTool}
              .currentThickness=${this.currentThickness}
              .doorFlipSide=${this.doorFlipSide}
              .doorFlipDirection=${this.doorFlipDirection}
              .windowSashCount=${this.windowSashCount}
              .canUndo=${!this.readOnly&&t.canUndo()}
              .canRedo=${!this.readOnly&&t.canRedo()}
              .grid=${this.project.grid}
              .narrow=${this.narrow}
              .readOnly=${this.readOnly}
              @undo=${this.handleUndo}
              @redo=${this.handleRedo}
              @tool-selected=${this.handleToolSelected}
              @door-config-changed=${this.handleDoorConfigChanged}
              @window-config-changed=${this.handleWindowConfigChanged}
              @wall-thickness-changed=${this.handleWallThicknessChanged}
              @grid-config-changed=${this.handleGridConfigChanged}
              @open-wizard=${()=>this.openWizard()}
              @open-import-modal=${()=>this.openImportModal()}
            ></home-architect-toolbar>

            <home-architect-canvas
              .hass=${this.hass}
              .project=${this.project}
              .backgroundSrc=${this.persistence.background.src}
              .readOnly=${this.readOnly}
              .modalOpen=${c}
              .pendingPlacement=${this.pendingPlacement}
              .activeTool=${this.activeTool}
              .currentWallThickness=${this.currentThickness}
              .currentOpeningWidth=${this.currentOpeningWidth}
              .openingFlipSide=${this.doorFlipSide}
              .openingFlipDirection=${this.doorFlipDirection}
              .windowSashCount=${this.windowSashCount}
              .is3DMode=${this.is3DMode}
              .selectedElements=${this.selectedElements}
              .showDimensions=${this.showDimensions}
              .showThermalHeatmap=${this.showThermalHeatmap}
              .ghostProject=${this.persistence.ghostProject(this.ghostLevel())}
              ?has-toast=${!!this.toastMessage}
              @selection-changed=${z=>{if(this.selectedElements=z.detail.selectedElements,this.selectedElements.bindingIds.length>0){const f=this.project.bindings.find(P=>P.id===this.selectedElements.bindingIds[0]);if(f){const P=f.entityId.split(".")[0];zt[P]&&(this.selectedTypologyTab=P)}this.isIconPickerOpen=!0}}}
              @toggle-3d=${z=>{this.is3DMode=z.detail.is3DMode}}
              @opening-config-changed=${this.handleOpeningConfigChanged}
              @room-selected=${z=>{this.selectedRoomForEdit=z.detail.room}}
              @project-changed=${this.handleProjectChanged}
              @request-calibration=${this.handleRequestCalibration}
              @request-rescale=${this.handleRequestRescale}
              @background-image-loaded=${this.handleBackgroundDropped}
              @placement-done=${this.handlePlacementDone}
              @open-orientation=${()=>this.openOrientationModal()}
            ></home-architect-canvas>

            ${this.renderSelectionHud(d)}

            <!-- Notification (région annoncée par les lecteurs d'écran, toujours présente) -->
            <div class="toast-region" role="status" aria-live="polite">
              ${this.toastMessage?u`<div class="toast-notification">${this.toastMessage}</div>`:w}
            </div>
          </div>

          <!-- Volet des entités HA et des meubles : colonne, ou tiroir superposé sur écran étroit -->
          <home-architect-entity-drawer
            .hass=${this.hass}
            ?collapsed=${this.isDrawerCollapsed}
            @toggle-collapse=${this.toggleDrawer}
            @drawer-item-picked=${this.handleDrawerItemPicked}
          ></home-architect-entity-drawer>
        </div>

        <!-- Modales des composants (data-modal : focus rendu à l'élément déclencheur à la fermeture) -->
        ${this.isImportModalOpen?u`
          <home-architect-import-modal
            data-modal
            .hass=${this.hass}
            .currentLevel=${this.project.category||xe}
            .initialFile=${this.importInitialFile}
            .initialSvg=${this.importInitialSvg}
            @import-confirmed=${this.handleImportConfirmed}
            @import-project-backup=${this.handleImportProjectBackup}
            @close=${this.closeImportModal}
          ></home-architect-import-modal>
        `:w}

        ${this.isWizardOpen?u`
          <home-architect-wizard-modal
            data-modal
            @create-room=${this.handleCreateRoomFromWizard}
            @close=${()=>{this.isWizardOpen=!1}}
          ></home-architect-wizard-modal>
        `:w}

        ${this.selectedRoomForEdit?u`
          <home-architect-room-modal
            data-modal
            .room=${this.selectedRoomForEdit}
            .hass=${this.hass}
            .defaultCeilingHeight=${this.project.defaultCeilingHeight}
            .walls=${this.project.walls}
            @save-room=${this.handleSaveRoom}
            @delete-room=${this.handleDeleteRoom}
            @close=${()=>{this.selectedRoomForEdit=null}}
          ></home-architect-room-modal>
        `:w}

        ${this.isCalibrateModalOpen&&this.calibrationData?u`
          <home-architect-calibrate-modal
            data-modal
            .hass=${this.hass}
            .worldDistance=${this.calibrationData.worldDistance}
            .defaultMeters=${this.calibrationData.defaultMeters}
            .pixelsPerMeter=${this.project.pixelsPerMeter}
            .hasGeometry=${!si({...this.project,background:void 0})}
            .hasBackground=${!!this.project.background}
            @calibrate-confirmed=${this.handleCalibrateConfirmed}
            @close=${this.closeCalibrateModal}
          ></home-architect-calibrate-modal>
        `:w}

        ${this.isRescaleModalOpen?u`
          <home-architect-rescale-modal
            data-modal
            .hass=${this.hass}
            .measuredMeters=${this.rescaleMeasuredMeters}
            .wallCount=${this.project.walls.length}
            .roomCount=${this.project.rooms.length}
            .openingCount=${this.project.openings.length}
            .furnitureCount=${(this.project.furniture||[]).length}
            .bindingCount=${this.project.bindings.length}
            .hasBackground=${!!(this.project.background&&(this.project.background.assetId||this.project.background.imageUrl))}
            @rescale-confirmed=${this.handleRescaleConfirmed}
            @close=${()=>{this.isRescaleModalOpen=!1}}
          ></home-architect-rescale-modal>
        `:w}

        ${this.isOrientationModalOpen?u`
          <home-architect-orientation-modal
            data-modal
            .hass=${this.hass}
            .northAngle=${this.project.northAngle??0}
            .showCompass=${this.project.showCompass!==!1}
            @orientation-applied=${this.handleOrientationApplied}
            @close=${()=>{this.isOrientationModalOpen=!1}}
          ></home-architect-orientation-modal>
        `:w}

        ${this.isExportModalOpen?u`
          <home-architect-export-modal
            data-modal
            .project=${this.project}
            .hass=${this.hass}
            .backgroundSrc=${this.persistence.background.src}
            .readOnly=${this.readOnly}
            .dirty=${a}
            @export-frame-changed=${this.handleExportFrameChanged}
            @project-published=${this.handleProjectPublished}
            @project-unpublished=${this.handleProjectUnpublished}
            @save-requested=${this.handleExportSaveRequested}
            @close=${()=>{this.isExportModalOpen=!1}}
          ></home-architect-export-modal>
        `:w}

        ${this.isSaveLoadModalOpen?u`
          <home-architect-save-load-modal
            data-modal
            .hass=${this.hass}
            .project=${this.project}
            .mode=${this.saveLoadModalTab}
            .readOnly=${this.readOnly}
            .dirtyProjectIds=${n}
            @save-confirmed=${this.handleSaveConfirmed}
            @load-project=${this.handleLoadProject}
            @project-deleted=${z=>this.persistence.projectDeleted(z.detail.projectId,{remote:!1})}
            @close=${()=>{this.isSaveLoadModalOpen=!1}}
          ></home-architect-save-load-modal>
        `:w}

        ${this.isNewPlanModalOpen?this.renderNewPlanDialog():w}

        ${this.isResetModalOpen?this.renderResetDialog():w}

        <!-- Modale Mise à jour (installation 1-clic ou redirection Paramètres HA) -->
        ${this.isUpdateModalOpen&&this.updateInfo?.available?Lc(this.updateInfo,s,{onClose:()=>this.closeUpdateModal(),onOpenUpdates:()=>this.openHaUpdates(),onInstallUpdate:()=>{this.handleInstallUpdate()},onRestartHa:()=>{this.handleRestartHa()}},{canManageUpdates:!this.readOnly,installStatus:this.updateInstallStatus,installError:this.updateInstallError}):w}

        <!-- À propos : version, état des mises à jour, liens (release, soutien du projet) -->
        ${this.isAboutOpen?Nc({info:this.updateInfo,canManageUpdates:!this.readOnly,onClose:()=>{this.isAboutOpen=!1},onShowUpdate:()=>{this.isAboutOpen=!1,this.isUpdateModalOpen=!0},onOpenUpdates:()=>this.openHaUpdates()}):w}

        <!-- Chargement bloquant, opération en cours, copies locales à restaurer, dialogue de choix -->
        ${this.persistence.renderOverlays()}
      </div>
    `}};Ra.styles=[ze,Kc,Xc,Zc];let N=Ra;U([L({type:Object})],N.prototype,"hass");U([L({type:Boolean,reflect:!0})],N.prototype,"narrow");U([k()],N.prototype,"activeTool");U([k()],N.prototype,"currentThickness");U([k()],N.prototype,"currentOpeningWidth");U([k()],N.prototype,"doorFlipSide");U([k()],N.prototype,"doorFlipDirection");U([k()],N.prototype,"windowSashCount");U([k()],N.prototype,"is3DMode");U([k()],N.prototype,"isFullscreen");U([k()],N.prototype,"isDrawerCollapsed");U([k()],N.prototype,"pendingPlacement");U([k()],N.prototype,"isWizardOpen");U([k()],N.prototype,"isImportModalOpen");U([k()],N.prototype,"importInitialFile");U([k()],N.prototype,"importInitialSvg");U([k()],N.prototype,"isAboutOpen");U([k()],N.prototype,"isExportModalOpen");U([k()],N.prototype,"isSaveLoadModalOpen");U([k()],N.prototype,"isNewPlanModalOpen");U([k()],N.prototype,"newPlanName");U([k()],N.prototype,"newPlanCategory");U([k()],N.prototype,"isResetModalOpen");U([k()],N.prototype,"saveLoadModalTab");U([k()],N.prototype,"isCalibrateModalOpen");U([k()],N.prototype,"calibrationData");U([k()],N.prototype,"isRescaleModalOpen");U([k()],N.prototype,"isOrientationModalOpen");U([k()],N.prototype,"rescaleMeasuredMeters");U([k()],N.prototype,"selectedRoomForEdit");U([k()],N.prototype,"selectedElements");U([k()],N.prototype,"activeDropdown");U([k()],N.prototype,"selectedTypologyTab");U([k()],N.prototype,"isIconPickerOpen");U([k()],N.prototype,"updateInfo");U([k()],N.prototype,"isUpdateModalOpen");U([k()],N.prototype,"updateInstallStatus");U([k()],N.prototype,"updateInstallError");U([k()],N.prototype,"toastMessage");Ae("home-architect-panel",N);Wo("panel");
