var models           = require('./models'),
    request					 = require('request'),
    cheerio					 = require('cheerio'),
    Method					 = models.methods;

request({
	url: 'http://backbonejs.org/',
	method: 'GET'
}, function(err, res, body) {
	var $ = cheerio.load(body);
	var lists = $('.toc_section');
	for (var i = 0; i < lists.length; i++) {
		if ((i === 1) || (i === 2) || (i === 3) || (i === 4) || (i === 7)) {
			var category = $(lists[i]).prev().text().trim();
			var items = ($(lists[i]).children('li').children('a'));
			items.each(function() {
				var nameSlug = $(this).html().split('<b>').join('').split('</b>').join('');
				var method = {
					name: category + ': ' + nameSlug,
					url: 'http://backbonejs.org/' + $(this).attr('href'),
					technology: 'Backbone'
				};
				// Method.create(method);
				console.log(method);
			});
		}
	}
});