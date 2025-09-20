import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

type CellState = 'hidden' | 'revealed' | 'flagged';
type GameStatus = 'playing' | 'won' | 'lost';

interface Cell {
  isMine: boolean;
  neighborMines: number;
  state: CellState;
}

interface MinesweeperProps {
  onClose?: () => void;
}

// Difficulty levels
const DIFFICULTIES = {
  beginner: { size: 9, mines: 10 },
  intermediate: { size: 16, mines: 40 },
  expert: { size: 20, mines: 99 }
};

type Difficulty = keyof typeof DIFFICULTIES;

export function Minesweeper({ onClose }: MinesweeperProps) {
  const { t } = useLanguage();
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [flagCount, setFlagCount] = useState(DIFFICULTIES.beginner.mines);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [mobileMode, setMobileMode] = useState<'reveal' | 'flag'>('reveal');
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressNextClickRef = useRef(false);
  const suppressNextContextMenuRef = useRef(false);
  
  const currentDifficulty = DIFFICULTIES[difficulty];

  // Place mines avoiding a specific cell (for first-click safety)
  const placeMines = useCallback((avoidRow?: number, avoidCol?: number) => {
    const gridSize = currentDifficulty.size;
    const mineCount = currentDifficulty.mines;
    
    const newGrid: Cell[][] = Array(gridSize).fill(null).map(() =>
      Array(gridSize).fill(null).map(() => ({
        isMine: false,
        neighborMines: 0,
        state: 'hidden' as CellState
      }))
    );

    // Place mines randomly, avoiding the first clicked cell
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      
      if (!newGrid[row][col].isMine && 
          !(avoidRow !== undefined && avoidCol !== undefined && row === avoidRow && col === avoidCol)) {
        newGrid[row][col].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbor mine counts
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (!newGrid[row][col].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const newRow = row + dr;
              const newCol = col + dc;
              if (
                newRow >= 0 && newRow < gridSize &&
                newCol >= 0 && newCol < gridSize &&
                newGrid[newRow][newCol].isMine
              ) {
                count++;
              }
            }
          }
          newGrid[row][col].neighborMines = count;
        }
      }
    }

    return newGrid;
  }, [currentDifficulty]);

  // Initialize game
  const initializeGame = useCallback(() => {
    const newGrid = placeMines();
    setGrid(newGrid);
    setGameStatus('playing');
    setFlagCount(currentDifficulty.mines);
    setTimeElapsed(0);
    setGameStarted(false);
    setFirstClick(true);
  }, [placeMines, currentDifficulty]);
  
  // Reinitialize when difficulty changes
  useEffect(() => {
    initializeGame();
  }, [difficulty, initializeGame]);

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (gameStarted && gameStatus === 'playing') {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameStatus]);

  // Note: initializeGame is already called by the difficulty useEffect above

  // Reveal cell and adjacent empty cells
  const revealCell = useCallback((row: number, col: number) => {
    if (gameStatus !== 'playing') return;
    
    if (!gameStarted) {
      setGameStarted(true);
    }

    // If this is the first click, place mines avoiding this cell
    if (firstClick) {
      const newGrid = placeMines(row, col);
      setFirstClick(false);
      
      // Reveal the safe cell immediately on the new grid
      const workingGrid = newGrid.map(row => row.map(cell => ({ ...cell })));
      const targetCell = workingGrid[row][col];
      
      if (targetCell.state === 'hidden') {
        targetCell.state = 'revealed';
        
        // If it's empty, flood-fill reveal
        if (targetCell.neighborMines === 0) {
          const queue: [number, number][] = [[row, col]];
          const visited = new Set<string>();

          while (queue.length > 0) {
            const [currentRow, currentCol] = queue.shift()!;
            const key = `${currentRow}-${currentCol}`;

            if (visited.has(key)) continue;
            visited.add(key);

            for (let dr = -1; dr <= 1; dr++) {
              for (let dc = -1; dc <= 1; dc++) {
                const newRow = currentRow + dr;
                const newCol = currentCol + dc;

                if (
                  newRow >= 0 && newRow < workingGrid.length &&
                  newCol >= 0 && newCol < workingGrid[0].length &&
                  workingGrid[newRow][newCol].state === 'hidden' &&
                  !workingGrid[newRow][newCol].isMine
                ) {
                  workingGrid[newRow][newCol].state = 'revealed';
                  
                  if (workingGrid[newRow][newCol].neighborMines === 0) {
                    queue.push([newRow, newCol]);
                  }
                }
              }
            }
          }
        }
      }
      
      setGrid(workingGrid);
      return;
    }

    setGrid(prevGrid => {
      const newGrid = prevGrid.map(row => row.map(cell => ({ ...cell })));
      const cell = newGrid[row][col];

      if (cell.state !== 'hidden') return prevGrid;

      cell.state = 'revealed';

      // If it's a mine, game over
      if (cell.isMine) {
        setGameStatus('lost');
        // Reveal all mines using actual grid bounds
        for (let r = 0; r < newGrid.length; r++) {
          for (let c = 0; c < newGrid[0].length; c++) {
            if (newGrid[r][c].isMine) {
              newGrid[r][c].state = 'revealed';
            }
          }
        }
        return newGrid;
      }

      // If it's empty (no neighbor mines), reveal adjacent cells
      if (cell.neighborMines === 0) {
        const queue: [number, number][] = [[row, col]];
        const visited = new Set<string>();

        while (queue.length > 0) {
          const [currentRow, currentCol] = queue.shift()!;
          const key = `${currentRow}-${currentCol}`;

          if (visited.has(key)) continue;
          visited.add(key);

          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const newRow = currentRow + dr;
              const newCol = currentCol + dc;

              if (
                newRow >= 0 && newRow < newGrid.length &&
                newCol >= 0 && newCol < newGrid[0].length &&
                newGrid[newRow][newCol].state === 'hidden' &&
                !newGrid[newRow][newCol].isMine
              ) {
                newGrid[newRow][newCol].state = 'revealed';
                
                if (newGrid[newRow][newCol].neighborMines === 0) {
                  queue.push([newRow, newCol]);
                }
              }
            }
          }
        }
      }

      return newGrid;
    });
  }, [gameStatus, gameStarted, firstClick, placeMines]);

  // Toggle flag on cell
  const toggleFlag = useCallback((row: number, col: number) => {
    if (gameStatus !== 'playing') return;
    
    // Prevent flagging before first reveal to avoid flag state inconsistency
    if (firstClick) {
      return; // Silently ignore flagging before first reveal
    }

    setGrid(prevGrid => {
      const newGrid = prevGrid.map(row => row.map(cell => ({ ...cell })));
      const cell = newGrid[row][col];

      if (cell.state === 'hidden') {
        cell.state = 'flagged';
        setFlagCount(prev => Math.max(0, prev - 1)); // Prevent negative count
      } else if (cell.state === 'flagged') {
        cell.state = 'hidden';
        setFlagCount(prev => Math.min(currentDifficulty.mines, prev + 1)); // Cap at mine count
      }

      return newGrid;
    });
  }, [gameStatus, firstClick]);

  // Check win condition
  useEffect(() => {
    if (gameStatus === 'playing' && grid.length > 0) {
      let hiddenNonMines = 0;
      let correctFlags = 0;

      // Use actual grid bounds, not difficulty size
      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
          const cell = grid[row][col];
          if (!cell.isMine && cell.state === 'hidden') {
            hiddenNonMines++;
          }
          if (cell.isMine && cell.state === 'flagged') {
            correctFlags++;
          }
        }
      }

      if (hiddenNonMines === 0) {
        setGameStatus('won');
      }
    }
  }, [grid, gameStatus]);

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    // Prevent click if long-press just fired
    if (suppressNextClickRef.current) {
      suppressNextClickRef.current = false;
      return;
    }
    
    if (mobileMode === 'reveal') {
      revealCell(row, col);
    } else {
      toggleFlag(row, col);
    }
  };
  
  // Change difficulty
  const changeDifficulty = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    // initializeGame will be called automatically via useEffect
  };
  
  // Toggle mobile mode
  const toggleMobileMode = () => {
    setMobileMode(prev => prev === 'reveal' ? 'flag' : 'reveal');
  };

  // Handle cell right click / long press
  const handleCellRightClick = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    
    // Prevent double-flag if long-press just fired
    if (suppressNextContextMenuRef.current) {
      suppressNextContextMenuRef.current = false;
      return;
    }
    
    toggleFlag(row, col);
  };

  // Handle cell long press for mobile
  const handleCellLongPress = (row: number, col: number) => {
    toggleFlag(row, col);
  };

  // Handle touch start for long press
  const handleTouchStart = (row: number, col: number) => {
    longPressTimerRef.current = setTimeout(() => {
      handleCellLongPress(row, col);
      suppressNextClickRef.current = true; // Suppress the click that follows long-press
      suppressNextContextMenuRef.current = true; // Suppress contextmenu that follows long-press
    }, 500);
  };

  // Handle touch end/move to cancel long press
  const handleTouchEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  // Get cell display content
  const getCellContent = (cell: Cell) => {
    if (cell.state === 'flagged') return '🚩';
    if (cell.state === 'hidden') return '';
    if (cell.isMine) return '💣';
    if (cell.neighborMines === 0) return '';
    return cell.neighborMines.toString();
  };

  // Get cell CSS classes
  const getCellClasses = (cell: Cell) => {
    const cellSize = difficulty === 'beginner' ? 'w-8 h-8 text-sm' : 
                    difficulty === 'intermediate' ? 'w-6 h-6 text-xs' : 'w-5 h-5 text-xs';
    const baseClasses = `${cellSize} border border-[rgb(var(--win-border-dark))] flex items-center justify-center font-bold cursor-pointer select-none`;
    
    if (cell.state === 'hidden' || cell.state === 'flagged') {
      return `${baseClasses} bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:bg-[rgb(var(--win-button-shadow))]`;
    }
    
    if (cell.isMine) {
      return `${baseClasses} bg-red-500 text-white`;
    }
    
    const numberColors = [
      '', 'text-blue-600', 'text-green-600', 'text-red-600',
      'text-purple-600', 'text-yellow-600', 'text-pink-600',
      'text-black', 'text-gray-600'
    ];
    
    return `${baseClasses} bg-[rgb(var(--win-light-gray))] ${numberColors[cell.neighborMines] || ''}`;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col bg-[rgb(var(--win-light-gray))] p-2">
      {/* Header with difficulty selection */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 p-2 border-2 border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold">{t('difficulty') || 'Difficulty'}:</span>
          <select
            value={difficulty}
            onChange={(e) => changeDifficulty(e.target.value as Difficulty)}
            className="px-1 py-0.5 text-xs border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))]"
            data-testid="select-difficulty"
          >
            <option value="beginner">{t('beginner') || 'Beginner'} (9×9)</option>
            <option value="intermediate">{t('intermediate') || 'Intermediate'} (16×16)</option>
            <option value="expert">{t('expert') || 'Expert'} (20×20)</option>
          </select>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))]"
            data-testid="button-close-minesweeper"
          >
            {t('close') || 'Close'}
          </button>
        )}
      </div>
      
      {/* Game stats and mobile controls */}
      <div className="flex items-center justify-between mb-3 p-2 border-2 border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-xs">💣</span>
            <span className="text-sm font-mono">{flagCount.toString().padStart(3, '0')}</span>
          </div>
          
          <button
            onClick={initializeGame}
            className="w-8 h-8 border-2 border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:border-[rgb(var(--win-border-light))] flex items-center justify-center text-lg"
            data-testid="button-restart-minesweeper"
          >
            {gameStatus === 'won' ? '😎' : gameStatus === 'lost' ? '😵' : '🙂'}
          </button>
          
          <div className="flex items-center gap-1">
            <span className="text-xs">⏱️</span>
            <span className="text-sm font-mono">{formatTime(timeElapsed)}</span>
          </div>
        </div>
        
        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <span className="text-xs">{t('mode') || 'Mode'}:</span>
          <button
            onClick={toggleMobileMode}
            className={`px-2 py-1 text-xs border border-[rgb(var(--win-border-dark))] ${
              mobileMode === 'reveal' 
                ? 'bg-blue-200 text-blue-800'
                : 'bg-red-200 text-red-800'
            } hover:opacity-80`}
            data-testid="button-toggle-mobile-mode"
          >
            {mobileMode === 'reveal' ? '👆 Reveal' : '🚩 Flag'}
          </button>
        </div>
      </div>

      {/* Game status */}
      {gameStatus !== 'playing' && (
        <div className="text-center mb-2 p-2 bg-yellow-100 border border-yellow-400 rounded">
          <span className="text-sm font-bold">
            {gameStatus === 'won' 
              ? (t('minesweeperWon') || 'Congratulations! You won!') 
              : (t('minesweeperLost') || 'Game Over! Try again.')
            }
          </span>
        </div>
      )}

      {/* Game grid */}
      <div className="flex-1 flex items-center justify-center overflow-auto">
        <div 
          className={`grid gap-0 border-2 border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-shadow))] p-1 max-w-full`}
          style={{ 
            gridTemplateColumns: `repeat(${currentDifficulty.size}, max-content)`,
            gridAutoRows: 'max-content'
          }}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={getCellClasses(cell)}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onContextMenu={(e) => handleCellRightClick(e, rowIndex, colIndex)}
                onTouchStart={() => handleTouchStart(rowIndex, colIndex)}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchEnd}
                data-testid={`cell-${rowIndex}-${colIndex}`}
              >
                {getCellContent(cell)}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-3 p-2 border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] text-xs">
        <div className="font-bold mb-1">{t('minesweeperInstructions') || 'Instructions:'}</div>
        <div className="hidden md:block">
          <div>• {t('minesweeperLeftClick') || 'Left click: Reveal cell'}</div>
          <div>• {t('minesweeperRightClick') || 'Right click: Flag/unflag'}</div>
        </div>
        <div className="md:hidden">
          <div>• {t('mobileToggleMode') || 'Toggle mode: Reveal/Flag'}</div>
          <div>• {t('minesweeperLongPress') || 'Long press: Alternative flag'}</div>
          <div>• {t('currentMode') || 'Current mode'}: <strong>{mobileMode === 'reveal' ? 'Reveal' : 'Flag'}</strong></div>
        </div>
      </div>
    </div>
  );
}