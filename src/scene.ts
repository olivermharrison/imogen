import * as THREE from 'three';

export default class Scene {
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public renderer: THREE.WebGLRenderer;

    public radius: number = 200;
    private theta: number = 0;

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera.position.y = this.radius;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        // lights
        const ambientLight = new THREE.AmbientLight( 0xffffff );
        this.scene.add( ambientLight );
    }

    update() {
        this.theta += 0.2;
        this.camera.position.x = this.radius * Math.sin( THREE.Math.degToRad( this.theta ) );
        this.camera.position.z = this.radius * Math.cos( THREE.Math.degToRad( this.theta ) );
        this.camera.lookAt( this.scene.position );
        this.renderer.render(this.scene, this.camera);
    }
}


