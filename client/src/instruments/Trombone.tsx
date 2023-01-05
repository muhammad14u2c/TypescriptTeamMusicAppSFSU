// 3rd party library imports
import * as Tone from 'tone';
import React, {useEffect, useState, useCallback } from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import pic from '../img/trombone.jpg';

var sampler: Tone.Sampler;
var shifter: Tone.PitchShift;
var ready = false;
var pitchBend = 0;
var turn = "";

function Trombone({ synth, setSynth }: InstrumentProps): JSX.Element {

  interface MousePosition {
    x: number;
    y: number;
  }

  const [mousePos, setMousePos] = useState<MousePosition>({x: 0, y: 0});
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setSynth(oldSynth => oldSynth.disconnect());
    sampler = new Tone.Sampler({
      urls: {
        C4: "C4.wav"
      },
      baseUrl: "http://localhost:3000/trombone/"
    });
    sampler.release = 0.1;
    shifter = new Tone.PitchShift(0).toDestination();
    sampler.connect(shifter);

    let keyToNote: any = {
      f: 'C4'
    }

    let allowPress = true;

    function detectKeyDownNote(e: KeyboardEvent) {
      if (e.repeat !== undefined) {
        allowPress = !e.repeat;
      }

      if (!allowPress) {
        return;
      }
      allowPress = false;
      setIsPlaying(true);
      sampler?.triggerAttack('C4');
    }
  
    function detectKeyUpNote(e: KeyboardEvent) {
      allowPress = true;
      setIsPlaying(false);
      sampler?.triggerRelease('C4', '+0.05');
    }

    ready = true;

    document.addEventListener('keydown', detectKeyDownNote, true);
    document.addEventListener('keyup', detectKeyUpNote, true);

    return function cleanup() {
      // Cleanup by disconnecting and disposing the sampler and remove the event listener
      console.log("Disconnecting and Disposing of sampler!");
      sampler.disconnect();
      sampler.dispose();
      document.removeEventListener('keydown', detectKeyDownNote, true);
      document.removeEventListener('keyup', detectKeyUpNote, true);
    };
  }, []);

  const playTrombone = useCallback(
    (event: MouseEvent) => {
      const newMousePosition = event;
      
      // Depending on the mouse position, set the pitch accordingly
      if (mousePos && newMousePosition) {
          pitchBend = -1 * (((newMousePosition.y / window.innerHeight) - 0.5) * 24) - 3;
          shifter.pitch = pitchBend;
          setMousePos(newMousePosition);
      }
      rotateTrombone();
    },
    [isPlaying, mousePos]
);

  const startPlay = useCallback((e: MouseEvent) => {
    const coordinates = (e);
    // Triggers the sampler while also saving the coordinates of the mouse
    if (coordinates) {
        setIsPlaying(true);
        setMousePos(coordinates);
        sampler?.triggerAttack("C4");
    }
  }, []);

  function rotateTrombone() {
    // This function rotates the trombone image to look at the mouse
    var centerY = window.innerHeight* 0.4,
    centerX = window.innerWidth * 0.65,
    radians = Math.atan2(mousePos.x - centerX, mousePos.y - centerY),
    degrees = (radians * (180 / Math.PI) * -1) - 90; 
    turn = 'rotate(' + degrees + 'deg)';
  }


  // The following hooks handle the mouse events that trigger changes in the state
  useEffect(() => {
    document.addEventListener('mousedown', startPlay);
    return () => {
        document.removeEventListener('mousedown', startPlay);
    };
  }, [startPlay]);

  useEffect(() => {

    window.addEventListener('mousemove', playTrombone);

    return () => {
      window.removeEventListener('mousemove', playTrombone);
    };
  }, [playTrombone]);

  const stopPlay = useCallback(() => {
    sampler?.triggerRelease('C4', '+0.05');
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mouseup', stopPlay);
    document.addEventListener('mouseleave', stopPlay);

    return () => {
        document.removeEventListener('mouseup', stopPlay);
        document.removeEventListener('mouseleave', stopPlay);
    };
}, [stopPlay]);

  // The trombone image and the debug text
  return (
    <div unselectable={"on"} style={{height:'100vh', width: '100vw'}}>
      <p unselectable={"on"} style={{userSelect: "none"}}>Click and Drag to affect the pitch! (Mouse Y: {mousePos.y} Pitchbend: {pitchBend})</p>
      <img style={{userSelect: "none", height:'20em', width: '40em', transform: turn, position: "absolute", top: "10%", left: "50%"}} unselectable={"on"} src={pic} />
    </div>
  );
}

export const TromboneInstrument = new Instrument('tabadines00', Trombone);