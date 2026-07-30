import React, { useState } from 'react';
import { Play, Pause, Volume2, RotateCcw } from 'lucide-react';

export default function AudioPlayer({ trackTitle, fileUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="bg-stone-950 border border-stone-800 p-4 rounded-xl flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button 
          onClick={togglePlay}
          className="w-10 h-10 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-full flex items-center justify-center transition"
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
        </button>
        <div>
          <p className="text-sm font-semibold text-stone-200">{trackTitle}</p>
          <p className="text-xs text-stone-500">{isPlaying ? 'Playing preview...' : 'Paused'}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-stone-400">
        <button className="hover:text-amber-400 transition">
          <RotateCcw className="w-4 h-4" />
        </button>
        <Volume2 className="w-4 h-4" />
      </div>
    </div>
  );
}