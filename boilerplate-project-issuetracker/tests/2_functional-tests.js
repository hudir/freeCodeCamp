const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
// Create an issue with every field: POST request to /api/issues/{project}
  test("every", done =>{
    chai.request(server)
    .post('/apt/issues/test')
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
      done()
    });
    
  })
// Create an issue with only required fields: POST request to /api/issues/{project}
  test("required", done =>{
    chai.request(server)
    .post('/apt/issues/test')
    .send({
      issue_title: "Hi2",
      issue_text: "nihao2",
      created_by: "hudir",
    })
    .end((err, res) => {
      console.log(err)
      assert.equal(res.status, 200)
      assert.isOk(res.body)
      assert.equal(res.body.open, true)
       done()
    });
   
  })
// Create an issue with missing required fields: POST request to /api/issues/{project}
// View issues on a project: GET request to /api/issues/{project}
// View issues on a project with one filter: GET request to /api/issues/{project}
// View issues on a project with multiple filters: GET request to /api/issues/{project}
// Update one field on an issue: PUT request to /api/issues/{project}
// Update multiple fields on an issue: PUT request to /api/issues/{project}
// Update an issue with missing _id: PUT request to /api/issues/{project}
// Update an issue with no fields to update: PUT request to /api/issues/{project}
// Update an issue with an invalid _id: PUT request to /api/issues/{project}
// Delete an issue: DELETE request to /api/issues/{project}
// Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
// Delete an issue with missing _id: DELETE request to /api/issues/{project}

  
});
