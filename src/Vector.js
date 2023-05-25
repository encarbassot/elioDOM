
////////////////// VECTOR ///////////////////////



//this file requires elioUtils/math.js 

elioUtils.Vector = class{
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
            return new elioUtils.Vector(this.x,this.y)
        }
    }
    values(){
        return [this.x,this.y]
    }

    ///////////////// VECTOR MODIFICATION /////////////

    random(){
        let values = Array.from(arguments).filter(x=>typeof(x)=="number")
        let floor = false
        if(values.length>0){
            floor = Array.from(arguments).filter(x=>typeof(x)=="boolean")[0] || false
        }

        let min = 0
        let max = 1
        if(values.length==1){
            max = values[0]
        }else if(values.length==2){
            min = values[0]
            max = values[1]
        }

        return new elioUtils.Vector(
            random(min,max),
            random(min,max)
        )
    }

    max(){
        //this.x = Math.max(n,this.x)
        //stores the highest value
        const maximum = this.ensureVector(arguments)
        const result = new elioUtils.Vector(this.x,this.y)
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
        const result = new elioUtils.Vector(this.x,this.y)
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
        return new elioUtils.Vector(
            callback(this.x,0,this),
            callback(this.y,1,this)
        )
    }


    ///////////// VECTOR MATH /////////////////////
    add(){
        const v = this.ensureVector(arguments)
        return new elioUtils.Vector(this.x+v.x,this.y+v.y)
    }

    substract(){
        const v = this.ensureVector(arguments)
        return new elioUtils.Vector(this.x-v.x,this.y-v.y)
    }

    mult(){// by scalar or dot product
        const v = this.ensureVector(arguments)
        return new elioUtils.Vector(this.x*v.x,this.y*v.y)
    }


    crossProduct() {
        const v = this.ensureVector(arguments)
        return this.x * v.y - this.y * v.x;
    }

    divide(){
        const v = this.ensureVector(arguments)
        return new elioUtils.Vector(this.x/v.x,this.y/v.y)
    }

    addAll(){
        return this.x+this.y
    }

    module(){
        return Math.sqrt(this.x**2 + this.y**2)
    }

    abs(){
        return new elioUtils.Vector(
            Math.abs(this.x),
            Math.abs(this.y)
        )
    }



    
////////////// VECTOR POLAR MATH ////////////

    /*
        c   b
     d  |  /
      \ | /
       \|/
     e--V---a
       /|\
      f g h

        a -> V( 1, 0).angle() => 0         0º
        b -> V( 1, 1).angle() => PI*1/4    45º
        c -> V( 0, 1).angle() => PI*1/2    90º
        d -> V(-1, 1).angle() => PI*3/4    135º
        e -> V(-1, 0).angle() => PI        180º
        f -> V(-1,-1).angle() => -PI*3/4   -135º
        g -> V( 0,-1).angle() => -PI*1/2   -90º
        h -> V( 1,-1).angle() => -PI*1/4   -45º
    */
    angle(){
        return Math.atan2(this.y,this.x)
    }

    toPolar(){
        let r = this.module()
        let theta = this.angle()
        return [r, theta];
    }
    
    fromPolar(module,angle){
        this.x = module * Math.cos(angle);
        this.y = module * Math.sin(angle);
    }

    // Rotates coordinate system
    // Takes coordinates and alters them as if the coordinate system they're on was rotated
    rotate(angle){
        return new elioUtils.Vector(
            this.x * Math.cos(angle) - this.y * Math.sin(angle),
            this.x * Math.sin(angle) + this.y * Math.cos(angle)
        )
    }



    /////////// VECTOR COMPARASIONS ///////////

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
                        return new elioUtils.Vector(a[0],a[1])
                    }//ELSE????
                }else if(a.x!=undefined && !isNaN(a.x) && a.y!=undefined && !isNaN(a.y)){
                    return new elioUtils.Vector(a.x,a.y)
                }

            }else if(!isNaN(a)){
                return new elioUtils.Vector(a,a)
            }

        }
        switch(args.length){
            case 0: 
                return new elioUtils.Vector(1,1)
            case 2:
                return new elioUtils.Vector(args[0],args[1])
        }
    }

    isVector(){return true}
}


//returns the intersection between two lines
// line 1 described as A-B or (a,b)-(c,d)
// line 2 described as C-D or (e,f)-(g,h)
function getIntersection(a,b,c,d,e,f,g,h){
    //https://www.youtube.com/watch?v=fHOLQJo0FjQ&t=871s
    
        let A ,B ,C ,D
    
        if(arguments.length==8){
            A={x:a,y:b}
            B={x:c,y:d}
            C={x:e,y:f}
            D={x:g,y:h}
        }else if(arguments.length==4){
            A=a
            B=b
            C=c
            D=d
        }else{
            console.error('bad input on getIntersection()')
        }
    
    
    
    
    /*
    
    Ix = Ax+(Bx-Ax)t = Cx+(Dx-Cx)u
    Iy = Ay+(By-Ay)t = Cy+(Dy-Cy)u
    
    Ax+(Bx-Ax)t = Cx+(Dx-Cx)u  |-Cx
    Ax-Cx+(Bx-Ax)t = (Dx-Cx)u
    
    Ay+(By-Ay)t = Cy+(Dy-Cy)u |-Cy
    Ay-Cy+(By-Ay)t = (Dy-Cy)u |*(Dx-Cx)
    (Dx-Cx)(Ay-Cy)+(Dx-Cx)(By-Ay)t = (Dy-Cy)(Dx-Cx)u
    (Dx-Cx)(Ay-Cy)+(Dx-Cx)(By-Ay)t = (Dy-Cy)(Ax-Cx)+(Dy-Cy)(Bx-Ax)t     |-(Dy-Cy)(Ax-Cx)
                                                                        |-(Dx-Cx)(By-Ay)t
    (Dx-Cx)(Ay-Cy)-(DY-cy)(Ax-Cx) =(Dy-Cy)(Bx-Ax)t-(Dx-Cx)(By-Ay)t
    (Dx-Cx)(Ay-Cy)-(DY-cy)(Ax-Cx) =t((Dy-Cy)(Bx-Ax)-(Dx-Cx)(By-Ay))
    t = (Dx-Cx)(Ay-Cy)-(DY-cy)(Ax-Cx) / ((Dy-Cy)(Bx-Ax)-(Dx-Cx)(By-Ay))
    */
        const v={}
        v.numeradorT = (D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x)
        v.numeradorU = (C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y)
        v.denominador = (D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y)
    
        v.isParalel = v.denominador==0
        v.intersection={}
        if(!v.isParalel){
            v.t = v.numeradorT/v.denominador
            v.intersection.x=lerp(A.x,B.x,v.t)
            v.intersection.y=lerp(A.y,B.y,v.t)
            v.intersection.insideFirstSegment = v.t>=0 && v.t<=1
    
            v.u = v.numeradorU/v.denominador
            v.intersection.insideSecondSegment = v.u>=0 && v.u<=1
    
            v.intersection.intersects= v.intersection.insideFirstSegment && v.intersection.insideSecondSegment
        }else{
            v.intersection.intersects=false
            v.intersection.insideFirstSegment = false
            v.intersection.insideSecondSegment = false
            
        }
    
        return v
    }


////////////////// VECTOR ///////////////////////


