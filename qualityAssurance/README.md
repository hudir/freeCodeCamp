





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


# node
One of the greatest features of using a template engine is being able to pass variables from the server to the template file before rendering it to HTML.



In your Pug file, you're able to use a variable by referencing the variable name as #{variable_name} inline with other text on an element or by using an equal sign on the element without a space such as p=variable_name which assigns the variable's value to the p element's text.

Pug is all about using whitespace and tabs to show nested elements and cutting down on the amount of code needed to make a beautiful site. Read the Pug documentation for more information on usage and syntax.

Here is an example:

<!--Typing this using Pug-->
head
   script(type='text/javascript').
     if (foo) bar(1 + 5);
 body
   if youAreUsingPug
       p You are amazing
     else
       p Get on it!
   
<!--will lead to creating this code-->
 <head>
   <script type="text/javascript">
     if (foo) bar(1 + 5);
   </script>
 </head>
 <body>
   <p>You are amazing</p>
 </body>
Looking at our pug file index.pug included in your project, we used the variables title and message.

To pass those along from our server, you will need to add an object as a second argument to your res.render with the variables and their values. For example, pass this object along setting the variables for your index view: {title: 'Hello', message: 'Please login'}

It should look like: res.render(process.cwd() + '/views/pug/index', {title: 'Hello', message: 'Please login'}); Now refresh your page and you should see those values rendered in your view in the correct spot as laid out in your index.pug file!

t's time to set up Passport so we can finally start allowing a user to register or login to an account! In addition to Passport, we will use Express-session to handle sessions. Express-session has a ton of advanced features you can use, but for now we're just going to use the basics! Using this middleware saves the session id as a cookie in the client and allows us to access the session data using that id on the server. This way we keep personal account information out of the cookie used by the client to verify to our server they are authenticated and just keep the key to access the data stored on the server.


You will need to set up the session settings now and initialize Passport. Be sure to first create the variables 'session' and 'passport' to require 'express-session' and 'passport' respectively.

To set up your express app to use the session we'll define just a few basic options. Be sure to add 'SESSION_SECRET' to your .env file and give it a random value. This is used to compute the hash used to encrypt your cookie!

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));
As well you can go ahead and tell your express app to use 'passport.initialize()' and 'passport.session()'. (For example, app.use(passport.initialize());)


Serialization and deserialization are important concepts in regards to authentication. To serialize an object means to convert its contents into a small key that can then be deserialized into the original object. This is what allows us to know who has communicated with the server without having to send the authentication data, like the username and password, at each request for a new page.

The serializeUser is called with 2 arguments, the full user object and a callback used by passport. A unique key to identify that user should be returned in the callback, the easiest one to use being the user's _id in the object. It should be unique as it is generated by MongoDB. Similarly, deserializeUser is called with that key and a callback function for passport as well, but, this time, we have to take that key and return the full user object to the callback. To make a query search for a Mongo _id, you will have to create const ObjectID = require('mongodb').ObjectID;, and then to use it you call new ObjectID(THE_ID). mongodb@~3.6.0 has already been added as a dependency. You can see this in the examples below:

```js
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
    done(null, null);
  });
});
```



The final part of the strategy is handling the profile returned from GitHub. We need to load the user's database object if it exists, or create one if it doesn't, and populate the fields from the profile, then return the user's object. GitHub supplies us a unique id within each profile which we can use to search with to serialize the user with (already implemented). Below is an example implementation you can use in your project--it goes within the function that is the second argument for the new strategy, right below where console.log(profile); currently is:
```js
myDataBase.findOneAndUpdate(
  { id: profile.id },
  {
    $setOnInsert: {
      id: profile.id,
      name: profile.displayName || 'John Doe',
      photo: profile.photos[0].value || '',
      email: Array.isArray(profile.emails)
        ? profile.emails[0].value
        : 'No public email',
      created_on: new Date(),
      provider: profile.provider || ''
    },
    $set: {
      last_login: new Date()
    },
    $inc: {
      login_count: 1
    }
  },
  { upsert: true, new: true },
  (err, doc) => {
    return cb(null, doc.value);
  }
);
```

findOneAndUpdate allows you to search for an object and update it. If the object doesn't exist, it will be inserted and made available to the callback function. In this example, we always set last_login, increment the login_count by 1, and only populate the majority of the fields when a new object (new user) is inserted. Notice the use of default values. Sometimes a profile returned won't have all the information filled out or the user will keep it private. In this case, you handle it to prevent an error.

Authentication with Socket.IO
Currently, you cannot determine who is connected to your web socket. While req.user contains the user object, that's only when your user interacts with the web server, and with web sockets you have no req (request) and therefore no user data. One way to solve the problem of knowing who is connected to your web socket is by parsing and decoding the cookie that contains the passport session then deserializing it to obtain the user object. Luckily, there is a package on NPM just for this that turns a once complex task into something simple!

passport.socketio@~3.7.0, connect-mongo@~3.2.0, and cookie-parser@~1.4.5 have already been added as dependencies. Require them as passportSocketIo, MongoStore, and cookieParser respectively. Also, we need to initialize a new memory store, from express-session which we previously required. It should look like this: