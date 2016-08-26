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
    contractType: String,
    facilityID: String,
    title: String,
    url: String,
    description: String,
    petsAllowed: String,
    waterFront: String,
    sitesWithAmps: String,
    sitesWithSewerHookup: String,
    sitesWithWaterHookup: String,
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
    comments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' } ] //add time stamp here dummy
  }
});

module.exports = mongoose.model('Campsite', CampsiteSchema);
