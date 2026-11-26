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

const BIRLA_EXTERIOR_PAINTS = [
  // ONE (LUXURY)
  {
    id: 'bo-ext-one-true-life',
    name: 'Birla Opus One True Life',
    range: 'One (Luxury)',
    finish: 'PU-Infused All-Weather',
    warranty: '12 Years Warranty',
    description:
      'PU-infused all-weather luxury exterior paint providing durable protection with a smooth finish that resists colour fading and algae in any climate.',
    features: ['All-Weather Brilliance & UV Protection', 'Enhanced Algae & Fade Resistance', '12 Years Performance Warranty'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-ext-one-true-life.png',
  },
  {
    id: 'bo-ext-one-true-look',
    name: 'Birla Opus One True Look',
    range: 'One (Luxury)',
    finish: 'PU Exterior + Structural Strength',
    warranty: 'Dust & Algal Shield',
    description:
      'Combines the durability of exterior PU paint with enhanced structural strength, providing superior dust and algal resistance.',
    features: ['Superior Dust & Algal Resistance', 'Strong Paint Film Integrity', 'PU-Infused Exterior Durability'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-ext-one-true-look.png',
  },
  {
    id: 'bo-ext-one-true-flex',
    name: 'Birla Opus One True Flex',
    range: 'One (Luxury)',
    finish: 'Elastomeric Crack-Proof',
    warranty: '9 Years Warranty',
    description:
      'Elastomeric exterior paint offering crack-proof, algae-resistant, and peeling-proof protection with colour-fading resistance.',
    features: ['Hides Cracks & Showcase Beauty', 'Algae, Dust & Fade Resistant', '9 Years Performance Warranty'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-ext-one-true-flex.png',
  },
  {
    id: 'bo-ext-one-true-vision',
    name: 'Birla Opus One True Vision',
    range: 'One (Luxury)',
    finish: 'UV & Anti-Carbonation',
    warranty: 'Crack-Concealing',
    description:
      'UV-resistant, crack-concealing, and anti-carbonation exterior paint that protects concrete and enhances facade longevity.',
    features: ['UV-Resistant & Anti-Carbonation', 'Crack-Concealing Exterior Film', 'Timeless Architectural Elegance'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-ext-one-true-vision.png',
  },
  {
    id: 'bo-ext-one-explore-15',
    name: 'Birla Opus One Explore 15',
    range: 'One (Luxury)',
    finish: 'Tough Film Scratch Finish',
    warranty: 'High-Strength Texture',
    description:
      'Sharp-design tough film paint providing a durable scratch texture finish and enhanced structural strength for exterior facades.',
    features: ['Durable Architectural Scratch Finish', 'Enhanced Structural Film Strength', 'Long-Lasting Weather Shield'],
    packSizes: ['5Kg', '25Kg'],
    image: '/paints/birla-ext-one-explore-15.png',
  },
  {
    id: 'bo-ext-one-explore-roller',
    name: 'Birla Opus One Explore Roller',
    range: 'One (Luxury)',
    finish: 'Textured Roller Finish',
    warranty: 'Designer Exterior Texture',
    description:
      'Textured roller-finish exterior paint creating dimensional effects on outer walls with smooth application and high durability.',
    features: ['Designer Textured Roller Finish', 'Smooth Application & High Build', 'Weather-Resistant Exterior Film'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-ext-one-explore-roller.png',
  },
  {
    id: 'bo-ext-one-inspire-concrete',
    name: 'Birla Opus One Inspire Concrete',
    range: 'One (Luxury)',
    finish: 'White Concrete Finish',
    warranty: 'Blister-Proof',
    description:
      'Strong film architectural paint with a white concrete finish, providing blister-proof exterior wall protection.',
    features: ['Authentic White Concrete Look', 'Blister-Proof Exterior Film', 'Long-Lasting Facade Protection'],
    packSizes: ['5Kg', '20Kg'],
    image: '/paints/birla-ext-one-inspire-concrete.png',
  },
  {
    id: 'bo-ext-one-inspire-clear-coat',
    name: 'Birla Opus One Inspire Clear Coat',
    range: 'One (Luxury)',
    finish: 'Protective Clear Topcoat',
    warranty: 'Texture Sealer',
    description:
      'Protective exterior clear topcoat formulated to seal and safeguard textured facades against dust, rain, and UV exposure.',
    features: ['Seals Exterior Textures & Finishes', 'UV & Rain Protective Barrier', 'Low Dirt Pickup'],
    packSizes: ['1L', '4L', '10L'],
    image: '/paints/birla-ext-one-inspire-clear-coat.png',
  },

  // CALISTA (PREMIUM)
  {
    id: 'bo-ext-calista-neo-star',
    name: 'Birla Opus Calista Neo Star',
    range: 'Calista (Premium)',
    finish: 'Low-Porosity Anti-Carbonation',
    warranty: '7 Years Warranty',
    description:
      'Creates an extra-strong, low-porosity film that resists water absorption, dust, algae, and carbonation for lasting exterior strength.',
    features: ['Superior Dust & Algae Resistance', 'Extra-Strong Low-Porosity Film', '7 Years Performance Warranty'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-ext-calista-neo-star.png',
  },
  {
    id: 'bo-ext-calista-neo-star-shine',
    name: 'Birla Opus Calista Neo Star Shine',
    range: 'Calista (Premium)',
    finish: 'High-Sheen Dust-Resistant',
    warranty: '7 Years Warranty',
    description:
      'Provides a durable, algae-proof and dust-resistant high-sheen finish for exterior walls with a clean, polished look.',
    features: ['Algae-Proof & Dust-Resistant', 'Clean Polished High-Sheen', 'Long-Lasting Weather Durability'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-ext-calista-neo-star-shine.png',
  },
  {
    id: 'bo-ext-alpha-neo-star',
    name: 'Birla Opus Calista Alpha Neo Star',
    range: 'Calista (Premium)',
    finish: 'Premium Exterior Matte',
    warranty: 'Premium Series',
    description:
      'Alpha variant of Calista Neo Star delivering strong weather protection, smooth matte finish, and reliable fade resistance.',
    features: ['Weather & Fade Resistant', 'Smooth Premium Matte Finish', 'Anti-Algal Exterior Protection'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-ext-alpha-neo-star.png',
  },
  {
    id: 'bo-ext-alpha-neo-star-shine',
    name: 'Birla Opus Calista Alpha Neo Star Shine',
    range: 'Calista (Premium)',
    finish: 'Premium Exterior Sheen',
    warranty: 'Premium Series',
    description:
      'Alpha sheen variant in the Calista Neo Star exterior range combining low dirt pickup with durable exterior gloss.',
    features: ['Low Dirt Pickup Sheen', 'Durable Exterior Protection', 'Smooth Roller & Brush Flow'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-ext-alpha-neo-star-shine.png',
  },
  {
    id: 'bo-ext-calista-neo-tile-shade',
    name: 'Birla Opus Calista Neo Tile Shade',
    range: 'Calista (Premium)',
    finish: 'High-Sheen Roof Tile Paint',
    warranty: 'Robust Roof Protection',
    description:
      'High-sheen exterior roof tile coating offering attractive colours, robust durability, and strong weather resistance.',
    features: ['High-Sheen Gloss for Roof Tiles', 'Attractive Non-Fading Colours', 'Tough Weather Durability'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-ext-calista-neo-tile-shade.png',
  },
  {
    id: 'bo-ext-calista-neo-floor-shade',
    name: 'Birla Opus Calista Neo Floor Shade',
    range: 'Calista (Premium)',
    finish: 'Exterior Floor Coating',
    warranty: 'Heavy-Duty Abrasion',
    description:
      'Durable exterior floor paint engineered for driveways, walkways, and terraces with high abrasion and weather resistance.',
    features: ['High Abrasion & Foot-Traffic Resistance', 'Strong Masonry Adhesion', 'Weather & Moisture Resistant'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-ext-calista-neo-floor-shade.png',
  },
  {
    id: 'bo-ext-calista-perfect-choice-primer',
    name: 'Birla Opus Calista Perfect Choice Primer',
    range: 'Calista (Premium)',
    finish: 'Water-Thinnable Exterior Primer',
    warranty: 'Superior Adhesion',
    description:
      'Long-lasting water-thinnable exterior primer ensuring superior adhesion, alkali resistance, and a smooth base for topcoats.',
    features: ['Superior Masonry Adhesion', 'Alkali & Moisture Resistance', 'Smooth Base for Exterior Topcoats'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-ext-calista-perfect-choice-primer.png',
  },

  // STYLE (ECONOMY)
  {
    id: 'bo-ext-style-power-bright',
    name: 'Birla Opus Style Power Bright',
    range: 'Style (Economy)',
    finish: 'Peel-Proof Exterior Emulsion',
    warranty: 'Peel Protection Tech',
    description:
      'Provides excellent peel-proof protection and superior brightness for exterior walls, resisting wear while maintaining vibrant appeal.',
    features: ['Superior Brightness & Coverage', 'Superior Peel Protection Technology', 'Long-Lasting Economy Appeal'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-ext-style-power-bright.png',
  },
  {
    id: 'bo-ext-style-power-bright-shine',
    name: 'Birla Opus Style Power Bright Shine',
    range: 'Style (Economy)',
    finish: 'High-Sheen N-Bond Emulsion',
    warranty: 'N-Bond Technology',
    description:
      'Water-based high-sheen exterior paint with N Bond Technology, offering flaking resistance and long-lasting shine.',
    features: ['N-Bond Flaking-Resistant Formula', 'Long-Lasting Exterior Sheen', 'Weather-Resistant Economy Paint'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-ext-style-power-bright-shine.png',
  },
  {
    id: 'bo-ext-alpha-power-bright',
    name: 'Birla Opus Style Alpha Power Bright',
    range: 'Style (Economy)',
    finish: 'Economy Exterior Emulsion',
    warranty: 'Economy Series',
    description:
      'Alpha variant of Style Power Bright offering bright, fade-resistant exterior shades at an economical price.',
    features: ['Bright Exterior Shades', 'Good Coverage & Opacity', 'Reliable Everyday Protection'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-ext-alpha-power-bright.png',
  },
  {
    id: 'bo-ext-style-power-fit',
    name: 'Birla Opus Style Power Fit',
    range: 'Style (Economy)',
    finish: 'Crack-Hiding Economy Paint',
    warranty: 'Superior Hiding',
    description:
      'Enhances exterior walls with a bright, long-lasting finish featuring crack-hiding ability, superior whiteness, and fade resistance.',
    features: ['Superior Hiding & Whiteness', 'Crack-Hiding & Fade Resistance', 'Budget-Friendly Exterior Finish'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-ext-style-power-fit.png',
  },
  {
    id: 'bo-ext-style-perfect-start-primer',
    name: 'Birla Opus Style Perfect Start Primer',
    range: 'Style (Economy)',
    finish: 'Peel-Proof Exterior Primer',
    warranty: 'Economy Primer',
    description:
      'Peel-proof primer for exterior walls providing excellent coverage, wall brightening, and a smooth base for topcoat application.',
    features: ['Peel-Proof Exterior Undercoat', 'High Coverage & Wall Brightening', 'Smooth Topcoat Preparation'],
    packSizes: ['1L', '4L', '10L', '20L'],
    image: '/paints/birla-ext-style-perfect-start-primer.png',
  },
];

export default function BirlaExteriorPage() {
  const navigate = useNavigate();
  const { openWhatsApp } = useShop();

  const [selectedRange, setSelectedRange] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailProduct, setDetailProduct] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const filteredProducts = useMemo(() => {
    return BIRLA_EXTERIOR_PAINTS.filter((p) => {
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
            Birla Opus Exterior Wall Paints
          </h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Shield your home’s facade with Birla Opus exterior paints across One (Luxury), Calista (Premium), and Style (Economy) — backed by up to 12-year weatherproof warranties.
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
                  placeholder="Search True Life, Neo Star, Power..."
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
                    onError={(e) => handleImageError(e, 'Exterior Paints')}
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
