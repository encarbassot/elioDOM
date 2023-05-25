


const elioUtils = {}



////////////////// ARRAYS ///////////////////////

/**
 * given a 2D array returns a NxM matrix from the position x,y top left corner
 * result is given in a 1D array
 */
elioUtils.getNine = function(grid,x,y,n=3,m=undefined){
    let result = []

    if(m==undefined){
        m=n
    }

    if(n==1&&m==1){
        return [grid[y][x]]
    }

    for(let i=y;i<y+m;i++){
        for(let j=x;j<x+n;j++){
            result.push(grid[i][j])
        }
    }

    return result
}


//from a grid sum all neighbours
elioUtils.getNineSum = function(grid,x,y,n=3){
    let result = 0//[]
    if(m==undefined){
        m=n
    }

    if(n==1&&m==1){
        return grid[y][x]
    }

    for(let i=y;i<y+m;i++){
        for(let j=x;j<x+n;j++){
            result+=grid[i][j]
        }
    }

    return result//.reduce((acc,x)=>acc+x,0)
}



/*
zip([1, 2, 3], [4, 5, 6], [7, 8, 9]) 
Output: [[1, 4, 7], [2, 5, 8], [3, 6, 9]]

zip([1, 2, 3], [4, 5, 6]) 
Output: [[1, 4], [2, 5], [3, 6]]

zip([1, 2, 3], [4, 5, 6, 7], [8, 9, 10]) 
Output: [[1, 4, 8], [2, 5, 9], [3, 6, 10]]
*/
elioUtils.zip = function() {
    let result = [];
    let arrays = Array.from(arguments);
  
    // Check if all arguments are arrays
    if (!arrays.every(arg => Array.isArray(arg))) {
      console.error(`Error: All arguments must be arrays`);
      return;
    }
  
    // Find the length of the shortest array
    let minLength = Math.min(...arrays.map(arg => arg.length));
  
    // Iterate over the indices of the shortest array
    for (let i = 0; i < minLength; i++) {
      let innerResult = [];
  
      // Iterate over each argument array
      for (let j = 0; j < arrays.length; j++) {
        innerResult.push(arrays[j][i]);
      }
  
      result.push(innerResult);
    }
  
    return result;
  }


  /* CREATE 2D ARRAY
x -> number of rows (first dimension)
y -> number of columns (second dimenson)
examples
	create2Darray(2,2)			->	[[undefined,undefined],[undefined,undefined]]	//gets you an array filled with undefineds
	create2Darray(2,2,'a') 		-> 	[["a","a"],["a","a"]]					//fill with value
	create2Darray(2,1,'a') 		-> 	[["a","a"]]								//first value is number of rows
	create2Darray(1,2,'a') 		-> 	[["a"],["a"]] 							//second value is number of columns
	create2Darray(2,2, ()=>'b') ->	[["b","b"],["b","b"]]					//function as a filler
	create2Darray(2,4, i=>i )	->	[[[0,1],[2,3],[4,5],[6,7]]				//one indice get numeric order
	create2Darray(2,2, (j,i)=>j+'/'+i) 	  ->[["0/0","1/0"],["0/1","1/1"]]	//two indices gets column and row
	create2Darray(2,2, a=>a+1, true) 	  ->[[ƒ, ƒ],[ƒ, ƒ]] 				//in case you want an array of identical functions
	create2Darray(2,2,(j,i)=>new Array()) ->[[[],[]],[[],[]]]				//in case you want a 3D array
																			//in case you want a 4D array ... and so on
	create2Darray(2,2,(j,i)=>create2Darray(2,2)) ->[[[[null,null],[null,null]],[[null,null],[null,null]]],[[[null,null],[null,null]],[[null,null],[null,null]]]]
*/
elioUtils.create2Darray = function(x,y,filler=undefined,fillWithFunctions=false){
    console.log();
    let grid = new Array();
    for (var i = 0; i < y; i++) {
      grid.push(new Array());
      for (var j = grid[i].length; j <x ; j++) {
        grid[i].push(getFiller(j,i,x,filler,fillWithFunctions))
      }
    }
    return grid;
}




