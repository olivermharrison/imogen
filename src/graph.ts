
import CanvasImage from './CanvasImage';

export default class Graph {

    inputImage: HTMLImageElement;

    inputCanvas?: CanvasImage;
    outputCanvas?: CanvasImage;

    constructor() {
        this.inputImage = new Image();
    }

    mounted() {
        this.inputCanvas = new CanvasImage('inputCanvas');
    }

    setInputImage(file: string) {
        this.inputImage.src = file;
        this.inputImage.onload = function() {
            console.log('image loaded.')
        }
    }

    applyOperation(operation: string) {
        console.log('applying operation ', operation);
    }
}