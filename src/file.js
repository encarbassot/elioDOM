export async function readFile(filename){
    const response = await fetch(filename)
    const text = await response.text()
    return text
}

//download a file with a text value
export function fileDownload(filename, text) {
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
export function makeFileInput(dom,callback,dragable=true){
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
export function fileUploadHandler(evt,callback){
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
 function readFileAsText(file){
      return new Promise((resolve,reject)=>{
          let fr = new FileReader();
          fr.onload = ()=>{
            file.content = fr.result
            resolve(file);};
          fr.onerror = ()=>{reject(fr);};
          fr.readAsText(file);
      })
  }