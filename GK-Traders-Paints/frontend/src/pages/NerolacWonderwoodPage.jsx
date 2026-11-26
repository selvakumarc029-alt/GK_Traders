import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { handleImageError } from '../utils/imageFallback';
import { ArrowLeft, CheckCircle, MessageCircle, Search, X } from 'lucide-react';

const WOOD_ANCILLARY_PRODUCTS = [
  {
    id: 'wa-termiprotect',
    name: 'Nerolac TermiProtect',
    category: 'Anti-Termite',
    description:
      'Nerolac TermiProtect is a highly effective formula penetrating deep into the wood, providing long-lasting protection against termites. Can be used with enamels and all interior & exterior wood coating products.',
    features: ['Deep Wood Penetration', 'Long-Lasting Termite Shield', 'Compatible with All Wood Coatings'],
    packSizes: ['500ml', '1L', '5L'],
    image: '/paints/wood-metal.jpg',
  },
  {
    id: 'wa-gloria-wood-filler',
    name: 'Wonderwood Gloria Wood Filler',
    category: 'Wood Filler',
    description:
      'Nerolac Wonderwood Dent Filler is a water-based dent filler that can be used for filling grains, dents, pin holes, and knots on all kinds of wood.',
    features: ['Easy to Apply', 'Good Filling Property', 'Good Sanding Ability'],
    packSizes: ['500g', '1Kg', '5Kg'],
    image: '/brands/birla-white.jpg',
  },
  {
    id: 'wa-wood-stains',
    name: 'Wonderwood Wood Stains',
    category: 'Wood Stains',
    description:
      'Nerolac Wood Stains are available in 10 ready-to-use shades. They enhance the natural beauty and richness of wood grains with ease of application, uniform spreading, and fast drying.',
    features: ['Easy to Apply', 'Uniform Spreading'],
    packSizes: ['200ml', '500ml', '1L'],
    image: '/brands/berger.jpg',
  },
];

const ITALIAN_WOOD_PRODUCTS = [
  {
    id: 'it-universal-pu-primer-grey',
    name: 'Universal PU Primer Grey',
    category: 'PU Primer',
    description:
      'Nerolac Universal PU Primer Grey is a high-performance, two-component anti-corrosive primer that offers excellent adhesion to various substrates, including Mild Steel, Stainless Steel, Galvanized Iron, Glass, and MDF.',
    features: ['Corrosion Resistance', 'Excellent Adhesion', 'Fast Drying'],
    packSizes: ['1L', '4L', '20L'],
    image: '/paints/wood-metal.jpg',
  },
  {
    id: 'it-italian-2k-pu',
    name: 'Italian 2k PU',
    category: 'Italian 2K PU',
    description:
      'High-quality white gloss PU for spray application. Excellent resistance to cold liquids, good scratch resistance, excellent softness to the touch, yellowing resistance and coverage.',
    features: ['Superior Finish', 'High Durability', 'Excellent Gloss'],
    packSizes: ['1L', '4L', '20L'],
    image: '/brands/berger.jpg',
  },
];

const WONDERWOOD_PRODUCTS = [
  {
    id: 'ww-gloria-epoxy-primer',
    name: 'Wonderwood Gloria Epoxy Primer',
    category: 'Primer',
    description:
      'Wonderwood Gloria Epoxy Primer is a universal impregnating primer for both interior and exterior application which blocks tanning and other impurities contained in the wood from reacting with the coating.',
    features: ['Excellent Durability & Finish'],
    packSizes: ['500ml', '1L', '4L'],
    image: '/paints/wood-metal.jpg',
  },
  {
    id: 'ww-gloria',
    name: 'Wonderwood Gloria',
    category: 'Luxury Wood Finish',
    description:
      'Nerolac Wonderwood Gloria is a luxury wood finish for interior application on solid woods & veneers. It gives a tough film that provides excellent scratch and stain resistance and is fast drying.',
    features: ['Excellent Gloss', 'Toughness & Transparency', 'Excellent Scratch & Stain resistance'],
    packSizes: ['1L', '4L', '20L'],
    image: '/brands/berger.jpg',
  },
  {
    id: 'ww-2k-pu-exterior',
    name: 'Wonderwood 2K PU Exterior',
    category: 'Exterior PU',
    description:
      'A two component polyurethane wood coating finish specially formulated to have weather resistant, light-fastness & non yellowing properties in all seasons.',
    features: ['Super Premium', 'Excellent Durability', 'Stain free'],
    packSizes: ['1L', '4L', '20L'],
    image: '/paints/wood-metal.jpg',
  },
  {
    id: 'ww-2k-pu-interior',
    name: 'Wonderwood 2K PU Interior',
    category: 'Interior PU',
    description:
      'A luxurious two component polyurethane wood coating finish specially formulated to protect interior wooden furniture.',
    features: ['Super Premium', 'Light Colour', 'Excellent Durability'],
    packSizes: ['1L', '4L', '20L'],
    image: '/brands/berger.jpg',
  },
  {
    id: 'ww-melamine',
    name: 'Wonderwood Melamine',
    category: 'Melamine',
    description:
      'A two component acid catalyzed wood finish paint that provides tough & durable coating on all kinds of wood, veneer & medium density fiber board.',
    features: ['Premium', 'Excellent Durability', 'Stain free'],
    packSizes: ['500ml', '1L', '4L', '20L'],
    image: '/paints/wood-metal.jpg',
  },
  {
    id: 'ww-clear-acrylic-lacquer',
    name: 'Wonderwood Clear Acrylic Lacquer',
    category: 'Lacquer',
    description:
      'An NC free wood lacquer paint which offers water clear film with a unique finish which can be applied by brushing & spraying on all kinds of wood.',
    features: ['Popular', 'Non-Yellowing', 'Economical'],
    packSizes: ['500ml', '1L', '4L'],
    image: '/hero-interior-paint.jpg',
  },
  {
    id: 'ww-1k-pu-interior',
    name: 'Wonderwood 1K PU Interior',
    category: 'Interior PU',
    description:
      'A single pack brushable wood finish paint based on urethane modified resin which offers natural look to wood & protects it from water, termite stains and normal handling.',
    features: ['Ready to Use', 'Scratch Resistance', 'Economical'],
    packSizes: ['500ml', '1L', '4L'],
    image: '/brands/berger.jpg',
  },
  {
    id: 'ww-nc-sanding-sealer',
    name: 'Nerolac Wonderwood NC Sanding Sealer',
    category: 'Sealer',
    description:
      'A quick drying wood sanding sealer recommended for filling the grains of wood prior to application of top coats.',
    features: ['Excellent Filling', 'Faster Drying', 'Ease of Application'],
    packSizes: ['500ml', '1L', '4L', '20L'],
    image: '/paints/wood-metal.jpg',
  },
];

