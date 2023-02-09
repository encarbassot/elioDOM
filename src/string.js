


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


