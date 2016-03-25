var dbpass = require('./keys.js');
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./models/user');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsmate = require('ejs-mate');
var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');

var app = express();

mongoose.connect(dbpass, function(err){
    if (err){ 
        console.log(err);
    } else {
        console.log('connected to mongoose database..');
    }
});

//Middlware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');

app.use(mainRoutes);
app.use(userRoutes);

app.listen(3000, function (err) {
    if (err) throw err;
    console.log("Server is listening on port 3000...");
});