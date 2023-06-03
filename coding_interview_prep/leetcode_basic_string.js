// Reverse String
var reverseString = function(s) {
    const len = s.length
    for(let i = len-2; i>=0; i--) {
        s.push(s[i])
    }
    s.splice(0, len-1)
};