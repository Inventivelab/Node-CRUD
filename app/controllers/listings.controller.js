const Listing = require('../models/listing');

module.exports = {
  showListings: showListings,
  showSingleListing: showSingleListing,
  seedListings: seedListings
  showCreate: showCreate,
  processCreate: processCreate,
  showEdit: showEdit,
  processEdit: processEdit,
  deleteListing: deleteListing
}

// show all listings
function showListings(req, res) {
  // get all listings   
  Listing.find({}, (err, listings) => {
    if (err) {
      res.status(404);
      res.send('Listings not found!');
    }

    // return a view with data
    res.render('pages/listings', { 
      listings: listings,
      success: req.flash('success')
    });
  });
}

/**
 * Show a single listing page
 */
function showSingleListing(req, res) {
  // get a single listing
  Listing.findOne({ slug: req.params.slug }, (err, listing) => {
    if (err) {
      res.status(404);
      res.send('Listing not found!');
    }

    res.render('pages/single-listing', { 
      listing: listing,
      success: req.flash('success')
    });
  });
}

// seed the database

function seedListings(req, res){
  // create listings
  const listings = [
    {name: 'Ruby on Rails', slug: 'ruby', description: 'Ruby on Rails tech listing in Austin'},
    {name: 'Angular Js', slug: 'angularjs', description: 'Angular tech listing in Austin'},
    {name: 'React', slug: 'react', description: 'React tech listing in Austin'},
    {name: 'Backbone', slug: 'backbone', description: 'Backbone tech listing in Austin'}
  ];

  // use the Listing model to insert/save
  Listing.remove({}, () => {
    for (listing of listings) {
      var newListing = new Listing(listing);
      newListing.save();
    }
  });

  // seeded!
  res.send('Database seeded!');
}

/**
 * Show the create form
 */
function showCreate(req, res) {
  res.render('pages/create', {
    errors: req.flash('errors')
  });
}

/**
 * Process the creation form
 */
function processCreate(req, res) {
  // validate information
  req.checkBody('name', 'Name is required.').notEmpty();
  req.checkBody('description', 'Description is required.').notEmpty();

  // if there are errors, redirect and save errors to flash
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect('/listings/create');
  }

  // create a new listing
  const listing = new Listing({
    name: req.body.name,
    description: req.body.description
  });

  // save listing
  listing.save((err) => {
    if (err)
      throw err;

    // set a successful flash message
    req.flash('success', 'Successfuly created listing!');

    // redirect to the newly created listing
    res.redirect(`/listings/${listing.slug}`);
  });
}

/**
 * Show the edit form
 */
function showEdit(req, res) {
  Listing.findOne({ slug: req.params.slug }, (err, listing) => {
    res.render('pages/edit', {
      listing: listing,
      errors: req.flash('errors')
    });
  });
}

/**
 * Process the edit form
 */
function processEdit(req, res) {
  // validate information
  req.checkBody('name', 'Name is required.').notEmpty();
  req.checkBody('description', 'Description is required.').notEmpty();

  // if there are errors, redirect and save errors to flash
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect(`/listings/${req.params.slug}/edit`);
  }

  // finding a current listing
  Listing.findOne({ slug: req.params.slug }, (err, listing) => {
    // updating that listing
    listing.name        = req.body.name;
    listing.description = req.body.description;

    listing.save((err) => {
      if (err)
        throw err;

      // success flash message
      // redirect back to the /listings
      req.flash('success', 'Successfully updated listing.');
      res.redirect('/listings');
    });
  });

}

/**
 * Delete an listing
 */
function deleteListing(req, res) {
  Listing.remove({ slug: req.params.slug }, (err) => {
    // set flash data
    // redirect back to the listings page
    req.flash('success', 'Listing deleted!');
    res.redirect('/listings');
  });
}