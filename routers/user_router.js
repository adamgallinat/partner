var express          = require('express'),
    bodyParser       = require('body-parser'),
    logger           = require('morgan'),
    models           = require('../models'),
    bcrypt					 = require('bcrypt'),
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
	console.log(req.body.password);
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		req.body.password_digest = hash;
		User.create(req.body)
			.then(function(result) {
				req.session.currentUser = result.id;
				req.session.currentUserPassword = req.body.password;
				res.send(result);
			},
			function(error) {
				console.log('ERROR IS', error.message);
				console.log('RES IS', res);
				res.status(422);
				res.send({
					status: 422,
					msg: error
				});
		});
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