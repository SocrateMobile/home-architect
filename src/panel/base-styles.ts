/**
 * Styles de base du studio : hôte, barre supérieure, menus déroulants, HUD de sélection, toast et
 * dialogues du panneau. Toutes les couleurs dérivent des jetons `--arch-ui-*` de uiThemeStyles
 * (thème Home Assistant, palettes claire et sombre ; constats F56, F169), à appliquer avant ce bloc.
 *
 * Jetons dérivés propres au studio (`--studio-*`) : teintes lisibles des couleurs d'accent et
 * d'état (texte d'accent mêlé à la couleur du texte pour un contraste suffisant sur les deux
 * palettes), fonds pleins assombris pour un texte clair, fonds légers et survols. Le texte
 * secondaire (--arch-ui-text-muted) n'est posé que sur la surface principale, jamais sur
 * --arch-ui-surface-2 (contraste insuffisant avec la palette claire de HA).
 */
import { css } from 'lit';

export const panelBaseStyles = css`
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
    touch-action: none;
  }

  .selection-hud .hud-drag-handle {
    background: transparent;
    border: none;
    color: var(--arch-ui-text-muted, #94a3b8);
    cursor: grab;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    height: 30px;
    border-radius: 6px;
    user-select: none;
    touch-action: none;
    font-size: 13px;
    line-height: 1;
    opacity: 0.65;
    transition: opacity 0.15s ease, background-color 0.15s ease, color 0.15s ease;
  }

  .selection-hud .hud-drag-handle:hover,
  .selection-hud .hud-drag-handle.dragging {
    opacity: 1;
    color: var(--arch-ui-accent, #3b82f6);
    background: rgba(255, 255, 255, 0.08);
  }

  .selection-hud .hud-drag-handle.dragging {
    cursor: grabbing;
  }

  .selection-hud .hud-drag-handle:focus-visible {
    outline: 2px solid var(--arch-ui-accent, #3b82f6);
    outline-offset: 1px;
    opacity: 1;
  }

  .selection-hud .grip-dots {
    letter-spacing: -1.5px;
    font-weight: bold;
    user-select: none;
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
`;
