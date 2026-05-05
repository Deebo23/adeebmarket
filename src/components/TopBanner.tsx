import { Link } from 'react-router-dom';
import { Gift, ArrowLeft, X } from 'lucide-react';
import { useStore } from '../lib/store';

interface TopBannerProps {
  visible: boolean;
  onClose: () => void;
}

export default function TopBanner({ visible, onClose }: TopBannerProps) {
  const { siteSettings } = useStore();
  if (!visible || !siteSettings.bannerEnabled) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-[60]" style={{ background: 'linear-gradient(135deg, #1a6fd4 0%, #2a4a7f 50%, #1a2744 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-10 sm:h-11">
          <Link to={siteSettings.bannerLink || '/store'} className="flex items-center gap-2 mx-auto group">
            <Gift size={16} className="text-yellow-300 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-white tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>{siteSettings.bannerText}</span>
            <ArrowLeft size={14} className="text-white/70 group-hover:text-white group-hover:-translate-x-1 transition-all" />
          </Link>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white flex-shrink-0"><X size={16} /></button>
        </div>
      </div>
    </div>
  );
}
