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

        let theta = 0;
        const radius= 200;
        var animate = () => {
            requestAnimationFrame( animate );
            theta += 0.2;
            this.camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
            this.camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
            this.camera.lookAt( this.scene.position );
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }
}


