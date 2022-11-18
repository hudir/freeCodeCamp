class SudokuSolver {
  constructor(){
    this.basicArr = [1,2,3,4,5,6,7,8,9]
  }

  checkBasic(puzzleString) { // check them contain 1-9
    let res = true
    this.basicArr.forEach(n =>{
      if (puzzleString.split('').filter(x=> +x==n).length != 1) res =false
    })
    return res
  }

  validate(puzzleString) { // check the whole puzzle
    const regex = /[1-9.]/
    if (puzzleString.length == 81 && puzzleString.split('').every(x=>regex.test(x))) return true
    return false
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let rowArr = [];
    for(let i = 0 ; i < puzzleString.length; i++) {
      // when there is a row, check it, if pass, empty it and go on, else return false
      if(i % 9 == 0 && i != 0) {
        if(!this.checkBasic(rowArr.join(''))){
          return false;
        }
        rowArr = []
      };
      rowArr.push(puzzleString[i])
    }
    return true
  }

  checkColPlacement(puzzleString , row, column, value) {
    const columns = 9;
    for (let i = 0; i < columns; i++){
      let columnArr = [];
      for (let j = i ; j < 81; j+=9){
        columnArr.push(puzzleString[j])
      };
      if(!this.checkBasic(columnArr.join(''))) {
        return false
      }
        
    }
    return true
  }

  checkRegionPlacement(puzzleString , row, column, value) {
    const RegionRow = {
      a : 0,
      b : 1,
      c : 2
    }
    for(let i = 1; i <= 9; i++){ // there are 9 regions
      let regionArr = []
      for(let j = 0; j <= 18; j += 9) {
        regionArr.push(puzzleString[RegionRow.a + i * j])
        regionArr.push(puzzleString[RegionRow.b + i * j])
        regionArr.push(puzzleString[RegionRow.c + i * j])
      }
      if(!this.checkBasic(regionArr.join(''))) {
        console.log(regionArr)
        return false
      }
    }
    return true
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

