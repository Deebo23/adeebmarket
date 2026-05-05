import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Star, Check, FileText, BookOpen, Layout, Wrench, CheckSquare, Share2, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import Newsletter from '../components/Newsletter';
import { useStore } from '../lib/store';

const typeLabels: Record<string, { label: string; icon: any; color: string }> = {
  ebook: { label: 'كتاب إلكتروني', icon: BookOpen, color: 'text-blue-500' },
  template: { label: 'قوالب', icon: Layout, color: 'text-purple-500' },
  toolkit: { label: 'حقيبة أدوات', icon: Wrench, color: 'text-orange-500' },
  checklist: { label: 'قائمة فحص', icon: CheckSquare, color: 'text-green-500' },
};

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { freeProducts } = useStore();
  const product = freeProducts.find((p: any) => p.slug === (slug || '')) as any;
  const products = freeProducts;
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center px-4">
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>المنتج غير موجود</h1>
        <Link to="/products" className="text-gold hover:text-gold-light transition-colors">تصفح المنتجات</Link>
      </div>
    );
  }

  const typeInfo = typeLabels[product.type];
  const TypeIcon = typeInfo.icon;
  const otherProducts = products.filter((p: any) => p.id !== product.id).slice(0, 3);

  const handleDirectDownload = () => {
    setDownloaded(true);
    // Open download link directly
    window.open(product.downloadUrl, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="pt-24 sm:pt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <Breadcrumbs items={[
            { label: 'المنتجات المجانية', to: '/products' },
            { label: product.title },
          ]} />
        </div>

        {/* Product Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-3xl p-8 flex items-center justify-center"
            style={{ minHeight: 400 }}
          >
            <img src={product.image} alt={product.title} className="max-h-80 w-auto object-contain" />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${typeInfo.color}`}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', fontFamily: 'var(--font-heading)' }}>
                <TypeIcon size={13} /> {typeInfo.label}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-green-500 text-white">مجاني 100%</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', lineHeight: 1.5 }}>
              {product.title}
            </h1>

            <p className="text-base mb-6" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {product.description}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm" style={{ color: 'var(--text-muted)' }}>
              <span className="flex items-center gap-1.5"><FileText size={16} /> {product.format}</span>
              {product.pages && <span className="flex items-center gap-1.5"><BookOpen size={16} /> {product.pages}</span>}
              <span className="flex items-center gap-1.5"><Download size={16} /> {product.downloads.toLocaleString()} تحميل</span>
              <span className="flex items-center gap-1.5"><Star size={16} className="text-yellow-500 fill-yellow-500" /> {product.rating} / 5</span>
            </div>

            {/* Features */}
            <div className="mb-8">
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

            {/* Direct Download CTA */}
            {!downloaded ? (
              <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Download size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                      تحميل مباشر مجاني
                    </h3>
                    <p className="text-white/70 text-xs">بدون تسجيل — اضغط وحمّل فوراً!</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleDirectDownload}
                    className="flex-1 px-6 py-4 rounded-xl text-sm font-bold bg-white text-green-700 hover:bg-white/90 transition-colors flex items-center justify-center gap-2 hover:shadow-lg"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    <Download size={20} />
                    ⬇️ تحميل الآن مجاناً
                  </button>
                  <button
                    onClick={handleShare}
                    className="px-5 py-4 rounded-xl text-sm font-medium bg-white/20 text-white hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    <Share2 size={16} />
                    مشاركة
                  </button>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl p-6 text-center"
                style={{ background: 'linear-gradient(135deg, #1a2744, #2a4a7f)' }}
              >
                <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Check size={28} className="text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  تم التحميل! 🎉
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  إذا لم يبدأ التحميل تلقائياً، اضغط الزر أدناه:
                </p>
                <a
                  href={product.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-gold text-navy-dark hover:bg-gold-light transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  <Download size={18} /> تحميل مرة أخرى
                </a>
                <p className="text-white/40 text-xs mt-3">شكراً لتحميلك! شارك المنتج مع أصدقائك 💛</p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Long Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="article-content" dangerouslySetInnerHTML={{ __html: product.longDescription }} />
        </motion.div>

        {/* Other Products */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              منتجات أخرى قد تهمك
            </h2>
            <Link to="/products" className="text-sm font-medium text-gold hover:text-gold-light transition-colors flex items-center gap-1" style={{ fontFamily: 'var(--font-heading)' }}>
              عرض الكل <ArrowLeft size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProducts.map((p: any, i: number) => {
              const ti = typeLabels[p.type];
              return (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Link to={`/products/${p.slug}`} className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full">
                    <div className="relative h-48 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
                      <img src={p.image} alt={p.title} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-lg text-xs font-bold bg-green-500 text-white">مجاني</span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-sm font-bold mb-2 line-clamp-2 group-hover:text-gold transition-colors" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{p.title}</h3>
                      <div className="flex items-center gap-3 text-xs mt-auto" style={{ color: 'var(--text-muted)' }}>
                        <span className="flex items-center gap-1"><Download size={12} /> {p.downloads.toLocaleString()}</span>
                        <span className="flex items-center gap-1"><Star size={12} className="text-yellow-500 fill-yellow-500" /> {p.rating}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        <Newsletter />
      </div>
    </div>
  );
}
