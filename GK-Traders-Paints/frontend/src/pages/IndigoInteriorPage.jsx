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

const INDIGO_INTERIOR_EMULSIONS = [
  {
    id: 'in-platinum-luxury',
    name: 'Indigo Luxury Interior Emulsion',
    series: 'Platinum',
    finish: 'Soft Glow Finish',
    description:
      'Flagship Platinum Series interior emulsion offering a soft glow finish, superior washability, high stain resistance, and long-lasting colour retention.',
    features: ['Soft Glow Designer Finish', 'Superior Washability', 'High Stain Resistance'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-platinum.jpg',
  },
  {
    id: 'in-platinum-metallic',
    name: 'Indigo Metallic Emulsion',
    series: 'Platinum',
    finish: 'Semi-Gloss Metallic',
    description:
      'Water-based pure acrylic Platinum Series metallic emulsion engineered to give accent walls a sparkling metallic texture, high glitter, and unfading sheen.',
    features: ['Luxurious Metallic Lustre', 'Fade & Fungus Resistant', 'Interior & Accent Wall Ready'],
    packSizes: ['100ml', '500ml', '1L', '4L'],
    image: '/paints/indigo-platinum.jpg',
  },
  {
    id: 'in-gold-sheen',
    name: 'Indigo Interior Sheen Emulsion',
    series: 'Gold',
    finish: 'Elegant Sheen',
    description:
      'Gold Series interior sheen emulsion providing an elegant silky glow along with enhanced stain and fungal resistance for living rooms and bedrooms.',
    features: ['Elegant Sheen Finish', 'Enhanced Stain Resistance', 'Anti-Fungal Protection'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-gold.jpg',
  },
  {
    id: 'in-gold-stainfree',
    name: 'Indigo Stainfree Interior Emulsion',
    series: 'Gold',
    finish: 'Smooth Sheen',
    description:
      'Specially formulated Gold Series emulsion that resists tough household stains like food, ink, and crayon marks, making walls effortless to wipe clean.',
    features: ['Resists Tough Household Stains', 'Easy Wipe Cleanability', 'Long-Lasting Vibrancy'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-gold.jpg',
  },
  {
    id: 'in-silver-premium',
    name: 'Indigo Premium Interior Emulsion',
    series: 'Silver',
    finish: 'Smooth Matt',
    description:
      'Popular Silver Series interior emulsion delivering high opacity, smooth texture, good washability, and reliable everyday durability.',
    features: ['High Opacity & Coverage', 'Smooth Matt Texture', 'Good Washability'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-silver.jpg',
  },
  {
    id: 'in-silver-neem-protect',
    name: 'Indigo Neem Protect Interior Paint',
    series: 'Silver',
    finish: 'Smooth Matt',
    description:
      'Hygienic Silver Series interior wall paint incorporating specialized Neem-inspired protective properties for cleaner, fresher indoor living spaces.',
    features: ['Added Hygiene Protection', 'Low Odour Formula', 'Smooth Even Finish'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-silver.jpg',
  },
  {
    id: 'in-bronze-emulsion',
    name: 'Indigo Bronze Interior Emulsion',
    series: 'Bronze',
    finish: 'Matt Finish',
    description:
      'Cost-effective Bronze Series acrylic interior emulsion designed for reliable coverage, bright shades, and economical wall painting.',
    features: ['Economical Coverage', 'Bright Clean Finish', 'Easy Brush & Roller Application'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-bronze.jpg',
  },
  {
    id: 'in-bronze-distemper',
    name: 'Indigo Acrylic Pouch Distemper',
    series: 'Bronze',
    finish: 'Matte Distemper',
    description:
      'Value-driven water-based acrylic distemper formulated for budget-friendly interior walls with smooth finish and bright shades.',
    features: ['Budget-Friendly Maintenance', 'Smooth Matte Appearance', 'Available in Convenient Packs'],
    packSizes: ['1Kg', '5Kg', '10Kg', '20Kg'],
    image: '/paints/indigo-bronze.jpg',
  },
];

export default function IndigoInteriorPage() {
  const navigate = useNavigate();
  const { openWhatsApp } = useShop();

  const [selectedSeries, setSelectedSeries] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailProduct, setDetailProduct] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const filteredProducts = useMemo(() => {
    return INDIGO_INTERIOR_EMULSIONS.filter((p) => {
      if (selectedSeries !== 'All' && p.series !== selectedSeries) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) {
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
              background: 'rgba(255, 255, 255, 0.14)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#FFFFFF',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '1rem',
            }}
          >
            <ArrowLeft size={14} /> Back to Home
          </button>

          <div style={{ marginBottom: '0.75rem' }}>
            <span
              style={{
                backgroundColor: '#D1FF42',
                color: '#0251B0',
                fontSize: '0.75rem',
                fontWeight: '800',
                padding: '4px 12px',
                borderRadius: '999px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Indigo Paints • Be Surprised
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF', marginBottom: '0.6rem' }}>
            Indigo Interior Emulsions
          </h1>
          <p style={{ fontSize: '1.02rem', color: '#E6EDEF', maxWidth: '640px', margin: '0 auto' }}>
            Explore Indigo’s Platinum, Gold, Silver, and Bronze Series interior emulsions engineered for rich aesthetics, washability, and vibrant shade retention.
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="container" style={{ marginTop: '2.25rem' }}>
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
              <span>Filter by Indigo Series</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                ({filteredProducts.length} products)
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '260px', flex: '1 1 220px' }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Platinum, Stainfree, Neem..."
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
            {['All', 'Platinum', 'Gold', 'Silver', 'Bronze'].map((series) => (
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
                {series === 'All' ? 'All Series' : `${series} Series`}
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
                    height: '220px',
                    backgroundColor: '#F8FAFC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => handleImageError(e, 'Interior Paints')}
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
                    {product.series} Series
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
                    openWhatsApp(`Hello G.K Traders Paints, I want to enquire about ${product.name} (${product.series} Series).`)
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
            <div style={{ position: 'relative', height: '210px', backgroundColor: '#F8FAFC' }}>
              <img
                src={detailProduct.image}
                alt={detailProduct.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
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
                  Indigo • {detailProduct.series} Series • {detailProduct.finish}
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
