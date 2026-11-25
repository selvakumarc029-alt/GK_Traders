import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Paintbrush,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation Links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Colour Gallery', path: '/colours' },
    { name: 'Paint Calculator', path: '/calculator' },
    { name: 'Offers', path: '/offers' },
    { name: 'AI Visualizer', path: '/ai-visualizer', highlight: true },
    { name: 'Book Painter', path: '/book-painter' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* MAIN NAVIGATION BAR */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--border-color)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
        }}
      >
        <div
          className="container navbar-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '74px',
            paddingTop: '6px',
            paddingBottom: '6px',
            gap: '12px',
          }}
        >
          {/* Brand Logo */}
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0251B0 0%, #013A80 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D1FF42',
                boxShadow: '0 4px 12px rgba(2, 81, 176, 0.32)',
                flexShrink: 0,
              }}
            >
              <Paintbrush size={22} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: '800',
                  color: 'var(--primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: '1.15',
                  display: 'block',
                  whiteSpace: 'nowrap',
                }}
              >
                G.K TRADERS
              </span>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  color: 'var(--accent)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  lineHeight: '1',
                  marginTop: '2px',
                  display: 'block',
                  whiteSpace: 'nowrap',
                }}
              >
                PAINTS & COATINGS
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links - Perfectly Arranged */}
          <div
            className="desktop-nav-links"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginLeft: 'auto',
            }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `nav-link-item ${isActive ? 'active' : ''} ${link.highlight ? 'highlight-link' : ''}`
                }
              >
                {link.highlight && <Sparkles size={14} color="#0251B0" style={{ flexShrink: 0 }} />}
                <span>{link.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
            style={{
              background: 'transparent',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '8px',
              cursor: 'pointer',
              display: 'none',
              color: 'var(--primary)',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid var(--border-color)',
              padding: '1rem 1.25rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              boxShadow: 'var(--shadow-lg)',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: isActive ? '#0251B0' : 'var(--text-main)',
                  backgroundColor: isActive ? '#E6EDEF' : 'transparent',
                  textDecoration: 'none',
                })}
              >
                {link.highlight && <Sparkles size={16} color="#0251B0" />}
                {link.name}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      {/* Responsive Breakpoint Styles */}
      <style>{`
        .navbar-container {
          max-width: 1440px !important;
          padding-left: 1.5rem !important;
          padding-right: 1.5rem !important;
        }

        .nav-link-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 600;
          white-space: nowrap;
          text-decoration: none;
          color: var(--primary-light);
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .nav-link-item:hover {
          color: #0251B0;
          background-color: #E6EDEF;
        }

        .nav-link-item.active {
          color: #0251B0 !important;
          background-color: #E6EDEF !important;
          font-weight: 700 !important;
        }

        .nav-link-item.highlight-link {
          background-color: #D1FF42;
          color: #0251B0;
        }

        .nav-link-item.highlight-link:hover {
          background-color: #C2F230;
        }

        .nav-link-item.highlight-link.active {
          background-color: #D1FF42 !important;
          color: #013A80 !important;
        }

        /* Medium desktop screens: adapt padding and font-size cleanly */
        @media (max-width: 1220px) {
          .nav-link-item {
            padding: 7px 9px !important;
            font-size: 0.82rem !important;
            gap: 3px !important;
          }
        }

        /* Tablet / Mobile breakpoint: smooth drawer transition */
        @media (max-width: 1040px) {
          .desktop-nav-links {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .top-bar-timing, .top-bar-divider {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
