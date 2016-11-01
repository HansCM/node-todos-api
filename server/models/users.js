var mongoose = require('mongoose');

var Users = mongoose.model('users',{
	user: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	}	
});

module.exports = {Users};