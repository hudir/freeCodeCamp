// Maximum Depth of Binary Tree
var maxDepth = function(root) {
    if (root == null ) return 0
    
    let leftD = maxDepth(root.left)
    let rightD = maxDepth(root.right)
    
    if (leftD > rightD) return leftD + 1
    else return rightD + 1
   
};


var isValidBST = function(root) {
    return check(root)
    
    function check(node, direction) {
        if (node === null && direction === 'l') return -Infinity
        else if (node === null && direction === 'r') return Infinity
        
        const t1 = node.val > check(node.left, 'l')
        const t2 = node.val < check(node.right, 'r')
        
        return t1 && t2
    }
};

