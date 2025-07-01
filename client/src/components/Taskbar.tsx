import { WindowState } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { useTextSize } from '../hooks/useTextSize';
import { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

interface TaskbarProps {
  windows: WindowState[];
  onWindowClick: (windowId: string) => void;
  onStartClick: () => void;
  showStartMenu: boolean;
}

export function Taskbar({ windows, onWindowClick, onStartClick, showStartMenu }: TaskbarProps) {
  const { t, language, toggleLanguage } = useLanguage();
  const { increaseTextSize, decreaseTextSize, canIncrease, canDecrease } = useTextSize();
  const isMobile = useIsMobile();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 h-7 bg-[rgb(var(--win-gray))] border-t-2 border-[rgb(var(--win-border-light))] flex items-center px-1 z-[9999] taskbar-safari-fix"
      style={{
        position: 'fixed',
        bottom: '0px',
        left: '0px',
        right: '0px',
        zIndex: 9999,
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
    >
      {/* Start Button */}
      <button
        className={`win-button px-2 py-1 text-xs font-bold flex items-center gap-1 ${showStartMenu ? 'active' : ''}`}
        onClick={onStartClick}
      >
        <img 
          src="https://win98icons.alexmeub.com/icons/png/windows-0.png" 
          alt="Windows" 
          className="w-4 h-4"
          draggable={false}
        />
        <span>{t('start')}</span>
      </button>
      
      {/* Taskbar Buttons */}
      <div className="flex-1 flex ml-2 overflow-hidden">
        {windows.map((window) => (
          <button
            key={window.id}
            className={`taskbar-button ${!window.isMinimized ? 'active' : ''}`}
            onClick={() => onWindowClick(window.id)}
            title={t(window.title)}
          >
            <span className="truncate">{t(window.title)}</span>
          </button>
        ))}
      </div>
      
      {/* System Tray */}
      <div className="flex items-center gap-1 px-2 text-xs border-l border-[rgb(var(--win-border-dark))]">
        {/* Text Size Controls - Only on Mobile */}
        {isMobile && (
          <>
            <button
              className={`cursor-pointer w-6 h-6 text-xs font-bold win-button flex items-center justify-center ${!canDecrease ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={decreaseTextSize}
              disabled={!canDecrease}
              title="Decrease text size"
            >
              A-
            </button>
            <button
              className={`cursor-pointer w-6 h-6 text-xs font-bold win-button flex items-center justify-center ${!canIncrease ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={increaseTextSize}
              disabled={!canIncrease}
              title="Increase text size"
            >
              A+
            </button>
          </>
        )}
        
        <button
          className="cursor-pointer px-1 hover:bg-[rgb(var(--win-light-gray))] border border-transparent hover:border-[rgb(var(--win-border-dark))]"
          onClick={toggleLanguage}
          title="Toggle Language"
        >
          {language.toUpperCase()}
        </button>
        <div className="font-mono text-xs select-none">{currentTime}</div>
      </div>
    </div>
  );
}
