import * as THREE from 'three';

export const PARTICLE_Y_OFFSET = 75;
export const PARTICLE_COLOUR_OFFSET = 0.05;

export default class Particles {

    scene: THREE.Scene;
    data: Uint8ClampedArray;

    static divisor: number = 15;

    particles: THREE.Points;

    constructor(scene: THREE.Scene, data: Uint8ClampedArray) {
        this.scene = scene;
        this.data = data;

        let geometry = new THREE.Geometry();
        let sprite = new THREE.TextureLoader().load( "./circle.png" );
        sprite.anisotropy = 0;
        sprite.magFilter = THREE.NearestFilter;
        sprite.minFilter = THREE.NearestFilter;

        let material = new THREE.PointsMaterial({ 
            size: 6,
            vertexColors: THREE.VertexColors, 
            sizeAttenuation: true, 
            map: sprite, 
            alphaTest: 0.5, 
            transparent: false,
        });

        let colors = [];

        for (var i=0; i<this.data.length; i+=Particles.divisor*4) {
            var vertex = new THREE.Vector3();
            vertex.x = this.data[i]-128;
            vertex.y = this.data[i+1]-128 - PARTICLE_Y_OFFSET;
            vertex.z = this.data[i+2]-128;
            geometry.vertices.push( vertex );
    
            let color = new THREE.Color(this.data[i]/255+0.1,this.data[i+1]/255+0.1, this.data[i+2]/255+PARTICLE_COLOUR_OFFSET );
            colors.push(color);
        }

        geometry.colors = colors;


        this.particles = new THREE.Points( geometry, material );
        this.scene.add( this.particles );
    }

    public reset() {
        this.scene.remove(this.particles);
    }
}