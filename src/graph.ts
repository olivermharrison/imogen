import * as THREE from 'three';
var TWEEN = require('@tweenjs/tween.js');

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
            TWEEN.update();
        };
        animate();
    }

    public init() {
        this.inputCanvas = new CanvasImage('inputCanvas');
        this.outputCanvas = new CanvasImage('outputCanvas');
        this.setInputImage('./example-images/color.jpg');
    }

    public update() {
        
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

    public applyOperation(operation: any) {
        console.log('applying operation ', operation);

        let isReverseOperation = false;
        switch (operation.title) {
            case "invert":
                this.invert();
                break;
            case "greyscale": 
                this.greyscale();
                break;
            case "undo":
                isReverseOperation = true;
                this.undo();
                break;
            case "reset":
                isReverseOperation = true;
                this.resetImage();
                break;
            case "brighten":
                this.brighten(parseInt(operation.value));
                break;
            case "contrast":
                this.contrast();
                break;
            default:
                break;
        }

        this.applyUpdate(isReverseOperation);
    }

    public applyUpdate(isReverseOperation: boolean) {
        if (this.updates.length > 1) {
            let output = this.outputCanvas!.context!.createImageData(this.inputImage.width,this.inputImage.height);
            const source = isReverseOperation ? this.updates[this.updates.length-1] : this.updates[this.updates.length-2];
            const target = isReverseOperation ? this.updates[this.updates.length-2] : this.updates[this.updates.length-1];

            util.animateImage(source, target, {
                duration: 1500, 
                update: (d: any[]) => {
                    for (let i=0; i<d.length; ++i) {
                        output.data[i] = d[i];  // cant assign whole array...
                        if (i%(4*Particles.divisor) === 0) {
                            const position = new THREE.Vector3(d[i] - 128, d[i+1] - 128, d[i+2] - 128);
                            (this.particles!.particles.geometry as any).vertices[i/(4*Particles.divisor)] = position;
                        }
                    }
                    this.outputCanvas!.context!.putImageData(output , 0, 0 );
                    (this.particles!.particles!.geometry as any).verticesNeedUpdate = true;
                }
            });
        }
    }

    public invert() {
        this.updates.push([]);
        for (var i=0; i<this.inputImageData!.length; i++) {
            if ((i-3)%4 == 0) { // alpha
              this.updates[this.updates.length -1].push(255);
            } else {
              this.updates[this.updates.length -1].push((255 - this.updates[this.updates.length - 2][i]));
            }
        }
    }

    public greyscale() {
        this.updates.push([]);
        for (var i=0; i<this.outputImageData!.length; i+=4) {
            let avg = Math.floor((this.outputImageData![i] + this.outputImageData![i+1] + this.outputImageData![i+2])/3);
            for (var j=0; j<3; j++) {
                this.updates[this.updates.length -1].push(avg);
            }
            this.updates[this.updates.length -1].push(255);
        }
    }

    public undo() {
        if (this.updates.length > 1) {
            this.updates = [this.updates[this.updates.length - 2], this.updates[this.updates.length - 1]];
        } else {
            console.log('no');
        }
    }

    public resetImage() {
        if (this.updates.length > 1) {
            this.updates = [this.updates[0], this.updates[this.updates.length - 1]];
        } else {
            console.log('no');
        }
    }

    public brighten(percentage: number = 0) {   // -100 to 100
        this.updates.push([]);
            const multiplier = ((percentage + 100) / 100);
            for (var i=0; i<this.inputImageData!.length; i++) {
                if ((i-3)%4 == 0) { // alpha
                  this.updates[this.updates.length -1].push(255);
                } else {
                    let newValue = this.updates[this.updates.length - 2][i]*multiplier;
                    newValue = newValue > 255 ? 255 : newValue;
                    this.updates[this.updates.length -1].push(newValue);
                }
            }
    }

    public contrast() {
        this.updates.push([]);
        for (var i=0; i<this.inputImageData!.length; i++) {
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
