angular.module('LembreteCtrl', []).controller('mainController', function($scope, $http, Lembretes){
	$scope.formData = {};

	Lembretes.get().success(function(data){
		$scope.lembretes = data;
	});

	$scope.createLembrete = function(){
		if(!$.isEmptyObject($scope.formData)){
			Lembretes.create($scope.formData).success(function(data){
				$scope.formData = {};
				$scope.lembretes = data;
			});
		}
	};

	$scope.editLembrete = function(id){
		Lembretes.edit()
		.success(function(data){
			$scope.lembretes = data;
		};

	$scope.deleteLembrete = function(id){
		Lembretes.delete(id).success(function(data){
			$scope.lembretes = data;
		});
	};

});