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
const sudokuLong = Math.sqrt(sudoku.length)
const regionLong = Math.sqrt(sudokuLong)
// console.error(sudokuLong, regionLong)

let solved = false
let round = 0
let updating = true
let breaka = false

const head = {
    last: null,
    initSudoku: [],
    allPosi: [],
    currentEle: {},
    next: null
}
let temp = head


while (solved == false && round < 99999) {
    updating = false
    breaka = false
    round++

    sudoku = eliminatePossibilityFromRowColRegion(eliminatePossibility, sudoku)

    let num = 0
    sudoku = sudoku.map(el => {
        if (typeof el == 'string' || typeof el == 'number') num++
        else if (Array.isArray(el) && el.length === 0) breaka = true
        else if (Array.isArray(el) && el.length == 1) {
            updating = true
            return el[0]
        }
        return el
    })

    if (num === sudokuLong * sudokuLong) {
        solved = true;
        break;
    }

    if (breaka) {
        while (temp.currentEle.p.length === 0 && temp.allPosi.length === 0) { // go back to last node
            temp = { ...temp.last }
        }
        sudoku = [...temp.initSudoku]

        if (temp.currentEle.p.length > 0) { // go on give it another try 
            sudoku[temp.currentEle.i] = temp.currentEle.p.shift()
        } else if (temp.allPosi.length > 0) { // grab a posi obj and update currentElement    
            temp.currentEle = temp.allPosi.shift()
            sudoku[temp.currentEle.i] = temp.currentEle.p.shift()
        }
        continue;
    }

    if (!updating) {
        let currentAllPosi = []
        sudoku.forEach((x, i) => {
            if (Array.isArray(x)) {
                const obj = {
                    i: i,
                    p: x  // array
                }
                currentAllPosi.push(obj)
            }
        })
        currentAllPosi = currentAllPosi.sort((a, b) => a.p.length - b.p.length)
        nextCrrEle = currentAllPosi.shift()

        temp.next = {
            last: temp.initSudoku.length === 0 ? null : { ...temp },
            initSudoku: [...sudoku],
            allPosi: currentAllPosi,
            currentEle: nextCrrEle,
            next: null
        }
        temp = { ...temp.next }
        sudoku[temp.currentEle.i] = temp.currentEle.p.shift()
        // console.error('next node')
    }
    // console.error(round)
}


console.error(round)
for (let i = 0; i < sudoku.length; i += 16) {
    console.log(sudoku.slice(i, i + 16).join(''))
}






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
        if ((i + 1) % sudokuLong == 0 && i != 0 && getNumRound) {
            i = i - sudokuLong;
            getNumRound = false;
        } else if ((i + 1) % sudokuLong == 0 && i != 0 && !getNumRound) {
            getNumRound = true;
            rowNumArr = [];
        }
    }

    // eliminate possibility of a column
    for (let i = 0; i < sudokuLong; i++) {
        // get all number from a column
        let colNumArr = [];
        for (let j = i; j < sudoku.length; j += sudokuLong) {
            if (typeof sudoku[j] == "number" || typeof sudoku[j] == "string")
                colNumArr.push(sudoku[j]);
        }

        if (colNumArr.length > 0) {
            for (let j = i; j < sudoku.length; j += sudokuLong) {
                if (Array.isArray(sudoku[j])) {
                    sudoku[j] = eliminatePossibility(colNumArr, sudoku[j]);
                }
            }
        }
    }

    // eliminate possibility of a region
    let regionNumArr = []
    let allPossibilityArr = {}
    for (let i = 0; i < sudoku.length; i += sudokuLong * regionLong) {
        for (let j = i; j < i+sudokuLong; j += regionLong) {
            for (let k = j; k < j + regionLong; k++) {
                for (let l = k; l < k + sudokuLong * regionLong ; l += sudokuLong) {
               
                    if (typeof sudoku[l] == "number" || typeof sudoku[l] == "string") {
                        regionNumArr.push(sudoku[l])
                    } else allPossibilityArr[l] = sudoku[l]
                    // console.error( l)
                }
            }
            // console.error(regionNumArr)
            for (let m in allPossibilityArr) {
                sudoku[m] = eliminatePossibility(regionNumArr, allPossibilityArr[m])
            }
            regionNumArr = []
            allPossibilityArr = {}
        }
    }
    return sudoku
}


function eliminatePossibility(numArr, possibilityArr) {
    // console.error(possibilityArr)
    const obj = numArr.reduce((acc, x) => {
        acc[x] = 1
        return acc
    }, {})
    possibilityArr = possibilityArr.filter(x => {
        if (!obj.hasOwnProperty(x)) {
            return x
        } else {
            updating = true
        }
    });
    return possibilityArr;
}

