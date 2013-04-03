
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});



// Url Redirections
app.get('/', routes.index);
app.get('/users', user.list);

/* You can add Url Redirections without including JS file, directly by specifying it in the callback */
// SignUp Page
app.get('/signup', function(req, res)
  {
    res.render('signup', { title: 'SignUp. Social' });
  });
// Sign In Page
app.get('/signin', function(req, res)
  {
    res.render('signin', { title: 'SignIn. Social' });
  });
// Forgot password Page
app.get('/forgotPwd', function(req,res)
  {
    res.render('forgotPwd', { title: 'Forgot your Password?'});
  });


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
