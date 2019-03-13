import React, { useEffect } from 'react';
import { cn } from 'recn';
import * as THREE from 'three';
import { Point, generatePoints, generateVectors } from './Scene.utils';
import { GLTFLoader } from '../Loaders/GLTFLoader/GLTFLoader';

const cnScene = cn('Scene');

export const Scene = () => {
    let scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        renderer: THREE.WebGLRenderer,
        cube: THREE.Mesh,
        theta = 0,
        radius = 10;

    const sceneRef = React.createRef<HTMLDivElement>();

    const initScene = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        sceneRef.current && sceneRef.current.appendChild(renderer.domElement);
        let loader = new (GLTFLoader(THREE))();
        loader.load('models/larek/larek.glb', function (model: any) {
            console.log(model)
            scene.add(model.scene);
        })
        

        var light = new THREE.AmbientLight(0xffffff); // soft white light
        scene.add(light);

        camera.position.z = 10;
        camera.lookAt(scene.position);
    };

    const animate = () => {
        requestAnimationFrame(animate);
        //cube.rotation.x += 0.01;
        //cube.rotation.y += 0.01;
        theta += 0.1;
        camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
        //camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
        camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
        camera.lookAt(scene.position);
        camera.updateMatrixWorld(false);
        renderer.render(scene, camera);
    };

    const drawScene = () => {
        initScene();
        animate();
    }

    useEffect(drawScene, []);

    return (
        <div className={cnScene()} ref={sceneRef}>

        </div>
    );
};
