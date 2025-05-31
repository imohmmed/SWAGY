import { useState, useEffect, useRef } from 'react';
import swalyLogo from '@assets/IMG_6470.png';

interface LoadingScreenProps {
  onLoadComplete: () => void;
  onSoundPlay: (audio: HTMLAudioElement) => void;
}

export function LoadingScreen({ onLoadComplete, onSoundPlay }: LoadingScreenProps) {
  const [isStarted, setIsStarted] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Windows 98 startup sound
  useEffect(() => {
    const audio = new Audio();
    audio.src = '/Windows-98-startup-sound.wav';
    audio.volume = 0.8;
    audio.preload = 'auto';
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle Start button click
  const handleStartClick = async () => {
    if (!isStarted) {
      setIsStarted(true);
      
      // Pass the audio to parent component to continue playing
      if (audioRef.current) {
        try {
          audioRef.current.load();
          await audioRef.current.play();
          console.log('Audio playing successfully');
          onSoundPlay(audioRef.current);
        } catch (error) {
          console.log('Audio play failed:', error);
        }
      }

      // Start fade out after 3.5 seconds, then complete after sound finishes
      setTimeout(() => {
        setIsFadingOut(true);
      }, 3500);
      
      setTimeout(() => {
        onLoadComplete();
      }, 4500);
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