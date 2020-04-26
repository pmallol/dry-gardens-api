const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const gardens = require('./gardens')

app.get('/gardens', (req, res) => res.send(gardens))

app.get('/gardens/:id', (req, res) => {
  const garden = gardens.find(garden => garden.id.toString() === req.params.id)
  if (garden) {res.send(garden)}
  else {
    res.status(404).send("Sorry can't find that garden!")
  }
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
