// 3rd party library imports
import P5 from "p5";
import * as Tone from "tone";

// project imports
import { Visualizer } from "../Visualizers";


export const MuhammadVisualizer = new Visualizer(
  "muhammad14u2c",
 (p5: P5, analyzer: Tone.Analyser) => {
  
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(200, 300, 150, 300);

    p5.strokeWeight(dim * 0.003);
    p5.stroke(1,32,20,300);
    p5.noFill();

    const values = analyzer.getValue();
    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
      
      // p5.ellipse(height /2, width /2 , 1000, 1000); 
      const amplitude = values[i] as number;
      const x = p5.map(i, 0, values.length, 0, width);
      values.slice(0,1);
      const y = height/2  + amplitude * height;
      const z = height/3  + amplitude * height;
      // const y = height / 2 + amplitude * height;
      // Place vertex
      p5.ellipse(x, y , x/ 25, y/10);

      p5.ellipse(x, z, x/ 25, z/10);
    }
    p5.endShape();
  },
  
);