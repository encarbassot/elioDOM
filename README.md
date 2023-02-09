# elioUtils.js

utilities i always needed

first day and there are 58 diferent functions that i included because i had in different files lying arround, now finaly i'm making the big boy.

making my own librarie

## contains
- class [Vector](./src/Vector.js)
- functions for [Math & Numbers Utils](#math--numbers-utilities)
- functions for [File Utils](#file-utilities)
- functions for [DOM Utils](#dom-utilities)
- functions for [Array Utils](#array-utilities)
- functions for [Color Utils](#color-utilities)
- functions for [String Utils](#string-utilities)

## TODO (someday will contain)
- class [Canvas](./src/Canvas.js) like [p5.js](p5js.org) 
    * but without 34.387 gloval methods and libraries and anoying console messages
- class Box
- class ParametricArguments 
    * (help functions have multiple inputs) like min(1,2,3) min([1,2,3])
- eQuery (jQuery by elio)
- class Range ??
- class Angle ??

## Usage
index.html
```html

    
    <script src="elioUtils/elioUtils.js"></script>

    <script>

      //unpack
      const {Vector:V,lerp} = elioUtils
      let v = new V(3,4)
      v.module() //returns 5

      lerp(5,10,0.5) //returns 7.5

      // or use from the object
      elioUtils.random(3,10)
      //outputs a random value between 3 and 10
  </script>

```

# Math & Numbers Utilities


###### gcd()
*Greatest Common Divisor*
Calculates the greatest common divisor of two integers a and b.


###### lcm()
*Least Common Multiple*
Calculates the least common multiple of an array of integers arr.


###### simb()
Receives a number n and returns its sign: 1 if positive, -1 if negative.


###### change Base()
Converts a number num from one base fromBase to another base toBase. Returns the result in uppercase.


###### round()
Rounds a number num to a given number of decimal places precision.


###### random()
Generates a random number between two values (inclusive). Receives up to 3 arguments: min (defaults to 0), max (defaults to 1), and floor (defaults to false). If floor is true, returns an integer, otherwise returns a float.


###### intLength()
Calculates the length of an integer number num (number of digits).


###### minMax()
Receives two numbers a and b and returns an array with the minimum and maximum values.


###### normalize()
Normalizes a value value within a given range min to max to be between 0 and 1.


###### lerp()
*Linear Interpolation*
Linearly interpolates between two values start and end by a given amount amt (0 to 1).


###### inverseLerp()
Given a range a to b and a value x within the range, returns the percentage (0 to 1) of x within the range.


###### lerpAngle()
Linearly interpolates between two angles a and b by a given amount t (0 to 1).


###### map()
Maps a value value from one range inMin to inMax to another range outMin to outMax.


###### clamp()
Clamps a value value between a minimum min and maximum max.


###### overlappingLength()
Receives two ranges start1 to end1 and start2 to end2 and returns the length of their overlapping range.

# File Utilities

###### readFile(filename)

This function takes a filename as input and returns the contents of the file as a text string.


###### fileDownload(filename, text)

This function takes a filename and text string as input, and downloads a file with the specified filename and content.


###### makeFileInput(dom,callback,dragable=true)

This function creates a file input that allows users to upload files.


###### multipleFileUploadHandler(evt,callback)

This function handles the event of multiple files being uploaded. It takes an event object and a callback function as inputs. The callback function will be passed an array of strings, each representing the contents of one file.

# DOM Utilities

###### isTouchDevice()
Returns a Boolean indicating whether the device is touch enabled or not.

###### urlify()
gets a text as a parameter, and if it founds an URL converts it to an anchor
```js
  urlify("i like https://fabrega.cat/ is a cool website")
  //returns: "i like <a href="https://fabrega.cat/">https://fabrega.cat/</a> is a cool website"
```

###### getURL()
returns a string with complete URL of the site and current page

###### copyToClipboard(text)
Copies the given text to clipboard.


###### getUrlParams(url)
Returns an object with all the parameters present in the given URL. If no URL is provided, it takes the current URL.


###### goToURL(url)
Redirects to the given URL.


###### convertNBSP()
Converts <nbsp> tags with specified number of spaces to actual HTML spaces.


###### isHTML(value, view)
Returns a Boolean indicating whether the value passed is an HTML element or not.


###### makeDOM(arr)
Returns an object with elements specified by the given array of query selectors.


###### getElemByStr(elem)
Returns an element specified by the given query selector.


###### highlight(dom)
Adds a highlight animation to the given DOM element.
```html
<!-- must be included for highlight()-->
<style>
  .highlight {
    background-color: white;
    animation-name: test;
    animation-duration: 5s;
  }
  @keyframes test {
        from {background-color: lightblue;}
        to {background-color: white;}
  }
</style>

```


###### scrollToCenter(element)
Scrolls the given element to the center of the screen instead of the top

###### getInputSelection
get cursor position in textarea

###### getIpData
returns IP information from https://ipapi.co/json


# Array Utilities


###### getNine()
The `getNine` function takes a 2D array `grid`, a position `x` and `y` in the grid, and the dimensions `n` and `m` (defaults to `3`) of the matrix to extract from the top-left corner at `x,y`. It returns a 1D array with the values in the matrix.


###### getNineSum()
The `getNineSum` function takes a 2D array `grid`, a position `x` and `y` in the grid, and the dimension `n` (defaults to `3`) of the matrix to extract from the top-left corner at `x,y`. It returns the sum of all values in the matrix.


###### zip()
The `zip` function takes any number of arrays and returns a new 2D array with the values from each of the input arrays, grouped by index. If the input arrays have different lengths, only the values with corresponding indices up to the length of the shortest input array are included in the result.
```js
zip([1, 2, 3], [4, 5, 6])
//Returns: [(1, 4), (2, 5), (3, 6)]

zip([1, 2, 3], [4, 5, 6, 7])
//Returns: [(1, 4), (2, 5), (3, 6)]

zip([1, 2, 3], [4, 5, 6, 7], [8, 9, 10])
//Returns: [(1, 4, 8), (2, 5, 9), (3, 6, 10)]

zip([list1], [4, 5, 6])
//Returns: []
```


###### create2Darray()
The `create2Darray` function creates a 2D array of given `x` number of rows and `y` number of columns. It optionally takes a value, function, or array to fill the elements of the array, and a flag to indicate if the fill should be an identical function. The function can take one or two arguments to represent the indices of the element, which can be used to fill the array with specific values based on the indices.

```js
//gets you an array filled with undefineds
create2Darray(2,2)			
[[undefined,undefined],[undefined,undefined]]	

//fill with value
create2Darray(2,2,'a') 		
[["a","a"],["a","a"]]					

//first value is number of rows
create2Darray(2,1,'a') 		
[["a","a"]]								

//second value is number of columns
create2Darray(1,2,'a') 		
[["a"],["a"]] 							

//function as a filler
create2Darray(2,2, ()=>'b') 
[["b","b"],["b","b"]]					

//one indice get numeric order
create2Darray(2,4, i=>i )	
[[0,1],[2,3],[4,5],[6,7]]				

//two indices gets column and row
create2Darray(2,2, (j,i)=>j+'/'+i) 	  
[["0/0","1/0"],["0/1","1/1"]]	

//in case you want an array of identical functions
create2Darray(2,2, a=>a+1, true) 	  
[[ƒ, ƒ],[ƒ, ƒ]] 				

//in case you want a 3D array
create2Darray(2,2,(j,i)=>new Array()) 
[[[],[]],[[],[]]]				

//in case you want a 4D array ... and so on
create2Darray(2,2,(j,i)=>create2Darray(2,2)) 
[[[[null,null],[null,null]],[[null,null],[null,null]]],[[[null,null],[null,null]],[[null,null],[null,null]]]]
```



# Color Utilities



###### randomColor()

Generates a random color in HEX format, for example: #6F75DD.

```js
randomColor() // '#6F75DD'
```


###### randomColorHSL(sat, light)

Generates a random color in HSL format, the saturation and lightness can be fixed or random, for example: hsl(18,77,55).

```js
randomColorHSL() // 'hsl(18,77,55)'
randomColorHSL(10) // 'hsl(55,10,70)'
randomColorHSL(21,30) // 'hsl(78,21,30)'
```


###### hsl(hue, saturation, lightness)

Converts a color to HSL format, saturation and lightness values must be between 0 and 100, for example: hsl(255,100,50).

```js
hsl(255,100,50) // 'hsl(255,100,50)'
```

###### hsv2hex()
converts hsv value to hex `#fffff`


###### invertColor(hex)

Inverts a color from HEX format, for example: #56789A becomes #A98765.

```js
invertColor('#56789A') // '#A98765'
```


###### contrastColor(hex)

Returns the contrasting color depending on the brightness of the input color in HEX format. If the color is dark, returns #000000 (black). If the color is light, returns #FFFFFF (white).

```js
contrastColor('#56789A') // '#FFFFFF'
```

# String Utilities


###### chunkString(string, chunkLength, remainder)
**string**: The input string that needs to be split.
**[chunkLength]**: (optional, default is 2) The number of characters in each chunk.
**[remainder]**: (optional, default is false) If set to true, includes the remainder of the string if it can't be divided evenly by chunkLength.

```js
chunkString('abcdefghi',4,true)
//returns: ['abcd', 'efgh', 'i']

chunkString('abcdefghi',2)
//returns: ['ab', 'cd', 'ef', 'gh']
```

###### levenshteinDistance()
Takes two strings as a parameter and return the distance betwen words, 
 - addition costs 1
 - subtraction costs 1
 - change costs 1
```js
levenshteinDistance("hello","mellow")
//Returns 2

levenshteinDistance("hello","bye")
//returns 5
```

###### bytesToHuman()
get a number of bytes as a parameter and return it humanReadable with scale
B,KB,MB,GB,TB

###### beginsWith()
gets two strings as parameter
returns true if the second string is found exactly in the begining of the first string


###### genCode()
generates a random code of length n specified by parameter
