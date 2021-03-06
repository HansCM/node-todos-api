var mongoose = require('mongoose');

var users = mongoose.model('users',{
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

module.exports = {users};