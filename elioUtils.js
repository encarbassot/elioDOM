import {Vector} from "./src/Vector.js"
// import {Canvas} from "./src/Canvas.js"
import {getNine,getNineSum,zip,create2Darray,enlargeGrid,rotate90} from "./src/array.js"
import {randomColor,randomColorHSL,hsl,invertColor,contrastColor} from "./src/color.js"
import {isTouchDevice,copyToClipboard,getUrlParams,goToURL,convertNBSP,isHTML,makeDOM,getElemByStr,highlight,scrollToCenter} from "./src/dom.js"
import {readFile,fileDownload,makeFileInput,fileUploadHandler} from "./src/file.js"
import {gcd,lcm,simb,changeBase,round,random,intLength,minMax,normalize,lerp,inverseLerp,lerpAngle,map,clamp,overlappingLength,getBit,setBit,clearBit,updateBit} from "./src/math.js"
import {chunkString} from "./src/string.js"


export {Vector,Vector as V}
export {getNine,getNineSum,zip,create2Darray,enlargeGrid,rotate90}
export {randomColor,randomColorHSL,hsl,invertColor,contrastColor}
export {isTouchDevice,copyToClipboard,getUrlParams,goToURL,convertNBSP,isHTML,makeDOM,getElemByStr,highlight,scrollToCenter}
export {readFile,fileDownload,makeFileInput,fileUploadHandler}
export {gcd,lcm,simb,changeBase,round,random,intLength,minMax,normalize,lerp,inverseLerp,lerpAngle,map,clamp,overlappingLength,getBit,setBit,clearBit,updateBit}
export {chunkString}


console.log(
    '%celioUtils.js %chttps://github.com/encarbassot/elioUtils.js/',
    'font-size: 15px; font-weight: bold; color: blue; background-color: yellow; padding: 10px;',
    'color: blue;text-decoration:underline;padding:10px;background:rgba(255,255,255,1)',
);
