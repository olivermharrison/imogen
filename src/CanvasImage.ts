
export default class CanvasImage {

    public element?: HTMLCanvasElement;
    public context?: CanvasRenderingContext2D;

    public data?: Uint8ClampedArray;

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

    public drawImage(image: HTMLImageElement): Uint8ClampedArray | undefined {
        if (!this.context) { return undefined; }

        this.context.drawImage(image, 0, 0);
        return this.context.getImageData(0, 0, image.width, image.height).data;
    }
}
