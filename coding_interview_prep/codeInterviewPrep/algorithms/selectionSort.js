// function selectionSort(arr) {
//     return getString(arr).split(' ').map(x=> +x)

//     function getString(array){
//         if(array.length == 1) return array[0]

//         const minNum = Math.min(...array)
//         let find = false
//         const newArray = array.filter(x => {
//             if(x == minNum && !find) {
//                 find = true
//                 return false
//             }
//             return true
//         })
//         return minNum + ' ' + getString(newArray);
//     }
//   }

  console.log(selectionSort([1,4,2,8,345,123,43,32,5643,63,123,43,2,55,1,234,92]));


  function selectionSort(array) { 
    if(array.length == 1) return array
    const minNum = Math.min(...array)
    let find = false
    const restArray = array.filter(x => {
        if(x == minNum && !find) {
             find = true
             return false
        }
        return true
     })
     return [minNum].concat(selectionSort(restArray))   
  }
