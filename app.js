var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var routes = require('./routes');
var nunjucks = require('nunjucks');
var models = require('./models');
var PORT = 3000;


app.engine('html', nunjucks.render);
app.set('view engine', 'html');
var env = nunjucks.configure('views', { noCache: true });
var AutoEscapeExtension = require("nunjucks-autoescape")(nunjucks);
env.addExtension('AutoEscapeExtension', new AutoEscapeExtension(env));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('./public'));
app.use('/', routes);


models.db.sync({ force: false })
.then(function () {
  app.listen(3000, function () {
    console.log('App listening at http://localhost:3000/');
  });
})
.catch(console.error);

