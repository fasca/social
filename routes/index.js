
/*
 * GET home page.
 */

exports.index = function(req, res){


	console.log(req.social)

  res.render('index', { title: 'Social', req: req });

}

exports.sessions = require('./sessions.js');