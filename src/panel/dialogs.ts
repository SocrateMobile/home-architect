/**
 * Dialogues, bandeaux et écrans d'attente du studio liés à la persistance et aux mises à jour,
 * et dialogue « À propos » (version, liens de release et de soutien du projet).
 * Rendus avec Lit dans le Shadow DOM du panneau (styles : ./styles.ts et ceux du panneau) ;
 * toutes les données sont interpolées comme texte (aucun innerHTML).
 *
 * Libellés traduits au rendu (espace `panel`, constat F110). Chaque dialogue porte `data-modal`,
 * role=dialog (ou alertdialog), aria-modal et aria-labelledby : le panneau (ModalFocusController)
 * y place le focus, l'y retient et le rend à l'élément déclencheur à la fermeture (constat F159).
 */
import { html, nothing, TemplateResult } from 'lit';
import { localize } from '../i18n';
import '../i18n/locales/panel';
import { getLevelLabel } from '../core/levels';
import { VERSION } from '../version';
import { DraftReview, draftStatusLabel } from './draft-review';
import { RELEASES_URL, UpdateInfo, describeLoadedBundles } from './update-check';
import { formatDateTime, localizeCount } from './format';

/** Dépôt officiel du projet (documentation, signalement de problèmes). */
export const REPOSITORY_URL = 'https://github.com/SocrateMobile/home-architect';

/** Page de soutien du projet (Buy Me A Coffee), ouverte dans un nouvel onglet ; aucune image externe chargée. */
export const SUPPORT_URL = 'https://www.buymeacoffee.com/Socrate';

/** Texte affiché : chaîne, ou fonction réévaluée à chaque rendu (suit la langue courante). */
export type DisplayText = string | (() => string);

export function resolveText(text: DisplayText): string {
  return typeof text === 'function' ? text() : text;
}

/** Bouton de fermeture (✕) d'un dialogue, nommé pour les lecteurs d'écran. */
function renderCloseButton(onClose: () => void): TemplateResult {
  const label = localize('panel.common.close');
  return html`<button class="btn-dialog-close" title=${label} aria-label=${label} @click=${onClose}><span aria-hidden="true">✕</span></button>`;
}

/** Lien « ☕ Soutenir le projet » (style local .support-link, acquis P8). */
function renderSupportLink(): TemplateResult {
  return html`
    <a class="support-link" href=${SUPPORT_URL} target="_blank" rel="noopener noreferrer"
      aria-label=${localize('panel.support.aria')}>${localize('panel.support.label')}</a>
  `;
}

/** Ferme le dialogue sur un clic du fond (hors de la boîte). */
function onBackdrop(close: () => void) {
  return (e: MouseEvent) => {
    if (e.target === e.currentTarget) close();
  };
}

// --- Dialogue de choix (conflit, confirmation…) ----------------------------------------------------

export interface ChoiceAction {
  id: string;
  label: string;
  icon?: string;
  kind?: 'primary' | 'secondary' | 'danger';
}

export interface ChoiceDialogOptions {
  icon: string;
  title: string;
  subtitle?: string;
  message: string;
  /** Lignes complémentaires (conséquences de chaque choix…). */
  details?: string[];
  actions: ChoiceAction[];
  /** Libellé du bouton qui ferme sans choisir (null : pas de bouton ; absent : « Annuler »). */
  cancelLabel?: string | null;
  tone?: 'default' | 'warning' | 'danger';
}

/**
 * Dialogue de choix. Focus initial : « Annuler » s'il existe (aucune action, destructive ou non,
 * n'est déclenchée par un appui involontaire sur Entrée), sinon la première action non destructive.
 */
