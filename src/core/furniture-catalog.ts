import { svg, SVGTemplateResult } from 'lit';
import { FurnitureCategory, FurnitureItem } from './types';

export interface FurnitureCatalogTemplate {
  type: string;
  name: string;
  category: FurnitureCategory;
  width: number;  // in meters (width along X)
  length: number; // in meters (depth along Y)
  icon: string;
  defaultColor?: string;
  renderSvg: (w: number, h: number, isSelected: boolean) => SVGTemplateResult;
}

export const FURNITURE_CATALOG: FurnitureCatalogTemplate[] = [
  // ==========================================
  // SALON (SEATING)
  // ==========================================
  {
    type: 'sofa_3p',
    name: 'Canapé 3 places',
    category: 'seating',
    width: 2.20,
    length: 0.95,
    icon: '🛋️',
    renderSvg: (w, h, sel) => {
      const armW = Math.max(8, w * 0.1);
      const backH = Math.max(10, h * 0.26);
      const cushionW = (w - armW * 2) / 3;
      return svg`
        <g class="furniture-symbol" stroke="${sel ? '#38bdf8' : '#94a3b8'}" stroke-width="1.6" fill="${sel ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.85)'}">
          <!-- Contour principal -->
          <rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="6" />
          <!-- Dossier arrière -->
          <rect x="${-w/2 + armW}" y="${-h/2}" width="${w - armW*2}" height="${backH}" rx="3" fill="rgba(51, 65, 85, 0.9)" />
          <!-- Accoudoirs gauche & droit -->
          <rect x="${-w/2}" y="${-h/2}" width="${armW}" height="${h}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${w/2 - armW}" y="${-h/2}" width="${armW}" height="${h}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <!-- 3 Coussins d'assise -->
          <rect x="${-w/2 + armW + 2}" y="${-h/2 + backH + 2}" width="${cushionW - 4}" height="${h - backH - 4}" rx="4" />
          <rect x="${-w/2 + armW + cushionW + 2}" y="${-h/2 + backH + 2}" width="${cushionW - 4}" height="${h - backH - 4}" rx="4" />
          <rect x="${-w/2 + armW + cushionW*2 + 2}" y="${-h/2 + backH + 2}" width="${cushionW - 4}" height="${h - backH - 4}" rx="4" />
        </g>
      `;
    }
  },
  {
    type: 'sofa_2p',
    name: 'Canapé 2 places',
    category: 'seating',
    width: 1.60,
    length: 0.90,
    icon: '🛋️',
    renderSvg: (w, h, sel) => {
      const armW = Math.max(8, w * 0.12);
      const backH = Math.max(10, h * 0.26);
      const cushionW = (w - armW * 2) / 2;
      return svg`
        <g class="furniture-symbol" stroke="${sel ? '#38bdf8' : '#94a3b8'}" stroke-width="1.6" fill="${sel ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.85)'}">
          <rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="6" />
          <rect x="${-w/2 + armW}" y="${-h/2}" width="${w - armW*2}" height="${backH}" rx="3" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${-w/2}" y="${-h/2}" width="${armW}" height="${h}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${w/2 - armW}" y="${-h/2}" width="${armW}" height="${h}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${-w/2 + armW + 2}" y="${-h/2 + backH + 2}" width="${cushionW - 4}" height="${h - backH - 4}" rx="4" />
          <rect x="${-w/2 + armW + cushionW + 2}" y="${-h/2 + backH + 2}" width="${cushionW - 4}" height="${h - backH - 4}" rx="4" />
        </g>
      `;
    }
  },
  {
    type: 'armchair',
    name: 'Fauteuil club',
    category: 'seating',
    width: 0.85,
    length: 0.85,
    icon: '🪑',
    renderSvg: (w, h, sel) => {
      const armW = Math.max(6, w * 0.18);
      const backH = Math.max(8, h * 0.28);
      return svg`
        <g class="furniture-symbol" stroke="${sel ? '#38bdf8' : '#94a3b8'}" stroke-width="1.5" fill="${sel ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.85)'}">
          <rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="6" />
          <rect x="${-w/2 + armW}" y="${-h/2}" width="${w - armW*2}" height="${backH}" rx="3" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${-w/2}" y="${-h/2}" width="${armW}" height="${h}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${w/2 - armW}" y="${-h/2}" width="${armW}" height="${h}" rx="4" fill="rgba(51, 65, 85, 0.9)" />
          <rect x="${-w/2 + armW + 2}" y="${-h/2 + backH + 2}" width="${w - armW*2 - 4}" height="${h - backH - 4}" rx="4" />
        </g>
      `;
    }
  },
  {
    type: 'coffee_table',
    name: 'Table basse',
    category: 'seating',
    width: 1.10,
    length: 0.60,
    icon: '☕',
    renderSvg: (w, h, sel) => {
      return svg`
        <g class="furniture-symbol" stroke="${sel ? '#38bdf8' : '#94a3b8'}" stroke-width="1.5" fill="${sel ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.85)'}">
          <rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="8" />
          <line x1="${-w/2 + 8}" y1="${-h/2 + 8}" x2="${w/2 - 8}" y2="${h/2 - 8}" stroke-dasharray="3,3" opacity="0.4" />
          <line x1="${w/2 - 8}" y1="${-h/2 + 8}" x2="${-w/2 + 8}" y2="${h/2 - 8}" stroke-dasharray="3,3" opacity="0.4" />
        </g>
      `;
    }
  },

  // ==========================================
  // CHAMBRE (BED)
  // ==========================================
  {
    type: 'bed_double',
    name: 'Lit double (Queen)',
    category: 'bed',
    width: 1.60,
    length: 2.00,
    icon: '🛏️',
    renderSvg: (w, h, sel) => {
      const pillowW = (w - 16) / 2;
      const pillowH = h * 0.22;
      const duvetY = -h/2 + pillowH + 8;
      return svg`
        <g class="furniture-symbol" stroke="${sel ? '#38bdf8' : '#94a3b8'}" stroke-width="1.6" fill="${sel ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.85)'}">
          <!-- Cadre du lit -->
          <rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="6" />
          <!-- Tête de lit -->
          <line x1="${-w/2}" y1="${-h/2 + 4}" x2="${w/2}" y2="${-h/2 + 4}" stroke-width="3" stroke="${sel ? '#38bdf8' : '#cbd5e1'}" />
          <!-- 2 Oreillers -->
          <rect x="${-w/2 + 6}" y="${-h/2 + 8}" width="${pillowW}" height="${pillowH}" rx="4" fill="rgba(241, 245, 249, 0.2)" />
          <rect x="${w/2 - pillowW - 6}" y="${-h/2 + 8}" width="${pillowW}" height="${pillowH}" rx="4" fill="rgba(241, 245, 249, 0.2)" />
          <!-- Revers de couette -->
          <path d="M ${-w/2 + 4} ${duvetY} Q 0 ${duvetY + 8} ${w/2 - 4} ${duvetY}" fill="none" stroke-width="1.8" />
        </g>
      `;
    }
  },
  {
    type: 'bed_single',
    name: 'Lit simple',
    category: 'bed',
    width: 0.90,
    length: 1.90,
    icon: '🛏️',
    renderSvg: (w, h, sel) => {
      const pillowW = w - 16;
      const pillowH = h * 0.22;
      const duvetY = -h/2 + pillowH + 8;
      return svg`
        <g class="furniture-symbol" stroke="${sel ? '#38bdf8' : '#94a3b8'}" stroke-width="1.5" fill="${sel ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.85)'}">
          <rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="6" />
          <line x1="${-w/2}" y1="${-h/2 + 3}" x2="${w/2}" y2="${-h/2 + 3}" stroke-width="2.5" stroke="${sel ? '#38bdf8' : '#cbd5e1'}" />
          <rect x="${-w/2 + 8}" y="${-h/2 + 8}" width="${pillowW}" height="${pillowH}" rx="4" fill="rgba(241, 245, 249, 0.2)" />
          <path d="M ${-w/2 + 4} ${duvetY} Q 0 ${duvetY + 6} ${w/2 - 4} ${duvetY}" fill="none" stroke-width="1.8" />
        </g>
      `;
    }
  },
  {
    type: 'nightstand',
    name: 'Table de chevet',
    category: 'bed',
    width: 0.45,
    length: 0.40,
    icon: '🕰️',
    renderSvg: (w, h, sel) => {
      return svg`
        <g class="furniture-symbol" stroke="${sel ? '#38bdf8' : '#94a3b8'}" stroke-width="1.4" fill="${sel ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.85)'}">
          <rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="4" />
          <line x1="${-w/2 + 4}" y1="${0}" x2="${w/2 - 4}" y2="${0}" stroke-width="1.2" />
          <circle cx="0" cy="${-h/4}" r="2" fill="${sel ? '#38bdf8' : '#94a3b8'}" />
          <circle cx="0" cy="${h/4}" r="2" fill="${sel ? '#38bdf8' : '#94a3b8'}" />
        </g>
      `;
    }
  },
  {
    type: 'wardrobe',
    name: 'Armoire dressing',
    category: 'storage',
    width: 1.80,
    length: 0.60,
    icon: '🚪',
    renderSvg: (w, h, sel) => {
      const doorW = w / 3;
      return svg`
        <g class="furniture-symbol" stroke="${sel ? '#38bdf8' : '#94a3b8'}" stroke-width="1.5" fill="${sel ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.85)'}">
          <rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="3" />
          <line x1="${-w/2 + doorW}" y1="${-h/2}" x2="${-w/2 + doorW}" y2="${h/2}" />
          <line x1="${-w/2 + doorW*2}" y1="${-h/2}" x2="${-w/2 + doorW*2}" y2="${h/2}" />
          <!-- Tringle à vêtements symbolique -->
          <line x1="${-w/2 + 6}" y1="0" x2="${w/2 - 6}" y2="0" stroke-dasharray="4,3" stroke-width="1.2" opacity="0.6" />
        </g>
      `;
    }
  },

  // ==========================================
  // REPAS & BUREAU (TABLE)
  // ==========================================
  {
    type: 'dining_table_6',
    name: 'Table repas (6 chaises)',
    category: 'table',
    width: 1.60,
    length: 0.90,
    icon: '🍽️',
    renderSvg: (w, h, sel) => {
      const chairW = w * 0.24;
      const chairD = 7;
      return svg`
        <g class="furniture-symbol" stroke="${sel ? '#38bdf8' : '#94a3b8'}" stroke-width="1.5" fill="${sel ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.85)'}">
          <!-- Plateau principal -->
          <rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="5" />
          <!-- 3 Chaises du haut -->
          <rect x="${-w/2 + 6}" y="${-h/2 - chairD}" width="${chairW}" height="${chairD}" rx="2" />
          <rect x="${-chairW/2}" y="${-h/2 - chairD}" width="${chairW}" height="${chairD}" rx="2" />
          <rect x="${w/2 - chairW - 6}" y="${-h/2 - chairD}" width="${chairW}" height="${chairD}" rx="2" />
          <!-- 3 Chaises du bas -->
          <rect x="${-w/2 + 6}" y="${h/2}" width="${chairW}" height="${chairD}" rx="2" />
          <rect x="${-chairW/2}" y="${h/2}" width="${chairW}" height="${chairD}" rx="2" />
          <rect x="${w/2 - chairW - 6}" y="${h/2}" width="${chairW}" height="${chairD}" rx="2" />
        </g>
      `;
    }
  },
  {
    type: 'desk',
    name: 'Bureau avec fauteuil',
    category: 'table',
    width: 1.40,
    length: 0.70,
    icon: '💻',
    renderSvg: (w, h, sel) => {
      return svg`
        <g class="furniture-symbol" stroke="${sel ? '#38bdf8' : '#94a3b8'}" stroke-width="1.5" fill="${sel ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.85)'}">
          <!-- Plateau de bureau -->
          <rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="4" />
          <!-- Écran d'ordinateur symbolique -->
          <rect x="-14" y="${-h/2 + 6}" width="28" height="4" rx="1" fill="${sel ? '#38bdf8' : '#cbd5e1'}" />
          <!-- Évidement chaise -->
          <path d="M -16 ${h/2} A 16 16 0 0 1 16 ${h/2}" fill="none" stroke-dasharray="3,3" />
        </g>
      `;
    }
  },

  // ==========================================
  // SANITAIRES (BATHROOM)
  // ==========================================
  {
    type: 'toilet',
    name: 'WC / Toilettes',
    category: 'bathroom',
    width: 0.45,
    length: 0.65,
    icon: '🚽',
    renderSvg: (w, h, sel) => {
      const tankH = h * 0.28;
      return svg`
        <g class="furniture-symbol" stroke="${sel ? '#38bdf8' : '#94a3b8'}" stroke-width="1.5" fill="${sel ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.85)'}">
          <!-- Réservoir d'eau -->
          <rect x="${-w/2}" y="${-h/2}" width="${w}" height="${tankH}" rx="3" fill="rgba(51, 65, 85, 0.9)" />
          <!-- Cuvette de WC -->
          <path d="M ${-w/2 + 2} ${-h/2 + tankH} 
                   L ${w/2 - 2} ${-h/2 + tankH} 
                   L ${w/2 - 2} ${h/2 - w/2} 
                   A ${w/2 - 2} ${w/2 - 2} 0 0 1 ${-w/2 + 2} ${h/2 - w/2} 
                   Z" />
        </g>
      `;
    }
  },
  {
    type: 'shower',
    name: 'Douche italienne',
    category: 'bathroom',
    width: 0.90,
    length: 0.90,
    icon: '🚿',
    renderSvg: (w, h, sel) => {
      return svg`
        <g class="furniture-symbol" stroke="${sel ? '#38bdf8' : '#94a3b8'}" stroke-width="1.5" fill="${sel ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.85)'}">
          <!-- Bac carré -->
          <rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="2" />
          <!-- Diagonales d'écoulement -->
          <line x1="${-w/2}" y1="${-h/2}" x2="0" y2="0" stroke-width="1" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${w/2}" y1="${-h/2}" x2="0" y2="0" stroke-width="1" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${-w/2}" y1="${h/2}" x2="0" y2="0" stroke-width="1" stroke-dasharray="2,2" opacity="0.6" />
          <line x1="${w/2}" y1="${h/2}" x2="0" y2="0" stroke-width="1" stroke-dasharray="2,2" opacity="0.6" />
          <!-- Bonde centrale -->
          <circle cx="0" cy="0" r="4" fill="${sel ? '#38bdf8' : '#0284c7'}" />
        </g>
      `;
    }
  },
  {
    type: 'bathtub',
    name: 'Baignoire droite',
    category: 'bathroom',
    width: 1.70,
    length: 0.75,
    icon: '🛁',
    renderSvg: (w, h, sel) => {
      return svg`
        <g class="furniture-symbol" stroke="${sel ? '#38bdf8' : '#94a3b8'}" stroke-width="1.6" fill="${sel ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.85)'}">
          <!-- Contour extérieur -->
          <rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="5" />
          <!-- Cuve arrondie intérieure -->
          <rect x="${-w/2 + 6}" y="${-h/2 + 6}" width="${w - 12}" height="${h - 12}" rx="${(h-12)/2}" fill="rgba(2, 132, 199, 0.2)" />
          <!-- Bonde -->
          <circle cx="${-w/2 + 18}" cy="0" r="3" fill="${sel ? '#38bdf8' : '#94a3b8'}" />
        </g>
      `;
    }
  },
  {
    type: 'sink_vanity',
    name: 'Meuble vasque',
    category: 'bathroom',
    width: 0.90,
    length: 0.50,
    icon: '🧼',
    renderSvg: (w, h, sel) => {
      const basinW = w * 0.65;
      const basinH = h * 0.65;
      return svg`
        <g class="furniture-symbol" stroke="${sel ? '#38bdf8' : '#94a3b8'}" stroke-width="1.5" fill="${sel ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.85)'}">
          <rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="3" />
          <!-- Vasque ovale -->
          <ellipse cx="0" cy="0" rx="${basinW/2}" ry="${basinH/2}" fill="rgba(2, 132, 199, 0.25)" />
          <!-- Robinet -->
          <circle cx="0" cy="${-basinH/2 + 2}" r="2" fill="${sel ? '#38bdf8' : '#94a3b8'}" />
        </g>
      `;
    }
  },

  // ==========================================
  // CUISINE (KITCHEN)
  // ==========================================
  {
    type: 'kitchen_sink',
    name: 'Évier cuisine double',
    category: 'kitchen',
    width: 1.00,
    length: 0.60,
    icon: '🚰',
    renderSvg: (w, h, sel) => {
      const basinW = (w - 18) / 2;
      const basinH = h - 16;
      return svg`
        <g class="furniture-symbol" stroke="${sel ? '#38bdf8' : '#94a3b8'}" stroke-width="1.5" fill="${sel ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.85)'}">
          <rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="3" />
          <!-- 2 Bacs -->
          <rect x="${-w/2 + 6}" y="${-h/2 + 8}" width="${basinW}" height="${basinH}" rx="4" fill="rgba(2, 132, 199, 0.25)" />
          <rect x="${6}" y="${-h/2 + 8}" width="${basinW}" height="${basinH}" rx="4" fill="rgba(2, 132, 199, 0.25)" />
          <!-- Mitigeur -->
          <circle cx="0" cy="${-h/2 + 5}" r="2.5" fill="${sel ? '#38bdf8' : '#f59e0b'}" />
        </g>
      `;
    }
  },
  {
    type: 'cooktop',
    name: 'Plaque de cuisson',
    category: 'kitchen',
    width: 0.60,
    length: 0.60,
    icon: '🍳',
    renderSvg: (w, h, sel) => {
      const rLarge = Math.min(w, h) * 0.18;
      const rSmall = Math.min(w, h) * 0.13;
      return svg`
        <g class="furniture-symbol" stroke="${sel ? '#38bdf8' : '#94a3b8'}" stroke-width="1.5" fill="${sel ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.85)'}">
          <rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="4" />
          <!-- 4 Feux / Foyers induction -->
          <circle cx="${-w/4}" cy="${-h/4}" r="${rLarge}" fill="rgba(239, 68, 68, 0.2)" />
          <circle cx="${w/4}" cy="${-h/4}" r="${rSmall}" fill="rgba(239, 68, 68, 0.2)" />
          <circle cx="${-w/4}" cy="${h/4}" r="${rSmall}" fill="rgba(239, 68, 68, 0.2)" />
          <circle cx="${w/4}" cy="${h/4}" r="${rLarge}" fill="rgba(239, 68, 68, 0.2)" />
        </g>
      `;
    }
  },
  {
    type: 'fridge',
    name: 'Réfrigérateur',
    category: 'kitchen',
    width: 0.65,
    length: 0.65,
    icon: '🧊',
    renderSvg: (w, h, sel) => {
      return svg`
        <g class="furniture-symbol" stroke="${sel ? '#38bdf8' : '#94a3b8'}" stroke-width="1.5" fill="${sel ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.85)'}">
          <rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="3" />
          <line x1="${-w/2}" y1="${-h/2 + 6}" x2="${w/2}" y2="${-h/2 + 6}" stroke-width="2" />
          <line x1="${-w/2 + 8}" y1="${-h/2 + 3}" x2="${-w/2 + 20}" y2="${-h/2 + 3}" stroke-width="2" stroke="${sel ? '#38bdf8' : '#38bdf8'}" />
          <!-- Symbole Froid Flocon -->
          <text x="0" y="3" text-anchor="middle" font-size="12" fill="${sel ? '#38bdf8' : '#38bdf8'}" stroke="none">❄</text>
        </g>
      `;
    }
  }
];

export function findFurnitureTemplate(type: string): FurnitureCatalogTemplate | undefined {
  return FURNITURE_CATALOG.find(f => f.type === type);
}
