import { Component, Vue } from 'vue-property-decorator';
import Graph from '../graph';

// @ts-ignore
import Operations from './operations/operations.vue';
import ImageSelector from './image-selector/image-selector.vue';

@Component({
    components: {
        Operations,
        ImageSelector
    }
})
export default class App extends Vue {

    public graph: Graph;

    public showOperations: boolean = false;
    public showImageSelector: boolean = false;

    constructor() {
        super();
        this.graph = new Graph();

    }

    public mounted() {
        this.graph.init();
    }

    closeModal(applied: boolean, operation: any) {
        console.log('received op', operation);
        this.showOperations = false;
        if (applied) {
            this.applyOperation(operation);
        }
    }

    setImage(filename: any) {
        this.graph.setInputImage(filename);
    }

    public applyOperation(operation: any) {
        this.graph.applyOperation(operation);
    }
}
