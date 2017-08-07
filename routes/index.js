var express = require('express');
var router = express.Router();
var models = require('../models');
var wikiRouter = require('./wiki');
var userRouter = require('./user');

module.exports = router;

router.use('/wiki/', wikiRouter);

router.use('/users/', userRouter)

router.get('/', function (req, res, next) {
  models.Page.findAll().then(function (pages) {
    res.render('index', { pages });
  }).catch(next);
});

router.get('/search/', function (req, res, next) {
  res.render('search');
});
