import { Component, Vue } from 'vue-property-decorator';
import Graph from '../graph';


@Component
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

    public applyOperation(operation: string) {
        this.graph.applyOperation(operation);
    }
}
