export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  categorySlug: string;
  tags: string[];
  author: Author;
  date: string;
  readTime: string;
  featured?: boolean;
  trending?: boolean;
}

export interface Author {
  name: string;
  bio: string;
  avatar: string;
  role: string;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: string;
  count: number;
}

export const author: Author = {
  name: 'أديب علي',
  bio: 'كاتب ومؤسس أديب ماركت، متخصص في التسويق الرقمي والذكاء الاصطناعي. أسعى لتقديم محتوى عربي أصيل يواكب أحدث التطورات التقنية ويساعد رواد الأعمال العرب على النجاح في العالم الرقمي.',
  avatar: '/images/author.jpg',
  role: 'مؤسس ورئيس التحرير'
};

export const categories: Category[] = [
  { name: 'التسويق الرقمي', slug: 'digital-marketing', description: 'استراتيجيات وأدوات التسويق الرقمي الحديثة', icon: '📊', count: 24 },
  { name: 'الذكاء الاصطناعي', slug: 'artificial-intelligence', description: 'أحدث تطورات الذكاء الاصطناعي وتطبيقاته', icon: '🤖', count: 18 },
  { name: 'ريادة الأعمال', slug: 'entrepreneurship', description: 'قصص نجاح ونصائح لرواد الأعمال', icon: '🚀', count: 15 },
  { name: 'تحسين محركات البحث', slug: 'seo', description: 'تقنيات SEO المتقدمة لتصدر نتائج البحث', icon: '🔍', count: 12 },
  { name: 'التجارة الإلكترونية', slug: 'ecommerce', description: 'بناء وإدارة المتاجر الإلكترونية الناجحة', icon: '🛒', count: 10 },
  { name: 'صناعة المحتوى', slug: 'content-creation', description: 'فن كتابة المحتوى الجذاب والمؤثر', icon: '✍️', count: 20 },
];

const articleContent1 = `
<h2>مقدمة: عصر جديد من التسويق</h2>
<p>يشهد عالم التسويق الرقمي تحولات جذرية مع دخول تقنيات الذكاء الاصطناعي إلى كل جانب من جوانب العملية التسويقية. من تحليل البيانات إلى إنشاء المحتوى، أصبح الذكاء الاصطناعي شريكاً لا غنى عنه لكل مسوق يسعى للتميز في سوق تنافسي متزايد.</p>

<h2>كيف يغير الذكاء الاصطناعي قواعد اللعبة؟</h2>
<p>لم يعد الذكاء الاصطناعي مجرد أداة مساعدة، بل أصبح محركاً أساسياً لاستراتيجيات التسويق الناجحة. الشركات التي تتبنى هذه التقنيات مبكراً تحقق نتائج استثنائية مقارنة بمنافسيها.</p>

<h3>1. التخصيص الفائق (Hyper-Personalization)</h3>
<p>يمكن للذكاء الاصطناعي تحليل سلوك المستخدمين وتفضيلاتهم لتقديم تجارب مخصصة لكل فرد. هذا يعني أن كل عميل يرى محتوى مختلفاً يناسب اهتماماته واحتياجاته، مما يزيد معدلات التحويل بشكل كبير.</p>

<h3>2. تحليل البيانات الضخمة</h3>
<p>بدلاً من قضاء ساعات في تحليل جداول البيانات، يمكن لأدوات الذكاء الاصطناعي معالجة ملايين نقاط البيانات في ثوانٍ واستخراج رؤى قابلة للتنفيذ. هذا يمنح المسوقين القدرة على اتخاذ قرارات مبنية على بيانات حقيقية.</p>

<blockquote>"الشركات التي تستخدم الذكاء الاصطناعي في التسويق تحقق زيادة بنسبة 40% في الإيرادات مقارنة بالشركات التقليدية" - تقرير ماكنزي 2024</blockquote>

<h3>3. أتمتة الحملات التسويقية</h3>
<p>من إرسال رسائل البريد الإلكتروني في الوقت المثالي إلى تعديل ميزانيات الإعلانات تلقائياً، يوفر الذكاء الاصطناعي أتمتة ذكية تتجاوز القواعد البسيطة إلى التعلم المستمر والتحسين الذاتي.</p>

<h2>أدوات ذكاء اصطناعي لا غنى عنها</h2>
<ul>
<li><strong>ChatGPT و Claude:</strong> لإنشاء المحتوى وتوليد الأفكار الإبداعية</li>
<li><strong>Jasper AI:</strong> لكتابة نصوص إعلانية محسنة</li>
<li><strong>Midjourney:</strong> لتصميم صور إبداعية للحملات</li>
<li><strong>HubSpot AI:</strong> لأتمتة التسويق وإدارة العملاء</li>
<li><strong>Google Analytics 4:</strong> لتحليل البيانات بذكاء اصطناعي متقدم</li>
</ul>

<h2>التحديات والفرص</h2>
<p>رغم الإمكانيات الهائلة، يواجه المسوقون تحديات حقيقية في تبني الذكاء الاصطناعي. من أبرزها الحاجة إلى بيانات نظيفة ومنظمة، وضرورة فهم حدود التقنية، والتوازن بين الأتمتة واللمسة الإنسانية.</p>

<h2>الخلاصة</h2>
<p>مستقبل التسويق الرقمي مرتبط ارتباطاً وثيقاً بالذكاء الاصطناعي. المسوقون الذين يتعلمون استخدام هذه الأدوات بفعالية سيكونون في موقع تنافسي أفضل. الوقت الأنسب للبدء هو الآن.</p>
`;

