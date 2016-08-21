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
  var redTop    = new Campsite(
                    { title: 'Redtop',
                      state: 'GA',
                      petsAllowed: 'Y',
                      waterfront: 'Y'
                    });
  var deepHole  = new Campsite(
                    {
                      title: 'Deep Hole',
                      state: 'GA',
                      petsAllowed: 'Y',
                      waterfront: 'Y'
                    });
  var baldRidge = new Campsite(
                    {
                      title: 'Bald Ridge Creek',
                      state: 'GA',
                      latitude: '34.2038889',
                      longitude: '-84.0861111',
                      petsAllowed: 'Y',
                      waterfront: 'Y'
                    });
  var clarkCreek = new Campsite (
                    {
                      title: 'Clark Creek North',
                      state: 'GA',
                      latitude: '34.0972222',
                      longitude: '-84.6805556',
                      petsAllowed: 'Y',
                      waterfront: 'Y'
                    });
  var mckaskey = new Campsite (
                    {
                      title: 'McKaskey Creek CG',
                      state: 'GA',
                      latitude: '34.19',
                      longitude: '-84.7180556',
                      petsAllowed: 'Y',
                      waterfront: 'Y'
                    });
  var mckinney = new Campsite (
                    {
                      title: 'McKinney Campground',
                      state: 'GA',
                      latitude: '34.1069444',
                      longitude: '-84.6955556',
                      petsAllowed: 'Y',
                      waterfront: 'Y'
                    });
  var morganton = new Campsite (
                    {
                      title: 'Morganton Point',
                      state: 'GA',
                      latitude: '34.875',
                      longitude: '-84.25',
                      petsAllowed: 'Y',
                      waterfront: 'Y'
                    });
  return Campsite.create([
                         redTop,
                         deepHole,
                         baldRidge,
                         clarkCreek,
                         mckaskey,
                         mckinney,
                         morganton
                         ]);
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
