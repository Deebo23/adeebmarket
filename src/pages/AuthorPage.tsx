import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, ExternalLink } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import Breadcrumbs from '../components/Breadcrumbs';
import Newsletter from '../components/Newsletter';
import { useStore } from '../lib/store';

export default function AuthorPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const { author, articles } = useStore();

  return (
    <div className="pt-24 sm:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6"><Breadcrumbs items={[{ label: 'الكاتب' }]} /></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-3xl p-8 sm:p-12 mb-12 text-center">
          <img src={author.avatar} alt={author.name} className="w-28 h-28 rounded-3xl object-cover mx-auto mb-6 ring-4 ring-gold/20" />
          <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{author.name}</h1>
          <p className="text-gold font-medium mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{author.role}</p>
          <p className="text-base max-w-2xl mx-auto mb-6" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{author.bio}</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-1.5"><MapPin size={16} /> الشرق الأوسط</span>
            <span className="flex items-center gap-1.5"><Briefcase size={16} /> متخصص تسويق رقمي</span>
            <a href="#" className="flex items-center gap-1.5 text-gold hover:text-gold-light transition-colors"><ExternalLink size={16} /> الموقع الشخصي</a>
          </div>
          <div className="flex justify-center gap-6 mt-6">
            <div className="text-center"><span className="text-2xl font-bold text-gold" style={{ fontFamily: 'var(--font-heading)' }}>{articles.length}</span><p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>مقال</p></div>
            <div className="text-center"><span className="text-2xl font-bold text-gold" style={{ fontFamily: 'var(--font-heading)' }}>15K+</span><p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>قارئ</p></div>
            <div className="text-center"><span className="text-2xl font-bold text-gold" style={{ fontFamily: 'var(--font-heading)' }}>3+</span><p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>سنوات خبرة</p></div>
          </div>
        </motion.div>
        <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>مقالات {author.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </div>
        <Newsletter />
      </div>
    </div>
  );
}
