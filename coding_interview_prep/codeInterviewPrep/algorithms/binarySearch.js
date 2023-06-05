function binarySearch(array, target) {
    const result = findIt(array, target)

    if(isNaN(result[result.length - 1])) return result[result.length - 1]
    return result

    function findIt(searchList, value) {
        const midPoint = Math.floor((searchList.length - 1) / 2)
        const num = searchList[midPoint]
        if(searchList.length == 0) return ['Value Not Found']
        if(num === value) return [num]
        if(num > value) return [num ,...findIt(searchList.slice(0, midPoint), value)]
        if(num < value) return [num, ...findIt(searchList.slice(midPoint+1), value)]
    }
}

// const testArray = [0, 1, 2, 3, 4, 5];
const testArray = [
    0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23, 49, 70
  ];
console.log(binarySearch(testArray, 6))

// console.log([1,2].slice(3))
