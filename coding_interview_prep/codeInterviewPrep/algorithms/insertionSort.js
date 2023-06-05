function insertionSort(array) {
    let arr = [array[0]]
    for( let i = 1 ; i < array.length; i++) {
        const numToInsert = array[i]
        for (let j = arr.length - 1; j >= 0 ; j--) {
            if(numToInsert > arr[j] ){
                arr.splice(j+1,0, numToInsert)
                break
            }
            if(j == 0){
                arr.unshift(numToInsert)
            }
        }
    }
    return arr;
  }

  console.log(insertionSort([32,1,4,2,8,345,123,43,32,5643,63,123,43,2,55,1,234,92]));

  console.log(insertionSort([5, 4, 33, 2, 8]));