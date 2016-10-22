const express     = require('express'),
  app             = express(),
  port            = process.env.PORT || 8080,
  expressLayouts  = require('express-ejs-layouts');

  // Configure our application

  // static assets
  app.use(express.static(__dirname + '/public'));

  //set up templating engine with ejs
  app.set('view engine', 'ejs');
  app.use(expressLayouts);
  // set the routes
  app.use(require('./app/routes'));

  //start server
  app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
  });