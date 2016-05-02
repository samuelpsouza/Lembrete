//modules

var express = require('express');
var app = express(); 						// create our app w/ express				// mongoose for mongodb			// load the database config
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var Sequelize = require('sequelize');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

//db

var sequelize = new Sequelize('lembrete', 'admin', 'sam123', {
	  host: "localhost",
      dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
      port:    5432, // or 5432 (for postgres)
    });

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });

//

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
app.use(flash());
app.use(cookieParser());
app.use(session({secret: "mysecret"}));
app.use(passport.initialize());
app.use(passport.session());

//
require('./config/passport')(passport);

//route

var router = express.Router();
require('./app/routes.js')(router, passport);
app.use('/api/', router);

// listen (start app with node server.js) ======================================

app.listen(3000);
console.log("App listening on port 3000");