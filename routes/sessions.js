
// SESSIONS FUNCTIONS

exports.open = function(req, res)
{
    // ADD PASSWORD VERIFICATION & KEY SENT TO COOKIE !
    // STORE COMPUTER IP AS LAST IP USED

	req.social.checkUserLoginInfo(req.body, function(err, result)
    {
      if(err) throw err;

      if(result[0] && result[0].id)
      {
        req.session["sessionId"] = result[0].id;

        // Use a Header Redirection to be able to use the Session Cookie just set
        res.writeHead(302,
        {
          'Location': '/profil'
          //add other headers here...
        });
        res.end();

      }
      else
        res.redirect("/signin");
    });
}


exports.close = function(req, res)
{
    req.session=null;
    console.log("Session Closed !");

    res.redirect("/");
}