define(['../../common/directives/thumbnails/thumbnails'], function () {
  "use strict";

  return ['$scope', function ($scope) {
      $scope.perspectives = [
        {
            name: "Applications",
            sref: "appInfo",
            img: "../../img/svg/plug.svg"
        },
        {
            name: "Teams",
            sref: "teams.list",
            img: "../../img/svg/team.svg"
        }
      ];

      $scope.tools = [
        {
            name: "Dependency Graph",
            sref: "graph",
            img: "../../img/svg/graph.svg"
        },
        {
            name: "Janus [Change Management]",
            sref: "janus",
            img: "../../img/svg/janus.svg"
        },
      ];

      $scope.$apply();
  }];
});