const articleContent2 = `
<h2>لماذا يعتبر تحسين محركات البحث ضرورياً؟</h2>
<p>في عالم يضم أكثر من 1.9 مليار موقع إلكتروني، يصبح الظهور في الصفحة الأولى من نتائج البحث أمراً حيوياً لنجاح أي مشروع رقمي. تحسين محركات البحث ليس مجرد تقنية، بل هو فن يجمع بين الإبداع والتحليل.</p>

<h2>الركائز الأساسية لتحسين محركات البحث في 2025</h2>

<h3>1. تجربة المستخدم أولاً (UX-First SEO)</h3>
<p>غوغل أصبح يعطي أولوية قصوى لتجربة المستخدم. سرعة التحميل، سهولة التنقل، والتصميم المتجاوب كلها عوامل تؤثر مباشرة على ترتيبك في نتائج البحث. المواقع التي توفر تجربة ممتازة للمستخدم تحصل على مكافأة واضحة في الترتيب.</p>

<h3>2. المحتوى المعمق والشامل</h3>
<p>لم يعد المحتوى القصير والسطحي كافياً. محركات البحث تفضل المحتوى الطويل والمعمق الذي يغطي الموضوع من جميع جوانبه ويجيب على أسئلة المستخدمين بشكل شامل.</p>

<blockquote>"المحتوى هو الملك، لكن السياق هو المملكة" - هذه المقولة أصبحت أكثر صحة من أي وقت مضى في عالم SEO الحديث</blockquote>

<h3>3. البحث الصوتي والمحادثات</h3>
<p>مع انتشار المساعدات الذكية مثل Siri و Google Assistant، أصبح تحسين المحتوى للبحث الصوتي ضرورة. هذا يعني التركيز على الأسئلة الطبيعية والإجابات المباشرة.</p>

<h2>استراتيجيات متقدمة</h2>
<ul>
<li><strong>Schema Markup:</strong> استخدام البيانات المنظمة لمساعدة محركات البحث على فهم محتواك</li>
<li><strong>Core Web Vitals:</strong> تحسين مؤشرات الأداء الأساسية للويب</li>
<li><strong>E-E-A-T:</strong> إثبات الخبرة والمصداقية والثقة</li>
<li><strong>Topic Clusters:</strong> بناء مجموعات محتوى مترابطة حول مواضيع رئيسية</li>
</ul>

<h2>أخطاء شائعة يجب تجنبها</h2>
<p>كثير من المواقع تقع في أخطاء تضر بترتيبها دون أن تدري. من أبرز هذه الأخطاء: حشو الكلمات المفتاحية، إهمال الروابط الداخلية، تجاهل تحسين الصور، وعدم تحديث المحتوى القديم.</p>

<h2>الخلاصة</h2>
<p>تحسين محركات البحث رحلة مستمرة وليس وجهة. النجاح يتطلب صبراً واستمرارية وتعلماً دائماً. ابدأ بالأساسيات، ثم تدرج نحو الاستراتيجيات المتقدمة.</p>
`;

