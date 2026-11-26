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

const BIRLA_INTERIOR_PAINTS = [
  // ONE (LUXURY)
  {
    id: 'bo-one-pure-elegance',
    name: 'Birla Opus One Pure Elegance',
    range: 'One (Luxury)',
    finish: 'Silky Smooth Sheen',
    warranty: '9 Years Warranty',
    description:
      'Roller-friendly, anti-bacterial luxury interior paint offering a silky smooth wall finish with scuff and furniture-mark resistance.',
    features: ['Say No to Furniture Marks', 'Anti-Bacterial & Roller-Friendly', '9 Years Performance Warranty'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-int-one-pure-elegance.png',
  },
  {
    id: 'bo-one-pure-elegance-shine',
    name: 'Birla Opus One Pure Elegance Shine',
    range: 'One (Luxury)',
    finish: 'High Sheen Reflective',
    warranty: '9 Years Warranty',
    description:
      'High-sheen luxury interior emulsion that adds a sleek, reflective finish while resisting stains and scuffs.',
    features: ['Sleek Reflective High-Sheen', 'Stain & Scuff Resistant Film', '9 Years Performance Warranty'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-int-one-pure-elegance-shine.png',
  },
  {
    id: 'bo-one-pure-elegance-matt',
    name: 'Birla Opus One Pure Elegance Matt',
    range: 'One (Luxury)',
    finish: 'Smooth Matte',
    warranty: '9 Years Warranty',
    description:
      'Luxurious interior emulsion paint with a smooth non-reflective matte finish, offering stain and scuff resistance for lasting beauty.',
    features: ['Velvety Non-Reflective Matte', 'Superior Stain & Scuff Resistance', '9 Years Performance Warranty'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-int-one-pure-elegance-matt.png',
  },
  {
    id: 'bo-one-pure-elegance-soft',
    name: 'Birla Opus One Pure Elegance Soft',
    range: 'One (Luxury)',
    finish: 'Delicate Soft Sheen',
    warranty: '9 Years Warranty',
    description:
      'Luxury interior wall paint with a smooth, delicate sheen, superior stain resistance, furniture-mark resistance, and exceptional smoothness.',
    features: ['Smooth Delicate Soft Sheen', 'Furniture-Mark & Stain Resistant', '9 Years Performance Warranty'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-int-one-pure-elegance-soft.png',
  },
  {
    id: 'bo-one-pure-legend',
    name: 'Birla Opus One Pure Legend',
    range: 'One (Luxury)',
    finish: 'Luxury Crack-Bridging',
    warranty: '11 Years Warranty',
    description:
      'No-odour, crack-bridging luxury interior paint that delivers a flawless, crack-free finish with water-beading durability.',
    features: ['Crack-Bridging & Water Beading', 'No-Odour Luxury Formula', '11 Years Performance Warranty'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-int-one-pure-legend.png',
  },
  {
    id: 'bo-one-alpha-pure-elegance',
    name: 'Birla Opus One Alpha Pure Elegance',
    range: 'One (Luxury)',
    finish: 'Luxury Interior Emulsion',
    warranty: 'Luxury Series',
    description:
      'Advanced luxury interior emulsion formulated for rich colour depth, high washability, and enduring elegance.',
    features: ['Rich Colour Depth & Clarity', 'Superior Washability & Finish', '2,300+ Tintable Shades'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-int-alpha-pure-elegance.png',
  },
  {
    id: 'bo-one-pro-smooth-primer',
    name: 'Birla Opus One Pro Smooth Primer',
    range: 'One (Luxury)',
    finish: 'Water-Thinnable Luxury Primer',
    warranty: 'Salt-Proof Base',
    description:
      'Water-thinnable luxury interior primer that delivers salt-proof protection and creates a smooth base for superior topcoat adhesion.',
    features: ['Salt-Proof Wall Protection', 'Superior Smoothness & Adhesion', 'Water-Thinnable Low-Odour Base'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-int-one-pro-smooth-primer.png',
  },
  {
    id: 'bo-one-pro-smooth-putty',
    name: 'Birla Opus One Pro Smooth Putty',
    range: 'One (Luxury)',
    finish: 'Luxury Acrylic Putty',
    warranty: 'Smooth Levelling',
    description:
      'High-performance acrylic putty that creates a smooth, even surface for a flawless, long-lasting luxury paint finish.',
    features: ['Extra-Smooth Acrylic Levelling', 'Enhances Topcoat Coverage', 'Strong Wall Bonding'],
    packSizes: ['1Kg', '5Kg', '10Kg', '20Kg'],
    image: '/paints/birla-int-one-pro-smooth-putty.png',
  },
  {
    id: 'bo-one-pro-putty-primer',
    name: 'Birla Opus One Pro Putty+Primer',
    range: 'One (Luxury)',
    finish: '2-in-1 Putty & Primer',
    warranty: 'Dual Prep System',
    description:
      'Dual-action acrylic putty + primer that preps interior walls for a smooth, even finish and superior paint adhesion in fewer steps.',
    features: ['2-in-1 Putty + Primer Formula', 'Saves Time & Labour', 'Excellent Topcoat Adhesion'],
    packSizes: ['1Kg', '5Kg', '10Kg', '20Kg'],
    image: '/paints/birla-int-one-pro-putty-primer.png',
  },

  // CALISTA (PREMIUM)
  {
    id: 'bo-calista-ever-clear',
    name: 'Birla Opus Calista Ever Clear',
    range: 'Calista (Premium)',
    finish: 'Smooth Opaque Sheen',
    warranty: '6 Years Warranty',
    description:
      'Washable, opaque premium paint with a smooth finish whose cleanable formula ensures lasting beauty and easy maintenance.',
    features: ['Washable & Opaque Coverage', 'Easy Stain Cleanability', '6 Years Performance Warranty'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-int-calista-ever-clear.png',
  },
  {
    id: 'bo-calista-ever-clear-matt',
    name: 'Birla Opus Calista Ever Clear Matt',
    range: 'Calista (Premium)',
    finish: 'Durable Washable Matte',
    warranty: '6 Years Warranty',
    description:
      'Delivers a durable, washable matte finish with anti-fungal, anti-bacterial, stain, and spatter resistance.',
    features: ['Anti-Fungal & Anti-Bacterial', 'Stain & Spatter Resistant', 'Durable Washable Matte'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-int-calista-ever-clear-matt.png',
  },
  {
    id: 'bo-calista-ever-stay',
    name: 'Birla Opus Calista Ever Stay',
    range: 'Calista (Premium)',
    finish: 'Peel-Guard Matte',
    warranty: '4 Years Warranty',
    description:
      'Premium interior emulsion with anti-fungal properties and Peel Guard to keep walls fresh longer.',
    features: ['Peel Guard Film Technology', 'Anti-Fungal Protection', '4 Years Performance Warranty'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-int-calista-ever-stay.png',
  },
  {
    id: 'bo-calista-ever-wash',
    name: 'Birla Opus Calista Ever Wash',
    range: 'Calista (Premium)',
    finish: 'Bright Washable Matte',
    warranty: '5,000+ Washes',
    description:
      'Matt washable interior paint with a bright finish engineered for easy cleaning (5,000+ washes) and long-lasting elegance.',
    features: ['5,000+ Washes Durability', 'Anti-Fungal & Anti-Bacterial', 'Bright Smooth Matte Finish'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-int-calista-ever-wash.png',
  },
  {
    id: 'bo-calista-ever-wash-shine',
    name: 'Birla Opus Calista Ever Wash Shine',
    range: 'Calista (Premium)',
    finish: 'Soft Sheen Washable',
    warranty: '5 Years Warranty',
    description:
      'Washable soft-sheen interior paint delivering a long-lasting, stain-resistant finish ideal for busy homes.',
    features: ['Removes 99+ Household Stains', 'Long-Lasting Soft Sheen', '5 Years Performance Warranty'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-int-calista-ever-wash-shine.png',
  },
  {
    id: 'bo-calista-alpha-ever-wash',
    name: 'Birla Opus Calista Alpha Ever Wash',
    range: 'Calista (Premium)',
    finish: 'Washable Interior Emulsion',
    warranty: 'Premium Series',
    description:
      'Alpha variant of Calista Ever Wash offering dependable stain resistance and easy wipeability for everyday interiors.',
    features: ['Easy Wipe Cleanability', 'High Opacity & Smoothness', 'Anti-Fungal Protection'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-int-alpha-ever-wash.png',
  },
  {
    id: 'bo-calista-pro-white-primer',
    name: 'Birla Opus Calista Pro White Primer',
    range: 'Calista (Premium)',
    finish: 'Water-Thinnable Premium Primer',
    warranty: 'High-Whiteness Base',
    description:
      'Creates a smooth, bright white base for interior walls with excellent adhesion and topcoat holdout.',
    features: ['Extra Whiteness & Opacity', 'Strong Masonry Adhesion', 'Improves Topcoat Finish'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-int-calista-pro-white-primer.png',
  },

  // STYLE (ECONOMY)
  {
    id: 'bo-style-color-smart',
    name: 'Birla Opus Style Color Smart',
    range: 'Style (Economy)',
    finish: 'Smooth Matte Emulsion',
    warranty: '15% Higher Coverage',
    description:
      'Washable economy emulsion paint with mildew and mold-resistant properties, ensuring clean and protected interior walls.',
    features: ['15% Higher Coverage per Coat', 'Mildew & Mold Resistant', 'Smooth Matte Economy Finish'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-int-style-color-smart.png',
  },
  {
    id: 'bo-style-color-smart-shine',
    name: 'Birla Opus Style Color Smart Shine',
    range: 'Style (Economy)',
    finish: 'Soft Sheen Emulsion',
    warranty: '1,800+ Shades',
    description:
      'Long-lasting, low-odour economy emulsion with a soft sheen finish for stylish, durable interiors.',
    features: ['Soft Sheen & Low Odour', 'Good Washability', 'Available in 1,800+ Shades'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-int-style-color-smart-shine.png',
  },
  {
    id: 'bo-style-alpha-color-smart',
    name: 'Birla Opus Style Alpha Color Smart',
    range: 'Style (Economy)',
    finish: 'Economy Matte Emulsion',
    warranty: '2 Years Anti-Fungal',
    description:
      'Value-driven interior emulsion with anti-fungal protection, superior coverage, and reliable everyday durability.',
    features: ['Anti-Fungal Wall Protection', 'Superior Economy Coverage', 'Easy Roller & Brush Application'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-int-style-alpha-color-smart.png',
  },
  {
    id: 'bo-style-color-fresh',
    name: 'Birla Opus Style Color Fresh',
    range: 'Style (Economy)',
    finish: 'Fresh Matte Emulsion',
    warranty: 'Economy Series',
    description:
      'Budget-friendly interior emulsion offering vibrant, stylish shades with anti-flaking and anti-chalking resistance.',
    features: ['Resists Flaking & Chalking', 'Vibrant Budget-Friendly Shades', 'Low Odour Formula'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-int-style-color-fresh.png',
  },
  {
    id: 'bo-style-color-fresh-shine',
    name: 'Birla Opus Style Color Fresh Shine',
    range: 'Style (Economy)',
    finish: 'Soft Sheen Economy',
    warranty: 'Economy Series',
    description:
      'Economical soft-sheen interior emulsion delivering a bright, fresh glow across living rooms and bedrooms.',
    features: ['Bright Soft-Sheen Glow', 'Resists Flaking & Chalking', 'Smooth Even Application'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-int-color-fresh-shine.png',
  },
  {
    id: 'bo-style-super-bright',
    name: 'Birla Opus Style Super Bright',
    range: 'Style (Economy)',
    finish: 'Acrylic Distemper',
    warranty: '6 Months Warranty',
    description:
      'Premium acrylic distemper providing superior whiteness, high hiding, and a smooth, bright finish for economical interiors.',
    features: ['Superior Whiteness & Hiding', 'Smooth Bright Distemper Finish', '6 Months Warranty'],
    packSizes: ['1Kg', '2Kg', '5Kg', '10Kg', '20Kg'],
    image: '/paints/birla-int-style-super-bright.png',
  },
  {
    id: 'bo-style-super-smooth',
    name: 'Birla Opus Style Super Smooth',
    range: 'Style (Economy)',
    finish: 'Water-Resistant Distemper',
    warranty: 'Economy Distemper',
    description:
      'Water-resistant acrylic distemper with a smooth matte finish ensuring clean durability and elegant interiors.',
    features: ['Water-Resistant Acrylic Distemper', 'Smooth Matte Appearance', 'Economical Wall Finish'],
    packSizes: ['1Kg', '2Kg', '5Kg', '10Kg', '20Kg'],
    image: '/paints/birla-int-style-super-smooth.png',
  },
  {
    id: 'bo-style-pro-hide-primer',
    name: 'Birla Opus Style Pro Hide Primer',
    range: 'Style (Economy)',
    finish: 'Water-Thinnable Primer',
    warranty: 'High Hiding Base',
    description:
      'Low-odour water-thinnable interior primer offering high hiding and coverage for a uniform surface before topcoating.',
    features: ['High Hiding & Opacity', 'Low Odour Water-Thinnable Base', 'Improves Topcoat Coverage'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-int-style-pro-hide-primer.png',
  },
  {
    id: 'bo-style-pro-fresh-primer',
    name: 'Birla Opus Style Pro Fresh Primer',
    range: 'Style (Economy)',
    finish: 'Water-Thinnable Primer',
    warranty: 'Economy Primer',
    description:
      'Economical water-thinnable interior wall primer designed for strong masonry adhesion and smooth topcoat finish.',
    features: ['Economical Interior Primer', 'Strong Masonry Adhesion', 'Easy Brush & Roller Flow'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-int-style-pro-fresh-primer.png',
  },
  {
    id: 'bo-style-universal-stainers',
    name: 'Birla Opus Style Universal Stainer',
    range: 'Style (Economy)',
    finish: 'Concentrated Tinter',
    warranty: 'Universal Tinting',
    description:
      'High-strength universal colourant for custom tinting interior and exterior water-based and solvent-based paints.',
    features: ['High Tinting Strength', 'Compatible with Multiple Paint Bases', 'Vibrant Non-Fading Pigments'],
    packSizes: ['50ml', '100ml', '200ml', '500ml'],
    image: '/paints/birla-int-style-universal-stainers.png',
  },
];

export default function BirlaInteriorPage() {
  const navigate = useNavigate();
  const { openWhatsApp } = useShop();

  const [selectedRange, setSelectedRange] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailProduct, setDetailProduct] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const filteredProducts = useMemo(() => {
    return BIRLA_INTERIOR_PAINTS.filter((p) => {
      if (selectedRange !== 'All' && p.range !== selectedRange) return false;
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
  }, [selectedRange, searchQuery]);

  const clearFilters = () => {
    setSelectedRange('All');
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
              Birla Opus • One • Calista • Style
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '0.75rem' }}>
            Birla Opus Interior Wall Paints
          </h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Explore Birla Opus’s complete interior collection across One (Luxury), Calista (Premium), and Style (Economy) — available in 2,300+ shades with up to 11-year warranty.
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
              <span>Filter by Birla Opus Range</span>
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
                  placeholder="Search One, Calista, Style..."
                  className="form-control"
                  style={{ height: '40px', paddingRight: '2.4rem', borderRadius: '999px', fontSize: '0.88rem' }}
                />
                <Search
                  size={16}
                  color="#4A5E73"
                  style={{ position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>

              {(selectedRange !== 'All' || searchQuery) && (
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
            {['All', 'One (Luxury)', 'Calista (Premium)', 'Style (Economy)'].map((range) => (
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
                {range === 'All' ? 'All Ranges' : range}
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
                    openWhatsApp(`Hello G.K Traders Paints, I want to enquire about ${product.name} (${product.range}).`)
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
