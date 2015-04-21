var models           = require('./models'),
    request					 = require('request'),
    cheerio					 = require('cheerio'),
    Method					 = models.methods;

request({
	url: 'http://api.jquery.com',
	method: 'GET'
}, function(err, res, body) {
	var $ = cheerio.load(body);
	$('.entry-title').children('a').each(function() {
		// var item = {
		// 	technology: 'JQuery',
		// 	name: $(this).text(),
		// 	url: 'http:' + $(this).attr('href')
		// };
		// if (item.name[0] === '.') {
		// 	Method.create(item);
		// }
		console.log(this);
	});
});