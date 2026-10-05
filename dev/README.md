# Harnais de développement

`npm run dev` sert `dev/index.html` : le studio (`<home-architect-panel>`, onglet **Studio**) et la
carte Lovelace (`<home-architect-card>`, onglet **Carte**) tournent sur un faux Home Assistant, sans
instance réelle. Le rechargement de la page remet toutes les données simulées à zéro.

## Ce qui est simulé (`mock-hass.ts`)

| Élément | Comportement |
|---|---|
| Commandes WebSocket | `list_projects`, `get_project`, `get_projects` (déprécié), `save_project` (révision, `expected_revision`/`force`, conflit `conflict:<rev>`, limite 2 Mio, extraction des data-URL de fond en assets), `delete_project` (`removed_files`), `publish_svg` (assainissement approximatif, limite 3,5 Mio), `unpublish`, `check_updates`, `subscribe_project`. Commande inconnue : `unknown_command`. |
| Droits | Case **Administrateur** : sans elle, les commandes d'écriture renvoient `unauthorized` et le téléversement HTTP 403. |
| `fetchWithAuth` | `POST /api/home_architect/background/{project_id}` (types, 12 Mio, 403/413/415) et `GET …/{project_id}/{asset_id}` ; les images restent en mémoire. |
| Publication | Le SVG publié est servi par le serveur Vite sous `/api/home_architect/published/<fichier>.svg?v=<hash>` avec les en-têtes du backend (CSP, `nosniff`, `ETag`). Le projet `rdc` simule un ancien fichier `/local/plan_rdc.svg` (`legacy_path`). |
| `callService` | Journalisé ; effets simples sur les états (lumières, prises, volets, serrures, climat, médias, alarme, scènes, scripts, boutons). Les entités indisponibles sont ignorées, comme dans HA. |
| `hass` | Nouvel objet à chaque changement ; `states`, `entities`, `devices`, `areas`, `floors`, `services`, `user.is_admin`, `language`/`locale` (**Langue** fr/en), `themes.darkMode` (**Thème sombre**). |
| Réseau | **Latence** (0 / 300 ms / 1,5 s) et **Hors ligne** (`callWS` rejette avec le code 3, `fetchWithAuth` avec « Failed to fetch »). |
| Autre appareil | **Modifier** incrémente la révision d'un projet (et déplace une entité) ; **Supprimer** le supprime : les abonnés `subscribe_project` reçoivent l'événement. |

Les données de démonstration (`fixtures.ts`) comprennent une quarantaine d'entités variées (lumière
RGB, prises, porte de garage, serrures, thermostats, capteurs °C et °F, capteurs de porte et de
mouvement, lecteurs multimédia, caméra, scènes, script, boutons, une entité `unavailable`…) et deux
plans : `rdc` (ancien identifiant de niveau) et `plan_etage001` (avec une image de fond en asset).

Le journal en bas de page liste les appels WebSocket, HTTP et services ainsi que les événements
émis par les composants (`hass-more-info` ouvre une fenêtre d'état simplifiée).
