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

const BIRLA_WATERPROOFING_PRODUCTS = [
  {
    id: 'bo-wp-wall-n-roof-14',
    name: 'Birla Opus Alldry Wall N Roof 14',
    category: 'Roof & Wall Topcoats',
    warranty: 'Upto 14 Years Warranty',
    description:
      'Breakthrough elastomeric waterproofing protection delivering up to 12°C surface temperature reduction, 12 Bar water pressure resistance, 4mm crack bridging, and up to 350% film elongation.',
    features: [
      'Upto 12°C Surface Temp Reduction & 4mm Crack Bridging',
      'Upto 12 Bar Water Pressure Resistance',
      'Upto 14 Years Waterproofing Warranty',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-wp-alldry-wall-n-roof-14.png',
  },
  {
    id: 'bo-wp-wall-n-roof-12',
    name: 'Birla Opus Alldry Wall n Roof 12',
    category: 'Roof & Wall Topcoats',
    warranty: '12 Years Warranty',
    description:
      'Next-gen waterproofing solution offering advanced leak protection, surface temperature reduction, crack bridging, and long-lasting durability for roofs and exterior walls.',
    features: [
      'Upto 10°C Surface Temp Reduction',
      'High Crack Bridging & Film Elongation',
      '12 Years Waterproofing Warranty',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-wp-alldry-wall-n-roof-12.png',
  },
  {
    id: 'bo-wp-wall-n-roof-10',
    name: 'Birla Opus Alldry Wall n Roof 10',
    category: 'Roof & Wall Topcoats',
    warranty: '10 Years Warranty',
    description:
      'All-round waterproofing solution protecting roofs and walls from leaks, rain, and heat with high film elongation and water pressure resistance.',
    features: [
      'Roof & Exterior Wall Waterproofing',
      'Water Pressure & Crack-Bridging Shield',
      '10 Years Waterproofing Warranty',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-wp-alldry-wall-n-roof-10.png',
  },
  {
    id: 'bo-wp-wall-n-roof-7',
    name: 'Birla Opus Alldry Wall N Roof 7',
    category: 'Roof & Wall Topcoats',
    warranty: 'Upto 7 Years Warranty',
    description:
      'Weatherproof waterproofing coating engineered for terraces, parapets, and exterior walls against heavy monsoon rains and leaks.',
    features: [
      'Monsoon & Heavy-Rain Protection',
      'Flexible Crack-Bridging Film',
      'Upto 7 Years Waterproofing Warranty',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-wp-alldry-wall-n-roof-7.png',
  },
  {
    id: 'bo-wp-total-stop',
    name: 'Birla Opus Alldry Total Stop',
    category: 'Dampness & 2K Coatings',
    warranty: 'Upto 5 Years Warranty',
    description:
      'Hassle-free dampness solution designed to stop interior and exterior wall dampness, blistering, and peeling paint.',
    features: [
      'Stops Interior & Exterior Wall Dampness',
      'Prevents Paint Peeling & Blistering',
      'Upto 5 Years Waterproofing Warranty',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-wp-alldry-total-stop.png',
  },
  {
    id: 'bo-wp-wall-fix-4',
    name: 'Birla Opus Alldry Wall Fix 4',
    category: 'Dampness & 2K Coatings',
    warranty: '4 Years Warranty',
    description:
      'Crack-proof waterproofing primer designed to bridge hairline cracks, enhance topcoat adhesion, and provide a durable waterproof base.',
    features: [
      'Crack-Bridging Waterproof Primer',
      'Water Pressure & Heat Reduction',
      '4 Years Waterproofing Warranty',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-wp-alldry-wall-fix-4.png',
  },
  {
    id: 'bo-wp-salt-seal',
    name: 'Birla Opus Alldry Salt Seal',
    category: 'Dampness & 2K Coatings',
    warranty: 'Upto 8 Years System Warranty',
    description:
      'Anti-efflorescence sealing primer formulated to protect masonry walls from salt deposits, offering superior adhesion and hiding.',
    features: [
      'Blocks Salt Efflorescence & White Patches',
      'Superior Masonry Adhesion & Hiding',
      'Upto 8 Years System Warranty',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-wp-alldry-salt-seal.png',
  },
  {
    id: 'bo-wp-total-2k',
    name: 'Birla Opus Alldry Total 2K',
    category: 'Dampness & 2K Coatings',
    warranty: 'Upto 3 Years Warranty',
    description:
      'Two-component dampness-proof cementitious coating creating a resilient moisture barrier with water pressure and efflorescence resistance.',
    features: [
      '2-Component Hydrostatic Pressure Barrier',
      'Anti-Efflorescence & Film Elongation',
      'Upto 3 Years Waterproofing Warranty',
    ],
    packSizes: ['1Kg', '3Kg', '15Kg'],
    image: '/paints/birla-wp-alldry-total-2k.png',
  },
  {
    id: 'bo-wp-total-2k-flex',
    name: 'Birla Opus Alldry Total 2K Flex',
    category: 'Dampness & 2K Coatings',
    warranty: 'Flexible 2K System',
    description:
      'Combines exterior and interior waterproofing with a flexible crack-proof coating and wall pore sealing for durable surface protection.',
    features: [
      'Seals Wall Pores & Bridges Cracks',
      'Interior & Exterior Dampness Shield',
      'High-Flexibility 2K Polymer Coating',
    ],
    packSizes: ['3Kg', '15Kg'],
    image: '/paints/birla-wp-alldry-total-2k-flex.png',
  },
  {
    id: 'bo-wp-total-win',
    name: 'Birla Opus Alldry Total Win',
    category: 'Dampness & 2K Coatings',
    warranty: 'Upto 3 Years Warranty',
    description:
      'Interior dampness-blocking waterproof coating engineered to stop dampness before it starts on indoor masonry walls.',
    features: [
      'Stops Interior Dampness Before It Starts',
      'Strong Barrier Against Seepage',
      'Upto 3 Years Waterproofing Warranty',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-wp-alldry-total-win.png',
  },
  {
    id: 'bo-wp-crack-master-paste',
    name: 'Birla Opus Alldry Crack Master Paste',
    category: 'Crack Fillers & Repair',
    warranty: 'Flexible Crack Filler',
    description:
      'Waterproof crack filler and wall crack sealer offering superior whiteness and a flexible, durable finish to seal masonry cracks.',
    features: [
      'Fills & Seals Exterior/Interior Wall Cracks',
      'Superior Whiteness & Flexible Film',
      'Ready-to-Use Putty Knife Application',
    ],
    packSizes: ['500g', '1Kg', '5Kg'],
    image: '/paints/birla-wp-alldry-crack-master-paste.png',
  },
  {
    id: 'bo-wp-repair-master',
    name: 'Birla Opus Alldry Repair Master',
    category: 'Crack Fillers & Repair',
    warranty: 'SBR Latex Binder',
    description:
      'One-stop latex-based waterproofing repair binder offering superior adhesion, high compressive strength, and multipurpose mortar bonding.',
    features: [
      'Multipurpose SBR Latex Bonding Agent',
      'High Compressive & Tensile Strength',
      'Ideal for Concrete Repair & Plastering',
    ],
    packSizes: ['200ml', '500ml', '1L', '5L', '20L'],
    image: '/paints/birla-wp-alldry-repair-master.png',
  },
];

export default function BirlaWaterproofingPage() {
  const navigate = useNavigate();
  const { openWhatsApp } = useShop();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailProduct, setDetailProduct] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const filteredProducts = useMemo(() => {
    return BIRLA_WATERPROOFING_PRODUCTS.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.description.toLowerCase().includes(q) &&
          !p.category.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory('All');
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
              Birla Opus • Alldry Waterproofing
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '0.75rem' }}>
            Birla Opus Alldry Waterproofing
          </h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Complete roof, wall, dampness, efflorescence, and crack-repair solutions under Birla Opus Alldry — backed by up to 14-year waterproofing warranties.
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
              <span>Filter Alldry Range</span>
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
                  placeholder="Search Wall N Roof, 2K, Crack..."
                  className="form-control"
                  style={{ height: '40px', paddingRight: '2.4rem', borderRadius: '999px', fontSize: '0.88rem' }}
                />
                <Search
                  size={16}
                  color="#4A5E73"
                  style={{ position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>

              {(selectedCategory !== 'All' || searchQuery) && (
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
              CATEGORY:
            </span>
            {['All', 'Roof & Wall Topcoats', 'Dampness & 2K Coatings', 'Crack Fillers & Repair'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '5px 14px',
                  borderRadius: '999px',
                  border: selectedCategory === cat ? '1.5px solid #0251B0' : '1px solid var(--border-color)',
                  backgroundColor: selectedCategory === cat ? '#0251B0' : '#FFFFFF',
                  color: selectedCategory === cat ? '#FFFFFF' : '#0B1B36',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                {cat === 'All' ? 'All Solutions' : cat}
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
                    padding: '0.75rem',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    onError={(e) => handleImageError(e, 'Waterproofing')}
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
                    Alldry
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
                padding: '0.75rem',
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
                  Birla Opus Alldry • {detailProduct.warranty}
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
