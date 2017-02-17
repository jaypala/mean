var myApp = angular.module('myApp', []);
myApp.controller('UserCtrl', ['$scope', '$http', function ($scope, $http) {
	// declare selectedUser object
	$scope.selectedUser = {};

	// get template for user display function 
	$scope.getTemplate = function (user) {
        if (user._id == $scope.selectedUser._id) return 'edit';
        else return 'display';
    };

	// refreshuser table function 
	function refreshuser(){
		$http({
			    method: 'GET',
			    url: '/users'
		   	}).then(function (response){
		   		$scope.users = response.data; 
		   });
	}

	// call refreshuser to load first time
	refreshuser();

	// add user function
	$scope.addUser = function(){
		$http.post('/users', $scope.user).then(function(response){
			$scope.user = "";
			refreshuser();
		});
	};

	// delete user function
	$scope.deleteUser = function(id){
		$http.delete('/users/'+id).then(function(response){
			refreshuser();
		});
	};

	// edit user function
    $scope.editUser = function (user) {
	 	$scope.selectedUser = angular.copy(user);
	};

	// udate user function to save edit user data
	$scope.updateUser = function(){
		$http.put('/users', $scope.selectedUser).then(function(response){
			$scope.selectedUser = "";
			refreshuser();
		});
	};

	// reset add user form
	$scope.resetAdd = function () {
		$scope.user = {};
	};

	// reset update user form
	$scope.resetUpdate = function () {
		$scope.selectedUser = {};
	};

}])