
export default class CanvasImage {

    public element?: HTMLCanvasElement;
    public context?: CanvasRenderingContext2D;

    public data?: Uint8ClampedArray;

    private MAX_WIDTH: number = 250;
    private MAX_HEIGHT: number = 250;

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
        if (image.width <= this.MAX_WIDTH) {
            this.element!.width = image.width;
        }
        if (image.height <= this.MAX_HEIGHT) {
            this.element!.height = image.height;
        }
        this.context.drawImage(image, 0, 0);
        return this.context.getImageData(0, 0, image.width, image.height).data;
    }
}
