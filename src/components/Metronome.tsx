import React, { useRef, useState } from 'react';

// Metronome: Adjustable BPM, audible click, visual flash
// JP: メトロノーム（BPM調整、音・視覚フラッシュ）

const Metronome: React.FC = () => {
  const [bpm, setBpm] = useState(90);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const start = () => {
    setIsPlaying(true);
    playClick();
    intervalRef.current = setInterval(playClick, (60 / bpm) * 1000);
  };

  const stop = () => {
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  React.useEffect(() => {
    if (isPlaying) {
      stop();
      start();
    }
    // クリーンアップ
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bpm]);

  return (
    <div className="bg-gray-900 rounded-lg p-2 flex flex-wrap gap-4 items-center justify-center">
      <label className="flex items-center gap-2">
        BPM
        <input type="range" min={40} max={200} value={bpm} onChange={e => setBpm(Number(e.target.value))} />
        <span className="font-mono">{bpm}</span>
      </label>
      <button className={`btn px-3 py-1 rounded ${isPlaying ? 'bg-red-600' : 'bg-green-600'} text-white`} onClick={isPlaying ? stop : start}>
        {isPlaying ? '停止' : '再生'}
      </button>
      <audio ref={audioRef} src="/click.mp3" preload="auto" />
    </div>
  );
};

export default Metronome;
