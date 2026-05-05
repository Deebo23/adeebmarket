import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, CheckCircle, AlertCircle } from 'lucide-react';
import { useStore } from '../lib/store';

export default function Footer() {
  const { categories, addSubscriber, siteSettings } = useStore();
  const [footerEmail, setFooterEmail] = useState('');
  const [footerStatus, setFooterStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const handleFooterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const result = addSubscriber(footerEmail);
    setFooterStatus({ type: result.success ? 'success' : 'error', msg: result.message });
    if (result.success) setFooterEmail('');
    setTimeout(() => setFooterStatus(null), 4000);
  };

  const socials = [
    { key: 'twitter', url: siteSettings.twitterUrl, icon: '𝕏' },
    { key: 'linkedin', url: siteSettings.linkedinUrl, icon: 'in' },
    { key: 'instagram', url: siteSettings.instagramUrl, icon: '📷' },
    { key: 'youtube', url: siteSettings.youtubeUrl, icon: '▶' },
  ].filter(s => s.url);

  return (
    <footer className="relative mt-20" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
      <div className="h-1 bg-gradient-to-l from-gold via-gold-light to-sky-accent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            {siteSettings.logoUrl ? <img src={siteSettings.logoUrl} alt={siteSettings.siteName} className="h-10 w-auto mb-4" /> : <h3 className="text-xl font-bold text-gold mb-4">{siteSettings.siteName}</h3>}
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{siteSettings.footerDescription}</p>
            {socials.length > 0 && (
              <div className="flex gap-3">
                {socials.map(s => (
                  <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{s.icon}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-base font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>روابط سريعة</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: siteSettings.navHome },
                { to: '/about', label: siteSettings.navAbout },
                { to: '/archive', label: siteSettings.navArchive },
                { to: '/store', label: siteSettings.navStore },
                { to: '/contact', label: siteSettings.navContact },
                { to: '/author', label: 'الكاتب' },
              ].map(link => (
                <li key={link.to}><Link to={link.to} className="text-sm transition-colors hover:text-gold" style={{ color: 'var(--text-secondary)' }}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>التصنيفات</h3>
            <ul className="space-y-2.5">
              {categories.map(cat => (
                <li key={cat.slug}><Link to={`/category/${cat.slug}`} className="text-sm transition-colors hover:text-gold" style={{ color: 'var(--text-secondary)' }}>{cat.icon} {cat.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>النشرة البريدية</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>اشترك للحصول على أحدث المقالات والنصائح مباشرة في بريدك.</p>
            {footerStatus ? (
              <div className={`flex items-center gap-2 p-3 rounded-xl text-xs font-semibold ${footerStatus.type === 'success' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-500'}`}>
                {footerStatus.type === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}{footerStatus.msg}
              </div>
            ) : (
              <form className="flex flex-col gap-2" onSubmit={handleFooterSubscribe}>
                <input type="email" required value={footerEmail} onChange={e => setFooterEmail(e.target.value)} placeholder="بريدك الإلكتروني" className="px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }} />
                <button type="submit" className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-navy text-white hover:bg-navy-light transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>{siteSettings.newsletterButtonText}</button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid var(--border-color)' }}>
          <p className="text-sm flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
            {siteSettings.copyrightText} صُنع بـ<Heart size={14} className="text-gold fill-gold" />بواسطة {siteSettings.copyrightOwner}
          </p>
          <div className="flex gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            <Link to="/admin/login" className="hover:text-gold transition-colors">لوحة التحكم</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
