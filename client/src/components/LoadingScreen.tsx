import { useState, useEffect, useRef } from 'react';
import swalyLogo from '@assets/IMG_6470.png';

interface LoadingScreenProps {
  onLoadComplete: () => void;
  onSoundStart: () => void;
}

export function LoadingScreen({ onLoadComplete, onSoundStart }: LoadingScreenProps) {
  const [isStarted, setIsStarted] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Handle Start button click
  const handleStartClick = () => {
    if (!isStarted) {
      setIsStarted(true);

      // Start the continuous audio from App level
      onSoundStart();

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
    <div className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-1000 ${
      isFadingOut ? 'opacity-0' : 'opacity-100'
    }`}>
      <div className="text-center">
        <div className="mb-8 animate-pulse-slow">
          <img 
            src={swalyLogo} 
            alt="SWAGY" 
            className="boot-logo mx-auto"
          />
        </div>
        <div className="text-white text-2xl font-bold mb-8">
          Welcome to SWAGY's Windows 98
        </div>
        
        {!isStarted ? (
          <button
            onClick={handleStartClick}
            className="win-button px-8 py-3 text-black text-lg font-bold hover:bg-gray-300 transition-colors"
          >
            Start
          </button>
        ) : (
          <div className="text-green-400 text-sm">
            ♪ Starting Windows 98...
          </div>
        )}
      </div>
    </div>
  );
}