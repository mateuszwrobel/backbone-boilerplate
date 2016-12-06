var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
var hostname = process.env.HOSTNAME || 'localhost';
var port = parseInt(process.env.PORT, 10) || 8080;
var mockDir = __dirname + '/mocks/';

app.use(bodyParser.json()); // for parsing application/json
app.all('/', function(req, res) {
	res.send(fs.readFileSync(mockDir + 'testws.html', 'utf8'));
});

app.all('/api/mocked/data', function(req, res) {
	res.json(JSON.parse(fs.readFileSync(mockDir + 'mock.json', 'utf8')));
});

var server = app.listen(port, hostname, function() {
	var _host = server.address().address;
	var _port = server.address().port;
	console.log('Example app listening at http://%s:%s', _host, _port);
});