export function renderChoiceDialog(dialog: ChoiceDialogOptions, onChoose: (id: string | null) => void): TemplateResult {
  const tone = dialog.tone ?? 'default';
  const cancelLabel = dialog.cancelLabel === undefined ? localize('panel.common.cancel') : dialog.cancelLabel;
  const initialAction = cancelLabel ? null : (dialog.actions.find(a => a.kind !== 'danger') ?? dialog.actions[0])?.id;
  return html`
    <div class="modal-backdrop choice-backdrop" @click=${onBackdrop(() => onChoose(null))}>
      <div class="modal-dialog ${tone}" data-modal tabindex="-1" role="alertdialog" aria-modal="true"
        aria-labelledby="choice-title" aria-describedby="choice-message">
        <div class="modal-dialog-header ${tone}">
          <div class="modal-dialog-title-group">
            <span class="modal-dialog-icon" aria-hidden="true">${dialog.icon}</span>
            <div>
              <h3 class="modal-dialog-title" id="choice-title">${dialog.title}</h3>
              ${dialog.subtitle ? html`<p class="modal-dialog-subtitle">${dialog.subtitle}</p>` : nothing}
            </div>
          </div>
          ${renderCloseButton(() => onChoose(null))}
        </div>
        <div class="modal-dialog-body">
          <p class="choice-message" id="choice-message">${dialog.message}</p>
          ${dialog.details?.length ? html`
            <ul class="choice-details">${dialog.details.map(line => html`<li>${line}</li>`)}</ul>
          ` : nothing}
        </div>
        <div class="modal-dialog-footer wrap">
          ${cancelLabel ? html`
            <button class="btn-dialog-cancel" data-initial-focus @click=${() => onChoose(null)}>${cancelLabel}</button>
          ` : nothing}
          ${dialog.actions.map(action => html`
            <button class="btn-dialog-confirm ${action.kind ?? 'primary'}" ?data-initial-focus=${action.id === initialAction}
              @click=${() => onChoose(action.id)}>
              ${action.icon ? html`<span aria-hidden="true">${action.icon}</span>` : nothing}
              <span>${action.label}</span>
            </button>
          `)}
        </div>
      </div>
    </div>
  `;
}

// --- Brouillons locaux ---------------------------------------------------------------------------

export interface DraftsDialogHandlers {
  onOpen: (review: DraftReview) => void;
  onSend: (review: DraftReview) => void;
  onDiscard: (review: DraftReview) => void;
  onClose: () => void;
}

export function renderDraftsDialog(reviews: DraftReview[], handlers: DraftsDialogHandlers): TemplateResult {
  return html`
    <div class="modal-backdrop" @click=${onBackdrop(handlers.onClose)}>
      <div class="modal-dialog warning wide" data-modal tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="drafts-title">
        <div class="modal-dialog-header warning">
          <div class="modal-dialog-title-group">
            <span class="modal-dialog-icon" aria-hidden="true">🗂️</span>
            <div>
              <h3 class="modal-dialog-title" id="drafts-title">${localize('panel.drafts.title')}</h3>
              <p class="modal-dialog-subtitle">${localize('panel.drafts.subtitle')}</p>
            </div>
          </div>
          ${renderCloseButton(handlers.onClose)}
        </div>
        <div class="modal-dialog-body">
          <ul class="draft-list">
            ${reviews.map(review => {
              const p = review.draft.project;
              const discardLabel = localize('panel.drafts.discard_title', { name: p.name });
              return html`
                <li class="draft-item status-${review.status}">
                  <div class="draft-info">
                    <strong>${p.name}</strong>
                    <span class="draft-meta">${localize('panel.drafts.meta', {
                      level: getLevelLabel(p.category),
                      date: formatDateTime(review.draft.savedAt)
                    })}</span>
                    <span class="draft-status">${draftStatusLabel(review.status)}</span>
                  </div>
                  <div class="draft-actions">
                    <button class="btn-dialog-confirm secondary" title=${localize('panel.drafts.open_title')} @click=${() => handlers.onOpen(review)}>
                      <span aria-hidden="true">📂</span> ${localize('panel.drafts.open')}
                    </button>
                    <button class="btn-dialog-confirm primary" title=${localize('panel.drafts.send_title')} @click=${() => handlers.onSend(review)}>
                      <span aria-hidden="true">☁️</span> ${localize('panel.drafts.send')}
                    </button>
                    <button class="btn-dialog-confirm danger" title=${discardLabel} aria-label=${discardLabel} @click=${() => handlers.onDiscard(review)}>
                      <span aria-hidden="true">🗑️</span>
                    </button>
                  </div>
                </li>
              `;
            })}
          </ul>
          <p class="dialog-hint">${localize('panel.drafts.hint')}</p>
        </div>
        <div class="modal-dialog-footer">
          <button class="btn-dialog-cancel" @click=${handlers.onClose}>${localize('panel.drafts.later')}</button>
        </div>
      </div>
    </div>
  `;
}

