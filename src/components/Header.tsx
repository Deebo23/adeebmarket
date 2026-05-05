import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Moon, Sun, Menu, X, LogIn, LayoutDashboard, LogOut, ShoppingBag } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';
import { useStore } from '../lib/store';

export default function Header({ bannerVisible }: { bannerVisible?: boolean }) {
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { categories, isAdminAuth, logoutAdmin, siteSettings } = useStore();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => { logoutAdmin(); navigate('/'); };

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-xl shadow-lg' : 'backdrop-blur-sm'}`}
        style={{ background: 'var(--header-bg)', top: bannerVisible ? '40px' : '0' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              {siteSettings.logoUrl ? (
                <img src={siteSettings.logoUrl} alt={siteSettings.siteName} className="h-9 sm:h-11 w-auto" />
              ) : (
                <span className="text-xl font-bold text-gold" style={{ fontFamily: 'var(--font-heading)' }}>{siteSettings.siteName}</span>
              )}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" style={{ fontFamily: 'var(--font-heading)' }}>
              <Link to="/" className="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gold/10" style={{ color: 'var(--text-primary)' }}>{siteSettings.navHome}</Link>
              {categories.slice(0, 4).map(cat => (
                <Link key={cat.slug} to={`/category/${cat.slug}`} className="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gold/10" style={{ color: 'var(--text-secondary)' }}>{cat.name}</Link>
              ))}
              <Link to="/archive" className="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gold/10" style={{ color: 'var(--text-secondary)' }}>{siteSettings.navArchive}</Link>
              <Link to="/about" className="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gold/10" style={{ color: 'var(--text-secondary)' }}>{siteSettings.navAbout}</Link>
              <Link to="/contact" className="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gold/10" style={{ color: 'var(--text-secondary)' }}>{siteSettings.navContact}</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Store Button - Prominent Green */}
              <Link
                to="/store"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:shadow-lg hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  fontFamily: 'var(--font-heading)',
                  boxShadow: '0 2px 12px rgba(16, 185, 129, 0.25)',
                }}
              >
                <ShoppingBag size={16} />
                {siteSettings.navStore}
              </Link>

              {/* Mobile Store Icon */}
              <Link
                to="/store"
                className="sm:hidden p-2.5 rounded-xl text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                aria-label="المتجر"
              >
                <ShoppingBag size={18} />
              </Link>

              <button onClick={() => setSearchOpen(true)} className="p-2.5 rounded-xl transition-colors hover:bg-gold/10" style={{ color: 'var(--text-primary)' }} aria-label="بحث"><Search size={20} /></button>
              <button onClick={toggleTheme} className="p-2.5 rounded-xl transition-colors hover:bg-gold/10" style={{ color: 'var(--text-primary)' }} aria-label="تبديل المظهر">{isDark ? <Sun size={20} /> : <Moon size={20} />}</button>

              {/* Login / Admin */}
              {isAdminAuth ? (
                <div className="hidden sm:flex items-center gap-1.5">
                  <Link to="/admin" className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold bg-gold/10 text-gold hover:bg-gold/20 transition-all" style={{ fontFamily: 'var(--font-heading)' }}><LayoutDashboard size={16} />لوحة التحكم</Link>
                  <button onClick={handleLogout} className="p-2.5 rounded-xl transition-colors hover:bg-red-500/10 text-red-500" aria-label="خروج"><LogOut size={18} /></button>
                </div>
              ) : (
                <Link to="/admin/login" className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-navy text-white hover:bg-navy-light transition-all" style={{ fontFamily: 'var(--font-heading)' }}><LogIn size={16} />تسجيل الدخول</Link>
              )}

              {/* Mobile Login/Admin Icon */}
              {isAdminAuth ? (
                <Link to="/admin" className="sm:hidden p-2.5 rounded-xl bg-gold/10 text-gold"><LayoutDashboard size={20} /></Link>
              ) : (
                <Link to="/admin/login" className="sm:hidden p-2.5 rounded-xl bg-navy text-white"><LogIn size={20} /></Link>
              )}

              <button onClick={() => setIsMobileOpen(true)} className="lg:hidden p-2.5 rounded-xl transition-colors hover:bg-gold/10" style={{ color: 'var(--text-primary)' }}><Menu size={22} /></button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24" style={{ background: 'var(--overlay-bg)' }}>
          <div className="w-full max-w-2xl mx-4 animate-fade-in-up">
            <form onSubmit={handleSearch} className="relative">
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="ابحث عن مقالات، مواضيع، أو كلمات مفتاحية..." className="w-full px-6 py-5 rounded-2xl text-lg outline-none" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '2px solid var(--border-color)', fontFamily: 'var(--font-body)' }} autoFocus />
              <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-navy text-white hover:bg-navy-light transition-colors"><Search size={20} /></button>
            </form>
            <button onClick={() => setSearchOpen(false)} className="mt-4 mx-auto block px-6 py-2 rounded-xl text-sm" style={{ color: 'var(--text-muted)' }}>إغلاق (Esc)</button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" style={{ background: 'var(--overlay-bg)' }}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4">
              <Link to="/" onClick={() => setIsMobileOpen(false)}>{siteSettings.logoUrl ? <img src={siteSettings.logoUrl} alt={siteSettings.siteName} className="h-9 w-auto" /> : <span className="text-lg font-bold text-gold">{siteSettings.siteName}</span>}</Link>
              <button onClick={() => setIsMobileOpen(false)} className="p-2.5 rounded-xl" style={{ color: 'var(--text-primary)' }}><X size={24} /></button>
            </div>
            <nav className="flex flex-col gap-1 p-4 flex-1" style={{ fontFamily: 'var(--font-heading)' }}>
              {[
                { to: '/', label: siteSettings.navHome },
                ...categories.map(c => ({ to: `/category/${c.slug}`, label: c.name })),
                { to: '/archive', label: siteSettings.navArchive },
                { to: '/about', label: siteSettings.navAbout },
                { to: '/contact', label: siteSettings.navContact },
              ].map(item => (
                <Link key={item.to} to={item.to} onClick={() => setIsMobileOpen(false)} className="px-4 py-3 rounded-xl text-base font-medium transition-colors hover:bg-gold/10" style={{ color: 'var(--text-primary)' }}>{item.label}</Link>
              ))}

              {/* Store Button in Mobile Menu - Prominent */}
              <Link
                to="/store"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-base font-bold text-white mt-2 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                <ShoppingBag size={20} />
                {siteSettings.navStore}
              </Link>
            </nav>

            <div className="p-4" style={{ borderTop: '1px solid var(--border-color)' }}>
              {isAdminAuth ? (
                <div className="flex flex-col gap-2">
                  <Link to="/admin" onClick={() => setIsMobileOpen(false)} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold bg-gold/10 text-gold"><LayoutDashboard size={18} />لوحة التحكم</Link>
                  <button onClick={() => { handleLogout(); setIsMobileOpen(false); }} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-red-500/10 text-red-500"><LogOut size={18} />تسجيل الخروج</button>
                </div>
              ) : (
                <Link to="/admin/login" onClick={() => setIsMobileOpen(false)} className="flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-xl text-sm font-bold bg-navy text-white hover:bg-navy-light transition-colors"><LogIn size={18} />تسجيل الدخول</Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
