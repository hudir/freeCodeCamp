function sym(args) {
    // update args element
    const arr = []
    for(let i = 0; i < arguments.length; i ++) {
        const reslut = []
        arguments[i].forEach(num => {
            if(reslut.indexOf(num) == -1) {
                reslut.push((num))
            }
        })
        arr.push(reslut)
    }

    let store = [];
    for(let i = 1; i < arr.length; i++) {
        // compair store and args[i+1]
        if(i == 1) {
            store = findTheUniNum(arr[0], arr[i])
        } else {
            store = findTheUniNum(store, arr[i])
        }
    }
    return store.sort((a,b)=>a-b); 

    function findTheUniNum(a,b) {
        const all = [...a, ...b]
        const reslut = []
        all.forEach(num => {
            if(all.filter(x => x == num).length == 1) {
                reslut.push(num)
            }
        })
        return reslut
    }
}



// This is not going to work
// sym2([1, 2, 5], [2, 3, 5], [3, 4, 5] should have result like [1,4,5] but get [1,4]
// but i fixed it

function sym2(args) {
    return Object.values(arguments)
    .map(numArr => 
        numArr.reduce((acc,x)=>{
            if(acc.indexOf(x) == -1) acc.push(x)
            return acc
        }, [])
    )
    .reduce((all, y) => [...all, ...y] ,[])
    .reduce((acc,n,i,arr) => {
        if(arr.filter(z=> z == n).length % 2 === 1 && acc.indexOf(n) == -1) acc.push(n)
        return acc
    }, [])
    .sort((a, b) => a - b)

}

// console.log(sym2console.log([1, 2, 5], [2, 3, 5], [3, 4, 5]))


// function sym3(args) {
//     if(arguments.length == 1) {
//         return []
//     } else {
//         const arr = Object.values(arguments)
//         arr.shift()
//         console.log(...arr)
//         return [...sym3(`${arr.map(a=>a)}`)]
//     }
// }

// console.log(sym3([1, 2, 5], [2, 3, 5], [1, 2, 5], [2, 3, 5]))