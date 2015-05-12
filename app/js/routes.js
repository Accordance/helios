/*jshint -W055 */
define(['angular', 'app', 'lodash'], function (angular, app, lodash) {
  'use strict';

  return app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'feature/home/homeView.html',
        controller: 'HomeCtrl'
      })
      .state('appInfo', {
          url: '/appInfo',
          templateUrl: 'feature/appInfo/appSelector.html',
          controller: 'appSelectorController'
      })
      .state('appInfo.detail', {
          url: '/:appId',
          views: {
              '': {
                  templateUrl: 'feature/appInfo/appDetail.html',
                  controller: 'appDetailController'
              }
          }
      })
      .state('graph', {
          url: '/graph',
          templateUrl: 'feature/dependencyGraph/forcedGraphView.html',
          controller: 'forcedGraphCtrl'
          //reloadOnSearch: false
      })
      .state('graphWithAppName', {
          url: '/graph/:app_name?down&up&hops&nodes&exclude&include',
          templateUrl: 'feature/dependencyGraph/forcedGraphView.html',
          controller: 'forcedGraphCtrl'
      })
      .state('teams', {
          abstract: true,
          url: '/teams',
          templateUrl: 'feature/teams/teams.html',
          resolve: {
              teams: ['teamsFactory',
                  function (teamsFactory) {
                      var data = teamsFactory.all();
                      return data;
                  }]
          },
          controller: ['$scope', '$state', 'teams',
              function ($scope, $state, teams) {
                  $scope.teams = teams;
              }
          ]
      })
      .state('teams.list', {
          url: '',
          templateUrl: 'feature/teams/list.html'
      })
      .state('teams.detail', {
          url: '/:teamId',
          views: {
              '': {
                  templateUrl: 'feature/teams/detail.html',
                  controller: ['$scope', '$state', '$stateParams', 'utils', 'credentialsFact',
                      function ($scope, $state, $stateParams, utils, credentialsFact) {
                          $scope.team = utils.findById($scope.teams, $stateParams.teamId);
                          $scope.teamMember = credentialsFact.is_member_of_group($stateParams.teamId);
                          //$scope.username = credentialsFact.getUsername();

                          $scope.goToTeamWall = function (teamId) {
                              window.location = "?simple/#/appStatusWall?team=" + teamId;
                          };

                          $scope.edit = function () {
                              $state.go('.edit', $stateParams);
                          };
                      }]
              }
          }
      })
      // // .state('teams.detail.item', {
      // //     url: '/item/:itemId',
      // //     views: {
      // //         '': {
      // //             templateUrl: 'feature/teams/detail.item.html',
      // //             controller: ['$scope', '$stateParams', '$state', 'utils', 'credentialsFact',
      // //                 function ($scope, $stateParams, $state, utils, credentialsFact) {
      // //                     $scope.item = utils.findById($scope.team.items, $stateParams.itemId);
      //
      // //                     $scope.edit = function () {
      // //                         $state.go('.edit', $stateParams);
      // //                     };
      // //                 }
      // //             ]
      // //         }
      // //     }
      // // })
      // .state('teams.detail.edit', {
      //     views: {
      //         '@teams.detail': {
      //             templateUrl: 'feature/teams/detail.item.edit.html',
      //             controller: ['$scope', '$stateParams', '$state', 'teamsFactory',
      //                 function ($scope,   $stateParams,   $state,   teamsFactory) {
      //                     $scope.members = $scope.team.members || [];
      //                     $scope.members_changed = { value: false };
      //
      //                     $scope.removeMember = function(id) {
      //                         $scope.members = _.without($scope.members, _.findWhere($scope.members, {_id: id}));
      //                         $scope.members_changed.value = true;
      //                     };
      //
      //                     $scope.addMember = function() {
      //                         $state.go('.addMember', $stateParams);
      //                     };
      //
      //                     $scope.done = function () {
      //                         var members = $scope.members.map(function(member) {
      //                             return { _id: member._id };
      //                         });
      //                         var data = {
      //                             _id: $scope.team._id,
      //                             version: $scope.team.version,
      //                             members: members
      //                         };
      //                         teamsFactory.update_members(data)
      //                             .success(function (resp) {
      //                                 $scope.team.members = $scope.members;
      //                                 $state.go('^', $stateParams);
      //                             })
      //                             .error(function (resp) {
      //                                 if (resp === undefined) {
      //                                     $scope.error = "Unexpected Error";
      //                                 } else {
      //                                     $scope.error = resp.error;
      //                                 }
      //                             });
      //                     };
      //                 }]
      //         }
      //     }
      // })
      // .state('teams.detail.edit.addMember', {
      //     views: {
      //         '': {
      //             templateUrl: 'feature/teams/detail.item.edit.add.html',
      //             controller: ['$scope', '$stateParams', '$state', 'utils', 'employeesFactory',
      //                 function ($scope, $stateParams, $state, utils, employeesFactory) {
      //                     $scope.search = function() {
      //                         $scope.error = null;
      //                         $scope.isSearching = true;
      //                         employeesFactory.search($scope.employee)
      //                             .success(function (resp) {
      //                                 $scope.isSearching = false;
      //                                 $scope.members.push(resp);
      //                                 $scope.members_changed.value = true;
      //                                 $state.go('^', $stateParams);
      //                             })
      //                             .error(function (resp) {
      //                                 $scope.isSearching = false;
      //                                 if (resp === undefined) {
      //                                     $scope.error = "Error";
      //                                 } else {
      //                                     $scope.error = resp.error;
      //                                 }
      //                             });
      //                     };
      //                 }]
      //         }
      //     }
      // })
      .state('janus', {
          url: '/janus',
          templateUrl: 'feature/janus/maintenanceEventsView.html',
          controller: 'maintenanceEventsCtrl'
      })
      .state('changeEvents', {
          url: '/janus/buildHistory',
          templateUrl: 'feature/janus/changeEventsView.html',
          controller: 'changeEventsCtrl'
      })
      .state('about', {url: '/about', templateUrl: 'feature/about/aboutView.html'})
      .state('contact', {url: '/contact', templateUrl: 'feature/contact/contactView.html'});
  }]);
});
