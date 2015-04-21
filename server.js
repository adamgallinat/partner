var application_root = __dirname,
    express          = require('express'),
    bodyParser       = require('body-parser'),
    path             = require('path'),
    logger           = require('morgan'),
    session		     = require('express-session'),
    bcrypt           = require('bcrypt'),
    models           = require('./models'),
    User             = models.users,
    userRouter		 = require('./routers/user_router.js'),
    methodRouter	 = require('./routers/method_router.js'),
    knowledgeRouter  = require('./routers/knowledge_router.js');

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

app.get('/current_user', function(req, res) {
    if (!req.session.currentUser) {
        res.send('not logged in');
    }
    if (req.session.currentUser) {
        User.findOne(req.session.currentUser)
            .then(function(user) {
                if (!user) {
                    res.send('not logged in');
                } else {
                    res.send(user);
                }
            });
    }
});

app.post('/session', function(req, res) {
    User.findOne({where: {email: req.body.email}})
        .then(function(user) {
            if(user) {
                bcrypt.compare(req.body.password, user.password_digest, function(err, result) {
                    if (result) {
                        req.session.currentUser = user.id;
                        res.send(user);
                    } else {
                        res.status(401).send({err:401, msg:'Wrong creds'});
                    }
                });
            } else {
                res.status(401).send({err:401, msg:'Wrong creds'});
            }
        });
});

app.delete('/session', function(req, res) {
	delete req.session.currentUser;
	res.send(req.session);
});

// Users
app.use('/users', userRouter);
app.use('/methods', methodRouter);
app.use('/knowledges', knowledgeRouter);

// Export app as module
module.exports = app;