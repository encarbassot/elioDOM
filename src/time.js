


////////////////// TIME ///////////////////////


elioUtils.Timer = class{
    constructor(){
        this.start()
    }
    
    start(){
        const d = new Date()
        this.timestamp = d.getTime()
        return this.timestamp
    }

    end(){
        const d = new Date()
        return d.getTime() - this.timestamp
    }
}


function lerpTimeout(a, b, step, time, callback) {
    const startTime = Date.now();
    let currentValue = a;
    callback(a)
    
    const intervalId = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = elapsedTime / time;
      if (progress >= 1) {
        clearInterval(intervalId);
        callback(b);
        return;
      }
      
      currentValue = lerp(a, b, progress);
      callback(currentValue);
      
    }, step);
    
    function lerp(start, end, progress) {
      return start + (end - start) * progress;
    }
  }
  

////////////////// TIME ///////////////////////


