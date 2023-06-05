function pairwise(arr, arg) {
    let sum = 0;
    let usedNums = []
    for(let i = 0; i < arr.length; i++) {
        const targetNum = arg - arr[i]
        let indexOfTarget = -1
        arr.forEach((x,index)=>{
            if(indexOfTarget == -1 && targetNum == x && i != index && usedNums.indexOf(index) == -1){
                indexOfTarget = index
            }
        })

        if(indexOfTarget > i && usedNums.indexOf(i) == -1 && usedNums.indexOf(indexOfTarget) == -1 ){
            usedNums.push(i, indexOfTarget)
            sum = sum + i + indexOfTarget
        }
    }

    return sum;
  }
//   console.log(  pairwise([1,4,2,3,0,5], 7));
  console.log(pairwise([0, 0, 0, 0, 1, 1], 1));
