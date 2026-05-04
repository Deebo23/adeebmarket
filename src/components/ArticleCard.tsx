import { Link } from 'react-router-dom';
import { Clock, ArrowLeft } from 'lucide-react';
import type { Article } from '../lib/data';

export default function ArticleCard({ article, variant = 'default' }: { article: Article; variant?: 'default' | 'horizontal' | 'compact' }) {
  if (variant === 'compact') {
    return (
      <Link to={`/article/${article.slug}`} className="flex items-center gap-3 group">
        <img src={article.image} alt={article.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
        <div>
          <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-gold transition-colors" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            {article.title}
          </h4>
          <span className="text-xs mt-1 block" style={{ color: 'var(--text-muted)' }}>{article.date}</span>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link to={`/article/${article.slug}`} className="glass-card rounded-2xl overflow-hidden flex flex-col sm:flex-row group">
        <div className="sm:w-72 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-5 sm:p-6 flex flex-col justify-center">
          <span className="text-xs font-semibold text-gold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{article.category}</span>
          <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-gold transition-colors" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            {article.title}
          </h3>
          <p className="text-sm line-clamp-2 mb-3" style={{ color: 'var(--text-secondary)' }}>{article.excerpt}</p>
          <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span>{article.date}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.slug}`} className="glass-card rounded-2xl overflow-hidden group flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-navy/80 text-white backdrop-blur-sm" style={{ fontFamily: 'var(--font-heading)' }}>
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-bold mb-2 line-clamp-2 group-hover:text-gold transition-colors" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
          {article.title}
        </h3>
        <p className="text-sm line-clamp-3 mb-4 flex-1" style={{ color: 'var(--text-secondary)' }}>{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
          <div className="flex items-center gap-3">
            <span>{article.date}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
          </div>
          <ArrowLeft size={16} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </Link>
  );
}
