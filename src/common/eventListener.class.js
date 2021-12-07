export class EventListener{
    #listeners = [];

    constructor(){

    }

    subscribe(listener){
        this.#listeners.push(listener);
    }
    unsubscribe(listener){
        this.#listeners = this.#listeners.filter((inlist)=>inlist !== listener);
    }

    emit(params){
        this.#listeners.forEach((listener)=>listener(params));
    }
}