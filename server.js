const express = require('express'),
  app = express(),
  port = process.env.PORT || 8080;

  // Configure our application

  // set the routes
  app.get('/', (req, res) =>{
    res.send('First Website built with MEAN')
  });

  //start server
  app.listen(port, () => {
    console.log('App listening on http://localhost:${port}');
  });