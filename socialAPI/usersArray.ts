// Social Object Users Array

var user = require('./users.ts').user;


export class usersArray
{

  sessionsArray;
	
	constructor ()
	{
		this.sessionsArray = new Array();
	}




	loadUser (userId)
	{
		this.sessionsArray[userId] = new user();
	}


}



// HOW TO USE IT :
// usersArray = new Array();

// usersArray[userId] = new user(userInfo);




// usersArray[userId].sessionsArray





