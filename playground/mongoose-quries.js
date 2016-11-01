const{mongoose} = require('./../server/db/mongoos');
const{Todo} = require('./../server/models/todo');

var id = '5814f8f21a8c4b1c0f218e84';

Todo.find({
	_id: id
}).then((todos) => {
	console.log('Todos', todos);
});

Todo.findOne({
	_id: id
}).then((todo) => {
	console.log('Todos', todo);
});