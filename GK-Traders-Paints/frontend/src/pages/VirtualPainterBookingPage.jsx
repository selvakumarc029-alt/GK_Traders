import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { bookAppointment } from '../services/api';
import { useShop } from '../context/ShopContext';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function VirtualPainterBookingPage() {
  const [searchParams] = useSearchParams();
  const prefilledArea = searchParams.get('area') || '';
  const prefilledService = searchParams.get('service') || 'Complete Home Painting';

  const { showToast } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTimeSlot: 'Morning (9 AM - 12 PM)',
    serviceType: prefilledService,
    address: '',
    city: 'Srivilliputhur',
    pincode: '626125',
    estimatedAreaSqFt: prefilledArea,
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.preferredDate ||
      !formData.address.trim() ||
      !formData.pincode.trim()
    ) {
      setError('Please fill in all mandatory booking fields.');
      return;
    }

    try {
      setLoading(true);
      const res = await bookAppointment(formData);
      if (res.success && res.data) {
        setConfirmedBooking(res.data);
        showToast(res.message);
      } else {
        throw new Error(res.message || 'Booking submission failed');
      }
    } catch (err) {
      setError(err.message || 'Unable to record appointment. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '90vh', padding: '3.5rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        <div className="section-header">
          <span className="section-tag">
            <Calendar size={16} /> Certified Applicator Network
          </span>
          <h1 className="section-title">Book a Virtual Painter & Site Consultation</h1>
          <p className="section-desc">
            Schedule an on-site visit by certified paint technicians for digital laser wall measurement, dampness assessment, and color preview.
          </p>
        </div>

        {confirmedBooking ? (
          <div
            className="card"
            style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              backgroundColor: '#FFFFFF',
              borderTop: '5px solid #059669',
              animation: 'fadeIn 0.3s ease',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#DCFCE7',
                color: '#15803D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}
            >
              <CheckCircle size={36} />
            </div>

            <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
              Consultation Appointment Confirmed!
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2rem' }}>
              Your site visit has been scheduled. Our senior paint supervisor will contact you shortly to confirm technician arrival.
            </p>

            <div
              style={{
                maxWidth: '520px',
                margin: '0 auto 2.5rem',
                backgroundColor: '#F8FAFC',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Reference ID:</span>
                <span style={{ fontWeight: '800', fontFamily: 'monospace', color: 'var(--primary)' }}>
                  {confirmedBooking._id.slice(-6).toUpperCase()}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Customer Name:</span>
                <span style={{ fontWeight: '700', color: 'var(--primary)' }}>{confirmedBooking.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Scheduled Date:</span>
                <span style={{ fontWeight: '700', color: 'var(--accent)' }}>
                  {new Date(confirmedBooking.preferredDate).toLocaleDateString('en-IN', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Time Slot:</span>
                <span style={{ fontWeight: '600' }}>{confirmedBooking.preferredTimeSlot}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Service:</span>
                <span style={{ fontWeight: '600' }}>{confirmedBooking.serviceType}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/" className="btn btn-primary">
                Return to Home
              </Link>
              <button
                onClick={() => setConfirmedBooking(null)}
                className="btn btn-outline"
              >
                Book Another Visit
              </button>
            </div>
          </div>
        ) : (
          <div className="card" style={{ padding: '2.5rem', backgroundColor: '#FFFFFF' }}>
            {error && (
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
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '1.25rem' }}>
                1. Customer Contact Details
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Anand Sharma"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. anand@gmail.com"
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

              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '1.25rem' }}>
                2. Appointment Schedule & Service
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div className="form-group">
                  <label className="form-label">Preferred Date *</label>
                  <input
                    type="date"
                    name="preferredDate"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Time Slot *</label>
                  <select
                    name="preferredTimeSlot"
                    value={formData.preferredTimeSlot}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 3 PM)">Afternoon (12 PM - 3 PM)</option>
                    <option value="Evening (3 PM - 7 PM)">Evening (3 PM - 7 PM)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Service Type *</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="Complete Home Painting">Complete Home Painting</option>
                    <option value="Interior Repaint">Interior Repaint</option>
                    <option value="Exterior Weatherproofing">Exterior Weatherproofing</option>
                    <option value="Waterproofing Consultation">Waterproofing Consultation</option>
                    <option value="Wood & Metal Polishing">Wood & Metal Polishing</option>
                    <option value="Colour Consultation & Measurement">Colour Consultation & Measurement</option>
                  </select>
                </div>
              </div>

              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '1.25rem' }}>
                3. Site Location & Requirements
              </h3>
              <div className="responsive-booking-3col" style={{ marginBottom: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Address *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Flat / House No, Apartment, Street"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="e.g. 560001"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="responsive-booking-2col" style={{ marginBottom: '2rem' }}>
                <div className="form-group">
                  <label className="form-label">Est. Area (Sq. Ft.)</label>
                  <input
                    type="number"
                    name="estimatedAreaSqFt"
                    value={formData.estimatedAreaSqFt}
                    onChange={handleChange}
                    placeholder="e.g. 1200"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Special Notes / Surface Issues</label>
                  <input
                    type="text"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="e.g. Ceiling seepage in bedroom, urgent painting required"
                    className="form-control"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.9rem', fontSize: '1.05rem' }}
              >
                {loading ? 'Confirming Appointment...' : (
                  <>
                    <Calendar size={20} /> Confirm Site Visit Booking
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
