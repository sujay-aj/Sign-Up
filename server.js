var express = require('express'); //web api framwork
var bodyParser = require('body-parser'); //HTTP POST request in Express.js extract body of an incoming request stream and exposes it on req.body
var morgan = require('morgan'); //Logging middleware for node.js http apps
var config = require('./config');
var mongoose = require('mongoose'); //Mongoose is a JavaScript framework that is commonly used in a Node.js application with a MongoDB,creating and working with schemas

var app = express();

//connecting to DB
mongoose.connect(config.database,function(err){
    if(err) {
        console.log('database error',err);
    } else {
        console.log('Connected to database');
    }
})

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json);
app.use(morgan('dev'));


//going to api.js file with app,express
var api = require('./app/routes/api')(app,express);
api.use('/api',api);

//home redirect
app.get('*',function(req,res){
    console.log('index url',__dirname+'/public/views/index.html');
    res.sendFile(__dirname+'/public/views/index.html');
});

//starting the server
app.listen(config.port,function(err) {
    console.log('index url',__dirname+'/public/views/index.html');
    console.log('config.port',config.port);
    if(err)
        console.log('err',err);
    else {
        console.log('app running in port no 3000');
    }
});