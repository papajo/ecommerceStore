var express = require('express');
var morgan = require('morgan');

var app = express();

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