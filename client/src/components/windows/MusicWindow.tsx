import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

const playlist = [
  { id: '1', title: 'Midnight Study Session', artist: 'Lo-Fi Collective', duration: '3:45' },
  { id: '2', title: 'Lo-Fi Hip Hop Mix', artist: 'Chill Beats Collection', duration: '4:20', isPlaying: true },
  { id: '3', title: 'Chill Coding Beats', artist: 'Developer Sounds', duration: '5:12' },
  { id: '4', title: 'Retro Synth Wave', artist: 'Synthwave Masters', duration: '3:56' },
  { id: '5', title: 'Oud & Electronics', artist: 'Middle Eastern Fusion', duration: '4:33' },
  { id: '6', title: 'Focus Deep Work', artist: 'Concentration Sounds', duration: '6:15' }
];

export function MusicWindow() {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(playlist[1]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="p-4 h-full">
      {/* Player Interface */}
      <div
        className="p-4 rounded mb-4 text-green-400"
        style={{ background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)' }}
      >
        <div className="text-center mb-4">
          <div className="text-lg font-bold">🎵 SWAGY PLAYER</div>
          <div className="text-xs">weedy_playlist.m3u</div>
        </div>
        
        <div className="bg-gray-800 p-2 rounded mb-4">
          <div className="text-xs mb-1">{t('nowPlaying')}:</div>
          <div className="font-bold">{currentTrack.title}</div>
          <div className="text-xs text-gray-400">{currentTrack.artist}</div>
        </div>
        
        {/* Controls */}
        <div className="flex justify-center gap-4 mb-4">
          <button className="win-button px-3 py-1">⏮️</button>
          <button className="win-button px-3 py-1" onClick={togglePlay}>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button className="win-button px-3 py-1">⏭️</button>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs">00:00</span>
          <div className="flex-1 bg-gray-600 h-1 rounded">
            <div className="bg-green-400 h-1 rounded w-1/3"></div>
          </div>
          <span className="text-xs">03:45</span>
        </div>
      </div>
      
      {/* Playlist */}
      <div className="bg-white border-2 border-[rgb(var(--win-border-dark))] p-3 h-40 overflow-auto scrollbar">
        <div className="text-xs font-bold mb-2">{t('playlist')}:</div>
        <div className="space-y-1 text-xs">
          {playlist.map((track, index) => (
            <div
              key={track.id}
              className={`p-1 hover:bg-blue-600 hover:text-white cursor-pointer ${
                track.isPlaying ? 'bg-blue-600 text-white' : ''
              }`}
              onClick={() => setCurrentTrack(track)}
            >
              {String(index + 1).padStart(2, '0')}. {track.title} {track.isPlaying ? '▶️' : ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
