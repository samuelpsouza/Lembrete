angular.module('lembreteController', [])
	.controller('mainController', function($scope, $http, Lembrete){
		$scope.formData = {};
		$scope.editorEnabled = false;
		$scope.lembrete_id = '';

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
			Lembrete.edit($scope.lembrete_id, $scope.formData).success(function(data){
				$scope.formData = {};
				$scope.lembretes = data;
				$scope.disableEditor();
			});
		}
	};

	$scope.deleteLembrete = function(id){
		Lembrete.delete(id).success(function(data){
			$scope.lembretes = data;
		});
	};

	$scope.enableEditor = function(id){
		$scope.editorEnabled = true;
		$scope.lembrete_id = id;
	};

	$scope.disableEditor = function(){
		$scope.editorEnabled = false;
	};
});