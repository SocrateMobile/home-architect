/**
 * Entrée du bundle « studio » (`home_architect-panel.js`).
 *
 * Chargé uniquement par le panneau latéral (`module_url`). Les imports explicites des
 * composants garantissent que tous les éléments du studio sont définis, même si le
 * panneau n'importe certains modules que pour leurs types (imports effacés à la
 * compilation). Le canevas et Lit sont partagés avec la carte via `chunks/`.
 */
import './components/canvas-view';
import './components/toolbar';
import './components/entity-drawer';
import './components/wizard-modal';
import './components/room-modal';
import './components/calibrate-modal';
import './components/rescale-modal';
import './components/import-modal';
import './components/export-modal';
import './components/save-load-modal';
import './home-architect-panel';
import { registerBundle } from './version';

registerBundle('panel');
