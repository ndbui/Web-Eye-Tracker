var express = require('express');
var app = express();
var router = require('./routes/route.js');

app.use(express.static('public'));

var server = app.listen(3000, function() {
	var port = server.address().port;
	console.log("Started server at port", port);
});

module.exports = app;
