class SudokuSolver {

  basicArr: number[] = [1,2,3,4,5,6,7,8,9]

  checkBasic(puzzleString: string):boolean { // check them contain 1-9
    let res = true
    this.basicArr.forEach(n =>{
      if (puzzleString.split('').filter(x=> +x==n).length != 1) res =false
    })
    return res
  }

  validate(puzzleString: string):boolean { // check the whole puzzle
    const regex = /[1-9.]/
    if (puzzleString.length == 81 && puzzleString.split('').every(x=>regex.test(x))) return true
    return false
  }

  checkRowPlacement(puzzleString: string, row, column, value):boolean {
    let rowArr: string[] = [];
    for(let i = 0 ; i < puzzleString.length; i++) {
      rowArr.push(puzzleString[i])
      // when there is a row, check it, if pass, empty it and go on, else return false
      if(i % 8 == 0 && i != 0) {
        if(!this.checkBasic(rowArr.join(''))) 
          return false;
        rowArr = []
      };
    }
    return true
  }

  checkColPlacement(puzzleString: string , row, column, value): boolean {
    const columns:number = 9;
    for (let i = 1; i <= columns; i++){
      let columnArr: string[] = [puzzleString[i-1]];
      for (let j = i * 9 ; j < 81; j+=9){
        columnArr.push(puzzleString[j])
      };
      if(!this.checkBasic(columnArr.join(''))) 
        return false
    }
    return true
  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

