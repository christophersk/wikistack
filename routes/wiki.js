var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;

router.get('/', function (req, res) {
  res.redirect('/');
});

router.post('/', function (req, res) {
  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  });
  page.save().then(function (page) {
    res.json(page);
    // res.redirect('/');
  }).catch(function (err) {
    console.log(err);
    res.sendStatus(500);
  });
});

router.get('/add', function (req, res) {
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res) {
  res.send(req.params.urlTitle);
});

module.exports = router;
