import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBrands, getColours, getOffers, getProducts } from '../services/api';
import { DEFAULT_BRAND_PRODUCTS } from '../data/brandCatalog';
import { useShop } from '../context/ShopContext';
import { handleImageError } from '../utils/imageFallback';
import {
  Paintbrush,
  PaintBucket,
  PaintRoller,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Shield,
  CheckCircle,
  Copy,
  Check,
  Star,
  Award,
  Zap,
  Tag,
  Palette,
  Calculator,
  Calendar,
  SlidersHorizontal,
  Layers,
  Droplet,
  X,
} from 'lucide-react';

const DEFAULT_BRANDS = [
  {
    name: 'Asian Paints',
    slug: 'asian-paints',
    image: '/brands/asian-paints.jpg',
    tagLine: 'Har Ghar Kuch Kehta Hai',
    description: 'India’s leading paint brand offering luxury interior emulsions, weather-proof exterior coatings, and precision computerised tinting.',
    featuredCategories: ['Interior Paints', 'Exterior Paints', 'Waterproofing'],
  },
  {
    name: 'Berger',
    slug: 'berger',
    image: '/brands/berger.jpg',
    tagLine: 'Paint Your Imagination',
    description: 'High-durability architectural coatings, Silk luxury finishes, and WeatherCoat exterior shields engineered for Indian climates.',
    featuredCategories: ['Interior Paints', 'Exterior Paints', 'Wood Coatings'],
  },
  {
    name: 'Nerolac',
    slug: 'nerolac',
    image: '/brands/nerolac.jpg',
    tagLine: 'Healthy Home Paints',
    description: 'Low-VOC, lead-free interior and exterior formulations designed for healthier living spaces and lasting colour brilliance.',
    featuredCategories: ['Interior Paints', 'Metal Paints', 'Primer'],
  },
  {
    name: 'Indigo',
    slug: 'indigo',
    image: '/brands/indigo.jpg',
    tagLine: 'Be Surprised',
    description: 'Vibrant specialty finishes, metallic emulsions, and floor & ceiling coatings known for rich coverage and unique textures.',
    featuredCategories: ['Interior Paints', 'Exterior Paints', 'Primer'],
  },
  {
    name: 'Birla White',
    slug: 'birla-white',
    image: '/brands/birla-white.jpg',
    tagLine: 'White Cement & WallCare Experts',
    description: 'Premium water-resistant white cement-based wall putty and primers for ultra-smooth, flake-free walls.',
    featuredCategories: ['Putty', 'Primer', 'Waterproofing'],
  },
  {
    name: 'Dr. Fixit',
    slug: 'dr-fixit',
    image: '/brands/dr-fixit.jpg',
    tagLine: 'The Waterproofing Expert',
    description: 'Complete structural waterproofing solutions for terraces, bathrooms, damp walls, and crack-bridging exterior protection.',
    featuredCategories: ['Waterproofing', 'Crack Sealants', 'Coatings'],
  },
];

