// comvert both array to objet
// {
//     "Bowling Ball": 1
// }
// itration though the object and add or create new key
// convertback to 2D array
// sort

function updateInventory(arr1, arr2) {
    const curInvObj = from2DArrToObj(arr1)
    const newInvObj = from2DArrToObj(arr2)

    for(let key in newInvObj) {
        if(curInvObj.hasOwnProperty(key)){
            curInvObj[key] = +curInvObj[key] + +newInvObj[key]
        } else curInvObj[key] = +newInvObj[key]
    }
    let arr2d = []
    for(let key in curInvObj) {
        const arr1d = [curInvObj[key], key]
        arr2d.push(arr1d)
    }

    arr2d.sort((a,b)=>{
        if(a[1][0] < b[1][0]) return -1
        if(a[1][0] > b[1][0]) return 1
        return 0
    })

    return arr2d;

    function from2DArrToObj(arr){
        return arr.reduce((acc,x)=> {
            acc[x[1]] = x[0]
            return acc 
        }, {})

    }
}

function updateInventory2(arr1, arr2) {
    return [...arr1, ...arr2].reduce((acc, el) => {
        let index
        if(acc.filter((ele, i) => {
            if(ele[1] == el[1]) {
                index = i
                return true
            } 
            return false
        }).length > 0) {
            acc[index][0] += el[0] 
        } else {
            acc.push(el)
        }
        return acc
    }, []).sort((a,b)=>{
                if(a[1][0] < b[1][0]) return -1
                if(a[1][0] > b[1][0]) return 1
                return 0
            })
}


// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];
console.log(updateInventory2(curInv, newInv));