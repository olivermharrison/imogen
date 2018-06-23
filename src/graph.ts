
import CanvasImage from './CanvasImage';

export default class Graph {

    inputImage: HTMLImageElement;
    inputCanvas: CanvasImage;
    outputCanvas: CanvasImage;

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
        this.inputImage.onload = () => {
            this.inputCanvas.drawImage(this.inputImage);
            this.outputCanvas.drawImage(this.inputImage);
        }
    }

    applyOperation(operation: string) {
        console.log('applying operation ', operation);
    }
}