import React, { useRef, useState, useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

const DEFAULT_VIDEO_ID = 'ViTn0CkEvp0';

const YouTubePlayer: React.FC = () => {
  const [videoId, setVideoId] = useState<string>(DEFAULT_VIDEO_ID);
  const [inputId, setInputId] = useState<string>(DEFAULT_VIDEO_ID);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);
  const playerRef = useRef<any>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // プレイヤー準備完了時
  const onReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
    setDuration(event.target.getDuration());
    event.target.setVolume(volume);
  };

  // 再生状態変化時
  const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    const YT = window['YT'];
    if (!YT) return;
    if (event.data === YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      // 再生位置更新タイマー
      if (!intervalId) {
        const id = setInterval(() => {
          if (playerRef.current) {
            setCurrentTime(playerRef.current.getCurrentTime());
          }
        }, 500);
        setIntervalId(id);
      }
    } else {
      setIsPlaying(false);
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  };

  // 再生
  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
    }
  };
  // 一時停止
  const handlePause = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
    }
  };
  // シーク
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
      setCurrentTime(time);
    }
  };
  // 音量調整
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    setVolume(vol);
    if (playerRef.current) {
      playerRef.current.setVolume(vol);
    }
  };
  // 動画切替
  const handleChangeVideo = () => {
    setVideoId(inputId);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden flex flex-col items-center p-2">
      <YouTube
        videoId={videoId}
        opts={{
          width: '100%',
          height: '360',
          playerVars: { autoplay: 0, controls: 1, rel: 0 },
        }}
        onReady={onReady}
        onStateChange={onStateChange}
        className="w-full h-full"
      />
      <div className="flex flex-wrap gap-2 mt-2 justify-center items-center">
        <button className="btn bg-blue-600 text-white px-3 py-1 rounded" onClick={handlePlay} disabled={isPlaying}>再生</button>
        <button className="btn bg-gray-600 text-white px-3 py-1 rounded" onClick={handlePause} disabled={!isPlaying}>一時停止</button>
        <label className="flex items-center gap-1 text-sm">
          シーク
          <input type="range" min={0} max={duration} step={1} value={currentTime} onChange={handleSeek} className="w-40" />
          <span className="font-mono">{Math.floor(currentTime)} / {Math.floor(duration)} 秒</span>
        </label>
        <label className="flex items-center gap-1 text-sm">
          音量
          <input type="range" min={0} max={100} value={volume} onChange={handleVolume} className="w-24" />
          <span className="font-mono">{volume}</span>
        </label>
        <input
          type="text"
          value={inputId}
          onChange={e => setInputId(e.target.value)}
          className="border rounded px-2 py-1 w-40"
          placeholder="YouTube動画ID"
        />
        <button className="btn bg-green-600 text-white px-3 py-1 rounded" onClick={handleChangeVideo}>動画切替</button>
      </div>
      <div className="text-xs text-gray-400 text-center mt-1">
        現在の動画ID: <span className="font-mono">{videoId}</span>
      </div>
    </div>
  );
};

export default YouTubePlayer;
