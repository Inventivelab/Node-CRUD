const express = require('express'),
  router = express.Router(),
  mainController = require('./controllers/main.controller');
  listingsController = require('./controllers/listings.controller');

  //export router
module.exports = router;

//define routes
router.get('/', mainController.showHome);
router.get('/listings', listingsController.showListings);