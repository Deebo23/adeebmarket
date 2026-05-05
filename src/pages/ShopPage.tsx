import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Tag, Filter } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { useStore } from '../lib/store';

export default function ShopPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const { products } = useStore();
  const activeProducts = products.filter(p => p.active);
  const [filter, setFilter] = useState('all');

  const cats = [...new Set(activeProducts.map(p => p.category))];
  const filtered = filter === 'all' ? activeProducts : activeProducts.filter(p => p.category === filter);

  return (
    <div className="pt-24 sm:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6"><Breadcrumbs items={[{ label: '\u0627\u0644\u0645\u062a\u062c\u0631' }]} /></div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={28} className="text-gold" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            \u0645\u062a\u062c\u0631 <span className="text-gradient">\u0623\u062f\u064a\u0628 \u0645\u0627\u0631\u0643\u062a</span>
          </h1>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
            \u0645\u0646\u062a\u062c\u0627\u062a \u0631\u0642\u0645\u064a\u0629 \u0627\u062d\u062a\u0631\u0627\u0641\u064a\u0629 \u0644\u062a\u0637\u0648\u064a\u0631 \u0645\u0647\u0627\u0631\u0627\u062a\u0643 \u0641\u064a \u0627\u0644\u062a\u0633\u0648\u064a\u0642 \u0627\u0644\u0631\u0642\u0645\u064a \u0648\u0631\u064a\u0627\u062f\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644
          </p>
        </motion.div>

        {/* Filters */}
        {cats.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 mb-8 justify-center">
            <Filter size={16} className="text-gold" />
            <button onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === 'all' ? 'bg-navy text-white' : ''}`}
              style={filter !== 'all' ? { color: 'var(--text-secondary)', background: 'var(--bg-card)', border: '1px solid var(--border-color)' } : { fontFamily: 'var(--font-heading)' }}>
              \u0627\u0644\u0643\u0644
            </button>
            {cats.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === cat ? 'bg-navy text-white' : ''}`}
                style={filter !== cat ? { color: 'var(--text-secondary)', background: 'var(--bg-card)', border: '1px solid var(--border-color)' } : { fontFamily: 'var(--font-heading)' }}>
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filtered.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Link to={`/shop/${product.slug}`} className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {product.badge && (
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-lg text-xs font-bold bg-gold text-navy-dark" style={{ fontFamily: 'var(--font-heading)' }}>
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs font-medium text-gold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{product.category}</span>
                    <h3 className="text-base font-bold mb-2 group-hover:text-gold transition-colors" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                      {product.name}
                    </h3>
                    <p className="text-sm line-clamp-2 mb-4 flex-1" style={{ color: 'var(--text-secondary)' }}>{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-gold" style={{ fontFamily: 'var(--font-heading)' }}>${product.price}</span>
                        {product.oldPrice && (
                          <span className="text-sm line-through" style={{ color: 'var(--text-muted)' }}>${product.oldPrice}</span>
                        )}
                      </div>
                      <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-navy text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                        \u0639\u0631\u0636 \u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <ShoppingBag size={48} className="text-gold/30 mx-auto mb-4" />
            <p style={{ color: 'var(--text-muted)' }}>\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0646\u062a\u062c\u0627\u062a \u062d\u0627\u0644\u064a\u0627\u064b</p>
          </div>
        )}
      </div>
    </div>
  );
}
