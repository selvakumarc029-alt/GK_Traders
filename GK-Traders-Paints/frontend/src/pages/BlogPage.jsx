import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts } from '../services/api';
import { handleImageError } from '../utils/imageFallback';
import {
  BookOpen,
  Search,
  Clock,
  User,
  ArrowRight,
  Tag,
  Sparkles,
} from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    async function loadBlogs() {
      try {
        setLoading(true);
        const params = {};
        if (selectedCategory !== 'All') params.category = selectedCategory;
        if (searchQuery.trim()) params.search = searchQuery.trim();

        const res = await getBlogPosts(params);
        if (res.data) {
          setPosts(res.data);
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      loadBlogs();
    }, 250);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  const categories = ['All', 'Colour Consultation', 'Waterproofing & Tech', 'Paint Selection'];

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '90vh', padding: '3.5rem 0 5rem' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <BookOpen size={16} /> Expert Knowledge Hub
          </span>
          <h1 className="section-title">Interior Design & Surface Care Guides</h1>
          <p className="section-desc">
            Master the art of paint finishes, color psychology for Indian illumination, and technical waterproofing remedies directly from certified coatings engineers.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div
          className="card"
          style={{
            padding: '1.25rem 1.5rem',
            backgroundColor: '#FFFFFF',
            marginBottom: '3rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  border: '1.5px solid',
                  borderColor: selectedCategory === cat ? 'var(--accent)' : 'var(--border-color)',
                  backgroundColor: selectedCategory === cat ? 'var(--accent)' : '#FFFFFF',
                  color: selectedCategory === cat ? '#FFFFFF' : 'var(--primary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
            <input
              type="text"
              placeholder="Search guides, sheen, dampness..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '2.5rem', fontSize: '0.875rem' }}
            />
            <Search
              size={16}
              color="#64748B"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
            />
          </div>
        </div>

        {/* Blog Post Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            Loading blog articles...
          </div>
        ) : posts.length === 0 ? (
          <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
            <h3>No articles found matching your query.</h3>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 310px), 1fr))',
              gap: '2.5rem',
            }}
          >
            {posts.map((post) => (
              <div
                key={post._id}
                className="card"
                style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}
              >
                <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => handleImageError(e, 'Interior Design')}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(15, 23, 42, 0.85)',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {post.category}
                  </div>
                </div>

                <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} /> {post.readTimeMinutes} min read
                      </span>
                      <span>•</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <User size={14} /> {post.author}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '10px', lineHeight: '1.35' }}>
                      {post.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                      {post.excerpt}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.25rem' }}>
                      {post.tags?.map((t, idx) => (
                        <span key={idx} style={{ fontSize: '0.75rem', backgroundColor: '#F1F5F9', color: '#475569', padding: '3px 8px', borderRadius: '4px' }}>
                          #{t}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="btn btn-outline"
                      style={{ width: '100%', padding: '0.65rem', fontSize: '0.9rem' }}
                    >
                      Read Full Article <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
