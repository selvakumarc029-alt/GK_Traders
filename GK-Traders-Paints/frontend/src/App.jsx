import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Toast from './components/common/Toast';
import ScrollToTop from './components/common/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ColourGalleryPage from './pages/ColourGalleryPage';
import PaintCalculatorPage from './pages/PaintCalculatorPage';
import OffersPage from './pages/OffersPage';
import ContactPage from './pages/ContactPage';
import AIRoomVisualizerPage from './pages/AIRoomVisualizerPage';
import VirtualPainterBookingPage from './pages/VirtualPainterBookingPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import DrFixitPage from './pages/DrFixitPage';
import AsianPaintsInteriorPage from './pages/AsianPaintsInteriorPage';
import NerolacInteriorPage from './pages/NerolacInteriorPage';
import NerolacExteriorPage from './pages/NerolacExteriorPage';
import NerolacWaterproofingPage from './pages/NerolacWaterproofingPage';

// ErrorBoundary Component to prevent any page crash
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Page render error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '6rem 1.5rem', minHeight: '60vh' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}>
            Something went wrong while loading this section.
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            {this.state.error?.message || 'An unexpected rendering error occurred.'}
          </p>
          <a href="/" className="btn btn-primary">
            Return to Home
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}

// 404 NotFound Component
function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '6rem 1.5rem', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
        Page Not Found
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Return to Home
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <Router>
        <ScrollToTop />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:slug" element={<ProductDetailPage />} />
                <Route path="/colours" element={<ColourGalleryPage />} />
                <Route path="/calculator" element={<PaintCalculatorPage />} />
                <Route path="/offers" element={<OffersPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/ai-visualizer" element={<AIRoomVisualizerPage />} />
                <Route path="/book-painter" element={<VirtualPainterBookingPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogDetailPage />} />
                <Route path="/dr-fixit" element={<DrFixitPage />} />
                <Route path="/dr-fixit/:mode" element={<DrFixitPage />} />
                <Route path="/asian-paints/interior-plain-finishes" element={<AsianPaintsInteriorPage />} />
                <Route path="/nerolac/interior-wall-paints" element={<NerolacInteriorPage />} />
                <Route path="/nerolac/exterior-wall-paints" element={<NerolacExteriorPage />} />
                <Route path="/nerolac/waterproofing" element={<NerolacWaterproofingPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </main>
          <Footer />
          <Toast />
        </div>
      </Router>
    </ShopProvider>
  );
}
