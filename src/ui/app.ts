import { Component, Vue } from 'vue-property-decorator';
import Graph from '../graph';

import Operations from './operations/operations.vue';

@Component({
    components: {
        Operations
    }
})
export default class App extends Vue {

    public graph: Graph;

    public showOperations: boolean;

    constructor() {
        super();
        this.showOperations = false;
        this.graph = new Graph();

    }

    public mounted() {
        this.graph.init();
    }

    closeModal(applied: boolean, operation?: string) {
        this.showOperations = false;
        if (applied) {
            this.graph.invert(); // temp
        }
    }

    public applyOperation(operation: string) {
        this.graph.applyOperation(operation);
    }
}
