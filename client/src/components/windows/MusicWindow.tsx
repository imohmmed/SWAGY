import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

const playlist = [
  // Kanye West Collection
  { 
    id: '1', 
    title: 'Slow Jamz', 
    artist: 'Twista, Kanye West', 
    duration: '4:12',
    url: 'https://f.top4top.io/m_3438zsj1g0.m4a',
    collection: 'Kanye West'
  },
  { 
    id: '2', 
    title: 'The Joy', 
    artist: 'JAY-Z, Kanye West', 
    duration: '5:21',
    url: 'https://g.top4top.io/m_3438eai9m1.m4a',
    collection: 'Kanye West'
  },
  { 
    id: '3', 
    title: 'No Bad News', 
    artist: 'Cordae, Kanye West', 
    duration: '3:45',
    url: 'https://h.top4top.io/m_3438sswmk2.m4a',
    collection: 'Kanye West'
  },
  { 
    id: '4', 
    title: 'Roses', 
    artist: 'Kanye West', 
    duration: '4:05',
    url: 'https://i.top4top.io/m_343848wj93.m4a',
    collection: 'Kanye West'
  },
  { 
    id: '5', 
    title: 'The Bad, The Good, The Ugly', 
    artist: 'Consequence, Kanye West', 
    duration: '4:33',
    url: 'https://j.top4top.io/m_3438sxw3v4.m4a',
    collection: 'Kanye West'
  },
  // J. Cole Collection
  { 
    id: '6', 
    title: 'World Is Empty', 
    artist: 'J. Cole', 
    duration: '3:22',
    url: 'https://g.top4top.io/m_3438aytkv0.m4a',
    collection: 'J. Cole'
  },
  { 
    id: '7', 
    title: 'Change', 
    artist: 'J. Cole', 
    duration: '4:15',
    url: 'https://h.top4top.io/m_3438lqiq71.m4a',
    collection: 'J. Cole'
  },
  { 
    id: '8', 
    title: '4 Your Eyez Only', 
    artist: 'J. Cole', 
    duration: '8:49',
    url: 'https://i.top4top.io/m_3438ieo7e2.m4a',
    collection: 'J. Cole'
  },
  { 
    id: '9', 
    title: 'Welcome', 
    artist: 'J. Cole', 
    duration: '3:27',
    url: 'https://j.top4top.io/m_3438iuf0c3.m4a',
    collection: 'J. Cole'
  }
];

export function MusicWindow() {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => nextTrack();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(false);
  };

  const prevTrack = () => {
    const prevIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(false);
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 h-full">
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src={currentTrack.url}
        preload="metadata"
      />
      
      {/* Player Interface */}
      <div
        className="p-4 rounded mb-4 text-green-400"
        style={{ background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)' }}
      >
        <div className="text-center mb-4">
          <div className="text-lg font-bold">🎵 SWAGY PLAYER</div>
          <div className="text-xs">SWAGY_playlist.m3u</div>
        </div>
        
        <div className="bg-gray-800 p-2 rounded mb-4">
          <div className="text-xs mb-1">{t('nowPlaying')}:</div>
          <div className="font-bold">{currentTrack.title}</div>
          <div className="text-xs text-gray-400">{currentTrack.artist}</div>
          <div className="text-xs text-green-400">{currentTrack.collection} Collection</div>
        </div>
        
        {/* Controls */}
        <div className="flex justify-center gap-4 mb-4">
          <button className="win-button px-3 py-1" onClick={prevTrack}>⏮️</button>
          <button className="win-button px-3 py-1" onClick={togglePlay}>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button className="win-button px-3 py-1" onClick={nextTrack}>⏭️</button>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <div className="flex-1 bg-gray-600 h-1 rounded">
            <div 
              className="bg-green-400 h-1 rounded" 
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
          </div>
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
      </div>
      
      {/* Collections */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-[rgb(var(--win-button-face))] border-2 border-[rgb(var(--win-border-dark))] p-2 text-center">
          <div className="font-bold text-xs">Kanye West</div>
          <div className="text-xs">{playlist.filter(t => t.collection === 'Kanye West').length} tracks</div>
        </div>
        <div className="bg-[rgb(var(--win-button-face))] border-2 border-[rgb(var(--win-border-dark))] p-2 text-center">
          <div className="font-bold text-xs">J. Cole</div>
          <div className="text-xs">{playlist.filter(t => t.collection === 'J. Cole').length} tracks</div>
        </div>
      </div>
      
      {/* Playlist */}
      <div className="bg-white border-2 border-[rgb(var(--win-border-dark))] p-3 h-32 overflow-auto scrollbar">
        <div className="text-xs font-bold mb-2">{t('playlist')}:</div>
        <div className="space-y-1 text-xs">
          {playlist.map((track, index) => (
            <div
              key={track.id}
              className={`p-1 hover:bg-blue-600 hover:text-white cursor-pointer ${
                index === currentTrackIndex ? 'bg-blue-600 text-white' : ''
              }`}
              onClick={() => selectTrack(index)}
            >
              {String(index + 1).padStart(2, '0')}. {track.title} - {track.artist} {index === currentTrackIndex && isPlaying ? '▶️' : ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
