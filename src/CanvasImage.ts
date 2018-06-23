
export default class CanvasImage {

    public element?: HTMLCanvasElement;
    public context?: CanvasRenderingContext2D;

    public data?: any;

    constructor(id: string) {
        const el = document.getElementById(id) as HTMLCanvasElement;
        if (el) {
            this.element = el;
            const c = this.element.getContext('2d');
            if (c) {
                this.context = c as CanvasRenderingContext2D;
            }
        }
    }

    public drawImage(image: HTMLImageElement) {
        if (!this.context) { return; }

        this.context.drawImage(image, 0, 0);
        this.data = this.context.getImageData(0, 0, image.width, image.height).data;
    }

    public setData(newData: any) {
        this.data = newData;
    }
}
