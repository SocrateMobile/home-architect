"""Constants for Home Architect integration."""

from datetime import timedelta

DOMAIN = "home_architect"
NAME = "Home Architect"
VERSION = "1.1.0"

PLATFORMS = ["update"]

# Stockage (.storage/home_architect.projects)
STORAGE_VERSION = 2
STORAGE_MINOR_VERSION = 1
STORAGE_KEY = "home_architect.projects"
PROJECT_SCHEMA_VERSION = 2

# Clés de hass.data[DOMAIN]
DATA_STORAGE = "storage"
DATA_ENTRY_ID = "entry_id"

# Signal du dispatcher émis après save / delete / publish / unpublish
SIGNAL_PROJECT_UPDATED = f"{DOMAIN}_project_updated"

# Identifiants (même règle que le frontend : ^[a-zA-Z0-9_-]{1,64}$)
PROJECT_ID_PATTERN = r"^[a-zA-Z0-9_-]{1,64}$"

# Limites (alignées sur src/core/project-model.ts et src/core/image-utils.ts)
MAX_PROJECT_BYTES = 2 * 1024 * 1024
MAX_PUBLISH_BYTES = int(3.5 * 1024 * 1024)
MAX_UPLOAD_BYTES = 12 * 1024 * 1024
MAX_PROJECTS = 100

# Fichiers privés : /config/home_architect/{backgrounds,published,backups}
DATA_DIR_NAME = "home_architect"
# Délai avant suppression d'une image de fond qui n'est plus référencée
# (protège l'annulation après sauvegarde et un téléversement pas encore sauvegardé)
ASSET_GRACE_PERIOD = timedelta(hours=24)

# Vues HTTP
BACKGROUND_URL_PATH = "/api/home_architect/background"
PUBLISHED_URL_PATH = "/api/home_architect/published"

# Frontend / Panel
FRONTEND_URL_PATH = "/home_architect_frontend"
CARD_FILE_NAME = "home_architect-card.js"
PANEL_FILE_NAME = "home_architect-panel.js"
PANEL_URL_PATH = "home-architect"
PANEL_TITLE = "Home Architect"
PANEL_ICON = "mdi:floor-plan"
PANEL_NAME = "home-architect-panel"

# Options & Config
CONF_SHOW_SIDEBAR_PANEL = "show_sidebar_panel"
DEFAULT_SHOW_SIDEBAR_PANEL = True

# Notification des mises à jour (GitHub Releases)
GITHUB_REPO = "SocrateMobile/home-architect"
GITHUB_LATEST_RELEASE_URL = f"https://api.github.com/repos/{GITHUB_REPO}/releases/latest"
UPDATE_CHECK_INTERVAL = timedelta(hours=6)
UPDATE_CHECK_CACHE = timedelta(minutes=10)
