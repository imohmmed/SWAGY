import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

const commands = {
  help: 'helpCommand',
  whoami: 'whoamiResponse',
  dir: 'dirResponse',
  about: 'aboutResponse',
  skills: 'skillsResponse',
  contact: 'contactResponse',
  clear: 'CLEAR_SCREEN',
  exit: 'exitResponse'
};

export function TerminalWindow() {
  const { t } = useLanguage();
  const [output, setOutput] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isAutoTyping, setIsAutoTyping] = useState(true);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial terminal welcome
    setOutput([
      t('terminalWelcome'),
      t('terminalCopyright'),
      '',
      'C:\\SWAGY>',
      ''
    ]);

    // Auto-run commands
    const autoCommands = ['whoami', 'about', 'help'];
    let commandIndex = 0;

    const runNextCommand = () => {
      if (commandIndex < autoCommands.length) {
        const command = autoCommands[commandIndex];
        setTimeout(() => {
          autoTypeCommand(command, () => {
            commandIndex++;
            setTimeout(runNextCommand, 2000);
          });
        }, 2000);
      } else {
        setIsAutoTyping(false);
      }
    };

    setTimeout(runNextCommand, 1000);
  }, [t]);

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
        setTimeout(() => {
          executeCommand(command);
          setCurrentInput('');
          if (callback) callback();
        }, 500);
      }
    }, 100);
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
            <span>C:\SWAGY></span>
            <input
              type="text"
              value={currentInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="ml-1 bg-transparent border-none outline-none text-green-400 flex-1"
              style={{ fontFamily: 'inherit' }}
              autoFocus
              readOnly={isAutoTyping}
            />
            <span className="blink">█</span>
          </div>
        </div>
      </div>
    </div>
  );
}
