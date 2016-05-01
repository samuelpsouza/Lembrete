angular.module('lembreteController', [])
	.controller('mainController', function($scope, $http, Lembrete){
		$scope.formData = {};

	Lembrete.get().success(function(data){
		$scope.lembretes = data;
	});

	$scope.createLembrete = function(){
		if($scope.formData.text != undefined){
			Lembrete.create($scope.formData).success(function(data){
				$scope.formData = {};
				$scope.lembretes = data;
			});
		}
	};

	$scope.editLembrete = function(id){
		if ($scope.formData.text != undefined) {
			Lembrete.edit($scope.formData).success(function(data){
				$scope.formData = {};
				$scope.lembretes = data;
			});
		}
	};

	$scope.deleteLembrete = function(id){
		Lembrete.delete(id).success(function(data){
			$scope.lembretes = data;
		});
	};
});