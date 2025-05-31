import { useState, useEffect } from 'react';
import { Desktop } from './components/Desktop';
import { Window } from './components/Window';
import { Taskbar } from './components/Taskbar';
import { StartMenu } from './components/StartMenu';
import { LoadingScreen } from './components/LoadingScreen';
import { useWindows } from './hooks/useWindows';
import { useLanguage } from './hooks/useLanguage';
import { WindowType } from './types';
import swalyLogo from '@assets/IMG_6470.png';

function App() {
  const {
    windows,
    activeWindow,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    bringToFront,
    getVisibleWindows,
    getTaskbarWindows
  } = useWindows();
  
  const { t } = useLanguage();
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [startupAudio, setStartupAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleIconDoubleClick = (type: WindowType) => {
    openWindow(type);
  };

  const handleStartClick = () => {
    setShowStartMenu(!showStartMenu);
  };

  const handleStartMenuClose = () => {
    setShowStartMenu(false);
  };

  const handleMenuAction = (action: string) => {
    switch (action) {
      case 'my-computer':
        openWindow('projects');
        break;
      case 'run':
        showRunDialog();
        break;
      case 'settings':
        showSettingsDialog();
        break;
      case 'shutdown':
        showShutdownDialog();
        break;
    }
  };

  const handleTaskbarWindowClick = (windowId: string) => {
    const window = windows.find(w => w.id === windowId);
    if (window) {
      if (window.isMinimized || activeWindow !== windowId) {
        bringToFront(windowId);
      } else {
        minimizeWindow(windowId);
      }
    }
  };

  const showRunDialog = () => {
    const command = prompt('Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.\n\nOpen:', 'whoami');
    if (command) {
      if (command.toLowerCase() === 'whoami') {
        openWindow('me');
      } else {
        alert(`Cannot find '${command}'. Make sure you typed the name correctly, and then try again.`);
      }
    }
  };

  const showSettingsDialog = () => {
    const settings = [
      '🖥️ Display Properties',
      '🔊 Sound Settings',
      '🌐 Language Options',
      '⌨️ Keyboard Settings',
      '🖱️ Mouse Settings'
    ].join('\n');
    
    alert(`Settings\n\n${settings}\n\nNote: This is a demo - settings are not functional.`);
  };

  const showShutdownDialog = () => {
    const result = confirm('Are you sure you want to shut down the computer?\n\nAny unsaved work will be lost.');
    if (result) {
      document.body.innerHTML = `
        <div class="h-screen bg-black flex items-center justify-center text-white">
          <div class="text-center">
            <div class="mb-4">
              <img src="${swalyLogo}" alt="SWAGY" class="w-32 h-auto mx-auto" />
            </div>
            <div class="text-2xl font-bold mb-4">Windows is shutting down...</div>
            <div class="text-sm">Thank you for visiting SWAGY's portfolio!</div>
            <div class="mt-8">
              <button onclick="location.reload()" class="win-button px-4 py-2 text-black">Restart System</button>
            </div>
          </div>
        </div>
      `;
    }
  };



  const handleLoadComplete = () => {
    setShowLoadingScreen(false);
  };

  const handleStartupSoundPlay = (audio: HTMLAudioElement) => {
    setStartupAudio(audio);
    // Stop the audio after 6 seconds to match Windows 98 startup sound length
    setTimeout(() => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      setStartupAudio(null);
    }, 6000);
  };

  if (showLoadingScreen) {
    return <LoadingScreen onLoadComplete={handleLoadComplete} onSoundPlay={handleStartupSoundPlay} />;
  }

  return (
    <div className="h-screen overflow-hidden">
      {/* Desktop */}
      <Desktop onIconDoubleClick={handleIconDoubleClick} />
      
      {/* Windows */}
      {getVisibleWindows().map((window) => (
        <Window
          key={window.id}
          window={window}
          isActive={activeWindow === window.id}
          isMobile={isMobile}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onFocus={() => bringToFront(window.id)}
        />
      ))}
      
      {/* Start Menu */}
      <StartMenu
        isVisible={showStartMenu}
        onClose={handleStartMenuClose}
        onMenuAction={handleMenuAction}
      />
      
      {/* Taskbar */}
      <Taskbar
        windows={getTaskbarWindows()}
        onWindowClick={handleTaskbarWindowClick}
        onStartClick={handleStartClick}
        showStartMenu={showStartMenu}
      />
    </div>
  );
}

export default App;
