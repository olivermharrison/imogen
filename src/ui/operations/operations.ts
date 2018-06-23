import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Operations extends Vue {

    public operations = [
        {
            title: 'invert',
            description: 'find the inverse of the colour for each pixel',
        },
        {
            title: 'greyscale',
            description: 'yeah',
        },
        {
            title: 'brighten',
            description: 'yeah',
        },
        {
            title: 'kmeans',
            description: 'find k colours',
        },
        {
            title: 'threshold',
            description: 'yeah',
        }
    ];

    public selected: string = "";

    constructor() {
        super();
    }

    public close(applied: boolean) {
        this.$emit('close', applied, this.selected);
    }
    
    public select(operation: string) {
        this.selected = operation;
    }

}
