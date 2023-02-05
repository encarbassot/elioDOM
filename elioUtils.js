import {Vector as V} from "./src/vector.js"
export {V}

console.log("hello from elio utils 3")

export const test = "HOLA from elioUtils.js"



export function simb(n){
    return n>0?1:-1
}
export function round(num,precission){
    const factor = 10**precission
    return Math.round(num*factor)/factor
}

export function randomBetween(min, max){
    let a = Math.min(min,max)
    let b = Math.max(min,max)
    return Math.random() * (b - a) + a;
}


export function polarToCartesian(r, theta){
    let x = r * Math.cos(theta);
    let y = r * Math.sin(theta);
    return [x, y];
}
//export function cartesianToPolar:(x, y){
//     let r = Math.sqrt(x * x + y * y);
//     let theta = Math.atan2(y, x);
//     return [r, theta];
// }
export function cartesianToPolar(x1,y1,x2=undefined,y2=undefined){
    let dx,dy
    if(x2==undefined && y2==undefined){
        dx=x1
        dy=y1
    }else{
        dx = x2-x1
        dy = y2-y1
    }
    let r = Math.sqrt(dx * dx + dy * dy);
    let theta = Math.atan2(dy, dx);
    return [r, theta];
}

//Angle between two points
/*
a   c
|  /
| /
|/
b---d
angle(b,d) => 0
angle(b,c) => PI/4
angle(b,a) => PI/2
*/
export function angle(x1, y1, x2, y2){
    return Math.atan2(y2 - y1, x2 - x1);
}

export function radToDegree(rad){
    return rad*180/Math.PI
}
export function degreeToRad(deg){
    return deg/Math.PI*180
}

//Euclidean distance between two points
export function distance(x1, y1, x2, y2){
    let dx = x2 - x1;
    let dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}
    

export function clamp(value, min, max){
    return Math.min(Math.max(value, min), max);
}
//Maps a value from one range to another
export function map(value, inMin, inMax, outMin, outMax){
    return lerp(outMin, outMax, inverseLerp(inMin, inMax, value));
}


//Normalizes a value to be between 0 and 1.
export function normalize(value, min, max){
    return (value - min) / (max - min);
}
    
//start:int
//end:int
//amt:% (0..1)
//@returns the amount
export function lerp (start, end, amt){
    return (1-amt)*start+amt*end
}

//lerp(a, b, t) = x
//@returns the percentage
export function inverseLerp(a, b, x){
    return (x - a) / (b - a);
}

//Linear interpolation between two angles
export function lerpAngle(a, b, t){
    let d = b - a;
    if (d > Math.PI) d -= 2 * Math.PI;
    if (d < -Math.PI) d += 2 * Math.PI;
    return a + d * t;
}

export function overlappingLength(start1, end1, start2, end2){
    if (end1 < start2 || end2 < start1){
        return 0;
    }else{
        return Math.min(end1, end2) - Math.max(start1, start2);
    }
}

