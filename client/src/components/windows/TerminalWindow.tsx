import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

const commands = {
  help: 'helpCommand',
  about: 'aboutResponse',
  swag: 'swagResponse',
  clear: 'CLEAR_SCREEN',
  music: 'musicResponse',
  ascii: 'asciiResponse',
  exit: 'exitResponse',
  hack: 'hackResponse',
  matrix: 'matrixResponse',
  love: 'loveResponse',
  play: 'playResponse',
  'open music': 'openMusicResponse',
  whoami: 'whoamiResponse'
};

export function TerminalWindow() {
  const { t } = useLanguage();
  const [output, setOutput] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isAutoTyping, setIsAutoTyping] = useState(true);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial terminal welcome
    const initialOutput = [
      t('terminalWelcome'),
      t('terminalCopyright'),
      '',
      'C:\\SWAGY>',
      ''
    ];
    
    setOutput(initialOutput);
    
    // Auto-run help command once
    const timer = setTimeout(() => {
      autoTypeCommand('help', () => {
        setIsAutoTyping(false);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []); // Remove t dependency to prevent re-runs

  useEffect(() => {
    // Scroll to bottom when output changes
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const autoTypeCommand = (command: string, callback: () => void) => {
    let typedCommand = '';
    const typeInterval = setInterval(() => {
      if (typedCommand.length < command.length) {
        typedCommand += command[typedCommand.length];
        setCurrentInput(typedCommand);
      } else {
        clearInterval(typeInterval);
        executeCommand(command);
        setCurrentInput('');
        if (callback) callback();
      }
    }, 80); // Faster typing
  };

  const executeCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    
    setOutput(prev => [...prev, `C:\\SWAGY>${command}`]);
    
    if (cmd === 'clear') {
      setOutput(['C:\\SWAGY>', '']);
      return;
    }
    
    if (cmd === 'exit') {
      setOutput(prev => [...prev, t('exitResponse'), '']);
      setTimeout(() => {
        // In a real app, this would close the window
        alert('Terminal session ended.');
      }, 3000);
      return;
    }

    // Special matrix command effect
    if (cmd === 'matrix') {
      setOutput(prev => [...prev, '🟢 Entering the Matrix...', '']);
      setTimeout(() => {
        const matrixLines = [
          '01001000 01100101 01101100 01101100 01101111',
          '01010111 01101111 01110010 01101100 01100100',
          '01001101 01100001 01110100 01110010 01101001',
          '01111000 00100000 01001100 01101111 01100001',
          '01100100 01100101 01100100 00101110 00101110',
          '',
          'Wake up, SWAGY... The Matrix has you...',
          ''
        ];
        setOutput(prev => [...prev, ...matrixLines]);
      }, 1000);
      return;
    }
    
    const response = commands[cmd as keyof typeof commands];
    if (response) {
      const translatedResponse = t(response);
      const lines = translatedResponse.split('\n');
      setOutput(prev => [...prev, ...lines, '']);
    } else {
      setOutput(prev => [...prev, `'${command}' ${t('commandNotFound')}`, '']);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (isAutoTyping) return;
    
    if (e.key === 'Enter') {
      if (currentInput.trim()) {
        executeCommand(currentInput);
      } else {
        setOutput(prev => [...prev, 'C:\\SWAGY>', '']);
      }
      setCurrentInput('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAutoTyping) {
      setCurrentInput(e.target.value);
    }
  };

  return (
    <div className="h-full bg-black text-green-400 p-4 font-mono overflow-hidden">
      <div
        ref={outputRef}
        className="h-full overflow-auto scrollbar"
      >
        <div className="text-xs space-y-1">
          {output.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
          
          <div className="flex items-center text-xs">
            <span>C:\SWAGY{'>'}</span>
            <div className="ml-1 flex items-center flex-1 relative">
              <input
                type="text"
                value={currentInput}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="bg-transparent border-none outline-none text-green-400 w-full caret-transparent"
                style={{ fontFamily: 'inherit' }}
                autoFocus
                readOnly={isAutoTyping}
              />
              <span 
                className="absolute blink text-green-400 pointer-events-none"
                style={{ 
                  left: `${currentInput.length * 0.6}em`,
                  fontFamily: 'inherit'
                }}
              >█</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
