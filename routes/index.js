var express = require('express');
var router = express.Router();

var User = require('../models/user')

// Default page
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/users', function(req, res){
	User.find({}, function(err, users){
			if(err) throw err;
			// console.log(users); 
			res.json(users);
		});
});

router.post('/users', function(req, res){

	var name = req.body.name;
	var email = req.body.email;
	var city = req.body.city;
	var mobile = req.body.mobile;

	var newUser = new User({
			name: name,
			email: email,
			city: city,
			mobile: mobile
		});

	User.createUser(newUser, function(err, user){
		if(err) throw err;
		res.json(user);
	});
});

router.delete('/users/:id', function(req, res){
	var id = req.params.id;
	User.deleteUser(id, function(err){
		if(err) throw err;
		res.json("deleted");
	});
});

router.put('/users', function(req, res){
	var id = req.body.id;
	var user = {
			name: req.body.name,
			email: req.body.email,
			city: req.body.city,
			mobile: req.body.mobile
		};
	User.updateUser(id, user, function(err){
		if(err) throw err;
		res.json("updated");
	});
});

module.exports = router;