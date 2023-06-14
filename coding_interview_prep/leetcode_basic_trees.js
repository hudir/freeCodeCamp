// Maximum Depth of Binary Tree
var maxDepth = function(root) {
    if (root == null ) return 0
    
    let leftD = maxDepth(root.left)
    let rightD = maxDepth(root.right)
    
    if (leftD > rightD) return leftD + 1
    else return rightD + 1
   
};


var isValidBST = function(root) {
    if (root == null) return true
    return check(root)

    function check(node, dirction) {
        if(node == null && dirction == 'l') return -Infinity
        else if (node == null && dirction == 'r') return Infinity

        return  node.val > check(node.left, 'l') && node.val < check(node.right, 'r')

    }
}


