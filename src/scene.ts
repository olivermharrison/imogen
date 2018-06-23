import * as THREE from 'three';

export default class Scene {
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public renderer: THREE.WebGLRenderer;

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera.position.y = 300;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        // lights
        const ambientLight = new THREE.AmbientLight( 0xffffff );
        this.scene.add( ambientLight );

        var animate = () => {
            requestAnimationFrame( animate );
            this.camera.lookAt( this.scene.position );
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }
}


