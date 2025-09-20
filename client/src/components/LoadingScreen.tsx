import { useState, useEffect, useRef } from 'react';
import mohmmedLogo from '@assets/fontbolt_1758341229533.png';

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
        'Booting up MoHmmeD OS...',
        'Syncing style modules...',
        'Loading vintage interface...',
        'System dripped ✓'
      ];

      // Display boot messages progressively - start immediately
      messages.forEach((message, index) => {
        setTimeout(() => {
          setBootMessages(prev => [...prev, message]);
        }, index * 1500); // 1.5 seconds between each message
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
              src={mohmmedLogo} 
              alt="MoHmmeD" 
              className="boot-logo mx-auto"
            />
          </div>
          {!isStarted && (
            <>
              <div className="text-white text-xl font-bold mb-8">
                Welcome to the drip OS — MoHmmeD Edition
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