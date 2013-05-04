// Social Object Users Array User


export class user
{
	userId;
	firstName;
	lastName;
	userName;
	email;
	password;
	sex;
	birthDate;

	// Sessions Array (links to every social.sessions[sessionId] where userId is the current user)
	sessions;

	constructor (req, userInfo)
	{
		this.userId = userInfo.id;
		this.firstName = userInfo.firstName;
		this.lastName = userInfo.lastName;
		this.userName = userInfo.userName;
		this.email = userInfo.email;
		this.password = userInfo.password;
		this.sex = userInfo.sex;
		this.birthDate = userInfo.birthDate;
	}


	createSession (req, sessionId)
	{

	}


}
