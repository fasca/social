
/*
 * GET home page.
 */

exports.index = function(req, res){

  var sessionId = req.session.sessionId;

  // THINK ABOUT THE WAY TO ACCESS SOCIAL API OBJECT THROUGH THE FILES (routes/index.js for example)
  if (sessionId)
    res.req.social.getUserInfo(sessionId, function(err, result)
      {
        res.render('index', { title: 'Social', userInfo: result });
      });
  else
    res.render('index', { title: 'Social' });

}

exports.sessions = require('./sessions.js');