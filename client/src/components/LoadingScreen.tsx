import { useState, useEffect, useRef } from 'react';
import swalyLogo from '@assets/IMG_6470.png';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [playStartupSound, setPlayStartupSound] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Windows 98 startup sound
  useEffect(() => {
    const audio = new Audio();
    audio.src = 'https://www.myinstants.com/media/sounds/windows-98-startup.mp3';
    audio.volume = 0.7;
    audioRef.current = audio;

    // Auto complete after 3 seconds
    const timer = setTimeout(() => {
      onLoadComplete();
    }, 3000);

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [onLoadComplete]);

  // Handle user click to enable audio
  const handleClick = () => {
    if (audioRef.current && !playStartupSound) {
      setPlayStartupSound(true);
      audioRef.current.play().catch(() => {
        console.log('Audio play failed');
      });
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black flex items-center justify-center z-50 animate-fade-in cursor-pointer"
      onClick={handleClick}
    >
      <div className="text-center">
        <div className="mb-8 animate-pulse-slow">
          <img 
            src={swalyLogo} 
            alt="SWAGY" 
            className="boot-logo mx-auto"
          />
        </div>
        <div className="text-white text-2xl font-bold mb-4">
          Welcome to SWAGY's Windows 98
        </div>
        <div className="text-gray-400 text-sm mb-4">
          Loading desktop...
        </div>
        {!playStartupSound && (
          <div className="text-yellow-400 text-xs animate-pulse">
            🔊 Click to enable startup sound
          </div>
        )}
        {playStartupSound && (
          <div className="text-green-400 text-xs">
            ♪ Windows 98 startup sound playing...
          </div>
        )}
      </div>
    </div>
  );
}