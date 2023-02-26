class CircularQueue {
    constructor(size) {
  
      this.queue = [];
      this.read = 0;
      this.write = 0;
      this.max = size - 1;
  
      while (size > 0) {
        this.queue.push(null);
        size--;
      }
    }
  
    print() {
      return this.queue;
    }
  
    enqueue(item) {
      if (this.queue[this.write]  == null) {
        this.queue[this.write] = item        
        this.write < this.queue.length -1 ? this.write++ :  this.write = 0
        return item
      }
      return null
    }
  
    dequeue() {
      if(this.write === this.read && this.queue[this.read + 1] == null) return null
      let takeOutItem = this.queue[this.read]
      this.queue[this.read] = null
      this.read < this.queue.length - 1 ? this.read++ : this.read = 0
      return takeOutItem
    }
}

const instan = new CircularQueue(5);

console.log( instan.enqueue(1));
instan.enqueue(2)

console.log(instan.dequeue());
console.log(instan.print());