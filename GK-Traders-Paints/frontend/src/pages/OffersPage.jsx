import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOffers } from '../services/api';
import { useShop } from '../context/ShopContext';
import { handleImageError } from '../utils/imageFallback';
import {
  Tag,
  Copy,
  Check,
  Calendar,
  ShieldAlert,
  ArrowRight,
  MessageCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);
  const [selectedOfferTerms, setSelectedOfferTerms] = useState(null);

  const { openWhatsApp, showToast } = useShop();

  useEffect(() => {
    async function loadOffers() {
      try {
        setLoading(true);
        const res = await getOffers(true); // include validity check
        if (res.data) {
          setOffers(res.data);
        }
      } catch (err) {
        console.error('Error fetching offers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadOffers();
  }, []);

  const copyCouponCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Coupon code "${code}" copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const isExpired = (validTill) => {
    return new Date(validTill) < new Date();
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '90vh', padding: '3.5rem 0 5rem' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <Tag size={16} /> Exclusive Discounts & Bundles
          </span>
          <h1 className="section-title">Special Offers & Festive Packages</h1>
          <p className="section-desc">
            Maximize your project savings with exclusive seasonal promotions, full-home repainting packages, and free on-site diagnostic visits.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            Loading active promotional packages...
          </div>
        ) : offers.length === 0 ? (
          <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
            <h3>No active promotions at this time.</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
              Check back soon or chat directly with our store team for custom wholesale contractor tiers.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 310px), 1fr))',
              gap: '2.5rem',
            }}
          >
            {offers.map((offer) => {
              const expired = isExpired(offer.validTill);

              return (
                <div
                  key={offer._id}
                  className="card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#FFFFFF',
                    opacity: expired ? 0.65 : 1,
                    position: 'relative',
                  }}
                >
                  <div style={{ position: 'relative', height: '220px' }}>
                    <img
                      src={offer.image}
                      alt={offer.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => handleImageError(e, 'Offers')}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '14px',
                        left: '14px',
                        backgroundColor: expired ? '#64748B' : '#DC2626',
                        color: '#FFFFFF',
                        fontWeight: '800',
                        fontSize: '0.9rem',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        boxShadow: 'var(--shadow-md)',
                      }}
                    >
                      {expired ? 'EXPIRED' : offer.discount}
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        backgroundColor: 'rgba(15, 23, 42, 0.85)',
                        color: '#FFFFFF',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Clock size={12} /> Valid till{' '}
                      {new Date(offer.validTill).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </div>

                  <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '6px' }}>
                        {offer.category}
                      </div>
                      <h3 style={{ fontSize: '1.35rem', color: 'var(--primary)', marginBottom: '8px', lineHeight: '1.3' }}>
                        {offer.title}
                      </h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                        {offer.description}
                      </p>
                    </div>

                    <div>
                      {/* Coupon Box */}
                      <div
                        style={{
                          backgroundColor: '#F8FAFC',
                          padding: '12px 16px',
                          borderRadius: '10px',
                          border: '1.5px dashed var(--border-color)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '1.25rem',
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Use Coupon Code</div>
                          <div style={{ fontSize: '1.2rem', fontWeight: '800', fontFamily: 'monospace', color: 'var(--primary)' }}>
                            {offer.code}
                          </div>
                        </div>

                        <button
                          onClick={() => copyCouponCode(offer.code)}
                          disabled={expired}
                          className="btn btn-outline"
                          style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
                        >
                          {copiedCode === offer.code ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                          {copiedCode === offer.code ? 'Copied' : 'Copy Code'}
                        </button>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => setSelectedOfferTerms(offer)}
                          className="btn btn-outline"
                          style={{ flex: 1, padding: '0.65rem', fontSize: '0.85rem' }}
                        >
                          Terms & Conditions
                        </button>
                        <button
                          onClick={() =>
                            openWhatsApp(
                              `Hello G.K Traders Paints, I want to avail the offer "${offer.title}" with coupon code ${offer.code}.`
                            )
                          }
                          disabled={expired}
                          className="btn btn-whatsapp"
                          style={{ padding: '0.65rem 1rem' }}
                          title="Claim via WhatsApp"
                        >
                          <MessageCircle size={18} /> Claim
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Terms and Conditions Modal */}
        {selectedOfferTerms && (
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
            onClick={() => setSelectedOfferTerms(null)}
          >
            <div
              className="card"
              style={{
                width: '100%',
                maxWidth: '520px',
                padding: '2rem',
                backgroundColor: '#FFFFFF',
                animation: 'fadeIn 0.25s ease',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary)', marginBottom: '8px' }}>
                Terms & Conditions: {selectedOfferTerms.title}
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: '700', marginBottom: '1.25rem' }}>
                Coupon Code: {selectedOfferTerms.code}
              </div>

              <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem', color: '#334155', marginBottom: '2rem' }}>
                {selectedOfferTerms.terms?.map((term, tIdx) => (
                  <li key={tIdx}>{term}</li>
                ))}
              </ul>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => {
                    copyCouponCode(selectedOfferTerms.code);
                    setSelectedOfferTerms(null);
                  }}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  <Copy size={16} /> Copy Code & Close
                </button>
                <button
                  onClick={() => setSelectedOfferTerms(null)}
                  className="btn btn-outline"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
