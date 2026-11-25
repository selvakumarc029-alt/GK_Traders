import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductBySlug } from '../services/api';
import { useShop } from '../context/ShopContext';
import { handleImageError } from '../utils/imageFallback';
import {
  ArrowLeft,
  Star,
  ShieldCheck,
  CheckCircle,
  Calculator,
  MessageCircle,
  Truck,
  RotateCcw,
  Sparkles,
  Award,
  Layers,
} from 'lucide-react';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { openWhatsApp, showToast } = useShop();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pack size selection
  const [selectedPack, setSelectedPack] = useState(null);
  // Quick product-specific estimator
  const [calcWallArea, setCalcWallArea] = useState(350);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError(null);
        const res = await getProductBySlug(slug);
        if (res.data) {
          setProduct(res.data);
          if (res.data.packSizes && res.data.packSizes.length > 0) {
            setSelectedPack(res.data.packSizes[0]);
          }
          if (res.relatedProducts) {
            setRelatedProducts(res.relatedProducts);
          }
        }
      } catch (err) {
        setError(err.message || 'Failed to load product details');
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>Loading product specifications...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}>
          Product Not Found
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          {error || 'The requested product formulation does not exist or has been relocated.'}
        </p>
        <Link to="/products" className="btn btn-primary">
          <ArrowLeft size={18} /> Return to Products
        </Link>
      </div>
    );
  }

  // Calculate required litres and coats for this specific product
  const coverage = product.coverageSqFtPerLitre || 130;
  const litresForTwoCoats = ((calcWallArea * 2) / coverage).toFixed(1);
  const estimatedCost = (litresForTwoCoats * product.price).toFixed(0);

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', padding: '2.5rem 0 5rem' }}>
      <div className="container">
        {/* Back Link Breadcrumb */}
        <div style={{ marginBottom: '1.5rem' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'none',
              border: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={16} /> Back to Products
          </button>
        </div>

        {/* Main Product Info Section */}
        <div
          className="card"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '3rem',
            padding: '2.5rem',
            backgroundColor: '#FFFFFF',
            marginBottom: '3rem',
          }}
        >
          {/* Left: Product Images */}
          <div>
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#F8FAFC',
                border: '1px solid var(--border-color)',
                marginBottom: '1rem',
                height: '420px',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => handleImageError(e, product.category)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
              <div style={{ padding: '0.75rem', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <ShieldCheck size={20} color="#C2410C" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)' }}>
                  {product.warrantyYears || 5} Years Warranty
                </div>
              </div>
              <div style={{ padding: '0.75rem', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <Truck size={20} color="#D97706" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)' }}>
                  Fast Delivery
                </div>
              </div>
              <div style={{ padding: '0.75rem', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <RotateCcw size={20} color="#059669" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)' }}>
                  Factory Sealed
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-brand">{product.brand}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>•</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{product.category}</span>
            </div>

            <h1 style={{ fontSize: '2.1rem', color: 'var(--primary)', marginBottom: '0.75rem', lineHeight: '1.2' }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F59E0B' }}>
                <Star size={18} fill="#F59E0B" />
                <span style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '0.95rem' }}>
                  {product.rating}
                </span>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                ({product.numReviews} customer reviews)
              </span>
              <span style={{ color: '#059669', fontWeight: '700', fontSize: '0.85rem', marginLeft: 'auto' }}>
                ✓ In Stock at Bengaluru Store
              </span>
            </div>

            {/* Price Box */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                padding: '1.25rem 1.5rem',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Retail Price</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                  ₹{selectedPack ? selectedPack.price : product.price}
                </span>
                <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                  / {selectedPack ? selectedPack.size : product.unit} (inclusive of GST)
                </span>
              </div>
            </div>

            {/* Pack Sizes */}
            {product.packSizes && product.packSizes.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Available Packaging Sizes</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {product.packSizes.map((pack, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPack(pack)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '1.5px solid',
                        borderColor: selectedPack?.size === pack.size ? 'var(--accent)' : 'var(--border-color)',
                        backgroundColor: selectedPack?.size === pack.size ? '#FFEDD5' : '#FFFFFF',
                        color: selectedPack?.size === pack.size ? 'var(--accent)' : 'var(--primary)',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                      }}
                    >
                      {pack.size} - ₹{pack.price}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              {product.description}
            </p>

            {/* Finishes */}
            {product.finishes && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Available Sheen / Finishes</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {product.finishes.map((f, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '4px 12px',
                        backgroundColor: '#F1F5F9',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        color: 'var(--primary)',
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features List */}
            <div style={{ marginBottom: '2rem' }}>
              <label className="form-label">Technical Highlights</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {product.features?.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#334155' }}>
                    <CheckCircle size={16} color="#059669" /> {feat}
                  </div>
                ))}
              </div>
            </div>

            {/* Order & WhatsApp CTAs */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() =>
                  openWhatsApp(
                    `Hello G.K Traders Paints, I want to purchase ${product.name} (${selectedPack ? selectedPack.size : 'Standard'}). Please provide delivery timeline & payment details.`
                  )
                }
                className="btn btn-whatsapp"
                style={{ flex: 1, padding: '0.85rem 1.5rem', fontSize: '1rem' }}
              >
                <MessageCircle size={20} /> Order on WhatsApp
              </button>
              <Link
                to={`/calculator?product=${encodeURIComponent(product.name)}&coverage=${product.coverageSqFtPerLitre || 130}&price=${product.price}`}
                className="btn btn-outline"
                style={{ padding: '0.85rem 1.5rem', fontSize: '1rem' }}
              >
                <Calculator size={18} /> Calculate Litres
              </Link>
            </div>
          </div>
        </div>

        {/* Mini In-Page Coverage Estimator */}
        <div
          className="card"
          style={{
            padding: '2rem',
            backgroundColor: '#FFFFFF',
            borderLeft: '4px solid var(--accent-gold)',
            marginBottom: '3rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <Layers size={22} color="#D97706" />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>
              Quick Paint Coverage Estimator for {product.name}
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
            <div>
              <label className="form-label">Enter Wall Area to Paint (Sq. Ft.)</label>
              <input
                type="number"
                value={calcWallArea}
                onChange={(e) => setCalcWallArea(Math.max(10, Number(e.target.value)))}
                className="form-control"
              />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Estimated Paint Required (2 Coats)</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                {litresForTwoCoats} Litres
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Based on {coverage} sq.ft / litre per coat
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Estimated Paint Material Budget</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}>
                ≈ ₹{estimatedCost}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Estimate only; varies with surface porosity
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>
              Similar Formulations You May Need
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {relatedProducts.map((rel) => (
                <div key={rel._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '160px', backgroundColor: '#F1F5F9' }}>
                    <img
                      src={rel.image}
                      alt={rel.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => handleImageError(e, rel.category)}
                    />
                  </div>
                  <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span className="badge badge-brand" style={{ marginBottom: '6px' }}>{rel.brand}</span>
                      <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '6px' }}>{rel.name}</h4>
                      <div style={{ fontWeight: '800', color: 'var(--primary)' }}>₹{rel.price} / {rel.unit}</div>
                    </div>
                    <Link
                      to={`/products/${rel.slug}`}
                      className="btn btn-outline"
                      style={{ marginTop: '1rem', padding: '0.5rem', width: '100%', fontSize: '0.85rem' }}
                    >
                      View Specs
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
