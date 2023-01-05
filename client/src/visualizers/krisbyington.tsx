// 3rd party library imports
import P5 from "p5";
import * as Tone from "tone";

// project imports
import { Visualizer } from "../Visualizers";

class Star {
    xPos;
    yPos;
    zPos;
    sideLength;
    quadrant;
    red;
    green;
    blue;
    shape;

    constructor(x: number, y:number, z:number, l:number, 
                width:number, height:number,
                r:number, g:number, b:number,
                s:string){
        this.xPos = x;
        this.yPos = y;
        this.zPos = z;
        this.sideLength = l;
        this.red = r;
        this.green = g;
        this.blue = b;
        this.shape = s;

        this.quadrant = 0;
        if(x > width/2 && y < height/2){
            this.quadrant = 1;
        }
        if(x < width/2 && y < height/2){
            this.quadrant = 2;
        }
        if(x < width/2 && y > height/2){
            this.quadrant = 3;
        }
        if(x > width/2 && y > height/2){
            this.quadrant = 4;
        }
    }

    update(){
        this.zPos = this.zPos - 1;
        if(this.quadrant == 1 ){
            this.xPos = this.xPos + 1;
            this.yPos = this.yPos - 1;
        }
        if(this.quadrant == 2 ){
            this.xPos = this.xPos - 1;
            this.yPos = this.yPos - 1;
        }
        if(this.quadrant == 3 ){
            this.xPos = this.xPos - 1;
            this.yPos = this.yPos + 1;
        }
        if(this.quadrant == 4 ){
            this.xPos = this.xPos + 1;
            this.yPos = this.yPos - 1;
        }

    }

}

var stars = new Map();
var starIdx = 0;
let sideLength;
let current;
let coinFlip = true;
let dataArr: Number[] = [];
let dataIdx = 0;
let red = 0;
let green = 0; 
let blue = 0;
let z = 0;
let shape = "square";
let limiter = 0;

export const krisVisualizer = new Visualizer(
    "krisbyington",
    (p5: P5, analyzer: Tone.Analyser) => {

        const width = window.innerWidth;
        const height = window.innerHeight / 2;
        const dim = Math.min(width, height);
        p5.background(0, 0, 0, 255);
        p5.strokeWeight(dim * 0.01);
        p5.stroke(255, 255, 255, 255);
        p5.noFill();
        let squareX = width/2;
        let squareY = height/2;
       const values = analyzer.getValue();

       for(let item of values) {
            current = Number(item);
            if(current < 0.001 ){
                continue;
            }
            if(limiter !== 2){
                limiter++;
                continue;
            }
            limiter = 1;
            if(dataIdx == 2){
                dataIdx = 0;
                coinFlip = Math.random() < 0.5;
                if(coinFlip){
                    squareX = squareX + Number(dataArr[0]) * 300;
                }else{
                    squareX = squareX - Number(dataArr[0]) * 300;
                }
                coinFlip = Math.random() < 0.5;
                if(coinFlip){
                    squareY = squareY + Number(dataArr[1]) * 125;
                }else{
                    squareY = squareY - Number(dataArr[1]) * 125;
                }
                red = p5.map(Math.random(), 0, 1, 0, 255);
                green = p5.map(Math.random(), 0, 1, 0, 255);
                blue = p5.map(Math.random(), 0, 1, 0, 255);
                if(coinFlip){
                    shape = "circle";
                }else{
                    shape = "square";
                }
                let newStar: Star = new Star(squareX, squareY, 50, 5, width, height, red, green, blue, shape);
                stars.set(starIdx, newStar);
                starIdx++;
            }else{
                dataArr[dataIdx] = current;
                dataIdx++;
                }
            }

        for(let [key, value] of stars){
            if(value.zPos < 1){
                stars.delete(key);
            }else{
                value.update();
                p5.stroke(value.red ,value.green, value.blue );
                if(value.shape == "square"){
                    p5.square(value.xPos, value.yPos ,value.sideLength);
                }else{
                    p5.circle(value.xPos, value.yPos ,value.sideLength)
                }
                p5.stroke(255,255, 255,255 );
            }
        }
    });