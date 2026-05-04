import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Archive, Filter } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import ArticleCard from '../components/ArticleCard';
import Newsletter from '../components/Newsletter';
import { useStore } from '../lib/store';

export default function ArchivePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeFilter, setActiveFilter] = useState('all');
  const { articles, categories } = useStore();

  const filtered = activeFilter === 'all' ? articles : articles.filter(a => a.categorySlug === activeFilter);

  return (
    <div className="pt-24 sm:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6"><Breadcrumbs items={[{ label: 'الأرشيف' }]} /></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4"><Archive size={28} className="text-gold" /></div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>أرشيف المقالات</h1>
          <p style={{ color: 'var(--text-secondary)' }}>تصفح جميع المقالات المنشورة في أديب ماركت</p>
        </motion.div>
        <div className="flex flex-wrap items-center gap-2 mb-8 justify-center">
          <Filter size={16} className="text-gold" />
          <button onClick={() => setActiveFilter('all')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${activeFilter === 'all' ? 'bg-navy text-white' : ''}`} style={activeFilter !== 'all' ? { color: 'var(--text-secondary)', background: 'var(--bg-card)', border: '1px solid var(--border-color)' } : { fontFamily: 'var(--font-heading)' }}>الكل</button>
          {categories.map(cat => (
            <button key={cat.slug} onClick={() => setActiveFilter(cat.slug)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${activeFilter === cat.slug ? 'bg-navy text-white' : ''}`} style={activeFilter !== cat.slug ? { color: 'var(--text-secondary)', background: 'var(--bg-card)', border: '1px solid var(--border-color)' } : { fontFamily: 'var(--font-heading)' }}>{cat.icon} {cat.name}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map((article, i) => (
            <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} layout>
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </div>
        {filtered.length === 0 && <p className="text-center py-16" style={{ color: 'var(--text-muted)' }}>لا توجد مقالات في هذا التصنيف.</p>}
        <Newsletter />
      </div>
    </div>
  );
}
