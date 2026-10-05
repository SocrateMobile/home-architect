/**
 * Entrée du bundle « carte » (`home_architect-card.js`).
 *
 * Injecté sur TOUTES les pages Home Assistant via `add_extra_js_url` (y compris l'app
 * compagnon et les tablettes murales) : il ne doit contenir que la carte Lovelace et
 * le canevas en lecture seule, jamais le studio (modales, parseur SVG, catalogue
 * d'édition…), qui vit dans `home_architect-panel.js` (constat F32).
 */
import './home-architect-card';
import { registerBundle } from './version';

registerBundle('card');
