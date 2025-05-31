import { DesktopIcon, WindowType } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { useState } from 'react';

interface DesktopProps {
  onIconDoubleClick: (type: WindowType) => void;
}

const desktopIcons: DesktopIcon[] = [
  { id: 'me', type: 'me', icon: '📝', label: 'meIcon', position: { x: 16, y: 16 } },
  { id: 'projects', type: 'projects', icon: '📁', label: 'projectsIcon', position: { x: 16, y: 96 } },
  { id: 'music', type: 'music', icon: '🎵', label: 'musicIcon', position: { x: 16, y: 176 } },
  { id: 'gallery', type: 'gallery', icon: '📸', label: 'galleryIcon', position: { x: 16, y: 256 } },
  { id: 'blog', type: 'blog', icon: '🧠', label: 'blogIcon', position: { x: 16, y: 336 } },
  { id: 'downloads', type: 'downloads', icon: '📦', label: 'downloadsIcon', position: { x: 16, y: 416 } },
  { id: 'contact', type: 'contact', icon: '💬', label: 'contactIcon', position: { x: 16, y: 496 } },
  { id: 'terminal', type: 'terminal', icon: '🖥️', label: 'terminalIcon', position: { x: 16, y: 576 } },
];

const recycleIcon: DesktopIcon = {
  id: 'recycle',
  type: 'recycle',
  icon: '🗑️',
  label: 'recycleIcon',
  position: { x: 0, y: 16 } // Will be positioned on the right
};

export function Desktop({ onIconDoubleClick }: DesktopProps) {
  const { t } = useLanguage();
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const handleIconClick = (iconId: string) => {
    setSelectedIcon(iconId);
  };

  const handleIconDoubleClick = (type: WindowType) => {
    setSelectedIcon(null);
    onIconDoubleClick(type);
  };

  return (
    <div className="h-full w-full desktop-pattern relative overflow-hidden">
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 space-y-2">
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className={`desktop-icon ${selectedIcon === icon.id ? 'selected' : ''}`}
            onClick={() => handleIconClick(icon.id)}
            onDoubleClick={() => handleIconDoubleClick(icon.type)}
          >
            <div className="w-8 h-8 md:w-12 md:h-12 mb-1 text-2xl md:text-3xl flex items-center justify-center">
              {icon.icon}
            </div>
            <span className="text-xs">{t(icon.label)}</span>
          </div>
        ))}
      </div>
      
      {/* Recycle Bin - Top Right */}
      <div className="absolute top-4 right-4">
        <div
          className={`desktop-icon ${selectedIcon === recycleIcon.id ? 'selected' : ''}`}
          onClick={() => handleIconClick(recycleIcon.id)}
          onDoubleClick={() => handleIconDoubleClick(recycleIcon.type)}
        >
          <div className="w-8 h-8 md:w-12 md:h-12 mb-1 text-2xl md:text-3xl flex items-center justify-center">
            {recycleIcon.icon}
          </div>
          <span className="text-xs">{t(recycleIcon.label)}</span>
        </div>
      </div>
    </div>
  );
}
