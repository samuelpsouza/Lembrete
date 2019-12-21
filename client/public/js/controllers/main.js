angular.module('lembreteController', [])
	.controller('mainController', function($scope, $http, $window, Lembrete){
		$scope.formData = {};
		$scope.editorEnabled = false;
		$scope.lembrete_id = '';

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

	$scope.login = function(){
		Lembrete.login($scope.userName.text, $scope.userPasswd.text).success(function(data){
			$window.location.href = '/api/getHome';
			$window.location.href;
		}).error(function(data){
			$window.location.href = '/';
			$window.location.href;			
		});
	};

	$scope.logout = function(){
		Lembrete.logout().success(function(){
			$window.location.href = '/';
			$window.location.href;
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