/*
make a 2D array bigger to satisfy the (x & y)
example enlargeGrid([4][4],3,5) => [4][5]
*/
elioUtils.enlargeGrid = function(grid,x,y,filler=undefined){
    //helper function to  <enlargeGrid> & <create2Darray>
    function getFiller(j,i,x,filler,fillWithFunctions){
        if(typeof(filler)=='function'&&!fillWithFunctions){
        if(filler.length==1){
            return filler(j+i*x);
        }
        return filler(j,i);
        }
        return filler;
    }

    //pushRows
    for (var i = gridy; i <y ; i++) {
      grid.push([])
    }
    //refill rows
    for (var i = 0; i < grid.length; i++) {
      for (var j = grid[i].length; j <x ; j++) {
        grid[i].push(getFiller(j,i,x,filler,fillWithFunctions))
      }
    }
    return grid
}


/* ROTATE AND FLIP MMATRIX
rotate(matrix) -> rotate clockwise            [must be SQUARE]
rotate(matrix,1) -> rotate clockwise          [must be SQUARE]
rotate(matrix,2) -> halfRotation 180          [must be SQUARE]
rotate(matrix,3) -> rotate counterclockwise   [must be SQUARE]
rotate(matrix,4) -> flip horizontal
rotate(matrix,5) -> flip vertical
rotate(matrix,6) -> flip diagonal  /          [must be SQUARE]
rotate(matrix,7) -> flip diagonal \           [must be SQUARE]

*/
elioUtils.rotate90 = function(grid,orientation=1,w=undefined,z=undefined){
    let aux;
    w = w??grid.length-1
    z = z??0
    if(w<=0)return//sisze 0 or size 1 //not interested
    if(orientation<=3||orientation==6||orientation==7){//must be square
      if(grid.length!=grid[0].length)return;
    }
    switch (orientation) {
      case 1:
        for(let i=0;i<w;i++){
          aux = grid[z][z+i]//topLeft
          grid[z][z+i]=grid[w+z-i][z]//topLeft = bottomLeft
          grid[w+z-i][z]=grid[w+z][w+z-i]//bottomLeft=bottomRight
          grid[w+z][w+z-i]=grid[z+i][w+z]//bottomRight=topRight
          grid[z+i][w+z]=aux//topRight=topLeft
        }
        break;
      case 2:
        for(let i=0;i<w;i++){
          aux =grid[z][z+i]
          grid[z][z+i]=grid[w+z][w+z-i]//topLeft = bottomRight
          grid[w+z][w+z-i]=aux
          aux = grid[z+i][w+z]
          grid[z+i][w+z] = grid[w+z-i][z]
          grid[w+z-i][z] = aux
        }
        break;
  
      case 3:
        for(let i=0;i<w;i++){
          aux=grid[z+i][w+z]//topLeft
          grid[z+i][w+z]=grid[w+z][w+z-i]//topRight=bottomRight
          grid[w+z][w+z-i]=grid[w+z-i][z]//bottomRight=bottomLeft
          grid[w+z-i][z]=grid[z][z+i]//bottomLeft=topLeft
          grid[z][z+i]=aux//topLeft = topRight
        }
        break;
      case 4:
        for(let i=0;i<grid.length;i++){
          for(let j=0;j<grid[i].length/2;j++){
            aux = mat[i][grid[i].length-j-1]
            mat[i][grid[i].length-j-1]=mat[i][j]
            mat[i][j] = aux
          }
        }
        break;
      case 5:
        for(let j=0;j<grid[0].length;j++){
          for(let i=0;i<grid.length/2;i++){
            aux = mat[grid.length-i-1][j]
            mat[grid.length-i-1][j]=mat[i][j]
            mat[i][j] = aux
          }
        }
        break;
      case 6:
        for(let i=0;i<w;i++){
          for(let j=0;j<w-i;j++){
            aux=mat[i][j]
            mat[i][j]=mat[w-j][w-i]
            mat[w-j][w-i]=aux
          }
        }
  
        break;
      case 7:
        for(let i=0;i<w;i++){
          for(let j=i+1;j<w+1;j++){
            aux = mat[i][j]
            mat[i][j]=mat[j][i]
            mat[j][i] = aux
          }
        }
  
        break;
      default:
        return;
    }
  
  
    if(orientation<=3){
      rotate90(grid,orientation,w-2,z+1)
    }
  }
  

  
////////////////// ARRAYS ///////////////////////
  


////////////////// CANVAS ///////////////////////


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


////////////////// CANVAS ///////////////////////





////////////////// COLORS ///////////////////////