const articleContent3 = `
<h2>التجارة الإلكترونية العربية: فرصة ذهبية</h2>
<p>تشهد منطقة الشرق الأوسط وشمال أفريقيا نمواً متسارعاً في قطاع التجارة الإلكترونية. مع تزايد انتشار الإنترنت والهواتف الذكية، أصبحت الفرصة مواتية أكثر من أي وقت مضى لإطلاق متجر إلكتروني ناجح.</p>

<h2>خطوات بناء متجر إلكتروني ناجح</h2>

<h3>1. اختيار المنتج المناسب</h3>
<p>نجاح متجرك يبدأ باختيار المنتج الصحيح. ابحث عن منتجات تحل مشكلة حقيقية، لها طلب متزايد، وهامش ربح معقول. استخدم أدوات مثل Google Trends وأمازون لدراسة السوق.</p>

<h3>2. اختيار المنصة المناسبة</h3>
<p>هناك العديد من المنصات المتاحة مثل Shopify، WooCommerce، وسلة. كل منصة لها مزاياها وعيوبها. اختر المنصة التي تناسب ميزانيتك ومستوى خبرتك التقنية.</p>

<h3>3. تصميم تجربة تسوق مميزة</h3>
<p>التصميم الجذاب وسهولة الاستخدام هما مفتاح تحويل الزوار إلى عملاء. اهتم بصور المنتجات عالية الجودة، وصف واضح ومفصل، وعملية شراء سلسة.</p>

<blockquote>"47% من المتسوقين عبر الإنترنت يتخلون عن سلة التسوق بسبب تعقيد عملية الدفع" - تقرير Baymard Institute</blockquote>

<h2>استراتيجيات التسويق للمتاجر الإلكترونية</h2>
<ul>
<li><strong>التسويق عبر وسائل التواصل:</strong> إنستغرام وتيك توك أصبحا منصات تسوق أساسية</li>
<li><strong>التسويق بالمحتوى:</strong> المدونات والفيديوهات التعليمية تبني الثقة</li>
<li><strong>الإعلانات المدفوعة:</strong> Google Ads و Meta Ads للوصول السريع</li>
<li><strong>التسويق بالبريد الإلكتروني:</strong> لا يزال من أعلى القنوات عائداً</li>
</ul>

<h2>الخلاصة</h2>
<p>التجارة الإلكترونية ليست مجرد موضة عابرة، بل هي مستقبل التجارة. مع التخطيط السليم والتنفيذ المتقن، يمكنك بناء متجر إلكتروني ناجح يحقق دخلاً مستداماً.</p>
`;

