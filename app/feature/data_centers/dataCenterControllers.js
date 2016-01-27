define([], function () {
  "use strict";

  return ['$scope', '$stateParams', '$http',function ($scope,$stateParams,$http) {
	  $scope.show=false;
    var invokeError = function () {
      $scope.errorMessage = "Sorry. The application with the id \"" + $stateParams.appId + "\" was not found. " +
        "Please try again later or \"Provide Feedback.\"";
    };

    var response = $http.get("data_centers").success(function(response){
        console.log(response.datacenters);
        $scope.datacenters = response.datacenters;
    });

  $scope.publish = function(){
		
        var dcId = $scope.id;
        var dcDescr = $scope.description;

    $http({
        url:"data_centers",
        method:"POST",
        params:{"id": dcId, "descr": dcDescr}
    }).success(function(response){

    }).error(function(response){
		$scope.show=true;  
        alert(response.notification);
		$scope.notification = response.notification;
	});
 } ;
  }];  
});