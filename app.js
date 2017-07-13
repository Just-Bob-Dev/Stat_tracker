const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcrypt');
const Activity = require('./models/activities');
const User = require('./models/user');
const mustacheExpress = require('mustache-express');
const app = express();


mongoose.connect('mongodb://localhost:27017/stat_tracker');
var db = mongoose.connection;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

// User.create({
//   name: "name",
//   password: 'password'
// });


passport.use(new BasicStrategy( function(username, password, done){
  User.findOne({name: username}, function(err, user){
    if(user && bcrypt.compareSync(password, user.password)){
      return done(null, user);
    }
    return done(null, false);
  })
 }
));

app.use('/api', apiRouter);

app.get('/', passport.authenticate('basic', {session: false}) , function(req, res){
  res.redirect('/api/activities');
});

app.listen(3000, function(req, res){
  console.log("Looks like you are listening on localhost 3000.");
})
