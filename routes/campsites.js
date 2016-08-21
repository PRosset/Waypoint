var express = require('express');
var router = express.Router();

var Todo = require('../models/todo');
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
    title: '',
    address: '',
    state: '',
    petsAllowed: false,
    waterfront: false
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
    title: req.body.title,
    address: req.body.address,
    state: req.body.state,
    petsAllowed: req.body.petsAllowed,
    waterfront: req.body.waterfront,
    creator: currentUser.id
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
    campsite.title = req.body.title,
    campsite.address = req.body.address,
    campsite.state = req.body.state,
    campsite.petsAllowed = req.body.petsAllowed,
    campsite.waterfront = req.body.waterfront
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
    if (!campsite) {
      // TODO: return 404
    }
    else if (campsite.creator !== currentUser.id) {
      console.log("You don't own this")
      // TODO: return an error back to browser
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

// // TOGGLE completed
router.get('/:id/toggle', authenticate, function(req, res, next) {

  // var todo = currentUser.todos.id(req.params.id);
  // if (!todo) return next(makeError(res, 'Document not found', 404));
  // todo.completed = !todo.completed;
  // currentUser.save()
  // .then(function(saved) {
  //   res.redirect('/todos');
  // }, function(err) {
  //   return next(err);
  // });
});

module.exports = router;
