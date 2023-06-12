/*
sudoku: Param: Array of numbers or Charators
this sudokuSolver is only for 9x9 or 16x16
empty block use .
*/
function sudokuSolver(sudoku, AllBasicElementArr) {
    if (!Array.isArray(sudoku)) sudoku = sudoku.split('')
    const sudokuLong = Math.sqrt(sudoku.length)
    const regionLong = Math.sqrt(sudokuLong)

    // get index for row, col and reg
    const rows = {}, cols = {}, regs = {}
    let rowTemp = []
    for (let i = 0; i < sudoku.length; i++) {
        rowTemp.push(i)
        if (rowTemp.length === sudokuLong) {
            const rowName = 'row' + Math.ceil(i / sudokuLong).toString()
            rows[rowName] = rowTemp
            rowTemp = []
        }

        const colName = 'col' + (i % sudokuLong + 1).toString()
        if (cols.hasOwnProperty(colName)) cols[colName].push(i)
        else cols[colName] = [i]

        if (i % (sudokuLong * regionLong) === 0) {
            for (let j = i; j < i + sudokuLong; j += regionLong) {
                let regTemp = []
                for (let k = j; k < j + regionLong; k++) {
                    for (let l = k; l < k + sudokuLong * regionLong; l += sudokuLong) {
                        regTemp.push(l)
                    }
                }
                const regName = 'reg' + Math.ceil(j).toString()
                regs[regName] = regTemp
                regTemp = []
            }
        }
    }

    sudoku = sudoku.map((x) => {
        if (x == ".") {
            return AllBasicElementArr;
        } else return x;
    });


    let updating = true
    let solved = false
    let breaka = false

    const head = {
        last: 'head',
        initSudoku: [],
        allPosi: [],
        currentEle: {},
        next: null
    }
    let temp = head


    while (!solved) {
        updating = false
        breaka = false

        eliminatePossibility(rows)
        eliminatePossibility(cols)
        eliminatePossibility(regs)

        if (sudoku.every(x => typeof x =='number' || typeof x == 'string')) {
            solved = true
            break
        }

        if (breaka) {
            if (temp.last === 'head') { console.log('can not solve'); break }
            while (temp.last && temp.currentEle.p.length === 0 && temp.allPosi.length === 0) { // go back to last node
                temp = { ...temp.last }
                console.error('last node')
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
            console.error('next node')
        }
    }

    for (let i = 0; i < sudoku.length; i += 16) {
        console.log(sudoku.slice(i, i + 16).join(''))
    }




    function eliminatePossibility(indexObj) {
        for (let key in indexObj) {
            const group = indexObj[key]
            const posi = {}
            const pair = {}
            const pairRes = []

            const temp = group.reduce((acc, x) => {
                if (typeof sudoku[x] == "number" || typeof sudoku[x] == "string") {
                    if(acc[sudoku[x]]) breaka = true
                    acc[sudoku[x]] = 1
                }
                else {
                    posi[x] = 0
                    if (sudoku[x].length === 2) pair[x] = sudoku[x].sort()
                }
                return acc
            }, {})

            if (Object.keys(pair).length > 1) {
                for (let k in pair) {
                    for (let i in pair) {
                        if (i != k) {
                            if (pair[k][0] === pair[i][0] && pair[k][1] === pair[i][1]) {
                                if (pairRes.length === 0 || pairRes[pairRes.length - 1].every(x => x != i && x != k)) pairRes.push([i, k])
                            }
                        }
                    }
                }
            }

            if (pairRes.length > 0) {
                pairRes.forEach(pair => {
                    const limit1 = sudoku[pair[0]]
                        , limit2 = sudoku[pair[1]]

                    for (let index in posi) {
                        if (index != pair[0] && index != pair[1]) {
                            sudoku[index] = sudoku[index].filter(x => {
                                if (x != limit1 && x != limit2) return x
                                else updating = true
                            })
                        }
                    }
                })
            }

            for (let index in posi) {
                sudoku[index] = sudoku[index].filter(x => {
                    if (!temp.hasOwnProperty(x)) return x
                    else updating = true
                })
                if (sudoku[index].length === 1) sudoku[index] = sudoku[index][0]
                if (sudoku[index].length === 0) {breaka = true; return}
            }
        }
    }
}






const basicArr = 'ABCDEFGHIJKLMNOP'.split('')

const s = '.LEK.G.....NO.C...M.H.JOBDG.FENKJ..C.BAN.EK....I.BG..K..C.J..DPM.HA.FL..K..M.P.....OA.....D.IK.G..KDJ.CBFAIG.MHL.M.....EPJNO.A..G...IA.DE.CJP...AK....GHNM..LIJ...DJON..GL.BKH.F.N...J.K.F...GABD..A..FJ..LIM.K.E.LFCDB.O.M.N.I..JI....PD.....L......H.IJ....CBA'


sudokuSolver(s, basicArr)




// /**
//  * Auto-generated code below aims at helping you parse
//  * the standard input according to the problem statement.
//  **/
// let puzzleString = []
// for (let i = 0; i < 16; i++) {
//     const ROW = readline();
//     puzzleString.push(...ROW.split(''))
// }

// let basicArr = 'ABCDEFGHIJKLMNOP'.split('')

// let sudoku = puzzleString.map((x) => {
//     if (x == ".") {
//         return basicArr;
//     } else return x;
// });
// const sudokuLong = Math.sqrt(sudoku.length)
// const regionLong = Math.sqrt(sudokuLong)
// // console.error(sudokuLong, regionLong)

// let solved = false
// let round = 0
// let updating = true
// let breaka = false

// const head = {
//     last: null,
//     initSudoku: [],
//     allPosi: [],
//     currentEle: {},
//     next: null
// }
// let temp = head


// while (solved == false && round < 9999) {
//     updating = false
//     breaka = false
//     round++

//     sudoku = eliminatePossibilityFromRowColRegion(eliminatePossibility, sudoku)

//     let num = 0
//     sudoku = sudoku.map(el => {
//         if (typeof el == 'string' || typeof el == 'number') num++
//         else if (Array.isArray(el) && el.length === 0) breaka = true
//         else if (Array.isArray(el) && el.length == 1) {
//             updating = true
//             return el[0]
//         }
//         return el
//     })

//     if (num === sudokuLong * sudokuLong) {
//         solved = true;
//         break;
//     }

//     if (breaka) {
//         if (!temp.last) { console.log('can not solve'); break }
//         while (temp.last && temp.currentEle.p.length === 0 && temp.allPosi.length === 0) { // go back to last node
//             temp = { ...temp.last }
//             console.error('last node')
//         }
//         sudoku = [...temp.initSudoku]



//         if (temp.currentEle.p.length > 0) { // go on give it another try 
//             sudoku[temp.currentEle.i] = temp.currentEle.p.shift()
//         } else if (temp.allPosi.length > 0) { // grab a posi obj and update currentElement    
//             temp.currentEle = temp.allPosi.shift()
//             sudoku[temp.currentEle.i] = temp.currentEle.p.shift()
//         }
//         continue;
//     }

//     if (!updating) {
//         let currentAllPosi = []
//         sudoku.forEach((x, i) => {
//             if (Array.isArray(x)) {
//                 const obj = {
//                     i: i,
//                     p: x  // array
//                 }
//                 currentAllPosi.push(obj)
//             }
//         })
//         currentAllPosi = currentAllPosi.sort((a, b) => a.p.length - b.p.length)
//         nextCrrEle = currentAllPosi.shift()

//         temp.next = {
//             last: temp.initSudoku.length === 0 ? null : { ...temp },
//             initSudoku: [...sudoku],
//             allPosi: currentAllPosi,
//             currentEle: nextCrrEle,
//             next: null
//         }
//         temp = { ...temp.next }
//         sudoku[temp.currentEle.i] = temp.currentEle.p.shift()
//         console.error('next node')
//     }
//     // console.error(round)

// }
// // console.error(sudoku)


// // console.error(round)
// for (let i = 0; i < sudoku.length; i += 16) {
//     console.log(sudoku.slice(i, i + 16).join(''))
// }






// function eliminatePossibilityFromRowColRegion(
//     eliminatePossibility,
//     sudoku
// ) {

//     // eliminate possibility of a row
//     let rowNumArr = [],
//         rowPosiObj = {}

//     for (let i = 0; i < sudoku.length; i++) {
//         if (typeof sudoku[i] == "number" || typeof sudoku[i] == "string") rowNumArr.push(sudoku[i])
//         else rowPosiObj[i] = sudoku[i]
//         if (i != 0 && i % (sudokuLong - 1) === 0) {
//             console.error(i)
//             eliminatePossibility(rowNumArr, rowPosiObj, sudoku)
//             rowNumArr = []
//             rowPosiObj = {}
//         }
//     }

//     // eliminate possibility of a column
//     const columnObj = {}
//     // {'0' : numArr: [1, 2, 3] , posi:{31:[1,2,5]}}
//     for (let i = 0; i < sudokuLong; i++) {
//         const rest = i % sudokuLong // 0 -15
//         const obj = {
//             numArr: [],
//             posi: {}
//         }
//         if (typeof sudoku[i] == "number" || typeof sudoku[i] == "string") obj.numArr.push(sudoku[i])
//         else {
//             obj.posi[i] = sudoku[i]
//         }
//         columnObj[rest] = obj
//     }
//     for (let column in columnObj) {
//         eliminatePossibility(columnObj[column].numArr, columnObj[column].posi, sudoku)
//     }

//     // eliminate possibility of a region
//     let regionNumArr = []
//     let allPossibilityOBJ = {}
//     for (let i = 0; i < sudoku.length; i += sudokuLong * regionLong) {
//         for (let j = i; j < i + sudokuLong; j += regionLong) {
//             for (let k = j; k < j + regionLong; k++) {
//                 for (let l = k; l < k + sudokuLong * regionLong; l += sudokuLong) {

//                     if (typeof sudoku[l] == "number" || typeof sudoku[l] == "string") {
//                         regionNumArr.push(sudoku[l])
//                     } else allPossibilityOBJ[l] = sudoku[l]
//                 }
//             }
//             // console.error(regionNumArr)
//             eliminatePossibility(regionNumArr, allPossibilityOBJ, sudoku)
//             regionNumArr = []
//             allPossibilityOBJ = {}
//         }
//     }
//     return sudoku
// }


// function eliminatePossibility(numArr, possibilityOBJ, sudoku) {
//     if (numArr.length === sudokuLong) return
//     // console.error(possibilityArr)
//     const obj = numArr.reduce((acc, x) => {
//         acc[x] = 1
//         return acc
//     }, {})
//     for (let index in possibilityOBJ) {
//         sudoku[index] = possibilityOBJ[index].filter(x => {
//             if (!obj.hasOwnProperty(x)) {
//                 return x
//             } else {
//                 updating = true
//             }
//         });
//     }
// }

