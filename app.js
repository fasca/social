/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// for DB
var mysql = require('mysql');
var fs = require('node-fs');
var config = JSON.parse(fs.readFileSync('./mysql-config.json'));
var client = new mysql.createConnection(config); 
client.connect();

// Pour pouvoir récupérer les variables POST après
app.use(express.bodyParser()); 


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



function insertUser(hash){
  client.query('INSERT INTO users (id,firstName,lastName,userName,email,password,sex,birthDate,joinDate) VALUES (0,"'+hash.body.firstname+'","'+hash.body.lastname+'","'+hash.body.username+'","'+hash.body.email1+'","'+hash.body.password1+'","'+hash.body.sex+'","'+hash.body.date+'",CURDATE())', function(err, result) {
  if (err) throw err;

  console.log(hash.body);
});
}

// Ajout via POST
app.post('/', function(req, res) {
    //data.insertUser(req.body, dataCallback(res));
    console.log(req.body.firstname);// test C to S
    if(req.body.email1 == req.body.email2 && req.body.password1 == req.body.password2
      && req.body.firstname != '' && req.body.lastname != '' && req.body.username != ''
      && req.body.email1 != '' && req.body.password1 != '' && req.body.sex != '' && req.body.date != '')
    {
      insertUser(req);
      res.render('signin', { title: 'SignIn. Social' });
    }
    else
    {
      res.render('signup', { title: 'SignUp. Social' });
    }  
});





