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

const INDIGO_PUTTIES_PRIMERS = [
  {
    id: 'in-pp-waterproof-polymer-putty',
    name: 'Indigo Waterproof Polymer Putty',
    series: 'Platinum',
    type: 'Putties & Fillers',
    badge: 'Interior & Exterior',
    description:
      'Damp resistance, ease of application, robust adhesion, and compressive strength, all without added lead, mercury, or chromium compounds.',
    features: [
      'Damp-Resistant Polymer Formula',
      'Robust Adhesion & Compressive Strength',
      'Zero Added Lead, Mercury or Chromium',
    ],
    packSizes: ['1Kg', '5Kg', '20Kg', '40Kg'],
    image: '/paints/indigo-pp-waterproof-polymer-putty.webp',
  },
  {
    id: 'in-pp-polymer-putty-gold',
    name: 'Indigo Polymer Putty (Gold Series)',
    series: 'Gold',
    type: 'Putties & Fillers',
    badge: 'RD Polymers + White Cement',
    description:
      'Ease-of-use with strong adhesion and compressive strength, non-flammable and free from added lead, mercury, or chromium compounds.',
    features: [
      'Fortified with RD Polymers & White Cement',
      'Strong Adhesion & Compressive Strength',
      'Non-Flammable & Heavy-Metal Free',
    ],
    packSizes: ['1Kg', '5Kg', '20Kg', '40Kg'],
    image: '/paints/indigo-pp-polymer-putty-gold.webp',
  },
  {
    id: 'in-pp-polymer-putty-silver',
    name: 'Indigo Polymer Putty (Silver Series)',
    series: 'Silver',
    type: 'Putties & Fillers',
    badge: 'Smooth Workability',
    description:
      'Excellent workability paired with controlled water vapour permeability for smooth interior and exterior wall levelling.',
    features: [
      'Excellent Workability & Smooth Trowel Feel',
      'Controlled Water Vapour Permeability',
      'Fortified with RD Polymers & White Cement',
    ],
    packSizes: ['1Kg', '5Kg', '20Kg', '40Kg'],
    image: '/paints/indigo-pp-polymer-putty-silver.webp',
  },
  {
    id: 'in-pp-rustic-texture',
    name: 'Indigo Rustic Texture Finish',
    series: 'Gold',
    type: 'Putties & Fillers',
    badge: 'Weather Resistant Texture',
    description:
      'Direct application ease, and resistance to sunlight and rainfall, easy application, guarantees long-lasting durability.',
    features: [
      'Resistant to Sunlight & Rainfall',
      'Direct & Easy Trowel Application',
      'Long-Lasting Exterior & Interior Texture',
    ],
    packSizes: ['5Kg', '25Kg', '30Kg'],
    image: '/paints/indigo-pp-rustic-texture.webp',
  },
  {
    id: 'in-pp-acrylic-wall-putty',
    name: 'Indigo Acrylic Wall Putty',
    series: 'Gold',
    type: 'Putties & Fillers',
    badge: 'Extra-Smooth Finish',
    description:
      'Extra-smooth finish boasts excellent adhesion strength to both wall and paint and ensures fast drying.',
    features: [
      'Extra-Smooth Ready-to-Use Acrylic Paste',
      'Excellent Adhesion to Wall & Topcoat',
      'Fast Drying for Quicker Painting',
    ],
    packSizes: ['1Kg', '5Kg', '10Kg', '20Kg'],
    image: '/paints/indigo-pp-acrylic-wall-putty.webp',
  },
  {
    id: 'in-pp-stain-block-primer',
    name: 'Indigo Stain Block Primer',
    series: 'Platinum',
    type: 'Wall Primers',
    badge: 'Stain Migration Blocker',
    description:
      'Outstanding stain hiding, prevents stain migration through the paint film, and effectively seals powdery surfaces like limewash and distemper.',
    features: [
      'Outstanding Stain Hiding & Migration Block',
      'Seals Powdery Limewash & Distemper Surfaces',
      'High-Performance Platinum Undercoat',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pp-stain-block-primer.webp',
  },
  {
    id: 'in-pp-water-thinnable-sealer-primer',
    name: 'Indigo Water Thinnable Sealer Primer',
    series: 'Platinum',
    type: 'Wall Primers',
    badge: '5 Year Warranty',
    description:
      'Exceptional sealing properties, extra whiteness, and opacity with excellent brushability, and resistance to dampness, suitable for both exterior and interior applications.',
    features: [
      'Exceptional Sealing & Dampness Resistance',
      'Extra Whiteness, Opacity & Brushability',
      '5 Year Waterproofing Warranty',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pp-water-thinnable-sealer-primer.png',
  },
  {
    id: 'in-pp-exterior-wall-primer',
    name: 'Indigo Exterior Wall Primer',
    series: 'Gold',
    type: 'Wall Primers',
    badge: 'Moisture & Alkali Resistant',
    description:
      'High opacity and whiteness, along with resistance to moisture and alkali, making it ideal for both exterior and interior applications.',
    features: [
      'High Opacity & Whiteness',
      'Resistant to Moisture & Wall Alkali',
      'Suitable for Exterior & Interior Masonry',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pp-exterior-wall-primer.webp',
  },
  {
    id: 'in-pp-wtcp-gold',
    name: 'Indigo Water Thinnable Cement Primer (Gold)',
    series: 'Gold',
    type: 'Wall Primers',
    badge: 'Expansive Coverage',
    description:
      'High opacity and whiteness with expansive area coverage, making it perfect for both exterior and interior applications.',
    features: [
      'High Opacity & Bright Whiteness',
      'Expansive Area Coverage',
      'Exterior & Interior Masonry Ready',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pp-wtcp-gold.webp',
  },
  {
    id: 'in-pp-wtcp-silver',
    name: 'Indigo Water Thinnable Cement Primer (Silver)',
    series: 'Silver',
    type: 'Wall Primers',
    badge: 'Value for Money',
    description:
      'High opacity and whiteness, extensive area coverage, and exceptional value for money.',
    features: [
      'High Opacity & Whiteness',
      'Extensive Area Coverage',
      'For Interior & Exterior Applications',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pp-wtcp-silver.webp',
  },
  {
    id: 'in-pp-wtcp-bronze',
    name: 'Indigo Water Thinnable Cement Primer (Bronze)',
    series: 'Bronze',
    type: 'Wall Primers',
    badge: 'Economical Primer',
    description:
      'High opacity and whiteness with expansive area coverage for budget-friendly masonry priming.',
    features: [
      'High Opacity & Whiteness',
      'Expansive Area Coverage',
      'Economical Bronze Series Primer',
    ],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pp-wtcp-bronze.webp',
  },
  {
    id: 'in-pp-knifing-paste-filler',
    name: 'Indigo Knifing Paste Filler',
    series: 'Silver',
    type: 'Putties & Fillers',
    badge: 'Wood & Metal Leveller',
    description:
      'Ideal for levelling metal and wooden surfaces, both indoors and out, easy-to-apply and excels in filling properties.',
    features: [
      'Levels Metal & Wooden Surfaces',
      'Excels in Dent & Grain Filling',
      'Easy Putty-Knife Application',
    ],
    packSizes: ['500ml', '1L', '4L'],
    image: '/paints/indigo-pp-knifing-paste-filler.webp',
  },
  {
    id: 'in-pp-single-pack-epoxy-primer',
    name: 'Indigo Single Pack Epoxy Primer',
    series: 'Platinum',
    type: 'Wood & Metal Primers',
    badge: 'Modified Epoxy Resin',
    description:
      'Easy to use, dries quickly, provides best-in-class hiding and coverage, boasts good alkali resistance, and features a modified epoxy resin for enhanced adhesion.',
    features: [
      'Modified Epoxy Resin for Enhanced Adhesion',
      'Quick Drying & Best-in-Class Hiding',
      'Good Alkali & Corrosion Resistance',
    ],
    packSizes: ['500ml', '1L', '4L', '20L'],
    image: '/paints/indigo-pp-single-pack-epoxy-primer.webp',
  },
  {
    id: 'in-pp-universal-primer',
    name: 'Indigo Universal Primer',
    series: 'Gold',
    type: 'Wood & Metal Primers',
    badge: 'Multi-Substrate Undercoat',
    description:
      'A high-quality undercoat based on solvent-borne synthetic resin with superior adhesion properties for any substrate.',
    features: [
      'Solvent-Borne Synthetic Resin Undercoat',
      'Superior Adhesion on Any Substrate',
      'Smooth Base for Enamel Topcoats',
    ],
    packSizes: ['500ml', '1L', '4L', '20L'],
    image: '/paints/indigo-pp-universal-primer.webp',
  },
  {
    id: 'in-pp-redoxide-metal-primer-gold',
    name: 'Indigo Redoxide Metal Primer (Gold)',
    series: 'Gold',
    type: 'Wood & Metal Primers',
    badge: 'Alkyd Anti-Rust',
    description:
      'An alkyd-based, value-for-money option with excellent opacity and adhesion, ideal for areas with medium to moderate exposure.',
    features: [
      'Alkyd-Based Anti-Corrosive Metal Primer',
      'Excellent Opacity & Metal Adhesion',
      'Ideal for Medium to Moderate Exposure',
    ],
    packSizes: ['500ml', '1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pp-redoxide-metal-primer-gold.webp',
  },
  {
    id: 'in-pp-st-wood-primer',
    name: 'Indigo ST Wood Primer',
    series: 'Gold',
    type: 'Wood & Metal Primers',
    badge: 'Solvent-Thinnable Wood',
    description:
      'Easy-to-use, dries quickly, offers best-in-class hiding and coverage, has good alkali resistance, features a modified epoxy resin for enhanced adhesion, and contains unique anti-corrosive pigments.',
    features: [
      'Quick Drying with Best-in-Class Hiding',
      'Modified Resin for Strong Timber Adhesion',
      'Seals Wood Grains Before Enamel Coat',
    ],
    packSizes: ['500ml', '1L', '4L', '10L', '20L'],
    image: '/paints/indigo-pp-st-wood-primer.webp',
  },
  {
    id: 'in-pp-zinc-chromate-primer',
    name: 'Indigo Zinc Chromate Primer',
    series: 'Gold',
    type: 'Wood & Metal Primers',
    badge: 'Anti-Corrosive Metal',
    description:
      'Effective anti-corrosive protection for metal surfaces in mild to moderate environments provides good opacity and excellent adhesion.',
    features: [
      'Effective Anti-Corrosive Metal Protection',
      'Good Opacity & Strong Substrate Adhesion',
      'Suitable for Mild to Moderate Environments',
    ],
    packSizes: ['500ml', '1L', '4L', '20L'],
    image: '/paints/indigo-pp-zinc-chromate-primer.webp',
  },
  {
    id: 'in-pp-red-oxide-metal-primer-silver',
    name: 'Indigo Red Oxide Metal Primer (Silver)',
    series: 'Silver',
    type: 'Wood & Metal Primers',
    badge: 'Economy Metal Primer',
    description:
      'An alkyd based metal primer used as an undercoat for ferrous metal surfaces.',
    features: [
      'Alkyd-Based Metal Undercoat',
      'Smooth Application & Good Coverage',
      'Economical Silver Series Protection',
    ],
    packSizes: ['500ml', '1L', '4L', '20L'],
    image: '/paints/indigo-pp-red-oxide-metal-primer-silver.webp',
  },
  {
    id: 'in-pp-st-universal-primer',
    name: 'Indigo ST Universal Primer',
    series: 'Silver',
    type: 'Wood & Metal Primers',
    badge: 'Metal & Multi-Surface',
    description:
      'A solvent borne synthetic resin based undercoat suitable for metal and general priming.',
    features: [
      'Solvent-Borne Synthetic Resin Formula',
      'Suitable for Metal & General Substrates',
      'Reliable Silver Series Undercoat',
    ],
    packSizes: ['500ml', '1L', '4L', '20L'],
    image: '/paints/indigo-pp-st-universal-primer.webp',
  },
];

export default function IndigoPuttiesPrimersPage() {
  const navigate = useNavigate();
  const { openWhatsApp } = useShop();

  const [selectedSeries, setSelectedSeries] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailProduct, setDetailProduct] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const filteredProducts = useMemo(() => {
    return INDIGO_PUTTIES_PRIMERS.filter((p) => {
      if (selectedSeries !== 'All' && p.series !== selectedSeries) return false;
      if (selectedType !== 'All' && p.type !== selectedType) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.description.toLowerCase().includes(q) &&
          !p.type.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [selectedSeries, selectedType, searchQuery]);

  const clearFilters = () => {
    setSelectedSeries('All');
    setSelectedType('All');
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
              Indigo Paints • Surface Preparation
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '0.75rem' }}>
            Indigo Putties &amp; Primers
          </h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Enhanced surface preparation for superior finish and longevity — spanning Polymer Putties, Acrylic Putty, Rustic Texture, Water-Thinnable Primers, and Wood &amp; Metal Undercoats.
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
              <span>Filter Putties &amp; Primers</span>
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
                  placeholder="Search Putty, Primer, Epoxy..."
                  className="form-control"
                  style={{ height: '40px', paddingRight: '2.4rem', borderRadius: '999px', fontSize: '0.88rem' }}
                />
                <Search
                  size={16}
                  color="#4A5E73"
                  style={{ position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>

              {(selectedSeries !== 'All' || selectedType !== 'All' || searchQuery) && (
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginRight: '4px' }}>
              TYPE:
            </span>
            {['All', 'Putties & Fillers', 'Wall Primers', 'Wood & Metal Primers'].map((type) => (
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
                    onError={(e) => handleImageError(e, 'Putty')}
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
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    {product.badge}
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
                  Indigo • {detailProduct.series} Series • {detailProduct.type}
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
