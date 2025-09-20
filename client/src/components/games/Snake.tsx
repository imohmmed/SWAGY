import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

interface Position {
  x: number;
  y: number;
}

interface SnakeProps {
  onClose?: () => void;
}

type Direction = 'up' | 'down' | 'left' | 'right';
type GameStatus = 'playing' | 'paused' | 'gameOver';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION: Direction = 'right';
const GAME_SPEED = 150; // milliseconds

export function Snake({ onClose }: SnakeProps) {
  const { t } = useLanguage();
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snake-high-score');
    return saved ? parseInt(saved) : 0;
  });
  
  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const directionRef = useRef<Direction>(INITIAL_DIRECTION);

  // Generate random food position
  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  // Initialize game
  const initializeGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setGameStatus('playing');
    setScore(0);
  }, [generateFood]);

  // Move snake
  const moveSnake = useCallback(() => {
    if (gameStatus !== 'playing') return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      // Move head based on direction
      switch (directionRef.current) {
        case 'up':
          head.y -= 1;
          break;
        case 'down':
          head.y += 1;
          break;
        case 'left':
          head.x -= 1;
          break;
        case 'right':
          head.x += 1;
          break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameStatus('gameOver');
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameStatus('gameOver');
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [gameStatus, food, generateFood]);

  // Game loop
  useEffect(() => {
    if (gameStatus === 'playing') {
      gameLoopRef.current = setInterval(moveSnake, GAME_SPEED);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameStatus, moveSnake]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameStatus !== 'playing') return;

      const newDirection = (() => {
        switch (e.key) {
          case 'ArrowUp':
          case 'w':
          case 'W':
            return 'up';
          case 'ArrowDown':
          case 's':
          case 'S':
            return 'down';
          case 'ArrowLeft':
          case 'a':
          case 'A':
            return 'left';
          case 'ArrowRight':
          case 'd':
          case 'D':
            return 'right';
          case ' ':
            // Spacebar to pause/unpause
            setGameStatus(prev => prev === 'playing' ? 'paused' : 'playing');
            return null;
          default:
            return null;
        }
      })();

      if (newDirection) {
        // Prevent reverse direction
        const opposites = {
          up: 'down',
          down: 'up',
          left: 'right',
          right: 'left'
        };

        if (newDirection !== opposites[directionRef.current]) {
          setDirection(newDirection);
          directionRef.current = newDirection;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStatus]);

  // Update high score
  useEffect(() => {
    if (gameStatus === 'gameOver' && score > highScore) {
      setHighScore(score);
      localStorage.setItem('snake-high-score', score.toString());
    }
  }, [gameStatus, score, highScore]);

  // Initialize on mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Mobile controls
  const handleDirectionClick = (newDirection: Direction) => {
    if (gameStatus !== 'playing') return;

    const opposites = {
      up: 'down',
      down: 'up',
      left: 'right',
      right: 'left'
    };

    if (newDirection !== opposites[directionRef.current]) {
      setDirection(newDirection);
      directionRef.current = newDirection;
    }
  };

  const togglePause = () => {
    setGameStatus(prev => prev === 'playing' ? 'paused' : 'playing');
  };

  // Check if cell contains snake
  const isSnakeCell = (x: number, y: number) => {
    return snake.some(segment => segment.x === x && segment.y === y);
  };

  // Check if cell is snake head
  const isSnakeHead = (x: number, y: number) => {
    return snake.length > 0 && snake[0].x === x && snake[0].y === y;
  };

  // Check if cell contains food
  const isFoodCell = (x: number, y: number) => {
    return food.x === x && food.y === y;
  };

  return (
    <div className="h-full flex flex-col bg-[rgb(var(--win-light-gray))] p-2">
      {/* Header with game stats */}
      <div className="flex items-center justify-between mb-3 p-2 border-2 border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-xs">🏆</span>
            <span className="text-sm font-mono">{highScore.toString().padStart(4, '0')}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <span className="text-xs">📊</span>
            <span className="text-sm font-mono">{score.toString().padStart(4, '0')}</span>
          </div>
          
          <button
            onClick={initializeGame}
            className="px-3 py-1 text-sm border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))]"
            data-testid="button-restart-snake"
          >
            {t('newGame') || 'New Game'}
          </button>
          
          <button
            onClick={togglePause}
            className="px-3 py-1 text-sm border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))]"
            data-testid="button-pause-snake"
          >
            {gameStatus === 'paused' ? (t('resume') || 'Resume') : (t('pause') || 'Pause')}
          </button>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))]"
            data-testid="button-close-snake"
          >
            {t('close') || 'Close'}
          </button>
        )}
      </div>

      {/* Game status */}
      {gameStatus === 'gameOver' && (
        <div className="text-center mb-2 p-2 bg-red-100 border border-red-400 rounded">
          <span className="text-sm font-bold">
            {t('gameOver') || 'Game Over!'} {t('finalScore') || 'Final Score'}: {score}
          </span>
        </div>
      )}

      {gameStatus === 'paused' && (
        <div className="text-center mb-2 p-2 bg-yellow-100 border border-yellow-400 rounded">
          <span className="text-sm font-bold">
            {t('paused') || 'Paused'}
          </span>
        </div>
      )}

      {/* Game grid */}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-20 gap-0 border-2 border-[rgb(var(--win-border-dark))] bg-black p-1">
          {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);
            
            let cellClasses = "w-4 h-4 border border-gray-800";
            
            if (isSnakeHead(x, y)) {
              cellClasses += " bg-green-400";
            } else if (isSnakeCell(x, y)) {
              cellClasses += " bg-green-600";
            } else if (isFoodCell(x, y)) {
              cellClasses += " bg-red-500";
            } else {
              cellClasses += " bg-gray-900";
            }
            
            return (
              <div
                key={`${x}-${y}`}
                className={cellClasses}
                data-testid={`cell-${x}-${y}`}
              />
            );
          })}
        </div>
      </div>

      {/* Mobile controls */}
      <div className="mt-3 flex flex-col items-center gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => handleDirectionClick('up')}
            className="w-12 h-12 border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:bg-[rgb(var(--win-button-shadow))] flex items-center justify-center text-lg"
            disabled={gameStatus !== 'playing'}
            data-testid="button-up"
          >
            ↑
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleDirectionClick('left')}
            className="w-12 h-12 border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:bg-[rgb(var(--win-button-shadow))] flex items-center justify-center text-lg"
            disabled={gameStatus !== 'playing'}
            data-testid="button-left"
          >
            ←
          </button>
          <button
            onClick={() => handleDirectionClick('down')}
            className="w-12 h-12 border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:bg-[rgb(var(--win-button-shadow))] flex items-center justify-center text-lg"
            disabled={gameStatus !== 'playing'}
            data-testid="button-down"
          >
            ↓
          </button>
          <button
            onClick={() => handleDirectionClick('right')}
            className="w-12 h-12 border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:bg-[rgb(var(--win-button-shadow))] flex items-center justify-center text-lg"
            disabled={gameStatus !== 'playing'}
            data-testid="button-right"
          >
            →
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-3 p-2 border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] text-xs">
        <div className="font-bold mb-1">{t('gameInstructions') || 'Instructions:'}</div>
        <div>• {t('snakeInstructions1') || 'Use arrow keys or WASD to move'}</div>
        <div>• {t('snakeInstructions2') || 'Eat the red food to grow'}</div>
        <div>• {t('snakeInstructions3') || 'Avoid walls and your own tail'}</div>
        <div>• {t('snakeInstructions4') || 'Press Space to pause/resume'}</div>
      </div>
    </div>
  );
}