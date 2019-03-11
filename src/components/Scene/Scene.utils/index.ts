export type Point = [number, number, number];

export const generatePoint = (distance = 1): Point => {
    return [Math.random() * distance, Math.random() * distance, Math.random() * distance];
}

export const generatePoints = (count: number, distance = 1) => {
    const points = [];
    for (let i = 0; i < count; i++) {
        points.push(generatePoint(distance));
    }

    return points;
}
