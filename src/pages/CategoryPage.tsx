import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Breadcrumbs from '../components/Breadcrumbs';
import ArticleCard from '../components/ArticleCard';
import Newsletter from '../components/Newsletter';
import { useStore } from '../lib/store';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { getCategoryBySlug, getArticlesByCategory, categories } = useStore();
  const category = getCategoryBySlug(slug || '');
  const articles = getArticlesByCategory(slug || '');

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!category) {
    return (
      <div className="pt-32 pb-20 text-center px-4">
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>التصنيف غير موجود</h1>
        <Link to="/" className="text-gold hover:text-gold-light transition-colors">العودة للرئيسية</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <Breadcrumbs items={[{ label: 'التصنيفات', to: '/archive' }, { label: category.name }]} />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="text-5xl block mb-4">{category.icon}</span>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{category.name}</h1>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>{category.description}</p>
          <span className="text-sm mt-2 block" style={{ color: 'var(--text-muted)' }}>{articles.length} مقال</span>
        </motion.div>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center py-16" style={{ color: 'var(--text-muted)' }}>لا توجد مقالات في هذا التصنيف حالياً.</p>
        )}
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>تصنيفات أخرى</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.filter(c => c.slug !== slug).map(cat => (
              <Link key={cat.slug} to={`/category/${cat.slug}`} className="glass-card px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2 hover:text-gold transition-colors" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-heading)' }}>
                {cat.icon} {cat.name}
              </Link>
            ))}
          </div>
        </div>
        <Newsletter />
      </div>
    </div>
  );
}
