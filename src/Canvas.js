elioUtils.Canvas = class{
    constructor(){
        this.runningSetup=false
        this.runningDraw=false
        
    }
    
    begin(setupFunc,drawFunc){
        this.setupFunc=setupFunc
        this.drawFunc=drawFunc    
        this.runSetup()
    }

    runSetup(){
        this.runningSetup=true
        this.setupFunc()
        this.runningDraw=true
        this.runDraw()
    }

    runDraw(){
        this.drawFunc()
    }

    nextFrame(){
        if(this.runningDraw) 
            window.requestAnimationFrame(this.drawFunc)
    }

    noLoop(){
        this.runningDraw=false
    }

    loop(){
        this.runningDraw=true
        this.nextFrame()
    }


    error(string1,string2,stringN){//custom console.error
        const result =["%cKanvas error"]
        for (const at of arguments) {
            if(typeof(at)=='string'){
                result.push(at)
            }
        }

        
        const trace = console.trace(result.join('\n'),'color:red;')

    }



    createCanvas(width=200,height=200){
        this.canvas=document.createElement('CANVAS')
        this.canvas.width=width
        this.canvas.height=height
        document.body.appendChild(this.canvas)
        
    }
}