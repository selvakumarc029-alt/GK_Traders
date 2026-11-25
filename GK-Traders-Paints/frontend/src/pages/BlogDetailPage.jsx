import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBlogPostBySlug } from '../services/api';
import {
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Share2,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { handleImageError } from '../utils/imageFallback';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { showToast } = useShop();

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        setError(null);
        const res = await getBlogPostBySlug(slug);
        if (res.data) {
          setPost(res.data);
          if (res.relatedPosts) {
            setRelatedPosts(res.relatedPosts);
          }
        }
      } catch (err) {
        setError(err.message || 'Article not found');
      } finally {
        setLoading(false);
      }
    }
    loadPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Article URL copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div style={{ color: 'var(--text-muted)' }}>Loading article...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2>Article Not Found</h2>
        <Link to="/blog" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '90vh', padding: '3rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
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
            marginBottom: '1.5rem',
          }}
        >
          <ArrowLeft size={16} /> Back to Articles
        </button>

        <div className="card" style={{ padding: '2.5rem', backgroundColor: '#FFFFFF', marginBottom: '3rem' }}>
          <span className="badge badge-brand" style={{ marginBottom: '1rem' }}>
            {post.category}
          </span>

          <h1 style={{ fontSize: '2.4rem', color: 'var(--primary)', marginBottom: '1rem', lineHeight: '1.25' }}>
            {post.title}
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '1.5rem',
              borderBottom: '1px solid var(--border-color)',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <User size={16} /> {post.author}
              </span>
              <span>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={16} /> {post.readTimeMinutes} min read
              </span>
              <span>•</span>
              <span>{new Date(post.publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>

            <button
              onClick={handleShare}
              className="btn btn-outline"
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
            >
              <Share2 size={14} /> Share
            </button>
          </div>

          <div style={{ height: '380px', borderRadius: '16px', overflow: 'hidden', marginBottom: '2.5rem' }}>
            <img
              src={post.image}
              alt={post.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => handleImageError(e, 'Interior Design')}
            />
          </div>

          <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#334155', whiteSpace: 'pre-line' }}>
            {post.content}
          </div>

          <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {post.tags?.map((t, idx) => (
              <span key={idx} style={{ backgroundColor: '#F1F5F9', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', color: '#475569', fontWeight: '600' }}>
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>
              Related Design Guides
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {relatedPosts.map((rel) => (
                <div key={rel._id} className="card" style={{ padding: '1.25rem', backgroundColor: '#FFFFFF' }}>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--primary)', marginBottom: '6px' }}>{rel.title}</h4>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1rem', lineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {rel.excerpt}
                  </p>
                  <Link to={`/blog/${rel.slug}`} style={{ color: 'var(--accent)', fontWeight: '700', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Read Guide <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
