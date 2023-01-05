// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const WavemanVisualizer = new Visualizer(
  'tabadines00',
  (p5: P5, analyzer: Tone.Analyser) => {
    
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    // Background
    p5.background(255, 255, 255, 255);

    const values = analyzer.getValue();
    const amp = Math.max(...values as any);

    // Arms
    p5.stroke(0, 0, 0, 255);
    p5.noFill();
    p5.beginShape();
    for (let i = Math.floor(values.length * (5 / 6)); i < values.length; i++) {
      const amplitude = values[i] as number;
      const x = p5.map(i, Math.floor(values.length * (5 / 6)), values.length - 1, 0, 200) + (width / 2) - 280; // - 220
      const y = (height / 2) + amplitude * 100;
      // Place vertex
      p5.vertex(x, y);
    }
    p5.endShape();

    p5.beginShape();
    for (let i = Math.floor(values.length * (5 / 6)); i < values.length; i++) {
      const amplitude = values[i] as number;
      const x = p5.map(i, Math.floor(values.length * (5 / 6)), values.length - 1, 200, 0) + (width / 2) + 80; // + 1100
      const y = (height / 2) + amplitude * 100;
      // Place vertex
      p5.vertex(x, y);
    }
    p5.endShape();

    // Legs
    p5.strokeWeight(dim * 0.05);
    p5.stroke(0, 0, 0, 255);
    p5.fill(0);
    p5.rect((width / 2) - 85, (height / 2) + 100, 1, 100, 50)
    p5.rect((width / 2) + 75, (height / 2) + 100, 1, 100, 50)

    // Body
    p5.strokeWeight(dim * 0.05);
    p5.stroke(0, 0, 0, 255);
    p5.fill(255,255,255);
    p5.ellipse(width / 2, (height / 2) - 30, 300, 300)

    // Eyes
    p5.stroke(0, 0, 0, 255);
    p5.fill(0, 0, 0);
    p5.ellipse((width / 2) - 60, (height / 2) - 60, 20, 20)
    p5.ellipse((width / 2) + 60, (height / 2) - 60, 20, 20)

    // Eyebrows
    p5.strokeWeight(dim * 0.01);
    p5.rect((width / 2) - 90, (height / 2) - 110 + (amp * 20), 50, 5, 50)
    p5.rect((width / 2) + 30, (height / 2) - 110 + (amp * 20), 50, 5, 50)

    // Mouth
    p5.strokeWeight(dim * 0.05);
    p5.stroke(200, 0, 0, 255);
    p5.fill(255, 150, 150);
    p5.ellipse(width / 2, (height / 2) + 40, 150, amp * 200)
    
  },
);
