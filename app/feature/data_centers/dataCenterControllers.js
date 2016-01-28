define([], function () {
  "use strict";

  return ['$scope', 'dataCenterFactory',function ($scope,dataCenterFactory) {
   
	  
    dataCenterFactory.getDatacenters().success(function (response) {
          $scope.datacenters =  response.datacenters;		 
        });
		
  $scope.publish = function(){
		
    dataCenterFactory.publishDatacenters($scope.id, $scope.description).success(function(response){

    }).error(function(response){		      
		
		alert(response.notification);
	}); 
	};
		
  }];  
});