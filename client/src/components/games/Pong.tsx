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
  x: number;
  height: number;
  width: number;
}

interface Block {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  visible: boolean;
  points: number;
}

// Game constants for Breakout experience
const GAME_WIDTH = 400;
const GAME_HEIGHT = 300;
const PADDLE_HEIGHT = 15;
const PADDLE_WIDTH = 80;
const BALL_SIZE = 8;
const INITIAL_BALL_SPEED = 3;
const BLOCK_WIDTH = 20;
const BLOCK_HEIGHT = 20;
const BLOCKS_PER_ROW = 20;
const BLOCK_ROWS = 6;
const BLOCK_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'];
const BLOCK_SPACING = 0;

export function Pong({ onClose }: PongProps) {
  const { t } = useLanguage();
  
  // Game state
  const [gameStatus, setGameStatus] = useState<'playing' | 'paused' | 'gameOver' | 'won'>('playing');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  
  // Initialize blocks
  const initializeBlocks = (): Block[] => {
    const blocks: Block[] = [];
    const startY = 0; // Start from top with no spacing
    const startX = 0; // Start from left edge
    
    for (let row = 0; row < BLOCK_ROWS; row++) {
      for (let col = 0; col < BLOCKS_PER_ROW; col++) {
        blocks.push({
          x: startX + col * BLOCK_WIDTH,
          y: startY + row * BLOCK_HEIGHT,
          width: BLOCK_WIDTH,
          height: BLOCK_HEIGHT,
          color: BLOCK_COLORS[row % BLOCK_COLORS.length],
          visible: true,
          points: (BLOCK_ROWS - row) * 10 // Higher rows = more points
        });
      }
    }
    return blocks;
  };
  
  const [blocks, setBlocks] = useState<Block[]>(initializeBlocks);
  
  const [paddle, setPaddle] = useState<Paddle>({
    x: GAME_WIDTH / 2 - PADDLE_WIDTH / 2,
    height: PADDLE_HEIGHT,
    width: PADDLE_WIDTH,
  });
  
  const [ball, setBall] = useState<Ball>({
    position: { x: GAME_WIDTH / 2, y: GAME_HEIGHT - 50 },
    velocity: { x: INITIAL_BALL_SPEED, y: -INITIAL_BALL_SPEED },
    size: BALL_SIZE,
  });

  const gameLoopRef = useRef<number>();
  const isDraggingRef = useRef<boolean>(false);
  const dragOffsetRef = useRef<number>(0);

  // Helper functions
  const resetBall = (): Ball => {
    return {
      position: { x: GAME_WIDTH / 2, y: GAME_HEIGHT - 50 },
      velocity: { 
        x: (Math.random() > 0.5 ? 1 : -1) * INITIAL_BALL_SPEED,
        y: -INITIAL_BALL_SPEED 
      },
      size: BALL_SIZE,
    };
  };

  const checkBallPaddleCollision = (ball: Ball, paddle: Paddle): boolean => {
    const paddleTop = GAME_HEIGHT - paddle.height - 10;
    return (
      ball.position.x < paddle.x + paddle.width &&
      ball.position.x + ball.size > paddle.x &&
      ball.position.y < paddleTop + paddle.height &&
      ball.position.y + ball.size > paddleTop
    );
  };

  const checkBallBlockCollision = (ball: Ball, block: Block): boolean => {
    return (
      block.visible &&
      ball.position.x < block.x + block.width &&
      ball.position.x + ball.size > block.x &&
      ball.position.y < block.y + block.height &&
      ball.position.y + ball.size > block.y
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

    // Bounce off top wall
    if (newBall.position.y <= 0) {
      newBall.velocity.y = -newBall.velocity.y;
      newBall.position.y = 0;
    }

    // Bounce off left and right walls
    if (newBall.position.x <= 0 || newBall.position.x >= GAME_WIDTH - newBall.size) {
      newBall.velocity.x = -newBall.velocity.x;
      newBall.position.x = Math.max(0, Math.min(GAME_WIDTH - newBall.size, newBall.position.x));
    }

    // Check collision with paddle
    if (newBall.velocity.y > 0 && checkBallPaddleCollision(newBall, paddle)) {
      newBall.velocity.y = -Math.abs(newBall.velocity.y);
      
      // Add spin based on where ball hits paddle
      const hitPosition = (newBall.position.x - paddle.x) / paddle.width;
      const spinFactor = (hitPosition - 0.5) * 2; // -1 to 1
      newBall.velocity.x = spinFactor * INITIAL_BALL_SPEED;
      
      const paddleTop = GAME_HEIGHT - paddle.height - 10;
      newBall.position.y = paddleTop - newBall.size;
    }

    // Check collision with blocks
    setBlocks(currentBlocks => {
      let newBlocks = [...currentBlocks];
      let hitBlock = false;
      
      for (let i = 0; i < newBlocks.length; i++) {
        if (checkBallBlockCollision(newBall, newBlocks[i])) {
          newBlocks[i] = { ...newBlocks[i], visible: false };
          setScore(prev => prev + newBlocks[i].points);
          newBall.velocity.y = -newBall.velocity.y;
          hitBlock = true;
          
          // Check win condition
          const visibleBlocks = newBlocks.filter(block => block.visible);
          if (visibleBlocks.length === 0) {
            setGameStatus('won');
          }
          break;
        }
      }
      
      return newBlocks;
    });

    return newBall;
  };

  // Check for game end conditions
  const checkGameEnd = (currentBall: Ball): void => {
    // Ball fell off bottom - lose a life
    if (currentBall.position.y > GAME_HEIGHT) {
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameStatus('gameOver');
        }
        return newLives;
      });
      setBall(resetBall());
    }
  };

  // Drag controls for paddle
  const handleMouseDown = (e: React.MouseEvent): void => {
    if (gameStatus !== 'playing') return;
    isDraggingRef.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    dragOffsetRef.current = e.clientX - rect.left - paddle.x;
  };

  const handleMouseMove = (e: React.MouseEvent): void => {
    if (!isDraggingRef.current || gameStatus !== 'playing') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - rect.left - dragOffsetRef.current;
    setPaddle(prev => ({
      ...prev,
      x: Math.max(0, Math.min(GAME_WIDTH - prev.width, newX))
    }));
  };

  const handleMouseUp = (): void => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent): void => {
    if (gameStatus !== 'playing') return;
    isDraggingRef.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    dragOffsetRef.current = touch.clientX - rect.left - paddle.x;
  };

  const handleTouchMove = (e: React.TouchEvent): void => {
    if (!isDraggingRef.current || gameStatus !== 'playing') return;
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const newX = touch.clientX - rect.left - dragOffsetRef.current;
    setPaddle(prev => ({
      ...prev,
      x: Math.max(0, Math.min(GAME_WIDTH - prev.width, newX))
    }));
  };

  const handleTouchEnd = (): void => {
    isDraggingRef.current = false;
  };

  // Game actions
  const togglePause = (): void => {
    if (gameStatus === 'gameOver' || gameStatus === 'won') return;
    setGameStatus(prev => prev === 'playing' ? 'paused' : 'playing');
  };

  const resetGame = (): void => {
    setGameStatus('playing');
    setScore(0);
    setLives(3);
    setLevel(1);
    setBlocks(initializeBlocks());
    setPaddle({
      x: GAME_WIDTH / 2 - PADDLE_WIDTH / 2,
      height: PADDLE_HEIGHT,
      width: PADDLE_WIDTH,
    });
    setBall(resetBall());
  };

  // Keyboard controls
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameStatus === 'gameOver' || gameStatus === 'won') return;

    if (e.key.toLowerCase() === 'p') {
      e.preventDefault();
      togglePause();
      return;
    }

    // Arrow keys for paddle movement (alternative to drag)
    if (gameStatus === 'playing') {
      if (e.key === 'ArrowLeft') {
        setPaddle(prev => ({
          ...prev,
          x: Math.max(0, prev.x - 20)
        }));
      } else if (e.key === 'ArrowRight') {
        setPaddle(prev => ({
          ...prev,
          x: Math.min(GAME_WIDTH - prev.width, prev.x + 20)
        }));
      }
    }
  }, [gameStatus]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    // No continuous key handling needed for Breakout
  }, []);

  // Game loop
  useEffect(() => {
    const gameLoop = () => {
      if (gameStatus === 'playing') {
        setBall(currentBall => {
          const updatedBall = updateBall(currentBall);
          checkGameEnd(updatedBall);
          return updatedBall;
        });
      }
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameStatus, paddle, blocks]);

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

      {gameStatus === 'gameOver' && (
        <div className="text-center py-2 mb-4 bg-red-200 border border-red-400 text-red-800 rounded">
          <strong>Game Over!</strong> - Final Score: {score}
        </div>
      )}

      {gameStatus === 'won' && (
        <div className="text-center py-2 mb-4 bg-green-200 border border-green-400 text-green-800 rounded">
          <strong>You Won!</strong> - All blocks destroyed! Score: {score}
        </div>
      )}

      {/* Score Display */}
      <div className="flex justify-center gap-8 mb-4">
        <div className="text-center p-2 border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))]">
          <div className="text-xs font-bold text-[rgb(var(--win-text))]">Score</div>
          <div className="text-2xl font-bold text-[rgb(var(--win-text))]" data-testid="player-score">{score}</div>
        </div>
        <div className="text-center p-2 border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))]">
          <div className="text-xs font-bold text-[rgb(var(--win-text))]">Lives</div>
          <div className="text-2xl font-bold text-[rgb(var(--win-text))]" data-testid="lives-count">{'❤️'.repeat(lives)}</div>
        </div>
        <div className="text-center p-2 border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))]">
          <div className="text-xs font-bold text-[rgb(var(--win-text))]">Level</div>
          <div className="text-2xl font-bold text-[rgb(var(--win-text))]" data-testid="level-count">{level}</div>
        </div>
      </div>

      {/* Game Area - Breakout Style */}
      <div className="flex-1 flex justify-center">
        <div
          className="relative bg-black border-4 border-white cursor-crosshair overflow-hidden box-content"
          style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
          data-testid="breakout-game-area"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Colored blocks */}
          {blocks.map((block, index) => (
            block.visible && (
              <div
                key={index}
                className="absolute border border-gray-800 rounded-sm"
                style={{
                  left: block.x,
                  top: block.y,
                  width: block.width,
                  height: block.height,
                  backgroundColor: block.color,
                  boxShadow: '0 0 4px rgba(0,0,0,0.7)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
                data-testid={`block-${index}`}
              />
            )
          ))}
          
          {/* Player paddle (bottom) - Draggable */}
          <div
            className="absolute bg-white rounded-sm cursor-grab active:cursor-grabbing"
            style={{
              left: paddle.x,
              top: GAME_HEIGHT - paddle.height - 10,
              width: paddle.width,
              height: paddle.height,
              boxShadow: '0 0 8px rgba(255,255,255,0.5)',
            }}
            data-testid="breakout-paddle"
          />
          
          {/* Ball */}
          <div
            className="absolute bg-white rounded-full"
            style={{
              left: ball.position.x,
              top: ball.position.y,
              width: ball.size,
              height: ball.size,
              boxShadow: '0 0 12px rgba(255,255,255,0.7)',
            }}
            data-testid="breakout-ball"
          />
        </div>
      </div>


      {/* Mobile Controls - Arrow keys for mobile */}
      <div className="mt-4 flex justify-center gap-4 md:hidden">
        <button
          onTouchStart={() => setPaddle(prev => ({ ...prev, x: Math.max(0, prev.x - 30) }))}
          onMouseDown={() => setPaddle(prev => ({ ...prev, x: Math.max(0, prev.x - 30) }))}
          className="px-6 py-4 text-lg border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:border-[rgb(var(--win-border-light))] min-w-[80px] select-none"
          data-testid="button-paddle-left-breakout"
          disabled={gameStatus !== 'playing'}
        >
          ←
        </button>
        <button
          onTouchStart={() => setPaddle(prev => ({ ...prev, x: Math.min(GAME_WIDTH - prev.width, prev.x + 30) }))}
          onMouseDown={() => setPaddle(prev => ({ ...prev, x: Math.min(GAME_WIDTH - prev.width, prev.x + 30) }))}
          className="px-6 py-4 text-lg border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:border-[rgb(var(--win-border-light))] min-w-[80px] select-none"
          data-testid="button-paddle-right-breakout"
          disabled={gameStatus !== 'playing'}
        >
          →
        </button>
        <button
          onClick={togglePause}
          className="px-4 py-4 text-sm border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:border-[rgb(var(--win-border-light))]"
          data-testid="button-pause-mobile-breakout"
          disabled={gameStatus === 'gameOver' || gameStatus === 'won'}
        >
          {gameStatus === 'paused' ? 'Resume' : 'Pause'}
        </button>
      </div>
    </div>
  );
}