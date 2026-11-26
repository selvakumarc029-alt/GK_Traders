import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { handleImageError } from '../utils/imageFallback';
import { ArrowLeft, CheckCircle, MessageCircle, X, ShieldCheck } from 'lucide-react';

const NEROLAC_METAL_ENAMELS = [
  {
    id: 'nr-pu-enamel-10in1',
    name: 'Nerolac PU Enamel 10 in 1',
    category: 'PU Modified Enamel',
    description:
      'Nerolac PU Enamel 10 in 1 is a PU modified Alkyd based general purpose enamel for the protection of Metal, Wood & Masonry substrates.',
    features: ['Rich glossy finish', '3 years warranty*', 'Anti-yellowing'],
    packSizes: ['200ml', '500ml', '1L', '4L', '20L'],
    image: '/paints/wood-metal.jpg',
  },
  {
    id: 'nr-synthetic-hi-gloss',
    name: 'Nerolac Synthetic Hi-Gloss Enamel',
    category: 'Solvent Hi-Gloss Enamel',
    description:
      'A time tested and proven, high quality solvent based hi-gloss enamel paint recommended for suitably primed interior and exterior wood, metal and walls.',
    features: ['High Gloss', 'Smooth Finish', 'Good Stain Resistance'],
    packSizes: ['100ml', '200ml', '500ml', '1L', '4L', '20L'],
    image: '/hero-interior-paint.jpg',
  },
  {
    id: 'nr-satin-enamel',
    name: 'Nerolac Satin Enamel',
    category: 'Satin Metal Enamel',
    description:
      'A specially formulated metal enamel paint to give an excellent finish, resembling the smoothness of satin to masonry, wood and metal surfaces.',
    features: ['Very Good Flow and Brushability', 'Very Smooth Satin Like Appearance', 'Good Washability'],
    packSizes: ['500ml', '1L', '4L', '20L'],
    image: '/brands/indigo.jpg',
  },
];

export default function NerolacMetalEnamelPage() {
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
              Nerolac • Metal Enamel Paints
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF', marginBottom: '0.6rem' }}>
            Nerolac Metal Enamel Paints
          </h1>
          <p style={{ fontSize: '1.02rem', color: '#E6EDEF', maxWidth: '640px', margin: '0 auto' }}>
            Protective, high-gloss and satin enamels engineered for metal gates, grilles, wood, and masonry surfaces.
          </p>
        </div>
      </section>

      {/* PRODUCT CARDS */}
      <div className="container" style={{ marginTop: '3rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '1.5rem',
          }}
        >
          {NEROLAC_METAL_ENAMELS.map((product) => (
            <div
              key={product.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                overflow: 'hidden',
              }}
            >
              <div>
                <div style={{ position: 'relative', height: '200px', backgroundColor: '#E6EDEF', overflow: 'hidden' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                    {product.category}
                  </span>
                </div>

                <div style={{ padding: '1.4rem 1.4rem 0' }}>
                  <h2 style={{ fontSize: '1.22rem', color: '#0251B0', marginBottom: '0.5rem' }}>
                    {product.name}
                  </h2>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.55', marginBottom: '1rem' }}>
                    {product.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '1.25rem' }}>
                    {product.features.map((feat, fIdx) => (
                      <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#0B1B36', fontWeight: '600' }}>
                        <CheckCircle size={15} color="#0251B0" style={{ flexShrink: 0 }} /> {feat}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 1.4rem 1.4rem', display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setDetailProduct(product)}
                  className="btn btn-outline"
                  style={{ flex: 1, padding: '0.65rem' }}
                >
                  More Info
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openWhatsApp(`Hello G.K Traders Paints, I want to enquire about ${product.name}.`)
                  }
                  className="btn btn-primary"
                  style={{ padding: '0.65rem 1rem' }}
                  title="Enquire on WhatsApp"
                >
                  <MessageCircle size={18} />
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
            <div style={{ position: 'relative', height: '195px', backgroundColor: '#E6EDEF' }}>
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
                  Nerolac • {detailProduct.category}
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
