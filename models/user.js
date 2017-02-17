var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	name: {
		type: String,
		index: true
	},
	email: {
		type: String
	},
	city: {
		type: String
	},
	mobile: {
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback) {
	newUser.save(callback); 
}

module.exports.getUserByUsername = function(username, callback) {
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
	User.findById(id, callback);
}

module.exports.getUsers = function(options, callback) {
	User.find(options, callback);
}

module.exports.deleteUser = function(id, callback){
	User.findById(id).remove( callback );
}

module.exports.updateUser = function(id, user, callback){
	var condition = {'id':id};
	User.findOneAndUpdate(id, user, callback);
}