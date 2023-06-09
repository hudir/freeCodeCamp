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

// vision 2
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

let solved = false
let round = 0
let updating = true
let breaka = false

// let minLengthEle = []
// let indexOfMinLengthEle = 0
// let currentIndexOfMinLengthEle = 0
// let initSudoku = []
const head = {
    last : null,
    initSudoku : [],
    allPosi : [],
    currentEle : {}, 
    next : null
}
const temp = head


while (solved == false && round < 9999) {
    updating = false
    round++

    sudoku = eliminatePossibilityFromRowColRegion(eliminatePossibility, sudoku)

    let num = 0
    sudoku = sudoku.map(el => {
        if (typeof el == 'string' || typeof el == 'number') num++
        else if (Array.isArray(el) && x.length === 0) breaka = true
        else if (Array.isArray(el) && el.length == 1) {
            updating = true
            return el[0]
        } else return el
    })

    if (num === sudokuLong * sudokuLong) {
        solved = true;
        break;
    } 

    if (!updating || breaka) {
        if (head.initSudoku.length === 0) { // init the head
            head.initSudoku = sudoku.map(a=>a)
            head.initSudoku.forEach(( x, i)=> {
                if (Array.isArray(x)) {
                    const obj = {
                        i : i,
                        p : x  // array
                    }
                    head.allPosi.push(obj)
                }
            })
            head.allPosi.sort((a, b)=> a.p.length - b.p.length)
            head.currentEle = head.allPosi.shift()

            sudoku[head.currentEle.i] = head.currentEle.p.shift()
            continue;
        } 

        if (temp.currentEle.p.length > 0) { // go on give it another try
            sudoku = temp.initSudoku.map(a=>a)
            sudoku[head.currentEle.i] = head.currentEle.p.shift()
        } else { // go next node or go back to last
            if (breaka) {}

        }
       
    }
    breaka = false
}


console.error(round)
// console.log(sudoku)





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
    for (let i = 0; i < sudoku.length; i += sudokuLong * regionLong) {
        for (let j = i; j < sudokuLong; j += regionLong) {
            const regionNumArr = []
            const allPossibilityArr = {}
            for (let k = j; k < regionLong; k++) {
                for (let l = k; l < regionLong; l += sudokuLong) {
                    if (typeof sudoku[i + j + k + l] == "number" || typeof sudoku[i + j + k + l] == "string") {
                        regionNumArr.push(sudoku[i + j + k + l])
                    } else allPossibilityArr[i + j + k + l] = sudoku[i + j + k + l]
                }
            }
            for (i in allPossibilityArr) {
                sudoku[i] = eliminatePossibility(regionNumArr, allPossibilityArr[i])
            }
        }
    }

    return sudoku
}


function eliminatePossibility(numArr, possibilityArr) {
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



// vison 3
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

let solved = false
let round = 0
let updating = true
let breaka = false

// let minLengthEle = []
// let indexOfMinLengthEle = 0
// let currentIndexOfMinLengthEle = 0
// let initSudoku = []
const head = {
    last: null,
    initSudoku: [],
    allPosi: [],
    currentEle: {},
    next: null
}
let temp = head


while (solved == false && round < 9999) {
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

    if (!updating || breaka) {
       

        if (temp.initSudoku.length === 0) { // init the new node
            const currentAllPosi = []
            sudoku.forEach((x, i) => {
                if (Array.isArray(x)) {
                    const obj = {
                        i: i,
                        p: x  // array
                    }
                    currentAllPosi.push(obj)
                }})
            temp.initSudoku = sudoku.map(a => a)
            temp.allPosi = currentAllPosi
            temp.allPosi.sort((a, b) => a.p.length - b.p.length)
            temp.currentEle = temp.allPosi.shift()

            sudoku[temp.currentEle.i] = temp.currentEle.p.shift()
            continue;
        }


        if (breaka && temp.currentEle.p.length > 0) { // go on give it another try
            sudoku = temp.initSudoku.map(a => a)
            sudoku[temp.currentEle.i] = temp.currentEle.p.shift()
            
        } else if (breaka) {  // go back to last node
            temp = temp.last           
            console.error('last node')
            sudoku = temp.initSudoku.map(a => a)
            if (temp.currentEle.p.length > 0) sudoku[temp.currentEle.i] = temp.currentEle.p.shift()
            else if(temp.allPosi.length > 0){
                temp.currentEle = temp.allPosi.shift()
                sudoku[temp.currentEle.i] = temp.currentEle.p.shift()
            }

            
        } else {  // go to next node take from allPosi
            const currentAllPosi = []
            sudoku.forEach((x, i) => {
                if (Array.isArray(x)) {
                    const obj = {
                        i: i,
                        p: x  // array
                    }
                    currentAllPosi.push(obj)
                }})
            nextCrrEle = currentAllPosi.shift()
            
            temp.next = {
                last: {...temp},
                initSudoku: sudoku.map(a => a),
                allPosi: currentAllPosi,
                currentEle: nextCrrEle,
                next: null
            }
            temp = temp.next
            sudoku[temp.currentEle.i] = temp.currentEle.p.shift()
            // console.error('next node')
        }
       

    }


   
    // console.error(round)
}


console.error(round)
for(let i=0; i< sudoku.length;i+=16) {
    console.log(sudoku.slice(i, i +16).join(''))

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
    for (let i = 0; i < sudoku.length; i += sudokuLong * regionLong) {
        for (let j = i; j < sudokuLong; j += regionLong) {
            const regionNumArr = []
            const allPossibilityArr = {}
            for (let k = j; k < regionLong; k++) {
                for (let l = k; l < regionLong; l += sudokuLong) {
                    if (typeof sudoku[i + j + k + l] == "number" || typeof sudoku[i + j + k + l] == "string") {
                        regionNumArr.push(sudoku[i + j + k + l])
                    } else allPossibilityArr[i + j + k + l] = sudoku[i + j + k + l]
                }
            }
            for (i in allPossibilityArr) {
                sudoku[i] = eliminatePossibility(regionNumArr, allPossibilityArr[i])
            }
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

