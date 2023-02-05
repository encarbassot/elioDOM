
export function isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0));
}



//COPY TEXT TO CLIPBOARD
export function copyToClipboard(text){
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
  

//getUrlParams()        //--> retrun a object with all params in url
export function getUrlParams (url) {
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


export function goToURL(url){
    let a = document.createElement('A')
    a.style.display="none"
    a.href=url
    document.body.appendChild(a)
    a.click()
}

//convert   <nbsp>5</nbsp>      into    <nbsp>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nbsp>
//for an easy alignament of the elements
export function convertNBSP(){
    let nbsp = document.getElementsByTagName('nbsp')
    for (var i = 0; i < nbsp.length; i++) {
      //read and replace all the nbsp
      nbsp[i].innerHTML="&nbsp;".repeat(parseInt(nbsp[i].innerHTML))
    }
}


export function isHTML(value, view) {
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
export function makeDOM(arr){
    if(typeof(arr)=='string')arr=[arr]
    let result ={}
    for (var elem of arr) {
      result[elem]=getElemByStr(elem)
    }
    return result;
}

export function getElemByStr(elem){
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
export function highlight(dom){
    console.log(dom);
    dom.classList.add('highlight')//highlight for 5 seconds
    setTimeout(function(){dom.classList.remove('highlight')},5000)
}

export function scrollToCenter(dom){
    let actualScroll=window.scrollY
    let pageHeight = window.innerHeight/2
    let distance = dom.offsetTop
    let height = dom.offsetHeight/2
    if(height>pageHeight)
      return dom.scrollIntoView()
    window.scrollBy(0,height+distance-pageHeight-actualScroll)
}