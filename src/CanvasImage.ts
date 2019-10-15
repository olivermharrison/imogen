
export const MAX_WIDTH: number = 250;
export const MAX_HEIGHT: number = 250;

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
        if (image.width <= MAX_WIDTH) {
            this.element!.width = image.width;
        }
        if (image.height <= MAX_HEIGHT) {
            this.element!.height = image.height;
        }
        this.context.drawImage(image, 0, 0);
        return this.context.getImageData(0, 0, image.width, image.height).data;
    }
}
