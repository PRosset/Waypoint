var mongoose = require('mongoose');

// var Comment = require('./comment');

var CampsiteSchema = new mongoose.Schema({
  title: { type: String,  required: true },
  address:       String,
  state:         String,
  latitude:      String,
  longitude:     String,
  petsAllowed:   String,
  waterfront:    String,
  image:         String,
  creator:       String
  // comments: [ Comment.schema ] //add time stamp here dummy
});

// CampsiteSchema.methods.createNewCampsiteFromXML = function(xml) {
//   return new Campsite(
//                       {
//                         title = xml.getElementById('facilityName').innerHTML,
//                         state = xml.getElementById('facilityName').innerHTML,

//                       });
// };

module.exports = mongoose.model('Campsite', CampsiteSchema);


// func createNewCampsiteFromXML(xml)
// {
//   var redTop    = new Campsite(
//                     { title: xml.getElementById("facilityName").innerHTML,
//                       state: 'GA',
//                       petsAllowed: 'Y',
//                       waterfront: 'Y'
//                     });
// }

// {
//   "type": "Feature",
//   "geometry": {
//     "type": "Point",
//     "coordinates": [125.6, 10.1]
//   },
//   "properties": {
//     "name": "Dinagat Islands"
//   }
// }
