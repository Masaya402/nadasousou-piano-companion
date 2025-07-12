import React from 'react';
import YouTubePlayer from './components/YouTubePlayer';
import SheetViewer from './components/SheetViewer';
import PianoKeyboard from './components/PianoKeyboard';
import PracticeControls from './components/PracticeControls';
import Metronome from './components/Metronome';
import StatsPanel from './components/StatsPanel';

// App: Main layout and component integration
// JP: アプリ全体のレイアウトとコンポーネント統合
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-2">
        NadaSousou Piano Companion｜涙そうそう ピアノ支援アプリ
      </h1>
      <div className="w-full max-w-4xl space-y-4">
        <YouTubePlayer />
      </div>
    </div>
  );
};

export default App;
