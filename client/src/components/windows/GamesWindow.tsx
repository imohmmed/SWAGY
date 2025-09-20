import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

// Games components (will be implemented next)
interface Game {
  id: string;
  title: string;
  icon: string;
  description: string;
}

const games: Game[] = [
  {
    id: 'minesweeper',
    title: 'Minesweeper',
    icon: 'https://win98icons.alexmeub.com/icons/png/game_mine_1-0.png',
    description: 'Find all the hidden mines without clicking on them. Numbers indicate nearby mines.'
  },
  {
    id: 'solitaire',
    title: 'Solitaire',
    icon: 'https://win98icons.alexmeub.com/icons/png/game_freecell-2.png',
    description: 'Classic card game. Arrange all cards by suit from A to K.'
  },
  {
    id: 'snake',
    title: 'Snake',
    icon: 'https://i.top4top.io/p_3550a3j8j0.png',
    description: 'Control the snake to eat food and grow longer. Don\'t hit the walls or yourself!'
  },
  {
    id: 'tetris',
    title: 'Tetris',
    icon: 'https://j.top4top.io/p_3550fwgqz0.png',
    description: 'Arrange falling blocks to complete lines and score points.'
  },
  {
    id: 'pong',
    title: 'Pong',
    icon: 'https://l.top4top.io/p_355076e0u0.png',
    description: 'Classic arcade game. Hit the ball with your paddle and score points.'
  }
];

export function GamesWindow() {
  const { t } = useLanguage();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [currentView, setCurrentView] = useState<'grid' | 'list'>('grid');

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
  };

  const handleGameLaunch = (gameId: string) => {
    // This will launch the specific game component
    console.log(`Launching game: ${gameId}`);
    // TODO: Open game in new window or navigate to game component
  };

  const toggleView = () => {
    setCurrentView(prev => prev === 'grid' ? 'list' : 'grid');
  };

  return (
    <div className="h-full flex flex-col bg-[rgb(var(--win-light-gray))]">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-1 border-b border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))]">
        <button
          onClick={toggleView}
          className="px-2 py-1 text-xs border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))] active:border-[rgb(var(--win-border-light))]"
          data-testid="button-toggle-view"
        >
          <img 
            src={currentView === 'grid' ? 'https://win98icons.alexmeub.com/icons/png/view_list-0.png' : 'https://win98icons.alexmeub.com/icons/png/view_thumbnail-0.png'} 
            alt={currentView} 
            className="w-4 h-4" 
            draggable={false}
          />
        </button>
        <div className="text-xs text-[rgb(var(--win-text))]">
          {games.length} {t('gamesAvailable') || 'games available'}
        </div>
      </div>

      {/* Games Display */}
      <div className="flex-1 p-4 overflow-auto">
        {currentView === 'grid' ? (
          <div className="grid grid-cols-3 gap-4">
            {games.map((game) => (
              <div
                key={game.id}
                className={`flex flex-col items-center p-3 cursor-pointer rounded border-2 transition-colors ${
                  selectedGame?.id === game.id
                    ? 'border-[rgb(var(--win-highlight))] bg-[rgb(var(--win-highlight-light))]'
                    : 'border-transparent hover:border-[rgb(var(--win-border-dark))] hover:bg-[rgb(var(--win-button-light))]'
                }`}
                onClick={() => handleGameSelect(game)}
                onDoubleClick={() => handleGameLaunch(game.id)}
                data-testid={`game-grid-${game.id}`}
              >
                <img
                  src={game.icon}
                  alt={game.title}
                  className="w-8 h-8 mb-2"
                  draggable={false}
                />
                <span className="text-xs text-center text-[rgb(var(--win-text))] font-bold">
                  {t(game.id + 'Title') || game.title}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {games.map((game) => (
              <div
                key={game.id}
                className={`flex items-center gap-3 p-2 cursor-pointer transition-colors ${
                  selectedGame?.id === game.id
                    ? 'bg-[rgb(var(--win-highlight))] text-[rgb(var(--win-highlight-text))]'
                    : 'hover:bg-[rgb(var(--win-button-light))]'
                }`}
                onClick={() => handleGameSelect(game)}
                onDoubleClick={() => handleGameLaunch(game.id)}
                data-testid={`game-list-${game.id}`}
              >
                <img
                  src={game.icon}
                  alt={game.title}
                  className="w-6 h-6"
                  draggable={false}
                />
                <div className="flex-1">
                  <div className="text-sm font-bold text-[rgb(var(--win-text))]">
                    {t(game.id + 'Title') || game.title}
                  </div>
                  <div className="text-xs text-[rgb(var(--win-text))] opacity-75">
                    {t(game.id + 'Description') || game.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between p-1 border-t border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] text-xs text-[rgb(var(--win-text))]">
        <div>
          {selectedGame ? (
            `${t('selectedGame') || 'Selected'}: ${t(selectedGame.id + 'Title') || selectedGame.title}`
          ) : (
            t('selectGameToPlay') || 'Select a game to play'
          )}
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-light-gray))]"></div>
          <span>{t('ready') || 'Ready'}</span>
        </div>
      </div>
    </div>
  );
}