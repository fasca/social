
/*
 * GET home page.
 */

exports.index = function(req, res){

  res.render('index', { title: 'Social', req: req });

}

exports.sessions = require('./sessions.js');