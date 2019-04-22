import * as THREE from 'three';

import Scene from './scene';
import Particles from './particles';
import CanvasImage from './CanvasImage';
import * as util from './util';

export default class Graph {

    public inputImage: HTMLImageElement;
    public inputCanvas: CanvasImage;
    public outputCanvas: CanvasImage;

    public inputImageData?: Uint8ClampedArray;
    public outputImageData?: Uint8ClampedArray;

    public resizedImage: boolean = false;

    public scene: Scene;
    public particles?: Particles;

    private updateCount: number = -1;
    private updateLength: number = 80; // num anim frames
    public updates: any[] = [];

    constructor() {
        this.inputImage = new Image();
        this.inputCanvas = new CanvasImage('');
        this.outputCanvas = new CanvasImage('');

        this.scene = new Scene();

        const animate = () => {
            requestAnimationFrame( animate );
            this.scene.update();
            this.update();
        };
        animate();
    }

    public init() {
        this.inputCanvas = new CanvasImage('inputCanvas');
        this.outputCanvas = new CanvasImage('outputCanvas');
        this.setInputImage('./example-images/color.jpg');
    }

    public update() {
        if (this.updateCount >= 0) {
            this.updateCount++;

            if (this.outputImageData && this.outputCanvas.context) {
                let output = this.outputCanvas.context.createImageData(this.inputImage.width,this.inputImage.height);

                // lerp each RGB value of each pixel
                for (let i=0; i<this.outputImageData.length; i++) {
                    const from = this.updates[this.updates.length-1][i];
                    const to = this.updates[this.updates.length-2][i];
                    const lerped = (THREE.Math as any).lerp(from, to, this.updateCount/this.updateLength);

                    this.outputImageData[i] = lerped;
                    output.data[i] = lerped;

                    if (i%(4*Particles.divisor) === 0 && this.particles) {
                        const from = new THREE.Vector3(this.updates[this.updates.length-2][i]-128, this.updates[this.updates.length-2][i+1]-128, this.updates[this.updates.length-2][i+2]-128);
                        const to = new THREE.Vector3(this.updates[this.updates.length-1][i]-128, this.updates[this.updates.length-1][i+1]-128, this.updates[this.updates.length-1][i+2]-128);
                        const pos = (from).lerp(to, this.updateCount/this.updateLength);

                        (this.particles.particles.geometry as any).vertices[i/(4*Particles.divisor)] = pos;
                        (this.particles.particles.geometry as any).colors[i/(4*Particles.divisor)] = new THREE.Color((pos.x + 128)/255, (pos.y + 128)/255, (pos.z + 128)/255);;
                    }
                }
                // update output image canvas
                this.outputCanvas.context.putImageData( output , 0, 0 );

                // update particles
                if (this.particles) {
                    (this.particles.particles.geometry as any).verticesNeedUpdate = true;
                    (this.particles.particles.geometry as any).colorsNeedUpdate = true;
                }
            }

            // check for end of operation
            if (this.updateCount >= this.updateLength) {
                this.updateCount = -1;
                console.log("DONE animation");
            }
        }
    }

    public setInputImage(file: any) {  
        this.resizedImage = false;
        this.updates = [];

        this.inputImage.src = file;
        this.inputImage.onload = () => {

            if (!this.resizedImage) {
                this.resizedImage = true;
                this.inputImage.src = util.resizeImage(this.inputImage);
                return;
            }

            this.inputImageData = this.inputCanvas.drawImage(this.inputImage);
            this.outputImageData = this.outputCanvas.drawImage(this.inputImage);
            if (this.inputImageData) {
                // TODO start all particles at black
                if (this.particles) {
                    this.particles.reset();
                }
                this.particles = new Particles(this.scene.scene, this.inputImageData);
                this.updates.push(this.inputImageData.slice());
            }
        };
    }

    public applyOperation(operation: string) {
        console.log('applying operation ', operation);
    }

    public invert() {  
        this.updateCount = 0;
        this.updates.push([]);
        if (this.inputImageData) {

            for (var i=0; i<this.inputImageData.length; i++) {
                if ((i-3)%4 == 0) { // alpha
                  this.updates[this.updates.length -1].push(255);
                } else {
                  this.updates[this.updates.length -1].push((255 - this.updates[this.updates.length - 2][i]));
                }
            }
        }
    }

    public greyscale() {
        if (this.outputImageData) {
            this.updateCount = 0;
            this.updates.push([]);
            for (var i=0; i<this.outputImageData.length; i+=4) {
                let avg = Math.floor((this.outputImageData[i] + this.outputImageData[i+1] + this.outputImageData[i+2])/3);
                for (var j=0; j<3; j++) {
                  this.updates[this.updates.length -1].push(avg);
                }
                this.updates[this.updates.length -1].push(255);
            }
        }
    }

    public undo() {
        if (this.updates.length > 1) {
            this.isReverseOperation = true;
            this.updateCount = 0;
            this.updates = [this.updates[this.updates.length - 2], this.updates[this.updates.length - 1]];
        } else {
            console.log('no');
        }
    }

    public resetImage() {
        if (this.updates.length > 1) {
            this.isReverseOperation = true;
            this.updateCount = 0;
            this.updates = [this.updates[0], this.updates[this.updates.length - 1]];
        } else {
            console.log('no');
        }
    }

    public brighten(percentage: number = 0) {   // -100 to 100
        if (this.inputImageData) {
            this.updateCount = 0;   // begin animation
            this.updates.push([]);
            const multiplier = ((percentage + 100) / 100);
            console.log("RECEIVED", percentage);
            console.log("MULTIPLIER", multiplier);
            for (var i=0; i<this.inputImageData.length; i++) {
                if ((i-3)%4 == 0) { // alpha
                  this.updates[this.updates.length -1].push(255);
                } else {
                    let newValue = this.updates[this.updates.length - 2][i]*multiplier;
                    newValue = newValue > 255 ? 255 : newValue;
                    this.updates[this.updates.length -1].push(newValue);
                }
            }
        }
    }

    public contrast() {
        if (this.inputImageData) {
            this.updateCount = 0;   // begin animation
            this.updates.push([]);
            for (var i=0; i<this.inputImageData.length; i++) {
                if ((i-3)%4 == 0) { // alpha
                    this.updates[this.updates.length -1].push(255);
                } else {
                    // TODO do per pixel, not per colour component, i.e. get average brightness
                    const multiplier = this.updates[this.updates.length - 2][i] > 128 ? 1.2 : 0.8; 
                    this.updates[this.updates.length -1].push(this.updates[this.updates.length - 2][i]*multiplier);
                }
            }
        }
    }
}
