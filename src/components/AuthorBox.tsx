import { Link } from 'react-router-dom';
import type { Author } from '../lib/data';

export default function AuthorBox({ author }: { author: Author }) {
  return (
    <Link to="/author" className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 group">
      <img
        src={author.avatar}
        alt={author.name}
        className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
      />
      <div className="text-center sm:text-right">
        <span className="text-xs font-medium text-gold mb-1 block" style={{ fontFamily: 'var(--font-heading)' }}>كاتب المقال</span>
        <h3 className="text-lg font-bold mb-1 group-hover:text-gold transition-colors" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
          {author.name}
        </h3>
        <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{author.role}</p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{author.bio}</p>
      </div>
    </Link>
  );
}
