import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Lightbulb, Users } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { useStore } from '../lib/store';

export default function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const { author, articles, siteSettings: s } = useStore();

  const values = [
    { icon: <Target size={28} />, title: 'الرسالة', desc: s.missionText },
    { icon: <Eye size={28} />, title: 'الرؤية', desc: s.visionText },
    { icon: <Lightbulb size={28} />, title: 'الابتكار', desc: s.innovationText },
    { icon: <Users size={28} />, title: 'المجتمع', desc: s.communityText },
  ];

  return (
    <div className="pt-24 sm:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6"><Breadcrumbs items={[{ label: s.navAbout }]} /></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{s.aboutTitle.includes('؟') ? <>{s.aboutTitle.replace('؟', '')} <span className="text-gradient">؟</span></> : s.aboutTitle}</h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{s.aboutDescription}</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {values.map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card rounded-2xl p-8">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold mb-4">{v.icon}</div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{v.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-3xl p-8 sm:p-12 text-center mb-16">
          <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>المؤسس</h2>
          <img src={author.avatar} alt={author.name} className="w-24 h-24 rounded-2xl object-cover mx-auto mb-4 ring-4 ring-gold/20" />
          <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{author.name}</h3>
          <p className="text-gold text-sm font-medium mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{author.role}</p>
          <p className="max-w-xl mx-auto" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{author.bio}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {[{ num: s.stat1, label: s.stat1Label }, { num: s.stat2, label: s.stat2Label }, { num: s.stat3, label: s.stat3Label }, { num: s.stat4, label: s.stat4Label }].map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 text-center">
              <span className="text-3xl font-bold text-gold block mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{stat.num}</span>
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
