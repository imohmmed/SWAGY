import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

interface PongProps {
  onClose: () => void;
}

interface Position {
  x: number;
  y: number;
}

interface Ball {
  position: Position;
  velocity: Position;
  size: number;
}

interface Paddle {
  y: number;
  height: number;
  width: number;
  speed: number;
}

const GAME_WIDTH = 600;
const GAME_HEIGHT = 400;
const PADDLE_HEIGHT = 80;
const PADDLE_WIDTH = 12;
const BALL_SIZE = 8;
const PADDLE_SPEED = 5;
const INITIAL_BALL_SPEED = 4;
const WINNING_SCORE = 11;

export function Pong({ onClose }: PongProps) {
  const { t } = useLanguage();
  
  // Game state
  const [gameStatus, setGameStatus] = useState<'playing' | 'paused' | 'gameOver'>('playing');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [winner, setWinner] = useState<'player' | 'computer' | null>(null);
  
  const [playerPaddle, setPlayerPaddle] = useState<Paddle>({
    y: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2,
    height: PADDLE_HEIGHT,
    width: PADDLE_WIDTH,
    speed: PADDLE_SPEED,
  });
  
  const [computerPaddle, setComputerPaddle] = useState<Paddle>({
    y: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2,
    height: PADDLE_HEIGHT,
    width: PADDLE_WIDTH,
    speed: PADDLE_SPEED,
  });
  
  const [ball, setBall] = useState<Ball>({
    position: { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 },
    velocity: { x: INITIAL_BALL_SPEED, y: INITIAL_BALL_SPEED },
    size: BALL_SIZE,
  });

  const gameLoopRef = useRef<number>();
  const keysRef = useRef<Set<string>>(new Set());

  // Helper functions
  const resetBall = (direction: 1 | -1 = 1): Ball => {
    return {
      position: { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 },
      velocity: { 
        x: INITIAL_BALL_SPEED * direction, 
        y: (Math.random() - 0.5) * INITIAL_BALL_SPEED 
      },
      size: BALL_SIZE,
    };
  };

  const checkCollision = (ball: Ball, paddle: Paddle, paddleX: number): boolean => {
    return (
      ball.position.x < paddleX + paddle.width &&
      ball.position.x + ball.size > paddleX &&
      ball.position.y < paddle.y + paddle.height &&
      ball.position.y + ball.size > paddle.y
    );
  };

  const updateBall = (currentBall: Ball): Ball => {
    const newBall = {
      ...currentBall,
      position: {
        x: currentBall.position.x + currentBall.velocity.x,
        y: currentBall.position.y + currentBall.velocity.y,
      },
    };

    // Bounce off top and bottom walls
    if (newBall.position.y <= 0 || newBall.position.y >= GAME_HEIGHT - newBall.size) {
      newBall.velocity.y = -newBall.velocity.y;
      newBall.position.y = Math.max(0, Math.min(GAME_HEIGHT - newBall.size, newBall.position.y));
    }

    // Check collision with player paddle (left side)
    if (newBall.velocity.x < 0 && checkCollision(newBall, playerPaddle, 20)) {
      newBall.velocity.x = -newBall.velocity.x;
      // Add some spin based on where ball hits paddle
      const hitPosition = (newBall.position.y - playerPaddle.y) / playerPaddle.height;
      newBall.velocity.y = (hitPosition - 0.5) * INITIAL_BALL_SPEED * 2;
      newBall.position.x = 20 + PADDLE_WIDTH;
    }

    // Check collision with computer paddle (right side)
    if (newBall.velocity.x > 0 && checkCollision(newBall, computerPaddle, GAME_WIDTH - 20 - PADDLE_WIDTH)) {
      newBall.velocity.x = -newBall.velocity.x;
      // Add some spin based on where ball hits paddle
      const hitPosition = (newBall.position.y - computerPaddle.y) / computerPaddle.height;
      newBall.velocity.y = (hitPosition - 0.5) * INITIAL_BALL_SPEED * 2;
      newBall.position.x = GAME_WIDTH - 20 - PADDLE_WIDTH - newBall.size;
    }

    return newBall;
  };

  const updateComputerPaddle = (currentBall: Ball): void => {
    setComputerPaddle(prev => {
      const ballY = currentBall.position.y + currentBall.size / 2;
      const paddleCenterY = prev.y + prev.height / 2;
      const diff = ballY - paddleCenterY;
      
      // Simple AI: move towards ball but with some imperfection
      let newY = prev.y;
      if (Math.abs(diff) > 10) {
        const moveSpeed = Math.min(prev.speed * 0.8, Math.abs(diff));
        newY += diff > 0 ? moveSpeed : -moveSpeed;
      }
      
      // Keep paddle within bounds
      newY = Math.max(0, Math.min(GAME_HEIGHT - prev.height, newY));
      
      return { ...prev, y: newY };
    });
  };

  const updatePlayerPaddle = (): void => {
    const keys = keysRef.current;
    let deltaY = 0;
    
    if (keys.has('ArrowUp') || keys.has('w') || keys.has('W')) {
      deltaY = -PADDLE_SPEED;
    }
    if (keys.has('ArrowDown') || keys.has('s') || keys.has('S')) {
      deltaY = PADDLE_SPEED;
    }
    
    if (deltaY !== 0) {
      setPlayerPaddle(prev => ({
        ...prev,
        y: Math.max(0, Math.min(GAME_HEIGHT - prev.height, prev.y + deltaY))
      }));
    }
  };

  const checkScore = (currentBall: Ball): void => {
    // Ball goes off left side (computer scores)
    if (currentBall.position.x < 0) {
      setComputerScore(prev => {
        const newScore = prev + 1;
        if (newScore >= WINNING_SCORE) {
          setWinner('computer');
          setGameStatus('gameOver');
        }
        return newScore;
      });
      setBall(resetBall(1)); // Ball goes towards player
    }
    
    // Ball goes off right side (player scores)
    if (currentBall.position.x > GAME_WIDTH) {
      setPlayerScore(prev => {
        const newScore = prev + 1;
        if (newScore >= WINNING_SCORE) {
          setWinner('player');
          setGameStatus('gameOver');
        }
        return newScore;
      });
      setBall(resetBall(-1)); // Ball goes towards computer
    }
  };

  // Game actions
  const togglePause = (): void => {
    if (gameStatus === 'gameOver') return;
    setGameStatus(prev => prev === 'playing' ? 'paused' : 'playing');
  };

  const resetGame = (): void => {
    setGameStatus('playing');
    setPlayerScore(0);
    setComputerScore(0);
    setWinner(null);
    setPlayerPaddle({
      y: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2,
      height: PADDLE_HEIGHT,
      width: PADDLE_WIDTH,
      speed: PADDLE_SPEED,
    });
    setComputerPaddle({
      y: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2,
      height: PADDLE_HEIGHT,
      width: PADDLE_WIDTH,
      speed: PADDLE_SPEED,
    });
    setBall(resetBall());
  };

  // Keyboard controls
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameStatus === 'gameOver') return;

    if (e.key.toLowerCase() === 'p') {
      e.preventDefault();
      togglePause();
      return;
    }

    if (gameStatus === 'playing') {
      keysRef.current.add(e.key);
    }
  }, [gameStatus]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    keysRef.current.delete(e.key);
  }, []);

  // Mobile controls
  const movePaddleUp = (): void => {
    if (gameStatus !== 'playing') return;
    setPlayerPaddle(prev => ({
      ...prev,
      y: Math.max(0, prev.y - PADDLE_SPEED * 3)
    }));
  };

  const movePaddleDown = (): void => {
    if (gameStatus !== 'playing') return;
    setPlayerPaddle(prev => ({
      ...prev,
      y: Math.min(GAME_HEIGHT - prev.height, prev.y + PADDLE_SPEED * 3)
    }));
  };

  // Game loop
  useEffect(() => {
    const gameLoop = () => {
      if (gameStatus === 'playing') {
        setBall(currentBall => {
          const updatedBall = updateBall(currentBall);
          checkScore(updatedBall);
          updateComputerPaddle(updatedBall);
          return updatedBall;
        });
        updatePlayerPaddle();
      }
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameStatus, playerPaddle, computerPaddle]);

  // Event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <div className="h-full flex flex-col bg-[rgb(var(--win-light-gray))] p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[rgb(var(--win-text))]">{t('pongTitle')}</h2>
        <div className="flex gap-2">
          <button
            onClick={togglePause}
            className="px-3 py-1 text-sm border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))]"
            disabled={gameStatus === 'gameOver'}
            data-testid="button-pause-pong"
          >
            {gameStatus === 'paused' ? (t('resume') || 'Resume') : (t('pause') || 'Pause')}
          </button>
          <button
            onClick={resetGame}
            className="px-3 py-1 text-sm border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))]"
            data-testid="button-new-game-pong"
          >
            {t('newGame') || 'New Game'}
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))]"
            data-testid="button-close-pong"
          >
            {t('close') || 'Close'}
          </button>
        </div>
      </div>

      {/* Game Status */}
      {gameStatus === 'paused' && (
        <div className="text-center py-2 mb-4 bg-yellow-200 border border-yellow-400 text-yellow-800 rounded">
          <strong>{t('paused') || 'Paused'}</strong>
        </div>
      )}

      {gameStatus === 'gameOver' && winner && (
        <div className="text-center py-2 mb-4 bg-green-200 border border-green-400 text-green-800 rounded">
          <strong>{t('pongGameOver') || 'Game Over!'}</strong> - {t('pongWinner') || 'Winner'}: {winner === 'player' ? (t('pongPlayer') || 'Player') : (t('pongComputer') || 'Computer')}
        </div>
      )}

      {/* Score Display */}
      <div className="flex justify-center gap-8 mb-4">
        <div className="text-center p-2 border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))]">
          <div className="text-xs font-bold text-[rgb(var(--win-text))]">{t('pongPlayer') || 'Player'}</div>
          <div className="text-2xl font-bold text-[rgb(var(--win-text))]" data-testid="player-score">{playerScore}</div>
        </div>
        <div className="text-center p-2 border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))]">
          <div className="text-xs font-bold text-[rgb(var(--win-text))]">{t('pongComputer') || 'Computer'}</div>
          <div className="text-2xl font-bold text-[rgb(var(--win-text))]" data-testid="computer-score">{computerScore}</div>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex justify-center">
        <div
          className="relative border-2 border-[rgb(var(--win-border-dark))] bg-black"
          style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
          data-testid="pong-game-area"
        >
          {/* Center line */}
          <div 
            className="absolute bg-white"
            style={{
              left: GAME_WIDTH / 2 - 1,
              top: 0,
              width: 2,
              height: GAME_HEIGHT,
              backgroundImage: 'linear-gradient(white 10px, transparent 10px)',
              backgroundSize: '2px 20px',
            }}
          />
          
          {/* Player paddle (left) */}
          <div
            className="absolute bg-white"
            style={{
              left: 20,
              top: playerPaddle.y,
              width: playerPaddle.width,
              height: playerPaddle.height,
            }}
            data-testid="player-paddle"
          />
          
          {/* Computer paddle (right) */}
          <div
            className="absolute bg-white"
            style={{
              left: GAME_WIDTH - 20 - computerPaddle.width,
              top: computerPaddle.y,
              width: computerPaddle.width,
              height: computerPaddle.height,
            }}
            data-testid="computer-paddle"
          />
          
          {/* Ball */}
          <div
            className="absolute bg-white rounded-full"
            style={{
              left: ball.position.x,
              top: ball.position.y,
              width: ball.size,
              height: ball.size,
            }}
            data-testid="pong-ball"
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 p-2 border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))]">
        <div className="text-xs font-bold mb-2 text-[rgb(var(--win-text))]">{t('gameInstructions')}</div>
        <div className="text-xs text-[rgb(var(--win-text))] space-y-1">
          <div>• {t('pongInstructions1') || 'Arrow keys or WASD to move paddle'}</div>
          <div>• {t('pongInstructions2') || 'Hit the ball back to opponent'}</div>
          <div>• {t('pongInstructions3') || 'First to 11 points wins'}</div>
          <div>• {t('pongInstructions4') || 'P to pause/resume'}</div>
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="mt-4 flex justify-center gap-4 md:hidden">
        <button
          onTouchStart={movePaddleUp}
          onMouseDown={movePaddleUp}
          className="px-6 py-4 text-lg border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:border-[rgb(var(--win-border-light))] min-w-[80px]"
          data-testid="button-paddle-up-pong"
          disabled={gameStatus !== 'playing'}
        >
          ↑
        </button>
        <button
          onTouchStart={movePaddleDown}
          onMouseDown={movePaddleDown}
          className="px-6 py-4 text-lg border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:border-[rgb(var(--win-border-light))] min-w-[80px]"
          data-testid="button-paddle-down-pong"
          disabled={gameStatus !== 'playing'}
        >
          ↓
        </button>
        <button
          onClick={togglePause}
          className="px-4 py-4 text-sm border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:border-[rgb(var(--win-border-light))]"
          data-testid="button-pause-mobile-pong"
          disabled={gameStatus === 'gameOver'}
        >
          {gameStatus === 'paused' ? (t('resume') || 'Resume') : (t('pause') || 'Pause')}
        </button>
      </div>
    </div>
  );
}