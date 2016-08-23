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

// INDEX
router.get('/', authenticate, function(req, res, next) {
  // get all the todos and render the index view
    Campsite.find({}).sort('-createdAt')
  .then(function(campsites) {
    res.render('campsites/index', { campsites: campsites, message: req.flash() } );
  }, function(err) {
    return next(err);
  });
});

// // NEW
router.get('/new', authenticate, function(req, res, next) {

  var campsite = {
    properties: {
      title: '',
      url: '',
      description: '',
      address: {
        city: '',
        state: '',
        streetAddress: '',
        zip: '',
      },
      petsAllowed: false,
      waterFront: false,
      driveway: false
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
      coordinates: [ -84.3872202, 33.7788718 ]
    },
    properties: {
      contractID: "USER",
      facilityID: 1,
      title: req.body.campTitle,
      url: req.body.url,
      description: req.body.description,
      address: {
        city: req.body.city,
        state: req.body.state,
        streetAddress: req.body.streetAddress,
        zip: req.body.zip,
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
  Campsite.findById(req.params.id)
  .then(function(campsite) {
    if (!campsite) return next(makeError(res, 'Document not found', 404));
    campsite.properties.title = req.body.campTitle,
    campsite.properties.url = req.body.url,
    campsite.properties.description = req.body.description,
    campsite.properties.address.city = req.body.city,
    campsite.properties.address.state = req.body.state,
    campsite.properties.address.streetAddress = req.body.streetAddress,
    campsite.properties.address.zip = req.body.zip
    campsite.properties.petsAllowed = req.body.petsAllowed,
    campsite.properties.waterfront = req.body.waterfront,
    campsite.properties.driveway = req.body.driveway
    return campsite.save();
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

//Search
// router.post('/search', function(req, res, next) {
//   var search = req.body.title;
//   Campsite.find({ title: 'value'}, function(err, data) {
//       if(err) {
//          res.send(err.message);
//       }
//       else{
//         res.redirect('/campsties/?title='+data);
//       }
//     });
// });

// // TOGGLE visited
// function siteVisited(campsiteId) {
//   console.log("i fired");
//   if (currentUser.visited.includes(campsiteId)) {
//     currentUser.visited.splice(campsiteId, 1);
//   } else {
//     currentUser.visited.push(campsiteId);
//   }
//   currentUser.save()
//   .then(function(saved) {
//     res.redirect('/campsites');
//   }, function(err) {
//     return next(err);
//   });
// }

router.get('/:id/toggle', authenticate, function(req, res, next) {
  Campsite.findById(req.params.id)
  .then(function(campsite) {
    console.log('campsite:', campsite);
    if (!campsite) return next(makeError(res, 'Document not found', 404));

    console.log('checking %s for include of %s', currentUser.visited, campsite._id);

    let index = currentUser.visited.indexOf(campsite._id);
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
