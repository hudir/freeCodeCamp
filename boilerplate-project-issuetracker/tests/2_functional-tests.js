const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
let idToDelete
suite('Functional Tests', function() {
// Create an issue with every field: POST request to /api/issues/{project}
  test("every", done =>{
    chai.request(server)
    .post('/api/issues/test')
    .send({
      //project: "test1",
      issue_title: "Hi",
      issue_text: "nihao",
      created_by: "hudir",
      assigned_to: "lolo",
      status_text: "working"
    })
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.isOk(res.body)
      idToDelete = res.body._id
      done()
    });
    
  })
// Create an issue with only required fields: POST request to /api/issues/{project}
  test("required", done =>{
    chai.request(server)
    .post('/api/issues/test')
    .send({
      issue_title: "Hi2",
      issue_text: "nihao2",
      created_by: "hudir",
    })
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.isOk(res.body)
      assert.equal(res.body.open, true)
       done()
    });
  })
// Create an issue with missing required fields: POST request to /api/issues/{project}
  test("missing", done =>{
    chai.request(server)
    .post('/api/issues/test')
    .send({
      issue_title: "Hi3",
      created_by: "hudir",
    })
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.isOk(res.body)
      assert.isNotOk(res.body.open)
      assert.equal(res.body.error,  'required field(s) missing')
      done()
    });
  })
// View issues on a project: GET request to /api/issues/{project}
    test("ViewIssues", done =>{
    chai.request(server)
    .get('/api/issues/test')
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.isOk(res.body)
      assert.isAtLeast(res.body.length, 0)
      done()
    });
  })
// View issues on a project with one filter: GET request to /api/issues/{project}
    test("ViewIssuesOneFilter", done =>{
    chai.request(server)
    .get('/api/issues/test?open=true')
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.isOk(res.body)
      assert.isAtLeast(res.body.length, 0)
      done()
    });
  })
// View issues on a project with multiple filters: GET request to /api/issues/{project}
      test("ViewIssuesMoreFilter", done =>{
    chai.request(server)
    .get('/api/issues/test?open=true&assigned_to=Joe')
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.isOk(res.body)
      assert.equal(res.body.length, 0)
      done()
    });
  })
// Update one field on an issue: PUT request to /api/issues/{project}
    test("put", done =>{
    chai.request(server)
    .put('/api/issues/test')
    .send({
      _id: '636b40f87fb3b6a4296e1348',
      issue_title: "Hi3",
      // created_by: "hudir",
    })
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.body.result,  'successfully updated');
      assert.equal(res.body._id,  '636b40f87fb3b6a4296e1348');
      done()
    });
  })
// Update multiple fields on an issue: PUT request to /api/issues/{project}
   test("putMultipleFields", done =>{
    chai.request(server)
    .put('/api/issues/test')
    .send({
      _id: '636b40f87fb3b6a4296e1348',
      issue_title: "Hi4",
      created_by: "hudir",
    })
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.body.result,  'successfully updated');
      assert.equal(res.body._id,  '636b40f87fb3b6a4296e1348')
      done()
    });
  })
// Update an issue with missing _id: PUT request to /api/issues/{project}
      test("putMissingId", done =>{
    chai.request(server)
    .put('/api/issues/test')
    .send({
      issue_title: "Hi3",
      created_by: "hudir",
    })
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.isOk(res.body)
      assert.isNotOk(res.body.open)
      assert.equal(res.body.error, 'missing _id')
      done()
    });
  })
// Update an issue with no fields to update: PUT request to /api/issues/{project}
    test("nothingToUpdate", done =>{
    chai.request(server)
    .put('/api/issues/test')
    .send({
      _id: '636b40f87fb3b6a4296e1348'
    })
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.body.error, 'no update field(s) sent');
      assert.equal(res.body._id, '636b40f87fb3b6a4296e1348');
      done()
    });
  })
// Update an issue with an invalid _id: PUT request to /api/issues/{project}
  test("invalidId", done =>{
    chai.request(server)
    .put('/api/issues/test')
    .send({
      _id: '636b40f87fb3b6a4296e1348 with invalid _id',
      issue_title: "Hi3",
      created_by: "hudir"
    })
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.body.error, 'could not update');
      assert.equal(res.body._id, '636b40f87fb3b6a4296e1348 with invalid _id');
      done()
    });
  })
// Delete an issue: DELETE request to /api/issues/{project}
   test("deleteOne", done =>{
    chai.request(server)
    .delete('/api/issues/test')
    .send({
      _id: idToDelete
    })
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.body.result, 'successfully deleted');
      assert.equal(res.body._id, idToDelete);
      done()
    });
  })
// Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
  test("deleteInvalidId", done =>{
    chai.request(server)
    .delete('/api/issues/test')
    .send({
      _id: '636b40fd7fb3b6a4296e134f with invalild id'
    })
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.body.error, 'could not delete');
      assert.equal(res.body._id, '636b40fd7fb3b6a4296e134f with invalild id');
      done()
    });
  })
// Delete an issue with missing _id: DELETE request to /api/issues/{project}
  test("deleteWithOutId", done =>{
    chai.request(server)
    .delete('/api/issues/test')
    .send({})
    .end((err, res) => {
      assert.equal(res.status, 200)
      assert.equal(res.body.error, 'missing _id');
      done()
    });
  })
  
});
