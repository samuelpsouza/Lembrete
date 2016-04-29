angular.module('LembreteCtrl', []).controller('mainController', function($scope, $http){
	$scope.formData = {};

	$http.get('/api/lembretes').success(function(data){
		$scope.lembretes = data;
	}).error(function(data){
		console.log('Error: ' + data);
	});

	$scope.createLembrete = function(){
		$http.post('/api/lembretes', $scope.formData)
		.success(function(data){
			$scope.formData = {};
			$scope.lembretes = data;
		}).error(function(data){
			console.log('Error: ' + data);
		});

	$scope.editLembrete = function(id){
		$http.edit('/api/lembretes' + id)
		.success(function(data){
			$scope.lembretes = data;
		}).error(function(data){
			console.log('Error: ' + data);
		});

	$http.deleteLembrete = function(id){
		$http.delete('/api/lembretes' + id).success(function(data){
			$scope.lembretes = data;
		}).error(function(data){
			console.log('Error: ' + data);
		});
};