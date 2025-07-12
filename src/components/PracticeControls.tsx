import React, { useState } from 'react';

// PracticeControls: Loop, tempo, transpose, hands-toggle, finger numbers
// JP: 練習用コントロール（ループ・テンポ・移調・手切替・指番号）

const PracticeControls: React.FC = () => {
  const [tempo, setTempo] = useState(90);
  const [loop, setLoop] = useState(false);
  const [transpose, setTranspose] = useState(0);
  const [hand, setHand] = useState<'both' | 'left' | 'right'>('both');
  const [showFingers, setShowFingers] = useState(true);

  return (
    <div className="bg-gray-900 rounded-lg p-2 flex flex-wrap gap-4 items-center justify-center">
      <label className="flex items-center gap-2">
        テンポ
        <input type="range" min={40} max={180} value={tempo} onChange={e => setTempo(Number(e.target.value))} />
        <span className="font-mono">{tempo} BPM</span>
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={loop} onChange={e => setLoop(e.target.checked)} /> ループ
      </label>
      <label className="flex items-center gap-2">
        トランスポーズ
        <input type="number" min={-12} max={12} value={transpose} onChange={e => setTranspose(Number(e.target.value))} className="w-12 text-center" />
        <span className="text-xs">半音</span>
      </label>
      <label className="flex items-center gap-2">
        <span>手の分離</span>
        <select value={hand} onChange={e => setHand(e.target.value as any)} className="rounded px-1">
          <option value="both">両手</option>
          <option value="left">左手のみ</option>
          <option value="right">右手のみ</option>
        </select>
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={showFingers} onChange={e => setShowFingers(e.target.checked)} /> 指番号表示
      </label>
    </div>
  );
};

export default PracticeControls;
