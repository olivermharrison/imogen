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

    constructor() {
        this.inputImage = new Image();
        this.inputCanvas = new CanvasImage('');
        this.outputCanvas = new CanvasImage('');

        this.scene = new Scene();

        const animate = () => {
            requestAnimationFrame( animate );
            this.scene.update();
        };
        animate();
    }

    public init() {
        this.inputCanvas = new CanvasImage('inputCanvas');
        this.outputCanvas = new CanvasImage('outputCanvas');
        this.setInputImage('./logo.png');
    }

    public setInputImage(file: string) {
        this.inputImage.src = file;
        this.resizedImage = false;
        this.inputImage.onload = () => {
            if (!this.resizedImage) {
                this.resizedImage = true;
                this.inputImage.src = util.resizeImage(this.inputImage);
                return;
            }

            this.inputImageData = this.inputCanvas.drawImage(this.inputImage);
            this.outputImageData = this.outputCanvas.drawImage(this.inputImage);
            if (this.inputImageData) {
                this.particles = new Particles(this.scene.scene, this.inputImageData);
            }
            
        };
    }

    public applyOperation(operation: string) {
        console.log('applying operation ', operation);
    }
}
