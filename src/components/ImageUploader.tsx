import { useState, useRef, useCallback } from 'react';
import { Upload, Link as LinkIcon, Image, X, Check, Camera } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  presetImages?: string[];
  label?: string;
  aspectHint?: string;
}

export default function ImageUploader({ value, onChange, presetImages, label = 'الصورة', aspectHint }: ImageUploaderProps) {
  const [mode, setMode] = useState<'presets' | 'upload' | 'url'>('presets');
  const [urlInput, setUrlInput] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileToBase64 = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('الملف ليس صورة'));
        return;
      }
      // Limit to 2MB for localStorage
      if (file.size > 2 * 1024 * 1024) {
        // Compress the image
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement('img');
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const maxWidth = 1200;
            const maxHeight = 800;
            let { width, height } = img;

            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              resolve(canvas.toDataURL('image/jpeg', 0.7));
            } else {
              reject(new Error('فشل في معالجة الصورة'));
            }
          };
          img.src = e.target?.result as string;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      } else {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      }
    });
  }, []);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) return;

    setUploading(true);
    try {
      const base64 = await fileToBase64(file);
      onChange(base64);
    } catch (err) {
      console.error('Error processing image:', err);
    }
    setUploading(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, []);

  const handleUrlSubmit = () => {
    const trimmed = urlInput.trim();
    if (trimmed) {
      onChange(trimmed);
      setUrlInput('');
    }
  };

  const inputStyle = {
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
    fontFamily: 'var(--font-body)',
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
        {label}
        {aspectHint && <span className="text-xs font-normal mr-2" style={{ color: 'var(--text-muted)' }}>({aspectHint})</span>}
      </label>

      {/* Current Image Preview */}
      {value && (
        <div className="relative mb-3 rounded-xl overflow-hidden inline-block" style={{ border: '2px solid var(--border-color)' }}>
          <img
            src={value}
            alt="معاينة"
            className="h-32 sm:h-40 w-auto max-w-full object-cover rounded-xl"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-red-500/90 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X size={14} />
          </button>
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-green-500/90 text-white text-xs flex items-center gap-1">
            <Check size={12} /> مُختارة
          </div>
        </div>
      )}

      {/* Mode Tabs */}
      <div className="flex gap-1 mb-3 p-1 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        {presetImages && presetImages.length > 0 && (
          <button
            type="button"
            onClick={() => setMode('presets')}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              mode === 'presets' ? 'bg-navy text-white' : ''
            }`}
            style={mode !== 'presets' ? { color: 'var(--text-secondary)' } : { fontFamily: 'var(--font-heading)' }}
          >
            <Image size={14} /> صور جاهزة
          </button>
        )}
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
            mode === 'upload' ? 'bg-navy text-white' : ''
          }`}
          style={mode !== 'upload' ? { color: 'var(--text-secondary)' } : { fontFamily: 'var(--font-heading)' }}
        >
          <Upload size={14} /> رفع من الجهاز
        </button>
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
            mode === 'url' ? 'bg-navy text-white' : ''
          }`}
          style={mode !== 'url' ? { color: 'var(--text-secondary)' } : { fontFamily: 'var(--font-heading)' }}
        >
          <LinkIcon size={14} /> رابط صورة
        </button>
      </div>

      {/* Preset Images */}
      {mode === 'presets' && presetImages && (
        <div className="grid grid-cols-5 sm:grid-cols-5 gap-2">
          {presetImages.map(img => (
            <button
              key={img}
              type="button"
              onClick={() => onChange(img)}
              className={`rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                value === img ? 'border-gold ring-2 ring-gold/30 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="w-full h-14 object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Upload from Device */}
      {mode === 'upload' && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`rounded-xl p-8 text-center cursor-pointer transition-all ${
            dragOver ? 'scale-[1.02]' : ''
          }`}
          style={{
            background: dragOver ? 'var(--bg-card-hover)' : 'var(--bg-primary)',
            border: `2px dashed ${dragOver ? '#c8a45e' : 'var(--border-color)'}`,
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full border-3 border-gold border-t-transparent animate-spin" />
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>جاري معالجة الصورة...</p>
            </div>
          ) : (
            <>
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-3">
                <Camera size={24} className="text-gold" />
              </div>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                اسحب الصورة هنا أو اضغط للاختيار
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                يدعم: JPG, PNG, GIF, WebP — حد أقصى مُوصى: 2MB
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                📱 يعمل من الهاتف والكمبيوتر
              </p>
            </>
          )}
        </div>
      )}

      {/* URL Input */}
      {mode === 'url' && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleUrlSubmit(); } }}
              placeholder="https://example.com/image.jpg"
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none font-mono"
              dir="ltr"
              style={inputStyle}
            />
            <button
              type="button"
              onClick={handleUrlSubmit}
              disabled={!urlInput.trim()}
              className="px-5 py-3 rounded-xl text-sm font-bold bg-navy text-white hover:bg-navy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              تطبيق
            </button>
          </div>
          <div className="p-3 rounded-lg text-xs" style={{ background: 'var(--bg-card)', color: 'var(--text-muted)' }}>
            💡 <strong>نصيحة:</strong> انسخ رابط أي صورة من الإنترنت (كليك يمين ← نسخ عنوان الصورة) والصقه هنا
          </div>

          {/* URL Preview */}
          {urlInput.trim() && (
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
              <p className="text-xs px-3 py-1.5 font-medium" style={{ color: 'var(--text-muted)', background: 'var(--bg-card)' }}>معاينة:</p>
              <img
                src={urlInput.trim()}
                alt="معاينة الرابط"
                className="w-full h-32 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    const errDiv = document.createElement('div');
                    errDiv.className = 'p-4 text-center text-xs text-red-500';
                    errDiv.textContent = '❌ تعذر تحميل الصورة — تأكد من صحة الرابط';
                    parent.appendChild(errDiv);
                  }
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
