// SOCIAL LIBRARY

var user = require('./user.ts').user;
var session = require('./session.ts').session;

export class socialLib
{
    sql;

    // Users Array
    users;

    // Sessions Array
    sessions;

    constructor(sql)
    {
        this.sql = sql;
        sql.connect();

        this.users = new Array();
        this.sessions = new Array();
    }


    loadUser (req, userInfo)
    {
        this.users[userInfo.id] = new user(req, userInfo);
    }



    // Check the session Integrity from User Session Cookies
    checkSessionIntegrity(session, callback)
    {
                
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
        var query = "SELECT userName FROM users WHERE `userName`='" + userName + "' LIMIT 0,1";
        this.sql.query(query, callback);
    }


    // Creation
    insertUser (userProperties, callback)
    {
        var query = 'INSERT INTO users (id,firstName,lastName,userName,email,password,sex,birthDate,joinDate)VALUES (0,"' + userProperties.firstname + '","' + userProperties.lastname + '","' + userProperties.username + '","' + userProperties.email1 + '","' + userProperties.password1 + '","' + userProperties.sex + '","' + userProperties.date + '",CURDATE())';
        this.sql.query(query, callback);
    }


    // Get User Info
    getUserInfo (userId, callback)
    {
        // Will Return a JSON
        // Elements will depend on the rights the Current Session User has to view on the User he wants to look at.
        var query = "SELECT * FROM users WHERE `id`=" + userId;

        console.log(query);

        // CHECK USER SESSION
        // FILTER USERINFO DEPENDING ON USER SESSION RIGHTS

        this.sql.query(query, function(err, result)
            {
                callback(err, result[0]);
            });
    }



    // Check User LogIn Form Info
    checkUserLoginInfo (value, callback)
    {
        console.log(value);

        var query = "SELECT * FROM users WHERE `userName`='" + value.username + "' AND `password`='" + value.password +"';";

        console.log(query);

        this.sql.query(query, callback);
    }
}