/**
 * Dialogues, bandeaux et écrans d'attente du studio liés à la persistance et aux mises à jour,
 * et dialogue « À propos » (version, liens de release et de soutien du projet).
 * Rendus avec Lit dans le Shadow DOM du panneau (styles : ./styles.ts et ceux du panneau) ;
 * toutes les données sont interpolées comme texte (aucun innerHTML).
 */
import { html, nothing, TemplateResult } from 'lit';
import { getLevelLabel } from '../core/levels';
import { VERSION } from '../version';
import { DRAFT_STATUS_LABELS, DraftReview } from './draft-review';
import { RELEASES_URL, UpdateInfo } from './update-check';

/** Dépôt officiel du projet (documentation, signalement de problèmes). */
export const REPOSITORY_URL = 'https://github.com/SocrateMobile/home-architect';

/** Page de soutien du projet (Buy Me A Coffee), ouverte dans un nouvel onglet ; aucune image externe chargée. */
export const SUPPORT_URL = 'https://www.buymeacoffee.com/Socrate';

/** Lien « Soutenir le projet » (style local .support-link). */
function renderSupportLink(): TemplateResult {
  return html`<a class="support-link" href=${SUPPORT_URL} target="_blank" rel="noopener noreferrer">☕ Soutenir le projet</a>`;
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
  /** Libellé du bouton qui ferme sans choisir (null : pas de bouton). */
  cancelLabel?: string | null;
  tone?: 'default' | 'warning' | 'danger';
}

