import { DesktopIcon, WindowType } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { useState, useRef, useCallback, useEffect } from 'react';

interface DesktopProps {
  onIconDoubleClick: (type: WindowType) => void;
}

const initialDesktopIcons: DesktopIcon[] = [
  { id: 'mycomputer', type: 'mycomputer', icon: 'https://win98icons.alexmeub.com/icons/png/computer_explorer_cool-0.png', label: 'myComputerIcon', position: { x: 20, y: 20 } },
  { id: 'games', type: 'games', icon: 'https://win98icons.alexmeub.com/icons/png/game_spider-0.png', label: 'gamesIcon', position: { x: 110, y: 20 } },
  { id: 'me', type: 'me', icon: 'https://win98icons.alexmeub.com/icons/png/msagent-4.png', label: 'meIcon', position: { x: 20, y: 110 } },
  { id: 'terminal', type: 'terminal', icon: 'https://win98icons.alexmeub.com/icons/png/console_prompt-0.png', label: 'terminalIcon', position: { x: 110, y: 110 } },
  { id: 'projects', type: 'projects', icon: 'https://win98icons.alexmeub.com/icons/png/world_network_directories-4.png', label: 'projectsIcon', position: { x: 20, y: 200 } },
  { id: 'music', type: 'music', icon: 'https://win98icons.alexmeub.com/icons/png/cd_audio_cd_a-4.png', label: 'musicIcon', position: { x: 20, y: 290 } },
  { id: 'blog', type: 'blog', icon: 'https://win98icons.alexmeub.com/icons/png/help_question_mark-0.png', label: 'blogIcon', position: { x: 20, y: 380 } },
  { id: 'downloads', type: 'downloads', icon: 'https://win98icons.alexmeub.com/icons/png/world_network_directories-4.png', label: 'downloadsIcon', position: { x: 20, y: 470 } },
  { id: 'contact', type: 'contact', icon: 'https://win98icons.alexmeub.com/icons/png/modem-3.png', label: 'contactIcon', position: { x: 20, y: 560 } },
  { id: 'recycle', type: 'recycle', icon: 'https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png', label: 'recycleIcon', position: { x: 9999, y: 20 } },
];

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

interface CustomIcon {
  id: string;
  name: string;
  type: 'folder' | 'textfile';
  icon: string;
  position: { x: number; y: number };
}

interface DragState {
  iconId: string;
  startX: number;
  startY: number;
  offsetX: number;
  offsetY: number;
  isSystem: boolean;
}

const STORAGE_KEY = 'desktop_custom_icons';
const SYSTEM_POSITIONS_KEY = 'desktop_system_positions';

