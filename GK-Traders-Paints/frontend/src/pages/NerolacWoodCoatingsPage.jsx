import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ArrowLeft, CheckCircle, MessageCircle, X } from 'lucide-react';

const NEROLAC_WOOD_COATINGS = [
  {
    id: 'nr-wonderwood',
    name: 'Wonderwood Coatings',
    subtitle: 'Melamine, 1K & 2K PU Wood Finishes',
    description:
      'Nerolac Wonderwood Coatings protect and beautify interior and exterior wooden furniture, doors, and paneling with durable gloss and matt finishes.',
    features: ['Superior Scratch & Stain Resistance', 'Highlights Natural Wood Grain', 'Available in Glossy & Matt Finishes'],
    packSizes: ['500ml', '1L', '4L', '20L'],
    image: '/paints/wood-metal.jpg',
  },
  {
    id: 'nr-italian-wood',
    name: 'Italian Wood Coatings',
    subtitle: 'Luxury Italian 2K PU & Polyester Systems',
    description:
      'Premium Italian Wood Coatings formulated for ultra-rich clarity, silky feel, non-yellowing UV protection, and mirror-like designer furniture finishes.',
    features: ['Crystal-Clear Timber Depth', 'Non-Yellowing UV Shield', 'High Chemical & Heat Resistance'],
    packSizes: ['1L', '4L', '20L'],
    image: '/brands/berger.jpg',
  },
  {
    id: 'nr-wood-ancillary',
    name: 'Wood Ancillary',
    subtitle: 'Wood Stains, Sealers, Fillers & Epoxy',
    description:
      'Complete range of Nerolac wood preparation and ancillary products including sanding sealers, wood stains, pore fillers, and epoxy resin finishes.',
    features: ['Smooth Pore Filling & Sealing', 'Uniform Rich Wood Staining', 'Enhances Topcoat Adhesion & Life'],
    packSizes: ['500ml', '1L', '4L'],
    image: '/hero-interior-paint.jpg',
  },
];

export default function NerolacWoodCoatingsPage() {
  const navigate = useNavigate();
  const { openWhatsApp } = useShop();
  const [detailProduct, setDetailProduct] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* HERO BANNER */}
      <section
        style={{
          background:
            'linear-gradient(rgba(1, 35, 78, 0.85), rgba(2, 81, 176, 0.78)), url("/paints/wood-metal.jpg") center/cover no-repeat',
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
              Nerolac • Wood Coatings
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF', marginBottom: '0.6rem' }}>
            Nerolac Wood Coatings
          </h1>
          <p style={{ fontSize: '1.02rem', color: '#E6EDEF', maxWidth: '640px', margin: '0 auto' }}>
            Explore Wonderwood Coatings, Italian Wood Coatings, and Wood Ancillary solutions for timeless timber beauty.
          </p>
        </div>
      </section>

      {/* 3-CARD VISUAL SHOWCASE */}
      <div className="container" style={{ marginTop: '3rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.5rem',
          }}
        >
          {NEROLAC_WOOD_COATINGS.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                item.id === 'nr-wonderwood'
                  ? navigate('/nerolac/wood-coatings/wonderwood')
                  : item.id === 'nr-italian-wood'
                  ? navigate('/nerolac/wood-coatings/italian')
                  : item.id === 'nr-wood-ancillary'
                  ? navigate('/nerolac/wood-coatings/ancillary')
                  : setDetailProduct(item)
              }
              style={{
                position: 'relative',
                height: '420px',
                borderRadius: '18px',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: '#0B1B36',
                boxShadow: '0 12px 30px -8px rgba(1, 35, 78, 0.25)',
                transition: 'transform 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.45s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(1, 35, 78, 0.9) 0%, rgba(1, 35, 78, 0.35) 55%, rgba(1, 35, 78, 0.1) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '2rem 1.5rem',
                }}
              >
                <span
                  style={{
                    backgroundColor: '#D1FF42',
                    color: '#0251B0',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    marginBottom: '0.75rem',
                  }}
                >
                  {item.subtitle}
                </span>
                <h2 style={{ fontSize: '1.65rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                  {item.name}
                </h2>
                <button
                  type="button"
                  className="btn btn-white"
                  style={{ padding: '0.55rem 1.35rem', fontSize: '0.88rem' }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DETAILS MODAL */}
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
            <div style={{ position: 'relative', height: '200px', backgroundColor: '#E6EDEF' }}>
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
              <span
                style={{
                  backgroundColor: '#D1FF42',
                  color: '#0251B0',
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  display: 'inline-block',
                  marginBottom: '0.6rem',
                }}
              >
                Nerolac Wood Coatings • {detailProduct.subtitle}
              </span>

              <h2 style={{ fontSize: '1.4rem', color: '#0251B0', marginBottom: '0.5rem' }}>
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
                  openWhatsApp(`Hello G.K Traders Paints, I want to enquire about Nerolac ${detailProduct.name}.`)
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
