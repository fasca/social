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
