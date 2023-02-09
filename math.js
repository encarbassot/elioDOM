//Great comon divider
//ES: Maximo Comun Divisor MCD
function gcd(a, b){
    return (b == 0)
        ? a
        : gcd(b, a % b)
}

// Returns LCM of array elements Least Comon Multiple
// ES: Minimo comun multiplo MCD
function lcm(arr) {
    // Initialize the LCM with the first element in the array
    let ans = arr[0];
    for (let i = 1; i < arr.length; i++) {
        // Update the LCM by computing the product of the current element and the LCM,
        // and then dividing by the GCD of the current element and the LCM
        ans = (arr[i] * ans) / gcd(arr[i], ans);
    }
    return ans;
}

function simb(n){
    return n>0?1:-1
}

function changeBase(num,fromBase,toBase){
    let decimal = parseInt(num,fromBase)
    return decimal.toString(toBase).toUpperCase()
}

function round(num,precission){
    const factor = 10**precission
    return Math.round(num*factor)/factor
}

/**
 * Generates a random number between two values (inclusive).
 * 
 * random()      -> returns random float between 0 and 1
 * random(7)     -> returns random float between 0 and 7
 * random(7,true)-> returns random int between 0 and 6
 * random(2,8)   -> returns random floor between 2 and 8
 * random(2,8,true) -> returns random int between 2 and 7
 * 
 * @param {Number} [min=0] - The lower limit of the range.
 * @param {Number} [max=1] - The upper limit of the range.
 * @param {Boolean} [floor=false] - If true, returns an integer.
 * @returns {Number} A random number between min and max (inclusive). If floor is set to true, returns an integer.
 */
function random() {
    let values = Array.from(arguments).filter(x => typeof x === "number");
    let floor = false;
    if (values.length > 0) {
      floor = typeof arguments[arguments.length - 1] === "boolean" ? arguments[arguments.length - 1] : false;
    }
  
    let min = 0;
    let max = 1;
    if (values.length === 1) {
      max = values[0];
    } else if (values.length >= 2) {
      min = values[0];
      max = values[1];
    }
  
    let result = Math.random() * (max - min) + min;
    return floor ? Math.floor(result) : result;
}

function intLength(num){
    return (num==0)
        ? 1
        : Math.floor(Math.log10(num))+1 
}

function minMax(a,b){
    //const [min,max] = minMax(x,y)
    return (a>b) ? [b,a] : [a,b]
}

//Normalizes a value to be between 0 and 1.
function normalize(value, min, max){
    return (value - min) / (max - min);
}
    
//start:int
//end:int
//amt:% (0..1)
//@returns the amount
function lerp (start, end, amt){
    return (1-amt)*start+amt*end
}

//lerp(a, b, t) = x
//@returns the percentage
function inverseLerp(a, b, x){
    return (x - a) / (b - a);
}

//Linear interpolation between two angles
function lerpAngle(a, b, t){
    let d = b - a;
    if (d > Math.PI) d -= 2 * Math.PI;
    if (d < -Math.PI) d += 2 * Math.PI;
    return a + d * t;
}

//Maps a value from one range to another
function map(value, inMin, inMax, outMin, outMax){
    return lerp(outMin, outMax, inverseLerp(inMin, inMax, value));
}

function clamp(value, min, max){
    return Math.min(Math.max(value, min), max);
}

//given two ranges returns the amount that overlaps
// 0..7  5..9 -> 5..7 -> 2
function overlappingLength(start1, end1, start2, end2){
    if (end1 < start2 || end2 < start1){
        return 0;
    }else{
        return Math.min(end1, end2) - Math.max(start1, start2);
    }
}


//bit operators
function getBit(number, bitPosition) {
    return (number & (1 << bitPosition)) === 0 ? 0 : 1;
}
function setBit(number, bitPosition) {
    return number | (1 << bitPosition);
}
function clearBit(number, bitPosition) {
    const mask = ~(1 << bitPosition);
    return number & mask;
}
function updateBit(number, bitPosition, bitValue) {
    const bitValueNormalized = bitValue ? 1 : 0;
    const clearMask = ~(1 << bitPosition);
    return (number & clearMask) | (bitValueNormalized << bitPosition);
}
