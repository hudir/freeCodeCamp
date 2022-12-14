'use strict';
require('dotenv').config();
const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const session = require('express-session')
const passport = require('passport')
const ObjectID = require('mongodb').ObjectID
const LocalStrategy = require('passport-local')
const {join} = require('path')
const bcrypt = require('bcrypt')

const app = express();
app.set('view engine', 'pug')


fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'test',
  resave: true,
  saveUninitialized: true,
  cookie:{secure: false}
}))
app.use(passport.initialize())
app.use(passport.session())


myDB(async client => {
  const myDataBase = await client.db('database').collection('users');

  // Be sure to change the title
  app.route('/').get((req, res) => {
    //Change the response to render the Pug template
    res.render('pug', {
      title: 'Connected to Database',
      message: 'Please login',
      showLogin: true,
      showRegistration: true
    });
  });

  app.route('/profile').get(ensureAuthenticated, (req, res)=>{
    res.render(join(__dirname, '/views/pug/profile'), {
      username: req.user.username
    })
  })
  
  // Serialization and deserialization here...
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  
  passport.deserializeUser((id, done) => {
    myDataBase.findOne({ _id: new ObjectID(id) }, (err,   doc) => {
      done(null, doc);
    });
  });

  passport.use(new LocalStrategy((username, password, done) =>{
    myDataBase.findOne({ username: username}, (err, user) => {
      console.log('User'+username+ ' attempted to log in.')
      if(err) {return done(err);}
      if(!user) { return done(null, false);}
      if(!bcrypt.compareSync(password, user.password)) { return done(null, false);}
      return done(null, user)
    })
  }))

  
  app.route('/register')
  .post((req, res, next)=>{
    myDataBase.findOne( {username: req.body.username}, (err,exist) => {
      if(err) throw err
      if(exist) return res.redirect('/')
      const hashedPassword = bcrypt.hashSync(req.body.password, 12)
      myDataBase.insertOne({
        username: req.body.username,
        password: hashedPassword
      }, (err, user)=> {
        if (err) throw err
        next(null, user.ops[0])
      })
      
    })
  }, passport.authenticate('local', { failureRedirect: '/' }), (req, res) =>{
    res.redirect('/profile')
  })



  
  app.route('/login').post(passport.authenticate('local', {failureRedirect: '/'}), (req, res)=>{
    res.redirect('/profile')
    req.user = user
  })

  app.route('/logout').get((req, res) => {
    req.logout();
    res.redirect('/')
  })

  // missing page(404)
  app.use((req, res, next) => {
    res.status(404)
    .type('text')
    .send('Not Found')
  })

  // Be sure to add this...
}).catch(e => {
  app.route('/').get((req, res) => {
    res.render('pug', { title: e, message: 'Unable to login' });
  });
});
// app.listen out here...
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});

// middleware
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()) return next()
  res.redirect('/')
}




//app.route('/').get((req, res) => {
 //res.render('pug/index', {
 //   title: 'Hello',
  //  message: 'Please login'
  //})
//});
