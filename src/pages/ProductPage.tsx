import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ExternalLink, Check, ShoppingBag, ArrowLeft, Sparkles, Shield } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import Newsletter from '../components/Newsletter';
import { useStore } from '../lib/store';

const WHATSAPP = '00967733885620';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { getProductBySlug, products } = useStore();
  const product = getProductBySlug(slug || '');

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center px-4">
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>المنتج غير موجود</h1>
        <Link to="/store" className="text-gold hover:text-gold-light transition-colors">العودة للمتجر</Link>
      </div>
    );
  }

  const whatsappMsg = `مرحباً، أريد طلب المنتج: ${product.name}\nالسعر: $${product.price}\nأرجو إرسال تفاصيل الدفع والتوصيل.`;
  const otherProducts = products.filter(p => p.id !== product.id && p.active).slice(0, 3);

  return (
    <div className="pt-24 sm:pt-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <Breadcrumbs items={[
            { label: 'المتجر', to: '/store' },
            { label: product.name },
          ]} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="relative rounded-2xl overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-72 sm:h-96 object-cover" />
              {product.badge && (
                <div className="absolute top-4 right-4">
                  <span className="px-4 py-1.5 rounded-xl text-sm font-bold bg-gold text-navy-dark flex items-center gap-1.5" style={{ fontFamily: 'var(--font-heading)' }}>
                    <Sparkles size={14} /> {product.badge}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <span className="inline-block px-3 py-1 rounded-lg text-xs font-semibold bg-gold/10 text-gold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', lineHeight: 1.5 }}>
              {product.name}
            </h1>
            <p className="text-base mb-6" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-gold" style={{ fontFamily: 'var(--font-heading)' }}>${product.price}</span>
              {product.oldPrice && (
                <>
                  <span className="text-lg line-through" style={{ color: 'var(--text-muted)' }}>${product.oldPrice}</span>
                  <span className="px-3 py-1 rounded-lg text-sm font-bold bg-red-500/10 text-red-500">
                    وفّر {parseInt(product.oldPrice) - parseInt(product.price)}$
                  </span>
                </>
              )}
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="glass-card rounded-xl p-4 mb-6">
                <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>مميزات المنتج:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.features.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <Check size={14} className="text-green-500 flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              {product.externalUrl && (
                <a
                  href={product.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl text-base font-bold bg-navy text-white hover:bg-navy-light transition-all hover:shadow-lg flex items-center justify-center gap-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  <ExternalLink size={18} />
                  شراء المنتج من المتجر
                </a>
              )}
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl text-base font-bold transition-all hover:shadow-lg flex items-center justify-center gap-2"
                style={{ background: '#25D366', color: 'white', fontFamily: 'var(--font-heading)' }}
              >
                <MessageCircle size={18} />
                اطلب مباشرة عبر واتساب
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4 mt-5 flex-wrap">
              {[
                { icon: <Shield size={14} />, text: 'دفع آمن' },
                { icon: <MessageCircle size={14} />, text: 'دعم فوري' },
                { icon: <Check size={14} />, text: 'ضمان استرجاع' },
              ].map((badge, i) => (
                <span key={i} className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                  <span className="text-gold">{badge.icon}</span>
                  {badge.text}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Long Description */}
        {product.longDescription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 sm:p-8 mb-12"
          >
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>تفاصيل المنتج</h2>
            <div className="article-content" dangerouslySetInnerHTML={{ __html: product.longDescription }} />
          </motion.div>
        )}

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-6 sm:p-8 mb-12 text-center"
          style={{ background: 'linear-gradient(135deg, #075e54 0%, #128c7e 100%)' }}
        >
          <MessageCircle size={36} className="text-white/80 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>هل تحتاج مساعدة؟</h3>
          <p className="text-white/70 text-sm mb-5 max-w-md mx-auto">تواصل معنا مباشرة عبر واتساب للاستفسار أو لإتمام طلبك. نرد خلال دقائق!</p>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(whatsappMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-white text-[#075e54] hover:bg-white/90 transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <MessageCircle size={18} />
            تواصل عبر واتساب
          </a>
        </motion.div>

        {/* Other Products */}
        {otherProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>منتجات أخرى</h2>
              <Link to="/store" className="text-sm font-medium text-gold hover:text-gold-light flex items-center gap-1" style={{ fontFamily: 'var(--font-heading)' }}>
                جميع المنتجات <ArrowLeft size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherProducts.map(p => (
                <Link key={p.id} to={`/store/${p.slug}`} className="glass-card rounded-2xl overflow-hidden group">
                  <div className="h-36 overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold mb-1 line-clamp-2 group-hover:text-gold transition-colors" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{p.name}</h3>
                    <span className="text-lg font-bold text-gold" style={{ fontFamily: 'var(--font-heading)' }}>${p.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <Newsletter />
      </div>
    </div>
  );
}
