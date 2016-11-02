const{ObjectID} = require('mongodb');

const{mongoose} = require('./../server/db/mongoose');
const{Todo} = require('./../server/models/todo');
const{User} = require('./../server/models/users');

/* Todo.remove({}).then((result) => {
	console.log(result);	
}); */

Todo.findByIdAndRemove('581947ab3713a3c022540caf').then((todo) => {
	console.log(todo);
});

