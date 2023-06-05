function mergeSort(array) {
  if(array.length === 1) return array
  const midPoint = Math.floor( array.length / 2 )
  const arr1 = array.slice(0, midPoint)
  const arr2 = array.slice(midPoint)

  return merge(mergeSort(arr1), mergeSort(arr2))
}

function merge(arr1, arr2) {
  console.log(arr1, arr2)
  const result = []
  
  while(arr1.length  && arr2.length ) {
    if(arr1[0] < arr2[0]) result.push(arr1.shift())
    else if (arr1[0] > arr2[0]) result.push(arr2.shift())
    else if (arr1[0] === arr2[0]) result.push(arr2.shift(), arr1.shift())
  }

  console.log(result, arr1, arr2, ' <====')
  return [...result, ...arr2, ...arr1]
}

  console.log(mergeSort([5,2,6,1,9,7,3,4,12]));
  // console.log(mergeSort([1,4,2,8,345,123,43,32,5643,63,123,43,2,55,1,234,92]) )

  [ 5 ] [ 2 ]
  [ 2 ] [ 5 ] []  <====
  [ 6 ] [ 1 ]
  [ 1 ] [ 6 ] []  <====
  [ 2, 5 ] [ 1, 6 ]
  [ 1, 2, 5 ] [] [ 6 ]  <====
  [ 9 ] [ 7 ]
  [ 7 ] [ 9 ] []  <====
  [ 4 ] [ 12 ]
  [ 4 ] [] [ 12 ]  <====
  [ 3 ] [ 4, 12 ]
  [ 3 ] [] [ 4, 12 ]  <====
  [ 7, 9 ] [ 3, 4, 12 ]
  [ 3, 4, 7, 9 ] [] [ 12 ]  <====
  [ 1, 2, 5, 6 ] [ 3, 4, 7, 9, 12 ]
  [ 1, 2, 3, 4, 5, 6 ] [] [ 7, 9, 12 ]  <====
  [
    1, 2, 3,  4, 5,
    6, 7, 9, 12
  ]