//random color in hexadecimal ->  '#6F75DD'
elioUtils.randomColor = function() {
    return '#'+randInt(16777215).toString(16).toUpperCase() //could use changeBase()
}

/*random color in HSL
  sat  -> fix saturation for the result [0;100]
  light-> fix lightness for the result [0;100]
  examples
    randomColorHSL()      ->  'hsl(18,77,55)'
    randomColorHSL(10)    ->  'hsl(55,10,70)'
    randomColorHSL(21,30) ->  'hsl(78,21,30)'
    randomColorHSL(25,95,40,50) ->  'hsl(78,[25;95],[40,50])'
*/
elioUtils.randomColorHSL = function(sat=undefined,light=undefined,hue=undefined) {

    const getRandomNumber = (value,n=100) => {
        if (typeof value === 'number') {
          return value;
        } else if (Array.isArray(value)) {
          const [min, max] = value;
          return elioUtils.random(min,max);
        } else {
          return elioUtils.random(n)
        }
    };
    
    const h = getRandomNumber(hue,250)
    const s = getRandomNumber(sat,100)
    const l = getRandomNumber(light,100)

    return `hsl(${h},${s}%,${l}%)`
}

elioUtils.hsl = function(hue,saturation=100,lightness=50){
    return `hsl(${hue%255}, ${bound(0,100,saturation)}%, ${bound(0,100,lightness)}%)`
}

// input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,1]
elioUtils.hsv2hex = function(h,s,v){                              
    let f= (n,k=(n+h/60)%6) => Math.round((v - v*s*Math.max( Math.min(k,4-k,1), 0))*255).toString(16).toUpperCase();
    return '#'+f(5)+f(3)+f(1)
}   

//INVERT COLOR '#56789A'->'#a98765'
elioUtils.invertColor = function(hex){
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    return '#'+chunkString(hex,2).map(ch=>(255-parseInt(ch, 16)).toString(16)).join('').toUpperCase()
}

//if color is dark you get white as response
//if color is light you get black as response
elioUtils.contrastColor = function(hex){
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
  
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  
   return (r * 0.299 + g * 0.587 + b * 0.114) > 186
          ? '#000000'
          : '#FFFFFF';
}


elioUtils.getComplementaryColor = function (hexColor) {
    // Remove the # symbol if it exists
    hexColor = hexColor.replace("#", "");
  
    // Convert the hexadecimal color to RGB
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
  
    // Calculate the complement of each color channel
    const compR = 255 - r;
    const compG = 255 - g;
    const compB = 255 - b;
  
    // Convert the complementary RGB values back to hexadecimal
    const compHexColor = "#" + ((1 << 24) + (compR << 16) + (compG << 8) + compB).toString(16).slice(1);
  
    return compHexColor;
  }
  

////////////////// COLORS ///////////////////////




////////////////// DOM ///////////////////////
elioUtils.getWebTitle = function (url){
  // Make a GET request to the URL
  fetch(url)
    .then(response => {
      // If the response is successful, parse the HTML
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(html => {
      // Parse the HTML and extract the title
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const title = doc.querySelector('title').textContent;
      
      // Return the title
      return title;
    })
    .catch(error => {
      console.error('Error fetching web title:', error);
    });
}

elioUtils.isTouchDevice = function() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0));
}

elioUtils.createElement = function(type, content, parent, attributes) {
  
  const element = document.createElement(type);
  
  if (content instanceof HTMLElement) {
    element.appendChild(content);
  } else if (typeof content === 'string') {
    element.innerHTML = content;
  }
  
  if (parent instanceof HTMLElement) {
    console.log("APPEND")
    parent.appendChild(element);
  }
  
  if (attributes && typeof attributes === 'object') {
    for (let attr in attributes) {
      if (attributes.hasOwnProperty(attr)) {
        element.setAttribute(attr, attributes[attr]);
      }
    }
  }
  
  return element;
}

elioUtils.urlify = function(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url) {
    return '<a href="' + url + '">' + url + '</a>';
  })
  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
}


//COPY TEXT TO CLIPBOARD
elioUtils.copyToClipboard = function(text){
  //https://stackoverflow.com/a/33928558/11168839
  if(navigator.clipboard.writeText)//focus must be on document
    return navigator.clipboard.writeText(text);

  if (window.clipboardData && window.clipboardData.setData)
      // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
      return window.clipboardData.setData("Text", text);

  if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
    var textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
        return document.execCommand("copy");  // Security exception may be thrown by some browsers.
    }
    catch (ex) {
        console.warn("Copy to clipboard failed.", ex);
        return prompt("Copy to clipboard: Ctrl+C, Enter", text);
    }
    finally {
        document.body.removeChild(textarea);
    }
  }
}

