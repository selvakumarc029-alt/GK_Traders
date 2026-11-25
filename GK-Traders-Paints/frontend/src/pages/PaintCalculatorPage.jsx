import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import {
  Calculator,
  Layers,
  Sparkles,
  RotateCcw,
  Calendar,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

export default function PaintCalculatorPage() {
  const [searchParams] = useSearchParams();

  // Inputs
  const [unit, setUnit] = useState('feet'); // feet or meters
  const [length, setLength] = useState(14);
  const [width, setWidth] = useState(12);
  const [height, setHeight] = useState(10);
  const [doors, setDoors] = useState(1);
  const [windows, setWindows] = useState(2);
  const [coats, setCoats] = useState(2);
  const [coveragePerLitre, setCoveragePerLitre] = useState(130);
  const [pricePerLitre, setPricePerLitre] = useState(550);
  const [selectedProductName, setSelectedProductName] = useState('Luxury Interior Emulsion');

  // Error state
  const [errorMessage, setErrorMessage] = useState('');

  // Check URL query parameters for pre-filling from product page
  useEffect(() => {
    const prod = searchParams.get('product');
    const cov = searchParams.get('coverage');
    const prc = searchParams.get('price');

    if (prod) setSelectedProductName(prod);
    if (cov && !isNaN(cov)) setCoveragePerLitre(Number(cov));
    if (prc && !isNaN(prc)) setPricePerLitre(Number(prc));
  }, [searchParams]);

  // Validation
  const isValid =
    length > 0 &&
    width > 0 &&
    height > 0 &&
    doors >= 0 &&
    windows >= 0 &&
    coats >= 1 &&
    coveragePerLitre > 0 &&
    pricePerLitre >= 0;

  // Real Mathematical Calculations
  // Standard door area ≈ 21 sq.ft (7ft x 3ft)
  // Standard window area ≈ 15 sq.ft (5ft x 3ft)
  const DOOR_AREA_SQFT = unit === 'feet' ? 21 : 1.95;
  const WINDOW_AREA_SQFT = unit === 'feet' ? 15 : 1.4;

  const perimeter = 2 * (Number(length) + Number(width));
  const grossWallArea = perimeter * Number(height);
  const totalDeduction = Number(doors) * DOOR_AREA_SQFT + Number(windows) * WINDOW_AREA_SQFT;
  const netWallArea = Math.max(0, grossWallArea - totalDeduction);

  // Litres = (Net Area * Coats) / Coverage
  const requiredLitres = coveragePerLitre > 0 ? (netWallArea * Number(coats)) / Number(coveragePerLitre) : 0;
  const estimatedCost = requiredLitres * Number(pricePerLitre);

  // Recommended can package configuration breakdown
  const cans20L = Math.floor(requiredLitres / 20);
  const remAfter20 = requiredLitres % 20;
  const cans10L = Math.floor(remAfter20 / 10);
  const remAfter10 = remAfter20 % 10;
  const cans4L = Math.floor(remAfter10 / 4);
  const remAfter4 = remAfter10 % 4;
  const cans1L = Math.ceil(remAfter4);

  const resetToDefault = () => {
    setLength(14);
    setWidth(12);
    setHeight(10);
    setDoors(1);
    setWindows(2);
    setCoats(2);
    setCoveragePerLitre(130);
    setPricePerLitre(550);
    setErrorMessage('');
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '90vh', padding: '3.5rem 0 5rem' }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-tag">
            <Calculator size={16} /> Accurate Paint Estimator
          </span>
          <h1 className="section-title">Precision Paint Quantity & Cost Calculator</h1>
          <p className="section-desc">
            Calculate exact wall surface areas, deduct doors and windows, and determine required paint cans and budget estimates based on genuine manufacturer coverage metrics.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '2rem',
          }}
        >
          {/* Input Form Column */}
          <div className="card" style={{ padding: '2.25rem', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>Room Dimensions & Openings</h3>
              <button
                onClick={resetToDefault}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent)',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <RotateCcw size={14} /> Reset Defaults
              </button>
            </div>

            {/* Units Toggle */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Measurement Unit</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['feet', 'meters'].map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '8px',
                      border: '1.5px solid',
                      borderColor: unit === u ? 'var(--accent)' : 'var(--border-color)',
                      backgroundColor: unit === u ? '#FFEDD5' : '#FFFFFF',
                      color: unit === u ? 'var(--accent)' : 'var(--primary)',
                      fontWeight: '700',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                    }}
                  >
                    {u === 'feet' ? 'Feet (ft)' : 'Meters (m)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Room Dimensions Inputs */}
            <div className="responsive-3col" style={{ marginBottom: '1.25rem' }}>
              <div>
                <label className="form-label">Length ({unit === 'feet' ? 'ft' : 'm'})</label>
                <input
                  type="number"
                  min="1"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="form-control"
                />
              </div>
              <div>
                <label className="form-label">Width ({unit === 'feet' ? 'ft' : 'm'})</label>
                <input
                  type="number"
                  min="1"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="form-control"
                />
              </div>
              <div>
                <label className="form-label">Height ({unit === 'feet' ? 'ft' : 'm'})</label>
                <input
                  type="number"
                  min="1"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            {/* Doors & Windows Deductions */}
            <div className="responsive-2col" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label className="form-label">No. of Doors (dries out 21 sqft)</label>
                <input
                  type="number"
                  min="0"
                  value={doors}
                  onChange={(e) => setDoors(Math.max(0, Number(e.target.value)))}
                  className="form-control"
                />
              </div>
              <div>
                <label className="form-label">No. of Windows (dries out 15 sqft)</label>
                <input
                  type="number"
                  min="0"
                  value={windows}
                  onChange={(e) => setWindows(Math.max(0, Number(e.target.value)))}
                  className="form-control"
                />
              </div>
            </div>

            {/* Coats & Coverage Specification */}
            <div className="responsive-2col" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label className="form-label">Number of Coats</label>
                <select
                  value={coats}
                  onChange={(e) => setCoats(Number(e.target.value))}
                  className="form-control"
                >
                  <option value={1}>1 Coat (Touch-up / Primer)</option>
                  <option value={2}>2 Coats (Standard Recommendation)</option>
                  <option value={3}>3 Coats (Dark to Light Shade Shift)</option>
                </select>
              </div>
              <div>
                <label className="form-label">Coverage (Sq. Ft. / Litre)</label>
                <input
                  type="number"
                  min="20"
                  value={coveragePerLitre}
                  onChange={(e) => setCoveragePerLitre(Math.max(1, Number(e.target.value)))}
                  className="form-control"
                />
              </div>
            </div>

            {/* Price Per Litre */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Paint Formulation Price per Litre (₹)</label>
              <input
                type="number"
                min="0"
                value={pricePerLitre}
                onChange={(e) => setPricePerLitre(Math.max(0, Number(e.target.value)))}
                className="form-control"
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Currently configured for: {selectedProductName}
              </span>
            </div>

            <div
              style={{
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '0.8rem',
                color: '#1E40AF',
                display: 'flex',
                gap: '8px',
              }}
            >
              <HelpCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                Standard luxury emulsions yield 130 - 150 sq.ft per litre for 1 coat, and 65 - 75 sq.ft for 2 coats.
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Main Result Card */}
            <div
              className="card"
              style={{
                padding: '2.25rem',
                backgroundColor: '#FFFFFF',
                borderTop: '5px solid var(--accent)',
              }}
            >
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                Calculation Summary
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ backgroundColor: '#F8FAFC', padding: '1.25rem', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Total Wall Area</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                    {grossWallArea.toFixed(1)} {unit === 'feet' ? 'sq.ft' : 'sq.m'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    Deductions: -{totalDeduction.toFixed(1)} {unit === 'feet' ? 'sq.ft' : 'sq.m'}
                  </div>
                </div>

                <div style={{ backgroundColor: '#F8FAFC', padding: '1.25rem', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Net Paintable Area</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}>
                    {netWallArea.toFixed(1)} {unit === 'feet' ? 'sq.ft' : 'sq.m'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    Target coats: {coats} coats
                  </div>
                </div>
              </div>

              {/* Total Litres & Price Box */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                  color: '#FFFFFF',
                  padding: '1.75rem',
                  borderRadius: '16px',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Required Paint Quantity</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F97316', fontFamily: 'var(--font-heading)' }}>
                      {requiredLitres.toFixed(1)}{' '}
                      <span style={{ fontSize: '1.25rem', color: '#FFFFFF' }}>Litres</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Estimated Material Cost</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: '#10B981', fontFamily: 'var(--font-heading)' }}>
                      ₹{estimatedCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                </div>

                {/* Packaging Breakdown Recommendation */}
                <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.15)', fontSize: '0.85rem' }}>
                  <span style={{ color: '#FDE68A', fontWeight: '700' }}>Recommended Can Packaging: </span>
                  {[
                    cans20L > 0 && `${cans20L}x 20L drum`,
                    cans10L > 0 && `${cans10L}x 10L bucket`,
                    cans4L > 0 && `${cans4L}x 4L can`,
                    cans1L > 0 && `${cans1L}x 1L can`,
                  ]
                    .filter(Boolean)
                    .join(' + ') || '1x 1L can'}
                </div>
              </div>

              {/* Direct Link to Book Virtual Painter */}
              <Link
                to={`/book-painter?area=${netWallArea.toFixed(0)}&service=${encodeURIComponent('Interior Repaint')}`}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem', fontSize: '1rem' }}
              >
                <Calendar size={18} /> Book Painter for this Area ({netWallArea.toFixed(0)} sq.ft)
              </Link>
            </div>

            {/* Professional Disclaimer Notice */}
            <div
              style={{
                backgroundColor: '#FFFBEB',
                border: '1px solid #FDE68A',
                borderRadius: '12px',
                padding: '1.25rem',
                fontSize: '0.8125rem',
                color: '#92400E',
                lineHeight: '1.5',
              }}
            >
              <strong>Important Client Estimation Note:</strong> All calculation metrics are technical approximations. Actual coverage fluctuates based on substrate texture, plaster porosity, ambient moisture, application method (spray vs roller), and color depth difference. We recommend ordering an additional 10% reserve for future touch-ups.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
