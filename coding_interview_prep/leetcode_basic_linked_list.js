// Delete Node in a Linked List
var deleteNode = function(node) {
    node.val = node.next.val
    node.next = node.next.next
    const delNode = node.next
    delete(delNode)
};

// Remove Nth Node From End of List
var removeNthFromEnd = function(head, n) {
    let len = 0
    let node = head
   
    // get the length of the list
    while(node.next){
        node = node.next
        len++
    }
    let nth = len - n
     
    // delete the head
    if(nth < 0) {
        if(head.next) {
             head.val = head.next.val
             head.next = head.next.next 
             toDel = head.next
             delete(toDel)
             return head
        }
        head = null
        return head
    }
    
    let i = 0
    let res = head
    
    // this is only for if going to delete the last node in list
    if(n == 1) i++
        
    // go to the node before which we want to delete
    while(i <= nth ) {
        res = res.next
        i++
    }
    
    // delete the one not at end
    if(res.next && n != 1) {
        res.val = res.next.val
        res.next = res.next.next 
        toDel = res.next
        delete(toDel)
    // delete the last node 
    } else {
        res.next = null
    }
      
    return head
};


// Reverse Linked List
var reverseList = function(head) {
    let temp = head
    let arr = []
    while(temp){
        arr.push(temp.val)
        temp = temp.next
    }
    temp = head
    for(let i = arr.length - 1; i > -1 ; i--){
        temp.val = arr[i]
        temp = temp.next
    }
    return head
};

//   Merge Two Sorted Lists
var mergeTwoLists = function(list1, list2) {
    const arr= [...getAllNodeValue(list1), ...getAllNodeValue(list2)].sort((a,b)=>a-b)

    if (arr.length ===0) return list1
    let res  = new ListNode()
    let temp = res
    
    for(let i = 0; i < arr.length; i++) {
        temp.val = arr[i]
        temp.next = (i == arr.length -1) ? null : new ListNode()
        temp = temp.next
    }
    return res
    
    function getAllNodeValue(list) {
        const arr= []
        while(list){
            arr.push(list.val)
            list = list.next
        }
        return arr
    }
};

//  Palindrome Linked List

var isPalindrome = function(head) {
    const arr = []
    let tem=head
    while(tem){
        arr.push(tem.val)
        tem = tem.next
    }
    for (let i=0; i<arr.length / 2; i++){
        if(arr[i] != arr[arr.length-1-i]) return false
    }
    return true
    
};

//   Linked List Cycle
var hasCycle = function(head) {
    // are we looking for two nodes that they have same data and next(pointer?)
    let p1 = head, p2 = head
    while(p2 && p2.next){
        p1=p1.next;
        p2=p2.next.next;
        
        if (p1==p2) {
            return true
        }
    }
    
    return false
};