elioUtils.getURL = function(){
  return window.location.protocol + "//" + window.location.host + window.location.pathname
}
  

//getUrlParams()        //--> retrun a object with all params in url
elioUtils.getUrlParams = function (url) {
    // http://stackoverflow.com/a/23946023/2407309
    if (typeof url == 'undefined') {
        url = window.location.search
    }
    var url = url.split('#')[0] // Discard fragment identifier.
    var urlParams = {}
    var queryString = url.split('?')[1]
    if (queryString) {
      queryString.split('&').map(p=>{
        let pair = p.split('=')
        urlParams[pair[0]]=decodeURIComponent(pair[1].replace(/\+/g, ' '))
      })
    }
    return urlParams
}


elioUtils.goToURL = function(url){
    let a = document.createElement('A')
    a.style.display="none"
    a.href=url
    document.body.appendChild(a)
    a.click()
}

//convert   <nbsp>5</nbsp>      into    <nbsp>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nbsp>
//for an easy alignament of the elements
elioUtils.convertNBSP = function(){
    let nbsp = document.getElementsByTagName('nbsp')
    for (var i = 0; i < nbsp.length; i++) {
      //read and replace all the nbsp
      nbsp[i].innerHTML="&nbsp;".repeat(parseInt(nbsp[i].innerHTML))
    }
}


elioUtils.isHTML = function(value, view) {
    //https://stackoverflow.com/a/68279789/11168839
    if (value instanceof HTMLElement) return true
    if (view && value instanceof view.HTMLElement) return true
    return !!(
      value &&
      typeof value === 'object' &&
      value !== null &&
      value.nodeType === 1 &&
      typeof value.nodeName === 'string'
    )
}

/* arr -> array of strings // each string specify the querrySelector*/
/* arr -> array of strings // each string specify the querrySelector*/
elioUtils.makeDOM = function(arr){
  if(typeof(arr)=='string')arr=[arr]
  let result ={}
  for (var elem of arr) {
      let str=elem.replace('#','').replace('.','')
      // result[str]=getElemByStr(elem)
      result[str]=document.querySelector(elem)
  }
  return result;
}


elioUtils.getElemByStr = function(elem){
    let e = document.getElementById(elem)
    if(e==null){
      e = document.getElementsByClassName(elem)
      if(e==null){
        e = document.getElementsByTagName(elem)
        if(e==null){
          e = document.querySelector(elem)
        }
      }
    }
    return e
}

/*

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
*/
elioUtils.highlight = function(dom){
    console.log(dom);
    dom.classList.add('highlight')//highlight for 5 seconds
    setTimeout(function(){dom.classList.remove('highlight')},5000)
}

elioUtils.scrollToCenter = function(dom){
    let actualScroll=window.scrollY
    let pageHeight = window.innerHeight/2
    let distance = dom.offsetTop
    let height = dom.offsetHeight/2
    if(height>pageHeight)
      return dom.scrollIntoView()
    window.scrollBy(0,height+distance-pageHeight-actualScroll)
}

// get cursor position in textarea
elioUtils.getInputSelection = function(el) {
  var start = 0, end = 0, normalizedValue, range, textInputRange, len, endRange;

  if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
      start = el.selectionStart;
      end = el.selectionEnd;
  } else {
      range = document.selection.createRange();

      if (range && range.parentElement() == el) {
          len = el.value.length;
          normalizedValue = el.value.replace(/\r\n/g, "\n");

          // Create a working TextRange that lives only in the input
          textInputRange = el.createTextRange();
          textInputRange.moveToBookmark(range.getBookmark());

          // Check if the start and end of the selection are at the very end
          // of the input, since moveStart/moveEnd doesn't return what we want
          // in those cases
          endRange = el.createTextRange();
          endRange.collapse(false);

          if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
              start = end = len;
          } else {
              start = -textInputRange.moveStart("character", -len);
              start += normalizedValue.slice(0, start).split("\n").length - 1;

              if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                  end = len;
              } else {
                  end = -textInputRange.moveEnd("character", -len);
                  end += normalizedValue.slice(0, end).split("\n").length - 1;
              }
          }
      }
  }

  return {
      start: start,
      end: end
  };
}

