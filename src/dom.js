

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

elioUtils.createElement = function(type, content, parent, attributes,events){
  const element = document.createElement(type);
  
  const appendContent = (content) => {
    if (Array.isArray(content)) {
      content.forEach(item => appendContent(item));
    } else if (content instanceof HTMLElement) {
      element.appendChild(content);
    } else if (typeof content === 'string') {
      element.innerHTML += content;
    } else if (typeof content === 'function') {
      content(element);
    }
  };

  appendContent(content);
  
  if (parent instanceof HTMLElement) {
    parent.appendChild(element);
  }
  
  if (attributes && typeof attributes === 'object') {
    for (let attr in attributes) {
      if (attributes.hasOwnProperty(attr)) {
        if (attr === 'class') {
          if (Array.isArray(attributes[attr])) {
            attributes[attr].forEach(cls => element.classList.add(cls));
          } else {
            element.classList.add(attributes[attr]);
          }
        } else {
          element.setAttribute(attr, attributes[attr]);
        }
      }
    }
  }

  if (events && typeof events === 'object') {
    for (let eventName in events) {
      if (events.hasOwnProperty(eventName)) {
        element.addEventListener(eventName, events[eventName]);
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


