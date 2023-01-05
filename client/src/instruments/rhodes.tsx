// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, {useEffect, useRef} from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

var sampler: Tone.Sampler;

interface RhodesKeyProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  sampler?: Tone.Sampler; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

export function RhodesKey({
  note,
  sampler,
  minor,
  index,
}: RhodesKeyProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `PianoKeyWithoutJSX` for the React component without JSX.
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.

    <div
      onMouseDown={() => sampler?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
      onMouseUp={() => sampler?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className={classNames('ba pointer absolute dim', {
        // 'bg-black black h3': minor, // minor keys are black
        'bg-black white h3': minor, // minor keys are black
        'black bg-white h4': !minor, // major keys are white
      })}
      style={{
        // CSS
        top: 0,
        left: `${index * 2}rem`,
        zIndex: minor ? 1 : 0,
        width: minor ? '1.5rem' : '2rem',
        marginLeft: minor ? '0.25rem' : 0,
      }}
    ></div>
  );
}

// eslint-disable-next-line
function RhodesKeyWithoutJSX({
  note,
  sampler,
  minor,
  index,
}: RhodesKeyProps): JSX.Element {
  /**
   * This React component for pedagogical purposes.
   * See `PianoKey` for the React component with JSX (JavaScript XML).
   */
  return React.createElement(
    'div',
    {
      onMouseDown: () => sampler?.triggerAttack(`${note}`),
      onMouseUp: () => sampler?.triggerRelease('+0.25'),
      className: classNames('ba pointer absolute dim', {
        'bg-black black h3': minor,
        'black bg-white h4': !minor,
      }),
      style: {
        top: 0,
        left: `${index * 2}rem`,
        zIndex: minor ? 1 : 0,
        width: minor ? '1.5rem' : '2rem',
        marginLeft: minor ? '0.25rem' : 0,
      },
    },
    [],
  );
}

function Rhodes({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'C', idx: 0 },
    { note: 'Db', idx: 0.5 },
    { note: 'D', idx: 1 },
    { note: 'Eb', idx: 1.5 },
    { note: 'E', idx: 2 },
    { note: 'F', idx: 3 },
    { note: 'Gb', idx: 3.5 },
    { note: 'G', idx: 4 },
    { note: 'Ab', idx: 4.5 },
    { note: 'A', idx: 5 },
    { note: 'Bb', idx: 5.5 },
    { note: 'B', idx: 6 },
  ]); 

  

  useEffect(() => {
    setSynth(oldSynth => oldSynth.disconnect());
    sampler = new Tone.Sampler({
      urls: {
        A1: "A1.mp3",
        A2: "A2.mp3",
      },
      baseUrl: "https://tonejs.github.io/audio/casio/"
    }).toDestination();
  }, [sampler]);

  useEffect(() => {

    let keyToNote: any = {
      a: 'C2',
      w: 'Db2',
      s: 'D2',
      e: 'Eb2',
      d: 'E2',
      f: 'F2',
      t: 'Gb2',
      g: 'G2',
      y: 'Ab2',
      h: 'A2',
      u: 'Bb2',
      j: 'B2',
      k: 'C3'
    }

    let allowed = true;

    function detectKeyDownNote(e: KeyboardEvent) {
      if (e.repeat !== undefined) {
        allowed = !e.repeat;
      }
      if (!allowed) return;
      allowed = false;
      
      if(e.key in keyToNote) { 
        console.log("key " + e.key + " down, played: " + keyToNote[e.key]);
        sampler?.triggerAttack(keyToNote[e.key]);
      }
    }
  
    function detectKeyUpNote(e: KeyboardEvent) {
      if(e.key in keyToNote) { 
        console.log(e.key);
        allowed = true;
        sampler?.triggerRelease('+0.05');
      }
    }

    document.addEventListener('keydown', detectKeyDownNote, true);
    document.addEventListener('keyup', detectKeyUpNote, true);

    return function cleanup() {
      console.log("Disconnecting and Disposing of sampler!");
      sampler.disconnect();
      sampler.dispose();
      document.removeEventListener('keydown', detectKeyDownNote, true);
      document.removeEventListener('keyup', detectKeyUpNote, true);
    };
  }, []);

  return (
    <div className="pv4"
      //onKeyDown={(e) => synth?.triggerAttack(`${noteCheck(e.key)}`)} // Question: what is `onMouseDown`?
      //onKeyUp={(e) => synth?.triggerRelease('+0.25')}
      >
      <div className="relative dib h4 w-100 ml4">
        {Range(4, 6).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave}`;
            return (
              <RhodesKey
                key={note} //react key
                note={note}
                sampler={sampler}
                minor={isMinor}
                octave={octave}
                index={(octave - 2) * 7 + key.idx}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}

export const RhodesInstrument = new Instrument('Rhodes', Rhodes);
