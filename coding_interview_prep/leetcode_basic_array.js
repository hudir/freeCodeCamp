// Remove Duplicates from Sorted Array ###  in-place 
var removeDuplicates = function(nums) {
    let secondPointer = 1
    for (let i = 1; i<nums.length; i++){
        if (nums[i] > nums[i-1]) {
            nums[secondPointer] = nums[i]
            secondPointer++
        }
    }
    return secondPointer
    
};
//  Best Time to Buy and Sell Stock II
var maxProfit = function(prices) {
    let profit = 0
    let buy = prices[0]
    for(let i = 1; i<prices.length; i++){
        if (prices[i] <= buy) {
            // if the price is lower we just update the buy price
            buy = prices[i]
        } else {
            // sell it and make profit
            profit += prices[i] - buy
            // update the buy price
            buy = prices[i]
        }
    }
    return profit
};

// Rotate Array
var rotate = function(nums, k) {
    if(k>0){
        // update k if k is lager then nums.length
        k =  k % nums.length
        nums.unshift(...nums.splice(nums.length - k, k))
    }
};

// Contains Duplicate
var containsDuplicate = function(nums) {
    let res = false;
    for(let i = 0; i < nums.length; i++) {
        for (let k = i + 1; k < nums.length; k++) {
            if(nums[i] == nums[k]) {
                res = true;
                break;
            }   
        }
        if (res) break;
    }
    return res
};
var containsDuplicate = function(nums) {
    let res = false;
    nums = nums.sort();
    for(let i = 0; i < nums.length-1;i++ ){
        if (nums[i]==nums[i+1]){
            res = true;
            break;
        }
    }
    return res
};


// Single Number
var singleNumber = function(nums) {
    nums = nums.sort()
    for(let i = 0; i< nums.length-1; i++){
        if(nums[i] != nums[i+1] && i % 2 != 1) {
            return nums[i]
        }
    }
    return nums[nums.length -1]
    
};

// Intersection of Two Arrays II
var intersect = function(nums1, nums2) {
    nums1 = nums1.sort();
    nums2 = nums2.sort();
    const res = [];
    
    for (let i = 0; i<nums1.length; i++) {
        for (let k = 0; k<nums2.length; k++){
            if(nums1[i] === nums2[k]){
                res.push(nums1[i]);
                // update nums2 arr drop the nums2[k]
                nums2.splice(k,1)
                break;
            }
        }
    }
    return res
};


// Plus One
var plusOne = function(digits) {
    if(digits.length == 0) {
            return [1];
        } 
      
    if(digits[digits.length-1] == 9){
        digits.pop();
        return plusOne(digits).concat([0]) ;
        
    } else {
        digits[digits.length-1] += 1;
        return [...digits];
    }
 };

//  Move Zeroes
var moveZeroes = function(nums) {
    // looping though the array
    // if nums[i] === 0 we do move
    // we need a vari to know, how many digits/ indexes we need move
    if (nums.length < 2) return
    let move = 0
    for(let i = 0; i < nums.length-move; i++) {
        if (nums[i] === 0) {
            move += 1
            nums.splice(i, 1)
            nums.push(0)
            i--
        } 
    }
    
};

// Two Sum
var twoSum = function(nums, target) {
    let index1 = 0
    let index2 = 1
    for(let i = 0; i < nums.length; i++) {
        let wantIndex = nums.indexOf(target - nums[i])
        console.log(wantIndex)
        if (wantIndex != -1 && wantIndex != i) {
            index1 = i
            index2 = wantIndex
            break
        }
    }
    return [index1, index2]
};

var twoSum = function(nums, target) {
    let s = {}
    for(let i = 0; i < nums.length; i++) {
        let want = target - nums[i]
        if(s.hasOwnProperty(want)) {
            return [s[want], i]
        }
        s[nums[i]] = i
    }
};


// Valid Sudoku
var isValidSudoku = function(board) {
    // let's get region
    let r1 = []
    let r2 = []
    let r3 = []
    
    for(let i=0; i<9;i++){    
        // let get collogns
        const collogn = []
       
        for(let k = 0; k <9; k++){
            collogn.push(board[k][i])
            
            if(k / 3 < 1) r1.push(board[k][i])
            else if (k / 3 < 2) r2.push(board[k][i])
            else r3.push(board[k][i])
        }
        
        // check rows and collogn
        if (!check(board[i]) || !check(collogn)) return false 
        
        // check region
        if (r1.length === 9){
            if (!check(r1) || !check(r2) || !check(r3)) return false
            r1 = []
            r2 = []
            r3 = []
        }
    }
    
    return true
    
    // check arr vailidation
    function check(arr){
        const stor = {}
        for(let i = 0; i < arr.length; i++) {
            if(arr[i] != '.'){
                if(stor.hasOwnProperty(arr[i])) return false
                else stor[arr[i]] = true
            }
        }
        return true 
    }
    
};


// Rotate Image
var rotate = function(matrix) {
    len = matrix.length
    for(let i = 0 ; i < len ; i++) {
        matrix[len+i] = []
         for(let k = len -1 ; k >= 0 ; k--) {
             matrix[len+i].push(matrix[k][i])
         }
    }
    matrix.splice(0, len)
};