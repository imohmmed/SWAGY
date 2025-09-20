import { useState, useEffect, useCallback } from 'react';
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

const GRID_SIZE = 16;
const MINE_COUNT = 40;

export function Minesweeper({ onClose }: MinesweeperProps) {
  const { t } = useLanguage();
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [flagCount, setFlagCount] = useState(MINE_COUNT);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize game
  const initializeGame = useCallback(() => {
    const newGrid: Cell[][] = Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(null).map(() => ({
        isMine: false,
        neighborMines: 0,
        state: 'hidden' as CellState
      }))
    );

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < MINE_COUNT) {
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      
      if (!newGrid[row][col].isMine) {
        newGrid[row][col].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbor mine counts
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (!newGrid[row][col].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const newRow = row + dr;
              const newCol = col + dc;
              if (
                newRow >= 0 && newRow < GRID_SIZE &&
                newCol >= 0 && newCol < GRID_SIZE &&
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

    setGrid(newGrid);
    setGameStatus('playing');
    setFlagCount(MINE_COUNT);
    setTimeElapsed(0);
    setGameStarted(false);
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && gameStatus === 'playing') {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameStatus]);

  // Initialize on mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Reveal cell and adjacent empty cells
  const revealCell = useCallback((row: number, col: number) => {
    if (gameStatus !== 'playing') return;
    
    if (!gameStarted) {
      setGameStarted(true);
    }

    setGrid(prevGrid => {
      const newGrid = prevGrid.map(row => row.map(cell => ({ ...cell })));
      const cell = newGrid[row][col];

      if (cell.state !== 'hidden') return prevGrid;

      cell.state = 'revealed';

      // If it's a mine, game over
      if (cell.isMine) {
        setGameStatus('lost');
        // Reveal all mines
        for (let r = 0; r < GRID_SIZE; r++) {
          for (let c = 0; c < GRID_SIZE; c++) {
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
                newRow >= 0 && newRow < GRID_SIZE &&
                newCol >= 0 && newCol < GRID_SIZE &&
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
  }, [gameStatus, gameStarted]);

  // Toggle flag on cell
  const toggleFlag = useCallback((row: number, col: number) => {
    if (gameStatus !== 'playing') return;

    setGrid(prevGrid => {
      const newGrid = prevGrid.map(row => row.map(cell => ({ ...cell })));
      const cell = newGrid[row][col];

      if (cell.state === 'hidden') {
        cell.state = 'flagged';
        setFlagCount(prev => prev - 1);
      } else if (cell.state === 'flagged') {
        cell.state = 'hidden';
        setFlagCount(prev => prev + 1);
      }

      return newGrid;
    });
  }, [gameStatus]);

  // Check win condition
  useEffect(() => {
    if (gameStatus === 'playing' && grid.length > 0) {
      let hiddenNonMines = 0;
      let correctFlags = 0;

      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
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
    revealCell(row, col);
  };

  // Handle cell right click / long press
  const handleCellRightClick = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    toggleFlag(row, col);
  };

  // Handle cell long press for mobile
  const handleCellLongPress = (row: number, col: number) => {
    toggleFlag(row, col);
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
    const baseClasses = 'w-6 h-6 border border-[rgb(var(--win-border-dark))] flex items-center justify-center text-xs font-bold cursor-pointer select-none';
    
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
      {/* Header with game stats */}
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
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-16 gap-0 border-2 border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-shadow))] p-1">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              let longPressTimer: NodeJS.Timeout;
              
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={getCellClasses(cell)}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  onContextMenu={(e) => handleCellRightClick(e, rowIndex, colIndex)}
                  onTouchStart={() => {
                    longPressTimer = setTimeout(() => {
                      handleCellLongPress(rowIndex, colIndex);
                    }, 500);
                  }}
                  onTouchEnd={() => {
                    clearTimeout(longPressTimer);
                  }}
                  onTouchMove={() => {
                    clearTimeout(longPressTimer);
                  }}
                  data-testid={`cell-${rowIndex}-${colIndex}`}
                >
                  {getCellContent(cell)}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-3 p-2 border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] text-xs">
        <div className="font-bold mb-1">{t('minesweeperInstructions') || 'Instructions:'}</div>
        <div>• {t('minesweeperLeftClick') || 'Left click: Reveal cell'}</div>
        <div>• {t('minesweeperRightClick') || 'Right click: Flag/unflag'}</div>
        <div>• {t('minesweeperLongPress') || 'Mobile: Long press to flag'}</div>
      </div>
    </div>
  );
}