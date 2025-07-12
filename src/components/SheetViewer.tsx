import React from 'react';

// SheetViewer: Renders scrolling sheet music from MusicXML
// JP: 楽譜ビューア（MusicXML対応、スクロール同期）

import React, { useEffect, useRef, useState } from 'react';

const DEMO_XML_PATH = '/demo/nadasousou.musicxml';

const SheetViewer: React.FC = () => {
  const [xml, setXml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  // MusicXMLファイルを読み込む
  useEffect(() => {
    fetch(DEMO_XML_PATH)
      .then(res => res.text())
      .then(setXml)
      .catch(() => setError('楽譜ファイルの読み込みに失敗しました'));
  }, []);

  // 今はSVGを仮表示、将来的にVexFlow等でパースして表示拡張
  return (
    <div className="bg-gray-900 rounded-lg p-2 min-h-[220px] text-center text-gray-100">
      <div className="font-bold mb-1">楽譜ビューア（MusicXMLデモ）</div>
      {error && <div className="text-red-400">{error}</div>}
      {!error && !xml && <span>楽譜を読み込み中...</span>}
      {!error && xml && (
        <div ref={svgRef} className="overflow-x-auto max-w-full">
          <pre className="text-xs text-left whitespace-pre-wrap bg-gray-800 rounded p-2 max-h-64 overflow-y-auto">
            {xml.slice(0, 2000)}
          </pre>
          {/* TODO: ここにVexFlowなどでSVG楽譜を生成して表示する処理を追加 */}
        </div>
      )}
    </div>
  );
};

export default SheetViewer;
