
export default class CanvasImage {

    element: HTMLCanvasElement;

    data?: any;

    constructor(id: string) {
        let el = document.getElementById(id) as HTMLCanvasElement;
        if (el) {
            this.element = el;
        } else {
            console.error('Canvas element not found');
            this.element = document.createElement('canvas');
        }
    }

    setData(newData: any) {
        this.data = newData;
    }
}   
