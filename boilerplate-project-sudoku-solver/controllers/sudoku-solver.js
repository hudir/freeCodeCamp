class SudokuSolver {
  constructor(){
    this.basicArr = [1,2,3,4,5,6,7,8,9]
  }

  checkBasic(puzzleString) { // check them contain 1-9
    let res = true
    this.basicArr.forEach(n =>{
      if (puzzleString.split('').filter(x=> x==n).length != 1) res =false
    })
    return res
  }

  validate(puzzleString) { // check the whole puzzle
    const regex = /[1-9.]/
    if (puzzleString.length == 81 || puzzleString.split('').every(x=>regex.test(x))) return true
    return false
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const arr = puzzleString.split('')
    let result;
    let rowArr;

    for(let i = 0 ; i < arr.length; i++) {
      
      // when there is a row, check it, if pass, empty it and go on, else return false
      if(i % 8 == 0 && i != 0) {
        if(!this.checkBasic(rowArr)) {
          return false;
        }
        rowArr = []
      };
      rowArr.push(puzzleString[i])

    }

    return true
  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

