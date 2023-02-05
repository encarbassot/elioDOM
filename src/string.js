/*
* Split string on chunks of n characters
* example:
*   chunkString('abcdefghi',4,true) =>['abcd', 'efgh', 'i']
*   chunkString('abcdefghi',2) => ['ab', 'cd', 'ef', 'gh']
*/
export function chunkString(string,chunkLength=2,remainder=false){
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