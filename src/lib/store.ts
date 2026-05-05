import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Article, Author, Category } from './data';
import { articles as defaultArticles, author as defaultAuthor, categories as defaultCategories } from './data';
import type { MediaItem } from '../components/MediaUploader';

export type { MediaItem };

export interface Subscriber {
  id: string;
  email: string;
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: string;
  oldPrice?: string;
  image: string;
  category: string;
  fileUrl?: string;
  externalUrl?: string;
  features: string[];
  badge?: string;
  active: boolean;
  date: string;
}

export interface SiteSettings {
  // Branding
  siteName: string;
  siteDescription: string;
  logoUrl: string;
  faviconUrl: string;

  // Social Links
  twitterUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  youtubeUrl: string;

  // Contact Info
  contactEmail: string;
  contactPhone: string;
  contactLocation: string;

  // About Page
  aboutTitle: string;
  aboutDescription: string;
  missionText: string;
  visionText: string;
  innovationText: string;
  communityText: string;
  stat1: string;
  stat1Label: string;
  stat2: string;
  stat2Label: string;
  stat3: string;
  stat3Label: string;
  stat4: string;
  stat4Label: string;

  // Footer
  footerDescription: string;
  copyrightText: string;
  copyrightOwner: string;

  // Navigation Labels
  navHome: string;
  navArchive: string;
  navAbout: string;
  navContact: string;
  navStore: string;

  // Newsletter
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterButtonText: string;

  // Hero Section
  heroEnabled: boolean;

  // Banner
  bannerText: string;
  bannerEnabled: boolean;
  bannerLink: string;
}

const defaultSettings: SiteSettings = {
  siteName: 'أديب ماركت',
  siteDescription: 'مجلة رقمية عربية احترافية متخصصة في التسويق الرقمي والذكاء الاصطناعي وريادة الأعمال',
  logoUrl: '/images/logo.png',
  faviconUrl: '/favicon.svg',

  twitterUrl: '',
  linkedinUrl: '',
  instagramUrl: '',
  youtubeUrl: '',

  contactEmail: 'hello@adeebmarket.com',
  contactPhone: '+966 50 000 0000',
  contactLocation: 'الشرق الأوسط',

  aboutTitle: 'من نحن؟',
  aboutDescription: 'أديب ماركت هي مجلة رقمية عربية احترافية أسسها Adeeb Ali بهدف إثراء المحتوى العربي في مجالات التسويق الرقمي والذكاء الاصطناعي وريادة الأعمال.',
  missionText: 'تقديم محتوى عربي أصيل وعالي الجودة في مجالات التسويق الرقمي والتقنية وريادة الأعمال، لمساعدة رواد الأعمال العرب على النجاح.',
  visionText: 'أن نكون المرجع الأول للمحتوى الرقمي العربي الاحترافي، ومنصة يثق بها المحترفون والمبتدئون على حد سواء.',
  innovationText: 'نؤمن بأن الابتكار هو مفتاح النجاح. نسعى دائماً لتقديم محتوى مبتكر وأفكار جديدة تواكب التطورات العالمية.',
  communityText: 'نبني مجتمعاً عربياً رقمياً متعاوناً يتشارك المعرفة والخبرات لتحقيق النمو المشترك.',
  stat1: '50+', stat1Label: 'مقال منشور',
  stat2: '15K+', stat2Label: 'قارئ شهري',
  stat3: '6', stat3Label: 'تصنيفات',
  stat4: '3K+', stat4Label: 'مشترك نشرة',

  footerDescription: 'مجلة رقمية عربية احترافية متخصصة في التسويق الرقمي والذكاء الاصطناعي وريادة الأعمال. نقدم محتوى عربي أصيل بجودة عالمية.',
  copyrightText: '© 2025 أديب ماركت. جميع الحقوق محفوظة.',
  copyrightOwner: 'Adeeb Ali',

  navHome: 'الرئيسية',
  navArchive: 'الأرشيف',
  navAbout: 'من نحن',
  navContact: 'تواصل معنا',
  navStore: 'المتجر',

  newsletterTitle: 'انضم إلى نشرتنا البريدية',
  newsletterDescription: 'احصل على أحدث المقالات والنصائح والأدوات مباشرة في بريدك الإلكتروني. محتوى حصري لمشتركي النشرة.',
  newsletterButtonText: 'اشتراك',

  heroEnabled: true,

  bannerText: '🚀 تصفح منتجاتنا الرقمية الجديدة',
  bannerEnabled: true,
  bannerLink: '/store',
};

interface SiteStore {
  articles: Article[];
  author: Author;
  categories: Category[];
  subscribers: Subscriber[];
  mediaLibrary: MediaItem[];
  products: Product[];
  siteSettings: SiteSettings;
  isAdminAuth: boolean;
  adminPassword: string;

  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  changePassword: (oldPass: string, newPass: string) => boolean;

  addArticle: (article: Article) => void;
  updateArticle: (id: string, data: Partial<Article>) => void;
  deleteArticle: (id: string) => void;

  updateAuthor: (data: Partial<Author>) => void;

  addCategory: (category: Category) => void;
  updateCategory: (slug: string, data: Partial<Category>) => void;
  deleteCategory: (slug: string) => void;

  addSubscriber: (email: string) => { success: boolean; message: string };
  removeSubscriber: (id: string) => void;

  addMedia: (media: MediaItem) => void;
  removeMedia: (id: string) => void;

  addProduct: (product: Product) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;