// --- Mise à jour ---------------------------------------------------------------------------------

export type UpdateInstallStatus = 'idle' | 'installing' | 'success' | 'error';

export interface UpdateDialogHandlers {
  onClose: () => void;
  onOpenUpdates: () => void;
  onInstallUpdate?: () => void;
  onRestartHa?: () => void;
}

export interface UpdateDialogOptions {
  canManageUpdates?: boolean;
  installStatus?: UpdateInstallStatus;
  installError?: string | null;
}

export function renderUpdateDialog(
  info: UpdateInfo,
  dirtyCount: number,
  handlers: UpdateDialogHandlers,
  options: UpdateDialogOptions = {}
): TemplateResult {
  const { canManageUpdates = true, installStatus = 'idle', installError = null } = options;
  const isInstalling = installStatus === 'installing';
  const isSuccess = installStatus === 'success';
  const isError = installStatus === 'error';

  let bodyContent: TemplateResult;
  let footerButtons: TemplateResult;

  if (isInstalling) {
    bodyContent = html`
      <div class="update-progress-box" role="status" aria-live="polite">
        <span class="spinner" aria-hidden="true"></span>
        <h4>${localize('panel.update.installing')}</h4>
        <p class="dialog-hint">${localize('panel.update.installing_hint')}</p>
      </div>
    `;
    footerButtons = html`
      <button class="btn-dialog-cancel" disabled>${localize('panel.common.close')}</button>
    `;
  } else if (isSuccess) {
    bodyContent = html`
      <div class="update-success-box" role="status">
        <span class="update-success-icon" aria-hidden="true">✅</span>
        <h4>${localize('panel.update.success_title')}</h4>
        <p class="update-success-msg">${localize('panel.update.success_message', { version: info.latestVersion ?? '' })}</p>
        <p class="dialog-hint">${localize('panel.update.success_hint')}</p>
      </div>
    `;
    footerButtons = html`
      <button class="btn-dialog-cancel" @click=${handlers.onClose}>${localize('panel.common.close')}</button>
      ${handlers.onRestartHa ? html`
        <button class="btn-dialog-confirm primary" data-initial-focus @click=${handlers.onRestartHa}>
          <span aria-hidden="true">🔄</span>
          <span>${localize('panel.update.restart_ha')}</span>
        </button>
      ` : nothing}
    `;
  } else if (isError) {
    bodyContent = html`
      <div class="update-error-box" role="alert">
        <span class="update-error-icon" aria-hidden="true">⚠️</span>
        <h4>${localize('panel.update.error_title')}</h4>
        <p class="dialog-warning">${installError || localize('panel.update.error_title')}</p>
        <p class="dialog-hint">${localize('panel.update.how_to')}</p>
      </div>
    `;
    footerButtons = html`
      <button class="btn-dialog-cancel" @click=${handlers.onClose}>${localize('panel.common.close')}</button>
      <button class="btn-dialog-confirm secondary" @click=${handlers.onOpenUpdates}>
        <span aria-hidden="true">⚙️</span>
        <span>${localize('panel.update.open_updates')}</span>
      </button>
      ${handlers.onInstallUpdate && canManageUpdates ? html`
        <button class="btn-dialog-confirm primary" data-initial-focus @click=${handlers.onInstallUpdate}>
          <span aria-hidden="true">⚡</span>
          <span>${localize('panel.update.retry')}</span>
        </button>
      ` : nothing}
    `;
  } else {
    // idle
    bodyContent = html`
      <div class="version-compare">
        <div>
          <div class="version-label">${localize('panel.update.installed')}</div>
          <div class="version-value">v${info.installedVersion || VERSION}</div>
        </div>
        <div class="version-arrow" aria-hidden="true">➔</div>
        <div>
          <div class="version-label new">${localize('panel.update.latest')}</div>
          <div class="version-value new">v${info.latestVersion}</div>
        </div>
      </div>
      <div>
        <div class="update-notes-title"><span aria-hidden="true">📋</span> ${localize('panel.update.notes')}</div>
        <div class="update-notes">${info.releaseNotes || localize('panel.update.notes_empty')}</div>
      </div>
      <p class="dialog-hint">${localize('panel.update.how_to')}</p>
      ${dirtyCount > 0 ? html`
        <p class="dialog-warning">${localizeCount('panel.update.dirty_warning', dirtyCount)}</p>
      ` : nothing}
    `;
    footerButtons = html`
      <button class="btn-dialog-cancel" @click=${handlers.onClose}>${localize('panel.common.close')}</button>
      <button class="btn-dialog-confirm secondary" @click=${handlers.onOpenUpdates}>
        <span aria-hidden="true">⚙️</span>
        <span>${localize('panel.update.open_updates')}</span>
      </button>
      ${handlers.onInstallUpdate && canManageUpdates ? html`
        <button class="btn-dialog-confirm primary" data-initial-focus @click=${handlers.onInstallUpdate}>
          <span aria-hidden="true">⚡</span>
          <span>${localize('panel.update.install_button', { version: info.latestVersion ?? '' })}</span>
        </button>
      ` : nothing}
    `;
  }

  return html`
    <div class="modal-backdrop" @click=${isInstalling ? undefined : onBackdrop(handlers.onClose)}>
      <div class="modal-dialog update" data-modal tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="update-title">
        <div class="modal-dialog-header update">
          <div class="modal-dialog-title-group">
            <span class="modal-dialog-icon update-icon" aria-hidden="true">🚀</span>
            <div>
              <h3 class="modal-dialog-title" id="update-title">${localize('panel.update.title')}</h3>
              <p class="modal-dialog-subtitle">${localize('panel.update.subtitle')}</p>
            </div>
          </div>
          ${isInstalling ? nothing : renderCloseButton(handlers.onClose)}
        </div>
        <div class="modal-dialog-body">
          ${bodyContent}
        </div>
        <div class="modal-dialog-footer spread">
          <div class="footer-links">
            <a class="release-link" href=${info.releaseUrl} target="_blank" rel="noopener noreferrer">
              <span aria-hidden="true">🔗</span> ${localize('panel.update.view_release')}
            </a>
            ${renderSupportLink()}
          </div>
          <div class="footer-buttons">
            ${footerButtons}
          </div>
        </div>
      </div>
    </div>
  `;
}

