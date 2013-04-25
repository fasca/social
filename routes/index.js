
/*
 * GET home page.
 */

exports.index = function(req, res){

	var sessionId = req.session.sessionId;

	if (sessionId)
		req.social.getUserInfo(sessionId, function(err, result)
	        {
			  	res.render('index', { title: 'Social', userInfo: result });
	        });
	else
	  	res.render('index', { title: 'Social' });

};