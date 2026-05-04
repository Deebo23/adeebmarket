import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';
import { categories } from '../lib/data';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-xl shadow-lg'
            : 'backdrop-blur-sm'
        }`}
        style={{ background: 'var(--header-bg)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img src="/images/logo.png" alt="أديب ماركت" className="h-9 sm:h-11 w-auto" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" style={{ fontFamily: 'var(--font-heading)' }}>
              <Link to="/" className="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gold/10" style={{ color: 'var(--text-primary)' }}>
                الرئيسية
              </Link>
              {categories.slice(0, 4).map(cat => (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gold/10"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {cat.name}
                </Link>
              ))}
              <Link to="/archive" className="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gold/10" style={{ color: 'var(--text-secondary)' }}>
                الأرشيف
              </Link>
              <Link to="/about" className="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gold/10" style={{ color: 'var(--text-secondary)' }}>
                من نحن
              </Link>
              <Link to="/contact" className="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gold/10" style={{ color: 'var(--text-secondary)' }}>
                تواصل معنا
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-xl transition-colors hover:bg-gold/10"
                style={{ color: 'var(--text-primary)' }}
                aria-label="بحث"
              >
                <Search size={20} />
              </button>
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl transition-colors hover:bg-gold/10"
                style={{ color: 'var(--text-primary)' }}
                aria-label="تبديل المظهر"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden p-2.5 rounded-xl transition-colors hover:bg-gold/10"
                style={{ color: 'var(--text-primary)' }}
                aria-label="القائمة"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24" style={{ background: 'var(--overlay-bg)' }}>
          <div className="w-full max-w-2xl mx-4 animate-fade-in-up">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="ابحث عن مقالات، مواضيع، أو كلمات مفتاحية..."
                className="w-full px-6 py-5 rounded-2xl text-lg outline-none"
                style={{
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  border: '2px solid var(--border-color)',
                  fontFamily: 'var(--font-body)',
                }}
                autoFocus
              />
              <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-navy text-white hover:bg-navy-light transition-colors">
                <Search size={20} />
              </button>
            </form>
            <button
              onClick={() => setSearchOpen(false)}
              className="mt-4 mx-auto block px-6 py-2 rounded-xl text-sm transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              إغلاق (Esc)
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" style={{ background: 'var(--overlay-bg)' }}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4">
              <Link to="/" onClick={() => setIsMobileOpen(false)}>
                <img src="/images/logo.png" alt="أديب ماركت" className="h-9 w-auto" />
              </Link>
              <button onClick={() => setIsMobileOpen(false)} className="p-2.5 rounded-xl" style={{ color: 'var(--text-primary)' }}>
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-4" style={{ fontFamily: 'var(--font-heading)' }}>
              {[
                { to: '/', label: 'الرئيسية' },
                ...categories.map(c => ({ to: `/category/${c.slug}`, label: c.name })),
                { to: '/archive', label: 'الأرشيف' },
                { to: '/about', label: 'من نحن' },
                { to: '/contact', label: 'تواصل معنا' },
              ].map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-medium transition-colors hover:bg-gold/10"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
