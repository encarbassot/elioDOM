

////////////////// MATH ///////////////////////


//Great comon divider
//ES: Maximo Comun Divisor MCD
elioUtils.gcd = function(a, b){
    return (b == 0)
        ? a
        : gcd(b, a % b)
}

// Returns LCM of array elements Least Comon Multiple
// ES: Minimo comun multiplo MCD
elioUtils.lcm = function(arr) {
    // Initialize the LCM with the first element in the array
    let ans = arr[0];
    for (let i = 1; i < arr.length; i++) {
        // Update the LCM by computing the product of the current element and the LCM,
        // and then dividing by the GCD of the current element and the LCM
        ans = (arr[i] * ans) / gcd(arr[i], ans);
    }
    return ans;
}

elioUtils.simb = function(n){
    return n>0?1:-1
}

elioUtils.changeBase = function(num,fromBase,toBase){
    let decimal = parseInt(num,fromBase)
    return decimal.toString(toBase).toUpperCase()
}

elioUtils.round = function(num,precission){
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
elioUtils.random = function() {
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

elioUtils.intLength = function(num){
    return (num==0)
        ? 1
        : Math.floor(Math.log10(num))+1 
}

elioUtils.minMax = function(a,b){
    //const [min,max] = minMax(x,y)
    return (a>b) ? [b,a] : [a,b]
}

//Normalizes a value to be between 0 and 1.
elioUtils.normalize = function(value, min, max){
    return (value - min) / (max - min);
}
    
//start:int
//end:int
//amt:% (0..1)
//@returns the amount
elioUtils.lerp = function (start, end, amt){
    return (1-amt)*start+amt*end
}

//lerp(a, b, t) = x
//@returns the percentage
elioUtils.inverseLerp = function(a, b, x){
    return (x - a) / (b - a);
}

//Linear interpolation between two angles
elioUtils.lerpAngle = function(a, b, t){
    let d = b - a;
    if (d > Math.PI) d -= 2 * Math.PI;
    if (d < -Math.PI) d += 2 * Math.PI;
    return a + d * t;
}

//Maps a value from one range to another
elioUtils.map = function(value, inMin, inMax, outMin, outMax){
    return lerp(outMin, outMax, inverseLerp(inMin, inMax, value));
}

elioUtils.clamp = function(value, min, max){
    return Math.min(Math.max(value, min), max);
}

//given two ranges returns the amount that overlaps
// 0..7  5..9 -> 5..7 -> 2
elioUtils.overlappingLength = function(start1, end1, start2, end2){
    if (end1 < start2 || end2 < start1){
        return 0;
    }else{
        return Math.min(end1, end2) - Math.max(start1, start2);
    }
}


//bit operators
elioUtils.getBit = function(number, bitPosition) {
    return (number & (1 << bitPosition)) === 0 ? 0 : 1;
}
elioUtils.setBit = function(number, bitPosition) {
    return number | (1 << bitPosition);
}
elioUtils.clearBit = function(number, bitPosition) {
    const mask = ~(1 << bitPosition);
    return number & mask;
}
elioUtils.updateBit = function(number, bitPosition, bitValue) {
    const bitValueNormalized = bitValue ? 1 : 0;
    const clearMask = ~(1 << bitPosition);
    return (number & clearMask) | (bitValueNormalized << bitPosition);
}

//PID
elioUtils.PID = function(desiredValue, currentValue,kp=0.01,ki=0.0001,kd=0.03) {

    // Variables for PID controller
    let prevError = 0;
    let integral = 0;
    
    // Calculate error between desired value and current value
    const error = desiredValue - currentValue;
    
    // Calculate PID output
    const proportional = kp * error;
    integral += ki * error;
    const derivative = kd * (error - prevError);
    const output = proportional + integral + derivative;
    
    // Update previous error for next iteration
    prevError = error;
    
    // Return the new value for the next frame
    return currentValue + output;
}



////////////////// MATH ///////////////////////


