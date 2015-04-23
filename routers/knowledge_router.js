var express          = require('express'),
    bodyParser       = require('body-parser'),
    logger           = require('morgan'),
    models           = require('../models'),
    Knowledge 			 = models.knowledges,
    Method					 = models.methods;

var knowledgeRouter = express.Router();

var authenticate = function(req, res, next) {
	if (req.session.currentUser) {
		next();
	} else {
		res.status(401).send({status: 401, msg: 'login required'});
	}
};

var authorize = function(req, res, next) {
	if (req.session.currentUser === parseInt(req.params.user_id)) {
		next();
	} else {
		res.status(403).send({status: 403, msg: 'not authorized'});
	}
};

knowledgeRouter.get('/', authenticate, function(req, res) {
	Knowledge.findAll()
		.then(function(knowledges) {
			res.send(knowledges);
		});
});

knowledgeRouter.get('/of_methods', authenticate, function(req, res) {
	var methodList = req.query.methodList;
	var response = [];
	methodList = methodList.split(',')
												 .map(function(method) {
		return parseInt(method);
	});
	Knowledge.findAll()
		.then(function(knowledges) {
			knowledges.forEach(function(knowledge) {
				if (methodList.indexOf(knowledge.method_id) !== -1) {
					response.push(knowledge);
				}
			});
			res.send(response);
		});
});

knowledgeRouter.get('/:user_id', authenticate, function(req, res) {
	Knowledge.findAll({where: {user_id: req.params.user_id}})
		.then(function(knowledges) {
			res.send(knowledges);
		});
});

knowledgeRouter.get('/:user_id/:type', authenticate, function(req, res) {
	var response = [];
	Knowledge.findAll({where: {user_id: req.params.user_id}})
		.then(function(knowledges) {
			Method.findAll({where: {technology: req.params.type}})
    		.then(function(methods) {
    			knowledges.forEach(function(knowledge) {
    				methods.forEach(function(method) {
    					if (knowledge.method_id === method.id) {
    						response.push(knowledge);
    					}
    				});
    			});
    			res.send(response);
    		});
		});
});

knowledgeRouter.post('/:user_id', authenticate, authorize, function(req, res) {
	var data = req.body;
	data.user_id = req.params.user_id;
	Knowledge.create(data)
		.then(function(knowledge) {
			res.send(knowledge);
		});
});

knowledgeRouter.put('/:user_id/:method_id', authenticate, authorize, function(req, res) {
	Knowledge.findOne({where: {
		user_id: req.params.user_id,
		method_id: req.params.method_id
	}})
		.then(function(knowledge) {
			knowledge.update(req.body)
				.then(function(knowledge) {
					res.send(knowledge);
				});
		});
});

knowledgeRouter.delete('/single/:id', authenticate, function(req, res) {
	Knowledge.findOne(req.params.id)
		.then(function(knowledge) {
			knowledge.destroy()
				.then(function() {
					res.send(knowledge);
				});
		});
});

knowledgeRouter.delete('/:user_id', authenticate, authorize, function(req, res) {
	Knowledge.findAll({where: {user_id: req.params.user_id}})
		.then(function(knowledges) {
			knowledges.destroy()
				.then(function() {
					res.send(knowledges);
				});
		});
});


module.exports = knowledgeRouter;