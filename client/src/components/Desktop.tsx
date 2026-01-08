import { DesktopIcon, WindowType } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { useState, useRef, useCallback } from 'react';

interface DesktopProps {
  onIconDoubleClick: (type: WindowType) => void;
}

const desktopIcons: DesktopIcon[] = [
  { id: 'mycomputer', type: 'mycomputer', icon: 'https://win98icons.alexmeub.com/icons/png/computer_explorer_cool-0.png', label: 'myComputerIcon', position: { x: 20, y: 20 } },
  { id: 'games', type: 'games', icon: 'https://win98icons.alexmeub.com/icons/png/game_spider-0.png', label: 'gamesIcon', position: { x: 110, y: 20 } },
  { id: 'me', type: 'me', icon: 'https://win98icons.alexmeub.com/icons/png/msagent-4.png', label: 'meIcon', position: { x: 20, y: 110 } },
  { id: 'terminal', type: 'terminal', icon: 'https://win98icons.alexmeub.com/icons/png/console_prompt-0.png', label: 'terminalIcon', position: { x: 110, y: 110 } },
  { id: 'projects', type: 'projects', icon: 'https://win98icons.alexmeub.com/icons/png/world_network_directories-4.png', label: 'projectsIcon', position: { x: 20, y: 200 } },
  { id: 'music', type: 'music', icon: 'https://win98icons.alexmeub.com/icons/png/cd_audio_cd_a-4.png', label: 'musicIcon', position: { x: 20, y: 290 } },
  { id: 'blog', type: 'blog', icon: 'https://win98icons.alexmeub.com/icons/png/help_question_mark-0.png', label: 'blogIcon', position: { x: 20, y: 380 } },
  { id: 'downloads', type: 'downloads', icon: 'https://win98icons.alexmeub.com/icons/png/world_network_directories-4.png', label: 'downloadsIcon', position: { x: 20, y: 470 } },
  { id: 'contact', type: 'contact', icon: 'https://win98icons.alexmeub.com/icons/png/modem-3.png', label: 'contactIcon', position: { x: 20, y: 560 } },
];

const recycleIcon: DesktopIcon = {
  id: 'recycle',
  type: 'recycle',
  icon: 'https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png',
  label: 'recycleIcon',
  position: { x: 0, y: 20 }
};

interface SelectionBox {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

export function Desktop({ onIconDoubleClick }: DesktopProps) {
  const { t } = useLanguage();
  const [selectedIcons, setSelectedIcons] = useState<Set<string>>(new Set());
  const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const desktopRef = useRef<HTMLDivElement>(null);

  const handleIconClick = (iconId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (e.ctrlKey || e.metaKey) {
      setSelectedIcons(prev => {
        const newSet = new Set(prev);
        if (newSet.has(iconId)) {
          newSet.delete(iconId);
        } else {
          newSet.add(iconId);
        }
        return newSet;
      });
    } else {
      setSelectedIcons(new Set([iconId]));
    }
  };

  const handleIconDoubleClick = (type: WindowType) => {
    setSelectedIcons(new Set());
    onIconDoubleClick(type);
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.desktop-icon')) return;
    
    const rect = desktopRef.current?.getBoundingClientRect();
    if (!rect) return;

    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;

    setSelectionBox({
      startX,
      startY,
      currentX: startX,
      currentY: startY
    });
    setIsSelecting(true);
    setSelectedIcons(new Set());
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isSelecting || !selectionBox) return;

    const rect = desktopRef.current?.getBoundingClientRect();
    if (!rect) return;

    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    setSelectionBox(prev => prev ? { ...prev, currentX, currentY } : null);

    const boxLeft = Math.min(selectionBox.startX, currentX);
    const boxRight = Math.max(selectionBox.startX, currentX);
    const boxTop = Math.min(selectionBox.startY, currentY);
    const boxBottom = Math.max(selectionBox.startY, currentY);

    const newSelected = new Set<string>();

    [...desktopIcons, recycleIcon].forEach(icon => {
      let iconX = icon.position.x;
      let iconY = icon.position.y;

      if (icon.id === 'recycle') {
        iconX = rect.width - 70;
      }

      const iconWidth = 70;
      const iconHeight = 80;

      if (
        iconX < boxRight &&
        iconX + iconWidth > boxLeft &&
        iconY < boxBottom &&
        iconY + iconHeight > boxTop
      ) {
        newSelected.add(icon.id);
      }
    });

    setSelectedIcons(newSelected);
  }, [isSelecting, selectionBox]);

  const handleMouseUp = useCallback(() => {
    setIsSelecting(false);
    setSelectionBox(null);
  }, []);

  const getSelectionBoxStyle = () => {
    if (!selectionBox) return {};

    const left = Math.min(selectionBox.startX, selectionBox.currentX);
    const top = Math.min(selectionBox.startY, selectionBox.currentY);
    const width = Math.abs(selectionBox.currentX - selectionBox.startX);
    const height = Math.abs(selectionBox.currentY - selectionBox.startY);

    return {
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
    };
  };

  return (
    <div 
      ref={desktopRef}
      className="h-full w-full relative overflow-hidden select-none" 
      style={{ background: '#008080' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Selection Box */}
      {isSelecting && selectionBox && (
        <div
          className="absolute pointer-events-none"
          style={{
            ...getSelectionBoxStyle(),
            border: '1px dashed #000080',
            backgroundColor: 'rgba(0, 0, 128, 0.15)',
            zIndex: 1000,
          }}
        />
      )}

      {/* Desktop Icons */}
      <div className="absolute inset-0">
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className={`desktop-icon ${selectedIcons.has(icon.id) ? 'selected' : ''}`}
            style={{
              position: 'absolute',
              left: `${icon.position.x}px`,
              top: `${icon.position.y}px`
            }}
            onClick={(e) => handleIconClick(icon.id, e)}
            onDoubleClick={() => handleIconDoubleClick(icon.type)}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 mb-1 flex items-center justify-center">
              <img 
                src={icon.icon} 
                alt={t(icon.label)} 
                className="w-full h-full object-contain"
                draggable={false}
              />
            </div>
            <span className="text-xs text-center leading-tight">{t(icon.label)}</span>
          </div>
        ))}
      </div>
      
      {/* Recycle Bin - Top Right */}
      <div className="absolute top-5 right-5">
        <div
          className={`desktop-icon ${selectedIcons.has(recycleIcon.id) ? 'selected' : ''}`}
          onClick={(e) => handleIconClick(recycleIcon.id, e)}
          onDoubleClick={() => handleIconDoubleClick(recycleIcon.type)}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 mb-1 flex items-center justify-center">
            <img 
              src={recycleIcon.icon} 
              alt={t(recycleIcon.label)} 
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
          <span className="text-xs text-center leading-tight">{t(recycleIcon.label)}</span>
        </div>
      </div>
    </div>
  );
}
