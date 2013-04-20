// SOCIAL LIBRARY


export class socialLib
{
	sql;

	constructor(sql)
	{
		this.sql = sql;
		sql.connect();
	}



	users = require("./users.js");


}