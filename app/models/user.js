var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs'); //A library to help hash passwords.

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:String,
    userName:{type: String,required:true,index:{unique:true}},
    passWord:{type: String,required:true,select:false}
});

userSchema.pre('save',function(next){
    var user = this;
    if(!user.isModified('passWord')) {
        return next();
    }
    bcrypt.hash(user.passWord,null,null,function(err,hash){
        if(err) return next(err);

        user.passWord = hash;
        next();
    });
});


userSchema.methods.comparePass = function(pass) {
    var user = this;
    return bcrypt.compareSync(pass,user.passWord);
};


module.exports = mongoose.model('user',userSchema);