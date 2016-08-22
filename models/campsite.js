var mongoose = require('mongoose');

var Comment = require('./comment');

var CampsiteSchema = new mongoose.Schema({
  type: String,
  geometry: {
    type: { type: String },
    coordinates: [ Number ]
  },
  properties: {
    creator: String,
    contractID: String,
    facilityID: String,
    title: String,
    // state: String,
    url: String,
    description: String,
    petsAllowed: String,
    waterFront: String,
    driveway: String,
    address: {
      city: String,
      country: String,
      state: String,
      streetAddress: String,
      zip: String,
    },
    contact: [
    {
      name: String,
      number: String
    }
    ],
    // comments : [Comment.schema] //add time stamp here dummy
  },
});

module.exports = mongoose.model('Campsite', CampsiteSchema);
