/**
 * Robust Category-Specific SVG Fallback Placeholders
 * Guaranteed to display instantly even offline without external network dependency
 */

const createFallbackSvg = (title, color = '#C2410C', subtitle = 'G.K TRADERS PAINTS') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0F172A" />
        <stop offset="100%" stop-color="#1E293B" />
      </linearGradient>
      <linearGradient id="paintGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color}" />
        <stop offset="100%" stop-color="#F97316" />
      </linearGradient>
    </defs>
    <rect width="600" height="400" fill="url(#bg)" />
    <!-- Decorative Paint Droplets / Splashes -->
    <circle cx="120" cy="100" r="40" fill="${color}" opacity="0.15" />
    <circle cx="480" cy="300" r="70" fill="${color}" opacity="0.1" />
    <circle cx="500" cy="90" r="25" fill="#F97316" opacity="0.2" />
    
    <!-- Paint Bucket / Canister Icon -->
    <g transform="translate(250, 100)">
      <rect x="15" y="10" width="70" height="90" rx="8" fill="url(#paintGlow)" />
      <rect x="10" y="5" width="80" height="12" rx="4" fill="#FFFFFF" opacity="0.9" />
      <ellipse cx="50" cy="100" rx="35" ry="10" fill="#000000" opacity="0.3" />
      <path d="M 25 15 C 25 -10, 75 -10, 75 15" stroke="#FFFFFF" stroke-width="3" fill="none" opacity="0.8" />
      <circle cx="50" cy="55" r="14" fill="#FFFFFF" opacity="0.95" />
      <path d="M 46 55 L 54 55 M 50 51 L 50 59" stroke="${color}" stroke-width="2.5" stroke-linecap="round" />
    </g>

    <!-- Text -->
    <text x="300" y="240" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">
      ${title}
    </text>
    <text x="300" y="270" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#94A3B8" text-anchor="middle" letter-spacing="2">
      ${subtitle}
    </text>
    <rect x="240" y="290" width="120" height="2" rx="1" fill="${color}" opacity="0.6" />
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const getCategoryFallback = (category) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('interior')) {
    return createFallbackSvg('Interior Luxury Emulsion', '#C2410C', 'G.K TRADERS PAINTS');
  }
  if (cat.includes('exterior')) {
    return createFallbackSvg('Exterior Weatherproof Coating', '#2563EB', 'G.K TRADERS PAINTS');
  }
  if (cat.includes('waterproof')) {
    return createFallbackSvg('Waterproofing & Damp Shield', '#0D9488', 'DR. FIXIT / ASIAN PAINTS');
  }
  if (cat.includes('wood')) {
    return createFallbackSvg('PU & Wood Coatings', '#D97706', 'PREMIUM TIMBER FINISH');
  }
  if (cat.includes('metal')) {
    return createFallbackSvg('High Gloss Metal Enamel', '#4F46E5', 'ANTI-CORROSIVE PROTECTION');
  }
  if (cat.includes('putty')) {
    return createFallbackSvg('WallCare Acrylic Putty', '#E2E8F0', 'SILKY LEVELING COMPOUND');
  }
  if (cat.includes('primer')) {
    return createFallbackSvg('Deep Penetrating Primer', '#EA580C', 'BASE ADHESION COAT');
  }
  if (cat.includes('brush') || cat.includes('tool')) {
    return createFallbackSvg('Brushes & Application Tools', '#F59E0B', 'PROFESSIONAL ACCESSORIES');
  }
  return createFallbackSvg('Genuine Brand Paints', '#C2410C', 'YOUR TRUST. OUR PRIDE.');
};

export const handleImageError = (e, fallbackCategory) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = getCategoryFallback(fallbackCategory);
};
