const express = require('express');
const app = express();
const fetch = require('node-fetch');
const sidebarPort = 3002;
const localUrl = 'http://localhost';
const port = 2800;


app.use(express.static(__dirname + '/../client/dist'));

// RelatedTracks
app.get('*', (req, res) => {
  let serviceUrl = `${localUrl}:${sidebarPort}${req.originalUrl}`;

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