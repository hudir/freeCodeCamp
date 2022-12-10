'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const puzzle = req.body.puzzle

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      if(!req.body.puzzle) return res.send({ error: 'Required field missing' })

      if(SudokuSolver.validate(req.body.puzzle).error) res.send(SudokuSolver.validate(req.body.puzzle).error)

      if(!SudokuSolver.checkRowPlacement(req.body.puzzle) || !SudokuSolver.checkColPlacement(req.body.puzzle) || !SudokuSolver.checkRegionPlacement(req.body.puzzle)) res.send({ error: 'Puzzle cannot be solved' })
      

    });
};
