define(['lodash'], function(lodash) {
  "use strict";
  
  return ['$scope', '$http', '$state', 'appsFactory', function($scope, $http, $state, appsFactory) {
    appsFactory.appNames(function(response){
        $scope.apps = response;
    });

    $scope.selectApp = function() {
      $state.go('appInfo.detail', { appId: _.find($scope.apps, { 'name': $scope.name })._id });
    };

    // because this has happened asynchroneusly we've missed
    // Angular's initial call to $apply after the controller has been loaded
    // hence we need to explicityly call it at the end of our Controller constructor
    $scope.$apply();
  }];
}); 