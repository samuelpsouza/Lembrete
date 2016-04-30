//modules

var express = require('express');
var app = express(); 						// create our app w/ express				// mongoose for mongodb			// load the database config
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var Sequelize = require('sequelize');
var restful = require('sequelize-restful');
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

//

var Lembrete = sequelize.define('Lembrete', {
	msg: Sequelize.TEXT
});

var User = sequelize.define('User', {
	name: Sequelize.STRING,
	passwd: Sequelize.STRING
});

sequelize.sync({force: true})

//User.hasMany(Lembrete, {foreignKey: 'user_id'})

//app.use(restful(sequelize));

var router = express.Router();

router.use(function(req, res, next){
	console.log("A request is here.");
	next();
});

router.get('/', function(req, res){
	res.json({ message: 'Everything is working' });
});

router.post('/createLembrete', function(req, res, next){
	console.log(req.body);
	if(req.body != ""){
		var msg = {msg: req.body.msg};
		Lembrete.create(msg).then(function(){
			console.log("Created");
		});
	}
	next();
});
router.get('/getLembretes', function(req, res){
	Lembrete.findAll().then(function(lembretes){
		res.send(lembretes);
	});
});

router.put('/editLembrete/:lembrete_id', function(req, res){
	Lembrete.findById(req.params.id, function(err, lembrete){
		if(err)
			res.send(err);
		lembrete.msg = req.body.msg;
		lembrete.save(function(err){
			if(err)
				res.send(err);
			res.redirect('/getLembretes');
		});
	});
});

router.delete('/deleteLembrete/:lembrete_id', function(req, res){
	Lembrete.destroy({where : {id: req.params.id}}).then(function(){
		Lembrete.findAll().then(function(lembretes){
			res.send(lembretes);
		});
	});
});


app.use('/api', router);

// listen (start app with node server.js) ======================================
app.listen(3000);
console.log("App listening on port 3000");