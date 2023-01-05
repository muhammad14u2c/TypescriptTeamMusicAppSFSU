// 3rd party library imports
import * as Tone from 'tone';
import { List, Range } from 'immutable';
import React, {useEffect} from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

var sampler: Tone.Sampler;

interface KalimbaKeyProps {
  note: string;
  duration?: string;
  index: number;
  length: string;
  playNote: (x: string) => void;
}

export function KalimbaKey({
  note,
  playNote,
  index,
  length
}: KalimbaKeyProps): JSX.Element {
  return (
    <rect id={`tine${index}`} className="tine dim pointer" width={"6.919147"} height={length} rx={"4"} ry={"4"} transform={`matrix(1.03294 0 0 1 ${99.8 + (10 * index)} 72.188508)`} fill={`url(#tine${index})`} strokeWidth={"0"} strokeLinecap={"round"} strokeLinejoin={"round"}
      onClick={() => {
        console.log("Clicked " + note);
        playNote(note);
      }}
    />
  );
}

function Kalimba({ synth, setSynth }: InstrumentProps): JSX.Element {

  useEffect(() => {
    setSynth(oldSynth => oldSynth.disconnect());
    sampler = new Tone.Sampler({
      urls: {
        C6: "C6.wav"
      },
      baseUrl: "http://localhost:3000/kalimba/"
    }).toDestination();
    const reverb = new Tone.Reverb(1.5).toDestination();
    sampler.connect(reverb);

    let keyToNote: any = {
      a: 'C5',
      w: 'Db5',
      s: 'D5',
      e: 'Eb5',
      d: 'E5',
      f: 'F5',
      t: 'Gb5',
      g: 'G5',
      y: 'Ab5',
      h: 'A5',
      u: 'Bb5',
      j: 'B5',
      k: 'C6'
    }

    let allowPress = true;

    function detectKeyDownNote(e: KeyboardEvent) {
      if (e.repeat !== undefined) {
        allowPress = !e.repeat;
      }
      if (!allowPress) return;
      allowPress = false;
      
      if(e.key in keyToNote) { 
        console.log("key " + e.key + " down, played: " + keyToNote[e.key]);
        sampler?.triggerAttack(keyToNote[e.key]);
      }
    }
  
    function detectKeyUpNote(e: KeyboardEvent) {
      if(e.key in keyToNote) { 
        console.log(e.key);
        allowPress = true;
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
  }, [sampler]);

  let tines = List([
    { note: 'E5', length: 70 },
    { note: 'C5', length: 73.11 },
    { note: 'A4', length: 76.22 },
    { note: 'F4', length: 81.66 },
    { note: 'D4', length: 89.44 },
    { note: 'C4', length: 93.33 },
    { note: 'E4', length: 85.55 },
    { note: 'G4', length: 77.77 },
    { note: 'B4', length: 74.66},
    { note: 'D5', length: 71.55 }
  ]); 

  let playNote: (x:string) => void = (note: string) => {
    sampler?.triggerAttackRelease(note, '+0.05');
  }

  return (
    <div style={{height:'35em', width: '35em'}}>
      <svg id="morph-color-animations" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="30 0 300 300" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
        <KalimbaSVG/>
        <g id="tines" transform="matrix(1.656853 0 0 1.628572-96.161743-89.564211)">
          {tines.map((key, index) => {
            const note = `${key.note}`;
            const length = `${key.length}`
            return (
              <KalimbaKey
                key={note} //react key
                note={note}
                playNote={playNote}
                index={index}
                length={length}
              />
            );
            })
          }
        </g>
      </svg>
    </div>
  );
}

function KalimbaSVG(): JSX.Element {
  return (
    <>
    <defs>
	<radialGradient id="morph-color-animations-u-ellipse-fill" cx="0" cy="0" r="0.631699" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0.500094 0.514621)">
		<stop id="morph-color-animations-u-ellipse-fill-0" offset="57%" stopColor="#bf805c"/>
		<stop id="morph-color-animations-u-ellipse-fill-1" offset="100%" stopColor="#492e0d"/>
	</radialGradient>
	<radialGradient id="morph-color-animations-s-ellipse1-fill" cx="0" cy="0" r="0.5" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0.5 0.5)">
		<stop id="morph-color-animations-s-ellipse1-fill-0" offset="73%" stopColor="#2d2412"/>
		<stop id="morph-color-animations-s-ellipse1-fill-1" offset="100%" stopColor="#402406"/>
	</radialGradient>
	<linearGradient id="tine0" x1="0" y1="0.5" x2="1" y2="0.5" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0)">
		<stop id="tine0-0" offset="81%" stopColor="#d6dae3"/>
		<stop id="tine0-1" offset="100%" stopColor="#8c8c8c"/>
	</linearGradient>
	<linearGradient id="tine1" x1="0" y1="0.5" x2="1" y2="0.5" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0)">
		<stop id="tine1-0" offset="81%" stopColor="#d6dae3"/>
		<stop id="tine1-1" offset="100%" stopColor="#8c8c8c"/>
	</linearGradient>
	<linearGradient id="tine2" x1="0" y1="0.5" x2="1" y2="0.5" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0)">
		<stop id="tine2-0" offset="81%" stopColor="#d6dae3"/>
		<stop id="tine2-1" offset="100%" stopColor="#8c8c8c"/>
	</linearGradient>
	<linearGradient id="tine3" x1="0" y1="0.5" x2="1" y2="0.5" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0)">
		<stop id="tine3-0" offset="81%" stopColor="#d6dae3"/>
		<stop id="tine3-1" offset="100%" stopColor="#8c8c8c"/>
	</linearGradient>
	<linearGradient id="tine4" x1="0" y1="0.5" x2="1" y2="0.5" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0)">
		<stop id="tine4-0" offset="81%" stopColor="#d6dae3"/>
		<stop id="tine4-1" offset="100%" stopColor="#8c8c8c"/>
	</linearGradient>
	<linearGradient id="tine5" x1="0" y1="0.5" x2="1" y2="0.5" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0)">
		<stop id="tine5-0" offset="81%" stopColor="#d6dae3"/>
		<stop id="tine5-1" offset="100%" stopColor="#8c8c8c"/>
	</linearGradient>
	<linearGradient id="tine6" x1="0" y1="0.5" x2="1" y2="0.5" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0)">
		<stop id="tine6-0" offset="81%" stopColor="#d6dae3"/>
		<stop id="tine6-1" offset="100%" stopColor="#8c8c8c"/>
	</linearGradient>
	<linearGradient id="tine7" x1="0" y1="0.5" x2="1" y2="0.5" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0)">
		<stop id="tine7-0" offset="81%" stopColor="#d6dae3"/>
		<stop id="tine7-1" offset="100%" stopColor="#8c8c8c"/>
	</linearGradient>
	<linearGradient id="tine8" x1="0" y1="0.5" x2="1" y2="0.5" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0)">
		<stop id="tine8-0" offset="81%" stopColor="#d6dae3"/>
		<stop id="tine8-1" offset="100%" stopColor="#8c8c8c"/>
	</linearGradient>
	<linearGradient id="tine9" x1="0" y1="0.5" x2="1" y2="0.5" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0)">
		<stop id="tine9-0" offset="81%" stopColor="#d6dae3"/>
		<stop id="tine9-1" offset="100%" stopColor="#8c8c8c"/>
	</linearGradient>
