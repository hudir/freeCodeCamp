var isMatch = function(s, p) {
    if (p=='*') return true

    
    s = s.split('')
    p = p.split('')
    if (s.length < p.filter(x=>x==='?').length) return false
    let alt = [], res = []
    check(s, p)

    function check(ns, np) {
        // console.log('start',ns.join(''), np.join(''))
        maxL = Math.max(ns.length, np.length)
        for (let i = 0; i < maxL; i++) {  
            if(np[i] === '*') {
                // empty sequence
                let deleteStar = [...np]
                deleteStar.splice(i, 1)
                check(ns, deleteStar) 

                // find the next none star element
                let nextNotStartEleInP = i+1
                while(p[nextNotStartEleInP] === '*') nextNotStartEleInP++
                
                const newP = np.slice(nextNotStartEleInP)
                const diffx = newP[0]
                // console.log(diffx, 'diffx')

                // how to handle the last * ?
                // if((alt.length > 0 && diffx === undefined )|| i == np.length-1) {
                //     res.push(true)
                //     return
                // }          

                if(alt.every(x=>x != diffx)){ // handle muti sequence
                    if(diffx != '?') {
                        alt.push(diffx)
                    }
                    const indexObj = {}
                    ns.forEach((x, index)=>{
                        // console.log(x, diffx)
                        if ((x == diffx || diffx === '?') && index > i-1) {
                            if(indexObj[x]) indexObj[x] = [...indexObj[x], index]
                            else indexObj[x] = [index]
                        } 
                    })  
                    
                    for(let k in indexObj) {
                        let arr = indexObj[k]
                        if (arr.length>0) for(let j = 0; j<arr.length; j++) {
                            const newIndex = arr[j]
                            const newS = ns.slice(newIndex+1)

                            check(newS, newP.slice(1))
    
                        }
                    }
                }
                return
            } else if(np[i] === '?' && ns[i]) {
                continue
            } else if(!ns[i] || !np[i] || np[i] !== ns[i]) {
                res.push(false)
                return
            }
        }
        console.log(ns.join(''), np.join(''), 'true')
        res.push(true)
    }

    if (res.some(x=> x)) return true
    else return false
};


console.log(isMatch("mississippi", "m*issi*iss*"));

// console.log(isMatch("adceb", "*a*b"));

// console.log(isMatch("mississippi", "m??*ss*?i*pi"));
// console.log(isMatch("hi", "*?"));
// console.log(isMatch("b", "*?*?"));
// console.log(isMatch("aa", "a*"));
// console.log(isMatch("adceb", "*a*b"));
// console.log(isMatch("acdcb", "a*c?b")); // false
// console.log(isMatch("abcabczzzde", "*abc???de*"));
// console.log(isMatch("abefcdgiescdfimde", "ab*cd?i*de"));








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



// var isMatch = function(s, p) {
//     s = s.split('')
//     p = p.split('')
//     maxL = Math.max(s.length, p.length)

//     let starOn = false, diff = 0, alt = [], res = true
//     // if(p.indexOF('*') > -1) {
//     //     starOn = true
//     // }

//     for (let i = 0; i < maxL; i++) {  
//         console.log(s[i],p[i-diff])
//         // console.log(alt)

//         if(starOn) {
//             if(p[i-diff] === s[i]) {
//                 starOn = false
//                 // alt=(s[i])
                
//             } else {
//                 diff++
//             }
//         } else if(p[i-diff] === '*') {
//             starOn=true
//             if(p[i+1] === s[i]) { // empty sequence
//                 // alt=(s[i])
//                 diff--
//                 starOn = false
//             } else if(!alt.some(x=>x == p[i+1])){ // handle muti sequence
//                 alt.push(p[i+1])
//                 const indexObj = {}
//                 s.forEach((x, index)=>{
//                     if (x == p[i+1] && i!=index) {
//                         if(indexObj[x]) indexObj[x] = [...indexObj[x], index]
//                     } else indexObj[x] = [index]
//                 })
//                 for(let k in indexObj) {
//                     let arr = indexObj[k]
//                     if (arr.length>0) for(let j = 0; j<arr.length; j++) {
//                         const newIndex = arr[j]

//                         const newS = s.slice(newIndex).join('')
//                         const newP = p.slice(p[i+1]).join('')
//                         console.log(newS,newP, 'recur')
//                         if (isMatch(newS, newP)) {
//                             return true
//                         }

//                     }
//                 }


//             }
//         } /* else if(alt.some(x=>x=s[i])) {
//             //delte some string and try again
//             const newS = s.slice(i).join('')
//             const newP = p.slice(i-diff).join('')
//             console.log(newS,newP, 'recur')
//             if (isMatch(newS, newP)) {
//                 return true
//             }
//         } */
//         else if(p[i-diff] === '?') continue
        
//         else if(!s[i] || !p[i-diff] || p[i-diff] !== s[i]) {
//             res =  false
//             console.log('turn to false', res)

//         }
//     }
//     console.log('final', res)

//     return res
// };
