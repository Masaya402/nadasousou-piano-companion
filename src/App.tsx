import React from 'react';
import YouTubePlayer from './components/YouTubePlayer';
import SheetViewer from './components/SheetViewer';
import PianoKeyboard from './components/PianoKeyboard';
import PracticeControls from './components/PracticeControls';
import Metronome from './components/Metronome';
import StatsPanel from './components/StatsPanel';

// エラーバウンダリ
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: any}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    // ログ出力も可能
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <div style={{color: 'red', background: '#222', padding: 20}}>
        <h2>エラーが発生しました</h2>
        <pre>{String(this.state.error)}</pre>
      </div>;
    }
    return this.props.children;
  }
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold mb-2">
          NadaSousou Piano Companion｜涙そうそう ピアノ支援アプリ
        </h1>
        <div className="w-full max-w-4xl space-y-4">
          <YouTubePlayer />
          <SheetViewer />
          <PianoKeyboard />
          <PracticeControls />
          <Metronome />
          <StatsPanel />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
