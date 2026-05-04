import { List } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: string }) {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h2, h3');
    const tocItems: TOCItem[] = [];
    headings.forEach((h, i) => {
      const id = `heading-${i}`;
      tocItems.push({
        id,
        text: h.textContent || '',
        level: h.tagName === 'H2' ? 2 : 3,
      });
    });
    setItems(tocItems);
  }, [content]);

  if (items.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl p-5 mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full font-bold text-base"
        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}
      >
        <List size={18} className="text-gold" />
        جدول المحتويات
        <span className="text-xs mr-auto" style={{ color: 'var(--text-muted)' }}>
          {isOpen ? 'إخفاء' : 'عرض'}
        </span>
      </button>
      {isOpen && (
        <ul className="mt-4 space-y-2">
          {items.map((item, i) => (
            <li key={i} className={item.level === 3 ? 'pr-4' : ''}>
              <a
                href={`#${item.id}`}
                className="text-sm hover:text-gold transition-colors block py-0.5"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
