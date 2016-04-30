angular.module('lembreteService', [])
	
	.factory('Lembretes', function($http){
		return {
			get : function() {
				return $http.get('/api/getLembretes');
			},
			create : function(lembreteData){
				return $http.post('/createLembrete', lembreteData);
			},
			edit : function(id){
				return$http.put('/editLembrete/' + id)
			},
			delete : function(id){
				return $http.post('/deleteLembrete/' + id);
		}
	}
});