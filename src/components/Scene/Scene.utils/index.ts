import * as THREE from 'three';

export type Point = [number, number, number];

const simpleProb = (threshold = 0.5) => Math.random() > 0.5;

/**
 * Generates a point within given disance
 * @param distance Maximum point distance
 * @param useNegative Allow negative coordinates
 */
export const generatePoint = (distance = 1, useNegative = false): Point => {
    const point: Point = [Math.random() * distance, Math.random() * distance, Math.random() * distance];

    if (useNegative) {
        for (let i = 0; i < point.length; i++) {
            point[i] = simpleProb ? point[i] : point[i] * -1;
        }
    }

    return point;
}

export const generatePoints = (count: number, distance = 1) => {
    const points = [];
    for (let i = 0; i < count; i++) {
        points.push(generatePoint(distance));
    }

    return points;
}

export const generateVectors = (count: number) => {
    const vectors = [];
    for (let i = 0; i < count; i++) {
        vectors.push(new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1));
    }

    return vectors;
}
