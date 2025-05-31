import { useState, useEffect, useRef } from 'react';
import swalyLogo from '@assets/IMG_6470.png';

interface LoadingScreenProps {
  onLoadComplete: () => void;
  onSoundStart: () => void;
}

export function LoadingScreen({ onLoadComplete, onSoundStart }: LoadingScreenProps) {
  const [isStarted, setIsStarted] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [bootMessages, setBootMessages] = useState<string[]>([]);
  const [showBootMessages, setShowBootMessages] = useState(false);

  // Handle Start button click
  const handleStartClick = () => {
    if (!isStarted) {
      setIsStarted(true);
      setShowBootMessages(true);

      // Start the continuous audio from App level
      onSoundStart();

      // Boot sequence messages
      const messages = [
        'Starting MS-DOS...',
        'Loading device drivers...',
        'Initializing Windows 98...',
        'Loading desktop...',
        'System ready.'
      ];

      // Display boot messages progressively
      messages.forEach((message, index) => {
        setTimeout(() => {
          setBootMessages(prev => [...prev, message]);
        }, index * 1200); // 1.2 seconds between each message
      });

      // Start fade out after 6.25 seconds (75% of 9 seconds = 6.75 seconds in splash)
      setTimeout(() => {
        setIsFadingOut(true);
      }, 6250);
      
      // Complete transition after 6.75 seconds (remaining 25% = 2.25 seconds will play in desktop)
      setTimeout(() => {
        onLoadComplete();
      }, 6750);
    }
  };

  return (
    <div className={`fixed inset-0 bg-black z-50 transition-opacity duration-1000 ${
      isFadingOut ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Boot messages on the left side */}
      {showBootMessages && (
        <div className="absolute top-8 left-8 text-green-400 text-xs font-mono leading-tight">
          {bootMessages.map((message, index) => (
            <div key={index} className="mb-0.5">
              {message}
            </div>
          ))}
        </div>
      )}

      {/* Main content area - center */}
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="mb-8 animate-pulse-slow">
            <img 
              src={swalyLogo} 
              alt="SWAGY" 
              className="boot-logo mx-auto"
            />
          </div>
          {!isStarted && (
            <>
              <div className="text-white text-2xl font-bold mb-8">
                Welcome to SWAGY's Windows 98
              </div>
              <button
                onClick={handleStartClick}
                className="win-button px-8 py-3 text-black text-lg font-bold hover:bg-gray-300 transition-colors"
              >
                Start
              </button>
            </>
          )}
        </div>
      </div>

      {/* Bottom copyright section - left aligned */}
      <div className="absolute bottom-8 left-8">
        <div className="text-gray-400 text-xs font-mono leading-tight">
          <div>Microsoft Windows 98 [Version 4.10.1998]</div>
          <div>Copyright Microsoft Corp 1981-1998</div>
        </div>
      </div>
    </div>
  );
}