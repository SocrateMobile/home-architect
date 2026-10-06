/**
 * Styles des éléments ajoutés au studio pour la persistance et les mises à jour : bandeaux,
 * écran de chargement, dialogues de conflit / brouillons / mise à jour, sélecteur de plans par
 * niveau et indicateur « modifié ». Complètent les styles du panneau (classes .modal-*) et
 * utilisent les mêmes jetons de thème (`--arch-ui-*`, `--studio-*` ; constats F56, F169).
 */
import { css } from 'lit';

export const persistenceStyles = css`
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
`;
