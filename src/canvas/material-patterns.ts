import { svg, SVGTemplateResult } from 'lit';

/**
 * Génère les motifs graphiques vectoriels SVG (<pattern>) pour les revêtements de sol
 * et les parements de murs dans le canevas 2D.
 * Les motifs s'adaptent aux pixels du plan et se superposent proprement à la couleur choisie.
 */
export function renderSvgMaterialPatterns2D(ppm: number): SVGTemplateResult {
  const s = Math.max(16, Math.round(ppm * 0.6)); // ~60 cm en pixels
  const half = s / 2;
  const quarter = s / 4;

  return svg`
    <!-- Parquet Chêne -->
    <pattern id="arch-tex-floor-parquet_oak" width=${s} height=${s} patternUnits="userSpaceOnUse">
      <rect width=${s} height=${s} fill="#b68656" fill-opacity="0.32" />
      <line x1="0" y1=${quarter} x2=${s} y2=${quarter} stroke="#5c3a1e" stroke-opacity="0.35" stroke-width="1" />
      <line x1="0" y1=${half} x2=${s} y2=${half} stroke="#5c3a1e" stroke-opacity="0.35" stroke-width="1" />
      <line x1="0" y1=${quarter * 3} x2=${s} y2=${quarter * 3} stroke="#5c3a1e" stroke-opacity="0.35" stroke-width="1" />
      <line x1=${half} y1="0" x2=${half} y2=${quarter} stroke="#5c3a1e" stroke-opacity="0.3" stroke-width="1" />
      <line x1=${quarter} y1=${quarter} x2=${quarter} y2=${half} stroke="#5c3a1e" stroke-opacity="0.3" stroke-width="1" />
      <line x1=${quarter * 3} y1=${half} x2=${quarter * 3} y2=${quarter * 3} stroke="#5c3a1e" stroke-opacity="0.3" stroke-width="1" />
    </pattern>

    <!-- Point de Hongrie -->
    <pattern id="arch-tex-floor-parquet_herringbone" width=${s} height=${s} patternUnits="userSpaceOnUse">
      <rect width=${s} height=${s} fill="#a47449" fill-opacity="0.32" />
      <path d=${`M 0 ${half} L ${half} 0 L ${s} ${half} M 0 ${s} L ${half} ${half} L ${s} ${s}`} fill="none" stroke="#5c3a1e" stroke-opacity="0.38" stroke-width="1.2" />
    </pattern>

    <!-- Carrelage Clair -->
    <pattern id="arch-tex-floor-tiles_light" width=${half} height=${half} patternUnits="userSpaceOnUse">
      <rect width=${half} height=${half} fill="#e2e8f0" fill-opacity="0.26" />
      <path d=${`M ${half} 0 L 0 0 0 ${half}`} fill="none" stroke="#94a3b8" stroke-opacity="0.45" stroke-width="1" />
    </pattern>

    <!-- Carrelage Ardoise -->
    <pattern id="arch-tex-floor-tiles_slate" width=${half} height=${half} patternUnits="userSpaceOnUse">
      <rect width=${half} height=${half} fill="#1e293b" fill-opacity="0.42" />
      <path d=${`M ${half} 0 L 0 0 0 ${half}`} fill="none" stroke="#64748b" stroke-opacity="0.45" stroke-width="1" />
    </pattern>

    <!-- Terre Cuite / Tomettes -->
    <pattern id="arch-tex-floor-terracotta" width=${half} height=${half} patternUnits="userSpaceOnUse">
      <rect width=${half} height=${half} fill="#c2593f" fill-opacity="0.34" />
      <path d=${`M ${half} 0 L 0 0 0 ${half}`} fill="none" stroke="#7c2d12" stroke-opacity="0.4" stroke-width="1.2" />
    </pattern>

    <!-- Marbre -->
    <pattern id="arch-tex-floor-marble" width=${s} height=${s} patternUnits="userSpaceOnUse">
      <rect width=${s} height=${s} fill="#f1f5f9" fill-opacity="0.28" />
      <path d=${`M 0 ${quarter} Q ${half} ${half} ${s} ${quarter} M ${quarter} ${s} Q ${half} ${quarter * 2.5} ${s} ${quarter * 3}`} fill="none" stroke="#94a3b8" stroke-opacity="0.38" stroke-width="1.2" />
    </pattern>

    <!-- Béton Ciré -->
    <pattern id="arch-tex-floor-concrete" width=${s} height=${s} patternUnits="userSpaceOnUse">
      <rect width=${s} height=${s} fill="#64748b" fill-opacity="0.28" />
      <circle cx=${quarter} cy=${quarter} r="1.2" fill="#334155" fill-opacity="0.3" />
      <circle cx=${quarter * 3} cy=${half} r="1" fill="#cbd5e1" fill-opacity="0.25" />
    </pattern>

    <!-- Moquette -->
    <pattern id="arch-tex-floor-carpet" width="12" height="12" patternUnits="userSpaceOnUse">
      <rect width="12" height="12" fill="#64748b" fill-opacity="0.26" />
      <circle cx="3" cy="3" r="1" fill="#ffffff" fill-opacity="0.2" />
      <circle cx="9" cy="9" r="1" fill="#0f172a" fill-opacity="0.2" />
    </pattern>

    <!-- Pelouse / Jardin -->
    <pattern id="arch-tex-floor-grass" width="18" height="18" patternUnits="userSpaceOnUse">
      <rect width="18" height="18" fill="#22c55e" fill-opacity="0.28" />
      <path d="M 4 14 L 3 9 M 6 14 L 8 9 M 13 7 L 12 2 M 15 7 L 17 3" stroke="#15803d" stroke-opacity="0.5" stroke-width="1.2" stroke-linecap="round" />
    </pattern>

    <!-- Terrasse Bois -->
    <pattern id="arch-tex-floor-decking" width=${s} height="12" patternUnits="userSpaceOnUse">
      <rect width=${s} height="10" fill="#8c5832" fill-opacity="0.36" />
      <line x1="0" y1="11" x2=${s} y2="11" stroke="#3e2211" stroke-opacity="0.55" stroke-width="2" />
    </pattern>

    <!-- Parements Murs 2D -->
    <pattern id="arch-tex-wall-brick" width="16" height="8" patternUnits="userSpaceOnUse">
      <rect width="16" height="8" fill="#b4533c" fill-opacity="0.65" />
      <path d="M 0 4 L 16 4 M 8 0 L 8 4 M 0 4 L 0 8" stroke="#cbd5e1" stroke-opacity="0.6" stroke-width="1" />
    </pattern>
    <pattern id="arch-tex-wall-stone" width="18" height="10" patternUnits="userSpaceOnUse">
      <rect width="18" height="10" fill="#a8a29e" fill-opacity="0.6" />
      <path d="M 0 5 L 18 5 M 6 0 L 6 5 M 13 5 L 13 10" stroke="#57534e" stroke-opacity="0.65" stroke-width="1.2" />
    </pattern>
    <pattern id="arch-tex-wall-wood_cladding" width="10" height="10" patternUnits="userSpaceOnUse">
      <rect width="10" height="10" fill="#9c6b3f" fill-opacity="0.65" />
      <line x1="0" y1="0" x2="0" y2="10" stroke="#451a03" stroke-opacity="0.55" stroke-width="1.5" />
    </pattern>
    <pattern id="arch-tex-wall-concrete" width="14" height="14" patternUnits="userSpaceOnUse">
      <rect width="14" height="14" fill="#64748b" fill-opacity="0.55" />
      <circle cx="4" cy="4" r="1" fill="#1e293b" fill-opacity="0.45" />
    </pattern>
    <pattern id="arch-tex-wall-plaster" width="12" height="12" patternUnits="userSpaceOnUse">
      <rect width="12" height="12" fill="#f5ebe0" fill-opacity="0.55" />
      <circle cx="6" cy="6" r="1" fill="#a8a29e" fill-opacity="0.45" />
    </pattern>
  `;
}
