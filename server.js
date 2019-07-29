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

var mysql = require('mysql');

var con = mysql.createConnection({
	host: 'remotemysql.com',
	user: 'DLM1k0DlF6',
	password: 'c6KWUOJ2OM',
	database: 'DLM1k0DlF6'
});

app.get('/post', function(req, res) {
	con.connect(function(err) {
		if (err) throw err;
		console.log('Connected!');
		var sql =
			"INSERT INTO movies (title, genre, releaseDate, mainActors, summarizedPlot, youtubeTrailer) VALUES ('Company Inc', 'Highway 37', '11', '123', '456', '789')";
		con.query(sql, function(err, result) {
			if (err) throw err;
			console.log('1 record inserted');
		});
	});
});

app.listen(process.env.PORT || 8080);
