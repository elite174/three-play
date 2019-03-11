import React, { useEffect } from 'react';
import { cn } from 'recn';
import * as THREE from 'three';
import { generatePoint, Point, generatePoints } from './Scene.utils';

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
    };

    const drawLines = (scene: THREE.Scene, points: Point[]) => {
        const material = new THREE.LineBasicMaterial({
            color: '#aa00dd'
        });

        for (let point1 of points) {
            for (let point2 of points) {
                if (point1 === point2) {
                    continue;
                }

                const geometry = new THREE.Geometry();

                geometry.vertices.push(
                    new THREE.Vector3(...point1),
                    new THREE.Vector3(...point2),
                );

                const line = new THREE.Line(geometry, material);
                scene.add(line);
            }
        }
    }

    const drawPointLights = (scene: THREE.Scene, points: Point[]) => {
        const sphere = new THREE.SphereBufferGeometry(0.1, 16, 8);
        for (let point of points) {
            const light = new THREE.PointLight(0xff0000, 1, 100);
            light.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff0040 })))
            light.position.set(...point);
            scene.add(light);
        }
    }

    const drawGraph = () => {

        const points = generatePoints(20, 5);

        drawLines(scene, points);
        drawPointLights(scene, points);

    };

    const animate = () => {
        requestAnimationFrame(animate);
        //cube.rotation.x += 0.01;
        //cube.rotation.y += 0.01;
        theta += 0.1;
        camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
        camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
        camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
        camera.lookAt(scene.position);
        camera.updateMatrixWorld(false);
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
        drawGraph();
        animate();
    }

    useEffect(drawScene, []);

    return (
        <div className={cnScene()} ref={sceneRef}>

        </div>
    );
};
