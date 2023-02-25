function PriorityQueue () {
    this.collection = [];
    this.printCollection = function() {
      console.log(this.collection);
    };

    this.enqueue = function(ele) {
        if (this.collection.length === 0 ) this.collection = [ele]
        else if(this.collection[this.collection.length-1][1] < ele[1]) this.collection = [...this.collection, ele]
        else {
            for (let i = this.collection.length -1; i > -1 ; i--){
                if (this.collection[i][1] < ele[1] || i === 0) {
                    this.collection = [...this.collection.slice(0,i), ele, ...this.collection.slice(i)]
                    break
                }
                if(this.collection[i][1] === ele[1] ) {
                    this.collection = [...this.collection.slice(0,i+1), ele, ...this.collection.slice(i+1)]
                    break
                }
            }
        }
    }

    this.dequeue = function() {
        const first = this.collection[0]
        this.collection = this.collection.slice(1)
        return first[0]
    }

    this.size = function() {
        return this.collection.length
    }
    this.front = function() {
        return this.collection[0][0]
    }
    this.isEmpty = function() {
        return this.collection.length === 0 ? true : false
    }
  
}

const pq = new PriorityQueue()
pq.enqueue(['kitten', 2])
pq.printCollection()

pq.enqueue(['human', 1])
pq.printCollection()
pq.enqueue(['guagua', 3])
pq.enqueue(['guagua2', 3])
pq.printCollection()
pq.enqueue(['xixi', 2])
pq.printCollection()


console.log(pq.dequeue());
pq.printCollection()

console.log(pq.front());





// // Higher priority first
// function PriorityQueue () {
//     this.collection = [];
//     this.printCollection = function() {
//       console.log(this.collection);
//     };

//     this.enqueue = function(ele) {
//         if (this.collection.length === 0 ) this.collection = [ele]
//         else if(this.collection[this.collection.length-1][1] >= ele[1]) this.collection = [...this.collection, ele]
//         else {
//             for (let i = this.collection.length -1; i > -1 ; i--){
//                 if (this.collection[i][1] > ele[1] || i === 0) {
//                     this.collection = [...this.collection.slice(0,i), ele, ...this.collection.slice(i)]
//                     break
//                 }
//                 if(this.collection[i][1] === ele[1] ) {
//                     this.collection = [...this.collection.slice(0,i+1), ele, ...this.collection.slice(i+1)]
//                     break
//                 }
//             }
//         }
//     }

//     this.dequeue = function() {
//         const first = this.collection[0]
//         this.collection = this.collection.slice(1)
//         return first[0]
//     }

//     this.size = function() {
//         return this.collection.length
//     }
//     this.front = function() {
//         return this.collection[0][0]
//     }
//     this.isEmpty = function() {
//         return this.collection.length === 0 ? true : false
//     }
  
// }