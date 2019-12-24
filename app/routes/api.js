var User = require('../models/user');
var config = require('../../config');
var jsonwebtoken = require('jsonwebtoken');

var secretKey = config.secretKey;

//creating a token using secretKey
function createToken(user) {
    var token = jsonwebtoken.sign({
        _id: user._id,
        name:user.name,
        userName:user.userName
        }, superSecret, {
            expiresIn:120 
    })
    return token;
}

module.exports = function(app,express) {
    var api = express.Router();
    //Routing to /signup
    api.post('/signup',function(req,res){
        var user = new User({
            name:req.body.name,
            userName:req.body.userName,
            passWord:req.body.passWord
        });
        user.save(function(err){
            if(err){
                res.send(err);
                return;
            } 
            res.json({message:'User has been created successfully'});
        });
    });

    //Routing to /users
    api.get('/users',function(req,res){
        User.find({},function(err,users){
            if(err){
                res.send(err);
                return;
            } 
            res.json(user);
        });
    });



    //Routing to /login
    api.post('/login',function(req,res){
        User.findOne({
            userName: req.body.userName
        }).select('passWord').exec(function(err,user){
            if(err) throw err;
            if(!user) {
                res.send({message:"User does not exist"});
            } else if( user) {
                var validPass = user.comparePass(req.body.passWord);
                if(!validPass) {
                    res.send({message:"User does not exist"});
                } else {
                    var token = createToken(user);
                    req.json({
                        succes:true,
                        message:"Login successful",
                        token:token
                    });
                }
            }
        }); 
    });


    return api;
}