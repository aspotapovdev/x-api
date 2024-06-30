require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
require('./config/db');
const { errorHandler } = require('./middlewares/errorHandler');

app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.static('assets'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', require('./routes/authRoutes'));

app.use(errorHandler);

module.exports = app;
