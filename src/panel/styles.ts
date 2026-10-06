/**
 * Styles des éléments ajoutés au studio pour la persistance et les mises à jour : bandeaux,
 * écran de chargement, dialogues de conflit / brouillons / mise à jour, sélecteur de plans par
 * niveau et indicateur « modifié ». Complètent les styles du panneau (classes .modal-*).
 */
import { css } from 'lit';

export const persistenceStyles = css`
  /* Indicateur « modifications non sauvegardées » */
  .dirty-dot {
    color: #f59e0b;
    font-size: 0.75rem;
    line-height: 1;
  }

  button.btn-primary.is-dirty {
    box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.55);
  }

  button.btn-primary:disabled,
  .dropdown-item:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    box-shadow: none;
  }

  .dropdown-item:disabled:hover {
    background: transparent;
    color: #e2e8f0;
  }

  .level-plan-name {
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #cbd5e1;
    font-weight: 500;
  }

  /* Sélecteur de plans par niveau */
  .dropdown-menu-popup.level-menu {
    min-width: 260px;
    max-height: min(70vh, 560px);
    overflow-y: auto;
  }

  .dropdown-group-label {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px 2px;
    font-size: 0.78rem;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .dropdown-item.sub {
    padding-left: 34px;
  }

  .dropdown-item-meta {
    color: #64748b;
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
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .notice.info {
    background: rgba(56, 189, 248, 0.12);
    color: #bae6fd;
  }

  .notice.warning {
    background: rgba(245, 158, 11, 0.14);
    color: #fde68a;
  }

  .notice.error {
    background: rgba(239, 68, 68, 0.16);
    color: #fecaca;
  }

  .notice-message {
    flex: 1 1 260px;
  }

  .notice-action {
    background: rgba(15, 23, 42, 0.55);
    color: #f8fafc;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    padding: 3px 10px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
  }

  .notice-action:hover {
    border-color: #38bdf8;
  }

  .notice-close {
    background: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: 0.9rem;
    padding: 2px 4px;
    opacity: 0.75;
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
    background: rgba(15, 23, 42, 0.72);
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
    background: #1e293b;
    border: 1px solid rgba(56, 189, 248, 0.35);
    border-radius: 14px;
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
    color: #e2e8f0;
    font-size: 0.92rem;
  }

  .loading-box.error {
    border-color: rgba(239, 68, 68, 0.5);
  }

  .spinner {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 3px solid rgba(56, 189, 248, 0.25);
    border-top-color: #38bdf8;
    animation: ha-spin 0.9s linear infinite;
  }

  @keyframes ha-spin {
    to { transform: rotate(360deg); }
  }

  @media (prefers-reduced-motion: reduce) {
    .spinner {
      animation-duration: 3s;
    }
  }

  /* Dialogues (complètent .modal-dialog du panneau) */
  .modal-backdrop.choice-backdrop {
    z-index: 130;
  }

  .modal-dialog.wide {
    width: 640px;
  }

  .modal-dialog.warning {
    border-color: rgba(245, 158, 11, 0.45);
  }

  .modal-dialog-header.warning {
    background: rgba(245, 158, 11, 0.1);
    border-bottom-color: rgba(245, 158, 11, 0.25);
  }

  .modal-dialog.update {
    border-color: rgba(245, 158, 11, 0.45);
  }

  .modal-dialog-header.update {
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.05));
    border-bottom-color: rgba(245, 158, 11, 0.25);
  }

  .update-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: linear-gradient(135deg, #f59e0b, #d97706);
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
    background: rgba(51, 65, 85, 0.85);
    color: #f1f5f9;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .btn-dialog-confirm.secondary:hover {
    background: #334155;
    border-color: #38bdf8;
  }

  .choice-message {
    margin: 0;
    color: #f1f5f9;
    font-size: 0.92rem;
    line-height: 1.5;
  }

  .choice-details {
    margin: 0;
    padding-left: 18px;
    color: #cbd5e1;
    font-size: 0.84rem;
    line-height: 1.55;
  }

  .dialog-hint {
    margin: 0;
    color: #94a3b8;
    font-size: 0.8rem;
    line-height: 1.45;
  }

  .dialog-warning {
    margin: 0;
    padding: 9px 12px;
    border-radius: 10px;
    background: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.3);
    color: #fde68a;
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
    background: rgba(15, 23, 42, 0.65);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .draft-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    color: #f1f5f9;
    font-size: 0.88rem;
  }

  .draft-meta {
    color: #94a3b8;
    font-size: 0.78rem;
  }

  .draft-status {
    font-size: 0.78rem;
    color: #38bdf8;
  }

  .draft-item.status-outdated .draft-status,
  .draft-item.status-deleted .draft-status {
    color: #fbbf24;
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
    background: rgba(0, 0, 0, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.08);
    text-align: center;
  }

  .version-label {
    margin-bottom: 4px;
    color: #94a3b8;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
  }

  .version-label.new {
    color: #f59e0b;
  }

  .version-value {
    color: #ffffff;
    font-family: monospace;
    font-size: 16px;
    font-weight: 800;
  }

  .version-value.new {
    color: #10b981;
  }

  .version-arrow {
    color: #f59e0b;
    font-size: 18px;
    font-weight: 800;
  }

  .update-notes-title {
    margin-bottom: 6px;
    color: #f1f5f9;
    font-size: 12px;
    font-weight: 700;
  }

  .update-notes {
    max-height: 180px;
    overflow-y: auto;
    padding: 12px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #cbd5e1;
    font-size: 12px;
    line-height: 1.5;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }

  .release-link {
    color: #38bdf8;
    font-size: 12px;
    text-decoration: none;
  }

  .release-link:hover {
    text-decoration: underline;
  }

  .footer-links {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px 14px;
  }

  /* Lien de soutien (Buy Me A Coffee) : style local, aucune image externe chargée. */
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

  .support-link:hover,
  .support-link:focus-visible {
    background: #ffe94d;
    box-shadow: 0 0 0 2px rgba(255, 221, 0, 0.35);
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
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #a7f3d0;
    font-size: 0.86rem;
  }

  .about-status.update {
    background: rgba(245, 158, 11, 0.1);
    border-color: rgba(245, 158, 11, 0.35);
    color: #fde68a;
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
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
`;
