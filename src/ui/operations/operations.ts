import { Component, Vue } from 'vue-property-decorator';
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

import Modal from '../modal/modal.vue';

@Component({
    components: {
        Modal,
        VueSlider,
    }
})
export default class Operations extends Vue {

    public operations = [
        {
            title: 'invert',
            description: 'find the inverse of the colour for each pixel by subtracting each RGB from 255',
        },
        {
            title: 'greyscale',
            description: 'convert each pixel to a greyscale colour by finding the average of the RGB values',
        },
        {
            title: 'brighten',
            description: 'multiply the RGB values of each pixel by <strong><x></strong>',
            control: 'range',
            min: -100,
            max: 100,
            value: 0,
            units: '%',
        },
        {
            title: "contrast",
            description: "brighten bright pixel & darken dark pixels by <strong><x></strong>",
            control: 'range',
            value: 0,
            min: -100,
            max: 100,
            units: '%',
        },
         /*
        {
            title: "saturation",
            description: "sat ey",
        }
        {
            title: 'threshold',
            description: "set each RGB value to the max (255) if it's above 127, or to 0 if below",
        },
        {
            title: 'kmeans',
            description: 'find k colours that best represent the colour distribution using the k-means clustering algorithm',
        },
        */
    ];

    public selected: any = {
        title: "",
    }

    constructor() {
        super();
        this.selected = this.operations[0];
    }

    public close(applied: boolean) {
        this.$emit('close', applied, this.selected);
    }
    
    public select(operation: any) {
        this.selected = operation;
    }

    public getDescription(operation: any) {
        switch (operation.control) {
            case "range":
                let value = (operation.value.toString() as string).padStart(3, "_");
                value = value.replace(/_/g, "&nbsp;");
                return (operation.description as string).replace('<x>', `${value}${operation.units}`)
                break;
            default:
                return operation.description;
                break;
        }
    }

}
