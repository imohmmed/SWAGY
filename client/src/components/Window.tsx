import { WindowState, WindowType } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { useDrag } from '../hooks/useDrag';
import { useEffect, useRef, useState } from 'react';

// Import window content components
import { MeWindow } from './windows/MeWindow';
import { ProjectsWindow } from './windows/ProjectsWindow';
import { MusicWindow } from './windows/MusicWindow';
import { BlogWindow } from './windows/BlogWindow';
import { DownloadsWindow } from './windows/DownloadsWindow';
import { ContactWindow } from './windows/ContactWindow';
import { TerminalWindow } from './windows/TerminalWindow';
import { RecycleWindow } from './windows/RecycleWindow';
import { MyComputerWindow } from './windows/MyComputerWindow';

interface WindowProps {
  window: WindowState;
  isActive: boolean;
  isMobile: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onOpenWindow?: (windowType: WindowType) => void;
}

const windowComponents: Record<WindowType, React.ComponentType> = {
  me: MeWindow,
  projects: ProjectsWindow,
  music: MusicWindow,
  blog: BlogWindow,
  downloads: DownloadsWindow,
  contact: ContactWindow,
  terminal: TerminalWindow,
  recycle: RecycleWindow,
  mycomputer: MyComputerWindow,
};

export function Window({ 
  window, 
  isActive, 
  isMobile, 
  onClose, 
  onMinimize, 
  onMaximize, 
  onFocus,
  onOpenWindow 
}: WindowProps) {
  const { t } = useLanguage();
  const { dragState, startDrag, updateDrag, endDrag } = useDrag();
  const [isTextLarge, setIsTextLarge] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  const WindowContent = windowComponents[window.type];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (windowRef.current && dragState.isDragging && dragState.draggedWindow === window.id) {
        updateDrag(e.clientX, e.clientY, windowRef.current);
      }
    };

    const handleMouseUp = () => {
      if (dragState.isDragging && dragState.draggedWindow === window.id) {
        endDrag();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (windowRef.current && dragState.isDragging && dragState.draggedWindow === window.id) {
        e.preventDefault();
        const touch = e.touches[0];
        updateDrag(touch.clientX, touch.clientY, windowRef.current);
      }
    };

    const handleTouchEnd = () => {
      if (dragState.isDragging && dragState.draggedWindow === window.id) {
        endDrag();
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dragState, updateDrag, endDrag, window.id]);

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    e.preventDefault();
    if (windowRef.current) {
      startDrag(window.id, e.clientX, e.clientY, windowRef.current);
      onFocus();
    }
  };

  const handleTitleBarTouchStart = (e: React.TouchEvent) => {
    if (isMobile) return;
    e.preventDefault();
    const touch = e.touches[0];
    if (windowRef.current) {
      startDrag(window.id, touch.clientX, touch.clientY, windowRef.current);
      onFocus();
    }
  };

  const handleMaximizeClick = () => {
    if (isMobile) {
      // On mobile, maximize means toggle text size
      setIsTextLarge(!isTextLarge);
    } else {
      onMaximize();
    }
  };

  const windowStyle = isMobile
    ? {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        width: '100%',
        height: 'calc(100vh - 28px)',
        zIndex: window.zIndex,
      }
    : {
        position: 'fixed' as const,
        left: window.isMaximized ? 0 : window.position.x,
        top: window.isMaximized ? 0 : window.position.y,
        width: window.isMaximized ? '100vw' : window.size.width,
        height: window.isMaximized ? 'calc(100vh - 28px)' : window.size.height,
        zIndex: window.zIndex,
      };

  return (
    <div
      ref={windowRef}
      className={`win-window ${isMobile ? 'mobile-fullscreen' : ''}`}
      style={windowStyle}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`win-titlebar ${!isActive ? 'inactive' : ''}`}
        onMouseDown={handleTitleBarMouseDown}
        onTouchStart={handleTitleBarTouchStart}
      >
        <span className="text-xs font-bold select-none">{t(window.title)}</span>
        <div className="flex">
          <button
            className="win-button px-1 py-0 text-xs ml-1"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            title={t('minimize')}
          >
            _
          </button>
          <button
            className="win-button px-1 py-0 text-xs ml-1"
            onClick={(e) => {
              e.stopPropagation();
              handleMaximizeClick();
            }}
            title={isMobile ? 'تكبير النص' : t('maximize')}
          >
            {isMobile ? (isTextLarge ? 'A-' : 'A+') : '□'}
          </button>
          <button
            className="win-button px-1 py-0 text-xs ml-1"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            title={t('close')}
          >
            ✕
          </button>
        </div>
      </div>
      
      {/* Window Content */}
      <div 
        className={`h-full ${isTextLarge ? 'text-lg' : ''}`} 
        style={{ height: 'calc(100% - 24px)' }}
      >
        <WindowContent />
      </div>
    </div>
  );
}
