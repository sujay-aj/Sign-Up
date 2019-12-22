var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');

var app = express();

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


var api = require('./app/routes/api')(app,express);
api.use('/api',api);

app.get('*',function(req,res){
    console.log('index url',__dirname+'/public/views/index.html');
    res.sendFile(__dirname+'/public/views/index.html');
});

app.listen(config.port,function(err) {
    console.log('index url',__dirname+'/public/views/index.html');
    console.log('config.port',config.port);
    if(err)
        console.log('err',err);
    else {
        console.log('app running in port no 3000');
    }
});