const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");
const { puzzlesAndSolutions } = require("../controllers/puzzle-strings");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  test("Solve a puzzle with valid puzzle string", (done) => {
    puzzlesAndSolutions.forEach((x) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: x[0] })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, "solution");
          assert.equal(res.body.solution, x[1]);
        });
    });
    done()
  });

  test("Solve a puzzle with missing puzzle string", (done) => {
    puzzlesAndSolutions.forEach((x) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({ })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, "error");
          assert.equal(res.body.error, 'Required field missing')
        });
    });
    done()
  });
  
  test("Solve a puzzle with invalid characters", (done) => {
    puzzlesAndSolutions.forEach((x) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: x[0].split('').map((x,i)=> i == 20 ? "a" : x).join('')})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, "error");
          assert.equal(res.body.error, 'Invalid characters in puzzle')
        });
    });
    done()
  });

  test("Solve a puzzle with incorrect length", (done) => {
    puzzlesAndSolutions.forEach((x) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: x[0].slice(1) })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, "error");
          assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
        });
    });
    done()
  });

  // Solve a puzzle that cannot be solved: POST request to /api/solve
  test("Solve a puzzle that cannot be solved", (done) => {

    chai
    .request(server)
      .post("/api/solve")
      .send({ puzzle: '.'.repeat(81) })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, 'Puzzle cannot be solved')
      });

    done()
  });

  
  // Check a puzzle placement with all fields: POST request to /api/check
  // Check a puzzle placement with single placement conflict: POST request to /api/check
  // Check a puzzle placement with multiple placement conflicts: POST request to /api/check
  // Check a puzzle placement with all placement conflicts: POST request to /api/check
  // Check a puzzle placement with missing required fields: POST request to /api/check
  // Check a puzzle placement with invalid characters: POST request to /api/check
  // Check a puzzle placement with incorrect length: POST request to /api/check
  // Check a puzzle placement with invalid placement coordinate: POST request to /api/check
  // Check a puzzle placement with invalid placement value: POST request to /api/check
});
