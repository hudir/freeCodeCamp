'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      if(!req.body.puzzle || !req.body.coordinate || !req.body.value) return res.send({ error: 'Required field(s) missing' })

      if(SudokuSolver.validate(req.body.puzzle).error) return res.send(SudokuSolver.validate(req.body.puzzle).error)

      // if(!SudokuSolver.solve(req.body.puzzle)) return res.send({ error: 'Puzzle cannot be solved' })

      let puzzle = req.body.puzzle
      , coordinate = {row: req.body.coordinate[0], num: req.body.coordinate[1]}
      , value = req.body.value;

      if(isNaN(+ coordinate.num) || coordinate.num < 1 || coordinate.num > 9 || coordinate.row.charCodeAt(0) < 65 || coordinate.row.charCodeAt(0) > 73) return res.send({ error: 'Invalid coordinate'})

      if(isNaN(+ value) ||  value < 1 || value > 9) res.send({ error: 'Invalid value' })




    });
    
  app.route('/api/solve')
    .post((req, res) => {
      if(!req.body.puzzle) return res.send({ error: 'Required field missing' })

      if(SudokuSolver.validate(req.body.puzzle).error) return res.send(SudokuSolver.validate(req.body.puzzle).error)

      if(!SudokuSolver.solve(req.body.puzzle)) return res.send({ error: 'Puzzle cannot be solved' })
       
      res.send({solution: SudokuSolver.solve(req.body.puzzle)})
    });
};
