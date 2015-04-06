define([], function () {
  "use strict";

  return ['$scope', 'appsFactory', '$stateParams', function ($scope, appsFactory, $stateParams) {
    var invokeError = function () {
      $scope.errorMessage = "Sorry. The application with the id \"" + $stateParams.appId + "\" was not found. " +
        "Please try again later or \"Provide Feedback.\"";
    };
    appsFactory.resource.get({id: $stateParams.appId}, function (application) {
      if (!application) {
        invokeError();
        return;
      }
      $scope.app = application;
      $scope.simple_dependency_graph = '/?simple/#/graph/' + application._id + '?down=true&hops=1';
    }, function () {
      invokeError();
    });
  }];
});