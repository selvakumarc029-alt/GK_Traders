import React, { useState } from 'react';
import { submitEnquiry } from '../services/api';
import { useShop } from '../context/ShopContext';
import { handleImageError } from '../utils/imageFallback';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

export default function ContactPage() {
  const { storeInfo, openWhatsApp, showToast } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Product Inquiry',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmittedSuccess(null);

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all mandatory fields before sending.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await submitEnquiry(formData);
      if (res.success) {
        setSubmittedSuccess(res.message);
        showToast('Enquiry submitted successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'General Product Inquiry',
          message: '',
        });
      } else {
        throw new Error(res.message || 'Submission failed');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to submit enquiry. Please check your network and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '90vh', padding: '3.5rem 0 5rem' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Direct Depot Connect</span>
          <h1 className="section-title">Get in Touch with G.K Traders Paints</h1>
          <p className="section-desc">
            Visit our physical tinting depot or reach out to our team of color advisors and waterproofing specialists for quick quotes and site consultations.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '2.5rem',
            marginBottom: '4rem',
          }}
        >
          {/* Left Column: Direct Contact Info */}
          <div>
            <div className="card" style={{ padding: '2.5rem', backgroundColor: '#FFFFFF', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                Store Information
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ padding: '10px', background: '#FFEDD5', borderRadius: '10px', color: 'var(--accent)', height: 'fit-content' }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--primary)', marginBottom: '2px' }}>
                      Retail Showroom & Warehouse
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                      {storeInfo.address}
                    </div>
                    <a
                      href={storeInfo.googleMapsUrl || 'https://maps.google.com/?q=12.9716,77.5946'}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: 'var(--accent)',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        marginTop: '6px',
                      }}
                    >
                      <ExternalLink size={14} /> Open in Google Maps
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ padding: '10px', background: '#DCFCE7', borderRadius: '10px', color: '#15803D', height: 'fit-content' }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--primary)', marginBottom: '2px' }}>
                      Phone & Orders
                    </div>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <a href="tel:7010499526" style={{ color: 'var(--accent)', fontWeight: '700', fontSize: '1rem' }}>
                        7010499526
                      </a>
                      <span style={{ color: 'var(--border-color)' }}>|</span>
                      <a href="tel:9123501787" style={{ color: 'var(--accent)', fontWeight: '700', fontSize: '1rem' }}>
                        9123501787
                      </a>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ padding: '10px', background: '#EFF6FF', borderRadius: '10px', color: '#1D4ED8', height: 'fit-content' }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--primary)', marginBottom: '2px' }}>
                      Email Inquiries
                    </div>
                    <a href={`mailto:${storeInfo.email}`} style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                      {storeInfo.email}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ padding: '10px', background: '#FEF3C7', borderRadius: '10px', color: '#B45309', height: 'fit-content' }}>
                    <Clock size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--primary)', marginBottom: '2px' }}>
                      Operating Timings
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      {storeInfo.timings}
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                <button
                  onClick={() => openWhatsApp('Hello G.K Traders Paints, I want an on-site consultation.')}
                  className="btn btn-whatsapp"
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  <MessageCircle size={20} /> Chat Instantly on WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div>
            <div className="card" style={{ padding: '2.5rem', backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                Send Us a Message
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
                Fill in your details and project requirements. Our paint technologist will call you back within 24 hours.
              </p>

              {submittedSuccess && (
                <div
                  style={{
                    backgroundColor: '#DCFCE7',
                    border: '1px solid #86EFAC',
                    color: '#166534',
                    padding: '1rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '1.5rem',
                  }}
                >
                  <CheckCircle size={20} />
                  <span style={{ fontSize: '0.9rem' }}>{submittedSuccess}</span>
                </div>
              )}

              {errorMessage && (
                <div
                  style={{
                    backgroundColor: '#FEE2E2',
                    border: '1px solid #FCA5A5',
                    color: '#991B1B',
                    padding: '1rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '1.5rem',
                  }}
                >
                  <AlertCircle size={20} />
                  <span style={{ fontSize: '0.9rem' }}>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Kumar"
                    className="form-control"
                  />
                </div>

                <div className="responsive-2col" style={{ gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. ramesh@example.com"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9845012345"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Inquiry Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="General Product Inquiry">General Product Inquiry</option>
                    <option value="Waterproofing Technical Consultation">Waterproofing Technical Consultation</option>
                    <option value="Wholesale & Contractor Bulk Pricing">Wholesale & Contractor Bulk Pricing</option>
                    <option value="Computerised Colour Shade Tinting">Computerised Colour Shade Tinting</option>
                    <option value="Virtual Painter Booking Query">Virtual Painter Booking Query</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Message / Requirements *</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Specify the rooms, surface areas, or preferred brand..."
                    className="form-control"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  {submitting ? 'Submitting to Database...' : (
                    <>
                      <Send size={18} /> Submit Enquiry
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Official Brand Card Feature */}
        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', marginBottom: '2.5rem', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <div style={{ borderRadius: '14px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)' }}>
              <img
                src="/gk-traders-banner.jpg"
                alt="G.K Traders Paints Official Identity"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                onError={(e) => handleImageError(e, 'G.K Traders Paints')}
              />
            </div>
            <div>
              <span className="section-tag">Authentic Paint Superstore</span>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--primary)', marginBottom: '8px' }}>
                YOUR TRUST. OUR PRIDE.
              </h3>
              <p style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: '600', fontSize: '1.1rem', marginBottom: '1rem' }}>
                "Colouring your world with trust"
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                Direct factory-sealed paints, computerised shade tinting, and dampness diagnosis for Srivilliputhur, Sivakasi, Rajapalayam and surrounding areas.
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a href="tel:7010499526" className="btn btn-primary" style={{ padding: '0.65rem 1.25rem' }}>
                  <Phone size={16} /> Call 7010499526
                </a>
                <button onClick={() => openWhatsApp('Hello G.K Traders Paints, I want an on-site consultation.')} className="btn btn-whatsapp" style={{ padding: '0.65rem 1.25rem' }}>
                  <MessageCircle size={16} /> WhatsApp Quote
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps Interactive Section */}
        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>Showroom & Depot Location</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                15/5C Rajiv Gandhi Nagar, Sivakasi Main Road, Opp to Cotton Research Centre, Srivilliputhur – 626125
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Cotton+Research+Centre+Sivakasi+Main+Road+Srivilliputhur+626125"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              <ExternalLink size={16} /> Open Full Map
            </a>
          </div>

          <div style={{ width: '100%', height: '380px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <iframe
              title="G.K Traders Paints Srivilliputhur Google Maps"
              src="https://maps.google.com/maps?q=Cotton+Research+Centre+Sivakasi+Main+Road+Srivilliputhur+626125&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
