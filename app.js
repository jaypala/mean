var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var mongo = require('mongodb');
var mongoose = require('mongoose');

// requiring config db file 
var dbConfig = require('./config/database.js');
mongoose.connect(dbConfig.database);
var db = mongoose.connection;

require('./config/vengine.js')(app);

// BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/', routes);

// Set port
app.set('port', 3000);

app.listen(app.get('port'), function(){
	console.log('Server started on port '+ app.get('port'));
});
