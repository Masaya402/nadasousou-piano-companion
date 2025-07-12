import React from 'react';

// PianoKeyboard: SVG 88-key piano, highlights notes in real-time
// JP: 88鍵ピアノキーボード（SVG、ハイライト付き）

import React from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';

const firstNote = MidiNumbers.fromNote('A0');
const lastNote = MidiNumbers.fromNote('C8');
const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: firstNote,
  lastNote: lastNote,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
});

const PianoKeyboard: React.FC = () => {
  return (
    <div className="w-full bg-black flex items-end justify-center p-2 rounded-t-lg">
      <div className="w-full max-w-4xl">
        <Piano
          noteRange={{ first: firstNote, last: lastNote }}
          playNote={() => {}}
          stopNote={() => {}}
          width={900}
          keyboardShortcuts={keyboardShortcuts}
          disabled
        />
      </div>
      {/* TODO: ハイライトやMIDI連携もここに追加可能 */}
    </div>
  );
};

export default PianoKeyboard;
