import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DR_FIXIT_PRODUCTS, DR_FIXIT_AREAS } from '../data/drFixitCatalog';
import { useShop } from '../context/ShopContext';
import { handleImageError } from '../utils/imageFallback';
import {
  Search,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  ShieldCheck,
  CheckCircle,
  X,
  ArrowLeft,
} from 'lucide-react';

export default function DrFixitPage() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const { openWhatsApp } = useShop();

  const activeMode = mode === 'new-construction' ? 'new-construction' : 'repair-renovate';

  const [selectedArea, setSelectedArea] = useState('');
  const [crackFillingOnly, setCrackFillingOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [leakageOpen, setLeakageOpen] = useState(true);
  const [crackOpen, setCrackOpen] = useState(true);
  const [detailProduct, setDetailProduct] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setSelectedArea('');
    setCrackFillingOnly(false);
  }, [activeMode]);

  const areaOptions = DR_FIXIT_AREAS[activeMode] || [];

  const filteredProducts = useMemo(() => {
    return DR_FIXIT_PRODUCTS.filter((p) => {
      if (!p.modes.includes(activeMode)) return false;
      if (selectedArea && !p.areas.includes(selectedArea)) return false;
      if (crackFillingOnly && !p.crackFilling) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchCode = p.code.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCode) return false;
      }
      return true;
    });
  }, [activeMode, selectedArea, crackFillingOnly, searchQuery]);

  const clearFilters = () => {
    setSelectedArea('');
    setCrackFillingOnly(false);
    setSearchQuery('');
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* 1. HERO BANNER */}
      <section
        style={{
          position: 'relative',
          background:
            'linear-gradient(rgba(1, 35, 78, 0.84), rgba(2, 81, 176, 0.78)), url("/brands/dr-fixit.jpg") center/cover no-repeat',
          color: '#FFFFFF',
          padding: '4rem 0 5.5rem',
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
              marginBottom: '1.25rem',
            }}
          >
            <ArrowLeft size={14} /> Back to Home
          </button>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF', marginBottom: '0.5rem' }}>
            {activeMode === 'repair-renovate'
              ? 'Repair & Renovate Waterproofing'
              : 'New Construction Waterproofing'}
          </h1>
          <p style={{ fontSize: '1rem', color: '#E6EDEF', maxWidth: '640px', margin: '0 auto' }}>
            {activeMode === 'repair-renovate'
              ? 'Targeted Dr. Fixit waterproofing & crack-repair solutions for existing homes, damp walls, leaking roofs, and bathrooms.'
              : 'Structural Dr. Fixit admixtures and protective membranes engineered for foundations, slabs, terraces, and wet areas.'}
          </p>
        </div>
      </section>

      {/* 2. OVERLAPPING MODE SWITCHER TABS */}
      <div className="container" style={{ marginTop: '-2.25rem', position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            boxShadow: '0 12px 30px -8px rgba(1, 35, 78, 0.25)',
            borderRadius: '10px',
            overflow: 'hidden',
            maxWidth: '520px',
            margin: '0 auto 2.5rem',
            border: '1px solid #CBD8DC',
          }}
        >
          <button
            type="button"
            onClick={() => navigate('/dr-fixit/repair-renovate')}
            style={{
              padding: '1.1rem 1.25rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '0.98rem',
              backgroundColor: activeMode === 'repair-renovate' ? '#0251B0' : '#FFFFFF',
              color: activeMode === 'repair-renovate' ? '#FFFFFF' : '#0B1B36',
              transition: 'all 0.2s ease',
            }}
          >
            Repair/Renovate
          </button>
          <button
            type="button"
            onClick={() => navigate('/dr-fixit/new-construction')}
            style={{
              padding: '1.1rem 1.25rem',
              border: 'none',
              borderLeft: '1px solid #CBD8DC',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '0.98rem',
              backgroundColor: activeMode === 'new-construction' ? '#0251B0' : '#FFFFFF',
              color: activeMode === 'new-construction' ? '#FFFFFF' : '#0B1B36',
              transition: 'all 0.2s ease',
            }}
          >
            New construction
          </button>
        </div>

        {/* 3. MAIN TWO-COLUMN EXPLORER */}
        <div className="explorer-layout">
          {/* LEFT SIDEBAR: FILTER / QUESTIONS */}
          <aside
            className="explorer-sidebar"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              width: '100%',
            }}
          >
            {/* Sidebar Header */}
            <div
              style={{
                backgroundColor: '#D1FF42',
                color: '#0251B0',
                padding: '0.95rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontWeight: '800',
                fontSize: '0.9rem',
                letterSpacing: '0.03em',
              }}
            >
              <span>FILTER / QUESTIONS</span>
              <button
                type="button"
                onClick={clearFilters}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#0251B0',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                Clear
              </button>
            </div>

            <div style={{ padding: '1.25rem' }}>
              {/* Question 1: Where is the leakage? */}
              <div style={{ marginBottom: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setLeakageOpen(!leakageOpen)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    padding: '0 0 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    color: '#0B1B36',
                    cursor: 'pointer',
                  }}
                >
                  <span>
                    {activeMode === 'repair-renovate' ? 'Where is the leakage?' : 'Application Area'}
                  </span>
                  {leakageOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {leakageOpen && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {areaOptions.map((area) => {
                      const isSelected = selectedArea === area;
                      return (
                        <button
                          key={area}
                          type="button"
                          onClick={() => setSelectedArea(isSelected ? '' : area)}
                          style={{
                            width: '100%',
                            padding: '0.7rem 0.9rem',
                            borderRadius: '8px',
                            border: isSelected ? '1.5px solid #0251B0' : '1px solid #E2E8F0',
                            backgroundColor: isSelected ? '#E6EDEF' : '#FFFFFF',
                            color: isSelected ? '#0251B0' : '#334155',
                            fontWeight: isSelected ? '700' : '500',
                            fontSize: '0.875rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <span
                            style={{
                              width: '16px',
                              height: '16px',
                              borderRadius: '50%',
                              border: isSelected ? '5px solid #0251B0' : '1.5px solid #94A3B8',
                              flexShrink: 0,
                              backgroundColor: '#FFFFFF',
                            }}
                          />
                          <span>{area}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Question 2: Crack filling */}
              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.25rem' }}>
                <button
                  type="button"
                  onClick={() => setCrackOpen(!crackOpen)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    padding: '0 0 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    color: '#0B1B36',
                    cursor: 'pointer',
                  }}
                >
                  <span>Crack filling</span>
                  {crackOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {crackOpen && (
                  <button
                    type="button"
                    onClick={() => setCrackFillingOnly(!crackFillingOnly)}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.9rem',
                      borderRadius: '8px',
                      border: crackFillingOnly ? '1.5px solid #0251B0' : '1px solid #E2E8F0',
                      backgroundColor: crackFillingOnly ? '#E6EDEF' : '#FFFFFF',
                      color: crackFillingOnly ? '#0251B0' : '#334155',
                      fontWeight: crackFillingOnly ? '700' : '500',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        border: crackFillingOnly ? '5px solid #0251B0' : '1.5px solid #94A3B8',
                        flexShrink: 0,
                        backgroundColor: '#FFFFFF',
                      }}
                    />
                    <span>For Crack filling (If any)</span>
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT: RESULTS & PRODUCT CARDS */}
          <div style={{ minWidth: 0 }}>
            {/* Top Results & Search Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0B1B36' }}>
                Result: {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''}
              </div>

              <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Products"
                  className="form-control"
                  style={{
                    borderRadius: '999px',
                    paddingRight: '2.75rem',
                    paddingLeft: '1.15rem',
                    height: '44px',
                  }}
                />
                <Search
                  size={18}
                  color="#4A5E73"
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div
                className="card"
                style={{ padding: '3rem', textAlign: 'center', backgroundColor: '#FFFFFF' }}
              >
                <h3 style={{ marginBottom: '0.5rem' }}>No matching Dr. Fixit products found</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Try clearing your filters or searching another keyword.
                </p>
                <button type="button" onClick={clearFilters} className="btn btn-primary">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
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
                      borderRadius: '14px',
                      overflow: 'hidden',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          position: 'relative',
                          height: '190px',
                          backgroundColor: '#F8FAFC',
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => handleImageError(e, 'Waterproofing')}
                        />
                        <span
                          style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            backgroundColor: '#0251B0',
                            color: '#D1FF42',
                            fontSize: '0.72rem',
                            fontWeight: '800',
                            padding: '3px 9px',
                            borderRadius: '999px',
                          }}
                        >
                          Code {product.code}
                        </span>
                      </div>

                      <div style={{ padding: '1.25rem 1.25rem 0.75rem', textAlign: 'center' }}>
                        <h3
                          style={{
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            color: '#0B1B36',
                            marginBottom: '0.5rem',
                          }}
                        >
                          {product.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => setDetailProduct(product)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#0251B0',
                            fontWeight: '700',
                            fontSize: '0.82rem',
                            letterSpacing: '0.04em',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            marginBottom: '0.75rem',
                          }}
                        >
                          PRODUCT DETAILS
                        </button>
                      </div>
                    </div>

                    <div style={{ padding: '0 1rem 1rem' }}>
                      <button
                        type="button"
                        onClick={() =>
                          openWhatsApp(
                            `Hello G.K Traders Paints, I want to enquire about ${product.name} (${activeMode === 'repair-renovate' ? 'Repair/Renovate' : 'New Construction'}).`
                          )
                        }
                        style={{
                          width: '100%',
                          backgroundColor: '#D1FF42',
                          color: '#0251B0',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.7rem 1rem',
                          fontWeight: '800',
                          fontSize: '0.88rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                        }}
                      >
                        <MessageCircle size={16} /> Enquire Now • ₹{product.price}/{product.unit}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PRODUCT DETAILS POPUP */}
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
              maxWidth: '560px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            }}
          >
            <div style={{ position: 'relative', height: '210px', backgroundColor: '#E6EDEF' }}>
              <img
                src={detailProduct.image}
                alt={detailProduct.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                type="button"
                onClick={() => setDetailProduct(null)}
                aria-label="Close product details"
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
                  Dr. Fixit • Code {detailProduct.code}
                </span>
                <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#059669' }}>
                  <ShieldCheck size={14} style={{ verticalAlign: 'middle' }} /> Genuine Stock
                </span>
              </div>

              <h2 style={{ fontSize: '1.4rem', color: '#0251B0', marginBottom: '0.65rem' }}>
                {detailProduct.name}
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#4A5E73', lineHeight: '1.6', marginBottom: '1rem' }}>
                {detailProduct.description}
              </p>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0B1B36', marginBottom: '6px' }}>
                  KEY BENEFITS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {detailProduct.features.map((f, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', color: '#334155' }}>
                      <CheckCircle size={15} color="#0251B0" /> {f}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#4A5E73', marginRight: '4px' }}>
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
                  openWhatsApp(`Hello G.K Traders Paints, I want to order ${detailProduct.name} (Code ${detailProduct.code}).`)
                }
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                <MessageCircle size={18} /> Order / Enquire on WhatsApp (₹{detailProduct.price}/{detailProduct.unit})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