  updateSiteSettings: (data: Partial<SiteSettings>) => void;

  exportData: () => string;
  importData: (json: string) => boolean;
  resetToDefaults: () => void;

  getArticleBySlug: (slug: string) => Article | undefined;
  getArticlesByCategory: (categorySlug: string) => Article[];
  getFeaturedArticles: () => Article[];
  getTrendingArticles: () => Article[];
  getLatestArticles: (limit?: number) => Article[];
  searchArticles: (query: string) => Article[];
  getCategoryBySlug: (slug: string) => Category | undefined;
}

export const useStore = create<SiteStore>()(
  persist(
    (set, get) => ({
      articles: defaultArticles,
      author: defaultAuthor,
      categories: defaultCategories,
      subscribers: [],
      mediaLibrary: [],
      products: [],
      siteSettings: defaultSettings,
      isAdminAuth: false,
      adminPassword: 'adeeb2025',

      loginAdmin: (p: string) => { if (p === get().adminPassword) { set({ isAdminAuth: true }); return true; } return false; },
      logoutAdmin: () => set({ isAdminAuth: false }),
      changePassword: (o: string, n: string) => { if (o === get().adminPassword && n.length >= 4) { set({ adminPassword: n }); return true; } return false; },

      addArticle: (a) => set(s => ({ articles: [a, ...s.articles] })),
      updateArticle: (id, d) => set(s => ({ articles: s.articles.map(a => a.id === id ? { ...a, ...d } : a) })),
      deleteArticle: (id) => set(s => ({ articles: s.articles.filter(a => a.id !== id) })),

      updateAuthor: (d) => set(s => ({ author: { ...s.author, ...d }, articles: s.articles.map(a => ({ ...a, author: { ...a.author, ...d } })) })),

      addCategory: (c) => set(s => ({ categories: [...s.categories, c] })),
      updateCategory: (slug, d) => set(s => ({ categories: s.categories.map(c => c.slug === slug ? { ...c, ...d } : c) })),
      deleteCategory: (slug) => set(s => ({ categories: s.categories.filter(c => c.slug !== slug) })),

      addSubscriber: (email) => {
        const t = email.trim().toLowerCase();
        if (!t || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return { success: false, message: 'يرجى إدخال بريد إلكتروني صحيح' };
        if (get().subscribers.some(s => s.email === t)) return { success: false, message: 'هذا البريد مشترك بالفعل!' };
        set(s => ({ subscribers: [{ id: String(Date.now()), email: t, date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }) }, ...s.subscribers] }));
        return { success: true, message: 'تم الاشتراك بنجاح! شكراً لك 🎉' };
      },
      removeSubscriber: (id) => set(s => ({ subscribers: s.subscribers.filter(x => x.id !== id) })),

      addMedia: (m) => set(s => ({ mediaLibrary: [m, ...s.mediaLibrary] })),
      removeMedia: (id) => set(s => ({ mediaLibrary: s.mediaLibrary.filter(m => m.id !== id) })),

      addProduct: (p) => set(s => ({ products: [p, ...s.products] })),
      updateProduct: (id, d) => set(s => ({ products: s.products.map(p => p.id === id ? { ...p, ...d } : p) })),
      removeProduct: (id) => set(s => ({ products: s.products.filter(p => p.id !== id) })),
      getProductBySlug: (slug) => get().products.find(p => p.slug === slug),

      updateSiteSettings: (d) => set(s => ({ siteSettings: { ...s.siteSettings, ...d } })),

      exportData: () => {
        const { articles, author, categories, subscribers, mediaLibrary, products, siteSettings } = get();
        return JSON.stringify({ articles, author, categories, subscribers, mediaLibrary, products, siteSettings, exportDate: new Date().toISOString(), version: '3.0' }, null, 2);
      },
      importData: (json) => {
        try {
          const d = JSON.parse(json);
          if (d.articles && d.author && d.categories) {
            set({ articles: d.articles, author: d.author, categories: d.categories, subscribers: d.subscribers || [], mediaLibrary: d.mediaLibrary || [], products: d.products || [], siteSettings: d.siteSettings ? { ...defaultSettings, ...d.siteSettings } : defaultSettings });
            return true;
          }
          return false;
        } catch { return false; }
      },
      resetToDefaults: () => set({ articles: defaultArticles, author: defaultAuthor, categories: defaultCategories, subscribers: [], mediaLibrary: [], products: [], siteSettings: defaultSettings }),

      getArticleBySlug: (slug) => get().articles.find(a => a.slug === slug),
      getArticlesByCategory: (cs) => get().articles.filter(a => a.categorySlug === cs),
      getFeaturedArticles: () => get().articles.filter(a => a.featured),
      getTrendingArticles: () => get().articles.filter(a => a.trending),
      getLatestArticles: (limit) => { const sorted = [...get().articles].sort((a, b) => parseInt(b.id) - parseInt(a.id)); return limit ? sorted.slice(0, limit) : sorted; },
      searchArticles: (query) => { const q = query.toLowerCase(); return get().articles.filter(a => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q)) || a.category.toLowerCase().includes(q)); },
      getCategoryBySlug: (slug) => get().categories.find(c => c.slug === slug),
    }),
    {
      name: 'adeeb-market-store',
      partialize: (s) => ({ articles: s.articles, author: s.author, categories: s.categories, subscribers: s.subscribers, mediaLibrary: s.mediaLibrary, products: s.products, siteSettings: s.siteSettings, adminPassword: s.adminPassword }),
    }
  )
);
