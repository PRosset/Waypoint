var mongoose = require('mongoose');

var CampsiteSchema = new mongoose.Schema({
  title:         { type: String,  required: true },
  address: String,
  state: String,
  latitude: Number,
  longitude: Number,
  petsAllowed: String,
  waterfront: String,
  image: String,
  // comments: [ Comment.Schema ] //add time stamp here dummy.
);

module.exports = mongoose.model('Campsite', CampsiteSchema);
