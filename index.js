// Main app file that establishes the port and coordinates components.

var express = require('express');

// Create express instance
var app = express();

// include file dependencies
require('./config.js')(app);
require('./routes.js')(app);

// establish connection
app.listen(8888);
console.log('App running on port 8888');