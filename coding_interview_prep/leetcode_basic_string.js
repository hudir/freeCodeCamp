// Reverse String
var reverseString = function(s) {
    const len = s.length
    for(let i = len-2; i>=0; i--) {
        s.push(s[i])
    }
    s.splice(0, len-1)
};

//  Reverse Integer
var reverse = function(x) {
    // 1 to string, 2 split 3 revers, 4 join, 5 add minus
  
    const minusZero = x < 0
    x = +Math.abs(x).toString().split('').reverse().join('')
    if (x > 0x7FFFFFFF) return 0
    if(minusZero) x=0-x
    return x
};


// First Unique Character in a String
var firstUniqChar = function(s) {
    const obj = {}
    s.split('').forEach(char => {
        if (obj.hasOwnProperty(char)) obj[char] += 1
        else obj[char] = 0
    }) 
    for (const char in obj) {
        if (obj[char] == 0) return s.split('').indexOf(char)
    } 
    return -1
};

// Valid Anagram
var isAnagram = function(s, t) {
    const objs = {}, objt = {}
    s.split('').forEach(char => {
        if (objs.hasOwnProperty(char)) objs[char] += 1
        else objs[char] = 1
    }) 
    t.split('').forEach(char => {
        if (objt.hasOwnProperty(char)) objt[char] += 1
        else objt[char] = 1
    }) 
    for (const char in objs) {
        if (!objt.hasOwnProperty(char) || objs[char] !== objt[char]) return false
        delete objt[char]
    }
    if (Object.keys(objt).length === 0 ) return true
    return false
    
};

// Valid Palindrome
var isPalindrome = function(s) {
    const arr = s.toLowerCase().split('').filter(char=> (/[a-z0-9]/.test(char)))
    console.log(arr)
    for(let i = 0; i< arr.length/2; i++) {
        if( arr[i] != arr[arr.length - 1 - i] ) return false
    }
    return true
};

// String to Integer (atoi)
var myAtoi = function(s) {
    const arr = s.trimStart().split('')
    let num = []
    let negative = arr[0] == '-'
    if (arr[0]=='+' || arr[0]=='-') arr.shift()
    
    for(let i = 0; i< arr.length; i++) {
        if(isNaN(+arr[i]) ||arr[i] == ' ') {
            
            break;
            
        } else {
            num.push(arr[i])
        }
    }
    console.log(arr)
    if (num.length === 0) return 0
    let result = +num.join('')
    if (negative) result = 0 - result
    
    if(result < -2147483648) return -2147483648;
    else if (result > 2147483647) return 2147483647;
    
    return result 
};

// Implement strStr()
var strStr = function(haystack, needle) {
    let i = 0
    let res = -1
    while(i<= haystack.length - needle.length && res === -1){
        if (needle === haystack.slice(i, i+needle.length)) {
            res = i
        }
        i++
    }
    return res
    
};


// Longest Common Prefix
var longestCommonPrefix = function(strs) {
    let res = ''
    const minLength = Math.min(...strs.map(x=>x.length))
    
    for(let i = 0; i< minLength; i++) {
        let charToCompair = strs[0][i]
        let check = true
        for(let k = 1; k< strs.length; k++) {
            if (strs[k][i] != charToCompair) {
                check = false
                break;
            }
        }
        if (check) {
            res += charToCompair
        } else {
            break;
        }
            
    }
    return res
};