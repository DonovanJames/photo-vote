// This defines the routes used on this application. It also requires the database module

// create referenced for data objects
var db = require("./database.js"),
	images = db.images,
	users = db.users;


module.exports = function(app){

    console.log('Routes live');

	//homepage rendering protocol
	app.get('/', function(req,res){
        console.log('request received at: ' + req.path);
		images.find(function(err, allImages){
            console.log(allImages);
			// Find the current user
			users.find({ip: req.ip},function(err, u){
			// create the image array
				var votedImages = [];
				if(u.length == 1){
					votedImages = u[0].votes;
				}
				// Find the images the user has not voted on yet
				var notVotedImages = allImages.filter(function(image){
					return votedImages.indexOf(image._id) == -1;
				});
				var displayImage = null;
				if(notVotedImages > 0){
				// choose a random image from the array
						displayImage = notVotedImages[Math.floor(Math.random()*notVotedImages.length)]
				}
				// trandsmit the display image image
				res.render('home', {image: displayImage});
			});
		});
	});


	// scope render all the photos currently in the database. There is no logic, it just shows everything.
	app.get('/scope', function(req, res){
		//sort images based on a simple weight | Intended to be relative comparison at some point
		allImages.sort(function(p1, p2){
			return (p2.wins - 2*p2.loses/3) - (p1.wins - 2*p1.loses/3);
		});
		//render the scope template and pass the image json
		res.render('scope', {scope:allImages});
	});


	//execute this before further actions are taken
	app.post('*', function(req, res, next){
		//register the user by the ip in the database
		user.insert(
			{
				ip:req.ip,
				votes: []
			},
			function(){
				//continue routes
				next();
			}
		)
	});


	// apply voting logic via post requests
	app.post('/win', vote);
	app.post('/lose', vote);


	// define voting logic and routing function based on the request. Update Database accordingly
	function vote(req, res){
		// define the path logic for incrementing wins and loses
		var def = {
			'/win': {wins:1},
			'/lose': {loses:1}
		};
		// find image in the database to apply data
		images.find({image:req.body.image}, function(err, found){
			// if an entry is found update the image metadata and user information. Then redirect.
			if(found.length == 1){
				images.update(found[0], {$inc: def[req.path]});
				users.update({ip:req.ip}, {$addToSet: {votes: found[0]._id}}, function(){
					res.redirect('../');
				});
			}
			// on error or null photo redirect
			else(res.redirect('../'));
		});
	}


	//end module definition
}