var express = require('express');
var router = express.Router();

var Campsite = require('../models/campsite');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

function authenticate(req, res, next) {
  if(!req.isAuthenticated()) {
    req.flash('error', 'Please signup or login.');
    res.redirect('/');
  }
  else {
    next();
  }
}

function getSearchOptions(req) {
  var searchOptions = {};
  if (req.query.title) {
    searchOptions['properties.title'] = { '$regex' : req.query.title, '$options' : 'i' };
  }
  console.log(searchOptions);
  return searchOptions;
}

// INDEX
router.get('/', authenticate, function(req, res, next) {
  // get all the todos and render the index view
  console.log('req.query:' , req.query);
  var searchOptions = getSearchOptions(req);
  Campsite.find(searchOptions).sort('-createdAt')
  .then(function(campsites) {
    res.render('campsites/index', { campsites: campsites,
                                    title: req.query.title
                                  });
  }, function(err) {
    return next(err);
  });
});

router.get('/data', function(req, res, next) {
  var geoJson = {
    "type": "FeatureCollection",
    "features": []
  };

  var searchOptions = getSearchOptions(req);
  console.log('searchOptions:', searchOptions);
  Campsite.find(searchOptions, function(err, data) {
    data.forEach(function(campsite) {
      geoJson.features.push(campsite);
    });

    res.json(geoJson);
  });
});

// // NEW
router.get('/new', authenticate, function(req, res, next) {

  var campsite = {
    geometry: {
      type: "Point",
      coordinates: []
    },
    properties: {
      title: '',
      description: '',
      address: {
        state: '',
        streetAddress: '',
      },
      petsAllowed: '',
      waterFront: '',
      driveway: ''
    }
  };
  res.render('campsites/new', { campsite: campsite, message: req.flash() });
});

// // SHOW
router.get('/:id', authenticate, function(req, res, next) {
    Campsite.findById(req.params.id)
  .then(function(campsite) {
    if (!campsite) return next(makeError(res, 'Document not found', 404));
    res.render('campsites/show', { campsite: campsite });
  }, function(err) {
    return next(err);
  });
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
  var campsite = new Campsite({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [ req.body.lng, req.body.lat ]
    },
    properties: {
      contractID: "USER",
      facilityID: 1,
      title: req.body.campTitle,
      description: req.body.description,
      address: {
        state: req.body.state,
        streetAddress: req.body.streetAddress,
      },
      petsAllowed: req.body.petsAllowed,
      waterFront: req.body.waterFront,
      driveway: req.body.driveway,
      creator: currentUser.id
    }
  });
  campsite.save()
  .then(function(saved) {
    res.redirect('/campsites');
  }, function(err) {
  return next(err);
  })
});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
  Campsite.findById(req.params.id)
  .then(function(campsite) {
    if (!campsite) return next(makeError(res, 'Document not found', 404));
    res.render('campsites/edit', { campsite: campsite, message: req.flash() });
  }, function(err) {
    return next(err);
  });
});

// // UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  console.log("lng: ",req.body.lng);
  console.log("lat: ",req.body.lat);
  Campsite.findById(req.params.id)
  .then(function(campsite) {
    if (!campsite) return next(makeError(res, 'Document not found', 404));
    campsite.properties.title = req.body.campTitle,
    campsite.properties.description = req.body.description;
    campsite.properties.address.state = req.body.state;
    campsite.properties.address.streetAddress = req.body.streetAddress;
    campsite.geometry.coordinates[0] = req.body.lng;
    campsite.geometry.coordinates[1] = req.body.lat;
    console.log("lng: ",req.body.lng);
    console.log("lat: ",req.body.lat);
    campsite.properties.petsAllowed = req.body.petsAllowed;
    campsite.properties.waterfront = req.body.waterfront;
    campsite.properties.driveway = req.body.driveway;
    campsite.save();
  })
  .then(function(saved) {
    res.redirect('/campsites');
  }, function(err) {
    return next(err);
  });
});

// // DESTROY
router.delete('/:id', function(req, res, next) {
  Campsite.findById(req.params.id)
  .then(function(campsite) {
    if (!campsite) return next(makeError(res, 'Document not found', 404));
    else if (campsite.properties.creator !== currentUser.id) {
      console.log("You don't own this")
      return next(makeError(res, 'Document not found', 404));
    }
    else {
      campsite.remove()
      .then(function(product) {
        res.redirect('/campsites');
      });
    }
  }, function(err) {
    return next(err);
  });
});

router.get('/:id/toggle', authenticate, function(req, res, next) {
  Campsite.findById(req.params.id)
  .then(function(campsite) {
    console.log('campsite:', campsite);
    if (!campsite) return next(makeError(res, 'Document not found', 404));

    console.log('checking %s for include of %s', currentUser.visited, campsite._id);

    var index = currentUser.visited.indexOf(campsite._id);
    console.log('index:', index);

    // if (currentUser.visited.includes(campsite._id)) {
    if (index >= 0) {
      console.log("removed site from visited");
      currentUser.visited.pull(campsite._id);
    } else {
      console.log("added site %s to visited", campsite);
      currentUser.visited.push(campsite._id);
    }
    console.log('visited:', currentUser.visited);
    return currentUser.save();
  })
  .then(function(saved) {
    res.redirect('/campsites');
  }, function(err) {
    return next(err);
  });
});

module.exports = router;
