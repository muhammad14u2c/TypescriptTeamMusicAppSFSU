// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, { useState, useContext, useEffect } from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

var sampler:Tone.Sampler;

interface BlowButtonProps {
    duration?: string; //find out where this gets filled from 
    synth?: Tone.Synth; // Contains library code for making sound
    playNote:()=>void;  //x?:boolean[]
    selected?:boolean[];//////////
}

interface ToneHoleProps {
    front:boolean,
    selected: boolean[],
    setSelected:any,
    viewBox: string,
    pos: [string,string], 
    radius: string,
    index:number,
}

interface BodyProps{
    front:boolean,
    selected:boolean[],
    setSelected:any,
}

export function BlowButton({synth, duration, selected, playNote}: BlowButtonProps): JSX.Element {

    return(<button
            onClick={() => playNote()}//playNote(selected)
            style={{
                position:"absolute",
                zIndex:3,
                width:100,
                height:40,
            }}>
            Blow Me
            </button>)
}

export function ToneHole(toneholeProps: ToneHoleProps): JSX.Element{
    //review this function
    return(<svg width="500" height="400" viewBox={toneholeProps.viewBox} >
        <circle cx={toneholeProps.pos[0]} cy={toneholeProps.pos[1]} 
        r={toneholeProps.radius}
        onClick={() => {toneholeProps.setSelected(toneholeProps.selected.map((x, index) => (index == toneholeProps.index ? !toneholeProps.selected[toneholeProps.index] : x)))}}
            style={toneholeProps.selected[ toneholeProps.index] ?
                {
                    zIndex:"1",
                    fill:"black",
                    stroke:"#00005F",
                    strokeWidth:0.25,
                }:
                {
                    zIndex:"1",
                    fill:"darkGray",
                    stroke:"#00005F",
                    strokeWidth:0.25,
                }
            }
        />
    </svg>);
}


export function OcarinaBody(bodyProps:BodyProps, toneHoleProps:ToneHoleProps): JSX.Element {
    let viewBox: string = "";
    let path: string = "";
    let numHoles: number = 0;

    if(bodyProps.front)
    {
        numHoles = 8;
        viewBox = "17 15 100 100";
        path = `M 50,80
        Q 50,90 40,87
        Q 35,85 38,78
        C 47,55 30,60 25,60
        C 1,60 1,25 25,25
        C 50,23 75,33 100,40
        C 150,50 120,70 80,65
        C 60,60 50,70 50,80
        `;
    }else{
        numHoles = 2;
        viewBox = "7 15 100 100";
        path = `M 76,79
        Q 76,89 86,86
        Q 91,84 88,77
        C 79,54 96,59 101,59
        C 125,59 125,24 101,24
        C 76,22 51,32 26,39
        C -24,49 6,69 46,64
        C 66,59 76,69 76,79
        `;
    }

    function getPos(index:number, front:boolean): [string,string]{
        if(front){
            switch(index){
                case 0:
                    return ["8.8","25"];
                case 1:
                    return ["12.5","26"]
                case 2:
                    return ["16.5","25.5"]
                case 3:
                    return ["20","24.5"]
                case 4:
                    return ["22.5","28.5"]
                case 5:
                    return ["26","29"]
                case 6:
                    return ["29.3","28.8"]
                case 7:
                    return ["32.5","28"]
                default: 
                return ["70","70"]
            }
        }else{
            switch(index){
                case 0:
                    return ["8", "28"];
                case 1:
                    return ["18", "26" ];
                default:
                    return ["0", "0"];
                        
            }
        }
    }

    function getRadius(index:number, front:boolean): string {
        if(front){
            switch(index){
                case 0:
                    return "1.2";
                case 3:
                    return "1";
                case 5:
                    return "1";
                case 7:
                    return "1";
                default: 
                return "1.5"
            }
        }else{
            return "1.8";
        }
    }

    return (
        <svg width="500" height="400" viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
        <path
        d={path}
        style={{
            stroke:"#00005F",
            strokeWidth:0.7,
            fill:"DarkBlue",
            zIndex:0,
            }} 
        />
        {Range(0,numHoles).map(key => {
            return (
            <ToneHole 
            key={key} //react key
            index={bodyProps.front? key : key + 8}
            front={bodyProps.front}
            viewBox={viewBox}
            pos={getPos(key, bodyProps.front)}
            radius={getRadius(key, bodyProps.front)}
            selected={bodyProps.selected}
            setSelected={bodyProps.setSelected}
            />)
        })}
    </svg>)
}


