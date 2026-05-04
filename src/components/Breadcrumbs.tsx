import { Link } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm flex-wrap" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
      <Link to="/" className="flex items-center gap-1 hover:text-gold transition-colors">
        <Home size={14} />
        الرئيسية
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <ChevronLeft size={14} />
          {item.to ? (
            <Link to={item.to} className="hover:text-gold transition-colors">{item.label}</Link>
          ) : (
            <span style={{ color: 'var(--text-primary)' }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
