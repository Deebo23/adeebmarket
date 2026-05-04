import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Tag } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import AuthorBox from '../components/AuthorBox';
import ShareButtons from '../components/ShareButtons';
import TableOfContents from '../components/TableOfContents';
import ArticleCard from '../components/ArticleCard';
import Newsletter from '../components/Newsletter';
import { getArticleBySlug, getLatestArticles } from '../lib/data';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || '');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (contentRef.current && article) {
      const headings = contentRef.current.querySelectorAll('h2, h3');
      headings.forEach((h, i) => {
        h.id = `heading-${i}`;
      });
    }
  }, [article]);

  if (!article) {
    return (
      <div className="pt-32 pb-20 text-center px-4">
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>المقال غير موجود</h1>
        <Link to="/" className="text-gold hover:text-gold-light transition-colors">العودة للرئيسية</Link>
      </div>
    );
  }

  const relatedArticles = getLatestArticles(3).filter(a => a.id !== article.id).slice(0, 3);

  return (
    <div className="pt-24 sm:pt-28">
      {/* Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-6">
        <Breadcrumbs items={[
          { label: article.category, to: `/category/${article.categorySlug}` },
          { label: article.title },
        ]} />
      </div>

      {/* Article Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 mb-8"
      >
        <Link
          to={`/category/${article.categorySlug}`}
          className="inline-block px-3 py-1 rounded-lg text-xs font-semibold bg-gold/10 text-gold mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {article.category}
        </Link>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', lineHeight: 1.5 }}>
          {article.title}
        </h1>
        <p className="text-base sm:text-lg mb-6" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          {article.excerpt}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
          <Link to="/author" className="flex items-center gap-2 hover:text-gold transition-colors">
            <img src={article.author.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
            {article.author.name}
          </Link>
          <span className="flex items-center gap-1"><Calendar size={14} /> {article.date}</span>
          <span className="flex items-center gap-1"><Clock size={14} /> {article.readTime} قراءة</span>
        </div>
      </motion.div>

      {/* Featured Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 mb-10"
      >
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 sm:h-96 object-cover rounded-2xl"
        />
      </motion.div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="lg:flex lg:gap-8">
          <article className="flex-1 min-w-0">
            {/* Share */}
            <div className="mb-6">
              <ShareButtons title={article.title} url={`https://adeebmarket.com/article/${article.slug}`} />
            </div>

            {/* TOC */}
            <TableOfContents content={article.content} />

            {/* Article Content */}
            <div
              ref={contentRef}
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            <div className="mt-8 pt-6 flex flex-wrap items-center gap-2" style={{ borderTop: '1px solid var(--border-color)' }}>
              <Tag size={16} className="text-gold" />
              {article.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/search?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-gold/10"
                  style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Share Bottom */}
            <div className="mt-6">
              <ShareButtons title={article.title} url={`https://adeebmarket.com/article/${article.slug}`} />
            </div>

            {/* Author Box */}
            <div className="mt-8">
              <AuthorBox author={article.author} />
            </div>
          </article>
        </div>
      </div>

      {/* Related Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
          مقالات ذات صلة
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedArticles.map(a => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Newsletter />
      </div>
    </div>
  );
}
