import { WindowState } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { useState, useEffect } from 'react';

interface TaskbarProps {
  windows: WindowState[];
  onWindowClick: (windowId: string) => void;
  onStartClick: () => void;
  showStartMenu: boolean;
}

export function Taskbar({ windows, onWindowClick, onStartClick, showStartMenu }: TaskbarProps) {
  const { t, language, toggleLanguage } = useLanguage();
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
    <div className="fixed bottom-0 left-0 right-0 h-7 bg-[rgb(var(--win-gray))] border-t-2 border-[rgb(var(--win-border-light))] flex items-center px-1 z-50">
      {/* Start Button */}
      <button
        className={`win-button px-2 py-1 text-xs font-bold flex items-center gap-1 ${showStartMenu ? 'active' : ''}`}
        onClick={onStartClick}
      >
        <span className="text-red-600 font-bold">⊞</span>
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
      <div className="flex items-center gap-2 px-2 text-xs border-l border-[rgb(var(--win-border-dark))]">
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
