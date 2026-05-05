export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  type: 'ebook' | 'template' | 'toolkit' | 'checklist';
  format: string;
  pages?: string;
  features: string[];
  downloadUrl: string;
  downloads: number;
  rating: number;
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'digital-marketing-guide-2025',
    title: 'الدليل الشامل للتسويق الرقمي 2025',
    description: 'كتاب إلكتروني شامل يغطي جميع استراتيجيات التسويق الرقمي الحديثة من SEO إلى الإعلانات المدفوعة والتسويق بالمحتوى.',
    longDescription: `<h2>ماذا ستتعلم من هذا الدليل؟</h2>
<p>هذا الدليل الشامل يأخذك في رحلة متكاملة عبر عالم التسويق الرقمي، من الأساسيات حتى الاستراتيجيات المتقدمة التي يستخدمها المحترفون.</p>

<h3>المحاور الرئيسية:</h3>
<ul>
<li><strong>أساسيات التسويق الرقمي:</strong> فهم القنوات المختلفة وكيفية اختيار الأنسب لمشروعك</li>
<li><strong>تحسين محركات البحث (SEO):</strong> تقنيات عملية لتصدر نتائج البحث</li>
<li><strong>التسويق عبر وسائل التواصل:</strong> استراتيجيات لكل منصة (إنستغرام، تيك توك، لينكد إن)</li>
<li><strong>الإعلانات المدفوعة:</strong> كيف تدير حملات Google Ads و Meta Ads بفعالية</li>
<li><strong>التسويق بالمحتوى:</strong> كتابة محتوى يجذب ويحول الزوار إلى عملاء</li>
<li><strong>التسويق بالبريد الإلكتروني:</strong> بناء قوائم بريدية وحملات أتمتة ذكية</li>
<li><strong>تحليل البيانات:</strong> قراءة التقارير واتخاذ قرارات مبنية على البيانات</li>
</ul>

<h3>لمن هذا الدليل؟</h3>
<p>مناسب لأصحاب المشاريع الصغيرة، المسوقين المبتدئين والمتوسطين، وكل من يريد فهم التسويق الرقمي بشكل عملي وتطبيقي.</p>`,
    image: '/images/products/ebook-marketing.png',
    category: 'التسويق الرقمي',
    type: 'ebook',
    format: 'PDF',
    pages: '85 صفحة',
    features: ['85 صفحة من المحتوى العملي', 'أمثلة وحالات دراسية عربية', 'قوالب جاهزة للتطبيق', 'تحديثات مجانية مدى الحياة'],
    downloadUrl: '#',
    downloads: 2847,
    rating: 4.8,
  },
  {
    id: '2',
    slug: 'ai-tools-guide-2025',
    title: 'دليل أدوات الذكاء الاصطناعي للمسوقين',
    description: 'دليل عملي شامل لأفضل 50+ أداة ذكاء اصطناعي تساعدك في التسويق وإنشاء المحتوى وتحليل البيانات وأتمتة العمل.',
    longDescription: `<h2>أكثر من 50 أداة ذكاء اصطناعي في مكان واحد</h2>
<p>هذا الدليل يجمع لك أفضل أدوات الذكاء الاصطناعي المتاحة حالياً مع شرح عملي لكل أداة وكيفية استخدامها في عملك اليومي.</p>

<h3>الأقسام:</h3>
<ul>
<li><strong>أدوات كتابة المحتوى:</strong> ChatGPT, Claude, Jasper, Copy.ai</li>
<li><strong>أدوات تصميم الصور:</strong> Midjourney, DALL-E, Canva AI</li>
<li><strong>أدوات الفيديو:</strong> Runway, Synthesia, HeyGen</li>
<li><strong>أدوات تحليل البيانات:</strong> GA4 AI, Hotjar, Mixpanel</li>
<li><strong>أدوات الأتمتة:</strong> Zapier AI, Make, n8n</li>
<li><strong>أدوات SEO:</strong> Surfer SEO, Clearscope, Semrush AI</li>
</ul>

<h3>ما يميز هذا الدليل:</h3>
<p>كل أداة مشروحة بالتفصيل مع أمثلة عملية، مقارنات بين الأدوات المتشابهة، وتوصيات حسب الميزانية ومستوى الخبرة.</p>`,
    image: '/images/products/ebook-ai.png',
    category: 'الذكاء الاصطناعي',
    type: 'ebook',
    format: 'PDF',
    pages: '62 صفحة',
    features: ['50+ أداة مشروحة بالتفصيل', 'مقارنات وتوصيات', 'روابط مباشرة لكل أداة', 'يُحدّث دورياً'],
    downloadUrl: '#',
    downloads: 3521,
    rating: 4.9,
  },
  {
    id: '3',
    slug: 'social-media-templates-pack',
    title: 'حزمة قوالب سوشيال ميديا الاحترافية',
    description: '120+ قالب جاهز للتعديل لإنستغرام وتيك توك ولينكد إن وتويتر. تصاميم احترافية بألوان وخطوط عربية.',
    longDescription: `<h2>120+ قالب احترافي جاهز للاستخدام</h2>
<p>وفّر ساعات من التصميم مع هذه الحزمة الشاملة من القوالب الاحترافية المصممة خصيصاً للمحتوى العربي.</p>

<h3>محتويات الحزمة:</h3>
<ul>
<li><strong>40 قالب إنستغرام:</strong> بوستات، ستوريز، كاروسيل، ريلز</li>
<li><strong>30 قالب تيك توك:</strong> أغلفة، نصوص متحركة، عناوين</li>
<li><strong>25 قالب لينكد إن:</strong> بوستات احترافية، بانرات، إنفوغرافيك</li>
<li><strong>25 قالب تويتر:</strong> تغريدات مصورة، هيدرات، ثريدات</li>
</ul>

<h3>المميزات:</h3>
<p>جميع القوالب قابلة للتعديل عبر Canva (مجاني). تدعم الخطوط العربية بالكامل مع ألوان متناسقة وتصاميم عصرية.</p>`,
    image: '/images/products/templates-social.png',
    category: 'صناعة المحتوى',
    type: 'template',
    format: 'Canva + PNG',
    features: ['120+ قالب قابل للتعديل', 'يعمل مع Canva المجاني', 'خطوط عربية احترافية', 'ألوان وتصاميم عصرية'],
    downloadUrl: '#',
    downloads: 5103,
    rating: 4.7,
  },
  {
    id: '4',
    slug: 'monthly-content-planner',
    title: 'مخطط المحتوى الشهري + تقويم النشر',
    description: 'جدول تخطيط محتوى شهري شامل مع تقويم نشر وأفكار محتوى جاهزة لـ 365 يوم. نظّم محتواك باحترافية.',
    longDescription: `<h2>خطط محتواك لسنة كاملة!</h2>
<p>هذا المخطط يساعدك على تنظيم وجدولة محتواك عبر جميع المنصات بشكل احترافي ومنظم.</p>

<h3>ماذا يتضمن:</h3>
<ul>
<li><strong>تقويم نشر شهري:</strong> جدول Excel/Sheets قابل للتعديل لكل شهر</li>
<li><strong>365 فكرة محتوى:</strong> فكرة لكل يوم مصنفة حسب المنصة والموضوع</li>
<li><strong>قوالب كتابة:</strong> صيغ جاهزة للتغريدات والبوستات والكابشن</li>
<li><strong>متتبع الأداء:</strong> جدول لتتبع أداء المحتوى والتفاعل</li>
<li><strong>قائمة الهاشتاقات:</strong> أفضل الهاشتاقات العربية حسب المجال</li>
</ul>

<h3>مناسب لـ:</h3>
<p>صناع المحتوى، مدراء حسابات التواصل الاجتماعي، أصحاب المشاريع الصغيرة، وفرق التسويق.</p>`,
    image: '/images/products/content-planner.png',
    category: 'صناعة المحتوى',
    type: 'checklist',
    format: 'Excel + PDF',
    features: ['تقويم 12 شهر قابل للتعديل', '365 فكرة محتوى جاهزة', 'قوالب كتابة احترافية', 'متتبع أداء مدمج'],
    downloadUrl: '#',
    downloads: 4210,
    rating: 4.9,
  },
  {
    id: '5',
    slug: 'seo-complete-checklist',
    title: 'قائمة فحص SEO الشاملة + دليل التطبيق',
    description: 'قائمة فحص تفصيلية لتحسين موقعك لمحركات البحث تغطي SEO التقني والمحتوى والروابط مع شرح كل خطوة.',
    longDescription: `<h2>حسّن موقعك خطوة بخطوة</h2>
<p>هذه القائمة الشاملة تغطي كل جانب من جوانب تحسين محركات البحث مع شرح مبسط لكل خطوة وأدوات مجانية للتنفيذ.</p>

<h3>أقسام القائمة:</h3>
<ul>
<li><strong>SEO التقني:</strong> سرعة الموقع، الزحف، الفهرسة، Schema Markup</li>
<li><strong>SEO المحتوى:</strong> بحث الكلمات المفتاحية، تحسين العناوين، بنية المحتوى</li>
<li><strong>SEO الروابط:</strong> بناء الروابط الخلفية، الروابط الداخلية</li>
<li><strong>SEO المحلي:</strong> Google Business Profile، المراجعات</li>
<li><strong>Core Web Vitals:</strong> LCP, FID, CLS وكيفية تحسينها</li>
</ul>

<h3>ما يميز هذا الدليل:</h3>
<p>كل بند في القائمة مشروح بالتفصيل مع أدوات مجانية للتنفيذ وأمثلة عملية. مناسب للمبتدئين والمتقدمين.</p>`,
    image: '/images/products/ebook-seo.png',
    category: 'تحسين محركات البحث',
    type: 'checklist',
    format: 'PDF + Excel',
    pages: '45 صفحة',
    features: ['200+ بند فحص مفصّل', 'أدوات مجانية لكل خطوة', 'أولويات التنفيذ محددة', 'قابل للطباعة والتعديل'],
    downloadUrl: '#',
    downloads: 2156,
    rating: 4.8,
  },
  {
    id: '6',
    slug: 'startup-toolkit-arabic',
    title: 'حقيبة رائد الأعمال: أدوات وقوالب البداية',
    description: 'كل ما تحتاجه لبدء مشروعك: نموذج خطة عمل، دراسة جدوى، حاسبة تكاليف، عقود جاهزة، وقوالب عروض تقديمية.',
    longDescription: `<h2>ابدأ مشروعك بثقة واحترافية</h2>
<p>هذه الحقيبة تجمع كل الأدوات والقوالب التي يحتاجها رائد الأعمال لبدء مشروعه بشكل احترافي ومنظم.</p>

<h3>محتويات الحقيبة:</h3>
<ul>
<li><strong>نموذج خطة عمل:</strong> قالب Word جاهز للتعديل مع شرح كل قسم</li>
<li><strong>دراسة جدوى مبسطة:</strong> جدول Excel لحساب التكاليف والإيرادات المتوقعة</li>
<li><strong>Business Model Canvas:</strong> نموذج عمل تجاري بالعربي</li>
<li><strong>قوالب عروض تقديمية:</strong> 3 قوالب PowerPoint احترافية للمستثمرين</li>
<li><strong>عقود جاهزة:</strong> عقد شراكة، عقد عمل، اتفاقية سرية</li>
<li><strong>حاسبة التسعير:</strong> أداة Excel لتحديد الأسعار المناسبة</li>
</ul>

<h3>لمن هذه الحقيبة؟</h3>
<p>لكل من يفكر في بدء مشروع جديد أو يريد تنظيم مشروعه الحالي باحترافية.</p>`,
    image: '/images/products/toolkit-startup.png',
    category: 'ريادة الأعمال',
    type: 'toolkit',
    format: 'Word + Excel + PPT + PDF',
    features: ['15+ قالب وأداة جاهزة', 'عقود قانونية معتمدة', 'حاسبات مالية تلقائية', 'عروض تقديمية للمستثمرين'],
    downloadUrl: '#',
    downloads: 1893,
    rating: 4.7,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}