export function Desktop({ onIconDoubleClick }: DesktopProps) {
  const { t } = useLanguage();
  const [selectedIcons, setSelectedIcons] = useState<Set<string>>(new Set());
  const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
  const [subMenu, setSubMenu] = useState<'arrange' | 'new' | null>(null);
  const [customIcons, setCustomIcons] = useState<CustomIcon[]>([]);
  const [systemPositions, setSystemPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedCustom = localStorage.getItem(STORAGE_KEY);
    if (savedCustom) {
      try {
        setCustomIcons(JSON.parse(savedCustom));
      } catch (e) {}
    }
    
    const savedSystem = localStorage.getItem(SYSTEM_POSITIONS_KEY);
    if (savedSystem) {
      try {
        setSystemPositions(JSON.parse(savedSystem));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (customIcons.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customIcons));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [customIcons]);

  useEffect(() => {
    if (Object.keys(systemPositions).length > 0) {
      localStorage.setItem(SYSTEM_POSITIONS_KEY, JSON.stringify(systemPositions));
    }
  }, [systemPositions]);

  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu(null);
      setSubMenu(null);
    };
    
    if (contextMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [contextMenu]);

  const getSystemIconPosition = (icon: DesktopIcon) => {
    if (systemPositions[icon.id]) {
      return systemPositions[icon.id];
    }
    if (icon.id === 'recycle') {
      const rect = desktopRef.current?.getBoundingClientRect();
      return { x: (rect?.width || 800) - 80, y: 20 };
    }
    return icon.position;
  };

  const handleIconMouseDown = (iconId: string, e: React.MouseEvent, isSystem: boolean = false) => {
    if (e.button !== 0) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    let iconX: number, iconY: number;
    
    if (isSystem) {
      const sysIcon = initialDesktopIcons.find(i => i.id === iconId);
      if (!sysIcon) return;
      const pos = getSystemIconPosition(sysIcon);
      iconX = pos.x;
      iconY = pos.y;
    } else {
      const customIcon = customIcons.find(i => i.id === iconId);
      if (!customIcon) return;
      iconX = customIcon.position.x;
      iconY = customIcon.position.y;
    }

    const rect = desktopRef.current?.getBoundingClientRect();
    if (!rect) return;

    setDragState({
      iconId,
      startX: iconX,
      startY: iconY,
      offsetX: e.clientX - rect.left - iconX,
      offsetY: e.clientY - rect.top - iconY,
      isSystem
    });
    setDragPosition({ x: iconX, y: iconY });
    setSelectedIcons(new Set([iconId]));
    setContextMenu(null);
  };

  const handleIconClick = (iconId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setContextMenu(null);
    setSubMenu(null);
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

    if (x + 180 > rect.width) x = rect.width - 180;
    if (y + 280 > rect.height) y = rect.height - 280;

    setSubMenu(null);

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
    setSubMenu(null);
    
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
    const rect = desktopRef.current?.getBoundingClientRect();
    if (!rect) return;

    if (dragState) {
      const newX = Math.max(0, Math.min(rect.width - 70, e.clientX - rect.left - dragState.offsetX));
      const newY = Math.max(0, Math.min(rect.height - 80, e.clientY - rect.top - dragState.offsetY));
      setDragPosition({ x: newX, y: newY });
      return;
    }

    if (!isSelecting || !selectionBox) return;

    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    setSelectionBox(prev => prev ? { ...prev, currentX, currentY } : null);

    const boxLeft = Math.min(selectionBox.startX, currentX);
    const boxRight = Math.max(selectionBox.startX, currentX);
    const boxTop = Math.min(selectionBox.startY, currentY);
    const boxBottom = Math.max(selectionBox.startY, currentY);

    const newSelected = new Set<string>();

    initialDesktopIcons.forEach(icon => {
      const pos = getSystemIconPosition(icon);
      const iconWidth = 70;
      const iconHeight = 80;

      if (
        pos.x < boxRight &&
        pos.x + iconWidth > boxLeft &&
        pos.y < boxBottom &&
        pos.y + iconHeight > boxTop
      ) {
        newSelected.add(icon.id);
      }
    });

    customIcons.forEach(icon => {
      if (
        icon.position.x < boxRight &&
        icon.position.x + 70 > boxLeft &&
        icon.position.y < boxBottom &&
        icon.position.y + 80 > boxTop
      ) {
        newSelected.add(icon.id);
      }
    });

    setSelectedIcons(newSelected);
  }, [isSelecting, selectionBox, customIcons, dragState, systemPositions]);

  const handleMouseUp = useCallback(() => {
    if (dragState && dragPosition) {
      if (dragState.isSystem) {
        setSystemPositions(prev => ({
          ...prev,
          [dragState.iconId]: { x: dragPosition.x, y: dragPosition.y }
        }));
      } else {
        setCustomIcons(prev => prev.map(icon => 
          icon.id === dragState.iconId 
            ? { ...icon, position: { x: dragPosition.x, y: dragPosition.y } }
            : icon
        ));
      }
    }
    
    setDragState(null);
    setDragPosition(null);
    setIsSelecting(false);
    setSelectionBox(null);
  }, [dragState, dragPosition]);

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

  const findEmptyPosition = (): { x: number; y: number } => {
    const occupied = new Set<string>();
    
    initialDesktopIcons.forEach(icon => {
      const pos = getSystemIconPosition(icon);
      occupied.add(`${Math.round(pos.x / 90) * 90},${Math.round(pos.y / 90) * 90}`);
    });
    
    customIcons.forEach(icon => {
      occupied.add(`${Math.round(icon.position.x / 90) * 90},${Math.round(icon.position.y / 90) * 90}`);
    });

    for (let y = 20; y < 700; y += 90) {
      for (let x = 200; x < 600; x += 90) {
        if (!occupied.has(`${x},${y}`)) {
          return { x, y };
        }
      }
    }
    
    return { x: 200, y: 20 + customIcons.length * 90 };
  };

  const createNewItem = (type: 'folder' | 'textfile') => {
    const position = findEmptyPosition();
    const id = `custom_${Date.now()}`;
    
    let icon = '';
    let name = '';
    
    switch (type) {
      case 'folder':
        icon = 'https://win98icons.alexmeub.com/icons/png/directory_closed-4.png';
        name = t('newFolder');
        break;
      case 'textfile':
        icon = 'https://win98icons.alexmeub.com/icons/png/notepad-2.png';
        name = t('newTextDocument');
        break;
    }
    
    const newIcon: CustomIcon = {
      id,
      name,
      type,
      icon,
      position
    };
    
    setCustomIcons(prev => [...prev, newIcon]);
    setContextMenu(null);
    setSubMenu(null);
  };

  const arrangeIcons = (method: 'name' | 'type' | 'auto') => {
    setContextMenu(null);
    setSubMenu(null);
    
    const allIcons: { id: string; name: string; type: string; isSystem: boolean }[] = [];
    
    initialDesktopIcons.forEach(icon => {
      allIcons.push({
        id: icon.id,
        name: t(icon.label),
        type: 'system',
        isSystem: true
      });
    });
    
    customIcons.forEach(icon => {
      allIcons.push({
        id: icon.id,
        name: icon.name,
        type: icon.type,
        isSystem: false
      });
    });

    switch (method) {
      case 'name':
        allIcons.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'type':
        allIcons.sort((a, b) => {
          if (a.isSystem && !b.isSystem) return -1;
          if (!a.isSystem && b.isSystem) return 1;
          return a.type.localeCompare(b.type);
        });
        break;
      case 'auto':
        break;
    }

    let xPos = 20;
    let yPos = 20;
    const xStep = 90;
    const yStep = 90;
    const maxY = 560;

    const newSystemPositions: Record<string, { x: number; y: number }> = {};
    const newCustomIcons = [...customIcons];

    allIcons.forEach((iconInfo) => {
      if (iconInfo.isSystem) {
        newSystemPositions[iconInfo.id] = { x: xPos, y: yPos };
      } else {
        const customIdx = newCustomIcons.findIndex(c => c.id === iconInfo.id);
        if (customIdx !== -1) {
          newCustomIcons[customIdx] = {
            ...newCustomIcons[customIdx],
            position: { x: xPos, y: yPos }
          };
        }
      }
      
      yPos += yStep;
      if (yPos > maxY) {
        yPos = 20;
        xPos += xStep;
      }
    });

    setSystemPositions(newSystemPositions);
    setCustomIcons(newCustomIcons);
    localStorage.setItem(SYSTEM_POSITIONS_KEY, JSON.stringify(newSystemPositions));
    if (newCustomIcons.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCustomIcons));
    }
    setRefreshKey(prev => prev + 1);
  };

  const handleRefresh = () => {
    setContextMenu(null);
    setSubMenu(null);
    setSelectedIcons(new Set());
    setRefreshKey(prev => prev + 1);
  };

  const deleteCustomIcon = (iconId: string) => {
    const updated = customIcons.filter(i => i.id !== iconId);
    setCustomIcons(updated);
    if (updated.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    setContextMenu(null);
  };

  const handleMenuAction = (action: string) => {
    setContextMenu(null);
    setSubMenu(null);
    
    switch (action) {
      case 'open':
        if (contextMenu?.iconType) {
          onIconDoubleClick(contextMenu.iconType);
        }
        break;
      case 'refresh':
        handleRefresh();
        break;
      case 'delete':
        if (contextMenu?.iconId?.startsWith('custom_')) {
          deleteCustomIcon(contextMenu.iconId);
        }
        break;
    }
  };

  const ContextMenuItem = ({ icon, label, onClick, disabled = false, hasSubmenu = false, onHover }: { 
    icon?: string; 
    label: string; 
    onClick: () => void;
    disabled?: boolean;
    hasSubmenu?: boolean;
    onHover?: () => void;
  }) => (
    <div
      className={`flex items-center justify-between px-3 py-1 cursor-pointer ${disabled ? 'text-gray-500' : 'hover:bg-[#000080] hover:text-white'}`}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={onHover}
      data-testid={`menu-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-center gap-2">
        {icon && <img src={icon} alt="" className="w-4 h-4" />}
        {!icon && <span className="w-4" />}
        <span className="text-sm">{label}</span>
      </div>
      {hasSubmenu && <span className="text-xs">▶</span>}
    </div>
  );

  const MenuDivider = () => (
    <div className="border-t border-gray-400 my-1" />
  );

  const SubMenuPanel = ({ children, offsetTop }: { children: React.ReactNode; offsetTop: number }) => (
    <div
      className="absolute bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-gray-700 border-r-gray-700 py-1 min-w-[140px] shadow-md"
      style={{
        left: '100%',
        top: `${offsetTop}px`,
        marginLeft: '-2px'
      }}
    >
      {children}
    </div>
  );

  const getDisplayPosition = (iconId: string, isSystem: boolean, originalPos: { x: number; y: number }) => {
    if (dragState?.iconId === iconId && dragPosition) {
      return dragPosition;
    }
    if (isSystem) {
      return systemPositions[iconId] || originalPos;
    }
    return originalPos;
  };

  return (
    <div 
      key={refreshKey}
      ref={desktopRef}
      className="h-full w-full relative overflow-hidden select-none" 
      style={{ background: '#008080', cursor: dragState ? 'grabbing' : 'default' }}
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
          className="context-menu absolute bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-gray-700 border-r-gray-700 py-1 min-w-[180px] shadow-md"
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
                onClick={() => handleMenuAction('delete')}
                disabled={!contextMenu.iconId?.startsWith('custom_')}
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
                onClick={() => {}}
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
              <div className="relative">
                <ContextMenuItem
                  label={t('arrangeIcons')}
                  onClick={() => {}}
                  hasSubmenu
                  onHover={() => setSubMenu('arrange')}
                />
                {subMenu === 'arrange' && (
                  <SubMenuPanel offsetTop={-4}>
                    <ContextMenuItem
                      label={t('byName')}
                      onClick={() => arrangeIcons('name')}
                    />
                    <ContextMenuItem
                      label={t('byType')}
                      onClick={() => arrangeIcons('type')}
                    />
                    <MenuDivider />
                    <ContextMenuItem
                      label={t('autoArrange')}
                      onClick={() => arrangeIcons('auto')}
                    />
                  </SubMenuPanel>
                )}
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
              <div className="relative">
                <ContextMenuItem
                  label={t('newItem')}
                  onClick={() => {}}
                  hasSubmenu
                  onHover={() => setSubMenu('new')}
                />
                {subMenu === 'new' && (
                  <SubMenuPanel offsetTop={-4}>
                    <ContextMenuItem
                      icon="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png"
                      label={t('folder')}
                      onClick={() => createNewItem('folder')}
                    />
                    <ContextMenuItem
                      icon="https://win98icons.alexmeub.com/icons/png/notepad-2.png"
                      label={t('textDocument')}
                      onClick={() => createNewItem('textfile')}
                    />
                  </SubMenuPanel>
                )}
              </div>
              <MenuDivider />
              <ContextMenuItem
                icon="https://win98icons.alexmeub.com/icons/png/settings_gear-0.png"
                label={t('properties')}
                onClick={() => {}}
                disabled
              />
            </>
          )}
        </div>
      )}

      {/* Desktop Icons */}
      <div className="absolute inset-0">
        {initialDesktopIcons.map((icon) => {
          const pos = getDisplayPosition(icon.id, true, icon.position);
          const isDragging = dragState?.iconId === icon.id;
          const isRecycle = icon.id === 'recycle';
          
          let displayPos = pos;
          if (isRecycle && !systemPositions[icon.id] && !isDragging) {
            const rect = desktopRef.current?.getBoundingClientRect();
            displayPos = { x: (rect?.width || 800) - 80, y: 20 };
          }
          
          return (
            <div
              key={icon.id}
              className={`desktop-icon ${selectedIcons.has(icon.id) ? 'selected' : ''} ${isDragging ? 'opacity-80' : ''}`}
              style={{
                position: 'absolute',
                left: `${displayPos.x}px`,
                top: `${displayPos.y}px`,
                cursor: isDragging ? 'grabbing' : 'grab',
                zIndex: isDragging ? 100 : 1,
              }}
              onMouseDown={(e) => handleIconMouseDown(icon.id, e, true)}
              onClick={(e) => !isDragging && handleIconClick(icon.id, e)}
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
          );
        })}

        {/* Custom Icons */}
        {customIcons.map((icon) => {
          const pos = getDisplayPosition(icon.id, false, icon.position);
          const isDragging = dragState?.iconId === icon.id;
          
          return (
            <div
              key={icon.id}
              className={`desktop-icon ${selectedIcons.has(icon.id) ? 'selected' : ''} ${isDragging ? 'opacity-80' : ''}`}
              style={{
                position: 'absolute',
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                cursor: isDragging ? 'grabbing' : 'grab',
                zIndex: isDragging ? 100 : 1,
              }}
              onMouseDown={(e) => handleIconMouseDown(icon.id, e, false)}
              onClick={(e) => !isDragging && handleIconClick(icon.id, e)}
              onContextMenu={(e) => handleContextMenu(e, icon.id)}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 mb-1 flex items-center justify-center">
                <img 
                  src={icon.icon} 
                  alt={icon.name} 
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              </div>
              <span className="text-xs text-center leading-tight">{icon.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
