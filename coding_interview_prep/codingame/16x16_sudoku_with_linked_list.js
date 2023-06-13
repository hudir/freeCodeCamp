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

    let next = 0
    let last = 1
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
        if (!breaka) {
            eliminatePossibility(cols)
            eliminatePossibility(regs)
            findTheUnique(rows)
            findTheUnique(cols)
            findTheUnique(regs)
        }


        if (!breaka && sudoku.every(x => typeof x == 'number' || typeof x == 'string')) {
            solved = true
            break
        }

        if (breaka) {
            if (temp.last === 'head') { console.log('can not solve'); break }
            while (temp.last && temp.currentEle.p.length === 0 && temp.allPosi.length === 0) { // go back to last node
                temp = { ...temp.last }
                last++
                // console.log('last')
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
            // currentAllPosi = currentAllPosi.sort((b, a) => a.p.length - b.p.length)
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
            next++
            // console.log('next')

        }
    }

    console.error('next: ', next, ', last: ', last)
    // console.error(sudoku)

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
                    if (acc[sudoku[x]]) {
                        breaka = true
                        console.error('break: ', sudoku[x], " is repeated at index: ", x, ' ')
                    }
                    acc[sudoku[x]] = 1
                }
                else {
                    posi[x] = 0
                    if (sudoku[x].length === 2) pair[x] = sudoku[x].sort()
                }
                return acc
            }, {})


            // console.error(pair)

            if (breaka) return

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
                if (sudoku[index].length === 0) {
                    breaka = true; 
                    console.error('break: ', sudoku[index], " is empty at index: ", index, ' ')
                    return 
                }
            }

        }

    }

    function findTheUnique(indexObj) {

        for (let group in indexObj) {
            const count = {}
            const exist = {}

            indexObj[group].forEach(i => {
                if (Array.isArray(sudoku[i])) {
                    sudoku[i].forEach(y => {
                        if (count.hasOwnProperty(y)) {
                            count[y].count++
                            count[y].index.push(i)
                        }
                        else count[y] = {
                            index: [i],
                            count: 0
                        }
                    })

                } else exist[sudoku[i]] = 1
            })

            for (let value in count) {
                if (count[value].count === 0 && exist[value] != 1) {
                    sudoku[count[value].index[0]] = value
                    // console.error(count[value].index[0], value)
                    updating = true
                }
            }
        }
    }
}

let puzzleString = "........B.HAL..N..N.....D...OEF...K.A..J..NO.B.P...CL.D..G.E.M.J...JH..P.......E.N.K.....I..JGOD.OM..IECNB.GH...HB...D..P.J.NFCI.HA.ME......KN.CD..ENB.H.POL....NM.B..O.JK..D....PL....D.....A.O.E.HDC.....FPK...C..EAN.OL.P.I..IA.NG.PM..KD..E...O.IH.....NAC.." // next:  1389 , last:  1371
let basicArr = 'ABCDEFGHIJKLMNOP'.split('')

let puzzleString1 = ".M.OA.F......I...G.PK.MC.NB...EHK.C..H.E.IP.F...N.....OL.AJE.P.B....B...A...L.JO.I.C..L.G..N.E...H.K..I..J.LG.D.......G.EF..I...GC.BI..D..K..H.N..F..C.B....MKL.LKH..N..B..G..C.P..M.KJ..E.C.AI.IAE....F..C..MKJH....DCA...O.LP.M....ON.DB.....C.P....K.I..F...." // next:  5926 , last:  5907

sudokuSolver(puzzleString, basicArr)