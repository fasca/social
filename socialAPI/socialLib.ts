// SOCIAL LIBRARY

// ! Change the 'var socialLib' in socialLib.js with 'module.exports' after compilation !


export class socialLib
{
	constructor(sql)
	{
		this.sql = sql;
		sql.connect();
	}


	// Check Form Values when adding a User
	checkUserFormValues (req)
	{
		if ( req.email1 == req.email2
		  && req.password1 == req.password2
	      && req.firstname != ''
	      && req.lastname != ''
	      && req.username != ''
	      && req.email1 != ''
	      && req.password1 != ''
	      && req.sex != ''
	      && req.date != '')
			return true;
	}


	// Verify if User doesn't already exist
	ifUserNameNotExists (userName, callback)
	{
	  console.log("SELECT userName FROM users WHERE `userName`='"+userName+"' LIMIT 0,1");

	  this.sql.query("SELECT userName FROM users WHERE `userName`='"+userName+"' LIMIT 0,1", callback);
	}


	// Creation
	insertUser (userProperties, callback)
	{
	  this.sql.query('INSERT INTO users (id,firstName,lastName,userName,email,password,sex,birthDate,joinDate)VALUES (0,"'+userProperties.firstname+'","'+userProperties.lastname+'","'+userProperties.username+'","'+userProperties.email1+'","'+userProperties.password1+'","'+userProperties.sex+'","'+userProperties.date+'",CURDATE())', callback);
	}
}