const express = require('express');
const fetch = require('node-fetch');
const app = express();
const commentsPort = 3001;
const sidebarPort = 3002;
const musicPlayerPort = 3003;
const musicPlayerEndpoint = '/api/songs';
const sidebarEndpoints = ['/api/track', '/api/user', '/api/track/likes'];
<<<<<<< HEAD
const localUrl = 'http://localhost';
const port = 2800;
=======
const commentsEndpoints = ['/comments/init', '/comments/load', '/comments/new'];
const localUrl = 'http://localhost';
const port = 2801;
>>>>>>> local-proxy
var servicePort;
var trackId = -1;


app.use(express.static(__dirname + '/../client/dist'));


app.get('/:id', (req, res) => {
  if (req.params.id !== undefined) trackId = req.params.id;
  res.redirect('/');
});


// RelatedTracks
app.get('*', (req, res) => {
  let serviceUrl;
  if (req.originalUrl !== '/') {
    trackId = -1;
  }
<<<<<<< HEAD

  if (sidebarEndpoints.some(path => req.originalUrl.includes(path))) {
    servicePort = sidebarPort;
    serviceUrl = `${localUrl}:${sidebarPort}${req.originalUrl}`
    if (req.originalUrl === '/api/track') {
      serviceUrl = serviceUrl + '/' + trackId;
    }
  } else if (req.originalUrl.includes(musicPlayerEndpoint)) {
    servicePort = musicPlayerPort;
    serviceUrl = `${localUrl}:${servicePort}${req.originalUrl}`
  }
=======
>>>>>>> local-proxy

  if (sidebarEndpoints.some(path => req.originalUrl.includes(path))) {
    servicePort = sidebarPort;
    serviceUrl = `${localUrl}:${sidebarPort}${req.originalUrl}`
    if (req.originalUrl === '/api/track') {
      serviceUrl = serviceUrl + '/' + trackId;
    }
  } else if (req.originalUrl.includes(musicPlayerEndpoint)) {
    servicePort = musicPlayerPort;
    serviceUrl = `${localUrl}:${servicePort}${req.originalUrl}`

  } else if (commentsEndpoints.some(path => req.originalUrl.includes(path))) {
    servicePort = commentsPort;
    serviceUrl = `${localUrl}:${servicePort}${req.originalUrl}`

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
  console.log(`Now listening on ${port}. Visit http://localhost:2801/`)
});