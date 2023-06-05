function Stack() {
    var collection = [];
    this.print = function() {
      console.log(collection);
    };

    this.push = function() {
        for(let i =0 ; i < arguments.length; i ++){
            collection = [...collection, arguments[i]]
        }
    }

    this.pop = function() {
        const last = collection[collection.length - 1]
        const newCollection = collection.filter((x, i)=> i != collection.length - 1)
        collection = newCollection
        return last
    }

    this.peek = function(){
        return collection[collection.length - 1]
    }

    this.isEmpty = function(){
        return collection.length === 0 ? true : false
    }

    this.clear = function(){
        collection = []
    }
}

const stack = new Stack();
stack.push(1,2,3)
console.log( stack.pop());
stack.print()