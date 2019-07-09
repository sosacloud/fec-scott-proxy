const express = require('express');
const fetch = require('node-fetch');
const app = express();
const sidebarPort = 3002;
const localUrl = 'http://localhost';
const port = 2800;
var trackId = -1;


app.use(express.static(__dirname + '/../client/dist'));


app.get('/:id', (req, res) => {
  if (req.params.id !== undefined) trackId = req.params.id;
  res.redirect('/');
});


// RelatedTracks
app.get('*', (req, res) => {
  let serviceUrl = `${localUrl}:${sidebarPort}${req.originalUrl}`;
  if (req.originalUrl !== '/') {
    trackId = -1;
  }
  if (req.originalUrl === '/api/track') {
    serviceUrl = serviceUrl + '/' + trackId;
  }

  fetch(serviceUrl, {
      method: 'GET'
    })
    .then((data) => {
      return data.json();
    })
    .then((jsonData) => {
      res.status(200).json(jsonData)
    })
    .catch((err) => {
      res.status(404).json(err);
    })

})


app.listen(port, () => {
  console.log(`Now listening on ${port}. Visit http://localhost:2800/`)
});