import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ExternalLink, Check, Crown, Shield, ArrowLeft, Star, Sparkles } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import Newsletter from '../components/Newsletter';
import { useStore } from '../lib/store';

export default function PremiumProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { paidProducts } = useStore();
  const product = paidProducts.find((p: any) => p.slug === (slug || '')) as any;

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center px-4">
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>المنتج غير موجود</h1>
        <Link to="/store/premium" className="text-gold hover:text-gold-light transition-colors">تصفح المنتجات</Link>
      </div>
    );
  }

  const whatsappUrl = `https://wa.me/${product.whatsappNumber}?text=${encodeURIComponent(product.whatsappMessage)}`;
  const otherProducts = paidProducts.filter((p: any) => p.id !== product.id).slice(0, 3);

  return (
    <div className="pt-24 sm:pt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <Breadcrumbs items={[
            { label: 'المتجر', to: '/store' },
            { label: 'منتجات أديب ماركت', to: '/store/premium' },
            { label: product.title },
          ]} />
        </div>

        {/* Product Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card rounded-3xl overflow-hidden">
            <div className="relative">
              <img src={product.image} alt={product.title} className="w-full h-80 sm:h-96 object-cover" />
              {product.badge && (
                <span className="absolute top-4 right-4 px-3 py-1.5 rounded-xl text-xs font-bold bg-gold text-navy-dark" style={{ fontFamily: 'var(--font-heading)' }}>
                  {product.badge}
                </span>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <span className="text-xs font-medium text-gold mb-2 block" style={{ fontFamily: 'var(--font-heading)' }}>{product.category}</span>

            <h1 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', lineHeight: 1.5 }}>
              {product.title}
            </h1>

            <p className="text-base mb-6" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {product.description}
            </p>

            {/* Price */}
            <div className="glass-card rounded-2xl p-5 mb-6">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-3xl font-bold text-gold" style={{ fontFamily: 'var(--font-heading)' }}>
                  {product.price} {product.currency}
                </span>
                {product.oldPrice && (
                  <span className="text-lg line-through" style={{ color: 'var(--text-muted)' }}>
                    {product.oldPrice} {product.currency}
                  </span>
                )}
                {product.oldPrice && (
                  <span className="px-2 py-0.5 rounded-lg text-xs font-bold bg-red-500/10 text-red-500">
                    خصم {Math.round((1 - parseInt(product.price) / parseInt(product.oldPrice)) * 100)}%
                  </span>
                )}
              </div>
              {product.inStock ? (
                <span className="text-xs text-green-500 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> متوفر للشراء
                </span>
              ) : (
                <span className="text-xs text-red-500 font-medium">غير متوفر حالياً</span>
              )}
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>ماذا يتضمن:</h3>
              <ul className="space-y-2">
                {product.features.map((f: any, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Buy CTAs */}
            <div className="space-y-3">
              {/* WhatsApp Order */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl text-sm font-bold text-white transition-all hover:shadow-lg hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', fontFamily: 'var(--font-heading)' }}
              >
                <MessageCircle size={20} />
                اطلب الآن عبر الواتساب
              </a>

              {/* External Store Link */}
              {product.externalUrl && (
                <a
                  href={product.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl text-sm font-bold transition-all hover:shadow-lg hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg, #c8a45e, #a88a3e)', color: '#0f1a2e', fontFamily: 'var(--font-heading)' }}
                >
                  <ExternalLink size={18} />
                  شراء المنتج من المتجر
                </a>
              )}

              {/* Guarantees */}
              <div className="flex items-center justify-center gap-4 pt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                <span className="flex items-center gap-1"><Shield size={13} className="text-green-500" /> ضمان 7 أيام</span>
                <span className="flex items-center gap-1"><Sparkles size={13} className="text-gold" /> تحديثات مجانية</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Long Description */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto mb-16">
          <div className="article-content" dangerouslySetInnerHTML={{ __html: product.longDescription }} />
        </motion.div>

        {/* Other Products */}
        {otherProducts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>منتجات أخرى</h2>
              <Link to="/store/premium" className="text-sm font-medium text-gold hover:text-gold-light flex items-center gap-1" style={{ fontFamily: 'var(--font-heading)' }}>
                عرض الكل <ArrowLeft size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProducts.map((p: any, i: number) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Link to={`/store/premium/${p.slug}`} className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full">
                    <div className="relative h-44 overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-white text-navy-dark" style={{ fontFamily: 'var(--font-heading)' }}>
                        {p.price} {p.currency}
                      </span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-sm font-bold mb-2 line-clamp-2 group-hover:text-gold transition-colors" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{p.title}</h3>
                      <p className="text-xs line-clamp-2 flex-1" style={{ color: 'var(--text-secondary)' }}>{p.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        <Newsletter />
      </div>
    </div>
  );
}
