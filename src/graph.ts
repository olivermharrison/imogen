
import CanvasImage from './CanvasImage';
import * as util from './util';

export default class Graph {

    inputImage: HTMLImageElement;
    inputCanvas: CanvasImage;
    outputCanvas: CanvasImage;

    resizedImage: boolean = false;

    constructor() {
        this.inputImage = new Image();
        this.inputCanvas = new CanvasImage('');
        this.outputCanvas = new CanvasImage('');
    }

    init() {
        this.inputCanvas = new CanvasImage('inputCanvas');
        this.outputCanvas = new CanvasImage('outputCanvas');
        this.setInputImage('./logo.png');
    }

    setInputImage(file: string) {
        this.inputImage.src = file;
        this.resizedImage = false;
        this.inputImage.onload = () => {
            if (!this.resizedImage) {
                this.resizedImage = true;
                this.inputImage.src = util.resizeImage(this.inputImage);
                return;
            }
            
            this.inputCanvas.drawImage(this.inputImage);
            this.outputCanvas.drawImage(this.inputImage);
        }
    }

    applyOperation(operation: string) {
        console.log('applying operation ', operation);
    }
}