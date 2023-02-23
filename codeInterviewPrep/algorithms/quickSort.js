function quickSort(array) {
    if(array.length == 0) return array

    pivod = array.shift()
    left = array.filter(x => x < pivod)
    right = array.filter(x => x >= pivod)
    console.log(left,pivod, right)

    return quickSort(left).concat(pivod).concat(quickSort(right)) 

  }

  console.log(quickSort([2, 1, 3, 0]));