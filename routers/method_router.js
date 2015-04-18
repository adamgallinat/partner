var express          = require('express'),
    bodyParser       = require('body-parser'),
    logger           = require('morgan'),
    models           = require('../models'),
    Method 					 = models.methods;

var methodRouter = express.Router();

methodRouter.get('/', function(req, res) {
	Method.findAll()
		.then(function(methods) {
			res.send(methods);
		});
});

methodRouter.get('/types', function(req, res) {
	var types = [];
    Method.findAll()
      .then(function(allMethods) {
        allMethods.forEach(function(method) {
          if (types.indexOf(method.technology) === -1) {
            types.push(method.technology);
          }
        });
    		res.send(types);
      });
});

methodRouter.get('/of_type/:type', function(req, res) {
  Method.findAll({where: {technology: req.params.type}})
    .then(function(methods) {
      res.send(methods);
    });
});

methodRouter.get('/:id', function(req, res) {
	Method.findOne({where: {id: req.params.id}})
		.then(function(method) {
			res.send(method);
		});
});

module.exports = methodRouter;