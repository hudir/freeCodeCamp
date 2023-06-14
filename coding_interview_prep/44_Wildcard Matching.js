var isMatch = function(s, p) {
    s = s.split('')
    p = p.split('')

    let starOn = false, diff = 0
    // if(p.indexOF('*') > -1) {
    //     starOn = true
    // }

    for (let i = 0; i < s.length; i++) {  
        console.log(s[i],p[i-diff])
        if(starOn) {
            if(p[i-diff] === s[i]) {
                starOn = false
            } else {
                diff++
            }
        } else if(p[i-diff] === '*') {
            starOn=true
            if(p[i+1] === s[i]) {
                diff--
            }
        } else if(p[i-diff] === '?') continue
        
        else if(!p[i-diff] || p[i-diff] !== s[i]) return false
    }
    return true
};



console.log(isMatch("adceb", "*a*b"));
console.log(isMatch("acdcb", "a*c?b")); // false








// var isMatch = function(s, p) {
     
//     let store = []
//     let indexDiff = 0
//     for (let i = 0; i < s.length; i++) {
//         if(p[i-indexDiff] === '?') continue
//         if(store.length != 0) {
//             if (store[indexDiff] == s[i]) {
//                 indexDiff++
//                 continue
//             } 
//         }
//         if(p[i-indexDiff] === '*') {
//             store.push(s[i])
//             continue
//         } 
//         console.log(s[i], p[i-indexDiff])
//         if(!p[i-indexDiff] || p[i-indexDiff] !== s[i]) return false
//     }

//     return true
   
// };