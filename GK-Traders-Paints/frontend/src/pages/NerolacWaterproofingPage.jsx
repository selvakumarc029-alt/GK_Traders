import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ArrowLeft, ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';

const WATERPROOFING_SECTIONS = [
  {
    id: 'new-construction',
    title: 'New Construction Waterproofing',
    description:
      'Protect your new home from water damage right from the beginning. Nerolac provides waterproofing solutions for foundations, terraces, roofs, bathrooms, balconies, water tanks, and basements to help keep structures damp-free for decades.',
    image: '/brands/dr-fixit.jpg',
    whatsappMsg:
      'Hello G.K Traders Paints, I want to enquire about Nerolac New Construction Waterproofing solutions.',
    targetRoute: '/nerolac/waterproofing/new-construction',
  },
  {
    id: 'repair-renovation',
    title: 'Repair & Renovation Waterproofing',
    description:
      "Already facing leakage, damp walls, roof seepage, or cracks? Our waterproofing experts identify the root cause and recommend the right Nerolac repair solution to restore your property's protection and prevent future seepage.",
    image: '/paints/waterproofing.jpg',
    whatsappMsg:
      'Hello G.K Traders Paints, I want to enquire about Nerolac Repair & Renovation Waterproofing solutions.',
    targetRoute: '/nerolac/waterproofing/repair-renovation',
  },
];

export default function NerolacWaterproofingPage() {
  const navigate = useNavigate();
  const { openWhatsApp } = useShop();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* HERO BANNER */}
      <section
        style={{
          background:
            'linear-gradient(rgba(1, 35, 78, 0.85), rgba(2, 81, 176, 0.78)), url("/paints/waterproofing.jpg") center/cover no-repeat',
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
              background: 'rgba(255, 255, 255, 0.14)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#FFFFFF',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '1rem',
            }}
          >
            <ArrowLeft size={14} /> Back to Home
          </button>

          <div style={{ marginBottom: '0.75rem' }}>
            <span
              style={{
                backgroundColor: '#D1FF42',
                color: '#0251B0',
                fontSize: '0.75rem',
                fontWeight: '800',
                padding: '4px 12px',
                borderRadius: '999px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Nerolac • Perma & Waterproofing Solutions
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF', marginBottom: '0.6rem' }}>
            Nerolac Waterproofing Solutions
          </h1>
          <p style={{ fontSize: '1.02rem', color: '#E6EDEF', maxWidth: '640px', margin: '0 auto' }}>
            Choose the right Nerolac waterproofing system for your project — whether building new or repairing existing dampness and leakage.
          </p>
        </div>
      </section>

      {/* TWO-CARD WATERPROOFING VIEW */}
      <div className="container" style={{ marginTop: '3rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '2rem',
          }}
        >
          {WATERPROOFING_SECTIONS.map((sec) => (
            <div
              key={sec.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                overflow: 'hidden',
              }}
            >
              <div>
                <div style={{ height: '240px', overflow: 'hidden', backgroundColor: '#E6EDEF' }}>
                  <img
                    src={sec.image}
                    alt={sec.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>

                <div style={{ padding: '1.75rem 1.75rem 1rem' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      color: '#0251B0',
                      backgroundColor: '#E6EDEF',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <ShieldCheck size={14} /> Nerolac Certified System
                  </div>
                  <h2 style={{ fontSize: '1.45rem', color: '#0251B0', marginBottom: '0.75rem' }}>
                    {sec.title}
                  </h2>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.65' }}>
                    {sec.description}
                  </p>
                </div>
              </div>

              <div style={{ padding: '0 1.75rem 1.75rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => navigate(sec.targetRoute)}
                  className="btn btn-primary"
                  style={{ flex: 1, minWidth: '140px' }}
                >
                  Explore <ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => openWhatsApp(sec.whatsappMsg)}
                  className="btn btn-secondary"
                  style={{ padding: '0.75rem 1.15rem' }}
                  title="Enquire on WhatsApp"
                >
                  <MessageCircle size={18} /> Enquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
