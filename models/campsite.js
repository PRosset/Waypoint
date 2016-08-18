var mongoose = require('mongoose');

// var Comment = require('./comment');

var CampsiteSchema = new mongoose.Schema({
  title: { type: String,  required: true },
  address:       String,
  state:         String,
  latitude:      Number,
  longitude:     Number,
  petsAllowed:   String,
  waterfront:    String,
  image:         String,
  // comments: [ Comment.schema ] //add time stamp here dummy
});

module.exports = mongoose.model('Campsite', CampsiteSchema);
