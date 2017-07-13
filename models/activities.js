const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  statTrack: { type:String, required:true},
  stats: [
    {
      time: {type: Date, default: Date.now},
      quantity: {type: Number},
      description: {type: String}
    }
  ]
})

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;

//Finds all activities
module.exports.getActivity = function(callback, limit){
  Activity.find(callback).limit(limit);
}

//finds Activity by the Id
module.exports.getActivityById = function(id, callback){
  Activity.findById(id, callback);
}

//Creates a new activity
module.exports.createActivity = function(activity, callback){
  Activity.create(activity, callback);
}

//updates activity.
module.exports.updateActivity = function(id, activity, options, callback){
  var query = {_id: id};
  var update = {
    statTrack: activity.statTrack
  }
  Activity.findOneAndUpdate(query, update, options, callback);
}

module.exports.deleteActivity = function(id, callback){
  var query = {_id: id}
  Activity.remove(query, callback);
}
