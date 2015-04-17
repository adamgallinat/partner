var application_root = __dirname,
    express          = require('express'),
    bodyParser       = require('body-parser'),
    path             = require('path'),
    logger           = require('morgan'),
    session					 = require('express-session'),
    models           = require('./models'),
    userRouter			 = require('./routers/user_router.js');
    methodRouter		 = require('./routers/method_router.js');

var app = express();
app.use(session({
	secret: 'correcthorsebatterystaple',
  resave: false,
  saveUninitialized: true
}));

// Server Configuration
app.use(logger('dev'));
app.use( bodyParser() );
app.use( express.static( path.join( application_root, 'public' )))
app.use( express.static( path.join( application_root, 'browser' )))

// Routes

app.get('/debug_session', function(req, res) {
	res.send(req.session);
});

app.post('/session', function(req, res) {
	var id = req.body.id;
	console.log(id);
	req.session.currentUser = id;
	console.log(req.session);
	res.send(req.session);
});

app.delete('/session', function(req, res) {
	delete req.session.currentUser;
	res.send(req.session);
});

// Users
app.use('/users', userRouter);
app.use('/methods', methodRouter);

// Export app as module
module.exports = app;