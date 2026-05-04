import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Lightbulb, Users } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { useStore } from '../lib/store';

export default function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const { author, articles } = useStore();

  const values = [
    { icon: <Target size={28} />, title: 'الرسالة', desc: 'تقديم محتوى عربي أصيل وعالي الجودة في مجالات التسويق الرقمي والتقنية وريادة الأعمال، لمساعدة رواد الأعمال العرب على النجاح.' },
    { icon: <Eye size={28} />, title: 'الرؤية', desc: 'أن نكون المرجع الأول للمحتوى الرقمي العربي الاحترافي، ومنصة يثق بها المحترفون والمبتدئون على حد سواء.' },
    { icon: <Lightbulb size={28} />, title: 'الابتكار', desc: 'نؤمن بأن الابتكار هو مفتاح النجاح. نسعى دائماً لتقديم محتوى مبتكر وأفكار جديدة تواكب التطورات العالمية.' },
    { icon: <Users size={28} />, title: 'المجتمع', desc: 'نبني مجتمعاً عربياً رقمياً متعاوناً يتشارك المعرفة والخبرات لتحقيق النمو المشترك.' },
  ];

  return (
    <div className="pt-24 sm:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6"><Breadcrumbs items={[{ label: 'من نحن' }]} /></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>من <span className="text-gradient">نحن؟</span></h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>أديب ماركت هي مجلة رقمية عربية احترافية أسسها Adeeb Ali بهدف إثراء المحتوى العربي في مجالات التسويق الرقمي والذكاء الاصطناعي وريادة الأعمال.</p>
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
          {[{ num: `${articles.length}+`, label: 'مقال منشور' }, { num: '15K+', label: 'قارئ شهري' }, { num: '6', label: 'تصنيفات' }, { num: '3K+', label: 'مشترك نشرة' }].map((stat, i) => (
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
