const express = require('express'),
  router = express.Router(),
  mainController = require('./controllers/main.controller'),
  listingsController = require('./controllers/listings.controller');

  //export router
module.exports = router;

//define routes
router.get('/', mainController.showHome);
router.get('/listings', listingsController.showListings);
router.get('/listings/seed', listingsController.seedListings);

// create new listings
router.get('/listings/create',  listingsController.showCreate);
router.post('/listings/create', listingsController.processCreate);

// edit listings
router.get('/listings/:slug/edit', listingsController.showEdit);
router.post('/listings/:slug',     listingsController.processEdit);

// delete listings
router.get('/listings/:slug/delete', listingsController.deleteEvent);

// show a single listing
router.get('/listings/:slug', listingsController.showSingle);