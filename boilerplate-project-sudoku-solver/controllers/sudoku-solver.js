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
    for(let i = 0; i < 81 ;  i+=27) {
      let regionArr = []
      for(let j = 0; j < 9 ; j++) {
        if(regionArr.length < 9) {
          regionArr = [...regionArr, puzzleString[i + j], puzzleString[i + j + 9], puzzleString[i + j + 18]]
        } else {
          if (!this.checkBasic(regionArr.join(''))) {
            // console.log(regionArr.join(''), "  false")
            return false
          }
          else {
            // console.log(regionArr.join(''), "   true")
            regionArr = [puzzleString[i + j], puzzleString[i + j + 9], puzzleString[i + j + 18]]
          } 
        } 
      }
    }
   
    return true
  }

  solve(puzzleString) {
    if(!this.validate(puzzleString)) return false

    // convert all . to [1-9]
    const sudoku = puzzleString.split('').map(x=>{
      if (x == '.') {
        return this.basicArr
      } else return x
    })
    
    // all possibility of a row
    let rowNumArr = [] , getNumRound = true
    for(let i = 0 ; i < sudoku.length; i++) {
      if(getNumRound) {
        if (typeof sudoku[i] == "number" || typeof sudoku[i] == "string") rowNumArr.push(+sudoku[i])
      } else {
        if (Array.isArray(sudoku[i]) && rowNumArr.length > 0) {
          rowNumArr.forEach(n => {
            sudoku[i] = sudoku[i].filter(x => x != n)
          })
        }
      }
      if((i + 1) % 9 == 0 && i != 0 && getNumRound) {
        i=i-9
        getNumRound = false;
      } else if((i + 1) % 9 == 0 && i != 0 && !getNumRound){
        getNumRound = true;
        rowNumArr = []
      }
    }
    
    console.log(sudoku)
    return sudoku
    
  }
}

module.exports = SudokuSolver;

