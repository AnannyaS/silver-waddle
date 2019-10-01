var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


mongoose.connect('mongodb://localhost/seconddb',{useNewUrlParser: true});
const Schema = mongoose.Schema;
const UserDetail = new Schema({
	    username: String,
        email: String,
        checkAdmin: Boolean,
        password: String,
        project : String,
        location: String,
        dept : String,
        desg:  String,
        emp_cd : String,
        DOJ : Date
        // leaveBal :Array,
        // totLvBal : Number,
        // totLvTkn : Number
    },
    {versionKey: false}
);


var User = module.exports = mongoose.model('User', UserDetail,'user');

module.exports.comparePassword = function(candidatePassword,hash,cb){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) {throw (err);}
        cb(null, isMatch);
    });
}


module.exports.getUserById = function(id,cb){
    User.findById(id,cb);
}

