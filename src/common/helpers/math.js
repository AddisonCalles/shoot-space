export const random = (max, min) => Math.random() * (max - min) + min;

export const angleBetweenPoints = (p1, p2) => Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

export const vectorComponents = (direction, velocity) => {
    const radians = direction * Math.PI / 180;
    return { x: (velocity * Math.cos(radians)), y: (velocity * Math.sin(radians)) };
}


export const vectorByXY = (vX, vY) => {
    return {vel: Math.abs(((vX ** 2) + (vY ** 2)) ** 1 / 2), dir: Math.atan(vY / vX)}
}
