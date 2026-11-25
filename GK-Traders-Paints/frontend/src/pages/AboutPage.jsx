import React from 'react';
import { Link } from 'react-router-dom';
import { handleImageError } from '../utils/imageFallback';
import {
  Award,
  ShieldCheck,
  Paintbrush,
  Users,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Star,
  MapPin,
} from 'lucide-react';

export default function AboutPage() {
  const milestones = [
    { year: '1998', title: 'Established', desc: 'Opened our first physical paint distribution depot.' },
    { year: '2005', title: 'Asian Paints Club', desc: 'Recognized as an official authorized tinting partner.' },
    { year: '2014', title: 'Expanded All Major Brands', desc: 'Added Berger, Nerolac, Birla White, and Dr. Fixit under one roof.' },
    { year: '2026', title: 'Digital & AI Innovation', desc: 'Launched full-service digital catalogue, AI visualizer & doorstep consultations.' },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* Header Banner */}
      <section
        style={{
          background: 'linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url("https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80") center/cover no-repeat',
          color: '#FFFFFF',
          padding: '5rem 0',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <span
            style={{
              backgroundColor: 'rgba(217, 119, 6, 0.3)',
              color: '#FDE68A',
              border: '1px solid #D97706',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: '700',
              display: 'inline-block',
              marginBottom: '1rem',
            }}
          >
            Since 1998 • 25+ Years of Trust
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: '#FFFFFF', marginBottom: '1.25rem' }}>
            About G.K Traders Paints
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#CBD5E1', lineHeight: '1.6' }}>
            Elevating Indian architecture with authentic formulations, computerized precision color dispensing, and certified waterproofing engineering.
          </p>
        </div>
      </section>

      {/* Main Story & Values */}
      <section className="section-py" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="section-tag">Our Legacy</span>
              <h2 style={{ fontSize: '2.25rem', color: 'var(--primary)', marginBottom: '1.25rem' }}>
                Delivering Excellence in Every Drop of Paint.
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                Founded with a mission to bring genuine paint quality and transparent pricing to homeowners and builders, <strong>G.K Traders Paints</strong> has evolved into a premier destination for surface protection and luxury wall fashion.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '2rem' }}>
                We understand that painting your home is an emotional and financial investment. That is why we provide 100% factory-sealed containers directly from authorized manufacturers—preventing dilution, adulteration, or color mismatch.
              </p>

              <div className="responsive-2col" style={{ gap: '1.5rem' }}>
                {[
                  { title: 'Computerised Tinting', desc: 'Digital spectrophotometer accuracy matching over 2,500+ shades.' },
                  { title: 'Moisture Diagnosis', desc: 'Free on-site substrate moisture testing to prevent peeling.' },
                  { title: 'Bulk Contractor Pricing', desc: 'Direct wholesale commercial discounts for builders and villas.' },
                  { title: 'Certified Painters', desc: 'Vetted applicators trained in mechanical sanding and roller finish.' },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '10px' }}>
                    <CheckCircle size={20} color="#C2410C" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <h4 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '2px' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-xl)',
                }}
              >
                <img
                  src="/gk-traders-banner.jpg"
                  alt="G.K Traders Paints Official Identity"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  onError={(e) => handleImageError(e, 'G.K Traders Paints')}
                />
                <div
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    color: '#FFFFFF',
                    padding: '1.5rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <ShieldCheck size={24} color="#D97706" />
                    <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>
                      YOUR TRUST. OUR PRIDE.
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                    15/5C Rajiv Gandhi Nagar, Sivakasi Main Road, Opp to Cotton Research Centre, Srivilliputhur – 626125. Helpline: 7010499526, 9123501787.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="section-py" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Growth & Heritage</span>
            <h2 className="section-title">Our 25-Year Journey</h2>
            <p className="section-desc">Key milestones that transformed G.K Traders into a customer-first paint superstore.</p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem',
            }}
          >
            {milestones.map((m, idx) => (
              <div key={idx} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '2rem',
                    fontWeight: '800',
                    color: 'var(--accent)',
                    fontFamily: 'var(--font-heading)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {m.year}
                </div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  {m.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
