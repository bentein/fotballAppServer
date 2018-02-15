var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', function (req,res) {
	console.log(req.body);
	res.end();
});

app.listen(8080, function() {
	console.log("Node started on port 8080");
});