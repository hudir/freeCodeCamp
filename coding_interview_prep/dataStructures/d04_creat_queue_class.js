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
        const first = collection[0]
        collection = collection.filter((x,i)=> i != 0)
        return first
    }

    this.front = function() {
        return collection[0]
    }

    this.size = function() {
        return collection.length
    }

    this.isEmpty = function() {
        return collection.length === 0 ? true : false
    }
   
}

const instance = new Queue()
instance.enqueue(1, 2, 3, 4)
instance.print()

instance.enqueue(5)
instance.print()

console.log(instance.dequeue());
instance.print()