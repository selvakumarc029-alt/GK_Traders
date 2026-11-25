import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getColours } from '../services/api';
import { useShop } from '../context/ShopContext';
import {
  Palette,
  Search,
  Copy,
  Check,
  Heart,
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  Layers,
  Eye,
} from 'lucide-react';
import { handleImageError } from '../utils/imageFallback';

export default function ColourGalleryPage() {
  const [colours, setColours] = useState([]);
  const [filteredColours, setFilteredColours] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeColourModal, setActiveColourModal] = useState(null);
  const [copiedHex, setCopiedHex] = useState(null);

  const { savedColours, toggleSaveColour, showToast } = useShop();

  const categories = ['All', 'Warm', 'Cool', 'Neutrals', 'Pastels', 'Vibrant', 'Monochrome'];

  const roomInspirations = [
    {
      title: 'Contemporary Open Living Room',
      roomType: 'Living Room',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80',
      description: 'Airy natural illumination paired with calming coastal blues and warm amber accents.',
      primaryHex: '#7FA1B3',
      primaryName: 'Morning Mist Blue',
      palette: [
        { name: 'Mist Blue', hex: '#7FA1B3' },
        { name: 'Saffron Glow', hex: '#D97724' },
        { name: 'Alabaster', hex: '#F4F1EA' },
      ],
    },
    {
      title: 'Master Bedroom Tranquility Suite',
      roomType: 'Bedroom',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80',
      description: 'Subtle blush undertones balanced with pure matte whites for relaxing sleeping quarters.',
      primaryHex: '#C88D87',
      primaryName: 'Jaipur Dusty Rose',
      palette: [
        { name: 'Dusty Rose', hex: '#C88D87' },
        { name: 'Alabaster', hex: '#F4F1EA' },
        { name: 'Charcoal', hex: '#33383F' },
      ],
    },
    {
      title: 'Modern Architectural Villa Façade',
      roomType: 'Exterior Façade',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
      description: 'Forest greens and stone ochre accents blending exterior architecture with surrounding nature.',
      primaryHex: '#2E5A44',
      primaryName: 'Nilgiri Pine Green',
      palette: [
        { name: 'Pine Green', hex: '#2E5A44' },
        { name: 'Dune Ochre', hex: '#D2AC79' },
        { name: 'Stone White', hex: '#F8FAFC' },
      ],
    },
    {
      title: 'Warm Scandinavian Dining & Kitchen',
      roomType: 'Dining & Kitchen',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
      description: 'Vibrant saffron warmth inspiring conversation, paired with crisp trim and deep timber highlights.',
      primaryHex: '#D97724',
      primaryName: 'Royal Saffron Glow',
      palette: [
        { name: 'Saffron Glow', hex: '#D97724' },
        { name: 'Warm Charcoal', hex: '#33383F' },
        { name: 'Pristine White', hex: '#FFFFFF' },
      ],
    },
    {
      title: 'Lavender Hue Boutique Lounge',
      roomType: 'Lounge & Accent Wall',
      image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=900&q=80',
      description: 'Pastel purple elegance creating an artistic, tranquil reading retreat and focal wall.',
      primaryHex: '#B8A8D0',
      primaryName: 'Kashmir Lavender',
      palette: [
        { name: 'Lavender', hex: '#B8A8D0' },
        { name: 'Mist Blue', hex: '#7FA1B3' },
        { name: 'Soft Cream', hex: '#F4F1EA' },
      ],
    },
    {
      title: 'Minimalist Executive Home Office',
      roomType: 'Study & Office',
      image: 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=900&q=80',
      description: 'Deep sophisticated charcoal focusing attention and giving depth to executive desk corners.',
      primaryHex: '#33383F',
      primaryName: 'Graphite Charcoal',
      palette: [
        { name: 'Charcoal', hex: '#33383F' },
        { name: 'Dune Ochre', hex: '#D2AC79' },
        { name: 'Steel White', hex: '#E2E8F0' },
      ],
    },
  ];

  useEffect(() => {
    async function loadColours() {
      try {
        setLoading(true);
        const res = await getColours();
        if (res.data) {
          setColours(res.data);
          setFilteredColours(res.data);
        }
      } catch (err) {
        console.error('Error fetching colours:', err);
      } finally {
        setLoading(false);
      }
    }
    loadColours();
  }, []);

  useEffect(() => {
    let result = colours;

    if (selectedCategory !== 'All') {
      result = result.filter(
        (c) => c.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.hex.toLowerCase().includes(q) ||
          c.family?.toLowerCase().includes(q)
      );
    }

    setFilteredColours(result);
  }, [selectedCategory, searchQuery, colours]);

  const copyToClipboard = (hex, name) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    showToast(`Copied ${name} (${hex}) to clipboard!`);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '90vh', padding: '3.5rem 0 5rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-tag">
            <Palette size={16} /> Architectural Shade Studio
          </span>
          <h1 className="section-title">Colour Inspiration Gallery</h1>
          <p className="section-desc">
            Explore curated palettes formulated for Indian residential illumination. Copy HEX codes, preview complementary harmonies, and simulate on your walls using AI.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div
          className="card"
          style={{
            padding: '1.25rem 1.5rem',
            backgroundColor: '#FFFFFF',
            marginBottom: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  border: '1.5px solid',
                  borderColor: selectedCategory === cat ? 'var(--accent)' : 'var(--border-color)',
                  backgroundColor: selectedCategory === cat ? 'var(--accent)' : '#FFFFFF',
                  color: selectedCategory === cat ? '#FFFFFF' : 'var(--primary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
            <input
              type="text"
              placeholder="Search shade name or hex..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '2.5rem', paddingRight: '1rem', fontSize: '0.875rem' }}
            />
            <Search
              size={16}
              color="#64748B"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
            />
          </div>
        </div>

        {/* AI Callout Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
            color: '#FFFFFF',
            padding: '1.75rem 2rem',
            borderRadius: '16px',
            marginBottom: '3rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FDE68A', fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px' }}>
              <Sparkles size={16} /> Need Expert Design Recommendations?
            </div>
            <h3 style={{ fontSize: '1.35rem', color: '#FFFFFF', marginBottom: '4px' }}>
              Let our AI Decorator generate matching palettes for your room.
            </h3>
            <p style={{ color: '#CBD5E1', fontSize: '0.875rem' }}>
              Input room type, natural light condition, and style to receive custom coordinated palettes.
            </p>
          </div>
          <Link to="/ai-visualizer" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
            <Sparkles size={18} /> Launch AI Visualizer
          </Link>
        </div>

        {/* Colours Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            Loading designer colour palettes...
          </div>
        ) : filteredColours.length === 0 ? (
          <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
            <h3>No colours found matching your search.</h3>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {filteredColours.map((colour) => {
              const isSaved = savedColours.some((c) => c.code === colour.code);

              return (
                <div
                  key={colour.code}
                  className="card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  onClick={() => setActiveColourModal(colour)}
                >
                  {/* Swatch Block */}
                  <div
                    style={{
                      height: '170px',
                      backgroundColor: colour.hex,
                      position: 'relative',
                      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: 'var(--primary)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                      }}
                    >
                      {colour.code}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveColour(colour);
                      }}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: isSaved ? '#DC2626' : '#64748B',
                      }}
                    >
                      <Heart size={16} fill={isSaved ? '#DC2626' : 'none'} />
                    </button>
                  </div>

                  {/* Swatch Details */}
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                        <h3 style={{ fontSize: '1.15rem', color: 'var(--primary)' }}>
                          {colour.name}
                        </h3>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: '700' }}>
                          {colour.category}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1rem', lineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {colour.description}
                      </p>
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                        <span style={{ fontFamily: 'monospace', fontWeight: '800', color: 'var(--primary)', fontSize: '0.95rem' }}>
                          {colour.hex}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(colour.hex, colour.name);
                          }}
                          className="btn btn-outline"
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                        >
                          {copiedHex === colour.hex ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                          {copiedHex === colour.hex ? 'Copied' : 'Copy HEX'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 4. REAL ROOM INSPIRATION & ARCHITECTURAL PALETTES */}
        <section style={{ marginTop: '5rem', paddingTop: '3.5rem', borderTop: '1px solid var(--border-color)' }}>
          <div className="section-header" style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
            <span className="section-tag">
              <Eye size={16} /> Architectural Inspiration
            </span>
            <h2 className="section-title">Real Room Colour Inspiration & Coordinated Schemes</h2>
            <p className="section-desc" style={{ margin: 0, maxWidth: '750px' }}>
              See how authentic Asian Paints, Berger, and Nerolac luxury shades translate into real living spaces, master bedrooms, and exterior façades. Click any room to simulate its colors directly in our AI Visualizer.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 310px), 1fr))',
              gap: '2rem',
            }}
          >
            {roomInspirations.map((room, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                {/* Room Image with Smooth Zoom */}
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img
                    src={room.image}
                    alt={room.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    onError={(e) => handleImageError(e, 'Interior Design')}
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.06)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(15, 23, 42, 0.85)',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {room.roomType}
                  </div>
                </div>

                {/* Content & Swatches */}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '6px' }}>
                      {room.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                      {room.description}
                    </p>

                    {/* Featured Room Swatch Trio */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>
                        Coordinated Wall Swatches
                      </span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {room.palette.map((swatch, sIdx) => (
                          <div
                            key={sIdx}
                            onClick={() => copyToClipboard(swatch.hex, swatch.name)}
                            style={{
                              flex: 1,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '5px 8px',
                              backgroundColor: '#F8FAFC',
                              border: '1px solid var(--border-color)',
                              borderRadius: '8px',
                              cursor: 'pointer',
                            }}
                            title={`Click to copy ${swatch.hex}`}
                          >
                            <span
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '4px',
                                backgroundColor: swatch.hex,
                                border: '1px solid rgba(0,0,0,0.1)',
                                flexShrink: 0,
                              }}
                            />
                            <div style={{ overflow: 'hidden' }}>
                              <div style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {swatch.name}
                              </div>
                              <div style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                                {swatch.hex}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <Link
                    to={`/ai-visualizer?hex=${encodeURIComponent(room.primaryHex)}&name=${encodeURIComponent(room.primaryName)}`}
                    className="btn btn-outline"
                    style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.875rem' }}
                  >
                    <Sparkles size={16} color="#D97706" /> Simulate in AI Visualizer
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Colour Harmony Modal */}
        {activeColourModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(6px)',
              zIndex: 9998,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
            onClick={() => setActiveColourModal(null)}
          >
            <div
              className="card"
              style={{
                width: '100%',
                maxWidth: '600px',
                backgroundColor: '#FFFFFF',
                overflow: 'hidden',
                animation: 'fadeIn 0.25s ease',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  height: '180px',
                  backgroundColor: activeColourModal.hex,
                  position: 'relative',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-md)',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent)' }}>
                    {activeColourModal.code}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--primary)' }}>
                    {activeColourModal.name}
                  </h3>
                </div>
              </div>

              <div style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Designer Formulation & Psychological Impact
                  </div>
                  <p style={{ color: '#334155', lineHeight: '1.6' }}>
                    {activeColourModal.description}
                  </p>
                </div>

                {/* Complementary Palette Swatches */}
                {activeColourModal.complementaryHex && (
                  <div style={{ marginBottom: '1.75rem' }}>
                    <div className="form-label">Harmonious Coordinated Swatches</div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      {activeColourModal.complementaryHex.map((hex, idx) => (
                        <div
                          key={idx}
                          onClick={() => copyToClipboard(hex, `Accent ${idx + 1}`)}
                          style={{
                            flex: 1,
                            height: '56px',
                            backgroundColor: hex,
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            fontFamily: 'monospace',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                            cursor: 'pointer',
                            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
                          }}
                          title="Click to copy HEX"
                        >
                          {hex}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link
                    to={`/ai-visualizer?hex=${encodeURIComponent(activeColourModal.hex)}&name=${encodeURIComponent(activeColourModal.name)}`}
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                  >
                    <Sparkles size={16} /> Simulate in AI Visualizer
                  </Link>
                  <button
                    onClick={() => setActiveColourModal(null)}
                    className="btn btn-outline"
                    style={{ padding: '0.65rem 1.25rem' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
