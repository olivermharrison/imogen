
export default class CanvasImage {

    element?: HTMLCanvasElement;
    context?: CanvasRenderingContext2D;

    data?: any;

    constructor(id: string) {
        let el = document.getElementById(id) as HTMLCanvasElement;
        if (el) {
            this.element = el;
            let c = this.element.getContext('2d');
            if (c) {
                this.context = c as CanvasRenderingContext2D;
            }
        }
    }

    drawImage(image: HTMLImageElement) {
        if (!this.context) return;
        
        this.context.drawImage(image, 0, 0);
        this.data = this.context.getImageData(0, 0, image.width, image.height).data;
    }

    setData(newData: any) {
        this.data = newData;
    }
}   
