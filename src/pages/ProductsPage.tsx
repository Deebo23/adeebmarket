import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Star, Gift, BookOpen, Layout, Wrench, CheckSquare, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import Newsletter from '../components/Newsletter';
import { products } from '../lib/products';

const typeLabels: Record<string, { label: string; icon: any; color: string }> = {
  ebook: { label: 'كتاب إلكتروني', icon: BookOpen, color: 'text-blue-500 bg-blue-500/10' },
  template: { label: 'قوالب', icon: Layout, color: 'text-purple-500 bg-purple-500/10' },
  toolkit: { label: 'حقيبة أدوات', icon: Wrench, color: 'text-orange-500 bg-orange-500/10' },
  checklist: { label: 'قائمة فحص', icon: CheckSquare, color: 'text-green-500 bg-green-500/10' },
};

export default function ProductsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? products : products.filter(p => p.type === filter);
  const totalDownloads = products.reduce((sum, p) => sum + p.downloads, 0);

  return (
    <div className="pt-24 sm:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <Breadcrumbs items={[{ label: 'المنتجات المجانية' }]} />
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mx-auto mb-6">
            <Gift size={36} className="text-gold" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            منتجات رقمية <span className="text-gradient">مجانية</span>
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-8" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            كتب إلكترونية، قوالب جاهزة، أدلة عملية، وأدوات احترافية — كلها مجانية 100% لمساعدتك على النجاح في عالمك الرقمي.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="text-center">
              <span className="text-2xl font-bold text-gold" style={{ fontFamily: 'var(--font-heading)' }}>{products.length}</span>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>منتج مجاني</p>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-gold" style={{ fontFamily: 'var(--font-heading)' }}>{totalDownloads.toLocaleString()}+</span>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>عملية تحميل</p>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-gold" style={{ fontFamily: 'var(--font-heading)' }}>4.8</span>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>متوسط التقييم</p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === 'all' ? 'bg-navy text-white' : ''}`}
            style={filter !== 'all' ? { color: 'var(--text-secondary)', background: 'var(--bg-card)', border: '1px solid var(--border-color)' } : { fontFamily: 'var(--font-heading)' }}
          >
            الكل ({products.length})
          </button>
          {Object.entries(typeLabels).map(([key, val]) => {
            const count = products.filter(p => p.type === key).length;
            const Icon = val.icon;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 ${filter === key ? 'bg-navy text-white' : ''}`}
                style={filter !== key ? { color: 'var(--text-secondary)', background: 'var(--bg-card)', border: '1px solid var(--border-color)' } : { fontFamily: 'var(--font-heading)' }}
              >
                <Icon size={14} /> {val.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map((product, i) => {
            const typeInfo = typeLabels[product.type];
            const TypeIcon = typeInfo.icon;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link to={`/products/${product.slug}`} className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
                    <img src={product.image} alt={product.title} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${typeInfo.color}`} style={{ fontFamily: 'var(--font-heading)' }}>
                        <TypeIcon size={12} /> {typeInfo.label}
                      </span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-green-500 text-white">مجاني</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs font-medium text-gold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{product.category}</span>
                    <h3 className="text-base font-bold mb-2 line-clamp-2 group-hover:text-gold transition-colors" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                      {product.title}
                    </h3>
                    <p className="text-sm line-clamp-2 mb-4 flex-1" style={{ color: 'var(--text-secondary)' }}>{product.description}</p>

                    <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Download size={12} /> {product.downloads.toLocaleString()}</span>
                        <span className="flex items-center gap-1"><Star size={12} className="text-yellow-500 fill-yellow-500" /> {product.rating}</span>
                      </div>
                      <span className="flex items-center gap-1 text-gold font-medium">
                        تحميل <ArrowLeft size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <Newsletter />
      </div>
    </div>
  );
}
