import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getProducts, getCategories, getBrands } from '../services/api';
import { useShop } from '../context/ShopContext';
import { handleImageError } from '../utils/imageFallback';
import {
  Search,
  Filter,
  Star,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Check,
  SlidersHorizontal,
  RefreshCw,
} from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const brandParam = searchParams.get('brand') || 'All';
  const sortParam = searchParams.get('sort') || 'featured';

  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedBrand, setSelectedBrand] = useState(brandParam);
  const [selectedSort, setSelectedSort] = useState(sortParam);

  const { openWhatsApp } = useShop();

  useEffect(() => {
    const cat = searchParams.get('category') || 'All';
    const br = searchParams.get('brand') || 'All';
    setSelectedCategory(cat);
    setSelectedBrand(br);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [searchParams]);

  useEffect(() => {
    async function fetchFilterData() {
      try {
        const [catRes, brandRes] = await Promise.all([getCategories(), getBrands()]);
        if (catRes.data) setCategories(catRes.data);
        if (brandRes.data) setBrands(brandRes.data);
      } catch (err) {
        console.warn('Filter meta load error:', err);
      }
    }
    fetchFilterData();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const params = {};
        if (selectedCategory && selectedCategory !== 'All') params.category = selectedCategory;
        if (selectedBrand && selectedBrand !== 'All') params.brand = selectedBrand;
        if (searchInput.trim()) params.search = searchInput.trim();
        if (selectedSort) params.sort = selectedSort;

        const res = await getProducts(params);
        if (res.data) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      loadProducts();
    }, 250);

    return () => clearTimeout(timer);
  }, [selectedCategory, selectedBrand, searchInput, selectedSort]);

  const handleCategoryChange = (catName) => {
    setSelectedCategory(catName);
    const newParams = new URLSearchParams(searchParams);
    if (catName === 'All') newParams.delete('category');
    else newParams.set('category', catName);
    setSearchParams(newParams);
  };

  const handleBrandChange = (brandName) => {
    setSelectedBrand(brandName);
    const newParams = new URLSearchParams(searchParams);
    if (brandName === 'All') newParams.delete('brand');
    else newParams.set('brand', brandName);
    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSearchInput('');
    setSelectedSort('featured');
    setSearchParams({});
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '90vh', padding: '3rem 0 5rem' }}>
      <div className="container">
        {/* Page Title & Search Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <span className="section-tag">Direct From Authorized Distributors</span>
              <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                {selectedCategory !== 'All' ? `${selectedCategory}` : 'Architectural Paints & Coatings'}
              </h1>
              <p style={{ color: 'var(--text-muted)' }}>
                Showing {products.length} verified products {selectedCategory !== 'All' ? `in ${selectedCategory}` : 'available with computerised tinting'} at G.K Traders Paints.
              </p>
            </div>

            {/* Live Search Bar */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
              <input
                type="text"
                placeholder="Search products, brands, sheen..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '2.75rem', borderRadius: 'var(--radius-full)' }}
              />
              <Search
                size={18}
                color="#64748B"
                style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          {/* Quick Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '8px',
            }}
          >
            {['All', 'Interior Paints', 'Exterior Paints', 'Waterproofing', 'Wood Coatings', 'Metal Paints', 'Putty', 'Primer', 'Brushes & Tools'].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    border: '1.5px solid',
                    borderColor: selectedCategory === cat ? 'var(--accent)' : 'var(--border-color)',
                    backgroundColor: selectedCategory === cat ? 'var(--accent)' : '#FFFFFF',
                    color: selectedCategory === cat ? '#FFFFFF' : 'var(--primary)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </div>

        {/* Content Layout with Brand Sidebar & Product Grid */}
        <div className="explorer-layout">
          {/* Sidebar Filters */}
          <div className="filters-sidebar explorer-sidebar" style={{ width: '100%' }}>
            <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: '100px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Filter size={18} /> Filters
                </h4>
                <button
                  onClick={resetFilters}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent)',
                    fontSize: '0.8125rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <RefreshCw size={12} /> Reset
                </button>
              </div>

              {/* Brand Filter */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Brand
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {['All', 'Asian Paints', 'Berger', 'Nerolac', 'Indigo', 'Birla White', 'Dr. Fixit'].map((brand) => (
                    <label
                      key={brand}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.875rem',
                        color: selectedBrand === brand ? 'var(--accent)' : 'var(--text-main)',
                        fontWeight: selectedBrand === brand ? '700' : '500',
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="radio"
                        name="brandFilter"
                        checked={selectedBrand === brand}
                        onChange={() => handleBrandChange(brand)}
                        style={{ accentColor: 'var(--accent)' }}
                      />
                      {brand}
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort By Filter */}
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Sort By
                </label>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="form-control"
                  style={{ fontSize: '0.875rem', padding: '0.5rem' }}
                >
                  <option value="featured">Featured & Newest</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div style={{ minWidth: 0 }}>
            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card" style={{ height: '380px' }}>
                    <div className="skeleton" style={{ height: '200px' }}></div>
                    <div style={{ padding: '1.25rem' }}>
                      <div className="skeleton" style={{ height: '20px', width: '60%', marginBottom: '10px' }}></div>
                      <div className="skeleton" style={{ height: '16px', width: '90%', marginBottom: '10px' }}></div>
                      <div className="skeleton" style={{ height: '30px', width: '40%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div
                className="card"
                style={{
                  padding: '4rem 2rem',
                  textAlign: 'center',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨</div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  No Products Match Your Criteria
                </h3>
                <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
                  We couldn’t find products matching your filters. Try clearing some selections or search for general terms like "emulsion", "primer", or "waterproofing".
                </p>
                <button onClick={resetFilters} className="btn btn-primary">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
                  gap: '1.75rem',
                }}
              >
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="card"
                    style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                  >
                    <div style={{ position: 'relative', height: '210px', backgroundColor: '#F8FAFC' }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => handleImageError(e, product.category)}
                      />
                      <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px' }}>
                        <span className="badge badge-brand">{product.brand}</span>
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          left: '10px',
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          boxShadow: 'var(--shadow-sm)',
                        }}
                      >
                        <Star size={12} color="#F59E0B" fill="#F59E0B" /> {product.rating} ({product.numReviews})
                      </div>
                    </div>

                    <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                          {product.category}
                        </div>
                        <h3 style={{ fontSize: '1.15rem', color: 'var(--primary)', marginBottom: '8px', lineHeight: '1.3' }}>
                          {product.name}
                        </h3>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1rem', lineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {product.description}
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '1rem' }}>
                          {product.finishes?.map((f, fIdx) => (
                            <span key={fIdx} style={{ fontSize: '0.7rem', backgroundColor: '#E2E8F0', padding: '2px 6px', borderRadius: '4px', color: '#334155', fontWeight: '600' }}>
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            justifyContent: 'space-between',
                            paddingTop: '0.75rem',
                            borderTop: '1px solid var(--border-color)',
                            marginBottom: '1rem',
                          }}
                        >
                          <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Price per {product.unit}</span>
                            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                              ₹{product.price}
                            </div>
                          </div>
                          <span className="badge badge-instock">In Stock</span>
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <Link
                            to={`/products/${product.slug}`}
                            className="btn btn-outline"
                            style={{ flex: 1, padding: '0.55rem', fontSize: '0.85rem' }}
                          >
                            Details & Packs
                          </Link>
                          <button
                            onClick={() => openWhatsApp(`Hello G.K Traders Paints, I want to purchase ${product.name}.`)}
                            className="btn btn-whatsapp"
                            style={{ padding: '0.55rem 0.85rem' }}
                            title="Instant Order Quote"
                          >
                            <MessageCircle size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