function Ocarina({ synth, setSynth }: InstrumentProps): JSX.Element {
  //  , { sampler }: OcarinaProps

  var sampler = new Tone.Sampler({
    urls: {
      D4: "D.wav",
      B4: "B.wav",
      A4: "A.wav",
      F4: "F.wav",
    },
    baseUrl: "http://localhost:3000/ocarina/"
  }).toDestination() as any;


    // useEffect(() => {
    //     setSynth(oldSynth => {oldSynth.disconnect()          
    //     return sampler.toDestination();
    //     }) 
    //     //this allows the ocarina to play ode to joy but does crashes when 
    //     //switching back to piano
    //   }, []);

      let pickNote = (selected: boolean[]): string  => {
        
        function onlyThese(idxList:number[], boolList:boolean[]): boolean{
            //overly optimized dynamic programming function
            let selectedHoles: Set<number> = new Set();
            // Find out if all holes required for a note are selected
            for(let i of idxList){
                if(boolList[i]){
                    selectedHoles.add(i);
                }else{
                    return false;
                }
            }
            //find out if only the holes required for a note are selected
            for(let i = 0; i < boolList.length; i++){
                if(selectedHoles.has(i)){
                    continue;
                }
                if(boolList[i]){
                    return false;
                }
            }
            return true;
        }
        
        if(onlyThese([3],selected)){
            return "E5"
        }else if(onlyThese([3,8],selected)){
            return "D5"
        }else if(onlyThese([3,8,9],selected)){
            return "C5"
        }else if(onlyThese([0,3,8,9],selected)){
            return "B5"
        }else if(onlyThese([0,1,3,8,9],selected)){
            return "A5"
        }else if(onlyThese([0,1,2,3,8,9],selected)){
            return "G5"
        }else if(onlyThese([0,1,2,3,4,8,9],selected)){
            return "F5"
        }else if(onlyThese([0,1,2,3,4,5,8,9],selected)){
            return "E6"
        }else if(onlyThese([0,1,2,3,4,5,6,8,9],selected)){
            return "D6"
        }else if(onlyThese([0,1,2,3,4,5,6,7,8,9],selected)){
            return "C6"
        }else if(onlyThese([0,3],selected)){
            return "Db5"
        }else if(onlyThese([0,3,8],selected)){
            return "Cb5"
        }else if(onlyThese([0,3,6,8,9],selected)){
            return "Ab5"
        }else if(onlyThese([0,1,3,6,8,9],selected)){
            return "Gb5"
        }else if(onlyThese([0,1,2,3,6,8,9],selected)){
            return "Fb5"
        }else if(onlyThese([0,1,2,3,4,6,8,9],selected)){
            return "Db6"
        }else if(onlyThese([0,1,2,3,4,6,7,8,9],selected)){
            return "Cb5"
        //this ends the music theory adhering section
        }else if(onlyThese([3,8],selected)){
            return "D5"
        }else if(onlyThese([1,3,4,5,6,7,8,9],selected)){
            return "C5"
        }else if(onlyThese([1,2,4,5,6,7,8,9],selected)){
            return "B5"
        }else if(onlyThese([0,1,2,3,6,7,8,9],selected)){
            return "A5"
        }else if(onlyThese([0,1,2,3,4,6,7,8,9],selected)){
            return "G5"
        }else if(onlyThese([0,1,2,3,4,7,8,9],selected)){
            return "F5"
        }else if(onlyThese([0,1,3,4,5,8,9],selected)){
            return "E6"
        }else if(onlyThese([0,2,3,4,5,6,8,9],selected)){
            return "D6"
        }else if(onlyThese([1,2,3,4,5,6,7,8,9],selected)){
            return "C6"
        }else if(onlyThese([3],selected)){
            return "E4"
        }else if(onlyThese([2],selected)){
            return "D4"
        }else if(onlyThese([1],selected)){
            return "C4"
        }else if(onlyThese([0],selected)){
            return "B4"
        }else if(onlyThese([0,1],selected)){
            return "B4"
        }else if(onlyThese([0,1,2],selected)){
            return "C4"
        }else if(onlyThese([0,1,2,3],selected)){
            return "D4"
        }else if(onlyThese([0,1,2,3,4],selected)){
            return "Db4"
        }else if(onlyThese([0,1,2,3,4,5],selected)){
            return "E4"
        }else if(onlyThese([0,1,2,3,4,5,6],selected)){
            return "Eb4"
        }else if(onlyThese([0,1,2,3,4,5,6,7],selected)){
            return "C4"
        }else if(onlyThese([0,8],selected)){
            return "B4"
        }else if(onlyThese([0,1,8],selected)){
            return "B4"
        }else if(onlyThese([0,1,2,8],selected)){
            return "C4"
        }else if(onlyThese([0,1,2,3,8],selected)){
            return "D4"
        }else if(onlyThese([0,1,2,3,4,8],selected)){
            return "Db4"
        }else if(onlyThese([0,1,2,3,4,5,8],selected)){
            return "E4"
        }else if(onlyThese([0,1,2,3,4,5,6,8],selected)){
            return "Eb4"
        }else if(onlyThese([0,1,2,3,4,5,6,7,8],selected)){
            return "C4"
        }else if(onlyThese([0,9],selected)){
            return "B4"
        }else if(onlyThese([0,1,9],selected)){
            return "B4"
        }else if(onlyThese([0,1,2,9],selected)){
            return "C4"
        }else if(onlyThese([0,1,2,3,9],selected)){
            return "D4"
        }else if(onlyThese([0,1,2,3,4,9],selected)){
            return "Db4"
        }else if(onlyThese([0,1,2,3,4,5,9],selected)){
            return "E4"
        }else if(onlyThese([0,1,2,3,4,5,6,9],selected)){
            return "Eb4"
        }else if(onlyThese([0,1,2,3,4,5,6,7,9],selected)){
            return "C4"
        }else if(onlyThese([0,8,9],selected)){
            return "B4"
        }else if(onlyThese([0,1,8,9],selected)){
            return "B4"
        }else if(onlyThese([0,1,2,8,9],selected)){
            return "C4"
        }else if(onlyThese([0,1,2,3,8,9],selected)){
            return "D4"
        }else if(onlyThese([0,1,2,3,4,8,9],selected)){
            return "Db4"
        }else if(onlyThese([0,1,2,3,4,5,8,9],selected)){
            return "E4"
        }else if(onlyThese([0,1,2,3,4,5,6,8,9],selected)){
            return "Eb4"
        }else if(onlyThese([0,1,2,3,4,5,6,7,8,9],selected)){
            return "C4"
        }else if(onlyThese([4],selected)){
            return "E4"
        }else if(onlyThese([5],selected)){
            return "D4"
        }else if(onlyThese([6],selected)){
            return "C4"
        }else if(onlyThese([7],selected)){
            return "B4"
        }else if(onlyThese([4,5],selected)){
            return "D4"
        }else if(onlyThese([4,5,6],selected)){
            return "C4"
        }else if(onlyThese([4,5,6,7],selected)){
            return "B4"
        }else if(onlyThese([3,7],selected)){
            return "Eb4"
        }else if(onlyThese([2,6],selected)){
            return "Db4"
        }else if(onlyThese([1,5],selected)){
            return "Cb4"
        }else if(onlyThese([0,4],selected)){
            return "Bb4"
        }else if(onlyThese([0,1,2,4,5,6,7,8,9],selected)){
            return "Bb4"
        }else if(onlyThese([0,1,3,4,5,6,7,8,9],selected)){
            return "B4"
        }else if(onlyThese([0,1,4,5,6,7,8,9],selected)){
            return "C4"
        }else if(onlyThese([0,4,5,6,7,8,9],selected)){
            return "Cb4"
        }else if(onlyThese([2,3,4,5,6,7,8,9],selected)){
            return "D4"
        }else if(onlyThese([3,4,5,6,7,8,9],selected)){
            return "Db4"
        }else if(onlyThese([1,2,3,4,5,6,7,8,9],selected)){
            return "C3"
        }else{
            return "F4"
        }
      }

      function playNote():any {
        let  note = pickNote(selected);
        // console.log(selected)
        // console.log(note)
        let duration = "0.5";
        sampler.triggerAttackRelease(note,duration)
      }

      
      const [selected, setSelected] = useState([true,true,true,true,true,true,true,true,true,true]);
      
      /** 
       * context plan
       *    we could pass our use ocarina body as a context providers and pass the 
       *    use state variables through that. 
       *    most efficient is to use the usecontext hook at this level when play note if fired and dont pass it anything 
       *     
       */
    return (<div>
            <OcarinaBody front={true} selected={selected} setSelected={setSelected}/>
            <BlowButton playNote={playNote} selected={selected} />
            <OcarinaBody front={false} selected={selected} setSelected={setSelected}/>
            </div>);
}

export const OcarinaInstrument = new Instrument('krisbyington', Ocarina);