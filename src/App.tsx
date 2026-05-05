import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './lib/ThemeContext';
import { useStore } from './lib/store';
import TopBanner from './components/TopBanner';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import CategoryPage from './pages/CategoryPage';
import AuthorPage from './pages/AuthorPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SearchPage from './pages/SearchPage';
import ArchivePage from './pages/ArchivePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import StorePage from './pages/StorePage';
import PremiumProductsPage from './pages/PremiumProductsPage';
import PremiumProductDetailPage from './pages/PremiumProductDetailPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import FloatingStore from './components/FloatingStore';

function AppContent() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const { siteSettings } = useStore();

  // Dynamically update favicon and page title
  useEffect(() => {
    // Update favicon
    if (siteSettings.faviconUrl) {
      const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
      if (link) {
        link.href = siteSettings.faviconUrl;
        link.type = siteSettings.faviconUrl.endsWith('.svg') ? 'image/svg+xml' : 'image/png';
      }
    }
    // Update page title
    if (siteSettings.siteName) {
      document.title = `${siteSettings.siteName} | ${siteSettings.siteDescription?.substring(0, 40) || 'مجلة رقمية عربية'}`;
    }
  }, [siteSettings.faviconUrl, siteSettings.siteName, siteSettings.siteDescription]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <TopBanner onClose={() => setBannerVisible(false)} visible={bannerVisible} />
      <Header bannerVisible={bannerVisible} />
      <main className={bannerVisible ? 'pt-10 sm:pt-11' : ''}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/author" element={<AuthorPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          {/* Store */}
          <Route path="/store" element={<StorePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/store/premium" element={<PremiumProductsPage />} />
          <Route path="/store/premium/:slug" element={<PremiumProductDetailPage />} />
          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <FloatingStore />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}
