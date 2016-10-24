const Listing = require('../models/listing');

module.exports = {
  showListings: showListings,
  showSingleListing: showSingleListing
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