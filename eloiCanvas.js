class ElioCanvas {
    static DEGREES = "DEGREES";
    static RADIANS = "RADIANS";
    static REVOLUTIONS = "REVOLUTIONS";

    static PI = Math.PI
    static HALF_PI = ElioCanvas.PI / 2
    static QUARTER_PI = ElioCanvas.PI / 4
    static TWO_PI = ElioCanvas.PI * 2

    constructor(width, height) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = width || window.innerWidth;
        this.canvas.height = height || window.innerHeight;
        this.ctx = this.canvas.getContext("2d");


        this.degreeMode = ElioCanvas.RADIANS;
        this.looping = true;
        this.frameRequest = null;
        this.preload = () => { };
        this.setup = () => { };
        this.draw = () => { this.noLoop() };
        this.transformStack = []
        this.promisesImg = [] // promises to load images

        //default Values
        this.frameCount = 0
        this.startTimestamp = 0

        this.color = "#FF56FF"
        this._mouseX = 0
        this._mouseY = 0
        this.hasStroke = true
        this.hasPathBegin = false;
        this.hasPathFisrtPoint = false;


        // setup things
        this.appendTo(document.body)

        this.ctx.strokeStyle = this.strokeStyle
        this.canvas.addEventListener("mousemove", (event) => {
            this._mouseX = event.clientX - this.canvas.offsetLeft;
            this._mouseY = event.clientY - this.canvas.offsetTop;
        });
    }

    //SETTERS & GETTERS for canvas and CTX
    set width(w) { this.canvas.width = w }
    get width() { return this.canvas.width }

    set height(h) { this.canvas.height = h }
    get height() { return this.canvas.height }

    get DEGREES() { return ElioCanvas.DEGREES }
    get RADIANS() { return ElioCanvas.RADIANS }

    get PI() { return ElioCanvas.PI }
    get HALF_PI() { return ElioCanvas.HALF_PI }
    get QUARTER_PI() { return ElioCanvas.QUARTER_PI }
    get TWO_PI() { return ElioCanvas.TWO_PI }

    get mouseX() { return this._mouseX }
    get mouseY() { return this._mouseY }

    //COLORING
    background() {
        this.ctx.fillStyle = this.expectingColor(arguments);
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = this.color

    }

    fill() {
        this.color = this.expectingColor(arguments)
        this.ctx.fillStyle = this.color
    }

    noStroke() {
        this.hasStroke = false
    }
    stroke() {
        this.ctx.strokeStyle = this.expectingColor(arguments) || this.color
        this.hasStroke = true
    }
    strokeWeight(weight) {
        this.ctx.lineWidth = weight;
    }

    //SHAPES

    rect(x, y, width, height) {

        if (this.hasStroke) {
            this.ctx.strokeRect(x, y, width, height);
        }
        this.ctx.fillRect(x, y, width, height);
    }
    circle(x, y, rad) {
        this.ctx.beginPath()
        this.ctx.arc(x, y, rad, 0, Math.PI * 2);
        this.ctx.fill()
        if (this.hasStroke) {
            this.ctx.stroke()
        }
    }
    image(image, x, y, width, height) {
        this.ctx.drawImage(image, x, y, width, height);
    }

    line(x, y, x2, y2) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }

    beginPath() {
        if (this.hasPathBegin) {
            console.error("Path already started");
            return;
        }

        this.currentPath = new Path2D();
        this.ctx.beginPath();
        this.hasPathBegin = true;
    }

    vertex() {
        const [x, y] = this.expectingVector(arguments)

        if (this.currentPath == undefined) {
            console.error("Must begin a path before a vertex");
            return;
        }

        if (!this.hasPathFisrtPoint) {
            this.currentPath.moveTo(x, y);
            this.hasPathFisrtPoint = true;
        } else {
            this.currentPath.lineTo(x, y);
        }
    }

    endPath() {
        if (!this.hasPathBegin) {
            console.error("Path not started");
            return;
        }

        this.currentPath.closePath();
        this.ctx.fill(this.currentPath);

        if (this.hasStroke) {
            this.ctx.stroke(this.currentPath);
        }

        this.hasPathBegin = false;
        this.hasPathFisrtPoint = false;
        this.currentPath = undefined;
    }

    makeShape(pointsArr) {
        this.beginPath()
        for (const [x, y] of pointsArr) {
            this.vertex(x, y)
        }
        this.endPath()
    }


    // TRANSLATION & ROTATION

    translate(x, y) {
        this.ctx.translate(x, y);
    }

    rotate(angle) {
        const radians = this.getRadians(angle);
        this.ctx.rotate(radians);
    }


    saveTransform() {
        this.transformStack.push(this.ctx.getTransform())
    }
    restoreTransform() {
        this.ctx.setTransform(this.transformStack.pop())
    }

    //UNITS

    setAngleMode(mode) {
        this.degreeMode = mode;
    }


    //PIXELS
    loadPixels() {
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        return imageData.data;
    }

    updatePixels(pixels) {
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        imageData.data.set(pixels);
        this.ctx.putImageData(imageData, 0, 0);
    }


    mapPixels(callback) {
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const pixels = imageData.data;
        for (let i = 0; i < pixels.length; i += 4) {
            const x = (i / 4) % this.canvas.width;
            const y = Math.floor(i / (this.canvas.width * 4));
            const [_r, _g, _b, _alpha] = callback(x, y, [pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]]);
            pixels[i] = _r;
            pixels[i + 1] = _g;
            pixels[i + 2] = _b;
            pixels[i + 3] = _alpha;
        }
        this.ctx.putImageData(imageData, 0, 0);
    }

    // IMAGE
    image(img, ...args) {
        this.ctx.drawImage(img, ...args)
    }

    // IMAGE LOADING

    loadImage(path) {
        const img = new Image();
        img.src = path;

        const promise = new Promise((resolve, reject) => {
            img.onload = function () {
                resolve(img);
            };

            img.onerror = function () {
                reject(`Error loading image: ${path}`);
            };
        });

        this.promisesImg.push(promise)

        return img;
    }


    //PRELOAD IMAGES

    async preloadCaller(cbck) {
        if (this.preload) {
            this.preload()

            try {
                await Promise.all(this.promisesImg);
                console.log("All images have loaded!");
                cbck();
            } catch (error) {
                console.error(error);
            }
        } else {
            cbck()
        }
    }



    //LOOP

    noLoop() {
        this.looping = false;
        cancelAnimationFrame(this.frameRequest);
    }

    loop() {
        const self = this;
        function loop() {
            //code executed each frame
            self.transformStack = []
            const elapsed = Date.now() - self.startTimestamp
            self.draw(self.frameCount, elapsed); // USER FUNCTION
            self.ctx.setTransform(1, 0, 0, 1, 0, 0);
            self.frameCount++

            if (self.looping) {
                self.frameRequest = requestAnimationFrame(loop);
            }
        }
        loop();
    }

    start() {
        this.preloadCaller(() => {
            //when images are loaded

            this.startTimestamp = Date.now()
            this.setup();
            this.loop();
        })
    }

    //PRELOAD


    //STRICT
    //helper functions for the user to input diferent values, but the function needs it in a specific fromat
    getRadians(value) {
        //transforms untis to the current mode already setted

        if (this.degreeMode === ElioCanvas.DEGREES) {
            return value * (ElioCanvas.PI / 180);
        } else if (this.degreeMode === ElioCanvas.REVOLUTIONS) {
            return value * ElioCanvas.TWO_PI
        }
        return value;
    }

    expectingColor(args) {
        //accept background(grayScale:Number)
        //accept background(red:number,green:Number,blue:Number)
        //accept bacgtound([red:number,green:Number,blue:Number])
        //accept background(hexCode:String)

        if (args.length == 1) {
            if (typeof args[0] == "number") {
                return "#" + args[0].toString(16).padStart(2, "0").repeat(3)
            } else if (typeof args[0] == "string") {
                return args[0]
            } else if (Array.isArray(args[0])) {
                return this.expectingColor(args[0])
            }
        } else if (args.length == 3) {
            return "#" +
                args[0].toString(16).padStart(2, "0") +
                args[1].toString(16).padStart(2, "0") +
                args[2].toString(16).padStart(2, "0")
        }

        return undefined
    }

    expectingVector(args) {
        if (args.length == 1) {
            if (Array.isArray(args[0]) && args[0].length == 2) {
                return args[0]
            } else if (typeof (args[0] == "object") && args[0].hasOwnProperty("x") && args[0].hasOwnProperty("y")) {
                return [args[0].x, args[0].y]
            } else if (typeof (args[0]) == "string" && args[0].split(",").length == 2) {
                return args[0].split(",").map(x => parseFloat(x))
            }

        } else if (args.length == 2) {
            if (typeof (args[0]) == "number" && typeof (args[1]) == "number") {
                return [args[0], args[1]]
            }
        }
        return undefined
    }


    //DOM
    appendTo(element) {
        element.appendChild(this.canvas);
    }

    toDataURL = function (type = "image/png", quality = 1.0) {
        return this.canvas.toDataURL(type, quality);
    };
}

export default ElioCanvas;


// Use the following line of code to set the canvas content on the favicon
//   document.querySelector("head link[rel=icon]").href=cv.toDataURL()
