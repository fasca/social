
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// For DB
var data = require('./routes/social-db.js');

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
app.get('/forgotPwd', function(req, res)
  {
    res.render('forgotPwd', { title: 'Forgot your Password?'});
  });
// Profil Page
app.get('/profil', function(req, res)
  {
    res.render('profil', {title: 'My Profil.'});
  });
// News Page
app.get('/news', function(req, res)
  {
    res.render('news', {title: 'The News.'});
  });
// Messages Page
app.get('/messages', function(req, res)
  {
    res.render('messages', {title: 'My Messages.'});
  });
// Notifications Page
app.get('/notifications', function(req, res)
  {
    res.render('notifications', {title: 'My Notifications.'});
  });
// Settings Page
app.get('/settings', function(req, res)
  {
    res.render('settings', {title: 'Account Settings.'});
  });
// Delete Page
app.get('/delete', function(req, res)
  {
    res.render('delete', {title: 'Delete page.'});
  });
// Edit friends list Page
app.get('/editFriendsList', function(req, res)
  {
    res.render('editFriendsList', {title: 'Edit friends list page.'});
  });

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});



/// Routes
function dataCallback(res) {
    return function(err, data) {
        if (err) {
            res.send({error : err});
        } else {
      // Il serait intéressant de fournir une réponse plus lisible en
      // cas de mise à jour ou d'insertion...
            res.send(data);
            console.log("modification DB");
            alert("modification DB");
        }
    }
}

// Ajout via POST
app.post('/profil', function(req, res) {
    data.insertUser(req.body, dataCallback(res));
});