//GET IP, location and more
elioUtils.getIpData = async function () {
  
  let myObject = await fetch("https://ipapi.co/json");
  let myText = await myObject.text();
  let data = await JSON.parse(myText)
  return data
//fetch("https://ipapi.co/json")
//.then(x => x.text())
//.then(y=> console.log(y))
}

// function getPosition(element) {
//   var clientRect = element.getBoundingClientRect();
//   return {left: clientRect.left + document.body.scrollLeft,
//           top: clientRect.top + document.body.scrollTop,
//           width: element.offsetWidth,
//           height: element.offsetHeight
//       };
// }


  // //socket.js

  // let _obj={msg:"stock"}
  // let _send=false;
  // let _interval=100
  // function Socket(room,callback){
  
  //   this.room=room;
  //   this.recived=callback;
  //   // this.send=false;
  //   this.obj={msg:"stock"}
  //   this.interval=100;
  
  //   SocketService.init( room, socket => {
  //     socket.on( 'newMsg', callback)
  //     socket.on( 'room-joined', room => {
  //       console.log( `socket joined ${ room }` )
  //       again()
  //     } )
  
  //     function again(){
  //       if(_send){
  //         // console.log("send:",_obj);
  //         _send=false
  //         socket.emit("newMsg",_obj)
  //       }
  //       setTimeout(again,_interval);
  //     }
  
  //   } )
  
  //   this.send=function(obj){
  //     _send=true;
  //     _obj=obj;
  //   }
  // }

  // //STACK-OVERFLOW
  // //https://es.stackoverflow.com/questions/315536/c%c3%b3mo-disparar-un-event-listener-con-una-funci%c3%b3n-virtualmente
  // //SOCKET SERVICE of
  // //https://socketservice.herokuapp.com/



////////////////// DOM ///////////////////////




////////////////// eQuery///////////////////////


elioUtils.eQuery = function (selector){
    
    if(typeof(selector)=="function"){
        document.addEventListener("DOMContentLoaded",selector)
        return
    }
    
    const self={
        element:document.querySelector(selector),
        html:()=>self.element,
        on:(eventName,callback)=>{
            self.element.addEventListener(eventName,callback)
        },
        hide:()=>{
            self.element.style.display="none"
        },
        attr:(name,value = undefined)=>{
            if(value==undefined){
                return self.element.getAttribute(name)
            }else{
                self.element.setAttribute(name,value)
            }
        },
        ready:(fn)=>{
            self.element.addEventListener("DOMContentLoaded",fn)
        }



    }

    return self

}


////////////////// eQuery///////////////////////




////////////////// FILE ///////////////////////


elioUtils.readFile = async function(filename){
    const response = await fetch(filename)
    const text = await response.text()
    return text
}

//download a file with a text value
elioUtils.fileDownload = function (filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}




/*FILE INPUT MAKER
  dom     -> an HTML DOM element
  callback-> a callback to recive file contents
  dragable-> if dont want to recive files by drag&drop

  USSAGE
    HTML:   <input type="file" id="files" multiple />
    JS:     let input = document.getElementById("fileInput")
            makeFileInput(input,(files)=>{
              console.log(files)
            })
*/
elioUtils.makeFileInput = function (dom,callback,dragable=true){
    if(!isHTML(dom))return
    dom.onchange=(event)=>fileUploadHandler(event,callback)
    dom.ondrop=(event)=>fileUploadHandler(event,callback)
    if(dragable)
      dom.addEventListener('dragover', evt=>{
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
      }, false);
  }
  
  
  
  /*MULTIPLE FILE INPUT
  ussage
    HTML:     <input type="file" id="files" multiple />
    JS:     document.getElementById('files').onchange=(event)=>multipleFileUploadedHandler(event,file_handler_function)
    callback-> function that recive 1 parameter, an array of strings (each string is one file)
  */
elioUtils.fileUploadHandler = function (evt,callback){
    console.log(evt);
    if(['drop','change','dragover'].includes(evt.type)){
      evt.stopPropagation();
      evt.preventDefault();
      if(evt.type=='dragover')return
    }
    let files = evt.currentTarget.files??evt.dataTransfer.files;
    let readers = [];
    if(!files.length) return;
    for(let i = 0;i < files.length;i++){
        readers.push(readFileAsText(files[i]));
    }
    // Trigger Promises
    Promise.all(readers).then((values) => {
        // Values will be an array that contains an item
        // with the text of every selected file
        // ["File1 Content", "File2 Content" ... "FileN Content"]
        callback(values)
    });
}
  
  
  //helpper for <fileUploadHandler()> & <makeFileInput>
