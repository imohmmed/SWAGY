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
      
      // Try to play Windows 98 startup sound
      if (audioRef.current) {
        try {
          audioRef.current.load(); // Reload the audio
          await audioRef.current.play();
          console.log('Audio playing successfully');
        } catch (error) {
          console.log('Audio play failed:', error);
          // Try alternative audio source
          audioRef.current.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBJ2UZ9qJNwcXab3t4JJOEgVRpOLrr2EVDz1+wrn0yoM2BSCG0fDReSYGKW3f7fmDLQQKdMPF04xECBNbsdH2qVwUGDOF6/vDdS4LIW6Z79uQOgkNW7PT5oM2AhqG0OqZRwcOO';
          try {
            await audioRef.current.play();
          } catch (fallbackError) {
            console.log('Fallback audio also failed');
          }
        }
      }

      // Start the website after a short delay
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