class SudokuSolver {
  constructor() {
    this.basicArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  checkBasic(puzzleString) {
    // check them contain 1-9
    let res = true;
    this.basicArr.forEach((n) => {
      if (puzzleString.split("").filter((x) => +x == n).length != 1)
        res = false;
    });
    return res;
  }

  validate(puzzleString) {
    // check the whole puzzle
    const regex = /[1-9.]/;
    if (puzzleString.length !== 81)
      return { error: 'Expected puzzle to be 81 characters long' };

    if (!puzzleString.split("").every((x) => regex.test(x)))
      return { error: 'Invalid characters in puzzle' }
    
    return {validate : true}
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let rowArr = [];
    for (let i = 0; i < puzzleString.length; i++) {
      // when there is a row, check it, if pass, empty it and go on, else return false
      if (i % 9 == 0 && i != 0) {
        if (!this.checkBasic(rowArr.join(""))) {
          return false;
        }
        rowArr = [];
      }
      rowArr.push(puzzleString[i]);
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    const columns = 9;
    for (let i = 0; i < columns; i++) {
      let columnArr = [];
      for (let j = i; j < 81; j += 9) {
        columnArr.push(puzzleString[j]);
      }
      if (!this.checkBasic(columnArr.join(""))) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    for (let i = 0; i < 81; i += 27) {
      let regionArr = [];
      for (let j = 0; j < 9; j++) {
        if (regionArr.length < 9) {
          regionArr = [
            ...regionArr,
            puzzleString[i + j],
            puzzleString[i + j + 9],
            puzzleString[i + j + 18],
          ];
        } else {
          if (!this.checkBasic(regionArr.join(""))) {
            // console.log(regionArr.join(''), "  false")
            return false;
          } else {
            // console.log(regionArr.join(''), "   true")
            regionArr = [
              puzzleString[i + j],
              puzzleString[i + j + 9],
              puzzleString[i + j + 18],
            ];
          }
        }
      }
    }

    return true;
  }

  /**
   * 
   * @param {*} puzzleString 
   * @param {*} coordinate  the coordinate is the letter A-I indicating the row, followed by a number 1-9 indicating the column(A1)
   * @param {*} value value is a number from 1-9
   */
  checkCoordinate(puzzleString, coordinate, value) {
    // console.log("A".charCodeAt(0)) 65
    //      ...
    // console.log("I".charCodeAt(0)) 72
    const placedIndex = (coordinate[0].charCodeAt(0) - 65) * 9 + +coordinate[1] - 1

    // get row
    const rowStartAt = (coordinate[0].charCodeAt(0) - 65) * 9
    const row = []
    for(let i = rowStartAt; i < rowStartAt+9; i++){
      if(i != placedIndex) {
        row.push(puzzleString[i])
      }
    }

    // get column
    const colStartAt = coordinate[1] - 1
    const col = []
    for(let i = colStartAt; i < 81; i+=9 ){
      if(i != placedIndex) {
        col.push(puzzleString[i])
      }
    }

    // get region
    let regionColStartAt = 0 
        , regionRowStartAt = 0
    if(coordinate[1]/3 <= 1) {
      regionColStartAt=0
    } else if(coordinate[1]/3 <= 2) {
      regionColStartAt=3
    } else {
      regionColStartAt=6
    }

    let rowRegion = (coordinate[0].charCodeAt(0) - 65) / 3
    if(rowRegion < 1) {
      regionRowStartAt= 0
    } else if(rowRegion < 2) {
      regionRowStartAt= 27
    } else {
      regionRowStartAt= 54
    }
    // console.log(regionRowStartAt ,regionColStartAt)
    const regionStartAt = regionRowStartAt + regionColStartAt
    const region = []
    
    for (let rowNum = 0; rowNum <= 18 ; rowNum += 9) {
      for (let i = 0; i < 3; i++) {
        if (regionStartAt + i + rowNum != placedIndex) {
          region.push(puzzleString[regionStartAt + i + rowNum])
        }
      }
    }
    // console.log(puzzleString[placedIndex], row, col , region)
    // check
    const conflict = []
    if (row.some(x => x==value)) conflict.push("row")
    if (col.some(x => x==value)) conflict.push("col")
    if (region.some(x => x==value)) conflict.push("region")

    if(conflict.length == 0) return {"valid": true}
    else return {"valid": false, "conflict": conflict}
  }

  solve(puzzleString) {
    if (!this.validate(puzzleString)) return false;

    // convert all . to [1-9]
    let sudoku = puzzleString.split("").map((x) => {
      if (x == ".") {
        return this.basicArr;
      } else return x;
    });
    
    let solved = false 
    let round = 0
    while(solved == false && round < 9999) {
      sudoku = eliminatePossibilityFromRowColRegion(eliminatePossibility, sudoku)

      sudoku = sudoku.map(el => {
        if(Array.isArray(el) && el.length == 1) {
          return + el[0]
        } else return el
      })

      if(sudoku.every(x => typeof x == 'string' || typeof x == 'number')) solved = true
      round = round + 1
    }
 
    // console.log(sudoku.join(''))
    if (round >= 9990) return false
    else return sudoku.join('');

    function eliminatePossibilityFromRowColRegion(
      eliminatePossibility,
      sudoku 
    ) {
      // eliminate possibility of a row
      let rowNumArr = [],
        getNumRound = true;
      for (let i = 0; i < sudoku.length; i++) {
        if (getNumRound) {
          if (typeof sudoku[i] == "number" || typeof sudoku[i] == "string")
            rowNumArr.push(+sudoku[i]);
        } else {
          if (Array.isArray(sudoku[i]) && rowNumArr.length > 0) {
            sudoku[i] = eliminatePossibility(rowNumArr, sudoku[i]);
          }
        }
        if ((i + 1) % 9 == 0 && i != 0 && getNumRound) {
          i = i - 9;
          getNumRound = false;
        } else if ((i + 1) % 9 == 0 && i != 0 && !getNumRound) {
          getNumRound = true;
          rowNumArr = [];
        }
      }

      // eliminate possibility of a column
      for (let i = 0; i < 9; i++) {
        // get all number from a column
        let colNumArr = [];
        for (let j = i; j < 81; j += 9) {
          if (typeof sudoku[j] == "number" || typeof sudoku[j] == "string")
            colNumArr.push(+sudoku[j]);
        }

        if (colNumArr.length > 0) {
          for (let j = i; j < 81; j += 9) {
            if (Array.isArray(sudoku[j])) {
              sudoku[j] = eliminatePossibility(colNumArr, sudoku[j]);
            }
          }
        }
      }
      // eliminate possibility of a region
      for (let i = 0; i < 81; i += 27) {
        let regionNumArr = [],
          getNumRound = true;
        for (let j = 0; j < 9; j++) {
          if (getNumRound) {
            regionNumArr = [
              ...regionNumArr,
              sudoku[i + j],
              sudoku[i + j + 9],
              sudoku[i + j + 18],
            ];
          }
          if (!getNumRound) {
            sudoku[i + j] = Array.isArray(sudoku[i + j])
              ? eliminatePossibility(regionNumArr, sudoku[i + j])
              : sudoku[i + j];
            sudoku[i + j + 9] = Array.isArray(sudoku[i + j + 9])
              ? eliminatePossibility(regionNumArr, sudoku[i + j + 9])
              : sudoku[i + j + 9];
            sudoku[i + j + 18] = Array.isArray(sudoku[i + j + 18])
              ? eliminatePossibility(regionNumArr, sudoku[i + j + 18])
              : sudoku[i + j + 18];
          }

          if (regionNumArr.length == 9 && getNumRound) {
            regionNumArr = regionNumArr.filter(
              (x) => typeof x == "number" || typeof x == "string"
            );
            j = j - 3;
            getNumRound = false;
          } else if (!getNumRound && (j == 2 || j == 5)) {
            regionNumArr = [];
            getNumRound = true;
          }
        }
      }

      return sudoku
    }

    function eliminatePossibility(numArr, possibilityArr) {
      numArr.forEach((n) => {
        possibilityArr = possibilityArr.filter((x) => x != n);
      });
      return possibilityArr;
    }
  }
}

module.exports = SudokuSolver;


// console.log(new SudokuSolver().checkCoordinate('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..', 'F2', 3))