export function renderChoiceDialog(dialog: ChoiceDialogOptions, onChoose: (id: string | null) => void): TemplateResult {
  const tone = dialog.tone ?? 'default';
  const cancelLabel = dialog.cancelLabel === undefined ? 'Annuler' : dialog.cancelLabel;
  return html`
    <div class="modal-backdrop choice-backdrop" @click=${(e: MouseEvent) => { if (e.target === e.currentTarget) onChoose(null); }}>
      <div class="modal-dialog ${tone}" role="alertdialog" aria-modal="true" aria-labelledby="choice-title">
        <div class="modal-dialog-header ${tone}">
          <div class="modal-dialog-title-group">
            <span class="modal-dialog-icon">${dialog.icon}</span>
            <div>
              <h3 class="modal-dialog-title" id="choice-title">${dialog.title}</h3>
              ${dialog.subtitle ? html`<p class="modal-dialog-subtitle">${dialog.subtitle}</p>` : nothing}
            </div>
          </div>
          <button class="btn-dialog-close" title="Fermer" @click=${() => onChoose(null)}>✕</button>
        </div>
        <div class="modal-dialog-body">
          <p class="choice-message">${dialog.message}</p>
          ${dialog.details?.length ? html`
            <ul class="choice-details">${dialog.details.map(line => html`<li>${line}</li>`)}</ul>
          ` : nothing}
        </div>
        <div class="modal-dialog-footer wrap">
          ${cancelLabel ? html`<button class="btn-dialog-cancel" @click=${() => onChoose(null)}>${cancelLabel}</button>` : nothing}
          ${dialog.actions.map(action => html`
            <button class="btn-dialog-confirm ${action.kind ?? 'primary'}" @click=${() => onChoose(action.id)}>
              ${action.icon ? html`<span>${action.icon}</span>` : nothing}
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

/** Date et heure locales d'un horodatage ISO (copies locales). */
export function formatDate(iso: string): string {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return 'date inconnue';
  return new Date(t).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function renderDraftsDialog(reviews: DraftReview[], handlers: DraftsDialogHandlers): TemplateResult {
  return html`
    <div class="modal-backdrop" @click=${(e: MouseEvent) => { if (e.target === e.currentTarget) handlers.onClose(); }}>
      <div class="modal-dialog warning wide" role="dialog" aria-modal="true" aria-labelledby="drafts-title">
        <div class="modal-dialog-header warning">
          <div class="modal-dialog-title-group">
            <span class="modal-dialog-icon">🗂️</span>
            <div>
              <h3 class="modal-dialog-title" id="drafts-title">Copies locales non sauvegardées</h3>
              <p class="modal-dialog-subtitle">Modifications conservées dans ce navigateur et absentes du serveur</p>
            </div>
          </div>
          <button class="btn-dialog-close" title="Fermer" @click=${handlers.onClose}>✕</button>
        </div>
        <div class="modal-dialog-body">
          <ul class="draft-list">
            ${reviews.map(review => {
              const p = review.draft.project;
              const label = DRAFT_STATUS_LABELS[review.status];
              return html`
                <li class="draft-item status-${review.status}">
                  <div class="draft-info">
                    <strong>${p.name}</strong>
                    <span class="draft-meta">${getLevelLabel(p.category)} · enregistrée le ${formatDate(review.draft.savedAt)}</span>
                    <span class="draft-status">${label}</span>
                  </div>
                  <div class="draft-actions">
                    <button class="btn-dialog-confirm secondary" title="Ouvrir la copie locale dans le studio" @click=${() => handlers.onOpen(review)}>📂 Ouvrir</button>
                    <button class="btn-dialog-confirm primary" title="Envoyer la copie locale au serveur" @click=${() => handlers.onSend(review)}>☁️ Envoyer au serveur</button>
                    <button class="btn-dialog-confirm danger" title="Supprimer définitivement la copie locale" @click=${() => handlers.onDiscard(review)}>🗑️</button>
                  </div>
                </li>
              `;
            })}
          </ul>
          <p class="dialog-hint">
            ℹ️ Si vous modifiez l'un de ces plans sans ouvrir sa copie locale, celle-ci sera remplacée par vos nouvelles modifications.
          </p>
        </div>
        <div class="modal-dialog-footer">
          <button class="btn-dialog-cancel" @click=${handlers.onClose}>Décider plus tard</button>
        </div>
      </div>
    </div>
  `;
}

// --- Mise à jour ---------------------------------------------------------------------------------

export interface UpdateDialogHandlers {
  onClose: () => void;
  onOpenUpdates: () => void;
}

export function renderUpdateDialog(info: UpdateInfo, dirtyCount: number, handlers: UpdateDialogHandlers): TemplateResult {
  return html`
    <div class="modal-backdrop" @click=${(e: MouseEvent) => { if (e.target === e.currentTarget) handlers.onClose(); }}>
      <div class="modal-dialog update" role="dialog" aria-modal="true" aria-labelledby="update-title">
        <div class="modal-dialog-header update">
          <div class="modal-dialog-title-group">
            <span class="modal-dialog-icon update-icon">🚀</span>
            <div>
              <h3 class="modal-dialog-title" id="update-title">Mise à jour de Home Architect</h3>
              <p class="modal-dialog-subtitle">Nouvelle version disponible</p>
            </div>
          </div>
          <button class="btn-dialog-close" title="Fermer" @click=${handlers.onClose}>✕</button>
        </div>
        <div class="modal-dialog-body">
          <div class="version-compare">
            <div>
              <div class="version-label">Version installée</div>
              <div class="version-value">v${info.installedVersion || VERSION}</div>
            </div>
            <div class="version-arrow">➔</div>
            <div>
              <div class="version-label new">Nouvelle version</div>
              <div class="version-value new">v${info.latestVersion}</div>
            </div>
          </div>
          <div>
            <div class="update-notes-title">📋 Notes de version</div>
            <div class="update-notes">${info.releaseNotes || 'Consultez la page de la release pour le détail des nouveautés.'}</div>
          </div>
          <p class="dialog-hint">
            💡 La mise à jour s'installe depuis Paramètres › Mises à jour de Home Assistant (ou depuis HACS),
            puis nécessite un redémarrage de Home Assistant.
          </p>
          ${dirtyCount > 0 ? html`
            <p class="dialog-warning">
              ⚠️ ${dirtyCount} plan${dirtyCount > 1 ? 's ont' : ' a'} des modifications non sauvegardées.
              Sauvegardez avant de quitter le studio : sinon elles ne seront conservées que comme copie locale dans ce navigateur.
            </p>
          ` : nothing}
        </div>
        <div class="modal-dialog-footer spread">
          <div class="footer-links">
            <a class="release-link" href=${info.releaseUrl} target="_blank" rel="noopener noreferrer">🔗 Voir la release</a>
            ${renderSupportLink()}
          </div>
          <div class="footer-buttons">
            <button class="btn-dialog-cancel" @click=${handlers.onClose}>Fermer</button>
            <button class="btn-dialog-confirm primary" @click=${handlers.onOpenUpdates}>
              <span>⚙️</span>
              <span>Ouvrir les mises à jour</span>
            </button>
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
    return html`<p class="dialog-hint">ℹ️ Les mises à jour sont installées par un administrateur depuis Paramètres › Mises à jour.</p>`;
  }
  if (!info) {
    return html`<p class="dialog-hint">ℹ️ État des mises à jour indisponible pour le moment.</p>`;
  }
  return html`
    ${info.available ? html`
      <div class="about-status update">
        <span>🚀 Nouvelle version <strong>v${info.latestVersion}</strong> disponible.</span>
        <button class="btn-dialog-confirm primary" @click=${opts.onShowUpdate}>Voir la mise à jour</button>
      </div>
    ` : html`<div class="about-status">✅ Home Architect est à jour.</div>`}
    ${info.reloadRequired ? html`
      <p class="dialog-warning">🔁 Une nouvelle version (v${info.installedVersion}) est installée : rechargez la page pour l'utiliser.</p>
    ` : nothing}
  `;
}

/** Dialogue « À propos » : version, état des mises à jour, liens (release, dépôt, soutien du projet). */
export function renderAboutDialog(opts: AboutDialogOptions): TemplateResult {
  const releaseUrl = opts.info?.releaseUrl ?? RELEASES_URL;
  return html`
    <div class="modal-backdrop" @click=${(e: MouseEvent) => { if (e.target === e.currentTarget) opts.onClose(); }}>
      <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="about-title">
        <div class="modal-dialog-header">
          <div class="modal-dialog-title-group">
            <span class="modal-dialog-icon">📐</span>
            <div>
              <h3 class="modal-dialog-title" id="about-title">Home Architect Studio</h3>
              <p class="modal-dialog-subtitle">Plans interactifs pour Home Assistant</p>
            </div>
          </div>
          <button class="btn-dialog-close" title="Fermer" @click=${opts.onClose}>✕</button>
        </div>
        <div class="modal-dialog-body">
          <div class="about-version">
            <span class="version-label">Version du studio</span>
            <span class="version-value">v${VERSION}</span>
            ${opts.info?.loadedBundles ? html`<span class="dialog-hint">Chargé dans la page : ${opts.info.loadedBundles}</span>` : nothing}
          </div>
          ${renderUpdateStatus(opts)}
          <div class="about-links">
            <a class="release-link" href=${releaseUrl} target="_blank" rel="noopener noreferrer">🔗 Notes de version</a>
            <a class="release-link" href=${REPOSITORY_URL} target="_blank" rel="noopener noreferrer">📘 Documentation et support</a>
          </div>
          <div class="about-support">
            <span class="dialog-hint">Home Architect est développé bénévolement. Si le projet vous est utile :</span>
            ${renderSupportLink()}
          </div>
        </div>
        <div class="modal-dialog-footer spread">
          ${opts.canManageUpdates ? html`
            <button class="btn-dialog-confirm secondary" @click=${opts.onOpenUpdates}>⚙️ Mises à jour de Home Assistant</button>
          ` : html`<span></span>`}
          <button class="btn-dialog-cancel" @click=${opts.onClose}>Fermer</button>
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
        <strong>⚠️ Impossible de charger les plans</strong>
        <span>${message}</span>
        <span class="dialog-hint">La sauvegarde est désactivée tant que les plans du serveur ne sont pas chargés.</span>
        <button class="btn-dialog-confirm primary" @click=${onRetry}>🔄 Réessayer</button>
      </div>
    </div>
  `;
}

// --- Bandeaux persistants -------------------------------------------------------------------------

export interface PanelNotice {
  /** Clé unique (un même bandeau n'est jamais affiché deux fois). */
  key: string;
  kind: 'info' | 'warning' | 'error';
  message: string;
  actions?: { label: string; run: () => void }[];
  dismissible?: boolean;
}

export function renderNotices(notices: PanelNotice[], onDismiss: (key: string) => void): TemplateResult | typeof nothing {
  if (notices.length === 0) return nothing;
  return html`
    <div class="notice-stack">
      ${notices.map(notice => html`
        <div class="notice ${notice.kind}" role=${notice.kind === 'error' ? 'alert' : 'status'}>
          <span class="notice-message">${notice.message}</span>
          ${notice.actions?.map(action => html`<button class="notice-action" @click=${action.run}>${action.label}</button>`)}
          ${notice.dismissible === false ? nothing : html`
            <button class="notice-close" title="Masquer" @click=${() => onDismiss(notice.key)}>✕</button>
          `}
        </div>
      `)}
    </div>
  `;
}
