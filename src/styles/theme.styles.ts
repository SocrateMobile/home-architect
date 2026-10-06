import { css } from 'lit';

/**
 * Jetons de thème de l'interface du studio (panneau, modales, barre d'outils, volet, carte).
 *
 * Même convention que le canevas (src/styles/canvas.styles.ts) :
 *  - chaque jeton `--arch-ui-*` dérive d'abord de la variable publique `--ha-arch-ui-*` (card-mod,
 *    thème utilisateur), puis des variables standard du thème Home Assistant, puis d'une valeur sombre ;
 *  - l'attribut `scheme='light'` sur l'hôte (posé d'après `hass.themes.darkMode`) bascule les valeurs
 *    de repli vers une palette claire quand le thème HA ne fournit pas la variable.
 * Les composants appliquent `uiThemeStyles` en tête de `static styles` puis n'utilisent que ces jetons.
 */
export const uiThemeStyles = css`
  :host {
    --arch-ui-bg-fallback: #0f172a;
    --arch-ui-surface-fallback: #1e293b;
    --arch-ui-surface-2-fallback: #273449;
    --arch-ui-text-fallback: #f8fafc;
    --arch-ui-text-muted-fallback: #94a3b8;
    --arch-ui-border-fallback: rgba(148, 163, 184, 0.25);
    --arch-ui-overlay-fallback: rgba(2, 6, 23, 0.6);

    --arch-ui-bg: var(--ha-arch-ui-bg, var(--primary-background-color, var(--arch-ui-bg-fallback)));
    --arch-ui-surface: var(--ha-arch-ui-surface, var(--card-background-color, var(--ha-card-background, var(--arch-ui-surface-fallback))));
    --arch-ui-surface-2: var(--ha-arch-ui-surface-2, var(--secondary-background-color, var(--arch-ui-surface-2-fallback)));
    --arch-ui-text: var(--ha-arch-ui-text, var(--primary-text-color, var(--arch-ui-text-fallback)));
    --arch-ui-text-muted: var(--ha-arch-ui-text-muted, var(--secondary-text-color, var(--arch-ui-text-muted-fallback)));
    --arch-ui-border: var(--ha-arch-ui-border, var(--divider-color, var(--arch-ui-border-fallback)));
    --arch-ui-accent: var(--ha-arch-ui-accent, var(--primary-color, #38bdf8));
    --arch-ui-accent-text: var(--ha-arch-ui-accent-text, var(--text-primary-color, #ffffff));
    --arch-ui-danger: var(--ha-arch-ui-danger, var(--error-color, #ef4444));
    --arch-ui-warning: var(--ha-arch-ui-warning, var(--warning-color, #f59e0b));
    --arch-ui-success: var(--ha-arch-ui-success, var(--success-color, #22c55e));
    --arch-ui-info: var(--ha-arch-ui-info, var(--info-color, #0ea5e9));
    --arch-ui-overlay: var(--ha-arch-ui-overlay, var(--arch-ui-overlay-fallback));
    --arch-ui-radius: var(--ha-arch-ui-radius, var(--ha-card-border-radius, 12px));
    --arch-ui-font: var(--ha-arch-ui-font, var(--ha-font-family-body, var(--paper-font-body1_-_font-family, Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)));
    --arch-ui-focus-ring: 0 0 0 2px var(--arch-ui-accent);
  }

  :host([scheme='light']) {
    --arch-ui-bg-fallback: #f8fafc;
    --arch-ui-surface-fallback: #ffffff;
    --arch-ui-surface-2-fallback: #f1f5f9;
    --arch-ui-text-fallback: #0f172a;
    --arch-ui-text-muted-fallback: #475569;
    --arch-ui-border-fallback: rgba(15, 23, 42, 0.14);
    --arch-ui-overlay-fallback: rgba(15, 23, 42, 0.35);
  }

  :focus-visible {
    outline: none;
    box-shadow: var(--arch-ui-focus-ring);
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

/** Pose l'attribut `scheme` ('light' | 'dark') sur un hôte d'après `hass.themes.darkMode`. */
export function applyColorScheme(host: HTMLElement, hass: unknown): void {
  const darkMode = (hass as { themes?: { darkMode?: unknown } } | undefined)?.themes?.darkMode;
  host.setAttribute('scheme', darkMode === false ? 'light' : 'dark');
}
