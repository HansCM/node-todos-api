const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require ('jsonwebtoken');
const _ = require ('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
//		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid e-mail'
		}
	},
	password: {
		type: String,
		require: true,
		minlength: 6
	},
	tokens: [{
		access:{
			type: String,
			required: true
		},
		token:{
			type: String,
			required: true
		}
	}]
})

UserSchema.methods.toJSON = function() {
	var user = this;
	var userObject = user.toObject();	
	return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function(){
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
	
	user.tokens.push({access, token});
	
	return user.save().then(() => {
		return token;
	});
};

UserSchema.statics.findByToken = function (token) {
	var User = this;
	var decoded;
	
	try{
		decoded = jwt.verify(token, "abc123");
	} catch (e) {
		return Promise.reject();		
	}
	
	return User.findOne({
		'_id' : decoded._id,
		'tokens.token' : token,
		'tokens.access' : 'auth'		
	});
	
};

UserSchema.pre('save', function (next){
	var User = this;
	
	if(User.isModified('password')){
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(User.password, salt, (err, hash) => {
				User.password = hash;				
				next();
			});
		});				
	} else {
		next();
	}
})

var Users = mongoose.model('users',UserSchema);

module.exports = {Users};