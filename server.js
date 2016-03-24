var dbpass = require('./keys.js');
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');


var app = express();
console.log(dbpass);
mongoose.connect(dbpass, function(err){
    if (err){ 
        console.log(err);
    } else {
        console.log('connected to mongoose database..');
    }
});

//Middlware
app.use(morgan('dev'));

//Routes
app.get('/', function(req, res){
    res.json('Hello Jason!');
});

app.get('/name', function (req, res) {
    res.json('Hello! ' + req.name);
})



app.listen(3000, function (err) {
    if (err) throw err;
    console.log("Server is listening on port 3000...");
});