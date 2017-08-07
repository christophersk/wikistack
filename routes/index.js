var express = require('express');
var router = express.Router();
var models = require('../models');
var wikiRouter = require('./wiki');
var userRouter = require('./user');

module.exports = router;

router.use('/wiki/', wikiRouter);

router.get('/', function (req, res, next) {
  res.render('index');
});


