

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


