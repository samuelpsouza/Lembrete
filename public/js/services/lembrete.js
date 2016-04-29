angular.module('lembreteService', []).factory('Lembretes', function($http){
	return {
		get : function() {
			return $http.get('/api/lembretes');
		},
		create : function(lembreteData){
			return $http.post('/api/lembretes', lembreteData);
		},
		edit : function(id){
			return $http.post('/api/lembretes' + id);
		},
		delete : function(id){
			return $http.post('/api/lembretes' + id);
		}

	}
});