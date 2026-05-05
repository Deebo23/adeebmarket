import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, X, Gift, Crown, ArrowLeft, Download,
  Star, MessageCircle, ExternalLink, ChevronLeft
} from 'lucide-react';
import { products } from '../lib/products';
import { paidProducts } from '../lib/paidProducts';

export default function FloatingStore() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'free' | 'premium'>('free');

  return (
    <>
      {/* Floating Store Button - Always visible on left side */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 bottom-6 z-40 flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl text-sm font-bold text-white shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #c8a45e 100%)',
          fontFamily: 'var(--font-heading)',
          boxShadow: '0 8px 32px rgba(16, 185, 129, 0.35)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <ShoppingBag size={20} />
        <span className="hidden sm:inline">المتجر</span>
        {/* Pulse indicator */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 animate-pulse" />
      </motion.button>

      {/* Store Sidebar Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-[340px] sm:w-[380px] max-w-[90vw] overflow-hidden flex flex-col"
              style={{ background: 'var(--bg-primary)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 flex-shrink-0" style={{ borderBottom: '1px solid var(--border-color)' }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10b981, #c8a45e)' }}>
                    <ShoppingBag size={18} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                      المتجر
                    </h2>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {products.length + paidProducts.length} منتج
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl hover:bg-gold/10 transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Category Tabs */}
              <div className="flex gap-1 p-3 flex-shrink-0" style={{ background: 'var(--bg-secondary)' }}>
                <button
                  onClick={() => setActiveTab('free')}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'free' ? 'text-white shadow-lg' : ''
                  }`}
                  style={
                    activeTab === 'free'
                      ? { background: 'linear-gradient(135deg, #10b981, #059669)', fontFamily: 'var(--font-heading)' }
                      : { color: 'var(--text-secondary)', background: 'var(--bg-card)', border: '1px solid var(--border-color)', fontFamily: 'var(--font-heading)' }
                  }
                >
                  <Gift size={14} /> المجانية ({products.length})
                </button>
                <button
                  onClick={() => setActiveTab('premium')}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'premium' ? 'text-navy-dark shadow-lg' : ''
                  }`}
                  style={
                    activeTab === 'premium'
                      ? { background: 'linear-gradient(135deg, #c8a45e, #dfc088)', fontFamily: 'var(--font-heading)' }
                      : { color: 'var(--text-secondary)', background: 'var(--bg-card)', border: '1px solid var(--border-color)', fontFamily: 'var(--font-heading)' }
                  }
                >
                  <Crown size={14} /> أديب ماركت ({paidProducts.length})
                </button>
              </div>

              {/* Products List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {activeTab === 'free' ? (
                  <>
                    {products.map((product, i) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          to={`/products/${product.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="glass-card rounded-xl p-3 flex items-start gap-3 group"
                        >
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0" style={{ background: 'var(--bg-primary)' }}>
                            <img src={product.image} alt={product.title} className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xs font-bold line-clamp-2 mb-1 group-hover:text-green-500 transition-colors" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                              {product.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                              <span className="px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 text-xs font-bold">مجاني</span>
                              <span className="flex items-center gap-0.5"><Download size={10} /> {product.downloads}</span>
                              <span className="flex items-center gap-0.5"><Star size={10} className="text-yellow-500 fill-yellow-500" /> {product.rating}</span>
                            </div>
                          </div>
                          <ChevronLeft size={14} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex-shrink-0" />
                        </Link>
                      </motion.div>
                    ))}
                  </>
                ) : (
                  <>
                    {paidProducts.map((product, i) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          to={`/store/premium/${product.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="glass-card rounded-xl p-3 flex items-start gap-3 group"
                        >
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xs font-bold line-clamp-2 mb-1 group-hover:text-gold transition-colors" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                              {product.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                              <span className="px-1.5 py-0.5 rounded bg-gold/10 text-gold text-xs font-bold">
                                {product.price} {product.currency}
                              </span>
                              {product.oldPrice && (
                                <span className="line-through text-red-400">{product.oldPrice}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 mt-1">
                              {product.externalUrl && (
                                <span className="flex items-center gap-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                                  <ExternalLink size={9} /> شراء
                                </span>
                              )}
                              {product.whatsappNumber && (
                                <span className="flex items-center gap-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                                  <MessageCircle size={9} /> واتساب
                                </span>
                              )}
                            </div>
                          </div>
                          <ChevronLeft size={14} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex-shrink-0" />
                        </Link>
                      </motion.div>
                    ))}
                  </>
                )}
              </div>

              {/* Footer - View All */}
              <div className="p-3 flex-shrink-0" style={{ borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                <Link
                  to="/store"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #1a2744, #2a4a7f)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  <ShoppingBag size={16} />
                  فتح صفحة المتجر الكاملة
                  <ArrowLeft size={16} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
