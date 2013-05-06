const useLocalConfig = true;

// Ability to Require TypeScript Modules
require("typescript-require")({nodeLib:true});

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , mysql = require('mysql')
  , fs = require('node-fs');// TODO : Make REQUIRE Adress more simple



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

  app.use(express.cookieParser("secretThing"));
  app.use(express.cookieSession());

  // Add SocialAPI to req to be able to use it anywhere
  app.use(function(req, res, next)
  {
    req.social = social;


    console.log(social.users[req.session.sessionId]);

    // console.log(req.headers['user-agent']);





    // BE CAREFUL THIS IS'NT SECURED !
    // CHANGE SESSION ID WITH USER ID !!!!
    if(req.session.sessionId)
      if(!social.users[req.session.sessionId])
        // Load User into Social Users Array
        social.getUserInfo(req.session.sessionId, function(err, result)
        {
          social.loadUser(req, result);
        });





    // Check Session
    if (req.session.sessionId)
    {

      // Check if session is stored in Nodejs Server :
      if (social.sessions[req.session.sessionId])
      {
        var isCorrectSession=true;
        serverSession = social.sessions[req.session.sessionId];

        // Check passKey 
        if (serverSession.passKey!=req.session.passKey)
          isCorrectSession=false;

        // Check userId (user is a link to social.users[userId])
        if (serverSession.user.userId!=req.session.userId)
          isCorrectSession=false;

        // Check timestamp
        if (serverSession.lastTimestamp != req.session.lastTimestamp)
          isCorrectSession=false;

        // Check IP
        if (serverSession.IP != req.ip)
          isCorrectSession=false;

        // Check User Agent
        if (serverSession.userAgent != req.headers['user-agent'])
          isCorrectSession=false;


        if(isCorrectSession)
          // Current Session is a link to social.sessions[sessionId]
          req.currentSession = social.sessions[sessionId];
      }
      else
      {
        // Session isn't stored in Nodejs Server :
        // Search in MySQL DB

      }




    }      

    next();


  });

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
    res.render('signup', { title: 'SignUp. Social', social: req.social, req: req });
  });
// Sign In Page
app.get('/signin', function(req, res)
  {
    res.render('signin', { title: 'SignIn. Social', social: req.social, req: req });
  });
// Forgot password Page
app.get('/forgotPwd', function(req, res)
  {
    res.render('forgotPwd', { title: 'Forgot your Password?', social: req.social, req: req});
  });
// Profil Page
app.get('/profil', function(req, res)
  {
    res.render('profil', {title: 'My Profil.', social: req.social, req: req});
  });
// News Page
app.get('/news', function(req, res)
  {
    res.render('news', {title: 'The News.', social: req.social, req: req});
  });
// Messages Page
app.get('/messages', function(req, res)
  {
    res.render('messages', {title: 'My Messages.', social: req.social, req: req});
  });
// Notifications Page
app.get('/notifications', function(req, res)
  {
    res.render('notifications', {title: 'My Notifications.', social: req.social, req: req});
  });
// Settings Page
app.get('/settings', function(req, res)
  {
    res.render('settings', {title: 'Account Settings.', social: req.social, req: req});
  });
// Delete Page
app.get('/delete', function(req, res)
  {
    res.render('delete', {title: 'Delete page.', social: req.social, req: req});
  });
// Edit friends list Page
app.get('/editFriendsList', function(req, res)
  {
    res.render('editFriendsList', {title: 'Edit friends list page.', social: req.social, req: req});
  });





// SESSIONS
app.post('/session/open', routes.sessions.open);
app.get('/session/close', routes.sessions.close);


// Successfully Created User
app.get('/successaccountcreation', function(req, res)
  {
   
    // TODO : ADD VERIFICATION. THIS PAGE CAN BE VIEWED ONLY IF USER DID NOT ALREADY ACTIVATED ITS PAGE, and VERIFY WITH A TIMESTAMP
    // ELSE REDIRECT TO INDEX

    // CHECK IF JOIN DATE IS LESS THAN 2 HOURS.
    // IP HAS TO BE THE SAME AS THE SUBSCRIPTION IP

    social.getUserInfo(req.query["id"], function(err, result)
    {
      var info = result;
      res.render('successAccountCreation',
        {
          title: "Successfully Created your Account!",

          // Simplify all these vars to one object
          firstName: info.firstName,
          lastName: info.lastName,
          userName: info.userName,
          email: info.email,

          
          social: req.social,
          req: req
        });

    });


      
  });





// AJAX INTERFACES
// Ajout via POST
app.post('/ajax/createuser', function(req, res)
{
    // If trying to create a User not using AJAX
    // Redirect to SignUp form
    if(!req.xhr)
      res.redirect("/signup");

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
                res.end(JSON.stringify(
                  {
                    success : 1,
                    insertId : result.insertId
                  }
                ));
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


// Récupérer la liste JSON
app.get('/ajax/getuserinfo', function(req, res)
{
    // If request is not from AJAX, redirect to index 
    if(!req.xhr)
      res.redirect("/");

    // Check if req.query.id is a number
    if(req.query["id"]%1===0)
      req.social.getUserInfo(req.query["id"], function(err, result)
        {
          res.end(JSON.stringify(result));
        });
    else
    {
      res.end("0");
    }


});





// Make Server Listen Given Port
// & Log it is Running
http.createServer(app).listen(app.get('port'), function()
{
  console.log("Social is Running on port " + app.get('port'));
});