const express = require('express');
const app = express();
const router = express.Router();

const indexController = require('../controllers/indexController');

app.get('/', indexController.getIndex);

module.exports = app;