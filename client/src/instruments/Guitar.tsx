// 3rd party library imports
import * as Tone from "tone";
import classNames from "classnames";
import { List, Range } from "immutable";
import guitarimg from "../img/guitar.png";
import React, { useState } from "react";
// project imports
import { Instrument, InstrumentProps } from "../Instruments";

function Guitar({ synth, setSynth }: InstrumentProps): JSX.Element {
  const PUBLIC_URL = process.env.PUBLIC_URL;

  const [sampler] = useState(
    new Tone.Sampler({
      urls: {
        A2nylon: `${PUBLIC_URL}/audio/nylon/A2nylon.mp3`,
        A3nylon: `${PUBLIC_URL}/audio/nylon/A3nylon.mp3`,
        A4nylon: `${PUBLIC_URL}/audio/nylon/A4nylon.mp3`,
        A5nylon: `${PUBLIC_URL}/audio/nylon/A5nylon.mp3`,
        B1nylon: `${PUBLIC_URL}/audio/nylon/B1nylon.mp3`,
        B2nylon: `${PUBLIC_URL}/audio/nylon/B2nylon.mp3`,
        B3nylon: `${PUBLIC_URL}/audio/nylon/B3nylon.mp3`,
        B4nylon: `${PUBLIC_URL}/audio/nylon/B4nylon.mp3`,
        C3nylon: `${PUBLIC_URL}/audio/nylon/Cs3nylon.mp3`,
        C4nylon: `${PUBLIC_URL}/audio/nylon/Cs4nylon.mp3`,
        C5nylon: `${PUBLIC_URL}/audio/nylon/Cs5nylon.mp3`,
        C6nylon: `${PUBLIC_URL}/audio/nylon/Gs5nylon.mp3`,
        E2nylon: `${PUBLIC_URL}/audio/nylon/E2nylon.mp3`,
        E3nylon: `${PUBLIC_URL}/audio/nylon/E3nylon.mp3`,
        E4nylon: `${PUBLIC_URL}/audio/nylon/E4nylon.mp3`,
        E5nylon: `${PUBLIC_URL}/audio/nylon/E5nylon.mp3`,
        F2nylon: `${PUBLIC_URL}/audio/nylon/Fs2nylon.mp3`,
        F3nylon: `${PUBLIC_URL}/audio/nylon/Fs3nylon.mp3`,
        F4nylon: `${PUBLIC_URL}/audio/nylon/Fs4nylon.mp3`,
        F5nylon: `${PUBLIC_URL}/audio/nylon/Fs5nylon.mp3`,
        G2nylon: `${PUBLIC_URL}/audio/nylon/Gs2nylon.mp3`,
        G3nylon: `${PUBLIC_URL}/audio/nylon/A3nylon.mp3`,
        G4nylon: `${PUBLIC_URL}/audio/nylon/Gs4nylon.mp3`,
        G5nylon: `${PUBLIC_URL}/audio/nylon/Gs5nylon.mp3`,
        A2acoustic: `${PUBLIC_URL}/audio/acoustic/A2acoustic.mp3`,
        A3acoustic: `${PUBLIC_URL}/audio/acoustic/A3acoustic.mp3`,
        A4acoustic: `${PUBLIC_URL}/audio/acoustic/A4acoustic.mp3`,
        Bb2acoustic: `${PUBLIC_URL}/audio/acoustic/As2acoustic.mp3`,
        Bb3acoustic: `${PUBLIC_URL}/audio/acoustic/As3acoustic.mp3`,
        Bb4acoustic: `${PUBLIC_URL}/audio/acoustic/As4acoustic.mp3`,
        B2acoustic: `${PUBLIC_URL}/audio/acoustic/B2acoustic.mp3`,
        B3acoustic: `${PUBLIC_URL}/audio/acoustic/B3acoustic.mp3`,
        B4acoustic: `${PUBLIC_URL}/audio/acoustic/B4acoustic.mp3`,
        C3acoustic: `${PUBLIC_URL}/audio/acoustic/C3acoustic.mp3`,
        C4acoustic: `${PUBLIC_URL}/audio/acoustic/C4acoustic.mp3`,
        C5acoustic: `${PUBLIC_URL}/audio/acoustic/C5acoustic.mp3`,
        Db3acoustic: `${PUBLIC_URL}/audio/acoustic/Cs3acoustic.mp3`,
        Db4acoustic: `${PUBLIC_URL}/audio/acoustic/Cs4acoustic.mp3`,
        Db5acoustic: `${PUBLIC_URL}/audio/acoustic/Cs5acoustic.mp3`,
        D2acoustic: `${PUBLIC_URL}/audio/acoustic/D2acoustic.mp3`,
        D3acoustic: `${PUBLIC_URL}/audio/acoustic/D3acoustic.mp3`,
        D4acoustic: `${PUBLIC_URL}/audio/acoustic/D4acoustic.mp3`,
        Eb2acoustic: `${PUBLIC_URL}/audio/acoustic/Ds2acoustic.mp3`,
        Eb3acoustic: `${PUBLIC_URL}/audio/acoustic/Ds3acoustic.mp3`,
        Eb4acoustic: `${PUBLIC_URL}/audio/acoustic/Ds4acoustic.mp3`,
        E2acoustic: `${PUBLIC_URL}/audio/acoustic/E2acoustic.mp3`,
        E3acoustic: `${PUBLIC_URL}/audio/acoustic/E3acoustic.mp3`,
        E4acoustic: `${PUBLIC_URL}/audio/acoustic/E4acoustic.mp3`,
        F2acoustic: `${PUBLIC_URL}/audio/acoustic/F2acoustic.mp3`,
        F3acoustic: `${PUBLIC_URL}/audio/acoustic/F3acoustic.mp3`,
        F4acoustic: `${PUBLIC_URL}/audio/acoustic/F4acoustic.mp3`,
        Gb2acoustic: `${PUBLIC_URL}/audio/acoustic/Fs2acoustic.mp3`,
        Gb3acoustic: `${PUBLIC_URL}/audio/acoustic/Fs3acoustic.mp3`,
        Gb4acoustic: `${PUBLIC_URL}/audio/acoustic/Fs4acoustic.mp3`,
        G2acoustic: `${PUBLIC_URL}/audio/acoustic/G2acoustic.mp3`,
        G3acoustic: `${PUBLIC_URL}/audio/acoustic/G3acoustic.mp3`,
        G4acoustic: `${PUBLIC_URL}/audio/acoustic/G4acoustic.mp3`,
        Ab2acoustic: `${PUBLIC_URL}/audio/acoustic/Gs2acoustic.mp3`,
        Ab3acoustic: `${PUBLIC_URL}/audio/acoustic/Gs3acoustic.mp3`,
        Ab4acoustic: `${PUBLIC_URL}/audio/acoustic/Gs4acoustic.mp3`,
        A2electric: `${PUBLIC_URL}/audio/electric/A2electric.mp3`,
        A3electric: `${PUBLIC_URL}/audio/electric/A3electric.mp3`,
        A4electric: `${PUBLIC_URL}/audio/electric/A4electric.mp3`,
        A5electric: `${PUBLIC_URL}/audio/electric/A5electric.mp3`,
        C3electric: `${PUBLIC_URL}/audio/electric/C3electric.mp3`,
        C4electric: `${PUBLIC_URL}/audio/electric/C4electric.mp3`,
        C5electric: `${PUBLIC_URL}/audio/electric/C5electric.mp3`,
        C6electric: `${PUBLIC_URL}/audio/electric/C6electric.mp3`,
        F2electric: `${PUBLIC_URL}/audio/electric/Fs2electric.mp3`,
        F3electric: `${PUBLIC_URL}/audio/electric/Fs3electric.mp3`,
        F4electric: `${PUBLIC_URL}/audio/electric/Fs4electric.mp3`,
        F5electric: `${PUBLIC_URL}/audio/electric/Fs5electric.mp3`,
      },
    }).toDestination()
  );
  const sounds = List([
    //First String
    {
      id: 1,
      note: "A2nylon",
      coords: "31,10,98,35", //{(x,y) (x,y)}
    },
    {
      id: 2,
      note: "A3nylon",
      coords: "100,10,167,35",
    },
    {
      id: 3,
      note: "A4nylon",
      coords: "170,10,235,35",
    },
    {
      id: 4,
      note: "A5nylon",
      coords: "238,10,300,35",
    },
    {
      id: 5,
      note: "E2nylon",
      coords: "303,10,365,35",
    },
    {
      id: 6,
      note: "E3nylon",
      coords: "369,10,426,35",
    },
    {
      id: 7,
      note: "E4nylon",
      coords: "431,10,485,35",
    },
    {
      id: 8,
      note: "E5nylon",
      coords: "492,10,545,35",
    },
    {
      id: 9,
      note: "A2electric",
      coords: "550,10,602,35",
    },
    {
      id: 10,
      note: "A3electric",
      coords: "607,10,657,35",
    },
    {
      id: 11,
      note: "A4electric",
      coords: "662,10,710,35",
    },
    {
      id: 12,
      note: "A5electric",
      coords: "715,10,760,35",
    },
    {
      id: 13,
      note: "A7",
      coords: "768,10,1000,35",
    },

    //Second String
    {
      //first fret
      id: 14,
      note: "B1nylon",
      coords: "31,50,98,75",
    },
    {
      id: 15,
      note: "B2nylon",
      coords: "100,50,167,75",
    },
    {
      id: 16,
      note: "B3nylon",
      coords: "170,50,235,75",
    },
    {
      id: 17,
      note: "B4nylon",
      coords: "238,50,300,75",
    },
    {
      id: 18,
      note: "F2nylon",
      coords: "303,50,365,75",
    },
    {
      id: 19,
      note: "F3nylon",
      coords: "369,50,426,75",
    },
    {
      id: 20,
      note: "F4nylon",
      coords: "431,50,485,75",
    },
    {
      id: 21,
      note: "F5nylon",
      coords: "492,50,545,75",
    },
    {
      id: 22,
      note: "C3electric",
      coords: "550,50,602,75",
    },
    {
      id: 23,
      note: "C4electric",
      coords: "607,50,657,75",
    },
    {
      id: 24,
      note: "C5electric",
      coords: "662,50,710,75",
    },
    {
      id: 25,
      note: "C6electric",
      coords: "715,50,760,75",
    },
    {
      id: 26,
      note: "A4",
      coords: "768,50,1000,75",
    },
    //Third String
    {
      id: 27,
      note: "C3nylon",
      coords: "31,90,98,115",
    },
    {
      id: 28,
      note: "C4nylon",
      coords: "100,90,167,115",
    },
    {
      id: 29,
      note: "C5nylon",
      coords: "170,90,235,115",
    },
    {
      id: 30,
      note: "C6nylon",
      coords: "238,90,300,115",
    },
    {
      id: 31,
      note: "G2nylon",
      coords: "303,90,365,115",
    },
    {
      id: 32,
      note: "G3nylon",
      coords: "369,90,426,115",
    },
    {
      id: 33,
      note: "G4nylon",
      coords: "431,90,485,115",
    },
    {
      id: 34,
      note: "G5nylon",
      coords: "492,90,545,115",
    },
    {
      id: 35,
      note: "F2electric",
      coords: "550,90,602,115",
    },
    {
      id: 36,
      note: "F3electric",
      coords: "607,90,657,115",
    },
    {
      id: 37,
      note: "F4electric",
      coords: "662,90,710,115",
    },
    {
      id: 38,
      note: "F5electric",
      coords: "715,90,760,115",
    },
    {
      id: 39,
      note: "A4",
      coords: "768,90,1000,115",
    },
    //Fourth String
    {
      id: 40,
      note: "A4acoustic",
      coords: "31,130,98,155",
    },
    {
      id: 41,
      note: "Bb4acoustic",
      coords: "100,130,167,155",
    },
    {
      id: 42,
      note: "B4acoustic",
      coords: "170,130,235,155",
    },
    {
      id: 43,
      note: "C4acoustic",
      coords: "238,130,300,155",
    },
    {
      id: 44,
      note: "Db4acoustic",
      coords: "303,130,365,155",
    },
    {
      id: 45,
      note: "D4acoustic",
      coords: "369,130,426,155",
    },
    {
      id: 46,
      note: "Eb4acoustic",
      coords: "431,130,485,155",
    },
    {
      id: 47,
      note: "E4acoustic",
      coords: "492,130,545,155",
    },
    {
      id: 48,
      note: "F4acoustic",
      coords: "550,130,602,155",
    },
    {
      id: 49,
      note: "Gb4acoustic",
      coords: "607,130,657,155",
    },
    {
      id: 50,
      note: "G4acoustic",
      coords: "662,130,710,155",
    },
    {
      id: 51,
      note: "Ab4acoustic",
      coords: "715,130,760,155",
    },
    {
      id: 52,
      note: "",
      coords: "768,130,1000,155",
    },
    //Fifth String
    {
      id: 53,
      note: "A3acoustic",
      coords: "31,170,98,195",
    },
    {
      id: 54,
      note: "Bb3acoustic",
      coords: "100,170,167,195",
    },
    {
      id: 55,
      note: "B3acoustic",
      coords: "170,170,235,195",
    },
    {
      id: 56,
      note: "C4acoustic",
      coords: "238,170,300,195",
    },
    {
      id: 57,
      note: "Db4acoustic",
      coords: "303,170,365,195",
    },
    {
      id: 58,
      note: "D4acoustic",
      coords: "369,170,426,195",
    },
    {
      id: 59,
      note: "Eb4acoustic",
      coords: "431,170,485,195",
    },
    {
      id: 60,
      note: "E4acoustic",
      coords: "492,170,545,195",
    },
    {
      id: 61,
      note: "F4acoustic",
      coords: "550,170,602,195",
    },
    {
      id: 62,
      note: "Gb4acoustic",
      coords: "607,170,657,195",
    },
    {
      id: 63,
      note: "G4acoustic",
      coords: "662,170,710,195",
    },
    {
      id: 64,
      note: "A4acoustic",
      coords: "715,170,760,195",
    },
    {
      id: 65,
      note: "A4",
      coords: "768,170,1000,195",
    },
    //Sixth String
    {
      id: 66,
      note: "A2acoustic",
      coords: "31,210,98,235",
    },
    {
      id: 67,
      note: "Bb2acoustic",
      coords: "100,210,167,235",
    },
    {
      id: 68,
      note: "B2acoustic",
      coords: "170,210,235,235",
    },
    {
      id: 69,
      note: "C3acoustic",
      coords: "238,210,300,235",
    },
    {
      id: 70,
      note: "Db3acoustic",
      coords: "303,210,365,235",
    },
    {
      id: 71,
      note: "D3acoustic",
      coords: "369,210,426,235",
    },
    {
      id: 72,
      note: "Db3acoustic",
      coords: "431,210,485,235",
    },
    {
      id: 73,
      note: "E3acoustic",
      coords: "492,210,545,235",
    },
    {
      id: 74,
      note: "F3acoustic",
      coords: "550,210,602,235",
    },
    {
      id: 75,
      note: "Gb3acoustic",
      coords: "607,210,657,235",
    },
    {
      id: 76,
      note: "G3acoustic",
      coords: "662,210,710,235",
    },
    {
      id: 77,
      note: "Ab3acoustic",
      coords: "715,210,760,235",
    },
    {
      id: 78,
      note: "A4",
      coords: "768,210,1000,235",
    },
  ]);

  const onClickHandler = (event: any) => {
    newFunction();
    function newFunction(): void {
      sampler.triggerAttackRelease(
        event.target.getAttribute("music-note"),
        "3.5n"
      );
    }
  };

  return (
    <div>
      <img src={guitarimg} useMap="#Guitar" width="1000" height="250" />
      <map id="Guitar" name="Guitar">
        {sounds.map(function (key) {
          return (
            <area
              music-note={key.note}
              coords={key.coords}
              shape="rect"
              onClick={onClickHandler}
              //onMouseEnter={onPointer}
            />
          );
        })}
      </map>
    </div>
  );
}
export const GuitarInstrument = new Instrument("michaelliftw", Guitar);