export const articles: Article[] = [
  {
    id: '1',
    slug: 'ai-digital-marketing-future-2025',
    title: 'كيف يُعيد الذكاء الاصطناعي تشكيل مستقبل التسويق الرقمي في 2025',
    excerpt: 'يشهد عالم التسويق الرقمي تحولات جذرية مع دخول تقنيات الذكاء الاصطناعي. اكتشف كيف يمكنك الاستفادة من هذه التقنيات لتعزيز استراتيجيتك التسويقية وتحقيق نتائج استثنائية.',
    content: articleContent1,
    image: '/images/hero-ai.jpg',
    category: 'الذكاء الاصطناعي',
    categorySlug: 'artificial-intelligence',
    tags: ['ذكاء اصطناعي', 'تسويق رقمي', 'أتمتة', 'تحليل بيانات'],
    author: author,
    date: '15 يناير 2025',
    readTime: '8 دقائق',
    featured: true,
    trending: true,
  },
  {
    id: '2',
    slug: 'seo-strategies-2025-complete-guide',
    title: 'الدليل الشامل لتحسين محركات البحث: استراتيجيات 2025 المتقدمة',
    excerpt: 'تعرف على أحدث استراتيجيات تحسين محركات البحث التي ستساعدك على تصدر نتائج البحث وزيادة الزيارات العضوية لموقعك بشكل مستدام.',
    content: articleContent2,
    image: '/images/seo.jpg',
    category: 'تحسين محركات البحث',
    categorySlug: 'seo',
    tags: ['SEO', 'محركات البحث', 'غوغل', 'محتوى'],
    author: author,
    date: '12 يناير 2025',
    readTime: '10 دقائق',
    featured: true,
    trending: true,
  },
  {
    id: '3',
    slug: 'ecommerce-success-guide-arabic',
    title: 'كيف تبني متجراً إلكترونياً ناجحاً: دليل شامل للمبتدئين',
    excerpt: 'دليل عملي خطوة بخطوة لإطلاق متجرك الإلكتروني من الصفر حتى تحقيق أول مبيعاتك. تعرف على أفضل المنصات والاستراتيجيات.',
    content: articleContent3,
    image: '/images/ecommerce.jpg',
    category: 'التجارة الإلكترونية',
    categorySlug: 'ecommerce',
    tags: ['تجارة إلكترونية', 'متجر إلكتروني', 'شوبيفاي', 'سلة'],
    author: author,
    date: '10 يناير 2025',
    readTime: '12 دقائق',
    featured: true,
  },
  {
    id: '4',
    slug: 'social-media-marketing-strategies',
    title: 'استراتيجيات التسويق عبر وسائل التواصل الاجتماعي لعام 2025',
    excerpt: 'اكتشف أحدث الاستراتيجيات والأدوات للتسويق عبر إنستغرام وتيك توك ولينكد إن وكيفية بناء حضور رقمي قوي يحقق نتائج ملموسة.',
    content: articleContent1,
    image: '/images/social-media.jpg',
    category: 'التسويق الرقمي',
    categorySlug: 'digital-marketing',
    tags: ['تواصل اجتماعي', 'إنستغرام', 'تيك توك', 'محتوى'],
    author: author,
    date: '8 يناير 2025',
    readTime: '7 دقائق',
    trending: true,
  },
  {
    id: '5',
    slug: 'content-creation-arabic-guide',
    title: 'فن صناعة المحتوى العربي: من الفكرة إلى الانتشار',
    excerpt: 'تعلم كيف تصنع محتوى عربياً مميزاً يجذب الجمهور ويبني علامتك الشخصية. نصائح عملية من خبراء صناعة المحتوى.',
    content: articleContent2,
    image: '/images/content-creation.jpg',
    category: 'صناعة المحتوى',
    categorySlug: 'content-creation',
    tags: ['صناعة محتوى', 'كتابة', 'تدوين', 'علامة شخصية'],
    author: author,
    date: '5 يناير 2025',
    readTime: '9 دقائق',
  },
  {
    id: '6',
    slug: 'startup-success-stories-mena',
    title: 'قصص نجاح ملهمة: كيف حققت شركات ناشئة عربية نمواً استثنائياً',
    excerpt: 'استعرض قصص نجاح حقيقية لشركات ناشئة عربية تمكنت من تحقيق نمو مذهل وجذب استثمارات بملايين الدولارات.',
    content: articleContent3,
    image: '/images/startup.jpg',
    category: 'ريادة الأعمال',
    categorySlug: 'entrepreneurship',
    tags: ['ريادة أعمال', 'شركات ناشئة', 'استثمار', 'نمو'],
    author: author,
    date: '3 يناير 2025',
    readTime: '11 دقائق',
    trending: true,
  },
  {
    id: '7',
    slug: 'email-marketing-automation-guide',
    title: 'التسويق بالبريد الإلكتروني: دليل الأتمتة الذكية لزيادة المبيعات',
    excerpt: 'كيف تبني نظام تسويق بالبريد الإلكتروني آلي يعمل على مدار الساعة لتحويل المشتركين إلى عملاء مخلصين.',
    content: articleContent1,
    image: '/images/email-marketing.jpg',
    category: 'التسويق الرقمي',
    categorySlug: 'digital-marketing',
    tags: ['بريد إلكتروني', 'أتمتة', 'تسويق', 'مبيعات'],
    author: author,
    date: '1 يناير 2025',
    readTime: '8 دقائق',
  },
  {
    id: '8',
    slug: 'ai-tools-productivity-2025',
    title: 'أفضل 15 أداة ذكاء اصطناعي لزيادة إنتاجيتك في 2025',
    excerpt: 'مجموعة مختارة من أقوى أدوات الذكاء الاصطناعي التي ستغير طريقة عملك وتضاعف إنتاجيتك. مراجعة شاملة مع نصائح الاستخدام.',
    content: articleContent2,
    image: '/images/ai-robot.jpg',
    category: 'الذكاء الاصطناعي',
    categorySlug: 'artificial-intelligence',
    tags: ['أدوات', 'إنتاجية', 'ذكاء اصطناعي', 'تقنية'],
    author: author,
    date: '28 ديسمبر 2024',
    readTime: '6 دقائق',
  },
  {
    id: '9',
    slug: 'digital-marketing-budget-planning',
    title: 'كيف تخطط ميزانية التسويق الرقمي: دليل عملي للشركات الصغيرة',
    excerpt: 'تعلم كيف توزع ميزانيتك التسويقية بذكاء عبر القنوات المختلفة لتحقيق أقصى عائد على الاستثمار.',
    content: articleContent3,
    image: '/images/hero-marketing.jpg',
    category: 'التسويق الرقمي',
    categorySlug: 'digital-marketing',
    tags: ['ميزانية', 'تخطيط', 'ROI', 'شركات صغيرة'],
    author: author,
    date: '25 ديسمبر 2024',
    readTime: '7 دقائق',
  },
  {
    id: '10',
    slug: 'team-building-remote-work',
    title: 'بناء فرق العمل عن بُعد: تحديات وحلول إبداعية',
    excerpt: 'كيف تبني فريق عمل متماسك وفعال في عصر العمل عن بُعد. استراتيجيات مجربة لتعزيز التواصل والإنتاجية.',
    content: articleContent1,
    image: '/images/team.jpg',
    category: 'ريادة الأعمال',
    categorySlug: 'entrepreneurship',
    tags: ['عمل عن بعد', 'فرق عمل', 'إدارة', 'إنتاجية'],
    author: author,
    date: '22 ديسمبر 2024',
    readTime: '9 دقائق',
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles.filter(a => a.categorySlug === categorySlug);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter(a => a.featured);
}

export function getTrendingArticles(): Article[] {
  return articles.filter(a => a.trending);
}

export function getLatestArticles(limit?: number): Article[] {
  const sorted = [...articles].sort((a, b) => parseInt(b.id) - parseInt(a.id));
  return limit ? sorted.slice(0, limit) : sorted;
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase();
  return articles.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.excerpt.toLowerCase().includes(q) ||
    a.tags.some(t => t.toLowerCase().includes(q)) ||
    a.category.toLowerCase().includes(q)
  );
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}
