var express = require('express');
var bodyParser= require('body-parser');

const{ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Users} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',(req, res) => {
	var todo = new Todo({
		text: req.body.text
	});
	
	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});	
});

app.get("/todos/:id", (req,res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(400).send("This is not a valid Id: " + id);
	};

	Todo.findById(id).then((todos) => {
		if(todos){
			return res.send({todos});
		}
		res.status(400).send("Could not fine Id: " + id);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.listen(port, () => {
	console.log(`Server up on port ${port}`);
});

