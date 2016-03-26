var secret = require('./config/secret');
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./models/user');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsmate = require('ejs-mate');
var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');

var app = express();

mongoose.connect(secret.database, function(err){
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
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secret.secretKey
}));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');

app.use(mainRoutes);
app.use(userRoutes);

app.listen(secret.port, function (err) {
    if (err) throw err;
    console.log("Server is listening on port " + secret.port + "...");
});