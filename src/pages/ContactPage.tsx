import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ContactPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="pt-24 sm:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <Breadcrumbs items={[{ label: 'تواصل معنا' }]} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            تواصل <span className="text-gradient">معنا</span>
          </h1>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
            نسعد بتواصلك معنا. أرسل لنا رسالتك وسنرد عليك في أقرب وقت.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info */}
          <div className="space-y-4">
            {[
              { icon: <Mail size={22} />, title: 'البريد الإلكتروني', value: 'hello@adeebmarket.com' },
              { icon: <MapPin size={22} />, title: 'الموقع', value: 'الشرق الأوسط' },
              { icon: <Phone size={22} />, title: 'الهاتف', value: '+966 50 000 0000' },
            ].map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-0.5" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{info.title}</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{info.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass-card rounded-2xl p-6 sm:p-8"
          >
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>شكراً لك!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>تم إرسال رسالتك بنجاح. سنرد عليك قريباً.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>الاسم</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontFamily: 'var(--font-body)' }}
                      placeholder="اسمك الكامل"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>البريد الإلكتروني</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontFamily: 'var(--font-body)' }}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>الموضوع</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                    style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontFamily: 'var(--font-body)' }}
                    placeholder="موضوع الرسالة"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>الرسالة</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-colors"
                    style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontFamily: 'var(--font-body)' }}
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl text-sm font-bold bg-navy text-white hover:bg-navy-light transition-colors flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  <Send size={16} />
                  إرسال الرسالة
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
