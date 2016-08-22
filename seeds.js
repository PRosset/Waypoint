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

  // var campsites = [new Campsite({}), new Campsite({})]
  var redTop    = new Campsite(
                  {
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: [ -84.7064433, 34.1478699 ]
                    },
                    properties: {
                      contractID: "GA",
                      facilityID: "530364",
                      title: 'Red Top Mountain State Park',
                      url: "http://www.reserveamerica.com/campsiteSearch.do?contractCode=GA&parkId=530364&cmp=39-32--prossetti",
                      description: 'This popular park on Lake Allatoona is ideal for swimming, water skiing and fishing. Visitors can bring their own boats or rent from nearby marinas. A sand swimming beach is nestled in a cove and surrounded by trees, providing a great place to cool off during summer. Picnic shelters and group shelters may be rented for meetings, parties, reunions and other celebrations. Guests often stay overnight in rental cottages, a spacious campground, or the park&amp;#39;s lakeside yurt.    While best known for the 12,000-acre lake, Red Top Mountain is also a hiker&amp;#39;s haven. More than 15 miles of trails wind through the forested park, providing opportunities for exercise and nature photography. A short, paved trail behind the park office is suitable for wheelchairs and strollers, welcoming guests to explore a reconstructed 1860s homestead. The gravel-topped 4-mile Iron Hill Trail is open to both hikers and bikers, offering pretty views of the lake&amp;#39;s shoreline.    Named for the soil&amp;#39;s rich red color caused by high iron-ore content, Red Top Mountain was once an important mining area. Iron pour programs are occasionally held near the Vaughan Cabin behind the park office.',
                      petsAllowed: 'Y',
                      waterFront: 'Y',
                      driveway: 'Y',
                      address: {
                        city: "Acworth",
                        country: "United States",
                        state: "Georgia",
                        streetAddress: "50 Lodge Road, SE",
                        zip: "30102"
                      }
                    }
                  });
  var cottonHill  = new Campsite(
                  {
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: [ -81.55, 30.8413889 ]
                    },
                    properties: {
                      contractID: "GA",
                      facilityID: "530149",
                      title: 'CROOKED RIVER STATE PARK',
                      url: 'http://www.reserveamerica.com/campsiteSearch.do?contractCode=GA&parkId=530149&cmp=39-32--prossetti',
                      description: '',
                      petsAllowed: 'Y',
                      waterFront: '',
                      driveway: '',
                      address: {
                        city: "ST. MARYS",
                        country: "United States",
                        state: "Georgia",
                        streetAddress: "6222 CHARLIE SMITH, SR HIGHWAY",
                        zip: "31558"
                      }
                    }
                  });
  var stephensPark = new Campsite(
                   {
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: [ -82.8966667, 33.5633333 ]
                    },
                    properties: {
                      contractID: "GA",
                      facilityID: "530145",
                      title: 'A. H. STEPHENS STATE HISTORIC PARK',
                      url: 'http://www.reserveamerica.com/campsiteSearch.do?contractCode=GA&parkId=530145&cmp=39-32--prossetti',
                      description: "This park east of Atlanta is best known for its beautiful campground, cottages, lakeside group camp and Confederate museum.  Visitors flock to A. H. Stephens for its fishing, geocaching, camping, trail and educational opportunities.",
                      petsAllowed: 'Y',
                      waterFront: '',
                      driveway: '',
                      address: {
                        city: "CRAWFORDVILLE",
                        country: "United States",
                        state: "Georgia",
                        streetAddress: "456 ALEXANDER ST NW",
                        zip: "30631"
                      }
                    }});
  return Campsite.create([ redTop, cottonHill, stephensPark ]);
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
