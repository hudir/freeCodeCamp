const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const toB = "american-to-british"
const toA = "british-to-american"

suite('Unit Tests', () => {
// Translate Mangoes are my favorite fruit. to British English
test('Mangoes are my favorite fruit', done => {
    assert.equal(new Translator().trans("Mangoes are my favorite fruit", toB), `Mangoes are my <span class="highlight">favourite</span> fruit`)
    done()
})
// Translate I ate yogurt for breakfast. to British English
test('I ate yogurt for breakfast', done => {
    assert.equal(new Translator().trans("I ate yogurt for breakfast", toB), `I ate <span class="highlight">yoghurt</span> for breakfast`)
    done()
})
// Translate We had a party at my friend's condo. to British English
test("We had a party at my friend's condo", done => {
    assert.equal(new Translator().trans("We had a party at my friend's condo", toB), `We had a party at my friend's <span class="highlight">flat</span>`)
    done()
})
// Translate Can you toss this in the trashcan for me? to British English
test('Can you toss this in the trashcan for me?', done => {
    assert.equal(new Translator().trans("Can you toss this in the trashcan for me?", toB), `Can you toss this in the <span class="highlight">bin</span> for me?`)
    done()
})
// Translate The parking lot was full. to British English
test('Translate The parking lot was full', done => {
    assert.equal(new Translator().trans("The parking lot was full", toB), `The <span class="highlight">car park</span> was full`)
    done()
})
// Translate Like a high tech Rube Goldberg machine. to British English
test('Like a high tech Rube Goldberg machine', done => {
    assert.equal(new Translator().trans("Like a high tech Rube Goldberg machine", toB), `Like a high tech <span class="highlight">Heath Robinson device</span>`)
    done()
})
// Translate To play hooky means to skip class or work. to British English
test('To play hooky means to skip class or work', done => {
    assert.equal(new Translator().trans("To play hooky means to skip class or work", toB), `To <span class="highlight">bunk off</span> means to skip class or work`)
    done()
})
// // Translate No Mr. Bond, I expect you to die. to British English
// test('No Mr. Bond, I expect you to die', done => {
//     assert.equal(new Translator().trans("No Mr. Bond, I expect you to die", toB), ``)
//     done()
// })
// // Translate Dr. Grosh will see you now. to British English
// test('', done => {
//     assert.equal(new Translator().trans("", toB), ``)
//     done()
// })
// // Translate Lunch is at 12:15 today. to British English
// test('', done => {
//     assert.equal(new Translator().trans("", toB), ``)
//     done()
// })
// Translate We watched the footie match for a while. to American English
// test('', done => {
//     assert.equal(new Translator().trans("", toA), ``)
//     done()
// })
// Translate Paracetamol takes up to an hour to work. to American English
// Translate First, caramelise the onions. to American English
// Translate I spent the bank holiday at the funfair. to American English
// Translate I had a bicky then went to the chippy. to American English
// Translate I've just got bits and bobs in my bum bag. to American English
// Translate The car boot sale at Boxted Airfield was called off. to American English
// Translate Have you met Mrs Kalyani? to American English
// Translate Prof Joyner of King's College, London. to American English
// Translate Tea time is usually around 4 or 4.30. to American English
// Highlight translation in Mangoes are my favorite fruit.
// Highlight translation in I ate yogurt for breakfast.
// Highlight translation in We watched the footie match for a while.
// Highlight translation in Paracetamol takes up to an hour to work.

});