elioUtils.readFileAsText = function(file){
      return new Promise((resolve,reject)=>{
          let fr = new FileReader();
          fr.onload = ()=>{
            file.content = fr.result
            resolve(file);};
          fr.onerror = ()=>{reject(fr);};
          fr.readAsText(file);
      })
  }


////////////////// FILE ///////////////////////





////////////////// MATH ///////////////////////


//Great comon divider
//ES: Maximo Comun Divisor MCD
elioUtils.gcd = function(a, b){
    return (b == 0)
        ? a
        : gcd(b, a % b)
}

// Returns LCM of array elements Least Comon Multiple
// ES: Minimo comun multiplo MCD
elioUtils.lcm = function(arr) {
    // Initialize the LCM with the first element in the array
    let ans = arr[0];
    for (let i = 1; i < arr.length; i++) {
        // Update the LCM by computing the product of the current element and the LCM,
        // and then dividing by the GCD of the current element and the LCM
        ans = (arr[i] * ans) / gcd(arr[i], ans);
    }
    return ans;
}

elioUtils.simb = function(n){
    return n>0?1:-1
}

elioUtils.changeBase = function(num,fromBase,toBase){
    let decimal = parseInt(num,fromBase)
    return decimal.toString(toBase).toUpperCase()
}

elioUtils.round = function(num,precission){
    const factor = 10**precission
    return Math.round(num*factor)/factor
}

/**
 * Generates a random number between two values (inclusive).
 * 
 * random()      -> returns random float between 0 and 1
 * random(7)     -> returns random float between 0 and 7
 * random(7,true)-> returns random int between 0 and 6
 * random(2,8)   -> returns random floor between 2 and 8
 * random(2,8,true) -> returns random int between 2 and 7
 * 
 * @param {Number} [min=0] - The lower limit of the range.
 * @param {Number} [max=1] - The upper limit of the range.
 * @param {Boolean} [floor=false] - If true, returns an integer.
 * @returns {Number} A random number between min and max (inclusive). If floor is set to true, returns an integer.
 */
elioUtils.random = function() {
    let values = Array.from(arguments).filter(x => typeof x === "number");
    let floor = false;
    if (values.length > 0) {
      floor = typeof arguments[arguments.length - 1] === "boolean" ? arguments[arguments.length - 1] : false;
    }
  
    let min = 0;
    let max = 1;
    if (values.length === 1) {
      max = values[0];
    } else if (values.length >= 2) {
      min = values[0];
      max = values[1];
    }
  
    let result = Math.random() * (max - min) + min;
    return floor ? Math.floor(result) : result;
}

elioUtils.intLength = function(num){
    return (num==0)
        ? 1
        : Math.floor(Math.log10(num))+1 
}

elioUtils.minMax = function(a,b){
    //const [min,max] = minMax(x,y)
    return (a>b) ? [b,a] : [a,b]
}

//Normalizes a value to be between 0 and 1.
elioUtils.normalize = function(value, min, max){
    return (value - min) / (max - min);
}
    
//start:int
//end:int
//amt:% (0..1)
//@returns the amount
elioUtils.lerp = function (start, end, amt){
    return (1-amt)*start+amt*end
}

//lerp(a, b, t) = x
//@returns the percentage
elioUtils.inverseLerp = function(a, b, x){
    return (x - a) / (b - a);
}

//Linear interpolation between two angles
elioUtils.lerpAngle = function(a, b, t){
    let d = b - a;
    if (d > Math.PI) d -= 2 * Math.PI;
    if (d < -Math.PI) d += 2 * Math.PI;
    return a + d * t;
}

//Maps a value from one range to another
elioUtils.map = function(value, inMin, inMax, outMin, outMax){
    return lerp(outMin, outMax, inverseLerp(inMin, inMax, value));
}

elioUtils.clamp = function(value, min, max){
    return Math.min(Math.max(value, min), max);
}

