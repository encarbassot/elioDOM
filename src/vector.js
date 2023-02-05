export const moduleName ="Vector.js"
import {randomBetween} from "../elioUtils.js"

export class Vector{
    constructor(x=0,y=0){
        //TODO ensure vector
        this.x = x
        this.y = y
    }

    copy(other=undefined){
        if(other){
            this.x=other.x
            this.y=other.y
        }else{
            return new Vector(this.x,this.y)
        }
    }
    values(){
        return [this.x,this.y]
    }

    ///////////////// MODIFICATION /////////////

    random(){
        let values = Array.from(arguments).filter(x=>typeof(x)=="number")
        let floor = false
        if(values.length>0){
            floor = Array.from(arguments).filter(x=>typeof(x)=="boolean")[0] || false
        }

        console.log(values,floor)

        let min = 0
        let max = 1
        if(values.length==1){
            max = values[0]
        }else if(values.length==2){
            min = values[0]
            max = values[1]
        }

        return new Vector(
            randomBetween(min,max),
            randomBetween(min,max)
        )
    }

    max(){
        //this.x = Math.max(n,this.x)
        //stores the highest value
        const maximum = this.ensureVector(arguments)
        const result = new Vector(this.x,this.y)
        if(this.x<maximum.x){
            result.x=maximum.x
        }
        if(this.y<maximum.y){
            result.y=maximum.y
        }
        return result
    }

    min(){
        //this.x = Math.min(n,this.x)
        //stores the lowest value
        const minimum = this.ensureVector(arguments)
        const result = new Vector(this.x,this.y)
        if(this.x>minimum.x){
            result.x=minimum.x
        }
        if(this.y>minimum.y){
            result.y=minimum.y
        }
        return result
    }

    update(x,y){
        this.x=x
        this.y=y
    }
    updateX(x){
        this.x=x
    }
    uptadeY(y){
        this.y=y
    }


    //////RETURN NEW
    map(callback){
        return new Vector(
            callback(this.x,0,this),
            callback(this.y,1,this)
        )
    }


    ///////////// MATH /////////////////////
    add(){
        const v = this.ensureVector(arguments)
        return new Vector(this.x+v.x,this.y+v.y)
    }

    substract(){
        const v = this.ensureVector(arguments)
        return new Vector(this.x-v.x,this.y-v.y)
    }

    mult(){
        const v = this.ensureVector(arguments)
        return new Vector(this.x*v.x,this.y*v.y)
    }

    divide(){
        const v = this.ensureVector(arguments)
        return new Vector(this.x/v.x,this.y/v.y)
    }

    addAll(){
        return this.x+this.y
    }

    module(){
        return Math.sqrt(this.x**2 + this.y**2)
    }

    abs(){
        return new Vector(
            Math.abs(this.x),
            Math.abs(this.y)
        )
    }

    angle(){
        return -Math.atan2(this.y,this.x)
    }




    
    

    ////////////// POLAR MATH ////////////
    toPolar(){
        let r = this.module()
        let theta = -this.angle()
        return [r, theta];
    }
    
    fromPolar(module,angle){
        this.x = module * Math.cos(angle);
        this.y = module * Math.sin(angle);
    }

    // Rotates coordinate system
    // Takes coordinates and alters them as if the coordinate system they're on was rotated
    rotate(angle){
        return new Vector(
            this.x * Math.cos(angle) - this.y * Math.sin(angle),
            this.x * Math.sin(angle) + this.y * Math.cos(angle)
        )
    }



    /////////// COMPARASIONS ///////////

    isInsideRangeX(v1,v2,offset=0){
        //TODO ensure2vectors
        //TODO make sure v1<v2
        return (this.x+offset  <= v2.x) && (this.x-offset >= v1.x)
    
    }

    isInsideRangeY(v1,v2,offset=0){
        //TODO ensure2vectors
        //TODO make sure v1<v2
        return (this.y+offset  <= v2.y) && (this.y-offset >= v1.y)
    
    }

    isInsideBox(v1,v2,offset=0){
        //TODO ensure2vectors
        return this.isInsideRangeX(...arguments) && this.isInsideRangeY(...arguments)
    }
        
    isEquals(){
        const v = this.ensureVector(arguments)
        return this.x == v.x && this.y == v.y
    }

    /**
     * INPUT        OUTPUT
     * V         => V
     * {x:2,y:4} => V2,4
     * 3         => V3,3
     * undefined => V1,1
     * 2,3       => V2,3
     */
    ensureVector(args){
        //TODO maybe they enter a vector and an offset -> return [vector,offset]????
        //TODO ensure2vectors?????

        if(args.length == 1){
            const a = args[0]
            if(a.isVector && a.isVector()){
                return a
            } else if(typeof(a)=="object"){
                if(Array.isArray(a)){
                    if(a.length==2){
                        return new Vector(a[0],a[1])
                    }//ELSE????
                }else if(a.x!=undefined && !isNaN(a.x) && a.y!=undefined && !isNaN(a.y)){
                    return new Vector(a.x,a.y)
                }

            }else if(!isNaN(a)){
                return new Vector(a,a)
            }

        }
        switch(args.length){
            case 0: 
                return new Vector(1,1)
            case 2:
                return new Vector(args[0],args[1])
        }
    }

    isVector(){return true}
}
