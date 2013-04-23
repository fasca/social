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

// Ability to Require TypeScript Modules
require("typescript-require");

// Express Server object
var app = express();

// Social Project Libraries
var socialLib = require("./socialAPI/socialLib.ts").socialLib;


// MySQL Connection Initiliazation
if(!useLocalConfig)
  var config = JSON.parse(fs.readFileSync('./sql/mysql-config.json'));
else
  var config = JSON.parse(fs.readFileSync('./sql/mysql-config-local.json'));


// MySQL Client
var client = new mysql.createConnection(config); 

// Social Instance
var social = new socialLib(client);








// Express Configuration
app.configure(function()
{
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

// Development Error Handler
app.configure('development', function()
{
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


// Successfully Created User
app.get('/successaccountcreation', function(req, res)
  {
    res.render('successAccountCreation',
      {
        title: "Successfully Created your Account!",
        firstName:"Test",
        lastName: 'Test',
        userName: "test",
        email:"test@test.io"
      });
  });





// AJAX INTERFACES
// Ajout via POST
app.post('/ajax/createuser', function(req, res)
{
    console.log(req);

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
                res.end('{"success":1, "insertId":'+result.insertId+'}');
              else
                res.end('{"success":0, "error":"USERNOTADDEDTODB"}');
            });
          else
            res.end('{"success":0, "error":"USERNAMENOTAVAILABLE"}');
        });

    }
    else
    {
      res.end("{\"success\":0, \"error\":\"WRONGVALUES\"}");
    }
});








// Make Server Listen Given Port
// & Log it is Running
http.createServer(app).listen(app.get('port'), function()
{
  console.log("Social is Running on port " + app.get('port'));
});