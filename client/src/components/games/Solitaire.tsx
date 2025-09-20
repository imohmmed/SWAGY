import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

interface Card {
  suit: Suit;
  rank: Rank;
  faceUp: boolean;
  id: string;
}

interface SolitaireProps {
  onClose?: () => void;
}

type GameStatus = 'playing' | 'won';

export function Solitaire({ onClose }: SolitaireProps) {
  const { t } = useLanguage();
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [stock, setStock] = useState<Card[]>([]);
  const [waste, setWaste] = useState<Card[]>([]);
  const [foundations, setFoundations] = useState<Card[][]>([[], [], [], []]);
  const [tableau, setTableau] = useState<Card[][]>([[], [], [], [], [], [], []]);
  const [draggedCard, setDraggedCard] = useState<Card | null>(null);
  const [draggedSequence, setDraggedSequence] = useState<Card[]>([]);
  const [dragSource, setDragSource] = useState<{ type: string; index: number; start?: number } | null>(null);

  // Create a full deck of cards
  const createDeck = useCallback((): Card[] => {
    const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck: Card[] = [];

    suits.forEach(suit => {
      ranks.forEach(rank => {
        deck.push({
          suit,
          rank,
          faceUp: false,
          id: `${suit}-${rank}`
        });
      });
    });

    // Shuffle deck
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
  }, []);

  // Initialize game
  const initializeGame = useCallback(() => {
    const deck = createDeck();
    const newTableau: Card[][] = [[], [], [], [], [], [], []];
    const newStock: Card[] = [];

    // Deal cards to tableau
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row <= col; row++) {
        const card = deck.pop()!;
        card.faceUp = row === col; // Only top card is face up
        newTableau[col].push(card);
      }
    }

    // Remaining cards go to stock
    newStock.push(...deck);

    setTableau(newTableau);
    setStock(newStock);
    setWaste([]);
    setFoundations([[], [], [], []]);
    setGameStatus('playing');
    setDraggedCard(null);
    setDragSource(null);
  }, [createDeck]);

  // Initialize on mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Get card color
  const getCardColor = (card: Card): 'red' | 'black' => {
    return card.suit === 'hearts' || card.suit === 'diamonds' ? 'red' : 'black';
  };

  // Get card rank value
  const getCardValue = (card: Card): number => {
    if (card.rank === 'A') return 1;
    if (card.rank === 'J') return 11;
    if (card.rank === 'Q') return 12;
    if (card.rank === 'K') return 13;
    return parseInt(card.rank);
  };

  // Get suit emoji
  const getSuitEmoji = (suit: Suit): string => {
    switch (suit) {
      case 'hearts': return '♥️';
      case 'diamonds': return '♦️';
      case 'clubs': return '♣️';
      case 'spades': return '♠️';
    }
  };

  // Draw cards from stock to waste
  const drawFromStock = () => {
    if (stock.length === 0) {
      // Reset stock from waste
      const newStock = [...waste].reverse().map(card => ({ ...card, faceUp: false }));
      setStock(newStock);
      setWaste([]);
    } else {
      // Draw 3 cards (or remaining)
      const cardsToDraw = Math.min(3, stock.length);
      const drawnCards = stock.slice(-cardsToDraw).map(card => ({ ...card, faceUp: true }));
      setWaste(prev => [...prev, ...drawnCards]);
      setStock(prev => prev.slice(0, -cardsToDraw));
    }
  };

  // Can place card on foundation
  const canPlaceOnFoundation = (card: Card, foundationIndex: number): boolean => {
    const foundation = foundations[foundationIndex];
    if (foundation.length === 0) {
      return card.rank === 'A';
    }
    const topCard = foundation[foundation.length - 1];
    return card.suit === topCard.suit && getCardValue(card) === getCardValue(topCard) + 1;
  };

  // Can place sequence on tableau
  const canPlaceOnTableau = (sequence: Card[], tableauIndex: number): boolean => {
    if (sequence.length === 0) return false;
    const firstCard = sequence[0];
    const column = tableau[tableauIndex];
    
    if (column.length === 0) {
      return firstCard.rank === 'K';
    }
    
    const topCard = column[column.length - 1];
    return topCard.faceUp && 
           getCardColor(firstCard) !== getCardColor(topCard) && 
           getCardValue(firstCard) === getCardValue(topCard) - 1;
  };

  // Handle card drag start
  const handleDragStart = (card: Card, source: { type: string; index: number; start?: number }) => {
    setDraggedCard(card);
    setDragSource(source);
    
    // For tableau, set sequence from start position to end
    if (source.type === 'tableau' && source.start !== undefined) {
      const column = tableau[source.index];
      const sequence = column.slice(source.start);
      setDraggedSequence(sequence);
    } else {
      setDraggedSequence([card]);
    }
  };

  // Handle drop on foundation
  const handleDropOnFoundation = (foundationIndex: number) => {
    if (!draggedCard || !dragSource) return;

    if (canPlaceOnFoundation(draggedCard, foundationIndex)) {
      // Add to foundation
      setFoundations(prev => {
        const newFoundations = [...prev];
        newFoundations[foundationIndex] = [...newFoundations[foundationIndex], draggedCard];
        return newFoundations;
      });

      // Remove from source
      if (dragSource.type === 'waste') {
        setWaste(prev => prev.slice(0, -1));
      } else if (dragSource.type === 'tableau') {
        setTableau(prev => {
          const newTableau = [...prev];
          newTableau[dragSource.index] = newTableau[dragSource.index].slice(0, -1);
          // Flip top card if it exists and is face down
          const column = newTableau[dragSource.index];
          if (column.length > 0 && !column[column.length - 1].faceUp) {
            column[column.length - 1].faceUp = true;
          }
          return newTableau;
        });
      }
    }

    setDraggedCard(null);
    setDragSource(null);
  };

  // Handle drop on tableau
  const handleDropOnTableau = (tableauIndex: number) => {
    if (!draggedCard || !dragSource || draggedSequence.length === 0) return;

    if (canPlaceOnTableau(draggedSequence, tableauIndex)) {
      // Add sequence to tableau
      setTableau(prev => {
        const newTableau = [...prev];
        newTableau[tableauIndex] = [...newTableau[tableauIndex], ...draggedSequence];
        return newTableau;
      });

      // Remove from source
      if (dragSource.type === 'waste') {
        setWaste(prev => prev.slice(0, -1));
      } else if (dragSource.type === 'tableau') {
        setTableau(prev => {
          const newTableau = [...prev];
          const startIndex = dragSource.start || newTableau[dragSource.index].length - 1;
          newTableau[dragSource.index] = newTableau[dragSource.index].slice(0, startIndex);
          // Flip top card if it exists and is face down
          const column = newTableau[dragSource.index];
          if (column.length > 0 && !column[column.length - 1].faceUp) {
            column[column.length - 1].faceUp = true;
          }
          return newTableau;
        });
      }
    }

    handleDragEnd();
  };

  // Check win condition
  useEffect(() => {
    const totalCardsInFoundations = foundations.reduce((sum, foundation) => sum + foundation.length, 0);
    if (totalCardsInFoundations === 52) {
      setGameStatus('won');
    }
  }, [foundations]);

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedCard(null);
    setDragSource(null);
    setDraggedSequence([]);
  };

  // Render card
  const renderCard = (card: Card, isClickable: boolean = false, onClick?: () => void, onDragStart?: () => void) => {
    const colorClass = getCardColor(card) === 'red' ? 'text-red-600' : 'text-black';
    
    return (
      <div
        key={card.id}
        className={`w-16 h-20 border border-[rgb(var(--win-border-dark))] rounded-sm flex flex-col items-center justify-center text-xs cursor-pointer transition-colors ${
          card.faceUp 
            ? `bg-white ${colorClass}` 
            : 'bg-blue-800 text-white'
        } ${isClickable ? 'hover:shadow-md' : ''}`}
        onClick={onClick}
        draggable={card.faceUp && isClickable}
        onDragStart={onDragStart}
        onDragEnd={handleDragEnd}
        data-testid={`card-${card.id}`}
      >
        {card.faceUp ? (
          <>
            <div className="font-bold">{card.rank}</div>
            <div>{getSuitEmoji(card.suit)}</div>
          </>
        ) : (
          <div>🂠</div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-green-800 p-4">
      {/* Header with controls */}
      <div className="flex items-center justify-between mb-4 p-2 border-2 border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))]">
        <div className="flex items-center gap-4">
          <button
            onClick={initializeGame}
            className="px-3 py-1 text-sm border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))]"
            data-testid="button-restart-solitaire"
          >
            {t('newGame') || 'New Game'}
          </button>
          
          {gameStatus === 'won' && (
            <div className="text-green-600 font-bold">
              {t('congratulations') || 'Congratulations! You won!'}
            </div>
          )}
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))]"
            data-testid="button-close-solitaire"
          >
            {t('close') || 'Close'}
          </button>
        )}
      </div>

      {/* Game area */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Top row: Stock, Waste, and Foundations */}
        <div className="flex justify-between">
          {/* Stock and Waste */}
          <div className="flex gap-2">
            {/* Stock */}
            <div
              className="w-16 h-20 border-2 border-[rgb(var(--win-border-dark))] rounded-sm bg-blue-900 flex items-center justify-center cursor-pointer hover:bg-blue-800"
              onClick={drawFromStock}
              data-testid="stock-pile"
            >
              {stock.length > 0 ? (
                <div className="text-white text-xs">🂠</div>
              ) : (
                <div className="text-white text-xs opacity-50">↻</div>
              )}
            </div>
            
            {/* Waste */}
            <div
              className="w-16 h-20 border-2 border-dashed border-gray-400 rounded-sm bg-green-700 flex items-center justify-center"
              data-testid="waste-pile"
            >
              {waste.length > 0 && renderCard(
                waste[waste.length - 1], 
                true, 
                () => {
                  const topCard = waste[waste.length - 1];
                  handleDragStart(topCard, { type: 'waste', index: 0 });
                },
                () => {
                  const topCard = waste[waste.length - 1];
                  handleDragStart(topCard, { type: 'waste', index: 0 });
                }
              )}
            </div>
          </div>

          {/* Foundations */}
          <div className="flex gap-2">
            {foundations.map((foundation, index) => (
              <div
                key={index}
                className="w-16 h-20 border-2 border-dashed border-gray-400 rounded-sm bg-green-700 flex items-center justify-center"
                onDrop={() => handleDropOnFoundation(index)}
                onDragOver={(e) => e.preventDefault()}
                data-testid={`foundation-${index}`}
              >
                {foundation.length > 0 && renderCard(foundation[foundation.length - 1])}
              </div>
            ))}
          </div>
        </div>

        {/* Tableau */}
        <div className="flex-1 flex gap-2">
          {tableau.map((column, colIndex) => (
            <div
              key={colIndex}
              className="flex-1 min-h-24 border-2 border-dashed border-gray-400 rounded-sm bg-green-700 p-1"
              onDrop={() => handleDropOnTableau(colIndex)}
              onDragOver={(e) => e.preventDefault()}
              data-testid={`tableau-${colIndex}`}
            >
              <div className="flex flex-col gap-1">
                {column.map((card, cardIndex) => (
                  <div 
                    key={card.id}
                    className="relative"
                    style={{ marginTop: cardIndex > 0 ? '-3rem' : '0' }}
                  >
                    {renderCard(
                      card, 
                      card.faceUp && cardIndex === column.length - 1, 
                      () => {
                        if (card.faceUp && cardIndex === column.length - 1) {
                          handleDragStart(card, { type: 'tableau', index: colIndex, start: cardIndex });
                        }
                      },
                      () => {
                        if (card.faceUp && cardIndex === column.length - 1) {
                          handleDragStart(card, { type: 'tableau', index: colIndex, start: cardIndex });
                        }
                      }
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 p-2 border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] text-xs">
        <div className="font-bold mb-1">{t('gameInstructions') || 'Instructions:'}</div>
        <div>• {t('solitaireInstructions1') || 'Click stock to draw cards'}</div>
        <div>• {t('solitaireInstructions2') || 'Drag cards to build sequences'}</div>
        <div>• {t('solitaireInstructions3') || 'Build foundations from Ace to King'}</div>
      </div>
    </div>
  );
}