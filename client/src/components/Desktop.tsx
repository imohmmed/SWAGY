import { DesktopIcon, WindowType } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { useState } from 'react';
import profileImage from '@assets/IMG_6447.png';

interface DesktopProps {
  onIconDoubleClick: (type: WindowType) => void;
}

const desktopIcons: DesktopIcon[] = [
  { id: 'mycomputer', type: 'mycomputer', icon: 'https://win98icons.alexmeub.com/icons/png/computer_3-2.png', label: 'myComputerIcon', position: { x: 16, y: 16 } },
  { id: 'me', type: 'me', icon: 'https://win98icons.alexmeub.com/icons/png/msagent-4.png', label: 'meIcon', position: { x: 16, y: 96 } },
  { id: 'projects', type: 'projects', icon: 'https://win98icons.alexmeub.com/icons/png/world_network_directories-4.png', label: 'projectsIcon', position: { x: 16, y: 176 } },
  { id: 'music', type: 'music', icon: 'https://win98icons.alexmeub.com/icons/png/cd_audio_cd_a-4.png', label: 'musicIcon', position: { x: 16, y: 256 } },
  { id: 'blog', type: 'blog', icon: 'https://win98icons.alexmeub.com/icons/png/help_question_mark-0.png', label: 'blogIcon', position: { x: 16, y: 336 } },
  { id: 'downloads', type: 'downloads', icon: 'https://win98icons.alexmeub.com/icons/png/world_network_directories-4.png', label: 'downloadsIcon', position: { x: 16, y: 416 } },
  { id: 'contact', type: 'contact', icon: 'https://win98icons.alexmeub.com/icons/png/modem-3.png', label: 'contactIcon', position: { x: 16, y: 496 } },
  { id: 'terminal', type: 'terminal', icon: 'https://win98icons.alexmeub.com/icons/png/console_prompt-0.png', label: 'terminalIcon', position: { x: 96, y: 16 } },
];

const recycleIcon: DesktopIcon = {
  id: 'recycle',
  type: 'recycle',
  icon: 'https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png',
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
    <div className="h-full w-full relative overflow-hidden" style={{ background: '#008080' }}>
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 space-y-2">
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className={`desktop-icon ${selectedIcon === icon.id ? 'selected' : ''}`}
            onClick={() => handleIconClick(icon.id)}
            onDoubleClick={() => handleIconDoubleClick(icon.type)}
          >
            <div className="w-8 h-8 md:w-12 md:h-12 mb-1 flex items-center justify-center">
              <img 
                src={icon.icon} 
                alt={t(icon.label)} 
                className="w-full h-full object-contain"
                draggable={false}
              />
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
          <div className="w-8 h-8 md:w-12 md:h-12 mb-1 flex items-center justify-center">
            <img 
              src={recycleIcon.icon} 
              alt={t(recycleIcon.label)} 
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
          <span className="text-xs">{t(recycleIcon.label)}</span>
        </div>
      </div>
    </div>
  );
}
