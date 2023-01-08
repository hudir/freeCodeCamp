function sym(args) {
    if(arguments.length == 1){
      let end = arguments[0].sort((a,b)=>a-b)
      return end
    }
    let arrToCheck = [...deleteDuplication(arguments[0]), ...deleteDuplication(arguments[1])];
    let restArgs=Object.values(arguments);
    restArgs.shift()
    restArgs.shift()
    let result = arrToCheck.reduce((acc,el,index) =>{
       let howMany = arrToCheck.filter(n => n == el).length;
       if (howMany == 1) {
         acc = [...acc, el]
       }
       return acc
    },[]);
    return sym(result, ...restArgs);

    function deleteDuplication(arr) {
      return arr.reduce((acc,el)=>{
        if(acc.includes(el)) return acc
        else return [...acc, el]
      }, [])
    }
  }
  
  sym([1, 2, 3], [5, 2, 1, 4]);



  function updateInventory(arr1, arr2) {
    let obj1 = convertArrToObj(arr1);
    let obj2 = convertArrToObj(arr2);
    obj1 = addToResult(obj2, obj1);
    let resArr = []
    for(let key in obj1) {
        const temArr = [obj1[key], key];
        resArr.push(temArr)
    }
    resArr = resArr.sort((a,b) => {
        const c1 = a[1].toUpperCase()
        const c2 = b[1].toUpperCase()
        if(c1 > c2) return 1
        else if (c1 < c2) return -1
        else return 0

    })
    return resArr;

    function convertArrToObj(arr) {
        return arr.reduce((acc,el)=>{
            acc[el[1]] = +el[0];
            return acc
        }, {})
    }
    function addToResult(from, to) {
        for(let key in from){
            if(to.hasOwnProperty(key)){
                to[key] += from[key] 
            } else {
                to[key] = from[key] 
            }
        }
        return to;
    }
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

updateInventory(curInv, newInv);