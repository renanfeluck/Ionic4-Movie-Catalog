var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var cors = require('cors');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

if (typeof localStorage === 'undefined' || localStorage === null) {
	var LocalStorage = require('node-localstorage').LocalStorage;
	localStorage = new LocalStorage('./scratch');
}

app.post('/post', function(req, res) {
	console.log('Posting new movie', JSON.stringify(req.body));
	localStorage.setItem('movies', JSON.stringify(req.body));
	res.send({ status: 'Okay' });
});

app.get('/movies', function(req, res) {
	var movies = localStorage.getItem('movies');
	console.log('movies', movies);
	res.send(JSON.parse(movies));
});

app.listen(process.env.PORT || 8080);
