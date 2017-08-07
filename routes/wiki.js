var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get('/', function (req, res) {
  res.redirect('/');
});

router.post('/', function (req, res, next) {
  User.findOrCreate({ where: { name: req.body.name, email: req.body.email } })
  .then(function(user) {
    return Page.create({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
      authorId: user[0].id
    });
  })
  .then(function (page) {
    res.redirect(page.route);
  })
  .catch(next);
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
