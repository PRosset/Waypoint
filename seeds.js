var mongoose = require('mongoose');
var Todo = require('./models/campsite');
var Campsite = require('./models/campsite')

mongoose.connect('mongodb://localhost/waypoint');

// our script will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}

console.log('removing old campsites...');
Campsite.remove({})
.then(function() {
  console.log('old campsites removed');
  console.log('creating some new campsites...');
  var redTop    = new Campsite({ title: 'Redtop', state: 'GA', petsAllowed: 'Y', waterfront: 'Y' });
  var deepHole  = new Campsite({ title: 'Deep Hole', state: 'GA', petsAllowed: 'Y', waterfront: 'Y' });
  return Campsite.create([redTop, deepHole]);
})
.then(function(savedCampsites) {
  console.log('Just saved', savedCampsites.length, 'campsites.');
  return Campsite.find({});
})
.then(function(allCampsites) {
  console.log('Printing all campsites:');
  allCampsites.forEach(function(campsite) {
    console.log(campsite);
  });
  quit();
});
