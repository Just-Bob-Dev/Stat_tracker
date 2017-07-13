const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const Activity = require('./models/activities');
const mustacheExpress = require('mustache-express');
const app = express();

mongoose.connect('mongodb://localhost:27017/stat_tracker');
var db = mongoose.connection;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

// Activity.create({
//   statTrack: "Workout",
//   stats:
//     {
//       quantity: 8,
//       description: "leg Day"
//     }
// });


app.use('/api', apiRouter);

app.get('/', function(req, res){
  res.send('Please use route /api/activities to acsess api');
})

app.listen(3000, function(req, res){
  console.log("Looks like you are listening on localhost 3000.");
})
