# elioUtils.js

utilities i always needed

making my own librarie

## contains
- class Vector
- function utilities

## TODO (someday will contain)
- class Canvas like [p5.js](p5js.org) 
    * but without 34.387 gloval methods and libraries and anoying console messages
- class Box
- class Range ??

## Usage
index.html
```html

    <script src="yourScript.js" type="module">


```

yourScript.js
```js
import {Vector as V} from "./path/elioUtils.js"

let v = new V(3,4)

console.log(v.module())//output 5
```

