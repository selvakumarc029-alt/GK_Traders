import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import {
  Paintbrush,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export default function Footer() {
  const { storeInfo, openWhatsApp } = useShop();

  return (
    <footer
      style={{
        backgroundColor: '#01234E',
        color: '#CBD5E1',
        borderTop: '2px solid #0251B0',
      }}
    >
      {/* Main Footer Columns */}
      <div style={{ padding: '4.5rem 0 3.5rem' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '3rem',
            }}
          >
            {/* Col 1: Brand Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #0251B0 0%, #196BD1 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#D1FF42',
                  }}
                >
                  <Paintbrush size={20} />
                </div>
                <div>
                  <h4 style={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: '800' }}>
                    G.K TRADERS
                  </h4>
                  <span style={{ color: '#D1FF42', fontSize: '0.6875rem', fontWeight: '700', letterSpacing: '0.12em' }}>
                    PAINTS & COATINGS
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.65', marginBottom: '1.5rem' }}>
                Your trusted one-stop architectural paints, waterproofing, and surface protection superstore. Delivering genuine brand paints, computerised tinting, and certified technical consultation.
              </p>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => openWhatsApp()}
                  className="btn btn-whatsapp"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  <MessageCircle size={16} /> WhatsApp Chat
                </button>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h5 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '700', marginBottom: '1.25rem' }}>
                Quick Links
              </h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {[
                  { name: 'Shop All Products', path: '/products' },
                  { name: 'Colour Inspiration Gallery', path: '/colours' },
                  { name: 'Interactive Paint Calculator', path: '/calculator' },
                  { name: 'AI Room Visualizer', path: '/ai-visualizer' },
                  { name: 'Book Virtual Painter', path: '/book-painter' },
                  { name: 'Special Offers & Packages', path: '/offers' },
                  { name: 'Interior Design Tips Blog', path: '/blog' },
                  { name: 'About G.K Traders', path: '/about' },
                ].map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#94A3B8',
                        fontSize: '0.875rem',
                        transition: 'color 0.2s, transform 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#D1FF42';
                        e.target.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#94A3B8';
                        e.target.style.transform = 'translateX(0)';
                      }}
                    >
                      <ChevronRight size={14} color="#D1FF42" /> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Categories */}
            <div>
              <h5 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '700', marginBottom: '1.25rem' }}>
                Paint Categories
              </h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {[
                  'Interior Paints',
                  'Exterior Paints',
                  'Waterproofing',
                  'Wood Coatings',
                  'Metal Paints',
                  'Putty',
                  'Primer',
                  'Brushes & Tools',
                ].map((cat) => (
                  <li key={cat}>
                    <Link
                      to={`/products?category=${encodeURIComponent(cat)}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#94A3B8',
                        fontSize: '0.875rem',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.target.style.color = '#F59E0B')}
                      onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}
                    >
                      <ChevronRight size={14} color="#D1FF42" /> {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Store Contact & Hours */}
            <div>
              <h5 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '700', marginBottom: '1.25rem' }}>
                Visit Store & Contact
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <MapPin size={20} color="#D1FF42" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>
                    {storeInfo.address || '15/5C Rajiv Gandhi Nagar, Sivakasi Main Road, Opp to Cotton Research Centre, Srivilliputhur – 626125'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Phone size={18} color="#D1FF42" style={{ flexShrink: 0 }} />
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <a href="tel:7010499526" style={{ color: '#CBD5E1', fontWeight: '600' }}>
                      7010499526
                    </a>
                    <span>•</span>
                    <a href="tel:9123501787" style={{ color: '#CBD5E1', fontWeight: '600' }}>
                      9123501787
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Mail size={18} color="#D1FF42" style={{ flexShrink: 0 }} />
                  <a href={`mailto:${storeInfo.email || 'info@gktraderspaints.com'}`} style={{ color: '#CBD5E1' }}>
                    {storeInfo.email || 'info@gktraderspaints.com'}
                  </a>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <Clock size={18} color="#D1FF42" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div>{storeInfo.timings || 'Mon - Sat: 8:30 AM – 9:00 PM | Sun: 9:00 AM – 2:00 PM'}</div>
                  </div>
                </div>

                <a
                  href={storeInfo.googleMapsUrl || 'https://www.google.com/maps/search/?api=1&query=Cotton+Research+Centre+Sivakasi+Main+Road+Srivilliputhur+626125'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#F59E0B',
                    fontWeight: '600',
                    marginTop: '0.5rem',
                  }}
                >
                  <ExternalLink size={16} /> Open in Google Maps (Srivilliputhur)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Disclaimer Bar */}
      <div
        style={{
          borderTop: '1px solid #1E293B',
          padding: '1.5rem 0',
          fontSize: '0.8125rem',
          color: '#64748B',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            © {new Date().getFullYear()} G.K Traders Paints. All rights reserved. Authorized dealer & distributor.
          </div>
          <div>
            Note: All paint calculations, coverage, and digital color simulations are approximations. Actual coverage depends on surface texture, substrate porosity, and application method.
          </div>
        </div>
      </div>
    </footer>
  );
}
