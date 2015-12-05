define(['forced-graph'], function(forcedGraph) {
  "use strict";

  return ['$scope', '$http', '$location', '$state', '$stateParams', '$window', 'appsFactory',
  function($scope,   $http,   $location,   $state,   $stateParams,   $window,   appsFactory) {


    $scope.name = $stateParams.app_name;
    $scope.nodes_exclude = $location.search().exclude;
    $scope.nodes_include = $location.search().include;
    $scope.show_dependencies = $location.search().down === 'true';
    $scope.show_used_by = $location.search().up === 'true';
    $scope.numOfHops = $location.search().hops;
    $scope.numOfHops = ($scope.numOfHops !== undefined) ? $scope.numOfHops : 'All';
    var parser = document.createElement('a');
    parser.href = $location.absUrl();
    if (parser.search.indexOf('?simple') === 0) {
      $scope.simple_rendering = true;
    }
    $scope.getApplications = function() {
      var the_scope = $scope;
      var result = $scope.cached_apps || [];
      if (result.length === 0) {
        return appsFactory.appNames(function(response){
          the_scope.cached_apps = response;
          return response;
        });
      }
      return result;
    };

    var scope = $scope;
    var nodeClick = function(nodeName) {
      scope.name = nodeName;
      scope.$digest();
    };

    forcedGraph.render({ node: $stateParams.app_name, params: getGraphData() }, nodeClick);

    $scope.renderFullGraph = function() {
      $location.search({});
      $location.path('/graph');
    };

    $scope.renderNodeDependencies = function() {
      var params = getGraphData();
      params.app_name = $scope.name;
      $state.transitionTo('graphWithAppName', params);
    };

    function getGraphData(add_name) {
      var params = {};
      if (add_name) {
        params.name = $stateParams.app_name;
      }
      if ($scope.numOfHops && ($scope.numOfHops !== 'All')) {
        params.hops = $scope.numOfHops;
      }
      if ($scope.show_used_by) {
        params.up = 'true';
      }
      if ($scope.show_dependencies) {
        params.down = 'true';
      }
      if ($scope.nodes_exclude) {
        params.exclude = $scope.nodes_exclude;
      }
      if ($scope.nodes_include) {
        params.include = $scope.nodes_include;
      }

      return params;
    }

    // because this has happened asynchroneusly we've missed
    // Angular's initial call to $apply after the controller has been loaded
    // hence we need to explicityly call it at the end of our Controller constructor
    $scope.$apply();
  }];
});
