// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

const history: any[] = [0];

export const Waveform2Visualizer = new Visualizer(
  'Waveform2',
  (p5: P5, analyzer: Tone.Analyser) => {

    analyzer.set({
      type: "fft",
      size: 16
    });

    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.05);
    p5.stroke(255, 255, 255, 255);
    p5.fill(131, 131, 131);

    const values = analyzer.getValue();
    const bins = [values[4], values[6], values[10], values[14]];
    history.push(bins);
    //console.log(values[4], values[6], values[10], values[14]);
    for(let j = 0; j < bins.length; j++) {
      p5.beginShape();
      for(let i = 0; i < history.length; i++) {
        //for(let j = 0; j < history[i].length)
        let y = p5.map(history[i][j], -800, 0, height, 0);
        p5.vertex(i, y);
        //console.log(history[i]);
      }
      p5.endShape();
    }


    if(history.length > width/2) {
      history.splice(2, 3);
    }
    
    //console.log(bins[0]);
    /*
    for (let i = 0; i < bins.length; i++) {
      const val = bins[i] as number;
      const x = p5.map(i, 0, bins.length - 1, 0, width - width/4)
      const y = -p5.map(val, -100, 0, 0, height);
      // Place vertex
      //p5.vertex(x, y);

      p5.rect(x, 0, width/4, y);
      p5.stroke(255);
      p5.fill(235, 131, 154);
    }
    */
    
  },
);
