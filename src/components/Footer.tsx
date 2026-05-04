import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, CheckCircle, AlertCircle } from 'lucide-react';
import { useStore } from '../lib/store';

export default function Footer() {
  const { categories, addSubscriber } = useStore();
  const [footerEmail, setFooterEmail] = useState('');
  const [footerStatus, setFooterStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const handleFooterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const result = addSubscriber(footerEmail);
    setFooterStatus({ type: result.success ? 'success' : 'error', msg: result.message });
    if (result.success) setFooterEmail('');
    setTimeout(() => setFooterStatus(null), 4000);
  };

  return (
    <footer className="relative mt-20" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
      <div className="h-1 bg-gradient-to-l from-gold via-gold-light to-sky-accent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img src="/images/logo.png" alt="أديب ماركت" className="h-10 w-auto mb-4" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
              مجلة رقمية عربية احترافية متخصصة في التسويق الرقمي والذكاء الاصطناعي وريادة الأعمال. نقدم محتوى عربي أصيل بجودة عالمية.
            </p>
            <div className="flex gap-3">
              {['twitter', 'linkedin', 'instagram', 'youtube'].map(social => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                  aria-label={social}
                >
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {social === 'twitter' && '𝕏'}
                    {social === 'linkedin' && 'in'}
                    {social === 'instagram' && '📷'}
                    {social === 'youtube' && '▶'}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>روابط سريعة</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'الرئيسية' },
                { to: '/about', label: 'من نحن' },
                { to: '/archive', label: 'الأرشيف' },
                { to: '/contact', label: 'تواصل معنا' },
                { to: '/author', label: 'الكاتب' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm transition-colors hover:text-gold" style={{ color: 'var(--text-secondary)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>التصنيفات</h3>
            <ul className="space-y-2.5">
              {categories.map(cat => (
                <li key={cat.slug}>
                  <Link to={`/category/${cat.slug}`} className="text-sm transition-colors hover:text-gold" style={{ color: 'var(--text-secondary)' }}>
                    {cat.icon} {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-base font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>النشرة البريدية</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              اشترك للحصول على أحدث المقالات والنصائح مباشرة في بريدك.
            </p>

            {footerStatus ? (
              <div
                className={`flex items-center gap-2 p-3 rounded-xl text-xs font-semibold ${
                  footerStatus.type === 'success'
                    ? 'bg-green-500/10 text-green-600'
                    : 'bg-red-500/10 text-red-500'
                }`}
              >
                {footerStatus.type === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                {footerStatus.msg}
              </div>
            ) : (
              <form className="flex flex-col gap-2" onSubmit={handleFooterSubscribe}>
                <input
                  type="email"
                  required
                  value={footerEmail}
                  onChange={e => setFooterEmail(e.target.value)}
                  placeholder="بريدك الإلكتروني"
                  className="px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    fontFamily: 'var(--font-body)',
                  }}
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-navy text-white hover:bg-navy-light transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  اشتراك
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid var(--border-color)' }}>
          <p className="text-sm flex items-center gap-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
            © 2025 أديب ماركت. جميع الحقوق محفوظة. صُنع بـ
            <Heart size={14} className="text-gold fill-gold" />
            بواسطة Adeeb Ali
          </p>
          <div className="flex gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            <Link to="/admin/login" className="hover:text-gold transition-colors">لوحة التحكم</Link>
            <a href="#" className="hover:text-gold transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-gold transition-colors">شروط الاستخدام</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
