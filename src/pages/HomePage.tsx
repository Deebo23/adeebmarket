import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, TrendingUp, Sparkles, Flame, Gift, Download, Star } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import Newsletter from '../components/Newsletter';
import { useStore } from '../lib/store';
// products loaded from store

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function HomePage() {
  const { getFeaturedArticles, getTrendingArticles, getLatestArticles, categories, freeProducts: products } = useStore();
  const featured = getFeaturedArticles();
  const trending = getTrendingArticles();
  const latest = getLatestArticles(6);
  const heroArticle = featured[0] || latest[0];

  if (!heroArticle) return null;

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp}>
            <Link to={`/article/${heroArticle.slug}`} className="block relative rounded-3xl overflow-hidden group">
              <div className="aspect-[16/9] sm:aspect-[21/9]">
                <img src={heroArticle.image} alt={heroArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 right-0 left-0 p-6 sm:p-10">
                <span className="inline-block px-3 py-1 rounded-lg text-xs font-semibold bg-gold text-navy-dark mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  {heroArticle.category}
                </span>
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 max-w-3xl" style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.4 }}>
                  {heroArticle.title}
                </h1>
                <p className="text-white/70 text-sm sm:text-base max-w-2xl mb-4 line-clamp-2">{heroArticle.excerpt}</p>
                <div className="flex items-center gap-4 text-white/60 text-sm">
                  <span className="flex items-center gap-1.5">
                    <img src={heroArticle.author.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                    {heroArticle.author.name}
                  </span>
                  <span>{heroArticle.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {heroArticle.readTime}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      {featured.length > 0 && (
        <section className="py-8 sm:py-12 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeUp} className="flex items-center justify-between mb-8">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                <Sparkles size={22} className="text-gold" />
                مقالات مميزة
              </h2>
              <Link to="/archive" className="text-sm font-medium text-gold hover:text-gold-light transition-colors flex items-center gap-1" style={{ fontFamily: 'var(--font-heading)' }}>
                عرض الكل <ArrowLeft size={16} />
              </Link>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((article, i) => (
                <motion.div key={article.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending */}
      {trending.length > 0 && (
        <section className="py-8 sm:py-12 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeUp} className="flex items-center justify-between mb-8">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                <Flame size={22} className="text-orange-500" />
                الأكثر رواجاً
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {trending.map((article, i) => (
                <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <ArticleCard article={article} variant="horizontal" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              <TrendingUp size={22} className="text-sky-accent" />
              أحدث المقالات
            </h2>
            <Link to="/archive" className="text-sm font-medium text-gold hover:text-gold-light transition-colors flex items-center gap-1" style={{ fontFamily: 'var(--font-heading)' }}>
              الأرشيف <ArrowLeft size={16} />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map((article, i) => (
              <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Products */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              <Gift size={22} className="text-gold" />
              منتجات رقمية مجانية
            </h2>
            <Link to="/products" className="text-sm font-medium text-gold hover:text-gold-light transition-colors flex items-center gap-1" style={{ fontFamily: 'var(--font-heading)' }}>
              عرض الكل <ArrowLeft size={16} />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={`/products/${product.slug}`} className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full">
                  <div className="relative h-52 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
                    <img src={product.image} alt={product.title} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-green-500 text-white">مجاني</span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs font-medium text-gold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{product.category}</span>
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
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-xl sm:text-2xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            تصفح حسب التصنيف
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.slug} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                <Link to={`/category/${cat.slug}`} className="glass-card rounded-2xl p-5 text-center block group">
                  <span className="text-3xl block mb-3">{cat.icon}</span>
                  <h3 className="text-sm font-bold mb-1 group-hover:text-gold transition-colors" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                    {cat.name}
                  </h3>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{cat.count} مقال</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Newsletter />
      </div>
    </div>
  );
}
