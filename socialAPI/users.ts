// Social Object Users Array User


var session = require('./session.ts');

export class user
{

	sessionsArray;


	constructor()
	{

		this.sessionsArray = new Array();



	}




	createSession (sessionId)
	{
		this.sessionsArray[sessionId] = new session();
	}


}



// USERS



// Verify if User doesn't exist
exports.ifUsernameNotExists = function(hash, callback)
{
  console.log("SELECT userName FROM users WHERE `userName`='"+hash+"'");

  this.sql.query("SELECT userName FROM users WHERE `userName`='"+hash+"'", function(err, res)
  {
    if (err) throw err;
    
    console.log("*****************************");
    console.log(res);
    
  });
};

// Creation
exports.insertUser = function(hash)
{
  this.sql.query('INSERT INTO users (id,firstName,lastName,userName,email,password,sex,birthDate,joinDate)VALUES (0,"'+hash.body.firstname+'","'+hash.body.lastname+'","'+hash.body.username+'","'+hash.body.email1+'","'+hash.body.password1+'","'+hash.body.sex+'","'+hash.body.date+'",CURDATE())', function(err, result)
    {
      if (err) throw err;
    });
}
