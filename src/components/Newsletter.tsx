import { Mail, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Newsletter() {
  return (
    <section className="py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center px-4"
      >
        <div
          className="rounded-3xl p-8 sm:p-12 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a2744 0%, #2a4a7f 100%)',
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-sky-accent/10 blur-3xl" />
          
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center mx-auto mb-6">
              <Mail size={28} className="text-gold" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              انضم إلى نشرتنا البريدية
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
              احصل على أحدث المقالات والنصائح والأدوات مباشرة في بريدك الإلكتروني. محتوى حصري لمشتركي النشرة.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 px-5 py-3.5 rounded-xl text-sm outline-none bg-white/10 text-white placeholder:text-white/40 border border-white/20 focus:border-gold/50 transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              />
              <button className="px-6 py-3.5 rounded-xl text-sm font-bold bg-gold text-navy-dark hover:bg-gold-light transition-colors flex items-center justify-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                <Send size={16} />
                اشتراك
              </button>
            </form>
            <p className="text-xs text-white/40 mt-4">لا إزعاج. يمكنك إلغاء الاشتراك في أي وقت.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
