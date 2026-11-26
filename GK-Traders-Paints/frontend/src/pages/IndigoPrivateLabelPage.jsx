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

const INDIGO_PRIVATE_LABEL_PRODUCTS = [
  {
    id: 'in-pl-enigma-premium-ext',
    name: 'Enigma Premium Exterior Emulsion',
    collection: 'Enigma',
    finish: 'Exterior Emulsion',
    description:
      'Exceptional Protection, Aesthetic Finish, and Superior Coverage for Your Surfaces.',
    features: ['Exceptional Exterior Protection', 'Superior Coverage & Opacity', 'Rich Aesthetic Finish'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pl-enigma-premium-ext.webp',
  },
  {
    id: 'in-pl-enigma-ext-int',
    name: 'Enigma Exterior & Interior Emulsion',
    collection: 'Enigma',
    finish: 'Dual-Surface Emulsion',
    description:
      'Affordable, Protective, and Aesthetically Pleasing Solutions for Your Exteriors and Interiors.',
    features: ['Dual Interior & Exterior Application', 'Protective Acrylic Film', 'Value-Driven Coverage'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pl-enigma-ext-int.webp',
  },
  {
    id: 'in-pl-enigma-tile-coat',
    name: 'Enigma Premium Tile Coat Emulsion',
    collection: 'Enigma',
    finish: 'Luxurious Sheen',
    description:
      'Lasting Colour and Protection with a Luxurious Sheen for exterior roof tiles.',
    features: ['Luxurious Sheen Finish', 'Lasting Non-Fading Colour', 'Weather & Water Protection'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pl-enigma-premium-ext.webp',
  },
  {
    id: 'in-pl-enigma-floor-coat',
    name: 'Enigma Premium Floor Coat Emulsion',
    collection: 'Enigma',
    finish: 'Semi-Gloss Floor Coat',
    description:
      'Semi-Gloss Brilliance with Long-Lasting Protection for exterior floors and driveways.',
    features: ['Semi-Gloss Brilliance', 'High Abrasion & Traffic Resistance', 'Long-Lasting Floor Protection'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pl-enigma-premium-ext.webp',
  },
  {
    id: 'in-pl-enigma-inex-primer',
    name: 'Enigma Inex Primer',
    collection: 'Enigma',
    finish: 'Interior & Exterior Primer',
    description:
      'Superior Coverage for Both Exterior & Interior Surfaces.',
    features: ['Interior & Exterior Masonry Primer', 'Superior Coverage & Sealing', 'Strong Topcoat Adhesion'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pl-enigma-inex-primer.webp',
  },
  {
    id: 'in-pl-enigma-ceiling-white',
    name: 'Enigma Premium Ceiling White',
    collection: 'Enigma',
    finish: 'Matte Ceiling Finish',
    description:
      'Enhancing Vibrancy with a Matte Finish specially formulated for bright, glare-free ceilings.',
    features: ['Bright Matte Ceiling Finish', 'Enhances Room Vibrancy', 'High Opacity & Smooth Roll'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pl-enigma-ceiling-white.webp',
  },
  {
    id: 'in-pl-vibe-ultra-ext',
    name: 'Vibe Ultra Premium Exterior Emulsion',
    collection: 'Vibe',
    finish: 'Ultra Premium Matt',
    description:
      'Advanced Protection and Stunning Matt Finishes for Lasting Exterior Elegance.',
    features: ['Advanced All-Weather Protection', 'Stunning Matte Exterior Finish', 'Long-Lasting Colour Retention'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pl-vibe-ultra-ext.webp',
  },
  {
    id: 'in-pl-vibe-ext-sheen',
    name: 'Vibe Premium Exterior Sheen Emulsion',
    collection: 'Vibe',
    finish: 'Smooth Exterior Sheen',
    description:
      'Sun-Resistant Finishes with a Smooth Sheen for Lasting Exterior Beauty.',
    features: ['Sun & UV-Resistant Film', 'Smooth Exterior Sheen', 'Lasting Facade Beauty'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pl-vibe-ext-sheen.webp',
  },
  {
    id: 'in-pl-vibe-acrylic-ext',
    name: 'Vibe Acrylic Exterior Emulsion',
    collection: 'Vibe',
    finish: 'Acrylic Exterior Matt',
    description:
      'Superior Coverage and Protection for Your Shaded Spaces.',
    features: ['Tailored for Shaded Exteriors', 'Superior Coverage & Opacity', 'Reliable Weather Defence'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pl-vibe-acrylic-ext.webp',
  },
  {
    id: 'in-pl-vibe-int-sheen',
    name: 'Vibe Premium Interior Sheen Emulsion',
    collection: 'Vibe',
    finish: 'Interior Sheen',
    description:
      'A Perfect Blend of Quality and Affordability for modern interior walls.',
    features: ['Rich Interior Sheen Finish', 'Quality & Affordability Balance', 'Smooth Washable Surface'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pl-vibe-int-sheen.webp',
  },
  {
    id: 'in-pl-vibe-acrylic-int',
    name: 'Vibe Acrylic Interior Emulsion',
    collection: 'Vibe',
    finish: 'Acrylic Interior Matt',
    description:
      'Delivering Quality and Value for Every Project.',
    features: ['Smooth Acrylic Interior Finish', 'High Value for Every Project', 'Easy Brush & Roller Flow'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pl-vibe-acrylic-int.webp',
  },
  {
    id: 'in-pl-vibe-int-primer',
    name: 'Vibe Interior Wall Primer',
    collection: 'Vibe',
    finish: 'Interior Wall Primer',
    description:
      'Unmatched Coverage at a Great Price for interior masonry walls.',
    features: ['Unmatched Primer Coverage', 'Strong Adhesion for Emulsions', 'Great Value Pricing'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pl-vibe-int-primer.webp',
  },
  {
    id: 'in-pl-vibe-sealer-primer',
    name: 'Vibe Sealer Primer',
    collection: 'Vibe',
    finish: 'Extra Whiteness Sealer',
    description:
      'Ultimate Protection with Extra Whiteness for Both Interiors and Exteriors.',
    features: ['Extra Whiteness & Sealing Power', 'Interior & Exterior Suitable', 'Alkali & Dampness Barrier'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pl-vibe-sealer-primer.webp',
  },
  {
    id: 'in-pl-climex-plus-ext',
    name: 'Climex Plus All Weather Exterior Emulsion',
    collection: 'Climex',
    finish: 'All-Weather Exterior',
    description:
      'Vibrant, Water-Repellent, and Long-Lasting Against Algae and Fungus.',
    features: ['Water-Repellent Exterior Film', 'Long-Lasting Algae & Fungus Resistance', 'Vibrant All-Weather Shades'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pl-climex-plus-ext.webp',
  },
  {
    id: 'in-pl-climex-plus-roof',
    name: 'Climex Plus Roof Tile Coat',
    collection: 'Climex',
    finish: 'Glossy Roof Tile Coat',
    description:
      'Specially formulated to preserve natural roof tiles with vibrant, glossy colours.',
    features: ['Preserves Natural Roof Tiles', 'Vibrant Glossy Finish', 'Weather & Moisture Shield'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pl-climex-plus-roof.webp',
  },
  {
    id: 'in-pl-climex-ext',
    name: 'Climex Exterior Emulsion',
    collection: 'Climex',
    finish: 'Exterior Matt',
    description:
      'Superior Sun and Rain Defence with Algae-Fungus Resistance.',
    features: ['Sun & Rain Weather Defence', 'Algae & Fungus Resistance', 'Smooth Exterior Finish'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pl-climex-ext.webp',
  },
  {
    id: 'in-pl-climex-primer',
    name: 'Climex Exterior Primer',
    collection: 'Climex',
    finish: 'Anti-Efflorescence Primer',
    description:
      'Offering good anti-efflorescence properties and dampness resistance.',
    features: ['Anti-Efflorescence Protection', 'Dampness Resistance', 'Strong Exterior Undercoat'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pl-climex-primer.webp',
  },
  {
    id: 'in-pl-fantasy-ext',
    name: 'Fantasy Exterior Emulsion',
    collection: 'Fantasy & Flair',
    finish: 'Exterior Emulsion',
    description:
      'Exceptional Coverage, Shade Protection, and Algae-Fungus Defence.',
    features: ['Exceptional Coverage & Opacity', 'Long-Lasting Shade Protection', 'Algae & Fungus Defence'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pl-fantasy-ext.webp',
  },
  {
    id: 'in-pl-flair-int',
    name: 'Flair Premium Interior Emulsion',
    collection: 'Fantasy & Flair',
    finish: 'Premium Interior',
    description:
      'Effortless Clean-Up, Outstanding Coverage, and Stain Resistance.',
    features: ['Effortless Stain Clean-Up', 'Outstanding Interior Coverage', 'Smooth Premium Finish'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pl-flair-int.webp',
  },
  {
    id: 'in-pl-fantasy-int',
    name: 'Fantasy Interior Emulsion',
    collection: 'Fantasy & Flair',
    finish: 'Smooth Interior Matt',
    description:
      'Smooth Finishes and Exceptional Coverage for everyday interior walls.',
    features: ['Smooth Interior Wall Finish', 'Exceptional Coverage', 'Bright Clean Shades'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pl-fantasy-int.webp',
  },
];

export default function IndigoPrivateLabelPage() {
  const navigate = useNavigate();
  const { openWhatsApp } = useShop();

  const [selectedCollection, setSelectedCollection] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailProduct, setDetailProduct] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const filteredProducts = useMemo(() => {
    return INDIGO_PRIVATE_LABEL_PRODUCTS.filter((p) => {
      if (selectedCollection !== 'All' && p.collection !== selectedCollection) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.description.toLowerCase().includes(q) &&
          !p.collection.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCollection, searchQuery]);

  const clearFilters = () => {
    setSelectedCollection('All');
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
              Indigo Paints • Private Label
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '0.75rem' }}>
            Indigo Private Label Collection
          </h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            An exclusive private label collection with premium solutions for every surface — featuring the Enigma, Vibe, Climex, Fantasy, and Flair ranges.
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
              <span>Filter Private Label Range</span>
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
                  placeholder="Search Enigma, Vibe, Climex..."
                  className="form-control"
                  style={{ height: '40px', paddingRight: '2.4rem', borderRadius: '999px', fontSize: '0.88rem' }}
                />
                <Search
                  size={16}
                  color="#4A5E73"
                  style={{ position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>

              {(selectedCollection !== 'All' || searchQuery) && (
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
            {['All', 'Enigma', 'Vibe', 'Climex', 'Fantasy & Flair'].map((col) => (
              <button
                key={col}
                type="button"
                onClick={() => setSelectedCollection(col)}
                style={{
                  padding: '5px 14px',
                  borderRadius: '999px',
                  border: selectedCollection === col ? '1.5px solid #0251B0' : '1px solid var(--border-color)',
                  backgroundColor: selectedCollection === col ? '#0251B0' : '#FFFFFF',
                  color: selectedCollection === col ? '#FFFFFF' : '#0B1B36',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                {col === 'All' ? 'All Collections' : col}
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
                    {product.collection}
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
                    openWhatsApp(`Hello G.K Traders Paints, I want to enquire about ${product.name} (${product.collection}).`)
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
                  Indigo • {detailProduct.collection} • {detailProduct.finish}
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
