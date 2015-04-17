var express          = require('express'),
    bodyParser       = require('body-parser'),
    logger           = require('morgan'),
    models           = require('../models'),
    session					 = require('express-session'),
    User 						 = models.users;

var userRouter = express.Router();

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
	User.create(req.body)
		.then(function(user) {
			res.send(user);
		});
});

userRouter.put('/:id', function(req, res) {
	User.findOne({where: {id: req.params.id}})
		.then(function(user) {
			user.update(req.body)
				.then(function(user) {
					res.send(user);
				});
		});
});

userRouter.delete('/:id', function(req, res) {
	User.findOne({where: {id: req.params.id}})
		.then(function(user) {
			user.destroy()
				.then(function() {
					res.send(user);
				});
		});
});

module.exports = userRouter;