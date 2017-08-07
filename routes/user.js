var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
  User.findAll().then(users => res.render('users', { users }));
})

router.get('/:id', function(req, res, next) {
  var user = User.findOne({ where: { id: req.params.id }});
  var pages = Page.findAll({ where: { authorId: req.params.id }});

  Promise.all([user, pages])
  .then((userPagesArr) => res.render('user', { user: userPagesArr[0], pages: userPagesArr[1] }))
  .catch(next);
})

module.exports = router;
