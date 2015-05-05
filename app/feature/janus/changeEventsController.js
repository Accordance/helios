define([], function () {
    "use strict";

    return ['$scope', '$stateParams', '$location', 'changeEventsFactory', function ($scope, $stateParams, $location, changeEventsFactory) {

        $scope.environments = 
          [
            { id: "all", name: "all environments" }, 
            { id: "d1", name: "d1" }, 
            { id: "f1", name: "f1" }, 
            { id: "l1", name: "l1" }, 
            { id: "s1", name: "s1" }, 
            { id: "p2", name: "p2" }
          ];
        $scope.selectedEnvironment = $location.search().env || $scope.environments[0].id;

        $scope.time_frames = 
          [
            { id: "1h", name: "Last 1 hour" },
            { id: "6h", name: "Last 6 hours" },
            { id: "12h", name: "Last half day" },
            { id: "1d", name: "Last day" },
            { id: "1w", name: "Last week" }
          ];
        $scope.selectedTimeFrame = $location.search().frame || $scope.time_frames[0].id;

        $scope.items_on_page = 
          [
            { id: "25", name: "25 items" },
            { id: "50", name: "50 items" },
            { id: "100", name: "100 item" },
            { id: "200", name: "200 item" }
          ];
        $scope.selectedItemsOnPage = $location.search().items || $scope.items_on_page[0].id;

        $scope.system_name = $location.search().filter;

        var getFilteredData =  function() {
          var envTerm = ($scope.selectedEnvironment === $scope.environments[0].id) ? null : $scope.selectedEnvironment;
          $location.search('env', envTerm);
          var frameTerm = ($scope.selectedTimeFrame === $scope.time_frames[0].id) ? null : $scope.selectedTimeFrame;
          $location.search('frame', frameTerm);
          var filterTerm = ($scope.system_name) ? $scope.system_name : null;
          $location.search('filter', filterTerm);
          var numItemsTerm = ($scope.selectedItemsOnPage === $scope.items_on_page[0].id) ? null : $scope.selectedItemsOnPage;
          $location.search('limit', numItemsTerm);

          changeEventsFactory.query({ env: envTerm, filter: filterTerm, frame: frameTerm, limit: numItemsTerm }, function(changeEvents) {
            $scope.changeEvents = changeEvents;
          });
        };

        $scope.filterEvents = getFilteredData;

        getFilteredData();

        $scope.$apply();
    }];
});