//given two ranges returns the amount that overlaps
// 0..7  5..9 -> 5..7 -> 2
elioUtils.overlappingLength = function(start1, end1, start2, end2){
    if (end1 < start2 || end2 < start1){
        return 0;
    }else{
        return Math.min(end1, end2) - Math.max(start1, start2);
    }
}


//bit operators
elioUtils.getBit = function(number, bitPosition) {
    return (number & (1 << bitPosition)) === 0 ? 0 : 1;
}
elioUtils.setBit = function(number, bitPosition) {
    return number | (1 << bitPosition);
}
elioUtils.clearBit = function(number, bitPosition) {
    const mask = ~(1 << bitPosition);
    return number & mask;
}
elioUtils.updateBit = function(number, bitPosition, bitValue) {
    const bitValueNormalized = bitValue ? 1 : 0;
    const clearMask = ~(1 << bitPosition);
    return (number & clearMask) | (bitValueNormalized << bitPosition);
}

//PID
elioUtils.PID = function(desiredValue, currentValue,kp=0.01,ki=0.0001,kd=0.03) {

    // Variables for PID controller
    let prevError = 0;
    let integral = 0;
    
    // Calculate error between desired value and current value
    const error = desiredValue - currentValue;
    
    // Calculate PID output
    const proportional = kp * error;
    integral += ki * error;
    const derivative = kd * (error - prevError);
    const output = proportional + integral + derivative;
    
    // Update previous error for next iteration
    prevError = error;
    
    // Return the new value for the next frame
    return currentValue + output;
}



////////////////// MATH ///////////////////////





////////////////// STRING ///////////////////////


/*
* Split string on chunks of n characters
* example:
*   chunkString('abcdefghi',4,true) =>['abcd', 'efgh', 'i']
*   chunkString('abcdefghi',2) => ['ab', 'cd', 'ef', 'gh']
*/
elioUtils.chunkString = function(string,chunkLength=2,remainder=false){
    let result =[]
    let a=0,b=chunkLength
    while (a<string.length) {
        if(b<=string.length || remainder){
            result.push(string.substring(a,b));
        }
        a+=chunkLength
        b+=chunkLength
    }
    return result;
} 

elioUtils.levenshteinDistance = function(str1 = '', str2 = ''){
    const track = Array(str2.length + 1).fill(null).map(() =>
    Array(str1.length + 1).fill(null));
    for (let i = 0; i <= str1.length; i += 1) {
       track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
       track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
       for (let i = 1; i <= str1.length; i += 1) {
          const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
          track[j][i] = Math.min(
             track[j][i - 1] + 1, // deletion
             track[j - 1][i] + 1, // insertion
             track[j - 1][i - 1] + indicator, // substitution
          );
       }
    }
    return track[str2.length][str1.length];
  };
  //console.log(levenshteinDistance(str1, str2));

elioUtils.bytesToHuman = function(n=0){
    const units = ["B","KB","MB","GB","TB"]
    let i = 0
    while(Math.log2(n)>10){
      n/=1024
      i++
    }
    return Math.round(n*100)/100+units[i]
}

elioUtils.beginsWith = function(text,coincidence){
    if(coincidence.length>text.length)
      return false
    
    for(let i=0;i<coincidence.length;i++){
      if(text[i]!=coincidence[i]){
        return false
      }
    }
    return true;
  }
  
  //generate a random code

elioUtils.genCode = function(n){
    const charset="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result=""
    for(let i=0;i<n;i++){
      result+=charset[Math.floor(Math.random()*charset.length)]
    }
    return result;
  }


////////////////// STRING ///////////////////////





////////////////// TIME ///////////////////////


elioUtils.Timer = class{
    constructor(){
        this.start()
    }
    
    start(){
        const d = new Date()
        this.timestamp = d.getTime()
        return this.timestamp
    }

    end(){
        const d = new Date()
        return d.getTime() - this.timestamp
    }
}


function lerpTimeout(a, b, step, time, callback) {
    const startTime = Date.now();
    let currentValue = a;
    callback(a)
    
    const intervalId = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = elapsedTime / time;
      if (progress >= 1) {
        clearInterval(intervalId);
        callback(b);
        return;
      }
      
      currentValue = lerp(a, b, progress);
      callback(currentValue);
      
    }, step);
    
    function lerp(start, end, progress) {
      return start + (end - start) * progress;
    }
  }
  

////////////////// TIME ///////////////////////


/////////////////// UTILS

// elioUtils.parseParams(params,options){

// }







///////////////// UTILS
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


