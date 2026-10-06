/**
 * Mise en page du studio dans Home Assistant (constat F60) : bouton de la barre latérale de HA,
 * barre supérieure qui passe à la ligne au lieu de déborder, mode étroit (mobile) avec icônes
 * seules, badge de version (dialogue « À propos ») et commandes ajoutées au HUD de sélection.
 * Complète les styles du panneau (classes .top-bar, .selection-hud…) avec les mêmes jetons de thème.
 */
import { css } from 'lit';

export const studioLayoutStyles = css`
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
`;
