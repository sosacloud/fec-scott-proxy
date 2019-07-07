const express = require('express');
const app = express();
const port = 2800;


app.use(express.static('/client/dist'));