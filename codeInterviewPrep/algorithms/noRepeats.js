// // get all permutations

// function permAlone(str) {
//     let len = str.length
//     let arr = [str]

//     for(let i = 0; i < len; i++) {
//         // take char out of the str
//         const curChar = str[i]
             
//         for (let j = 0; j < len.length; j++) {
//             if(i != j ){
//                 // switch i and j 
//             }      
//         }     
//     } 
//     return str;
//   }
  
// //   permAlone('aab');

//   function swap(fr, to, str){
//     if (fr < to) {
//         return str.slice(0, fr) + str[to] + str.slice(fr + 1, to) + str[fr] + str.slice(to + 1)
//     } else {
//         return str.slice(0, to) + str[fr] + str.slice(to + 1, fr) + str[to] + str.slice(fr + 1)
//     }
//   }

//   console.log(swap('1234', 1, 3));
  

//   function tryAgain(){

//   }


function permAlone(str) {
    const len = str.length;
    const arr = []
    for (let i = 0; i < len; i++){
        arr.push(i)
    }
    const result = []

    generate(len)

    const strArr = result.map(x=> x.split('').map(y => str[y]) )

    return strArr.filter(el => el.reduce((acc, char, index, arr)=> {
        if (char == arr[index+1]) {
            acc = false
            return acc
        }
        return acc
    }, true)).length

    function swap(inx1, inx2) {
        const temp = arr[inx1]
        arr[inx1] = arr[inx2]
        arr[inx2] = temp
    }

    function generate(num){
        if(num==1) result.push(arr.join(''))
        else {
            for(let i = 0; i < num; i ++){
                generate(num - 1)
                swap(num % 2 ? i : 0, num -1)
            }
        }
    }
}


console.log(permAlone('aab'));
console.log(permAlone('aaa'));
console.log(permAlone('aabb'));
console.log(permAlone('abcdefa'));
console.log(permAlone('abfdefa'));
console.log(permAlone('zzzzzzzz'));
console.log(permAlone('a'));
console.log(permAlone('aaab'));
console.log(permAlone('aaabb'));