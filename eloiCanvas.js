class ElioCanvas {
    static DEGREES = "DEGREES";
    static RADIANS = "RADIANS";

    static PI = Math.PI
    static HALF_PI = Math.PI/2
    static QUARTER_PI = Math.PI/4
    static TWO_PI = Math.PI*2

    constructor(width, height) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = width || window.innerWidth;
        this.canvas.height = height || window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.degreeMode = ElioCanvas.RADIANS;
        this.looping = true;
        this.frameRequest = null;
        this.setup = function () { };
        this.draw = function () { };
        this.color = "#000000"

        this.appendTo(document.body)

        this.start()
    }


    //COLORING
    background() {
        this.ctx.fillStyle = this.expectingColor(arguments);
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    fill(){
        this.color = this.expectingColor(arguments)
    }

    expectingColor(args){
        if(args.length == 1){
            if(typeof args[0]=="number"){
                return "#"+args[0].toString(16).padStart(2,"0").repeat(3)
            }else if(typeof args[0]=="string"){
                return args[0]
            }
        }else if(args.length == 3){
            return "#"+
                args[0].toString(16).padStart(2,"0") +
                args[1].toString(16).padStart(2,"0") +
                args[2].toString(16).padStart(2,"0")
        }

        console.error("Color specification didnt went well for:",args)
        return "#ff0000"
    }

    //SHAPES

    rect(x, y, width, height) {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(x, y, width, height);
    }

    image(image, x, y, width, height) {
        this.ctx.drawImage(image, x, y, width, height);
    }

    

    // TRANSLATION
    rotate(degrees) {
        const radians = this.getRadians(degrees);
        this.ctx.rotate(radians);
    }

    //UNITS

    setDegreeMode(mode) {
        this.degreeMode = mode;
    }

    getRadians(value) {
        if (this.degreeMode === ElioCanvas.DEGREES) {
            return value * (Math.PI / 180);
        }
        return value;
    }

    //DOM
    appendTo(element) {
        console.log(element)
        element.appendChild(this.canvas);
    }

    //LOOP


    noLoop() {
        this.looping = false;
        cancelAnimationFrame(this.frameRequest);
    }

    loop() {
        const self = this;
        function loop() {
            self.draw();
            if (self.looping) {
                self.frameRequest = requestAnimationFrame(loop);
            }
        }
        loop();
    }

    start() {
        this.setup();
        this.loop();
    }
}

export default ElioCanvas;
