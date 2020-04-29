const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const gardens = require('./gardens')

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

app.configure(function () {  
  app.use(allowCrossDomain);
});

app.get('/gardens', (req, res) => res.send(gardens))

app.get('/gardens/:id', (req, res) => {
  const garden = gardens.find(garden => garden.id.toString() === req.params.id)
  if (garden) {res.send(garden)}
  else {
    res.status(404).send("Sorry can't find that garden!")
  }
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
