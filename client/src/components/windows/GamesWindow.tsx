import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Minesweeper } from '../games/Minesweeper';
import { Solitaire } from '../games/Solitaire';
import { Snake } from '../games/Snake';
import { Tetris } from '../games/Tetris';

// Games components
interface Game {
  id: string;
  title: string;
  icon: string;
  description: string;
}

const getGames = (t: (key: string) => string): Game[] => [
  {
    id: 'minesweeper',
    title: t('minesweeperTitle'),
    icon: 'https://win98icons.alexmeub.com/icons/png/game_mine_1-0.png',
    description: t('minesweeperDescription')
  },
  {
    id: 'solitaire',
    title: t('solitaireTitle'),
    icon: 'https://win98icons.alexmeub.com/icons/png/game_freecell-2.png',
    description: t('solitaireDescription')
  },
  {
    id: 'snake',
    title: t('snakeTitle'),
    icon: 'https://i.top4top.io/p_3550a3j8j0.png',
    description: t('snakeDescription')
  },
  {
    id: 'tetris',
    title: t('tetrisTitle'),
    icon: 'https://j.top4top.io/p_3550fwgqz0.png',
    description: t('tetrisDescription')
  },
  {
    id: 'pong',
    title: t('pongTitle'),
    icon: 'https://l.top4top.io/p_355076e0u0.png',
    description: t('pongDescription')
  }
];

export function GamesWindow() {
  const { t } = useLanguage();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [currentView, setCurrentView] = useState<'grid' | 'list'>('grid');
  const [playingGame, setPlayingGame] = useState<string | null>(null);
  
  const games = getGames(t);

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
  };

  const handleGameLaunch = (gameId: string) => {
    setPlayingGame(gameId);
  };

  const handleGameClose = () => {
    setPlayingGame(null);
  };

  const toggleView = () => {
    setCurrentView(prev => prev === 'grid' ? 'list' : 'grid');
  };

  // Render game if one is being played
  if (playingGame) {
    const renderGame = () => {
      switch (playingGame) {
        case 'minesweeper':
          return <Minesweeper onClose={handleGameClose} />;
        case 'solitaire':
          return <Solitaire onClose={handleGameClose} />;
        case 'snake':
          return <Snake onClose={handleGameClose} />;
        case 'tetris':
          return <Tetris onClose={handleGameClose} />;
        case 'pong':
          // TODO: Implement Pong component
          return (
            <div className="h-full flex items-center justify-center bg-[rgb(var(--win-light-gray))]">
              <div className="text-center">
                <div className="text-lg mb-4">🏓</div>
                <div className="text-sm mb-4">{t('pongTitle') || 'Pong'}</div>
                <div className="text-xs mb-4">{t('comingSoon') || 'Coming Soon...'}</div>
                <button
                  onClick={handleGameClose}
                  className="px-3 py-1 text-xs border border-[rgb(var(--win-border-dark))] bg-[rgb(var(--win-button-face))] hover:bg-[rgb(var(--win-button-light))]"
                  data-testid="button-close-game"
                >
                  {t('close') || 'Close'}
                </button>
              </div>
            </div>
          );
        default:
          return null;
      }
    };

    return renderGame();
  }

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
                  {game.title}
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
                    {game.title}
                  </div>
                  <div className="text-xs text-[rgb(var(--win-text))] opacity-75">
                    {game.description}
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
            `${t('selectedGame') || 'Selected'}: ${selectedGame.title}`
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