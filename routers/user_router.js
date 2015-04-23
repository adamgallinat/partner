var express          = require('express'),
    bodyParser       = require('body-parser'),
    logger           = require('morgan'),
    models           = require('../models'),
    bcrypt					 = require('bcrypt'),
    session					 = require('express-session'),
    User 						 = models.users;

var userRouter = express.Router();

var authenticate = function(req, res, next) {
	if (req.session.currentUser) {
		next();
	} else {
		res.status(401).send({error: 401, msg: 'Not logged in'});
	}
};

var authorize = function(req, res, next) {
	if (req.session.currentUser === parseInt(req.params.id)) {
		next();
	} else {
		res.status(403).send({error: 403, msg: 'Not authorized'});
	}
};

userRouter.get('/', function(req, res) {
	User.findAll()
		.then(function(users) {
			res.send(users);
		});
});

userRouter.get('/:id', function(req, res) {
	User.findOne({where: {id: req.params.id}})
		.then(function(user) {
			res.send(user);
		});
});

userRouter.post('/', function(req, res) {
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		req.body.password_digest = hash;
		User.create(req.body)
			.then(function(result) {
				req.session.currentUser = result.id;
				res.send(result);
			},
			function(error) {
				res.status(422);
				res.send({
					status: 422,
					msg: error
				});
		});
	});
});

userRouter.put('/:id', authenticate, authorize, function(req, res) {
	User.findOne({where: {id: req.params.id}})
		.then(function(user) {
			user.update(req.body)
				.then(function(user) {
					res.send(user);
				});
		});
});

userRouter.delete('/:id', authenticate, authorize, function(req, res) {
	User.findOne({where: {id: req.params.id}})
		.then(function(user) {
			user.destroy()
				.then(function() {
					res.send(user);
				});
		});
});

module.exports = userRouter;