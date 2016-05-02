module.exports = function(router, passport){
	router.post('/login', passport.authenticate('local-login', {

		//var sql = {where: {name: req.body.username}, include: [{all: true}]};

/*		User.find(sql).then(function(err, user) {
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
			
		});*/

		successRedirect: '/getHome';
		failureRedirect: '/';
	}));
};

	router.get('/getHome', isLoggedIn, function(req, res){
		res.redirect('/home.html');
	});

	router.post('/createLembrete', isLoggedIn, function(req, res){
		if(req.body.text != ""){

			var msg = {msg: req.body.text};
			Lembrete.create(msg).then(function(){
				Lembrete.findAll({username: "samuel"}).then(function(lembretes){
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
};
