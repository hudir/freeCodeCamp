/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
let puzzleString = []
for (let i = 0; i < 16; i++) {
    const ROW = readline();
    puzzleString.push(...ROW.split(''))
}

let basicArr = 'ABCDEFGHIJKLMNOP'.split('')

let sudoku = puzzleString.map((x) => {
    if (x == ".") {
        return basicArr;
    } else return x;
});
const sudokuLang = Math.sqrt(sudoku.length)
const regionLang = Math.sqrt(sudokuLang)

console.error(sudokuLang, regionLang, sudoku.length)

let solved = false
let round = 0
let update = true

while (solved == false && round < 9999 && update) {
    update = false
    sudoku = eliminatePossibilityFromRowColRegion(eliminatePossibility, sudoku)

    sudoku = sudoku.map(el => {
        if (Array.isArray(el) && el.length == 1) {
            update = true
            return  el[0]
        } else return el
    })

    if (sudoku.every(x => typeof x == 'string' || typeof x == 'number')) solved = true
    round = round + 1
}


console.error(round)





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
                rowNumArr.push(sudoku[i]);
        } else {
            if (Array.isArray(sudoku[i]) && rowNumArr.length > 0) {
                sudoku[i] = eliminatePossibility(rowNumArr, sudoku[i]);
            }
        }
        if ((i + 1) % sudokuLang == 0 && i != 0 && getNumRound) {
            i = i - sudokuLang;
            getNumRound = false;
        } else if ((i + 1) % sudokuLang == 0 && i != 0 && !getNumRound) {
            getNumRound = true;
            rowNumArr = [];
        }
    }
   
    // eliminate possibility of a column
    for (let i = 0; i < sudokuLang; i++) {
        // get all number from a column
        let colNumArr = [];
        for (let j = i; j < sudoku.length; j += sudokuLang) {
            if (typeof sudoku[j] == "number" || typeof sudoku[j] == "string")
                colNumArr.push(sudoku[j]);
        }

        if (colNumArr.length > 0) {
            for (let j = i; j < sudoku.length; j += sudokuLang) {
                if (Array.isArray(sudoku[j])) {
                    sudoku[j] = eliminatePossibility(colNumArr, sudoku[j]);
                }
            }
        }
    }

   

    // eliminate possibility of a region
    for (let i = 0; i < sudoku.length; i += sudokuLang * regionLang) {     
        for (let j = i; j < sudokuLang; j+=regionLang) {
            const regionNumArr =[]
            const allPossibilityArr = {}
            for(let k = j; k <regionLang; k++ ) {
                for (let l = k; l < regionLang; l+=sudokuLang) {
                    if (typeof sudoku[i + j + k + l]  == "number" || typeof sudoku[i + j + k + l] == "string"){
                        regionNumArr.push(sudoku[i + j + k + l])
                    } else allPossibilityArr[i + j + k + l] = sudoku[i + j + k + l]
                }
            }
            for (i in allPossibilityArr){
                sudoku[i] = eliminatePossibility(regionNumArr, allPossibilityArr[i])
            }
        }
    }

    return sudoku
}
console.log(sudoku)

function eliminatePossibility(numArr, possibilityArr) {
    const obj = numArr.reduce((acc,x)=>{
       acc[x]=1
       return acc
    }, {})
    possibilityArr = possibilityArr.filter(x => {
        if (!obj.hasOwnProperty(x)) {
            return x
        } else {
            update = true
        }
    });
    return possibilityArr;
}

