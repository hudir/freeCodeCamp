```js
```

.approximately(actual, expected, delta, [message])
Asserts that the actual is equal to expected, to within a +/- delta range.



```js
.approximately(actual, expected, delta, [message])
@param { Number } actual
@param { Number } expected
@param { Number } delta
@param { String } message
Asserts that the target is equal expected, to within a +/- delta range.

assert.approximately(1.5, 1, 0.5, 'numbers are close');
```




```js
```


When you test a PUT request, you'll often send data along with it. The data you include with your PUT request is called the body of the request.

To send a PUT request and a JSON object to the '/travellers' endpoint, you can use chai-http plugin's put and send methods:

chai
  .request(server)
  .put('/travellers')
  .send({
    "surname": [last name of a traveller of the past]
  })
  ...
And the route responds with:

{
  "name": [first name],
  "surname": [last name],
  "dates": [birth - death years]
}
See the server code for the different responses to the '/travellers' endpoint.



Here's an example of how to use Zombie.js to interact with the form:

test('Submit the surname "Polo" in the HTML form', function (done) {
  browser.fill('surname', 'Polo').then(() => {
    browser.pressButton('submit', () => {
      browser.assert.success();
      browser.assert.text('span#name', 'Marco');
      browser.assert.text('span#surname', 'Polo');
      browser.assert.elements('span#dates', 1);
      done();
    });
  });
});
First, the fill method of the browser object fills the surname field of the form with the value 'Polo'. fill returns a promise, so then is chained off of it.

Within the then callback, the pressButton method of the browser object is used to invoke the form's submit event listener. The pressButton method is asynchronous.

Then, once a response is received from the AJAX request, a few assertions are made confirming:

The status of the response is 200
The text within the <span id='name'></span> element matches 'Marco'
The text within the <span id='surname'></span> element matches 'Polo'
There is 1 <span id='dates'></span> element.
Finally, the done callback is invoked, which is needed due to the asynchronous test.