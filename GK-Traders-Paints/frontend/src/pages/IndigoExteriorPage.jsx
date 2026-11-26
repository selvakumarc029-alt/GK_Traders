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

const INDIGO_EXTERIOR_EMULSIONS = [
  {
    id: 'in-ext-dw-laminate',
    name: 'Indigo D & W Exterior Laminate',
    series: 'Platinum',
    finish: 'Waterproof & Dirtproof Laminate',
    warranty: '12 Year Warranty',
    description:
      'Flagship Platinum Series exterior laminate engineered for extreme weather protection with dirtproof, waterproof, high UV resistance, and anti-algae properties.',
    features: [
      'Dirtproof & Waterproof Water-Beading Film',
      'High UV Resistance & Anti-Algae Protection',
      '12 Year Performance Warranty',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-ext-dw-laminate.webp',
  },
  {
    id: 'in-ext-floor-coat',
    name: 'Indigo Floor Coat Emulsion',
    series: 'Platinum',
    finish: 'High-Abrasion Matte Finish',
    warranty: 'Heavy-Duty Exterior',
    description:
      'Specialized Platinum Series exterior floor coating offering superior abrasion resistance, strong adhesion strength, washable properties, and resistance against fungal and algal growth.',
    features: [
      'High Abrasion & Foot-Traffic Resistance',
      'Superior Adhesion & Washable Surface',
      'Anti-Fungal & Anti-Algal Protection',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-ext-floor-coat.webp',
  },
  {
    id: 'in-ext-tile-coat',
    name: 'Indigo Tile Coat',
    series: 'Platinum',
    finish: 'Durable Glossy Finish',
    warranty: 'All-Weather Gloss',
    description:
      'High-performance Platinum Series roof and exterior tile coating delivering a durable glossy finish, water resistance, and non-fading colours for extreme outdoor conditions.',
    features: [
      'Durable High-Gloss Protective Finish',
      'Strong Water & Weather Resistance',
      'Non-Fading UV-Stable Colours',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-ext-tile-coat.webp',
  },
  {
    id: 'in-ext-premium-xt-sheen',
    name: 'Indigo Premium XT Sheen Emulsion',
    series: 'Platinum',
    finish: 'Rich Sheen Finish',
    warranty: '6 Year Warranty',
    description:
      'Premium quality Platinum Series exterior sheen emulsion with superior adhesion, long-lasting durability, and strong resistance to fungal and algal attacks.',
    features: [
      'Rich Exterior Sheen & Superior Adhesion',
      'Resistant to Fungal & Algal Attacks',
      '6 Year Performance Warranty',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-ext-premium-xt-sheen.webp',
  },
  {
    id: 'in-ext-premium-xt',
    name: 'Indigo Premium XT Exterior Emulsion',
    series: 'Platinum',
    finish: 'Rich Matte Finish',
    warranty: '6 Year Warranty',
    description:
      'High-durability Platinum Series exterior emulsion delivering strong protection against algae and fungus, a rich matte finish, exceptional adhesion, and long-term weather durability.',
    features: [
      'Rich Matte Finish & Exceptional Adhesion',
      'Protection Against Algae & Fungus',
      '6 Year Performance Warranty',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-ext-premium-xt.webp',
  },
  {
    id: 'in-ext-sheen',
    name: 'Indigo Exterior Sheen Emulsion',
    series: 'Gold',
    finish: 'Smooth Sheen Finish',
    warranty: '4 Year Warranty',
    description:
      'Gold Series exterior sheen emulsion formulated for low moisture absorption, resistance to UV, chalking, cracking, and weathering, along with high film breathability.',
    features: [
      'Low Moisture Absorption & High Breathability',
      'Resists UV, Chalking, Cracking & Weathering',
      '4 Year Performance Warranty',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-ext-sheen.webp',
  },
  {
    id: 'in-ext-gold',
    name: 'Indigo Exterior Emulsion',
    series: 'Gold',
    finish: 'Smooth Matte Finish',
    warranty: '4 Year Warranty',
    description:
      'Gold Series water-based exterior emulsion offering easy application, rapid drying, protection tailored for shaded exteriors, and moderate resistance against fungal and algal attacks.',
    features: [
      'Easy Application & Rapid Drying',
      'Tailored Protection for Shaded Exteriors',
      '4 Year Performance Warranty',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-ext-gold.webp',
  },
  {
    id: 'in-ext-royal-indigocem',
    name: 'Indigo Royal Indigocem',
    series: 'Gold',
    finish: 'Luxurious Matte Cement Paint',
    warranty: 'Premium Cement Paint',
    description:
      'Premium-grade Gold Series cement paint offering a luxurious matte finish and availability in a wide variety of ready-made exterior shades.',
    features: [
      'Premium-Grade Exterior Cement Paint',
      'Luxurious Matte Finish',
      'Available in Ready-Made Shades',
    ],
    packSizes: ['1Kg', '5Kg', '25Kg'],
    image: '/paints/indigo-ext-royal-indigocem.webp',
  },
  {
    id: 'in-ext-floracem',
    name: 'Indigo Floracem',
    series: 'Cement Paint',
    finish: 'Polished Matte Cement Paint',
    warranty: 'Value Cement Paint',
    description:
      'Durable exterior cement paint offering strong value for money, superior hiding power, and a clean matte finish for a polished outdoor look.',
    features: [
      'Superior Hiding Power & Coverage',
      'Durable Matte Finish for Exteriors',
      'High Value-for-Money Formula',
    ],
    packSizes: ['1Kg', '5Kg', '25Kg'],
    image: '/paints/indigo-ext-floracem.webp',
  },
  {
    id: 'in-ext-alfacem',
    name: 'Indigo Alfacem',
    series: 'Cement Paint',
    finish: 'Protective Matte Cement Paint',
    warranty: 'Economy Cement Paint',
    description:
      'Economical exterior cement paint formulated to provide strong resistance against algal and fungal growth on boundary and exterior masonry walls.',
    features: [
      'Strong Resistance to Algal & Fungal Growth',
      'Economical Exterior Masonry Protection',
      'Easy Mixing & Application',
    ],
    packSizes: ['1Kg', '5Kg', '25Kg'],
    image: '/paints/indigo-ext-alfacem.webp',
  },
];

export default function IndigoExteriorPage() {
  const navigate = useNavigate();
  const { openWhatsApp } = useShop();

  const [selectedSeries, setSelectedSeries] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailProduct, setDetailProduct] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const filteredProducts = useMemo(() => {
    return INDIGO_EXTERIOR_EMULSIONS.filter((p) => {
      if (selectedSeries !== 'All' && p.series !== selectedSeries) return false;
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
  }, [selectedSeries, searchQuery]);

  const clearFilters = () => {
    setSelectedSeries('All');
    setSearchQuery('');
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* HERO BANNER */}
      <section
        style={{
          background:
            'linear-gradient(rgba(1, 35, 78, 0.85), rgba(2, 81, 176, 0.78)), url("/brands/indigo.jpg") center/cover no-repeat',
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
              Indigo Paints • Be Surprised
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '0.75rem' }}>
            Indigo Exterior Emulsions
          </h1>
          <p style={{ maxWidth: '660px', margin: '0 auto', color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Discover top-tier exterior paints with exceptional durability and quality — from 12-year Dirtproof & Waterproof Laminate to Premium XT, Gold Series, and Cement Paints.
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
            gap: '1rem',
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
              <span>Filter by Indigo Exterior Range</span>
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
                  placeholder="Search Laminate, XT, Tile, Cement..."
                  className="form-control"
                  style={{ height: '40px', paddingRight: '2.4rem', borderRadius: '999px', fontSize: '0.88rem' }}
                />
                <Search
                  size={16}
                  color="#4A5E73"
                  style={{ position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>

              {(selectedSeries !== 'All' || searchQuery) && (
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
              SERIES:
            </span>
            {['All', 'Platinum', 'Gold', 'Cement Paint'].map((series) => (
              <button
                key={series}
                type="button"
                onClick={() => setSelectedSeries(series)}
                style={{
                  padding: '5px 14px',
                  borderRadius: '999px',
                  border: selectedSeries === series ? '1.5px solid #0251B0' : '1px solid var(--border-color)',
                  backgroundColor: selectedSeries === series ? '#0251B0' : '#FFFFFF',
                  color: selectedSeries === series ? '#FFFFFF' : '#0B1B36',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                {series === 'All' ? 'All Products' : series === 'Cement Paint' ? 'Cement Paints' : `${series} Series`}
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
                    height: '230px',
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
                    onError={(e) => handleImageError(e, 'Exterior Paints')}
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
                    {product.series === 'Cement Paint' ? 'Cement Paint' : `${product.series} Series`}
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
                    {product.warranty}
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
                    openWhatsApp(`Hello G.K Traders Paints, I want to enquire about ${product.name} (${product.series}).`)
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
                  Indigo • {detailProduct.series} • {detailProduct.finish}
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
