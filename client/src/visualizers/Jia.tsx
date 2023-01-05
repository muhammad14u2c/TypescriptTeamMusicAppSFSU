import { Translate16 } from "@carbon/icons-react";
import P5 from "p5";
import * as Tone from "tone";

// project imports
import { Visualizer } from "../Visualizers";

//This is similar to the draw() function in p5
export const JiaVisualizer = new Visualizer(
  "michaelliftw",
  (p5: P5, analyzer: Tone.Analyser) => {
    //height and width of the container
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);
    //resets background back to black after each node
    p5.background(0, 0, 0, 255);
    //the thickness of the string.
    p5.strokeWeight(dim * 0.01);
    //color of the line
    p5.stroke(255, 255, 255, 255);
    //no fill helps keep the line from filling in the black gaps
    p5.noFill();

    const values = analyzer.getValue();
    //color change
    for (const x of values) {
      const random_color = Math.random() * 255;
      // const random_color = (Math.random() * 255)  ** will go blind.
      const random_r = Math.random() * 3;
      const random_g = Math.random() * 3;
      const random_b = Math.random() * 3;
      p5.background(0);
      p5.stroke(
        random_color / random_r,
        random_color / random_g,
        random_color / random_b,
        random_color
      );
    }
    // p5.colorMode(p5.HSL, 360); //hue, saturation, light
    // let hue = p5.frameCount % 360; //rotates colors
    // p5.fill(hue, 200, 200);

    p5.translate(width / 3, height / 2);
    p5.beginShape();
    for (let i = 0; i < 360; i++) {
      const amplitude = values[i] as number;
      let r = p5.map(amplitude, 0, 100, 10, width);
      let x = r * Math.cos(i);
      let y = r * Math.sin(i);
      p5.vertex(x, y);
    }
    p5.endShape();
    p5.beginShape();
    for (let i = 0; i < 360; i++) {
      const amplitude = values[i] as number;
      let r = p5.map(amplitude * 4, 0, 10, 50, width);
      let x = r * Math.cos(i);
      let y = r * Math.sin(i);
      p5.vertex(x, y);
    }
    p5.endShape();

    p5.translate(width / 3, 0);
    p5.beginShape();
    for (let i = 0; i < 360; i++) {
      const amplitude = values[i] as number;
      let r = p5.map(amplitude, 0, 100, 10, width);
      let x = r * Math.cos(i);
      let y = r * Math.sin(i);
      p5.vertex(x, y);
    }
    p5.endShape();
    p5.beginShape();
    for (let i = 0; i < 360; i++) {
      const amplitude = values[i] as number;
      let r = p5.map(amplitude * 4, 0, 10, 50, width);
      let x = r * Math.cos(i);
      let y = r * Math.sin(i);
      p5.vertex(x, y);
    }
    p5.endShape();
  }
);
