var express = require('express');
var router = express.Router();
var models = require('../models');

module.exports = router;

router.get('/', function (req, res, next) {
  res.render('index');
})

router.get('/wiki/:path', function (req, res, next) {
  //do db query for row of table Pages WHERE urlTitle = req.params.path;
})



