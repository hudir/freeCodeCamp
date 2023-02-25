// First-In First-Out
function Queue() {
    var collection = [];
    this.print = function() {
      console.log(collection);
    };

    this.enqueue = function(){
        for(let i = 0 ; i < arguments.length; i ++){
            collection = [...collection, arguments[i]]
        }
    }

    this.dequeue = function() {
        first = collection[0]
        collection = collection.filter((x,i)=> i != 0)
        return first
    }
   
}