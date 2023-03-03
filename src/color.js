

////////////////// COLORS ///////////////////////



//random color in hexadecimal ->  '#6F75DD'
elioUtils.randomColor = function() {
    return '#'+randInt(16777215).toString(16).toUpperCase() //could use changeBase()
}

/*random color in HSL
  sat  -> fix saturation for the result [0;100]
  light-> fix lightness for the result [0;100]
  examples
    randomColorHSL()      ->  'hsl(18,77,55)'
    randomColorHSL(10)    ->  'hsl(55,10,70)'
    randomColorHSL(21,30) ->  'hsl(78,21,30)'
    randomColorHSL(25,95,40,50) ->  'hsl(78,[25;95],[40,50])'
*/
elioUtils.randomColorHSL = function(sat=undefined,light=undefined,hue=undefined) {

    const getRandomNumber = (value,n=100) => {
        if (typeof value === 'number') {
          return value;
        } else if (Array.isArray(value)) {
          const [min, max] = value;
          return elioUtils.random(min,max);
        } else {
          return elioUtils.random(n)
        }
    };
    
    const h = getRandomNumber(hue,250)
    const s = getRandomNumber(sat,100)
    const l = getRandomNumber(light,100)

    return `hsl(${h},${s}%,${l}%)`
}

elioUtils.hsl = function(hue,saturation=100,lightness=50){
    return `hsl(${hue%255}, ${bound(0,100,saturation)}%, ${bound(0,100,lightness)}%)`
}

// input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,1]
elioUtils.hsv2hex = function(h,s,v){                              
    let f= (n,k=(n+h/60)%6) => Math.round((v - v*s*Math.max( Math.min(k,4-k,1), 0))*255).toString(16).toUpperCase();
    return '#'+f(5)+f(3)+f(1)
}   

//INVERT COLOR '#56789A'->'#a98765'
elioUtils.invertColor = function(hex){
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    return '#'+chunkString(hex,2).map(ch=>(255-parseInt(ch, 16)).toString(16)).join('').toUpperCase()
}

//if color is darck you get white as response
//if color is light you get black as response
elioUtils.contrastColor = function(hex){
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
  
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  
   return (r * 0.299 + g * 0.587 + b * 0.114) > 186
          ? '#000000'
          : '#FFFFFF';
}



////////////////// COLORS ///////////////////////