export default function HomePage() {
  const [brands, setBrands] = useState(DEFAULT_BRANDS);
  const [colours, setColours] = useState([]);
  const [offers, setOffers] = useState([]);
  const [copiedHex, setCopiedHex] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandProducts, setBrandProducts] = useState([]);

  const { openWhatsApp, showToast } = useShop();
  const navigate = useNavigate();

  const openBrandPopup = async (brand) => {
    setSelectedBrand(brand);
    const fallbackList = DEFAULT_BRAND_PRODUCTS[brand.name] || [];
    setBrandProducts(fallbackList);

    if (['Asian Paints', 'Berger', 'Nerolac', 'Indigo', 'Birla White', 'Dr. Fixit'].includes(brand.name)) return;

    try {
      const res = await getProducts({ brand: brand.name });
      if (res.data && res.data.length > 0) {
        setBrandProducts(res.data);
      }
    } catch (err) {
      console.warn('Using fallback brand catalog:', err);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedBrand(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [brandRes, colRes, offRes] = await Promise.all([
          getBrands(),
          getColours({ popular: 'true' }),
          getOffers(),
        ]);

        if (brandRes.data && brandRes.data.length > 0) setBrands(brandRes.data);
        if (colRes.data) setColours(colRes.data.slice(0, 6));
        if (offRes.data) setOffers(offRes.data.slice(0, 3));
      } catch (err) {
        console.warn('Error loading home data:', err);
      }
    }
    loadHomeData();
  }, []);

  const copyHex = (hex, name) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    showToast(`Copied ${name} (${hex}) to clipboard!`);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div>
      {/* 1. HERO BANNER SECTION */}
      <section
        style={{
          position: 'relative',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.82) 0%, rgba(15, 23, 42, 0.58) 55%, rgba(15, 23, 42, 0.35) 100%), url("/hero-interior-paint.jpg") center/cover no-repeat',
          color: '#FFFFFF',
          padding: '4rem 0',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '780px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(209, 255, 66, 0.16)',
                border: '1px solid #D1FF42',
                color: '#D1FF42',
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: '700',
                marginBottom: '1.25rem',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Award size={16} /> YOUR TRUST. OUR PRIDE. • Srivilliputhur
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                fontWeight: '800',
                color: '#FFFFFF',
                lineHeight: '1.12',
                marginBottom: '1rem',
                letterSpacing: '-0.02em',
              }}
            >
              Colouring Your World with <span style={{ color: '#D1FF42' }}>Trust & Enduring Protection</span>.
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                color: '#CBD5E1',
                lineHeight: '1.6',
                marginBottom: '2rem',
              }}
            >
              Authorized paint dealer on Sivakasi Main Road, opp to Cotton Research Centre, Srivilliputhur. Experience computerised shade tinting, AI room visualizer, and door-to-door painter consultations.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <Link to="/products" className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
                <Paintbrush size={20} /> Shop Products
              </Link>
              <Link to="/colours" className="btn btn-white" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
                <Palette size={20} /> Explore Colours
              </Link>
              <Link to="/ai-visualizer" className="btn btn-outline-white" style={{ padding: '0.9rem 1.8rem', fontSize: '1.05rem' }}>
                <Sparkles size={20} color="#FBBF24" /> AI Room Visualizer
              </Link>
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'rgba(15, 23, 42, 0.7)', padding: '8px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', fontSize: '0.85rem' }}>
              <span style={{ color: '#D1FF42', fontWeight: '700' }}>Direct Depot Helpline:</span>
              <a href="tel:7010499526" style={{ color: '#FFFFFF', fontWeight: '700' }}>7010499526</a>
              <span style={{ color: '#64748B' }}>/</span>
              <a href="tel:9123501787" style={{ color: '#FFFFFF', fontWeight: '700' }}>9123501787</a>
            </div>

            {/* Quick Stats Strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '1.5rem',
                marginTop: '3.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              {[
                { number: '25+', label: 'Years of Trust' },
                { number: '6+', label: 'Global Paint Brands' },
                { number: '2,500+', label: 'Precision Shades' },
                { number: '100%', label: 'Genuine Guarantee' },
              ].map((stat, idx) => (
                <div key={idx}>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#D1FF42', fontFamily: 'var(--font-heading)' }}>
                    {stat.number}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRAND SHOWCASE SECTION */}
      <section className="section-py" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Genuine Dealer Partnerships</span>
            <h2 className="section-title">Authorised Brand Showcase</h2>
            <p className="section-desc">
              We stock 100% factory-sealed formulations directly from India’s leading paint manufacturers with authentic manufacturer warranty.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 310px), 1fr))',
              gap: '1.75rem',
            }}
          >
            {brands.map((brand) => {
              const brandImage = brand.image || `/brands/${brand.slug}.jpg`;
              return (
                <div
                  key={brand.slug}
                  className="card"
                  style={{
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: '18px',
                    boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.12)',
                  }}
                >
                  <div>
                    {/* Brand Visual Banner */}
                    <div style={{ position: 'relative', height: '210px', overflow: 'hidden', backgroundColor: '#0F172A' }}>
                      <img
                        src={brandImage}
                        alt={`${brand.name} Paint & Interior Showcase`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.45s ease',
                        }}
                        onError={(e) => handleImageError(e, brand.name)}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.07)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.25) 55%, rgba(15, 23, 42, 0.05) 100%)',
                          pointerEvents: 'none',
                        }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: '14px',
                          right: '14px',
                          fontSize: '0.72rem',
                          fontWeight: '700',
                          color: '#ECFDF5',
                          backgroundColor: 'rgba(5, 150, 105, 0.88)',
                          backdropFilter: 'blur(6px)',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          letterSpacing: '0.02em',
                        }}
                      >
                        ✓ Authorized Dealer
                      </span>
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '14px',
                          left: '18px',
                          right: '18px',
                        }}
                      >
                        <h3 style={{ fontSize: '1.45rem', color: '#FFFFFF', marginBottom: '2px', fontWeight: '800' }}>
                          {brand.name}
                        </h3>
                        <div style={{ fontSize: '0.82rem', fontStyle: 'italic', color: '#D1FF42', fontWeight: '600' }}>
                          "{brand.tagLine}"
                        </div>
                      </div>
                    </div>

                    {/* Card Details */}
                    <div style={{ padding: '1.5rem 1.5rem 0' }}>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                        {brand.description}
                      </p>
                    </div>
                  </div>

                  <div style={{ padding: '0 1.5rem 1.5rem' }}>
                    <button
                      type="button"
                      onClick={() => openBrandPopup(brand)}
                      className="btn btn-primary"
                      style={{ width: '100%', padding: '0.75rem 1rem', justifyContent: 'center', cursor: 'pointer' }}
                    >
                      Explore {brand.name} <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. COLOUR INSPIRATION GALLERY HIGHLIGHT */}
      <section className="section-py" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1.5rem',
              marginBottom: '3rem',
            }}
          >
            <div>
              <span className="section-tag">2,500+ Designer Shades</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                Curated Colour Inspiration
              </h2>
            </div>
            <Link to="/colours" className="btn btn-primary">
              Open Full Colour Gallery <ArrowRight size={18} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {colours.map((colour) => (
              <div
                key={colour.code}
                className="card"
                style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}
              >
                <div
                  style={{
                    height: '140px',
                    backgroundColor: colour.hex,
                    borderRadius: '12px',
                    position: 'relative',
                    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)',
                    marginBottom: '1rem',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      color: 'var(--primary)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                    }}
                  >
                    {colour.code}
                  </span>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '4px' }}>
                      {colour.name}
                    </h4>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                      {colour.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: '700', color: 'var(--primary)', fontSize: '0.9rem' }}>
                      {colour.hex}
                    </span>
                    <button
                      onClick={() => copyHex(colour.hex, colour.name)}
                      className="btn btn-outline"
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                    >
                      {copiedHex === colour.hex ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                      {copiedHex === colour.hex ? 'Copied' : 'Copy HEX'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ADVANCED AI VISUALIZER & CALCULATOR BANNER */}
      <section
        className="section-py"
        style={{
          background: 'linear-gradient(135deg, #0251B0 0%, #01234E 100%)',
          color: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 310px), 1fr))',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(217, 119, 6, 0.25)',
                  color: '#D1FF42',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8125rem',
                  fontWeight: '700',
                  marginBottom: '1.25rem',
                }}
              >
                <Sparkles size={16} /> Cutting Edge Paint Tech
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#FFFFFF', marginBottom: '1.25rem' }}>
                Preview Rooms in AI & Calculate Litres Down to the Decimal.
              </h2>
              <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                Don’t gamble with paint buckets. Use our smart interactive tools to preview colours directly on wall photos, and calculate exact wall areas, window deductions, and total project budgets.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <Link to="/ai-visualizer" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
                  <Sparkles size={18} /> Launch AI Visualizer
                </Link>
                <Link to="/calculator" className="btn btn-white" style={{ padding: '0.85rem 1.75rem' }}>
                  <Calculator size={18} /> Open Paint Calculator
                </Link>
              </div>
            </div>

            <div
              className="card"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                padding: '2rem',
                backdropFilter: 'blur(10px)',
              }}
            >
              <h3 style={{ color: '#FFFFFF', fontSize: '1.35rem', marginBottom: '1.25rem' }}>
                Why G.K Traders Paints?
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { title: 'Authorized Factory Dealer', desc: '100% genuine sealed cans with direct brand batch warranties.' },
                  { title: 'Computerised Automated Tinting', desc: 'Exact colour reproducibility across 2,500+ shades in minutes.' },
                  { title: 'Certified Technical Support', desc: 'On-site moisture checking and professional painter allocation.' },
                  { title: 'Wholesale & Retail Pricing', desc: 'Best rates in the city with zero middleman commissions.' },
                ].map((perk, pIdx) => (
                  <div key={pIdx} style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ padding: '6px', background: 'rgba(209, 255, 66, 0.16)', borderRadius: '8px', color: '#D1FF42', height: 'fit-content' }}>
                      <CheckCircle size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', color: '#FFFFFF', fontSize: '0.95rem' }}>{perk.title}</div>
                      <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>{perk.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SPECIAL OFFERS SECTION */}
      {offers.length > 0 && (
        <section className="section-py" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Limited Time Bonanza</span>
              <h2 className="section-title">Exclusive Deals & Offers</h2>
              <p className="section-desc">
                Save big on your next renovation project with festive discounts and free technician visits.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem',
              }}
            >
              {offers.map((offer) => (
                <div key={offer._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', height: '180px' }}>
                    <img
                      src={offer.image}
                      alt={offer.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => handleImageError(e, 'Offers')}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: '#DC2626',
                        color: '#FFFFFF',
                        fontWeight: '800',
                        fontSize: '0.85rem',
                        padding: '4px 12px',
                        borderRadius: '6px',
                      }}
                    >
                      {offer.discount}
                    </div>
                  </div>

                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '4px' }}>
                        {offer.category}
                      </div>
                      <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '8px' }}>
                        {offer.title}
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                        {offer.description}
                      </p>
                    </div>

                    <div>
                      <div
                        style={{
                          backgroundColor: '#F8FAFC',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          border: '1px dashed var(--border-color)',
                          marginBottom: '1rem',
                        }}
                      >
                        <div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Coupon Code:</span>
                          <div style={{ fontWeight: '800', fontFamily: 'monospace', color: 'var(--primary)', fontSize: '1.1rem' }}>
                            {offer.code}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(offer.code);
                            showToast(`Coupon ${offer.code} copied!`);
                          }}
                          className="btn btn-outline"
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                        >
                          <Copy size={14} /> Copy
                        </button>
                      </div>

                      <Link to="/offers" className="btn btn-primary" style={{ width: '100%', padding: '0.65rem' }}>
                        View Offer Terms <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. CUSTOMER TESTIMONIALS */}
      <section className="section-py" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Homeowner Stories</span>
            <h2 className="section-title">Trusted by Thousands of Clients</h2>
            <p className="section-desc">
              Read how homeowners, architects, and civil contractors achieved flawless wall aesthetics with G.K Traders.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              {
                name: 'Vikramaditya Roy',
                role: 'Villa Owner, Bengaluru',
                stars: 5,
                comment:
                  'We completed our 3,200 sqft villa repaint using Asian Paints Royale from G.K Traders. Their computerized tinting matched our architect’s digital swatch accurately. Highly recommended!',
              },
              {
                name: 'Sunita Mehra',
                role: 'Interior Designer',
                stars: 5,
                comment:
                  'The AI room visualization tool helped my clients finalize shades without buying multiple tester pots. Plus, their wholesale pricing and direct delivery are unbeatable.',
              },
              {
                name: 'Rajesh Patil',
                role: 'Civil Contractor',
                stars: 5,
                comment:
                  'For waterproofing terrace cracks and plinth beams, Dr. Fixit materials from G.K Traders have never failed me in 12 years. 100% genuine factory sealed cans always.',
              },
            ].map((t, idx) => (
              <div key={idx} className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '1rem' }}>
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} size={16} color="#F59E0B" fill="#F59E0B" />
                    ))}
                  </div>
                  <p style={{ fontSize: '0.95rem', color: '#334155', fontStyle: 'italic', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    "{t.comment}"
                  </p>
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '1rem' }}>{t.name}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CALL TO ACTION STRIP */}
      <section
        style={{
          padding: '4rem 0',
          backgroundColor: 'var(--accent)',
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <h2 style={{ fontSize: '2.4rem', color: '#FFFFFF', marginBottom: '1rem' }}>
            Ready to Transform Your Home?
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#E6EDEF', maxWidth: '640px', margin: '0 auto 2rem' }}>
            Get in touch with our certified color consultants or book a free on-site wall measurement visit today.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-white" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
              Contact Our Paint Experts
            </Link>
            <Link to="/book-painter" className="btn btn-secondary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
              <Calendar size={18} /> Book Virtual Painter
            </Link>
          </div>
        </div>
      </section>

      {/* BRAND PAINTS POPUP MODAL */}
      {selectedBrand && (
        <div
          onClick={() => setSelectedBrand(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(15, 23, 42, 0.72)',
            backdropFilter: 'blur(6px)',
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
              borderRadius: '20px',
              width: '100%',
              maxWidth: '1080px',
              maxHeight: '88vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                position: 'relative',
                padding: '1.5rem 1.75rem',
                background: `linear-gradient(90deg, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.76) 100%), url("${selectedBrand.image || `/brands/${selectedBrand.slug}.jpg`}") center/cover no-repeat`,
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
                  <h2 style={{ fontSize: '1.65rem', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                    {selectedBrand.name.endsWith('Paints') ? selectedBrand.name : `${selectedBrand.name} Paints`}
                  </h2>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      backgroundColor: '#D1FF42',
                      color: '#0251B0',
                      padding: '3px 10px',
                      borderRadius: '999px',
                    }}
                  >
                    {brandProducts.length} Products Available
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#E2E8F0', margin: 0 }}>
                  "{selectedBrand.tagLine}" — Factory-sealed genuine {selectedBrand.name} range
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBrand(null)}
                aria-label="Close popup"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body - Card View Grid */}
            <div
              style={{
                padding: '1.75rem',
                overflowY: 'auto',
                backgroundColor: '#F8FAFC',
                flex: 1,
              }}
            >
              {selectedBrand.name === 'Dr. Fixit' ? (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '1.5rem',
                  }}
                >
                  {brandProducts.map((item) => (
                    <div
                      key={item._id || item.slug}
                      onClick={() => {
                        const targetUrl =
                          item.slug === 'dr-fixit-new-construction'
                            ? '/dr-fixit/new-construction'
                            : '/dr-fixit/repair-renovate';
                        setSelectedBrand(null);
                        navigate(targetUrl);
                      }}
                      style={{
                        position: 'relative',
                        height: '240px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        backgroundColor: '#000000',
                        border: '1px solid #1E293B',
                        boxShadow: '0 12px 28px -8px rgba(0, 0, 0, 0.35)',
                        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 18px 34px -8px rgba(0, 0, 0, 0.45)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 12px 28px -8px rgba(0, 0, 0, 0.35)';
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          opacity: 0.38,
                        }}
                        onError={(e) => handleImageError(e, item.name)}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.86) 0%, rgba(15, 23, 42, 0.65) 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '2rem',
                        }}
                      >
                        <h3
                          style={{
                            fontSize: '1.45rem',
                            fontWeight: '700',
                            color: '#FFFFFF',
                            letterSpacing: '0.06em',
                            margin: 0,
                            textTransform: 'uppercase',
                          }}
                        >
                          {item.name}
                        </h3>
                        <ArrowRight size={22} color="#D1FF42" style={{ flexShrink: 0 }} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.5rem',
                  }}
                >
                {brandProducts.map((item) => {
                  const iconMap = {
                    bucket: <PaintBucket size={20} color="#FFFFFF" />,
                    brush: <Paintbrush size={20} color="#FFFFFF" />,
                    shield: <Shield size={20} color="#FFFFFF" />,
                    roller: <PaintRoller size={20} color="#FFFFFF" />,
                    wood: <Layers size={20} color="#FFFFFF" />,
                    metal: <Droplet size={20} color="#FFFFFF" />,
                  };
                  return (
                    <div
                      key={item._id || item.slug}
                      onClick={() => {
                        const targetUrl =
                          item.slug === 'asian-paints-interior-painting'
                            ? '/asian-paints/interior-plain-finishes'
                            : item.slug === 'nerolac-interior-wall-paints'
                            ? '/nerolac/interior-wall-paints'
                            : item.slug === 'nerolac-exterior-wall-paints'
                            ? '/nerolac/exterior-wall-paints'
                            : item.slug === 'nerolac-waterproofing'
                            ? '/nerolac/waterproofing'
                            : item.slug === 'nerolac-adhesive'
                            ? '/nerolac/adhesive'
                            : item.slug === 'nerolac-wood-coatings'
                            ? '/nerolac/wood-coatings'
                            : item.slug === 'nerolac-metal-enamel-paints'
                            ? '/nerolac/metal-enamel'
                            : item.slug === 'indigo-interior-emulsions'
                            ? '/indigo/interior-emulsions'
                            : item.slug === 'indigo-exterior-emulsions'
                            ? '/indigo/exterior-emulsions'
                            : item.slug === 'indigo-exterior-interior-emulsions'
                            ? '/indigo/exterior-interior-emulsions'
                            : item.slug === 'indigo-waterproofing-solutions'
                            ? '/indigo/waterproofing-solutions'
                            : item.slug === 'indigo-enamels'
                            ? '/indigo/enamels'
                            : item.slug === 'indigo-putties-primers'
                            ? '/indigo/putties-primers'
                            : item.slug === 'indigo-woodcare-range'
                            ? '/indigo/woodcare-range'
                            : item.slug === 'indigo-other-products'
                            ? '/indigo/other-products'
                            : item.slug === 'indigo-private-label'
                            ? '/indigo/private-label'
                            : item.slug === 'birla-interior-paints'
                            ? '/birla/interior-paints'
                            : item.slug === 'birla-exterior-paints'
                            ? '/birla/exterior-paints'
                            : item.slug === 'birla-waterproofing'
                            ? '/birla/waterproofing'
                            : item.category && item.category !== 'All'
                            ? `/products?brand=${encodeURIComponent(selectedBrand.name)}&category=${encodeURIComponent(item.category)}`
                            : `/products?brand=${encodeURIComponent(selectedBrand.name)}`;
                        setSelectedBrand(null);
                        navigate(targetUrl);
                      }}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 6px 22px -6px rgba(15, 23, 42, 0.12)',
                        border: '1px solid #E2E8F0',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 12px 28px -6px rgba(2, 81, 176, 0.16)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 6px 22px -6px rgba(15, 23, 42, 0.12)';
                      }}
                    >
                      <div>
                        <div style={{ height: '195px', overflow: 'hidden', backgroundColor: '#E2E8F0' }}>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'transform 0.4s ease',
                            }}
                            onError={(e) => handleImageError(e, item.category)}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                          />
                        </div>

                        <div
                          style={{
                            padding: '1.15rem 1.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px',
                          }}
                        >
                          <h3
                            style={{
                              fontSize: '1.12rem',
                              fontWeight: '600',
                              color: '#0B1B36',
                              margin: 0,
                            }}
                          >
                            {item.name}
                          </h3>
                          <div
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              backgroundColor: '#0251B0',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              boxShadow: '0 4px 10px rgba(2, 81, 176, 0.25)',
                            }}
                          >
                            {iconMap[item.iconType] || <Paintbrush size={18} color="#D1FF42" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              )}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: '1rem 1.75rem',
                borderTop: '1px solid var(--border-color)',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                100% genuine factory-sealed {selectedBrand.name} stock at G.K Traders Paints
              </span>
              {selectedBrand.name !== 'Dr. Fixit' && (
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <Link
                    to="/colours"
                    onClick={() => setSelectedBrand(null)}
                    className="btn btn-primary"
                    style={{ padding: '0.55rem 1.25rem' }}
                  >
                    Colour Inspiration Gallery <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
