var dbpass = require('./keys.js');
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./models/user');
var bodyParser = require('body-parser');

var app = express();
//console.log(dbpass);
mongoose.connect(dbpass, function(err){
    if (err){ 
        console.log(err);
    } else {
        console.log('connected to mongoose database..');
    }
});

//Middlware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.post('/create-user', function(req, res, next) {
    var user = new User();
    //console.log(req.body);
    user.profile.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    
    user.save(function(err) {
        if(err) next(err);
        
        res.json("Successfully created new user");
    });
});


app.listen(3000, function (err) {
    if (err) throw err;
    console.log("Server is listening on port 3000...");
});