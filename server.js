//modules

var express = require('express');
var app = express(); 						// create our app w/ express				// mongoose for mongodb			// load the database config
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var Sequelize = require('sequelize');
var restful = require('sequelize-restful');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var jwt = require('jsonwebtoken');
var config = require('./config');
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
// Models

var User = sequelize.define('User', {
	name: { type: Sequelize.STRING, primaryKey: true},
	passwd: Sequelize.STRING
}, {
	classMethods: {
		associate: function(){
			User.hasMany(Lembrete);
		}
	}
});

var Lembrete = sequelize.define('Lembrete', {
	msg: Sequelize.TEXT
}, {
	classMethods: {
		associate: function(){
			Lembrete.belongsTo(User, {as: "owner", foreignKey: "name"});
		}
	}
});

User.hasMany(Lembrete);
Lembrete.belongsTo(User);


User.sync().then(function(){
	return User.create({
		name:"samuel",
		passwd: "samuel"
	});
});

/*##########################*/

//app.use(restful(sequelize));

/* ################################################################################### */

app.set('superSecret', config.secret);

var router = express.Router();

router.post('/login', function(req, res){

	var sql = {where: {name: "samuel"}, include: [Lembrete]};

	User.find(sql).then(function(err, user) {
			if (err) throw err;

			if(!user) {
				res.json({success: false, message: "Login falhou. Usuario não encontrado."});
			} else if (user){
				if (user.passwd != req.body.passwd){
					res.json({success:false, message: "Senha incorreta."});
				} else {
					var token = jwt.sign(user, app.get('superSecret'), {
						expiresInMinutes: 500
					});

					res.json({
						success: true,
						message: "Seu token",
						token: token
					});
				}
			}
		
	});
});


router.use(function(res, req, next){
	
	var token = req.body.token || req.param('token') || req.headers['master-token'];
	
	if (token) {
		jwt.verify(token, app.get('superSecret'), function(err, decoded){
			if (err) {
				return res.json({success: false, message: "Não foi possivel verificar token."});
			}else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(403).send({
			success: false, message: "Nenhum token enviado."
		});
	}
});


router.get('/getHome', function(req, res){
	res.redirect('/home.html');
});

router.post('/createLembrete', function(req, res){
	if(req.body.text != ""){

		var msg = {msg: req.body.text};
		var name = {where: req.body.token.user.name};
		Lembrete.create(msg).then(function(){
			Lembrete.findAll({name}).then(function(lembretes){
				res.json(lembretes);
			});
		});
	}
});

router.get('/getLembretes', function(req, res){
	var name = {where: req.body.token.user.name};
	Lembrete.findAll({name}).then(function(lembretes){
		res.json(lembretes);
	});
});

router.put('/editLembrete/:id', function(req, res){
	Lembrete.findById(req.params.id, function(err, lembrete){
		if(err)
			res.send(err);
		lembrete.msg = req.body.text;
		lembrete.save(function(err){
			if(err)
				res.send(err);
			Lembrete.findAll().then(function(lembretes){
				res.send(lembretes);
			});
		});
	});
});

router.post('/deleteLembrete/:id', function(req, res){
	Lembrete.destroy({where : {id: req.params.id}}).then(function(){
		Lembrete.findAll().then(function(lembretes){
			res.json(lembretes);
		});
	});
});

router.post('/logout', function(req, res){
	res.redirect('/');
});

app.use('/api/', router);

/* ################################################################################### */


// listen (start app with node server.js) ======================================

app.listen(3000);
console.log("App listening on port 3000");