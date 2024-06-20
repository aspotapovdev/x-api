require('dotenv').config();
const express = require('express');
const app = express();
require('./config/db');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