</defs>
<path id="morph-color-animations-u-ellipse" d="M-103.988209,-0.656077C-105.300364,-80.697475,-83.649821,-104.768424,0,-104.378317s104.644287,19.088303,104.378317,104.378317-16.792033,103.332132-104.378317,104.378317-102.676055-19.74438-103.988209-105.034394Z" transform="matrix(1.14964 0 0 1.43686 149.80405 149.975194)" fill="url(#morph-color-animations-u-ellipse-fill)" strokeWidth="0"/>
<g id="morph-color-animations-s-g1" transform="matrix(.882075 0 0 0.882075 17.511251 52.570172)">
	<ellipse id="morph-color-animations-u-copy-of-ellipse" rx="60.028699" ry="60" transform="matrix(.829583 0 0 0.829592 150.201229 174.048779)" fill="none" stroke="#673708" strokeWidth="5"/>
	<ellipse id="morph-color-animations-u-copy-of-ellipse-2" rx="55.995258" ry="55.995037" transform="matrix(.759232 0 0 0.759235 150.226628 174.052548)" fill="none" stroke="#673708" strokeWidth="3"/>
	<ellipse id="morph-color-animations-s-ellipse1" rx="60.028699" ry="60" transform="matrix(.599174 0 0 0.599187 150.201238 174.04878)" fill="url(#morph-color-animations-s-ellipse1-fill)" strokeWidth="0"/>
</g>
<line id="morph-color-animations-s-line1" x1="-69.980841" y1="0" x2="69.980842" y2="0" transform="matrix(1.281763 0 0 1 147.466365 50)" fill="none" stroke="#bababa" strokeWidth="10" strokeLinecap="round"/>
    </>
  );
}

export const KalimbaInstrument = new Instrument('tabadines00', Kalimba);
