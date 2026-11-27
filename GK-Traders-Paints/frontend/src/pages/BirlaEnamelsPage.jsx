import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { handleImageError } from '../utils/imageFallback';
import {
  Search,
  ArrowLeft,
  CheckCircle,
  MessageCircle,
  SlidersHorizontal,
  X,
  ShieldCheck,
} from 'lucide-react';

const BIRLA_ENAMEL_PRODUCTS = [
  {
    id: 'bo-en-calista-sparkle-gloss',
    name: 'Birla Opus Calista Sparkle Gloss Enamel',
    range: 'Calista (Premium)',
    type: 'Enamels',
    finish: 'High-Gloss Finish',
    description:
      'Calista Sparkle Gloss enhances metal, wall, and wood surfaces with a rich, high-gloss finish balancing elegance and lasting protection.',
    features: [
      'Rich High-Gloss Enamel Finish',
      'For Metal, Wall & Wood Surfaces',
      'Superior Coverage & Durability',
    ],
    packSizes: ['200ml', '500ml', '1L', '4L', '10L', '20L'],
    image: '/paints/birla-enamel-calista-sparkle-gloss.png',
  },
  {
    id: 'bo-en-calista-sparkle-pu',
    name: 'Birla Opus Calista Sparkle PU Enamel',
    range: 'Calista (Premium)',
    type: 'Enamels',
    finish: 'PU-Fortified Gloss',
    description:
      'Calista Sparkle PU Enamel offers anti-rust protection with a tough, non-yellowing polyurethane-modified finish for wood, walls, and metal surfaces.',
    features: [
      'Anti-Rust Polyurethane Protection',
      'Durable Finish for Wood, Wall & Metal',
      'High Gloss & Weather Resistance',
    ],
    packSizes: ['200ml', '500ml', '1L', '4L', '10L', '20L'],
    image: '/paints/birla-enamel-calista-sparkle-pu.png',
  },
  {
    id: 'bo-en-calista-sparkle-satin',
    name: 'Birla Opus Calista Sparkle Satin Enamel',
    range: 'Calista (Premium)',
    type: 'Enamels',
    finish: 'Smooth Satin Finish',
    description:
      'Calista Sparkle Satin delivers a silky satin finish with a touch of sparkle and a washable, durable surface for both wood and metal.',
    features: [
      'Washable Smooth Satin Finish',
      'For Metal, Wall & Wood Applications',
      'Easy Maintenance & Stain Resistance',
    ],
    packSizes: ['500ml', '1L', '4L', '10L', '20L'],
    image: '/paints/birla-enamel-calista-sparkle-satin.png',
  },
  {
    id: 'bo-en-style-cover-max-gloss',
    name: 'Birla Opus Style Cover Max Gloss Enamel',
    range: 'Style (Economy)',
    type: 'Enamels',
    finish: 'Economical High Gloss',
    description:
      'Low-VOC, economical high-gloss enamel delivering high hiding and a smooth, glossy finish on metal, wall, and wood surfaces.',
    features: [
      'High Hiding & Economical Coverage',
      'Low-VOC Glossy Enamel Finish',
      'Suitable for Metal, Wall & Wood',
    ],
    packSizes: ['200ml', '500ml', '1L', '4L', '20L'],
    image: '/paints/birla-enamel-style-cover-max-gloss.png',
  },
  {
    id: 'bo-en-calista-red-oxide-primer',
    name: 'Birla Opus Calista Sparkle Red Oxide Primer',
    range: 'Calista (Premium)',
    type: 'Primers',
    finish: 'Solvent-Thinnable Metal Primer',
    description:
      'Premium solvent-thinnable red oxide primer offering anti-corrosion and anti-rust protection with superior adhesion for ferrous metal surfaces.',
    features: [
      'Anti-Corrosion & Anti-Rust Shield',
      'Superior Adhesion on Metal Surfaces',
      'Premium Solvent-Thinnable Undercoat',
    ],
    packSizes: ['500ml', '1L', '4L', '10L', '20L'],
    image: '/paints/birla-enamel-calista-sparkle-red-oxide-primer.png',
  },
  {
    id: 'bo-en-calista-wood-primer',
    name: 'Birla Opus Calista Sparkle Wood Primer - White',
    range: 'Calista (Premium)',
    type: 'Primers',
    finish: 'Solvent-Thinnable Wood Primer',
    description:
      'Premium solvent-thinnable white wood primer designed to seal timber grains, prevent resin bleed, and improve enamel topcoat holdout.',
    features: [
      'Seals Wood Grains & Prevents Bleed',
      'Strong Bonding for Enamel Topcoats',
      'Smooth Sandable Timber Base',
    ],
    packSizes: ['500ml', '1L', '4L', '10L', '20L'],
    image: '/paints/birla-enamel-calista-sparkle-wood-primer-white.png',
  },
  {
    id: 'bo-en-calista-yellow-metal-primer',
    name: 'Birla Opus Calista Sparkle Yellow Metal Primer',
    range: 'Calista (Premium)',
    type: 'Primers',
    finish: 'Zinc-Phosphate / Yellow Metal',
    description:
      'Solvent-thinnable yellow metal primer providing excellent adhesion and superior anti-rust protection for grilles, gates, and structural steel.',
    features: [
      'Superior Anti-Rust Metal Protection',
      'Strong Adhesion on Mild Steel & Grilles',
      'Premium Solvent-Thinnable Formula',
    ],
    packSizes: ['500ml', '1L', '4L', '20L'],
    image: '/paints/birla-enamel-calista-sparkle-yellow-metal-primer.png',
  },
  {
    id: 'bo-en-style-red-oxide-primer',
    name: 'Birla Opus Style Cover Max Red Oxide Primer',
    range: 'Style (Economy)',
    type: 'Primers',
    finish: 'Solvent-Thinnable Metal Primer',
    description:
      'Economical solvent-thinnable red oxide primer ensuring strong adhesion and reliable rust resistance for everyday metal priming.',
    features: [
      'Reliable Anti-Rust Metal Undercoat',
      'Strong Substrate Adhesion & Coverage',
      'Economical Solvent-Thinnable Primer',
    ],
    packSizes: ['500ml', '1L', '4L', '20L'],
    image: '/paints/birla-enamel-style-cover-max-red-oxide-primer.png',
  },
  {
    id: 'bo-en-calista-cement-st-primer',
    name: 'Birla Opus Calista Pro White Cement ST Primer',
    range: 'Calista (Premium)',
    type: 'Primers',
    finish: 'Solvent-Thinnable Cement Primer',
    description:
      'Premium solvent-thinnable white cement primer offering superior adhesion, alkali resistance, and a flawless base for interior walls.',
    features: [
      'Strong Alkali & Dampness Resistance',
      'Superior Adhesion on Cement Plaster',
      'Premium Solvent-Thinnable Primer',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-enamel-calista-pro-white-cement-st-primer.png',
  },
  {
    id: 'bo-en-style-cement-st-primer',
    name: 'Birla Opus Style Pro Hide Cement ST Primer',
    range: 'Style (Economy)',
    type: 'Primers',
    finish: 'Solvent-Thinnable Cement Primer',
    description:
      'Ensures a smooth, high-hiding base for cement surfaces with excellent adhesion and compatibility with both enamel and cement paints.',
    features: [
      'High Hiding on Cement Surfaces',
      'Compatible with Enamel & Cement Paints',
      'Economical Solvent-Thinnable Base',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-enamel-style-pro-hide-cement-st-primer.png',
  },
];

export default function BirlaEnamelsPage() {
  const navigate = useNavigate();
  const { openWhatsApp } = useShop();

  const [selectedRange, setSelectedRange] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailProduct, setDetailProduct] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const filteredProducts = useMemo(() => {
    return BIRLA_ENAMEL_PRODUCTS.filter((p) => {
      if (selectedRange !== 'All' && p.range !== selectedRange) return false;
      if (selectedType !== 'All' && p.type !== selectedType) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.description.toLowerCase().includes(q) &&
          !p.finish.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [selectedRange, selectedType, searchQuery]);

  const clearFilters = () => {
    setSelectedRange('All');
    setSelectedType('All');
    setSearchQuery('');
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* HERO BANNER */}
      <section
        style={{
          background:
            'linear-gradient(rgba(1, 35, 78, 0.85), rgba(2, 81, 176, 0.78)), url("/brands/birla-white.jpg") center/cover no-repeat',
          color: '#FFFFFF',
          padding: '4rem 0',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.14)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '999px',
              padding: '6px 14px',
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '1.25rem',
            }}
          >
            <ArrowLeft size={15} /> Back to Brands
          </button>

          <div>
            <span
              style={{
                display: 'inline-block',
                backgroundColor: '#D1FF42',
                color: '#0251B0',
                fontSize: '0.78rem',
                fontWeight: '800',
                padding: '4px 12px',
                borderRadius: '999px',
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                marginBottom: '0.85rem',
              }}
            >
              Birla Opus • Calista Sparkle • Style Cover Max
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '0.75rem' }}>
            Birla Opus Enamels &amp; Primers
          </h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            High-performance enamels and solvent-thinnable primers for metal, wood, and masonry — from Calista Sparkle Gloss, PU &amp; Satin to Style Cover Max and Red Oxide Primers.
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="container" style={{ marginTop: '-1.5rem' }}>
        <div
          className="card"
          style={{
            padding: '1.35rem 1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.95rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', color: '#0251B0' }}>
              <SlidersHorizontal size={18} />
              <span>Filter Enamels &amp; Primers</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                ({filteredProducts.length} products)
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '270px', flex: '1 1 220px' }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Sparkle, PU, Red Oxide..."
                  className="form-control"
                  style={{ height: '40px', paddingRight: '2.4rem', borderRadius: '999px', fontSize: '0.88rem' }}
                />
                <Search
                  size={16}
                  color="#4A5E73"
                  style={{ position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>

              {(selectedRange !== 'All' || selectedType !== 'All' || searchQuery) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="btn btn-outline"
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginRight: '4px' }}>
              RANGE:
            </span>
            {['All', 'Calista (Premium)', 'Style (Economy)'].map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setSelectedRange(range)}
                style={{
                  padding: '5px 14px',
                  borderRadius: '999px',
                  border: selectedRange === range ? '1.5px solid #0251B0' : '1px solid var(--border-color)',
                  backgroundColor: selectedRange === range ? '#0251B0' : '#FFFFFF',
                  color: selectedRange === range ? '#FFFFFF' : '#0B1B36',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                {range === 'All' ? 'All Ranges' : range}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginRight: '4px' }}>
              TYPE:
            </span>
            {['All', 'Enamels', 'Primers'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                style={{
                  padding: '5px 14px',
                  borderRadius: '999px',
                  border: selectedType === type ? '1.5px solid #0251B0' : '1px solid var(--border-color)',
                  backgroundColor: selectedType === type ? '#D1FF42' : '#FFFFFF',
                  color: selectedType === type ? '#0251B0' : '#0B1B36',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                {type === 'All' ? 'All Types' : type}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT CARDS GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: '1.5rem',
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
              }}
            >
              <div>
                <div
                  style={{
                    position: 'relative',
                    height: '235px',
                    backgroundColor: '#F8FAFC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.25rem',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    onError={(e) => handleImageError(e, 'Metal Paints')}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: '#0251B0',
                      color: '#D1FF42',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      padding: '4px 10px',
                      borderRadius: '999px',
                    }}
                  >
                    {product.range}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.94)',
                      color: '#0B1B36',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    {product.finish}
                  </span>
                </div>

                <div style={{ padding: '1.25rem 1.25rem 0' }}>
                  <h3 style={{ fontSize: '1.14rem', color: '#0251B0', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                    {product.name}
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '0.95rem' }}>
                    {product.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '1.1rem' }}>
                    {product.features.map((feat, fIdx) => (
                      <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.81rem', color: '#0B1B36', fontWeight: '500' }}>
                        <CheckCircle size={14} color="#0251B0" style={{ flexShrink: 0 }} /> {feat}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setDetailProduct(product)}
                  className="btn btn-outline"
                  style={{ flex: 1, padding: '0.6rem' }}
                >
                  More Info
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openWhatsApp(`Hello G.K Traders Paints, I want to enquire about ${product.name}.`)
                  }
                  className="btn btn-primary"
                  style={{ padding: '0.6rem 0.95rem' }}
                  title="Enquire on WhatsApp"
                >
                  <MessageCircle size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MORE INFO MODAL */}
      {detailProduct && (
        <div
          onClick={() => setDetailProduct(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            backgroundColor: 'rgba(1, 35, 78, 0.72)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '18px',
              maxWidth: '540px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            }}
          >
            <div
              style={{
                position: 'relative',
                height: '220px',
                backgroundColor: '#F8FAFC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.25rem',
              }}
            >
              <img
                src={detailProduct.image}
                alt={detailProduct.name}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
              <button
                type="button"
                onClick={() => setDetailProduct(null)}
                aria-label="Close"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: 'rgba(1, 35, 78, 0.85)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    backgroundColor: '#D1FF42',
                    color: '#0251B0',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    padding: '3px 10px',
                    borderRadius: '999px',
                  }}
                >
                  {detailProduct.range} • {detailProduct.finish}
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#059669' }}>
                  <ShieldCheck size={14} style={{ verticalAlign: 'middle' }} /> Genuine Stock
                </span>
              </div>

              <h2 style={{ fontSize: '1.35rem', color: '#0251B0', marginBottom: '0.5rem' }}>
                {detailProduct.name}
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>
                {detailProduct.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '1rem' }}>
                {detailProduct.features.map((f, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', color: '#0B1B36' }}>
                    <CheckCircle size={15} color="#0251B0" /> {f}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginRight: '4px' }}>
                  Pack Sizes:
                </span>
                {detailProduct.packSizes.map((sz) => (
                  <span
                    key={sz}
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      backgroundColor: '#E6EDEF',
                      color: '#0251B0',
                      padding: '2px 9px',
                      borderRadius: '6px',
                    }}
                  >
                    {sz}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  openWhatsApp(`Hello G.K Traders Paints, I want to order ${detailProduct.name}.`)
                }
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                <MessageCircle size={18} /> Enquire / Order on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
