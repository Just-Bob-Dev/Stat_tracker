const express = require('express');
const router = express.Router();
const Activity = require('../models/activities');
const mustacheExpress = require('mustache-express');

router.get('/activities', function(req, res){
  Activity.getActivity(function(err, activity){
    if(err){
      console.log(err);
    }
    res.json(activity);
  })
})

router.post('/activities', function(req, res){
  var activity = req.body;
  Activity.createActivity(activity, function(err, activity){
    if(err){
      console.log(err);
    }
    res.json(activity);
  })
})

router.get('/activities/:activityId', function(req, res){
  let actId = req.params.activityId;
  Activity.findOne({_id: actId}).then(function(activity){
    console.log(activity);
    res.send(activity);
  })
})

router.put('/activities/:activityId', function(req, res){
  let actId = req.params.activityId;
  let activity = req.body;
  Activity.updateActivity(actId, activity, {}, function(err, activity){
    if(err){
      console.log("This is a PUT error:  " + err);
    }
    res.json(activity);
  })
})

router.delete('/activities/:activityId', function(req, res){
  let actId = req.params.activityId;
  Activity.deleteActivity(actId, function(err){
    if(err){
      console.log("Deletion error: " + err);
    }
    res.send("you successfully deleted this activity.")
  })
})

router.post('/activities/:activityId/stats', function(req, res){
  let actId = req.params.activityId;
  let stat = req.body;
  Activity.getActivityById(actId, function(err, activity){
    if(err){
      console.log(err);
    }
    let newStat = {
      description: stat.description,
      quantity: stat.quantity
    }
    activity.stats.push(newStat);
    activity.save();
    res.json(activity);
  })
})

router.delete('/stats/:statsId', function(req, res){
  let actId = req.params.activityId;
  let statId = req.params.statsId;
  Activity.update( 

  })
})







module.exports = router;
