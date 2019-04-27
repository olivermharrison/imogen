import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';

export default class Scene {
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public renderer: THREE.WebGLRenderer;
    public controls: THREE.OrbitControls;

    public radius: number = 200;
    private theta: number = 0;

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera.position.y = this.radius;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        this.controls = new OrbitControls(this.camera, this.renderer.domElement) as any;
    }

    update() {
        this.theta += 0.2;
        this.camera.position.x = this.radius * Math.sin( THREE.Math.degToRad( this.theta ) );
        this.camera.position.z = this.radius * Math.cos( THREE.Math.degToRad( this.theta ) );
        this.camera.lookAt( this.scene.position );
        this.renderer.render(this.scene, this.camera);
    }
}


