import { useState, useEffect, useRef } from 'react';
import swalyLogo from '@assets/IMG_6470.png';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [isStarted, setIsStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Windows 98 startup sound
  useEffect(() => {
    const audio = new Audio();
    audio.src = '/attached_assets/Windows-98-startup-sound.wav';
    audio.volume = 0.8;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle Start button click
  const handleStartClick = () => {
    if (!isStarted) {
      setIsStarted(true);
      
      // Play Windows 98 startup sound
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          console.log('Audio play failed');
        });
      }

      // Start the website after a short delay for the sound to begin
      setTimeout(() => {
        onLoadComplete();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 animate-fade-in">
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