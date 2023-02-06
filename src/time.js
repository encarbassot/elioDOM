
export class Timer{
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