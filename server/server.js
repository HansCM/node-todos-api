const express = require('express');
const _ = require('lodash');
const bodyParser= require('body-parser');
const{ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Users} = require('./models/users');
var {authenticate} = require('./middleware/authenticate');

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

app.delete("/todos/:id", (req,res) => {

	var id = req.params.id;

	if(!ObjectID.isValid(id)) {
		return res.status(400).send("This is not a valid ID: " + id);
	};

	Todo.findByIdAndRemove(id).then((todos) => {
		if(!todos){
			return res.status(404).send("Could not remove");
		}
		res.status(200).send(todos);
	}).catch((e) => {
		res.status(400).send(e);
	});
});//app.delete todos:id

app.patch("/todos/:id", (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ["text", "completed"]);

	if(!ObjectID.isValid(id)) {
		return res.status(404).send("This is not a valid ID: " + id);
	};

	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	};

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if(!todo) {
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	})
});//app.patch todos:id

app.get("/todos-all", (req,res) => {
	Todo.find().then((todos) => {
		res.send(todos);
	}, (e) => {
		res.sendStatus(400).send(e);
	})
});//app.get todos-all

//creates a new user and returns a token
app.post('/user', (req,res) => {
	var body = _.pick(req.body, ["email", "password"]);

	var user = new Users({
		email: body.email,
		password: body.password
	});

	user.save().then(() => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((e) => {
		res.status(400).send(e);
	});
});//app.post user


//Get user by token
app.get('/users/me' , authenticate,(req, res) => {
	res.send(req.user);
})// app.get //users/me

//Start server
app.listen(port, () => {
	console.log(`Server up on port ${port}`);
});

