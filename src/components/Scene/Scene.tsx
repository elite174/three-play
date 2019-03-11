import React, { useEffect } from 'react';
import { cn } from 'recn';
import * as THREE from 'three';

const cnScene = cn('Scene');

export const Scene = () => {
    let scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        renderer: THREE.WebGLRenderer,
        cube: THREE.Mesh;
    const sceneRef = React.createRef<HTMLDivElement>();

    const initScene = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        sceneRef.current && sceneRef.current.appendChild(renderer.domElement);
    };

    const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    };

    const drawCube = () => {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;
    };

    const drawScene = () => {
        initScene();
        drawCube();
        animate();
    }

    useEffect(drawScene, []);

    return (
        <div className={cnScene()} ref={sceneRef}>

        </div>
    );
};
