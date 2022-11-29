const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const {puzzlesAndSolutions} = require('../controllers/puzzle-strings')
const solutionsArr = puzzlesAndSolutions.map(x=>x[1])
let solver;

suite('Unit Tests', () => {
    test('valid puzzle', done => {
        assert.isOk(new Solver().validate('1'.repeat(81)))
        assert.isOk(new Solver().validate('9'.repeat(81)))
        assert.isOk(new Solver().validate('.'.repeat(81)))
        done()
    })

    test('invalid characters', done => {
        assert.isNotOk(new Solver().validate('a'.repeat(81)))
        done()
    })

    test('not 81 characters', done => {
        assert.isNotOk(new Solver().validate('1'.repeat(22)))
        assert.isNotOk(new Solver().validate('9'.repeat(66)))
        assert.isNotOk(new Solver().validate('.'.repeat(80)))
        done()
    })

    test('basic check', done => {
       assert.isOk(new Solver().checkBasic([
        '1', '3', '5',
        '7', '6', '2',
        '9', '8', '4'
      ].join('')))
      assert.isNotOk(new Solver().checkBasic([
        '1', '3', '5',
        '7', '6', '2',
        '9', '9', '4'
      ].join('')))
       done()
    })

    test('valid row placement', done => {
        solutionsArr.forEach(x=> {
            assert.isOk(new Solver().checkRowPlacement(x))
        })
        done()
    })

    test('invalid row placement', done => {   
      assert.isNotOk(new Solver().checkRowPlacement("887549163531672894649831527496157382218396475753284916962415738185763249374928651"))
      done()
    })

    test('valid column placement', done => {
        solutionsArr.forEach(x=> {
            assert.isOk(new Solver().checkColPlacement(x))
        })
        done()
    })

    test('invalid column placement', done => {   
      assert.isNotOk(new Solver().checkColPlacement("987549163531672894649831527496157382218396475753284916962415738185763249374928651"))
      done()
    })

    test('valid region (3x3 grid) placement', done => {
        solutionsArr.forEach(x=> {
            assert.isOk(new Solver().checkRegionPlacement(x))
        })
        done()
    })

    test('invalid region (3x3 grid) placement', done => {   
      assert.isNotOk(new Solver().checkRegionPlacement("987549163531672894649831527496157382218396475753284916962415738185763249374928651"))
      done()
    })

    test('sudoku solving, row', done => {

        console.log(puzzlesAndSolutions[0][0])
        new Solver().solve(puzzlesAndSolutions[0][0])
        
        done()
    })

});
