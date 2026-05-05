import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, FileText, FolderOpen, User, Plus,
  Edit3, Trash2, LogOut, Home, Eye, Star, TrendingUp,
  Settings, ChevronLeft, Download, Upload, RotateCcw,
  Lock, Shield, Database, AlertTriangle, CheckCircle,
  Mail, Users, Copy, Film, Camera, FileText as FileDoc
} from 'lucide-react';
import { useStore } from '../../lib/store';
import ImageUploader from '../../components/ImageUploader';
import MediaUploader, { MediaCard } from '../../components/MediaUploader';

type Tab = 'overview' | 'articles' | 'new-article' | 'edit-article' | 'categories' | 'profile' | 'media' | 'subscribers' | 'settings';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const { articles, categories, author, subscribers, logoutAdmin, isAdminAuth } = useStore();
  const navigate = useNavigate();

  if (!isAdminAuth) {
    navigate('/admin/login');
    return null;
  }

  const handleEditArticle = (id: string) => {
    setEditingArticleId(id);
    setActiveTab('edit-article');
  };

  const sidebarItems = [
    { id: 'overview' as Tab, label: 'نظرة عامة', icon: <LayoutDashboard size={18} /> },
    { id: 'articles' as Tab, label: 'المقالات', icon: <FileText size={18} /> },
    { id: 'new-article' as Tab, label: 'مقال جديد', icon: <Plus size={18} /> },
    { id: 'categories' as Tab, label: 'التصنيفات', icon: <FolderOpen size={18} /> },
    { id: 'profile' as Tab, label: 'الملف الشخصي', icon: <User size={18} /> },
    { id: 'media' as Tab, label: 'الوسائط', icon: <Film size={18} /> },
    { id: 'subscribers' as Tab, label: `المشتركين (${subscribers.length})`, icon: <Mail size={18} /> },
    { id: 'settings' as Tab, label: 'الإعدادات', icon: <Settings size={18} /> },
  ];

  return (
    <div className="pt-20 min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
              <Shield size={20} className="text-gold" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                لوحة التحكم
              </h1>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>مرحباً، {author.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/" className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-gold/10" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-heading)' }}>
              <Home size={16} /> <span className="hidden sm:inline">الموقع</span>
            </Link>
            <button
              onClick={() => { logoutAdmin(); navigate('/'); }}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <LogOut size={16} /> <span className="hidden sm:inline">خروج</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <nav className="lg:w-56 flex-shrink-0">
            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
              {sidebarItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    activeTab === item.id ? 'bg-navy text-white shadow-lg' : ''
                  }`}
                  style={activeTab !== item.id ? { color: 'var(--text-secondary)', background: 'var(--bg-card)', border: '1px solid var(--border-color)' } : { fontFamily: 'var(--font-heading)' }}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {activeTab === 'overview' && <OverviewTab articles={articles} categories={categories} />}
            {activeTab === 'articles' && <ArticlesTab articles={articles} onEdit={handleEditArticle} />}
            {activeTab === 'new-article' && <ArticleForm onDone={() => setActiveTab('articles')} />}
            {activeTab === 'edit-article' && editingArticleId && (
              <ArticleForm articleId={editingArticleId} onDone={() => { setActiveTab('articles'); setEditingArticleId(null); }} />
            )}
            {activeTab === 'categories' && <CategoriesTab />}
            {activeTab === 'profile' && <ProfileTab author={author} />}
            {activeTab === 'media' && <MediaLibraryTab />}
            {activeTab === 'subscribers' && <SubscribersTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ====== Overview Tab ====== */
function OverviewTab({ articles, categories }: { articles: any[]; categories: any[] }) {
  const { subscribers } = useStore();
  const featured = articles.filter(a => a.featured).length;
  const trending = articles.filter(a => a.trending).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-lg font-bold mb-6" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
        نظرة عامة على الموقع
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {[
          { num: articles.length, label: 'إجمالي المقالات', icon: <FileText size={20} />, color: 'text-sky-accent' },
          { num: categories.length, label: 'التصنيفات', icon: <FolderOpen size={20} />, color: 'text-gold' },
          { num: featured, label: 'مقالات مميزة', icon: <Star size={20} />, color: 'text-yellow-500' },
          { num: trending, label: 'رائجة', icon: <TrendingUp size={20} />, color: 'text-orange-500' },
          { num: subscribers.length, label: 'مشتركي النشرة', icon: <Mail size={20} />, color: 'text-green-500' },
        ].map((stat, i) => (
          <div key={i} className="glass-card rounded-2xl p-5">
            <div className={`${stat.color} mb-2`}>{stat.icon}</div>
            <span className="text-2xl font-bold block" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{stat.num}</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.label}</span>
          </div>
        ))}
      </div>

      <h3 className="text-base font-bold mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>آخر المقالات</h3>
      <div className="space-y-3">
        {articles.slice(0, 5).map(article => (
          <div key={article.id} className="glass-card rounded-xl p-4 flex items-center gap-4">
            <img src={article.image} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{article.title}</h4>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{article.category} · {article.date}</span>
            </div>
            <Link to={`/article/${article.slug}`} className="text-gold hover:text-gold-light transition-colors flex-shrink-0">
              <Eye size={16} />
            </Link>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ====== Articles Tab ====== */
function ArticlesTab({ articles, onEdit }: { articles: any[]; onEdit: (id: string) => void }) {
  const { deleteArticle } = useStore();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    deleteArticle(id);
    setDeleteConfirm(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
          إدارة المقالات ({articles.length})
        </h2>
      </div>

      <div className="space-y-3">
        {articles.map(article => (
          <div key={article.id} className="glass-card rounded-xl p-4">
            <div className="flex items-start gap-4">
              <img src={article.image} alt="" className="w-20 h-16 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold mb-1 line-clamp-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{article.title}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs px-2 py-0.5 rounded bg-gold/10 text-gold">{article.category}</span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{article.date}</span>
                      {article.featured && <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-600">⭐ مميز</span>}
                      {article.trending && <span className="text-xs px-2 py-0.5 rounded bg-orange-500/10 text-orange-500">🔥 رائج</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Link to={`/article/${article.slug}`} className="p-2 rounded-lg hover:bg-gold/10 transition-colors text-sky-accent" title="عرض"><Eye size={16} /></Link>
                    <button onClick={() => onEdit(article.id)} className="p-2 rounded-lg hover:bg-gold/10 transition-colors text-gold" title="تعديل"><Edit3 size={16} /></button>
                    {deleteConfirm === article.id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleDelete(article.id)} className="px-2 py-1 rounded-lg text-xs bg-red-500 text-white">حذف</button>
                        <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 rounded-lg text-xs" style={{ color: 'var(--text-muted)' }}>إلغاء</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(article.id)} className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-red-500" title="حذف"><Trash2 size={16} /></button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ====== Article Form (Create/Edit) ====== */
function ArticleForm({ articleId, onDone }: { articleId?: string; onDone: () => void }) {
  const { articles, categories, author, addArticle, updateArticle } = useStore();
  const existingArticle = articleId ? articles.find(a => a.id === articleId) : null;

  const [form, setForm] = useState({
    title: existingArticle?.title || '',
    slug: existingArticle?.slug || '',
    excerpt: existingArticle?.excerpt || '',
    content: existingArticle?.content || '',
    image: existingArticle?.image || '/images/hero-ai.jpg',
    categorySlug: existingArticle?.categorySlug || categories[0]?.slug || '',
    tags: existingArticle?.tags.join(', ') || '',
    date: existingArticle?.date || new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
    readTime: existingArticle?.readTime || '5 دقائق',
    featured: existingArticle?.featured || false,
    trending: existingArticle?.trending || false,
  });

  const [saved, setSaved] = useState(false);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s\u0600-\u06FF-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 60) || `article-${Date.now()}`;
  };

  const handleTitleChange = (title: string) => {
    setForm(f => ({
      ...f,
      title,
      slug: existingArticle ? f.slug : generateSlug(title),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find(c => c.slug === form.categorySlug);
    const articleData = {
      id: existingArticle?.id || String(Date.now()),
      slug: form.slug || generateSlug(form.title),
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      image: form.image,
      category: cat?.name || '',
      categorySlug: form.categorySlug,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      author,
      date: form.date,
      readTime: form.readTime,
      featured: form.featured,
      trending: form.trending,
    };

    if (existingArticle) {
      updateArticle(existingArticle.id, articleData);
    } else {
      addArticle(articleData);
    }
    setSaved(true);
    setTimeout(() => { setSaved(false); onDone(); }, 1500);
  };

  const inputStyle = { background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontFamily: 'var(--font-body)' };

  const presetImages = [
    '/images/hero-ai.jpg', '/images/hero-marketing.jpg', '/images/seo.jpg',
    '/images/ecommerce.jpg', '/images/social-media.jpg', '/images/content-creation.jpg',
    '/images/startup.jpg', '/images/email-marketing.jpg', '/images/ai-robot.jpg', '/images/team.jpg',
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onDone} className="p-2 rounded-lg hover:bg-gold/10 transition-colors" style={{ color: 'var(--text-muted)' }}>
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
          {existingArticle ? 'تعديل المقال' : 'مقال جديد'}
        </h2>
      </div>

      {saved && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl mb-6 bg-green-500/10 text-green-600 text-sm font-medium text-center flex items-center justify-center gap-2">
          <CheckCircle size={18} /> تم الحفظ بنجاح!
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>عنوان المقال *</label>
          <input type="text" required value={form.title} onChange={e => handleTitleChange(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={inputStyle} placeholder="أدخل عنوان المقال" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>الرابط (Slug)</label>
          <input type="text" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="w-full px-4 py-3 rounded-xl text-sm outline-none font-mono" dir="ltr" style={inputStyle} placeholder="article-url-slug" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>الوصف المختصر *</label>
          <textarea required rows={3} value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none" style={inputStyle} placeholder="وصف مختصر يظهر في بطاقة المقال" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            محتوى المقال * <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>(يدعم HTML)</span>
          </label>
          <textarea required rows={12} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-y font-mono" style={{ ...inputStyle, lineHeight: 1.8 }} placeholder={'<h2>العنوان</h2>\n<p>الفقرة...</p>'} />
          <div className="mt-2 p-3 rounded-lg text-xs" style={{ background: 'var(--bg-card)', color: 'var(--text-muted)' }}>
            💡 <strong>نصيحة:</strong> استخدم <code className="text-gold">&lt;h2&gt;</code> للعناوين الرئيسية، <code className="text-gold">&lt;h3&gt;</code> للعناوين الفرعية، <code className="text-gold">&lt;p&gt;</code> للفقرات، <code className="text-gold">&lt;ul&gt;&lt;li&gt;</code> للقوائم، <code className="text-gold">&lt;blockquote&gt;</code> للاقتباسات
          </div>
        </div>

        <ImageUploader
          value={form.image}
          onChange={(url) => setForm(f => ({ ...f, image: url }))}
          presetImages={presetImages}
          label="صورة المقال"
          aspectHint="يُفضل 16:9 أفقية"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>التصنيف</label>
            <select value={form.categorySlug} onChange={e => setForm(f => ({ ...f, categorySlug: e.target.value }))} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={inputStyle}>
              {categories.map(c => <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>التاريخ</label>
            <input type="text" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={inputStyle} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>وقت القراءة</label>
            <input type="text" value={form.readTime} onChange={e => setForm(f => ({ ...f, readTime: e.target.value }))} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={inputStyle} placeholder="5 دقائق" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>الوسوم <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>(مفصولة بفواصل)</span></label>
          <input type="text" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={inputStyle} placeholder="تسويق, ذكاء اصطناعي, أدوات" />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 rounded accent-gold" />
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>⭐ مقال مميز</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.trending} onChange={e => setForm(f => ({ ...f, trending: e.target.checked }))} className="w-4 h-4 rounded accent-orange-500" />
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>🔥 رائج</span>
          </label>
        </div>

        <div className="flex items-center gap-3 pt-4">
          <button type="submit" className="px-8 py-3.5 rounded-xl text-sm font-bold bg-navy text-white hover:bg-navy-light transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
            {existingArticle ? 'حفظ التعديلات' : 'نشر المقال'}
          </button>
          <button type="button" onClick={onDone} className="px-6 py-3.5 rounded-xl text-sm font-medium transition-colors" style={{ color: 'var(--text-muted)' }}>
            إلغاء
          </button>
        </div>
      </form>
    </motion.div>
  );
}

/* ====== Categories Tab ====== */
function CategoriesTab() {
  const { categories, addCategory, updateCategory, deleteCategory } = useStore();
  const [editing, setEditing] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [newCat, setNewCat] = useState({ name: '', slug: '', description: '', icon: '📌', count: 0 });
  const [editData, setEditData] = useState({ name: '', description: '', icon: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addCategory({ ...newCat, slug: newCat.slug || newCat.name.toLowerCase().replace(/\s+/g, '-') });
    setNewCat({ name: '', slug: '', description: '', icon: '📌', count: 0 });
    setShowNew(false);
  };

  const startEdit = (cat: any) => {
    setEditing(cat.slug);
    setEditData({ name: cat.name, description: cat.description, icon: cat.icon });
  };

  const saveEdit = (slug: string) => {
    updateCategory(slug, editData);
    setEditing(null);
  };

  const inputStyle = { background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontFamily: 'var(--font-body)' };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>إدارة التصنيفات</h2>
        <button onClick={() => setShowNew(!showNew)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-navy text-white hover:bg-navy-light transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
          <Plus size={16} /> تصنيف جديد
        </button>
      </div>

      {showNew && (
        <form onSubmit={handleAdd} className="glass-card rounded-xl p-5 mb-6 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input type="text" required value={newCat.icon} onChange={e => setNewCat(c => ({ ...c, icon: e.target.value }))} className="px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} placeholder="الأيقونة 📌" />
            <input type="text" required value={newCat.name} onChange={e => setNewCat(c => ({ ...c, name: e.target.value }))} className="px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} placeholder="اسم التصنيف" />
            <input type="text" value={newCat.slug} onChange={e => setNewCat(c => ({ ...c, slug: e.target.value }))} className="px-3 py-2 rounded-lg text-sm outline-none font-mono" dir="ltr" style={inputStyle} placeholder="slug (اختياري)" />
          </div>
          <input type="text" value={newCat.description} onChange={e => setNewCat(c => ({ ...c, description: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} placeholder="وصف التصنيف" />
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 rounded-lg text-sm font-medium bg-navy text-white">إضافة</button>
            <button type="button" onClick={() => setShowNew(false)} className="px-4 py-2 rounded-lg text-sm" style={{ color: 'var(--text-muted)' }}>إلغاء</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {categories.map(cat => (
          <div key={cat.slug} className="glass-card rounded-xl p-4">
            {editing === cat.slug ? (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input type="text" value={editData.icon} onChange={e => setEditData(d => ({ ...d, icon: e.target.value }))} className="px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} />
                  <input type="text" value={editData.name} onChange={e => setEditData(d => ({ ...d, name: e.target.value }))} className="px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} />
                  <input type="text" value={editData.description} onChange={e => setEditData(d => ({ ...d, description: e.target.value }))} className="px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => saveEdit(cat.slug)} className="px-4 py-1.5 rounded-lg text-xs font-medium bg-navy text-white">حفظ</button>
                  <button onClick={() => setEditing(null)} className="px-4 py-1.5 rounded-lg text-xs" style={{ color: 'var(--text-muted)' }}>إلغاء</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{cat.name}</h3>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{cat.description} · {cat.count} مقال</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => startEdit(cat)} className="p-2 rounded-lg hover:bg-gold/10 transition-colors text-gold"><Edit3 size={14} /></button>
                  <button onClick={() => deleteCategory(cat.slug)} className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-red-500"><Trash2 size={14} /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ====== Profile Tab ====== */
function ProfileTab({ author }: { author: any }) {
  const { updateAuthor } = useStore();
  const [form, setForm] = useState({ name: author.name, bio: author.bio, role: author.role, avatar: author.avatar });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAuthor(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputStyle = { background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontFamily: 'var(--font-body)' };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-lg font-bold mb-6" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>الملف الشخصي</h2>

      {saved && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl mb-6 bg-green-500/10 text-green-600 text-sm font-medium text-center flex items-center justify-center gap-2">
          <CheckCircle size={18} /> تم حفظ التعديلات!
        </motion.div>
      )}

      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <ImageUploader
            value={form.avatar}
            onChange={(url) => setForm(f => ({ ...f, avatar: url }))}
            label="الصورة الشخصية"
            aspectHint="يُفضل مربعة 1:1"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>الاسم</label>
              <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={inputStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>المسمى الوظيفي</label>
              <input type="text" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={inputStyle} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>النبذة التعريفية</label>
            <textarea rows={4} value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none" style={inputStyle} />
          </div>
          <button type="submit" className="px-8 py-3.5 rounded-xl text-sm font-bold bg-navy text-white hover:bg-navy-light transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
            حفظ التعديلات
          </button>
        </form>
      </div>
    </motion.div>
  );
}

/* ====== Settings Tab ====== */
function SettingsTab() {
  const { exportData, importData, resetToDefaults, changePassword } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showReset, setShowReset] = useState(false);

  const [passForm, setPassForm] = useState({ oldPass: '', newPass: '', confirmPass: '' });

  const showMsg = (type: 'success' | 'error', text: string) => {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3000);
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `adeeb-market-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showMsg('success', 'تم تصدير النسخة الاحتياطية بنجاح!');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      if (importData(text)) {
        showMsg('success', 'تم استيراد البيانات بنجاح! ستظهر التعديلات فوراً.');
      } else {
        showMsg('error', 'فشل استيراد البيانات. تأكد من صحة الملف.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    resetToDefaults();
    setShowReset(false);
    showMsg('success', 'تم إعادة البيانات للوضع الافتراضي.');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passForm.newPass !== passForm.confirmPass) {
      showMsg('error', 'كلمة المرور الجديدة غير متطابقة!');
      return;
    }
    if (passForm.newPass.length < 4) {
      showMsg('error', 'كلمة المرور يجب أن تكون 4 أحرف على الأقل');
      return;
    }
    if (changePassword(passForm.oldPass, passForm.newPass)) {
      showMsg('success', 'تم تغيير كلمة المرور بنجاح!');
      setPassForm({ oldPass: '', newPass: '', confirmPass: '' });
    } else {
      showMsg('error', 'كلمة المرور الحالية غير صحيحة!');
    }
  };

  const inputStyle = { background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontFamily: 'var(--font-body)' };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
        الإعدادات
      </h2>

      {msg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl text-sm font-medium text-center flex items-center justify-center gap-2 ${
            msg.type === 'success' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-500'
          }`}
        >
          {msg.type === 'success' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
          {msg.text}
        </motion.div>
      )}

      {/* Password Change */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
            <Lock size={20} className="text-gold" />
          </div>
          <div>
            <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>تغيير كلمة المرور</h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>قم بتغيير كلمة المرور لحماية لوحة التحكم</p>
          </div>
        </div>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>كلمة المرور الحالية</label>
            <input type="password" required value={passForm.oldPass} onChange={e => setPassForm(f => ({ ...f, oldPass: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>كلمة المرور الجديدة</label>
              <input type="password" required value={passForm.newPass} onChange={e => setPassForm(f => ({ ...f, newPass: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>تأكيد كلمة المرور</label>
              <input type="password" required value={passForm.confirmPass} onChange={e => setPassForm(f => ({ ...f, confirmPass: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} />
            </div>
          </div>
          <button type="submit" className="px-6 py-2.5 rounded-xl text-sm font-bold bg-navy text-white hover:bg-navy-light transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
            تغيير كلمة المرور
          </button>
        </form>
      </div>

      {/* Backup & Restore */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-sky-accent/10 flex items-center justify-center">
            <Database size={20} className="text-sky-accent" />
          </div>
          <div>
            <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>النسخ الاحتياطي والاستعادة</h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>صدّر بياناتك كملف JSON واستعدها في أي وقت على أي جهاز</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold bg-navy text-white hover:bg-navy-light transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <Download size={18} /> تصدير نسخة احتياطية
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold transition-colors"
            style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '2px dashed var(--border-color)', fontFamily: 'var(--font-heading)' }}
          >
            <Upload size={18} /> استيراد من ملف
          </button>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
        </div>

        <div className="p-4 rounded-xl text-xs" style={{ background: 'var(--bg-primary)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>
          <p className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>💡 كيف تستخدم النسخ الاحتياطي:</p>
          <ol className="space-y-1.5 list-decimal list-inside">
            <li>اضغط <strong>"تصدير نسخة احتياطية"</strong> ← سيتم تحميل ملف JSON</li>
            <li>احفظ الملف في مكان آمن (جهازك أو Google Drive)</li>
            <li>عند الحاجة: اضغط <strong>"استيراد من ملف"</strong> ← اختر الملف المحفوظ</li>
            <li>ستعود جميع بياناتك (مقالات، تصنيفات، بروفايل) فوراً!</li>
          </ol>
        </div>
      </div>

      {/* Reset */}
      <div className="glass-card rounded-2xl p-6" style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <AlertTriangle size={20} className="text-red-500" />
          </div>
          <div>
            <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>منطقة الخطر</h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>إعادة ضبط جميع البيانات للوضع الافتراضي</p>
          </div>
        </div>

        {showReset ? (
          <div className="p-4 rounded-xl bg-red-500/5" style={{ border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <p className="text-sm mb-3 font-medium text-red-500">⚠️ هل أنت متأكد؟ سيتم حذف جميع التعديلات والمقالات المضافة وإعادة البيانات الافتراضية!</p>
            <div className="flex gap-2">
              <button onClick={handleReset} className="px-5 py-2 rounded-lg text-sm font-bold bg-red-500 text-white hover:bg-red-600 transition-colors">
                نعم، إعادة الضبط
              </button>
              <button onClick={() => setShowReset(false)} className="px-5 py-2 rounded-lg text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                إلغاء
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowReset(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
          >
            <RotateCcw size={16} /> إعادة ضبط المصنع
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ====== Subscribers Tab ====== */
function SubscribersTab() {
  const { subscribers, removeSubscriber } = useStore();
  const [copied, setCopied] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleCopyAll = () => {
    const emails = subscribers.map(s => s.email).join('\n');
    navigator.clipboard.writeText(emails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportCSV = () => {
    const header = 'البريد الإلكتروني,تاريخ الاشتراك\n';
    const rows = subscribers.map(s => `${s.email},${s.date}`).join('\n');
    const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = (id: string) => {
    removeSubscriber(id);
    setDeleteConfirm(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            المشتركين في النشرة البريدية
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            {subscribers.length} مشترك
          </p>
        </div>
        {subscribers.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors"
              style={{ background: 'var(--bg-card)', color: copied ? '#22c55e' : 'var(--text-secondary)', border: '1px solid var(--border-color)', fontFamily: 'var(--font-heading)' }}
            >
              <Copy size={14} />
              {copied ? 'تم النسخ!' : 'نسخ الكل'}
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-navy text-white hover:bg-navy-light transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <Download size={14} />
              تصدير CSV
            </button>
          </div>
        )}
      </div>

      {subscribers.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
            <Users size={28} className="text-gold" />
          </div>
          <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            لا يوجد مشتركين بعد
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            عندما يشترك أحد في النشرة البريدية من الموقع سيظهر هنا
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {subscribers.map((sub, i) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="glass-card rounded-xl p-4 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-gold" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate" dir="ltr" style={{ color: 'var(--text-primary)' }}>
                    {sub.email}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    اشترك في {sub.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {deleteConfirm === sub.id ? (
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleDelete(sub.id)} className="px-2 py-1 rounded-lg text-xs bg-red-500 text-white">حذف</button>
                    <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 rounded-lg text-xs" style={{ color: 'var(--text-muted)' }}>إلغاء</button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(sub.id)}
                    className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-red-500"
                    title="إلغاء الاشتراك"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ====== Media Library Tab ====== */
function MediaLibraryTab() {
  const { mediaLibrary, addMedia, removeMedia } = useStore();
  const [filter, setFilter] = useState<'all' | 'image' | 'video' | 'file'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = filter === 'all' ? mediaLibrary : mediaLibrary.filter(m => m.type === filter);

  const images = mediaLibrary.filter(m => m.type === 'image').length;
  const videos = mediaLibrary.filter(m => m.type === 'video').length;
  const files = mediaLibrary.filter(m => m.type === 'file').length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
        مكتبة الوسائط
      </h2>
      <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
        ارفع الصور والفيديوهات والملفات الإلكترونية وانسخ كودها لإدراجها في المقالات
      </p>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { num: mediaLibrary.length, label: 'الكل', icon: <Upload size={16} />, color: 'text-gold', f: 'all' as const },
          { num: images, label: 'صور', icon: <Camera size={16} />, color: 'text-green-500', f: 'image' as const },
          { num: videos, label: 'فيديو', icon: <Film size={16} />, color: 'text-purple-500', f: 'video' as const },
          { num: files, label: 'ملفات', icon: <FileDoc size={16} />, color: 'text-blue-500', f: 'file' as const },
        ].map((s, i) => (
          <button
            key={i}
            onClick={() => setFilter(s.f)}
            className={`glass-card rounded-xl p-3 text-center transition-all ${filter === s.f ? 'ring-2 ring-gold/40' : ''}`}
          >
            <div className={`${s.color} flex justify-center mb-1`}>{s.icon}</div>
            <span className="text-lg font-bold block" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{s.num}</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Upload Section */}
      <div className="mb-8">
        <MediaUploader
          onUpload={(media) => addMedia(media)}
          accept="all"
          label="رفع ملف جديد"
          hint="صور، فيديوهات، ملفات إلكترونية"
        />
      </div>

      {/* How to use */}
      <div className="p-4 rounded-xl mb-6 text-xs" style={{ background: 'var(--bg-card)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>
        <p className="font-bold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>📋 كيف تستخدم الوسائط في المقالات:</p>
        <ol className="space-y-1 list-decimal list-inside">
          <li>ارفع الملف من هنا (صورة أو فيديو أو ملف)</li>
          <li>اضغط زر <strong className="text-gold">النسخ</strong> 📋 على البطاقة</li>
          <li>سيتم نسخ كود HTML تلقائياً</li>
          <li>الصقه في محتوى المقال عند التعديل أو الإنشاء</li>
        </ol>
        <div className="mt-3 p-2 rounded-lg font-mono text-xs" dir="ltr" style={{ background: 'var(--bg-primary)' }}>
          صورة: <span className="text-green-500">{'<img src="..." alt="..." />'}</span><br />
          فيديو: <span className="text-purple-500">{'<video src="..." controls></video>'}</span><br />
          ملف: <span className="text-blue-500">{'<a href="..." download>اسم الملف</a>'}</span>
        </div>
      </div>

      {/* Media Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((media) => (
            <MediaCard
              key={media.id}
              media={media}
              onRemove={() => removeMedia(media.id)}
              onCopyCode={() => { setCopiedId(media.id); setTimeout(() => setCopiedId(null), 2000); }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 glass-card rounded-2xl">
          <Upload size={32} className="text-gold mx-auto mb-3 opacity-40" />
          <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            {filter === 'all' ? 'لا توجد وسائط بعد. ارفع أول ملف!' : `لا توجد ${filter === 'image' ? 'صور' : filter === 'video' ? 'فيديوهات' : 'ملفات'} بعد`}
          </p>
        </div>
      )}
    </motion.div>
  );
}
