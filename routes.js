// This defines the routes used on this application. It also requires the database module

// create referenced for data objects
var db = require("./database.js"),
	images = db.images,
	users = db.users;


module.exports = function(app){

	//homepage rendering protocol
	app.get('/', function(req,res){

		images.find(function(err, all_images){

			// Find the current user
			users.find({ip: req.ip},function(err, u){

				// create the image array
				var votedImages = [];

				if(u.length == 1){
					votedImages = u[0].votes;
				}

//				Find the images the user has not voted on yet
				var notVotedImages = allImages.filter(function(image){
					return votedImages.indexOf(image._id) == -1;
				});

				var displayImage = null;

				if(notVotedImages > 0){
//					choose a random image from the array
                    displayImage = notVotedImages[Math.floor(Math.random()*notVotedImages.length)]
				}

//              trandsmit the display image image
                res.render('home', {image: displayImage});

			});

		});

	});

}