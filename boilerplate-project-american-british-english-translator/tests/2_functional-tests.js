const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    // // Translation with text and locale fields: POST request to /api/translate
    test("Translation with text and locale fields: POST request to /api/translate", done => {
        chai.request(server)
            .post('/api/translate')
            .send({
                text: "Have you met Mrs Kalyani?",
                locale: "british-to-american"
            })
            .end((err, res) => {
                assert.equal(res.body.translation, `Have you met <span class="highlight">Mrs.</span> Kalyani?`)
            })
        done()
    })

    // // // Translation with text and invalid locale field: POST request to /api/translate
    test("Translation with text and invalid locale field: POST request to /api/translate", done => {
        chai.request(server)
            .post('/api/translate')
            .send({
                text: "Have you met Mrs Kalyani?",
                locale: "111"
            })
            .end((err, res) => {
                assert.equal(res.body.error, 'Invalid value for locale field')
            })
        done()
    })
    // // // Translation with missing text field: POST request to /api/translate
    test("Translation with missing text field: POST request to /api/translate", done => {
        chai.request(server)
            .post('/api/translate')
            .send({   locale: "british-to-american"  })
            .end((err, res) => {
                assert.equal(res.body.error, 'Required field(s) missing')
            })
        done()
    })
    // // // Translation with missing locale field: POST request to /api/translate
    test("Translation with missing locale field: POST request to /api/translate", done => {
        chai.request(server)
            .post('/api/translate')
            .send({ text: "Have you met Mrs Kalyani?" })
            .end((err, res) => {
                assert.equal(res.body.error, 'Required field(s) missing')
            })
        done()
    })
    // // // Translation with empty text: POST request to /api/translate
    test("Translation with empty text: POST request to /api/translate", done => {
        chai.request(server)
            .post('/api/translate')
            .send({ text: ""})
            .end((err, res) => {
                assert.equal(res.body.error, 'No text to translate' )
            })
        done()
    })
    // // // Translation with text that needs no translation: POST request to /api/translate
    test("Translation with text that needs no translation: POST request to /api/translate", done => {
        chai.request(server)
            .post('/api/translate')
            .send({
                text: "Mangoes are my favorite fruit",
                locale: "american-to-british"
            })
            .end((err, res) => {
                assert.equal(res.body.translation, `Mangoes are my <span class="highlight">favourite</span> fruit`)
            })
        done()
    })

});
