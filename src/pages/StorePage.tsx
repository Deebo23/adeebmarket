import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBag, Gift, Crown, ArrowLeft, Download, Star,
  MessageCircle, ExternalLink, Sparkles
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { useStore } from '../lib/store';

export default function StorePage() {
  const { freeProducts: products, paidProducts } = useStore();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-24 sm:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <Breadcrumbs items={[{ label: 'المتجر' }]} />
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-gold/20 to-navy/20 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={36} className="text-gold" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            متجر <span className="text-gradient">أديب ماركت</span>
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            منتجات رقمية احترافية — مجانية ومدفوعة — لمساعدتك على النجاح في عالمك الرقمي
          </p>
        </motion.div>

        {/* Quick Nav Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
          {/* Free Products Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              to="/products"
              className="glass-card rounded-3xl p-8 flex flex-col items-center text-center group relative overflow-hidden h-full"
            >
              <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-green-500/5 blur-3xl" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                  <Gift size={28} className="text-white" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white mb-4 inline-block">مجاني 100%</span>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-green-500 transition-colors" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                  المنتجات المجانية
                </h2>
                <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  كتب إلكترونية، قوالب جاهزة، أدلة عملية، وأدوات احترافية — كلها مجانية بدون تسجيل
                </p>
                <div className="flex items-center justify-center gap-4 text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                  <span className="flex items-center gap-1"><Download size={14} /> {products.length} منتج</span>
                  <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500" /> تحميل فوري</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all group-hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #10b981, #059669)', fontFamily: 'var(--font-heading)' }}>
                  تصفح المنتجات المجانية <ArrowLeft size={16} />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Paid Products Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/store/premium"
              className="glass-card rounded-3xl p-8 flex flex-col items-center text-center group relative overflow-hidden h-full"
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gold/5 blur-3xl" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: 'linear-gradient(135deg, #c8a45e, #a88a3e)' }}>
                  <Crown size={28} className="text-white" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold text-navy-dark mb-4 inline-block">منتجات مميزة</span>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-gold transition-colors" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                  منتجات أديب ماركت
                </h2>
                <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  دورات تدريبية، أنظمة متكاملة، وأدوات احترافية — استثمر في نجاحك الرقمي
                </p>
                <div className="flex items-center justify-center gap-4 text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                  <span className="flex items-center gap-1"><Sparkles size={14} className="text-gold" /> {paidProducts.length} منتج</span>
                  <span className="flex items-center gap-1"><MessageCircle size={14} /> طلب مباشر</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-navy-dark transition-all group-hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #c8a45e, #dfc088)', fontFamily: 'var(--font-heading)' }}>
                  تصفح المنتجات المميزة <ArrowLeft size={16} />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Free Products Preview */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              <Gift size={22} className="text-green-500" />
              المنتجات المجانية
            </h2>
            <Link to="/products" className="text-sm font-medium text-green-500 hover:text-green-400 transition-colors flex items-center gap-1" style={{ fontFamily: 'var(--font-heading)' }}>
              عرض الكل ({products.length}) <ArrowLeft size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
                <Link to={`/products/${product.slug}`} className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
                    <img src={product.image} alt={product.title} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-green-500 text-white">مجاني</span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-sm font-bold mb-2 line-clamp-2 group-hover:text-gold transition-colors" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                      {product.title}
                    </h3>
                    <p className="text-xs line-clamp-2 mb-3 flex-1" style={{ color: 'var(--text-secondary)' }}>{product.description}</p>
                    <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <span className="flex items-center gap-1"><Download size={12} /> {product.downloads.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><Star size={12} className="text-yellow-500 fill-yellow-500" /> {product.rating}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Paid Products Preview */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              <Crown size={22} className="text-gold" />
              منتجات أديب ماركت
            </h2>
            <Link to="/store/premium" className="text-sm font-medium text-gold hover:text-gold-light transition-colors flex items-center gap-1" style={{ fontFamily: 'var(--font-heading)' }}>
              عرض الكل ({paidProducts.length}) <ArrowLeft size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paidProducts.slice(0, 3).map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }}>
                <Link to={`/store/premium/${product.slug}`} className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {product.badge && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-gold text-navy-dark" style={{ fontFamily: 'var(--font-heading)' }}>
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {product.oldPrice && (
                        <span className="px-2 py-0.5 rounded-lg text-xs line-through bg-red-500/20 text-red-400">{product.oldPrice} {product.currency}</span>
                      )}
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-navy text-white">{product.price} {product.currency}</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs font-medium text-gold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{product.category}</span>
                    <h3 className="text-sm font-bold mb-2 line-clamp-2 group-hover:text-gold transition-colors" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                      {product.title}
                    </h3>
                    <p className="text-xs line-clamp-2 mb-3 flex-1" style={{ color: 'var(--text-secondary)' }}>{product.description}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-green-500/10 text-green-600">
                        <ExternalLink size={11} /> شراء مباشر
                      </span>
                      <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-green-500/10 text-green-600">
                        <MessageCircle size={11} /> واتساب
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
