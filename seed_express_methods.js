var models           = require('./models'),
    request					 = require('request'),
    cheerio					 = require('cheerio'),
    Method					 = models.methods;

request({
	url: 'http://expressjs.com/4x/api.html',
	method: 'GET'
}, function(err, res, body) {
	var $ = cheerio.load(body);
	var domItems = $('section h3');
	var arrayOfItems = [];
	for (var i = 0; i < domItems.length; i++) {
		var item = {};
		if ($(domItems[i]).html()[0] !== $(domItems[i]).html()[0].toUpperCase()) {
			var name = $(domItems[i]).html();
			if (name.split('(')[1]) {
				name = name.split('(')[0] + '()';
			}
			item.name = name;
			item.url = 'http://expressjs.com/4x/api.html#' + name.split('(')[0];
			item.technology = 'Express 4';
			// console.log(item);
			Method.create(item);
		}
	}
});

// Method.findAll({where: {technology:'Express'}})
// 	.then(function(methods) {
// 		methods.each(function(method) {
// 			method.destroy();
// 		});
// 	});