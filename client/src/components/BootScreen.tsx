import { useState, useEffect } from 'react';
import swalyLogo from '@assets/IMG_6470.png';

interface BootScreenProps {
  onBootComplete: () => void;
}

export function BootScreen({ onBootComplete }: BootScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [bootComplete, setBootComplete] = useState(false);

  const bootMessages = [
    'Starting MS-DOS...',
    'Loading device drivers...',
    'Initializing Windows 98...',
    'Loading desktop...',
    'System ready.'
  ];

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Boot sequence typing effect
  useEffect(() => {
    if (currentStep >= bootMessages.length) {
      setBootComplete(true);
      setTimeout(() => {
        onBootComplete();
      }, 2000);
      return;
    }

    const message = bootMessages[currentStep];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex <= message.length) {
        setCurrentText(message.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
          setCurrentText('');
        }, 800);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [currentStep, onBootComplete]);

  // Play boot sound (requires user interaction first)
  const playBootSound = () => {
    // We'll add this after creating the audio file
    console.log('Boot sound would play here');
  };

  if (bootComplete) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50 animate-fade-in">
        <div className="text-center">
          <div className="mb-8 animate-pulse">
            <img 
              src={swalyLogo} 
              alt="SWAGY" 
              className="w-32 h-32 mx-auto"
            />
          </div>
          <div className="text-white text-2xl font-bold mb-4">
            Welcome to SWAGY's Windows 98
          </div>
          <div className="text-gray-400 text-sm">
            Loading desktop...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col justify-center z-50 text-white font-mono">
      <div className="px-8">
        {bootMessages.slice(0, currentStep).map((message, index) => (
          <div key={index} className="mb-2 text-green-400">
            {message}
          </div>
        ))}
        
        <div className="mb-2 text-green-400">
          {currentText}
          {currentStep < bootMessages.length && (
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
              █
            </span>
          )}
        </div>
      </div>
      
      <div className="absolute bottom-8 left-8 text-gray-600 text-xs">
        Microsoft Windows 98 [Version 4.10.1998]
        <br />
        Copyright Microsoft Corp 1981-1998
      </div>
    </div>
  );
}