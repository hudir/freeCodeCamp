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