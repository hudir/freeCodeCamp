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
            console.log(x)
            assert.isOk(new Solver().checkRowPlacement(x))
        })
        done()
    })

});
