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

const INDIGO_WOODCARE_PRODUCTS = [
  {
    id: 'in-wc-ultra-pu',
    name: 'Indigo Ultra PU',
    range: 'Ultra PU',
    finish: 'Two Pack Clear PU • Polyshield',
    description:
      'Based on the Polyshield system, Indigo Ultra PU Two Pack Clear PU System enhances the natural grain and character of wood while adding a layer of durable protection.',
    features: [
      'Signature Italian Finish (Polyshield System)',
      'Enhances Natural Wood Grain & Character',
      'Interior & Exterior Wood Care',
    ],
    packSizes: ['1L', '4L', '20L'],
    image: '/paints/indigo-wc-ultra-pu.png',
  },
  {
    id: 'in-wc-ultra-pu-pigmented',
    name: 'Indigo Ultra PU Pigmented',
    range: 'Ultra PU',
    finish: 'Pigmented Polyshield PU',
    description:
      'Ultra PU Pigmented Finishes, based on the Polyshield system, give you the freedom to transform wood and engineered wood surfaces with rich, uniform colour and a premium finish.',
    features: [
      'Signature Italian Pigmented Wood Care',
      'Rich, Uniform Opaque Colour Finish',
      'For Wood & Engineered Wood Surfaces',
    ],
    packSizes: ['1L', '4L', '20L'],
    image: '/paints/indigo-wc-ultra-pu-pigmented.png',
  },
  {
    id: 'in-wc-premia-pu-exterior',
    name: 'Indigo Premia PU Exterior',
    range: 'Premia PU',
    finish: 'Clear Exterior PU • UVA + HALS',
    description:
      'Exterior wood must withstand sun, rain and changing weather, season after season. Indigo Premia PU Exterior Clear combines premium PU clarity with advanced UVA + HALS protection to help preserve the natural beauty of doors, windows and outdoor joinery, without yellowing over time.',
    features: [
      'Advanced UVA + HALS Weather Protection',
      'Non-Yellowing Clarity for Outdoor Joinery',
      'Polyshield System Exterior Wood Care',
    ],
    packSizes: ['1L', '4L', '20L'],
    image: '/paints/indigo-wc-premia-exterior.png',
  },
  {
    id: 'in-wc-premia-pu-interior',
    name: 'Indigo Premia PU Interior',
    range: 'Premia PU',
    finish: 'Clear Interior PU • Polyshield',
    description:
      'Indigo Premia PU Interior Clear gives furniture and joinery a finish that is as resilient as it is refined. It enhances the natural grain of wood while providing lasting protection against everyday wear, stains and household chemicals.',
    features: [
      'Enhances Natural Grain of Interior Furniture',
      'Resistant to Everyday Wear & Stains',
      'Protection Against Household Chemicals',
    ],
    packSizes: ['1L', '4L', '20L'],
    image: '/paints/indigo-wc-premia-interior.png',
  },
  {
    id: 'in-wc-premia-pu-interior-pigmented',
    name: 'Indigo Premia PU Interior Pigmented',
    range: 'Premia PU',
    finish: 'Opaque Pigmented PU',
    description:
      'Premia PU Interior Pigmented brings the protection of the Polyshield System together with a rich, opaque finish. Ideal for kitchen cabinets, children’s furniture and statement pieces, it gives interiors the freedom to express their personality while standing up to everyday life.',
    features: [
      'Rich Opaque Polyshield Finish',
      'Ideal for Kitchen Cabinets & Furniture',
      'Tough Resistance to Everyday Interior Wear',
    ],
    packSizes: ['1L', '4L', '20L'],
    image: '/paints/indigo-wc-premia-interior-pigmented.png',
  },
  {
    id: 'in-wc-sleek-1k-interior-pu',
    name: 'Indigo Sleek Single Pack Interior PU',
    range: 'Sleek',
    finish: '1K Clear Interior PU',
    description:
      'Delivers a rich finish with a smooth feel while providing protection against water and household chemicals.',
    features: [
      'Easy Single Pack Application',
      'Rich Finish with Smooth Tactile Feel',
      'Resists Water & Household Chemicals',
    ],
    packSizes: ['500ml', '1L', '4L', '20L'],
    image: '/paints/indigo-wc-sleek-1k-interior-pu.webp',
  },
  {
    id: 'in-wc-sleek-1k-exterior-pu',
    name: 'Indigo Sleek Single Pack Exterior PU',
    range: 'Sleek',
    finish: '1K Clear Exterior PU (Sleek XT)',
    description:
      'Fortified with UV filters, this product repels water and is easy to use on outdoor wooden doors and windows.',
    features: [
      'Fortified with UV Filters for Exteriors',
      'Water-Repellent Protective Film',
      'Easy Single Pack Brush/Spray Use',
    ],
    packSizes: ['500ml', '1L', '4L', '20L'],
    image: '/paints/indigo-wc-sleek-1k-exterior-pu.webp',
  },
  {
    id: 'in-wc-sleek-2k-exterior-pu',
    name: 'Indigo Sleek Two Pack Exterior PU',
    range: 'Sleek',
    finish: 'Glossy / Matt / Silk-Matt 2K PU',
    description:
      'Aliphatic isocyanate-cured for UV-resistant, non-yellowing finish in glossy, matt, and silk-matt options.',
    features: [
      'Aliphatic Isocyanate-Cured 2K System',
      'UV-Resistant & Non-Yellowing Exterior Film',
      'Available in Glossy, Matt & Silk-Matt',
    ],
    packSizes: ['1L', '4L', '20L'],
    image: '/paints/indigo-wc-sleek-2k-exterior-pu.webp',
  },
  {
    id: 'in-wc-sleek-melamine',
    name: 'Indigo Sleek Melamine',
    range: 'Sleek',
    finish: 'Two Pack Hi-Solid Melamine',
    description:
      'Quick-drying, scratch-resistant protection in gloss, silk matt & matt finishes for interior wood furniture.',
    features: [
      'Two Pack Hi-Solid Melamine Formula',
      'Quick-Drying & Scratch-Resistant',
      'Gloss, Silk Matt & Matt Finishes',
    ],
    packSizes: ['1L', '4L', '20L'],
    image: '/paints/indigo-wc-sleek-melamine.webp',
  },
  {
    id: 'in-wc-sleek-2k-interior-pu',
    name: 'Indigo Sleek Two Pack Interior PU',
    range: 'Sleek',
    finish: 'Quick-Drying 2K Interior PU',
    description:
      'Quick-drying, high-solid formulation ensures better wood grain filling and enhanced durability.',
    features: [
      'Quick-Drying High-Solid 2K Formulation',
      'Better Wood Grain Filling',
      'Enhanced Interior Furniture Durability',
    ],
    packSizes: ['1L', '4L', '20L'],
    image: '/paints/indigo-wc-sleek-2k-interior-pu.webp',
  },
  {
    id: 'in-wc-sleek-sanding-sealer',
    name: 'Indigo Sleek Sanding Sealer',
    range: 'Sleek',
    finish: 'Single Pack Nitrocellulose',
    description:
      'Quick drying with enhanced clarity for sealing wood pores prior to applying topcoats.',
    features: [
      'Single Pack Nitrocellulose Sealer',
      'Quick Drying & Easy Sandability',
      'Enhanced Clarity for Natural Wood',
    ],
    packSizes: ['500ml', '1L', '4L', '20L'],
    image: '/paints/indigo-wc-sleek-sanding-sealer.webp',
  },
  {
    id: 'in-wc-sleek-thinner',
    name: 'Indigo Sleek Wood Polish Thinner',
    range: 'Sleek',
    finish: 'Flow & Levelling Thinner',
    description:
      'Enhances flow and levelling of the topcoat for a uniform, blemish-free wood polish finish.',
    features: [
      'Enhances Topcoat Flow & Levelling',
      'Formulated for Sleek Wood Care Systems',
      'Prevents Blushing & Brush Marks',
    ],
    packSizes: ['500ml', '1L', '5L'],
    image: '/paints/indigo-wc-sleek-thinner.webp',
  },
  {
    id: 'in-wc-sleek-base',
    name: 'Indigo Sleek Base',
    range: 'Sleek',
    finish: 'Clear & 14 Natural Wood Shades',
    description:
      'Shields wood from UV damage, resists discolouration and fungal attack, comes in clear and 14 natural wood shades.',
    features: [
      'Shields Wood from UV Damage',
      'Resists Discolouration & Fungal Attack',
      'Available in Clear & 14 Natural Shades',
    ],
    packSizes: ['500ml', '1L', '4L'],
    image: '/paints/indigo-wc-sleek-base.webp',
  },
  {
    id: 'in-wc-anti-termite',
    name: 'Indigo Anti Termite Solution',
    range: 'Sleek',
    finish: 'Pre & Post-Treatment Preservative',
    description:
      'Acts as both pre and post-treatment wood preservative; kills termites on contact; eco-friendly and compatible with oil-based primers and paints.',
    features: [
      'Kills Termites on Contact • Ready to Use',
      'Pre & Post-Treatment Wood Preservative',
      'Compatible with Oil-Based Primers & Paints',
    ],
    packSizes: ['500ml', '1L', '5L'],
    image: '/paints/indigo-wc-anti-termite.webp',
  },
  {
    id: 'in-wc-wood-stain',
    name: 'Indigo Wood Stain',
    range: 'Sleek',
    finish: 'Concentrated Interior Wood Stain',
    description:
      'Easy to use, fast drying, with a high concentration for optimal results.',
    features: [
      'High-Concentration Rich Wood Tones',
      'Fast Drying & Easy Application',
      'Uniform Grain Enhancement',
    ],
    packSizes: ['100ml', '250ml', '500ml'],
    image: '/paints/indigo-wc-wood-stain.webp',
  },
];

export default function IndigoWoodcarePage() {
  const navigate = useNavigate();
  const { openWhatsApp } = useShop();

  const [selectedRange, setSelectedRange] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailProduct, setDetailProduct] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const filteredProducts = useMemo(() => {
    return INDIGO_WOODCARE_PRODUCTS.filter((p) => {
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
              Indigo Paints • Ultra PU • Premia PU • Sleek
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '0.75rem' }}>
            Indigo Woodcare Range
          </h1>
          <p style={{ maxWidth: '660px', margin: '0 auto', color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Indigo Paint’s wood finish coats shield your premium furniture, doors, and outdoor joinery — from Signature Italian Ultra PU and Premia PU to the complete Sleek Wood Care System.
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
              <span>Filter Woodcare Range</span>
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
                  placeholder="Search Ultra PU, Melamine, Stain..."
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
            {['All', 'Ultra PU', 'Premia PU', 'Sleek'].map((range) => (
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
                {range === 'All' ? 'All Woodcare' : range}
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
                  Indigo • {detailProduct.range} • {detailProduct.finish}
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
