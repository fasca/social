// SOCIAL SESSION MANAGER

// A LOT OF WORK TO DO HERE



export class session
{
	// Max Time for a user Session in ms

	computerIP;
//	computerBrowser;
//	computerOS;
	
	// Function object to Close Session if no activity during a arbitrary time
	timeOutSession;


	// User
	userId;
	sessionId;

	// Session Properties
	lastTimestamp;
	firstTimestamp;
	passKey;


	constructor (req, res)
	{

		// PUT THE TIMEOUT SESSION ALWAYS


		// ONLY AT INITIALIZATION OF SESSION
        req.session["firstTimestamp"] = new Date().getTime();

		this.refresh(req, res);
	}


	refresh (req, res)
	{

		// TO be sure that 15 minutes elapsed.


		// Change the KEY in Cookie & in Session Manager ?
		// RAND()
		Math.random();


		console.log("NOW CLEAR THIS SESSION ");

		req.session["userId"];

		req.session["sessionId"];


		
		req.session["passKey"] = Math.random();

        req.session["computerIp"] = req.ip;

        req.session["lastTimestamp"] = new Date().getTime();




        // Remove the current clearTimeout, & set a new one
		clearTimeout(this.timeOutSession);


		var self = this;

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

	}

}