import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2, ListMusic, X, Music, Radio, Wind, User as UserIcon } from 'lucide-react';
import { AudioTrack, initialPlaylist } from '../data/audio';
import { cn } from '../lib/utils';

interface AudioPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

type AudioCategory = 'all' | 'frequency' | 'binaural' | 'meditation' | 'user';

export function AudioPlayer({ isOpen, onClose }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<AudioCategory>('all');
  const audioRef = useRef<HTMLAudioElement>(null);

  const filteredPlaylist = activeCategory === 'all' 
    ? initialPlaylist 
    : initialPlaylist.filter(t => t.category === activeCategory);

  const track = filteredPlaylist[currentTrackIndex] || initialPlaylist[0];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex, activeCategory]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % filteredPlaylist.length);
    setIsPlaying(true);
  };
  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + filteredPlaylist.length) % filteredPlaylist.length);
    setIsPlaying(true);
  };

  const categories: { id: AudioCategory; name: string; icon: any }[] = [
    { id: 'all', name: 'הכל', icon: ListMusic },
    { id: 'frequency', name: 'תדרים', icon: Radio },
    { id: 'binaural', name: 'ביטים', icon: Music },
    { id: 'meditation', name: 'מדיטציה', icon: Wind },
    { id: 'user', name: 'שלי', icon: UserIcon },
  ];

  return (
    <>
      {/* Player Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 h-full w-80 bg-zinc-900 border-r border-zinc-800 z-50 transition-transform duration-300 flex flex-col shadow-2xl",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-emerald-400" />
            <h2 className="font-bold text-zinc-100">ספריית צלילים</h2>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1 hover:bg-white/5 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto p-2 gap-1 border-b border-zinc-800 no-scrollbar bg-zinc-900/50">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setCurrentTrackIndex(0); }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
                activeCategory === cat.id 
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent"
              )}
            >
              <cat.icon className="w-3.5 h-3.5" />
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredPlaylist.length === 0 ? (
            <div className="text-center text-zinc-500 mt-10 p-6 border border-dashed border-zinc-800 rounded-2xl">
              <Music className="w-8 h-8 mx-auto mb-3 opacity-20" />
              <p className="text-sm">לא נמצאו קבצים בקטגוריה זו.</p>
            </div>
          ) : (
            filteredPlaylist.map((t, index) => (
              <button
                key={t.id}
                onClick={() => { setCurrentTrackIndex(index); setIsPlaying(true); }}
                className={cn(
                  "w-full text-right p-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                  currentTrackIndex === index 
                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
                    : "hover:bg-white/5 text-zinc-400 border border-transparent"
                )}
              >
                {currentTrackIndex === index && (
                  <motion.div 
                    layoutId="active-track"
                    className="absolute inset-0 bg-emerald-500/5"
                  />
                )}
                <div className="relative z-10">
                  <div className="font-medium truncate">{t.title}</div>
                  <div className="text-[10px] opacity-50 uppercase tracking-wider mt-1">{t.artist}</div>
                </div>
              </button>
            ))
          )}
        </div>
        
        {/* Controls */}
        {track && (
          <div className="p-6 bg-zinc-950 border-t border-zinc-800 shadow-[0_-10px_20px_rgba(0,0,0,0.3)]">
            <div className="mb-4">
              <div className="text-xs text-emerald-500 font-mono mb-1 uppercase tracking-widest">Now Playing</div>
              <div className="text-sm font-bold text-zinc-100 truncate">{track.title}</div>
              <div className="text-[10px] text-zinc-500 truncate">{track.artist}</div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <button 
                onClick={prevTrack}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <SkipBack className="w-6 h-6" />
              </button>
              
              <button 
                onClick={togglePlay} 
                className="bg-emerald-500 hover:bg-emerald-400 p-4 rounded-full text-black shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
              </button>
              
              <button 
                onClick={nextTrack}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <SkipForward className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Bar (Visual Only) */}
            <div className="mt-6 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-emerald-500"
                animate={{ width: isPlaying ? "100%" : "30%" }}
                transition={{ duration: 180, ease: "linear" }}
              />
            </div>
          </div>
        )}
      </div>

      {track && <audio ref={audioRef} src={track.url} onEnded={nextTrack} />}
    </>
  );
}
