// Require nedb module
var Datastore = require('nedb'),
	fs = require('fs');

// create nedb for photos and users leveraging autoload
var images = new Datastore({ filename: __dirname + "data/images", autoload: true }),
	users = new Datastore({ filename: __dirname + "data/users", autoload: ture});

//  Create unique filename for photos and user ip
imgaes.ensureIndex({fieldName: 'name', unique: true});
users.ensureIndex({fieldName: 'ip', unique: true});

// Read filesystem photos into nedb objects
var  defaultImages = fs.readdirSync(__dirname + 'public/images');

defaultImages.forEach(function(image){
	images.insert({
		name: name,
		wins: 0,
		looses: 0
	})
});

module.exports = {
	images:images,
	users:users
};
