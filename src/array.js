
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
  

