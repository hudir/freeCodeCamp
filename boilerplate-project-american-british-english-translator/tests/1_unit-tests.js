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
// Translate No Mr. Bond, I expect you to die. to British English
test('No Mr. Bond, I expect you to die', done => {
    assert.equal(new Translator().trans("No Mr. Bond, I expect you to die", toB), `No <span class="highlight">Mr</span> Bond, I expect you to die`)
    done()
})
// Translate Dr. Grosh will see you now. to British English
test('Dr. Grosh will see you now', done => {
    assert.equal(new Translator().trans("Dr. Grosh will see you now", toB), `<span class="highlight">Dr</span> Grosh will see you now`)
    done()
})
// Translate Lunch is at 12:15 today. to British English
test('Lunch is at 12:15 today', done => {
    assert.equal(new Translator().trans("Lunch is at 12:15 today", toB), `Lunch is at <span class="highlight">12.15</span> today`)
    done()
})
// Translate We watched the footie match for a while. to American English
test('We watched the footie match for a while', done => {
    assert.equal(new Translator().trans("We watched the footie match for a while", toA), `We watched the <span class="highlight">soccer</span> match for a while`)
    done()
})
// Translate Paracetamol takes up to an hour to work. to American English
test('Paracetamol takes up to an hour to work', done => {
    assert.equal(new Translator().trans("Paracetamol takes up to an hour to work", toA), `<span class="highlight">Tylenol</span> takes up to an hour to work`)
    done()
})
// Translate First, caramelise the onions. to American English
test('First, caramelise the onions', done => {
    assert.equal(new Translator().trans("First, caramelise the onions", toA), `First, <span class="highlight">caramelize</span> the onions`)
    done()
})
// Translate I spent the bank holiday at the funfair. to American English
test('I spent the bank holiday at the funfair', done => {
    assert.equal(new Translator().trans("I spent the bank holiday at the funfair", toA), `I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>`)
    done()
})
// Translate I had a bicky then went to the chippy. to American English
test('I had a bicky then went to the chippy', done => {
    assert.equal(new Translator().trans("I had a bicky then went to the chippy", toA), `I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>`)
    done()
})
// Translate I've just got bits and bobs in my bum bag. to American English
test(`I've just got bits and bobs in my bum bag`, done => {
    assert.equal(new Translator().trans("I've just got bits and bobs in my bum bag", toA), `I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>`)
    done()
})
// Translate The car boot sale at Boxted Airfield was called off. to American English
test('The car boot sale at Boxted Airfield was called off', done => {
    assert.equal(new Translator().trans("The car boot sale at Boxted Airfield was called off", toA), `The <span class="highlight">swap meet</span> at Boxted Airfield was called off`)
    done()
})
// Translate Have you met Mrs Kalyani? to American English
test('Have you met Mrs Kalyani?', done => {
    assert.equal(new Translator().trans("Have you met Mrs Kalyani?", toA), `Have you met <span class="highlight">Mrs.</span> Kalyani?`)
    done()
})
// Translate Prof Joyner of King's College, London. to American English
test(`Prof Joyner of King's College, London`, done => {
    assert.equal(new Translator().trans("Prof Joyner of King's College, London", toA), `<span class="highlight">Prof.</span> Joyner of King's College, London`)
    done()
})
// Translate Tea time is usually around 4 or 4.30. to American English
test('Tea time is usually around 4 or 4.30', done => {
    assert.equal(new Translator().trans("Tea time is usually around 4 or 4.30", toA), `Tea time is usually around 4 or <span class="highlight">4:30</span>`)
    done()
})
// Highlight translation in Mangoes are my favorite fruit.
test('Highlight translation in Mangoes are my favorite fruit', done => {
    assert.equal(new Translator().trans("Mangoes are my favorite fruit", toB), `Mangoes are my <span class="highlight">favourite</span> fruit`)
    done()
})
// Highlight translation in I ate yogurt for breakfast.
test('Highlight translation in I ate yogurt for breakfast.', done => {
    assert.equal(new Translator().trans("I ate yogurt for breakfast", toB), `I ate <span class="highlight">yoghurt</span> for breakfast`)
    done()
})
// Highlight translation in We watched the footie match for a while.
test('Highlight translation in We watched the footie match for a while', done => {
    assert.equal(new Translator().trans("We watched the footie match for a while", toA), `We watched the <span class="highlight">soccer</span> match for a while`)
    done()
})
// Highlight translation in Paracetamol takes up to an hour to work.
test('Highlight translation in Paracetamol takes up to an hour to work', done => {
    assert.equal(new Translator().trans("Paracetamol takes up to an hour to work", toA), `<span class="highlight">Tylenol</span> takes up to an hour to work`)
    done()
})

});
