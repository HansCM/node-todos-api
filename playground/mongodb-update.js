//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

/* var obj = new ObjectID();
console.log(obj); */

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		return console.log("Unable to connect to MongoDB server");		
	} 
	console.log("Connected to MongoDB server");
	
	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('5812c187c8f82e2f5846d5cc')
	},{
		$set: {
			name: 'tom'
		},
		$inc: {
			age: -5
		}
	}, {
		returnOriginal : false
	}).then((result) => {
		console.log(result);
	});
	//db.close();
});