export default function NerolacWonderwoodPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { openWhatsApp } = useShop();
  const [searchQuery, setSearchQuery] = useState('');
  const [detailProduct, setDetailProduct] = useState(null);

  const isItalian = location.pathname.endsWith('/italian');
  const isAncillary = location.pathname.endsWith('/ancillary');
  const productSource = isItalian
    ? ITALIAN_WOOD_PRODUCTS
    : isAncillary
      ? WOOD_ANCILLARY_PRODUCTS
      : WONDERWOOD_PRODUCTS;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setSearchQuery('');
  }, [isItalian, isAncillary]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return productSource;
    const q = searchQuery.toLowerCase();
    return productSource.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }, [searchQuery, productSource]);

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
            onClick={() => navigate('/nerolac/wood-coatings')}
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
            <ArrowLeft size={14} /> Back to Wood Coatings
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
              {isItalian
                ? 'Nerolac • Italian Wood Coatings'
                : isAncillary
                  ? 'Nerolac • Wood Ancillary'
                  : 'Nerolac • Wonderwood Coatings'}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF', marginBottom: '0.6rem' }}>
            {isItalian ? 'Italian Wood Coatings' : isAncillary ? 'Wood Ancillary' : 'Wonderwood Coatings'}
          </h1>
          <p style={{ fontSize: '1.02rem', color: '#E6EDEF', maxWidth: '640px', margin: '0 auto' }}>
            {isItalian
              ? 'Luxury Italian 2K PU systems and Universal PU Primer Grey for spray-grade gloss, durability, and multi-substrate adhesion.'
              : isAncillary
                ? 'Essential wood preparation & protection — TermiProtect anti-termite treatment, Wonderwood Gloria Wood Filler, and Wood Stains.'
                : 'Complete Nerolac Wonderwood lineup — Epoxy Primer, Gloria, 1K & 2K PU, Melamine, Acrylic Lacquer, and NC Sanding Sealer.'}
          </p>
        </div>
      </section>

      {/* SEARCH BAR */}
      <div className="container" style={{ marginTop: '2.25rem' }}>
        <div
          className="card"
          style={{
            padding: '1.15rem 1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ fontWeight: '700', color: '#0251B0' }}>
            Showing {filteredProducts.length} Wonderwood Products
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: '280px', flex: '1 1 220px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Gloria, 2K PU, Melamine..."
              className="form-control"
              style={{ height: '40px', paddingRight: '2.4rem', borderRadius: '999px', fontSize: '0.88rem' }}
            />
            <Search
              size={16}
              color="#4A5E73"
              style={{ position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)' }}
            />
          </div>
        </div>

        {/* PRODUCT CARDS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 310px), 1fr))',
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
                <div style={{ position: 'relative', height: '190px', backgroundColor: '#E6EDEF', overflow: 'hidden' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => handleImageError(e, 'Wood Coatings')}
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
                Nerolac Wonderwood • {detailProduct.category}
              </span>

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
                  openWhatsApp(`Hello G.K Traders Paints, I want to enquire about ${detailProduct.name}.`)
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
