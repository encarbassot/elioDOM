# ElioCanvas.js

I made this canvas library with a big inspiration of [p5.js](https://p5js.org)

see the source file [here](./eloiCanvas.js)


## Usage

```js

import ElioCanvas from "./elioCanvas.js"

const cv = new ElioCanvas(400,600)

cv.setup = function (){
    //here code is executed once
    cv.noStroke()
}

cv.draw = function (){
    //here code is executed before every frame
    cv.background(200,200,200)
    cv.circle(cv.mouseX,cv.mouseY,20)
}

//this triggers the signal to run setup and draw
cv.start()

```

## Creating the canvas
```js
    //this creates a canvas 400x600
    const cv = new ElioCanvas(400,600)

    //this creates a canvas full screen
    const cv2 = new ElioCanvas()

    //they are automaticaly appended to body
    //but you can append it to your favourite div
    cv.appendTo(document.getElementById("myDiv"))
```

## Figures
```js

    //create a circle
    const x = 30
    const y = 50
    const radious = 10
    cv.circle(x,y,radious)

    //create a rectangle
    const x = 200
    const y = 170
    const width = 40
    const height = 90
    cv.rect(x,y,width,height)

```

## Coloring
```js
    //background clears the hole screen with a solid color
    cv.background(255,0,0) // paints background red

    cv.fill(0,255,0)// fill sets the inner color for the following figures
    cv.rect(0,0,10,10) // square green

    cv.stroke(0,0,255) //stroke sets de color for the stroke


```
This three functions recieve the same parameters, but you can input almost everything:

```js

    cv.fill("red") 
    cv.fill("blue")
    cv.fill("yellow") 


    cv.fill(255)// white
    cv.fill(100)//grey
    cv.fill(0)//black

    cv.fill(255,0,0)//red
    cv.fill(2255,255,255)//white

    cv.fill("#FF00FF")//pink
    cv.fill("rgb(200,150,30)") //orange

```

## Images

**Loading images:** images are a bit more complex, since they need to be preloaded, for this reason, in order to simplify the code exists the method **preload()**

```js

const cv = new ElioCanvas();
let img1, img2;

cv.preload = function(){
    img1 = cv.loadImage("/images/3dprinter.jpg")
    img2 = cv.loadImage("/images/donut2.png")
}

cv.draw = function (f,millis) {

    cv.background(200,30,0); //red

    cv.image(img1,0,150,300,400)
    cv.image(img2,100,200)

};

cv.start();


```

**Drawing images:**

```js
/*
     img Source                          canvas
    +--------------------------+        +------------------------------------------+
    |    |                     |        |                    |                     |
    |    sy                    |        |                    dy                    |
    |    |                     |        |                    |                     |
    |-sx-+----------+          |        | -------dx--------- +----------+          |
    |    |          |          |        |                    |          |          |
    |    |        sh|          |   ->   |                    |        dh|          |
    |    |    sw    |          |        |                    |          |          |
    |    +----------+          |        |                    |   dw     |          |
    |                          |        |                    +----------+          |
    +--------------------------+        |                                          |
                                        |                                          |
                                        |                                          |
                                        |                                          |
                                        +------------------------------------------+
*/

//cv.image(image, dx, dy);
//cv.image(image, dx, dy, dWidth, dHeight);
//cv.image(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

//Let's say we have an image divided in 4 sectors

let x=0,y=0

//draw the whole image with top corner at(0,0)
cv.image(img, x, y)
//draws the image with original dimentions

//draw the image streched twice with as the original
cv.image(img, x, y, img.widht*2, img.height)

//Draw the top left corner of the image, and represented as 50x50 result
cv.image(img, 0, 0, img.width/2, img.height/2, x, y, 50, 50)

```
[MDN explanation](https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D/drawImage),
[P5js explanation](https://p5js.org/es/reference/#/p5/image)


## Transformations
```js
    //rotates the screen from the top left cornenr
    cv.rotate(cv.PI)

    //to rotate from the center first you have to translate
    cv.translate(cv.width/2,cv.heigth/2)
    cv.rotate(cv.HALF_PI)//rotate 90º

    cv.setAngleMode(cv.DEGREE)
    cv.rotate(-90)


```
but all transformations are acomulative, and this endup being a mess if you have to transform and reverse the transform

```js
    
    cv.translate(cv.width/2,cv.heigth/2)  // now origin 0,0 is at the center
    cv.rotate(cv.QUARTER_PI) //rotate 45º
    rect(-10,-10,20,20)

    cv.restoreTransform() 
    //goes back to the previous savePoint, in there isnt simply restores to the fresh start

    cv.saveTransform()//save state
    cv.translate(cv.width/2,cv.heigth/3*2)
    rect(-20,0,40,20)

    cv.saveTransform() //save again
    cv.rotate(cv.HALF_PI)
    cv.rect(0,0,50,50)

    cv.restoreTransform()// goes back one level
    cv.restoreTransform()// goes back another time 

```

## Animation
```js
    //stop the animation in the function draw
    cv.noLoop()

    //recover the animation in the bucle draw
    cv.loop()

    cv.draw=function(framecount){
        console.log(framecount)
        //every time draw() is called, will increment by 1, starting from 0
    }

```

## Pixels
pixels is an unidimensional array with the values of all pixels in the screen  
***ex:*** `[r1,g1,b1,a1,r2,g2,b2,a2,r3...]`  
take in mind that this loop will execute 30 to 60 times per second, 
and every frame will loop width * height times
this can lower the frame rate a lot if you put lot of code inside
```js

    // Load pixels
    const pixels = cv.loadPixels();

    // Invert pixels
    for (let i = 0; i < pixels.length; i += 4) {
        //get (x,y) position of the pixel
        // const x = (i / 4) % width;
        // const y = Math.floor(i / 4 / width);
        
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        pixels[i] = 255 - r;
        pixels[i + 1] = 255 - r;
        pixels[i + 2] = 255 - b;
    }

    // Update canvas with modified pixels
    cv.updatePixels(pixels);

```
