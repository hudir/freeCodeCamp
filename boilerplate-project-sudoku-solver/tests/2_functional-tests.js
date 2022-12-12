const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");
const { puzzlesAndSolutions } = require("../controllers/puzzle-strings");

chai.use(chaiHttp);
const sudokuExp =
  "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

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
    done();
  });

  test("Solve a puzzle with missing puzzle string", (done) => {
    puzzlesAndSolutions.forEach((x) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Required field missing");
        });
    });
    done();
  });

  test("Solve a puzzle with invalid characters", (done) => {
    puzzlesAndSolutions.forEach((x) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({
          puzzle: x[0]
            .split("")
            .map((x, i) => (i == 20 ? "a" : x))
            .join(""),
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Invalid characters in puzzle");
        });
    });
    done();
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
          assert.equal(
            res.body.error,
            "Expected puzzle to be 81 characters long"
          );
        });
    });
    done();
  });

  test("Solve a puzzle that cannot be solved", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .send({ puzzle: ".".repeat(81) })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Puzzle cannot be solved");
      });

    done();
  });

  // POST request to /api/check
  test("Check a puzzle placement with all fields", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle: sudokuExp, coordinate: "B1", value: 8 })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "valid");
        assert.isTrue(res.body.valid);
      });
    done();
  });

  test("Check a puzzle placement with single placement conflict", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle: sudokuExp, coordinate: "A1", value: 6 })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "valid");
        assert.property(res.body, "conflict");
        assert.isFalse(res.body.valid);
        assert.lengthOf(res.body.conflict, 1);
        assert.include(res.body.conflict, "column");
      });
    done();
  });

  test("Check a puzzle placement with multiple placement conflicts", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle: sudokuExp, coordinate: "B5", value: 4 })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "valid");
        assert.property(res.body, "conflict");
        assert.isFalse(res.body.valid);
        assert.lengthOf(res.body.conflict, 2);
        assert.includeMembers(res.body.conflict, ["row", "region"]);
      });
    done();
  });

  test("Check a puzzle placement with all placement conflicts", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle: sudokuExp, coordinate: "A2", value: 9 })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "valid");
        assert.property(res.body, "conflict");
        assert.isFalse(res.body.valid);
        assert.lengthOf(res.body.conflict, 3);
        assert.includeMembers(res.body.conflict, ["column", "row", "region"]);
      });
    done();
  });

  test("Check a puzzle placement with missing required fields", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle: sudokuExp })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Required field(s) missing");
      });

    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle: sudokuExp, coordinate: "A2" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Required field(s) missing");
      });
    done();
  });

  test("Check a puzzle placement with invalid characters", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle: "a".repeat(81), coordinate: "A2", value: 9 })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Invalid characters in puzzle");
      });
    done();
  });

  test("Check a puzzle placement with incorrect length", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle: sudokuExp.slice(77), coordinate: "A2", value: 9})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, "error");
          assert.equal(
            res.body.error,
            "Expected puzzle to be 81 characters long"
          );
        });
    done();
  });

  test("Check a puzzle placement with invalid placement coordinate", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle: sudokuExp, coordinate: "a2", value: 9})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(
          res.body.error,
          'Invalid coordinate'
        );
      });

      chai
      .request(server)
      .post("/api/check")
      .send({ puzzle: sudokuExp, coordinate: "A0", value: 9})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(
          res.body.error,
          'Invalid coordinate'
        );
      });
  done();
});

  test("Check a puzzle placement with invalid placement value", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle: sudokuExp, coordinate: "A2", value: 10})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(
          res.body.error,
          'Invalid value'
        );
      });

      chai
      .request(server)
      .post("/api/check")
      .send({ puzzle: sudokuExp, coordinate: "A2", value: -1})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(
          res.body.error,
          'Invalid value'
        );
      });

      chai
      .request(server)
      .post("/api/check")
      .send({ puzzle: sudokuExp, coordinate: "A2", value: 'a'})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(
          res.body.error,
          'Invalid value'
        );
      });
  done();
});
});
