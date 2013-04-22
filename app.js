/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , mysql = require('mysql')
  , fs = require('node-fs');



// Swith this var to True to use the local DB
const useLocalConfig = true;









// Social Project Libraries
var socialLib = require("./socialAPI/socialLib.js");
console.log(socialLib);

// Express Server object
var app = express();



// MySQL Connection Initiliazation
if(!useLocalConfig)
  var config = JSON.parse(fs.readFileSync('./sql/mysql-config.json'));
else
  var config = JSON.parse(fs.readFileSync('./sql/mysql-config-local.json'));



var client = new mysql.createConnection(config); 


// Social Instance
var social = new socialLib(client);





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







// Ajout via POST
app.post('/ajax/createuser', function(req, res)
{
    // Check the form values (We'll use a function here)
    if(social.checkUserFormValues(req.body))
    {
      social.ifUserNameNotExists(req.body.username, function(err, result)
        {
          if (err) throw err;

          if(result.length==0)
            social.insertUser(req.body, function(err, result)
            {
              if (err) throw err;
        
              // This is the Callback function after inserting the user
              console.log(result);

              if(result.affectedRows==1)
                res.end("Succesfully Created User.");
              else
                res.end("We have a problem Here.");
            });
          else
            res.end("This username is not available.");
        });

    }
    else
    {
      res.end("Wrong values.");
    }
});
