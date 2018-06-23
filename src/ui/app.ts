import { Component, Vue } from 'vue-property-decorator';
import Graph from '../graph';
import Scene from '../scene';

@Component
export default class App extends Vue {

    public graph: Graph;
    public scene: Scene;

    public showOperations: boolean;

    constructor() {
        super();
        this.showOperations = false;
        this.graph = new Graph();
        this.scene = new Scene();
    }

    public mounted() {
        this.graph.init();
    }

    public applyOperation(operation: string) {
        this.graph.applyOperation(operation);
    }
}
