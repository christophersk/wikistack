var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;

router.get('/', function (req, res) {
  res.redirect('/');
});

router.post('/', function (req, res, next) {
  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  });
  page.save().then(function (page) {
    res.redirect(page.route);
  }).catch(next);
});

router.get('/add', function (req, res) {
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({ where: { urlTitle: req.params.urlTitle }}).then(function (page) {
    res.render('wikipage', { page });
  }).catch(next);
});

module.exports = router;