// --- À propos ------------------------------------------------------------------------------------

export interface AboutDialogOptions {
  /** Dernière réponse de check_updates (null : inconnue, ou utilisateur non administrateur). */
  info: UpdateInfo | null;
  /** L'utilisateur peut installer les mises à jour (administrateur). */
  canManageUpdates: boolean;
  onClose: () => void;
  /** Ouvre la modale de la mise à jour disponible. */
  onShowUpdate: () => void;
  /** Ouvre la page des mises à jour de Home Assistant. */
  onOpenUpdates: () => void;
}

function renderUpdateStatus(opts: AboutDialogOptions): TemplateResult {
  const { info } = opts;
  if (!opts.canManageUpdates) {
    return html`<p class="dialog-hint">${localize('panel.about.updates_by_admin')}</p>`;
  }
  if (!info) {
    return html`<p class="dialog-hint">${localize('panel.about.updates_unknown')}</p>`;
  }
  return html`
    ${info.available ? html`
      <div class="about-status update" role="status">
        <span>${localize('panel.about.update_available', { version: info.latestVersion ?? '' })}</span>
        <button class="btn-dialog-confirm primary" @click=${opts.onShowUpdate}>${localize('panel.about.show_update')}</button>
      </div>
    ` : html`<div class="about-status" role="status">${localize('panel.about.up_to_date')}</div>`}
    ${info.reloadRequired ? html`
      <p class="dialog-warning">${localize('panel.about.reload_required', { version: info.installedVersion })}</p>
    ` : nothing}
  `;
}

