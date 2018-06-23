import { Component, Vue } from 'vue-property-decorator';
import Graph from '../graph';
import Scene from '../scene';

@Component
export default class App extends Vue {

    graph: Graph;
    scene: Scene;

    showOperations: boolean;

    constructor() {
        super();
        this.showOperations = false;
        this.graph = new Graph();
        this.scene = new Scene();
    }

    mounted() {
        this.graph.init();
    }

    applyOperation(operation: string) {
        this.graph.applyOperation(operation);
    }
}