export interface PaidProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  price: string;
  oldPrice?: string;
  currency: string;
  features: string[];
  externalUrl?: string;
  whatsappNumber: string;
  whatsappMessage: string;
  badge?: string;
  inStock: boolean;
}

export const paidProducts: PaidProduct[] = [
  {
    id: 'p1',
    slug: 'advanced-marketing-masterclass',
    title: 'ماستركلاس التسويق الرقمي المتقدم',
    description: 'دورة تدريبية شاملة تغطي استراتيجيات التسويق المتقدمة مع تطبيقات عملية وشهادة إتمام معتمدة.',
    longDescription: `<h2>ماذا ستتعلم؟</h2>
<p>دورة متقدمة تأخذك من المستوى المتوسط إلى الاحتراف في التسويق الرقمي مع تطبيقات عملية حقيقية على مشاريع واقعية.</p>
<h3>محاور الدورة:</h3>
<ul>
<li><strong>استراتيجيات النمو السريع:</strong> Growth Hacking وتقنيات التوسع</li>
<li><strong>إعلانات متقدمة:</strong> حملات إعلانية بميزانيات كبيرة وتحسين ROI</li>
<li><strong>تحليل البيانات المتقدم:</strong> Google Analytics 4 وأدوات التتبع</li>
<li><strong>أتمتة التسويق:</strong> بناء أنظمة تسويق آلية متكاملة</li>
<li><strong>التسويق بالذكاء الاصطناعي:</strong> استخدام AI في كل مرحلة</li>
</ul>`,
    image: '/images/hero-marketing.jpg',
    category: 'دورات تدريبية',
    price: '299',
    oldPrice: '499',
    currency: 'ر.س',
    features: ['24 ساعة محتوى فيديو', 'تطبيقات عملية', 'شهادة إتمام', 'دعم مباشر لمدة 3 أشهر', 'تحديثات مجانية'],
    externalUrl: '',
    whatsappNumber: '966500000000',
    whatsappMessage: 'مرحباً، أرغب في شراء ماستركلاس التسويق الرقمي المتقدم',
    badge: 'الأكثر مبيعاً',
    inStock: true,
  },
  {
    id: 'p2',
    slug: 'seo-professional-toolkit',
    title: 'حقيبة أدوات SEO الاحترافية',
    description: 'مجموعة متكاملة من القوالب والأدوات والأدلة لتحسين محركات البحث باحترافية مع تحديثات دورية.',
    longDescription: `<h2>كل ما تحتاجه لاحتراف SEO</h2>
<p>حقيبة أدوات شاملة تتضمن قوالب Excel، أدلة عملية، قوائم فحص، وأدوات تحليل جاهزة للاستخدام.</p>
<h3>المحتويات:</h3>
<ul>
<li><strong>قالب تدقيق SEO شامل:</strong> أكثر من 200 نقطة فحص</li>
<li><strong>قالب بحث الكلمات المفتاحية:</strong> مع أدوات تحليل المنافسين</li>
<li><strong>خطة محتوى 12 شهر:</strong> قالب جاهز للتعديل</li>
<li><strong>تقارير SEO شهرية:</strong> قوالب احترافية للعملاء</li>
<li><strong>دليل بناء الروابط:</strong> استراتيجيات عملية مجربة</li>
</ul>`,
    image: '/images/seo.jpg',
    category: 'أدوات احترافية',
    price: '149',
    oldPrice: '249',
    currency: 'ر.س',
    features: ['15+ قالب احترافي', 'أدلة عملية مفصلة', 'تحديثات ربع سنوية', 'دعم فني عبر الواتساب'],
    externalUrl: '',
    whatsappNumber: '966500000000',
    whatsappMessage: 'مرحباً، أرغب في شراء حقيبة أدوات SEO الاحترافية',
    badge: 'جديد',
    inStock: true,
  },
  {
    id: 'p3',
    slug: 'ai-business-automation',
    title: 'نظام أتمتة الأعمال بالذكاء الاصطناعي',
    description: 'نظام متكامل لأتمتة عمليات التسويق والمبيعات وخدمة العملاء باستخدام أحدث أدوات الذكاء الاصطناعي.',
    longDescription: `<h2>أتمت عملك بالكامل</h2>
<p>نظام جاهز للتطبيق يساعدك على أتمتة 80% من المهام الروتينية باستخدام الذكاء الاصطناعي.</p>
<h3>ماذا يتضمن:</h3>
<ul>
<li><strong>أتمتة البريد الإلكتروني:</strong> سلاسل رسائل ذكية مبنية مسبقاً</li>
<li><strong>شات بوت ذكي:</strong> قالب جاهز لخدمة العملاء</li>
<li><strong>أتمتة المحتوى:</strong> نظام لإنشاء ونشر المحتوى تلقائياً</li>
<li><strong>تقارير آلية:</strong> لوحات بيانات تتحدث تلقائياً</li>
</ul>`,
    image: '/images/ai-robot.jpg',
    category: 'أنظمة ذكية',
    price: '499',
    currency: 'ر.س',
    features: ['نظام متكامل جاهز', 'فيديوهات شرح تفصيلية', 'دعم تقني لمدة 6 أشهر', 'تحديثات مجانية مدى الحياة', 'جلسة إعداد مجانية'],
    externalUrl: '',
    whatsappNumber: '966500000000',
    whatsappMessage: 'مرحباً، أرغب في شراء نظام أتمتة الأعمال بالذكاء الاصطناعي',
    badge: 'مميز',
    inStock: true,
  },
];

export function getPaidProductBySlug(slug: string): PaidProduct | undefined {
  return paidProducts.find(p => p.slug === slug);
}
