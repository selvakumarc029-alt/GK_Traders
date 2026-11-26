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

const INDIGO_WATERPROOFING_PRODUCTS = [
  {
    id: 'in-wp-leakproof-emulsion',
    name: 'Indigo Leakproof Emulsion',
    category: 'Topcoats & Sealers',
    series: 'Protect Plus',
    warranty: '10 Year Warranty',
    description:
      'Flagship Protect Plus elastomeric waterproofing coating for terraces, roofs, and exterior walls with anti-fungal, anti-algal protection and user-friendly application.',
    features: [
      'Anti-Fungal & Anti-Algal Protection',
      'User-Friendly Application on Roofs & Walls',
      '10 Year Waterproofing Warranty',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-wp-leakproof-emulsion.png',
  },
  {
    id: 'in-wp-wallseal-xt',
    name: 'Indigo Wallseal XT Emulsion',
    category: 'Topcoats & Sealers',
    series: 'Protect Plus',
    warranty: '8 Year Warranty',
    description:
      'High-performance Protect Plus waterproofing emulsion engineered for exterior walls with easy brush/roller application and long-term moisture protection.',
    features: [
      'Dedicated Exterior Wall Waterproofing',
      'Easy to Apply & Smooth Protective Film',
      '8 Year Waterproofing Warranty',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-wp-wallseal-xt.png',
  },
  {
    id: 'in-wp-dampseal-xt-primer',
    name: 'Indigo Dampseal XT Primer',
    category: 'Damp-Proof Primers',
    series: 'Protect Plus',
    warranty: '5 Year Warranty',
    description:
      'Specialized Protect Plus exterior waterproofing undercoat delivering superior damp and alkali resistance along with strong adhesion to masonry and cement surfaces.',
    features: [
      'Superior Damp & Alkali Resistance',
      'Strong Adhesion to Masonry & Cement Surfaces',
      '5 Year Waterproofing Warranty',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-wp-dampseal-xt-primer.png',
  },
  {
    id: 'in-wp-dampseal-interior-primer',
    name: 'Indigo Dampseal Interior Primer',
    category: 'Damp-Proof Primers',
    series: 'Protect Plus',
    warranty: '5 Year Warranty',
    description:
      'Protect Plus interior damp-proofing primer offering a smooth finish and superior resistance against interior wall dampness before topcoat application.',
    features: [
      'Smooth Finish for Interior Walls',
      'Superior Damp Resistance for Interiors',
      '5 Year Waterproofing Warranty',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-wp-dampseal-interior-primer.png',
  },
  {
    id: 'in-wp-aquashield',
    name: 'Indigo Aquashield',
    category: 'Topcoats & Sealers',
    series: 'Protect Plus',
    warranty: '3 Year Warranty',
    description:
      'Moisture-sealing penetrative coating under the Protect Plus range designed to stop efflorescence and lock out dampness on masonry substrates.',
    features: [
      'Efflorescence Protection',
      'Moisture-Sealing Penetrative Coating',
      '3 Year Waterproofing Warranty',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-wp-aquashield.png',
  },
  {
    id: 'in-wp-superseal',
    name: 'Indigo Superseal',
    category: 'Admixtures & Repair',
    series: 'Protect Plus',
    warranty: 'Integral Liquid Compound',
    description:
      'Integral liquid waterproofing compound for concrete, mortar, and plaster that mixes easily and provides high resistance against water permeability.',
    features: [
      'Easy Mixing with Concrete, Mortar & Plaster',
      'High Water Permeability Resistance',
      'Superior Waterproofing Performance',
    ],
    packSizes: ['200ml', '500ml', '1L', '5L', '20L'],
    image: '/paints/indigo-wp-superseal.png',
  },
  {
    id: 'in-wp-polyrepair',
    name: 'Indigo Polyrepair',
    category: 'Admixtures & Repair',
    series: 'Protect Plus',
    warranty: 'SBR Latex Formula',
    description:
      'SBR latex polymer for structural repairs and waterproofing that delivers outstanding water resistance and enhances flexural strength to resist cracking.',
    features: [
      'Outstanding Waterproofing & Bonding',
      'Enhances Flexural Strength to Resist Cracking',
      'SBR Latex for Repairs & Waterproofing',
    ],
    packSizes: ['200ml', '500ml', '1L', '5L', '20L'],
    image: '/paints/indigo-wp-polyrepair.png',
  },
  {
    id: 'in-wp-dampstop-2k',
    name: 'Indigo Dampstop 2K',
    category: 'Damp-Proof Primers',
    series: 'Protect Plus',
    warranty: '3 Year Warranty',
    description:
      'Two-component Protect Plus waterproofing system offering damp and efflorescence resistance, positive & negative side handling, easy application, and anti-fungal masonry adhesion.',
    features: [
      'Positive & Negative Side Damp Handling',
      'Damp, Efflorescence & Anti-Fungal Resistance',
      '3 Year Warranty • Strong Masonry Adhesion',
    ],
    packSizes: ['1Kg', '3Kg', '15Kg'],
    image: '/paints/indigo-wp-dampstop-2k.webp',
  },
  {
    id: 'in-wp-crack-heal-paste',
    name: 'Indigo Crack Heal Paste',
    category: 'Admixtures & Repair',
    series: 'Protect Plus',
    warranty: 'Fills Cracks up to 3mm',
    description:
      'Ready-to-use Protect Plus crack filler paste with easy putty-knife application, forming a flexible, water-resistant film that fills masonry cracks up to 3mm wide.',
    features: [
      'Fills Exterior & Interior Cracks up to 3mm Wide',
      'Flexible & Water-Resistant Protective Film',
      'Easy Ready-to-Use Application',
    ],
    packSizes: ['500g', '1Kg', '5Kg'],
    image: '/paints/indigo-wp-crack-heal-paste.png',
  },
];

export default function IndigoWaterproofingPage() {
  const navigate = useNavigate();
  const { openWhatsApp } = useShop();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailProduct, setDetailProduct] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const filteredProducts = useMemo(() => {
    return INDIGO_WATERPROOFING_PRODUCTS.filter((p) => {
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
              Indigo Paints • Protect Plus
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '0.75rem' }}>
            Indigo Waterproofing Solutions
          </h1>
          <p style={{ maxWidth: '660px', margin: '0 auto', color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Comprehensive Protect Plus solutions against moisture, roof leaks, wall dampness, efflorescence, and masonry cracks — backed by up to 10-year waterproofing warranties.
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
              <span>Filter Protect Plus Range</span>
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
                  placeholder="Search Leakproof, Dampseal, 2K..."
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
            {['All', 'Topcoats & Sealers', 'Damp-Proof Primers', 'Admixtures & Repair'].map((cat) => (
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
                    {product.series}
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
                  Indigo • {detailProduct.series} • {detailProduct.warranty}
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
