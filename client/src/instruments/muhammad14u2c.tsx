
import * as Tone from "tone";
import React, { useState } from "react";
import { List } from "immutable";
import drum from "../img/drum.png";

/////muhammad14u2c////////

import { Instrument, InstrumentProps } from "../Instruments";

const Drum = ({  }: InstrumentProps): JSX.Element => {

  const PUBLIC_URL = process.env.PUBLIC_URL;

  const [sampler] = useState(

    new Tone.Sampler({
      
      urls: {
        A4: `${PUBLIC_URL}/audio/kick.wav`, A5: `${PUBLIC_URL}/audio/kick2.WAV`,
        A6: `${PUBLIC_URL}/audio/kick3.wav`,A7: `${PUBLIC_URL}/audio/kcik4.wav`, A8: `${PUBLIC_URL}/audio/kick5.wav`,

        B4: `${PUBLIC_URL}/audio/hat.WAV`, B5: `${PUBLIC_URL}/audio/hat2.wav`,B6: `${PUBLIC_URL}/audio/hat3.wav`,
        B7: `${PUBLIC_URL}/audio/hat4.wav`,B8: `${PUBLIC_URL}/audio/hat5.wav`,

        C4: `${PUBLIC_URL}/audio/clap.wav`, C5: `${PUBLIC_URL}/audio/clap2.WAV`,C6: `${PUBLIC_URL}/audio/clap3.wav`,
        C7: `${PUBLIC_URL}/audio/clap4.wav`, C8: `${PUBLIC_URL}/audio/clap5.wav`,

        D4: `${PUBLIC_URL}/audio/voice.wav`, D5: `${PUBLIC_URL}/audio/voice5.WAV`,
        D6: `${PUBLIC_URL}/audio/voice4.wav`, D7: `${PUBLIC_URL}/audio/voice3.wav`, D8: `${PUBLIC_URL}/audio/voice6.wav`,

        F4: `${PUBLIC_URL}/audio/sound1.wav`,F5: `${PUBLIC_URL}/audio/sound0.WAV`,
        F6: `${PUBLIC_URL}/audio/sound2.wav`, F7: `${PUBLIC_URL}/audio/sound3.wav`,F8: `${PUBLIC_URL}/audio/sound4.wav`,
      },
      // onload: () => {
      // sampler.triggerAttackRelease(["A4", "A5", "A6", "A7", "A8"], 2.2);
      // }
    }).toDestination()
  );
  ////KICKS////////
  const sounds = List([
    {
      id: 1, note: "A4", coords: "40,42,88,92",
    },
    {
      id: 2, note: "A5", coords: "173,43,228,94",
    },
    {
      id: 3, note: "A6", coords: "107,43,158,95",
    },
    {
      id: 4, note: "A7", coords: "241,43,295,95",
    },
    {
      id: 5, note: "A8", coords: "310,44,364,95",
    },

    ////Hi-HATS////////

    /////////////////////{
    {
      id: 6, note: "B4", coords: "36,111,89,162",
    },
    {
      id: 7, note: "B5", coords: "106,112,159,164",
    },
    {
      id: 8, note: "B6", coords: "174,112,227,162",
    },
    {
      id: 9, note: "B7", coords: "242,111,295,162",
    },
    {
      id: 10, note: "B8", coords: "309,110,362,164",
    },
    ///CLAPS////////
    {
      id: 11, note: "C4", coords: "36,178,91,231",
    },
    {
      id: 12, note: "C5", coords: "106,178,159,231",
    },
    {
      id: 13, note: "C6", coords: "176,178,229,231",
    },
    {
      id: 14, note: "C7", coords: "246,178,299,231",
    },
    {
      id: 15, note: "C8", coords: "316,178,369,231",
    },

    ///////////VOICES///////////////
    {
      id: 16, note: "D4", coords: "36,248,91,301",
    },
    {
      id: 17, note: "D5", coords: "106,248,159,301",
    },
    {
      id: 18, note: "D6", coords: "176,248,229,301",
    },
    {
      id: 19, note: "D7", coords: "246,248,299,301",
    },
    {
      id: 20, note: "D8", coords: "317,248,369,301",
    },

    ///////////SOUNDS///////////////
    {
      id: 21, note: "F4",coords: "36,318,91,371",
    },
    {
      id: 22,note: "F5",coords: "106,318,159,371",
    },
    {
      id: 23,note: "F6",coords: "176,318,229,371",
    },
    {
      id: 24,note: "F7",coords: "246,318,299,371",
    },
    {
      id: 25,note: "F8",coords: "317,318,369,371",
    },
  ]);



  
  const onClickHandler = (event: any) => {
    
    newFunction();

    function newFunction(): void {
      sampler.triggerAttackRelease(event.target.getAttribute("music-note"), "3.5n");
    }
  };
  return (
    <div>
      <img src={drum} useMap="#Drum" width="399" height="419" />
      <map id="Drum" name="Drum">
        {sounds.map(function (key) {
          return (
            <area
              music-note={key.note}

              coords={key.coords}

              shape="rect"

              onClick={onClickHandler} />
          );
        })}
      </map>
      

      
    </div>
  );
};

export const DrumInstrument = new Instrument("muhammad14u2c-Drum", Drum);

///////////////////////////////////BREAK////////////////////////////////////
