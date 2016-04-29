var Lembrete = require('./models/lembrete');

function getLembretes(res){
	Lembrete.find(function (err, lembretes){
		if(err)
			res.send(err);
		res.json(lembretes);
	});
};