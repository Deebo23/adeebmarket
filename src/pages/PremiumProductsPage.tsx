import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, MessageCircle, ExternalLink, Star, Sparkles, Shield, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import Newsletter from '../components/Newsletter';
import { useStore } from '../lib/store';

export default function PremiumProductsPage() {
  const { paidProducts } = useStore();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-24 sm:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <Breadcrumbs items={[{ label: 'المتجر', to: '/store' }, { label: 'منتجات أديب ماركت' }]} />
        </div>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #c8a45e, #a88a3e)' }}>
            <Crown size={36} className="text-white" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            منتجات <span className="text-gradient">أديب ماركت</span>
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-6" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            دورات تدريبية، أنظمة متكاملة، وأدوات احترافية — استثمر في نجاحك الرقمي
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <Shield size={14} className="text-green-500" /> ضمان استرداد
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <Sparkles size={14} className="text-gold" /> جودة عالية
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <MessageCircle size={14} className="text-green-500" /> دعم مباشر
            </span>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {paidProducts.map((product, i) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link to={`/store/premium/${product.slug}`} className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {product.badge && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-gold text-navy-dark" style={{ fontFamily: 'var(--font-heading)' }}>
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    {product.oldPrice && (
                      <span className="px-2 py-0.5 rounded-lg text-xs line-through bg-red-500/80 text-white">{product.oldPrice} {product.currency}</span>
                    )}
                    <span className="px-3 py-1 rounded-lg text-sm font-bold bg-white text-navy-dark" style={{ fontFamily: 'var(--font-heading)' }}>
                      {product.price} {product.currency}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs font-medium text-gold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{product.category}</span>
                  <h3 className="text-base font-bold mb-2 line-clamp-2 group-hover:text-gold transition-colors" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                    {product.title}
                  </h3>
                  <p className="text-sm line-clamp-2 mb-4 flex-1" style={{ color: 'var(--text-secondary)' }}>{product.description}</p>

                  {/* Features Preview */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.features.slice(0, 3).map((f: any, fi: number) => (
                      <span key={fi} className="text-xs px-2 py-0.5 rounded-lg" style={{ background: 'var(--bg-primary)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>
                        ✓ {f}
                      </span>
                    ))}
                  </div>

                  {/* Buy Options */}
                  <div className="flex items-center gap-2">
                    <span className="flex-1 text-center py-2 rounded-lg text-xs font-bold bg-navy text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                      عرض التفاصيل
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Why Buy Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-3xl p-8 sm:p-12 mb-16">
          <h2 className="text-xl font-bold text-center mb-8" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            لماذا منتجات أديب ماركت؟
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: <Sparkles size={24} />, title: 'جودة احترافية', desc: 'منتجات مصممة بعناية من خبراء متخصصين في التسويق الرقمي والتقنية' },
              { icon: <MessageCircle size={24} />, title: 'دعم مباشر', desc: 'تواصل مباشر عبر الواتساب للإجابة على أي استفسار أو مساعدة' },
              { icon: <Shield size={24} />, title: 'ضمان الجودة', desc: 'إذا لم يعجبك المنتج يمكنك طلب استرداد المبلغ خلال 7 أيام' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-3 text-gold">{item.icon}</div>
                <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
                <p className="text-xs" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <Newsletter />
      </div>
    </div>
  );
}
