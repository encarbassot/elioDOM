import {Vector} from "./src/Vector.js"
// import {Canvas} from "./src/Canvas.js"
import {getNine,getNineSum,zip,create2Darray,enlargeGrid,rotate90} from "./src/array.js"
import {randomColor,randomColorHSL,hsl,hsv2hex,invertColor,contrastColor} from "./src/color.js"
import {isTouchDevice,urlify,getUrl,copyToClipboard,getUrlParams,goToURL,convertNBSP,isHTML,makeDOM,getInputSelection,getIpData,getElemByStr,highlight,scrollToCenter} from "./src/dom.js"
import {readFile,fileDownload,makeFileInput,fileUploadHandler} from "./src/file.js"
import {gcd,lcm,simb,changeBase,round,random,intLength,minMax,normalize,lerp,inverseLerp,lerpAngle,map,clamp,overlappingLength,getBit,setBit,clearBit,updateBit} from "./src/math.js"
import {chunkString,beginsWith,genCode,levenshteinDistance,bytesToHuman} from "./src/string.js"
import {Timer} from "./src/time.js"


export {Vector,Vector as V}
export {getNine,getNineSum,zip,create2Darray,enlargeGrid,rotate90}
export {randomColor,randomColorHSL,hsl,hsv2hex,invertColor,contrastColor}
export {isTouchDevice,urlify,getUrl,copyToClipboard,getUrlParams,goToURL,convertNBSP,isHTML,makeDOM,getInputSelection,getIpData,getElemByStr,highlight,scrollToCenter}
export {readFile,fileDownload,makeFileInput,fileUploadHandler}
export {gcd,lcm,simb,changeBase,round,random,intLength,minMax,normalize,lerp,inverseLerp,lerpAngle,map,clamp,overlappingLength,getBit,setBit,clearBit,updateBit}
export {chunkString,beginsWith,genCode,levenshteinDistance,bytesToHuman}
export {Timer,Timer as T}


console.log(
    '%celioUtils.js %chttps://github.com/encarbassot/elioUtils.js/',
    'font-size: 15px; font-weight: bold; color: blue; background-color: yellow; padding: 10px;',
    'color: blue;text-decoration:underline;padding:10px;background:rgba(255,255,255,1)',
);
