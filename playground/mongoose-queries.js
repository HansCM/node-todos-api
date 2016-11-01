const{ObjectID} = require('mongodb');

const{mongoose} = require('./../server/db/mongoose');
const{Todoz} = require('./../server/models/todo');
const{Users} = require('./../server/models/users');

var id = '5814203d5fc2751011b102c3';

if(ObjectID.isValid(id)) {
	console.log("ID is valid");
} else {
	console.log("Not valid");
}

/* Todoz.findById('58141722f4918fdc00104ac8').then((todo) => {
	if(!todo){
		return console.log('not found');
	}
	console.log('by id', todo);
}).catch((e) => console.log(e)); */


/* Todoz.findOne({
	_id: '58141722f4918fdc00104ac8'
}).then((user) => {
	console.log('Users', user);
});
 */

 Users.findById(id).then((user) => {	
	console.log(user);
});



/* 
var id = ;

if (!ObjectID.isValid(id)) {
	console.log('ID not valid');
};

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
 

 */