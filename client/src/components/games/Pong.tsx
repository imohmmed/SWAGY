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

// Enhanced game constants for classic Pong experience
const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 15;
const BALL_SIZE = 12;
const PADDLE_SPEED = 8;
const INITIAL_BALL_SPEED = 5;
const WINNING_SCORE = 10;
const AI_SPEED_FACTOR = 0.85; // Make AI slightly slower for better gameplay

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
    if (newBall.velocity.x < 0 && checkCollision(newBall, playerPaddle, 30)) {
      newBall.velocity.x = Math.abs(newBall.velocity.x); // Ensure positive direction
      
      // Enhanced spin mechanics - add variety to gameplay
      const hitPosition = (newBall.position.y + newBall.size/2 - playerPaddle.y) / playerPaddle.height;
      const spinFactor = (hitPosition - 0.5) * 2; // -1 to 1
      newBall.velocity.y = spinFactor * INITIAL_BALL_SPEED * 1.5;
      
      // Increase speed slightly for more excitement
      const speedIncrease = 1.05;
      newBall.velocity.x *= speedIncrease;
      newBall.velocity.y *= speedIncrease;
      
      newBall.position.x = 30 + PADDLE_WIDTH + 2; // Small buffer to prevent sticking
    }

    // Check collision with computer paddle (right side)  
    if (newBall.velocity.x > 0 && checkCollision(newBall, computerPaddle, GAME_WIDTH - 30 - PADDLE_WIDTH)) {
      newBall.velocity.x = -Math.abs(newBall.velocity.x); // Ensure negative direction
      
      // Enhanced spin mechanics
      const hitPosition = (newBall.position.y + newBall.size/2 - computerPaddle.y) / computerPaddle.height;
      const spinFactor = (hitPosition - 0.5) * 2; // -1 to 1
      newBall.velocity.y = spinFactor * INITIAL_BALL_SPEED * 1.5;
      
      // Increase speed slightly
      const speedIncrease = 1.05;
      newBall.velocity.x *= speedIncrease;
      newBall.velocity.y *= speedIncrease;
      
      newBall.position.x = GAME_WIDTH - 30 - PADDLE_WIDTH - newBall.size - 2; // Small buffer
    }

    return newBall;
  };

  const updateComputerPaddle = (currentBall: Ball): void => {
    setComputerPaddle(prev => {
      // Only move when ball is coming towards computer
      if (currentBall.velocity.x <= 0) return prev;
      
      const ballY = currentBall.position.y + currentBall.size / 2;
      const paddleCenterY = prev.y + prev.height / 2;
      const diff = ballY - paddleCenterY;
      
      // Enhanced AI with difficulty scaling and imperfection
      let newY = prev.y;
      const reactionThreshold = 15;
      
      if (Math.abs(diff) > reactionThreshold) {
        // Calculate move speed based on ball speed and distance
        const maxSpeed = prev.speed * AI_SPEED_FACTOR;
        const urgency = Math.min(1, Math.abs(currentBall.velocity.x) / 8);
        const moveSpeed = maxSpeed * urgency;
        
        // Add slight imperfection to make it beatable
        const imperfection = Math.random() * 0.3;
        const actualSpeed = moveSpeed * (1 - imperfection);
        
        newY += diff > 0 ? actualSpeed : -actualSpeed;
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

  // Enhanced mobile controls with continuous movement
  const mobileControlsRef = useRef<{ up: boolean; down: boolean }>({ up: false, down: false });

  const startPaddleUp = (): void => {
    if (gameStatus !== 'playing') return;
    mobileControlsRef.current.up = true;
  };

  const stopPaddleUp = (): void => {
    mobileControlsRef.current.up = false;
  };

  const startPaddleDown = (): void => {
    if (gameStatus !== 'playing') return;
    mobileControlsRef.current.down = true;
  };

  const stopPaddleDown = (): void => {
    mobileControlsRef.current.down = false;
  };

  const updateMobileControls = (): void => {
    const controls = mobileControlsRef.current;
    if (gameStatus !== 'playing') return;
    
    let deltaY = 0;
    if (controls.up) deltaY -= PADDLE_SPEED * 2;
    if (controls.down) deltaY += PADDLE_SPEED * 2;
    
    if (deltaY !== 0) {
      setPlayerPaddle(prev => ({
        ...prev,
        y: Math.max(0, Math.min(GAME_HEIGHT - prev.height, prev.y + deltaY))
      }));
    }
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
        updateMobileControls(); // Include mobile controls in game loop
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

      {/* Game Area - Classic Pong Style */}
      <div className="flex-1 flex justify-center">
        <div
          className="relative bg-black border-4 border-white"
          style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
          data-testid="pong-game-area"
        >
          {/* Center line - Classic dashed white line */}
          <div 
            className="absolute bg-white opacity-80"
            style={{
              left: GAME_WIDTH / 2 - 2,
              top: 0,
              width: 4,
              height: GAME_HEIGHT,
              backgroundImage: 'linear-gradient(white 15px, transparent 15px)',
              backgroundSize: '4px 30px',
            }}
          />
          
          {/* Player paddle (left) - Classic white rectangle */}
          <div
            className="absolute bg-white rounded-sm"
            style={{
              left: 30,
              top: playerPaddle.y,
              width: playerPaddle.width,
              height: playerPaddle.height,
              boxShadow: '0 0 8px rgba(255,255,255,0.5)',
            }}
            data-testid="player-paddle"
          />
          
          {/* Computer paddle (right) - Classic white rectangle */}
          <div
            className="absolute bg-white rounded-sm"
            style={{
              left: GAME_WIDTH - 30 - computerPaddle.width,
              top: computerPaddle.y,
              width: computerPaddle.width,
              height: computerPaddle.height,
              boxShadow: '0 0 8px rgba(255,255,255,0.5)',
            }}
            data-testid="computer-paddle"
          />
          
          {/* Ball - Classic square ball */}
          <div
            className="absolute bg-white"
            style={{
              left: ball.position.x,
              top: ball.position.y,
              width: ball.size,
              height: ball.size,
              boxShadow: '0 0 12px rgba(255,255,255,0.7)',
            }}
            data-testid="pong-ball"
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 p-2 border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))]">
        <div className="text-xs font-bold mb-2 text-[rgb(var(--win-text))]">{t('gameInstructions')}</div>
        <div className="text-xs text-[rgb(var(--win-text))] space-y-1">
          <div>• {t('pongInstructions1') || 'Use ↑↓ arrow keys or W/S to control your paddle'}</div>
          <div>• {t('pongInstructions2') || 'Don\'t let the ball escape from your side!'}</div>
          <div>• {t('pongInstructions3') || 'First player to reach 10 points wins'}</div>
          <div>• {t('pongInstructions4') || 'Press P to pause/resume the game'}</div>
        </div>
      </div>

      {/* Mobile Controls - Enhanced with continuous touch */}
      <div className="mt-4 flex justify-center gap-4 md:hidden">
        <button
          onTouchStart={startPaddleUp}
          onTouchEnd={stopPaddleUp}
          onMouseDown={startPaddleUp}
          onMouseUp={stopPaddleUp}
          onMouseLeave={stopPaddleUp}
          className="px-6 py-4 text-lg border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:border-[rgb(var(--win-border-light))] min-w-[80px] select-none"
          data-testid="button-paddle-up-pong"
          disabled={gameStatus !== 'playing'}
        >
          ↑
        </button>
        <button
          onTouchStart={startPaddleDown}
          onTouchEnd={stopPaddleDown}
          onMouseDown={startPaddleDown}
          onMouseUp={stopPaddleDown}
          onMouseLeave={stopPaddleDown}
          className="px-6 py-4 text-lg border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:border-[rgb(var(--win-border-light))] min-w-[80px] select-none"
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