# elioVector

### usage
index.html
```<script src="myScript.js type="module></script>```

myScript.js
```js
    import {V} from "./path/to/elioUtils.js"

    const myVector = new V(3,4)
    console.log( myVector.module() )
    //output: 5
```

## methods

### copy()
makes a copy of itself
```js
    const v = new V(5,5)
    const b = v.copy()
    console.log(v.x,b.x)
    //output: 5, 5
    b.x = 6
    console.log(v.x,b.x)
    //output: 5, 6
```

or copies another object to itself

```js
    const v = new V(4,5)
    const b = new V(6,7)
    console.log(v.x,b.x)
    //output: 4, 6
    b.copy(v)
    console.log(b.x,b.y)
    //output: 5, 5
```

### values()
return an Array with length==2
```js
    const v = new V(4,5)
    const [x,y] = v.values()
    console.log(x,y)
    //output: 4, 5
```

### random()
returns a new vector random
**RETURN:** *new Vector*
```js
    const v = new V().random()
    console.log(v.x,v.y)
    //output: 0.3534, 0.8345
    // two random values between [0,1)  (0 inclusive, 1 exclusive)

    const b = new V().random(13)
    console.log(b.x,b.y)
    //output: 5.2635, 12.998
    // two random values between [0,13)

    const b = new V().random(10,20)
    console.log(b.x,b.y)
    //output: 12.38472, 19.231478
    // two random values between [10,20)
```

### max() and min()

this function accepts [multiple imput types](#multiple-input-types)
replies the usage of Math.max()
*this functions returns a new vector*

```js
    const v = new V(-5,17)
    let x = -5
    let y = 17

    x = Math.max(10,x)  //x = -5
    x = Math.max(0,x)   //x = 0

    const a = v.max(10) //a.x = -5
    const b = v.max(0)  //b.x = 0

    y = Math.min(y,20)  //y = 17
    y = Math.min(y,10)  //y = 10

    const c = v.min(20) //c.y = 17
    const d = v.min(10) //c.y = 10
```
### update() updateX() and updateY()
updates the value
*no returns, this function modifies the values of the current vector*
```js
    const v = new V(4,5)
    const v.update(5,6)
    //v.x = 5    v.y = 6

    const v.updateX(8)
    //v.x = 8    v.y = 6

    const v.updateY(12)
    //v.x = 8    v.y = 12
```

### map()
just like array.map()
it takes a function and that is called 2 times
**RETURN:** *new Vector*

```js
    const v = new V(4,5)
    const mult = v.map((n)=>n*30)
    const mult2 = v.mult(30)
    //mult and mult2 are equals

    const example = v.map((n,i,vector)=>{
        if(i==0){//is X
            return 27*n
        }else{// i = 1 when Y
            return 26*n
        }
    })
```
function map is meant to be used in more sofisticated cases

### add() substract() mult() and divide()
this functions accepts [multiple imput types](#multiple-input-types)
**RETURN:** *new Vector*

### addAll()
this function returns vector.x + vector.y
**RETURN:** *integer*

### module()
this function returns the length of the vector from 0,0
**RETURN:** *integer* √(x²+y²)

### abs()
returns a new vector with x and y poitives
x=-2 converts to x=2
**RETURN:** *new Vector*

### angle()
**RETURN:** *integer*

### toPolar()
**RETURN:** *[modulo,angle]*

### fromPolar()
*no returns*

### rotate()
**RETURN:** *new Vector*

### isInsideRangeX() and isInsideRangeY()
**RETURN:** *Boolean*

### isInsideBox()
**RETURN:** *Boolean*

### isEquals()
this function accepts [multiple imput types](#multiple-input-types)
**RETURN:** *Boolean*

### isVector()
**RETURN:** *Boolean*



## Multiple Input Types
this functions accept diferent values as a vector
NOTE: they are waiting for a **vector**
but if other value is suplied they convert it to a vector
All of this is processed by the method **ensureVector()**

examples:

| input | vectorOutput  |
--------|----------------
| ()    | V(1,1) |
| (undefined)    | V(1,1) |
| (2)   | V(2,2) |
| (3,4) | V(3,4)    |
| (V(1,2)) | V(1,2) |
| ({x:2,y:4}) | V(2,4) |
| ([6,9]) | V(6,9)  |


this is usualy applied in functions like [add()](#add-substract-mult-and-divide) where you pass a value
and this is applied to both X and Y

```js
    const v = new V(2,3)

    const a = v.add(3)
    //a.x = 5    a.y = 6

    const b = v.add(2,5)
    //b.x = 4    b.y = 8

    const c = v.add([1,2])
    //c.x = 3    c.y = 5

    const d = v.add({x:8,y:3})
    //d.x = 10    d.y = 6

    const u = new V(7,8)
    const e = v.add(u)
    //e.x = 9    e.y = 11


```