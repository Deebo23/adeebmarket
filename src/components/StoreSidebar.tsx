import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Sparkles, MessageCircle, ExternalLink } from 'lucide-react';
import { useStore } from '../lib/store';

const WHATSAPP = '00967733885620';

export default function StoreSidebar() {
  const { products } = useStore();
  const activeProducts = products.filter(p => p.active);

  if (activeProducts.length === 0) return null;

  // Get unique categories
  const productCategories = [...new Set(activeProducts.map(p => p.category))];

  return (
    <aside className="w-full">
      {/* Header */}
      <div
        className="rounded-t-2xl p-4 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #c8a45e 0%, #dfc088 100%)' }}
      >
        <div className="flex items-center gap-2">
          <ShoppingBag size={20} className="text-navy-dark" />
          <h3 className="text-base font-bold text-navy-dark" style={{ fontFamily: 'var(--font-heading)' }}>
            المتجر
          </h3>
        </div>
        <Link
          to="/store"
          className="flex items-center gap-1 text-xs font-semibold text-navy-dark/70 hover:text-navy-dark transition-colors"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          عرض الكل <ArrowLeft size={12} />
        </Link>
      </div>

      {/* Categories */}
      {productCategories.length > 1 && (
        <div className="px-4 py-3 flex flex-wrap gap-1.5" style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)' }}>
          {productCategories.map(cat => (
            <span
              key={cat}
              className="px-2.5 py-1 rounded-lg text-xs font-medium"
              style={{ background: 'var(--bg-primary)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}
            >
              {cat}
            </span>
          ))}
        </div>
      )}

      {/* Products */}
      <div className="glass-card rounded-b-2xl rounded-t-none divide-y" style={{ borderColor: 'var(--border-color)' }}>
        {activeProducts.map((product) => (
          <div key={product.id} className="p-4 hover:bg-gold/5 transition-colors">
            <div className="flex gap-3">
              {/* Product Image */}
              <Link to={`/store/${product.slug}`} className="flex-shrink-0">
                <div className="w-16 h-16 rounded-xl overflow-hidden relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  {product.badge && (
                    <div className="absolute top-0 right-0 left-0 py-0.5 text-center" style={{ background: 'linear-gradient(135deg, #c8a45e 0%, #dfc088 100%)' }}>
                      <span className="text-[9px] font-bold text-navy-dark flex items-center justify-center gap-0.5">
                        <Sparkles size={8} /> {product.badge}
                      </span>
                    </div>
                  )}
                </div>
              </Link>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <Link to={`/store/${product.slug}`}>
                  <h4 className="text-sm font-bold line-clamp-2 mb-1 hover:text-gold transition-colors" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                    {product.name}
                  </h4>
                </Link>
                <p className="text-xs line-clamp-1 mb-2" style={{ color: 'var(--text-muted)' }}>
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base font-bold text-gold" style={{ fontFamily: 'var(--font-heading)' }}>${product.price}</span>
                  {product.oldPrice && (
                    <>
                      <span className="text-xs line-through" style={{ color: 'var(--text-muted)' }}>${product.oldPrice}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/10 text-red-500">
                        -{Math.round(((parseInt(product.oldPrice) - parseInt(product.price)) / parseInt(product.oldPrice)) * 100)}%
                      </span>
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-1.5">
                  {product.externalUrl && (
                    <a
                      href={product.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-1.5 rounded-lg text-xs font-bold bg-navy text-white hover:bg-navy-light transition-colors flex items-center justify-center gap-1"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      <ExternalLink size={11} /> شراء
                    </a>
                  )}
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`مرحباً، أريد طلب: ${product.name} (${product.price}$)`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1"
                    style={{ background: '#25D366', color: 'white', fontFamily: 'var(--font-heading)' }}
                  >
                    <MessageCircle size={11} /> واتساب
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* View All */}
        <div className="p-3">
          <Link
            to="/store"
            className="w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all hover:shadow-md"
            style={{
              background: 'linear-gradient(135deg, #c8a45e 0%, #dfc088 100%)',
              color: '#1a2744',
              fontFamily: 'var(--font-heading)',
            }}
          >
            <ShoppingBag size={16} />
            تصفح جميع المنتجات
            <ArrowLeft size={14} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
