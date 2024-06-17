
function createElement(type, content, parent, attributes,events){
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






const $ = (selector) => {

  const {elements,isSingleElement,element} = (()=>{
    if(selector instanceof HTMLElement){
      return {elements:[selector],isSingleElement:true,element:selector}
    }
    const elements = document.querySelectorAll(selector) 
    return {
      elements,
      isSingleElement:elements.length === 1,
      element:elements[0],
    }
  })()

  return {
    createElement,
    elements,

    addClass(className) {
      elements.forEach(element => element.classList.add(className));
      return this;
    },

    removeClass(className) {
      elements.forEach(element => element.classList.remove(className));
      return this;
    },

    setAttr(attr, value) {
      elements.forEach(element => element.setAttribute(attr, value));
      return this;
    },

    getAttr(attr) {
      if (elements.length > 0) {
        return elements[0].getAttribute(attr);
      }
      return null;
    },

    onclick(callback){
      if(typeof callback === "function"){
        elements.forEach((element,i)=>{
          element.addEventListener("click",e=>callback(e,i))
        })
      }
    },

    onchange(callback){
      if(typeof callback === "function"){
        elements.forEach((element,i)=>{
          element.addEventListener("input",e=>callback(e,i))
        })
      }

    },

    hide(){
      elements.forEach(element=>element.classList.add("elioDOM--hide"))
    },
    show(){
      elements.forEach(element=>element.classList.remove("elioDOM--hide"))
    },

    // Add other methods as needed
    // Example: text() method to set/get text content
    text(value) {
      if (value === undefined) {
        // Get the value
        if (elements.length > 0) {
          const element = elements[0];
          if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            return element.value;
          } else {
            return element.textContent;
          }
        }
        return null;
      } else {
        // Set the value
        elements.forEach(element => {
          if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.value = value;
          } else {
            element.textContent = value;
          }
        });
        return this;
      }
    },

    // Example: html() method to set/get innerHTML
    html(value) {
      if (value === undefined) {
        return elements.length > 0 ? elements[0].innerHTML : null;
      } else {
        elements.forEach(element => element.innerHTML = value);
        return this;
      }
    },




    useState(initialValue) {
      if(!isSingleElement){
        console.warn(`useState works only with single element selectors, found: ${elements.length}\n${elements}`)
        return [() => null, () => {}, () => {}];
      }

      this.text(initialValue)

      let value = initialValue
      const listeners = []

      const setValue = (newValue) => {
        if(typeof newValue === "function"){
          newValue = newValue(value)
        }
        value = newValue
        this.text(newValue)
        listeners.forEach(listener => listener(value))
    }
  

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => listeners.splice(listeners.indexOf(listener), 1) //return an unsubscribe function
    }
  
    const getValue = () => value
  
    return [getValue, setValue, subscribe]


    },
    
  };
};



