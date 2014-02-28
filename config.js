// run configuration setting on the express app

// Include the handlebars object in the app
var handlebars = require('express3-handlebars'),
    express = require('express');

// Inclusion function for configuring main app
module.exports = function(app){
    console.log('Configurations set')
//	Register and configure the handlebar engine
	app.engine('html', handlebars({
			defaultLayout: 'main',
			extname: '.html',
			layoutDir: __dirname + '/views/layouts'
		}));

//	set html to the default template extension
	app.set('view engine', 'html');

//	inform express where the view templates can be found
	app.set('views', __dirname + '/views');

//	Make public folder available to the world
	app.use(express.static(__dirname + '/public'));

//
	app.use(express.urlencoded());
}