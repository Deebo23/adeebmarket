import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Article, Author, Category } from './data';
import { articles as defaultArticles, author as defaultAuthor, categories as defaultCategories } from './data';

export interface Subscriber {
  id: string;
  email: string;
  date: string;
}

interface SiteStore {
  articles: Article[];
  author: Author;
  categories: Category[];
  subscribers: Subscriber[];
  isAdminAuth: boolean;
  adminPassword: string;

  // Auth
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  changePassword: (oldPass: string, newPass: string) => boolean;

  // Articles
  addArticle: (article: Article) => void;
  updateArticle: (id: string, data: Partial<Article>) => void;
  deleteArticle: (id: string) => void;

  // Author
  updateAuthor: (data: Partial<Author>) => void;

  // Categories
  addCategory: (category: Category) => void;
  updateCategory: (slug: string, data: Partial<Category>) => void;
  deleteCategory: (slug: string) => void;

  // Subscribers
  addSubscriber: (email: string) => { success: boolean; message: string };
  removeSubscriber: (id: string) => void;

  // Backup
  exportData: () => string;
  importData: (json: string) => boolean;
  resetToDefaults: () => void;

  // Helpers
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
      isAdminAuth: false,
      adminPassword: 'adeeb2025',

      loginAdmin: (password: string) => {
        if (password === get().adminPassword) {
          set({ isAdminAuth: true });
          return true;
        }
        return false;
      },
      logoutAdmin: () => set({ isAdminAuth: false }),

      changePassword: (oldPass: string, newPass: string) => {
        if (oldPass === get().adminPassword && newPass.length >= 4) {
          set({ adminPassword: newPass });
          return true;
        }
        return false;
      },

      addArticle: (article: Article) =>
        set(state => ({ articles: [article, ...state.articles] })),

      updateArticle: (id: string, data: Partial<Article>) =>
        set(state => ({
          articles: state.articles.map(a => a.id === id ? { ...a, ...data } : a),
        })),

      deleteArticle: (id: string) =>
        set(state => ({ articles: state.articles.filter(a => a.id !== id) })),

      updateAuthor: (data: Partial<Author>) =>
        set(state => ({
          author: { ...state.author, ...data },
          articles: state.articles.map(a => ({ ...a, author: { ...a.author, ...data } })),
        })),

      addCategory: (category: Category) =>
        set(state => ({ categories: [...state.categories, category] })),

      updateCategory: (slug: string, data: Partial<Category>) =>
        set(state => ({
          categories: state.categories.map(c => c.slug === slug ? { ...c, ...data } : c),
        })),

      deleteCategory: (slug: string) =>
        set(state => ({ categories: state.categories.filter(c => c.slug !== slug) })),

      addSubscriber: (email: string) => {
        const trimmed = email.trim().toLowerCase();
        if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
          return { success: false, message: 'يرجى إدخال بريد إلكتروني صحيح' };
        }
        const exists = get().subscribers.some(s => s.email === trimmed);
        if (exists) {
          return { success: false, message: 'هذا البريد مشترك بالفعل!' };
        }
        const newSub: Subscriber = {
          id: String(Date.now()),
          email: trimmed,
          date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
        };
        set(state => ({ subscribers: [newSub, ...state.subscribers] }));
        return { success: true, message: 'تم الاشتراك بنجاح! شكراً لك 🎉' };
      },

      removeSubscriber: (id: string) =>
        set(state => ({ subscribers: state.subscribers.filter(s => s.id !== id) })),

      exportData: () => {
        const { articles, author, categories, subscribers } = get();
        return JSON.stringify({ articles, author, categories, subscribers, exportDate: new Date().toISOString(), version: '1.1' }, null, 2);
      },

      importData: (json: string) => {
        try {
          const data = JSON.parse(json);
          if (data.articles && data.author && data.categories) {
            set({
              articles: data.articles,
              author: data.author,
              categories: data.categories,
              subscribers: data.subscribers || [],
            });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },

      resetToDefaults: () => {
        set({ articles: defaultArticles, author: defaultAuthor, categories: defaultCategories, subscribers: [] });
      },

      getArticleBySlug: (slug: string) => get().articles.find(a => a.slug === slug),
      getArticlesByCategory: (categorySlug: string) => get().articles.filter(a => a.categorySlug === categorySlug),
      getFeaturedArticles: () => get().articles.filter(a => a.featured),
      getTrendingArticles: () => get().articles.filter(a => a.trending),
      getLatestArticles: (limit?: number) => {
        const sorted = [...get().articles].sort((a, b) => parseInt(b.id) - parseInt(a.id));
        return limit ? sorted.slice(0, limit) : sorted;
      },
      searchArticles: (query: string) => {
        const q = query.toLowerCase();
        return get().articles.filter(a =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some(t => t.toLowerCase().includes(q)) ||
          a.category.toLowerCase().includes(q)
        );
      },
      getCategoryBySlug: (slug: string) => get().categories.find(c => c.slug === slug),
    }),
    {
      name: 'adeeb-market-store',
      partialize: (state) => ({
        articles: state.articles,
        author: state.author,
        categories: state.categories,
        subscribers: state.subscribers,
        adminPassword: state.adminPassword,
      }),
    }
  )
);
