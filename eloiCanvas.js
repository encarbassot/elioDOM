class CanvasLibrary {
    static DEGREES = "DEGREES";
    static RADIANS = "RADIANS";
  
    constructor(width, height) {
      this.canvas = document.createElement("canvas");
      this.canvas.width = width;
      this.canvas.height = height;
      this.ctx = this.canvas.getContext("2d");
      this.degreeMode = CanvasLibrary.RADIANS;
    }
  
    drawRect(x, y, width, height, color) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x, y, width, height);
    }
  
    drawImage(image, x, y, width, height) {
      this.ctx.drawImage(image, x, y, width, height);
    }
  
    appendTo(element) {
      element.appendChild(this.canvas);
    }
  
    rotate(degrees) {
      const radians = this.getRadians(degrees);
      this.ctx.rotate(radians);
    }
  
    setDegreeMode(mode) {
      this.degreeMode = mode;
    }
  
    getRadians(value) {
      if (this.degreeMode === CanvasLibrary.DEGREES) {
        return value * (Math.PI / 180);
      }
      return value;
    }
  }
  
  export default CanvasLibrary;
  