var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var pretty = require('express-prettify');

var app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(pretty({ query: 'pretty' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var responses = {};

var getIP = function(req) {
	ip = req.ip;
	if (ip.substr(0, 7) == "::ffff:") {
		ip = ip.substr(7);
	}
	return ip;
}

app.get('/', function(req,res) {
	if (req.query.clear == "") {
		console.log("clear from " + getIP(req));
		responses = {};
	} else {
		console.log("get from " + getIP(req));
	}
	res.json(responses);
	res.end();
});

app.post('/', function (req,res) {
	console.log("post from " + getIP(req));
	if (req.header("content-type") == "application/json; charset=UTF-8") {
		var len = Object.keys(responses).length + 1;
		responses["respons_" + len] = req.body;
		//responses = Object.assign(responses["response_" + len],req.body);
	}
	res.end();
});

app.listen(8080, function() {
	console.log("Node started on port 8080");
});