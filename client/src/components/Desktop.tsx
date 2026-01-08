import { DesktopIcon, WindowType } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { useState, useRef, useCallback, useEffect } from 'react';

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

interface ContextMenu {
  x: number;
  y: number;
  type: 'desktop' | 'icon';
  iconId?: string;
  iconType?: WindowType;
}

export function Desktop({ onIconDoubleClick }: DesktopProps) {
  const { t } = useLanguage();
  const [selectedIcons, setSelectedIcons] = useState<Set<string>>(new Set());
  const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu(null);
    };
    
    if (contextMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [contextMenu]);

  const handleIconClick = (iconId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setContextMenu(null);
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
    setContextMenu(null);
    onIconDoubleClick(type);
  };

  const handleContextMenu = useCallback((e: React.MouseEvent, iconId?: string, iconType?: WindowType) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = desktopRef.current?.getBoundingClientRect();
    if (!rect) return;

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    if (x + 160 > rect.width) x = rect.width - 160;
    if (y + 200 > rect.height) y = rect.height - 200;

    if (iconId) {
      setSelectedIcons(new Set([iconId]));
      setContextMenu({ x, y, type: 'icon', iconId, iconType });
    } else {
      setContextMenu({ x, y, type: 'desktop' });
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 2) return;
    if ((e.target as HTMLElement).closest('.desktop-icon')) return;
    if ((e.target as HTMLElement).closest('.context-menu')) return;
    
    setContextMenu(null);
    
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

  const handleMenuAction = (action: string) => {
    setContextMenu(null);
    
    switch (action) {
      case 'open':
        if (contextMenu?.iconType) {
          onIconDoubleClick(contextMenu.iconType);
        }
        break;
      case 'refresh':
        window.location.reload();
        break;
      case 'arrange':
        break;
      case 'properties':
        break;
    }
  };

  const ContextMenuItem = ({ icon, label, onClick, disabled = false }: { 
    icon?: string; 
    label: string; 
    onClick: () => void;
    disabled?: boolean;
  }) => (
    <div
      className={`flex items-center gap-2 px-3 py-1 cursor-pointer ${disabled ? 'text-gray-500' : 'hover:bg-[#000080] hover:text-white'}`}
      onClick={disabled ? undefined : onClick}
      data-testid={`menu-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {icon && <img src={icon} alt="" className="w-4 h-4" />}
      {!icon && <span className="w-4" />}
      <span className="text-sm">{label}</span>
    </div>
  );

  const MenuDivider = () => (
    <div className="border-t border-gray-400 my-1" />
  );

  return (
    <div 
      ref={desktopRef}
      className="h-full w-full relative overflow-hidden select-none" 
      style={{ background: '#008080' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onContextMenu={(e) => handleContextMenu(e)}
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

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="context-menu absolute bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-gray-700 border-r-gray-700 py-1 min-w-[160px] shadow-md"
          style={{
            left: `${contextMenu.x}px`,
            top: `${contextMenu.y}px`,
            zIndex: 9999,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {contextMenu.type === 'icon' ? (
            <>
              <ContextMenuItem
                icon="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png"
                label={t('open')}
                onClick={() => handleMenuAction('open')}
              />
              <MenuDivider />
              <ContextMenuItem
                label={t('cut')}
                onClick={() => {}}
                disabled
              />
              <ContextMenuItem
                label={t('copy')}
                onClick={() => {}}
                disabled
              />
              <MenuDivider />
              <ContextMenuItem
                label={t('deleteItem')}
                onClick={() => {}}
                disabled
              />
              <ContextMenuItem
                label={t('rename')}
                onClick={() => {}}
                disabled
              />
              <MenuDivider />
              <ContextMenuItem
                icon="https://win98icons.alexmeub.com/icons/png/settings_gear-0.png"
                label={t('properties')}
                onClick={() => handleMenuAction('properties')}
                disabled
              />
            </>
          ) : (
            <>
              <ContextMenuItem
                icon="https://win98icons.alexmeub.com/icons/png/refresh-0.png"
                label={t('refresh')}
                onClick={() => handleMenuAction('refresh')}
              />
              <MenuDivider />
              <div className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-4" />
                    <span className="text-sm">{t('arrangeIcons')}</span>
                  </div>
                  <span className="text-xs">▶</span>
                </div>
              </div>
              <MenuDivider />
              <ContextMenuItem
                label={t('paste')}
                onClick={() => {}}
                disabled
              />
              <ContextMenuItem
                label={t('pasteShortcut')}
                onClick={() => {}}
                disabled
              />
              <MenuDivider />
              <div className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-4" />
                    <span className="text-sm">{t('newItem')}</span>
                  </div>
                  <span className="text-xs">▶</span>
                </div>
              </div>
              <MenuDivider />
              <ContextMenuItem
                icon="https://win98icons.alexmeub.com/icons/png/settings_gear-0.png"
                label={t('properties')}
                onClick={() => handleMenuAction('properties')}
                disabled
              />
            </>
          )}
        </div>
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
            onContextMenu={(e) => handleContextMenu(e, icon.id, icon.type)}
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
          onContextMenu={(e) => handleContextMenu(e, recycleIcon.id, recycleIcon.type)}
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
