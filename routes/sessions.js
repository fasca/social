
// SESSIONS FUNCTIONS

exports.open = function(req, res)
{
    // ADD PASSWORD VERIFICATION & KEY SENT TO COOKIE !
    // STORE COMPUTER IP AS LAST IP USED

	req.social.checkUserLoginInfo(req.body, function(err, result)
    {
      if(err) throw err;

      console.log(result);

      if(req.body.rememberme)
        console.log("THIS USER WANTS TO BE REMEMBERED !");


      if(result[0] && result[0].id)
      {
        console.log("A");


        if (req.body.rememberme)
          res.cookie('sessionId', result[0].id, {expires: new Date(Date.now() + 900000), httpOnly: true});
        else
          req.session.sessionId = result[0].id;

        // Use a Header Redirection to be able to use the Session Cookie just set
        res.writeHead(302,
        {
          'Location': '/profil'
        });
        res.end();

      }
      else
      {
        console.log("A");
        res.redirect("/signin");
      }
      
    });
}


exports.close = function(req, res)
{
    if(req.sessionCookie == req.session)
      req.session=null;
    else
      res.clearCookie('sessionId', {path:'/'});

    console.log("Session Closed !");

    res.redirect("/");
}