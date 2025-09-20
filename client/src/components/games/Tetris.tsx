import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

interface TetrisProps {
  onClose: () => void;
}

// Tetris piece definitions
const TETROMINOS = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: '#00f0f0'
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: '#f0f000'
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#a000f0'
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: '#00f000'
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: '#f00000'
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#0000f0'
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#f0a000'
  },
};

type TetrominoType = keyof typeof TETROMINOS;
const TETROMINO_TYPES = Object.keys(TETROMINOS) as TetrominoType[];

interface Position {
  x: number;
  y: number;
}

interface Piece {
  type: TetrominoType;
  position: Position;
  rotation: number;
}

interface Cell {
  filled: boolean;
  color?: string;
}

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const INITIAL_DROP_TIME = 1000;

export function Tetris({ onClose }: TetrisProps) {
  const { t } = useLanguage();
  
  // Game state
  const [board, setBoard] = useState<Cell[][]>(() => 
    Array(BOARD_HEIGHT).fill(null).map(() => 
      Array(BOARD_WIDTH).fill(null).map(() => ({ filled: false }))
    )
  );
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [nextPiece, setNextPiece] = useState<TetrominoType>(() => 
    TETROMINO_TYPES[Math.floor(Math.random() * TETROMINO_TYPES.length)]
  );
  const [heldPiece, setHeldPiece] = useState<TetrominoType | null>(null);
  const [canHold, setCanHold] = useState(true);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'paused' | 'gameOver'>('playing');
  
  const dropTimeRef = useRef(INITIAL_DROP_TIME);
  const lastDropTimeRef = useRef(0);
  const gameLoopRef = useRef<number>();

  // Helper functions
  const getRandomPiece = (): TetrominoType => {
    return TETROMINO_TYPES[Math.floor(Math.random() * TETROMINO_TYPES.length)];
  };

  const rotatePiece = (shape: number[][]): number[][] => {
    const N = shape.length;
    return shape.map((_, i) => shape.map(row => row[N - 1 - i]));
  };

  const getPieceShape = (piece: Piece): number[][] => {
    let shape = TETROMINOS[piece.type].shape;
    for (let i = 0; i < piece.rotation; i++) {
      shape = rotatePiece(shape);
    }
    return shape;
  };

  const isValidPosition = (piece: Piece, board: Cell[][], offset: Position = { x: 0, y: 0 }): boolean => {
    const shape = getPieceShape(piece);
    const newX = piece.position.x + offset.x;
    const newY = piece.position.y + offset.y;

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const boardX = newX + x;
          const boardY = newY + y;

          // Check boundaries
          if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
            return false;
          }
          
          // Check collision with existing pieces
          if (boardY >= 0 && board[boardY][boardX].filled) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const placePiece = (piece: Piece, board: Cell[][]): Cell[][] => {
    const newBoard = board.map(row => [...row]);
    const shape = getPieceShape(piece);
    const color = TETROMINOS[piece.type].color;

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const boardX = piece.position.x + x;
          const boardY = piece.position.y + y;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = { filled: true, color };
          }
        }
      }
    }
    return newBoard;
  };

  const clearLines = (board: Cell[][]): { newBoard: Cell[][]; linesCleared: number } => {
    const newBoard = board.filter(row => !row.every(cell => cell.filled));
    const linesCleared = BOARD_HEIGHT - newBoard.length;
    
    // Add empty rows at the top
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(null).map(() => ({ filled: false })));
    }
    
    return { newBoard, linesCleared };
  };

  const spawnPiece = (): Piece => {
    return {
      type: nextPiece,
      position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
      rotation: 0,
    };
  };

  // Game actions
  const movePiece = (direction: 'left' | 'right' | 'down'): void => {
    if (!currentPiece || gameStatus !== 'playing') return;

    const offset = {
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
      down: { x: 0, y: 1 },
    }[direction];

    if (isValidPosition(currentPiece, board, offset)) {
      setCurrentPiece(prev => prev ? {
        ...prev,
        position: {
          x: prev.position.x + offset.x,
          y: prev.position.y + offset.y,
        }
      } : null);
    } else if (direction === 'down') {
      // Piece can't move down, place it
      const newBoard = placePiece(currentPiece, board);
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      
      const newLines = lines + linesCleared;
      const newLevel = Math.floor(newLines / 10) + 1;
      
      setBoard(clearedBoard);
      setLines(newLines);
      setLevel(newLevel);
      setScore(prev => prev + linesCleared * 100 * newLevel);
      
      // Update drop time based on new level
      dropTimeRef.current = Math.max(50, INITIAL_DROP_TIME - (newLevel - 1) * 100);
      
      // Spawn new piece
      const newPiece = spawnPiece();
      if (isValidPosition(newPiece, clearedBoard)) {
        setCurrentPiece(newPiece);
        setNextPiece(getRandomPiece());
        setCanHold(true);
      } else {
        setGameStatus('gameOver');
      }
    }
  };

  const rotatePieceAction = (): void => {
    if (!currentPiece || gameStatus !== 'playing') return;

    const rotatedPiece = {
      ...currentPiece,
      rotation: (currentPiece.rotation + 1) % 4,
    };

    // Try basic wall kicks if rotation fails
    if (isValidPosition(rotatedPiece, board)) {
      setCurrentPiece(rotatedPiece);
    } else {
      // Try wall kicks: left, right, left2, right2
      const kickOffsets = [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: -2, y: 0 }, { x: 2, y: 0 }];
      for (const offset of kickOffsets) {
        if (isValidPosition(rotatedPiece, board, offset)) {
          setCurrentPiece({
            ...rotatedPiece,
            position: {
              x: rotatedPiece.position.x + offset.x,
              y: rotatedPiece.position.y + offset.y,
            }
          });
          return;
        }
      }
    }
  };

  const hardDrop = (): void => {
    if (!currentPiece || gameStatus !== 'playing') return;

    let dropDistance = 0;
    while (isValidPosition(currentPiece, board, { x: 0, y: dropDistance + 1 })) {
      dropDistance++;
    }

    const droppedPiece = {
      ...currentPiece,
      position: {
        ...currentPiece.position,
        y: currentPiece.position.y + dropDistance,
      }
    };

    // Directly place piece and handle line clearing
    const newBoard = placePiece(droppedPiece, board);
    const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
    
    const newLines = lines + linesCleared;
    const newLevel = Math.floor(newLines / 10) + 1;
    
    setBoard(clearedBoard);
    setLines(newLines);
    setLevel(newLevel);
    setScore(prev => prev + linesCleared * 100 * newLevel);
    
    // Update drop time based on new level
    dropTimeRef.current = Math.max(50, INITIAL_DROP_TIME - (newLevel - 1) * 100);
    
    // Spawn new piece
    const newPiece = spawnPiece();
    if (isValidPosition(newPiece, clearedBoard)) {
      setCurrentPiece(newPiece);
      setNextPiece(getRandomPiece());
      setCanHold(true);
    } else {
      setGameStatus('gameOver');
    }
  };

  const holdPiece = (): void => {
    if (!currentPiece || !canHold || gameStatus !== 'playing') return;

    const currentType = currentPiece.type;
    
    if (heldPiece) {
      // Swap current piece with held piece
      const newPiece: Piece = {
        type: heldPiece,
        position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
        rotation: 0,
      };
      
      if (isValidPosition(newPiece, board)) {
        setCurrentPiece(newPiece);
        setHeldPiece(currentType);
      }
    } else {
      // Hold current piece and spawn new one
      setHeldPiece(currentType);
      const newPiece = spawnPiece();
      if (isValidPosition(newPiece, board)) {
        setCurrentPiece(newPiece);
        setNextPiece(getRandomPiece());
      }
    }
    
    setCanHold(false);
  };

  const togglePause = (): void => {
    if (gameStatus === 'gameOver') return;
    setGameStatus(prev => prev === 'playing' ? 'paused' : 'playing');
  };

  const resetGame = (): void => {
    setBoard(Array(BOARD_HEIGHT).fill(null).map(() => 
      Array(BOARD_WIDTH).fill(null).map(() => ({ filled: false }))
    ));
    setCurrentPiece(null);
    setNextPiece(getRandomPiece());
    setHeldPiece(null);
    setCanHold(true);
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameStatus('playing');
    dropTimeRef.current = INITIAL_DROP_TIME;
  };

  // Keyboard controls
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (gameStatus === 'gameOver') return;

    switch (e.key.toLowerCase()) {
      case 'arrowleft':
      case 'a':
        e.preventDefault();
        movePiece('left');
        break;
      case 'arrowright':
      case 'd':
        e.preventDefault();
        movePiece('right');
        break;
      case 'arrowdown':
      case 's':
        e.preventDefault();
        movePiece('down');
        break;
      case 'arrowup':
      case 'w':
        e.preventDefault();
        rotatePieceAction();
        break;
      case ' ':
        e.preventDefault();
        if (gameStatus === 'playing' || gameStatus === 'paused') {
          if (gameStatus === 'playing') {
            hardDrop();
          }
        }
        break;
      case 'c':
        e.preventDefault();
        holdPiece();
        break;
      case 'p':
        e.preventDefault();
        togglePause();
        break;
    }
  }, [gameStatus, currentPiece, board]);

  // Game loop
  useEffect(() => {
    const gameLoop = (currentTime: number) => {
      if (gameStatus === 'playing' && currentPiece) {
        if (currentTime - lastDropTimeRef.current > dropTimeRef.current) {
          movePiece('down');
          lastDropTimeRef.current = currentTime;
        }
      }
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    if (gameStatus === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameStatus, currentPiece]);

  // Initialize first piece
  useEffect(() => {
    if (!currentPiece && gameStatus === 'playing') {
      setCurrentPiece(spawnPiece());
      setNextPiece(getRandomPiece()); // Ensure next piece is different
    }
  }, [currentPiece, gameStatus]);

  // Event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Render board with current piece
  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    
    // Add current piece to display board
    if (currentPiece) {
      const shape = getPieceShape(currentPiece);
      const color = TETROMINOS[currentPiece.type].color;
      
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x]) {
            const boardX = currentPiece.position.x + x;
            const boardY = currentPiece.position.y + y;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = { filled: true, color };
            }
          }
        }
      }
    }

    return displayBoard;
  };

  const renderMiniBoard = (piece: TetrominoType | null, title: string) => {
    if (!piece) return null;
    const shape = TETROMINOS[piece].shape;
    const color = TETROMINOS[piece].color;

    return (
      <div className="mb-4">
        <div className="text-xs font-bold mb-2 text-[rgb(var(--win-text))]">{title}</div>
        <div className="grid gap-px bg-[rgb(var(--win-border-dark))] p-1 border border-[rgb(var(--win-border-dark))]"
             style={{ gridTemplateColumns: `repeat(4, 12px)` }}>
          {Array(4).fill(null).map((_, y) => 
            Array(4).fill(null).map((_, x) => {
              const cell = shape[y] && shape[y][x];
              return (
                <div
                  key={`${y}-${x}`}
                  className="w-3 h-3 border border-[rgb(var(--win-border-light))]"
                  style={{ 
                    backgroundColor: cell ? color : '#c0c0c0'
                  }}
                />
              );
            })
          )}
        </div>
      </div>
    );
  };

  const displayBoard = renderBoard();

  return (
    <div className="h-full flex flex-col bg-[rgb(var(--win-light-gray))] p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[rgb(var(--win-text))]">{t('tetrisTitle')}</h2>
        <div className="flex gap-2">
          <button
            onClick={togglePause}
            className="px-3 py-1 text-sm border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))]"
            disabled={gameStatus === 'gameOver'}
            data-testid="button-pause-tetris"
          >
            {gameStatus === 'paused' ? (t('resume') || 'Resume') : (t('pause') || 'Pause')}
          </button>
          <button
            onClick={resetGame}
            className="px-3 py-1 text-sm border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))]"
            data-testid="button-new-game-tetris"
          >
            {t('newGame') || 'New Game'}
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))]"
            data-testid="button-close-tetris"
          >
            {t('close') || 'Close'}
          </button>
        </div>
      </div>

      {/* Game Status */}
      {gameStatus === 'paused' && (
        <div className="text-center py-2 mb-4 bg-yellow-200 border border-yellow-400 text-yellow-800 rounded">
          <strong>{t('tetrisPaused') || 'Paused'}</strong>
        </div>
      )}

      {gameStatus === 'gameOver' && (
        <div className="text-center py-2 mb-4 bg-red-200 border border-red-400 text-red-800 rounded">
          <strong>{t('tetrisGameOver') || 'Game Over!'}</strong>
        </div>
      )}

      {/* Game Area */}
      <div className="flex-1 flex gap-4">
        {/* Game Board */}
        <div className="flex-1">
          <div 
            className="grid gap-px bg-[rgb(var(--win-border-dark))] p-1 border-2 border-[rgb(var(--win-border-dark))] mx-auto"
            style={{ 
              gridTemplateColumns: `repeat(${BOARD_WIDTH}, 24px)`,
              width: 'fit-content'
            }}
            data-testid="tetris-board"
          >
            {displayBoard.map((row, y) =>
              row.map((cell, x) => (
                <div
                  key={`${y}-${x}`}
                  className="w-6 h-6 border border-[rgb(var(--win-border-light))]"
                  style={{ 
                    backgroundColor: cell.filled ? cell.color : '#c0c0c0'
                  }}
                  data-testid={`tetris-cell-${y}-${x}`}
                />
              ))
            )}
          </div>
        </div>

        {/* Side Panel */}
        <div className="w-32 flex flex-col">
          {/* Score Display */}
          <div className="mb-4 p-2 border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))]">
            <div className="text-xs font-bold mb-1 text-[rgb(var(--win-text))]">{t('tetrisScore')}</div>
            <div className="text-sm text-[rgb(var(--win-text))]" data-testid="tetris-score">{score}</div>
            <div className="text-xs font-bold mb-1 mt-2 text-[rgb(var(--win-text))]">{t('tetrisLevel')}</div>
            <div className="text-sm text-[rgb(var(--win-text))]" data-testid="tetris-level">{level}</div>
            <div className="text-xs font-bold mb-1 mt-2 text-[rgb(var(--win-text))]">{t('tetrisLines')}</div>
            <div className="text-sm text-[rgb(var(--win-text))]" data-testid="tetris-lines">{lines}</div>
          </div>

          {/* Next Piece */}
          {renderMiniBoard(nextPiece, t('tetrisNext') || 'Next')}
          
          {/* Directional Controls under NEXT */}
          <div className="mb-4">
            <div className="text-xs font-bold mb-2 text-[rgb(var(--win-text))]">{t('tetrisControls') || 'Controls'}</div>
            <div className="flex flex-col gap-1">
              {/* Top row - empty for alignment */}
              <div className="flex justify-center">
                <div className="w-8 h-8"></div>
              </div>
              {/* Middle row - Left and Right */}
              <div className="flex justify-between gap-1">
                <button
                  onClick={() => movePiece('left')}
                  className="w-8 h-8 text-xs border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:border-[rgb(var(--win-border-light))] flex items-center justify-center"
                  data-testid="button-control-left-tetris"
                  disabled={gameStatus !== 'playing'}
                >
                  ←
                </button>
                <button
                  onClick={() => movePiece('right')}
                  className="w-8 h-8 text-xs border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:border-[rgb(var(--win-border-light))] flex items-center justify-center"
                  data-testid="button-control-right-tetris"
                  disabled={gameStatus !== 'playing'}
                >
                  →
                </button>
              </div>
              {/* Bottom row - Down */}
              <div className="flex justify-center">
                <button
                  onClick={() => movePiece('down')}
                  className="w-8 h-8 text-xs border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:border-[rgb(var(--win-border-light))] flex items-center justify-center"
                  data-testid="button-control-down-tetris"
                  disabled={gameStatus !== 'playing'}
                >
                  ↓
                </button>
              </div>
            </div>
          </div>

          {/* Held Piece */}
          {renderMiniBoard(heldPiece, t('tetrisHold') || 'Hold')}
        </div>
      </div>


      {/* Mobile Controls */}
      <div className="mt-4 space-y-2 md:hidden">
        {/* Movement Controls */}
        <div className="flex justify-center gap-2">
          <button
            onClick={() => movePiece('left')}
            className="px-4 py-3 text-lg border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:border-[rgb(var(--win-border-light))] min-w-[48px]"
            data-testid="button-move-left-tetris"
            disabled={gameStatus !== 'playing'}
          >
            ←
          </button>
          <div className="flex flex-col gap-1">
            <button
              onClick={rotatePieceAction}
              className="px-4 py-2 text-sm border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:border-[rgb(var(--win-border-light))] min-w-[48px]"
              data-testid="button-rotate-tetris"
              disabled={gameStatus !== 'playing'}
            >
              ↻
            </button>
            <button
              onClick={() => movePiece('down')}
              className="px-4 py-3 text-lg border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:border-[rgb(var(--win-border-light))] min-w-[48px]"
              data-testid="button-move-down-tetris"
              disabled={gameStatus !== 'playing'}
            >
              ↓
            </button>
          </div>
          <button
            onClick={() => movePiece('right')}
            className="px-4 py-3 text-lg border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:border-[rgb(var(--win-border-light))] min-w-[48px]"
            data-testid="button-move-right-tetris"
            disabled={gameStatus !== 'playing'}
          >
            →
          </button>
        </div>
        
        {/* Action Controls */}
        <div className="flex justify-center gap-2">
          <button
            onClick={hardDrop}
            className="px-3 py-2 text-xs border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:border-[rgb(var(--win-border-light))]"
            data-testid="button-drop-tetris"
            disabled={gameStatus !== 'playing'}
          >
            Hard Drop
          </button>
          <button
            onClick={holdPiece}
            className="px-3 py-2 text-xs border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:border-[rgb(var(--win-border-light))]"
            data-testid="button-hold-tetris"
            disabled={gameStatus !== 'playing' || !canHold}
          >
            {t('tetrisHold') || 'Hold'}
          </button>
          <button
            onClick={togglePause}
            className="px-3 py-2 text-xs border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:border-[rgb(var(--win-border-light))]"
            data-testid="button-pause-mobile-tetris"
            disabled={gameStatus === 'gameOver'}
          >
            {gameStatus === 'paused' ? (t('resume') || 'Resume') : (t('pause') || 'Pause')}
          </button>
        </div>
      </div>
    </div>
  );
}