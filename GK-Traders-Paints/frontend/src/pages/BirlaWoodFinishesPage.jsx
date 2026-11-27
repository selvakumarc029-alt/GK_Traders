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

const BIRLA_WOOD_PRODUCTS = [
  {
    id: 'bo-wood-allwood-italian-pu',
    name: 'Birla Opus Allwood Italian PU',
    range: '7 Series (Luxury)',
    type: 'PU Finishes',
    finish: 'Ultra Rich Gloss & Matt',
    description:
      'Allwood Italian PU offers scratch-resistant gloss and matt finishes, including white options, providing lasting protection and a refined look for wooden surfaces.',
    features: [
      '7 Series Luxury Ultra Rich Finish',
      'Fast Drying & Excellent Durability',
      'Scratch-Resistant Gloss & Matt Options',
    ],
    packSizes: ['500ml', '1L', '4L', '20L'],
    image: '/paints/birla-wood-allwood-italian-pu.png',
  },
  {
    id: 'bo-wood-allwood-pu-interior',
    name: 'Birla Opus Allwood PU Interior',
    range: '7 Series (Luxury)',
    type: 'PU Finishes',
    finish: 'Luxury Interior PU',
    description:
      'Allwood PU Interior offers a durable, stain-resistant finish for wood. With a range of rich stain colors, it enhances the beauty of interiors while providing lasting protection.',
    features: [
      '7 Series Luxury Interior Wood Finish',
      'Superior Scratch & Stain Resistance',
      '2 Year Warranty Protection',
    ],
    packSizes: ['500ml', '1L', '4L', '20L'],
    image: '/paints/birla-wood-allwood-pu-interior.png',
  },
  {
    id: 'bo-wood-allwood-pu-exterior',
    name: 'Birla Opus Allwood PU Exterior',
    range: '7 Series (Luxury)',
    type: 'PU Finishes',
    finish: 'Luxury Exterior PU',
    description:
      'Allwood PU Exterior offers a durable, weather-resistant finish with a glossy look, ideal for protecting and enhancing exterior wood with long-lasting stain resistance.',
    features: [
      '7 Series Luxury Exterior Wood Finish',
      'UV Damage & Weather Protection',
      '2 Year Warranty Protection',
    ],
    packSizes: ['500ml', '1L', '4L', '20L'],
    image: '/paints/birla-wood-allwood-pu-exterior.png',
  },
  {
    id: 'bo-wood-allwood-pu-color-interior',
    name: 'Birla Opus Allwood PU Color Interior',
    range: 'Specialty',
    type: 'PU Color & Effects',
    finish: 'Solvent-Based Colorants',
    description:
      'Allwood PU Color Interior delivers solvent-based machine colorants engineered for rich, consistent wood coating shades on interior timber.',
    features: [
      'Machine Friendly Precision Tinting',
      'High Strength Pigment Concentration',
      'Microbe Resistant Formulation',
    ],
    packSizes: ['500ml', '1L', '4L'],
    image: '/paints/birla-wood-allwood-pu-color-interior.png',
  },
  {
    id: 'bo-wood-allwood-pu-color-exterior',
    name: 'Birla Opus Allwood PU Color Exterior',
    range: '7 Series (Luxury)',
    type: 'PU Color & Effects',
    finish: 'Luxury Opaque Exterior',
    description:
      'Allwood PU Color Exterior provides a luxury pigmented polyurethane finish for exterior wood with superior durability and lasting colour retention.',
    features: [
      '7 Series Luxury Exterior PU Color',
      'Excellent Exterior Durability',
      'Lasting Colour Retention Against UV',
    ],
    packSizes: ['500ml', '1L', '4L', '20L'],
    image: '/paints/birla-wood-allwood-pu-color-exterior.png',
  },
  {
    id: 'bo-wood-allwood-pu-color-metallic',
    name: 'Birla Opus Allwood PU Color Metallic',
    range: '7 Series (Luxury)',
    type: 'PU Color & Effects',
    finish: 'Luxury Metallic PU',
    description:
      'Allwood PU Color Metallic creates a striking luxury metallic finish on wood furniture and feature elements with durable colour retention.',
    features: [
      '7 Series Luxury Metallic Wood Finish',
      'Excellent Surface Durability',
      'Lasting Metallic Colour Retention',
    ],
    packSizes: ['500ml', '1L', '4L'],
    image: '/paints/birla-wood-allwood-pu-color-metallic.png',
  },
  {
    id: 'bo-wood-allwood-sfx',
    name: 'Birla Opus Allwood SFX',
    range: 'Specialty',
    type: 'PU Color & Effects',
    finish: 'Special Effects Finish',
    description:
      'Allwood SFX is a special-effects wood coating crafted to elevate bespoke furniture and designer timber panels with distinctive aesthetic textures.',
    features: [
      'Designer Special Effects Finish',
      'Enhanced Aesthetics & Smooth Touch',
      'Long Lasting Protective Film',
    ],
    packSizes: ['500ml', '1L', '4L'],
    image: '/paints/birla-wood-allwood-sfx.png',
  },
  {
    id: 'bo-wood-allwood-melamine',
    name: 'Birla Opus Allwood Melamine',
    range: '5 Series (Premium)',
    type: 'Melamine & 1K PU',
    finish: 'Matt & High Gloss',
    description:
      'Allwood Melamine provides a smooth, flawless finish for wood surfaces, available in both matt and high gloss options, ensuring lasting beauty and protection for your furniture.',
    features: [
      '5 Series Premium Interior Finish',
      'Superior Stain & Scratch Resistance',
      '1 Year Warranty Protection',
    ],
    packSizes: ['500ml', '1L', '4L', '20L'],
    image: '/paints/birla-wood-allwood-melamine.png',
  },
  {
    id: 'bo-wood-allwood-melamine-ultra-clear',
    name: 'Birla Opus Allwood Melamine Ultra Clear',
    range: '5 Series (Premium)',
    type: 'Melamine & 1K PU',
    finish: 'Ultra Clear Gloss & Matt',
    description:
      'Allwood Melamine Ultra Clear provides a stain-proof, grain-filling clear wood sealer with both gloss and matt finishes, offering durable protection and an elegant wood surface.',
    features: [
      '5 Series Ultra Clear Interior Finish',
      'Crystal-Clear Grain Enhancement',
      '1 Year Warranty Protection',
    ],
    packSizes: ['500ml', '1L', '4L', '20L'],
    image: '/paints/birla-wood-allwood-melamine-ultra-clear.png',
  },
  {
    id: 'bo-wood-allwood-softtouch',
    name: 'Birla Opus Allwood SoftTouch 1K',
    range: '3 Series (Prep & 1K)',
    type: 'Melamine & 1K PU',
    finish: '1K PU Interior & Exterior',
    description:
      'Allwood SoftTouch 1K provides a smooth, soft finish with superior PU coating for wood. It offers durable protection while enhancing the natural beauty of wooden surfaces.',
    features: [
      '3 Series 1K PU Interior & Exterior',
      'Silky Smooth Finish Without Hardener',
      '1 Year Warranty Protection',
    ],
    packSizes: ['500ml', '1L', '4L', '20L'],
    image: '/paints/birla-wood-allwood-softtouch.png',
  },
  {
    id: 'bo-wood-allwood-nc-sanding-sealer',
    name: 'Birla Opus Allwood NC Sanding Sealer',
    range: '3 Series (Prep & 1K)',
    type: 'Prep, Stains & Thinner',
    finish: 'Fast-Drying Wood Sealer',
    description:
      'Allwood NC Sanding Sealer is a fast-drying wood sealer that fills grain and prepares surfaces for painting, ensuring smooth, flawless results for wood projects.',
    features: [
      '3 Series Fast-Drying NC Sealer',
      'Excellent Grain Filling & Sandability',
      'Smooth Base for Melamine & PU Coats',
    ],
    packSizes: ['500ml', '1L', '4L', '20L'],
    image: '/paints/birla-wood-allwood-nc-sanding-sealer.png',
  },
  {
    id: 'bo-wood-allwood-wood-stain',
    name: 'Birla Opus Allwood Wood Stain',
    range: 'Specialty',
    type: 'Prep, Stains & Thinner',
    finish: 'Translucent Colour Tones',
    description:
      'Allwood Wood Stain offers a solvent-based formula for beautiful translucent wood shades, perfect for enhancing wood surfaces with long-lasting color and protection.',
    features: [
      'Premium Translucent Wood Tones',
      'Highlights Natural Timber Grain',
      'Compatible with Melamine & PU Systems',
    ],
    packSizes: ['100ml', '250ml', '500ml', '1L'],
    image: '/paints/birla-wood-allwood-wood-stain.png',
  },
  {
    id: 'bo-wood-allwood-wood-filler',
    name: 'Birla Opus Allwood Wood Filler',
    range: '3 Series (Prep & 1K)',
    type: 'Prep, Stains & Thinner',
    finish: 'Grain & Dent Filler',
    description:
      'Allwood Wood Filler is a water-based solution for filling scratches, holes, dents, and grain imperfections, ensuring smooth, flawless wood surfaces ready for finishing.',
    features: [
      '3 Series Water-Based Wood Filler',
      'Excellent Durability & Adhesion',
      'Exceptional Hardness & Easy Sanding',
    ],
    packSizes: ['500g', '1kg', '5kg'],
    image: '/paints/birla-wood-allwood-wood-filler.png',
  },
  {
    id: 'bo-wood-allwood-pu-thinner',
    name: 'Birla Opus Allwood PU Thinner',
    range: '7 Series (Luxury)',
    type: 'Prep, Stains & Thinner',
    finish: 'Luxury PU Thinner',
    description:
      'Birla Opus Allwood PU Thinner is engineered for wood polish and wood paint application, ensuring smooth consistency, easy application, and a refined finish on wooden surfaces.',
    features: [
      '7 Series High-Performance PU Thinner',
      'Ensures Smooth Flow & Levelling',
      'Prevents Blushing & Pinholing',
    ],
    packSizes: ['500ml', '1L', '5L', '20L'],
    image: '/paints/birla-wood-allwood-pu-thinner.png',
  },
];

export default function BirlaWoodFinishesPage() {
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
    return BIRLA_WOOD_PRODUCTS.filter((p) => {
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
              Birla Opus Allwood • 7 Series • 5 Series • 3 Series
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '0.75rem' }}>
            Birla Opus Allwood Wood Finishes
          </h1>
          <p style={{ maxWidth: '690px', margin: '0 auto', color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Complete woodcare system from Italian PU, Interior &amp; Exterior PU, and PU Color Metallic to Melamine Ultra Clear, SoftTouch 1K, Wood Stain, and NC Sanding Sealer.
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
              <span>Filter Allwood Products</span>
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
                  placeholder="Search Italian PU, Melamine, Stain..."
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
              SERIES:
            </span>
            {['All', '7 Series (Luxury)', '5 Series (Premium)', '3 Series (Prep & 1K)', 'Specialty'].map((range) => (
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
                {range === 'All' ? 'All Series' : range}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginRight: '4px' }}>
              CATEGORY:
            </span>
            {['All', 'PU Finishes', 'PU Color & Effects', 'Melamine & 1K PU', 'Prep, Stains & Thinner'].map((type) => (
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
                {type === 'All' ? 'All Categories' : type}
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
