
import CanvasImage from './CanvasImage';
import * as util from './util';

export default class Graph {

    public inputImage: HTMLImageElement;
    public inputCanvas: CanvasImage;
    public outputCanvas: CanvasImage;

    public resizedImage: boolean = false;

    constructor() {
        this.inputImage = new Image();
        this.inputCanvas = new CanvasImage('');
        this.outputCanvas = new CanvasImage('');
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

            this.inputCanvas.drawImage(this.inputImage);
            this.outputCanvas.drawImage(this.inputImage);
        };
    }

    public applyOperation(operation: string) {
        console.log('applying operation ', operation);
    }
}