/** Dialogue « À propos » : version, état des mises à jour, liens (release, dépôt, soutien du projet). */
export function renderAboutDialog(opts: AboutDialogOptions): TemplateResult {
  const releaseUrl = opts.info?.releaseUrl ?? RELEASES_URL;
  const bundles = opts.info ? describeLoadedBundles() : '';
  return html`
    <div class="modal-backdrop" @click=${onBackdrop(opts.onClose)}>
      <div class="modal-dialog" data-modal tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="about-title">
        <div class="modal-dialog-header">
          <div class="modal-dialog-title-group">
            <span class="modal-dialog-icon" aria-hidden="true">📐</span>
            <div>
              <h3 class="modal-dialog-title" id="about-title">Home Architect Studio</h3>
              <p class="modal-dialog-subtitle">${localize('panel.about.subtitle')}</p>
            </div>
          </div>
          ${renderCloseButton(opts.onClose)}
        </div>
        <div class="modal-dialog-body">
          <div class="about-version">
            <span class="version-label">${localize('panel.about.studio_version')}</span>
            <span class="version-value">v${VERSION}</span>
            ${bundles ? html`<span class="dialog-hint">${localize('panel.about.loaded_bundles', { bundles })}</span>` : nothing}
          </div>
          ${renderUpdateStatus(opts)}
          <div class="about-links">
            <a class="release-link" href=${releaseUrl} target="_blank" rel="noopener noreferrer">
              <span aria-hidden="true">🔗</span> ${localize('panel.about.release_notes')}
            </a>
            <a class="release-link" href=${REPOSITORY_URL} target="_blank" rel="noopener noreferrer">
              <span aria-hidden="true">📘</span> ${localize('panel.about.documentation')}
            </a>
          </div>
          <div class="about-support">
            <span class="dialog-hint">${localize('panel.about.support_hint')}</span>
            ${renderSupportLink()}
          </div>
        </div>
        <div class="modal-dialog-footer spread">
          ${opts.canManageUpdates ? html`
            <button class="btn-dialog-confirm secondary" @click=${opts.onOpenUpdates}>
              <span aria-hidden="true">⚙️</span> ${localize('panel.about.ha_updates')}
            </button>
          ` : html`<span></span>`}
          <button class="btn-dialog-cancel" data-initial-focus @click=${opts.onClose}>${localize('panel.common.close')}</button>
        </div>
      </div>
    </div>
  `;
}

// --- Chargement et opérations bloquantes ----------------------------------------------------------

export function renderLoadingOverlay(message: string): TemplateResult {
  return html`
    <div class="loading-overlay" role="status" aria-live="polite">
      <div class="loading-box">
        <span class="spinner" aria-hidden="true"></span>
        <span>${message}</span>
      </div>
    </div>
  `;
}

export function renderLoadError(message: string, onRetry: () => void): TemplateResult {
  return html`
    <div class="loading-overlay" role="alert">
      <div class="loading-box error">
        <strong><span aria-hidden="true">⚠️</span> ${localize('panel.loading.error_title')}</strong>
        <span>${message}</span>
        <span class="dialog-hint">${localize('panel.loading.error_hint')}</span>
        <button class="btn-dialog-confirm primary" @click=${onRetry}>
          <span aria-hidden="true">🔄</span> ${localize('panel.common.retry')}
        </button>
      </div>
    </div>
  `;
}

// --- Bandeaux persistants -------------------------------------------------------------------------

export interface PanelNotice {
  /** Clé unique (un même bandeau n'est jamais affiché deux fois). */
  key: string;
  kind: 'info' | 'warning' | 'error';
  message: DisplayText;
  actions?: { label: DisplayText; run: () => void }[];
  dismissible?: boolean;
}

export function renderNotices(notices: PanelNotice[], onDismiss: (key: string) => void): TemplateResult | typeof nothing {
  if (notices.length === 0) return nothing;
  const dismissLabel = localize('panel.notice.dismiss');
  return html`
    <div class="notice-stack">
      ${notices.map(notice => html`
        <div class="notice ${notice.kind}" role=${notice.kind === 'error' ? 'alert' : 'status'}>
          <span class="notice-message">${resolveText(notice.message)}</span>
          ${notice.actions?.map(action => html`<button class="notice-action" @click=${action.run}>${resolveText(action.label)}</button>`)}
          ${notice.dismissible === false ? nothing : html`
            <button class="notice-close" title=${dismissLabel} aria-label=${dismissLabel} @click=${() => onDismiss(notice.key)}>
              <span aria-hidden="true">✕</span>
            </button>
          `}
        </div>
      `)}
    </div>
  `;
}
