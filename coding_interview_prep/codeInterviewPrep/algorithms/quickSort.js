function quickSort(array) {
    if(array.length === 0) return []

    const pivod = array.shift()
    const left = array.filter(x => x < pivod)
    const right = array.filter(x => x >= pivod)

    return [...quickSort(left) , pivod , ...quickSort(right)]
  }

  console.log(quickSort([2, 1, 3, 0,4]))