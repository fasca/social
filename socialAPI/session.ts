// SOCIAL SESSION

// A LOT OF WORK TO DO HERE



export class session
{
	sessionId;

	// Session Properties
	userId;
	IP;
	loginTimestamp;
	lastTimestamp;
	passKey;
	userAgent;
	
	// Function object to Close Session if no activity during a arbitrary time
	timeOutSession;





	constructor (req, res)
	{

		// PUT THE TIMEOUT SESSION ALWAYS


		// ONLY AT INITIALIZATION OF SESSION
		this.loginTimestamp = new Date().getTime();
        req.session["loginTimestamp"] = this.loginTimestamp;


        this.IP = req.ip;
		this.passKey = Math.random();
        req.session["IP"] = req.ip;



		this.refresh(req, res);






	}


	refresh (req, res)
	{
		var self = this;


		// Change the KEY in Cookie & in Session Manager ?
		// RAND()


		console.log("NOW CLEAR THIS SESSION ");
		



		req.session["userId"];

		req.session["sessionId"];


		
		req.session["passKey"] = Math.random();


        req.session["lastTimestamp"] = new Date().getTime();




        // Remove the current clearTimeout, & set a new one
		clearTimeout(this.timeOutSession);



		this.timeOutSession = setTimeout(function()
			{

				// SEND THIS TO TIMEOUT

				var currentTime = new Date().getTime();

				// IF TIMESTAMP IS MORE THAN 15 MINUTES
				if (currentTime-self.lastTimestamp > 1000*20)
				{
					self.close(req, res);
				}
				else
				{
					self.refresh(req, res);
				}

			}, 1000);
	}




	close (req, res)
	{

		// Remove this Session from User.sessions Array


		// Remove Session from Array


		// WHAT ELSE TO DO ?

	}

}