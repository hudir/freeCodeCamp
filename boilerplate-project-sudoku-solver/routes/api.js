'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      if(!req.body.puzzle || !req.body.coordinate || !req.body.value) return res.json({ error: 'Required field(s) missing' })

      if(solver.validate(req.body.puzzle).error) return res.status(200).json({error : solver.validate(req.body.puzzle).error})

      let puzzle = req.body.puzzle
      , coordinate = {row: req.body.coordinate[0], num: +req.body.coordinate.slice(1)}
      , value = req.body.value;

      if(isNaN(+ coordinate.num) || coordinate.num < 1 || coordinate.num > 9 || coordinate.row.charCodeAt(0) < 65 || coordinate.row.charCodeAt(0) > 73) {
        return res.json({ error: 'Invalid coordinate'})
      }

      if(isNaN(+ value) ||  value < 1 || value > 9) return res.json({ error: 'Invalid value' })

      res.json(solver.checkCoordinate(puzzle, req.body.coordinate, value))
    });
    
  app.route('/api/solve')
    .post((req, res) => {
 
      if(!req.body.puzzle) return res.status(200).json({ error: 'Required field missing' })

      if(solver.validate(req.body.puzzle).error) {
        return res.status(200).json({error : solver.validate(req.body.puzzle).error})
      }

      if(!solver.solve(req.body.puzzle)) return res.status(200).json({ error: 'Puzzle cannot be solved' })
 
      res.status(200).json({solution: solver.solve(req.body.puzzle)})
    });
};
