var secret = require('./config/secret');
var path = require('path');
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
var mongoStore = require('connect-mongo/es5')(session);
var passport = require('passport');
var adminRoutes = require('./routes/admin'); 

var app = express();

mongoose.connect(secret.database, function(err){
    if (err){ 
        console.log(err);
    } else {
        console.log('connected to mongoose database..');
    }
});

//Middlware
app.use(express.static(path.join(__dirname + '/public')));
app.set('views',path.join(__dirname, 'views'));
app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secret.secretKey,
    store: new mongoStore({url:secret.database, autoReconnect: true})
}));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
});
app.use(mainRoutes);
app.use(userRoutes);
app.use(adminRoutes);

app.listen(secret.port, function (err) {
    if (err) throw err;
    console.log("Server is listening on port " + secret.port + "...");
});