import { useState, useRef, useCallback } from 'react';
import {
  Upload, Link as LinkIcon, X, Check, Camera, Film,
  FileText, File, Download, Play, Pause, Copy, CheckCircle
} from 'lucide-react';

export interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'file';
  name: string;
  url: string;
  size: string;
  mimeType: string;
  date: string;
}

interface MediaUploaderProps {
  onUpload: (media: MediaItem) => void;
  accept?: 'all' | 'image' | 'video' | 'file';
  label?: string;
  hint?: string;
  compact?: boolean;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function getFileIcon(mimeType: string) {
  if (mimeType.startsWith('image/')) return <Camera size={20} className="text-green-500" />;
  if (mimeType.startsWith('video/')) return <Film size={20} className="text-purple-500" />;
  if (mimeType.includes('pdf')) return <FileText size={20} className="text-red-500" />;
  if (mimeType.includes('word') || mimeType.includes('document')) return <FileText size={20} className="text-blue-500" />;
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return <FileText size={20} className="text-green-600" />;
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return <FileText size={20} className="text-orange-500" />;
  return <File size={20} className="text-slate" />;
}

function getAcceptString(accept: 'all' | 'image' | 'video' | 'file'): string {
  switch (accept) {
    case 'image': return 'image/*';
    case 'video': return 'video/*';
    case 'file': return '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar';
    default: return 'image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar';
  }
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB for localStorage

export default function MediaUploader({ onUpload, accept = 'all', label, hint, compact = false }: MediaUploaderProps) {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showError = (msg: string) => { setError(msg); setTimeout(() => setError(''), 4000); };
  const showSuccess = (msg: string) => { setSuccess(msg); setTimeout(() => setSuccess(''), 3000); };

  const processFile = useCallback(async (file: File) => {
    setUploading(true);
    setError('');

    try {
      // Check size
      if (file.size > MAX_FILE_SIZE) {
        // For images, try to compress
        if (file.type.startsWith('image/')) {
          const compressed = await compressImage(file);
          const media: MediaItem = {
            id: String(Date.now()),
            type: 'image',
            name: file.name,
            url: compressed,
            size: formatSize(file.size),
            mimeType: file.type,
            date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
          };
          onUpload(media);
          showSuccess(`تم رفع الصورة: ${file.name}`);
        } else if (file.type.startsWith('video/')) {
          // Videos > 5MB: warn but still try
          if (file.size > 10 * 1024 * 1024) {
            showError('الفيديو كبير جداً (أكثر من 10MB). يُفضل استخدام رابط خارجي من YouTube أو رابط مباشر.');
            setUploading(false);
            return;
          }
          const base64 = await fileToBase64(file);
          const media: MediaItem = {
            id: String(Date.now()),
            type: 'video',
            name: file.name,
            url: base64,
            size: formatSize(file.size),
            mimeType: file.type,
            date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
          };
          onUpload(media);
          showSuccess(`تم رفع الفيديو: ${file.name}`);
        } else {
          if (file.size > 8 * 1024 * 1024) {
            showError('الملف كبير جداً (أكثر من 8MB). يُفضل رفعه على Google Drive ومشاركة الرابط.');
            setUploading(false);
            return;
          }
          const base64 = await fileToBase64(file);
          const media: MediaItem = {
            id: String(Date.now()),
            type: 'file',
            name: file.name,
            url: base64,
            size: formatSize(file.size),
            mimeType: file.type,
            date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
          };
          onUpload(media);
          showSuccess(`تم رفع الملف: ${file.name}`);
        }
      } else {
        const base64 = await fileToBase64(file);
        const type: 'image' | 'video' | 'file' = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'file';
        const media: MediaItem = {
          id: String(Date.now()),
          type,
          name: file.name,
          url: base64,
          size: formatSize(file.size),
          mimeType: file.type,
          date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
        };
        onUpload(media);
        showSuccess(`تم رفع ${type === 'image' ? 'الصورة' : type === 'video' ? 'الفيديو' : 'الملف'}: ${file.name}`);
      }
    } catch (err) {
      showError('حدث خطأ أثناء معالجة الملف');
    }

    setUploading(false);
  }, [onUpload]);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    processFile(files[0]);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);

  const handleUrlSubmit = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;

    let type: 'image' | 'video' | 'file' = 'file';
    const lower = trimmed.toLowerCase();
    if (lower.match(/\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?|$)/i) || lower.includes('images')) type = 'image';
    else if (lower.match(/\.(mp4|webm|ogg|mov|avi)(\?|$)/i) || lower.includes('youtube') || lower.includes('vimeo')) type = 'video';
    else if (lower.match(/\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt|zip|rar)(\?|$)/i)) type = 'file';

    const name = trimmed.split('/').pop()?.split('?')[0] || 'ملف خارجي';

    const media: MediaItem = {
      id: String(Date.now()),
      type,
      name,
      url: trimmed,
      size: 'رابط خارجي',
      mimeType: type === 'image' ? 'image/*' : type === 'video' ? 'video/*' : 'application/*',
      date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
    };
    onUpload(media);
    setUrlInput('');
    showSuccess('تم إضافة الرابط بنجاح!');
  };

  const inputStyle = {
    background: 'var(--bg-primary)', color: 'var(--text-primary)',
    border: '1px solid var(--border-color)', fontFamily: 'var(--font-body)',
  };

  const acceptLabels = {
    all: 'صور، فيديوهات، ملفات',
    image: 'صور فقط',
    video: 'فيديوهات فقط',
    file: 'ملفات إلكترونية',
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
          {label}
          {hint && <span className="text-xs font-normal mr-2" style={{ color: 'var(--text-muted)' }}>({hint})</span>}
        </label>
      )}

      {/* Status Messages */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl mb-3 bg-red-500/10 text-red-500 text-xs font-medium">
          <X size={14} /> {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 p-3 rounded-xl mb-3 bg-green-500/10 text-green-600 text-xs font-medium">
          <CheckCircle size={14} /> {success}
        </div>
      )}

      {/* Mode Tabs */}
      <div className="flex gap-1 mb-3 p-1 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        <button type="button" onClick={() => setMode('upload')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${mode === 'upload' ? 'bg-navy text-white' : ''}`}
          style={mode !== 'upload' ? { color: 'var(--text-secondary)' } : { fontFamily: 'var(--font-heading)' }}>
          <Upload size={14} /> رفع من الجهاز
        </button>
        <button type="button" onClick={() => setMode('url')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${mode === 'url' ? 'bg-navy text-white' : ''}`}
          style={mode !== 'url' ? { color: 'var(--text-secondary)' } : { fontFamily: 'var(--font-heading)' }}>
          <LinkIcon size={14} /> رابط خارجي
        </button>
      </div>

      {/* Upload Zone */}
      {mode === 'upload' && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`rounded-xl ${compact ? 'p-5' : 'p-8'} text-center cursor-pointer transition-all ${dragOver ? 'scale-[1.02]' : ''}`}
          style={{
            background: dragOver ? 'var(--bg-card-hover)' : 'var(--bg-primary)',
            border: `2px dashed ${dragOver ? '#c8a45e' : 'var(--border-color)'}`,
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={getAcceptString(accept)}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full border-3 border-gold border-t-transparent animate-spin" style={{ borderWidth: 3 }} />
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>جاري المعالجة...</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center"><Camera size={18} className="text-green-500" /></div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center"><Film size={18} className="text-purple-500" /></div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><FileText size={18} className="text-blue-500" /></div>
              </div>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                اسحب الملف هنا أو اضغط للاختيار
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {acceptLabels[accept]} — 📱 يعمل من الهاتف والكمبيوتر
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                صور (JPG, PNG, GIF, WebP) · فيديو (MP4, WebM) · ملفات (PDF, Word, Excel, PowerPoint, ZIP)
              </p>
            </>
          )}
        </div>
      )}

      {/* URL Input */}
      {mode === 'url' && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input type="url" value={urlInput} onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleUrlSubmit(); } }}
              placeholder="https://example.com/file.pdf أو رابط يوتيوب أو رابط صورة"
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none font-mono" dir="ltr" style={inputStyle} />
            <button type="button" onClick={handleUrlSubmit} disabled={!urlInput.trim()}
              className="px-5 py-3 rounded-xl text-sm font-bold bg-navy text-white hover:bg-navy-light transition-colors disabled:opacity-40"
              style={{ fontFamily: 'var(--font-heading)' }}>
              إضافة
            </button>
          </div>
          <div className="p-3 rounded-lg text-xs" style={{ background: 'var(--bg-card)', color: 'var(--text-muted)' }}>
            💡 يمكنك لصق:<br />
            • رابط صورة من الإنترنت<br />
            • رابط فيديو يوتيوب أو رابط MP4 مباشر<br />
            • رابط ملف PDF أو Google Drive
          </div>
        </div>
      )}
    </div>
  );
}

/* ====== Media Preview Card ====== */
export function MediaCard({ media, onRemove, onCopyCode }: { media: MediaItem; onRemove?: () => void; onCopyCode?: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCopy = () => {
    let code = '';
    if (media.type === 'image') {
      code = `<img src="${media.url}" alt="${media.name}" />`;
    } else if (media.type === 'video') {
      if (media.url.includes('youtube') || media.url.includes('youtu.be')) {
        const videoId = media.url.includes('youtu.be') ? media.url.split('/').pop() : new URL(media.url).searchParams.get('v');
        code = `<iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
      } else {
        code = `<video src="${media.url}" controls width="100%"></video>`;
      }
    } else {
      code = `<a href="${media.url}" target="_blank" download>${media.name}</a>`;
    }
    navigator.clipboard.writeText(code);
    setCopied(true);
    onCopyCode?.();
    setTimeout(() => setCopied(false), 2000);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) videoRef.current.pause();
      else videoRef.current.play();
      setPlaying(!playing);
    }
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      {/* Preview */}
      {media.type === 'image' && (
        <img src={media.url} alt={media.name} className="w-full h-36 object-cover" />
      )}
      {media.type === 'video' && (
        <div className="relative">
          {media.url.includes('youtube') || media.url.includes('youtu.be') ? (
            <div className="w-full h-36 bg-black flex items-center justify-center">
              <Play size={32} className="text-white/60" />
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-red-600 text-white text-xs font-bold">YouTube</span>
            </div>
          ) : (
            <>
              <video ref={videoRef} src={media.url} className="w-full h-36 object-cover bg-black"
                onEnded={() => setPlaying(false)} />
              <button onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                {playing ? <Pause size={28} className="text-white" /> : <Play size={28} className="text-white" />}
              </button>
            </>
          )}
        </div>
      )}
      {media.type === 'file' && (
        <div className="h-36 flex flex-col items-center justify-center gap-2" style={{ background: 'var(--bg-primary)' }}>
          {getFileIcon(media.mimeType)}
          <span className="text-xs font-medium px-3 text-center truncate w-full" style={{ color: 'var(--text-secondary)' }}>
            {media.name}
          </span>
        </div>
      )}

      {/* Info */}
      <div className="p-3">
        <p className="text-xs font-semibold truncate mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
          {media.name}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {media.size} · {media.date}
          </span>
          <div className="flex items-center gap-1">
            <button onClick={handleCopy} className="p-1.5 rounded-lg hover:bg-gold/10 transition-colors" title="نسخ كود HTML">
              {copied ? <CheckCircle size={13} className="text-green-500" /> : <Copy size={13} className="text-gold" />}
            </button>
            {media.type === 'file' && !media.url.startsWith('data:') && (
              <a href={media.url} target="_blank" rel="noopener noreferrer" download className="p-1.5 rounded-lg hover:bg-gold/10 transition-colors">
                <Download size={13} className="text-sky-accent" />
              </a>
            )}
            {onRemove && (
              <button onClick={onRemove} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors">
                <X size={13} className="text-red-500" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ====== Helper Functions ====== */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        const maxDim = 1200;
        if (width > maxDim) { height = (height * maxDim) / width; width = maxDim; }
        if (height > maxDim) { width = (width * maxDim) / height; height = maxDim; }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) { ctx.drawImage(img, 0, 0, width, height); resolve(canvas.toDataURL('image/jpeg', 0.7)); }
        else reject(new Error('Canvas error'));
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
