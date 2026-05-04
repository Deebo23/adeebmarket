import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import ArticleCard from '../components/ArticleCard';
import { useStore } from '../lib/store';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { searchArticles } = useStore();
  const results = searchArticles(query);

  useEffect(() => { window.scrollTo(0, 0); }, [query]);

  return (
    <div className="pt-24 sm:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6"><Breadcrumbs items={[{ label: 'نتائج البحث' }]} /></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4"><Search size={28} className="text-gold" /></div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>نتائج البحث</h1>
          {query && <p style={{ color: 'var(--text-secondary)' }}>نتائج البحث عن: <strong className="text-gold">"{query}"</strong><span className="mr-2" style={{ color: 'var(--text-muted)' }}>({results.length} نتيجة)</span></p>}
        </motion.div>
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {results.map((article, i) => (
              <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg mb-2" style={{ color: 'var(--text-muted)' }}>لم يتم العثور على نتائج</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>جرب البحث بكلمات مفتاحية مختلفة</p>
          </div>
        )}
      </div>
    </div>
  );
}
